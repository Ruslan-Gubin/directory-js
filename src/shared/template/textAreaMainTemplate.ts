const textAreaMainTemplate = document.createElement("template");

textAreaMainTemplate.innerHTML = `
  <div class='root'>
  <label class='label'></label>
  <textarea class='textarea'></textarea>
  </div>
`;

export { textAreaMainTemplate };
