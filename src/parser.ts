import { Token } from "./token.ts";
import {
  Expr,
  BlockExpr,
  makeBlockExpr,
  makeNumberLiteralExpr,
  NumberLiteralExpr,
  IdentifierExpr,
  makeIdentifierExpr,
  StringLiteralExpr,
  makeStringLiteralExpr,
} from "./expr.ts";

export class Parser {
  private tokens: Array<Token>;
  private output: BlockExpr;
  private cursor: Token | null;
  private ccount: number;

  constructor(t: Array<Token>) {
    this.tokens = t;
    this.output = makeBlockExpr();
    this.cursor = null;
    this.ccount = -1;
    this.advance();
  }

  private advance = (): void => {
    this.ccount++;
    this.cursor =
      this.tokens.length > this.ccount ? this.tokens[this.ccount] : null;
  };

  private eat = (): Token => {
    if (!this.cursor) Deno.exit(1);
    const t: Token = this.cursor;
    this.advance();
    return t;
  };

  private parse = (): Expr => {
    if (!this.cursor) Deno.exit(1);
    switch (this.cursor.t) {
      case "key": {
        Deno.exit(1);
        break;
      }
      case "num": {
        return this.parseNumberLiteralExpr();
      }
      case "spe": {
        Deno.exit(1);
        break;
      }
      case "ope": {
        Deno.exit(1);
        break;
      }
      case "cmp": {
        Deno.exit(1);
        break;
      }
      case "ide": {
        return this.parseIdentifierExpr();
      }
      case "str": {
        return this.parseStringLiteralExpr();
      }
      case "ass": {
        Deno.exit(1);
        break;
      }
      default: {
        Deno.exit(1);
        break;
      }
    }
  };

  private parseNumberLiteralExpr = (): NumberLiteralExpr => {
    return makeNumberLiteralExpr(parseInt(this.eat().v));
  };

  private parseIdentifierExpr = (): IdentifierExpr => {
    return makeIdentifierExpr(this.eat().v);
  };

  private parseStringLiteralExpr = (): StringLiteralExpr => {
    return makeStringLiteralExpr(this.eat().v);
  };

  public run = (): BlockExpr => {
    while (this.cursor !== null) this.output.v.push(this.parse());
    return this.output;
  };
}
