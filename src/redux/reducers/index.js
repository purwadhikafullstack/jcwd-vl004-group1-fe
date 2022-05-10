import { combineReducers } from "redux";
import adminReducer from "./admin";
import userReducer from "./user";
import cartReducer from "./cart";
import summaryReducer from "./summary";

export default combineReducers({
  admin: adminReducer,
  user: userReducer,
  cart: cartReducer,
  summary: summaryReducer,
});
