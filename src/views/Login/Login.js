import logo from "assets/img/logo.webp";
import React from 'react';
import { withRouter } from "react-router-dom";
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { InputWithText } from '../../components/ComponentModule';
import i18n from '../../i18n';
import './LoginStyle.scss';
import { HtttpGetDefult, HtttpPostDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { setLoggedIn } from '../../globals/globals';
import { displayToast } from '../../globals/globals';
import { getInitialProps } from "react-i18next";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            Password: "",
            isOwner: false
        }
    }



    submit() {
        const { UserName, Password, isOwner } = this.state;
        let body = {
            username: UserName,
            password: Password,
            type: isOwner ? "owner" : "admin"
        }
        HtttpPostDefult('auth/login', body).then((res) => {
            if (res) {
                this.InitialProfile(res);
            }
            else {
                displayToast('Try again', false);
            }
        })
    }


    async InitialProfile(data) {
        const { history, storeProfile } = this.props;
        const { isOwner } = this.state;
        let Result;
        if (data.CustomerId && !isOwner) {
            if (data.role == "SUPER") {
                await HtttpGetDefult('customer/' + data.CustomerId + '').then((res) => {
                    if (res) {
                        Result = res;
                    }
                }).then(() => {
                    data.brands = Result.brands;
                    Result = data;
                });
            }
            else if (data.role == "BRAND") {
                await HtttpGetDefult('brand/' + data.BrandId + '').then((res) => {
                    if (res) {
                        Result = res;
                    }
                }).then(() => {
                    data.brands = [Result];
                    Result = data;
                })
            }
            else if (data.role == "BRANCH") {
                await HtttpGetDefult('brand/' + data.BrandId + '').then((res) => {
                    if (res) {
                        Result = res;
                    }
                }).then(() => {
                    data.brands = [Result];
                    Result = data;
                })
            }
        }
        else {
            await HtttpGetDefult('customer/' + data.id + '').then((res) => {
                if (res) {
                    Result = res;
                }
            }).then(() => {
                Result.role = "OWNER"
            });
        }

        storeProfile(Result);
        history.push('/dashboard');
        setLoggedIn(true)

    }


    render() {
        const { UserName, Password, isOwner } = this.state;
        return (
            <div className="content LoginContainer">
                <div className="innerContainer">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <InputWithText type="text" label={i18n.t("Login.UserName")} placeholder={i18n.t("Login.UserNamePlacholder")} onChange={(val) => { this.setState({ UserName: val }) }} value={UserName} />
                    <InputWithText type="password" label={i18n.t("Login.Password")} placeholder={"*********"} onChange={(val) => { this.setState({ Password: val }) }} value={Password} />
                    <FormGroup tag="fieldset">
                        <Row>
                            <Col md="6" className="text-center">
                                <FormGroup check>
                                    <Label check> <Input type="radio" name="radio1" checked={!isOwner} onChange={() => this.setState({ isOwner: !isOwner })} />Admin</Label>
                                </FormGroup>
                            </Col>
                            <Col md="6" className="text-center">
                                <FormGroup check> <Label check> <Input type="radio" name="radio1" checked={isOwner} onChange={() => this.setState({ isOwner: !isOwner })} />Owner</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>

                    <div className="Button">
                        <Button onClick={() => { this.submit() }}>{i18n.t("global.submit")}</Button>
                    </div>

                </div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));


