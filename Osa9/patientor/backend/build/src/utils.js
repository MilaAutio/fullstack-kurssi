"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientSchema = exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string().refine(ssn => isSsn(ssn), {
        message: 'Invalid ssn format'
    }),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string()
});
exports.PatientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string().refine(ssn => isSsn(ssn), {
        message: 'Invalid ssn format'
    }),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string()
});
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
