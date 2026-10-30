(() => {
  const dialog = document.getElementById('message-dialog');
  if (!dialog) return;
  const form = dialog.querySelector('form');
  const message = document.getElementById('visitor-message');
  const email = document.getElementById('visitor-email');
  const status = document.getElementById('message-status');
  const submit = form.querySelector('[type="submit"]');
  const alternative = form.querySelector('.message-email-alternative');
  const key = form.querySelector('[name="access_key"]').value.trim();
  let sending = false;
  const draftURL = () => 'mailto:bikash.kunwar096@gmail.com?subject=' +
    encodeURIComponent('Message from your personal website') + '&body=' +
    encodeURIComponent(message.value + (email.value.trim() ? '\n\nReply email: ' + email.value.trim() : ''));
  const updateDraft = () => { alternative.href = draftURL(); };
  const showStatus = (text, kind) => {
    status.textContent = text;
    status.dataset.state = kind;
  };
  if (!key) submit.textContent = 'Open email draft';
  updateDraft();
  for (const button of document.querySelectorAll('[data-message-open]')) {
    button.addEventListener('click', () => {
      dialog.showModal();
      message.focus();
    });
  }
  dialog.querySelector('[data-message-close]').addEventListener('click', () => dialog.close());
  message.addEventListener('input', () => { message.setCustomValidity(''); updateDraft(); });
  email.addEventListener('input', updateDraft);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    message.setCustomValidity(message.value.trim() ? '' : 'Please enter a message.');
    if (!form.reportValidity()) return;
    updateDraft();
    if (!key) {
      window.location.href = draftURL();
      showStatus('Your email app should open with a draft. Send it there to deliver your message. Your text is also kept here.', 'info');
      return;
    }
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    showStatus('Sending your message…', 'info');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const payload = Object.fromEntries(new FormData(form));
      if (!payload.email) delete payload.email;
      delete payload.redirect;
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission not confirmed');
      // Preserve any new text typed while the request was in flight.
      if (message.value === payload.message && email.value === (payload.email || '')) form.reset();
      updateDraft();
      showStatus('Your message was accepted. Thank you for saying hello!', 'success');
    } catch (error) {
      showStatus('Sending could not be confirmed. Your message is still here. Please try again, or use “Or email me directly” to send it through your email app.', 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Send message';
      form.removeAttribute('aria-busy');
    }
  });
})();
