function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
  	window.onload = fn;
     // document.addEventListener('DOMContentLoaded', fn);
  }
}