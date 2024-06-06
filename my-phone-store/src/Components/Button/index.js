import "./style.scss";

const Button = props => {
    return ( 
        <button
            id = {props.id}
            className = "btnn"

        >{props.value}</button>
     );
}
 
export default Button;