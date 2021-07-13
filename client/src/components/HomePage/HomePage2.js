// this is the landing page of our app it cointains a header with teams logo and signout button
// it cointains button to create group and join group and preview in right side to see our video


// we import modules , libraries, api and components to generate unique id, authenticaton and some components we will require
import './HomePage2.scss';
import Header from './../UI/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import Preview from './Preview';
import firebase from "firebase";
import { Tooltip } from '@material-ui/core';
// we have added bootstrap to our code
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet" />


const HomePage2 = () => {
    const history = useHistory();




    // this function on clicking will create a group and you will be directed to call page
    const startCall = () => {
        const uid = shortid.generate();
        history.push(`/${uid}#init`);
    };




    // this function on clicking will create a group and you will be directed to call page if correct id is entered or you will be directed to nomatchpage
    const joinCall = () => {
        let myform = document.getElementById("myform").elements["foo"].value;
        //console.log(document.getElementById("myform").elements["foo"].value);
        if (shortid.isValid(myform)) {
            history.push(`/${myform}`);
        }
        else {
            history.push(`/${myform}/k`);
        }
    };


    return (

        <div className="home-page">
            <Header />
            <div className="body">
                <div className="left-side">
                    <div className="content">

                       {/* contains some text and create and join group buttons */}
                        <h1 className="welcome" >Welcome! {firebase.auth().currentUser.displayName} </h1>
                        <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
                        <h2>Simple, safe and fun app to chat and meet!
                            No downloads required</h2>
                       
                                {/* <p>
                                Features: <br />
                                 1. One to one video/audio calling.<br />
                                 2. Screen Sharing.<br />
                                 3. Basic chat functionality.<br />
                                 4. Message Alerts.
                                 5. switch between meet and chats
                                 6. pause/play uservideo
                                 7. focus on me
                                 8. directly share meeting code
                                 9. share emojis
                                 10. chat screenshots
                                 11. secure and safe authentication
                                 </p> */}
            

                        <div className="action-btn"  >
                            <button className="btn green" onClick={startCall}>
                                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                                Create a group
                            </button>
                            <div className="input-block">
                                <div className="input-section" >
                                    <form id="myform" method="GET">
                                        <input name="foo" placeholder="Enter code to join" />
                                    </form>
                                </div>
                                <button className="btn no-bg" onClick={joinCall}>Join group</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* //////// xxxxxxxxxxxxxxx /////////// */}


                {/* here we can see our preview */}
                <Tooltip title="Only you can see this preview" arrow>
                    <div className="right-side">
                        <Preview />
                        {/* <div classname="preview"><h3>*only you can see this preview</h3></div> */}
                    </div>
                </Tooltip>
            </div>
               {/* ////////xxxxxxxxx/////// */}
        </div>
    );
};
export default HomePage2;