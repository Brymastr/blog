import { registerLanguage, highlightAll } from 'highlight.js/lib/core';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/tomorrow-night-eighties.css';

registerLanguage('shell', shell);
export default highlightAll;
