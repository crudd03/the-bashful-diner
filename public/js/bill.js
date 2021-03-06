const requestCashOut = async (event) => {
  event.preventDefault();
  swal
    .fire({
      title: "Would you like to conclude your dining experience?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#46c496",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes. Please bring my Tab!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          iconColor: "#46c496",
          title: "Thank You!",
          text: "Your server will be with you shortly!",
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
          icon: "error",
          title: "No Worries!",
          text: "Enjoy the Rest of your visit!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
};
document.querySelector("#cashOut").addEventListener("click", requestCashOut);

// Request server button
const requestServerHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/table/request", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  Swal.fire({
    toast: true,
    position: 'center-center',
    icon: 'success',
    iconColor: '#46c496',
    title: 'Your server should be with you shortly',
    showConfirmButton: false,
    timer: 3000
  })

  if (!response.ok) {
    alert(JSON.stringify(response));
  }
};

document
  .querySelector("#requestServer")
  .addEventListener("click", requestServerHandler);
