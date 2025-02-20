import { useState } from 'react';
import patientService from '../../services/patients';
import { NewEntry, Entry } from '../../types';
import axios from 'axios';

const AddNewEntryForm = ({patientID, entries, setEntries} : { patientID : string, entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>> }) => {

    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const newEntryClick = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            date: { value: Date };
            specialist: { value: string };
            description: { value: string };
            healthCheckRating: { value: number };
        };
    
        const date = target.date?.value;
        const specialist = target.specialist?.value.trim();
        const description = target.description?.value.trim();
        const healthCheckRating = target.healthCheckRating?.value;

        if(date && specialist && description && healthCheckRating ) {
            const newEntry : NewEntry = {
                date: date,
                specialist: specialist,
                description: description,
                type: "HealthCheck",
                healthCheckRating: Number(healthCheckRating)
            };
    
            try {
                const response = await patientService.addNewEntry(patientID, newEntry);
                const form = event.target as HTMLFormElement;
                form.reset();
                console.log(response);
                setEntries([...entries, response] );
                //entries.push()
            } catch( error ) {
                if (axios.isAxiosError(error)) {
                    const errorMsg = typeof error.response?.data.error?.[0]?.message === 'string'
                        ? error.response?.data.error?.[0]?.message
                        : error.response?.data.error?.[0]?.message || 'An error occurred';
                    setErrorMessage(errorMsg);
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 3000);
                } else {
                    console.error(error);
                }
            }
        } else {
            setErrorMessage('All fields are required.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <div>
            { showForm == false && (
                <button onClick={toggleForm}>Add new entry</button>
            )}
            { showForm == true && (
                <form className='new-entry-form' onSubmit={newEntryClick}>
                    <h3>New health check entry</h3>
                    <p>
                        <label htmlFor='date'>Date:</label>
                        <br></br><input id='date' type='date'></input>
                    </p>
                    <p>
                        <label htmlFor='description'>Description:</label>
                        <br></br><textarea id='description'></textarea>
                    </p>
                    <p>
                        <label htmlFor='specialist'>Specialist:</label>
                        <br></br><input id='specialist' type='text'></input>
                    </p>
                    <p>
                        <label htmlFor="healthCheckRating">Health Check Rating (0-3):</label>
                        <br></br><input id="healthCheckRating" type="number" min="0" max="3" />
                    </p>
                    { errorMessage && <div className='error-message'>{errorMessage}</div> }
                    <div className='buttons'>
                        <button onClick={toggleForm}>Cancel</button>
                        <input type="submit" value="Add new entry"></input>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddNewEntryForm;