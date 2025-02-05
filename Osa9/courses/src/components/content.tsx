import { CoursePart } from "../types";

const Content = (props: { courseParts: CoursePart[] }) => {
    const courseParts = props.courseParts;
    return (
      <div>
        {
            courseParts && courseParts.map((part, index) => {
                return <div key={index}><Part coursePart={part} /></div>
            })
        }
      </div>
    );
};

const Part = (props: { coursePart: CoursePart }) => {
    const coursePart = props.coursePart
    const contentBase = coursePart.name + ' ' + coursePart.exerciseCount;
    switch(coursePart.kind) {
        case 'group':
            return <p><b>{ contentBase }</b><br></br>Group project count: {coursePart.groupProjectCount}</p>
        case 'background':
            return <p><b>{ contentBase }</b><br></br><i>{coursePart.description}</i><br></br>Background material: {coursePart.backgroundMaterial}</p>
        case 'special':
            return <p><b>{ contentBase }</b><br></br><i>{coursePart.description}</i><br></br>Requirements: {coursePart.requirements.map((requirement) => {return requirement + ', ';})}</p>
        default: 
            return <p><b>{ contentBase }</b></p>
    }
}
  
export default Content;