function Item(props) {
  return (
    <li>
      {props.value}
      <button onClick={props.handleDelete}>Delete</button>
    </li>
  );
}

function ItemList(props) {
  let {toDo, removeItem} = props;

  removeItem = (event) => {
    // event.target points to the Delete button of each Item.
    // So we just need to remove the whole <li> element.
    event.target.parentNode.remove();
  }

  return (
    <ul>
      {
        toDo.map((element, index) => {
          return (
            <Item key={`${element}-${index}`}
                  value={element}
                  handleDelete={removeItem}
            />
          );
        })
      }
    </ul>
  );
}

export default ItemList;