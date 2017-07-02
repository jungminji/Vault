var FDS = (function(global){
  'use strict';

  var document = global.document;

  function type(data) {
    return toString.call(data).slice(8,-1).toLowerCase();
  }


  function FDS(arg) {
    // new를 강제화하지 않는 패턴 활용
    if ( !(this instanceof FDS) ) {
      return new FDS(arg);
    }
  }

  // Statics
  FDS.include = function(){};

  // --------------------------------------------
  // 프로토타입 객체 정의 (생성된 모든 객체가 공유하는 멤버)
  FDS.fn = FDS.prototype = {
    constructor: FDS,
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
