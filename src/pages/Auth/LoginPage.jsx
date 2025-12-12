import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import styles from './LoginPage.module.css'; // Import CSS Modules

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await apiService.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.msg || 'Error de conexión con la API.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Efectos de fondo */}
            <div className={styles.background}>
                <div className={styles.gradientTop}></div>
                <div className={styles.gradientBottom}></div>
                <div className={styles.blobPurple}></div>
                <div className={styles.blobPink}></div>
            </div>

            {/* Contenido principal */}
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.columns}>
                        
                        {/* Columna izquierda - Información */}
                        <div className={styles.infoColumn}>
                            <div className={styles.infoContent}>
                                {/* Logo y branding */}
                                <div className={styles.logoContainer}>
                                    <div className={styles.logoIcon}>
                                        <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className={styles.logoText}>
                                        <h1 className={styles.title}>MediaVerse</h1>
                                        <p className={styles.subtitle}>Tu universo cinematográfico</p>
                                    </div>
                                </div>
                                
                                {/* Título principal */}
                                <h2 className={styles.mainHeading}>
                                    Todo lo que ves,<br/>
                                    <span className={styles.gradientText}>en un solo lugar</span>
                                </h2>
                                
                                <p className={styles.description}>
                                    La plataforma definitiva para organizar y seguir tus películas y series favoritas. 
                                    Descubre, guarda y nunca olvides lo que quieres ver.
                                </p>
                                
                                {/* Características */}
                                <div className={styles.features}>
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Busca en millones</h3>
                                            <p className={styles.featureDesc}>Películas y series de todos los géneros</p>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Crea tus listas</h3>
                                            <p className={styles.featureDesc}>Organiza por "Ver", "Viendo" o "Visto"</p>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Sigue tu ritmo</h3>
                                            <p className={styles.featureDesc}>Marca episodios y lleva tu progreso</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Estadísticas */}
                                <div className={styles.stats}>
                                    <div className={styles.stat}>
                                        <div className={styles.statNumber}>+5M</div>
                                        <div className={styles.statLabel}>Títulos</div>
                                    </div>
                                    <div className={styles.stat}>
                                        <div className={styles.statNumber}>100%</div>
                                        <div className={styles.statLabel}>Gratuito</div>
                                    </div>
                                    <div className={styles.stat}>
                                        <div className={styles.statNumber}>24/7</div>
                                        <div className={styles.statLabel}>Actualizado</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha - Formulario */}
                        <div className={styles.formColumn}>
                            <div className={styles.formWrapper}>
                                <div className={styles.formContainer}>
                                    {/* Cabecera del formulario */}
                                    <div className={styles.formHeader}>
                                        <div className={styles.formIcon}>
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                        </div>
                                        <h2 className={styles.formTitle}>Iniciar Sesión</h2>
                                        <p className={styles.formSubtitle}>Accede a tu cuenta de MediaVerse</p>
                                    </div>

                                    {/* Mensaje de error */}
                                    {error && (
                                        <div className={styles.error}>
                                            <div className={styles.errorContent}>
                                                <svg className={`${styles.errorIcon} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                <p className={styles.errorMessage}>{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Formulario */}
                                    <form className={styles.form} onSubmit={handleSubmit}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                required
                                                className={styles.formInput}
                                                placeholder="usuario@ejemplo.com"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={handleChange}
                                                required
                                                className={styles.formInput}
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div className={styles.formOptions}>
                                            <div className={styles.remember}>
                                                <input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    className={styles.checkbox}
                                                />
                                                <label htmlFor="remember-me" className={styles.rememberLabel}>
                                                    Recordar sesión
                                                </label>
                                            </div>
                                            <a href="#" className={styles.forgot}>
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={styles.submitButton}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className={`${styles.spinner} w-5 h-5 mr-3 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Iniciando sesión...
                                                </div>
                                            ) : (
                                                'Acceder a MediaVerse'
                                            )}
                                        </button>
                                    </form>

                                    {/* Enlace a registro */}
                                    <div className={styles.separator}>
                                        <p className={styles.registerText}>¿Nuevo en MediaVerse?</p>
                                        <Link to="/register" className={styles.registerButton}>
                                            Crear una cuenta gratuita
                                        </Link>
                                    </div>

                                    {/* Credenciales demo */}
                                    <div className={styles.demo}>
                                        <p className={styles.demoText}>
                                            ¿Quieres probar? Usa: <span className={styles.demoCredentials}>demo@example.com</span> / 
                                            <span className={`${styles.demoCredentials} ml-1`}>demo123</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;