export const slugify = (val) => {
  if (!val) return '';
  return String(val)
    .normalize('NFD') // normalize characters with accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritical marks
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/đ/g, 'd') // replace "đ" with "d"
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};
