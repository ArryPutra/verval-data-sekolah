import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import TextField from "@/src/components/TextField";
import { error } from "console";
import { useState } from "react";
import { writeDapodikByNpsn } from "../actions/writeDapodikByNpsn";

type ResultDapodikViewProps = {
    dataDapodikParam: any
    dataDapodikRowIndex: any
    onClear: () => void
}

export default function ResultDapodikView({ dataDapodikParam, dataDapodikRowIndex, onClear }: ResultDapodikViewProps) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [dataDapodik, setDataDapodik] = useState(dataDapodikParam);

    const [dayaEntri, setDayaEntri] = useState(dataDapodikParam["Daya (Entri)"]);
    const [sumberListrikEntri, setSumberListrikEntri] = useState(dataDapodikParam["Sumber Listrik (Entri)"]);
    const [namaKepalaSekolah, setNamaKepalaSekolah] = useState(dataDapodikParam["Nama Kepala Sekolah"]);
    const [nomorTelepon, setNomorTelepon] = useState(dataDapodikParam["Nomor Telepon"]);
    const [internetProvider, setInternetProvider] = useState(dataDapodikParam["Internet Provider"]);
    const [kecepatanInternetMbps, setKecepatanInternetMbps] = useState(dataDapodikParam["Kecepatan Internet (Mbps)"]);

    async function onSave() {
        setErrorMessage("");
        setSuccessMessage("");

        if (!dayaEntri || !sumberListrikEntri || !namaKepalaSekolah || !nomorTelepon || !internetProvider || !kecepatanInternetMbps) {
            setErrorMessage("Mohon lengkapi semua data");
            return;
        }

        const confirmSave = confirm("Apakah Anda yakin ingin menyimpan data ini?");
        if (!confirmSave) return;

        try {
            setIsLoading(true);

            const result = await writeDapodikByNpsn(
                dataDapodikRowIndex,
                dataDapodikParam["NPSN"],
                dayaEntri,
                sumberListrikEntri,
                namaKepalaSekolah,
                nomorTelepon,
                internetProvider,
                kecepatanInternetMbps
            );

            if (!result.error) {
                setDataDapodik((prev: any) => ({
                    ...prev,
                    "Daya (Entri)": dayaEntri,
                    "Sumber Listrik (Entri)": sumberListrikEntri,
                    "Nama Kepala Sekolah": namaKepalaSekolah,
                    "Nomor Telepon": nomorTelepon,
                    "Internet Provider": internetProvider,
                    "Kecepatan Internet (Mbps)": kecepatanInternetMbps
                }));
                setSuccessMessage(result.message);
            } else {
                setErrorMessage(result.error);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">

            <div className="p-3 border my-6 text-start rounded-xl bg-gray-50 border-gray-200 space-y-2
            w-115">
                {
                    Object.entries(dataDapodik).map(([key]) => {
                        return <section key={key} className="flex max-sm:flex-col items-center">
                            <h1 className="w-full">{key}:</h1>
                            {
                                key !== "Status" ?
                                    <p className="font-bold w-full">
                                        {
                                            dataDapodik[key] !== null ?
                                                <span>{dataDapodik[key]}</span>
                                                :
                                                <span>-</span>
                                        }
                                    </p>
                                    :
                                    <p className="font-bold w-full">
                                        <span className={`
                                        ${dataDapodik[key] === "BELUM" ? "bg-red-500" : "bg-green-500"} text-white py-2 px-3 rounded-full text-sm`}>
                                            {dataDapodik[key]}
                                        </span>
                                    </p>
                            }

                        </section>
                    })
                }
            </div>

            <div className="w-full space-y-3">


                <div className="space-y-3">
                    <TextField
                        name="daya"
                        placeholder="Masukkan daya (entri)"
                        label="Daya Saat Ini"
                        value={dayaEntri}
                        onChange={(e) => { setDayaEntri(e.target.value) }} />
                    <Dropdown
                        name="sumber_listrik"
                        label="Sumber Listrik Saat Ini"
                        options={["PLN", "Diesel", "PLN/Diesel", "Tenaga Surya", "Menumpang", "Tidak Ada", "Lainnya"]}
                        valueSelected={sumberListrikEntri}
                        onChange={(e) => { setSumberListrikEntri(e.target.value) }} />
                    <TextField
                        name="nama_kepala_sekolah"
                        placeholder="Masukkan nama kepala sekolah"
                        label="Nama Kepala Sekolah"
                        value={namaKepalaSekolah}
                        onChange={(e) => { setNamaKepalaSekolah(e.target.value) }} />
                    <TextField
                        name="nomor_telepon"
                        placeholder="Masukkan nomor telepon"
                        label="Nomor Telepon"
                        value={nomorTelepon}
                        onChange={(e) => { setNomorTelepon(e.target.value) }} />
                    <TextField
                        name="internet_provider"
                        placeholder="Masukkan internet provider"
                        label="Internet Provider"
                        value={internetProvider}
                        onChange={(e) => { setInternetProvider(e.target.value) }} />
                    <TextField
                        name="kecepatan_internet_mbps"
                        placeholder="Masukkan kecepatan internet (mbps)"
                        label="Kecepatan Internet (Mbps)"
                        value={kecepatanInternetMbps}
                        onChange={(e) => { setKecepatanInternetMbps(e.target.value) }} />

                    {
                        errorMessage &&
                        <Alert
                            title="Pesan Kesalahan:"
                            message={errorMessage}
                            variant="error" />
                    }
                    {
                        successMessage &&
                        <Alert
                            title="Pesan Berhasil:"
                            message={successMessage}
                            variant="success" />
                    }

                </div>

                <Button
                    label="Simpan Data"
                    className="mt-6"
                    isLoading={isLoading}
                    onClick={() => onSave()} />
                <Button
                    label="Kembali"
                    variant="gray"
                    onClick={() => onClear()} />
            </div>

        </div>
    )
}
