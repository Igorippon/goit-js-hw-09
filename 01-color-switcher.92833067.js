!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");n.setAttribute("disabled",!0);var r=null;function o(t,e){t.setAttribute("disabled",!0),e.removeAttribute("disabled")}e.addEventListener("click",(function(){r=setInterval((function(){var r="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.style.backgroundColor=r,o(e,n)}),1e3)})),n.addEventListener("click",(function(){clearInterval(r),o(n,e)}))}();
//# sourceMappingURL=01-color-switcher.92833067.js.map