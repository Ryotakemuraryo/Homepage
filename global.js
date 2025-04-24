console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// const navLinks = $$("nav a")

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
// );

// if (currentLink) {
//     // or if (currentLink !== undefined)
//     currentLink.classList.add('current');// add current to class so .clss in CSS will be adapted
// }

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server(when location.hostname is local host or 127.0.0.1)
  : "/Lab0/";         // GitHub Pages repo name(otherwise)


let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'https://github.com/Ryotakemuraryo', title: 'GitHub'},
    { url: 'cv.html', title: 'CV'}
    // add the rest of your pages here
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
    if (!url.startsWith('http')) {
        url = BASE_PATH + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }

    if (a.host !== location.host) {
        a.target="_blank";
      }

    nav.append(a);
}


document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select>
            <option value="light dark">Auto</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
          </select>
      </label>`,
);

const select = document.querySelector(".color-scheme select")

if ("colorScheme" in localStorage){
  const saved = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', saved);
  select.value = saved;
}

select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value
});

const form = document.querySelector("form")
form?.addEventListener('submit', function (event){
  event.preventDefault();  
  const data = new FormData(form);
  const params = [];
  for (let [name, value] of data) {
    // TODO build URL parameters here
    params.push(`${name}=${encodeURIComponent(value)}`);
  }
  const mailto = `mailto:rtakemura@ucsd.edu?${params.join("&")}`;
  window.location.href = mailto;
});


export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}


