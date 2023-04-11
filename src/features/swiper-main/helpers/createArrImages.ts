const createArrImages = (images: string[]) => {
  return images.map((item, ind) => {
    const id = ind + 1
    if (ind === 0) {
      return {active: true, img: item, id}
    } else {
      return {active: false, img: item, id}
    }
  })
}

export { createArrImages }