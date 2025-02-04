import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export type NewPatient = z.infer<typeof NewPatientSchema>; 

export interface Patient extends NewPatient {
    id: string;
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
};

export type NewDiaryEntry = z.infer<typeof NewPatientSchema>; 