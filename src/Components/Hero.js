import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

function Hero({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('')
    const { isDarkMode } = useApp()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            onSearch(searchTerm)
        }
    }

    return (
        <div className="relative">
            <header className="absolute inset-x-0 top-0 z-10 w-full">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <a href="/" title="" className="flex">
                                <img className="w-auto h-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]   " src="https://cdn.worldvectorlogo.com/logos/imax-3.svg" alt="" />
                            </a>
                        </div>

                        <button type="button" className="inline-flex p-2 bg-yellow-500 text-white transition-all duration-200 rounded-md lg:hidden focus:bg-yellow-600 hover:bg-yellow-600">
                            {/* Menu open: "hidden", Menu closed: "block" */}
                            <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>

                            {/* Menu open: "block", Menu closed: "hidden" */}
                            <svg className="hidden w-6 h-6 bg-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                            

                            <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-bold transition-all duration-200 border-2 border-yellow-500 px-4 py-2 text-yellow-500 hover:text-white hover:bg-yellow-600  focus:bg-yellow-600" role="button"> Sign Up Now </a>
                        </div>
                    </div>
                </div>
            </header>

            <section className={`${isDarkMode ? 'bg-black' : 'bg-white'} overflow-hidden`}>
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
                    <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                        <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-transparent bg-gradient-to-r from-yellow-300 to-orange-600 bg-clip-text' : 'text-transparent bg-gradient-to-r from-yellow-900 to-black bg-clip-text'} sm:text-6xl xl:text-8xl`}>
                                Immersive Movie Experience
                            </h1>
                            <p className={`mt-8 text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                Experience more of the stories you love.
                            </p>
                            <form onSubmit={handleSearch} className="relative mt-8 w-full">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for movies..."
                                    className="w-full px-6 py-4 text-gray-900 rounded-full focus:outline-none shadow-[0_0_10px_rgba(0,0,0,0.4)] focus:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow duration-300"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-0 top-0 h-full px-6 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
                        <div className="absolute inset-0">
                            <img className="lg:object-contain object-cover w-full h-full scale-150" src="https://wallpapercave.com/wp/wp8872777.jpg" alt="" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0">
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="flex items-center">
                                    <svg className="w-8 h-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                                    </svg>
                                    <h2 className="font-bold text-white text-3xl ml-2.5">1M+ views</h2>
                                </div>
                                <p className="max-w-xs mt-1.5 text-xl text-white">The Batman (2022)<br/> Action, Crime, Drama</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
