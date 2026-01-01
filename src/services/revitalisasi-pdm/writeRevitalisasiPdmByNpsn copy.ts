export async function writeRevitalisasiPdmByNpsn(
    dataDapodikRowIndex: any,
    progresEntri: string,
    bastEntri: string,
    linkDokumentasi: string,
    namaKepalaSekolah: string,
    nomorTelepon: string
) {
    if (!progresEntri || !bastEntri || !linkDokumentasi || !namaKepalaSekolah || !nomorTelepon)
        throw new Error("Mohon lengkapi semua data");

    const res = await fetch("/api/revitalisasi-pdm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dataDapodikRowIndex,
            progresEntri,
            bastEntri,
            linkDokumentasi,
            namaKepalaSekolah,
            nomorTelepon
        })
    });

    if (!res.ok) throw new Error("Gagal menyimpan data");

    return res.json();
}