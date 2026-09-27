"use client";

import { useOrderState } from "../OrderDraftProvider";

import Localized, { useLanguage } from "../Localization";
import { LANGUAGE_LOCALES } from "../../lib/localization";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Crosshair, GraduationCap, Headphones, Layers3, LoaderCircle, LockKeyhole, Minus, Plus, ShieldCheck, Sparkles, Swords, Target, Trophy, UserRoundCheck, UsersRound, Video, Zap } from "lucide-react";
import { type AdditionalGame, type CatalogService, rankSteps, coachingFocusOptions, WOW_CLASSES, WOW_CLASS_ROLES, WOW_RAIDS, WOW_DIFFICULTIES, WOW_RAID_SCOPES, WOW_DUNGEON_PREFERENCES } from "../../lib/additional-games";
import { type CatalogGameOrder, initialGameOrder, gameOrderSummary, parseCatalogGameOrder } from "../../lib/additional-pricing";
import { computeOrderPrice } from "../../lib/pricing";
import { createCheckoutSession, getCheckoutErrorMessage } from "../../lib/checkout";
import { useCurrency } from "../CurrencyProvider";
import { CurrencyDropdown } from "../Dropdown";
import PlatformSelector from "../PlatformSelector";
import FaqSection from "../FaqSection";
import { LiveChatButton } from "../LiveChat";

const SERVICE_ICONS = { "rank-progression": Crosshair, "match-sessions": Trophy, coaching: GraduationCap, dungeons: Swords, raids: ShieldCheck, "composition-planning": Layers3, "replay-review": Video, "raid-coaching": Swords, "dungeon-coaching": ShieldCheck, "build-review": Sparkles, "tactics-coaching": Layers3, "squad-review": UsersRound };

function Emblem({ color, tier = 2, rating = false }: { color: string; tier?: number; rating?: boolean }) {
  const id = useId();
  return <svg className="catalog-rank-emblem" viewBox="0 0 96 96" fill="none" aria-hidden>
    <defs><linearGradient id={id} x1="24" y1="10" x2="74" y2="89" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".35" stopColor={color} /><stop offset="1" stopColor={color} stopOpacity=".3" /></linearGradient></defs>
    <path d="M48 5 77 22 85 51 72 76 48 91 24 76 11 51 19 22Z" fill={color} fillOpacity=".08" stroke={color} strokeOpacity=".5" />
    <path d="m48 13 24 14 6 23-11 21-19 12-19-12-11-21 6-23Z" fill="#101216" stroke={`url(#${id})`} strokeWidth="2" />
    <path d="m48 22 17 10 5 18-8 15-14 9-14-9-8-15 5-18Z" fill={color} fillOpacity=".12" stroke={color} strokeOpacity=".4" />
    {rating ? <><path d="m33 59 12-14 9 5 12-17m-11 0h11v11" stroke={`url(#${id})`} strokeWidth="4" strokeLinejoin="round" /><path d="m30 66 18 10 18-10" stroke={color} strokeWidth="2" /></> : <><path d="m48 28 13 20-13 20-13-20Z" fill={`url(#${id})`} /><path d="m48 37 7 11-7 11-7-11Z" fill="#15171c" />{Array.from({ length: Math.min(3, 1 + Math.floor(tier / 2)) }, (_, index) => <Localized key={index}><path key={index} d={`m${20 - index * 2} ${36 + index * 8} -9 -3 -5 4 12 5 m${60 + index * 4} -6 9 -3 5 4 -12 5`} stroke={color} strokeWidth="2.2" /></Localized>)}</>}
    {tier > 4 && <path d="m36 15 3-9 9 6 9-6 3 9" stroke={color} strokeWidth="2.5" />}
    <path d="m44 84 4 3 4-3" stroke={color} strokeWidth="2" />
  </svg>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <Localized><label className="catalog-select-field"><span>{label}</span><span className="catalog-select-wrap"><select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <Localized key={option}><option key={option}>{option}</option></Localized>)}</select><ChevronDown size={16} aria-hidden /></span></label></Localized>;
}

function Panel({ title, description, children, icon }: { title: string; description?: string; children: ReactNode; icon?: ReactNode }) {
  return <Localized><section className="catalog-panel"><div className="catalog-panel-heading">{icon && <span className="catalog-panel-icon">{icon}</span>}<div><h2>{title}</h2>{description && <p>{description}</p>}</div></div>{children}</section></Localized>;
}

function RankPicker({ game, label, value, min = 0, max, onChange }: { game: AdditionalGame; label: string; value: number; min?: number; max: number; onChange: (value: number) => void }) {
  const steps = rankSteps(game);
  const selected = steps[value];
  return <Localized><section className="catalog-rank-picker" aria-label={label} style={{ "--rank-color": selected.color } as CSSProperties}>
    <div className="catalog-rank-heading"><Emblem color={selected.color} tier={selected.tierIndex} /><div><h2>{label}</h2><strong>{selected.tier}</strong><span>{selected.division || "Top tier"}</span></div></div>
    <div className="catalog-tier-grid" role="group" aria-label={`${label} tier`}>
      {game.tiers.map((tier, index) => {
        const available = steps.map((step, i) => ({ ...step, index: i })).filter(step => step.tierIndex === index && step.index >= min && step.index <= max);
        return <Localized key={tier.name}><button key={tier.name} type="button" disabled={!available.length} aria-pressed={selected.tierIndex === index} onClick={() => onChange((available.find(step => step.divisionIndex === selected.divisionIndex) ?? available[0]).index)} style={{ "--tier-color": tier.color } as CSSProperties}><Emblem color={tier.color} tier={index} /><span>{tier.name}</span></button></Localized>;
      })}
    </div>
    {game.tiers[selected.tierIndex].divisions.length > 1 && <label className="catalog-select-field"><span>{game.slug === "rocket-league-boost" ? "Rank & division" : "Division"}</span><span className="catalog-select-wrap"><select aria-label={`${label} division`} value={value} onChange={event => onChange(Number(event.target.value))}>{steps.map((step, index) => step.tierIndex === selected.tierIndex && <option key={index} value={index} disabled={index < min || index > max}>{step.division}</option>)}</select><ChevronDown size={16} aria-hidden /></span></label>}
  </section></Localized>;
}

function NumberPanel({ label, value, min, max, step, unit, color, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; color: string; onChange: (value: number) => void }) {
  const locale = LANGUAGE_LOCALES[useLanguage()];
  return <Localized><section className="catalog-rating-panel" style={{ "--rank-color": color } as CSSProperties}>
    <div className="catalog-rank-heading"><Emblem color={color} rating /><div><h2>{label}</h2><span>{unit === "MMR" ? "Matchmaking rating" : "Skill Rating"}</span></div></div>
    <label className="catalog-rating-input"><span className="sr-only">{label}</span><input type="number" aria-label={label} min={min} max={max} step={1} value={value} onChange={event => onChange(Number(event.target.value))} /><span>{unit}</span></label>
    <input className="catalog-range" aria-label={`${label} slider`} type="range" min={Math.ceil(min / step) * step} max={Math.floor(max / step) * step} step={step} value={value} onChange={event => onChange(Number(event.target.value))} />
    <div className="catalog-range-labels"><span>{(Math.ceil(min / step) * step).toLocaleString(locale)}</span><span>{(Math.floor(max / step) * step).toLocaleString(locale)}</span></div>
  </section></Localized>;
}

function Quantity({ label, value, unit, min = 1, max = 10, presets = [1, 3, 5, 10], onChange }: { label: string; value: number; unit: string; min?: number; max?: number; presets?: number[]; onChange: (value: number) => void }) {
  return <Localized><div className="catalog-quantity"><div className="catalog-quantity-main"><button type="button" disabled={value <= min} aria-label={`Decrease ${label}`} onClick={() => onChange(value - 1)}><Minus size={18} aria-hidden /></button><div><output aria-label={label} className="catalog-quantity-value">{`${value} ${value === 1 ? unit : `${unit}s`}`}</output></div><button type="button" disabled={value >= max} aria-label={`Increase ${label}`} onClick={() => onChange(value + 1)}><Plus size={18} aria-hidden /></button></div><div className="catalog-quantity-presets" role="group" aria-label={`${label} packages`}>{presets.filter(n => n >= min && n <= max).map(n => <Localized key={n}><button key={n} type="button" aria-pressed={value === n} onClick={() => onChange(n)}>{n} {n === 1 ? unit : `${unit}s`}</button></Localized>)}</div><input className="catalog-range" type="range" min={min} max={max} value={value} aria-label={label} onChange={event => onChange(Number(event.target.value))} /></div></Localized>;
}

function Extra({ icon, title, description, price, checked, onChange }: { icon: ReactNode; title: string; description: string; price: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Localized><div className="catalog-extra"><span className="catalog-extra-icon">{icon}</span><div><h3>{title}</h3><p>{description}</p></div><span className="catalog-extra-price">{price}</span><button type="button" className="catalog-switch" role="switch" aria-label={title} aria-checked={checked} onClick={() => onChange(!checked)}><span /></button></div></Localized>;
}

export default function GameServiceConfigurator({ game, service, language }: { game: AdditionalGame; service: CatalogService; language: string }) {
  const [order, setOrder] = useOrderState(`${game.slug}/${service.slug}:order`, () => initialGameOrder(game, service.slug));
  const [promo, setPromo] = useOrderState(`${game.slug}/${service.slug}:promo`, "");
  const [promoMessage, setPromoMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currency, formatPrice } = useCurrency();
  const update = <K extends keyof CatalogGameOrder>(key: K, value: CatalogGameOrder[K]) => { setOrder(previous => ({ ...previous, [key]: value })); setCheckoutError(""); };
  const steps = rankSteps(game);
  const max = game.rating?.max ?? steps.length - 1;
  const ranking = service.slug === "rank-progression";
  const coaching = service.group === "coaching";
  const wow = game.slug === "world-of-warcraft-boost";
  const queueAvailable = !wow && !coaching && order.mode !== "Duel (1v1)";
  const Icon = SERVICE_ICONS[service.slug];
  const price = computeOrderPrice(order);
  const valid = Boolean(parseCatalogGameOrder(order)) && Number.isFinite(price.total);
  const locale = LANGUAGE_LOCALES[useLanguage()];
  const basePath = `/${language}/${game.slug}`;
  const changeCurrent = (value: number) => {
    const current = Math.max(0, Math.min(value, ranking ? max - 1 : max));
    setOrder(previous => ({ ...previous, current, target: ranking && previous.target <= current ? Math.min(max, current + (game.rating?.step ?? 1)) : previous.target }));
  };
  const changeMode = (mode: string) => setOrder(previous => {
    const focuses = coachingFocusOptions(game, mode, previous.role, service.slug);
    return { ...previous, mode, queueType: mode === "Duel (1v1)" ? "Solo" : previous.queueType, focus: focuses.includes(previous.focus) ? previous.focus : focuses[0] };
  });
  const changeRole = (role: string) => setOrder(previous => {
    const focuses = coachingFocusOptions(game, previous.mode, role, service.slug);
    return { ...previous, role, focus: focuses.includes(previous.focus) ? previous.focus : focuses[0] };
  });
  const changeClass = (characterClass: string) => setOrder(previous => {
    const roles = WOW_CLASS_ROLES[characterClass];
    const role = roles.includes(previous.role) ? previous.role : roles[0];
    const focuses = coachingFocusOptions(game, previous.mode, role, service.slug);
    return { ...previous, characterClass, role, focus: focuses.includes(previous.focus) ? previous.focus : focuses[0] };
  });
  const summary = gameOrderSummary(order);
  const route = ranking ? summary.slice(0, 2) : [];
  const eta = coaching ? "Scheduled with your coach" : wow ? "Scheduled with your group" : ranking ? "Timing confirmed on assignment" : "Scheduled after assignment";

  async function checkout() {
    if (!valid || loading) return;
    setLoading(true); setCheckoutError("");
    try { window.location.assign(await createCheckoutSession(order, currency)); }
    catch (error) { setCheckoutError(getCheckoutErrorMessage(error)); setLoading(false); }
  }

  return <Localized><main className="game-overview catalog-configurator" data-coaching-only={game.coachingOnly || undefined} lang="en" style={{ "--game-accent": game.accent } as CSSProperties}>
    <section className="catalog-service-hero theme-preserve-media">
      <div className="catalog-service-art"><Image src={game.serviceArtwork ?? game.artwork} alt="" fill preload sizes="(max-width: 767px) 100vw, 65vw" /></div>
      <div className="page-container catalog-service-hero-inner"><div className="catalog-service-hero-copy">
        <Link href={basePath} className="catalog-back-link"><ArrowLeft size={15} aria-hidden /><span>All {game.name} services</span></Link>
        <div className="catalog-service-eyebrow"><span><Icon size={21} aria-hidden /></span>{game.name} · {coaching ? "Play. Learn. Improve." : wow ? "Your next adventure" : "Your next milestone"}</div>
        <h1>{service.title}</h1><p>{service.description}</p>
        <a href="#configure" className="catalog-hero-link"><span>Customize your {coaching ? "session" : "boost"}</span><ArrowRight size={16} aria-hidden /></a>
      </div></div>
    </section>
    <div className="catalog-assurances"><div className="page-container">{[[Target, "Built around your goal"], [UsersRound, "Game-specific setup"], [LockKeyhole, "Secure checkout"], [Headphones, "Support throughout"]].map(([ItemIcon, label]) => { const Mark = ItemIcon as typeof Target; return <Localized key={label as string}><span key={label as string}><Mark size={17} aria-hidden />{label as string}</span></Localized>; })}</div></div>
    <div className="page-container catalog-config-body" id="configure">
      <nav className="catalog-service-tabs" aria-label={`${game.name} services`}>{game.services.map(item => { const ItemIcon = SERVICE_ICONS[item.slug]; return <Localized key={item.slug}><Link key={item.slug} href={`${basePath}/${item.slug}`} aria-current={item.slug === service.slug ? "page" : undefined}><ItemIcon size={16} aria-hidden />{item.navLabel}</Link></Localized>; })}</nav>
      <div className="catalog-config-heading"><div><span className="request-eyebrow">Make it yours</span><h2>{coaching ? "Build your coaching session." : wow ? "Build your PvE session." : "Customize your boost."}</h2></div><span><Zap size={15} aria-hidden />Price updates as you choose</span></div>
      <div className="catalog-config-layout">
        <div className="catalog-controls">
          {ranking && (game.rating ? <>
            <div className="catalog-rank-pair"><NumberPanel label={`Current ${game.rating.unit}`} value={order.current} min={0} max={game.rating.max - 1} step={game.rating.step} unit={game.rating.unit} color="#aab9ca" onChange={changeCurrent} /><NumberPanel label={`Desired ${game.rating.unit}`} value={order.target} min={1} max={game.rating.max} step={game.rating.step} unit={game.rating.unit} color={game.accent} onChange={value => update("target", value)} /></div>
            <div className="catalog-rating-goals"><span>Quick target</span>{[250, 500, 1000].map(gain => <Localized key={gain}><button key={gain} type="button" disabled={order.current + gain > max} aria-pressed={order.target === order.current + gain} onClick={() => update("target", order.current + gain)}>+{gain.toLocaleString(locale)} {game.rating!.unit}</button></Localized>)}</div>
          </> : <div className="catalog-rank-pair"><RankPicker game={game} label="Current rank" value={order.current} max={max - 1} onChange={changeCurrent} /><RankPicker game={game} label="Desired rank" value={order.target} min={order.current + 1} max={max} onChange={value => update("target", value)} /></div>)}
          {ranking && !valid && <p className="catalog-error" role="alert">Choose a target above your current {game.rating?.unit ?? "rank"}, within the available range.</p>}
          {ranking && game.progressLabel && <Panel title={game.progressLabel} description="Your existing progress is included in the calculation."><div className="catalog-progress-control"><input className="catalog-range" aria-label={game.progressLabel} type="range" min={0} max={99} value={order.progress} onChange={event => update("progress", Number(event.target.value))} /><label><span className="sr-only">{game.progressLabel} value</span><input type="number" min={0} max={99} value={order.progress} onChange={event => update("progress", Math.min(99, Math.max(0, Number(event.target.value))))} /><span>{game.progressLabel === "Current LP" ? "LP" : "%"}</span></label></div></Panel>}
          {service.slug === "match-sessions" && <>
            <Panel title="Choose your win package" description="A defined number of wins at your starting rank." icon={<Trophy size={22} />}><Quantity label="Number of wins" value={order.quantity} unit="win" onChange={value => update("quantity", value)} /></Panel>
            {game.rating ? <NumberPanel label={`Current ${game.rating.unit}`} value={order.current} min={0} max={max} step={game.rating.step} unit={game.rating.unit} color={game.accent} onChange={changeCurrent} /> : <RankPicker game={game} label="Starting rank" value={order.current} max={max} onChange={changeCurrent} />}
          </>}
          {coaching && <>
            <Panel title="Time to focus on your game" description="Choose the length of your private coaching session." icon={<GraduationCap size={24} />}><Quantity label="Coaching hours" value={order.quantity} unit="hour" presets={[1, 2, 3, 5]} onChange={value => update("quantity", value)} /></Panel>
            {service.setup && <Panel title={service.setup.label} description="Help your coach tailor the session to you.">
              <SelectField label={service.setup.label} value={order.sessionOption!} options={service.setup.options} onChange={value => update("sessionOption", value)} />
              {service.preparation && <p className="catalog-control-note catalog-session-preparation">{service.preparation}</p>}
            </Panel>}
            <Panel title="What do you want to improve?" description="Give your coach a clear focus for the session."><div className="catalog-focus-grid" role="group" aria-label="Coaching focus">{coachingFocusOptions(game, order.mode, order.role, service.slug).map((focus, index) => { const FocusIcon = [Target, Layers3, Crosshair, Sparkles, Video][index % 5]; return <Localized key={focus}><button key={focus} type="button" aria-pressed={order.focus === focus} onClick={() => update("focus", focus)}><FocusIcon size={23} aria-hidden /><span>{focus}</span><Check size={15} aria-hidden /></button></Localized>; })}</div></Panel>
          </>}
          {service.slug === "dungeons" && <>
            <Panel title="Choose your Mythic+ level" description="Set the keystone level for your dungeon runs." icon={<Swords size={23} />}><div className="catalog-keystone"><Emblem color={game.accent} tier={5} /><div><span>Keystone level</span><strong>+{order.current}</strong></div></div><input className="catalog-range" type="range" min={2} max={20} value={order.current} aria-label="Keystone level" onChange={event => update("current", Number(event.target.value))} /><div className="catalog-quantity-presets">{[2, 5, 10, 15, 20].map(level => <Localized key={level}><button key={level} type="button" aria-pressed={order.current === level} onClick={() => update("current", level)}>+{level}</button></Localized>)}</div></Panel>
            <Panel title="Build your dungeon bundle" description="Choose a single run or combine up to eight runs."><Quantity label="Number of runs" value={order.quantity} unit="run" max={8} presets={[1, 2, 4, 8]} onChange={value => update("quantity", value)} /><SelectField label="Dungeon preference" value={order.dungeonPreference!} options={WOW_DUNGEON_PREFERENCES} onChange={value => update("dungeonPreference", value)} /></Panel>
          </>}
          {service.slug === "raids" && <Panel title="Choose your raid" description="Pick the encounter, difficulty, and scope of your clear." icon={<ShieldCheck size={24} />}><div className="catalog-raid-options" role="group" aria-label="Raid">{WOW_RAIDS.map(raid => <Localized key={raid}><button key={raid} type="button" aria-pressed={order.raid === raid} onClick={() => update("raid", raid)}><Swords size={23} aria-hidden /><span>{raid}</span><Check size={16} aria-hidden /></button></Localized>)}</div><div className="catalog-field-grid"><SelectField label="Difficulty" value={order.difficulty!} options={WOW_DIFFICULTIES} onChange={value => update("difficulty", value)} /><SelectField label="Clear format" value={order.raidScope!} options={WOW_RAID_SCOPES} onChange={value => update("raidScope", value)} /></div><p className="catalog-control-note">Loot follows the game’s drop and trading rules. A specific item is not guaranteed.</p></Panel>}
          <Panel title={wow ? "Your character & region" : "Your game setup"} description={wow ? "Your selected class and role are included in the order." : "Choose where and how you play."} icon={<UsersRound size={22} />}>
            <div className="catalog-platforms"><span>Platform</span><PlatformSelector platforms={game.platforms} value={order.platform} onChange={value => update("platform", value)} /></div>
            <div className="catalog-field-grid"><SelectField label={game.modeLabel} value={order.mode} options={service.modes ?? game.modes} onChange={changeMode} /><SelectField label="Region" value={order.server} options={game.regions} onChange={value => update("server", value)} /><SelectField label={game.roleLabel} value={order.role} options={wow ? WOW_CLASS_ROLES[order.characterClass!] : game.roles} onChange={changeRole} />{wow && <SelectField label="Character class" value={order.characterClass!} options={WOW_CLASSES} onChange={changeClass} />}</div>
            {queueAvailable ? <div className="catalog-queue"><span>Service format</span><div role="group" aria-label="Service format">{["Solo", "Duo"].map(queue => <Localized key={queue}><button key={queue} type="button" aria-pressed={order.queueType === queue} onClick={() => update("queueType", queue as "Solo" | "Duo")}>{queue === "Solo" ? <UserRoundCheck size={19} aria-hidden /> : <UsersRound size={19} aria-hidden />}<span><strong>{queue === "Solo" ? "Solo service" : "Play with a pro"}</strong><small>{queue === "Solo" ? "Specialist handles the climb" : "Queue together · +30%"}</small></span><Check size={16} aria-hidden /></button></Localized>)}</div></div> : <p className="catalog-control-note"><Check size={15} aria-hidden />{wow ? "Self-play: join the group on your own character." : coaching ? "One-to-one session. Your coach confirms the schedule with you." : "Duel is a 1v1 playlist, so duo queue is unavailable."}</p>}
          </Panel>
          <Panel title="Make it your experience" description="Add the options that matter to you.">
            <Extra icon={<UserRoundCheck size={21} />} title="Specific specialist" description="Choose an available specialist for your order." price={`+${formatPrice(7.5)}`} checked={!!order.specificBooster} onChange={value => update("specificBooster", value)} />
            {coaching ? <><Extra icon={<Video size={21} />} title="Recorded session" description="Keep a private recording to revisit your session." price="+15%" checked={!!order.recordedSession} onChange={value => update("recordedSession", value)} /><Extra icon={<Sparkles size={21} />} title="Personal practice plan" description="A focused routine to keep improving after the call." price="+10%" checked={!!order.customFocus} onChange={value => update("customFocus", value)} /></> : <Extra icon={<Zap size={21} />} title="Express priority" description="Prioritize specialist assignment for your order." price="+20%" checked={!!order.express} onChange={value => update("express", value)} />}
          </Panel>
        </div>
        <aside className="catalog-order-summary" id="order-summary" aria-label="Order summary">
          <div className="catalog-summary-top"><span className="request-eyebrow">Your order</span><CurrencyDropdown /></div><div className="catalog-summary-game"><Image src={game.icon} alt="" width={40} height={40} /><div><span>{game.name}</span><h2>{service.navLabel === "Rank boost" && game.rating ? `${game.rating.unit} progression` : service.title}</h2></div></div>
          <div className="catalog-order-details" tabIndex={0} aria-label="Selected order options">
          {ranking && <div className="catalog-route-summary"><div><span>From</span><strong>{route[0][1]}</strong></div><ArrowRight size={21} aria-hidden /><div><span>To</span><strong>{route[1][1]}</strong></div></div>}
          <dl className="catalog-summary-rows">{(ranking ? summary.slice(2) : summary).map(([label, value]) => <Localized key={label}><div key={label}><dt>{label}</dt><dd>{value}</dd></div></Localized>)}</dl>
          <div className="catalog-summary-timing"><Clock3 size={16} aria-hidden /><span>{eta}</span></div>
          <div className="catalog-promo"><label htmlFor="catalog-promo">Promo code</label><div><input id="catalog-promo" maxLength={32} value={promo} onChange={event => setPromo(event.target.value)} placeholder="Enter code" /><button type="button" onClick={() => { const accepted = promo.trim().toUpperCase() === "WELCOME6"; update("promoCode", accepted ? "WELCOME6" : ""); setPromoMessage(accepted ? "WELCOME6 applied · 6% off" : "That code isn’t available. Please try another."); }}>Apply</button></div>{promoMessage && <p role="status">{promoMessage}</p>}</div>
          </div>
          <div className="catalog-price-breakdown">{price.discount > 0 && <><div><span>Subtotal</span><span>{formatPrice(price.subtotal)}</span></div>{price.promoDiscount > 0 && <div><span>Promo savings</span><span>−{formatPrice(price.promoDiscount)}</span></div>}{price.extraDiscount > 0 && <div><span>Order discount · 3%</span><span>−{formatPrice(price.extraDiscount)}</span></div>}</> }<div className="catalog-total"><span>Total</span><strong data-testid="order-total">{valid ? formatPrice(price.total) : "—"}</strong></div></div>
          {checkoutError && <p className="catalog-error" role="alert">{checkoutError}</p>}
          <button className="catalog-checkout" type="button" disabled={loading || !valid} onClick={checkout}>{loading ? <><LoaderCircle size={18} className="animate-spin" aria-hidden />Starting checkout</> : <>Continue to checkout<ArrowRight size={18} aria-hidden /></>}</button>
          <p className="catalog-checkout-note"><LockKeyhole size={13} aria-hidden />Review your order before payment</p><div className="catalog-payment-marks">{["visa", "mastercard", "apay", "gpay"].map(payment => <Localized key={payment}><Image key={payment} src={`/payments/${payment}.webp`} alt={{visa:"Visa",mastercard:"Mastercard",apay:"Apple Pay",gpay:"Google Pay"}[payment] ?? payment} width={28} height={28} /></Localized>)}</div><LiveChatButton className="catalog-summary-support"><Headphones size={16} aria-hidden />Need help with your order?</LiveChatButton>
        </aside>
      </div>
      <FaqSection copy={{ label: "Before you start", items: [
        { q: "How is my price calculated?", a: "The total follows your selected target or package, service format, and optional extras. Any applicable promo or order discount appears in the summary before checkout." },
        { q: "What happens after checkout?", a: "Your selected configuration is included with your order. The session schedule and any further setup details are confirmed before the service begins." },
        { q: coaching ? "Can I focus on a specific part of my game?" : wow ? "Will I play my own character?" : "Can I play alongside the specialist?", a: coaching ? "Choose a focus and your preferred role in the configurator. You can refine the session goals with your coach before it starts." : wow ? "Yes. These dungeon and raid services use self-play: you join the group on your own character. Loot follows the game’s normal rules." : "Choose Play with a pro where available. Party eligibility depends on your game, mode, and rank, and is checked before assignment." },
      ] }} />
    </div>
    <div className="catalog-mobile-total"><div><span>Your total</span><strong>{valid ? formatPrice(price.total) : "Choose a valid target"}</strong></div><a href="#order-summary">Review order<ArrowRight size={16} aria-hidden /></a></div>
  </main></Localized>;
}
