import { useState } from 'react';
import patientService from '../../services/patients';
import { NewEntry, Entry, BaseEntry } from '../../types';
import axios from 'axios';

const AddNewEntryForm = ({patientID, entries, setEntries} : { patientID : string, entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>> }) => {

    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ formType, setFormType ] = useState<string>('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const newEntryClick = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            date: { value: Date };
            specialist: { value: string };
            description: { value: string };
            formType: { value: string };
            healthCheckRating?: { value: number };
            diagnosisCodes?: { value: string };
            dischargeDate?: { value: Date };
            dischargeCriteria?: { value: string };
            employerName?: { value: string };
            sickLeaveStartDate?: { value: Date };
            sickLeaveEndDate?: { value: Date };
        };
    
        const formType = target.formType?.value;
        if( !formType ) { fieldMissing('Type'); return; }

        const date = target.date?.value;
        if( !date ) { fieldMissing('Date'); return; }

        const specialist = target.specialist?.value.trim();
        if( !specialist ) { fieldMissing('Specialist'); return; }

        const description = target.description?.value.trim();
        if( !description ) { fieldMissing('Description'); return; }

        const baseEntry : BaseEntry = {
            date: date,
            specialist: specialist,
            description: description
        };

        let newEntry: NewEntry | null = null;

        if( formType == 'healthCheckRating') {
            const healthCheckRating = target.healthCheckRating?.value;

            if( isNaN(Number(healthCheckRating)) ) { fieldMissing('Healthcheck rating'); return; }
            
            newEntry = { ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: Number(healthCheckRating)
            };
        } else if( formType == 'hospital' || formType == 'occupationalHealthcare' ) {
            const diagnosisCodes = target.diagnosisCodes?.value?.split(',').map(code => code.trim());

            if( formType == 'hospital' ) {
                const dischargeDate = target.dischargeDate?.value;
                if( !dischargeDate ) { fieldMissing('Discharge date'); return; }
    
                const dischargeCriteria = target.dischargeCriteria?.value;
                if( !dischargeCriteria ) { fieldMissing('Discharge criteria'); return; }
    
                newEntry = { ...baseEntry,
                    type: "Hospital",
                    diagnosisCodes: diagnosisCodes,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
            } else if( formType == 'occupationalHealthcare' ) {

                const employerName = target.employerName?.value;
                if( !employerName ) { fieldMissing('Employer name'); return; }

                const startDate = target.sickLeaveStartDate?.value;
                const endDate = target.sickLeaveEndDate?.value;

                newEntry = { ...baseEntry,
                    type: "OccupationalHealthcare",
                    diagnosisCodes: diagnosisCodes,
                    employerName: employerName,
                    ...(startDate && endDate
                        ? { sickLeave: { startDate, endDate } }
                        : {})
                };
            }
        } else {
            setErrorMessage('Form is invalid.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    
        if( newEntry) {
            try {
                const response = await patientService.addNewEntry(patientID, newEntry);
                const form = event.target as HTMLFormElement;
                form.reset();
                console.log(response);
                setEntries([...entries, response] );
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
        }
    };

    const fieldMissing = ( label: string ) => {
        setErrorMessage(`${label} is required.`);
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
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
                <form className='new-entry-form' onSubmit={newEntryClick}>
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
                        <HospitalEntryFields />
                    )}
                    { formType == 'occupationalHealthcare' && (
                        <OccupationalHealtcareFields />
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

const HospitalEntryFields = () => {
    return (
        <div>
            <p>
                <label htmlFor="diagnosisCodes">Diagnosis codes: <i>(Separate with commas)</i></label>
                <br></br><input id="diagnosisCodes" type="text" />
            </p>
            <p>
                <label htmlFor="dischargeDate">Discharge date:</label>
                <br></br><input id="dischargeDate" type="date" />
            </p>
            <p>
                <label htmlFor="dischargeCriteria">Discharge criteria:</label>
                <br></br><input id="dischargeCriteria" type="text" />
            </p>
        </div>
    );
};

const OccupationalHealtcareFields = () => {
    return (
        <div>
            <p>
                <label htmlFor="employerName">Employer name:</label>
                <br></br><input id="employerName" type="text" />
            </p>
            <p>
                <label htmlFor="diagnosisCodes">Diagnosis codes: <i>(Separate with commas)</i></label>
                <br></br><input id="diagnosisCodes" type="text" />
            </p>
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

export default AddNewEntryForm;