webpackJsonp([58],{

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(307);


/***/ }),

/***/ 307:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([55],{424:function(e,n){e.exports=function(e){var n={keyword:"actor addressof and as be break class compile_error compile_intrinsicconsume continue delegate digestof do else elseif embed end errorfor fun if ifdef in interface is isnt lambda let match new not objector primitive recover repeat return struct then trait try type until use var where while with xor",meta:"iso val tag trn box ref",literal:"this false true"},a={className:"string",begin:'"""',end:'"""',relevance:10},s={className:"string",begin:'"',end:'"',contains:[e.BACKSLASH_ESCAPE]},t={className:"string",begin:"'",end:"'",contains:[e.BACKSLASH_ESCAPE],relevance:0},i={className:"type",begin:"\\b_?[A-Z][\\w]*",relevance:0},r={begin:e.IDENT_RE+"'",relevance:0};return{keywords:n,contains:[{className:"class",beginKeywords:"class actor",end:"$",contains:[e.TITLE_MODE,e.C_LINE_COMMENT_MODE]},{className:"function",beginKeywords:"new fun",end:"=>",contains:[e.TITLE_MODE,{begin:/\(/,end:/\)/,contains:[i,r,e.C_NUMBER_MODE,e.C_BLOCK_COMMENT_MODE]},{begin:/:/,endsWithParent:!0,contains:[i]},e.C_LINE_COMMENT_MODE]},i,a,s,t,r,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]}}}});

/***/ })

},[306]);