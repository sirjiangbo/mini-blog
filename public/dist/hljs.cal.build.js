webpackJsonp([158],{

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(107);


/***/ }),

/***/ 107:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([155],{324:function(e,n){e.exports=function(e){var n="div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",a=[e.C_LINE_COMMENT_MODE,e.COMMENT(/\{/,/\}/,{relevance:0}),e.COMMENT(/\(\*/,/\*\)/,{relevance:10})],r={className:"string",begin:/'/,end:/'/,contains:[{begin:/''/}]},s={className:"string",begin:/(#\d+)+/},i={className:"number",begin:"\\b\\d+(\\.\\d+)?(DT|D|T)",relevance:0},o={className:"string",begin:'"',end:'"'},t={className:"function",beginKeywords:"procedure",end:/[:;]/,keywords:"procedure|10",contains:[e.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,keywords:n,contains:[r,s]}].concat(a)},c={className:"class",begin:"OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",returnBegin:!0,contains:[e.TITLE_MODE,t]};return{case_insensitive:!0,keywords:{keyword:n,literal:"false true"},illegal:/\/\*/,contains:[r,s,i,o,e.NUMBER_MODE,c,t]}}}});

/***/ })

},[106]);