import React from 'react';

function Fetching() {
  const [people, setPeople] = React.useState({}); // use an array instead

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await res.json();
        setPeople(data); // set array directly
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Fetched Users</h1>
      <ul>
      
       {people.phone}
       
      </ul>
    </>
  );
}

export default Fetching;