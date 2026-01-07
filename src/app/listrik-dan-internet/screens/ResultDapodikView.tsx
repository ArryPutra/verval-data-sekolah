import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import TextField from "@/src/components/TextField";
import { useState } from "react";
import { maskText } from "@/src/utils/maskText";
import { writeListrikDanInternetByNpsn } from "@/src/services/listrik-dan-internet/writeListrikDanInternetByNpsn";
import Link from "next/link";

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
    const [kepemilikanTanah, setKepemilikanTanah] = useState(dataDapodikParam["Kepemilikan Tanah"]);
    const [buktiKepemilikanTanah, setBuktiKepemilikanTanah] = useState(dataDapodikParam["Bukti Kepemilikan Tanah"]);

    const [isUserSecretTyping, setIsUserSecretTyping] = useState(false);

    console.log(dataDapodikParam);

    async function onSave() {
        setErrorMessage("");
        setSuccessMessage("");

        if (!dayaEntri ||
            !sumberListrikEntri ||
            !namaKepalaSekolah ||
            !nomorTelepon ||
            !internetProvider ||
            !kecepatanInternetMbps ||
            !kepemilikanTanah ||
            !buktiKepemilikanTanah
        ) {
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
                kecepatanInternetMbps,
                kepemilikanTanah,
                buktiKepemilikanTanah
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
                    "Status": "SUDAH",
                    "Kepemilikan Tanah": kepemilikanTanah,
                    "Bukti Kepemilikan Tanah": buktiKepemilikanTanah
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
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Kepemilikan Tanah:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Kepemilikan Tanah"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Kepemilikan Tanah"] ?? "Kosong"}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Bukti Kepemilikan Tanah:</h1>
                    <p className={`w-full font-bold ${dataDapodik["Bukti Kepemilikan Tanah"] ? "text-black" : "text-red-500"}`}>{dataDapodik["Bukti Kepemilikan Tanah"] ?? "Kosong"}</p>
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
                    placeholder="Masukkan daya listrik"
                    label="Daya Listrik"
                    value={dayaEntri}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setDayaEntri(value)
                    }} />
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
                    placeholder="contoh: 08123456789 (tanpa +/-)"
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
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        isUserSecretTyping &&
                            setNomorTelepon(value)
                    }
                    } />
                <Dropdown
                    name="internet_provider"
                    label="Internet Provider (Wi-Fi)"
                    options={[
                        "IndiHome",
                        "Biznet",
                        "First Media",
                        "MyRepublic",
                        "CBN",
                        "MNC Play",
                        "Oxygen.id",
                        "Iconnet (PLN)",
                        "Indosat HiFi",
                        "XL Satu Fiber",
                        "Telkomsel Orbit",
                        "Net1",
                        "Moratel (ISP lokal)",
                        "Starlink",
                        "Ameera Network",
                        "FiberNet",
                        "Telkomsel",
                        "Indosat Ooredoo Hutchison",
                        "XL Axiata",
                        "Smartfren",
                        "Tri (3)",
                        "Tidak Ada",
                        "Lainnya",
                    ]}
                    valueSelected={internetProvider}
                    onChange={(e) => {
                        if (e.target.value === "Tidak Ada") {
                            setKecepatanInternetMbps("0");
                        } else {
                            setKecepatanInternetMbps("")
                        }
                        setInternetProvider(e.target.value)
                    }} />
                <TextField
                    name="kecepatan_internet_mbps"
                    placeholder="Contoh: 30, 24.5"
                    label="Kecepatan Internet (Download Mbps)"
                    value={kecepatanInternetMbps}
                    onChange={(e) => {
                        const value = e.target.value
                            .replace(/[^0-9.]/g, "")     // hanya angka & titik
                            .replace(/(\..*)\./g, "$1");
                        if (internetProvider === "Tidak Ada") {
                            setKecepatanInternetMbps("0");
                        } else {
                            value !== "0" &&
                                setKecepatanInternetMbps(value)
                        }
                    }} />
                <div className="w-full text-start text-xs opacity-70 -mt-1.5">
                    Cek kecepatan internet melalui:
                    <Link href="https://www.speedtest.net/"
                        target="_blank"
                        className="text-blue-500 hover:underline ml-1">
                        https://www.speedtest.net/
                    </Link>
                </div>
                <Dropdown
                    name="kepemilikan_tanah"
                    label="Kepemilikan Tanah"
                    options={[
                        "Milik",
                        "Sewa",
                        "Pinjam",
                        "Bukan Milik"
                    ]}
                    valueSelected={kepemilikanTanah}
                    onChange={(e) => { setKepemilikanTanah(e.target.value) }} />
                <Dropdown
                    name="bukti_kepemilikan_tanah"
                    label="Bukti Kepemilikan Tanah"
                    options={[
                        "Sertifikat Hak Milik / HGB",
                        "Akta Jual Beli",
                        "Surat Hibah",
                        "Berita Acara Serah Terima Aset",
                        "Dokumen Penetapan BMN / BMD",
                        "Surat Perjanjian Sewa",
                        "Surat Perjanjian Pinjam Pakai",
                        "Nota Kesepahaman(MoU)",
                        "Surat Izin Penggunaan",
                        "Tidak Ada Dokumen"
                    ]}
                    valueSelected={buktiKepemilikanTanah}
                    onChange={(e) => { setBuktiKepemilikanTanah(e.target.value) }} />

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
