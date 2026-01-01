export async function writeListrikDanInternetByNpsn(
    dataDapodikRowIndex: any,
    daya: string,
    sumberListrik: string,
    namaKepalaSekolah: string,
    nomorTelepon: string,
    internetProvider: string,
    kecepatanInternet: string
) {
    if (!daya ||
        !sumberListrik ||
        !namaKepalaSekolah ||
        !nomorTelepon ||
        !internetProvider ||
        !kecepatanInternet)
        throw new Error("Mohon lengkapi semua data");

    const res = await fetch("/api/listrik-dan-internet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dataDapodikRowIndex: dataDapodikRowIndex,
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