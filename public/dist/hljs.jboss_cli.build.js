webpackJsonp([98],{

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(227);


/***/ }),

/***/ 227:
/***/ (function(module, exports) {

webpackJsonpmavon_editor([95],{384:function(e,a){e.exports=function(e){var a={begin:/[\w-]+ *=/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/[\w-]+/}]},n={className:"params",begin:/\(/,end:/\)/,contains:[a],relevance:0},o={className:"function",begin:/:[\w\-.]+/,relevance:0},t={className:"string",begin:/\B(([\/.])[\w\-.\/=]+)+/},r={className:"params",begin:/--[\w\-=\/]+/};return{aliases:["wildfly-cli"],lexemes:"[a-z-]+",keywords:{keyword:"alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",literal:"true false"},contains:[e.HASH_COMMENT_MODE,e.QUOTE_STRING_MODE,r,o,t,n]}}}});

/***/ })

},[226]);