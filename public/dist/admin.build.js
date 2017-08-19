webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (process.env.NODE_ENV !== 'production' && !source) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;



function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1), __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(32);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _museUi = __webpack_require__(5);

var _museUi2 = _interopRequireDefault(_museUi);

var _store = __webpack_require__(6);

var _store2 = _interopRequireDefault(_store);

var _Admin = __webpack_require__(10);

var _Admin2 = _interopRequireDefault(_Admin);

__webpack_require__(19);

__webpack_require__(30);

var _PostList = __webpack_require__(34);

var _PostList2 = _interopRequireDefault(_PostList);

var _PostAdd = __webpack_require__(37);

var _PostAdd2 = _interopRequireDefault(_PostAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_museUi2.default);
_vue2.default.use(_vueRouter2.default);

var router = new _vueRouter2.default({
    routes: [{ path: '/post/list', component: _PostList2.default }, { path: '/post/add', component: _PostAdd2.default }]
});

new _vue2.default({
    el: '#adminRoot',
    store: _store2.default,
    router: router,
    render: function render(h) {
        return h(_Admin2.default);
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Muse UI v2.1.0 (https://github.com/myronliu347/vue-carbon)
 * (c) 2017 Myron Liu 
 * Released under the MIT License.
 */
!function(t,e){ true?module.exports=e(__webpack_require__(0)):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.MuseUI=e(require("vue")):t.MuseUI=e(t.Vue)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=583)}([function(t,e){t.exports=function(t,e,n,i){var r,a=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(r=t,a=t.default);var s="function"==typeof a?a.options:a;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),i){var l=Object.create(s.computed||null);Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}}),s.computed=l}return{esModule:r,exports:a,options:s}}},function(t,e,n){"use strict";function i(t){return void 0!==t&&null!==t}function r(t){return void 0===t||null===t}function a(t){for(var e=1,n=arguments.length;e<n;e++){var i=arguments[e];for(var r in i)if(i.hasOwnProperty(r)){var a=i[r];void 0!==a&&(t[r]=a)}}return t}function o(t){var e=String(t);return e&&e.indexOf("%")===-1&&e.indexOf("px")===-1&&(e+="px"),e}function s(){for(var t="undefined"!=typeof navigator?navigator.userAgent:"",e=["Android","iPhone","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}function l(){if(!s()){var t=[],e=void 0!==("undefined"==typeof window?"undefined":d()(window))&&window.devicePixelRatio||1;t.push("pixel-ratio-"+Math.floor(e)),e>=2&&t.push("retina");var n=document.getElementsByTagName("html")[0];t.forEach(function(t){return n.classList.add(t)})}}function u(t){var e=[];if(!t)return e;if(t instanceof Array)e=e.concat(t);else if(t instanceof Object)for(var n in t)t[n]&&e.push(n);else e=e.concat(t.split(" "));return e}var c=n(76),d=n.n(c),f=n(68),h=n.n(f),p=n(142);n.d(e,"d",function(){return v}),e.c=i,e.h=r,e.b=a,e.e=o,e.g=s,e.a=l,e.f=u;var m=h()(p),v=function(t){return t?m.indexOf(t)!==-1?p[t]:t:""}},function(t,e,n){"use strict";var i=n(438),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(56)("wks"),r=n(35),a=n(7).Symbol,o="function"==typeof a;(t.exports=function(t){return i[t]||(i[t]=o&&a[t]||(o?a:r)("Symbol."+t))}).store=i},function(t,e,n){"use strict";function i(){v||("undefined"!=typeof window&&window.addEventListener("keydown",function(t){m="tab"===d()(t)}),v=!0)}var r=n(254),a=n.n(r),o=n(38),s=n.n(o),l=n(90),u=n.n(l),c=n(21),d=n.n(c),f=n(1),h=n(64),p=n(9),m=!1,v=!1;e.a={mixins:[p.a],props:{href:{type:String,default:""},disabled:{type:Boolean,default:!1},disableFocusRipple:{type:Boolean,default:!1},disableKeyboardFocus:{type:Boolean,default:!1},disableTouchRipple:{type:Boolean,default:!1},rippleColor:{type:String,default:""},rippleOpacity:{type:Number},centerRipple:{type:Boolean,default:!0},wrapperClass:{type:String,default:""},wrapperStyle:{type:[String,Object]},containerElement:{type:String},tabIndex:{type:Number,default:0},type:{type:String,default:"button"},keyboardFocused:{type:Boolean,default:!1}},data:function(){return{hover:!1,isKeyboardFocused:!1}},computed:{buttonClass:function(){var t=[];return this.disabled&&t.push("disabled"),this.disabled||!this.hover&&!this.isKeyboardFocused||t.push("hover"),t.join(" ")}},beforeMount:function(){var t=this.disabled,e=this.disableKeyboardFocus,n=this.keyboardFocused;t||!n||e||(this.isKeyboardFocused=!0)},mounted:function(){i(),this.isKeyboardFocused&&(this.$el.focus(),this.$emit("keyboardFocus",!0))},beforeUpdate:function(){(this.disabled||this.disableKeyboardFocus)&&this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("keyboardFocus",!1))},beforeDestory:function(){this.cancelFocusTimeout()},methods:{handleHover:function(t){!this.disabled&&n.i(f.g)()&&(this.hover=!0,this.$emit("hover",t))},handleOut:function(t){!this.disabled&&n.i(f.g)()&&(this.hover=!1,this.$emit("hoverExit",t))},removeKeyboardFocus:function(t){this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("KeyboardFocus",!1))},setKeyboardFocus:function(t){this.isKeyboardFocused||(this.isKeyboardFocused=!0,this.$emit("KeyboardFocus",!0))},cancelFocusTimeout:function(){this.focusTimeout&&(clearTimeout(this.focusTimeout),this.focusTimeout=null)},handleKeydown:function(t){this.disabled||this.disableKeyboardFocus||("enter"===d()(t)&&this.isKeyboardFocused&&this.$el.click(),"esc"===d()(t)&&this.isKeyboardFocused&&this.removeKeyboardFocus(t))},handleKeyup:function(t){this.disabled||this.disableKeyboardFocus||"space"===d()(t)&&this.isKeyboardFocused},handleFocus:function(t){var e=this;this.disabled||this.disableKeyboardFocus||(this.focusTimeout=setTimeout(function(){m&&(e.setKeyboardFocus(t),m=!1)},150))},handleBlur:function(t){this.cancelFocusTimeout(),this.removeKeyboardFocus(t)},handleClick:function(t){this.disabled||(m=!1,this.$el.blur(),this.removeKeyboardFocus(t),this.$emit("click",t))},getTagName:function(){var t="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,e=t?"span":"button";switch(!0){case!!this.to:return"router-link";case!!this.href:return"a";case!!this.containerElement:return this.containerElement;default:return e}},createButtonChildren:function(t){var e=this.isKeyboardFocused,n=this.disabled,i=this.disableFocusRipple,r=this.disableKeyboardFocus,a=this.rippleColor,o=this.rippleOpacity,l=this.disableTouchRipple,c=[];c=c.concat(this.$slots.default);var d=!e||h.a.disableFocusRipple||n||i||r?void 0:t(u.a,{color:a,opacity:o});return c=n||l||h.a.disableTouchRipple?[t("div",{class:this.wrapperClass,style:this.wrapperStyle},this.$slots.default)]:[t(s.a,{class:this.wrapperClass,style:this.wrapperStyle,props:{color:this.rippleColor,centerRipple:this.centerRipple,opacity:this.rippleOpacity}},this.$slots.default)],c.unshift(d),c}},watch:{disabled:function(t){t||(this.hover=!1)}},render:function(t){var e={disabled:this.disabled,type:this.type},n=this.to?{to:this.to,tag:this.tag,activeClass:this.activeClass,event:this.event,exact:this.exact,append:this.append,replace:this.replace}:{};this.href&&(e.href=this.disabled?"javascript:;":this.href),this.disabled||(e.tabIndex=this.tabIndex);var i=this.getTagName();return t(i,a()({class:this.buttonClass,domProps:e,props:n,style:{"user-select":this.disabled?"":"none","-webkit-user-select":this.disabled?"":"none",outline:"none",cursor:this.disabled?"":"pointer",appearance:"none"}},"router-link"===i?"nativeOn":"on",{mouseenter:this.handleHover,mouseleave:this.handleOut,touchend:this.handleOut,touchcancel:this.handleOut,click:this.handleClick,focus:this.handleFocus,blur:this.handleBlur,keydown:this.handleKeydown,keyup:this.handleKeyup}),this.createButtonChildren(t))}}},function(t,e,n){t.exports=!n(14)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(12),r=n(79),a=n(59),o=Object.defineProperty;e.f=n(6)?Object.defineProperty:function(t,e,n){if(i(t),e=a(e,!0),i(n),r)try{return o(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){"use strict";e.a={props:{to:{type:[String,Object]},tag:{type:String,default:"a"},activeClass:{type:String,default:"router-link-active"},event:{type:[String,Array],default:"click"},exact:Boolean,append:Boolean,replace:Boolean}}},function(t,e,n){var i=n(8),r=n(32);t.exports=n(6)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){"use strict";var i=n(450),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){var i=n(18);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(7),r=n(3),a=n(29),o=n(10),s="prototype",l=function(t,e,n){var u,c,d,f=t&l.F,h=t&l.G,p=t&l.S,m=t&l.P,v=t&l.B,y=t&l.W,g=h?r:r[e]||(r[e]={}),b=g[s],x=h?i:p?i[e]:(i[e]||{})[s];h&&(n=e);for(u in n)(c=!f&&x&&void 0!==x[u])&&u in g||(d=c?x[u]:n[u],g[u]=h&&"function"!=typeof x[u]?n[u]:v&&c?a(d,i):y&&x[u]==d?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[s]=t[s],e}(d):m&&"function"==typeof d?a(Function.call,d):d,m&&((g.virtual||(g.virtual={}))[u]=d,t&l.R&&b&&!b[u]&&o(b,u,d)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(49),r=n(30);t.exports=function(t){return i(r(t))}},function(t,e,n){"use strict";var i=n(473),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports={}},function(t,e,n){var i=n(83),r=n(47);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e){e=t.exports=function(t){if(t&&"object"==typeof t){var e=t.which||t.keyCode||t.charCode;e&&(t=e)}if("number"==typeof t)return a[t];var r=String(t),o=n[r.toLowerCase()];if(o)return o;var o=i[r.toLowerCase()];return o?o:1===r.length?r.charCodeAt(0):void 0};var n=e.code=e.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},i=e.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};/*!
 * Programatically add the following
 */
for(r=97;r<123;r++)n[String.fromCharCode(r)]=r-32;for(var r=48;r<58;r++)n[r-48]=r;for(r=1;r<13;r++)n["f"+r]=r+111;for(r=0;r<10;r++)n["numpad "+r]=r+96;var a=e.names=e.title={};for(r in n)a[n[r]]=r;for(var o in i)n[o]=i[o]},function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ampm",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!t)return"";var i=t.getHours(),r=t.getMinutes().toString();if("ampm"===e){var a=i<12;i%=12;var o=a?" am":" pm";return i=(i||12).toString(),r.length<2&&(r="0"+r),n&&"12"===i&&"00"===r?" pm"===o?"12 noon":"12 midnight":i+("00"===r?"":":"+r)+o}return i=i.toString(),i.length<2&&(i="0"+i),r.length<2&&(r="0"+r),i+":"+r}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ampm",n=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],new Date);if(!t)return n;var i="",r=-1;"ampm"===e&&(r=t.indexOf("am"),r===-1&&(r=t.indexOf("midnight")),r!==-1?i="am":(i="pm",(r=t.indexOf("pm"))===-1&&(r=t.indexOf("noon")))),r!==-1&&(t=t.substring(0,r).trim());var a=t.split(":"),o=Number(a[0].trim());"pm"===i&&(o+=12),o>=24&&(o=0);var s=a.length>1?Number(a[1]):0;return n.setMinutes(s),n.setHours(o),n}function a(t){return 57.29577951308232*t}function o(t){var e=t.target,n=e.getBoundingClientRect();return{offsetX:t.clientX-n.left,offsetY:t.clientY-n.top}}function s(t){return"hour"===t.type&&(t.value<1||t.value>12)}e.b=i,e.a=r,e.d=a,e.c=o,e.e=s},function(t,e,n){"use strict";var i=n(430),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(439),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(92),r=n.n(i);n.d(e,"menu",function(){return r.a});var a=n(93),o=n.n(a);n.d(e,"menuItem",function(){return o.a})},function(t,e,n){"use strict";function i(t){var e=r(t);return e.setMonth(e.getMonth()+1),e.setDate(e.getDate()-1),e.getDate()}function r(t){return new Date(t.getFullYear(),t.getMonth(),1)}function a(t,e){for(var n=[],r=i(t),a=[],o=[],s=1;s<=r;s++)n.push(new Date(t.getFullYear(),t.getMonth(),s));var l=function(t){for(var e=7-t.length,n=0;n<e;++n)t[a.length?"push":"unshift"](null);a.push(t)};return n.forEach(function(t){o.length>0&&t.getDay()===e&&(l(o),o=[]),o.push(t),n.indexOf(t)===n.length-1&&l(o)}),a}function o(t,e){var n=u(t);return n.setDate(t.getDate()+e),n}function s(t,e){var n=u(t);return n.setMonth(t.getMonth()+e),n}function l(t,e){var n=u(t);return n.setFullYear(t.getFullYear()+e),n}function u(t){return new Date(t.getTime())}function c(t){var e=u(t);return e.setHours(0,0,0,0),e}function d(t,e){var n=c(t),i=c(e);return n.getTime()<i.getTime()}function f(t,e){var n=c(t),i=c(e);return n.getTime()>i.getTime()}function h(t,e,n){return!d(t,e)&&!f(t,n)}function p(t,e){return t&&e&&t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function m(t,e){var n=void 0;return n=12*(t.getFullYear()-e.getFullYear()),n+=t.getMonth(),n-=e.getMonth()}function v(t,e){e=e||"yyyy-MM-dd",t=t||new Date;var n=e;return n=n.replace(/yyyy|YYYY/,t.getFullYear()),n=n.replace(/yy|YY/,t.getYear()%100>9?(t.getYear()%100).toString():"0"+t.getYear()%100),n=n.replace(/MM/,x(t.getMonth()+1)),n=n.replace(/M/g,t.getMonth()+1),n=n.replace(/w|W/g,C.dayAbbreviation[t.getDay()]),n=n.replace(/dd|DD/,x(t.getDate())),n=n.replace(/d|D/g,t.getDate()),n=n.replace(/hh|HH/,x(t.getHours())),n=n.replace(/h|H/g,t.getHours()),n=n.replace(/mm/,x(t.getMinutes())),n=n.replace(/m/g,t.getMinutes()),n=n.replace(/ss|SS/,x(t.getSeconds())),n=n.replace(/s|S/g,t.getSeconds())}function y(t,e){for(var n,i,r=0,a=0,o="",s="",l=new Date,u=l.getFullYear(),c=l.getMonth()+1,d=1,f=l.getHours(),h=l.getMinutes(),p=l.getSeconds(),m="";a<e.length;){for(o=e.charAt(a),s="";e.charAt(a)===o&&a<e.length;)s+=e.charAt(a++);if("yyyy"===s||"YYYY"===s||"yy"===s||"YY"===s||"y"===s||"Y"===s){if("yyyy"!==s&&"YYYY"!==s||(n=4,i=4),"yy"!==s&&"YY"!==s||(n=2,i=2),"y"!==s&&"Y"!==s||(n=2,i=4),null==(u=g(t,r,n,i)))return 0;r+=u.length,2===u.length&&(u=u>70?u-0+1900:u-0+2e3)}else if("MMM"===s||"NNN"===s){c=0;for(var v=0;v<S.length;v++){var y=S[v];if(t.substring(r,r+y.length).toLowerCase()===y.toLowerCase()&&("MMM"===s||"NNN"===s&&v>11)){c=v+1,c>12&&(c-=12),r+=y.length;break}}if(c<1||c>12)return 0}else if("EE"===s||"E"===s)for(var b=0;b<w.length;b++){var x=w[b];if(t.substring(r,r+x.length).toLowerCase()===x.toLowerCase()){r+=x.length;break}}else if("MM"===s||"M"===s){if(null==(c=g(t,r,s.length,2))||c<1||c>12)return 0;r+=c.length}else if("dd"===s||"d"===s||"DD"===s||"D"===s){if(null===(d=g(t,r,s.length,2))||d<1||d>31)return 0;r+=d.length}else if("hh"===s||"h"===s){if(null==(f=g(t,r,s.length,2))||f<1||f>12)return 0;r+=f.length}else if("HH"===s||"H"===s){if(null==(f=g(t,r,s.length,2))||f<0||f>23)return 0;r+=f.length}else if("KK"===s||"K"===s){if(null==(f=g(t,r,s.length,2))||f<0||f>11)return 0;r+=f.length}else if("kk"===s||"k"===s){if(null==(f=g(t,r,s.length,2))||f<1||f>24)return 0;r+=f.length,f--}else if("mm"===s||"m"===s){if(null==(h=g(t,r,s.length,2))||h<0||h>59)return 0;r+=h.length}else if("ss"===s||"s"===s||"SS"===s||"s"===s){if(null==(p=g(t,r,s.length,2))||p<0||p>59)return 0;r+=p.length}else if("u"===s){var C=g(t,r,s.length,3);if(null==C||C<0||C>999)return 0;r+=C.length}else if("a"===s){if("am"===t.substring(r,r+2).toLowerCase())m="AM";else{if("pm"!==t.substring(r,r+2).toLowerCase())return 0;m="PM"}r+=2}else{if(t.substring(r,r+s.length)!==s)return 0;r+=s.length}}if(2===c)if(u%4==0&&u%100!=0||u%400==0){if(d>29)return 0}else if(d>28)return 0;return(4===c||6===c||9===c||11===c)&&d>30?0:(f<12&&"PM"===m?f=f-0+12:f>11&&"AM"===m&&(f-=12),new Date(u,c-1,d,f,h,p))}function g(t,e,n,i){for(var r=i;r>=n;r--){var a=t.substring(e,e+r);if(a.length<n)return null;if(b(a))return a}return null}function b(t){return new RegExp(/^\d+$/).test(t)}function x(t){return t>9?t:"0"+t}n.d(e,"a",function(){return _}),e.j=a,e.i=o,e.g=s,e.d=l,e.e=u,e.h=c,e.l=h,e.k=p,e.f=m,e.c=v,e.b=y;var C={dayAbbreviation:["日","一","二","三","四","五","六"],dayList:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],monthList:["01","02","03","04","05","06","07","08","09","10","11","12"],monthLongList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},_={formatDisplay:function(t){var e=t.getDate();return C.monthList[t.getMonth()]+"-"+(e>9?e:"0"+e)+" "+C.dayList[t.getDay()]},formatMonth:function(t){return t.getFullYear()+" "+C.monthLongList[t.getMonth()]},getWeekDayArray:function(t){for(var e=[],n=[],i=C.dayAbbreviation,r=0;r<i.length;r++)r<t?n.push(i[r]):e.push(i[r]);return e.concat(n)}},S=["January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},function(t,e,n){"use strict";var i=n(43),r=n(28);e.a={props:{open:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0},overlayOpacity:{type:Number,default:.4},overlayColor:{type:String,default:"#000"},escPressClose:{type:Boolean,default:!0},appendBody:{type:Boolean,default:!0}},data:function(){return{overlayZIndex:n.i(r.a)(),zIndex:n.i(r.a)()}},methods:{overlayClick:function(t){this.overlay&&this.$emit("close","overlay")},escPress:function(t){this.escPressClose&&this.$emit("close","esc")},clickOutSide:function(t){this.$emit("clickOutSide",t)},setZIndex:function(){var t=this.$el;this.zIndex||(this.zIndex=n.i(r.a)()),t&&(t.style.zIndex=this.zIndex)},bindClickOutSide:function(){var t=this;this._handleClickOutSide||(this._handleClickOutSide=function(e){var n=t.popupEl();n&&n.contains(e.target)||t.clickOutSide(e)}),setTimeout(function(){window.addEventListener("click",t._handleClickOutSide)},0)},unBindClickOutSide:function(){window.removeEventListener("click",this._handleClickOutSide)},resetZIndex:function(){this.overlayZIndex=n.i(r.a)(),this.zIndex=n.i(r.a)()},popupEl:function(){return this.appendBody?this.$refs.popup:this.$el},appendPopupElToBody:function(){var t=this;this.appendBody&&this.$nextTick(function(){var e=t.popupEl();if(!e)return void console.warn("必须有一个 ref=‘popup’ 的元素");document.body.appendChild(e)})}},mounted:function(){this.open&&(i.a.open(this),this.bindClickOutSide(),this.appendPopupElToBody())},updated:function(){this.overlay||this.setZIndex()},beforeDestroy:function(){if(i.a.close(this),this.unBindClickOutSide(),this.appendBody){var t=this.popupEl();if(!t)return;document.body.removeChild(t)}},watch:{open:function(t,e){t!==e&&(t?(this.bindClickOutSide(),this.resetZIndex(),i.a.open(this),this.appendPopupElToBody()):(this.unBindClickOutSide(),i.a.close(this)))}}}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=20141223,r=function(){return i++}},function(t,e,n){var i=n(264);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(8).f,r=n(15),a=n(4)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,a)&&i(t,a,{configurable:!0,value:e})}},function(t,e,n){var i=n(30);t.exports=function(t){return Object(i(t))}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(287)(!0);n(50)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){n(291);for(var i=n(7),r=n(10),a=n(19),o=n(4)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],l=0;l<5;l++){var u=s[l],c=i[u],d=c&&c.prototype;d&&!d[o]&&r(d,o,u),a[u]=a.Array}},function(t,e,n){n(322);var i=n(0)(n(194),n(508),null,null);t.exports=i.exports},function(t,e,n){"use strict";var i=n(426),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(486),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(74),a=i(r);e.default=a.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}},function(t,e,n){"use strict";var i="@@clickoutsideContext";e.a={bind:function(t,e,n){var r=function(r){n.context&&!t.contains(r.target)&&(e.expression?n.context[t[i].methodName](r):t[i].bindingFn(r))};t[i]={documentHandler:r,methodName:e.expression,bindingFn:e.value},setTimeout(function(){document.addEventListener("click",r)},0)},update:function(t,e){t[i].methodName=e.expression,t[i].bindingFn=e.value},unbind:function(t){document.removeEventListener("click",t[i].documentHandler)}}},function(t,e,n){"use strict";var i=n(99),r=n.n(i),a=n(21),o=n.n(a),s=n(69),l=n.n(s),u=r.a.extend(l.a),c={instances:[],overlay:!1,open:function(t){t&&this.instances.indexOf(t)===-1&&(!this.overlay&&t.overlay&&this.showOverlay(t),this.instances.push(t),this.changeOverlayStyle())},close:function(t){var e=this,n=this.instances.indexOf(t);n!==-1&&(this.instances.splice(n,1),r.a.nextTick(function(){0===e.instances.length&&e.closeOverlay(),e.changeOverlayStyle()}))},showOverlay:function(t){var e=this.overlay=new u({el:document.createElement("div")});e.fixed=!0,e.color=t.overlayColor,e.opacity=t.overlayOpacity,e.zIndex=t.overlayZIndex,e.onClick=this.handleOverlayClick.bind(this),document.body.appendChild(e.$el),this.preventScrolling(),r.a.nextTick(function(){e.show=!0})},preventScrolling:function(){if(!this.locked){var t=document.getElementsByTagName("body")[0],e=document.getElementsByTagName("html")[0];this.bodyOverflow=t.style.overflow,this.htmlOverflow=e.style.overflow,t.style.overflow="hidden",e.style.overflow="hidden",this.locked=!0}},allowScrolling:function(){var t=document.getElementsByTagName("body")[0],e=document.getElementsByTagName("html")[0];t.style.overflow=this.bodyOverflow||"",e.style.overflow=this.htmlOverflow||"",this.bodyOverflow=null,this.htmlOverflow=null,this.locked=!1},closeOverlay:function(){if(this.overlay){this.allowScrolling();var t=this.overlay;t.show=!1,this.overlay=null,setTimeout(function(){t.$el.remove(),t.$destroy()},450)}},changeOverlayStyle:function(){var t=this.instances[this.instances.length-1];this.overlay&&0!==this.instances.length&&t.overlay&&(this.overlay.color=t.overlayColor,this.overlay.opacity=t.overlayOpacity,this.overlay.zIndex=t.overlayZIndex)},handleOverlayClick:function(){if(0!==this.instances.length){var t=this.instances[this.instances.length-1];t.overlayClick&&t.overlayClick()}}};"undefined"!=typeof window&&window.addEventListener("keydown",function(t){if(0!==c.instances.length&&"esc"===o()(t)){var e=c.instances[c.instances.length-1];e.escPress&&e.escPress()}}),e.a=c},function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(t){var e=t.getBoundingClientRect(),n=document.body,i=t.clientTop||n.clientTop||0,r=t.clientLeft||n.clientLeft||0,a=window.pageYOffset||t.scrollTop,o=window.pageXOffset||t.scrollLeft;return{top:e.top+a-i,left:e.left+o-r}},r=function(t,e){var n=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"],i={handleEvent:function(r){n.forEach(function(e){t.removeEventListener(e,i,!1)}),e.apply(t,arguments)}};n.forEach(function(e){t.addEventListener(e,i,!1)})}},function(t,e,n){var i=n(46),r=n(4)("toStringTag"),a="Arguments"==i(function(){return arguments}()),o=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=o(e=Object(t),r))?n:a?i(e):"Object"==(s=i(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(29),r=n(277),a=n(276),o=n(12),s=n(58),l=n(86),u={},c={},e=t.exports=function(t,e,n,d,f){var h,p,m,v,y=f?function(){return t}:l(t),g=i(n,d,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(a(y)){for(h=s(t.length);h>b;b++)if((v=e?g(o(p=t[b])[0],p[1]):g(t[b]))===u||v===c)return v}else for(m=y.call(t);!(p=m.next()).done;)if((v=r(m,g,p.value,e))===u||v===c)return v};e.BREAK=u,e.RETURN=c},function(t,e,n){var i=n(46);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){"use strict";var i=n(51),r=n(13),a=n(85),o=n(10),s=n(15),l=n(19),u=n(278),c=n(33),d=n(284),f=n(4)("iterator"),h=!([].keys&&"next"in[].keys()),p="keys",m="values",v=function(){return this};t.exports=function(t,e,n,y,g,b,x){u(n,e,y);var C,_,S,w=function(t){if(!h&&t in T)return T[t];switch(t){case p:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+" Iterator",$=g==m,O=!1,T=t.prototype,M=T[f]||T["@@iterator"]||g&&T[g],D=M||w(g),F=g?$?w("entries"):D:void 0,E="Array"==e?T.entries||M:M;if(E&&(S=d(E.call(new t)))!==Object.prototype&&(c(S,k,!0),i||s(S,f)||o(S,f,v)),$&&M&&M.name!==m&&(O=!0,D=function(){return M.call(this)}),i&&!x||!h&&!O&&T[f]||o(T,f,D),l[e]=D,l[k]=v,g)if(C={values:$?D:w(m),keys:b?D:w(p),entries:F},x)for(_ in C)_ in T||a(T,_,C[_]);else r(r.P+r.F*(h||O),e,C);return C}},function(t,e){t.exports=!0},function(t,e,n){var i=n(35)("meta"),r=n(18),a=n(15),o=n(8).f,s=0,l=Object.isExtensible||function(){return!0},u=!n(14)(function(){return l(Object.preventExtensions({}))}),c=function(t){o(t,i,{value:{i:"O"+ ++s,w:{}}})},d=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,i)){if(!l(t))return"F";if(!e)return"E";c(t)}return t[i].i},f=function(t,e){if(!a(t,i)){if(!l(t))return!0;if(!e)return!1;c(t)}return t[i].w},h=function(t){return u&&p.NEED&&l(t)&&!a(t,i)&&c(t),t},p=t.exports={KEY:i,NEED:!1,fastKey:d,getWeak:f,onFreeze:h}},function(t,e,n){var i=n(12),r=n(281),a=n(47),o=n(55)("IE_PROTO"),s=function(){},l="prototype",u=function(){var t,e=n(78)("iframe"),i=a.length,r="<",o=">";for(e.style.display="none",n(275).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(r+"script"+o+"document.F=Object"+r+"/script"+o),t.close(),u=t.F;i--;)delete u[l][a[i]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[l]=i(t),n=new s,s[l]=null,n[o]=t):n=u(),void 0===e?n:r(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(56)("keys"),r=n(35);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(7),r="__core-js_shared__",a=i[r]||(i[r]={});t.exports=function(t){return a[t]||(a[t]={})}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(57),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(18);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(7),r=n(3),a=n(51),o=n(61),s=n(8).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=a?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:o.f(t)})}},function(t,e,n){e.f=n(4)},function(t,e,n){n(369);var i=n(0)(n(190),n(551),null,null);t.exports=i.exports},function(t,e,n){"use strict";var i=n(413),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";function i(t){t&&n.i(r.b)(i,t)}var r=n(1);n.i(r.b)(i,{disableTouchRipple:!1,disableFocusRipple:!1}),e.a=i},function(t,e,n){"use strict";var i=n(429),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(447),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(455),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){t.exports={default:n(260),__esModule:!0}},function(t,e,n){n(340);var i=n(0)(n(193),n(526),null,null);t.exports=i.exports},function(t,e,n){"use strict";e.a={mounted:function(){this.$bindResize()},methods:{$bindResize:function(){var t=this;this._handleResize=function(e){t.onResize&&t.onResize()},"undefined"!=typeof window&&window.addEventListener("resize",this._handleResize)},$unBindResize:function(){this._handleResize&&window.removeEventListener("resize",this._handleResize)}},beforeDestroy:function(){this.$unBindResize()}}},function(t,e,n){"use strict";e.a={props:{scroller:{}},mounted:function(){this.$bindScroll()},methods:{$bindScroll:function(){var t=this,e=this.scroller||window;this._handleScroll=function(e){t.onScroll&&t.onScroll()},e.addEventListener("scroll",this._handleScroll)},$unbindScroll:function(t){t=t||this.scroller||window,this._handleScroll&&t.removeEventListener("scroll",this._handleScroll)}},beforeDestroy:function(){this.$unbindScroll()},watch:{scroller:function(t,e){t!==e&&(this.$unbindScroll(e),this.$bindScroll(t))}}}},function(t,e,n){"use strict";var i=n(249),r=n.n(i);n.d(e,"a",function(){return a});var a=function(t,e){return!!new r.a(e).has(t)}},function(t,e,n){"use strict";var i=n(252),r=n.n(i),a=n(253),o=n.n(a),s="undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),l=function(){function t(e){r()(this,t),this.el=e,this.startPos={},this.endPos={},this.starts=[],this.drags=[],this.ends=[],s?this.el.addEventListener("touchstart",this,!1):this.el.addEventListener("mousedown",this,!1)}return o()(t,[{key:"handleEvent",value:function(t){switch(t.type){case"touchstart":this.touchStart(t);break;case"touchmove":this.touchMove(t);break;case"touchcancel":case"touchend":this.touchEnd(t);break;case"mousedown":this.mouseStart(t);break;case"mousemove":this.mouseMove(t);break;case"mouseleave":case"mouseup":this.mouseEnd(t)}}},{key:"touchStart",value:function(t){var e=this,n=t.touches[0];this.startPos={x:n.pageX,y:n.pageY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("touchmove",this,!1),this.el.addEventListener("touchend",this,!1),this.starts.map(function(n){n.call(e,e.startPos,t)})}},{key:"touchMove",value:function(t){var e=this;if(!(t.touches.length>1||t.scale&&1!==t.scale)){var n=t.touches[0];this.endPos={x:n.pageX-this.startPos.x,y:n.pageY-this.startPos.y,time:(new Date).getTime()-this.startPos.time},this.drags.map(function(n){n.call(e,e.endPos,t)})}}},{key:"touchEnd",value:function(t){var e=this;this.endPos.time=(new Date).getTime()-this.startPos.time,this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.ends.map(function(n){n.call(e,e.endPos,t)})}},{key:"mouseStart",value:function(t){var e=this;this.startPos={x:t.clientX,y:t.clientY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("mousemove",this,!1),this.el.addEventListener("mouseup",this,!1),this.starts.map(function(n){n.call(e,e.startPos,t)})}},{key:"mouseMove",value:function(t){var e=this;this.endPos={x:t.clientX-this.startPos.x,y:t.clientY-this.startPos.y},this.drags.map(function(n){n.call(e,e.endPos,t)})}},{key:"mouseEnd",value:function(t){var e=this;this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.endPos.time=(new Date).getTime()-this.startPos.time,this.ends.map(function(n){n.call(e,e.endPos,t)})}},{key:"start",value:function(t){return this.starts.push(t),this}},{key:"end",value:function(t){return this.ends.push(t),this}},{key:"drag",value:function(t){return this.drags.push(t),this}},{key:"reset",value:function(t){var e=t.touches?t.touches[0]:{};this.startPos={x:e.pageX||t.clientX,y:e.pageY||t.clientY,time:(new Date).getTime()},this.endPos={x:0,y:0}}},{key:"destory",value:function(){s?this.el.removeEventListener("touchstart",this,!1):this.el.removeEventListener("mousedown",this,!1)}}]),t}();e.a=l},function(t,e,n){t.exports={default:n(258),__esModule:!0}},function(t,e,n){t.exports={default:n(259),__esModule:!0}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(251),a=i(r),o=n(250),s=i(o),l="function"==typeof s.default&&"symbol"==typeof a.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===l(a.default)?function(t){return void 0===t?"undefined":l(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":void 0===t?"undefined":l(t)}},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(18),r=n(7).document,a=i(r)&&i(r.createElement);t.exports=function(t){return a?r.createElement(t):{}}},function(t,e,n){t.exports=!n(6)&&!n(14)(function(){return 7!=Object.defineProperty(n(78)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(46);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(83),r=n(47).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(15),r=n(16),a=n(267)(!1),o=n(55)("IE_PROTO");t.exports=function(t,e){var n,s=r(t),l=0,u=[];for(n in s)n!=o&&i(s,n)&&u.push(n);for(;e.length>l;)i(s,n=e[l++])&&(~a(u,n)||u.push(n));return u}},function(t,e,n){var i=n(10);t.exports=function(t,e,n){for(var r in e)n&&t[r]?t[r]=e[r]:i(t,r,e[r]);return t}},function(t,e,n){t.exports=n(10)},function(t,e,n){var i=n(45),r=n(4)("iterator"),a=n(19);t.exports=n(3).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||a[i(t)]}},function(t,e){},function(t,e,n){(function(e){function n(t){if("string"==typeof t)return t;if(r(t))return v?v.call(t):"";var e=t+"";return"0"==e&&1/t==-s?"-0":e}function i(t){return!!t&&"object"==typeof t}function r(t){return"symbol"==typeof t||i(t)&&h.call(t)==l}function a(t){return null==t?"":n(t)}function o(t){return a(t).toLowerCase()}var s=1/0,l="[object Symbol]",u="object"==typeof e&&e&&e.Object===Object&&e,c="object"==typeof self&&self&&self.Object===Object&&self,d=u||c||Function("return this")(),f=Object.prototype,h=f.toString,p=d.Symbol,m=p?p.prototype:void 0,v=m?m.toString:void 0;t.exports=o}).call(e,n(582))},function(t,e,n){n(305);var i=n(0)(n(191),n(491),null,null);t.exports=i.exports},function(t,e,n){n(362);var i=n(0)(n(192),n(545),null,null);t.exports=i.exports},function(t,e,n){n(372);var i=n(0)(n(196),n(554),null,null);t.exports=i.exports},function(t,e,n){n(328);var i=n(0)(n(198),n(515),null,null);t.exports=i.exports},function(t,e,n){n(319);var i=n(0)(n(199),n(506),null,null);t.exports=i.exports},function(t,e,n){n(390);var i=n(0)(n(217),n(575),null,null);t.exports=i.exports},function(t,e,n){n(388);var i=n(0)(n(223),n(571),null,null);t.exports=i.exports},function(t,e,n){n(386);var i=n(0)(n(225),n(569),null,null);t.exports=i.exports},function(t,e,n){n(343);var i=n(0)(n(240),n(529),null,null);t.exports=i.exports},function(t,e,n){n(356);var i=n(0)(n(241),null,null,null);t.exports=i.exports},function(e,n){e.exports=t},function(t,e,n){"use strict";var i=n(397),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(398),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(399),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(400),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(401),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(402),r=n.n(i);n.d(e,"bottomNav",function(){return r.a});var a=n(403),o=n.n(a);n.d(e,"bottomNavItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(404),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(405),r=n.n(i);n.d(e,"breadCrumb",function(){return r.a});var a=n(406),o=n.n(a);n.d(e,"breadCrumbItem",function(){return o.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(407),r=n.n(i);n.d(e,"card",function(){return r.a});var a=n(409),o=n.n(a);n.d(e,"cardHeader",function(){return o.a});var s=n(410),l=n.n(s);n.d(e,"cardMedia",function(){return l.a});var u=n(412),c=n.n(u);n.d(e,"cardTitle",function(){return c.a});var d=n(411),f=n.n(d);n.d(e,"cardText",function(){return f.a});var h=n(408),p=n.n(h);n.d(e,"cardActions",function(){return p.a})},function(t,e,n){"use strict";var i=n(414),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(415),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(416),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(422),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(427),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(428),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(431),r=n.n(i);n.d(e,"flexbox",function(){return r.a});var a=n(432),o=n.n(a);n.d(e,"flexboxItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(433),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(300),r=(n.n(i),n(435)),a=n.n(r);n.d(e,"row",function(){return a.a});var o=n(434),s=n.n(o);n.d(e,"col",function(){return s.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(436),r=n.n(i);n.d(e,"gridList",function(){return r.a});var a=n(437),o=n.n(a);n.d(e,"gridTile",function(){return o.a})},function(t,e,n){"use strict";var i=n(440),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(441),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(443),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(91),r=n.n(i);n.d(e,"list",function(){return r.a});var a=n(444),o=n.n(a);n.d(e,"listItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(446),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(449),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(451),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(452),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(453),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(454),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(456),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(457),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(458),r=n.n(i);n.d(e,"step",function(){return r.a});var a=n(459),o=n.n(a);n.d(e,"stepButton",function(){return o.a});var s=n(461),l=n.n(s);n.d(e,"stepContent",function(){return l.a});var u=n(94),c=n.n(u);n.d(e,"stepLabel",function(){return c.a});var d=n(462),f=n.n(d);n.d(e,"stepper",function(){return f.a})},function(t,e,n){"use strict";var i=n(463),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(464),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(465),r=n.n(i);n.d(e,"table",function(){return r.a});var a=n(468),o=n.n(a);n.d(e,"thead",function(){return o.a});var s=n(466),l=n.n(s);n.d(e,"tbody",function(){return l.a});var u=n(467),c=n.n(u);n.d(e,"tfoot",function(){return c.a});var d=n(469),f=n.n(d);n.d(e,"tr",function(){return f.a});var h=n(96),p=n.n(h);n.d(e,"th",function(){return p.a});var m=n(95),v=n.n(m);n.d(e,"td",function(){return v.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(471),r=n.n(i);n.d(e,"tabs",function(){return r.a});var a=n(470),o=n.n(a);n.d(e,"tab",function(){return o.a})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(477),r=n.n(i);n.d(e,"timeline",function(){return r.a});var a=n(478),o=n.n(a);n.d(e,"timelineItem",function(){return o.a})},function(t,e,n){"use strict";var i=n(483),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e,n){"use strict";var i=n(485),r=n.n(i);n.d(e,"a",function(){return r.a})},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(88),r=n.n(i);n.d(e,"levenshteinDistance",function(){return a}),n.d(e,"noFilter",function(){return o}),n.d(e,"caseSensitiveFilter",function(){return s}),n.d(e,"caseInsensitiveFilter",function(){return l}),n.d(e,"levenshteinDistanceFilter",function(){return u}),n.d(e,"fuzzyFilter",function(){return c});var a=function(t,e){for(var n=[],i=void 0,r=void 0,a=0;a<=e.length;a++)for(var o=0;o<=t.length;o++)r=a&&o?t.charAt(o-1)===e.charAt(a-1)?i:Math.min(n[o],n[o-1],i)+1:a+o,i=n[o],n[o]=r;return n.pop()},o=function(){return!0},s=function(t,e){return""!==t&&e.indexOf(t)!==-1},l=function(t,e){return r()(e).indexOf(t.toLowerCase())!==-1},u=function(t){if(void 0===t)return a;if("number"!=typeof t)throw"Error: levenshteinDistanceFilter is a filter generator, not a filter!";return function(e,n){return a(e,n)<t}},c=function(t,e){var n=r()(e);t=r()(t);for(var i=0,a=0;a<e.length;a++)n[a]===t[i]&&(i+=1);return i===t.length}},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=document.getElementsByTagName("body")[0],i=n.scrollTop,r=60;r>=0;r--)setTimeout(function(t){return function(){n.scrollTop=i*t/60,0===t&&"function"==typeof e&&e()}}(r),t*(1-r/60))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"red50",function(){return i}),n.d(e,"red100",function(){return r}),n.d(e,"red200",function(){return a}),n.d(e,"red300",function(){return o}),n.d(e,"red400",function(){return s}),n.d(e,"red500",function(){return l}),n.d(e,"red600",function(){return u}),n.d(e,"red700",function(){return c}),n.d(e,"red800",function(){return d}),n.d(e,"red900",function(){return f}),n.d(e,"redA100",function(){return h}),n.d(e,"redA200",function(){return p}),n.d(e,"redA400",function(){return m}),n.d(e,"redA700",function(){return v}),n.d(e,"red",function(){return y}),n.d(e,"pink50",function(){return g}),n.d(e,"pink100",function(){return b}),n.d(e,"pink200",function(){return x}),n.d(e,"pink300",function(){return C}),n.d(e,"pink400",function(){return _}),n.d(e,"pink500",function(){return S}),n.d(e,"pink600",function(){return w}),n.d(e,"pink700",function(){return k}),n.d(e,"pink800",function(){return $}),n.d(e,"pink900",function(){return O}),n.d(e,"pinkA100",function(){return T}),n.d(e,"pinkA200",function(){return M}),n.d(e,"pinkA400",function(){return D}),n.d(e,"pinkA700",function(){return F}),n.d(e,"pink",function(){return E}),n.d(e,"purple50",function(){return P}),n.d(e,"purple100",function(){return A}),n.d(e,"purple200",function(){return j}),n.d(e,"purple300",function(){return B}),n.d(e,"purple400",function(){return R}),n.d(e,"purple500",function(){return I}),n.d(e,"purple600",function(){return L}),n.d(e,"purple700",function(){return z}),n.d(e,"purple800",function(){return N}),n.d(e,"purple900",function(){return H}),n.d(e,"purpleA100",function(){return W}),n.d(e,"purpleA200",function(){return V}),n.d(e,"purpleA400",function(){return Y}),n.d(e,"purpleA700",function(){return K}),n.d(e,"purple",function(){return G}),n.d(e,"deepPurple50",function(){return X}),n.d(e,"deepPurple100",function(){return U}),n.d(e,"deepPurple200",function(){return q}),n.d(e,"deepPurple300",function(){return Z}),n.d(e,"deepPurple400",function(){return J}),n.d(e,"deepPurple500",function(){return Q}),n.d(e,"deepPurple600",function(){return tt}),n.d(e,"deepPurple700",function(){return et}),n.d(e,"deepPurple800",function(){return nt}),n.d(e,"deepPurple900",function(){return it}),n.d(e,"deepPurpleA100",function(){return rt}),n.d(e,"deepPurpleA200",function(){return at}),n.d(e,"deepPurpleA400",function(){return ot}),n.d(e,"deepPurpleA700",function(){return st}),n.d(e,"deepPurple",function(){return lt}),n.d(e,"indigo50",function(){return ut}),n.d(e,"indigo100",function(){return ct}),n.d(e,"indigo200",function(){return dt}),n.d(e,"indigo300",function(){return ft}),n.d(e,"indigo400",function(){return ht}),n.d(e,"indigo500",function(){return pt}),n.d(e,"indigo600",function(){return mt}),n.d(e,"indigo700",function(){return vt}),n.d(e,"indigo800",function(){return yt}),n.d(e,"indigo900",function(){return gt}),n.d(e,"indigoA100",function(){return bt}),n.d(e,"indigoA200",function(){return xt}),n.d(e,"indigoA400",function(){return Ct}),n.d(e,"indigoA700",function(){return _t}),n.d(e,"indigo",function(){return St}),n.d(e,"blue50",function(){return wt}),n.d(e,"blue100",function(){return kt}),n.d(e,"blue200",function(){return $t}),n.d(e,"blue300",function(){return Ot}),n.d(e,"blue400",function(){return Tt}),n.d(e,"blue500",function(){return Mt}),n.d(e,"blue600",function(){return Dt}),n.d(e,"blue700",function(){return Ft}),n.d(e,"blue800",function(){return Et}),n.d(e,"blue900",function(){return Pt}),n.d(e,"blueA100",function(){return At}),n.d(e,"blueA200",function(){return jt}),n.d(e,"blueA400",function(){return Bt}),n.d(e,"blueA700",function(){return Rt}),n.d(e,"blue",function(){return It}),n.d(e,"lightBlue50",function(){return Lt}),n.d(e,"lightBlue100",function(){return zt}),n.d(e,"lightBlue200",function(){return Nt}),n.d(e,"lightBlue300",function(){return Ht}),n.d(e,"lightBlue400",function(){return Wt}),n.d(e,"lightBlue500",function(){return Vt}),n.d(e,"lightBlue600",function(){return Yt}),n.d(e,"lightBlue700",function(){return Kt}),n.d(e,"lightBlue800",function(){return Gt}),n.d(e,"lightBlue900",function(){return Xt}),n.d(e,"lightBlueA100",function(){return Ut}),n.d(e,"lightBlueA200",function(){return qt}),n.d(e,"lightBlueA400",function(){return Zt}),n.d(e,"lightBlueA700",function(){return Jt}),n.d(e,"lightBlue",function(){return Qt}),n.d(e,"cyan50",function(){return te}),n.d(e,"cyan100",function(){return ee}),n.d(e,"cyan200",function(){return ne}),n.d(e,"cyan300",function(){return ie}),n.d(e,"cyan400",function(){return re}),n.d(e,"cyan500",function(){return ae}),n.d(e,"cyan600",function(){return oe}),n.d(e,"cyan700",function(){return se}),n.d(e,"cyan800",function(){return le}),n.d(e,"cyan900",function(){return ue}),n.d(e,"cyanA100",function(){return ce}),n.d(e,"cyanA200",function(){return de}),n.d(e,"cyanA400",function(){return fe}),n.d(e,"cyanA700",function(){return he}),n.d(e,"cyan",function(){return pe}),n.d(e,"teal50",function(){return me}),n.d(e,"teal100",function(){return ve}),n.d(e,"teal200",function(){return ye}),n.d(e,"teal300",function(){return ge}),n.d(e,"teal400",function(){return be}),n.d(e,"teal500",function(){return xe}),n.d(e,"teal600",function(){return Ce}),n.d(e,"teal700",function(){return _e}),n.d(e,"teal800",function(){return Se}),n.d(e,"teal900",function(){return we}),n.d(e,"tealA100",function(){return ke}),n.d(e,"tealA200",function(){return $e}),n.d(e,"tealA400",function(){return Oe}),n.d(e,"tealA700",function(){return Te}),n.d(e,"teal",function(){return Me}),n.d(e,"green50",function(){return De}),n.d(e,"green100",function(){return Fe}),n.d(e,"green200",function(){return Ee}),n.d(e,"green300",function(){return Pe}),n.d(e,"green400",function(){return Ae}),n.d(e,"green500",function(){return je}),n.d(e,"green600",function(){return Be}),n.d(e,"green700",function(){return Re}),n.d(e,"green800",function(){return Ie}),n.d(e,"green900",function(){return Le}),n.d(e,"greenA100",function(){return ze}),n.d(e,"greenA200",function(){return Ne}),n.d(e,"greenA400",function(){return He}),n.d(e,"greenA700",function(){return We}),n.d(e,"green",function(){return Ve}),n.d(e,"lightGreen50",function(){return Ye}),n.d(e,"lightGreen100",function(){return Ke}),n.d(e,"lightGreen200",function(){return Ge}),n.d(e,"lightGreen300",function(){return Xe}),n.d(e,"lightGreen400",function(){return Ue}),n.d(e,"lightGreen500",function(){return qe}),n.d(e,"lightGreen600",function(){return Ze}),n.d(e,"lightGreen700",function(){return Je}),n.d(e,"lightGreen800",function(){return Qe}),n.d(e,"lightGreen900",function(){return tn}),n.d(e,"lightGreenA100",function(){return en}),n.d(e,"lightGreenA200",function(){return nn}),n.d(e,"lightGreenA400",function(){return rn}),n.d(e,"lightGreenA700",function(){return an}),n.d(e,"lightGreen",function(){return on}),n.d(e,"lime50",function(){return sn}),n.d(e,"lime100",function(){return ln}),n.d(e,"lime200",function(){return un}),n.d(e,"lime300",function(){return cn}),n.d(e,"lime400",function(){return dn}),n.d(e,"lime500",function(){return fn}),n.d(e,"lime600",function(){return hn}),n.d(e,"lime700",function(){return pn}),n.d(e,"lime800",function(){return mn}),n.d(e,"lime900",function(){return vn}),n.d(e,"limeA100",function(){return yn}),n.d(e,"limeA200",function(){return gn}),n.d(e,"limeA400",function(){return bn}),n.d(e,"limeA700",function(){return xn}),n.d(e,"lime",function(){return Cn}),n.d(e,"yellow50",function(){return _n}),n.d(e,"yellow100",function(){return Sn}),n.d(e,"yellow200",function(){return wn}),n.d(e,"yellow300",function(){return kn}),n.d(e,"yellow400",function(){return $n}),n.d(e,"yellow500",function(){return On}),n.d(e,"yellow600",function(){return Tn}),n.d(e,"yellow700",function(){return Mn}),n.d(e,"yellow800",function(){return Dn}),n.d(e,"yellow900",function(){return Fn}),n.d(e,"yellowA100",function(){return En}),n.d(e,"yellowA200",function(){return Pn}),n.d(e,"yellowA400",function(){return An}),n.d(e,"yellowA700",function(){return jn}),n.d(e,"yellow",function(){return Bn}),n.d(e,"amber50",function(){return Rn}),n.d(e,"amber100",function(){return In}),n.d(e,"amber200",function(){return Ln}),n.d(e,"amber300",function(){return zn});n.d(e,"amber400",function(){return Nn}),n.d(e,"amber500",function(){return Hn}),n.d(e,"amber600",function(){return Wn}),n.d(e,"amber700",function(){return Vn}),n.d(e,"amber800",function(){return Yn}),n.d(e,"amber900",function(){return Kn}),n.d(e,"amberA100",function(){return Gn}),n.d(e,"amberA200",function(){return Xn}),n.d(e,"amberA400",function(){return Un}),n.d(e,"amberA700",function(){return qn}),n.d(e,"amber",function(){return Zn}),n.d(e,"orange50",function(){return Jn}),n.d(e,"orange100",function(){return Qn}),n.d(e,"orange200",function(){return ti}),n.d(e,"orange300",function(){return ei}),n.d(e,"orange400",function(){return ni}),n.d(e,"orange500",function(){return ii}),n.d(e,"orange600",function(){return ri}),n.d(e,"orange700",function(){return ai}),n.d(e,"orange800",function(){return oi}),n.d(e,"orange900",function(){return si}),n.d(e,"orangeA100",function(){return li}),n.d(e,"orangeA200",function(){return ui}),n.d(e,"orangeA400",function(){return ci}),n.d(e,"orangeA700",function(){return di}),n.d(e,"orange",function(){return fi}),n.d(e,"deepOrange50",function(){return hi}),n.d(e,"deepOrange100",function(){return pi}),n.d(e,"deepOrange200",function(){return mi}),n.d(e,"deepOrange300",function(){return vi}),n.d(e,"deepOrange400",function(){return yi}),n.d(e,"deepOrange500",function(){return gi}),n.d(e,"deepOrange600",function(){return bi}),n.d(e,"deepOrange700",function(){return xi}),n.d(e,"deepOrange800",function(){return Ci}),n.d(e,"deepOrange900",function(){return _i}),n.d(e,"deepOrangeA100",function(){return Si}),n.d(e,"deepOrangeA200",function(){return wi}),n.d(e,"deepOrangeA400",function(){return ki}),n.d(e,"deepOrangeA700",function(){return $i}),n.d(e,"deepOrange",function(){return Oi}),n.d(e,"brown50",function(){return Ti}),n.d(e,"brown100",function(){return Mi}),n.d(e,"brown200",function(){return Di}),n.d(e,"brown300",function(){return Fi}),n.d(e,"brown400",function(){return Ei}),n.d(e,"brown500",function(){return Pi}),n.d(e,"brown600",function(){return Ai}),n.d(e,"brown700",function(){return ji}),n.d(e,"brown800",function(){return Bi}),n.d(e,"brown900",function(){return Ri}),n.d(e,"brown",function(){return Ii}),n.d(e,"blueGrey50",function(){return Li}),n.d(e,"blueGrey100",function(){return zi}),n.d(e,"blueGrey200",function(){return Ni}),n.d(e,"blueGrey300",function(){return Hi}),n.d(e,"blueGrey400",function(){return Wi}),n.d(e,"blueGrey500",function(){return Vi}),n.d(e,"blueGrey600",function(){return Yi}),n.d(e,"blueGrey700",function(){return Ki}),n.d(e,"blueGrey800",function(){return Gi}),n.d(e,"blueGrey900",function(){return Xi}),n.d(e,"blueGrey",function(){return Ui}),n.d(e,"grey50",function(){return qi}),n.d(e,"grey100",function(){return Zi}),n.d(e,"grey200",function(){return Ji}),n.d(e,"grey300",function(){return Qi}),n.d(e,"grey400",function(){return tr}),n.d(e,"grey500",function(){return er}),n.d(e,"grey600",function(){return nr}),n.d(e,"grey700",function(){return ir}),n.d(e,"grey800",function(){return rr}),n.d(e,"grey900",function(){return ar}),n.d(e,"grey",function(){return or}),n.d(e,"black",function(){return sr}),n.d(e,"white",function(){return lr}),n.d(e,"transparent",function(){return ur}),n.d(e,"fullBlack",function(){return cr}),n.d(e,"darkBlack",function(){return dr}),n.d(e,"lightBlack",function(){return fr}),n.d(e,"minBlack",function(){return hr}),n.d(e,"faintBlack",function(){return pr}),n.d(e,"fullWhite",function(){return mr}),n.d(e,"darkWhite",function(){return vr}),n.d(e,"lightWhite",function(){return yr});var i="#ffebee",r="#ffcdd2",a="#ef9a9a",o="#e57373",s="#ef5350",l="#f44336",u="#e53935",c="#d32f2f",d="#c62828",f="#b71c1c",h="#ff8a80",p="#ff5252",m="#ff1744",v="#d50000",y=l,g="#fce4ec",b="#f8bbd0",x="#f48fb1",C="#f06292",_="#ec407a",S="#e91e63",w="#d81b60",k="#c2185b",$="#ad1457",O="#880e4f",T="#ff80ab",M="#ff4081",D="#f50057",F="#c51162",E=S,P="#f3e5f5",A="#e1bee7",j="#ce93d8",B="#ba68c8",R="#ab47bc",I="#9c27b0",L="#8e24aa",z="#7b1fa2",N="#6a1b9a",H="#4a148c",W="#ea80fc",V="#e040fb",Y="#d500f9",K="#aa00ff",G=I,X="#ede7f6",U="#d1c4e9",q="#b39ddb",Z="#9575cd",J="#7e57c2",Q="#673ab7",tt="#5e35b1",et="#512da8",nt="#4527a0",it="#311b92",rt="#b388ff",at="#7c4dff",ot="#651fff",st="#6200ea",lt=Q,ut="#e8eaf6",ct="#c5cae9",dt="#9fa8da",ft="#7986cb",ht="#5c6bc0",pt="#3f51b5",mt="#3949ab",vt="#303f9f",yt="#283593",gt="#1a237e",bt="#8c9eff",xt="#536dfe",Ct="#3d5afe",_t="#304ffe",St=pt,wt="#e3f2fd",kt="#bbdefb",$t="#90caf9",Ot="#64b5f6",Tt="#42a5f5",Mt="#2196f3",Dt="#1e88e5",Ft="#1976d2",Et="#1565c0",Pt="#0d47a1",At="#82b1ff",jt="#448aff",Bt="#2979ff",Rt="#2962ff",It=Mt,Lt="#e1f5fe",zt="#b3e5fc",Nt="#81d4fa",Ht="#4fc3f7",Wt="#29b6f6",Vt="#03a9f4",Yt="#039be5",Kt="#0288d1",Gt="#0277bd",Xt="#01579b",Ut="#80d8ff",qt="#40c4ff",Zt="#00b0ff",Jt="#0091ea",Qt=Vt,te="#e0f7fa",ee="#b2ebf2",ne="#80deea",ie="#4dd0e1",re="#26c6da",ae="#00bcd4",oe="#00acc1",se="#0097a7",le="#00838f",ue="#006064",ce="#84ffff",de="#18ffff",fe="#00e5ff",he="#00b8d4",pe=ae,me="#e0f2f1",ve="#b2dfdb",ye="#80cbc4",ge="#4db6ac",be="#26a69a",xe="#009688",Ce="#00897b",_e="#00796b",Se="#00695c",we="#004d40",ke="#a7ffeb",$e="#64ffda",Oe="#1de9b6",Te="#00bfa5",Me=xe,De="#e8f5e9",Fe="#c8e6c9",Ee="#a5d6a7",Pe="#81c784",Ae="#66bb6a",je="#4caf50",Be="#43a047",Re="#388e3c",Ie="#2e7d32",Le="#1b5e20",ze="#b9f6ca",Ne="#69f0ae",He="#00e676",We="#00c853",Ve=je,Ye="#f1f8e9",Ke="#dcedc8",Ge="#c5e1a5",Xe="#aed581",Ue="#9ccc65",qe="#8bc34a",Ze="#7cb342",Je="#689f38",Qe="#558b2f",tn="#33691e",en="#ccff90",nn="#b2ff59",rn="#76ff03",an="#64dd17",on=qe,sn="#f9fbe7",ln="#f0f4c3",un="#e6ee9c",cn="#dce775",dn="#d4e157",fn="#cddc39",hn="#c0ca33",pn="#afb42b",mn="#9e9d24",vn="#827717",yn="#f4ff81",gn="#eeff41",bn="#c6ff00",xn="#aeea00",Cn=fn,_n="#fffde7",Sn="#fff9c4",wn="#fff59d",kn="#fff176",$n="#ffee58",On="#ffeb3b",Tn="#fdd835",Mn="#fbc02d",Dn="#f9a825",Fn="#f57f17",En="#ffff8d",Pn="#ffff00",An="#ffea00",jn="#ffd600",Bn=On,Rn="#fff8e1",In="#ffecb3",Ln="#ffe082",zn="#ffd54f",Nn="#ffca28",Hn="#ffc107",Wn="#ffb300",Vn="#ffa000",Yn="#ff8f00",Kn="#ff6f00",Gn="#ffe57f",Xn="#ffd740",Un="#ffc400",qn="#ffab00",Zn=Hn,Jn="#fff3e0",Qn="#ffe0b2",ti="#ffcc80",ei="#ffb74d",ni="#ffa726",ii="#ff9800",ri="#fb8c00",ai="#f57c00",oi="#ef6c00",si="#e65100",li="#ffd180",ui="#ffab40",ci="#ff9100",di="#ff6d00",fi=ii,hi="#fbe9e7",pi="#ffccbc",mi="#ffab91",vi="#ff8a65",yi="#ff7043",gi="#ff5722",bi="#f4511e",xi="#e64a19",Ci="#d84315",_i="#bf360c",Si="#ff9e80",wi="#ff6e40",ki="#ff3d00",$i="#dd2c00",Oi=gi,Ti="#efebe9",Mi="#d7ccc8",Di="#bcaaa4",Fi="#a1887f",Ei="#8d6e63",Pi="#795548",Ai="#6d4c41",ji="#5d4037",Bi="#4e342e",Ri="#3e2723",Ii=Pi,Li="#eceff1",zi="#cfd8dc",Ni="#b0bec5",Hi="#90a4ae",Wi="#78909c",Vi="#607d8b",Yi="#546e7a",Ki="#455a64",Gi="#37474f",Xi="#263238",Ui=Vi,qi="#fafafa",Zi="#f5f5f5",Ji="#eeeeee",Qi="#e0e0e0",tr="#bdbdbd",er="#9e9e9e",nr="#757575",ir="#616161",rr="#424242",ar="#212121",or=er,sr="#000000",lr="#ffffff",ur="rgba(0, 0, 0, 0)",cr="rgba(0, 0, 0, 1)",dr="rgba(0, 0, 0, 0.87)",fr="rgba(0, 0, 0, 0.54)",hr="rgba(0, 0, 0, 0.26)",pr="rgba(0, 0, 0, 0.12)",mr="rgba(255, 255, 255, 1)",vr="rgba(255, 255, 255, 0.87)",yr="rgba(255, 255, 255, 0.54)"},function(t,e,n){"use strict";var i,r=n(88),a=n.n(r),o="undefined"!=typeof document?document.documentElement.style:{},s=!1;i="undefined"!=typeof window&&window.opera&&"[object Opera]"===Object.prototype.toString.call(window.opera)?"presto":"MozAppearance"in o?"gecko":"WebkitAppearance"in o?"webkit":"undefined"!=typeof navigator&&"string"==typeof navigator.cpuClass?"trident":"node";var l={trident:"-ms-",gecko:"-moz-",webkit:"-webkit-",presto:"-o-"}[i],u={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[i],c="undefined"!=typeof document?document.createElement("div"):{},d=u+"Perspective",f=u+"Transform",h=l+"transform",p=u+"Transition",m=l+"transition",v=a()(u)+"TransitionEnd";c.style&&void 0!==c.style[d]&&(s=!0);var y=function(t){var e={left:0,top:0};if(null===t||null===t.style)return e;var n=t.style[f],i=/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(n);return i&&(e.left=+i[1],e.top=+i[3]),e},g=function(t,e,n){if((null!==e||null!==n)&&null!==t&&null!==t.style&&(t.style[f]||0!==e||0!==n)){if(null===e||null===n){var i=y(t);null===e&&(e=i.left),null===n&&(n=i.top)}b(t),t.style[f]+=s?" translate("+(e?e+"px":"0px")+","+(n?n+"px":"0px")+") translateZ(0px)":" translate("+(e?e+"px":"0px")+","+(n?n+"px":"0px")+")"}},b=function(t){if(null!==t&&null!==t.style){var e=t.style[f];e&&(e=e.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g,""),t.style[f]=e)}};e.a={transformProperty:f,transformStyleName:h,transitionProperty:p,transitionStyleName:m,transitionEndProperty:v,getElementTranslate:y,translateElement:g,cancelTranslateElement:b}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-appbar",props:{title:{type:String,default:""},titleClass:{type:[String,Array,Object]},zDepth:{type:Number,default:1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n.n(i),a=n(76),o=n.n(a),s=n(11),l=n(17),u=n(25),c=n(140),d=n(21),f=n.n(d);e.default={name:"mu-auto-complete",props:{anchorOrigin:{type:Object,default:function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},scroller:{},dataSource:{type:Array,default:function(){return[]}},dataSourceConfig:{type:Object,default:function(){return{text:"text",value:"value"}}},disableFocusRipple:{type:Boolean,default:!0},filter:{type:[String,Function],default:"caseSensitiveFilter"},maxSearchResults:{type:Number},openOnFocus:{type:Boolean,default:!1},menuCloseDelay:{type:Number,default:300},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},menuWidth:{type:Number},maxHeight:{type:Number},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{anchorEl:null,focusTextField:!0,open:!1,searchText:this.value,inputWidth:null}},computed:{list:function t(){var e="string"==typeof this.filter?c[this.filter]:this.filter,n=this.dataSourceConfig,i=this.maxSearchResults,a=this.searchText;if(!e)return void console.warn("not found filter:"+this.filter);var t=[];return this.dataSource.every(function(s,l){switch(void 0===s?"undefined":o()(s)){case"string":e(a||"",s,s)&&t.push({text:s,value:s,index:l});break;case"object":if(s&&"string"==typeof s[n.text]){var u=s[n.text];if(!e(a||"",u,s))break;var c=s[n.value];t.push(r()({},s,{text:u,value:c,index:l}))}}return!(i&&i>0&&t.length===i)}),t}},methods:{handleFocus:function(t){!this.open&&this.openOnFocus&&(this.open=!0),this.focusTextField=!0,this.$emit("focus",t)},handleBlur:function(t){this.focusTextField&&!this.timerTouchTapCloseId&&this.close(),this.$emit("blur",t)},handleClose:function(t){this.focusTextField&&"overflow"!==t||this.close()},handleMouseDown:function(t){t.preventDefault()},handleItemClick:function(t){var e=this,n=this.list,i=this.dataSource,r=this.setSearchText,a=this.$refs.menu.$children.indexOf(t),o=n[a].index,s=i[o],l=this.chosenRequestText(s);this.timerTouchTapCloseId=setTimeout(function(){e.timerTouchTapCloseId=null,r(l),e.close(),e.$emit("select",s,o),e.$emit("change",l)},this.menuCloseDelay)},chosenRequestText:function(t){return"string"==typeof t?t:t[this.dataSourceConfig.text]},handleInput:function(){this.notInput?this.notInput=!1:this.open=!0},blur:function(){this.$refs.textField.$el.blur()},focus:function(){this.$refs.textField.focus()},close:function(){this.open=!1},handleKeyDown:function(t){switch(this.$emit("keydown",t),f()(t)){case"enter":if(!this.open)return;var e=this.searchText;this.$emit("change",e,-1),this.close();break;case"esc":this.close();break;case"down":t.preventDefault(),this.open=!0,this.focusTextField=!1}},setSearchText:function(t){this.notInput=!0,this.searchText=t},setInputWidth:function(){this.$el&&(this.inputWidth=this.$el.offsetWidth)}},mounted:function(){this.anchorEl=this.$refs.textField.$el,this.setInputWidth()},updated:function(){this.setInputWidth()},watch:{value:function(t){t!==this.searchText&&this.setSearchText(t)},searchText:function(t){this.$emit("input",t)}},components:{popover:s.a,"text-field":l.a,"mu-menu":u.menu,"menu-item":u.menuItem}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(1);e.default={name:"mu-avatar",props:{backgroundColor:{type:String,default:""},color:{type:String,default:""},icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},src:{type:String,default:""},imgClass:{type:[String,Object,Array]},size:{type:Number},iconSize:{type:Number}},computed:{avatarStyle:function(){return{width:this.size?this.size+"px":"",height:this.size?this.size+"px":"",color:n.i(r.d)(this.color),"background-color":n.i(r.d)(this.backgroundColor)}}},methods:{handleClick:function(){this.$emit("click")}},created:function(){this._isAvatar=!0},components:{icon:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(141),r=n(2);e.default={name:"mu-back-top",data:function(){return{backShow:!1}},components:{icon:r.a},props:{height:{type:Number,default:200},bottom:{type:Number,default:30},right:{type:Number,default:30},durations:{type:Number,default:500},callBack:{type:Function,default:function(){}}},computed:{propsStyle:function(){return{right:this.right+"px",bottom:this.bottom+"px"}}},methods:{moveTop:function(){n.i(i.a)(this.durations,this.callBack)},scrollListener:function(){this.backShow=document.getElementsByTagName("body")[0].scrollTop>=this.height}},mounted:function(){window.addEventListener("scroll",this.scrollListener,!1),window.addEventListener("resize",this.scrollListener,!1)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll,!1),window.removeEventListener("resize",this.handleScroll,!1)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-badge",props:{content:{type:String,default:""},color:{type:String,default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},circle:{type:Boolean,default:!1},badgeClass:{type:[String,Object,Array]}},computed:{badgeStyle:function(){return{"background-color":n.i(i.d)(this.color)}},badgeInternalClass:function(){var t=this.circle,e=this.primary,r=this.secondary,a=this.badgeClass,o=this.$slots&&this.$slots.default&&this.$slots.default.length>0,s=[];return t&&s.push("mu-badge-circle"),e&&s.push("mu-badge-primary"),r&&s.push("mu-badge-secondary"),o&&s.push("mu-badge-float"),s.concat(n.i(i.f)(a))}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5);e.default={name:"mu-bottom-nav",props:{shift:{type:Boolean,default:!1},value:{}},methods:{handleItemClick:function(t,e){t!==this.value&&this.$emit("change",t),this.$emit("itemClick",e),this.$emit("item-click",e)},setChildrenInstance:function(){var t=this;this.$slots.default.forEach(function(e){e&&e.child&&e.child.isBottomNavItem&&(e.child.bottomNav=t)})}},mounted:function(){this.setChildrenInstance()},updated:function(){var t=this;this.$slots.default.forEach(function(e){e&&e.child&&e.child.isBottomNavItem&&(e.child.bottomNav=t)})},render:function(t){return t(i.a,{class:["mu-bottom-nav",this.shift?"mu-bottom-nav-shift":void 0],props:{disableTouchRipple:!this.shift,centerRipple:!1,wrapperClass:"mu-bottom-nav-shift-wrapper",containerElement:"div",rippleOpacity:.3}},this.$slots.default)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-bottom-nav-item",mixins:[r.a],props:{icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},href:{type:String},value:{}},data:function(){return{bottomNav:null}},created:function(){this.isBottomNavItem=!0},computed:{active:function(){return this.bottomNav&&n.i(o.c)(this.value)&&this.bottomNav.value===this.value},shift:function(){return this.bottomNav&&this.bottomNav.shift}},methods:{handleClick:function(){this.bottomNav&&this.bottomNav.handleItemClick&&this.bottomNav.handleItemClick(this.value)}},mounted:function(){for(var t=this.$parent.$children,e=0;e<t.length;e++)if(t[e].$el===this.$el){this.index=e;break}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27);e.default={name:"mu-bottom-sheet",mixins:[i.a],props:{sheetClass:{type:[String,Object,Array]}},methods:{show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-breadcrumb",props:{separator:{type:String,default:"/"}},methods:{updateChildren:function(){var t=this;this.$children.forEach(function(e){e.separator=t.separator})}},mounted:function(){this.updateChildren()},updated:function(){var t=this;this.$nextTick(function(){t.updateChildren()})},watch:{separator:function(){this.updateChildren()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="mu-breadcrumb-item";e.default={name:"mu-breadcrumb-item",data:function(){return{separator:""}},props:{href:{type:String,default:""}},computed:{separatorClass:function(){return i+"-separator"},linkClass:function(){return i+"-link"},currentClass:function(){return i+"-current"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-actions"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-header",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-media",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-text"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-card-title",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(38),a=n.n(r);e.default={name:"mu-checkbox",props:{name:{type:String},value:{},nativeValue:{type:String},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},uncheckIcon:{type:String,default:""},checkedIcon:{type:String,default:""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleClick:function(){},handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:i.a,"touch-ripple":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-chip",props:{showDelete:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},deleteIconClass:{type:[Array,String,Object]},backgroundColor:{type:String},color:{type:String}},data:function(){return{focus:!1,hover:!1}},computed:{classNames:function(){return this.disabled?null:this.focus?["hover","active"]:this.hover?["hover"]:null},style:function(){return{"background-color":n.i(i.d)(this.backgroundColor),color:n.i(i.d)(this.color)}}},methods:{onMouseenter:function(){n.i(i.g)()&&(this.hover=!0)},onMouseleave:function(){n.i(i.g)()&&(this.hover=!1)},onMousedown:function(){this.focus=!0},onMouseup:function(){this.focus=!1},onTouchstart:function(){this.focus=!0},onTouchend:function(){this.focus=!1},handleDelete:function(){this.$emit("delete")},handleClick:function(t){this.disabled||this.$emit("click",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(62),r=n.n(i),a=n(1);e.default={name:"mu-circular-progress",props:{max:{type:Number,default:100},min:{type:Number,default:0},mode:{type:String,default:"indeterminate",validator:function(t){return["indeterminate","determinate"].indexOf(t)!==-1}},value:{type:Number,default:0},color:{type:String},size:{type:Number,default:24},strokeWidth:{type:Number,default:3}},computed:{radius:function(){return(this.size-this.strokeWidth)/2},circularSvgStyle:function(){return{width:this.size,height:this.size}},circularPathStyle:function(){var t=this.getRelativeValue();return{stroke:n.i(a.d)(this.color),"stroke-dasharray":this.getArcLength(t)+", "+this.getArcLength(1)}}},methods:{getArcLength:function(t){return t*Math.PI*(this.size-this.strokeWidth)},getRelativeValue:function(){var t=this.value,e=this.min,n=this.max;return Math.min(Math.max(e,t),n)/(n-e)}},components:{circular:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-content-block"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(421),r=n.n(i),a=n(419),o=n.n(a),s=n(23),l=n(418),u=n.n(l),c=n(26),d=n(420),f=n.n(d),h=n(21),p=n.n(h);e.default={props:{dateTimeFormat:{type:Object,default:function(){return c.a}},autoOk:{type:Boolean,default:!1},okLabel:{type:String,default:"确定"},cancelLabel:{type:String,default:"取消"},disableYearSelection:{type:Boolean,default:!1},firstDayOfWeek:{type:Number,default:1},initialDate:{type:Date,default:function(){return new Date}},maxDate:{type:Date,default:function(){return c.d(new Date,100)}},minDate:{type:Date,default:function(){return c.d(new Date,-100)}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function}},data:function(){var t=c.e(this.initialDate);return t.setDate(1),{weekTexts:this.dateTimeFormat.getWeekDayArray(this.firstDayOfWeek),displayDates:[t],selectedDate:this.initialDate,slideType:"next",displayMonthDay:!0}},computed:{prevMonth:function(){return this.displayDates&&c.f(this.displayDates[0],this.minDate)>0},nextMonth:function(){return this.displayDates&&c.f(this.displayDates[0],this.maxDate)<0}},methods:{handleMonthChange:function(t){var e=c.g(this.displayDates[0],t);this.changeDislayDate(e),this.$emit("monthChange",e)},handleYearChange:function(t){if(this.selectedDate.getFullYear()!==t){var e=c.h(this.selectedDate);e.setFullYear(t),this.setSelected(e),this.selectMonth(),this.$emit("yearChange",e)}},handleSelected:function(t){this.setSelected(t),this.autoOk&&this.handleOk()},handleCancel:function(){this.$emit("dismiss")},handleOk:function(){var t=this.selectedDate,e=this.maxDate,n=this.minDate;t.getTime()>e.getTime()&&(this.selectedDate=new Date(e.getTime())),t.getTime()<n.getTime()&&(this.selectedDate=new Date(n.getTime())),this.$emit("accept",this.selectedDate)},setSelected:function(t){this.selectedDate=t,this.changeDislayDate(t)},changeDislayDate:function(t){var e=this.displayDates[0];if(t.getFullYear()!==e.getFullYear()||t.getMonth()!==e.getMonth()){this.slideType=t.getTime()>e.getTime()?"next":"prev";var n=c.e(t);n.setDate(1),this.displayDates.push(n),this.displayDates.splice(0,1)}},selectYear:function(){this.displayMonthDay=!1},selectMonth:function(){this.displayMonthDay=!0},addSelectedDays:function(t){this.setSelected(c.i(this.selectedDate,t))},addSelectedMonths:function(t){this.setSelected(c.g(this.selectedDate,t))},addSelectedYears:function(t){this.setSelected(c.d(this.selectedDate,t))},handleKeyDown:function(t){switch(p()(t)){case"up":t.altKey&&t.shiftKey?this.addSelectedYears(-1):t.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-7);break;case"down":t.altKey&&t.shiftKey?this.addSelectedYears(1):t.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(7);break;case"right":t.altKey&&t.shiftKey?this.addSelectedYears(1):t.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(1);break;case"left":t.altKey&&t.shiftKey?this.addSelectedYears(-1):t.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-1)}}},mounted:function(){var t=this;this.handleWindowKeyDown=function(e){t.handleKeyDown(e)},"undefined"!=typeof window&&window.addEventListener("keydown",this.handleWindowKeyDown)},beforeDestory:function(){window.removeEventListener("keydown",this.handleWindowKeyDown)},watch:{initialDate:function(t){this.selectedDate=t}},components:{"date-display":r.a,"calendar-toolbar":o.a,"flat-button":s.a,"calendar-month":u.a,"calendar-year":f.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(424),r=n.n(i),a=n(26);e.default={props:{displayDate:{type:Date},firstDayOfWeek:{type:Number,default:1},maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date},shouldDisableDate:{type:Function}},data:function(){return{weeksArray:a.j(this.displayDate||new Date,this.firstDayOfWeek)}},methods:{equalsDate:function(t){return a.k(t,this.selectedDate)},isDisableDate:function(t){if(null===t)return!1;var e=!1;return this.maxDate&&this.minDate&&(e=!a.l(t,this.minDate,this.maxDate)),!e&&this.shouldDisableDate&&(e=this.shouldDisableDate(t)),e},handleClick:function(t){t&&this.$emit("selected",t)}},watch:{displayDate:function(t){return a.j(t||new Date,this.firstDayOfWeek)}},components:{"day-button":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(24);e.default={props:{dateTimeFormat:{type:Object},displayDates:{type:Array},nextMonth:{type:Boolean,default:!0},prevMonth:{type:Boolean,default:!0},slideType:{type:String}},methods:{prev:function(){this.$emit("monthChange",-1)},next:function(){this.$emit("monthChange",1)}},components:{"icon-button":i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(425),r=n.n(i);e.default={props:{maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date}},computed:{years:function t(){for(var e=this.minDate.getFullYear(),n=this.maxDate.getFullYear(),t=[],i=e;i<=n;i++)t.push(i);return t}},methods:{handleClick:function(t){this.$emit("change",t)},scrollToSelectedYear:function(t){var e=this.$refs.container,n=e.clientHeight,i=t.clientHeight||32,r=t.offsetTop+i/2-n/2;e.scrollTop=r}},components:{"year-button":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{dateTimeFormat:{type:Object},disableYearSelection:{type:Boolean,default:!1},monthDaySelected:{type:Boolean,default:!0},selectedDate:{type:Date}},data:function(){return{displayDates:[this.selectedDate],slideType:"next"}},computed:{selectedYear:function(){return!this.monthDaySelected},displayClass:function(){return{"selected-year":this.selectedYear}}},methods:{replaceSelected:function(t){var e=this.displayDates[0];this.slideType=t.getTime()>e.getTime()?"next":"prev",this.displayDates.push(t),this.displayDates.splice(0,1)},handleSelectYear:function(){this.disableYearSelection||this.$emit("selectYear")},handleSelectMonth:function(){this.$emit("selectMonth")}},watch:{selectedDate:function(t){this.replaceSelected(t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(26),r=n(17),a=n(423),o=n.n(a);e.default={name:"mu-date-picker",props:{dateTimeFormat:{type:Object,default:function(){return i.a}},autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function},format:{type:String,default:"YYYY-MM-DD"},maxDate:{type:[String,Date]},minDate:{type:[String,Date]},name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},computed:{maxLimitDate:function(){return this.maxDate?"string"==typeof this.maxDate?i.b(this.maxDate,this.format):this.maxDate:void 0},minLimitDate:function(){return this.minDate?"string"==typeof this.minDate?i.b(this.minDate,this.format):this.minDate:void 0}},data:function(){return{inputValue:this.value,dialogDate:null}},methods:{handleClick:function(){var t=this;this.disabled||setTimeout(function(){t.openDialog()},0)},handleFocus:function(t){t.target.blur(),this.$emit("focus",t)},openDialog:function(){this.disabled||(this.dialogDate=this.inputValue?i.b(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(t){var e=i.c(t,this.format);if(this.inputValue===e)return void this.$emit("change",e);this.inputValue=e,this.$emit("change",e)},dismiss:function(){this.$emit("dismiss")},handleMonthChange:function(t){this.$emit("monthChange",t)},handleYearChange:function(t){this.$emit("yearChange",t)}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"text-field":r.a,"date-picker-dialog":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(26),r=n(11),a=n(39),o=n(417),s=n.n(o);e.default={props:{dateTimeFormat:{type:Object,default:i.a},autoOk:{type:Boolean},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},initialDate:{type:Date,default:function(){return new Date}},maxDate:{type:Date},minDate:{type:Date},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},shouldDisableDate:{type:Function}},data:function(){return{open:!1,showCalendar:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(t){this.$emit("accept",t),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(t){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},handleMonthChange:function(t){this.$emit("monthChange",t)},handleYearChange:function(t){this.$emit("yearChange",t)},hideCanlendar:function(){this.showCalendar=!1}},watch:{open:function(t){t&&(this.showCalendar=!0)}},render:function(t){var e=this.showCalendar?t(s.a,{props:{autoOk:this.autoOk,dateTimeFormat:this.dateTimeFormat,okLabel:this.okLabel,cancelLabel:this.cancelLabel,disableYearSelection:this.disableYearSelection,shouldDisableDate:this.shouldDisableDate,firstDayOfWeek:this.firstDayOfWeek,initialDate:this.initialDate,maxDate:this.maxDate,minDate:this.minDate,mode:this.mode},on:{accept:this.handleAccept,dismiss:this.handleDismiss,monthChange:this.handleMonthChange,yearChange:this.handleYearChange}}):"";return t("div",{style:{}},["dialog"===this.container?t(a.a,{props:{open:this.open,dialogClass:["mu-date-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideCanlendar}},[e]):t(r.a,{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideCanlendar}},[e])])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{selected:{type:Boolean,default:!1},date:{type:Date},disabled:{type:Boolean,default:!1}},data:function(){return{hover:!1}},computed:{isNow:function(){var t=new Date;return this.date&&this.date.getYear()===t.getYear()&&this.date.getMonth()===t.getMonth()&&this.date.getDate()===t.getDate()},dayButtonClass:function(){return{selected:this.selected,hover:this.hover,"mu-day-button":!0,disabled:this.disabled,now:this.isNow}}},methods:{handleHover:function(){n.i(i.g)()&&!this.disabled&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(t){this.$emit("click",t)}},render:function(t){return this.date?t("button",{class:this.dayButtonClass,on:{mouseenter:this.handleHover,mouseleave:this.handleHoverExit,click:this.handleClick},domProps:{disabled:this.disabled}},[t("div",{class:"mu-day-button-bg"}),t("span",{class:"mu-day-button-text",domProps:{innerHTML:this.date.getDate()}})]):t("span",{class:"mu-day-empty"})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{year:{type:[String,Number]},selected:{type:Boolean,default:!1}},data:function(){return{hover:!1}},mounted:function(){this.selected&&this.$parent.scrollToSelectedYear(this.$el)},methods:{handleHover:function(){n.i(i.g)()&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(t){this.$emit("click",t)}},watch:{selected:function(t){t&&this.$parent.scrollToSelectedYear(this.$el)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),r=n(43),a=n(1);e.default={mixins:[i.a],name:"mu-dialog",props:{dialogClass:{type:[String,Array,Object]},title:{type:String},titleClass:{type:[String,Array,Object]},bodyClass:{type:[String,Array,Object]},actionsContainerClass:{type:[String,Array,Object]},scrollable:{type:Boolean,default:!1}},computed:{bodyStyle:function(){return{"overflow-x":"hidden","overflow-y":this.scrollable?"auto":"hidden","-webkit-overflow-scrolling":"touch"}},showTitle:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0},showFooter:function(){return this.$slots&&this.$slots.actions&&this.$slots.actions.length>0},headerClass:function(){var t=this.scrollable,e=[];return t&&e.push("scrollable"),e.concat(n.i(a.f)(this.titleClass))},footerClass:function(){var t=this.scrollable,e=[];return t&&e.push("scrollable"),e.concat(n.i(a.f)(this.actionsContainerClass))}},mounted:function(){this.setMaxDialogContentHeight()},updated:function(){var t=this;this.$nextTick(function(){t.setMaxDialogContentHeight()})},methods:{handleWrapperClick:function(t){this.$refs.popup===t.target&&r.a.handleOverlayClick()},setMaxDialogContentHeight:function(){var t=this.$refs.dialog;if(t){if(!this.scrollable)return void(t.style.maxHeight="");var e=window.innerHeight-128,n=this.$refs,i=n.footer,r=n.title,a=n.elBody;if(i&&(e-=i.offsetHeight),r&&(e-=r.offsetHeight),a){var o=e;i&&(o-=i.offsetHeight),r&&(o-=r.offsetHeight),a.style.maxHeight=o+"px"}t.style.maxHeight=e+"px"}},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},watch:{open:function(t){var e=this;t&&this.$nextTick(function(){e.setMaxDialogContentHeight()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-divider",props:{inset:{type:Boolean,default:!1},shallowInset:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(66),r=n(43),a=n(28),o=n(1),s=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"];e.default={name:"mu-drawer",props:{right:{type:Boolean,default:!1},open:{type:Boolean,default:!1},docked:{type:Boolean,default:!0},width:{type:[Number,String]},zDepth:{type:Number,default:2}},data:function(){return{overlayZIndex:n.i(a.a)(),zIndex:n.i(a.a)()}},computed:{drawerStyle:function(){return{width:n.i(o.e)(this.width),"z-index":this.docked?"":this.zIndex}},overlay:function(){return!this.docked}},methods:{overlayClick:function(){this.$emit("close","overlay")},bindTransition:function(){var t=this;this.handleTransition=function(e){"transform"===e.propertyName&&t.$emit(t.open?"show":"hide")},s.forEach(function(e){t.$el.addEventListener(e,t.handleTransition)})},unBindTransition:function(){var t=this;this.handleTransition&&s.forEach(function(e){t.$el.removeEventListener(e,t.handleTransition)})},resetZIndex:function(){this.overlayZIndex=n.i(a.a)(),this.zIndex=n.i(a.a)()}},watch:{open:function(t){t&&!this.docked?r.a.open(this):r.a.close(this)},docked:function(t,e){t&&!e&&r.a.close(this)}},mounted:function(){this.open&&!this.docked&&r.a.open(this),this.bindTransition()},beforeDestroy:function(){r.a.close(this),this.unBindTransition()},components:{paper:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11),r=n(25),a=n(1),o=n(70);e.default={name:"mu-dropDown-menu",mixins:[o.a],props:{value:{},maxHeight:{type:Number},autoWidth:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},underlineClass:{type:[String,Array,Object]},iconClass:{type:[String,Array,Object]},openImmediately:{type:Boolean,default:!1},anchorOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},anchorEl:{type:Object},scroller:{},separator:{type:String,default:","}},data:function(){return{openMenu:!1,trigger:null,menuWidth:null,label:""}},mounted:function(){this.trigger=this.anchorEl||this.$el,this.openMenu=this.openImmediately,this.label=this.getText(),this.setMenuWidth()},methods:{handleClose:function(){this.$emit("close"),this.openMenu=!1},handleOpen:function(){this.$emit("open"),this.openMenu=!0},itemClick:function(){this.multiple||this.handleClose()},change:function(t){this.$emit("change",t)},setMenuWidth:function(){this.$el&&(this.menuWidth=this.autoWidth?"":this.$el.offsetWidth)},onResize:function(){this.setMenuWidth()},getText:function(){var t=this;if(!this.$slots||!this.$slots.default||0===this.$slots.length||n.i(a.h)(this.value))return"";var e=[];return this.$slots.default.forEach(function(i){if(i.componentOptions&&i.componentOptions.propsData&&!n.i(a.h)(i.componentOptions.propsData.value)){var r=i.componentOptions.propsData,o=r.value,s=r.title;return o===t.value||t.multiple&&t.value.length&&t.value.indexOf(o)!==-1?(e.push(s),!1):void 0}}),e.join(this.separator)}},updated:function(){this.setMenuWidth()},watch:{anchorEl:function(t){t&&(this.trigger=t)},value:function(){this.label=this.getText()}},components:{popover:i.a,"mu-menu":r.menu}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-flat-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object]},type:{type:String},label:{type:String},labelPosition:{type:String,default:"after"},labelClass:{type:[String,Array,Object],default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},href:{type:String,default:""},target:{type:String},backgroundColor:{type:String,default:""},color:{type:String,default:""},hoverColor:{type:String,default:""},rippleColor:{type:String},rippleOpacity:{type:Number}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},computed:{buttonStyle:function(){return{"background-color":this.hover?n.i(o.d)(this.hoverColor):n.i(o.d)(this.backgroundColor),color:n.i(o.d)(this.color)}},buttonClass:function(){return{"mu-flat-button-primary":this.primary,"mu-flat-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"no-label":!this.label}}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-flexbox",props:{gutter:{type:Number,default:8},orient:{type:String,default:"horizontal"},justify:String,align:String,wrap:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-flexbox-item",props:{order:{type:[Number,String],default:0},grow:{type:[Number,String],default:1},shrink:{type:[Number,String],default:1},basis:{type:[Number,String],default:"auto"}},computed:{itemStyle:function(){var t={};return t["horizontal"===this.$parent.orient?"marginLeft":"marginTop"]=this.$parent.gutter+"px",t.flex=this.grow+" "+this.shrink+" "+this.basis,t.order=this.order,t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-float-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object],default:""},type:{type:String},href:{type:String,default:""},target:{type:String},disabled:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},mini:{type:Boolean,default:!1},backgroundColor:{type:String,default:""}},computed:{buttonClass:function(){var t=[];return this.secondary&&t.push("mu-float-button-secondary"),this.mini&&t.push("mu-float-button-mini"),t.join(" ")},buttonStyle:function(){return{"background-color":n.i(o.d)(this.backgroundColor)}}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-col",props:{width:{type:String,default:"100"},tablet:{type:String,default:""},desktop:{type:String,default:""}},computed:{classObj:function t(){var e="col-"+this.width,t={};if(t[e]=!0,this.tablet){t["tablet-"+this.tablet]=!0}if(this.desktop){t["desktop-"+this.desktop]=!0}return t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-row",props:{gutter:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-grid-list",props:{cellHeight:{type:Number,default:180},cols:{type:Number,default:2},padding:{type:Number,default:4}},computed:{gridListStyle:function(){return{margin:-this.padding/this.cols+"px"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-grid-tile",props:{actionPosition:{type:String,default:"right",validator:function(t){return["left","right"].indexOf(t)!==-1}},cols:{type:Number,default:1},rows:{type:Number,default:1},title:{type:String},subTitle:{type:String},titlePosition:{type:String,default:"bottom",validator:function(t){return["top","bottom"].indexOf(t)!==-1}},titleBarClass:{type:[String,Array,Object]}},computed:{tileClass:function(){var t=[];return"top"===this.titlePosition&&t.push("top"),"left"===this.actionPosition&&t.push("action-left"),this.$slots&&this.$slots.title&&this.$slots.subTitle&&this.$slots.title.length>0&&this.$slots.subTitle.length>0&&t.push("multiline"),t},style:function(){return{width:this.cols/this.$parent.cols*100+"%",padding:this.$parent.padding/2+"px",height:this.$parent.cellHeight*this.rows+"px"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-icon",props:{value:{type:String},size:{type:Number},color:{type:String,default:""}},computed:{iconStyle:function(){return{"font-size":this.size+"px",width:this.size+"px",height:this.size+"px",color:n.i(i.d)(this.color)}}},methods:{handleClick:function(t){this.$emit("click",t)}},render:function(t){var e=this.value,n=this.iconStyle,i=this.handleClick;if(!e)return null;var r=0!==e.indexOf(":"),a=r?e:"";return t("i",{class:["mu-icon",r?"material-icons":e.substring(1)],style:n,on:{click:i}},a)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(40);e.default={name:"mu-icon-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object],default:""},type:{type:String},href:{type:String,default:""},target:{type:String},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-center"},touch:{type:Boolean,default:!1}},computed:{verticalPosition:function(){return this.tooltipPosition.split("-")[0]},horizontalPosition:function(){return this.tooltipPosition.split("-")[1]}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},methods:{handleClick:function(t){this.$emit("click",t)},handleHover:function(t){this.tooltipShown=!0,this.$emit("hover",t)},handleHoverExit:function(t){this.tooltipShown=!1,this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)}},mounted:function(){this.tooltipTrigger=this.$el},components:{"abstract-button":i.a,icon:a.a,tooltip:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(24),r=n(11),a=n(25);e.default={name:"mu-icon-menu",props:{icon:{type:String,required:!0},iconClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,default:!1},desktop:{type:Boolean,default:!1},open:{type:Boolean,default:!1},maxHeight:{type:Number},anchorOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},scroller:{},itemClickClose:{type:Boolean,default:!0},tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-center"}},data:function(){return{openMenu:this.open,trigger:null}},methods:{handleOpen:function(){this.openMenu=!0,this.$emit("open")},handleClose:function(){this.openMenu=!1,this.$emit("close")},change:function(t){this.$emit("change",t)},itemClick:function(t){this.itemClickClose&&this.handleClose(),this.$emit("itemClick",t),this.$emit("item-click",t)}},mounted:function(){this.trigger=this.$el},watch:{open:function(t,e){t!==e&&(this.openMenu=t)}},components:{"icon-button":i.a,popover:r.a,"mu-menu":a.menu}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(62),r=n.n(i),a=n(71);e.default={name:"mu-infinite-scroll",mixins:[a.a],props:{loading:{type:Boolean,default:!1},loadingText:{type:String,default:"正在加载。。。"},isLoaded:{type:Boolean,default:!1}},methods:{onScroll:function(){if(!this.loading&&!this.isLoaded){var t=this.scroller,e=t===window,n=e?t.scrollY:t.scrollTop;(e?document.documentElement.scrollHeight||document.body.scrollHeight:t.scrollHeight)-n-5<=(e?window.innerHeight:t.offsetHeight)&&this.$emit("load")}}},components:{circular:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{mergeStyle:{type:Object,default:function(){return{}}},color:{type:String,default:""},opacity:{type:Number}},computed:{styles:function(){return n.i(i.b)({},{color:this.color,opacity:this.opacity},this.mergeStyle)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"circle",props:{size:{type:Number,default:24},color:{type:String,default:""},borderWidth:{type:Number,default:3},secondary:{type:Boolean,default:!1}},computed:{spinnerStyle:function(){return{"border-color":n.i(i.d)(this.color)}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{beforeEnter:function(t){t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0"},enter:function(t){t.dataset.oldOverflow=t.style.overflow,t.style.display="block",0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){t.style.display="",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom},beforeLeave:function(t){t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.display="block",0!==t.scrollHeight&&(t.style.height=t.scrollHeight+"px"),t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&setTimeout(function(){t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0})},afterLeave:function(t){t.style.display="none",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{color:{type:String,default:""},opacity:{type:Number}},computed:{style:function(){return{color:this.color,opacity:this.opacity}}},methods:{setRippleSize:function(){var t=this.$refs.innerCircle,e=t.offsetHeight,n=t.offsetWidth,i=Math.max(e,n),r=0;t.style.top.indexOf("px",t.style.top.length-2)!==-1&&(r=parseInt(t.style.top)),t.style.height=i+"px",t.style.top=e/2-i/2+r+"px"}},mounted:function(){this.setRippleSize()},updated:function(){this.setRippleSize()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-overlay",props:{show:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},onClick:{type:Function},opacity:{type:Number,default:.4},color:{type:String,default:"#000"},zIndex:{type:Number}},computed:{overlayStyle:function(){return{opacity:this.opacity,"background-color":this.color,position:this.fixed?"fixed":"","z-index":this.zIndex}}},methods:{prevent:function(t){t.preventDefault(),t.stopPropagation()},handleClick:function(){this.onClick&&this.onClick()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(442),r=n.n(i),a=n(44);e.default={props:{centerRipple:{type:Boolean,default:!0},rippleWrapperClass:{},color:{type:String,default:""},opacity:{type:Number}},data:function(){return{nextKey:0,ripples:[]}},mounted:function(){this.ignoreNextMouseDown=!1},methods:{start:function(t,e){if(this.ignoreNextMouseDown&&!e)return void(this.ignoreNextMouseDown=!1);this.ripples.push({key:this.nextKey++,color:this.color,opacity:this.opacity,style:this.centerRipple?{}:this.getRippleStyle(t)}),this.ignoreNextMouseDown=e},end:function(){0!==this.ripples.length&&(this.ripples.splice(0,1),this.stopListeningForScrollAbort())},stopListeningForScrollAbort:function(){this.handleMove||(this.handleMove=this.handleTouchMove.bind(this)),document.body.removeEventListener("touchmove",this.handleMove,!1)},startListeningForScrollAbort:function(t){this.firstTouchY=t.touches[0].clientY,this.firstTouchX=t.touches[0].clientX,document.body.addEventListener("touchmove",this.handleMove,!1)},handleMouseDown:function(t){0===t.button&&this.start(t,!1)},handleTouchStart:function(t){t.touches&&(this.startListeningForScrollAbort(t),this.startTime=Date.now()),this.start(t.touches[0],!0)},handleTouchMove:function(t){var e=Math.abs(t.touches[0].clientY-this.firstTouchY),n=Math.abs(t.touches[0].clientX-this.firstTouchX);(e>6||n>6)&&this.end()},getRippleStyle:function(t){var e=this.$refs.holder,n=e.offsetHeight,i=e.offsetWidth,r=a.a(e),o=t.touches&&t.touches.length,s=o?t.touches[0].pageX:t.pageX,l=o?t.touches[0].pageY:t.pageY,u=s-r.left,c=l-r.top,d=this.calcDiag(u,c),f=this.calcDiag(i-u,c),h=this.calcDiag(i-u,n-c),p=this.calcDiag(u,n-c),m=Math.max(d,f,h,p),v=2*m;return{directionInvariant:!0,height:v+"px",width:v+"px",top:c-m+"px",left:u-m+"px"}},calcDiag:function(t,e){return Math.sqrt(t*t+e*e)}},components:{"circle-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={name:"mu-linear-progress",props:{max:{type:Number,default:100},min:{type:Number,default:0},mode:{type:String,default:"indeterminate",validator:function(t){return["indeterminate","determinate"].indexOf(t)!==-1}},value:{type:Number,default:0},color:{type:String},size:{type:Number}},computed:{percent:function(){return(this.value-this.min)/(this.max-this.min)*100},linearStyle:function(){var t=this.size,e=this.color,r=this.mode,a=this.percent;return{height:t+"px","background-color":n.i(i.d)(e),"border-radius":(t?t/2:"")+"px",width:"determinate"===r?a+"%":""}},linearClass:function(){return"mu-linear-progress-"+this.mode}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-list",props:{nestedLevel:{type:Number,default:0},value:{}},methods:{handleChange:function(t){this.$emit("change",t)},handleItemClick:function(t){this.$emit("itemClick",t),this.$emit("item-click",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(24),o=n(91),s=n.n(o),l=n(89),u=n.n(l),c=n(1);e.default={name:"mu-list-item",mixins:[r.a],props:{href:{type:String},target:{type:String},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},afterText:{type:String,default:""},afterTextClass:{type:[String,Object,Array]},describeText:{type:String,default:""},describeTextClass:{type:[String,Object,Array]},describeLine:{type:Number,default:2},inset:{type:Boolean,default:!1},nestedListClass:{type:[String,Object,Array]},open:{type:Boolean,default:!0},toggleNested:{type:Boolean,default:!1},toggleIconClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},disableRipple:{type:Boolean,default:!1},value:{}},data:function(){return{nestedOpen:this.open}},computed:{hasAvatar:function(){return this.$slots&&(this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},nestedLevel:function(){return this.$parent.nestedLevel+1},showLeft:function(){return this.$slots&&(this.$slots.left&&this.$slots.left.length>0||this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0)},showRight:function(){return this.toggleNested||this.$slots&&(this.$slots.right&&this.$slots.right.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},showTitleRow:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0||this.afterText||this.$slots&&this.$slots.after&&this.$slots.after.length>0},showDescribe:function(){return this.describeText||this.$slots&&this.$slots.describe&&this.$slots.describe.length>0},itemClass:function(){var t=["mu-item"];return(this.showLeft||this.inset)&&t.push("show-left"),this.showRight&&t.push("show-right"),this.hasAvatar&&t.push("has-avatar"),this.selected&&t.push("selected"),t.join(" ")},itemStyle:function(){return{"margin-left":18*(this.nestedLevel-1)+"px"}},textStyle:function(){return{"max-height":18*this.describeLine+"px","-webkit-line-clamp":this.describeLine}},showNested:function(){return this.nestedOpen&&this.$slots&&this.$slots.nested&&this.$slots.nested.length>0},selected:function(){return n.i(c.c)(this.$parent.value)&&n.i(c.c)(this.value)&&this.$parent.value===this.value},nestedSelectValue:function(){return this.$parent.value}},methods:{handleToggleNested:function(){this.nestedOpen=!this.nestedOpen,this.$emit("toggleNested",this.nestedOpen),this.$emit("toggle-nested",this.nestedOpen)},handleClick:function(t){this.$emit("click",t),this.$parent.handleItemClick&&this.$parent.handleItemClick(this),n.i(c.c)(this.value)&&this.$parent.handleChange(this.value),this.toggleNested&&this.handleToggleNested()},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleNestedChange:function(t){this.$parent.handleChange(t)},stop:function(t){t.stopPropagation()}},watch:{open:function(t,e){t!==e&&(this.nestedOpen=t)}},components:{"abstract-button":i.a,"mu-list":s.a,"icon-button":a.a,"expand-transition":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(21),a=n.n(r),o=n(42);e.default={name:"mu-menu",props:{desktop:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},autoWidth:{type:Boolean,default:!0},width:{type:[String,Number]},maxHeight:{type:Number},disableAutoFocus:{type:Boolean,default:!1},initiallyKeyboardFocused:{type:Boolean,default:!1},listClass:{type:[String,Object,Array]},popover:{type:Boolean,default:!1},value:{}},data:function(){return{focusIndex:-1,isKeyboardFocused:!1}},computed:{keyWidth:function(){return this.desktop?64:56},contentWidth:function(){return this.autoWidth?"":n.i(i.e)(this.width)},menuListClass:function(){var t=this.desktop,e=this.listClass,r=[];return t&&r.push("mu-menu-destop"),r.concat(n.i(i.f)(e))}},mounted:function(){this.setWidth();var t=this.getSelectedIndex();this.setScollPosition(),this.focusIndex=this.disableAutoFocus?-1:t>=0?t:this.initiallyKeyboardFocused?0:-1,this.isKeyboardFocused=this.initiallyKeyboardFocused},beforeUpdate:function(){var t=this.getSelectedIndex();this.focusIndex=this.disableAutoFocus?-1:t>=0?t:0},updated:function(){this.setWidth()},methods:{clickoutside:function(){this.setFocusIndex(-1,!1)},setWidth:function(){if(this.autoWidth){var t=this.$el,e=this.$refs.list,n=t.offsetWidth;if(0!==n){var i=this.keyWidth,r=1.5*i,a=n/i,o=void 0;a=a<=1.5?1.5:Math.ceil(a),o=a*i,o<r&&(o=r),t.style.width=o+"px",e.style.width=o+"px"}}},handleChange:function(t){this.$emit("change",t)},handleClick:function(t){this.$emit("itemClick",t),this.$emit("item-click",t)},handleKeydown:function(t){switch(a()(t)){case"down":t.stopPropagation(),t.preventDefault(),this.incrementKeyboardFocusIndex();break;case"tab":t.stopPropagation(),t.preventDefault(),t.shiftKey?this.decrementKeyboardFocusIndex():this.incrementKeyboardFocusIndex();break;case"up":t.stopPropagation(),t.preventDefault(),this.decrementKeyboardFocusIndex()}},decrementKeyboardFocusIndex:function(){var t=this.focusIndex,e=this.getMenuItemCount()-1;t--,t<0&&(t=e),this.setFocusIndex(t,!0)},incrementKeyboardFocusIndex:function(){var t=this.focusIndex,e=this.getMenuItemCount()-1;t++,t>e&&(t=0),this.setFocusIndex(t,!0)},getMenuItemCount:function(){var t=0;return this.$children.forEach(function(e){e._isMenuItem&&!e.disabled&&t++}),t},getSelectedIndex:function(){var t=-1,e=0;return this.$children.forEach(function(n){n.active&&(t=e),n._isMenuItem&&!n.disabled&&e++}),t},setFocusIndex:function(t,e){this.focusIndex=t,this.isKeyboardFocused=e},setScollPosition:function(t){var e=this.desktop,n=null;this.$children.forEach(function(t){t.active&&(n=t)});var i=e?32:48;if(n){var r=n.$el.offsetTop,a=r-i;a<i&&(a=0),this.$refs.list.scrollTop=a}}},watch:{focusIndex:function(t,e){var n=this;if(t!==e){var i=0;this.$children.forEach(function(e){if(e._isMenuItem&&!e.disabled){var r=i===t,a="none";r&&(a=n.isKeyboardFocused?"keyboard-focused":"focused"),e.focusState=a,i++}})}},popover:function(t){var e=this;t&&setTimeout(function(){var t=e.getSelectedIndex();e.disableAutoFocus?e.$el.focus():e.setFocusIndex(t,!1)},300)}},directives:{clickoutside:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1),s=n(11),l=n(92),u=n.n(l);e.default={name:"mu-menu-item",mixins:[r.a],props:{href:{type:String},target:{type:String},title:{type:String},titleClass:{type:[String,Object,Array]},afterText:{type:String},afterTextClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},disableFocusRipple:{type:Boolean,default:!1},inset:{type:Boolean,default:!1},leftIcon:{type:String},leftIconColor:{type:String},leftIconClass:{type:[String,Object,Array]},rightIcon:{type:String},rightIconColor:{type:String},rightIconClass:{type:[String,Object,Array]},nestedMenuClass:{type:[String,Object,Array]},nestedMenuListClass:{type:[String,Object,Array]},value:{},nestedMenuValue:{}},computed:{showAfterText:function(){return!this.rightIcon&&this.afterText&&(!this.$slot||!this.$slot.after||0===this.$slot.after.length)},active:function(){return n.i(o.c)(this.$parent.value)&&n.i(o.c)(this.value)&&(this.$parent.value===this.value||this.$parent.multiple&&this.$parent.value.indexOf(this.value)!==-1)}},data:function(){return this._isMenuItem=!0,{openMenu:!1,trigger:null,focusState:"none"}},mounted:function(){this.trigger=this.$el,this.applyFocusState()},methods:{handleClick:function(t){this.$emit("click",t),this.$parent.handleClick(this),this.open(),n.i(o.c)(this.value)&&this.$parent.handleChange(this.value)},filterColor:function(t){return n.i(o.d)(t)},open:function(){this.openMenu=this.$slots&&this.$slots.default&&this.$slots.default.length>0},close:function(){this.openMenu=!1},handleKeyboardFocus:function(t){this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},applyFocusState:function(){var t=this.$refs.button;if(t){var e=t.$el;switch(this.focusState){case"none":e.blur();break;case"focused":e.focus();break;case"keyboard-focused":t.setKeyboardFocus(),e.focus()}}}},watch:{focusState:function(){this.applyFocusState()}},components:{"abstract-button":i.a,icon:a.a,popover:s.a,"mu-menu":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5);e.default={props:{icon:{type:String},index:{type:Number},isCircle:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},isActive:{type:Boolean,default:!1},identifier:{type:String}},data:function(){return{}},methods:{handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)},handleClick:function(){this.index?this.$emit("click",this.index):this.$emit("click",this.identifier)}},components:{"abstract-button":i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(445),r=n.n(i),a=n(67),o=n(17),s=n(93),l=n.n(s);e.default={name:"mu-pagination",props:{total:{type:Number,default:1},current:{type:Number,default:1},defaultPageSize:{type:Number,default:10},pageSize:{type:Number},showSizeChanger:{type:Boolean,default:!1},pageSizeOption:{type:Array,default:function(){return[10,20,30,40]}},pageSizeChangerText:{type:String,default:function(){return" / 页"}}},data:function(){return{leftDisabled:!1,rightDisabled:!1,actualCurrent:this.current,actualPageSize:this.defaultPageSize,totalPageCount:0,pageList:[],quickJumpPage:""}},mounted:function(){this.iconIsDisabled(this.actualCurrent),this.showSizeChanger?this.actualPageSize=this.pageSizeOption[0]:this.pageSize&&(this.actualPageSize=this.pageSize),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),this.pageList=this.calcPageList(this.actualCurrent)},methods:{handleClick:function(t){if("number"==typeof t)this.actualCurrent=t;else switch(t){case"singleBack":this.actualCurrent=Math.max(1,this.actualCurrent-1);break;case"backs":this.actualCurrent=Math.max(1,this.actualCurrent-5);break;case"forwards":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+5);break;case"singleForward":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+1)}},iconIsDisabled:function(t){this.leftDisabled=1===t,this.rightDisabled=t===this.totalPageCount},calcPageList:function(t){var e=[];if(this.totalPageCount>5){var n=Math.max(2,t-2),i=Math.min(t+2,this.totalPageCount-1);t-1<2&&(i=4),this.totalPageCount-t<2&&(n=this.totalPageCount-3);for(var r=n;r<=i;r++)e.push(r)}else for(var a=2;a<this.totalPageCount;a++)e.push(a);return e},pageSizeAndTotalChange:function(t){this.iconIsDisabled(t),this.pageList=this.calcPageList(t)}},components:{"page-item":r.a,"select-field":a.a,"text-field":o.a,"menu-item":l.a},watch:{actualCurrent:function(t){0!==t&&(this.pageSizeAndTotalChange(t),this.$emit("pageChange",t),this.$emit("page-change",t))},actualPageSize:function(t,e){var n=e*(this.actualCurrent-1),i=this.actualCurrent;this.actualCurrent=Math.floor(n/t)+1,this.totalPageCount=Math.ceil(this.total/this.actualPageSize),i===this.actualCurrent&&this.pageSizeAndTotalChange(i),this.$emit("pageSizeChange",t),this.$emit("page-size-change",t)},total:function(t){var e=this.actualCurrent;this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),e===this.actualCurrent&&this.pageSizeAndTotalChange(e)},current:function(t){this.actualCurrent=t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-paper",props:{circle:{type:Boolean,default:!1},rounded:{type:Boolean,default:!0},zDepth:{type:Number,default:1}},computed:{paperClass:function(){var t=[];return this.circle&&t.push("mu-paper-circle"),this.rounded&&t.push("mu-paper-round"),t.push("mu-paper-"+this.zDepth),t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(99),r=n.n(i),a=n(73),o=n(143),s=n(44),l=36;e.default={props:{divider:{type:Boolean,default:!1},content:{type:String,default:""},values:{type:Array,default:function(){return[]}},value:{},textAlign:{type:String,default:""},width:{type:String,default:""},visibleItemCount:{type:Number,default:5}},data:function(){return{animate:!1}},computed:{contentHeight:function(){return l*this.visibleItemCount},valueIndex:function(){return this.values.indexOf(this.value)},dragRange:function(){var t=this.values,e=this.visibleItemCount;return[-l*(t.length-Math.ceil(e/2)),l*Math.floor(e/2)]}},mounted:function(){this.divider||(this.initEvents(),this.doOnValueChange())},methods:{value2Translate:function(t){var e=this.values,n=e.indexOf(t),i=Math.floor(this.visibleItemCount/2);if(n!==-1)return(n-i)*-l},translate2Value:function(t){t=Math.round(t/l)*l;var e=-(t-Math.floor(this.visibleItemCount/2)*l)/l;return this.values[e]},doOnValueChange:function(){var t=this.value,e=this.$refs.wrapper;o.a.translateElement(e,null,this.value2Translate(t))},doOnValuesChange:function(){var t=this.$el,e=t.querySelectorAll(".mu-picker-item");Array.prototype.forEach.call(e,function(t,e){o.a.translateElement(t,null,l*e)})},initEvents:function(){var t=this,e=this.$refs.wrapper,n=new a.a(this.$el),i=0,u=void 0,c=void 0;n.start(function(){i=o.a.getElementTranslate(e).top}).drag(function(t,n){n.preventDefault(),n.stopPropagation();var r=i+t.y;o.a.translateElement(e,0,r),u=r-c||r,c=r}).end(function(n){var i=o.a.getElementTranslate(e).top,a=void 0;n.time<300&&(a=i+7*u);var c=t.dragRange;t.animate=!0,s.b(e,function(){t.animate=!1}),r.a.nextTick(function(){var n=void 0;n=a?Math.round(a/l)*l:Math.round(i/l)*l,n=Math.max(Math.min(n,c[1]),c[0]),o.a.translateElement(e,null,n),t.$emit("change",t.translate2Value(n))})})}},watch:{values:function(t){this.valueIndex===-1&&(this.value=(t||[])[0])},value:function(){this.doOnValueChange()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(448),r=n.n(i);e.default={name:"mu-picker",props:{visibleItemCount:{type:Number,default:5},values:{type:Array,default:function(){return[]}},slots:{type:Array,default:function(){return[]}}},methods:{change:function(t,e){this.$emit("change",e[0],t)}},components:{"picker-slot":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n.n(i),a=n(71),o=n(27),s=n(70);e.default={name:"mu-popover",mixins:[a.a,s.a,o.a],props:{overlay:{default:!1},overlayOpacity:{default:.01},trigger:{},autoPosition:{type:Boolean,default:!0},anchorOrigin:{type:Object,default:function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},popoverClass:{type:[String,Object,Array]}},methods:{getAnchorPosition:function(t){var e=t.getBoundingClientRect(),n={top:e.top,left:e.left,width:t.width,height:t.height};return n.right=e.right||n.left+n.width,n.bottom=e.bottom||n.top+n.height,n.middle=n.left+(n.right-n.left)/2,n.center=n.top+(n.bottom-n.top)/2,n},getTargetPosition:function(t){return{top:0,center:t.offsetHeight/2,bottom:t.offsetHeight,left:0,middle:t.offsetWidth/2,right:t.offsetWidth}},getElInfo:function(t){var e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:t.offsetWidth,height:t.offsetHeight}},setStyle:function(){if(this.open){var t=this.targetOrigin,e=this.anchorOrigin,n=this.$refs.popup,i=this.getAnchorPosition(this.trigger),r=this.getTargetPosition(n),a={top:i[e.vertical]-r[t.vertical],left:i[e.horizontal]-r[t.horizontal]};if(i.top<0||i.top>window.innerHeight||i.left<0||i.left>window.innerWidth)return void this.close("overflow");this.autoPosition&&(r=this.getTargetPosition(n),a=this.applyAutoPositionIfNeeded(i,r,t,e,a)),n.style.left=Math.max(0,a.left)+"px",n.style.top=Math.max(0,a.top)+"px"}},getOverlapMode:function(t,e,n){return[t,e].indexOf(n)>=0?"auto":t===e?"inclusive":"exclusive"},getPositions:function(t,e){var n=r()({},t),i=r()({},e),a={x:["left","right"].filter(function(t){return t!==i.horizontal}),y:["top","bottom"].filter(function(t){return t!==i.vertical})},o={x:this.getOverlapMode(n.horizontal,i.horizontal,"middle"),y:this.getOverlapMode(n.vertical,i.vertical,"center")};return a.x.splice("auto"===o.x?0:1,0,"middle"),a.y.splice("auto"===o.y?0:1,0,"center"),"auto"!==o.y&&(n.vertical="top"===n.vertical?"bottom":"top","inclusive"===o.y&&(i.vertical=i.vertical)),"auto"!==o.x&&(n.horizontal="left"===n.horizontal?"right":"left","inclusive"===o.y&&(i.horizontal=i.horizontal)),{positions:a,anchorPos:n}},applyAutoPositionIfNeeded:function(t,e,n,i,r){var a=this.getPositions(i,n),o=a.positions,s=a.anchorPos;if(r.top<0||r.top+e.bottom>window.innerHeight){var l=t[s.vertical]-e[o.y[0]];l+e.bottom<=window.innerHeight?r.top=Math.max(0,l):(l=t[s.vertical]-e[o.y[1]])+e.bottom<=window.innerHeight&&(r.top=Math.max(0,l))}if(r.left<0||r.left+e.right>window.innerWidth){var u=t[s.horizontal]-e[o.x[0]];u+e.right<=window.innerWidth?r.left=Math.max(0,u):(u=t[s.horizontal]-e[o.x[1]])+e.right<=window.innerWidth&&(r.left=Math.max(0,u))}return r},close:function(t){this.$emit("close",t)},clickOutSide:function(t){this.close("clickOutSide")},onScroll:function(){this.setStyle()},onResize:function(){this.setStyle()},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},mounted:function(){this.setStyle()},updated:function(){var t=this;setTimeout(function(){t.setStyle()},0)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),r=n(1);e.default={name:"mu-popup",mixins:[i.a],props:{popupClass:{type:[String,Object,Array]},popupTransition:{type:String,default:""},position:{type:String,default:""}},data:function(){return{transition:this.popupTransition}},created:function(){this.popupTransition||(this.transition="popup-slide-"+this.position)},computed:{popupCss:function(){var t=this.position,e=this.popupClass,i=[];return t&&i.push("mu-popup-"+t),i.concat(n.i(r.f)(e))}},methods:{show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},watch:{popupTransition:function(t,e){t!==e&&(this.transition=t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(38),a=n.n(r);e.default={name:"mu-radio",props:{name:{type:String},value:{type:String},nativeValue:{type:String},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},uncheckIcon:{type:String,default:""},checkedIcon:{type:String,default:""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleClick:function(){},handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:i.a,"touch-ripple":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(1),o=n(2);e.default={name:"mu-raised-button",mixins:[r.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelPosition:{type:String,default:"after"},labelClass:{type:[String,Array,Object],default:""},primary:{type:Boolean,default:!1},secondary:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},type:{type:String},href:{type:String,default:""},target:{type:String},backgroundColor:{type:String,default:""},color:{type:String,default:""},rippleColor:{type:String},rippleOpacity:{type:Number}},data:function(){return{focus:!1}},computed:{buttonStyle:function(){return{"background-color":n.i(a.d)(this.backgroundColor),color:n.i(a.d)(this.color)}},inverse:function(){return this.primary||this.secondary||this.backgroundColor},buttonClass:function(){return{"mu-raised-button-primary":this.primary,"mu-raised-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"mu-raised-button-inverse":this.inverse,"mu-raised-button-full":this.fullWidth,focus:this.focus,"no-label":!this.label}}},methods:{handleClick:function(t){this.$emit("click",t)},handleKeyboardFocus:function(t){this.focus=t,this.$emit("keyboardFocus",t),this.$emit("keyboard-focus",t)},handleHover:function(t){this.$emit("hover",t)},handleHoverExit:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t)}},components:{"abstract-button":i.a,icon:o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(73),r=n(62),a=n.n(r),o=n(44),s=130,l=-68;e.default={name:"mu-refresh-control",props:{refreshing:{type:Boolean,default:!1},trigger:{}},data:function(){return{y:0,draging:!1,state:"pending"}},computed:{refreshStyle:function(){var t={};if(!this.refreshing&&this.draging){var e="translate3d(0, "+(this.y+l)+"px, 0) ";t["-webkit-transform"]=t.transform=e}return t},circularStyle:function(){var t={};if(!this.refreshing&&this.draging){var e=this.y/s,n="rotate("+360*e+"deg)",i=this.y/Math.abs(l);t["-webkit-transform"]=t.transform=n,t.opacity=i}return t},refreshClass:function(){var t=[];switch(this.state){case"pending":break;case"ready":t.push("mu-refresh-control-noshow");break;case"dragStart":t.push("mu-refresh-control-hide");break;case"dragAnimate":t.push("mu-refresh-control-animate"),t.push("mu-refresh-control-hide");break;case"refreshAnimate":t.push("mu-refresh-control-animate"),t.push("mu-refresh-control-noshow")}return this.refreshing&&t.push("mu-refresh-control-refreshing"),t}},mounted:function(){this.bindDrag()},beforeDestory:function(){this.unbindDrag()},methods:{clearState:function(){this.state="ready",this.draging=!1,this.y=0},getScrollEventTarget:function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var n=document.defaultView.getComputedStyle(e).overflowY;if("scroll"===n||"auto"===n)return e;e=e.parentNode}return window},getScrollTop:function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},bindDrag:function(){var t=this;if(this.trigger){var e=this.drager=new i.a(this.trigger);this.state="ready",e.start(function(){if(!t.refreshing){t.state="dragStart";0===t.getScrollTop(t.getScrollEventTarget(t.$el))&&(t.draging=!0)}}).drag(function(n,i){var r=t.getScrollTop(t.getScrollEventTarget(t.$el));n.y<5||t.refreshing||0!==r||(0!==r||t.draging||(t.draging=!0,e.reset(i)),t.draging&&n.y>0&&(i.preventDefault(),i.stopPropagation()),t.y=n.y/2,t.y<0&&(t.y=1),t.y>s&&(t.y=s))}).end(function(e,n){if(!e.y||e.y<5)return void t.clearState();var i=t.y+l>0&&t.draging;t.state="dragAnimate",i?(t.draging=!1,t.$emit("refresh")):(t.y=0,o.b(t.$el,t.clearState.bind(t)))})}},unbindDrag:function(){this.drager&&(this.drager.destory(),this.drager=null)}},watch:{refreshing:function(t){t?this.state="refreshAnimate":o.b(this.$el,this.clearState.bind(this))},trigger:function(t,e){t!==e&&(this.unbindDrag(),this.bindDrag())}},components:{circular:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),r=n(65),a=n(1);e.default={name:"mu-select-field",props:{name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},maxHeight:{type:Number},autoWidth:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},dropDownIconClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,default:!1},scroller:{},separator:{type:String,default:","}},data:function(){var t=this.value;return n.i(a.h)(t)&&(t=""),!this.multiple||t instanceof Array||(t=[]),{anchorEl:null,inputValue:t}},mounted:function(){this.anchorEl=this.$children[0].$refs.input},methods:{handlehange:function(t){if(t!==this.inputValue){if(this.multiple){var e=this.inputValue.indexOf(t);e===-1?this.inputValue.push(t):this.inputValue.splice(e,1)}else this.inputValue=t;this.$emit("change",this.inputValue)}},handleOpen:function(){this.$refs.textField.handleFocus(),this.$emit("open")},handleClose:function(){this.$refs.textField.handleBlur(),this.$emit("close")}},watch:{value:function(t){this.inputValue=t},inputValue:function(t,e){t!==e&&this.$emit("input",t)}},components:{"text-field":i.a,"dropDown-menu":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(90),r=n.n(i),a=n(21),o=n.n(a);e.default={name:"mu-slider",props:{name:{type:String},value:{type:[Number,String],default:0},max:{type:Number,default:100},min:{type:Number,default:0},step:{type:Number,default:.1},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:this.value,active:!1,hover:!1,focused:!1,dragging:!1}},computed:{percent:function(){var t=(this.inputValue-this.min)/(this.max-this.min)*100;return t>100?100:t<0?0:t},fillStyle:function(){return{width:this.percent+"%"}},thumbStyle:function(){return{left:this.percent+"%"}},sliderClass:function(){return{zero:this.inputValue<=this.min,active:this.active,disabled:this.disabled}}},created:function(){this.handleDragMouseMove=this.handleDragMouseMove.bind(this),this.handleMouseEnd=this.handleMouseEnd.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this)},methods:{handleKeydown:function(t){var e=this.min,n=this.max,i=this.step,r=void 0;switch(o()(t)){case"page down":case"down":r="decrease";break;case"left":r="decrease";break;case"page up":case"up":r="increase";break;case"right":r="increase";break;case"home":r="min";break;case"end":r="max"}if(r){switch(t.preventDefault(),r){case"decrease":this.inputValue-=i;break;case"increase":this.inputValue+=i;break;case"min":this.inputValue=e;break;case"max":this.inputValue=n}this.inputValue=parseFloat(this.inputValue.toFixed(5)),this.inputValue>n?this.inputValue=n:this.inputValue<e&&(this.inputValue=e)}},handleMouseDown:function(t){this.disabled||(this.setValue(t),t.preventDefault(),document.addEventListener("mousemove",this.handleDragMouseMove),document.addEventListener("mouseup",this.handleMouseEnd),this.$el.focus(),this.onDragStart(t))},handleMouseUp:function(){this.disabled||(this.active=!1)},handleTouchStart:function(t){this.disabled||(this.setValue(t.touches[0]),document.addEventListener("touchmove",this.handleTouchMove),document.addEventListener("touchup",this.handleTouchEnd),document.addEventListener("touchend",this.handleTouchEnd),document.addEventListener("touchcancel",this.handleTouchEnd),t.preventDefault(),this.onDragStart(t))},handleTouchEnd:function(t){this.disabled||(document.removeEventListener("touchmove",this.handleTouchMove),document.removeEventListener("touchup",this.handleTouchEnd),document.removeEventListener("touchend",this.handleTouchEnd),document.removeEventListener("touchcancel",this.handleTouchEnd),this.onDragStop(t))},handleFocus:function(){this.disabled||(this.focused=!0)},handleBlur:function(){this.disabled||(this.focused=!1)},handleMouseEnter:function(){this.disabled||(this.hover=!0)},handleMouseLeave:function(){this.disabled||(this.hover=!1)},setValue:function(t){var e=this.$el,n=this.max,i=this.min,r=this.step,a=(t.clientX-e.getBoundingClientRect().left)/e.offsetWidth*(n-i);a=Math.round(a/r)*r+i,a=parseFloat(a.toFixed(5)),a>n?a=n:a<i&&(a=i),this.inputValue=a,this.$emit("change",a)},onDragStart:function(t){this.dragging=!0,this.active=!0,this.$emit("dragStart",t),this.$emit("drag-start",t)},onDragUpdate:function(t){var e=this;this.dragRunning||(this.dragRunning=!0,window.requestAnimationFrame(function(){e.dragRunning=!1,e.disabled||e.setValue(t)}))},onDragStop:function(t){this.dragging=!1,this.active=!1,this.$emit("dragStop",t),this.$emit("drag-stop",t)},handleDragMouseMove:function(t){this.onDragUpdate(t)},handleTouchMove:function(t){this.onDragUpdate(t.touches[0])},handleMouseEnd:function(t){document.removeEventListener("mousemove",this.handleDragMouseMove),document.removeEventListener("mouseup",this.handleMouseEnd),this.onDragStop(t)}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"focus-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(23),r=n(28),a=n(42);e.default={name:"mu-snackbar",props:{action:{type:String},actionColor:{type:String},message:{type:String}},data:function(){return{zIndex:n.i(r.a)()}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")},handleActionClick:function(){this.$emit("actionClick"),this.$emit("action-click")}},components:{"flat-button":i.a},directives:{clickoutside:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(74),r=n.n(i);e.default={name:"mu-step",props:{active:{type:Boolean,default:!1},completed:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},index:{type:Number},last:{type:Boolean,default:!1}},render:function(t){var e=this.active,n=this.completed,i=this.disabled,a=this.index,o=this.last,s=[];return this.$slots.default&&this.$slots.default.length>0&&this.$slots.default.forEach(function(t){if(t.componentOptions&&t.componentOptions.propsData){var l=a+1;t.componentOptions.propsData=r()({active:e,completed:n,disabled:i,last:o,num:l},t.componentOptions.propsData),s.push(t)}}),t("div",{class:"mu-step"},s)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(94),a=n.n(r);e.default={name:"mu-step-button",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]},last:{type:Boolean},childrenInLabel:{type:Boolean,default:!0}},methods:{handleClick:function(t){this.$emit("click",t)}},components:{abstractButton:i.a,"step-label":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(89),r=n.n(i);e.default={name:"mu-step-content",props:{active:{type:Boolean},last:{type:Boolean}},components:{"expand-transition":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-step-label",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(460),r=n.n(i);e.default={name:"mu-stepper",props:{activeStep:{type:Number,default:0},linear:{type:Boolean,default:!0},orientation:{type:String,default:"horizontal",validator:function(t){return["horizontal","vertical"].indexOf(t)!==-1}}},render:function(t){var e=this.activeStep,n=this.linear,i=this.orientation,a=[];if(this.$slots.default&&this.$slots.default.length>0){var o=0;this.$slots.default.forEach(function(i){if(i.componentOptions){o>0&&a.push(t(r.a,{}));var s=i.componentOptions.propsData;e===o?s.active=!0:n&&e>o?s.completed=!0:n&&e<o&&(s.disabled=!0),s.index=o++,a.push(i)}}),a.length>0&&(a[a.length-1].componentOptions.propsData.last=!0)}return t("div",{class:["mu-stepper","vertical"===i?"mu-stepper-vertical":""]},a)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-sub-header",props:{inset:{type:Boolean,default:!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(38),r=n.n(i);e.default={name:"mu-switch",props:{name:{type:String},value:{type:Boolean},label:{type:String,default:""},labelLeft:{type:Boolean,default:!1},labelClass:{type:[String,Object,Array]},trackClass:{type:[String,Object,Array]},thumbClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:this.value}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},methods:{handleMouseDown:function(t){this.disabled||0===t.button&&this.$children[0].start(t)},handleClick:function(){},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(t){this.disabled||this.$children[0].start(t)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{"touch-ripple":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-table",props:{fixedFooter:{type:Boolean,default:!0},fixedHeader:{type:Boolean,default:!0},height:{type:String},enableSelectAll:{type:Boolean,default:!1},allRowsSelected:{type:Boolean,default:!1},multiSelectable:{type:Boolean,default:!1},selectable:{type:Boolean,default:!0},showCheckbox:{type:Boolean,default:!0}},data:function(){return{isSelectAll:!1}},computed:{bodyStyle:function(){return{overflow:"auto",height:this.height}}},mounted:function(){this.allRowsSelected&&this.selectAll()},methods:{handleRowClick:function(t,e){this.$emit("rowClick",t,e),this.$emit("row-click",t,e)},handleRowHover:function(t,e){this.$emit("rowHover",t,e),this.$emit("row-hover",t,e)},handleRowHoverExit:function(t,e){this.$emit("rowHoverExit",t,e),this.$emit("row-hover-exit",t,e)},handleRowSelect:function(t){this.$emit("rowSelection",t),this.$emit("row-selection",t)},handleCellClick:function(t,e,n,i){this.$emit("cellClick",t,e,n,i),this.$emit("cell-click",t,e,n,i)},handleCellHover:function(t,e,n,i){this.$emit("cellHover",t,e,n,i),this.$emit("cell-hover",t,e,n,i)},handleCellHoverExit:function(t,e,n,i){this.$emit("cellHoverExit",t,e,n,i),this.$emit("cell-hover-exit",t,e,n,i)},changeSelectAll:function(t){this.isSelectAll=t},selectAll:function(){var t=this.getTbody();t&&t.selectAll()},unSelectAll:function(){var t=this.getTbody();t&&t.unSelectAll()},getTbody:function(){for(var t=0;t<this.$children.length;t++){var e=this.$children[t];if(e.isTbody)return e}}},watch:{allRowsSelected:function(t,e){t!==e&&(t?this.selectAll():this.unSelectAll())}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tbody",data:function(){return{selectedRows:[]}},created:function(){this.isTbody=!0,this._unSelectAll=!1},computed:{showCheckbox:function(){return this.$parent.showCheckbox},selectable:function(){return this.$parent.selectable},multiSelectable:function(){return this.$parent.multiSelectable},enableSelectAll:function(){return this.$parent.enableSelectAll},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleRowClick:function(t,e){this.$parent.handleRowClick(this.getRowIndex(e),e)},selectRow:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.selectable){if(this.selectedRows.indexOf(t)===-1){if(this.multiSelectable||(this.selectedRows=[]),this.selectedRows.push(t),this.isSelectAllRow())return void this.selectAll(!0);this.$parent.handleRowSelect&&e&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}}},isSelectAllRow:function(){if(!this.enableSelectAll||!this.multiSelectable)return!1;var t=0;return this.$children.forEach(function(e){e.selectable&&t++}),t===this.selectedRows.length},unSelectRow:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.selectable){var n=this.selectedRows.indexOf(t);n!==-1&&this.selectedRows.splice(n,1),this._unSelectAll=!0,this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&e&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}},selectAll:function(t){var e=this;this.selectable&&this.multiSelectable&&(this._unSelectAll=!1,t||(this.selectedRows=[],this.$children.forEach(function(t){t.selectable&&e.selectedRows.push(t.rowId)})),this.$parent.changeSelectAll(!0),this.$parent.handleRowSelect&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows)))},unSelectAll:function(){this.selectable&&this.multiSelectable&&(this.selectedRows=[],this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&this.$parent.handleRowSelect([]))},handleCellClick:function(t,e,n,i,r){this.$parent.handleCellClick&&this.$parent.handleCellClick(this.getRowIndex(r),e,n,r)},handleCellHover:function(t,e,n,i,r){this.$parent.handleCellHover&&this.$parent.handleCellHover(this.getRowIndex(r),e,n,r)},handleCellHoverExit:function(t,e,n,i,r){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(this.getRowIndex(r),e,n,r)},handleRowHover:function(t,e,n){this.$parent.handleRowHover&&this.$parent.handleRowHover(this.getRowIndex(n),n)},handleRowHoverExit:function(t,e,n){this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(this.getRowIndex(n),n)},getRowIndex:function(t){return this.$children.indexOf(t)},convertSelectedRows:function(){var t=this,e=this.selectedRows.map(function(e){return t.convertRowIdToIndex(e)}).filter(function(t){return t!==-1});return this.multiSelectable?e:e[0]},convertRowIdToIndex:function(t){for(var e=0;e<this.$children.length;e++){var n=this.$children[e];if(n.rowId&&n.rowId===t)return e}return-1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-td",props:{name:{type:String}},methods:{handleMouseEnter:function(t){this.$emit("hover",t),this.$parent.handleCellHover&&this.$parent.handleCellHover(t,this.name,this)},handleMouseLeave:function(t){this.$emit("hoverExit",t),this.$emit("hover-exit",t),this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(t,this.name,this)},handleClick:function(t){this.$emit("click",t),this.$parent.handleCellClick&&this.$parent.handleCellClick(t,this.name,this)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tfoot",created:function(){this.isTfoot=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(40);e.default={name:"mu-th",props:{tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-right"},touch:{type:Boolean,default:!1}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},mounted:function(){this.tooltipTrigger=this.$refs.wrapper},computed:{verticalPosition:function(){return this.tooltipPosition.split("-")[0]},horizontalPosition:function(){return this.tooltipPosition.split("-")[1]}},methods:{showTooltip:function(){this.tooltipShown=!0},hideTooltip:function(){this.tooltipShown=!1}},components:{tooltip:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-thead",created:function(){this.isThead=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{selectAll:function(){this.$parent.selectAll()},unSelectAll:function(){this.$parent.unSelectAll()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(95),a=n.n(r),o=n(96),s=n.n(o),l=n(63),u=1;e.default={name:"mu-tr",props:{selectable:{type:Boolean,default:!0},selected:{type:Boolean,default:!1}},data:function(){return{hover:!1,rowId:"tr-"+u++}},mounted:function(){this.selected&&this.$parent.selectRow(this.rowId)},computed:{className:function(){return{hover:this.hover,selected:this.isSelected,stripe:!1}},isTh:function(){return this.$parent.isThead},isTf:function(){return this.$parent.isTfoot},isTb:function(){return this.$parent.isTbody},isSelected:function(){return this.$parent.selectedRows&&this.$parent.selectedRows.indexOf(this.rowId)!==-1},showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleHover:function(t){n.i(i.g)()&&this.$parent.isTbody&&(this.hover=!0,this.$parent.handleRowHover&&this.$parent.handleRowHover(t,this.rowId,this))},handleExit:function(t){n.i(i.g)()&&this.$parent.isTbody&&(this.hover=!1,this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(t,this.rowId,this))},handleClick:function(t){this.$parent.isTbody&&(this.selectable&&(this.isSelected?this.$parent.unSelectRow(this.rowId):this.$parent.selectRow(this.rowId)),this.$parent.handleRowClick(t,this))},handleCheckboxClick:function(t){t.stopPropagation()},handleCheckboxChange:function(t){this.selectable&&(t?this.$parent.selectRow(this.rowId):this.$parent.unSelectRow(this.rowId))},handleSelectAllChange:function(t){t?this.$parent.selectAll():this.$parent.unSelectAll()},handleCellHover:function(t,e,n){this.$parent.handleCellHover&&this.$parent.handleCellHover(t,e,n,this.rowId,this)},handleCellHoverExit:function(t,e,n){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(t,e,n,this.rowId,this)},handleCellClick:function(t,e,n){this.$parent.handleCellClick&&this.$parent.handleCellClick(t,e,n,this.rowId,this)}},watch:{selected:function(t,e){t!==e&&(t?this.$parent.selectRow(this.rowId,!1):this.$parent.unSelectRow(this.rowId,!1))}},components:{"mu-td":a.a,"mu-th":s.a,checkbox:l.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(9),a=n(2),o=n(1);e.default={name:"mu-tab",mixins:[r.a],props:{icon:{type:String,default:""},iconClass:{type:[String,Object,Array]},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},href:{type:String},disabled:{type:Boolean},value:{}},computed:{active:function(){return n.i(o.c)(this.value)&&this.$parent.value===this.value},textClass:function(){var t=this.icon,e=this.titleClass,i=[];return t&&i.push("has-icon"),i.concat(n.i(o.f)(e))}},methods:{tabClick:function(t){this.$parent.handleTabClick&&this.$parent.handleTabClick(this.value,this),this.$emit("click",t)}},watch:{active:function(t,e){t!==e&&t&&this.$emit("active")}},components:{"abstract-button":i.a,icon:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tabs",props:{lineClass:{type:[String,Object,Array]},value:{}},data:function(){return{tabLightStyle:{width:"100%",transform:"translate3d(0, 0, 0)"}}},updated:function(){this.setTabLightStyle()},methods:{handleTabClick:function(t,e){this.value!==t&&this.$emit("change",t)},getActiveIndex:function(){var t=this;if(!this.$children||0===this.$children.length)return-1;var e=-1;return this.$children.forEach(function(n,i){if(n.value===t.value)return e=i,!1}),e},setTabLightStyle:function(){var t=100*this.getActiveIndex(),e=this.$children.length,n=this.$refs.highlight;n.style.width=e>0?(100/e).toFixed(4)+"%":"100%",n.style.transform="translate3d("+t+"%, 0, 0)"}},mounted:function(){this.setTabLightStyle()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{name:{type:String},placeholder:{type:String},value:{type:String},rows:{type:Number,default:1},rowsMax:{type:Number},disabled:{type:Boolean,default:!1},normalClass:{type:[String,Array,Object]},required:{type:Boolean,default:!1}},methods:{resizeTextarea:function(){var t=this.$refs.textarea;if(t){var e=this.$refs.textareaHidden,n=window.getComputedStyle(t,null).getPropertyValue("line-height");n=Number(n.substring(0,n.indexOf("px")));var i=window.getComputedStyle(t,null).getPropertyValue("padding-top");i=Number(i.substring(0,i.indexOf("px")));var r=window.getComputedStyle(t,null).getPropertyValue("padding-bottom");r=Number(r.substring(0,r.indexOf("px")));var a=r+i+n*this.rows,o=r+i+n*(this.rowsMax||0),s=e.scrollHeight;t.style.height=(s<a?a:s>o&&o>0?o:s)+"px"}},handleInput:function(t){this.$emit("input",t.target.value)},handleChange:function(t){this.$emit("change",t)},handleFocus:function(t){this.$emit("focus",t)},handleBlur:function(t){this.$emit("blur",t)},focus:function(){var t=this.$refs.textarea;t&&t.focus()}},mounted:function(){this.resizeTextarea()},watch:{value:function(t,e){var n=this;t!==e&&this.$nextTick(function(){n.resizeTextarea()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(476),a=n.n(r),o=n(472),s=n.n(o),l=n(475),u=n.n(l),c=n(1),d=n(474),f=n.n(d);e.default={name:"mu-text-field",props:{name:{type:String},type:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},value:{},inputClass:{type:[String,Array,Object]},multiLine:{type:Boolean,default:!1},rows:{type:Number,default:1},rowsMax:{type:Number},errorText:{type:String},errorColor:{type:String},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},maxLength:{type:Number,default:0},disabled:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},max:{type:[Number,String]},min:{type:[Number,String]},required:{type:Boolean,default:!1}},data:function(){return{isFocused:!1,inputValue:this.value,charLength:0}},computed:{textFieldClass:function(){return{"focus-state":this.isFocused,"has-label":this.label,"no-empty-state":this.inputValue,"has-icon":this.icon,error:this.errorText,"multi-line":this.multiLine,disabled:this.disabled,"full-width":this.fullWidth}},float:function(){return this.labelFloat&&!this.isFocused&&!this.inputValue&&0!==this.inputValue},errorStyle:function(){return{color:!this.disabled&&this.errorText?n.i(c.d)(this.errorColor):""}},showHint:function(){return!this.float&&!this.inputValue&&0!==this.inputValue}},methods:{handleFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},handleBlur:function(t){this.isFocused=!1,"number"===this.type&&!this.inputValue&&0!==this.inputValue&&this.$refs.input&&(this.$refs.input.value=""),this.$emit("blur",t)},handleInput:function(t){this.inputValue=t.target?t.target.value:t},handleChange:function(t){this.$emit("change",t,t.target.value)},handleLabelClick:function(){this.$emit("labelClick")},focus:function(){var t=this.$refs,e=t.input,n=t.textarea;e?e.focus():n&&n.focus()}},watch:{value:function(t){this.inputValue=t},inputValue:function(t,e){this.charLength=this.maxLength&&String(this.inputValue)?String(this.inputValue).length:0,this.$emit("input",t)},charLength:function(t){t>this.maxLength&&!this.isTextOverflow&&(this.isTextOverflow=!0,this.$emit("textOverflow",!0),this.$emit("text-overflow",!0)),this.isTextOverflow&&t<=this.maxLength&&(this.isTextOverflow=!1,this.$emit("textOverflow",!1),this.$emit("text-overflow",!1))}},components:{icon:i.a,underline:a.a,"enhanced-textarea":s.a,"text-field-label":u.a,"text-field-hint":f.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{text:{type:String},show:{type:Boolean,default:!0}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{focus:{type:Boolean,default:!1},float:{type:Boolean,default:!1},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{labelClass:function(){var t=this.float,e=this.focus,r=this.normalClass,a=this.focusClass,o=[];return t&&o.push("float"),o=o.concat(n.i(i.f)(r)),e&&(o=o.concat(n.i(i.f)(a))),o}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.default={props:{focus:{type:Boolean,default:!1},error:{type:Boolean},errorColor:{type:String},disabled:{type:Boolean},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{lineClass:function(){var t=this.disabled,e=this.normalClass,r=[];return t&&r.push("disabled"),r.concat(n.i(i.f)(e))},focusLineClass:function(){var t=this.normalClass,e=this.focus,r=this.focusClass,a=this.error,o=[];return o.concat(n.i(i.f)(t)),a&&o.push("error"),e&&o.push("focus"),o.concat(n.i(i.f)(r))},errorStyle:function(){return{"background-color":this.error?n.i(i.d)(this.errorColor):""}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(72);e.default={name:"mu-timeline",props:{lineType:{type:String,default:"solid",validator:function(t){var e=["solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},lineColor:{type:String,default:"#e8e8e8"},lineWidth:{type:Number,default:2},iconWidth:{type:Number,default:15},iconColor:{type:String,default:"#7e57c2"},iconType:{type:String,default:"solid",validator:function(t){var e=["solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},iconLine:{type:Number,default:2}},methods:{updateChildren:function(){for(var t=0,e=this.$children.length;t<e;t++){var n=this.$children[t],i=this.iconWidth,r=this.iconColor,a=this.iconType,o=this.iconLine,s=this.lineColor,l=this.lineWidth,u=this.lineType;n.icon={width:i,color:r,line:o,type:a},n.line={color:s,width:l,type:u},t===e-1&&(n.last=!0)}}},mounted:function(){this.updateChildren()},updated:function(){var t=this;this.$nextTick(function(){t.updateChildren()})},watch:{separator:function(){this.updateChildren()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(72);e.default={name:"mu-timeline-item",props:{iconColor:{type:String,default:""},iconType:{type:String,default:"",validator:function(t){var e=["","solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}},iconLine:{type:String,default:""},lineColor:{type:String,default:""},lineType:{type:String,default:"",validator:function(t){var e=["","solid","dotted","dashed","double","groove","ridge","inset","outset"];return n.i(i.a)(t,e)}}},data:function(){return{line:{},icon:{},last:!1}},computed:{lineStyle:function(){var t=this.line.color,e=this.line.type;return""!==this.lineColor&&(t=this.lineColor),""!==this.lineType&&(e=this.lineType),{borderLeft:e+" "+this.line.width+"px "+t,left:this.icon.width/2-this.line.width/2+"px"}},iconStyle:function(){var t=this.icon.color,e=this.icon.type,n=this.icon.line;return""!==this.iconColor&&(t=this.iconColor),""!==this.iconType&&(e=this.iconType),""!==this.iconLine&&(n=this.iconLine),{border:e+" "+n+"px "+t,width:this.icon.width+"px",height:this.icon.width+"px",borderRadius:"50%"}},contentStyle:function(){return{left:2*this.icon.width+"px"}},customedStyle:function(){}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(482),r=n.n(i),a=n(480),o=n.n(a),s=n(481),l=n.n(s),u=n(23);e.default={props:{autoOk:{type:Boolean,default:!1},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialTime:{type:Date,default:function(){return new Date}},okLabel:{type:String,default:"确定"},cancelLabel:{type:String,default:"取消"},landscape:{type:Boolean,default:!1}},data:function(){return{selectedTime:this.initialTime,mode:"hour"}},methods:{getAffix:function(){return"ampm"!==this.format?"":this.selectedTime.getHours()<12?"am":"pm"},handleSelectAffix:function(t){if(t!==this.getAffix()){var e=this.selectedTime.getHours();if("am"===t)return void this.handleChangeHours(e-12,t);this.handleChangeHours(e+12,t)}},handleChangeHours:function(t,e){var n=this,i=new Date(this.selectedTime),r=void 0;"string"==typeof e&&(r=e,e=void 0),r||(r=this.getAffix()),"pm"===r&&t<12&&(t+=12),i.setHours(t),this.selectedTime=i,e&&setTimeout(function(){n.mode="minute",n.$emit("changeHours",i)},100)},handleChangeMinutes:function(t){var e=this,n=new Date(this.selectedTime);n.setMinutes(t),this.selectedTime=n,setTimeout(function(){e.$emit("changeMinutes",n),e.autoOk&&e.accept()},0)},accept:function(){this.$emit("accept",this.selectedTime)},dismiss:function(){this.$emit("dismiss")}},watch:{initialTime:function(t){this.selectedTime=t}},components:{"time-display":r.a,"clock-hours":o.a,"clock-minutes":l.a,"flat-button":u.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(97),r=n.n(i),a=n(98),o=n.n(a),s=n(22);e.default={props:{format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialHours:{type:Number,default:(new Date).getHours()}},computed:{hours:function t(){for(var e="ampm"===this.format?12:24,t=[],n=1;n<=e;n++)t.push(n%24);return t}},methods:{getSelected:function(){var t=this.initialHours;return"ampm"===this.format&&(t%=12,t=t||12),t},isMousePressed:function(t){return void 0===t.buttons?t.nativeEvent.which:t.buttons},handleUp:function(t){t.preventDefault(),this.setClock(t,!0)},handleMove:function(t){t.preventDefault(),1===this.isMousePressed(t)&&this.setClock(t,!1)},handleTouchMove:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!1)},handleTouchEnd:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!0)},setClock:function(t,e){if(void 0===t.offsetX){var i=n.i(s.c)(t);t.offsetX=i.offsetX,t.offsetY=i.offsetY}var r=this.getHours(t.offsetX,t.offsetY);this.$emit("change",r,e)},getHours:function(t,e){var i=30,r=t-this.center.x,a=e-this.center.y,o=this.basePoint.x-this.center.x,l=this.basePoint.y-this.center.y,u=Math.atan2(o,l)-Math.atan2(r,a),c=n.i(s.d)(u);c=Math.round(c/i)*i,c%=360;var d=Math.floor(c/i)||0,f=Math.pow(r,2)+Math.pow(a,2),h=Math.sqrt(f);return d=d||12,"24hr"===this.format?h<90&&(d+=12,d%=24):d%=12,d}},mounted:function(){var t=this.$refs.mask;this.center={x:t.offsetWidth/2,y:t.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},components:{"clock-number":r.a,"clock-pointer":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(97),r=n.n(i),a=n(98),o=n.n(a),s=n(22);e.default={props:{initialMinutes:{type:Number,default:function(){return(new Date).getMinutes()}}},mounted:function(){var t=this.$refs.mask;this.center={x:t.offsetWidth/2,y:t.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},data:function(){return{minutes:null}},created:function(){this.minutes=this.getMinuteNumbers()},methods:{getMinuteNumbers:function(){for(var t=[],e=0;e<12;e++)t.push(5*e);var n=this.initialMinutes,i=!1;return{numbers:t.map(function(t){var e=n===t;return e&&(i=!0),{minute:t,isSelected:e}}),hasSelected:i,selected:n}},isMousePressed:function(t){return void 0===t.buttons?t.nativeEvent.which:t.buttons},handleUp:function(t){t.preventDefault(),this.setClock(t,!0)},handleMove:function(t){t.preventDefault(),1===this.isMousePressed(t)&&this.setClock(t,!1)},handleTouch:function(t){t.preventDefault(),this.setClock(t.changedTouches[0],!1)},setClock:function(t,e){if(void 0===t.offsetX){var i=n.i(s.c)(t);t.offsetX=i.offsetX,t.offsetY=i.offsetY}var r=this.getMinutes(t.offsetX,t.offsetY);this.$emit("change",r,e)},getMinutes:function(t,e){var i=6,r=t-this.center.x,a=e-this.center.y,o=this.basePoint.x-this.center.x,l=this.basePoint.y-this.center.y,u=Math.atan2(o,l)-Math.atan2(r,a),c=n.i(s.d)(u);return c=Math.round(c/i)*i,c%=360,Math.floor(c/i)||0}},watch:{initialMinutes:function(t){this.minutes=this.getMinuteNumbers()}},components:{"clock-number":r.a,"clock-pointer":o.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(255),r=n.n(i),a=n(22),o=[[0,5],[54.5,16.6],[94.4,59.5],[109,114],[94.4,168.5],[54.5,208.4],[0,223],[-54.5,208.4],[-94.4,168.5],[-109,114],[-94.4,59.5],[-54.5,19.6]],s=[[0,40],[36.9,49.9],[64,77],[74,114],[64,151],[37,178],[0,188],[-37,178],[-64,151],[-74,114],[-64,77],[-37,50]];e.default={props:{value:{type:Number,default:0},type:{type:String,default:"minute",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},selected:{type:Boolean,default:!1}},computed:{isInner:function(){return n.i(a.e)(this)},numberClass:function(){return{selected:this.selected,inner:this.isInner}},numberStyle:function(){var t=this.value;"hour"===this.type?t%=12:t/=5;var e=o[t];this.isInner&&(e=s[t]);var n=e,i=r()(n,2);return{transform:"translate("+i[0]+"px, "+i[1]+"px)",left:this.isInner?"calc(50% - 14px)":"calc(50% - 16px)"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(22);e.default={props:{hasSelected:{type:Boolean,default:!1},type:{type:String,default:"minute",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},value:{type:Number}},computed:{isInner:function(){return n.i(i.e)(this)},pointerStyle:function(){var t=this.type,e=this.value,n=this.calcAngle;return{transform:"rotateZ("+("hour"===t?n(e,12):n(e,60))+"deg)"}}},methods:{calcAngle:function(t,e){return t%=e,360/e*t}},render:function(t){return void 0===this.value||null===this.value?t("span",{}):t("div",{class:{"mu-clock-pointer":!0,inner:this.isInner},style:this.pointerStyle},[t("div",{class:{"mu-clock-pointer-mark":!0,"has-selected":this.hasSelected}})])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{affix:{type:String,default:"",validator:function(t){return["","pm","am"].indexOf(t)!==-1}},format:{type:String,validator:function(t){return t&&["ampm","24hr"].indexOf(t)!==-1}},mode:{type:String,default:"hour",validator:function(t){return["hour","minute"].indexOf(t)!==-1}},selectedTime:{type:Date,default:function(){return new Date},required:!0}},methods:{handleSelectAffix:function(t){this.$emit("selectAffix",t)},handleSelectHour:function(){this.$emit("selectHour")},handleSelectMin:function(){this.$emit("selectMin")}},computed:{sanitizeTime:function(){var t=this.selectedTime.getHours(),e=this.selectedTime.getMinutes().toString();return"ampm"===this.format&&(t%=12,t=t||12),t=t.toString(),t.length<2&&(t="0"+t),e.length<2&&(e="0"+e),[t,e]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),r=n(484),a=n.n(r),o=n(22);e.default={name:"mu-time-picker",props:{autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},name:{type:String},label:{type:String},labelFloat:{type:Boolean,default:!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,default:!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,default:!1},underlineShow:{type:Boolean,default:!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{inputValue:this.value,dialogTime:null}},methods:{handleClick:function(){var t=this;this.disabled||setTimeout(function(){t.openDialog()},0)},handleFocus:function(t){t.target.blur(),this.$emit("focus",t)},openDialog:function(){this.disabled||(this.dialogTime=this.inputValue?o.a(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(t){var e=o.b(t,this.format);this.inputValue!==e&&(this.inputValue=e,this.$emit("change",e))}},watch:{value:function(t){this.inputValue=t},inputValue:function(t){this.$emit("input",t)}},components:{"text-field":i.a,"time-picker-dialog":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(479),r=n.n(i),a=n(11),o=n(39);e.default={props:{autoOk:{type:Boolean,default:!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,default:"dialog",validator:function(t){return t&&["dialog","inline"].indexOf(t)!==-1}},mode:{type:String,default:"portrait",validator:function(t){return t&&["portrait","landscape"].indexOf(t)!==-1}},format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].indexOf(t)!==-1}},initialTime:{type:Date}},data:function(){return{open:!1,showClock:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(t){this.$emit("accept",t),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},hideClock:function(){this.showClock=!1}},watch:{open:function(t){t&&(this.showClock=!0)}},render:function(t){var e=this.showClock?t(r.a,{props:{autoOk:this.autoOk,cancelLabel:this.cancelLabel,okLabel:this.okLabel,landscape:"landscape"===this.mode,initialTime:this.initialTime,format:this.format},on:{accept:this.handleAccept,dismiss:this.handleDismiss}}):void 0;return t("div",{},["dialog"===this.container?t(o.a,{props:{open:this.open,dialogClass:["mu-time-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideClock}},[e]):t(a.a,{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideClock}},[e])])}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(28),r=n(42);e.default={name:"mu-toast",props:{message:{type:String}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")}},data:function(){return{zIndex:n.i(i.a)()}},directives:{clickoutside:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"mu-tooltip",props:{label:{type:String},trigger:{},verticalPosition:{type:String,default:"bottom"},horizontalPosition:{type:String,default:"center"},show:{type:Boolean,default:!1},touch:{type:Boolean,default:!1}},data:function(){return{offsetWidth:0,triggerWidth:0,triggerHeight:0}},computed:{tooltipStyle:function(){var t=this.horizontalPosition,e=this.verticalPosition,n=this.offsetWidth,i=this.touch,r=this.triggerWidth,a=this.triggerHeight,o=this.show,s=i?10:0,l=i?-20:-10,u="bottom"===e?14+s:-14-s;return{right:"left"===t?"0":null,left:"center"===t?(n-r)/2*-1+"px":"right"===t?"0":"",top:o?"top"===e?l+"px":a-u+s+2+"px":"-3000px",transform:"translate(0px, "+u+"px)"}},rippleStyle:function(){var t=this.horizontalPosition,e=this.verticalPosition;return{left:"center"===t?"50%":"left"===t?"100%":"0%",top:"bottom"===e?"0":"100%"}}},methods:{setRippleSize:function(){var t=this.$refs.ripple,e=this.$el;if(e&&t){var n=parseInt(e.offsetWidth,10)/("center"===this.horizontalPosition?2:1),i=parseInt(e.offsetHeight,10),r=Math.ceil(2*Math.sqrt(Math.pow(i,2)+Math.pow(n,2)));this.show?(t.style.height=r+"px",t.style.width=r+"px"):(t.style.width="0px",t.style.height="0px")}},setTooltipSize:function(){this.offsetWidth=this.$el.offsetWidth,this.trigger&&(this.triggerWidth=this.trigger.offsetWidth,this.triggerHeight=this.trigger.offsetHeight)}},mounted:function(){this.setRippleSize(),this.setTooltipSize()},beforeUpdate:function(){this.setTooltipSize()},updated:function(){this.setRippleSize()}}},function(t,e,n){t.exports={default:n(256),__esModule:!0}},function(t,e,n){t.exports={default:n(257),__esModule:!0}},function(t,e,n){t.exports={default:n(261),__esModule:!0}},function(t,e,n){t.exports={default:n(262),__esModule:!0}},function(t,e,n){t.exports={default:n(263),__esModule:!0}},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(75),a=i(r);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,a.default)(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(75),a=i(r);e.default=function(t,e,n){return e in t?(0,a.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(248),a=i(r),o=n(247),s=i(o);e.default=function(){function t(t,e){var n=[],i=!0,r=!1,a=void 0;try{for(var o,l=(0,s.default)(t);!(i=(o=l.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,a=t}finally{try{!i&&l.return&&l.return()}finally{if(r)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,a.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(t,e,n){n(37),n(36),t.exports=n(289)},function(t,e,n){n(37),n(36),t.exports=n(290)},function(t,e,n){n(292),t.exports=n(3).Object.assign},function(t,e,n){n(293);var i=n(3).Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},function(t,e,n){n(294),t.exports=n(3).Object.keys},function(t,e,n){n(87),n(36),n(37),n(295),n(297),t.exports=n(3).Set},function(t,e,n){n(296),n(87),n(298),n(299),t.exports=n(3).Symbol},function(t,e,n){n(36),n(37),t.exports=n(61).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var i=n(48);t.exports=function(t,e){var n=[];return i(t,!1,n.push,n,e),n}},function(t,e,n){var i=n(16),r=n(58),a=n(288);t.exports=function(t){return function(e,n,o){var s,l=i(e),u=r(l.length),c=a(o,u);if(t&&n!=n){for(;u>c;)if((s=l[c++])!=s)return!0}else for(;u>c;c++)if((t||c in l)&&l[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(29),r=n(49),a=n(34),o=n(58),s=n(270);t.exports=function(t,e){var n=1==t,l=2==t,u=3==t,c=4==t,d=6==t,f=5==t||d,h=e||s;return function(e,s,p){for(var m,v,y=a(e),g=r(y),b=i(s,p,3),x=o(g.length),C=0,_=n?h(e,x):l?h(e,0):void 0;x>C;C++)if((f||C in g)&&(m=g[C],v=b(m,C,y),t))if(n)_[C]=v;else if(v)switch(t){case 3:return!0;case 5:return m;case 6:return C;case 2:_.push(m)}else if(c)return!1;return d?-1:u||c?c:_}}},function(t,e,n){var i=n(18),r=n(80),a=n(4)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[a])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(269);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8).f,r=n(53),a=n(84),o=n(29),s=n(77),l=n(30),u=n(48),c=n(50),d=n(81),f=n(286),h=n(6),p=n(52).fastKey,m=h?"_s":"size",v=function(t,e){var n,i=p(e);if("F"!==i)return t._i[i];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,c){var d=t(function(t,i){s(t,d,e,"_i"),t._i=r(null),t._f=void 0,t._l=void 0,t[m]=0,void 0!=i&&u(i,n,t[c],t)});return a(d.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[m]=0},delete:function(t){var e=this,n=v(e,t);if(n){var i=n.n,r=n.p;delete e._i[n.i],n.r=!0,r&&(r.n=i),i&&(i.p=r),e._f==n&&(e._f=i),e._l==n&&(e._l=r),e[m]--}return!!n},forEach:function(t){s(this,d,"forEach");for(var e,n=o(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!v(this,t)}}),h&&i(d.prototype,"size",{get:function(){return l(this[m])}}),d},def:function(t,e,n){var i,r,a=v(t,e);return a?a.v=n:(t._l=a={i:r=p(e,!0),k:e,v:n,p:i=t._l,n:void 0,r:!1},t._f||(t._f=a),i&&(i.n=a),t[m]++,"F"!==r&&(t._i[r]=a)),t},getEntry:v,setStrong:function(t,e,n){c(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?d(0,n.k):"values"==e?d(0,n.v):d(0,[n.k,n.v]):(t._t=void 0,d(1))},n?"entries":"values",!n,!0),f(e)}}},function(t,e,n){var i=n(45),r=n(266);t.exports=function(t){return function(){if(i(this)!=t)throw TypeError(t+"#toJSON isn't generic");return r(this)}}},function(t,e,n){"use strict";var i=n(7),r=n(13),a=n(52),o=n(14),s=n(10),l=n(84),u=n(48),c=n(77),d=n(18),f=n(33),h=n(8).f,p=n(268)(0),m=n(6);t.exports=function(t,e,n,v,y,g){var b=i[t],x=b,C=y?"set":"add",_=x&&x.prototype,S={};return m&&"function"==typeof x&&(g||_.forEach&&!o(function(){(new x).entries().next()}))?(x=e(function(e,n){c(e,x,t,"_c"),e._c=new b,void 0!=n&&u(n,y,e[C],e)}),p("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var e="add"==t||"set"==t;t in _&&(!g||"clear"!=t)&&s(x.prototype,t,function(n,i){if(c(this,x,t),!e&&g&&!d(n))return"get"==t&&void 0;var r=this._c[t](0===n?0:n,i);return e?this:r})}),"size"in _&&h(x.prototype,"size",{get:function(){return this._c.size}})):(x=v.getConstructor(e,t,y,C),l(x.prototype,n),a.NEED=!0),f(x,t),S[t]=x,r(r.G+r.W+r.F,S),g||v.setStrong(x,t,y),x}},function(t,e,n){var i=n(20),r=n(54),a=n(31);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var o,s=n(t),l=a.f,u=0;s.length>u;)l.call(t,o=s[u++])&&e.push(o);return e}},function(t,e,n){t.exports=n(7).document&&document.documentElement},function(t,e,n){var i=n(19),r=n(4)("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||a[r]===t)}},function(t,e,n){var i=n(12);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var a=t.return;throw void 0!==a&&i(a.call(t)),e}}},function(t,e,n){"use strict";var i=n(53),r=n(32),a=n(33),o={};n(10)(o,n(4)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(o,{next:r(1,n)}),a(t,e+" Iterator")}},function(t,e,n){var i=n(20),r=n(16);t.exports=function(t,e){for(var n,a=r(t),o=i(a),s=o.length,l=0;s>l;)if(a[n=o[l++]]===e)return n}},function(t,e,n){"use strict";var i=n(20),r=n(54),a=n(31),o=n(34),s=n(49),l=Object.assign;t.exports=!l||n(14)(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=l({},t)[n]||Object.keys(l({},e)).join("")!=i})?function(t,e){for(var n=o(t),l=arguments.length,u=1,c=r.f,d=a.f;l>u;)for(var f,h=s(arguments[u++]),p=c?i(h).concat(c(h)):i(h),m=p.length,v=0;m>v;)d.call(h,f=p[v++])&&(n[f]=h[f]);return n}:l},function(t,e,n){var i=n(8),r=n(12),a=n(20);t.exports=n(6)?Object.defineProperties:function(t,e){r(t);for(var n,o=a(e),s=o.length,l=0;s>l;)i.f(t,n=o[l++],e[n]);return t}},function(t,e,n){var i=n(31),r=n(32),a=n(16),o=n(59),s=n(15),l=n(79),u=Object.getOwnPropertyDescriptor;e.f=n(6)?u:function(t,e){if(t=a(t),e=o(e,!0),l)try{return u(t,e)}catch(t){}if(s(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(16),r=n(82).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(t){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?s(t):r(i(t))}},function(t,e,n){var i=n(15),r=n(34),a=n(55)("IE_PROTO"),o=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?o:null}},function(t,e,n){var i=n(13),r=n(3),a=n(14);t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],o={};o[t]=e(n),i(i.S+i.F*a(function(){n(1)}),"Object",o)}},function(t,e,n){"use strict";var i=n(7),r=n(3),a=n(8),o=n(6),s=n(4)("species");t.exports=function(t){var e="function"==typeof r[t]?r[t]:i[t];o&&e&&!e[s]&&a.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var i=n(57),r=n(30);t.exports=function(t){return function(e,n){var a,o,s=String(r(e)),l=i(n),u=s.length;return l<0||l>=u?t?"":void 0:(a=s.charCodeAt(l),a<55296||a>56319||l+1===u||(o=s.charCodeAt(l+1))<56320||o>57343?t?s.charAt(l):a:t?s.slice(l,l+2):o-56320+(a-55296<<10)+65536)}}},function(t,e,n){var i=n(57),r=Math.max,a=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):a(t,e)}},function(t,e,n){var i=n(12),r=n(86);t.exports=n(3).getIterator=function(t){var e=r(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},function(t,e,n){var i=n(45),r=n(4)("iterator"),a=n(19);t.exports=n(3).isIterable=function(t){var e=Object(t);return void 0!==e[r]||"@@iterator"in e||a.hasOwnProperty(i(e))}},function(t,e,n){"use strict";var i=n(265),r=n(81),a=n(19),o=n(16);t.exports=n(50)(Array,"Array",function(t,e){this._t=o(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),a.Arguments=a.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var i=n(13);i(i.S+i.F,"Object",{assign:n(280)})},function(t,e,n){var i=n(13);i(i.S+i.F*!n(6),"Object",{defineProperty:n(8).f})},function(t,e,n){var i=n(34),r=n(20);n(285)("keys",function(){return function(t){return r(i(t))}})},function(t,e,n){"use strict";var i=n(271);t.exports=n(273)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return i.def(this,t=0===t?0:t,t)}},i)},function(t,e,n){"use strict";var i=n(7),r=n(15),a=n(6),o=n(13),s=n(85),l=n(52).KEY,u=n(14),c=n(56),d=n(33),f=n(35),h=n(4),p=n(61),m=n(60),v=n(279),y=n(274),g=n(80),b=n(12),x=n(16),C=n(59),_=n(32),S=n(53),w=n(283),k=n(282),$=n(8),O=n(20),T=k.f,M=$.f,D=w.f,F=i.Symbol,E=i.JSON,P=E&&E.stringify,A="prototype",j=h("_hidden"),B=h("toPrimitive"),R={}.propertyIsEnumerable,I=c("symbol-registry"),L=c("symbols"),z=c("op-symbols"),N=Object[A],H="function"==typeof F,W=i.QObject,V=!W||!W[A]||!W[A].findChild,Y=a&&u(function(){return 7!=S(M({},"a",{get:function(){return M(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=T(N,e);i&&delete N[e],M(t,e,n),i&&t!==N&&M(N,e,i)}:M,K=function(t){var e=L[t]=S(F[A]);return e._k=t,e},G=H&&"symbol"==typeof F.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof F},X=function(t,e,n){return t===N&&X(z,e,n),b(t),e=C(e,!0),b(n),r(L,e)?(n.enumerable?(r(t,j)&&t[j][e]&&(t[j][e]=!1),n=S(n,{enumerable:_(0,!1)})):(r(t,j)||M(t,j,_(1,{})),t[j][e]=!0),Y(t,e,n)):M(t,e,n)},U=function(t,e){b(t);for(var n,i=y(e=x(e)),r=0,a=i.length;a>r;)X(t,n=i[r++],e[n]);return t},q=function(t,e){return void 0===e?S(t):U(S(t),e)},Z=function(t){var e=R.call(this,t=C(t,!0));return!(this===N&&r(L,t)&&!r(z,t))&&(!(e||!r(this,t)||!r(L,t)||r(this,j)&&this[j][t])||e)},J=function(t,e){if(t=x(t),e=C(e,!0),t!==N||!r(L,e)||r(z,e)){var n=T(t,e);return!n||!r(L,e)||r(t,j)&&t[j][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=D(x(t)),i=[],a=0;n.length>a;)r(L,e=n[a++])||e==j||e==l||i.push(e);return i},tt=function(t){for(var e,n=t===N,i=D(n?z:x(t)),a=[],o=0;i.length>o;)!r(L,e=i[o++])||n&&!r(N,e)||a.push(L[e]);return a};H||(F=function(){if(this instanceof F)throw TypeError("Symbol is not a constructor!");var t=f(arguments.length>0?arguments[0]:void 0),e=function(n){this===N&&e.call(z,n),r(this,j)&&r(this[j],t)&&(this[j][t]=!1),Y(this,t,_(1,n))};return a&&V&&Y(N,t,{configurable:!0,set:e}),K(t)},s(F[A],"toString",function(){return this._k}),k.f=J,$.f=X,n(82).f=w.f=Q,n(31).f=Z,n(54).f=tt,a&&!n(51)&&s(N,"propertyIsEnumerable",Z,!0),p.f=function(t){return K(h(t))}),o(o.G+o.W+o.F*!H,{Symbol:F});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)h(et[nt++]);for(var et=O(h.store),nt=0;et.length>nt;)m(et[nt++]);o(o.S+o.F*!H,"Symbol",{for:function(t){return r(I,t+="")?I[t]:I[t]=F(t)},keyFor:function(t){if(G(t))return v(I,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),o(o.S+o.F*!H,"Object",{create:q,defineProperty:X,defineProperties:U,getOwnPropertyDescriptor:J,getOwnPropertyNames:Q,getOwnPropertySymbols:tt}),E&&o(o.S+o.F*(!H||u(function(){var t=F();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),i[1]=e,P.apply(E,i)}}}),F[A][B]||n(10)(F[A],B,F[A].valueOf),d(F,"Symbol"),d(Math,"Math",!0),d(i.JSON,"JSON",!0)},function(t,e,n){var i=n(13);i(i.P+i.R,"Set",{toJSON:n(272)("Set")})},function(t,e,n){n(60)("asyncIterator")},function(t,e,n){n(60)("observable")},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){n(308);var i=n(0)(n(144),n(493),null,null);t.exports=i.exports},function(t,e,n){n(327);var i=n(0)(n(145),n(514),null,null);t.exports=i.exports},function(t,e,n){n(326);var i=n(0)(n(146),n(513),null,null);t.exports=i.exports},function(t,e,n){n(373);var i=n(0)(n(147),n(555),"data-v-7fd436bc",null);t.exports=i.exports},function(t,e,n){n(329);var i=n(0)(n(148),n(516),null,null);t.exports=i.exports},function(t,e,n){n(353);var i=n(0)(n(149),null,null,null);t.exports=i.exports},function(t,e,n){n(316);var i=n(0)(n(150),n(503),null,null);t.exports=i.exports},function(t,e,n){n(370);var i=n(0)(n(151),n(552),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(152),n(574),null,null);t.exports=i.exports},function(t,e,n){n(357);var i=n(0)(n(153),n(540),"data-v-64be4c11",null);t.exports=i.exports},function(t,e,n){n(379);var i=n(0)(n(154),n(561),null,null);t.exports=i.exports},function(t,e,n){n(339);var i=n(0)(n(155),n(525),null,null);t.exports=i.exports},function(t,e,n){n(309);var i=n(0)(n(156),n(494),null,null);t.exports=i.exports},function(t,e,n){n(347);var i=n(0)(n(157),n(532),null,null);t.exports=i.exports},function(t,e,n){n(396);var i=n(0)(n(158),n(581),null,null);t.exports=i.exports},function(t,e,n){n(348);var i=n(0)(n(159),n(533),null,null);t.exports=i.exports},function(t,e,n){n(333);var i=n(0)(n(160),n(519),null,null);t.exports=i.exports},function(t,e,n){n(394);var i=n(0)(n(161),n(579),null,null);t.exports=i.exports},function(t,e,n){n(368);var i=n(0)(n(162),n(550),null,null);t.exports=i.exports},function(t,e,n){n(365);var i=n(0)(n(163),n(548),null,null);t.exports=i.exports},function(t,e,n){n(332);var i=n(0)(n(164),n(518),null,null);t.exports=i.exports},function(t,e,n){n(318);var i=n(0)(n(165),n(505),null,null);t.exports=i.exports},function(t,e,n){n(374);var i=n(0)(n(166),n(556),null,null);t.exports=i.exports},function(t,e,n){n(382);var i=n(0)(n(167),n(564),null,null);t.exports=i.exports},function(t,e,n){n(371);var i=n(0)(n(168),n(553),null,null);t.exports=i.exports},function(t,e,n){n(364);var i=n(0)(n(169),n(547),null,null);t.exports=i.exports},function(t,e,n){n(321);var i=n(0)(n(170),null,null,null);t.exports=i.exports},function(t,e,n){n(366);var i=n(0)(n(171),null,null,null);t.exports=i.exports},function(t,e,n){n(317);var i=n(0)(n(172),n(504),null,null);t.exports=i.exports},function(t,e,n){n(351);var i=n(0)(n(173),n(536),null,null);t.exports=i.exports},function(t,e,n){n(352);var i=n(0)(n(174),n(537),null,null);t.exports=i.exports},function(t,e,n){n(331);var i=n(0)(n(175),n(517),null,null);t.exports=i.exports},function(t,e,n){n(313);var i=n(0)(n(176),n(499),null,null);t.exports=i.exports},function(t,e,n){n(383);var i=n(0)(n(177),n(565),null,null);t.exports=i.exports},function(t,e,n){n(367);var i=n(0)(n(178),n(549),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(179),n(566),null,null);t.exports=i.exports},function(t,e,n){n(380);var i=n(0)(n(180),n(562),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(181),n(502),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(182),n(495),null,null);t.exports=i.exports},function(t,e,n){n(384);var i=n(0)(n(183),n(567),null,null);t.exports=i.exports},function(t,e,n){n(354);var i=n(0)(n(184),n(538),null,null);t.exports=i.exports},function(t,e,n){n(306);var i=n(0)(n(185),null,null,null);t.exports=i.exports},function(t,e,n){n(360);var i=n(0)(n(186),n(543),null,null);t.exports=i.exports},function(t,e,n){n(314);var i=n(0)(n(187),n(500),null,null);t.exports=i.exports},function(t,e,n){n(361);var i=n(0)(n(188),n(544),null,null);t.exports=i.exports},function(t,e,n){n(391);var i=n(0)(n(189),n(576),null,null);t.exports=i.exports},function(t,e,n){n(335);var i=n(0)(n(195),n(521),null,null);t.exports=i.exports},function(t,e,n){n(395);var i=n(0)(n(197),n(580),null,null);t.exports=i.exports},function(t,e,n){n(320);var i=n(0)(n(200),n(507),null,null);t.exports=i.exports},function(t,e,n){n(304);var i=n(0)(n(201),n(490),null,null);t.exports=i.exports},function(t,e,n){n(355);var i=n(0)(n(202),n(539),null,null);t.exports=i.exports},function(t,e,n){n(310);var i=n(0)(n(203),n(496),null,null);t.exports=i.exports},function(t,e,n){n(363);var i=n(0)(n(204),n(546),null,null);t.exports=i.exports},function(t,e,n){n(378);var i=n(0)(n(205),n(560),null,null);t.exports=i.exports},function(t,e,n){n(345);var i=n(0)(n(206),n(530),null,null);t.exports=i.exports},function(t,e,n){n(303);var i=n(0)(n(207),n(489),null,null);t.exports=i.exports},function(t,e,n){n(334);var i=n(0)(n(208),n(520),null,null);t.exports=i.exports},function(t,e,n){n(377);var i=n(0)(n(209),n(559),null,null);t.exports=i.exports},function(t,e,n){n(338);var i=n(0)(n(210),n(524),null,null);t.exports=i.exports},function(t,e,n){n(393);var i=n(0)(n(211),n(578),null,null);t.exports=i.exports},function(t,e,n){n(376);var i=n(0)(n(212),n(558),null,null);t.exports=i.exports},function(t,e,n){n(344);var i=n(0)(n(213),null,null,null);t.exports=i.exports},function(t,e,n){n(359);var i=n(0)(n(214),n(542),null,null);t.exports=i.exports},function(t,e,n){n(350);var i=n(0)(n(215),n(535),null,null);t.exports=i.exports},function(t,e,n){n(301);var i=n(0)(n(216),n(487),null,null);t.exports=i.exports},function(t,e,n){n(389);var i=n(0)(n(218),null,null,null);t.exports=i.exports},function(t,e,n){n(307);var i=n(0)(n(219),n(492),null,null);t.exports=i.exports},function(t,e,n){n(346);var i=n(0)(n(220),n(531),null,null);t.exports=i.exports},function(t,e,n){n(341);var i=n(0)(n(221),n(527),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(222),n(512),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(224),n(573),null,null);t.exports=i.exports},function(t,e,n){n(337);var i=n(0)(n(226),n(523),null,null);t.exports=i.exports},function(t,e,n){n(385);var i=n(0)(n(227),n(568),null,null);t.exports=i.exports},function(t,e,n){n(336);var i=n(0)(n(228),n(522),null,null);t.exports=i.exports},function(t,e,n){n(349);var i=n(0)(n(229),n(534),null,null);t.exports=i.exports},function(t,e,n){n(387);var i=n(0)(n(230),n(570),null,null);t.exports=i.exports},function(t,e,n){n(358);var i=n(0)(n(231),n(541),null,null);t.exports=i.exports},function(t,e,n){n(392);var i=n(0)(n(232),n(577),null,null);t.exports=i.exports},function(t,e,n){n(315);var i=n(0)(n(233),n(501),null,null);t.exports=i.exports},function(t,e,n){n(325);var i=n(0)(n(234),n(511),null,null);t.exports=i.exports},function(t,e,n){var i=n(0)(n(235),n(572),null,null);t.exports=i.exports},function(t,e,n){n(311);var i=n(0)(n(236),n(497),"data-v-10c9b411",null);t.exports=i.exports},function(t,e,n){n(323);var i=n(0)(n(237),n(509),null,null);t.exports=i.exports},function(t,e,n){n(342);var i=n(0)(n(238),n(528),null,null);t.exports=i.exports},function(t,e,n){n(381);var i=n(0)(n(239),n(563),null,null);t.exports=i.exports},function(t,e,n){n(302);var i=n(0)(n(242),n(488),null,null);t.exports=i.exports},function(t,e,n){n(324);var i=n(0)(n(243),n(510),null,null);t.exports=i.exports},function(t,e,n){n(330);var i=n(0)(n(244),null,null,null);t.exports=i.exports},function(t,e,n){n(375);var i=n(0)(n(245),n(557),null,null);t.exports=i.exports},function(t,e,n){n(312);var i=n(0)(n(246),n(498),null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-step-content",class:{last:t.last}},[n("div",{staticStyle:{position:"relative",overflow:"hidden",height:"100%"}},[n("expand-transition",[t.active?n("div",{ref:"inner",staticClass:"mu-step-content-inner"},[t._t("default")],2):t._e()])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-time-display"},[n("div",{staticClass:"mu-time-display-text"},[n("div",{staticClass:"mu-time-display-affix"}),t._v(" "),n("div",{staticClass:"mu-time-display-time"},[n("span",{staticClass:"mu-time-display-clickable",class:{inactive:"minute"===t.mode},on:{click:t.handleSelectHour}},[t._v(t._s(t.sanitizeTime[0]))]),t._v(" "),n("span",[t._v(":")]),t._v(" "),n("span",{staticClass:"mu-time-display-clickable",class:{inactive:"hour"===t.mode},on:{click:t.handleSelectMin}},[t._v(t._s(t.sanitizeTime[1]))])]),t._v(" "),n("div",{staticClass:"mu-time-display-affix"},["ampm"===t.format?n("div",{staticClass:"mu-time-display-clickable",class:{inactive:"am"===t.affix},on:{click:function(e){t.handleSelectAffix("pm")}}},[t._v("\n        PM\n      ")]):t._e(),t._v(" "),"ampm"===t.format?n("div",{staticClass:"mu-time-display-clickable mu-time-display-affix-top",class:{inactive:"pm"===t.affix},on:{click:function(e){t.handleSelectAffix("am")}}},[t._v("\n        AM\n      ")]):t._e()])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-radio",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseleave:t.handleMouseLeave,mouseup:t.handleMouseUp,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"radio",disabled:t.disabled,name:t.name},domProps:{value:t.nativeValue,checked:t._q(t.inputValue,t.nativeValue)},on:{change:t.handleChange,__c:function(e){t.inputValue=t.nativeValue}}}),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-radio-wrapper",attrs:{rippleWrapperClass:"mu-radio-ripple-wrapper"}},[t.label&&t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-radio-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]),t._v(" "),t.disabled?n("div",{staticClass:"mu-radio-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-radio-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-radio-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.total?n("div",{staticClass:"mu-pagination"},[n("page-item",{attrs:{identifier:"singleBack",disabled:t.leftDisabled},on:{click:t.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),t._v(" "),n("page-item",{attrs:{index:1,isActive:1===t.actualCurrent},on:{click:t.handleClick}}),t._v(" "),t.totalPageCount>5&&t.actualCurrent-1>=4?n("page-item",{attrs:{identifier:"backs",title:"前5页"},on:{click:t.handleClick}},[n("span",[t._v("...")])]):t._e(),t._v(" "),t._l(t.pageList,function(e){return n("page-item",{key:e,attrs:{index:e,isActive:t.actualCurrent===e},on:{click:t.handleClick}})}),t._v(" "),t.totalPageCount>5&&t.totalPageCount-t.actualCurrent>=4?n("page-item",{attrs:{identifier:"forwards",title:"后5页"},on:{click:t.handleClick}},[n("span",[t._v("...")])]):t._e(),t._v(" "),1!==t.totalPageCount?n("page-item",{attrs:{index:t.totalPageCount,isActive:t.actualCurrent===t.totalPageCount},on:{click:t.handleClick}}):t._e(),t._v(" "),n("page-item",{attrs:{identifier:"singleForward",disabled:t.rightDisabled},on:{click:t.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])]),t._v(" "),t.showSizeChanger?n("select-field",{style:{width:"100px"},model:{value:t.actualPageSize,callback:function(e){t.actualPageSize=e},expression:"actualPageSize"}},t._l(t.pageSizeOption,function(e){return n("menu-item",{key:"mt_"+e,style:{width:"100px"},attrs:{value:e,title:e+t.pageSizeChangerText}})})):t._e()],2):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("transition",{attrs:{name:"mu-expand"},on:{"before-enter":t.beforeEnter,enter:t.enter,"after-enter":t.afterEnter,"before-leave":t.beforeLeave,leave:t.leave,"after-leave":t.afterLeave}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-sub-header",class:{inset:t.inset}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-appbar",class:["mu-paper-"+t.zDepth]},[n("div",{staticClass:"left"},[t._t("left")],2),t._v(" "),n("div",{staticClass:"mu-appbar-title",class:t.titleClass},[t._t("default",[n("span",[t._v(t._s(t.title))])])],2),t._v(" "),n("div",{staticClass:"right"},[t._t("right")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-header"},[t._t("avatar"),t._v(" "),t.title||t.subTitle?n("div",{staticClass:"mu-card-header-title"},[n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n      "+t._s(t.subTitle)+"\n    ")])]):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"row",class:{"no-gutter":!t.gutter}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-picker-slot",class:{"mu-picker-slot-divider":t.divider},style:{width:t.width}},[t.divider?t._e():n("div",{ref:"wrapper",staticClass:"mu-picker-slot-wrapper",class:{animate:t.animate},style:{height:t.contentHeight+"px"}},t._l(t.values,function(e,i){return n("div",{key:i,staticClass:"mu-picker-item",class:{selected:e===t.value},style:{"text-align":t.textAlign}},[t._v(t._s(e.text||e))])})),t._v(" "),t.divider?n("div",[t._v(t._s(t.content))]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-timeline-item"},[t.last?t._e():n("div",{staticClass:"mu-timeline-item-line",style:t.lineStyle}),t._v(" "),n("div",{staticClass:"mu-timeline-item-icon"},[t._t("icon",[n("div",{style:t.iconStyle})])],2),t._v(" "),n("div",{staticClass:"mu-timeline-item-content",style:t.contentStyle},[t._t("default",[n("div",{staticClass:"mu-timeline-item-time"},[t._t("time")],2),t._v(" "),n("div",{staticClass:"mu-timeline-item-des"},[t._t("des")],2)])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-tooltip",class:{touched:t.touch,"when-shown":t.show},style:t.tooltipStyle},[n("div",{ref:"ripple",staticClass:"mu-tooltip-ripple",class:{"when-shown":t.show},style:t.rippleStyle}),t._v(" "),n("span",{staticClass:"mu-tooltip-label"},[t._v(t._s(t.label))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-dropDown-menu",class:{disabled:t.disabled}},[n("svg",{staticClass:"mu-dropDown-menu-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})]),t._v(" "),n("div",{staticClass:"mu-dropDown-menu-text",class:t.labelClass,on:{click:t.handleOpen}},[n("div",{staticClass:"mu-dropDown-menu-text-overflow"},[t._v(t._s(t.label))])]),t._v(" "),n("div",{staticClass:"mu-dropDown-menu-line",class:t.underlineClass}),t._v(" "),!t.disabled&&t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{scroller:t.scroller,open:t.openMenu,trigger:t.trigger,anchorOrigin:t.anchorOrigin},on:{close:t.handleClose}},[n("mu-menu",{class:t.menuClass,style:{width:t.menuWidth+"px"},attrs:{listClass:t.menuListClass,value:t.value,multiple:t.multiple,autoWidth:t.autoWidth,popover:t.openMenu,desktop:"",maxHeight:t.maxHeight},on:{change:t.change,itemClick:t.itemClick}},[t._t("default")],2)],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-icon-menu"},[n("icon-button",{attrs:{tooltip:t.tooltip,tooltipPosition:t.tooltipPosition,icon:t.icon,iconClass:t.iconClass},on:{click:t.handleOpen}},[t._t("icon")],2),t._v(" "),t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{open:t.openMenu,trigger:t.trigger,scroller:t.scroller,anchorOrigin:t.anchorOrigin,targetOrigin:t.targetOrigin},on:{close:t.handleClose}},[n("mu-menu",{class:t.menuClass,attrs:{popover:t.openMenu,value:t.value,listClass:t.menuListClass,multiple:t.multiple,desktop:t.desktop,maxHeight:t.maxHeight},on:{change:t.change,itemClick:t.itemClick}},[t._t("default")],2)],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-text-field-label",class:t.labelClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"col",class:t.classObj},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-buttom-item",class:{"mu-bottom-item-active":t.active},attrs:{href:t.href,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disableTouchRipple:t.shift,"center-ripple":!1,wrapperClass:"mu-buttom-item-wrapper"},nativeOn:{click:function(e){t.handleClick(e)}}},[t.icon?n("icon",{staticClass:"mu-bottom-item-icon",class:t.iconClass,attrs:{value:t.icon}}):t._e(),t._v(" "),t._t("default"),t._v(" "),t.title?n("span",{staticClass:"mu-bottom-item-text",class:t.titleClass},[t._v(t._s(t.title))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"mu-year-button",class:{selected:t.selected,hover:t.hover},on:{click:t.handleClick,mouseenter:t.handleHover,mouseleave:t.handleHoverExit}},[n("span",{staticClass:"mu-year-button-text"},[t._v(t._s(t.year))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-monthday-content"},t._l(t.weeksArray,function(e,i){return n("div",{key:i,staticClass:"mu-calendar-monthday-row"},t._l(e,function(e,r){return n("day-button",{key:"dayButton"+i+r,attrs:{disabled:t.isDisableDate(e),selected:t.equalsDate(e),date:e},on:{click:function(n){t.handleClick(e)}}})}))}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("abstract-button",{ref:"button",staticClass:"mu-menu-item-wrapper",class:{active:t.active},attrs:{href:t.href,target:t.target,centerRipple:!1,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disableFocusRipple:t.disableFocusRipple,disabled:t.disabled,containerElement:"div"},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{staticClass:"mu-menu-item",class:{"have-left-icon":t.leftIcon||t.inset}},[n("icon",{staticClass:"mu-menu-item-left-icon",class:t.leftIconClass,style:{color:t.filterColor(t.leftIconColor)},attrs:{value:t.leftIcon}}),t._v(" "),n("div",{staticClass:"mu-menu-item-title",class:t.titleClass},[t._t("title",[t._v("\n           "+t._s(t.title)+"\n         ")])],2),t._v(" "),t.rightIcon?t._e():n("div",[t.showAfterText?n("span",{class:t.afterTextClass},[t._v(t._s(t.afterText))]):t._e(),t._v(" "),t._t("after")],2),t._v(" "),n("icon",{staticClass:"mu-menu-item-right-icon",class:t.rightIconClass,style:{color:t.filterColor(t.rightIconColor)},attrs:{value:t.rightIcon}})],1)]),t._v(" "),t.$slots&&t.$slots.default&&t.$slots.default.length>0?n("popover",{attrs:{open:t.openMenu,anchorOrigin:{vertical:"top",horizontal:"right"},trigger:t.trigger},on:{close:t.close}},[t.openMenu?n("mu-menu",{class:t.nestedMenuClass,attrs:{desktop:t.$parent.desktop,popover:"",listClass:t.nestedMenuListClass,maxHeight:t.$parent.maxHeight,value:t.nestedMenuValue}},[t._t("default")],2):t._e()],1):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-pagination-item",class:{circle:t.isCircle,active:t.isActive},attrs:{wrapperClass:"mu-pagination-item-wrapper",centerRipple:!1,disabled:t.disabled,containerElement:"div"},on:{click:t.handleClick,hover:t.handleHover,hoverExit:t.handleHoverExit}},[t.index?n("span",[t._v(t._s(t.index))]):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{on:{mousedown:t.handleMouseDown,mouseup:function(e){t.end()},mouseleave:function(e){t.end()},touchstart:t.handleTouchStart,touchend:function(e){t.end()},touchcancel:function(e){t.end()}}},[n("div",{ref:"holder",staticClass:"mu-ripple-wrapper",class:t.rippleWrapperClass},t._l(t.ripples,function(t){return n("circle-ripple",{key:t.key,attrs:{color:t.color,opacity:t.opacity,"merge-style":t.style}})})),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock",class:{"mu-clock-landspace":t.landscape}},[n("time-display",{attrs:{selectedTime:t.selectedTime,format:t.format,mode:t.mode,affix:t.getAffix()},on:{selectMin:function(e){t.mode="minute"},selectHour:function(e){t.mode="hour"},selectAffix:t.handleSelectAffix}}),t._v(" "),n("div",{staticClass:"mu-clock-container"},[n("div",{staticClass:"mu-clock-circle"}),t._v(" "),"hour"===t.mode?n("clock-hours",{attrs:{format:t.format,initialHours:t.selectedTime.getHours()},on:{change:t.handleChangeHours}}):t._e(),t._v(" "),"minute"===t.mode?n("clock-minutes",{attrs:{initialMinutes:t.selectedTime.getMinutes()},on:{change:t.handleChangeMinutes}}):t._e(),t._v(" "),n("div",{staticClass:"mu-clock-actions"},[n("flat-button",{attrs:{label:t.cancelLabel,primary:""},on:{click:t.dismiss}}),t._v(" "),n("flat-button",{attrs:{label:t.okLabel,primary:""},on:{click:t.accept}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-time-picker",class:{fullWidth:t.fullWidth}},[n("text-field",{attrs:{name:t.name,value:t.inputValue,fullWidth:t.fullWidth,inputClass:t.inputClass,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,disabled:t.disabled,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,labelClick:t.handleClick}}),t._v(" "),t.disabled?t._e():n("time-picker-dialog",{ref:"dialog",attrs:{initialTime:t.dialogTime,format:t.format,mode:t.mode,container:t.container,autoOk:t.autoOk,okLabel:t.okLabel,cancelLabel:t.cancelLabel},on:{accept:t.handleAccept}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("hr",{staticClass:"mu-text-field-line",class:t.lineClass}),t._v(" "),t.disabled?t._e():n("hr",{staticClass:"mu-text-field-focus-line",class:t.focusLineClass,style:t.errorStyle})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("tbody",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-avatar",style:t.avatarStyle,on:{click:t.handleClick}},[n("div",{staticClass:"mu-avatar-inner"},[t.icon?n("icon",{class:t.iconClass,attrs:{value:t.icon,size:t.iconSize}}):t._e(),t._v(" "),t.src?n("img",{class:t.imgClass,attrs:{src:t.src}}):t._e(),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-auto-complete",class:{fullWidth:t.fullWidth}},[n("text-field",{ref:"textField",attrs:{value:t.searchText,disabled:t.disabled,inputClass:t.inputClass,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,fullWidth:t.fullWidth,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,input:t.handleInput,blur:t.handleBlur},nativeOn:{keydown:function(e){t.handleKeyDown(e)}},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),t._v(" "),n("popover",{attrs:{overlay:!1,autoPosition:!1,scroller:t.scroller,open:t.open&&t.list.length>0,trigger:t.anchorEl,anchorOrigin:t.anchorOrigin,targetOrigin:t.targetOrigin},on:{close:t.handleClose}},[t.open?n("mu-menu",{ref:"menu",staticClass:"mu-auto-complete-menu",style:{width:(t.menuWidth&&t.menuWidth>t.inputWidth?t.menuWidth:t.inputWidth)+"px"},attrs:{maxHeight:t.maxHeight,disableAutoFocus:t.focusTextField,initiallyKeyboardFocused:"",autoWidth:!1},on:{itemClick:t.handleItemClick},nativeOn:{mousedown:function(e){t.handleMouseDown(e)}}},t._l(t.list,function(e,i){return n("menu-item",{key:"auto_"+i,staticClass:"mu-auto-complete-menu-item",attrs:{disableFocusRipple:t.disableFocusRipple,afterText:"",leftIcon:e.leftIcon,leftIconColor:e.leftIconColor,rightIconColor:e.rightIconColor,rightIcon:e.rightIcon,value:e.value,title:e.text},nativeOn:{mousedown:function(e){t.handleMouseDown(e)}}})})):t._e()],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickoutside,expression:"clickoutside"}],staticClass:"mu-menu",style:{width:t.contentWidth},attrs:{tabindex:"0"},on:{keydown:t.handleKeydown}},[n("div",{ref:"list",staticClass:"mu-menu-list",class:t.menuListClass,style:{width:t.contentWidth,"max-height":t.maxHeight+"px"}},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-badge-container"},[t._t("default"),t._v(" "),n("em",{staticClass:"mu-badge",class:t.badgeInternalClass,style:t.badgeStyle},[t._t("content",[t._v("\n      "+t._s(t.content)+"\n    ")])],2)],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("paper",{staticClass:"mu-drawer",class:{open:t.open,right:t.right},style:t.drawerStyle,attrs:{zDepth:t.zDepth}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar",class:{"mu-calendar-landspace":"landscape"===t.mode}},[n("date-display",{attrs:{monthDaySelected:t.displayMonthDay,disableYearSelection:t.disableYearSelection,selectedDate:t.selectedDate,dateTimeFormat:t.dateTimeFormat},on:{selectYear:t.selectYear,selectMonth:t.selectMonth}}),t._v(" "),n("div",{staticClass:"mu-calendar-container"},[t.displayMonthDay?n("div",{staticClass:"mu-calendar-monthday-container"},[n("calendar-toolbar",{attrs:{slideType:t.slideType,nextMonth:t.nextMonth,prevMonth:t.prevMonth,displayDates:t.displayDates,dateTimeFormat:t.dateTimeFormat},on:{monthChange:t.handleMonthChange}}),t._v(" "),n("div",{staticClass:"mu-calendar-week"},t._l(t.weekTexts,function(e,i){return n("span",{key:i,staticClass:"mu-calendar-week-day"},[t._v(t._s(e))])})),t._v(" "),n("div",{staticClass:"mu-calendar-monthday"},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-calendar-slide-"+t.slideType}},[n("div",{key:e.getTime(),staticClass:"mu-calendar-monthday-slide"},[n("calendar-month",{attrs:{shouldDisableDate:t.shouldDisableDate,displayDate:e,firstDayOfWeek:t.firstDayOfWeek,maxDate:t.maxDate,minDate:t.minDate,selectedDate:t.selectedDate},on:{selected:t.handleSelected}})],1)])}))],1):t._e(),t._v(" "),t.displayMonthDay?t._e():n("calendar-year",{attrs:{selectedDate:t.selectedDate,maxDate:t.maxDate,minDate:t.minDate},on:{change:t.handleYearChange}}),t._v(" "),n("div",{staticClass:"mu-calendar-actions"},[n("flat-button",{attrs:{label:t.cancelLabel,primary:""},on:{click:t.handleCancel}}),t._v(" "),t.autoOk?t._e():n("flat-button",{attrs:{label:t.okLabel,primary:""},on:{click:t.handleOk}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-checkbox",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseup:t.handleMouseUp,mouseleave:t.handleMouseLeave,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:t.disabled,name:t.name},domProps:{value:t.nativeValue,checked:Array.isArray(t.inputValue)?t._i(t.inputValue,t.nativeValue)>-1:t.inputValue},on:{change:t.handleChange,__c:function(e){var n=t.inputValue,i=e.target,r=!!i.checked;if(Array.isArray(n)){var a=t.nativeValue,o=t._i(n,a);r?o<0&&(t.inputValue=n.concat(a)):o>-1&&(t.inputValue=n.slice(0,o).concat(n.slice(o+1)))}else t.inputValue=r}}}),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-checkbox-wrapper",attrs:{rippleWrapperClass:"mu-checkbox-ripple-wrapper"}},[t.label&&t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]),t._v(" "),t.disabled?n("div",{staticClass:"mu-checkbox-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[t.checkedIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),t._v(" "),t.uncheckIcon?t._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon",class:t.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),t._v(" "),t.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck",class:t.iconClass,attrs:{value:t.uncheckIcon}}):t._e(),t._v(" "),t.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked",class:t.iconClass,attrs:{value:t.checkedIcon}}):t._e()],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-checkbox-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-raised-button",class:t.buttonClass,style:t.buttonStyle,attrs:{type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,rippleColor:t.rippleColor,rippleOpacity:t.rippleOpacity,disabled:t.disabled,keyboardFocused:t.keyboardFocused,wrapperClass:"mu-raised-button-wrapper",centerRipple:!1},on:{KeyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit,click:t.handleClick}},[t.label&&"before"===t.labelPosition?n("span",{staticClass:"mu-raised-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("icon",{class:t.iconClass,attrs:{value:t.icon}}),t._v(" "),t._t("default"),t._v(" "),t.label&&"after"===t.labelPosition?n("span",{staticClass:"mu-raised-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-linear-progress",style:{height:t.size+"px","border-radius":(t.size?t.size/2:"")+"px"}},[n("div",{class:t.linearClass,style:t.linearStyle})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-tab-link",class:{"mu-tab-active":t.active},attrs:{href:t.href,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disabled:t.disabled,"center-ripple":!1},on:{click:t.tabClick}},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:t.icon}})]),t._v(" "),t.title?n("div",{staticClass:"mu-tab-text",class:t.textClass},[t._v(t._s(t.title))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("thead",{staticClass:"mu-thead"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("text-field",{ref:"textField",staticClass:"mu-select-field",attrs:{label:t.label,labelFloat:t.labelFloat,underlineShow:t.underlineShow,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass,fullWidth:t.fullWidth,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,icon:t.icon,iconClass:t.iconClass,value:t.inputValue instanceof Array?t.inputValue.join(""):t.inputValue,disabled:t.disabled,errorText:t.errorText,errorColor:t.errorColor}},[n("input",{attrs:{type:"hidden",name:t.name},domProps:{value:t.inputValue instanceof Array?t.inputValue.join(""):t.inputValue}}),t._v(" "),n("dropDown-menu",{attrs:{anchorEl:t.anchorEl,scroller:t.scroller,value:t.inputValue,disabled:t.disabled,maxHeight:t.maxHeight,autoWidth:t.autoWidth,iconClass:t.dropDownIconClass,multiple:t.multiple,anchorOrigin:{vertical:"bottom",horizontal:"left"},separator:t.separator},on:{open:t.handleOpen,close:t.handleClose,change:t.handlehange}},[t._t("default")],2)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card-actions"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-overlay-fade"}},[t.show?n("div",{staticClass:"mu-overlay",style:t.overlayStyle,on:{click:t.handleClick,touchmove:t.prevent}}):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.fixedHeader?n("div",[n("table",{staticClass:"mu-table"},[t._t("header")],2)]):t._e(),t._v(" "),n("div",{style:t.bodyStyle},[n("table",{staticClass:"mu-table"},[t.fixedHeader?t._e():t._t("header"),t._v(" "),t._t("default"),t._v(" "),t.fixedFooter?t._e():t._t("footer")],2)]),t._v(" "),t.fixedFooter?n("div",[n("table",{staticClass:"mu-table"},[t._t("footer")],2)]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock-hours"},[n("clock-pointer",{attrs:{hasSelected:"",value:t.getSelected(),type:"hour"}}),t._v(" "),t._l(t.hours,function(e){return n("clock-number",{key:e,attrs:{selected:t.getSelected()===e,type:"hour",value:e}})}),t._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-hours-mask",on:{mouseup:t.handleUp,mousemove:t.handleMove,touchmove:t.handleTouchMove,touchend:t.handleTouchEnd}})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"mu-clock-number",class:t.numberClass,style:t.numberStyle},[t._v(t._s(0===t.value?"00":t.value))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:t.transition},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-popup",class:t.popupCss,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"mu-switch",class:{"label-left":t.labelLeft,disabled:t.disabled,"no-label":!t.label},on:{mousedown:t.handleMouseDown,mouseleave:t.handleMouseLeave,mouseup:t.handleMouseUp,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,click:function(e){e.stopPropagation(),t.handleClick(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:t.disabled,name:t.name},domProps:{checked:Array.isArray(t.inputValue)?t._i(t.inputValue,null)>-1:t.inputValue},on:{change:t.handleChange,__c:function(e){var n=t.inputValue,i=e.target,r=!!i.checked;if(Array.isArray(n)){var a=null,o=t._i(n,a);r?o<0&&(t.inputValue=n.concat(a)):o>-1&&(t.inputValue=n.slice(0,o).concat(n.slice(o+1)))}else t.inputValue=r}}}),t._v(" "),n("div",{staticClass:"mu-switch-wrapper"},[t.label&&t.labelLeft?n("div",{staticClass:"mu-switch-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{staticClass:"mu-switch-container"},[n("div",{staticClass:"mu-switch-track",class:t.trackClass}),t._v(" "),t.disabled?n("div",{staticClass:"mu-switch-thumb",class:t.thumbClass}):t._e(),t._v(" "),t.disabled?t._e():n("touch-ripple",{staticClass:"mu-switch-thumb",attrs:{rippleWrapperClass:"mu-switch-ripple-wrapper"}})],1),t._v(" "),t.label&&!t.labelLeft?n("div",{staticClass:"mu-switch-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-media"},[t._t("default"),t._v(" "),t.title||t.subTitle?n("div",{staticClass:"mu-card-media-title"},[t.title?n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n      "+t._s(t.title)+"\n    ")]):t._e(),t._v(" "),t.subTitle?n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n      "+t._s(t.subTitle)+"\n    ")]):t._e()]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-card-title-container"},[n("div",{staticClass:"mu-card-title",class:t.titleClass},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("div",{staticClass:"mu-card-sub-title",class:t.subTitleClass},[t._v("\n    "+t._s(t.subTitle)+"\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-tabs"},[t._t("default"),t._v(" "),n("span",{ref:"highlight",staticClass:"mu-tab-link-highlight",class:t.lineClass})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-step-connector"},[n("span",{staticClass:"mu-step-connector-line"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-dialog-slide"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-dialog-wrapper",style:{"z-index":t.zIndex},on:{click:t.handleWrapperClick}},[n("div",{ref:"dialog",staticClass:"mu-dialog",class:t.dialogClass},[t.showTitle?n("h3",{ref:"title",staticClass:"mu-dialog-title",class:t.headerClass},[t._t("title",[t._v("\n            "+t._s(t.title)+"\n          ")])],2):t._e(),t._v(" "),n("div",{ref:"elBody",staticClass:"mu-dialog-body ",class:t.bodyClass,style:t.bodyStyle},[t._t("default")],2),t._v(" "),t.showFooter?n("div",{ref:"footer",staticClass:"mu-dialog-actions",class:t.footerClass},[t._t("actions")],2):t._e()])]):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("hr",{staticClass:"mu-divider",class:{inset:t.inset,"shallow-inset":t.shallowInset}})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.style},[n("div",{staticClass:"mu-grid-tile",class:t.tileClass},[t._t("default"),t._v(" "),n("div",{staticClass:"mu-grid-tile-titlebar",class:t.titleBarClass},[n("div",{staticClass:"mu-grid-tile-title-container"},[n("div",{staticClass:"mu-grid-tile-title"},[t._t("title",[t._v("\n            "+t._s(t.title)+"\n          ")])],2),t._v(" "),n("div",{staticClass:"mu-grid-tile-subtitle"},[t._t("subTitle",[t._v("\n            "+t._s(t.subTitle)+"\n          ")])],2)]),t._v(" "),n("div",{staticClass:"mu-grid-tile-action"},[t._t("action")],2)])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-paper",class:t.paperClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.href?n("a",{class:t.linkClass,attrs:{href:t.href}},[t._t("default")],2):n("span",{class:t.currentClass},[t._t("default")],2),t._v(" "),t.href?n("span",{class:t.separatorClass},[t._v("\n    "+t._s(this.separator)+"\n  ")]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-text-field",class:t.textFieldClass,style:t.isFocused?t.errorStyle:{}},[t.icon?n("icon",{staticClass:"mu-text-field-icon",class:t.iconClass,attrs:{value:t.icon}}):t._e(),t._v(" "),n("div",{ref:"content",staticClass:"mu-text-field-content",on:{click:t.handleLabelClick}},[t.label?n("text-field-label",{attrs:{float:t.float,focus:t.isFocused,normalClass:t.labelClass,focusClass:t.labelFocusClass}},[t._v(t._s(t.label))]):t._e(),t._v(" "),t.hintText?n("text-field-hint",{class:t.hintTextClass,attrs:{text:t.hintText,show:t.showHint}}):t._e(),t._v(" "),t._t("default",[t.multiLine?t._e():n("input",{ref:"input",staticClass:"mu-text-field-input",class:t.inputClass,attrs:{name:t.name,type:t.type,disabled:t.disabled,max:t.max,min:t.min,required:t.required},domProps:{value:t.inputValue},on:{change:t.handleChange,focus:t.handleFocus,input:t.handleInput,blur:t.handleBlur}}),t._v(" "),t.multiLine?n("enhanced-textarea",{ref:"textarea",attrs:{name:t.name,normalClass:t.inputClass,value:t.inputValue,disabled:t.disabled,rows:t.rows,rowsMax:t.rowsMax},on:{change:t.handleChange,input:t.handleInput,focus:t.handleFocus,blur:t.handleBlur}}):t._e()]),t._v(" "),t.underlineShow?n("underline",{attrs:{error:!!t.errorText,disabled:t.disabled,errorColor:t.errorColor,focus:t.isFocused,normalClass:t.underlineClass,focusClass:t.underlineFocusClass}}):t._e(),t._v(" "),t.errorText||t.helpText||t.maxLength>0?n("div",{staticClass:"mu-text-field-help",class:t.helpTextClass,style:t.errorStyle},[n("div",[t._v("\n            "+t._s(t.errorText||t.helpText)+"\n        ")]),t._v(" "),t.maxLength>0?n("div",[t._v("\n            "+t._s(t.charLength)+"/"+t._s(t.maxLength)+"\n        ")]):t._e()]):t._e()],2)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-step-button",attrs:{centerRipple:!1,disabled:t.disabled},on:{click:t.handleClick}},[t.childrenInLabel?n("step-label",{attrs:{active:t.active,completed:t.completed,num:t.num,disabled:t.disabled}},[t._t("default"),t._v(" "),t._t("icon",null,{slot:"icon"})],2):t._e(),t._v(" "),t.childrenInLabel?t._e():t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-icon-button",attrs:{to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,type:t.type,href:t.href,target:t.target,disabled:t.disabled,keyboardFocused:t.keyboardFocused},on:{click:t.handleClick,hover:t.handleHover,hoverExit:t.handleHoverExit,keyboardFocus:t.handleKeyboardFocus}},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:t.icon}})]),t._v(" "),t.tooltip?n("tooltip",{attrs:{trigger:t.tooltipTrigger,verticalPosition:t.verticalPosition,horizontalPosition:t.horizontalPosition,show:t.tooltipShown,label:t.tooltip,touch:t.touch}}):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-infinite-scroll"},[n("circular",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{size:24}}),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"mu-infinite-scroll-text"},[t._v(t._s(t.loadingText))])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-focus-ripple-wrapper"},[n("div",{ref:"innerCircle",staticClass:"mu-focus-ripple",style:t.style})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-picker"},[t._l(t.slots,function(e,i){return n("picker-slot",{key:i,attrs:{divider:e.divider,content:e.content,"text-align":e.textAlign,width:e.width,value:t.values[i],values:e.values,"visible-item-count":t.visibleItemCount},on:{change:function(e){t.change(i,arguments)}}})}),t._v(" "),n("div",{staticClass:"mu-picker-center-highlight"})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-date-picker",class:{fullWidth:t.fullWidth}},[n("text-field",{attrs:{value:t.inputValue,disabled:t.disabled,fullWidth:t.fullWidth,label:t.label,labelFloat:t.labelFloat,labelClass:t.labelClass,labelFocusClass:t.labelFocusClass,hintText:t.hintText,hintTextClass:t.hintTextClass,helpText:t.helpText,helpTextClass:t.helpTextClass,errorText:t.errorText,errorColor:t.errorColor,icon:t.icon,iconClass:t.iconClass,inputClass:t.inputClass,underlineShow:t.underlineShow,underlineClass:t.underlineClass,underlineFocusClass:t.underlineFocusClass},on:{focus:t.handleFocus,labelClick:t.handleClick}}),t._v(" "),t.disabled?t._e():n("date-picker-dialog",{ref:"dialog",attrs:{initialDate:t.dialogDate,mode:t.mode,maxDate:t.maxLimitDate,minDate:t.minLimitDate,shouldDisableDate:t.shouldDisableDate,firstDayOfWeek:t.firstDayOfWeek,container:t.container,disableYearSelection:t.disableYearSelection,dateTimeFormat:t.dateTimeFormat,autoOk:t.autoOk,okLabel:t.okLabel,cancelLabel:t.cancelLabel},on:{monthChange:t.handleMonthChange,yearChange:t.handleYearChange,accept:t.handleAccept,dismiss:t.dismiss}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-content-block"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-flexbox",class:{"mu-flex-col":"vertical"===t.orient,"mu-flex-row":"horizontal"===t.orient},style:t.styles},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circular-progress",style:{width:t.size+"px",height:t.size+"px"}},["indeterminate"===t.mode?n("circular",{attrs:{size:t.size,color:t.color,borderWidth:t.strokeWidth}}):t._e(),t._v(" "),"determinate"===t.mode?n("svg",{staticClass:"mu-circular-progress-determinate",style:t.circularSvgStyle,attrs:{viewBox:"0 0 "+t.size+" "+t.size}},[n("circle",{staticClass:"mu-circular-progress-determinate-path",style:t.circularPathStyle,attrs:{r:t.radius,cx:t.size/2,cy:t.size/2,fill:"none","stroke-miterlimit":"20","stroke-width":t.strokeWidth}})]):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circle-wrapper active",style:{width:t.size+"px",height:t.size+"px"}},[n("div",{staticClass:"mu-circle-spinner active",class:{"mu-circle-secondary":t.secondary},style:t.spinnerStyle},[n("div",{staticClass:"mu-circle-clipper left"},[n("div",{staticClass:"mu-circle",style:{"border-width":t.borderWidth+"px"}})]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"mu-circle-clipper right"},[n("div",{staticClass:"mu-circle",style:{"border-width":t.borderWidth+"px"}})])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-circle-gap-patch"},[n("div",{staticClass:"mu-circle"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-bottom-sheet"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-bottom-sheet",class:t.sheetClass,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-date-display",class:t.displayClass},[n("div",{staticClass:"mu-date-display-year",class:{disabled:t.disableYearSelection},on:{click:t.handleSelectYear}},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-date-display-"+t.slideType}},[n("div",{key:e.getFullYear(),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-year-title"},[t._v("\n          "+t._s(e.getFullYear())+"\n        ")])])])})),t._v(" "),n("div",{staticClass:"mu-date-display-monthday",on:{click:t.handleSelectMonth}},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-date-display-"+t.slideType}},[n("div",{key:t.dateTimeFormat.formatDisplay(e),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-monthday-title"},[t._v("\n          "+t._s(t.dateTimeFormat.formatDisplay(e))+"\n        ")])])])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-list"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.backShow?n("div",{staticClass:"mu-back-up",style:t.propsStyle,on:{click:t.moveTop}},[t._t("default",[n("div",{staticClass:"mu-back-up-default"},[n("icon",{attrs:{value:"keyboard_arrow_up"}})],1)])],2):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-toolbar"},[n("icon-button",{attrs:{disabled:!t.prevMonth},on:{click:function(e){e.stopPropagation(),t.prev(e)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),t._v(" "),n("div",{staticClass:"mu-calendar-toolbar-title-wrapper"},t._l(t.displayDates,function(e,i){return n("transition",{key:i,attrs:{name:"mu-calendar-slide-"+t.slideType}},[n("div",{key:e.getTime(),staticClass:"mu-calendar-toolbar-title"},[t._v("\n        "+t._s(t.dateTimeFormat.formatMonth(e))+"\n      ")])])})),t._v(" "),n("icon-button",{attrs:{disabled:!t.nextMonth},on:{click:function(e){e.stopPropagation(),t.next(e)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-toast"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-toast",style:{"z-index":t.zIndex}},[t._v("\n    "+t._s(t.message)+"\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-snackbar"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-snackbar",style:{"z-index":t.zIndex}},[n("div",{staticClass:"mu-snackbar-message"},[t._v("\n      "+t._s(t.message)+"\n    ")]),t._v(" "),t.action?n("flat-button",{staticClass:"mu-snackbar-action",attrs:{color:t.actionColor,rippleColor:"#FFF",rippleOpacity:.3,secondary:"",label:t.action},on:{click:t.handleActionClick}}):t._e()],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-refresh-control",class:t.refreshClass,style:t.refreshStyle},[n("svg",{directives:[{name:"show",rawName:"v-show",value:!t.refreshing&&t.draging,expression:"!refreshing && draging"}],staticClass:"mu-refresh-svg-icon",style:t.circularStyle,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}})]),t._v(" "),n("circular",{directives:[{name:"show",rawName:"v-show",value:t.refreshing,expression:"refreshing"}],attrs:{size:24,"border-width":2}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("transition",{attrs:{name:"mu-popover"},on:{"after-enter":function(e){t.show()},"after-leave":function(e){t.hide()}}},[t.open?n("div",{ref:"popup",staticClass:"mu-popover",class:t.popoverClass,style:{"z-index":t.zIndex}},[t._t("default")],2):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-float-button",class:[t.buttonClass],style:t.buttonStyle,attrs:{type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,disabled:t.disabled},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{staticClass:"mu-float-button-wrapper"},[t._t("default",[n("icon",{class:t.iconClass,attrs:{value:this.icon}})])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-clock-minutes"},[n("clock-pointer",{attrs:{hasSelected:"",value:t.minutes.selected,hasSelected:t.minutes.hasSelected,type:"minute"}}),t._v(" "),t._l(t.minutes.numbers,function(t){return n("clock-number",{key:t.minute,attrs:{selected:t.isSelected,type:"minute",value:t.minute}})}),t._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-minutes-mask",on:{mouseup:t.handleUp,mousemove:t.handleMove,touchmove:t.handleTouch,touchend:t.handleTouch}})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-calendar-year-container"},[n("div",{ref:"container",staticClass:"mu-calendar-year"},[n("div",{staticClass:"mu-calendar-year-list"},t._l(t.years,function(e){return n("year-button",{key:"yearButton"+e,attrs:{year:e,selected:e===t.selectedDate.getFullYear()},on:{click:function(n){t.handleClick(e)}}})}))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("abstract-button",{staticClass:"mu-flat-button",class:t.buttonClass,style:t.buttonStyle,attrs:{disabled:t.disabled,keyboardFocused:t.keyboardFocused,wrapperClass:"mu-flat-button-wrapper",type:t.type,href:t.href,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,rippleColor:t.rippleColor,rippleOpacity:t.rippleOpacity,centerRipple:!1},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[t.label&&"before"===t.labelPosition?n("span",{staticClass:"mu-flat-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("icon",{class:t.iconClass,attrs:{value:t.icon}}),t._v(" "),t._t("default"),t._v(" "),t.label&&"after"===t.labelPosition?n("span",{staticClass:"mu-flat-button-label",class:t.labelClass},[t._v(t._s(t.label))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-flexbox-item",style:t.itemStyle},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-grid-list",style:t.gridListStyle},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{key:t.rowId,staticClass:"mu-tr",class:t.className,on:{click:t.handleClick,mouseenter:t.handleHover,mouseleave:t.handleExit}},[t.isTh&&t.showCheckbox?n("mu-th",{staticClass:"mu-checkbox-col"},[n("checkbox",{attrs:{value:t.isSelectAll&&t.enableSelectAll,disabled:!t.enableSelectAll||!t.multiSelectable},on:{change:t.handleSelectAllChange}})],1):t._e(),t._v(" "),t.isTb&&t.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"},[n("checkbox",{ref:"checkLabel",attrs:{disabled:!t.selectable||!t.$parent.selectable,value:t.isSelected},on:{change:t.handleCheckboxChange},nativeOn:{click:function(e){t.handleCheckboxClick(e)}}})],1):t._e(),t._v(" "),t.isTf&&t.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"}):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("th",{staticClass:"mu-th",on:{mouseenter:t.showTooltip,mouseleave:t.hideTooltip}},[n("div",{ref:"wrapper",staticClass:"mu-th-wrapper"},[t._t("default"),t._v(" "),t.tooltip?n("tooltip",{attrs:{trigger:t.tooltipTrigger,verticalPosition:t.verticalPosition,horizontalPosition:t.horizontalPosition,show:t.tooltipShown,label:t.tooltip,touch:t.touch}}):t._e()],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-text-field-multiline"},[n("textarea",{ref:"textareaHidden",staticClass:"mu-text-field-textarea-hide mu-text-field-input",attrs:{rows:"1"},domProps:{value:t.value}}),t._v(" "),n("textarea",{ref:"textarea",staticClass:"mu-text-field-input mu-text-field-textarea",class:t.normalClass,attrs:{name:t.name,placeholder:t.placeholder,disabled:t.disabled,required:t.required},domProps:{value:t.value},on:{change:t.handleChange,input:t.handleInput,focus:t.handleFocus,blur:t.handleBlur}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("td",{staticClass:"mu-td",on:{mouseenter:t.handleMouseEnter,mouseleave:t.handleMouseLeave,click:t.handleClick}},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("tfoot",{staticClass:"mu-tfoot"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"mu-step-label",class:{active:t.active,completed:t.completed,disabled:t.disabled}},[t.num||t.$slots.icon&&t.$slots.length>0?n("span",{staticClass:"mu-step-label-icon-container"},[t._t("icon",[t.completed?n("svg",{staticClass:"mu-step-label-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]):t._e(),t._v(" "),t.completed?t._e():n("div",{staticClass:"mu-step-label-circle"},[t._v("\n        "+t._s(t.num)+"\n      ")])])],2):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"mu-ripple"}},[n("div",{staticClass:"mu-circle-ripple",style:t.styles})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-text-field-hint",class:{show:t.show}},[t._v("\n  "+t._s(t.text)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-slider",class:t.sliderClass,attrs:{tabindex:"0"},on:{focus:t.handleFocus,blur:t.handleBlur,keydown:t.handleKeydown,touchstart:t.handleTouchStart,touchend:t.handleTouchEnd,touchcancel:t.handleTouchEnd,mousedown:t.handleMouseDown,mouseup:t.handleMouseUp,mouseenter:t.handleMouseEnter,mouseleave:t.handleMouseLeave}},[n("input",{attrs:{type:"hidden",name:t.name},domProps:{value:t.inputValue}}),t._v(" "),n("div",{staticClass:"mu-slider-track"}),t._v(" "),n("div",{staticClass:"mu-slider-fill",style:t.fillStyle}),t._v(" "),n("div",{staticClass:"mu-slider-thumb",style:t.thumbStyle},[!t.focused&&!t.hover||t.active?t._e():n("focus-ripple")],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mu-chip",class:t.classNames,style:t.style,on:{mouseenter:t.onMouseenter,mouseup:t.onMouseup,mousedown:t.onMousedown,mouseleave:t.onMouseleave,touchstart:t.onTouchstart,click:t.handleClick,touchend:t.onTouchend,touchcancel:t.onTouchend}},[t._t("default"),t._v(" "),t.showDelete&&!t.disabled?n("svg",{staticClass:"mu-chip-delete-icon",class:t.deleteIconClass,attrs:{viewBox:"0 0 24 24"},on:{click:function(e){e.stopPropagation(),t.handleDelete(e)}}},[n("path",{attrs:{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}})]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("abstract-button",{staticClass:"mu-item-wrapper",style:t.disabled?t.itemStyle:{},attrs:{containerElement:"div",href:t.href,disabled:t.disabled,disableFocusRipple:t.disableRipple,disableTouchRipple:t.disableRipple,target:t.target,to:t.to,tag:t.tag,activeClass:t.activeClass,event:t.event,exact:t.exact,append:t.append,replace:t.replace,wrapperStyle:t.itemStyle,centerRipple:!1},on:{click:t.handleClick,keyboardFocus:t.handleKeyboardFocus,hover:t.handleHover,hoverExit:t.handleHoverExit}},[n("div",{class:t.itemClass},[t.showLeft?n("div",{staticClass:"mu-item-left"},[t._t("left"),t._v(" "),t._t("leftAvatar")],2):t._e(),t._v(" "),n("div",{staticClass:"mu-item-content"},[t.showTitleRow?n("div",{staticClass:"mu-item-title-row"},[n("div",{staticClass:"mu-item-title",class:t.titleClass},[t._t("title",[t._v("\n               "+t._s(t.title)+"\n             ")])],2),t._v(" "),n("div",{staticClass:"mu-item-after",class:t.afterTextClass},[t._t("after",[t._v("\n                "+t._s(t.afterText)+"\n              ")])],2)]):t._e(),t._v(" "),t.showDescribe?n("div",{staticClass:"mu-item-text",class:t.describeTextClass,style:t.textStyle},[t._t("describe",[t._v("\n            "+t._s(t.describeText)+"\n          ")])],2):t._e(),t._v(" "),t._t("default")],2),t._v(" "),t.showRight?n("div",{staticClass:"mu-item-right"},[t.toggleNested?n("icon-button",{on:{click:function(e){e.stopPropagation(),t.handleToggleNested(e)}},nativeOn:{mousedown:function(e){t.stop(e)},touchstart:function(e){t.stop(e)}}},[t.nestedOpen?n("svg",{staticClass:"mu-item-svg-icon",class:t.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 15L12 9L18 15"}})]):t._e(),t._v(" "),t.nestedOpen?t._e():n("svg",{staticClass:"mu-item-svg-icon",class:t.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 9L12 15L18 9"}})])]):t._e(),t._v(" "),t._t("right"),t._v(" "),t._t("rightAvatar")],2):t._e()])]),t._v(" "),n("expand-transition",[t.showNested?n("mu-list",{class:t.nestedListClass,attrs:{nestedLevel:t.nestedLevel,value:t.nestedSelectValue},on:{change:t.handleNestedChange}},[t._t("nested")],2):t._e()],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mu-card-text"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(68),r=n.n(i),a=n(41),o=n.n(a),s=n(139),l=(n.n(s),n(1)),u=n(2),c=n(103),d=n(104),f=n(107),h=n(100),p=n(24),m=n(23),v=n(127),y=n(116),g=n(111),b=n(122),x=n(132),C=n(113),_=n(128),S=n(120),w=n(102),k=n(135),$=n(66),O=n(105),T=n(108),M=n(109),D=n(69),F=n.n(D),E=n(39),P=n(138),A=n(130),j=n(125),B=n(25),R=n(106),I=n(11),L=n(119),z=n(65),N=n(114),H=n(124),W=n(40),V=n(17),Y=n(67),K=n(63),G=n(126),X=n(133),U=n(129),q=n(121),Z=n(110),J=n(118),Q=n(134),tt=n(112),et=n(137),nt=n(131),it=n(101),rt=n(123),at=n(136),ot=n(117),st=n(115),lt=n(64);n.d(e,"config",function(){return lt.a}),n.d(e,"install",function(){return ct});var ut=o()({icon:u.a,backTop:c.a,badge:d.a},f,{appBar:h.a,iconButton:p.a,flatButton:m.a,raisedButton:v.a,floatButton:y.a,contentBlock:g.a},b,{subHeader:x.a,divider:C.a,refreshControl:_.a,infiniteScroll:S.a,avatar:w.a},k,{paper:$.a},O,T,{chip:M.a,overlay:F.a,dialog:E.a,toast:P.a,snackbar:A.a,popup:j.a},B,{bottomSheet:R.a,popover:I.a,iconMenu:L.a,dropDownMenu:z.a,drawer:N.a,picker:H.a,tooltip:W.a,textField:V.a,selectField:Y.a,checkbox:K.a,radio:G.a,_switch:X.a,slider:U.a},at,{linearProgress:q.a,circularProgress:Z.a},J,Q,{datePicker:tt.a,timePicker:et.a},nt,{autoComplete:it.a},ot,st,{pagination:rt.a}),ct=function(t){r()(ut).forEach(function(e){t.component(ut[e].name,ut[e])}),n.i(l.a)()};"undefined"!=typeof window&&window.Vue&&ct(window.Vue),e.default={config:lt.a,install:ct}}])});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(7);

var _vuex2 = _interopRequireDefault(_vuex);

var _getters = __webpack_require__(8);

var _getters2 = _interopRequireDefault(_getters);

var _mutations = __webpack_require__(9);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var state = {
	module: 'post',
	action: 'list',
	postList: []
};

exports.default = new _vuex2.default.Store({
	state: state,
	getters: _getters2.default,
	mutations: _mutations2.default
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	module: function module(state) {
		return state.module;
	},
	action: function action(state) {
		return state.action;
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	changeModuleAndAction: function changeModuleAndAction(state, payload) {
		state.module = payload.module;
		state.action = payload.action;
	},
	postList: function postList(state, _postList) {
		state.postList = _postList;
	}
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(18),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jiangbo/Documents/mini-blog/public/src/components/Admin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Admin.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f1f165c", Component.options)
  } else {
    hotAPI.reload("data-v-2f1f165c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SideMenu = __webpack_require__(40);

var _SideMenu2 = _interopRequireDefault(_SideMenu);

var _BreadCrumb = __webpack_require__(43);

var _BreadCrumb2 = _interopRequireDefault(_BreadCrumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        SideMenu: _SideMenu2.default,
        BreadCrumb: _BreadCrumb2.default
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(0)):"function"==typeof define&&define.amd?define("mavon-editor",["vue"],t):"object"==typeof exports?exports["mavon-editor"]=t(require("vue")):e["mavon-editor"]=t(e.Vue)}(this,function(__WEBPACK_EXTERNAL_MODULE_303__){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n=window.webpackJsonpmavon_editor;window.webpackJsonpmavon_editor=function(t,r,o){for(var a,s,l=0,c=[];l<t.length;l++)s=t[l],i[s]&&c.push(i[s][0]),i[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);for(n&&n(t,r,o);c.length;)c.shift()()};var r={},i={176:0};return t.e=function(e){function n(){s.onerror=s.onload=null,clearTimeout(l);var t=i[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),i[e]=void 0)}var r=i[e];if(0===r)return new Promise(function(e){e()});if(r)return r[2];var o=new Promise(function(t,n){r=i[e]=[t,n]});r[2]=o;var a=document.getElementsByTagName("head")[0],s=document.createElement("script");s.type="text/javascript",s.charset="utf-8",s.async=!0,s.timeout=12e4,t.nc&&s.setAttribute("nonce",t.nc),s.src=t.p+"js/"+({0:"hljs.zephir",1:"hljs.yaml",2:"hljs.xquery",3:"hljs.xml",4:"hljs.xl",5:"hljs.x86asm",6:"hljs.vim",7:"hljs.vhdl",8:"hljs.verilog",9:"hljs.vbscript",10:"hljs.vbscript_html",11:"hljs.vbnet",12:"hljs.vala",13:"hljs.typescript",14:"hljs.twig",15:"hljs.tp",16:"hljs.thrift",17:"hljs.tex",18:"hljs.tcl",19:"hljs.tap",20:"hljs.taggerscript",21:"hljs.swift",22:"hljs.subunit",23:"hljs.stylus",24:"hljs.step21",25:"hljs.stata",26:"hljs.stan",27:"hljs.sql",28:"hljs.sqf",29:"hljs.sml",30:"hljs.smalltalk",31:"hljs.smali",32:"hljs.shell",33:"hljs.scss",34:"hljs.scilab",35:"hljs.scheme",36:"hljs.scala",37:"hljs.rust",38:"hljs.ruleslanguage",39:"hljs.ruby",40:"hljs.rsl",41:"hljs.routeros",42:"hljs.roboconf",43:"hljs.rib",44:"hljs.r",45:"hljs.qml",46:"hljs.q",47:"hljs.python",48:"hljs.purebasic",49:"hljs.puppet",50:"hljs.protobuf",51:"hljs.prolog",52:"hljs.profile",53:"hljs.processing",54:"hljs.powershell",55:"hljs.pony",56:"hljs.php",57:"hljs.pf",58:"hljs.perl",59:"hljs.parser3",60:"hljs.oxygene",61:"hljs.openscad",62:"hljs.ocaml",63:"hljs.objectivec",64:"hljs.nsis",65:"hljs.nix",66:"hljs.nimrod",67:"hljs.nginx",68:"hljs.n1ql",69:"hljs.moonscript",70:"hljs.monkey",71:"hljs.mojolicious",72:"hljs.mizar",73:"hljs.mipsasm",74:"hljs.mercury",75:"hljs.mel",76:"hljs.maxima",77:"hljs.matlab",78:"hljs.mathematica",79:"hljs.markdown",80:"hljs.makefile",81:"hljs.lua",82:"hljs.lsl",83:"hljs.llvm",84:"hljs.livescript",85:"hljs.livecodeserver",86:"hljs.lisp",87:"hljs.less",88:"hljs.leaf",89:"hljs.ldif",90:"hljs.lasso",91:"hljs.kotlin",92:"hljs.julia",93:"hljs.julia_repl",94:"hljs.json",95:"hljs.jboss_cli",96:"hljs.javascript",97:"hljs.java",98:"hljs.irpf90",99:"hljs.ini",100:"hljs.inform7",101:"hljs.hy",102:"hljs.http",103:"hljs.htmlbars",104:"hljs.hsp",105:"hljs.haxe",106:"hljs.haskell",107:"hljs.handlebars",108:"hljs.haml",109:"hljs.groovy",110:"hljs.gradle",111:"hljs.golo",112:"hljs.go",113:"hljs.glsl",114:"hljs.gherkin",115:"hljs.gcode",116:"hljs.gauss",117:"hljs.gams",118:"hljs.fsharp",119:"hljs.fortran",120:"hljs.flix",121:"hljs.fix",122:"hljs.excel",123:"hljs.erlang",124:"hljs.erlang_repl",125:"hljs.erb",126:"hljs.elm",127:"hljs.elixir",128:"hljs.ebnf",129:"hljs.dust",130:"hljs.dts",131:"hljs.dsconfig",132:"hljs.dos",133:"hljs.dockerfile",134:"hljs.dns",135:"hljs.django",136:"hljs.diff",137:"hljs.delphi",138:"hljs.dart",139:"hljs.d",140:"hljs.css",141:"hljs.csp",142:"hljs.cs",143:"hljs.crystal",144:"hljs.crmsh",145:"hljs.cpp",146:"hljs.cos",147:"hljs.coq",148:"hljs.coffeescript",149:"hljs.cmake",150:"hljs.clojure",151:"hljs.clojure_repl",152:"hljs.clean",153:"hljs.ceylon",154:"hljs.capnproto",155:"hljs.cal",156:"hljs.brainfuck",157:"hljs.bnf",158:"hljs.basic",159:"hljs.bash",160:"hljs.axapta",161:"hljs.awk",162:"hljs.avrasm",163:"hljs.autoit",164:"hljs.autohotkey",165:"hljs.aspectj",166:"hljs.asciidoc",167:"hljs.armasm",168:"hljs.arduino",169:"hljs.applescript",170:"hljs.apache",171:"hljs.ada",172:"hljs.actionscript",173:"hljs.accesslog",174:"hljs.abnf",175:"hljs.1c"}[e]||e)+".js";var l=setTimeout(n,12e4);return s.onerror=s.onload=n,a.appendChild(s),o},t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t.oe=function(e){throw console.error(e),e},t(t.s=84)}([function(e,t,n){"use strict";function r(e){return Object.prototype.toString.call(e)}function i(e){return"[object String]"===r(e)}function o(e,t){return k.call(e,t)}function a(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if("object"!=typeof t)throw new TypeError(t+"must be object");Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function s(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function l(e){return!(e>=55296&&e<=57343)&&(!(e>=64976&&e<=65007)&&(65535!=(65535&e)&&65534!=(65535&e)&&(!(e>=0&&e<=8)&&(11!==e&&(!(e>=14&&e<=31)&&(!(e>=127&&e<=159)&&!(e>1114111)))))))}function c(e){if(e>65535){e-=65536;var t=55296+(e>>10),n=56320+(1023&e);return String.fromCharCode(t,n)}return String.fromCharCode(e)}function u(e,t){var n=0;return o(A,t)?A[t]:35===t.charCodeAt(0)&&j.test(t)&&(n="x"===t[1].toLowerCase()?parseInt(t.slice(2),16):parseInt(t.slice(1),10),l(n))?c(n):e}function h(e){return e.indexOf("\\")<0?e:e.replace(w,"$1")}function p(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(C,function(e,t,n){return t||u(e,n)})}function d(e){return L[e]}function f(e){return E.test(e)?e.replace(S,d):e}function g(e){return e.replace(D,"\\$&")}function m(e){switch(e){case 9:case 32:return!0}return!1}function _(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function b(e){return T.test(e)}function v(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function y(e){return e.trim().replace(/\s+/g," ").toUpperCase()}var k=Object.prototype.hasOwnProperty,w=/\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,x=/&([a-z#][a-z0-9]{1,31});/gi,C=new RegExp(w.source+"|"+x.source,"gi"),j=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,A=n(58),E=/[&<>"]/,S=/[&<>"]/g,L={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},D=/[.?*+^$[\]\\(){}|-]/g,T=n(43);t.lib={},t.lib.mdurl=n(62),t.lib.ucmicro=n(254),t.assign=a,t.isString=i,t.has=o,t.unescapeMd=h,t.unescapeAll=p,t.isValidEntityCode=l,t.fromCodePoint=c,t.escapeHtml=f,t.arrayReplaceAt=s,t.isSpace=m,t.isWhiteSpace=_,t.isMdAsciiPunct=v,t.isPunctChar=b,t.escapeRE=g,t.normalizeReference=y},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t){e.exports=function(e,t,n,r,i){var o,a=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(o=e,a=e.default);var l="function"==typeof a?a.options:a;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),r&&(l._scopeId=r);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=c):n&&(c=n),c){var u=l.functional,h=u?l.render:l.beforeCreate;u?l.render=function(e,t){return c.call(t),h(e,t)}:l.beforeCreate=h?[].concat(h,c):[c]}return{esModule:o,exports:a,options:l}}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=u[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));u[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var e=document.createElement("style");return e.type="text/css",h.appendChild(e),e}function o(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(f)return g;r.parentNode.removeChild(r)}if(m){var o=d++;r=p||(p=i()),t=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function a(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=_(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function s(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(297),u={},h=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,d=0,f=!1,g=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){f=n;var i=c(e,t);return r(i),function(t){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=u[a.id];s.refs--,n.push(s)}t?(i=c(e,t),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete u[s.id]}}}};var _=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){function n(e){return p[e]}function r(e){return(""+e).replace(d,n)}function i(e){o(e,"")}var o,a=Array.prototype.indexOf,s=function(e,t){if(null==e)return-1;if(a&&e.indexOf===a)return e.indexOf(t);for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},l=function(e,t){return-1!==s(e,t)},c=function(e,t){return void 0===e?t:e},u=/([A-Z])/g,h=function(e){return e.replace(u,"-$1").toLowerCase()},p={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},d=/[&><"']/g;if("undefined"!=typeof document){var f=document.createElement("span");o="textContent"in f?function(e,t){e.textContent=t}:function(e,t){e.innerText=t}}e.exports={contains:l,deflt:c,escape:r,hyphenate:h,indexOf:s,setTextContent:o,clearNode:i}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){function n(e,t,r){var i="KaTeX parse error: "+e;if(void 0!==t&&void 0!==r){i+=" at position "+r+": ";var o=t._input;o=o.slice(0,r)+"̲"+o.slice(r);var a=Math.max(0,r-15),s=r+15;i+=o.slice(a,s)}var l=new Error(i);return l.name="ParseError",l.__proto__=n.prototype,l.position=r,l}n.prototype.__proto__=Error.prototype,e.exports=n},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(48),i=n(28);e.exports=function(e){return r(i(e))}},function(e,t){var n=e.exports={version:"2.5.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(11)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){var r=n(13),i=n(22);e.exports=n(10)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(18),i=n(47),o=n(38),a=Object.defineProperty;t.f=n(10)?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(52),i=n(29);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t,n){var r=n(35)("wks"),i=n(23),o=n(5).Symbol,a="function"==typeof o;(e.exports=function(e){return r[e]||(r[e]=a&&o[e]||(a?o:i)("Symbol."+e))}).store=r},function(e,t,n){"use strict";function r(e){return void 0!==e&&null!==e}function i(e){for(var t=1,n=arguments.length;t<n;t++){var r=arguments[t];for(var i in r)if(r.hasOwnProperty(i)){var o=r[i];void 0!==o&&(e[i]=o)}}return e}function o(){for(var e="undefined"!=typeof navigator?navigator.userAgent:"",t=["Android","iPhone","Windows Phone","iPad","iPod"],n=!0,r=0;r<t.length;r++)if(e.indexOf(t[r])>0){n=!1;break}return n}n.d(t,"b",function(){return u}),t.a=r,t.d=i,t.c=o;var a=n(107),s=n.n(a),l=n(104),c=s()(l),u=function(e){return e?-1!==c.indexOf(e)?l[e]:e:""}},function(e,t,n){var r=n(24),i={xHeight:.431,quad:1,num1:.677,num2:.394,num3:.444,denom1:.686,denom2:.345,sup1:.413,sup2:.363,sup3:.289,sub1:.15,sub2:.247,supDrop:.386,subDrop:.05,axisHeight:.25,defaultRuleThickness:.04,bigOpSpacing1:.111,bigOpSpacing2:.166,bigOpSpacing3:.2,bigOpSpacing4:.6,bigOpSpacing5:.1,ptPerEm:10,emPerEx:.431,doubleRuleSep:.2,delim1:2.39,getDelim2:function(e){if(e.size===r.TEXT.size)return 1.01;if(e.size===r.SCRIPT.size)return.81;if(e.size===r.SCRIPTSCRIPT.size)return.71;throw new Error("Unexpected style size: "+e.size)}},o=n(177),a=function(e,t){var n=o[t][e.charCodeAt(0)];if(n)return{depth:n[0],height:n[1],italic:n[2],skew:n[3],width:n[4]}};e.exports={metrics:i,getCharacterMetrics:a}},function(e,t,n){var r=n(20);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var r=n(5),i=n(9),o=n(119),a=n(12),s=function(e,t,n){var l,c,u,h=e&s.F,p=e&s.G,d=e&s.S,f=e&s.P,g=e&s.B,m=e&s.W,_=p?i:i[t]||(i[t]={}),b=_.prototype,v=p?r:d?r[t]:(r[t]||{}).prototype;p&&(n=t);for(l in n)(c=!h&&v&&void 0!==v[l])&&l in _||(u=c?v[l]:n[l],_[l]=p&&"function"!=typeof v[l]?n[l]:g&&c?o(u,r):m&&v[l]==u?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(u):f&&"function"==typeof u?o(Function.call,u):u,f&&((_.virtual||(_.virtual={}))[l]=u,e&s.R&&b&&!b[l]&&a(b,l,u)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t){function n(e,t,n,r){this.id=e,this.size=t,this.cramped=r,this.sizeMultiplier=n}n.prototype.sup=function(){return o[a[this.id]]},n.prototype.sub=function(){return o[s[this.id]]},n.prototype.fracNum=function(){return o[l[this.id]]},n.prototype.fracDen=function(){return o[c[this.id]]},n.prototype.cramp=function(){return o[u[this.id]]},n.prototype.cls=function(){return r[this.size]+(this.cramped?" cramped":" uncramped")},n.prototype.reset=function(){return i[this.size]};var r=["displaystyle textstyle","textstyle","scriptstyle","scriptscriptstyle"],i=["reset-textstyle","reset-textstyle","reset-scriptstyle","reset-scriptscriptstyle"],o=[new n(0,0,1,!1),new n(1,0,1,!0),new n(2,1,1,!1),new n(3,1,1,!0),new n(4,2,.7,!1),new n(5,2,.7,!0),new n(6,3,.5,!1),new n(7,3,.5,!0)],a=[4,5,4,5,6,7,6,7],s=[5,5,5,5,7,7,7,7],l=[2,3,4,5,6,7,6,7],c=[3,3,5,5,7,7,7,7],u=[1,1,3,3,5,5,7,7];e.exports={DISPLAY:o[0],TEXT:o[2],SCRIPT:o[4],SCRIPTSCRIPT:o[6]}},function(e,t,n){var r=n(55),i=n(17),o=n(26),a=n(4),s=["\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega"],l=["ı","ȷ"],c=function(e,t,n,a,s){o[n][e]&&o[n][e].replace&&(e=o[n][e].replace);var l,c=i.getCharacterMetrics(e,t);return c?l=new r.symbolNode(e,c.height,c.depth,c.italic,c.skew,s):("undefined"!=typeof console&&console.warn("No character metrics for '"+e+"' in style '"+t+"'"),l=new r.symbolNode(e,0,0,0,0,s)),a&&(l.style.color=a),l},u=function(e,t,n,r){return"\\"===e||"main"===o[t][e].font?c(e,"Main-Regular",t,n,r):c(e,"AMS-Regular",t,n,r.concat(["amsrm"]))},h=function(e,t,n,r,i){if("mathord"===i)return p(e,t,n,r);if("textord"===i)return c(e,"Main-Regular",t,n,r.concat(["mathrm"]));throw new Error("unexpected type: "+i+" in mathDefault")},p=function(e,t,n,r){return/[0-9]/.test(e.charAt(0))||a.contains(l,e)||a.contains(s,e)?c(e,"Main-Italic",t,n,r.concat(["mainit"])):c(e,"Math-Italic",t,n,r.concat(["mathit"]))},d=function(e,t,n){var r=e.mode,s=e.value;o[r][s]&&o[r][s].replace&&(s=o[r][s].replace);var u=["mord"],d=t.getColor(),f=t.font;if(f){if("mathit"===f||a.contains(l,s))return p(s,r,d,u);var g=k[f].fontName;return i.getCharacterMetrics(s,g)?c(s,g,r,d,u.concat([f])):h(s,r,d,u,n)}return h(s,r,d,u,n)},f=function(e){var t=0,n=0,r=0;if(e.children)for(var i=0;i<e.children.length;i++)e.children[i].height>t&&(t=e.children[i].height),e.children[i].depth>n&&(n=e.children[i].depth),e.children[i].maxFontSize>r&&(r=e.children[i].maxFontSize);e.height=t,e.depth=n,e.maxFontSize=r},g=function(e,t,n){var i=new r.span(e,t);return f(i),n&&(i.style.color=n),i},m=function(e){var t=new r.documentFragment(e);return f(t),t},_=function(e,t){var n=g([],[new r.symbolNode("​")]);return n.style.fontSize=t/e.style.sizeMultiplier+"em",g(["fontsize-ensurer","reset-"+e.size,"size5"],[n])},b=function(e,t,n,i){var o,a,s;if("individualShift"===t){var l=e;for(e=[l[0]],o=-l[0].shift-l[0].elem.depth,a=o,s=1;s<l.length;s++){var c=-l[s].shift-a-l[s].elem.depth,u=c-(l[s-1].elem.height+l[s-1].elem.depth);a+=c,e.push({type:"kern",size:u}),e.push(l[s])}}else if("top"===t){var h=n;for(s=0;s<e.length;s++)"kern"===e[s].type?h-=e[s].size:h-=e[s].elem.height+e[s].elem.depth;o=h}else o="bottom"===t?-n:"shift"===t?-e[0].elem.depth-n:"firstBaseline"===t?-e[0].elem.depth:0;var p=0;for(s=0;s<e.length;s++)"elem"===e[s].type&&(p=Math.max(p,e[s].elem.maxFontSize));var d=_(i,p),f=[];for(a=o,s=0;s<e.length;s++)if("kern"===e[s].type)a+=e[s].size;else{var m=e[s].elem,b=-m.depth-a;a+=m.height+m.depth;var v=g([],[d,m]);v.height-=b,v.depth+=b,v.style.top=b+"em",f.push(v)}var y=g(["baseline-fix"],[d,new r.symbolNode("​")]);f.push(y);var k=g(["vlist"],f);return k.height=Math.max(a,k.height),k.depth=Math.max(-o,k.depth),k},v={size1:.5,size2:.7,size3:.8,size4:.9,size5:1,size6:1.2,size7:1.44,size8:1.73,size9:2.07,size10:2.49},y={"\\qquad":{size:"2em",className:"qquad"},"\\quad":{size:"1em",className:"quad"},"\\enspace":{size:"0.5em",className:"enspace"},"\\;":{size:"0.277778em",className:"thickspace"},"\\:":{size:"0.22222em",className:"mediumspace"},"\\,":{size:"0.16667em",className:"thinspace"},"\\!":{size:"-0.16667em",className:"negativethinspace"}},k={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}};e.exports={fontMap:k,makeSymbol:c,mathsym:u,makeSpan:g,makeFragment:m,makeVList:b,makeOrd:d,sizingMultiplier:v,spacingFunctions:y}},function(e,t){function n(t,n,r,i,o){e.exports[t][o]={font:n,group:r,replace:i}}e.exports={math:{},text:{}};var r="math",i="main",o="ams",a="accent",s="bin",l="close",c="mathord",u="op",h="open",p="rel",d="spacing",f="textord";n(r,i,p,"≡","\\equiv"),n(r,i,p,"≺","\\prec"),n(r,i,p,"≻","\\succ"),n(r,i,p,"∼","\\sim"),n(r,i,p,"⊥","\\perp"),n(r,i,p,"⪯","\\preceq"),n(r,i,p,"⪰","\\succeq"),n(r,i,p,"≃","\\simeq"),n(r,i,p,"∣","\\mid"),n(r,i,p,"≪","\\ll"),n(r,i,p,"≫","\\gg"),n(r,i,p,"≍","\\asymp"),n(r,i,p,"∥","\\parallel"),n(r,i,p,"⋈","\\bowtie"),n(r,i,p,"⌣","\\smile"),n(r,i,p,"⊑","\\sqsubseteq"),n(r,i,p,"⊒","\\sqsupseteq"),n(r,i,p,"≐","\\doteq"),n(r,i,p,"⌢","\\frown"),n(r,i,p,"∋","\\ni"),n(r,i,p,"∝","\\propto"),n(r,i,p,"⊢","\\vdash"),n(r,i,p,"⊣","\\dashv"),n(r,i,p,"∋","\\owns"),n(r,i,"punct",".","\\ldotp"),n(r,i,"punct","⋅","\\cdotp"),n(r,i,f,"#","\\#"),n(r,i,f,"&","\\&"),n(r,i,f,"ℵ","\\aleph"),n(r,i,f,"∀","\\forall"),n(r,i,f,"ℏ","\\hbar"),n(r,i,f,"∃","\\exists"),n(r,i,f,"∇","\\nabla"),n(r,i,f,"♭","\\flat"),n(r,i,f,"ℓ","\\ell"),n(r,i,f,"♮","\\natural"),n(r,i,f,"♣","\\clubsuit"),n(r,i,f,"℘","\\wp"),n(r,i,f,"♯","\\sharp"),n(r,i,f,"♢","\\diamondsuit"),n(r,i,f,"ℜ","\\Re"),n(r,i,f,"♡","\\heartsuit"),n(r,i,f,"ℑ","\\Im"),n(r,i,f,"♠","\\spadesuit"),n(r,i,f,"†","\\dag"),n(r,i,f,"‡","\\ddag"),n(r,i,l,"⎱","\\rmoustache"),n(r,i,h,"⎰","\\lmoustache"),n(r,i,l,"⟯","\\rgroup"),n(r,i,h,"⟮","\\lgroup"),n(r,i,s,"∓","\\mp"),n(r,i,s,"⊖","\\ominus"),n(r,i,s,"⊎","\\uplus"),n(r,i,s,"⊓","\\sqcap"),n(r,i,s,"∗","\\ast"),n(r,i,s,"⊔","\\sqcup"),n(r,i,s,"◯","\\bigcirc"),n(r,i,s,"∙","\\bullet"),n(r,i,s,"‡","\\ddagger"),n(r,i,s,"≀","\\wr"),n(r,i,s,"⨿","\\amalg"),n(r,i,p,"⟵","\\longleftarrow"),n(r,i,p,"⇐","\\Leftarrow"),n(r,i,p,"⟸","\\Longleftarrow"),n(r,i,p,"⟶","\\longrightarrow"),n(r,i,p,"⇒","\\Rightarrow"),n(r,i,p,"⟹","\\Longrightarrow"),n(r,i,p,"↔","\\leftrightarrow"),n(r,i,p,"⟷","\\longleftrightarrow"),n(r,i,p,"⇔","\\Leftrightarrow"),n(r,i,p,"⟺","\\Longleftrightarrow"),n(r,i,p,"↦","\\mapsto"),n(r,i,p,"⟼","\\longmapsto"),n(r,i,p,"↗","\\nearrow"),n(r,i,p,"↩","\\hookleftarrow"),n(r,i,p,"↪","\\hookrightarrow"),n(r,i,p,"↘","\\searrow"),n(r,i,p,"↼","\\leftharpoonup"),n(r,i,p,"⇀","\\rightharpoonup"),n(r,i,p,"↙","\\swarrow"),n(r,i,p,"↽","\\leftharpoondown"),n(r,i,p,"⇁","\\rightharpoondown"),n(r,i,p,"↖","\\nwarrow"),n(r,i,p,"⇌","\\rightleftharpoons"),n(r,o,p,"≮","\\nless"),n(r,o,p,"","\\nleqslant"),n(r,o,p,"","\\nleqq"),n(r,o,p,"⪇","\\lneq"),n(r,o,p,"≨","\\lneqq"),n(r,o,p,"","\\lvertneqq"),n(r,o,p,"⋦","\\lnsim"),n(r,o,p,"⪉","\\lnapprox"),n(r,o,p,"⊀","\\nprec"),n(r,o,p,"⋠","\\npreceq"),n(r,o,p,"⋨","\\precnsim"),n(r,o,p,"⪹","\\precnapprox"),n(r,o,p,"≁","\\nsim"),n(r,o,p,"","\\nshortmid"),n(r,o,p,"∤","\\nmid"),n(r,o,p,"⊬","\\nvdash"),n(r,o,p,"⊭","\\nvDash"),n(r,o,p,"⋪","\\ntriangleleft"),n(r,o,p,"⋬","\\ntrianglelefteq"),n(r,o,p,"⊊","\\subsetneq"),n(r,o,p,"","\\varsubsetneq"),n(r,o,p,"⫋","\\subsetneqq"),n(r,o,p,"","\\varsubsetneqq"),n(r,o,p,"≯","\\ngtr"),n(r,o,p,"","\\ngeqslant"),n(r,o,p,"","\\ngeqq"),n(r,o,p,"⪈","\\gneq"),n(r,o,p,"≩","\\gneqq"),n(r,o,p,"","\\gvertneqq"),n(r,o,p,"⋧","\\gnsim"),n(r,o,p,"⪊","\\gnapprox"),n(r,o,p,"⊁","\\nsucc"),n(r,o,p,"⋡","\\nsucceq"),n(r,o,p,"⋩","\\succnsim"),n(r,o,p,"⪺","\\succnapprox"),n(r,o,p,"≆","\\ncong"),n(r,o,p,"","\\nshortparallel"),n(r,o,p,"∦","\\nparallel"),n(r,o,p,"⊯","\\nVDash"),n(r,o,p,"⋫","\\ntriangleright"),n(r,o,p,"⋭","\\ntrianglerighteq"),n(r,o,p,"","\\nsupseteqq"),n(r,o,p,"⊋","\\supsetneq"),n(r,o,p,"","\\varsupsetneq"),n(r,o,p,"⫌","\\supsetneqq"),n(r,o,p,"","\\varsupsetneqq"),n(r,o,p,"⊮","\\nVdash"),n(r,o,p,"⪵","\\precneqq"),n(r,o,p,"⪶","\\succneqq"),n(r,o,p,"","\\nsubseteqq"),n(r,o,s,"⊴","\\unlhd"),n(r,o,s,"⊵","\\unrhd"),n(r,o,p,"↚","\\nleftarrow"),n(r,o,p,"↛","\\nrightarrow"),n(r,o,p,"⇍","\\nLeftarrow"),n(r,o,p,"⇏","\\nRightarrow"),n(r,o,p,"↮","\\nleftrightarrow"),n(r,o,p,"⇎","\\nLeftrightarrow"),n(r,o,p,"△","\\vartriangle"),n(r,o,f,"ℏ","\\hslash"),n(r,o,f,"▽","\\triangledown"),n(r,o,f,"◊","\\lozenge"),n(r,o,f,"Ⓢ","\\circledS"),n(r,o,f,"®","\\circledR"),n(r,o,f,"∡","\\measuredangle"),n(r,o,f,"∄","\\nexists"),n(r,o,f,"℧","\\mho"),n(r,o,f,"Ⅎ","\\Finv"),n(r,o,f,"⅁","\\Game"),n(r,o,f,"k","\\Bbbk"),n(r,o,f,"‵","\\backprime"),n(r,o,f,"▲","\\blacktriangle"),n(r,o,f,"▼","\\blacktriangledown"),n(r,o,f,"■","\\blacksquare"),n(r,o,f,"⧫","\\blacklozenge"),n(r,o,f,"★","\\bigstar"),n(r,o,f,"∢","\\sphericalangle"),n(r,o,f,"∁","\\complement"),n(r,o,f,"ð","\\eth"),n(r,o,f,"╱","\\diagup"),n(r,o,f,"╲","\\diagdown"),n(r,o,f,"□","\\square"),n(r,o,f,"□","\\Box"),n(r,o,f,"◊","\\Diamond"),n(r,o,f,"¥","\\yen"),n(r,o,f,"✓","\\checkmark"),n(r,o,f,"ℶ","\\beth"),n(r,o,f,"ℸ","\\daleth"),n(r,o,f,"ℷ","\\gimel"),n(r,o,f,"ϝ","\\digamma"),n(r,o,f,"ϰ","\\varkappa"),n(r,o,h,"┌","\\ulcorner"),n(r,o,l,"┐","\\urcorner"),n(r,o,h,"└","\\llcorner"),n(r,o,l,"┘","\\lrcorner"),n(r,o,p,"≦","\\leqq"),n(r,o,p,"⩽","\\leqslant"),n(r,o,p,"⪕","\\eqslantless"),n(r,o,p,"≲","\\lesssim"),n(r,o,p,"⪅","\\lessapprox"),n(r,o,p,"≊","\\approxeq"),n(r,o,s,"⋖","\\lessdot"),n(r,o,p,"⋘","\\lll"),n(r,o,p,"≶","\\lessgtr"),n(r,o,p,"⋚","\\lesseqgtr"),n(r,o,p,"⪋","\\lesseqqgtr"),n(r,o,p,"≑","\\doteqdot"),n(r,o,p,"≓","\\risingdotseq"),n(r,o,p,"≒","\\fallingdotseq"),n(r,o,p,"∽","\\backsim"),n(r,o,p,"⋍","\\backsimeq"),n(r,o,p,"⫅","\\subseteqq"),n(r,o,p,"⋐","\\Subset"),n(r,o,p,"⊏","\\sqsubset"),n(r,o,p,"≼","\\preccurlyeq"),n(r,o,p,"⋞","\\curlyeqprec");n(r,o,p,"≾","\\precsim"),n(r,o,p,"⪷","\\precapprox"),n(r,o,p,"⊲","\\vartriangleleft"),n(r,o,p,"⊴","\\trianglelefteq"),n(r,o,p,"⊨","\\vDash"),n(r,o,p,"⊪","\\Vvdash"),n(r,o,p,"⌣","\\smallsmile"),n(r,o,p,"⌢","\\smallfrown"),n(r,o,p,"≏","\\bumpeq"),n(r,o,p,"≎","\\Bumpeq"),n(r,o,p,"≧","\\geqq"),n(r,o,p,"⩾","\\geqslant"),n(r,o,p,"⪖","\\eqslantgtr"),n(r,o,p,"≳","\\gtrsim"),n(r,o,p,"⪆","\\gtrapprox"),n(r,o,s,"⋗","\\gtrdot"),n(r,o,p,"⋙","\\ggg"),n(r,o,p,"≷","\\gtrless"),n(r,o,p,"⋛","\\gtreqless"),n(r,o,p,"⪌","\\gtreqqless"),n(r,o,p,"≖","\\eqcirc"),n(r,o,p,"≗","\\circeq"),n(r,o,p,"≜","\\triangleq"),n(r,o,p,"∼","\\thicksim"),n(r,o,p,"≈","\\thickapprox"),n(r,o,p,"⫆","\\supseteqq"),n(r,o,p,"⋑","\\Supset"),n(r,o,p,"⊐","\\sqsupset"),n(r,o,p,"≽","\\succcurlyeq"),n(r,o,p,"⋟","\\curlyeqsucc"),n(r,o,p,"≿","\\succsim"),n(r,o,p,"⪸","\\succapprox"),n(r,o,p,"⊳","\\vartriangleright"),n(r,o,p,"⊵","\\trianglerighteq"),n(r,o,p,"⊩","\\Vdash"),n(r,o,p,"∣","\\shortmid"),n(r,o,p,"∥","\\shortparallel"),n(r,o,p,"≬","\\between"),n(r,o,p,"⋔","\\pitchfork"),n(r,o,p,"∝","\\varpropto"),n(r,o,p,"◀","\\blacktriangleleft"),n(r,o,p,"∴","\\therefore"),n(r,o,p,"∍","\\backepsilon"),n(r,o,p,"▶","\\blacktriangleright"),n(r,o,p,"∵","\\because"),n(r,o,p,"⋘","\\llless"),n(r,o,p,"⋙","\\gggtr"),n(r,o,s,"⊲","\\lhd"),n(r,o,s,"⊳","\\rhd"),n(r,o,p,"≂","\\eqsim"),n(r,i,p,"⋈","\\Join"),n(r,o,p,"≑","\\Doteq"),n(r,o,s,"∔","\\dotplus"),n(r,o,s,"∖","\\smallsetminus"),n(r,o,s,"⋒","\\Cap"),n(r,o,s,"⋓","\\Cup"),n(r,o,s,"⩞","\\doublebarwedge"),n(r,o,s,"⊟","\\boxminus"),n(r,o,s,"⊞","\\boxplus"),n(r,o,s,"⋇","\\divideontimes"),n(r,o,s,"⋉","\\ltimes"),n(r,o,s,"⋊","\\rtimes"),n(r,o,s,"⋋","\\leftthreetimes"),n(r,o,s,"⋌","\\rightthreetimes"),n(r,o,s,"⋏","\\curlywedge"),n(r,o,s,"⋎","\\curlyvee"),n(r,o,s,"⊝","\\circleddash"),n(r,o,s,"⊛","\\circledast"),n(r,o,s,"⋅","\\centerdot"),n(r,o,s,"⊺","\\intercal"),n(r,o,s,"⋒","\\doublecap"),n(r,o,s,"⋓","\\doublecup"),n(r,o,s,"⊠","\\boxtimes"),n(r,o,p,"⇢","\\dashrightarrow"),n(r,o,p,"⇠","\\dashleftarrow"),n(r,o,p,"⇇","\\leftleftarrows"),n(r,o,p,"⇆","\\leftrightarrows"),n(r,o,p,"⇚","\\Lleftarrow"),n(r,o,p,"↞","\\twoheadleftarrow"),n(r,o,p,"↢","\\leftarrowtail"),n(r,o,p,"↫","\\looparrowleft"),n(r,o,p,"⇋","\\leftrightharpoons"),n(r,o,p,"↶","\\curvearrowleft"),n(r,o,p,"↺","\\circlearrowleft"),n(r,o,p,"↰","\\Lsh"),n(r,o,p,"⇈","\\upuparrows"),n(r,o,p,"↿","\\upharpoonleft"),n(r,o,p,"⇃","\\downharpoonleft"),n(r,o,p,"⊸","\\multimap"),n(r,o,p,"↭","\\leftrightsquigarrow"),n(r,o,p,"⇉","\\rightrightarrows"),n(r,o,p,"⇄","\\rightleftarrows"),n(r,o,p,"↠","\\twoheadrightarrow"),n(r,o,p,"↣","\\rightarrowtail"),n(r,o,p,"↬","\\looparrowright"),n(r,o,p,"↷","\\curvearrowright"),n(r,o,p,"↻","\\circlearrowright"),n(r,o,p,"↱","\\Rsh"),n(r,o,p,"⇊","\\downdownarrows"),n(r,o,p,"↾","\\upharpoonright"),n(r,o,p,"⇂","\\downharpoonright"),n(r,o,p,"⇝","\\rightsquigarrow"),n(r,o,p,"⇝","\\leadsto"),n(r,o,p,"⇛","\\Rrightarrow"),n(r,o,p,"↾","\\restriction"),n(r,i,f,"‘","`"),n(r,i,f,"$","\\$"),n(r,i,f,"%","\\%"),n(r,i,f,"_","\\_"),n(r,i,f,"∠","\\angle"),n(r,i,f,"∞","\\infty"),n(r,i,f,"′","\\prime"),n(r,i,f,"△","\\triangle"),n(r,i,f,"Γ","\\Gamma"),n(r,i,f,"Δ","\\Delta"),n(r,i,f,"Θ","\\Theta"),n(r,i,f,"Λ","\\Lambda"),n(r,i,f,"Ξ","\\Xi"),n(r,i,f,"Π","\\Pi"),n(r,i,f,"Σ","\\Sigma"),n(r,i,f,"Υ","\\Upsilon"),n(r,i,f,"Φ","\\Phi"),n(r,i,f,"Ψ","\\Psi"),n(r,i,f,"Ω","\\Omega"),n(r,i,f,"¬","\\neg"),n(r,i,f,"¬","\\lnot"),n(r,i,f,"⊤","\\top"),n(r,i,f,"⊥","\\bot"),n(r,i,f,"∅","\\emptyset"),n(r,o,f,"∅","\\varnothing"),n(r,i,c,"α","\\alpha"),n(r,i,c,"β","\\beta"),n(r,i,c,"γ","\\gamma"),n(r,i,c,"δ","\\delta"),n(r,i,c,"ϵ","\\epsilon"),n(r,i,c,"ζ","\\zeta"),n(r,i,c,"η","\\eta"),n(r,i,c,"θ","\\theta"),n(r,i,c,"ι","\\iota"),n(r,i,c,"κ","\\kappa"),n(r,i,c,"λ","\\lambda"),n(r,i,c,"μ","\\mu"),n(r,i,c,"ν","\\nu"),n(r,i,c,"ξ","\\xi"),n(r,i,c,"o","\\omicron"),n(r,i,c,"π","\\pi"),n(r,i,c,"ρ","\\rho"),n(r,i,c,"σ","\\sigma"),n(r,i,c,"τ","\\tau"),n(r,i,c,"υ","\\upsilon"),n(r,i,c,"ϕ","\\phi"),n(r,i,c,"χ","\\chi"),n(r,i,c,"ψ","\\psi"),n(r,i,c,"ω","\\omega"),n(r,i,c,"ε","\\varepsilon"),n(r,i,c,"ϑ","\\vartheta"),n(r,i,c,"ϖ","\\varpi"),n(r,i,c,"ϱ","\\varrho"),n(r,i,c,"ς","\\varsigma"),n(r,i,c,"φ","\\varphi"),n(r,i,s,"∗","*"),n(r,i,s,"+","+"),n(r,i,s,"−","-"),n(r,i,s,"⋅","\\cdot"),n(r,i,s,"∘","\\circ"),n(r,i,s,"÷","\\div"),n(r,i,s,"±","\\pm"),n(r,i,s,"×","\\times"),n(r,i,s,"∩","\\cap"),n(r,i,s,"∪","\\cup"),n(r,i,s,"∖","\\setminus"),n(r,i,s,"∧","\\land"),n(r,i,s,"∨","\\lor"),n(r,i,s,"∧","\\wedge"),n(r,i,s,"∨","\\vee"),n(r,i,f,"√","\\surd"),n(r,i,h,"(","("),n(r,i,h,"[","["),n(r,i,h,"⟨","\\langle"),n(r,i,h,"∣","\\lvert"),n(r,i,h,"∥","\\lVert"),n(r,i,l,")",")"),n(r,i,l,"]","]"),n(r,i,l,"?","?"),n(r,i,l,"!","!"),n(r,i,l,"⟩","\\rangle"),n(r,i,l,"∣","\\rvert"),n(r,i,l,"∥","\\rVert"),n(r,i,p,"=","="),n(r,i,p,"<","<"),n(r,i,p,">",">"),n(r,i,p,":",":"),n(r,i,p,"≈","\\approx"),n(r,i,p,"≅","\\cong"),n(r,i,p,"≥","\\ge"),n(r,i,p,"≥","\\geq"),n(r,i,p,"←","\\gets"),n(r,i,p,">","\\gt"),n(r,i,p,"∈","\\in"),n(r,i,p,"∉","\\notin");n(r,i,p,"⊂","\\subset"),n(r,i,p,"⊃","\\supset"),n(r,i,p,"⊆","\\subseteq"),n(r,i,p,"⊇","\\supseteq"),n(r,o,p,"⊈","\\nsubseteq"),n(r,o,p,"⊉","\\nsupseteq"),n(r,i,p,"⊨","\\models"),n(r,i,p,"←","\\leftarrow"),n(r,i,p,"≤","\\le"),n(r,i,p,"≤","\\leq"),n(r,i,p,"<","\\lt"),n(r,i,p,"≠","\\ne"),n(r,i,p,"≠","\\neq"),n(r,i,p,"→","\\rightarrow"),n(r,i,p,"→","\\to"),n(r,o,p,"≱","\\ngeq"),n(r,o,p,"≰","\\nleq"),n(r,i,d,null,"\\!"),n(r,i,d," ","\\ "),n(r,i,d," ","~"),n(r,i,d,null,"\\,"),n(r,i,d,null,"\\:"),n(r,i,d,null,"\\;"),n(r,i,d,null,"\\enspace"),n(r,i,d,null,"\\qquad"),n(r,i,d,null,"\\quad"),n(r,i,d," ","\\space"),n(r,i,"punct",",",","),n(r,i,"punct",";",";"),n(r,i,"punct",":","\\colon"),n(r,o,s,"⊼","\\barwedge"),n(r,o,s,"⊻","\\veebar"),n(r,i,s,"⊙","\\odot"),n(r,i,s,"⊕","\\oplus"),n(r,i,s,"⊗","\\otimes"),n(r,i,f,"∂","\\partial"),n(r,i,s,"⊘","\\oslash"),n(r,o,s,"⊚","\\circledcirc"),n(r,o,s,"⊡","\\boxdot"),n(r,i,s,"△","\\bigtriangleup"),n(r,i,s,"▽","\\bigtriangledown"),n(r,i,s,"†","\\dagger"),n(r,i,s,"⋄","\\diamond"),n(r,i,s,"⋆","\\star"),n(r,i,s,"◃","\\triangleleft"),n(r,i,s,"▹","\\triangleright"),n(r,i,h,"{","\\{"),n(r,i,l,"}","\\}"),n(r,i,h,"{","\\lbrace"),n(r,i,l,"}","\\rbrace"),n(r,i,h,"[","\\lbrack"),n(r,i,l,"]","\\rbrack"),n(r,i,h,"⌊","\\lfloor"),n(r,i,l,"⌋","\\rfloor"),n(r,i,h,"⌈","\\lceil"),n(r,i,l,"⌉","\\rceil"),n(r,i,f,"\\","\\backslash"),n(r,i,f,"∣","|"),n(r,i,f,"∣","\\vert"),n(r,i,f,"∥","\\|"),n(r,i,f,"∥","\\Vert"),n(r,i,p,"↑","\\uparrow"),n(r,i,p,"⇑","\\Uparrow"),n(r,i,p,"↓","\\downarrow"),n(r,i,p,"⇓","\\Downarrow"),n(r,i,p,"↕","\\updownarrow"),n(r,i,p,"⇕","\\Updownarrow"),n(r,r,u,"∐","\\coprod"),n(r,r,u,"⋁","\\bigvee"),n(r,r,u,"⋀","\\bigwedge"),n(r,r,u,"⨄","\\biguplus"),n(r,r,u,"⋂","\\bigcap"),n(r,r,u,"⋃","\\bigcup"),n(r,r,u,"∫","\\int"),n(r,r,u,"∫","\\intop"),n(r,r,u,"∬","\\iint"),n(r,r,u,"∭","\\iiint"),n(r,r,u,"∏","\\prod"),n(r,r,u,"∑","\\sum"),n(r,r,u,"⨂","\\bigotimes"),n(r,r,u,"⨁","\\bigoplus"),n(r,r,u,"⨀","\\bigodot"),n(r,r,u,"∮","\\oint"),n(r,r,u,"⨆","\\bigsqcup"),n(r,r,u,"∫","\\smallint"),n(r,i,"inner","…","\\ldots"),n(r,i,"inner","⋯","\\cdots"),n(r,i,"inner","⋱","\\ddots"),n(r,i,f,"⋮","\\vdots"),n(r,i,a,"´","\\acute"),n(r,i,a,"`","\\grave"),n(r,i,a,"¨","\\ddot"),n(r,i,a,"~","\\tilde"),n(r,i,a,"¯","\\bar"),n(r,i,a,"˘","\\breve"),n(r,i,a,"ˇ","\\check"),n(r,i,a,"^","\\hat"),n(r,i,a,"⃗","\\vec"),n(r,i,a,"˙","\\dot"),n(r,i,c,"ı","\\imath"),n(r,i,c,"ȷ","\\jmath"),n("text",i,d," ","\\ "),n("text",i,d," "," "),n("text",i,d," ","~");var g,m,_='0123456789/@."';for(g=0;g<_.length;g++)m=_.charAt(g),n(r,i,f,m,m);var b="0123456789`!@*()-=+[]'\";:?/.,";for(g=0;g<b.length;g++)m=b.charAt(g),n("text",i,f,m,m);var v="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(g=0;g<v.length;g++)m=v.charAt(g),n(r,i,c,m,m),n("text",i,f,m,m)},function(e,t,n){"use strict";t.a={props:{to:{type:[String,Object]},tag:{type:String,default:"a"},activeClass:{type:String,default:"router-link-active"},event:{type:[String,Array],default:"click"},exact:Boolean,append:Boolean,replace:Boolean}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports={}},function(e,t){e.exports=!0},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var r=n(13).f,i=n(7),o=n(15)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},function(e,t,n){var r=n(35)("keys"),i=n(23);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t,n){var r=n(5),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(28);e.exports=function(e){return Object(r(e))}},function(e,t,n){var r=n(20);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(5),i=n(9),o=n(31),a=n(40),s=n(13).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:a.f(e)})}},function(e,t,n){t.f=n(15)},function(e,t,n){"use strict";function r(){this.__rules__=[],this.__cache__=null}r.prototype.__find__=function(e){for(var t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1},r.prototype.__compile__=function(){var e=this,t=[""];e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){t.indexOf(e)<0&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})},r.prototype.at=function(e,t,n){var r=this.__find__(e),i=n||{};if(-1===r)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=t,this.__rules__[r].alt=i.alt||[],this.__cache__=null},r.prototype.before=function(e,t,n,r){var i=this.__find__(e),o=r||{};if(-1===i)throw new Error("Parser rule not found: "+e);this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},r.prototype.after=function(e,t,n,r){var i=this.__find__(e),o=r||{};if(-1===i)throw new Error("Parser rule not found: "+e);this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},r.prototype.push=function(e,t,n){var r=n||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null},r.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);var n=[];return e.forEach(function(e){var r=this.__find__(e);if(r<0){if(t)return;throw new Error("Rules manager: invalid rule name "+e)}this.__rules__[r].enabled=!0,n.push(e)},this),this.__cache__=null,n},r.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(e){e.enabled=!1}),this.enable(e,t)},r.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);var n=[];return e.forEach(function(e){var r=this.__find__(e);if(r<0){if(t)return;throw new Error("Rules manager: invalid rule name "+e)}this.__rules__[r].enabled=!1,n.push(e)},this),this.__cache__=null,n},r.prototype.getRules=function(e){return null===this.__cache__&&this.__compile__(),this.__cache__[e]||[]},e.exports=r},function(e,t,n){"use strict";function r(e,t,n){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}r.prototype.attrIndex=function(e){var t,n,r;if(!this.attrs)return-1;for(t=this.attrs,n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1},r.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},r.prototype.attrSet=function(e,t){var n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r},r.prototype.attrGet=function(e){var t=this.attrIndex(e),n=null;return t>=0&&(n=this.attrs[t][1]),n},r.prototype.attrJoin=function(e,t){var n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=this.attrs[n][1]+" "+t},e.exports=r},function(e,t){e.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/},function(e,t,n){"use strict";function r(){f||("undefined"!=typeof window&&window.addEventListener("keydown",function(e){d="tab"===c()(e)}),f=!0)}var i=n(264),o=n.n(i),a=n(262),s=n.n(a),l=n(57),c=n.n(l),u=n(16),h=n(93),p=n(27),d=!1,f=!1;t.a={mixins:[p.a],props:{href:{type:String,default:""},disabled:{type:Boolean,default:!1},disableFocusRipple:{type:Boolean,default:!1},disableKeyboardFocus:{type:Boolean,default:!1},disableTouchRipple:{type:Boolean,default:!1},rippleColor:{type:String,default:""},rippleOpacity:{type:Number},centerRipple:{type:Boolean,default:!0},wrapperClass:{type:String,default:""},wrapperStyle:{type:[String,Object]},containerElement:{type:String},tabIndex:{type:Number,default:0},type:{type:String,default:"button"},keyboardFocused:{type:Boolean,default:!1}},data:function(){return{hover:!1,isKeyboardFocused:!1}},computed:{buttonClass:function(){var e=[];return this.disabled&&e.push("disabled"),this.disabled||!this.hover&&!this.isKeyboardFocused||e.push("hover"),e.join(" ")}},beforeMount:function(){var e=this.disabled,t=this.disableKeyboardFocus,n=this.keyboardFocused;e||!n||t||(this.isKeyboardFocused=!0)},mounted:function(){r(),this.isKeyboardFocused&&(this.$el.focus(),this.$emit("keyboardFocus",!0))},beforeUpdate:function(){(this.disabled||this.disableKeyboardFocus)&&this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("keyboardFocus",!1))},beforeDestory:function(){this.cancelFocusTimeout()},methods:{handleHover:function(e){!this.disabled&&n.i(u.c)()&&(this.hover=!0,this.$emit("hover",e))},handleOut:function(e){!this.disabled&&n.i(u.c)()&&(this.hover=!1,this.$emit("hoverExit",e))},removeKeyboardFocus:function(e){this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("KeyboardFocus",!1))},setKeyboardFocus:function(e){this.isKeyboardFocused||(this.isKeyboardFocused=!0,this.$emit("KeyboardFocus",!0))},cancelFocusTimeout:function(){this.focusTimeout&&(clearTimeout(this.focusTimeout),this.focusTimeout=null)},handleKeydown:function(e){this.disabled||this.disableKeyboardFocus||("enter"===c()(e)&&this.isKeyboardFocused&&this.$el.click(),"esc"===c()(e)&&this.isKeyboardFocused&&this.removeKeyboardFocus(e))},handleKeyup:function(e){this.disabled||this.disableKeyboardFocus||"space"===c()(e)&&this.isKeyboardFocused},handleFocus:function(e){var t=this;this.disabled||this.disableKeyboardFocus||(this.focusTimeout=setTimeout(function(){d&&(t.setKeyboardFocus(e),d=!1)},150))},handleBlur:function(e){this.cancelFocusTimeout(),this.removeKeyboardFocus(e)},handleClick:function(e){this.disabled||(d=!1,this.$el.blur(),this.removeKeyboardFocus(e),this.$emit("click",e))},getTagName:function(){var e="undefined"!=typeof navigator&&-1!==navigator.userAgent.toLowerCase().indexOf("firefox"),t=e?"span":"button";switch(!0){case!!this.to:return"router-link";case!!this.href:return"a";case!!this.containerElement:return this.containerElement;default:return t}},createButtonChildren:function(e){var t=this.isKeyboardFocused,n=this.disabled,r=this.disableFocusRipple,i=this.disableKeyboardFocus,a=this.rippleColor,l=this.rippleOpacity,c=this.disableTouchRipple,u=[];u=u.concat(this.$slots.default);var p=!t||h.a.disableFocusRipple||n||r||i?void 0:e(s.a,{color:a,opacity:l});return u=n||c||h.a.disableTouchRipple?[e("div",{class:this.wrapperClass,style:this.wrapperStyle},this.$slots.default)]:[e(o.a,{class:this.wrapperClass,style:this.wrapperStyle,props:{color:this.rippleColor,centerRipple:this.centerRipple,opacity:this.rippleOpacity}},this.$slots.default)],u.unshift(p),u}},watch:{disabled:function(e){e||(this.hover=!1)}},render:function(e){var t={disabled:this.disabled,type:this.type},n=this.to?{to:this.to,tag:this.tag,activeClass:this.activeClass,event:this.event,exact:this.exact,append:this.append,replace:this.replace}:{};return this.href&&(t.href=this.disabled?"javascript:;":this.href),this.disabled||(t.tabIndex=this.tabIndex),e(this.getTagName(),{class:this.buttonClass,domProps:t,props:n,style:{"user-select":this.disabled?"":"none","-webkit-user-select":this.disabled?"":"none",outline:"none",cursor:this.disabled?"":"pointer",appearance:"none"},on:{mouseenter:this.handleHover,mouseleave:this.handleOut,touchend:this.handleOut,touchcancel:this.handleOut,click:this.handleClick,focus:this.handleFocus,blur:this.handleBlur,keydown:this.handleKeydown,keyup:this.handleKeyup}},this.createButtonChildren(e))}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(20),i=n(5).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},function(e,t,n){e.exports=!n(10)&&!n(11)(function(){return 7!=Object.defineProperty(n(46)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(45);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){"use strict";var r=n(31),i=n(19),o=n(53),a=n(12),s=n(7),l=n(30),c=n(123),u=n(33),h=n(131),p=n(15)("iterator"),d=!([].keys&&"next"in[].keys()),f=function(){return this};e.exports=function(e,t,n,g,m,_,b){c(n,t,g);var v,y,k,w=function(e){if(!d&&e in A)return A[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},x=t+" Iterator",C="values"==m,j=!1,A=e.prototype,E=A[p]||A["@@iterator"]||m&&A[m],S=E||w(m),L=m?C?w("entries"):S:void 0,D="Array"==t?A.entries||E:E;if(D&&(k=h(D.call(new e)))!==Object.prototype&&k.next&&(u(k,x,!0),r||s(k,p)||a(k,p,f)),C&&E&&"values"!==E.name&&(j=!0,S=function(){return E.call(this)}),r&&!b||!d&&!j&&A[p]||a(A,p,S),l[t]=S,l[x]=f,m)if(v={values:C?S:w("values"),keys:_?S:w("keys"),entries:L},b)for(y in v)y in A||o(A,y,v[y]);else i(i.P+i.F*(d||j),t,v);return v}},function(e,t,n){var r=n(18),i=n(128),o=n(29),a=n(34)("IE_PROTO"),s=function(){},l=function(){var e,t=n(46)("iframe"),r=o.length;for(t.style.display="none",n(121).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;r--;)delete l.prototype[o[r]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(s.prototype=r(e),n=new s,s.prototype=null,n[a]=e):n=l(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(52),i=n(29).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},function(e,t,n){var r=n(7),i=n(8),o=n(118)(!1),a=n(34)("IE_PROTO");e.exports=function(e,t){var n,s=i(e),l=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;t.length>l;)r(s,n=t[l++])&&(~o(c,n)||c.push(n));return c}},function(e,t,n){e.exports=n(12)},function(e,t){function n(e,t){return void 0===e?t:e}function r(e){e=e||{},this.displayMode=n(e.displayMode,!1),this.throwOnError=n(e.throwOnError,!0),this.errorColor=n(e.errorColor,"#cc0000")}e.exports=r},function(e,t,n){function r(e,t,n,r,i,o){this.classes=e||[],this.children=t||[],this.height=n||0,this.depth=r||0,this.maxFontSize=i||0,this.style=o||{},this.attributes={}}function i(e,t,n,r){this.children=e||[],this.height=t||0,this.depth=n||0,this.maxFontSize=r||0}function o(e,t,n,r,i,o,a){this.value=e||"",this.height=t||0,this.depth=n||0,this.italic=r||0,this.skew=i||0,this.classes=o||[],this.style=a||{},this.maxFontSize=0}var a=n(4),s=function(e){e=e.slice();for(var t=e.length-1;t>=0;t--)e[t]||e.splice(t,1);return e.join(" ")};r.prototype.setAttribute=function(e,t){this.attributes[e]=t},r.prototype.toNode=function(){var e=document.createElement("span");e.className=s(this.classes);for(var t in this.style)Object.prototype.hasOwnProperty.call(this.style,t)&&(e.style[t]=this.style[t]);for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&e.setAttribute(n,this.attributes[n]);for(var r=0;r<this.children.length;r++)e.appendChild(this.children[r].toNode());return e},r.prototype.toMarkup=function(){var e="<span";this.classes.length&&(e+=' class="',e+=a.escape(s(this.classes)),e+='"');var t="";for(var n in this.style)this.style.hasOwnProperty(n)&&(t+=a.hyphenate(n)+":"+this.style[n]+";");t&&(e+=' style="'+a.escape(t)+'"');for(var r in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&(e+=" "+r+'="',e+=a.escape(this.attributes[r]),e+='"');e+=">";for(var i=0;i<this.children.length;i++)e+=this.children[i].toMarkup();return e+="</span>"},i.prototype.toNode=function(){for(var e=document.createDocumentFragment(),t=0;t<this.children.length;t++)e.appendChild(this.children[t].toNode());return e},i.prototype.toMarkup=function(){for(var e="",t=0;t<this.children.length;t++)e+=this.children[t].toMarkup();return e},o.prototype.toNode=function(){var e=document.createTextNode(this.value),t=null;this.italic>0&&(t=document.createElement("span"),t.style.marginRight=this.italic+"em"),this.classes.length>0&&(t=t||document.createElement("span"),t.className=s(this.classes));for(var n in this.style)this.style.hasOwnProperty(n)&&(t=t||document.createElement("span"),t.style[n]=this.style[n]);return t?(t.appendChild(e),t):e},o.prototype.toMarkup=function(){var e=!1,t="<span";this.classes.length&&(e=!0,t+=' class="',t+=a.escape(s(this.classes)),t+='"');var n="";this.italic>0&&(n+="margin-right:"+this.italic+"em;");for(var r in this.style)this.style.hasOwnProperty(r)&&(n+=a.hyphenate(r)+":"+this.style[r]+";");n&&(e=!0,t+=' style="'+a.escape(n)+'"');var i=a.escape(this.value);return e?(t+=">",t+=i,t+="</span>"):i},e.exports={span:r,documentFragment:i,symbolNode:o}},function(e,t){function n(e,t,n){this.type=e,this.value=t,this.mode=n}e.exports={ParseNode:n}},function(e,t){t=e.exports=function(e){if(e&&"object"==typeof e){var t=e.which||e.keyCode||e.charCode;t&&(e=t)}if("number"==typeof e)return o[e];var i=String(e),a=n[i.toLowerCase()];if(a)return a;var a=r[i.toLowerCase()];return a||(1===i.length?i.charCodeAt(0):void 0)};var n=t.code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},r=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};for(i=97;i<123;i++)n[String.fromCharCode(i)]=i-32;for(var i=48;i<58;i++)n[i-48]=i;for(i=1;i<13;i++)n["f"+i]=i+111;for(i=0;i<10;i++)n["numpad "+i]=i+96;var o=t.names=t.title={};for(i in n)o[n[i]]=i;for(var a in r)n[a]=r[a]},function(e,t,n){"use strict";e.exports=n(160)},function(e,t,n){"use strict";var r="<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",i="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",o=new RegExp("^(?:"+r+"|"+i+"|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),a=new RegExp("^(?:"+r+"|"+i+")");e.exports.HTML_TAG_RE=o,e.exports.HTML_OPEN_CLOSE_TAG_RE=a},function(e,t,n){"use strict";e.exports.tokenize=function(e,t){var n,r,i,o=e.pos,a=e.src.charCodeAt(o);if(t)return!1;if(95!==a&&42!==a)return!1;for(r=e.scanDelims(e.pos,42===a),n=0;n<r.length;n++)i=e.push("text","",0),i.content=String.fromCharCode(a),e.delimiters.push({marker:a,length:r.length,jump:n,token:e.tokens.length-1,level:e.level,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0},e.exports.postProcess=function(e){var t,n,r,i,o,a,s=e.delimiters,l=e.delimiters.length;for(t=0;t<l;t++)n=s[t],95!==n.marker&&42!==n.marker||-1!==n.end&&(r=s[n.end],a=t+1<l&&s[t+1].end===n.end-1&&s[t+1].token===n.token+1&&s[n.end-1].token===r.token-1&&s[t+1].marker===n.marker,o=String.fromCharCode(n.marker),i=e.tokens[n.token],i.type=a?"strong_open":"em_open",i.tag=a?"strong":"em",i.nesting=1,i.markup=a?o+o:o,i.content="",i=e.tokens[r.token],i.type=a?"strong_close":"em_close",i.tag=a?"strong":"em",i.nesting=-1,i.markup=a?o+o:o,i.content="",a&&(e.tokens[s[t+1].token].content="",e.tokens[s[n.end-1].token].content="",t++))}},function(e,t,n){"use strict";e.exports.tokenize=function(e,t){var n,r,i,o,a,s=e.pos,l=e.src.charCodeAt(s);if(t)return!1;if(126!==l)return!1;if(r=e.scanDelims(e.pos,!0),o=r.length,a=String.fromCharCode(l),o<2)return!1;for(o%2&&(i=e.push("text","",0),i.content=a,o--),n=0;n<o;n+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:l,jump:n,token:e.tokens.length-1,level:e.level,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0},e.exports.postProcess=function(e){var t,n,r,i,o,a=[],s=e.delimiters,l=e.delimiters.length;for(t=0;t<l;t++)r=s[t],126===r.marker&&-1!==r.end&&(i=s[r.end],o=e.tokens[r.token],o.type="s_open",o.tag="s",o.nesting=1,o.markup="~~",o.content="",o=e.tokens[i.token],o.type="s_close",o.tag="s",o.nesting=-1,o.markup="~~",o.content="","text"===e.tokens[i.token-1].type&&"~"===e.tokens[i.token-1].content&&a.push(i.token-1));for(;a.length;){for(t=a.pop(),n=t+1;n<e.tokens.length&&"s_close"===e.tokens[n].type;)n++;n--,t!==n&&(o=e.tokens[n],e.tokens[n]=e.tokens[t],e.tokens[t]=o)}}},function(e,t,n){"use strict";e.exports.encode=n(246),e.exports.decode=n(245),e.exports.format=n(247),e.exports.parse=n(248)},function(e,t){e.exports=/[\0-\x1F\x7F-\x9F]/},function(e,t){e.exports=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/},function(e,t){e.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},function(e,t,n){function r(e){i||n(285)}var i=!1,o=n(2)(n(80),n(271),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\list\\list.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||(n(293),n(294))}var i=!1,o=n(2)(n(72),n(279),r,"data-v-7a63e4b3",null);o.options.__file="D:\\code\\mavonEditor\\src\\mavon-editor.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] mavon-editor.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){"use strict";const r=n(255),i={autoTextarea:r,install:function(e){e.component("auto-textarea",r)}};e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){var e=this;return{temp_value:function(){return e.value}(),s_autofocus:function(){if(e.autofocus)return"autofocus"}()}},created:function(){},props:{autofocus:{type:Boolean,default:!1},value:{type:String,default:""},placeholder:{type:String,default:""},border:{type:Boolean,default:!1},resize:{type:Boolean,default:!1},onchange:{type:Function,default:null},fontSize:{type:String,default:"14px"},lineHeight:{type:String,default:"18px"}},methods:{change:function(e){this.onchange&&this.onchange(this.temp_value,e)}},watch:{value:function(e,t){this.temp_value=e},temp_value:function(e,t){this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(102),i=n(101);t.default={name:"s-md-toolbar-left",mounted:function(){this.trigger=this.$refs.img},components:{"mu-popover":r.a,"mu-list":i.a,"mu-list-item":i.b},props:{editable:{type:Boolean,default:!0},toolbars:{type:Object,required:!0},d_words:{type:Object,required:!0}},data:function(){return{img_file:[["./0",null]],open:!1,trigger:null,num:0}},methods:{$imgFileListClick:function(e){0==e?this.$refs.imgfile[e].click():this.$emit("imgTouch",this.img_file[e][0]),this.open=!1},$imgFileAdd:function(e){this.img_file[0][0]="./"+this.num,this.img_file[0][1]=e,this.img_file.unshift(["./"+(this.num+1),null]),this.num=this.num+1,this.$emit("imgAdd",this.img_file[1][0],e)},$imgAdd:function(e){this.$imgFileAdd(e.target.files[0])},$imgDel:function(e){this.$emit("imgDel",this.img_file[e][0]),this.img_file.splice(e,1)},$imgDelByFilename:function(e){for(var t=0;this.img_file.length>t;){if(this.img_file[t][0]==e)return this.$emit("imgDel",e),this.img_file.splice(t,1),!0;t+=1}return!1},$imgAddByFilename:function(e,t){for(var n=0;n<this.img_file.length;n++)if(this.img_file[n][0]==e)return!1;return this.img_file[0][0]=e,this.img_file[0][1]=t,this.img_file.unshift(["./"+this.num,null]),this.$emit("imgAdd",this.img_file[1][0],t,!1),!0},$imgUpdateByFilename:function(e,t){for(var n=0;n<this.img_file.length;n++)if(this.img_file[n][0]==e)return this.img_file[n][1]=t,this.$emit("imgAdd",e,t,!1),!0;return!1},$clicks:function(e){"imagelink"==e?this.open=!0:this.$emit("toolbar_left_click",e)},handleClose:function(e){this.open=!1}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"s-md-toolbar-right",props:{s_subfield:{type:Boolean,required:!0},toolbars:{type:Object,required:!0},s_preview_switch:{type:Boolean,required:!0},s_fullScreen:{type:Boolean,required:!0},s_html_code:{type:Boolean,required:!0},s_navigation:{type:Boolean,required:!0},d_words:{type:Object,required:!0}},methods:{$clicks:function(e){this.$emit("toolbar_right_click",e)}}}},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__=__webpack_require__(89),__WEBPACK_IMPORTED_MODULE_1_auto_textarea__=__webpack_require__(68),__WEBPACK_IMPORTED_MODULE_1_auto_textarea___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_auto_textarea__),__WEBPACK_IMPORTED_MODULE_2__lib_core_keydown_listen_js__=__webpack_require__(88),__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__=__webpack_require__(86),__WEBPACK_IMPORTED_MODULE_4__lib_util_js__=__webpack_require__(92),__WEBPACK_IMPORTED_MODULE_5__lib_toolbar_left_click_js__=__webpack_require__(90),__WEBPACK_IMPORTED_MODULE_6__lib_toolbar_right_click_js__=__webpack_require__(91),__WEBPACK_IMPORTED_MODULE_7__lib_config_js__=__webpack_require__(85),__WEBPACK_IMPORTED_MODULE_8__lib_core_highlight_js__=__webpack_require__(87),__WEBPACK_IMPORTED_MODULE_9__lib_font_css_fontello_css__=__webpack_require__(163),__WEBPACK_IMPORTED_MODULE_9__lib_font_css_fontello_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__lib_font_css_fontello_css__),__WEBPACK_IMPORTED_MODULE_10__lib_css_md_css__=__webpack_require__(162),__WEBPACK_IMPORTED_MODULE_10__lib_css_md_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__lib_css_md_css__),__WEBPACK_IMPORTED_MODULE_11_katex_dist_katex_min_css__=__webpack_require__(161),__WEBPACK_IMPORTED_MODULE_11_katex_dist_katex_min_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_katex_dist_katex_min_css__),s_md_toolbar_left=__webpack_require__(256),s_md_toolbar_right=__webpack_require__(257);__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a.renderAsync=function(e,t,n,r){t=t||{},r=r||{};var i=__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a.renderer.render(this.parse(e,t),this.options,t);!1===r.ishljs?n(i):__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_core_highlight_js__.a)(i,n)},__webpack_exports__.default={props:{scrollStyle:{type:Boolean,default:!0},help:{type:String,default:null},value:{type:String,default:""},language:{type:String,default:"cn"},subfield:{type:Boolean,default:!0},default_open:{type:String,default:null},editable:{type:Boolean,default:!0},toolbarsFlag:{type:Boolean,default:!0},toolbars:{type:Object,default:function(){return __WEBPACK_IMPORTED_MODULE_7__lib_config_js__.a.toolbars}},code_style:{type:String,default:"code-github"},placeholder:{type:String,default:null},ishljs:{type:Boolean,default:!1}},data:function(){var e=this;return{s_subfield:function(){return e.subfield}(),s_autofocus:!0,s_navigation:!1,s_scrollStyle:function(){return e.scrollStyle}(),d_value:"",d_render:"",s_preview_switch:function(){var t=e.default_open;return e.subfield&&!t&&(t="preview"),"preview"===t}(),s_fullScreen:!1,s_help:!1,s_html_code:!1,d_help:null,d_words:null,edit_scroll_height:-1,s_readmodel:!1,s_table_enter:!1,d_history:function(){var t=[];return t.push(e.value),t}(),d_history_index:0,currentTimeout:"",s_markdown:__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a,d_image_file:[]}},created:function(){var e=this;this.initLanguage(),this.$nextTick(function(){e.loadDivData(),e.editableTextarea()})},mounted:function(){var e=this;this.$el.addEventListener("paste",function(t){e.$paste(t)}),this.$el.addEventListener("drop",function(t){e.$drag(t)}),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.a)(this),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_core_keydown_listen_js__.a)(this,__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.b)(this),this.d_value=this.value,document.body.appendChild(this.$refs.help)},beforeDestroy:function(){document.body.removeChild(this.$refs.help)},methods:{textAreaFocus:function(){this.$refs.vNoteTextarea.$el.children[1].focus()},$drag:function(e){var t=e.dataTransfer;if(t){var n=t.files;if(n.length>0){e.preventDefault();for(var r=0;r<n.length;r++)this.$refs.toolbar_left.$imgFileAdd(n[r])}}},$paste:function(e){var t=e.clipboardData;if(t){var n=t.items;if(!n)return;for(var r=t.types||[],i=null,o=0;o<r.length;o++)if("Files"===r[o]){i=n[o];break}if(i&&"file"===i.kind&&i.type.match(/^image\//i)){var a=i.getAsFile();this.$refs.toolbar_left.$imgFileAdd(a)}}},$imgTouch:function(e){var t=this;this.insertText(this.getTextareaDom(),{prefix:"\n!["+t.d_words.tl_image+"]("+e+")",subfix:"",str:""})},$imgDel:function(e){this.s_markdown.image_del(e),this.d_render=this.s_markdown.render(this.d_value),this.$emit("imgDel",e)},$imgAdd:function(e,t,n){void 0===n&&(n=!0);var r=this;if(null==this.__rFilter&&(this.__rFilter=/^image\//i),this.__oFReader=new FileReader,this.__oFReader.onload=function(i){r.s_markdown.image_add(e,i.target.result),1==n&&(r.insertText(r.getTextareaDom(),{prefix:"\n!["+r.d_words.tl_image+"]("+e+")",subfix:"",str:""}),r.$nextTick(function(){r.$emit("imgAdd",e,t)}))},t){var i=t;this.__rFilter.test(i.type)&&this.__oFReader.readAsDataURL(i)}},$imgUpdateByUrl:function(e,t){var n=this;this.s_markdown.image_add(e,t),this.$nextTick(function(){n.d_render=this.s_markdown.render(this.d_value)})},$imgAddByUrl:function(e,t){this.$imgUpdateByUrl(e,t)},$img2Url:function $img2Url(filename,url){filename=filename.replace(/(\.|\\|\+|\*|\?|\^|\$|\[|\]|\{|\}|\(|\)|\||\/)/g,"\\$1");var reg_str="/(!\\[[^\\[]*?\\](?=\\())\\(\\s*("+filename+")\\s*\\)/g",reg=eval(reg_str);this.d_value=this.d_value.replace(reg,"$1("+url+")")},$imglst2Url:function(e){if(e instanceof Array)for(var t=0;t<e.length;t++)this.$img2Url(e[t][0],e[t][1])},toolbar_left_click:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_toolbar_left_click_js__.a)(e,this)},toolbar_right_click:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_toolbar_right_click_js__.a)(e,this)},getNavigation:function(e,t){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.c)(e,t)},change:function(e,t){this.$emit("change",e,t)},fullscreen:function(e,t){this.$emit("fullscreen",e,t)},readmodel:function(e,t){this.$emit("readmodel",e,t)},previewtoggle:function(e,t){this.$emit("previewtoggle",e,t)},subfieldtoggle:function(e,t){this.$emit("subfieldtoggle",e,t)},htmlcode:function(e,t){this.$emit("htmlcode",e,t)},helptoggle:function(e,t){this.$emit("helptoggle",e,t)},save:function(e,t){this.$emit("save",e,t)},navigationtoggle:function(e,t){this.$emit("navigationtoggle",e,t)},$toolbar_right_read_change_status:function(){this.s_readmodel=!this.s_readmodel,this.readmodel&&this.readmodel(this.s_readmodel,this.d_value),this.s_readmodel&&this.toolbars.navigation&&this.getNavigation(this,!0)},$v_edit_scroll:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.d)(e,this)},getTextareaDom:function(){return this.$refs.vNoteTextarea.$el.children[1]},insertText:function(e,t){var n=t.prefix,r=t.subfix,i=t.str;__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.e)(e,{prefix:n,subfix:r,str:i},this)},saveHistory:function(){this.d_history.splice(this.d_history_index+1,this.d_history.length),this.d_history.push(this.d_value),this.d_history_index=this.d_history.length-1},initLanguage:function(){var e=__WEBPACK_IMPORTED_MODULE_7__lib_config_js__.a.langList.indexOf(this.language)>=0?this.language:this.language.default,t=this;__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a.renderAsync(__WEBPACK_IMPORTED_MODULE_7__lib_config_js__.a["help_"+e],{},function(e){t.d_help=e},{ishljs:t.ishljs}),this.d_words=__WEBPACK_IMPORTED_MODULE_7__lib_config_js__.a["words_"+e]},editableTextarea:function(){var e=this.$refs.vNoteTextarea.$el.children[1];this.editable?e.removeAttribute("disabled"):e.setAttribute("disabled","disabled")},loadDivData:function(){}},watch:{d_value:function(e,t){var n=this;__WEBPACK_IMPORTED_MODULE_0__lib_core_markdown_js__.a.renderAsync(n.d_value,{},function(t){n.d_render=t,n.change&&n.change(n.d_value,n.d_render),n.s_navigation&&__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_core_extra_function_js__.c)(n,!1),n.$emit("input",e),n.d_value!==n.d_history[n.d_history_index]&&(window.clearTimeout(n.currentTimeout),n.currentTimeout=setTimeout(function(){n.saveHistory()},500))},{ishljs:n.ishljs})},value:function(e,t){e!==this.d_value&&(this.d_value=e,this.loadDivData())},subfield:function(e,t){this.s_subfield=e},d_history_index:function(){this.d_history_index>20&&(this.d_history.shift(),this.d_history_index=this.d_history_index-1),this.d_value=this.d_history[this.d_history_index]},language:function(e){this.initLanguage()},editable:function(){this.editableTextarea()},default_open:function(e){var t=e;return this.subfield&&!t&&(t="preview"),"preview"===t}},components:{"v-autoTextarea":__WEBPACK_IMPORTED_MODULE_1_auto_textarea__.autoTextarea,"s-md-toolbar-left":s_md_toolbar_left,"s-md-toolbar-right":s_md_toolbar_right}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(44),i=n(27),o=n(95),a=n(103);t.default={name:"mu-icon-button",mixins:[i.a],props:{icon:{type:String},iconClass:{type:[String,Array,Object],default:""},type:{type:String},href:{type:String,default:""},target:{type:String},disabled:{type:Boolean,default:!1},keyboardFocused:{type:Boolean,default:!1},tooltip:{type:String},tooltipPosition:{type:String,default:"bottom-center"},touch:{type:Boolean,default:!1}},computed:{verticalPosition:function(){return this.tooltipPosition.split("-")[0]},horizontalPosition:function(){return this.tooltipPosition.split("-")[1]}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},methods:{handleClick:function(e){this.$emit("click",e)},handleHover:function(e){this.tooltipShown=!0,this.$emit("hover",e)},handleHoverExit:function(e){this.tooltipShown=!1,this.$emit("hoverExit",e),this.$emit("hover-exit",e)},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)}},mounted:function(){this.tooltipTrigger=this.$el},components:{"abstract-button":r.a,icon:o.a,tooltip:a.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(16);t.default={name:"mu-icon",props:{value:{type:String},size:{type:Number},color:{type:String,default:""}},computed:{iconStyle:function(){return{"font-size":this.size+"px",width:this.size+"px",height:this.size+"px",color:n.i(r.b)(this.color)}}},methods:{handleClick:function(e){this.$emit("click",e)}},render:function(e){var t=this.value,n=this.iconStyle,r=this.handleClick;if(!t)return null;var i=0!==t.indexOf(":"),o=i?t:"";return e("i",{class:["mu-icon",i?"material-icons":t.substring(1)],style:n,on:{click:r}},o)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(16);t.default={props:{mergeStyle:{type:Object,default:function(){return{}}},color:{type:String,default:""},opacity:{type:Number}},computed:{styles:function(){return n.i(r.d)({},{color:this.color,opacity:this.opacity},this.mergeStyle)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{beforeEnter:function(e){e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.height="0"},enter:function(e){e.dataset.oldOverflow=e.style.overflow,e.style.display="block",0!==e.scrollHeight?(e.style.height=e.scrollHeight+"px",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom):(e.style.height="",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom),e.style.overflow="hidden"},afterEnter:function(e){e.style.display="",e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom},beforeLeave:function(e){e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.display="block",0!==e.scrollHeight&&(e.style.height=e.scrollHeight+"px"),e.style.overflow="hidden"},leave:function(e){0!==e.scrollHeight&&setTimeout(function(){e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0})},afterLeave:function(e){e.style.display="none",e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{color:{type:String,default:""},opacity:{type:Number}},computed:{style:function(){return{color:this.color,opacity:this.opacity}}},methods:{setRippleSize:function(){var e=this.$refs.innerCircle,t=e.offsetHeight,n=e.offsetWidth,r=Math.max(t,n),i=0;-1!==e.style.top.indexOf("px",e.style.top.length-2)&&(i=parseInt(e.style.top)),e.style.height=r+"px",e.style.top=t/2-r/2+i+"px"}},mounted:function(){this.setRippleSize()},updated:function(){this.setRippleSize()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"mu-overlay",props:{show:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},onClick:{type:Function},opacity:{type:Number,default:.4},color:{type:String,default:"#000"},zIndex:{type:Number}},computed:{overlayStyle:function(){return{opacity:this.opacity,"background-color":this.color,position:this.fixed?"fixed":"","z-index":this.zIndex}}},methods:{prevent:function(e){e.preventDefault(),e.stopPropagation()},handleClick:function(){this.onClick&&this.onClick()}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(260),i=n.n(r),o=n(105);t.default={props:{centerRipple:{type:Boolean,default:!0},rippleWrapperClass:{},color:{type:String,default:""},opacity:{type:Number}},data:function(){return{nextKey:0,ripples:[]}},mounted:function(){this.ignoreNextMouseDown=!1},methods:{start:function(e,t){if(this.ignoreNextMouseDown&&!t)return void(this.ignoreNextMouseDown=!1);this.ripples.push({key:this.nextKey++,color:this.color,opacity:this.opacity,style:this.centerRipple?{}:this.getRippleStyle(e)}),this.ignoreNextMouseDown=t},end:function(){0!==this.ripples.length&&(this.ripples.splice(0,1),this.stopListeningForScrollAbort())},stopListeningForScrollAbort:function(){this.handleMove||(this.handleMove=this.handleTouchMove.bind(this)),document.body.removeEventListener("touchmove",this.handleMove,!1)},startListeningForScrollAbort:function(e){this.firstTouchY=e.touches[0].clientY,this.firstTouchX=e.touches[0].clientX,document.body.addEventListener("touchmove",this.handleMove,!1)},handleMouseDown:function(e){0===e.button&&this.start(e,!1)},handleTouchStart:function(e){e.touches&&(this.startListeningForScrollAbort(e),this.startTime=Date.now()),this.start(e.touches[0],!0)},handleTouchMove:function(e){var t=Math.abs(e.touches[0].clientY-this.firstTouchY),n=Math.abs(e.touches[0].clientX-this.firstTouchX);(t>6||n>6)&&this.end()},getRippleStyle:function(e){var t=this.$refs.holder,n=t.offsetHeight,r=t.offsetWidth,i=o.a(t),a=e.touches&&e.touches.length,s=a?e.touches[0].pageX:e.pageX,l=a?e.touches[0].pageY:e.pageY,c=s-i.left,u=l-i.top,h=this.calcDiag(c,u),p=this.calcDiag(r-c,u),d=this.calcDiag(r-c,n-u),f=this.calcDiag(c,n-u),g=Math.max(h,p,d,f),m=2*g;return{directionInvariant:!0,height:m+"px",width:m+"px",top:u-g+"px",left:c-g+"px"}},calcDiag:function(e,t){return Math.sqrt(e*e+t*t)}},components:{"circle-ripple":i.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"mu-list",props:{nestedLevel:{type:Number,default:0},value:{}},methods:{handleChange:function(e){this.$emit("change",e)},handleItemClick:function(e){this.$emit("itemClick",e),this.$emit("item-click",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(44),i=n(27),o=n(94),a=n(66),s=n.n(a),l=n(261),c=n.n(l),u=n(16);t.default={name:"mu-list-item",mixins:[i.a],props:{href:{type:String},target:{type:String},title:{type:String,default:""},titleClass:{type:[String,Object,Array]},afterText:{type:String,default:""},afterTextClass:{type:[String,Object,Array]},describeText:{type:String,default:""},describeTextClass:{type:[String,Object,Array]},describeLine:{type:Number,default:2},inset:{type:Boolean,default:!1},nestedListClass:{type:[String,Object,Array]},open:{type:Boolean,default:!0},toggleNested:{type:Boolean,default:!1},toggleIconClass:{type:[String,Object,Array]},disabled:{type:Boolean,default:!1},disableRipple:{type:Boolean,default:!1},value:{}},data:function(){return{nestedOpen:this.open}},computed:{hasAvatar:function(){return this.$slots&&(this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},nestedLevel:function(){return this.$parent.nestedLevel+1},showLeft:function(){return this.$slots&&(this.$slots.left&&this.$slots.left.length>0||this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0)},showRight:function(){return this.toggleNested||this.$slots&&(this.$slots.right&&this.$slots.right.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},showTitleRow:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0||this.afterText||this.$slots&&this.$slots.after&&this.$slots.after.length>0},showDescribe:function(){return this.describeText||this.$slots&&this.$slots.describe&&this.$slots.describe.length>0},itemClass:function(){var e=["mu-item"];return(this.showLeft||this.inset)&&e.push("show-left"),this.showRight&&e.push("show-right"),this.hasAvatar&&e.push("has-avatar"),this.selected&&e.push("selected"),e.join(" ")},itemStyle:function(){return{"margin-left":18*(this.nestedLevel-1)+"px"}},textStyle:function(){return{"max-height":18*this.describeLine+"px","-webkit-line-clamp":this.describeLine}},showNested:function(){return this.nestedOpen&&this.$slots&&this.$slots.nested&&this.$slots.nested.length>0},selected:function(){return n.i(u.a)(this.$parent.value)&&n.i(u.a)(this.value)&&this.$parent.value===this.value},nestedSelectValue:function(){return this.$parent.value}},methods:{handleToggleNested:function(){this.nestedOpen=!this.nestedOpen,this.$emit("toggleNested",this.nestedOpen),this.$emit("toggle-nested",this.nestedOpen)},handleClick:function(e){this.$emit("click",e),this.$parent.handleItemClick&&this.$parent.handleItemClick(this),n.i(u.a)(this.value)&&this.$parent.handleChange(this.value),this.toggleNested&&this.handleToggleNested()},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)},handleNestedChange:function(e){this.$parent.handleChange(e)},stop:function(e){e.stopPropagation()}},watch:{open:function(e,t){e!==t&&(this.nestedOpen=e)}},components:{"abstract-button":r.a,"mu-list":s.a,"icon-button":o.a,"expand-transition":c.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(110),i=n.n(r),o=n(100),a=n(96),s=n(99);t.default={name:"mu-popover",mixins:[o.a,s.a,a.a],props:{overlay:{default:!1},overlayOpacity:{default:.01},trigger:{},autoPosition:{type:Boolean,default:!0},anchorOrigin:{type:Object,default:function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,default:function(){return{vertical:"top",horizontal:"left"}}},popoverClass:{type:[String,Object,Array]}},methods:{getAnchorPosition:function(e){var t=e.getBoundingClientRect(),n={top:t.top,left:t.left,width:e.width,height:e.height};return n.right=t.right||n.left+n.width,n.bottom=t.bottom||n.top+n.height,n.middle=n.left+(n.right-n.left)/2,n.center=n.top+(n.bottom-n.top)/2,n},getTargetPosition:function(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}},getElInfo:function(e){var t=e.getBoundingClientRect();return{left:t.left,top:t.top,width:e.offsetWidth,height:e.offsetHeight}},setStyle:function(){if(this.open){var e=this.targetOrigin,t=this.anchorOrigin,n=this.$refs.popup,r=this.getAnchorPosition(this.trigger),i=this.getTargetPosition(n),o={top:r[t.vertical]-i[e.vertical],left:r[t.horizontal]-i[e.horizontal]};if(r.top<0||r.top>window.innerHeight||r.left<0||r.left>window.innerWidth)return void this.close("overflow");this.autoPosition&&(i=this.getTargetPosition(n),o=this.applyAutoPositionIfNeeded(r,i,e,t,o)),n.style.left=Math.max(0,o.left)+"px",n.style.top=Math.max(0,o.top)+"px"}},getOverlapMode:function(e,t,n){return[e,t].indexOf(n)>=0?"auto":e===t?"inclusive":"exclusive"},getPositions:function(e,t){var n=i()({},e),r=i()({},t),o={x:["left","right"].filter(function(e){return e!==r.horizontal}),y:["top","bottom"].filter(function(e){return e!==r.vertical})},a={x:this.getOverlapMode(n.horizontal,r.horizontal,"middle"),y:this.getOverlapMode(n.vertical,r.vertical,"center")};return o.x.splice("auto"===a.x?0:1,0,"middle"),o.y.splice("auto"===a.y?0:1,0,"center"),"auto"!==a.y&&(n.vertical="top"===n.vertical?"bottom":"top","inclusive"===a.y&&(r.vertical=r.vertical)),"auto"!==a.x&&(n.horizontal="left"===n.horizontal?"right":"left","inclusive"===a.y&&(r.horizontal=r.horizontal)),{positions:o,anchorPos:n}},applyAutoPositionIfNeeded:function(e,t,n,r,i){var o=this.getPositions(r,n),a=o.positions,s=o.anchorPos;if(i.top<0||i.top+t.bottom>window.innerHeight){var l=e[s.vertical]-t[a.y[0]];l+t.bottom<=window.innerHeight?i.top=Math.max(0,l):(l=e[s.vertical]-t[a.y[1]])+t.bottom<=window.innerHeight&&(i.top=Math.max(0,l))}if(i.left<0||i.left+t.right>window.innerWidth){var c=e[s.horizontal]-t[a.x[0]];c+t.right<=window.innerWidth?i.left=Math.max(0,c):(c=e[s.horizontal]-t[a.x[1]])+t.right<=window.innerWidth&&(i.left=Math.max(0,c))}return i},close:function(e){this.$emit("close",e)},clickOutSide:function(e){this.close("clickOutSide")},onScroll:function(){this.setStyle()},onResize:function(){this.setStyle()},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},mounted:function(){this.setStyle()},updated:function(){var e=this;setTimeout(function(){e.setStyle()},0)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"mu-tooltip",props:{label:{type:String},trigger:{},verticalPosition:{type:String,default:"bottom"},horizontalPosition:{type:String,default:"center"},show:{type:Boolean,default:!1},touch:{type:Boolean,default:!1}},data:function(){return{offsetWidth:0,triggerWidth:0,triggerHeight:0}},computed:{tooltipStyle:function(){var e=this.horizontalPosition,t=this.verticalPosition,n=this.offsetWidth,r=this.touch,i=this.triggerWidth,o=this.triggerHeight,a=this.show,s=r?10:0,l=r?-20:-10,c="bottom"===t?14+s:-14-s;return{right:"left"===e?"0":null,left:"center"===e?(n-i)/2*-1+"px":"right"===e?"0":"",top:a?"top"===t?l+"px":o-c+s+2+"px":"-3000px",transform:"translate(0px, "+c+"px)"}},rippleStyle:function(){var e=this.horizontalPosition,t=this.verticalPosition;return{left:"center"===e?"50%":"left"===e?"100%":"0%",top:"bottom"===t?"0":"100%"}}},methods:{setRippleSize:function(){var e=this.$refs.ripple,t=this.$el;if(t&&e){var n=parseInt(t.offsetWidth,10)/("center"===this.horizontalPosition?2:1),r=parseInt(t.offsetHeight,10),i=Math.ceil(2*Math.sqrt(Math.pow(r,2)+Math.pow(n,2)));this.show?(e.style.height=i+"px",e.style.width=i+"px"):(e.style.width="0px",e.style.height="0px")}},setTooltipSize:function(){this.offsetWidth=this.$el.offsetWidth,this.trigger&&(this.triggerWidth=this.trigger.offsetWidth,this.triggerHeight=this.trigger.offsetHeight)}},mounted:function(){this.setRippleSize(),this.setTooltipSize()},beforeUpdate:function(){this.setTooltipSize()},updated:function(){this.setRippleSize()}}},function(e,t,n){"use strict";var r=n(67),i={mavonEditor:r,install:function(e){e.component("mavon-editor",r)}};e.exports=i},function(e,t,n){"use strict";n.d(t,"a",function(){return g});var r=n(250),i=n.n(r),o=n(251),a=n.n(o),s=n(252),l=n.n(s),c=n(300),u=n.n(c),h=n(301),p=n.n(h),d=n(302),f=n.n(d),g={help_cn:i.a,help_en:a.a,help_fr:l.a,words_cn:u.a,words_en:p.a,words_fr:f.a,langList:["en","cn","fr"],toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,undo:!0,redo:!0,trash:!0,save:!0,alignleft:!0,aligncenter:!0,alignright:!0,navigation:!0,subfield:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,preview:!0}}},function(e,t,n){"use strict";n.d(t,"e",function(){return r}),n.d(t,"c",function(){return i}),n.d(t,"d",function(){return o}),n.d(t,"b",function(){return a}),n.d(t,"a",function(){return s});var r=function(e,t,n){var r=t.prefix,i=t.subfix,o=t.str;if(e.focus(),document.selection)alert("document.selection");else if("number"==typeof e.selectionStart&&"number"==typeof e.selectionEnd){var a=e.selectionStart,s=e.selectionEnd,l=e.value;a===s?(e.value=l.substring(0,a)+r+o+i+l.substring(s,l.length),e.selectionStart=a+r.length,e.selectionEnd=a+(o.length+r.length)):l.substring(a-r.length,a)===r&&l.substring(s,s+i.length)===i?(e.value=l.substring(0,a-r.length)+l.substring(a,s)+l.substring(s+i.length,l.length),e.selectionStart=a-r.length,e.selectionEnd=s-r.length):(e.value=l.substring(0,a)+r+l.substring(a,s)+i+l.substring(s,l.length),e.selectionStart=a+r.length,e.selectionEnd=a+(s-a+r.length))}else alert("else");n.d_value=e.value,e.focus()},i=function(e,t){var n=void 0;n=e.$refs.navigationContent,n.innerHTML=e.d_render;var r=n.children;if(r.length)for(var i=0;i<r.length;i++)!function(t,n,r){/^H[1-6]{1}$/.exec(t.tagName)?(parseInt(t.tagName.substring(1,2)),t.onclick=function(){var t=e.$refs.vShowContent,r=e.$refs.vNoteEdit;r.scrollTop=t.children[n].offsetTop*(r.scrollHeight-r.offsetHeight)/(t.scrollHeight-t.offsetHeight)}):t.style.display="none"}(r[i],i)},o=function(e,t){var n=e.srcElement?e.srcElement:e.target,r=n.scrollTop/(n.scrollHeight-n.offsetHeight);t.edit_scroll_height>=0&&n.scrollHeight!==t.edit_scroll_height&&n.scrollHeight-n.offsetHeight-n.scrollTop<=30&&(t.$refs.vNoteEdit.scrollTop=n.scrollHeight-n.offsetHeight,r=1),t.edit_scroll_height=n.scrollHeight,t.$refs.vShowContent.scrollHeight>t.$refs.vShowContent.offsetHeight&&(t.$refs.vShowContent.scrollTop=(t.$refs.vShowContent.scrollHeight-t.$refs.vShowContent.offsetHeight)*r)},a=function(e){e.$el.addEventListener("fullscreenchange",function(t){e.$toolbar_right_read_change_status()},!1),e.$el.addEventListener("mozfullscreenchange",function(t){e.$toolbar_right_read_change_status()},!1),e.$el.addEventListener("webkitfullscreenchange",function(t){e.$toolbar_right_read_change_status()},!1),e.$el.addEventListener("msfullscreenchange",function(t){e.$toolbar_right_read_change_status()},!1)},s=function(e){!function(){e.$el.clientWidth>768?e.s_subfield=e.subfield:e.s_subfield=!1}(),window.addEventListener("resize",function(){e.$el.clientWidth>768?e.s_subfield=e.subfield:e.s_subfield=!1})}},function(e,t,n){"use strict";function r(e,t){var n=document.createElement("div");n.innerHTML=e;var r=n.querySelectorAll("pre.hljs > code");if(r){for(var o=0,a=0,s=0,l=0;l<r.length;l++)r[l].className.length>0&&(a+=1,i.a.hljsBlock(r[l],r[l].className,function(){(s+=1)==a&&t(n.innerHTML)})||(o+=1));0!=a&&o!=a||t(n.innerHTML)}else t(n.innerHTML)}var i=n(165);t.a=r},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e,t){e.$el.addEventListener("keydown",function(t){if(t.ctrlKey||t.altKey||t.shiftKey)if(!t.ctrlKey||t.altKey||t.shiftKey){if(t.ctrlKey&&t.altKey&&!t.shiftKey)switch(t.keyCode){case 83:t.preventDefault(),e.toolbar_left_click("superscript");break;case 85:t.preventDefault(),e.toolbar_left_click("ul");break;case 76:t.preventDefault(),e.toolbar_left_click("imagelink");break;case 67:t.preventDefault(),e.toolbar_left_click("code");break;case 84:t.preventDefault(),e.toolbar_left_click("table")}else if(t.ctrlKey&&t.shiftKey&&!t.altKey)switch(t.keyCode){case 83:t.preventDefault(),e.toolbar_left_click("subscript")}}else switch(t.keyCode){case 66:t.preventDefault(),e.toolbar_left_click("bold");break;case 73:t.preventDefault(),e.toolbar_left_click("italic");break;case 72:t.preventDefault(),e.toolbar_left_click("header");break;case 85:t.preventDefault(),e.toolbar_left_click("underline");break;case 68:t.preventDefault(),e.toolbar_left_click("strikethrough");break;case 77:t.preventDefault(),e.toolbar_left_click("mark");break;case 81:t.preventDefault(),e.toolbar_left_click("quote");break;case 79:t.preventDefault(),e.toolbar_left_click("ol");break;case 76:t.preventDefault(),e.toolbar_left_click("link");break;case 83:t.preventDefault(),e.toolbar_left_click("save");break;case 90:t.preventDefault(),e.toolbar_left_click("undo");break;case 89:t.preventDefault(),e.toolbar_left_click("redo");break;case 8:t.preventDefault(),e.toolbar_left_click("trash")}else switch(t.keyCode){case 119:t.preventDefault(),e.toolbar_right_click("navigation");break;case 120:t.preventDefault(),e.toolbar_right_click("preview");break;case 121:t.preventDefault(),e.toolbar_right_click("fullscreen");break;case 122:t.preventDefault(),e.toolbar_right_click("read");break;case 123:t.preventDefault(),e.toolbar_right_click("subfield")}})}},function(e,t,n){"use strict";var r={html:!0,xhtmlOut:!0,breaks:!0,langPrefix:"language-markdown",linkify:!1,typographer:!0,quotes:"“”‘’",highlight:function(e,t){return'<pre class="hljs"><code class="'+t+'">'+i.utils.escapeHtml(e)+"</code></pre>"}},i=n(199)(r),o=n(186),a=n(197),s=n(198),l=n(185),c=n(183),u=n(192),h=n(194),p=n(196),d=n(184),f=n(195),g=n(193);i.use(o).use(s).use(a).use(d).use(d,"hljs-left").use(d,"hljs-center").use(d,"hljs-right").use(l).use(c).use(u).use(h).use(p).use(d).use(g).use(f),t.a=i},function(e,t,n){"use strict";function r(e){if(e.d_history_index>0&&e.d_history_index--,e.s_preview_switch){var t=e.getTextareaDom().selectionStart,n=e.d_value.length;e.$nextTick(function(){t-=n-e.d_value.length,e.getTextareaDom().selectionStart=t,e.getTextareaDom().selectionEnd=t})}}function i(e){e.d_history_index<e.d_history.length-1&&e.d_history_index++}function o(e){e.d_value=""}function a(e){e.save(e.d_value,e.d_render)}n.d(t,"a",function(){return s});var s=function(e,t){var n={bold:{prefix:"**",subfix:"**",str:t.d_words.tl_bold},italic:{prefix:"*",subfix:"*",str:t.d_words.tl_italic},header:{prefix:"# ",subfix:" #",str:t.d_words.tl_header},underline:{prefix:"++",subfix:"++",str:t.d_words.tl_underline},strikethrough:{prefix:"~~",subfix:"~~",str:t.d_words.tl_strikethrough},mark:{prefix:"==",subfix:"==",str:t.d_words.tl_mark},superscript:{prefix:"^",subfix:"^",str:t.d_words.tl_superscript},subscript:{prefix:"~",subfix:"~",str:t.d_words.tl_subscript},quote:{prefix:"> ",subfix:"",str:t.d_words.tl_quote},ol:{prefix:"1. ",subfix:"",str:t.d_words.tl_ol},ul:{prefix:"- ",subfix:"",str:t.d_words.tl_ul},link:{prefix:"[](",subfix:")",str:t.d_words.tl_link},imagelink:{prefix:"![](",subfix:")",str:t.d_words.tl_image},code:{prefix:"```",subfix:"\n\n```\n",str:"language"},table:{prefix:"",subfix:"",str:"|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n"},aligncenter:{prefix:"::: hljs-center\n\n",subfix:"\n\n:::\n",str:t.d_words.tl_aligncenter},alignright:{prefix:"::: hljs-right\n\n",subfix:"\n\n:::\n",str:t.d_words.tl_alignright},alignleft:{prefix:"::: hljs-left\n\n",subfix:"\n\n:::\n",str:t.d_words.tl_alignleft}};n.hasOwnProperty(e)&&t.insertText(t.getTextareaDom(),n[e]);var s={undo:r,redo:i,trash:o,save:a};s.hasOwnProperty(e)&&s[e](t)}},function(e,t,n){"use strict";function r(e){e.s_html_code=!e.s_html_code,e.htmlcode&&e.htmlcode(e.s_html_code,e.d_value)}function i(e){e.s_help=!e.s_help,e.helptoggle&&e.helptoggle(e.s_help,e.d_value)}function o(e){var t=e.$refs.vReadModel;t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen()}function a(e){e.s_preview_switch=!e.s_preview_switch,e.previewtoggle&&e.previewtoggle(e.s_preview_switch,e.d_value)}function s(e){e.s_fullScreen=!e.s_fullScreen,e.fullscreen&&e.fullscreen(e.s_fullScreen,e.d_value)}function l(e){e.s_subfield=!e.s_subfield,e.s_subfield&&(e.s_preview_switch=!0,e.previewtoggle&&e.previewtoggle(e.s_preview_switch,e.d_value)),e.subfieldtoggle&&e.subfieldtoggle(e.s_subfield,e.d_value)}function c(e){e.s_navigation=!e.s_navigation,e.s_navigation&&(e.s_preview_switch=!0),e.navigationtoggle&&e.navigationtoggle(e.s_navigation,e.d_value),e.s_navigation&&e.getNavigation(e,!1)}n.d(t,"a",function(){return u});var u=function(e,t){var n={help:i,html:r,read:o,preview:a,fullscreen:s,navigation:c,subfield:l};n.hasOwnProperty(e)&&n[e](t)}},function(e,t,n){"use strict";var r=n(111);n.n(r)},function(e,t,n){"use strict";function r(e){e&&n.i(i.d)(r,e)}var i=n(16);n.i(i.d)(r,{disableTouchRipple:!1,disableFocusRipple:!1}),t.a=r},function(e,t,n){"use strict";var r=n(258),i=n.n(r);n.d(t,"a",function(){return i.a})},function(e,t,n){"use strict";var r=n(259),i=n.n(r);n.d(t,"a",function(){return i.a})},function(e,t,n){"use strict";var r=n(97),i=n(98);t.a={props:{open:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0},overlayOpacity:{type:Number,default:.4},overlayColor:{type:String,default:"#000"},escPressClose:{type:Boolean,default:!0},appendBody:{type:Boolean,default:!0}},data:function(){return{overlayZIndex:n.i(i.a)(),zIndex:n.i(i.a)()}},methods:{overlayClick:function(e){this.overlay&&this.$emit("close","overlay")},escPress:function(e){this.escPressClose&&this.$emit("close","esc")},clickOutSide:function(e){this.$emit("clickOutSide",e)},setZIndex:function(){var e=this.$el;this.zIndex||(this.zIndex=n.i(i.a)()),e&&(e.style.zIndex=this.zIndex)},bindClickOutSide:function(){var e=this;this._handleClickOutSide||(this._handleClickOutSide=function(t){var n=e.popupEl();n&&n.contains(t.target)||e.clickOutSide(t)}),setTimeout(function(){window.addEventListener("click",e._handleClickOutSide)},0)},unBindClickOutSide:function(){window.removeEventListener("click",this._handleClickOutSide)},resetZIndex:function(){this.overlayZIndex=n.i(i.a)(),this.zIndex=n.i(i.a)()},popupEl:function(){return this.appendBody?this.$refs.popup:this.$el},appendPopupElToBody:function(){var e=this;this.appendBody&&this.$nextTick(function(){var t=e.popupEl();if(!t)return void console.warn("必须有一个 ref=‘popup’ 的元素");document.body.appendChild(t)})}},mounted:function(){this.open&&(r.a.open(this),this.bindClickOutSide(),this.appendPopupElToBody())},updated:function(){this.overlay||this.setZIndex()},beforeDestroy:function(){if(r.a.close(this),this.unBindClickOutSide(),this.appendBody){var e=this.popupEl();if(!e)return;document.body.removeChild(e)}},watch:{open:function(e,t){e!==t&&(e?(this.bindClickOutSide(),this.resetZIndex(),r.a.open(this),this.appendPopupElToBody()):(this.unBindClickOutSide(),r.a.close(this)))}}}},function(e,t,n){"use strict";var r=n(303),i=n.n(r),o=n(57),a=n.n(o),s=n(263),l=n.n(s),c=i.a.extend(l.a),u={instances:[],overlay:!1,open:function(e){e&&-1===this.instances.indexOf(e)&&(!this.overlay&&e.overlay&&this.showOverlay(e),this.instances.push(e),this.changeOverlayStyle())},close:function(e){var t=this,n=this.instances.indexOf(e);-1!==n&&i.a.nextTick(function(){t.instances.splice(n,1),0===t.instances.length&&t.closeOverlay(),t.changeOverlayStyle()})},showOverlay:function(e){var t=this.overlay=new c({el:document.createElement("div")});t.fixed=!0,t.color=e.overlayColor,t.opacity=e.overlayOpacity,t.zIndex=e.overlayZIndex,t.onClick=this.handleOverlayClick.bind(this),document.body.appendChild(t.$el),this.preventScrolling(),i.a.nextTick(function(){t.show=!0})},preventScrolling:function(){if(!this.locked){var e=document.getElementsByTagName("body")[0],t=document.getElementsByTagName("html")[0];this.bodyOverflow=e.style.overflow,this.htmlOverflow=t.style.overflow,e.style.overflow="hidden",t.style.overflow="hidden",this.locked=!0}},allowScrolling:function(){var e=document.getElementsByTagName("body")[0],t=document.getElementsByTagName("html")[0];e.style.overflow=this.bodyOverflow||"",t.style.overflow=this.htmlOverflow||"",this.bodyOverflow=null,this.htmlOverflow=null,this.locked=!1},closeOverlay:function(){if(this.overlay){this.allowScrolling();var e=this.overlay;e.show=!1,this.overlay=null,setTimeout(function(){e.$el.remove(),e.$destroy()},450)}},changeOverlayStyle:function(){var e=this.instances[this.instances.length-1];this.overlay&&0!==this.instances.length&&e.overlay&&(this.overlay.color=e.overlayColor,this.overlay.opacity=e.overlayOpacity,this.overlay.zIndex=e.overlayZIndex)},handleOverlayClick:function(){if(0!==this.instances.length){var e=this.instances[this.instances.length-1];e.overlayClick&&e.overlayClick()}}};"undefined"!=typeof window&&window.addEventListener("keydown",function(e){if(0!==u.instances.length&&"esc"===a()(e)){var t=u.instances[u.instances.length-1];t.escPress&&t.escPress()}}),t.a=u},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=20141223,i=function(){return r++}},function(e,t,n){"use strict";t.a={mounted:function(){this.$bindResize()},methods:{$bindResize:function(){var e=this;this._handleResize=function(t){e.onResize&&e.onResize()},"undefined"!=typeof window&&window.addEventListener("resize",this._handleResize)},$unBindResize:function(){this._handleResize&&window.removeEventListener("resize",this._handleResize)}},beforeDestroy:function(){this.$unBindResize()}}},function(e,t,n){"use strict";t.a={props:{scroller:{default:function(){return window}}},mounted:function(){this.$bindScroll()},methods:{$bindScroll:function(){var e=this;this.scroller&&(this._handleScroll=function(t){e.onScroll&&e.onScroll()},this.scroller.addEventListener("scroll",this._handleScroll))},$unbindScroll:function(e){e=e||this.scroller,this._handleScroll&&e.removeEventListener("scroll",this._handleScroll)}},beforeDestroy:function(){this.$unbindScroll()},watch:{scroller:function(e,t){e!==t&&(this.$unbindScroll(t),this.$bindScroll(e))}}}},function(e,t,n){"use strict";var r=n(66),i=n.n(r);n.d(t,"a",function(){return i.a});var o=n(265),a=n.n(o);n.d(t,"b",function(){return a.a})},function(e,t,n){"use strict";var r=n(266),i=n.n(r);n.d(t,"a",function(){return i.a})},function(e,t,n){"use strict";var r=n(267),i=n.n(r);n.d(t,"a",function(){return i.a})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"red50",function(){return r}),n.d(t,"red100",function(){return i}),n.d(t,"red200",function(){return o}),n.d(t,"red300",function(){return a}),n.d(t,"red400",function(){return s}),n.d(t,"red500",function(){return l}),n.d(t,"red600",function(){return c}),n.d(t,"red700",function(){return u}),n.d(t,"red800",function(){return h}),n.d(t,"red900",function(){return p}),n.d(t,"redA100",function(){return d}),n.d(t,"redA200",function(){return f}),n.d(t,"redA400",function(){return g}),n.d(t,"redA700",function(){return m}),n.d(t,"red",function(){return _}),n.d(t,"pink50",function(){return b}),n.d(t,"pink100",function(){return v}),n.d(t,"pink200",function(){return y}),n.d(t,"pink300",function(){return k}),n.d(t,"pink400",function(){return w}),n.d(t,"pink500",function(){return x}),n.d(t,"pink600",function(){return C}),n.d(t,"pink700",function(){return j}),n.d(t,"pink800",function(){return A}),n.d(t,"pink900",function(){return E}),n.d(t,"pinkA100",function(){return S}),n.d(t,"pinkA200",function(){return L}),n.d(t,"pinkA400",function(){return D}),n.d(t,"pinkA700",function(){return T}),n.d(t,"pink",function(){return M}),n.d(t,"purple50",function(){return z}),n.d(t,"purple100",function(){return B}),n.d(t,"purple200",function(){return q}),n.d(t,"purple300",function(){return O}),n.d(t,"purple400",function(){return R}),n.d(t,"purple500",function(){return P}),n.d(t,"purple600",function(){return F}),n.d(t,"purple700",function(){return N}),n.d(t,"purple800",function(){return $}),n.d(t,"purple900",function(){return I}),n.d(t,"purpleA100",function(){return U}),n.d(t,"purpleA200",function(){return H}),n.d(t,"purpleA400",function(){return W}),n.d(t,"purpleA700",function(){return K}),n.d(t,"purple",function(){return G}),n.d(t,"deepPurple50",function(){return V}),n.d(t,"deepPurple100",function(){return Z}),n.d(t,"deepPurple200",function(){return X}),n.d(t,"deepPurple300",function(){return Y}),n.d(t,"deepPurple400",function(){return J}),n.d(t,"deepPurple500",function(){return Q}),n.d(t,"deepPurple600",function(){return ee}),n.d(t,"deepPurple700",function(){return te}),n.d(t,"deepPurple800",function(){return ne}),n.d(t,"deepPurple900",function(){return re}),n.d(t,"deepPurpleA100",function(){return ie}),n.d(t,"deepPurpleA200",function(){return oe}),n.d(t,"deepPurpleA400",function(){return ae}),n.d(t,"deepPurpleA700",function(){return se}),n.d(t,"deepPurple",function(){return le}),n.d(t,"indigo50",function(){return ce}),n.d(t,"indigo100",function(){return ue}),n.d(t,"indigo200",function(){return he}),n.d(t,"indigo300",function(){return pe}),n.d(t,"indigo400",function(){return de}),n.d(t,"indigo500",function(){return fe}),n.d(t,"indigo600",function(){return ge}),n.d(t,"indigo700",function(){return me}),n.d(t,"indigo800",function(){return _e}),n.d(t,"indigo900",function(){return be}),n.d(t,"indigoA100",function(){return ve}),n.d(t,"indigoA200",function(){return ye}),n.d(t,"indigoA400",function(){return ke}),n.d(t,"indigoA700",function(){return we}),n.d(t,"indigo",function(){return xe}),n.d(t,"blue50",function(){return Ce}),n.d(t,"blue100",function(){return je}),n.d(t,"blue200",function(){return Ae}),n.d(t,"blue300",function(){return Ee}),n.d(t,"blue400",function(){return Se}),n.d(t,"blue500",function(){return Le}),n.d(t,"blue600",function(){return De}),n.d(t,"blue700",function(){return Te}),n.d(t,"blue800",function(){return Me}),n.d(t,"blue900",function(){return ze}),n.d(t,"blueA100",function(){return Be}),n.d(t,"blueA200",function(){return qe}),n.d(t,"blueA400",function(){return Oe}),n.d(t,"blueA700",function(){return Re}),n.d(t,"blue",function(){return Pe}),n.d(t,"lightBlue50",function(){return Fe}),n.d(t,"lightBlue100",function(){return Ne}),n.d(t,"lightBlue200",function(){return $e}),n.d(t,"lightBlue300",function(){return Ie}),n.d(t,"lightBlue400",function(){return Ue}),n.d(t,"lightBlue500",function(){return He}),n.d(t,"lightBlue600",function(){return We}),n.d(t,"lightBlue700",function(){return Ke}),n.d(t,"lightBlue800",function(){return Ge}),n.d(t,"lightBlue900",function(){return Ve}),n.d(t,"lightBlueA100",function(){return Ze}),n.d(t,"lightBlueA200",function(){return Xe}),n.d(t,"lightBlueA400",function(){return Ye}),n.d(t,"lightBlueA700",function(){return Je}),n.d(t,"lightBlue",function(){return Qe}),n.d(t,"cyan50",function(){return et}),n.d(t,"cyan100",function(){return tt}),n.d(t,"cyan200",function(){return nt}),n.d(t,"cyan300",function(){return rt}),n.d(t,"cyan400",function(){return it}),n.d(t,"cyan500",function(){return ot}),n.d(t,"cyan600",function(){return at}),n.d(t,"cyan700",function(){return st}),n.d(t,"cyan800",function(){return lt}),n.d(t,"cyan900",function(){return ct}),n.d(t,"cyanA100",function(){return ut}),n.d(t,"cyanA200",function(){return ht}),n.d(t,"cyanA400",function(){return pt}),n.d(t,"cyanA700",function(){return dt}),n.d(t,"cyan",function(){return ft}),n.d(t,"teal50",function(){return gt}),n.d(t,"teal100",function(){return mt}),n.d(t,"teal200",function(){return _t}),n.d(t,"teal300",function(){return bt}),n.d(t,"teal400",function(){return vt}),n.d(t,"teal500",function(){return yt}),n.d(t,"teal600",function(){return kt}),n.d(t,"teal700",function(){return wt}),n.d(t,"teal800",function(){return xt}),n.d(t,"teal900",function(){return Ct}),n.d(t,"tealA100",function(){return jt}),n.d(t,"tealA200",function(){return At}),n.d(t,"tealA400",function(){return Et}),n.d(t,"tealA700",function(){return St}),n.d(t,"teal",function(){return Lt}),n.d(t,"green50",function(){return Dt}),n.d(t,"green100",function(){return Tt}),n.d(t,"green200",function(){return Mt}),n.d(t,"green300",function(){return zt}),n.d(t,"green400",function(){return Bt}),n.d(t,"green500",function(){return qt}),n.d(t,"green600",function(){return Ot}),n.d(t,"green700",function(){return Rt}),n.d(t,"green800",function(){return Pt}),n.d(t,"green900",function(){return Ft}),n.d(t,"greenA100",function(){return Nt}),n.d(t,"greenA200",function(){return $t}),n.d(t,"greenA400",function(){return It}),n.d(t,"greenA700",function(){return Ut}),n.d(t,"green",function(){return Ht}),n.d(t,"lightGreen50",function(){return Wt}),n.d(t,"lightGreen100",function(){return Kt}),n.d(t,"lightGreen200",function(){return Gt}),n.d(t,"lightGreen300",function(){return Vt}),n.d(t,"lightGreen400",function(){return Zt}),n.d(t,"lightGreen500",function(){return Xt}),n.d(t,"lightGreen600",function(){return Yt}),n.d(t,"lightGreen700",function(){return Jt}),n.d(t,"lightGreen800",function(){return Qt}),n.d(t,"lightGreen900",function(){return en}),n.d(t,"lightGreenA100",function(){return tn}),n.d(t,"lightGreenA200",function(){return nn}),n.d(t,"lightGreenA400",function(){return rn}),n.d(t,"lightGreenA700",function(){return on}),n.d(t,"lightGreen",function(){return an}),n.d(t,"lime50",function(){return sn}),n.d(t,"lime100",function(){return ln}),n.d(t,"lime200",function(){return cn}),n.d(t,"lime300",function(){return un}),n.d(t,"lime400",function(){return hn}),n.d(t,"lime500",function(){return pn}),n.d(t,"lime600",function(){return dn}),n.d(t,"lime700",function(){return fn}),n.d(t,"lime800",function(){return gn}),n.d(t,"lime900",function(){return mn}),n.d(t,"limeA100",function(){return _n}),n.d(t,"limeA200",function(){return bn}),n.d(t,"limeA400",function(){return vn}),n.d(t,"limeA700",function(){return yn}),n.d(t,"lime",function(){return kn}),n.d(t,"yellow50",function(){return wn}),n.d(t,"yellow100",function(){return xn}),n.d(t,"yellow200",function(){return Cn}),n.d(t,"yellow300",function(){return jn}),n.d(t,"yellow400",function(){return An}),n.d(t,"yellow500",function(){return En}),n.d(t,"yellow600",function(){return Sn}),n.d(t,"yellow700",function(){return Ln}),n.d(t,"yellow800",function(){return Dn}),n.d(t,"yellow900",function(){return Tn}),n.d(t,"yellowA100",function(){return Mn}),n.d(t,"yellowA200",function(){return zn}),n.d(t,"yellowA400",function(){return Bn}),n.d(t,"yellowA700",function(){return qn}),n.d(t,"yellow",function(){return On}),n.d(t,"amber50",function(){return Rn}),n.d(t,"amber100",function(){return Pn}),n.d(t,"amber200",function(){return Fn}),n.d(t,"amber300",function(){return Nn});n.d(t,"amber400",function(){return $n}),n.d(t,"amber500",function(){return In}),n.d(t,"amber600",function(){return Un}),n.d(t,"amber700",function(){return Hn}),n.d(t,"amber800",function(){return Wn}),n.d(t,"amber900",function(){return Kn}),n.d(t,"amberA100",function(){return Gn}),n.d(t,"amberA200",function(){return Vn}),n.d(t,"amberA400",function(){return Zn}),n.d(t,"amberA700",function(){return Xn}),n.d(t,"amber",function(){return Yn}),n.d(t,"orange50",function(){return Jn}),n.d(t,"orange100",function(){return Qn}),n.d(t,"orange200",function(){return er}),n.d(t,"orange300",function(){return tr}),n.d(t,"orange400",function(){return nr}),n.d(t,"orange500",function(){return rr}),n.d(t,"orange600",function(){return ir}),n.d(t,"orange700",function(){return or}),n.d(t,"orange800",function(){return ar}),n.d(t,"orange900",function(){return sr}),n.d(t,"orangeA100",function(){return lr}),n.d(t,"orangeA200",function(){return cr}),n.d(t,"orangeA400",function(){return ur}),n.d(t,"orangeA700",function(){return hr}),n.d(t,"orange",function(){return pr}),n.d(t,"deepOrange50",function(){return dr}),n.d(t,"deepOrange100",function(){return fr}),n.d(t,"deepOrange200",function(){return gr}),n.d(t,"deepOrange300",function(){return mr}),n.d(t,"deepOrange400",function(){return _r}),n.d(t,"deepOrange500",function(){return br}),n.d(t,"deepOrange600",function(){return vr}),n.d(t,"deepOrange700",function(){return yr}),n.d(t,"deepOrange800",function(){return kr}),n.d(t,"deepOrange900",function(){return wr}),n.d(t,"deepOrangeA100",function(){return xr}),n.d(t,"deepOrangeA200",function(){return Cr}),n.d(t,"deepOrangeA400",function(){return jr}),n.d(t,"deepOrangeA700",function(){return Ar}),n.d(t,"deepOrange",function(){return Er}),n.d(t,"brown50",function(){return Sr}),n.d(t,"brown100",function(){return Lr}),n.d(t,"brown200",function(){return Dr}),n.d(t,"brown300",function(){return Tr}),n.d(t,"brown400",function(){return Mr}),n.d(t,"brown500",function(){return zr}),n.d(t,"brown600",function(){return Br}),n.d(t,"brown700",function(){return qr}),n.d(t,"brown800",function(){return Or}),n.d(t,"brown900",function(){return Rr}),n.d(t,"brown",function(){return Pr}),n.d(t,"blueGrey50",function(){return Fr}),n.d(t,"blueGrey100",function(){return Nr}),n.d(t,"blueGrey200",function(){return $r}),n.d(t,"blueGrey300",function(){return Ir}),n.d(t,"blueGrey400",function(){return Ur}),n.d(t,"blueGrey500",function(){return Hr}),n.d(t,"blueGrey600",function(){return Wr}),n.d(t,"blueGrey700",function(){return Kr}),n.d(t,"blueGrey800",function(){return Gr}),n.d(t,"blueGrey900",function(){return Vr}),n.d(t,"blueGrey",function(){return Zr}),n.d(t,"grey50",function(){return Xr}),n.d(t,"grey100",function(){return Yr}),n.d(t,"grey200",function(){return Jr}),n.d(t,"grey300",function(){return Qr}),n.d(t,"grey400",function(){return ei}),n.d(t,"grey500",function(){return ti}),n.d(t,"grey600",function(){return ni}),n.d(t,"grey700",function(){return ri}),n.d(t,"grey800",function(){return ii}),n.d(t,"grey900",function(){return oi}),n.d(t,"grey",function(){return ai}),n.d(t,"black",function(){return si}),n.d(t,"white",function(){return li}),n.d(t,"transparent",function(){return ci}),n.d(t,"fullBlack",function(){return ui}),n.d(t,"darkBlack",function(){return hi}),n.d(t,"lightBlack",function(){return pi}),n.d(t,"minBlack",function(){return di}),n.d(t,"faintBlack",function(){return fi}),n.d(t,"fullWhite",function(){return gi}),n.d(t,"darkWhite",function(){return mi}),n.d(t,"lightWhite",function(){return _i});var r="#ffebee",i="#ffcdd2",o="#ef9a9a",a="#e57373",s="#ef5350",l="#f44336",c="#e53935",u="#d32f2f",h="#c62828",p="#b71c1c",d="#ff8a80",f="#ff5252",g="#ff1744",m="#d50000",_=l,b="#fce4ec",v="#f8bbd0",y="#f48fb1",k="#f06292",w="#ec407a",x="#e91e63",C="#d81b60",j="#c2185b",A="#ad1457",E="#880e4f",S="#ff80ab",L="#ff4081",D="#f50057",T="#c51162",M=x,z="#f3e5f5",B="#e1bee7",q="#ce93d8",O="#ba68c8",R="#ab47bc",P="#9c27b0",F="#8e24aa",N="#7b1fa2",$="#6a1b9a",I="#4a148c",U="#ea80fc",H="#e040fb",W="#d500f9",K="#aa00ff",G=P,V="#ede7f6",Z="#d1c4e9",X="#b39ddb",Y="#9575cd",J="#7e57c2",Q="#673ab7",ee="#5e35b1",te="#512da8",ne="#4527a0",re="#311b92",ie="#b388ff",oe="#7c4dff",ae="#651fff",se="#6200ea",le=Q,ce="#e8eaf6",ue="#c5cae9",he="#9fa8da",pe="#7986cb",de="#5c6bc0",fe="#3f51b5",ge="#3949ab",me="#303f9f",_e="#283593",be="#1a237e",ve="#8c9eff",ye="#536dfe",ke="#3d5afe",we="#304ffe",xe=fe,Ce="#e3f2fd",je="#bbdefb",Ae="#90caf9",Ee="#64b5f6",Se="#42a5f5",Le="#2196f3",De="#1e88e5",Te="#1976d2",Me="#1565c0",ze="#0d47a1",Be="#82b1ff",qe="#448aff",Oe="#2979ff",Re="#2962ff",Pe=Le,Fe="#e1f5fe",Ne="#b3e5fc",$e="#81d4fa",Ie="#4fc3f7",Ue="#29b6f6",He="#03a9f4",We="#039be5",Ke="#0288d1",Ge="#0277bd",Ve="#01579b",Ze="#80d8ff",Xe="#40c4ff",Ye="#00b0ff",Je="#0091ea",Qe=He,et="#e0f7fa",tt="#b2ebf2",nt="#80deea",rt="#4dd0e1",it="#26c6da",ot="#00bcd4",at="#00acc1",st="#0097a7",lt="#00838f",ct="#006064",ut="#84ffff",ht="#18ffff",pt="#00e5ff",dt="#00b8d4",ft=ot,gt="#e0f2f1",mt="#b2dfdb",_t="#80cbc4",bt="#4db6ac",vt="#26a69a",yt="#009688",kt="#00897b",wt="#00796b",xt="#00695c",Ct="#004d40",jt="#a7ffeb",At="#64ffda",Et="#1de9b6",St="#00bfa5",Lt=yt,Dt="#e8f5e9",Tt="#c8e6c9",Mt="#a5d6a7",zt="#81c784",Bt="#66bb6a",qt="#4caf50",Ot="#43a047",Rt="#388e3c",Pt="#2e7d32",Ft="#1b5e20",Nt="#b9f6ca",$t="#69f0ae",It="#00e676",Ut="#00c853",Ht=qt,Wt="#f1f8e9",Kt="#dcedc8",Gt="#c5e1a5",Vt="#aed581",Zt="#9ccc65",Xt="#8bc34a",Yt="#7cb342",Jt="#689f38",Qt="#558b2f",en="#33691e",tn="#ccff90",nn="#b2ff59",rn="#76ff03",on="#64dd17",an=Xt,sn="#f9fbe7",ln="#f0f4c3",cn="#e6ee9c",un="#dce775",hn="#d4e157",pn="#cddc39",dn="#c0ca33",fn="#afb42b",gn="#9e9d24",mn="#827717",_n="#f4ff81",bn="#eeff41",vn="#c6ff00",yn="#aeea00",kn=pn,wn="#fffde7",xn="#fff9c4",Cn="#fff59d",jn="#fff176",An="#ffee58",En="#ffeb3b",Sn="#fdd835",Ln="#fbc02d",Dn="#f9a825",Tn="#f57f17",Mn="#ffff8d",zn="#ffff00",Bn="#ffea00",qn="#ffd600",On=En,Rn="#fff8e1",Pn="#ffecb3",Fn="#ffe082",Nn="#ffd54f",$n="#ffca28",In="#ffc107",Un="#ffb300",Hn="#ffa000",Wn="#ff8f00",Kn="#ff6f00",Gn="#ffe57f",Vn="#ffd740",Zn="#ffc400",Xn="#ffab00",Yn=In,Jn="#fff3e0",Qn="#ffe0b2",er="#ffcc80",tr="#ffb74d",nr="#ffa726",rr="#ff9800",ir="#fb8c00",or="#f57c00",ar="#ef6c00",sr="#e65100",lr="#ffd180",cr="#ffab40",ur="#ff9100",hr="#ff6d00",pr=rr,dr="#fbe9e7",fr="#ffccbc",gr="#ffab91",mr="#ff8a65",_r="#ff7043",br="#ff5722",vr="#f4511e",yr="#e64a19",kr="#d84315",wr="#bf360c",xr="#ff9e80",Cr="#ff6e40",jr="#ff3d00",Ar="#dd2c00",Er=br,Sr="#efebe9",Lr="#d7ccc8",Dr="#bcaaa4",Tr="#a1887f",Mr="#8d6e63",zr="#795548",Br="#6d4c41",qr="#5d4037",Or="#4e342e",Rr="#3e2723",Pr=zr,Fr="#eceff1",Nr="#cfd8dc",$r="#b0bec5",Ir="#90a4ae",Ur="#78909c",Hr="#607d8b",Wr="#546e7a",Kr="#455a64",Gr="#37474f",Vr="#263238",Zr=Hr,Xr="#fafafa",Yr="#f5f5f5",Jr="#eeeeee",Qr="#e0e0e0",ei="#bdbdbd",ti="#9e9e9e",ni="#757575",ri="#616161",ii="#424242",oi="#212121",ai=ti,si="#000000",li="#ffffff",ci="rgba(0, 0, 0, 0)",ui="rgba(0, 0, 0, 1)",hi="rgba(0, 0, 0, 0.87)",pi="rgba(0, 0, 0, 0.54)",di="rgba(0, 0, 0, 0.26)",fi="rgba(0, 0, 0, 0.12)",gi="rgba(255, 255, 255, 1)",mi="rgba(255, 255, 255, 0.87)",_i="rgba(255, 255, 255, 0.54)"},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e){var t=e.getBoundingClientRect(),n=document.body,r=e.clientTop||n.clientTop||0,i=e.clientLeft||n.clientLeft||0,o=window.pageYOffset||e.scrollTop,a=window.pageXOffset||e.scrollLeft;return{top:t.top+o-r,left:t.left+a-i}}},function(e,t,n){e.exports={default:n(112),__esModule:!0}},function(e,t,n){e.exports={default:n(113),__esModule:!0}},function(e,t,n){e.exports={default:n(114),__esModule:!0}},function(e,t,n){e.exports={default:n(115),__esModule:!0}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(106),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=i.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(109),o=r(i),a=n(108),s=r(a),l="function"==typeof s.default&&"symbol"==typeof o.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};t.default="function"==typeof s.default&&"symbol"===l(o.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":void 0===e?"undefined":l(e)}},function(e,t,n){n(137),e.exports=n(9).Object.assign},function(e,t,n){n(138),e.exports=n(9).Object.keys},function(e,t,n){n(141),n(139),n(142),n(143),e.exports=n(9).Symbol},function(e,t,n){n(140),n(144),e.exports=n(40).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var r=n(8),i=n(135),o=n(134);e.exports=function(e){return function(t,n,a){var s,l=r(t),c=i(l.length),u=o(a,c);if(e&&n!=n){for(;c>u;)if((s=l[u++])!=s)return!0}else for(;c>u;u++)if((e||u in l)&&l[u]===n)return e||u||0;return!e&&-1}}},function(e,t,n){var r=n(116);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(14),i=n(32),o=n(21);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var a,s=n(e),l=o.f,c=0;s.length>c;)l.call(e,a=s[c++])&&t.push(a);return t}},function(e,t,n){var r=n(5).document;e.exports=r&&r.documentElement},function(e,t,n){var r=n(45);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){"use strict";var r=n(50),i=n(22),o=n(33),a={};n(12)(a,n(15)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(a,{next:i(1,n)}),o(e,t+" Iterator")}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var r=n(14),i=n(8);e.exports=function(e,t){for(var n,o=i(e),a=r(o),s=a.length,l=0;s>l;)if(o[n=a[l++]]===t)return n}},function(e,t,n){var r=n(23)("meta"),i=n(20),o=n(7),a=n(13).f,s=0,l=Object.isExtensible||function(){return!0},c=!n(11)(function(){return l(Object.preventExtensions({}))}),u=function(e){a(e,r,{value:{i:"O"+ ++s,w:{}}})},h=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!l(e))return"F";if(!t)return"E";u(e)}return e[r].i},p=function(e,t){if(!o(e,r)){if(!l(e))return!0;if(!t)return!1;u(e)}return e[r].w},d=function(e){return c&&f.NEED&&l(e)&&!o(e,r)&&u(e),e},f=e.exports={KEY:r,NEED:!1,fastKey:h,getWeak:p,onFreeze:d}},function(e,t,n){"use strict";var r=n(14),i=n(32),o=n(21),a=n(37),s=n(48),l=Object.assign;e.exports=!l||n(11)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=r})?function(e,t){for(var n=a(e),l=arguments.length,c=1,u=i.f,h=o.f;l>c;)for(var p,d=s(arguments[c++]),f=u?r(d).concat(u(d)):r(d),g=f.length,m=0;g>m;)h.call(d,p=f[m++])&&(n[p]=d[p]);return n}:l},function(e,t,n){var r=n(13),i=n(18),o=n(14);e.exports=n(10)?Object.defineProperties:function(e,t){i(e);for(var n,a=o(t),s=a.length,l=0;s>l;)r.f(e,n=a[l++],t[n]);return e}},function(e,t,n){var r=n(21),i=n(22),o=n(8),a=n(38),s=n(7),l=n(47),c=Object.getOwnPropertyDescriptor;t.f=n(10)?c:function(e,t){if(e=o(e),t=a(t,!0),l)try{return c(e,t)}catch(e){}if(s(e,t))return i(!r.f.call(e,t),e[t])}},function(e,t,n){var r=n(8),i=n(51).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return a.slice()}};e.exports.f=function(e){return a&&"[object Window]"==o.call(e)?s(e):i(r(e))}},function(e,t,n){var r=n(7),i=n(37),o=n(34)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,n){var r=n(19),i=n(9),o=n(11);e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],a={};a[e]=t(n),r(r.S+r.F*o(function(){n(1)}),"Object",a)}},function(e,t,n){var r=n(36),i=n(28);e.exports=function(e){return function(t,n){var o,a,s=String(i(t)),l=r(n),c=s.length;return l<0||l>=c?e?"":void 0:(o=s.charCodeAt(l),o<55296||o>56319||l+1===c||(a=s.charCodeAt(l+1))<56320||a>57343?e?s.charAt(l):o:e?s.slice(l,l+2):a-56320+(o-55296<<10)+65536)}}},function(e,t,n){var r=n(36),i=Math.max,o=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):o(e,t)}},function(e,t,n){var r=n(36),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){"use strict";var r=n(117),i=n(124),o=n(30),a=n(8);e.exports=n(49)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(e,t,n){var r=n(19);r(r.S+r.F,"Object",{assign:n(127)})},function(e,t,n){var r=n(37),i=n(14);n(132)("keys",function(){return function(e){return i(r(e))}})},function(e,t){},function(e,t,n){"use strict";var r=n(133)(!0);n(49)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){"use strict";var r=n(5),i=n(7),o=n(10),a=n(19),s=n(53),l=n(126).KEY,c=n(11),u=n(35),h=n(33),p=n(23),d=n(15),f=n(40),g=n(39),m=n(125),_=n(120),b=n(122),v=n(18),y=n(8),k=n(38),w=n(22),x=n(50),C=n(130),j=n(129),A=n(13),E=n(14),S=j.f,L=A.f,D=C.f,T=r.Symbol,M=r.JSON,z=M&&M.stringify,B=d("_hidden"),q=d("toPrimitive"),O={}.propertyIsEnumerable,R=u("symbol-registry"),P=u("symbols"),F=u("op-symbols"),N=Object.prototype,$="function"==typeof T,I=r.QObject,U=!I||!I.prototype||!I.prototype.findChild,H=o&&c(function(){return 7!=x(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=S(N,t);r&&delete N[t],L(e,t,n),r&&e!==N&&L(N,t,r)}:L,W=function(e){var t=P[e]=x(T.prototype);return t._k=e,t},K=$&&"symbol"==typeof T.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof T},G=function(e,t,n){return e===N&&G(F,t,n),v(e),t=k(t,!0),v(n),i(P,t)?(n.enumerable?(i(e,B)&&e[B][t]&&(e[B][t]=!1),n=x(n,{enumerable:w(0,!1)})):(i(e,B)||L(e,B,w(1,{})),e[B][t]=!0),H(e,t,n)):L(e,t,n)},V=function(e,t){v(e);for(var n,r=_(t=y(t)),i=0,o=r.length;o>i;)G(e,n=r[i++],t[n]);return e},Z=function(e,t){return void 0===t?x(e):V(x(e),t)},X=function(e){var t=O.call(this,e=k(e,!0));return!(this===N&&i(P,e)&&!i(F,e))&&(!(t||!i(this,e)||!i(P,e)||i(this,B)&&this[B][e])||t)},Y=function(e,t){if(e=y(e),t=k(t,!0),e!==N||!i(P,t)||i(F,t)){var n=S(e,t);return!n||!i(P,t)||i(e,B)&&e[B][t]||(n.enumerable=!0),n}},J=function(e){for(var t,n=D(y(e)),r=[],o=0;n.length>o;)i(P,t=n[o++])||t==B||t==l||r.push(t);return r},Q=function(e){for(var t,n=e===N,r=D(n?F:y(e)),o=[],a=0;r.length>a;)!i(P,t=r[a++])||n&&!i(N,t)||o.push(P[t]);return o};$||(T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var e=p(arguments.length>0?arguments[0]:void 0),t=function(n){this===N&&t.call(F,n),i(this,B)&&i(this[B],e)&&(this[B][e]=!1),H(this,e,w(1,n))};return o&&U&&H(N,e,{configurable:!0,set:t}),W(e)},s(T.prototype,"toString",function(){return this._k}),j.f=Y,A.f=G,n(51).f=C.f=J,n(21).f=X,n(32).f=Q,o&&!n(31)&&s(N,"propertyIsEnumerable",X,!0),f.f=function(e){return W(d(e))}),a(a.G+a.W+a.F*!$,{Symbol:T});for(var ee="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),te=0;ee.length>te;)d(ee[te++]);for(var ne=E(d.store),re=0;ne.length>re;)g(ne[re++]);a(a.S+a.F*!$,"Symbol",{for:function(e){return i(R,e+="")?R[e]:R[e]=T(e)},keyFor:function(e){if(K(e))return m(R,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){U=!0},useSimple:function(){U=!1}}),a(a.S+a.F*!$,"Object",{create:Z,defineProperty:G,defineProperties:V,getOwnPropertyDescriptor:Y,getOwnPropertyNames:J,getOwnPropertySymbols:Q}),M&&a(a.S+a.F*(!$||c(function(){var e=T();return"[null]"!=z([e])||"{}"!=z({a:e})||"{}"!=z(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!K(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&b(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!K(t))return t}),r[1]=t,z.apply(M,r)}}}),T.prototype[q]||n(12)(T.prototype,q,T.prototype.valueOf),h(T,"Symbol"),h(Math,"Math",!0),h(r.JSON,"JSON",!0)},function(e,t,n){n(39)("asyncIterator")},function(e,t,n){n(39)("observable")},function(e,t,n){n(136);for(var r=n(5),i=n(12),o=n(30),a=n(15)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<s.length;l++){var c=s[l],u=r[c],h=u&&u.prototype;h&&!h[a]&&i(h,a,c),o[c]=o.Array}},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-ripple-wrapper {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-popover {\n  position: fixed;\n  background: #ffffff;\n  border-radius: 2px;\n  max-height: 100%;\n  overflow: visible;\n  -webkit-overflow-scrolling: touch;\n  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n  transform-origin: center top;\n}\n.mu-popover-enter-active,\n.mu-popover-leave-active {\n  transition-duration: 300ms;\n  transition-property: opacity, transform;\n}\n.mu-popover-enter,\n.mu-popover-leave-active {\n  transform: scaleY(0);\n  opacity: 0;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-item-wrapper .mu-item[data-v-194160b6] {\n    padding: 0px 16px;\n    min-height: 35px !important;\n}\n.mu-item-right button[data-v-194160b6] {\n    border: 0;\n    background: none;\n    font-size: 16px;\n}\n.mu-item-title[data-v-194160b6] {\n    font-size: 15px !important;\n}\n.mu-item-right button[data-v-194160b6]:hover {\n    color: #db2828;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-list {\n  padding: 8px 0;\n  width: 100%;\n  position: relative;\n  overflow-x: hidden;\n  overflow-y: visible;\n}\n.mu-list .mu-sub-header:first-child {\n  margin-top: -8px;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-overlay {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #000;\n  opacity: .4;\n  z-index: 1000;\n}\n.mu-overlay-fade-enter-active, .mu-overlay-fade-leave-active {\n  transition: opacity .45s cubic-bezier(0.23, 1, 0.32, 1);\n}\n.mu-overlay-fade-enter,\n.mu-overlay-fade-leave-active {\n  opacity: 0 !important;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-item-wrapper {\n  display: block;\n  color: inherit;\n  position: relative;\n  outline: none;\n  cursor: pointer;\n}\n.mu-item-wrapper.hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.mu-item-wrapper.disabled {\n  cursor: default;\n}\n.mu-item {\n  min-height: 48px;\n  display: flex;\n  padding: 16px 16px;\n  color: rgba(0, 0, 0, 0.87);\n  position: relative;\n}\n.mu-item.show-left {\n  padding-left: 72px;\n}\n.mu-item.show-right {\n  padding-right: 56px;\n}\n.mu-item.has-avatar {\n  min-height: 56px;\n}\n.mu-item.selected {\n  color: #7e57c2;\n}\n.mu-item-toggle-button {\n  color: rgba(0, 0, 0, 0.87);\n  position: absolute;\n  right: 4px;\n  top: 0;\n}\n.mu-item-right,\n.mu-item-left {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  width: 40px;\n  height: 100%;\n  position: absolute;\n  color: #757575;\n  top: 0;\n  max-height: 72px;\n}\n.mu-item-left {\n  left: 16px;\n}\n.mu-item.selected .mu-item-left {\n  color: #7e57c2;\n}\n.mu-item-right {\n  right: 12px;\n  justify-content: center;\n}\n.mu-item-right > .mu-icon-button {\n  align-self: flex-start;\n}\n.mu-item-right > .mu-icon-menu {\n  align-self: flex-start;\n}\n.mu-item-content {\n  width: 100%;\n  align-self: center;\n}\n.mu-item-title-row {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  position: relative;\n  width: 100%;\n  line-height: 1;\n}\n.mu-item-title {\n  flex: 1;\n  display: block;\n  font-size: 16px;\n  max-width: 100%;\n}\n.mu-item-sub-title {\n  line-height: 1;\n  margin-top: 4px;\n}\n.mu-item-after {\n  margin-left: auto;\n  color: rgba(0, 0, 0, 0.54);\n  display: flex;\n  align-items: center;\n}\n.mu-item-text {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  position: relative;\n  overflow: hidden;\n  font-size: 14px;\n  line-height: 18px;\n  margin-top: 4px;\n  max-height: 40px;\n  max-width: 100%;\n  text-overflow: ellipsis;\n  word-break: break-all;\n  color: rgba(0, 0, 0, 0.54);\n}\n.mu-item-svg-icon {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  stroke-width: 2;\n  fill: none;\n  stroke: currentColor;\n  user-select: none;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-focus-ripple-wrapper {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n.mu-focus-ripple {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n  opacity: 0.16;\n  background-color: currentColor;\n  animation: mu-pulsate 750ms cubic-bezier(0.445, 0.05, 0.55, 0.95);\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n}\n@keyframes mu-pulsate {\n0% {\n    transform: scale(0.72);\n}\n100% {\n    transform: scale(0.85);\n}\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-circle-ripple {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  user-select: none;\n  border-radius: 50%;\n  background-color: currentColor;\n  background-clip: padding-box;\n  opacity: 0.1;\n}\n.mu-ripple-enter-active,\n.mu-ripple-leave-active {\n  transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n}\n.mu-ripple-enter {\n  transform: scale(0);\n}\n.mu-ripple-leave-active {\n  opacity: 0 !important;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-tooltip {\n  position: absolute;\n  font-size: 10px;\n  line-height: 22px;\n  padding: 0 8px;\n  z-index: 300;\n  color: #ffffff;\n  overflow: hidden;\n  top: -1000px;\n  border-radius: 2px;\n  user-select: none;\n  opacity: 0;\n  transition: top 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n.mu-tooltip.when-shown {\n  opacity: 0.9;\n  transition: top 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n.mu-tooltip.touched {\n  font-size: 14px;\n  line-height: 32px;\n  padding: 0 16px;\n}\n.mu-tooltip-ripple {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  background-color: transparent;\n  transition: width 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, height 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, background-color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n.mu-tooltip-ripple.when-shown {\n  background-color: #616161;\n  transition: width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, height 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, background-color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n.mu-tooltip-label {\n  white-space: nowrap;\n  position: relative;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-expand-enter-active,\n.mu-expand-leave-active {\n  transition: height 0.45s cubic-bezier(0.23, 1, 0.32, 1), padding 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n  backface-visibility: hidden;\n  transform: translate3d(0, 0, 0);\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-icon {\n  font-size: 24px;\n  cursor: inherit;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\ntextarea:disabled {\n  background-color: #fff;\n}\n.v-note-wrapper {\n  position: relative;\n  min-width: 300px;\n  min-height: 300px;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s linear 0s;\n  background: #fff;\n  z-index: 1500;\n}\n.v-note-wrapper.fullscreen {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  height: auto;\n  z-index: 1501;\n}\n.v-note-wrapper .v-note-op {\n  width: 100%;\n  display: flex;\n  white-space: pre-line;\n  flex: none;\n  min-height: 40px;\n  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);\n  background: #fff;\n  z-index: 1;\n}\n.v-note-wrapper .v-note-op .left,\n.v-note-wrapper .v-note-op .right {\n  flex: 1;\n  min-height: 40px;\n  box-sizing: border-box;\n}\n.v-note-wrapper .v-note-op .left .op-icon-divider,\n.v-note-wrapper .v-note-op .right .op-icon-divider {\n  height: 40px;\n  border-left: 1px solid #e5e5e5;\n  margin: 0 6px 0 4px;\n}\n.v-note-wrapper .v-note-op .left .op-icon,\n.v-note-wrapper .v-note-op .right .op-icon {\n  display: inline-block;\n  cursor: pointer;\n  height: 28px;\n  width: 28px;\n  margin: 6px 0 5px 0px;\n  font-size: 15px;\n  padding: 4.5px 6px 5px 3.5px;\n  color: #757575;\n  border-radius: 5px;\n  text-align: center;\n  background: none;\n  border: none;\n  outline: none;\n  line-height: 1;\n}\n.v-note-wrapper .v-note-op .left .op-icon.selected,\n.v-note-wrapper .v-note-op .right .op-icon.selected {\n  color: rgba(0,0,0,0.8);\n  background: #eaeaea;\n}\n.v-note-wrapper .v-note-op .left .op-icon:hover,\n.v-note-wrapper .v-note-op .right .op-icon:hover {\n  color: rgba(0,0,0,0.8);\n  background: #e5e5e5;\n}\n.v-note-wrapper .v-note-op .right {\n  text-align: right;\n  padding-right: 6px;\n  max-width: 30%;\n}\n.v-note-wrapper .v-note-op .left {\n  text-align: left;\n  padding-left: 6px;\n}\n.v-note-wrapper .v-note-panel {\n  position: relative;\n  box-shadow: 0 0px 3px rgba(0,0,0,0.157), 0 0px 3px rgba(0,0,0,0.227);\n  display: flex;\n  flex: 1;\n  width: 100%;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper {\n  flex: 0 0 50%;\n  width: 50%;\n  padding: 0;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  transition: all 0.2s linear 0s;\n  cursor: text;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar {\n  width: 6px;\n  background-color: #e5e5e5;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb {\n  background-color: #b7b7b7;\n  border-radius: 3px;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:hover {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:active {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-track {\n  -webkit-box-shadow: 0 0 0px #808080 inset;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-edit {\n  width: 100%;\n  flex: 0 0 100%;\n  overflow-y: auto;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-show {\n  width: 0;\n  flex: 0 0 0;\n  display: none;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-div {\n  width: 100%;\n  padding: 20px 25px;\n  box-sizing: border-box;\n  outline: 0 none;\n  border: none !important;\n  color: #2c3e50;\n  font-size: 16px;\n}\n.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {\n  width: 100%;\n  height: auto;\n  padding: 8px 25px 15px 25px;\n}\n.v-note-wrapper .v-note-panel .v-note-show {\n  flex: 0 0 50%;\n  width: 50%;\n  overflow-y: auto;\n  padding: 0 0;\n  transition: all 0.2s linear 0s;\n}\n.v-note-wrapper .v-note-panel .v-note-show.single-show {\n  flex: 0 0 100%;\n  width: 100%;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {\n  width: 100%;\n  height: 100%;\n  padding: 8px 25px 15px 25px;\n  overflow-y: auto;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  background: #fbfbfb;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar {\n  width: 6px;\n  background-color: #e5e5e5;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb {\n  background-color: #b7b7b7;\n  border-radius: 3px;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:hover,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:hover {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:active,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:active {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-track,\n.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-track {\n  -webkit-box-shadow: 0 0 0px #808080 inset;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {\n  position: absolute;\n  width: 250px;\n  right: 0;\n  top: 0px;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  background: rgba(255,255,255,0.98);\n  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);\n  transition: all 0.1s linear 0s;\n}\n@media only screen and (max-width: 768px) {\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {\n    width: 50%;\n}\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter-active,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {\n  bottom: 0;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {\n  bottom: 100%;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title {\n  height: 50px;\n  width: 100%;\n  border-bottom: 1px solid #eeece8;\n  flex: none;\n  line-height: 50px;\n  font-size: 18px;\n  font-weight: 500;\n  box-sizing: border-box;\n  padding: 0 12px;\n  box-shadow: 0 0px 1px rgba(0,0,0,0.157), 0 0px 1px rgba(0,0,0,0.227);\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close {\n  float: right;\n  color: #757575;\n  font-size: 20px;\n  cursor: pointer;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close:hover {\n  color: #696969;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content {\n  overflow-y: auto;\n  flex: 1;\n  padding: 8px 0;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar {\n  width: 6px;\n  background-color: #e5e5e5;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb {\n  background-color: #b7b7b7;\n  border-radius: 3px;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:hover {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:active {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-track {\n  -webkit-box-shadow: 0 0 0px #808080 inset;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {\n  margin: 2px 0;\n  font-weight: 500;\n  font-size: 17px;\n  color: #2185d0;\n  cursor: pointer;\n  line-height: normal;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 12px;\n  border-bottom: none;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1:hover,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2:hover,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3:hover,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4:hover,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5:hover,\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6:hover {\n  color: #483d8b;\n  text-decoration-line: underline;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2 {\n  padding-left: 27px;\n  font-size: 17px;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3 {\n  padding-left: 42px;\n  font-size: 17px;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4 {\n  padding-left: 58px;\n  font-size: 15px;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5 {\n  padding-left: 72px;\n  font-size: 15px;\n}\n.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {\n  padding-left: 87px;\n  font-size: 15px;\n}\n.v-note-wrapper .v-note-read-model {\n  position: relative;\n  display: none;\n  width: 100%;\n  height: 100%;\n  background: #fbfbfb;\n  padding: 30px 8% 50px 8%;\n  overflow-y: auto;\n  box-sizing: border-box;\n}\n.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar {\n  width: 6px;\n  background-color: #e5e5e5;\n}\n.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb {\n  background-color: #b7b7b7;\n  border-radius: 3px;\n}\n.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:hover {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:active {\n  background-color: #a1a1a1;\n}\n.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-track {\n  -webkit-box-shadow: 0 0 0px #808080 inset;\n}\n.v-note-wrapper .v-note-read-model.show {\n  display: block;\n}\n.v-note-help-wrapper {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: rgba(0,0,0,0.7);\n  z-index: 1600;\n  transition: all 0.1s linear 0s;\n}\n.v-note-help-wrapper.fade-enter-active,\n.v-note-help-wrapper.fade-leave-active {\n  opacity: 1;\n}\n.v-note-help-wrapper.fade-enter,\n.v-note-help-wrapper.fade-leave-active {\n  opacity: 0;\n}\n.v-note-help-wrapper .v-note-help-content {\n  position: relative;\n  width: 60%;\n  max-width: 800px;\n  margin: 30px auto;\n  height: 90%;\n  min-width: 320px;\n  transition: all 0.1s linear 0s;\n  z-index: 3;\n  box-shadow: 0 0px 5px rgba(0,0,0,0.157), 0 0px 5px rgba(0,0,0,0.227);\n}\n.v-note-help-wrapper .v-note-help-content i {\n  font-size: 28px;\n  position: absolute;\n  right: 15px;\n  top: 8px;\n  color: rgba(0,0,0,0.7);\n  cursor: pointer;\n}\n.v-note-help-wrapper .v-note-help-content i:hover {\n  color: #000;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show {\n  width: 100%;\n  height: 100%;\n  font-size: 18px;\n  background: #fbfbfb;\n  overflow-y: auto;\n  padding: 2% 6%;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar {\n  width: 6px;\n  background-color: #e5e5e5;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb {\n  background-color: #b7b7b7;\n  border-radius: 3px;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:hover {\n  background-color: #a1a1a1;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:active {\n  background-color: #a1a1a1;\n}\n.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-track {\n  -webkit-box-shadow: 0 0 0px #808080 inset;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.auto-textarea-wrapper[data-v-7a63e4b3] {\r\n    height: 100%;\n}\r\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,"\n.mu-icon-button {\n  position: relative;\n  display: inline-block;\n  overflow: visible;\n  line-height: 1;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  font-size: 24px;\n  padding: 12px;\n  border: none;\n  appearance: none;\n  background: none;\n  color: inherit;\n  text-decoration: none;\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);\n  transform: translate3d(0, 0, 0);\n  -webkit-box-flex: 0;\n  -webkit-flex-shrink: 0;\n  -ms-flex: 0 0 auto;\n  flex-shrink: 0;\n  margin: 0;\n  outline: 0;\n  cursor: pointer;\n}\n.mu-icon-button .mu-circle-ripple {\n  color: rgba(0, 0, 0, 0.87);\n}\n.mu-icon-button.disabled {\n  color: rgba(0, 0, 0, 0.38);\n  cursor: not-allowed;\n}\n",""])},function(e,t,n){t=e.exports=n(1)(void 0),t.push([e.i,'\n.auto-textarea-wrapper {\n  position: relative;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  line-height: normal;\n}\n.auto-textarea-wrapper .auto-textarea-block {\n  display: block;\n  white-space: pre-wrap;\n  word-wrap: break-word !important;\n  visibility: hidden;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-size: 100%;\n}\n.auto-textarea-wrapper .auto-textarea-input {\n  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  overflow-y: hidden;\n  color: #2c3e50;\n}\n.auto-textarea-wrapper .auto-textarea-input.no-border {\n  outline: 0 none;\n  border: none !important;\n}\n.auto-textarea-wrapper .auto-textarea-input.no-resize {\n  resize: none;\n}\n',""])},function(e,t){e.exports={Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",amp:"&",AMP:"&",andand:"⩕",And:"⩓",and:"∧",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angmsd:"∡",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",apacir:"⩯",ap:"≈",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",barwed:"⌅",Barwed:"⌆",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",because:"∵",Because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxdl:"┐",boxdL:"╕",boxDl:"╖",boxDL:"╗",boxdr:"┌",boxdR:"╒",boxDr:"╓",boxDR:"╔",boxh:"─",boxH:"═",boxhd:"┬",boxHd:"╤",boxhD:"╥",boxHD:"╦",boxhu:"┴",boxHu:"╧",boxhU:"╨",boxHU:"╩",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxul:"┘",boxuL:"╛",boxUl:"╜",boxUL:"╝",boxur:"└",boxuR:"╘",boxUr:"╙",boxUR:"╚",boxv:"│",boxV:"║",boxvh:"┼",boxvH:"╪",boxVh:"╫",boxVH:"╬",boxvl:"┤",boxvL:"╡",boxVl:"╢",boxVL:"╣",boxvr:"├",boxvR:"╞",boxVr:"╟",boxVR:"╠",bprime:"‵",breve:"˘",Breve:"˘",brvbar:"¦",bscr:"𝒷",Bscr:"ℬ",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsolb:"⧅",bsol:"\\",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",capand:"⩄",capbrcup:"⩉",capcap:"⩋",cap:"∩",Cap:"⋒",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",centerdot:"·",CenterDot:"·",cfr:"𝔠",Cfr:"ℭ",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cir:"○",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",colon:":",Colon:"∷",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",conint:"∮",Conint:"∯",ContourIntegral:"∮",copf:"𝕔",Copf:"ℂ",coprod:"∐",Coproduct:"∐",copy:"©",COPY:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",cross:"✗",Cross:"⨯",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",cupbrcap:"⩈",cupcap:"⩆",CupCap:"≍",cup:"∪",Cup:"⋓",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",dagger:"†",Dagger:"‡",daleth:"ℸ",darr:"↓",Darr:"↡",dArr:"⇓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",ddagger:"‡",ddarr:"⇊",DD:"ⅅ",dd:"ⅆ",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",diamond:"⋄",Diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrowBar:"⤓",downarrow:"↓",DownArrow:"↓",Downarrow:"⇓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVectorBar:"⥖",DownLeftVector:"↽",DownRightTeeVector:"⥟",DownRightVectorBar:"⥗",DownRightVector:"⇁",DownTeeArrow:"↧",DownTee:"⊤",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",Ecirc:"Ê",ecirc:"ê",ecir:"≖",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",edot:"ė",eDot:"≑",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp13:" ",emsp14:" ",emsp:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",escr:"ℯ",Escr:"ℰ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",exponentiale:"ⅇ",ExponentialE:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",forall:"∀",ForAll:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",fscr:"𝒻",Fscr:"ℱ",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",ge:"≥",gE:"≧",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",gescc:"⪩",ges:"⩾",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",gg:"≫",Gg:"⋙",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gla:"⪥",gl:"≷",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gne:"⪈",gnE:"≩",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",gtcc:"⪧",gtcir:"⩺",gt:">",GT:">",Gt:"≫",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",harrcir:"⥈",harr:"↔",hArr:"⇔",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",hfr:"𝔥",Hfr:"ℌ",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",hopf:"𝕙",Hopf:"ℍ",horbar:"―",HorizontalLine:"─",hscr:"𝒽",Hscr:"ℋ",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",ifr:"𝔦",Ifr:"ℑ",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",Im:"ℑ",imof:"⊷",imped:"Ƶ",Implies:"⇒",incare:"℅",in:"∈",infin:"∞",infintie:"⧝",inodot:"ı",intcal:"⊺",int:"∫",Int:"∬",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",iscr:"𝒾",Iscr:"ℐ",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",lang:"⟨",Lang:"⟪",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",larrb:"⇤",larrbfs:"⤟",larr:"←",Larr:"↞",lArr:"⇐",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",latail:"⤙",lAtail:"⤛",lat:"⪫",late:"⪭",lates:"⪭︀",lbarr:"⤌",lBarr:"⤎",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",le:"≤",lE:"≦",LeftAngleBracket:"⟨",LeftArrowBar:"⇤",leftarrow:"←",LeftArrow:"←",Leftarrow:"⇐",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVectorBar:"⥙",LeftDownVector:"⇃",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",leftrightarrow:"↔",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTeeArrow:"↤",LeftTee:"⊣",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangleBar:"⧏",LeftTriangle:"⊲",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVectorBar:"⥘",LeftUpVector:"↿",LeftVectorBar:"⥒",LeftVector:"↼",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",lescc:"⪨",les:"⩽",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",llarr:"⇇",ll:"≪",Ll:"⋘",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoustache:"⎰",lmoust:"⎰",lnap:"⪉",lnapprox:"⪉",lne:"⪇",lnE:"≨",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",longleftarrow:"⟵",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftrightarrow:"⟷",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longmapsto:"⟼",longrightarrow:"⟶",LongRightArrow:"⟶",Longrightarrow:"⟹",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",lscr:"𝓁",Lscr:"ℒ",lsh:"↰",Lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",ltcc:"⪦",ltcir:"⩹",lt:"<",LT:"<",Lt:"≪",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",midast:"*",midcir:"⫰",mid:"∣",middot:"·",minusb:"⊟",minus:"−",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",mscr:"𝓂",Mscr:"ℳ",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natural:"♮",naturals:"ℕ",natur:"♮",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",nearhk:"⤤",nearr:"↗",neArr:"⇗",nearrow:"↗",ne:"≠",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:"\n",nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nharr:"↮",nhArr:"⇎",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlarr:"↚",nlArr:"⇍",nldr:"‥",nlE:"≦̸",nle:"≰",nleftarrow:"↚",nLeftarrow:"⇍",nleftrightarrow:"↮",nLeftrightarrow:"⇎",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",nopf:"𝕟",Nopf:"ℕ",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangleBar:"⧏̸",NotLeftTriangle:"⋪",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangleBar:"⧐̸",NotRightTriangle:"⋫",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",nparallel:"∦",npar:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",nprec:"⊀",npreceq:"⪯̸",npre:"⪯̸",nrarrc:"⤳̸",nrarr:"↛",nrArr:"⇏",nrarrw:"↝̸",nrightarrow:"↛",nRightarrow:"⇏",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nvdash:"⊬",nvDash:"⊭",nVdash:"⊮",nVDash:"⊯",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwarr:"↖",nwArr:"⇖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",Ocirc:"Ô",ocirc:"ô",ocir:"⊚",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",orarr:"↻",Or:"⩔",or:"∨",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",otimesas:"⨶",Otimes:"⨷",otimes:"⊗",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",para:"¶",parallel:"∥",par:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plus:"+",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",popf:"𝕡",Popf:"ℙ",pound:"£",prap:"⪷",Pr:"⪻",pr:"≺",prcue:"≼",precapprox:"⪷",prec:"≺",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",pre:"⪯",prE:"⪳",precsim:"≾",prime:"′",Prime:"″",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportional:"∝",Proportion:"∷",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",qopf:"𝕢",Qopf:"ℚ",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",quot:'"',QUOT:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",rang:"⟩",Rang:"⟫",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarr:"→",Rarr:"↠",rArr:"⇒",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",ratail:"⤚",rAtail:"⤜",ratio:"∶",rationals:"ℚ",rbarr:"⤍",rBarr:"⤏",RBarr:"⤐",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",Re:"ℜ",rect:"▭",reg:"®",REG:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",rfr:"𝔯",Rfr:"ℜ",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrowBar:"⇥",rightarrow:"→",RightArrow:"→",Rightarrow:"⇒",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVectorBar:"⥕",RightDownVector:"⇂",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTeeArrow:"↦",RightTee:"⊢",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangleBar:"⧐",RightTriangle:"⊳",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVectorBar:"⥔",RightUpVector:"↾",RightVectorBar:"⥓",RightVector:"⇀",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoustache:"⎱",rmoust:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",ropf:"𝕣",Ropf:"ℝ",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",rscr:"𝓇",Rscr:"ℛ",rsh:"↱",Rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",scap:"⪸",Scaron:"Š",scaron:"š",Sc:"⪼",sc:"≻",sccue:"≽",sce:"⪰",scE:"⪴",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdotb:"⊡",sdot:"⋅",sdote:"⩦",searhk:"⤥",searr:"↘",seArr:"⇘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",solbar:"⌿",solb:"⧄",sol:"/",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",square:"□",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squ:"□",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",sub:"⊂",Sub:"⋐",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",subset:"⊂",Subset:"⋐",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succapprox:"⪸",succ:"≻",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",sum:"∑",Sum:"∑",sung:"♪",sup1:"¹",sup2:"²",sup3:"³",sup:"⊃",Sup:"⋑",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",supset:"⊃",Supset:"⋑",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swarr:"↙",swArr:"⇙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"\t",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",therefore:"∴",Therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",ThinSpace:" ",thinsp:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",tilde:"˜",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",timesbar:"⨱",timesb:"⊠",times:"×",timesd:"⨰",tint:"∭",toea:"⤨",topbot:"⌶",topcir:"⫱",top:"⊤",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",trade:"™",TRADE:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",uarr:"↑",Uarr:"↟",uArr:"⇑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrowBar:"⤒",uparrow:"↑",UpArrow:"↑",Uparrow:"⇑",UpArrowDownArrow:"⇅",updownarrow:"↕",UpDownArrow:"↕",Updownarrow:"⇕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",upsi:"υ",Upsi:"ϒ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTeeArrow:"↥",UpTee:"⊥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",varr:"↕",vArr:"⇕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",vBar:"⫨",Vbar:"⫫",vBarv:"⫩",Vcy:"В",vcy:"в",vdash:"⊢",vDash:"⊨",Vdash:"⊩",VDash:"⊫",Vdashl:"⫦",veebar:"⊻",vee:"∨",Vee:"⋁",veeeq:"≚",vellip:"⋮",verbar:"|",Verbar:"‖",vert:"|",Vert:"‖",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",wedge:"∧",Wedge:"⋀",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xharr:"⟷",xhArr:"⟺",Xi:"Ξ",xi:"ξ",xlarr:"⟵",xlArr:"⟸",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrarr:"⟶",xrArr:"⟹",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",yuml:"ÿ",Yuml:"Ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",zfr:"𝔷",Zfr:"ℨ",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",zopf:"𝕫",Zopf:"ℤ",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";var r=n(167);r.hljs_1c=function(e,t){n.e(175).then(function(){r.registerLanguage("1c",n(304)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_abnf=function(e,t){n.e(174).then(function(){r.registerLanguage("abnf",n(305)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_accesslog=function(e,t){n.e(173).then(function(){r.registerLanguage("accesslog",n(306)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_actionscript=function(e,t){n.e(172).then(function(){r.registerLanguage("actionscript",n(307)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ada=function(e,t){n.e(171).then(function(){r.registerLanguage("ada",n(308)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_apache=function(e,t){n.e(170).then(function(){r.registerLanguage("apache",n(309)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_applescript=function(e,t){n.e(169).then(function(){r.registerLanguage("applescript",n(310)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_arduino=function(e,t){n.e(168).then(function(){r.registerLanguage("arduino",n(311)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_armasm=function(e,t){n.e(167).then(function(){r.registerLanguage("armasm",n(312)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_asciidoc=function(e,t){n.e(166).then(function(){r.registerLanguage("asciidoc",n(313)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_aspectj=function(e,t){n.e(165).then(function(){r.registerLanguage("aspectj",n(314)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_autohotkey=function(e,t){n.e(164).then(function(){r.registerLanguage("autohotkey",n(315)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_autoit=function(e,t){n.e(163).then(function(){r.registerLanguage("autoit",n(316)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_avrasm=function(e,t){n.e(162).then(function(){r.registerLanguage("avrasm",n(317)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_awk=function(e,t){n.e(161).then(function(){r.registerLanguage("awk",n(318)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_axapta=function(e,t){n.e(160).then(function(){r.registerLanguage("axapta",n(319)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_bash=function(e,t){n.e(159).then(function(){r.registerLanguage("bash",n(320)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_basic=function(e,t){n.e(158).then(function(){r.registerLanguage("basic",n(321)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_bnf=function(e,t){n.e(157).then(function(){r.registerLanguage("bnf",n(322)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_brainfuck=function(e,t){n.e(156).then(function(){r.registerLanguage("brainfuck",n(323)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_cal=function(e,t){n.e(155).then(function(){r.registerLanguage("cal",n(324)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_capnproto=function(e,t){n.e(154).then(function(){r.registerLanguage("capnproto",n(325)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ceylon=function(e,t){n.e(153).then(function(){r.registerLanguage("ceylon",n(326)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_clean=function(e,t){n.e(152).then(function(){r.registerLanguage("clean",n(327)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_clojure_repl=function(e,t){n.e(151).then(function(){r.registerLanguage("clojure-repl",n(328)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_clojure=function(e,t){n.e(150).then(function(){r.registerLanguage("clojure",n(329)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_cmake=function(e,t){n.e(149).then(function(){r.registerLanguage("cmake",n(330)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_coffeescript=function(e,t){n.e(148).then(function(){r.registerLanguage("coffeescript",n(331)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_coq=function(e,t){n.e(147).then(function(){r.registerLanguage("coq",n(332)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_cos=function(e,t){n.e(146).then(function(){r.registerLanguage("cos",n(333)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_cpp=function(e,t){n.e(145).then(function(){r.registerLanguage("cpp",n(334)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_crmsh=function(e,t){n.e(144).then(function(){r.registerLanguage("crmsh",n(335)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_crystal=function(e,t){n.e(143).then(function(){r.registerLanguage("crystal",n(336)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_cs=function(e,t){n.e(142).then(function(){r.registerLanguage("cs",n(337)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_csp=function(e,t){n.e(141).then(function(){r.registerLanguage("csp",n(338)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_css=function(e,t){n.e(140).then(function(){r.registerLanguage("css",n(339)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_d=function(e,t){n.e(139).then(function(){r.registerLanguage("d",n(340)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dart=function(e,t){n.e(138).then(function(){r.registerLanguage("dart",n(341)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_delphi=function(e,t){n.e(137).then(function(){r.registerLanguage("delphi",n(342)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_diff=function(e,t){n.e(136).then(function(){r.registerLanguage("diff",n(343)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_django=function(e,t){n.e(135).then(function(){r.registerLanguage("django",n(344)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dns=function(e,t){n.e(134).then(function(){r.registerLanguage("dns",n(345)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dockerfile=function(e,t){n.e(133).then(function(){r.registerLanguage("dockerfile",n(346)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dos=function(e,t){n.e(132).then(function(){r.registerLanguage("dos",n(347)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dsconfig=function(e,t){n.e(131).then(function(){r.registerLanguage("dsconfig",n(348)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dts=function(e,t){n.e(130).then(function(){r.registerLanguage("dts",n(349)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_dust=function(e,t){n.e(129).then(function(){r.registerLanguage("dust",n(350)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ebnf=function(e,t){n.e(128).then(function(){r.registerLanguage("ebnf",n(351)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_elixir=function(e,t){n.e(127).then(function(){r.registerLanguage("elixir",n(352)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_elm=function(e,t){n.e(126).then(function(){r.registerLanguage("elm",n(353)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_erb=function(e,t){n.e(125).then(function(){r.registerLanguage("erb",n(354)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_erlang_repl=function(e,t){n.e(124).then(function(){r.registerLanguage("erlang-repl",n(355)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_erlang=function(e,t){n.e(123).then(function(){r.registerLanguage("erlang",n(356)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_excel=function(e,t){n.e(122).then(function(){r.registerLanguage("excel",n(357)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_fix=function(e,t){n.e(121).then(function(){r.registerLanguage("fix",n(358)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_flix=function(e,t){n.e(120).then(function(){r.registerLanguage("flix",n(359)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_fortran=function(e,t){n.e(119).then(function(){r.registerLanguage("fortran",n(360)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_fsharp=function(e,t){n.e(118).then(function(){r.registerLanguage("fsharp",n(361)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_gams=function(e,t){n.e(117).then(function(){r.registerLanguage("gams",n(362)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_gauss=function(e,t){n.e(116).then(function(){r.registerLanguage("gauss",n(363)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_gcode=function(e,t){n.e(115).then(function(){r.registerLanguage("gcode",n(364)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_gherkin=function(e,t){n.e(114).then(function(){r.registerLanguage("gherkin",n(365)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_glsl=function(e,t){n.e(113).then(function(){r.registerLanguage("glsl",n(366)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_go=function(e,t){n.e(112).then(function(){r.registerLanguage("go",n(367)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_golo=function(e,t){n.e(111).then(function(){r.registerLanguage("golo",n(368)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_gradle=function(e,t){n.e(110).then(function(){r.registerLanguage("gradle",n(369)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_groovy=function(e,t){n.e(109).then(function(){r.registerLanguage("groovy",n(370)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_haml=function(e,t){n.e(108).then(function(){r.registerLanguage("haml",n(371)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_handlebars=function(e,t){n.e(107).then(function(){r.registerLanguage("handlebars",n(372)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_haskell=function(e,t){n.e(106).then(function(){r.registerLanguage("haskell",n(373)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_haxe=function(e,t){n.e(105).then(function(){r.registerLanguage("haxe",n(374)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_hsp=function(e,t){n.e(104).then(function(){r.registerLanguage("hsp",n(375)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_htmlbars=function(e,t){n.e(103).then(function(){r.registerLanguage("htmlbars",n(376)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_http=function(e,t){n.e(102).then(function(){r.registerLanguage("http",n(377)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_hy=function(e,t){n.e(101).then(function(){r.registerLanguage("hy",n(378)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_inform7=function(e,t){n.e(100).then(function(){r.registerLanguage("inform7",n(379)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ini=function(e,t){n.e(99).then(function(){r.registerLanguage("ini",n(380)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_irpf90=function(e,t){n.e(98).then(function(){r.registerLanguage("irpf90",n(381)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_java=function(e,t){n.e(97).then(function(){r.registerLanguage("java",n(382)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_javascript=function(e,t){n.e(96).then(function(){r.registerLanguage("javascript",n(383)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_jboss_cli=function(e,t){n.e(95).then(function(){r.registerLanguage("jboss-cli",n(384)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_json=function(e,t){n.e(94).then(function(){r.registerLanguage("json",n(385)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_julia_repl=function(e,t){n.e(93).then(function(){r.registerLanguage("julia-repl",n(386)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_julia=function(e,t){n.e(92).then(function(){r.registerLanguage("julia",n(387)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_kotlin=function(e,t){n.e(91).then(function(){r.registerLanguage("kotlin",n(388)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_lasso=function(e,t){n.e(90).then(function(){r.registerLanguage("lasso",n(389)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ldif=function(e,t){n.e(89).then(function(){r.registerLanguage("ldif",n(390)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_leaf=function(e,t){n.e(88).then(function(){r.registerLanguage("leaf",n(391)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_less=function(e,t){n.e(87).then(function(){r.registerLanguage("less",n(392)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_lisp=function(e,t){n.e(86).then(function(){r.registerLanguage("lisp",n(393)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_livecodeserver=function(e,t){n.e(85).then(function(){r.registerLanguage("livecodeserver",n(394)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_livescript=function(e,t){n.e(84).then(function(){r.registerLanguage("livescript",n(395)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_llvm=function(e,t){n.e(83).then(function(){r.registerLanguage("llvm",n(396)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_lsl=function(e,t){n.e(82).then(function(){r.registerLanguage("lsl",n(397)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_lua=function(e,t){n.e(81).then(function(){r.registerLanguage("lua",n(398)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_makefile=function(e,t){n.e(80).then(function(){r.registerLanguage("makefile",n(399)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_markdown=function(e,t){n.e(79).then(function(){r.registerLanguage("markdown",n(400)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mathematica=function(e,t){n.e(78).then(function(){r.registerLanguage("mathematica",n(401)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_matlab=function(e,t){n.e(77).then(function(){r.registerLanguage("matlab",n(402)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_maxima=function(e,t){n.e(76).then(function(){r.registerLanguage("maxima",n(403)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mel=function(e,t){n.e(75).then(function(){r.registerLanguage("mel",n(404)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mercury=function(e,t){n.e(74).then(function(){r.registerLanguage("mercury",n(405)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mipsasm=function(e,t){n.e(73).then(function(){r.registerLanguage("mipsasm",n(406)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mizar=function(e,t){n.e(72).then(function(){r.registerLanguage("mizar",n(407)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_mojolicious=function(e,t){n.e(71).then(function(){r.registerLanguage("mojolicious",n(408)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_monkey=function(e,t){n.e(70).then(function(){r.registerLanguage("monkey",n(409)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_moonscript=function(e,t){n.e(69).then(function(){r.registerLanguage("moonscript",n(410)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_n1ql=function(e,t){n.e(68).then(function(){r.registerLanguage("n1ql",n(411)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_nginx=function(e,t){n.e(67).then(function(){r.registerLanguage("nginx",n(412)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_nimrod=function(e,t){n.e(66).then(function(){r.registerLanguage("nimrod",n(413)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_nix=function(e,t){n.e(65).then(function(){r.registerLanguage("nix",n(414)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_nsis=function(e,t){n.e(64).then(function(){r.registerLanguage("nsis",n(415)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_objectivec=function(e,t){n.e(63).then(function(){r.registerLanguage("objectivec",n(416)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ocaml=function(e,t){n.e(62).then(function(){r.registerLanguage("ocaml",n(417)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_openscad=function(e,t){n.e(61).then(function(){r.registerLanguage("openscad",n(418)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_oxygene=function(e,t){n.e(60).then(function(){r.registerLanguage("oxygene",n(419)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_parser3=function(e,t){n.e(59).then(function(){r.registerLanguage("parser3",n(420)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_perl=function(e,t){n.e(58).then(function(){r.registerLanguage("perl",n(421)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_pf=function(e,t){n.e(57).then(function(){r.registerLanguage("pf",n(422)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_php=function(e,t){n.e(56).then(function(){r.registerLanguage("php",n(423)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_pony=function(e,t){n.e(55).then(function(){r.registerLanguage("pony",n(424)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_powershell=function(e,t){n.e(54).then(function(){r.registerLanguage("powershell",n(425)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_processing=function(e,t){n.e(53).then(function(){r.registerLanguage("processing",n(426)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_profile=function(e,t){n.e(52).then(function(){r.registerLanguage("profile",n(427)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_prolog=function(e,t){n.e(51).then(function(){r.registerLanguage("prolog",n(428)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_protobuf=function(e,t){n.e(50).then(function(){r.registerLanguage("protobuf",n(429)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_puppet=function(e,t){n.e(49).then(function(){r.registerLanguage("puppet",n(430)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_purebasic=function(e,t){n.e(48).then(function(){r.registerLanguage("purebasic",n(431)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_python=function(e,t){n.e(47).then(function(){r.registerLanguage("python",n(432)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_q=function(e,t){n.e(46).then(function(){r.registerLanguage("q",n(433)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_qml=function(e,t){n.e(45).then(function(){r.registerLanguage("qml",n(434)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_r=function(e,t){n.e(44).then(function(){r.registerLanguage("r",n(435)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_rib=function(e,t){n.e(43).then(function(){r.registerLanguage("rib",n(436)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_roboconf=function(e,t){n.e(42).then(function(){r.registerLanguage("roboconf",n(437)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_routeros=function(e,t){n.e(41).then(function(){r.registerLanguage("routeros",n(438)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_rsl=function(e,t){n.e(40).then(function(){r.registerLanguage("rsl",n(439)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ruby=function(e,t){n.e(39).then(function(){r.registerLanguage("ruby",n(440)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_ruleslanguage=function(e,t){n.e(38).then(function(){r.registerLanguage("ruleslanguage",n(441)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_rust=function(e,t){n.e(37).then(function(){r.registerLanguage("rust",n(442)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_scala=function(e,t){n.e(36).then(function(){r.registerLanguage("scala",n(443)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_scheme=function(e,t){n.e(35).then(function(){r.registerLanguage("scheme",n(444)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_scilab=function(e,t){n.e(34).then(function(){r.registerLanguage("scilab",n(445)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_scss=function(e,t){n.e(33).then(function(){r.registerLanguage("scss",n(446)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_shell=function(e,t){n.e(32).then(function(){r.registerLanguage("shell",n(447)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_smali=function(e,t){n.e(31).then(function(){r.registerLanguage("smali",n(448)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_smalltalk=function(e,t){n.e(30).then(function(){r.registerLanguage("smalltalk",n(449)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_sml=function(e,t){n.e(29).then(function(){r.registerLanguage("sml",n(450)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_sqf=function(e,t){n.e(28).then(function(){r.registerLanguage("sqf",n(451)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_sql=function(e,t){n.e(27).then(function(){r.registerLanguage("sql",n(452)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_stan=function(e,t){n.e(26).then(function(){r.registerLanguage("stan",n(453)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_stata=function(e,t){n.e(25).then(function(){r.registerLanguage("stata",n(454)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_step21=function(e,t){n.e(24).then(function(){r.registerLanguage("step21",n(455)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_stylus=function(e,t){n.e(23).then(function(){r.registerLanguage("stylus",n(456)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_subunit=function(e,t){n.e(22).then(function(){r.registerLanguage("subunit",n(457)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_swift=function(e,t){n.e(21).then(function(){r.registerLanguage("swift",n(458)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_taggerscript=function(e,t){n.e(20).then(function(){r.registerLanguage("taggerscript",n(459)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_tap=function(e,t){n.e(19).then(function(){r.registerLanguage("tap",n(460)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_tcl=function(e,t){n.e(18).then(function(){r.registerLanguage("tcl",n(461)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_tex=function(e,t){n.e(17).then(function(){r.registerLanguage("tex",n(462)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_thrift=function(e,t){n.e(16).then(function(){r.registerLanguage("thrift",n(463)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_tp=function(e,t){n.e(15).then(function(){r.registerLanguage("tp",n(464)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_twig=function(e,t){n.e(14).then(function(){r.registerLanguage("twig",n(465)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_typescript=function(e,t){n.e(13).then(function(){r.registerLanguage("typescript",n(466)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vala=function(e,t){n.e(12).then(function(){r.registerLanguage("vala",n(467)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vbnet=function(e,t){n.e(11).then(function(){r.registerLanguage("vbnet",n(468)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vbscript_html=function(e,t){n.e(10).then(function(){r.registerLanguage("vbscript-html",n(469)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vbscript=function(e,t){n.e(9).then(function(){r.registerLanguage("vbscript",n(470)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_verilog=function(e,t){n.e(8).then(function(){r.registerLanguage("verilog",n(471)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vhdl=function(e,t){n.e(7).then(function(){r.registerLanguage("vhdl",n(472)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_vim=function(e,t){n.e(6).then(function(){r.registerLanguage("vim",n(473)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_x86asm=function(e,t){n.e(5).then(function(){r.registerLanguage("x86asm",n(474)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_xl=function(e,t){n.e(4).then(function(){r.registerLanguage("xl",n(475)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_xml=function(e,t){n.e(3).then(function(){r.registerLanguage("xml",n(476)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_xquery=function(e,t){n.e(2).then(function(){r.registerLanguage("xquery",n(477)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_yaml=function(e,t){n.e(1).then(function(){r.registerLanguage("yaml",n(478)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},r.hljs_zephir=function(e,t){n.e(0).then(function(){r.registerLanguage("zephir",n(479)),r.highlightBlock(e),t&&t()}.bind(null,n)).catch(n.oe)},t.a=r},function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__lang_hljs_js__=__webpack_require__(166),__WEBPACK_IMPORTED_MODULE_1__async_hljs_js__=__webpack_require__(164);__WEBPACK_IMPORTED_MODULE_1__async_hljs_js__.a.hljsBlock=function(dom,lang,callback){if(__WEBPACK_IMPORTED_MODULE_1__async_hljs_js__.a.getLanguage(lang))return __WEBPACK_IMPORTED_MODULE_1__async_hljs_js__.a.highlightBlock(dom),callback&&callback(),!0;if(__WEBPACK_IMPORTED_MODULE_0__lang_hljs_js__.a[lang]){var fuc_name="this.hljs_"+__WEBPACK_IMPORTED_MODULE_0__lang_hljs_js__.a[lang];return eval(fuc_name)(dom,callback),!0}return!1},__webpack_exports__.a=__WEBPACK_IMPORTED_MODULE_1__async_hljs_js__.a},function(e,t,n){"use strict";t.a={"1c":"1c",abnf:"abnf",accesslog:"accesslog",actionscript:"actionscript",as:"actionscript",ada:"ada",apache:"apache",apacheconf:"apache",applescript:"applescript",osascript:"applescript",arduino:"arduino",armasm:"armasm",arm:"armasm",asciidoc:"asciidoc",adoc:"asciidoc",aspectj:"aspectj",autohotkey:"autohotkey",ahk:"autohotkey",autoit:"autoit",avrasm:"avrasm",awk:"awk",axapta:"axapta",bash:"bash",sh:"bash",zsh:"bash",basic:"basic",bnf:"bnf",brainfuck:"brainfuck",bf:"brainfuck",cal:"cal",capnproto:"capnproto",capnp:"capnproto",ceylon:"ceylon",clean:"clean",icl:"clean",dcl:"clean","clojure-repl":"clojure_repl",clojure:"clojure",clj:"clojure",cmake:"cmake","cmake.in":"cmake",coffeescript:"coffeescript",coffee:"coffeescript",cson:"coffeescript",iced:"coffeescript",coq:"coq",cos:"cos",cls:"cos",cpp:"cpp",c:"cpp",cc:"cpp",h:"cpp","c++":"cpp","h++":"cpp",hpp:"cpp",crmsh:"crmsh",crm:"crmsh",pcmk:"crmsh",crystal:"crystal",cr:"crystal",cs:"cs",csharp:"cs",csp:"csp",css:"css",d:"d",dart:"dart",delphi:"delphi",dpr:"delphi",dfm:"delphi",pas:"delphi",pascal:"delphi",freepascal:"delphi",lazarus:"delphi",lpr:"delphi",lfm:"delphi",diff:"diff",patch:"diff",django:"django",jinja:"django",dns:"dns",bind:"dns",zone:"dns",dockerfile:"dockerfile",docker:"dockerfile",dos:"dos",bat:"dos",cmd:"dos",dsconfig:"dsconfig",dts:"dts",dust:"dust",dst:"dust",ebnf:"ebnf",elixir:"elixir",elm:"elm",erb:"erb","erlang-repl":"erlang_repl",erlang:"erlang",erl:"erlang",excel:"excel",xlsx:"excel",xls:"excel",fix:"fix",flix:"flix",fortran:"fortran",f90:"fortran",f95:"fortran",fsharp:"fsharp",fs:"fsharp",gams:"gams",gms:"gams",gauss:"gauss",gss:"gauss",gcode:"gcode",nc:"gcode",gherkin:"gherkin",feature:"gherkin",glsl:"glsl",go:"go",golang:"go",golo:"golo",gradle:"gradle",groovy:"groovy",haml:"haml",handlebars:"handlebars",hbs:"handlebars","html.hbs":"handlebars","html.handlebars":"handlebars",haskell:"haskell",hs:"haskell",haxe:"haxe",hx:"haxe",hsp:"hsp",htmlbars:"htmlbars",http:"http",https:"http",hy:"hy",hylang:"hy",inform7:"inform7",i7:"inform7",ini:"ini",toml:"ini",irpf90:"irpf90",java:"java",jsp:"java",javascript:"javascript",js:"javascript",jsx:"javascript","jboss-cli":"jboss_cli","wildfly-cli":"jboss_cli",json:"json","julia-repl":"julia_repl",julia:"julia",kotlin:"kotlin",lasso:"lasso",ls:"livescript",lassoscript:"lasso",ldif:"ldif",leaf:"leaf",less:"less",lisp:"lisp",livecodeserver:"livecodeserver",livescript:"livescript",llvm:"llvm",lsl:"lsl",lua:"lua",makefile:"makefile",mk:"makefile",mak:"makefile",markdown:"markdown",md:"markdown",mkdown:"markdown",mkd:"markdown",mathematica:"mathematica",mma:"mathematica",matlab:"matlab",maxima:"maxima",mel:"mel",mercury:"mercury",m:"mercury",moo:"mercury",mipsasm:"mipsasm",mips:"mipsasm",mizar:"mizar",mojolicious:"mojolicious",monkey:"monkey",moonscript:"moonscript",moon:"moonscript",n1ql:"n1ql",nginx:"nginx",nginxconf:"nginx",nimrod:"nimrod",nim:"nimrod",nix:"nix",nixos:"nix",nsis:"nsis",objectivec:"objectivec",mm:"objectivec",objc:"objectivec","obj-c":"objectivec",ocaml:"ocaml",ml:"sml",openscad:"openscad",scad:"openscad",oxygene:"oxygene",parser3:"parser3",perl:"perl",pl:"perl",pm:"perl",pf:"pf","pf.conf":"pf",php:"php",php3:"php",php4:"php",php5:"php",php6:"php",pony:"pony",powershell:"powershell",ps:"powershell",processing:"processing",profile:"profile",prolog:"prolog",protobuf:"protobuf",puppet:"puppet",pp:"puppet",purebasic:"purebasic",pb:"purebasic",pbi:"purebasic",python:"python",py:"python",gyp:"python",q:"q",k:"q",kdb:"q",qml:"qml",qt:"qml",r:"r",rib:"rib",roboconf:"roboconf",graph:"roboconf",instances:"roboconf",routeros:"routeros",mikrotik:"routeros",rsl:"rsl",ruby:"ruby",rb:"ruby",gemspec:"ruby",podspec:"ruby",thor:"ruby",irb:"ruby",ruleslanguage:"ruleslanguage",rust:"rust",rs:"rust",scala:"scala",scheme:"scheme",scilab:"scilab",sci:"scilab",scss:"scss",shell:"shell",console:"shell",smali:"smali",smalltalk:"smalltalk",st:"smalltalk",sml:"sml",sqf:"sqf",sql:"sql",stan:"stan",stata:"stata",do:"stata",ado:"stata",step21:"step21",p21:"step21",step:"step21",stp:"step21",stylus:"stylus",styl:"stylus",subunit:"subunit",swift:"swift",taggerscript:"taggerscript",tap:"tap",tcl:"tcl",tk:"tcl",tex:"tex",thrift:"thrift",tp:"tp",twig:"twig",craftcms:"twig",typescript:"typescript",ts:"typescript",vala:"vala",vbnet:"vbnet",vb:"vbnet","vbscript-html":"vbscript_html",vbscript:"vbscript",vbs:"vbscript",verilog:"verilog",v:"verilog",sv:"verilog",svh:"verilog",vhdl:"vhdl",vim:"vim",x86asm:"x86asm",xl:"xl",tao:"xl",xml:"xml",html:"xml",xhtml:"xml",rss:"xml",atom:"xml",xjb:"xml",xsd:"xml",xsl:"xml",plist:"xml",xquery:"xquery",xpath:"xquery",xq:"xquery",yaml:"yaml",yml:"yaml",YAML:"yaml",zephir:"zephir",zep:"zephir"}},function(e,t,n){!function(e){"object"==typeof window&&window||"object"==typeof self&&self;e(t)}(function(e){function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function n(e){return e.nodeName.toLowerCase()}function r(e,t){var n=e&&e.exec(t);return n&&0===n.index}function i(e){return A.test(e)}function o(e){var t,n,r,o,a=e.className+" ";if(a+=e.parentNode?e.parentNode.className:"",n=E.exec(a))return k(n[1])?n[1]:"no-highlight";for(a=a.split(/\s+/),t=0,r=a.length;t<r;t++)if(o=a[t],i(o)||k(o))return o}function a(e){var t,n={},r=Array.prototype.slice.call(arguments,1);for(t in e)n[t]=e[t];return r.forEach(function(e){for(t in e)n[t]=e[t]}),n}function s(e){var t=[];return function e(r,i){for(var o=r.firstChild;o;o=o.nextSibling)3===o.nodeType?i+=o.nodeValue.length:1===o.nodeType&&(t.push({event:"start",offset:i,node:o}),i=e(o,i),n(o).match(/br|hr|img|input/)||t.push({event:"stop",offset:i,node:o}));return i}(e,0),t}function l(e,r,i){function o(){return e.length&&r.length?e[0].offset!==r[0].offset?e[0].offset<r[0].offset?e:r:"start"===r[0].event?e:r:e.length?e:r}function a(e){function r(e){return" "+e.nodeName+'="'+t(e.value).replace('"',"&quot;")+'"'}u+="<"+n(e)+w.map.call(e.attributes,r).join("")+">"}function s(e){u+="</"+n(e)+">"}function l(e){("start"===e.event?a:s)(e.node)}for(var c=0,u="",h=[];e.length||r.length;){var p=o();if(u+=t(i.substring(c,p[0].offset)),c=p[0].offset,p===e){h.reverse().forEach(s);do{l(p.splice(0,1)[0]),p=o()}while(p===e&&p.length&&p[0].offset===c);h.reverse().forEach(a)}else"start"===p[0].event?h.push(p[0].node):h.pop(),l(p.splice(0,1)[0])}return u+t(i.substr(c))}function c(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map(function(t){return a(e,{variants:null},t)})),e.cached_variants||e.endsWithParent&&[a(e)]||[e]}function u(e){function t(e){return e&&e.source||e}function n(n,r){return new RegExp(t(n),"m"+(e.case_insensitive?"i":"")+(r?"g":""))}function r(i,o){if(!i.compiled){if(i.compiled=!0,i.keywords=i.keywords||i.beginKeywords,i.keywords){var a={},s=function(t,n){e.case_insensitive&&(n=n.toLowerCase()),n.split(" ").forEach(function(e){var n=e.split("|");a[n[0]]=[t,n[1]?Number(n[1]):1]})};"string"==typeof i.keywords?s("keyword",i.keywords):x(i.keywords).forEach(function(e){s(e,i.keywords[e])}),i.keywords=a}i.lexemesRe=n(i.lexemes||/\w+/,!0),o&&(i.beginKeywords&&(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")\\b"),i.begin||(i.begin=/\B|\b/),i.beginRe=n(i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(i.endRe=n(i.end)),i.terminator_end=t(i.end)||"",i.endsWithParent&&o.terminator_end&&(i.terminator_end+=(i.end?"|":"")+o.terminator_end)),i.illegal&&(i.illegalRe=n(i.illegal)),null==i.relevance&&(i.relevance=1),i.contains||(i.contains=[]),i.contains=Array.prototype.concat.apply([],i.contains.map(function(e){return c("self"===e?i:e)})),i.contains.forEach(function(e){r(e,i)}),i.starts&&r(i.starts,o);var l=i.contains.map(function(e){return e.beginKeywords?"\\.?("+e.begin+")\\.?":e.begin}).concat([i.terminator_end,i.illegal]).map(t).filter(Boolean);i.terminators=l.length?n(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function h(e,n,i,o){function a(e,t){var n,i;for(n=0,i=t.contains.length;n<i;n++)if(r(t.contains[n].beginRe,e))return t.contains[n]}function s(e,t){if(r(e.endRe,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}if(e.endsWithParent)return s(e.parent,t)}function l(e,t){return!i&&r(t.illegalRe,e)}function c(e,t){var n=v.case_insensitive?t[0].toLowerCase():t[0];return e.keywords.hasOwnProperty(n)&&e.keywords[n]}function d(e,t,n,r){var i=r?"":D.classPrefix,o='<span class="'+i,a=n?"":L;return(o+=e+'">')+t+a}function f(){var e,n,r,i;if(!w.keywords)return t(A);for(i="",n=0,w.lexemesRe.lastIndex=0,r=w.lexemesRe.exec(A);r;)i+=t(A.substring(n,r.index)),e=c(w,r),e?(E+=e[1],i+=d(e[0],t(r[0]))):i+=t(r[0]),n=w.lexemesRe.lastIndex,r=w.lexemesRe.exec(A);return i+t(A.substr(n))}function g(){var e="string"==typeof w.subLanguage;if(e&&!C[w.subLanguage])return t(A);var n=e?h(w.subLanguage,A,!0,x[w.subLanguage]):p(A,w.subLanguage.length?w.subLanguage:void 0);return w.relevance>0&&(E+=n.relevance),e&&(x[w.subLanguage]=n.top),d(n.language,n.value,!1,!0)}function m(){j+=null!=w.subLanguage?g():f(),A=""}function _(e){j+=e.className?d(e.className,"",!0):"",w=Object.create(e,{parent:{value:w}})}function b(e,t){if(A+=e,null==t)return m(),0;var n=a(t,w);if(n)return n.skip?A+=t:(n.excludeBegin&&(A+=t),m(),n.returnBegin||n.excludeBegin||(A=t)),_(n,t),n.returnBegin?0:t.length;var r=s(w,t);if(r){var i=w;i.skip?A+=t:(i.returnEnd||i.excludeEnd||(A+=t),m(),i.excludeEnd&&(A=t));do{w.className&&(j+=L),w.skip||(E+=w.relevance),w=w.parent}while(w!==r.parent);return r.starts&&_(r.starts,""),i.returnEnd?0:t.length}if(l(t,w))throw new Error('Illegal lexeme "'+t+'" for mode "'+(w.className||"<unnamed>")+'"');return A+=t,t.length||1}var v=k(e);if(!v)throw new Error('Unknown language: "'+e+'"');u(v);var y,w=o||v,x={},j="";for(y=w;y!==v;y=y.parent)y.className&&(j=d(y.className,"",!0)+j);var A="",E=0;try{for(var S,T,M=0;;){if(w.terminators.lastIndex=M,!(S=w.terminators.exec(n)))break;T=b(n.substring(M,S.index),S[0]),M=S.index+T}for(b(n.substr(M)),y=w;y.parent;y=y.parent)y.className&&(j+=L);return{relevance:E,value:j,language:e,top:w}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{relevance:0,value:t(n)};throw e}}function p(e,n){n=n||D.languages||x(C);var r={relevance:0,value:t(e)},i=r;return n.filter(k).forEach(function(t){var n=h(t,e,!1);n.language=t,n.relevance>i.relevance&&(i=n),n.relevance>r.relevance&&(i=r,r=n)}),i.language&&(r.second_best=i),r}function d(e){return D.tabReplace||D.useBR?e.replace(S,function(e,t){return D.useBR&&"\n"===e?"<br>":D.tabReplace?t.replace(/\t/g,D.tabReplace):""}):e}function f(e,t,n){var r=t?j[t]:n,i=[e.trim()];return e.match(/\bhljs\b/)||i.push("hljs"),-1===e.indexOf(r)&&i.push(r),i.join(" ").trim()}function g(e){var t,n,r,a,c,u=o(e);i(u)||(D.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,c=t.textContent,r=u?h(u,c,!0):p(c),n=s(t),n.length&&(a=document.createElementNS("http://www.w3.org/1999/xhtml","div"),a.innerHTML=r.value,r.value=l(n,s(a),c)),r.value=d(r.value),e.innerHTML=r.value,e.className=f(e.className,u,r.language),e.result={language:r.language,re:r.relevance},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.relevance}))}function m(e){D=a(D,e)}function _(){if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");w.forEach.call(e,g)}}function b(){addEventListener("DOMContentLoaded",_,!1),addEventListener("load",_,!1)}function v(t,n){var r=C[t]=n(e);r.aliases&&r.aliases.forEach(function(e){j[e]=t})}function y(){return x(C)}function k(e){return e=(e||"").toLowerCase(),C[e]||C[j[e]]}var w=[],x=Object.keys,C={},j={},A=/^(no-?highlight|plain|text)$/i,E=/\blang(?:uage)?-([\w-]+)\b/i,S=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,L="</span>",D={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};return e.highlight=h,e.highlightAuto=p,e.fixMarkup=d,e.highlightBlock=g,e.configure=m,e.initHighlighting=_,e.initHighlightingOnLoad=b,e.registerLanguage=v,e.listLanguages=y,e.getLanguage=k,e.inherit=a,e.IDENT_RE="[a-zA-Z]\\w*",e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},e.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.COMMENT=function(t,n,r){var i=e.inherit({className:"comment",begin:t,end:n,contains:[]},r||{});return i.contains.push(e.PHRASAL_WORDS_MODE),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),i},e.C_LINE_COMMENT_MODE=e.COMMENT("//","$"),e.C_BLOCK_COMMENT_MODE=e.COMMENT("/\\*","\\*/"),e.HASH_COMMENT_MODE=e.COMMENT("#","$"),e.NUMBER_MODE={className:"number",begin:e.NUMBER_RE,relevance:0},e.C_NUMBER_MODE={className:"number",begin:e.C_NUMBER_RE,relevance:0},e.BINARY_NUMBER_MODE={className:"number",begin:e.BINARY_NUMBER_RE,relevance:0},e.CSS_NUMBER_MODE={className:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},e.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}]},e.TITLE_MODE={className:"title",begin:e.IDENT_RE,relevance:0},e.UNDERSCORE_TITLE_MODE={className:"title",begin:e.UNDERSCORE_IDENT_RE,relevance:0},e.METHOD_GUARD={begin:"\\.\\s*"+e.UNDERSCORE_IDENT_RE,relevance:0},e})},function(e,t,n){var r=n(6),i=n(54),o=n(174),a=n(180),s=n(4),l=function(e,t,n){s.clearNode(t);var r=new i(n),l=a(e,r),c=o(l,e,r).toNode();t.appendChild(c)};"undefined"!=typeof document&&"CSS1Compat"!==document.compatMode&&("undefined"!=typeof console&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),l=function(){throw new r("KaTeX doesn't work in quirks mode.")});var c=function(e,t){var n=new i(t),r=a(e,n);return o(r,e,n).toMarkup()},u=function(e,t){var n=new i(t);return a(e,n)};e.exports={render:l,renderToString:c,__parse:u,ParseError:r}},function(e,t,n){function r(e){this._input=e}function i(e,t,n){this.text=e,this.data=t,this.position=n}var o=n(244),a=n(6),s=new RegExp("([ \r\n\t]+)|(---?|[!-\\[\\]-‧‪-퟿豈-￿]|[�-�][�-�]|\\\\(?:[a-zA-Z]+|[^�-�]))"),l=/\s*/;r.prototype._innerLex=function(e,t){var n=this._input;if(e===n.length)return new i("EOF",null,e);var r=o(s,n,e);if(null===r)throw new a("Unexpected character: '"+n[e]+"'",this,e);return r[2]?new i(r[2],null,e+r[2].length):t?this._innerLex(e+r[1].length,!0):new i(" ",null,e+r[1].length)};var c=/#[a-z0-9]+|[a-z]+/i;r.prototype._innerLexColor=function(e){var t=this._input;e+=o(l,t,e)[0].length;var n;if(n=o(c,t,e))return new i(n[0],null,e+n[0].length);throw new a("Invalid color",this,e)};var u=/(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;r.prototype._innerLexSize=function(e){var t=this._input;e+=o(l,t,e)[0].length;var n;if(n=o(u,t,e)){var r=n[3];if("em"!==r&&"ex"!==r)throw new a("Invalid unit: '"+r+"'",this,e);return new i(n[0],{number:+(n[1]+n[2]),unit:r},e+n[0].length)}throw new a("Invalid size",this,e)},r.prototype._innerLexWhitespace=function(e){var t=this._input,n=o(l,t,e)[0];return e+=n.length,new i(n[0],null,e)},r.prototype.lex=function(e,t){return"math"===t?this._innerLex(e,!0):"text"===t?this._innerLex(e,!1):"color"===t?this._innerLexColor(e):"size"===t?this._innerLexSize(e):"whitespace"===t?this._innerLexWhitespace(e):void 0},e.exports=r},function(e,t){function n(e){this.style=e.style,this.color=e.color,this.size=e.size,this.phantom=e.phantom,this.font=e.font,void 0===e.parentStyle?this.parentStyle=e.style:this.parentStyle=e.parentStyle,void 0===e.parentSize?this.parentSize=e.size:this.parentSize=e.parentSize}n.prototype.extend=function(e){var t={style:this.style,size:this.size,color:this.color,parentStyle:this.style,parentSize:this.size,phantom:this.phantom,font:this.font};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return new n(t)},n.prototype.withStyle=function(e){return this.extend({style:e})},n.prototype.withSize=function(e){return this.extend({size:e})},n.prototype.withColor=function(e){return this.extend({color:e})},n.prototype.withPhantom=function(){return this.extend({phantom:!0})},n.prototype.withFont=function(e){return this.extend({font:e})},n.prototype.reset=function(){return this.extend({})};var r={"katex-blue":"#6495ed","katex-orange":"#ffa500","katex-pink":"#ff00af","katex-red":"#df0030","katex-green":"#28ae7b","katex-gray":"gray","katex-purple":"#9d38bd","katex-blueA":"#c7e9f1","katex-blueB":"#9cdceb","katex-blueC":"#58c4dd","katex-blueD":"#29abca","katex-blueE":"#1c758a","katex-tealA":"#acead7","katex-tealB":"#76ddc0","katex-tealC":"#5cd0b3","katex-tealD":"#55c1a7","katex-tealE":"#49a88f","katex-greenA":"#c9e2ae","katex-greenB":"#a6cf8c","katex-greenC":"#83c167","katex-greenD":"#77b05d","katex-greenE":"#699c52","katex-goldA":"#f7c797","katex-goldB":"#f9b775","katex-goldC":"#f0ac5f","katex-goldD":"#e1a158","katex-goldE":"#c78d46","katex-redA":"#f7a1a3","katex-redB":"#ff8080","katex-redC":"#fc6255","katex-redD":"#e65a4c","katex-redE":"#cf5044","katex-maroonA":"#ecabc1","katex-maroonB":"#ec92ab","katex-maroonC":"#c55f73","katex-maroonD":"#a24d61","katex-maroonE":"#94424f","katex-purpleA":"#caa3e8","katex-purpleB":"#b189c6","katex-purpleC":"#9a72ac","katex-purpleD":"#715582","katex-purpleE":"#644172","katex-mintA":"#f5f9e8","katex-mintB":"#edf2df","katex-mintC":"#e0e5cc","katex-grayA":"#fdfdfd","katex-grayB":"#f7f7f7","katex-grayC":"#eeeeee","katex-grayD":"#dddddd","katex-grayE":"#cccccc","katex-grayF":"#aaaaaa","katex-grayG":"#999999","katex-grayH":"#555555","katex-grayI":"#333333","katex-kaBlue":"#314453","katex-kaGreen":"#639b24"};n.prototype.getColor=function(){return this.phantom?"transparent":r[this.color]||this.color},e.exports=n},function(e,t,n){function r(e,t){this.lexer=new s(e),this.settings=t}function i(e,t){this.result=e,this.isFunction=t}var o=n(178),a=n(176),s=n(169),l=n(26),c=n(4),u=n(56),h=n(6),p=u.ParseNode;r.prototype.expect=function(e,t){if(this.nextToken.text!==e)throw new h("Expected '"+e+"', got '"+this.nextToken.text+"'",this.lexer,this.nextToken.position);!1!==t&&this.consume()},r.prototype.consume=function(){this.pos=this.nextToken.position,this.nextToken=this.lexer.lex(this.pos,this.mode)},r.prototype.parse=function(){return this.mode="math",this.pos=0,this.nextToken=this.lexer.lex(this.pos,this.mode),this.parseInput()},r.prototype.parseInput=function(){var e=this.parseExpression(!1);return this.expect("EOF",!1),e};var d=["}","\\end","\\right","&","\\\\","\\cr"];r.prototype.parseExpression=function(e,t){for(var n=[];;){var r=this.nextToken,i=this.pos;if(-1!==d.indexOf(r.text))break;if(t&&r.text===t)break;var o=this.parseAtom();if(!o){if(!this.settings.throwOnError&&"\\"===r.text[0]){var a=this.handleUnsupportedCmd();n.push(a),i=r.position;continue}break}if(e&&"infix"===o.type){this.pos=i,this.nextToken=r;break}n.push(o)}return this.handleInfixNodes(n)},r.prototype.handleInfixNodes=function(e){for(var t,n=-1,r=0;r<e.length;r++){var i=e[r];if("infix"===i.type){if(-1!==n)throw new h("only one infix operator per group",this.lexer,-1);n=r,t=i.value.replaceWith}}if(-1!==n){var o,a,s=e.slice(0,n),l=e.slice(n+1);o=1===s.length&&"ordgroup"===s[0].type?s[0]:new p("ordgroup",s,this.mode),a=1===l.length&&"ordgroup"===l[0].type?l[0]:new p("ordgroup",l,this.mode);var c=this.callFunction(t,[o,a],null);return[new p(c.type,c,this.mode)]}return e};r.prototype.handleSupSubscript=function(e){var t=this.nextToken.text,n=this.pos;this.consume();var r=this.parseGroup();if(r){if(r.isFunction){if(o[r.result].greediness>1)return this.parseFunction(r);throw new h("Got function '"+r.result+"' with no arguments as "+e,this.lexer,n+1)}return r.result}if(this.settings.throwOnError||"\\"!==this.nextToken.text[0])throw new h("Expected group after '"+t+"'",this.lexer,n+1);return this.handleUnsupportedCmd()},r.prototype.handleUnsupportedCmd=function(){for(var e=this.nextToken.text,t=[],n=0;n<e.length;n++)t.push(new p("textord",e[n],"text"));var r=new p("text",{body:t,type:"text"},this.mode),i=new p("color",{color:this.settings.errorColor,value:[r],type:"color"},this.mode);return this.consume(),i},r.prototype.parseAtom=function(){var e=this.parseImplicitGroup();if("text"===this.mode)return e;for(var t,n;;){var r=this.nextToken;if("\\limits"===r.text||"\\nolimits"===r.text){if(!e||"op"!==e.type)throw new h("Limit controls must follow a math operator",this.lexer,this.pos);var i="\\limits"===r.text;e.value.limits=i,e.value.alwaysHandleSupSub=!0,this.consume()}else if("^"===r.text){if(t)throw new h("Double superscript",this.lexer,this.pos);t=this.handleSupSubscript("superscript")}else if("_"===r.text){if(n)throw new h("Double subscript",this.lexer,this.pos);n=this.handleSupSubscript("subscript")}else{if("'"!==r.text)break;var o=new p("textord","\\prime",this.mode),a=[o];for(this.consume();"'"===this.nextToken.text;)a.push(o),this.consume();t=new p("ordgroup",a,this.mode)}}return t||n?new p("supsub",{base:e,sup:t,sub:n},this.mode):e};var f=["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],g=["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"];r.prototype.parseImplicitGroup=function(){var e=this.parseSymbol();if(null==e)return this.parseFunction();var t,n=e.result;if("\\left"===n){var r=this.parseFunction(e);t=this.parseExpression(!1),this.expect("\\right",!1);var i=this.parseFunction();return new p("leftright",{body:t,left:r.value.value,right:i.value.value},this.mode)}if("\\begin"===n){var o=this.parseFunction(e),s=o.value.name;if(!a.hasOwnProperty(s))throw new h("No such environment: "+s,this.lexer,o.value.namepos);var l=a[s],u=this.parseArguments("\\begin{"+s+"}",l),d={mode:this.mode,envName:s,parser:this,lexer:this.lexer,positions:u.pop()},m=l.handler(d,u);this.expect("\\end",!1);var _=this.parseFunction();if(_.value.name!==s)throw new h("Mismatch: \\begin{"+s+"} matched by \\end{"+_.value.name+"}",this.lexer);return m.position=_.position,m}return c.contains(f,n)?(t=this.parseExpression(!1),new p("sizing",{size:"size"+(c.indexOf(f,n)+1),value:t},this.mode)):c.contains(g,n)?(t=this.parseExpression(!0),new p("styling",{style:n.slice(1,n.length-5),value:t},this.mode)):this.parseFunction(e)},r.prototype.parseFunction=function(e){if(e||(e=this.parseGroup()),e){if(e.isFunction){var t=e.result,n=o[t];if("text"===this.mode&&!n.allowedInText)throw new h("Can't use function '"+t+"' in text mode",this.lexer,e.position);var r=this.parseArguments(t,n),i=this.callFunction(t,r,r.pop());return new p(i.type,i,this.mode)}return e.result}return null},r.prototype.callFunction=function(e,t,n){var r={funcName:e,parser:this,lexer:this.lexer,positions:n};return o[e].handler(r,t)},r.prototype.parseArguments=function(e,t){var n=t.numArgs+t.numOptionalArgs;if(0===n)return[[this.pos]];for(var r=t.greediness,a=[this.pos],s=[],l=0;l<n;l++){var c,u=t.argTypes&&t.argTypes[l];if(l<t.numOptionalArgs){if(!(c=u?this.parseSpecialGroup(u,!0):this.parseOptionalGroup())){s.push(null),a.push(this.pos);continue}}else if(!(c=u?this.parseSpecialGroup(u):this.parseGroup())){if(this.settings.throwOnError||"\\"!==this.nextToken.text[0])throw new h("Expected group after '"+e+"'",this.lexer,this.pos);c=new i(this.handleUnsupportedCmd(this.nextToken.text),!1)}var p;if(c.isFunction){if(!(o[c.result].greediness>r))throw new h("Got function '"+c.result+"' as argument to '"+e+"'",this.lexer,this.pos-1);p=this.parseFunction(c)}else p=c.result;s.push(p),a.push(this.pos)}return s.push(a),s},r.prototype.parseSpecialGroup=function(e,t){var n=this.mode;if("original"===e&&(e=n),"color"===e||"size"===e){var r=this.nextToken;if(t&&"["!==r.text)return null;this.mode=e,this.expect(t?"[":"{");var o=this.nextToken;this.mode=n;var a;return a="color"===e?o.text:o.data,this.consume(),this.expect(t?"]":"}"),new i(new p(e,a,n),!1)}if("text"===e){var s=this.lexer.lex(this.pos,"whitespace");this.pos=s.position}this.mode=e,this.nextToken=this.lexer.lex(this.pos,e);var l;return l=t?this.parseOptionalGroup():this.parseGroup(),this.mode=n,this.nextToken=this.lexer.lex(this.pos,n),l},r.prototype.parseGroup=function(){if("{"===this.nextToken.text){this.consume();var e=this.parseExpression(!1);return this.expect("}"),new i(new p("ordgroup",e,this.mode),!1)}return this.parseSymbol()},r.prototype.parseOptionalGroup=function(){if("["===this.nextToken.text){this.consume();var e=this.parseExpression(!1,"]");return this.expect("]"),new i(new p("ordgroup",e,this.mode),!1)}return null},r.prototype.parseSymbol=function(){var e=this.nextToken;return o[e.text]?(this.consume(),new i(e.text,!0)):l[this.mode][e.text]?(this.consume(),new i(new p(l[this.mode][e.text].group,e.text,this.mode),!1)):null},r.prototype.ParseNode=p,e.exports=r},function(e,t,n){var r=n(6),i=n(24),o=n(25),a=n(175),s=n(55),l=n(17),c=n(4),u=o.makeSpan,h=function(e,t,n){for(var r=[],i=0;i<e.length;i++){var o=e[i];r.push(v(o,t,n)),n=o}return r},p={mathord:"mord",textord:"mord",bin:"mbin",rel:"mrel",text:"mord",open:"mopen",close:"mclose",inner:"minner",genfrac:"mord",array:"mord",spacing:"mord",punct:"mpunct",ordgroup:"mord",op:"mop",katex:"mord",overline:"mord",underline:"mord",rule:"mord",leftright:"minner",sqrt:"mord",accent:"mord"},d=function(e){return null==e?p.mathord:"supsub"===e.type?d(e.value.base):"llap"===e.type||"rlap"===e.type?d(e.value):"color"===e.type?d(e.value.value):"sizing"===e.type?d(e.value.value):"styling"===e.type?d(e.value.value):"delimsizing"===e.type?p[e.value.delimType]:p[e.type]},f=function(e,t){return!!e&&("op"===e.type?e.value.limits&&(t.style.size===i.DISPLAY.size||e.value.alwaysHandleSupSub):"accent"===e.type?m(e.value.base):null)},g=function(e){return!!e&&("ordgroup"===e.type?1===e.value.length?g(e.value[0]):e:"color"===e.type&&1===e.value.value.length?g(e.value.value[0]):e)},m=function(e){var t=g(e);return"mathord"===t.type||"textord"===t.type||"bin"===t.type||"rel"===t.type||"inner"===t.type||"open"===t.type||"close"===t.type||"punct"===t.type},_=function(e){return u(["sizing","reset-"+e.size,"size5",e.style.reset(),i.TEXT.cls(),"nulldelimiter"])},b={};b.mathord=function(e,t,n){return o.makeOrd(e,t,"mathord")},b.textord=function(e,t,n){return o.makeOrd(e,t,"textord")},b.bin=function(e,t,n){for(var r="mbin",i=n;i&&"color"===i.type;){var a=i.value.value;i=a[a.length-1]}return n&&!c.contains(["mbin","mopen","mrel","mop","mpunct"],d(i))||(e.type="textord",r="mord"),o.mathsym(e.value,e.mode,t.getColor(),[r])},b.rel=function(e,t,n){return o.mathsym(e.value,e.mode,t.getColor(),["mrel"])},b.open=function(e,t,n){return o.mathsym(e.value,e.mode,t.getColor(),["mopen"])},b.close=function(e,t,n){return o.mathsym(e.value,e.mode,t.getColor(),["mclose"])},b.inner=function(e,t,n){return o.mathsym(e.value,e.mode,t.getColor(),["minner"])},b.punct=function(e,t,n){return o.mathsym(e.value,e.mode,t.getColor(),["mpunct"])},b.ordgroup=function(e,t,n){return u(["mord",t.style.cls()],h(e.value,t.reset()))},b.text=function(e,t,n){return u(["text","mord",t.style.cls()],h(e.value.body,t.reset()))},b.color=function(e,t,n){var r=h(e.value.value,t.withColor(e.value.color),n);return new o.makeFragment(r)},b.supsub=function(e,t,n){if(f(e.value.base,t))return b[e.value.base.type](e,t,n);var r,a,c,h,p=v(e.value.base,t.reset());e.value.sup&&(c=v(e.value.sup,t.withStyle(t.style.sup())),r=u([t.style.reset(),t.style.sup().cls()],[c])),e.value.sub&&(h=v(e.value.sub,t.withStyle(t.style.sub())),a=u([t.style.reset(),t.style.sub().cls()],[h]));var g,_;m(e.value.base)?(g=0,_=0):(g=p.height-l.metrics.supDrop,_=p.depth+l.metrics.subDrop);var y;y=t.style===i.DISPLAY?l.metrics.sup1:t.style.cramped?l.metrics.sup3:l.metrics.sup2;var k,w=i.TEXT.sizeMultiplier*t.style.sizeMultiplier,x=.5/l.metrics.ptPerEm/w+"em";if(e.value.sup)if(e.value.sub){g=Math.max(g,y,c.depth+.25*l.metrics.xHeight),_=Math.max(_,l.metrics.sub2);var C=l.metrics.defaultRuleThickness;if(g-c.depth-(h.height-_)<4*C){_=4*C-(g-c.depth)+h.height;var j=.8*l.metrics.xHeight-(g-c.depth);j>0&&(g+=j,_-=j)}k=o.makeVList([{type:"elem",elem:a,shift:_},{type:"elem",elem:r,shift:-g}],"individualShift",null,t),p instanceof s.symbolNode&&(k.children[0].style.marginLeft=-p.italic+"em"),k.children[0].style.marginRight=x,k.children[1].style.marginRight=x}else g=Math.max(g,y,c.depth+.25*l.metrics.xHeight),k=o.makeVList([{type:"elem",elem:r}],"shift",-g,t),k.children[0].style.marginRight=x;else _=Math.max(_,l.metrics.sub1,h.height-.8*l.metrics.xHeight),k=o.makeVList([{type:"elem",elem:a}],"shift",_,t),k.children[0].style.marginRight=x,p instanceof s.symbolNode&&(k.children[0].style.marginLeft=-p.italic+"em");return u([d(e.value.base)],[p,k])},b.genfrac=function(e,t,n){var r=t.style;"display"===e.value.size?r=i.DISPLAY:"text"===e.value.size&&(r=i.TEXT);var s,c=r.fracNum(),h=r.fracDen(),p=v(e.value.numer,t.withStyle(c)),d=u([r.reset(),c.cls()],[p]),f=v(e.value.denom,t.withStyle(h)),g=u([r.reset(),h.cls()],[f]);s=e.value.hasBarLine?l.metrics.defaultRuleThickness/t.style.sizeMultiplier:0;var m,b,y;r.size===i.DISPLAY.size?(m=l.metrics.num1,b=s>0?3*s:7*l.metrics.defaultRuleThickness,y=l.metrics.denom1):(s>0?(m=l.metrics.num2,b=s):(m=l.metrics.num3,b=3*l.metrics.defaultRuleThickness),y=l.metrics.denom2);var k;if(0===s){var w=m-p.depth-(f.height-y);w<b&&(m+=.5*(b-w),y+=.5*(b-w)),k=o.makeVList([{type:"elem",elem:g,shift:y},{type:"elem",elem:d,shift:-m}],"individualShift",null,t)}else{var x=l.metrics.axisHeight;m-p.depth-(x+.5*s)<b&&(m+=b-(m-p.depth-(x+.5*s))),x-.5*s-(f.height-y)<b&&(y+=b-(x-.5*s-(f.height-y)));var C=u([t.style.reset(),i.TEXT.cls(),"frac-line"]);C.height=s;var j=-(x-.5*s);k=o.makeVList([{type:"elem",elem:g,shift:y},{type:"elem",elem:C,shift:j},{type:"elem",elem:d,shift:-m}],"individualShift",null,t)}k.height*=r.sizeMultiplier/t.style.sizeMultiplier,k.depth*=r.sizeMultiplier/t.style.sizeMultiplier;var A;A=r.size===i.DISPLAY.size?l.metrics.delim1:l.metrics.getDelim2(r);var E,S;return E=null==e.value.leftDelim?_(t):a.customSizedDelim(e.value.leftDelim,A,!0,t.withStyle(r),e.mode),S=null==e.value.rightDelim?_(t):a.customSizedDelim(e.value.rightDelim,A,!0,t.withStyle(r),e.mode),u(["mord",t.style.reset(),r.cls()],[E,u(["mfrac"],[k]),S],t.getColor())},b.array=function(e,t,n){var i,a,s=e.value.body.length,h=0,p=new Array(s),d=1/l.metrics.ptPerEm,f=5*d,g=12*d,m=c.deflt(e.value.arraystretch,1),_=m*g,b=.7*_,y=.3*_,k=0;for(i=0;i<e.value.body.length;++i){var w=e.value.body[i],x=b,C=y;h<w.length&&(h=w.length);var j=new Array(w.length);for(a=0;a<w.length;++a){var A=v(w[a],t);C<A.depth&&(C=A.depth),x<A.height&&(x=A.height),j[a]=A}var E=0;if(e.value.rowGaps[i]){switch(E=e.value.rowGaps[i].value,E.unit){case"em":E=E.number;break;case"ex":E=E.number*l.metrics.emPerEx;break;default:console.error("Can't handle unit "+E.unit),E=0}E>0&&(E+=y,C<E&&(C=E),E=0)}j.height=x,j.depth=C,k+=x,j.pos=k,k+=C+E,p[i]=j}var S,L,D=k/2+l.metrics.axisHeight,T=e.value.cols||[],M=[];for(a=0,L=0;a<h||L<T.length;++a,++L){for(var z=T[L]||{},B=!0;"separator"===z.type;){if(B||(S=u(["arraycolsep"],[]),S.style.width=l.metrics.doubleRuleSep+"em",M.push(S)),"|"!==z.separator)throw new r("Invalid separator type: "+z.separator);var q=u(["vertical-separator"],[]);q.style.height=k+"em",q.style.verticalAlign=-(k-D)+"em",M.push(q),L++,z=T[L]||{},B=!1}if(!(a>=h)){var O;(a>0||e.value.hskipBeforeAndAfter)&&0!==(O=c.deflt(z.pregap,f))&&(S=u(["arraycolsep"],[]),S.style.width=O+"em",M.push(S));var R=[];for(i=0;i<s;++i){var P=p[i],F=P[a];if(F){var N=P.pos-D;F.depth=P.depth,F.height=P.height,R.push({type:"elem",elem:F,shift:N})}}R=o.makeVList(R,"individualShift",null,t),R=u(["col-align-"+(z.align||"c")],[R]),M.push(R),(a<h-1||e.value.hskipBeforeAndAfter)&&0!==(O=c.deflt(z.postgap,f))&&(S=u(["arraycolsep"],[]),S.style.width=O+"em",M.push(S))}}return p=u(["mtable"],M),u(["mord"],[p],t.getColor())},b.spacing=function(e,t,n){return"\\ "===e.value||"\\space"===e.value||" "===e.value||"~"===e.value?u(["mord","mspace"],[o.mathsym(e.value,e.mode)]):u(["mord","mspace",o.spacingFunctions[e.value].className])},b.llap=function(e,t,n){var r=u(["inner"],[v(e.value.body,t.reset())]),i=u(["fix"],[]);return u(["llap",t.style.cls()],[r,i])},b.rlap=function(e,t,n){var r=u(["inner"],[v(e.value.body,t.reset())]),i=u(["fix"],[]);return u(["rlap",t.style.cls()],[r,i])},b.op=function(e,t,n){var r,a,s=!1;"supsub"===e.type&&(r=e.value.sup,a=e.value.sub,e=e.value.base,s=!0);var h=["\\smallint"],p=!1;t.style.size===i.DISPLAY.size&&e.value.symbol&&!c.contains(h,e.value.body)&&(p=!0);var d,f=0,g=0;if(e.value.symbol){var m=p?"Size2-Regular":"Size1-Regular";d=o.makeSymbol(e.value.body,m,"math",t.getColor(),["op-symbol",p?"large-op":"small-op","mop"]),f=(d.height-d.depth)/2-l.metrics.axisHeight*t.style.sizeMultiplier,g=d.italic}else{for(var _=[],b=1;b<e.value.body.length;b++)_.push(o.mathsym(e.value.body[b],e.mode));d=u(["mop"],_,t.getColor())}if(s){d=u([],[d]);var y,k,w,x;if(r){var C=v(r,t.withStyle(t.style.sup()));y=u([t.style.reset(),t.style.sup().cls()],[C]),k=Math.max(l.metrics.bigOpSpacing1,l.metrics.bigOpSpacing3-C.depth)}if(a){var j=v(a,t.withStyle(t.style.sub()));w=u([t.style.reset(),t.style.sub().cls()],[j]),x=Math.max(l.metrics.bigOpSpacing2,l.metrics.bigOpSpacing4-j.height)}var A,E,S;if(r)if(a){if(!r&&!a)return d;S=l.metrics.bigOpSpacing5+w.height+w.depth+x+d.depth+f,A=o.makeVList([{type:"kern",size:l.metrics.bigOpSpacing5},{type:"elem",elem:w},{type:"kern",size:x},{type:"elem",elem:d},{type:"kern",size:k},{type:"elem",elem:y},{type:"kern",size:l.metrics.bigOpSpacing5}],"bottom",S,t),A.children[0].style.marginLeft=-g+"em",A.children[2].style.marginLeft=g+"em"}else S=d.depth+f,A=o.makeVList([{type:"elem",elem:d},{type:"kern",size:k},{type:"elem",elem:y},{type:"kern",size:l.metrics.bigOpSpacing5}],"bottom",S,t),A.children[1].style.marginLeft=g+"em";else E=d.height-f,A=o.makeVList([{type:"kern",size:l.metrics.bigOpSpacing5},{type:"elem",elem:w},{type:"kern",size:x},{type:"elem",elem:d}],"top",E,t),A.children[0].style.marginLeft=-g+"em";return u(["mop","op-limits"],[A])}return e.value.symbol&&(d.style.top=f+"em"),d},b.katex=function(e,t,n){var r=u(["k"],[o.mathsym("K",e.mode)]),i=u(["a"],[o.mathsym("A",e.mode)]);i.height=.75*(i.height+.2),i.depth=.75*(i.height-.2);var a=u(["t"],[o.mathsym("T",e.mode)]),s=u(["e"],[o.mathsym("E",e.mode)]);s.height=s.height-.2155,s.depth=s.depth+.2155;var l=u(["x"],[o.mathsym("X",e.mode)]);return u(["katex-logo","mord"],[r,i,a,s,l],t.getColor())},b.overline=function(e,t,n){var r=v(e.value.body,t.withStyle(t.style.cramp())),a=l.metrics.defaultRuleThickness/t.style.sizeMultiplier,s=u([t.style.reset(),i.TEXT.cls(),"overline-line"]);s.height=a,s.maxFontSize=1;var c=o.makeVList([{type:"elem",elem:r},{type:"kern",size:3*a},{type:"elem",elem:s},{type:"kern",size:a}],"firstBaseline",null,t);return u(["overline","mord"],[c],t.getColor())},b.underline=function(e,t,n){var r=v(e.value.body,t),a=l.metrics.defaultRuleThickness/t.style.sizeMultiplier,s=u([t.style.reset(),i.TEXT.cls(),"underline-line"]);s.height=a,s.maxFontSize=1;var c=o.makeVList([{type:"kern",size:a},{type:"elem",elem:s},{type:"kern",size:3*a},{type:"elem",elem:r}],"top",r.height,t);return u(["underline","mord"],[c],t.getColor())},b.sqrt=function(e,t,n){var r=v(e.value.body,t.withStyle(t.style.cramp())),s=l.metrics.defaultRuleThickness/t.style.sizeMultiplier,c=u([t.style.reset(),i.TEXT.cls(),"sqrt-line"],[],t.getColor());c.height=s,c.maxFontSize=1;var h=s;t.style.id<i.TEXT.id&&(h=l.metrics.xHeight);var p=s+h/4,d=(r.height+r.depth)*t.style.sizeMultiplier,f=d+p+s,g=u(["sqrt-sign"],[a.customSizedDelim("\\surd",f,!1,t,e.mode)],t.getColor()),m=g.height+g.depth-s;m>r.height+r.depth+p&&(p=(p+m-r.height-r.depth)/2);var _=-(r.height+p+s)+g.height;g.style.top=_+"em",g.height-=_,g.depth+=_;var b;if(b=0===r.height&&0===r.depth?u():o.makeVList([{type:"elem",elem:r},{type:"kern",size:p},{type:"elem",elem:c},{type:"kern",size:s}],"firstBaseline",null,t),e.value.index){var y=v(e.value.index,t.withStyle(i.SCRIPTSCRIPT)),k=u([t.style.reset(),i.SCRIPTSCRIPT.cls()],[y]),w=Math.max(g.height,b.height),x=Math.max(g.depth,b.depth),C=.6*(w-x),j=o.makeVList([{type:"elem",elem:k}],"shift",-C,t),A=u(["root"],[j]);return u(["sqrt","mord"],[A,g,b])}return u(["sqrt","mord"],[g,b])},b.sizing=function(e,t,n){var r=h(e.value.value,t.withSize(e.value.size),n),i=u(["mord"],[u(["sizing","reset-"+t.size,e.value.size,t.style.cls()],r)]),a=o.sizingMultiplier[e.value.size];return i.maxFontSize=a*t.style.sizeMultiplier,i},b.styling=function(e,t,n){var r={display:i.DISPLAY,text:i.TEXT,script:i.SCRIPT,scriptscript:i.SCRIPTSCRIPT},o=r[e.value.style],a=h(e.value.value,t.withStyle(o),n);return u([t.style.reset(),o.cls()],a)},b.font=function(e,t,n){var r=e.value.font;return v(e.value.body,t.withFont(r),n)},b.delimsizing=function(e,t,n){var r=e.value.value;return"."===r?u([p[e.value.delimType]]):u([p[e.value.delimType]],[a.sizedDelim(r,e.value.size,t,e.mode)])},b.leftright=function(e,t,n){for(var r=h(e.value.body,t.reset()),i=0,o=0,s=0;s<r.length;s++)i=Math.max(r[s].height,i),o=Math.max(r[s].depth,o);i*=t.style.sizeMultiplier,o*=t.style.sizeMultiplier;var l;l="."===e.value.left?_(t):a.leftRightDelim(e.value.left,i,o,t,e.mode),r.unshift(l);var c;return c="."===e.value.right?_(t):a.leftRightDelim(e.value.right,i,o,t,e.mode),r.push(c),u(["minner",t.style.cls()],r,t.getColor())},b.rule=function(e,t,n){var r=u(["mord","rule"],[],t.getColor()),i=0;e.value.shift&&(i=e.value.shift.number,"ex"===e.value.shift.unit&&(i*=l.metrics.xHeight));var o=e.value.width.number;"ex"===e.value.width.unit&&(o*=l.metrics.xHeight);var a=e.value.height.number;return"ex"===e.value.height.unit&&(a*=l.metrics.xHeight),i/=t.style.sizeMultiplier,o/=t.style.sizeMultiplier,a/=t.style.sizeMultiplier,r.style.borderRightWidth=o+"em",r.style.borderTopWidth=a+"em",r.style.bottom=i+"em",r.width=o,r.height=a+i,r.depth=-i,r},b.accent=function(e,t,n){var r,i=e.value.base;if("supsub"===e.type){var a=e;e=a.value.base,i=e.value.base,a.value.base=i,r=v(a,t.reset(),n)}var s,c=v(i,t.withStyle(t.style.cramp()));if(m(i)){var h=g(i);s=v(h,t.withStyle(t.style.cramp())).skew}else s=0;var p=Math.min(c.height,l.metrics.xHeight),d=o.makeSymbol(e.value.accent,"Main-Regular","math",t.getColor());d.italic=0;var f="\\vec"===e.value.accent?"accent-vec":null,_=u(["accent-body",f],[u([],[d])]);_=o.makeVList([{type:"elem",elem:c},{type:"kern",size:-p},{type:"elem",elem:_}],"firstBaseline",null,t),_.children[1].style.marginLeft=2*s+"em";var b=u(["mord","accent"],[_]);return r?(r.children[0]=b,r.height=Math.max(b.height,r.height),r.classes[0]="mord",r):b},b.phantom=function(e,t,n){var r=h(e.value.value,t.withPhantom(),n);return new o.makeFragment(r)};var v=function(e,t,n){if(!e)return u();if(b[e.type]){var i,a=b[e.type](e,t,n);return t.style!==t.parentStyle&&(i=t.style.sizeMultiplier/t.parentStyle.sizeMultiplier,a.height*=i,a.depth*=i),t.size!==t.parentSize&&(i=o.sizingMultiplier[t.size]/o.sizingMultiplier[t.parentSize],a.height*=i,a.depth*=i),a}throw new r("Got group of unknown type: '"+e.type+"'")},y=function(e,t){e=JSON.parse(JSON.stringify(e));var n=h(e,t),r=u(["base",t.style.cls()],n),i=u(["strut"]),o=u(["strut","bottom"]);i.style.height=r.height+"em",o.style.height=r.height+r.depth+"em",o.style.verticalAlign=-r.depth+"em";var a=u(["katex-html"],[i,o,r]);return a.setAttribute("aria-hidden","true"),a};e.exports=y},function(e,t,n){var r=n(25),i=n(17),o=n(179),a=n(6),s=n(26),l=n(4),c=r.makeSpan,u=r.fontMap,h=function(e,t){return s[t][e]&&s[t][e].replace&&(e=s[t][e].replace),new o.TextNode(e)},p=function(e,t){var n=t.font;if(!n)return null;var r=e.mode;if("mathit"===n)return"italic";var o=e.value;if(l.contains(["\\imath","\\jmath"],o))return null;s[r][o]&&s[r][o].replace&&(o=s[r][o].replace);var a=u[n].fontName;return i.getCharacterMetrics(o,a)?u[t.font].variant:null},d={};d.mathord=function(e,t){var n=new o.MathNode("mi",[h(e.value,e.mode)]),r=p(e,t);return r&&n.setAttribute("mathvariant",r),n},d.textord=function(e,t){var n,r=h(e.value,e.mode),i=p(e,t)||"normal";return/[0-9]/.test(e.value)?(n=new o.MathNode("mn",[r]),t.font&&n.setAttribute("mathvariant",i)):(n=new o.MathNode("mi",[r]),n.setAttribute("mathvariant",i)),n},d.bin=function(e){return new o.MathNode("mo",[h(e.value,e.mode)])},d.rel=function(e){return new o.MathNode("mo",[h(e.value,e.mode)])},d.open=function(e){return new o.MathNode("mo",[h(e.value,e.mode)])},d.close=function(e){return new o.MathNode("mo",[h(e.value,e.mode)])},d.inner=function(e){return new o.MathNode("mo",[h(e.value,e.mode)])},d.punct=function(e){var t=new o.MathNode("mo",[h(e.value,e.mode)]);return t.setAttribute("separator","true"),t},d.ordgroup=function(e,t){var n=f(e.value,t);return new o.MathNode("mrow",n)},d.text=function(e,t){var n=f(e.value.body,t);return new o.MathNode("mtext",n)},d.color=function(e,t){var n=f(e.value.value,t),r=new o.MathNode("mstyle",n);return r.setAttribute("mathcolor",e.value.color),r},d.supsub=function(e,t){var n=[g(e.value.base,t)];e.value.sub&&n.push(g(e.value.sub,t)),e.value.sup&&n.push(g(e.value.sup,t));var r;return r=e.value.sub?e.value.sup?"msubsup":"msub":"msup",new o.MathNode(r,n)},d.genfrac=function(e,t){var n=new o.MathNode("mfrac",[g(e.value.numer,t),g(e.value.denom,t)]);if(e.value.hasBarLine||n.setAttribute("linethickness","0px"),null!=e.value.leftDelim||null!=e.value.rightDelim){var r=[];if(null!=e.value.leftDelim){var i=new o.MathNode("mo",[new o.TextNode(e.value.leftDelim)]);i.setAttribute("fence","true"),r.push(i)}if(r.push(n),null!=e.value.rightDelim){var a=new o.MathNode("mo",[new o.TextNode(e.value.rightDelim)]);a.setAttribute("fence","true"),r.push(a)}return new o.MathNode("mrow",r)}return n},d.array=function(e,t){return new o.MathNode("mtable",e.value.body.map(function(e){return new o.MathNode("mtr",e.map(function(e){return new o.MathNode("mtd",[g(e,t)])}))}))},d.sqrt=function(e,t){return e.value.index?new o.MathNode("mroot",[g(e.value.body,t),g(e.value.index,t)]):new o.MathNode("msqrt",[g(e.value.body,t)])},d.leftright=function(e,t){var n=f(e.value.body,t);if("."!==e.value.left){var r=new o.MathNode("mo",[h(e.value.left,e.mode)]);r.setAttribute("fence","true"),n.unshift(r)}if("."!==e.value.right){var i=new o.MathNode("mo",[h(e.value.right,e.mode)]);i.setAttribute("fence","true"),n.push(i)}return new o.MathNode("mrow",n)},d.accent=function(e,t){var n=new o.MathNode("mo",[h(e.value.accent,e.mode)]),r=new o.MathNode("mover",[g(e.value.base,t),n]);return r.setAttribute("accent","true"),r},d.spacing=function(e){var t;return"\\ "===e.value||"\\space"===e.value||" "===e.value||"~"===e.value?t=new o.MathNode("mtext",[new o.TextNode(" ")]):(t=new o.MathNode("mspace"),t.setAttribute("width",r.spacingFunctions[e.value].size)),t},d.op=function(e){return e.value.symbol?new o.MathNode("mo",[h(e.value.body,e.mode)]):new o.MathNode("mi",[new o.TextNode(e.value.body.slice(1))])},d.katex=function(e){return new o.MathNode("mtext",[new o.TextNode("KaTeX")])},d.font=function(e,t){var n=e.value.font;return g(e.value.body,t.withFont(n))},d.delimsizing=function(e){var t=[];"."!==e.value.value&&t.push(h(e.value.value,e.mode));var n=new o.MathNode("mo",t);return"open"===e.value.delimType||"close"===e.value.delimType?n.setAttribute("fence","true"):n.setAttribute("fence","false"),n},d.styling=function(e,t){var n=f(e.value.value,t),r=new o.MathNode("mstyle",n),i={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]},a=i[e.value.style];return r.setAttribute("scriptlevel",a[0]),r.setAttribute("displaystyle",a[1]),r},d.sizing=function(e,t){var n=f(e.value.value,t),i=new o.MathNode("mstyle",n);return i.setAttribute("mathsize",r.sizingMultiplier[e.value.size]+"em"),i},d.overline=function(e,t){var n=new o.MathNode("mo",[new o.TextNode("‾")]);n.setAttribute("stretchy","true");var r=new o.MathNode("mover",[g(e.value.body,t),n]);return r.setAttribute("accent","true"),r},d.underline=function(e,t){var n=new o.MathNode("mo",[new o.TextNode("‾")]);n.setAttribute("stretchy","true");var r=new o.MathNode("munder",[g(e.value.body,t),n]);return r.setAttribute("accentunder","true"),r},d.rule=function(e){return new o.MathNode("mrow")},d.llap=function(e,t){var n=new o.MathNode("mpadded",[g(e.value.body,t)]);return n.setAttribute("lspace","-1width"),n.setAttribute("width","0px"),n},d.rlap=function(e,t){var n=new o.MathNode("mpadded",[g(e.value.body,t)]);return n.setAttribute("width","0px"),n},d.phantom=function(e,t,n){var r=f(e.value.value,t);return new o.MathNode("mphantom",r)};var f=function(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r];n.push(g(i,t))}return n},g=function(e,t){if(!e)return new o.MathNode("mrow");if(d[e.type])return d[e.type](e,t);throw new a("Got group of unknown type: '"+e.type+"'")},m=function(e,t,n){var r=f(e,n),i=new o.MathNode("mrow",r),a=new o.MathNode("annotation",[new o.TextNode(t)]);a.setAttribute("encoding","application/x-tex");var s=new o.MathNode("semantics",[i,a]),l=new o.MathNode("math",[s]);return c(["katex-mathml"],[l])};e.exports=m},function(e,t,n){var r=n(172),i=n(173),o=n(25),a=n(170),s=n(54),l=n(24),c=o.makeSpan,u=function(e,t,n){n=n||new s({});var o=l.TEXT;n.displayMode&&(o=l.DISPLAY);var u=new a({style:o,size:"size5"}),h=i(e,t,u),p=r(e,u),d=c(["katex"],[h,p]);return n.displayMode?c(["katex-display"],[d]):d};e.exports=u},function(e,t,n){var r=n(6),i=n(24),o=n(25),a=n(17),s=n(26),l=n(4),c=o.makeSpan,u=function(e,t){return s.math[e]&&s.math[e].replace?a.getCharacterMetrics(s.math[e].replace,t):a.getCharacterMetrics(e,t)},h=function(e,t,n){return o.makeSymbol(e,"Size"+t+"-Regular",n)},p=function(e,t,n){var r=c(["style-wrap",n.style.reset(),t.cls()],[e]),i=t.sizeMultiplier/n.style.sizeMultiplier;return r.height*=i,r.depth*=i,r.maxFontSize=t.sizeMultiplier,r},d=function(e,t,n,r,i){var s=o.makeSymbol(e,"Main-Regular",i),l=p(s,t,r);if(n){var c=(1-r.style.sizeMultiplier/t.sizeMultiplier)*a.metrics.axisHeight;l.style.top=c+"em",l.height-=c,l.depth+=c}return l},f=function(e,t,n,r,o){var s=h(e,t,o),l=p(c(["delimsizing","size"+t],[s],r.getColor()),i.TEXT,r);if(n){var u=(1-r.style.sizeMultiplier)*a.metrics.axisHeight;l.style.top=u+"em",l.height-=u,l.depth+=u}return l},g=function(e,t,n){var r;return"Size1-Regular"===t?r="delim-size1":"Size4-Regular"===t&&(r="delim-size4"),{type:"elem",elem:c(["delimsizinginner",r],[c([],[o.makeSymbol(e,t,n)])])}},m=function(e,t,n,r,s){var l,h,d,f;l=d=f=e,h=null;var m="Size1-Regular";"\\uparrow"===e?d=f="⏐":"\\Uparrow"===e?d=f="‖":"\\downarrow"===e?l=d="⏐":"\\Downarrow"===e?l=d="‖":"\\updownarrow"===e?(l="\\uparrow",d="⏐",f="\\downarrow"):"\\Updownarrow"===e?(l="\\Uparrow",d="‖",f="\\Downarrow"):"["===e||"\\lbrack"===e?(l="⎡",d="⎢",f="⎣",m="Size4-Regular"):"]"===e||"\\rbrack"===e?(l="⎤",d="⎥",f="⎦",m="Size4-Regular"):"\\lfloor"===e?(d=l="⎢",f="⎣",m="Size4-Regular"):"\\lceil"===e?(l="⎡",d=f="⎢",m="Size4-Regular"):"\\rfloor"===e?(d=l="⎥",f="⎦",m="Size4-Regular"):"\\rceil"===e?(l="⎤",d=f="⎥",m="Size4-Regular"):"("===e?(l="⎛",d="⎜",f="⎝",m="Size4-Regular"):")"===e?(l="⎞",d="⎟",f="⎠",m="Size4-Regular"):"\\{"===e||"\\lbrace"===e?(l="⎧",h="⎨",f="⎩",d="⎪",m="Size4-Regular"):"\\}"===e||"\\rbrace"===e?(l="⎫",h="⎬",f="⎭",d="⎪",m="Size4-Regular"):"\\lgroup"===e?(l="⎧",f="⎩",d="⎪",m="Size4-Regular"):"\\rgroup"===e?(l="⎫",f="⎭",d="⎪",m="Size4-Regular"):"\\lmoustache"===e?(l="⎧",f="⎭",d="⎪",m="Size4-Regular"):"\\rmoustache"===e?(l="⎫",f="⎩",d="⎪",m="Size4-Regular"):"\\surd"===e&&(l="",f="⎷",d="",m="Size4-Regular");var _=u(l,m),b=_.height+_.depth,v=u(d,m),y=v.height+v.depth,k=u(f,m),w=k.height+k.depth,x=0,C=1;if(null!==h){var j=u(h,m);x=j.height+j.depth,C=2}var A=b+w+x,E=Math.ceil((t-A)/(C*y)),S=A+E*C*y,L=a.metrics.axisHeight;n&&(L*=r.style.sizeMultiplier);var D=S/2-L,T=[];T.push(g(f,m,s));var M;if(null===h)for(M=0;M<E;M++)T.push(g(d,m,s));else{for(M=0;M<E;M++)T.push(g(d,m,s));for(T.push(g(h,m,s)),M=0;M<E;M++)T.push(g(d,m,s))}T.push(g(l,m,s));var z=o.makeVList(T,"bottom",D,r);return p(c(["delimsizing","mult"],[z],r.getColor()),i.TEXT,r)},_=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"],b=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"],v=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],y=[0,1.2,1.8,2.4,3],k=function(e,t,n,i){if("<"===e||"\\lt"===e?e="\\langle":">"!==e&&"\\gt"!==e||(e="\\rangle"),l.contains(_,e)||l.contains(v,e))return f(e,t,!1,n,i);if(l.contains(b,e))return m(e,y[t],!1,n,i);throw new r("Illegal delimiter: '"+e+"'")},w=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],x=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"stack"}],C=[{type:"small",style:i.SCRIPTSCRIPT},{type:"small",style:i.SCRIPT},{type:"small",style:i.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}],j=function(e){return"small"===e.type?"Main-Regular":"large"===e.type?"Size"+e.size+"-Regular":"stack"===e.type?"Size4-Regular":void 0},A=function(e,t,n,r){for(var i=Math.min(2,3-r.style.size),o=i;o<n.length&&"stack"!==n[o].type;o++){var a=u(e,j(n[o])),s=a.height+a.depth;if("small"===n[o].type&&(s*=n[o].style.sizeMultiplier),s>t)return n[o]}return n[n.length-1]},E=function(e,t,n,r,i){"<"===e||"\\lt"===e?e="\\langle":">"!==e&&"\\gt"!==e||(e="\\rangle");var o;o=l.contains(v,e)?w:l.contains(_,e)?C:x;var a=A(e,t,o,r);return"small"===a.type?d(e,a.style,n,r,i):"large"===a.type?f(e,a.size,n,r,i):"stack"===a.type?m(e,t,n,r,i):void 0},S=function(e,t,n,r,i){var o=a.metrics.axisHeight*r.style.sizeMultiplier,s=5/a.metrics.ptPerEm,l=Math.max(t-o,n+o),c=Math.max(l/500*901,2*l-s);return E(e,c,!0,r,i)};e.exports={sizedDelim:k,customSizedDelim:E,leftRightDelim:S}},function(e,t,n){function r(e,t){for(var n=[],r=[n],i=[];;){var o=e.parseExpression(!1,null);n.push(new l("ordgroup",o,e.mode));var a=e.nextToken.text;if("&"===a)e.consume();else{if("\\end"===a)break;if("\\\\"!==a&&"\\cr"!==a){var c=Math.min(e.pos+1,e.lexer._input.length);throw new s("Expected & or \\\\ or \\end",e.lexer,c)}var u=e.parseFunction();i.push(u.value.size),n=[],r.push(n)}}return t.body=r,t.rowGaps=i,new l(t.type,t,e.mode)}function i(t,n,r){"string"==typeof t&&(t=[t]),"number"==typeof n&&(n={numArgs:n});for(var i={numArgs:n.numArgs||0,argTypes:n.argTypes,greediness:1,allowedInText:!!n.allowedInText,numOptionalArgs:n.numOptionalArgs||0,handler:r},o=0;o<t.length;++o)e.exports[t[o]]=i}var o=n(17),a=n(56),s=n(6),l=a.ParseNode;i("array",{numArgs:1},function(e,t){var n=t[0];n=n.value.map?n.value:[n];var i=n.map(function(t){var n=t.value;if(-1!=="lcr".indexOf(n))return{type:"align",align:n};if("|"===n)return{type:"separator",separator:"|"};throw new s("Unknown column alignment: "+t.value,e.lexer,e.positions[1])}),o={type:"array",cols:i,hskipBeforeAndAfter:!0};return o=r(e.parser,o)}),i(["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],{},function(e){var t={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[e.envName],n={type:"array",hskipBeforeAndAfter:!1};return n=r(e.parser,n),t&&(n=new l("leftright",{body:[n],left:t[0],right:t[1]},e.mode)),n}),i("cases",{},function(e){var t={type:"array",arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:o.metrics.quad},{type:"align",align:"l",pregap:0,postgap:0}]};return t=r(e.parser,t),t=new l("leftright",{body:[t],left:"\\{",right:"."},e.mode)}),i("aligned",{},function(e){var t={type:"array",cols:[]};t=r(e.parser,t);var n=new l("ordgroup",[],e.mode),i=0;t.value.body.forEach(function(e){var t;for(t=1;t<e.length;t+=2)e[t].value.unshift(n);i<e.length&&(i=e.length)});for(var o=0;o<i;++o){var a="r",s=0;o%2==1?a="l":o>0&&(s=2),t.value.cols[o]={type:"align",align:a,pregap:s,postgap:0}}return t})},function(e,t){e.exports={"AMS-Regular":{65:[0,.68889,0,0],66:[0,.68889,0,0],67:[0,.68889,0,0],68:[0,.68889,0,0],69:[0,.68889,0,0],70:[0,.68889,0,0],71:[0,.68889,0,0],72:[0,.68889,0,0],73:[0,.68889,0,0],74:[.16667,.68889,0,0],75:[0,.68889,0,0],76:[0,.68889,0,0],77:[0,.68889,0,0],78:[0,.68889,0,0],79:[.16667,.68889,0,0],80:[0,.68889,0,0],81:[.16667,.68889,0,0],82:[0,.68889,0,0],83:[0,.68889,0,0],84:[0,.68889,0,0],85:[0,.68889,0,0],86:[0,.68889,0,0],87:[0,.68889,0,0],88:[0,.68889,0,0],89:[0,.68889,0,0],90:[0,.68889,0,0],107:[0,.68889,0,0],165:[0,.675,.025,0],174:[.15559,.69224,0,0],240:[0,.68889,0,0],295:[0,.68889,0,0],710:[0,.825,0,0],732:[0,.9,0,0],770:[0,.825,0,0],771:[0,.9,0,0],989:[.08167,.58167,0,0],1008:[0,.43056,.04028,0],8245:[0,.54986,0,0],8463:[0,.68889,0,0],8487:[0,.68889,0,0],8498:[0,.68889,0,0],8502:[0,.68889,0,0],8503:[0,.68889,0,0],8504:[0,.68889,0,0],8513:[0,.68889,0,0],8592:[-.03598,.46402,0,0],8594:[-.03598,.46402,0,0],8602:[-.13313,.36687,0,0],8603:[-.13313,.36687,0,0],8606:[.01354,.52239,0,0],8608:[.01354,.52239,0,0],8610:[.01354,.52239,0,0],8611:[.01354,.52239,0,0],8619:[0,.54986,0,0],8620:[0,.54986,0,0],8621:[-.13313,.37788,0,0],8622:[-.13313,.36687,0,0],8624:[0,.69224,0,0],8625:[0,.69224,0,0],8630:[0,.43056,0,0],8631:[0,.43056,0,0],8634:[.08198,.58198,0,0],8635:[.08198,.58198,0,0],8638:[.19444,.69224,0,0],8639:[.19444,.69224,0,0],8642:[.19444,.69224,0,0],8643:[.19444,.69224,0,0],8644:[.1808,.675,0,0],8646:[.1808,.675,0,0],8647:[.1808,.675,0,0],8648:[.19444,.69224,0,0],8649:[.1808,.675,0,0],8650:[.19444,.69224,0,0],8651:[.01354,.52239,0,0],8652:[.01354,.52239,0,0],8653:[-.13313,.36687,0,0],8654:[-.13313,.36687,0,0],8655:[-.13313,.36687,0,0],8666:[.13667,.63667,0,0],8667:[.13667,.63667,0,0],8669:[-.13313,.37788,0,0],8672:[-.064,.437,0,0],8674:[-.064,.437,0,0],8705:[0,.825,0,0],8708:[0,.68889,0,0],8709:[.08167,.58167,0,0],8717:[0,.43056,0,0],8722:[-.03598,.46402,0,0],8724:[.08198,.69224,0,0],8726:[.08167,.58167,0,0],8733:[0,.69224,0,0],8736:[0,.69224,0,0],8737:[0,.69224,0,0],8738:[.03517,.52239,0,0],8739:[.08167,.58167,0,0],8740:[.25142,.74111,0,0],8741:[.08167,.58167,0,0],8742:[.25142,.74111,0,0],8756:[0,.69224,0,0],8757:[0,.69224,0,0],8764:[-.13313,.36687,0,0],8765:[-.13313,.37788,0,0],8769:[-.13313,.36687,0,0],8770:[-.03625,.46375,0,0],8774:[.30274,.79383,0,0],8776:[-.01688,.48312,0,0],8778:[.08167,.58167,0,0],8782:[.06062,.54986,0,0],8783:[.06062,.54986,0,0],8785:[.08198,.58198,0,0],8786:[.08198,.58198,0,0],8787:[.08198,.58198,0,0],8790:[0,.69224,0,0],8791:[.22958,.72958,0,0],8796:[.08198,.91667,0,0],8806:[.25583,.75583,0,0],8807:[.25583,.75583,0,0],8808:[.25142,.75726,0,0],8809:[.25142,.75726,0,0],8812:[.25583,.75583,0,0],8814:[.20576,.70576,0,0],8815:[.20576,.70576,0,0],8816:[.30274,.79383,0,0],8817:[.30274,.79383,0,0],8818:[.22958,.72958,0,0],8819:[.22958,.72958,0,0],8822:[.1808,.675,0,0],8823:[.1808,.675,0,0],8828:[.13667,.63667,0,0],8829:[.13667,.63667,0,0],8830:[.22958,.72958,0,0],8831:[.22958,.72958,0,0],8832:[.20576,.70576,0,0],8833:[.20576,.70576,0,0],8840:[.30274,.79383,0,0],8841:[.30274,.79383,0,0],8842:[.13597,.63597,0,0],8843:[.13597,.63597,0,0],8847:[.03517,.54986,0,0],8848:[.03517,.54986,0,0],8858:[.08198,.58198,0,0],8859:[.08198,.58198,0,0],8861:[.08198,.58198,0,0],8862:[0,.675,0,0],8863:[0,.675,0,0],8864:[0,.675,0,0],8865:[0,.675,0,0],8872:[0,.69224,0,0],8873:[0,.69224,0,0],8874:[0,.69224,0,0],8876:[0,.68889,0,0],8877:[0,.68889,0,0],8878:[0,.68889,0,0],8879:[0,.68889,0,0],8882:[.03517,.54986,0,0],8883:[.03517,.54986,0,0],8884:[.13667,.63667,0,0],8885:[.13667,.63667,0,0],8888:[0,.54986,0,0],8890:[.19444,.43056,0,0],8891:[.19444,.69224,0,0],8892:[.19444,.69224,0,0],8901:[0,.54986,0,0],8903:[.08167,.58167,0,0],8905:[.08167,.58167,0,0],8906:[.08167,.58167,0,0],8907:[0,.69224,0,0],8908:[0,.69224,0,0],8909:[-.03598,.46402,0,0],8910:[0,.54986,0,0],8911:[0,.54986,0,0],8912:[.03517,.54986,0,0],8913:[.03517,.54986,0,0],8914:[0,.54986,0,0],8915:[0,.54986,0,0],8916:[0,.69224,0,0],8918:[.0391,.5391,0,0],8919:[.0391,.5391,0,0],8920:[.03517,.54986,0,0],8921:[.03517,.54986,0,0],8922:[.38569,.88569,0,0],8923:[.38569,.88569,0,0],8926:[.13667,.63667,0,0],8927:[.13667,.63667,0,0],8928:[.30274,.79383,0,0],8929:[.30274,.79383,0,0],8934:[.23222,.74111,0,0],8935:[.23222,.74111,0,0],8936:[.23222,.74111,0,0],8937:[.23222,.74111,0,0],8938:[.20576,.70576,0,0],8939:[.20576,.70576,0,0],8940:[.30274,.79383,0,0],8941:[.30274,.79383,0,0],8994:[.19444,.69224,0,0],8995:[.19444,.69224,0,0],9416:[.15559,.69224,0,0],9484:[0,.69224,0,0],9488:[0,.69224,0,0],9492:[0,.37788,0,0],9496:[0,.37788,0,0],9585:[.19444,.68889,0,0],9586:[.19444,.74111,0,0],9632:[0,.675,0,0],9633:[0,.675,0,0],9650:[0,.54986,0,0],9651:[0,.54986,0,0],9654:[.03517,.54986,0,0],9660:[0,.54986,0,0],9661:[0,.54986,0,0],9664:[.03517,.54986,0,0],9674:[.11111,.69224,0,0],9733:[.19444,.69224,0,0],10003:[0,.69224,0,0],10016:[0,.69224,0,0],10731:[.11111,.69224,0,0],10846:[.19444,.75583,0,0],10877:[.13667,.63667,0,0],10878:[.13667,.63667,0,0],10885:[.25583,.75583,0,0],10886:[.25583,.75583,0,0],10887:[.13597,.63597,0,0],10888:[.13597,.63597,0,0],10889:[.26167,.75726,0,0],10890:[.26167,.75726,0,0],10891:[.48256,.98256,0,0],10892:[.48256,.98256,0,0],10901:[.13667,.63667,0,0],10902:[.13667,.63667,0,0],10933:[.25142,.75726,0,0],10934:[.25142,.75726,0,0],10935:[.26167,.75726,0,0],10936:[.26167,.75726,0,0],10937:[.26167,.75726,0,0],10938:[.26167,.75726,0,0],10949:[.25583,.75583,0,0],10950:[.25583,.75583,0,0],10955:[.28481,.79383,0,0],10956:[.28481,.79383,0,0],57350:[.08167,.58167,0,0],57351:[.08167,.58167,0,0],57352:[.08167,.58167,0,0],57353:[0,.43056,.04028,0],57356:[.25142,.75726,0,0],57357:[.25142,.75726,0,0],57358:[.41951,.91951,0,0],57359:[.30274,.79383,0,0],57360:[.30274,.79383,0,0],57361:[.41951,.91951,0,0],57366:[.25142,.75726,0,0],57367:[.25142,.75726,0,0],57368:[.25142,.75726,0,0],57369:[.25142,.75726,0,0],57370:[.13597,.63597,0,0],57371:[.13597,.63597,0,0]},"Caligraphic-Regular":{48:[0,.43056,0,0],49:[0,.43056,0,0],50:[0,.43056,0,0],51:[.19444,.43056,0,0],52:[.19444,.43056,0,0],53:[.19444,.43056,0,0],54:[0,.64444,0,0],55:[.19444,.43056,0,0],56:[0,.64444,0,0],57:[.19444,.43056,0,0],65:[0,.68333,0,.19445],66:[0,.68333,.03041,.13889],67:[0,.68333,.05834,.13889],68:[0,.68333,.02778,.08334],69:[0,.68333,.08944,.11111],70:[0,.68333,.09931,.11111],71:[.09722,.68333,.0593,.11111],72:[0,.68333,.00965,.11111],73:[0,.68333,.07382,0],74:[.09722,.68333,.18472,.16667],75:[0,.68333,.01445,.05556],76:[0,.68333,0,.13889],77:[0,.68333,0,.13889],78:[0,.68333,.14736,.08334],79:[0,.68333,.02778,.11111],80:[0,.68333,.08222,.08334],81:[.09722,.68333,0,.11111],82:[0,.68333,0,.08334],83:[0,.68333,.075,.13889],84:[0,.68333,.25417,0],85:[0,.68333,.09931,.08334],86:[0,.68333,.08222,0],87:[0,.68333,.08222,.08334],88:[0,.68333,.14643,.13889],89:[.09722,.68333,.08222,.08334],90:[0,.68333,.07944,.13889]},"Fraktur-Regular":{33:[0,.69141,0,0],34:[0,.69141,0,0],38:[0,.69141,0,0],39:[0,.69141,0,0],40:[.24982,.74947,0,0],41:[.24982,.74947,0,0],42:[0,.62119,0,0],43:[.08319,.58283,0,0],44:[0,.10803,0,0],45:[.08319,.58283,0,0],46:[0,.10803,0,0],47:[.24982,.74947,0,0],48:[0,.47534,0,0],49:[0,.47534,0,0],50:[0,.47534,0,0],51:[.18906,.47534,0,0],52:[.18906,.47534,0,0],53:[.18906,.47534,0,0],54:[0,.69141,0,0],55:[.18906,.47534,0,0],56:[0,.69141,0,0],57:[.18906,.47534,0,0],58:[0,.47534,0,0],59:[.12604,.47534,0,0],61:[-.13099,.36866,0,0],63:[0,.69141,0,0],65:[0,.69141,0,0],66:[0,.69141,0,0],67:[0,.69141,0,0],68:[0,.69141,0,0],69:[0,.69141,0,0],70:[.12604,.69141,0,0],71:[0,.69141,0,0],72:[.06302,.69141,0,0],73:[0,.69141,0,0],74:[.12604,.69141,0,0],75:[0,.69141,0,0],76:[0,.69141,0,0],77:[0,.69141,0,0],78:[0,.69141,0,0],79:[0,.69141,0,0],80:[.18906,.69141,0,0],81:[.03781,.69141,0,0],82:[0,.69141,0,0],83:[0,.69141,0,0],84:[0,.69141,0,0],85:[0,.69141,0,0],86:[0,.69141,0,0],87:[0,.69141,0,0],88:[0,.69141,0,0],89:[.18906,.69141,0,0],90:[.12604,.69141,0,0],91:[.24982,.74947,0,0],93:[.24982,.74947,0,0],94:[0,.69141,0,0],97:[0,.47534,0,0],98:[0,.69141,0,0],99:[0,.47534,0,0],100:[0,.62119,0,0],101:[0,.47534,0,0],102:[.18906,.69141,0,0],103:[.18906,.47534,0,0],104:[.18906,.69141,0,0],105:[0,.69141,0,0],106:[0,.69141,0,0],107:[0,.69141,0,0],108:[0,.69141,0,0],109:[0,.47534,0,0],110:[0,.47534,0,0],111:[0,.47534,0,0],112:[.18906,.52396,0,0],113:[.18906,.47534,0,0],114:[0,.47534,0,0],115:[0,.47534,0,0],116:[0,.62119,0,0],117:[0,.47534,0,0],118:[0,.52396,0,0],119:[0,.52396,0,0],120:[.18906,.47534,0,0],121:[.18906,.47534,0,0],122:[.18906,.47534,0,0],8216:[0,.69141,0,0],8217:[0,.69141,0,0],58112:[0,.62119,0,0],58113:[0,.62119,0,0],58114:[.18906,.69141,0,0],58115:[.18906,.69141,0,0],58116:[.18906,.47534,0,0],58117:[0,.69141,0,0],58118:[0,.62119,0,0],58119:[0,.47534,0,0]},"Main-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.13333,.63333,0,0],44:[.19444,.15556,0,0],45:[0,.44444,0,0],46:[0,.15556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.44444,0,0],59:[.19444,.44444,0,0],60:[.08556,.58556,0,0],61:[-.10889,.39111,0,0],62:[.08556,.58556,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,0,0],67:[0,.68611,0,0],68:[0,.68611,0,0],69:[0,.68611,0,0],70:[0,.68611,0,0],71:[0,.68611,0,0],72:[0,.68611,0,0],73:[0,.68611,0,0],74:[0,.68611,0,0],75:[0,.68611,0,0],76:[0,.68611,0,0],77:[0,.68611,0,0],78:[0,.68611,0,0],79:[0,.68611,0,0],80:[0,.68611,0,0],81:[.19444,.68611,0,0],82:[0,.68611,0,0],83:[0,.68611,0,0],84:[0,.68611,0,0],85:[0,.68611,0,0],86:[0,.68611,.01597,0],87:[0,.68611,.01597,0],88:[0,.68611,0,0],89:[0,.68611,.02875,0],90:[0,.68611,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.13444,.03194,0],96:[0,.69444,0,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.10903,0],103:[.19444,.44444,.01597,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,0,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.01597,0],119:[0,.44444,.01597,0],120:[0,.44444,0,0],121:[.19444,.44444,.01597,0],122:[0,.44444,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],172:[0,.44444,0,0],175:[0,.59611,0,0],176:[0,.69444,0,0],177:[.13333,.63333,0,0],180:[0,.69444,0,0],215:[.13333,.63333,0,0],247:[.13333,.63333,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.59611,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.69444,0,0],772:[0,.59611,0,0],774:[0,.69444,0,0],775:[0,.69444,0,0],776:[0,.69444,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],824:[.19444,.69444,0,0],915:[0,.68611,0,0],916:[0,.68611,0,0],920:[0,.68611,0,0],923:[0,.68611,0,0],926:[0,.68611,0,0],928:[0,.68611,0,0],931:[0,.68611,0,0],933:[0,.68611,0,0],934:[0,.68611,0,0],936:[0,.68611,0,0],937:[0,.68611,0,0],8211:[0,.44444,.03194,0],8212:[0,.44444,.03194,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8242:[0,.55556,0,0],8407:[0,.72444,.15486,0],8463:[0,.69444,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,0],8472:[.19444,.44444,0,0],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.10889,.39111,0,0],8593:[.19444,.69444,0,0],8594:[-.10889,.39111,0,0],8595:[.19444,.69444,0,0],8596:[-.10889,.39111,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8636:[-.10889,.39111,0,0],8637:[-.10889,.39111,0,0],8640:[-.10889,.39111,0,0],8641:[-.10889,.39111,0,0],8656:[-.10889,.39111,0,0],8657:[.19444,.69444,0,0],8658:[-.10889,.39111,0,0],8659:[.19444,.69444,0,0],8660:[-.10889,.39111,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.06389,0],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68611,0,0],8712:[.08556,.58556,0,0],8715:[.08556,.58556,0,0],8722:[.13333,.63333,0,0],8723:[.13333,.63333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.02778,.47222,0,0],8728:[-.02639,.47361,0,0],8729:[-.02639,.47361,0,0],8730:[.18,.82,0,0],8733:[0,.44444,0,0],8734:[0,.44444,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.12778,0],8764:[-.10889,.39111,0,0],8768:[.19444,.69444,0,0],8771:[.00222,.50222,0,0],8776:[.02444,.52444,0,0],8781:[.00222,.50222,0,0],8801:[.00222,.50222,0,0],8804:[.19667,.69667,0,0],8805:[.19667,.69667,0,0],8810:[.08556,.58556,0,0],8811:[.08556,.58556,0,0],8826:[.08556,.58556,0,0],8827:[.08556,.58556,0,0],8834:[.08556,.58556,0,0],8835:[.08556,.58556,0,0],8838:[.19667,.69667,0,0],8839:[.19667,.69667,0,0],8846:[0,.55556,0,0],8849:[.19667,.69667,0,0],8850:[.19667,.69667,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.13333,.63333,0,0],8854:[.13333,.63333,0,0],8855:[.13333,.63333,0,0],8856:[.13333,.63333,0,0],8857:[.13333,.63333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8900:[-.02639,.47361,0,0],8901:[-.02639,.47361,0,0],8902:[-.02778,.47222,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.13889,.36111,0,0],8995:[-.13889,.36111,0,0],9651:[.19444,.69444,0,0],9657:[-.02778,.47222,0,0],9661:[.19444,.69444,0,0],9667:[-.02778,.47222,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10815:[0,.68611,0,0],10927:[.19667,.69667,0,0],10928:[.19667,.69667,0,0]},"Main-Italic":{33:[0,.69444,.12417,0],34:[0,.69444,.06961,0],35:[.19444,.69444,.06616,0],37:[.05556,.75,.13639,0],38:[0,.69444,.09694,0],39:[0,.69444,.12417,0],40:[.25,.75,.16194,0],41:[.25,.75,.03694,0],42:[0,.75,.14917,0],43:[.05667,.56167,.03694,0],44:[.19444,.10556,0,0],45:[0,.43056,.02826,0],46:[0,.10556,0,0],47:[.25,.75,.16194,0],48:[0,.64444,.13556,0],49:[0,.64444,.13556,0],50:[0,.64444,.13556,0],51:[0,.64444,.13556,0],52:[.19444,.64444,.13556,0],53:[0,.64444,.13556,0],54:[0,.64444,.13556,0],55:[.19444,.64444,.13556,0],56:[0,.64444,.13556,0],57:[0,.64444,.13556,0],58:[0,.43056,.0582,0],59:[.19444,.43056,.0582,0],61:[-.13313,.36687,.06616,0],63:[0,.69444,.1225,0],64:[0,.69444,.09597,0],65:[0,.68333,0,0],66:[0,.68333,.10257,0],67:[0,.68333,.14528,0],68:[0,.68333,.09403,0],69:[0,.68333,.12028,0],70:[0,.68333,.13305,0],71:[0,.68333,.08722,0],72:[0,.68333,.16389,0],73:[0,.68333,.15806,0],74:[0,.68333,.14028,0],75:[0,.68333,.14528,0],76:[0,.68333,0,0],77:[0,.68333,.16389,0],78:[0,.68333,.16389,0],79:[0,.68333,.09403,0],80:[0,.68333,.10257,0],81:[.19444,.68333,.09403,0],82:[0,.68333,.03868,0],83:[0,.68333,.11972,0],84:[0,.68333,.13305,0],85:[0,.68333,.16389,0],86:[0,.68333,.18361,0],87:[0,.68333,.18361,0],88:[0,.68333,.15806,0],89:[0,.68333,.19383,0],90:[0,.68333,.14528,0],91:[.25,.75,.1875,0],93:[.25,.75,.10528,0],94:[0,.69444,.06646,0],95:[.31,.12056,.09208,0],97:[0,.43056,.07671,0],98:[0,.69444,.06312,0],99:[0,.43056,.05653,0],100:[0,.69444,.10333,0],101:[0,.43056,.07514,0],102:[.19444,.69444,.21194,0],103:[.19444,.43056,.08847,0],104:[0,.69444,.07671,0],105:[0,.65536,.1019,0],106:[.19444,.65536,.14467,0],107:[0,.69444,.10764,0],108:[0,.69444,.10333,0],109:[0,.43056,.07671,0],110:[0,.43056,.07671,0],111:[0,.43056,.06312,0],112:[.19444,.43056,.06312,0],113:[.19444,.43056,.08847,0],114:[0,.43056,.10764,0],115:[0,.43056,.08208,0],116:[0,.61508,.09486,0],117:[0,.43056,.07671,0],118:[0,.43056,.10764,0],119:[0,.43056,.10764,0],120:[0,.43056,.12042,0],121:[.19444,.43056,.08847,0],122:[0,.43056,.12292,0],126:[.35,.31786,.11585,0],163:[0,.69444,0,0],305:[0,.43056,0,.02778],567:[.19444,.43056,0,.08334],768:[0,.69444,0,0],769:[0,.69444,.09694,0],770:[0,.69444,.06646,0],771:[0,.66786,.11585,0],772:[0,.56167,.10333,0],774:[0,.69444,.10806,0],775:[0,.66786,.11752,0],776:[0,.66786,.10474,0],778:[0,.69444,0,0],779:[0,.69444,.1225,0],780:[0,.62847,.08295,0],915:[0,.68333,.13305,0],916:[0,.68333,0,0],920:[0,.68333,.09403,0],923:[0,.68333,0,0],926:[0,.68333,.15294,0],928:[0,.68333,.16389,0],931:[0,.68333,.12028,0],933:[0,.68333,.11111,0],934:[0,.68333,.05986,0],936:[0,.68333,.11111,0],937:[0,.68333,.10257,0],8211:[0,.43056,.09208,0],8212:[0,.43056,.09208,0],8216:[0,.69444,.12417,0],8217:[0,.69444,.12417,0],8220:[0,.69444,.1685,0],8221:[0,.69444,.06961,0],8463:[0,.68889,0,0]},"Main-Regular":{32:[0,0,0,0],33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.19444,.10556,0,0],45:[0,.43056,0,0],46:[0,.10556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.43056,0,0],59:[.19444,.43056,0,0],60:[.0391,.5391,0,0],61:[-.13313,.36687,0,0],62:[.0391,.5391,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68333,0,0],66:[0,.68333,0,0],67:[0,.68333,0,0],68:[0,.68333,0,0],69:[0,.68333,0,0],70:[0,.68333,0,0],71:[0,.68333,0,0],72:[0,.68333,0,0],73:[0,.68333,0,0],74:[0,.68333,0,0],75:[0,.68333,0,0],76:[0,.68333,0,0],77:[0,.68333,0,0],78:[0,.68333,0,0],79:[0,.68333,0,0],80:[0,.68333,0,0],81:[.19444,.68333,0,0],82:[0,.68333,0,0],83:[0,.68333,0,0],84:[0,.68333,0,0],85:[0,.68333,0,0],86:[0,.68333,.01389,0],87:[0,.68333,.01389,0],88:[0,.68333,0,0],89:[0,.68333,.025,0],90:[0,.68333,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.12056,.02778,0],96:[0,.69444,0,0],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,0],100:[0,.69444,0,0],101:[0,.43056,0,0],102:[0,.69444,.07778,0],103:[.19444,.43056,.01389,0],104:[0,.69444,0,0],105:[0,.66786,0,0],106:[.19444,.66786,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.19444,.43056,0,0],113:[.19444,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.61508,0,0],117:[0,.43056,0,0],118:[0,.43056,.01389,0],119:[0,.43056,.01389,0],120:[0,.43056,0,0],121:[.19444,.43056,.01389,0],122:[0,.43056,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.31786,0,0],160:[0,0,0,0],168:[0,.66786,0,0],172:[0,.43056,0,0],175:[0,.56778,0,0],176:[0,.69444,0,0],177:[.08333,.58333,0,0],180:[0,.69444,0,0],215:[.08333,.58333,0,0],247:[.08333,.58333,0,0],305:[0,.43056,0,0],567:[.19444,.43056,0,0],710:[0,.69444,0,0],711:[0,.62847,0,0],713:[0,.56778,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.66786,0,0],730:[0,.69444,0,0],732:[0,.66786,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.66786,0,0],772:[0,.56778,0,0],774:[0,.69444,0,0],775:[0,.66786,0,0],776:[0,.66786,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.62847,0,0],824:[.19444,.69444,0,0],915:[0,.68333,0,0],916:[0,.68333,0,0],920:[0,.68333,0,0],923:[0,.68333,0,0],926:[0,.68333,0,0],928:[0,.68333,0,0],931:[0,.68333,0,0],933:[0,.68333,0,0],934:[0,.68333,0,0],936:[0,.68333,0,0],937:[0,.68333,0,0],8211:[0,.43056,.02778,0],8212:[0,.43056,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8230:[0,.12,0,0],8242:[0,.55556,0,0],8407:[0,.71444,.15382,0],8463:[0,.68889,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,.11111],8472:[.19444,.43056,0,.11111],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.13313,.36687,0,0],8593:[.19444,.69444,0,0],8594:[-.13313,.36687,0,0],8595:[.19444,.69444,0,0],8596:[-.13313,.36687,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8614:[.011,.511,0,0],8617:[.011,.511,0,0],8618:[.011,.511,0,0],8636:[-.13313,.36687,0,0],8637:[-.13313,.36687,0,0],8640:[-.13313,.36687,0,0],8641:[-.13313,.36687,0,0],8652:[.011,.671,0,0],8656:[-.13313,.36687,0,0],8657:[.19444,.69444,0,0],8658:[-.13313,.36687,0,0],8659:[.19444,.69444,0,0],8660:[-.13313,.36687,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.05556,.08334],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68333,0,0],8712:[.0391,.5391,0,0],8715:[.0391,.5391,0,0],8722:[.08333,.58333,0,0],8723:[.08333,.58333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.03472,.46528,0,0],8728:[-.05555,.44445,0,0],8729:[-.05555,.44445,0,0],8730:[.2,.8,0,0],8733:[0,.43056,0,0],8734:[0,.43056,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.11111,0],8764:[-.13313,.36687,0,0],8768:[.19444,.69444,0,0],8771:[-.03625,.46375,0,0],8773:[-.022,.589,0,0],8776:[-.01688,.48312,0,0],8781:[-.03625,.46375,0,0],8784:[-.133,.67,0,0],8800:[.215,.716,0,0],8801:[-.03625,.46375,0,0],8804:[.13597,.63597,0,0],8805:[.13597,.63597,0,0],8810:[.0391,.5391,0,0],8811:[.0391,.5391,0,0],8826:[.0391,.5391,0,0],8827:[.0391,.5391,0,0],8834:[.0391,.5391,0,0],8835:[.0391,.5391,0,0],8838:[.13597,.63597,0,0],8839:[.13597,.63597,0,0],8846:[0,.55556,0,0],8849:[.13597,.63597,0,0],8850:[.13597,.63597,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.08333,.58333,0,0],8854:[.08333,.58333,0,0],8855:[.08333,.58333,0,0],8856:[.08333,.58333,0,0],8857:[.08333,.58333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8872:[.249,.75,0,0],8900:[-.05555,.44445,0,0],8901:[-.05555,.44445,0,0],8902:[-.03472,.46528,0,0],8904:[.005,.505,0,0],8942:[.03,.9,0,0],8943:[-.19,.31,0,0],8945:[-.1,.82,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.14236,.35764,0,0],8995:[-.14236,.35764,0,0],9136:[.244,.744,0,0],9137:[.244,.744,0,0],9651:[.19444,.69444,0,0],9657:[-.03472,.46528,0,0],9661:[.19444,.69444,0,0],9667:[-.03472,.46528,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10222:[.244,.744,0,0],10223:[.244,.744,0,0],10229:[.011,.511,0,0],10230:[.011,.511,0,0],10231:[.011,.511,0,0],10232:[.024,.525,0,0],10233:[.024,.525,0,0],10234:[.024,.525,0,0],10236:[.011,.511,0,0],10815:[0,.68333,0,0],10927:[.13597,.63597,0,0],10928:[.13597,.63597,0,0]},"Math-BoldItalic":{47:[.19444,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,.04835,0],67:[0,.68611,.06979,0],68:[0,.68611,.03194,0],69:[0,.68611,.05451,0],70:[0,.68611,.15972,0],71:[0,.68611,0,0],72:[0,.68611,.08229,0],73:[0,.68611,.07778,0],74:[0,.68611,.10069,0],75:[0,.68611,.06979,0],76:[0,.68611,0,0],77:[0,.68611,.11424,0],78:[0,.68611,.11424,0],79:[0,.68611,.03194,0],80:[0,.68611,.15972,0],81:[.19444,.68611,0,0],82:[0,.68611,.00421,0],83:[0,.68611,.05382,0],84:[0,.68611,.15972,0],85:[0,.68611,.11424,0],86:[0,.68611,.25555,0],87:[0,.68611,.15972,0],88:[0,.68611,.07778,0],89:[0,.68611,.25555,0],90:[0,.68611,.06979,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[.19444,.69444,.11042,0],103:[.19444,.44444,.03704,0],104:[0,.69444,0,0],105:[0,.69326,0,0],106:[.19444,.69326,.0622,0],107:[0,.69444,.01852,0],108:[0,.69444,.0088,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,.03704,0],114:[0,.44444,.03194,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.03704,0],119:[0,.44444,.02778,0],120:[0,.44444,0,0],121:[.19444,.44444,.03704,0],122:[0,.44444,.04213,0],915:[0,.68611,.15972,0],916:[0,.68611,0,0],920:[0,.68611,.03194,0],923:[0,.68611,0,0],926:[0,.68611,.07458,0],928:[0,.68611,.08229,0],931:[0,.68611,.05451,0],933:[0,.68611,.15972,0],934:[0,.68611,0,0],936:[0,.68611,.11653,0],937:[0,.68611,.04835,0],945:[0,.44444,0,0],946:[.19444,.69444,.03403,0],947:[.19444,.44444,.06389,0],948:[0,.69444,.03819,0],949:[0,.44444,0,0],950:[.19444,.69444,.06215,0],951:[.19444,.44444,.03704,0],952:[0,.69444,.03194,0],953:[0,.44444,0,0],954:[0,.44444,0,0],955:[0,.69444,0,0],956:[.19444,.44444,0,0],957:[0,.44444,.06898,0],958:[.19444,.69444,.03021,0],959:[0,.44444,0,0],960:[0,.44444,.03704,0],961:[.19444,.44444,0,0],962:[.09722,.44444,.07917,0],963:[0,.44444,.03704,0],964:[0,.44444,.13472,0],965:[0,.44444,.03704,0],966:[.19444,.44444,0,0],967:[.19444,.44444,0,0],968:[.19444,.69444,.03704,0],969:[0,.44444,.03704,0],977:[0,.69444,0,0],981:[.19444,.69444,0,0],982:[0,.44444,.03194,0],1009:[.19444,.44444,0,0],1013:[0,.44444,0,0]},"Math-Italic":{47:[.19444,.69444,0,0],65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"Math-Regular":{65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"SansSerif-Regular":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.125,.08333,0,0],45:[0,.44444,0,0],46:[0,.08333,0,0],47:[.25,.75,0,0],48:[0,.65556,0,0],49:[0,.65556,0,0],50:[0,.65556,0,0],51:[0,.65556,0,0],52:[0,.65556,0,0],53:[0,.65556,0,0],54:[0,.65556,0,0],55:[0,.65556,0,0],56:[0,.65556,0,0],57:[0,.65556,0,0],58:[0,.44444,0,0],59:[.125,.44444,0,0],61:[-.13,.37,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.125,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01389,0],87:[0,.69444,.01389,0],88:[0,.69444,0,0],89:[0,.69444,.025,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.09444,.02778,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.06944,0],103:[.19444,.44444,.01389,0],104:[0,.69444,0,0],105:[0,.67937,0,0],106:[.19444,.67937,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,.01389,0],115:[0,.44444,0,0],116:[0,.57143,0,0],117:[0,.44444,0,0],118:[0,.44444,.01389,0],119:[0,.44444,.01389,0],120:[0,.44444,0,0],121:[.19444,.44444,.01389,0],122:[0,.44444,0,0],126:[.35,.32659,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.67659,0,0],772:[0,.60889,0,0],774:[0,.69444,0,0],775:[0,.67937,0,0],776:[0,.67937,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.44444,.02778,0],8212:[0,.44444,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"Script-Regular":{65:[0,.7,.22925,0],66:[0,.7,.04087,0],67:[0,.7,.1689,0],68:[0,.7,.09371,0],69:[0,.7,.18583,0],70:[0,.7,.13634,0],71:[0,.7,.17322,0],72:[0,.7,.29694,0],73:[0,.7,.19189,0],74:[.27778,.7,.19189,0],75:[0,.7,.31259,0],76:[0,.7,.19189,0],77:[0,.7,.15981,0],78:[0,.7,.3525,0],79:[0,.7,.08078,0],80:[0,.7,.08078,0],81:[0,.7,.03305,0],82:[0,.7,.06259,0],83:[0,.7,.19189,0],84:[0,.7,.29087,0],85:[0,.7,.25815,0],86:[0,.7,.27523,0],87:[0,.7,.27523,0],88:[0,.7,.26006,0],89:[0,.7,.2939,0],90:[0,.7,.24037,0]},"Size1-Regular":{40:[.35001,.85,0,0],41:[.35001,.85,0,0],47:[.35001,.85,0,0],91:[.35001,.85,0,0],92:[.35001,.85,0,0],93:[.35001,.85,0,0],123:[.35001,.85,0,0],125:[.35001,.85,0,0],710:[0,.72222,0,0],732:[0,.72222,0,0],770:[0,.72222,0,0],771:[0,.72222,0,0],8214:[-99e-5,.601,0,0],8593:[1e-5,.6,0,0],8595:[1e-5,.6,0,0],8657:[1e-5,.6,0,0],8659:[1e-5,.6,0,0],8719:[.25001,.75,0,0],8720:[.25001,.75,0,0],8721:[.25001,.75,0,0],8730:[.35001,.85,0,0],8739:[-.00599,.606,0,0],8741:[-.00599,.606,0,0],8747:[.30612,.805,.19445,0],8748:[.306,.805,.19445,0],8749:[.306,.805,.19445,0],8750:[.30612,.805,.19445,0],8896:[.25001,.75,0,0],8897:[.25001,.75,0,0],8898:[.25001,.75,0,0],8899:[.25001,.75,0,0],8968:[.35001,.85,0,0],8969:[.35001,.85,0,0],8970:[.35001,.85,0,0],8971:[.35001,.85,0,0],9168:[-99e-5,.601,0,0],10216:[.35001,.85,0,0],10217:[.35001,.85,0,0],10752:[.25001,.75,0,0],10753:[.25001,.75,0,0],10754:[.25001,.75,0,0],10756:[.25001,.75,0,0],10758:[.25001,.75,0,0]},"Size2-Regular":{40:[.65002,1.15,0,0],41:[.65002,1.15,0,0],47:[.65002,1.15,0,0],91:[.65002,1.15,0,0],92:[.65002,1.15,0,0],93:[.65002,1.15,0,0],123:[.65002,1.15,0,0],125:[.65002,1.15,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8719:[.55001,1.05,0,0],8720:[.55001,1.05,0,0],8721:[.55001,1.05,0,0],8730:[.65002,1.15,0,0],8747:[.86225,1.36,.44445,0],8748:[.862,1.36,.44445,0],8749:[.862,1.36,.44445,0],8750:[.86225,1.36,.44445,0],8896:[.55001,1.05,0,0],8897:[.55001,1.05,0,0],8898:[.55001,1.05,0,0],8899:[.55001,1.05,0,0],8968:[.65002,1.15,0,0],8969:[.65002,1.15,0,0],8970:[.65002,1.15,0,0],8971:[.65002,1.15,0,0],10216:[.65002,1.15,0,0],10217:[.65002,1.15,0,0],10752:[.55001,1.05,0,0],10753:[.55001,1.05,0,0],10754:[.55001,1.05,0,0],10756:[.55001,1.05,0,0],10758:[.55001,1.05,0,0]},"Size3-Regular":{40:[.95003,1.45,0,0],41:[.95003,1.45,0,0],47:[.95003,1.45,0,0],91:[.95003,1.45,0,0],92:[.95003,1.45,0,0],93:[.95003,1.45,0,0],123:[.95003,1.45,0,0],125:[.95003,1.45,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8730:[.95003,1.45,0,0],8968:[.95003,1.45,0,0],8969:[.95003,1.45,0,0],8970:[.95003,1.45,0,0],8971:[.95003,1.45,0,0],10216:[.95003,1.45,0,0],10217:[.95003,1.45,0,0]},"Size4-Regular":{40:[1.25003,1.75,0,0],41:[1.25003,1.75,0,0],47:[1.25003,1.75,0,0],91:[1.25003,1.75,0,0],92:[1.25003,1.75,0,0],93:[1.25003,1.75,0,0],123:[1.25003,1.75,0,0],125:[1.25003,1.75,0,0],710:[0,.825,0,0],732:[0,.825,0,0],770:[0,.825,0,0],771:[0,.825,0,0],8730:[1.25003,1.75,0,0],8968:[1.25003,1.75,0,0],8969:[1.25003,1.75,0,0],8970:[1.25003,1.75,0,0],8971:[1.25003,1.75,0,0],9115:[.64502,1.155,0,0],9116:[1e-5,.6,0,0],9117:[.64502,1.155,0,0],9118:[.64502,1.155,0,0],9119:[1e-5,.6,0,0],9120:[.64502,1.155,0,0],9121:[.64502,1.155,0,0],9122:[-99e-5,.601,0,0],9123:[.64502,1.155,0,0],9124:[.64502,1.155,0,0],9125:[-99e-5,.601,0,0],9126:[.64502,1.155,0,0],9127:[1e-5,.9,0,0],9128:[.65002,1.15,0,0],9129:[.90001,0,0,0],9130:[0,.3,0,0],9131:[1e-5,.9,0,0],9132:[.65002,1.15,0,0],9133:[.90001,0,0,0],9143:[.88502,.915,0,0],10216:[1.25003,1.75,0,0],10217:[1.25003,1.75,0,0],57344:[-.00499,.605,0,0],57345:[-.00499,.605,0,0],57680:[0,.12,0,0],57681:[0,.12,0,0],57682:[0,.12,0,0],57683:[0,.12,0,0]},"Typewriter-Regular":{33:[0,.61111,0,0],34:[0,.61111,0,0],35:[0,.61111,0,0],36:[.08333,.69444,0,0],37:[.08333,.69444,0,0],38:[0,.61111,0,0],39:[0,.61111,0,0],40:[.08333,.69444,0,0],41:[.08333,.69444,0,0],42:[0,.52083,0,0],43:[-.08056,.53055,0,0],44:[.13889,.125,0,0],45:[-.08056,.53055,0,0],46:[0,.125,0,0],47:[.08333,.69444,0,0],48:[0,.61111,0,0],49:[0,.61111,0,0],50:[0,.61111,0,0],51:[0,.61111,0,0],52:[0,.61111,0,0],53:[0,.61111,0,0],54:[0,.61111,0,0],55:[0,.61111,0,0],56:[0,.61111,0,0],57:[0,.61111,0,0],58:[0,.43056,0,0],59:[.13889,.43056,0,0],60:[-.05556,.55556,0,0],61:[-.19549,.41562,0,0],62:[-.05556,.55556,0,0],63:[0,.61111,0,0],64:[0,.61111,0,0],65:[0,.61111,0,0],66:[0,.61111,0,0],67:[0,.61111,0,0],68:[0,.61111,0,0],69:[0,.61111,0,0],70:[0,.61111,0,0],71:[0,.61111,0,0],72:[0,.61111,0,0],73:[0,.61111,0,0],74:[0,.61111,0,0],75:[0,.61111,0,0],76:[0,.61111,0,0],77:[0,.61111,0,0],78:[0,.61111,0,0],79:[0,.61111,0,0],80:[0,.61111,0,0],81:[.13889,.61111,0,0],82:[0,.61111,0,0],83:[0,.61111,0,0],84:[0,.61111,0,0],85:[0,.61111,0,0],86:[0,.61111,0,0],87:[0,.61111,0,0],88:[0,.61111,0,0],89:[0,.61111,0,0],90:[0,.61111,0,0],91:[.08333,.69444,0,0],92:[.08333,.69444,0,0],93:[.08333,.69444,0,0],94:[0,.61111,0,0],95:[.09514,0,0,0],96:[0,.61111,0,0],97:[0,.43056,0,0],98:[0,.61111,0,0],99:[0,.43056,0,0],100:[0,.61111,0,0],101:[0,.43056,0,0],102:[0,.61111,0,0],103:[.22222,.43056,0,0],104:[0,.61111,0,0],105:[0,.61111,0,0],106:[.22222,.61111,0,0],107:[0,.61111,0,0],108:[0,.61111,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.22222,.43056,0,0],113:[.22222,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.55358,0,0],117:[0,.43056,0,0],118:[0,.43056,0,0],119:[0,.43056,0,0],120:[0,.43056,0,0],121:[.22222,.43056,0,0],122:[0,.43056,0,0],123:[.08333,.69444,0,0],124:[.08333,.69444,0,0],125:[.08333,.69444,0,0],126:[0,.61111,0,0],127:[0,.61111,0,0],305:[0,.43056,0,0],567:[.22222,.43056,0,0],768:[0,.61111,0,0],769:[0,.61111,0,0],770:[0,.61111,0,0],771:[0,.61111,0,0],772:[0,.56555,0,0],774:[0,.61111,0,0],776:[0,.61111,0,0],778:[0,.61111,0,0],780:[0,.56597,0,0],915:[0,.61111,0,0],916:[0,.61111,0,0],920:[0,.61111,0,0],923:[0,.61111,0,0],926:[0,.61111,0,0],928:[0,.61111,0,0],931:[0,.61111,0,0],933:[0,.61111,0,0],934:[0,.61111,0,0],936:[0,.61111,0,0],937:[0,.61111,0,0],2018:[0,.61111,0,0],2019:[0,.61111,0,0],8242:[0,.61111,0,0]}}},function(e,t,n){function r(t,n,r){"string"==typeof t&&(t=[t]),"number"==typeof n&&(n={numArgs:n});for(var i={numArgs:n.numArgs,argTypes:n.argTypes,greediness:void 0===n.greediness?1:n.greediness,allowedInText:!!n.allowedInText,numOptionalArgs:n.numOptionalArgs||0,handler:r},o=0;o<t.length;++o)e.exports[t[o]]=i}var i=n(4),o=n(6);r("\\sqrt",{numArgs:1,numOptionalArgs:1},function(e,t){var n=t[0];return{type:"sqrt",body:t[1],index:n}}),r("\\text",{numArgs:1,argTypes:["text"],greediness:2},function(e,t){var n,r=t[0];return n="ordgroup"===r.type?r.value:[r],{type:"text",body:n}}),r("\\color",{numArgs:2,allowedInText:!0,greediness:3,argTypes:["color","original"]},function(e,t){var n,r=t[0],i=t[1];return n="ordgroup"===i.type?i.value:[i],{type:"color",color:r.value,value:n}}),r("\\overline",{numArgs:1},function(e,t){return{type:"overline",body:t[0]}}),r("\\underline",{numArgs:1},function(e,t){return{type:"underline",body:t[0]}}),r("\\rule",{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},function(e,t){var n=t[0],r=t[1],i=t[2];return{type:"rule",shift:n&&n.value,width:r.value,height:i.value}}),r("\\KaTeX",{numArgs:0},function(e){return{type:"katex"}}),r("\\phantom",{numArgs:1},function(e,t){var n,r=t[0];return n="ordgroup"===r.type?r.value:[r],{type:"phantom",value:n}});var a={"\\bigl":{type:"open",size:1},"\\Bigl":{type:"open",size:2},"\\biggl":{type:"open",size:3},"\\Biggl":{type:"open",size:4},"\\bigr":{type:"close",size:1},"\\Bigr":{type:"close",size:2},"\\biggr":{type:"close",size:3},"\\Biggr":{type:"close",size:4},"\\bigm":{type:"rel",size:1},"\\Bigm":{type:"rel",size:2},"\\biggm":{type:"rel",size:3},"\\Biggm":{type:"rel",size:4},"\\big":{type:"textord",size:1},"\\Big":{type:"textord",size:2},"\\bigg":{type:"textord",size:3},"\\Bigg":{type:"textord",size:4}},s=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","<",">","\\langle","\\rangle","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."],l={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak"};r(["\\blue","\\orange","\\pink","\\red","\\green","\\gray","\\purple","\\blueA","\\blueB","\\blueC","\\blueD","\\blueE","\\tealA","\\tealB","\\tealC","\\tealD","\\tealE","\\greenA","\\greenB","\\greenC","\\greenD","\\greenE","\\goldA","\\goldB","\\goldC","\\goldD","\\goldE","\\redA","\\redB","\\redC","\\redD","\\redE","\\maroonA","\\maroonB","\\maroonC","\\maroonD","\\maroonE","\\purpleA","\\purpleB","\\purpleC","\\purpleD","\\purpleE","\\mintA","\\mintB","\\mintC","\\grayA","\\grayB","\\grayC","\\grayD","\\grayE","\\grayF","\\grayG","\\grayH","\\grayI","\\kaBlue","\\kaGreen"],{numArgs:1,allowedInText:!0,greediness:3},function(e,t){var n,r=t[0];return n="ordgroup"===r.type?r.value:[r],{type:"color",color:"katex-"+e.funcName.slice(1),value:n}}),r(["\\arcsin","\\arccos","\\arctan","\\arg","\\cos","\\cosh","\\cot","\\coth","\\csc","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\tan","\\tanh"],{numArgs:0},function(e){return{type:"op",limits:!1,symbol:!1,body:e.funcName}}),r(["\\det","\\gcd","\\inf","\\lim","\\liminf","\\limsup","\\max","\\min","\\Pr","\\sup"],{numArgs:0},function(e){return{type:"op",limits:!0,symbol:!1,body:e.funcName}}),r(["\\int","\\iint","\\iiint","\\oint"],{numArgs:0},function(e){return{type:"op",limits:!1,symbol:!0,body:e.funcName}}),r(["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint"],{numArgs:0},function(e){return{type:"op",limits:!0,symbol:!0,body:e.funcName}}),r(["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom"],{numArgs:2,greediness:2},function(e,t){var n,r=t[0],i=t[1],o=null,a=null,s="auto";switch(e.funcName){case"\\dfrac":case"\\frac":case"\\tfrac":n=!0;break;case"\\dbinom":case"\\binom":case"\\tbinom":n=!1,o="(",a=")";break;default:throw new Error("Unrecognized genfrac command")}switch(e.funcName){case"\\dfrac":case"\\dbinom":s="display";break;case"\\tfrac":case"\\tbinom":s="text"}return{type:"genfrac",numer:r,denom:i,hasBarLine:n,leftDelim:o,rightDelim:a,size:s}}),r(["\\llap","\\rlap"],{numArgs:1,allowedInText:!0},function(e,t){var n=t[0];return{type:e.funcName.slice(1),body:n}}),r(["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg","\\left","\\right"],{numArgs:1},function(e,t){var n=t[0];if(!i.contains(s,n.value))throw new o("Invalid delimiter: '"+n.value+"' after '"+e.funcName+"'",e.lexer,e.positions[1]);return"\\left"===e.funcName||"\\right"===e.funcName?{type:"leftright",value:n.value}:{type:"delimsizing",size:a[e.funcName].size,delimType:a[e.funcName].type,value:n.value}}),r(["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],0,null),r(["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],0,null),r(["\\mathrm","\\mathit","\\mathbf","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],{numArgs:1,greediness:2},function(e,t){var n=t[0],r=e.funcName;return r in l&&(r=l[r]),{type:"font",font:r.slice(1),body:n}}),r(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot"],{numArgs:1},function(e,t){var n=t[0];return{type:"accent",accent:e.funcName,base:n}}),r(["\\over","\\choose"],{numArgs:0},function(e){var t;switch(e.funcName){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",replaceWith:t}}),r(["\\\\","\\cr"],{numArgs:0,numOptionalArgs:1,argTypes:["size"]},function(e,t){return{type:"cr",size:t[0]}}),r(["\\begin","\\end"],{numArgs:1,argTypes:["text"]},function(e,t){var n=t[0];if("ordgroup"!==n.type)throw new o("Invalid environment name",e.lexer,e.positions[1]);for(var r="",i=0;i<n.value.length;++i)r+=n.value[i].value;return{type:"environment",name:r,namepos:e.positions[1]}})},function(e,t,n){function r(e,t){this.type=e,this.attributes={},this.children=t||[]}function i(e){this.text=e}var o=n(4);r.prototype.setAttribute=function(e,t){this.attributes[e]=t},r.prototype.toNode=function(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&e.setAttribute(t,this.attributes[t]);for(var n=0;n<this.children.length;n++)e.appendChild(this.children[n].toNode());return e},r.prototype.toMarkup=function(){var e="<"+this.type;for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&(e+=" "+t+'="',e+=o.escape(this.attributes[t]),e+='"');e+=">";for(var n=0;n<this.children.length;n++)e+=this.children[n].toMarkup();return e+="</"+this.type+">"},i.prototype.toNode=function(){return document.createTextNode(this.text)},i.prototype.toMarkup=function(){return o.escape(this.text)},e.exports={MathNode:r,TextNode:i}},function(e,t,n){var r=n(171),i=function(e,t){return new r(e,t).parse()};e.exports=i},function(e,t,n){"use strict";function r(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}function i(e){return Object.prototype.toString.call(e)}function o(e){return"[object String]"===i(e)}function a(e){return"[object Object]"===i(e)}function s(e){return"[object RegExp]"===i(e)}function l(e){return"[object Function]"===i(e)}function c(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function u(e){return Object.keys(e||{}).reduce(function(e,t){return e||b.hasOwnProperty(t)},!1)}function h(e){e.__index__=-1,e.__text_cache__=""}function p(e){return function(t,n){var r=t.slice(n);return e.test(r)?r.match(e)[0].length:0}}function d(){return function(e,t){t.normalize(e)}}function f(e){function t(e){return e.replace("%TLDS%",i.src_tlds)}function r(e,t){throw new Error('(LinkifyIt) Invalid schema "'+e+'": '+t)}var i=e.re=n(182)(e.__opts__),u=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||u.push(y),u.push(i.src_xn),i.src_tlds=u.join("|"),i.email_fuzzy=RegExp(t(i.tpl_email_fuzzy),"i"),i.link_fuzzy=RegExp(t(i.tpl_link_fuzzy),"i"),i.link_no_ip_fuzzy=RegExp(t(i.tpl_link_no_ip_fuzzy),"i"),i.host_fuzzy_test=RegExp(t(i.tpl_host_fuzzy_test),"i");var f=[];e.__compiled__={},Object.keys(e.__schemas__).forEach(function(t){var n=e.__schemas__[t];if(null!==n){var i={validate:null,link:null};return e.__compiled__[t]=i,a(n)?(s(n.validate)?i.validate=p(n.validate):l(n.validate)?i.validate=n.validate:r(t,n),void(l(n.normalize)?i.normalize=n.normalize:n.normalize?r(t,n):i.normalize=d())):o(n)?void f.push(t):void r(t,n)}}),f.forEach(function(t){e.__compiled__[e.__schemas__[t]]&&(e.__compiled__[t].validate=e.__compiled__[e.__schemas__[t]].validate,e.__compiled__[t].normalize=e.__compiled__[e.__schemas__[t]].normalize)}),e.__compiled__[""]={validate:null,normalize:d()};var g=Object.keys(e.__compiled__).filter(function(t){return t.length>0&&e.__compiled__[t]}).map(c).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+i.src_ZPCc+"))("+g+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+i.src_ZPCc+"))("+g+")","ig"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),h(e)}function g(e,t){var n=e.__index__,r=e.__last_index__,i=e.__text_cache__.slice(n,r);this.schema=e.__schema__.toLowerCase(),this.index=n+t,this.lastIndex=r+t,this.raw=i,this.text=i,this.url=i}function m(e,t){var n=new g(e,t);return e.__compiled__[n.schema].normalize(n,e),n}function _(e,t){if(!(this instanceof _))return new _(e,t);t||u(e)&&(t=e,e={}),this.__opts__=r({},b,t),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=r({},v,e),this.__compiled__={},this.__tlds__=k,this.__tlds_replaced__=!1,this.re={},f(this)}var b={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},v={"http:":{validate:function(e,t,n){var r=e.slice(t);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,t,n){var r=e.slice(t);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?t>=3&&":"===e[t-3]?0:t>=3&&"/"===e[t-3]?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,n){var r=e.slice(t);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},y="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",k="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");_.prototype.add=function(e,t){return this.__schemas__[e]=t,f(this),this},_.prototype.set=function(e){return this.__opts__=r(this.__opts__,e),this},_.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;var t,n,r,i,o,a,s,l;if(this.re.schema_test.test(e))for(s=this.re.schema_search,s.lastIndex=0;null!==(t=s.exec(e));)if(i=this.testSchemaAt(e,t[2],s.lastIndex)){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(l=e.search(this.re.host_fuzzy_test))>=0&&(this.__index__<0||l<this.__index__)&&null!==(n=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))&&(o=n.index+n[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=n.index+n[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&e.indexOf("@")>=0&&null!==(r=e.match(this.re.email_fuzzy))&&(o=r.index+r[1].length,a=r.index+r[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=a)),this.__index__>=0},_.prototype.pretest=function(e){return this.re.pretest.test(e)},_.prototype.testSchemaAt=function(e,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,n,this):0},_.prototype.match=function(e){var t=0,n=[];this.__index__>=0&&this.__text_cache__===e&&(n.push(m(this,t)),t=this.__last_index__);for(var r=t?e.slice(t):e;this.test(r);)n.push(m(this,t)),r=r.slice(this.__last_index__),t+=this.__last_index__;return n.length?n:null},_.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(e,t,n){return e!==n[t-1]}).reverse(),f(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,f(this),this)},_.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),"mailto:"!==e.schema||/^mailto:/i.test(e.url)||(e.url="mailto:"+e.url)},_.prototype.onCompile=function(){},e.exports=_},function(e,t,n){"use strict";e.exports=function(e){var t={};t.src_Any=n(65).source,t.src_Cc=n(63).source,t.src_Z=n(64).source,t.src_P=n(43).source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join("|"),t.src_ZCc=[t.src_Z,t.src_Cc].join("|");return t.src_pseudo_letter="(?:(?![><｜]|"+t.src_ZPCc+")"+t.src_Any+")",t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",t.src_auth="(?:(?:(?!"+t.src_ZCc+"|[@/\\[\\]()]).)+@)?",t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",t.src_host_terminator="(?=$|[><｜]|"+t.src_ZPCc+")(?!-|_|:\\d|\\.-|\\.(?!$|"+t.src_ZPCc+"))",t.src_path="(?:[/?#](?:(?!"+t.src_ZCc+"|[><｜]|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!"+t.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+t.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+t.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+t.src_ZCc+'|["]).)+\\"|\\\'(?:(?!'+t.src_ZCc+"|[']).)+\\'|\\'(?="+t.src_pseudo_letter+"|[-]).|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!"+t.src_ZCc+"|[.]).|"+(e&&e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+"\\,(?!"+t.src_ZCc+").|\\!(?!"+t.src_ZCc+"|[!]).|\\?(?!"+t.src_ZCc+"|[?]).)+|\\/)?",t.src_email_name='[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+',t.src_xn="xn--[a-z0-9\\-]{1,59}",t.src_domain_root="(?:"+t.src_xn+"|"+t.src_pseudo_letter+"{1,63})",t.src_domain="(?:"+t.src_xn+"|(?:"+t.src_pseudo_letter+")|(?:"+t.src_pseudo_letter+"(?:-(?!-)|"+t.src_pseudo_letter+"){0,61}"+t.src_pseudo_letter+"))",t.src_host="(?:(?:(?:(?:"+t.src_domain+")\\.)*"+t.src_domain+"))",t.tpl_host_fuzzy="(?:"+t.src_ip4+"|(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%)))",t.tpl_host_no_ip_fuzzy="(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%))",t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+t.src_ZPCc+"|>|$))",t.tpl_email_fuzzy="(^|[><｜]|\\(|"+t.src_ZCc+")("+t.src_email_name+"@"+t.tpl_host_fuzzy_strict+")",t.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_fuzzy_strict+t.src_path+")",t.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_no_ip_fuzzy_strict+t.src_path+")",t}},function(e,t,n){"use strict";e.exports=function(e){function t(e,t,n,r){var i,o,a,s,l,c=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(c+2>=u)return!1;if(42!==e.src.charCodeAt(c++))return!1;if(91!==e.src.charCodeAt(c++))return!1;for(s=c;c<u;c++){if(91===(a=e.src.charCodeAt(c)))return!1;if(93===a){l=c;break}92===a&&c++}return!(l<0||58!==e.src.charCodeAt(l+1))&&(!!r||(i=e.src.slice(s,l).replace(/\\(.)/g,"$1"),o=e.src.slice(l+2,u).trim(),0!==i.length&&(0!==o.length&&(e.env.abbreviations||(e.env.abbreviations={}),void 0===e.env.abbreviations[":"+i]&&(e.env.abbreviations[":"+i]=o),e.line=t+1,!0))))}function n(e){var t,n,l,c,u,h,p,d,f,g,m,_,b,v=e.tokens;if(e.env.abbreviations)for(_=new RegExp("(?:"+Object.keys(e.env.abbreviations).map(function(e){return e.substr(1)}).sort(function(e,t){return t.length-e.length}).map(r).join("|")+")"),m="(^|"+a+"|"+s+"|["+o.split("").map(r).join("")+"])("+Object.keys(e.env.abbreviations).map(function(e){return e.substr(1)}).sort(function(e,t){return t.length-e.length}).map(r).join("|")+")($|"+a+"|"+s+"|["+o.split("").map(r).join("")+"])",f=new RegExp(m,"g"),n=0,l=v.length;n<l;n++)if("inline"===v[n].type)for(c=v[n].children,t=c.length-1;t>=0;t--)if(b=c[t],"text"===b.type&&(d=0,h=b.content,f.lastIndex=0,p=[],_.test(h))){for(;g=f.exec(h);)(g.index>0||g[1].length>0)&&(u=new e.Token("text","",0),u.content=h.slice(d,g.index+g[1].length),p.push(u)),u=new e.Token("abbr_open","abbr",1),u.attrs=[["title",e.env.abbreviations[":"+g[2]]]],p.push(u),u=new e.Token("text","",0),u.content=g[2],p.push(u),u=new e.Token("abbr_close","abbr",-1),p.push(u),f.lastIndex-=g[3].length,d=f.lastIndex;p.length&&(d<h.length&&(u=new e.Token("text","",0),u.content=h.slice(d),p.push(u)),v[n].children=c=i(c,t,p))}}var r=e.utils.escapeRE,i=e.utils.arrayReplaceAt,o=" \r\n$+<=>^`|~",a=e.utils.lib.ucmicro.P.source,s=e.utils.lib.ucmicro.Z.source;e.block.ruler.before("reference","abbr_def",t,{alt:["paragraph","reference"]}),e.core.ruler.after("linkify","abbr_replace",n)}},function(e,t,n){"use strict";e.exports=function(e,t,n){function r(e){return e.trim().split(" ",2)[0]===t}function i(e,n,r,i,o){return 1===e[n].nesting&&e[n].attrPush(["class",t]),o.renderToken(e,n,r,i,o)}function o(e,n,r,i){var o,h,p,d,f,g,m,_,b=!1,v=e.bMarks[n]+e.tShift[n],y=e.eMarks[n];if(l!==e.src.charCodeAt(v))return!1;for(o=v+1;o<=y&&s[(o-v)%c]===e.src[o];o++);if((p=Math.floor((o-v)/c))<a)return!1;if(o-=(o-v)%c,d=e.src.slice(v,o),f=e.src.slice(o,y),!u(f))return!1;if(i)return!0;for(h=n;!(++h>=r)&&(v=e.bMarks[h]+e.tShift[h],y=e.eMarks[h],!(v<y&&e.sCount[h]<e.blkIndent));)if(l===e.src.charCodeAt(v)&&!(e.sCount[h]-e.blkIndent>=4)){for(o=v+1;o<=y&&s[(o-v)%c]===e.src[o];o++);if(!(Math.floor((o-v)/c)<p||(o-=(o-v)%c,(o=e.skipSpaces(o))<y))){b=!0;break}}return m=e.parentType,_=e.lineMax,e.parentType="container",e.lineMax=h,g=e.push("container_"+t+"_open","div",1),g.markup=d,g.block=!0,g.info=f,g.map=[n,h],e.md.block.tokenize(e,n+1,h),g=e.push("container_"+t+"_close","div",-1),g.markup=e.src.slice(v,o),g.block=!0,e.parentType=m,e.lineMax=_,e.line=h+(b?1:0),!0}n=n||{};var a=3,s=n.marker||":",l=s.charCodeAt(0),c=s.length,u=n.validate||r,h=n.render||i;e.block.ruler.before("fence","container_"+t,o,{alt:["paragraph","reference","blockquote","list"]}),e.renderer.rules["container_"+t+"_open"]=h,e.renderer.rules["container_"+t+"_close"]=h}},function(e,t,n){"use strict";e.exports=function(e){function t(e,t){var n,r,i=e.bMarks[t]+e.tShift[t],o=e.eMarks[t];return i>=o?-1:126!==(r=e.src.charCodeAt(i++))&&58!==r?-1:(n=e.skipSpaces(i),i===n?-1:n>=o?-1:i)}function n(e,t){var n,r,i=e.level+2;for(n=t+2,r=e.tokens.length-2;n<r;n++)e.tokens[n].level===i&&"paragraph_open"===e.tokens[n].type&&(e.tokens[n+2].hidden=!0,e.tokens[n].hidden=!0,n+=2)}function r(e,r,o,a){var s,l,c,u,h,p,d,f,g,m,_,b,v,y,k,w,x,C,j,A;if(a)return!(e.ddIndent<0)&&t(e,r)>=0;if((g=r+1)>=o)return!1;if(e.isEmpty(g)&&++g>=o)return!1;if(e.sCount[g]<e.blkIndent)return!1;if((l=t(e,g))<0)return!1;d=e.tokens.length,j=!0,A=e.push("dl_open","dl",1),A.map=p=[r,0],u=r,c=g;e:for(;;){for(C=!1,A=e.push("dt_open","dt",1),A.map=[u,u],A=e.push("inline","",0),A.map=[u,u],A.content=e.getLines(u,u+1,e.blkIndent,!1).trim(),A.children=[],A=e.push("dt_close","dt",-1);;){for(A=e.push("dd_open","dd",1),A.map=h=[g,0],x=l,f=e.eMarks[c],m=e.sCount[c]+l-(e.bMarks[c]+e.tShift[c]);x<f&&(s=e.src.charCodeAt(x),i(s));)9===s?m+=4-m%4:m++,x++;if(l=x,w=e.tight,_=e.ddIndent,b=e.blkIndent,k=e.tShift[c],y=e.sCount[c],v=e.parentType,e.blkIndent=e.ddIndent=e.sCount[c]+2,e.tShift[c]=l-e.bMarks[c],e.sCount[c]=m,e.tight=!0,e.parentType="deflist",e.md.block.tokenize(e,c,o,!0),e.tight&&!C||(j=!1),C=e.line-c>1&&e.isEmpty(e.line-1),e.tShift[c]=k,e.sCount[c]=y,e.tight=w,e.parentType=v,e.blkIndent=b,e.ddIndent=_,A=e.push("dd_close","dd",-1),h[1]=g=e.line,g>=o)break e;if(e.sCount[g]<e.blkIndent)break e;if((l=t(e,g))<0)break;c=g}if(g>=o)break;if(u=g,e.isEmpty(u))break;if(e.sCount[u]<e.blkIndent)break;if((c=u+1)>=o)break;if(e.isEmpty(c)&&c++,c>=o)break;if(e.sCount[c]<e.blkIndent)break;if((l=t(e,c))<0)break}return A=e.push("dl_close","dl",-1),p[1]=g,e.line=g,j&&n(e,d),!0}var i=e.utils.isSpace;e.block.ruler.before("paragraph","deflist",r,{alt:["paragraph","reference"]})}},function(e,t,n){"use strict";var r=n(187),i=n(188),o=n(190),a=n(191),s=n(189);e.exports=function(e,t){var n={defs:r,shortcuts:i,enabled:[]},l=s(e.utils.assign({},n,t||{}));e.renderer.rules.emoji=o,e.core.ruler.push("emoji",a(e,l.defs,l.shortcuts,l.scanRE,l.replaceRE))}},function(e,t){e.exports={100:"💯",1234:"🔢",grinning:"😀",smiley:"😃",smile:"😄",grin:"😁",laughing:"😆",satisfied:"😆",sweat_smile:"😅",joy:"😂",rofl:"🤣",relaxed:"☺️",blush:"😊",innocent:"😇",slightly_smiling_face:"🙂",upside_down_face:"🙃",wink:"😉",relieved:"😌",heart_eyes:"😍",kissing_heart:"😘",kissing:"😗",kissing_smiling_eyes:"😙",kissing_closed_eyes:"😚",yum:"😋",stuck_out_tongue_winking_eye:"😜",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue:"😛",money_mouth_face:"🤑",hugs:"🤗",nerd_face:"🤓",sunglasses:"😎",clown_face:"🤡",cowboy_hat_face:"🤠",smirk:"😏",unamused:"😒",disappointed:"😞",pensive:"😔",worried:"😟",confused:"😕",slightly_frowning_face:"🙁",frowning_face:"☹️",persevere:"😣",confounded:"😖",tired_face:"😫",weary:"😩",triumph:"😤",angry:"😠",rage:"😡",pout:"😡",no_mouth:"😶",neutral_face:"😐",expressionless:"😑",hushed:"😯",frowning:"😦",anguished:"😧",open_mouth:"😮",astonished:"😲",dizzy_face:"😵",flushed:"😳",scream:"😱",fearful:"😨",cold_sweat:"😰",cry:"😢",disappointed_relieved:"😥",drooling_face:"🤤",sob:"😭",sweat:"😓",sleepy:"😪",sleeping:"😴",roll_eyes:"🙄",thinking:"🤔",lying_face:"🤥",grimacing:"😬",zipper_mouth_face:"🤐",nauseated_face:"🤢",sneezing_face:"🤧",mask:"😷",face_with_thermometer:"🤒",face_with_head_bandage:"🤕",smiling_imp:"😈",imp:"👿",japanese_ogre:"👹",japanese_goblin:"👺",hankey:"💩",poop:"💩",shit:"💩",ghost:"👻",skull:"💀",skull_and_crossbones:"☠️",alien:"👽",space_invader:"👾",robot:"🤖",jack_o_lantern:"🎃",smiley_cat:"😺",smile_cat:"😸",joy_cat:"😹",heart_eyes_cat:"😻",smirk_cat:"😼",kissing_cat:"😽",scream_cat:"🙀",crying_cat_face:"😿",pouting_cat:"😾",open_hands:"👐",raised_hands:"🙌",clap:"👏",pray:"🙏",handshake:"🤝","+1":"👍",thumbsup:"👍","-1":"👎",thumbsdown:"👎",fist_oncoming:"👊",facepunch:"👊",punch:"👊",fist_raised:"✊",fist:"✊",fist_left:"🤛",fist_right:"🤜",crossed_fingers:"🤞",v:"✌️",metal:"🤘",ok_hand:"👌",point_left:"👈",point_right:"👉",point_up_2:"👆",point_down:"👇",point_up:"☝️",hand:"✋",raised_hand:"✋",raised_back_of_hand:"🤚",raised_hand_with_fingers_splayed:"🖐",vulcan_salute:"🖖",wave:"👋",call_me_hand:"🤙",muscle:"💪",middle_finger:"🖕",fu:"🖕",writing_hand:"✍️",selfie:"🤳",nail_care:"💅",ring:"💍",lipstick:"💄",kiss:"💋",lips:"👄",tongue:"👅",ear:"👂",nose:"👃",footprints:"👣",eye:"👁",eyes:"👀",speaking_head:"🗣",bust_in_silhouette:"👤",busts_in_silhouette:"👥",baby:"👶",boy:"👦",girl:"👧",man:"👨",woman:"👩",blonde_woman:"👱‍♀",blonde_man:"👱",person_with_blond_hair:"👱",older_man:"👴",older_woman:"👵",man_with_gua_pi_mao:"👲",woman_with_turban:"👳‍♀",man_with_turban:"👳",policewoman:"👮‍♀",policeman:"👮",cop:"👮",construction_worker_woman:"👷‍♀",construction_worker_man:"👷",construction_worker:"👷",guardswoman:"💂‍♀",guardsman:"💂",female_detective:"🕵️‍♀️",male_detective:"🕵",detective:"🕵",woman_health_worker:"👩‍⚕",man_health_worker:"👨‍⚕",woman_farmer:"👩‍🌾",man_farmer:"👨‍🌾",woman_cook:"👩‍🍳",man_cook:"👨‍🍳",woman_student:"👩‍🎓",man_student:"👨‍🎓",woman_singer:"👩‍🎤",man_singer:"👨‍🎤",woman_teacher:"👩‍🏫",man_teacher:"👨‍🏫",woman_factory_worker:"👩‍🏭",man_factory_worker:"👨‍🏭",woman_technologist:"👩‍💻",man_technologist:"👨‍💻",woman_office_worker:"👩‍💼",man_office_worker:"👨‍💼",woman_mechanic:"👩‍🔧",man_mechanic:"👨‍🔧",woman_scientist:"👩‍🔬",man_scientist:"👨‍🔬",woman_artist:"👩‍🎨",man_artist:"👨‍🎨",woman_firefighter:"👩‍🚒",man_firefighter:"👨‍🚒",woman_pilot:"👩‍✈",man_pilot:"👨‍✈",woman_astronaut:"👩‍🚀",man_astronaut:"👨‍🚀",woman_judge:"👩‍⚖",man_judge:"👨‍⚖",mrs_claus:"🤶",santa:"🎅",princess:"👸",prince:"🤴",bride_with_veil:"👰",man_in_tuxedo:"🤵",angel:"👼",pregnant_woman:"🤰",bowing_woman:"🙇‍♀",bowing_man:"🙇",bow:"🙇",tipping_hand_woman:"💁",information_desk_person:"💁",sassy_woman:"💁",tipping_hand_man:"💁‍♂",sassy_man:"💁‍♂",no_good_woman:"🙅",no_good:"🙅",ng_woman:"🙅",no_good_man:"🙅‍♂",ng_man:"🙅‍♂",ok_woman:"🙆",ok_man:"🙆‍♂",raising_hand_woman:"🙋",raising_hand:"🙋",raising_hand_man:"🙋‍♂",woman_facepalming:"🤦‍♀",man_facepalming:"🤦‍♂",woman_shrugging:"🤷‍♀",man_shrugging:"🤷‍♂",pouting_woman:"🙎",person_with_pouting_face:"🙎",pouting_man:"🙎‍♂",frowning_woman:"🙍",person_frowning:"🙍",frowning_man:"🙍‍♂",haircut_woman:"💇",haircut:"💇",haircut_man:"💇‍♂",massage_woman:"💆",massage:"💆",massage_man:"💆‍♂",business_suit_levitating:"🕴",dancer:"💃",man_dancing:"🕺",dancing_women:"👯",dancers:"👯",dancing_men:"👯‍♂",walking_woman:"🚶‍♀",walking_man:"🚶",walking:"🚶",running_woman:"🏃‍♀",running_man:"🏃",runner:"🏃",running:"🏃",couple:"👫",two_women_holding_hands:"👭",two_men_holding_hands:"👬",couple_with_heart_woman_man:"💑",couple_with_heart:"💑",couple_with_heart_woman_woman:"👩‍❤️‍👩",couple_with_heart_man_man:"👨‍❤️‍👨",couplekiss_man_woman:"💏",couplekiss_woman_woman:"👩‍❤️‍💋‍👩",couplekiss_man_man:"👨‍❤️‍💋‍👨",family_man_woman_boy:"👪",family:"👪",family_man_woman_girl:"👨‍👩‍👧",family_man_woman_girl_boy:"👨‍👩‍👧‍👦",family_man_woman_boy_boy:"👨‍👩‍👦‍👦",family_man_woman_girl_girl:"👨‍👩‍👧‍👧",family_woman_woman_boy:"👩‍👩‍👦",family_woman_woman_girl:"👩‍👩‍👧",family_woman_woman_girl_boy:"👩‍👩‍👧‍👦",family_woman_woman_boy_boy:"👩‍👩‍👦‍👦",family_woman_woman_girl_girl:"👩‍👩‍👧‍👧",family_man_man_boy:"👨‍👨‍👦",family_man_man_girl:"👨‍👨‍👧",family_man_man_girl_boy:"👨‍👨‍👧‍👦",family_man_man_boy_boy:"👨‍👨‍👦‍👦",family_man_man_girl_girl:"👨‍👨‍👧‍👧",family_woman_boy:"👩‍👦",family_woman_girl:"👩‍👧",family_woman_girl_boy:"👩‍👧‍👦",family_woman_boy_boy:"👩‍👦‍👦",family_woman_girl_girl:"👩‍👧‍👧",family_man_boy:"👨‍👦",family_man_girl:"👨‍👧",family_man_girl_boy:"👨‍👧‍👦",family_man_boy_boy:"👨‍👦‍👦",family_man_girl_girl:"👨‍👧‍👧",womans_clothes:"👚",shirt:"👕",tshirt:"👕",jeans:"👖",necktie:"👔",dress:"👗",bikini:"👙",kimono:"👘",high_heel:"👠",sandal:"👡",boot:"👢",mans_shoe:"👞",shoe:"👞",athletic_shoe:"👟",womans_hat:"👒",tophat:"🎩",mortar_board:"🎓",crown:"👑",rescue_worker_helmet:"⛑",school_satchel:"🎒",pouch:"👝",purse:"👛",handbag:"👜",briefcase:"💼",eyeglasses:"👓",dark_sunglasses:"🕶",closed_umbrella:"🌂",open_umbrella:"☂️",dog:"🐶",cat:"🐱",mouse:"🐭",hamster:"🐹",rabbit:"🐰",fox_face:"🦊",bear:"🐻",panda_face:"🐼",koala:"🐨",tiger:"🐯",lion:"🦁",cow:"🐮",pig:"🐷",pig_nose:"🐽",frog:"🐸",monkey_face:"🐵",see_no_evil:"🙈",hear_no_evil:"🙉",speak_no_evil:"🙊",monkey:"🐒",chicken:"🐔",penguin:"🐧",bird:"🐦",baby_chick:"🐤",hatching_chick:"🐣",hatched_chick:"🐥",duck:"🦆",eagle:"🦅",owl:"🦉",bat:"🦇",wolf:"🐺",boar:"🐗",horse:"🐴",unicorn:"🦄",bee:"🐝",honeybee:"🐝",bug:"🐛",butterfly:"🦋",snail:"🐌",shell:"🐚",beetle:"🐞",ant:"🐜",spider:"🕷",spider_web:"🕸",turtle:"🐢",snake:"🐍",lizard:"🦎",scorpion:"🦂",crab:"🦀",squid:"🦑",octopus:"🐙",shrimp:"🦐",tropical_fish:"🐠",fish:"🐟",blowfish:"🐡",dolphin:"🐬",flipper:"🐬",shark:"🦈",whale:"🐳",whale2:"🐋",crocodile:"🐊",leopard:"🐆",tiger2:"🐅",water_buffalo:"🐃",ox:"🐂",cow2:"🐄",deer:"🦌",dromedary_camel:"🐪",camel:"🐫",elephant:"🐘",rhinoceros:"🦏",gorilla:"🦍",racehorse:"🐎",pig2:"🐖",goat:"🐐",ram:"🐏",sheep:"🐑",dog2:"🐕",poodle:"🐩",cat2:"🐈",rooster:"🐓",turkey:"🦃",dove:"🕊",rabbit2:"🐇",mouse2:"🐁",rat:"🐀",chipmunk:"🐿",feet:"🐾",paw_prints:"🐾",dragon:"🐉",dragon_face:"🐲",cactus:"🌵",christmas_tree:"🎄",evergreen_tree:"🌲",deciduous_tree:"🌳",palm_tree:"🌴",seedling:"🌱",herb:"🌿",shamrock:"☘️",four_leaf_clover:"🍀",bamboo:"🎍",tanabata_tree:"🎋",leaves:"🍃",fallen_leaf:"🍂",maple_leaf:"🍁",mushroom:"🍄",ear_of_rice:"🌾",bouquet:"💐",tulip:"🌷",rose:"🌹",wilted_flower:"🥀",sunflower:"🌻",blossom:"🌼",cherry_blossom:"🌸",hibiscus:"🌺",earth_americas:"🌎",earth_africa:"🌍",earth_asia:"🌏",full_moon:"🌕",waning_gibbous_moon:"🌖",last_quarter_moon:"🌗",waning_crescent_moon:"🌘",new_moon:"🌑",waxing_crescent_moon:"🌒",first_quarter_moon:"🌓",moon:"🌔",waxing_gibbous_moon:"🌔",new_moon_with_face:"🌚",full_moon_with_face:"🌝",sun_with_face:"🌞",first_quarter_moon_with_face:"🌛",last_quarter_moon_with_face:"🌜",crescent_moon:"🌙",dizzy:"💫",star:"⭐️",star2:"🌟",sparkles:"✨",zap:"⚡️",fire:"🔥",boom:"💥",collision:"💥",comet:"☄",sunny:"☀️",sun_behind_small_cloud:"🌤",partly_sunny:"⛅️",sun_behind_large_cloud:"🌥",sun_behind_rain_cloud:"🌦",rainbow:"🌈",cloud:"☁️",cloud_with_rain:"🌧",cloud_with_lightning_and_rain:"⛈",cloud_with_lightning:"🌩",cloud_with_snow:"🌨",snowman_with_snow:"☃️",snowman:"⛄️",snowflake:"❄️",wind_face:"🌬",dash:"💨",tornado:"🌪",fog:"🌫",ocean:"🌊",droplet:"💧",sweat_drops:"💦",umbrella:"☔️",green_apple:"🍏",apple:"🍎",pear:"🍐",tangerine:"🍊",orange:"🍊",mandarin:"🍊",lemon:"🍋",banana:"🍌",watermelon:"🍉",grapes:"🍇",strawberry:"🍓",melon:"🍈",cherries:"🍒",peach:"🍑",pineapple:"🍍",kiwi_fruit:"🥝",avocado:"🥑",tomato:"🍅",eggplant:"🍆",cucumber:"🥒",carrot:"🥕",corn:"🌽",hot_pepper:"🌶",potato:"🥔",sweet_potato:"🍠",chestnut:"🌰",peanuts:"🥜",honey_pot:"🍯",croissant:"🥐",bread:"🍞",baguette_bread:"🥖",cheese:"🧀",egg:"🥚",fried_egg:"🍳",bacon:"🥓",pancakes:"🥞",fried_shrimp:"🍤",poultry_leg:"🍗",meat_on_bone:"🍖",pizza:"🍕",hotdog:"🌭",hamburger:"🍔",fries:"🍟",stuffed_flatbread:"🥙",taco:"🌮",burrito:"🌯",green_salad:"🥗",shallow_pan_of_food:"🥘",spaghetti:"🍝",ramen:"🍜",stew:"🍲",fish_cake:"🍥",sushi:"🍣",bento:"🍱",curry:"🍛",rice:"🍚",rice_ball:"🍙",rice_cracker:"🍘",oden:"🍢",dango:"🍡",shaved_ice:"🍧",ice_cream:"🍨",icecream:"🍦",cake:"🍰",birthday:"🎂",custard:"🍮",lollipop:"🍭",candy:"🍬",chocolate_bar:"🍫",popcorn:"🍿",doughnut:"🍩",cookie:"🍪",milk_glass:"🥛",baby_bottle:"🍼",coffee:"☕️",tea:"🍵",sake:"🍶",beer:"🍺",beers:"🍻",clinking_glasses:"🥂",wine_glass:"🍷",tumbler_glass:"🥃",cocktail:"🍸",tropical_drink:"🍹",champagne:"🍾",spoon:"🥄",fork_and_knife:"🍴",plate_with_cutlery:"🍽",soccer:"⚽️",basketball:"🏀",football:"🏈",baseball:"⚾️",tennis:"🎾",volleyball:"🏐",rugby_football:"🏉","8ball":"🎱",ping_pong:"🏓",badminton:"🏸",goal_net:"🥅",ice_hockey:"🏒",field_hockey:"🏑",cricket:"🏏",golf:"⛳️",bow_and_arrow:"🏹",fishing_pole_and_fish:"🎣",boxing_glove:"🥊",martial_arts_uniform:"🥋",ice_skate:"⛸",ski:"🎿",skier:"⛷",snowboarder:"🏂",weight_lifting_woman:"🏋️‍♀️",weight_lifting_man:"🏋",person_fencing:"🤺",women_wrestling:"🤼‍♀",men_wrestling:"🤼‍♂",woman_cartwheeling:"🤸‍♀",man_cartwheeling:"🤸‍♂",basketball_woman:"⛹️‍♀️",basketball_man:"⛹",woman_playing_handball:"🤾‍♀",man_playing_handball:"🤾‍♂",golfing_woman:"🏌️‍♀️",golfing_man:"🏌",surfing_woman:"🏄‍♀",surfing_man:"🏄",surfer:"🏄",swimming_woman:"🏊‍♀",swimming_man:"🏊",swimmer:"🏊",woman_playing_water_polo:"🤽‍♀",man_playing_water_polo:"🤽‍♂",rowing_woman:"🚣‍♀",rowing_man:"🚣",rowboat:"🚣",horse_racing:"🏇",biking_woman:"🚴‍♀",biking_man:"🚴",bicyclist:"🚴",mountain_biking_woman:"🚵‍♀",mountain_biking_man:"🚵",mountain_bicyclist:"🚵",running_shirt_with_sash:"🎽",medal_sports:"🏅",medal_military:"🎖","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉",trophy:"🏆",rosette:"🏵",reminder_ribbon:"🎗",ticket:"🎫",tickets:"🎟",circus_tent:"🎪",woman_juggling:"🤹‍♀",man_juggling:"🤹‍♂",performing_arts:"🎭",art:"🎨",clapper:"🎬",microphone:"🎤",headphones:"🎧",musical_score:"🎼",musical_keyboard:"🎹",drum:"🥁",saxophone:"🎷",trumpet:"🎺",guitar:"🎸",violin:"🎻",game_die:"🎲",dart:"🎯",bowling:"🎳",video_game:"🎮",slot_machine:"🎰",car:"🚗",red_car:"🚗",taxi:"🚕",blue_car:"🚙",bus:"🚌",trolleybus:"🚎",racing_car:"🏎",police_car:"🚓",ambulance:"🚑",fire_engine:"🚒",minibus:"🚐",truck:"🚚",articulated_lorry:"🚛",tractor:"🚜",kick_scooter:"🛴",bike:"🚲",motor_scooter:"🛵",motorcycle:"🏍",rotating_light:"🚨",oncoming_police_car:"🚔",oncoming_bus:"🚍",oncoming_automobile:"🚘",oncoming_taxi:"🚖",aerial_tramway:"🚡",mountain_cableway:"🚠",suspension_railway:"🚟",railway_car:"🚃",train:"🚋",mountain_railway:"🚞",monorail:"🚝",bullettrain_side:"🚄",bullettrain_front:"🚅",light_rail:"🚈",steam_locomotive:"🚂",train2:"🚆",metro:"🚇",tram:"🚊",station:"🚉",helicopter:"🚁",small_airplane:"🛩",airplane:"✈️",flight_departure:"🛫",flight_arrival:"🛬",rocket:"🚀",artificial_satellite:"🛰",seat:"💺",canoe:"🛶",boat:"⛵️",sailboat:"⛵️",motor_boat:"🛥",speedboat:"🚤",passenger_ship:"🛳",ferry:"⛴",ship:"🚢",anchor:"⚓️",construction:"🚧",fuelpump:"⛽️",busstop:"🚏",vertical_traffic_light:"🚦",traffic_light:"🚥",world_map:"🗺",moyai:"🗿",statue_of_liberty:"🗽",fountain:"⛲️",tokyo_tower:"🗼",european_castle:"🏰",japanese_castle:"🏯",stadium:"🏟",ferris_wheel:"🎡",roller_coaster:"🎢",carousel_horse:"🎠",parasol_on_ground:"⛱",beach_umbrella:"🏖",desert_island:"🏝",mountain:"⛰",mountain_snow:"🏔",mount_fuji:"🗻",volcano:"🌋",desert:"🏜",camping:"🏕",tent:"⛺️",railway_track:"🛤",motorway:"🛣",building_construction:"🏗",factory:"🏭",house:"🏠",house_with_garden:"🏡",houses:"🏘",derelict_house:"🏚",office:"🏢",department_store:"🏬",post_office:"🏣",european_post_office:"🏤",hospital:"🏥",bank:"🏦",hotel:"🏨",convenience_store:"🏪",school:"🏫",love_hotel:"🏩",wedding:"💒",classical_building:"🏛",church:"⛪️",mosque:"🕌",synagogue:"🕍",kaaba:"🕋",shinto_shrine:"⛩",japan:"🗾",rice_scene:"🎑",national_park:"🏞",sunrise:"🌅",sunrise_over_mountains:"🌄",stars:"🌠",sparkler:"🎇",fireworks:"🎆",city_sunrise:"🌇",city_sunset:"🌆",cityscape:"🏙",night_with_stars:"🌃",milky_way:"🌌",bridge_at_night:"🌉",foggy:"🌁",watch:"⌚️",iphone:"📱",calling:"📲",computer:"💻",keyboard:"⌨️",desktop_computer:"🖥",printer:"🖨",computer_mouse:"🖱",trackball:"🖲",joystick:"🕹",clamp:"🗜",minidisc:"💽",floppy_disk:"💾",cd:"💿",dvd:"📀",vhs:"📼",camera:"📷",camera_flash:"📸",video_camera:"📹",movie_camera:"🎥",film_projector:"📽",film_strip:"🎞",telephone_receiver:"📞",phone:"☎️",telephone:"☎️",pager:"📟",fax:"📠",tv:"📺",radio:"📻",studio_microphone:"🎙",level_slider:"🎚",control_knobs:"🎛",stopwatch:"⏱",timer_clock:"⏲",alarm_clock:"⏰",mantelpiece_clock:"🕰",hourglass:"⌛️",hourglass_flowing_sand:"⏳",satellite:"📡",battery:"🔋",electric_plug:"🔌",bulb:"💡",flashlight:"🔦",candle:"🕯",wastebasket:"🗑",oil_drum:"🛢",money_with_wings:"💸",dollar:"💵",yen:"💴",euro:"💶",pound:"💷",moneybag:"💰",credit_card:"💳",gem:"💎",balance_scale:"⚖️",wrench:"🔧",hammer:"🔨",hammer_and_pick:"⚒",hammer_and_wrench:"🛠",pick:"⛏",nut_and_bolt:"🔩",gear:"⚙️",chains:"⛓",gun:"🔫",bomb:"💣",hocho:"🔪",knife:"🔪",dagger:"🗡",crossed_swords:"⚔️",shield:"🛡",smoking:"🚬",coffin:"⚰️",funeral_urn:"⚱️",amphora:"🏺",crystal_ball:"🔮",prayer_beads:"📿",barber:"💈",alembic:"⚗️",telescope:"🔭",microscope:"🔬",hole:"🕳",pill:"💊",syringe:"💉",thermometer:"🌡",toilet:"🚽",potable_water:"🚰",shower:"🚿",bathtub:"🛁",bath:"🛀",bellhop_bell:"🛎",key:"🔑",old_key:"🗝",door:"🚪",couch_and_lamp:"🛋",bed:"🛏",sleeping_bed:"🛌",framed_picture:"🖼",shopping:"🛍",shopping_cart:"🛒",gift:"🎁",balloon:"🎈",flags:"🎏",ribbon:"🎀",confetti_ball:"🎊",tada:"🎉",dolls:"🎎",izakaya_lantern:"🏮",lantern:"🏮",wind_chime:"🎐",email:"✉️",envelope:"✉️",envelope_with_arrow:"📩",incoming_envelope:"📨","e-mail":"📧",love_letter:"💌",inbox_tray:"📥",outbox_tray:"📤",package:"📦",label:"🏷",mailbox_closed:"📪",mailbox:"📫",mailbox_with_mail:"📬",mailbox_with_no_mail:"📭",postbox:"📮",postal_horn:"📯",scroll:"📜",page_with_curl:"📃",page_facing_up:"📄",bookmark_tabs:"📑",bar_chart:"📊",chart_with_upwards_trend:"📈",chart_with_downwards_trend:"📉",spiral_notepad:"🗒",spiral_calendar:"🗓",calendar:"📆",date:"📅",card_index:"📇",card_file_box:"🗃",ballot_box:"🗳",file_cabinet:"🗄",clipboard:"📋",file_folder:"📁",open_file_folder:"📂",card_index_dividers:"🗂",newspaper_roll:"🗞",newspaper:"📰",notebook:"📓",notebook_with_decorative_cover:"📔",ledger:"📒",closed_book:"📕",green_book:"📗",blue_book:"📘",orange_book:"📙",books:"📚",book:"📖",open_book:"📖",bookmark:"🔖",link:"🔗",paperclip:"📎",paperclips:"🖇",triangular_ruler:"📐",straight_ruler:"📏",pushpin:"📌",round_pushpin:"📍",scissors:"✂️",pen:"🖊",fountain_pen:"🖋",black_nib:"✒️",paintbrush:"🖌",crayon:"🖍",memo:"📝",pencil:"📝",pencil2:"✏️",mag:"🔍",mag_right:"🔎",lock_with_ink_pen:"🔏",closed_lock_with_key:"🔐",lock:"🔒",unlock:"🔓",heart:"❤️",yellow_heart:"💛",green_heart:"💚",blue_heart:"💙",purple_heart:"💜",black_heart:"🖤",broken_heart:"💔",heavy_heart_exclamation:"❣️",two_hearts:"💕",revolving_hearts:"💞",heartbeat:"💓",heartpulse:"💗",sparkling_heart:"💖",cupid:"💘",gift_heart:"💝",heart_decoration:"💟",peace_symbol:"☮️",latin_cross:"✝️",star_and_crescent:"☪️",om:"🕉",wheel_of_dharma:"☸️",star_of_david:"✡️",six_pointed_star:"🔯",menorah:"🕎",yin_yang:"☯️",orthodox_cross:"☦️",place_of_worship:"🛐",ophiuchus:"⛎",aries:"♈️",taurus:"♉️",gemini:"♊️",cancer:"♋️",leo:"♌️",virgo:"♍️",libra:"♎️",scorpius:"♏️",sagittarius:"♐️",capricorn:"♑️",aquarius:"♒️",pisces:"♓️",id:"🆔",atom_symbol:"⚛️",accept:"🉑",radioactive:"☢️",biohazard:"☣️",mobile_phone_off:"📴",vibration_mode:"📳",eight_pointed_black_star:"✴️",vs:"🆚",white_flower:"💮",ideograph_advantage:"🉐",secret:"㊙️",congratulations:"㊗️",u6e80:"🈵",a:"🅰️",b:"🅱️",ab:"🆎",cl:"🆑",o2:"🅾️",sos:"🆘",x:"❌",o:"⭕️",stop_sign:"🛑",no_entry:"⛔️",name_badge:"📛",no_entry_sign:"🚫",anger:"💢",hotsprings:"♨️",no_pedestrians:"🚷",do_not_litter:"🚯",no_bicycles:"🚳","non-potable_water":"🚱",underage:"🔞",no_mobile_phones:"📵",no_smoking:"🚭",exclamation:"❗️",heavy_exclamation_mark:"❗️",grey_exclamation:"❕",question:"❓",grey_question:"❔",bangbang:"‼️",interrobang:"⁉️",low_brightness:"🔅",high_brightness:"🔆",part_alternation_mark:"〽️",warning:"⚠️",children_crossing:"🚸",trident:"🔱",fleur_de_lis:"⚜️",beginner:"🔰",recycle:"♻️",white_check_mark:"✅",chart:"💹",sparkle:"❇️",eight_spoked_asterisk:"✳️",negative_squared_cross_mark:"❎",globe_with_meridians:"🌐",diamond_shape_with_a_dot_inside:"💠",m:"Ⓜ️",cyclone:"🌀",zzz:"💤",atm:"🏧",wc:"🚾",wheelchair:"♿️",parking:"🅿️",sa:"🈂️",passport_control:"🛂",customs:"🛃",baggage_claim:"🛄",left_luggage:"🛅",mens:"🚹",womens:"🚺",baby_symbol:"🚼",restroom:"🚻",put_litter_in_its_place:"🚮",cinema:"🎦",signal_strength:"📶",koko:"🈁",symbols:"🔣",information_source:"ℹ️",abc:"🔤",abcd:"🔡",capital_abcd:"🔠",ng:"🆖",ok:"🆗",up:"🆙",cool:"🆒",new:"🆕",free:"🆓",zero:"0️⃣",one:"1️⃣",two:"2️⃣",three:"3️⃣",four:"4️⃣",five:"5️⃣",six:"6️⃣",seven:"7️⃣",eight:"8️⃣",nine:"9️⃣",keycap_ten:"🔟",hash:"#️⃣",asterisk:"*️⃣",arrow_forward:"▶️",pause_button:"⏸",play_or_pause_button:"⏯",stop_button:"⏹",record_button:"⏺",next_track_button:"⏭",previous_track_button:"⏮",fast_forward:"⏩",rewind:"⏪",arrow_double_up:"⏫",arrow_double_down:"⏬",arrow_backward:"◀️",arrow_up_small:"🔼",arrow_down_small:"🔽",arrow_right:"➡️",arrow_left:"⬅️",arrow_up:"⬆️",arrow_down:"⬇️",arrow_upper_right:"↗️",arrow_lower_right:"↘️",arrow_lower_left:"↙️",arrow_upper_left:"↖️",arrow_up_down:"↕️",left_right_arrow:"↔️",arrow_right_hook:"↪️",leftwards_arrow_with_hook:"↩️",arrow_heading_up:"⤴️",arrow_heading_down:"⤵️",twisted_rightwards_arrows:"🔀",repeat:"🔁",repeat_one:"🔂",arrows_counterclockwise:"🔄",arrows_clockwise:"🔃",musical_note:"🎵",notes:"🎶",heavy_plus_sign:"➕",heavy_minus_sign:"➖",heavy_division_sign:"➗",heavy_multiplication_x:"✖️",heavy_dollar_sign:"💲",currency_exchange:"💱",tm:"™️",copyright:"©️",registered:"®️",wavy_dash:"〰️",curly_loop:"➰",loop:"➿",end:"🔚",back:"🔙",on:"🔛",top:"🔝",soon:"🔜",heavy_check_mark:"✔️",ballot_box_with_check:"☑️",radio_button:"🔘",white_circle:"⚪️",black_circle:"⚫️",red_circle:"🔴",large_blue_circle:"🔵",small_red_triangle:"🔺",small_red_triangle_down:"🔻",small_orange_diamond:"🔸",small_blue_diamond:"🔹",large_orange_diamond:"🔶",large_blue_diamond:"🔷",white_square_button:"🔳",black_square_button:"🔲",black_small_square:"▪️",white_small_square:"▫️",black_medium_small_square:"◾️",white_medium_small_square:"◽️",black_medium_square:"◼️",white_medium_square:"◻️",black_large_square:"⬛️",white_large_square:"⬜️",speaker:"🔈",mute:"🔇",sound:"🔉",loud_sound:"🔊",bell:"🔔",no_bell:"🔕",mega:"📣",loudspeaker:"📢",eye_speech_bubble:"👁‍🗨",speech_balloon:"💬",thought_balloon:"💭",right_anger_bubble:"🗯",spades:"♠️",clubs:"♣️",hearts:"♥️",diamonds:"♦️",black_joker:"🃏",flower_playing_cards:"🎴",mahjong:"🀄️",clock1:"🕐",clock2:"🕑",clock3:"🕒",clock4:"🕓",clock5:"🕔",clock6:"🕕",clock7:"🕖",clock8:"🕗",clock9:"🕘",clock10:"🕙",clock11:"🕚",clock12:"🕛",clock130:"🕜",clock230:"🕝",clock330:"🕞",clock430:"🕟",clock530:"🕠",clock630:"🕡",clock730:"🕢",clock830:"🕣",clock930:"🕤",clock1030:"🕥",clock1130:"🕦",clock1230:"🕧",white_flag:"🏳️",black_flag:"🏴",checkered_flag:"🏁",triangular_flag_on_post:"🚩",rainbow_flag:"🏳️‍🌈",afghanistan:"🇦🇫",aland_islands:"🇦🇽",albania:"🇦🇱",algeria:"🇩🇿",american_samoa:"🇦🇸",andorra:"🇦🇩",angola:"🇦🇴",anguilla:"🇦🇮",antarctica:"🇦🇶",antigua_barbuda:"🇦🇬",argentina:"🇦🇷",armenia:"🇦🇲",aruba:"🇦🇼",australia:"🇦🇺",austria:"🇦🇹",azerbaijan:"🇦🇿",bahamas:"🇧🇸",bahrain:"🇧🇭",bangladesh:"🇧🇩",barbados:"🇧🇧",belarus:"🇧🇾",belgium:"🇧🇪",belize:"🇧🇿",benin:"🇧🇯",bermuda:"🇧🇲",bhutan:"🇧🇹",bolivia:"🇧🇴",caribbean_netherlands:"🇧🇶",bosnia_herzegovina:"🇧🇦",botswana:"🇧🇼",brazil:"🇧🇷",british_indian_ocean_territory:"🇮🇴",british_virgin_islands:"🇻🇬",brunei:"🇧🇳",bulgaria:"🇧🇬",burkina_faso:"🇧🇫",burundi:"🇧🇮",cape_verde:"🇨🇻",cambodia:"🇰🇭",cameroon:"🇨🇲",canada:"🇨🇦",canary_islands:"🇮🇨",cayman_islands:"🇰🇾",central_african_republic:"🇨🇫",chad:"🇹🇩",chile:"🇨🇱",cn:"🇨🇳",christmas_island:"🇨🇽",cocos_islands:"🇨🇨",colombia:"🇨🇴",comoros:"🇰🇲",congo_brazzaville:"🇨🇬",congo_kinshasa:"🇨🇩",cook_islands:"🇨🇰",costa_rica:"🇨🇷",cote_divoire:"🇨🇮",croatia:"🇭🇷",cuba:"🇨🇺",curacao:"🇨🇼",cyprus:"🇨🇾",czech_republic:"🇨🇿",denmark:"🇩🇰",djibouti:"🇩🇯",dominica:"🇩🇲",dominican_republic:"🇩🇴",ecuador:"🇪🇨",egypt:"🇪🇬",el_salvador:"🇸🇻",equatorial_guinea:"🇬🇶",eritrea:"🇪🇷",estonia:"🇪🇪",ethiopia:"🇪🇹",eu:"🇪🇺",european_union:"🇪🇺",falkland_islands:"🇫🇰",faroe_islands:"🇫🇴",fiji:"🇫🇯",finland:"🇫🇮",fr:"🇫🇷",french_guiana:"🇬🇫",french_polynesia:"🇵🇫",french_southern_territories:"🇹🇫",gabon:"🇬🇦",gambia:"🇬🇲",georgia:"🇬🇪",de:"🇩🇪",ghana:"🇬🇭",gibraltar:"🇬🇮",greece:"🇬🇷",greenland:"🇬🇱",grenada:"🇬🇩",guadeloupe:"🇬🇵",guam:"🇬🇺",guatemala:"🇬🇹",guernsey:"🇬🇬",guinea:"🇬🇳",guinea_bissau:"🇬🇼",guyana:"🇬🇾",haiti:"🇭🇹",honduras:"🇭🇳",hong_kong:"🇭🇰",hungary:"🇭🇺",iceland:"🇮🇸",india:"🇮🇳",indonesia:"🇮🇩",iran:"🇮🇷",iraq:"🇮🇶",ireland:"🇮🇪",isle_of_man:"🇮🇲",israel:"🇮🇱",it:"🇮🇹",jamaica:"🇯🇲",jp:"🇯🇵",crossed_flags:"🎌",jersey:"🇯🇪",jordan:"🇯🇴",kazakhstan:"🇰🇿",kenya:"🇰🇪",kiribati:"🇰🇮",kosovo:"🇽🇰",kuwait:"🇰🇼",kyrgyzstan:"🇰🇬",laos:"🇱🇦",latvia:"🇱🇻",lebanon:"🇱🇧",lesotho:"🇱🇸",liberia:"🇱🇷",libya:"🇱🇾",liechtenstein:"🇱🇮",lithuania:"🇱🇹",luxembourg:"🇱🇺",macau:"🇲🇴",macedonia:"🇲🇰",madagascar:"🇲🇬",malawi:"🇲🇼",malaysia:"🇲🇾",maldives:"🇲🇻",mali:"🇲🇱",malta:"🇲🇹",marshall_islands:"🇲🇭",martinique:"🇲🇶",mauritania:"🇲🇷",mauritius:"🇲🇺",mayotte:"🇾🇹",mexico:"🇲🇽",micronesia:"🇫🇲",moldova:"🇲🇩",monaco:"🇲🇨",mongolia:"🇲🇳",montenegro:"🇲🇪",montserrat:"🇲🇸",morocco:"🇲🇦",mozambique:"🇲🇿",myanmar:"🇲🇲",namibia:"🇳🇦",nauru:"🇳🇷",nepal:"🇳🇵",netherlands:"🇳🇱",new_caledonia:"🇳🇨",new_zealand:"🇳🇿",nicaragua:"🇳🇮",niger:"🇳🇪",nigeria:"🇳🇬",niue:"🇳🇺",norfolk_island:"🇳🇫",northern_mariana_islands:"🇲🇵",north_korea:"🇰🇵",norway:"🇳🇴",oman:"🇴🇲",pakistan:"🇵🇰",palau:"🇵🇼",palestinian_territories:"🇵🇸",panama:"🇵🇦",papua_new_guinea:"🇵🇬",paraguay:"🇵🇾",peru:"🇵🇪",philippines:"🇵🇭",pitcairn_islands:"🇵🇳",poland:"🇵🇱",portugal:"🇵🇹",puerto_rico:"🇵🇷",qatar:"🇶🇦",reunion:"🇷🇪",romania:"🇷🇴",ru:"🇷🇺",rwanda:"🇷🇼",st_barthelemy:"🇧🇱",st_helena:"🇸🇭",st_kitts_nevis:"🇰🇳",st_lucia:"🇱🇨",st_pierre_miquelon:"🇵🇲",st_vincent_grenadines:"🇻🇨",samoa:"🇼🇸",san_marino:"🇸🇲",sao_tome_principe:"🇸🇹",saudi_arabia:"🇸🇦",senegal:"🇸🇳",serbia:"🇷🇸",seychelles:"🇸🇨",sierra_leone:"🇸🇱",singapore:"🇸🇬",sint_maarten:"🇸🇽",slovakia:"🇸🇰",slovenia:"🇸🇮",solomon_islands:"🇸🇧",somalia:"🇸🇴",south_africa:"🇿🇦",south_georgia_south_sandwich_islands:"🇬🇸",kr:"🇰🇷",south_sudan:"🇸🇸",es:"🇪🇸",sri_lanka:"🇱🇰",sudan:"🇸🇩",suriname:"🇸🇷",swaziland:"🇸🇿",sweden:"🇸🇪",switzerland:"🇨🇭",syria:"🇸🇾",taiwan:"🇹🇼",tajikistan:"🇹🇯",tanzania:"🇹🇿",thailand:"🇹🇭",timor_leste:"🇹🇱",togo:"🇹🇬",tokelau:"🇹🇰",tonga:"🇹🇴",trinidad_tobago:"🇹🇹",tunisia:"🇹🇳",tr:"🇹🇷",turkmenistan:"🇹🇲",turks_caicos_islands:"🇹🇨",tuvalu:"🇹🇻",uganda:"🇺🇬",ukraine:"🇺🇦",united_arab_emirates:"🇦🇪",gb:"🇬🇧",uk:"🇬🇧",us:"🇺🇸",us_virgin_islands:"🇻🇮",uruguay:"🇺🇾",uzbekistan:"🇺🇿",vanuatu:"🇻🇺",vatican_city:"🇻🇦",venezuela:"🇻🇪",vietnam:"🇻🇳",wallis_futuna:"🇼🇫",western_sahara:"🇪🇭",yemen:"🇾🇪",zambia:"🇿🇲",zimbabwe:"🇿🇼"}},function(e,t,n){"use strict";e.exports={angry:[">:(",">:-("],blush:[':")',':-")'],broken_heart:["</3","<\\3"],confused:[":/",":-/"],cry:[":'(",":'-(",":,(",":,-("],frowning:[":(",":-("],heart:["<3"],imp:["]:(","]:-("],innocent:["o:)","O:)","o:-)","O:-)","0:)","0:-)"],joy:[":')",":'-)",":,)",":,-)",":'D",":'-D",":,D",":,-D"],kissing:[":*",":-*"],laughing:["x-)","X-)"],neutral_face:[":|",":-|"],open_mouth:[":o",":-o",":O",":-O"],rage:[":@",":-@"],smile:[":D",":-D"],smiley:[":)",":-)"],smiling_imp:["]:)","]:-)"],sob:[":,'(",":,'-(",";(",";-("],stuck_out_tongue:[":P",":-P"],sunglasses:["8-)","B-)"],sweat:[",:(",",:-("],sweat_smile:[",:)",",:-)"],unamused:[":s",":-S",":z",":-Z",":$",":-$"],wink:[";)",";-)"]}},function(e,t,n){"use strict";function r(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}e.exports=function(e){var t,n=e.defs;e.enabled.length&&(n=Object.keys(n).reduce(function(t,r){return e.enabled.indexOf(r)>=0&&(t[r]=n[r]),t},{})),t=Object.keys(e.shortcuts).reduce(function(t,r){return n[r]?Array.isArray(e.shortcuts[r])?(e.shortcuts[r].forEach(function(e){t[e]=r}),t):(t[e.shortcuts[r]]=r,t):t},{});var i=Object.keys(n).map(function(e){return":"+e+":"}).concat(Object.keys(t)).sort().reverse().map(function(e){return r(e)}).join("|"),o=RegExp(i),a=RegExp(i,"g");return{defs:n,shortcuts:t,scanRE:o,replaceRE:a}}},function(e,t,n){"use strict";e.exports=function(e,t){return e[t].content}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,i){function o(e,r,o){var a,s=0,c=[];return e.replace(i,function(r,i,u){var h;if(n.hasOwnProperty(r)){if(h=n[r],i>0&&!l.test(u[i-1]))return;if(i+r.length<u.length&&!l.test(u[i+r.length]))return}else h=r.slice(1,-1);i>s&&(a=new o("text","",0),a.content=e.slice(s,i),c.push(a)),a=new o("emoji","",0),a.markup=h,a.content=t[h],c.push(a),s=i+r.length}),s<e.length&&(a=new o("text","",0),a.content=e.slice(s),c.push(a)),c}var a=e.utils.arrayReplaceAt,s=e.utils.lib.ucmicro,l=new RegExp([s.Z.source,s.P.source,s.Cc.source].join("|"));return function(e){var t,n,i,s,l,c=e.tokens,u=0;for(n=0,i=c.length;n<i;n++)if("inline"===c[n].type)for(s=c[n].children,t=s.length-1;t>=0;t--)l=s[t],"link_open"!==l.type&&"link_close"!==l.type||"auto"===l.info&&(u-=l.nesting),"text"===l.type&&0===u&&r.test(l.content)&&(c[n].children=s=a(s,t,o(l.content,l.level,e.Token)))}}},function(e,t,n){"use strict";function r(e,t,n,r){var i=Number(e[t].meta.id+1).toString(),o="";return"string"==typeof r.docId&&(o="-"+r.docId+"-"),o+i}function i(e,t){var n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=":"+e[t].meta.subId),"["+n+"]"}function o(e,t,n,r,i){var o=i.rules.footnote_anchor_name(e,t,n,r,i),a=i.rules.footnote_caption(e,t,n,r,i),s=o;return e[t].meta.subId>0&&(s+=":"+e[t].meta.subId),'<sup class="footnote-ref"><a href="#fn'+o+'" id="fnref'+s+'">'+a+"</a></sup>"}function a(e,t,n){return(n.xhtmlOut?'<hr class="footnotes-sep" />\n':'<hr class="footnotes-sep">\n')+'<section class="footnotes">\n<ol class="footnotes-list">\n'}function s(){return"</ol>\n</section>\n"}function l(e,t,n,r,i){var o=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(o+=":"+e[t].meta.subId),'<li id="fn'+o+'" class="footnote-item">'}function c(){return"</li>\n"}function u(e,t,n,r,i){var o=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(o+=":"+e[t].meta.subId),' <a href="#fnref'+o+'" class="footnote-backref">↩︎</a>'}e.exports=function(e){function t(e,t,n,r){var i,o,a,s,l,c,u,h,p,d,g,m=e.bMarks[t]+e.tShift[t],_=e.eMarks[t];if(m+4>_)return!1;if(91!==e.src.charCodeAt(m))return!1;if(94!==e.src.charCodeAt(m+1))return!1;for(l=m+2;l<_;l++){if(32===e.src.charCodeAt(l))return!1;if(93===e.src.charCodeAt(l))break}if(l===m+2)return!1;if(l+1>=_||58!==e.src.charCodeAt(++l))return!1;if(r)return!0;for(l++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={}),c=e.src.slice(m+2,l-2),e.env.footnotes.refs[":"+c]=-1,u=new e.Token("footnote_reference_open","",1),u.meta={label:c},u.level=e.level++,e.tokens.push(u),i=e.bMarks[t],o=e.tShift[t],a=e.sCount[t],s=e.parentType,g=l,h=p=e.sCount[t]+l-(e.bMarks[t]+e.tShift[t]);l<_&&(d=e.src.charCodeAt(l),f(d));)9===d?p+=4-p%4:p++,l++;return e.tShift[t]=l-g,e.sCount[t]=p-h,e.bMarks[t]=g,e.blkIndent+=4,e.parentType="footnote",e.sCount[t]<e.blkIndent&&(e.sCount[t]+=e.blkIndent),e.md.block.tokenize(e,t,n,!0),e.parentType=s,e.blkIndent-=4,e.tShift[t]=o,e.sCount[t]=a,e.bMarks[t]=i,u=new e.Token("footnote_reference_close","",-1),u.level=--e.level,e.tokens.push(u),!0}function n(e,t){var n,r,i,o,a,s=e.posMax,l=e.pos;return!(l+2>=s)&&(94===e.src.charCodeAt(l)&&(91===e.src.charCodeAt(l+1)&&(n=l+2,!((r=d(e,l+1))<0)&&(t||(e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]),i=e.env.footnotes.list.length,e.md.inline.parse(e.src.slice(n,r),e.md,e.env,a=[]),o=e.push("footnote_ref","",0),o.meta={id:i},e.env.footnotes.list[i]={tokens:a}),e.pos=r+1,e.posMax=s,!0))))}function h(e,t){var n,r,i,o,a,s=e.posMax,l=e.pos;if(l+3>s)return!1;if(!e.env.footnotes||!e.env.footnotes.refs)return!1;if(91!==e.src.charCodeAt(l))return!1;if(94!==e.src.charCodeAt(l+1))return!1;for(r=l+2;r<s;r++){if(32===e.src.charCodeAt(r))return!1;if(10===e.src.charCodeAt(r))return!1;if(93===e.src.charCodeAt(r))break}return r!==l+2&&(!(r>=s)&&(r++,n=e.src.slice(l+2,r-1),void 0!==e.env.footnotes.refs[":"+n]&&(t||(e.env.footnotes.list||(e.env.footnotes.list=[]),e.env.footnotes.refs[":"+n]<0?(i=e.env.footnotes.list.length,e.env.footnotes.list[i]={label:n,count:0},e.env.footnotes.refs[":"+n]=i):i=e.env.footnotes.refs[":"+n],o=e.env.footnotes.list[i].count,e.env.footnotes.list[i].count++,a=e.push("footnote_ref","",0),a.meta={id:i,subId:o,label:n}),e.pos=r,e.posMax=s,!0)))}function p(e){var t,n,r,i,o,a,s,l,c,u,h=!1,p={};if(e.env.footnotes&&(e.tokens=e.tokens.filter(function(e){return"footnote_reference_open"===e.type?(h=!0,c=[],u=e.meta.label,!1):"footnote_reference_close"===e.type?(h=!1,p[":"+u]=c,!1):(h&&c.push(e),!h)}),e.env.footnotes.list)){for(a=e.env.footnotes.list,s=new e.Token("footnote_block_open","",1),e.tokens.push(s),t=0,n=a.length;t<n;t++){for(s=new e.Token("footnote_open","",1),s.meta={id:t,label:a[t].label},e.tokens.push(s),a[t].tokens?(l=[],s=new e.Token("paragraph_open","p",1),s.block=!0,l.push(s),s=new e.Token("inline","",0),s.children=a[t].tokens,s.content="",l.push(s),s=new e.Token("paragraph_close","p",-1),s.block=!0,l.push(s)):a[t].label&&(l=p[":"+a[t].label]),e.tokens=e.tokens.concat(l),o="paragraph_close"===e.tokens[e.tokens.length-1].type?e.tokens.pop():null,i=a[t].count>0?a[t].count:1,r=0;r<i;r++)s=new e.Token("footnote_anchor","",0),s.meta={id:t,subId:r,label:a[t].label},e.tokens.push(s);o&&e.tokens.push(o),s=new e.Token("footnote_close","",-1),e.tokens.push(s)}s=new e.Token("footnote_block_close","",-1),e.tokens.push(s)}}var d=e.helpers.parseLinkLabel,f=e.utils.isSpace;e.renderer.rules.footnote_ref=o,e.renderer.rules.footnote_block_open=a,e.renderer.rules.footnote_block_close=s,e.renderer.rules.footnote_open=l,e.renderer.rules.footnote_close=c,e.renderer.rules.footnote_anchor=u,e.renderer.rules.footnote_caption=i,e.renderer.rules.footnote_anchor_name=r,e.block.ruler.before("reference","footnote_def",t,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",n),e.inline.ruler.after("footnote_inline","footnote_ref",h),e.core.ruler.after("inline","footnote_tail",p)}},function(e,t){e.exports=function(e,t){e.image_add=function(t,n){e.__image instanceof Object||(e.__image={}),e.__image[t]=n},e.image_del=function(t){e.__image instanceof Object||(e.__image={}),delete e.__image[t]};var n=e.renderer.rules.image;e.renderer.rules.image=function(t,r,i,o,a){var s=t[r].attrs;if(e.__image instanceof Object)for(var l=0;l<s.length;l++)if("src"==s[l][0]&&e.__image.hasOwnProperty(t[r].attrs[l][1])){s.push(["rel",s[l][1]]),s[l][1]=e.__image[t[r].attrs[l][1]];break}return n(t,r,i,o,a)}}},function(e,t,n){"use strict";e.exports=function(e){function t(e,t){var n,r,i,o,a,s=e.pos,l=e.src.charCodeAt(s);if(t)return!1;if(43!==l)return!1;if(r=e.scanDelims(e.pos,!0),o=r.length,a=String.fromCharCode(l),o<2)return!1;for(o%2&&(i=e.push("text","",0),i.content=a,o--),n=0;n<o;n+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:l,jump:n,token:e.tokens.length-1,level:e.level,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function n(e){var t,n,r,i,o,a=[],s=e.delimiters,l=e.delimiters.length;for(t=0;t<l;t++)r=s[t],43===r.marker&&-1!==r.end&&(i=s[r.end],o=e.tokens[r.token],o.type="ins_open",o.tag="ins",o.nesting=1,o.markup="++",o.content="",o=e.tokens[i.token],o.type="ins_close",o.tag="ins",o.nesting=-1,o.markup="++",o.content="","text"===e.tokens[i.token-1].type&&"+"===e.tokens[i.token-1].content&&a.push(i.token-1));for(;a.length;){for(t=a.pop(),n=t+1;n<e.tokens.length&&"ins_close"===e.tokens[n].type;)n++;n--,t!==n&&(o=e.tokens[n],e.tokens[n]=e.tokens[t],e.tokens[t]=o)}}e.inline.ruler.before("emphasis","ins",t),e.inline.ruler2.before("emphasis","ins",n)}},function(e,t,n){"use strict";function r(e,t){var n,r,i=e.posMax,o=!0,a=!0;return n=t>0?e.src.charCodeAt(t-1):-1,r=t+1<=i?e.src.charCodeAt(t+1):-1,(32===n||9===n||r>=48&&r<=57)&&(a=!1),32!==r&&9!==r||(o=!1),{can_open:o,can_close:a}}function i(e,t){var n,i,o,a,s;if("$"!==e.src[e.pos])return!1;if(a=r(e,e.pos),!a.can_open)return t||(e.pending+="$"),e.pos+=1,!0;for(n=e.pos+1,i=n;-1!==(i=e.src.indexOf("$",i));){for(s=i-1;"\\"===e.src[s];)s-=1;if((i-s)%2==1)break;i+=1}return-1===i?(t||(e.pending+="$"),e.pos=n,!0):i-n==0?(t||(e.pending+="$$"),e.pos=n+1,!0):(a=r(e,i),a.can_close?(t||(o=e.push("math_inline","math",0),o.markup="$",o.content=e.src.slice(n,i)),e.pos=i+1,!0):(t||(e.pending+="$"),e.pos=n,!0))}function o(e,t,n,r){var i,o,a,s,l,c=!1,u=e.bMarks[t]+e.tShift[t],h=e.eMarks[t];if(u+2>h)return!1;if("$$"!==e.src.slice(u,u+2))return!1;if(u+=2,i=e.src.slice(u,h),r)return!0;for("$$"===i.trim().slice(-2)&&(i=i.trim().slice(0,-2),c=!0),a=t;!c&&!(++a>=n)&&(u=e.bMarks[a]+e.tShift[a],h=e.eMarks[a],!(u<h&&e.tShift[a]<e.blkIndent));)"$$"===e.src.slice(u,h).trim().slice(-2)&&(s=e.src.slice(0,h).lastIndexOf("$$"),o=e.src.slice(u,s),c=!0);return e.line=a+1,l=e.push("math_block","math",0),l.block=!0,l.content=(i&&i.trim()?i+"\n":"")+e.getLines(t+1,a,e.tShift[t],!0)+(o&&o.trim()?o:""),l.map=[t,e.line],l.markup="$$",!0}var a=n(168);e.exports=function(e,t){t=t||{};var n=function(e){t.displayMode=!1;try{return a.renderToString(e,t)}catch(n){return t.throwOnError&&console.log(n),e}},r=function(e,t){return n(e[t].content)},s=function(e){t.displayMode=!0;try{return"<p>"+a.renderToString(e,t)+"</p>"}catch(n){return t.throwOnError&&console.log(n),e}},l=function(e,t){return s(e[t].content)+"\n"};e.inline.ruler.after("escape","math_inline",i),e.block.ruler.after("blockquote","math_block",o,{alt:["paragraph","reference","blockquote","list"]}),e.renderer.rules.math_inline=r,e.renderer.rules.math_block=l}},function(e,t,n){"use strict";e.exports=function(e){function t(e,t){var n,r,i,o,a,s=e.pos,l=e.src.charCodeAt(s);if(t)return!1;if(61!==l)return!1;if(r=e.scanDelims(e.pos,!0),o=r.length,a=String.fromCharCode(l),o<2)return!1;for(o%2&&(i=e.push("text","",0),i.content=a,o--),n=0;n<o;n+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:l,jump:n,token:e.tokens.length-1,level:e.level,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function n(e){var t,n,r,i,o,a=[],s=e.delimiters,l=e.delimiters.length;for(t=0;t<l;t++)r=s[t],61===r.marker&&-1!==r.end&&(i=s[r.end],o=e.tokens[r.token],o.type="mark_open",o.tag="mark",o.nesting=1,o.markup="==",o.content="",o=e.tokens[i.token],o.type="mark_close",o.tag="mark",o.nesting=-1,o.markup="==",o.content="","text"===e.tokens[i.token-1].type&&"="===e.tokens[i.token-1].content&&a.push(i.token-1));for(;a.length;){for(t=a.pop(),n=t+1;n<e.tokens.length&&"mark_close"===e.tokens[n].type;)n++;n--,t!==n&&(o=e.tokens[n],e.tokens[n]=e.tokens[t],e.tokens[t]=o)}}e.inline.ruler.before("emphasis","mark",t),e.inline.ruler2.before("emphasis","mark",n)}},function(e,t,n){"use strict";function r(e,t){var n,r,o,a=e.posMax,s=e.pos;if(126!==e.src.charCodeAt(s))return!1;if(t)return!1;if(s+2>=a)return!1;for(e.pos=s+1;e.pos<a;){if(126===e.src.charCodeAt(e.pos)){n=!0;break}e.md.inline.skipToken(e)}return n&&s+1!==e.pos?(r=e.src.slice(s+1,e.pos),r.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,o=e.push("sub_open","sub",1),o.markup="~",o=e.push("text","",0),o.content=r.replace(i,"$1"),o=e.push("sub_close","sub",-1),o.markup="~",e.pos=e.posMax+1,e.posMax=a,!0)):(e.pos=s,!1)}var i=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;e.exports=function(e){e.inline.ruler.after("emphasis","sub",r)}},function(e,t,n){"use strict";function r(e,t){var n,r,o,a=e.posMax,s=e.pos;if(94!==e.src.charCodeAt(s))return!1;if(t)return!1;if(s+2>=a)return!1;for(e.pos=s+1;e.pos<a;){if(94===e.src.charCodeAt(e.pos)){n=!0;break}e.md.inline.skipToken(e)}return n&&s+1!==e.pos?(r=e.src.slice(s+1,e.pos),r.match(/(^|[^\\])(\\\\)*\s/)?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,o=e.push("sup_open","sup",1),o.markup="^",o=e.push("text","",0),o.content=r.replace(i,"$1"),o=e.push("sup_close","sup",-1),o.markup="^",e.pos=e.posMax+1,e.posMax=a,!0)):(e.pos=s,!1)}var i=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;e.exports=function(e){e.inline.ruler.after("emphasis","sup",r)}},function(e,t,n){"use strict";e.exports=n(205)},function(e,t,n){"use strict";e.exports=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","pre","section","source","title","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]},function(e,t,n){"use strict";t.parseLinkLabel=n(203),t.parseLinkDestination=n(202),t.parseLinkTitle=n(204)},function(e,t,n){"use strict";var r=n(0).isSpace,i=n(0).unescapeAll;e.exports=function(e,t,n){var o,a,s=t,l={ok:!1,pos:0,lines:0,str:""};if(60===e.charCodeAt(t)){for(t++;t<n;){if(10===(o=e.charCodeAt(t))||r(o))return l;if(62===o)return l.pos=t+1,l.str=i(e.slice(s+1,t)),l.ok=!0,l;92===o&&t+1<n?t+=2:t++}return l}for(a=0;t<n&&32!==(o=e.charCodeAt(t))&&!(o<32||127===o);)if(92===o&&t+1<n)t+=2;else{if(40===o&&++a>1)break;if(41===o&&--a<0)break;t++}return s===t?l:(l.str=i(e.slice(s,t)),l.lines=0,l.pos=t,l.ok=!0,l)}},function(e,t,n){"use strict";e.exports=function(e,t,n){var r,i,o,a,s=-1,l=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<l;){if(93===(o=e.src.charCodeAt(e.pos))&&0===--r){i=!0;break}if(a=e.pos,e.md.inline.skipToken(e),91===o)if(a===e.pos-1)r++;else if(n)return e.pos=c,-1}return i&&(s=e.pos),e.pos=c,s}},function(e,t,n){"use strict";var r=n(0).unescapeAll;e.exports=function(e,t,n){var i,o,a=0,s=t,l={ok:!1,pos:0,lines:0,str:""};if(t>=n)return l;if(34!==(o=e.charCodeAt(t))&&39!==o&&40!==o)return l;for(t++,40===o&&(o=41);t<n;){if((i=e.charCodeAt(t))===o)return l.pos=t+1,l.lines=a,l.str=r(e.slice(s+1,t)),l.ok=!0,l;10===i?a++:92===i&&t+1<n&&(t++,10===e.charCodeAt(t)&&a++),t++}return l}},function(e,t,n){"use strict";function r(e){var t=e.trim().toLowerCase();return!_.test(t)||!!b.test(t)}function i(e){var t=f.parse(e,!0);if(t.hostname&&(!t.protocol||v.indexOf(t.protocol)>=0))try{t.hostname=g.toASCII(t.hostname)}catch(e){}return f.encode(f.format(t))}function o(e){var t=f.parse(e,!0);if(t.hostname&&(!t.protocol||v.indexOf(t.protocol)>=0))try{t.hostname=g.toUnicode(t.hostname)}catch(e){}return f.decode(f.format(t))}function a(e,t){if(!(this instanceof a))return new a(e,t);t||s.isString(e)||(t=e||{},e="default"),this.inline=new p,this.block=new h,this.core=new u,this.renderer=new c,this.linkify=new d,this.validateLink=r,this.normalizeLink=i,this.normalizeLinkText=o,this.utils=s,this.helpers=s.assign({},l),this.options={},this.configure(e),t&&this.set(t)}var s=n(0),l=n(201),c=n(212),u=n(207),h=n(206),p=n(208),d=n(181),f=n(62),g=n(249),m={default:n(210),zero:n(211),commonmark:n(209)},_=/^(vbscript|javascript|file|data):/,b=/^data:image\/(gif|png|jpeg|webp);/,v=["http:","https:","mailto:"];a.prototype.set=function(e){return s.assign(this.options,e),this},a.prototype.configure=function(e){var t,n=this;if(s.isString(e)&&(t=e,!(e=m[t])))throw new Error('Wrong `markdown-it` preset "'+t+'", check name');if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this},a.prototype.enable=function(e,t){var n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){n=n.concat(this[t].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));var r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this},a.prototype.disable=function(e,t){var n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){n=n.concat(this[t].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));var r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this},a.prototype.use=function(e){var t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},a.prototype.parse=function(e,t){if("string"!=typeof e)throw new Error("Input data should be a String");var n=new this.core.State(e,this,t);return this.core.process(n),n.tokens},a.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)},a.prototype.parseInline=function(e,t){var n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens},a.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)},e.exports=a},function(e,t,n){"use strict";function r(){this.ruler=new i;for(var e=0;e<o.length;e++)this.ruler.push(o[e][0],o[e][1],{alt:(o[e][2]||[]).slice()})}var i=n(41),o=[["table",n(224),["paragraph","reference"]],["code",n(214)],["fence",n(215),["paragraph","reference","blockquote","list"]],["blockquote",n(213),["paragraph","reference","blockquote","list"]],["hr",n(217),["paragraph","reference","blockquote","list"]],["list",n(220),["paragraph","reference","blockquote"]],["reference",n(222)],["heading",n(216),["paragraph","reference","blockquote"]],["lheading",n(219)],["html_block",n(218),["paragraph","reference","blockquote"]],["paragraph",n(221)]];r.prototype.tokenize=function(e,t,n){for(var r,i=this.ruler.getRules(""),o=i.length,a=t,s=!1,l=e.md.options.maxNesting;a<n&&(e.line=a=e.skipEmptyLines(a),!(a>=n))&&!(e.sCount[a]<e.blkIndent);){if(e.level>=l){e.line=n;break}for(r=0;r<o&&!i[r](e,a,n,!1);r++);e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),(a=e.line)<n&&e.isEmpty(a)&&(s=!0,a++,e.line=a)}},r.prototype.parse=function(e,t,n,r){var i;e&&(i=new this.State(e,t,n,r),this.tokenize(i,i.line,i.lineMax))},r.prototype.State=n(223),e.exports=r},function(e,t,n){"use strict";function r(){this.ruler=new i;for(var e=0;e<o.length;e++)this.ruler.push(o[e][0],o[e][1])}var i=n(41),o=[["normalize",n(228)],["block",n(225)],["inline",n(226)],["linkify",n(227)],["replacements",n(229)],["smartquotes",n(230)]];r.prototype.process=function(e){var t,n,r;for(r=this.ruler.getRules(""),t=0,n=r.length;t<n;t++)r[t](e)},r.prototype.State=n(231),e.exports=r},function(e,t,n){"use strict";function r(){var e;for(this.ruler=new i,e=0;e<o.length;e++)this.ruler.push(o[e][0],o[e][1]);for(this.ruler2=new i,e=0;e<a.length;e++)this.ruler2.push(a[e][0],a[e][1])}var i=n(41),o=[["text",n(242)],["newline",n(240)],["escape",n(236)],["backticks",n(233)],["strikethrough",n(61).tokenize],["emphasis",n(60).tokenize],["link",n(239)],["image",n(238)],["autolink",n(232)],["html_inline",n(237)],["entity",n(235)]],a=[["balance_pairs",n(234)],["strikethrough",n(61).postProcess],["emphasis",n(60).postProcess],["text_collapse",n(243)]];r.prototype.skipToken=function(e){var t,n,r=e.pos,i=this.ruler.getRules(""),o=i.length,a=e.md.options.maxNesting,s=e.cache;if(void 0!==s[r])return void(e.pos=s[r]);if(e.level<a)for(n=0;n<o&&(e.level++,t=i[n](e,!0),e.level--,!t);n++);else e.pos=e.posMax;t||e.pos++,s[r]=e.pos},r.prototype.tokenize=function(e){for(var t,n,r=this.ruler.getRules(""),i=r.length,o=e.posMax,a=e.md.options.maxNesting;e.pos<o;){if(e.level<a)for(n=0;n<i&&!(t=r[n](e,!1));n++);if(t){if(e.pos>=o)break}else e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},r.prototype.parse=function(e,t,n,r){var i,o,a,s=new this.State(e,t,n,r);for(this.tokenize(s),o=this.ruler2.getRules(""),a=o.length,i=0;i<a;i++)o[i](s)},r.prototype.State=n(241),e.exports=r},function(e,t,n){"use strict";e.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","text_collapse"]}}}},function(e,t,n){"use strict";e.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}},function(e,t,n){"use strict";e.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","text_collapse"]}}}},function(e,t,n){"use strict";function r(){this.rules=i({},s)}var i=n(0).assign,o=n(0).unescapeAll,a=n(0).escapeHtml,s={};s.code_inline=function(e,t,n,r,i){var o=e[t];return"<code"+i.renderAttrs(o)+">"+a(e[t].content)+"</code>"},s.code_block=function(e,t,n,r,i){var o=e[t];return"<pre"+i.renderAttrs(o)+"><code>"+a(e[t].content)+"</code></pre>\n"},s.fence=function(e,t,n,r,i){var s,l,c,u,h=e[t],p=h.info?o(h.info).trim():"",d="";return p&&(d=p.split(/\s+/g)[0]),s=n.highlight?n.highlight(h.content,d)||a(h.content):a(h.content),0===s.indexOf("<pre")?s+"\n":p?(l=h.attrIndex("class"),c=h.attrs?h.attrs.slice():[],l<0?c.push(["class",n.langPrefix+d]):c[l][1]+=" "+n.langPrefix+d,u={attrs:c},"<pre><code"+i.renderAttrs(u)+">"+s+"</code></pre>\n"):"<pre><code"+i.renderAttrs(h)+">"+s+"</code></pre>\n"},s.image=function(e,t,n,r,i){var o=e[t];return o.attrs[o.attrIndex("alt")][1]=i.renderInlineAsText(o.children,n,r),i.renderToken(e,t,n)},s.hardbreak=function(e,t,n){return n.xhtmlOut?"<br />\n":"<br>\n"},s.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?"<br />\n":"<br>\n":"\n"},s.text=function(e,t){return a(e[t].content)},s.html_block=function(e,t){return e[t].content},s.html_inline=function(e,t){return e[t].content},r.prototype.renderAttrs=function(e){var t,n,r;if(!e.attrs)return"";for(r="",t=0,n=e.attrs.length;t<n;t++)r+=" "+a(e.attrs[t][0])+'="'+a(e.attrs[t][1])+'"';return r},r.prototype.renderToken=function(e,t,n){var r,i="",o=!1,a=e[t];return a.hidden?"":(a.block&&-1!==a.nesting&&t&&e[t-1].hidden&&(i+="\n"),i+=(-1===a.nesting?"</":"<")+a.tag,i+=this.renderAttrs(a),0===a.nesting&&n.xhtmlOut&&(i+=" /"),a.block&&(o=!0,1===a.nesting&&t+1<e.length&&(r=e[t+1],"inline"===r.type||r.hidden?o=!1:-1===r.nesting&&r.tag===a.tag&&(o=!1))),i+=o?">\n":">")},r.prototype.renderInline=function(e,t,n){for(var r,i="",o=this.rules,a=0,s=e.length;a<s;a++)r=e[a].type,void 0!==o[r]?i+=o[r](e,a,t,n,this):i+=this.renderToken(e,a,t);return i},r.prototype.renderInlineAsText=function(e,t,n){for(var r="",i=0,o=e.length;i<o;i++)"text"===e[i].type?r+=e[i].content:"image"===e[i].type&&(r+=this.renderInlineAsText(e[i].children,t,n));return r},r.prototype.render=function(e,t,n){var r,i,o,a="",s=this.rules;for(r=0,i=e.length;r<i;r++)o=e[r].type,"inline"===o?a+=this.renderInline(e[r].children,t,n):void 0!==s[o]?a+=s[e[r].type](e,r,t,n,this):a+=this.renderToken(e,r,t,n);return a},e.exports=r},function(e,t,n){"use strict";var r=n(0).isSpace;e.exports=function(e,t,n,i){var o,a,s,l,c,u,h,p,d,f,g,m,_,b,v,y,k,w,x,C,j=e.lineMax,A=e.bMarks[t]+e.tShift[t],E=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;if(62!==e.src.charCodeAt(A++))return!1;if(i)return!0;for(l=d=e.sCount[t]+A-(e.bMarks[t]+e.tShift[t]),32===e.src.charCodeAt(A)?(A++,l++,d++,o=!1,y=!0):9===e.src.charCodeAt(A)?(y=!0,(e.bsCount[t]+d)%4==3?(A++,l++,d++,o=!1):o=!0):y=!1,f=[e.bMarks[t]],e.bMarks[t]=A;A<E&&(a=e.src.charCodeAt(A),r(a));)9===a?d+=4-(d+e.bsCount[t]+(o?1:0))%4:d++,A++;for(g=[e.bsCount[t]],e.bsCount[t]=e.sCount[t]+1+(y?1:0),u=A>=E,b=[e.sCount[t]],e.sCount[t]=d-l,v=[e.tShift[t]],e.tShift[t]=A-e.bMarks[t],w=e.md.block.ruler.getRules("blockquote"),_=e.parentType,e.parentType="blockquote",C=!1,p=t+1;p<n&&(e.sCount[p]<e.blkIndent&&(C=!0),A=e.bMarks[p]+e.tShift[p],E=e.eMarks[p],!(A>=E));p++)if(62!==e.src.charCodeAt(A++)||C){if(u)break;for(k=!1,s=0,c=w.length;s<c;s++)if(w[s](e,p,n,!0)){k=!0;break}if(k){e.lineMax=p,0!==e.blkIndent&&(f.push(e.bMarks[p]),g.push(e.bsCount[p]),v.push(e.tShift[p]),b.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}f.push(e.bMarks[p]),g.push(e.bsCount[p]),v.push(e.tShift[p]),b.push(e.sCount[p]),e.sCount[p]=-1}else{for(l=d=e.sCount[p]+A-(e.bMarks[p]+e.tShift[p]),32===e.src.charCodeAt(A)?(A++,l++,d++,o=!1,y=!0):9===e.src.charCodeAt(A)?(y=!0,(e.bsCount[p]+d)%4==3?(A++,l++,d++,o=!1):o=!0):y=!1,f.push(e.bMarks[p]),e.bMarks[p]=A;A<E&&(a=e.src.charCodeAt(A),r(a));)9===a?d+=4-(d+e.bsCount[p]+(o?1:0))%4:d++,A++;u=A>=E,g.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(y?1:0),b.push(e.sCount[p]),e.sCount[p]=d-l,v.push(e.tShift[p]),e.tShift[p]=A-e.bMarks[p]}for(m=e.blkIndent,e.blkIndent=0,x=e.push("blockquote_open","blockquote",1),x.markup=">",x.map=h=[t,0],e.md.block.tokenize(e,t,p),x=e.push("blockquote_close","blockquote",-1),x.markup=">",e.lineMax=j,e.parentType=_,h[1]=e.line,s=0;s<v.length;s++)e.bMarks[s+t]=f[s],e.tShift[s+t]=v[s],e.sCount[s+t]=b[s],e.bsCount[s+t]=g[s];return e.blkIndent=m,!0}},function(e,t,n){"use strict";e.exports=function(e,t,n){var r,i,o;if(e.sCount[t]-e.blkIndent<4)return!1;for(i=r=t+1;r<n;)if(e.isEmpty(r))r++;else{if(!(e.sCount[r]-e.blkIndent>=4))break;r++,i=r}return e.line=i,o=e.push("code_block","code",0),o.content=e.getLines(t,i,4+e.blkIndent,!0),o.map=[t,e.line],!0}},function(e,t,n){"use strict";e.exports=function(e,t,n,r){var i,o,a,s,l,c,u,h=!1,p=e.bMarks[t]+e.tShift[t],d=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;if(p+3>d)return!1;if(126!==(i=e.src.charCodeAt(p))&&96!==i)return!1;if(l=p,p=e.skipChars(p,i),(o=p-l)<3)return!1;if(u=e.src.slice(l,p),a=e.src.slice(p,d),a.indexOf(String.fromCharCode(i))>=0)return!1;if(r)return!0;for(s=t;!(++s>=n)&&(p=l=e.bMarks[s]+e.tShift[s],d=e.eMarks[s],!(p<d&&e.sCount[s]<e.blkIndent));)if(e.src.charCodeAt(p)===i&&!(e.sCount[s]-e.blkIndent>=4||(p=e.skipChars(p,i))-l<o||(p=e.skipSpaces(p))<d)){h=!0;break}return o=e.sCount[t],e.line=s+(h?1:0),c=e.push("fence","code",0),c.info=a,c.content=e.getLines(t+1,s,o,!0),c.markup=u,c.map=[t,e.line],!0}},function(e,t,n){"use strict";var r=n(0).isSpace;e.exports=function(e,t,n,i){var o,a,s,l,c=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;if(35!==(o=e.src.charCodeAt(c))||c>=u)return!1;for(a=1,o=e.src.charCodeAt(++c);35===o&&c<u&&a<=6;)a++,o=e.src.charCodeAt(++c);return!(a>6||c<u&&!r(o))&&(!!i||(u=e.skipSpacesBack(u,c),s=e.skipCharsBack(u,35,c),s>c&&r(e.src.charCodeAt(s-1))&&(u=s),e.line=t+1,l=e.push("heading_open","h"+String(a),1),l.markup="########".slice(0,a),l.map=[t,e.line],l=e.push("inline","",0),l.content=e.src.slice(c,u).trim(),l.map=[t,e.line],l.children=[],l=e.push("heading_close","h"+String(a),-1),l.markup="########".slice(0,a),!0))}},function(e,t,n){"use strict";var r=n(0).isSpace;e.exports=function(e,t,n,i){var o,a,s,l,c=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;if(42!==(o=e.src.charCodeAt(c++))&&45!==o&&95!==o)return!1;for(a=1;c<u;){if((s=e.src.charCodeAt(c++))!==o&&!r(s))return!1;s===o&&a++}return!(a<3)&&(!!i||(e.line=t+1,l=e.push("hr","hr",0),l.map=[t,e.line],l.markup=Array(a+1).join(String.fromCharCode(o)),!0))}},function(e,t,n){"use strict";var r=n(200),i=n(59).HTML_OPEN_CLOSE_TAG_RE,o=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+r.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(i.source+"\\s*$"),/^$/,!1]];e.exports=function(e,t,n,r){var i,a,s,l,c=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;if(!e.md.options.html)return!1;if(60!==e.src.charCodeAt(c))return!1;for(l=e.src.slice(c,u),i=0;i<o.length&&!o[i][0].test(l);i++);if(i===o.length)return!1;if(r)return o[i][2];if(a=t+1,!o[i][1].test(l))for(;a<n&&!(e.sCount[a]<e.blkIndent);a++)if(c=e.bMarks[a]+e.tShift[a],u=e.eMarks[a],l=e.src.slice(c,u),o[i][1].test(l)){0!==l.length&&a++;break}return e.line=a,s=e.push("html_block","",0),s.map=[t,a],s.content=e.getLines(t,a,e.blkIndent,!0),!0}},function(e,t,n){"use strict";e.exports=function(e,t,n){var r,i,o,a,s,l,c,u,h,p,d=t+1,f=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;for(p=e.parentType,e.parentType="paragraph";d<n&&!e.isEmpty(d);d++)if(!(e.sCount[d]-e.blkIndent>3)){if(e.sCount[d]>=e.blkIndent&&(l=e.bMarks[d]+e.tShift[d],c=e.eMarks[d],l<c&&(45===(h=e.src.charCodeAt(l))||61===h)&&(l=e.skipChars(l,h),(l=e.skipSpaces(l))>=c))){u=61===h?1:2;break}if(!(e.sCount[d]<0)){for(i=!1,o=0,a=f.length;o<a;o++)if(f[o](e,d,n,!0)){i=!0;break}if(i)break}}return!!u&&(r=e.getLines(t,d,e.blkIndent,!1).trim(),e.line=d+1,s=e.push("heading_open","h"+String(u),1),s.markup=String.fromCharCode(h),s.map=[t,e.line],s=e.push("inline","",0),s.content=r,s.map=[t,e.line-1],s.children=[],s=e.push("heading_close","h"+String(u),-1),s.markup=String.fromCharCode(h),e.parentType=p,!0)}},function(e,t,n){"use strict";function r(e,t){var n,r,i,o;return r=e.bMarks[t]+e.tShift[t],i=e.eMarks[t],n=e.src.charCodeAt(r++),42!==n&&45!==n&&43!==n?-1:r<i&&(o=e.src.charCodeAt(r),!a(o))?-1:r}function i(e,t){var n,r=e.bMarks[t]+e.tShift[t],i=r,o=e.eMarks[t];if(i+1>=o)return-1;if((n=e.src.charCodeAt(i++))<48||n>57)return-1;for(;;){if(i>=o)return-1;n=e.src.charCodeAt(i++);{if(!(n>=48&&n<=57)){if(41===n||46===n)break;return-1}if(i-r>=10)return-1}}return i<o&&(n=e.src.charCodeAt(i),!a(n))?-1:i}function o(e,t){var n,r,i=e.level+2;for(n=t+2,r=e.tokens.length-2;n<r;n++)e.tokens[n].level===i&&"paragraph_open"===e.tokens[n].type&&(e.tokens[n+2].hidden=!0,e.tokens[n].hidden=!0,n+=2)}var a=n(0).isSpace;e.exports=function(e,t,n,a){var s,l,c,u,h,p,d,f,g,m,_,b,v,y,k,w,x,C,j,A,E,S,L,D,T,M,z,B,q=!1,O=!0;if(e.sCount[t]-e.blkIndent>=4)return!1;if(a&&"paragraph"===e.parentType&&e.tShift[t]>=e.blkIndent&&(q=!0),(L=i(e,t))>=0){if(d=!0,T=e.bMarks[t]+e.tShift[t],v=Number(e.src.substr(T,L-T-1)),q&&1!==v)return!1}else{if(!((L=r(e,t))>=0))return!1;d=!1}if(q&&e.skipSpaces(L)>=e.eMarks[t])return!1;if(b=e.src.charCodeAt(L-1),a)return!0;for(_=e.tokens.length,d?(B=e.push("ordered_list_open","ol",1),1!==v&&(B.attrs=[["start",v]])):B=e.push("bullet_list_open","ul",1),B.map=m=[t,0],B.markup=String.fromCharCode(b),k=t,D=!1,z=e.md.block.ruler.getRules("list"),j=e.parentType,e.parentType="list";k<n;){for(S=L,y=e.eMarks[k],p=w=e.sCount[k]+L-(e.bMarks[t]+e.tShift[t]);S<y;){if(9===(s=e.src.charCodeAt(S)))w+=4-(w+e.bsCount[k])%4;else{if(32!==s)break;w++}S++}if(l=S,h=l>=y?1:w-p,h>4&&(h=1),u=p+h,B=e.push("list_item_open","li",1),B.markup=String.fromCharCode(b),B.map=f=[t,0],x=e.blkIndent,E=e.tight,A=e.tShift[t],C=e.sCount[t],e.blkIndent=u,e.tight=!0,e.tShift[t]=l-e.bMarks[t],e.sCount[t]=w,l>=y&&e.isEmpty(t+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,t,n,!0),e.tight&&!D||(O=!1),D=e.line-t>1&&e.isEmpty(e.line-1),e.blkIndent=x,e.tShift[t]=A,e.sCount[t]=C,e.tight=E,B=e.push("list_item_close","li",-1),B.markup=String.fromCharCode(b),k=t=e.line,f[1]=k,l=e.bMarks[t],k>=n)break;if(e.sCount[k]<e.blkIndent)break;for(M=!1,c=0,g=z.length;c<g;c++)if(z[c](e,k,n,!0)){M=!0;break}if(M)break;if(d){if((L=i(e,k))<0)break}else if((L=r(e,k))<0)break;if(b!==e.src.charCodeAt(L-1))break}return B=d?e.push("ordered_list_close","ol",-1):e.push("bullet_list_close","ul",-1),B.markup=String.fromCharCode(b),m[1]=k,e.line=k,e.parentType=j,O&&o(e,_),!0}},function(e,t,n){"use strict";e.exports=function(e,t){var n,r,i,o,a,s,l=t+1,c=e.md.block.ruler.getRules("paragraph"),u=e.lineMax;for(s=e.parentType,e.parentType="paragraph";l<u&&!e.isEmpty(l);l++)if(!(e.sCount[l]-e.blkIndent>3||e.sCount[l]<0)){for(r=!1,i=0,o=c.length;i<o;i++)if(c[i](e,l,u,!0)){r=!0;break}if(r)break}return n=e.getLines(t,l,e.blkIndent,!1).trim(),e.line=l,a=e.push("paragraph_open","p",1),a.map=[t,e.line],a=e.push("inline","",0),a.content=n,a.map=[t,e.line],a.children=[],a=e.push("paragraph_close","p",-1),e.parentType=s,!0}},function(e,t,n){"use strict";var r=n(0).normalizeReference,i=n(0).isSpace;e.exports=function(e,t,n,o){var a,s,l,c,u,h,p,d,f,g,m,_,b,v,y,k,w=0,x=e.bMarks[t]+e.tShift[t],C=e.eMarks[t],j=t+1;if(e.sCount[t]-e.blkIndent>=4)return!1;if(91!==e.src.charCodeAt(x))return!1;for(;++x<C;)if(93===e.src.charCodeAt(x)&&92!==e.src.charCodeAt(x-1)){if(x+1===C)return!1;if(58!==e.src.charCodeAt(x+1))return!1;break}for(c=e.lineMax,y=e.md.block.ruler.getRules("reference"),g=e.parentType,e.parentType="reference";j<c&&!e.isEmpty(j);j++)if(!(e.sCount[j]-e.blkIndent>3||e.sCount[j]<0)){for(v=!1,h=0,p=y.length;h<p;h++)if(y[h](e,j,c,!0)){v=!0;break}if(v)break}for(b=e.getLines(t,j,e.blkIndent,!1).trim(),C=b.length,x=1;x<C;x++){if(91===(a=b.charCodeAt(x)))return!1;if(93===a){f=x;break}10===a?w++:92===a&&++x<C&&10===b.charCodeAt(x)&&w++}if(f<0||58!==b.charCodeAt(f+1))return!1;for(x=f+2;x<C;x++)if(10===(a=b.charCodeAt(x)))w++;else if(!i(a))break;if(m=e.md.helpers.parseLinkDestination(b,x,C),!m.ok)return!1;if(u=e.md.normalizeLink(m.str),!e.md.validateLink(u))return!1;for(x=m.pos,w+=m.lines,s=x,l=w,_=x;x<C;x++)if(10===(a=b.charCodeAt(x)))w++;else if(!i(a))break;for(m=e.md.helpers.parseLinkTitle(b,x,C),x<C&&_!==x&&m.ok?(k=m.str,x=m.pos,w+=m.lines):(k="",x=s,w=l);x<C&&(a=b.charCodeAt(x),i(a));)x++;if(x<C&&10!==b.charCodeAt(x)&&k)for(k="",x=s,w=l;x<C&&(a=b.charCodeAt(x),i(a));)x++;return!(x<C&&10!==b.charCodeAt(x))&&(!!(d=r(b.slice(1,f)))&&(!!o||(void 0===e.env.references&&(e.env.references={}),void 0===e.env.references[d]&&(e.env.references[d]={title:k,href:u}),e.parentType=g,e.line=t+w+1,!0)))}},function(e,t,n){"use strict";function r(e,t,n,r){var i,a,s,l,c,u,h,p;for(this.src=e,this.md=t,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.parentType="root",this.level=0,this.result="",a=this.src,p=!1,s=l=u=h=0,c=a.length;l<c;l++){if(i=a.charCodeAt(l),!p){if(o(i)){u++,9===i?h+=4-h%4:h++;continue}p=!0}10!==i&&l!==c-1||(10!==i&&l++,this.bMarks.push(s),this.eMarks.push(l),this.tShift.push(u),this.sCount.push(h),this.bsCount.push(0),p=!1,u=0,h=0,s=l+1)}this.bMarks.push(a.length),this.eMarks.push(a.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}var i=n(42),o=n(0).isSpace;r.prototype.push=function(e,t,n){var r=new i(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r},r.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},r.prototype.skipEmptyLines=function(e){for(var t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},r.prototype.skipSpaces=function(e){for(var t,n=this.src.length;e<n&&(t=this.src.charCodeAt(e),o(t));e++);return e},r.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!o(this.src.charCodeAt(--e)))return e+1;return e},r.prototype.skipChars=function(e,t){for(var n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e},r.prototype.skipCharsBack=function(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e},r.prototype.getLines=function(e,t,n,r){var i,a,s,l,c,u,h,p=e;if(e>=t)return"";for(u=new Array(t-e),i=0;p<t;p++,i++){for(a=0,h=l=this.bMarks[p],c=p+1<t||r?this.eMarks[p]+1:this.eMarks[p];l<c&&a<n;){if(s=this.src.charCodeAt(l),o(s))9===s?a+=4-(a+this.bsCount[p])%4:a++;else{if(!(l-h<this.tShift[p]))break;a++}l++}u[i]=a>n?new Array(a-n+1).join(" ")+this.src.slice(l,c):this.src.slice(l,c)}return u.join("")},r.prototype.Token=i,e.exports=r},function(e,t,n){"use strict";function r(e,t){var n=e.bMarks[t]+e.blkIndent,r=e.eMarks[t];return e.src.substr(n,r-n)}function i(e){var t,n=[],r=0,i=e.length,o=0,a=0,s=!1,l=0;for(t=e.charCodeAt(r);r<i;)96===t?s?(s=!1,l=r):o%2==0&&(s=!0,l=r):124!==t||o%2!=0||s||(n.push(e.substring(a,r)),a=r+1),92===t?o++:o=0,r++,r===i&&s&&(s=!1,r=l+1),t=e.charCodeAt(r);return n.push(e.substring(a)),n}var o=n(0).isSpace;e.exports=function(e,t,n,a){var s,l,c,u,h,p,d,f,g,m,_,b;if(t+2>n)return!1;if(h=t+1,e.sCount[h]<e.blkIndent)return!1;if(e.sCount[h]-e.blkIndent>=4)return!1;if((c=e.bMarks[h]+e.tShift[h])>=e.eMarks[h])return!1;if(124!==(s=e.src.charCodeAt(c++))&&45!==s&&58!==s)return!1;for(;c<e.eMarks[h];){if(124!==(s=e.src.charCodeAt(c))&&45!==s&&58!==s&&!o(s))return!1;c++}for(l=r(e,t+1),p=l.split("|"),g=[],u=0;u<p.length;u++){if(!(m=p[u].trim())){if(0===u||u===p.length-1)continue;return!1}if(!/^:?-+:?$/.test(m))return!1;58===m.charCodeAt(m.length-1)?g.push(58===m.charCodeAt(0)?"center":"right"):58===m.charCodeAt(0)?g.push("left"):g.push("")}if(l=r(e,t).trim(),-1===l.indexOf("|"))return!1;if(e.sCount[t]-e.blkIndent>=4)return!1;if(p=i(l.replace(/^\||\|$/g,"")),(d=p.length)>g.length)return!1;if(a)return!0;for(f=e.push("table_open","table",1),f.map=_=[t,0],f=e.push("thead_open","thead",1),f.map=[t,t+1],f=e.push("tr_open","tr",1),f.map=[t,t+1],u=0;u<p.length;u++)f=e.push("th_open","th",1),f.map=[t,t+1],g[u]&&(f.attrs=[["style","text-align:"+g[u]]]),f=e.push("inline","",0),f.content=p[u].trim(),f.map=[t,t+1],f.children=[],f=e.push("th_close","th",-1);for(f=e.push("tr_close","tr",-1),f=e.push("thead_close","thead",-1),f=e.push("tbody_open","tbody",1),f.map=b=[t+2,0],h=t+2;h<n&&!(e.sCount[h]<e.blkIndent)&&(l=r(e,h).trim(),-1!==l.indexOf("|"))&&!(e.sCount[h]-e.blkIndent>=4);h++){for(p=i(l.replace(/^\||\|$/g,"")),f=e.push("tr_open","tr",1),u=0;u<d;u++)f=e.push("td_open","td",1),g[u]&&(f.attrs=[["style","text-align:"+g[u]]]),f=e.push("inline","",0),f.content=p[u]?p[u].trim():"",f.children=[],f=e.push("td_close","td",-1);f=e.push("tr_close","tr",-1)}return f=e.push("tbody_close","tbody",-1),f=e.push("table_close","table",-1),_[1]=b[1]=h,e.line=h,!0}},function(e,t,n){"use strict";e.exports=function(e){var t;e.inlineMode?(t=new e.Token("inline","",0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}},function(e,t,n){"use strict";e.exports=function(e){var t,n,r,i=e.tokens;for(n=0,r=i.length;n<r;n++)t=i[n],"inline"===t.type&&e.md.inline.parse(t.content,e.md,e.env,t.children)}},function(e,t,n){"use strict";function r(e){return/^<a[>\s]/i.test(e)}function i(e){return/^<\/a\s*>/i.test(e)}var o=n(0).arrayReplaceAt;e.exports=function(e){var t,n,a,s,l,c,u,h,p,d,f,g,m,_,b,v,y,k=e.tokens;if(e.md.options.linkify)for(n=0,a=k.length;n<a;n++)if("inline"===k[n].type&&e.md.linkify.pretest(k[n].content))for(s=k[n].children,m=0,t=s.length-1;t>=0;t--)if(c=s[t],"link_close"!==c.type){if("html_inline"===c.type&&(r(c.content)&&m>0&&m--,i(c.content)&&m++),!(m>0)&&"text"===c.type&&e.md.linkify.test(c.content)){for(p=c.content,y=e.md.linkify.match(p),u=[],g=c.level,f=0,h=0;h<y.length;h++)_=y[h].url,b=e.md.normalizeLink(_),e.md.validateLink(b)&&(v=y[h].text,v=y[h].schema?"mailto:"!==y[h].schema||/^mailto:/i.test(v)?e.md.normalizeLinkText(v):e.md.normalizeLinkText("mailto:"+v).replace(/^mailto:/,""):e.md.normalizeLinkText("http://"+v).replace(/^http:\/\//,""),d=y[h].index,d>f&&(l=new e.Token("text","",0),l.content=p.slice(f,d),l.level=g,u.push(l)),l=new e.Token("link_open","a",1),l.attrs=[["href",b]],l.level=g++,l.markup="linkify",l.info="auto",u.push(l),l=new e.Token("text","",0),l.content=v,l.level=g,u.push(l),l=new e.Token("link_close","a",-1),l.level=--g,l.markup="linkify",l.info="auto",u.push(l),f=y[h].lastIndex);f<p.length&&(l=new e.Token("text","",0),l.content=p.slice(f),l.level=g,u.push(l)),k[n].children=s=o(s,t,u)}}else for(t--;s[t].level!==c.level&&"link_open"!==s[t].type;)t--}},function(e,t,n){"use strict";var r=/\r[\n\u0085]?|[\u2424\u2028\u0085]/g,i=/\u0000/g;e.exports=function(e){var t;t=e.src.replace(r,"\n"),t=t.replace(i,"�"),e.src=t}},function(e,t,n){"use strict";function r(e,t){return c[t.toLowerCase()]}function i(e){var t,n,i=0;for(t=e.length-1;t>=0;t--)n=e[t],"text"!==n.type||i||(n.content=n.content.replace(l,r)),"link_open"===n.type&&"auto"===n.info&&i--,"link_close"===n.type&&"auto"===n.info&&i++}function o(e){var t,n,r=0;for(t=e.length-1;t>=0;t--)n=e[t],"text"!==n.type||r||a.test(n.content)&&(n.content=n.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1—$2").replace(/(^|\s)--(\s|$)/gm,"$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1–$2")),"link_open"===n.type&&"auto"===n.info&&r--,"link_close"===n.type&&"auto"===n.info&&r++}var a=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,s=/\((c|tm|r|p)\)/i,l=/\((c|tm|r|p)\)/gi,c={c:"©",r:"®",p:"§",tm:"™"};e.exports=function(e){var t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)"inline"===e.tokens[t].type&&(s.test(e.tokens[t].content)&&i(e.tokens[t].children),a.test(e.tokens[t].content)&&o(e.tokens[t].children))}},function(e,t,n){"use strict";function r(e,t,n){return e.substr(0,t)+n+e.substr(t+1)}function i(e,t){var n,i,l,h,p,d,f,g,m,_,b,v,y,k,w,x,C,j,A,E,S;for(A=[],n=0;n<e.length;n++){for(i=e[n],f=e[n].level,C=A.length-1;C>=0&&!(A[C].level<=f);C--);if(A.length=C+1,"text"===i.type){l=i.content,p=0,d=l.length;e:for(;p<d&&(c.lastIndex=p,h=c.exec(l));){if(w=x=!0,p=h.index+1,j="'"===h[0],m=32,h.index-1>=0)m=l.charCodeAt(h.index-1);else for(C=n-1;C>=0;C--)if("text"===e[C].type){m=e[C].content.charCodeAt(e[C].content.length-1);break}if(_=32,p<d)_=l.charCodeAt(p);else for(C=n+1;C<e.length;C++)if("text"===e[C].type){_=e[C].content.charCodeAt(0);break}if(b=s(m)||a(String.fromCharCode(m)),v=s(_)||a(String.fromCharCode(_)),y=o(m),k=o(_),k?w=!1:v&&(y||b||(w=!1)),y?x=!1:b&&(k||v||(x=!1)),34===_&&'"'===h[0]&&m>=48&&m<=57&&(x=w=!1),w&&x&&(w=!1,x=v),w||x){if(x)for(C=A.length-1;C>=0&&(g=A[C],!(A[C].level<f));C--)if(g.single===j&&A[C].level===f){g=A[C],j?(E=t.md.options.quotes[2],S=t.md.options.quotes[3]):(E=t.md.options.quotes[0],S=t.md.options.quotes[1]),i.content=r(i.content,h.index,S),e[g.token].content=r(e[g.token].content,g.pos,E),p+=S.length-1,g.token===n&&(p+=E.length-1),l=i.content,d=l.length,A.length=C;continue e}w?A.push({token:n,pos:h.index,single:j,level:f}):x&&j&&(i.content=r(i.content,h.index,u))}else j&&(i.content=r(i.content,h.index,u))}}}}var o=n(0).isWhiteSpace,a=n(0).isPunctChar,s=n(0).isMdAsciiPunct,l=/['"]/,c=/['"]/g,u="’";e.exports=function(e){var t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)"inline"===e.tokens[t].type&&l.test(e.tokens[t].content)&&i(e.tokens[t].children,e)}},function(e,t,n){"use strict";function r(e,t,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=t}var i=n(42);r.prototype.Token=i,e.exports=r},function(e,t,n){"use strict";var r=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,i=/^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;e.exports=function(e,t){var n,o,a,s,l,c,u=e.pos;return 60===e.src.charCodeAt(u)&&(n=e.src.slice(u),!(n.indexOf(">")<0)&&(i.test(n)?(o=n.match(i),s=o[0].slice(1,-1),l=e.md.normalizeLink(s),!!e.md.validateLink(l)&&(t||(c=e.push("link_open","a",1),c.attrs=[["href",l]],c.markup="autolink",c.info="auto",c=e.push("text","",0),c.content=e.md.normalizeLinkText(s),c=e.push("link_close","a",-1),c.markup="autolink",c.info="auto"),e.pos+=o[0].length,!0)):!!r.test(n)&&(a=n.match(r),s=a[0].slice(1,-1),l=e.md.normalizeLink("mailto:"+s),!!e.md.validateLink(l)&&(t||(c=e.push("link_open","a",1),c.attrs=[["href",l]],c.markup="autolink",c.info="auto",c=e.push("text","",0),c.content=e.md.normalizeLinkText(s),c=e.push("link_close","a",-1),c.markup="autolink",c.info="auto"),e.pos+=a[0].length,!0))))}},function(e,t,n){"use strict";e.exports=function(e,t){var n,r,i,o,a,s,l=e.pos;if(96!==e.src.charCodeAt(l))return!1;for(n=l,l++,r=e.posMax;l<r&&96===e.src.charCodeAt(l);)l++;for(i=e.src.slice(n,l),o=a=l;-1!==(o=e.src.indexOf("`",a));){for(a=o+1;a<r&&96===e.src.charCodeAt(a);)a++;if(a-o===i.length)return t||(s=e.push("code_inline","code",0),s.markup=i,s.content=e.src.slice(l,o).replace(/[ \n]+/g," ").trim()),e.pos=a,!0}return t||(e.pending+=i),e.pos+=i.length,!0}},function(e,t,n){"use strict";e.exports=function(e){var t,n,r,i,o=e.delimiters,a=e.delimiters.length;for(t=0;t<a;t++)if(r=o[t],r.close)for(n=t-r.jump-1;n>=0;){if(i=o[n],i.open&&i.marker===r.marker&&i.end<0&&i.level===r.level){var s=(i.close||r.open)&&void 0!==i.length&&void 0!==r.length&&(i.length+r.length)%3==0;if(!s){r.jump=t-n,r.open=!1,i.end=t,i.jump=0;break}}n-=i.jump+1}}},function(e,t,n){"use strict";var r=n(58),i=n(0).has,o=n(0).isValidEntityCode,a=n(0).fromCodePoint,s=/^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,l=/^&([a-z][a-z0-9]{1,31});/i;e.exports=function(e,t){var n,c,u=e.pos,h=e.posMax;if(38!==e.src.charCodeAt(u))return!1;if(u+1<h)if(35===e.src.charCodeAt(u+1)){if(c=e.src.slice(u).match(s))return t||(n="x"===c[1][0].toLowerCase()?parseInt(c[1].slice(1),16):parseInt(c[1],10),e.pending+=a(o(n)?n:65533)),e.pos+=c[0].length,!0}else if((c=e.src.slice(u).match(l))&&i(r,c[1]))return t||(e.pending+=r[c[1]]),e.pos+=c[0].length,!0;return t||(e.pending+="&"),e.pos++,!0}},function(e,t,n){"use strict";for(var r=n(0).isSpace,i=[],o=0;o<256;o++)i.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){i[e.charCodeAt(0)]=1}),e.exports=function(e,t){var n,o=e.pos,a=e.posMax;if(92!==e.src.charCodeAt(o))return!1;if(++o<a){if((n=e.src.charCodeAt(o))<256&&0!==i[n])return t||(e.pending+=e.src[o]),e.pos+=2,!0;if(10===n){for(t||e.push("hardbreak","br",0),o++;o<a&&(n=e.src.charCodeAt(o),r(n));)o++;return e.pos=o,!0}}return t||(e.pending+="\\"),e.pos++,!0}},function(e,t,n){"use strict";function r(e){var t=32|e;return t>=97&&t<=122}var i=n(59).HTML_TAG_RE;e.exports=function(e,t){var n,o,a,s,l=e.pos;return!!e.md.options.html&&(a=e.posMax,!(60!==e.src.charCodeAt(l)||l+2>=a)&&(!(33!==(n=e.src.charCodeAt(l+1))&&63!==n&&47!==n&&!r(n))&&(!!(o=e.src.slice(l).match(i))&&(t||(s=e.push("html_inline","",0),s.content=e.src.slice(l,l+o[0].length)),e.pos+=o[0].length,!0))))}},function(e,t,n){"use strict";var r=n(0).normalizeReference,i=n(0).isSpace;e.exports=function(e,t){var n,o,a,s,l,c,u,h,p,d,f,g,m,_="",b=e.pos,v=e.posMax;if(33!==e.src.charCodeAt(e.pos))return!1;if(91!==e.src.charCodeAt(e.pos+1))return!1;if(c=e.pos+2,(l=e.md.helpers.parseLinkLabel(e,e.pos+1,!1))<0)return!1;if((u=l+1)<v&&40===e.src.charCodeAt(u)){for(u++;u<v&&(o=e.src.charCodeAt(u),i(o)||10===o);u++);if(u>=v)return!1;for(m=u,p=e.md.helpers.parseLinkDestination(e.src,u,e.posMax),p.ok&&(_=e.md.normalizeLink(p.str),e.md.validateLink(_)?u=p.pos:_=""),m=u;u<v&&(o=e.src.charCodeAt(u),i(o)||10===o);u++);if(p=e.md.helpers.parseLinkTitle(e.src,u,e.posMax),u<v&&m!==u&&p.ok)for(d=p.str,u=p.pos;u<v&&(o=e.src.charCodeAt(u),i(o)||10===o);u++);else d="";if(u>=v||41!==e.src.charCodeAt(u))return e.pos=b,!1;u++}else{if(void 0===e.env.references)return!1;if(u<v&&91===e.src.charCodeAt(u)?(m=u+1,u=e.md.helpers.parseLinkLabel(e,u),u>=0?s=e.src.slice(m,u++):u=l+1):u=l+1,s||(s=e.src.slice(c,l)),!(h=e.env.references[r(s)]))return e.pos=b,!1;_=h.href,d=h.title}return t||(a=e.src.slice(c,l),e.md.inline.parse(a,e.md,e.env,g=[]),f=e.push("image","img",0),f.attrs=n=[["src",_],["alt",""]],f.children=g,f.content=a,d&&n.push(["title",d])),e.pos=u,e.posMax=v,!0}},function(e,t,n){"use strict";var r=n(0).normalizeReference,i=n(0).isSpace;e.exports=function(e,t){var n,o,a,s,l,c,u,h,p,d,f="",g=e.pos,m=e.posMax,_=e.pos,b=!0;if(91!==e.src.charCodeAt(e.pos))return!1;if(l=e.pos+1,(s=e.md.helpers.parseLinkLabel(e,e.pos,!0))<0)return!1;if((c=s+1)<m&&40===e.src.charCodeAt(c)){for(b=!1,c++;c<m&&(o=e.src.charCodeAt(c),i(o)||10===o);c++);if(c>=m)return!1;for(_=c,u=e.md.helpers.parseLinkDestination(e.src,c,e.posMax),u.ok&&(f=e.md.normalizeLink(u.str),e.md.validateLink(f)?c=u.pos:f=""),_=c;c<m&&(o=e.src.charCodeAt(c),i(o)||10===o);c++);if(u=e.md.helpers.parseLinkTitle(e.src,c,e.posMax),c<m&&_!==c&&u.ok)for(p=u.str,c=u.pos;c<m&&(o=e.src.charCodeAt(c),i(o)||10===o);c++);else p="";(c>=m||41!==e.src.charCodeAt(c))&&(b=!0),c++}if(b){if(void 0===e.env.references)return!1;if(c<m&&91===e.src.charCodeAt(c)?(_=c+1,c=e.md.helpers.parseLinkLabel(e,c),c>=0?a=e.src.slice(_,c++):c=s+1):c=s+1,a||(a=e.src.slice(l,s)),!(h=e.env.references[r(a)]))return e.pos=g,!1;f=h.href,p=h.title}return t||(e.pos=l,e.posMax=s,d=e.push("link_open","a",1),d.attrs=n=[["href",f]],p&&n.push(["title",p]),e.md.inline.tokenize(e),d=e.push("link_close","a",-1)),e.pos=c,e.posMax=m,!0}},function(e,t,n){"use strict";var r=n(0).isSpace;e.exports=function(e,t){var n,i,o=e.pos;if(10!==e.src.charCodeAt(o))return!1;for(n=e.pending.length-1,i=e.posMax,t||(n>=0&&32===e.pending.charCodeAt(n)?n>=1&&32===e.pending.charCodeAt(n-1)?(e.pending=e.pending.replace(/ +$/,""),e.push("hardbreak","br",0)):(e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0)):e.push("softbreak","br",0)),o++;o<i&&r(e.src.charCodeAt(o));)o++;return e.pos=o,!0}},function(e,t,n){"use strict";function r(e,t,n,r){this.src=e,this.env=n,this.md=t,this.tokens=r,this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[]}var i=n(42),o=n(0).isWhiteSpace,a=n(0).isPunctChar,s=n(0).isMdAsciiPunct;r.prototype.pushPending=function(){var e=new i("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e},r.prototype.push=function(e,t,n){this.pending&&this.pushPending();var r=new i(e,t,n);return n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.pendingLevel=this.level,this.tokens.push(r),r},r.prototype.scanDelims=function(e,t){var n,r,i,l,c,u,h,p,d,f=e,g=!0,m=!0,_=this.posMax,b=this.src.charCodeAt(e);for(n=e>0?this.src.charCodeAt(e-1):32;f<_&&this.src.charCodeAt(f)===b;)f++;return i=f-e,r=f<_?this.src.charCodeAt(f):32,h=s(n)||a(String.fromCharCode(n)),d=s(r)||a(String.fromCharCode(r)),u=o(n),p=o(r),p?g=!1:d&&(u||h||(g=!1)),u?m=!1:h&&(p||d||(m=!1)),t?(l=g,c=m):(l=g&&(!m||h),c=m&&(!g||d)),{can_open:l,can_close:c,length:i}},r.prototype.Token=i,e.exports=r},function(e,t,n){"use strict";function r(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}e.exports=function(e,t){for(var n=e.pos;n<e.posMax&&!r(e.src.charCodeAt(n));)n++;return n!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}},function(e,t,n){"use strict";e.exports=function(e){var t,n,r=0,i=e.tokens,o=e.tokens.length;for(t=n=0;t<o;t++)r+=i[t].nesting,i[t].level=r,"text"===i[t].type&&t+1<o&&"text"===i[t+1].type?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}},function(e,t,n){"use strict";function r(e){if(!e.__matchAtRelocatable){var t=e.source+"|()",n="g"+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"");e.__matchAtRelocatable=new RegExp(t,n)}return e.__matchAtRelocatable}function i(e,t,n){if(e.global||e.sticky)throw new Error("matchAt(...): Only non-global regexes are supported");var i=r(e);i.lastIndex=n;var o=i.exec(t);return null==o[o.length-1]?(o.length=o.length-1,o):null}e.exports=i},function(e,t,n){"use strict";function r(e){var t,n,r=o[e];if(r)return r;for(r=o[e]=[],t=0;t<128;t++)n=String.fromCharCode(t),r.push(n);for(t=0;t<e.length;t++)n=e.charCodeAt(t),r[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2);return r}function i(e,t){var n;return"string"!=typeof t&&(t=i.defaultChars),n=r(t),e.replace(/(%[a-f0-9]{2})+/gi,function(e){var t,r,i,o,a,s,l,c="";for(t=0,r=e.length;t<r;t+=3)i=parseInt(e.slice(t+1,t+3),16),i<128?c+=n[i]:192==(224&i)&&t+3<r&&128==(192&(o=parseInt(e.slice(t+4,t+6),16)))?(l=i<<6&1984|63&o,c+=l<128?"��":String.fromCharCode(l),t+=3):224==(240&i)&&t+6<r&&(o=parseInt(e.slice(t+4,t+6),16),a=parseInt(e.slice(t+7,t+9),16),128==(192&o)&&128==(192&a))?(l=i<<12&61440|o<<6&4032|63&a,c+=l<2048||l>=55296&&l<=57343?"���":String.fromCharCode(l),t+=6):240==(248&i)&&t+9<r&&(o=parseInt(e.slice(t+4,t+6),16),a=parseInt(e.slice(t+7,t+9),16),s=parseInt(e.slice(t+10,t+12),16),128==(192&o)&&128==(192&a)&&128==(192&s))?(l=i<<18&1835008|o<<12&258048|a<<6&4032|63&s,l<65536||l>1114111?c+="����":(l-=65536,c+=String.fromCharCode(55296+(l>>10),56320+(1023&l))),t+=9):c+="�";return c})}var o={};i.defaultChars=";/?:@&=+$,#",i.componentChars="",e.exports=i},function(e,t,n){"use strict";function r(e){var t,n,r=o[e];if(r)return r;for(r=o[e]=[],t=0;t<128;t++)n=String.fromCharCode(t),/^[0-9a-z]$/i.test(n)?r.push(n):r.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2));for(t=0;t<e.length;t++)r[e.charCodeAt(t)]=e[t];return r}function i(e,t,n){var o,a,s,l,c,u="";for("string"!=typeof t&&(n=t,t=i.defaultChars),void 0===n&&(n=!0),c=r(t),o=0,a=e.length;o<a;o++)if(s=e.charCodeAt(o),n&&37===s&&o+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3)))u+=e.slice(o,o+3),o+=2;else if(s<128)u+=c[s];else if(s>=55296&&s<=57343){if(s>=55296&&s<=56319&&o+1<a&&(l=e.charCodeAt(o+1))>=56320&&l<=57343){u+=encodeURIComponent(e[o]+e[o+1]),o++;continue}u+="%EF%BF%BD"}else u+=encodeURIComponent(e[o]);return u}var o={};i.defaultChars=";/?:@&=+$,-_.!~*'()#",i.componentChars="-_.!~*'()",e.exports=i},function(e,t,n){"use strict";e.exports=function(e){var t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&-1!==e.hostname.indexOf(":")?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||""}},function(e,t,n){"use strict";function r(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function i(e,t){if(e&&e instanceof r)return e;var n=new r;return n.parse(e,t),n}var o=/^([a-z0-9.+-]+:)/i,a=/:[0-9]*$/,s=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["<",">",'"',"`"," ","\r","\n","\t"],c=["{","}","|","\\","^","`"].concat(l),u=["'"].concat(c),h=["%","/","?",";","#"].concat(u),p=["/","?","#"],d=/^[+a-z0-9A-Z_-]{0,63}$/,f=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,g={javascript:!0,"javascript:":!0},m={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};r.prototype.parse=function(e,t){var n,r,i,a,l,c=e;if(c=c.trim(),!t&&1===e.split("#").length){var u=s.exec(c);if(u)return this.pathname=u[1],u[2]&&(this.search=u[2]),this}var _=o.exec(c);if(_&&(_=_[0],i=_.toLowerCase(),this.protocol=_,c=c.substr(_.length)),(t||_||c.match(/^\/\/[^@\/]+@[^@\/]+/))&&(!(l="//"===c.substr(0,2))||_&&g[_]||(c=c.substr(2),this.slashes=!0)),!g[_]&&(l||_&&!m[_])){var b=-1;for(n=0;n<p.length;n++)-1!==(a=c.indexOf(p[n]))&&(-1===b||a<b)&&(b=a);var v,y;for(y=-1===b?c.lastIndexOf("@"):c.lastIndexOf("@",b),-1!==y&&(v=c.slice(0,y),c=c.slice(y+1),this.auth=v),b=-1,n=0;n<h.length;n++)-1!==(a=c.indexOf(h[n]))&&(-1===b||a<b)&&(b=a);-1===b&&(b=c.length),":"===c[b-1]&&b--;var k=c.slice(0,b);c=c.slice(b),this.parseHost(k),this.hostname=this.hostname||"";var w="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!w){var x=this.hostname.split(/\./);for(n=0,r=x.length;n<r;n++){var C=x[n];if(C&&!C.match(d)){for(var j="",A=0,E=C.length;A<E;A++)C.charCodeAt(A)>127?j+="x":j+=C[A];if(!j.match(d)){var S=x.slice(0,n),L=x.slice(n+1),D=C.match(f);D&&(S.push(D[1]),L.unshift(D[2])),L.length&&(c=L.join(".")+c),this.hostname=S.join(".");break}}}}this.hostname.length>255&&(this.hostname=""),w&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}var T=c.indexOf("#");-1!==T&&(this.hash=c.substr(T),c=c.slice(0,T));var M=c.indexOf("?");return-1!==M&&(this.search=c.substr(M),c=c.slice(0,M)),c&&(this.pathname=c),m[i]&&this.hostname&&!this.pathname&&(this.pathname=""),this},r.prototype.parseHost=function(e){var t=a.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)},e.exports=i},function(e,t,n){(function(e,r){var i;!function(o){function a(e){throw new RangeError(M[e])}function s(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function l(e,t){var n=e.split("@"),r="";return n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(T,"."),r+s(e.split("."),t).join(".")}function c(e){for(var t,n,r=[],i=0,o=e.length;i<o;)t=e.charCodeAt(i++),t>=55296&&t<=56319&&i<o?(n=e.charCodeAt(i++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),i--)):r.push(t);return r}function u(e){return s(e,function(e){var t="";return e>65535&&(e-=65536,t+=q(e>>>10&1023|55296),e=56320|1023&e),t+=q(e)}).join("")}function h(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:k}function p(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function d(e,t,n){var r=0;for(e=n?B(e/j):e>>1,e+=B(e/t);e>z*x>>1;r+=k)e=B(e/z);return B(r+(z+1)*e/(e+C))}function f(e){var t,n,r,i,o,s,l,c,p,f,g=[],m=e.length,_=0,b=E,v=A;for(n=e.lastIndexOf(S),n<0&&(n=0),r=0;r<n;++r)e.charCodeAt(r)>=128&&a("not-basic"),g.push(e.charCodeAt(r));for(i=n>0?n+1:0;i<m;){for(o=_,s=1,l=k;i>=m&&a("invalid-input"),c=h(e.charCodeAt(i++)),(c>=k||c>B((y-_)/s))&&a("overflow"),_+=c*s,p=l<=v?w:l>=v+x?x:l-v,!(c<p);l+=k)f=k-p,s>B(y/f)&&a("overflow"),s*=f;t=g.length+1,v=d(_-o,t,0==o),B(_/t)>y-b&&a("overflow"),b+=B(_/t),_%=t,g.splice(_++,0,b)}return u(g)}function g(e){var t,n,r,i,o,s,l,u,h,f,g,m,_,b,v,C=[];for(e=c(e),m=e.length,t=E,n=0,o=A,s=0;s<m;++s)(g=e[s])<128&&C.push(q(g));for(r=i=C.length,i&&C.push(S);r<m;){for(l=y,s=0;s<m;++s)(g=e[s])>=t&&g<l&&(l=g);for(_=r+1,l-t>B((y-n)/_)&&a("overflow"),n+=(l-t)*_,t=l,s=0;s<m;++s)if(g=e[s],g<t&&++n>y&&a("overflow"),g==t){for(u=n,h=k;f=h<=o?w:h>=o+x?x:h-o,!(u<f);h+=k)v=u-f,b=k-f,C.push(q(p(f+v%b,0))),u=B(v/b);C.push(q(p(u,0))),o=d(n,_,r==i),n=0,++r}++n,++t}return C.join("")}function m(e){return l(e,function(e){return L.test(e)?f(e.slice(4).toLowerCase()):e})}function _(e){return l(e,function(e){return D.test(e)?"xn--"+g(e):e})}var b=("object"==typeof t&&t&&t.nodeType,"object"==typeof e&&e&&e.nodeType,"object"==typeof r&&r);var v,y=2147483647,k=36,w=1,x=26,C=38,j=700,A=72,E=128,S="-",L=/^xn--/,D=/[^\x20-\x7E]/,T=/[\x2E\u3002\uFF0E\uFF61]/g,M={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},z=k-w,B=Math.floor,q=String.fromCharCode;v={version:"1.4.1",ucs2:{decode:c,encode:u},decode:f,encode:g,toASCII:_,toUnicode:m},void 0!==(i=function(){return v}.call(t,n,t,e))&&(e.exports=i)}()}).call(t,n(299)(e),n(298))},function(e,t){e.exports='Markdown 语法简介\n=============\n> [语法详解](http://commonmark.org/help/)\n\n## **粗体**\n```\n**粗体**\n__粗体__\n```\n## *斜体*\n```\n*斜体*\n_斜体_\n```\n## 标题\n```\n# 一级标题 #\n一级标题\n====\n## 二级标题 ##\n二级标题\n----\n### 三级标题 ###\n#### 四级标题 ####\n##### 五级标题 #####\n###### 六级标题 ######\n```\n## 分割线\n```\n***\n---\n```\n****\n## ^上^角~下~标\n```\n上角标 x^2^\n下角标 H~2~0\n```\n## ++下划线++ ~~中划线~~\n```\n++下划线++\n~~中划线~~\n```\n## ==标记==\n```\n==标记==\n```\n## 段落引用\n```\n> 一级\n>> 二级\n>>> 三级\n...\n```\n\n## 列表\n```\n有序列表\n1.\n2.\n3.\n...\n无序列表\n-\n-\n...\n```\n## 链接\n```\n[链接](www.baidu.com)\n![图片描述](http://www.image.com)\n```\n## 代码段落\n\\``` type\n\n代码段落\n\n\\```\n\n\\` 代码块 \\`\n\n```c++\nint main()\n{\n    printf("hello world!");\n}\n```\n`code`\n## 表格(table)\n```\n| 标题1 | 标题2 | 标题3 |\n| :--  | :--: | ----: |\n| 左对齐 | 居中 | 右对齐 |\n| ---------------------- | ------------- | ----------------- |\n```\n| 标题1 | 标题2 | 标题3 |\n| :--  | :--: | ----: |\n| 左对齐 | 居中 | 右对齐 |\n| ---------------------- | ------------- | ----------------- |\n## 脚注(footnote)\n```\nhello[^hello]\n```\n\n见底部脚注[^hello]\n\n[^hello]: 一个注脚\n\n## 表情(emoji)\n[参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\n```\n:laughing:\n:blush:\n:smiley:\n:)\n...\n```\n:laughing::blush::smiley::)\n\n## $\\KaTeX$公式\n\n我们可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$\n我们也可以单行渲染\n$$\\sum_{i=1}^n a_i=0$$\n具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\n\n## 布局\n\n::: hljs-left\n`::: hljs-left`\n`居左`\n`:::`\n:::\n\n::: hljs-center\n`::: hljs-center`\n`居中`\n`:::`\n:::\n\n::: hljs-right\n`::: hljs-right`\n`居右`\n`:::`\n:::\n\n## 定义\n\n术语一\n\n:   定义一\n\n包含有*行内标记*的术语二\n\n:   定义二\n\n        {一些定义二的文字或代码}\n\n    定义二的第三段\n\n```\n术语一\n\n:   定义一\n\n包含有*行内标记*的术语二\n\n:   定义二\n\n        {一些定义二的文字或代码}\n\n    定义二的第三段\n\n```\n\n## abbr\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nHTML 规范由 W3C 维护\n```\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nHTML 规范由 W3C 维护\n```\n'},function(e,t){e.exports='Markdown Guide\n===\n> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)\n\n## **Bold**\n```\n**bold**\n__bold__\n```\n## *Italic*\n```\n*italic*\n_italic_\n```\n## Header\n```\n# h1 #\nh1\n====\n## h2 ##\nh2\n----\n### h3 ###\n#### h4 ####\n##### h5 #####\n###### h6 ######\n```\n## Dividing line\n```\n***\n---\n```\n****\n## ^Super^script & ~Sub~script\n```\nsuper x^2^\nsub H~2~0\n```\n## ++Underline++ & ~~Strikethrough~~\n```\n++underline++\n~~strikethrough~~\n```\n## ==Mark==\n```\n==mark==\n```\n## Quote\n\n```\n> quote 1\n>> quote 2\n>>> quote 3\n...\n```\n\n## List\n```\nol\n1.\n2.\n3.\n...\n\nul\n-\n-\n...\n```\n## Link\n```\nText Link\n[Text](www.baidu.com)\n\nImage Link\n![Text](http://www.image.com)\n```\n## Code\n\\``` type\n\ncode block\n\n\\```\n\n\\` code \\`\n\n```c++\nint main()\n{\n    printf("hello world!");\n}\n```\n`code`\n\n## Table\n```\n| th1 | th2 | th3 |\n| :--  | :--: | ----: |\n| left | center | right |\n```\n| th1 | th2 | th3 |\n| :--  | :--: | ----: |\n| left | center | right |\n| ---------------------- | ------------- | ----------------- |\n## Footnote\n```\nhello[^hello]\n```\n\nLook at the bottom[^hello]\n\n[^hello]: footnote\n\n## Emojis\nDetailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\n```\n:laughing:\n:blush:\n:smiley:\n:)\n...\n```\n:laughing::blush::smiley::)\n\n## $\\KaTeX$ Mathematics\n\nWe can render formulas for example：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\nWe can also single-line rendering\n$$\\sum_{i=1}^n a_i=0$$\nDetailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\n\n## Layout\n\n::: hljs-left\n`::: hljs-left`\n`left`\n`:::`\n:::\n\n::: hljs-center\n`::: hljs-center`\n`center`\n`:::`\n:::\n\n::: hljs-right\n`::: hljs-right`\n`right`\n`:::`\n:::\n\n## deflist\n\nTerm 1\n\n:   Definition 1\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n```\nTerm 1\n\n:   Definition 1\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n```\n\n## abbr\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nThe HTML specification\nis maintained by the W3C.\n```\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nThe HTML specification\nis maintained by the W3C.\n```\n'},function(e,t){e.exports='Guide Markdown\n==============\n> Détail : [http://commonmark.org/help/](http://commonmark.org/help/)\n\n## **Bold**\n```\n**bold**\n__bold__\n```\n## *Italic*\n```\n*italic*\n_italic_\n```\n## Header\n```\n# h1 #\nh1\n====\n## h2 ##\nh2\n----\n### h3 ###\n#### h4 ####\n##### h5 #####\n###### h6 ######\n```\n## Dividing line\n```\n***\n---\n```\n****\n## ^Super^script & ~Sub~script\n```\nsuper x^2^\nsub H~2~0\n```\n## ++Underline++ & ~~Strikethrough~~\n```\n++underline++\n~~strikethrough~~\n```\n## ==Mark==\n```\n==mark==\n```\n## Quote\n\n```\n> quote 1\n>> quote 2\n>>> quote 3\n...\n```\n\n## List\n```\nol\n1.\n2.\n3.\n...\n\nul\n-\n-\n...\n```\n## Link\n```\nText Link\n[Text](www.baidu.com)\n\nImage Link\n![Text](http://www.image.com)\n```\n## Code\n\\``` type\n\ncode block\n\n\\```\n\n\\` code \\`\n\n```c++\nint main()\n{\n    printf("hello world!");\n}\n```\n`code`\n\n## Table\n```\n| th1 | th2 | th3 |\n| :--  | :--: | ----: |\n| left | center | right |\n```\n| th1 | th2 | th3 |\n| :--  | :--: | ----: |\n| left | center | right |\n| ---------------------- | ------------- | ----------------- |\n## Footnote\n```\nhello[^hello]\n```\n\nLook at the bottom[^hello]\n\n[^hello]: footnote\n\n## Emojis\nDetailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\n```\n:laughing:\n:blush:\n:smiley:\n:)\n...\n```\n:laughing::blush::smiley::)\n\n## $\\KaTeX$ Mathematics\n\nWe can render formulas for example：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\nWe can also single-line rendering\n$$\\sum_{i=1}^n a_i=0$$\nDetailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\n\n## Layout\n\n::: hljs-left\n`::: hljs-left`\n`left`\n`:::`\n:::\n\n::: hljs-center\n`::: hljs-center`\n`center`\n`:::`\n:::\n\n::: hljs-right\n`::: hljs-right`\n`right`\n`:::`\n:::\n\n## deflist\n\nTerm 1\n\n:   Definition 1\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n```\nTerm 1\n\n:   Definition 1\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n```\n\n## abbr\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nThe HTML specification\nis maintained by the W3C.\n```\n*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nThe HTML specification\nis maintained by the W3C.\n```\n'},function(e,t){e.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},function(e,t,n){"use strict";t.Any=n(65),t.Cc=n(63),t.Cf=n(253),t.P=n(43),t.Z=n(64)},function(e,t,n){function r(e){i||n(296)}var i=!1,o=n(2)(n(69),n(281),r,null,null);o.options.__file="D:\\code\\mavonEditor\\node_modules\\_auto-textarea@1.3.7@auto-textarea\\auto-textarea.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] auto-textarea.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(284)}var i=!1,o=n(2)(n(70),n(270),r,"data-v-194160b6",null);o.options.__file="D:\\code\\mavonEditor\\src\\components\\s-md-toolbar-left.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] s-md-toolbar-left.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){var r=n(2)(n(71),n(275),null,null,null);r.options.__file="D:\\code\\mavonEditor\\src\\components\\s-md-toolbar-right.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] s-md-toolbar-right.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},function(e,t,n){function r(e){i||n(295)}var i=!1,o=n(2)(n(73),n(280),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\iconButton\\iconButton.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] iconButton.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(292)}var i=!1,o=n(2)(n(74),null,r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\icon\\icon.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),e.exports=o.exports},function(e,t,n){function r(e){i||n(289)}var i=!1,o=n(2)(n(75),n(276),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\internal\\circleRipple.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] circleRipple.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(291)}var i=!1,o=n(2)(n(76),n(278),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\internal\\expandTransition.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] expandTransition.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(288)}var i=!1,o=n(2)(n(77),n(274),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\internal\\focusRipple.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] focusRipple.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(286)}var i=!1,o=n(2)(n(78),n(272),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\internal\\popup\\overlay.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] overlay.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(282)}var i=!1,o=n(2)(n(79),n(268),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\internal\\touchRipple.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] touchRipple.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(287)}var i=!1,o=n(2)(n(81),n(273),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\list\\listItem.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] listItem.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(283)}var i=!1,o=n(2)(n(82),n(269),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\popover\\popover.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] popover.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){function r(e){i||n(290)}var i=!1,o=n(2)(n(83),n(277),r,null,null);o.options.__file="D:\\code\\mavonEditor\\src\\vender\\muse-ui\\tooltip\\tooltip.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] tooltip.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{mousedown:e.handleMouseDown,mouseup:function(t){e.end()},mouseleave:function(t){e.end()},touchstart:e.handleTouchStart,touchend:function(t){e.end()},touchcancel:function(t){e.end()}}},[n("div",{ref:"holder",staticClass:"mu-ripple-wrapper",class:e.rippleWrapperClass},e._l(e.ripples,function(e){return n("circle-ripple",{key:e.key,attrs:{color:e.color,opacity:e.opacity,"merge-style":e.style}})})),e._v(" "),e._t("default")],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("transition",{attrs:{name:"mu-popover"},on:{"after-enter":function(t){e.show()},"after-leave":function(t){e.hide()}}},[e.open?n("div",{ref:"popup",staticClass:"mu-popover",class:e.popoverClass,style:{"z-index":e.zIndex}},[e._t("default")],2):e._e()])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"left"},[e.toolbars.bold?n("button",{staticClass:"op-icon fa fa-mavon-bold",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_bold+" (ctrl+b)"},on:{click:function(t){e.$clicks("bold")}}}):e._e(),e._v(" "),e.toolbars.italic?n("button",{staticClass:"op-icon fa fa-mavon-italic",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_italic+" (ctrl+i)"},on:{click:function(t){e.$clicks("italic")}}}):e._e(),e._v(" "),e.toolbars.header?n("button",{staticClass:"op-icon fa fa-mavon-header",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_header+" (ctrl+h)"},on:{click:function(t){e.$clicks("header")}}}):e._e(),e._v(" "),e.toolbars.header||e.toolbars.italic||e.toolbars.bold?n("span",{staticClass:"op-icon-divider"}):e._e(),e._v(" "),e.toolbars.underline?n("button",{staticClass:"op-icon fa fa-mavon-underline",attrs:{disabled:!e.editable,type:"button",title:e.d_words.tl_underline+" (ctrl+u)","aria-hidden":"true"},on:{click:function(t){e.$clicks("underline")}}}):e._e(),e._v(" "),e.toolbars.strikethrough?n("button",{staticClass:"op-icon fa fa-mavon-strikethrough",attrs:{disabled:!e.editable,type:"button",title:e.d_words.tl_strikethrough+" (ctrl+d)","aria-hidden":"true"},on:{click:function(t){e.$clicks("strikethrough")}}}):e._e(),e._v(" "),e.toolbars.mark?n("button",{staticClass:"op-icon fa fa-mavon-thumb-tack",attrs:{disabled:!e.editable,type:"button",title:e.d_words.tl_mark+" (ctrl+m)","aria-hidden":"true"},on:{click:function(t){e.$clicks("mark")}}}):e._e(),e._v(" "),e.toolbars.superscript?n("button",{staticClass:"op-icon fa fa-mavon-superscript",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_superscript+" (ctrl+alt+s)"},on:{click:function(t){e.$clicks("superscript")}}}):e._e(),e._v(" "),e.toolbars.subscript?n("button",{staticClass:"op-icon fa fa-mavon-subscript",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_subscript+" (ctrl+shift+s)"},on:{click:function(t){e.$clicks("subscript")}}}):e._e(),e._v(" "),e.toolbars.alignleft?n("button",{staticClass:"op-icon fa fa-mavon-align-left",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_alignleft+" (ctrl+l)"},on:{click:function(t){e.$clicks("alignleft")}}}):e._e(),e.toolbars.aligncenter?n("button",{staticClass:"op-icon fa fa-mavon-align-center",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_aligncenter+" (ctrl+e)"},on:{click:function(t){e.$clicks("aligncenter")}}}):e._e(),e._v(" "),e.toolbars.alignright?n("button",{staticClass:"op-icon fa fa-mavon-align-right",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_alignright+" (ctrl+r)"},on:{click:function(t){e.$clicks("alignright")}}}):e._e(),e._v(" "),e.toolbars.superscript||e.toolbars.subscript||e.toolbars.underline||e.toolbars.strikethrough||e.toolbars.mark?n("span",{staticClass:"op-icon-divider"}):e._e(),e._v(" "),e.toolbars.quote?n("button",{staticClass:"op-icon fa fa-mavon-quote-left",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_quote+" (ctrl+q)"},on:{click:function(t){e.$clicks("quote")}}}):e._e(),e._v(" "),e.toolbars.ol?n("button",{staticClass:"op-icon fa fa-mavon-list-ol",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_ol+" (ctrl+o)"},on:{click:function(t){e.$clicks("ol")}}}):e._e(),e._v(" "),e.toolbars.ul?n("button",{staticClass:"op-icon fa fa-mavon-list-ul",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_ul+" (ctrl+alt+u)"},on:{click:function(t){e.$clicks("ul")}}}):e._e(),e._v(" "),e.toolbars.ul||e.toolbars.ol||e.toolbars.quote?n("span",{staticClass:"op-icon-divider"}):e._e(),e._v(" "),e.toolbars.link?n("button",{staticClass:"op-icon fa fa-mavon-link",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_link+" (ctrl+l)"},on:{click:function(t){e.$clicks("link")}}}):e._e(),e._v(" "),e.toolbars.imagelink?n("button",{ref:"img",staticClass:"op-icon fa fa-mavon-picture-o dropdown",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_image+" (ctrl+alt+l)"},on:{click:function(t){e.$clicks("imagelink")}}}):e._e(),e._v(" "),n("mu-popover",{attrs:{trigger:e.trigger,open:e.open},on:{close:e.handleClose}},[n("mu-list",{staticStyle:{"max-height":"300px"}},[e._l(e.img_file,function(t,r){return[0==r?n("mu-list-item",{attrs:{title:e.d_words.tl_upload},on:{click:function(t){t.stopPropagation(),e.$imgFileListClick(r)}}},[n("input",{key:t[0],ref:"imgfile",refInFor:!0,staticStyle:{display:"none"},attrs:{type:"file"},on:{change:function(t){e.$imgAdd(t)}}})]):n("mu-list-item",{attrs:{title:t[0]},on:{click:function(t){t.stopPropagation(),e.$imgFileListClick(r)}}},[n("button",{staticClass:"op-icon fa fa-mavon-trash-o",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_upload_remove},on:{click:function(t){t.stopPropagation(),e.$imgDel(r)}},slot:"right"}),e._v(" "),n("input",{key:t[0],ref:"imgfile",refInFor:!0,staticStyle:{display:"none"},attrs:{type:"file"},on:{change:function(t){e.$imgAdd(t)}}})])]})],2)],1),e._v(" "),e.toolbars.code?n("button",{staticClass:"op-icon fa fa-mavon-code",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_code+" (ctrl+alt+c)"},on:{click:function(t){e.$clicks("code")}}}):e._e(),e._v(" "),e.toolbars.table?n("button",{staticClass:"op-icon fa fa-mavon-table",attrs:{disabled:!e.editable,type:"button","aria-hidden":"true",title:e.d_words.tl_table+" (ctrl+alt+t)"},on:{click:function(t){e.$clicks("table")}}}):e._e(),e._v(" "),e.toolbars.link||e.toolbars.imagelink||e.toolbars.code||e.toolbars.table?n("span",{staticClass:"op-icon-divider"}):e._e(),e._v(" "),e.toolbars.undo?n("button",{staticClass:"op-icon fa fa-mavon-undo",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_undo+" (ctrl+z)"},on:{click:function(t){e.$clicks("undo")}}}):e._e(),e._v(" "),e.toolbars.redo?n("button",{staticClass:"op-icon fa fa-mavon-repeat",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_redo+" (ctrl+y)"},on:{click:function(t){e.$clicks("redo")}}}):e._e(),e._v(" "),e.toolbars.trash?n("button",{staticClass:"op-icon fa fa-mavon-trash-o",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_trash+" (ctrl+breakspace)"},on:{click:function(t){e.$clicks("trash")}}}):e._e(),e._v(" "),e.toolbars.save?n("button",{staticClass:"op-icon fa fa-mavon-floppy-o",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_save+" (ctrl+s)"},on:{click:function(t){e.$clicks("save")}}}):e._e()],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"mu-list"},[e._t("default")],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-overlay-fade"}},[e.show?n("div",{staticClass:"mu-overlay",style:e.overlayStyle,on:{click:e.handleClick,touchmove:e.prevent}}):e._e()])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("abstract-button",{staticClass:"mu-item-wrapper",style:e.disabled?e.itemStyle:{},attrs:{containerElement:"div",href:e.href,disabled:e.disabled,disableFocusRipple:e.disableRipple,disableTouchRipple:e.disableRipple,target:e.target,to:e.to,tag:e.tag,activeClass:e.activeClass,event:e.event,exact:e.exact,append:e.append,replace:e.replace,wrapperStyle:e.itemStyle,centerRipple:!1},on:{click:e.handleClick,keyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit}},[n("div",{class:e.itemClass},[e.showLeft?n("div",{staticClass:"mu-item-left"},[e._t("left"),e._v(" "),e._t("leftAvatar")],2):e._e(),e._v(" "),n("div",{staticClass:"mu-item-content"},[e.showTitleRow?n("div",{staticClass:"mu-item-title-row"},[n("div",{staticClass:"mu-item-title",class:e.titleClass},[e._t("title",[e._v("\n               "+e._s(e.title)+"\n             ")])],2),e._v(" "),n("div",{staticClass:"mu-item-after",class:e.afterTextClass},[e._t("after",[e._v("\n                "+e._s(e.afterText)+"\n              ")])],2)]):e._e(),e._v(" "),e.showDescribe?n("div",{staticClass:"mu-item-text",class:e.describeTextClass,style:e.textStyle},[e._t("describe",[e._v("\n            "+e._s(e.describeText)+"\n          ")])],2):e._e(),e._v(" "),e._t("default")],2),e._v(" "),e.showRight?n("div",{staticClass:"mu-item-right"},[e.toggleNested?n("icon-button",{on:{click:function(t){t.stopPropagation(),e.handleToggleNested(t)}},nativeOn:{mousedown:function(t){e.stop(t)},touchstart:function(t){e.stop(t)}}},[e.nestedOpen?n("svg",{staticClass:"mu-item-svg-icon",class:e.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 15L12 9L18 15"}})]):e._e(),e._v(" "),e.nestedOpen?e._e():n("svg",{staticClass:"mu-item-svg-icon",class:e.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M6 9L12 15L18 9"}})])]):e._e(),e._v(" "),e._t("right"),e._v(" "),e._t("rightAvatar")],2):e._e()])]),e._v(" "),n("expand-transition",[e.showNested?n("mu-list",{class:e.nestedListClass,attrs:{nestedLevel:e.nestedLevel,value:e.nestedSelectValue},on:{change:e.handleNestedChange}},[e._t("nested")],2):e._e()],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-focus-ripple-wrapper"},[n("div",{ref:"innerCircle",staticClass:"mu-focus-ripple",style:e.style})])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"right"},[e.toolbars.navigation?n("button",{directives:[{name:"show",rawName:"v-show",value:!e.s_navigation,expression:"!s_navigation"}],staticClass:"op-icon fa fa-mavon-bars",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_navigation_on+" (F8)"},on:{click:function(t){e.$clicks("navigation")}}}):e._e(),e._v(" "),e.toolbars.navigation?n("button",{directives:[{name:"show",rawName:"v-show",value:e.s_navigation,expression:"s_navigation"}],staticClass:"op-icon fa fa-mavon-bars selected",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_navigation_off+" (F8)"},on:{click:function(t){e.$clicks("navigation")}}}):e._e(),e._v(" "),e.toolbars.preview?n("button",{directives:[{name:"show",rawName:"v-show",value:e.s_preview_switch,expression:"s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye-slash selected",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_edit+" (F9)"},on:{click:function(t){e.$clicks("preview")}}}):e._e(),e._v(" "),e.toolbars.preview?n("button",{directives:[{name:"show",rawName:"v-show",value:!e.s_preview_switch,expression:"!s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_preview+" (F9)"},on:{click:function(t){e.$clicks("preview")}}}):e._e(),e._v(" "),e.toolbars.fullscreen?n("button",{directives:[{name:"show",rawName:"v-show",value:!e.s_fullScreen,expression:"!s_fullScreen"}],staticClass:"op-icon fa fa-mavon-arrows-alt",attrs:{type:"button",title:e.d_words.tl_fullscreen_on+" (F10)","aria-hidden":"true"},on:{click:function(t){e.$clicks("fullscreen")}}}):e._e(),e._v(" "),e.toolbars.fullscreen?n("button",{directives:[{name:"show",rawName:"v-show",value:e.s_fullScreen,expression:"s_fullScreen"}],staticClass:"op-icon fa fa-mavon-compress selected",attrs:{type:"button",title:e.d_words.tl_fullscreen_off+" (F10)","aria-hidden":"true"},on:{click:function(t){e.$clicks("fullscreen")}}}):e._e(),e._v(" "),e.toolbars.readmodel?n("button",{staticClass:"op-icon fa fa-mavon-window-maximize",attrs:{type:"button","aria-hidden":"true",title:e.d_words.tl_read+" (F11)"},on:{click:function(t){e.$clicks("read")}}}):e._e(),e._v(" "),e.toolbars.subfield?n("button",{staticClass:"op-icon fa fa-mavon-columns",class:{selected:e.s_subfield},attrs:{type:"button","aria-hidden":"true",title:(e.s_subfield?e.d_words.tl_single_column:e.d_words.tl_double_column)+" (F12)"},on:{click:function(t){e.$clicks("subfield")}}}):e._e(),e._v(" "),e.toolbars.help&&e.toolbars.htmlcode&&e.toolbars.readmodel&&e.toolbars.fullscreen&&e.toolbars.subfield&&e.toolbars.navigation?n("span",{staticClass:"op-icon-divider"}):e._e(),e._v(" "),e.toolbars.htmlcode?n("button",{directives:[{name:"show",rawName:"v-show",value:!e.s_html_code,expression:"!s_html_code"}],staticClass:"op-icon fa fa-mavon-code",attrs:{type:"button",title:e.d_words.tl_html_on,"aria-hidden":"true"},on:{click:function(t){e.$clicks("html")}}}):e._e(),e._v(" "),e.toolbars.htmlcode?n("button",{directives:[{name:"show",rawName:"v-show",value:e.s_html_code,expression:"s_html_code"}],staticClass:"op-icon fa fa-mavon-code selected",attrs:{type:"button",title:e.d_words.tl_html_off,"aria-hidden":"true"},on:{click:function(t){e.$clicks("html")}}}):e._e(),e._v(" "),e.toolbars.help?n("button",{staticClass:"op-icon fa fa-mavon-question-circle",staticStyle:{"font-size":"17px",padding:"5px 6px 5px 3px"},attrs:{type:"button",title:e.d_words.tl_help,"aria-hidden":"true"},on:{click:function(t){e.$clicks("help")}}}):e._e()])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-ripple"}},[n("div",{staticClass:"mu-circle-ripple",style:e.styles})])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-tooltip",class:{touched:e.touch,"when-shown":e.show},style:e.tooltipStyle},[n("div",{ref:"ripple",staticClass:"mu-tooltip-ripple",class:{"when-shown":e.show},style:e.rippleStyle}),e._v(" "),n("span",{staticClass:"mu-tooltip-label"},[e._v(e._s(e.label))])])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("transition",{attrs:{name:"mu-expand"},on:{"before-enter":e.beforeEnter,enter:e.enter,"after-enter":e.afterEnter,"before-leave":e.beforeLeave,leave:e.leave,"after-leave":e.afterLeave}},[e._t("default")],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"v-note-wrapper markdown-body",class:[{fullscreen:e.s_fullScreen},e.code_style]},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.toolbarsFlag,expression:"toolbarsFlag"}],staticClass:"v-note-op"},[n("s-md-toolbar-left",{ref:"toolbar_left",attrs:{editable:e.editable,d_words:e.d_words,toolbars:e.toolbars},on:{toolbar_left_click:e.toolbar_left_click,imgAdd:e.$imgAdd,imgDel:e.$imgDel,imgTouch:e.$imgTouch}}),e._v(" "),n("s-md-toolbar-right",{ref:"toolbar_right",attrs:{d_words:e.d_words,toolbars:e.toolbars,s_subfield:e.s_subfield,s_preview_switch:e.s_preview_switch,s_fullScreen:e.s_fullScreen,s_html_code:e.s_html_code,s_navigation:e.s_navigation},on:{toolbar_right_click:e.toolbar_right_click}})],1),e._v(" "),n("div",{staticClass:"v-note-panel"},[n("div",{ref:"vNoteEdit",staticClass:"v-note-edit divarea-wrapper",class:{"scroll-style":e.s_scrollStyle,"single-edit":!e.s_preview_switch&&!e.s_html_code,"single-show":!e.s_subfield&&e.s_preview_switch||!e.s_subfield&&e.s_html_code},on:{scroll:e.$v_edit_scroll,click:e.textAreaFocus}},[n("div",{staticClass:"content-input-wrapper"},[n("v-autoTextarea",{ref:"vNoteTextarea",staticClass:"content-input",attrs:{placeholder:e.placeholder?e.placeholder:e.d_words.start_editor,fontSize:"15px",lineHeight:"1.5"},model:{value:e.d_value,callback:function(t){e.d_value=t},expression:"d_value"}})],1)]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.s_preview_switch||e.s_html_code,expression:"s_preview_switch || s_html_code"}],staticClass:"v-note-show",class:{"single-show":!e.s_subfield&&e.s_preview_switch||!e.s_subfield&&e.s_html_code}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!e.s_html_code,expression:"!s_html_code"}],ref:"vShowContent",staticClass:"v-show-content",class:{"scroll-style":e.s_scrollStyle},domProps:{innerHTML:e._s(e.d_render)}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.s_html_code,expression:"s_html_code"}],staticClass:"v-show-content-html",class:{"scroll-style":e.s_scrollStyle}},[e._v("\n                "+e._s(e.d_render)+"\n            ")])]),e._v(" "),n("transition",{attrs:{name:"slideTop"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.s_navigation,expression:"s_navigation"}],staticClass:"v-note-navigation-wrapper"},[n("div",{staticClass:"v-note-navigation-title"},[e._v("\n                    "+e._s(e.d_words.navigation_title)),n("i",{staticClass:"fa fa-mavon-times v-note-navigation-close",attrs:{"aria-hidden":"true"},on:{click:function(t){e.toolbar_right_click("navigation")}}})]),e._v(" "),n("div",{ref:"navigationContent",staticClass:"v-note-navigation-content scroll-style"})])])],1),e._v(" "),n("transition",{attrs:{name:"fade"}},[n("div",{ref:"help"},[e.s_help?n("div",{staticClass:"v-note-help-wrapper",on:{click:function(t){e.toolbar_right_click("help")}}},[n("div",{staticClass:"v-note-help-content markdown-body code-hybrid",on:{click:function(e){e.stopPropagation(),e.preventDefault()}}},[n("i",{staticClass:"fa fa-mavon-times",attrs:{"aria-hidden":"true"},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.toolbar_right_click("help")}}}),e._v(" "),n("div",{staticClass:"scroll-style v-note-help-show",domProps:{innerHTML:e._s(e.d_help)}})])]):e._e()])]),e._v(" "),n("div",{ref:"vReadModel",staticClass:"v-note-read-model scroll-style",class:{show:e.s_readmodel}},[n("div",{staticClass:"v-note-read-content",domProps:{innerHTML:e._s(e.d_render)}})])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-icon-button",attrs:{to:e.to,tag:e.tag,activeClass:e.activeClass,event:e.event,exact:e.exact,append:e.append,replace:e.replace,type:e.type,href:e.href,target:e.target,disabled:e.disabled,keyboardFocused:e.keyboardFocused},on:{click:e.handleClick,hover:e.handleHover,hoverExit:e.handleHoverExit,keyboardFocus:e.handleKeyboardFocus}},[e._t("default",[n("icon",{class:e.iconClass,attrs:{value:e.icon}})]),e._v(" "),e.tooltip?n("tooltip",{attrs:{trigger:e.tooltipTrigger,verticalPosition:e.verticalPosition,horizontalPosition:e.horizontalPosition,show:e.tooltipShown,label:e.tooltip,touch:e.touch}}):e._e()],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auto-textarea-wrapper",style:{fontSize:e.fontSize,lineHeight:e.lineHeight}},[n("pre",{staticClass:"auto-textarea-block",style:{fontSize:e.fontSize,lineHeight:e.lineHeight}},[n("br"),e._v(e._s(e.temp_value)+" ")]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.temp_value,expression:"temp_value"}],staticClass:"auto-textarea-input",class:{"no-border":!e.border,"no-resize":!e.resize},style:{fontSize:e.fontSize,lineHeight:e.lineHeight},attrs:{autofocus:e.s_autofocus,spellcheck:"false",placeholder:e.placeholder},domProps:{value:e.temp_value},on:{keyup:e.change,input:function(t){t.target.composing||(e.temp_value=t.target.value)}}})])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,t,n){var r=n(145);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("55671483",r,!1)},function(e,t,n){var r=n(146);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("4a027f3a",r,!1)},function(e,t,n){var r=n(147);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("3ec62198",r,!1)},function(e,t,n){var r=n(148);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("c8785208",r,!1)},function(e,t,n){var r=n(149);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("053988c8",r,!1)},function(e,t,n){var r=n(150);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("5b6fbbe4",r,!1)},function(e,t,n){var r=n(151);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("77d0bc5c",r,!1)},function(e,t,n){var r=n(152);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("ddbd8bf8",r,!1)},function(e,t,n){var r=n(153);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("d38c0698",r,!1)},function(e,t,n){var r=n(154);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("53b1e29f",r,!1)},function(e,t,n){var r=n(155);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("49274680",r,!1)},function(e,t,n){var r=n(156);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("3f53c9c6",r,!1)},function(e,t,n){var r=n(157);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("64b428d0",r,!1)},function(e,t,n){var r=n(158);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("5283675d",r,!1)},function(e,t,n){var r=n(159);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(3)("64340416",r,!1)},function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],l=o[2],c=o[3],u={id:e+":"+i,css:s,media:l,sourceMap:c};r[a]?r[a].parts.push(u):n.push(r[a]={id:a,parts:[u]})}return n}},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){e.exports={start_editor:"开始编辑...",navigation_title:"导航目录",tl_bold:"粗体",tl_italic:"斜体",tl_header:"标题",tl_underline:"下划线",tl_strikethrough:"中划线",tl_mark:"标记",tl_superscript:"上角标",tl_subscript:"下角标",tl_quote:"段落引用",tl_ol:"有序列表",tl_ul:"无序列表",tl_link:"链接",tl_image:"图片",tl_code:"代码块",tl_table:"表格",tl_undo:"上一步",tl_redo:"下一步",tl_trash:"清空",tl_save:"保存",tl_navigation_on:"开启标题导航",tl_navigation_off:"关闭标题导航",tl_preview:"预览",tl_aligncenter:"居中",tl_alignleft:"居左",tl_alignright:"居右",tl_edit:"编辑",tl_single_column:"单栏",tl_double_column:"双栏",tl_fullscreen_on:"全屏编辑",tl_fullscreen_off:"退出全屏",tl_read:"沉浸式阅读",tl_html_on:"查看html文本",tl_html_off:"返回markdown文本",tl_help:"markdown语法帮助",tl_upload:"上传图片",tl_upload_remove:"删除"}},function(e,t){e.exports={start_editor:"Begin editing...",navigation_title:"Navigation",tl_bold:"Bold",tl_italic:"Italic",tl_header:"Header",tl_underline:"Underline",tl_strikethrough:"Strikethrough",tl_mark:"Mark",tl_superscript:"Superscript",tl_subscript:"Subscript",tl_quote:"Quote",tl_ol:"Ol",tl_ul:"Ul",tl_link:"Link",tl_image:"Image",tl_code:"Code",tl_table:"Table",tl_undo:"Undo",tl_redo:"Redo",tl_trash:"Trash",tl_save:"Save",tl_navigation_on:"Navigation ON",tl_navigation_off:"Navigation OFF",tl_preview:"Preview",tl_aligncenter:"Center text",tl_alignleft:"Clamp text to the left",tl_alignright:"Clamp text to the right",tl_edit:"Edit",tl_single_column:"Single Column",tl_double_column:"Double Columns",tl_fullscreen_on:"FullScreen ON",tl_fullscreen_off:"FullScreen OFF",tl_read:"Read Model",tl_html_on:"HTML ON",tl_html_off:"HTML OFF",tl_help:"Markdown Guide",tl_upload:"Upload Images",tl_upload_remove:"Remove"}},function(e,t){e.exports={start_editor:"Début d'édition...",navigation_title:"Navigation",tl_bold:"Gras",tl_italic:"Italique",tl_header:"Entête",tl_underline:"Souligné",tl_strikethrough:"Barré",tl_mark:"Mark",tl_superscript:"Exposant",tl_subscript:"Sous-exposant",tl_quote:"Quote",tl_ol:"Liste ",tl_ul:"Puce",tl_link:"Lien",tl_image:"Image",tl_code:"Code",tl_table:"Table",tl_undo:"Annuler",tl_redo:"Refaire",tl_trash:"Supprimer",tl_save:"Sauver",tl_navigation_on:"Activer la navigation",tl_navigation_off:"Désactiver le navigation",tl_preview:"Previsualisé",tl_aligncenter:"Center le texte",tl_alignleft:"Férer le texte à gauche",tl_alignright:"Férer le texte à droite",tl_edit:"Editer",tl_single_column:"Seule Colonne",tl_double_column:"Colonnes Doubles",tl_fullscreen_on:"Activer le mode plein écran",tl_fullscreen_off:"Désactiver le mode plein écran",tl_read:"Lire le modèle",tl_html_on:"Activer le mode HTML",tl_html_off:"Désactiver le mode HTML",tl_help:"Guide Markdown",tl_upload:"Télécharger les images",tl_upload_remove:"Supprimer"}},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE_303__}])});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mu-appbar', {
    attrs: {
      "title": "记录学习点滴"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('side-menu'), _vm._v(" "), _c('div', {
    staticClass: "contentBox"
  }, [_c('bread-crumb'), _vm._v(" "), _c('div', {
    staticClass: "contentBody"
  }, [_c('router-view')], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2f1f165c", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(36),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jiangbo/Documents/mini-blog/public/src/components/PostList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PostList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ef17b2aa", Component.options)
  } else {
    hotAPI.reload("data-v-ef17b2aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            activeTab: 'all'
        };
    },

    methods: {
        handleTabChange: function handleTabChange(val) {
            this.activeTab = val;
        }
    }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mu-tabs', {
    attrs: {
      "value": _vm.activeTab
    },
    on: {
      "change": _vm.handleTabChange
    }
  }, [_c('mu-tab', {
    attrs: {
      "value": "all",
      "title": "全部"
    }
  }), _vm._v(" "), _c('mu-tab', {
    attrs: {
      "value": "published",
      "title": "已发布"
    }
  }), _vm._v(" "), _c('mu-tab', {
    attrs: {
      "value": "pending",
      "title": "审核中"
    }
  }), _vm._v(" "), _c('mu-tab', {
    attrs: {
      "value": "rejected",
      "title": "未通过"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('mu-table', {
    attrs: {
      "showCheckbox": false,
      "fixedHeader": true
    }
  }, [_c('mu-thead', [_c('mu-tr', [_c('mu-th', [_vm._v("标题")]), _vm._v(" "), _c('mu-th', [_vm._v("作者")]), _vm._v(" "), _c('mu-th', [_vm._v("状态")]), _vm._v(" "), _c('mu-th', [_vm._v("发布日期")]), _vm._v(" "), _c('mu-th', [_vm._v("操作")])], 1)], 1), _vm._v(" "), _c('mu-tbody', [_c('mu-tr', [_c('mu-td', [_vm._v("1")]), _vm._v(" "), _c('mu-td', [_vm._v("John Smith")]), _vm._v(" "), _c('mu-td', [_vm._v("Employed")]), _vm._v(" "), _c('mu-td', [_vm._v("2017-08-18")]), _vm._v(" "), _c('mu-td', [_c('mu-flexbox', {
    attrs: {
      "gutter": 16
    }
  }, [_c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "删除",
      "secondary": "",
      "fullWidth": ""
    }
  })], 1), _vm._v(" "), _c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "编辑",
      "primary": "",
      "fullWidth": ""
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('mu-tr', [_c('mu-td', [_vm._v("1")]), _vm._v(" "), _c('mu-td', [_vm._v("John Smith")]), _vm._v(" "), _c('mu-td', [_vm._v("Employed")]), _vm._v(" "), _c('mu-td', [_vm._v("2017-08-18")]), _vm._v(" "), _c('mu-td', [_c('mu-flexbox', {
    attrs: {
      "gutter": 16
    }
  }, [_c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "删除",
      "secondary": "",
      "fullWidth": ""
    }
  })], 1), _vm._v(" "), _c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "编辑",
      "primary": "",
      "fullWidth": ""
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('mu-tr', [_c('mu-td', [_vm._v("1")]), _vm._v(" "), _c('mu-td', [_vm._v("John Smith")]), _vm._v(" "), _c('mu-td', [_vm._v("Employed")]), _vm._v(" "), _c('mu-td', [_vm._v("2017-08-18")]), _vm._v(" "), _c('mu-td', [_c('mu-flexbox', {
    attrs: {
      "gutter": 16
    }
  }, [_c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "删除",
      "secondary": "",
      "fullWidth": ""
    }
  })], 1), _vm._v(" "), _c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "编辑",
      "primary": "",
      "fullWidth": ""
    }
  })], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-ef17b2aa", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(39),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jiangbo/Documents/mini-blog/public/src/components/PostAdd.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PostAdd.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74e7e4b8", Component.options)
  } else {
    hotAPI.reload("data-v-74e7e4b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mavonEditor = __webpack_require__(17);

exports.default = {
    data: function data() {
        return {
            postData: {
                title: '',
                link: '',
                date: '',
                content: '',
                category: [],
                tag: [],
                isPublic: 'true'
            },
            categoryOptions: ["苹果", "西瓜", "芒果", "菠萝", "草莓"],
            tagOptions: ['111111', '222222', '333333', '444444', '555555']
        };
    },

    components: {
        mavonEditor: _mavonEditor.mavonEditor
    },
    methods: {
        showPost: function showPost() {
            console.log(this.postData);
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mu-flexbox', {
    attrs: {
      "gutter": 16,
      "align": "flex-start"
    }
  }, [_c('mu-flexbox-item', {
    attrs: {
      "grow": "8"
    }
  }, [_c('mavon-editor', {
    model: {
      value: (_vm.postData.content),
      callback: function($$v) {
        _vm.postData.content = $$v
      },
      expression: "postData.content"
    }
  })], 1), _vm._v(" "), _c('mu-flexbox-item', {
    attrs: {
      "grow": "3"
    }
  }, [_c('mu-flexbox', {
    staticStyle: {
      "margin-bottom": "20px"
    },
    attrs: {
      "gutter": 16
    }
  }, [_c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "保存草稿",
      "fullWidth": ""
    },
    on: {
      "click": _vm.showPost
    }
  })], 1), _vm._v(" "), _c('mu-flexbox-item', [_c('mu-raised-button', {
    attrs: {
      "label": "发布文章",
      "fullWidth": "",
      "primary": ""
    }
  })], 1)], 1), _vm._v(" "), _c('mu-text-field', {
    attrs: {
      "hintText": "文章标题",
      "fullWidth": ""
    },
    model: {
      value: (_vm.postData.title),
      callback: function($$v) {
        _vm.postData.title = $$v
      },
      expression: "postData.title"
    }
  }), _vm._v(" "), _c('mu-text-field', {
    attrs: {
      "hintText": "文章链接",
      "fullWidth": ""
    },
    model: {
      value: (_vm.postData.link),
      callback: function($$v) {
        _vm.postData.link = $$v
      },
      expression: "postData.link"
    }
  }), _vm._v(" "), _c('mu-date-picker', {
    attrs: {
      "container": "inline",
      "mode": "landscape",
      "hintText": "发布日期",
      "fullWidth": ""
    },
    model: {
      value: (_vm.postData.date),
      callback: function($$v) {
        _vm.postData.date = $$v
      },
      expression: "postData.date"
    }
  }), _vm._v(" "), _c('div', [_c('p', {
    staticClass: "labelTitle"
  }, [_vm._v("分类")]), _vm._v(" "), _vm._l((_vm.categoryOptions), function(option, index) {
    return _c('mu-checkbox', {
      key: index,
      staticStyle: {
        "margin-right": "20px"
      },
      attrs: {
        "name": "category",
        "nativeValue": option,
        "label": option
      },
      model: {
        value: (_vm.postData.category),
        callback: function($$v) {
          _vm.postData.category = $$v
        },
        expression: "postData.category"
      }
    })
  })], 2), _vm._v(" "), _c('div', [_c('p', {
    staticClass: "labelTitle",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_vm._v("标签")]), _vm._v(" "), _vm._l((_vm.tagOptions), function(option, index) {
    return _c('mu-checkbox', {
      key: index,
      staticStyle: {
        "margin-right": "20px"
      },
      attrs: {
        "name": "tag",
        "nativeValue": option,
        "label": option
      },
      model: {
        value: (_vm.postData.tag),
        callback: function($$v) {
          _vm.postData.tag = $$v
        },
        expression: "postData.tag"
      }
    })
  })], 2), _vm._v(" "), _c('div', [_c('p', {
    staticClass: "labelTitle",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_vm._v("是否公开")]), _vm._v(" "), _c('mu-radio', {
    staticStyle: {
      "margin-right": "20px"
    },
    attrs: {
      "label": "是",
      "name": "isPublic",
      "nativeValue": "true"
    },
    model: {
      value: (_vm.postData.isPublic),
      callback: function($$v) {
        _vm.postData.isPublic = $$v
      },
      expression: "postData.isPublic"
    }
  }), _vm._v(" "), _c('mu-radio', {
    attrs: {
      "label": "否",
      "name": "isPublic",
      "nativeValue": "false"
    },
    model: {
      value: (_vm.postData.isPublic),
      callback: function($$v) {
        _vm.postData.isPublic = $$v
      },
      expression: "postData.isPublic"
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-74e7e4b8", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(42),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jiangbo/Documents/mini-blog/public/src/components/SideMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SideMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a4aa3eba", Component.options)
  } else {
    hotAPI.reload("data-v-a4aa3eba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            activeList: 'post-list'
        };
    },

    methods: {
        handleListChange: function handleListChange(val) {
            this.activeList = val;
        }
    }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menuBox"
  }, [_c('mu-list', {
    attrs: {
      "value": _vm.activeList
    },
    on: {
      "change": _vm.handleListChange
    }
  }, [_c('mu-list-item', {
    attrs: {
      "title": "文章管理",
      "toggleNested": "",
      "value": "post"
    }
  }, [_c('mu-list-item', {
    attrs: {
      "title": "文章列表",
      "value": "post-list",
      "to": "/post/list"
    },
    slot: "nested"
  }), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "添加文章",
      "value": "post-add",
      "to": "/post/add"
    },
    slot: "nested"
  })], 1), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "分类管理",
      "toggleNested": "",
      "value": "category"
    }
  }, [_c('mu-list-item', {
    attrs: {
      "title": "分类列表",
      "value": "category-list"
    },
    slot: "nested"
  }), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "添加分类",
      "value": "category-add"
    },
    slot: "nested"
  })], 1), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "标签管理",
      "toggleNested": "",
      "value": "tag"
    }
  }, [_c('mu-list-item', {
    attrs: {
      "title": "标签列表",
      "value": "tag-list"
    },
    slot: "nested"
  }), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "添加标签",
      "value": "tag-add"
    },
    slot: "nested"
  })], 1), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "用户管理",
      "toggleNested": "",
      "value": "user"
    }
  }, [_c('mu-list-item', {
    attrs: {
      "title": "用户列表",
      "value": "user-list"
    },
    slot: "nested"
  }), _vm._v(" "), _c('mu-list-item', {
    attrs: {
      "title": "添加用户",
      "value": "user-add"
    },
    slot: "nested"
  })], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a4aa3eba", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(45),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jiangbo/Documents/mini-blog/public/src/components/BreadCrumb.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BreadCrumb.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50c39570", Component.options)
  } else {
    hotAPI.reload("data-v-50c39570", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "breadcrumb"
  }, [_c('mu-breadcrumb', [_c('mu-breadcrumb-item', {
    attrs: {
      "href": "/"
    }
  }, [_vm._v("Home")]), _vm._v(" "), _c('mu-breadcrumb-item', {
    attrs: {
      "href": "/"
    }
  }, [_vm._v("VideoGame")]), _vm._v(" "), _c('mu-breadcrumb-item', [_vm._v("Download")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-50c39570", module.exports)
  }
}

/***/ })
],[4]);