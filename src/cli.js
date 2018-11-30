import { compileEntryModuleFileToDirectory } from "./compiler";
import { resolve } from "path";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const entry = argv.entry;
const options = {};

if (entry !== undefined) {
  try {
    compileEntryModuleFileToDirectory(resolve(entry), options);
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
} else {
  console.error(
    `The compiler CLI requires an --entry argument.\n\n1: The entry must be the path to a root React component that you want to compile.\n\nFor example: "react-compiler --entry=src/MyApp.js"\n`,
  );
  process.exit(1);
}
