function mapEntries(json, realrowlength, skip){
    if (!skip) skip = 0;
    var dataframe = new Array();
    
    var row = new Array();
    for (var i=0; i < json.feed.entry.length; i++) {
  
      var entry = json.feed.entry[i];
      if (entry.gs$cell.col == '1') {
        if (row != null) {
          if ((!realrowlength || row.length === realrowlength) && (skip  === 0)){
             dataframe.push(row);
          } else {
             if (skip > 0) skip--;
          }
        }
  
        var row = new Array();
      }
      row.push(entry.content.$t);
    } 
    dataframe.push(row);
    
    return dataframe;
    }
  
    var commentsFull = [];
  
    function updateComments(){
      $('#refreshStats').empty();
      var staticUrl = 'https://spreadsheets.google.com/feeds/cells/1hMliX-p77X-k-muas_pMHV5hgIWK27jlok_qjKx3_ZA/1/public/full?alt=json';
      $.getJSON(staticUrl, function(data) {
        var comments = mapEntries(data, 3);
        commentsNew = comments.slice(commentsFull.length);
        commentsFull = comments;
        $.each(commentsNew, function(i, item){
            var $comment = $('<li class="comment"/>')
            .append(
                $('<div/>', {'class': 'header'}).append(
                    $('<span/>', {'class': 'username', text: item[0]})
                ).append(
                    $('<span/>', {'class': 'date', text: item[2]}).append(
                    )
                )
              ).append(
                $('<div/>', {'class': 'text', text: item[1]})
            );
            $("#commentbox").append($comment); 
        });
        $('#refreshStats').append(commentsNew.length + " new comments found.");
        var myDiv = document.getElementById('commentcontainer');
        myDiv.scrollTop = myDiv.scrollHeight;
      });
    };
    updateComments();
