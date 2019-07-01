
function formLoginAdmin(){
  var docRef = db.collection("Account").where("email", "==","admin@gmail.com")
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
        document.querySelector("#form-login").innerHTML = ` <div class >
        ${data.data().name} </br>
        ${data.data().email} </br>
        ${data.data().phone} </br>
        <img class="circular--landscape" width = "20%" src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/images%2Fadmin.jpg?alt=media&token=8dd21850-e9ba-43da-a2ae-d2c82a051ad2" ></br>
        <div style = "height : 10px"><div>
        <button class="btn btn-primary" id = "logout" onclick ="logOut()">Log out</button>
        <div class = "login-form-feedback">
        <div class="form-group" >
          <button type="submit" class="btn btn-primary btn-block" id = "showfeedback" onclick = "ShowFeedBack()">Show feed back</button>
          <div id ="showfeedback-d" style = "color : black ">
          </div>
        </div>
        </div>`
          if(data.data().email == "admin@gmail.com"){
            document.querySelector("#addNews").innerHTML = `<button type="submit" class="btn btn-primary btn-block" onclick = "formNews()" >Manager news</button>`
            
          }
          else {
            document.querySelector("#addNews").innerHTML = "";
          }
            
      })
    });
}
let checkcountNews = 0;

async function addNews(){
  await db.collection('News').get().then(snap => {
    size = snap.size // will return the collection sizes
    checkcountNews = size;
  });
  db.collection("News").doc("" + checkcountNews ).set({
    main : "" + document.getElementById("title").value ,
    sub : "" + document.getElementById("sub").value,
    summary : "" + document.getElementById("summary").value ,
    content : "" + document.getElementById("content").value,
    Date : "" + document.getElementById("countNewsTime").value,
    ID : "" + checkcountNews 
  }).then(function () {
    News();
    alert("Add news successful!");
  }).catch(function (error) {
    console.error("Error writing document: ", error);
  });
}

let isLoopDate ;
let idNews;
$('#datetimeNews').val(formatted_date);
News();
async function News() {
  let datetime_news =document.getElementById("datetimeNews").value;
  document.querySelector("#section1").innerHTML =``;
    
    const list_div = document.querySelector("#section1");
    let i = 1;
    console.log(datetime_news);
      
      var docRef = db.collection("News").where("Date", "==","" + datetime_news)
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          list_div.innerHTML +=`
          
            <div class="overlay" >
            <h1 style="font-family: "Times New Roman", Times, serif;"><a href="#"  onclick="fullNews(${data.data().ID})">${data.data().main}</a></h1>
            <h2 style="font-family: "Times New Roman", Times, serif;">${data.data().sub}</h2></br>
            <h3 style="font-family: "Times New Roman", Times, serif;">${data.data().Date}</h3>
            
            </div>
            <img width = "30%" src="https://firebasestorage.googleapis.com/v0/b/tennis-9c684.appspot.com/o/image%2F`+i+`.jpg?alt=media&token=753d5181-4039-412b-8de3-45f4af557ada" > 
            </br>
            </br>
          `;
          i++;
          if(i>21){i=1};
        })
      });
       
}
function fullNews(ID){
  idNews = ID;
  var docRef = db.collection("News").where("ID", "==","" + idNews)
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          
          document.querySelector("#section1").innerHTML =`
            <div class="overlayRight" style = "border-style: inset;" >
            <a href="#"  onclick="News()"><i class="fa fa-long-arrow-left">BACK</i></a>
            <h1 style="font-family: "Times New Roman", Times, serif;">${data.data().main}</h1>
            <h2 style="font-family: "Times New Roman", Times, serif;">${data.data().sub}</h2></br>
            <h3 style="font-family: "Times New Roman", Times, serif;">${data.data().content}</h3>
            <h3 style="font-family: "Times New Roman", Times, serif;">${data.data().Date}</h3>
            
            </div>
            
            </br>
            </br>
          `;
        })
      });
      isLoopDate = null;
}
var exitsNP = false;
$('#datetimeSchedule').val(formatted_date);

Schedule();
function Schedule() {
    const list_div = document.querySelector("#section2");
      list_div.innerHTML = ``;
      var docRef = db.collection("Score").where("Date", "==","" + document.getElementById("datetimeSchedule").value)
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          if(isAdmin == true){
          $('button[id^="deleteS"]').show();
            
          }
          list_div.innerHTML +=`
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
                                  <span class="text-uppercase small country">${data.data().Location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4 text-center mb-4 mb-lg-0">
                            <div class="d-inline-block">
                              <div class="bg-black py-2 px-4 mb-2 text-white d-inline-block rounded"><span class="h5">

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
                                  <span class="text-uppercase small country">${data.data().Location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        `
        })
      });
}

function deleteDataS(id){
  $(document).ready(function(){
    
      db.collection("Schedule").doc(""+id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  });

  Schedule();
}
let day_schedule = current_datetime.getDate();
let month_schedule = current_datetime.getMonth()+ 1;
let year_schedule = current_datetime.getFullYear();
if( current_datetime_month < 10 ){
  current_datetime_month = "0" + current_datetime_month;
}
if( current_datetime_day < 10 ){
  current_datetime_day = "0" + current_datetime_day;
}


function PrevNews(){
  day_schedule--;
  if(day_schedule == 0){
    if(month_schedule == 5 ||month_schedule == 7 ||month_schedule == 10 ||month_schedule == 12){
      month_schedule -= 1;
      day_schedule = 30;
    }
  }else if(day_schedule == 0){
    if(month_schedule == 2 || month_schedule == 4 ||month_schedule == 6 ||month_schedule == 9 ||month_schedule == 11||month_schedule == 1||month_schedule == 8 ){
      month_schedule -= 1;
      day_schedule = 31;
    }
  }
  if (((year_schedule % 4 == 0) && (year_schedule % 100!= 0)) || (year_schedule %400 == 0)){
    if(month_schedule == 3 && day_schedule == 0){
      month_schedule --;
      day_schedule = 29;
    }
  }else{
    if(month_schedule == 3 && day_schedule == 0){
      month_schedule --;
      day_schedule =28;
    }
  }
  let formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-" +day_schedule;
  if(day_schedule<10){
    formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-0" +day_schedule;
  }
  if(month_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-" +day_schedule;
  }
  if(month_schedule<10 && day_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-0" +day_schedule;
  }
  $('#datetimeNews').val(formatted_date_schedule);
  News();
}
function NextNews(){
  day_schedule ++ ;
  if(day_schedule == 32){
    if(month_schedule == 1 ||month_schedule == 3 ||month_schedule == 5 ||month_schedule == 7 ||month_schedule == 8 ||month_schedule == 10 ||month_schedule == 12){
      month_schedule += 1;
      day_schedule = 1;
    }
  }else if(day_schedule == 31){
    if(month_schedule == 4 || month_schedule == 4 ||month_schedule == 6 ||month_schedule == 9 ||month_schedule == 11 ){
      month_schedule += 1;
      day_schedule = 1;
    }
  }
  if (((year_schedule % 4 == 0) && (year_schedule % 100!= 0)) || (year_schedule %400 == 0)){
    if(month_schedule == 2 && day_schedule == 29){
      month_schedule++;
      day_schedule =1;
    }
  }else{
    if(month_schedule == 2 && day_schedule == 28){
      month_schedule++;
      day_schedule =1;
    }
  }
  let formatted_date_schedule ;
  if(day_schedule<10){
    formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-0" +day_schedule;
  }
  if(month_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-" +day_schedule;
  }
  if(month_schedule<10 && day_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-0" +day_schedule;
  }
  $('#datetimeNews').val(formatted_date_schedule);
  News();
}

function PrevSchedule(){
  day_schedule--;
  if(day_schedule == 0){
    if(month_schedule == 5 ||month_schedule == 7 ||month_schedule == 10 ||month_schedule == 12){
      month_schedule -= 1;
      day_schedule = 30;
    }
  }else if(day_schedule == 0){
    if(month_schedule == 2 || month_schedule == 4 ||month_schedule == 6 ||month_schedule == 9 ||month_schedule == 11||month_schedule == 1||month_schedule == 8 ){
      month_schedule -= 1;
      day_schedule = 31;
    }
  }
  if (((year_schedule % 4 == 0) && (year_schedule % 100!= 0)) || (year_schedule %400 == 0)){
    if(month_schedule == 3 && day_schedule == 0){
      month_schedule --;
      day_schedule = 29;
    }
  }else{
    if(month_schedule == 3 && day_schedule == 0){
      month_schedule --;
      day_schedule =28;
    }
  }
  let formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-" +day_schedule;
  if(day_schedule<10){
    formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-0" +day_schedule;
  }
  if(month_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-" +day_schedule;
  }
  if(month_schedule<10 && day_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-0" +day_schedule;
  }
  $('#datetimeSchedule').val(formatted_date_schedule);
  Schedule();
}
function NextSchedule(){
  day_schedule ++ ;
  if(day_schedule == 32){
    if(month_schedule == 1 ||month_schedule == 3 ||month_schedule == 5 ||month_schedule == 7 ||month_schedule == 8 ||month_schedule == 10 ||month_schedule == 12){
      month_schedule += 1;
      day_schedule = 1;
    }
  }else if(day_schedule == 31){
    if(month_schedule == 4 || month_schedule == 4 ||month_schedule == 6 ||month_schedule == 9 ||month_schedule == 11 ){
      month_schedule += 1;
      day_schedule = 1;
    }
  }
  if (((year_schedule % 4 == 0) && (year_schedule % 100!= 0)) || (year_schedule %400 == 0)){
    if(month_schedule == 2 && day_schedule == 29){
      month_schedule++;
      day_schedule =1;
    }
  }else{
    if(month_schedule == 2 && day_schedule == 28){
      month_schedule++;
      day_schedule =1;
    }
  }
  let formatted_date_schedule ;
  if(day_schedule<10){
    formatted_date_schedule = year_schedule  + "-" + month_schedule  + "-0" +day_schedule;
  }
  if(month_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-" +day_schedule;
  }
  if(month_schedule<10 && day_schedule<10){
    formatted_date_schedule = year_schedule  + "-0" + month_schedule  + "-0" +day_schedule;
  }
  $('#datetimeSchedule').val(formatted_date_schedule);
  Schedule();
}
