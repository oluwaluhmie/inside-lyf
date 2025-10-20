import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterConfirmationRequest {
  email: string;
  unsubscribeToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, unsubscribeToken }: NewsletterConfirmationRequest = await req.json();

    console.log("Sending newsletter confirmation to:", email);

    const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/newsletter/unsubscribe?token=${unsubscribeToken}`;

    const emailResponse = await resend.emails.send({
      from: "Community <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Our Community Newsletter! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
              .content { padding: 40px 30px; }
              .content h2 { color: #10b981; font-size: 22px; margin-top: 0; }
              .content p { margin: 16px 0; color: #555; }
              .benefits { background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 24px 0; }
              .benefits ul { margin: 8px 0; padding-left: 20px; }
              .benefits li { margin: 8px 0; color: #374151; }
              .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
              .footer { background-color: #f9fafb; padding: 30px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
              .unsubscribe { font-size: 12px; color: #9ca3af; margin-top: 20px; }
              .unsubscribe a { color: #6b7280; text-decoration: underline; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to Our Community!</h1>
              </div>
              
              <div class="content">
                <h2>Thank You for Subscribing!</h2>
                <p>Hi there,</p>
                <p>We're thrilled to have you join our community of storytellers, empaths, and authentic voices. You've just taken the first step toward being part of something truly special.</p>
                
                <div class="benefits">
                  <strong style="color: #10b981; font-size: 16px;">Here's what you can expect:</strong>
                  <ul>
                    <li><strong>Weekly Stories:</strong> Inspiring real-life experiences from our community</li>
                    <li><strong>Community Highlights:</strong> Featured discussions and top contributors</li>
                    <li><strong>Exclusive Content:</strong> Early access to new features and resources</li>
                    <li><strong>Personal Growth Tips:</strong> Tools and insights for your journey</li>
                  </ul>
                </div>
                
                <p>Your first newsletter will arrive soon. In the meantime, feel free to explore our community discussions, share your story, or simply connect with others on similar journeys.</p>
                
                <center>
                  <a href="${Deno.env.get("SUPABASE_URL")}" class="cta-button">Explore Community</a>
                </center>
                
                <p style="margin-top: 30px;">Thank you for being part of our community!</p>
                <p style="margin-top: 0;"><strong>The Community Team</strong></p>
              </div>
              
              <div class="footer">
                <p>You're receiving this email because you subscribed to our newsletter.</p>
                <div class="unsubscribe">
                  <a href="${unsubscribeUrl}">Unsubscribe</a> from future emails
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      throw emailResponse.error;
    }

    console.log("Email sent successfully:", emailResponse.data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Confirmation email sent",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send confirmation email",
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
