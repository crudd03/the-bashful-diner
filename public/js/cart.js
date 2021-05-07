

//when guest clinks "Customize" a modal pops up for guest to type in modification
//When guest clicks "Request Server" the staff side is notified by table number

// Submit order button functions/listeners
const submitOrderHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/table/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }

  window.location.reload();
};

document
  .querySelector("#submitOrder")
  .addEventListener("click", submitOrderHandler);

// Delete pending order button functions/listeners
const deleteItemHandler = async (event) => {
  event.preventDefault();

  let pressedButton = event.target;
  const id = parseInt(pressedButton.getAttribute("data-id"));

  const response = await fetch("/api/table/delete", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }

  window.location.reload();
};

let removeButtons = document.querySelectorAll(".remove");

removeButtons.forEach((button) => {
  button.addEventListener("click", deleteItemHandler);
});

// Request server button functions/listeners
const requestServerHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/table/request", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }
};

document
  .querySelector("#requestServer")
  .addEventListener("click", requestServerHandler);

// Customize button function
const customizeHandler = async (event) => {
  event.preventDefault();
  let pressedButton = event.target;
  const id = parseInt(pressedButton.getAttribute("data-id"));

  swal.fire({
    title: 'How would you like to customize your meal?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Send Note',
    showLoaderOnConfirm: true,
    preConfirm: (mod) => {
      return fetch("/api/table/customize", {
        method: "PUT",
        body: JSON.stringify({ id, mod }),
        headers: { "Content-Type": "application/json" },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    
      location.reload();
    })
    
 
  
}














let customizeButtons = document.querySelectorAll(".customize");

customizeButtons.forEach((button) => {
  button.addEventListener("click", customizeHandler);
});
