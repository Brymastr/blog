import { registerLanguage, highlightAll } from 'highlight.js/lib/core';
import shell from 'highlight.js/lib/languages/shell';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/tomorrow-night-eighties.css';

registerLanguage('shell', shell);
registerLanguage('bash', bash);
registerLanguage('javascript', javascript);
registerLanguage('typescript', typescript);
registerLanguage('html', html);
registerLanguage('yaml', yaml);
registerLanguage('json', json);

export default function highlight() {
  highlightAll();
  const blocks = document.querySelectorAll('pre code.hljs');
  blocks.forEach(block => {
    const language = block.result.language;
    if (language != undefined) block.insertAdjacentHTML('afterbegin', `<label>${language}</label>`);
  });
}
