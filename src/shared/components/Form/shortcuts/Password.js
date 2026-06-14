import { Input } from "../inputs/Input.js";

export function Password(props){

    props = props || {};

    props.type = "password";

    return Input(props);

}