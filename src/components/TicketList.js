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
      {props.ticketList.map((ticket, index) => // Loop through the list passed down from TicketControl.
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index} />
      )}
      </div>
    </React.Fragment>
  );
}
// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;