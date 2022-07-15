import React from 'react';
import {Link} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div style = {{display: 'flex', justifyContent: 'center', padding: "20px"}}>
            Eroor 404
            <Link to = "/">Home page</Link>
        </div>
    );
};

export default ErrorPage;