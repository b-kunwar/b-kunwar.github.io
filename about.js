// Small Markdown renderer: paragraphs, headings, lists, links, bold, and italics.
// Build DOM nodes rather than interpreting HTML from the content file.
function appendMarkdownInline(parent, text) {
  const pattern = /\[([^\]]+)\]\(([^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    parent.appendChild(document.createTextNode(text.slice(cursor, match.index)));
    if (match[1]) {
      const url = new URL(match[2], document.baseURI);
      if (['https:', 'http:', 'mailto:'].includes(url.protocol)) {
        const link = document.createElement('a');
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        appendMarkdownInline(link, match[1]);
        parent.appendChild(link);
      } else {
        parent.appendChild(document.createTextNode(match[1]));
      }
    } else {
      const node = document.createElement(match[3] ? 'strong' : 'em');
      node.textContent = match[3] || match[4];
      parent.appendChild(node);
    }
    cursor = match.index + match[0].length;
  }
  parent.appendChild(document.createTextNode(text.slice(cursor)));
}

function renderAboutMe(text, container) {
  const fragment = document.createDocumentFragment();
  let paragraph = [];
  let list = null;
  function finishParagraph() {
    if (!paragraph.length) return;
    const element = document.createElement('p');
    appendMarkdownInline(element, paragraph.join(' '));
    fragment.appendChild(element);
    paragraph = [];
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const bullet = trimmed.match(/^(?:[-*+]\s+|•\s*)(.+)$/);
    if (!trimmed) {
      finishParagraph();
      list = null;
    } else if (heading) {
      finishParagraph();
      list = null;
      const element = document.createElement('h' + heading[1].length);
      appendMarkdownInline(element, heading[2]);
      fragment.appendChild(element);
    } else if (bullet) {
      finishParagraph();
      if (!list) {
        list = document.createElement('ul');
        fragment.appendChild(list);
      }
      const item = document.createElement('li');
      appendMarkdownInline(item, bullet[1]);
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
    const response = await fetch('aboutme.md', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load aboutme.md');
    renderAboutMe(await response.text(), container);
  } catch (error) {
    container.textContent = 'The About Me section could not be loaded. Please refresh the page to try again.';
    console.error(error);
  }
}
loadAboutMe();
