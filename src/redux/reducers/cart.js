const init_state = {
  cartList: [],
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cartList: action.payload };
    default:
      return state;
  }
};

export default reducer;
