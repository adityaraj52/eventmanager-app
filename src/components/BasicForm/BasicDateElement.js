import React, {Component} from "react";

import PropTypes from 'prop-types';
import {FormInputType} from "../../constants/OtherConstants";
import {Col, Form} from "react-bootstrap";

const dateStyle = {
    width: '100%',
    padding: '6px 12px',
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
    marginRight: '0'
}

class BasicDateElement extends Component {
    render() {
        return(
            <Form.Group as={Col}>
                <label htmlFor="party">{this.props.label} &nbsp;
                    <input type="date"
                           name={this.props.name}
                           min={this.props.minVal}
                           max={this.props.maxVal}
                           style={dateStyle}
                           onChange={this.props.handleChange}
                           value={this.props.value}
                           required={this.props.isRequired}/>
                </label>
            </Form.Group>
        )
    }
}

BasicDateElement.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    minVal: PropTypes.string,
    maxVal: PropTypes.string,
    onChange : PropTypes.func,
    // value: PropTypes.string,
    isRequired: PropTypes.bool
};

BasicDateElement.defaultProps = {
    isRequired: false,
    type: FormInputType.TEXTAREA
};

export default BasicDateElement


