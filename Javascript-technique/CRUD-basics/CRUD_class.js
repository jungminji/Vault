class Model {
  constructor(options) {
    this.state = [];
    this.config = {
      required: false,
      default: [],
      types: 'anyr'
    };
    this.init(options);
  }

  static mixin(...args) {

  }

  init(options) {
    if (options) {
      if (options instanceof Array) {
        this.state = options;
      } else if (options instanceof Object) {

      } else {

      }
    }
  }

  // Create
  create(data) {
    if(this.config.types !== 'any'){

    }
  }
  // Read
  get() {}
  // Update
  update() {}
  // Delete
  remove() {}

}



const M = new Model([1, 2, 3]);
let un = {
  a: 3,
  eu: "123"
};
let deux = {
  a: 7,
  g: 10
};
let trios = 10;
const result = Model.mixin(un, deux, trios);
