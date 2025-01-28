import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const bookingData = JSON.parse(localStorage.getItem("bookingData")); // Retrieve booking data from localStorage

    console.log("session_id", sessionId);
    console.log("bookingData", bookingData);
    useEffect(() => {
        const finalizeBooking = async () => {
            try {
                const response = await fetch("/finalize-booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId, bookingData }),
                });

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error("Error finalizing booking:", error);
            }
        };

        if (sessionId) {
            finalizeBooking();
        }
    }, [sessionId]);

    return <h1>Thank you for your booking! Payment successful.</h1>;
};

export default SuccessPage;
