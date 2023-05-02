//Importerar Col från React Bootstrap
import {Col} from 'react-bootstrap';

export const Logo = (props) => {

    return (
        /* Logotyp för appen. En enkel Bootstrap-kolumn med en p-tagg för appens namn */
        <Col className={props.class}>
            <p style={props.style} className={props.className}>Klimatet</p>
        </Col>
    )

};