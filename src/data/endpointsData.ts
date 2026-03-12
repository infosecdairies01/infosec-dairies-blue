export interface Endpoint {
  id: string;
  hostname: string;
  ip: string;
  os: "Windows" | "Linux" | "macOS";
  osVersion: string;
  status: "Online" | "Offline" | "Isolated";
  risk: "Critical" | "High" | "Medium" | "Low";
  lastSeen: string;
  user: string;
  department: string;
  edrStatus: "Active" | "Outdated" | "Disabled";
  openAlerts: number;
  cpu: number;
  memory: number;
  disk: number;
  agent: string;
  lastPatch: string;
}

export const endpointsData: Endpoint[] = [
  { id: "EP-001", hostname: "WKS-PC-0127", ip: "192.168.1.127", os: "Windows", osVersion: "11 Pro 23H2", status: "Online", risk: "Critical", lastSeen: "Just now", user: "J. Smith", department: "Finance", edrStatus: "Active", openAlerts: 5, cpu: 78, memory: 85, disk: 62, agent: "CrowdStrike v7.14", lastPatch: "2026-02-28" },
  { id: "EP-002", hostname: "WKS-PC-0042", ip: "192.168.1.42", os: "Windows", osVersion: "11 Pro 23H2", status: "Online", risk: "Low", lastSeen: "2m ago", user: "A. Chen", department: "Engineering", edrStatus: "Active", openAlerts: 0, cpu: 45, memory: 52, disk: 38, agent: "CrowdStrike v7.14", lastPatch: "2026-03-10" },
  { id: "EP-003", hostname: "SRV-DB-01", ip: "10.0.0.10", os: "Linux", osVersion: "Ubuntu 22.04 LTS", status: "Online", risk: "Medium", lastSeen: "1m ago", user: "svc_database", department: "IT Infra", edrStatus: "Active", openAlerts: 2, cpu: 92, memory: 88, disk: 75, agent: "CrowdStrike v7.12", lastPatch: "2026-03-05" },
  { id: "EP-004", hostname: "WKS-MKT-015", ip: "192.168.2.15", os: "macOS", osVersion: "Sonoma 14.3", status: "Offline", risk: "High", lastSeen: "3h ago", user: "M. Davis", department: "Marketing", edrStatus: "Outdated", openAlerts: 3, cpu: 0, memory: 0, disk: 91, agent: "CrowdStrike v7.10", lastPatch: "2026-01-15" },
  { id: "EP-005", hostname: "SRV-DEV-02", ip: "10.0.1.22", os: "Linux", osVersion: "CentOS 8 Stream", status: "Isolated", risk: "Critical", lastSeen: "1h ago", user: "svc_deploy", department: "DevOps", edrStatus: "Active", openAlerts: 8, cpu: 34, memory: 67, disk: 55, agent: "CrowdStrike v7.14", lastPatch: "2026-03-01" },
  { id: "EP-006", hostname: "WKS-HR-008", ip: "192.168.3.8", os: "Windows", osVersion: "10 Pro 22H2", status: "Online", risk: "Low", lastSeen: "5m ago", user: "K. Patel", department: "HR", edrStatus: "Active", openAlerts: 0, cpu: 22, memory: 41, disk: 29, agent: "CrowdStrike v7.14", lastPatch: "2026-03-11" },
  { id: "EP-007", hostname: "WKS-EXC-001", ip: "192.168.1.200", os: "Windows", osVersion: "11 Enterprise", status: "Online", risk: "Medium", lastSeen: "Just now", user: "CEO Office", department: "Executive", edrStatus: "Active", openAlerts: 1, cpu: 15, memory: 35, disk: 42, agent: "CrowdStrike v7.14", lastPatch: "2026-03-09" },
  { id: "EP-008", hostname: "SRV-WEB-01", ip: "10.0.2.5", os: "Linux", osVersion: "Debian 12", status: "Online", risk: "Low", lastSeen: "30s ago", user: "svc_nginx", department: "IT Infra", edrStatus: "Active", openAlerts: 0, cpu: 55, memory: 62, disk: 48, agent: "CrowdStrike v7.14", lastPatch: "2026-03-08" },
  { id: "EP-009", hostname: "WKS-SEC-003", ip: "192.168.4.12", os: "Windows", osVersion: "11 Pro 23H2", status: "Online", risk: "Low", lastSeen: "1m ago", user: "R. Lopez", department: "Security", edrStatus: "Active", openAlerts: 0, cpu: 38, memory: 55, disk: 33, agent: "CrowdStrike v7.14", lastPatch: "2026-03-12" },
  { id: "EP-010", hostname: "SRV-MAIL-01", ip: "10.0.3.2", os: "Linux", osVersion: "RHEL 9.3", status: "Online", risk: "High", lastSeen: "45s ago", user: "svc_mail", department: "IT Infra", edrStatus: "Outdated", openAlerts: 4, cpu: 71, memory: 79, disk: 82, agent: "CrowdStrike v7.11", lastPatch: "2026-02-10" },
];
