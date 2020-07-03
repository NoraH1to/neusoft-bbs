import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom'
import React from 'react'
import Editor from './EditorTest'


function App() {
    return (
        <div>
            <Link to="/a">a</Link><br/>
            <Link to="/b">b</Link><br/>
            <Link to="/c">c</Link>
            <Editor/>
        </div>
    )
}

export default hot(App);
