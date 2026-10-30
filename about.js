// aboutme.txt uses blank lines for paragraphs and a bullet or "- " for list items.
function renderAboutMe(text, container) {
  const fragment = document.createDocumentFragment();
  let paragraph = [];
  let list = null;

  function finishParagraph() {
    if (paragraph.length) {
      const element = document.createElement('p');
      const links = {
        'Vehicle Systems, Dynamics, and Design Laboratory': 'https://www.vsddl.com/',
        'Prokura Innovations': 'https://www.prokurainnovations.com/'
      };
      const parts = paragraph.join(' ').split(/(Vehicle Systems, Dynamics, and Design Laboratory|Prokura Innovations)/g);
      for (const part of parts) {
        if (Object.prototype.hasOwnProperty.call(links, part)) {
          const link = document.createElement('a');
          link.href = links[part];
          link.textContent = part;
          element.appendChild(link);
        } else {
          element.appendChild(document.createTextNode(part));
        }
      }
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
      const value = trimmed.replace(/^(?:•\s*|-\s+)/, '');
      const colon = value.indexOf(':');
      if (colon !== -1) {
        const label = document.createElement('strong');
        label.textContent = value.slice(0, colon + 1);
        item.appendChild(label);
        item.appendChild(document.createTextNode(value.slice(colon + 1)));
      } else {
        item.textContent = value;
      }
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
    const response = await fetch('aboutme.txt?v=20261029-refresh', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load aboutme.txt');
    renderAboutMe(await response.text(), container);
  } catch (error) {
    container.textContent = 'The About Me section could not be loaded. Please refresh the page to try again.';
    console.error(error);
  }
}

loadAboutMe();
