import axios from "axios";
import { DiaryEntriesContext } from '../contexts/diaryEntriesContext';
import { useContext, useState } from "react";

const NewEntry = () => {

    const { diaryEntries, setDiaryEntries } = useContext(DiaryEntriesContext);
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const addNewEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            date: { value: string };
            visibility: { value: string };
            weather: { value: string };
            comment: { value: string };
        };
    
        const date = target.date.value.trim();
        const visibility = target.visibility.value.trim();
        const weather = target.weather.value.trim();
        const comment = target.comment.value.trim();
    
        if (date && visibility && weather && comment) {
            const newEntry = {
                date: date,
                visibility: visibility,
                weather: weather,
                comment: comment,
            };
    
            try {
                const response = await axios.post('http://localhost:3000/api/diaries', newEntry);
                setDiaryEntries([...diaryEntries, response.data]);
    
                target.date.value = "";
                target.visibility.value = "";
                target.weather.value = "";
                target.comment.value = "";
            } catch( error ) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data)
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 3000)
                } else {
                    console.error(error);
                }
            }
        } else {
            setErrorMessage('All fields are required.')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    };

    return (
        <div>
            <h3>Add new entry</h3>
            { errorMessage && <div style={{color: "red"}}>{errorMessage}</div> }
            <form onSubmit={addNewEntry}>
                <p>
                    <label>Date: </label>
                    <input type="text" id="date"></input>
                </p>
                <p>
                    <label>Visibility: </label>
                    <select id="visibility">
                        <option disabled>Choose</option>
                        <option value="great">Great</option>
                        <option value="good">Good</option>
                        <option value="ok">Ok</option>
                        <option value="poor">Poor</option>
                    </select>
                </p>
                <p>
                    <label>Weather: </label>
                    <select id="weather">
                        <option disabled>Choose</option>
                        <option value="sunny">Sunny</option>
                        <option value="rainy">Rainy</option>
                        <option value="cloudy">Cloudy</option>
                        <option value="stormy">Stormy</option>
                        <option value="windy">Windy</option>
                    </select>
                </p>
                <p>
                    <label>Comment: </label><br></br>
                    <textarea id="comment"></textarea>
                </p>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewEntry;