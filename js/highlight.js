
let i = 1 ;
function Next(){
  const list_div = document.querySelector("#section5");
  i++;
  if(i>17){
    i=1;
  }
  list_div.innerHTML =`
  
  <video width="400" controls>
    <source src="https://firebasestorage.googleapis.com/v0/b/tennis-9c684.appspot.com/o/video%2F${i}.mp4?alt=media&token=f1a95188-3a75-495f-9301-f768dd1c522d" type="video/mp4">
  </video>
  <video width="400" controls>
    <source src="https://firebasestorage.googleapis.com/v0/b/tennis-9c684.appspot.com/o/video%2F${i+1}.mp4?alt=media&token=f1a95188-3a75-495f-9301-f768dd1c522d" type="video/mp4">
  </video>
  </br>
  <div class="col-sm-12 text-center">
    <button class="btn btn-primary" onclick="Prev()">Prev</button>
    <button class="btn btn-primary" onclick="Next()">Next</button>
  </div>
`

}
function Prev(){
  const list_div = document.querySelector("#section5");
  i--;
  if(i<2){i=2};
  list_div.innerHTML =`
  
  <video width="400" controls>
    <source src="https://firebasestorage.googleapis.com/v0/b/tennis-9c684.appspot.com/o/video%2F${i}.mp4?alt=media&token=f1a95188-3a75-495f-9301-f768dd1c522d" type="video/mp4">
  </video>
  <video width="400" controls>
  <source src="https://firebasestorage.googleapis.com/v0/b/tennis-9c684.appspot.com/o/video%2F${i-1}.mp4?alt=media&token=f1a95188-3a75-495f-9301-f768dd1c522d" type="video/mp4">
  </video>
  </br>
  <div class="col-sm-12 text-center">
    <button class="btn btn-primary" onclick="Next()">Next</button>
    <button class="btn btn-primary" onclick="Prev()">Prev</button>
  </div>
`
}