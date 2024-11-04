import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from './Card';
import { useApp } from '../context/AppContext';

function MovieSlider({ movies }) {
    const { isDarkMode } = useApp();
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 4
        },
        largeDesktop: {
            breakpoint: { max: 1200, min: 900 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 900, min: 650 },
            items: 2
        },
        smallTablet: {
            breakpoint: { max: 650, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
        extraSmallMobile: {
            breakpoint: { max: 450, min: 0 },
            items: 1
        }
    };

    return (
        <section className={`py-10 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="px-6 mx-auto sm:px-6 lg:px-0 max-w-7xl">
                <h2 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Featured Movies
                </h2>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="transform 500ms ease-in-out"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="px-4"
                >
                    {movies?.map((movie) => (
                        <div key={movie.id} className="h-full">
                            <Card
                                id={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                releaseYear={movie.release_date}
                                genre={movie.genres.join(', ')}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}

export default MovieSlider;
