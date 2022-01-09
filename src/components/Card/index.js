import './index.css';
import Label from '../Label';
import Button from '../Button';

function Card(props){
    const {
        data,
        rows = [],
        width = 300
    } = props;

    return <div className='card' style={{ width }}>
        {
            data ?
            rows.map( (row, index) => {
                switch (row.type) {
                    case 'title':
                        return <div key={index} className='card-item-title' style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 21}}>{ data[row.accessor].toUpperCase()}</div>
                    case 'image':
                        return <div key={index} className='card-item-image-container'><img className='card-item-image' src={data[row.accessor]} alt='pokemon' /></div>;
                    case 'array':
                        return <div key={index}><Label color='rgba(255, 255, 255, 0.6)' text={row.title} /><p style={{color: 'rgba(255, 255, 255, 1)'}}>{data[row.accessor].join(', ')}</p></div>;
                    case 'button':
                        return <Button key={index} width='100%' text={row.title} onClick={()=>row.action(data[row.accessor])}/>
                    default:
                        return <div key={index}><Label color='rgba(255, 255, 255, 0.6)' text={row.title} /><p style={{color: 'rgba(255, 255, 255, 1)'}}>{data[row.accessor]}</p></div>;
                }
            }) : null
        }
    </div>
}

export default Card;