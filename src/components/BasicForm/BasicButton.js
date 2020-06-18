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
    },

    blueBtnStyle: {
        color: 'white',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '2%',
        backgroundSize: '100% 100%',
        minWidth: '180px'
    }
};

export class BasicButton extends FormElement {
    render() {
        return (
            <>
                {this.props.useAsHref &&
                <Button className={this.props.className} style={this.props.style} href={this.props.onClick}>
                    {this.props.buttonLabel}
                </Button>}

                {!this.props.useAsHref &&
                <Button className={"btn btn-primary"} style={style.blueBtnStyle} onClick={this.props.onClick}>
                    {this.props.buttonLabel}
                </Button>}
            </>
        );
    }
}

BasicButton.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onClick: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    useAsHref: PropTypes.bool
};

BasicButton.defaultProps = {
    style: style.greenBtnStyle,
    className: 'btn',
    useAsHref: true
}
