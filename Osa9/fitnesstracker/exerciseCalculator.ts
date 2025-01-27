type Results = {
    'periodLength': number,
    'trainingDays': number,
    'success': boolean,
    'rating': number,
    'ratingDescription': string,
    'target': number,
    'average': number
}

const calculateExercises = ( days: number[], target: number ) : Results => {

    var totalHours = 0
    var trainingDays = 0

    days.map((day) => {
        totalHours = totalHours + day
        if(day > 0) { trainingDays++ } 
    })

    const average = totalHours / days.length
    var success = average > target ? true : false

    var rating = 0
    var ratingDescription = ''
    if( (average / target) > 1 ) {
        rating = 3
        ratingDescription = 'Well done! You should be proud of yourself'
    } else if( (average / target) < 1 && (average / target) > 0.5 ) {
        rating = 2
        ratingDescription = 'Not too bad but could be better'
    } else if( (average / target) < 0) {
        rating = 1
        ratingDescription = "Better than nothing"
    } else {
        rating = 0
        ratingDescription = 'Exercising is important to your health'
    }

    return { 
        periodLength: days.length,
        trainingDays: trainingDays,
        success: success,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))