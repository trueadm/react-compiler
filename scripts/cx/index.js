const csx = function csx(selector) {
  return selector && selector.replace(/([^\\])\//g, "$1__");
};

/* eslint-disable-next-line */
module.exports = function cx(classNames) {
  if (typeof classNames == "object") {
    return Object.keys(classNames)
      .map(function(className) {
        return classNames[className] ? className : "";
      })
      .map(csx)
      .join(" ");
  } else {
    return Array.prototype.map.call(arguments, csx).join(" ");
  }
};
