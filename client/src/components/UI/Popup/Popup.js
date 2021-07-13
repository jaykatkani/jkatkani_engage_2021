import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";
import { EmailShareButton } from "react-share";
import { EmailIcon } from "react-share";

// meeting pop-up it will appear on joining group
const MeetingInfo = ({ setMeetInfoPopup, url, joincode }) => {
    return (
        <div className="meeting-info-block">
            <div className="meeting-header">
                <h3>Group created!</h3>
                <FontAwesomeIcon
                    className="icon"
                    icon={faTimes}
                    onClick={() => {
                        setMeetInfoPopup(false);
                    }}
                />
            </div>
            <p className="info-text">
                Share this code with others you want in the group
            </p>

            {/* onclicking it will copt the group code */}
            <div className="meet-link">
                <span onClick={() =>
                    navigator.clipboard.writeText(joincode)
                }>{joincode}</span>
                <FontAwesomeIcon
                    onClick={() =>
                        navigator.clipboard.writeText(joincode)
                    }
                    className="icon"
                    icon={faCopy}
                />
            </div>
            <p className="info-text">
              {/* onclicking it will redirect to mail with already written body and subject */}
                <EmailShareButton
                    subject={"code to join the group"}
                    body={"You have been invited to join a group. Join us at https://jk-teams-1603.netlify.app/ using these code - "}
                    url={joincode}
                    quote={"Enter the given codeto join"}
                    className="share"
                >
                    Or share directly via Mail
                    <div className="icon-pos">
                        <EmailIcon size={32} round />
                    </div>
                </EmailShareButton>
            </p>
        </div>
    );
};
export default MeetingInfo;