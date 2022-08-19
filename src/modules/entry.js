export default class Entry {
    constructor(name, date) {
        this._name = name;
        this._date = date;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}