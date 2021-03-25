/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${s}--\x3e`,i=new RegExp(`${s}|${r}`),n="$lit$";class a{constructor(e,t){this.parts=[],this.element=t;const r=[],a=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,p=-1,u=0;const{strings:m,values:{length:y}}=e;for(;u<y;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let r=0;for(let e=0;e<s;e++)o(t[e].name,n)&&r++;for(;r-- >0;){const t=m[u],s=d.exec(t)[2],r=s.toLowerCase()+n,a=e.getAttribute(r);e.removeAttribute(r);const o=a.split(i);this.parts.push({type:"attribute",index:p,name:s,strings:o}),u+=o.length-1}}"TEMPLATE"===e.tagName&&(a.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,a=t.split(i),l=a.length-1;for(let t=0;t<l;t++){let r,i=a[t];if(""===i)r=c();else{const e=d.exec(i);null!==e&&o(e[2],n)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-n.length)+e[3]),r=document.createTextNode(i)}s.insertBefore(r,e),this.parts.push({type:"node",index:++p})}""===a[l]?(s.insertBefore(c(),e),r.push(e)):e.data=a[l],u+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==h||(p++,t.insertBefore(c(),e)),h=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(r.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=a.pop()}for(const e of r)e.parentNode.removeChild(e)}}const o=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:s},parts:r}=e,i=document.createTreeWalker(s,133,null,!1);let n=u(r),a=r[n],o=-1,l=0;const c=[];let d=null;for(;i.nextNode();){o++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==a&&a.index===o;)a.index=null!==d?-1:a.index-l,n=u(r,n),a=r[n]}c.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1},m=new WeakMap,y=e=>"function"==typeof e&&m.has(e),g={},_={};class f{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],r=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let n,a=0,o=0,c=i.nextNode();for(;a<r.length;)if(n=r[a],l(n)){for(;o<n.index;)o++,"TEMPLATE"===c.nodeName&&(s.push(c),i.currentNode=c.content),null===(c=i.nextNode())&&(i.currentNode=s.pop(),c=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),S=` ${s} `;class w{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let a=0;a<e;a++){const e=this.strings[a],o=e.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===e.indexOf("--\x3e",o+1);const l=d.exec(e);t+=null===l?e+(i?S:r):e.substr(0,l.index)+l[1]+l[2]+n+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const b=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new P(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let i=0;i<t;i++){r+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(b(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||b(e)&&e===this.value||(this.value=e,y(e)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(b(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof f&&this.value.template===t)this.value.update(e.values);else{const s=new f(t,e.processor,this.options),r=s._clone();s.update(e.values),this.__commitNode(r),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,r=0;for(const i of e)s=t[r],void 0===s&&(s=new N(this.options),t.push(s),0===r?s.appendIntoPart(this):s.insertAfterPart(t[r-1])),s.setValue(i),s.commit(),r++;r<t.length&&(t.length=r,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class T extends C{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends P{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=U(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const U=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function O(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const i=e.strings.join(s);return r=t.keyString.get(i),void 0===r&&(r=new a(e,e.getTemplateElement()),t.keyString.set(i,r)),t.stringsArray.set(e.strings,r),r}const M=new Map,R=new WeakMap,$=new class{handleAttributeExpressions(e,t,s,r){const i=t[0];return"."===i?new T(e,t.slice(1),s).parts:"@"===i?[new V(e,t.slice(1),r.eventContext)]:"?"===i?[new E(e,t.slice(1),s)]:new C(e,t,s).parts}handleTextExpression(e){return new N(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const j=(e,...t)=>new w(e,t,"html",$),I=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const L=e=>t=>{const r=I(t.type,e);let i=M.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},M.set(r,i));let n=i.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(s);if(n=i.keyString.get(o),void 0===n){const s=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(s,e),n=new a(t,s),i.keyString.set(o,n)}return i.stringsArray.set(t.strings,n),n},z=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const F={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},H=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:H};class D extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const r=this._attributeNameForProperty(s,t);void 0!==r&&(this._attributeToPropertyMap.set(r,s),e.push(r))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,s,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(r){const i=this[e];this[t]=r,this.requestUpdateInternal(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=H){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,r=t.converter||F,i="function"==typeof r?r:r.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,r=t.converter;return(r&&r.toAttribute||F.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const r=this.constructor,i=r._attributeNameForProperty(e,s);if(void 0!==i){const e=r._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,r=s._attributeToPropertyMap.get(e);if(void 0!==r){const e=s.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let r=!0;if(void 0!==e){const i=this.constructor;s=s||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}D.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const Y=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class K{constructor(e,t){if(t!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Y?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Q=(e,...t)=>{const s=t.reduce(((t,s,r)=>t+(e=>{if(e instanceof K)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[r+1]),e[0]);return new K(s,G)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const X={};class Z extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),r=[];s.forEach((e=>r.unshift(e))),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Y){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new K(String(t),G)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Y?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==X&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return X}}Z.finalized=!0,Z.render=(e,s,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,n=R.has(s),a=q&&11===s.nodeType&&!!s.host,o=a&&!B.has(i),l=o?document.createDocumentFragment():s;if(((e,s,r)=>{let i=R.get(s);void 0===i&&(t(s,s.firstChild),R.set(s,i=new N(Object.assign({templateFactory:O},r))),i.appendInto(s)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:L(i)},r)),o){const e=R.get(l);R.delete(l);((e,t,s)=>{B.add(e);const r=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(r,e);const a=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{z.forEach((t=>{const s=M.get(I(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),h(e,s)}))}))})(e);const o=r.content;s?function(e,t,s=null){const{element:{content:r},parts:i}=e;if(null==s)return void r.appendChild(t);const n=document.createTreeWalker(r,133,null,!1);let a=u(i),o=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(o=p(t),s.parentNode.insertBefore(t,s));-1!==a&&i[a].index===l;){if(o>0){for(;-1!==a;)i[a].index+=o,a=u(i,a);return}a=u(i,a)}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){o.insertBefore(a,o.firstChild);const e=new Set;e.add(a),h(s,e)}})(i,l,e.value instanceof f?e.value.template:void 0),t(s,s.firstChild),s.appendChild(l),R.set(s,e)}!n&&a&&window.ShadyCSS.styleElement(s.host)};class ee{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((t=>e+=t+" ")),this.element.setAttribute("class",e)}}}const te=new WeakMap,se=(re=e=>t=>{if(!(t instanceof P)||t instanceof A||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=t,{element:r}=s;let i=te.get(t);void 0===i&&(r.setAttribute("class",s.strings.join(" ")),te.set(t,i=new Set));const n=r.classList||new ee(r);i.forEach((t=>{t in e||(n.remove(t),i.delete(t))}));for(const t in e){const s=e[t];s!=i.has(t)&&(s?(n.add(t),i.add(t)):(n.remove(t),i.delete(t)))}"function"==typeof n.commit&&n.commit()},(...e)=>{const t=re(...e);return m.set(t,!0),t});var re;window.customElements.define("card-memory",class extends Z{static get styles(){return Q`
      .game-card {
        background-color: transparent;
        width: 100px;
        height: 100px;
        perspective: 1000px;
      }
      .game-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      .game-card.show .game-card-inner {
        transform: rotateY(180deg);
      }
      .game-card-front,
      .game-card-back {
        position: absolute;
        width: 90%;
        height: 90%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border: 5px solid white;
        border-radius: 20px;
      }
      .game-card-front {
        background-color: var(--primary-color);
        color: white;
      }
      .game-card-back {
        background-color: var(--bleu);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        transform: rotateY(180deg);
      }

      .taken {
        display: none;
      }
    `}static get properties(){return{symbol:{type:String},state:{type:String}}}constructor(){super(),this.symbol="",this.state="hidden",this.stateClass={hide:!0}}__onClick(){const e=new CustomEvent("card-selected",{detail:{choice:this.symbol}});this.dispatchEvent(e)}setState(e){this.state=e,this.stateClass={hide:"hidden"===this.state,show:"show"===this.state,taken:"taken"===this.state}}render(){return j`
      <div
        @click="${this.__onClick}"
        @keydown="${this.__onClick}"
        class="game-card ${se(this.stateClass)}"
      >
        <div class="game-card-inner">
          <div class="game-card-front"></div>
          <div class="game-card-back">${this.symbol}</div>
        </div>
      </div>
    `}}),window.customElements.define("player-score-card",class extends Z{static get styles(){return Q`
      .score-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 200px;
        border-radius: 20px;
        border: 5px solid white;
        background-color: var(--bg-color-2);
        color: var(--bg-color-3);
      }
      .score-container.active {
        background-color: var(--secondary-color);
        color: white;
      }
      span {
        font-size: 2rem;
      }
    `}static get properties(){return{playerName:{type:String},score:{type:Number},active:{type:Boolean}}}constructor(){super(),this.playerName="",this.score=0,this.active="",this.activeClass={active:this.active},this.addEventListener("increment-score",(()=>{this.score+=1})),this.addEventListener("toggle-active",(()=>{this.active=!this.active}))}updated(e){super.updated(e),e.has("active")&&void 0!==this.active&&(this.activeClass={active:this.active},this.requestUpdate())}render(){return j`
      <div class="score-container ${se(this.activeClass)}">
        <h2>${this.playerName}</h2>
        <span>${this.score}</span>
      </div>
    `}}),window.customElements.define("memory-game",class extends Z{static get styles(){return Q`
      :host {
        font-size: 16px;
        font-family: sans-serif;
        --primary-color: #123c69;
        --secondary-color: #ac3b61;
        --bleu: #2880de;
        --bg-color-1: #edc7b7;
        --bg-color-2: #eee2dc;
        --bg-color-3: #bab2b5;
      }
      #board {
        background: var(--bg-color-1);
        border: 5px solid white;
        border-radius: 20px;
        padding: 40px 0;
        box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
        -webkit-box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
        -moz-box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
      }
      #score-board {
        display: flex;
        justify-content: space-around;
        margin-bottom: 40px;
      }
      .cards-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 1rem;
        column-gap: 1rem;
        justify-items: center;
        align-content: center;
      }
    `}static get properties(){return{symbols:{type:Array},playSet:{type:Array},player1:{type:Object},player2:{type:Object}}}constructor(){super(),this.availableSymbols=["🎁","🎈","🎠","🏈","🪁","🎯","🎮","🎹","🎸","🍕","🍔","🚗","🚁","🚀","🚢"],this.playSet=[],this.revealedCard1=null,this.revealedCard2=null,this.player1={name:"Player 1",score:0},this.player2={name:"Player 2",score:0},this.currentPlayer=this.player1,this.__getPlaySet(15)}__getPlaySet(e){for(let t=0;t<e;t+=1)this.playSet.push(this.availableSymbols[t]),this.playSet.push(this.availableSymbols[t]);return this.__shufflePlaySet()}__shufflePlaySet(){for(let e=this.playSet.length-1;e>0;e-=1){const t=Math.floor(Math.random()*(e+1));[this.playSet[e],this.playSet[t]]=[this.playSet[t],this.playSet[e]]}}handdlePlay(e){null===this.revealedCard1?(this.revealedCard1=e.target,this.revealedCard1.setState("show")):null===this.revealedCard2&&e.target!==this.revealedCard1&&(this.revealedCard2=e.target,this.revealedCard2.setState("show"),setTimeout((()=>{this.revealedCard1.symbol===this.revealedCard2.symbol?(this.currentPlayer.score+=1,this.incrementScore(),this.revealedCard1.setState("taken"),this.revealedCard2.setState("taken")):(this.revealedCard1.setState("hidden"),this.revealedCard2.setState("hidden"),this.passTurn()),this.revealedCard1=null,this.revealedCard2=null}),2e3))}incrementScore(){const e=new CustomEvent("increment-score");this.getPlayerCard("active").dispatchEvent(e)}getPlayerCard(e){let t;switch(e){case"active":default:if(this.currentPlayer===this.player1){t=this.shadowRoot.getElementById("player1");break}t=this.shadowRoot.getElementById("player2");break;case"inactive":if(this.currentPlayer===this.player1){t=this.shadowRoot.getElementById("player2");break}t=this.shadowRoot.getElementById("player1")}return t}passTurn(){this.currentPlayer===this.player1?this.currentPlayer=this.player2:this.currentPlayer=this.player1;const e=new CustomEvent("toggle-active");this.getPlayerCard("active").dispatchEvent(e),this.getPlayerCard("inactive").dispatchEvent(e)}render(){return j`
      <div id="board">
        <div id="score-board">
          <player-score-card
            id="player1"
            .playerName="${this.player1.name}"
            .score="${this.player1.score}"
            .active="${this.currentPlayer===this.player1}"
          >
          </player-score-card>
          <player-score-card
            id="player2"
            .playerName="${this.player2.name}"
            .score="${this.player2.score}"
            .active="${this.currentPlayer===this.player2}"
          >
          </player-score-card>
        </div>
        <div class="cards-wrapper">
          ${this.playSet.map((e=>j`
              <card-memory
                .symbol="${e}"
                @card-selected="${this.handdlePlay}"
              >
              </card-memory>
            `))}
        </div>
      </div>
    `}}),document.body.appendChild(document.createElement("memory-game"))})();