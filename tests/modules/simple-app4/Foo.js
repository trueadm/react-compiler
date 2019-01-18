import React from "react";

export default function Foo({ text }: { text: string }) {
  return (
    <span>
      Hello world<em>{text}</em>
    </span>
  );
}
