

const postsListTemplate = document.createElement('template')

postsListTemplate.innerHTML = `
<section class='posts-list'>
<div class="posts-header">
<main-button text="add post" size='big' color='blue'></main-button>
</div>
<ul class='posts-list-container'>
</ul>
</section>
`
export { postsListTemplate }