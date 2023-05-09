import React from 'react'


const Logout = () => {
    window.localStorage.removeItem('isLogged')
    window.location.href = '/';
}

export default Logout