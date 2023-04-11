const searchGlassStyles = `
.search-glass {
  width: 30px;
  height: 30px;
  cursor: default;
  opacity: 0;
}

.search-firstElement {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgb(94, 92, 92);
}

.search-lastElement {
  position: relative;
  top: 0px;
  right: -10px;
  width: 11px;
  height: 1px;
  border: 1px solid rgb(94, 92, 92);
  background-color: rgb(94, 92, 92);
  border-radius: 5px;
  transform: rotate(45deg);
}

.active {
  cursor: pointer;
  opacity: 1;
}
`;

export { searchGlassStyles };
