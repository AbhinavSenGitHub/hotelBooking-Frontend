import { setCookie } from "../../common/cookie"

export const createUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:8081/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const data = await response.json()
        console.log("data: ", data)

        const newData = JSON.stringify({
            token: data.token,
            username: data.userData.username,
            email: data.userData.email,
            userType: data.userData.userType
        })
        if (data.success) {
            // Create a cookie with the JSON string of the response data  
            document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;
            alert("Signup successful")
        } else {
            alert("email or username already exists")
        }
        console.log("data: ", data)
        return data
    } catch (error) {
        console.log("error: ", error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:8081/auth/login", {
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
            document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;
            alert("Login successful")
        } else {
            alert("email or password in valid")
        }
        return data

    } catch (error) {
        console.log("error: ", error)
    }
}