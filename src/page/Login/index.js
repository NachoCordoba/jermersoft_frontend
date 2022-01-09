import './index.css';
import logo from '../../assets/image/logo.svg';
import InputLabel from '../../components/InputLabel';
import Button from '../../components/Button';
import Paraphrase from '../../components/Paraphrase';
import Notification from '../../components/Notification';

import API_URI from '../../config/config';

import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth.action';

function Login(props){
    const {
        login
    } = props;

    const [ isLoading, setLoading ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const navigate = useNavigate()


    const handlerUserNameChanges = ( text ) => {
        setUserName(text);
    }

    const handlerUserPasswordChanges = ( text ) => {
        setUserPassword(text);
    }

    const handlerSubmit = async () => {
        try{
            setLoading(true);
            const response = await axios.post(`${API_URI}/auth`, { userName, userPassword });
            login(response.data);
            setLoginStatus(true);
            setLoginMessage('Iniciando Sesion...');
            navigate('/pokemon');
        }
        catch(err){
            if(err.response){
                const data =  err.response.data;
                setLoginStatus(!data.err);
                return setLoginMessage(data.errMsg);
            }
            
            setLoginStatus(false);
            setLoginMessage(err.message);
        }
        finally{
            setNotificationVisible(true);
            setLoading(false);
        }
        
    }

    return <div className='login-container'>
        <div className='login-content'>
            <img alt='Jemersoft' src={logo} className='login-logo'/>
            <InputLabel label='Usuario:' placeholder='Su Usuario' value={userName} onChange={handlerUserNameChanges}/>
            <InputLabel label='Clave:' placeholder='Su Clave' value={userPassword} onChange={handlerUserPasswordChanges} type='password' />
            <Button text='Ingresar' onClick={handlerSubmit} isLoading={isLoading} width='100%'/>
            <Paraphrase text='Prueba Tecnica de Ignacio A. Cordoba' color='rgba(255, 255, 255, 0.8)'/>
        </div>
        <Notification isVisible={isNotificationVisible} onClose={()=>setNotificationVisible(false)}>
            <FontAwesomeIcon icon={ loginStatus ? faCheckCircle : faTimesCircle} color={ loginStatus ? 'green' : 'red'} size={'2x'} />
            <p>{loginMessage}</p>
        </Notification>
    </div>
}

const mapStateToProps = (state)=>{
    return {
        
    }
}

const mapDispatchToProps =(dispatch) =>{
    return {
      login: (user)=> dispatch(login(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);