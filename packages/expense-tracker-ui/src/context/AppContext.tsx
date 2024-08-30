'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ExpenseModel } from 'expense-tracker-common';

interface AppContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    expenses: ExpenseModel[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseModel[]>>;
    errorOpened: boolean;
    setErrorOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
    const [errorOpened, setErrorOpened] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ searchQuery, setSearchQuery, expenses, setExpenses, errorOpened, setErrorOpened }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
