// Complete order function/listeners
const completeOrderHandler = async (event) => {
  event.preventDefault();

  let pressedButton = event.target;
  const id = parseInt(pressedButton.getAttribute("data-id"));

  const response = await fetch("/api/table/complete", {
    method: "PUT",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }

  window.location.reload();
};

let completeButtons = document.querySelectorAll(".complete");

completeButtons.forEach((button) => {
  button.addEventListener("click", completeOrderHandler);
});

// Request server function/listeners
const serverResponseHandler = async (event) => {
  event.preventDefault();

  let buttonPress = event.target;
  const request_id = parseInt(buttonPress.getAttribute("data-id"));

  const response = await fetch("/api/table/response", {
    method: "PUT",
    body: JSON.stringify({ request_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(JSON.stringify(response));
  }

  window.location.reload();
};

let serverButtons = document.querySelectorAll(".serverResponse");

serverButtons.forEach((button) => {
  button.addEventListener("click", serverResponseHandler);
});

// Logout button
const logout = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);

setInterval(function() {
  window.location.reload();
}, 30000); 

setInterval() 