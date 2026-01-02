import Alert from '@/src/components/Alert'
import Button from '@/src/components/Button'
import TextField from '@/src/components/TextField'
import { fetchListrikDanInternetByNpsn } from '@/src/services/listrik-dan-internet/fetchListrikDanInternetByNpsn'
import { useEffect, useState } from 'react'

type SearchDapodikViewProps = {
    onResult: (dapodikData: any, dapodikDataRowIndex: any) => void
}

export default function SearchDapodikView({ onResult }: SearchDapodikViewProps) {
    const [npsn, setNpsn] = useState('');
    const [dapodikData, setDapodikData] = useState(null);
    const [dapodikDataRowIndex, setDapodikDataRowIndex] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (dapodikData) {
            onResult(dapodikData, dapodikDataRowIndex!);
        }
    }, [dapodikData, dapodikDataRowIndex]);

    async function onSubmit() {
        // memastikan NPSN tidak kosong
        if (!npsn.trim()) {
            setErrorMessage("NPSN wajib diisi");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const result = await fetchListrikDanInternetByNpsn(npsn);
            setDapodikData(result[0]);
            setDapodikDataRowIndex(result[1]);
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-6 w-full">
            {
                errorMessage &&
                <Alert title="Pesan Kesalahan" message={errorMessage} className="mb-6" variant="error" />
            }

            <TextField
                name="npsn"
                label="NPSN"
                placeholder="Masukkan NPSN"
                inputClassName="placeholder:text-center text-center w-full"
                labelClassName="!text-center w-full"
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)} />

            <Button label="Cari Data" className="mt-4" onClick={() => onSubmit()} isLoading={isLoading} />
        </div>
    )
}
