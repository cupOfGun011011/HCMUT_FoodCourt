export const element = {
  loginForm: document.querySelector(".login100_form"),
  passwordInput: document.querySelector(".input_password"),
  emailInput: document.querySelector(".input_email"),
  nameInput: document.querySelector(".input_name"),
  loginWrapper: document.querySelector(".login_wrapper"),
  serverMessage: document.querySelector(".server_message"),
  toggleRegisterLoginButton: document.querySelector(".register_button"),
  loginFormTitle: document.querySelector(".login100-form-title"),
  loginFormButton: document.querySelector(".login100-form-btn"),
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".search"),
  searchResultList: document.querySelector(".results__list"),
  searchResult: document.querySelector(".results"),
  searchButton: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  like: document.querySelector(".likes__field"),
};

export const serverAPI = "http://localhost:3000";

export const elementStrings = {
  searchResults: "results",
  loader: "loader",
};

export const renderLoader = (parent) => {
  const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = (loader) => {
  const loaderList = document.querySelector("." + loader);
  if (loaderList) {
    loaderList.parentElement.removeChild(loaderList);
  }
};

export const newTitle = (title, limit = 17) => {
  const newTitle = [];
  const titleArr = title.split(" ");
  let lenghtNow = 0;
  let acc = 0;
  if (title.length > limit) {
    titleArr.reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return newTitle.join(" ") + " ...";
  }
  return title;
};

export const key = "d674d948fb646face4baf147e5ee5988";
