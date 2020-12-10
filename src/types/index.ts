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

export type Cell = { value: CellValue; state: CellState };

export enum Emoji {
  reverse = '🙃',
  smile = '😆',
  nervous = '😮',
  cool = '😎',
  angry = '🤯',
}
