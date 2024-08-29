import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const mobileNoValid = (value) => {
  const regex = /^\d{10}$/;
  if(!regex.test(value)) return "Mobile number should be numbers and 10 digits only.";
  return null;
};

export const nameValid = (value) => {
  const regex = /^[A-Za-z\s'-]+$/;
  if(!regex.test(value)) return "Enter characters only."
  return null;
};

export const otpValid = (value) => {
  const regex = /^\d{4}$/;
  if(!regex.test(value)) return "Otp should be in numbers and 4 digits only."
  return null;
};