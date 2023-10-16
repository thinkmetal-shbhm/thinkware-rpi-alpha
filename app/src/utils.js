export function get(endpoint) {
  return fetch(`http://localhost:4000/api/v1${endpoint}`);
}
export function post(endpoint, body) {
  return fetch(`http://localhost:4000/api/v1${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
}

export function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Mutation Observer Helper function
 * //developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
 * @param {string} sel The DOM selector to watch
 * @param {object} opt MutationObserver options
 * @param {function} cb Pass Mutation object to a callback function
 */
export function Observe(sel, opt, cb) {
  const Obs = new MutationObserver((m) => [...m].forEach(cb));
  document.querySelectorAll(sel).forEach((el) => Obs.observe(el, opt));
}

export function ObserveIFrame(sel, opt, cb) {
  const Obs = new MutationObserver((m) => [...m].forEach(cb));
  console.log(
    document
      .querySelector("iframe")
      .contentWindow.document.querySelectorAll(sel)
  );
  document
    .querySelector("iframe")
    .contentWindow.document.querySelectorAll(sel)
    .forEach((el) => Obs.observe(el, opt));
}

// example
// Observe(
//   ".item",
//   {
//     attributesList: ["style"], // Only the "style" attribute
//     attributeOldValue: true, // Report also the oldValue
//   },
//   (m) => {
//     console.log(m); // Mutation object
//   }
// );

// To watch for all attributes changes, instead of the attributesList Array use :

// attributes: true

export function secondsToDDHHMM(seconds) {
  // Calculate the number of days, hours, and minutes
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;
  let result;
  if (days > 0) {
    // Format the result as "DDd HHh MMm"
    result = `${days}d ${hours}h ${minutes}m`;
  } else {
    result = `${hours}h ${minutes}m`;
  }
  return result;
}
