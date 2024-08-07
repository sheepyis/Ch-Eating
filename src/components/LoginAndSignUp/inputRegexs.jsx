export const inputRegexs = {
    // 대소문자 영문자 및 숫자, 유효한 한글 포함 3~15글자
    nameReg: /^[a-zA-Z가-힣0-9]{3,10}$/,
    // 대소문자 및 숫자, 하이픈, 언더스코어 포함 6~12글자
    idReg: /^[a-zA-Z0-9-_]{6,12}$/,
    // 최소 하나의 소문자, 숫자, 특수문자 8~24글자
    pwReg: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/
};