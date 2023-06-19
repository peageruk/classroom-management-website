import request from "./AxiosCustomize";
const fetchAllUsers = () => {
  return request.get("api/v1/accounts/get-all");
};
const searchUsers = (token, page) => {
  return request.post(
    "api/v1/accounts/search",
    { name: "", pageNumber: page, pageSize: 3, sortBy: "id", sortType: "" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const postCreateUser = (name, job) => {
  // return request.post("/api/users", { name, job });
};
const putUpdateUser = (id) => {
  // return request.put(`/api/users/${id}`);
};
const loginAPI = (username, password) => {
  return request.post("/api/v1/auth/login-v2", { username, password });
};
export { loginAPI, fetchAllUsers, searchUsers };
