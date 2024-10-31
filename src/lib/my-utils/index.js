// baseUrl
export const baseUrl = "https://json-api.uz/api/project/fn23";

export function getFormData(form) {
  const data = new FormData(form);
  const myObj = {};
  for (const [key, value] of data.entries()) {
    myObj[key] = value;
  }

  return myObj;
}

export function findData(article, id) {
  return article && article.find((art) => art.id === id);
}

export function collectItem(array, item) {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
}
