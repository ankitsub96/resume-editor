import{n as e,t}from"./rolldown-runtime-DF2fYuay.js";var n=t((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function M(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=N(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(M(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function F(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var I=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},L={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=L,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:F}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,I)}catch(e){I(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.5`})),r=t(((e,t)=>{t.exports=n()})),i=e(r());function a(e){if(e&&!(typeof window>`u`)){var t=document.createElement(`style`);return t.setAttribute(`type`,`text/css`),t.innerHTML=e,document.head.appendChild(t),e}}var o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},o.apply(this,arguments)};function s(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function c(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),i,a=[],o;try{for(;(t===void 0||t-- >0)&&!(i=r.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}function l(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(c(arguments[t]));return e}a(`.colorpicker {
  background-color: #fff;
  z-index: 1;
}
.colorpicker * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.colorpicker .colorpicker-form {
  display: flex;
}
.colorpicker .colorpicker-form .colorpicker-hex {
  padding-right: 16px;
}
.colorpicker .colorpicker-form .colorpicker-alpha {
  flex-basis: 82px;
}
.colorpicker .color-picker-panel-wrap-has-alpha {
  display: flex;
  height: 36px;
}
.colorpicker-static {
  position: absolute;
  top: 5px;
  left: 0;
}
.colorpicker .color-picker-panel {
  background-color: #fff;
  box-sizing: border-box;
  outline: none;
  z-index: 9;
  padding-bottom: 20px;
  border-radius: 4px;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.colorpicker .color-picker-panel-ribbon {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAlIiBzdG9wLWNvbG9yPSIjZmY5OTAwIiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjIwJSIgc3RvcC1jb2xvcj0iI2NkZmYwMCIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiMzNWZmMDAiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iNDAlIiBzdG9wLWNvbG9yPSIjMDBmZjY2IiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzAwZmZmZCIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiMwMDY2ZmYiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMzIwMGZmIiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjgwJSIgc3RvcC1jb2xvcj0iI2NkMDBmZiIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSI5MCUiIHN0b3AtY29sb3I9IiNmZjAwOTkiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmMDAwMCIgc3RvcC1vcGFjaXR5PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=);
  background-image: -webkit-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: -moz-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: -o-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
}
.colorpicker .color-picker-panel-ribbon-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAlIiBzdG9wLWNvbG9yPSIjZmY5OTAwIiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjIwJSIgc3RvcC1jb2xvcj0iI2NkZmYwMCIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiMzNWZmMDAiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iNDAlIiBzdG9wLWNvbG9yPSIjMDBmZjY2IiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzAwZmZmZCIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiMwMDY2ZmYiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMzIwMGZmIiBzdG9wLW9wYWNpdHk9IjEiLz48c3RvcCBvZmZzZXQ9IjgwJSIgc3RvcC1jb2xvcj0iI2NkMDBmZiIgc3RvcC1vcGFjaXR5PSIxIi8+PHN0b3Agb2Zmc2V0PSI5MCUiIHN0b3AtY29sb3I9IiNmZjAwOTkiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmMDAwMCIgc3RvcC1vcGFjaXR5PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=);
  background-image: -webkit-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: -moz-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: -o-linear-gradient(left, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
  background-image: linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%);
}
.colorpicker .color-picker-panel-ribbon-handler {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: grab;
}
.colorpicker .color-picker-panel-ribbon span {
  position: absolute;
  top: -3px;
  display: block;
  height: 14px;
  width: 14px;
  padding: 1px 0;
  border-radius: 50%;
  margin-left: -7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  border: solid 2px #fff;
  cursor: grab;
}
.colorpicker .color-picker-panel-alpha {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(to right, transparent, black), url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 100%, 6px;
  background-repeat: repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.colorpicker .color-picker-panel-alpha-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.colorpicker .color-picker-panel-alpha-handler {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: grab;
}
.colorpicker .color-picker-panel-alpha span {
  position: absolute;
  top: -3px;
  height: 14px;
  width: 14px;
  padding: 1px 0;
  margin-left: -7px;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  border: solid 2px #fff;
  cursor: grab;
}
.colorpicker .color-picker-panel-open {
  display: block;
}
.colorpicker .color-picker-panel-close {
  display: none;
}
.colorpicker .color-picker-panel-inner {
  position: relative;
}
.colorpicker .color-picker-panel-preview {
  height: 30px;
  width: 30px;
  overflow: hidden;
  border-radius: 2px;
  background-image: url("data:image/png;base64,R0lGODdhCgAKAPAAAOXl5f///ywAAAAACgAKAEACEIQdqXt9GxyETrI279OIgwIAOw==");
}
.colorpicker .color-picker-panel-preview span,
.colorpicker .color-picker-panel-preview input[type=color] {
  position: absolute;
  display: block;
  height: 100%;
  width: 30px;
  border-radius: 2px;
}
.colorpicker .color-picker-panel-preview span {
  box-shadow: 0 0 2px #808080 inset;
}
.colorpicker .color-picker-panel-preview input[type=color] {
  opacity: 0;
}
.colorpicker .color-picker-panel-wrap {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.colorpicker .color-picker-panel-wrap-preview {
  position: absolute;
  right: 8px;
  display: none;
}
.colorpicker .color-picker-panel-wrap-ribbon {
  height: 8px;
}
.colorpicker .color-picker-panel-wrap-alpha {
  height: 8px;
}
.colorpicker .color-picker-panel-wrap-ribbon {
  height: 8px;
}
.colorpicker .color-picker-panel-board {
  position: relative;
  margin-bottom: 16px;
  font-size: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.colorpicker .color-picker-panel-board-hsv {
  width: 100%;
  height: 120px;
  position: relative;
  z-index: 1;
  border-radius: 6px;
}
.colorpicker .color-picker-panel-board-value {
  border-radius: 6px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9InJnYigwLDAsMCkiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=);
  background-image: -webkit-linear-gradient(top, transparent 0%, #000000 100%);
  background-image: -moz-linear-gradient(top, transparent 0%, #000000 100%);
  background-image: -o-linear-gradient(top, transparent 0%, #000000 100%);
  background-image: linear-gradient(to bottom, transparent 0%, #000000 100%);
}
.colorpicker .color-picker-panel-board-saturation {
  border-radius: 6px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9Imxlc3NoYXQtZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0icmdiKDAsMCwwKSIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=);
  background-image: -webkit-linear-gradient(left, #fff 0%, transparent 100%);
  background-image: -moz-linear-gradient(left, #fff 0%, transparent 100%);
  background-image: -o-linear-gradient(left, #fff 0%, transparent 100%);
  background-image: linear-gradient(to right, #fff 0%, transparent 100%);
}
.colorpicker .color-picker-panel-board-handler {
  cursor: grab;
  cursor: -webkit-grab;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.colorpicker .color-picker-panel-board span {
  position: absolute;
  border-radius: 10px;
  width: 14px;
  height: 14px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  border: solid 2px #fff;
  left: -999px;
  top: -999px;
  z-index: 2;
}
.colorpicker .color-picker-panel-params {
  font-size: 12px;
}
.colorpicker .color-picker-panel-params-input {
  overflow: hidden;
  padding: 2px 8px;
}
.colorpicker .color-picker-panel-params-hex {
  width: 52px;
}
.colorpicker .color-picker-panel-params-lable {
  padding: 2px 8px;
  height: 22px;
  line-height: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.colorpicker .color-picker-panel-params-lable-hex {
  width: 52px;
}
.colorpicker .color-picker-panel-params-lable-number, .colorpicker .color-picker-panel-params-lable-alpha {
  margin-left: 5px;
  width: 44px;
  text-transform: uppercase;
}
.colorpicker .color-picker-panel-params-lable-number:hover {
  border-radius: 2px;
  background-color: #eee;
  box-shadow: 0 0 0 1px #ccc inset;
  cursor: grab;
}
.colorpicker .color-picker-panel-params-lable label {
  float: left;
  text-align: center;
}
.colorpicker .color-picker-panel-params-has-alpha input[type=number] {
  width: 32px;
}
.colorpicker .color-picker-panel-params input {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  text-align: center;
  padding: 1px;
  margin: 0;
  float: left;
  border-radius: 2px;
  border: 1px solid #cacaca;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
.colorpicker .color-picker-trigger {
  border: 1px solid #999;
  display: inline-block;
  padding: 2px;
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 20px;
  height: 20px;
  cursor: grab;
  box-shadow: 0 0 0 2px #fff inset;
}
.colorpicker .color-picker-trigger-open {
  box-shadow: 0px 0px 3px #999;
}

.color-picker-panel-params-has-alpha .color-picker-panel-params-lable-number,
.color-picker-panel-params-has-alpha .color-picker-panel-params-lable-alpha {
  width: 32px;
}

.color-picker {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 1000;
}
.color-picker-wrap {
  display: inline-block;
}
.color-picker-slide-up-enter {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  display: block !important;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.color-picker-slide-up-appear {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  display: block !important;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.color-picker-slide-up-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  display: block !important;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
  animation-play-state: paused;
}

.color-picker-slide-up-enter.color-picker-slide-up-enter-active.color-picker-placement-bottomLeft,
.color-picker-slide-up-enter.color-picker-slide-up-enter-active.color-picker-placement-bottomRight,
.color-picker-slide-up-appear.color-picker-slide-up-appear-active.color-picker-placement-bottomLeft,
.color-picker-slide-up-appear.color-picker-slide-up-appear-active.color-picker-placement-bottomRight {
  animation-name: rcColorPickerSlideUpIn;
  animation-play-state: running;
}

.color-picker-slide-up-enter.color-picker-slide-up-enter-active.color-picker-placement-topLeft,
.color-picker-slide-up-enter.color-picker-slide-up-enter-active.color-picker-placement-topRight,
.color-picker-slide-up-appear.color-picker-slide-up-appear-active.color-picker-placement-topLeft,
.color-picker-slide-up-appear.color-picker-slide-up-appear-active.color-picker-placement-topRight {
  animation-name: rcColorPickerSlideDownIn;
  animation-play-state: running;
}

.color-picker-slide-up-leave.color-picker-slide-up-leave-active.color-picker-placement-bottomLeft,
.color-picker-slide-up-leave.color-picker-slide-up-leave-active.color-picker-placement-bottomRight {
  animation-name: rcColorPickerSlideUpOut;
  animation-play-state: running;
}

.color-picker-slide-up-leave.color-picker-slide-up-leave-active.color-picker-placement-topLeft,
.color-picker-slide-up-leave.color-picker-slide-up-leave-active.color-picker-placement-topRight {
  animation-name: rcColorPickerSlideDownOut;
  animation-play-state: running;
}

.gradient-interaction {
  flex-direction: column;
  display: flex;
  z-index: 1;
}
.gradient-interaction .gradient-result {
  height: 74px;
  width: 100%;
  position: relative;
  border-radius: 6px;
  margin-top: 18px;
  flex-grow: 1;
  font-size: 16px;
}
.gradient-interaction .gradient-result:hover .gradient-angle {
  opacity: 1;
}
.gradient-interaction .gradient-result .gradient-mode {
  height: 32px;
  width: 32px;
  position: relative;
  top: 20px;
  left: 16px;
  border: 2px solid white;
  border-radius: 0.15em;
  cursor: pointer;
  opacity: 0.25;
  transition: all 0.3s;
}
.gradient-interaction .gradient-result .gradient-mode::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transition: all 0.3s;
}
.gradient-interaction .gradient-result .gradient-mode:hover {
  opacity: 1;
}
.gradient-interaction .gradient-result .gradient-mode[data-mode=linear]::before {
  height: 2px;
  width: 70%;
  background: white;
  transform: rotate(45deg);
  border-radius: 50em;
}
.gradient-interaction .gradient-result .gradient-mode[data-mode=radial]::before {
  height: 50%;
  width: 50%;
  border-radius: 100%;
  border: 2px solid white;
  background-color: white;
}
.gradient-interaction .gradient-result .gradient-mode[data-mode=radial]::before + .gradient-angle {
  opacity: 0;
}
.gradient-interaction .gradient-result .gradient-mode[data-mode=radial] + .gradient-angle {
  opacity: 0;
}
.gradient-interaction .gradient-result .gradient-angle {
  height: 0.35em;
  width: 0.35em;
  background: white;
  border-radius: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
  position: absolute;
  margin: auto;
  opacity: 0.25;
}
.gradient-interaction .gradient-result .gradient-angle > div {
  height: 2px;
  width: 2em;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  position: absolute;
  background: white;
  border-radius: 1em;
  margin: auto 0;
  transform-origin: left;
}
.gradient-interaction .gradient-result .gradient-pos {
  height: 5em;
  width: 5em;
  display: grid;
  display: -ms-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  -ms-grid-columns: 1fr 1fr 1fr;
  -ms-grid-rows: 1fr 1fr 1fr;
  opacity: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
  position: absolute;
  margin: auto;
}
.gradient-interaction .gradient-result .gradient-pos > div {
  height: 15px;
  width: 15px;
  border: 2px solid transparent;
  position: relative;
  margin: auto;
  transition: all 0.3s;
}
.gradient-interaction .gradient-result .gradient-pos > div:not(.gradient-active) {
  cursor: pointer;
}
.gradient-interaction .gradient-result .gradient-pos > div::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 5px;
  width: 5px;
  border-radius: 100%;
  background: white;
  transition: all 0.3s;
  opacity: 0.25;
  margin: auto;
}
.gradient-interaction .gradient-result .gradient-pos > div:hover::before {
  opacity: 1;
}
.gradient-interaction .gradient-result .gradient-pos > div.gradient-active {
  border-color: white;
  border-radius: 100%;
}
.gradient-interaction .gradient-result .gradient-pos > div.gradient-active::before {
  opacity: 1;
}
.gradient-interaction .gradient-stops {
  margin-top: 18px;
}
.gradient-interaction .gradient-stops .gradient-stop-preview {
  height: 8px;
  width: 100%;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.gradient-interaction .gradient-stops .gradient-stop-preview::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 8px;
  border-radius: 4px;
  z-index: -1;
}
.gradient-interaction .gradient-stops .gradient-stop-marker {
  position: relative;
  z-index: 1;
}
.gradient-interaction .gradient-stops .gradient-stop-marker .gradient-marker {
  height: 14px;
  width: 14px;
  position: absolute;
  background: currentColor;
  margin: -11px 0 0 -7px;
  border-radius: 100%;
  border: 2px solid white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  transition: opacity 0.15s;
  cursor: grab;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.gradient-interaction .gradient-stops .gradient-stop-marker .gradient-marker::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
  background-size: 4px;
  border-radius: 100%;
  z-index: -1;
}
.gradient-interaction .gradient-stops .gradient-stop-marker .gradient-marker.hide {
  opacity: 0;
}
.gradient-interaction .gradient-stops .gradient-stop-marker .gradient-marker.active {
  border-width: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.6);
}

.default-color-panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  grid-gap: 6px;
  justify-content: space-between;
  margin: 14px -16px 0px -16px;
  padding: 2px 16px 1px 16px;
  overflow: auto;
  max-height: 105px;
}
.default-color-panel .default-color-panel_item {
  height: 30px;
  width: 30px;
  cursor: pointer;
  position: relative;
  outline: none;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px #bbbfc5;
}
.default-color-panel .default-color-panel_item.default-color-panel_item-active {
  user-select: none;
}
.default-color-panel .default-color-panel_item.default-color-panel_item-active .item_qub {
  position: absolute;
  inset: 35%;
  background: white;
  border-radius: 50%;
  opacity: 1;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.38);
}

@keyframes rcColorPickerSlideUpIn {
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
}
@keyframes rcColorPickerSlideUpOut {
  0% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0);
  }
}
@keyframes rcColorPickerSlideDownIn {
  0% {
    opacity: 0;
    transform-origin: 100% 100%;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform-origin: 100% 100%;
    transform: scaleY(1);
  }
}
@keyframes rcColorPickerSlideDownOut {
  0% {
    opacity: 1;
    transform-origin: 100% 100%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 100% 100%;
    transform: scaleY(0);
  }
}`);function u(e){var t={exports:{}};return e(t,t.exports),t.exports}var d=u(function(e){(function(t){var n=/^\s+/,r=/\s+$/,i=0,a=t.round,o=t.min,s=t.max,c=t.random;function l(e,t){if(e||=``,t||={},e instanceof l)return e;if(!(this instanceof l))return new l(e,t);var n=u(e);this._originalInput=e,this._r=n.r,this._g=n.g,this._b=n.b,this._a=n.a,this._roundA=a(100*this._a)/100,this._format=t.format||n.format,this._gradientType=t.gradientType,this._r<1&&(this._r=a(this._r)),this._g<1&&(this._g=a(this._g)),this._b<1&&(this._b=a(this._b)),this._ok=n.ok,this._tc_id=i++}l.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3},getLuminance:function(){var e=this.toRgb(),n=e.r/255,r=e.g/255,i=e.b/255,a=n<=.03928?n/12.92:t.pow((n+.055)/1.055,2.4),o=r<=.03928?r/12.92:t.pow((r+.055)/1.055,2.4),s=i<=.03928?i/12.92:t.pow((i+.055)/1.055,2.4);return .2126*a+.7152*o+.0722*s},setAlpha:function(e){return this._a=F(e),this._roundA=a(100*this._a)/100,this},toHsv:function(){var e=m(this._r,this._g,this._b);return{h:e.h*360,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=m(this._r,this._g,this._b),t=a(e.h*360),n=a(e.s*100),r=a(e.v*100);return this._a==1?`hsv(`+t+`, `+n+`%, `+r+`%)`:`hsva(`+t+`, `+n+`%, `+r+`%, `+this._roundA+`)`},toHsl:function(){var e=f(this._r,this._g,this._b);return{h:e.h*360,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=f(this._r,this._g,this._b),t=a(e.h*360),n=a(e.s*100),r=a(e.l*100);return this._a==1?`hsl(`+t+`, `+n+`%, `+r+`%)`:`hsla(`+t+`, `+n+`%, `+r+`%, `+this._roundA+`)`},toHex:function(e){return g(this._r,this._g,this._b,e)},toHexString:function(e){return`#`+this.toHex(e)},toHex8:function(e){return _(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return`#`+this.toHex8(e)},toRgb:function(){return{r:a(this._r),g:a(this._g),b:a(this._b),a:this._a}},toRgbString:function(){return this._a==1?`rgb(`+a(this._r)+`, `+a(this._g)+`, `+a(this._b)+`)`:`rgba(`+a(this._r)+`, `+a(this._g)+`, `+a(this._b)+`, `+this._roundA+`)`},toPercentageRgb:function(){return{r:a(I(this._r,255)*100)+`%`,g:a(I(this._g,255)*100)+`%`,b:a(I(this._b,255)*100)+`%`,a:this._a}},toPercentageRgbString:function(){return this._a==1?`rgb(`+a(I(this._r,255)*100)+`%, `+a(I(this._g,255)*100)+`%, `+a(I(this._b,255)*100)+`%)`:`rgba(`+a(I(this._r,255)*100)+`%, `+a(I(this._g,255)*100)+`%, `+a(I(this._b,255)*100)+`%, `+this._roundA+`)`},toName:function(){return this._a===0?`transparent`:this._a<1?!1:N[g(this._r,this._g,this._b,!0)]||!1},toFilter:function(e){var t=`#`+v(this._r,this._g,this._b,this._a),n=t,r=this._gradientType?`GradientType = 1, `:``;if(e){var i=l(e);n=`#`+v(i._r,i._g,i._b,i._a)}return`progid:DXImageTransform.Microsoft.gradient(`+r+`startColorstr=`+t+`,endColorstr=`+n+`)`},toString:function(e){var t=!!e;e||=this._format;var n=!1,r=this._a<1&&this._a>=0;return!t&&r&&(e===`hex`||e===`hex6`||e===`hex3`||e===`hex4`||e===`hex8`||e===`name`)?e===`name`&&this._a===0?this.toName():this.toRgbString():(e===`rgb`&&(n=this.toRgbString()),e===`prgb`&&(n=this.toPercentageRgbString()),(e===`hex`||e===`hex6`)&&(n=this.toHexString()),e===`hex3`&&(n=this.toHexString(!0)),e===`hex4`&&(n=this.toHex8String(!0)),e===`hex8`&&(n=this.toHex8String()),e===`name`&&(n=this.toName()),e===`hsl`&&(n=this.toHslString()),e===`hsv`&&(n=this.toHsvString()),n||this.toHexString())},clone:function(){return l(this.toString())},_applyModification:function(e,t){var n=e.apply(null,[this].concat([].slice.call(t)));return this._r=n._r,this._g=n._g,this._b=n._b,this.setAlpha(n._a),this},lighten:function(){return this._applyModification(S,arguments)},brighten:function(){return this._applyModification(C,arguments)},darken:function(){return this._applyModification(w,arguments)},desaturate:function(){return this._applyModification(y,arguments)},saturate:function(){return this._applyModification(b,arguments)},greyscale:function(){return this._applyModification(x,arguments)},spin:function(){return this._applyModification(T,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(A,arguments)},complement:function(){return this._applyCombination(E,arguments)},monochromatic:function(){return this._applyCombination(j,arguments)},splitcomplement:function(){return this._applyCombination(k,arguments)},triad:function(){return this._applyCombination(D,arguments)},tetrad:function(){return this._applyCombination(O,arguments)}},l.fromRatio=function(e,t){if(typeof e==`object`){var n={};for(var r in e)e.hasOwnProperty(r)&&(r===`a`?n[r]=e[r]:n[r]=H(e[r]));e=n}return l(e,t)};function u(e){var t={r:0,g:0,b:0},n=1,r=null,i=null,a=null,c=!1,l=!1;return typeof e==`string`&&(e=q(e)),typeof e==`object`&&(K(e.r)&&K(e.g)&&K(e.b)?(t=d(e.r,e.g,e.b),c=!0,l=String(e.r).substr(-1)===`%`?`prgb`:`rgb`):K(e.h)&&K(e.s)&&K(e.v)?(r=H(e.s),i=H(e.v),t=h(e.h,r,i),c=!0,l=`hsv`):K(e.h)&&K(e.s)&&K(e.l)&&(r=H(e.s),a=H(e.l),t=p(e.h,r,a),c=!0,l=`hsl`),e.hasOwnProperty(`a`)&&(n=e.a)),n=F(n),{ok:c,format:e.format||l,r:o(255,s(t.r,0)),g:o(255,s(t.g,0)),b:o(255,s(t.b,0)),a:n}}function d(e,t,n){return{r:I(e,255)*255,g:I(t,255)*255,b:I(n,255)*255}}function f(e,t,n){e=I(e,255),t=I(t,255),n=I(n,255);var r=s(e,t,n),i=o(e,t,n),a,c,l=(r+i)/2;if(r==i)a=c=0;else{var u=r-i;switch(c=l>.5?u/(2-r-i):u/(r+i),r){case e:a=(t-n)/u+(t<n?6:0);break;case t:a=(n-e)/u+2;break;case n:a=(e-t)/u+4;break}a/=6}return{h:a,s:c,l}}function p(e,t,n){var r,i,a;e=I(e,360),t=I(t,100),n=I(n,100);function o(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}if(t===0)r=i=a=n;else{var s=n<.5?n*(1+t):n+t-n*t,c=2*n-s;r=o(c,s,e+1/3),i=o(c,s,e),a=o(c,s,e-1/3)}return{r:r*255,g:i*255,b:a*255}}function m(e,t,n){e=I(e,255),t=I(t,255),n=I(n,255);var r=s(e,t,n),i=o(e,t,n),a,c,l=r,u=r-i;if(c=r===0?0:u/r,r==i)a=0;else{switch(r){case e:a=(t-n)/u+(t<n?6:0);break;case t:a=(n-e)/u+2;break;case n:a=(e-t)/u+4;break}a/=6}return{h:a,s:c,v:l}}function h(e,n,r){e=I(e,360)*6,n=I(n,100),r=I(r,100);var i=t.floor(e),a=e-i,o=r*(1-n),s=r*(1-a*n),c=r*(1-(1-a)*n),l=i%6,u=[r,s,o,o,c,r][l],d=[c,r,r,s,o,o][l],f=[o,o,c,r,r,s][l];return{r:u*255,g:d*255,b:f*255}}function g(e,t,n,r){var i=[V(a(e).toString(16)),V(a(t).toString(16)),V(a(n).toString(16))];return r&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join(``)}function _(e,t,n,r,i){var o=[V(a(e).toString(16)),V(a(t).toString(16)),V(a(n).toString(16)),V(U(r))];return i&&o[0].charAt(0)==o[0].charAt(1)&&o[1].charAt(0)==o[1].charAt(1)&&o[2].charAt(0)==o[2].charAt(1)&&o[3].charAt(0)==o[3].charAt(1)?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0):o.join(``)}function v(e,t,n,r){return[V(U(r)),V(a(e).toString(16)),V(a(t).toString(16)),V(a(n).toString(16))].join(``)}l.equals=function(e,t){return!e||!t?!1:l(e).toRgbString()==l(t).toRgbString()},l.random=function(){return l.fromRatio({r:c(),g:c(),b:c()})};function y(e,t){t=t===0?0:t||10;var n=l(e).toHsl();return n.s-=t/100,n.s=L(n.s),l(n)}function b(e,t){t=t===0?0:t||10;var n=l(e).toHsl();return n.s+=t/100,n.s=L(n.s),l(n)}function x(e){return l(e).desaturate(100)}function S(e,t){t=t===0?0:t||10;var n=l(e).toHsl();return n.l+=t/100,n.l=L(n.l),l(n)}function C(e,t){t=t===0?0:t||10;var n=l(e).toRgb();return n.r=s(0,o(255,n.r-a(255*-(t/100)))),n.g=s(0,o(255,n.g-a(255*-(t/100)))),n.b=s(0,o(255,n.b-a(255*-(t/100)))),l(n)}function w(e,t){t=t===0?0:t||10;var n=l(e).toHsl();return n.l-=t/100,n.l=L(n.l),l(n)}function T(e,t){var n=l(e).toHsl(),r=(n.h+t)%360;return n.h=r<0?360+r:r,l(n)}function E(e){var t=l(e).toHsl();return t.h=(t.h+180)%360,l(t)}function D(e){var t=l(e).toHsl(),n=t.h;return[l(e),l({h:(n+120)%360,s:t.s,l:t.l}),l({h:(n+240)%360,s:t.s,l:t.l})]}function O(e){var t=l(e).toHsl(),n=t.h;return[l(e),l({h:(n+90)%360,s:t.s,l:t.l}),l({h:(n+180)%360,s:t.s,l:t.l}),l({h:(n+270)%360,s:t.s,l:t.l})]}function k(e){var t=l(e).toHsl(),n=t.h;return[l(e),l({h:(n+72)%360,s:t.s,l:t.l}),l({h:(n+216)%360,s:t.s,l:t.l})]}function A(e,t,n){t||=6,n||=30;var r=l(e).toHsl(),i=360/n,a=[l(e)];for(r.h=(r.h-(i*t>>1)+720)%360;--t;)r.h=(r.h+i)%360,a.push(l(r));return a}function j(e,t){t||=6;for(var n=l(e).toHsv(),r=n.h,i=n.s,a=n.v,o=[],s=1/t;t--;)o.push(l({h:r,s:i,v:a})),a=(a+s)%1;return o}l.mix=function(e,t,n){n=n===0?0:n||50;var r=l(e).toRgb(),i=l(t).toRgb(),a=n/100;return l({r:(i.r-r.r)*a+r.r,g:(i.g-r.g)*a+r.g,b:(i.b-r.b)*a+r.b,a:(i.a-r.a)*a+r.a})},l.readability=function(e,n){var r=l(e),i=l(n);return(t.max(r.getLuminance(),i.getLuminance())+.05)/(t.min(r.getLuminance(),i.getLuminance())+.05)},l.isReadable=function(e,t,n){var r=l.readability(e,t),i,a=!1;switch(i=ee(n),i.level+i.size){case`AAsmall`:case`AAAlarge`:a=r>=4.5;break;case`AAlarge`:a=r>=3;break;case`AAAsmall`:a=r>=7;break}return a},l.mostReadable=function(e,t,n){var r=null,i=0,a,o,s,c;n||={},o=n.includeFallbackColors,s=n.level,c=n.size;for(var u=0;u<t.length;u++)a=l.readability(e,t[u]),a>i&&(i=a,r=l(t[u]));return l.isReadable(e,r,{level:s,size:c})||!o?r:(n.includeFallbackColors=!1,l.mostReadable(e,[`#fff`,`#000`],n))};var M=l.names={aliceblue:`f0f8ff`,antiquewhite:`faebd7`,aqua:`0ff`,aquamarine:`7fffd4`,azure:`f0ffff`,beige:`f5f5dc`,bisque:`ffe4c4`,black:`000`,blanchedalmond:`ffebcd`,blue:`00f`,blueviolet:`8a2be2`,brown:`a52a2a`,burlywood:`deb887`,burntsienna:`ea7e5d`,cadetblue:`5f9ea0`,chartreuse:`7fff00`,chocolate:`d2691e`,coral:`ff7f50`,cornflowerblue:`6495ed`,cornsilk:`fff8dc`,crimson:`dc143c`,cyan:`0ff`,darkblue:`00008b`,darkcyan:`008b8b`,darkgoldenrod:`b8860b`,darkgray:`a9a9a9`,darkgreen:`006400`,darkgrey:`a9a9a9`,darkkhaki:`bdb76b`,darkmagenta:`8b008b`,darkolivegreen:`556b2f`,darkorange:`ff8c00`,darkorchid:`9932cc`,darkred:`8b0000`,darksalmon:`e9967a`,darkseagreen:`8fbc8f`,darkslateblue:`483d8b`,darkslategray:`2f4f4f`,darkslategrey:`2f4f4f`,darkturquoise:`00ced1`,darkviolet:`9400d3`,deeppink:`ff1493`,deepskyblue:`00bfff`,dimgray:`696969`,dimgrey:`696969`,dodgerblue:`1e90ff`,firebrick:`b22222`,floralwhite:`fffaf0`,forestgreen:`228b22`,fuchsia:`f0f`,gainsboro:`dcdcdc`,ghostwhite:`f8f8ff`,gold:`ffd700`,goldenrod:`daa520`,gray:`808080`,green:`008000`,greenyellow:`adff2f`,grey:`808080`,honeydew:`f0fff0`,hotpink:`ff69b4`,indianred:`cd5c5c`,indigo:`4b0082`,ivory:`fffff0`,khaki:`f0e68c`,lavender:`e6e6fa`,lavenderblush:`fff0f5`,lawngreen:`7cfc00`,lemonchiffon:`fffacd`,lightblue:`add8e6`,lightcoral:`f08080`,lightcyan:`e0ffff`,lightgoldenrodyellow:`fafad2`,lightgray:`d3d3d3`,lightgreen:`90ee90`,lightgrey:`d3d3d3`,lightpink:`ffb6c1`,lightsalmon:`ffa07a`,lightseagreen:`20b2aa`,lightskyblue:`87cefa`,lightslategray:`789`,lightslategrey:`789`,lightsteelblue:`b0c4de`,lightyellow:`ffffe0`,lime:`0f0`,limegreen:`32cd32`,linen:`faf0e6`,magenta:`f0f`,maroon:`800000`,mediumaquamarine:`66cdaa`,mediumblue:`0000cd`,mediumorchid:`ba55d3`,mediumpurple:`9370db`,mediumseagreen:`3cb371`,mediumslateblue:`7b68ee`,mediumspringgreen:`00fa9a`,mediumturquoise:`48d1cc`,mediumvioletred:`c71585`,midnightblue:`191970`,mintcream:`f5fffa`,mistyrose:`ffe4e1`,moccasin:`ffe4b5`,navajowhite:`ffdead`,navy:`000080`,oldlace:`fdf5e6`,olive:`808000`,olivedrab:`6b8e23`,orange:`ffa500`,orangered:`ff4500`,orchid:`da70d6`,palegoldenrod:`eee8aa`,palegreen:`98fb98`,paleturquoise:`afeeee`,palevioletred:`db7093`,papayawhip:`ffefd5`,peachpuff:`ffdab9`,peru:`cd853f`,pink:`ffc0cb`,plum:`dda0dd`,powderblue:`b0e0e6`,purple:`800080`,rebeccapurple:`663399`,red:`f00`,rosybrown:`bc8f8f`,royalblue:`4169e1`,saddlebrown:`8b4513`,salmon:`fa8072`,sandybrown:`f4a460`,seagreen:`2e8b57`,seashell:`fff5ee`,sienna:`a0522d`,silver:`c0c0c0`,skyblue:`87ceeb`,slateblue:`6a5acd`,slategray:`708090`,slategrey:`708090`,snow:`fffafa`,springgreen:`00ff7f`,steelblue:`4682b4`,tan:`d2b48c`,teal:`008080`,thistle:`d8bfd8`,tomato:`ff6347`,turquoise:`40e0d0`,violet:`ee82ee`,wheat:`f5deb3`,white:`fff`,whitesmoke:`f5f5f5`,yellow:`ff0`,yellowgreen:`9acd32`},N=l.hexNames=P(M);function P(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function F(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function I(e,n){z(e)&&(e=`100%`);var r=B(e);return e=o(n,s(0,parseFloat(e))),r&&(e=parseInt(e*n,10)/100),t.abs(e-n)<1e-6?1:e%n/parseFloat(n)}function L(e){return o(1,s(0,e))}function R(e){return parseInt(e,16)}function z(e){return typeof e==`string`&&e.indexOf(`.`)!=-1&&parseFloat(e)===1}function B(e){return typeof e==`string`&&e.indexOf(`%`)!=-1}function V(e){return e.length==1?`0`+e:``+e}function H(e){return e<=1&&(e=e*100+`%`),e}function U(e){return t.round(parseFloat(e)*255).toString(16)}function W(e){return R(e)/255}var G=(function(){var e=`(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`,t=`[\\s|\\(]+(`+e+`)[,|\\s]+(`+e+`)[,|\\s]+(`+e+`)\\s*\\)?`,n=`[\\s|\\(]+(`+e+`)[,|\\s]+(`+e+`)[,|\\s]+(`+e+`)[,|\\s]+(`+e+`)\\s*\\)?`;return{CSS_UNIT:new RegExp(e),rgb:RegExp(`rgb`+t),rgba:RegExp(`rgba`+n),hsl:RegExp(`hsl`+t),hsla:RegExp(`hsla`+n),hsv:RegExp(`hsv`+t),hsva:RegExp(`hsva`+n),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}})();function K(e){return!!G.CSS_UNIT.exec(e)}function q(e){e=e.replace(n,``).replace(r,``).toLowerCase();var t=!1;if(M[e])e=M[e],t=!0;else if(e==`transparent`)return{r:0,g:0,b:0,a:0,format:`name`};var i;return(i=G.rgb.exec(e))?{r:i[1],g:i[2],b:i[3]}:(i=G.rgba.exec(e))?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=G.hsl.exec(e))?{h:i[1],s:i[2],l:i[3]}:(i=G.hsla.exec(e))?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=G.hsv.exec(e))?{h:i[1],s:i[2],v:i[3]}:(i=G.hsva.exec(e))?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=G.hex8.exec(e))?{r:R(i[1]),g:R(i[2]),b:R(i[3]),a:W(i[4]),format:t?`name`:`hex8`}:(i=G.hex6.exec(e))?{r:R(i[1]),g:R(i[2]),b:R(i[3]),format:t?`name`:`hex`}:(i=G.hex4.exec(e))?{r:R(i[1]+``+i[1]),g:R(i[2]+``+i[2]),b:R(i[3]+``+i[3]),a:W(i[4]+``+i[4]),format:t?`name`:`hex8`}:(i=G.hex3.exec(e))?{r:R(i[1]+``+i[1]),g:R(i[2]+``+i[2]),b:R(i[3]+``+i[3]),format:t?`name`:`hex`}:!1}function ee(e){var t,n;return e||={level:`AA`,size:`small`},t=(e.level||`AA`).toUpperCase(),n=(e.size||`small`).toLowerCase(),t!==`AA`&&t!==`AAA`&&(t=`AA`),n!==`small`&&n!==`large`&&(n=`small`),{level:t,size:n}}e.exports?e.exports=l:window.tinycolor=l})(Math)}),f=(function(e){var t={hex:`#ffffff`,alpha:100},n=d(e);if(e)if(n.isValid()&&!e.trim().startsWith(`radial-gradient`)&&!e.trim().startsWith(`linear-gradient`))t.hex=n.toHexString(),t.alpha=Math.round(n.getAlpha()*100);else return t;return t}),p=(function(e,t){var n=c((0,i.useState)(e),2),r=n[0],a=n[1];return(0,i.useEffect)(function(){var n=setTimeout(function(){a(e)},t);return function(){clearTimeout(n)}},[e,t]),r}),m=[{angle:`0`,name:`to top`},{angle:`45`,name:`to top right`},{angle:`45`,name:`to right top`},{angle:`90`,name:`to right`},{angle:`135`,name:`to right bottom`},{angle:`135`,name:`to bottom right`},{angle:`180`,name:`to bottom`},{angle:`225`,name:`to left bottom`},{angle:`225`,name:`to bottom left`},{angle:`270`,name:`to left`},{angle:`315`,name:`to top left`},{angle:`315`,name:`to left top`}],h=(function(e){var t=d(e),n={stops:[[`rgba(0, 0, 0, 1)`,0,0],[`rgba(183, 80, 174, 0.92)`,1,1]],gradient:`linear-gradient(180deg, rgba(6, 6, 6, 1) 0.0%, rgba(183, 80, 174, 0.92) 100.0%)`,modifier:180,type:`linear`};if(e===`transparent`)return n;if(t.isValid()&&!e.trim().startsWith(`radial-gradient`)&&!e.trim().startsWith(`linear-gradient`)){var r=t.toRgbString();return r&&(n.stops=[[`rgba(0, 0, 0, 1)`,0,0],[r,1,1]],n.gradient=`linear-gradient(180deg, rgba(6, 6, 6, 1) 0.0%, `+r+` 100.0%)`),n}else{e=e.replace(`;`,``).replace(`background-image:`,``);var i=w(e),a=[],o=``;if(i===`Failed to find gradient`||i===`Not correct position`)return console.warn(`Incorrect gradient value`),n;typeof i!=`string`&&(a=i.stops,o=i.angle?i.angle:i.line);var s=c(e.match(/^(\w+)-gradient\((.*)\)$/i)||[],3),l=s[1],u=s[2];if(!l||!u)return console.warn(`Incorrect gradient value`),n;var f=m.find(function(e){return e.name===o})?.angle||o||(l===`linear`?`180`:`circle at center`);return{gradient:l+`-gradient(`+(typeof i==`string`?e:i.original)+`)`,type:l,modifier:f.match(/\d+/)===null?f:Number(f.match(/\d+/)?.join(``)),stops:a.map(function(e,t){var n=[``+e.color,t];return(e.position||e.position===0)&&n.splice(1,0,e.position),n})}}}),g=(function(e,t,n,r){var i=d(e),a,o=r||i.getAlpha()*100;switch(t){case`rgb`:a=i.toRgbString();break;case`hsl`:a=i.toHslString();break;case`hex`:a=n&&o!==100?i.toHex8String():i.toHexString();break;default:a=``;break}return a}),_=(function(e,t,n,r,i){r===void 0&&(r=`rgb`);var a=``;switch(e){case`linear`:typeof n==`number`&&(a=`linear-gradient(`+n+`deg, `+t.map(function(e){return g(e[0],r,i)+` `+Math.round(e[1]*100).toFixed(2)+`%`})+`)`),typeof n==`string`&&(a=`linear-gradient(`+n+`, `+t.map(function(e){return g(e[0],r,i)+` `+Math.round(e[1]*100).toFixed(2)+`%`})+`)`);break;case`radial`:a=`radial-gradient(`+n+`, `+t.map(function(e){return g(e[0],r,i)+` `+Math.round(e[1]*100).toFixed(2)+`%`})+`)`;break}return a}),v=(function(e){if(e){if(e.toLowerCase()===`transparent`)return[0,0,0,0];if(e[0]===`#`)return e.length<7&&(e=`#`+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+(e.length>4?e[4]+e[4]:``)),[parseInt(e.substr(1,2),16),parseInt(e.substr(3,2),16),parseInt(e.substr(5,2),16),e.length>7?parseInt(e.substr(7,2),16)/255:1];if(e.indexOf(`rgb`)===0)return e+=`,1`,e.match(/[\.\d]+/g).map(function(e){return+e})}}),y=(function(e){if(!Array.isArray(e)||e.length<3||e.length>4)return``;var t=e.map(function(e){var t=(+e).toString(16);return t.length===1&&(t=`0`+t),t},[]);return~t.indexOf(`NaN`)?``:`#`+t.join(``)}),b=(function(e){return!!y(e)}),x=function(e,t){return new RegExp(e.reduce(function(e,t){return e+(typeof t==`string`?t:t.source)},``),t)},S=function(){var e=`gi`,t=/(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/,n=/to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/,r=/circle at\s+((?:(?:left|right|center|top|bottom)(?:\s+(?:left|right|center|top|bottom))?))/,i=/\s*,\s*/,a=/\#(?:[a-f0-9]{6,8}|[a-f0-9]{3})/,o=/\(\s*(?:\d{1,3}%?\s*,\s*){2}%?\d{1,3}%?\s*\)/,s=/\(\s*(?:\d{1,3}%?\s*,\s*){2}%?\d{1,3}%?\s*,\s*\d*\.?\d+\)/,c=/(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,l=x([`(?:`,a,`|`,`(?:rgb|hsl)`,o,`|`,`(?:rgba|hsla)`,s,`|`,/[_a-z-][_a-z0-9-]*/,`)`],``),u=x([l,`(?:\\s+`,c,`(?:\\s+`,c,`)?)?`],``),d=x([`(?:`,u,i,`)*`,u],``);return{gradientSearch:x([`(?:(`,x([`(?:(`,t,`)|`,n,`|`,r,`)`],``),`)`,i,`)?(`,d,`)`],e),colorStopSearch:x([`\\s*(`,l,`)`,`(?:\\s+`,`(`,c,`))?`,`(?:`,i,`\\s*)?`],e)}},C=function(e,t){var n={stops:[],angle:``,line:``,original:``},r,i,a;if(e.gradientSearch.lastIndex=0,r=e.gradientSearch.exec(t),r!==null)for(n=o(o({},n),{original:r[0]}),r[1]&&(n.line=r[1]),r[2]&&(n.angle=r[2]),r[3]&&(n.sideCorner=r[3]),e.colorStopSearch.lastIndex=0,i=e.colorStopSearch.exec(r[5]);i!==null;)a={color:d(i[1]).toRgbString()},i[2]&&(a.position=Number((parseInt(i[2],10)/100).toFixed(2))),n.stops.push(a),i=e.colorStopSearch.exec(r[5]);return n},w=(function(e){var t=S(),n,r=/.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/.exec(e);return r===null?n=`Failed to find gradient`:(n=C(t,r[1]),n.original.trim()!==r[1].trim()&&(n.parseWarning=!0),n.stops.every(function(e){return e.hasOwnProperty(`position`)})===!1&&(n=`Not correct position`)),n}),T=function(){function e(e){var t=this;this.initRgb=function(){var e=t.color.toRgb(),n=e.r,r=e.g,i=e.b;t.redValue=n,t.greenValue=r,t.blueValue=i},this.initHsb=function(){var e=t.color.toHsv(),n=e.h,r=e.s,i=e.v;t.hueValue=n,t.saturationValue=r,t.brightnessValue=i},this.toHexString=function(){return t.color.toHexString()},this.toRgbString=function(){return t.color.toRgbString()},this.toHsv=function(){return t.color.toHsv()},this.color=d(e),this.initRgb(),this.initHsb();var n=this.color.toRgb().a;this.alphaValue=Math.min(1,n)*100,this.hueValue=this.color.toHsv().h,this.saturationValue=this.color.toHsv().s,this.brightnessValue=this.color.toHsv().v,this.redValue=this.color.toRgb().r,this.greenValue=this.color.toRgb().g,this.blueValue=this.color.toRgb().b,this.lightnessValue=0}return e.isValidHex=function(e){return d(e).isValid()},Object.defineProperty(e.prototype,`hex`,{get:function(){return this.color.toHex()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`hue`,{get:function(){return this.hueValue},set:function(e){this.color=d({h:e,s:this.saturation,v:this.brightness}),this.initRgb(),this.hueValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`saturation`,{get:function(){return this.saturationValue},set:function(e){this.color=d({h:this.hue,s:e,v:this.brightness}),this.initRgb(),this.saturationValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`lightness`,{get:function(){return this.lightnessValue},set:function(e){this.color=d({h:this.hue,s:this.saturation,l:e}),this.initRgb(),this.lightnessValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`brightness`,{get:function(){return this.brightnessValue},set:function(e){this.color=d({h:this.hue,s:this.saturation,v:e}),this.initRgb(),this.brightnessValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`red`,{get:function(){return this.redValue},set:function(e){var t=this.color.toRgb();this.color=d(o(o({},t),{r:e})),this.initHsb(),this.redValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`green`,{get:function(){return this.greenValue},set:function(e){var t=this.color.toRgb();this.color=d(o(o({},t),{g:e})),this.initHsb(),this.greenValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`blue`,{get:function(){return this.blueValue},set:function(e){var t=this.color.toRgb();this.color=d(o(o({},t),{b:e})),this.initHsb(),this.blueValue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`alpha`,{get:function(){return this.color.getAlpha()*100},set:function(e){this.color.setAlpha(e/100)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`RGB`,{get:function(){return[this.red,this.green,this.blue]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,`HSB`,{get:function(){return[this.hue,this.saturation,this.brightness]},enumerable:!1,configurable:!0}),e}(),E=200,D=150,O=function(e){var t=e.rootPrefixCls,n=e.color,r=e.colorBoardHeight,a=e.onChange,o=e.setChange,s=(0,i.useRef)(),c=function(){o(!1),window.removeEventListener(`mousemove`,m),window.removeEventListener(`mouseup`,h)},l=function(){o(!1),window.removeEventListener(`touchmove`,f),window.removeEventListener(`touchend`,p)};(0,i.useEffect)(function(){return function(){c(),l()}},[]);var u=function(e){if(e.preventDefault(),e.buttons===1){c();var t=e.clientX,n=e.clientY;_({x:t,y:n}),window.addEventListener(`mousemove`,m),window.addEventListener(`mouseup`,h)}},d=function(e){if(e.cancelable&&e.preventDefault(),e.touches.length===1){l();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;_({x:t,y:n}),window.addEventListener(`touchmove`,f,{passive:!1}),window.addEventListener(`touchend`,p,{passive:!1})}},f=function(e){e.cancelable&&e.preventDefault();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;_({x:t,y:n})},p=function(){l()},m=function(e){e.preventDefault();var t=e.clientX,n=e.clientY;_({x:t,y:n})},h=function(e){e.preventDefault();var t=e.clientX,n=e.clientY;_({x:t,y:n}),c()},g=function(){return t+`-board`},_=function(e){var t=s&&s.current.getBoundingClientRect(),r=e.x-t.left,i=e.y-t.top,o=t.width||E,c=t.height||D;r=Math.max(0,r),r=Math.min(r,o),i=Math.max(0,i),i=Math.min(i,c),n.saturation=r/o,n.brightness=1-i/c,a(n)},v=g(),y=new T({h:n.hue,s:1,v:1}).toHexString(),b=n.saturation*100,x=(1-n.brightness)*100;return i.createElement(`div`,{className:v,ref:s},i.createElement(`div`,{className:v+`-hsv`,style:{backgroundColor:y,height:r+`px`,minHeight:r+`px`}},i.createElement(`div`,{className:v+`-value`}),i.createElement(`div`,{className:v+`-saturation`})),i.createElement(`span`,{style:{left:`calc(`+b+`% - 7px)`,top:`calc(`+x+`% - 7px)`,backgroundColor:n.toHexString()}}),i.createElement(`div`,{className:v+`-handler`,onMouseDown:u,onTouchStart:d}))},k=function(e){var t=e.rootPrefixCls,n=e.color,r=e.onChange,a=e.setChange,o=(0,i.useRef)(),s=function(){window.removeEventListener(`mousemove`,u),window.removeEventListener(`mouseup`,d)},c=function(){a(!1),window.removeEventListener(`touchmove`,p),window.removeEventListener(`touchend`,m)};(0,i.useEffect)(function(){return function(){s(),c()}},[]);var l=function(e){e.preventDefault();var t=e.clientX,n=e.clientY;g({x:t,y:n}),window.addEventListener(`mousemove`,u),window.addEventListener(`mouseup`,d)},u=function(e){var t=e.clientX,n=e.clientY;g({x:t,y:n})},d=function(e){var t=e.clientX,n=e.clientY;g({x:t,y:n}),a(!1),s()},f=function(e){if(e.cancelable&&e.preventDefault(),e.touches.length===1){c();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;g({x:t,y:n}),window.addEventListener(`touchmove`,p,{passive:!1}),window.addEventListener(`touchend`,m,{passive:!1})}},p=function(e){e.cancelable&&e.preventDefault();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;g({x:t,y:n})},m=function(){c()},h=function(){return t+`-ribbon`},g=function(e){var t=o&&o.current.getBoundingClientRect(),i=t.width,a=e.x-t.left;a=Math.max(0,a),a=Math.min(a,i),n.hue=a/i*360,r(n)},_=new T({h:n.hue,s:1,v:1}).toHexString(),v=h(),y=n.hue/360*100;return i.createElement(`div`,{className:v,ref:o,onMouseDown:l,onTouchStart:f},i.createElement(`div`,{className:`color-picker-panel-ribbon-bg`}),i.createElement(`span`,{style:{left:y+`%`,backgroundColor:_}}),i.createElement(`div`,{className:v+`-handler`}))},A=function(e,t,n,r){return`rgba(`+[e,t,n,r/100].join(`,`)+`)`},j=function(e){var t=e.rootPrefixCls,n=e.color,r=e.alpha,a=e.onChange,o=e.setChange,s=(0,i.useRef)(),c=function(){window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f)},l=function(){o(!1),window.removeEventListener(`touchmove`,m),window.removeEventListener(`touchend`,h)};(0,i.useEffect)(function(){return function(){c(),l()}},[]);var u=function(e){var t=e.clientX,n=e.clientY;v({x:t,y:n}),window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)},d=function(e){var t=e.clientX,n=e.clientY;v({x:t,y:n})},f=function(e){var t=e.clientX,n=e.clientY;v({x:t,y:n}),o(!1),c()},p=function(e){if(e.cancelable&&e.preventDefault(),e.touches.length===1){l();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;v({x:t,y:n}),window.addEventListener(`touchmove`,m,{passive:!1}),window.addEventListener(`touchend`,h,{passive:!1})}},m=function(e){e.cancelable&&e.preventDefault();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;v({x:t,y:n})},h=function(){l()},g=function(){var e=n.red,t=n.green,r=n.blue;return`linear-gradient(to right, `+A(e,t,r,0)+` , `+A(e,t,r,100)+`)`},_=function(){return t+`-alpha`},v=function(e){var t=s&&s.current.getBoundingClientRect(),n=t.width,r=e.x-t.left;r=Math.max(0,r),r=Math.min(r,n),a(Math.round(r/n*100))},y=function(){var e=n.red,t=n.green,i=n.blue,a=(r||1)/100;return`rgba(`+e+`, `+t+`, `+i+`, `+a+`)`},b=_();return i.createElement(`div`,{className:b,ref:s,onMouseDown:u,onTouchStart:p},i.createElement(`div`,{className:b+`-bg`,style:{background:g()}}),i.createElement(`span`,{style:{left:r+`%`,backgroundColor:y()}}),i.createElement(`div`,{className:b+`-handler`}))},M=function(e){var t=e.alpha,n=e.className,r=e.hex,a=e.colorBoardHeight,s=e.showAlpha,l=e.onChange,u=(0,i.useRef)(),d=new T(r);d.alpha=t;var f=c((0,i.useState)({color:d,alpha:t}),2),p=f[0],m=f[1],h=c((0,i.useState)(!1),2),g=h[0],_=h[1];(0,i.useEffect)(function(){g||m({color:d,alpha:t})},[r,t]);var v=function(e){_(!0);var t=p.color;t.alpha=e,m({color:t,alpha:e}),l({hex:t.toHexString(),alpha:e})},y=function(e){_(!0),e.alpha=p.alpha,m(o(o({},p),{color:e,alpha:e.alpha})),l({hex:e.toHexString(),alpha:e.alpha})};return i.createElement(`div`,{ref:u,className:[`color-picker-panel`,n].join(` `),tabIndex:0},i.createElement(`div`,{className:`color-picker-panel-inner`},i.createElement(O,{rootPrefixCls:`color-picker-panel`,color:p.color,colorBoardHeight:a,onChange:y,setChange:_}),i.createElement(`div`,{className:`color-picker-panel-wrap`+(s?` color-picker-panel-wrap-has-alpha`:``)},i.createElement(`div`,{className:`color-picker-panel-wrap-ribbon`},i.createElement(k,{rootPrefixCls:`color-picker-panel`,color:p.color,onChange:y,setChange:_})),s&&i.createElement(`div`,{className:`color-picker-panel-wrap-alpha`},i.createElement(j,{rootPrefixCls:`color-picker-panel`,alpha:p.alpha,color:p.color,onChange:v,setChange:_})))))};a(`.input_rgba {
  position: relative;
}
.input_rgba .input_rgba-wrap {
  display: flex;
}
.input_rgba .input_rgba-wrap .input_rgba-hex {
  position: relative;
  width: 100%;
  font-size: 0;
}
.input_rgba .input_rgba-wrap .input_rgba-hex .input_rgba-hex-label {
  position: absolute;
  top: 7px;
  left: 12px;
  font-size: 16px;
  color: #929fb7;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
}
.input_rgba .input_rgba-wrap .input_rgba-hex input {
  padding-left: 26px;
}
.input_rgba .input_rgba-wrap .input_rgba-alpha {
  margin-left: 16px;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 71px;
  font-size: 0;
}
.input_rgba .input_rgba-wrap .input_rgba-alpha .input_rgba-alpha-label {
  position: absolute;
  top: 16%;
  color: #929fb7;
  right: 12px;
  font-size: 16px;
}
.input_rgba .input_rgba-wrap input {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: normal;
  color: #312e55;
  margin-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 0;
  padding-bottom: 0;
  transition: all 0.15s ease;
  box-shadow: 0px 0px 0px 2px #bbbfc5;
}
.input_rgba .input_rgba-wrap input:hover {
  background-color: #d4e5ff;
  box-shadow: none;
}
.input_rgba .input_rgba-wrap input:focus {
  box-shadow: 0px 0px 0px 2px #6dbafd;
  background-color: #e5f3ff;
}
.input_rgba .input_rgba-wrap .input_rgba-label {
  width: 100%;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: 0.5px;
  text-align: center;
  color: #929fb7;
}`);var N=function(e){return e.replace(/%/i,``),e[0]===`0`&&e.length>1?e.substr(1):Number(e)>=100?100:isNaN(Number(e))?parseInt(e):e||0},P=function(e){return e?e.substr(0,3).replace(/[^\d]/g,``):``},F=function(e){return e&&e.substring(0,1)===`#`&&(e=e.substring(1)),e?e.substr(0,6).replace(/[^a-zA-Z0-9\s-]/gi,``):``},I=function(e,t){e.key===`Enter`&&t()},L=function(e){var t={wrapClass:`input_rgba-hex`,labelSymbol:!0,idInput:`rgba-hex`+Math.random()*1e4,valueInput:e.hexValue,labelText:`Hex`,labelArea:`hex`,labelClass:`input_rgba-label`,onChangeInput:function(t){return e.onChangeHex(F(t.target.value))},name:`hex`},n={wrapClass:`input_rgba-alpha`,labelSymbol:!1,idInput:`rgba-alpha`+Math.random()*1e4,valueInput:e.alphaValue,labelText:`Alpha`,labelArea:`alpha`,labelClass:`input_rgba-label`,onChangeInput:function(t){return e.onChangeAlpha(P(t.target.value))},name:`alpha`};return e.showAlpha===!1?[t]:[t,n]},R=function(e){var t=e.hex,n=e.alpha,r=e.format,a=r===void 0?`rgb`:r,s=e.showAlpha,l=s===void 0?!0:s,u=e.onChange,f=e.onSubmitChange,p=c((0,i.useState)({alpha:n,hex:t}),2),m=p[0],h=p[1],_=function(e){var t=N(e);h(o(o({},m),{alpha:Number(t)}))},v=function(e){h(o(o({},m),{hex:e}))},y=function(){var e=d(m.hex[0]===`#`?m.hex:`#`+m.hex);e.setAlpha(Number(m.alpha)/100),e&&(m.alpha!==n||m.hex!==t)?(u({hex:m.hex[0]===`#`?m.hex:`#`+m.hex,alpha:Number(m.alpha)}),f&&f(g(e.toRgbString(),a,l,m.alpha))):(h({hex:t,alpha:n}),u({hex:t,alpha:n}))};(0,i.useEffect)(function(){h({hex:t,alpha:n})},[t,n]);var b={alphaValue:m.alpha,hexValue:m.hex.replace(/#/i,``),onChangeAlpha:_,onChangeHex:v,showAlpha:l};return i.createElement(`div`,{className:`input_rgba`},i.createElement(`div`,{className:`input_rgba-wrap`},L(b).map(function(e,t){var n=e.wrapClass,r=e.labelSymbol,a=e.idInput,o=e.valueInput,s=e.labelText,c=e.labelArea,l=e.labelClass,u=e.onChangeInput,d=e.name;return i.createElement(`div`,{className:n,key:t},r&&i.createElement(`label`,{htmlFor:`rgba-hex`,className:`input_rgba-hex-label`},`#`),d===`alpha`&&i.createElement(`label`,{htmlFor:a,className:`input_rgba-alpha-label`},`%`),i.createElement(`input`,{type:`text`,id:a,value:o,"aria-label":c,onChange:function(e){return u(e)},onBlur:y,onKeyPress:function(e){return I(e,y)}}),i.createElement(`div`,{className:l},s))})))},z=function(e){var t=e.color,n=e.setColor,r=e.activeColor,a=e.setActiveColor,s=e.setInit,u=e.format,f=u===void 0?`rgb`:u,p=e.showAlpha,m=p===void 0?!0:p,h=e.allowAddGradientStops,g=h===void 0?!0:h,b=(0,i.useRef)(),x=c((0,i.useState)(!1),2),S=x[0],C=x[1],w=c((0,i.useState)(!1),2),T=w[0],E=w[1],D=t.stops,O=t.type,k=t.modifier,A=function(e){if(s(!1),e.stopPropagation(),g){var i=e.target;if(i.className!==`gradient-marker`){var c=i.getBoundingClientRect(),u=e.clientX-c.left,p=Number((100/c.width*u).toFixed(0))/100,h=d(r.hex);h.setAlpha(r.alpha/100);var v=l(t.stops,[[h.toRgbString(),p,t.stops.length]]).sort(function(e,t){return e[1]-t[1]}).map(function(e,t){return e[2]=t,e});n(o(o({},t),{gradient:``+_(O,v,k,f,m),stops:v})),a(o(o({},r),{loc:p,index:v.find(function(e){return e[1]===p})[2]}))}}},j=function(){window.removeEventListener(`mousemove`,P),window.removeEventListener(`mouseup`,F)},M=function(){window.removeEventListener(`touchmove`,L),window.removeEventListener(`touchend`,R)},N=function(e,t){if(e.preventDefault(),e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),e.detail!==2&&(s(!1),e.button===0)){var n=d(t[0]);a({hex:`#`+n.toHex(),alpha:n.getAlpha()*100,loc:t[1],index:t[2]});var r=e.clientX,i=e.clientY;z({x:r,y:i}),window.addEventListener(`mousemove`,P),window.addEventListener(`mouseup`,F)}},P=function(e){var t=e.clientX,n=e.clientY;if(n-((b?.current)?.getBoundingClientRect()).y>80&&D.length>2){E(!0);return}else E(!1);z({x:t,y:n})},F=function(e){var t=e.clientX,n=e.clientY;n-((b?.current)?.getBoundingClientRect()).y>80&&D.length>2&&C(!0),z({x:t,y:n}),j()},I=function(e,t){if(s(!1),e.cancelable&&e.preventDefault(),e.touches.length===1){M();var n=d(t[0]);a({hex:`#`+n.toHex(),alpha:n.getAlpha()*100,loc:t[1],index:t[2]});var r=e.targetTouches[0].clientX,i=e.targetTouches[0].clientY;z({x:r,y:i}),window.addEventListener(`touchmove`,L,{passive:!1}),window.addEventListener(`touchend`,R,{passive:!1})}},L=function(e){e.cancelable&&e.preventDefault();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;if(n-((b?.current)?.getBoundingClientRect()).y>80&&D.length>2){E(!0);return}else E(!1);z({x:t,y:n})},R=function(){M()},z=function(e){var t=b&&b.current.getBoundingClientRect(),n=t.width,r=e.x-t.left;r=Math.max(0,r),r=Math.min(r,n);var i=Number((100/t.width*r).toFixed(0))/100;a(function(e){return o(o({},e),{loc:i})})},B=function(){if(!(D.length<=2)){var e=D.filter(function(e){return e[2]!==r.index}).map(function(e,t){return e[2]=t,e}),i=v(e[e.length-1][0]),s=e[e.length-1][1],c=y([i[0],i[1],i[2]]),l=e[e.length-1][2];return C(!1),E(!1),a({hex:c,alpha:Number(Math.round(i[3]*100)),loc:s,index:l}),n(o(o({},t),{gradient:``+_(O,e,k,f,m),stops:e}))}};return(0,i.useEffect)(function(){if(S)return B();var e=D.map(function(e){return r.index===e[2]?[e[0],r.loc,e[2]]:e});n(o(o({},t),{gradient:``+_(O,e,k,f,m),stops:e}))},[r.loc,S]),(0,i.useEffect)(function(){return function(){j(),M()}},[]),i.createElement(`div`,{className:`gradient-stops`,onClick:function(e){return A(e)},ref:b},i.createElement(`div`,{className:`gradient-stop-preview`,style:{background:`linear-gradient(to right, `+D.map(function(e){return e[0]+` `+e[1]*100+`%`}).join(`, `)+`)`}}),i.createElement(`div`,{className:`gradient-stop-marker`},D.map(function(e){var t=e[1]*100,n=e[0];return i.createElement(`div`,{key:n+t+Math.random()*100,className:`gradient-marker`+(T&&r.index===e[2]?` hide`:``)+(!T&&r.index===e[2]?` active`:``),style:{left:Math.abs(Math.min(t,100))+`%`,color:n},onTouchStart:function(t){return I(t,e)},onMouseDown:function(t){return N(t,e)},onClick:function(e){return e.stopPropagation()},onDoubleClick:B})})))},B=function(e){var t=`solid`,n=d(e).isValid();if(e){if(e===`transparent`||n&&!e.trim().startsWith(`radial-gradient`)&&!e.trim().startsWith(`linear-gradient`))return t=`solid`,t;var r=v(e);if(r){if(b([r[0],r[1],r[2]]))return t=`solid`,t}else return t=`gradient`,t}return t},V=function(e,t){if(!e.length||!Array.isArray(e))return[];var n=l(new Set(e));switch(t){case`solid`:return n.filter(function(e,t){return!!(d(e).isValid()&&!e.trim().startsWith(`radial-gradient`)&&!e.trim().startsWith(`linear-gradient`))});case`grad`:return n.filter(function(e,t){var n=w(e);return n===`Failed to find gradient`?!1:n===`Not correct position`?(console.warn(`Incorrect gradient default value. You need to indicate the location for the colors. We ignore this gradient value`),!1):!(t>100)});default:return[]}},H=function(e,t){if(e instanceof Array&&t instanceof Array){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(!H(e[n],t[n]))return!1;return!0}else return e===t},U=function(e,t){var n,r,i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;try{for(var o=s(i),c=o.next();!c.done;c=o.next()){var l=c.value;if(e[l]!==t[l])return!1}}catch(e){n={error:e}}finally{try{c&&!c.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return!0},W=[`#FF6900`,`#FCB900`,`#7BDCB5`,`#00D084`,`#8ED1FC`,`#0693E3`,`#ABB8C3`,`#607d8b`,`#EB144C`,`#F78DA7`,`#ba68c8`,`#9900EF`,`linear-gradient(0deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)`,`linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)`,`linear-gradient(315deg, rgb(150, 230, 161) 8.00%, rgb(212, 252, 121) 92.00%)`,`linear-gradient(to left, rgb(249, 240, 71) 0%, rgb(15, 216, 80) 100%)`,`linear-gradient(315deg, rgb(194, 233, 251) 8.00%, rgb(161, 196, 253) 92.00%)`,`linear-gradient(0deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)`,`linear-gradient(0deg, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 51.00%, rgb(137, 137, 186) 100%)`,`linear-gradient(0deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 15.0%, rgb(101, 104, 159) 28.00%, rgb(116, 116, 176) 43.00%, rgb(126, 126, 187) 57.00%, rgb(131, 137, 199) 71.00%, rgb(151, 149, 212) 82.00%, rgb(162, 161, 220) 92.00%, rgb(181, 174, 228) 100%)`,`linear-gradient(270deg, rgb(255, 126, 179) 0%, rgb(255, 117, 140) 100%)`,`linear-gradient(90deg, rgb(120, 115, 245) 0%, rgb(236, 119, 171) 100%)`,`linear-gradient(45deg, #2e266f 0.00%, #9664dd38 100.00%)`,`radial-gradient(circle at center, yellow 0%, #009966 50%, purple 100%)`],G=[{pos:`tl`,css:`circle at left top`,active:!1},{pos:`tm`,css:`circle at center top`,active:!1},{pos:`tr`,css:`circle at right top`,active:!1},{pos:`l`,css:`circle at left`,active:!1},{pos:`m`,css:`circle at center`,active:!0},{pos:`r`,css:`circle at right`,active:!1},{pos:`bl`,css:`circle at left bottom`,active:!1},{pos:`bm`,css:`circle at center bottom`,active:!1},{pos:`br`,css:`circle at right bottom`,active:!1}],K=(0,i.memo)(function(e){var t=e.color,n=e.setColor,r=e.activeColor,a=e.setActiveColor,s=e.setInit,l=e.format,u=l===void 0?`rgb`:l,d=e.showAlpha,f=d===void 0?!0:d,p=e.showGradientResult,m=p===void 0?!0:p,h=e.showGradientStops,g=h===void 0?!0:h,v=e.showGradientMode,y=v===void 0?!0:v,b=e.showGradientAngle,x=b===void 0?!0:b,S=e.showGradientPosition,C=S===void 0?!0:S,w=e.allowAddGradientStops,T=w===void 0?!0:w,E=(0,i.useRef)(),D=t.stops,O=t.gradient,k=t.type,A=t.modifier,j=c((0,i.useState)(G),2),M=j[0],N=j[1],P=function(){switch(s(!1),k){case`linear`:var e=M.find(function(e){return e.active});n(o(o({},t),{modifier:e?.css||A,gradient:``+_(`radial`,D,e?.css||A,u,f),type:`radial`}));break;case`radial`:n(o(o({},t),{gradient:``+_(`linear`,D,180,u,f),type:`linear`}));break}},F=function(e){s(!1);var r=e.target.getAttribute(`data-pos`),i=M.map(function(e){return e.pos===r?o(o({},e),{active:!0}):o(o({},e),{active:!1})});N(i);var a=i.find(function(e){return e.active});n(o(o({},t),{modifier:a?.css||A,gradient:``+_(`radial`,D,a?.css||A,u,f)}))},I=function(){window.removeEventListener(`mousemove`,B),window.removeEventListener(`mouseup`,V)},L=function(){window.removeEventListener(`touchmove`,U),window.removeEventListener(`touchend`,W)},R=function(e){if(e.preventDefault(),s(!1),e.button===0){var t=e.clientX,n=e.clientY,r=e.shiftKey,i=e.ctrlKey*2;e.target.className!==`gradient-mode`&&k===`linear`&&(K({x:t,y:n,shiftKey:r,ctrlKey:i}),window.addEventListener(`mousemove`,B),window.addEventListener(`mouseup`,V))}},B=function(e){var t=e.clientX,n=e.clientY,r=e.shiftKey;K({x:t,y:n,shiftKey:r,ctrlKey:e.ctrlKey*2})},V=function(e){var t=e.clientX,n=e.clientY,r=e.shiftKey;K({x:t,y:n,shiftKey:r,ctrlKey:e.ctrlKey*2}),I()},H=function(e){if(s(!1),e.cancelable&&e.preventDefault(),e.touches.length===1){L();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;K({x:t,y:n,shiftKey:!1,ctrlKey:0}),window.addEventListener(`touchmove`,U,{passive:!1}),window.addEventListener(`touchend`,W,{passive:!1})}},U=function(e){e.cancelable&&e.preventDefault();var t=e.targetTouches[0].clientX,n=e.targetTouches[0].clientY;K({x:t,y:n,shiftKey:!1,ctrlKey:0})},W=function(){L()},K=function(e){var r=E&&E.current.getBoundingClientRect(),i=r.left+r.width/2,a=r.top+r.height/2,s=Math.atan2(e.x-i,e.y-a)-Math.PI,c=Math.abs(s*180/Math.PI),l=c-c%(45/[1,2,4][Number(e.shiftKey||e.ctrlKey)]);n(o(o({},t),{gradient:``+_(k,D,l,u,f),modifier:l}))};return(0,i.useEffect)(function(){return function(){I(),L()}},[]),(0,i.useEffect)(function(){if(k===`radial`){var e=M.find(function(e){return e.css===A});n(o(o({},t),{modifier:e?.css||A,gradient:``+_(`radial`,D,e?.css||A,u,f)})),N(G.map(function(e){return e.css===A?o(o({},e),{active:!0}):o(o({},e),{active:!1})}))}},[A]),i.createElement(`div`,{className:`gradient-interaction`},m&&i.createElement(`div`,{className:`gradient-result`,onMouseDown:x?R:void 0,onTouchStart:x?H:void 0,style:{background:O}},y&&i.createElement(`div`,{"data-mode":k,className:`gradient-mode`,onClick:function(){return P()}}),x&&i.createElement(`div`,{className:`gradient-angle`,ref:E,style:{visibility:k===`linear`?`visible`:`hidden`}},i.createElement(`div`,{style:{transform:`rotate(`+(typeof A==`number`?A-90+`deg`:A)+`)`}})),C&&i.createElement(`div`,{className:`gradient-pos`,style:{opacity:k===`radial`?`1`:`0`,visibility:k===`radial`?`visible`:`hidden`}},M.map(function(e){return i.createElement(`div`,{key:e.pos,"data-pos":e.pos,className:e.active?`gradient-active`:``,onClick:function(e){return F(e)}})}))),g&&i.createElement(z,{color:t,setColor:n,activeColor:r,setActiveColor:a,setInit:s,format:u,showAlpha:f,allowAddGradientStops:T}))},function(e,t){return!!(H(e.color.stops,t.color.stops)&&e.color.modifier===t.color.modifier&&e.color.type===t.color.type&&U(e.activeColor,t.activeColor))}),q=function(e){var t=e.defaultColors,n=t===void 0?[]:t,r=e.setColor,a=e.setActiveColor,o=e.setInit,s=e.colorType,l=c((0,i.useState)(-1),2),u=l[0],d=l[1],p=c((0,i.useState)([]),2),m=p[0],g=p[1];(0,i.useEffect)(function(){g(s===`gradient`?V(n,`grad`).map(function(e){return h(e)}):V(n,`solid`))},[]);var _=function(e,t){if(t!==u)if(s===`gradient`&&typeof e!=`string`){var n=e.stops,i=v(n[n.length-1][0]),c=n[n.length-1][1],l=y([i[0],i[1],i[2]]),p=n[n.length-1][2];o(!1),r(e),a&&a({hex:l,alpha:Number(Math.round(i[3]*100)),loc:c,index:p}),d(t)}else s!==`gradient`&&typeof e==`string`&&(o(!1),r(f(e)),d(t))};return!Array.isArray(n)||!n.length?null:i.createElement(`div`,{className:`default-color-panel`},m.map(function(e,t){switch(s){case`gradient`:if(typeof e!=`string`){var n=e.gradient;return i.createElement(`div`,{onClick:function(){return _(e,t)},key:e.gradient+t,className:`default-color-panel_item`+(u===t?` default-color-panel_item-active`:``),style:{background:n}},i.createElement(`div`,{className:`item_qub`}))}else return null;case`solid`:return typeof e==`string`?i.createElement(`div`,{onClick:function(){return _(e,t)},key:e+t,className:`default-color-panel_item`+(u===t?` default-color-panel_item-active`:``),style:{background:e,boxShadow:u===t?e+` 0px 0px 4px`:`none`}},i.createElement(`div`,{className:`item_qub`})):null;default:return null}}))},ee=function(e){var t=e.value,n=t===void 0?`#ffffff`:t,r=e.onChange,a=r===void 0?function(){return{}}:r,s=e.format,l=s===void 0?`rgb`:s,u=e.debounceMS,f=u===void 0?300:u,m=e.debounce,g=m===void 0?!0:m,b=e.showAlpha,x=b===void 0?!0:b,S=e.showInputs,C=S===void 0?!0:S,w=e.showGradientResult,T=w===void 0?!0:w,E=e.showGradientStops,D=E===void 0?!0:E,O=e.showGradientMode,k=O===void 0?!0:O,A=e.showGradientAngle,j=A===void 0?!0:A,N=e.showGradientPosition,P=N===void 0?!0:N,F=e.allowAddGradientStops,I=F===void 0?!0:F,L=e.colorBoardHeight,z=L===void 0?120:L,B=e.defaultColors,V=(0,i.useCallback)(function(){return h(n)},[n])(),H=V.stops,U=v(H[H.length-1][0]),W=H[H.length-1][1],G=y([U[0],U[1],U[2]]),ee=H[H.length-1][2],te=c((0,i.useState)(!0),2),ne=te[0],J=te[1],re=c((0,i.useState)({hex:G,alpha:Number(Math.round(U[3]*100)),loc:W,index:ee}),2),Y=re[0],X=re[1],Z=c((0,i.useState)(V),2),Q=Z[0],ie=Z[1],$=p(Q,f);(0,i.useEffect)(function(){if(g&&$&&ne===!1){if($.gradient===V.gradient)return;a&&a($.gradient)}else if(ne===!1){if($.gradient===V.gradient)return;a&&a($.gradient)}},[$]),(0,i.useEffect)(function(){ie(V);var e=V.stops.find(function(e){return e[2]===Y.index});if(e){var t=d(String(e[0]));`#`+t.toHex()!==Y.hex&&X(o(o({},Y),{hex:`#`+t.toHex(),alpha:t.getAlpha()*100}))}},[n]);var ae=(0,i.useCallback)(function(e){J(!1),X(o(o({},Y),{hex:e.hex,alpha:Number(Math.round(e.alpha))}));var t=Q.stops,n=Q.type,r=Q.modifier,i=d(e.hex);i.setAlpha(e.alpha/100);var a=t.map(function(e){return e[1]===Y.loc?[i.toRgbString(),e[1],e[2]]:e});ie(o(o({},Q),{gradient:``+_(n,a,r,l,x),stops:a}))},[Y,Q]);return i.createElement(`div`,{className:`colorpicker`},i.createElement(M,{hex:Y.hex,alpha:Y.alpha,showAlpha:x,onChange:ae,colorBoardHeight:z}),C&&i.createElement(R,{hex:Y.hex,alpha:Y.alpha,showAlpha:x,onChange:function(e){return X(function(t){return o(o({},t),{hex:e.hex,alpha:e.alpha})})},onSubmitChange:function(e){var t=v(e);ae({hex:y([t[0],t[1],t[2]]),alpha:t[3]*100})}}),i.createElement(K,{color:Q,setColor:ie,activeColor:Y,setActiveColor:X,setInit:J,format:l,showAlpha:x,showGradientResult:T,showGradientStops:D,showGradientMode:k,showGradientAngle:j,showGradientPosition:P,allowAddGradientStops:I}),i.createElement(q,{defaultColors:B,setColor:ie,setActiveColor:X,setInit:J,colorType:`gradient`}))},te=function(e){var t=e.value,n=t===void 0?`#ffffff`:t,r=e.onChange,a=r===void 0?function(){return{}}:r,o=e.format,s=o===void 0?`rgb`:o,l=e.debounceMS,u=l===void 0?300:l,m=e.debounce,h=m===void 0?!0:m,_=e.showAlpha,v=_===void 0?!0:_,y=e.showInputs,b=y===void 0?!0:y,x=e.colorBoardHeight,S=x===void 0?120:x,C=e.defaultColors,w=(0,i.useRef)(null),T=c((0,i.useState)(!0),2),E=T[0],D=T[1],O=c((0,i.useState)(f(n)),2),k=O[0],A=O[1],j=p(k,u);return(0,i.useEffect)(function(){if(h&&j&&E===!1){n===`transparent`&&k.alpha===0&&(k.alpha=100);var e=d(k.hex);if(e.setAlpha(k.alpha/100),d(e).toRgbString()===d(n).toRgbString())return;a(g(e.toRgbString(),s,v,j.alpha))}},[j]),(0,i.useEffect)(function(){A(f(n))},[n]),i.createElement(`div`,{ref:w,className:`colorpicker`},i.createElement(M,{hex:k.hex,alpha:k.alpha,colorBoardHeight:S,showAlpha:v,onChange:function(e){D(!1),A({hex:e.hex,alpha:Math.round(e.alpha)})}}),b&&i.createElement(R,{hex:k.hex,alpha:k.alpha,format:s,showAlpha:v,onChange:A,onSubmitChange:a}),i.createElement(q,{defaultColors:C,setColor:A,setInit:D,colorType:`solid`}))};a(`.popup_tabs {
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
.popup_tabs-header {
  width: 100%;
  height: 49px;
  box-shadow: inset 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  background-color: #f6f7f9;
  display: flex;
  border-radius: 6px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  overflow: hidden;
}
.popup_tabs-header .popup_tabs-header-label {
  width: 100%;
  height: 49px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #929fb7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
}
.popup_tabs-header .popup_tabs-header-label-active {
  background-color: #ffffff;
  cursor: default;
  color: #312e55;
}
.popup_tabs-body {
  padding: 16px;
}`);var ne=function(e){var t=e.children,n=e.activeTab,r=e.popupWidth,a=i.Children.map(t,function(e){return i.cloneElement(e,{activeTab:n})});return i.createElement(`div`,{className:`popup_tabs`,style:{width:r+`px`}},a)},J=function(e){var t=e.children,n=e.activeTab,r=e.tabName,a=e.onClick;return i.createElement(`div`,{className:`popup_tabs-header-label`+(n===r?` popup_tabs-header-label-active`:``),onClick:a},t)},re=function(e){var t=e.children,n=e.activeTab,r=i.Children.map(t,function(e){return i.cloneElement(e,{activeTab:n})});return i.createElement(`div`,{className:`popup_tabs-header`},r)},Y=function(e){var t=e.children,n=e.activeTab,r=i.Children.map(t,function(e){return i.cloneElement(e,{activeTab:n})});return i.createElement(`div`,{className:`popup_tabs-body`},r)},X=function(e){var t=e.children;return e.activeTab===e.tabName?i.createElement(`div`,{className:`popup_tabs-body-item`},t):null},Z=function(e){var t=e.value,n=t===void 0?`#ffffff`:t,r=e.format,a=r===void 0?`rgb`:r,o=e.gradient,s=o===void 0?!1:o,l=e.solid,u=l===void 0?!0:l,d=e.debounceMS,f=d===void 0?300:d,p=e.debounce,m=p===void 0?!0:p,h=e.showAlpha,g=h===void 0?!0:h,_=e.showInputs,v=_===void 0?!0:_,y=e.showGradientResult,b=y===void 0?!0:y,x=e.showGradientStops,S=x===void 0?!0:x,C=e.showGradientMode,w=C===void 0?!0:C,T=e.showGradientAngle,E=T===void 0?!0:T,D=e.showGradientPosition,O=D===void 0?!0:D,k=e.allowAddGradientStops,A=k===void 0?!0:k,j=e.popupWidth,M=j===void 0?267:j,N=e.colorBoardHeight,P=N===void 0?120:N,F=e.defaultColors,I=F===void 0?W:F,L=e.defaultActiveTab,R=e.onChangeTabs,z=e.onChange,V=z===void 0?function(){return{}}:z,H=c((0,i.useState)(L||B(n)),2),U=H[0],G=H[1],K=function(e){V(e)},q=function(e){V(e)},Z=function(e){G(e),typeof R==`function`&&R&&R(e)};return u&&s?i.createElement(ne,{activeTab:U,popupWidth:M},i.createElement(re,null,i.createElement(J,{tabName:`solid`,onClick:function(){return Z(`solid`)}},`Solid`),i.createElement(J,{tabName:`gradient`,onClick:function(){return Z(`gradient`)}},`Gradient`)),i.createElement(Y,null,i.createElement(X,{tabName:`solid`},i.createElement(te,{onChange:K,value:n,format:a,defaultColors:I,debounceMS:f,debounce:m,showAlpha:g,showInputs:v,colorBoardHeight:P})),i.createElement(X,{tabName:`gradient`},i.createElement(ee,{onChange:q,value:n,format:a,defaultColors:I,debounceMS:f,debounce:m,showAlpha:g,showInputs:v,showGradientResult:b,showGradientStops:S,showGradientMode:w,showGradientAngle:E,showGradientPosition:O,allowAddGradientStops:A,colorBoardHeight:P})))):i.createElement(i.Fragment,null,u||s?i.createElement(ne,{popupWidth:M},i.createElement(Y,null,u?i.createElement(te,{onChange:K,value:n,format:a,defaultColors:I,debounceMS:f,debounce:m,showAlpha:g,showInputs:v,colorBoardHeight:P}):i.createElement(i.Fragment,null),s?i.createElement(ee,{onChange:q,value:n,format:a,defaultColors:I,debounceMS:f,debounce:m,showAlpha:g,showInputs:v,showGradientResult:b,showGradientStops:S,showGradientMode:w,showGradientAngle:E,showGradientPosition:O,allowAddGradientStops:A,colorBoardHeight:P}):i.createElement(i.Fragment,null))):null)};export{r as n,Z as t};