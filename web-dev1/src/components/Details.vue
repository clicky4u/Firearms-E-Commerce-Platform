<template>
    <div>
        <!-- Top Bar -->
        <div
            class="bg-slate-50 text-black p-3 fixed w-full top-0 left-0 flex justify-between items-center z-20 shadow-md">
            <!-- Back to Home Icon -->
            <button @click="goHome" class="text-black hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
            </button>
            <!-- Cart Button (floating) -->
            <button @click="toggleCart"
                class="p-4 bg-black text-white rounded-full shadow-lg focus:outline-none relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span v-if="cartItemCount > 0"
                    class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{
                    cartItemCount }}</span>
            </button>
        </div>

        <!-- Product Details -->
        <div class="container mx-auto p-6 mt-16 flex flex-col items-center">
            <h1 class="text-3xl font-semibold text-center">{{ name }}</h1>
            <div class="relative">
                <!-- Product Image with Magnifying Glass -->
                <img :src="image" class="w-96 h-96 object-cover mx-auto cursor-zoom-in" id="product-image"
                    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @click="openFullImage" />
                <div id="magnifying-glass"
                    :class="['absolute', 'w-32', 'h-32', 'bg-white', 'bg-opacity-50', 'rounded-full', 'pointer-events-none', 'border', 'border-gray-300', 'shadow-lg', { hidden: !isMagnifying }]">
                </div>
            </div>
            <p class="text-center">{{ description }}</p>
            <p class="text-lg font-bold text-center text-indigo-500">{{ price }}</p>

            <!-- Add to Cart Button -->
            <button @click="addToCart({ name: name, description: description, price: price, image: image })"
                class="mt-4 py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none">
                Add to Cart
            </button>
        </div>

        <!-- Full Image Modal -->
        <div v-if="isFullImageVisible"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30" @click="closeFullImage">
            <img :src="image" class="max-w-full max-h-full" />
        </div>

        <!-- Cart Panel -->
        <div v-show="cartVisible" class="fixed right-0 top-0 h-full w-96 bg-white text-black shadow-lg z-20">
            <div class="flex items-center justify-between p-4 border-b border-gray-600">
                <!-- Back Arrow Icon moved to the left -->
                <button @click="toggleCart"
                    class="text-black text-xl hover:text-gray-400 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </button>

                <!-- "Your Cart" moved to the right -->
                <h2 class="text-black text-2xl font-semibold">Your Cart</h2>
            </div>

            <div class="px-4 py-2">
                <!-- List of cart items -->
                <div v-if="cartItems.length === 0" class="text-center text-black">Your cart is empty.</div>
                <ul>
                    <li v-for="(item, index) in cartItems" :key="index" class="py-4 border-b border-gray-600">
                        <div class="flex items-center">
                            <img :src="item.image" alt="product image" class="w-16 h-16 object-cover rounded mr-4" />
                            <div class="flex-1">
                                <!-- Product Name -->
                                <span class="text-lg font-semibold">{{ item.name }}</span>

                                <!-- Quantity Control and Price -->
                                <div class="flex items-center space-x-4 mt-2">
                                    <!-- Quantity Control -->
                                    <div
                                        class="flex items-center space-x-2 mt-2 w-20 h-8 justify-center bg-gray-700 rounded-md">
                                        <button @click="decreaseQuantity(index)"
                                            class="text-lg text-gray-300 hover:text-gray-500 p-1 transition-colors duration-200">
                                            -
                                        </button>

                                        <!-- Quantity Display -->
                                        <span class="text-lg text-white">
                                            {{ item.quantity }}
                                        </span>

                                        <button @click="increaseQuantity(index)"
                                            class="text-lg text-gray-300 hover:text-gray-500 p-1 transition-colors duration-200">
                                            +
                                        </button>
                                    </div>

                                    <!-- Original Price and Total Price -->
                                    <div class="flex items-center space-x-2">
                                        <span class="text-lg text-gray-500">
                                            ${{ parseFloat(item.price.slice(1)).toFixed(2) }}
                                        </span>
                                        <span class="text-lg text-black">
                                            ${{ (parseFloat(item.price.slice(1)) * item.quantity).toFixed(2) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Remove Button (X) -->
                            <button @click="removeFromCart(index)"
                                class="ml-4 text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200">
                                X
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Trash Icon Button to Clear Cart -->
            <div v-if="cartItems.length > 0" class="flex justify-between items-center px-4 py-2 border-t">
                <button @click="clearCart" class="p-3 bg-gray-700 text-red-500 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>

                <!-- Total Price -->
                <div class="text-right text-sm font-semibold">
                    Total: ${{ totalPrice }}
                </div>
            </div>

            <!-- Cart Actions -->
            <div class="px-4 py-2 flex justify-between items-center space-x-2">

                <button @click="goToCheckout"
                    class="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-500 focus:outline-none transition-colors duration-200">
                    Checkout
                </button>
            </div>
        </div>
    </div>
          <!-- Footer -->
          <Footer />
        <!-- SMS Message Notification -->
        <div v-if="smsMessageVisible"
            class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50">
            {{ smsMessage }}
        </div>
    
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Footer from '../components/Footer.vue';

const store = useStore();

// Get route params
const route = useRoute();
const router = useRouter();
const name = ref(route.query.name);
const description = ref(route.query.description);
const price = ref(route.query.price);
const image = ref(route.query.image);

// Magnifying glass state
const isMagnifying = ref(false);

// Full image modal state
const isFullImageVisible = ref(false);

// Handle mouse movement for magnifying glass
const handleMouseMove = (e) => {
    const img = e.target;
    const glass = document.getElementById('magnifying-glass');
    const rect = img.getBoundingClientRect();

    // Calculate mouse position relative to the image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ensure the magnifying glass stays within the image bounds
    const glassSize = glass.offsetWidth / 2;
    glass.style.left = `${x - glassSize}px`;
    glass.style.top = `${y - glassSize}px`;

    // Calculate background position for zoom effect
    const bgX = (x / img.width) * 100;
    const bgY = (y / img.height) * 100;
    glass.style.backgroundImage = `url('${img.src}')`;
    glass.style.backgroundPosition = `${bgX}% ${bgY}%`;

    isMagnifying.value = true;
};

// Cart functions
function toggleCart() {
    cartVisible.value = !cartVisible.value;
}

// Hide magnifying glass when mouse leaves the image
const handleMouseLeave = () => {
    isMagnifying.value = false;
};

// Open full image modal
const openFullImage = () => {
    isFullImageVisible.value = true;
};

// Close full image modal
const closeFullImage = () => {
    isFullImageVisible.value = false;
};

// Cart functionality
const cartVisible = ref(false);

// Access cart state and getters
const cartItems = computed(() => store.getters.cartItems);
const cartItemCount = computed(() => store.getters.cartItemCount);
const totalPrice = computed(() => store.getters.totalPrice);

// Cart actions
const addToCart = (item) => {
    store.dispatch('addToCart', item);
};

const removeFromCart = (index) => {
    store.dispatch('removeFromCart', index);
};

const increaseQuantity = (index) => {
    store.dispatch('increaseQuantity', index);
};

const decreaseQuantity = (index) => {
    store.dispatch('decreaseQuantity', index);
};

const clearCart = () => {
    store.dispatch('clearCart');
};

const goHome = () => {
    router.push('/');
};

// Add state for SMS notification
const smsMessageVisible = ref(false);
const smsMessage = ref('');
const loggedInUser = computed(() => store.getters.loggedInUser);

// Handle Checkout
const goToCheckout = () => {
    if (!loggedInUser.value) {
        smsMessage.value = 'Please log in to proceed with the checkout';
        smsMessageVisible.value = true;

        setTimeout(() => {
            smsMessageVisible.value = false;
            router.push('/');
        }, 3000);
        return;
    }

    router.push({
        name: 'Checkout',
        query: { cartItems: JSON.stringify(cartItems.value) },
    });
};


</script>

<style scoped>
#magnifying-glass {
    background-repeat: no-repeat;
    background-size: 200% 200%;
    /* Adjust zoom level */
    border: 2px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: opacity 0.2s ease;
}

/* Full Image Modal */
.fixed {
    z-index: 30;
}

</style>