const tableFormHandler = async (event) => {
  event.preventDefault();

  // get info from form
  const table_number = parseInt(
    document.querySelector("#tableNumber").value.trim()
  );

  if (table_number) {
    // Send a POST request server
    const response = await fetch("/api/table/create", {
      method: "POST",
      body: JSON.stringify({ table_number }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //  redirect the browser to the control page
      document.location.replace("/menu");
    } else {
      alert(JSON.stringify(response));
    }
  }
};

document
  .querySelector(".table-form")
  .addEventListener("click", tableFormHandler);

// document
//   .querySelector(".table-form")
//   .addEventListener("submit", newFormHandler);
