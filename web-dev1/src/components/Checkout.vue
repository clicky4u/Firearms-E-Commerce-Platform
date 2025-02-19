<template>
  <div class="flex flex-col min-h-screen">
    <!-- Back to Home Button -->
    <button @click="goHome" class="text-black hover:text-gray-400 mt-3 ml-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
      </svg>
    </button>
    <!-- Main Content -->
    <div class="flex-grow">
      <!-- Checkout Page -->
      <div v-if="cartItems.length > 0"
        class="checkout-container max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-16 flex">
        <!-- Left Side: Product List -->
        <div class="w-2/3 pr-4">
          <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Secure Checkout</h1>

          <!-- Display Cart Items -->
          <div class="space-y-4">
            <ul>
              <li v-for="(item, index) in cartItems" :key="index"
                class="flex justify-between items-center py-4 border-b border-gray-200">
                <div class="flex items-center">
                  <img :src="item.image" alt="Product" class="w-20 h-20 object-cover rounded-lg shadow-sm mr-4" />
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                    <p class="text-lg font-semibold text-gray-900">${{ formatPrice((parsePrice(item.price) *
                      item.quantity).toFixed(2)) }}</p>
                  </div>
                </div>
                <button @click="removeItem(index)" class="text-red-500 hover:text-red-700">
                  <span class="text-lg">X</span>
                </button>
              </li>
            </ul>

            <!-- Additional Charges Section -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$7.99</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Package Protection</span>
                <span>$9.99</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Tax</span>
                <span>${{ formatPrice(taxAmount) }}</span>
              </div>
            </div>

            <!-- Total Price with additional charges -->
            <div class="text-right text-xl font-bold text-gray-900 mt-4">
              <span>Total: </span>
              ${{ formatPrice(finalTotal) }}
            </div>
          </div>
        </div>

        <!-- Right Side: Billing Info Form -->
        <div class="w-1/3 pl-4">
          <div class="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Billing Information</h2>
            <form @submit.prevent="handleCheckout" class="space-y-4">
              <!-- Email Input -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700">Email Address</label>
                <input v-model="email" type="email" id="email"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>

              <!-- Card Number -->
              <div>
                <label for="cardNumber" class="block text-sm font-semibold text-gray-700">Card Number</label>
                <input v-model="cardNumber" type="text" id="cardNumber" placeholder="1234 5678 9101 1121"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" maxlength="19"
                  @input="formatCardNumber" required />
              </div>
              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="expiry" class="block text-sm font-semibold text-gray-700">Expiration (MM/YY)</label>
                  <input v-model="expiry" type="text" id="expiry" placeholder="MM/YY"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" maxlength="5"
                    @input="formatExpiry" required />
                </div>
                <div class="w-1/2 relative">
                  <label for="cvc" class="block text-sm font-semibold text-gray-700">CVC</label>
                  <input v-model="cvc" type="text" id="cvc" maxlength="3"
                    class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required />
                  <!-- CVC Icon (PNG Image) -->
                  <img src="/assets/image/cvc.png" alt="CVC Icon"
                    class="absolute right-3 top-8 w-6 h-6 text-gray-500" />
                </div>
              </div>

              <!-- Billing Address -->
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700">Full Name</label>
                <input v-model="name" type="text" id="name"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label for="address1" class="block text-sm font-semibold text-gray-700">Address Line 1</label>
                <input v-model="address1" type="text" id="address1"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label for="address2" class="block text-sm font-semibold text-gray-700">Address Line 2</label>
                <input v-model="address2" type="text" id="address2"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="city" class="block text-sm font-semibold text-gray-700">City</label>
                  <input v-model="city" type="text" id="city"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div class="w-1/2">
                  <label for="postalCode" class="block text-sm font-semibold text-gray-700">Postal Code</label>
                  <input v-model="postalCode" type="text" id="postalCode"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <!-- Card Logos -->
              <div class="flex space-x-4 mt-2">
                <img src="/assets/image/visa.png" alt="Visa" class="w-10 h-auto" />
                <img src="/assets/image/mastercard.png" alt="MasterCard" class="w-10 h-auto" />
                <img src="/assets/image/american-express.png" alt="American Express" class="w-10 h-auto" />
              </div>

              <div class="flex justify-center">
                <button type="button" @click="handleCheckout" :disabled="loading || orderPlaced"
                  class="w-32 py-3 text-white rounded-lg transition-colors duration-200" :class="{
                    'bg-yellow-500': loading, // Yellow when loading
                    'bg-green-500 flex items-center justify-center': orderPlaced,
                    'bg-black hover:bg-gray-700': !orderPlaced && !loading
                  }">
                  <span v-if="loading">Processing...</span>
                  <span v-else-if="orderPlaced">
                    <img src="/assets/image/check.png" alt="Check" class="w-6 h-6" />
                  </span>
                  <span v-else>Pay Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Show this when cart is empty -->
      <div v-else class="text-center mt-16">
        <p class="text-xl text-gray-800">Your cart is empty.</p>
        <button @click="goHome"
          class="mt-4 bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-500 focus:outline-none transition-colors duration-200">Go
          to Home</button>
      </div>
    </div>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Footer from '../components/Footer.vue';

const router = useRouter();
const store = useStore();

const cartItems = ref([]);
const name = ref('');
const address1 = ref('');
const address2 = ref('');
const city = ref('');
const postalCode = ref('');
const cardNumber = ref('');
const expiry = ref('');
const cvc = ref('');
const email = ref('');
const loading = ref(false);
const orderPlaced = ref(false);

// Load cart items from URL params
const loadCartItems = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cartItemsData = urlParams.get('cartItems');
  if (cartItemsData) {
    try {
      cartItems.value = JSON.parse(decodeURIComponent(cartItemsData));
    } catch (error) {
      console.error('Error parsing cartItems:', error);
    }
  }
};

// Price parsing helper
const parsePrice = (price) => {
  // Ensure the price is a string and remove any non-numeric characters except '.' and '-'
  const numericValue = String(price).replace(/[^0-9.-]+/g, '');
  const parsedValue = parseFloat(numericValue);
  return isNaN(parsedValue) ? 0 : parsedValue; // Return 0 if parsing fails
};

// Format price
const formatPrice = (price) => {
  const numericValue = parseFloat(price);
  return isNaN(numericValue) ? '0.00' : numericValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format card number (inserting spaces every 4 digits)
const formatCardNumber = () => {
  let number = cardNumber.value.replace(/\D/g, '');
  if (number.length > 4) {
    number = number.replace(/(\d{4})(\d{1,4})$/, '$1 $2');
  }
  cardNumber.value = number;
};

// Format expiry date (MM/YY)
const formatExpiry = () => {
  let expiryVal = expiry.value.replace(/\D/g, '').slice(0, 4);
  if (expiryVal.length > 2) {
    expiryVal = `${expiryVal.slice(0, 2)}/${expiryVal.slice(2, 4)}`;
  }
  expiry.value = expiryVal;
};

// Handle checkout
const handleCheckout = async () => {
  if (loading.value || orderPlaced.value) return;

  loading.value = true;

  // Add shipping, packageProtection, and tax to orderDetails
  const shippingPrice = 7.99; // Set static values for shipping and package protection
  const packageProtection = 9.99;
  const tax = parseFloat(taxAmount.value); // Calculate tax


  const orderDetails = {
    email: email.value,
    name: name.value,
    address: `${address1.value}, ${address2.value}, ${city.value}, ${postalCode.value}`,
    items: cartItems.value,
    total: finalTotal.value,
    shippingPrice: shippingPrice,
    packageProtection: packageProtection,
    tax: tax,
    date: new Date().toLocaleString(),
  };

  console.log("Order Details before saving to localStorage:", orderDetails);  // Log to check values

  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));



  // Save order details to localStorage
  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));


  setTimeout(() => {
    loading.value = false;
    orderPlaced.value = true;
    store.dispatch('clearCart');

    setTimeout(() => {
      router.push('/Success');
    }, 3000);
  }, 2000);
};




// Remove item from cart
const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

// Navigate to home
const goHome = () => {
  router.push('/');
};

// Computed properties
const totalPrice = computed(() => {
  return cartItems.value
    .reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0)
    .toFixed(2);
});

const taxAmount = computed(() => {
  return (parseFloat(totalPrice.value) * 0.08).toFixed(2);
});

const finalTotal = computed(() => {
  const shipping = 7.99;
  const packageProtection = 9.99;
  const tax = parseFloat(taxAmount.value);
  const subtotal = parseFloat(totalPrice.value);
  return (subtotal + shipping + packageProtection + tax).toFixed(2);
});

// Load cart items on mount
onMounted(() => {
  loadCartItems();
});
</script>

<style scoped>
.checkout-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>