type DropdownProps = {
    name: string;
    label?: string;
    options: string[];
    valueSelected?: string;
    className?: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function Dropdown({
    name,
    label,
    options,
    valueSelected,
    className,
    onChange
}: DropdownProps) {

    const safeValue =
        valueSelected && options.includes(valueSelected)
            ? valueSelected
            : '';

    return (
        <div className={`flex flex-col gap-1.5 items-start w-full ${className}`}>
            {label && <label className="font-semibold">{label}</label>}

            <select
                name={name}
                value={safeValue}
                onChange={onChange}
                className="py-2 px-3 outline-none rounded-lg border-2 border-gray-300
                   focus:border-blue-500 focus:ring-2 ring-blue-200 w-full"
            >
                <option value="" disabled hidden>
                    Pilih {label}
                </option>

                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
