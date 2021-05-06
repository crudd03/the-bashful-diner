//when item selected from menu, it is added to cart table
//when guest clicks "Remove" the row and item is deleted
//when guest clinks "Customize" a modal pops up for guest to type in modification
//when guest clicks "Submit Order" the selected items are sent to the staff side
//When guest clicks "Request Server" the staff side is notified by table number
//When guest clicks "Menu" they are returned to the Menu page

const submitOrderHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/table/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }
};

document
  .querySelector("#submitOrder")
  .addEventListener("click", submitOrderHandler);

const deleteItemHandler = async (event) => {
  event.preventDefault();

  let pressedButton = event.target;
  const id = parseInt(pressedButton.getAttribute("data-id"));

  // Send a POST request server
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
