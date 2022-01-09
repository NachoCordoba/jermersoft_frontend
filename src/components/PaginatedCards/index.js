import './index.css';
import Pagination from '../Pagination';
import Card from '../Card';
import ClipLoader from 'react-spinners/ClipLoader';

function PaginatedCards(props){

    const {
        data = [],
        rows = [],
        page,
        limit,
        onChangePage,
        onChangeLimit,
        count,
        isLoading=false
    } = props;

    return <div>
        <div className='cards-container'>
            {
                isLoading ? <ClipLoader color='white' loading={isLoading} size={'24px'}/> : data.map((item, index) => <Card key={index} data={item} rows={rows} />)
            }
        </div>
        <div className='cards-pagination'>
            <Pagination page={page} limit={limit} onChangePage={onChangePage} onChangeLimit={onChangeLimit} count={count}/>
        </div>
    </div>
}

export default PaginatedCards;