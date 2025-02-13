import { useParams } from "react-router-dom";
import { Patient, Entry } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";

const PatientPage = ( ) => {

    const [patient, setPatientData] = useState<Patient>();
    const { id } = useParams();

    useEffect(() => {    
        const fetchPatientData = async () => {
            if (typeof id === "string") {
                const patient = await patientService.getPatient(id);
                setPatientData(patient);
            }
        };
        void fetchPatientData();
    }, [id]);

    if(!patient) {
        return (
            <div>
                <p>Patient data not found.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>
                {patient.name}
                <span style={{ marginLeft: '1rem' }}>
                    {patient.gender == 'male' && ( <img src="../src/assets/images/male.svg"></img> )}
                    {patient.gender == 'female' && ( <img src="../src/assets/images/female.svg"></img> )}
                    {patient.gender == 'other' && ( <img src="../src/assets/images/other-gender.svg"></img> )}
                </span>
            </h2>
            <p><b>SSN:</b> {patient.ssn}</p>
            <p><b>Occupation:</b> {patient.occupation}</p>
            <h2>Entries:</h2>
            {patient.entries && patient.entries.map((entry) => (
                <PatientEntries key={entry.id} entry={entry} />
            ))}
        </div>
    );
};

const PatientEntries = ({ entry }: { entry: Entry }) => {
    console.log(entry);
    return (
      <div>
        <p><b>{entry.date}</b> 
        <br></br>{entry.description}</p>
        { (entry.type === 'OccupationalHealthcare' || entry.type === 'Hospital') && entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
      </div>
    );
  };

export default PatientPage;