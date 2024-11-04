import React from 'react'
import Card from './Card'
import { useApp } from '../context/AppContext'

function MovieList({ movies }) {
    const { isDarkMode } = useApp()
    
    return (
        <section className={`py-10 ${isDarkMode ? 'bg-black' : 'bg-white'} sm:py-16 lg:py-20`}>
            
            <div className="px-6 mx-auto sm:px-6 lg:px-0 max-w-7xl">
            <h2 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                All Movies
            </h2>
                <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies?.map((movie) => (
                        <Card
                            key={movie.id}
                            id={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            rating={movie.vote_average}
                            releaseYear={movie.release_date}
                            genre={movie.genres.join(', ')}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MovieList
