import React, { Component } from 'react';

const MyContext = React.createContext();

export class MyProvider extends Component{

  state = {
    orders: [],
  };

  add_order = order => {
    var new_orders = this.state.orders.slice()
    new_orders.push(order)
    this.setState({orders: new_orders})
  };

  render(){
    return (
      <MyContext.Provider value={{
        state: this.state, 
        actions:{ 
          add_order: this.add_order,
        },
      }}>
        {this.props.children}
        </MyContext.Provider>
        );
  }
}

export const Consumer = MyContext.Consumer;
