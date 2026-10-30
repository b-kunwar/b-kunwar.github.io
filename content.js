// Schedule once: inline includeHTML calls must not launch overlapping requests.
let includesScheduled = false;
function includeHTML() {
  if (includesScheduled) return;
  includesScheduled = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludedSections, { once: true });
  } else {
    loadIncludedSections();
  }
}
async function loadIncludedSections() {
  await Promise.all(Array.from(document.querySelectorAll('[w3-include-html]'), async (element) => {
    const file = element.getAttribute('w3-include-html');
    try {
      const response = await fetch(file, { cache: 'no-cache' });
      if (!response.ok) throw new Error('Unable to load ' + file);
      element.innerHTML = await response.text();
      element.removeAttribute('w3-include-html');
    } catch (error) {
      element.textContent = 'Page not found.';
      console.error(error);
    }
  }));
}
