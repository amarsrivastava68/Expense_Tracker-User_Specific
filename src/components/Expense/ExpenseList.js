import React, { useEffect } from "react";

import classes from "./ExpenseList.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { expenseActions } from "../../store/expenseSlice";
import SingleExpense from "./SingleExpense";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const loggedemail = useSelector((state) => state.auth.email);

  const filteredExpenses = expenses.filter(
    (item) => item.email === loggedemail
  );
  console.log(filteredExpenses);
  useEffect(() => {
    async function fetchHandler() {
      const res = await axios.get(
        "https://ecom-cb2ba-default-rtdb.firebaseio.com/expenses.json"
      );
      if (res.status === 200) {
        console.log(res);
        const data = res.data;
        console.log(data);
        const loadArray = [];
        for (const key in data) {
          const parsedData = JSON.parse(data[key].body);
          console.log("parseddata ", parsedData);

          loadArray.unshift({
            id: key,
            money: parsedData.money,
            description: parsedData.description,
            category: parsedData.category,
            email: parsedData.email,
          });
        }

        dispatch(expenseActions.addExpense(loadArray));
        // if (expenses.length === 0) {
        // expenses = loadArray
        // }
      }
    }
    fetchHandler();
  }, [expenses]);

  let totalAmount = 0;
  if (expenses) {
    totalAmount = expenses.reduce((acc, val) => {
      return (acc += Number(val.money));
    }, 0);
    console.log(totalAmount);
  }

  const csvDataDownloader = () => {
    const csvData = [["Category", "Money", "Description"]];

    expenses.forEach((each) => {
      let tmp = [each.category, each.money, each.description];
      csvData.push(tmp);
    });

    function makeCSV(allRows) {
      return allRows.map((r) => r.join(",")).join("\n");
    }

    const a2 = document.getElementById("a2");
    const blob2 = new Blob([makeCSV(csvData)]);
    a2.href = URL.createObjectURL(blob2);
  };

  return (
    <div className={classes.mainList}>
      <h2>Account Name  -"{loggedemail}" </h2>
      <div>
        <a id="a2" download="file2.csv">
          <button onClick={csvDataDownloader} className={classes.btnc}>
            Download Expenses
          </button>
        </a>
      </div>
      {totalAmount > 10000 && (
        <button className={classes.premium}>Activate Premium</button>
      )}

      <ul className={classes.list}>
        {filteredExpenses.map((each) => {
          return <SingleExpense key={each.id} item={each} />;
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;
