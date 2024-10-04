/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={};function t(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=e,t&&n&&o.setAttribute(`data-${n}`,t),o}function n(e){const t=document.createElement("option");return t.textContent=`Select a ${e}`,t.value="",t.disabled=!0,t.selected=!0,t}function o(){const e=document.querySelector(".articulations"),t=document.createElement("div");return t.classList.add("class-list"),t.style.display="flex",t.style.opacity="1",e.append(t),t}function r(e,t,n){const o=document.createElement("a");o.href=n,o.target="_blank",o.textContent=t,e.append(o)}function c(e,t){const n=document.createElement("p");return n.textContent=e,t.appendChild(n),n}function s(e,t){const n=document.createElement("p");n.classList.add("connector"),n.textContent=e,t.appendChild(n)}function a(e,t){const n=document.createElement("p");n.classList.add("conjunction"),n.textContent=e,t.appendChild(n)}function i(e){const t=document.createElement("span");return t.classList.add("cid"),t.textContent=`(${e})`,t}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!t||!/^http(s?):/.test(t));)t=o[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p,e.p,e.p,e.p,e.p,e.p;const l=e=>{const t=(e=e.trim()).match("[0-9.]+");let n,o="ms";const r=t?t[0]:"";return r&&(o=e.split(r)[1],n=Number(r)),{num:n,unit:o}},u=function(e){const t=function(e){const t=t=>{return window.getComputedStyle(e).getPropertyValue(t)||e.style[(n=t,n.replace(/-([a-z])/g,(e=>e[1].toUpperCase())))];var n},n=t("transition-delay")||"0ms",o=t("transition-duration")||"0ms",r=Array.isArray(o)?o:[o],c=Array.isArray(n)?n:[n];let s,a=0;return r.push.apply(r,c),r.forEach((e=>{e.split(",").forEach((e=>{e=(e=>{const t=l(e),n=t?t.num:void 0;if(!n)return"";let o=n;return"s"===e.replace(n+"","")&&(o=1e3*n),o+"ms"})(e),s=l(e),s.num&&s.num>a&&(a=s.num)}))})),a}(e);return new Promise((n=>{t>0?setTimeout((()=>{n(e)}),t):n(e)}))};const d=document.querySelector("dialog"),y=document.querySelector("form"),p=document.querySelector("img.loading-gif"),f=document.querySelector(".results"),m=document.querySelector(".loading-container"),h=document.querySelector(".back"),g=document.querySelector(".cid-section");function b(){d.showModal(),d.style.opacity=1}function w(){const e=d.querySelector(".cid-second-line");e&&d.removeChild(e),d.style.height="100px",d.style.opacity=0,d.close()}function C(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}function S(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}function v(e,t){C(e),function(e){const t=e;t.style.opacity=1,t.style.display="block"}(t)}function x(e,t){S(e),function(e){const t=e;t.style.opacity=0,t.style.display="none"}(t)}function q(){m.style.opacity=0,u(m).then((()=>{m.style.display="none"}))}function E(){u(m).then((()=>{g.style.opacity=1})),g.style.display="flex"}const $=" https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/schools";async function A(e){let t;try{const n=await fetch(e),o=await n.json();t=Object.values(o)}catch(e){console.error("error fetching school data:",e)}return t}async function N(e,o,r){const c=e.parentElement,s=c.querySelector(".loading");v(c,s);const a=await async function(e,t){let n;try{const o=`${$}/major-data/${e}/${t}`,r=await fetch(o),c=await r.json();n=Object.values(c)}catch(t){console.error(`Error fetching majors for ${e}:`,t)}return n}(o,r),i=e,l=n("major");i.replaceChildren(),i.appendChild(l),a.forEach((e=>{const n=t(e.major,e.key,"key");i.appendChild(n)})),x(c,s)}async function k(e,t,o,r){const c=e.parentNode,s=c.querySelector(".loading");v(c,s);const a=await async function(e,t,n){let o;try{const r=await async function(e,t,n){let o;try{const r=`${$}/lower-divs/${n}/6/${e}/${t}`,c=await fetch(r),s=await c.json();o=Object.values(s)}catch(e){console.log("error fetching lower divs:",e)}return o}(e,t,n);o=r}catch(e){console.error("error retrieving lower divs:",e)}return o}(t,o,r),i=e,l=n("class");i.replaceChildren(),i.appendChild(l),a.forEach(((e,t)=>{const n=function(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=t,o.setAttribute("data-id",n),o}(function(e){let t="";return"object"!=typeof e||Array.isArray(e)?Array.isArray(e)&&(t=function(e){const t=function(e){const t=e;if("object"!=typeof t||Array.isArray(t)){if(Array.isArray(t))for(let e=0;e<t.length;)t[e].seriesId&&t.splice(e,1),e+=1}else delete t.courseId;return t}(e.slice());let n="";return t.forEach(((e,o)=>{let r;const c=e;if("object"==typeof c){const{prefix:e,courseNumber:t}=c;n+=`${e} ${t}`}else"string"==typeof c&&(r=c.toLowerCase(),n+=r);o<t.length-1&&(n+=" ")})),n}(e)):t=`${e.prefix} ${e.courseNumber} - ${e.courseTitle}`,t}(e),t,function(e){let t;if("object"!=typeof e||Array.isArray(e)){if(Array.isArray(e))for(let n=0;n<e.length;){const o=e[n];o.seriesId&&(t=o.seriesId),n+=1}}else t=e.courseId;return t}(e));i.appendChild(n)})),x(c,s)}function j(e,t){const n=function(e){return e.sort(((e,t)=>{if("string"==typeof e)return 0;if("string"==typeof t)return 0;if(e.prefix&&t.prefix){const n=e.prefix.localeCompare(t.prefix);if(0!==n)return n}if(e.courseNumber&&t.courseNumber){const n=e.courseNumber.localeCompare(t.courseNumber);if(0!==n)return n}return 0})),e}(e);for(let e=0;e<n.length;){const o=n[e];if(Array.isArray(o))j(o,t);else if("string"==typeof o)"and"===o.toLowerCase()?s(o,t):"or"===o.toLowerCase()&&a(o,t);else if(o.courseNumber&&o.courseTitle&&o.prefix){const e=c(`${o.prefix} ${o.courseNumber} - ${o.courseTitle}`,t);if(o.cid){const t=i(o.cid);e.appendChild(t)}}e+=1}}function L(e){if(e&&e.result){const{result:t}=e,n=[];let c="",s="";for(let e=0;e<t.length;){const a=t[e];if(a&&(a.ccName?c=a.ccName:a.agreementLink?s=a.agreementLink:n.push(a),c&&s)){const e=o();r(e,c,s),j(n,e)}e+=1}}}async function I(e,t,n,o,r,c=[]){let s;if(0===e.length)return c;s=e.length<29?e.splice(0,e.length-1):e.splice(0,29);try{const a=await async function(e,t,n,o,r){let c;try{const s=JSON.stringify(e),a=`https://nxumffe33mx27f7njbxyq4qwwi0birlz.lambda-url.us-east-2.on.aws/?courseId=${n}&year=${o}`,i=await fetch(a,{body:s,method:"POST",headers:{"Content-Type":"application/json",Connection:"keep-alive"},signal:t});c=await async function(e,t){const n=e.getReader(),o=new TextDecoder("utf-8"),r=[];let c="";for(;;){const{value:e,done:s}=await n.read();if(s)break;c+=o.decode(e,{stream:!0});let a=c.indexOf("\n");for(;-1!==a;){const e=c.slice(0,a);c=c.slice(a+1);try{const n=JSON.parse(e);n.result&&(L(n),r.push(n)),t(1)}catch(e){console.error(`error parsing articulation: ${e}`)}a=c.indexOf("\n")}}return r}(i.body,r)}catch(e){console.error(`error processing stream: ${e}`)}return c}(s,t,n,r,o);return c.push(...a),await I(e,t,n,o,r,c)}catch(e){"AbortError"===e.name?console.log("aborted request"):console.error("error processing chunk:",e)}}function T(e,t,n){const o=e;for(let e=0;e<o.length;){const t=o[e];t&&L(t),e+=1}n(t),q(),E()}async function O(e,t){if(t){!function(){const e=document.querySelector(".articulations"),t=document.querySelectorAll(".class-list"),n=Array.from(t);0===t.length?function(e){const t=document.createElement("p");t.classList.add("no-articulations"),t.textContent="No articulations found.",e.appendChild(t),t.style.opacity=1}(e):(n.sort(((e,t)=>{const n=e.querySelector("button"),o=t.querySelector("button");return n&&o?n.textContent.localeCompare(o.textContent):0})),n.forEach((t=>{e.appendChild(t)})))}();try{await fetch("https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/complete-cache",{body:JSON.stringify({fullCourseId:e}),method:"POST",headers:{"Content-Type":"application/json"}}),E()}catch(e){console.error(`error finalizing cache job: ${e}`),document.querySelector("dialog").querySelector("p").textContent="Failed to complete search. Try again shortly."}}}async function z(e,t,n){const o=`${t}_${n}`,r=e.slice(),c=new AbortController,{signal:s,isAborted:a}=function(e){const t=document.querySelector(".back");let n=!1;return t.addEventListener("click",(()=>{n=!0,function(e){e.abort(),g.style.opacity=0,u(g).then((()=>{g.style.display="none"})),f.style.opacity="0",u(f).then((()=>{f.style.display="none"})),h.style.opacity=0,u(h).then((async()=>{h.style.display="none"})),u(f).then((()=>{y.style.opacity=1})),u(y).then((()=>{y.style.display="flex"})),function(){const e=document.querySelector(".results"),t=document.querySelector(".progress-tracker"),n=document.querySelector(".selected-class"),o=document.querySelector(".articulations"),r=document.querySelector(".cids > input");u(e).then((()=>{o.replaceChildren(),t.textContent="",n.textContent="",r.checked=!1}))}()}(e)})),{signal:e.signal,isAborted:n}}(c),i=function(e){let t=0;return n=>{var o,r;t+=n,o=t,r=e,document.querySelector(".progress-tracker").textContent=`${o} out of ${r} colleges searched`}}(e.length);let l;window.addEventListener("beforeunload",(()=>c.abort())),u(y).then((()=>{f.style.opacity=1,m.style.opacity=1,m.style.display="flex",h.style.opacity=1,h.style.display="block"})),f.style.display="flex",i(0);try{l=await async function(e,t,n){try{const o=await fetch(`https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/get-course/${e}`);if(200===o.status){const e=await o.json();return T(e,t,n),e}if(204===o.status)return console.log("restarting incomplete caching job..."),!1;if(206===o.status)return q(),document.querySelector("dialog").querySelector("p").textContent="Data may be processing. Try again shortly.",b(),!0}catch(e){console.error("error getting class from db",e)}return!1}(o,e.length,i),l||(l=await I(r,s,t,i,n),q(),a||await O(o,l))}catch(e){"AbortError"===e.name?console.log("requests aborted due to page unload"):console.error("error processing requests",e)}finally{window.removeEventListener("beforeunload",(()=>c.abort()))}return{articulations:l,updateProgress:i}}const D=document.querySelector(".cids > input");function P(e){for(let t=0;t<e.length;){const n=e[t];if(n.result&&P(n.result))return!0;if(Array.isArray(n)&&P(n))return!0;if(n&&n.prefix&&n.courseNumber&&n.courseTitle&&n.cid)return!0;t+=1}return!1}function B(){document.querySelectorAll(".cid").forEach((e=>{e.style.display="inline"}))}async function J(e,t,n,o){const r=t.articulations;if(D.checked)if(P(r))B();else{const c=await async function(e,t){const n=`https://7bd2zfvix4.execute-api.us-east-2.amazonaws.com/transition1/articulations/get-cids/${e}`;!function(){const e=document.querySelector(".cid-section"),t=e.querySelector(".cids"),n=e.querySelector(".cids > input"),o=t.querySelectorAll("*");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}();const o=await fetch(n,{body:JSON.stringify(t),method:"POST",headers:{"Content-Type":"application/json"}});let r;return 200===o.status&&(r=await o.json(),function(){const e=document.querySelector(".cid-section"),t=e.querySelector(".cids"),n=e.querySelector(".cids > input"),o=t.querySelectorAll("*");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}()),r}(e,r);document.querySelector(".articulations").replaceChildren(),T(c,n,o),t.articulations=c,B()}else document.querySelectorAll(".cid").forEach((e=>{e.style.display="none"}));return r}function _(e){D.removeEventListener("change",e)}const M=[document.getElementById("four-year"),document.getElementById("major"),document.getElementById("class"),document.getElementById("academic-year")],F=M[0],K=M[1],R=M[2],G=M[3],Q=document.querySelector(".submit"),U=document.querySelector(".back"),V=document.querySelector(".close-dialog"),H=document.querySelector(".cid-info");document.addEventListener("DOMContentLoaded",(async()=>{for(let e=1;e<M.length-1;)M[e].parentNode&&(C(M[e].parentNode),e+=1);C(Q.parentNode),async function(e){const o=e.parentNode,r=o.querySelector(".loading");b(),v(o,r);const c=await async function(){let e;try{const t=`${$}/four-years`;e=await A(t)}catch(e){console.error("error retrieving four years:",e)}return e}(),s=e,a=n("school");s.appendChild(a),c.forEach((e=>{if(e.id<200){const n=t(e.name,e.id,"sending");s.appendChild(n)}})),w(),x(o,r)}(F),await async function(){u(y).then((async()=>{await async function(e){const t=e,n=await fetch("https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",{mode:"cors"}),o=await n.json();try{o&&(t.src=o.data.images.original.url)}catch(e){console.log(e)}}(p),p.style.display="block",p.style.opacity=1}))}()})),G.addEventListener("input",(()=>{const e=G.options[G.selectedIndex].value,t=F.options[F.selectedIndex],n=t.dataset.sending;K.replaceChildren(),R.replaceChildren(),t.value&&N(K,n,e),C(K.parentNode),C(R.parentNode),C(Q.parentNode)})),F.addEventListener("input",(()=>{const e=G.options[G.selectedIndex].value,t=F.options[F.selectedIndex].dataset.sending;N(K,t,e),K.replaceChildren(),R.replaceChildren(),C(R.parentNode),C(Q.parentNode)})),K.addEventListener("input",(()=>{const e=G.options[G.selectedIndex].value,t=F.options[F.selectedIndex].dataset.sending,n=K.options[K.selectedIndex].dataset.key;R.replaceChildren(),k(R,t,n,e),C(Q.parentNode)})),R.addEventListener("change",(()=>{S(Q.parentNode)})),Q.addEventListener("click",(async e=>{const t=G.options[G.selectedIndex].value,n=F.options[F.selectedIndex].dataset.sending,o=K.options[K.selectedIndex].dataset.key,r=R.options[R.selectedIndex],c=r.dataset.id;if(C(Q.parentNode),R.value){const e=await async function(e,t,n){const o=[],r=await async function(){let e;try{const t=`${$}/community-colleges`;e=await A(t)}catch(e){console.error("error retrieving community colleges:",e)}return e}(),c=e,s=t;return r.forEach((e=>{if(e.id){const t=e.id,r=`https://assist.org/api/articulation/Agreements?Key=${n}/${t}/to/${c}/Major/${s}`,a=`https://assist.org/transfer/results?year=${n}&institution=${t}&agreement=${c}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${n}/${t}/to/${c}/Major/${s}`;o.push({link:r,agreementLink:a})}})),o}(n,o,t),a=`${c}_${t}`;if(y.style.opacity=0,u(y).then((()=>{y.style.display="none"})),r){s=r.textContent,document.querySelector(".selected-class").textContent=`Articulations for: ${s}`;const n=await z(e,c,t),{articulations:o,updateProgress:i}=n,l=function(e,t,n,o){const r={articulations:t},c=async()=>J(e,r,n,o);return D.addEventListener("change",c),c}(a,o,e.length,i);!function(e,t){function n(){e(t),function(e){document.querySelector(".back").removeEventListener("click",e)}(n)}document.querySelector(".back").addEventListener("click",n)}(_,l)}}var s;e.preventDefault()})),V.addEventListener("click",(()=>{w()})),H.addEventListener("click",(()=>{!function(){const e=document.querySelector("dialog");e.querySelector("p").textContent="C-IDs (course identification numbers) make it easy to identify equivalent courses across California Community Colleges.";const t=document.createElement("div");t.classList.add("cid-second-line");const n=document.createElement("p");n.textContent="Some C-IDs may not be visible due to inconsistencies in data. All available data can be found on the ";const o=document.createElement("a");o.textContent="C-ID website.",o.href="https://c-id.net",o.target="_blank",n.appendChild(o),t.appendChild(n),e.appendChild(t),e.style.height="250px"}(),b()})),U.addEventListener("click",(()=>{S(Q.parentNode)}))})();