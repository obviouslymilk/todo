
export default class Entry {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }
}