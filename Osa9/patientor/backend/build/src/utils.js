"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseString = (value) => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing value');
    }
    return value;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDate = (date) => {
    if (!date) {
        throw new Error('Missing date');
    }
    if (!isString(date)) {
        throw new Error('Date is not a string');
    }
    if (!isDate(date)) {
        throw new Error('Date is not a date');
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isSsn = (ssn) => {
    if (typeof ssn !== "string")
        return false;
    const ssnRegex = /^[0-3]\d[0-1]\d\d{2}[+-A]\d{3}[0-9A-Z]$/;
    if (!ssnRegex.test(ssn))
        return false;
    const day = parseInt(ssn.substring(0, 2), 10);
    const month = parseInt(ssn.substring(2, 4), 10);
    const year = parseInt(ssn.substring(4, 6), 10);
    const century = ssn[6];
    const controlCharacter = ssn[10];
    // Validate day, month, year
    const fullYear = century === "+"
        ? 1800 + year
        : century === "-"
            ? 1900 + year
            : 2000 + year;
    const date = new Date(fullYear, month - 1, day);
    if (date.getFullYear() !== fullYear ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day) {
        return false;
    }
    // Validate control character
    const checksumBase = `${ssn.substring(0, 6)}${ssn.substring(7, 10)}`;
    const checksum = parseInt(checksumBase, 10) % 31;
    const controlCharacters = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    if (controlCharacters[checksum] !== controlCharacter) {
        return false;
    }
    return true;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(value => value.toString()).includes(gender);
};
