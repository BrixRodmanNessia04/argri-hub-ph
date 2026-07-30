import { NextResponse } from 'next/server';
import { getSmsProvider } from '@/lib/sms';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipientPhone, message, messageType, idempotencyKey } = body;

    if (!recipientPhone || !message) {
      return NextResponse.json(
        { error: 'Missing required parameters recipientPhone or message' },
        { status: 400 }
      );
    }

    const provider = getSmsProvider();
    if (!provider.validateRecipient(recipientPhone)) {
      return NextResponse.json(
        { error: 'Invalid Philippine or international phone number' },
        { status: 400 }
      );
    }

    const result = await provider.sendSms({
      recipientPhone,
      message,
      messageType: messageType || 'ANNOUNCEMENT',
      idempotencyKey,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'SMS Provider dispatch failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      providerMsgId: result.providerMsgId,
      providerStatus: result.providerStatus,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
