import express from 'express';
import cors from 'cors';
import diagnosesRouter from '../src/routes/diagnoseRouter';
import patientRouter from '../src/routes/patientRouter';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});