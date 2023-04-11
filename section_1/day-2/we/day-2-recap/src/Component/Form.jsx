import React, { useReducer } from "react";

const initialVal = {
  username: "",
  useremail: "",
};

const formReducerFn = (state, action) => {
  switch (action.type) {
    case "USER_NAME":
      return {
        ...state,
        username: action.payload,
      };

    case "USER_EMAIL":
      return {
        ...state,
        useremail: action.payload,
      };

    case "RESET":
        return initialVal
        

    default:
      return state;
  }
};

function Form() {
  const [formData, dispatch] = useReducer(formReducerFn, initialVal);
  //   console.log(formData);
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({type:"RESET"})
  };
// faltu comment hai bad mai delet kar dene hai ok 
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formSubmit}>
        <div>
          <lable>Username</lable>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              dispatch({ type: "USER_NAME", payload: e.target.value })
            }
          />
        </div>
        <div>
          <lable>Useremail</lable>
          <input
            type="email"
            value={formData.useremail}
            onChange={(e) =>
              dispatch({ type: "USER_EMAIL", payload: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
