// message component

import { useState } from "react";
import "./Messenger.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./../../../utils/helper";
import React from "react";

const Messenger = ({ setIsMessenger, sendMsg, messageList, isStartVC, }) => {

   ////////////// we use react hooks to setmessage string to null ///////////////////////////
    const [msg, setMsg] = useState("");
    const handleChangeMsg = (e) => {
        setMsg(e.target.value);
    };

    ////// It will send message on hitting enter key and set string again to null ////////////
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMsg(msg);
            setMsg("");
        }
    };

    ////////////// It will send message and set string again to null ///////////////////////////
    const handleSendMsg = () => {
        sendMsg(msg);
        setMsg("");
    };

    //////////////// emoji-section ////////////////////////
    const laughingemoji = () => {
        sendMsg("😂");
        setMsg("");
    };

    const sademoji = () => {
        sendMsg("😞");
        setMsg("");
    };

    const angryemoji = () => {
        sendMsg("😡");
        setMsg("");
    };

    const heartemoji = () => {
        sendMsg("❤️");
        setMsg("");
    };

    const cryingemoji = () => {
        sendMsg("😭");
        setMsg("");
    };

    const winkemoji = () => {
        sendMsg("😉");
        setMsg("");
    };

    const inlovemoji = () => {
        sendMsg("😍");
        setMsg("");
    };

    const sleepyemoji = () => {
        sendMsg("😴");
        setMsg("");
    };

    const tongueemoji = () => {
        sendMsg("😜");
        setMsg("");
    };

    const worriedemoji = () => {
        sendMsg("😱");
        setMsg("");
    };
    ///////////////////////////////////////////////////

    return (
        <div>
          {/* if videocall is not started */}
            {!isStartVC ? (
                <div className="messenger-container1" >
                    <div className="messenger-header">
                        <h3>Meeting Chat</h3>
                       
                        {isStartVC ? (
                            <FontAwesomeIcon
                                className="icon"
                                icon={faTimes}
                                onClick={() => {
                                    setIsMessenger(false);
                                }}
                            />
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="messenger-header-tabs">
                    </div>

                    {/* if i am sending msg it displays by chat-block 1 if partner is sending it is added to chat-block 2 */}
                    {/* we are using messagelistreducer to display messgae */}
                    <div className="chat-section"  >
                        {messageList.map((item) => (
                            item.user.length == 3 ? (
                                <div key={item.time} className="chat-block1">
                                    <p className="msg">{item.msg}</p>
                                    <div className="sender">
                                        <small>{formatDate(item.time)}</small>
                                    </div>
                                </div>
                            ) : (
                                <div key={item.time} className="chat-block2">
                                    <p className="msg">{item.msg}</p>
                                    <div className="sender">
                                        <small>{formatDate(item.time)}</small>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="send-msg-section">
                        {/* in this tag we will write message */}
                        <input
                            className="input-placeholder"
                            placeholder="Enter a Message"
                            value={msg}
                            onChange={(e) => handleChangeMsg(e)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />

                        <FontAwesomeIcon
                            className="icon"
                            icon={faPaperPlane}
                            onClick={handleSendMsg}
                        />

                    </div>
                    <div className="send-emoji-section">
                        <div className="emoji" onClick={laughingemoji}>😂</div>
                        <div className="emoji" onClick={sademoji}>😞</div>
                        <div className="emoji" onClick={angryemoji}>😡</div>
                        <div className="emoji" onClick={heartemoji}>❤️</div>
                        <div className="emoji" onClick={cryingemoji}>😭</div>
                        <div className="emoji" onClick={winkemoji}>😉</div>
                        <div className="emoji" onClick={inlovemoji}>😍</div>
                        <div className="emoji" onClick={sleepyemoji}>😴</div>
                        <div className="emoji" onClick={tongueemoji}>😜</div>
                        <div className="emoji" onClick={worriedemoji}>😱</div>
                    </div>
                </div>
            ) : (
               /* if videocall  started */
                <div>
                    <div className="messenger-container2" >
                        <div className="messenger-header">
                            <h3>Meeting Chat</h3>
                            {isStartVC ? (
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faTimes}
                                    onClick={() => {
                                        setIsMessenger(false);
                                    }}
                                />
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div className="messenger-header-tabs">
                        </div>
                         {/* if i am sending msg it displays by chat-block 1 if partner is sending it is added to chat-block 2 */}
                         {/* we are using messagelistreducer to display messgae */}
                        <div className="chat-section"  >
                            {messageList.map((item) => (
                                item.user.length == 3 ? (
                                    <div key={item.time} className="chat-block1">
                                        <p className="msg">{item.msg}</p>
                                        <div className="sender">
                                            <small>{formatDate(item.time)}</small>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={item.time} className="chat-block2">
                                        <p className="msg">{item.msg}</p>
                                        <div className="sender">
                                            <small>{formatDate(item.time)}</small>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="send-msg-section">
                           {/* in these tag we will write message */}
                            <input
                                className="input-placeholder"
                                placeholder="Enter a Message"
                                value={msg}
                                onChange={(e) => handleChangeMsg(e)}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />

                            <FontAwesomeIcon
                                className="icon"
                                icon={faPaperPlane}
                                onClick={handleSendMsg}
                            />
                        </div>
                        <div className="send-emoji-section">
                            <div className="emoji" onClick={laughingemoji}>😂</div>
                            <div className="emoji" onClick={sademoji}>😞</div>
                            <div className="emoji" onClick={angryemoji}>😡</div>
                            <div className="emoji" onClick={heartemoji}>❤️</div>
                            <div className="emoji" onClick={cryingemoji}>😭</div>
                            <div className="emoji" onClick={winkemoji}>😉</div>
                            <div className="emoji" onClick={inlovemoji}>😍</div>
                            <div className="emoji" onClick={sleepyemoji}>😴</div>
                            <div className="emoji" onClick={tongueemoji}>😜</div>
                            <div className="emoji" onClick={worriedemoji}>😱</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messenger;