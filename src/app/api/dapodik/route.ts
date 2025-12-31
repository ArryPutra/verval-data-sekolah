import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID!,
            range: "Metadata!A:N",
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { error: "Data tidak ditemukan" },
                { status: 404 }
            )
        }

        const [headerRow, ...dataRows] = rows;

        const headerMapping: Record<string, string> = {
            [headerRow[0]]: "Nama Satpen",
            [headerRow[1]]: "NPSN",
            [headerRow[2]]: "Jenjang",
            [headerRow[3]]: "Kecamatan",
            [headerRow[4]]: "Kabupaten Kota",
            [headerRow[5]]: "Daya (Dapodik)",
            [headerRow[6]]: "Sumber Listrik (Dapodik)",
            [headerRow[7]]: "Daya (Entri)",
            [headerRow[8]]: "Sumber Listrik (Entri)",
            [headerRow[9]]: "Nama Kepala Sekolah",
            [headerRow[10]]: "Nomor Telepon",
            [headerRow[11]]: "Internet Provider",
            [headerRow[12]]: "Kecepatan Internet (Mbps)",
            [headerRow[13]]: "Status",
        };

        const result = dataRows.map((row) => {
            const obj: Record<string, string | null> = {};

            headerRow.forEach((header, index) => {
                const key = headerMapping[header];

                if (row[index].trim() == '') {
                    obj[key] = row[index] = null
                } else {
                    obj[key] = row[index];
                }
            });

            return obj;
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { dataDapodikRowIndex, npsn, daya, sumberListrik, namaKepalaSekolah, nomorTelepon, internetProvider, kecepatanInternet } = await req.json();

        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID!,
            range: `Metadata!H${dataDapodikRowIndex}:M${dataDapodikRowIndex}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[daya, sumberListrik, namaKepalaSekolah, nomorTelepon, internetProvider, kecepatanInternet]],
            },
        });

        return NextResponse.json({ message: "Data berhasil disimpan" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
