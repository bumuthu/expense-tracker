'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ExpenseModel } from 'expense-tracker-common';
import { getCurrentmonthDate } from '../utils';
import { ExpensesRestService } from '../services/expenses-rest-service';
import { ApplicationErrorType } from '../enums';

interface AppContextType {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    expenses: ExpenseModel[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseModel[]>>;
    errorOpened: boolean;
    setErrorOpened: React.Dispatch<React.SetStateAction<boolean>>;
    error: ApplicationErrorType;
    setError: React.Dispatch<React.SetStateAction<ApplicationErrorType>>;
    selectedMonth: Date | null;
    setSelectedMonth: React.Dispatch<React.SetStateAction<Date | null>>;
    fetchExpenses: () => Promise<void>;
    totalExpenses: number
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [selectedMonth, setSelectedMonth] = useState<Date | null>(getCurrentmonthDate());
    const [errorOpened, setErrorOpened] = useState<boolean>(false);
    const [error, setError] = useState<ApplicationErrorType>(ApplicationErrorType.NONE);
    const expensesService = new ExpensesRestService();

    useEffect(() => {
        fetchExpenses()
    }, [selectedMonth])

    useEffect(() => {
        const calculateTotal = () => {
            let total = 0;
            expenses.forEach((expense) => {
                total += expense.amount;
            })
            setTotalExpenses(total)
        }
        calculateTotal();
    }, [expenses])

    const fetchExpenses = async () => {
        setLoading(true)
        expensesService.getExpenses({ month: selectedMonth?.getTime() }).then(expenses => {
            setExpenses(expenses)
            setLoading(false)
        }).catch(err => {
            setErrorOpened(true)
        })
    }

    return (
        <AppContext.Provider value={{
            loading, setLoading, searchQuery, setSearchQuery, expenses, setExpenses, errorOpened, error, setError,
            setErrorOpened, selectedMonth, setSelectedMonth, fetchExpenses, totalExpenses
        }}>
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
