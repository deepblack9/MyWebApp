var app = new Vue({
	el: '#container'
});
var head = new Vue({
  el: '#head',
  data: {
    height: 60
  }
});

var main = new Vue({
  el: '#main',
  data: {
    height: 0
  }
});

var sidebar_template = '<div class="sidebar-nav">\
	        <ul class="metismenu" id="menu">\
	          <li class="active">\
	            <a href="#" aria-expanded="true">\
	              <span class="sidebar-nav-item-icon fa fa-github fa-lg"></span>\
	              <span class="sidebar-nav-item">metisMenu</span>\
	              <span class="fa arrow"></span>\
	            </a>\
	            <ul aria-expanded="true">\
	              <li>\
	                <a href="https://github.com/onokumus/metisMenu">\
	                  <span class="sidebar-nav-item-icon fa fa-code-fork"></span>\
	                  Fork\
	                </a>\
	              </li>\
	              <li>\
	                <a href="https://github.com/onokumus/metisMenu">\
	                  <span class="sidebar-nav-item-icon fa fa-star"></span>\
	                  Star\
	                </a>\
	              </li>\
	              <li>\
	                <a href="https://github.com/onokumus/metisMenu/issues">\
	                  <span class="sidebar-nav-item-icon fa fa-exclamation-triangle"></span>\
	                  Issues\
	                </a>\
	              </li>\
	            </ul>\
	          </li>\
	          <li>\
	            <a href="#" aria-expanded="false">Menu 0 <span class="fa arrow"></span></a>\
	            <ul aria-expanded="false">\
	              <li><a href="#">item 0.1</a></li>\
	              <li><a href="#">item 0.2</a></li>\
	              <li><a href="http://onokumus.com">onokumus</a></li>\
	              <li><a href="#">item 0.4</a></li>\
	            </ul>\
	          </li>\
	          <li>\
	            <a href="#" aria-expanded="false">Menu 1 <span class="glyphicon arrow"></span></a>\
	            <ul aria-expanded="false">\
	              <li><a href="#">item 1.1</a></li>\
	              <li><a href="#">item 1.2</a></li>\
	              <li>\
	                <a href="#" aria-expanded="false">Menu 1.3 <span class="fa plus-times"></span></a>\
	                <ul aria-expanded="false">\
	                  <li><a href="#">item 1.3.1</a></li>\
	                  <li><a href="#">item 1.3.2</a></li>\
	                  <li><a href="#">item 1.3.3</a></li>\
	                  <li><a href="#">item 1.3.4</a></li>\
	                </ul>\
	              </li>\
	              <li><a href="#">item 1.4</a></li>\
	              <li>\
	                <a href="#" aria-expanded="false">Menu 1.5 <span class="fa plus-minus"></span></a>\
	                <ul aria-expanded="false">\
	                  <li><a href="#">item 1.5.1</a></li>\
	                  <li><a href="#">item 1.5.2</a></li>\
	                  <li><a href="#">item 1.5.3</a></li>\
	                  <li><a href="#">item 1.5.4</a></li>\
	                </ul>\
	              </li>\
	            </ul>\
	          </li>\
	          <li>\
	            <a href="#" aria-expanded="false">Menu 2 <span class="glyphicon arrow"></span></a>\
	            <ul aria-expanded="false">\
	              <li><a href="#">item 2.1</a></li>\
	              <li><a href="#">item 2.2</a></li>\
	              <li><a href="#">item 2.3</a></li>\
	              <li><a href="#">item 2.4</a></li>\
	            </ul>\
	          </li>\
	        </ul>\
	      </div>';

var sidebar = new Vue({
  el: '#sidebar',
  data: {
    height: 30
  },
  components: {
    'sidebar': {
      template: sidebar_template
    }
  }
})

var foot = new Vue({
  el: '#foot',
  data: {
    height: 30
  }
});

$("#menu").metisMenu();

window.onload = function(){
  head.height = 60;
  main.height = window.innerHeight-head.height-foot.height;
  sidebar.height = main.height;
}
window.onresize = function(){
  main.height = window.innerHeight-head.height-foot.height;
  sidebar.height = main.height;
}