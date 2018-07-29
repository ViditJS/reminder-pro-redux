import React, { Component } from 'react';
// to connect Component(state) to store,
// connect use for mapStateToProps and mapDispatchToProps
import {connect} from 'react-redux';
import {addReminder, deleteReminder} from '../actions';
import {bindActionCreators} from 'redux';
class App extends Component {
  state = {
    text: ''
  }
  addReeminder() {
    this.props.addReminder(this.state.text);
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
          return (
            <li key = {reminder.id} className = "list-group-item">
              <div className="list-item"> {reminder.text} </div>
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
