import axios from "axios";

const URL = 'https://endless-elysium-317008-default-rtdb.asia-southeast1.firebasedatabase.app/'
export  function storeCartToDb (cartData) {
axios.post(`${URL}cart.json`,
cartData

)
}

export async function getCartToDb (id) {
   const response = await  axios.get(`${URL}cart/${id}.json`)
  
   console.log(response.data)    
    return response.data
  
    }

   export   function  updateExistingCArt (customerId, cartData) {
     return      axios.put(URL + `cart/${customerId}.json`,
     cartData
        )
   }

   export   function  CLearStoredCart (customerId) {

    return      axios.delete(URL + `cart/${customerId}.json`
       )
  }