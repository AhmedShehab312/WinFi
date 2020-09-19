import React from 'react';
import {
    Col, Row, Button, Form, FormGroup, Input, Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import './CompanyProfileStyle.scss';
import i18n from '../../i18n';
import { InputWithText } from '../../components/ComponentModule'

class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileObject: {
                profilePic: require("../../../src/assets/img/default-avatar.jpg"),
                Name: "Ahmed Shehab",
                Email: "",
                UserName: "AhmedShehab3321",
                Password: "",
                Address: "",
                Contact: "",
                ContactPersonal: ""
            }
        }
    }



    changePhoto(event) {
        event.preventDefault();
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                profilePic: [reader.result]
            })
        }.bind(this);
    }

    checkValidation() {
        return true;
    }


    submit() {
        const { profileObject } = this.state
        if (this.checkValidation()) {
            console.log(profileObject)
        }
    }

    changeInput(Input, val) {
        switch (Input) {
            case 'Email':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        Email: val
                    }
                })
                break;
            case 'Password':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        Password: val
                    }
                })
                break;
            case 'Address':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        Address: val
                    }
                })
                break;
            case 'Contact':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        Contact: val
                    }
                })
                break;
            case 'ContactPersonal':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        ContactPersonal: val
                    }
                })
                break;
        }

    }

    render() {
        const { profilePic, Name, Email, UserName, Password, Address, Contact, ContactPersonal } = this.state.profileObject;
        return (
            <div className="content CompanyProfile">
                <Col md="11">
                    <Card>
                        <CardHeader>
                            <h2 className="header">{i18n.t("CompanyProfile.title")}</h2>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup className="profilePicContainer">
                                            <label>{i18n.t("CompanyProfile.Logo")}</label>
                                            <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                            <img alt="" src={profilePic} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("CompanyProfile.NamePlacholder")} value={Name} disabled />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="email" label={i18n.t("CompanyProfile.Email")} placeholder={i18n.t("CompanyProfile.EmailPlacholder")} onChange={(val) => this.changeInput("Email", val)} value={Email} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.UserName")} placeholder={i18n.t("CompanyProfile.UserNamePlacholder")} disabled value={UserName} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("Password", val)} value={Password} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeInput("Address", val)} value={Address} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeInput("Contact", val)} value={Contact} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeInput("ContactPersonal", val)} value={ContactPersonal} />
                                    </Col>
                                </Row>
                                <Button onClick={() => { this.submit() }}>{i18n.t("global.submit")}</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}


export default CompanyProfile;
