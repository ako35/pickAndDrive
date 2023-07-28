import ReactInputMask from "react-input-mask-next";
import { utils } from "../../../utils";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomForm = (props) => {
  const {
    asGroup,
    asInput,
    disabled = false,
    floating,
    formik,
    itemsArr = [],
    label,
    name,
    mask,
    placeholder,
    rows,
    type = "text",
    min,
  } = props;

  let properties = {
    ...formik.getFieldProps(name),
    ...utils.functions.validCheck(name, formik),
    disabled,
  };

  if (["text", "date", "month", "time", "number", "email"].includes(type)) {
    properties = {
      ...properties,
      as: asInput === "ReactInputMask" ? ReactInputMask : asInput,
      mask,
      placeholder,
      type,
      min,
    };
  } else if (type === "textarea") {
    properties = {
      ...properties,
      rows,
      as: type,
    };
  }

  switch (type) {
    case "time":
    case "text":
    case "email":
    case "number":
    case "date":
    case "month":
    case "textarea":
      return floating ? (
        <FloatingLabel label={label} className="mb-3">
          <Form.Control {...properties} />
          <Form.Control.Feedback type="invalid">
            {formik.errors[name]}
          </Form.Control.Feedback>
        </FloatingLabel>
      ) : (
        <Form.Group as={asGroup} className="mb-3">
          <Form.Label>{label}</Form.Label>
          <Form.Control {...properties} />
          <Form.Control.Feedback type="invalid">
            {formik.errors[name]}
          </Form.Control.Feedback>
        </Form.Group>
      );
    case "select":
      return (
        <Form.Group as={asGroup} className="mb-3">
          <Form.Label>{label}</Form.Label>
          <Form.Select {...properties}>
            {itemsArr.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      );
    case "checkbox":
      return <>CHECKBOX</>;
    case "radio":
      return <>RADIO</>;
    case "file":
      return <>FILE</>;
    default:
      break;
  }

  return <div>CustomForm</div>;
};

export default CustomForm;
