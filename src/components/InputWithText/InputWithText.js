import { PropTypes } from "prop-types";
import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const InputWithText = ({ label, type, placeholder }) => {
    return (
        <FormGroup>
            <label >{label}</label>
            <Input type={type} placeholder={placeholder} />
        </FormGroup>
    );
};

InputWithText.defaultProps = {
    label: "",
    type: "text",
    onChange: null,
    placeholder: ""
};

InputWithText.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func

};

export { InputWithText };
