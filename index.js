import './ps-slideshow.js';

window.addEventListener('load', () => {
  const imgs = [
    'https://www.ecestaticos.com/imagestatic/clipping/981/237/9812379af1063c770a37c82b19ada0f6/los-vengadores-sociedad-anonima.jpg?mtime=1430317539',
    'https://radiocaput.com/wp-content/uploads/2018/05/The-Avengers-1021x580.jpg',
    'https://www.circulocolectivo.com/wp-content/uploads/2019/01/PICPORTADA-UP-6.jpg',
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/main_element/public/media/image/2019/01/Vengadores.jpg?itok=8GO8tRLA',
  ];
  document.querySelector('ps-slideshow').setAttribute('list-img', JSON.stringify(imgs));
}, false);