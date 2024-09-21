export const createRoom = async (token, data) => {
    try{
        console.log("api:- ", token, data)
        const response = await fetch("http://localhost:8081/hotel-owner/create-room", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log("responseDate:- ", responseData)
        return responseData
    }catch(error) {
        console.error("Error in making the create room request", error)
        return error
    }
}