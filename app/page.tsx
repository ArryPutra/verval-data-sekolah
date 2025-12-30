"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import TextField from "@/components/TextField";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [npsn, setNpsn] = useState("");
  const [dayaListrik, setDayaListrik] = useState("");
  const [sumberListrik, setSumberListrik] = useState("");
  const [resultRow, setResultRow] = useState<string[] | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  useEffect(() => {
    if (resultRow) {
      setDayaListrik(resultRow[7] || "");
      setSumberListrik(resultRow[8] || "");
    }
  }, [resultRow]);

  async function searchDapodik(npsn: string) {
    setIsLoading(true);

    setErrorMessage("");
    setResultRow(null);

    if (!npsn.trim()) {
      alert("Masukkan NPSN terlebih dahulu.");
      setIsLoading(false);

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
          setErrorMessage(data.message || "NPSN tidak ditemukan");
        }
      } else {
        setErrorMessage(data.error || "Terjadi kesalahan server");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Gagal menghubungi server");
    } finally {
      setIsLoading(false);
    }
  }

  // Di dalam komponen Home (setelah fungsi cari)
  const saveData = async (npsn: string, dayaListrik: string, sumberListrik: string) => {
    // Tampilkan loading atau disable tombol sementara
    const confirmSave = confirm("Apakah Anda yakin ingin menyimpan data ini?");
    if (!confirmSave) return;

    try {
      setIsLoading(true);

      const res = await fetch("/api/update-dapodik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          npsn: npsn, // NPSN dari data yang sudah dicari
          dayaListrik: dayaListrik.trim(),
          sumberListrik: sumberListrik.trim(),
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        alert("Data berhasil disimpan ke Google Sheets!");

        // Update tampilan langsung agar kolom "Daya (Entri)" dan "Sumber listrik (Entri)" berubah
        setResultRow((prev) => {
          if (!prev) return prev;
          const updated = [...prev];
          updated[7] = dayaListrik.trim();
          updated[8] = sumberListrik.trim();
          updated[9] = updated[7] && updated[8] ? "SUDAH" : "BELUM";
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
    } finally {
      setIsLoading(false);
    }
  };

  function SearchDisplay() {
    return (
      <div className="mt-6 w-full">
        {
          errorMessage &&
          <Alert title="Error" message={errorMessage} className="mb-6" variant="error" />
        }

        <TextField
          name="npsn"
          label="NPSN"
          placeholder="Masukkan NPSN"
          inputClassName="placeholder:text-center text-center w-full"
          labelClassName="text-center w-full"
          value={npsn}
          onChange={(e) => setNpsn(e.target.value)}
        />
        <Button label="Cari Data" className="mt-4" onClick={() => searchDapodik(npsn)} isLoading={isLoading} />
      </div>
    );
  }

  function ResultDisplay() {
    return (
      <div className="flex flex-col items-center mt-6 w-full">

        <div className="bg-gray-50 p-4 w-full border-2 border-gray-200 rounded-xl">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-start py-1">Nama Satpen:</td>
                <th className="text-start pl-2">{resultRow?.[0] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">NPSN:</td>
                <th className="text-start pl-2">{resultRow?.[1] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Jenjang:</td>
                <th className="text-start pl-2">{resultRow?.[2] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Kecamatan:</td>
                <th className="text-start pl-2">{resultRow?.[3] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Kabupaten/Kota:</td>
                <th className="text-start pl-2">{resultRow?.[4] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Daya (Dapodik):</td>
                <th className="text-start pl-2">{resultRow?.[5] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Sumber listrik (Dapodik):</td>
                <th className="text-start pl-2">{resultRow?.[6] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Daya (Entri):</td>
                <th className="text-start pl-2">{resultRow?.[7] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Sumber listrik (Entri):</td>
                <th className="text-start pl-2">{resultRow?.[8] || "-"}</th>
              </tr>
              <tr>
                <td className="text-start py-1">Status:</td>
                <th className="text-start pl-2">
                  <div className={`${resultRow?.[9] === "BELUM" ? "bg-red-500" : "bg-green-500"} text-white w-fit px-3 py-1 rounded-full text-sm`}>
                    {resultRow?.[9] || "-"}
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <TextField
          name="daya_listrik"
          placeholder="Masukkan daya listrik"
          label="Daya Listrik"
          className="mt-5"
          value={dayaListrik}
          onChange={(e) => setDayaListrik(e.target.value)}
        />
        <Dropdown
          name="sumber_listrik"
          label="Sumber Listrik"
          className="mt-3"
          options={["PLN", "Diesel", "PLN & Diesel", "Menumpang", "Lainnya"]}
          valueSelected={sumberListrik}
          onChange={(e) => setSumberListrik(e.target.value)} />

        <Button
          label="Simpan Data"
          className="mt-4"
          onClick={() => saveData(npsn, dayaListrik, sumberListrik)}
          isLoading={isLoading}
        />
        <Button
          onClick={() => {
            setNpsn("");
            setIsShowResult(false);
          }}
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

      <div className="flex flex-col items-center bg-white p-6 rounded-xl mt-6 shadow-xl w-fit max-sm:w-full max-sm:h-full overflow-auto sm:my-8">
        <h1 className="font-bold text-xl text-blue-500">
          BPMP Provinsi Kalimantan Selatan
        </h1>
        <p>Verifikasi & Validasi Daya Listrik Sekolah</p>

        {!isShowResult ? SearchDisplay() : ResultDisplay()}
      </div>
    </main>
  );
}
