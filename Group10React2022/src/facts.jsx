//Importerar Row Col från React Bootstrap
import {Row, Col} from 'react-bootstrap';

export const Facts = (props) => {

    return (
        
        /* Komponenten för de olika faktarutorna. Hanteras med hjälp av props för att anpassas till olika innehåll och sammanhang */
        <Col className={props.colClass}>
            <Row>
                <Col className="m-4 p-4" style={{border:"1px solid white"}}>
                    <h3 style={{fontSize:"1.2rem"}}>{props.factsTitle}</h3>
                    {props.factTxt}
                </Col>
            </Row>
        </Col>
        
    )

};