export const required = (label) => (value) => {
  if (!value || String(value).trim() === "") return `${label} wajib diisi`;
  return "";
};

export const minLength = (label, min) => (value) => {
  if (value && value.length < min) return `${label} minimal ${min} karakter`;
  return "";
};

export const exactLength = (label, len) => (value) => {
  if (value && value.length !== len) return `${label} harus ${len} digit`;
  return "";
};

export const onlyNumbers = (label) => (value) => {
  if (value && !/^\d+$/.test(value)) return `${label} hanya boleh berisi angka`;
  return "";
};

export const isEmail = (label) => (value) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `${label} tidak valid`;
  return "";
};

// Gabungkan beberapa validator jadi satu untuk 1 field
export const combine = (...validators) => (value, allValues) => {
  for (const v of validators) {
    const msg = v(value, allValues);
    if (msg) return msg;
  }
  return "";
};