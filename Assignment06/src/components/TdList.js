import React from 'react';
import ItemList from './ItemList';

class TdList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDo : [],
      newToDo : "",
    }
  }

  newToDoInput = (event) => {
    this.setState({ newToDo : event.target.value });
  }

  addToDo = () => {
    this.setState({ 
      toDo : this.state.toDo.push(this.state.newToDo),
      newToDo : "",
    });
  }

  render () {
    return (
      <div className='TdList'>
        <div>
          <input type="text"
                 onChange={this.newToDoInput}
                 value={this.state.newToDo}
          />
          <button onClick={this.addToDo}>Add</button>
          <label htmlFor="sort">Sort by </label>
          <select name="sort" id="sort">
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div>
          <ItemList toDo={this.state.toDo}/>
        </div>
      </div>
    );
  }
}

export default TdList;