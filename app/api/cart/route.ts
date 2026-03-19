import { NextResponse } from 'next/server';
import { getCartData } from '../../lib/cart';

export async function GET() {
  const data = await getCartData();
  return NextResponse.json(data);
}
