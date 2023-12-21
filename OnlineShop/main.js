
$('#searchBar').keyup(function(){
    let input = $('#searchBar').val().toLowerCase();
    $('.ProductName').each(function(){
      if($(this).text().toLowerCase().indexOf(input) > -1){
        $(this).parent().show();
      } else {
        $(this).parent().hide();
      }
    });
  });
  




let Sign_inSection = document.getElementById("Sign_in-section");
let Sign_in = document.getElementById("Sign_in");

function SignIn(){
    Sign_inSection.style.display = "block";

}
function hidePopup(){
    Sign_inSection.style.display = "none"
}

Sign_in.addEventListener("click", SignIn);




function Popup() {
  var popup = document.getElementById("Cart_section");
  popup.classList.toggle("show");
}



  document.addEventListener("DOMContentLoaded", function () {
    const brandContainer = document.getElementById("brandContainer");

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreBrands();
        }
    });

    observer.observe(brandContainer.lastElementChild);

    function loadMoreBrands() {

        const originalImages = brandContainer.querySelectorAll('img');
        const clonedImages = Array.from(originalImages).map(img => img.cloneNode(true));

  
        clonedImages.forEach((clonedImage) => {
            brandContainer.appendChild(clonedImage);
        });
    }
});
