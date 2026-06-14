import { Input } from "../inputs/Input.js";

export function Number(props){

    props = props || {};

    props.type = "number";

    return Input(props);

}