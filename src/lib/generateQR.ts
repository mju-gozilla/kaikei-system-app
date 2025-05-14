import axios from "axios";
const url = import.meta.env.VITE_GAS_PAYMENT_API_URL;
const generateQR = () => {
    const createPayment = async (name: string, price: string) => {
        const data = axios.post(url, new URLSearchParams({
            name,
            price,
        }).toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            console.log(res.data);
            if (res.data.status === "success") {
                return res.data.received.paymentLink;
            } else {
                throw new Error("Failed to create payment link");
            }
        }).catch((error) => {
            console.error("Error creating payment link:", error);
            throw error;
        });
        return data;
    }

    return {
        createPayment,
    }
}

export default generateQR;