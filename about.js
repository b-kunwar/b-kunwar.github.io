// About_Me.txt uses blank lines for paragraphs and a bullet or "- " for list items.
function renderAboutMe(text, container) {
  const fragment = document.createDocumentFragment();
  let paragraph = [];
  let list = null;

  function finishParagraph() {
    if (paragraph.length) {
      const element = document.createElement('p');
      element.textContent = paragraph.join(' ');
      fragment.appendChild(element);
      paragraph = [];
    }
  }

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      finishParagraph();
      list = null;
    } else if (/^(?:•\s*|-\s+)/.test(trimmed)) {
      finishParagraph();
      if (!list) {
        list = document.createElement('ul');
        fragment.appendChild(list);
      }
      const item = document.createElement('li');
      item.textContent = trimmed.replace(/^(?:•\s*|-\s+)/, '');
      list.appendChild(item);
    } else {
      list = null;
      paragraph.push(trimmed);
    }
  }
  finishParagraph();
  container.replaceChildren(fragment);
}

async function loadAboutMe() {
  const container = document.getElementById('about-me');
  try {
    const response = await fetch('About_Me.txt', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load About_Me.txt');
    renderAboutMe(await response.text(), container);
  } catch (error) {
    container.textContent = 'The About Me section could not be loaded. Please refresh the page to try again.';
    console.error(error);
  }
}

loadAboutMe();
