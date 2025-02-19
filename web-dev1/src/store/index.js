// src/store/index.js
import { createStore } from 'vuex';

// Helper function to parse prices (remove $ and commas, then convert to number)
const parsePrice = (price) => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''));
};

// Helper function to format prices
const formatPrice = (price) => {
  return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default createStore({
  state: {
    cartItems: [], // Array to store cart items
    user: null, // Store logged-in user information
  },
  mutations: {
    // Add item to cart
    addToCart(state, item) {
      const existingItem = state.cartItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.cartItems.push({ ...item, quantity: 1 }); // Add new item to cart
      }
    },
    // Remove item from cart
    removeFromCart(state, index) {
      state.cartItems.splice(index, 1);
    },
    // Increase item quantity
    increaseQuantity(state, index) {
      state.cartItems[index].quantity += 1;
    },
    // Decrease item quantity
    decreaseQuantity(state, index) {
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
      } else {
        state.cartItems.splice(index, 1); // Remove item if quantity is 1
      }
    },
    // Clear the entire cart
    clearCart(state) {
      state.cartItems = [];
    },
    // Set the logged-in user
    setUser(state, user) {
      state.user = user;
    },
    // Clear the logged-in user (logout)
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    // Actions to commit mutations
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, index) {
      commit('removeFromCart', index);
    },
    increaseQuantity({ commit }, index) {
      commit('increaseQuantity', index);
    },
    decreaseQuantity({ commit }, index) {
      commit('decreaseQuantity', index);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    // Login action
    login({ commit }, user) {
      commit('setUser', user);
    },
    // Logout action
    logout({ commit }) {
      commit('clearUser');
    },
  },

  actions: {
    // Actions to commit mutations
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, index) {
      commit('removeFromCart', index);
    },
    increaseQuantity({ commit }, index) {
      commit('increaseQuantity', index);
    },
    decreaseQuantity({ commit }, index) {
      commit('decreaseQuantity', index);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    // Login action
    login({ commit }, user) {
      commit('setUser', user);
    },
    // Logout action
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    // Getter for cart items
    cartItems: (state) => state.cartItems,
    // Getter for total number of items in cart
    cartItemCount: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    // Getter for total price of items in cart
    totalPrice: (state) => {
      const total = state.cartItems
        .reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)
        .toFixed(2); // Ensure 2 decimal places
      return formatPrice(total); // Format with commas
    },
    // Getter for logged-in user
    loggedInUser: (state) => state.user,
  },
});