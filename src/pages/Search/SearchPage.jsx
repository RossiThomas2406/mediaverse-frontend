import React, { useState } from 'react';
import apiService from '../../api/apiService';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './SearchPage.module.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
    
    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setResults([]);

        if (!searchTerm.trim()) {
            setError('Por favor, ingresa un término de búsqueda');
            setLoading(false);
            return;
        }

        try {
            const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=es-ES`;
            
            const response = await axios.get(url);

            const filteredResults = response.data.results.filter(
                item => item.media_type === 'movie' || item.media_type === 'tv'
            );
            
            setResults(filteredResults);

        } catch (err) {
            console.error('Error al buscar en TMDb:', err);
            setError('Error al conectar con la API de películas/series. Verifica tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToList = async (item) => {
        try {
            const dataToSave = {
                itemId: item.id.toString(),
                itemType: item.media_type,
                title: item.title || item.name,
                posterPath: item.poster_path,
                releaseDate: item.release_date || item.first_air_date,
            };

            await apiService.post('/api/list', dataToSave);
            
            alert(`"${dataToSave.title}" agregado a tu lista con éxito.`);

        } catch (err) {
            const msg = err.response?.data?.msg || 'Error al guardar. Verifica tu sesión.';
            alert(`Fallo al guardar: ${msg}`);
        }
    };

    return (
        <div className={styles.container}>
            {/* Efectos de fondo */}
            <div className={styles.background}>
                <div className={styles.gradientTop}></div>
                <div className={styles.gradientBottom}></div>
                <div className={styles.blobBlue}></div>
                <div className={styles.blobIndigo}></div>
            </div>

            {/* Contenido principal */}
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoIcon}>
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className={styles.logoText}>MediaVerse Search</h1>
                    </div>
                    
                    <div className={styles.navButtons}>
                        <Link to="/dashboard" className={styles.dashboardButton}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            Ver Mi Lista
                        </Link>
                        <button 
                            onClick={logout}
                            className={styles.logoutButton}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Formulario de búsqueda */}
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Buscar películas o series..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className={styles.searchButton} 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Buscando...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                Buscar
                            </>
                        )}
                    </button>
                </form>

                {/* Mensaje de error */}
                {error && (
                    <div className={styles.error}>
                        <p className={styles.errorText}>{error}</p>
                    </div>
                )}

                {/* Resultados */}
                <div className={styles.resultsContainer}>
                    {results.length > 0 && (
                        <h2 className={styles.resultsTitle}>
                            Resultados para: <span className="text-blue-300">"{searchTerm}"</span>
                        </h2>
                    )}
                    
                    {loading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Buscando en nuestra base de datos...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className={styles.resultsGrid}>
                            {results.map(item => {
                                // Lógica para el póster y la sinopsis
                                const imageUrl = item.poster_path 
                                    ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` 
                                    : 'https://via.placeholder.com/150x225.png?text=Sin+Poster'; // Placeholder si no hay imagen

                                const title = item.title || item.name;
                                const overview = item.overview || 'Sinopsis no disponible.';

                                return (
                                    <div key={item.id} className={styles.resultCard}>
                                        {/* 1. CONTENEDOR DE LA IMAGEN */}
                                        <div className={styles.posterContainer}>
                                            <img 
                                                src={imageUrl} 
                                                alt={`Póster de ${title}`} 
                                                className={styles.posterImage}
                                            />
                                            <span className={`${styles.mediaType} ${item.media_type === 'movie' ? styles.movie : styles.tv}`}>
                                                {item.media_type === 'movie' ? '🎬 Película' : '📺 Serie'}
                                            </span>
                                        </div>

                                        {/* 2. CONTENIDO Y ACCIONES */}
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.resultTitle}>{title}</h3>
                                            <p className={styles.resultDate}>
                                                {item.release_date || item.first_air_date ? `Estreno: ${item.release_date || item.first_air_date}` : 'Fecha no disponible'}
                                            </p>

                                            {/* 3. SINOPSIS */}
                                            <p className={styles.overviewText}>
                                                {overview}
                                            </p>

                                            <button 
                                                onClick={() => handleAddToList(item)}
                                                className={styles.addButton}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                                Añadir a Mi Lista
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : !loading && searchTerm ? (
                        <div className={styles.emptyState}>
                            <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className={styles.emptyTitle}>No se encontraron resultados</h3>
                            <p className={styles.emptyText}>
                                No pudimos encontrar películas o series con "{searchTerm}". 
                                Intenta con otro término.
                            </p>
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <h3 className={styles.emptyTitle}>Comienza a buscar</h3>
                            <p className={styles.emptyText}>
                                Busca tus películas y series favoritas para añadirlas a tu lista personal.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Datos proporcionados por{' '}
                        <a 
                            href="https://www.themoviedb.org/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.tmdbLink}
                        >
                            TMDb
                        </a>
                    </p>
                    <p className={styles.footerText}>
                        MediaVerse © {new Date().getFullYear()} - Tu tracker personal de medios
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;