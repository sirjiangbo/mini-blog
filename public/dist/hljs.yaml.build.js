webpackJsonp([4],{

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(415);


/***/ }),

/***/ 415:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([1],{478:function(e,n){e.exports=function(e){var n="[a-zA-Z_][\\w\\-]*",a={className:"attr",variants:[{begin:"^[ \\-]*"+n+":"},{begin:'^[ \\-]*"'+n+'":'},{begin:"^[ \\-]*'"+n+"':"}]},s={className:"template-variable",variants:[{begin:"{{",end:"}}"},{begin:"%{",end:"}"}]},i={className:"string",relevance:0,variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,s]};return{case_insensitive:!0,aliases:["yml","YAML","yaml"],contains:[a,{className:"meta",begin:"^---s*$",relevance:10},{className:"string",begin:"[\\|>] *$",returnEnd:!0,contains:i.contains,end:a.variants[0].begin},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!!"+e.UNDERSCORE_IDENT_RE},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"^ *-",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:"true false yes no null",keywords:{literal:"true false yes no null"}},e.C_NUMBER_MODE,i]}}}});

/***/ })

},[414]);