type Results = {
    'periodLength': number,
    'trainingDays': number,
    'success': boolean,
    'rating': number,
    'ratingDescription': string,
    'target': number,
    'average': number
};

const checkArguments = (args: string[]): number[] => {
    if (args.length < 3) throw new Error('Not enough arguments');
    const values = args.slice(2);
    let valuesAreNumbers = true;
    const numberedValues : number[] = [];
    values.map((value) => {
        if( isNaN( Number(value) ) ) { 
            valuesAreNumbers = false;
        } else {
            numberedValues.push( parseInt(value) );
        }
    });

    if( valuesAreNumbers == true ) {
      return numberedValues;
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = ( days: number[], target: number ) : Results => {

    let totalHours = 0;
    let trainingDays = 0;

    days.map((day) => {
        totalHours = totalHours + day;
        if(day > 0) { trainingDays++; } 
    });

    const average = totalHours / days.length;
    const success = average > target ? true : false;

    let rating = 0;
    let ratingDescription = '';
    if( (average / target) > 1 ) {
        rating = 3;
        ratingDescription = 'Well done! You should be proud of yourself';
    } else if( (average / target) < 1 && (average / target) > 0.5 ) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else if( (average / target) < 0) {
        rating = 1;
        ratingDescription = "Better than nothing";
    } else {
        rating = 0;
        ratingDescription = 'Exercising is important to your health';
    }

    return { 
        periodLength: days.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};


if (require.main === module) {
    try {
        const values: number[] = checkArguments(process.argv);
        const days: number[] = values.slice(0, -1);
        const target: number = values.pop() ?? 0;
        console.log(calculateExercises(days, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
};