export type FormData = Record<string, string>;

export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

export function validateForm(
  data: FormData,
  rules: ValidationRules
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((fieldName) => {
    const value = String(data[fieldName] || '').trim();
    const rule = rules[fieldName];

    if (rule.required && !value) {
      errors[fieldName] = 'This field is required';
      return;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[fieldName] = 'Invalid email format';
      return;
    }
  });
  return errors;
}
