import React from 'react';
import FormElement from "./FormElement";
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

const style = {
    greenBtnStyle: {
        backgroundColor: "#1c8d76",
        color: 'white',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '2%',
        backgroundSize: '100% 100%',
        minWidth: '280px'
    }
};

export class BasicButton extends FormElement {
    render() {
        return (
            <Button className={this.props.className} style={this.props.style} href={this.props.onClick}>
                {this.props.buttonLabel}
            </Button>
        );
    }
}

BasicButton.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onClick: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
};

BasicButton.defaultProps = {
    style: style.greenBtnStyle,
    className: 'btn'
}
