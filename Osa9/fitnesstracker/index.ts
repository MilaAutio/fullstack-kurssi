import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = typeof req.query.weight === "string" ? parseInt(req.query.weight, 10) : null;
    const height = typeof req.query.height === "string" ? parseInt(req.query.height, 10) : null;

    if( weight && height ) {

        const bmi = calculateBmi(height, weight);

        const results = {
            weight: weight,
            height: height,
            bmi: bmi
        };
    
        res.send(results);
    } else {
        res.send({error: "malformatted parameters"});
    }
});

type ExercisesRequest = {
  exercises: number[],
  target: number
};

app.use(express.json());

app.post('/exercises', (req, res) => {
  const { exercises, target } = req.body as ExercisesRequest;

  if( !exercises || !target ) {
    return res.status(400).send({ error: "parameters missing"});
  }
  const isArrayOfNumbers = Array.isArray(exercises) && exercises.every(item => typeof item === 'number');
  if( !isArrayOfNumbers || isNaN(Number(target)) ) {
    return res.status(400).send({ error: "malformatted parameters"});
  }

  const results = calculateExercises(exercises, Number(target));
  return res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});