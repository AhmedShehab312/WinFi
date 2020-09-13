import React from 'react';
import {
    Col, Row, Button, Form, FormGroup, Input, Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import './CompanyProfileStyle.scss';

class CompanyProfile extends React.Component {

    state = {
        imgSrc: require("../../../src/assets/img/default-avatar.jpg")
    }


    changePhoto(event) {
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result]
            })
        }.bind(this);
    }

    render() {
        return (
            <div className="content CompanyProfile">
                <Col md="11">
                    <Card>
                        <CardHeader>
                            <h2 className="header">Company Profile</h2>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="profilePicContainer">
                                            <label>Logo</label>
                                            <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                            <img alt="" src={this.state.imgSrc} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >Name (unique)</label>
                                            <Input type="text" placeholder="Ahmed212" value="Ahmed234" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >Email</label>
                                            <Input type="email" placeholder="Email" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >UserName</label>
                                            <Input type="text" placeholder="Ahmed212" value="AhmedShehab234" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >Password</label>
                                            <Input type="pasword" placeholder="pasword" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <label >Address</label>
                                    <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >Contact</label>
                                            <Input type="number" placeholder="01222****" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label >Contact Personal</label>
                                            <Input type="number" placeholder="01222****" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}


export default CompanyProfile;
