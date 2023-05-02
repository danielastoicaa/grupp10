//Importerar Col från React Bootstrap
import {Col} from 'react-bootstrap';

// Importerar nödvändiga komponenter
import earthgraphic from './images/earth.png'


export const EarthGraphic = (props) => {

    return (

        <Col className="d-inline col-auto d-flex align-items-center pe-0 ms-4">
            {/* Bilden på jordgloben som syns i headern */}
            <img src={earthgraphic} width={props.width} alt="Climate Change Logo" style={props.style} />
        </Col>
        
    )

};