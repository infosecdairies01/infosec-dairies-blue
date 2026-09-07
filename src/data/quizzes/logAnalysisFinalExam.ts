import type { QuizData } from "@/data/quizData";

/**
 * Log Analysis — Final Certification Exam (la-q5)
 * 40 scenario-based questions spanning all course modules:
 * log fundamentals, Windows event logs, Linux logs, network logs,
 * and analysis tools/queries/best practices. 80% required to certify.
 */
export const logAnalysisFinalExam: QuizData[] = [
  {
    quizId: "la-q5",
    courseId: "log-analysis",
    title: "Final Certification Exam",
    description:
      "Comprehensive scenario-based exam covering log fundamentals, Windows and Linux log analysis, network logs, and query tooling. 80% required to certify.",
    passingScore: 80,
    timeLimit: 45,
    questions: [
      {
        id: "la-q5-1",
        difficulty: "easy",
        tags: ["Windows", "Event IDs"],
        scenario:
          "The SIEM shows Event ID 4625 flooding in from one workstation — 340 failures for user 'sconnor' in 4 minutes, all from source IP 10.20.4.55, followed by a single 4624 (successful logon).",
        question: "What does this sequence most likely indicate?",
        options: [
          "A locked-out account automatically retrying cached credentials after a password change.",
          "A successful brute-force or password-spraying attack against the sconnor account.",
          "Normal behaviour when a mapped network drive reconnects after a network blip.",
          "The Windows Security log service restarting and replaying buffered events."
        ],
        correctAnswer: 1,
        explanation:
          "4625 = failed logon, 4624 = successful logon. Hundreds of failures from one source followed by a success is the classic brute-force success signature. Cached-credential retries produce far fewer events and usually a consistent failure code."
      },
      {
        id: "la-q5-2",
        difficulty: "easy",
        tags: ["Windows", "Event IDs"],
        scenario:
          "While reviewing a compromised host you find Event ID 1102 in the Security log at 03:14, minutes after a burst of suspicious logons — and no Security events at all between 03:14 and a reboot at 09:00.",
        question: "What happened and why does it matter?",
        options: [
          "The log rotated normally; the gap is expected maintenance behaviour.",
          "The audit log was cleared — a strong anti-forensics indicator, and the gap means evidence was destroyed.",
          "The SIEM collector crashed, so events still exist on the host.",
          "Event 1102 means the audit policy changed to log fewer event types."
        ],
        correctAnswer: 1,
        explanation:
          "1102 = 'The audit log was cleared.' Attackers clear logs to erase their tracks. The event itself is evidence (it records who cleared it), and the empty window should be treated as the intrusion period. Normal rotation never produces a 1102."
      },
      {
        id: "la-q5-3",
        difficulty: "easy",
        tags: ["Linux", "auth.log"],
        scenario:
          "In /var/log/auth.log you see: 'Failed password for invalid user admin from 203.0.113.9' repeated for users admin, root, oracle, test — 2,000 attempts overnight, no successes.",
        question: "How should you classify and respond?",
        options: [
          "Successful intrusion — 'invalid user' lines mean the accounts were compromised.",
          "Background internet password-spraying noise; confirm no successes, then block/rate-limit the source and move on.",
          "A misconfigured internal scanner; whitelist 203.0.113.9 to reduce log volume.",
          "Log corruption; 'invalid user' entries are always parser artifacts."
        ],
        correctAnswer: 1,
        explanation:
          "'Invalid user' means the account doesn't exist — these are dictionary-guess attempts, constant background noise for any internet-facing SSH. Triage = verify zero successes from that IP, then block, rate-limit, or restrict SSH. Don't ignore it until you've confirmed no 'Accepted password' from the same source."
      },
      {
        id: "la-q5-4",
        difficulty: "easy",
        tags: ["Log Fundamentals", "Triage"],
        scenario:
          "An alert fires: 'Multiple failed authentications on VPN gateway.' You pull the raw logs first.",
        question: "Which field combination gives you the fastest initial scoping?",
        options: [
          "Timestamp, source IP, username, and result (success/fail) — who, from where, when, and what happened.",
          "Log file size, inode number, and compression ratio — to verify log integrity first.",
          "The full raw message text of every event — more detail is always better for scoping.",
          "Destination port and TCP flags — network metadata outranks identity fields."
        ],
        correctAnswer: 0,
        explanation:
          "Triage starts with the 5 W's. Timestamp + source IP + username + result lets you immediately see if it's one user mistyping, a spray across many users, or a targeted attack — and whether any attempt succeeded."
      },
      {
        id: "la-q5-5",
        difficulty: "medium",
        tags: ["Windows", "Process Auditing"],
        scenario:
          "Sysmon Event ID 1 shows: winword.exe → cmd.exe → powershell.exe -enc <base64> on WS-FIN-07, all within 2 seconds of a user opening an email attachment.",
        question: "What is the key detection insight from this process tree?",
        options: [
          "PowerShell with -enc is always malicious and should be blocked outright.",
          "The parent-child chain matters more than any single process — Office spawning a shell is anomalous regardless of the command line.",
          "Sysmon Event 1 only logs network connections, so this is a correlation error.",
          "This is normal behaviour when Word opens documents containing macros signed by the organisation."
        ],
        correctAnswer: 1,
        explanation:
          "Encoded PowerShell alone has legitimate admin uses; the killer indicator is the ancestry: an Office application should never spawn cmd/PowerShell. Detection engineering should key on the parent-child relationship (T1059/T1204 patterns), not just the -enc flag."
      },
      {
        id: "la-q5-6",
        difficulty: "medium",
        tags: ["Windows", "PowerShell Logging"],
        scenario:
          "An attacker ran 'iex (New-Object Net.WebClient).DownloadString(...)' in an obfuscated form. Script Block Logging (Event 4104) was enabled.",
        question: "Why is 4104 more valuable than 4688 process logs here?",
        options: [
          "4104 records the network destination of every download, which 4688 never does.",
          "4104 captures the de-obfuscated script content actually executed, even when the command line is encoded or split.",
          "4104 events can't be cleared by attackers, unlike the Security log.",
          "4104 logs keystrokes typed into the PowerShell console."
        ],
        correctAnswer: 1,
        explanation:
          "Script Block Logging records the full script content after PowerShell de-obfuscates it in memory — so -enc payloads, string concatenation and download cradles are visible in clear text. 4688 only shows the (obfuscated) command line."
      },
      {
        id: "la-q5-7",
        difficulty: "medium",
        tags: ["Linux", "Log Locations"],
        scenario:
          "You suspect an attacker created a persistence cron job on a Linux web server and then ran commands as root.",
        question: "Which two log sources confirm this fastest?",
        options: [
          "/var/log/cron (job executions) and /var/log/auth.log or /var/log/secure (sudo/su usage).",
          "/var/log/dmesg and /var/log/boot.log — kernel messages record all privilege changes.",
          "/var/log/lastlog and /var/log/wtmp — login records show cron activity.",
          "/var/log/syslog alone — every Linux distribution centralises all security events there."
        ],
        correctAnswer: 0,
        explanation:
          "Cron executions are logged to /var/log/cron (or syslog on some distros) showing which user ran which job; privilege escalation via sudo/su lands in auth.log (Debian/Ubuntu) or secure (RHEL/CentOS). Correlate the new crontab entry with the sudo event to attribute the persistence."
      },
      {
        id: "la-q5-8",
        difficulty: "medium",
        tags: ["Network", "Firewall"],
        scenario:
          "Firewall logs show SRV-DB-01 (a database server that should never initiate outbound traffic) making repeated 4 KB HTTPS connections to the same external IP every 10 minutes, day and night.",
        question: "What is the most likely explanation?",
        options: [
          "Legitimate software update checks — updates often use small HTTPS requests on a schedule.",
          "C2 beaconing — the fixed interval, small uniform size, and unusual source host are the classic beacon profile.",
          "Asymmetric routing causing retransmissions — a network fault, not a security issue.",
          "SIEM time-sync drift duplicating a single connection across many log lines."
        ],
        correctAnswer: 1,
        explanation:
          "Beaconing = regular-interval, low-and-slow connections from an unexpected host. The tell isn't one connection but the pattern: fixed jitter-free interval + uniform tiny payloads + a server with no business making outbound connections. Updates don't run every 10 minutes at 03:00."
      },
      {
        id: "la-q5-9",
        difficulty: "medium",
        tags: ["Network", "DNS"],
        scenario:
          "DNS query logs show a workstation requesting names like 'aXR0ZW1zLmV4Zmls.example-cdn.net' — 60+ character hex/base64-looking subdomains, hundreds per hour, all TXT records.",
        question: "What technique does this indicate?",
        options: [
          "DNS tunneling / data exfiltration — data is encoded into subdomain labels and shipped out via queries.",
          "DNSSEC validation failures — long labels are signature material.",
          "Normal CDN behaviour — content delivery networks randomise subdomains for load balancing.",
          "A misconfigured search suffix causing repeated resolution retries."
        ],
        correctAnswer: 0,
        explanation:
          "Long high-entropy subdomains + TXT record queries + high volume = DNS tunneling (T1071.004). The query name itself is the channel. Legit CDNs use short cacheable names with A/AAAA records, not TXT at hundreds-per-hour rates."
      },
      {
        id: "la-q5-10",
        difficulty: "medium",
        tags: ["Network", "Proxy"],
        scenario:
          "Web proxy logs: user 'bwayne' downloaded 2.1 GB from a personal file-sharing site over lunch; the same user account then authenticated from an IP geolocated 6,000 km away 20 minutes later.",
        question: "Which is the strongest investigative conclusion?",
        options: [
          "The user flew abroad — travel explains the second login.",
          "Impossible travel: the credentials are very likely compromised; the download may also be policy-violating exfiltration — escalate both findings.",
          "The proxy clock is wrong, making the geolocation meaningless.",
          "VPN usage always produces impossible-travel hits, so this is a false positive."
        ],
        correctAnswer: 1,
        explanation:
          "Two logins 6,000 km apart within 20 minutes are physically impossible — treat the account as compromised until disproven. Don't dismiss it as VPN without verifying the user actually has VPN access and the IP belongs to the corporate VPN egress range."
      },
      {
        id: "la-q5-11",
        difficulty: "easy",
        tags: ["CLI", "grep/awk"],
        scenario:
          "On a Linux box with no SIEM, you need the top 10 source IPs by failed-SSH count from a 1M-line /var/log/auth.log.",
        question: "Which pipeline is correct and idiomatic?",
        options: [
          "cat /var/log/auth.log | wc -l — count all lines to estimate total traffic volume first.",
          "tail -f /var/log/auth.log — watch the log live until you can spot the failures manually.",
          "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10",
          "cp /var/log/auth.log /tmp/ — copy the file somewhere safe and read it in a text editor."
        ],
        correctAnswer: 2,
        explanation:
          "Standard CLI triage chain: filter (grep) → extract field (awk; $(NF-3) is the source IP in the default sshd format) → count (sort | uniq -c) → rank (sort -rn) → top N (head). Runs anywhere with no extra tooling."
      },
      {
        id: "la-q5-12",
        difficulty: "easy",
        tags: ["jq", "JSON"],
        scenario:
          "An EDR streams JSON, one object per line. You want the count of unique process names where event.action='process_create' in the last 100,000 lines of /var/log/edr.json.",
        question: "Best one-liner?",
        options: [
          "jq '.process' /var/log/edr.json — extract the process object from every line.",
          "grep process /var/log/edr.json | wc -l — count lines mentioning processes.",
          "tail -n 100000 /var/log/edr.json | jq -r 'select(.event.action==\"process_create\") | .process.name' | sort -u | wc -l",
          "awk '{print $1}' /var/log/edr.json | sort | uniq -c — count by first token."
        ],
        correctAnswer: 2,
        explanation:
          "jq -r 'select(...) | .field' is the canonical filter+project for structured JSON; sort -u | wc -l counts distinct values. tail-bounding keeps one-shot triage fast on multi-GB files."
      },
      {
        id: "la-q5-13",
        difficulty: "medium",
        tags: ["Splunk SPL", "Detection"],
        scenario:
          "You need a Splunk search returning users with ≥5 failed logons followed by ≥1 success within 10 minutes from the same source IP.",
        question: "Which structure expresses that logic?",
        options: [
          "index=auth EventCode IN (4624,4625) | stats count(eval(EventCode=4625)) AS fails count(eval(EventCode=4624)) AS success by user, src_ip | where fails>=5 AND success>=1",
          "index=auth | stats count — aggregate everything, then read the totals.",
          "index=auth | sort _time — sort chronologically and eyeball the transitions.",
          "index=auth | dedup user — keep one event per user to reduce noise."
        ],
        correctAnswer: 0,
        explanation:
          "eval-inside-stats is the standard SPL idiom for conditional counting across event types; 'by user, src_ip' is the right grouping; the where clause is the alert condition. The others can't express the multi-condition correlation."
      },
      {
        id: "la-q5-14",
        difficulty: "medium",
        tags: ["KQL", "Detection"],
        scenario:
          "In Microsoft Sentinel you must hunt: 'lsass.exe accessed by a non-Microsoft-signed process in the last 24h' — a classic credential-dump pattern.",
        question: "Which KQL query best matches?",
        options: [
          "SecurityEvent | take 10 — sample random rows to learn the schema.",
          "DeviceProcessEvents | where Timestamp > ago(24h) | where FileName =~ 'lsass.exe'",
          "DeviceProcessEvents | where Timestamp > ago(24h) | summarize count() by ProcessCommandLine",
          "DeviceEvents | where Timestamp > ago(24h) | where ActionType == 'LsassAccess' | extend t = parse_json(AdditionalFields) | where t.TargetProcessName endswith 'lsass.exe' | where not(t.InitiatingProcessSigner startswith 'Microsoft')"
        ],
        correctAnswer: 3,
        explanation:
          "The hunt needs: right table (DeviceEvents), right action (access to lsass), time-bound (ago(24h)), and the exclusion that removes noise (Microsoft-signed accessors like MsMpEng). Option 2 finds lsass *executing*, not being accessed."
      },
      {
        id: "la-q5-15",
        difficulty: "medium",
        tags: ["Windows", "Logon Types"],
        scenario:
          "Event 4624 shows Logon Type 3 for account 'svc_backup' hitting 14 different servers within one minute, from a workstation IP.",
        question: "What is suspicious here?",
        options: [
          "Nothing — Logon Type 3 (network) is how service accounts always authenticate to file shares.",
          "A service account performing network logons from a workstation to many servers in seconds matches pass-the-hash / lateral-tool usage (e.g., wmiexec, CrackMapExec).",
          "Logon Type 3 means an interactive console logon, so someone is physically at 14 machines.",
          "svc_backup accounts can't perform Logon Type 3, so the event is corrupt."
        ],
        correctAnswer: 1,
        explanation:
          "Type 3 = network logon. The anomaly is velocity and source: service accounts authenticate from application servers on predictable schedules, not fan out from a workstation to 14 hosts in 60 seconds. That fan-out is the lateral-movement signature."
      },
      {
        id: "la-q5-16",
        difficulty: "medium",
        tags: ["Windows", "Persistence"],
        scenario:
          "You suspect registry Run-key persistence on a host. Sysmon is deployed with a good config.",
        question: "Which Sysmon Event ID directly records the persistence write?",
        options: [
          "Event ID 1 — process creation captures every registry modification.",
          "Event ID 13 — RegistryEvent (value set) logs writes to autostart locations like HKLM\\...\\Run.",
          "Event ID 3 — network connection events include the registry path.",
          "Event ID 22 — DNS query events log the key name as a hostname."
        ],
        correctAnswer: 1,
        explanation:
          "Sysmon EID 12/13/14 cover registry create/set/rename. A new value under Run/RunOnce showing up as EID 13 with the writing process and target path is exactly how you catch ASEP persistence (T1060/T1547.001) in telemetry."
      },
      {
        id: "la-q5-17",
        difficulty: "medium",
        tags: ["Linux", "Web Logs"],
        scenario:
          "Apache access.log shows: GET /products?id=1' UNION SELECT username,password FROM users-- with HTTP 200 responses and 50 KB response sizes (normal product page is 4 KB).",
        question: "What do the logs tell you?",
        options: [
          "A failed SQL-injection attempt — single quotes always break the query and return errors.",
          "A successful SQL injection — 200 + abnormally large responses suggest the UNION query returned data.",
          "Normal search traffic — users often search for SQL keywords.",
          "A WAF test — the WAF would have blocked it, so it must be internal testing."
        ],
        correctAnswer: 1,
        explanation:
          "Status 200 + a response far larger than baseline strongly suggests the injection succeeded and data was returned. Log analysis here: URL-decoded payloads in the query string, response codes, and response sizes together tell you attempt vs. success. Assume compromise and check the DB logs."
      },
      {
        id: "la-q5-18",
        difficulty: "medium",
        tags: ["Linux", "Web Logs"],
        scenario:
          "In the same access.log you find: GET /../../etc/passwd HTTP/1.1 followed later by GET /static/..%2f..%2f..%2fetc%2fpasswd with a 200 status.",
        question: "What is the attacker doing and did the second attempt matter?",
        options: [
          "Directory traversal; the encoded (%2f) version may bypass naive filters and the 200 means it likely succeeded.",
          "Search-engine crawling; '..' appears in normal navigation all the time.",
          "A 404-generating typo attack; both attempts failed because traversal is impossible in modern Apache.",
          "Log poisoning; the attacker is injecting fake entries to confuse analysts."
        ],
        correctAnswer: 0,
        explanation:
          "Path traversal (T1083/1190-class) first attempted raw, then URL-encoded to evade string matching. A 200 on the encoded attempt is a strong success signal — verify what the response actually contained and which app served it."
      },
      {
        id: "la-q5-19",
        difficulty: "hard",
        tags: ["Correlation", "Multi-source"],
        scenario:
          "Timeline: 09:01 proxy shows a download of 'invoice.iso' from a newly-registered domain; 09:03 Sysmon EID 1 shows the ISO mounted and setup.exe running; 09:04 EID 3 shows outbound TLS to 45.155.30.10; 09:05 the firewall logs a block for that IP.",
        question: "What is the correct verdict?",
        options: [
          "Contained — the firewall blocked the C2 connection, so no further action is needed.",
          "Compromised — the malware executed before the block; treat the host as infected, hunt for persistence and retry traffic, and block the domain fleet-wide.",
          "False positive — ISO files are common software installers.",
          "Inconclusive — four events from four sources can't be correlated reliably."
        ],
        correctAnswer: 1,
        explanation:
          "The block stopped one connection, but execution already happened. Post-execution response: isolate host, hunt persistence (EID 13, scheduled tasks), sweep the fleet for the domain/IP/hash, and check for retry beacons. 'Blocked ≠ safe' is a core correlation lesson."
      },
      {
        id: "la-q5-20",
        difficulty: "hard",
        tags: ["Best Practice", "Time Sync"],
        scenario:
          "Post-incident review: your timeline is 11 minutes off between firewall and EDR events, making causality ambiguous in the report.",
        question: "Root cause and durable fix?",
        options: [
          "Manually adjust the timestamps in the report so the events line up consistently.",
          "Clock drift; enforce one authoritative NTP source across the fleet, standardise on UTC, and alert on ingest-time vs event-time skew.",
          "Buy a faster firewall to reduce network latency between event generation and logging.",
          "Drop timestamps from the report and describe the sequence qualitatively."
        ],
        correctAnswer: 1,
        explanation:
          "Drift silently destroys investigations. Fix = single NTP authority + UTC everywhere + a standing detection on (ingest_time − event_time) so sources with slipping clocks alert before your next incident, not during it."
      },
      {
        id: "la-q5-21",
        difficulty: "easy",
        tags: ["Log Fundamentals", "Sources"],
        scenario:
          "A new junior analyst asks: 'The application server was rebuilt overnight and its local logs are gone. Do we still have its logs anywhere?'",
        question: "Best answer?",
        options: [
          "No — once a host is rebuilt, its logs are unrecoverable.",
          "Yes, if centralised log shipping (SIEM/syslog forwarder) was configured — copies live on the collector, which is exactly why central logging exists.",
          "Yes — rebooted servers always keep logs in memory for 24 hours.",
          "Only if someone manually exported them first."
        ],
        correctAnswer: 1,
        explanation:
          "Centralised collection is the control: hosts get wiped, compromised, or reimaged, but forwarded logs survive on the SIEM. This is also why attackers clear local logs — and why clearing doesn't erase the central copy."
      },
      {
        id: "la-q5-22",
        difficulty: "easy",
        tags: ["Windows", "Service Installation"],
        scenario:
          "Event ID 7045 (Service Control Manager) shows a new service 'svchost_updater' with binary path C:\\Users\\Public\\update.exe, started as LocalSystem, on a workstation.",
        question: "Why is this high-priority?",
        options: [
          "7045 events are always benign Windows noise from Windows Update.",
          "A new service running from a user-writable directory as LocalSystem is a classic persistence + privilege-execution combo (T1543.003).",
          "The service name contains 'updater', proving it's legitimate patching.",
          "Event 7045 means a service failed to start, so the binary never ran."
        ],
        correctAnswer: 1,
        explanation:
          "7045 = a service was installed. Triage fields: service name (masquerading as svchost), binary path (C:\\Users\\Public is user-writable — red flag), and run account (LocalSystem = full privilege). Legit software almost never installs services from user directories."
      },
      {
        id: "la-q5-23",
        difficulty: "easy",
        tags: ["Windows", "Account Management"],
        scenario:
          "On a member server you see: 4720 (user created: 'helpdesk_temp'), 4732 (added to local Administrators), and 4726 (user deleted) — all within 6 minutes at 02:40.",
        question: "What does this pattern suggest?",
        options: [
          "Routine helpdesk account provisioning that happens to run at night.",
          "An attacker creating a backdoor admin account, using it, and covering tracks by deleting it.",
          "Windows automatically rotating built-in accounts as part of normal maintenance.",
          "The events are out of order; 4726 always precedes 4720."
        ],
        correctAnswer: 1,
        explanation:
          "Create → privilege → delete in minutes, off-hours, is the disposable-backdoor pattern. Check what the account did in between (4624/4672), and add detection on 4720+4732 correlation windows. Legit provisioning has tickets and business hours."
      },
      {
        id: "la-q5-24",
        difficulty: "medium",
        tags: ["Linux", "Detection"],
        scenario:
          "In auth.log you find 'Accepted password for root from 185.220.x.x' — but your policy disables direct root SSH login (PermitRootLogin no).",
        question: "What are the two most urgent checks?",
        options: [
          "Whether root's password is strong, and whether the user reports a lost laptop.",
          "Whether sshd_config was modified (attacker re-enabled root login) and when the file changed vs. your last known-good config.",
          "Whether the log line is a forgery, and whether the NTP offset is normal.",
          "Whether 185.220.x.x is a known Tor exit node — if it is, the event can be closed as untraceable."
        ],
        correctAnswer: 1,
        explanation:
          "The login shouldn't be possible — meaning the config was changed, the service was restarted with different config, or another sshd instance is running. File-integrity comparison plus 'sshd restart' events in the same log tell you when. 'Tor = untraceable, close it' is never acceptable."
      },
      {
        id: "la-q5-25",
        difficulty: "medium",
        tags: ["Network", "NetFlow"],
        scenario:
          "NetFlow shows workstation WS-MKT-11 transferred 8 GB outbound to a single cloud-storage IP over 2 hours. The proxy log for the same period shows only 200 MB for that user.",
        question: "How do you reconcile the discrepancy?",
        options: [
          "NetFlow double-counts bytes; trust the proxy figure.",
          "Traffic bypassed the proxy (direct connection, VPN client, or DoH) — the NetFlow figure is authoritative for volume and the bypass itself is a finding.",
          "The proxy only logs blocked requests; 200 MB is what was denied.",
          "Cloud storage IPs are shared; the 8 GB belongs to other tenants."
        ],
        correctAnswer: 1,
        explanation:
          "When two sources disagree, understand what each measures: NetFlow counts everything on the wire; the proxy only sees what goes through it. The gap = unproxied traffic, which is both a data-exfil path and a policy/architecture gap worth escalating."
      },
      {
        id: "la-q5-26",
        difficulty: "medium",
        tags: ["Windows", "Scheduled Tasks"],
        scenario:
          "Event 4698 (scheduled task created) shows 'SystemHealthCheck' executing powershell.exe -w hidden -ep bypass -f C:\\ProgramData\\health.ps1 daily, created by user 'jmartin' who is on vacation.",
        question: "Triage conclusion?",
        options: [
          "Benign — health-check scripts are standard IT practice.",
          "Malicious persistence (T1053.005): hidden window + execution-policy bypass + ProgramData + an absent user's account = compromised credentials creating persistence.",
          "A Windows Defender signature update task with a custom name.",
          "Cannot determine anything until the .ps1 content is recovered."
        ],
        correctAnswer: 1,
        explanation:
          "Every element is a red flag: evasive flags (-w hidden, -ep bypass), a world-writable staging dir, a trusted-sounding name, and creation by a user who is verifiably away. Treat the account as compromised, pull the script, and sweep for the task name fleet-wide."
      },
      {
        id: "la-q5-27",
        difficulty: "medium",
        tags: ["Linux", "sudo"],
        scenario:
          "Linux sudo logs: user 'deploy' (a CI service account) ran 'sudo /bin/bash' followed by 'cat /etc/shadow', on a build server, at a time with no deployment job running.",
        question: "What happened?",
        options: [
          "Normal CI behaviour — build pipelines need root shells and read system files.",
          "Likely compromised CI credentials: an interactive root shell plus shadow-file access is credential theft, not automation.",
          "The deploy account password expired and PAM is logging recovery steps.",
          "sudo logs can't show the command executed, so this conclusion is speculative."
        ],
        correctAnswer: 1,
        explanation:
          "Service accounts run scripted commands, not interactive shells, and nothing legitimate reads /etc/shadow on a build box. No matching CI job = the credential was used outside the pipeline. Rotate the secret, pull the box, review pipeline logs for the leak."
      },
      {
        id: "la-q5-28",
        difficulty: "hard",
        tags: ["Correlation", "Kill Chain"],
        scenario:
          "Seven-day intrusion timeline — Day 1: phishing macro executes. Day 3: C2 beaconing begins. Day 5: PsExec to two servers. Day 7: scheduled task 'WinUpdateSvc' created. The CISO asks: 'Which single event, if prevented, breaks the whole chain?'",
        question: "Best answer for the post-incident report?",
        options: [
          "The Day 3 C2 beaconing, since blocking outbound traffic would strand the attacker.",
          "The Day 1 phishing macro execution, since it is the initial access point that enabled everything downstream.",
          "The Day 5 PsExec, since blocking admin shares stops lateral movement.",
          "The Day 7 scheduled task, since removing persistence keys expels the attacker."
        ],
        correctAnswer: 1,
        explanation:
          "Post-incident reporting drives prevention investment at the highest-leverage control point. Block initial access and the chain never starts. The later events inform detection improvements, but prevention spend goes to the first domino."
      },
      {
        id: "la-q5-29",
        difficulty: "medium",
        tags: ["Windows", "RDP"],
        scenario:
          "Event 4624 Logon Type 10 for administrator on SRV-WEB-01 from a public IP at 03:30, preceded by 200 failed Type 10 attempts from 40 different IPs over 6 hours.",
        question: "What does Logon Type 10 tell you, and what is the verdict?",
        options: [
          "Type 10 is local console logon — someone was physically at the server.",
          "Type 10 is RemoteInteractive (RDP); a distributed brute-force that succeeded — the server should never have had RDP internet-exposed; treat as full compromise.",
          "Type 10 is a cached logon, so the machine was offline.",
          "Type 10 is a service logon, indicating a misconfigured service account."
        ],
        correctAnswer: 1,
        explanation:
          "Type 10 = RDP. Sprayed failures from many IPs (low-and-slow to dodge lockout) followed by a success = account compromise via exposed RDP. Respond: isolate, reset credentials, close 3389 to the internet, require VPN + MFA."
      },
      {
        id: "la-q5-30",
        difficulty: "medium",
        tags: ["Detection", "False Positive"],
        scenario:
          "Your 'PowerShell download cradle' detection fires 300 times/day. Review shows 95% are IT admins running approved software-deployment scripts.",
        question: "What is the correct tuning approach?",
        options: [
          "Disable the rule — 95% false positives means the detection is fundamentally broken.",
          "Keep the rule but suppress known admin patterns: allowlist approved script hashes/service accounts and management hosts, while alerting on the same behaviour from user workstations.",
          "Raise the threshold to 500 events so it pages less often.",
          "Delete PowerShell logs from these hosts to reduce noise."
        ],
        correctAnswer: 1,
        explanation:
          "Tuning ≠ disabling. Context-aware suppression keeps the detection's value: the same command line is benign from SCCM/service accounts and hostile from a receptionist's PC. Allowlist the known-good; alert on everything else."
      },
      {
        id: "la-q5-31",
        difficulty: "easy",
        tags: ["Windows", "Event IDs"],
        scenario:
          "You need to hunt 'who accessed the sensitive file payroll.xlsx on the file server last week.'",
        question: "Which prerequisite determines whether this is answerable from logs at all?",
        options: [
          "Whether the file server runs Windows Server 2019 or newer.",
          "Whether Object Access auditing (Event 4663) was enabled on that share/folder before last week — you can't analyse events that were never generated.",
          "Whether the users have read access to the Security log.",
          "Whether the file is encrypted — EFS blocks audit logging."
        ],
        correctAnswer: 1,
        explanation:
          "4663 (handle to object requested) is only generated when a SACL is set on the object. Auditing must be configured before the activity happens. First step in any such hunt: verify the audit policy and SACL coverage."
      },
      {
        id: "la-q5-32",
        difficulty: "easy",
        tags: ["Linux", "Log Rotation"],
        scenario:
          "You grep /var/log/auth.log for last Tuesday's brute-force attack and find nothing — but a colleague confirms the attack showed in the SIEM.",
        question: "Most likely explanation?",
        options: [
          "The attacker deleted the local log; the SIEM copy proves tampering.",
          "Log rotation: the events moved to auth.log.1 or auth.log.2.gz — grep the rotated files too.",
          "grep is case-sensitive and 'Failed' was lowercase that day.",
          "auth.log only keeps 24 hours of data by default."
        ],
        correctAnswer: 1,
        explanation:
          "Always check rotation before concluding tampering: logs roll to .1, .2.gz etc. on schedule (logrotate). Use zgrep on compressed archives. If the SIEM has it and *no* rotated file does, then suspect deletion."
      },
      {
        id: "la-q5-33",
        difficulty: "medium",
        tags: ["Network", "IDS"],
        scenario:
          "IDS alert: 'ET POLICY Outdated Flash Version' from a kiosk PC. Proxy logs confirm the Flash request went to a domain registered 3 days ago hosting an exploit kit landing page.",
        question: "How should enrichment change your verdict?",
        options: [
          "The IDS alert is low severity ('POLICY'), so close it.",
          "Enrichment (domain age + EK classification) upgrades a noisy policy alert to a probable exploitation attempt — check the host for the exploit's payload.",
          "Flash is end-of-life everywhere, so this is expected background noise.",
          "Block the domain and close; network controls handled it."
        ],
        correctAnswer: 1,
        explanation:
          "Alert severity ≠ incident severity. Context — destination age, reputation, host role (unmanaged kiosk!) — turns 'policy violation' into 'likely compromise attempt'. Investigate the endpoint; blocking alone leaves any successful exploit in place."
      },
      {
        id: "la-q5-34",
        difficulty: "medium",
        tags: ["Splunk SPL", "Aggregation"],
        scenario:
          "You need 'top talkers': the 5 internal hosts with the most unique external destinations in the last hour — a data-theft / scanning sweep.",
        question: "Which SPL pattern is right?",
        options: [
          "index=fw | top limit=5 src_ip — top returns the most frequent sources by event count.",
          "index=fw earliest=-1h | stats dc(dest_ip) AS unique_dests by src_ip | sort -unique_dests | head 5",
          "index=fw | stats count by dest_ip | sort 5 -count — count events per destination.",
          "index=fw | transaction src_ip maxspan=1h — group events into sessions per source."
        ],
        correctAnswer: 1,
        explanation:
          "The question asks for distinct-destination cardinality, not raw event count — that's dc() (distinct count). top by event count would crown a chatty-but-legit server; dc by src catches one host touching hundreds of destinations."
      },
      {
        id: "la-q5-35",
        difficulty: "hard",
        tags: ["Windows", "Kerberos"],
        scenario:
          "Domain controller logs: account 'jhall' requested RC4-encrypted service tickets (4768/4769, ticket encryption 0x17) for 40 different service accounts in 90 seconds. jhall is a standard user.",
        question: "What attack does this match?",
        options: [
          "Kerberoasting — mass-requesting RC4 service tickets to crack service-account passwords offline.",
          "Pass-the-ticket — using stolen tickets, which would show no new requests.",
          "Golden ticket — forged TGTs, which skip 4768 entirely.",
          "Normal behaviour when Outlook starts and connects to Exchange."
        ],
        correctAnswer: 0,
        explanation:
          "Mass RC4 SPN requests from a non-admin account = Kerberoasting (T1558.003). RC4 tickets are requested because their encryption derives from the service account's NTLM hash — crackable offline. Detection: volume of distinct SPNs per user + downgrade to 0x17."
      },
      {
        id: "la-q5-36",
        difficulty: "hard",
        tags: ["Anti-forensics", "Integrity"],
        scenario:
          "A suspect server's Security log has events for March 1–14 and March 14–30, but sequence numbers restart twice and the audit policy shows 'auditpol /clear /y' ran March 14.",
        question: "What can you state confidently in your report?",
        options: [
          "Nothing — cleared logs mean zero evidence exists.",
          "The log was deliberately cleared on March 14 (auditpol execution is itself logged); reconstruct the gap from SIEM copies, other hosts' logs (4624s referencing this server), and network telemetry.",
          "The server rebooted, which always restarts sequence numbers.",
          "The events were archived by Windows Event Log rotation."
        ],
        correctAnswer: 1,
        explanation:
          "Anti-forensics is evidence. The clearing command, the 1102, and the gap bound the intrusion window. Corroborate with centralised copies and *other* systems' perspectives — every logon to the suspect host is also logged on the authenticating DC."
      },
      {
        id: "la-q5-37",
        difficulty: "medium",
        tags: ["Network", "Beaconing"],
        scenario:
          "You run a beacon hunt: for each internal host, you bucket outbound connections per destination and compute interval regularity. One host shows connections to an IP every 600s ± 3s, 24/7.",
        question: "Why is ±3s jitter significant rather than reassuring?",
        options: [
          "It proves the traffic is human-driven — bots don't jitter.",
          "Small deliberate jitter is a standard C2 evasion; perfect periodicity is rare — near-perfect periodicity at off-hours is still machine behaviour and a strong beacon signal.",
          "Jitter means the SIEM clock is drifting, invalidating the result.",
          "600s is too slow to be a beacon; real C2 calls home every second."
        ],
        correctAnswer: 1,
        explanation:
          "Real C2 frameworks (Cobalt Strike etc.) add jitter precisely to evade naive periodicity detection. 3 seconds of jitter on a 600s interval is 0.5% — far too regular for human or application traffic, especially sustained overnight. Low-and-slow is the norm, not the exception."
      },
      {
        id: "la-q5-38",
        difficulty: "medium",
        tags: ["Linux", "Web Logs"],
        scenario:
          "access.log shows a single IP requesting /wp-login.php 4,000 times with status 200 (not 403), then POST /wp-admin/plugin-install.php with a 302 redirect.",
        question: "What does the sequence imply?",
        options: [
          "Failed brute-force — 200 means the login page reloaded with an error.",
          "Successful WordPress admin compromise: repeated 200s were login attempts, and the plugin-install POST + redirect indicates the attacker got in and uploaded a plugin (likely a webshell).",
          "Normal admin usage — admins log in many times per day.",
          "A crawler indexing the login page."
        ],
        correctAnswer: 1,
        explanation:
          "WordPress returns 200 on failed logins, so status alone doesn't show failure — the *pivot* is the authenticated-only action (plugin install) succeeding afterward. Immediately check /wp-content/uploads and the plugins directory for new PHP files."
      },
      {
        id: "la-q5-39",
        difficulty: "hard",
        tags: ["Methodology", "Reporting"],
        scenario:
          "Your incident timeline has an unexplainable 3-hour gap between initial access and the next logged event. Management wants you to 'fill in what probably happened.'",
        question: "What should the report say?",
        options: [
          "Narrate the most likely attacker actions so the timeline reads smoothly.",
          "State explicitly that activity during the window is unknown due to missing telemetry, list which log sources were absent (e.g., no Sysmon, proxy gap), and recommend collection fixes.",
          "Remove the gap so executives aren't alarmed by uncertainty.",
          "Mark the whole incident as inconclusive and close it."
        ],
        correctAnswer: 1,
        explanation:
          "Reports must separate evidence from inference. A stated gap with identified telemetry blind spots is actionable (it drives logging improvements); invented narrative is dangerous fiction that will misdirect future incidents and audits."
      },
      {
        id: "la-q5-40",
        difficulty: "hard",
        tags: ["Capstone", "Multi-source"],
        scenario:
          "Full chain in your logs: phishing email (mail gateway) → attachment detonation (EDR) → encoded PowerShell (Sysmon 4104) → Run-key write (Sysmon 13) → Kerberoast requests (DC 4769) → PsExec to FS-01 (7045) → 4 GB to rare external IP (NetFlow) → Security log cleared on FS-01 (1102).",
        question: "Which statement best summarises the analytic lesson of this investigation?",
        options: [
          "The EDR alert was the only event that mattered — everything else was noise.",
          "No single source told the story: each stage was only visible in a different log, and only timestamped multi-source correlation across endpoints, DC, network and gateway reconstructed the full intrusion.",
          "The cleared log proves attribution is impossible, so the investigation failed.",
          "Network telemetry (NetFlow) alone could have replaced all endpoint logging."
        ],
        correctAnswer: 1,
        explanation:
          "This is the core competency the course certifies: every log source covers one slice of the kill chain, and anti-forensics in one source (the cleared log) is defeated by the others. Depth in log coverage + correlation discipline = defensible investigations."
      }
    ]
  }
];
