export type SmsMessageType =
  | 'HARVEST_CONFIRMATION'
  | 'HARVEST_APPROVAL'
  | 'ANNOUNCEMENT'
  | 'PRICE_UPDATE'
  | 'PICKUP_SCHEDULE'
  | 'ORDER_CONFIRMATION'
  | 'PAYMENT_NOTIFICATION'
  | 'SYNC_FAILURE';

export interface SendSmsOptions {
  recipientPhone: string;
  message: string;
  messageType: SmsMessageType;
  idempotencyKey?: string;
}

export interface SmsResult {
  success: boolean;
  providerMsgId?: string;
  providerStatus?: 'QUEUED' | 'SUBMITTED' | 'DELIVERED' | 'FAILED';
  error?: string;
}

export interface SmsProvider {
  name: string;
  sendSms(options: SendSmsOptions): Promise<SmsResult>;
  getSmsStatus(providerMsgId: string): Promise<SmsResult>;
  validateRecipient(phone: string): boolean;
}

export class MockSmsAdapter implements SmsProvider {
  name = 'MockSmsGateway';

  public async sendSms(options: SendSmsOptions): Promise<SmsResult> {
    if (!this.validateRecipient(options.recipientPhone)) {
      return { success: false, error: 'Invalid recipient phone number format' };
    }
    const mockId = `mock_sms_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.log(`[SMS Gateway Mock] Sent ${options.messageType} to ${options.recipientPhone}: "${options.message}"`);
    return {
      success: true,
      providerMsgId: mockId,
      providerStatus: 'SUBMITTED',
    };
  }

  public async getSmsStatus(providerMsgId: string): Promise<SmsResult> {
    return {
      success: true,
      providerMsgId,
      providerStatus: 'DELIVERED',
    };
  }

  public validateRecipient(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(09|\+639)\d{9}$/.test(cleaned) || /^\+\d{10,14}$/.test(cleaned);
  }
}

export function getSmsProvider(): SmsProvider {
  // Can expand to Semaphore or Twilio based on env vars
  return new MockSmsAdapter();
}

export function createDeviceSmsUrl(recipientPhone: string, message: string): string {
  const cleanPhone = recipientPhone.replace(/[\s\-\(\)]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `sms:${cleanPhone}?body=${encodedMsg}`;
}
