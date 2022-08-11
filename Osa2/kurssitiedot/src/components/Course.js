const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    const parts = props.parts 
    return (
      <div>
          {parts.map( part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} />
          )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>{props.part} {props.exercises}</p>
      </>
    )
  }
  
  const Total = (props) => {
    const parts = props.parts
    const initialValue = 0
    const exercisesCount = parts.map( part => part.exercises)
    const total = exercisesCount.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    )
    return (
      <>
        <b><p>Total of {total} exercises</p></b>
      </>
    )
  }
  
  export default Course