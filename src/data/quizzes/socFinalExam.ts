import type { QuizData } from "@/data/quizData";

/**
 * Blue Team & SOC Fundamentals — Final Certification Exam (q6)
 * 40 scenario-based questions spanning all 10 course modules.
 */
export const socFinalExam: QuizData[] = [
  {
    quizId: "q6",
    courseId: "soc-fundamentals",
    title: "Final Certification Exam",
    description:
      "Comprehensive scenario-based exam covering SOC operations, threat landscape, log analysis, SIEM, alert triage, incident response, threat intelligence and reporting. 80% required to certify.",
    passingScore: 80,
    timeLimit: 60,
    questions: [
      {
        id: "q6-1",
        difficulty: "easy",
        tags: ["SOC Operations"],
        scenario:
          "You are the only Tier 1 analyst on the 02:00 shift. Four alerts land within one minute:\n  A) Failed logins x12 for user jdoe from the corporate VPN range\n  B) EDR: ransomware behaviour blocked on FIN-WS-14\n  C) Outbound beacon to a known C2 IP from SRV-APP-02 (still active)\n  D) USB mass-storage device connected on HR-WS-03",
        question: "Which alert do you work first?",
        options: [
          "A — repeated failed logins could be an account takeover in progress and must be checked first.",
          "C — an active outbound C2 session means an adversary currently has interactive control of a server.",
          "B — ransomware is the most damaging malware class regardless of whether it was blocked.",
          "D — data could be walking out the door on removable media right now.",
        ],
        correctAnswer: 1,
        explanation:
          "Triage ranks by active, unmitigated impact. B was already blocked by EDR, A is likely a password issue on a trusted range, D is policy-level. C is a live adversary channel on a server — nothing else outranks an ongoing compromise.",
      },
      {
        id: "q6-2",
        difficulty: "easy",
        tags: ["SOC Roles"],
        scenario:
          "During handover, a Tier 1 analyst finds an alert that needs memory forensics and malware reversing to resolve.",
        question: "What is the correct action?",
        options: [
          "Escalate to Tier 2/3 with the triage notes, evidence collected so far and a clear statement of what is unknown.",
          "Close the alert as inconclusive because Tier 1 cannot complete the required analysis.",
          "Attempt the memory analysis anyway to build experience, then escalate only if it fails.",
          "Leave the alert open with no notes so the next shift can start fresh without bias.",
        ],
        correctAnswer: 0,
        explanation:
          "Tier 1 owns triage and enrichment, not deep forensics. Escalation quality is measured by the notes: what was seen, what was checked, what remains unknown.",
      },
      {
        id: "q6-3",
        difficulty: "medium",
        tags: ["Metrics"],
        scenario:
          "Your SOC reports MTTA of 4 minutes and MTTR of 26 hours. Management wants MTTR cut in half.",
        question: "Which change most directly moves MTTR?",
        options: [
          "Add more alert sources to the SIEM so analysts have more context available during investigations.",
          "Hire additional Tier 1 analysts to reduce the queue depth during peak hours of the day.",
          "Automate enrichment and containment steps in the response playbooks and pre-approve isolation actions.",
          "Lower the alerting thresholds so incidents are detected earlier in the attack chain.",
        ],
        correctAnswer: 2,
        explanation:
          "MTTA is already excellent, so the delay lives in the response phase. Pre-approved containment plus automated enrichment removes the waiting-for-approval and manual-lookup time that dominates MTTR.",
      },
      {
        id: "q6-4",
        difficulty: "medium",
        tags: ["Threat Actors"],
        scenario:
          "An intrusion shows: 9 months of dwell time, credential theft, custom implants, targeted collection of engineering documents, no financial demand.",
        question: "Which actor profile best fits?",
        options: [
          "A state-sponsored espionage group focused on long-term intellectual property collection.",
          "A ransomware affiliate that has not yet reached the encryption stage of its playbook.",
          "A hacktivist collective attempting to gather material for a public leak campaign.",
          "An opportunistic commodity botnet operator monetising access through proxy resale.",
        ],
        correctAnswer: 0,
        explanation:
          "Long dwell, custom tooling, selective collection and the absence of monetisation are the classic espionage signature. Criminal crews monetise fast; hacktivists publish.",
      },
      {
        id: "q6-5",
        difficulty: "medium",
        tags: ["MITRE ATT&CK"],
        scenario:
          "A user opens Invoice.docm; winword.exe spawns powershell.exe with an encoded command that downloads a payload.",
        question: "Which ATT&CK techniques are represented, in order?",
        options: [
          "T1190 Exploit Public-Facing Application, then T1078 Valid Accounts.",
          "T1566.001 Spearphishing Attachment, then T1059.001 PowerShell.",
          "T1055 Process Injection, then T1105 Ingress Tool Transfer only.",
          "T1053.005 Scheduled Task, then T1486 Data Encrypted for Impact.",
        ],
        correctAnswer: 1,
        explanation:
          "The attachment is the initial-access technique (T1566.001); the encoded PowerShell child process is command and scripting interpreter execution (T1059.001).",
      },
      {
        id: "q6-6",
        difficulty: "hard",
        tags: ["Pyramid of Pain"],
        scenario:
          "You can block one thing about an adversary for the next 90 days.",
        question: "Which choice inflicts the most cost on the attacker?",
        options: [
          "Block the current C2 IP address at the perimeter firewall for all outbound traffic.",
          "Blocklist the SHA-256 hash of the dropper binary observed in the last incident.",
          "Detect the behavioural TTP — Office applications spawning script interpreters.",
          "Block the specific domain name that the implant used for its callback traffic.",
        ],
        correctAnswer: 2,
        explanation:
          "Hashes, IPs and domains are trivially rotated. Detecting the behaviour forces the adversary to redesign their tradecraft — the top of the Pyramid of Pain.",
      },
      {
        id: "q6-7",
        difficulty: "easy",
        tags: ["Windows Logs"],
        scenario: "Security log: EID 4624, LogonType 10, source 203.0.113.44, account: administrator, 03:14 local time.",
        question: "What does this represent?",
        options: [
          "A successful interactive RDP logon by the administrator account from an external IP address.",
          "A failed network logon attempt that was blocked by the local host firewall policy.",
          "A scheduled task starting under the administrator account on the local machine.",
          "A service account authenticating to a network share using cached Kerberos tickets.",
        ],
        correctAnswer: 0,
        explanation:
          "4624 is a successful logon; LogonType 10 is RemoteInteractive (RDP). An external source IP plus the built-in administrator account at 03:14 is a high-priority finding.",
      },
      {
        id: "q6-8",
        difficulty: "medium",
        tags: ["Windows Logs"],
        scenario: "System log: EID 7045, ServiceName=AdobeUpdater_x86, ImagePath=cmd /c powershell -w hidden -enc SQBFAFgA...",
        question: "What is the correct interpretation?",
        options: [
          "A legitimate Adobe product update service registering itself after a software patch cycle.",
          "Malicious service installation used for persistence and privilege-level execution (T1543.003).",
          "A Windows Update rollback service created automatically after a failed patch installation.",
          "A benign monitoring agent that the endpoint team deployed during the last change window.",
        ],
        correctAnswer: 1,
        explanation:
          "Legitimate vendors do not install services whose image path is an encoded, hidden PowerShell command. The friendly name is camouflage; EID 7045 with a script interpreter path is persistence.",
      },
      {
        id: "q6-9",
        difficulty: "medium",
        tags: ["Linux Logs"],
        scenario:
          "/var/log/auth.log: 800+ 'Failed password for invalid user' lines from 45.9.x.x in four minutes, then a single 'Accepted password for deploy'.",
        question: "What happened and what is the immediate priority?",
        options: [
          "A brute force that succeeded on the deploy account — disable the account, rotate the key and hunt post-auth activity.",
          "A misconfigured backup script retrying with stale credentials — update the script's stored password.",
          "Normal internet background noise — block the IP and close the ticket as a false positive.",
          "A port scan against SSH — no authentication actually occurred so no follow-up is required.",
        ],
        correctAnswer: 0,
        explanation:
          "The accepted logon after mass failures from the same source means the brute force worked. The compromise starts at that timestamp — everything after it must be reconstructed.",
      },
      {
        id: "q6-10",
        difficulty: "medium",
        tags: ["Log Integrity"],
        scenario:
          "Two sources disagree: the firewall logs a session at 14:02, the endpoint logs the same session at 09:02.",
        question: "What is the most likely explanation?",
        options: [
          "The endpoint clock is wrong because workstation clocks drift more than network appliance clocks.",
          "Timezone or NTP inconsistency — one source logs UTC and the other local time; normalise before correlating.",
          "The firewall duplicated the session record, which produces a false second timestamp in the log pipeline.",
          "The events are unrelated and simply happen to share the same source and destination addresses.",
        ],
        correctAnswer: 1,
        explanation:
          "A clean five-hour offset is a timezone/NTP artefact, not evidence. Normalising all logs to UTC at ingest is a prerequisite for any timeline.",
      },
      {
        id: "q6-11",
        difficulty: "easy",
        tags: ["SIEM Architecture"],
        scenario: "You are asked to explain the SIEM data flow to a new analyst.",
        question: "Which order is correct?",
        options: [
          "Correlation → collection → normalisation → storage → alerting → dashboards presented to the analyst.",
          "Collection → parsing/normalisation → indexing/storage → correlation → alerting → visualisation.",
          "Storage → collection → alerting → normalisation → correlation → reporting to management.",
          "Alerting → collection → correlation → parsing → storage → long-term compliance retention.",
        ],
        correctAnswer: 1,
        explanation:
          "Data must be collected and normalised into a common schema before correlation rules can compare fields across sources; alerting and dashboards sit on top of the indexed data.",
      },
      {
        id: "q6-12",
        difficulty: "medium",
        tags: ["SIEM", "Normalization"],
        scenario:
          "A correlation rule joining VPN logins with EDR process events never fires, even though both data sources are ingesting.",
        question: "What is the most likely cause?",
        options: [
          "The field names are not normalised to a common schema, so the join key does not match across sources.",
          "The SIEM licence volume has been exceeded, which silently disables all correlation rules in the tenant.",
          "Correlation rules cannot combine authentication and endpoint data in any commercial SIEM product.",
          "The rule needs a longer time window because VPN sessions always outlast endpoint process events.",
        ],
        correctAnswer: 0,
        explanation:
          "src_user vs. AccountName vs. UserPrincipalName will never join. Normalisation to a common information model is what makes cross-source correlation possible.",
      },
      {
        id: "q6-13",
        difficulty: "medium",
        tags: ["SIEM Queries"],
        scenario:
          "You need the top 10 destination IPs by bytes sent for one host in the last 24 hours in Splunk SPL.",
        question: "Which search is correct and efficient?",
        options: [
          "index=network host=WKS-01 earliest=-24h | stats sum(bytes_out) as total by dest_ip | sort -total | head 10",
          "index=* | search host=WKS-01 | table dest_ip bytes_out | sort bytes_out | head 10 over all available time",
          "index=network | head 10 | stats sum(bytes_out) by dest_ip where host=WKS-01 for the last 24 hours",
          "index=network host=WKS-01 | dedup dest_ip | sort dest_ip | head 10 to list the busiest destinations",
        ],
        correctAnswer: 0,
        explanation:
          "Filter first (index, host, time), aggregate second, then sort and truncate. `head` before `stats` would discard data; `index=*` without a time bound is the classic query that melts a search head.",
      },
      {
        id: "q6-14",
        difficulty: "hard",
        tags: ["Alert Tuning"],
        scenario:
          "A 'Brute Force Detection' rule generated 145 alerts last week: 130 from service account svc-monitor with an expired password, 10 from users mistyping VPN passwords, 5 genuine (2 successful).",
        question: "What is the best tuning action?",
        options: [
          "Raise the failure threshold from 5 to 50 attempts so that noisy sources stop triggering the rule.",
          "Disable the rule until the identity team finishes cleaning up all service account passwords.",
          "Exclude svc-monitor from this rule, create a separate service-account-auth-failure rule, and keep the user rule intact.",
          "Route every brute force alert to a low-priority queue that is reviewed once per week in bulk.",
        ],
        correctAnswer: 2,
        explanation:
          "Tuning removes known-benign noise without losing coverage. Raising the threshold to 50 would have missed the two successful compromises; disabling the rule removes detection entirely.",
      },
      {
        id: "q6-15",
        difficulty: "medium",
        tags: ["Detection Quality"],
        scenario:
          "A detection engineer proposes a rule that alerts on every PowerShell execution across 4,000 endpoints.",
        question: "What is the main problem?",
        options: [
          "PowerShell execution is ubiquitous and benign, so the rule will produce alert fatigue with near-zero precision.",
          "PowerShell logging cannot be forwarded to a SIEM without installing a third-party agent on every host.",
          "The rule will miss attacks because adversaries never use PowerShell on modern Windows versions.",
          "Alerting on any Microsoft-signed binary is prohibited by the MITRE ATT&CK framework guidance.",
        ],
        correctAnswer: 0,
        explanation:
          "Good detections target suspicious context — encoded commands, hidden windows, unusual parents, download cradles — not the mere presence of an administrative tool.",
      },
      {
        id: "q6-16",
        difficulty: "medium",
        tags: ["Triage"],
        scenario:
          "An alert fires for 'Impossible Travel': login from Mumbai at 10:02 and from Frankfurt at 10:31 for the same user.",
        question: "What is the first enrichment step before escalating?",
        options: [
          "Immediately disable the account and force a password reset for the affected user across all systems.",
          "Check whether one of the sessions came from a corporate VPN egress or a cloud proxy that relocates the source IP.",
          "Search the internet for the reputation of both IP addresses and open a threat intelligence request.",
          "Wait 24 hours to see whether the pattern repeats before spending analyst time on the alert.",
        ],
        correctAnswer: 1,
        explanation:
          "VPN and SASE egress points are the single largest source of impossible-travel false positives. Confirm the geolocation is real before disrupting a user.",
      },
      {
        id: "q6-17",
        difficulty: "hard",
        tags: ["Triage", "Evidence"],
        scenario:
          "You have 30 minutes left in the shift and an alert that is 'probably' benign but you cannot prove it.",
        question: "What is the professional action?",
        options: [
          "Close it as a false positive and note that time constraints prevented full verification of the alert.",
          "Escalate with documented findings, the specific unresolved question, and the evidence gathered so far.",
          "Leave the alert untouched in the queue so the next shift makes their own independent judgement.",
          "Mark it as a duplicate of an older similar alert to keep the queue clean for the next shift.",
        ],
        correctAnswer: 1,
        explanation:
          "'Probably benign' without proof is an open question, not a closure. Escalation with a crisp unresolved question is how shift handover preserves detection value.",
      },
      {
        id: "q6-18",
        difficulty: "medium",
        tags: ["Phishing"],
        scenario:
          "Header excerpt:\n  From: ceo@yourcompany.com\n  Return-Path: bounce@mail-relay.tld\n  SPF: fail (sender IP 45.61.x.x not permitted)\n  DKIM: none\n  DMARC: fail",
        question: "What does this indicate?",
        options: [
          "A spoofed sender — the display domain is impersonated and authentication failed on all three checks.",
          "A legitimate email forwarded through a mailing list, which commonly breaks SPF but not DMARC.",
          "A misconfigured internal mail server which should be corrected by the messaging team only.",
          "An encrypted message whose authentication headers cannot be evaluated by the gateway.",
        ],
        correctAnswer: 0,
        explanation:
          "SPF fail plus no DKIM plus DMARC fail on an internal-looking From address is domain spoofing. Forwarding breaks SPF but DKIM usually survives — here it is absent entirely.",
      },
      {
        id: "q6-19",
        difficulty: "medium",
        tags: ["Phishing Response"],
        scenario: "Twelve users received the spoofed CEO email; three clicked the link; one entered credentials.",
        question: "Which response set is correct and complete?",
        options: [
          "Reset the one victim's password only, since the other users did not submit any credentials at all.",
          "Purge the message from all mailboxes, block the URL/domain, reset and re-MFA the victim, hunt for logins from the phishing infrastructure, and check the two other clickers for payload execution.",
          "Send a company-wide awareness email describing the phishing attempt and close the incident.",
          "Block the sender address at the gateway and monitor for any repeat attempts over the coming week.",
        ],
        correctAnswer: 1,
        explanation:
          "Phishing response must cover removal, blocking, victim remediation and post-compromise hunting. Credential harvesting is followed by immediate authentication attempts — you must look for them.",
      },
      {
        id: "q6-20",
        difficulty: "medium",
        tags: ["Malware Triage"],
        scenario:
          "A user reports a slow machine. EDR shows svchost.exe running from C:\\Users\\Public\\ with parent explorer.exe.",
        question: "What is the strongest conclusion?",
        options: [
          "This is normal — svchost.exe is a Microsoft binary and is often launched from the user's session.",
          "Masquerading (T1036): the real svchost.exe runs from System32 and is never a child of explorer.exe.",
          "The machine needs a disk cleanup because temporary system files were copied to the Public folder.",
          "This is a Windows Update artefact that will be removed automatically at the next reboot cycle.",
        ],
        correctAnswer: 1,
        explanation:
          "Path and parentage are the tell. Knowing the normal Windows process tree is what turns a slow-PC ticket into a malware detection.",
      },
      {
        id: "q6-21",
        difficulty: "hard",
        tags: ["Persistence"],
        scenario:
          "After cleaning malware from three hosts, the same implant reappears on a fourth host in the same subnet a week later.",
        question: "What is the most likely cause and correct response?",
        options: [
          "Antivirus signatures were stale; update the AV engine and rescan the affected subnet again.",
          "Coincidental reinfection from the internet; repeat the same removal steps on the new host.",
          "Incomplete eradication — a missed persistence mechanism or the initial access vector is still open; hunt the whole environment before declaring eradication.",
          "The EDR agent failed on host four; reinstall the agent and continue normal monitoring operations.",
        ],
        correctAnswer: 2,
        explanation:
          "Reinfection almost always means root cause or persistence was missed. Mature eradication scopes every host, every persistence location and every credential touched.",
      },
      {
        id: "q6-22",
        difficulty: "easy",
        tags: ["IR Lifecycle"],
        scenario: "Your team removed a webshell, rotated credentials, restored from backup and closed the ticket.",
        question: "Which NIST phase was skipped?",
        options: [
          "Containment — the server should have remained isolated throughout the restoration process.",
          "Detection and Analysis — the triggering SIEM rule was never validated for accuracy.",
          "Preparation — the incident response plan should be rewritten before handling future incidents.",
          "Post-Incident Activity — root cause analysis, control gap identification and runbook updates.",
        ],
        correctAnswer: 3,
        explanation:
          "Closing without a lessons-learned review guarantees recurrence: the webshell arrived through an unpatched CVE or misconfiguration that is still there.",
      },
      {
        id: "q6-23",
        difficulty: "medium",
        tags: ["Containment"],
        scenario:
          "EDR confirms ransomware is actively encrypting files on WS-203, which has \\\\fileserver\\finance mounted.",
        question: "What is the correct first containment step?",
        options: [
          "Pull the power cable immediately to stop encryption in the fastest possible way.",
          "Network-isolate the host through EDR (preserving memory) and revoke the user's share permissions.",
          "Reimage the workstation right away from the golden image to remove all malicious files.",
          "Identify the exact ransomware family before taking any containment action on the host.",
        ],
        correctAnswer: 1,
        explanation:
          "Isolation stops encryption of network shares and C2 while preserving volatile evidence. Pulling power destroys memory artefacts, including possible key material.",
      },
      {
        id: "q6-24",
        difficulty: "hard",
        tags: ["Evidence", "Chain of Custody"],
        scenario: "The incident may end up in litigation. You captured a memory image and ran live commands.",
        question: "What must be documented for the evidence to hold up?",
        options: [
          "Chain of custody: who collected and handled what, when, tool and version, SHA-256 at collection, storage location, and every signed transfer.",
          "Nothing extra — the EDR platform automatically records all analyst actions in an audit log.",
          "A folder of the collected files on a shared drive so the legal team can access them quickly.",
          "An email to the legal department containing the acquired artefacts as attachments.",
        ],
        correctAnswer: 0,
        explanation:
          "Admissibility depends on demonstrable integrity (hashes at collection and use) and an unbroken chain of handling. Without it the evidence is excluded.",
      },
      {
        id: "q6-25",
        difficulty: "medium",
        tags: ["Volatility Order"],
        scenario: "You must collect evidence from a live compromised server before it is rebuilt.",
        question: "Which collection order follows RFC 3227?",
        options: [
          "Disk image → memory → network connections → registry hives → CPU cache and registers last.",
          "Registers/cache → memory (RAM) → network state → disk → remote logs → archival media.",
          "Remote logs → disk image → memory → network state → running process list → CPU registers.",
          "Memory → disk image → CPU cache → archival backups → routing tables and ARP cache.",
        ],
        correctAnswer: 1,
        explanation:
          "Collect from most to least volatile. Anything you do on the host changes memory and network state, so those must be captured before touching disk.",
      },
      {
        id: "q6-26",
        difficulty: "medium",
        tags: ["Communication"],
        scenario: "Thirty minutes into a major incident the CEO asks: 'Is our customer data safe?'",
        question: "What is the best response?",
        options: [
          "'Yes, everything is fine' — reassure leadership so they can calm the board and staff.",
          "'We have contained the affected host. Current evidence shows no access to the customer database; I will update you in 30 minutes.'",
          "'We cannot comment until the investigation is complete and legal has reviewed the findings.'",
          "'It's too early to say anything at all' — decline to provide any assessment during the response.",
        ],
        correctAnswer: 1,
        explanation:
          "Executive communication should be factual, scoped to current evidence, and time-bounded with a next update. Never over-promise, never stonewall.",
      },
      {
        id: "q6-27",
        difficulty: "hard",
        tags: ["Recovery"],
        scenario: "Servers were restored from backup after a compromise. The team wants to reconnect them to production now.",
        question: "What gates must be passed first?",
        options: [
          "Backup verified as pre-compromise clean, initial access vector closed, credentials rotated, heightened monitoring in place, and recovery validated in an isolated segment.",
          "Backups are inherently clean, so reconnecting immediately is acceptable once the restore completes.",
          "Reconnect during a night maintenance window to minimise the impact on business users.",
          "Wait a mandatory 30 days of observation regardless of what the investigation findings show.",
        ],
        correctAnswer: 0,
        explanation:
          "Restoring without closing root cause is how organisations are re-owned within days. Those five gates are the minimum recovery checklist.",
      },
      {
        id: "q6-28",
        difficulty: "medium",
        tags: ["Threat Intelligence"],
        scenario:
          "A feed flags 203.0.113.10 as malicious. Your logs show 4,000 internal hosts connecting to it daily on 443, and it resolves to a major CDN.",
        question: "What should you do?",
        options: [
          "Block the IP at the perimeter immediately because a trusted feed labelled it as malicious.",
          "Assess confidence: shared CDN infrastructure plus ubiquitous internal traffic means enrich and monitor, not block.",
          "Open a critical incident for all 4,000 hosts and begin isolating them in batches by department.",
          "Remove the feed from the SIEM because it produced an incorrect indicator this one time.",
        ],
        correctAnswer: 1,
        explanation:
          "Blocking shared infrastructure causes self-inflicted outages. Weigh indicator context and confidence before taking any blocking action.",
      },
      {
        id: "q6-29",
        difficulty: "medium",
        tags: ["Threat Intelligence"],
        scenario: "Management asks the difference between strategic, operational and tactical intelligence.",
        question: "Which mapping is correct?",
        options: [
          "Strategic = IOC feeds, operational = board briefings, tactical = long-term risk trend analysis.",
          "Strategic = long-term risk and actor trends for leadership, operational = campaign/TTP detail for defenders, tactical = IOCs and detections.",
          "Strategic = firewall blocklists, operational = malware hashes, tactical = geopolitical reporting.",
          "All three describe the same data presented at different refresh intervals to the same audience.",
        ],
        correctAnswer: 1,
        explanation:
          "The tiers differ by audience and shelf life: strategic informs investment, operational informs hunting and detection design, tactical feeds machines.",
      },
      {
        id: "q6-30",
        difficulty: "hard",
        tags: ["Network Monitoring"],
        scenario:
          "A host makes a connection to the same external IP every 60 seconds ±3 seconds, 24 hours a day, with 24-byte payloads over TLS.",
        question: "What does this pattern indicate?",
        options: [
          "C2 beaconing — regular low-jitter intervals with tiny uniform payloads are the signature of an implant check-in.",
          "A standard software update client polling for new package versions from the vendor.",
          "An NTP time synchronisation client keeping the workstation clock accurate throughout the day.",
          "A misconfigured monitoring agent that retries a failed health check every minute.",
        ],
        correctAnswer: 0,
        explanation:
          "Legitimate polling is usually far less regular and carries variable payloads. Fixed interval plus small jitter plus constant tiny payload size is beaconing until proven otherwise.",
      },
      {
        id: "q6-31",
        difficulty: "medium",
        tags: ["Network Monitoring"],
        scenario:
          "DNS logs show 1,200 unique subdomains of exfil.attacker.tld queried as TXT records from one host in five minutes.",
        question: "What is happening?",
        options: [
          "DNS tunnelling / exfiltration — data is encoded into subdomain labels and TXT responses.",
          "A DNS cache poisoning attack against the internal recursive resolver of the organisation.",
          "Normal CDN behaviour where content nodes are resolved dynamically per request.",
          "A DNS amplification denial-of-service attack targeting the external authoritative server.",
        ],
        correctAnswer: 0,
        explanation:
          "High-entropy unique subdomains, TXT record type and a single source host at high query rate is the textbook DNS tunnelling signature (T1071.004).",
      },
      {
        id: "q6-32",
        difficulty: "easy",
        tags: ["Defence in Depth"],
        scenario: "Leadership asks why EDR alone is not enough.",
        question: "What is the strongest justification?",
        options: [
          "EDR licences expire, so a second product is needed to guarantee coverage during renewal periods.",
          "No single control catches everything — layered network, identity, email and endpoint telemetry covers each other's blind spots.",
          "EDR only detects known malware signatures and cannot observe any behavioural activity.",
          "Compliance frameworks require exactly three security products regardless of their capability overlap.",
        ],
        correctAnswer: 1,
        explanation:
          "Defence in depth assumes any single control will fail. Overlapping telemetry is what allows detection when one layer is bypassed or disabled.",
      },
      {
        id: "q6-33",
        difficulty: "medium",
        tags: ["Identity"],
        scenario:
          "A user's MFA prompts are approved at 03:00 after 40 consecutive push notifications were sent to their phone.",
        question: "What attack is this?",
        options: [
          "MFA fatigue / push bombing — the attacker already has valid credentials and spams prompts until one is approved.",
          "A SIM-swap attack in which the phone number was ported to an attacker-controlled device.",
          "A Kerberoasting attack targeting the service principal name of the user's account.",
          "A pass-the-hash attack replaying the NTLM hash captured from the workstation's memory.",
        ],
        correctAnswer: 0,
        explanation:
          "Push bombing follows credential compromise. The fix is number matching, prompt throttling, and immediate credential rotation plus session revocation.",
      },
      {
        id: "q6-34",
        difficulty: "medium",
        tags: ["Lateral Movement"],
        scenario:
          "EID 4624 LogonType 3 for admin_svc appears on 22 servers within 90 seconds, each followed by a service creation event.",
        question: "What is the most accurate assessment?",
        options: [
          "Automated lateral movement using compromised credentials, consistent with remote execution tooling such as PsExec.",
          "A routine patch deployment cycle initiated by the systems management platform overnight.",
          "A network scanner performing authenticated vulnerability checks across the server estate.",
          "A misbehaving backup agent re-authenticating to servers after a network interruption.",
        ],
        correctAnswer: 0,
        explanation:
          "Network logons paired with service creation across many hosts in seconds is the PsExec-style remote-execution fingerprint — legitimate deployment tools have change records and different service names.",
      },
      {
        id: "q6-35",
        difficulty: "hard",
        tags: ["Data Exfiltration"],
        scenario:
          "A workstation uploads 150 MB in a single TLS session to an IP with no prior 30-day history and 14/70 malicious detections, immediately after reading 4,200 files from a finance share.",
        question: "What is the correct classification and scope?",
        options: [
          "True positive data exfiltration; scope must include the workstation, the user's account and the file server.",
          "False positive; large uploads to new IPs are normal cloud backup traffic and require no action.",
          "True positive but scoped to the workstation only, since the file server was merely read from.",
          "Inconclusive; wait for a second occurrence before opening an incident to avoid business disruption.",
        ],
        correctAnswer: 0,
        explanation:
          "Staging (mass file reads) followed immediately by a bulk upload to suspicious infrastructure is exfiltration. Scope always includes the source of the data, not just the sending host.",
      },
      {
        id: "q6-36",
        difficulty: "medium",
        tags: ["Cloud"],
        scenario:
          "CloudTrail shows a new IAM access key created for a dormant account, followed 4 minutes later by ListBuckets and GetObject calls from an unfamiliar ASN.",
        question: "What is the first containment action?",
        options: [
          "Delete the S3 buckets that were accessed so no further objects can be downloaded by the attacker.",
          "Disable the newly created access key and the dormant IAM user, then review all API calls made with that key.",
          "Enable versioning on the affected buckets and continue monitoring the account activity for a day.",
          "Rotate the root account password and consider the incident contained once the rotation completes.",
        ],
        correctAnswer: 1,
        explanation:
          "Revoke the attacker's credential first, then scope everything it touched. The access key is the live access path; buckets are the target, not the entry point.",
      },
      {
        id: "q6-37",
        difficulty: "easy",
        tags: ["Documentation"],
        scenario: "You are writing the incident ticket for an alert you closed as benign.",
        question: "What must the note contain?",
        options: [
          "The verdict alone — closure reasons slow the queue down and rarely help future investigations.",
          "What the alert was, what you checked, the evidence supporting the verdict, and the reasoning for closure.",
          "A link to the alert in the SIEM, since anyone can re-run the same investigation later if needed.",
          "The name of the analyst who closed it so accountability can be tracked in monthly metrics.",
        ],
        correctAnswer: 1,
        explanation:
          "Closure notes are the SOC's institutional memory: they enable tuning, support audits, and prevent the next analyst from repeating the same work.",
      },
      {
        id: "q6-38",
        difficulty: "medium",
        tags: ["Reporting"],
        scenario: "You must summarise a contained ransomware attempt for the executive team.",
        question: "Which structure is most appropriate?",
        options: [
          "A chronological dump of every log line collected during the investigation for full transparency.",
          "Impact, current status, actions taken, business risk remaining, and required decisions — technical detail in an appendix.",
          "A list of the IOCs and MITRE technique IDs observed, with links to the vendor threat reports.",
          "The raw EDR alert screenshots with analyst annotations added in the margins of each image.",
        ],
        correctAnswer: 1,
        explanation:
          "Executives need impact, status and decisions. Technical evidence belongs in the appendix for the teams that will act on it.",
      },
      {
        id: "q6-39",
        difficulty: "hard",
        tags: ["Detection Gaps"],
        scenario:
          "Post-incident review shows the attacker used a signed, legitimate binary (certutil.exe) to download the payload, and nothing alerted.",
        question: "What is the correct remediation?",
        options: [
          "Block all Microsoft signed binaries from making outbound network connections across the estate.",
          "Build LOLBin behaviour detections — certutil with URL arguments, unusual parents, and download flags.",
          "Remove certutil.exe from all endpoints so the technique becomes impossible in the environment.",
          "Accept the gap; living-off-the-land techniques cannot be detected by any monitoring approach.",
        ],
        correctAnswer: 1,
        explanation:
          "LOLBins are legitimate and cannot simply be removed. Detection targets the abusive argument patterns and parent-child context, not the binary's presence.",
      },
      {
        id: "q6-40",
        difficulty: "medium",
        tags: ["Continuous Improvement"],
        scenario:
          "Your SOC repeatedly misses attacks in a technique category that the ATT&CK Navigator heatmap shows as uncovered.",
        question: "What is the most effective programme-level response?",
        options: [
          "Purchase an additional security product to fill the gap without changing existing processes.",
          "Prioritise detection engineering against the uncovered techniques, validate with adversary emulation, and re-measure coverage.",
          "Increase analyst headcount so more alerts can be reviewed during each shift of the week.",
          "Lower alert thresholds across all existing rules to increase the volume of detections generated.",
        ],
        correctAnswer: 1,
        explanation:
          "Coverage gaps are closed by engineering plus validation. Emulating the technique proves the new detection fires before it is needed in a real incident.",
      },
    ],
  },
];
