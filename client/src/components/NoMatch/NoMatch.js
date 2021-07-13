// a simple invalid page page that contains an error message and link to homescreen button   
import { Link } from "react-router-dom";
import "./NoMatch.scss";
import Header from "../UI/Header";

const NoMatch = () => {
  return (
    <div className="no-match">
      <Header />
      <div className="no-match__content">
        <h2>Invalid ID Entered.</h2>
        <div className="action-btn">
          <Link className="btn green" to="/">
            Go back to home screen
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NoMatch;