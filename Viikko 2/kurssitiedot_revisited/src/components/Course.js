import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part.name} {props.part.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <ul>
                {props.parts.map(part =>
                    <li key={part.id}>
                        <Part part={part} />
                    </li>
                )}
            </ul>
        </div>
    )
}

const Total = (props) => {
    const summa = props.parts.reduce(
        (prev, next) => prev + next.exercises, 0
    )
    return (
        <div>
            <ul><b>Total of exercises {summa}</b></ul>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
        )
}

export default Course