import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { PatientSchema } from '../utils';

const patientEntries: Patient[] = patients.map(obj => {
  const objectWithEntries = { ...obj, entries: (obj as { entries?: unknown }).entries ?? [] };
  const object = PatientSchema.parse(objectWithEntries);
  return object;
});

const getEntries = () : Patient[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name, 
        dateOfBirth,
        gender, 
        occupation
    }));
};
  
const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientData = ( id: string ): Patient | undefined => {
  const patient = patientEntries.find((patient) => patient.id === id);
  return patient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPatientData
};