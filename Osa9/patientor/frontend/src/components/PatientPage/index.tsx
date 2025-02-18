import { useParams } from "react-router-dom";
import { Patient, Diagnose } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import PatientEntries from "./patientEntries";

const PatientPage = ( ) => {

    const [patient, setPatientData] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>();
    const { id } = useParams();

    useEffect(() => {    
        const fetchPatientData = async () => {
            if (typeof id === "string") {
                const patient = await patientService.getPatient(id);
                setPatientData(patient);
            }
        };
        void fetchPatientData();

        const fetchDiagnosesList = async () => {
            const diagnosesData = await patientService.getDiagnoses();
            setDiagnoses(diagnosesData);
          };
          void fetchDiagnosesList();
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
            { patient.entries && ( <h2>Entries:</h2> )}
            {patient.entries && patient.entries.map((entry) => (
                <PatientEntries entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
    );
};

export default PatientPage;