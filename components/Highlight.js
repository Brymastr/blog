import { registerLanguage, highlightAll } from 'highlight.js/lib/core';
import shell from 'highlight.js/lib/languages/shell';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/tomorrow-night-eighties.css';

registerLanguage('shell', shell);
registerLanguage('javascript', javascript);
registerLanguage('typescript', typescript);
registerLanguage('html', html);
registerLanguage('yaml', yaml);
registerLanguage('json', json);
export default highlightAll;
