export class ValidationError extends Error {
  private _errors: string[];

  constructor(errors: string | string[] = []) {
    super();

    if (typeof errors === 'string') {
      this._errors = [errors];
    } else {
      this._errors = errors;
    }

    this.name = 'ValidationError';
  }

  add(error: string) {
    this._errors.push(error);
  }

  get errors() {
    return this._errors;
  }

  get first() {
    return this._errors[0];
  }

  get message() {
    return this._errors.join(', ');
  }

  get isEmpty() {
    return this._errors.length === 0;
  }

  static create(errors: string[] = []) {
    return new ValidationError(errors);
  }

  toString() {
    return this.message;
  }
}

export const min = (value: string, minLength: number) => {
  return value.length >= minLength;
};

export const max = (value: string, maxLength: number) => {
  return value.length <= maxLength;
};

export const length = (
  value: string,
  minLength = 1,
  maxLength = Number.MAX_SAFE_INTEGER
) => {
  return min(value, minLength) && max(value, maxLength);
};

export const isEmpty = (value: string) => {
  return value.trim() === '';
};

export const startsWithUppercase = (value: string) => {
  if (isEmpty(value)) {
    return false;
  }
  return value[0].toUpperCase() === value[0];
};

export const onlyLetters = (value: string, allowedChars: string[] = []) => {
  const RE = new RegExp(`^[A-Za-zА-я${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const hasNumber = (value: string) => {
  return /\d/.test(value);
};

export const isNumber = (value: string, allowedChars: string[] = []) => {
  const RE = new RegExp(`^[\\d${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const hasUppercase = (value: string) => {
  return /[A-Z]/.test(value);
};

const makeTest = (
  validate: (value: string, validationError: ValidationError) => void
) => {
  return (value = '') => {
    const validationError = ValidationError.create();
    validate(value, validationError);

    if (!validationError.isEmpty) {
      throw validationError;
    }
  };
};

export const testName = makeTest(
  (value: string, validationError: ValidationError) => {
    if (isEmpty(value)) {
      validationError.add('Поле не может быть пустым');
    }

    if (!startsWithUppercase(value)) {
      validationError.add('Поле должно начинаться с заглавной буквы');
    }

    if (!onlyLetters(value, ['\\-'])) {
      validationError.add('Поле должно содержать только буквы');
    }
  }
);

export const testPassword = makeTest(
  (value: string, validationError: ValidationError) => {
    if (!length(value, 8, 40)) {
      validationError.add('Пароль должен быть от 8 до 40 символов');
    }

    if (!hasNumber(value) || !hasUppercase(value)) {
      validationError.add(
        'Пароль должен содержать хотя бы одну цифру и заглавную букву'
      );
    }
  }
);

export const testLogin = makeTest(
  (value: string, validationError: ValidationError) => {
    const allowedChars = ['\\-', '_'];

    if (!length(value, 3, 20)) {
      validationError.add('Поле должено быть от 3 до 20 символов');
    }

    if (!onlyLetters(value, [...allowedChars, '\\d'])) {
      validationError.add('Поле не может содержать спецсимволы');
    }

    if (isNumber(value, allowedChars)) {
      validationError.add('Поле не может состоять только из цифр');
    }
  }
);

export const testEmail = makeTest(
  (value: string, validationError: ValidationError) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isEmail) {
      validationError.add('Почта должна быть валидной');
    }
  }
);

export const testPhone = makeTest(
  (value: string, validationError: ValidationError) => {
    if (!length(value, 10, 15)) {
      validationError.add('Номер телефона должен быть от 10 до 15 символов');
    }

    const isNumberWithOptionalPlus = /^\+?\d+$/.test(value);

    if (!isNumberWithOptionalPlus) {
      validationError.add('Номер телефона должен содержать только цифры');
    }
  }
);
