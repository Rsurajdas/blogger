import { Select } from 'antd';

export default function MultiSelect({
  options,
  className,
  value,
  onChange,
  fieldName,
}) {
  return (
    <Select
      mode="multiple"
      allowClear
      onChange={(v) => onChange(v, fieldName)}
      options={options}
      className={className}
      size="large"
      value={value}
    />
  );
}
