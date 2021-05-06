// sums for bill
// call server button
const requestServerHandler = async (event) => {
  event.preventDefault();

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
};

document
  .querySelector("#requestServer")
  .addEventListener("click", requestServerHandler);
