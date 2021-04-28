import React from 'react';

function ShowValidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div className='alert alert-warning'>Invalid credentials</div>
    }
    return null;
}

export default ShowValidCredentials;