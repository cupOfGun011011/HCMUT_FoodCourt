const serverAPI = "http://localhost:3001";
const axios = require("axios");
const instance = axios.create(({
    headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVjZDIxMDc0YzcyZjA5ZjRhMjMzYzgiLCJpYXQiOjE1OTI1Nzg1NzZ9.nftSOwz7M_nk_3grSCeIBfHX0HZ9CgxYklvw8-YgnAs"}
}))
instance.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
let output; 
const test = async ()=>{
     try {
          output = await instance.get(`${serverAPI}/products`);
          console.log(output);
          let markup = 
          output.data.map(el=>{
          let datajpg = "data:image/jpg;base64," + el.image;
          return `<div
            class="featured__item__pic set-bg"
            data-setbg=<img
            src=${datajpg}
            >
        >
          <ul class="featured__item__pic__hover">
            <li>
              <a href="#"><i class="fa fa-shopping-cart"></i></a>
            </li>
          </ul>
        </div>
        <div class="featured__item__text">
          <h6><a href="#">${el.name}</a></h6>
          <h5>${el.price} VNĐ</h5>
        </div>`
          })

       document.querySelector(".featured__controls").insertAdjacentHTML("beforeend",markup)
     } 
     catch (error) 
     {
         console.log(error)
 
     }
}
 
test()
console.log("test")