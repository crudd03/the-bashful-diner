function openMenu(evt, menuItem) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(menuItem).style.display = "block";
  evt.currentTarget.className += " active";
}

// Function/listener for creating a pending order
const menuFormHandler = async (event) => {
  event.preventDefault();

  let pressedButton = event.target;
  const menu_item_id = parseInt(pressedButton.getAttribute("data-id"));

  // Send a POST request server
  const response = await fetch("/api/table/order", {
    method: "POST",
    body: JSON.stringify({ menu_item_id }),
    headers: { "Content-Type": "application/json" },
  });
  Swal.fire({
    toast: true,
    position: 'center-center',
    icon: 'success',
    iconColor: '#46c496',
    title: 'Added to Cart',
    showConfirmButton: false,
    timer: 1000
  })

  if (!response.ok) {
    alert(JSON.stringify(response));
  }
};

let addButtons = document.querySelectorAll(".addToCart");

addButtons.forEach((button) => {
  button.addEventListener("click", menuFormHandler);
});

// Function/listener for requesting server
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
