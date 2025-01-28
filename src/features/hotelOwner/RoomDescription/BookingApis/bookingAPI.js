// export const createBooking= async (token, data) => {
//     try{
//         console.log(data, token);
//         const response = await fetch('/customer/booking', {
//             method: 'POST',
//             headers: {
//                 "authorization": "Bearer " + token,
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })

//         const bookingRes = await response.json()

//         return bookingRes
//     }catch(error){
//         console.log("error in making the booking request ", error)
//         return error
//     }
// }

export const createBooking = async (token, data) => {
    try {
        console.log(data, token);
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                "authorization": "Bearer " + token,
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const session = await response.json();

        if (session.url) {
            localStorage.setItem('bookingData', JSON.stringify(session.bookingData)); // Save booking data to localStorage
            window.location.href = session.url; // Redirect to Stripe Checkout
        }
    } catch (error) {
        console.log("error in making the booking request ", error)
        return error
    }
}

// export const finalizeBooking = async () => {
//     try {
//       const response = await fetch("/finalize-booking", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId }),
//       });

//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error("Error finalizing booking:", error);
//     }
//   };

