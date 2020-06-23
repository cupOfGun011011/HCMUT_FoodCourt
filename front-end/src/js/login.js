import { element, serverAPI } from "./base";
import axios from "axios";
import User from "./models/User";

const state = {
  type: "login",
};

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
    user.setUser(userInfo.data.user, userInfo.data.token);
    user.saveStorage();
    window.location.href = `${serverAPI}/`;
  } catch (error) {
    element.serverMessage.textContent =
      "Wrong email or password, please try again";
  }
};

const controlRegister = async () => {
  const user = new User();
  let email = element.emailInput.value;
  let password = element.passwordInput.value;
  let name = document.querySelector(".input_name").value;
  const crediential = {
    email,
    password,
    name,
  };
  try {
    const userInfo = await axios.post(`${serverAPI}/user`, crediential);
    user.setUser(userInfo.data.user, userInfo.data.token);
    user.saveStorage();
    window.location.href = `${serverAPI}`;
  } catch (error) {
    element.serverMessage.textContent =
      "Email has already existed or password is too weak";
  }
};

const renderRegister = () => {
  const nameMarkup = ` <div
  class="wrap-input100 validate-input"
  data-validate="Valid user name is required"
>
  <input
    class="input100 input_name "
    type="text"
    name="name"
    placeholder="User Name"
  />
  <span class="focus-input100"></span>
  <span class="symbol-input100">
    <i class="fa " aria-hidden="true"></i>
  </span>
</div>`;

  // Add name input
  element.loginWrapper.insertAdjacentHTML("afterbegin", nameMarkup);

  // Change class name to register
  element.loginFormTitle.textContent = "Register to become member";
  element.loginFormButton.textContent = "Register";
  element.toggleRegisterLoginButton.textContent = "Switch to login";
  element.serverMessage.textContent = "";
};

const renderLogin = () => {
  // Remove name input
  const nameInput = document.querySelector(".input_name").parentNode;
  nameInput.parentNode.removeChild(nameInput);

  // Change message
  element.loginFormTitle.textContent = "Member Login";
  element.loginFormButton.textContent = "Login";
  element.toggleRegisterLoginButton.textContent = "Create your account";
  element.serverMessage.textContent = "";
};

const setupEventListener = async () => {
  // Click to submit login form or submit register form
  element.loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (state.type === "register") {
      await controlRegister();
    } else {
      await controlLogin();
    }
  });

  // Toggle between login and register
  element.toggleRegisterLoginButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (state.type === "register") {
      renderLogin();
      state.type = "login";
    } else {
      renderRegister();
      state.type = "register";
    }
  });
};

setupEventListener();

console.log("TEST");
console.log("TEST");
