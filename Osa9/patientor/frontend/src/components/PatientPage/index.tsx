import { useParams } from "react-router-dom";
import { Patient, Diagnose, Entry } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import PatientEntries from "./patientEntries";
import AddNewEntryForm from "../AddNewEntry/form";
import { DiagnosesContext } from "./diagnosesContext";

const PatientPage = ( ) => {

    const [patient, setPatientData] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnose[] | undefined>(undefined);
    const [entries, setEntries] = useState<Entry[]>([]);
    const { id } = useParams();

    useEffect(() => {    
        const fetchPatientData = async () => {
            if (typeof id === "string") {
                const patient = await patientService.getPatient(id);
                setPatientData(patient);
                setEntries(patient.entries);
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
        <DiagnosesContext.Provider value={diagnoses}>
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
            <AddNewEntryForm patientID={patient.id} entries={entries} setEntries={setEntries} />
            { entries && ( <h2>Entries:</h2> )}
            { entries && entries.map((entry) => (
                <PatientEntries key={entry.id} entry={entry} />
            ))}
        </DiagnosesContext.Provider>
    );
};

export default PatientPage;