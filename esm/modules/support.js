/** Whether or not touch gestures are supported by the browser. */
export var touch, IE11;

if (typeof window !== 'undefined' && window) {
  touch = 'ontouchstart' in window ||
    (navigator.msMaxTouchPoints ? true : false) ||
    false;
  /** Whether or not its IE11 :/ */
  IE11 = navigator.userAgent.indexOf('MSIE') > -1 ||
    navigator.appVersion.indexOf('Trident/') > -1;

}