/*! ui/tab.js @ 2017, yamoo9.net */
(function(global){
  'use strict';

  // Toggle Guide
  document.onkeyup = function(e) {
    if ( e.keyCode === 71 && e.shiftKey ) {
      document.body.classList.toggle('guide');
    }
  };

})(window);

;(function(global){
  'use strict';

  // 지역 내 참조 변수 선언
  var document = global.document;
  var forEach = Array.prototype.forEach;
  var comp, tabs, panels;

  // 초기화 함수
  function init() {
    // 컨트롤 수행할 요소를 참조
    comp = document.querySelector('.tab-component');
    tabs = comp.querySelectorAll('.tab');
    panels = comp.querySelectorAll('.tabpanel');
    bindEvents();
  }
  // 이벤트 연결 함수
  function bindEvents() {
    forEach.call(tabs, function(tab, index){
      tab.onclick = changeTabpanel.bind(tab, index);
    });
  }
  // 이벤트 핸들러(함수)
  function changeTabpanel(index, e) {
    // 이벤트 기본 동작 차단
    e.preventDefault();

    var parent = this.parentNode;
    // 자신의 부모의 부모(ul)의 자식들(children) 중에 활성화 클래스를 가진(.active) 자식을 찾아서 제거
    var tablist = parent.parentNode;
    var pre_active_item = tablist.querySelector('.active');
    pre_active_item.classList.remove('active');
    // 자신(this)의 부모(li)에 활성화 클래스(active) 설정
    parent.classList.add('active');

    // 탭 패널 중에 활성화된(.active) 패널에 활성화 클래스 제거
    var active_panel = panels[index];
    var pre_active_panel = active_panel.parentNode.querySelector('.tabpanel.active');
    pre_active_panel.classList.remove('active');
    // 인덱스(순서)에 해당하는 패널 활성화 클래스 추가
    active_panel.classList.add('active');
  }

  // 초기화
  init();

})(window);