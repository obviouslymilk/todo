import { format, parseISO, toDate } from 'date-fns';
import Events from './events';
export default class Entry {
    constructor(name, date, comp) {
        this._name = name;
        this._date = date;
        this._comp = comp;

        Events.on('updateEntry', (name, date, complete) => {
            if (this.name !== name) return;
            this._date = new Date(date);
            console.log(this._date);
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

    getDateString() {
        return format(this._date, 'yyyy-MM-dd');
    }
}