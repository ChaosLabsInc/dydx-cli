export interface Inquiry {
  type: string;
  name: string;
  message: string;
  choices?: string[];
  default: any;
}
