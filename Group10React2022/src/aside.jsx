import 'bootstrap/dist/css/bootstrap.min.css';
//Importerar Row, Col och Nav från React Bootstrap
//Importerar Link från React Router
import { Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Importerar nödvändiga komponenter
import { IconBtn } from './iconbtn.jsx';
import cloud from './images/cloud.png'
import temperature from './images/temperature.png'
import glacier from './images/glacier.png'
import water from './images/water.png'
import all from './images/all.png'

export const Aside = () => {

    return (

        <Row>
            <Col className="px-4 py-4">
                {/* Sidmeny som visas till vänster i Effekter-vyn och dess undersidor */}
                <Nav defaultActiveKey="/viewall" style={{display:"block"}}>
                    {/* Nav.Item för länk till ViewAll */}
                    <Nav.Item style={{position:"relative"}}>
                        <Row>
                            <Col className="my-2">
                                <Nav.Link as={Link} to="/effects/viewall" href="/viewall">
                                    {/* IconBtn med props för att anpassas till ViewAll-länk */}
                                    <IconBtn 
                                        img={all}
                                        imgWidth="50px"
                                        class="col-auto allBtn d-flex align-items-center justify-content-center"
                                        className="mb-1"
                                        alt="Menyikon - visa alla"
                                        style={{width:"90px", height:"90px", borderRadius:"50%", border:"2px solid #fff"}}
                                        outerDivStyle={{width:"110px", height:"110px", borderRadius:"50%"}}
                                    />
                                    {/* Etikett för länk till ViewAll */}
                                    <Col className="col-all d-none p-0 align-items-end justify-content-end text-end" style={{width:"100px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                                        Visa alla
                                    </Col>
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Nav.Item>
                    {/* Nav.Item för länk till CO2 */}
                    <Nav.Item style={{position:"relative"}}>
                        <Row>
                            <Col className="my-2">
                                <Nav.Link as={Link} to="/effects/CO2" eventKey="co2">
                                    {/* IconBtn med props för att anpassas till CO2-länk */}
                                    <IconBtn 
                                        img={cloud}
                                        imgWidth="50px"
                                        class="col-auto co2Btn d-flex align-items-center justify-content-center"
                                        className="mb-2"
                                        alt="Menyikon - moln"
                                        style={{width:"90px",height:"90px", borderRadius:"50%", border:"2px solid #3AC9A8"}}
                                        outerDivStyle={{width:"110px", height:"110px", borderRadius:"50%"}}
                                    />
                                    {/* Etikett för länk till CO2 */}
                                    <Col className="col-co2 d-none p-0 align-items-end justify-content-end text-end" style={{width:"140px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                                        Koldioxidutsläpp
                                    </Col>
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Nav.Item>
                    {/* Nav.Item för länk till Temperature */}
                    <Nav.Item style={{position:"relative"}}>
                        <Row>
                            <Col className="my-2">
                                <Nav.Link as={Link} to="/effects/temperature" eventKey="temperature">
                                    {/* IconBtn med props för att anpassas till Temperature-länk */}
                                    <IconBtn
                                        img={temperature}
                                        imgWidth="40px"
                                        class="col-auto tempBtn d-flex align-items-center justify-content-center"
                                        alt="Menyikon - termometer"
                                        style={{width:"90px", height:"90px", borderRadius:"50%", border:"2px solid #E53B3B"}}
                                        outerDivStyle={{width:"110px", height:"110px", borderRadius:"50%"}}
                                    />
                                    {/* Etikett för länk till Temperature */}
                                    <Col className="col-temp d-none p-0 align-items-end justify-content-end text-end" style={{width:"110px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                                        Temperatur
                                    </Col>
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Nav.Item>
                    {/* Nav.Item för länk till Glacier */}
                    <Nav.Item style={{position:"relative"}}>
                        <Row>
                            <Col className="my-2">
                                <Nav.Link as={Link} to="/effects/glacier" eventKey="glacier">
                                    {/* IconBtn med props för att anpassas till Glacier-länk */}
                                    <IconBtn
                                        img={glacier}
                                        imgWidth="40px"
                                        class="col-auto glacierBtn d-flex align-items-center justify-content-center"
                                        className="mb-2"
                                        alt="Menyikon - glaciär"
                                        style={{width:"90px", height:"90px", borderRadius:"50%", border:"2px solid #C991EC"}}
                                        outerDivStyle={{width:"110px", height:"110px", borderRadius:"50%"}}
                                    />
                                    {/* Etikett för länk till Glacier */}
                                    <Col className="col-glacier d-none p-0 align-items-end justify-content-end text-end" style={{width:"120px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                                        Glaciärstorlek
                                    </Col>
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Nav.Item>
                    {/* Nav.Item för länk till Sea */}
                    <Nav.Item className="item-sea" style={{position:"relative"}}>
                        <Col className="col-sea d-none p-0 align-items-end justify-content-end text-end" style={{width:"100px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                            Havsnivå
                        </Col>
                        <Row>
                            <Col className="my-2">
                                <Nav.Link as={Link} to="/effects/sea" eventKey="sea">
                                    {/* IconBtn med props för att anpassas till Sea-länk */}
                                    <IconBtn
                                        img={water}
                                        imgWidth="40px"
                                        class="col-auto seaBtn d-flex align-items-center justify-content-center"
                                        alt="Menyikon - vatten"
                                        style={{width:"90px", height:"90px", borderRadius:"50%", border:"2px solid #4C8DCE"}}
                                        outerDivStyle={{width:"110px", height:"110px", borderRadius:"50%"}}
                                    />
                                    {/* Etikett för länk till Sea */}
                                    <Col className="col-sea d-none p-0 align-items-end justify-content-end text-end" style={{width:"100px", position:"absolute", left:"121%", top:"50%", marginTop:"-25px", borderBottom:"solid 1px #fff"}}>
                                        Havsnivå
                                    </Col>
                                </Nav.Link>
                            </Col>
                        </Row>
                    </Nav.Item>
                </Nav>
            </Col>
        </Row>
        
    )

};