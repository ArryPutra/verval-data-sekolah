type AlertProps = {
    className?: string;
    variant: "error" | "success";
    title: String;
    message: String;
}

export default function Alert({ className, variant, title, message }: AlertProps) {
    let baseClass = `px-4 py-3 border-2 rounded-xl text-start ${className} `;

    if (variant == "error") {
        baseClass += "bg-red-100 text-red-500 border-red-200";
    } else if (variant == "success") {
        baseClass += "bg-green-100 text-green-500 border-green-200";
    }

    return (
        <div className={baseClass}>
            <h1 className='font-bold'>{title}</h1>
            <p className='text-sm'>{message}</p>
        </div>
    )
}
