import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import { Bell, User, Search, Mail, Shield, ShieldAlert, ShieldCheck, ShieldX, Paperclip, ExternalLink, Clock, Filter, Eye, AlertTriangle, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, BarChart3, TrendingUp, FileWarning, Link2, Ban, MailOpen, Inbox, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRealtimeSimulation, useAnimatedValue, randomVariation } from "@/hooks/use-realtime-simulation";

type EmailVerdict = "Clean" | "Suspicious" | "Malicious" | "Quarantined";
type EmailDirection = "Inbound" | "Outbound";

interface EmailEntry {
  id: string;
  from: string;
  fromDisplay: string;
  to: string;
  toDisplay: string;
  subject: string;
  date: string;
  time: string;
  direction: EmailDirection;
  verdict: EmailVerdict;
  hasAttachment: boolean;
  attachmentName?: string;
  attachmentSize?: string;
  spfResult: "Pass" | "Fail" | "None";
  dkimResult: "Pass" | "Fail" | "None";
  dmarcResult: "Pass" | "Fail" | "None";
  senderIP: string;
  threatType?: string;
  score: number; // 0-100 threat score
  body?: string;
  headers?: { key: string; value: string }[];
}

const emailData: EmailEntry[] = [
  {
    id: "EM-4871", from: "hr-department@company-update[.]xyz", fromDisplay: "HR Department", to: "john.smith@corp.local", toDisplay: "John Smith", subject: "Urgent: Verify Your Account Credentials",
    date: "Feb 19, 2026", time: "09:14 AM", direction: "Inbound", verdict: "Malicious", hasAttachment: true, attachmentName: "verify_account.html", attachmentSize: "14 KB",
    spfResult: "Fail", dkimResult: "Fail", dmarcResult: "Fail", senderIP: "185.220.101.34", score: 95,
    threatType: "Credential Phishing",
    body: "Dear Employee,\n\nYour corporate account has been flagged for suspicious activity. Please verify your credentials immediately by opening the attached file.\n\nFailure to verify within 24 hours will result in account suspension.\n\nRegards,\nHR Department",
    headers: [
      { key: "Return-Path", value: "<bounce@company-update.xyz>" },
      { key: "X-Mailer", value: "PHPMailer 6.1.4" },
      { key: "Received", value: "from mail.company-update.xyz (185.220.101.34)" },
      { key: "Content-Type", value: "multipart/mixed; boundary=\"----=_Part_1234\"" },
    ],
  },
  {
    id: "EM-4870", from: "noreply@microsoft.com", fromDisplay: "Microsoft", to: "lisa.johnson@corp.local", toDisplay: "Lisa Johnson", subject: "Your Microsoft 365 Subscription Renewal",
    date: "Feb 19, 2026", time: "08:47 AM", direction: "Inbound", verdict: "Clean", hasAttachment: false, score: 2,
    spfResult: "Pass", dkimResult: "Pass", dmarcResult: "Pass", senderIP: "40.107.22.131",
    body: "Hello Lisa,\n\nYour Microsoft 365 Business subscription has been renewed successfully. Your next billing date is March 19, 2026.\n\nThank you,\nMicrosoft Team",
    headers: [
      { key: "Return-Path", value: "<noreply@microsoft.com>" },
      { key: "X-MS-Exchange-Organization-SCL", value: "0" },
      { key: "Received", value: "from mail-eopbgr130131.outbound.protection.outlook.com (40.107.22.131)" },
    ],
  },
  {
    id: "EM-4869", from: "invoices@quickbooks-billing[.]net", fromDisplay: "QuickBooks Billing", to: "accounting@corp.local", toDisplay: "Accounting Dept", subject: "Invoice #INV-2026-0847 — Payment Due",
    date: "Feb 19, 2026", time: "08:32 AM", direction: "Inbound", verdict: "Suspicious", hasAttachment: true, attachmentName: "Invoice_2026_0847.pdf", attachmentSize: "287 KB",
    spfResult: "None", dkimResult: "Fail", dmarcResult: "None", senderIP: "91.234.99.117", score: 68,
    threatType: "Potential BEC / Invoice Fraud",
    body: "Please find attached the invoice for services rendered. Payment is due within 3 business days.\n\nNote: We have updated our bank details. Please use the new account information on the invoice.\n\nBest,\nAccounting Team",
    headers: [
      { key: "Return-Path", value: "<invoices@quickbooks-billing.net>" },
      { key: "X-Mailer", value: "Microsoft Outlook 16.0" },
      { key: "Received", value: "from smtp.quickbooks-billing.net (91.234.99.117)" },
    ],
  },
  {
    id: "EM-4868", from: "admin@corp.local", fromDisplay: "IT Admin", to: "all-staff@corp.local", toDisplay: "All Staff", subject: "System Maintenance Window — Feb 20",
    date: "Feb 19, 2026", time: "08:15 AM", direction: "Outbound", verdict: "Clean", hasAttachment: false, score: 0,
    spfResult: "Pass", dkimResult: "Pass", dmarcResult: "Pass", senderIP: "10.0.0.5",
    body: "Team,\n\nPlease note there will be a scheduled maintenance window on February 20, 2026 from 2:00 AM to 6:00 AM EST.\n\nDuring this time, email and VPN services may be intermittently unavailable.\n\nIT Operations",
  },
  {
    id: "EM-4867", from: "security-alert@bank0famerica[.]com", fromDisplay: "Bank of America (Spoofed)", to: "mike.chen@corp.local", toDisplay: "Mike Chen", subject: "Unusual Login Activity Detected",
    date: "Feb 18, 2026", time: "11:58 PM", direction: "Inbound", verdict: "Malicious", hasAttachment: true, attachmentName: "security_report.exe", attachmentSize: "1.2 MB",
    spfResult: "Fail", dkimResult: "Fail", dmarcResult: "Fail", senderIP: "172.16.88.200", score: 98,
    threatType: "Malware Delivery",
    body: "Dear Customer,\n\nWe detected unusual login activity on your account. Please review the attached security report immediately.\n\nClick here to verify your identity.\n\nBank of America Security Team",
    headers: [
      { key: "Return-Path", value: "<alert@bank0famerica.com>" },
      { key: "X-Mailer", value: "The Bat! v9.3" },
      { key: "Received", value: "from mx1.bank0famerica.com (172.16.88.200)" },
      { key: "Content-Type", value: "multipart/mixed" },
    ],
  },
  {
    id: "EM-4866", from: "sarah.williams@corp.local", fromDisplay: "Sarah Williams", to: "external-partner@vendor.com", toDisplay: "External Partner", subject: "Q1 Project Deliverables Update",
    date: "Feb 18, 2026", time: "04:30 PM", direction: "Outbound", verdict: "Clean", hasAttachment: true, attachmentName: "Q1_deliverables.xlsx", attachmentSize: "54 KB",
    spfResult: "Pass", dkimResult: "Pass", dmarcResult: "Pass", senderIP: "10.0.0.42", score: 0,
    body: "Hi Team,\n\nPlease find attached the updated Q1 deliverables spreadsheet. Let me know if you have any questions.\n\nBest regards,\nSarah",
  },
  {
    id: "EM-4865", from: "support@dropbox-share[.]info", fromDisplay: "Dropbox (Fake)", to: "alex.taylor@corp.local", toDisplay: "Alex Taylor", subject: "Someone shared a file with you",
    date: "Feb 18, 2026", time: "03:22 PM", direction: "Inbound", verdict: "Quarantined", hasAttachment: false, score: 82,
    spfResult: "Fail", dkimResult: "None", dmarcResult: "Fail", senderIP: "195.22.127.93",
    threatType: "Phishing Link",
    body: "Alex Taylor,\n\nJohn from your organization has shared a document with you. Click below to access it:\n\n[View Document]\n\nThis link will expire in 24 hours.\n\nDropbox Team",
    headers: [
      { key: "Return-Path", value: "<no-reply@dropbox-share.info>" },
      { key: "Received", value: "from smtp.dropbox-share.info (195.22.127.93)" },
    ],
  },
  {
    id: "EM-4864", from: "newsletter@techcrunch.com", fromDisplay: "TechCrunch", to: "dev-team@corp.local", toDisplay: "Dev Team", subject: "TechCrunch Daily: AI Breakthroughs This Week",
    date: "Feb 18, 2026", time: "02:00 PM", direction: "Inbound", verdict: "Clean", hasAttachment: false, score: 1,
    spfResult: "Pass", dkimResult: "Pass", dmarcResult: "Pass", senderIP: "198.51.100.23",
    body: "Today's top stories:\n\n1. New AI model achieves breakthrough in code generation\n2. Cloud security market expected to reach $80B by 2027\n3. Zero-trust architecture adoption surges\n\nRead more at techcrunch.com",
  },
  {
    id: "EM-4863", from: "ceo@corp-executive[.]org", fromDisplay: "CEO (Impersonation)", to: "finance@corp.local", toDisplay: "Finance Dept", subject: "Wire Transfer Request — Confidential",
    date: "Feb 18, 2026", time: "01:15 PM", direction: "Inbound", verdict: "Quarantined", hasAttachment: false, score: 91,
    spfResult: "Fail", dkimResult: "Fail", dmarcResult: "Fail", senderIP: "103.235.46.19",
    threatType: "Business Email Compromise",
    body: "Hi Finance Team,\n\nI need you to process an urgent wire transfer of $47,500 to the following account. This is time-sensitive and confidential.\n\nBank: First National\nAccount: 8274910384\nRouting: 021000021\n\nPlease confirm once done.\n\nRegards,\nCEO",
    headers: [
      { key: "Return-Path", value: "<ceo@corp-executive.org>" },
      { key: "Reply-To", value: "<ceo-private@protonmail.com>" },
      { key: "Received", value: "from mx.corp-executive.org (103.235.46.19)" },
    ],
  },
  {
    id: "EM-4862", from: "it-helpdesk@corp.local", fromDisplay: "IT Helpdesk", to: "new-hire@corp.local", toDisplay: "New Hire", subject: "Welcome! Your IT Onboarding Checklist",
    date: "Feb 18, 2026", time: "10:00 AM", direction: "Outbound", verdict: "Clean", hasAttachment: true, attachmentName: "onboarding_checklist.pdf", attachmentSize: "92 KB",
    spfResult: "Pass", dkimResult: "Pass", dmarcResult: "Pass", senderIP: "10.0.0.5", score: 0,
    body: "Welcome to the team!\n\nPlease find attached your IT onboarding checklist. Complete all items within your first week.\n\nContact IT Helpdesk if you need assistance.\n\nBest,\nIT Support",
  },
];

const verdictConfig: Record<EmailVerdict, { icon: typeof Shield; color: string; bg: string; border: string }> = {
  Clean: { icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/25" },
  Suspicious: { icon: ShieldAlert, color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/25" },
  Malicious: { icon: ShieldX, color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/25" },
  Quarantined: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/25" },
};

const authBadge = (result: string) => {
  switch (result) {
    case "Pass": return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium"><CheckCircle className="w-2.5 h-2.5" />Pass</span>;
    case "Fail": return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20 font-medium"><XCircle className="w-2.5 h-2.5" />Fail</span>;
    default: return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-muted/20 text-muted-foreground border border-white/[0.06] font-medium">None</span>;
  }
};

const ThreatScoreBar = ({ score }: { score: number }) => {
  const color = score >= 80 ? "bg-destructive" : score >= 50 ? "bg-yellow-500" : score >= 20 ? "bg-orange-400" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${score}%` }} />
      </div>
      <span className={cn("text-[10px] font-mono font-bold tabular-nums", score >= 80 ? "text-destructive" : score >= 50 ? "text-yellow-400" : score >= 20 ? "text-orange-400" : "text-emerald-400")}>{score}</span>
    </div>
  );
};

const EmailSecurity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [verdictFilter, setVerdictFilter] = useState<EmailVerdict | "All">("All");
  const [directionFilter, setDirectionFilter] = useState<EmailDirection | "All">("All");
  const [selectedEmail, setSelectedEmail] = useState<EmailEntry | null>(null);
  const [detailTab, setDetailTab] = useState<"overview" | "headers" | "body">("overview");

  const tick = useRealtimeSimulation(8000);

  const filtered = emailData.filter((e) => {
    const matchesSearch =
      e.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.fromDisplay.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerdict = verdictFilter === "All" || e.verdict === verdictFilter;
    const matchesDirection = directionFilter === "All" || e.direction === directionFilter;
    return matchesSearch && matchesVerdict && matchesDirection;
  });

  const stats = {
    total: emailData.length,
    clean: emailData.filter((e) => e.verdict === "Clean").length,
    suspicious: emailData.filter((e) => e.verdict === "Suspicious").length,
    malicious: emailData.filter((e) => e.verdict === "Malicious").length,
    quarantined: emailData.filter((e) => e.verdict === "Quarantined").length,
    inbound: emailData.filter((e) => e.direction === "Inbound").length,
    outbound: emailData.filter((e) => e.direction === "Outbound").length,
    withAttachments: emailData.filter((e) => e.hasAttachment).length,
  };

  const animatedTotal = useAnimatedValue(randomVariation(1247 + tick * 3, 2));
  const animatedBlocked = useAnimatedValue(randomVariation(89 + tick, 5));

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Email Security" />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-card/25 backdrop-blur-lg border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                Email Security Gateway
                <span className="flex items-center gap-1 text-[10px] font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Real-time email threat detection and analysis
                <span className="text-[10px] text-muted-foreground/50">·</span>
                <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3" />Last scan: 12s ago</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search sender, recipient, subject..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-background/50 border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 w-72 transition-colors backdrop-blur-sm" />
              </div>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"><Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" /></button>
              <button className="w-8 h-8 bg-primary/10 border border-primary/25 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"><User className="w-4 h-4" /></button>
            </div>
          </header>

          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              {/* Top Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { label: "Processed Today", value: animatedTotal, icon: Mail, color: "text-foreground", trend: "+12%", trendUp: true },
                  { label: "Inbound", value: stats.inbound, icon: Inbox, color: "text-primary", trend: null, trendUp: false },
                  { label: "Outbound", value: stats.outbound, icon: Send, color: "text-secondary", trend: null, trendUp: false },
                  { label: "Clean", value: stats.clean, icon: ShieldCheck, color: "text-emerald-400", trend: null, trendUp: false },
                  { label: "Suspicious", value: stats.suspicious, icon: ShieldAlert, color: "text-yellow-400", trend: null, trendUp: false },
                  { label: "Malicious", value: stats.malicious, icon: ShieldX, color: "text-destructive", trend: "+1", trendUp: false },
                  { label: "Quarantined", value: stats.quarantined, icon: AlertTriangle, color: "text-orange-400", trend: null, trendUp: false },
                  { label: "Blocked Today", value: animatedBlocked, icon: Ban, color: "text-destructive", trend: "-8%", trendUp: true },
                ].map((s) => (
                  <div key={s.label} className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-3 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all cursor-pointer group" onClick={() => {
                    if (["Clean", "Suspicious", "Malicious", "Quarantined"].includes(s.label)) setVerdictFilter(s.label as EmailVerdict);
                    else if (s.label === "Inbound" || s.label === "Outbound") { setDirectionFilter(s.label as EmailDirection); setVerdictFilter("All"); }
                    else { setVerdictFilter("All"); setDirectionFilter("All"); }
                  }}>
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider leading-tight">{s.label}</p>
                      <s.icon className={cn("w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity", s.color)} />
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className={cn("text-xl font-bold tabular-nums leading-none", s.color)}>{s.value}</span>
                      {s.trend && (
                        <span className={cn("text-[9px] flex items-center gap-0.5 mb-0.5", s.trendUp ? "text-emerald-400" : "text-destructive")}>
                          {s.trendUp ? <ArrowDownRight className="w-2.5 h-2.5" /> : <ArrowUpRight className="w-2.5 h-2.5" />}
                          {s.trend}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Verdict:</span>
                  {(["All", "Clean", "Suspicious", "Malicious", "Quarantined"] as const).map((v) => (
                    <button key={v} onClick={() => setVerdictFilter(v)} className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium transition-all", verdictFilter === v ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent")}>
                      {v}
                    </button>
                  ))}
                </div>
                <div className="h-4 w-px bg-white/[0.08]" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Direction:</span>
                  {(["All", "Inbound", "Outbound"] as const).map((d) => (
                    <button key={d} onClick={() => setDirectionFilter(d)} className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium transition-all", directionFilter === d ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent")}>
                      {d}
                    </button>
                  ))}
                </div>
                <div className="ml-auto text-[10px] text-muted-foreground">
                  Showing {filtered.length} of {emailData.length} emails
                </div>
              </div>

              {/* Email List + Detail Split */}
              <div className={cn("grid gap-6", selectedEmail ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1")}>
                {/* Email Table */}
                <div className={cn("relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] shadow-lg shadow-black/20", selectedEmail ? "lg:col-span-3" : "lg:col-span-5")}>
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary/20 opacity-40" />
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Verdict</th>
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Sender</th>
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Recipient</th>
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Subject</th>
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Threat Score</th>
                          <th className="text-left text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-4 py-3">Date</th>
                          <th className="text-center text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-3"><Paperclip className="w-3 h-3 mx-auto" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((email) => {
                          const vc = verdictConfig[email.verdict];
                          const VIcon = vc.icon;
                          const isSelected = selectedEmail?.id === email.id;
                          return (
                            <tr key={email.id} onClick={() => { setSelectedEmail(email); setDetailTab("overview"); }} className={cn("border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.03] transition-all cursor-pointer group", isSelected && "bg-primary/[0.06] border-l-2 border-l-primary")}>
                              <td className="px-4 py-2.5">
                                <span className={cn("inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap", vc.bg, vc.color, vc.border)}>
                                  <VIcon className="w-3 h-3" />
                                  {email.verdict}
                                </span>
                              </td>
                              <td className="px-4 py-2.5">
                                <div>
                                  <span className="text-xs text-foreground font-medium block truncate max-w-[160px]">{email.fromDisplay}</span>
                                  <span className="text-[10px] text-muted-foreground/60 font-mono block truncate max-w-[160px]">{email.from}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5">
                                <div>
                                  <span className="text-xs text-muted-foreground block truncate max-w-[120px]">{email.toDisplay}</span>
                                  <span className="text-[10px] text-muted-foreground/50 font-mono block truncate max-w-[120px]">{email.to}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-1.5">
                                  {email.direction === "Inbound" ? <Inbox className="w-3 h-3 text-muted-foreground/40 shrink-0" /> : <Send className="w-3 h-3 text-muted-foreground/40 shrink-0" />}
                                  <span className="text-xs text-foreground group-hover:text-primary transition-colors truncate max-w-[200px]">{email.subject}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 min-w-[100px]">
                                <ThreatScoreBar score={email.score} />
                              </td>
                              <td className="px-4 py-2.5 whitespace-nowrap">
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{email.time}</span>
                                <span className="text-[9px] text-muted-foreground/50">{email.date}</span>
                              </td>
                              <td className="px-3 py-2.5 text-center">{email.hasAttachment && <Paperclip className="w-3.5 h-3.5 text-muted-foreground/60 mx-auto" />}</td>
                            </tr>
                          );
                        })}
                        {filtered.length === 0 && (
                          <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-muted-foreground">No emails match your filters</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detail Panel */}
                {selectedEmail && (
                  <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] shadow-lg shadow-black/20 flex flex-col">
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    
                    {/* Detail Header */}
                    <div className="px-5 pt-4 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground font-mono">{selectedEmail.id}</span>
                        <button onClick={() => setSelectedEmail(null)} className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"><XCircle className="w-4 h-4" /></button>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{selectedEmail.subject}</h3>
                      {/* Verdict badge */}
                      {(() => {
                        const vc = verdictConfig[selectedEmail.verdict];
                        const VIcon = vc.icon;
                        return (
                          <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border", vc.bg, vc.border)}>
                            <VIcon className={cn("w-4 h-4", vc.color)} />
                            <div>
                              <span className={cn("text-xs font-bold", vc.color)}>{selectedEmail.verdict}</span>
                              {selectedEmail.threatType && <span className="text-[10px] text-muted-foreground ml-2">— {selectedEmail.threatType}</span>}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Detail Tabs */}
                    <div className="flex border-b border-white/[0.06]">
                      {(["overview", "headers", "body"] as const).map((tab) => (
                        <button key={tab} onClick={() => setDetailTab(tab)} className={cn("flex-1 px-3 py-2 text-[11px] font-medium uppercase tracking-wider transition-all", detailTab === tab ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground")}>
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Detail Content */}
                    <div className="flex-1 overflow-auto p-5 space-y-4">
                      {detailTab === "overview" && (
                        <>
                          {/* Sender / Recipient */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-background/30 border border-white/[0.05]">
                              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">From</p>
                              <p className="text-xs text-foreground font-medium">{selectedEmail.fromDisplay}</p>
                              <p className="text-[10px] text-muted-foreground/60 font-mono break-all mt-0.5">{selectedEmail.from}</p>
                              <p className="text-[9px] text-muted-foreground/40 mt-1">IP: {selectedEmail.senderIP}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-background/30 border border-white/[0.05]">
                              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">To</p>
                              <p className="text-xs text-foreground font-medium">{selectedEmail.toDisplay}</p>
                              <p className="text-[10px] text-muted-foreground/60 font-mono break-all mt-0.5">{selectedEmail.to}</p>
                              <p className="text-[9px] text-muted-foreground/40 mt-1">{selectedEmail.direction} · {selectedEmail.date}</p>
                            </div>
                          </div>

                          {/* Threat Score */}
                          <div className="p-3 rounded-lg bg-background/30 border border-white/[0.05]">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2">Threat Score</p>
                            <ThreatScoreBar score={selectedEmail.score} />
                          </div>

                          {/* Auth Results */}
                          <div className="p-3 rounded-lg bg-background/30 border border-white/[0.05]">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2.5">Email Authentication</p>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center">
                                <p className="text-[9px] text-muted-foreground mb-1.5 font-medium">SPF</p>
                                {authBadge(selectedEmail.spfResult)}
                              </div>
                              <div className="text-center">
                                <p className="text-[9px] text-muted-foreground mb-1.5 font-medium">DKIM</p>
                                {authBadge(selectedEmail.dkimResult)}
                              </div>
                              <div className="text-center">
                                <p className="text-[9px] text-muted-foreground mb-1.5 font-medium">DMARC</p>
                                {authBadge(selectedEmail.dmarcResult)}
                              </div>
                            </div>
                          </div>

                          {/* Attachment */}
                          {selectedEmail.hasAttachment && (
                            <div className="p-3 rounded-lg bg-background/30 border border-white/[0.05]">
                              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2">Attachment</p>
                              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-background/50 border border-white/[0.06]">
                                <FileWarning className="w-4 h-4 text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs text-foreground font-mono block truncate">{selectedEmail.attachmentName}</span>
                                  {selectedEmail.attachmentSize && <span className="text-[9px] text-muted-foreground/50">{selectedEmail.attachmentSize}</span>}
                                </div>
                                {(selectedEmail.verdict === "Malicious" || selectedEmail.verdict === "Quarantined") && (
                                  <span className="text-[9px] px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20 font-medium shrink-0">Blocked</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2 pt-1">
                            <button className="flex-1 px-3 py-2 rounded-lg text-[11px] font-medium bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" /> Investigate
                            </button>
                            {selectedEmail.verdict !== "Clean" && (
                              <button className="flex-1 px-3 py-2 rounded-lg text-[11px] font-medium bg-destructive/10 text-destructive border border-destructive/25 hover:bg-destructive/20 transition-colors flex items-center justify-center gap-1.5">
                                <Ban className="w-3.5 h-3.5" /> Block Sender
                              </button>
                            )}
                            {selectedEmail.verdict === "Quarantined" && (
                              <button className="flex-1 px-3 py-2 rounded-lg text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5">
                                <MailOpen className="w-3.5 h-3.5" /> Release
                              </button>
                            )}
                          </div>
                        </>
                      )}

                      {detailTab === "headers" && (
                        <div className="space-y-1">
                          {selectedEmail.headers ? selectedEmail.headers.map((h, i) => (
                            <div key={i} className="px-3 py-2 rounded-md bg-background/30 border border-white/[0.04]">
                              <span className="text-[10px] text-primary font-mono font-medium">{h.key}: </span>
                              <span className="text-[10px] text-foreground/80 font-mono break-all">{h.value}</span>
                            </div>
                          )) : (
                            <p className="text-xs text-muted-foreground text-center py-8">No header data available</p>
                          )}
                        </div>
                      )}

                      {detailTab === "body" && (
                        <div className="px-4 py-3 rounded-lg bg-background/30 border border-white/[0.05]">
                          {selectedEmail.body ? (
                            <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-sans leading-relaxed">{selectedEmail.body}</pre>
                          ) : (
                            <p className="text-xs text-muted-foreground text-center py-8">No body content available</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailSecurity;
