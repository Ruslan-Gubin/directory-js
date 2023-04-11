import { iconsAddImage } from "../constants/icons";

const imagesFormTemplate = document.createElement('fragment')

imagesFormTemplate.innerHTML = `
<div class='create-post-files'>
  <img class='add-image' src='${iconsAddImage.addImage}' alt='Add image'>
  <input type='file' name='file'  hidden>
  </div>
`;

export { imagesFormTemplate }