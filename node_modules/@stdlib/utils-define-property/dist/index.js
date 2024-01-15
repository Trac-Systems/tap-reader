"use strict";var n=function(e,t){return function(){return t||e((t={exports:{}}).exports,t),t.exports}};var s=n(function(T,_){
var w=typeof Object.defineProperty=="function"?Object.defineProperty:null;_.exports=w
});var y=n(function(C,v){
var x=s();function q(){try{return x({},"x",{}),!0}catch(e){return!1}}v.exports=q
});var p=n(function(F,c){
var G=Object.defineProperty;c.exports=G
});var g=n(function(z,d){
var P=require('@stdlib/error-tools-fmtprodmsg/dist'),a=Object.prototype,h=a.toString,m=a.__defineGetter__,S=a.__defineSetter__,k=a.__lookupGetter__,O=a.__lookupSetter__;function E(e,t,r){var f,i,l,u;if(typeof e!="object"||e===null||h.call(e)==="[object Array]")throw new TypeError(P('1Sx3L',e));if(typeof r!="object"||r===null||h.call(r)==="[object Array]")throw new TypeError(P('1SxB0',r));if(i="value"in r,i&&(k.call(e,t)||O.call(e,t)?(f=e.__proto__,e.__proto__=a,delete e[t],e[t]=r.value,e.__proto__=f):e[t]=r.value),l="get"in r,u="set"in r,i&&(l||u))throw new Error(format('1Sx1d'));return l&&m&&m.call(e,t,r.get),u&&S&&S.call(e,t,r.set),e}d.exports=E
});var V=y(),b=p(),A=g(),o;V()?o=b:o=A;module.exports=o;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
