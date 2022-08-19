import Project from "./project";
import Events from './events';
// ВВОД TODO зависим от ввода проектов????
export default class Display {
    static projectsContainer = document.querySelector('#custom-projects');
    static entriesContainer = document.querySelector('.entries');
    static addProjectInput = document.querySelector('#project-textbox');
    static addEntryInput = document.querySelector('#entry-textbox');
    static title = document.querySelector('#display-title');


    static init() {  
          Display.updateProjectButtons();
          Display.updateEntryButtons();
          Display.updateInput();
          Display.updateEvents();
    }

    
    static addProject(project) {
        const p = `
        <div class="project" data-name='${project.name}'>
            <span class="material-symbols-rounded project-icon">list</span>
            <p class='project-button'>${project.name}</p> <span class="material-symbols-rounded delete-icon">delete</span>
        </div>
        `
        Display.projectsContainer.insertAdjacentHTML("beforeend", p);
        Display.updateProjectButtons();
    }


    static addEntry(entry) {
        if (!Display.entriesContainer.id) return;
        const e = `
        <div class="entry" data-name='${entry.name}'>
                <input class='entry-check' type="checkbox" name="complete">
                <div class="info">
                    <h3>${entry.name}</h3>
                    <input class='date-input' type="date" name="entry-date">
                </div>
                <span class="material-symbols-rounded delete-icon">delete</span>
        </div> 
        `
        Display.entriesContainer.insertAdjacentHTML("beforeend", e);
        Display.updateEntryButtons();
    }


    static removeProject(name) {
        const p = document.querySelector(`.project[data-name="${name}"]`);
        if (p) {
            p.remove();
            console.log(`Project ${name} was removed.`);
        }
        if (name === Display.entriesContainer.id) {
            Display.clearEntries();
            Display.entriesContainer.removeAttribute('id');
            Display.title.textContent = '';
        }
    }


    static removeEntry(name) {
        const e = document.querySelector(`.entry[data-name="${name}"]`);
        if (e) {
            e.remove();
        }    
    }
 

    static clearEntries() {
        Display.entriesContainer.replaceChildren();
    }


    static updateProject(project) {
        Display.clearEntries();
        project.getEntries().forEach(e => {
            Display.addEntry(e);
        });
        Display.entriesContainer.id = project.name;
        Display.title.textContent = project.name;
    }

    
    static updateProjectButtons() {
        Display.deleteButtons = document.querySelectorAll('.project > .delete-icon');
        Display.projectsButtons = document.querySelectorAll('.project > .project-button');

        Display.deleteButtons.forEach(btn => {
            btn.addEventListener('click', e => Events.emit('tryRemoveProject', e.target.parentElement.dataset.name));
        });

        Display.projectsButtons.forEach(btn => {
            btn.addEventListener('click', e => Events.emit('tryUpdateProject', e.target.parentElement.dataset.name));
        });
    }


    static updateEntryButtons() {
        const entryDeleteButtons = document.querySelectorAll('.entry > .delete-icon');

        entryDeleteButtons.forEach(btn => {
            btn.addEventListener('click', e => Events.emit('tryRemoveEntry', e.target.parentElement.dataset.name));
        })
    }    


    static updateInput() {
        Display.addProjectInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                const some = document.querySelector(`.project[data-name="${e.target.value}"]`);
                if (some) {return alert('Name of a project has to be unique.')};

                Events.emit('inputNewProject', e.target.value);
            }
        })

        Display.addEntryInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                if (!Display.entriesContainer.id) return alert('You have to select project.');
                const some = document.querySelector(`.entry[data-name="${e.target.value}"]`);
                if (some) {return alert('Name of an entry has to be unique.')};

                Events.emit('inputNewEntry', e.target.value, Display.entriesContainer.id);
            }
        })
    }

    
    static updateEvents() {
        Events.on('projectCreated', (project) => {Display.addProject(project)});
        Events.on('entryCreated', (entry) => {Display.addEntry(entry)});
        Events.on('projectRemoved', (name) => Display.removeProject(name));
        Events.on('entryRemoved', (name) => Display.removeEntry(name));
        Events.on('updateProject', (project) => Display.updateProject(project))
    }
}
