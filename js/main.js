(function($) {
    var Preloader = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.preloader.options, options),
			self.preloader = $("div.main_loader"), 
			self.svg = self.preloader.find("svg"),
			self.assets = [], 
			self.count = 1,
			self.add()
        },
        add: function() {
            var self = this,
                i = 0,
                length = self.options.js.length;
				
            for ((function() {
				
            }), i; length > i; ++i) self.assets.push(self.options.js[i]);
            self.query()
        },
        query: function() {
            var self = this;
            setTimeout(self.recursive, 10, self, self.count - 1)
        },
        recursive: function(context, index) {
            var self = context;
            $.ajax(self.assets[index], {
                method: "GET",
                success: function() {
                    var p = Math.round(index / (self.assets.length - 1) * 100);
                    self.middle = p, self.percent = p, self.count++, self.count == self.assets.length + 1 ? self.this : self.query()
                }
            })
        }
    };
    $.fn.preloader = function(options) {
        return this.each(function() {
            var preloader = Object.create(Preloader);
            preloader.init(options, this), $.data(this, "preloader", preloader)
        })
    }, $.fn.preloader.options = {
        js: []
    }
})(jQuery)
$(function($) {
    $("html").preloader({
        js: ["js/TweenMax.min.js", "js/app.js"]
    })
});