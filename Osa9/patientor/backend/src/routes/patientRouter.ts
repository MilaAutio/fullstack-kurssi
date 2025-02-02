import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientData } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;