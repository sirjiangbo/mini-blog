webpackJsonp([177],{

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(69);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([174],{305:function(e,a){e.exports=function(e){var a={ruleDeclaration:"^[a-zA-Z][a-zA-Z0-9-]*",unexpectedChars:"[!@#$^&',?+~`|:]"},n=["ALPHA","BIT","CHAR","CR","CRLF","CTL","DIGIT","DQUOTE","HEXDIG","HTAB","LF","LWSP","OCTET","SP","VCHAR","WSP"],s=e.COMMENT(";","$"),i={className:"symbol",begin:/%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/},l={className:"symbol",begin:/%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/},r={className:"symbol",begin:/%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/},o={className:"symbol",begin:/%[si]/},c={begin:a.ruleDeclaration+"\\s*=",returnBegin:!0,end:/=/,relevance:0,contains:[{className:"attribute",begin:a.ruleDeclaration}]};return{illegal:a.unexpectedChars,keywords:n.join(" "),contains:[c,s,i,l,r,o,e.QUOTE_STRING_MODE,e.NUMBER_MODE]}}}});

/***/ })

},[68]);