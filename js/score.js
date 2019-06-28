
var config = {
  apiKey: "AIzaSyBXhP9jGoX0UGV3KpBezbmywwayVehOn64",
  authDomain: "tennis-d904d.firebaseapp.com",
  databaseURL: "https://tennis-d904d.firebaseio.com",
  projectId: "tennis-d904d",
  storageBucket: "tennis-d904d.appspot.com",
  messagingSenderId: "1070894637338"
};
firebase.initializeApp(config);
var db = firebase.firestore();

let existAdd = false;
let login = false;
let set_size = `width = '20' hight = 30 style="text-align:center" `;
var idEdit;
var checkPopup = false;
var check_list_input = true;
var check_account = false;


db.collection('Score').get().then(snap => {
  size = snap.size // will return the collection sizes
  document.getElementById("countData").value ="" + size;
});


function logIn(){
  var docRef = db.collection("Account").where("email", "==","" +document.getElementById("email-login").value)
  docRef.get().then(function (querySnapshot) {
     querySnapshot.forEach( function(data){
        if(document.getElementById("password-login").value == data.data().password){
          alert("Login");
          login = true;
          Login();
        }
        else {
          alert("Wrong password. Try again or click Forgot password to reset it.");
        }
      });
    })
    var docCheck = db.collection("Account").doc("" +document.getElementById("email-login").value)
    docCheck.get().then((data) => {
      if (data.exists) {
        // document exists (online/offline)
      } else {
        alert("Account not exist.")
      }
    })
}

function logOut(){
  alert("Log out admin");
  document.querySelector("#addNews").innerHTML = ""
  login = false
  Login();
}
function CreateAccount(){
  document.querySelector("#form-login").innerHTML = `
  <div class="login-form">
        <h2 style="color: black" class="text-center">Register</h2>     
        <div class="form-group">
            <input type="text" class="form-control" placeholder="First name" id = "firstname" required="required">
        </div>  
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Last name" id = "lastname" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" id = "password" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Confirm" id = "confirm" required="required">
        </div>
        <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" id = "email" required="required">
        </div>
        <div class="form-group">
            <input type="number" class="form-control" placeholder="Phone" id = "phone" required="required">
        </div>
        <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" id = "account" onclick ="Account()">Next</button>
          </div>
  </div>`
}
function Account(){
  if(document.getElementById("password").value != document.getElementById("confirm").value){
    document.getElementById("formAccount").innerHTML +=`
    <div class="alert alert-danger">
    <strong>Danger!</strong> Those passwords didn't match. Try again.
  </div>`
    
  }else{
    $(document).ready(function(){
      db.collection("Account").doc("" + document.getElementById("email").value).set({
        name : document.getElementById("firstname").value +" " + document.getElementById("lastname").value ,
        password : "" + document.getElementById("password").value,
        email : "" + document.getElementById("email").value ,
        phone : "" + document.getElementById("phone").value
    
      }).then(function () {
        alert("Register successful!");
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });
    });
  }
  Login();
}
function Login(){
  if(login == true){
    if(existAdd == false){
      document.getElementById("inline-popups").innerHTML += '<a href="#test-popup" data-effect="mfp-zoom-in" onclick="list_input()"><i class="fa fa-plus-square"></i></a>';
    }    
    $('button[id^="delete"]').show();
    $('button[id^="edit"]').show();
    existAdd = true;
    var docRef = db.collection("Account").where("email", "==","" + document.getElementById("email-login").value)
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){

        if(login == true){
          document.querySelector("#form-login").innerHTML = `Information</br>
          ${data.data().name} </br>
          ${data.data().email} </br>
          ${data.data().phone} </br>
          <img class="circular--landscape" width = "20%" src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/images%2Fadmin.jpg?alt=media&token=8dd21850-e9ba-43da-a2ae-d2c82a051ad2" ></br>
          <button class="btn btn-primary" id = "logout" onclick ="logOut()">Log out</button>
          `;
          if(data.data().email == "admin@gmail.com"){
            document.querySelector("#addNews").innerHTML = `<a href="img.html" target="_blank">Continue</a>`
            
          }
          else {
            document.querySelector("#addNews").innerHTML = "";
          }
        }
      })
    });
  
  }
  if(login == false){
    $('button[id^="delete"]').hide();
    $('button[id^="edit"]').hide();
    document.getElementById("inline-popups").innerHTML = '';
    document.querySelector("#form-login").innerHTML = `
    <div class="login-form" >
          <h2 style="color: black" class="text-center">Log in</h2>       
          <div class="form-group">
              <input type="email" class="form-control" placeholder="Username" id = "email-login" required="required">
          </div>
          <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" id = "password-login" required="required">
          </div>
          <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" id = "login" onclick ="logIn()">Log in</button>
          </div>
          <div class="clearfix">
              <label style="color: black" class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
              <a href="#" class="pull-right">Forgot Password?</a>
          </div>        
     
      <p class="text-center" onclick = "CreateAccount()"><a href="#">Create an Account</a></p>
    </div>`
  }
}

function updateKey()
{
    var key=$("#title").val();
    key=key.replace(" ","_");
    $("#url_key").val(key);
}

function editData(id){
  document.querySelector("#inline-popups").innerHTML +=`
  <a href="#test-popup" id ="` + id + `" data-effect="mfp-zoom-in" onclick="list_input()"></a>
  `;
  idEdit = id;
  document.getElementById("" + id).click();
}

scoreData();
function scoreData() {
  const list_div = document.querySelector("#list-score");
  let inputDatetime =""+ $('#datetime').val();

  console.log(login);
  if(checkCount != inputDatetime || checkPopup == true){
    $('#list-score').empty();
    var docRef = db.collection("Score").where("Date", "==","2019-01-01")
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
        let imgW = data.data().Winner;
        let imgL = data.data().Loser;
        imgW = imgW.replace(" ","%20");
        imgL = imgL.replace(" ","%20");
        if(login == true){
          list_div.innerHTML += 
          
          `
          <div class="container">      
          <button class="btn" id =   "edit${data.data().ID}" onclick =   "editData(${data.data().ID})" ><i class="fa fa-edit"></i></button> 
          <button class="btn" id = "delete${data.data().ID}" onclick = "deleteData(${data.data().ID})" ><i class="fa fa-trash"></i></button> 
                    <div class="row align-items-center mb-5">
                   
                      <div class="col-md-12">
            
                        <!-- END row -->
                        <style>
                        .btn {
                          background-color: DodgerBlue;
                          border: none;
                          color: white;
                          padding: 12px 16px;
                          font-size: 16px;
                          cursor: pointer;
                        }
                        
                        /* Darker background on mouse-over */
                        .btn:hover {
                          background-color: RoyalBlue;
                        }
                        </style>
                        
                        <div class="row bg-white align-items-center ml-0 mr-0 py-4 match-entry">
                        
                          <div class="col-md-4 col-lg-4 mb-4 mb-lg-0">
                          
                            <div class="text-center text-lg-left">
                              <div class="d-block d-lg-flex align-items-center">
                                <div class="image image-small text-center mb-3 mb-lg-0 mr-lg-3">
                                  <img class="circular--landscape" src="https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/flags/${data.data().Winner}.png" width ="200px" alt="Image" class="img-fluid">
                                </div>
                                <div class="text">
                                  <h3 class="h5 mb-0 text-black">${data.data().Winner}</h3>
                                  <span class="text-uppercase small country">Brazil</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4 text-center mb-4 mb-lg-0">
                            <div class="d-inline-block">
                              <div class="bg-black py-2 px-4 mb-2 text-white d-inline-block rounded"><span class="h5">
                              ${data.data().W1}:${data.data().L1}</br>
                              ${data.data().W2}:${data.data().L2}</br>
                              ${data.data().W3 != "undefined" ? + data.data().W3 : ""}
                              ${data.data().L3 != "undefined" ? + data.data().L3 : ""}
                              </span></div>
                            </div>
                          </div>
            
                          <div class="col-md-4 col-lg-4 text-center text-lg-right">
                            <div class="">
                              <div class="d-block d-lg-flex align-items-center">
                                <div class="image image-small ml-lg-3 mb-3 mb-lg-0 order-2">
                                  <img class="circular--landscape" src="https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/flags/${data.data().Loser}.png" width ="200px" alt="Image" class="img-fluid">
                                </div>
                                <div class="text order-1 w-100">
                                  <h3 class="h5 mb-0 text-black">${data.data().Loser}</h3>
                                  <span class="text-uppercase small country">London</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               `   
        }
        else{
          list_div.innerHTML += 
          `
          <div class="container">      
          <button class="btn" id =   "edit${data.data().ID}" onclick =   "editData(${data.data().ID})" style="display: none;"><i class="fa fa-edit"></i></button> 
          <button class="btn" id = "delete${data.data().ID}" onclick = "deleteData(${data.data().ID})" style="display: none;"><i class="fa fa-trash"></i></button> 
                    <div class="row align-items-center mb-5">
                   
                      <div class="col-md-12">
            
                        <!-- END row -->
                        <style>
                        .btn {
                          background-color: DodgerBlue;
                          border: none;
                          color: white;
                          padding: 12px 16px;
                          font-size: 16px;
                          cursor: pointer;
                        }
                        
                        /* Darker background on mouse-over */
                        .btn:hover {
                          background-color: RoyalBlue;
                        }
                        </style>
                        
                        <div class="row bg-white align-items-center ml-0 mr-0 py-4 match-entry">
                        
                          <div class="col-md-4 col-lg-4 mb-4 mb-lg-0">
                          
                            <div class="text-center text-lg-left">
                              <div class="d-block d-lg-flex align-items-center">
                                <div class="image image-small text-center mb-3 mb-lg-0 mr-lg-3">
                                  <img src="https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/flags/${data.data().Winner}.png" width ="200px" alt="Image" class="img-fluid">
                                </div>
                                <div class="text">
                                  <h3 class="h5 mb-0 text-black">${data.data().Winner}</h3>
                                  <span class="text-uppercase small country">Brazil</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4 text-center mb-4 mb-lg-0">
                            <div class="d-inline-block">
                              <div class="bg-black py-2 px-4 mb-2 text-white d-inline-block rounded"><span class="h5">
                              ${data.data().W1}:${data.data().L1}</br>
                              ${data.data().W2}:${data.data().L2}</br>
                              ${data.data().W3 != "undefined" ? + data.data().W3 : ""}
                              ${data.data().L3 != "undefined" ? + data.data().L3 : ""}
                              </span></div>
                            </div>
                          </div>
            
                          <div class="col-md-4 col-lg-4 text-center text-lg-right">
                            <div class="">
                              <div class="d-block d-lg-flex align-items-center">
                                <div class="image image-small ml-lg-3 mb-3 mb-lg-0 order-2">
                                  <img src="https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/flags/${data.data().Loser}.png" width ="200px" alt="Image" class="img-fluid">
                                </div>
                                <div class="text order-1 w-100">
                                  <h3 class="h5 mb-0 text-black">${data.data().Loser}</h3>
                                  <span class="text-uppercase small country">London</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               `   
        }
      })
    });
    checkCount = document.getElementById("countData").value;
    
  }
 Login();
}

function deleteData(id){
  checkPopup = true;
  $(document).ready(function(){
    
      db.collection("Score").doc("2019."+id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  });

  scoreData();
  checkPopup = false;
  db.collection('Score').get().then(snap => {
    size = snap.size // will return the collection sizes
    document.getElementById("countData").value ="" + size;
  });
}


function storeData(start) {

  var url = "https://raw.githubusercontent.com/NguyenTanPhucK11/tennis123/master/2019.json";

  $(document).ready(function () {
    $.getJSON(url, function (data) {
      // if else use determined update new or update list since delete 
      for (let i = 0; i < 30;i++) {                             // delete id = start
        db.collection("Score").doc("2019." + i).set({
          ID : "" + i,                                        // **** id = j because delete id = start
          ATP: "" + data["2019"][i]["ATP"],
          Location: "" + data["2019"][i]["Location"],
          Tournament: "" + data["2019"][i]["Tournament"],
          Date: "" + data["2019"][i]["Date"],
          Series: "" + data["2019"][i]["Series"],
          Court: "" + data["2019"][i]["Court"],
          Surface: "" + data["2019"][i]["Surface"],
          Round: "" + data["2019"][i]["Round"],
          Best: "" + data["2019"][i]["Best of"],
          Winner: "" + data["2019"][i]["Winner"],
          Loser: "" + data["2019"][i]["Loser"],
          WRank: "" + data["2019"][i]["WRank"],
          LRank: "" + data["2019"][i]["LRank"],
          WPts: "" + data["2019"][i]["WPts"],
          LPts: "" + data["2019"][i]["LPts"],
          W1: "" + data["2019"][i]["W1"],
          L1: "" + data["2019"][i]["L1"],
          W2: "" + data["2019"][i]["W2"],
          L2: "" + data["2019"][i]["L2"],
          W3: "" + data["2019"][i]["W3"],
          L3: "" + data["2019"][i]["L3"],
          Wsets: "" + data["2019"][i]["Wsets"],
          Lsets: "" + data["2019"][i]["Lsets"],
          Comment: "" + data["2019"][i]["Comment"],
          B365W: "" + data["2019"][i]["B365W"],
          B365L: "" + data["2019"][i]["B365L"],
          PSW: "" + data["2019"][i]["PSW"],
          PSL: "" + data["2019"][i]["PSL"],
          MaxW: "" + data["2019"][i]["MaxW"],
          MaxL: "" + data["2019"][i]["MaxL"],
          AvgW: "" + data["2019"][i]["AvgW"],
          AvgL: "" + data["2019"][i]["AvgL"],
        }).then(function () {
          console.log("Document successfully written!");
        }).catch(function (error) {
          console.error("Error writing document: ", error);
        });
      }

    });
  });
}

function list_input(){
  Field("Location");
  Field("Winner");
  Field("W1");
  Field("W2");
  Field("W3");
  Field("Loser");
  Field("L1");
  Field("L2");
  Field("L3");
  if(check_list_input == true){
    document.querySelector("#test-popup").innerHTML +=`
  
    <div class="col-sm-12 text-center">
        <button class="btn btn-primary" title="Submit" onclick = "add_score()">Add score</button>
        <button class="btn btn-primary" title="Submit" onclick = "update_score(idEdit)">Update score</button>
    </div>
   `;
  }
  check_list_input = false;
}

async function Field(Field){
  const field = Field;
  const arrayField =  Array();
  var list_input = document.querySelector("#test-popup");
  if(check_list_input == true){
    list_input.innerHTML += `
    <input type="text" id="`+ field +`" onkeyup="myFunction('`+field+`')" onClick="document.getElementById('`+ field +`UL').style.display='block'" placeholder="`+field+`" title="Type in a name"></br>
    <ul id="`+ field +`UL"> </ul>    `;
  }
  var docRef = db.collection("Score");
  await docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
          var alreadyExist = false;
          for(let i = 0;i < arrayField.length ; i++){
              if(data.data()[field] == arrayField[i]){
                  alreadyExist = true;
                  i = arrayField.length;
              }           
          }
          if(alreadyExist != true){
              arrayField.push("" + data.data()[field]);
          }        
      })
  });
  document.getElementById("" + field + "UL").style.display = "none";
  $(document).ready(function(){
      list_li = document.querySelector("#" + field +"UL");
      for(let i = 0;i < arrayField.length ; i++){
          list_li.innerHTML += '<li data-city-value = "' + arrayField[i] + '" ><a href="#">' + arrayField[i] + '</a></li>';
          Element++;
      }     
      $("#" + field + "UL").on('click','li', function(e) {
          var city = $(this).data('city-value');
          document.getElementById("" + field).value = "" + city ;
      });
  });
  if(arrayField.length > 5)
      document.getElementById(field+ "UL").style.height = 5*47 + "px";
  else
      document.getElementById(field+ "UL").style.height = arrayField.length*47 + "px";
  window.addEventListener('mouseup',function(event){
      var pol = document.getElementById(field + 'UL');
      if(event.target != pol && event.target.parentNode != pol){
          pol.style.display = 'none';
      }
  });
}

function myFunction(Field) {
  
  const field = Field;
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("" + field);
  filter = input.value.toUpperCase();
  ul = document.getElementById(field + "UL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
  
}

function update_score(id){
  
  if(document.getElementById("Location").value != "" &&
  document.getElementById("Winner").value != "" &&
  document.getElementById("W1").value != "" &&
  document.getElementById("W2").value != "" && 
  document.getElementById("W3").value != "" &&
  document.getElementById("Loser").value != "" &&
  document.getElementById("L1").value != "" &&
  document.getElementById("L2").value != "" &&
  document.getElementById("L3").value != "" )
  {
    checkPopup = true;
    $(document).ready(function(){
      db.collection("Score").doc("2019." + id).update({
        Location:"" + document.getElementById("Location").value,
        Winner:"" + document.getElementById("Winner").value,
        W1:"" + document.getElementById("W1").value,
        W2:"" + document.getElementById("W2").value,
        W3:"" + document.getElementById("W3").value,
        Loser:"" + document.getElementById("Loser").value,
        L1:"" + document.getElementById("L1").value,
        L2:"" + document.getElementById("L2").value,
        L3:"" + document.getElementById("L3").value,
        })
        .then(function() {
            console.log( document.getElementById("Location").value);
        });
    });
    scoreData();
    checkPopup =false;
  }
  else{
    alert("Please enter full information")
  }
}

function add_score(){
  $(document).ready(function(){
    db.collection("Score").doc().set({
        Date : "2019-01-01" , 
        Location : "" + document.getElementById("Location").value,
        Winner : "" + document.getElementById("Winner").value,
        Loser :"" + document.getElementById("Loser").value,
        
        W1 :"" + document.getElementById("W1").value,
        W2:"" + document.getElementById("W2").value,
        W3:"" + document.getElementById("W3").value,
        L1:"" + document.getElementById("L1").value,
        L2:"" + document.getElementById("L2").value,
        L3:"" + document.getElementById("L3").value,

      }).then(function () {
        console.log("Document successfully written!");
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });
  });
}



$(document).ready(function(){
  $('#inline-popups').magnificPopup({
    delegate: 'a',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function() {
         this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });
  
  
  // Image popups
  $('#image-popups').magnificPopup({
    delegate: 'a',
    type: 'image',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup 
         this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
         this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });
  
  
  // Hinge effect popup
  $('a.hinge').magnificPopup({
    mainClass: 'mfp-with-fade',
    removalDelay: 1000, //delay removal by X to allow out-animation
    callbacks: {
      beforeClose: function() {
          this.content.addClass('hinge');
      }, 
      close: function() {
          this.content.removeClass('hinge'); 
      }
    },
    midClick: true
  });
})
// date-time picker
$(document).ready(function(){
  $('.form_datetime').datetimepicker({
    //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
  });
  $('.form_date').datetimepicker({
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
  });
  $('.form_time').datetimepicker({
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
  });
});