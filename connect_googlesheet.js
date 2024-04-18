const scriptURL = 'https://script.google.com/macros/s/AKfycbyQI-Ihjfo035Jdu6voODNr8Y_lwrQchsxfkrKpzCIh8fA_-4MJVASwydFA15hRP1Wq/exec';

const form = document.forms['example form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response;
    })
    .then(() => {
      const successNotification = document.getElementById('notification');
      successNotification.textContent = 'Thank you! Your form has been submitted successfully.';
      successNotification.style.display = 'block';
      setTimeout(() => {
        successNotification.style.display = 'none';
        window.location.reload();
      }, 5000);
    })
    .catch(error => {
      console.error('Error!', error.message);
      const errorNotification = document.getElementById('errornotification');
      errorNotification.textContent = 'There was an error submitting the form. Please try again.';
      errorNotification.style.display = 'block';
      setTimeout(() => {
        errorNotification.style.display = 'none';
      }, 5000);
    });
});
