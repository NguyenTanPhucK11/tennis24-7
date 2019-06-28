
News();
function News() {
    const list_div = document.querySelector("#section1");

      var docRef = db.collection("Score").where("Date", "==","2019-01-01")
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          list_div.innerHTML +=`
         
          <div class="overlay">
          <h1 style="font-family:courier;">Content above your video</h1>
          <h2 style="font-family:courier;">Content above your video</h2>
          <h3 style="font-family:courier;">Content above your video</h3>
          <p style="font-family:courier;">Content above your video</p>
          </div>
          <img width = "30%" src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/images%2Fphoto-1527672809634-04ed36500acd.jpg?alt=media&token=98c62ff7-783b-40b8-a93e-41b46c05a238" > 
          </br>
          </br>
        `
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
