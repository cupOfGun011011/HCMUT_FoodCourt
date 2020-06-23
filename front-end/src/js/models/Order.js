export default class Order {
  constructor() {
    this.orderItems = [];
  }
  /* 
        
    */

  saveItem(id, img, title, ammount) {
    const item = {
      id,
      img,
      title,
      ammount,
    };
    this.orderItems.push(item);

    // Save storage
    this.saveStorage();
  }

  removeItem(_id) {
    const index = this.orderItems.findIndex((el) => el.id === _id);
    if (index !== -1) {
      this.orderItems.splice(index, 1);
    }

    // Save storage
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem("order", JSON.stringify(this.orderItems));
  }

  getStorage() {
    return JSON.parse(localStorage.getItem("order"));
  }
}
