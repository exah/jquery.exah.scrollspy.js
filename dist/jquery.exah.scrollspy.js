'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSpy = exports.SCROLLSPY_DEFAULTS = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCROLLSPY_DEFAULTS = exports.SCROLLSPY_DEFAULTS = {
  selector: 'a[href^="#"]',
  scrollEl: window,
  offset: 0,
  activeClass: 'current'
};

var ScrollSpy = exports.ScrollSpy = (function () {
  function ScrollSpy(el, options) {
    _classCallCheck(this, ScrollSpy);

    this.$el = (0, _jquery2.default)(el);
    this.options = _jquery2.default.extend({}, SCROLLSPY_DEFAULTS, options);
    this.$scrollEl = (0, _jquery2.default)(this.options.scrollEl);
    this.$links = this.$el.find(this.options.selector);
    this.targets = [];

    this.refresh();
    this.$scrollEl.on('scroll', _jquery2.default.proxy(this._onScroll, this));
  }

  _createClass(ScrollSpy, [{
    key: 'refresh',
    value: function refresh() {
      var _this = this;

      this.$links.each(function (i, el) {
        var $t = (0, _jquery2.default)(el.hash);

        if ($t.length > 0) {
          _this.targets[_this.targets.length] = {
            $el: $t,
            hash: el.hash,
            offset: $t.offset().top,
            height: $t.outerHeight(true)
          };
        }
      });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll() {
      var scrollTop = this.$scrollEl.scrollTop() + this.options.offset;

      for (var i = 0; i < this.targets.length; i++) {
        var target = this.targets[i];

        if (scrollTop > target.offset && scrollTop < target.offset + target.height) {
          this.$links.removeClass(this.options.activeClass);
          this.$links.filter("[href='" + target.hash + "']").addClass(this.options.activeClass);
        }
      }
    }
  }]);

  return ScrollSpy;
})();

exports.default = (function () {
  function Plugin(option) {
    return this.each(function () {
      var $this = (0, _jquery2.default)(this);
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;
      var data = $this.data('exah.scrollspy');

      if (!data) $this.data('exah.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  _jquery2.default.fn.scrollspy = Plugin;
  _jquery2.default.fn.scrollspy.Constructor = ScrollSpy;
})();

