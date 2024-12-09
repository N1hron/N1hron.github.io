'use strict';

import Project from './modules/project.js';
import ProjectList from './modules/projectList.js';
import projectsData from '../data/projects.js';

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const projects = projectsData.map((projectData) => new Project(projectData));
    const projectList = new ProjectList(projects);

    projectList.render(main);

    // function changeLanguage(lang) {
    //     document.documentElement.lang = lang;
    //     projects.forEach(project => project.changeLanguage(lang))
    // }
});

