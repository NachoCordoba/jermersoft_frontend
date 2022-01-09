import './index.css';

function Paraphrase(props){
    const {
        text = 'Paraphrase',
        color
    } = props;

    return <p style={{ color }}>{text}</p>;
}

export default Paraphrase;