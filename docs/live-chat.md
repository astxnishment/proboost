# Live chat setup

ProBoost has a site-wide support launcher, a support button on the contact page, and direct access from the new game order summaries. The live-chat connection uses **tawk.to**. ProBoost's public widget identifiers are configured in `app/components/LiveChat.tsx`, so the inbox is available without additional hosting configuration:

`https://embed.tawk.to/6abc1b642868e33441711d83/1k3ncm050`

These are public embed identifiers, not account credentials. Environment variables can override them for a different inbox. Empty or invalid overrides disable the integration and show an email fallback; no messages are collected or shown as sent by that fallback.

## Change the connected inbox

1. Create or open the ProBoost property in your own tawk.to account.
2. Open **Administration → Chat Widget** (under Channels in some dashboard versions).
3. Find the public embed URL in the widget code: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`. These two identifiers are public; no API secret is needed.
4. To override the default inbox, set these values in `.env.local` for local testing, and in your hosting environment before building the production site:

   ```dotenv
   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
   NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
   ```

5. Restart the preview, or rebuild and redeploy the production site. Next.js includes these public values in the browser bundle at build time.
6. In tawk.to, configure your agents, availability, offline form, allowed domains, and notification preferences. Match the widget to ProBoost with the accent color `#8b5cf6`. Keep proactive auto-open triggers off so visitors choose when to open a conversation.

## How it works

- The provider script loads only after the visitor clicks **Start live chat**. Merely browsing the site or opening the local support panel does not load tawk.to.
- Chat is mounted in the root layout, so normal internal navigation preserves the conversation. The provider manages chat history, agent access, and offline submissions.
- The integration does not automatically send a message or copy Clerk profile details, passwords, payment information, or order configuration to the chat.
- Minimizing the provider widget returns to the ProBoost launcher. Its unread count comes from actual incoming agent-message events.
- Closing the support panel while connecting cancels the pending auto-open. A late provider response must not reopen it.
- If loading fails or exceeds 15 seconds, visitors can open your direct tawk.to chat link in a new tab or use email.
- The launcher stays above the mobile order bar and below navigation drawers. The support panel supports Escape, focus containment, and focus return.

## Activation checks

Run `npm run test:chat` for the provider lifecycle tests. With your real widget connected, verify:

1. No request to `embed.tawk.to` occurs until **Start live chat** is clicked.
2. With an agent available, a visitor message arrives in your inbox and an agent reply reaches the visitor.
3. Minimizing, receiving a reply, reopening, and internal navigation preserve the conversation.
4. With agents offline, the configured offline form accepts a message and your team receives the notification.
5. Blocking the provider script shows the fallback without losing the current order configuration.
6. At phone sizes, the launcher does not cover **Review order** and the panel fits the viewport.

End-to-end message delivery requires a staffed inbox and a visitor/agent exchange. Opening the connected widget alone does not verify delivery. No test messages have been sent as part of this integration.

References: [tawk.to JavaScript API](https://developer.tawk.to/jsapi/), [finding the widget identifiers](https://help.tawk.to/article/adding-a-tawkto-widget-to-your-buildly-website).
