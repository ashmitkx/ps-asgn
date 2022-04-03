import { useState } from 'react';
import AcceptHandle from './AcceptHandle';
import ChatSpace from './ChatSpace';
import './App.css';

function App() {
    const [currUser, setCurrUser] = useState(null);

    return (
        <div className='App'>
            {currUser ? (
                <ChatSpace currUser={currUser} />
            ) : (
                <AcceptHandle setCurrUser={setCurrUser} />
            )}
        </div>
    );
}

export default App;
