import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import TextField from "@/src/components/TextField";
import { useState } from "react";
import { maskText } from "@/src/utils/maskText";
import { writeListrikDanInternetByNpsn } from "@/src/services/listrik-dan-internet/writeListrikDanInternetByNpsn";

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

    const [isUserSecretTyping, setIsUserSecretTyping] = useState(false);

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

            const result = await writeListrikDanInternetByNpsn(
                dataDapodikRowIndex,
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
                    "Kecepatan Internet (Mbps)": kecepatanInternetMbps,
                    "Status": "SUDAH"
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

            <div className="p-3 border mt-6 text-start rounded-xl bg-gray-50 border-gray-200 space-y-1.5">
                <h1 className="font-bold text-blue-500">Profil Satpen</h1>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nama Satpen:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Nama Satpen"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">NPSN:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["NPSN"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Jenjang:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Jenjang"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Kecamatan:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Kecamatan"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Kabupaten/Kota:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Kabupaten Kota"]}</p>
                </section>

                {/* <h1 className="font-bold text-blue-500 mt-6">Data (Dapodik)</h1>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Daya Listrik (Dapodik):</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Daya (Dapodik)"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Sumber Listrik (Dapodik):</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Sumber Listrik (Dapodik)"]}</p>
                </section> */}

                <h1 className="font-bold text-blue-500 mt-6">Data Terbaru</h1>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Daya Listrik:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Daya (Entri)"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Daya (Entri)"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Sumber Listrik:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Sumber Listrik (Entri)"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Sumber Listrik (Entri)"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nama Kepala Sekolah:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Nama Kepala Sekolah"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Nama Kepala Sekolah"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nomor Telepon:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Nomor Telepon"] ? "text-black" : "text-red-500"}`}>{maskText(dataDapodik["Nomor Telepon"]) ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Internet Provider:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Internet Provider"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Internet Provider"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Kecepatan Internet (Mbps):</h1>
                    <p className={`w-full font-bold ${dataDapodik["Kecepatan Internet (Mbps)"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Kecepatan Internet (Mbps)"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start h-fit max-sm:gap-1">
                    <h1 className="w-full">Status Data:</h1>
                    <p className="w-full h-fit flex text-sm">
                        {
                            dataDapodik["Status"] === "BELUM" ?
                                <span className="bg-red-500 text-white w-fit font-semibold py-1 px-3 rounded-full">
                                    Belum
                                </span>
                                :
                                <span className="bg-green-500 text-white w-fit font-semibold py-1 px-3 rounded-full">
                                    Sudah
                                </span>
                        }

                    </p>
                </section>
            </div>


            <div className="space-y-3 mt-4">
                <TextField
                    name="daya"
                    placeholder="Masukkan daya (entri)"
                    label="Daya Listrik"
                    value={dayaEntri}
                    onChange={(e) => { setDayaEntri(e.target.value) }} />
                <Dropdown
                    name="sumber_listrik"
                    label="Sumber Listrik"
                    options={["PLN", "Diesel", "PLN & Diesel", "Tenaga Surya", "Menumpang", "Tidak Ada", "Lainnya"]}
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
                    value={
                        isUserSecretTyping ?
                            nomorTelepon
                            :
                            maskText(nomorTelepon)
                    }
                    onChange={(e) => {
                        setIsUserSecretTyping(true);
                        setNomorTelepon("")
                        isUserSecretTyping &&
                            setNomorTelepon(e.target.value)
                    }
                    } />
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
                className="mt-4"
                onClick={() => onClear()} />

        </div>
    )
}
