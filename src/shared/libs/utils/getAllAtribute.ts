

const getAllAtribute = <T>(element: Element, ...args): T => {
  return args.reduce((acc, item) => {
    return { ...acc, [item]: element.getAttribute(item) };
  }, {});
};

export { getAllAtribute };
