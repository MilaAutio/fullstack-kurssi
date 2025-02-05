interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
interface CoursePartBaseWithDescrpition extends CoursePartBase {
    description: string;
}
  
interface CoursePartBasic extends CoursePartBaseWithDescrpition {
    kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
interface CoursePartBackground extends CoursePartBaseWithDescrpition {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseWithDescrpition {
    requirements: string[];
    kind: "special"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;