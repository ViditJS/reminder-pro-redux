import React, { Component } from 'react';
// to connect Component(state) to store,
// connect use for mapStateToProps and mapDispatchToProps
import {connect} from 'react-redux';
import {addReminder, deleteReminder} from '../actions';
import {bindActionCreators} from 'redux';
import moment from 'moment'
class App extends Component {
  state = {
    text: '',
    dueDate: ''
  }
  addReeminder() {
    // call actions
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id) {
    this.props.deleteReminder(id);
    console.log('this props', this.props);
  }
  renderReminder() {
    // using stateToProps method
    const {reminders} = this.props;
    return (
      <ul className = 'list-group col-sm-4'>
      {
        reminders.map(reminder => {
          console.log('reminder dueeeee is', reminder);
          return (
            <li key = {reminder.id} className = "list-group-item">
              <div className="list-item">
                <div> {reminder.text} </div>
                <div> <em>{moment(new Date(reminder.dueDate)).fromNow()}</em> </div>
               </div>
              <div className="list-item delete-button" onClick={() => {this.deleteReminder(reminder.id)}}>&#x2715;</div>
            </li>
          )
        })
      }
      </ul>
    )
  }
  render() {
    return (
      <div className="App">
        <div className = "App-title">
            Reminder Pro
        </div>
        <div className = "form-inline">
          <div className = "form-group">
            <input className = "form-control" placeholder="I have to ..." onChange = {event => this.setState({
              text: event.target.value})}/>
            <input className = "form-control"  type="datetime-local" onChange = {event => this.setState({dueDate: event.target.value})}/>
           </div>
           <button type="button" className="btn btn-success" onClick = {() => this.addReeminder()}>Add Reminder</button>
          </div>
          {this.renderReminder()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log('state is', state);
  return {
    reminders: state
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, deleteReminder}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (App);
