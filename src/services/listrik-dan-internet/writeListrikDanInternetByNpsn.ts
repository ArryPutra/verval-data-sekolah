export async function writeListrikDanInternetByNpsn(
    dataDapodikRowIndex: any,
    daya: string,
    sumberListrik: string,
    namaKepalaSekolah: string,
    nomorTelepon: string,
    internetProvider: string,
    kecepatanInternet: string,
    kepemilikanTanah: String,
    buktiKepemilikanTanah: String
) {
    if (!daya ||
        !sumberListrik ||
        !namaKepalaSekolah ||
        !nomorTelepon ||
        !internetProvider ||
        !kecepatanInternet ||
        !kepemilikanTanah ||
        !buktiKepemilikanTanah)
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
            kecepatanInternet,
            kepemilikanTanah,
            buktiKepemilikanTanah
        })
    });

    if (!res.ok) throw new Error("Gagal menyimpan data");

    return res.json();
}