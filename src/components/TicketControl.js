import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';  //a = actions 

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    6000
    );
  }

  componentWillUnmount(){
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick");
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  // for adding new ticket
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

    //for updating
    handleChangingSelectedTicket = (id) => {
      const selectedTicket = this.props.masterTicketList[id];
      this.setState({selectedTicket: selectedTicket
      });
    }

    // for deleting
    handleDeletingTicket = (id) => {
      const { dispatch } = this.props;
      const action = a.deleteTicket(id);
      dispatch(action);
      this.setState({selectedTicket: null});
    }

    // for editing
    handleEditClick = () => {
      this.setState({editing: true});
    }

    // for editing ticket in list
    handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }
  
    
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code

    if (this.state.editing ) {      
      currentlyVisibleState = 
      <EditTicketForm 
      ticket = {this.state.selectedTicket} 
      onEditTicket= {this.handleEditingTicketInList} />
    buttonText = "Return to Ticket List";
    }
    else if(this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
    buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if(this.props.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewTicketForm 
      onNewTicketCreation={this.handleAddingNewTicketToList} /> 
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = 
      <TicketList 
      ticketList={this.props.masterTicketList}
      onTicketSelection={this.handleChangingSelectedTicket} />; 
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}
TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;