'use strict';
import scrollTo from 'scroll-to';
function jumpToStart() {
  const scrollOptions = {
    left: 0,
    top: 0,
    behavior: 'smooth',
  };

  window.scrollTo(scrollOptions);
}

function jumpToEnd() {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  const scrollOptions = {
    left: 0,
    top: documentHeight - windowHeight,
    behavior: 'smooth',
  };

  window.scrollTo(scrollOptions);
}
export { jumpToEnd, jumpToStart };
