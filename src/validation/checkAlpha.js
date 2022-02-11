export default function checkAlpha(value) {
  if (value === "") return true;
  for (let char of value.trim()) {
    if (
      !(
        (char.charCodeAt() >= 1040 && char.charCodeAt() <= 1103) ||
        char.charCodeAt() === 1025
      )
    )
      return false;
  }
  return true;
}
