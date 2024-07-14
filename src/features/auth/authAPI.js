export const createUser = async (userData) => {
    try{
        const response = await fetch("http://localhost:8080/api/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("response: ", response)
    }catch(error){
        console.log("error: ", error)
    }
}