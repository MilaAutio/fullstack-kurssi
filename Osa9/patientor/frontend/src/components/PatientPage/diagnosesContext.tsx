import { createContext, useContext } from "react";
import { Diagnose } from "../../types";

export const DiagnosesContext = createContext<Diagnose[] | undefined>(undefined);

export const useDiagnoses = () => {
    const context = useContext(DiagnosesContext);
    if (!context) {
        throw new Error('useDiagnoses must be used within a DiagnosesProvider');
    }
    return context;
};