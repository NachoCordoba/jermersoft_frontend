import './index.css';

function Label(props){
    const {
        text = 'Label',
        color= 'rgba(255, 255, 255, 0.8)'
    } = props;

    return <span className='label' style={{ color }}>{text}</span>
}

export default Label;