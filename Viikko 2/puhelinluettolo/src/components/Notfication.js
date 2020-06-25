import React from 'react'
const Notification = ({ message, thing }) => {
    if (message === null) {
        return null
    }
    if (thing === 1) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else {
        return (
            <div className="noti">
                {message}
            </div>
        )
    }

}

export default Notification