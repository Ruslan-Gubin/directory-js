

const getImages = (imageArray: Element) => {
  return Array.from(imageArray.children).reduce((acc,item) => {
    if (item.nodeName === "IMG" && item.getAttribute('alt') !== 'Add image') {
      acc.push(item.getAttribute('src'))
    }
    return acc
  }, [])
}

export { getImages }