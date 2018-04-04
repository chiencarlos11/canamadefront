import React, { Component } from 'react';

const MyContext = React.createContext();

export class MyProvider extends Component{

  state = {
    orders: [],
    temp_order: "",
  };

  add_order = order => {
    var new_orders = this.state.orders.slice()
    new_orders.push(order)
    this.setState({orders: new_orders})
  };

  update_temp_order = updates => {
    this.setState({temp_order: updates})
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
