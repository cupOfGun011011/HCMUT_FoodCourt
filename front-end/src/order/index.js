const serverAPI = "http://localhost:3001";
const axios = require("axios");
const instance = axios.create(({
    headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVjZDIxMDc0YzcyZjA5ZjRhMjMzYzgiLCJpYXQiOjE1OTI1Nzg1NzZ9.nftSOwz7M_nk_3grSCeIBfHX0HZ9CgxYklvw8-YgnAs"}
}))
instance.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
let input = {
    productID: 1,
    ammount: 3,
};

  
let output  ; 
// const test = async ()=>{
//     try {
//         output = await instance.post(`${serverAPI}/order`, input);
//         console.log(output)
//     } catch (error) {
//         console.log(error)
        
//     }
// }

const test = async ()=>{
    try {
        output = await instance.get(`${serverAPI}/orders`);
        console.log(output)
        let total ; 
        let totalPrice = 0;
        let subtotalPrice = '';
        let length = output.data.length;
        console.log('Length nè '+length)
        let i = 0;
        let markup =
        output.data.map(el=>{
          total = parseInt(el.ammount)*parseInt(el.price)
          totalPrice += parseInt(total);
          subtotalPrice += String(total);
          i += 1;
          if (i < length)
          {
              subtotalPrice += " + ";
          }
        let datajpg = "data:image/jpg;base64," + el.image;
          return  `<td class="shoping__cart__item">
          <img
            class="item"
            src=${datajpg}
            alt=""
          />
          <h5>${el.name}</h5>
        </td>
        <td class="shoping__cart__price">
                    ${el.price} VND
                    </td>
                    <td class="shoping__cart__quantity">
                      <div class="quantity">
                            ${el.ammount}
                      </div>
                    </td>
                    <td class="shoping__cart__total">
                    ${total} VND
                  </td>
                  <td class="shoping__cart__item__close">
                    <span class="icon_close"></span>
                  </td>
        </tr>`

        
      })

      document.querySelector(".shopping__body").insertAdjacentHTML("beforeend",markup)
      console.log(totalPrice)
      document.querySelector(".subtotal__price").textContent = subtotalPrice + ' VND' ; 
      document.querySelector(".total__price").textContent = totalPrice + ' VND' ; 
    } catch (error) {
        console.log(error)
        
    }
}



test()
console.log("test")