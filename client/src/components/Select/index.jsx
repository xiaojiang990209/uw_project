import React, { useState } from 'react';
import BaseSelect from 'react-select';

const Select = (props) => {
  const [selectedRef, setSelectedRef] = useState(null);
  const [value, setValue] = useState(props.value || '');
  const { required, ...rest } = props;

  const noop = () => {}

  const onChange = (value, meta) => {
    props.onChange(value, meta);
    setValue(value);
  }

  return (
    <div>
      <BaseSelect {...rest} ref={setSelectedRef} onChange={onChange}/>
      <input
            tabIndex={-1}
            autoComplete="off"
            style={{
              opacity: 0,
              width: "100%",
              height: 0,
              position: "absolute"
            }}
            value={value}
            onChange={noop}
            onFocus={() => selectedRef.focus()}
            required={required}
          />
    </div>
  );
}

export default Select;
