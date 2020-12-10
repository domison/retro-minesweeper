export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  revealed,
  hidden,
  flagged,
}

export enum Background {
  neutral,
  red,
  green,
}

export type Cell = { value: CellValue; state: CellState; bgColor: Background };

export enum Emoji {
  reverse = '🙃',
  bored = '😴',
  smile = '😆',
  nervous = '😮',
  cool = '😎',
  angry = '🤯',
}
