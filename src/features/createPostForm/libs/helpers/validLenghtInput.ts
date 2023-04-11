const validLenghtInput = (value: string, node: HTMLElement) => {
  if (value.length < 3) {
    node.setAttribute('error', 'Введите заголовок не меньше 3 символов')
  } else {
    node.removeAttribute('error')
  }
 }

export { validLenghtInput }