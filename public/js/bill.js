const requestCashOut = async (event) => {
  event.preventDefault();
  swal.fire({
    title: 'Would you like to conclude your dining experience?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#46c496',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Please bring my Tab!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        iconColor: '#46c496',
        title: 'Thank You!',
        text: 'Your server will be with you shortly!',
        showConfirmButton: true,
      }).then(async () => {

        const response = await fetch("/api/table/request", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          alert(JSON.stringify(response));
        }

        const logoutResponse = await fetch("/api/user/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (logoutResponse.ok) {
          document.location.replace("/");
        } else {
          alert(response.statusText);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No Worries!',
        text: 'Enjoy the Rest of your visit!',
        showConfirmButton: false,
        timer: 2000
      })
    }
  })
}
document
  .querySelector("#requestServer")
  .addEventListener("click", requestCashOut);



//view cart button
const viewCart = document.querySelector('viewCartBtn');
viewCart.addEventListener('click', () => {
  document.location.replace("/cart");
});

//menu button
document.querySelector("#menuBtn").addEventListener("click", function () {
  document.location.replace("/bill");
});