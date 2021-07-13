//*******************************************//

// This is the most important page of our app almost all the main functions/features that our app have are defined here
// and almost al l components we previously created are used here.

// on these page we will see 2 options one is to video chat and other is to normal cht with our partner.

//*******************************************//


// First We will import all the required components, modules and library
import './CallPage.scss';
import Messenger from "./../UI/Messenger/Messenger";
import Popup from "../UI/Popup/Popup";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";
import { useEffect, useReducer, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import MessageListReducer from '../../reducers/MessageListReducer';
import Peer from "simple-peer";
import { getRequest, postRequest } from "./../../utils/apiRequests";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "./../../utils/apiEndpoints";
import io from "socket.io-client";
import Alert from "../UI/Alert/Alert";
import React from "react";
import { saveAsPng } from "save-html-as-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSignOutAlt,
    faCopy,
    faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { EmailShareButton } from "react-share";
import { Tooltip } from '@material-ui/core';

// we initialize peer with and usestate as empty array
let peer = null;
const initialState = [];

// socket.io will help us connect with our backend server 
//const socket = io.connect("https://jk-teams.herokuapp.com");    // if deployed
const socket = io.connect("http://localhost:4000" );   // if run locally

const CallPage = () => {

    // initialized some more variables to get url, joincode, alerttimeout, isadmin or not etc.
    const history = useHistory();
    let { id } = useParams();
    const isAdmin = window.location.hash == "#init" ? true : false;
    const url = `${window.location.origin}${window.location.pathname}`;
    var path = window.location.pathname.substr(1);
    const joincode = `${path}`;
    let alertTimeout = null;


    ////////////////////// some important react hooks we will need in our code are declared here //////////////////////////

    const [messageList, messageListReducer] = useReducer(
        MessageListReducer,
        initialState
    );
    const [Popup, setPopup] = useState(false);
    const [streamObj, setStreamObj] = useState();
    const [screenCastStream, setScreenCastStream] = useState();
    const [isPresenting, setIsPresenting] = useState(false);
    const [isMessenger, setIsMessenger] = useState(false);
    const [messageAlert, setMessageAlert] = useState({});
    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);
    const [isFocusOnMe, setIsFocusOnMe] = useState(true);
    const [isStartVC, setIsStartVC] = useState(false);
    const [isPlay, setIsPlay] = useState(true);

    /////////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/////////////////////////////////////////////    




    useEffect(() => {

        // if (isAdmin) {
        //     setPopup(false);                       // we are not using popup
        // }
        initWebRTC();

        // socket.on("code", (data) => {
        //     peer.signal(data);                     //if we use these only one room was possible
        // });

        socket.on("code", (data) => {
            if (data.url === url) {                   //using these we can create infinite many rooms
                peer.signal(data.code);
            }
        });

        //////////////////////// socket that alerts when partner leaves the group //////////////////////////////        
        socket.on("user-disconnected", (data) => {
            if (data.url === url) {
                window.alert("Your partner has left the group");
            }
        });
        /////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx////////////////////////////////////            





        //////////////////////// An attempt to implement alert box for all the joining users////////////////////////

        // clearTimeout(alertTimeout);
        // setMessageAlert({
        //   alert: true,
        //   isPopup: true,
        //   payload: {
        //     user: "",
        //     msg: "Other user has left the meeting",
        //   },
        // });

        // alertTimeout = setTimeout(() => {
        //   setMessageAlert({
        //     ...messageAlert,
        //     isPopup: false,
        //     payload: {},
        //   });
        // }, 10000);

        ///////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////////////              

    }, []);



    // it will get the receiver code of other user for making connection
    const getRecieverCode = async () => {
        const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
        if (response.code) {
            peer.signal(response.code);
        }
    };

    const initWebRTC = () => {

        // we used webRTC to capture and optionally stream audio and video media
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
            .then((stream) => {
                //we are writing the audio and video tracks in array

                ////////////// it will initialize mic and camera by-default in off state ////////////////
                stream.getAudioTracks()[0].enabled = false;
                setIsAudio(false);
                stream.getVideoTracks()[0].enabled = false;
                setIsVideo(false);
                ///////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/////////////////////////////////




                /////////////// basic documentation to collect and display audio and video//////////////////
                // (available on webrtc documentation)  //
                setStreamObj(stream);
                let myVideo = document.getElementById("myVideo");

                if ("srcObject" in myVideo) {
                    myVideo.srcObject = stream;
                } else {
                    myVideo.src = window.URL.createObjectURL(stream);
                }

                myVideo.play();
                ////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////////         




                peer = new Peer({
                    initiator: isAdmin,
                    trickle: false,
                    stream: stream,
                });

                if (!isAdmin) {
                    getRecieverCode();
                }

                peer.on("signal", async (data) => {
                    if (isAdmin) {
                        let payload = {
                            id,
                            signalData: data,
                        };
                        // it will postrequest if user is admin
                        await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
                    } else {
                        // socket.emit("code", data, (cbData) => {                                    //when only one room was created
                        //     console.log("code sent");
                        // });
                        socket.emit("code", { code: data, url }, (cbData) => {                       //dynamically infinite rooms cn be created now
                            console.log("code sent");
                        });
                    }
                });

                ///////////////// will alert us when both peers are connected//////////////
                peer.on("connect", () => {
                    console.log('peer connected');
                    window.alert("You two are now connected");
                });
                //////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ////////////




                ///////// when TYPE is "addmessage" it will send a payload to messagelistreducer and mwessage will be displayed with properties assigned /////////
                peer.on("data", (data) => {
                    clearTimeout(alertTimeout);
                    messageListReducer({
                        type: "addMessage",
                        payload: {
                            user: "other",
                            msg: data.toString(),
                            time: Date.now(),
                        },
                    });
                    /////////////////////////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx /////////////////////////////////////




                    //////// when type is not assigned it uses by default method and send a payload to message list reducer ////////////////////////////////////

                    // message will be shown as a popup which will disappear after 6secs
                    setMessageAlert({
                        alert: true,
                        isPopup: true,
                        payload: {
                            user: "You have an unseen text :",
                            msg: data.toString(),
                        },
                    });

                    alertTimeout = setTimeout(() => {
                        setMessageAlert({
                            ...messageAlert,
                            isPopup: false,
                            payload: {},
                        });
                    }, 6000);
                });
                /////////////////////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ////////////////////////////////




                //////////////////// it will getelementbyid of user video and set it to play on your screen //////////////////////////////////////////////
                peer.on("stream", (stream) => {
                    let video = document.getElementById("video");

                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                    video.play();
                });
            })
            .catch(() => {
                console.log('error');
            })
    };
    ////////////////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx /////////////////////////////////////////////




    //////////////////// function to turn on/off your mic //////////////////////
    const toggleAudio = (value) => {
        streamObj.getAudioTracks()[0].enabled = value;
        setIsAudio(value);
    };
    /////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ////////////////////////




    //////////////// function to highlight yourself ////////////////////////////
    const toggleFocusOnMe = (value) => {
        setIsFocusOnMe(value);
    };
    //////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ///////////////////////////    




    //////////////////// function to turn on/off your video ///////////////////
    const toggleVideo = (value) => {
        streamObj.getVideoTracks()[0].enabled = value;
        setIsVideo(value);
    };
    //////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////   




    //////////////////////// function to leave group //////////////////////////
    const disconnectCall = () => {
        // it will emit message to socket with which socket will response by displaying alert message given
        socket.emit("user-disconnected", { data: true, url }, (cbData) => { console.log("disconnected"); });
        peer.destroy();
        //history.push(`${window.location.pathname}/thanks`);       // to display thanks page we created
        history.push("./");
        window.location.reload();
    };
    //////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////     




    ////////////// when TYPE is "addmessage" it will send a payload to messagelistreducer and mwessage will be displayed with properties assigned////////////////
    const sendMsg = (msg) => {
        peer.send(msg);
        messageListReducer({
            type: "addMessage",
            payload: {
                user: "you",
                msg: msg,
                time: Date.now(),
            },
        });
    };
    /////////////////////////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////////////////




    //////////////////////// function to tart screen-share //////////////////////////

    // it will replace peer video tracks while screensharing and again replace it with user video when we stop screen share
    const screenShare = () => {
        navigator.mediaDevices
            .getDisplayMedia({ cursor: true })
            .then((screenStream) => {
                peer.replaceTrack(
                    streamObj.getVideoTracks()[0],
                    screenStream.getVideoTracks()[0],
                    streamObj
                );
                setScreenCastStream(screenStream);
                screenStream.getTracks()[0].onended = () => {
                    peer.replaceTrack(
                        screenStream.getVideoTracks()[0],
                        streamObj.getVideoTracks()[0],
                        streamObj
                    );
                };
                setIsPresenting(true);
            });
    };
    ////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ///////////////////////// 



    //////////////////////// function to start screen-share //////////////////////////

    const stopScreenShare = () => {
        screenCastStream.getVideoTracks().forEach(function (track) {
            track.stop();
        });
        peer.replaceTrack(
            screenCastStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
        );
        setIsPresenting(false);
    };
    ////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ///////////////////////// 



    //////////////////////// function to start screen-shot //////////////////////////
    const specificRef = useRef();
    const handleTakeScreenShot = () => {
        saveAsPng(specificRef.current, { filename: 'TeamschatSS', printDate: true });
    };
    ////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ///////////////////////// 



    //////////////////////// function to switch between meet and chat  //////////////////////////
    const toggleisStartVC = (value) => {
        if (value) {
            socket.emit("start-meet", { data: true, url }, (cbData) => { console.log("start-meet"); });
        }
        else {
            socket.emit("end-meet", { data: true, url }, (cbData) => { console.log("end-meet"); });
        }

        setIsStartVC(value);
    };
    ///////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ///////////////////////////




    //////////////////////// function to play and pause live user-video and creenshare //////////////////////////
    // to play video
    const playVideo = () => {
        let video = document.getElementById("video");
        setIsPlay(true);
        video.play();
    };

    // to pause video
    const pauseVideo = () => {
        let video = document.getElementById("video");
        setIsPlay(false);
        video.pause();
    };
    ///////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////////////// 




    ///////////////////////// socket to display when your partner startes or ended the meet //////////////////////
    socket.on("end-meet", (data) => {
        if (data.url === url) {
            window.alert("Your partner has ended/left the meeting");
        }
    });

    socket.on("start-meet", (data) => {
        if (data.url === url) {
            window.alert("Your partner has started/joined the meeting");
        }
    });
    ///////////////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////////////// 




    return (
        // it contains region of our screen shot portion  
        <div className="ssportion" ref={specificRef}>
            <div className="callpage-container">
                {/* we caall our header component */}
                <CallPageHeader
                    isMessenger={isMessenger}
                    setIsMessenger={setIsMessenger}
                    messageAlert={messageAlert}
                    setMessageAlert={setMessageAlert}
                    isStartVC={isStartVC}
                    toggleisStartVC={toggleisStartVC}
                    handleTakeScreenShot={handleTakeScreenShot}
                    isAudio={isAudio}
                    toggleAudio={toggleAudio}
                    isVideo={isVideo}
                    toggleVideo={toggleVideo}
                    pauseVideo={pauseVideo}
                    playVideo={playVideo}
                />

                {/* this is our popup component which we can enable if we want */}
                {isAdmin && Popup && (
                    <Popup setPopup={setPopup}
                        url={url}
                        joincode={joincode}
                    />
                )}

                {/* if chat-box is not open and meet is not started we get notifications */}
                <div >
                    {isMessenger || !isStartVC ? (
                        <Messenger
                            setIsMessenger={setIsMessenger}
                            sendMsg={sendMsg}
                            messageList={messageList}
                            isStartVC={isStartVC}
                        />
                    ) : (
                        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
                    )}
                </div>
                {/* our call page works in 2 parts one when meet is not started and one when it is started */}
                {isStartVC ? (
                    // this contains when meet is not started

                    // inside videoframe our and partner video is displayed
                    <div className="videoframe">
                        {/* isfocusme shows us/partner on highlight on clicking video */}
                        {isFocusOnMe ? (
                            //  when user is on-focus
                            <div >
                                <video playsInline id="video" className="video-container1 "
                                    src=""
                                    onClick={() => toggleFocusOnMe(!isFocusOnMe)}
                                >
                                </video>
                                <video playsInline id="myVideo" muted className="video-container2"
                                    src=""
                                    onClick={() => toggleFocusOnMe(!isFocusOnMe)}
                                >
                                </video>
                            </div>

                        ) : (
                            //   when you are in focus
                            <div >
                                <video playsInline id="video" className="video-container4 "
                                    src=""
                                    onClick={() => toggleFocusOnMe(!isFocusOnMe)}
                                >
                                </video>
                                <video playsInline id="myVideo" muted className="video-container3"
                                    src=""
                                    onClick={() => toggleFocusOnMe(!isFocusOnMe)}
                                >
                                </video>
                            </div>

                        )}
                        {/* this is our footer component which takes varous arguments we require in footer section */}
                        <CallPageFooter
                            isPresenting={isPresenting}
                            stopScreenShare={stopScreenShare}
                            screenShare={screenShare}
                            isAudio={isAudio}
                            toggleAudio={toggleAudio}
                            isVideo={isVideo}
                            toggleVideo={toggleVideo}
                            disconnectCall={disconnectCall}
                            setPopup={setPopup}
                            joincode={joincode}
                            playVideo={playVideo}
                            pauseVideo={pauseVideo}
                            isPlay={isPlay}
                        />
                    </div>
                ) : (
                    <div>

                        {/*  /////////////// used this commented below code for testing purpose ///////////////////// */}
                         {isFocusOnMe ? (
                            <div >
                                <video width="0" height="0" playsInline id="video" className=""
                                    src=""
                                >
                                </video>
                                <video width="0" height="0" playsInline id="myVideo" muted
                                    src=""
                                >
                                </video>
                            </div>
                        ) : (
                            <div >
                                <video width="0" height="0" playsInline id="video" className=""
                                    src=""
                                >
                                </video>
                                <video width="0" height="0" playsInline id="myVideo" muted
                                    src=""
                                >
                                </video>
                            </div>
                        )}    
                  {/* ///////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx///////////////////////////   */} 
                    </div>
                )}



                {/* when meet is not started it contains teams logo */}
                <div className="background">
                    <img className="img-size" src="https://helphub.wmich.edu/hc/article_attachments/360087725571/microsoft-teams-logo.png" />
                </div>
                {/* ////////////////xxxxxxxxxxx/////////////////// */}




                {/* it is our chat footer which contains button to copy and share group code and leave the froup */}
                <div className="chat-footer">
                    <div className="flex-start-item ">


                        {/* to copy and share group code */}
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
                                {/* ///////// xxxxxxxx //////// */}


                            </Tooltip>
                            <Tooltip title="Share code directly via mail" arrow>


                                {/* it will directly redirect us to email with already written body and subject */}
                                <EmailShareButton
                                    subject={"Code to join the group"}
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
                                {/* /////////////////////// xxxxxxxxxxxxxxxxxxxxxxx ////////////////////////// */}


                            </ Tooltip>
                        </div>
                    </div>
                    <div className="flex-end-item ">


                        {/* to leace group button */}
                        <div className="footer-items icon-block" onClick={disconnectCall} >
                            <FontAwesomeIcon className="icon red" icon={faSignOutAlt} />
                            <p className="title">Exit Group</p>
                        </div>
                        {/* ////////// xxxxxxxx ////// */}


                    </div>
                </div>
            </div>
            {/* //////////////////////// xxxxxxxxxxxxxxxxxxxxxxxxxxxxx //////////////////////////////// */}
        </div>
    );
};
export default CallPage;