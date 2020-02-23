import React from "react";
import {DATABASE_TABLES} from "../constants/OtherConstants";

export const createFormControlSelectOptions = (dataArray, keyName, valueName= keyName) => {
    let  formControlSelectOptions = [];
    if (dataArray.length) {
        dataArray.forEach(data => (
            formControlSelectOptions.push(
                <option key={data[keyName]} value={data[valueName]}>
                    {data[valueName]}
                </option>)));
    }

    return formControlSelectOptions;
};

export const yesnoSelectOption = [
    {key:"Yes", value:"Yes"},
    {key:"No", value:"No"},
    {key:"Not Sure", value:"Not Sure"}
];

export const verifyKeyExistsInObject = (key, object) => {
    for (let keyname in object) {
        if(keyname === key)
            return true;
    }
    return false;
};

export const isSet = (object) => {
    if(object == null || !object)
        return false;
    switch (typeof object) {
        case "string": return object.trim().length > 0;
        default: return true;
    }
}