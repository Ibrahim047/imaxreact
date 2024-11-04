import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme ? JSON.parse(savedTheme) : true
    })

    // Favorites state
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites')
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    // Save theme to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDarkMode))
        // Apply theme to body
        document.body.className = isDarkMode ? 'bg-black' : 'bg-white'
    }, [isDarkMode])

    // Save favorites to localStorage when they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev)
    }

    // Favorites functions
    const addToFavorites = (movie) => {
        setFavorites(prev => {
            if (!prev.some(m => m.id === movie.id)) {
                return [...prev, movie]
            }
            return prev
        })
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isMovieFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        isDarkMode,
        toggleTheme,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
} 