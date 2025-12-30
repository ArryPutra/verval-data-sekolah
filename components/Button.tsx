import Image from "next/image";
import Link from "next/link";
import React from "react";

type ButtonProps = {
    label: String;
    href?: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    variant?: "primary" | "gray";
<<<<<<< HEAD
}

export default function Button({ label, href, className, onClick, disabled = false, variant = "primary" }: ButtonProps) {
    let baseClass = `bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer text-white w-full ${className}`;
=======
    isLoading?: boolean;
}

export default function Button({ label, href, className, onClick, disabled = false, variant = "primary", isLoading = false }: ButtonProps) {
    let baseClass = `bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer text-white w-full flex items-center justify-center gap-2 ${className}`;
>>>>>>> dev

    if (variant === "gray") {
        baseClass += " bg-gray-200 !text-black hover:bg-gray-300";
    }

    if (href) {
        return (
            <Link href={href} className={baseClass} target="_blank">
                {label}
            </Link>
        )
    } else {
        return (
            <button className={baseClass} onClick={onClick} disabled={disabled}>
                {label}
<<<<<<< HEAD
=======
                {
                    isLoading && (
                        <Image
                            src="/animation/spinner.svg"
                            alt="loading"
                            width={20}
                            height={20}
                        />
                    )
                }
>>>>>>> dev
            </button>
        )
    }
}