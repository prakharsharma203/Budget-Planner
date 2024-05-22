import { useEffect, useRef } from "react";
import { useBudget } from "../Context/BudgetContext";
import { v4 as uuidv4 } from "uuid";
import "./BudgetPlanner.css"

export const BudgetPlanner = ({ budget }) => {
  
  const { state, dispatch } = useBudget();
  const formRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "INISTIALIZE", payload: { budget } });
  }, []);
  

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    dispatch({ type: "ADD", payload: { id: uuidv4(), ...data } });
    formRef.current.reset();
  };

  const handleOnDelete = (id) => {
    dispatch({ type: "DELETE", id:id });
  };

  return (
    <div className="box">
      <div>
      <h1>My Budget Planner</h1>
      <div className="box2">
        <div className="input1">Budget: Rs.{state.budget}</div>
        <div className="input1">Remaining: Rs.{state.remaining}</div>
        <div className="input1">Spent so far: {state.spant}</div>
       
      </div>
      </div>
      <h2>Expenses</h2>
        {!state.budgets.length && <p className="p1">Add data to list....</p>}
        {state.budgets.map((bud) => (
          <div className="box3" key={bud.id}>
            <p className="p2">{bud.name}</p>
            <p className="p2">Rs.{bud.cost}{" "}</p>
            <button onClick={() => handleOnDelete(bud.id)}>Delete</button>
          </div>
        ))}
      <form ref={formRef} onSubmit={onFormSubmit}>
        <h2>Add Expenses</h2>
        <label>Name</label>
        <input className="i1" type="text" name="name" required />
        <label>Cost</label>
        <input className="i1" type="number"  name="cost" required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};