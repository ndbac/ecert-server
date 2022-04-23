export interface IEmailInputData {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  option: EEmailOption;
}

export enum EEmailOption {
  HTML = 'html',
  TEXT = 'text',
}
