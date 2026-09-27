// Keep provider diagnostics out of the interface and expose stable, translatable
// messages. Never include passwords, codes, or provider response data.
export function authErrorMessage(error: unknown): string {
  const code = (error as { errors?: { code?: string }[] })?.errors?.[0]?.code;
  switch (code) {
    case 'form_password_incorrect':
    case 'form_identifier_not_found':
      return 'The email or password is incorrect. Please try again.';
    case 'form_identifier_exists':
      return 'An account with these details already exists. Please log in.';
    case 'form_password_pwned':
    case 'form_password_length_too_short':
      return 'Please choose a stronger password with at least 8 characters.';
    case 'form_code_incorrect':
      return 'Code is incorrect.';
    case 'verification_expired':
    case 'form_code_expired':
      return 'This code has expired. Please request a new one.';
    case 'too_many_requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
