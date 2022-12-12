import MarkdownIt from 'markdown-it'
import TurndownService from 'turndown'

/**************************************************
  markdown-it
**************************************************/

const mdi = new MarkdownIt({
  html: true
})

mdi.use(require('markdown-it-front-matter'), function(fm) {})
mdi.use(require('markdown-it-katex'))
mdi.use(require('markdown-it-highlightjs'), {hljs: require('highlight.js')})

// Underline
mdi.use(mdi => {
  function renderStrong(tokens, idx, opts, _, self) {
    let token = tokens[idx]
    if (token.markup === '__') {
      token.tag = 'u'
    }
    return self.renderToken(tokens, idx, opts)
  }

  mdi.renderer.rules.strong_open = renderStrong
  mdi.renderer.rules.strong_close = renderStrong
})

/**************************************************
  Turndown
***************************************************/

const td = new TurndownService({
  headingStyle: 'atx',      // # Heading
  codeBlockStyle: 'fenced', // ```
  emDelimiter: '*'          // *em*
})

td.addRule('underline', {
  filter: ['u', 'ins'],
  replacement: (content) => `__${content}__`
})

td.addRule('strikethrough', {
  filter: ['s', 'del', 'strike'],
  replacement: (content) => `~~${content}~~`
})

/// KaTeX ///

// Convert annotation elements to inline LaTeX
td.addRule('katex', {
  filter: node =>
    node.tagName.toUpperCase() === 'ANNOTATION'
    && node.getAttribute('encoding') === 'application/x-tex',
  replacement: (content, node) => {
    content = content.replace('\\\\', '\\')
    if (node.closest('.katex-display') !== null)
      return `$$${content}$$`
    else
      return `$${content}$`
  }
})

// Remove katex-html
td.remove(node =>
  node.tagName === 'SPAN'
  && node.parentElement.classList.contains('katex-html')
)

// Remove non-annotation MathML elements
td.remove(node =>
  node.constructor.name === 'MathMLElement'
  && node.getElementsByTagName('annotation').length <= 0
)


/**************************************************
  Exports
***************************************************/

const md = {
  makeHTML: markdown => mdi.render(markdown),
  makeMarkdown: html => td.turndown(html)
}

export default md
