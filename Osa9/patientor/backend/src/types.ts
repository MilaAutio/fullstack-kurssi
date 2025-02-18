import { z } from 'zod';
import { NewPatientSchema, EntrySchema, NewEntrySchema } from './utils';

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export type NewPatient = z.infer<typeof NewPatientSchema>; 

export interface Patient extends NewPatient {
    id: string;
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
};

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>; 

export type DiaryEntry = z.infer<typeof EntrySchema>;