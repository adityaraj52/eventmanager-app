import React from "react";

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