// import shop from '../api/shop'
import * as types from './mutation-types'

// export const addToCart = types.ADD_TO_CART

export const showAlert = types.SHOW_ALERT
export const hideAlert = types.HIDE_ALERT

export const showConfirm = types.SHOW_CONFIRM
export const hideConfirm = types.HIDE_CONFIRM

// export const checkout = ({ dispatch, state }, products) => {
//   const savedCartItems = [...state.cart.added]
//   dispatch(types.CHECKOUT_REQUEST)
//   shop.buyProducts(
//     products,
//     () => dispatch(types.CHECKOUT_SUCCESS),
//     () => dispatch(types.CHECKOUT_FAILURE, savedCartItems)
//   )
// }

// export const getAllProducts = ({ dispatch }) => {
//   shop.getProducts(products => {
//     dispatch(types.RECEIVE_PRODUCTS, products)
//   })
// }