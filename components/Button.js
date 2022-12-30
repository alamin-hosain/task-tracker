import React from 'react'

const Button = ({ children }) => {
    return (

        <button className='bg-orange-500 px-8 py-3 rounded-md hover:scale-110 transition-transform duration-300 ease-out text-white'>{children}</button>
    )
}

export default Button