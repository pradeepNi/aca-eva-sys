export const intialState = {
  toggle: false,
  name: "",
  email: "",
  isLogin: false,
};

export const reducer = (state, action) => {
  //  (state, action);
  switch (action.type) {
    case "SIDEBAR_TOGGLE":
      return { ...state, toggle: action.payload.toggle };

    case "SUCC_LOGIN":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        email: action.payload.email,
        name: action.payload.name,
      };

    case "LOGOUT":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        email: action.payload.email,
        name: action.payload.name,
        toggle: action.payload.toggle,
      };

    default:
      return state;
  }
};
