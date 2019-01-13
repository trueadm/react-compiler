/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = function(api) {
  api.cache(true);

  const plugins = [
    "@babel/plugin-syntax-flow",
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-flow-strip-types",
  ];

  // Default
  return {
    include: [/node_modules/, /scripts/],
    ignore: [],
    presets: [
      [
        "@babel/env",
        {
          targets: {
            node: "11.1",
          },
        },
      ],
      "@babel/preset-flow",
    ],
    plugins,
  };
};