import { Input } from "../inputs/Input.js";

export function Url(props){

    props = props || {};

    props.type = "url";

    return Input(props);

}