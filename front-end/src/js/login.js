import { element, serverAPI } from "./base";
import axios from "axios";
import User from "./models/User";

const controlLogin = async () => {
  const user = new User();
  let email = element.emailInput.value;
  let password = element.passwordInput.value;
  const crediential = {
    email,
    password,
  };
  try {
    const userInfo = await axios.post(`${serverAPI}/user/login`, crediential);
    console.log(userInfo);
    user.setUser(userInfo.data.user, userInfo.data.token);
    user.saveStorage();
    window.location.href = `${serverAPI}/home-page`;
  } catch (error) {
    element.serverMessage.textContent =
      "Wrong email or password, please try again";
  }
};

const controlRegister = async () => {
  const nameMarkup = ` <div
  class="wrap-input100 validate-input"
  data-validate="Valid user name is required"
>
  <input
    class="input100 "
    type="text"
    name="name"
    placeholder="User Name"
  />
  <span class="focus-input100"></span>
  <span class="symbol-input100">
    <i class="fa " aria-hidden="true"></i>
  </span>
</div>`;
  element.loginWrapper.insertAdjacentHTML("afterbegin", nameMarkup);
};

//TODO: Add toggle event between login and register

const setupEventListener = () => {
  element.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlLogin();
  });
  element.registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    controlRegister();
  });
};

setupEventListener();

console.log("TEST");
console.log("TEST");
