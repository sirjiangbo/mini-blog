webpackJsonp([89],{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(245);


/***/ }),

/***/ 245:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([86],{393:function(e,n){e.exports=function(e){var n="[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",a="(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",i={className:"meta",begin:"^#!",end:"$"},s={className:"literal",begin:"\\b(t{1}|nil)\\b"},b={className:"number",variants:[{begin:a,relevance:0},{begin:"#(b|B)[0-1]+(/[0-1]+)?"},{begin:"#(o|O)[0-7]+(/[0-7]+)?"},{begin:"#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"},{begin:"#(c|C)\\("+a+" +"+a,end:"\\)"}]},l=e.inherit(e.QUOTE_STRING_MODE,{illegal:null}),g=e.COMMENT(";","$",{relevance:0}),t={begin:"\\*",end:"\\*"},c={className:"symbol",begin:"[:&]"+n},r={begin:n,relevance:0},o={begin:"\\|[^]*?\\|"},d={begin:"\\(",end:"\\)",contains:["self",s,l,b,r]},m={contains:[b,l,t,c,d,r],variants:[{begin:"['`]\\(",end:"\\)"},{begin:"\\(quote ",end:"\\)",keywords:{name:"quote"}},{begin:"'\\|[^]*?\\|"}]},v={variants:[{begin:"'"+n},{begin:"#'"+n+"(::"+n+")*"}]},u={begin:"\\(\\s*",end:"\\)"},N={endsWithParent:!0,relevance:0};return u.contains=[{className:"name",variants:[{begin:n},{begin:"\\|[^]*?\\|"}]},N],N.contains=[m,v,u,s,b,l,g,t,c,o,r],{illegal:/\S/,contains:[b,i,s,l,g,m,v,u,r]}}}});

/***/ })

},[244]);