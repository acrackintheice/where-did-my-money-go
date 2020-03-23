import React from 'react'
import './expense-list.css'
import Expense from '../../components/ExpenseList/Expense/Expense'
import Filter from '../ExpenseList/Filter/Filter'
import NewExpense from '../ExpenseList/Header/NewExpense/NewExpense'

const ExpenseList = props => {
  const createItens = () => props.expenses.map(exp => createItem(exp))

  const createItem = exp => (
    <Expense
      delete={props.delete}
      key={props.expenses.indexOf(exp)}
      expense={exp}
    />
  )

  return (
    <div className='expenses'>
      <Filter />
      <div className='list'>
        <div className='header'>
          <NewExpense key={-1} create={props.create} />
        </div>
        <div className='content'>{createItens()}</div>
      </div>
    </div>
  )
}

export default ExpenseList
