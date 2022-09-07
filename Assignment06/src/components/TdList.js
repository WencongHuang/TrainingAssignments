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
    // Prevent adding empty todo
    if(this.state.newToDo === "") {
      return;
    }

    this.setState({ 
      // DO NOT use Array.push here!
      // Good Information: https://www.robinwieruch.de/react-state-array-add-update-remove/
      toDo : this.state.toDo.concat(this.state.newToDo),
      newToDo : "",
    });
  }

  handleSort = (event) => {
    if(event.target.value === "A-Z") {
      this.setState({ toDo : this.state.toDo.sort() });
    }else if(event.target.value === "Z-A") {
      this.setState({ toDo : this.state.toDo.sort().reverse() });
    }
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
          <select name="sort" id="sort" onChange={this.handleSort}>
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