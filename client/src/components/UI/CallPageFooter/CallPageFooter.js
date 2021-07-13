// callpage footer component
// it contains button to on/off video and mic of ourself , pause live video of user and share screen
// a button to share screen and one more button to exit group
// it contains small informative text which will appear on-hovering
// a button to copy group code and share code directly via link

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faMicrophone,
    faMicrophoneSlash,
    faVideoSlash,
    faSignOutAlt,
    faCopy,
    faShareAlt,
    faPlay,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import "./CallPageFooter.scss";
import React from "react";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { EmailShareButton } from "react-share";
import { Tooltip } from '@material-ui/core';


const CallPageFooter = ({
    isPresenting,
    stopScreenShare,
    screenShare,
    isAudio,
    isVideo,
    toggleAudio,
    toggleVideo,
    disconnectCall,
    joincode,
    playVideo,
    pauseVideo,
    isPlay,
}) => {


    return (
        <div className="footer-item">
            <div className="left-item">
                {/******************************** share and copy code button*********************************************/}
                <div className="footer-items icon-block"
                    onClick={() =>
                        navigator.clipboard.writeText(joincode)
                    }
                >
                    <p className="title">Code</p>
                    <Tooltip title="Copy code" arrow>
                        <div>
                            <FontAwesomeIcon
                                onClick={() =>
                                    navigator.clipboard.writeText(joincode)
                                }
                                className="icon"
                                icon={faCopy}
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title="Share code directly via mail" arrow>
                      {/* directly share code via mail */}
                        <EmailShareButton
                            subject={"code to join the group"}
                            body={"You have been invited to join a group. Join us at https://jk-teams-1603.netlify.app/ using these code - "}
                            url={joincode}
                            quote={"Enter the given codeto join"}
                            className="share"
                        >
                            <div className="icon-pos">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faShareAlt} />
                            </div>
                        </EmailShareButton>
                    </Tooltip>
                </div>
            </div>
            {/******************************** share and copy code button*********************************************/}

            <div className="center-item">
                {/******************************** on/off microphone button *********************************************/}
                <div
                    className={`icon-block ${!isAudio ? "red-bg" : null}`}
                    onClick={() => toggleAudio(!isAudio)}
                >
                    {isAudio ? (
                        <Tooltip title="Turn off microphone" arrow>
                            <div>
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faMicrophone}
                                />
                            </div>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Turn on microphone" arrow>
                            <div>
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faMicrophoneSlash}
                                />
                            </div>
                        </Tooltip>
                    )}
                </div>
                {/******************************** on/off microphone button *********************************************/}

                {/******************************** on/off video button *********************************************/}
                <div
                    className={`icon-block ${!isVideo ? "red-bg" : null}`}
                    onClick={() => toggleVideo(!isVideo)}
                >
                    {isVideo ? (
                        <Tooltip title="Turn off your video" arrow>
                            <div>
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faVideo}
                                />
                            </div>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Turn on your video" arrow>
                            <div>
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faVideoSlash}
                                />
                            </div>
                        </Tooltip>
                    )}
                </div>
                {/******************************** on/off microphone button *********************************************/}

                {/******************************** share-screen and stop share-screen code *********************************************/}
                {isPresenting ? (
                    <div className="icon-block red-bg" onClick={stopScreenShare}>
                        <Tooltip title="Stop Presenting" arrow>
                            <div className="icon">
                                <MdStopScreenShare />
                            </div>
                        </Tooltip>
                    </div>
                ) : (
                    <div className="icon-block" onClick={screenShare}>
                        <Tooltip title="Start Presenting" arrow>
                            <div className="icon">
                                <MdScreenShare />
                            </div>
                        </Tooltip>
                    </div>
                )}
                {/******************************** share-screen and stop share-screen code *********************************************/}

                {/******************************** play and pause video button*********************************************/}
                {!isPlay ? (
                    <div className="icon-block red-bg" onClick={playVideo}>
                        <Tooltip title="Play live video" arrow>
                            <div className="icon">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faPlay}
                                />
                            </div>
                        </Tooltip>
                    </div>
                ) : (
                    <div className="icon-block" onClick={pauseVideo}>
                        <Tooltip title="Pause" arrow>
                            <div className="icon">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faPause}
                                />
                            </div>
                        </Tooltip>
                    </div>
                )}
                {/******************************** play and pause video button *********************************************/}
            </div>

            <div className="right-item">
                {/******************************** exit group button *********************************************/}
                <div className="footer-items icon-block" onClick={disconnectCall} >
                    <FontAwesomeIcon className="icon red" icon={faSignOutAlt} />
                    <p className="title">Exit Group</p>
                    {/******************************** exit group button *********************************************/}
                </div>
            </div>

        </div>
    );
};

export default CallPageFooter;