export default class Project {
    constructor(name) {
        this._name = name;
        this.entries = [];
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    setEntries(value) {
        this.entries = value;
    }

    getEntries() {
        return this.entries;
    }

    get(entryName) {
        return this.entries.find((entry) => entry.name === entryName);
    }

    contains(entryName) {
        return this.entries.some((entry) => entry.name === entryName);
    }
    
    add(entry) {
        if (this.entries.find((entry) => entry.name === entryName)) return;
        this.entries.push(entry);
    }

    remove(entryName) {
        this.entries = this.entries.filter((entry) => entry.name !== entryName);
    }
}