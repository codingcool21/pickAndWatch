var general = {};
general.firebaseRoot = new Firebase("https://pickandwatch.firebaseio.com/");

general.playFirebase = general.firebaseRoot.child("play");
general.videoidFirebase = general.firebaseRoot.child("video_id");

general.videoidFirebase.on("value", function (v) {
    general.videoid = v.val();
});
general.playFirebase.on("value", function (v) {
    if (v.val() == true) {
        var video_url = "http://www.youtube.com/watch?v=" + general.videoid;
        jwplayer("video_firebase").setup({
            file: video_url,
            width: $(window).innerWidth(),
            height: $(window).innerHeight()
        });
        jwplayer("video_firebase").onReady(function () {
            jwplayer("video_firebase").play(true);
        });
    }
});
general.centerElementOnPage = function (element, element_value, css_size_word, top_or_left) {
    //alert(element + " " + element_value + " " + css_size_word + " "+ top_or_left);
    var windowmeasure;
    if (css_size_word == "em") {
        var css_word = "em";
    }
    if (css_size_word == "px") {
        var css_word = "px";
    }
    if (top_or_left == "top") {
        windowmeasure = $(window).innerHeight()
    } else {
        windowmeasure = $(window).innerWidth()
    }
    //alert(windowmeasure);
    $(element).css("position", "relative");
    $(element).css(top_or_left, windowmeasure / 2 - (element_value * 0.5) + css_word);
}
$(function () {
    general.centerElementOnPage("#video_firebase", $("#video_firebase").innerWidth(), "px", "left");
    general.centerElementOnPage("#video_firebase", $("#video_firebase").innerHeight(), "px", "top");
    $(window).resize(function () {
        jwplayer().resize($(window).innerWidth(), $(window).innerHeight());
        general.centerElementOnPage("#video_firebase", $("#video_firebase").innerWidth(), "px", "left");
        general.centerElementOnPage("#video_firebase", $("#video_firebase").innerHeight(), "px", "top");
    });
});
