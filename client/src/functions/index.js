const findNestedObjById = (tree, id) => {
  //Quelle: https://stackoverflow.com/questions/71362885/find-nested-object-by-id-using-for-loop-in-javascript
  if (tree.attributes.node_id === id) {
    return [];
  }
  if (tree.children) {
    let path;
    tree.children.some((child, index) => {
      path = findNestedObjById(child, id);
      if (path) {
        path.unshift(index);
        return true;
      }
    });
    return path;
  }
}

export const nestedObjPath = (tree, id) => {
  const indices = findNestedObjById(tree, id)
  let path = "data"
  indices.forEach(index => {
    path = path + `.children[${index}]`
  })

  return path
}