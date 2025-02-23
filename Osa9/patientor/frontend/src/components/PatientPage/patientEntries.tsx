import { Entry, HospitalEntry, OccupationalHealthcare, HealthCheckEntry } from "../../types";
import { useDiagnoses } from './diagnosesContext';

const PatientEntries = ({ entry }: { entry: Entry }) => {

    return (
      <div className="entry">
        <p><b>{entry.date.toString()}</b> 
        <br></br>{entry.description}</p>
        { entry.type == 'Hospital' && ( <HospitalEntryDetails key={entry.id} entry={entry} /> )}
        { entry.type == 'OccupationalHealthcare' && ( <OccupationalHealthcareDetails key={entry.id} entry={entry} /> )}
        { entry.type == 'HealthCheck' && ( <HealthCheckDetails key={entry.id} entry={entry} /> )}
        <p><i>Diagnosed by {entry.specialist}</i></p>
      </div>
    );
};

const HealthCheckDetails = ({entry} : {entry: HealthCheckEntry}) => {
    return (
        <div>
            <p><b>Healthcheck rating:</b> {entry.healthCheckRating}</p>
        </div>
    );
};

const OccupationalHealthcareDetails = ({entry} : {entry: OccupationalHealthcare}) => {

    const diagnoses = useDiagnoses();

    return (
        <div>
            <p><b>Employer name:</b> {entry.employerName}</p>
            { entry.diagnosesCodes && (
                <ul>
                    {diagnoses && entry.diagnosesCodes.map((code) => {
                        const diagnose = diagnoses.find( (diagnose) => diagnose.code === code );
                        return (
                            <li key={code}>
                            {code} {diagnose?.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            { entry.sickLeave && (
                <p>
                    <b>Sick leave:</b> {entry.sickLeave.startDate.toString()} - {entry.sickLeave.endDate.toString()}
                </p>
            )}
        </div>
    );
};

const HospitalEntryDetails = ({entry} : {entry: HospitalEntry}) => {
    const diagnoses = useDiagnoses();

    return (
        <div>
            { entry.diagnosesCodes && (
                <ul>
                    {diagnoses && entry.diagnosesCodes.map((code) => {
                        const diagnose = diagnoses.find( (diagnose) => diagnose.code === code );
                        return (
                            <li key={code}>
                            {code} {diagnose?.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            <p>
                <b>Discharge:</b> {entry.discharge.date.toString()} {entry.discharge.criteria}
            </p>
        </div>
    );
};

export default PatientEntries;