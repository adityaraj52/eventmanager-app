import React, {Component} from "react";
import {FormInputType, style} from "../constants/OtherConstants";
import BasicForm from "../components/BasicForm";
import {createFormElement} from "../Utils";
import {Container} from "react-bootstrap";
import klarnasetup from "../components/klarnasetup";


class AddMoney extends Component {
    constructor() {
        super();
        klarnasetup()
    }

    render() {
        return (
            <div>
                <Container style={{padding: "20px"}}>

                            <h2 style={{textAlign: 'center'}}>Add Money To Wallet</h2>
                            <hr style={style.hrStyle}/>

                            <div id="klarna-payments-container">
                                Hie
                            </div>

                            <Container className={"col-6"} style={{padding: "20px"}}>
                            <BasicForm
                            formElementArray={
                                {
                                    0: [createFormElement({
                                        label: 'Enter Amount to Add to Wallet',
                                        name: 'amount',
                                        placeholder: '0,00',
                                        isRequired: true
                                    }, FormInputType.NUMBER)]
                                }
                            }
                            submitHandler={this.handleSubmit}/>
                    </Container>
                </Container>
                                </div>
        );
    }
}

export default AddMoney;