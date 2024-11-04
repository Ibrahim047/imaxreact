import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MovieSlider from './MovieSlider';
import Footer from './Footer';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { isDarkMode } = useApp();
  const API_KEY = '80a6b553';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);

        // Fetch similar movies based on the genre
        if (data.Genre) {
          const genre = data.Genre.split(',')[0]; // Get first genre
          const similarMovieIds = [
            'tt15398776', // Oppenheimer (2023)
            'tt1517268',  // Barbie (2023)
            'tt14209916', // Blue Beetle (2023)
            'tt17663992', // Anyone But You (2023)
            'tt15789038', // Wonka (2023)
            
            'tt21807222', // Civil War (2024)
            'tt13238346', // Madame Web (2024)
            'tt11304740'  // Kung Fu Panda 4 (2024)
          ];

          const moviePromises = similarMovieIds.map(id =>
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

          setSimilarMovies(transformedData);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!movie) return null;

  return (
    <div className="relative min-h-screen bg-black">

      {/* Main Content */}
      <div className="flex flex-col min-h-[75vh]">
        <div className="flex flex-col lg:flex-row lg:items-stretch flex-grow">
          {/* Left Side - Movie Details */}
          <div className="relative z-10 w-full lg:w-5/12 p-8 lg:py-10 lg:px-16 flex items-center">
            <div className="relative z-10">
            <button 
              onClick={handleBack}
              className="inline-flex items-center  font-semibold text-lg text-white gap-1 mb-4  hover:text-[#777]  transition-all duration-300"
            >
              <i class="ri-arrow-left-line"></i>
              Back
            </button>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">{movie.Title}</h1>
              
              <div className="flex items-center gap-4 mt-4">
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

              <p className="mt-6 text-gray-300">{movie.Plot}</p>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-yellow-500 font-semibold">Genre</p>
                  <p className="text-gray-300">{movie.Genre}</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-semibold">Director</p>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-semibold">Cast</p>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
                {movie.Awards !== "N/A" && (
                  <div>
                    <p className="text-yellow-500 font-semibold">Awards</p>
                    <p className="text-gray-300">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Movie Poster */}
          <div className="relative w-full lg:w-7/12">
            <div className="absolute inset-0">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="object-cover object-center w-full h-full"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent lg:w-2/3" />
              {/* Additional blur effect on the left edge */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Movie Slider Section */}
        <div className="w-full">
          <MovieSlider 
            movies={similarMovies} 
          />
        </div>
        <div className="w-full">
            <Footer/>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
