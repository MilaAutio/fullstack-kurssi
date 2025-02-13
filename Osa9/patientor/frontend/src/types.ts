export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

interface BaseEntry {
  id: string;
  date: Date;
  specialist: string;
  description: string;
}

interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes: number[];
  discharge: {
    date: Date;
    criteria: string;
  }
}

export type Entry = OccupationalHealthcare | HospitalEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;