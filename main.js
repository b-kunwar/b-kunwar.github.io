const sectionNames = ['Home', 'CV', 'Publication', 'Project', 'Writing', 'Contact'];

function showSection(sectionName) {
  if (!sectionNames.includes(sectionName)) sectionName = 'Project';
  for (const panel of document.getElementsByClassName('tabcontent')) {
    panel.style.display = panel.id === sectionName ? 'block' : 'none';
  }
  for (const button of document.getElementsByClassName('tablinks')) {
    button.classList.toggle('active', button.dataset.section === sectionName);
  }
  const floatingHello = document.getElementById('floating-hello');
  if (floatingHello) floatingHello.hidden = sectionName === 'Home';
}

function sectionFromURL() {
  try {
    const section = decodeURIComponent(window.location.hash.slice(1));
    return sectionNames.includes(section) ? section : 'Project';
  } catch (error) {
    return 'Project';
  }
}

function openTab(evt, sectionName) {
  if (!sectionNames.includes(sectionName)) return;
  showSection(sectionName);
  if (window.location.hash !== '#' + sectionName) {
    // Update the address without jumping to the panel's element ID.
    window.history.pushState(null, '', window.location.pathname + window.location.search + '#' + sectionName);
  }
}

window.addEventListener('popstate', () => showSection(sectionFromURL()));
window.addEventListener('hashchange', () => showSection(sectionFromURL()));
showSection(sectionFromURL());
