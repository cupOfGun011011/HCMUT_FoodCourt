const serverAPI = "http://localhost:3001/";
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
    ammount: 1,
};
const test = async ()=>{
     try {
          output = await instance.get('${serverAPI}/products');
          console.log(output);
          let markup = 
          output.data.map(el=>{

          let datajpg = "data:image/jpg;base64," + el.image;
          return  "<td class="featured__item__pic set-bg">
          //Hien thi image
          <img
             class = "item"
             src = ${datajpg}
             alt = ""
          />
          //
          <h5>${el.name}</h5>
                    </td>
          <td class="shoping__cart__price">
                               <div class="col-lg-3 col-md-4 col-sm-6 mix Food">
            <div class="featured__item">
              <div
                class="featured__item__pic set-bg"
                data-setbg="img/featured/feature-1.jpg"
              >
                <ul class="featured__item__pic__hover">
                  <li>
                    <a href="#"><i class="fa fa-shopping-cart"></i></a>
                  </li>
                </ul>
              </div> -->
              <!-- <div class="featured__item__text">
                <h6><a href="#">Bánh mì</a></h6>
                <h5>15000 VNĐ</h5>
              </div>
            </div>
          </div>"
          })
       document.querySelector(".shopping__body").insertAdjacentHTML("beforeend",markup)
     } catch (error) {
         console.log(error)
 
     }
 }
 
 
 
 test()
 console.log("test")