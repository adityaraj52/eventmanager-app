import React from 'react';
import FormElement from "./FormElement";
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";

export class BasicTextInput extends FormElement{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Form.Control name={this.props.name}
                          value={this.state.email}
                          onChange={this.onChange}
                          placeholder={"eMail"}
                          type={'email'} required>
            </Form.Control>
        );
    }
}

BasicTextInput.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onClick: PropTypes.string.isRequired,
    style: PropTypes.object
};

BasicTextInput.defaultProps = {
    style: style.greenBtnStyle
}
