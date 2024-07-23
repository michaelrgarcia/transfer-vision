(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!t||!/^http(s?):/.test(t));)t=o[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p,e.p,e.p,e.p,e.p;const t=e=>{const t=(e=e.trim()).match("[0-9.]+");let n,o="ms";const r=t?t[0]:"";return r&&(o=e.split(r)[1],n=Number(r)),{num:n,unit:o}},n=function(e){const n=function(e){const n=t=>{return window.getComputedStyle(e).getPropertyValue(t)||e.style[(n=t,n.replace(/-([a-z])/g,(e=>e[1].toUpperCase())))];var n},o=n("transition-delay")||"0ms",r=n("transition-duration")||"0ms",s=Array.isArray(r)?r:[r],c=Array.isArray(o)?o:[o];let a,i=0;return s.push.apply(s,c),s.forEach((e=>{e.split(",").forEach((e=>{e=(e=>{const n=t(e),o=n?n.num:void 0;if(!o)return"";let r=o;return"s"===e.replace(o+"","")&&(r=1e3*o),r+"ms"})(e),a=t(e),a.num&&a.num>i&&(i=a.num)}))})),i}(e);return new Promise((t=>{n>0?setTimeout((()=>{t(e)}),n):t(e)}))};function o(e,t){document.querySelector(".progress-tracker").textContent=`${e} out of ${t} colleges searched`}const r=document.querySelector("dialog"),s=document.querySelector("form"),c=document.querySelector("img.loading-gif"),a=document.querySelector(".progress-tracker");function i(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}function l(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}function u(e,t){i(e),function(e){const t=e;t.style.opacity=1,t.style.display="block"}(t)}function d(e,t){l(e),function(e){const t=e;t.style.opacity=0,t.style.display="none"}(t)}function p(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=e,t&&n&&o.setAttribute(`data-${n}`,t),o}function y(e){const t=document.createElement("option");return t.textContent=`Select a ${e}`,t.value="",t.disabled=!0,t.selected=!0,t}function f(e){e.forEach((e=>{!function(e,t){const n=document.createElement("button");n.type="button",n.textContent=t,e.append(n)}(function(){const e=document.querySelector(".articulations"),t=document.createElement("div");return t.classList.add("class-list"),e.append(t),t}(),function(e){if(e.sendingInstitution){let t;return function(e){const t=JSON.parse(e);return t?Object.values(t):null}(e.sendingInstitution).forEach((e=>{if(Array.isArray(e)&&e[0].name){const{name:n}=e[0];t=n}})),t}}(e.result))}))}async function h(e,t,n,r){const s=e.splice(0,7);if(0!==e.length)try{const c=await async function(e,t){const n=JSON.stringify(e),o=await fetch("https://assistscraper.onrender.com/articulation-data",{body:n,method:"POST",headers:{"Content-Type":"application/json"},signal:t});if(!o.ok)throw new Error("api is not ok");const r=await o.json();return Object.values(r)}(s,n);t.push(...c),f(c),o(t.length,r),console.log("processed request"),await h(e,t,n,r)}catch(e){"AbortError"===e.name?console.log("aborted request"):console.error("error processing request:",e)}}async function m(e){const t=[],r=e.slice(),i=e.length,l=new AbortController,{signal:u}=l;window.addEventListener("beforeunload",(()=>l.abort())),await async function(){n(s).then((async()=>{await async function(e){const t=e,n=await fetch("https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",{mode:"cors"}),o=await n.json();try{o&&(t.src=o.data.images.original.url)}catch(e){console.log(e)}}(c),c.style.display="block",c.style.opacity=1}))}(),n(c).then((()=>{a.style.display="block",a.style.opacity=1})),o(0,i),function(){const e=document.querySelector(".articulations");n(c).then((()=>{e.style.display="grid",e.style.opacity=1}))}();try{await h(r,t,u,i),console.log("all requests processed"),c.style.opacity=0,n(c).then((()=>{c.style.display="none",c.src="#"})),a.style.opacity=0,n(c).then((()=>{a.style.display="none"}))}catch(e){"AbortError"===e.name?console.log("requests aborted due to page unload"):console.error("error processing requests",e)}finally{window.removeEventListener("beforeunload",(()=>l.abort()))}return console.log(t),t}const g=[document.getElementById("four-year"),document.getElementById("major"),document.getElementById("class")],w=g[0],b=g[1],E=g[2],v=document.querySelector(".submit"),S=document.querySelector("dialog"),q=document.querySelector(".close-dialog");document.addEventListener("DOMContentLoaded",(()=>{for(let e=1;e<g.length;)g[e].parentNode&&(i(g[e].parentNode),e+=1);i(v.parentNode),async function(e){const t=e.parentNode,n=t.querySelector(".loading");r.showModal(),r.style.opacity=1,u(t,n);const o=await async function(){try{const e="https://classglance.onrender.com/schools/four-years",t=await fetch(e),n=await t.json();return Object.values(n)}catch(e){return console.error("Error fetching universities:",e),null}}(),s=e,c=y("school");s.appendChild(c),o.forEach((e=>{if(e.id<200){const t=p(e.name,e.id,"sending");s.appendChild(t)}})),r.style.opacity=0,r.close(),d(t,n)}(g[0])})),g[0].addEventListener("input",(()=>{const e=w.options[w.selectedIndex].dataset.sending;(async function(e,t){const n=e.parentElement,o=n.querySelector(".loading");u(n,o);const r=await async function(e){try{const t=`https://classglance.onrender.com/schools/major-data/${e}/74`,n=await fetch(t),o=await n.json();return Object.values(o)}catch(t){return console.error(`Error fetching majors for ${e}:`,t),null}}(t),s=e,c=y("major");s.replaceChildren(),s.appendChild(c),r.forEach((e=>{const t=p(e.major,e.key,"key");s.appendChild(t)})),d(n,o)})(b,e),b.replaceChildren(),E.replaceChildren(),i(E.parentNode),i(v.parentNode)})),g[1].addEventListener("input",(()=>{const e=w.options[w.selectedIndex].dataset.sending,t=b.options[b.selectedIndex],{key:n}=t.dataset;E.replaceChildren(),async function(e,t,n){const o=e.parentNode,r=o.querySelector(".loading");u(o,r);const s=await async function(e,t){try{const n=`https://classglance.onrender.com/schools/74/6/${e}/${t}/lower-divs`,o=await fetch(n),r=await o.json();return Object.values(r)}catch(t){return console.error(`Error fetching lower divs for ${e}:`,t),null}}(t,n),c=e,a=y("class");c.replaceChildren(),c.appendChild(a),s.forEach((e=>{if(Array.isArray(e)){let t,n="";e.forEach(((o,r)=>{if("string"==typeof o&&(t=o.toLowerCase(),r<e.length-1&&(n+=` ${t} `)),o.prefix&&o.courseNumber&&o.courseTitle){const{prefix:e}=o,{courseNumber:t}=o;n+=` ${e} ${t} `}}));const o=p(n);c.appendChild(o)}else{const t=p(`${e.prefix} ${e.courseNumber} - ${e.courseTitle}`,null,null);c.appendChild(t)}})),d(o,r)}(E,e,n),i(v.parentNode)})),g[2].addEventListener("input",(()=>{l(v.parentNode)})),v.addEventListener("click",(async e=>{const t=w.options[w.selectedIndex].dataset.sending,o=b.options[b.selectedIndex].dataset.key;if(i(v.parentNode),E.value){const e=await async function(e,t){const n=[],o=await async function(){try{const e="https://classglance.onrender.com/schools/community-colleges",t=await fetch(e),n=await t.json();return Object.values(n)}catch(e){return console.error("Error fetching community colleges:",e),null}}(),r=e,s=t;return o.forEach((e=>{if(e.id){const t=`https://assist.org/api/articulation/Agreements?Key=74/${e.id}/to/${r}/Major/${s}`;n.push({link:t})}})),n}(t,o);s.style.opacity=0,n(s).then((()=>{s.style.display="none"})),await m(e)}e.preventDefault()})),q.addEventListener("click",(()=>{S.close()}))})();