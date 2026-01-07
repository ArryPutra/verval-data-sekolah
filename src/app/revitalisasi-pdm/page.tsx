"use client";

import Image from "next/image";
import { useState } from "react";
import SearchDapodikView from "./screens/SearchDapodikView";
import ResultDapodikView from "./screens/ResultDapodikView";

export default function RevitalisasiPdmPage() {
    const [dataDapodik, setDataDapodik] = useState(null);
    const [dataDapodikRowIndex, setDataDapodikRowIndex] = useState(null);

    return (
        <main className="bg-linear-to-r from-blue-500 to-blue-600 w-full h-screen flex items-center justify-center flex-col text-center p-8">
            {
                !dataDapodik && <Image
                    className="max-sm:mt-6 max-sm:h-24 max-sm:w-24 mb-8"
                    src="/images/tut-wuri-handayani.png"
                    alt="Logo Tut Wuri Handayani"
                    width={120}
                    height={120}
                />
            }


            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl 
            w-fit overflow-auto max-sm:w-full">
                <h1 className="font-bold text-xl text-blue-500">
                    BPMP Provinsi Kalimantan Selatan
                </h1>
                <p>Verifikasi & Validasi Revitalisasi Satuan Pendidikan</p>

                {
                    dataDapodik === null ?
                        // jika data dapodik belum ada
                        <SearchDapodikView
                            onResult={(dataDapodik, dataDapodikRowIndex) => {
                                setDataDapodik(dataDapodik)
                                setDataDapodikRowIndex(dataDapodikRowIndex)
                            }} />
                        :
                        // jika data dapodik sudah ada
                        <ResultDapodikView
                            dataDapodikParam={dataDapodik}
                            dataDapodikRowIndex={dataDapodikRowIndex!}
                            onClear={() => setDataDapodik(null)} />
                }
            </div>
        </main>
    );
}
