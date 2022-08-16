import Project from './project';
import Entry from './entry';

export default class App {
    constructor() {
        this.projects = [];
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
        if (this.projects.find((project) => project.name === entryName)) return;
        this.projects.push(project);
    }

    remove(projectName) {
        this.projects = this.projects.filter((project) => project.name !== projectName);
    }
}