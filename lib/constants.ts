export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z]).+$/);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 최소 1글자 이상의 영문자를 포함해야 합니다.";
