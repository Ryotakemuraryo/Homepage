import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

(async () => {
const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const title_element = document.querySelector('.projects-title');
if (title_element && projects) {
    title_element.textContent = `${projects.length} Projects`;
}
})();

let arc = d3.arc().innerRadius(0).outerRadius(50)({
    startAngle: 0,
    endAngle: 2 * Math.PI,
  });


let data = [1, 2];
let total = 0;

for (let d of data) {
  total += d;
}

let angle = 0;
let arcData = [];

for (let d of data) {
  let endAngle = angle + (d / total) * 2 * Math.PI;
  arcData.push({ startAngle: angle, endAngle });
  angle = endAngle;
}
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let arcs = arcData.map((d) => arcGenerator(d));
let colors = ['gold', 'purple'];
arcs.forEach((arc, idx) => {
    // TODO, fill in step for appending path to svg using D3
    d3.select('svg').append('path').attr('d', arc).attr('fill', colors[idx])
  });