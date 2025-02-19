<template>
    <div class="flex flex-col min-h-screen">
        <div class="flex-grow"></div>
        <div class="flex flex-col items-center justify-center h-screen">
            <img src="/assets/image/loading.gif" alt="Success" class="w-60 h-60 mb-4" />
            <h1 class="text-6xl font-bold text-green-600">Payment Successful!</h1>
            <p class="text-black text-center mt-4">
                Your order will arrive in 2 days. We will contact you via email.
            </p>
            <button @click="goHome" class="mt-6 bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-500">
                Back To Home
            </button>
            <button @click="generatePDF" class="mt-3 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                Download Invoice
            </button>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const router = useRouter();
const orderDetails = ref(null);

onMounted(() => {
    const storedOrder = localStorage.getItem('orderDetails');
    if (storedOrder) {
        orderDetails.value = JSON.parse(storedOrder);
    }
});

const goHome = () => {
    router.push('/');
};

// Utility function to parse price from a string (e.g., "$50" -> 50)
const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const parsedPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
        return isNaN(parsedPrice) ? NaN : parsedPrice;
    }
    return NaN;
};



const generatePDF = () => {
    if (!orderDetails.value) {
        alert("No order details found!");
        return;
    }

    const doc = new jsPDF();

    // Add invoice header
    doc.setFontSize(22);
    doc.text("Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${orderDetails.value.date}`, 14, 30);

    // Customer details
    doc.text(`Name: ${orderDetails.value.name}`, 14, 40);
    doc.text(`Email: ${orderDetails.value.email}`, 14, 50);
    doc.text(`Address: ${orderDetails.value.address}`, 14, 60);

    // Prepare items table data
    const tableData = orderDetails.value.items.map((item, index) => {
        const unitPrice = parsePrice(item.price);
        const quantity = parseInt(item.quantity, 10);

        let unitPriceStr = 'N/A';
        let totalPrice = 'N/A';

        if (!isNaN(unitPrice) && !isNaN(quantity)) {
            totalPrice = (unitPrice * quantity).toFixed(2);
            unitPriceStr = `$${unitPrice.toFixed(2)}`;
        }

        return [
            index + 1,
            item.name,
            quantity,
            unitPriceStr,
            totalPrice
        ];
    });

    // Table for items
    autoTable(doc, {
        startY: 70,
        head: [['#', 'Item', 'Qty', 'Unit Price', 'Total']],
        body: tableData,
    });

    // Calculate subtotal (sum of all item prices)
    const subtotal = orderDetails.value.items.reduce((sum, item) => {
        const unitPrice = parsePrice(item.price);
        const quantity = parseInt(item.quantity, 10);
        if (!isNaN(unitPrice) && !isNaN(quantity)) {
            sum += unitPrice * quantity;
        }
        return sum;
    }, 0);

    const shippingPrice = parsePrice(orderDetails.value.shippingPrice || 7.99);
    const packageProtection = parsePrice(orderDetails.value.packageProtection || 9.99);
    const taxAmount = parsePrice(orderDetails.value.tax || (subtotal * 0.08));  // Assuming 8% tax

    // Ensure subtotal is valid before continuing
    if (isNaN(subtotal)) {
        alert("Invalid subtotal!");
        return;
    }

    // Display shipping price, package protection, and tax
    const additionalChargesY = doc.lastAutoTable.finalY + 10;
    doc.text(`Shipping: $${shippingPrice.toFixed(2)}`, 14, additionalChargesY);
    doc.text(`Package Protection: $${packageProtection.toFixed(2)}`, 14, additionalChargesY + 10);
    doc.text(`Tax: $${taxAmount.toFixed(2)}`, 14, additionalChargesY + 20);

    // Calculate final total including shipping, package protection, and tax
    const finalTotal = (subtotal + shippingPrice + packageProtection + taxAmount).toFixed(2);

    // Final total amount
    doc.text(`Total: $${finalTotal}`, 14, additionalChargesY + 40);

    // Save PDF with dynamic filename
    doc.save(`invoice_${orderDetails.value.name}.pdf`);
};


</script>
