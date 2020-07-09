import React from "react";
import PropTypes from "prop-types";
import { v4 } from 'uuid'; // new code
import ReusableForm from "./ReusableForm";
import Moment from 'moment';


function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: v4()});
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}
NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;

//on new ticket creation is the callback from parent componet. 