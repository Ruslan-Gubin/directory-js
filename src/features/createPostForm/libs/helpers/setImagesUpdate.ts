interface Image {
  url: string;
  public_id: string;
}

const setImagesUpdate = (images: Image[], node) => {
  if (images) {
    images.forEach((item: Image) => {
      node.addImagesDom(item.url, item.public_id);
    });
  }
};

export { setImagesUpdate };
