import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null
    };
    this.handleClick = this.handleClick.bind(this); //new code here
  }

  // for adding new ticket
  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false 
     });
    }

    //for updating
    handleChangingSelectedTicket = (id) => {
      const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
      this.setState({
        selectedTicket: selectedTicket
      });
    }
    // for deleting
    handleDeletingTicket = (id) => {
      const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
      this.setState({
        masterTicketList: newMasterTicketList,
        selectedTicket: null
      });
    }
  
    handleClick = () => {
      if (this.state.selectedTicket != null) {
        this.setState({
          formVisibleOnPage: false,
          selectedTicket: null
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

    if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if(this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} /> 
      buttonText = "Return to Ticket List"; // new code
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />; // new code
      buttonText = "Add Ticket"; // new code new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default TicketControl;