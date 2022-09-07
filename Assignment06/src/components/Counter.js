import React from 'react';

class Counter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count : 0,
      action : 'Start',
      timer : null,
    }
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  incrementIfOdd = () => {
    // if(this.state.count % 2 === 1) {
    //   this.increment();
    // }
    this.state.count % 2 === 1 && this.increment();
  }

  asyncIncrement = () => {
    setTimeout(this.increment, 1000);
  }

  timerIncrement = () => {
    if(this.state.action.toUpperCase() === "START") {
      this.setState({ 
        action : "Stop",
        timer : setInterval(this.increment, 1000), 
      });
    }else{
      clearInterval(this.state.timer);
      this.setState({ 
        action : "Start", 
        timer : null, 
      });
    }
  }

  render () {
    return (
      <div className="Counter">
        Counter: {this.state.count}
        <div>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
        </div>
        <div>
          <button onClick={this.incrementIfOdd}>Increment If Odd</button>
          <button onClick={this.asyncIncrement}>Async Increment</button>
        </div>
        <div>
          <button onClick={this.timerIncrement}>{this.state.action}</button>
        </div>
      </div>
    );
  }
}

export default Counter;