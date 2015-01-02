// Create a new scope called *general*
var general = {};

// Create a new link to the main Firebase
general.firebaseRoot = new Firebase("https://pickandwatch.firebaseio.com/");

// Create a child reference to the matchnum area
general.firebaseMatchNumRef = general.firebaseRoot.child("matchnum");

general.sendVideoID = function (value) {
    if (value) {
        var v = value;
    } else {
        var v = $("#input_box").val();
    }
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

general.loadPage = function (page) {
    switch (page) {
    case 'youtube':
        $.get("youtube.html", function (htmlcode) {
            $("#pageView").html(htmlcode);
        });
        break;
    }
}
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
    // Set up an enter handler for the textbox
    // When the enter button is pressed, set the
    // value of the textbox to a value under the main Firebase
    $("#button_submit").click(general.sendVideoID);
    $("#input_box_0").keyup(function (e) {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            general.sendVideoID();
        }
    });
});

$(window).resize(function () {
    general.centerElementOnPage("#result_view", $("#result_view").innerWidth(), "px", "left");
});
