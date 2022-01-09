import './index.css';

/**
 * Components
 */
import Button from '../Button';

/**
 * Notification Component
 * Ventana de Notificaciones
 * @param {*} props 
 * @returns 
 */
export default function Notification(props){
    const {
        isVisible = true,
        children,
        onClose
    } = props;
    return <div 
        className='notification-container' 
        style={{ display: isVisible? 'flex' : 'none' }}
    >
        {children}
        <Button onClick={onClose} text='Cerrar'/>
    </div>
}