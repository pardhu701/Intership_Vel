


import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import { useState } from 'react';
import UserOption from './UserOption';

export default function Users() {
    const[id,setId] = useState(1);
    const { data, isLoading, error } = useQuery(UserOption(id));

    if (isLoading) return <Loading />;
    if (error) return <div>Error fetching users: {error.message}</div>;
    

    return (
        <div>
          
            <h2>{JSON.stringify(data)}</h2>

            <button onClick={()=>{setId(id+1)}}>+</button>
        </div>
    );
}

