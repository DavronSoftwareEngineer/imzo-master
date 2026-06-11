const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export interface Lead {
  name: string;
  phone: string;
  email?: string;
}

/** True when the bot token and admin chat id are present in the build env. */
export function isTelegramConfigured(): boolean {
  return Boolean(TOKEN && CHAT_ID);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Sends a lead to the admin's personal Telegram via the bot.
 * The admin must have started the bot once so it can message them.
 */
export async function sendLeadToTelegram(lead: Lead): Promise<void> {
  if (!TOKEN || !CHAT_ID) {
    throw new Error('Telegram is not configured (missing VITE_TELEGRAM_* env vars)');
  }

  const lines = [
    '🪟 <b>Yangi soʻrov / Новая заявка</b>',
    '',
    `👤 <b>Ism / Имя:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Tel:</b> ${escapeHtml(lead.phone)}`,
  ];
  if (lead.email?.trim()) {
    lines.push(`✉️ <b>Email:</b> ${escapeHtml(lead.email.trim())}`);
  }
  lines.push('', `🌐 ${escapeHtml(window.location.origin)}`);

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.description || `Telegram error ${res.status}`);
  }
}
