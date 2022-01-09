import './index.css';
import Label from '../Label';
import Input from '../Input';

function InputLabel(props){
    const {
        label,
        value,
        placeholder,
        onChange,
        style,
        type
    } = props;

    return <div className='input-label-container' style={style}>
        <Label text={label} />
        <Input placeholder={placeholder} value={value} onChange={onChange} type={type}/>
    </div>
}

export default InputLabel;