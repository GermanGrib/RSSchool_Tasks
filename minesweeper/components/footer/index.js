import './footer.scss';
import { createElement } from '../reusableFunctions';
import { toggleScoreTable } from '../modal';

const FOOTER = createElement('footer', 'footer');
const FOOTER_CONTAINER = createElement('div', [
  'container',
  'footer__container',
]);
const LOGO = createElement('a', 'footer__logo');
LOGO.href = 'https://rs.school/';
LOGO.target = '_blank';
const DARK_MODE = createElement('div', ['footer__mode', 'is-sun']);
const GAME_SCORE = createElement('div', 'footer__score');

LOGO.innerHTML = `
<svg class="footer__logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.85 198.67">
<title>rs_school</title>
<g data-name="Layer 2"><g data-name="Layer 1">
<path class="footer__logo-svg--partone" fill="currentColor" d="M275.36 61.37l26.29-1.65q.86 6.41 3.48 9.76 4.28 5.43 12.2 5.43 5.91 0 9.12-2.77a8.34 8.34 0 0 0 3.2-6.44 8.18 8.18 0 0 0-3-6.22q-3-2.74-14.15-5.19-18.18-4.08-25.93-10.86a21.84 21.84 0 0 1-7.81-17.26 23.44 23.44 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26.05 1.52q-1-6-4.36-8.78t-9.2-2.77c-3.21 0-5.63.69-7.25 2.05a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.84q1.95 1.77 9.27 3.3 18.12 3.9 26 7.9t11.4 9.91a25.12 25.12 0 0 1 3.57 13.24 28.37 28.37 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78t-10-22.35zM6.27 91V1.53h46.06q12.81 0 19.58 2.19a20.93 20.93 0 0 1 10.92 8.14A24.75 24.75 0 0 1 87 26.35a24.8 24.8 0 0 1-3.2 12.84A24.91 24.91 0 0 1 75.07 48a33.63 33.63 0 0 1-9.7 3.54 27.79 27.79 0 0 1 7.19 3.29A27.79 27.79 0 0 1 77 59.49 35.16 35.16 0 0 1 80.85 65l13.38 26H63L48.24 63.63q-2.81-5.31-5-6.9a11.63 11.63 0 0 0-6.78-2.07H34V91zM34 37.76h11.68A41 41 0 0 0 53 36.54a7.3 7.3 0 0 0 4.48-2.81 8.24 8.24 0 0 0 1.74-5.18 8.23 8.23 0 0 0-2.75-6.65q-2.74-2.32-10.31-2.32H34zM0 167.56l26.29-1.64q.86 6.41 3.48 9.76Q34 181.11 42 181.11q5.91 0 9.12-2.78a8.34 8.34 0 0 0 3.2-6.44 8.2 8.2 0 0 0-3-6.22q-3-2.74-14.15-5.18-18.18-4.1-25.93-10.86a21.87 21.87 0 0 1-7.81-17.27 23.49 23.49 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26 1.53q-1-6-4.36-8.79t-9.19-2.74q-4.81 0-7.25 2a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.85q1.95 1.77 9.27 3.29 18.12 3.9 26 7.9t11.4 9.91a25.15 25.15 0 0 1 3.57 13.24 28.35 28.35 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78T0 167.56zm163-7.01l24.22 7.32a44.72 44.72 0 0 1-7.69 17 33.46 33.46 0 0 1-13 10.31q-7.78 3.47-19.8 3.47-14.58 0-23.82-4.23t-16-14.91q-6.72-10.67-6.71-27.31 0-22.18 11.8-34.11t33.4-11.92q16.91 0 26.57 6.84t14.36 21l-24.4 5.43a21 21 0 0 0-2.68-6 16 16 0 0 0-5.67-4.88 16.31 16.31 0 0 0-7.51-1.71q-9.39 0-14.39 7.56-3.8 5.61-3.79 17.61 0 14.86 4.52 20.38t12.69 5.51q7.92 0 12-4.45t5.9-12.91zm45.51-52.83h27.63V139h30.2v-31.28h27.75v89.43h-27.75V161h-30.2v36.18h-27.63zm102.78 44.77q0-21.88 12.2-34.1t34-12.2q22.32 0 34.4 12T404 151.76q0 15.69-5.28 25.72a37.54 37.54 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.12 0-25-4.82a37.59 37.59 0 0 1-16.07-15.25q-6.26-10.42-6.25-26.11zm27.63.13q0 13.55 5 19.46t13.7 5.91q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.1-18.46t-13.82-5.82A16.78 16.78 0 0 0 344 133q-5.07 6-5.08 19.62z"/>
<path class="footer__logo-svg--parttwo" fill="currentColor" d="M392.28 152.49q0-21.88 12.2-34.1t34-12.2q22.34 0 34.41 12t12.07 33.58q0 15.69-5.27 25.72a37.6 37.6 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.13 0-25-4.82a37.67 37.67 0 0 1-16.08-15.25q-6.22-10.43-6.22-26.12zm27.64.13q0 13.55 5 19.46t13.72 5.92q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.09-18.46t-13.82-5.82A16.77 16.77 0 0 0 425 133q-5.09 6-5.08 19.62z"/>
<path class="footer__logo-svg--parttwo" fill="currentColor" d="M482.08 107.72h27.64v67.41h43.13v22h-70.77z"/></g></g></svg>
`;

DARK_MODE.innerHTML = `
<svg class="footer__mode-sun footer__mode-svg"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xml:space="preserve">

	<defs>
	</defs>
	<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
		<path d="M 45 68 c -12.682 0 -23 -10.317 -23 -23 c 0 -12.682 10.318 -23 23 -23 c 12.683 0 23 10.318 23 23 C 68 57.683 57.683 68 45 68 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 38.652 17.61 c -0.292 0 -0.573 -0.127 -0.765 -0.356 c -0.239 -0.284 -0.301 -0.677 -0.161 -1.021 l 6.348 -15.61 C 44.227 0.247 44.593 0 45 0 s 0.773 0.247 0.926 0.623 l 6.349 15.61 c 0.14 0.344 0.077 0.737 -0.162 1.021 c -0.238 0.284 -0.616 0.414 -0.978 0.333 c -4.045 -0.881 -8.228 -0.881 -12.271 0 C 38.794 17.603 38.723 17.61 38.652 17.61 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 45 90 c -0.407 0 -0.773 -0.246 -0.926 -0.623 l -6.348 -15.61 c -0.14 -0.344 -0.078 -0.737 0.161 -1.021 c 0.239 -0.284 0.615 -0.412 0.978 -0.333 c 4.043 0.882 8.226 0.882 12.271 0 c 0.363 -0.08 0.74 0.05 0.978 0.333 c 0.239 0.283 0.302 0.677 0.162 1.021 l -6.349 15.61 C 45.773 89.754 45.407 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 16.61 52.349 c -0.127 0 -0.255 -0.024 -0.377 -0.073 l -15.61 -6.349 C 0.247 45.773 0 45.407 0 45 s 0.247 -0.773 0.624 -0.926 l 15.61 -6.348 c 0.343 -0.14 0.737 -0.078 1.021 0.161 c 0.284 0.239 0.412 0.616 0.333 0.978 c -0.441 2.021 -0.665 4.086 -0.665 6.135 c 0 2.049 0.224 4.113 0.665 6.136 c 0.079 0.362 -0.049 0.739 -0.333 0.978 C 17.071 52.269 16.842 52.349 16.61 52.349 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 73.39 52.349 c -0.231 0 -0.461 -0.08 -0.644 -0.235 c -0.284 -0.238 -0.412 -0.615 -0.333 -0.978 c 0.44 -2.022 0.664 -4.087 0.664 -6.136 c 0 -2.049 -0.224 -4.114 -0.664 -6.135 c -0.079 -0.362 0.049 -0.739 0.333 -0.978 c 0.283 -0.239 0.676 -0.301 1.021 -0.161 l 15.61 6.348 C 89.754 44.227 90 44.593 90 45 s -0.246 0.773 -0.623 0.926 l -15.61 6.349 C 73.645 52.324 73.517 52.349 73.39 52.349 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 20.437 30.415 c -0.028 0 -0.057 -0.001 -0.085 -0.004 c -0.37 -0.032 -0.692 -0.266 -0.836 -0.607 l -6.549 -15.527 c -0.158 -0.375 -0.073 -0.808 0.214 -1.096 c 0.288 -0.288 0.722 -0.371 1.096 -0.214 l 15.527 6.549 c 0.342 0.144 0.576 0.466 0.607 0.835 c 0.032 0.37 -0.144 0.727 -0.456 0.927 c -1.743 1.119 -3.36 2.42 -4.809 3.868 c -1.448 1.449 -2.75 3.066 -3.868 4.809 C 21.093 30.243 20.775 30.415 20.437 30.415 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 76.112 77.112 c -0.131 0 -0.263 -0.025 -0.389 -0.078 l -15.526 -6.549 c -0.342 -0.145 -0.576 -0.467 -0.607 -0.836 c -0.032 -0.37 0.144 -0.727 0.456 -0.928 c 1.745 -1.121 3.363 -2.423 4.808 -3.868 l 0 0 c 1.445 -1.444 2.747 -3.063 3.868 -4.808 c 0.201 -0.312 0.553 -0.489 0.928 -0.456 c 0.369 0.031 0.691 0.266 0.836 0.607 l 6.549 15.526 c 0.157 0.375 0.073 0.809 -0.215 1.096 C 76.628 77.011 76.372 77.112 76.112 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 69.563 30.414 c -0.339 0 -0.656 -0.171 -0.842 -0.459 c -1.121 -1.746 -2.423 -3.363 -3.868 -4.809 l 0 0 c -1.447 -1.447 -3.065 -2.749 -4.808 -3.868 c -0.313 -0.2 -0.488 -0.557 -0.456 -0.927 c 0.031 -0.37 0.266 -0.691 0.607 -0.835 l 15.526 -6.549 c 0.373 -0.158 0.808 -0.074 1.096 0.214 c 0.288 0.288 0.372 0.721 0.215 1.096 l -6.549 15.527 c -0.145 0.342 -0.467 0.576 -0.836 0.607 C 69.62 30.413 69.592 30.414 69.563 30.414 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
		<path d="M 13.887 77.112 c -0.26 0 -0.516 -0.102 -0.707 -0.293 c -0.288 -0.288 -0.373 -0.721 -0.214 -1.096 l 6.549 -15.526 c 0.144 -0.342 0.466 -0.576 0.835 -0.607 c 0.37 -0.043 0.727 0.144 0.927 0.456 c 1.119 1.742 2.421 3.36 3.868 4.808 l 0 0 c 1.446 1.446 3.063 2.747 4.809 3.868 c 0.312 0.201 0.488 0.558 0.456 0.928 c -0.032 0.369 -0.266 0.691 -0.607 0.836 l -15.527 6.549 C 14.15 77.087 14.019 77.112 13.887 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	</g>
</svg>
<svg class="footer__mode-moon footer__mode-svg" version="1.1" id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.89" style="enable-background:new 0 0 122.88 122.89" xml:space="preserve">
  <g>
    <path fill="currentColor" d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z"/>
  </g>
</svg>
`;

DARK_MODE.addEventListener('click', toggleMode);

function toggleMode() {
  if (DARK_MODE.classList.contains('is-sun')) {
    DARK_MODE.classList.add('is-moon');
    document.body.classList.add('is-moon');
    document.body.classList.remove('is-sun');
    DARK_MODE.classList.remove('is-sun');
    localStorage.setItem('darkMode', 'dark');
  } else if (DARK_MODE.classList.contains('is-moon')) {
    DARK_MODE.classList.add('is-sun');
    document.body.classList.add('is-sun');
    document.body.classList.remove('is-moon');
    DARK_MODE.classList.remove('is-moon');
    localStorage.setItem('darkMode', '');
  }
}

GAME_SCORE.textContent = `Score`;

GAME_SCORE.addEventListener('click', toggleScoreTable)

FOOTER.appendChild(FOOTER_CONTAINER);
FOOTER_CONTAINER.append(LOGO, DARK_MODE, GAME_SCORE);

export { FOOTER, toggleMode };
