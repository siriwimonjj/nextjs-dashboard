import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
  const promisePool = mysqlPool.promise()
  const [rows, fields] = await promisePool.query(
    `SELECT animal, SUM(price) AS sumPrice FROM pets GROUP BY animal ORDER BY sumPrice DESC`,
  )

  return NextResponse.json(rows)
}