"use client";

import Image from "next/image";
import Button from "../components/Button";

export default function Home() {

    return (
        <div className="w-full h-screen flex items-center justify-center 
        flex-col text-center p-8 bg-linear-to-r from-blue-500 to-blue-600">
            <Image
                className="max-sm:mt-6 max-sm:h-24 max-sm:w-24 mb-8"
                src="/images/tut-wuri-handayani.png"
                alt="Logo Tut Wuri Handayani"
                width={120}
                height={120}
            />

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl 
            w-fit overflow-auto max-sm:w-full">
                <h1 className="font-bold text-xl text-blue-500">
                    BPMP Provinsi Kalimantan Selatan
                </h1>
                <p>Verifikasi & Validasi Data Sekolah</p>

                <div className="flex flex-col gap-2 mt-6 w-full">
                    <Button
                        label="Listrik, Internet dan Lahan"
                        href="/listrik-dan-internet" />
                    <Button
                        label="Revitalisasi Satuan Pendidikan"
                        href="/revitalisasi-pdm" />
                </div>
            </div>
        </div>
    );
}
