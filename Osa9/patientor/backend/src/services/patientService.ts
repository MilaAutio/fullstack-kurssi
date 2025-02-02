import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = () : Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
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

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};