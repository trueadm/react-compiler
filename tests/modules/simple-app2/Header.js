const React = require("react");
const { formatString } = require("./utils");

import type { HeaderProps } from "./type";

function Header({ x }: HeaderProps) {
  return <div>{x}</div>;
}

module.exports = {
  formatString,
  Header,
};
