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
                    <input type="date" id="date"></input>
                </p>
                <fieldset>
                    <legend>Visibility: </legend>
                    <input type="radio" id="great" name="visibility" value="great" defaultChecked />
                    <label htmlFor="great">Great</label>     
                    <input type="radio" id="good" name="visibility" value="good" />
                    <label htmlFor="good">Good</label>
                    <input type="radio" id="ok" name="visibility" value="ok" />
                    <label htmlFor="ok">Ok</label>
                    <input type="radio" id="poor" name="visibility" value="poor" />
                    <label htmlFor="poor">Poor</label>
                </fieldset>
                <fieldset>
                    <legend>Weather: </legend>
                    <input type="radio" id="sunny" name="weather" value="sunny" defaultChecked />
                    <label htmlFor="sunny">Sunny</label>     
                    <input type="radio" id="rainy" name="weather" value="rainy" />
                    <label htmlFor="rainy">Rainy</label>
                    <input type="radio" id="cloudy" name="weather" value="cloudy" />
                    <label htmlFor="cloudy">Cloudy</label>
                    <input type="radio" id="stormy" name="weather" value="stormy" />
                    <label htmlFor="stormy">Stormy</label>
                    <input type="radio" id="windy" name="weather" value="windy" />
                    <label htmlFor="windy">Windy</label>
                </fieldset>
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