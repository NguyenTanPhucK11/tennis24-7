var arrayHL = [];
Highlight();
async function Highlight() {
   
      let i = 0;
      var docRef = db.collection("Score").where("Date", "==","2019-01-01")
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function(data){
          arrayHL.push(data.data().ID);
        
        })
      });
}
console.log(arrayHL);
let i = 0 ;
function Next(){
  const list_div = document.querySelector("#section5");
  i++;
  console.log(arrayHL[i]);
  list_div.innerHTML =`
  
  <video width="400" controls>
    <source src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/video%2F${arrayHL[i]}.mp4?alt=media&token=c498d7f2-266d-4c60-97cb-a5c1144dc7f8" type="video/mp4">

  </video>
  </br>
  <div class="col-sm-12 text-center">
    <button class="btn btn-primary" onclick="Next()">Next</button>
    <button class="btn btn-primary" onclick="Prev()">Prev</button>
  </div>
`
}
function Prev(){
  const list_div = document.querySelector("#section5");
  console.log(arrayHL[i]);
  i--;
  list_div.innerHTML =`
  
  <video width="400" controls>
    <source src="https://firebasestorage.googleapis.com/v0/b/tennis-d904d.appspot.com/o/video%2F${arrayHL[i]}.mp4?alt=media&token=c498d7f2-266d-4c60-97cb-a5c1144dc7f8" type="video/mp4">

  </video>
  </br>
  <div class="col-sm-12 text-center">
    <button class="btn btn-primary" onclick="Next()">Next</button>
    <button class="btn btn-primary" onclick="Prev()">Prev</button>
  </div>
`
}