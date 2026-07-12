#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.env.HOME, '.config', 'baklib', 'baklib.json');
const API_BASE = process.env.BAKLIB_API_BASE || 'https://open.baklib.com/api/v1';
const TOKEN = process.env.BAKLIB_TOKEN || (() => {
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')).token; } catch { return null; }
})();

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i].startsWith('--')) {
    const key = process.argv[i].slice(2);
    args[key] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
      ? process.argv[i + 1] : true;
    if (args[key] !== true) i++;
  }
}

const SITE_ID = args['site-id'];
const ASSETS_DIR = args['assets-dir'] || path.join(process.env.HOME, 'git/astro-theme-reashal');
const DRY_RUN = !!args['dry-run'];

if (!TOKEN) { console.error('Error: BAKLIB_TOKEN not set and ~/.config/baklib/baklib.json not found'); process.exit(1); }
if (!SITE_ID) { console.error('Error: --site-id required'); process.exit(1); }

async function api(method, url, body) {
  const opts = {
    method,
    headers: { 'Authorization': TOKEN, 'Accept': 'application/json' },
  };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${url} ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function uploadToDam(filePath) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' };
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  const form = new FormData();
  form.append('data[type]', 'dam_files');
  form.append('data[attributes][file]', new Blob([buf], { type: mimeType }), path.basename(filePath));
  const res = await fetch(`${API_BASE}/dam/files`, {
    method: 'POST',
    headers: { 'Authorization': TOKEN },
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DAM upload ${res.status} for ${filePath}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.data?.attributes?.url;
}

async function main() {
  console.log(`Fetching all pages for site ${SITE_ID}...`);
  const pageList = await api('GET', `${API_BASE}/sites/${SITE_ID}/pages?per=100&include_details=true`);
  const pages = pageList.data || [];

  const damCache = {};
  const imageAssetDir = path.join(ASSETS_DIR, 'assets', 'images', 'docs');

  for (const page of pages) {
    const attr = page.attributes || {};
    const content = attr.settings?.content || attr.content || '';
    const pageId = attr.hashid || attr.id;
    const title = attr.settings?.title || attr.link_text || attr.title || '';
    let modified = false;

    // --- Fix 1: Replace backtick inline code ---
    const backtickReplaced = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    if (backtickReplaced !== content) {
      console.log(`  ${title}: fixing backtick inline code`);
      modified = true;
    }

    // --- Fix 2: Replace /images/docs/... paths with DAM URLs ---
    let imageReplaced = backtickReplaced;
    const imgRegex = /\/images\/docs\/[^\s"')>]+/g;
    const matches = [...new Set(backtickReplaced.match(imgRegex) || [])];

    for (const relPath of matches) {
      if (!damCache[relPath]) {
        const fileRelPath = relPath.replace(/^\/images\/docs\//, '');
        const filePath = path.join(imageAssetDir, fileRelPath);
        if (!fs.existsSync(filePath)) {
          console.warn(`  WARN: File not found: ${filePath}`);
          damCache[relPath] = null;
          continue;
        }
        if (DRY_RUN) {
          console.log(`  Would upload: ${relPath} → DAM`);
          damCache[relPath] = `__DAM_URL_FOR_${relPath}__`;
        } else {
          console.log(`  Uploading: ${relPath} ...`);
          const damUrl = await uploadToDam(filePath);
          damCache[relPath] = damUrl;
          console.log(`    → ${damUrl}`);
        }
      }
      if (damCache[relPath]) {
        imageReplaced = imageReplaced.split(relPath).join(damCache[relPath]);
        modified = true;
      }
    }

    if (modified) {
      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would PATCH page ${pageId} content`);
      } else {
        console.log(`  PATCH page ${pageId} ...`);
        await api('PATCH', `${API_BASE}/sites/${SITE_ID}/pages/${pageId}`, {
          data: {
            type: 'page',
            id: pageId,
            attributes: {
              settings: { content: imageReplaced }
            }
          }
        });
        console.log(`    ✓ Updated`);
      }
    } else {
      console.log(`  ${title}: no changes needed`);
    }
  }

  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
