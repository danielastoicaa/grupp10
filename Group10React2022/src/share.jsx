//Importerar Row och Col från React Bootstrap, samt
import { Row, Col } from "react-bootstrap";

//Importerar FontAwesomeIcon, faLink, faShareAlt och faDownload från Fort Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faShareAlt,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

export const Share = (props) => {

  return (

    <Row className={props.rowClass}>
      {/* Boxen för dela-ikonerna */}
      <Col className="col-auto p-lg-2 p-1 px-lg-3 px-2 me-2 rounded-3" style={{border: "1px ridge white"}}>
        {/* Delningsalternativ "dela" */}
        <FontAwesomeIcon
          icon={faShareAlt}
          className="faShareAlt m-1 me-2"
          color="white"
        />
        {/* Delningsalternativ "kopiera länk" */}
        <FontAwesomeIcon
          icon={faLink}
          className="faLink m-1 me-2"
          color="white"
        />
        {/* Delningsalternativ "ladda ned" */}
        <FontAwesomeIcon
          icon={faDownload}
          className="faDownload m-1"
          color="white"
        />
      </Col>
    </Row>
    
  );
};