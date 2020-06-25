import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const StatisticLine = ({ text, value, sign = '' , decimal}) => {
    return (
        <tr>
            <td>{text} </td>
            <td> {value.toFixed(decimal)} {sign}</td>
        </tr>
    )
}

const Statistics = ({ reviews }) => {
    var good = reviews[0]
    var bad = reviews[2]
    var neutral = reviews[1]
    if ((reviews.reduce((a, b) => a + b, 0) !== 0))
        return (
            <tbody>
                <StatisticLine text="good" value={good} decimal={0} />
                <StatisticLine text="neutral" value={neutral} decimal={0} />
                <StatisticLine text="bad" value={bad} decimal={0} />
                <StatisticLine text="all" value={good + neutral + bad} decimal={0}  />
                <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} decimal={2} />
                <StatisticLine text="positive" value={(good / (good + neutral + bad)) * 100} sign="%" decimal={2} />
            </tbody>
        )
    return (
        <tbody>
            <tr>
                <td>
                    No feedback given
                </td>
            </tr>
        </tbody>
    )
}

const App = (props) => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
    }
    const neutralClick= () => {
        setNeutral(neutral + 1)
    }
    const badClick = () => {
        setBad(bad + 1)
    }
    var reviews =[good,neutral,bad]
    return (
        <>
            <div>
                <h1>Give feedback </h1>
                <Button onClick={goodClick} text='good' />
                <Button onClick={neutralClick} text='neutral' />
                <Button onClick={badClick} text='bad' />

                <h1>statistics</h1>
            </div >
            <table>
                <Statistics reviews={reviews} />
            </table>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
