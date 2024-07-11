(()=>{"use strict";var e={};function t(e,t,n){const o=document.createElement("option");return o.textContent=e,o.value=e,t&&n&&o.setAttribute(`data-${n}`,t),o}function n(e){const t=document.createElement("option");return t.textContent=`Select a ${e}`,t.value="",t.disabled=!0,t.selected=!0,t}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!t||!/^http(s?):/.test(t));)t=o[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p,e.p,e.p,e.p,e.p;const o=document.querySelector("dialog");function r(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!0),o.forEach((e=>{e.setAttribute("aria-disabled","true")}))}function c(e){const t=e,n=t.querySelector("select"),o=t.querySelectorAll(":not(.loading)");n&&(n.disabled=!1),o.forEach((e=>{e.setAttribute("aria-disabled","false")}))}function a(e,t){r(e),function(e){const t=e;t.style.opacity=1,t.style.display="block"}(t)}function s(e,t){c(e),function(e){const t=e;t.style.opacity=0,t.style.display="none"}(t)}const l=[document.getElementById("four-year"),document.getElementById("major"),document.getElementById("class")],i=(document.querySelector("form"),document.querySelector(".submit")),d=document.querySelector("dialog"),u=document.querySelector(".close-dialog");document.addEventListener("DOMContentLoaded",(()=>{for(let e=1;e<l.length;)l[e].parentNode&&(r(l[e].parentNode),e+=1);r(i.parentNode),async function(e){const r=e.parentNode,c=r.querySelector(".loading");o.showModal(),o.style.opacity=1,a(r,c);const l=await async function(){try{const e="https://classglance.onrender.com/schools/four-years",t=await fetch(e),n=await t.json();return Object.values(n)}catch(e){return console.error("Error fetching schools:",e),null}}(),i=e,d=n("school");i.appendChild(d),l.forEach((e=>{if(e.id<200){const n=t(e.name,e.id,"sending");i.appendChild(n)}})),o.style.opacity=0,o.close(),s(r,c)}(l[0])})),l[0].addEventListener("input",(()=>{const e=l[0],o=l[1],c=l[2];(async function(e,o){const r=e.parentElement,c=r.querySelector(".loading");a(r,c);const l=await async function(e){try{const t=`https://classglance.onrender.com/schools/major-data/${e}/74`,n=await fetch(t),o=await n.json();return Object.values(o)}catch(t){return console.error(`Error fetching majors for ${e}:`,t),null}}(o),i=e,d=n("major");i.replaceChildren(),i.appendChild(d),l.forEach((e=>{const n=t(e.major,e.key,"key");i.appendChild(n)})),s(r,c)})(o,e.options[e.selectedIndex].dataset.sending),o.replaceChildren(),c.replaceChildren(),r(c.parentNode),r(i.parentNode)})),l[1].addEventListener("input",(()=>{const e=l[0],o=l[1],c=l[2],d=e.options[e.selectedIndex].dataset.sending,u=o.options[o.selectedIndex],{key:p}=u.dataset;c.replaceChildren(),async function(e,o,r){const c=e.parentNode,l=c.querySelector(".loading");a(c,l);const i=await async function(e,t){try{const n=`https://classglance.onrender.com/schools/74/6/${e}/${t}/lower-divs`,o=await fetch(n),r=await o.json();return Object.values(r)}catch(t){return console.error(`Error fetching lower divs for ${e}:`,t),null}}(o,r),d=e,u=n("class");d.replaceChildren(),d.appendChild(u),i.forEach((e=>{if(Array.isArray(e)){let n,o="";e.forEach(((t,r)=>{if("string"==typeof t&&(n=t.toLowerCase(),r<e.length-1&&(o+=` ${n} `)),t.prefix&&t.courseNumber&&t.courseTitle){const{prefix:e}=t,{courseNumber:n}=t;o+=` ${e} ${n} `}}));const r=t(o);d.appendChild(r)}else{const n=t(`${e.prefix} ${e.courseNumber} - ${e.courseTitle}`,null,null);d.appendChild(n)}})),s(c,l)}(c,d,p),r(i.parentNode)})),l[2].addEventListener("input",(()=>{c(i.parentNode)})),i.addEventListener("click",(e=>{const t=l[0],n=l[1],o=l[2],r=t.options[t.selectedIndex].dataset.sending,c=n.options[n.selectedIndex].dataset.key;o.value&&async function(e,t){const n=e,o=t,r=await async function(e,t){const n=[],o=await async function(){try{const e="https://classglance.onrender.com/schools/community-colleges",t=await fetch(e),n=await t.json(),o=Object.values(n),r=[];return o.forEach((e=>{e.id&&r.push(e.id)})),r}catch(e){return console.error("Error fetching schools:",e),null}}(),r=e,c=t;return o.forEach((e=>{n.push({year:74,id:e,receiving:r,key:c})})),n}(n,o),c=new FormData;c.append("parameters",r);const a=await fetch("https://classglance.onrender.com/articulations/articulation-params",{method:"POST",body:c});console.log(a.json())}(r,c),e.preventDefault()})),u.addEventListener("click",(()=>{d.close()}))})();