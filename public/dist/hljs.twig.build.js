webpackJsonp([17],{

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(389);


/***/ }),

/***/ 389:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([14],{465:function(e,a){e.exports=function(e){var a={className:"params",begin:"\\(",end:"\\)"},n="attribute block constant cycle date dump include max min parent random range source template_from_string",t={beginKeywords:n,keywords:{name:n},relevance:0,contains:[a]},s={begin:/\|[A-Za-z_]+:?/,keywords:"abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",contains:[t]},r="autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";return r=r+" "+r.split(" ").map(function(e){return"end"+e}).join(" "),{aliases:["craftcms"],case_insensitive:!0,subLanguage:"xml",contains:[e.COMMENT(/\{#/,/#}/),{className:"template-tag",begin:/\{%/,end:/%}/,contains:[{className:"name",begin:/\w+/,keywords:r,starts:{endsWithParent:!0,contains:[s,t],relevance:0}}]},{className:"template-variable",begin:/\{\{/,end:/}}/,contains:["self",s,t]}]}}}});

/***/ })

},[388]);