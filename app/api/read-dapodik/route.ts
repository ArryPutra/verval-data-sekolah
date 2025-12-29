import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
    try {
        const { npsn } = await req.json();
        if (!npsn) return NextResponse.json({ error: 'NPSN wajib diisi' }, { status: 400 });

        const sheets = google.sheets({
            version: 'v4',
            auth: new google.auth.GoogleAuth({
                credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!),
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            })
        });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID!,
            range: 'Metadata!A:J',
        });

        const rows = response.data.values || [];
        const result = rows.find(row => row[1] === npsn);

        if (!result) return NextResponse.json({ message: 'NPSN tidak ditemukan' });

        return NextResponse.json({ row: result });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
