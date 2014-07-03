var production = !0,
    local = production ? "/" : "/Dropbox/nz/";
"function" != typeof Object.create && (Object.create = function(obj) {
    function F() {}
    return F.prototype = obj, new F
}), location.origin || (location.origin = location.protocol + "//" + location.host),
function($, window) {
    var oldXHR = $.ajaxSettings.xhr;
    $.ajaxSettings.xhr = function() {
        var xhr = oldXHR();
        return xhr instanceof window.XMLHttpRequest && (xhr.addEventListener ? xhr.addEventListener("progress", this.progress, !1) : xhr.attachEvent && xhr.attachEvent("onprogress", this.progress)), xhr.upload && (xhr.upload.addEventListener ? xhr.upload.addEventListener("progress", this.progress, !1) : xhr.attachEvent && xhr.upload.attachEvent("onprogress", this.progress)), xhr
    }
}(jQuery, window),
function($) {
    var Parse = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.parse.options, options), self.elem = $(elem), self.origin = location.origin + local, self.dir = self.origin + "bin/images/projets/", self.transform()
        },
        transform: function() {
            var self = this,
                source = self.elem.attr("src").replace(self.dir, "").replace(".jpg", ".jpg");
            self.transformed = source, self.elem.attr("src", self.transformed), "function" == typeof self.options.callback && self.options.callback.call(self)
        }
    };
    $.fn.parse = function(options) {
        return this.each(function() {
            var parse = Object.create(Parse);
            parse.init(options, this), $.data(this, "parse", parse)
        })
    }, $.fn.parse.options = {
        callback: function() {}
    }
}(jQuery),
function($) {
    var Preloader = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.preloader.options, options),
			self.elem = $(elem).addClass("js"), 
			self.body = $("body"), 
			self.color = $("div.container").children("div").data("color"),
			self.preloader = $("div.preloader"), 
			self.container = self.preloader.find("div.con-loader"),
			self.txt = self.preloader.find("div.text-loader").css("color", self.color), 
			self.svg = self.preloader.find("svg"),
			self.svg.find("path").attr("fill", self.color), 
			self.deferred = new jQuery.Deferred, 
			self.images = $("img"),
			self.assets = [], 
			self.count = 1, 
			self.middle = 0, 
			self.percent = 0, 
			self.bindEvents()
        },
        bindEvents: function() {
            var self = this;
            self.deferred.done($.proxy(self.done, self)), self.add()
        },
        add: function() {
            var self = this,
                i = 0,
                length = self.options.js.length;
            for (self.images.each(function() {
                var $this = $(this);
                $this.parse({
                    callback: function() {
                        var src = $this.attr("src").replace(location.origin + local, "");
                        self.assets.push(src)
                    }
                })
            }), i; length > i; ++i) self.assets.push(location.origin + local + self.options.js[i]);
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
                progress: function(e) {
                    var progress = e.lengthComputable ? e.loaded / e.total : 0,
                        p = Math.floor(self.middle + 100 * progress / (self.assets.length - 1));
                    self.percent = p, self.draw(self.percent)
                },
                success: function() {
                    var p = Math.round(index / (self.assets.length - 1) * 100);
                    self.middle = p, self.percent = p, self.draw(self.percent), self.count++, self.count == self.assets.length + 1 ? self.deferred.resolve() : self.query()
                },
                error: function() {
                    self.query()
                }
            })
        },
        draw: function(percent) {
            var self = this,
                viewport = $(window),
                x = viewport.width() / 2,
                y = viewport.height() / 2,
                h = 1,
                w = 280,
                p = w * (percent / 100),
                d = "M " + (x - w / 2) + " " + (y - h) + " L " + (x - w / 2 + p) + " " + (y - h) + " L " + (x - w / 2 + p) + " " + y + " L " + (x - w / 2) + " " + y + " Z";
            self.svg.find("path").attr("d", d)
        },
        done: function() {
            var self = this,
                j = 0,
                size = self.images.size();
            self.images.each(function(i) {
                var $this = $(this),
                    src = self.assets[i];
                $this.attr("src", location.origin + local + src).one("load", function() {
                    j++, j == size && (self.container.fadeOut(), self.txt.fadeOut())
                }).each(function() {
                    this.complete && $(this).load()
                })
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
}(jQuery), $(function($) {
    $("html").preloader({
        js: ["js/jquery.imagesloaded.min.js", "js/gsap.min.js", "js/app.min.js"]
    })
});