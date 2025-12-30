type TextFieldProps = {
    name: string;
    inputClassName?: string;
    className?: string;
    placeholder: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: string;
}

export default function TextField({ name, inputClassName, className, placeholder, onChange, label, value }: TextFieldProps) {

    return (
        <div className={`flex flex-col gap-1.5 items-start w-full ${className}`}>
            {label && <label className="font-semibold">{label}</label>}
            {onChange ? (
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`py-2 px-3 outline-none rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 ring-blue-200 w-full ${inputClassName}`}
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    defaultValue={value} // uncontrolled
                    className={`py-2 px-3 outline-none rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 ring-blue-200 w-full ${inputClassName}`}
                />
            )}
        </div>
    )
}
