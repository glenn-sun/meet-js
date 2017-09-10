// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
var userFriends

function newUserFirebase() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1186337974831392',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.10' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      '\nThanks for logging in, ' + response.name + '!';
    
    //DEFINE USER FRIENDSSSSSSSSZZZZZ
    
    if (!checkIfUserExists(reposnse.id)){
      postName(resposnse.name, userId)
      postFriendsList(userFriends, userId)
      postId(userName, response.id)
    }
  });
}
//FIREBASE

var database = firebase.database

//Check if new user

function checkIfUserExists(id) {
  database.ref('/idList').once('value').then(function(snapshot) {
    return snapshot.val.includes(id);
  });
}

// Post data to Firebase

function postFriendsList(friendsList, id) {
    database.ref('friendsList').set({
    id: friendsList
  });
}

function postName(name, id) {
  database.ref('nam').set({
    id: name
  });
}

function postId(id) {
  database.ref('idList')({
    id
  })
}


// Get data from Firebase

function getFriendsList(id) {
    
    document.getElementById(id)
}
