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
    order['modal']();
  };

  remove_order = index => {
    var new_orders = this.state.orders
    new_orders.splice(index, 1);
    this.setState({orders: new_orders})
  };

  copy_order = index => {
    var new_orders = this.state.orders.slice()
    var new_order = this.state.orders[index];
    new_orders.push(new_order)
    this.setState({orders: new_orders})
  };

  render(){
    return (
      <MyContext.Provider value={{
        state: this.state, 
        actions:{ 
          add_order: this.add_order,
          remove_order: this.remove_order,
          copy_order: this.copy_order,
        },
      }}>
        {this.props.children}
        </MyContext.Provider>
        );
  };
}

export const Consumer = MyContext.Consumer;
