import Cookie from "js-cookie";

export const removeCartCookie = (selectedCart) => {
  Cookie.remove("selectedCart");
};
export const removeAddressCookie = (selectedAddress) => {
  Cookie.remove("selectedAddress");
};
export const removePaymentCookie = (selectedPayment) => {
  Cookie.remove("selectedPayment");
};
export const removeShipmentCookie = (selectedShipment) => {
  Cookie.remove("selectedShipment");
};
