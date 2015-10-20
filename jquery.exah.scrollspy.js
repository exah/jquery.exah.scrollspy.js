(function (factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
  function ScrollSpy(el, options) {
  		this.$el = $(el);
  		this.options = $.extend({}, ScrollSpy.DEFAULTS, options);

  		this.$scrollEl = $(this.options.scrollEl);
  		this.$links = this.$el.find(this.options.selector);

  		this.targets = [];

  		this.refresh();
  		this.$scrollEl.on('scroll', $.proxy(this._onScroll, this))
  	}

  	ScrollSpy.DEFAULTS = {
  		'selector': 'a[href^="#"]',
  		'scrollEl': window,
  		'offset': 0,
  		'activeClass': 'current'
  	}

  	ScrollSpy.prototype.refresh = function() {
  		var self = this;

  		self.$links.each(function(i){
  			var $t = $(this.hash);

  			if ($t.length > 0) {
  				self.targets[self.targets.length] = {
  					'$el': 		$t,
  					'hash': 		this.hash,
  					'offset': 	$t.offset().top,
  					'height':	$t.outerHeight(true)
  				}
  			}
  		});
  	}

  	ScrollSpy.prototype._onScroll = function(e){
  		var scrollTop = this.$scrollEl.scrollTop() + this.options.offset;

  		for (var i = 0; i < this.targets.length; i++) {
  			var target = this.targets[i];

  			if (scrollTop > target.offset && scrollTop < target.offset + target.height) {
  				this.$links.removeClass(this.options.activeClass);
  				this.$links.filter("[href='"+target.hash+"']").addClass(this.options.activeClass);
  			}
  		}
  	}

  	function Plugin(option) {
  		return this.each(function () {
  			var $this   = $(this)
  			var data    = $this.data('exah.scrollspy')
  			var options = typeof option == 'object' && option

  			if (!data) $this.data('exah.scrollspy', (data = new ScrollSpy(this, options)))
  			if (typeof option == 'string') data[option]()
  		})
  	}

  	$.fn.scrollspy             = Plugin;
  	$.fn.scrollspy.Constructor = ScrollSpy;
}));
