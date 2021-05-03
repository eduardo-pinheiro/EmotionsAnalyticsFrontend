export interface FieldInterface {
  typeId: number;
  key: string;
  name: string;
  defaultValue?: boolean;
  required: boolean;
  placeholder?: string;
  getOptions?: Function;
}