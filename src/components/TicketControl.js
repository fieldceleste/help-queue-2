import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';  //a = actions 
import { withFirestore, isLoaded } from 'react-redux-firebase';



class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionStart:0,
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);

    if (this.state.formVisibleOnPage) {
      this.setState({
        currentQuestionNumber: 0,
      })
    }
  }
  //   if (this.state.selectedTicket != null) {
  //     this.setState({
  //       selectedTicket: null,
  //       // editing: false
  //     });
  //   } else {
  //     const { dispatch } = this.props;
  //     const action = a.toggleForm();
  //     dispatch(action);
  //   }
  // }

  handleDetailClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    }
  }

  //timers
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    6000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

// back button questions
  handleBackClick = () => {
    this.setState({
      currentQuestion: 0,
    })
  }

  //question button 
   handleQuestionClick = () => {
    this.setState(prevState => {
      return { currentQuestion: prevState.currentQuestion + 1 }
    });
  }
 

  // for adding new ticket
  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

    //for updating
    handleChangingSelectedTicket = (id) => {
      this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
        const firestoreTicket = {
          names: ticket.get("names"),
          location: ticket.get("location"),
          issue: ticket.get("issue"),
          id: ticket.id
        }
        this.setState({selectedTicket: firestoreTicket });
      });
    }

    // for deleting
    handleDeletingTicket = (id) => {
      this.props.firestore.delete({collection: 'tickets', doc: id});
      this.setState({
        selectedTicket: null});
    }

    // for editing
    handleEditClick = () => {
      this.setState({
        editing: true});
    }

    handleEditingTicketInList = () => {
      this.setState({ 
        editing: false,
        selectedTicket: null
      });
    }
  
    
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    let pageButton = null;
    
    const auth = this.props.firebase.auth();

    if (this.state.editing ) {      
      currentlyVisibleState = 
      <EditTicketForm 
      ticket = {this.state.selectedTicket} 
      onEditTicket= {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
      pageButton = this.handleDetailClick;
    }
    else if(this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
      pageButton = this.handleDetailClick;
    }
    else if(this.props.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewTicketForm 
      onNewTicketCreation={this.handleAddingNewTicketToList} /> 
      buttonText = "Return to Ticket List";
      pageButton = this.handleDetailClick;

    }
    else if (this.state.currentQuestion === 1) {
      currentlyVisibleState = questions[0];
      pageButton = this.handleQuestionClick;
      buttonText = "Yes";

    } 
    else if (this.state.currentQuestion === 2) {
      currentlyVisibleState = questions[1];
      pageButton = this.handleQuestionClick;
      buttonText = "Yes";
     
    }
    else if (this.state.currentQuestion === 3) {
      currentlyVisibleState = questions[2];
      pageButton = this.handleClick;
      buttonText = "Yes";
     
    }
    else {
      currentlyVisibleState = 
      <TicketList 
      onTicketSelection={this.handleChangingSelectedTicket} />; 
      buttonText = "Add Ticket"; 
      pageButton = this.handleQuestionClick;
    }

    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h3>Loading...</h3>
        </React.Fragment>
      )
    }

    if (isLoaded(auth) && (auth.currentUser === null)) {
      return (
        <React.Fragment>
          <h3>Please sign in to access the queue!</h3>
        </React.Fragment>
      )
    }
   if ((isLoaded(auth)) && (auth.currentUser != null)) {
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={pageButton}>{buttonText}</button>
        </React.Fragment>
     );
    }
  }
}

TicketControl.propTypes = {
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);


export default withFirestore(TicketControl);

const questions = ["Have you gone through all the steps on the Learn How to Program debugging lesson?",
  "Have you asked another pair for help?",
  "Have you spent 15 minutes going through through the problem documenting every step?"];