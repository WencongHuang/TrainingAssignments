function Item(props) {
  return <li>{props.value} <button>Delete</button></li>;
}

function ItemList({toDo}) {
  // let { toDo } = props;
  console.log(toDo);
  console.log(typeof toDo);
  return (
    <ul>
      {
        toDo.map((element, index) => {
          return <Item key={`${element}-${index}`}
                       value={element}
                 />
        })
      }
    </ul>
  );
}

export default ItemList;