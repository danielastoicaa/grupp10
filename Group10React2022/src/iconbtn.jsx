//Importerar Row och Col från React Bootstrap
import {Row, Col} from 'react-bootstrap';

export const IconBtn = (props) => {

    return (
        
        /* Komponent för ikon-knapparna som syns i Start-vyn och i sidmenyn i de olika Effekter-vyerna 
            Mycket av stylingen och klasserna styrs med props just för att komponenten ska vara återanvändbar */
        <Row className="justify-content-center" style={props.rowStyle}>
            <Col className={props.class} style={props.outerDivStyle}>
                <Col className="col-auto innerDiv d-flex align-items-center justify-content-center" style={props.style}>
                    {props.textElement}
                    <img src={props.img} width={props.imgWidth} className={props.className} alt={props.alt} />
                </Col>
            </Col>
        </Row>
        
    )

};
