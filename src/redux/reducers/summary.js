const init_state = {
  isAddressMode: false,
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET_ADDRESS":
      return { ...state, isAddressMode: action.payload };
    default:
      return state;
  }
};

export default reducer;
