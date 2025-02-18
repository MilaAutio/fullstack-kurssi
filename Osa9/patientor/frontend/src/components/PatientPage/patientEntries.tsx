import { Entry, Diagnose, HospitalEntry, OccupationalHealthcare, HealthCheckEntry } from "../../types";

const PatientEntries = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnose[] | undefined }) => {
    return (
      <div className="entry">
        <p><b>{entry.date.toString()}</b> 
        <br></br>{entry.description}</p>
        { entry.type == 'Hospital' && ( <HospitalEntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} /> )}
        { entry.type == 'OccupationalHealthcare' && ( <OccupationalHealthcareDetails key={entry.id} entry={entry} diagnoses={diagnoses} /> )}
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

const OccupationalHealthcareDetails = ({entry, diagnoses} : {entry: OccupationalHealthcare, diagnoses: Diagnose[] | undefined}) => {
    return (
        <div>
            <p><b>Employer name:</b> {entry.employerName}</p>
            { entry.diagnosisCodes && (
                <ul>
                    {diagnoses && entry.diagnosisCodes.map((code) => {
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

const HospitalEntryDetails = ({entry, diagnoses} : {entry: HospitalEntry, diagnoses: Diagnose[] | undefined}) => {
    return (
        <div>
            { entry.diagnosisCodes && (
                <ul>
                    {diagnoses && entry.diagnosisCodes.map((code) => {
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