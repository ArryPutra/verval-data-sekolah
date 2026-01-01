export async function fetchDapodikByNpsn(npsn: string) {
    if (!npsn.trim()) throw new Error("NPSN wajib diisi");

    const res = await fetch("/api");
    if (!res.ok) throw new Error("Gagal mengambil data");

    const allData = await res.json();
    const rowIndex = allData.findIndex((data: any) => data["NPSN"] === npsn);
    const result = allData[rowIndex];

    if (!result) throw new Error("NPSN tidak ditemukan");

    return [result, rowIndex + 2];
}