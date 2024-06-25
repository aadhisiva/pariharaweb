import { Form, Col } from "react-bootstrap";

function TextInput({ name="", onChange, type="text",  placeholder="", value, controlId="", maxLength, disabled=false, className="" }) {
  return (
    <Form.Group
      className={`${className}`}
      as={Col}
      controlId={controlId}
    >
      <Form.Control
        required
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default TextInput;
