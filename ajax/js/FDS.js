/*! FDS/core.js @ 2017, yamoo9.net */

// 함수형 프로그래밍 -> 객체형 프로그래밍 (생성자 함수, 프로토타입 객체를 활용한 생성 패턴)

// 캡슐화 <- 모듈(IIFE) 패턴
// 객체 생성 <- 클래스(생성자 함수) 정의
// 객체 능력 확장 <- 프로토타입 확장

// 호환성 여부: IE 9+, ES 5+
var FDS = (function(global){
  'use strict';

  // 감춰진 데이터 또는 지역 내 변수, 함수
  var document = global.document;
  var toString = Object.prototype.toString;
  var forEach  = Array.prototype.forEach;
  var slice    = Array.prototype.slice;
  // 별칭과 충돌되는 기능을 백업
  var original_$;

  // 자주 사용되는 유틸리티 함수
  function type(data) {
    return toString.call(data).slice(8,-1).toLowerCase();
  }
  function isType(data, kind) {
    validateError(kind, '!string', '2번째 전달인자는 문자열이어야 합니다');
    return type(data) === kind;
  }
  function validateError(data, kind, error_message) {
    data = type(data);
    if ( kind.indexOf('!') === 0 ) {
      if ( data !== kind.slice(1) ) { throw error_message || '두 값이 다르기에 오류입니다.'; }
    } else {
      if ( data === kind ) { throw error_message || '두 값은 동일하기에 오류입니다.'; }
    }
    return '오류는 발생하지 않았습니다';
  }
  function isElementNode(o) {
    return o && o.nodeType === 1;
  }
  function isNodelist(collection) {
    var condition = collection && (type(collection) === 'htmlcollection') || (type(collection) === 'nodelist');
    return condition;
  }
  function isNumber(data) {
    return isType(data, 'number') && !Number.isNaN(data);
  }
  function isString(data) {
    return isType(data, 'string');
  }
  function isBoolean(data) {
    return isType(data, 'boolean');
  }
  function isFunction(data) {
    return isType(data, 'function');
  }
  function isArray(data) {
    return isType(data, 'array');
  }
  function isObject(data) {
    return isType(data, 'object');
  }
  function makeArray(o) {
    return slice.call(o);
  }
  var mixin = function() {
    var args = makeArray(arguments);
    for (var i=0, l=args.length; i<l; i++) {
      if ( !isType(args[i], 'object') && !isType(args[i], 'function') ) {
        throw '전달인자로 객체만 허용합니다.';
      }
    }
    var mixin_obj = args.shift();
    var next = args.shift();
    do {
      for ( var prop in next ) {
        if ( next.hasOwnProperty(prop) ) {
          mixin_obj[prop] = next[prop];
        }
      }
      next = args.shift();
    } while ( next );

    return mixin_obj;
  };
  var forEachFn = function() {
    if ( forEach ) {
      return function(o, callback) {
        o.forEach(callback);
      }
    } else {
      return function(o, callback) {
        for ( var i=0, l=o.length; i<l; ++i ) {
          callback(o[i], i, o);
        }
      }
    }
  }();
  function each(o, callback) {
    validateError(callback, '!function');
    if ( !isObject(o) && o.length ) { o = makeArray(o); }
    isArray(o) && forEachFn(o, callback);
    if ( isObject(o) ) {
      for ( var prop in o ) {
        o.hasOwnProperty(prop) && callback(prop, o[prop], o);
      }
    }
    if ( o.nodeType === 1 ) {
      for ( var prop in o ) {
        callback(prop, o[prop], o);
      }
    }
  }
  function deleteIndexing(o) {
    for ( var i=0, l=o.length; i<l; i++ ) {
      delete o[i];
    }
  }
  function assignIndesing(o, filtered) {
    if ( filtered.length ) {
      for ( var i=0, l=filtered.length; i<l; i++ ) {
        o[i] = filtered[i];
      }
      o.length = l;
    }
  }
  function noConflict(giveup) {
    if ( original_$ ) {
      global.$ = original_$;
    } else {
      delete global.$;
    }
    if ( giveup ) { global.FDS = null; }
    return FDS;
  }

  // --------------------------------------------
  // 생성자 함수(클래스) 정의
  // 팩토리 패턴 활용
  function FDS(arg) {
    // new를 강제화하지 않는 패턴 활용
    if ( !(this instanceof FDS) ) {
      return new FDS(arg);
    }
    // 1.1 사용자가 아무런 값도 전달하지 않았을 경우
    // 1.2 빈 문자열을 전달한 경우
    if ( !arg || (isString(arg) && arg.trim() === '') ) {
      this.length = 0;
      return this;
    }

    // 2. 요소노드
    if ( isElementNode(arg) ) {
      this[0] = arg;
      this.length = 1;
      return this;
    }

    // 3. HTML 코드(문자열)
    // http://www.regextester.com/27540
    var match_html_tags = /<\s*\w+[^>]*>(.*?)<\s*\/\s*\w+>/, temp;
    if ( isString(arg) && match_html_tags.test(arg) ) {
      temp = document.createDocumentFragment();
      temp.appendChild( document.createElement('div') );
      temp.firstChild.innerHTML = arg;
      for ( var i=0, l=temp.firstChild.children.length; i<l; i++ ) {
        this[i] = temp.firstChild.children[i];
      }
      this.length = l;
      temp = null;
      return this;
    }

    // 4.1 노드리스트, HTML콜렉션, 배열
    var nodes;
    if ( isArray(arg) || isNodelist(arg) ) { nodes = arg; }
    // 4.2 CSS 선택자(문자열)
    else { nodes = document.querySelectorAll(arg); }
    for ( var i=0, l=nodes.length; i<l; ++i ) {
      this[i] = nodes[i];
    }
    this.length = l;
    return this;
  }

  // --------------------------------------------
  // 생성자 함수의 메서드(클래스 메서드, 스태틱 메서드)
  FDS.include = function(o){
    mixin(FDS, o);
  };
  FDS.include({
    version    : '0.0.1',
    type       : type,
    isNumber   : isNumber,
    isString   : isString,
    isBoolean  : isBoolean,
    isFunction : isFunction,
    isArray    : isArray,
    isObject   : isObject,
    makeArray  : makeArray,
    each       : each,
    noConflict : noConflict,
    mixin      : mixin
  });

  // --------------------------------------------
  // 프로토타입 객체 정의 (생성된 모든 객체가 공유하는 멤버)
  FDS.fn = FDS.prototype = {
    constructor: FDS,
    filter: function(callback) {
      var filtered = [];
      for ( var i=0, l=this.length; i<l; i++ ) {
        var item = this[i];
        if ( callback.call(this, item, i) ) {
          filtered.push(item);
        }
      }
      deleteIndexing(this);
      assignIndesing(this, filtered);
      return this;
    },
    eq: function(i) {
      return this.filter(function(item, index){
        return index === i;
      });
    },
    lt: function(i) {
      return this.filter(function(item, index){
        return index < i;
      });
    },
    gt: function(i) {
      return this.filter(function(item, index){
        return index > i;
      });
    },
    addClass: function(name) {
      for ( var i=0, l=this.length; i<l; i++ ) {
        var item = this[i];
        item.classList.add(name);
      }
    },
    on: function(type, handler) {
      for ( var i=0, l=this.length; i<l; i++ ) {
        var item = this[i];
        item.addEventListener(type, handler);
      }
    }
  };

  FDS.fn.extend = function(o){
    validateError(o, '!object', '객체만 전달할 수 있습니다.');
    mixin(FDS.fn, o);
  };

  // --------------------------------------------
  // 전역에 공개된 별칭(Alias) 설정 여부
  if ( global.$ ) { original_$ = global.$; }
  global.$ = FDS;
  // 생성자 함수 반환(외부 공개)
  return FDS;

})(window);