import { Select } from 'antd';

export default function SelectInput({
  options,
  className,
  value,
  onChange,
  fieldName,
}) {
  return (
    <Select
      optionFilterProp="children"
      onChange={(v) => onChange(v, fieldName)}
      options={options}
      className={className}
      size="large"
      value={value}
    />
  );
}
