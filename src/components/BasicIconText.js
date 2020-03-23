import React from 'react';
import FormElement from "./BasicForm/FormElement";
import PropTypes from 'prop-types';

export class BasicIconText extends FormElement{
    render() {
        return(
            <div>
                <a href={this.props.hrefLink}>
                    <h3>
                        <i style={{color: 'green'}} className={this.props.iconClassName}>
                            <span style={{color: 'black', fontWeight: 500}}>
                                &nbsp;{this.props.iconLabel}
                            </span>
                        </i>
                    </h3>
                </a>
                <p>{this.props.textContent}</p>
            </div>
        );
    }
}

BasicIconText.propTypes = {
    textContent: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconLabel: PropTypes.string.isRequired,
    hrefLink: PropTypes.string
};