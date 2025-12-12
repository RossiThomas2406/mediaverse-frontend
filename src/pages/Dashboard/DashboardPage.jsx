import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    const [listItems, setListItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();

    // Función para obtener los datos
    const fetchList = async () => {
        try {
            const res = await apiService.get('/api/list');
            setListItems(res.data);
        } catch (error) {
            // Si el token expira o falta, redirigir a Login
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            console.error("Error al obtener la lista:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Función para eliminar un ítem
    const handleDelete = async (id, title) => {
        if (!window.confirm(`¿Estás seguro de eliminar "${title}" de tu lista?`)) {
            return;
        }
        try {
            await apiService.delete(`/api/list/${id}`);
            // Actualizar la lista después de eliminar
            setListItems(listItems.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        // Determinamos el siguiente estado. Aquí solo cambiamos a 'completed' para simplificar.
        const newStatus = 'completed'; 

        if (currentStatus === newStatus) return; // Evitar actualizar si ya está completo

        try {
            // Llama a la ruta PUT /api/list/:id con el nuevo estado
            const res = await apiService.put(`/api/list/${id}`, { status: newStatus });
            
            // Actualiza el estado local (listItems) sin recargar toda la página
            setListItems(listItems.map(item => 
                item._id === id ? res.data : item // Reemplaza el ítem viejo con el ítem actualizado (que viene en res.data)
            ));
            
            alert(`"${res.data.title}" marcado como Completado.`);

        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            alert("Fallo al actualizar el estado. Verifica tu sesión.");
        }
    };

    // Cargar la lista al montar el componente
    useEffect(() => {
        fetchList();
    }, []);

    if (loading) {
        // Usamos la estructura de tu emptyState/loading para que se vea bien
        return (
            <div className={styles.container}> 
                <div className={styles.background}>
                    {/* Repetir los efectos de fondo para que la pantalla de carga se vea bien */}
                    <div className={styles.gradientTop}></div>
                    <div className={styles.gradientBottom}></div>
                    <div className={styles.blobBlue}></div>
                    <div className={styles.blobIndigo}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.loadingState || styles.emptyState}>
                        {/* Usamos un spinner y texto con tus estilos definidos */}
                        <div className={styles.loadingSpinner}></div> 
                        <p className={styles.loadingText || styles.emptyTitle}>Cargando tu lista...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // LÓGICA DE FILTRADO
    const filteredItems = listItems.filter(item => {
        if (statusFilter === 'all') {
            return true; // Mostrar todos
        }
        return item.status === statusFilter;
    });
 
    return (
        <div className={styles.container}> {/* Usamos .container para el fondo */}
            <div className={styles.background}>
                {/* Mantener los efectos de fondo */}
                <div className={styles.gradientTop}></div>
                <div className={styles.gradientBottom}></div>
                <div className={styles.blobBlue}></div>
                <div className={styles.blobIndigo}></div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.mainTitle}>Mi Lista de MediaVerse</h1>
                        <p className={styles.subtitle}>Gestiona tus películas y series pendientes.</p>
                    </div>
                    <Link to="/" className={styles.backButton}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Volver a Buscar
                    </Link>
                </div>

                {/* BARRA DE FILTROS (ADAPTADO A CSS MODULES) */}
                <div className={styles.filterBar}> 
                    {['all', 'plan-to-watch', 'watching', 'completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            // Usa una combinación de classes activas/inactivas con styles
                            className={`${styles.filterButton} ${statusFilter === status ? styles.active : ''}`} 
                        >
                            {status === 'all' ? 'Todos' : 
                            status === 'plan-to-watch' ? 'Por Ver' :
                            status === 'watching' ? 'Viendo' : 'Completados'}
                        </button>
                    ))}
                </div>
                {/* FIN BARRA DE FILTROS */}

                {listItems.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3 className={styles.emptyTitle}>Tu lista está vacía</h3>
                        <p className={styles.emptyText}>Busca y añade tus primeras películas o series.</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3 className={styles.emptyTitle}>Nada en "{statusFilter}"</h3>
                        <p className={styles.emptyText}>No hay ítems que coincidan con el filtro actual.</p>
                    </div>
                ) : (
                    <div className={styles.itemsGrid}> {/* Cambiado a itemsGrid */}
                        {/* Usar filteredItems para renderizar */}
                        {filteredItems.map(item => ( 
                            <div key={item._id} className={styles.itemCard}>
                                <div className={styles.itemHeader}>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                </div>
                                
                                <div className={styles.itemInfo}>
                                    {/* Muestra el estado con la clase de CSS Modules */}
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Tipo:</span>
                                        <span className={styles.infoValue}>{item.itemType}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Estado:</span>
                                        <span className={`${styles.statusBadge} ${styles[item.status.replace('-', '_')]}`}> 
                                            {/* Clases de estado: completed, watching, etc. */}
                                            {item.status.replace('-', ' ')} 
                                        </span>
                                    </div>
                                </div>
                                
                                <div className={styles.itemActions}>
                                    {/* Botón de Completar (Solo visible si NO está completado) */}
                                    {item.status !== 'completed' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(item._id, item.status)} 
                                            className={styles.completeButton}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Completar
                                        </button>
                                    )}

                                    {/* Botón para Eliminar */}
                                    <button 
                                        onClick={() => handleDelete(item._id, item.title)}
                                        className={styles.deleteButton}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        MediaVerse © {new Date().getFullYear()} - Tu tracker personal de medios
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;