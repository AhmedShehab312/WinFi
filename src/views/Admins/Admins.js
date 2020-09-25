import React from 'react';
import {
    Table,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    UncontrolledTooltip,
    Form,
    Button,
    FormGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import i18n from '../../i18n';
import { getVariable, displayToast } from '../../globals/globals';
import { InputWithText, DropDown } from '../../components/ComponentModule'
import { StoreProfile } from '../../store/actions/ProfileAction';

class Admins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            addMode: false,
            detailsMode: false,
            admins: [
                {
                    id: '',
                    name: '',

                },
            ],
            selectedAdmin: null,
            selectedAdminIndex: null,
            newAdmin: {
                name: "",
                username: "",
                password: "",
                logo: null,
                CustomerId: "1",
                PackageId: null,
                BranchId: null,
                BrandId: null,
                role: null
            },
            roles: getVariable('roles'),
            brands: null,
            branches: null,
            selectedBrand: null,
            selectedbranch: null,
            selectedRole: null
        }

    }
    profileData;

    componentDidMount() {
        const { OwnerProfile } = this.props;
        if (OwnerProfile) {
            this.profileData = OwnerProfile;
            this.setState({ admins: OwnerProfile.admins, brands: OwnerProfile.brands })
        }
    }

    showBrand() {
        const { selectedAdmin } = this.state;
        let result = this.profileData.brands.filter((Item) => { return Item.id == selectedAdmin.BrandId });
        return result[0].name
    }


    showBranch() {
        const { selectedAdmin, branches } = this.state;
        let result = branches.filter((Item) => { return Item.id == selectedAdmin.BrandId });
        return result[0].name
    }


    RemoveItem(key, Item) {
        const { admins } = this.state;
        const { storeProfile } = this.props;

        HtttpDeleteDefult("admin/" + Item.id + "").then((res) => {
            if (res) {
                let reslut = admins.filter((Item, index) => { return key !== index })
                this.setState({ admins: reslut })
                this.profileData.admins = reslut
                storeProfile(this.profileData);
                displayToast('done', true);

            }
        })
    }


    changeNewInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        name: val
                    }
                })
                break;
            case 'userName':
                this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        username: val
                    }
                })
                break;
            case 'password':
                this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        password: val
                    }
                })
                break;
            case 'role':
                this.setState({
                    selectedRole: val,
                    newAdmin: {
                        ...this.state.newAdmin,
                        role: val.name
                    }
                })
                break;
            case 'brand':
                this.selectedBrand(val);
                this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        BrandId: val.id
                    }
                })
                break;
            case 'branch':
                this.setState({
                    selectedbranch: val,
                    newAdmin: {
                        ...this.state.newAdmin,
                        BranchId: val.id
                    }
                })
                break;
        }

    }


    changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        name: val
                    }
                })
                break;
            case 'userName':
                this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        username: val
                    }
                })
                break;
            case 'password':
                this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        password: val
                    }
                })
                break;
            case 'role':
                this.setState({
                    selectedRole: val,
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        role: val.name
                    }
                })
                break;
            case 'brand':
                this.selectedBrand(val);
                this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        BrandId: val.id
                    }
                })
                break;
            case 'branch':
                this.setState({
                    selectedbranch: val,
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        BranchId: val.id
                    }
                })
                break;
        }

    }



    selectedBrand(Item) {
        HtttpGetDefult('brand/' + Item.id + '').then(async (res) => {
            await this.setState({ branches: res.branches, selectedBrand: Item })
        })
    }

    addNewAdmin() {
        const { newAdmin } = this.state;
        const { storeProfile } = this.props;
        HtttpPostDefult("admin/create", newAdmin).then((res) => {
            if (res) {
                this.profileData.admins.push(res);
                storeProfile(this.profileData);
                this.setState({ admins: this.profileData.admins, addMode: false, editMode: false, detailsMode: false });
                displayToast('done', true);
            }
        })
    }

    editSubmit() {
        const { selectedAdmin, selectedAdminIndex } = this.state;
        const { storeProfile } = this.props;
        HtttpPutDefult("admin/" + selectedAdmin.id + "", selectedAdmin).then((res) => {
            if (res) {
                this.profileData.admins[selectedAdminIndex] = selectedAdmin;
                storeProfile(this.profileData);
                this.setState({ admins: this.profileData.admins, addMode: false, editMode: false, detailsMode: false });
                displayToast('done', true);
            }
        })
    }


    async selectedAdmin(admin, key) {
        const { brands, branches, roles } = this.state;
        let role = roles.filter((Item) => { return Item.name == admin.role });
        let isBrand = brands.filter((Item) => { return Item.id == admin.BrandId });
        let isBranch;
        if (isBrand && admin.role == "BRANCH") {
            HtttpGetDefult('brand/' + isBrand[0].id + '').then(async (res) => {
                await this.setState({ branches: res.branches, selectedBrand: isBrand[0] }, () => {
                    debugger
                    isBranch = admin.BranchId && branches ? branches.filter((Item) => { return Item.id == admin.BranchId }) : null;

                })
            })
        }
        this.setState({ addMode: false, editMode: true, selectedAdmin: admin, detailsMode: false, selectedAdminIndex: key, selectedBrand: isBrand[0], selectedbranch: isBranch, selectedRole: role[0] })
    }



    render() {
        const { admins, editMode, addMode, detailsMode, newAdmin, roles, branches, brands, selectedbranch, selectedBrand, selectedAdmin, selectedRole } = this.state;

        return (
            <div className="content Brands Admins">
                <Col md="11">
                    <Card>
                        {!editMode && !addMode && !detailsMode &&
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Admins.title")}</h2>
                                        </Col>
                                        {admins && admins.length > 0 &&
                                            <Col className="AddContainer">
                                                <i className="fa fa-plus-circle" id="Add" onClick={() => { this.setState({ addMode: true, editMode: false, detailsMode: false }) }} />
                                                <UncontrolledTooltip placement="right" target="Add">{i18n.t("Brands.add")}</UncontrolledTooltip>
                                            </Col>
                                        }
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {admins && admins.length > 0 ? <Table className="tablesorter" responsive hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-center">{i18n.t("global.ID")}</th>
                                                <th className="text-center">{i18n.t("Brands.Name")}</th>
                                                <th className="text-center">{i18n.t("Admins.Role")}</th>
                                                <th className="text-center">{i18n.t("Brands.Edit")}</th>
                                                <th className="text-center">{i18n.t("Brands.Details")}</th>
                                                <th className="text-center">{i18n.t("Brands.Delete")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map((Item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-center">{Item.id}</td>
                                                        <td className="text-center">{Item.username}</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center"><i className="fa fa-edit" onClick={() => { this.selectedAdmin(Item, key) }} /></td>
                                                        <td className="text-center"><i className="fas fa-info-circle" onClick={() => this.setState({ addMode: false, editMode: false, selectedAdmin: Item, detailsMode: true, selectedAdminIndex: key })} /></td>
                                                        <td className="text-center"><i className="fas fa-trash-alt" onClick={() => this.RemoveItem(key, Item)} /></td>

                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table> :
                                        <h2 className="noResult text-center">{i18n.t("global.noResult")}</h2>
                                    }
                                </CardBody>
                            </React.Fragment>
                        }
                        {!editMode && addMode && !detailsMode &&
                            //Add Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Admins.add")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row >
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} placeholder={i18n.t("Admins.NamePlacholder")} onChange={(val) => { this.changeNewInput('name', val) }} />
                                            </Col>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Login.UserName")} placeholder={i18n.t("Admins.UserNamePlacholder")} onChange={(val) => { this.changeNewInput('userName', val) }} />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <InputWithText type="password" label={i18n.t("Login.Password")} placeholder={"**********"} onChange={(val) => { this.changeNewInput('password', val) }} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Admins.Role")} items={roles} onClick={(val) => { this.changeNewInput("role", val) }} selctedItem={selectedRole} title={i18n.t("Admins.Role")} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {
                                                selectedRole && selectedRole.id == 2 ?
                                                    <React.Fragment>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <DropDown label={i18n.t("Brands.title")} items={brands} onClick={(val) => { this.changeNewInput("brand", val) }} selctedItem={selectedBrand} title={i18n.t("Admins.selectBrand")} />
                                                            </FormGroup>
                                                        </Col>
                                                    </React.Fragment>
                                                    : selectedRole && selectedRole.id == 3 ?
                                                        <React.Fragment>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <DropDown label={i18n.t("Brands.title")} items={brands} onClick={(val) => { this.changeNewInput("brand", val) }} selctedItem={selectedBrand} title={i18n.t("Admins.selectBrand")} />
                                                                </FormGroup>
                                                            </Col>
                                                            {
                                                                branches && <Col md={6}>
                                                                    <FormGroup>
                                                                        <DropDown label={i18n.t("Branches.title")} items={branches} onClick={(val) => { this.changeNewInput("branch", val) }} selctedItem={selectedbranch} title={i18n.t("Admins.selectBranch")} />
                                                                    </FormGroup>
                                                                </Col>

                                                            }
                                                        </React.Fragment> :
                                                        null
                                            }

                                        </Row>
                                        <Button onClick={() => this.addNewAdmin()}>{i18n.t("global.submit")}</Button>
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>{i18n.t("global.cancel")}</Button>

                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }
                        {editMode && !addMode && !detailsMode &&
                            //Edit Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{i18n.t("Admins.editAdmin")}</h2>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row >
                                            {/* <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Brands.Name")} placeholder={i18n.t("Admins.NamePlacholder")} onChange={(val) => { this.changeEditInput('name', val) }} vlaue={selectedAdmin.name} />
                                            </Col> */}
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("Login.UserName")} placeholder={i18n.t("Admins.UserNamePlacholder")} onChange={(val) => { this.changeEditInput('userName', val) }} value={selectedAdmin.username} />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={6}>
                                                <InputWithText type="password" label={i18n.t("Login.Password")} placeholder={"**********"} onChange={(val) => { this.changeEditInput('password', val) }} value={selectedAdmin.password} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <DropDown label={i18n.t("Admins.Role")} items={roles} onClick={(val) => { this.changeEditInput("role", val) }} selctedItem={selectedRole} title={i18n.t("Admins.Role")} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {
                                                selectedRole && selectedRole.id == 2 ?
                                                    <React.Fragment>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <DropDown label={i18n.t("Brands.title")} items={brands} onClick={(val) => { this.changeEditInput("brand", val) }} selctedItem={selectedBrand} title={i18n.t("Admins.selectBrand")} />
                                                            </FormGroup>
                                                        </Col>
                                                    </React.Fragment>
                                                    : selectedRole && selectedRole.id == 3 ?
                                                        <React.Fragment>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <DropDown label={i18n.t("Brands.title")} items={brands} onClick={(val) => { this.changeEditInput("brand", val) }} selctedItem={selectedBrand} title={i18n.t("Admins.selectBrand")} />
                                                                </FormGroup>
                                                            </Col>
                                                            {
                                                                branches && <Col md={6}>
                                                                    <FormGroup>
                                                                        <DropDown label={i18n.t("Branches.title")} items={branches} onClick={(val) => { this.changeEditInput("branch", val) }} selctedItem={selectedbranch} title={i18n.t("Admins.selectBranch")} />
                                                                    </FormGroup>
                                                                </Col>
                                                            }
                                                        </React.Fragment> :
                                                        null
                                            }

                                        </Row>
                                        <Button onClick={() => this.editSubmit()}>{i18n.t("global.submit")}</Button>
                                        <Button onClick={() => this.setState({ addMode: false, editMode: false, detailsMode: false })}>{i18n.t("global.cancel")}</Button>

                                    </Form>
                                </CardBody>
                            </React.Fragment>
                        }
                        {!editMode && !addMode && detailsMode &&
                            // Details Mode
                            <React.Fragment>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <h2 className="title">{selectedAdmin.username} {i18n.t("Brands.Details")}</h2>
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
                                            {/* <Col size="6">
                                                <label className="item">{i18n.t("Brands.Name")}:</label>
                                                <label className="value">{selectedAdmin.name}</label>
                                            </Col> */}
                                            <Col size="6">
                                                <label className="item">{i18n.t("Login.UserName")}:</label>
                                                <label className="value">{selectedAdmin.username}</label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Login.Password")}:</label>
                                                <label className="value">{selectedAdmin.password}</label>
                                            </Col>
                                            <Col size="6">
                                                <label className="item">{i18n.t("Admins.Role")}:</label>
                                                <label className="value">{selectedAdmin.role.name}</label>
                                            </Col>
                                        </Row>
                                        <hr className="sperator" />
                                        <Row>
                                            <Col size="6">
                                                <label className="item">{i18n.t("global.brand")}:</label>
                                                <label className="value">{this.showBrand()}</label>
                                            </Col>
                                            {
                                                branches &&
                                                <Col size="6">
                                                    <label className="item">{i18n.t("global.branch")}:</label>
                                                    <label className="value">{this.showBranch()}</label>
                                                </Col>
                                            }

                                        </Row>
                                    </div>
                                </CardBody>
                            </React.Fragment>
                        }
                    </Card>
                </Col>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.ProfileState.OwnerProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Admins);


