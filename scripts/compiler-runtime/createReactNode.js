function createReactNode(t, v) {
  return {
    t,
    v: v || null,
  };
}

/* eslint-disable-next-line */
module.exports = createReactNode;