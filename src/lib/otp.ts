export const generateOtp = (): string => {
  // 6-digit, leading zero allowed.
  return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
};

export const generateOrderRef = (): string => {
  const d = new Date();
  const stamp =
    d.getFullYear().toString().slice(-2) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0") +
    String(d.getHours()).padStart(2, "0") +
    String(d.getMinutes()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `RS-${stamp}-${rand}`;
};
