import axios from 'axios';
import { useState } from 'react';

function AcceptHandle({ setCurrUser }) {
    const [handleInput, setHandleInput] = useState('');
    const [error, setError] = useState(null);

    function handleHandleInput(e) {
        e.preventDefault();
        setHandleInput(e.target.value);
    }

    async function submitHandle(e) {
        e.preventDefault();

        let user;
        try {
            const res = await axios.get(`/api/v1/users/search?handle=${handleInput}`);

            user = res.data;
        } catch (e) {
            console.error(e);
        }

        if (user === null) {
            setError(`User '${handleInput}' not found.`);
        } else {
            setError(null);
            setCurrUser(user);
        }
    }

    return (
        <form className='useraccept'>
            <div>
                <label htmlFor='handle'>Enter handle</label>
                {error && <span className='error'>{error}</span>}
            </div>
            <div>
                <input type='text' value={handleInput} onChange={handleHandleInput} />
                <button type='submit' onClick={submitHandle}>
                    🡪
                </button>
            </div>
        </form>
    );
}

export default AcceptHandle;
