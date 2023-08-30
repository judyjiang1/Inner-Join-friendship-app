function Field(props) {
  const { label, name, type, updateValue, required, autoComplete, value } =
    props;
  const [val, setVal] = useState(value || "");
  const handleChangeChangeVal = (evt) => {
    setVal(evt.target.value.trim());
    if (updateValue) updateValue(evt.target.value.trim());
  };
  return (
    <div className="field">
      <input
        type={type}
        placeholder={label}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={val}
        onChange={handleChangeChangeVal}
      />
    </div>
  );
}

const cultureDropdown = ({ options }) => {
  return (
    <select>
      <option value="" disabled selected>
        Select your cultural background{" "}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
