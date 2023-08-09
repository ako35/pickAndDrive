import { Link } from "react-router-dom";
import "./dashboard-card.scss";
import { Spinner } from "react-bootstrap";

const DashboardCard = (props) => {
  return (
    <Link to={props.path}>
      <div className="dashboard-card" title={props.title}>
        <div className="icon">{props.icon}</div>
        <div className="context">
          <div className="title">
            <h3>{props.title}</h3>
          </div>
          <div className="item">
            {props.statistics ? (
              <p>{props.statistics}</p>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
