/*! FDS/ajax.js @ 2017, yamoo9.net */
;(function(global){
  'use strict';

  // FDS 객체 의존성 체크
  if ( !global.FDS ) {
    throw 'FDS/core 파일을 먼저 로드해야 합니다.';
  } else {
    var $ = global.FDS;
  }

  // 비공개
  var xhr = null;
  var JSON = global.JSON;
  var config = {};
  var defaults = {
    url: '',
    method: 'GET',
    async: true,
    params: null,
    success: function() {},
    fail: function() {},
    loading: `<i class="fa fa-spinner fa-pulse fa-3x fa-fw"><i>\
            <span class="sr-only">Loading...</span>`
  };

  // 생성자 함수(팩터리 패턴 사용)
  var ajax = global.FDS.ajax = function(options, success, fail) {
    // new를 강제화 하지 않는 패턴
    if ( !(this instanceof ajax) ) { return new ajax(options, success, fail); }
    // options가 전달되지 않은 경우
    if ( !options ) { $.mixin(config, defaults, {}); }
    // options 전달인자가 문자열인 경우
    if ( typeof options === 'string' ) { $.mixin(config, defaults, {url: options}); }
    // options 전달인자가 객체일 경우
    if ( typeof options === 'object' && !Array.isArray(options) ) { $.mixin(config, defaults, options) };
    // success, fail 전달인자 덮어쓰기
    if (typeof success === 'function') { config.success = success; }
    if (typeof fail === 'function') { config.fail = fail; }
    // 객체 초기화
    this.init(config);
  };

  // 프로토타입
  ajax.prototype = {
    constructor: ajax,
    init: function(config, success, fail) {
      var o = this;
      xhr = new global.XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if ( this.status === 200 && this.readyState === 4 ) {
          config.success.call(o, xhr.response, xhr);
        } else if(this.status > 400){
          config.fail.call(o, xhr.status, xhr);
        } else {
          // Loading parts
          document.querySelector('.data-zone').innerHTML = defaults.loading;
        }
      };
      xhr.open(config.method, config.url, config.async);
      switch (config.method.toUpperCase()) {
        case 'GET': this.get(xhr); break;
        case 'POST': this.post(xhr, config.params); break;
      }
      return this;
    },
    get: function(xhr) {
      xhr.send(null);
      return this;
    },
    post: function(xhr, params) {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      params = ajax.param(params);
      xhr.send(params);
      return this;
    }
  };

  // FDS 유틸리티 확장
  $.include({
    param : function(o) {
      var encode_string = '';
      $.each(o, function(key, value){
        if ( encode_string.length > 0 ) { encode_string += '&'; }
        else { encode_string += global.encodeURI(key + '=' + value); }
      });
      return encode_string;
    },
    parse : function(str) {
      return JSON.parse(str);
    },
    stringify : function(o) {
      return JSON.stringify(o);
    },
    get : function(url, success, fail) {
      return ajax(url, success, fail);
    },
    post : function(url, params, success, fail) {
      var options = {
        method: 'POST',
        url: url,
        params: params || {}
      };
      return ajax(options, success, fail);
    }
  });

})(window);