import { Input } from "../inputs/Input.js";

export function Tel(props){

    props = props || {};

    props.type = "tel";

    return Input(props);

}