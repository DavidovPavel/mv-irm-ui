export enum ControlType {
  text = 'text',
  date = 'date',
  textarea = 'textarea',
  checkbox = 'checkbox',
  select = 'select',
  autocomplete = 'autocomplete',
  file = 'file',
  label = 'label',
  link = 'link',
}

export type controlsType = keyof typeof ControlType;
