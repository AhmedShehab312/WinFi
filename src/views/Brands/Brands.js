import React from 'react';
import {
    Table,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    UncontrolledTooltip,
    Form, FormGroup, Input,
    Button
} from 'reactstrap';
import './BrandsStyle.scss';
import NotificationAlert from "react-notification-alert";
import { InputWithText, DropDown } from '../../components/ComponentModule'
import { HtttpGetDefult, HtttpPostDefult } from '../../actions/httpClient';
import i18n from '../../i18n';

class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            data: [
                {
                    id: '1',
                    name: 'StarBuks',
                    address: "Cairo",
                    assignedPackage: { name: "A", key: 1 },
                    employeesNo: '40',
                    usedFrompackage: {
                        totalSMS: '20',
                        totalNotification: '65',
                        totalEmails: '22',
                        renewalDate: '12-2-2021'
                    }
                },
                {
                    id: '2',
                    name: 'Macdonald',
                    address: "Alex",
                    assignedPackage: { name: "B", key: 1 },
                    employeesNo: '80',
                    usedFrompackage: {
                        totalSMS: '12',
                        totalNotification: '25',
                        totalEmails: '23',
                        renewalDate: '12-4-2021'
                    }
                },

            ],
            selectedBrand: null,
            newBrand: {
                id: '1',
                name: '',
                address: "",
                logo: require("../../../src/assets/img/default-avatar.jpg"),
                assignedPackage: null,
                usedFrompackage: {
                    totalSMS: '20',
                    totalNotification: '65',
                    totalEmails: '22',
                    renewalDate: '12-2-2021'
                }
            },
            Packges: [
                { name: "A", key: 1 },
                { name: "B", key: 2 }
            ]

        }
    }

    notify = (place, color, msg) => {
        // var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {msg}
                    </div>
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    RemoveItem(key) {
        const { data } = this.state;
        let reslut = data.filter((Item, index) => { return key !== index })
        this.setState({ data: reslut })
        this.notify("tr", 3, "The item deleted successfully")
    }

    componentDidMount() {
        let body = {
            "name": "Starbucks",
            "username": "Starbucks",
            "password": "Starbucks",
            "logo": "",
            "contact": "0100000000",
            "contactPerson": "Mohamed Ahmed",
            "address": "Cairo"
        }
        HtttpGetDefult('customer/1').then(result => {
            console.log(result)
        })
    }


    changeNewInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        name: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        address: val
                    }
                })
                break;
            case 'assignedPackage':
                this.setState({
                    newBrand: {
                        ...this.state.newBrand,
                        assignedPackage: val
                    }
                })
                break;
        }

    }

    changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        name: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        address: val
                    }
                })
                break;
            case 'assignedPackage':
                this.setState({
                    selectedBrand: {
                        ...this.state.selectedBrand,
                        assignedPackage: val
                    }
                })
                break;
        }

    }


    changePhoto(event) {
        event.preventDefault();
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                newBrand: {
                    ...this.state.newBrand,
                    logo: [reader.result]
                }
            })
        }.bind(this);
    }

    addNewBrand() {
        this.setState({ addMode: false, editMode: false, detailsMode: false });
    }

    editBrand() {
        this.setState({ addMode: false, editMode: false, detailsMode: false })
    }

    render() {
        const { data, editMode, addMode, detailsMode, selectedBrand, Packges, newBrand } = this.state;
        return (
            <div className="content Brands">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>

                <Col md="11">
                    <Card>
                        {!editMode && !addMode && !detailsMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Brands.title")}</h2>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="Add">{i18n.t("Brands.add")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">{i18n.t("Brands.Name")}</th>
                                                <th className="text-center">{i18n.t("Brands.Address")}</th>
                                                <th className="text-center">{i18n.t("Brands.Package")}</th>
                                                <th className="text-center">{i18n.t("Brands.Edit")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                <th className="text-center">{i18n.t("Brands.Delete")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.name}</td>
                                                        <td className="text-center">{Item.address}</td>
                                                        <td className="text-center">{Item.assignedPackage.name}</td>
                                                        <td className="text-center"><i className="fa fa-edit" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBrand: Item, detailsMode: false }) }} /></td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedBrand: Item, detailsMode: true })} /></td>
                                                        <td className="text-center"><i className="fas fa-trash-alt" onClick={() => this.RemoveItem(key)} /></td>

                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                </CardBody>
                            </React.Fragment>
                        }
                        {!editMode && addMode && !detailsMode &&
                            //Add Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Brands.add")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup className="logoContainer">
                                                    <label>{i18n.t("CompanyProfile.Logo")}</label>
                                                    <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                                    <img alt="" src={newBrand.logo} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} placeholder={i18n.t("Brands.NamePlacholder")} onChange={(val) => { this.changeNewInput('name', val) }} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Brands.Package")} items={Packges} onClick={(val) => { this.changeNewInput("assignedPackage", val) }} selctedItem={newBrand.assignedPackage} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <InputWithText type="text" label={i18n.t("Brands.Address")} placeholder={i18n.t("Brands.AddressPlacholder")} onChange={(val) => { this.changeNewInput('address', val) }} />
                                            </Col>
                                        </Row>
                                        <Button onClick={() => this.addNewBrand()}>{i18n.t("global.submit")}</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }
                        {editMode && !addMode && !detailsMode &&
                            // Edit Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Brands.editBrand")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} value={selectedBrand.name} placeholder={i18n.t("Brands.NamePlacholder")} onChange={(val) => { this.changeEditInput('name', val) }} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Brands.Package")} items={Packges} onClick={(val) => { this.changeEditInput("assignedPackage", val) }} selctedItem={selectedBrand.assignedPackage} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <InputWithText type="text" label={i18n.t("Brands.Address")} placeholder={i18n.t("Brands.AddressPlacholder")} onChange={(val) => { this.changeEditInput('address', val) }} value={selectedBrand.address} />
                                            </Col>

                                        </Row>
                                        <Button onClick={() => this.editBrand()}>{i18n.t("global.submit")}</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }

                        {!editMode && !addMode && detailsMode &&
                            // Brand Details
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedBrand.name} {i18n.t("Brands.Details")}</h2>
                                            <h3 className="Subtitle">Basic Info</h3>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-minimal-right" id="up" onClick={() => { this.setState({ addMode: false, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="up">{i18n.t("Brands.Back")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Name")}:</label>
                                                <label className="value">{selectedBrand.name}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Address")}:</label>
                                                <label className="value">{selectedBrand.address}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.Package")}:</label>
                                                <label className="value">{selectedBrand.assignedPackage.name}</label>
                                            </Col>
                                        </Row>
                                        <hr className="sperator" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Brands.PackgeInfo")}</h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedSMS")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalSMS}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedNotification")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalNotification}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.UsedEmails")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalEmails}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Brands.RenewalDate")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.renewalDate}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </React.Fragment>
                        }

                    </Card>
                </Col>
            </div>
        );
    }
}


export default Brands;
