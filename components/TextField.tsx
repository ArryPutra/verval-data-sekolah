type TextFieldProps = {
    name: string;
    className?: string;
    placeholder: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}


export default function TextField({ name, className, placeholder, onChange }: TextFieldProps) {
    let baseClass = `border py-2 px-3 outline-none rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 ring-blue-200 ${className}`;

    return (
        <input type="text" name={name} placeholder={placeholder} className={baseClass} onChange={onChange} />
    )
}
