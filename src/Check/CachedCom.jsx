// CachedCom.jsx
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router";

function CachedCom() {
     const [count, setCount] = React.useState(0);
  const queryClient = useQueryClient();

    const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  // Access the cached data for the "posts" query
  const cachedPosts = queryClient.getQueryData(["users"]);

  if (!cachedPosts) return <p>No cached data yet.</p>;

  return (
    <div>
      <h2>Cached User</h2>
      <NavLink to={'/'}>goback</NavLink>
      <ul>
        {cachedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.name}</strong>

            
          </li>
        ))}
      </ul>

         <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>

    </div>
  );
}

export default CachedCom;
