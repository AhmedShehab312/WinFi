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
                    name: 'StarBuksZamalek',
                    address: "Cairo",
                    brandPackage: 'plan A',
                    mainPackage: 'plane A1',
                    employeesNo: '120',
                    brandName: 'StarBuks',
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
                {
                    id: '1',
                    name: 'MacDokki',
                    address: "Cairo",
                    brandPackage: 'plan C',
                    mainPackage: 'plane C3',
                    employeesNo: '180',
                    brandName: 'Mac',
                    usedFrompackage: {
                        totalSMS: '210',
                        totalNotificati1on: '615',
                        totalEmails: '22',
                        renewalDate: '14-12-2021'
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
                    ],
                },
                {
                    id: '1',
                    name: 'KentakiZamalek',
                    address: "Cairo",
                    brandPackage: 'plan B',
                    mainPackage: 'plane B11',
                    employeesNo: '220',
                    brandName: 'Kentaki',
                    usedFrompackage: {
                        totalSMS: '260',
                        totalNotification: '665',
                        totalEmails: '292',
                        renewalDate: '12-6-2021'
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
                                            <h2 className="title">Branches</h2>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-simple-add " id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="Add">Add Brand</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">address</th>
                                                <th className="text-center">employeesNo</th>
                                                <th className="text-center">brand Name</th>
                                                <th className="text-center">brand Package</th>
                                                <th className="text-center">main Package</th>
                                                <th className="text-center">Edit</th>
                                                <th className="text-center">Details</th>
                                                <th className="text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.name}</td>
                                                        <td className="text-center">{Item.address}</td>
                                                        <td className="text-center">{Item.employeesNo}</td>
                                                        <td className="text-center">{Item.brandName}</td>
                                                        <td className="text-center">{Item.brandPackage}</td>
                                                        <td className="text-center">{Item.mainPackage}</td>
                                                        <td className="text-center"><i className="tim-icons icon-pencil" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBrand: Item, detailsMode: false }) }} /></td>
                                                        <td className="text-center"><i className="tim-icons icon-alert-circle-exc" onClick={() => this.setState({ addMode: false, editMode: false, selectedBrand: Item, detailsMode: true })} /></td>
                                                        <td className="text-center"><i className="tim-icons icon-simple-remove" onClick={() => this.RemoveItem(key)} />                                                        </td>

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
                                            <h2 className="title">Add Branch</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="email" label="Name" placeholder={'Enter  Name'} />
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
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedBrand.name} Details</h2>
                                            <h3 className="Subtitle">Basic Info</h3>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-minimal-right" id="up" onClick={() => { this.setState({ addMode: false, editMode: false, detailsMode: false }) }} />
                                            <UncontrolledTooltip placement="right" target="up">Back</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">Name:</label>
                                                <label className="value">{selectedBrand.name}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">Brand Name:</label>
                                                <label className="value">{selectedBrand.brandName}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">Employees Number:</label>
                                                <label className="value">{selectedBrand.employeesNo}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">Address:</label>
                                                <label className="value">{selectedBrand.address}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">Brand Packge:</label>
                                                <label className="value">{selectedBrand.brandPackage}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">Branch Packge:</label>
                                                <label className="value">{selectedBrand.mainPackage}</label>
                                            </Col>
                                        </Row>
                                        <hr className="sperator" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">Packge Info</h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Row>
                                            <Col size="6">
                                                <label className="item">Used SMS:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalSMS}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">Used Notification:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalNotification}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">Used Emails:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.totalEmails}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">Renewal Date:</label>
                                                <label className="value">{selectedBrand.usedFrompackage.renewalDate}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="sperator" />
                                    <Row>
                                        <Col>
                                            <h3 className="Subtitle">Router and access point data</h3>
                                        </Col>
                                    </Row>
                                    <div className="dataContainer">
                                        <Table className="tablesorter" responsive striped>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">IP</th>
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
