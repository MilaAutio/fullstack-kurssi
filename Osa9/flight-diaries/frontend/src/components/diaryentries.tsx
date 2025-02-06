import { DiaryEntry } from "../types";

//Fix cors policy next

const DiaryEntries = (props: { diaryEntries: DiaryEntry[]}) => {
    return (
        <div>
            { props.diaryEntries && props.diaryEntries.map((diaryEntry, index) => {
                return <div key={index}>
                    <p><b>{diaryEntry.date}</b></p>
                    <p>
                        Visibility: {diaryEntry.visibility}
                        <br></br>
                        Weather: {diaryEntry.weather}
                    </p>
                </div>
            })}
        </div>
    );
}

export default DiaryEntries;