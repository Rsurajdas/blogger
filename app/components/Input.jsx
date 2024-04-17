export default function Input({
  value,
  onChange,
  className,
  type,
  id,
  textArea = false,
  col,
  rows,
}) {
  return (
    <>
      {' '}
      {!textArea ? (
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className={className}
        />
      ) : (
        <textarea
          name={id}
          id={id}
          cols={col}
          rows={rows}
          value={value}
          onChange={onChange}
          className={className}
        ></textarea>
      )}
    </>
  );
}
