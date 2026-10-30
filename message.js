(() => {
  const dialog = document.getElementById('message-dialog');
  if (!dialog) return;
  for (const button of document.querySelectorAll('[data-message-open]')) {
    button.addEventListener('click', () => {
      dialog.showModal();
      document.getElementById('visitor-message').focus();
    });
  }
  dialog.querySelector('[data-message-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('form').addEventListener('submit', (event) => {
    const message = document.getElementById('visitor-message');
    message.setCustomValidity(message.value.trim() ? '' : 'Please enter a message.');
    if (!message.reportValidity()) event.preventDefault();
  });
  document.getElementById('visitor-message').addEventListener('input', (event) => event.target.setCustomValidity(''));
})();
