import { Input } from "../inputs/Input.js";

export function Email(props){

    props = props || {};

    props.type = "email";

    return Input(props);

}