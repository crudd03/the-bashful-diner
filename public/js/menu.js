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

//event listeners for...
//view cart and view bill

const menuFormHandler = async (event) => {
  event.preventDefault();

  // get info from form

  let pressedButton = event.target;
  const menu_item_id = parseInt(pressedButton.getAttribute("data-id"));

  // Send a POST request server
  const response = await fetch("/api/table/order", {
    method: "POST",
    body: JSON.stringify({ menu_item_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }
};

let addButtons = document.querySelectorAll(".addToCart");

addButtons.forEach((button) => {
  button.addEventListener("click", menuFormHandler);
});
