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
import { InputWithText } from '../../components/ComponentModule'

class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            data: [
                {
                    name: 'StarBuks',
                    address: "Cairo",
                    package: 'plan A',
                    employeesNo: '40',
                },
                {
                    name: 'Macdonald',
                    address: "Cairo",
                    package: 'plan B',
                    employeesNo: '80',

                },
                {
                    name: 'kentucky',
                    address: "Cairo",
                    package: 'plan A',
                    employeesNo: '120',

                }
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
        let reslut = data.filter((Item, index) => { return key != index })
        this.setState({ data: reslut })
        this.notify("tr", 3, "The item deleted successfully")
    }

    render() {
        const { data, editMode, addMode } = this.state;
        return (
            <div className="content Brands">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>

                <Col md="11">
                    <Card>
                        {!editMode && !addMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">Brands</h2>
                                        </Col>
                                        <Col className="AddContainer">
                                            <i className="tim-icons  icon-simple-add " id="Add" onClick={() => { this.setState({ addMode: true, editMode: false }) }} />
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
                                                <th className="text-center">package</th>
                                                <th className="text-center">Edit</th>
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
                                                        <td className="text-center">{Item.package}</td>
                                                        <td className="text-center"><i className="tim-icons icon-pencil" onClick={() => { this.setState({ addMode: false, editMode: true, selectedBrand: Item }) }} /></td>
                                                        <td className="text-center"><i className="tim-icons icon-simple-remove" onClick={() => this.RemoveItem(key)} /></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                </CardBody>
                            </React.Fragment>
                        }
                        {!editMode && addMode &&
                            //Add Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">Add Brand</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <InputWithText type="email" label="Name" placeholder={'Enter your Name'} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <label for="examplePassword"> Packge</label>
                                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
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
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false })}>Submit</Button>
                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }
                        {editMode && !addMode &&
                            // Edit Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">Edit Brand </h2>
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
                                                    <label for="examplePassword"> Packge</label>
                                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={this.state.selectedBrand.package} />
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
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false })}>Submit</Button>
                                    </Form>
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
