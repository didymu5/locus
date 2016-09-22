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
  if (document.readyState === "complete") {
    return fn();
  }
}

const getParamByName = (name, url) => {
  url = url || window.location.href;
  if (!name) throw "Must give a Paramater name to look for";

  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const getAllParams = () => {
  let urlParams = {};
  window.onpopstate = function(urlParams) {
    let match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function(s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1);
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
  }(urlParams);
  return urlParams || null;
}

const toggleLoader = (toggle = 'hide', loadingDOM, containerDOM) => {
  if(loadingDOM.style && toggle === 'hide') {
    loadingDOM.style.display = "none";
    containerDOM.style.display = "block";
    console.log('hiding loader')
  }
  if(loadingDOM.style && toggle === 'show') {
    loadingDOM.style.display = "block";
    containerDOM.style.display = "none";
    console.log('showing loader')
  }
};

export {
  ready,
  getParamByName,
  getAllParams,
  toggleLoader
};