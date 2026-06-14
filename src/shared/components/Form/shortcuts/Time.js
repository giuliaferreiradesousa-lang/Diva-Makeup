import { Input } from "../inputs/Input.js";

export function Time(props){

    props = props || {};

    props.type = "time";

    return Input(props);

}