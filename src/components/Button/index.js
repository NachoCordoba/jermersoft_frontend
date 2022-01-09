import './index.css';
import ClipLoader from 'react-spinners/ClipLoader';

function Button(props){
    const {
        text = 'Button',
        onClick = () => console.log('Button Clicked!'),
        isLoading = false,
        width= 150
    } = props;

    return <button className='button' onClick={onClick} disabled={isLoading} style={{ width }}>
        { isLoading ? <ClipLoader color='white' loading={isLoading} size={'14px'}/> : text}
    </button>
}

export default Button;