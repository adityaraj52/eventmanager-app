import React, {Component} from "react";

import PropTypes from 'prop-types';
import {FormInputType} from "../../constants/OtherConstants";
import {Col, Form} from "react-bootstrap";

class FormElement extends Component {
    render() {
        return(
            <Form.Group as={Col}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control name={this.props.name}
                              value={this.props.value}
                              onChange={this.props.handleChange}
                              placeholder={this.props.placeholder}
                              required={this.props.isRequired}
                              type={this.props.type}
                              as={this.props.as}
                              rows={this.props.rows}
                >
                </Form.Control>
            </Form.Group>
        )
    }
}

FormElement.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOfType(FormInputType),
    onChange : PropTypes.func,
    otherProps: PropTypes.object,
};

FormElement.defaultProps = {
    isRequired: false
};

export default FormElement
