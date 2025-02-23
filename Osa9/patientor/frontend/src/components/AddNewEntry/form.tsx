import { useState, useEffect } from 'react';
import { useDiagnoses } from '../PatientPage/diagnosesContext';
import { addNewEntry } from './addNewEntry';
import { Entry } from '../../types';

const AddNewEntryForm = ({patientID, entries, setEntries} : { patientID : string, entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>> }) => {

    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ formType, setFormType ] = useState<string>('');

    const resetDiagnosesCodes = () => {
        const uniqueId = Date.now() + '-' + Math.floor(Math.random() * 1000);
        return uniqueId;
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleNewEntry = async (event: React.SyntheticEvent) => {
        addNewEntry(patientID, event, setErrorMessage, entries, setEntries, resetDiagnosesCodes);
    };

    const changeFormType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormType(event.target.value);
    };

    return (
        <div>
            { showForm == false && (
                <button onClick={toggleForm}>Add new entry</button>
            )}
            { showForm == true && (
                <form className='new-entry-form' onSubmit={handleNewEntry}>
                    <h3>New entry</h3>
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
                        <label htmlFor='formType'>Type:</label>
                        <br></br>
                        <input onChange={changeFormType} type="radio" id="healthCheckRatingType" name="formType" value="healthCheckRating"></input>
                        <label htmlFor="healthCheckRatingType">HealthCheck Rating</label>
                        <br></br>
                        <input onChange={changeFormType} type="radio" id="hospital" name="formType" value="hospital"></input>
                        <label htmlFor="hospital">Hospital</label>
                        <br></br>
                        <input onChange={changeFormType} type="radio" id="occupationalHealthcare" name="formType" value="occupationalHealthcare"></input>
                        <label htmlFor="occupationalHealthcare">OccupationalHealthcare</label>
                    </p>
                    { formType == 'healthCheckRating' && (
                        <HealthCheckRatingFields />
                    )}
                    { formType == 'hospital' && (
                        <HospitalEntryFields resetDiagnosesCodes={resetDiagnosesCodes} />
                    )}
                    { formType == 'occupationalHealthcare' && (
                        <OccupationalHealtcareFields resetDiagnosesCodes={resetDiagnosesCodes} />
                    )}
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

const HealthCheckRatingFields = () => {
    return (
        <p>
            <label htmlFor="healthCheckRating">Health Check Rating (0-3):</label>
            <br></br><input id="healthCheckRating" type="number" min="0" max="3" />
        </p>
    );
};

interface ResetProp {
    resetDiagnosesCodes: () => void;
}

const HospitalEntryFields = ({ resetDiagnosesCodes }: ResetProp) => {

    return (
        <div>
            <DiagnosesCodesField resetDiagnosesCodes={resetDiagnosesCodes} />
            <p>
                <label htmlFor="dischargeDate">Discharge date:</label>
                <br /><input id="dischargeDate" type="date" />
            </p>
            <p>
                <label htmlFor="dischargeCriteria">Discharge criteria:</label>
                <br /><input id="dischargeCriteria" type="text" />
            </p>
        </div>
    );
};

const OccupationalHealtcareFields = ({ resetDiagnosesCodes }: ResetProp) => {

    return (
        <div>
            <p>
                <label htmlFor="employerName">Employer name:</label>
                <br></br><input id="employerName" type="text" />
            </p>
            <DiagnosesCodesField resetDiagnosesCodes={resetDiagnosesCodes} />
            <p>
                <label htmlFor="sickLeaveStartDate">Sick leave start date:</label>
                <br></br><input id="sickLeaveStartDate" type="date" />
            </p>
            <p>
                <label htmlFor="sickLeaveEndDate">Sick leave end date:</label>
                <br></br><input id="sickLeaveEndDate" type="date" />
            </p>
        </div>
    );
};

const DiagnosesCodesField = ({ resetDiagnosesCodes }: { resetDiagnosesCodes: () => void }) => {
    const diagnoses = useDiagnoses();
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]); // Change to an array
    const [showSelect, setShowSelect] = useState<boolean>(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        
        setSelectedCodes(prevSelectedCodes => {
            const updatedSelectedCodes = [...new Set([...prevSelectedCodes, ...selectedOptions])];
            return updatedSelectedCodes;
        });

        setShowSelect(false);
    };

    const toggleShowSelect = () => {
        setShowSelect(!showSelect);
    };

    // Reset selected codes when resetDiagnosesCodes is called
    useEffect(() => {
        setSelectedCodes([]);
    }, [resetDiagnosesCodes]);

    return (
        <div>
            <label htmlFor="diagnosesCodes">Diagnoses codes:</label>
            <br />
            <input
                id='diagnosesCodes'
                type='text'
                readOnly
                className='diagnosisCodes'
                value={selectedCodes.join(', ')}
            />
            <div className='button select-values' onClick={toggleShowSelect}>Add diagnosis code</div>
            {showSelect && (
                <select id='selectDiagnosesCodes' size={10} name="diagnosesCodes" multiple onChange={handleSelectChange}>
                    {diagnoses && diagnoses.map((diagnose) => (
                        <option key={diagnose.code} value={diagnose.code}>
                            {diagnose.code} - {diagnose.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};



export default AddNewEntryForm;