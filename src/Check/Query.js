// query.js
import axios from "axios";

// Example: fetch posts from a placeholder API
export const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:5000/users?_limit=5");
  return data;
};
