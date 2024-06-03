(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{11:function(e,t,o){"use strict";o.r(t);o(0);var n=o(5),c=o.n(n),r=o(3);const l={COOP:"same-origin-allow-popups",COEP:"require-corp",CORS:"https://manders-jones.eu"};o(4);let a=!1;function i(){const e=document.getElementById("predictionInput"),t=document.querySelector(".circle.green:last-child .number-box.large"),o=document.querySelector('button[name="compute"]');e.value.trim()&&t.value.trim()?(o.style.opacity="1",o.disabled=!1):(o.style.opacity="0.5",o.disabled=!0)}function s(){const e=document.querySelectorAll(".circle.highlighted"),t=document.getElementById("linkButton");if(2===e.length){const o=e[0].dataset.layer,n=e[1].dataset.layer,c=Array.from(e).map((e=>e.dataset.id)),r="".concat(Math.min(...c),"-").concat(Math.max(...c)),l=document.querySelector('.line[data-pair-id="'.concat(r,'"]'));o!==n?(t.textContent=l?"Unlink":"Link",t.disabled=!1,t.style.opacity=1):(t.textContent="Link",t.disabled=!0,t.style.opacity=.5)}else t.textContent="Link",t.disabled=!0,t.style.opacity=.5}function d(e){var t=new Event("change",{bubbles:!0});e.dispatchEvent(t)}function u(){const e=document.querySelector('.container .circle.green[data-id="1"]'),t=document.querySelector('.container .circle.green[data-id="11"]'),o=document.querySelectorAll('.grid .circle.hidden-layer[data-id="2"], .grid .circle.hidden-layer[data-id="5"], .grid .circle.hidden-layer[data-id="8"]'),n=document.querySelectorAll('.grid .circle.hidden-layer[data-id="4"], .grid .circle.hidden-layer[data-id="7"], .grid .circle.hidden-layer[data-id="10"]');o.forEach((t=>{m(e,t,"".concat(e.dataset.id,"-").concat(t.dataset.id))})),n.forEach((e=>{m(t,e,"".concat(t.dataset.id,"-").concat(e.dataset.id))})),document.querySelectorAll(".line").forEach((e=>{e.style.display="block"}))}function m(e,t,o){const n=e.getBoundingClientRect(),c=t.getBoundingClientRect(),r=n.left+n.width/2,l=n.top+n.height/2,a=c.left+c.width/2,i=c.top+c.height/2,d=Math.hypot(a-r,i-l),u=180*Math.atan2(i-l,a-r)/Math.PI,m=document.createElement("div");m.className="line",m.setAttribute("data-pair-id",o),m.style.width="".concat(d,"px"),m.style.height="6px",m.style.backgroundColor="#086B10",m.style.position="absolute",m.style.top="".concat(l,"px"),m.style.left="".concat(r,"px"),m.style.transform="rotate(".concat(u,"deg)"),m.style.transformOrigin="0 0",document.body.appendChild(m),m.style.display="block",s()}function y(e){e.classList.contains("active")&&(e.style.animation="fadeOutScaleDown 0.5s forwards",e.addEventListener("animationend",(function(){e.style.display="none",e.classList.remove("active"),e.style.animation=""}),{once:!0}))}function p(){const e=document.getElementById("tooHighMessage");e&&e.classList.contains("active")&&(e.style.animation="fadeOutScaleDown 0.5s forwards",e.addEventListener("animationend",(()=>{e.style.display="none",e.classList.remove("active")}),{once:!0}))}function g(){const e=document.getElementById("tooLowMessage");e&&e.classList.contains("active")&&(e.style.animation="fadeOutScaleDown 0.5s forwards",e.addEventListener("animationend",(()=>{e.style.display="none",e.classList.remove("active")}),{once:!0}))}function h(e){e.style.display="block",e.style.opacity="1",e.style.transform="scale(1)",e.classList.add("active")}function f(e,t){const o=document.querySelectorAll(".score");o.length;o.forEach((t=>{let o=parseInt(t.textContent)||0;t.textContent=o+e;A(t.closest(".circle").getAttribute("data-id"),t.textContent)}))}function b(){document.querySelectorAll(".number-box.small").forEach((e=>{const t=e.cloneNode(!0);t.style.visibility="hidden",t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const o=t.offsetWidth,n=e.offsetWidth/o,c=parseFloat(window.getComputedStyle(e).fontSize)*n;e.style.fontSize=c+"px",document.body.removeChild(t)}))}function E(){const e=document.querySelectorAll(".circle"),t=parseInt(document.getElementById("score-range-max").textContent);e.forEach((e=>{const o=e.querySelector(".score"),n=parseInt(o.textContent)||0,c=Math.min(100,n/t*100);e.querySelector(".fill").style.height=0!==n?"".concat(c,"%"):"0%"}))}async function v(){const e={types:[{description:"Text Files",accept:{"text/plain":[".txt"]}}]},t=document.querySelectorAll(".circle.green");let o="";t.forEach((e=>{const t=e.querySelector(".number-box.small")?e.querySelector(".number-box.small").value:"N/A";let n="N/A";n="1"===e.dataset.id?e.querySelector(".secret-box.large")?e.querySelector(".secret-box.large").value:"N/A":e.querySelector(".number-box.large")?e.querySelector(".number-box.large").value:"N/A";const c=e.querySelector(".score")?e.querySelector(".score").textContent:"0";o+="".concat(t,"; ").concat(n,"; ").concat(c,"; ")}));const n=document.querySelectorAll(".circle.hidden-layer");let c="";n.forEach((e=>{const t=e.querySelector(".number-box.small")?e.querySelector(".number-box.small").value:"N/A",o=e.querySelector(".number-box.large")?e.querySelector(".number-box.large").value:"N/A",n=e.querySelector(".score")?e.querySelector(".score").textContent:"0",r=function(e){const t={left:"",right:""};return t}();c+="".concat(t,"; ").concat(o,"; ").concat(n,"; ").concat(r.left,"; ").concat(r.right,"; ")}));const r="".concat(o.trim(),"\n").concat(c.trim());try{const t=await window.showSaveFilePicker(e),o=await t.createWritable();await o.write(r),await o.close(),alert("File saved successfully!")}catch(l){console.error("Failed to save file:",l),alert("Failed to save file.")}}async function S(){const e={types:[{description:"Text Files",accept:{"text/plain":[".txt"]}}]};try{const[t]=await window.showOpenFilePicker(e),o=await t.getFile(),n=(await o.text()).split("\n"),c=n[0].split(";").map((e=>e.trim())),r=n[1].split(";").map((e=>e.trim()));document.querySelectorAll(".circle.green").forEach(((e,t)=>{const o=3*t;"1"===e.dataset.id?(e.querySelector(".number-box.small").value=c[o],e.querySelector(".secret-box.large").value=c[o+1]):(e.querySelector(".number-box.small").value=c[o],e.querySelector(".number-box.large").value=c[o+1]),e.querySelector(".score").textContent=c[o+2]}));document.querySelectorAll(".circle.hidden-layer").forEach(((e,t)=>{const o=5*t;e.querySelector(".number-box.small").value=r[o],e.querySelector(".number-box.large").value=r[o+1],e.querySelector(".score").textContent=r[o+2],r[o+3],r[o+4]})),alert("File loaded successfully!"),I()}catch(t){console.error("Failed to load file:",t),alert("Failed to load file.")}}function w(e){const t=document.querySelector('.circle[data-id="'.concat(e,'"]'));if(t){const e=t.querySelector(".score"),o=t.querySelector(".number-box.small"),n=t.querySelector(".number-box.large");if(e){const t=()=>{a&&(e.textContent||e.value),E()};e.isContentEditable?e.addEventListener("input",t):e.addEventListener("change",t)}o&&(o.disabled=!a,o.addEventListener("input",(()=>{a&&o.value,E()}))),n&&n.addEventListener("input",(()=>{a&&n.value,E()}))}else console.log("Neuron with ID ".concat(e," not found in the DOM."))}function q(e){window.db.ref("neurons/"+e).on("value",(t=>{const o=t.val();o&&(x(e,o),E())}))}function x(e,t){const o=document.querySelector('.circle[data-id="'.concat(e,'"]'));if(!o)return void console.error("Neuron with ID",e,"not found in the DOM.");const n=o.querySelector("input.number-box.large"),c=o.querySelector("input.number-box.small"),r=o.querySelector(".score"),l=o.querySelector(".fill");n&&void 0!==t.large&&(n.value=t.large),c&&void 0!==t.small&&(c.value=t.small),r&&void 0!==t.score&&(r.textContent=t.score),void 0!==t.fill&&l&&(l.style.height="".concat(t.fill,"%"))}function L(e,t,o){if(!a)return void console.warn("Update skipped for neuron ".concat(e," due to authentication status"));const n=window.db.ref("neurons/"+e),c={};c[t]=o,n.update(c).then((()=>{console.log("Data updated successfully for neuron:",e),E()})).catch((t=>{console.error("Failed to update data for neuron:",e,t)}))}function I(){window.db.ref("neurons").on("value",(e=>{const t=e.val();t?(Object.keys(t).forEach((e=>{console.log("Updating each neuron");const o=t[e];console.log("Done updating each neuron"),x(e,o)})),E()):console.log("No neuron data available")}))}function A(e,t){if(!a)return void console.warn("Score update skipped for neuron ".concat(e," due to authentication status"));const o=window.db.ref("neurons/"+e),n=parseInt(document.getElementById("score-range-max").textContent),c={score:t,fill:Math.min(100,t/n*100)};o.update(c).then((()=>{console.log("Score and fill updated successfully for neuron:",e),E()})).catch((t=>{console.error("Failed to update score and fill for neuron:",e,t)}))}function k(e){console.log("Encoded JWT ID token: "+e.credential)}function C(){const e=document.querySelector(".popup4");e&&(e.style.animation="fadeOutScaleDown 0.5s forwards",e.addEventListener("animationend",(function(){e.style.setProperty("display","none","important"),e.style.setProperty("opacity","0","important"),e.style.setProperty("transform","translateY(-10px) scale(0.95)","important")}),{once:!0}))}window.addEventListener("message",(function(e){e.origin===window.location.origin&&"popupClosed"===e.data&&console.log("The popup window has closed")})),document.addEventListener("DOMContentLoaded",(function(){console.log("Page loaded"),console.log("config.js loaded:",l);const e=document.getElementById("close-popup4");e&&e.addEventListener("click",(function(){C()}));const t=document.getElementById("main-content");!function(){const e=document.getElementById("main-content");e.style.display="block",u()}(),document.addEventListener("firebaseReady",(function(){console.log("Firebase is ready");const e=document.getElementById("sign-in"),o=document.getElementById("sign-out"),n=document.getElementById("sign-in-status"),c=document.querySelectorAll(".toolbar button, .score-scale-container button"),r=document.getElementById("score-range-max"),l=()=>{c.forEach((e=>{e.classList.remove("disabled"),e.disabled=!1})),r.classList.remove("disabled"),r.removeAttribute("disabled"),document.querySelectorAll(".number-box.small").forEach((e=>{e.disabled=!1}))},x=()=>{0};l(),e.addEventListener("click",(()=>{firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider).then((e=>{C(),l(),a=!0,I(),window.addEventListener("beforeunload",(function(e){e.preventDefault(),e.returnValue="",window.opener&&window.opener.postMessage("popupClosed",window.opener.location.origin)}))})).catch((e=>{console.error("Error signing in:",e.message,e.code),alert("Failed to sign in. Please try again.")}))})),o.addEventListener("click",(()=>{firebase.auth().signOut().then((()=>{n.textContent="Signed out",e.style.display="block",o.style.display="none",t.style.display="none",function(){const e=document.querySelector(".popup4"),t=document.getElementById("main-content");e&&t&&(t.style.display="block",console.log("Showing welcome popup"),e.style.setProperty("display","block","important"),e.style.setProperty("opacity","1","important"),e.style.setProperty("transform","translateY(0px) scale(1)","important"))}(),x(),a=!1})).catch((e=>{console.error("Error signing out:",e),n.textContent="Sign-out failed: ".concat(e.message)}))})),console.log("SETTING setupInteractions"),function(){document.addEventListener("touchmove",(function(e){e.preventDefault()}),!1);for(let n=1;n<=11;n++)q("neuron"+n);window.addEventListener("resize",b),window.addEventListener("load",b),document.querySelectorAll('.circle[data-id="2"], .circle[data-id="5"], .circle[data-id="8"]').forEach((e=>{e.addEventListener("mouseenter",(()=>h(document.querySelector(".popup")))),e.addEventListener("mouseleave",(()=>y(document.querySelector(".popup"))))})),document.querySelectorAll('.circle[data-id="3"], .circle[data-id="6"], .circle[data-id="9"], .circle[data-id="4"], .circle[data-id="7"], .circle[data-id="10"]').forEach((e=>{e.addEventListener("mouseenter",(()=>h(document.querySelector(".popup2")))),e.addEventListener("mouseleave",(()=>y(document.querySelector(".popup2"))))})),document.querySelectorAll('.circle[data-id="11"]').forEach((e=>{e.addEventListener("mouseenter",(()=>h(document.querySelector(".popup3")))),e.addEventListener("mouseleave",(()=>y(document.querySelector(".popup3"))))})),document.querySelectorAll('.circle[data-id="1"]').forEach((e=>{e.addEventListener("mouseenter",(()=>h(document.querySelector(".popup1")))),e.addEventListener("mouseleave",(()=>y(document.querySelector(".popup1"))))}));const e=document.getElementById("linkButton"),t=document.querySelectorAll(".checkbox"),o=document.querySelectorAll(".circle");t.forEach((e=>{e.addEventListener("change",(function(){const e=this.closest(".circle"),t=e.getAttribute("data-id");e.style.opacity=this.checked?"0.3":"1.0";document.querySelectorAll(".line[data-pair-id*='".concat(t,"-'], .line[data-pair-id*='-").concat(t,"']")).forEach((e=>e.style.opacity=this.checked?"0":"1.0"))}))})),o.forEach((e=>{e.addEventListener("click",(function(){this.classList.contains("green")||(this.classList.contains("highlighted")?this.classList.remove("highlighted"):document.querySelectorAll(".circle.highlighted").length<2&&this.classList.add("highlighted"),s())}))})),e.addEventListener("click",(()=>{!function(){const e=Array.from(document.querySelectorAll(".circle.highlighted"));if(2===e.length){if(e[0].dataset.layer!==e[1].dataset.layer){const t=e.map((e=>e.dataset.id)),o="".concat(Math.min(...t),"-").concat(Math.max(...t));let n=document.querySelector('.line[data-pair-id="'.concat(o,'"]'));n?n.remove():m(e[0],e[1],o)}e.forEach((e=>e.classList.remove("highlighted"))),s()}}()}))}(),console.log("SETTING UP drawPermanentLines"),u(),console.log("SETTING UP setupLinkPrevention"),function(){const e=document.querySelectorAll('.circle.hidden-layer[data-id="2"], .circle.hidden-layer[data-id="5"], .circle.hidden-layer[data-id="8"]'),t=document.querySelectorAll('.circle.hidden-layer[data-id="3"], .circle.hidden-layer[data-id="6"], .circle.hidden-layer[data-id="9"]'),o=document.querySelectorAll('.circle.hidden-layer[data-id="4"], .circle.hidden-layer[data-id="7"], .circle.hidden-layer[data-id="10"]');e.forEach((e=>{e.dataset.layer="h1"})),t.forEach((e=>{e.dataset.layer="h2"})),o.forEach((e=>{e.dataset.layer="h3"}))}(),console.log("SETTING UP updateLinkButton"),s(),console.log("SETTING UP setupGlobalClickListener"),function(){document.addEventListener("click",(function(e){e.target.closest(".no-hide-on-click, .result-label, .popup")||(p(),g())}));const e=document.getElementById("reset");e&&e.addEventListener("click",(function(){window.confirm("Are you sure you want to reset all settings\nand clear all connections?")&&(document.querySelectorAll(".hidden-layer .number-box.large").forEach((e=>{e.value=""})),document.querySelectorAll('input[type="checkbox"]').forEach((e=>{e.checked=!1,d(e)})),document.querySelectorAll(".line").forEach((e=>{e.remove(),u()})),document.querySelectorAll(".circle.highlighted").forEach((e=>{e.classList.remove("highlighted")})),p(),g(),console.log("Have db",window.db),document.querySelectorAll(".circle").forEach((e=>{const t=e.getAttribute("data-id");e.querySelector("input.number-box.small").value.trim(),e.querySelector(".score").textContent.trim(),console.log("Accessing Firedb"),window.db.ref("neurons/"+t),console.log("Done accessing Firedb")})))}));document.addEventListener("click",(function(e){e.target.closest(".no-hide-on-click, .result-label")||(p(),g())}))}(),console.log("SETTING UP setupInputListeners"),function(){console.log("Setting up input listeners...");const e=document.querySelectorAll(".number-box");console.log("Found ".concat(e.length," input elements")),e.forEach((e=>{console.log("Setting listener for input: ".concat(e.name||e.id)),e.addEventListener("input",(function(){w(this.closest(".circle").getAttribute("data-id")),E()}))}));const t=document.getElementById("save-game");t&&t.addEventListener("click",v);const o=document.getElementById("load-game");o&&o.addEventListener("click",S);const n=document.getElementById("predictionInput"),c=document.querySelector(".circle.green:last-child .number-box.large"),r=document.querySelector('button[name="compute"]');n&&c&&i();n.addEventListener("input",i()),c.addEventListener("input",i()),r.addEventListener("click",(function(){const e=parseFloat(n.value),t=parseFloat(c.value);n&&c&&(isNaN(e)||isNaN(t)||(t>e&&document.querySelectorAll(".circle.hidden-layer").forEach((e=>{if(parseFloat(e.querySelector(".number-box.large").value)<t){const t=e.querySelector('input[type="checkbox"]');t.checked=!0,d(t)}})),t<e&&document.querySelectorAll(".circle.hidden-layer").forEach((e=>{if(parseFloat(e.querySelector(".number-box.large").value)>t){const t=e.querySelector('input[type="checkbox"]');t.checked=!0,d(t)}})),a&&function(){const e=document.getElementById("predictionInput"),t=document.querySelector(".circle.green:last-child .number-box.large"),o=parseFloat(e.value),n=parseFloat(t.value),c=document.querySelectorAll(".circle.hidden-layer");let r="<table><thead><tr><th>Name</th><th>Value</th><th>Status</th></tr></thead><tbody>";c.forEach((e=>{const t=e.querySelector(".number-box.large").value,n=e.querySelector(".number-box.small").value;let c="ON PAR";t>o?c="TOO HIGH":t<o&&(c="TOO LOW"),r+="<tr><td>".concat(n,"</td><td>").concat(t,"</td><td>").concat(c,"</td></tr>")})),r+="</tbody></table>";let l="";l=n>o?"Output: Too High":n<o?"Output: Too Low":"Output: On Par";document.getElementById("highLowMessage").textContent=l,document.getElementById("resultsTableContainer").innerHTML=r,h(document.getElementById("resultPopup"))}()))})),document.querySelectorAll(".score").forEach((e=>{e.addEventListener("input",(function(){const e=this.closest(".circle").getAttribute("data-id");if(w(e),a){A(e,parseInt(this.textContent)||0)}}))})),document.getElementById("reset-scores").addEventListener("click",(function(){if(a&&window.confirm("Are you sure you want to reset all scores?\nThis action cannot be undone.")){const e=Array.from(document.querySelectorAll(".circle")),t=e.map((e=>{const t=e.getAttribute("data-id");return window.db.ref("neurons/"+t).update({score:"0",fill:"0"})}));Promise.all(t).then((()=>{console.log("All scores reset successfully"),e.forEach((e=>{e.querySelector(".score").textContent="0";const t=e.querySelector(".fill");t&&(t.style.height="0%")})),E()})).catch((e=>{console.error("Error resetting scores:",e)}))}else window.alert("You must be logged in and in a group session to reset scores."),console.log("Reset scores cancelled")}))}(),console.log("SETTING UP setupScoreChangeListeners"),function(){const e=document.querySelectorAll(".score-change[up-id]"),t=document.querySelectorAll(".score-change[down-id]");e.forEach((e=>{e.addEventListener("click",(function(){const e=this.getAttribute("up-id"),t=document.querySelector('.score[score-id="'.concat(e,'"]'));if(t){let o=parseInt(t.textContent)||0;o+=1,t.textContent=o,w(e),E(),a&&A(e,o)}}))})),t.forEach((e=>{e.addEventListener("click",(function(){const e=this.getAttribute("down-id"),t=document.querySelector('.score[score-id="'.concat(e,'"]'));if(t){let o=parseInt(t.textContent)||0;o-=1,t.textContent=o,w(e),E(),a&&A(e,o)}}))}))}(),console.log("SETTING UP setupBonusListeners"),document.getElementById("add3").addEventListener("click",(function(){f(3),E()})),document.getElementById("add5").addEventListener("click",(function(){this.disabled=!0,f(5,(()=>{this.disabled=!1})),E()})),console.log("SETTING UP setupResultsPopupListeners"),function(){const e=document.getElementById("resultPopup"),t=e.querySelector(".popup-header"),o=e.querySelector(".close-btn"),n=e.querySelector(".resize-handle");o.addEventListener("click",(function(){e.style.display="none"})),t.onmousedown=function(t){let o=t.clientX-e.getBoundingClientRect().left,n=t.clientY-e.getBoundingClientRect().top;function c(t,c){e.style.left=t-o+"px",e.style.top=c-n+"px"}function r(e){c(e.pageX,e.pageY)}document.addEventListener("mousemove",r),document.onmouseup=function(){document.removeEventListener("mousemove",r),document.onmouseup=null}},t.ondragstart=function(){return!1},n.onmousedown=function(t){t.preventDefault();let o=t.clientX,n=t.clientY,c=parseInt(document.defaultView.getComputedStyle(e).width,10),r=parseInt(document.defaultView.getComputedStyle(e).height,10);function l(t){e.style.width=c+t.clientX-o+"px",e.style.height=r+t.clientY-n+"px"}document.addEventListener("mousemove",l),document.onmouseup=function(){document.removeEventListener("mousemove",l),document.onmouseup=null}}}(),console.log("SETTING UP setupResetTickboxesButton"),function(){const e=document.getElementById("reset-ticks");e&&e.addEventListener("click",(function(){document.querySelectorAll(".checkbox").forEach((e=>{e.checked=!1,d(e)}))}))}(),console.log("SETTING UP setupMaxScoreButtons"),function(){const e=document.getElementById("score-range-max"),t=document.getElementById("score-range-inc"),o=document.getElementById("score-range-dec");let n=30;e.textContent=n,t.addEventListener("click",(()=>{n+=5,e.textContent=n,E()})),o.addEventListener("click",(()=>{n>5&&(n-=5,e.textContent=n,E())}))}(),console.log("SETTING UP setupSettingButton"),function(){const e=document.getElementById("settings-icon"),t=[document.getElementById("reset-scores"),document.getElementById("reset-ticks"),document.getElementById("score-range-max"),document.getElementById("score-range-dec"),document.getElementById("score-range-inc"),document.getElementById("save-game"),document.getElementById("load-game")];e.addEventListener("click",(function(){this.classList.add("wobble"),setTimeout((()=>{this.classList.remove("wobble")}),500),t.forEach((e=>{"none"===e.style.display?e.style.display="":e.style.display="none"}))}))}(),console.log("SETTING UP setupNeuronListeners"),document.querySelectorAll(".circle").forEach((e=>{const t=e.getAttribute("data-id");if(!t)return void console.error("Neuron element missing data-id",e);e.querySelectorAll("input.number-box").forEach((e=>{e.addEventListener("input",(function(){const e=this.classList.contains("large")?"large":"small",o=this.value.trim();o&&L(t,e,o)}))}));const o=e.querySelector(".score");o&&new MutationObserver((e=>{e.forEach((e=>{if("characterData"===e.type||"childList"===e.type){const e=parseInt(o.textContent||o.value,10);isNaN(e)||L(t,"score",e)}}))})).observe(o,{characterData:!0,childList:!0,subtree:!0})})),console.log("SETTING UP loadAllNeuronData"),I(),console.log("SETTING UP updateNeuronFills"),E(),console.log("CHECKING AUTH STATE"),function(){const e=document.getElementById("sign-in"),t=document.getElementById("sign-out"),o=document.getElementById("sign-in-status"),n=document.getElementById("main-content");window.auth.onAuthStateChanged((c=>{c?(o.textContent="Signed in as ".concat(c.displayName),e.style.display="none",t.style.display="block",n.style.display="block",a=!0,u(),I()):(o.textContent="Signed out",e.style.display="block",t.style.display="none",a=!1,u(),console.log("checkAuthState: User is signed out"))}))}(),console.log("****************FINISHED DOM LOAD***************")})),document.addEventListener("gisLoaded",(function(){console.log("Google Identity Services library is ready");try{"undefined"!==typeof google&&google.accounts&&google.accounts.id?(google.accounts.id.initialize({client_id:"786766490817-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com",callback:k,use_fedcm_for_prompt:!0}),google.accounts.id.prompt(),console.log("initializeFedCM: One Tap prompt automatically shown")):console.error("Google Identity Services library not loaded.")}catch(e){console.error("Error initializing FedCM:",e)}})),window.firebaseReady||console.error("Firebase not ready.")})),console.log("apps-scripts loaded");var B=o(1);console.log("index.js Headers and Imports loaded - React, Auth, firebase and app scripts ");const T=()=>{const e=Object(r.b)({onSuccess:e=>{console.log("Login successful:",e)},onError:e=>{console.error("Login failed:",e)},ux_mode:"popup"});return Object(B.jsx)("button",{onClick:()=>e(),children:"Sign in with Google"})},N=()=>Object(B.jsx)(r.a,{clientId:"786766490017-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com",children:Object(B.jsx)(T,{})});c.a.render(Object(B.jsx)(N,{}),document.getElementById("root")),console.log("index.js loaded")},4:function(e,t){window.onload=function(){firebase.initializeApp({apiKey:"AIzaSyD_potT3TgBJvHKhhPSKNQ-kR84BPfdBu8",authDomain:"braintrain-3bf0f.firebaseapp.com",databaseURL:"https://braintrain-3bf0f-default-rtdb.firebaseio.com",projectId:"braintrain-3bf0f",storageBucket:"braintrain-3bf0f.appspot.com",messagingSenderId:"786766490017",appId:"1:786766490017:web:2e11eb3f0b450ad9b503e0",measurementId:"G-BSCSQCBFQW"}),window.firebase=firebase,window.auth=firebase.auth(),window.db=firebase.database(),window.GoogleAuthProvider=new firebase.auth.GoogleAuthProvider,console.log("firebaseInit.js loaded",window.auth),window.firebaseReady=!0;const e=new Event("firebaseReady");document.dispatchEvent(e),window.PublicKeyCredential?navigator.credentials.get({mediation:"optional",federated:{providers:[{url:"https://accounts.google.com"}]}}).then((e=>{e&&function(e){const t=e.response;if(t){const e=t.id;firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(e)).then((e=>(console.log("User signed in with FedCM:",e.user),e.user.getIdToken()))).then((e=>{console.log("Token retrieved successfully:",e);const t=firebase.auth().currentUser.uid;return firebase.database().ref("/neurons/"+t).once("value")})).then((e=>{const t=e.val();console.log("Neuron data retrieved from database:",t)})).catch((e=>{console.error("Error during sign-in or data retrieval:",e)}))}else console.log("No assertion response received or response is invalid")}(e)})).catch((e=>{console.error("FedCM error: ",e)})):console.error("FedCM not supported")}}},[[11,1,2]]]);
//# sourceMappingURL=main.99fe9dbc.chunk.js.map