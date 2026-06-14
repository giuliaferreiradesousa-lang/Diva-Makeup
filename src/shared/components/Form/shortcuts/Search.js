import { Input } from "../inputs/Input.js";

export function Search(props){

    props = props || {};

    props.type = "search";

    return Input(props);

}