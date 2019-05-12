// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDnOwuo2b9OnJsVH0ErxUgarks1iKFDRM8",
    authDomain: "cheep-app.firebaseapp.com",
    databaseURL: "https://cheep-app.firebaseio.com",
    projectId: "cheep-app",
    storageBucket: "cheep-app.appspot.com",
    messagingSenderId: "17385407188",
    appId: "1:17385407188:web:b41fa17aaeda8b52"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeUserData(uID,uname){
    Console.log('Write Function Called')

    database.ref('users/'+uID).set({
        username: uname
    });
}
