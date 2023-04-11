const postTemplate = document.createElement('template')

postTemplate.innerHTML = `
<article class="post-wrapper">
<div class="post-container">
<div class="post-image">
<post-image></post-image>
</div>
<post-title></post-title>
<post-content></post-content>
</div>
</article>
`

export { postTemplate }