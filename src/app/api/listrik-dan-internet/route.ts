import getDateTimeNow from "@/src/utils/getDateTimeNow";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const npsn = searchParams.get("npsn");

        if (!npsn) {
            return NextResponse.json(
                { error: "Parameter npsn wajib diisi" },
                { status: 400 }
            );
        }

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_LISTRIK_DAN_INTERNET_ID!,
            range: "Metadata!A:U",
        });

        const rows = response.data.values;
        if (!rows || rows.length < 2) {
            return NextResponse.json(
                { error: "Data tidak ditemukan" },
                { status: 404 }
            );
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
            [headerRow[14]]: "Kepemilikan Tanah",
            [headerRow[15]]: "Bukti Kepemilikan Tanah",
            [headerRow[16]]: "Ket Daya",
            [headerRow[17]]: "Ket Sumber",
            [headerRow[18]]: "Keterangan",
            [headerRow[19]]: "Rekomendasi",
            [headerRow[20]]: "Timestamp",
        };

        // cari berdasarkan NPSN (kolom index 1)
        const rowIndexInData = dataRows.findIndex(
            row => row[1] === npsn
        );

        if (rowIndexInData === -1) {
            return NextResponse.json(
                { message: "NPSN tidak ditemukan" },
                { status: 404 }
            );
        }

        const foundRow = dataRows[rowIndexInData];

        const data: Record<string, string | null> = {};

        headerRow.forEach((header, index) => {
            const key = headerMapping[header];
            const value = foundRow[index]?.trim();
            data[key] = value ? value : null;
        });

        return NextResponse.json({
            data,
            rowIndex: rowIndexInData + 2 // +1 header, +1 1-based index
        });
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
        const {
            dataDapodikRowIndex,
            daya,
            sumberListrik,
            namaKepalaSekolah,
            nomorTelepon,
            internetProvider,
            kecepatanInternet,
            kepemilikanTanah,
            buktiKepemilikanTanah
        } = await req.json();

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_LISTRIK_DAN_INTERNET_ID!,
            range: `Metadata!H${dataDapodikRowIndex}:U${dataDapodikRowIndex}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    daya,
                    sumberListrik,
                    namaKepalaSekolah,
                    nomorTelepon,
                    internetProvider,
                    kecepatanInternet,
                    null,
                    kepemilikanTanah,
                    buktiKepemilikanTanah,
                    null,
                    null,
                    null,
                    null,
                    getDateTimeNow(),
                ]],
            },
        });

        return NextResponse.json({ message: "Data berhasil disimpan" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
