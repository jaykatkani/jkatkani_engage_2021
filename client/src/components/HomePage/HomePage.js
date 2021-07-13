// this is the authentication page and the first page of our website
// i have used firebase authentication as it is very easy and secure

//
import './HomePage.scss';
import React from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Component } from "react";
import HomePage2 from './HomePage2';


// our firebase apikey and auth-domain
firebase.initializeApp({
    apiKey: "AIzaSyDjBPjx6DalODJBzFhjQRGfZPrRNpUmyPw",
    authDomain: "authentication-dddcb.firebaseapp.com"
})

//if we are not signedIn we get display of ways to sign in and a welcome message and iif we are siggned in homepage2 omponent is called
class App extends Component {
    state = { isSignedIn: false }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            {
                provider: 'microsoft.com',
                loginHintKey: 'login_hint'
            },
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }


    render() {
        return (
            // if we are siggned in homepage2 component is called
            <div className="App">

                {this.state.isSignedIn ? (

                    <div className="body">
                        <HomePage2 />
                    </div>
                    
                ) : (
                    // if we are not siggned in we get various options to signin and a welcome text
                    <div className="welcome">


                        <div className="heading">
                            <br /><br />
                            <h1>Welcome to Microsoft Teams Clone </h1>
                            <h1>
                                We're super excited to have you on board!
                            </h1>
                        </div>


                        <div class="container" id="container">


                            <div class="overlay-container">
                                <div class="overlay">
                                    <div class="overlay-panel overlay-right">
                                    </div>
                                </div>
                            </div>


                            <div class="form-container sign-in-container">
                                <form action="#">
                                    <h2 style={{ color: "white" }}> &nbsp;&nbsp;&nbsp;Create an account<br />&nbsp;&nbsp;&nbsp;&nbsp;It's quick and easy</h2>
                                    <div class="social-container">
                                        <StyledFirebaseAuth
                                            uiConfig={this.uiConfig}
                                            firebaseAuth={firebase.auth()}
                                        />
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>
                )}
            </div>
        )
    }
}


export default App