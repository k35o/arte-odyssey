import { Checkbox } from '../checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from './checkbox-group';

export const CheckboxGroup = {
  ...BaseCheckboxGroup,
  Item: Checkbox,
} as const;
