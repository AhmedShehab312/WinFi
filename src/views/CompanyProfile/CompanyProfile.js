import React from 'react';
import {
    Col, Row, Button, Form, FormGroup, Input, Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import './CompanyProfileStyle.scss';

class CompanyProfile extends React.Component {

    state = {
        imgSrc: require("../../../src/assets/img/default-avatar.png")
    }


    changePhoto(event) {
        const file = event.currentTarget.files;
        var reader = new FileReader();
        var url = reader.readAsDataURL(file[0]);

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
                            <h2 className="title">Company Profile</h2>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup className="profilePicContainer">
                                            <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                            <img src={this.state.imgSrc} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label for="title">Email</label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label for="examplePassword">Password</label>
                                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <label for="exampleAddress">Address</label>
                                    <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                                </FormGroup>
                                <FormGroup>
                                    <label for="exampleAddress2">Address 2</label>
                                    <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
                                </FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label for="exampleCity">City</label>
                                            <Input type="text" name="city" id="exampleCity" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label for="exampleState">State</label>
                                            <Input type="text" name="state" id="exampleState" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label for="exampleZip">Zip</label>
                                            <Input type="text" name="zip" id="exampleZip" />
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
