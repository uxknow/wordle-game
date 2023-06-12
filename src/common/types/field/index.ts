import { KeyboardEvent } from "react";

export enum  Variant {
  correct = "correct",
 'semi-correct' = 'semi-correct',
  incorrect = 'incorrect'
} 

export interface ICellState {
  letter: string;
  variant?: keyof typeof Variant 
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