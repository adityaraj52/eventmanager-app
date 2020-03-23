import React, {Component} from "react";
import PropTypes from 'prop-types';
import FormElement from "./FormElement";
import {Button, Col, Form} from "react-bootstrap";
import {doBasicFormSubmit, doSetBasicFormStateElement} from "../../actions";
import {connect} from "react-redux";

const INITIAL_STATE = {
    success: '',
    error: ''
};

class BasicForm extends Component {
    constructor(props) {
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFormBody = this.getFormBody.bind(this);
        this.getFormRow = this.getFormRow.bind(this);
        this.initialState = this.getInitialState(this.props.formElementArray);
        this.state = {...this.initialState, ...INITIAL_STATE}
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    getInitialState(formElements) {
        let state = {};
        if (formElements) {
            Object.keys(formElements)
                .forEach(key => {
                    let elementRow = formElements[key];
                    elementRow.forEach(row => {
                        let initialValue= '';
                        if (row.props.initialValue)
                            initialValue = row.props.initialValue;
                        state[row.props.name] = initialValue;
                        //TODO: Rename method and occurences
                        this.props.doSetBasicFormStateElement({
                            [row.props.name]: initialValue
                        })
                    })
                });
        }
        return state;
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.doBasicFormSubmit(this.state, this.props.submitHandler);
        this.state = this.getInitialState(this.props.formElementArray);
    }

    getFormBody () {
        let array = [];
        Object.keys(this.props.formElementArray).forEach(key => {
            array.push(this.getFormRow(this.props.formElementArray[key]));
        });
        appendSubmitButton(array);
        return array;
    };

    getFormRow(formElementRow){
        let array = [];
        formElementRow.forEach(element => {
            console.log('element name is ', element.props.name)

            let currelement = React.cloneElement(element, {value: this.state[element.props.name], handleChange: this.handleChange});
            array.push(currelement);
        });
        return (<Form.Row>{array}</Form.Row>);
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} success={this.state.success} method={"post"}>
                    {
                        this.getFormBody()
                    }
                </Form>
            </div>
        );
    }
}

const appendSubmitButton = (array) => {
    array.push(<Form.Row style={{textAlign: 'center'}}>
        <Form.Group as={Col}>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form.Group>
    </Form.Row>)
};


BasicForm.propTypes = {
    formElementArray: PropTypes.arrayOf(FormElement).isRequired,
    submitHandler: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        doBasicFormSubmit: (formState, callBack) => dispatch(doBasicFormSubmit(formState, callBack)),
        doSetBasicFormStateElement: (formState) => dispatch(doSetBasicFormStateElement(formState))
    }
}

const mapStateToProps = state => {
    return {basicFormState: state.basicFormState};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicForm);

