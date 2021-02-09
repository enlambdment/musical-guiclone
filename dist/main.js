!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){},function(e,t,n){"use strict";n.r(t);var r=n(0);n(2);let o=new mm.SoundFontPlayer("https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus");document.querySelector(".playpause-btn").addEventListener("click",(function(){document.getElementById("error");if(o.isPlaying())o.stop();else{!function(e){const t=mm.sequences.mergeConsecutiveNotes(e);o.setTempo(100),o.start(t)}(i.getNoteSequence())}})),document.querySelector(".infill-btn").addEventListener("click",(function(){const e=i.data,t=[0,3,4,7,8,9];let n=[];for(let t=0;t<i.grid_width;t++){const r=Array(i.grid_height).fill(0).map((e,t)=>e+t).filter(n=>1===e[n][t].on);n.push(r.map(e=>MAX_PITCH-e))}console.log("pitches per time:"),console.log(n);let r=Array(i.grid_height).fill(MAX_PITCH).map((e,t)=>e-t);console.log("all pitches:"),console.log(r);let o=[];for(let e=0;e<i.grid_width;e++){let i=n[e];if(0===i.length){let e=a(r);o.push(e)}else{let e=a(i),n=a(r.filter(n=>t.includes(Math.abs(n-e)%12)));o.push(n)}}console.log("infilled pitches:"),console.log(o);for(let e of o.entries())i.toggleCell(MAX_PITCH-e[1],e[0],2);return o}));const i=new r.ButtonGrid,s=[];for(let e=0;e<i.grid_height;e++)s.push({pitch:MAX_PITCH-e,velocity:80});o.loadSamples({notes:s});function a(e){var t,n;return e[(t=0,n=e.length-1,Math.floor(Math.random()*(n-t+1))+t)]}document.getElementById("container").addEventListener("click",(function(e){let t=e.target;if("BUTTON"!==t.tagName)return;{const e=parseInt(t.dataset.row),n=parseInt(t.dataset.col),r=parseInt(t.dataset.pitch);i.toggleCell(e,n,1);if(1===i.data[e][n].on){const e={pitch:r,velocity:80};o.playNoteDown(e),setTimeout(()=>o.playNoteUp(e),150)}}}))},function(e,t,n){var r=n(3);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(4)(!1)).push([e.i,"/* CSS files add styling rules to your content */\nhtml {\n/*   --size: 50px;\n  --light: #F7E6DA;\n  --purple: #09315d; */\n}\n\nbody {\n  font-family: helvetica, arial, sans-serif;\n  margin: 2em;\n  background: #d4ff70;\n}\n\nh1 {\n  font-style: italic;\n  color: purple;\n}\n\ndiv {\n  display: block;\n}\n\n/* class representing the leftmost\n   element on each row, labeling the pitch */\n.piano-key {\n  padding: 0;\n  font-size: 12px !important;\n  margin-right: 4px;\n  font-family: monospace;\n}\n\n/* class representing the squares which\n   fill in every row */\n.pixel {\n  height: 12px;\n  width: 12px;\n  padding: 0;\n  border: none;\n  margin: 1px;\n  background: #c4f5ff;\n}\n\n/* color the 1st beat of every measure slightly darker.\n   This rule should win over the general .pixel selector\n   rule, but lose to the rules on hover state & cell \n   activation\n*/\n.container .row .pixel:nth-child(4n+2) {\n  background: #b8e9f2;\n}\n\n/* make pixels opaque when in hovered-over state */\n.pixel:hover {\n  opacity: 0.7;\n}\n\n/* chained selectors for pixels in activated state.\n   I think we need an !important modifier because this rule\n   is less specific, on its own, than the rule for the start\n   beats of every measure. */\n.pixel.voice {\n  background: #000000 !important;\n}\n\n.pixel.infill {\n  background: #b26bdb !important;\n}\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map((function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"}));return[n].concat(i).concat([o]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),a=function(e,t){return t?t.querySelector(e):document.querySelector(e)},l=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=a.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),c=null,u=0,f=[],p=n(6);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(b(r.parts[s],t))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(b(r.parts[s],t));i[r.id]={id:r.id,refs:1,parts:a}}}}function h(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],s=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function v(e,t){var n=l(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),f.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=l(e.insertAt.before,n);n.insertBefore(t,o)}}function m(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);t>=0&&f.splice(t,1)}function g(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return y(t,e.attrs),v(e,t),t}function y(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}function b(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var s=u++;n=c||(c=g(t)),r=S.bind(null,n,s,!1),o=S.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",y(t,e.attrs),v(e,t),t}(t),r=U.bind(null,n,t),o=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(t),r=j.bind(null,n),o=function(){m(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=h(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(a=i[s.id]).refs--,r.push(a)}e&&d(h(e,t),t);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete i[a.id]}}}};var w,x=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function S(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function j(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function U(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=p(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}}]);