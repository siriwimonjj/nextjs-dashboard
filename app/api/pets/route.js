import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
  const promisePool = mysqlPool.promise();
  const [rows, fields] = await promisePool.query(
    `SELECT * FROM pets`,
  );
  return NextResponse.json(rows);
}

export async function POST(request) {
  const { date, animal, price } = await request.json();
  
  try {
    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
      `INSERT INTO pets (date, animal, price) VALUES (?, ?, ?)`,
      [date, animal, price]
    );

    return NextResponse.json({ success: true, insertedId: result.insertId });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ success: false, error: "Failed to insert data" }, { status: 500 });
  }
}
