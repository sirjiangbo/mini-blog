webpackJsonp([50],{

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(323);


/***/ }),

/***/ 323:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([47],{432:function(e,n){e.exports=function(e){var n={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},a={className:"meta",begin:/^(>>>|\.\.\.) /},i={className:"subst",begin:/\{/,end:/\}/,keywords:n,illegal:/#/},s={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/(u|b)?r?'''/,end:/'''/,contains:[a],relevance:10},{begin:/(u|b)?r?"""/,end:/"""/,contains:[a],relevance:10},{begin:/(fr|rf|f)'''/,end:/'''/,contains:[a,i]},{begin:/(fr|rf|f)"""/,end:/"""/,contains:[a,i]},{begin:/(u|r|ur)'/,end:/'/,relevance:10},{begin:/(u|r|ur)"/,end:/"/,relevance:10},{begin:/(b|br)'/,end:/'/},{begin:/(b|br)"/,end:/"/},{begin:/(fr|rf|f)'/,end:/'/,contains:[i]},{begin:/(fr|rf|f)"/,end:/"/,contains:[i]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},r={className:"number",relevance:0,variants:[{begin:e.BINARY_NUMBER_RE+"[lLjJ]?"},{begin:"\\b(0o[0-7]+)[lLjJ]?"},{begin:e.C_NUMBER_RE+"[lLjJ]?"}]},l={className:"params",begin:/\(/,end:/\)/,contains:["self",a,r,s]};return i.contains=[s,r,a],{aliases:["py","gyp"],keywords:n,illegal:/(<\/|->|\?)|=>/,contains:[a,r,s,e.HASH_COMMENT_MODE,{variants:[{className:"function",beginKeywords:"def"},{className:"class",beginKeywords:"class"}],end:/:/,illegal:/[${=;\n,]/,contains:[e.UNDERSCORE_TITLE_MODE,l,{begin:/->/,endsWithParent:!0,keywords:"None"}]},{className:"meta",begin:/^[\t ]*@/,end:/$/},{begin:/\b(print|exec)\(/}]}}}});

/***/ })

},[322]);