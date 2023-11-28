export interface Expr {
  t: string;
}

/* Literals */

export interface LiteralExpr extends Expr {
  t: string;
}

export interface NumberLiteralExpr extends LiteralExpr {
  t: "NumberLiteralExpr";
  v: number;
}
export const makeNumberLiteralExpr = (v: number): NumberLiteralExpr => {
  return { t: "NumberLiteralExpr", v };
};

export interface StringLiteralExpr extends LiteralExpr {
  t: "StringLiteralExpr";
  v: string;
}
export const makeStringLiteralExpr = (v: string): StringLiteralExpr => {
  return { t: "StringLiteralExpr", v };
};

export interface BooleanLiteralExpr extends LiteralExpr {
  t: "BooleanLiteralExpr";
  v: boolean;
}
export const makeBooleanLiteralExpr = (v: boolean): BooleanLiteralExpr => {
  return { t: "BooleanLiteralExpr", v };
};

export interface NullLiteralExpr extends LiteralExpr {
  t: "NullLiteralExpr";
  v: null;
}
export const makeNullLiteralExpr = (): NullLiteralExpr => {
  return { t: "NullLiteralExpr", v: null };
};

/* Special expressions */

export interface IdentifierExpr extends Expr {
  t: "IdentifierExpr";
  v: string;
}
export const makeIdentifierExpr = (v: string): IdentifierExpr => {
  return { t: "IdentifierExpr", v };
};

export interface BlockExpr extends Expr {
  t: "BlockExpr";
  v: Array<Expr>;
}
export const makeBlockExpr = (v?: Array<Expr>): BlockExpr => {
  return { t: "BlockExpr", v: v ? v : new Array<Expr>() };
};
