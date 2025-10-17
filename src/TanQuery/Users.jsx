import { useQuery } from '@tanstack/react-query';
import Loading from './Loading'

export default function Users() {
    const { data, isLoading, error, isPending } = useQuery({
        queryKey: ['users'],
        // queryFn: () =>
        //     fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
        // // queryFn: async()=>{
        //      await new Promise(res => setTimeout(res, 5000));
        //      return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),

        // }
        queryFn: async () => {
            await new Promise(res => setTimeout(res, 1000));
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            return response.json();
        }

    });

  
  
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error fetching users</div>;

    return (

        <>
            <div>
                {isPending ?
                    <Loading /> :
                    (
                        <ul>
                            {

                            data?.map((user) => (
                                
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </>


    );
}