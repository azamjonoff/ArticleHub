// baseURL
import { baseUrl } from "../my-utils";

export async function registerUser(user) {
  const req = await fetch(baseUrl + "/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (req.status == "200" || req.status == "201") return await req.json();
  else throw new Error(req.status);
}

export async function loginUser(user) {
  const req = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (req.status == "200" || req.status == "201") return await req.json();
  if (req.status == "400")
    throw new Error("Username or Password is not correct");
  else throw new Error("Something went wrong");
}

export async function refreshToken(token) {
  const req = await fetch(baseUrl + "/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: token }),
  });

  if (req.status == "200" || req.status == "201") return await req.json();
  if (req.status == "403") throw new Error(403);
  else throw new Error("Something went wrong");
}

export async function getArticles() {
  const req = await fetch(baseUrl + "/articles");

  if (req.status == "200" || req.status == "201") return await req.json();
  else throw new Error(req.status);
}

export async function editUser(user) {
  const res = await fetch(baseUrl + `/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(user),
  });

  if (res.status == 200 || res.status == 201) return await res.json();
  if (res.status == 403) throw new Error("403");
  else throw new Error("Something went wrong");
}

export async function addArticle(article, token) {
  const res = await fetch(baseUrl + `/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (res.status == 200 || res.status == 201) return await res.json();
  if (res.status == 403) throw new Error("403");
  else throw new Error("Something went wrong");
}

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(baseUrl + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200 || res.status === 201) return await res.text();
  else throw new Error("Something went wrong");
}

export async function editArticle(article, token) {
  const res = await fetch(baseUrl + `/articles/${article.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (res.status == 200 || res.status == 201) return "Data successfully edited";
  if (res.status == 403) throw new Error("403");
  else throw new Error("Something went wrong");
}

export async function deleteArticle(id, token) {
  const res = await fetch(baseUrl + `/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status == 200 || res.status == 201)
    return "Data successfully deleted";
  if (res.status == 403) throw new Error("403");
  else throw new Error("Something went wrong");
}
