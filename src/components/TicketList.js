import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props) { // Add props as parameter.
  const myStyledComponentStyles = {
    backgroundColor: '#ecf0f1',
    fontFamily: 'sans-serif',
  }
  return (
    <React.Fragment>
       <div style={myStyledComponentStyles}>
      <hr />
      {Object.values(props.ticketList).map((ticket) => {// Loop through the list passed down from TicketControl.
        return <Ticket 
        whenTicketClicked = { props.onTicketSelection }
        names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        formattedWaitTime={ticket.formattedWaitTime}
        id={ticket.id}
        key={ticket.id}/>
       })}
      </div>
    </React.Fragment>
  );
}
// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;