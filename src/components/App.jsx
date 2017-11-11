import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addReminder, deleteReminder,clearReminders} from '../actions';
import moment from 'moment';

class App extends Component {
    constructor(props){
      super(props);
        this.state={
            text:'',
            dueDate:''
        }
    }
    addReminder(){
       this.props.addReminder(this.state.text,this.state.dueDate);
    }
    deleteReminder(id){
        this.props.deleteReminder(id);
    }
    render() {
        return (
            <div className="App">
                <div className="title">
                    <h2 className="text-center">Remainder</h2>
                </div>
                <div className="form-inline remainder-form">
                    <div className="form-group">
                        <input className="form-control" placeholder="I have to ..." onChange={event=>this.setState({text:event.target.value})}
                               />
                        <input className="form-control" type="datetime-local" onChange={event=>this.setState({dueDate:event.target.value})}/>
                    </div>
                    <button type="button" className="btn btn-success" onClick={()=>this.addReminder()}>Add Remainder
                    </button>
                    <br/>
                    {this.renderReminders()}

                    <div className="btn btn-danger" onClick={()=>this.props.clearReminders()}>Clear Reminders</div>
                </div>
            </div>
        )
    }
    renderReminders(){
        const {reminders}=this.props;
        console.log('reminders',reminders);
        return(
            <ul className="list-group col-sm-4">
                {reminders.map(reminder=>{
                    return(
                        <li key={reminder.id} className="list-group-item"><div className="list-item">{reminder.text}&nbsp;&nbsp;</div>
                            <div className="list-item">  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                        <div className="list-item delete-button" onClick={()=>this.deleteReminder(reminder.id)}>&#x2715;</div>
                        </li>
                    )
                })
                }
                </ul>
        )
    }
}

function mapStateToProps(state){
    console.log('state',state);
    return{
        reminders:state
    }
}

export default connect(mapStateToProps,{addReminder,deleteReminder,clearReminders})(App);


