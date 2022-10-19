export default function handleChange(inputObj, e) {
    inputObj = {...inputObj};
    inputObj[e.target.name] = e.target.value;
    return inputObj;
}