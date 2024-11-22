export const getOwnerHotels = async(token) => {
    try{

        const ownerHotel = await fetch("/hotel-owner/get-ownerhotel", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        const data = await ownerHotel.json();
        console.log("here is the owner hotel", data)
        return data

        
    }catch(error) {
        console.error("Failed to fetch get-owner-hotel", error)
        return error
    }
}

export const getRoomsByHotel = async(token, id) => {
    try{
        const response = await fetch("/hotel-owner/gethotel-by_id/"+id, {
            method : "GET",
            headers: { 
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        const data = await response.json();
        console.log("get rooms", data.data)
        return data.data
    }
    catch (error) {
        console.error("Failed to fetch getRoomsByHotel ", error)
        return error
    }
}