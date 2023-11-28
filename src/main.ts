import { Lexer } from "./lexer.ts";
import { Parser } from "./parser.ts";

const source = `"Hello, World!" 12 x y`;
const tokens = new Lexer(source).run();
const output = new Parser(tokens).run();
console.log(output);
