import { createPostRadioButtons } from "../../constants/createPostRadio";

const getInitialRadioButton = (storageCategory: {category: string}) => {

  return storageCategory
    ? createPostRadioButtons.map((item) => {
        if (item.value === storageCategory.category) {
          return { ...item, selected: true };
        } else {
          return item;
        }
      })
    : 
    createPostRadioButtons.map((item, index) => {
      if (index === 0) {
        return {...item, selected: true}
      } else {
        return item
      }
    })
   
};

export { getInitialRadioButton };
