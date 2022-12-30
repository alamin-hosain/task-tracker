import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-52">
            <div className="relative">
                <div className="w-20 h-20 border-orange-200 border-2 rounded-full"></div>
                <div className="w-20 h-20 border-orange-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>

            <div className="relative">
                <div className="w-10 h-10 border-orange-200 border-2 rounded-full"></div>
                <div className="w-10 h-10 border-orange-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>

            <div className="relative">
                <div className="w-5 h-5 border-orange-200 border-2 rounded-full"></div>
                <div className="w-5 h-5 border-orange-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
        </div>
    )
}

export default Loader