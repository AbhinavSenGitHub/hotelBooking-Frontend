import { setCookie } from "../../common/cookie"
import axios from "axios"
export const createUser = async (userData) => {
    try {
        const response = await fetch("/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const data = await response.json()
        console.log("data: ", data)


        if (data.success) {
            // Create a cookie with the JSON string of the response data  
            const newData = JSON.stringify({
                token: data.token,
                username: data.userData.username,
                email: data.userData.email,
                userType: data.userData.userType
            })
            // const newData = JSON.stringify(data);
            console.log("newData: ", newData)
            // document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;

            // console.log("1. document.cookie: " + document.cookie);
        }
        return data
    } catch (error) {
        console.log("error: ", error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log("data: ", data)
        if (data.success) {
            const newData = JSON.stringify(data)
            console.log("newData for cookies: ", newData)
            // document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;

        }
        return data

    } catch (error) {
        console.log("error: ", error)
    }
}

export const logoutUser = async () => {
    try {
        const response = await fetch("/auth/logout", {
            method: "GET",
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("Failed to log out"); // Handle non-2xx HTTP responses
        }

        const data = await response.json();
        console.log("Response of logout: ", data);

        // Clear the local storage
        localStorage.removeItem("token");

        // Clear the auth cookie
        document.cookie = "authCookies=; path=/; max-age=0";

        return data;
    } catch (error) {
        console.log("error: ", error)
        return error;
    }
}

export const googleAuth = async (userType) => {
    console.log("googleAuth: ", userType);
    try {
        // Redirect the user to your backend's Google OAuth route

        // const response = await axios.get(`http://localhost:8081/auth/google?userType=${userType}`)

        window.location.href = `http://localhost:8081/auth/google?userType=${userType}`;
        // console.log("response of google api : ", response)
        // return response
    } catch (error) {
        console.error("Error during Google authentication:", error);
        throw error; // Handle error if necessary
    }
};

export const verification = async (userData) => {
    try {
        const response = await fetch("/verify-otp", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log("error: ", error)
        return error
    }
}

export const resendOTP = async (userData) => {
    try {
        const response = await fetch("/resend-otp", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log("error: ", error)
        return error
    }
}