"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Expense } from "../components/FinanceTracker"

interface ExpenseContextType {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, "id">) => void
  clearExpenses: () => void
  clearExpensesByDate: (date: string) => void
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses")
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses))
    }
  }, [])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() }
    const updatedExpenses = [...expenses, newExpense]
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  const clearExpenses = () => {
    setExpenses([])
    localStorage.removeItem("expenses")
  }

  const clearExpensesByDate = (date: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.date !== date)
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, clearExpenses, clearExpensesByDate }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  const context = useContext(ExpenseContext)
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider")
  }
  return context
}

