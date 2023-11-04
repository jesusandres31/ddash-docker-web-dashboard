export interface Error {
  message: string;
  code: number;
}

export interface StremRes<T> {
  [key: string]: T;
}
