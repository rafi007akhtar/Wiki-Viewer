var form = $("#form");
//console.log(stxt);

var stxt = $("#s-text");
/* Using the keypress event for the first time 
    Input: function with parameter as the key pressed on the object
    key.which converts it to its ASCII
    The function does the events to be carried out on pressing the key
*/
stxt.keypress(function(key) {
    if(key.which === 13) // 13 is the ASCII of carriage return (the Enter key)
    {
        var stxt = $("#s-text").val();
        res = $("#results");
        if(stxt === "")
            return;

        // SET THE WIKI URL
        var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+stxt+"&format=json&callback=wikiCallback";
        //console.log(wikiurl);
        $.ajax({
            url: wikiurl,
            dataType: "jsonp",
            success: function(data) {
                // clear results from before
                res.html("");

                console.log(data);

                var head = data[1];
                var para = data[2];
                var link = data[3];

                var col0 = "rgba(223, 0, 94, 0.5)";
                var col1 = "rgba(0, 209, 14, 0.5)";
                var col2 = "rgba(255, 44, 0, 0.5)";

                l = head.length;
                for (i = 0; i < l; i++) {
                    var ele = $("<div>", {"class": "thumbnail col-xs-12 col-md-4 text-center elem"});
                    ele.append("<h3> <u>" + head[i] + "</u> </h3> <p> " + para[i] + "</p>");

                    var num = Math.floor(Math.random() * 10) % 3;
                    if(num%3 === 0)
                        ele.css("background-color", col0);
                    else if(num%3 === 1)
                        ele.css("background-color", col1);
                    else
                        ele.css("background-color", col2);

                    //ele.slideUp();
                    res.append(ele);
                    ele.hide();
                    ele.fadeIn(1000);

                }


            }
        });
    }
})