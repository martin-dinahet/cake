export interface Token {
  t: string;
  v: string;
}

export const makeToken = (t: string, v: string): Token => {
  return { t, v } as Token;
};
