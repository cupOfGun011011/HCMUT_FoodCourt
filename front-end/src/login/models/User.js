export default class User {
  constructor() {
    this.user = null;
  }
  setUser(userInfo, token) {
    this.user = {
      userInfo,
      token,
    };
  }

  saveStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  getStorage() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
