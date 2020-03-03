import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Map (foreach) each alert to an alert <div> to display
const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

// To get state and map it to props
const mapStateToProps = state => ({
    alerts: state.alert
});

// connect(mapStateToProps, actions)(component)
export default connect(mapStateToProps)(Alert);
