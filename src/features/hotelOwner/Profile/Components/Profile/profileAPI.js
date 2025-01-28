export const getOwnerHotels = async(token, query) => {
    try{

        console.log("query in the api", query);
        const url = new URL("/search-owner-hotel", window.location.origin);
        url.searchParams.append("query", query);
        const ownerHotel = await fetch(url, {
            params: { query: query},
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

export const searchRoomByHotelId = async (token, hotelId, data) => {
    console.log("data call", token, data, hotelId)
    try{
        console.log("data call", token, data, hotelId)
        const response = await fetch(`/search-room-byhotel/?hotelId=${hotelId}&selectedField=${data.searchField}&selectedValue=${data.selectedValue}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })


        const datas = await response.json()
        console.log("data in API:", datas)
        return datas
    }catch(error){
        console.log("Error in searching rooms", error)
        return error
    }
}

export const getCustomerBookings = async(token) => {
    try{
        const ownerHotel = await fetch('/customer/booking/', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        const data = await ownerHotel.json();
        console.log("here is the bookings:- ", data)
        return data

        
    }catch(error) {
        console.error("Failed to fetch get-owner-hotel", error)
        return error
    }
}