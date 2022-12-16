import { TextField, Props as TextFieldProps } from 'src/components/TextField';

export function validateForm(e: Event, fields: TextField[]) {
  let isFormValid = true;
  const formData = new FormData(e.target as HTMLFormElement);

  for (const field of fields) {
    if (!field.validate()) {
      isFormValid = false;
    }
  }

  return { valid: isFormValid, data: Object.fromEntries(formData.entries()) };
}

export function createTextField(
  props: WithRequired<TextFieldProps, 'attrs'>,
  onChange: (e: Event) => void = () => {}
) {
  const textField = new TextField({
    props: { value: '', ...props },
    events: {
      change: (e: Event) => {
        const { value } = e.target as HTMLInputElement;
        textField.setProps({ value });
        textField.validate();
        onChange(e);
      },
    },
  });
  return textField;
}
