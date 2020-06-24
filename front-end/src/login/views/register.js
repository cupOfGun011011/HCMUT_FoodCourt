export const renderRegister = () => {
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
