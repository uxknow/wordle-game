import { KeyboardEvent } from "react";

export interface ICellState {
  letter: string;
  variant?: "correct" | "semi-correct" | "incorrect";
};

export type TBoard = ICellState[][];

export interface IStats {
  games: number;
  won: number;
  attempts: TAttempts;
}

export type TAttempts = Record<string, number>


export interface Element {
  removeEventListener(type: 'keyup' | 'keydown', listener: (event: KeyboardEvent) => any, options?: boolean | EventListenerOptions): void;
  addEventListener(type: 'keyup' | 'keydown', listener: (event: KeyboardEvent) => any, options?: boolean | EventListenerOptions): void;
}