'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsLayout from './layout';

const Items =  () =>  {
    // const data = await axios.get('http://localhost:8082/api/auth');
    const [userData, setUserData] = useState();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await axios.get('http://localhost:8082/api/auth');
                setUserData(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchPosts();
    }, []); 
    console.log("user data", userData);

    return (
        <ItemsLayout>
            jello
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            {/* {userData ? (
                <div>Data: {JSON.stringify(userData)}</div>
            ) : (
                <div>Loading...</div>
            )} */}
        </ItemsLayout>
    );
};

export default Items;