import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [] // new code
    };
    this.handleClick = this.handleClick.bind(this); //new code here
  }
  
  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false 
     });
    }
  
  handleClick(){
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} /> 
      buttonText = "Return to Ticket List"; // new code
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} />; // new code
      buttonText = "Add Ticket"; // new code new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */ }
      </React.Fragment>
    );
  }

}

export default TicketControl;