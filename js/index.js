'use strict';

import Project from './modules/project.js';
import ProjectList from './modules/projectList.js';
import projectsData from '../data/projects.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const projects = projectsData.map((projectData) => new Project(projectData));
    const projectList = new ProjectList(projects);

    projectList.render(container);
});