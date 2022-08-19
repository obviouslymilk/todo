import Events from './events';
export default class Entry {
    constructor(name, date, comp) {
        this._name = name;
        this._date = date;
        this._comp = comp;

        Events.on('updateEntry', (name, date, complete) => {
            console.log(complete);
            if (this.name !== name) return;
            this.date = date;
            this.complete = complete;
        })
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

    get complete() {
        return this._comp;
    }

    set complete(value) {
        this._comp = value;
    }
}