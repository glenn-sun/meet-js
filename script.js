var rankedSuggestions = ["Andrew", "Bob", "Charlie", "Daniel"];

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.

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
    onLogin();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log into this app.';
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1186337974831392',
    cookie: true,
    xfbml: true,
    version: 'v2.10'
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


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function onLogin() {
  var nameResponse;
  var friendResponse;

  FB.api('/me', function(response) {
    document.getElementById('status').innerHTML =
      '\nThanks for logging in, ' + response.name + '!';
    nameResponse = response;

    //DEFINE USER FRIENDSSSSSSSSZZZZZ

  });

  FB.api('/me/friends', function(response) {
    friendResponse = response;
  });

  if (!checkIfUserExists(nameResponse.id)) {
    var latitude;
    var longitude;
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    addToFirebase(nameResponse.id, nameResponse.name,
      friendResponse.friendsList, latitude, longitude);
  }
};
//FIREBASE

var database = firebase.database();

//Check if new user

function checkIfUserExists(id) {
  database.ref('users/' + id).once('value').then(function(snapshot) {
    return snapshot !== null;
  });
}

// Post data to Firebase

function addToFirebase(id, name, friendsList, latitude, longitude) {
  database.ref('users/' + id).set({
    "name": name,
    "friendsList": friendsList,
    "FBLastUpdated": Date.getTime(),
    "location": {
      "latitude": latitude,
      "longitude": longitude
    },
    "locLastUpdated": Date.getTime(),
  });
}

// Get data from Firebase

function getFriendsList(id) {
  database.ref('users/' + id + '/friendsList').once('value').then(function(snapshot) {
    return snapshot;
  });
}
