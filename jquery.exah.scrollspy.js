import $ from 'jquery';

export const SCROLLSPY_DEFAULTS = {
  selector    : 'a[href^="#"]',
  scrollEl    : window,
  offset      : 0,
  activeClass : 'current'
}

export class ScrollSpy {
  constructor(el, options) {
    this.$el        = $(el);
    this.options    = $.extend({}, SCROLLSPY_DEFAULTS, options);
    this.$scrollEl  = $(this.options.scrollEl);
    this.$links     = this.$el.find(this.options.selector);
    this.targets    = [];

    this.refresh();
    this.$scrollEl.on('scroll', $.proxy(this._onScroll, this))
  }

  refresh() {
    this.$links.each((i, el) => {
      const $t = $(el.hash);

      if ($t.length > 0) {
        this.targets[this.targets.length] = {
          $el   : $t,
          hash  : el.hash,
          offset: $t.offset().top,
          height: $t.outerHeight(true)
        }
      }
    });
  }

  _onScroll() {
    const scrollTop = this.$scrollEl.scrollTop() + this.options.offset;

    for (let i = 0; i < this.targets.length; i++) {
      const target = this.targets[i];

      if (scrollTop > target.offset && scrollTop < target.offset + target.height) {
        this.$links.removeClass(this.options.activeClass);
        this.$links.filter("[href='"+target.hash+"']").addClass(this.options.activeClass);
      }
    }
  }
}

export default (() => {
  function Plugin(option) {
    return this.each(function () {
      const $this   = $(this);
      const options = typeof option == 'object' && option;
      let   data    = $this.data('exah.scrollspy');

      if (!data) $this.data('exah.scrollspy', (data = new ScrollSpy(this, options)));
      if (typeof option == 'string') data[option]();
    })
  }

  $.fn.scrollspy             = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;
})();
