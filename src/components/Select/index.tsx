type SelectProps = {
  options: { id: number; name: string }[]
  name: string
}

const Select = ({ options, name }: SelectProps) => (
  <select name={name}>
    {options.map((item) => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    ))}
  </select>
)

export { Select }
