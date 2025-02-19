<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main Content -->
    <div class="flex-grow">
      <!-- Top Bar -->
      <div
        class="bg-slate-50 text-black p-3 fixed w-full top-0 left-0 flex justify-between items-center z-20 shadow-md">
        <img src="/assets/image/Logo.png" alt="Your Shop Logo" class="w-10 h-10 object-contain" />

        <!-- Mobile Menu Toggle Button -->
        <button @click="toggleMenu" class="text-black md:hidden p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-4">
          <button @click="scrollToProducts('Pistols (Handguns)')"
            class="text-black hover:text-cyan-300 transition-colors duration-200 text-xl font-semibold py-2 px-4">Pistols
            (Handguns)</button>
          <button @click="scrollToProducts2('Rifles (Assault & Battle Rifles)')"
            class="text-black hover:text-cyan-300 transition-colors duration-200 text-xl font-semibold py-2 px-4">Rifles
            (Assault & Battle Rifles)</button>
          <button @click="scrollToProducts3('submachine guns (SMGs)')"
            class="text-black hover:text-cyan-300 transition-colors duration-200 text-xl font-semibold py-2 px-4">Submachine
            Guns (SMGs)</button>
        </div>

        <!-- Login/Signup and Cart Buttons -->
        <div class="flex items-center space-x-4">

          <!-- Login/Profile Button -->
          <button @click="toggleAuthModal"
            class="p-3 bg-black hover:bg-gray-500 text-white rounded-full shadow-lg focus:outline-none w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>

          <!-- Cart Button -->
          <button @click="toggleCart"
            class="p-3 bg-black hover:bg-gray-500 text-white rounded-full shadow-lg focus:outline-none w-12 h-12 flex items-center justify-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span v-if="cartItemCount > 0"
              class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {{ cartItemCount }}
            </span>
          </button>
        </div>

        <!-- Auth Modal -->
        <div v-if="authModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
          <div
            class="bg-cover bg-center p-6 rounded-lg shadow-lg w-96 relative border-2 backdrop-blur-md animate-border"
            style="background-image: url('your-image-path.jpg'); background-size: cover; background-position: center;">

            <!-- Close Button (Inside Modal) -->
            <div class="flex justify-end">
              <button @click="toggleAuthModal"
                class="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Login/Signup Form -->
            <div v-if="!loggedInUser" class="flex justify-center items-center">
              <div class="w-full max-w-sm">
                <h2 class="text-2xl font-semibold mb-4 text-white">{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
                <form @submit.prevent="handleAuth">
                  <div v-if="!isLogin" class="mb-4">
                    <label for="name" class="block text-sm font-medium text-white">Full Name</label>
                    <input type="text" id="name" v-model="authForm.name" required
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-white">Email</label>
                    <input type="email" id="email" v-model="authForm.email" required
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-white">Password</label>
                    <div class="relative">
                      <input :type="showPassword ? 'text' : 'password'" id="password" v-model="authForm.password"
                        required
                        class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                      <!-- Show Password Checkbox -->
                      <div class="flex items-center mt-2">
                        <input type="checkbox" id="showPassword" v-model="showPassword"
                          class="mr-2 cursor-pointer text-white" />
                        <label for="showPassword" class="text-sm text-white">Show Password</label>
                      </div>
                    </div>
                  </div>
                  <div v-if="!isLogin" class="mb-4">
                    <label for="confirmPassword" class="block text-sm font-medium text-white">Confirm Password</label>
                    <input :type="showPassword ? 'text' : 'password'" id="confirmPassword"
                      v-model="authForm.confirmPassword" required
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <button type="submit" :disabled="loading"
                    class="mx-auto bg-white text-black py-2 px-7 text-sm rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 block">
                    <span v-if="loading">Loading...</span>
                    <span v-else>{{ isLogin ? 'Login' : 'Sign Up' }}</span>
                  </button>

                </form>
                <p class="mt-4 text-center text-sm text-white">
                  {{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}
                  <button @click="toggleAuthMode" class="text-indigo-600 hover:text-indigo-500">
                    {{ isLogin ? 'Sign Up' : 'Login' }}
                  </button>
                </p>
              </div>
            </div>

            <!-- Profile Section (Visible after Login) -->
            <div v-else class="flex justify-center items-center">
              <div class="w-full max-w-sm">
                <h2 class="text-2xl font-semibold mb-4 text-white">Your Profile</h2>
                <form @submit.prevent="updateProfile">
                  <div class="mb-4">
                    <label for="profileName" class="block text-sm font-medium text-white">Full Name</label>
                    <input type="text" id="profileName" v-model="profileForm.name" required
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <div class="mb-4">
                    <label for="profileEmail" class="block text-sm font-medium text-white">Email</label>
                    <input type="email" id="profileEmail" v-model="profileForm.email" required
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <div class="mb-4">
                    <label for="profilePassword" class="block text-sm font-medium text-white">New Password</label>
                    <div class="relative">
                      <input :type="showPassword ? 'text' : 'password'" id="profilePassword"
                        v-model="profileForm.password"
                        class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                      <!-- Show Password Checkbox -->
                      <div class="flex items-center mt-2">
                        <input type="checkbox" id="showProfilePassword" v-model="showPassword"
                          class="mr-2 cursor-pointer text-white" />
                        <label for="showProfilePassword" class="text-sm text-white">Show Password</label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label for="profileConfirmPassword" class="block text-sm font-medium text-white">Confirm New
                      Password</label>
                    <input :type="showPassword ? 'text' : 'password'" id="profileConfirmPassword"
                      v-model="profileForm.confirmPassword"
                      class="mt-1 block w-full px-3 py-1.5 border border-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black">
                  </div>
                  <!-- Update Profile Button -->
                  <button type="submit" :disabled="loading"
                    class="mx-auto bg-white text-black py-1 px-4 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 block w-auto">
                    <span v-if="loading">Updating...</span>
                    <span v-else>Update Profile</span>
                  </button>
                  <!-- Logout Button -->
                  <button @click="logout" type="button"
                    class="mx-auto mt-4 bg-red-600 text-white py-1 px-9 text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 block w-auto">
                    Log Out
                  </button>
                </form>
              </div>
            </div>


          </div>
        </div>

      </div>

      <!-- Overlay (Mask) for Mobile Menu -->
      <div v-if="menuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-20" @click="toggleMenu"></div>

      <!-- Mobile Navigation Menu (Hidden on Desktop) -->
      <div v-if="menuOpen" class="fixed top-16 left-0 right-0 z-30 bg-white p-4 shadow-lg space-y-4">
        <button @click="handleMenuClick('Pistols (Handguns)')" class="w-full text-left text-xl font-semibold">Pistols
          (Handguns)</button>
        <button @click="handleMenuClick('Rifles (Assault & Battle Rifles)')"
          class="w-full text-left text-xl font-semibold">Rifles (Assault & Battle Rifles)</button>
        <button @click="handleMenuClick('submachine guns (SMGs)')"
          class="w-full text-left text-xl font-semibold">Submachine Guns (SMGs)</button>
      </div>

      <!-- GIF Banner with Shop Now Button -->
      <div class="w-full relative">
        <img src="/assets/image/renderdock-studio-glock-fire-banner.gif"
          alt="Animated banner showcasing products or promotions" class="w-full h-auto" loading="eager"
          fetchpriority="high" />

        <!-- Shop Now Button -->
        <button @click="scrollToProducts"
          class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full shadow-lg transition-colors duration-200 hover:bg-black hover:text-white">BUY
          NOW</button>
      </div>
    </div>

    <!-- Cart Panel -->
    <div v-show="cartVisible" class="fixed right-0 top-0 h-full w-96 bg-white text-black shadow-lg z-20">
      <div class="flex items-center justify-between p-4 border-b border-gray-600">
        <!-- Back Arrow Icon moved to the left -->
        <button @click="toggleCart" class="text-black text-xl hover:text-gray-400 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
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
                  <div class="flex items-center space-x-2 mt-2 w-20 h-8 justify-center bg-gray-700 rounded-md">
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
                      {{ item.price }}
                    </span>
                    <span class="text-lg text-black">
                      ${{ formatPrice((parsePrice(item.price) * item.quantity).toFixed(2)) }}
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
          class="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-500 focus:outline-none transition-colors duration-200"
          :class="{
            'bg-gray-500 cursor-not-allowed': !loggedInUser || loading, // Disable button if not logged in or loading
            'hover:bg-gray-500': !loggedInUser || loading // Remove hover effect if disabled
          }">
          Checkout
        </button>

      </div>
    </div>

    <!-- Main Content (Pistols) -->
    <div ref="productList" class="container mx-auto p-6">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">Pistols (Handguns)</h1>
      <!-- Product List Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in Pistols" :key="item.id"
          class="p-4 bg-white shadow-lg  transition-all duration-200 group flex flex-col">
          <!-- Product Image -->
          <div class="relative w-full h-56 overflow-hidden rounded-lg">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />

            <!-- Overlay Icons -->
            <div
              class="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <!-- View Details -->
              <button @click="goToDetails(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>

              <!-- Add to Cart -->
              <button @click="addToCart(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="flex-1 flex flex-col justify-between p-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
            <p class="text-lg font-bold text-indigo-600">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content (Rifles) -->
    <div ref="productList2" class="container mx-auto p-6">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">Rifles (Assault & Battle Rifles)</h1>
      <!-- Product List Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in Rifles" :key="item.id"
          class="p-4 bg-white shadow-lg  transition-all duration-200 group flex flex-col">
          <!-- Product Image -->
          <div class="relative w-full h-56 overflow-hidden rounded-lg">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />

            <!-- Overlay Icons -->
            <div
              class="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <!-- View Details -->
              <button @click="goToDetails(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>

              <!-- Add to Cart -->
              <button @click="addToCart(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="flex-1 flex flex-col justify-between p-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
            <p class="text-lg font-bold text-indigo-600">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content (SMG) -->
    <div ref="productList3" class="container mx-auto p-6">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">submachine guns (SMGs)</h1>
      <!-- Product List Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in SMG" :key="item.id"
          class="p-4 bg-white shadow-lg  transition-all duration-200 group flex flex-col">
          <!-- Product Image -->
          <div class="relative w-full h-56 overflow-hidden rounded-lg">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />

            <!-- Overlay Icons -->
            <div
              class="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <!-- View Details -->
              <button @click="goToDetails(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>

              <!-- Add to Cart -->
              <button @click="addToCart(item)"
                class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="flex-1 flex flex-col justify-between p-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
            <p class="text-lg font-bold text-indigo-600">{{ item.price }}</p>
          </div>
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
  </div>
</template>



<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Footer from '../components/Footer.vue';


const router = useRouter();
const store = useStore();

// Product data
const Pistols = ref([
  { id: 1, name: 'GLOCK G17 GEN 3', description: 'Pistols (Handguns)', price: '$499', image: '/assets/image/Glock 17.jpg' },
  { id: 2, name: 'COLT M1911A1 MFG:1944', description: 'Pistols (Handguns)', price: '$2,500', image: '/assets/image/Colt M1911.jpg' },
  { id: 3, name: 'SIG SAUER', description: 'Pistols (Handguns)', price: '$471', image: '/assets/image/SIG SAUER.jpg' },
  { id: 4, name: 'BERETTA 92FS *10-ROUND*', description: 'Pistols (Handguns)', price: '$663', image: '/assets/image/BERETTA 92FS 10-ROUND.jpg' },
  { id: 5, name: 'BERETTA 92FS INOX', description: 'Pistols (Handguns)', price: '$900', image: '/assets/image/BERETTA 92FS INOX.jpg' },
  { id: 6, name: 'HECKLER & KOCH USP', description: 'Pistols (Handguns)', price: '$663', image: '/assets/image/HECKLER & KOCH USP.jpg' },
  { id: 7, name: 'FN Five-Seven', description: 'Pistols (Handguns)', price: '$1,037', image: '/assets/image/FN Five-Seven.jpg' },
  { id: 8, name: 'WALTHER PPK/S .22', description: 'Pistols (Handguns)', price: '$345', image: '/assets/image/WALTHER PPK S .22.jpg' },
]);

const Rifles = ref([
  { id: 9, name: 'CENTURY ARMS CGR', description: 'Rifles (Assault & Battle Rifles)', price: '$969', image: '/assets/image/CENTURY ARMS CGR.avif' },
  { id: 10, name: 'Tippmann Arms M4-22 LTE Accents', description: 'Rifles (Assault & Battle Rifles)', price: '$474', image: '/assets/image/Tippmann Arms M4-22 LTE Accents.avif' },
  { id: 11, name: 'TIPPMANN ARMS M4-22', description: 'Rifles (Assault & Battle Rifles)', price: '$449', image: '/assets/image/TIPPMANN ARMS M4-22.avif' },
  { id: 12, name: 'RUGER AR-556', description: 'Rifles (Assault & Battle Rifles)', price: '$1,018', image: '/assets/image/RUGER AR-556.avif' },
  { id: 13, name: 'FN SCAR 16S NRCH 5.56 FDE', description: 'Rifles (Assault & Battle Rifles)', price: '$3,020', image: '/assets/image/FN SCAR 16S NRCH 5.56 FDE.jpg' },
  { id: 14, name: 'STEYR AUG A3 M1', description: 'Rifles (Assault & Battle Rifles)', price: '$1,907', image: '/assets/image/STEYR AUG A3 M1.jpg' },
  { id: 15, name: 'IWI TAVOR X95', description: 'Rifles (Assault & Battle Rifles)', price: '$1,749', image: '/assets/image/IWI TAVOR X95.jpg' },
  { id: 16, name: 'ZASTAVA ARMS ZPAP M70', description: 'Rifles (Assault & Battle Rifles)', price: '$1,329', image: '/assets/image/ZASTAVA ARMS ZPAP M70.jpg' },
]);

const SMG = ref([
  { id: 17, name: 'Heckler & Koch MP5', description: 'Submachine Guns (SMGs)', price: '$611', image: '/assets/image/Heckler & Koch MP5.jpg' },
  { id: 18, name: 'IWI UZI PRO', description: 'Submachine Guns (SMGs)', price: '$2,299', image: '/assets/image/IWI UZI PRO.avif' },
  { id: 19, name: 'KRISS VECTOR SDP G2', description: 'Submachine Guns (SMGs)', price: '$1,320', image: '/assets/image/KRISS VECTOR SDP G2.jpg' },
  { id: 20, name: 'CZ SCORPION EVO 3 S1', description: 'Semi-Auto Versions', price: '$1,150', image: '/assets/image/CZ SCORPION EVO 3 S1.jpg' },
  { id: 21, name: 'CZ SCORPION EVO 3 S2 MICRO', description: 'Submachine Guns (SMGs)', price: '$950', image: '/assets/image/CZ SCORPION EVO 3 S2 MICRO.jpg' },
  { id: 22, name: 'LWRCI SMG', description: 'Submachine Guns (SMGs)', price: '$1,950', image: '/assets/image/LWRCI SMG.jpg' },
  { id: 23, name: 'MAUSER MP40P', description: 'Semi-Auto Versions', price: '$816', image: '/assets/image/MAUSER MP40P.jpg' },
  { id: 24, name: 'KRISS VECTOR GEN II CRB BLACK', description: 'Semi-Auto Versions', price: '$1,351', image: '/assets/image/KRISS VECTOR GEN II CRB BLACK.jpg' },
]);

// Cart functionality
const cartVisible = ref(false);
const productList = ref(null); // Ref for the product list section
const productList2 = ref(null); // Ref for the product list section
const productList3 = ref(null); // Ref for the product list section

// Scroll functions
function scrollToProducts() {
  if (productList.value) {
    productList.value.scrollIntoView({ behavior: 'smooth' });
  }
}
function scrollToProducts2() {
  if (productList2.value) {
    productList2.value.scrollIntoView({ behavior: 'smooth' });
  }
}
function scrollToProducts3() {
  if (productList3.value) {
    productList3.value.scrollIntoView({ behavior: 'smooth' });
  }
}

// Cart functions
function toggleCart() {
  cartVisible.value = !cartVisible.value;
}
// Helper function to parse prices (remove $ and commas, then convert to number)
const parsePrice = (price) => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''));
};
// Helper function to format prices
const formatPrice = (price) => {
  return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
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

function goToDetails(item) {
  router.push({
    name: 'Details',
    query: {
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    },
  });
}

// SMS Message State
const smsMessageVisible = ref(false);
const smsMessage = ref('');

// Show SMS message function
const showSmsMessage = (message) => {
  smsMessage.value = message;
  smsMessageVisible.value = true;

  // Hide the message after 3 seconds
  setTimeout(() => {
    smsMessageVisible.value = false;
  }, 3000);
};

function goToCheckout() {
  if (!loggedInUser.value) {
    showSmsMessage('Please log in to proceed with the checkout.');
    router.push({ name: 'Login' });  // Redirect to login page
    return;
  }

  // If logged in, proceed to checkout
  router.push({
    name: 'Checkout',
    query: {
      cartItems: JSON.stringify(cartItems.value),
    },
  });
}



// Mobile menu functionality
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleMenuClick = (section) => {
  menuOpen.value = false; // Close the menu when a menu item is clicked
  if (section === 'Pistols (Handguns)') {
    scrollToProducts();
  } else if (section === 'Rifles (Assault & Battle Rifles)') {
    scrollToProducts2();
  } else if (section === 'submachine guns (SMGs)') {
    scrollToProducts3();
  }
};

const handleClickOutside = (event) => {
  if (menuOpen.value && !event.target.closest('.md\\:hidden')) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Auth Modal State
const authModalVisible = ref(false);
const isLogin = ref(true);
const authForm = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
});

// Profile State
const loggedInUser = computed(() => store.getters.loggedInUser);
const profileForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const loading = ref(false);

// Show Password State
const showPassword = ref(false);

// Toggle between Login and Sign Up
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};

// Toggle Auth Modal
const toggleAuthModal = () => {
  authModalVisible.value = !authModalVisible.value;
  if (authModalVisible.value && loggedInUser.value) {
    fetchUserProfile(); // Fetch profile data when modal opens
  }
};

// Handle Login/Signup
const handleAuth = async () => {
  loading.value = true;
  const url = isLogin.value ? 'http://localhost:3000/login' : 'http://localhost:3000/register';

  // Frontend validation for signup
  if (!isLogin.value && authForm.value.password !== authForm.value.confirmPassword) {
    showSmsMessage('Passwords do not match!');
    loading.value = false;
    return;
  }

  const requestBody = isLogin.value
    ? { email: authForm.value.email, password: authForm.value.password }
    : {
      email: authForm.value.email,
      password: authForm.value.password,
      name: authForm.value.name
    };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      store.dispatch('login', data.user);
      authForm.value = { email: '', password: '', confirmPassword: '', name: '' };
      authModalVisible.value = false;
      showSmsMessage(isLogin.value ? 'Login successful!' : 'Account created successfully!');
    } else {
      showSmsMessage(data.message || 'An error occurred');
    }
  } catch (error) {
    showSmsMessage('Network error - please try again');
  } finally {
    loading.value = false;
  }
};

// Fetch User Profile
const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  const response = await fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (response.ok) {
    const data = await response.json();
    profileForm.value = { ...data, password: '', confirmPassword: '' };
  } else {
    alert('Failed to fetch user profile');
  }
};

// Update Profile
const updateProfile = async () => {
  if (profileForm.value.password !== profileForm.value.confirmPassword) {
    showSmsMessage('Passwords do not match!');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) return;

  const response = await fetch('http://localhost:3000/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      name: profileForm.value.name,
      email: profileForm.value.email,
      password: profileForm.value.password,
    }),
  });

  if (response.ok) {
    showSmsMessage('Profile updated successfully');
    toggleAuthModal();
  } else {
    showSmsMessage('Failed to update profile');
  }
};

// Logout Function
const logout = () => {
  localStorage.removeItem('token'); // Remove token
  store.dispatch('logout'); // Clear user state in Vuex
  authModalVisible.value = false; // Close the modal
  showSmsMessage('Logout successful'); // Show success message
};

</script>
<style scoped>
/* Custom styles for mobile menu and overall responsive design */
@media (max-width: 640px) {
  .md\:hidden {
    display: block;
  }

  .md\:flex {
    display: none;
  }
}
</style>