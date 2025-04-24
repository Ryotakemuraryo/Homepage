import { fetchJSON, renderProjects } from '../global.js';

(async () => {
const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const title_element = document.querySelector('.projects-title');
if (title_element && projects) {
    title_element.textContent = `${projects.length} Projects`;
}
})();