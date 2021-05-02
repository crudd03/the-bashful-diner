const tableFormHandler = async (event) => {
  event.preventDefault();

  // get info from form
  const table_number = document.querySelector('#tableNumber').value.trim();
  

  if (table_number) {
    // Send a POST request server
    const response = await fetch('/api/table/login', {
      method: 'POST',
      body: JSON.stringify({ table_number}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //  redirect the browser to the control page
      document.location.replace('/menu');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.table-form')
  .addEventListener('submit', tableFormHandler);






document
.querySelector('.table-form')
.addEventListener('submit', newFormHandler);