export async function writeDapodikByNpsn(
    dataDapodikRowIndex: any,
    npsn: string,
    daya: string,
    sumberListrik: string,
    namaKepalaSekolah: string,
    nomorTelepon: string,
    internetProvider: string,
    kecepatanInternet: string
) {
    if (!npsn.trim() ||
        !daya ||
        !sumberListrik ||
        !namaKepalaSekolah ||
        !nomorTelepon ||
        !internetProvider ||
        !kecepatanInternet)
        throw new Error("Mohon lengkapi semua data");

    const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dataDapodikRowIndex: dataDapodikRowIndex,
            npsn: npsn,
            daya,
            sumberListrik,
            namaKepalaSekolah,
            nomorTelepon,
            internetProvider,
            kecepatanInternet
        })
    });

    if (!res.ok) throw new Error("Gagal menyimpan data");

    return res.json();
}