var config = {
    apiKey: "AIzaSyBXhP9jGoX0UGV3KpBezbmywwayVehOn64",
    authDomain: "tennis-d904d.firebaseapp.com",
    databaseURL: "https://tennis-d904d.firebaseio.com",
    projectId: "tennis-d904d",
    storageBucket: "tennis-d904d.appspot.com",
    messagingSenderId: "1070894637338"
  };
  firebase.initializeApp(config);
  
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  fileButton.addEventListener('change', function(e){
    var file =e.target.files[0];
    var storageRef = firebase.storage().ref('sweet_gifs/' + "2");
    var task = storageRef.put(file);
    task.on('state_changed',
    function progress(snapshot){
        var percentage = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
        uploader.value = percentage;
        if(percentage==100){
          console.log("okey");
        }
    },
    function error(err){
    },
    
    );
    
  });