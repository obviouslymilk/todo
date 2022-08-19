import Events from './events';
import Entry from './entry';
export default class Project {
    constructor(name) {
        this._name = name;
        this.entries = [];
        Events.on('inputNewEntry', (name, projectName) => {
            if(projectName !== this.name) return;
            this.add(new Entry(name))
        });
        Events.on('tryRemoveEntry', (name) => this.remove(name))
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
        if (this.contains(entry.name)) return;
        this.entries.push(entry);
        Events.emit('entryCreated', entry);
    }

    remove(entryName) {
        console.log('so what');
        this.entries = this.entries.filter((entry) => entry.name !== entryName);
        Events.emit('entryRemoved', entryName);
    }
}