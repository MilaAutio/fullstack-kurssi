import { Gender } from "./types";
import { z } from 'zod';

// Base schema for shared properties
const baseEntrySchema = z.object({
    id: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    description: z.string()
});
  
const occupationalHealthcareSchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    diagnosisCodes: z.array(z.string()).optional(),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string().date(),
        endDate: z.string().date()
    }).optional()
});
  
const hospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal("Hospital"),
    diagnosisCodes: z.array(z.string()),
    discharge: z.object({
      date: z.string().date(),
      criteria: z.string()
    })
});

const healthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number(),
});
  
const entrySchema = z.discriminatedUnion("type", [
    occupationalHealthcareSchema,
    hospitalEntrySchema,
    healthCheckEntrySchema
]);

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().refine(ssn => isSsn(ssn), {
        message: 'Invalid ssn format'
    }),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(entrySchema)
});

export const PatientSchema = NewPatientSchema.extend({
    id: z.string()
});

const isSsn = (ssn: string): boolean => {
    if (typeof ssn !== "string") return false;

    const ssnRegex = /^[0-3]\d[0-1]\d\d{2}[+-A]\d{3}[0-9A-Z]$/;
    if (!ssnRegex.test(ssn)) return false;

    const day = parseInt(ssn.substring(0, 2), 10);
    const month = parseInt(ssn.substring(2, 4), 10);
    const year = parseInt(ssn.substring(4, 6), 10);
    const century = ssn[6];
    const controlCharacter = ssn[10];

    // Validate day, month, year
    const fullYear =
        century === "+"
            ? 1800 + year
            : century === "-"
            ? 1900 + year
            : 2000 + year;
    const date = new Date(fullYear, month - 1, day);
    if (
        date.getFullYear() !== fullYear ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
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