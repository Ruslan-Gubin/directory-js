const createPostTemplate = document.createElement('fragment')

 
createPostTemplate.innerHTML = `
<section class='root'>
<form name='create-post' class='create-post-form'>
  <div class='create-post-buttons'>
  <main-button color='blue' text='Create'></main-button>
  <main-button color='red' text='Cancel'></main-button>
  </div>  
  </form>
</section>
`;

export { createPostTemplate }