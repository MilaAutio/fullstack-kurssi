import axios from 'axios';
import { useEffect, useContext } from 'react'
import { DiaryEntriesContext } from '../contexts/diaryEntriesContext';

const DiaryEntries = () => {

    const { diaryEntries, setDiaryEntries } = useContext(DiaryEntriesContext);

    useEffect(() => {
      axios.get('http://localhost:3000/api/diaries').then(response => {
        setDiaryEntries(response.data)
      })
    }, [])

    return (
        <div>
            { diaryEntries && diaryEntries.map((diaryEntry, index) => {
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