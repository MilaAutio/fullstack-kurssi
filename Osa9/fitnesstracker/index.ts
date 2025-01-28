import express from 'express';
import { calculateBmi } from './bmiCalculator';
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});