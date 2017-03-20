import React from "react";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
} from "react-bootstrap";

export function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function convertFirebaseObjectToArrayOfObjects(obj) {
  if(!obj) {
    return [];
  }
  var array =  Object.keys(obj).map(function (key) {
    var newArrayValue = obj[key];
    newArrayValue['.key'] = key;
    return newArrayValue;
  });

  return array;
}

