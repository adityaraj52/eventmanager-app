import React from "react";

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
    let values = [];
    array.map(item => {
        values.push(item[key]);
    });
    return values;
};

export const setUpBootstrapTable = (columnsToShow, isSortable, classNameForCells) => {
    let tableColumnData = [];
    columnsToShow.forEach(column => {
        tableColumnData.push({
            dataField: column.fieldName,
            text: column.aliasName,
            sort: !!isSortable,
            classes: classNameForCells
        })
    });
    return tableColumnData;
};