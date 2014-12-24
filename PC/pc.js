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
            width: 800,
            height: 600
        });
    }
});
$(function () {

});
