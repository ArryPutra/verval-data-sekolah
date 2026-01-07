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
            spreadsheetId: process.env.SPREADSHEET_REVITALISASI_PDM_ID!,
            range: "Metadata!A:W",
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
            [headerRow[0]]: "Jenjang",
            [headerRow[1]]: "NPSN",
            [headerRow[2]]: "Nama Satpen",
            [headerRow[3]]: "Menu & Volume",
            [headerRow[4]]: "Kabupaten Kota",
            [headerRow[5]]: "Provinsi",
            [headerRow[6]]: "Sudah PKS",
            [headerRow[7]]: "Sudah Diajukan T1",
            [headerRow[8]]: "Sudah Dicairkan T1",
            [headerRow[9]]: "Sudah Eval T1",
            [headerRow[10]]: "Sudah Diajukan T2",
            [headerRow[11]]: "Sudah Dicairkan T2",
            [headerRow[12]]: "Sudah LPJ Pelaksanaan",
            [headerRow[13]]: "Sudah BAST",
            [headerRow[14]]: "Progres",
            [headerRow[15]]: "Progres (Entri)",
            [headerRow[16]]: "BAST (Entri)",
            [headerRow[17]]: "Link Dokumentasi",
            [headerRow[18]]: "Nama Kepala Sekolah",
            [headerRow[19]]: "Nomor Telepon",
            [headerRow[20]]: "Status",
            [headerRow[21]]: "Link Dokumen BAST",
            [headerRow[22]]: "Timestamp",
        };

        // cari berdasarkan NPSN (kolom index 1)
        const rowIndexInData = dataRows.findIndex(
            row => row[1] === npsn
        );

        if (rowIndexInData === -1) {
            return NextResponse.json(
                { error: "NPSN tidak ditemukan" },
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
            progresEntri,
            bastEntri,
            linkDokumentasi,
            namaKepalaSekolah,
            nomorTelepon,
            linkDokumenBast
        } = await req.json();

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_REVITALISASI_PDM_ID!,
            range: `Metadata!P${dataDapodikRowIndex}:W${dataDapodikRowIndex}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    progresEntri,
                    bastEntri,
                    linkDokumentasi,
                    namaKepalaSekolah,
                    nomorTelepon,
                    null,
                    linkDokumenBast,
                    getDateTimeNow()
                ]],
            },
        });

        return NextResponse.json({ message: "Data berhasil disimpan" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}