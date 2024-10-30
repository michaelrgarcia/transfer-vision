/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={134:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const o=e=>{const t=(e=e.trim()).match("[0-9.]+");let n,o="ms";const r=t?t[0]:"";return r&&(o=e.split(r)[1],n=Number(r)),{num:n,unit:o}},r=function(e){const t=function(e){const t=t=>{return window.getComputedStyle(e).getPropertyValue(t)||e.style[(n=t,n.replace(/-([a-z])/g,(e=>e[1].toUpperCase())))];var n},n=t("transition-delay")||"0ms",r=t("transition-duration")||"0ms",i=Array.isArray(r)?r:[r],c=Array.isArray(n)?n:[n];let s,a=0;return i.push.apply(i,c),i.forEach((e=>{e.split(",").forEach((e=>{e=(e=>{const t=o(e),n=t?t.num:void 0;if(!n)return"";let r=n;return"s"===e.replace(n+"","")&&(r=1e3*n),r+"ms"})(e),s=o(e),s.num&&s.num>a&&(a=s.num)}))})),a}(e);return new Promise((n=>{t>0?setTimeout((()=>{n(e)}),t):n(e)}))}},365:(e,t,n)=>{n.r(t),n.d(t,{addToggleListener:()=>l,removeToggleListener:()=>d});var o=n(721),r=n(284);const i=document.querySelector(".cids > input");function c(e){for(let t=0;t<e.length;){const n=e[t];if(n.result&&c(n.result))return!0;if(Array.isArray(n)&&c(n))return!0;if(n&&n.prefix&&n.courseNumber&&n.courseTitle&&n.cid)return!0;t+=1}return!1}function s(){document.querySelectorAll(".cid").forEach((e=>{e.style.display="inline"}))}async function a(e,t,n,a){const l=t.articulations;if(i.checked)if(c(l))s();else{const i=await async function(e,t){const n=`https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/get-cids/${e}`;(0,o.disableCidSection)();const r=await fetch(n,{body:JSON.stringify(t),method:"POST",headers:{"Content-Type":"application/json"}});let i;return 200===r.status&&(i=await r.json(),(0,o.enableCidSection)()),i}(e,l);document.querySelector(".articulations").replaceChildren(),(0,r.createListFromDb)(i,n,a),t.articulations=i,s()}else document.querySelectorAll(".cid").forEach((e=>{e.style.display="none"}));return l}function l(e,t,n,o){const r={articulations:t},c=async()=>a(e,r,n,o);return i.addEventListener("change",c),c}function d(e){i.removeEventListener("change",e)}},721:(e,t,n)=>{n.r(t),n.d(t,{applyDisabledState:()=>g,closeDialog:()=>p,disableCidSection:()=>$,enableCidSection:()=>A,hideBackButton:()=>f,hideCidSlider:()=>q,hideLoadingContainer:()=>L,hideLoadingText:()=>m,hideResults:()=>E,hideSplash:()=>C,removeDisabledState:()=>v,showCidSlider:()=>j,showDialog:()=>y,showLoadingText:()=>h,showRandomLoadingGif:()=>x,showResults:()=>w,showSplash:()=>D,startLoading:()=>b,stopLoading:()=>S});var o=n(134),r=n(305);const i=document.querySelector("dialog"),c=document.querySelector("form"),s=document.querySelector("img.loading-gif"),a=document.querySelector(".results"),l=document.querySelector(".loading-container"),d=document.querySelector(".back"),u=document.querySelector(".cid-section");function f(){d.style.opacity=0,(0,o.default)(d).then((async()=>{d.style.display="none"}))}function y(){i.showModal(),i.style.opacity=1}function p(){const e=i.querySelector(".cid-second-line");e&&i.removeChild(e),i.style.height="100px",i.style.opacity=0,i.close()}function h(e){const t=e;t.style.opacity=1,t.style.display="block"}function m(e){const t=e;t.style.opacity=0,t.style.display="none"}function g(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}function v(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}function b(e,t){g(e),h(t)}function S(e,t){v(e),m(t)}function C(){c.style.opacity=0,(0,o.default)(c).then((()=>{c.style.display="none"}))}async function x(){(0,o.default)(c).then((async()=>{await(0,r.getRandomLoadingGif)(s),s.style.display="block",s.style.opacity=1}))}function w(){(0,o.default)(c).then((()=>{a.style.opacity=1,l.style.opacity=1,l.style.display="flex",d.style.opacity=1,d.style.display="block"})),a.style.display="flex"}function L(){l.style.opacity=0,(0,o.default)(l).then((()=>{l.style.display="none"}))}function q(){u.style.opacity=0,(0,o.default)(u).then((()=>{u.style.display="none"}))}function E(){a.style.opacity="0",(0,o.default)(a).then((()=>{a.style.display="none"}))}function D(){(0,o.default)(a).then((()=>{c.style.opacity=1})),(0,o.default)(c).then((()=>{c.style.display="flex"}))}function j(){(0,o.default)(l).then((()=>{u.style.opacity=1})),u.style.display="flex"}function $(){const e=document.querySelector(".cid-section"),t=e.querySelector(".cids"),n=e.querySelector(".cids > input"),o=t.querySelectorAll("*");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}function A(){const e=document.querySelector(".cid-section"),t=e.querySelector(".cids"),n=e.querySelector(".cids > input"),o=t.querySelectorAll("*");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}},32:(e,t,n)=>{function o(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=e,t&&n&&o.setAttribute(`data-${n}`,t),o}function r(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=t,o.setAttribute("data-id",n),o}function i(e){const t=document.createElement("option");return t.textContent=`Select a ${e}`,t.value="",t.disabled=!0,t.selected=!0,t}function c(){const e=document.querySelector(".articulations"),t=document.createElement("div");return t.classList.add("class-list"),t.style.display="flex",t.style.opacity="1",e.append(t),t}function s(e,t,n){const o=document.createElement("a");o.href=n,o.target="_blank",o.textContent=t,e.append(o)}function a(e,t){const n=document.createElement("p");return n.textContent=e,t.appendChild(n),n}function l(e,t){const n=document.createElement("p");n.classList.add("connector"),n.textContent=e,t.appendChild(n)}function d(e,t){const n=document.createElement("p");n.classList.add("conjunction"),n.textContent=e,t.appendChild(n)}function u(e){const t=document.createElement("p");t.classList.add("no-articulations"),t.textContent="No articulations found.",e.appendChild(t),t.style.opacity=1}function f(){document.querySelector("dialog").querySelector("p").textContent="Data may be processing. Try again shortly."}function y(){document.querySelector("dialog").querySelector("p").textContent="Failed to complete search. Try again shortly."}function p(e){const t=document.createElement("span");return t.classList.add("cid"),t.textContent=`(${e})`,t}function h(){const e=document.querySelector("dialog");e.querySelector("p").textContent="C-IDs (course identification numbers) make it easy to identify equivalent courses across California Community Colleges.";const t=document.createElement("div");t.classList.add("cid-second-line");const n=document.createElement("p");n.textContent="Some C-IDs may not be visible due to inconsistencies in data. All available data can be found on the ";const o=document.createElement("a");o.textContent="C-ID website.",o.href="https://c-id.net",o.target="_blank",n.appendChild(o),t.appendChild(n),e.appendChild(t),e.style.height="250px"}n.r(t),n.d(t,{cacheFinalizeError:()=>y,cid:()=>p,cidPrompt:()=>h,classListHeader:()=>s,classListMainDiv:()=>c,conjunction:()=>d,connector:()=>l,course:()=>a,defaultOption:()=>i,lowerDivOption:()=>r,noArticulations:()=>u,processingPrompt:()=>f,selectOption:()=>o})},156:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=n(284),i=n(353),c=n(721),s=n(305),a=n(365),l=n(32),d=document.getElementById("four-year"),u=document.getElementById("major"),f=document.getElementById("class"),y=document.getElementById("academic-year"),p=document.querySelectorAll("select"),h=document.querySelector(".submit"),m=document.querySelector(".back"),g=document.querySelector(".close-dialog"),v=document.querySelector(".cid-info");document.addEventListener("DOMContentLoaded",(()=>o(void 0,void 0,void 0,(function*(){for(let e=2;e<p.length;)p[e].parentNode&&((0,c.applyDisabledState)(p[e].parentNode),e+=1);(0,c.applyDisabledState)(h.parentNode),(0,i.renderFourYears)(d),yield(0,c.showRandomLoadingGif)()})))),y.addEventListener("input",(()=>{const e=y.options[y.selectedIndex].value,t=d.options[d.selectedIndex],n=t.dataset.sending;u.replaceChildren(),f.replaceChildren(),t.value&&(0,i.renderMajorData)(u,Number(n),Number(e)),(0,c.applyDisabledState)(u.parentNode),(0,c.applyDisabledState)(f.parentNode),(0,c.applyDisabledState)(h.parentNode)})),d.addEventListener("input",(()=>{const e=y.options[y.selectedIndex].value,t=d.options[d.selectedIndex].dataset.sending;(0,i.renderMajorData)(u,Number(t),Number(e)),u.replaceChildren(),f.replaceChildren(),(0,c.applyDisabledState)(f.parentNode),(0,c.applyDisabledState)(h.parentNode)})),u.addEventListener("input",(()=>{const e=y.options[y.selectedIndex].value,t=d.options[d.selectedIndex].dataset.sending,n=u.options[u.selectedIndex].dataset.key;f.replaceChildren(),(0,i.renderLowerDivs)(f,Number(t),n,Number(e)),(0,c.applyDisabledState)(h.parentNode)})),f.addEventListener("change",(()=>{(0,c.removeDisabledState)(h.parentNode)})),h.addEventListener("click",(e=>o(void 0,void 0,void 0,(function*(){const t=y.options[y.selectedIndex].value,n=d.options[d.selectedIndex].dataset.sending,o=u.options[u.selectedIndex].dataset.key,i=f.options[f.selectedIndex],l=i.dataset.id;if((0,c.applyDisabledState)(h.parentNode),f.value){const e=yield(0,r.getArticulationParams)(Number(n),o,Number(t)),d=`${l}_${t}`;if((0,c.hideSplash)(),i){(0,s.changeSelectedClassTxt)(i.textContent);const n=yield(0,r.getArticulationData)(e,l,Number(t)),{articulations:o,updateProgress:c}=n,u=(0,a.addToggleListener)(d,o,e.length,c);(0,s.addBackBtnListener)(a.removeToggleListener,u)}}e.preventDefault()})))),g.addEventListener("click",(()=>{(0,c.closeDialog)()})),v.addEventListener("click",(()=>{(0,l.cidPrompt)(),(0,c.showDialog)()})),m.addEventListener("click",(()=>{(0,c.removeDisabledState)(h.parentNode)}))},130:(e,t)=>{function n(e){return!("string"!=typeof e.prefix||"string"!=typeof e.courseNumber||"string"!=typeof e.courseTitle||void 0!==e.courseId&&"number"!=typeof e.courseId||void 0!==e.cid&&"string"!=typeof e.cid)}function o(e){return"string"==typeof e.seriesId}function r(e){return!("string"!=typeof e&&!n(e)&&!o(e))}function i(e){return!(!n(e)&&"string"!=typeof e)}function c(e){return!(!Array.isArray(e)||!e.every(i))}Object.defineProperty(t,"__esModule",{value:!0}),t.isLowerDiv=n,t.isSeriesIdObject=o,t.isUnfilteredSeries=function(e){return!(!Array.isArray(e)||!e.every(r))},t.isSeries=c,t.isArticulation=function(e){return!(!n(e)&&!c(e))}},284:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getArticulationParams=function(e,t,n){return o(this,void 0,void 0,(function*(){const o=[];return(yield(0,i.getCommunityColleges)()).forEach((r=>{if(r.id){const i=r.id,c=`https://assist.org/api/articulation/Agreements?Key=${n}/${i}/to/${e}/Major/${t}`,s=`https://assist.org/transfer/results?year=${n}&institution=${i}&agreement=${e}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${n}/${i}/to/${e}/Major/${t}`;o.push({link:c,agreementLink:s})}})),o}))},t.createListFromDb=d,t.getArticulationData=function(e,t,n){return o(this,void 0,void 0,(function*(){const i=`${t}_${n}`,u=e.slice(),f=new AbortController,{signal:y,isAborted:p}=(0,s.abortHandler)(f),h=(0,s.createProgressTracker)(e.length);let m;window.addEventListener("beforeunload",(()=>f.abort())),(0,c.showResults)(),h(0);try{m=yield function(e,t,n){return o(this,void 0,void 0,(function*(){try{const o=yield fetch(`https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/get-course/${e}`);if(200===o.status){const e=yield o.json();return d(e,t,n),e}if(204===o.status)return console.log("restarting incomplete caching job..."),!1;if(206===o.status)return(0,c.hideLoadingContainer)(),(0,a.processingPrompt)(),(0,c.showDialog)(),!0}catch(e){console.error("error getting class from db",e)}return!1}))}(i,e.length,h),m||(m=yield l(u,y,t,h,n),(0,c.hideLoadingContainer)(),p||(yield function(e,t){return o(this,void 0,void 0,(function*(){if(t){(0,r.organizeArticulations)();try{yield fetch("https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/complete-cache",{body:JSON.stringify({fullCourseId:e}),method:"POST",headers:{"Content-Type":"application/json"}}),(0,c.showCidSlider)()}catch(e){console.error(`error finalizing cache job: ${e}`),(0,a.cacheFinalizeError)()}}}))}(i,m)))}catch(e){"AbortError"===e.name?console.log("requests aborted due to page unload"):console.error("error processing requests",e)}finally{window.removeEventListener("beforeunload",(()=>f.abort()))}return{articulations:m,updateProgress:h}}))};const r=n(353),i=n(836),c=n(721),s=n(305),a=n(32);function l(e,t,n,i,c){return o(this,arguments,void 0,(function*(e,t,n,i,c,s=[]){let a;if(0===e.length)return s;a=e.length<29?e.splice(0,e.length-1):e.splice(0,29);try{const d=yield function(e,t,n,i,c){return o(this,void 0,void 0,(function*(){let s;try{const a=JSON.stringify(e),l=`https://nxumffe33mx27f7njbxyq4qwwi0birlz.lambda-url.us-east-2.on.aws/?courseId=${n}&year=${i}`,d=yield fetch(l,{body:a,method:"POST",headers:{"Content-Type":"application/json",Connection:"keep-alive"},signal:t});s=yield function(e,t){return o(this,void 0,void 0,(function*(){const n=e.getReader(),o=new TextDecoder("utf-8"),i=[];let c="";for(;;){const{value:e,done:s}=yield n.read();if(s)break;c+=o.decode(e,{stream:!0});let a=c.indexOf("\n");for(;-1!==a;){const e=c.slice(0,a);c=c.slice(a+1);try{const n=JSON.parse(e);n.result&&((0,r.createClassLists)(n),i.push(n)),t(1)}catch(e){console.error(`error parsing articulation: ${e}`)}a=c.indexOf("\n")}}return i}))}(d.body,c)}catch(e){console.error(`error processing stream: ${e}`)}return s}))}(a,t,n,c,i);return s.push(...d),yield l(e,t,n,i,c,s)}catch(e){"AbortError"===e.name?console.log("aborted request"):console.error("error processing chunk:",e)}}))}function d(e,t,n){for(let t=0;t<e.length;){const n=e[t];n&&(0,r.createClassLists)(n),t+=1}n(t),(0,c.hideLoadingContainer)(),(0,c.showCidSlider)()}},836:function(e,t){var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getCommunityColleges=function(){return n(this,void 0,void 0,(function*(){let e;try{const t=`${o}/community-colleges`;e=yield r(t)}catch(e){console.error("error retrieving community colleges:",e)}return e}))},t.getFourYears=function(){return n(this,void 0,void 0,(function*(){let e;try{const t=`${o}/four-years`;e=yield r(t)}catch(e){console.error("error retrieving four years:",e)}return e}))},t.getMajorData=function(e,t){return n(this,void 0,void 0,(function*(){let n;try{const r=`${o}/major-data/${e}/${t}`,i=yield fetch(r),c=yield i.json();n=Object.values(c)}catch(t){console.error(`Error fetching majors for ${e}:`,t)}return n}))},t.getLowerDivs=function(e,t,r){return n(this,void 0,void 0,(function*(){let i;try{const c=yield function(e,t,r){return n(this,void 0,void 0,(function*(){let n;try{const i=`${o}/lower-divs/${r}/6/${e}/${t}`,c=yield fetch(i),s=yield c.json();n=Object.values(s)}catch(e){console.log("error fetching lower divs:",e)}return n}))}(e,t,r);i=c}catch(e){console.error("error retrieving lower divs:",e)}return i}))};const o=" https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/schools";function r(e){return n(this,void 0,void 0,(function*(){let t;try{const n=yield fetch(e),o=yield n.json();t=Object.values(o)}catch(e){console.error("error fetching school data:",e)}return t}))}},353:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.renderFourYears=function(e){return o(this,void 0,void 0,(function*(){const t=e.parentNode,n=t.querySelector(".loading");(0,i.showDialog)(),(0,i.startLoading)(t,n);const o=yield(0,c.getFourYears)(),s=(0,r.defaultOption)("school");e.appendChild(s),o.forEach((t=>{if(t.id<200){const n=(0,r.selectOption)(t.name,t.id,"sending");e.appendChild(n)}})),(0,i.closeDialog)(),(0,i.stopLoading)(t,n)}))},t.renderMajorData=function(e,t,n){return o(this,void 0,void 0,(function*(){const o=e.parentElement,s=o.querySelector(".loading");(0,i.startLoading)(o,s);const a=yield(0,c.getMajorData)(t,n),l=(0,r.defaultOption)("major");e.replaceChildren(),e.appendChild(l),a.forEach((t=>{const n=(0,r.selectOption)(t.major,t.key,"key");e.appendChild(n)})),(0,i.stopLoading)(o,s)}))},t.getClassName=l,t.getId=d,t.renderLowerDivs=function(e,t,n,s){return o(this,void 0,void 0,(function*(){const o=e.parentNode,a=o.querySelector(".loading");(0,i.startLoading)(o,a);const u=yield(0,c.getLowerDivs)(t,n,s);console.log(u);const f=(0,r.defaultOption)("class");e.replaceChildren(),e.appendChild(f),u.forEach(((t,n)=>{const o=l(t),i=d(t),c=(0,r.lowerDivOption)(o,n,i);e.appendChild(c)})),(0,i.stopLoading)(o,a)}))},t.organizeArticulations=function(){const e=document.querySelector(".articulations"),t=document.querySelectorAll(".class-list"),n=Array.from(t);0===t.length?(0,r.noArticulations)(e):(n.sort(((e,t)=>{const n=e.querySelector("button"),o=t.querySelector("button");return n&&o?n.textContent.localeCompare(o.textContent):0})),n.forEach((t=>{e.appendChild(t)})))},t.createClassLists=function(e){if(e&&e.result){const{result:t}=e,n=[];let o="",i="";for(let e=0;e<t.length;){const c=t[e];if(c&&("object"==typeof c&&"ccName"in c?o=c.ccName:"object"==typeof c&&"agreementLink"in c?i=c.agreementLink:("string"==typeof c||(0,a.isArticulation)(c))&&n.push(c),o&&i)){const e=(0,r.classListMainDiv)();(0,r.classListHeader)(e,o,i),u(n,e)}e+=1}}};const r=n(32),i=n(721),c=n(836),s=n(305),a=n(130);function l(e){let t="";return(0,a.isLowerDiv)(e)?t=`${e.prefix} ${e.courseNumber} - ${e.courseTitle}`:(0,a.isUnfilteredSeries)(e)&&(t=function(e){const t=e.slice(),n=(0,s.filterSeries)(t);let o="";return n.forEach(((e,t)=>{let r;if((0,a.isLowerDiv)(e)){const{prefix:t,courseNumber:n}=e;o+=`${t} ${n}`}else"string"==typeof e&&(r=e.toLowerCase(),o+=r);t<n.length-1&&(o+=" ")})),o}(e)),t}function d(e){let t;if((0,a.isLowerDiv)(e))t=e.courseId;else if((0,a.isUnfilteredSeries)(e))for(let n=0;n<e.length;n+=1){const o=e[n];(0,a.isSeriesIdObject)(o)&&(t=o.seriesId)}return t}function u(e,t){const n=((o=e).sort(((e,t)=>{if("string"==typeof e)return 0;if("string"==typeof t)return 0;if("prefix"in e&&"prefix"in t){const n=e.prefix.localeCompare(t.prefix);if(0!==n)return n}if("courseNumber"in e&&"courseNumber"in t){const n=e.courseNumber.localeCompare(t.courseNumber);if(0!==n)return n}return 0})),o);var o;for(let e=0;e<n.length;){const o=n[e];if((0,a.isSeries)(o))u(o,t);else if("string"==typeof o)"and"===o.toLowerCase()?(0,r.connector)(o,t):"or"===o.toLowerCase()&&(0,r.conjunction)(o,t);else if((0,a.isLowerDiv)(o)){const e=`${o.prefix} ${o.courseNumber} - ${o.courseTitle}`,n=(0,r.course)(e,t);if(o.cid){const e=(0,r.cid)(o.cid);n.appendChild(e)}}e+=1}}},305:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((o=o.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getRandomLoadingGif=function(e){return o(this,void 0,void 0,(function*(){const t=yield fetch("https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",{mode:"cors"}),n=yield t.json();try{n&&(e.src=n.data.images.original.url)}catch(e){console.log(e)}}))},t.updateProgressTracker=a,t.createProgressTracker=function(e){let t=0;return n=>{t+=n,a(t,e)}},t.changeSelectedClassTxt=function(e){document.querySelector(".selected-class").textContent=`Articulations for: ${e}`},t.resetResults=l,t.filterSeries=function(e){for(let t=0;t<e.length;){const n=e[t];(0,s.isSeriesIdObject)(n)&&e.splice(t,1),t+=1}return e},t.abortHandler=function(e){const t=document.querySelector(".back");let n=!1;return t.addEventListener("click",(()=>{n=!0,function(e){e.abort(),(0,c.hideCidSlider)(),(0,c.hideResults)(),(0,c.hideBackButton)(),(0,c.showSplash)(),l()}(e)})),{signal:e.signal,isAborted:n}},t.addBackBtnListener=function(e,t){function n(){e(t),function(e){document.querySelector(".back").removeEventListener("click",e)}(n)}return document.querySelector(".back").addEventListener("click",n),n};const i=r(n(134)),c=n(721),s=n(130);function a(e,t){document.querySelector(".progress-tracker").textContent=`${e} out of ${t} colleges searched`}function l(){const e=document.querySelector(".results"),t=document.querySelector(".progress-tracker"),n=document.querySelector(".selected-class"),o=document.querySelector(".articulations"),r=document.querySelector(".cids > input");(0,i.default)(e).then((()=>{o.replaceChildren(),t.textContent="",n.textContent="",r.checked=!1}))}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(156)})();
//# sourceMappingURL=main.js.map