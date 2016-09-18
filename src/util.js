let ready = (fn) => {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
  if(document.readyState === "complete") {
    return fn();
  }
}
let sayAwesome = () => console.log('awesome stuff');


export { ready, sayAwesome };