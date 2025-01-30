import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = () : Diagnose[] => {
  return diagnoses;
};
  
const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};