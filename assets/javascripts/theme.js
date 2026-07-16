(function(){
'use strict';

window.clickAsideBtn = function(){
  var m=document.getElementsByTagName('main')[0];
  if(!m)return;
  m.className=m.classList.contains('aside-show')?'aside-hide':'aside-show';
};

window.hideAside = function(){
  var m=document.getElementsByTagName('main')[0];
  if(!m)return;
  m.className=m.classList.contains('aside-show')?'aside-hide':'aside-init';
};

var viewImg,viewBox,viewPrev,viewNext,viewCounter,viewClose;
var viewerMomentId=null,viewerIndex=0,viewerList=[];

function initViewerElements(){
  viewImg=document.getElementById('view-img');
  viewBox=document.getElementById('view-box');
  viewPrev=document.getElementById('view-prev');
  viewNext=document.getElementById('view-next');
  viewCounter=document.getElementById('view-counter');
  viewClose=document.getElementById('view-close');
}

function getImageList(momentId){
  var s=document.querySelector('.moment-images[data-moment-id="'+momentId+'"]');
  if(!s)return[];
  var out=[];
  s.querySelectorAll('.moment-image-sources span').forEach(function(sp){
    out.push({url:sp.getAttribute('data-view-src'),alt:sp.getAttribute('data-view-alt')||''});
  });
  return out;
}

function openViewer(momentId,idx){
  viewerMomentId=momentId;
  viewerIndex=idx;
  viewerList=getImageList(momentId);
  if(!viewerList.length)return;
  showViewerImage();
  viewBox.className='view-box-show';
  document.body.style.overflow='hidden';
}

function showViewerImage(){
  if(!viewerList[viewerIndex])return;
  viewImg.src=viewerList[viewerIndex].url;
  viewImg.alt=viewerList[viewerIndex].alt||'';
  if(viewerList.length>1){
    viewCounter.textContent=(viewerIndex+1)+' / '+viewerList.length;
    viewPrev.style.display='flex';viewNext.style.display='flex';viewCounter.style.display='block';
    viewPrev.disabled=viewerIndex===0;
    viewNext.disabled=viewerIndex===viewerList.length-1;
  }else{
    viewPrev.style.display='none';viewNext.style.display='none';viewCounter.style.display='none';
  }
}

function closeViewer(){
  viewBox.className='view-box-hide';
  document.body.style.overflow='';
}

function viewerPrev(){if(viewerIndex>0){viewerIndex--;showViewerImage();}}
function viewerNext(){if(viewerIndex<viewerList.length-1){viewerIndex++;showViewerImage();}}

function bindViewerEvents(){
  if(viewClose)viewClose.addEventListener('click',function(e){e.stopPropagation();closeViewer();});
  if(viewPrev)viewPrev.addEventListener('click',function(e){e.stopPropagation();viewerPrev();});
  if(viewNext)viewNext.addEventListener('click',function(e){e.stopPropagation();viewerNext();});
  if(viewBox)viewBox.addEventListener('click',function(e){if(e.target===viewBox)closeViewer();});
}

function collectMomentImages(){
  document.querySelectorAll('.moment-images').forEach(function(section){
    var mid=section.getAttribute('data-moment-id');
    if(!mid)return;
    section.querySelectorAll('img,.img-mask-overlay').forEach(function(el){
      el.addEventListener('click',function(e){
        var main=document.querySelector('main');
        if(main&&main.classList.contains('aside-show'))return;
        openViewer(mid,parseInt(el.getAttribute('data-view-index'),10));
      });
    });
  });
}

if(!document.__reashalViewerKeydown){
  document.__reashalViewerKeydown=true;
  document.addEventListener('keydown',function(e){
    if(viewBox&&viewBox.classList.contains('view-box-show')){
      if(e.key==='Escape')closeViewer();
      if(e.key==='ArrowLeft')viewerPrev();
      if(e.key==='ArrowRight')viewerNext();
    }
  });
}

function initShare(){
  var btn=document.getElementById('share-btn');
  var overlay=document.getElementById('share-overlay');
  var copyBtn=document.getElementById('copy-btn');
  var titleEl=document.getElementById('share-card-title');
  var descEl=document.getElementById('share-card-desc');
  var inputEl=document.getElementById('share-link-input');
  if(!btn||!overlay)return;
  var curTitle='',curUrl='',curDesc='';
  btn.addEventListener('click',function(){
    curUrl=window.location.href;
    curTitle=document.title.split('｜')[0].trim();
    var md=document.querySelector('meta[name="description"]');
    curDesc=md?md.getAttribute('content'):'';
    titleEl.textContent=curTitle;
    descEl.textContent=curDesc;
    descEl.style.display=curDesc?'block':'none';
    inputEl.value=curUrl;
    overlay.classList.add('show');
    generateQR();
  });
  overlay.addEventListener('click',function(e){if(e.target===overlay)overlay.classList.remove('show');});
  if(copyBtn){
    copyBtn.addEventListener('click',function(){
      inputEl.select();
      var sn=btn.getAttribute('data-site-name')||'睿屿青衫';
      var t='我从『'+sn+'』为您分享了一篇文章～\n标题：'+curTitle+'\n摘要：'+(curDesc||'暂无摘要')+'\n链接：'+curUrl;
      navigator.clipboard.writeText(t).then(function(){alert('已复制到剪贴板');}).catch(function(){alert('复制失败，请手动复制链接');});
    });
  }
  function generateQR(){
    var c=document.getElementById('qrcode-canvas');
    if(!c)return;
    var ctx=c.getContext('2d');
    var size=150;
    c.width=size;c.height=size;
    if(typeof qrcode==='undefined'){loadQR();return;}
    try{
      var qr=qrcode(0,'M');
      qr.addData(curUrl);
      qr.make();
      ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size,size);
      var mc=qr.getModuleCount(),ms=size/mc;
      ctx.fillStyle='#000000';
      for(var r=0;r<mc;r++)for(var col=0;col<mc;col++)if(qr.isDark(r,col))ctx.fillRect(col*ms,r*ms,ms,ms);
    }catch(e){qrFallback();}
  }
  function loadQR(){
    var s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
    s.onload=function(){generateQR();};
    s.onerror=qrFallback;
    document.head.appendChild(s);
  }
  function qrFallback(){
    var c=document.getElementById('qrcode-canvas');
    if(!c)return;
    var ctx=c.getContext('2d');var size=150;
    c.width=size;c.height=size;
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size,size);
    ctx.fillStyle='#000000';ctx.font='12px Arial';ctx.textAlign='center';
    ctx.fillText('二维码生成失败',size/2,size/2);
  }
  var asideBtn=document.getElementById('aside-share-btn');
  if(asideBtn){
    asideBtn.addEventListener('click',function(){
      if(typeof clickAsideBtn==='function')clickAsideBtn();
      setTimeout(function(){
        var sb=document.getElementById('share-btn');
        if(sb)sb.click();
      },300);
    });
  }
}

window.syncGiscusTheme = function(){
  var isDark=document.documentElement.classList.contains('dark');
  var theme=isDark?'dark':'light';
  var frame=document.querySelector('iframe.giscus-frame');
  if(frame){
    frame.contentWindow.postMessage({giscus:{setConfig:{theme:theme}}},'https://giscus.app');
  }else{
    var s=document.getElementById('giscus');
    if(s)s.setAttribute('data-theme',theme);
  }
};

function initThemeToggle(){
  var btn=document.getElementById('themeToggle');
  if(!btn)return;
  btn.addEventListener('click',function(){
    var el=document.documentElement;
    el.classList.toggle('dark');
    var dark=el.classList.contains('dark');
    el.setAttribute('data-theme',dark?'dark':'light');
    localStorage.setItem('theme',dark?'dark':'light');
    localStorage.setItem('themeTs',String(Date.now()));
    requestAnimationFrame(window.syncGiscusTheme);
  });
}

function initGiscus(){
  window.syncGiscusTheme();
  document.addEventListener('message',function(e){
    if(e.origin!=='https://giscus.app')return;
    if(e.data&&e.data.giscus&&e.data.giscus.discussion!==undefined)window.syncGiscusTheme();
  });
}

var searchState=null;

function initSearchPagination(){
  var container=document.getElementById('docs-container');
  var pagination=document.getElementById('docs-pagination');
  var endTip=document.getElementById('docs-end-tip');
  if(!container||!pagination){searchState=null;return;}
  if(pagination.querySelector('a')){searchState=null;return;}
  var allItems=Array.from(container.querySelectorAll('.docs-body'));
  if(allItems.length===0){searchState=null;return;}
  var cur=0,per=1,enough=false;
  function calcPer(){return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--per-page'))||1;}
  function total(){return per<=0?0:Math.ceil(allItems.length/per);}
  function checkSpace(){
    var mainEl=document.querySelector('.main');
    if(!mainEl){enough=false;return;}
    var footerEl=document.getElementById('docs-footer');
    if(!footerEl){enough=false;return;}
    var vh=mainEl.clientHeight,ft=footerEl.offsetHeight;
    var st=getComputedStyle(container);
    var pad=parseFloat(st.paddingTop)+parseFloat(st.paddingBottom);
    var used=pad;
    allItems.forEach(function(it){
      var is=getComputedStyle(it);
      used+=it.offsetHeight+parseFloat(is.marginTop)+parseFloat(is.marginBottom);
    });
    enough=(vh-used-ft)>100;
  }
  function showPage(pg){
    cur=Math.max(0,Math.min(pg,total()-1));
    var start=cur*per,end=start+per;
    checkSpace();
    if(endTip)endTip.style.display=(total()===1&&enough)?'':'none';
    allItems.forEach(function(it,i){
      it.style.display=(i>=start&&i<end)?'':'none';
      if(i===end-1)it.classList.add('docs-last');else it.classList.remove('docs-last');
    });
    renderPagination();
  }
  function renderPagination(){
    var t=total();
    if(t<=1){pagination.style.display='none';return;}
    pagination.style.display='';
    var pages=[];
    if(t<=7){for(var i=0;i<t;i++)pages.push(i);}
    else{
      pages.push(0);
      if(cur>3)pages.push('\u2026');
      var lo=Math.max(1,cur-1),hi=Math.min(t-2,cur+1);
      for(var i=lo;i<=hi;i++)pages.push(i);
      if(cur<t-4)pages.push('\u2026');
      pages.push(t-1);
    }
    pagination.innerHTML='';
    var prev=document.createElement('button');
    prev.className='page-btn page-prev';
    prev.textContent='\u2039';
    prev.disabled=cur===0;
    prev.addEventListener('click',function(){showPage(cur-1);scrollTop();});
    pagination.appendChild(prev);
    pages.forEach(function(p){
      if(p==='\u2026'){
        var sep=document.createElement('span');sep.className='page-sep';sep.textContent='\u2026';pagination.appendChild(sep);
      }else{
        var btn=document.createElement('button');
        btn.className='page-btn'+(p===cur?' page-active':'');
        btn.textContent=String(Number(p)+1);
        btn.addEventListener('click',function(){showPage(Number(p));scrollTop();});
        pagination.appendChild(btn);
      }
    });
    var next=document.createElement('button');
    next.className='page-btn page-next';
    next.textContent='\u203a';
    next.disabled=cur===total()-1;
    next.addEventListener('click',function(){showPage(cur+1);scrollTop();});
    pagination.appendChild(next);
  }
  function scrollTop(){var m=document.querySelector('.main');if(m)m.scrollTo({top:0,behavior:'smooth'});}
  per=calcPer();checkSpace();showPage(0);
  searchState={handleResize:function(){
    var prev=cur;
    per=calcPer();checkSpace();showPage(Math.min(prev,total()-1));
  }};
}

if(!window.__reashalSearchResize){
  window.__reashalSearchResize=true;
  var resizeTimer;
  window.addEventListener('resize',function(){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(function(){
      if(searchState&&searchState.handleResize)searchState.handleResize();
    },150);
  });
}

function initCardStack(){
  var stack=document.getElementById('card-stack');
  var footer=document.getElementById('stack-footer');
  if(!stack||!footer)return;
  var cards=Array.from(stack.querySelectorAll('.message-card'));
  var total=cards.length;
  if(total===0)return;
  var VISIBLE=3,PEEK=10,DURATION=350,isAnimating=false,touchStartY=0,currentIndex=0;
  function layout(anim){
    cards.forEach(function(c,i){
      var y=i*PEEK;
      c.style.transition=anim?'transform 0.3s ease, opacity 0.3s ease':'none';
      c.style.display='';c.style.pointerEvents='none';
      if(i<VISIBLE){
        c.style.transform='translateY('+y+'px)';c.style.zIndex=VISIBLE-i;c.style.opacity=1;
        if(i===0)c.style.pointerEvents='auto';
      }else{
        c.style.transform='translateY('+y+'px)';c.style.zIndex=0;c.style.opacity=0;
      }
    });
    footer.textContent=((currentIndex%total)+1)+' / '+total;
  }
  function dismiss(){
    if(isAnimating||total<=1)return;
    isAnimating=true;
    var top=cards[0];
    top.style.transition='transform '+DURATION+'ms cubic-bezier(.4,0,.2,1), opacity '+(DURATION*0.85)+'ms ease';
    top.style.transform='translateY(-80px)';top.style.opacity='0';top.style.zIndex='999';
    var second=cards[1],third=cards[2];
    if(second){second.style.transition='transform 0.25s ease, opacity 0.25s ease';second.style.transform='translateY(0)';}
    if(third){third.style.transition='transform 0.25s ease, opacity 0.25s ease';third.style.transform='translateY('+PEEK+'px)';}
    setTimeout(function(){
      stack.appendChild(top);
      cards=Array.from(stack.querySelectorAll('.message-card'));
      currentIndex=(currentIndex+1)%total;
      top.style.transition='none';var li=cards.length-1;
      top.style.transform='translateY('+(li*PEEK)+'px)';top.style.opacity='0';top.style.zIndex='0';top.style.pointerEvents='none';
      void top.offsetHeight;layout(true);
      setTimeout(function(){cards.forEach(function(c){c.style.transition='';});isAnimating=false;},DURATION);
    },DURATION);
  }
  function restore(){
    if(isAnimating||total<=1)return;
    isAnimating=true;
    var last=cards[cards.length-1],first=cards[0],second=cards[1];
    if(first){first.style.transition='transform 0.25s ease, opacity 0.25s ease';first.style.transform='translateY('+PEEK+'px)';}
    if(second){second.style.transition='transform 0.25s ease, opacity 0.25s ease';second.style.transform='translateY('+(2*PEEK)+'px)';}
    var restoreY=cards.length*PEEK;
    last.style.transition='none';last.style.display='';last.style.transform='translateY('+restoreY+'px)';last.style.opacity='0.5';last.style.zIndex='999';last.style.pointerEvents='none';
    void last.offsetHeight;
    last.style.transition='transform '+DURATION+'ms cubic-bezier(.4,0,.2,1), opacity '+(DURATION*0.85)+'ms ease';
    last.style.transform='translateY(0)';last.style.opacity='1';
    setTimeout(function(){
      stack.insertBefore(last,stack.firstChild);
      cards=Array.from(stack.querySelectorAll('.message-card'));
      currentIndex=(currentIndex-1+total)%total;
      last.style.transition='none';var li=cards.length-1;
      last.style.transform='translateY('+(li*PEEK)+'px)';last.style.opacity='0';last.style.zIndex='0';
      void last.offsetHeight;layout(true);
      setTimeout(function(){cards.forEach(function(c){c.style.transition='';});isAnimating=false;},DURATION);
    },DURATION);
  }
  stack.addEventListener('wheel',function(e){e.preventDefault();if(e.deltaY>0)dismiss();else restore();},{passive:false});
  stack.addEventListener('touchstart',function(e){touchStartY=e.touches[0].clientY;},{passive:true});
  stack.addEventListener('touchmove',function(e){e.preventDefault();},{passive:false});
  stack.addEventListener('touchend',function(e){var dy=e.changedTouches[0].clientY-touchStartY;if(dy<-20)dismiss();else if(dy>20)restore();},{passive:true});
  layout(false);
  setTimeout(function(){cards.forEach(function(c){c.style.transition='';});},50);
}

function initShowcase(){
  var root=document.getElementById('showcase-root');
  var dataEl=document.getElementById('showcase-data');
  if(!root||!dataEl)return;
  try{
    var raw=dataEl.value||dataEl.textContent;
    var sections=JSON.parse(raw);
    if(!sections||typeof sections!=='object'){root.innerHTML='<h2 class="showcase-h">\u6682\u65e0\u5c55\u793a\u5185\u5bb9</h2>';return;}
    var keys=Object.keys(sections);
    if(keys.length===0){root.innerHTML='<h2 class="showcase-h">\u6682\u65e0\u5c55\u793a\u5185\u5bb9</h2>';return;}
    var html='';
    keys.forEach(function(key){
      var items=sections[key];
      if(!items||!items.length)return;
      html+='<section class="showcase-group"><h2 class="showcase-group-title">'+esc(key)+'</h2><div class="showcase-list">';
      items.forEach(function(item){
        html+='<div class="showcase-card">';
        if(item.url)html+='<img src="'+escAttr(item.url)+'" alt="'+escAttr(item.alt||'')+'" loading="lazy">';
        if(item.label)html+='<span class="showcase-label">'+esc(item.label)+'</span>';
        if(item.desc)html+='<p class="showcase-desc">'+esc(item.desc)+'</p>';
        if(item.link)html+='<a href="'+escAttr(item.link)+'" target="_blank" rel="noopener noreferrer" class="showcase-link">\u67e5\u770b</a>';
        html+='</div>';
      });
      html+='</div></section>';
    });
    root.innerHTML=html;
  }catch(e){root.innerHTML='<h2 class="showcase-h">\u6570\u636e\u89e3\u6790\u5931\u8d25</h2>';}
  function esc(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.innerHTML;}
  function escAttr(s){return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
}

document.addEventListener('turbo:load',function(){
  initViewerElements();
  bindViewerEvents();
  collectMomentImages();
  initShare();
  initThemeToggle();
  initGiscus();
  initCardStack();
  initSearchPagination();
  initShowcase();
});

document.addEventListener('turbo:before-cache',function(){});

})();
