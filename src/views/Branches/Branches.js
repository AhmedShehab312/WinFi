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
import './BranchesStyle.scss';
import NotificationAlert from "react-notification-alert";
import { InputWithText } from '../../components/ComponentModule'
import i18n from '../../i18n';

class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            brands: ["StarBuks", "MacDokki", "Kentaki"],
            data: [
                {
                    id: '1',
                    brandName: 'StarBuks',
                    Package: 'plan A',
                    branches: [
                        {
                            id: '1',
                            name: 'StarBuksZamalek',
                            address: "Cairo",
                            mainPackage: 'plane A1',
                            usedFrompackage: {
                                totalSMS: '20',
                                totalNotification: '65',
                                totalEmails: '22',
                                renewalDate: '12-2-2021'
                            },
                            routerAccessPoint: [
                                {
                                    name: 'R1',
                                    ip: '192.168.1.2'
                                },
                                {
                                    name: 'R2',
                                    ip: '192.168.1.3'
                                },
                                {
                                    name: 'R3',
                                    ip: '192.168.1.3'
                                }
                            ]
                        },
                    ]
                },
                {
                    id: '1',
                    brandName: 'StarBuks',
                    Package: 'plan A',
                    branches: [
                        {
                            id: '1',
                            name: 'StarBuksZamalek',
                            address: "Cairo",
                            mainPackage: 'plane A1',
                            usedFrompackage: {
                                totalSMS: '20',
                                totalNotification: '65',
                                totalEmails: '22',
                                renewalDate: '12-2-2021'
                            },
                            routerAccessPoint: [
                                {
                                    name: 'R1',
                                    ip: '192.168.1.2'
                                },
                                {
                                    name: 'R2',
                                    ip: '192.168.1.3'
                                },
                                {
                                    name: 'R3',
                                    ip: '192.168.1.3'
                                }
                            ]
                        },
                    ]
                }, {
                    id: '2',
                    brandName: 'MAC',
                    Package: 'plan B',
                    branches: [
                        {
                            id: '1',
                            name: 'MACZamalek',
                            address: "Cairo",
                            mainPackage: 'plane A1',
                            usedFrompackage: {
                                totalSMS: '20',
                                totalNotification: '65',
                                totalEmails: '22',
                                renewalDate: '12-2-2021'
                            },
                            routerAccessPoint: [
                                {
                                    name: 'R1',
                                    ip: '192.168.1.2'
                                },
                                {
                                    name: 'R2',
                                    ip: '192.168.1.3'
                                },
                                {
                                    name: 'R3',
                                    ip: '192.168.1.3'
                                }
                            ]
                        },
                    ]
                },


            ],
            selectedBrand: null

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

    render() {
        const { data, editMode, addMode, detailsMode, selectedBrand } = this.state;
        return (
            <div className="content Branches">
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
                                            <h2 className="title">{i18n.t("Branches.title")}</h2>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="Add">{i18n.t("Branches.add")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">{i18n.t("Branches.Name")}</th>
                                                <th className="text-center">{i18n.t("Branches.address")}</th>
                                                <th className="text-center">{i18n.t("Branches.brandName")}</th>
                                                <th className="text-center">{i18n.t("Branches.brandPackage")}</th>
                                                <th className="text-center">{i18n.t("Branches.mainPackage")}</th>
                                                <th className="text-center">{i18n.t("Branches.Edit")}</th>
                                                <th className="text-center">{i18n.t("Branches.Details")}</th>
                                                <th className="text-center">{i18n.t("Branches.Delete")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.name}</td>
                                                        <td className="text-center">{Item.address}</td>
                                                        <td className="text-center">{Item.brandName}</td>
                                                        <td className="text-center">{Item.brandPackage}</td>
                                                        <td className="text-center">{Item.mainPackage}</td>
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
                                            <h2 className="title">{i18n.t("Branches.add")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="email" label="Name" placeholder={'Enter  Name'} onChange={(val) => { console.log(val) }} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <label for="examplePassword">Main Packge</label>
                                                    <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <label for="exampleAddress">Address</label>
                                            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
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
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>Submit</Button>
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
                                            <h2 className="title">Edit Branch</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <label for="title">Name</label>
                                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={this.state.selectedBrand.name} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <label for="examplePassword"> Main Packge</label>
                                                    <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" value={this.state.selectedBrand.assignedPackage} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <label for="exampleAddress">Address</label>
                                            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" value={this.state.selectedBrand.address} />
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
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>Submit</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }

                        {!editMode && !addMode && detailsMode &&
                            // Branch Details
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedBrand.name} {i18n.t("Branches.Details")}</h2>
                                            <h3 className="Subtitle">{i18n.t("Branches.BasicInfo")}</h3>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-minimal-right" id="up" onClick={() => { this.setState({ addMode: false, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="up">{i18n.t("global.Back")}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.Name")}:</label>
                                                <label className="value">{selectedBrand.name}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.BrandName")}:</label>
                                                <label className="value">{selectedBrand.brandName}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.BrandPackge")}:</label>
                                                <label className="value">{selectedBrand.brandPackage}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.BranchPackge")}:</label>
                                                <label className="value">{selectedBrand.mainPackage}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.Address")}:</label>
                                                <label className="value">{selectedBrand.address}</label>
                                            </Col>

                                        </Row>

                                        <hr className="sperator" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Branches.PackgeInfo")}</h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedSMS")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalSMS}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedNotification")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalNotification}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.UsedEmails")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalEmails}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Branches.RenewalDate")}:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.renewalDate}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="sperator" />
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">{i18n.t("Branches.Router")} </h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Table className="tablesorter" responsive striped>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th className="text-center"> {i18n.t("Branches.Name")}</th>
                                                    <th className="text-center"> {i18n.t("Branches.IP")} </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedBrand.routerAccessPoint.map((Item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="text-center">{Item.name}</td>
                                                            <td className="text-center">{Item.ip}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
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


export default Branches;
