import patients from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../types';

const getEntries = () : Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name, 
        dateOfBirth,
        gender, occupation
    }));
};
  
const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};