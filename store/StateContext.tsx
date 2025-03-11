import { createContext, ReactNode, useContext, useState } from "react";

interface StateContextType {
    ROWS: number;
    setROWS: (row: number) => void;
    COLS: number;
    setCOLS: (col: number) => void;
    MINES: number;
    setMINES: (mine: number) => void;
    FLAGS: number;
    setFLAGS: (flag: number) => void;
    MODE: string;
    setMODE: (mode: string) => void;
}

const StateContext = createContext<StateContextType | null>(null);

interface StateProviderProps {
    children: ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
    const [ROWS, setROWS] = useState(8);
    const [COLS, setCOLS] = useState(8);
    const [MINES, setMINES] = useState(10);
    const [FLAGS, setFLAGS] = useState(10);
    const [MODE, setMODE] = useState("EASY");

    return (
        <StateContext.Provider value={{ ROWS, setROWS, COLS, setCOLS, MINES, setMINES, FLAGS, setFLAGS, MODE, setMODE }}>
            {children}
        </StateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useAppState must be used within a StateProvider");
    }
    return context;
}
