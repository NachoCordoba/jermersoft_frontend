import './index.css';
import Card from '../../components/Card';
import Notification from '../../components/Notification';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import API_URI from '../../config/config';

function View(props){

    const {
        auth
    } = props;

    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    const [notificationMessage, setNotificationMessage ] = useState('');
    const [isNotificationVisible, setNotificationVisible] = useState('');

    const rows = [
        {
            type: 'title',
            accessor: 'name'
        },
        {
            title: 'Imagen: ',
            accessor: 'image',
            type: 'image'
        },
        {
            title: 'Peso: ',
            accessor: 'weight'
        },
        {
            title: 'Tipo: ',
            accessor: 'types',
            type: 'array'
        },
        {
            title: 'Habilidades: ',
            accessor: 'abilities',
            type: 'array'
        },
        {
          title: 'Movimientos: ',
          type: 'array',
          accessor: 'moves'
        }
  ];

    const handlerPrevPage = () => {
        navigate('/pokemon');
    }

    useEffect(()=>{
        const getPokemon = async (id, auth) => {
            try{
                setLoading(true);
                const response = await axios.get(`${API_URI}/pokemon/${id}`, { headers: { authorization: auth.jwt}})
                setData(response.data);
                setLoading(false);
            }
            catch(err){
                if(err.status === 401){
                  setNotificationMessage('Acceso no Autorizado.');
                  setNotificationVisible(true);
          
                  return await setTimeout(()=>{
                    navigate('/');
                  }, 3000);
                }
                
                setNotificationMessage(err.toString());
                setNotificationVisible(true);
            }
        }

        getPokemon(params.pokemonID, auth);
    },[params, auth, navigate]);

    return <div className='view-container'>
        <div className='view-navigation'>
            <FontAwesomeIcon icon={faArrowLeft} color='#0fb7d4' size={'2x'} onClick={handlerPrevPage}/>
        </div>
        <div className='view-content'>
            { isLoading ? <ClipLoader color='white' loading={isLoading} size={'24px'}/> : <Card data={data} rows={rows} width='80%'/> }
        </div>
        <Notification isVisible={isNotificationVisible} onClose={()=>setNotificationVisible(false)}>
            <FontAwesomeIcon icon={ faTimesCircle } color={'red'} size={'2x'} />
            <p>{notificationMessage}</p>
        </Notification>
    </div>
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth
    }
  }
  
  const mapDispatchToProps =(dispatch) =>{
    return {
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(View);