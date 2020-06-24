import { element, serverAPI } from "./base";
import axios from "axios";
import User from "./models/User";
import * as loginView from "./views/login";
import * as registerView from "./views/register";
const state = {
  type: "login",
};

const controlLogin = async () => {
  // tạo 1 class model user
  const user = new User();
  // lấy value từ cái form login
  let email = document.querySelector(".input_email").value;
  let password = document.querySelector(".input_password").value;
  // format lại để gửi cho server
  const crediential = {
    email,
    password,
  };
  try {
    // lệnh này là gửi server với dạng post( tức là có input data. còn dạng get là k có input)
    // gửi vào API mà backend cung cấp để nhận được userInfo
    const userInfo = await axios.post(`${serverAPI}/user/login`, crediential);
    // Lưu vào cái instance của class User
    user.setUser(userInfo.data.user, userInfo.data.token);
    // Save vào localStorage
    user.saveStorage();
    // Chuyển về home page
    window.location.href = `${serverAPI}/`;
  } catch (error) {
    // Nếu server có lỗi(user nhập sai password hay gì) thì sẽ thay đổi dòng text để thông báo user
    element.serverMessage.textContent =
      "Wrong email or password, please try again";
  }
};

// control register này cũng tương tự login
const controlRegister = async () => {
  const user = new User();
  let email = document.querySelector(".input_email").value;
  let password = document.querySelector(".input_password").value;
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

const setupEventListener = async () => {
  // mỗi lần submit ( tức là click và nút login) thì nó s4 chạy code này
  element.loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (state.type === "register") {
      await controlRegister();
    } else {
      await controlLogin();
    }
  });

  // Mỗi lần bấm nút chuyển sang login hay regsiter, nó sẽ chạy code này
  element.toggleRegisterLoginButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (state.type === "register") {
      loginView.renderLogin();
      state.type = "login";
    } else {
      registerView.renderRegister();
      state.type = "register";
    }
  });
};

setupEventListener();
