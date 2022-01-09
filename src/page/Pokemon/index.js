import './index.css';
import logo from '../../assets/image/logo.svg';
import Button from '../../components/Button';
import Title from '../../components/Title';
import PaginatedCards from '../../components/PaginatedCards';
import Notification from '../../components/Notification';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URI from '../../config/config';

function Pokemon(props){

    const {
      auth
    } = props;

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [isLoading, setLoading ] = useState(false);
    const [notificationMessage, setNotificationMessage ] = useState('');
    const [isNotificationVisible, setNotificationVisible] = useState('');

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

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
        title: 'Ver Más',
        type: 'button',
        accessor: 'name',
        action: (id) => navigate(`/pokemon/${id}`)
      }
    ];

    const handlerGetOut = () =>{
      navigate('/');
    }

    const handlerLimit = (limit) =>{
      setLimit(limit);
    }

    const handlerPage = (page) =>{
      setPage(page);
    }

    useEffect(()=>{

      const getPokemons = async (limit, page, auth) =>{
        try{
          setLoading(true);
          const response = await axios.get(`${API_URI}/pokemon?limit=${limit}&page=${page}`, { headers: { authorization: auth.jwt}});
          
          setData(response.data.data);
          setCount(response.data.count);
  
          setLoading(false);
        }
        catch(err){
          console.log(err);
          if(err.status === 401){
            setNotificationMessage('Acceso no Autorizado.');
            setNotificationVisible(true);
    
            return await setTimeout(()=>{
              navigate('/');
            }, 3000)
          }
          
          setNotificationMessage(err.toString());
          setNotificationVisible(true);
        }
      };

      getPokemons(limit, page, auth);
    },[limit, page, auth, navigate]);

    return <div className='home-container'>
        <div className='home-nav-container'>
            <img alt='Jemersoft' src={logo} className='home-nav-logo'/>
            <Button text='Salir' onClick={handlerGetOut}/>
        </div>
        <Title text='Pokemons' />
        <PaginatedCards data={data} rows={rows} limit={limit} page={page} count={count} onChangeLimit={handlerLimit} onChangePage={handlerPage} isLoading={isLoading}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Pokemon);