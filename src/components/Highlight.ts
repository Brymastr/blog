import hljs from 'highlight.js/lib/common';
import type { HighlightedHTMLElement, HighlightResult } from 'highlight.js';
import 'highlight.js/styles/base16/tomorrow-night.css';

export default function highlight() {
  hljs.highlightAll();
  const blocks = document.querySelectorAll<HighlightedHTMLElement>('pre code.hljs');
  blocks.forEach(block => {
    if (block.result === undefined) return;
    const result = block.result as HighlightResult;
    const language = result.language;
    if (language != undefined) block.insertAdjacentHTML('afterbegin', `<label>${language}</label>`);
  });
}
