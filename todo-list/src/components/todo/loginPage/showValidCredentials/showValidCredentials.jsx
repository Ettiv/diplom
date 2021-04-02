import React from 'react';

function ShowValidCredentials(props) {
    if (props.hasLoginFaild) {
        return <div>Invalid credentials</div>
    }
    return null;
}

export default ShowValidCredentials;