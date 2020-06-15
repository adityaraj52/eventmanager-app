import React from "react";
import FormElement from "../components/BasicForm/FormElement";
import {FormInputType} from "../constants/OtherConstants";
import {Col, Form} from "react-bootstrap";
import BasicDateElement from "../components/BasicForm/BasicDateElement";

export const createFormControlSelectOptions = (dataArray, keyName, valueName = keyName) => {
    let formControlSelectOptions = [];
    if (dataArray && dataArray.length) {
        dataArray.forEach(data => (
            formControlSelectOptions.push(
                <option key={data[keyName]} value={data[valueName]}>
                    {data[valueName]}
                </option>)));
    } else {
        return <option key={"empty"} value={"empty"}>
            {"Empty State"}
        </option>
    }


    return formControlSelectOptions;
};

export const yesnoSelectOption = [
    {key: "Yes", value: "Yes"},
    {key: "No", value: "No"},
    {key: "Not Sure", value: "Not Sure"}
];

export const verifyKeyExistsInObject = (key, object) => {
    for (let keyname in object) {
        if (keyname === key)
            return true;
    }
    return false;
};

export const isSet = (object) => {
    if (object == null || !object)
        return false;
    switch (typeof object) {
        case "string":
            return object.trim().length > 0;
        default:
            return true;
    }
}


export const getTodayDate = () => {
    return new Date().toUTCString().substr(5, 11).split(' ').join(' ');
};

export const getISOFormattedTodayDate = () => {
    return new Date().toISOString().substring(0, 10);
};

export const getCurrentTime = () => {
    return new Date().toUTCString().substr(17, 5).split(' ').join(' ');
};

export const generateFirebaseWritableObject = (object, columnNames) => {
    let returnObject = {};
    columnNames.map(item => {
        returnObject[item] = object[item]
    });
    return returnObject;
};

export const extractKeyValueFromArray = (array, key) => {
    return array.map(item => item[key]);
};

export const setUpBootstrapTable = (columnsToShow, isSortable, classNameForCells, cellFormatter) => {
    let tableColumnData = [];
    columnsToShow.forEach(column => {
        tableColumnData.push({
            dataField: column.fieldName,
            text: column.aliasName,
            sort: !!isSortable,
            classes: classNameForCells,
            formatter: cellFormatter
        })
    });
    return tableColumnData;
};

export const addExtraProps = (Component, extraProps) => {
    return <Component.type {...Component.props} {...extraProps} />;
}

export const createFormElement = (params, inputType) => {
    switch (inputType) {
        case FormInputType.DATE:
            return createDateElement(params);
        case FormInputType.TEXTAREA:
            return createTextAreaFormElement(params);
        default:
            return createGeneralFormElement(params, inputType);
    }
}

export const createDisabledFormElement = (params, inputType= FormInputType.TEXT) => {
    let label = params.label || '';
    let name = params.name || '';
    let value = params.value || '';
    let placeholder = params.placeholder || '';

    return(
        <Form.Group as={Col}>
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name}
                          value={value}
                          placeholder={placeholder}
                          type={inputType}
                          disabled>
            </Form.Control>
        </Form.Group>
    )


}

export const createEmptyElement = () => {
    return (<Form.Group as={Col}/>)
}

export const createTextAreaFormElement = (params) => {
    let label = params.label || '';
    let name = params.name || '';
    let placeholder = params.placeholder || '';
    let isRequired = params.isRequired || false;
    let initialValue = params.initialValue || '';
    let rows = params.rows || 3;

    return React.createElement(FormElement, {
        label: label,
        name: name,
        placeholder: placeholder,
        isRequired: isRequired,
        as: FormInputType.TEXTAREA,
        initialValue: initialValue,
        rows: rows
    })
}

export const createGeneralFormElement = (params, type) => {
    let label = params.label || '';
    let name = params.name || '';
    let placeholder = params.placeholder || '';
    let isRequired = params.isRequired || false;
    type = type || FormInputType.TEXT;
    let initialValue = params.initialValue || '';
    let disabled = params.disabled || false;

    return React.createElement(FormElement, {
        label: label,
        name: name,
        placeholder: placeholder,
        isRequired: isRequired,
        type: type,
        initialValue: initialValue,
        disabled: disabled
    })
}

export const createDateElement = (params) => {
    let label = params.label || '';
    let name = params.name || '';
    let isRequired = params.isRequired || false;
    let initialValue = params.initialValue || '';
    let minVal = params.minVal || '';
    let maxVal = params.maxVal || '';
    return React.createElement(BasicDateElement, {
        label: label,
        name: name,
        isRequired: isRequired,
        initialValue: initialValue,
        minVal: minVal,
        maxVal: maxVal
    })
}

export const fetchFromFirebaseAndSetState = (queryRef, additionalData) => {
    console.log('this is ', this)
    if(this && queryRef){
        this.setState(additionalData);
        queryRef = queryRef();
        if (queryRef) {
            queryRef.on('value', (data) => {
                if (data.val())
                    console.log('on state ', this.state)
                    this.setState(data.val())
            })
        }
    }
}
