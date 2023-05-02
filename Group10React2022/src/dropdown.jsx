//Importerar Row, Col och Dropdown från React Bootstrap, 
import { Row, Col, Dropdown } from 'react-bootstrap';
//Importerar Slider från MUI
import Slider from '@mui/material/Slider';

export const DropDown = (props) => {

    return (

        <Row>
            <Col>
                {/* Bootstrap Dropdown-komponent */}
                <Dropdown align="middle">
                    <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:'#fff', color:'#000', borderColor:'#000'}}>
                        {props.dropdownTxt}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="px-3">
                        {/* Slider-komponent från MUI, i dropdown-meny.
                            onChange-event som triggar en callback-funktion som skickar med sliderns värde till parent-komponenten */}
                        <Slider
                            onChange={(event) => props.callback(event.target.value)}
                            defaultValue={props.default}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            min={props.min}
                            max={props.max}
                            style={{width:'400px'}} 
                        />
                    </Dropdown.Menu>
                </Dropdown>

            </Col>
        </Row>
    )

};