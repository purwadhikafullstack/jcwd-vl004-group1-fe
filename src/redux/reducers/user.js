const init_state = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  phone: "",
  errMsg: "",
  storageIsChecked: false,
  is_verified: false,
  is_active: null,
  last_login: null,
  createdAt: "",
  updatedAt: "",
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      console.log(action.payload);
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_KEEP_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};

export default reducer;
