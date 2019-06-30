function formNews(){
  document.querySelector("#form-login").innerHTML =
 `  
      <div class="login-form-addnews">
  
      
        <h2 style = "color : black">News control: Add news</h2>
       
        <input type = "text" class="btn btn-primary" id = "countNews" >
        <form>
          <div class="form-group">
            <label style = "color : black" >Main Title</label>
            <textarea class="form-control" rows="1" id="title"></textarea>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label style = "color : black" for="comment">Subheading</label>
            <textarea class="form-control" rows="5" id="sub"></textarea>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label style = "color : black" for="comment">Summary content</label>
            <textarea class="form-control" rows="5" id="summary"></textarea>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label style = "color : black" for="comment">Content</label>
            <textarea class="form-control" rows="5" id="content"></textarea>
          </div>
        </form>
        <button type="submit" class="btn btn-primary btn-block" id = "addNews" onclick = "addNews()">Next</button>
        
        <a href="#"  onclick="formLoginAdmin()"><i class="fa fa-long-arrow-left"></i></a>
        <a style = "margin-left: 93%;" href="#"  onclick="formNews()"><i class="fa fa-plus-square"></i></a>
        
    </div>`
}
function formLoginAdmin(){
  var docRef = db.collection("Account").where("email", "==","admin@gmail.com")
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
          document.querySelector("#form-login").innerHTML = `Information</br>
          ${data.data().name} </br>
          ${data.data().email} </br>
          ${data.data().phone} </br>
          <img class="circular--landscape" width = "20%" src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/images%2Fadmin.jpg?alt=media&token=8dd21850-e9ba-43da-a2ae-d2c82a051ad2" ></br>
          <button class="btn btn-primary" id = "logout" onclick ="logOut()">Log out</button>
          `;
            document.querySelector("#addNews").innerHTML = `<button type="submit" class="btn btn-primary btn-block" onclick = "formNews()" >Manager news</button>`
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
    content : "" + document.getElementById("content").value

  }).then(function () {
    alert("Add news successful!");
  }).catch(function (error) {
    console.error("Error writing document: ", error);
  });
}
News();
function News() {
    const list_div = document.querySelector("#section1");
    let alternate = 1;
      var docRef = db.collection("Score").where("Date", "==","2019-01-01")
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          let i = 1;
          list_div.innerHTML +=`
          
            <div class="overlay">
            <h1 style="font-family:courier;">Content above your video</h1>
            <h2 style="font-family:courier;">Content above your video</h2>
            <h3 style="font-family:courier;">Content above your video</h3>
            <p style="font-family:courier;">Content above your video</p>
            </div>
            <img width = "60%" src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/images%2F${i}.jpg?alt=media&token=98c62ff7-783b-40b8-a93e-41b46c05a238" > 
            </br>
            </br>
          `
          if(i>4){i =1};
        })
      });
}
Schedule();
function Schedule() {
    const list_div = document.querySelector("#section2");

      var docRef = db.collection("Score").where("Date", "==","2019-01-01")
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          list_div.innerHTML +=`
          
              <div class="container">      
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
        })
      });
}
