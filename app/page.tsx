"use client";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [npsn, setNpsn] = useState("");
  const [isShowResult, setIsShowResult] = useState(false);

  function cari() {
    if (!npsn.trim()) {
      alert("Masukkan NPSN terlebih dahulu.");
      return;
    }

    setIsShowResult(true);

    console.log("Cari data untuk NPSN:", npsn);
  }

  function SearchForm() {
    return (
      <div className="mt-6">
        <TextField name="npsn" placeholder="Masukkan NPSN" className="placeholder:text-center text-center w-full" onChange={(e) => setNpsn(e.target.value)} />
        <Button label="Cari Data" className="mt-4" onClick={cari} />
      </div>
    );
  }

  function SuccessAction() {
    return (
      <div className="flex flex-col items-center mt-6 w-full">
        <Button label="Simpan Data" />
        <Button onClick={() => setIsShowResult(false)} label="Kembali" variant="gray" className="mt-3" />
      </div>
    )
  }

  return (
    <main className="bg-linear-to-r from-blue-500 to-blue-600 w-full h-screen flex items-center justify-center flex-col text-center">
      <Image src="/images/tut-wuri-handayani.png" alt="Logo Tut Wuri Handayani" width={120} height={120} />

      <div className="flex flex-col items-center bg-white p-6 rounded-xl mt-6 shadow-xl w-md">
        <h1 className="font-bold text-xl text-blue-500">BPMP Provinsi Kalimantan Selatan</h1>
        <p>Verifikasi & Validasi Daya Listrik Sekolah</p>

        {
          !isShowResult
            ? SearchForm()
            : SuccessAction()
        }

      </div>
    </main>
  );


}