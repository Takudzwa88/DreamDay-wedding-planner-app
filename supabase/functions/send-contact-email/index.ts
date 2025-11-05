import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, message } = (await req.json()) as ContactMessage;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const recipientEmail = "kanokangatakudzwa@gmail.com";

    const emailBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px; }
      .header { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
      .content { background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 15px; }
      .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
      .value { color: #1f2937; margin-top: 5px; }
      .message-box { background-color: #f3f4f6; padding: 15px; border-left: 4px solid #ec4899; border-radius: 4px; margin-top: 10px; }
      .footer { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">From</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${email}">${email}</a></div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
        </div>
        <div class="footer">
          <p>This message was sent from your wedding planner website contact form.</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `.trim();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "noreply@wedding-planner.app",
        to: recipientEmail,
        subject: `New Contact Message from ${name}`,
        html: emailBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Resend API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        messageId: data.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
