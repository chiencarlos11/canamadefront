import React, { Component } from 'react';
import moment from 'moment';

const MyContext = React.createContext();

export class MyProvider extends Component{

  state = {
    orders: [],
    current_index: 0,
    current_blind_type: '',
    toggle: false,
    po_number:"",
    date:moment(),
    curr_order: {}
  };

  add_order = order => {
    var new_orders = this.state.orders.slice()
    order.body.date = this.state.date;
    new_orders.push(order)
    this.setState({orders: new_orders})
    if (order['modal']){
      order['modal']();
    }
  };

  remove_order = index => {
    var new_orders = this.state.orders
    new_orders.splice(index, 1);
    this.setState({orders: new_orders})
  };

  copy_order = index => {
    var new_orders = this.state.orders.slice()
    var new_order = new_orders[index];
    new_order.body.date = this.state.date;
    new_orders.push(new_order)
    this.setState({orders: new_orders})
  };

  update_order = (index,order) => {
    console.log("=== Updating new Order ==== " + index) 
    console.log(JSON.stringify(order));
    var new_orders = this.state.orders.slice()
    new_orders[index] = order;
    this.setState({ orders: new_orders,
                    curr_order: order })
    order['modal']();
  };

  update_ponumber = (event) => {
    console.log("=== Updating po_number ==== " + event.target.value) 
    this.setState({ po_number: event.target.value});

    if (this.state.orders.length > 0){
      var new_orders = this.state.orders.slice()
      for (var order of new_orders){
        order.body.po_number = event.target.value
      }
      this.setState({ orders: new_orders});
    }
    

  };

  update_date = (event) => {
    console.log("=== Updating date ==== " + JSON.stringify(event)) 
    this.setState({ date: event});

    if (this.state.orders.length > 0){
      var new_orders = this.state.orders.slice()
      for (var order of new_orders){
        order.body.date = event
      }
      this.setState({ orders: new_orders});
    }
    

  };

  get_ponumber = () => {
    return this.state.po_number;
  };

  update_order_no_modal = (index,order) => {
    console.log("=== Updating new Order ==== " + index) 
    console.log(JSON.stringify(order));
    var new_orders = this.state.orders.slice()
    order.body.date = this.state.date;
    new_orders[index] = order;
    this.setState({ orders: new_orders,
                    curr_order: order })
  };

  get_order = index => {
    var new_orders = this.state.orders.slice();
    var new_order = new_orders[index];
    return new_order;
  };

  toggle = (index, blind_type) => {
    if (!this.state.toggle){
      this.setState({
        current_index: index,
        current_blind_type: blind_type,
        curr_order: this.get_order(index),
      });

    }

    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render(){
    return (
      <MyContext.Provider value={{
        state: this.state, 
        actions:{ 
          add_order: this.add_order,
          remove_order: this.remove_order,
          copy_order: this.copy_order,
          update_order: this.update_order,
          update_order_no_modal: this.update_order_no_modal,
          get_order: this.get_order,
          toggle: this.toggle,
          get_ponumber: this.get_ponumber,
          update_ponumber: this.update_ponumber,
          update_date: this.update_date,
        },
      }}>
        {this.props.children}
        </MyContext.Provider>
        );
  };
}

export const Consumer = MyContext.Consumer;
