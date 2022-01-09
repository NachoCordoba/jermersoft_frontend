import './index.css';

function Input(props){

    const {
        value,
        placeholder,
        onChange = () => console.log('Input Changed!'),
        type = 'text'
    } = props;

    return <input className='input' onChange={(event)=> onChange(event.target.value)} placeholder={placeholder} value={value} type={type}/>
}

export default Input;