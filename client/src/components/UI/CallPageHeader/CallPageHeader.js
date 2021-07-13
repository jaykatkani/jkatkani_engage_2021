// callpage header component
// it contains button to start and end meet, shows time , show timer , show chat-enable/disable button and screenshot button to take screenshots of chat
// it has some hidden features  i.e. to on off video, mic and video of user as per they enter or leave the meeting

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComments,
    faSyncAlt,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./../../../utils/helper";
import "./CallPageHeader.scss";
import { useState, useEffect } from "react";
import React from "react";
import ReactStopwatch from 'react-stopwatch';
import Time from "./Time";
import { Tooltip } from '@material-ui/core';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        };
        setInterval(() => {
            this.setState({
                timer: this.state.timer + 1000
            });
        }, 1000);
    }
    render() {
        return (
            <div>
                <Time ms={this.state.timer} />
            </div>
        );
    }
}

const CallPageHeader = ({
    isMessenger,
    setIsMessenger,
    messageAlert,
    setMessageAlert,
    isStartVC,
    toggleisStartVC,
    handleTakeScreenShot,
    isAudio,
    isVideo,
    toggleAudio,
    toggleVideo,
    pauseVideo,
    playVideo
}) => {

    let interval = null;

    // react-hook to return current date and time
    const [currentTime, setCurrentTime] = useState(() => {
        return formatDate();
    });

    // to show timer
    const Stopwatch = () => (
        <ReactStopwatch
            seconds={0}
            minutes={0}
            hours={0}
            limit="10:00:10"
            onChange={({ hours, minutes, seconds }) => {
            }}
            onCallback={() => console.log('Finish')}
            render={({ formatted, hours, minutes, seconds }) => {
                return (
                    <div>
                        <p>
                            {formatted}
                        </p>
                    </div>
                );
            }}
        />
    );


    useEffect(() => {
        interval = setInterval(() => setCurrentTime(formatDate()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        
        
        <div className="frame-header">
            {!isStartVC ? (
                <div className="header-items date-block">                 {/* to display time*/}
                    {currentTime}
                </div>
            ) : (
                <div className="header-items date-block">
                     <Timer />                                            {/* to display timer */}
                </div>
            )}
            

            {/******************************** start/stop meet button *********************************************/}
            {/* if we change meet it off mic, video, isstartvc mode and on/off user video */}
            <div className="header-items icon-block"
                onClick={() => { toggleisStartVC(!isStartVC); toggleAudio(false); toggleVideo(false); }}
            >
                <FontAwesomeIcon className="icon" icon={faSyncAlt} />
                {!isStartVC ? (
                    <p className="title" onClick={playVideo}>Start Meeting</p>
                ) : (
                    <p className="title" onClick={pauseVideo}>End Meeting</p>
                )}
            </div>
            {/******************************** start/stop meet button *********************************************/}


            {/* ************************************ chat button **************************************************/}
            <Tooltip title="Conversation" arrow>
                <div
                    className="header-items icon-block"
                    onClick={() => {
                        setIsMessenger(!isMessenger);
                        setMessageAlert({});
                    }}
                >
                    <FontAwesomeIcon className="icon comments" icon={faComments} />
                    {!isMessenger && messageAlert.alert && (
                        <span className="alert-circle-icon"></span>
                    )}
                </div>
            </Tooltip>
            {/* ************************************ chat button **************************************************/}


            {/* ********************************* screenshot button ***********************************************/}
            <Tooltip title="Screenshot" arrow>
                <div className="header-items icon-block"
                    onClick={handleTakeScreenShot}
                >
                    <FontAwesomeIcon className="icon screenshot" icon={faCamera} />
                </div>
            </Tooltip>
            {/* ********************************* screenshot button ***********************************************/}

        </div>
    );
};

export default CallPageHeader;