export const addHotel = async (token ,data) => {
    console.log("API:- " , token, data)
    try{
        const response = await fetch("http://localhost:8081/hotel-owner/add-hotel", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json",
                "Accept": "applications/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log("response:- ", responseData)
        return responseData
    }catch(error){
        console.error("Error in making alling the addHotel", error)
        return error
    }
}