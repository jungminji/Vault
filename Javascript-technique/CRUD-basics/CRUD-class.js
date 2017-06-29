class Bottle {

  constructor(data) {
    this.state = [];
  }

  // Setter and Getter won't be accessed from console(which means outside of class)
  // Read

  // Update
  set update(data) {
    Array.isArray(data) ? this.state = data : false;
  }
  get read() {
    return this.state;
  }

  // Create
  insert(...rest,a) {
    console.log("insert");
  }

  // Delete
  remove(index) {
    console.log("remove");
  }

}
