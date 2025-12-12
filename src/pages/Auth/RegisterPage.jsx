import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import styles from './RegisterPage.module.css';

function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await apiService.post('/api/auth/register', { username, email, password });
            localStorage.setItem('token', res.data.token);
            
            alert('¡Registro Exitoso! Serás redirigido.');
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.msg || 'Error de registro con la API.';
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
                <div className={styles.blobGreen}></div>
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
                                    Únete a la comunidad<br/>
                                    <span className={styles.gradientText}>de amantes del cine</span>
                                </h2>
                                
                                <p className={styles.description}>
                                    Crea tu cuenta y comienza a organizar todas tus películas y series favoritas. 
                                    Descubre nuevos títulos, crea listas personalizadas y sigue tu progreso.
                                </p>
                                
                                {/* Características */}
                                <div className={styles.features}>
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Cuenta segura</h3>
                                            <p className={styles.featureDesc}>Tus datos protegidos con encriptación avanzada</p>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Listas ilimitadas</h3>
                                            <p className={styles.featureDesc}>Crea todas las listas que necesites, totalmente gratis</p>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.feature}>
                                        <div className={styles.featureIcon}>
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.featureText}>
                                            <h3 className={styles.featureTitle}>Recomendaciones</h3>
                                            <p className={styles.featureDesc}>Descubre contenido basado en tus gustos</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Beneficios */}
                                <div className={styles.benefits}>
                                    <div className={styles.benefit}>
                                        <div className={styles.benefitNumber}>100%</div>
                                        <div className={styles.benefitLabel}>Gratuito</div>
                                    </div>
                                    <div className={styles.benefit}>
                                        <div className={styles.benefitNumber}>+5M</div>
                                        <div className={styles.benefitLabel}>Títulos</div>
                                    </div>
                                    <div className={styles.benefit}>
                                        <div className={styles.benefitNumber}>24/7</div>
                                        <div className={styles.benefitLabel}>Disponible</div>
                                    </div>
                                    <div className={styles.benefit}>
                                        <div className={styles.benefitNumber}>∞</div>
                                        <div className={styles.benefitLabel}>Listas</div>
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                            </svg>
                                        </div>
                                        <h2 className={styles.formTitle}>Crear Cuenta</h2>
                                        <p className={styles.formSubtitle}>Únete a MediaVerse en segundos</p>
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
                                            <label className={styles.formLabel}>Nombre de Usuario</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={username}
                                                onChange={handleChange}
                                                required
                                                className={styles.formInput}
                                                placeholder="ej: cinéfilo23"
                                            />
                                        </div>

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
                                            <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
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
                                                    Creando cuenta...
                                                </div>
                                            ) : (
                                                'Crear Cuenta'
                                            )}
                                        </button>
                                    </form>

                                    {/* Enlace a login */}
                                    <div className={styles.separator}>
                                        <p className={styles.loginText}>¿Ya tienes una cuenta?</p>
                                        <Link to="/login" className={styles.loginButton}>
                                            Iniciar Sesión
                                        </Link>
                                    </div>

                                    {/* Políticas de privacidad */}
                                    <div className={styles.privacy}>
                                        <p className={styles.privacyText}>
                                            Al registrarte, aceptas nuestros{' '}
                                            <a href="#" className={styles.privacyLink}>Términos de Servicio</a>{' '}
                                            y{' '}
                                            <a href="#" className={styles.privacyLink}>Política de Privacidad</a>
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

export default RegisterPage;