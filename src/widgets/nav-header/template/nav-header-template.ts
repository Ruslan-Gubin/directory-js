import { LINKS } from "../constants/links"

const navHeaderTemplate = document.createElement('template')

// <input-search></input-search>
navHeaderTemplate.innerHTML = `
<div class='nav-header'>
<ul class='nav-header-links'>
${ LINKS.map(link => {
  return `<header-link class='main-link ${link.class}' href="${link.href}" text='${link.name}'></header-link>`
}).join('')}
</ul>
<section class='input-search-block'>
<search-glass></search-glass>
</section>
</div>
`




export { navHeaderTemplate }