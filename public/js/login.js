const loginFormHandler = async (event) => {
  event.preventDefault();

  // get info from form
  const userName = document.querySelector("#userName").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (userName && password) {
    // Send a POST request server
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //  redirect the browser to the control page
      document.location.replace("/control");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("click", loginFormHandler);
