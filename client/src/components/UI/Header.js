import './Header.scss';
import firebase from "firebase";

// a header componennt with microsoft logo and signout button
const Header = () => {
  return (
    <div className="header">

      {/* teams logo */}
      <img className="logo" src="https://helphub.wmich.edu/hc/article_attachments/360087725571/microsoft-teams-logo.png" />      

      {/* sign-out button */}
      <div className="right">
        <button 
        className="btn" 
        onClick={() => 
        firebase.auth().signOut()
        }>
          Sign out!
        </button>                                  
      </div>
    </div>
  );
};
export default Header;