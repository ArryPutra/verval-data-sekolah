import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
    try {
        const { npsn, dayaListrik, sumberListrik } = await req.json();

        // Inisialisasi Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Ambil seluruh data dari sheet untuk mencari index baris NPSN
        const getResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID!,
            range: "Metadata!A:J",
        });

        const rows = getResponse.data.values || [];
        const rowIndex = rows.findIndex((row) => row[1] === npsn);

        if (rowIndex === -1) {
            return NextResponse.json({ error: "NPSN tidak ditemukan" }, { status: 404 });
        }

        // Update kolom H dan I (index 7 dan 8, karena A=0)
        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SHEET_ID!,
            range: `Metadata!H${rowIndex + 1}:I${rowIndex + 1}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[dayaListrik, sumberListrik]],
            },
        });

        return NextResponse.json({ message: "Data berhasil disimpan" });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
