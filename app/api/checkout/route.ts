import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey === "sk_test_XXXXXXXX") {
      return NextResponse.json(
        { error: "Stripe secret key not configured. Update STRIPE_SECRET_KEY in .env.local" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const {
      total,
      currentRank,
      currentDivision,
      desiredRank,
      desiredDivision,
      server,
      platform,
      rpGain,
    } = await req.json();
    const amount = Math.round(Number(total) * 100);

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Boost: ${currentRank} ${currentDivision} → ${desiredRank} ${desiredDivision}`,
              description: `${platform} | ${server} | RP: ${rpGain}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
