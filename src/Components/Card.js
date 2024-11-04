import React, { useState } from 'react'
import Modal from './Modal'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Card({ id, posterPath, title, rating, releaseYear, genre }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [movieDetails, setMovieDetails] = useState(null)
    const { isDarkMode, isMovieFavorite, addToFavorites, removeFromFavorites } = useApp()
    const API_KEY = '80a6b553'
    const navigate = useNavigate()

    const handleCardClick = async () => {
        try {
            const response = await fetch(
                `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
            )
            const data = await response.json()
            if (data.Response === "True") {
                setMovieDetails(data)
                setIsModalOpen(true)
            }
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    const handleFavoriteClick = (e) => {
        e.stopPropagation()
        const movie = { id, posterPath, title, rating, releaseYear, genre }
        if (isMovieFavorite(id)) {
            removeFromFavorites(id)
        } else {
            addToFavorites(movie)
        }
    }

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <>
            <div 
                onClick={handleClick}
                className={`w-[310px] overflow-hidden shadow-lg hover:translate-y-[-12px] transition-all duration-300 cursor-pointer border-b border-yellow-500 ${
                    isDarkMode 
                        ? 'bg-[#151515] text-white shadow-[0_2px_0px_theme(colors.yellow.500)] hover:shadow-[0_10px_0px_theme(colors.yellow.500)]' 
                        : 'bg-[#f6f6f6] text-black shadow-[0_2px_0px_theme(colors.yellow.500)] hover:shadow-[0_10px_0px_theme(colors.yellow.500)]'
                }`}
            >
                <div className="relative ">
                    <img 
                        className="w-full h-[400px] object-cover" 
                        src={posterPath} 
                        alt={title} 
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
                        }}
                    />
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200"
                    >
                        <svg 
                            className={`w-6 h-6 ${isMovieFavorite(id) ? 'text-yellow-500' : 'text-white'}`}
                            fill={isMovieFavorite(id) ? 'currentColor' : 'none'}
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-4">
                    <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {title}
                    </h2>

                    <div className="flex items-center justify-between gap-4 mb-2">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {genre}
                        </span>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-gray-300">{rating}</span>
                        </div>
                    </div>

                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {releaseYear}
                    </span>
                </div>
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                movie={movieDetails}
            />
        </>
    )
}

export default Card
