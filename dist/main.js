(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var o=t.g.document;if(!e&&o&&(o.currentScript&&(e=o.currentScript.src),!e)){var n=o.getElementsByTagName("script");if(n.length)for(var c=n.length-1;c>-1&&(!e||!/^http(s?):/.test(e));)e=n[c--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.p,t.p,t.p,t.p;const e=t.p+"fonts/level-up-191997..mp3",o=document.getElementById("four-year");document.getElementById("major"),document.getElementById("class"),async function(t){const o=t.parentElement,n=o.querySelector(".loading"),c=o.querySelectorAll(":not(.loading)");try{const o="https://classglance.onrender.com/schools/four-years";c.forEach((t=>{const e=t;e.style.opacity=.3,e.disabled=!0,e.style.userSelect="none","pointer"===e.style.cursor&&(e.style.cursor="not-allowed")})),function(t){const e=t;e.style.opacity=1,e.style.display="block"}(n);const r=await fetch(o),s=await r.json();!function(t){const o=t,n=new Audio(e);n.volume=.5,n.play(),o.style.opacity=0,o.style.display="none"}(n),c.forEach((t=>{const e=t;e.style.opacity=1,e.disabled=!1,e.style.userSelect="auto","not-allowed"===e.style.cursor&&(e.style.cursor="pointer")}));const l=Object.values(s),a=t,i=function(t){const e=document.createElement("option");return e.textContent="Select a school",e.value="",e.disabled=!0,e.selected=!0,e}();a.appendChild(i),l.forEach((t=>{if(t.id<200){const e=function(t,e){const o=document.createElement("option");return o.textContent=t,o.value=t,o.setAttribute("data-sending",e),o}(t.name,t.id);a.appendChild(e)}}))}catch(t){console.error("Error fetching schools:",t)}}(o)})();