"use client"

import type React from "react"

import { useState } from "react"
import { useExpenses } from "@/contexts/ExpenseContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ExpenseForm() {
  const { addExpense } = useExpenses()
  const { toast } = useToast()
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !amount || !category || !description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const parsedAmount = Number.parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      })
      return
    }

    addExpense({
      date,
      amount: parsedAmount,
      category,
      description,
    })

    toast({
      title: "Expense added",
      description: "Your expense has been recorded successfully",
    })

    // Reset form
    setDate("")
    setAmount("")
    setCategory("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <Input
            id="category"
            placeholder="e.g., Food, Transport"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Input
            id="description"
            placeholder="e.g., Grocery shopping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Expense
      </Button>
    </form>
  )
}