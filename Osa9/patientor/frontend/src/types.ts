export interface Diagnose {
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
  entries: Entry[];
}

export interface BaseEntry {
  date: Date;
  specialist: string;
  description: string;
}

export interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    diagnosisCodes?: string[];
    sickLeave?: {
      startDate: Date;
      endDate: Date;
    }
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes?: string[];
  discharge: {
    date: Date;
    criteria: string;
  }
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

export type NewEntry = OccupationalHealthcare | HospitalEntry | HealthCheckEntry;

export type Entry = NewEntry & { id: string };

export type PatientFormValues = Omit<Patient, "id" | "entries">;