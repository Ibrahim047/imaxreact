import './App.css';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import MovieList from './Components/MovieList';
import MovieSlider from './Components/MovieSlider';
import React, { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext';
import ThemeToggle from './Components/ThemeToggle';
import MovieDetailPage from './Components/MovieDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [movies, setMovies] = useState([]);
    const [sliderMovies, setSliderMovies] = useState([]);
    const API_KEY = '80a6b553';

    const searchMovies = async (searchTerm) => {
        try {
            // First, search for movies matching the search term
            const searchResponse = await fetch(
                `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
            )
            const searchData = await searchResponse.json()

            if (searchData.Search) {
                // Get the first 12 movie IDs from search results
                const movieIds = searchData.Search.slice(0, 12).map(movie => movie.imdbID)

                // Fetch detailed information for each movie
                const moviePromises = movieIds.map(id =>
                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
                        .then(response => response.json())
                )
                
                const moviesData = await Promise.all(moviePromises)
                
                // Transform the data
                const transformedData = moviesData.map(movie => ({
                    id: movie.imdbID,
                    poster_path: movie.Poster,
                    title: movie.Title,
                    vote_average: movie.imdbRating,
                    release_date: movie.Year,
                    genres: movie.Genre.split(', ')
                }))

                setMovies(transformedData)
            }
        } catch (error) {
            console.error('Error searching movies:', error)
        }
    }

    // Initial movies load
    useEffect(() => {
        // Latest/Popular movies for the slider
        const sliderMovieIds = [
            'tt15398776', // Oppenheimer (2023)
            'tt1517268',  // Barbie (2023)
            'tt14209916', // Blue Beetle (2023)
            'tt17663992', // Anyone But You (2023)
            'tt15789038', // Wonka (2023)
            
            'tt21807222', // Civil War (2024)
            'tt13238346', // Madame Web (2024)
            'tt11304740'  // Kung Fu Panda 4 (2024)
        ];

        // Classic/Popular movies for the main grid
        const mainMovieIds = [
            'tt0468569', // The Dark Knight
            'tt0133093', // The Matrix
            'tt0111161', // The Shawshank Redemption
            'tt0076759', // Star Wars
            'tt0068646', // The Godfather
            'tt0109830', // Forrest Gump
            'tt0114369', // Se7en
            'tt0371746', // Iron Man
            'tt1375666'  // Inception
        ];

        const fetchMovies = async (ids, setStateFunction) => {
            try {
                const moviePromises = ids.map(id =>
                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
                        .then(response => response.json())
                );
                
                const moviesData = await Promise.all(moviePromises);
                const transformedData = moviesData.map(movie => ({
                    id: movie.imdbID,
                    poster_path: movie.Poster,
                    title: movie.Title,
                    vote_average: movie.imdbRating,
                    release_date: movie.Year,
                    genres: movie.Genre.split(', ')
                }));

                setStateFunction(transformedData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        // Fetch both sets of movies
        fetchMovies(sliderMovieIds, setSliderMovies);
        fetchMovies(mainMovieIds, setMovies);
    }, []);

    return (
        <AppProvider>
            <Router>
                <div className="min-h-screen transition-colors duration-200">
                    <ThemeToggle />
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero onSearch={searchMovies} />
                                <MovieSlider movies={sliderMovies} />
                                <MovieList movies={movies} />
                                <Footer />
                            </>
                        } />
                        <Route path="/movie/:id" element={<MovieDetailPage />} />
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
