import React from 'react'
import './expense-list.css'
import ExpenseItem from './Expense/ExpenseItem'
import Header from './Header/Header'
import Message from './Message/Message'
import gql from 'graphql-tag'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { NotificationManager } from 'react-notifications';

const GET_EXPENSES = gql`
    subscription {
        expense(order_by: {date: desc}) {
            id
            cost
            date
            location
            tag {
                name
                icon
                id
            }
        }
    }
`

const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: bigint) {
    delete_expense(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`

const ExpenseList = () => {
  const { fetchLoading, fetchError, data } = useSubscription(GET_EXPENSES)
  const [deleteMutation, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_EXPENSE, {
    onCompleted(data) {
      NotificationManager.success('A Expense foi removida com sucesso!', 'Sucesso!')
    }
  })

  const deleteExpense = expense => deleteMutation({ variables: { id: expense.id } }).catch(error => console.log(error))

  const createItens = (expenses) => {
    if (expenses && expenses.length) {
      return expenses.map(expense => createItem(expense, expenses.indexOf(expense)))
    } else {
      return <Message message='message.empty.list' />
    }
  }

  const createItem = (expense, key) => (
    <ExpenseItem
      expense={expense}
      deleteExpense={deleteExpense}
      key={key}
    />
  )

  if (fetchLoading || mutationLoading || !data) {
    return <p>Loading...</p>
  }
  if (fetchError || mutationError) {
    const error = fetchError || mutationError
    NotificationManager.error(error.message, 'Error!')
  }

  return (
    <div className='expenses'>
      <div className='list'>
        <Header
          count={data.expense.length}
          totalCost={data.expense.map(e => e.cost).reduce((a, b) => a + b, 0)}
        />
        <div className='content'>{createItens(data.expense)}</div>
      </div>
    </div>
  )
}

export default ExpenseList
