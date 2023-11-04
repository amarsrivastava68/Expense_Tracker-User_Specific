import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './SingleExpense.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { expenseActions } from '../../store/expenseSlice'
import axios from 'axios'



const SingleExpense = ({ item }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const semail=useSelector((state) => state.auth.email)
  

  const deleteHandler = async () => {
    try {
      const resp = await axios.delete(
        `https://ecom-cb2ba-default-rtdb.firebaseio.com//expenses/${item.id}.json`
      
      )
      console.log(resp)
      if (resp.status === 200) {
        console.log('ExpenseDeleted successfully...')
        const res = await axios.get(
          'https://ecom-cb2ba-default-rtdb.firebaseio.com/expenses.json'
        )
        if (res.status === 200) {
          const data = res.data

          const loadArray = []
          for (const key in data) {
            const parsedData = JSON.parse(data[key].body)
            // console.log(parsedData)
            loadArray.unshift({
              id: key,
              money: parsedData.money,
              description: parsedData.description,
              category: parsedData.category,
              email: parsedData.email,
            })
          }
          // console.log(loadArray)
          dispatch(expenseActions.addExpense(loadArray))
        } else {
          alert('Something went  please Refresh Page...')
        }
      } else {
        alert('Something went wrong please try again...')
      }
    } catch (error) {
      window.alert('Something went wrong please try again...')
      console.log(error.message)
    }
  }

  const editHandler = () => {
    dispatch(expenseActions.editExpense(item))
    navigate('/edit-expense')
  }

  if(semail===item["email"])
 {
  return (
    <div className={classes.item}>
      <li className={classes.listItem}>
        <div className={classes.header}>
          <div className={classes.category}>
            <p>
              <span>Category : </span>
              {item.category}
            </p>
            <p>
              <span>Price : </span>
              {item.money}
            </p>
          </div>
         
        </div>
        <p>
          <span>Description : </span>
          {item.description}
        </p>
        <br/>
        <div>
            <button onClick={editHandler} className={classes.btn}>
              Edit
            </button>
            <button onClick={deleteHandler} className={classes.btn}>
              Delete
            </button>
          </div>
      </li>
    </div>
    
    )
  }
}
  

export default SingleExpense