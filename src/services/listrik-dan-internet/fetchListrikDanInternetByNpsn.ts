export async function fetchListrikDanInternetByNpsn(npsn: string) {
    if (!npsn.trim()) throw new Error("NPSN wajib diisi");

    const res = await fetch(`/api/listrik-dan-internet?npsn=${npsn}`);
    if (res.status === 404) throw new Error("NPSN tidak ditemukan");
    if (!res.ok) throw new Error("Gagal mengambil data");

    const result = await res.json();

    const data = result.data;
    const rowIndex = result.rowIndex;

    if (!result) throw new Error("NPSN tidak ditemukan");

    return [data, rowIndex];
}