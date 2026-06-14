import { Input } from "../inputs/Input.js";

export function Date(props){

    props = props || {};

    props.type = "date";

    return Input(props);

}