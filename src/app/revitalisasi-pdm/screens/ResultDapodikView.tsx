import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import TextField from "@/src/components/TextField";
import { useState } from "react";
import { maskText } from "@/src/utils/maskText";
import { writeRevitalisasiPdmByNpsn } from "@/src/services/revitalisasi-pdm/writeRevitalisasiPdmByNpsn copy";

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

    const [isUserSecretTyping, setIsUserSecretTyping] = useState(false);

    const [progresEntri, setProgresEntri] = useState(dataDapodik["Progres (Entri)"]);
    const [bastEntri, setBastEntri] = useState(dataDapodik["BAST (Entri)"]);
    const [linkDokumentasi, setLinkDokumentasi] = useState(dataDapodik["Link Dokumentasi"]);
    const [namaKepalaSekolah, setNamaKepalaSekolah] = useState(dataDapodik["Nama Kepala Sekolah"]);
    const [nomorTelepon, setNomorTelepon] = useState(dataDapodik["Nomor Telepon"]);

    async function onSave() {
        setErrorMessage("");
        setSuccessMessage("");

        if (!progresEntri || !bastEntri || !linkDokumentasi || !namaKepalaSekolah || !nomorTelepon) {
            setErrorMessage("Mohon lengkapi semua data");
            return;
        }

        const confirmSave = confirm("Apakah Anda yakin ingin menyimpan data ini?");
        if (!confirmSave) return;

        try {
            setIsLoading(true);

            const result = await writeRevitalisasiPdmByNpsn(
                dataDapodikRowIndex,
                progresEntri,
                bastEntri,
                linkDokumentasi,
                namaKepalaSekolah,
                nomorTelepon
            );

            if (!result.error) {
                setDataDapodik((prev: any) => ({
                    ...prev,
                    "Progres (Entri)": progresEntri,
                    "BAST (Entri)": bastEntri,
                    "Link Dokumentasi": linkDokumentasi,
                    "Nama Kepala Sekolah": namaKepalaSekolah,
                    "Nomor Telepon": nomorTelepon,
                    "Status": "Sudah Mengisi"
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
                    <h1 className="w-full">Jenjang:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Jenjang"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">NPSN:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["NPSN"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nama Satpen:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Nama Satpen"]}</p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Kabupaten/Kota:</h1>
                    <p className="w-full font-bold">{dataDapodikParam["Kabupaten Kota"]}</p>
                </section>

                <h1 className="font-bold text-blue-500 mt-6">Data Terbaru</h1>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Progres (%):</h1>
                    <p className="w-full font-bold">
                        {dataDapodik["Progres (Entri)"] ??
                            <span className="text-red-500">Kosong</span>
                        }
                    </p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Sudah BAST:</h1>
                    <p className="w-full font-bold">
                        {dataDapodik["BAST (Entri)"] ??
                            <span className="text-red-500">Kosong</span>
                        }
                    </p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Link Dokumentasi:</h1>
                    <p className="w-full font-bold">
                        {dataDapodik["Link Dokumentasi"] ??
                            <span className="text-red-500">Kosong</span>
                        }
                    </p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nama Kepala Sekolah:</h1>
                    <p className="w-full font-bold">
                        {dataDapodik["Nama Kepala Sekolah"] ??
                            <span className="text-red-500">Kosong</span>
                        }
                    </p>
                </section>
                <section className="flex max-sm:flex-col items-start">
                    <h1 className="w-full">Nomor Telepon:</h1>
                    <p className="w-full font-bold">
                        {maskText(dataDapodik["Nomor Telepon"]) ??
                            <span className="text-red-500">Kosong</span>
                        }
                    </p>
                </section>

                <section className="flex max-sm:flex-col items-start h-fit max-sm:gap-1">
                    <h1 className="w-full">Status Data:</h1>
                    <p className="w-full h-fit flex text-sm">
                        {
                            dataDapodik["Status"] === "Belum Mengisi" ?
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

            <div className="w-full space-y-3 mt-4">

                <div className="space-y-3">


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

                <div className="mt-4 space-y-3">
                    <TextField
                        name="progres_entri"
                        placeholder="Masukkan progres"
                        label="Progres (%)"
                        value={progresEntri}
                        onChange={(e) => setProgresEntri(e.target.value)} />
                    <Dropdown
                        name="bast_entri"
                        label="Sudah BAST?"
                        options={["YA", "TIDAK"]}
                        valueSelected={bastEntri}
                        onChange={(e) => setBastEntri(e.target.value)} />
                    <TextField
                        name="link_dokumentasi"
                        placeholder="Masukkan link dokumentasi"
                        label="Link Dokumentasi"
                        value={linkDokumentasi}
                        onChange={(e) => setLinkDokumentasi(e.target.value)} />
                    <TextField
                        name="nama_kepala_sekolah"
                        placeholder="Masukkan nama kepala sekolah"
                        label="Nama Kepala Sekolah"
                        value={namaKepalaSekolah}
                        onChange={(e) => setNamaKepalaSekolah(e.target.value)} />
                    <TextField
                        name="nomor_telepon"
                        placeholder="Masukkan nomor telepon"
                        label="Nomor Telepon"
                        value={
                            isUserSecretTyping ?
                                nomorTelepon
                                : maskText(nomorTelepon)}
                        onChange={(e) => {
                            setIsUserSecretTyping(true);
                            setNomorTelepon("")
                            isUserSecretTyping &&
                                setNomorTelepon(e.target.value)
                        }} />
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
