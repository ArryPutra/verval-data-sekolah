import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
    try {
        const { npsn } = await req.json();

        if (!npsn) {
            return NextResponse.json({ error: 'NPSN wajib diisi' }, { status: 400 });
        }

        // Auth menggunakan Service Account
        const auth = await google.auth.getClient({
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Ambil seluruh kolom A:J untuk semua baris
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Metadata!A:J'
        });

        const rows = response.data.values || [];

        // Cari baris yang mengandung NPSN
        const result = rows.find(row => row[1] === npsn); // kolom B adalah NPSN

        if (!result) {
            return NextResponse.json({ message: 'NPSN tidak ditemukan' });
        }

        return NextResponse.json({ row: result });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
