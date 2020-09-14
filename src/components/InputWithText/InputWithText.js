import { PropTypes } from "prop-types";
import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const InputWithText = ({ label, type, placeholder, onChange, disabled }) => {
    return (
        <FormGroup>
            <label >{label}</label>
            <Input type={type} placeholder={placeholder} onChange={(val) => onChange(val.target.value)} disabled={disabled} />
        </FormGroup>
    );
};

InputWithText.defaultProps = {
    label: "",
    type: "text",
    onChange: null,
    placeholder: "",
    disabled: false
};

InputWithText.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool

};

export { InputWithText };
