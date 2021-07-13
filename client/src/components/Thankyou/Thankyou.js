// a simple thankyou page that contains a thankyou message and link to homescreen  
import { Link } from "react-router-dom";
import "./Thankyou.scss";
import Header from "../UI/Header";

const Thankyou = () => {
  return (
    <div className="thanks">
      <Header />
      <div className="thanks__content">
        <h2>Thankyou for using teams.Have a great day!</h2>
        <div className="action-btn">
          <Link className="btn" to="/">
            Go back to home screen
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Thankyou;