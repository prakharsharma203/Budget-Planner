import { createContext, useContext, useEffect, useReducer } from "react";

const budgetContext = createContext();

const initialState = {
  budgets: [],
  remaining: null,
  spant: 0,
  budget: null,
};
const budgetReducer = (state, action) => {
  switch (action.type) {
    case "INISTIALIZE":
      return {
        ...state,
        budget: +action.payload.budget,
        remaining: +action.payload.budget,
      };
    case "ADD":
      const newBudgets = [...state.budgets, action.payload];
      const newSpant = newBudgets.reduce((acc, { cost }) => (acc += +cost), 0);
      const newRemaining = state.budget - newSpant;

      if (newRemaining < 0) {
        return state;
      }

      return {
        ...state,
        budgets: newBudgets,
        spant: newSpant,
        remaining: newRemaining,
      };
    case "DELETE":
      const newBudgets_ = state.budgets.filter(({ id }) => id !== action.id);
      const newSpant_ = newBudgets_.reduce((acc, { cost }) => (acc += +cost),0,);
      const newRemaining_ = state.budget - newSpant_;

      return {
        ...state,
        budgets: newBudgets_,
        spant: newSpant_,
        remaining: newRemaining_,
      };
      
    default:
      return state;
  }
};
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);


  return (
    <budgetContext.Provider value={{ state, dispatch }}>
      {children}
    </budgetContext.Provider>
  );
};

export const useBudget = () => useContext(budgetContext);