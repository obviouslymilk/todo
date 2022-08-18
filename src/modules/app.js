import Project from './project';
import Entry from './entry';
import Events from './events';

export default class App {
    constructor() {
        this.projects = [];
        Events.on('inputNewProject', (name) => {this.add(new Project(name))});
        Events.on('tryRemoveProject', (name) => this.remove(name))
    }

    getProjects() {
        return this.projects;
    }

    setProjects(projects) {
        this.projects = projects;
    }

    get(projectName) {
        return this.projects.find((project) => project.name === projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.name === projectName);
    }
    
    add(project) {
        if (this.contains(project.name)) return alert('Name of a project has to be unique.');
        this.projects.push(project);
        Events.emit('projectCreated', project)
    }

    remove(projectName) {
        this.projects = this.projects.filter((project) => project.name !== projectName);
        Events.emit('projectRemoved', projectName)
    }
}