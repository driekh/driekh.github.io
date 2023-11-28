  $(document).ready(function() {
    //feed to parse
    var feed = "https://mastodon.nl/@driek.rss";

    $.ajax(feed, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {
            //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript

            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                document.write("------------------------");
                document.write("title      : " + el.find("title").text());
                document.write("link       : " + el.find("link").text());
                document.write("description: " + el.find("description").text());
            });


        }   
    });

});