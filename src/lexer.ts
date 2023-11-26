import { Token, makeToken } from "./token.ts";

export class Lexer {
  private source: Array<string>;
  private tokens: Array<Token>;
  private cursor: string | null;
  private ccount: number;
  private buffer: string;
  private string: string;
  private quotes: boolean;

  constructor(s: string) {
    this.source = s.split("");
    this.tokens = new Array<Token>();
    this.cursor = null;
    this.ccount = -1;
    this.buffer = "";
    this.string = "";
    this.quotes = false;
    this.advance();
  }

  private advance = (): void => {
    this.ccount++;
    this.cursor =
      this.source.length > this.ccount ? this.source[this.ccount] : null;
  };

  private isKeyword = (s: string): boolean => {
    const keywords = ["let", "fun", "ret", "use"];
    for (const k of keywords) {
      if (k === s) return true;
    }
    return false;
  };

  private isNumber = (s: string): boolean => {
    let count = 0;
    const numbers = "0123456789".split("");
    for (const char of s) {
      for (const n of numbers) {
        if (char === n) count++;
      }
    }
    return count === s.length;
  };

  private isSpecialChar = (s: string): boolean => {
    const speicalChars = "(){}[],.;".split("");
    for (const char of speicalChars) {
      if (s === char) return true;
    }
    return false;
  };

  private isOperator = (s: string): boolean => {
    const operators = "+-*/".split("");
    for (const op of operators) {
      if (op === s) return true;
    }
    return false;
  };

  private isComparator = (s: string): boolean => {
    const comparators = "=<>!".split("");
    for (const cmp of comparators) {
      if (cmp === s) return true;
    }
    return false;
  };

  private isWhitespace = (s: string): boolean => {
    const whitespaceChars = ["\n", " ", "\t"];
    for (const char of whitespaceChars) {
      if (char === s) return true;
    }
    return false;
  };

  private flushBuffer = (): void => {
    if (this.buffer.length > 0) {
      if (this.isNumber(this.buffer))
        this.tokens.push(makeToken("num", this.buffer));
      else if (this.isKeyword(this.buffer))
        this.tokens.push(makeToken("key", this.buffer));
      else this.tokens.push(makeToken("ide", this.buffer));
    }
    this.buffer = "";
  };

  private flushString = (): void => {
    if (this.string.length > 0) {
      this.tokens.push(makeToken("str", this.string));
    }
    this.string = "";
  };

  public run = (): Array<Token> => {
    while (this.cursor !== null) {
      if (this.cursor === '"' && !this.quotes) {
        this.flushBuffer();
        this.quotes = true;
        this.advance();
      } else if (this.cursor === '"' && this.quotes) {
        this.flushString();
        this.quotes = false;
        this.advance();
      } else if (this.cursor !== '"' && this.quotes) {
        this.string += this.cursor;
        this.advance();
      } else {
        if (this.isWhitespace(this.cursor)) {
          this.flushBuffer();
          this.advance();
        } else if (this.isSpecialChar(this.cursor)) {
          this.flushBuffer();
          switch (this.cursor) {
            case "(":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case ")":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case "{":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case "}":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case "[":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case "]":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case ",":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case ";":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
            case ".":
              this.tokens.push(makeToken("spe", this.cursor));
              break;
          }
          this.advance();
        } else if (this.isOperator(this.cursor)) {
          this.flushBuffer();
          switch (this.cursor) {
            case "+":
              this.tokens.push(makeToken("ope", this.cursor));
              break;
            case "-":
              this.tokens.push(makeToken("ope", this.cursor));
              break;
            case "*":
              this.tokens.push(makeToken("ope", this.cursor));
              break;
            case "/":
              this.tokens.push(makeToken("ope", this.cursor));
              break;
          }
          this.advance();
        } else if (this.isComparator(this.cursor)) {
          this.flushBuffer();
          const current = this.cursor;
          this.advance();
          if (this.cursor === "=") {
            this.tokens.push(makeToken("cmp", current + this.cursor));
            this.advance();
          } else {
            if (current === "=") {
              this.tokens.push(makeToken("ass", current));
            } else {
              this.tokens.push(makeToken("cmp", current));
            }
          }
        } else {
          this.buffer += this.cursor;
          this.advance();
        }
      }
    }
    this.flushString();
    this.flushBuffer();
    return this.tokens;
  };
}
