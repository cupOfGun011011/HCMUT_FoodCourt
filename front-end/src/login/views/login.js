export const renderLogin = () => {
  // Remove name input
  const nameInput = document.querySelector(".input_name").parentNode;
  nameInput.parentNode.removeChild(nameInput);

  // Change message
  element.loginFormTitle.textContent = "Member Login";
  element.loginFormButton.textContent = "Login";
  element.toggleRegisterLoginButton.textContent = "Create your account";
  element.serverMessage.textContent = "";
};
