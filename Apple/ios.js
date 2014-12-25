// Create a new scope called *general*
var general = {};

// Create a new link to the main Firebase
general.firebaseRoot = new Firebase("https://pickandwatch.firebaseio.com/");

// Create a child reference to the matchnum area
general.firebaseMatchNumRef = general.firebaseRoot.child("matchnum");

general.sendVideoID = function () {
    var v = $("#input_box").val();
    var o = {};
    o["video_id"] = v;
    o["play"] = false;
    general.firebaseRoot.update(o, function (error) {
        if (error) {
            alert("Error: " + error);
        } else {
            var u = {};
            u["play"] = true;
            general.firebaseRoot.update(u, function (error) {
                if (error) {
                    alert("Error: " + error);
                } else {
                    return;
                }
            })
        }
    });
}
$(function () {
    // Set up an enter handler for the textbox
    // When the enter button is pressed, set the
    // value of the textbox to a value under the main Firebase
    $("#button_submit").click(general.sendVideoID);
    $("#input_box").keyup(function (e) {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            general.sendVideoID();
        }
    });
});
