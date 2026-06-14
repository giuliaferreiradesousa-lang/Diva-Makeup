import { Input } from "../inputs/Input.js";

export function Range(props){

    props = props || {};

    props.type = "range";

    return Input(props);

}