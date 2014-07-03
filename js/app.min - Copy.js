/*
! function($) {
    var Home = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.home.options, options), self.elem = $(elem)
        },
        bindEvents: function() {},
        unbindEvents: function() {
            var self = this;
            return self.destroy()
        },
        destroy: function() {
            var self = this;
            for (var member in self) self[member] = null, delete self[member];
            return self = null
        }
    };
    $.fn.home = function(options) {
        return this.each(function() {
            var home = Object.create(Home);
            home.init(options, this), $.data(this, "home", home)
        })
    }, $.fn.home.options = {}
}(jQuery),
*/

! function($) {
    var Projects = {
        init: function(options, elem) {
            var self = this;
            self.viewport = $(window), self.options = $.extend({}, $.fn.projects.options, options), self.elem = $(elem), self.container = self.elem.find("div.con-box"), self.boxes = self.container.find("a.box"), self.zeros = self.boxes.find("div.grid-zero"), self.track = self.elem.find("div.zone"), self.piece = self.elem.find("div.cursor"), self.index = 0, self.length = self.boxes.size(), self.zone = self.elem.find("div.zone-text").find("span").eq(0), self.ratio = 1800 / 1184, self.container.css("width", 25 * self.length + "%"), self.boxes.css("width", 100 / self.length + "%"), self.width = self.boxes.eq(0).width() / 2, self.height = self.viewport.height() / 2, self.a = [], self.b = [], self.c = [], self.d = [], self.boxes.each(function() {
                self.a.push({
                    x: self.width - 10,
                    y: self.height - 60
                }), self.b.push({
                    x: self.width + 10,
                    y: self.height - 60
                }), self.c.push({
                    x: self.width + 10,
                    y: self.height - 59
                }), self.d.push({
                    x: self.width - 10,
                    y: self.height - 59
                })
            }), self.draw(), self.boxes.find("path").attr("d", "M " + (self.width - 10) + " " + (self.height - 60) + " L " + (self.width + 10) + " " + (self.height - 60) + " L " + (self.width + 10) + " " + (self.height - 59) + " L " + (self.width - 10) + " " + (self.height - 59) + " Z"), self.buttons = self.elem.find("button.prev, button.next").eq(0).css({
                opacity: 0
            }).end(), self.linePrev = self.elem.find("svg.line-prev"), self.lineNext = self.elem.find("svg.line-next"), self.e = {
                x: 1,
                y: 19
            }, self.f = {
                x: 1,
                y: 18
            }, self.g = {
                x: 13,
                y: 20
            }, self.h = {
                x: 13,
                y: 19
            }, self.animation(), self.resize()
        },
        animation: function() {
            var self = this,
                width = 4 / self.length * self.track.width(),
                d = .5;
            self.boxes.each(function(i) {
                var $this = $(this),
                    $elem = $this.find("div.grid-cache"),
                    alpha = $(this).data("opacity"),
                    delay = d + .25 * i;
                TweenMax.to($elem, 4, {
                    autoAlpha: alpha,
                    delay: delay,
                    ease: Expo.easeOut
                })
            }), TweenMax.to(self.track, 1.2, {
                autoAlpha: 1,
                delay: d + 1.25,
                ease: Expo.easeOut,
                onComplete: self.start,
                onCompleteScope: self
            }), TweenMax.to(self.piece, 1.2, {
                width: width,
                delay: d + 1.5,
                ease: Strong.easeInOut
            }), TweenMax.to(self.zone.parent(), 1.2, {
                autoAlpha: 1,
                delay: d + 1.5,
                ease: Strong.easeInOut
            })
        },
        start: function() {
            var self = this;
            self.bindEvents()
        },
        bindEvents: function() {
            var self = this;
            self.zeros.on("mouseover.projects", $.proxy(self.mouseenter, self)), self.zeros.on("mouseout.projects", $.proxy(self.mouseleave, self)), self.buttons.on("mouseover.projects", $.proxy(self.mouseover, self)), self.buttons.on("mouseout.projects", $.proxy(self.mouseout, self)), self.buttons.on("click.projects", $.proxy(self.click, self)), self.buttons.on("touchend.projects", $.proxy(self.click, self)), self.viewport.on("keyup.projects", $.proxy(self.keyup, self)), self.viewport.on("resize.projects", $.proxy(self.resize, self))
        },
        unbindEvents: function() {
            var self = this;
            return self.zeros.off("mouseover.projects"), self.zeros.off("mouseout.projects"), self.buttons.off("mouseover.projects"), self.buttons.off("mouseout.projects"), self.buttons.off("click.projects"), self.buttons.off("touchend.projects"), self.viewport.off("keyup.projects"), self.viewport.off("resize.projects"), self.destroy()
        },
        destroy: function() {
            var self = this;
            for (var member in self) self[member] = null, delete self[member];
            return self = null
        },
        mouseenter: function(e) {
            var $this = $(e.currentTarget),
                i = $this.parent().index(),
                self = this;
            TweenMax.to(self.a[i], .8, {
                x: 0,
                y: 0,
                ease: Strong.easeInOut,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.b[i], .8, {
                x: self.boxes.eq(i).width(),
                y: 0,
                ease: Strong.easeInOut,
                delay: .15,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.c[i], .8, {
                x: self.boxes.eq(i).width(),
                y: self.boxes.eq(i).height(),
                ease: Strong.easeInOut,
                delay: .3,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.d[i], .8, {
                x: 0,
                y: self.boxes.eq(i).height(),
                ease: Strong.easeInOut,
                delay: .45,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to($this.siblings("div.grid-eye"), .5, {
                autoAlpha: 1,
                delay: .8,
                ease: Strong.easeInOut
            })
        },
        mouseleave: function(e) {
            var $this = $(e.currentTarget),
                i = $this.parent().index(),
                self = this,
                x = self.width - 10,
                y = self.height - 59;
            TweenMax.to($this.siblings("div.grid-eye"), .1, {
                autoAlpha: 0,
                overwrite: "all",
                ease: Strong.easeInOut
            }), TweenMax.to(self.a[i], .4, {
                x: x,
                y: y - 1,
                overwrite: "all",
                ease: Strong.easeInOut,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.b[i], .4, {
                x: x + 20,
                y: y - 1,
                overwrite: "all",
                ease: Strong.easeInOut,
                delay: .05,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.c[i], .4, {
                x: x + 20,
                y: y,
                overwrite: "all",
                ease: Strong.easeInOut,
                delay: .1,
                onUpdate: self.draw,
                onUpdateScope: self
            }), TweenMax.to(self.d[i], .4, {
                x: x,
                y: y,
                overwrite: "all",
                ease: Strong.easeInOut,
                delay: .15,
                onUpdate: self.draw,
                onUpdateScope: self
            })
        },
        draw: function() {
            var self = this;
            self.boxes.each(function(i) {
                $(this).find("path").attr("d", "M " + self.a[i].x + " " + self.a[i].y + " L " + self.b[i].x + " " + self.b[i].y + " L " + self.c[i].x + " " + self.c[i].y + " L " + self.d[i].x + " " + self.d[i].y + " Z")
            })
        },
/*
        mouseover: function(e) {
            var self = this,
                $this = $(e.currentTarget);
            $this.hasClass("prev") && 0 != self.index ? (TweenMax.to(self.e, .6, {
                x: 12,
                y: 0,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.f, .6, {
                x: 12,
                y: 39,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            })) : $this.hasClass("next") && self.index != self.length - 4 && (TweenMax.to(self.g, .6, {
                x: 1,
                y: 0,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.h, .6, {
                x: 2,
                y: 39,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }))
        },
        mouseout: function(e) {
            var self = this,
                $this = $(e.currentTarget);
            $this.hasClass("prev") ? (TweenMax.to(self.e, .6, {
                x: 1,
                y: 19,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.f, .6, {
                x: 1,
                y: 18,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            })) : (TweenMax.to(self.g, .6, {
                x: 13,
                y: 20,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.h, .6, {
                x: 13,
                y: 19,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }))
        },
        update: function() {
            var self = this;
            self.linePrev.find("path").eq(0).attr("d", "M 1 19 L " + self.e.x + " " + self.e.y), self.linePrev.find("path").eq(1).attr("d", "M 1 18 L " + self.f.x + " " + self.f.y), self.lineNext.find("path").eq(0).attr("d", "M 13 20 L " + self.g.x + " " + self.g.y), self.lineNext.find("path").eq(1).attr("d", "M 13 19 L " + self.h.x + " " + self.h.y)
        },
        click: function(e) {
            var self = this,
                $this = $(e.currentTarget);
            $this.hasClass("prev") ? (self.direction = "reverse", self.index = self.index - 1 < 0 ? 0 : self.index - 1) : (self.direction = "play", self.index = self.index + 1 > self.length - 4 ? self.index : self.index + 1), self.zeros.trigger("mouseout.projects"), self.move(), e.preventDefault()
        },
        keyup: function(e) {
            var self = this;
            switch (e.keyCode) {
                case 37:
                    self.buttons.eq(0).trigger("click.projects");
                    break;
                case 39:
                    self.buttons.eq(1).trigger("click.projects")
            }
        },
*/
/*		,		
        move: function() {
            var self = this,
                left = self.index / (self.length - 4) * (self.track.width() - self.piece.width()),
                zone = self.index + 4 < 10 ? "0" + (self.index + 4) : self.index + 4;
            self.zone.text(zone), 0 == self.index ? TweenMax.to(self.buttons.eq(0), .25, {
                autoAlpha: 0,
                ease: Expo.easeOut
            }) : self.index == self.length - 4 ? TweenMax.to(self.buttons.eq(1), .25, {
                autoAlpha: 0,
                ease: Expo.easeOut
            }) : TweenMax.to(self.buttons, .25, {
                autoAlpha: .25,
                ease: Expo.easeOut
            }), "play" === self.direction ? (TweenMax.to(self.boxes.eq(self.index - 1), 1, {
                width: 0,
                ease: Quart.easeOut
            }), TweenMax.to(self.boxes.eq(self.index - 1).find("div.grid-text"), 1, {
                autoAlpha: 0,
                ease: Quart.easeOut
            })) : (TweenMax.to(self.boxes.eq(self.index), 1, {
                width: self.boxes.eq(self.length - 1).width(),
                ease: Quart.easeOut
            }), TweenMax.to(self.boxes.eq(self.index).find("div.grid-text"), 1, {
                autoAlpha: 1,
                ease: Quart.easeOut
            })), TweenMax.to(self.piece, .8, {
                left: left,
                ease: Quart.easeOut
            })
        },
*/
        resize: function() {
            var self = this;
            self.boxes.each(function(i) {
                var $this = $(this),
                    $img = $this.find("img"),
                    top = -(($this.width() / self.ratio - $this.height()) / 2),
                    left = -(($this.height() * self.ratio - $this.width()) / 2);
                $this.width() / $this.height() >= self.ratio ? $img.removeClass("height").addClass("width").css({
                    marginTop: top,
                    marginLeft: 0
                }) : $img.removeClass("width").addClass("height").css({
                    marginTop: 0,
                    marginLeft: left
                }), i >= self.index && $this.css("width", 100 / self.length + "%")
            })
        }
	};
    $.fn.projects = function(options) {
        return this.each(function() {
            var projects = Object.create(Projects);
            projects.init(options, this), $.data(this, "projects", projects)
        })
    }, $.fn.projects.options = {}
}(jQuery),

/**************************************************************** More  **********************************************************************/
/*
function($) {
    var More = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.more.options, options), self.elem = $(elem), self.buttons = self.elem.find("a.prev,a.next"), self.linePrev = self.elem.find("svg.line-prev"), self.lineNext = self.elem.find("svg.line-next"), self.textPrev = self.elem.find("div.prev-text"), self.textNext = self.elem.find("div.next-text"), self.a = {
                x: 1,
                y: 19
            }, self.b = {
                x: 1,
                y: 18
            }, self.c = {
                x: 13,
                y: 20
            }, self.d = {
                x: 13,
                y: 19
            }, self.bindEvents()
        },
        bindEvents: function() {
            var self = this;
            self.buttons.on("mouseover.more", $.proxy(self.mouseover, self)), self.buttons.on("mouseout.more", $.proxy(self.mouseout, self))
        },
        unbindEvents: function() {
            var self = this;
            return self.buttons.off("mouseover.more"), self.buttons.off("mouseout.more"), self.destroy()
        },
        destroy: function() {
            var self = this;
            for (var member in self) self[member] = null, delete self[member];
            return self = null
        },
        mouseover: function(e) {
            var self = this,
                $this = $(e.currentTarget);
            $this.hasClass("prev") ? (TweenMax.to(self.a, .6, {
                x: 12,
                y: 0,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.b, .6, {
                x: 12,
                y: 39,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.staggerTo(self.textPrev.find("span"), .6, {
                autoAlpha: 1,
                delay: .25,
                ease: Strong.easeInOut
            }, .1)) : (TweenMax.to(self.c, .6, {
                x: 1,
                y: 0,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.d, .6, {
                x: 2,
                y: 39,
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.staggerTo(self.textNext.find("span"), .6, {
                autoAlpha: 1,
                delay: .25,
                ease: Strong.easeInOut
            }, .1))
        },
        mouseout: function(e) {
            var self = this,
                $this = $(e.currentTarget);
            $this.hasClass("prev") ? (TweenMax.staggerTo(self.textPrev.find("span").get().reverse(), .6, {
                autoAlpha: 0,
                overwrite: "all",
                ease: Strong.easeInOut
            }, .1), TweenMax.to(self.a, .6, {
                x: 1,
                y: 19,
                delay: .25,
                overwrite: "all",
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.b, .6, {
                x: 1,
                y: 18,
                delay: .25,
                overwrite: "all",
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            })) : (TweenMax.staggerTo(self.textNext.find("span").get().reverse(), .6, {
                autoAlpha: 0,
                overwrite: "all",
                ease: Strong.easeInOut
            }, .1), TweenMax.to(self.c, .6, {
                x: 13,
                y: 20,
                delay: .25,
                overwrite: "all",
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), TweenMax.to(self.d, .6, {
                x: 13,
                y: 19,
                delay: .25,
                overwrite: "all",
                ease: Strong.easeInOut,
                onUpdate: self.update,
                onUpdateScope: self
            }))
        },
        update: function() {
            var self = this;
            self.linePrev.size() > 0 && (self.linePrev.find("path").eq(0).attr("d", "M 1 19 L " + self.a.x + " " + self.a.y), self.linePrev.find("path").eq(1).attr("d", "M 1 18 L " + self.b.x + " " + self.b.y)), self.lineNext.size() > 0 && (self.lineNext.find("path").eq(0).attr("d", "M 13 20 L " + self.c.x + " " + self.c.y), self.lineNext.find("path").eq(1).attr("d", "M 13 19 L " + self.d.x + " " + self.d.y))
        }
    };
    $.fn.more = function(options) {
        return this.each(function() {
            var more = Object.create(More);
            more.init(options, this), $.data(this, "more", more)
        })
    }, $.fn.more.options = {}
}(jQuery),
*/
/**************************************************************** More  **********************************************************************/
/**************************************************************** Contact  **********************************************************************/
/*
function($) {
    var Contact = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.contact.options, options), self.elem = $(elem)
        },
        bindEvents: function() {},
        unbindEvents: function() {
            var self = this;
            return self.destroy()
        },
        destroy: function() {
            var self = this;
            for (var member in self) self[member] = null, delete self[member];
            return self = null
        }
    };
    $.fn.contact = function(options) {
        return this.each(function() {
            var contact = Object.create(Contact);
            contact.init(options, this), $.data(this, "contact", contact)
        })
    }, $.fn.contact.options = {}
}(jQuery),
*/
/**************************************************************** Contact  **********************************************************************/

/**************************************************************** Error  **********************************************************************/
/*
function($) {
    var Errors = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.errors.options, options), self.elem = $(elem)
        },
        bindEvents: function() {},
        unbindEvents: function() {
            var self = this;
            return self.destroy()
        },
        destroy: function() {
            var self = this;
            for (var member in self) self[member] = null, delete self[member];
            return self = null
        }
    };
    $.fn.errors = function(options) {
        return this.each(function() {
            var errors = Object.create(Errors);
            errors.init(options, this), $.data(this, "errors", errors)
        })
    }, $.fn.errors.options = {}
}(jQuery),
*/
/**************************************************************** Error  **********************************************************************/

/*
function($) {
    var Ajax = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.ajax.options, options),
			self.elem = $(elem)
        },
        bindEvents: function() {
            var self = this,
                anchors = $("a").not(self.options.unbind);
            $("a").off("click.ajax"), $("a").off("dblclick.ajax"), $("a").off("touchend.ajax"), anchors.on("click.ajax", $.proxy(self.click, self)), anchors.on("dblclick.ajax", $.proxy(self.click, self)), anchors.on("touchend.ajax", $.proxy(self.click, self))
        },
        unbindEvents: function() {
            $("a").off("click.ajax"), $("a").off("dblclick.ajax"), $("a").off("touchend.ajax")
        },
        click: function(e) {
            var self = this,
                currentTarget = $(e.currentTarget),
                href = currentTarget.attr("href"),
                context = currentTarget.data("context"),
                index = currentTarget.data("index");
            return self.animated ? !1 : void(currentTarget.hasClass("outer") || (self.url == href || self.animated || (void 0 !== context && (self.context = context), void 0 !== index && (self.index = index), self.url = href, history.pushState({
                href: self.url,
                context: self.context,
                index: self.index
            }, "url", self.url), self.load()), e.stopPropagation(), e.preventDefault()))
        },
        change: function(e) {
            var self = this,
                evt = e.originalEvent;
            null === evt.state ? self.initialize ? (self.context = evt.state.context, self.index = evt.state.index, self.url = evt.state.href, self.animated ? setTimeout(function() {
                self.change(e)
            }, 1e3) : self.load()) : (history.pushState({
                href: self.origin,
                context: self.context,
                index: self.index
            }, "url", self.origin), self.init = !1) : (self.context = evt.state.context, self.index = evt.state.index, self.url = evt.state.href, self.animated ? setTimeout(function() {
                self.change(e)
            }, 1e3) : self.load())
        },
        load: function() {
            var self = this;
            if (!self.animated) {
                self.animated = !0, "function" == typeof self.options.progress && self.options.progress.call(self);
                var jxhr = self.query(self.url);
                jxhr.then(function(data, textStatus, jqXHR) {
                    "function" == typeof self.options.success && self.options.success.call(self, data, textStatus, jqXHR)
                }, function(jqXHR, textStatus, errorThrown) {
                    "function" == typeof self.options.error && self.options.error.call(self, jqXHR, textStatus, errorThrown)
                })
            }
        },
        query: function(href) {
            var self = this;
            return $.ajax(href, {
                method: "GET",
                cache: self.options.cache
            })
        },
        done: function() {
            var self = this;
            self.animated = !1
        }
	};
    $.fn.ajax = function(options) {
        return this.each(function() {
            var ajax = Object.create(Ajax);
            ajax.init(options, this), $.data(this, "ajax", ajax)
        })
    },
	$.fn.ajax.options = {
        context: "home",
        index: 0,
        unbind: "",
        filters: [],
        cache: !0,
        progress: function() {},
        success: function() {},
        error: function() {}
    }
}(jQuery),
*/

/**************************************************************** Loader  **********************************************************************/
/*
function($) {
    var Loader = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.loader.options, options), self.elem = $(elem), self.svg = self.elem.find("svg.pie"), self.pie = self.svg.find("path"), self.percent = 10, self.visible = !1
        },
        show: function() {
            var self = this;
            TweenMax.to(self.elem, .6, {
                autoAlpha: 1,
                ease: Strong.easeOut,
                onComplete: self.complete,
                onCompleteScope: self
            })
        },
        complete: function() {
            var self = this;
            self.visible ? self.visible = !1 : (self.timer = setInterval(self.animation, 1e3 / 60, self), self.visible = !0)
        },
        animation: function(context) {
            var self = context,
                percent = self.percent % 100 / 100,
                radius = 20,
                mid = .5 > percent ? 0 : 1,
                x = radius + Math.cos((-90 + 360 * percent) * Math.PI / 180) * radius,
                y = radius + Math.sin((-90 + 360 * percent) * Math.PI / 180) * radius,
                d = "M " + radius + " 0 A " + radius + " " + radius + " 0 " + mid + " 1 " + x + " " + y + " L " + radius + " " + radius + " L " + radius + " 0";
            self.pie.attr("d", d), self.percent++, self.percent % 100 == 1 && (clearInterval(self.timer), TweenMax.set(self.elem, {
                autoAlpha: 0
            }), self.options.completed.call(self))
        }
    };
    $.fn.loader = function(options) {
        return this.each(function() {
            var loader = Object.create(Loader);
            loader.init(options, this), $.data(this, "loader", loader)
        })
    }, $.fn.loader.options = {
        completed: function() {}
    }
}(jQuery),
*/
/**************************************************************** Loader  **********************************************************************/
/**************************************************************** Mass Loader  **********************************************************************/

/*
function($) {
    var MassLoader = {
        init: function(options, elem) {
            var self = this;
            self.options = $.extend({}, $.fn.massLoader.options, options), self.elem = $(elem)
        },
        parse: function() {
            var self = this;
            return self.elem.find("img").each(function() {
                var $this = $(this),
                    source = $this.attr("src").replace(location.origin + local + "bin/images/projets/", "").replace(".jpg", "");
                $this.attr("src", location.origin + local + "images/" + $(window).width() + "/" + $(window).height() + "/" + source)
            }), self.elem
        }
    };
    $.fn.massLoader = function(options) {
        return this.each(function() {
            var massLoader = Object.create(MassLoader);
            massLoader.init(options, this), $.data(this, "massLoader", massLoader)
        })
    }, $.fn.massLoader.options = {}
}(jQuery),
*/
/**************************************************************** Mass Loader  **********************************************************************/
/**************************************************************** MENU  **********************************************************************/

/*
function($) {
    var Menu = {
        init: function(options, elem) {
            var self = this;
            self.viewport = $(window), self.options = $.extend({}, $.fn.menu.options, options), self.elem = $(elem), self.ul = self.elem.children("ul"), self.li = self.ul.children("li"), self.a = self.li.children("a"), self.line = self.elem.find("div.line"), self.index = self.options.index, self.bindEvents(), self.goTo(self.index)
        },
        bindEvents: function() {
            var self = this;
            self.li.on("mouseover.menu", $.proxy(self.mouseover, self))
        },
        mouseover: function(e) {
            var $this = $(e.currentTarget),
                index = $this.index(),
                self = this;
            $this.on("mouseout.menu", $.proxy(self.mouseout, self)), self.goTo(index)
        },
        mouseout: function(e) {
            var $this = $(e.currentTarget),
                self = ($this.index(), this);
            $this.off("mouseout.menu"), self.goTo(self.index)
        },
        change: function(index) {
            var self = this;
            self.goTo(index), self.index = index
        },
        goTo: function(index) {
            var self = this,
                $this = self.a.eq(index),
                left = $this.offset().left - self.elem.offset().left,
                width = $this.width();
            TweenMax.to(self.line, .8, {
                left: left,
                width: width,
                delay: .1,
                ease: Strong.easeInOut
            })
        }
    };
    $.fn.menu = function(options) {
        return this.each(function() {
            var menu = Object.create(Menu);
            menu.init(options, this), $.data(this, "menu", menu)
        })
    }, $.fn.menu.options = {
        index: 0
    }
}(jQuery),
*/
/**************************************************************** MENU  **********************************************************************/

function($) {
    var App = {
        init: function(options, elem) {
            var self = this;

            self.options = $.extend({}, $.fn.app.options, options),
			self.elem = $(elem),
			self.body = $("body"), 
			self.context = self.body.data("context"),
			self.index = self.body.data("index"), 
/*			self.html = $("html").ajax({
               index: self.index,
                identic: $.proxy(self.identic, self),
                progress: $.proxy(self.progress, self),
               success: $.proxy(self.success, self)
            }),
*/
/**************************************************************** MENU  **********************************************************************/
/*
				self.menu = $("nav.menu").menu({
                index: self.index
            }),
*/
/**************************************************************** MENU  **********************************************************************/
/**************************************************************** Loader  **********************************************************************/
/*
			self.loader = $("div.loader").loader({
                completed: $.proxy(self.completed, self)
            }),
*/
/**************************************************************** Loader  **********************************************************************/
			self.container = $("div.container"),
			self.current = self.container[self.context](), 
			self.image = self.container.find("div.image").find("img"), 
			self.mask = $("div.mask"),
			self.ratio = 1800 / 1184,
			self.response = null
//			self.bindEvents(),
//			self.resize()
        }
/*
        bindEvents: function() {
            var self = this;
            self.elem.on("resize.app", $.proxy(self.resize, self))
        },
        identic: function() {},
        progress: function() {
            var self = this,
                timeline = new TimelineMax({
                    paused: !0,
                    onComplete: self.done,
                    onCompleteScope: self
                });
            self.index = self.html.data("ajax").index, self.menu.data("menu").change(self.index), timeline.to(self.container.find("div.title"), .5, {
                autoAlpha: 0,
                ease: Power2.easeInOut
            }), timeline.to(self.container.find("div.text"), .45, {
                autoAlpha: 0,
                ease: Power2.easeInOut
            }, "-=0.25"), timeline.to(self.container.find("div.link"), .4, {
                autoAlpha: 0,
                ease: Power2.easeInOut
            }, "-=0.25"), timeline.play()
        },
        done: function() {
            var self = this;
            self.loader.data("loader").show(), self.html.data("ajax").unbindEvents()
        },
        success: function(response) {
            var self = this,
                res = $(response).massLoader();
            self.response = res.data("massLoader").parse(), self.response.find("img").imagesLoaded({
                done: $.proxy(self.loaded, self),
                fail: function() {
                    self.success(response)
                }
            })
        },
        loaded: function() {
            var self = this;
            self.loader.data("loader").complete()
        },
        completed: function() {
            var self = this;
            self.reveal()
        },
        reveal: function() {
            var self = this,
                width = self.elem.width(),
                height = self.elem.height();
            self.a = {
                x: width,
                y: 0
            }, self.b = {
                x: width,
                y: 0
            }, self.c = {
                x: width,
                y: height
            }, self.d = {
                x: width,
                y: height
            }, self.mask.find("path").attr("fill", $(self.response).data("color"));
            var timeline = new TimelineMax({
                paused: !0
            });
            timeline.to(self.mask, .1, {
                autoAlpha: 1
            }), timeline.to(self.b, .8, {
                x: 0,
                y: 0,
                ease: Quart.easeOut,
                onUpdate: self.update,
                onUpdateScope: self,
                onComplete: self.hide,
                onCompleteScope: self
            }), timeline.to(self.c, .8, {
                x: 0,
                y: height,
                ease: Quart.easeOut,
                onUpdate: self.update,
                onUpdateScope: self
            }, "-=0.75"), timeline.play()
        },
        hide: function() {
            var self = this,
                width = self.elem.width(),
                height = self.elem.height();
            self.current = self.current.data(self.context).unbindEvents(), self.container.empty().append(self.response), self.image = self.container.find("div.image").find("img"), self.context = self.html.data("ajax").context, self.current = self.container[self.context](), self.elem.resize(), self.html.data("ajax").bindEvents(), self.html.data("ajax").done();
            var timeline = new TimelineMax({
                paused: !0
            });
            timeline.to(self.b, .8, {
                x: width,
                y: 0,
                delay: .1,
                ease: Quart.easeOut,
                onUpdate: self.update,
                onUpdateScope: self
            }), timeline.to(self.c, .8, {
                x: width,
                y: height,
                ease: Quart.easeOut,
                onUpdate: self.update,
                onUpdateScope: self
            }, "-=0.75"), timeline.set(self.mask, {
                autoAlpha: 0
            }), timeline.play()
        },
        update: function() {
            var self = this;
            self.mask.find("path").attr("d", "M " + self.a.x + " " + self.a.y + " L " + self.b.x + " " + self.b.y + " L " + self.c.x + " " + self.c.y + " L " + self.d.x + " " + self.d.y + " Z")
        },
        resize: function() {
            var self = this,
                top = -((self.elem.width() / self.ratio - self.elem.height()) / 2),
                left = -((self.elem.height() * self.ratio - self.elem.width()) / 2);
            self.elem.width() / self.elem.height() >= self.ratio ? (self.image.removeClass("height").addClass("width"), self.image.css({
                marginTop: top,
                marginLeft: 0
            })) : (self.image.removeClass("width").addClass("height"), self.image.css({
                marginTop: 0,
                marginLeft: left
            }))
        }
*/
	};
    $.fn.app = function(options) {
        return this.each(function() {
            var app = Object.create(App);
            app.init(options, this), $.data(this, "app", app)
        })
    }, $.fn.app.options = {}
}(jQuery), $(function($) {
    var viewport = $(window),
        width = viewport.width() / 2,
        height = viewport.height() / 2,
        svg = $("svg.back-loader"),
        a = {
            x: width - 140,
            y: height - 1
        }, b = {
            x: width + 140,
            y: height - 1
        }, c = {
            x: width + 140,
            y: height
        }, d = {
            x: width - 140,
            y: height
        }, update = function() {
            svg.find("path").attr("d", "M " + a.x + " " + a.y + " L " + b.x + " " + b.y + " L " + c.x + " " + c.y + " L " + d.x + " " + d.y + " Z")
        }, start = function() {
            viewport.app()
        }, timeline = new TimelineMax({
            paused: !0
        });
    timeline.to(a, .6, {
        x: 0,
        y: 0,
        delay: 1,
        ease: Strong.easeInOut,
        onUpdate: update
    }), timeline.to(b, .6, {
        x: viewport.width(),
        y: 0,
        ease: Strong.easeInOut,
        onUpdate: update
    }, "-=0.45"), timeline.to(c, .6, {
        x: viewport.width(),
        y: viewport.height(),
        ease: Strong.easeInOut,
        onUpdate: update,
        onComplete: start
    }, "-=0.45"), timeline.to(d, .6, {
        x: 0,
        y: viewport.height(),
        ease: Strong.easeInOut,
        onUpdate: update
    }, "-=0.45"), timeline.to($(".preloader"), 1.2, {
        autoAlpha: 0,
        ease: Strong.easeInOut,
        onUpdate: update
    }, "-=0.25"), timeline.play()
});


