const calculateBmi = ( height: number, weight: number ) : string => {
    var bmi: number = weight / (( height / 100 ) ** 2 )
    console.log( bmi )
    if( bmi > 40 ) {
        return 'Very severely obese';
    } else if( bmi > 35 && bmi <= 40 ) {
        return 'Severely obese';
    } else if( bmi > 30 && bmi <= 35 ) {
        return 'Moderately obese';
    } else if( bmi > 25 && bmi <= 30 ) {
        return 'Overweight';
    } else if( bmi > 18.5 && bmi <= 25 ) {
        return 'Normal range';
    } else if( bmi <= 18.5 ) {
        return 'Underweight';
    } else {
        return 'Error';
    }
}

console.log(calculateBmi(180, 74))