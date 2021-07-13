// it shows a small automatically disappearing popup with the message sent to user
// one of the coolest feature
import "./Alert.scss";

const Alert = ({ messageAlert }) => {
    return (
        <div className="message-alert-popup">
            <div className="alert-header">
                <h3>{messageAlert.payload.user}</h3>
            </div>
            <p className="alert-msg">{messageAlert.payload.msg}</p>
        </div>
    );
};

export default Alert;