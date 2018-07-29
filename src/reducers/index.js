import { ADD_REMINDER, DELETE_REMINDER } from '../constants';
import {read_cookie, bake_cookie} from 'sfcookies';
// helper function
const reminder = (action) => {
let {text, dueDate} = action;
  return {
    id: Math.random(),
    text,
    dueDate
  }
}
const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}
const reminders = (state = [], action) => {
  state = read_cookie('reminders');
  let reminders = null;
  switch(action.type) {
    case ADD_REMINDER:
    reminders = [...state, reminder(action)];
    bake_cookie('reminders', reminders);
    console.log('reminders as state', reminders);
    return reminders;
    case DELETE_REMINDER:
    reminders = removeById(state, action.id);
    bake_cookie('reminders', reminders);
    return reminders;
    default:
    return state;
  }
}

export default reminders;
