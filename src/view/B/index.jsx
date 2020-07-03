import React from 'react'
import testStyle from '../../app.scss'

function b(props) {
    console.log(testStyle)
    return (
        <div className={testStyle.test}>
            <p>I am B</p>
        </div>
    )
}

export default b
