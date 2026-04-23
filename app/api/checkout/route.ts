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
    const body = await req.json();
    const {
      total,
      // rank-up
      currentRank,
      currentDivision,
      desiredRank,
      desiredDivision,
      rpGain,
      // champion
      currentPoints,
      desiredPoints,
      // competitive
      numberOfWins,
      // unrated
      numberOfGames,
      // elearning
      service,
      quantity,
      // shared
      server,
      platform,
    } = body;

    const amount = Math.round(Number(total) * 100);

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Build product name and description based on which fields are present
    let productName: string;
    let productDescription: string;

    if (service !== undefined) {
      // elearning / coaching
      productName = `${service}${quantity && quantity > 1 ? ` x${quantity}` : ""}`;
      productDescription = [platform, server].filter(Boolean).join(" | ");
    } else if (currentPoints !== undefined || desiredPoints !== undefined) {
      // champion boost
      productName = `Champion Boost: ${currentPoints} → ${desiredPoints} points`;
      const parts = [platform, server];
      if (rpGain) parts.push(`RP: ${rpGain}`);
      productDescription = parts.filter(Boolean).join(" | ");
    } else if (numberOfWins !== undefined) {
      // competitive wins
      productName = `Competitive Boost: ${currentRank}${currentDivision ? ` ${currentDivision}` : ""} – ${numberOfWins} wins`;
      productDescription = [platform, server].filter(Boolean).join(" | ");
    } else if (numberOfGames !== undefined) {
      // unrated
      productName = `Unrated Boost: ${numberOfGames} games`;
      productDescription = [platform, server].filter(Boolean).join(" | ");
    } else {
      // rank-up (default)
      productName = `Rank Boost: ${currentRank ?? ""} ${currentDivision ?? ""} → ${desiredRank ?? ""} ${desiredDivision ?? ""}`.trim();
      const parts = [platform, server];
      if (rpGain) parts.push(`RP: ${rpGain}`);
      productDescription = parts.filter(Boolean).join(" | ");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: productName,
              description: productDescription || undefined,
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
