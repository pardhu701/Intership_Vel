// Com.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./Query";
import { NavLink } from "react-router";

function Com() {
  const { data, isLoading, error } = useQuery({
    queryKey:["users"],
    queryFn:fetchPosts,
    staleTime:Infinity,
    gcTime:Infinity,

  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <NavLink to={'/cached'}>button</NavLink>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Com;
