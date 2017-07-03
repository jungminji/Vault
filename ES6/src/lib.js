export class $ {

    constructor(arg) {

    }

    static type(data) {
        return toString.call(data).slice(8, -1).toLowerCase();
    }
    static isType(data, typeString) {
        if(this.type(typeString) !== 'string') {
            throw "Second parameter: string type";
        }
        return this.type(data) === typeString;
    }

    

}