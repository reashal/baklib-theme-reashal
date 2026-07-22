(()=>{(function(t){if(typeof t.requestSubmit=="function")return;t.requestSubmit=function(a){a?(e(a,this),a.click()):(a=document.createElement("input"),a.type="submit",a.hidden=!0,this.appendChild(a),a.click(),this.removeChild(a))};function e(a,o){a instanceof HTMLElement||r(TypeError,"parameter 1 is not of type 'HTMLElement'"),a.type=="submit"||r(TypeError,"The specified element is not a submit button"),a.form==o||r(DOMException,"The specified element is not owned by this form element","NotFoundError")}function r(a,o,s){throw new a("Failed to execute 'requestSubmit' on 'HTMLFormElement': "+o+".",s)}})(HTMLFormElement.prototype);var Eo=new WeakMap;function Pi(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null,r=e?e.closest("input, button"):null;return r?.type=="submit"?r:null}function Ti(t){let e=Pi(t.target);e&&e.form&&Eo.set(e.form,e)}(function(){if("submitter"in Event.prototype)return;let t=window.Event.prototype;if("SubmitEvent"in window){let e=window.SubmitEvent.prototype;if(/Apple Computer/.test(navigator.vendor)&&!("submitter"in e))t=e;else return}addEventListener("click",Ti,!0),Object.defineProperty(t,"submitter",{get(){if(this.type=="submit"&&this.target instanceof HTMLFormElement)return Eo.get(this.target)}})})();var me={eager:"eager",lazy:"lazy"},U=class t extends HTMLElement{static delegateConstructor=void 0;loaded=Promise.resolve();static get observedAttributes(){return["disabled","loading","src"]}constructor(){super(),this.delegate=new t.delegateConstructor(this)}connectedCallback(){this.delegate.connect()}disconnectedCallback(){this.delegate.disconnect()}reload(){return this.delegate.sourceURLReloaded()}attributeChangedCallback(e){e=="loading"?this.delegate.loadingStyleChanged():e=="src"?this.delegate.sourceURLChanged():e=="disabled"&&this.delegate.disabledChanged()}get src(){return this.getAttribute("src")}set src(e){e?this.setAttribute("src",e):this.removeAttribute("src")}get refresh(){return this.getAttribute("refresh")}set refresh(e){e?this.setAttribute("refresh",e):this.removeAttribute("refresh")}get shouldReloadWithMorph(){return this.src&&this.refresh==="morph"}get loading(){return _i(this.getAttribute("loading")||"")}set loading(e){e?this.setAttribute("loading",e):this.removeAttribute("loading")}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get autoscroll(){return this.hasAttribute("autoscroll")}set autoscroll(e){e?this.setAttribute("autoscroll",""):this.removeAttribute("autoscroll")}get complete(){return!this.delegate.isLoading}get isActive(){return this.ownerDocument===document&&!this.isPreview}get isPreview(){return this.ownerDocument?.documentElement?.hasAttribute("data-turbo-preview")}};function _i(t){switch(t.toLowerCase()){case"lazy":return me.lazy;default:return me.eager}}var Ri={enabled:!0,progressBarDelay:500,unvisitableExtensions:new Set([".7z",".aac",".apk",".avi",".bmp",".bz2",".css",".csv",".deb",".dmg",".doc",".docx",".exe",".gif",".gz",".heic",".heif",".ico",".iso",".jpeg",".jpg",".js",".json",".m4a",".mkv",".mov",".mp3",".mp4",".mpeg",".mpg",".msi",".ogg",".ogv",".pdf",".pkg",".png",".ppt",".pptx",".rar",".rtf",".svg",".tar",".tif",".tiff",".txt",".wav",".webm",".webp",".wma",".wmv",".xls",".xlsx",".xml",".zip"])};function Te(t){if(t.getAttribute("data-turbo-eval")=="false")return t;{let e=document.createElement("script"),r=Ro();return r&&(e.nonce=r),e.textContent=t.textContent,e.async=!1,ki(e,t),e}}function ki(t,e){for(let{name:r,value:a}of e.attributes)t.setAttribute(r,a)}function Fi(t){let e=document.createElement("template");return e.innerHTML=t,e.content}function P(t,{target:e,cancelable:r,detail:a}={}){let o=new CustomEvent(t,{cancelable:r,bubbles:!0,composed:!0,detail:a});return e&&e.isConnected?e.dispatchEvent(o):document.documentElement.dispatchEvent(o),o}function bo(t){t.preventDefault(),t.stopImmediatePropagation()}function Pe(){return document.visibilityState==="hidden"?Lo():Mo()}function Mo(){return new Promise(t=>requestAnimationFrame(()=>t()))}function Lo(){return new Promise(t=>setTimeout(()=>t(),0))}function Bi(){return Promise.resolve()}function Po(t=""){return new DOMParser().parseFromString(t,"text/html")}function To(t,...e){let r=qi(t,e).replace(/^\n/,"").split(`
`),a=r[0].match(/^\s+/),o=a?a[0].length:0;return r.map(s=>s.slice(o)).join(`
`)}function qi(t,e){return t.reduce((r,a,o)=>{let s=e[o]==null?"":e[o];return r+a+s},"")}function j(){return Array.from({length:36}).map((t,e)=>e==8||e==13||e==18||e==23?"-":e==14?"4":e==19?(Math.floor(Math.random()*4)+8).toString(16):Math.floor(Math.random()*15).toString(16)).join("")}function je(t,...e){for(let r of e.map(a=>a?.getAttribute(t)))if(typeof r=="string")return r;return null}function Di(t,...e){return e.some(r=>r&&r.hasAttribute(t))}function Ke(...t){for(let e of t)e.localName=="turbo-frame"&&e.setAttribute("busy",""),e.setAttribute("aria-busy","true")}function Xe(...t){for(let e of t)e.localName=="turbo-frame"&&e.removeAttribute("busy"),e.removeAttribute("aria-busy")}function Oi(t,e=2e3){return new Promise(r=>{let a=()=>{t.removeEventListener("error",a),t.removeEventListener("load",a),r()};t.addEventListener("load",a,{once:!0}),t.addEventListener("error",a,{once:!0}),setTimeout(r,e)})}function _o(t){switch(t){case"replace":return history.replaceState;case"advance":case"restore":return history.pushState}}function Hi(t){return t=="advance"||t=="replace"||t=="restore"}function te(...t){let e=je("data-turbo-action",...t);return Hi(e)?e:null}function pr(t){return document.querySelector(`meta[name="${t}"]`)}function Ze(t){let e=pr(t);return e&&e.content}function Ro(){let t=pr("csp-nonce");if(t){let{nonce:e,content:r}=t;return e==""?r:e}}function Ii(t,e){let r=pr(t);return r||(r=document.createElement("meta"),r.setAttribute("name",t),document.head.appendChild(r)),r.setAttribute("content",e),r}function xe(t,e){if(t instanceof Element)return t.closest(e)||xe(t.assignedSlot||t.getRootNode()?.host,e)}function mr(t){return!!t&&t.closest("[inert], :disabled, [hidden], details:not([open]), dialog:not([open])")==null&&typeof t.focus=="function"}function ko(t){return Array.from(t.querySelectorAll("[autofocus]")).find(mr)}async function Ui(t,e){let r=e();t(),await Mo();let a=e();return[r,a]}function Fo(t){if(t==="_blank")return!1;if(t){for(let e of document.getElementsByName(t))if(e instanceof HTMLIFrameElement)return!1;return!0}else return!0}function Bo(t){return xe(t,"a[href]:not([target^=_]):not([download])")}function qo(t){return B(t.getAttribute("href")||"")}function Vi(t,e){let r=null;return(...a)=>{let o=()=>t.apply(this,a);clearTimeout(r),r=setTimeout(o,e)}}var Ni={"aria-disabled":{beforeSubmit:t=>{t.setAttribute("aria-disabled","true"),t.addEventListener("click",bo)},afterSubmit:t=>{t.removeAttribute("aria-disabled"),t.removeEventListener("click",bo)}},disabled:{beforeSubmit:t=>t.disabled=!0,afterSubmit:t=>t.disabled=!1}},Bt=class{#e=null;constructor(e){Object.assign(this,e)}get submitter(){return this.#e}set submitter(e){this.#e=Ni[e]||e}},Wi=new Bt({mode:"on",submitter:"disabled"}),F={drive:Ri,forms:Wi};function B(t){return new URL(t.toString(),document.baseURI)}function re(t){let e;if(t.hash)return t.hash.slice(1);if(e=t.href.match(/#(.*)$/))return e[1]}function hr(t,e){let r=e?.getAttribute("formaction")||t.getAttribute("action")||t.action;return B(r)}function zi(t){return(Ki(t).match(/\.[^.]*$/)||[])[0]||""}function $i(t,e){let r=Xi(e);return t.href===B(r).href||t.href.startsWith(r)}function G(t,e){return $i(t,e)&&!F.drive.unvisitableExtensions.has(zi(t))}function qt(t){let e=re(t);return e!=null?t.href.slice(0,-(e.length+1)):t.href}function $e(t){return qt(t)}function Gi(t,e){return B(t).href==B(e).href}function ji(t){return t.pathname.split("/").slice(1)}function Ki(t){return ji(t).slice(-1)[0]}function Xi(t){return Zi(t.origin+t.pathname)}function Zi(t){return t.endsWith("/")?t:t+"/"}var _e=class{constructor(e){this.response=e}get succeeded(){return this.response.ok}get failed(){return!this.succeeded}get clientError(){return this.statusCode>=400&&this.statusCode<=499}get serverError(){return this.statusCode>=500&&this.statusCode<=599}get redirected(){return this.response.redirected}get location(){return B(this.response.url)}get isHTML(){return this.contentType&&this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)}get statusCode(){return this.response.status}get contentType(){return this.header("Content-Type")}get responseText(){return this.response.clone().text()}get responseHTML(){return this.isHTML?this.response.clone().text():Promise.resolve(void 0)}header(e){return this.response.headers.get(e)}},Dt=class extends Set{constructor(e){super(),this.maxSize=e}add(e){if(this.size>=this.maxSize){let a=this.values().next().value;this.delete(a)}super.add(e)}},Do=new Dt(20),Ji=window.fetch;function Oo(t,e={}){let r=new Headers(e.headers||{}),a=j();return Do.add(a),r.append("X-Turbo-Request-Id",a),Ji(t,{...e,headers:r})}function xr(t){switch(t.toLowerCase()){case"get":return D.get;case"post":return D.post;case"put":return D.put;case"patch":return D.patch;case"delete":return D.delete}}var D={get:"get",post:"post",put:"put",patch:"patch",delete:"delete"};function Qi(t){switch(t.toLowerCase()){case ee.multipart:return ee.multipart;case ee.plain:return ee.plain;default:return ee.urlEncoded}}var ee={urlEncoded:"application/x-www-form-urlencoded",multipart:"multipart/form-data",plain:"text/plain"},ae=class{abortController=new AbortController;#e=e=>{};constructor(e,r,a,o=new URLSearchParams,s=null,i=ee.urlEncoded){let[n,l]=So(B(a),r,o,i);this.delegate=e,this.url=n,this.target=s,this.fetchOptions={credentials:"same-origin",redirect:"follow",method:r.toUpperCase(),headers:{...this.defaultHeaders},body:l,signal:this.abortSignal,referrer:this.delegate.referrer?.href},this.enctype=i}get method(){return this.fetchOptions.method}set method(e){let r=this.isSafe?this.url.searchParams:this.fetchOptions.body||new FormData,a=xr(e)||D.get;this.url.search="";let[o,s]=So(this.url,a,r,this.enctype);this.url=o,this.fetchOptions.body=s,this.fetchOptions.method=a.toUpperCase()}get headers(){return this.fetchOptions.headers}set headers(e){this.fetchOptions.headers=e}get body(){return this.isSafe?this.url.searchParams:this.fetchOptions.body}set body(e){this.fetchOptions.body=e}get location(){return this.url}get params(){return this.url.searchParams}get entries(){return this.body?Array.from(this.body.entries()):[]}cancel(){this.abortController.abort()}async perform(){let{fetchOptions:e}=this;this.delegate.prepareRequest(this);let r=await this.#t(e);try{this.delegate.requestStarted(this),r.detail.fetchRequest?this.response=r.detail.fetchRequest.response:this.response=Oo(this.url.href,e);let a=await this.response;return await this.receive(a)}catch(a){if(a.name!=="AbortError")throw this.#r(a)&&this.delegate.requestErrored(this,a),a}finally{this.delegate.requestFinished(this)}}async receive(e){let r=new _e(e);return P("turbo:before-fetch-response",{cancelable:!0,detail:{fetchResponse:r},target:this.target}).defaultPrevented?this.delegate.requestPreventedHandlingResponse(this,r):r.succeeded?this.delegate.requestSucceededWithResponse(this,r):this.delegate.requestFailedWithResponse(this,r),r}get defaultHeaders(){return{Accept:"text/html, application/xhtml+xml"}}get isSafe(){return gr(this.method)}get abortSignal(){return this.abortController.signal}acceptResponseType(e){this.headers.Accept=[e,this.headers.Accept].join(", ")}async#t(e){let r=new Promise(o=>this.#e=o),a=P("turbo:before-fetch-request",{cancelable:!0,detail:{fetchOptions:e,url:this.url,resume:this.#e},target:this.target});return this.url=a.detail.url,a.defaultPrevented&&await r,a}#r(e){return!P("turbo:fetch-request-error",{target:this.target,cancelable:!0,detail:{request:this,error:e}}).defaultPrevented}};function gr(t){return xr(t)==D.get}function So(t,e,r,a){let o=Array.from(r).length>0?new URLSearchParams(Ho(r)):t.searchParams;return gr(e)?[Yi(t,o),null]:a==ee.urlEncoded?[t,o]:[t,r]}function Ho(t){let e=[];for(let[r,a]of t)a instanceof File||e.push([r,a]);return e}function Yi(t,e){let r=new URLSearchParams(Ho(e));return t.search=r.toString(),t}var Ot=class{started=!1;constructor(e,r){this.delegate=e,this.element=r,this.intersectionObserver=new IntersectionObserver(this.intersect)}start(){this.started||(this.started=!0,this.intersectionObserver.observe(this.element))}stop(){this.started&&(this.started=!1,this.intersectionObserver.unobserve(this.element))}intersect=e=>{e.slice(-1)[0]?.isIntersecting&&this.delegate.elementAppearedInViewport(this.element)}},K=class{static contentType="text/vnd.turbo-stream.html";static wrap(e){return typeof e=="string"?new this(Fi(e)):e}constructor(e){this.fragment=en(e)}};function en(t){for(let e of t.querySelectorAll("turbo-stream")){let r=document.importNode(e,!0);for(let a of r.templateElement.content.querySelectorAll("script"))a.replaceWith(Te(a));e.replaceWith(r)}return t}var tn=100,Ht=class{#e=null;#t=null;get(e){if(this.#t&&this.#t.url===e&&this.#t.expire>Date.now())return this.#t.request}setLater(e,r,a){this.clear(),this.#e=setTimeout(()=>{r.perform(),this.set(e,r,a),this.#e=null},tn)}set(e,r,a){this.#t={url:e,request:r,expire:new Date(new Date().getTime()+a)}}clear(){this.#e&&clearTimeout(this.#e),this.#t=null}},rn=10*1e3,he=new Ht,pe={initialized:"initialized",requesting:"requesting",waiting:"waiting",receiving:"receiving",stopping:"stopping",stopped:"stopped"},Je=class t{state=pe.initialized;static confirmMethod(e){return Promise.resolve(confirm(e))}constructor(e,r,a,o=!1){let s=fn(r,a),i=ln(nn(r,a),s),n=an(r,a),l=un(r,a);this.delegate=e,this.formElement=r,this.submitter=a,this.fetchRequest=new ae(this,s,i,n,r,l),this.mustRedirect=o}get method(){return this.fetchRequest.method}set method(e){this.fetchRequest.method=e}get action(){return this.fetchRequest.url.toString()}set action(e){this.fetchRequest.url=B(e)}get body(){return this.fetchRequest.body}get enctype(){return this.fetchRequest.enctype}get isSafe(){return this.fetchRequest.isSafe}get location(){return this.fetchRequest.url}async start(){let{initialized:e,requesting:r}=pe,a=je("data-turbo-confirm",this.submitter,this.formElement);if(!(typeof a=="string"&&!await(typeof F.forms.confirm=="function"?F.forms.confirm:t.confirmMethod)(a,this.formElement,this.submitter))&&this.state==e)return this.state=r,this.fetchRequest.perform()}stop(){let{stopping:e,stopped:r}=pe;if(this.state!=e&&this.state!=r)return this.state=e,this.fetchRequest.cancel(),!0}prepareRequest(e){if(!e.isSafe){let r=on(Ze("csrf-param"))||Ze("csrf-token");r&&(e.headers["X-CSRF-Token"]=r)}this.requestAcceptsTurboStreamResponse(e)&&e.acceptResponseType(K.contentType)}requestStarted(e){this.state=pe.waiting,this.submitter&&F.forms.submitter.beforeSubmit(this.submitter),this.setSubmitsWith(),Ke(this.formElement),P("turbo:submit-start",{target:this.formElement,detail:{formSubmission:this}}),this.delegate.formSubmissionStarted(this)}requestPreventedHandlingResponse(e,r){he.clear(),this.result={success:r.succeeded,fetchResponse:r}}requestSucceededWithResponse(e,r){if(r.clientError||r.serverError){this.delegate.formSubmissionFailedWithResponse(this,r);return}if(he.clear(),this.requestMustRedirect(e)&&sn(r)){let a=new Error("Form responses must redirect to another location");this.delegate.formSubmissionErrored(this,a)}else this.state=pe.receiving,this.result={success:!0,fetchResponse:r},this.delegate.formSubmissionSucceededWithResponse(this,r)}requestFailedWithResponse(e,r){this.result={success:!1,fetchResponse:r},this.delegate.formSubmissionFailedWithResponse(this,r)}requestErrored(e,r){this.result={success:!1,error:r},this.delegate.formSubmissionErrored(this,r)}requestFinished(e){this.state=pe.stopped,this.submitter&&F.forms.submitter.afterSubmit(this.submitter),this.resetSubmitterText(),Xe(this.formElement),P("turbo:submit-end",{target:this.formElement,detail:{formSubmission:this,...this.result}}),this.delegate.formSubmissionFinished(this)}setSubmitsWith(){if(!(!this.submitter||!this.submitsWith)){if(this.submitter.matches("button"))this.originalSubmitText=this.submitter.innerHTML,this.submitter.innerHTML=this.submitsWith;else if(this.submitter.matches("input")){let e=this.submitter;this.originalSubmitText=e.value,e.value=this.submitsWith}}}resetSubmitterText(){if(!(!this.submitter||!this.originalSubmitText)){if(this.submitter.matches("button"))this.submitter.innerHTML=this.originalSubmitText;else if(this.submitter.matches("input")){let e=this.submitter;e.value=this.originalSubmitText}}}requestMustRedirect(e){return!e.isSafe&&this.mustRedirect}requestAcceptsTurboStreamResponse(e){return!e.isSafe||Di("data-turbo-stream",this.submitter,this.formElement)}get submitsWith(){return this.submitter?.getAttribute("data-turbo-submits-with")}};function an(t,e){let r=new FormData(t),a=e?.getAttribute("name"),o=e?.getAttribute("value");return a&&r.append(a,o||""),r}function on(t){if(t!=null){let r=(document.cookie?document.cookie.split("; "):[]).find(a=>a.startsWith(t));if(r){let a=r.split("=").slice(1).join("=");return a?decodeURIComponent(a):void 0}}}function sn(t){return t.statusCode==200&&!t.redirected}function nn(t,e){let r=typeof t.action=="string"?t.action:null;return e?.hasAttribute("formaction")?e.getAttribute("formaction")||"":t.getAttribute("action")||r||""}function ln(t,e){let r=B(t);return gr(e)&&(r.search=""),r}function fn(t,e){let r=e?.getAttribute("formmethod")||t.getAttribute("method")||"";return xr(r.toLowerCase())||D.get}function un(t,e){return Qi(e?.getAttribute("formenctype")||t.enctype)}var be=class{constructor(e){this.element=e}get activeElement(){return this.element.ownerDocument.activeElement}get children(){return[...this.element.children]}hasAnchor(e){return this.getElementForAnchor(e)!=null}getElementForAnchor(e){return e?this.element.querySelector(`[id='${e}'], a[name='${e}']`):null}get isConnected(){return this.element.isConnected}get firstAutofocusableElement(){return ko(this.element)}get permanentElements(){return Uo(this.element)}getPermanentElementById(e){return Io(this.element,e)}getPermanentElementMapForSnapshot(e){let r={};for(let a of this.permanentElements){let{id:o}=a,s=e.getPermanentElementById(o);s&&(r[o]=[a,s])}return r}};function Io(t,e){return t.querySelector(`#${e}[data-turbo-permanent]`)}function Uo(t){return t.querySelectorAll("[id][data-turbo-permanent]")}var Re=class{started=!1;constructor(e,r){this.delegate=e,this.eventTarget=r}start(){this.started||(this.eventTarget.addEventListener("submit",this.submitCaptured,!0),this.started=!0)}stop(){this.started&&(this.eventTarget.removeEventListener("submit",this.submitCaptured,!0),this.started=!1)}submitCaptured=()=>{this.eventTarget.removeEventListener("submit",this.submitBubbled,!1),this.eventTarget.addEventListener("submit",this.submitBubbled,!1)};submitBubbled=e=>{if(!e.defaultPrevented){let r=e.target instanceof HTMLFormElement?e.target:void 0,a=e.submitter||void 0;r&&dn(r,a)&&cn(r,a)&&this.delegate.willSubmitForm(r,a)&&(e.preventDefault(),e.stopImmediatePropagation(),this.delegate.formSubmitted(r,a))}}};function dn(t,e){return(e?.getAttribute("formmethod")||t.getAttribute("method"))!="dialog"}function cn(t,e){let r=e?.getAttribute("formtarget")||t.getAttribute("target");return Fo(r)}var Qe=class{#e=e=>{};#t=e=>{};constructor(e,r){this.delegate=e,this.element=r}scrollToAnchor(e){let r=this.snapshot.getElementForAnchor(e);r?(this.scrollToElement(r),this.focusElement(r)):this.scrollToPosition({x:0,y:0})}scrollToAnchorFromLocation(e){this.scrollToAnchor(re(e))}scrollToElement(e){e.scrollIntoView()}focusElement(e){e instanceof HTMLElement&&(e.hasAttribute("tabindex")?e.focus():(e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")))}scrollToPosition({x:e,y:r}){this.scrollRoot.scrollTo(e,r)}scrollToTop(){this.scrollToPosition({x:0,y:0})}get scrollRoot(){return window}async render(e){let{isPreview:r,shouldRender:a,willRender:o,newSnapshot:s}=e,i=o;if(a)try{this.renderPromise=new Promise(x=>this.#e=x),this.renderer=e,await this.prepareToRenderSnapshot(e);let n=new Promise(x=>this.#t=x),l={resume:this.#t,render:this.renderer.renderElement,renderMethod:this.renderer.renderMethod};this.delegate.allowsImmediateRender(s,l)||await n,await this.renderSnapshot(e),this.delegate.viewRenderedSnapshot(s,r,this.renderer.renderMethod),this.delegate.preloadOnLoadLinksForView(this.element),this.finishRenderingSnapshot(e)}finally{delete this.renderer,this.#e(void 0),delete this.renderPromise}else i&&this.invalidate(e.reloadReason)}invalidate(e){this.delegate.viewInvalidated(e)}async prepareToRenderSnapshot(e){this.markAsPreview(e.isPreview),await e.prepareToRender()}markAsPreview(e){e?this.element.setAttribute("data-turbo-preview",""):this.element.removeAttribute("data-turbo-preview")}markVisitDirection(e){this.element.setAttribute("data-turbo-visit-direction",e)}unmarkVisitDirection(){this.element.removeAttribute("data-turbo-visit-direction")}async renderSnapshot(e){await e.render()}finishRenderingSnapshot(e){e.finishRendering()}},It=class extends Qe{missing(){this.element.innerHTML='<strong class="turbo-frame-error">Content missing</strong>'}get snapshot(){return new be(this.element)}},Ye=class{constructor(e,r){this.delegate=e,this.element=r}start(){this.element.addEventListener("click",this.clickBubbled),document.addEventListener("turbo:click",this.linkClicked),document.addEventListener("turbo:before-visit",this.willVisit)}stop(){this.element.removeEventListener("click",this.clickBubbled),document.removeEventListener("turbo:click",this.linkClicked),document.removeEventListener("turbo:before-visit",this.willVisit)}clickBubbled=e=>{this.clickEventIsSignificant(e)?this.clickEvent=e:delete this.clickEvent};linkClicked=e=>{this.clickEvent&&this.clickEventIsSignificant(e)&&this.delegate.shouldInterceptLinkClick(e.target,e.detail.url,e.detail.originalEvent)&&(this.clickEvent.preventDefault(),e.preventDefault(),this.delegate.linkClickIntercepted(e.target,e.detail.url,e.detail.originalEvent)),delete this.clickEvent};willVisit=e=>{delete this.clickEvent};clickEventIsSignificant(e){let r=e.composed?e.target?.parentElement:e.target,a=Bo(r)||r;return a instanceof Element&&a.closest("turbo-frame, html")==this.element}},et=class{started=!1;constructor(e,r){this.delegate=e,this.eventTarget=r}start(){this.started||(this.eventTarget.addEventListener("click",this.clickCaptured,!0),this.started=!0)}stop(){this.started&&(this.eventTarget.removeEventListener("click",this.clickCaptured,!0),this.started=!1)}clickCaptured=()=>{this.eventTarget.removeEventListener("click",this.clickBubbled,!1),this.eventTarget.addEventListener("click",this.clickBubbled,!1)};clickBubbled=e=>{if(e instanceof MouseEvent&&this.clickEventIsSignificant(e)){let r=e.composedPath&&e.composedPath()[0]||e.target,a=Bo(r);if(a&&Fo(a.target)){let o=qo(a);this.delegate.willFollowLinkToLocation(a,o,e)&&(e.preventDefault(),this.delegate.followedLinkToLocation(a,o))}}};clickEventIsSignificant(e){return!(e.target&&e.target.isContentEditable||e.defaultPrevented||e.which>1||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}},tt=class{constructor(e,r){this.delegate=e,this.linkInterceptor=new et(this,r)}start(){this.linkInterceptor.start()}stop(){this.linkInterceptor.stop()}canPrefetchRequestToLocation(e,r){return!1}prefetchAndCacheRequestToLocation(e,r){}willFollowLinkToLocation(e,r,a){return this.delegate.willSubmitFormLinkToLocation(e,r,a)&&(e.hasAttribute("data-turbo-method")||e.hasAttribute("data-turbo-stream"))}followedLinkToLocation(e,r){let a=document.createElement("form"),o="hidden";for(let[w,h]of r.searchParams)a.append(Object.assign(document.createElement("input"),{type:o,name:w,value:h}));let s=Object.assign(r,{search:""});a.setAttribute("data-turbo","true"),a.setAttribute("action",s.href),a.setAttribute("hidden","");let i=e.getAttribute("data-turbo-method");i&&a.setAttribute("method",i);let n=e.getAttribute("data-turbo-frame");n&&a.setAttribute("data-turbo-frame",n);let l=te(e);l&&a.setAttribute("data-turbo-action",l);let p=e.getAttribute("data-turbo-confirm");p&&a.setAttribute("data-turbo-confirm",p),e.hasAttribute("data-turbo-stream")&&a.setAttribute("data-turbo-stream",""),this.delegate.submittedFormLinkToLocation(e,r,a),document.body.appendChild(a),a.addEventListener("turbo:submit-end",()=>a.remove(),{once:!0}),requestAnimationFrame(()=>a.requestSubmit())}},rt=class{static async preservingPermanentElements(e,r,a){let o=new this(e,r);o.enter(),await a(),o.leave()}constructor(e,r){this.delegate=e,this.permanentElementMap=r}enter(){for(let e in this.permanentElementMap){let[r,a]=this.permanentElementMap[e];this.delegate.enteringBardo(r,a),this.replaceNewPermanentElementWithPlaceholder(a)}}leave(){for(let e in this.permanentElementMap){let[r]=this.permanentElementMap[e];this.replaceCurrentPermanentElementWithClone(r),this.replacePlaceholderWithPermanentElement(r),this.delegate.leavingBardo(r)}}replaceNewPermanentElementWithPlaceholder(e){let r=pn(e);e.replaceWith(r)}replaceCurrentPermanentElementWithClone(e){let r=e.cloneNode(!0);e.replaceWith(r)}replacePlaceholderWithPermanentElement(e){this.getPlaceholderById(e.id)?.replaceWith(e)}getPlaceholderById(e){return this.placeholders.find(r=>r.content==e)}get placeholders(){return[...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")]}};function pn(t){let e=document.createElement("meta");return e.setAttribute("name","turbo-permanent-placeholder"),e.setAttribute("content",t.id),e}var ke=class{#e=null;static renderElement(e,r){}constructor(e,r,a,o=!0){this.currentSnapshot=e,this.newSnapshot=r,this.isPreview=a,this.willRender=o,this.renderElement=this.constructor.renderElement,this.promise=new Promise((s,i)=>this.resolvingFunctions={resolve:s,reject:i})}get shouldRender(){return!0}get shouldAutofocus(){return!0}get reloadReason(){}prepareToRender(){}render(){}finishRendering(){this.resolvingFunctions&&(this.resolvingFunctions.resolve(),delete this.resolvingFunctions)}async preservingPermanentElements(e){await rt.preservingPermanentElements(this,this.permanentElementMap,e)}focusFirstAutofocusableElement(){if(this.shouldAutofocus){let e=this.connectedSnapshot.firstAutofocusableElement;e&&e.focus()}}enteringBardo(e){this.#e||e.contains(this.currentSnapshot.activeElement)&&(this.#e=this.currentSnapshot.activeElement)}leavingBardo(e){e.contains(this.#e)&&this.#e instanceof HTMLElement&&(this.#e.focus(),this.#e=null)}get connectedSnapshot(){return this.newSnapshot.isConnected?this.newSnapshot:this.currentSnapshot}get currentElement(){return this.currentSnapshot.element}get newElement(){return this.newSnapshot.element}get permanentElementMap(){return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot)}get renderMethod(){return"replace"}},Fe=class extends ke{static renderElement(e,r){let a=document.createRange();a.selectNodeContents(e),a.deleteContents();let o=r,s=o.ownerDocument?.createRange();s&&(s.selectNodeContents(o),e.appendChild(s.extractContents()))}constructor(e,r,a,o,s,i=!0){super(r,a,o,s,i),this.delegate=e}get shouldRender(){return!0}async render(){await Pe(),this.preservingPermanentElements(()=>{this.loadFrameElement()}),this.scrollFrameIntoView(),await Pe(),this.focusFirstAutofocusableElement(),await Pe(),this.activateScriptElements()}loadFrameElement(){this.delegate.willRenderFrame(this.currentElement,this.newElement),this.renderElement(this.currentElement,this.newElement)}scrollFrameIntoView(){if(this.currentElement.autoscroll||this.newElement.autoscroll){let e=this.currentElement.firstElementChild,r=mn(this.currentElement.getAttribute("data-autoscroll-block"),"end"),a=hn(this.currentElement.getAttribute("data-autoscroll-behavior"),"auto");if(e)return e.scrollIntoView({block:r,behavior:a}),!0}return!1}activateScriptElements(){for(let e of this.newScriptElements){let r=Te(e);e.replaceWith(r)}}get newScriptElements(){return this.currentElement.querySelectorAll("script")}};function mn(t,e){return t=="end"||t=="start"||t=="center"||t=="nearest"?t:e}function hn(t,e){return t=="auto"||t=="smooth"?t:e}var xn=function(){let t=()=>{},e={morphStyle:"outerHTML",callbacks:{beforeNodeAdded:t,afterNodeAdded:t,beforeNodeMorphed:t,afterNodeMorphed:t,beforeNodeRemoved:t,afterNodeRemoved:t,beforeAttributeUpdated:t},head:{style:"merge",shouldPreserve:h=>h.getAttribute("im-preserve")==="true",shouldReAppend:h=>h.getAttribute("im-re-append")==="true",shouldRemove:t,afterHeadMorphed:t},restoreFocus:!0};function r(h,y,C={}){h=x(h);let E=w(y),m=p(h,E,C),b=o(m,()=>n(m,h,E,u=>u.morphStyle==="innerHTML"?(s(u,h,E),Array.from(h.childNodes)):a(u,h,E)));return m.pantry.remove(),b}function a(h,y,C){let E=w(y),m=Array.from(E.childNodes),b=m.indexOf(y),u=m.length-(b+1);return s(h,E,C,y,y.nextSibling),m=Array.from(E.childNodes),m.slice(b,m.length-u)}function o(h,y){if(!h.config.restoreFocus)return y();let C=document.activeElement;if(!(C instanceof HTMLInputElement||C instanceof HTMLTextAreaElement))return y();let{id:E,selectionStart:m,selectionEnd:b}=C,u=y();return E&&E!==document.activeElement?.id&&(C=h.target.querySelector(`#${E}`),C?.focus()),C&&!C.selectionEnd&&b&&C.setSelectionRange(m,b),u}let s=function(){function h(f,d,v,g=null,S=null){d instanceof HTMLTemplateElement&&v instanceof HTMLTemplateElement&&(d=d.content,v=v.content),g||=d.firstChild;for(let A of v.childNodes){if(g&&g!=S){let _=C(f,A,g,S);if(_){_!==g&&m(f,g,_),i(_,A,f),g=_.nextSibling;continue}}if(A instanceof Element&&f.persistentIds.has(A.id)){let _=b(d,A.id,g,f);i(_,A,f),g=_.nextSibling;continue}let L=y(d,A,g,f);L&&(g=L.nextSibling)}for(;g&&g!=S;){let A=g;g=g.nextSibling,E(f,A)}}function y(f,d,v,g){if(g.callbacks.beforeNodeAdded(d)===!1)return null;if(g.idMap.has(d)){let S=document.createElement(d.tagName);return f.insertBefore(S,v),i(S,d,g),g.callbacks.afterNodeAdded(S),S}else{let S=document.importNode(d,!0);return f.insertBefore(S,v),g.callbacks.afterNodeAdded(S),S}}let C=function(){function f(g,S,A,L){let _=null,ce=S.nextSibling,go=0,H=A;for(;H&&H!=L;){if(v(H,S)){if(d(g,H,S))return H;_===null&&(g.idMap.has(H)||(_=H))}if(_===null&&ce&&v(H,ce)&&(go++,ce=ce.nextSibling,go>=2&&(_=void 0)),H.contains(document.activeElement))break;H=H.nextSibling}return _||null}function d(g,S,A){let L=g.idMap.get(S),_=g.idMap.get(A);if(!_||!L)return!1;for(let ce of L)if(_.has(ce))return!0;return!1}function v(g,S){let A=g,L=S;return A.nodeType===L.nodeType&&A.tagName===L.tagName&&(!A.id||A.id===L.id)}return f}();function E(f,d){if(f.idMap.has(d))c(f.pantry,d,null);else{if(f.callbacks.beforeNodeRemoved(d)===!1)return;d.parentNode?.removeChild(d),f.callbacks.afterNodeRemoved(d)}}function m(f,d,v){let g=d;for(;g&&g!==v;){let S=g;g=g.nextSibling,E(f,S)}return g}function b(f,d,v,g){let S=g.target.querySelector(`#${d}`)||g.pantry.querySelector(`#${d}`);return u(S,g),c(f,S,v),S}function u(f,d){let v=f.id;for(;f=f.parentNode;){let g=d.idMap.get(f);g&&(g.delete(v),g.size||d.idMap.delete(f))}}function c(f,d,v){if(f.moveBefore)try{f.moveBefore(d,v)}catch{f.insertBefore(d,v)}else f.insertBefore(d,v)}return h}(),i=function(){function h(u,c,f){return f.ignoreActive&&u===document.activeElement?null:(f.callbacks.beforeNodeMorphed(u,c)===!1||(u instanceof HTMLHeadElement&&f.head.ignore||(u instanceof HTMLHeadElement&&f.head.style!=="morph"?l(u,c,f):(y(u,c,f),b(u,f)||s(f,u,c))),f.callbacks.afterNodeMorphed(u,c)),u)}function y(u,c,f){let d=c.nodeType;if(d===1){let v=u,g=c,S=v.attributes,A=g.attributes;for(let L of A)m(L.name,v,"update",f)||v.getAttribute(L.name)!==L.value&&v.setAttribute(L.name,L.value);for(let L=S.length-1;0<=L;L--){let _=S[L];if(_&&!g.hasAttribute(_.name)){if(m(_.name,v,"remove",f))continue;v.removeAttribute(_.name)}}b(v,f)||C(v,g,f)}(d===8||d===3)&&u.nodeValue!==c.nodeValue&&(u.nodeValue=c.nodeValue)}function C(u,c,f){if(u instanceof HTMLInputElement&&c instanceof HTMLInputElement&&c.type!=="file"){let d=c.value,v=u.value;E(u,c,"checked",f),E(u,c,"disabled",f),c.hasAttribute("value")?v!==d&&(m("value",u,"update",f)||(u.setAttribute("value",d),u.value=d)):m("value",u,"remove",f)||(u.value="",u.removeAttribute("value"))}else if(u instanceof HTMLOptionElement&&c instanceof HTMLOptionElement)E(u,c,"selected",f);else if(u instanceof HTMLTextAreaElement&&c instanceof HTMLTextAreaElement){let d=c.value,v=u.value;if(m("value",u,"update",f))return;d!==v&&(u.value=d),u.firstChild&&u.firstChild.nodeValue!==d&&(u.firstChild.nodeValue=d)}}function E(u,c,f,d){let v=c[f],g=u[f];if(v!==g){let S=m(f,u,"update",d);S||(u[f]=c[f]),v?S||u.setAttribute(f,""):m(f,u,"remove",d)||u.removeAttribute(f)}}function m(u,c,f,d){return u==="value"&&d.ignoreActiveValue&&c===document.activeElement?!0:d.callbacks.beforeAttributeUpdated(u,c,f)===!1}function b(u,c){return!!c.ignoreActiveValue&&u===document.activeElement&&u!==document.body}return h}();function n(h,y,C,E){if(h.head.block){let m=y.querySelector("head"),b=C.querySelector("head");if(m&&b){let u=l(m,b,h);return Promise.all(u).then(()=>{let c=Object.assign(h,{head:{block:!1,ignore:!0}});return E(c)})}}return E(h)}function l(h,y,C){let E=[],m=[],b=[],u=[],c=new Map;for(let d of y.children)c.set(d.outerHTML,d);for(let d of h.children){let v=c.has(d.outerHTML),g=C.head.shouldReAppend(d),S=C.head.shouldPreserve(d);v||S?g?m.push(d):(c.delete(d.outerHTML),b.push(d)):C.head.style==="append"?g&&(m.push(d),u.push(d)):C.head.shouldRemove(d)!==!1&&m.push(d)}u.push(...c.values());let f=[];for(let d of u){let v=document.createRange().createContextualFragment(d.outerHTML).firstChild;if(C.callbacks.beforeNodeAdded(v)!==!1){if("href"in v&&v.href||"src"in v&&v.src){let g,S=new Promise(function(A){g=A});v.addEventListener("load",function(){g()}),f.push(S)}h.appendChild(v),C.callbacks.afterNodeAdded(v),E.push(v)}}for(let d of m)C.callbacks.beforeNodeRemoved(d)!==!1&&(h.removeChild(d),C.callbacks.afterNodeRemoved(d));return C.head.afterHeadMorphed(h,{added:E,kept:b,removed:m}),f}let p=function(){function h(c,f,d){let{persistentIds:v,idMap:g}=b(c,f),S=y(d),A=S.morphStyle||"outerHTML";if(!["innerHTML","outerHTML"].includes(A))throw`Do not understand how to morph style ${A}`;return{target:c,newContent:f,config:S,morphStyle:A,ignoreActive:S.ignoreActive,ignoreActiveValue:S.ignoreActiveValue,restoreFocus:S.restoreFocus,idMap:g,persistentIds:v,pantry:C(),callbacks:S.callbacks,head:S.head}}function y(c){let f=Object.assign({},e);return Object.assign(f,c),f.callbacks=Object.assign({},e.callbacks,c.callbacks),f.head=Object.assign({},e.head,c.head),f}function C(){let c=document.createElement("div");return c.hidden=!0,document.body.insertAdjacentElement("afterend",c),c}function E(c){let f=Array.from(c.querySelectorAll("[id]"));return c.id&&f.push(c),f}function m(c,f,d,v){for(let g of v)if(f.has(g.id)){let S=g;for(;S;){let A=c.get(S);if(A==null&&(A=new Set,c.set(S,A)),A.add(g.id),S===d)break;S=S.parentElement}}}function b(c,f){let d=E(c),v=E(f),g=u(d,v),S=new Map;m(S,g,c,d);let A=f.__idiomorphRoot||f;return m(S,g,A,v),{persistentIds:g,idMap:S}}function u(c,f){let d=new Set,v=new Map;for(let{id:S,tagName:A}of c)v.has(S)?d.add(S):v.set(S,A);let g=new Set;for(let{id:S,tagName:A}of f)g.has(S)?d.add(S):v.get(S)===A&&g.add(S);for(let S of d)g.delete(S);return g}return h}(),{normalizeElement:x,normalizeParent:w}=function(){let h=new WeakSet;function y(b){return b instanceof Document?b.documentElement:b}function C(b){if(b==null)return document.createElement("div");if(typeof b=="string")return C(m(b));if(h.has(b))return b;if(b instanceof Node){if(b.parentNode)return E(b);{let u=document.createElement("div");return u.append(b),u}}else{let u=document.createElement("div");for(let c of[...b])u.append(c);return u}}function E(b){return{childNodes:[b],querySelectorAll:u=>{let c=b.querySelectorAll(u);return b.matches(u)?[b,...c]:c},insertBefore:(u,c)=>b.parentNode.insertBefore(u,c),moveBefore:(u,c)=>b.parentNode.moveBefore(u,c),get __idiomorphRoot(){return b}}}function m(b){let u=new DOMParser,c=b.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(c.match(/<\/html>/)||c.match(/<\/head>/)||c.match(/<\/body>/)){let f=u.parseFromString(b,"text/html");if(c.match(/<\/html>/))return h.add(f),f;{let d=f.firstChild;return d&&h.add(d),d}}else{let d=u.parseFromString("<body><template>"+b+"</template></body>","text/html").body.querySelector("template").content;return h.add(d),d}}return{normalizeElement:y,normalizeParent:C}}();return{morph:r,defaults:e}}();function br(t,e,{callbacks:r,...a}={}){xn.morph(t,e,{...a,callbacks:new Ut(r)})}function Vo(t,e){br(t,e.childNodes,{morphStyle:"innerHTML"})}var Ut=class{#e;constructor({beforeNodeMorphed:e}={}){this.#e=e||(()=>!0)}beforeNodeAdded=e=>!(e.id&&e.hasAttribute("data-turbo-permanent")&&document.getElementById(e.id));beforeNodeMorphed=(e,r)=>{if(e instanceof Element)return!e.hasAttribute("data-turbo-permanent")&&this.#e(e,r)?!P("turbo:before-morph-element",{cancelable:!0,target:e,detail:{currentElement:e,newElement:r}}).defaultPrevented:!1};beforeAttributeUpdated=(e,r,a)=>!P("turbo:before-morph-attribute",{cancelable:!0,target:r,detail:{attributeName:e,mutationType:a}}).defaultPrevented;beforeNodeRemoved=e=>this.beforeNodeMorphed(e);afterNodeMorphed=(e,r)=>{e instanceof Element&&P("turbo:morph-element",{target:e,detail:{currentElement:e,newElement:r}})}},Vt=class extends Fe{static renderElement(e,r){P("turbo:before-frame-morph",{target:e,detail:{currentElement:e,newElement:r}}),Vo(e,r)}async preservingPermanentElements(e){return await e()}},Nt=class t{static animationDuration=300;static get defaultCSS(){return To`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${t.animationDuration}ms ease-out,
          opacity ${t.animationDuration/2}ms ${t.animationDuration/2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `}hiding=!1;value=0;visible=!1;constructor(){this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement(),this.installStylesheetElement(),this.setValue(0)}show(){this.visible||(this.visible=!0,this.installProgressElement(),this.startTrickling())}hide(){this.visible&&!this.hiding&&(this.hiding=!0,this.fadeProgressElement(()=>{this.uninstallProgressElement(),this.stopTrickling(),this.visible=!1,this.hiding=!1}))}setValue(e){this.value=e,this.refresh()}installStylesheetElement(){document.head.insertBefore(this.stylesheetElement,document.head.firstChild)}installProgressElement(){this.progressElement.style.width="0",this.progressElement.style.opacity="1",document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()}fadeProgressElement(e){this.progressElement.style.opacity="0",setTimeout(e,t.animationDuration*1.5)}uninstallProgressElement(){this.progressElement.parentNode&&document.documentElement.removeChild(this.progressElement)}startTrickling(){this.trickleInterval||(this.trickleInterval=window.setInterval(this.trickle,t.animationDuration))}stopTrickling(){window.clearInterval(this.trickleInterval),delete this.trickleInterval}trickle=()=>{this.setValue(this.value+Math.random()/100)};refresh(){requestAnimationFrame(()=>{this.progressElement.style.width=`${10+this.value*90}%`})}createStylesheetElement(){let e=document.createElement("style");e.type="text/css",e.textContent=t.defaultCSS;let r=Ro();return r&&(e.nonce=r),e}createProgressElement(){let e=document.createElement("div");return e.className="turbo-progress-bar",e}},Wt=class extends be{detailsByOuterHTML=this.children.filter(e=>!vn(e)).map(e=>Cn(e)).reduce((e,r)=>{let{outerHTML:a}=r,o=a in e?e[a]:{type:gn(r),tracked:bn(r),elements:[]};return{...e,[a]:{...o,elements:[...o.elements,r]}}},{});get trackedElementSignature(){return Object.keys(this.detailsByOuterHTML).filter(e=>this.detailsByOuterHTML[e].tracked).join("")}getScriptElementsNotInSnapshot(e){return this.getElementsMatchingTypeNotInSnapshot("script",e)}getStylesheetElementsNotInSnapshot(e){return this.getElementsMatchingTypeNotInSnapshot("stylesheet",e)}getElementsMatchingTypeNotInSnapshot(e,r){return Object.keys(this.detailsByOuterHTML).filter(a=>!(a in r.detailsByOuterHTML)).map(a=>this.detailsByOuterHTML[a]).filter(({type:a})=>a==e).map(({elements:[a]})=>a)}get provisionalElements(){return Object.keys(this.detailsByOuterHTML).reduce((e,r)=>{let{type:a,tracked:o,elements:s}=this.detailsByOuterHTML[r];return a==null&&!o?[...e,...s]:s.length>1?[...e,...s.slice(1)]:e},[])}getMetaValue(e){let r=this.findMetaElementByName(e);return r?r.getAttribute("content"):null}findMetaElementByName(e){return Object.keys(this.detailsByOuterHTML).reduce((r,a)=>{let{elements:[o]}=this.detailsByOuterHTML[a];return yn(o,e)?o:r},void 0|void 0)}};function gn(t){if(Sn(t))return"script";if(wn(t))return"stylesheet"}function bn(t){return t.getAttribute("data-turbo-track")=="reload"}function Sn(t){return t.localName=="script"}function vn(t){return t.localName=="noscript"}function wn(t){let e=t.localName;return e=="style"||e=="link"&&t.getAttribute("rel")=="stylesheet"}function yn(t,e){return t.localName=="meta"&&t.getAttribute("name")==e}function Cn(t){return t.hasAttribute("nonce")&&t.setAttribute("nonce",""),t}var I=class t extends be{static fromHTMLString(e=""){return this.fromDocument(Po(e))}static fromElement(e){return this.fromDocument(e.ownerDocument)}static fromDocument({documentElement:e,body:r,head:a}){return new this(e,r,new Wt(a))}constructor(e,r,a){super(r),this.documentElement=e,this.headSnapshot=a}clone(){let e=this.element.cloneNode(!0),r=this.element.querySelectorAll("select"),a=e.querySelectorAll("select");for(let[o,s]of r.entries()){let i=a[o];for(let n of i.selectedOptions)n.selected=!1;for(let n of s.selectedOptions)i.options[n.index].selected=!0}for(let o of e.querySelectorAll('input[type="password"]'))o.value="";return new t(this.documentElement,e,this.headSnapshot)}get lang(){return this.documentElement.getAttribute("lang")}get headElement(){return this.headSnapshot.element}get rootLocation(){let e=this.getSetting("root")??"/";return B(e)}get cacheControlValue(){return this.getSetting("cache-control")}get isPreviewable(){return this.cacheControlValue!="no-preview"}get isCacheable(){return this.cacheControlValue!="no-cache"}get isVisitable(){return this.getSetting("visit-control")!="reload"}get prefersViewTransitions(){return this.headSnapshot.getMetaValue("view-transition")==="same-origin"}get shouldMorphPage(){return this.getSetting("refresh-method")==="morph"}get shouldPreserveScrollPosition(){return this.getSetting("refresh-scroll")==="preserve"}getSetting(e){return this.headSnapshot.getMetaValue(`turbo-${e}`)}},zt=class{#e=!1;#t=Promise.resolve();renderChange(e,r){return e&&this.viewTransitionsAvailable&&!this.#e?(this.#e=!0,this.#t=this.#t.then(async()=>{await document.startViewTransition(r).finished})):this.#t=this.#t.then(r),this.#t}get viewTransitionsAvailable(){return document.startViewTransition}},An={action:"advance",historyChanged:!1,visitCachedSnapshot:()=>{},willRender:!0,updateHistory:!0,shouldCacheSnapshot:!0,acceptsStreamResponse:!1},Ge={visitStart:"visitStart",requestStart:"requestStart",requestEnd:"requestEnd",visitEnd:"visitEnd"},z={initialized:"initialized",started:"started",canceled:"canceled",failed:"failed",completed:"completed"},ge={networkFailure:0,timeoutFailure:-1,contentTypeMismatch:-2},En={advance:"forward",restore:"back",replace:"none"},$t=class{identifier=j();timingMetrics={};followedRedirect=!1;historyChanged=!1;scrolled=!1;shouldCacheSnapshot=!0;acceptsStreamResponse=!1;snapshotCached=!1;state=z.initialized;viewTransitioner=new zt;constructor(e,r,a,o={}){this.delegate=e,this.location=r,this.restorationIdentifier=a||j();let{action:s,historyChanged:i,referrer:n,snapshot:l,snapshotHTML:p,response:x,visitCachedSnapshot:w,willRender:h,updateHistory:y,shouldCacheSnapshot:C,acceptsStreamResponse:E,direction:m}={...An,...o};this.action=s,this.historyChanged=i,this.referrer=n,this.snapshot=l,this.snapshotHTML=p,this.response=x,this.isSamePage=this.delegate.locationWithActionIsSamePage(this.location,this.action),this.isPageRefresh=this.view.isPageRefresh(this),this.visitCachedSnapshot=w,this.willRender=h,this.updateHistory=y,this.scrolled=!h,this.shouldCacheSnapshot=C,this.acceptsStreamResponse=E,this.direction=m||En[s]}get adapter(){return this.delegate.adapter}get view(){return this.delegate.view}get history(){return this.delegate.history}get restorationData(){return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)}get silent(){return this.isSamePage}start(){this.state==z.initialized&&(this.recordTimingMetric(Ge.visitStart),this.state=z.started,this.adapter.visitStarted(this),this.delegate.visitStarted(this))}cancel(){this.state==z.started&&(this.request&&this.request.cancel(),this.cancelRender(),this.state=z.canceled)}complete(){this.state==z.started&&(this.recordTimingMetric(Ge.visitEnd),this.adapter.visitCompleted(this),this.state=z.completed,this.followRedirect(),this.followedRedirect||this.delegate.visitCompleted(this))}fail(){this.state==z.started&&(this.state=z.failed,this.adapter.visitFailed(this),this.delegate.visitCompleted(this))}changeHistory(){if(!this.historyChanged&&this.updateHistory){let e=this.location.href===this.referrer?.href?"replace":this.action,r=_o(e);this.history.update(r,this.location,this.restorationIdentifier),this.historyChanged=!0}}issueRequest(){this.hasPreloadedResponse()?this.simulateRequest():this.shouldIssueRequest()&&!this.request&&(this.request=new ae(this,D.get,this.location),this.request.perform())}simulateRequest(){this.response&&(this.startRequest(),this.recordResponse(),this.finishRequest())}startRequest(){this.recordTimingMetric(Ge.requestStart),this.adapter.visitRequestStarted(this)}recordResponse(e=this.response){if(this.response=e,e){let{statusCode:r}=e;vo(r)?this.adapter.visitRequestCompleted(this):this.adapter.visitRequestFailedWithStatusCode(this,r)}}finishRequest(){this.recordTimingMetric(Ge.requestEnd),this.adapter.visitRequestFinished(this)}loadResponse(){if(this.response){let{statusCode:e,responseHTML:r}=this.response;this.render(async()=>{if(this.shouldCacheSnapshot&&this.cacheSnapshot(),this.view.renderPromise&&await this.view.renderPromise,vo(e)&&r!=null){let a=I.fromHTMLString(r);await this.renderPageSnapshot(a,!1),this.adapter.visitRendered(this),this.complete()}else await this.view.renderError(I.fromHTMLString(r),this),this.adapter.visitRendered(this),this.fail()})}}getCachedSnapshot(){let e=this.view.getCachedSnapshotForLocation(this.location)||this.getPreloadedSnapshot();if(e&&(!re(this.location)||e.hasAnchor(re(this.location)))&&(this.action=="restore"||e.isPreviewable))return e}getPreloadedSnapshot(){if(this.snapshotHTML)return I.fromHTMLString(this.snapshotHTML)}hasCachedSnapshot(){return this.getCachedSnapshot()!=null}loadCachedSnapshot(){let e=this.getCachedSnapshot();if(e){let r=this.shouldIssueRequest();this.render(async()=>{this.cacheSnapshot(),this.isSamePage||this.isPageRefresh?this.adapter.visitRendered(this):(this.view.renderPromise&&await this.view.renderPromise,await this.renderPageSnapshot(e,r),this.adapter.visitRendered(this),r||this.complete())})}}followRedirect(){this.redirectedToLocation&&!this.followedRedirect&&this.response?.redirected&&(this.adapter.visitProposedToLocation(this.redirectedToLocation,{action:"replace",response:this.response,shouldCacheSnapshot:!1,willRender:!1}),this.followedRedirect=!0)}goToSamePageAnchor(){this.isSamePage&&this.render(async()=>{this.cacheSnapshot(),this.performScroll(),this.changeHistory(),this.adapter.visitRendered(this)})}prepareRequest(e){this.acceptsStreamResponse&&e.acceptResponseType(K.contentType)}requestStarted(){this.startRequest()}requestPreventedHandlingResponse(e,r){}async requestSucceededWithResponse(e,r){let a=await r.responseHTML,{redirected:o,statusCode:s}=r;a==null?this.recordResponse({statusCode:ge.contentTypeMismatch,redirected:o}):(this.redirectedToLocation=r.redirected?r.location:void 0,this.recordResponse({statusCode:s,responseHTML:a,redirected:o}))}async requestFailedWithResponse(e,r){let a=await r.responseHTML,{redirected:o,statusCode:s}=r;a==null?this.recordResponse({statusCode:ge.contentTypeMismatch,redirected:o}):this.recordResponse({statusCode:s,responseHTML:a,redirected:o})}requestErrored(e,r){this.recordResponse({statusCode:ge.networkFailure,redirected:!1})}requestFinished(){this.finishRequest()}performScroll(){!this.scrolled&&!this.view.forceReloaded&&!this.view.shouldPreserveScrollPosition(this)&&(this.action=="restore"?this.scrollToRestoredPosition()||this.scrollToAnchor()||this.view.scrollToTop():this.scrollToAnchor()||this.view.scrollToTop(),this.isSamePage&&this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation,this.location),this.scrolled=!0)}scrollToRestoredPosition(){let{scrollPosition:e}=this.restorationData;if(e)return this.view.scrollToPosition(e),!0}scrollToAnchor(){let e=re(this.location);if(e!=null)return this.view.scrollToAnchor(e),!0}recordTimingMetric(e){this.timingMetrics[e]=new Date().getTime()}getTimingMetrics(){return{...this.timingMetrics}}hasPreloadedResponse(){return typeof this.response=="object"}shouldIssueRequest(){return this.isSamePage?!1:this.action=="restore"?!this.hasCachedSnapshot():this.willRender}cacheSnapshot(){this.snapshotCached||(this.view.cacheSnapshot(this.snapshot).then(e=>e&&this.visitCachedSnapshot(e)),this.snapshotCached=!0)}async render(e){this.cancelRender(),await new Promise(r=>{this.frame=document.visibilityState==="hidden"?setTimeout(()=>r(),0):requestAnimationFrame(()=>r())}),await e(),delete this.frame}async renderPageSnapshot(e,r){await this.viewTransitioner.renderChange(this.view.shouldTransitionTo(e),async()=>{await this.view.renderPage(e,r,this.willRender,this),this.performScroll()})}cancelRender(){this.frame&&(cancelAnimationFrame(this.frame),delete this.frame)}};function vo(t){return t>=200&&t<300}var Gt=class{progressBar=new Nt;constructor(e){this.session=e}visitProposedToLocation(e,r){G(e,this.navigator.rootLocation)?this.navigator.startVisit(e,r?.restorationIdentifier||j(),r):window.location.href=e.toString()}visitStarted(e){this.location=e.location,e.loadCachedSnapshot(),e.issueRequest(),e.goToSamePageAnchor()}visitRequestStarted(e){this.progressBar.setValue(0),e.hasCachedSnapshot()||e.action!="restore"?this.showVisitProgressBarAfterDelay():this.showProgressBar()}visitRequestCompleted(e){e.loadResponse()}visitRequestFailedWithStatusCode(e,r){switch(r){case ge.networkFailure:case ge.timeoutFailure:case ge.contentTypeMismatch:return this.reload({reason:"request_failed",context:{statusCode:r}});default:return e.loadResponse()}}visitRequestFinished(e){}visitCompleted(e){this.progressBar.setValue(1),this.hideVisitProgressBar()}pageInvalidated(e){this.reload(e)}visitFailed(e){this.progressBar.setValue(1),this.hideVisitProgressBar()}visitRendered(e){}linkPrefetchingIsEnabledForLocation(e){return!0}formSubmissionStarted(e){this.progressBar.setValue(0),this.showFormProgressBarAfterDelay()}formSubmissionFinished(e){this.progressBar.setValue(1),this.hideFormProgressBar()}showVisitProgressBarAfterDelay(){this.visitProgressBarTimeout=window.setTimeout(this.showProgressBar,this.session.progressBarDelay)}hideVisitProgressBar(){this.progressBar.hide(),this.visitProgressBarTimeout!=null&&(window.clearTimeout(this.visitProgressBarTimeout),delete this.visitProgressBarTimeout)}showFormProgressBarAfterDelay(){this.formProgressBarTimeout==null&&(this.formProgressBarTimeout=window.setTimeout(this.showProgressBar,this.session.progressBarDelay))}hideFormProgressBar(){this.progressBar.hide(),this.formProgressBarTimeout!=null&&(window.clearTimeout(this.formProgressBarTimeout),delete this.formProgressBarTimeout)}showProgressBar=()=>{this.progressBar.show()};reload(e){P("turbo:reload",{detail:e}),window.location.href=this.location?.toString()||window.location.href}get navigator(){return this.session.navigator}},jt=class{selector="[data-turbo-temporary]";deprecatedSelector="[data-turbo-cache=false]";started=!1;start(){this.started||(this.started=!0,addEventListener("turbo:before-cache",this.removeTemporaryElements,!1))}stop(){this.started&&(this.started=!1,removeEventListener("turbo:before-cache",this.removeTemporaryElements,!1))}removeTemporaryElements=e=>{for(let r of this.temporaryElements)r.remove()};get temporaryElements(){return[...document.querySelectorAll(this.selector),...this.temporaryElementsWithDeprecation]}get temporaryElementsWithDeprecation(){let e=document.querySelectorAll(this.deprecatedSelector);return e.length&&console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`),[...e]}},Kt=class{constructor(e,r){this.session=e,this.element=r,this.linkInterceptor=new Ye(this,r),this.formSubmitObserver=new Re(this,r)}start(){this.linkInterceptor.start(),this.formSubmitObserver.start()}stop(){this.linkInterceptor.stop(),this.formSubmitObserver.stop()}shouldInterceptLinkClick(e,r,a){return this.#t(e)}linkClickIntercepted(e,r,a){let o=this.#r(e);o&&o.delegate.linkClickIntercepted(e,r,a)}willSubmitForm(e,r){return e.closest("turbo-frame")==null&&this.#e(e,r)&&this.#t(e,r)}formSubmitted(e,r){let a=this.#r(e,r);a&&a.delegate.formSubmitted(e,r)}#e(e,r){let a=hr(e,r),o=this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),s=B(o?.content??"/");return this.#t(e,r)&&G(a,s)}#t(e,r){if(e instanceof HTMLFormElement?this.session.submissionIsNavigatable(e,r):this.session.elementIsNavigatable(e)){let o=this.#r(e,r);return o?o!=e.closest("turbo-frame"):!1}else return!1}#r(e,r){let a=r?.getAttribute("data-turbo-frame")||e.getAttribute("data-turbo-frame");if(a&&a!="_top"){let o=this.element.querySelector(`#${a}:not([disabled])`);if(o instanceof U)return o}}},Xt=class{location;restorationIdentifier=j();restorationData={};started=!1;pageLoaded=!1;currentIndex=0;constructor(e){this.delegate=e}start(){this.started||(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.currentIndex=history.state?.turbo?.restorationIndex||0,this.started=!0,this.replace(new URL(window.location.href)))}stop(){this.started&&(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1)}push(e,r){this.update(history.pushState,e,r)}replace(e,r){this.update(history.replaceState,e,r)}update(e,r,a=j()){e===history.pushState&&++this.currentIndex;let o={turbo:{restorationIdentifier:a,restorationIndex:this.currentIndex}};e.call(history,o,"",r.href),this.location=r,this.restorationIdentifier=a}getRestorationDataForIdentifier(e){return this.restorationData[e]||{}}updateRestorationData(e){let{restorationIdentifier:r}=this,a=this.restorationData[r];this.restorationData[r]={...a,...e}}assumeControlOfScrollRestoration(){this.previousScrollRestoration||(this.previousScrollRestoration=history.scrollRestoration??"auto",history.scrollRestoration="manual")}relinquishControlOfScrollRestoration(){this.previousScrollRestoration&&(history.scrollRestoration=this.previousScrollRestoration,delete this.previousScrollRestoration)}onPopState=e=>{if(this.shouldHandlePopState()){let{turbo:r}=e.state||{};if(r){this.location=new URL(window.location.href);let{restorationIdentifier:a,restorationIndex:o}=r;this.restorationIdentifier=a;let s=o>this.currentIndex?"forward":"back";this.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(this.location,a,s),this.currentIndex=o}}};onPageLoad=async e=>{await Bi(),this.pageLoaded=!0};shouldHandlePopState(){return this.pageIsLoaded()}pageIsLoaded(){return this.pageLoaded||document.readyState=="complete"}},Zt=class{started=!1;#e=null;constructor(e,r){this.delegate=e,this.eventTarget=r}start(){this.started||(this.eventTarget.readyState==="loading"?this.eventTarget.addEventListener("DOMContentLoaded",this.#t,{once:!0}):this.#t())}stop(){this.started&&(this.eventTarget.removeEventListener("mouseenter",this.#r,{capture:!0,passive:!0}),this.eventTarget.removeEventListener("mouseleave",this.#s,{capture:!0,passive:!0}),this.eventTarget.removeEventListener("turbo:before-fetch-request",this.#o,!0),this.started=!1)}#t=()=>{this.eventTarget.addEventListener("mouseenter",this.#r,{capture:!0,passive:!0}),this.eventTarget.addEventListener("mouseleave",this.#s,{capture:!0,passive:!0}),this.eventTarget.addEventListener("turbo:before-fetch-request",this.#o,!0),this.started=!0};#r=e=>{if(Ze("turbo-prefetch")==="false")return;let r=e.target;if(r.matches&&r.matches("a[href]:not([target^=_]):not([download])")&&this.#l(r)){let o=r,s=qo(o);if(this.delegate.canPrefetchRequestToLocation(o,s)){this.#e=o;let i=new ae(this,D.get,s,new URLSearchParams,r);he.setLater(s.toString(),i,this.#a)}}};#s=e=>{e.target===this.#e&&this.#i()};#i=()=>{he.clear(),this.#e=null};#o=e=>{if(e.target.tagName!=="FORM"&&e.detail.fetchOptions.method==="GET"){let r=he.get(e.detail.url.toString());r&&(e.detail.fetchRequest=r),he.clear()}};prepareRequest(e){let r=e.target;e.headers["X-Sec-Purpose"]="prefetch";let a=r.closest("turbo-frame"),o=r.getAttribute("data-turbo-frame")||a?.getAttribute("target")||a?.id;o&&o!=="_top"&&(e.headers["Turbo-Frame"]=o)}requestSucceededWithResponse(){}requestStarted(e){}requestErrored(e){}requestFinished(e){}requestPreventedHandlingResponse(e,r){}requestFailedWithResponse(e,r){}get#a(){return Number(Ze("turbo-prefetch-cache-time"))||rn}#l(e){return!(!e.getAttribute("href")||Mn(e)||Ln(e)||Pn(e)||Tn(e)||Rn(e))}},Mn=t=>t.origin!==document.location.origin||!["http:","https:"].includes(t.protocol)||t.hasAttribute("target"),Ln=t=>t.pathname+t.search===document.location.pathname+document.location.search||t.href.startsWith("#"),Pn=t=>{if(t.getAttribute("data-turbo-prefetch")==="false"||t.getAttribute("data-turbo")==="false")return!0;let e=xe(t,"[data-turbo-prefetch]");return!!(e&&e.getAttribute("data-turbo-prefetch")==="false")},Tn=t=>{let e=t.getAttribute("data-turbo-method");return!!(e&&e.toLowerCase()!=="get"||_n(t)||t.hasAttribute("data-turbo-confirm")||t.hasAttribute("data-turbo-stream"))},_n=t=>t.hasAttribute("data-remote")||t.hasAttribute("data-behavior")||t.hasAttribute("data-confirm")||t.hasAttribute("data-method"),Rn=t=>P("turbo:before-prefetch",{target:t,cancelable:!0}).defaultPrevented,Jt=class{constructor(e){this.delegate=e}proposeVisit(e,r={}){this.delegate.allowsVisitingLocationWithAction(e,r.action)&&this.delegate.visitProposedToLocation(e,r)}startVisit(e,r,a={}){this.stop(),this.currentVisit=new $t(this,B(e),r,{referrer:this.location,...a}),this.currentVisit.start()}submitForm(e,r){this.stop(),this.formSubmission=new Je(this,e,r,!0),this.formSubmission.start()}stop(){this.formSubmission&&(this.formSubmission.stop(),delete this.formSubmission),this.currentVisit&&(this.currentVisit.cancel(),delete this.currentVisit)}get adapter(){return this.delegate.adapter}get view(){return this.delegate.view}get rootLocation(){return this.view.snapshot.rootLocation}get history(){return this.delegate.history}formSubmissionStarted(e){typeof this.adapter.formSubmissionStarted=="function"&&this.adapter.formSubmissionStarted(e)}async formSubmissionSucceededWithResponse(e,r){if(e==this.formSubmission){let a=await r.responseHTML;if(a){let o=e.isSafe;o||this.view.clearSnapshotCache();let{statusCode:s,redirected:i}=r,l={action:this.#e(e,r),shouldCacheSnapshot:o,response:{statusCode:s,responseHTML:a,redirected:i}};this.proposeVisit(r.location,l)}}}async formSubmissionFailedWithResponse(e,r){let a=await r.responseHTML;if(a){let o=I.fromHTMLString(a);r.serverError?await this.view.renderError(o,this.currentVisit):await this.view.renderPage(o,!1,!0,this.currentVisit),o.shouldPreserveScrollPosition||this.view.scrollToTop(),this.view.clearSnapshotCache()}}formSubmissionErrored(e,r){console.error(r)}formSubmissionFinished(e){typeof this.adapter.formSubmissionFinished=="function"&&this.adapter.formSubmissionFinished(e)}linkPrefetchingIsEnabledForLocation(e){return typeof this.adapter.linkPrefetchingIsEnabledForLocation=="function"?this.adapter.linkPrefetchingIsEnabledForLocation(e):!0}visitStarted(e){this.delegate.visitStarted(e)}visitCompleted(e){this.delegate.visitCompleted(e),delete this.currentVisit}locationWithActionIsSamePage(e,r){let a=re(e),o=re(this.view.lastRenderedLocation),s=r==="restore"&&typeof a>"u";return r!=="replace"&&qt(e)===qt(this.view.lastRenderedLocation)&&(s||a!=null&&a!==o)}visitScrolledToSamePageLocation(e,r){this.delegate.visitScrolledToSamePageLocation(e,r)}get location(){return this.history.location}get restorationIdentifier(){return this.history.restorationIdentifier}#e(e,r){let{submitter:a,formElement:o}=e;return te(a,o)||this.#t(r)}#t(e){return e.redirected&&e.location.href===this.location?.href?"replace":"advance"}},Y={initial:0,loading:1,interactive:2,complete:3},Qt=class{stage=Y.initial;started=!1;constructor(e){this.delegate=e}start(){this.started||(this.stage==Y.initial&&(this.stage=Y.loading),document.addEventListener("readystatechange",this.interpretReadyState,!1),addEventListener("pagehide",this.pageWillUnload,!1),this.started=!0)}stop(){this.started&&(document.removeEventListener("readystatechange",this.interpretReadyState,!1),removeEventListener("pagehide",this.pageWillUnload,!1),this.started=!1)}interpretReadyState=()=>{let{readyState:e}=this;e=="interactive"?this.pageIsInteractive():e=="complete"&&this.pageIsComplete()};pageIsInteractive(){this.stage==Y.loading&&(this.stage=Y.interactive,this.delegate.pageBecameInteractive())}pageIsComplete(){this.pageIsInteractive(),this.stage==Y.interactive&&(this.stage=Y.complete,this.delegate.pageLoaded())}pageWillUnload=()=>{this.delegate.pageWillUnload()};get readyState(){return document.readyState}},Yt=class{started=!1;constructor(e){this.delegate=e}start(){this.started||(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)}stop(){this.started&&(removeEventListener("scroll",this.onScroll,!1),this.started=!1)}onScroll=()=>{this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})};updatePosition(e){this.delegate.scrollPositionChanged(e)}},er=class{render({fragment:e}){rt.preservingPermanentElements(this,kn(e),()=>{Fn(e,()=>{Bn(()=>{document.documentElement.appendChild(e)})})})}enteringBardo(e,r){r.replaceWith(e.cloneNode(!0))}leavingBardo(){}};function kn(t){let e=Uo(document.documentElement),r={};for(let a of e){let{id:o}=a;for(let s of t.querySelectorAll("turbo-stream")){let i=Io(s.templateElement.content,o);i&&(r[o]=[a,i])}}return r}async function Fn(t,e){let r=`turbo-stream-autofocus-${j()}`,a=t.querySelectorAll("turbo-stream"),o=qn(a),s=null;if(o&&(o.id?s=o.id:s=r,o.id=s),e(),await Pe(),(document.activeElement==null||document.activeElement==document.body)&&s){let n=document.getElementById(s);mr(n)&&n.focus(),n&&n.id==r&&n.removeAttribute("id")}}async function Bn(t){let[e,r]=await Ui(t,()=>document.activeElement),a=e&&e.id;if(a){let o=document.getElementById(a);mr(o)&&o!=r&&o.focus()}}function qn(t){for(let e of t){let r=ko(e.templateElement.content);if(r)return r}return null}var tr=class{sources=new Set;#e=!1;constructor(e){this.delegate=e}start(){this.#e||(this.#e=!0,addEventListener("turbo:before-fetch-response",this.inspectFetchResponse,!1))}stop(){this.#e&&(this.#e=!1,removeEventListener("turbo:before-fetch-response",this.inspectFetchResponse,!1))}connectStreamSource(e){this.streamSourceIsConnected(e)||(this.sources.add(e),e.addEventListener("message",this.receiveMessageEvent,!1))}disconnectStreamSource(e){this.streamSourceIsConnected(e)&&(this.sources.delete(e),e.removeEventListener("message",this.receiveMessageEvent,!1))}streamSourceIsConnected(e){return this.sources.has(e)}inspectFetchResponse=e=>{let r=Dn(e);r&&On(r)&&(e.preventDefault(),this.receiveMessageResponse(r))};receiveMessageEvent=e=>{this.#e&&typeof e.data=="string"&&this.receiveMessageHTML(e.data)};async receiveMessageResponse(e){let r=await e.responseHTML;r&&this.receiveMessageHTML(r)}receiveMessageHTML(e){this.delegate.receivedMessageFromStream(K.wrap(e))}};function Dn(t){let e=t.detail?.fetchResponse;if(e instanceof _e)return e}function On(t){return(t.contentType??"").startsWith(K.contentType)}var rr=class extends ke{static renderElement(e,r){let{documentElement:a,body:o}=document;a.replaceChild(r,o)}async render(){this.replaceHeadAndBody(),this.activateScriptElements()}replaceHeadAndBody(){let{documentElement:e,head:r}=document;e.replaceChild(this.newHead,r),this.renderElement(this.currentElement,this.newElement)}activateScriptElements(){for(let e of this.scriptElements){let r=e.parentNode;if(r){let a=Te(e);r.replaceChild(a,e)}}}get newHead(){return this.newSnapshot.headSnapshot.element}get scriptElements(){return document.documentElement.querySelectorAll("script")}},Be=class extends ke{static renderElement(e,r){document.body&&r instanceof HTMLBodyElement?document.body.replaceWith(r):document.documentElement.appendChild(r)}get shouldRender(){return this.newSnapshot.isVisitable&&this.trackedElementsAreIdentical}get reloadReason(){if(!this.newSnapshot.isVisitable)return{reason:"turbo_visit_control_is_reload"};if(!this.trackedElementsAreIdentical)return{reason:"tracked_element_mismatch"}}async prepareToRender(){this.#e(),await this.mergeHead()}async render(){this.willRender&&await this.replaceBody()}finishRendering(){super.finishRendering(),this.isPreview||this.focusFirstAutofocusableElement()}get currentHeadSnapshot(){return this.currentSnapshot.headSnapshot}get newHeadSnapshot(){return this.newSnapshot.headSnapshot}get newElement(){return this.newSnapshot.element}#e(){let{documentElement:e}=this.currentSnapshot,{lang:r}=this.newSnapshot;r?e.setAttribute("lang",r):e.removeAttribute("lang")}async mergeHead(){let e=this.mergeProvisionalElements(),r=this.copyNewHeadStylesheetElements();this.copyNewHeadScriptElements(),await e,await r,this.willRender&&this.removeUnusedDynamicStylesheetElements()}async replaceBody(){await this.preservingPermanentElements(async()=>{this.activateNewBody(),await this.assignNewBody()})}get trackedElementsAreIdentical(){return this.currentHeadSnapshot.trackedElementSignature==this.newHeadSnapshot.trackedElementSignature}async copyNewHeadStylesheetElements(){let e=[];for(let r of this.newHeadStylesheetElements)e.push(Oi(r)),document.head.appendChild(r);await Promise.all(e)}copyNewHeadScriptElements(){for(let e of this.newHeadScriptElements)document.head.appendChild(Te(e))}removeUnusedDynamicStylesheetElements(){for(let e of this.unusedDynamicStylesheetElements)document.head.removeChild(e)}async mergeProvisionalElements(){let e=[...this.newHeadProvisionalElements];for(let r of this.currentHeadProvisionalElements)this.isCurrentElementInElementList(r,e)||document.head.removeChild(r);for(let r of e)document.head.appendChild(r)}isCurrentElementInElementList(e,r){for(let[a,o]of r.entries()){if(e.tagName=="TITLE"){if(o.tagName!="TITLE")continue;if(e.innerHTML==o.innerHTML)return r.splice(a,1),!0}if(o.isEqualNode(e))return r.splice(a,1),!0}return!1}removeCurrentHeadProvisionalElements(){for(let e of this.currentHeadProvisionalElements)document.head.removeChild(e)}copyNewHeadProvisionalElements(){for(let e of this.newHeadProvisionalElements)document.head.appendChild(e)}activateNewBody(){document.adoptNode(this.newElement),this.activateNewBodyScriptElements()}activateNewBodyScriptElements(){for(let e of this.newBodyScriptElements){let r=Te(e);e.replaceWith(r)}}async assignNewBody(){await this.renderElement(this.currentElement,this.newElement)}get unusedDynamicStylesheetElements(){return this.oldHeadStylesheetElements.filter(e=>e.getAttribute("data-turbo-track")==="dynamic")}get oldHeadStylesheetElements(){return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot)}get newHeadStylesheetElements(){return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)}get newHeadScriptElements(){return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)}get currentHeadProvisionalElements(){return this.currentHeadSnapshot.provisionalElements}get newHeadProvisionalElements(){return this.newHeadSnapshot.provisionalElements}get newBodyScriptElements(){return this.newElement.querySelectorAll("script")}},ar=class extends Be{static renderElement(e,r){br(e,r,{callbacks:{beforeNodeMorphed:a=>!wo(a)}});for(let a of e.querySelectorAll("turbo-frame"))wo(a)&&a.reload();P("turbo:morph",{detail:{currentElement:e,newElement:r}})}async preservingPermanentElements(e){return await e()}get renderMethod(){return"morph"}get shouldAutofocus(){return!1}};function wo(t){return t instanceof U&&t.src&&t.refresh==="morph"&&!t.closest("[data-turbo-permanent]")}var or=class{keys=[];snapshots={};constructor(e){this.size=e}has(e){return $e(e)in this.snapshots}get(e){if(this.has(e)){let r=this.read(e);return this.touch(e),r}}put(e,r){return this.write(e,r),this.touch(e),r}clear(){this.snapshots={}}read(e){return this.snapshots[$e(e)]}write(e,r){this.snapshots[$e(e)]=r}touch(e){let r=$e(e),a=this.keys.indexOf(r);a>-1&&this.keys.splice(a,1),this.keys.unshift(r),this.trim()}trim(){for(let e of this.keys.splice(this.size))delete this.snapshots[e]}},sr=class extends Qe{snapshotCache=new or(10);lastRenderedLocation=new URL(location.href);forceReloaded=!1;shouldTransitionTo(e){return this.snapshot.prefersViewTransitions&&e.prefersViewTransitions}renderPage(e,r=!1,a=!0,o){let i=this.isPageRefresh(o)&&this.snapshot.shouldMorphPage?ar:Be,n=new i(this.snapshot,e,r,a);return n.shouldRender?o?.changeHistory():this.forceReloaded=!0,this.render(n)}renderError(e,r){r?.changeHistory();let a=new rr(this.snapshot,e,!1);return this.render(a)}clearSnapshotCache(){this.snapshotCache.clear()}async cacheSnapshot(e=this.snapshot){if(e.isCacheable){this.delegate.viewWillCacheSnapshot();let{lastRenderedLocation:r}=this;await Lo();let a=e.clone();return this.snapshotCache.put(r,a),a}}getCachedSnapshotForLocation(e){return this.snapshotCache.get(e)}isPageRefresh(e){return!e||this.lastRenderedLocation.pathname===e.location.pathname&&e.action==="replace"}shouldPreserveScrollPosition(e){return this.isPageRefresh(e)&&this.snapshot.shouldPreserveScrollPosition}get snapshot(){return I.fromElement(this.element)}},ir=class{selector="a[data-turbo-preload]";constructor(e,r){this.delegate=e,this.snapshotCache=r}start(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",this.#e):this.preloadOnLoadLinksForView(document.body)}stop(){document.removeEventListener("DOMContentLoaded",this.#e)}preloadOnLoadLinksForView(e){for(let r of e.querySelectorAll(this.selector))this.delegate.shouldPreloadLink(r)&&this.preloadURL(r)}async preloadURL(e){let r=new URL(e.href);if(this.snapshotCache.has(r))return;await new ae(this,D.get,r,new URLSearchParams,e).perform()}prepareRequest(e){e.headers["X-Sec-Purpose"]="prefetch"}async requestSucceededWithResponse(e,r){try{let a=await r.responseHTML,o=I.fromHTMLString(a);this.snapshotCache.put(e.url,o)}catch{}}requestStarted(e){}requestErrored(e){}requestFinished(e){}requestPreventedHandlingResponse(e,r){}requestFailedWithResponse(e,r){}#e=()=>{this.preloadOnLoadLinksForView(document.body)}},nr=class{constructor(e){this.session=e}clear(){this.session.clearCache()}resetCacheControl(){this.#e("")}exemptPageFromCache(){this.#e("no-cache")}exemptPageFromPreview(){this.#e("no-preview")}#e(e){Ii("turbo-cache-control",e)}},lr=class{navigator=new Jt(this);history=new Xt(this);view=new sr(this,document.documentElement);adapter=new Gt(this);pageObserver=new Qt(this);cacheObserver=new jt;linkPrefetchObserver=new Zt(this,document);linkClickObserver=new et(this,window);formSubmitObserver=new Re(this,document);scrollObserver=new Yt(this);streamObserver=new tr(this);formLinkClickObserver=new tt(this,document.documentElement);frameRedirector=new Kt(this,document.documentElement);streamMessageRenderer=new er;cache=new nr(this);enabled=!0;started=!1;#e=150;constructor(e){this.recentRequests=e,this.preloader=new ir(this,this.view.snapshotCache),this.debouncedRefresh=this.refresh,this.pageRefreshDebouncePeriod=this.pageRefreshDebouncePeriod}start(){this.started||(this.pageObserver.start(),this.cacheObserver.start(),this.linkPrefetchObserver.start(),this.formLinkClickObserver.start(),this.linkClickObserver.start(),this.formSubmitObserver.start(),this.scrollObserver.start(),this.streamObserver.start(),this.frameRedirector.start(),this.history.start(),this.preloader.start(),this.started=!0,this.enabled=!0)}disable(){this.enabled=!1}stop(){this.started&&(this.pageObserver.stop(),this.cacheObserver.stop(),this.linkPrefetchObserver.stop(),this.formLinkClickObserver.stop(),this.linkClickObserver.stop(),this.formSubmitObserver.stop(),this.scrollObserver.stop(),this.streamObserver.stop(),this.frameRedirector.stop(),this.history.stop(),this.preloader.stop(),this.started=!1)}registerAdapter(e){this.adapter=e}visit(e,r={}){let a=r.frame?document.getElementById(r.frame):null;if(a instanceof U){let o=r.action||te(a);a.delegate.proposeVisitIfNavigatedWithAction(a,o),a.src=e.toString()}else this.navigator.proposeVisit(B(e),r)}refresh(e,r){let a=r&&this.recentRequests.has(r),o=e===document.baseURI;!a&&!this.navigator.currentVisit&&o&&this.visit(e,{action:"replace",shouldCacheSnapshot:!1})}connectStreamSource(e){this.streamObserver.connectStreamSource(e)}disconnectStreamSource(e){this.streamObserver.disconnectStreamSource(e)}renderStreamMessage(e){this.streamMessageRenderer.render(K.wrap(e))}clearCache(){this.view.clearSnapshotCache()}setProgressBarDelay(e){console.warn("Please replace `session.setProgressBarDelay(delay)` with `session.progressBarDelay = delay`. The function is deprecated and will be removed in a future version of Turbo.`"),this.progressBarDelay=e}set progressBarDelay(e){F.drive.progressBarDelay=e}get progressBarDelay(){return F.drive.progressBarDelay}set drive(e){F.drive.enabled=e}get drive(){return F.drive.enabled}set formMode(e){F.forms.mode=e}get formMode(){return F.forms.mode}get location(){return this.history.location}get restorationIdentifier(){return this.history.restorationIdentifier}get pageRefreshDebouncePeriod(){return this.#e}set pageRefreshDebouncePeriod(e){this.refresh=Vi(this.debouncedRefresh.bind(this),e),this.#e=e}shouldPreloadLink(e){let r=e.hasAttribute("data-turbo-method"),a=e.hasAttribute("data-turbo-stream"),o=e.getAttribute("data-turbo-frame"),s=o=="_top"?null:document.getElementById(o)||xe(e,"turbo-frame:not([disabled])");if(r||a||s instanceof U)return!1;{let i=new URL(e.href);return this.elementIsNavigatable(e)&&G(i,this.snapshot.rootLocation)}}historyPoppedToLocationWithRestorationIdentifierAndDirection(e,r,a){this.enabled?this.navigator.startVisit(e,r,{action:"restore",historyChanged:!0,direction:a}):this.adapter.pageInvalidated({reason:"turbo_disabled"})}scrollPositionChanged(e){this.history.updateRestorationData({scrollPosition:e})}willSubmitFormLinkToLocation(e,r){return this.elementIsNavigatable(e)&&G(r,this.snapshot.rootLocation)}submittedFormLinkToLocation(){}canPrefetchRequestToLocation(e,r){return this.elementIsNavigatable(e)&&G(r,this.snapshot.rootLocation)&&this.navigator.linkPrefetchingIsEnabledForLocation(r)}willFollowLinkToLocation(e,r,a){return this.elementIsNavigatable(e)&&G(r,this.snapshot.rootLocation)&&this.applicationAllowsFollowingLinkToLocation(e,r,a)}followedLinkToLocation(e,r){let a=this.getActionForLink(e),o=e.hasAttribute("data-turbo-stream");this.visit(r.href,{action:a,acceptsStreamResponse:o})}allowsVisitingLocationWithAction(e,r){return this.locationWithActionIsSamePage(e,r)||this.applicationAllowsVisitingLocation(e)}visitProposedToLocation(e,r){yo(e),this.adapter.visitProposedToLocation(e,r)}visitStarted(e){e.acceptsStreamResponse||(Ke(document.documentElement),this.view.markVisitDirection(e.direction)),yo(e.location),e.silent||this.notifyApplicationAfterVisitingLocation(e.location,e.action)}visitCompleted(e){this.view.unmarkVisitDirection(),Xe(document.documentElement),this.notifyApplicationAfterPageLoad(e.getTimingMetrics())}locationWithActionIsSamePage(e,r){return this.navigator.locationWithActionIsSamePage(e,r)}visitScrolledToSamePageLocation(e,r){this.notifyApplicationAfterVisitingSamePageLocation(e,r)}willSubmitForm(e,r){let a=hr(e,r);return this.submissionIsNavigatable(e,r)&&G(B(a),this.snapshot.rootLocation)}formSubmitted(e,r){this.navigator.submitForm(e,r)}pageBecameInteractive(){this.view.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()}pageLoaded(){this.history.assumeControlOfScrollRestoration()}pageWillUnload(){this.history.relinquishControlOfScrollRestoration()}receivedMessageFromStream(e){this.renderStreamMessage(e)}viewWillCacheSnapshot(){this.navigator.currentVisit?.silent||this.notifyApplicationBeforeCachingSnapshot()}allowsImmediateRender({element:e},r){let a=this.notifyApplicationBeforeRender(e,r),{defaultPrevented:o,detail:{render:s}}=a;return this.view.renderer&&s&&(this.view.renderer.renderElement=s),!o}viewRenderedSnapshot(e,r,a){this.view.lastRenderedLocation=this.history.location,this.notifyApplicationAfterRender(a)}preloadOnLoadLinksForView(e){this.preloader.preloadOnLoadLinksForView(e)}viewInvalidated(e){this.adapter.pageInvalidated(e)}frameLoaded(e){this.notifyApplicationAfterFrameLoad(e)}frameRendered(e,r){this.notifyApplicationAfterFrameRender(e,r)}applicationAllowsFollowingLinkToLocation(e,r,a){return!this.notifyApplicationAfterClickingLinkToLocation(e,r,a).defaultPrevented}applicationAllowsVisitingLocation(e){return!this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented}notifyApplicationAfterClickingLinkToLocation(e,r,a){return P("turbo:click",{target:e,detail:{url:r.href,originalEvent:a},cancelable:!0})}notifyApplicationBeforeVisitingLocation(e){return P("turbo:before-visit",{detail:{url:e.href},cancelable:!0})}notifyApplicationAfterVisitingLocation(e,r){return P("turbo:visit",{detail:{url:e.href,action:r}})}notifyApplicationBeforeCachingSnapshot(){return P("turbo:before-cache")}notifyApplicationBeforeRender(e,r){return P("turbo:before-render",{detail:{newBody:e,...r},cancelable:!0})}notifyApplicationAfterRender(e){return P("turbo:render",{detail:{renderMethod:e}})}notifyApplicationAfterPageLoad(e={}){return P("turbo:load",{detail:{url:this.location.href,timing:e}})}notifyApplicationAfterVisitingSamePageLocation(e,r){dispatchEvent(new HashChangeEvent("hashchange",{oldURL:e.toString(),newURL:r.toString()}))}notifyApplicationAfterFrameLoad(e){return P("turbo:frame-load",{target:e})}notifyApplicationAfterFrameRender(e,r){return P("turbo:frame-render",{detail:{fetchResponse:e},target:r,cancelable:!0})}submissionIsNavigatable(e,r){if(F.forms.mode=="off")return!1;{let a=r?this.elementIsNavigatable(r):!0;return F.forms.mode=="optin"?a&&e.closest('[data-turbo="true"]')!=null:a&&this.elementIsNavigatable(e)}}elementIsNavigatable(e){let r=xe(e,"[data-turbo]"),a=xe(e,"turbo-frame");return F.drive.enabled||a?r?r.getAttribute("data-turbo")!="false":!0:r?r.getAttribute("data-turbo")=="true":!1}getActionForLink(e){return te(e)||"advance"}get snapshot(){return this.view.snapshot}};function yo(t){Object.defineProperties(t,Hn)}var Hn={absoluteURL:{get(){return this.toString()}}},R=new lr(Do),{cache:In,navigator:Un}=R;function No(){R.start()}function Vn(t){R.registerAdapter(t)}function Nn(t,e){R.visit(t,e)}function Wo(t){R.connectStreamSource(t)}function zo(t){R.disconnectStreamSource(t)}function Wn(t){R.renderStreamMessage(t)}function zn(){console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"),R.clearCache()}function $n(t){console.warn("Please replace `Turbo.setProgressBarDelay(delay)` with `Turbo.config.drive.progressBarDelay = delay`. The top-level function is deprecated and will be removed in a future version of Turbo.`"),F.drive.progressBarDelay=t}function Gn(t){console.warn("Please replace `Turbo.setConfirmMethod(confirmMethod)` with `Turbo.config.forms.confirm = confirmMethod`. The top-level function is deprecated and will be removed in a future version of Turbo.`"),F.forms.confirm=t}function jn(t){console.warn("Please replace `Turbo.setFormMode(mode)` with `Turbo.config.forms.mode = mode`. The top-level function is deprecated and will be removed in a future version of Turbo.`"),F.forms.mode=t}var Kn=Object.freeze({__proto__:null,navigator:Un,session:R,cache:In,PageRenderer:Be,PageSnapshot:I,FrameRenderer:Fe,fetch:Oo,config:F,start:No,registerAdapter:Vn,visit:Nn,connectStreamSource:Wo,disconnectStreamSource:zo,renderStreamMessage:Wn,clearCache:zn,setProgressBarDelay:$n,setConfirmMethod:Gn,setFormMode:jn}),fr=class extends Error{},ur=class{fetchResponseLoaded=e=>Promise.resolve();#e=null;#t=()=>{};#r=!1;#s=!1;#i=new Set;#o=!1;action=null;constructor(e){this.element=e,this.view=new It(this,this.element),this.appearanceObserver=new Ot(this,this.element),this.formLinkClickObserver=new tt(this,this.element),this.linkInterceptor=new Ye(this,this.element),this.restorationIdentifier=j(),this.formSubmitObserver=new Re(this,this.element)}connect(){this.#r||(this.#r=!0,this.loadingStyle==me.lazy?this.appearanceObserver.start():this.#a(),this.formLinkClickObserver.start(),this.linkInterceptor.start(),this.formSubmitObserver.start())}disconnect(){this.#r&&(this.#r=!1,this.appearanceObserver.stop(),this.formLinkClickObserver.stop(),this.linkInterceptor.stop(),this.formSubmitObserver.stop())}disabledChanged(){this.loadingStyle==me.eager&&this.#a()}sourceURLChanged(){this.#b("src")||(this.element.isConnected&&(this.complete=!1),(this.loadingStyle==me.eager||this.#s)&&this.#a())}sourceURLReloaded(){let{refresh:e,src:r}=this.element;return this.#o=r&&e==="morph",this.element.removeAttribute("complete"),this.element.src=null,this.element.src=r,this.element.loaded}loadingStyleChanged(){this.loadingStyle==me.lazy?this.appearanceObserver.start():(this.appearanceObserver.stop(),this.#a())}async#a(){this.enabled&&this.isActive&&!this.complete&&this.sourceURL&&(this.element.loaded=this.#d(B(this.sourceURL)),this.appearanceObserver.stop(),await this.element.loaded,this.#s=!0)}async loadResponse(e){(e.redirected||e.succeeded&&e.isHTML)&&(this.sourceURL=e.response.url);try{let r=await e.responseHTML;if(r){let a=Po(r);I.fromDocument(a).isVisitable?await this.#l(e,a):await this.#p(e)}}finally{this.#o=!1,this.fetchResponseLoaded=()=>Promise.resolve()}}elementAppearedInViewport(e){this.proposeVisitIfNavigatedWithAction(e,te(e)),this.#a()}willSubmitFormLinkToLocation(e){return this.#f(e)}submittedFormLinkToLocation(e,r,a){let o=this.#n(e);o&&a.setAttribute("data-turbo-frame",o.id)}shouldInterceptLinkClick(e,r,a){return this.#f(e)}linkClickIntercepted(e,r){this.#c(e,r)}willSubmitForm(e,r){return e.closest("turbo-frame")==this.element&&this.#f(e,r)}formSubmitted(e,r){this.formSubmission&&this.formSubmission.stop(),this.formSubmission=new Je(this,e,r);let{fetchRequest:a}=this.formSubmission;this.prepareRequest(a),this.formSubmission.start()}prepareRequest(e){e.headers["Turbo-Frame"]=this.id,this.currentNavigationElement?.hasAttribute("data-turbo-stream")&&e.acceptResponseType(K.contentType)}requestStarted(e){Ke(this.element)}requestPreventedHandlingResponse(e,r){this.#t()}async requestSucceededWithResponse(e,r){await this.loadResponse(r),this.#t()}async requestFailedWithResponse(e,r){await this.loadResponse(r),this.#t()}requestErrored(e,r){console.error(r),this.#t()}requestFinished(e){Xe(this.element)}formSubmissionStarted({formElement:e}){Ke(e,this.#n(e))}formSubmissionSucceededWithResponse(e,r){let a=this.#n(e.formElement,e.submitter);a.delegate.proposeVisitIfNavigatedWithAction(a,te(e.submitter,e.formElement,a)),a.delegate.loadResponse(r),e.isSafe||R.clearCache()}formSubmissionFailedWithResponse(e,r){this.element.delegate.loadResponse(r),R.clearCache()}formSubmissionErrored(e,r){console.error(r)}formSubmissionFinished({formElement:e}){Xe(e,this.#n(e))}allowsImmediateRender({element:e},r){let a=P("turbo:before-frame-render",{target:this.element,detail:{newFrame:e,...r},cancelable:!0}),{defaultPrevented:o,detail:{render:s}}=a;return this.view.renderer&&s&&(this.view.renderer.renderElement=s),!o}viewRenderedSnapshot(e,r,a){}preloadOnLoadLinksForView(e){R.preloadOnLoadLinksForView(e)}viewInvalidated(){}willRenderFrame(e,r){this.previousFrameElement=e.cloneNode(!0)}visitCachedSnapshot=({element:e})=>{let r=e.querySelector("#"+this.element.id);r&&this.previousFrameElement&&r.replaceChildren(...this.previousFrameElement.children),delete this.previousFrameElement};async#l(e,r){let a=await this.extractForeignFrameElement(r.body),o=this.#o?Vt:Fe;if(a){let s=new be(a),i=new o(this,this.view.snapshot,s,!1,!1);this.view.renderPromise&&await this.view.renderPromise,this.changeHistory(),await this.view.render(i),this.complete=!0,R.frameRendered(e,this.element),R.frameLoaded(this.element),await this.fetchResponseLoaded(e)}else this.#m(e)&&this.#h(e)}async#d(e){let r=new ae(this,D.get,e,new URLSearchParams,this.element);return this.#e?.cancel(),this.#e=r,new Promise(a=>{this.#t=()=>{this.#t=()=>{},this.#e=null,a()},r.perform()})}#c(e,r,a){let o=this.#n(e,a);o.delegate.proposeVisitIfNavigatedWithAction(o,te(a,e,o)),this.#v(e,()=>{o.src=r})}proposeVisitIfNavigatedWithAction(e,r=null){if(this.action=r,this.action){let a=I.fromElement(e).clone(),{visitCachedSnapshot:o}=e.delegate;e.delegate.fetchResponseLoaded=async s=>{if(e.src){let{statusCode:i,redirected:n}=s,l=await s.responseHTML,x={response:{statusCode:i,redirected:n,responseHTML:l},visitCachedSnapshot:o,willRender:!1,updateHistory:!1,restorationIdentifier:this.restorationIdentifier,snapshot:a};this.action&&(x.action=this.action),R.visit(e.src,x)}}}}changeHistory(){if(this.action){let e=_o(this.action);R.history.update(e,B(this.element.src||""),this.restorationIdentifier)}}async#p(e){console.warn(`The response (${e.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`),await this.#u(e.response)}#m(e){this.element.setAttribute("complete","");let r=e.response,a=async(s,i)=>{s instanceof Response?this.#u(s):R.visit(s,i)};return!P("turbo:frame-missing",{target:this.element,detail:{response:r,visit:a},cancelable:!0}).defaultPrevented}#h(e){this.view.missing(),this.#x(e)}#x(e){let r=`The response (${e.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;throw new fr(r)}async#u(e){let r=new _e(e),a=await r.responseHTML,{location:o,redirected:s,statusCode:i}=r;return R.visit(o,{response:{redirected:s,statusCode:i,responseHTML:a}})}#n(e,r){let a=je("data-turbo-frame",r,e)||this.element.getAttribute("target");return Co(a)??this.element}async extractForeignFrameElement(e){let r,a=CSS.escape(this.id);try{if(r=Ao(e.querySelector(`turbo-frame#${a}`),this.sourceURL),r)return r;if(r=Ao(e.querySelector(`turbo-frame[src][recurse~=${a}]`),this.sourceURL),r)return await r.loaded,await this.extractForeignFrameElement(r)}catch(o){return console.error(o),new U}return null}#g(e,r){let a=hr(e,r);return G(B(a),this.rootLocation)}#f(e,r){let a=je("data-turbo-frame",r,e)||this.element.getAttribute("target");if(e instanceof HTMLFormElement&&!this.#g(e,r)||!this.enabled||a=="_top")return!1;if(a){let o=Co(a);if(o)return!o.disabled}return!(!R.elementIsNavigatable(e)||r&&!R.elementIsNavigatable(r))}get id(){return this.element.id}get enabled(){return!this.element.disabled}get sourceURL(){if(this.element.src)return this.element.src}set sourceURL(e){this.#S("src",()=>{this.element.src=e??null})}get loadingStyle(){return this.element.loading}get isLoading(){return this.formSubmission!==void 0||this.#t()!==void 0}get complete(){return this.element.hasAttribute("complete")}set complete(e){e?this.element.setAttribute("complete",""):this.element.removeAttribute("complete")}get isActive(){return this.element.isActive&&this.#r}get rootLocation(){let r=this.element.ownerDocument.querySelector('meta[name="turbo-root"]')?.content??"/";return B(r)}#b(e){return this.#i.has(e)}#S(e,r){this.#i.add(e),r(),this.#i.delete(e)}#v(e,r){this.currentNavigationElement=e,r(),delete this.currentNavigationElement}};function Co(t){if(t!=null){let e=document.getElementById(t);if(e instanceof U)return e}}function Ao(t,e){if(t){let r=t.getAttribute("src");if(r!=null&&e!=null&&Gi(r,e))throw new Error(`Matching <turbo-frame id="${t.id}"> element has a source URL which references itself`);if(t.ownerDocument!==document&&(t=document.importNode(t,!0)),t instanceof U)return t.connectedCallback(),t.disconnectedCallback(),t}}var $o={after(){this.targetElements.forEach(t=>t.parentElement?.insertBefore(this.templateContent,t.nextSibling))},append(){this.removeDuplicateTargetChildren(),this.targetElements.forEach(t=>t.append(this.templateContent))},before(){this.targetElements.forEach(t=>t.parentElement?.insertBefore(this.templateContent,t))},prepend(){this.removeDuplicateTargetChildren(),this.targetElements.forEach(t=>t.prepend(this.templateContent))},remove(){this.targetElements.forEach(t=>t.remove())},replace(){let t=this.getAttribute("method");this.targetElements.forEach(e=>{t==="morph"?br(e,this.templateContent):e.replaceWith(this.templateContent)})},update(){let t=this.getAttribute("method");this.targetElements.forEach(e=>{t==="morph"?Vo(e,this.templateContent):(e.innerHTML="",e.append(this.templateContent))})},refresh(){R.refresh(this.baseURI,this.requestId)}},dr=class t extends HTMLElement{static async renderElement(e){await e.performAction()}async connectedCallback(){try{await this.render()}catch(e){console.error(e)}finally{this.disconnect()}}async render(){return this.renderPromise??=(async()=>{let e=this.beforeRenderEvent;this.dispatchEvent(e)&&(await Pe(),await e.detail.render(this))})()}disconnect(){try{this.remove()}catch{}}removeDuplicateTargetChildren(){this.duplicateChildren.forEach(e=>e.remove())}get duplicateChildren(){let e=this.targetElements.flatMap(a=>[...a.children]).filter(a=>!!a.getAttribute("id")),r=[...this.templateContent?.children||[]].filter(a=>!!a.getAttribute("id")).map(a=>a.getAttribute("id"));return e.filter(a=>r.includes(a.getAttribute("id")))}get performAction(){if(this.action){let e=$o[this.action];if(e)return e;this.#e("unknown action")}this.#e("action attribute is missing")}get targetElements(){if(this.target)return this.targetElementsById;if(this.targets)return this.targetElementsByQuery;this.#e("target or targets attribute is missing")}get templateContent(){return this.templateElement.content.cloneNode(!0)}get templateElement(){if(this.firstElementChild===null){let e=this.ownerDocument.createElement("template");return this.appendChild(e),e}else if(this.firstElementChild instanceof HTMLTemplateElement)return this.firstElementChild;this.#e("first child element must be a <template> element")}get action(){return this.getAttribute("action")}get target(){return this.getAttribute("target")}get targets(){return this.getAttribute("targets")}get requestId(){return this.getAttribute("request-id")}#e(e){throw new Error(`${this.description}: ${e}`)}get description(){return(this.outerHTML.match(/<[^>]+>/)??[])[0]??"<turbo-stream>"}get beforeRenderEvent(){return new CustomEvent("turbo:before-stream-render",{bubbles:!0,cancelable:!0,detail:{newStream:this,render:t.renderElement}})}get targetElementsById(){let e=this.ownerDocument?.getElementById(this.target);return e!==null?[e]:[]}get targetElementsByQuery(){let e=this.ownerDocument?.querySelectorAll(this.targets);return e.length!==0?Array.prototype.slice.call(e):[]}},cr=class extends HTMLElement{streamSource=null;connectedCallback(){this.streamSource=this.src.match(/^ws{1,2}:/)?new WebSocket(this.src):new EventSource(this.src),Wo(this.streamSource)}disconnectedCallback(){this.streamSource&&(this.streamSource.close(),zo(this.streamSource))}get src(){return this.getAttribute("src")||""}};U.delegateConstructor=ur;customElements.get("turbo-frame")===void 0&&customElements.define("turbo-frame",U);customElements.get("turbo-stream")===void 0&&customElements.define("turbo-stream",dr);customElements.get("turbo-stream-source")===void 0&&customElements.define("turbo-stream-source",cr);(()=>{let t=document.currentScript;if(t&&!t.hasAttribute("data-turbo-suppress-warning"))for(t=t.parentElement;t;){if(t==document.body)return console.warn(To`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `,t.outerHTML);t=t.parentElement}})();window.Turbo={...Kn,StreamActions:$o};No();var Ar=!1,Er=!1,ie=[],Mr=-1;function Xn(t){Zn(t)}function Zn(t){ie.includes(t)||ie.push(t),Qn()}function Jn(t){let e=ie.indexOf(t);e!==-1&&e>Mr&&ie.splice(e,1)}function Qn(){!Er&&!Ar&&(Ar=!0,queueMicrotask(Yn))}function Yn(){Ar=!1,Er=!0;for(let t=0;t<ie.length;t++)ie[t](),Mr=t;ie.length=0,Mr=-1,Er=!1}var we,de,ye,is,Lr=!0;function el(t){Lr=!1,t(),Lr=!0}function tl(t){we=t.reactive,ye=t.release,de=e=>t.effect(e,{scheduler:r=>{Lr?Xn(r):r()}}),is=t.raw}function Go(t){de=t}function rl(t){let e=()=>{};return[a=>{let o=de(a);return t._x_effects||(t._x_effects=new Set,t._x_runEffects=()=>{t._x_effects.forEach(s=>s())}),t._x_effects.add(o),e=()=>{o!==void 0&&(t._x_effects.delete(o),ye(o))},o},()=>{e()}]}function ns(t,e){let r=!0,a,o=de(()=>{let s=t();JSON.stringify(s),r?a=s:queueMicrotask(()=>{e(s,a),a=s}),r=!1});return()=>ye(o)}var ls=[],fs=[],us=[];function al(t){us.push(t)}function Vr(t,e){typeof e=="function"?(t._x_cleanups||(t._x_cleanups=[]),t._x_cleanups.push(e)):(e=t,fs.push(e))}function ds(t){ls.push(t)}function cs(t,e,r){t._x_attributeCleanups||(t._x_attributeCleanups={}),t._x_attributeCleanups[e]||(t._x_attributeCleanups[e]=[]),t._x_attributeCleanups[e].push(r)}function ps(t,e){t._x_attributeCleanups&&Object.entries(t._x_attributeCleanups).forEach(([r,a])=>{(e===void 0||e.includes(r))&&(a.forEach(o=>o()),delete t._x_attributeCleanups[r])})}function ol(t){for(t._x_effects?.forEach(Jn);t._x_cleanups?.length;)t._x_cleanups.pop()()}var Nr=new MutationObserver(Gr),Wr=!1;function zr(){Nr.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),Wr=!0}function ms(){sl(),Nr.disconnect(),Wr=!1}var qe=[];function sl(){let t=Nr.takeRecords();qe.push(()=>t.length>0&&Gr(t));let e=qe.length;queueMicrotask(()=>{if(qe.length===e)for(;qe.length>0;)qe.shift()()})}function T(t){if(!Wr)return t();ms();let e=t();return zr(),e}var $r=!1,ut=[];function il(){$r=!0}function nl(){$r=!1,Gr(ut),ut=[]}function Gr(t){if($r){ut=ut.concat(t);return}let e=[],r=new Set,a=new Map,o=new Map;for(let s=0;s<t.length;s++)if(!t[s].target._x_ignoreMutationObserver&&(t[s].type==="childList"&&(t[s].removedNodes.forEach(i=>{i.nodeType===1&&i._x_marker&&r.add(i)}),t[s].addedNodes.forEach(i=>{if(i.nodeType===1){if(r.has(i)){r.delete(i);return}i._x_marker||e.push(i)}})),t[s].type==="attributes")){let i=t[s].target,n=t[s].attributeName,l=t[s].oldValue,p=()=>{a.has(i)||a.set(i,[]),a.get(i).push({name:n,value:i.getAttribute(n)})},x=()=>{o.has(i)||o.set(i,[]),o.get(i).push(n)};i.hasAttribute(n)&&l===null?p():i.hasAttribute(n)?(x(),p()):x()}o.forEach((s,i)=>{ps(i,s)}),a.forEach((s,i)=>{ls.forEach(n=>n(i,s))});for(let s of r)e.some(i=>i.contains(s))||fs.forEach(i=>i(s));for(let s of e)s.isConnected&&us.forEach(i=>i(s));e=null,r=null,a=null,o=null}function hs(t){return We(Se(t))}function Ne(t,e,r){return t._x_dataStack=[e,...Se(r||t)],()=>{t._x_dataStack=t._x_dataStack.filter(a=>a!==e)}}function Se(t){return t._x_dataStack?t._x_dataStack:typeof ShadowRoot=="function"&&t instanceof ShadowRoot?Se(t.host):t.parentNode?Se(t.parentNode):[]}function We(t){return new Proxy({objects:t},ll)}var ll={ownKeys({objects:t}){return Array.from(new Set(t.flatMap(e=>Object.keys(e))))},has({objects:t},e){return e==Symbol.unscopables?!1:t.some(r=>Object.prototype.hasOwnProperty.call(r,e)||Reflect.has(r,e))},get({objects:t},e,r){return e=="toJSON"?fl:Reflect.get(t.find(a=>Reflect.has(a,e))||{},e,r)},set({objects:t},e,r,a){let o=t.find(i=>Object.prototype.hasOwnProperty.call(i,e))||t[t.length-1],s=Object.getOwnPropertyDescriptor(o,e);return s?.set&&s?.get?s.set.call(a,r)||!0:Reflect.set(o,e,r)}};function fl(){return Reflect.ownKeys(this).reduce((e,r)=>(e[r]=Reflect.get(this,r),e),{})}function xs(t){let e=a=>typeof a=="object"&&!Array.isArray(a)&&a!==null,r=(a,o="")=>{Object.entries(Object.getOwnPropertyDescriptors(a)).forEach(([s,{value:i,enumerable:n}])=>{if(n===!1||i===void 0||typeof i=="object"&&i!==null&&i.__v_skip)return;let l=o===""?s:`${o}.${s}`;typeof i=="object"&&i!==null&&i._x_interceptor?a[s]=i.initialize(t,l,s):e(i)&&i!==a&&!(i instanceof Element)&&r(i,l)})};return r(t)}function gs(t,e=()=>{}){let r={initialValue:void 0,_x_interceptor:!0,initialize(a,o,s){return t(this.initialValue,()=>ul(a,o),i=>Pr(a,o,i),o,s)}};return e(r),a=>{if(typeof a=="object"&&a!==null&&a._x_interceptor){let o=r.initialize.bind(r);r.initialize=(s,i,n)=>{let l=a.initialize(s,i,n);return r.initialValue=l,o(s,i,n)}}else r.initialValue=a;return r}}function ul(t,e){return e.split(".").reduce((r,a)=>r[a],t)}function Pr(t,e,r){if(typeof e=="string"&&(e=e.split(".")),e.length===1)t[e[0]]=r;else{if(e.length===0)throw error;return t[e[0]]||(t[e[0]]={}),Pr(t[e[0]],e.slice(1),r)}}var bs={};function N(t,e){bs[t]=e}function Tr(t,e){let r=dl(e);return Object.entries(bs).forEach(([a,o])=>{Object.defineProperty(t,`$${a}`,{get(){return o(e,r)},enumerable:!1})}),t}function dl(t){let[e,r]=As(t),a={interceptor:gs,...e};return Vr(t,r),a}function cl(t,e,r,...a){try{return r(...a)}catch(o){Ve(o,t,e)}}function Ve(t,e,r=void 0){t=Object.assign(t??{message:"No error message given."},{el:e,expression:r}),console.warn(`Alpine Expression Error: ${t.message}

${r?'Expression: "'+r+`"

`:""}`,e),setTimeout(()=>{throw t},0)}var lt=!0;function Ss(t){let e=lt;lt=!1;let r=t();return lt=e,r}function ne(t,e,r={}){let a;return q(t,e)(o=>a=o,r),a}function q(...t){return vs(...t)}var vs=ws;function pl(t){vs=t}function ws(t,e){let r={};Tr(r,t);let a=[r,...Se(t)],o=typeof e=="function"?ml(a,e):xl(a,e,t);return cl.bind(null,t,e,o)}function ml(t,e){return(r=()=>{},{scope:a={},params:o=[]}={})=>{let s=e.apply(We([a,...t]),o);dt(r,s)}}var Sr={};function hl(t,e){if(Sr[t])return Sr[t];let r=Object.getPrototypeOf(async function(){}).constructor,a=/^[\n\s]*if.*\(.*\)/.test(t.trim())||/^(let|const)\s/.test(t.trim())?`(async()=>{ ${t} })()`:t,s=(()=>{try{let i=new r(["__self","scope"],`with (scope) { __self.result = ${a} }; __self.finished = true; return __self.result;`);return Object.defineProperty(i,"name",{value:`[Alpine] ${t}`}),i}catch(i){return Ve(i,e,t),Promise.resolve()}})();return Sr[t]=s,s}function xl(t,e,r){let a=hl(e,r);return(o=()=>{},{scope:s={},params:i=[]}={})=>{a.result=void 0,a.finished=!1;let n=We([s,...t]);if(typeof a=="function"){let l=a(a,n).catch(p=>Ve(p,r,e));a.finished?(dt(o,a.result,n,i,r),a.result=void 0):l.then(p=>{dt(o,p,n,i,r)}).catch(p=>Ve(p,r,e)).finally(()=>a.result=void 0)}}}function dt(t,e,r,a,o){if(lt&&typeof e=="function"){let s=e.apply(r,a);s instanceof Promise?s.then(i=>dt(t,i,r,a)).catch(i=>Ve(i,o,e)):t(s)}else typeof e=="object"&&e instanceof Promise?e.then(s=>t(s)):t(e)}var jr="x-";function Ce(t=""){return jr+t}function gl(t){jr=t}var ct={};function k(t,e){return ct[t]=e,{before(r){if(!ct[r]){console.warn(String.raw`Cannot find directive \`${r}\`. \`${t}\` will use the default order of execution`);return}let a=se.indexOf(r);se.splice(a>=0?a:se.indexOf("DEFAULT"),0,t)}}}function bl(t){return Object.keys(ct).includes(t)}function Kr(t,e,r){if(e=Array.from(e),t._x_virtualDirectives){let s=Object.entries(t._x_virtualDirectives).map(([n,l])=>({name:n,value:l})),i=ys(s);s=s.map(n=>i.find(l=>l.name===n.name)?{name:`x-bind:${n.name}`,value:`"${n.value}"`}:n),e=e.concat(s)}let a={};return e.map(Ls((s,i)=>a[s]=i)).filter(Ts).map(wl(a,r)).sort(yl).map(s=>vl(t,s))}function ys(t){return Array.from(t).map(Ls()).filter(e=>!Ts(e))}var _r=!1,He=new Map,Cs=Symbol();function Sl(t){_r=!0;let e=Symbol();Cs=e,He.set(e,[]);let r=()=>{for(;He.get(e).length;)He.get(e).shift()();He.delete(e)},a=()=>{_r=!1,r()};t(r),a()}function As(t){let e=[],r=n=>e.push(n),[a,o]=rl(t);return e.push(o),[{Alpine:ze,effect:a,cleanup:r,evaluateLater:q.bind(q,t),evaluate:ne.bind(ne,t)},()=>e.forEach(n=>n())]}function vl(t,e){let r=()=>{},a=ct[e.type]||r,[o,s]=As(t);cs(t,e.original,s);let i=()=>{t._x_ignore||t._x_ignoreSelf||(a.inline&&a.inline(t,e,o),a=a.bind(a,t,e,o),_r?He.get(Cs).push(a):a())};return i.runCleanups=s,i}var Es=(t,e)=>({name:r,value:a})=>(r.startsWith(t)&&(r=r.replace(t,e)),{name:r,value:a}),Ms=t=>t;function Ls(t=()=>{}){return({name:e,value:r})=>{let{name:a,value:o}=Ps.reduce((s,i)=>i(s),{name:e,value:r});return a!==e&&t(a,e),{name:a,value:o}}}var Ps=[];function Xr(t){Ps.push(t)}function Ts({name:t}){return _s().test(t)}var _s=()=>new RegExp(`^${jr}([^:^.]+)\\b`);function wl(t,e){return({name:r,value:a})=>{let o=r.match(_s()),s=r.match(/:([a-zA-Z0-9\-_:]+)/),i=r.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],n=e||t[r]||r;return{type:o?o[1]:null,value:s?s[1]:null,modifiers:i.map(l=>l.replace(".","")),expression:a,original:n}}}var Rr="DEFAULT",se=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",Rr,"teleport"];function yl(t,e){let r=se.indexOf(t.type)===-1?Rr:t.type,a=se.indexOf(e.type)===-1?Rr:e.type;return se.indexOf(r)-se.indexOf(a)}function Ie(t,e,r={}){t.dispatchEvent(new CustomEvent(e,{detail:r,bubbles:!0,composed:!0,cancelable:!0}))}function ue(t,e){if(typeof ShadowRoot=="function"&&t instanceof ShadowRoot){Array.from(t.children).forEach(o=>ue(o,e));return}let r=!1;if(e(t,()=>r=!0),r)return;let a=t.firstElementChild;for(;a;)ue(a,e,!1),a=a.nextElementSibling}function O(t,...e){console.warn(`Alpine Warning: ${t}`,...e)}var jo=!1;function Cl(){jo&&O("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),jo=!0,document.body||O("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),Ie(document,"alpine:init"),Ie(document,"alpine:initializing"),zr(),al(e=>$(e,ue)),Vr(e=>Ee(e)),ds((e,r)=>{Kr(e,r).forEach(a=>a())});let t=e=>!mt(e.parentElement,!0);Array.from(document.querySelectorAll(Fs().join(","))).filter(t).forEach(e=>{$(e)}),Ie(document,"alpine:initialized"),setTimeout(()=>{Ll()})}var Zr=[],Rs=[];function ks(){return Zr.map(t=>t())}function Fs(){return Zr.concat(Rs).map(t=>t())}function Bs(t){Zr.push(t)}function qs(t){Rs.push(t)}function mt(t,e=!1){return Ae(t,r=>{if((e?Fs():ks()).some(o=>r.matches(o)))return!0})}function Ae(t,e){if(t){if(e(t))return t;if(t._x_teleportBack&&(t=t._x_teleportBack),!!t.parentElement)return Ae(t.parentElement,e)}}function Al(t){return ks().some(e=>t.matches(e))}var Ds=[];function El(t){Ds.push(t)}var Ml=1;function $(t,e=ue,r=()=>{}){Ae(t,a=>a._x_ignore)||Sl(()=>{e(t,(a,o)=>{a._x_marker||(r(a,o),Ds.forEach(s=>s(a,o)),Kr(a,a.attributes).forEach(s=>s()),a._x_ignore||(a._x_marker=Ml++),a._x_ignore&&o())})})}function Ee(t,e=ue){e(t,r=>{ol(r),ps(r),delete r._x_marker})}function Ll(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([e,r,a])=>{bl(r)||a.some(o=>{if(document.querySelector(o))return O(`found "${o}", but missing ${e} plugin`),!0})})}var kr=[],Jr=!1;function Qr(t=()=>{}){return queueMicrotask(()=>{Jr||setTimeout(()=>{Fr()})}),new Promise(e=>{kr.push(()=>{t(),e()})})}function Fr(){for(Jr=!1;kr.length;)kr.shift()()}function Pl(){Jr=!0}function Yr(t,e){return Array.isArray(e)?Ko(t,e.join(" ")):typeof e=="object"&&e!==null?Tl(t,e):typeof e=="function"?Yr(t,e()):Ko(t,e)}function Ko(t,e){let r=s=>s.split(" ").filter(Boolean),a=s=>s.split(" ").filter(i=>!t.classList.contains(i)).filter(Boolean),o=s=>(t.classList.add(...s),()=>{t.classList.remove(...s)});return e=e===!0?e="":e||"",o(a(e))}function Tl(t,e){let r=n=>n.split(" ").filter(Boolean),a=Object.entries(e).flatMap(([n,l])=>l?r(n):!1).filter(Boolean),o=Object.entries(e).flatMap(([n,l])=>l?!1:r(n)).filter(Boolean),s=[],i=[];return o.forEach(n=>{t.classList.contains(n)&&(t.classList.remove(n),i.push(n))}),a.forEach(n=>{t.classList.contains(n)||(t.classList.add(n),s.push(n))}),()=>{i.forEach(n=>t.classList.add(n)),s.forEach(n=>t.classList.remove(n))}}function ht(t,e){return typeof e=="object"&&e!==null?_l(t,e):Rl(t,e)}function _l(t,e){let r={};return Object.entries(e).forEach(([a,o])=>{r[a]=t.style[a],a.startsWith("--")||(a=kl(a)),t.style.setProperty(a,o)}),setTimeout(()=>{t.style.length===0&&t.removeAttribute("style")}),()=>{ht(t,r)}}function Rl(t,e){let r=t.getAttribute("style",e);return t.setAttribute("style",e),()=>{t.setAttribute("style",r||"")}}function kl(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function Br(t,e=()=>{}){let r=!1;return function(){r?e.apply(this,arguments):(r=!0,t.apply(this,arguments))}}k("transition",(t,{value:e,modifiers:r,expression:a},{evaluate:o})=>{typeof a=="function"&&(a=o(a)),a!==!1&&(!a||typeof a=="boolean"?Bl(t,r,e):Fl(t,a,e))});function Fl(t,e,r){Os(t,Yr,""),{enter:o=>{t._x_transition.enter.during=o},"enter-start":o=>{t._x_transition.enter.start=o},"enter-end":o=>{t._x_transition.enter.end=o},leave:o=>{t._x_transition.leave.during=o},"leave-start":o=>{t._x_transition.leave.start=o},"leave-end":o=>{t._x_transition.leave.end=o}}[r](e)}function Bl(t,e,r){Os(t,ht);let a=!e.includes("in")&&!e.includes("out")&&!r,o=a||e.includes("in")||["enter"].includes(r),s=a||e.includes("out")||["leave"].includes(r);e.includes("in")&&!a&&(e=e.filter((b,u)=>u<e.indexOf("out"))),e.includes("out")&&!a&&(e=e.filter((b,u)=>u>e.indexOf("out")));let i=!e.includes("opacity")&&!e.includes("scale"),n=i||e.includes("opacity"),l=i||e.includes("scale"),p=n?0:1,x=l?De(e,"scale",95)/100:1,w=De(e,"delay",0)/1e3,h=De(e,"origin","center"),y="opacity, transform",C=De(e,"duration",150)/1e3,E=De(e,"duration",75)/1e3,m="cubic-bezier(0.4, 0.0, 0.2, 1)";o&&(t._x_transition.enter.during={transformOrigin:h,transitionDelay:`${w}s`,transitionProperty:y,transitionDuration:`${C}s`,transitionTimingFunction:m},t._x_transition.enter.start={opacity:p,transform:`scale(${x})`},t._x_transition.enter.end={opacity:1,transform:"scale(1)"}),s&&(t._x_transition.leave.during={transformOrigin:h,transitionDelay:`${w}s`,transitionProperty:y,transitionDuration:`${E}s`,transitionTimingFunction:m},t._x_transition.leave.start={opacity:1,transform:"scale(1)"},t._x_transition.leave.end={opacity:p,transform:`scale(${x})`})}function Os(t,e,r={}){t._x_transition||(t._x_transition={enter:{during:r,start:r,end:r},leave:{during:r,start:r,end:r},in(a=()=>{},o=()=>{}){qr(t,e,{during:this.enter.during,start:this.enter.start,end:this.enter.end},a,o)},out(a=()=>{},o=()=>{}){qr(t,e,{during:this.leave.during,start:this.leave.start,end:this.leave.end},a,o)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(t,e,r,a){let o=document.visibilityState==="visible"?requestAnimationFrame:setTimeout,s=()=>o(r);if(e){t._x_transition&&(t._x_transition.enter||t._x_transition.leave)?t._x_transition.enter&&(Object.entries(t._x_transition.enter.during).length||Object.entries(t._x_transition.enter.start).length||Object.entries(t._x_transition.enter.end).length)?t._x_transition.in(r):s():t._x_transition?t._x_transition.in(r):s();return}t._x_hidePromise=t._x_transition?new Promise((i,n)=>{t._x_transition.out(()=>{},()=>i(a)),t._x_transitioning&&t._x_transitioning.beforeCancel(()=>n({isFromCancelledTransition:!0}))}):Promise.resolve(a),queueMicrotask(()=>{let i=Hs(t);i?(i._x_hideChildren||(i._x_hideChildren=[]),i._x_hideChildren.push(t)):o(()=>{let n=l=>{let p=Promise.all([l._x_hidePromise,...(l._x_hideChildren||[]).map(n)]).then(([x])=>x?.());return delete l._x_hidePromise,delete l._x_hideChildren,p};n(t).catch(l=>{if(!l.isFromCancelledTransition)throw l})})})};function Hs(t){let e=t.parentNode;if(e)return e._x_hidePromise?e:Hs(e)}function qr(t,e,{during:r,start:a,end:o}={},s=()=>{},i=()=>{}){if(t._x_transitioning&&t._x_transitioning.cancel(),Object.keys(r).length===0&&Object.keys(a).length===0&&Object.keys(o).length===0){s(),i();return}let n,l,p;ql(t,{start(){n=e(t,a)},during(){l=e(t,r)},before:s,end(){n(),p=e(t,o)},after:i,cleanup(){l(),p()}})}function ql(t,e){let r,a,o,s=Br(()=>{T(()=>{r=!0,a||e.before(),o||(e.end(),Fr()),e.after(),t.isConnected&&e.cleanup(),delete t._x_transitioning})});t._x_transitioning={beforeCancels:[],beforeCancel(i){this.beforeCancels.push(i)},cancel:Br(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();s()}),finish:s},T(()=>{e.start(),e.during()}),Pl(),requestAnimationFrame(()=>{if(r)return;let i=Number(getComputedStyle(t).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,n=Number(getComputedStyle(t).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;i===0&&(i=Number(getComputedStyle(t).animationDuration.replace("s",""))*1e3),T(()=>{e.before()}),a=!0,requestAnimationFrame(()=>{r||(T(()=>{e.end()}),Fr(),setTimeout(t._x_transitioning.finish,i+n),o=!0)})})}function De(t,e,r){if(t.indexOf(e)===-1)return r;let a=t[t.indexOf(e)+1];if(!a||e==="scale"&&isNaN(a))return r;if(e==="duration"||e==="delay"){let o=a.match(/([0-9]+)ms/);if(o)return o[1]}return e==="origin"&&["top","right","left","center","bottom"].includes(t[t.indexOf(e)+2])?[a,t[t.indexOf(e)+2]].join(" "):a}var Z=!1;function Q(t,e=()=>{}){return(...r)=>Z?e(...r):t(...r)}function Dl(t){return(...e)=>Z&&t(...e)}var Is=[];function xt(t){Is.push(t)}function Ol(t,e){Is.forEach(r=>r(t,e)),Z=!0,Us(()=>{$(e,(r,a)=>{a(r,()=>{})})}),Z=!1}var Dr=!1;function Hl(t,e){e._x_dataStack||(e._x_dataStack=t._x_dataStack),Z=!0,Dr=!0,Us(()=>{Il(e)}),Z=!1,Dr=!1}function Il(t){let e=!1;$(t,(a,o)=>{ue(a,(s,i)=>{if(e&&Al(s))return i();e=!0,o(s,i)})})}function Us(t){let e=de;Go((r,a)=>{let o=e(r);return ye(o),()=>{}}),t(),Go(e)}function Vs(t,e,r,a=[]){switch(t._x_bindings||(t._x_bindings=we({})),t._x_bindings[e]=r,e=a.includes("camel")?jl(e):e,e){case"value":Ul(t,r);break;case"style":Nl(t,r);break;case"class":Vl(t,r);break;case"selected":case"checked":Wl(t,e,r);break;default:Ns(t,e,r);break}}function Ul(t,e){if($s(t))t.attributes.value===void 0&&(t.value=e),window.fromModel&&(typeof e=="boolean"?t.checked=ft(t.value)===e:t.checked=Xo(t.value,e));else if(ea(t))Number.isInteger(e)?t.value=e:!Array.isArray(e)&&typeof e!="boolean"&&![null,void 0].includes(e)?t.value=String(e):Array.isArray(e)?t.checked=e.some(r=>Xo(r,t.value)):t.checked=!!e;else if(t.tagName==="SELECT")Gl(t,e);else{if(t.value===e)return;t.value=e===void 0?"":e}}function Vl(t,e){t._x_undoAddedClasses&&t._x_undoAddedClasses(),t._x_undoAddedClasses=Yr(t,e)}function Nl(t,e){t._x_undoAddedStyles&&t._x_undoAddedStyles(),t._x_undoAddedStyles=ht(t,e)}function Wl(t,e,r){Ns(t,e,r),$l(t,e,r)}function Ns(t,e,r){[null,void 0,!1].includes(r)&&Xl(e)?t.removeAttribute(e):(Ws(e)&&(r=e),zl(t,e,r))}function zl(t,e,r){t.getAttribute(e)!=r&&t.setAttribute(e,r)}function $l(t,e,r){t[e]!==r&&(t[e]=r)}function Gl(t,e){let r=[].concat(e).map(a=>a+"");Array.from(t.options).forEach(a=>{a.selected=r.includes(a.value)})}function jl(t){return t.toLowerCase().replace(/-(\w)/g,(e,r)=>r.toUpperCase())}function Xo(t,e){return t==e}function ft(t){return[1,"1","true","on","yes",!0].includes(t)?!0:[0,"0","false","off","no",!1].includes(t)?!1:t?!!t:null}var Kl=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function Ws(t){return Kl.has(t)}function Xl(t){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(t)}function Zl(t,e,r){return t._x_bindings&&t._x_bindings[e]!==void 0?t._x_bindings[e]:zs(t,e,r)}function Jl(t,e,r,a=!0){if(t._x_bindings&&t._x_bindings[e]!==void 0)return t._x_bindings[e];if(t._x_inlineBindings&&t._x_inlineBindings[e]!==void 0){let o=t._x_inlineBindings[e];return o.extract=a,Ss(()=>ne(t,o.expression))}return zs(t,e,r)}function zs(t,e,r){let a=t.getAttribute(e);return a===null?typeof r=="function"?r():r:a===""?!0:Ws(e)?!![e,"true"].includes(a):a}function ea(t){return t.type==="checkbox"||t.localName==="ui-checkbox"||t.localName==="ui-switch"}function $s(t){return t.type==="radio"||t.localName==="ui-radio"}function Gs(t,e){var r;return function(){var a=this,o=arguments,s=function(){r=null,t.apply(a,o)};clearTimeout(r),r=setTimeout(s,e)}}function js(t,e){let r;return function(){let a=this,o=arguments;r||(t.apply(a,o),r=!0,setTimeout(()=>r=!1,e))}}function Ks({get:t,set:e},{get:r,set:a}){let o=!0,s,i,n=de(()=>{let l=t(),p=r();if(o)a(vr(l)),o=!1;else{let x=JSON.stringify(l),w=JSON.stringify(p);x!==s?a(vr(l)):x!==w&&e(vr(p))}s=JSON.stringify(t()),i=JSON.stringify(r())});return()=>{ye(n)}}function vr(t){return typeof t=="object"?JSON.parse(JSON.stringify(t)):t}function Ql(t){(Array.isArray(t)?t:[t]).forEach(r=>r(ze))}var oe={},Zo=!1;function Yl(t,e){if(Zo||(oe=we(oe),Zo=!0),e===void 0)return oe[t];oe[t]=e,xs(oe[t]),typeof e=="object"&&e!==null&&e.hasOwnProperty("init")&&typeof e.init=="function"&&oe[t].init()}function ef(){return oe}var Xs={};function tf(t,e){let r=typeof e!="function"?()=>e:e;return t instanceof Element?Zs(t,r()):(Xs[t]=r,()=>{})}function rf(t){return Object.entries(Xs).forEach(([e,r])=>{Object.defineProperty(t,e,{get(){return(...a)=>r(...a)}})}),t}function Zs(t,e,r){let a=[];for(;a.length;)a.pop()();let o=Object.entries(e).map(([i,n])=>({name:i,value:n})),s=ys(o);return o=o.map(i=>s.find(n=>n.name===i.name)?{name:`x-bind:${i.name}`,value:`"${i.value}"`}:i),Kr(t,o,r).map(i=>{a.push(i.runCleanups),i()}),()=>{for(;a.length;)a.pop()()}}var Js={};function af(t,e){Js[t]=e}function of(t,e){return Object.entries(Js).forEach(([r,a])=>{Object.defineProperty(t,r,{get(){return(...o)=>a.bind(e)(...o)},enumerable:!1})}),t}var sf={get reactive(){return we},get release(){return ye},get effect(){return de},get raw(){return is},version:"3.14.9",flushAndStopDeferringMutations:nl,dontAutoEvaluateFunctions:Ss,disableEffectScheduling:el,startObservingMutations:zr,stopObservingMutations:ms,setReactivityEngine:tl,onAttributeRemoved:cs,onAttributesAdded:ds,closestDataStack:Se,skipDuringClone:Q,onlyDuringClone:Dl,addRootSelector:Bs,addInitSelector:qs,interceptClone:xt,addScopeToNode:Ne,deferMutations:il,mapAttributes:Xr,evaluateLater:q,interceptInit:El,setEvaluator:pl,mergeProxies:We,extractProp:Jl,findClosest:Ae,onElRemoved:Vr,closestRoot:mt,destroyTree:Ee,interceptor:gs,transition:qr,setStyles:ht,mutateDom:T,directive:k,entangle:Ks,throttle:js,debounce:Gs,evaluate:ne,initTree:$,nextTick:Qr,prefixed:Ce,prefix:gl,plugin:Ql,magic:N,store:Yl,start:Cl,clone:Hl,cloneNode:Ol,bound:Zl,$data:hs,watch:ns,walk:ue,data:af,bind:tf},ze=sf;function Qs(t,e){let r=Object.create(null),a=t.split(",");for(let o=0;o<a.length;o++)r[a[o]]=!0;return e?o=>!!r[o.toLowerCase()]:o=>!!r[o]}var nf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",du=Qs(nf+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"),lf=Object.freeze({}),cu=Object.freeze([]),ff=Object.prototype.hasOwnProperty,gt=(t,e)=>ff.call(t,e),le=Array.isArray,Ue=t=>Ys(t)==="[object Map]",uf=t=>typeof t=="string",ta=t=>typeof t=="symbol",bt=t=>t!==null&&typeof t=="object",df=Object.prototype.toString,Ys=t=>df.call(t),ei=t=>Ys(t).slice(8,-1),ra=t=>uf(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,St=t=>{let e=Object.create(null);return r=>e[r]||(e[r]=t(r))},cf=/-(\w)/g,pu=St(t=>t.replace(cf,(e,r)=>r?r.toUpperCase():"")),pf=/\B([A-Z])/g,mu=St(t=>t.replace(pf,"-$1").toLowerCase()),ti=St(t=>t.charAt(0).toUpperCase()+t.slice(1)),hu=St(t=>t?`on${ti(t)}`:""),ri=(t,e)=>t!==e&&(t===t||e===e),Or=new WeakMap,Oe=[],W,fe=Symbol("iterate"),Hr=Symbol("Map key iterate");function mf(t){return t&&t._isEffect===!0}function hf(t,e=lf){mf(t)&&(t=t.raw);let r=bf(t,e);return e.lazy||r(),r}function xf(t){t.active&&(ai(t),t.options.onStop&&t.options.onStop(),t.active=!1)}var gf=0;function bf(t,e){let r=function(){if(!r.active)return t();if(!Oe.includes(r)){ai(r);try{return vf(),Oe.push(r),W=r,t()}finally{Oe.pop(),oi(),W=Oe[Oe.length-1]}}};return r.id=gf++,r.allowRecurse=!!e.allowRecurse,r._isEffect=!0,r.active=!0,r.raw=t,r.deps=[],r.options=e,r}function ai(t){let{deps:e}=t;if(e.length){for(let r=0;r<e.length;r++)e[r].delete(t);e.length=0}}var ve=!0,aa=[];function Sf(){aa.push(ve),ve=!1}function vf(){aa.push(ve),ve=!0}function oi(){let t=aa.pop();ve=t===void 0?!0:t}function V(t,e,r){if(!ve||W===void 0)return;let a=Or.get(t);a||Or.set(t,a=new Map);let o=a.get(r);o||a.set(r,o=new Set),o.has(W)||(o.add(W),W.deps.push(o),W.options.onTrack&&W.options.onTrack({effect:W,target:t,type:e,key:r}))}function J(t,e,r,a,o,s){let i=Or.get(t);if(!i)return;let n=new Set,l=x=>{x&&x.forEach(w=>{(w!==W||w.allowRecurse)&&n.add(w)})};if(e==="clear")i.forEach(l);else if(r==="length"&&le(t))i.forEach((x,w)=>{(w==="length"||w>=a)&&l(x)});else switch(r!==void 0&&l(i.get(r)),e){case"add":le(t)?ra(r)&&l(i.get("length")):(l(i.get(fe)),Ue(t)&&l(i.get(Hr)));break;case"delete":le(t)||(l(i.get(fe)),Ue(t)&&l(i.get(Hr)));break;case"set":Ue(t)&&l(i.get(fe));break}let p=x=>{x.options.onTrigger&&x.options.onTrigger({effect:x,target:t,key:r,type:e,newValue:a,oldValue:o,oldTarget:s}),x.options.scheduler?x.options.scheduler(x):x()};n.forEach(p)}var wf=Qs("__proto__,__v_isRef,__isVue"),si=new Set(Object.getOwnPropertyNames(Symbol).map(t=>Symbol[t]).filter(ta)),yf=ii(),Cf=ii(!0),Jo=Af();function Af(){let t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...r){let a=M(this);for(let s=0,i=this.length;s<i;s++)V(a,"get",s+"");let o=a[e](...r);return o===-1||o===!1?a[e](...r.map(M)):o}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...r){Sf();let a=M(this)[e].apply(this,r);return oi(),a}}),t}function ii(t=!1,e=!1){return function(a,o,s){if(o==="__v_isReactive")return!t;if(o==="__v_isReadonly")return t;if(o==="__v_raw"&&s===(t?e?Uf:ui:e?If:fi).get(a))return a;let i=le(a);if(!t&&i&&gt(Jo,o))return Reflect.get(Jo,o,s);let n=Reflect.get(a,o,s);return(ta(o)?si.has(o):wf(o))||(t||V(a,"get",o),e)?n:Ir(n)?!i||!ra(o)?n.value:n:bt(n)?t?di(n):na(n):n}}var Ef=Mf();function Mf(t=!1){return function(r,a,o,s){let i=r[a];if(!t&&(o=M(o),i=M(i),!le(r)&&Ir(i)&&!Ir(o)))return i.value=o,!0;let n=le(r)&&ra(a)?Number(a)<r.length:gt(r,a),l=Reflect.set(r,a,o,s);return r===M(s)&&(n?ri(o,i)&&J(r,"set",a,o,i):J(r,"add",a,o)),l}}function Lf(t,e){let r=gt(t,e),a=t[e],o=Reflect.deleteProperty(t,e);return o&&r&&J(t,"delete",e,void 0,a),o}function Pf(t,e){let r=Reflect.has(t,e);return(!ta(e)||!si.has(e))&&V(t,"has",e),r}function Tf(t){return V(t,"iterate",le(t)?"length":fe),Reflect.ownKeys(t)}var _f={get:yf,set:Ef,deleteProperty:Lf,has:Pf,ownKeys:Tf},Rf={get:Cf,set(t,e){return console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`,t),!0},deleteProperty(t,e){return console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`,t),!0}},oa=t=>bt(t)?na(t):t,sa=t=>bt(t)?di(t):t,ia=t=>t,vt=t=>Reflect.getPrototypeOf(t);function at(t,e,r=!1,a=!1){t=t.__v_raw;let o=M(t),s=M(e);e!==s&&!r&&V(o,"get",e),!r&&V(o,"get",s);let{has:i}=vt(o),n=a?ia:r?sa:oa;if(i.call(o,e))return n(t.get(e));if(i.call(o,s))return n(t.get(s));t!==o&&t.get(e)}function ot(t,e=!1){let r=this.__v_raw,a=M(r),o=M(t);return t!==o&&!e&&V(a,"has",t),!e&&V(a,"has",o),t===o?r.has(t):r.has(t)||r.has(o)}function st(t,e=!1){return t=t.__v_raw,!e&&V(M(t),"iterate",fe),Reflect.get(t,"size",t)}function Qo(t){t=M(t);let e=M(this);return vt(e).has.call(e,t)||(e.add(t),J(e,"add",t,t)),this}function Yo(t,e){e=M(e);let r=M(this),{has:a,get:o}=vt(r),s=a.call(r,t);s?li(r,a,t):(t=M(t),s=a.call(r,t));let i=o.call(r,t);return r.set(t,e),s?ri(e,i)&&J(r,"set",t,e,i):J(r,"add",t,e),this}function es(t){let e=M(this),{has:r,get:a}=vt(e),o=r.call(e,t);o?li(e,r,t):(t=M(t),o=r.call(e,t));let s=a?a.call(e,t):void 0,i=e.delete(t);return o&&J(e,"delete",t,void 0,s),i}function ts(){let t=M(this),e=t.size!==0,r=Ue(t)?new Map(t):new Set(t),a=t.clear();return e&&J(t,"clear",void 0,void 0,r),a}function it(t,e){return function(a,o){let s=this,i=s.__v_raw,n=M(i),l=e?ia:t?sa:oa;return!t&&V(n,"iterate",fe),i.forEach((p,x)=>a.call(o,l(p),l(x),s))}}function nt(t,e,r){return function(...a){let o=this.__v_raw,s=M(o),i=Ue(s),n=t==="entries"||t===Symbol.iterator&&i,l=t==="keys"&&i,p=o[t](...a),x=r?ia:e?sa:oa;return!e&&V(s,"iterate",l?Hr:fe),{next(){let{value:w,done:h}=p.next();return h?{value:w,done:h}:{value:n?[x(w[0]),x(w[1])]:x(w),done:h}},[Symbol.iterator](){return this}}}}function X(t){return function(...e){{let r=e[0]?`on key "${e[0]}" `:"";console.warn(`${ti(t)} operation ${r}failed: target is readonly.`,M(this))}return t==="delete"?!1:this}}function kf(){let t={get(s){return at(this,s)},get size(){return st(this)},has:ot,add:Qo,set:Yo,delete:es,clear:ts,forEach:it(!1,!1)},e={get(s){return at(this,s,!1,!0)},get size(){return st(this)},has:ot,add:Qo,set:Yo,delete:es,clear:ts,forEach:it(!1,!0)},r={get(s){return at(this,s,!0)},get size(){return st(this,!0)},has(s){return ot.call(this,s,!0)},add:X("add"),set:X("set"),delete:X("delete"),clear:X("clear"),forEach:it(!0,!1)},a={get(s){return at(this,s,!0,!0)},get size(){return st(this,!0)},has(s){return ot.call(this,s,!0)},add:X("add"),set:X("set"),delete:X("delete"),clear:X("clear"),forEach:it(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=nt(s,!1,!1),r[s]=nt(s,!0,!1),e[s]=nt(s,!1,!0),a[s]=nt(s,!0,!0)}),[t,r,e,a]}var[Ff,Bf,qf,Df]=kf();function ni(t,e){let r=e?t?Df:qf:t?Bf:Ff;return(a,o,s)=>o==="__v_isReactive"?!t:o==="__v_isReadonly"?t:o==="__v_raw"?a:Reflect.get(gt(r,o)&&o in a?r:a,o,s)}var Of={get:ni(!1,!1)},Hf={get:ni(!0,!1)};function li(t,e,r){let a=M(r);if(a!==r&&e.call(t,a)){let o=ei(t);console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var fi=new WeakMap,If=new WeakMap,ui=new WeakMap,Uf=new WeakMap;function Vf(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Nf(t){return t.__v_skip||!Object.isExtensible(t)?0:Vf(ei(t))}function na(t){return t&&t.__v_isReadonly?t:ci(t,!1,_f,Of,fi)}function di(t){return ci(t,!0,Rf,Hf,ui)}function ci(t,e,r,a,o){if(!bt(t))return console.warn(`value cannot be made reactive: ${String(t)}`),t;if(t.__v_raw&&!(e&&t.__v_isReactive))return t;let s=o.get(t);if(s)return s;let i=Nf(t);if(i===0)return t;let n=new Proxy(t,i===2?a:r);return o.set(t,n),n}function M(t){return t&&M(t.__v_raw)||t}function Ir(t){return!!(t&&t.__v_isRef===!0)}N("nextTick",()=>Qr);N("dispatch",t=>Ie.bind(Ie,t));N("watch",(t,{evaluateLater:e,cleanup:r})=>(a,o)=>{let s=e(a),n=ns(()=>{let l;return s(p=>l=p),l},o);r(n)});N("store",ef);N("data",t=>hs(t));N("root",t=>mt(t));N("refs",t=>(t._x_refs_proxy||(t._x_refs_proxy=We(Wf(t))),t._x_refs_proxy));function Wf(t){let e=[];return Ae(t,r=>{r._x_refs&&e.push(r._x_refs)}),e}var wr={};function pi(t){return wr[t]||(wr[t]=0),++wr[t]}function zf(t,e){return Ae(t,r=>{if(r._x_ids&&r._x_ids[e])return!0})}function $f(t,e){t._x_ids||(t._x_ids={}),t._x_ids[e]||(t._x_ids[e]=pi(e))}N("id",(t,{cleanup:e})=>(r,a=null)=>{let o=`${r}${a?`-${a}`:""}`;return Gf(t,o,e,()=>{let s=zf(t,r),i=s?s._x_ids[r]:pi(r);return a?`${r}-${i}-${a}`:`${r}-${i}`})});xt((t,e)=>{t._x_id&&(e._x_id=t._x_id)});function Gf(t,e,r,a){if(t._x_id||(t._x_id={}),t._x_id[e])return t._x_id[e];let o=a();return t._x_id[e]=o,r(()=>{delete t._x_id[e]}),o}N("el",t=>t);mi("Focus","focus","focus");mi("Persist","persist","persist");function mi(t,e,r){N(e,a=>O(`You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${r}`,a))}k("modelable",(t,{expression:e},{effect:r,evaluateLater:a,cleanup:o})=>{let s=a(e),i=()=>{let x;return s(w=>x=w),x},n=a(`${e} = __placeholder`),l=x=>n(()=>{},{scope:{__placeholder:x}}),p=i();l(p),queueMicrotask(()=>{if(!t._x_model)return;t._x_removeModelListeners.default();let x=t._x_model.get,w=t._x_model.set,h=Ks({get(){return x()},set(y){w(y)}},{get(){return i()},set(y){l(y)}});o(h)})});k("teleport",(t,{modifiers:e,expression:r},{cleanup:a})=>{t.tagName.toLowerCase()!=="template"&&O("x-teleport can only be used on a <template> tag",t);let o=rs(r),s=t.content.cloneNode(!0).firstElementChild;t._x_teleport=s,s._x_teleportBack=t,t.setAttribute("data-teleport-template",!0),s.setAttribute("data-teleport-target",!0),t._x_forwardEvents&&t._x_forwardEvents.forEach(n=>{s.addEventListener(n,l=>{l.stopPropagation(),t.dispatchEvent(new l.constructor(l.type,l))})}),Ne(s,{},t);let i=(n,l,p)=>{p.includes("prepend")?l.parentNode.insertBefore(n,l):p.includes("append")?l.parentNode.insertBefore(n,l.nextSibling):l.appendChild(n)};T(()=>{i(s,o,e),Q(()=>{$(s)})()}),t._x_teleportPutBack=()=>{let n=rs(r);T(()=>{i(t._x_teleport,n,e)})},a(()=>T(()=>{s.remove(),Ee(s)}))});var jf=document.createElement("div");function rs(t){let e=Q(()=>document.querySelector(t),()=>jf)();return e||O(`Cannot find x-teleport element for selector: "${t}"`),e}var hi=()=>{};hi.inline=(t,{modifiers:e},{cleanup:r})=>{e.includes("self")?t._x_ignoreSelf=!0:t._x_ignore=!0,r(()=>{e.includes("self")?delete t._x_ignoreSelf:delete t._x_ignore})};k("ignore",hi);k("effect",Q((t,{expression:e},{effect:r})=>{r(q(t,e))}));function Ur(t,e,r,a){let o=t,s=l=>a(l),i={},n=(l,p)=>x=>p(l,x);if(r.includes("dot")&&(e=Kf(e)),r.includes("camel")&&(e=Xf(e)),r.includes("passive")&&(i.passive=!0),r.includes("capture")&&(i.capture=!0),r.includes("window")&&(o=window),r.includes("document")&&(o=document),r.includes("debounce")){let l=r[r.indexOf("debounce")+1]||"invalid-wait",p=pt(l.split("ms")[0])?Number(l.split("ms")[0]):250;s=Gs(s,p)}if(r.includes("throttle")){let l=r[r.indexOf("throttle")+1]||"invalid-wait",p=pt(l.split("ms")[0])?Number(l.split("ms")[0]):250;s=js(s,p)}return r.includes("prevent")&&(s=n(s,(l,p)=>{p.preventDefault(),l(p)})),r.includes("stop")&&(s=n(s,(l,p)=>{p.stopPropagation(),l(p)})),r.includes("once")&&(s=n(s,(l,p)=>{l(p),o.removeEventListener(e,s,i)})),(r.includes("away")||r.includes("outside"))&&(o=document,s=n(s,(l,p)=>{t.contains(p.target)||p.target.isConnected!==!1&&(t.offsetWidth<1&&t.offsetHeight<1||t._x_isShown!==!1&&l(p))})),r.includes("self")&&(s=n(s,(l,p)=>{p.target===t&&l(p)})),(Jf(e)||xi(e))&&(s=n(s,(l,p)=>{Qf(p,r)||l(p)})),o.addEventListener(e,s,i),()=>{o.removeEventListener(e,s,i)}}function Kf(t){return t.replace(/-/g,".")}function Xf(t){return t.toLowerCase().replace(/-(\w)/g,(e,r)=>r.toUpperCase())}function pt(t){return!Array.isArray(t)&&!isNaN(t)}function Zf(t){return[" ","_"].includes(t)?t:t.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function Jf(t){return["keydown","keyup"].includes(t)}function xi(t){return["contextmenu","click","mouse"].some(e=>t.includes(e))}function Qf(t,e){let r=e.filter(s=>!["window","document","prevent","stop","once","capture","self","away","outside","passive"].includes(s));if(r.includes("debounce")){let s=r.indexOf("debounce");r.splice(s,pt((r[s+1]||"invalid-wait").split("ms")[0])?2:1)}if(r.includes("throttle")){let s=r.indexOf("throttle");r.splice(s,pt((r[s+1]||"invalid-wait").split("ms")[0])?2:1)}if(r.length===0||r.length===1&&as(t.key).includes(r[0]))return!1;let o=["ctrl","shift","alt","meta","cmd","super"].filter(s=>r.includes(s));return r=r.filter(s=>!o.includes(s)),!(o.length>0&&o.filter(i=>((i==="cmd"||i==="super")&&(i="meta"),t[`${i}Key`])).length===o.length&&(xi(t.type)||as(t.key).includes(r[0])))}function as(t){if(!t)return[];t=Zf(t);let e={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return e[t]=t,Object.keys(e).map(r=>{if(e[r]===t)return r}).filter(r=>r)}k("model",(t,{modifiers:e,expression:r},{effect:a,cleanup:o})=>{let s=t;e.includes("parent")&&(s=t.parentNode);let i=q(s,r),n;typeof r=="string"?n=q(s,`${r} = __placeholder`):typeof r=="function"&&typeof r()=="string"?n=q(s,`${r()} = __placeholder`):n=()=>{};let l=()=>{let h;return i(y=>h=y),os(h)?h.get():h},p=h=>{let y;i(C=>y=C),os(y)?y.set(h):n(()=>{},{scope:{__placeholder:h}})};typeof r=="string"&&t.type==="radio"&&T(()=>{t.hasAttribute("name")||t.setAttribute("name",r)});var x=t.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(t.type)||e.includes("lazy")?"change":"input";let w=Z?()=>{}:Ur(t,x,e,h=>{p(yr(t,e,h,l()))});if(e.includes("fill")&&([void 0,null,""].includes(l())||ea(t)&&Array.isArray(l())||t.tagName.toLowerCase()==="select"&&t.multiple)&&p(yr(t,e,{target:t},l())),t._x_removeModelListeners||(t._x_removeModelListeners={}),t._x_removeModelListeners.default=w,o(()=>t._x_removeModelListeners.default()),t.form){let h=Ur(t.form,"reset",[],y=>{Qr(()=>t._x_model&&t._x_model.set(yr(t,e,{target:t},l())))});o(()=>h())}t._x_model={get(){return l()},set(h){p(h)}},t._x_forceModelUpdate=h=>{h===void 0&&typeof r=="string"&&r.match(/\./)&&(h=""),window.fromModel=!0,T(()=>Vs(t,"value",h)),delete window.fromModel},a(()=>{let h=l();e.includes("unintrusive")&&document.activeElement.isSameNode(t)||t._x_forceModelUpdate(h)})});function yr(t,e,r,a){return T(()=>{if(r instanceof CustomEvent&&r.detail!==void 0)return r.detail!==null&&r.detail!==void 0?r.detail:r.target.value;if(ea(t))if(Array.isArray(a)){let o=null;return e.includes("number")?o=Cr(r.target.value):e.includes("boolean")?o=ft(r.target.value):o=r.target.value,r.target.checked?a.includes(o)?a:a.concat([o]):a.filter(s=>!Yf(s,o))}else return r.target.checked;else{if(t.tagName.toLowerCase()==="select"&&t.multiple)return e.includes("number")?Array.from(r.target.selectedOptions).map(o=>{let s=o.value||o.text;return Cr(s)}):e.includes("boolean")?Array.from(r.target.selectedOptions).map(o=>{let s=o.value||o.text;return ft(s)}):Array.from(r.target.selectedOptions).map(o=>o.value||o.text);{let o;return $s(t)?r.target.checked?o=r.target.value:o=a:o=r.target.value,e.includes("number")?Cr(o):e.includes("boolean")?ft(o):e.includes("trim")?o.trim():o}}})}function Cr(t){let e=t?parseFloat(t):null;return eu(e)?e:t}function Yf(t,e){return t==e}function eu(t){return!Array.isArray(t)&&!isNaN(t)}function os(t){return t!==null&&typeof t=="object"&&typeof t.get=="function"&&typeof t.set=="function"}k("cloak",t=>queueMicrotask(()=>T(()=>t.removeAttribute(Ce("cloak")))));qs(()=>`[${Ce("init")}]`);k("init",Q((t,{expression:e},{evaluate:r})=>typeof e=="string"?!!e.trim()&&r(e,{},!1):r(e,{},!1)));k("text",(t,{expression:e},{effect:r,evaluateLater:a})=>{let o=a(e);r(()=>{o(s=>{T(()=>{t.textContent=s})})})});k("html",(t,{expression:e},{effect:r,evaluateLater:a})=>{let o=a(e);r(()=>{o(s=>{T(()=>{t.innerHTML=s,t._x_ignoreSelf=!0,$(t),delete t._x_ignoreSelf})})})});Xr(Es(":",Ms(Ce("bind:"))));var gi=(t,{value:e,modifiers:r,expression:a,original:o},{effect:s,cleanup:i})=>{if(!e){let l={};rf(l),q(t,a)(x=>{Zs(t,x,o)},{scope:l});return}if(e==="key")return tu(t,a);if(t._x_inlineBindings&&t._x_inlineBindings[e]&&t._x_inlineBindings[e].extract)return;let n=q(t,a);s(()=>n(l=>{l===void 0&&typeof a=="string"&&a.match(/\./)&&(l=""),T(()=>Vs(t,e,l,r))})),i(()=>{t._x_undoAddedClasses&&t._x_undoAddedClasses(),t._x_undoAddedStyles&&t._x_undoAddedStyles()})};gi.inline=(t,{value:e,modifiers:r,expression:a})=>{e&&(t._x_inlineBindings||(t._x_inlineBindings={}),t._x_inlineBindings[e]={expression:a,extract:!1})};k("bind",gi);function tu(t,e){t._x_keyExpression=e}Bs(()=>`[${Ce("data")}]`);k("data",(t,{expression:e},{cleanup:r})=>{if(ru(t))return;e=e===""?"{}":e;let a={};Tr(a,t);let o={};of(o,a);let s=ne(t,e,{scope:o});(s===void 0||s===!0)&&(s={}),Tr(s,t);let i=we(s);xs(i);let n=Ne(t,i);i.init&&ne(t,i.init),r(()=>{i.destroy&&ne(t,i.destroy),n()})});xt((t,e)=>{t._x_dataStack&&(e._x_dataStack=t._x_dataStack,e.setAttribute("data-has-alpine-state",!0))});function ru(t){return Z?Dr?!0:t.hasAttribute("data-has-alpine-state"):!1}k("show",(t,{modifiers:e,expression:r},{effect:a})=>{let o=q(t,r);t._x_doHide||(t._x_doHide=()=>{T(()=>{t.style.setProperty("display","none",e.includes("important")?"important":void 0)})}),t._x_doShow||(t._x_doShow=()=>{T(()=>{t.style.length===1&&t.style.display==="none"?t.removeAttribute("style"):t.style.removeProperty("display")})});let s=()=>{t._x_doHide(),t._x_isShown=!1},i=()=>{t._x_doShow(),t._x_isShown=!0},n=()=>setTimeout(i),l=Br(w=>w?i():s(),w=>{typeof t._x_toggleAndCascadeWithTransitions=="function"?t._x_toggleAndCascadeWithTransitions(t,w,i,s):w?n():s()}),p,x=!0;a(()=>o(w=>{!x&&w===p||(e.includes("immediate")&&(w?n():s()),l(w),p=w,x=!1)}))});k("for",(t,{expression:e},{effect:r,cleanup:a})=>{let o=ou(e),s=q(t,o.items),i=q(t,t._x_keyExpression||"index");t._x_prevKeys=[],t._x_lookup={},r(()=>au(t,o,s,i)),a(()=>{Object.values(t._x_lookup).forEach(n=>T(()=>{Ee(n),n.remove()})),delete t._x_prevKeys,delete t._x_lookup})});function au(t,e,r,a){let o=i=>typeof i=="object"&&!Array.isArray(i),s=t;r(i=>{su(i)&&i>=0&&(i=Array.from(Array(i).keys(),m=>m+1)),i===void 0&&(i=[]);let n=t._x_lookup,l=t._x_prevKeys,p=[],x=[];if(o(i))i=Object.entries(i).map(([m,b])=>{let u=ss(e,b,m,i);a(c=>{x.includes(c)&&O("Duplicate key on x-for",t),x.push(c)},{scope:{index:m,...u}}),p.push(u)});else for(let m=0;m<i.length;m++){let b=ss(e,i[m],m,i);a(u=>{x.includes(u)&&O("Duplicate key on x-for",t),x.push(u)},{scope:{index:m,...b}}),p.push(b)}let w=[],h=[],y=[],C=[];for(let m=0;m<l.length;m++){let b=l[m];x.indexOf(b)===-1&&y.push(b)}l=l.filter(m=>!y.includes(m));let E="template";for(let m=0;m<x.length;m++){let b=x[m],u=l.indexOf(b);if(u===-1)l.splice(m,0,b),w.push([E,m]);else if(u!==m){let c=l.splice(m,1)[0],f=l.splice(u-1,1)[0];l.splice(m,0,f),l.splice(u,0,c),h.push([c,f])}else C.push(b);E=b}for(let m=0;m<y.length;m++){let b=y[m];b in n&&(T(()=>{Ee(n[b]),n[b].remove()}),delete n[b])}for(let m=0;m<h.length;m++){let[b,u]=h[m],c=n[b],f=n[u],d=document.createElement("div");T(()=>{f||O('x-for ":key" is undefined or invalid',s,u,n),f.after(d),c.after(f),f._x_currentIfEl&&f.after(f._x_currentIfEl),d.before(c),c._x_currentIfEl&&c.after(c._x_currentIfEl),d.remove()}),f._x_refreshXForScope(p[x.indexOf(u)])}for(let m=0;m<w.length;m++){let[b,u]=w[m],c=b==="template"?s:n[b];c._x_currentIfEl&&(c=c._x_currentIfEl);let f=p[u],d=x[u],v=document.importNode(s.content,!0).firstElementChild,g=we(f);Ne(v,g,s),v._x_refreshXForScope=S=>{Object.entries(S).forEach(([A,L])=>{g[A]=L})},T(()=>{c.after(v),Q(()=>$(v))()}),typeof d=="object"&&O("x-for key cannot be an object, it must be a string or an integer",s),n[d]=v}for(let m=0;m<C.length;m++)n[C[m]]._x_refreshXForScope(p[x.indexOf(C[m])]);s._x_prevKeys=x})}function ou(t){let e=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,r=/^\s*\(|\)\s*$/g,a=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,o=t.match(a);if(!o)return;let s={};s.items=o[2].trim();let i=o[1].replace(r,"").trim(),n=i.match(e);return n?(s.item=i.replace(e,"").trim(),s.index=n[1].trim(),n[2]&&(s.collection=n[2].trim())):s.item=i,s}function ss(t,e,r,a){let o={};return/^\[.*\]$/.test(t.item)&&Array.isArray(e)?t.item.replace("[","").replace("]","").split(",").map(i=>i.trim()).forEach((i,n)=>{o[i]=e[n]}):/^\{.*\}$/.test(t.item)&&!Array.isArray(e)&&typeof e=="object"?t.item.replace("{","").replace("}","").split(",").map(i=>i.trim()).forEach(i=>{o[i]=e[i]}):o[t.item]=e,t.index&&(o[t.index]=r),t.collection&&(o[t.collection]=a),o}function su(t){return!Array.isArray(t)&&!isNaN(t)}function bi(){}bi.inline=(t,{expression:e},{cleanup:r})=>{let a=mt(t);a._x_refs||(a._x_refs={}),a._x_refs[e]=t,r(()=>delete a._x_refs[e])};k("ref",bi);k("if",(t,{expression:e},{effect:r,cleanup:a})=>{t.tagName.toLowerCase()!=="template"&&O("x-if can only be used on a <template> tag",t);let o=q(t,e),s=()=>{if(t._x_currentIfEl)return t._x_currentIfEl;let n=t.content.cloneNode(!0).firstElementChild;return Ne(n,{},t),T(()=>{t.after(n),Q(()=>$(n))()}),t._x_currentIfEl=n,t._x_undoIf=()=>{T(()=>{Ee(n),n.remove()}),delete t._x_currentIfEl},n},i=()=>{t._x_undoIf&&(t._x_undoIf(),delete t._x_undoIf)};r(()=>o(n=>{n?s():i()})),a(()=>t._x_undoIf&&t._x_undoIf())});k("id",(t,{expression:e},{evaluate:r})=>{r(e).forEach(o=>$f(t,o))});xt((t,e)=>{t._x_ids&&(e._x_ids=t._x_ids)});Xr(Es("@",Ms(Ce("on:"))));k("on",Q((t,{value:e,modifiers:r,expression:a},{cleanup:o})=>{let s=a?q(t,a):()=>{};t.tagName.toLowerCase()==="template"&&(t._x_forwardEvents||(t._x_forwardEvents=[]),t._x_forwardEvents.includes(e)||t._x_forwardEvents.push(e));let i=Ur(t,e,r,n=>{s(()=>{},{scope:{$event:n},params:[n]})});o(()=>i())}));wt("Collapse","collapse","collapse");wt("Intersect","intersect","intersect");wt("Focus","trap","focus");wt("Mask","mask","mask");function wt(t,e,r){k(e,a=>O(`You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${r}`,a))}ze.setEvaluator(ws);ze.setReactivityEngine({reactive:na,effect:hf,release:xf,raw:M});var iu=ze,yt=iu;function nu(t){t.directive("collapse",e),e.inline=(r,{modifiers:a})=>{a.includes("min")&&(r._x_doShow=()=>{},r._x_doHide=()=>{})};function e(r,{modifiers:a}){let o=Si(a,"duration",250)/1e3,s=Si(a,"min",0),i=!a.includes("min");r._x_isShown||(r.style.height=`${s}px`),!r._x_isShown&&i&&(r.hidden=!0),r._x_isShown||(r.style.overflow="hidden");let n=(p,x)=>{let w=t.setStyles(p,x);return x.height?()=>{}:w},l={transitionProperty:"height",transitionDuration:`${o}s`,transitionTimingFunction:"cubic-bezier(0.4, 0.0, 0.2, 1)"};r._x_transition={in(p=()=>{},x=()=>{}){i&&(r.hidden=!1),i&&(r.style.display=null);let w=r.getBoundingClientRect().height;r.style.height="auto";let h=r.getBoundingClientRect().height;w===h&&(w=s),t.transition(r,t.setStyles,{during:l,start:{height:w+"px"},end:{height:h+"px"}},()=>r._x_isShown=!0,()=>{Math.abs(r.getBoundingClientRect().height-h)<1&&(r.style.overflow=null)})},out(p=()=>{},x=()=>{}){let w=r.getBoundingClientRect().height;t.transition(r,n,{during:l,start:{height:w+"px"},end:{height:s+"px"}},()=>r.style.overflow="hidden",()=>{r._x_isShown=!1,r.style.height==`${s}px`&&i&&(r.style.display="none",r.hidden=!0)})}}}}function Si(t,e,r){if(t.indexOf(e)===-1)return r;let a=t[t.indexOf(e)+1];if(!a)return r;if(e==="duration"){let o=a.match(/([0-9]+)ms/);if(o)return o[1]}if(e==="min"){let o=a.match(/([0-9]+)px/);if(o)return o[1]}return a}var vi=nu;var Ct={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var wi=([t,e,r])=>{let a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(o=>{a.setAttribute(o,String(e[o]))}),r?.length&&r.forEach(o=>{let s=wi(o);a.appendChild(s)}),a},yi=(t,e={})=>{let r="svg",a={...Ct,...e};return wi([r,a,t])};var Ci=t=>{for(let e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var Ai=(...t)=>t.filter((e,r,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===r).join(" ").trim();var Ei=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase());var Mi=t=>{let e=Ei(t);return e.charAt(0).toUpperCase()+e.slice(1)};var lu=t=>Array.from(t.attributes).reduce((e,r)=>(e[r.name]=r.value,e),{}),Li=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",la=(t,{nameAttr:e,icons:r,attrs:a})=>{let o=t.getAttribute(e);if(o==null)return;let s=Mi(o),i=r[s];if(!i)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let n=lu(t),l=Ci(n)?{}:{"aria-hidden":"true"},p={...Ct,"data-lucide":o,...l,...a,...n},x=Li(n),w=Li(a),h=Ai("lucide",`lucide-${o}`,...x,...w);h&&Object.assign(p,{class:h});let y=yi(i,p);return t.parentNode?.replaceChild(y,t)};var fa=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var ua=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var da=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];var ca=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];var pa=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];var ma=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];var ha=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]];var xa=[["path",{d:"M10 12h4"}],["path",{d:"M10 8h4"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"}]];var ga=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];var At=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];var Et=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83"}]];var ba=[["path",{d:"m15 18-6-6 6-6"}]];var Sa=[["path",{d:"m9 18 6-6-6-6"}]];var Mt=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];var Lt=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];var Pt=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];var va=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m9 14 2 2 4-4"}]];var wa=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var Tt=[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]];var ya=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var Ca=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];var Aa=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var Ea=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m9 15 2 2 4-4"}]];var Ma=[["path",{d:"M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1"}],["path",{d:"M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"}],["path",{d:"M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"}]];var La=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];var Pa=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];var Ta=[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3"}]];var _a=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var Ra=[["path",{d:"M15 6a9 9 0 0 0-9 9V3"}],["circle",{cx:"18",cy:"6",r:"3"}],["circle",{cx:"6",cy:"18",r:"3"}]];var ka=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var Fa=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{d:"M22 10v6"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]];var Ba=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"}],["path",{d:"m21 3 1 11h-2"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"}],["path",{d:"M3 4h8"}]];var qa=[["path",{d:"M10 16h.01"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["path",{d:"M21.946 12.013H2.054"}],["path",{d:"M6 16h.01"}]];var _t=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var Da=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var Oa=[["path",{d:"M10 18v-7"}],["path",{d:"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"}],["path",{d:"M14 18v-7"}],["path",{d:"M18 18v-7"}],["path",{d:"M3 22h18"}],["path",{d:"M6 18v-7"}]];var Rt=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var Ha=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]];var Ia=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var Ua=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];var Va=[["path",{d:"M11 5h10"}],["path",{d:"M11 12h10"}],["path",{d:"M11 19h10"}],["path",{d:"M4 4h1v5"}],["path",{d:"M4 9h2"}],["path",{d:"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"}]];var Na=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];var Wa=[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]];var za=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var $a=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];var Ga=[["path",{d:"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"}],["path",{d:"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"}],["path",{d:"M8 6v8"}]];var ja=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];var Ka=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];var Xa=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var kt=[["path",{d:"M12 16h.01"}],["path",{d:"M12 8v4"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"}]];var Za=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];var Ja=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Qa=[["path",{d:"M2 3h20"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"}],["path",{d:"m7 21 5-5 5 5"}]];var Ya=[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"}]];var eo=[["path",{d:"M12 3v18"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7"}],["path",{d:"M7 21h10"}]];var to=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var ro=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ao=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]];var oo=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var so=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var Ft=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var io=[["path",{d:"M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"}],["path",{d:"M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"}],["circle",{cx:"10.5",cy:"6.5",r:".5",fill:"currentColor"}]];var no=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];var Me=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var lo=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var fo=[["path",{d:"m16 11 2 2 4-4"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}]];var uo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var co=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var po=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2"}]];var mo=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var ho=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];var xo=({icons:t={},nameAttr:e="data-lucide",attrs:r={},root:a=document,inTemplates:o}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof a>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(a.querySelectorAll(`[${e}]`)).forEach(i=>la(i,{nameAttr:e,icons:t,attrs:r})),o&&Array.from(a.querySelectorAll("template")).forEach(n=>xo({icons:t,nameAttr:e,attrs:r,root:n.content,inTemplates:o})),e==="data-lucide"){let i=a.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach(n=>la(n,{nameAttr:"icon-name",icons:t,attrs:r})))}};var fu={AlertCircle:Mt,AlertTriangle:Me,Archive:fa,ArrowRight:ua,Award:da,BarChart3:At,Bell:ca,BookOpen:pa,Bot:ma,Briefcase:ha,Building2:xa,CalendarDays:ga,ChevronLeft:ba,ChevronRight:Sa,CircleCheck:Lt,CircleX:Pt,ClipboardCheck:va,Clock:wa,Code2:Tt,Coins:ya,Cpu:Ca,Download:Aa,FileCheck:Ea,FileStack:Ma,FileText:La,FolderOpen:Pa,FolderTree:Ta,Gauge:_a,GitBranch:Ra,Globe:ka,GraduationCap:Fa,HardDrive:qa,Handshake:Ba,Home:_t,Info:Da,Landmark:Oa,Layers:Rt,LayoutDashboard:Ha,LayoutGrid:Ia,Lightbulb:Ua,ListOrdered:Va,ListTodo:Na,Lock:za,LockKeyhole:Wa,LogOut:$a,Megaphone:Ga,Menu:ja,MessageSquare:Ka,Monitor:Xa,OctagonAlert:kt,Package:Za,Palette:Ja,PieChart:Et,Presentation:Qa,Rocket:Ya,Scale:eo,Search:to,Settings:ro,Shield:so,ShieldAlert:ao,ShieldCheck:oo,Sparkles:Ft,Tags:io,Terminal:no,TriangleAlert:Me,Upload:lo,User:uo,UserCheck:fo,Users:co,Video:po,Wrench:mo,Zap:ho};function Le(t=document){xo({icons:fu,root:t})}window.Alpine=yt;yt.plugin(vi);yt.start();window.refreshLucideIcons=()=>Le();document.addEventListener("turbo:load",()=>Le());document.addEventListener("turbo:frame-render",()=>Le());document.addEventListener("DOMContentLoaded",()=>Le());document.readyState!=="loading"&&Le();})();
/*! Bundled license information:

@hotwired/turbo/dist/turbo.es2017-esm.js:
  (*!
  Turbo 8.0.13
  Copyright © 2025 37signals LLC
   *)

lucide/dist/esm/defaultAttributes.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/createElement.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/replaceElement.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/archive.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/arrow-right.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/award.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/bell.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/book-open.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/bot.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/briefcase.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/building-2.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/calendar-days.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/chart-column.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/chart-pie.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/chevron-left.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/chevron-right.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/circle-alert.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/circle-check.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/circle-x.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/clipboard-check.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/clock.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/code-xml.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/coins.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/cpu.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/download.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/file-check.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/file-stack.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/file-text.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/folder-open.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/folder-tree.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/gauge.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/git-branch.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/globe.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/graduation-cap.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/handshake.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/hard-drive.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/house.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/info.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/landmark.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/layers.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/layout-dashboard.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/layout-grid.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/lightbulb.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/list-ordered.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/list-todo.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/lock-keyhole.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/lock.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/log-out.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/megaphone.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/menu.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/message-square.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/monitor.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/octagon-alert.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/package.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/palette.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/presentation.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/rocket.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/scale.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/search.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/settings.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/shield-alert.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/shield-check.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/shield.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/sparkles.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/tags.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/terminal.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/triangle-alert.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/upload.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/user-check.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/user.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/users.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/video.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/wrench.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/zap.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.16.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
 */

(function() {
  function renderShowcase() {
    var dataEl = document.getElementById('showcase-data');
    if (!dataEl) return;
    var root = document.getElementById('showcase-root');
    if (!root) return;
    var nav = document.getElementById('showcase-nav');

    var config;
    try {
      config = JSON.parse(dataEl.value);
    } catch (e) {
      root.innerHTML = '<h2 class="showcase-h">展示数据格式有误</h2>';
      return;
    }
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      root.innerHTML = '<h2 class="showcase-h">展示数据格式有误</h2>';
      return;
    }

    var cdnPrefix = (dataEl.getAttribute('data-cdn-prefix') || '').replace(/\/$/, '');

    function createShowcaseImage(imagePath, title, fallbackParent) {
      var rawPath = String(imagePath || '').trim();
      if (!rawPath) return null;

      var isAbsolute = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(rawPath);
      var localPath = rawPath;
      var primaryPath = rawPath;
      if (!isAbsolute && cdnPrefix) {
        primaryPath = cdnPrefix + (rawPath.charAt(0) === '/' ? rawPath : '/' + rawPath);
      }

      var img = document.createElement('img');
      var fallbackAttempted = false;
      img.src = primaryPath;
      img.alt = title || '';
      img.onerror = function() {
        if (!isAbsolute && cdnPrefix && !fallbackAttempted) {
          fallbackAttempted = true;
          this.src = localPath;
          return;
        }
        this.onerror = null;
        this.style.display = 'none';
        fallbackParent.classList.add('no-image');
      };
      return img;
    }

    function renderShowcaseContent(contentConfig) {
      root.innerHTML = '';

      if (Array.isArray(contentConfig.intro) && contentConfig.intro.length > 0) {
        var h = document.createElement('h2');
        h.className = 'showcase-h showcase-intro';
        h.textContent = '写在前面';
        root.appendChild(h);
        contentConfig.intro.forEach(function(p) {
          var pe = document.createElement('p');
          pe.className = 'showcase-p';
          pe.textContent = p;
          root.appendChild(pe);
        });
      }

      var sections = Array.isArray(contentConfig.sections) ? contentConfig.sections : [];
      sections.forEach(function(section) {
        if (!section || typeof section !== 'object') return;
        var heading = document.createElement('h2');
        heading.className = 'showcase-h';
        heading.textContent = section.title || '';
        root.appendChild(heading);

        var body = document.createElement('div');
        body.className = 'showcase-body';

        var cards = Array.isArray(section.cards) ? section.cards : [];
        cards.forEach(function(card) {
          if (!card || typeof card !== 'object') return;
          var allowedModes = ['text-only', 'icon-simple', 'app-card', 'product-card'];
          var mode = allowedModes.indexOf(card.imageMode) >= 0 ? card.imageMode : 'text-only';
          var hasLink = typeof card.link === 'string' && card.link.trim() !== '';
          var w = document.createElement(hasLink ? 'a' : 'div');
          if (hasLink) { w.href = card.link; w.target = '_blank'; w.rel = 'noopener noreferrer'; }
          w.className = 'showcase-' + mode;

          if (mode === 'icon-simple' || mode === 'app-card') {
            var avatar = document.createElement('div');
            avatar.className = 'showcase-avatar' + (card.image ? '' : ' no-image');
            avatar.setAttribute('data-initial', (card.title || '?')[0]);
            if (card.image) {
              var avatarImage = createShowcaseImage(card.image, card.title, avatar);
              if (avatarImage) avatar.appendChild(avatarImage);
            }
            w.appendChild(avatar);
          }

          if (mode === 'product-card') {
            var li = document.createElement('div');
            li.className = 'showcase-large-image' + (card.image ? '' : ' no-image');
            li.setAttribute('data-title', (card.title || '?')[0]);
            if (card.image) {
              var productImage = createShowcaseImage(card.image, card.title, li);
              if (productImage) li.appendChild(productImage);
            }
            w.appendChild(li);
          }

          var info = document.createElement('div');
          info.className = 'showcase-info';

          var titleEl = document.createElement('h3');
          titleEl.textContent = card.title || '';
          info.appendChild(titleEl);

          if (Array.isArray(card.specs)) {
            var specWrap = document.createElement('div');
            specWrap.className = 'showcase-specs';
            card.specs.forEach(function(s) {
              var span = document.createElement('span');
              span.className = 'showcase-spec';
              span.textContent = s;
              specWrap.appendChild(span);
            });
            info.appendChild(specWrap);
          }

          if (card.description) {
            var desc = document.createElement('p');
            desc.textContent = card.description;
            info.appendChild(desc);
          }

          w.appendChild(info);
          body.appendChild(w);
        });

        root.appendChild(body);
      });

      if (sections.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'showcase-p showcase-empty';
        empty.textContent = '暂无展示内容';
        root.appendChild(empty);
      }

      if (contentConfig.showFooter) {
        var footer = document.createElement('section');
        footer.className = 'article-copy';
        ['名称：睿屿青衫', '网址：https://www.reashal.com', '描述：希望我们能在前行的路上久别重逢'].forEach(function(t) {
          var d = document.createElement('div');
          d.textContent = t;
          footer.appendChild(d);
        });
        root.appendChild(footer);
      }
    }

    var tabs = Array.isArray(config.tabs) ? config.tabs.filter(function(tab) {
      return tab && typeof tab === 'object' && typeof tab.id === 'string' && tab.id.trim() !== '';
    }) : [];

    if (!nav || tabs.length === 0) {
      if (nav) nav.hidden = true;
      renderShowcaseContent(config);
      return;
    }

    nav.hidden = false;
    nav.innerHTML = '';
    var storageKey = 'showcase-active-tab:' + window.location.pathname;
    var activeId = '';
    try { activeId = window.sessionStorage.getItem(storageKey) || ''; } catch (e) {}
    if (!tabs.some(function(tab) { return tab.id === activeId; })) activeId = config.defaultTab || '';
    if (!tabs.some(function(tab) { return tab.id === activeId; })) activeId = tabs[0].id;

    var buttons = [];

    function selectTab(tabId, remember) {
      var selectedIndex = tabs.findIndex(function(tab) { return tab.id === tabId; });
      if (selectedIndex < 0) selectedIndex = 0;
      activeId = tabs[selectedIndex].id;

      buttons.forEach(function(button, index) {
        var selected = index === selectedIndex;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-selected', selected ? 'true' : 'false');
        button.tabIndex = selected ? 0 : -1;
      });

      root.setAttribute('aria-labelledby', buttons[selectedIndex].id);
      renderShowcaseContent(tabs[selectedIndex]);
      if (remember) {
        try { window.sessionStorage.setItem(storageKey, activeId); } catch (e) {}
      }
    }

    tabs.forEach(function(tab, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.id = 'showcase-tab-' + index;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', 'showcase-root');

      if (tab.icon) {
        var icon = document.createElement('i');
        icon.className = 'iconfont ' + tab.icon;
        icon.setAttribute('aria-hidden', 'true');
        button.appendChild(icon);
      }

      var label = document.createElement('span');
      label.textContent = tab.title || tab.id;
      button.appendChild(label);
      button.addEventListener('click', function() { selectTab(tab.id, true); });
      button.addEventListener('keydown', function(event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        buttons[nextIndex].focus();
        selectTab(tabs[nextIndex].id, true);
      });
      buttons.push(button);
      nav.appendChild(button);
    });

    selectTab(activeId, false);
  }

  renderShowcase();
  document.addEventListener('turbo:load', renderShowcase);
  document.addEventListener('turbolinks:load', renderShowcase);
})();
