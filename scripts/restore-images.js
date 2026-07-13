#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.env.HOME, '.config', 'baklib', 'baklib.json');
const API_BASE = process.env.BAKLIB_API_BASE || 'https://open.baklib.com/api/v1';
const TOKEN = process.env.BAKLIB_TOKEN || (() => {
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')).token; } catch { return null; }
})();

const DRY_RUN = process.argv.includes('--dry-run');
const SITE_ID = '14085';

if (!TOKEN) { console.error('Error: token not found'); process.exit(1); }

async function api(method, url, body) {
  const opts = { method, headers: { 'Authorization': TOKEN, 'Accept': 'application/json' } };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function main() {
  // Build reverse map: filename -> original path
  const astroPublicDir = '/Users/reashal/git/astro-theme-reashal/public';
  const imgDir = path.join(astroPublicDir, 'images', 'docs');
  const reverseMap = {};
  function walk(dir, prefix) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full, `${prefix}${f}/`);
      else reverseMap[f] = `/images/docs/${prefix}${f}`;
    }
  }
  walk(imgDir, '');
  console.log(`Found ${Object.keys(reverseMap).length} images in Astro public/`);

  // Fetch affected articles
  const list = await api('GET', `${API_BASE}/sites/${SITE_ID}/pages?per=100&include_details=true`);
  const pages = list.data || [];

  for (const page of pages) {
    const attr = page.attributes || {};
    const content = attr.settings?.content || attr.content || '';
    const pageId = attr.hashid || attr.id;
    const title = attr.settings?.title || attr.link_text || '';

    // Find DAM URLs in content
    const damRegex = /https:\/\/reashal\.baklib\.com\/-\/dam\/assets\/[^\s"')>]+/g;
    const damUrls = content.match(damRegex);
    if (!damUrls) continue;

    let newContent = content;
    let changed = false;

    for (const url of damUrls) {
      const filename = url.split('/').pop().split('?')[0];
      const decoded = decodeURIComponent(filename);
      const originalPath = reverseMap[decoded];
      if (!originalPath) {
        console.warn(`  WARN: no mapping for ${decoded}`);
        continue;
      }
      if (DRY_RUN) {
        console.log(`  Would replace: ${url.slice(0, 60)}... → ${originalPath}`);
      } else {
        newContent = newContent.split(url).join(originalPath);
        changed = true;
      }
    }

    if (changed) {
      console.log(`  ${title}: updating ${pageId} ...`);
      await api('PATCH', `${API_BASE}/sites/${SITE_ID}/pages/${pageId}`, {
        data: {
          type: 'page',
          id: pageId,
          attributes: { settings: { content: newContent } }
        }
      });
      console.log(`    ✓ restored`);
    } else if (!DRY_RUN) {
      console.log(`  ${title}: no changes`);
    }
  }
  console.log('\nDone!');
}
main().catch(e => { console.error(e); process.exit(1); });
