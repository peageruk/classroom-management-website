import request from "./AxiosCustomize";
// const fetchAllUsers = (page) => {
//   return request.get(`/api/users?page=${page}`);
// };
// const postCreateUser = (name, job) => {
//   return request.post("/api/users", { name, job });
// };
// const putUpdateUser = (id) => {
//   return request.put(`/api/users/${id}`);
// };
const loginAPI = (username, password) => {
  return request.post("/api/v1/auth/login-v2", { username, password });
};
export { loginAPI };
