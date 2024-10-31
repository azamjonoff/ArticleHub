// flowbite
import { Label, TextInput } from "flowbite-react";

export default function FormTextInput({ name, label, placeholder }) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <TextInput id={name} name={name} placeholder={placeholder} required />
    </div>
  );
}
