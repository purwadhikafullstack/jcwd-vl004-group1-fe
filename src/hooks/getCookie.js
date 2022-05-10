import Cookie from "js-cookie";

export const getCartCookie = (x) => {
  return Cookie.get("selectedCart");
};
export const getAddressCookie = (x) => {
  return Cookie.get("selectedAddress");
};
export const getPaymentCookie = (x) => {
  return Cookie.get("selectedPayment");
};
export const getShipmentCookie = (x) => {
  return Cookie.get("selectedShipment");
};
export const getDiscountCookie = (x) => {
  return Cookie.get("selectedDiscount");
};
