var submitted = false;

$(document).ready(function() {
    checkCookie();
})

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  function setCookie(cname,cvalue) {
    document.cookie = cname + "=" + cvalue + "; SameSite=None; Secure";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      console.log("uid " + user);
    } else {
      setCookie("username", genRanHex(4));
    }
    $('#uid').append("#" + getCookie("username"));
  }

  $( "#input" ).submit(function( event ) {
    var input = document.getElementById('usernameEntry');
    input.value = input.value += ("#" + getCookie("username"));
    $( "#hidden_iframe" ).ready(function() {
        console.log('piss');
        reloadSubmit();
    });
});

  function reloadSubmit() {
    document.getElementById("usernameEntry").value = '';
    document.getElementById("textEntry").value = '';
    updateComments();
  };

  $('#refreshButton').click('submit', function(event){
    updateComments()
  });