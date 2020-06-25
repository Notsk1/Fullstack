import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const App = ({ anecdotes}) => {
    const [selected, setSelected] = useState(anecdotes[0])
    const [index, setIndex] = useState(0)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
    const [most, setMost] = useState(anecdotes[0])

    const anek = () => {
        var rand = Math.floor(Math.random() * 6)
        setSelected(anecdotes[rand])
        setIndex(rand)
    }

    const vote = () => {
        const copy = [...votes]
        copy[index] = copy[index] + 1
        setVotes(copy)
        var max = Math.max(...votes)
        var j = 0
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] == max) {
                break
            }
            j += 1
        }
        setMost(anecdotes[j])
    }


    return (
        <div>
            {selected}<br></br>
            has {votes[index]} votes <br></br>
            <Button onClick={vote} text='vote' />
            <Button onClick={anek} text='next anecdote' />
            <h1>Anecdote with most votes</h1>
            {most}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)