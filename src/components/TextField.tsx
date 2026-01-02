type TextFieldProps = {
    name: string;
    inputClassName?: string;
    labelClassName?: string;
    className?: string;
    placeholder: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: string;
    errorMessage?: string;
}

export default function TextField({
    name,
    inputClassName,
    labelClassName,
    className,
    placeholder,
    onChange,
    label,
    value,
    errorMessage,
}: TextFieldProps) {

    return (
        <div className={`flex flex-col items-start w-full ${className}`}>
            {label && <label className={`font-semibold text-start ${labelClassName}`}>{label}</label>}
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={onChange}
                className={`py-2 px-3 outline-none rounded-lg border-2 border-gray-300 mt-1.5
                    focus:border-blue-500 focus:ring-2 ring-blue-200 w-full duration-150
                    ${inputClassName}`}
            />
            {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
        </div>
    )
}
