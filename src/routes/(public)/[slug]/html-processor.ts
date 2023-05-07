import slugify from 'slugify';

export const processHtml = (rawHTML: string) => {
  const preloadDoc = document.createElement('div');
  preloadDoc.innerHTML = rawHTML;
  if (preloadDoc) {
    // Process code blocks
    const codeBlocks = preloadDoc.querySelectorAll('pre > code');
    for (const codeBlock of codeBlocks) {
      const button = document.createElement('button');
      button.className = 'absolute btn btn-sm btn-square btn-primary top-2 right-2';
      button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
      `;
      button.onclick = () => {
        if (codeBlock.textContent) {
          navigator.clipboard.writeText(codeBlock.textContent);
        }
      };
      if (codeBlock.parentElement) {
        codeBlock.parentElement.classList.add('line-numbers');
        codeBlock.parentElement.outerHTML = `<div class="relative">${codeBlock.parentElement.outerHTML} ${button.outerHTML}</div>`;
      }
    }

    // Process images
    const imgBlocks = preloadDoc.getElementsByTagName('img');

    for (const imgBlock of imgBlocks) {
      imgBlock.setAttribute('loading', 'lazy');
    }

    // Process headings
    const headingBlocks = preloadDoc.querySelectorAll('h1');
    for (const headingBlock of headingBlocks) {
      headingBlock.id = slugify(headingBlock.textContent ?? '', {
        lower: true,
        trim: true,
        strict: true
      });
    }
  }

  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = preloadDoc.innerHTML;
    window.Prism.highlightAllUnder(content);
  }
  preloadDoc.remove();

  return content?.innerHTML;
};
