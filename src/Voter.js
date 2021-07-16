import { fetchProporsals, vote } from './solidityConfig';
import { useEffect, useState } from 'react';

function Voter() {
    const [user, setuser] = useState([])
    const [error, setupError] = useState(null);
    // const [downVote, setdownVote] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        
            const data = await fetchProporsals();
            if(data.length > 0)setuser(data);
            else if(data.code)setupError(data)

    } 

    const voter = async(id, v) => {
            let updatedUsers = []
            if(v === 'up') updatedUsers = await vote(id, 1, 0);
            else if(v === 'down') updatedUsers = await vote(id, 0, 1);
            if(updatedUsers.length > 0)setuser(updatedUsers)
            else if(updatedUsers.code)setupError(updatedUsers)
            return;
    }

    //fetch all candidate

    // vote for candidate
        // name
        // upvote
        // downvote


    // update the voters register
    console.log(user, "the users")
    return (
        <div>
            <h2>Live Voter App</h2>
            <p style = {{ color: "red"}}>{error && error.data.message}</p>
            <ol>
                {
                    user.length > 0 ? 
                    user.map((v, i) => (
                    <li key={v.name}>
                        {v.name}
                        {' '}
                        <button onClick={(evt) => voter(i, 'up', evt)}> + </button>
                        {' '}
                        <button onClick={(evt) => voter(i, 'down', evt)}> - </button>
                        {' '}
                         Upvote: {parseInt(v.upVote._hex)}
                         {' '}
                         down vote: {parseInt(v.downVote._hex)}
                    </li>
                    ))
                    : null
                }
            </ol>
            
        </div>
    );
};
export default Voter;