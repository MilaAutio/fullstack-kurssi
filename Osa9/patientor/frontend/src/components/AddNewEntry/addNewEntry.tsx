import patientService from '../../services/patients';
import { NewEntry, BaseEntry, Entry } from '../../types';
import axios from 'axios';

export const addNewEntry = async (
    patientID: string, 
    event: React.SyntheticEvent, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>, 
    entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>>, 
    resetDiagnosesCodes: () => void 
) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
        date: { value: Date };
        specialist: { value: string };
        description: { value: string };
        formType: { value: string };
        healthCheckRating?: { value: number };
        diagnosesCodes?: { value: string };
        dischargeDate?: { value: Date };
        dischargeCriteria?: { value: string };
        employerName?: { value: string };
        sickLeaveStartDate?: { value: Date };
        sickLeaveEndDate?: { value: Date };
    };

    const formType = target.formType?.value;
    if( !formType ) { fieldMissing('Type', setErrorMessage); return; }

    const date = target.date?.value;
    if( !date ) { fieldMissing('Date', setErrorMessage); return; }

    const specialist = target.specialist?.value.trim();
    if( !specialist ) { fieldMissing('Specialist', setErrorMessage); return; }

    const description = target.description?.value.trim();
    if( !description ) { fieldMissing('Description', setErrorMessage); return; }

    const baseEntry : BaseEntry = {
        date: date,
        specialist: specialist,
        description: description
    };

    let newEntry: NewEntry | null = null;

    if( formType == 'healthCheckRating') {
        const healthCheckRating = target.healthCheckRating?.value;

        if( isNaN(Number(healthCheckRating)) ) { fieldMissing('Healthcheck rating', setErrorMessage); return; }
        
        newEntry = { ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: Number(healthCheckRating)
        };
    } else if( formType == 'hospital' || formType == 'occupationalHealthcare' ) {
        let diagnosesCodes = target.diagnosesCodes?.value?.split(',').map(code => code.trim());
        console.log(target.diagnosesCodes);
        if( !diagnosesCodes ) { diagnosesCodes = []; }

        if( formType == 'hospital' ) {
            const dischargeDate = target.dischargeDate?.value;
            if( !dischargeDate ) { fieldMissing('Discharge date', setErrorMessage); return; }

            const dischargeCriteria = target.dischargeCriteria?.value;
            if( !dischargeCriteria ) { fieldMissing('Discharge criteria', setErrorMessage); return; }

            newEntry = { ...baseEntry,
                type: "Hospital",
                diagnosesCodes: diagnosesCodes,
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria
                }
            };
        } else if( formType == 'occupationalHealthcare' ) {

            const employerName = target.employerName?.value;
            if( !employerName ) { fieldMissing('Employer name', setErrorMessage); return; }

            const startDate = target.sickLeaveStartDate?.value;
            const endDate = target.sickLeaveEndDate?.value;

            newEntry = { ...baseEntry,
                type: "OccupationalHealthcare",
                diagnosesCodes: diagnosesCodes,
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
            setEntries([...entries, response] );

            //reset form
            const form = event.target as HTMLFormElement;
            form.reset();
            resetDiagnosesCodes();
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

const fieldMissing = ( label: string, setErrorMessage: React.Dispatch<React.SetStateAction<string>> ) => {
    setErrorMessage(`${label} is required.`);
    setTimeout(() => {
        setErrorMessage('');
    }, 3000);
};