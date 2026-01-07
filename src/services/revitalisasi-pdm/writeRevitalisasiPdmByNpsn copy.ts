export async function writeRevitalisasiPdmByNpsn(
    dataDapodikRowIndex: any,
    progresEntri: string,
    bastEntri: string,
    linkDokumentasi: string,
    namaKepalaSekolah: string,
    nomorTelepon: string,
    linkDokumenBast: string
) {
    if (!progresEntri ||
        !bastEntri ||
        !linkDokumentasi ||
        !namaKepalaSekolah ||
        !nomorTelepon ||
        !linkDokumenBast)
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
            nomorTelepon,
            linkDokumenBast
        })
    });

    if (!res.ok) throw new Error("Gagal menyimpan data");

    return res.json();
}