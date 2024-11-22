export const getAllRooms = async () => {
    try{
        const response = await fetch ("/hotel-owner/getall-room", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }
        })
        const data = response.json();
        console.log("data in the api call", data)
        return data
    }catch(error){
        console.error("Error in fetching rooms", error)
        return error
    }
}