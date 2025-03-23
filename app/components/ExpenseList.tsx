import type { Expense } from "./FinanceTracker"

interface ExpenseListProps {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {expenses.map((expense) => (
            <li key={expense.id} className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{expense.date}</span>
                <span className="text-green-600 font-bold">₹{expense.amount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-medium">{expense.category}</span> - <span>{expense.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

