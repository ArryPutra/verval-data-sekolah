"use client";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [npsn, setNpsn] = useState("");
  const [isShowResult, setIsShowResult] = useState(false);
  const [resultRow, setResultRow] = useState<string[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [dayaListrik, setDayaListrik] = useState("");
  const [sumberListrik, setSumberListrik] = useState("");

  useEffect(() => {
    if (resultRow) {
      setDayaListrik(resultRow[7] || "");
      setSumberListrik(resultRow[8] || "");
    }
  }, [resultRow]);

  // Cari data
  async function cari() {
    setErrorMsg("");
    setResultRow(null);

    if (!npsn.trim()) {
      alert("Masukkan NPSN terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch("/api/read-dapodik", {
        method: "POST",
        body: JSON.stringify({ npsn }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        if (data.row) {
          setResultRow(data.row);
          setIsShowResult(true);
        } else {
          setErrorMsg(data.message || "NPSN tidak ditemukan");
        }
      } else {
        setErrorMsg(data.error || "Terjadi kesalahan server");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal menghubungi server");
    }
  }

  // Di dalam komponen Home (setelah fungsi cari)
  const saveData = async () => {
    if (!resultRow || !npsn.trim() || !dayaListrik.trim() || !sumberListrik.trim()) {
      alert("Pastikan semua field terisi dengan benar.");
      return;
    }

    // Tampilkan loading atau disable tombol sementara
    const confirmSave = confirm("Apakah Anda yakin ingin menyimpan data ini?");
    if (!confirmSave) return;

    try {
      const res = await fetch("/api/update-dapodik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          npsn: resultRow[1], // NPSN dari data yang sudah dicari
          dayaListrik: dayaListrik.trim(),
          sumberListrik: sumberListrik.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Data berhasil disimpan ke Google Sheets!");

        // Update tampilan langsung agar kolom "Daya (Entri)" dan "Sumber listrik (Entri)" berubah
        setResultRow((prev) => {
          if (!prev) return prev;
          const updated = [...prev];
          updated[7] = dayaListrik.trim();
          updated[8] = sumberListrik.trim();
          return updated;
        });

        // Optional: bisa langsung kembali ke form pencarian
        // setIsShowResult(false);
        // setNpsn("");
      } else {
        alert("Gagal menyimpan: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  function SearchForm() {
    return (
      <div className="mt-6 w-full">
        <TextField
          name="npsn"
          placeholder="Masukkan NPSN"
          inputClassName="placeholder:text-center text-center w-full"
          onChange={(e) => setNpsn(e.target.value)}
        />
        <Button label="Cari Data" className="mt-4" onClick={cari} />

        {errorMsg && <p className="mt-3 text-red-500">{errorMsg}</p>}
      </div>
    );
  }

  function SuccessDisplay() {
    return (
      <div className="flex flex-col items-center mt-6 w-full">
        <div className="bg-gray-100 p-4 w-full border-2 border-gray-200 rounded-xl">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-start">Nama Satpen:</td>
                <th className="text-start pl-2">{resultRow?.[0] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">NPSN:</td>
                <th className="text-start pl-2">{resultRow?.[1] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Jenjang:</td>
                <th className="text-start pl-2">{resultRow?.[2] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Kecamatan:</td>
                <th className="text-start pl-2">{resultRow?.[3] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Kabupaten/Kota:</td>
                <th className="text-start pl-2">{resultRow?.[4] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Daya (Dapodik):</td>
                <th className="text-start pl-2">{resultRow?.[5] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Sumber listrik (Dapodik):</td>
                <th className="text-start pl-2">{resultRow?.[6] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Daya (Entri):</td>
                <th className="text-start pl-2">{resultRow?.[7] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Sumber listrik (Entri):</td>
                <th className="text-start pl-2">{resultRow?.[8] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start">Status:</td>
                <th className="text-start pl-2">{resultRow?.[9] || "-"}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <TextField
          name="daya_listrik"
          placeholder="Masukkan daya listrik"
          label="Daya Listrik"
          className="mt-4"
          value={dayaListrik}
          onChange={(e) => setDayaListrik(e.target.value)}
        />
        <TextField
          name="sumber_listrik"
          placeholder="Masukkan sumber listrik"
          label="Sumber Listrik"
          className="mt-4"
          value={sumberListrik}
          onChange={(e) => setSumberListrik(e.target.value)}
        />

        <Button
          label="Simpan Data"
          className="mt-4"
          onClick={saveData}
          disabled={!dayaListrik.trim() || !sumberListrik.trim() || !resultRow?.[1]}
        />
        <Button
          onClick={() => setIsShowResult(false)}
          label="Kembali"
          variant="gray"
          className="mt-3"
        />
      </div>
    );
  }

  return (
    <main className="bg-linear-to-r from-blue-500 to-blue-600 w-full h-screen flex items-center justify-center flex-col text-center">
      {!isShowResult && (
        <Image
          className="max-sm:mt-6 max-sm:h-24 max-sm:w-24"
          src="/images/tut-wuri-handayani.png"
          alt="Logo Tut Wuri Handayani"
          width={120}
          height={120}
        />
      )}

      <div className="flex flex-col items-center bg-white p-6 rounded-xl mt-6 shadow-xl w-fit max-sm:w-full max-sm:h-full max-sm:overflow-scroll">
        <h1 className="font-bold text-xl text-blue-500">
          BPMP Provinsi Kalimantan Selatan
        </h1>
        <p>Verifikasi & Validasi Daya Listrik Sekolah</p>

        {!isShowResult ? SearchForm() : SuccessDisplay()}
      </div>
    </main>
  );
}
