import { Form, Col } from "react-bootstrap";

function SelectInput({
  options=[],
  defaultSelect="",
  onChange,
  value,
  isValueAdded=false,
  isRoleSelect=false
}) {
  return (
    <Form.Group>
      <Form.Select
        value={value}
        onChange={onChange}
        aria-label="Default select example"
      >
        <option value={""}>{defaultSelect}</option>
        {isValueAdded
          ? (options).map((obj) => (
            <option value={obj?.value} key={obj?.value}>
              {obj.role}
            </option>
          ))
          : isRoleSelect ? (options || []).map((obj) => (
            <option value={obj.AssigningType} key={obj.AssigningType}>
              {obj.AssigningType}
            </option>
          )) :
            (options || []).map((obj, i) => (
              <option value={obj} key={obj + i}>
                {obj}
              </option>))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;
