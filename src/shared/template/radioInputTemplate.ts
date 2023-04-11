const radioInputTemplate = document.createElement("template");

radioInputTemplate.innerHTML = `
<div class='radio-input-container'>
<input type="radio" class='radio-input'>
<label class='radio-input-label'></label>
</div>
`;

export { radioInputTemplate };
