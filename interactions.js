var form = $("#form");
var sWidth = screen.width;
var foot = $("#foot");
foot.hide();

var stxt = $("#s-text");
/* Using the keypress event for the first time 
    Input: function with parameter as the key pressed on the object
    key.which converts it to its ASCII
    The function does the events to be carried out on pressing the key
*/
stxt.keypress(function (key) {
    if (key.which === 13) // 13 is the ASCII of carriage return (the Enter key)
    {
        var stxt = $("#s-text").val();
        res = $("#results");
        if(stxt.trim() === "") {
            var url = "https://en.wikipedia.org/wiki/Special:Random";
            $("<a>").attr("href", url).attr("target", "_blank")[0].click();
            return;
        }

        // SET THE WIKI URL
        var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + stxt + "&format=json&callback=wikiCallback";
        //console.log(wikiurl);
        $.ajax({
            url: wikiurl,
            dataType: "jsonp",
            success: function(data) {
                // clear results from before
                res.html("");
                $("#no-res").html("");
                
                var head = data[1];
                var para = data[2];
                var link = data[3];

                var col0 = "rgba(223, 0, 94, 0.5)";
                var col1 = "rgba(0, 209, 14, 0.5)";
                var col2 = "rgba(255, 44, 0, 0.5)";

                l = head.length;
                for (i = 0; i < l; i++) {
                    if(i === 0) {
                        var stxt2 = head[i];
                        if(stxt2.toLowerCase() != stxt.toLowerCase()) {
                            console.log(head[i] + " is not " + stxt);
                            $("#no-res").append("Showing results for: <a href='" +link[i] + "' target='_blank' style='color: white; text-decoration: underline'>" + head[i] + "</a> <br>&nbsp;");
                        }
                    }
                    
                    var ele = $("<div>", {"class": "col-xs-12 col-md-4 text-center elem"});
        
                    ele.append("<h3>" + head[i] + " </h3>" + " <p> " + para[i] + "</p>");
                    ele.append("<a href='"+ link[i] +"' target='_blank'> <button class='btn btn-primary'> Show me more </button></a>");
                    
                    if (i === 0) {
                        ele.removeClass("col-md-4");
                        ele.css("height", "auto");
                        ele.css("overflow", "visible");
                        ele.append("<br>&nbsp;")
                    }

                    res.append(ele);
                    ele.hide();
                    ele.fadeIn(1000);
                    };
                
                foot.show();

                }
        });
    }
});

