function isValidUsername(value) {
  return value && value.trim().length > 3;
}

function isValidEmail(value) {
  return value && value.includes('@');
}

function isValidPassword(value) {
  return value && value.trim().length >= 7;
}

function isContainSpace(value) {
  return value && value.includes(' ');
}

export function validateUser(credentials) {
  const validationErrors = {};

  if (!isValidUsername(credentials.username)) {
    validationErrors.username =
      'Invalid Username, Must be at least 4 characters long';
  }

  if (!isValidEmail(credentials.email)) {
    validationErrors.email = 'Invalid Email Address';
  }

  if (!isValidPassword(credentials.password)) {
    validationErrors.password =
      'Invalid password, Must be at least 7 characters long';
  }

  if (isContainSpace(credentials.password)) {
    validationErrors.password = 'Password should not contain any space';
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
