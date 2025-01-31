// filter projects
document.addEventListener("DOMContentLoaded", function () {
  const mixer = mixitup('.mix-container');

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
      const activeButton = document.querySelector('.filter-btn.active');
      if (activeButton) activeButton.classList.remove('active');
      this.classList.add('active');
    });
  });
});





//change active buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(button => {
      button.addEventListener("click", function () {
          buttons.forEach(btn => {
              btn.classList.remove("bg-assent-secondary", "text-[#fff]");
              btn.classList.add("bg-white", "text-assent-secondary" , "border" , "border-[#ccc]");
          });

          this.classList.remove("bg-white", "text-assent-secondary");
          this.classList.add("bg-assent-secondary", "text-[#fff]");
      });
  });
});


// up and down button
let btn = document.querySelector(".top");
window.onscroll = function (){
  if(window.scrollY >= 600){
    btn.style.display = "block";
  }else{
    btn.style.display = "none";
  }
}

btn.onclick = function(){
  window.scrollTo({
    left : 0,
    top : 0,
    behavior : "smooth"
  });
}




// notification message
setTimeout(function(){
  var notification = document.getElementById("Notification");
  notification.classList.add("show");
},1000)

function closeNotification(){
  var notification = document.getElementById("Notification");
  notification.classList.remove("show");
}







// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".filter-btn");

//   buttons.forEach(button => {
//       button.addEventListener("click", function () {
//           if (this.classList.contains("bg-assent-secondary")) {

//               this.classList.remove("bg-assent-secondary", "text-[#fff]");
//               this.classList.add("bg-white", "text-assent-secondary");
//           } else {

//               this.classList.remove("bg-white", "text-assent-secondary");
//               this.classList.add("bg-assent-secondary", "text-white");
//           }
//       });
//   });
// });
