import { fetchProporsals, vote } from './solidityConfig';
import { useEffect, useState } from 'react';

const voters = [
    {
        name: 'Taiye Taiwo',
        upVote: 6,
        downVote: 4
    },
    {
        name: 'Kenny Black',
        upVote: 7,
        downVote: 4
    },
    {
        name: 'Sunday Taiwo',
        upVote: 6,
        downVote: 4
    },
    {
        name: 'John Mike',
        upVote: 6,
        downVote: 4
    },
    {
        name: 'Mike Tao',
        upVote: 6,
        downVote: 4
    }
]

function Voter() {
    const [user, setuser] = useState([])
    const [upVote, setupVote] = useState(0);
    const [downVote, setdownVote] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        const data = await fetchProporsals()
        setuser(data)
    } 

    const voter = async(id, v) => {
        let updatedUsers = []
        if(v === 'up') updatedUsers = await vote(id, 1, 0);
        else if(v === 'down') updatedUsers = await vote(id, 0, 1);
        setuser(updatedUsers)
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