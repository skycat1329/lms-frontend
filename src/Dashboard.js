import React from 'react'
import { useEffect } from 'react';
const Dashboard = () => {

    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(!storedUser) {
            window.location.href = "/";
        } else {
            setUser(storedUser);
        }
    }, []);

    return (
          <div>
      <h1>Dashboard</h1>

      {user && (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>User ID: {user.user_id}</p>
        </>
      )}
    </div>
    )
}

export default Dashboard