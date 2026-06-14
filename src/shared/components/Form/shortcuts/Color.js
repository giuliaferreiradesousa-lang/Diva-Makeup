import { Input } from "../inputs/Input.js";

export function Color(props){

    props = props || {};

    props.type = "color";

    return Input(props);

}