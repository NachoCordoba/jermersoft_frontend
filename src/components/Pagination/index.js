import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';

export default function Pagination(props){
    const {
        page,
        count,
        limit,
        onChangePage,
        onChangeLimit
    } = props;

    const totalPages = Math.ceil(count / limit)

    const handlerPrevPage = () =>{
        if(page > 1)
            onChangePage(page - 1);
    }

    const handlerNextPage = () =>{
        if(page < totalPages)
            onChangePage(page + 1);
    }

    const handlerPageChange = (page) =>{
        onChangePage(page);
    }

    return <div className='pagination-container'>
        <FontAwesomeIcon icon={faArrowLeft} color='#0fb7d4' size={'2x'} onClick={handlerPrevPage}/>
        <div className='pagination-information'>
            <div>
                <Input onChange={handlerPageChange} type='number' value={page} style={{ width: '50px'}}/> 
                <span> /{ totalPages }</span>
            </div>
            <div>
                <span>
                    Mostrando de {limit} en <Input onChange={onChangeLimit} type='number' value={limit} style={{ width: '50px'}}/>
                </span>
            </div>
        </div>
        <FontAwesomeIcon icon={faArrowRight} color='#0fb7d4' size={'2x'} onClick={handlerNextPage}/>
    </div>
}