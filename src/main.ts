import { Lexer } from "./lexer.ts";

const source = `let a = ("Hello, World" == 3 + 43);`;
const tokens = new Lexer(source).run();
console.log(tokens);
