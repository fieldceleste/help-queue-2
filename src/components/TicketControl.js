import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  // for adding new ticket
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false
     });
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
      const action = {
        type: 'DELETE_TICKET',
        id: id
      }
      dispatch(action);
      this.setState({selectedTicket: null
      });
    }

    // for editing
    handleEditClick = () => {
      this.setState({editing: true});
    }

    // for editing ticket in list
    handleEditingTicketInList = (ticketToEdit) => {
      const { dispatch } = this.props;
      const { id, names, location, issue } = ticketToEdit;
      const action = {
        type: 'ADD_TICKET',
        id: id,
        names: names,
        location: location,
        issue: issue,
      }
      dispatch(action);
      this.setState({
        editing: false,
        selectedTicket: null
      });
    }
  
    handleClick = () => {
      if (this.state.selectedTicket != null) {
        this.setState({
          formVisibleOnPage: false,
          selectedTicket: null,
          editing: false
        });
      } else {
        this.setState(prevState => ({
          formVisibleOnPage: !prevState.formVisibleOnPage,
        }));
      }
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
    else if(this.state.formVisibleOnPage) {
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
    masterTicketList: state
  
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;