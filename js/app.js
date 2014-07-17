$(function($) {
    var viewport = $(window),
        width = viewport.width() / 2,
        height = viewport.height() / 2,
        svg = $("svg.main_loader"),
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
//        onComplete: start
    }, "-=0.45"), timeline.to(d, .6, {
        x: 0,
        y: viewport.height(),
        ease: Strong.easeInOut,
        onUpdate: update
    }, "-=0.45"), timeline.to($(".main_loader"), 1.2, {
        autoAlpha: 0,
        ease: Strong.easeInOut,
        onUpdate: update
    }, "-=0.25"), timeline.play()
});


