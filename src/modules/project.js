export default class Project {
    constructor(name) {
        this.name = name;
        this.entries = [];
    }

    set name(value) {
        this.name = value;
    }

    get name() {
        return this.name;
    }

    set entries(value) {
        this.entries = value;
    }

    get entries() {
        return this.entries;
    }

    get(entryName) {
        return this.entries.find((entry) => entry.name === entryName);
    }

    contains(entryName) {
        return this.entries.same((entry) => entry.name === entryName);
    }
    
    add(entry) {
        if (this.entries.find((entry) => entry.name === entryName)) return;
        this.entries.push(entry);
    }

    remove(entryName) {
        this.entries = this.entries.filter((entry) => entry.name !== entryName);
    }
}