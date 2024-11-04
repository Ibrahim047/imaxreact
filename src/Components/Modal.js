import React from 'react'
import { useApp } from '../context/AppContext'

function Modal({ isOpen, onClose, movie }) {
    const { isDarkMode } = useApp()
    
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
            <div className={`relative ${isDarkMode ? 'bg-[#111]' : 'bg-white'} max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Movie Poster */}
                    <div className="md:w-1/3">
                        <img 
                            src={movie.Poster} 
                            alt={movie.Title}
                            className="w-full shadow-lg"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
                            }}
                        />
                    </div>

                    {/* Movie Details */}
                    <div className="md:w-2/3">
                        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {movie.Title}
                        </h2>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-white">{movie.imdbRating}</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-400">{movie.Year}</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-400">{movie.Runtime}</span>
                        </div>

                        <div className="space-y-4">
                            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                {movie.Plot}
                            </p>

                            <div>
                                <h3 className="text-yellow-500 font-semibold mb-1">Genre</h3>
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{movie.Genre}</p>
                            </div>

                            <div>
                                <h3 className="text-yellow-500 font-semibold mb-1">Director</h3>
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{movie.Director}</p>
                            </div>

                            <div>
                                <h3 className="text-yellow-500 font-semibold mb-1">Cast</h3>
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{movie.Actors}</p>
                            </div>

                            {movie.Awards !== "N/A" && (
                                <div>
                                    <h3 className="text-yellow-500 font-semibold mb-1">Awards</h3>
                                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{movie.Awards}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal 