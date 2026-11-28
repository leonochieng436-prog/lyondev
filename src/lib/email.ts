type AdminNotification = {
  subject: string;
  text: string;
};

export async function sendAdminNotification({ subject, text }: AdminNotification): Promise<void> {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFY_EMAIL) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      console.error("Admin notification email failed:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Admin notification email could not be sent:", error);
  }
}
