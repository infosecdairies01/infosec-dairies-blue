import type { QuizData } from "@/data/quizData";

export const sapPart2: QuizData[] = [
  {
    quizId: "sap-q5",
    courseId: "soc-analyst-path",
    title: "Phishing & Email Analysis Quiz",
    description: "Header forensics, attachment and URL analysis, BEC detection, and phishing response decisions.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q5-1",
        difficulty: "medium",
        tags: ["Headers", "SPF"],
        scenario: "Authentication-Results: spf=pass (sender IP is 203.0.113.44) smtp.mailfrom=bounce.mailer-x.net; dkim=none; dmarc=fail (p=quarantine) header.from=yourbank.com",
        question: "Why does DMARC fail even though SPF passed?",
        options: [
          "Because DKIM is missing, which always fails DMARC",
          "Because SPF passed for the envelope domain, which does not align with the From: header domain",
          "Because the sender IP is not in a private range",
          "Because DMARC requires TLS"
        ],
        correctAnswer: 1,
        explanation: "DMARC requires identifier alignment: the SPF-authenticated MAIL FROM domain (or DKIM d=) must align with the visible From: domain. A pass for an unrelated bounce domain does not align."
      },
      {
        id: "sap-q5-2",
        difficulty: "medium",
        tags: ["Headers"],
        scenario: "You need the true originating IP of a message that traversed four relays.",
        question: "Which header do you read, and how?",
        options: [
          "The topmost Received: header, because it is added first",
          "The bottom-most Received: header, since Received headers are prepended and the earliest hop appears last",
          "The Reply-To header",
          "The Message-ID header"
        ],
        correctAnswer: 1,
        explanation: "Each hop prepends its Received: line, so the chain reads newest-to-oldest top-down; the originating hop is the last entry — and only hops after your trusted boundary can be trusted."
      },
      {
        id: "sap-q5-3",
        difficulty: "medium",
        tags: ["Spoofing"],
        scenario: "From: \"IT Helpdesk <helpdesk@company.com>\" <attacker@mail-relay.top>\nReply-To: it-support@company-secure.net",
        question: "What technique is being used?",
        options: [
          "Display-name spoofing with a mismatched Reply-To for response capture",
          "A legitimate helpdesk alias",
          "SMTP smuggling",
          "DKIM replay"
        ],
        correctAnswer: 0,
        explanation: "The display name embeds a trusted address while the real envelope/From is attacker-controlled, and the Reply-To redirects victim replies to a lookalike domain."
      },
      {
        id: "sap-q5-4",
        difficulty: "medium",
        tags: ["Attachments"],
        scenario: "A phishing email carries `invoice.iso` (1.2 MB). Mounted, it contains `invoice.lnk` and a hidden `system32.dll`.",
        question: "Why do attackers use ISO containers?",
        options: [
          "They compress better than ZIP",
          "Mounted ISO contents historically bypass Mark-of-the-Web, so downloaded-file protections do not apply to the payload",
          "ISO files cannot be scanned by any AV",
          "Windows blocks ZIP but allows ISO by policy"
        ],
        correctAnswer: 1,
        explanation: "Container formats were used to strip MOTW propagation, letting LNK/DLL payloads execute without SmartScreen or protected-view warnings."
      },
      {
        id: "sap-q5-5",
        difficulty: "hard",
        tags: ["Macros"],
        scenario: "`olevba` output shows: AutoOpen, Shell, Chr() string building, and a base64 blob assembled from 40 concatenated fragments.",
        question: "What is the correct interpretation?",
        options: [
          "Benign template automation",
          "A malicious macro: auto-execution plus obfuscated command construction and process launch",
          "A digital signature block",
          "A printing macro"
        ],
        correctAnswer: 1,
        explanation: "AutoOpen provides automatic execution, Chr()/concatenation defeats static string detection, and Shell launches the decoded command — a classic maldoc dropper."
      },
      {
        id: "sap-q5-6",
        difficulty: "medium",
        tags: ["URL Analysis"],
        scenario: "The email link is `https://s3.eu-west-1.amazonaws.com/cdn-assets9/login/office365/index.html`.",
        question: "How should you assess it?",
        options: [
          "Trusted — it uses HTTPS on an AWS domain",
          "Suspicious — abuse of legitimate cloud storage to host a credential-harvesting page; analyse in a sandbox/urlscan, not your workstation",
          "Benign because Amazon scans all content",
          "Ignore — cloud domains cannot be blocked"
        ],
        correctAnswer: 1,
        explanation: "Reputable-infrastructure abuse is standard practice; TLS and a known domain say nothing about page content. Detonate in an isolated analysis service."
      },
      {
        id: "sap-q5-7",
        difficulty: "medium",
        tags: ["Domain Intel"],
        scenario: "WHOIS for `micros0ft-support.com`: created 2 days ago, privacy-protected registrant, registrar known for bulk registrations, certificate issued minutes after registration.",
        question: "What does this profile indicate?",
        options: [
          "Newly registered domain used for a targeted phishing campaign",
          "A legitimate Microsoft subsidiary",
          "An expired parked domain",
          "A CDN edge node"
        ],
        correctAnswer: 0,
        explanation: "Typosquatting plus a very recent registration date and immediate certificate issuance is the standard phishing infrastructure fingerprint; NRD age alone is a strong risk signal."
      },
      {
        id: "sap-q5-8",
        difficulty: "hard",
        tags: ["Response", "Playbook"],
        scenario: "300 employees received a credential-phishing email. Your gateway shows 41 clicked the link and 6 submitted credentials.",
        question: "What is the correct response ordering?",
        options: [
          "Send an awareness email first, then investigate next week",
          "Purge remaining messages, force password reset and revoke sessions/tokens for the 6 submitters, review sign-in logs for those accounts, then block indicators and notify users",
          "Reset every employee password immediately",
          "Only block the sending domain"
        ],
        correctAnswer: 1,
        explanation: "Contain the delivery (purge), remediate confirmed exposure (reset plus session/token revocation), scope for abuse, then block indicators and communicate. Token revocation is essential since a reset alone leaves live sessions."
      },
      {
        id: "sap-q5-9",
        difficulty: "medium",
        tags: ["Session Hijacking"],
        scenario: "A user's password was reset after a phishing incident, yet the attacker still accesses their mailbox from a foreign IP.",
        question: "What was missed?",
        options: [
          "MFA enrolment date",
          "Revocation of active sessions/refresh tokens and removal of attacker-added MFA methods or mail rules",
          "Antivirus scanning",
          "Firewall rules"
        ],
        correctAnswer: 1,
        explanation: "Stolen session tokens survive password changes. Full remediation revokes sessions, audits registered MFA methods, OAuth grants, forwarding rules and inbox rules."
      },
      {
        id: "sap-q5-10",
        difficulty: "medium",
        tags: ["BEC"],
        scenario: "An email from the CEO's correct address asks Finance to change a vendor's bank account. Mail headers authenticate correctly. A hidden inbox rule moves replies to RSS Feeds.",
        question: "What is happening?",
        options: [
          "Display-name spoofing",
          "Account takeover-based BEC — the real mailbox is compromised and rules hide the attacker's activity",
          "A false positive; DMARC passed",
          "A newsletter misconfiguration"
        ],
        correctAnswer: 1,
        explanation: "Authenticated mail plus hidden rules indicates the account itself is controlled by the attacker. Rules to RSS Feeds/Archive are a hallmark of BEC evidence hiding."
      },
      {
        id: "sap-q5-11",
        difficulty: "medium",
        tags: ["BEC", "Controls"],
        scenario: "Finance asks how to prevent vendor-payment fraud in future.",
        question: "Which control is most effective?",
        options: [
          "Out-of-band verification with a known-good phone number for any bank detail change",
          "Adding an email banner only",
          "Blocking all external email",
          "Requiring PDF invoices instead of Word"
        ],
        correctAnswer: 0,
        explanation: "Payment-change fraud is a process problem. Independent, out-of-band callback verification defeats it regardless of how convincing the email is."
      },
      {
        id: "sap-q5-12",
        difficulty: "medium",
        tags: ["Email Architecture", "DMARC"],
        scenario: "Your domain publishes `v=DMARC1; p=none; rua=mailto:dmarc@company.com`.",
        question: "What protection does this provide today?",
        options: [
          "Full protection — spoofed mail is rejected",
          "Reporting only; no enforcement, so spoofed mail is still delivered",
          "It quarantines failures",
          "It encrypts outbound mail"
        ],
        correctAnswer: 1,
        explanation: "`p=none` is monitoring mode. Enforcement requires moving to quarantine and then reject once legitimate senders are aligned using the aggregate reports."
      },
      {
        id: "sap-q5-13",
        difficulty: "easy",
        tags: ["Safe Handling"],
        scenario: "A user forwards a suspicious email as an attachment, and you need to extract IOCs.",
        question: "Which handling practice is correct?",
        options: [
          "Open the attachment on your workstation to view it",
          "Analyse the .eml in a text/analysis tool and detonate any payload only in an isolated sandbox",
          "Forward it to all staff as a warning example with the payload intact",
          "Click the link to see where it goes"
        ],
        correctAnswer: 1,
        explanation: "Headers and IOCs are extracted statically; execution belongs in an isolated sandbox. Redistributing live payloads spreads the threat."
      },
      {
        id: "sap-q5-14",
        difficulty: "hard",
        tags: ["QR Phishing"],
        scenario: "An email contains no links — only a PNG with a QR code and text 'Scan to review your payroll update'. Gateway URL filtering saw nothing.",
        question: "Why does this evade controls, and what is the detection approach?",
        options: [
          "It evades URL scanning because the destination is encoded in an image; detect via image/QR decoding, sender risk, and lure-language analysis",
          "It cannot evade anything; gateways decode all images by default",
          "QR codes are harmless because phones are not corporate assets",
          "Only DMARC can stop it"
        ],
        correctAnswer: 0,
        explanation: "Quishing shifts the URL into image data and often onto unmanaged personal devices. Detection requires QR decoding at the gateway plus behavioural/lure signals."
      },
      {
        id: "sap-q5-15",
        difficulty: "medium",
        tags: ["Metrics"],
        scenario: "After a phishing simulation, leadership wants the most meaningful metric.",
        question: "Which metric best reflects SOC-relevant risk reduction?",
        options: [
          "Click rate alone",
          "Report rate and time-to-first-report, alongside credential-submission rate",
          "Number of emails sent",
          "Percentage of staff who opened the email"
        ],
        correctAnswer: 1,
        explanation: "Reporting speed gives the SOC time to purge and contain; combined with submission rate it measures both human detection and actual exposure, unlike raw opens."
      }
    ]
  },
  {
    quizId: "sap-q6",
    courseId: "soc-analyst-path",
    title: "Incident Handling Final Exam",
    description: "Comprehensive exam on severity classification, evidence handling, reporting, post-incident review, tabletops and runbook automation.",
    passingScore: 80,
    timeLimit: 35,
    questions: [
      {
        id: "sap-q6-1",
        difficulty: "medium",
        tags: ["Severity"],
        scenario: "Ransomware note found on one file server holding HR data; backups exist and are verified offline; no other host affected yet.",
        question: "Which severity assignment is most defensible?",
        options: [
          "Low — backups exist",
          "High/Critical — confirmed impact on a business-critical asset with active spread risk",
          "Informational until encryption completes",
          "Medium — only one host is affected"
        ],
        correctAnswer: 1,
        explanation: "Severity combines confirmed impact, asset criticality and spread potential. Recoverability affects recovery planning, not the initial severity of active ransomware."
      },
      {
        id: "sap-q6-2",
        difficulty: "medium",
        tags: ["Severity", "Criticality"],
        scenario: "The same commodity adware is found on a kiosk in the lobby and on the CFO's laptop.",
        question: "Why can the severities legitimately differ?",
        options: [
          "They cannot — the same malware always carries the same severity",
          "Asset criticality and data exposure change business impact, so the CFO's laptop rates higher",
          "Because the kiosk is newer",
          "Because malware behaves differently on laptops"
        ],
        correctAnswer: 1,
        explanation: "Severity is impact-based. Identical technical findings on assets of different criticality and data sensitivity produce different business risk."
      },
      {
        id: "sap-q6-3",
        difficulty: "medium",
        tags: ["NIST"],
        scenario: "Your IR programme follows NIST SP 800-61.",
        question: "What are its four phases in order?",
        options: [
          "Preparation; Detection & Analysis; Containment, Eradication & Recovery; Post-Incident Activity",
          "Identify; Protect; Detect; Respond",
          "Plan; Do; Check; Act",
          "Triage; Escalate; Close; Report"
        ],
        correctAnswer: 0,
        explanation: "NIST SP 800-61 defines those four phases, with containment/eradication/recovery grouped and a mandatory lessons-learned phase."
      },
      {
        id: "sap-q6-4",
        difficulty: "hard",
        tags: ["Containment"],
        scenario: "An attacker has a foothold on three hosts. Leadership wants immediate mass reimaging; the IR lead wants 24 hours of monitored observation first.",
        question: "What is the key trade-off?",
        options: [
          "Immediate eradication may miss undiscovered footholds, while delayed action risks further damage — the decision depends on scope confidence and business risk tolerance",
          "There is no trade-off; always reimage instantly",
          "Observation is always correct",
          "Only legal can decide"
        ],
        correctAnswer: 0,
        explanation: "Premature eradication tips off the adversary and often leaves persistence behind; extended observation increases exposure. The call is a documented risk decision by the incident commander."
      },
      {
        id: "sap-q6-5",
        difficulty: "medium",
        tags: ["Evidence", "Hashing"],
        scenario: "You acquire a disk image and must prove integrity months later in court.",
        question: "What is required?",
        options: [
          "Record cryptographic hashes (e.g. SHA-256) at acquisition and verify them at each transfer, documented in the chain of custody",
          "Store the image on a shared drive with no records",
          "Compress the image to save space",
          "Rename the file with the case number only"
        ],
        correctAnswer: 0,
        explanation: "Hash-at-acquisition plus verification at every handoff, recorded with who/what/when/why, is what makes evidence defensible."
      },
      {
        id: "sap-q6-6",
        difficulty: "medium",
        tags: ["Chain of Custody"],
        scenario: "A laptop is handed from an analyst to a forensic examiner without a signed record.",
        question: "What is the consequence?",
        options: [
          "None, as long as the hash matches",
          "The chain of custody is broken, weakening admissibility and the credibility of findings",
          "The evidence is automatically destroyed",
          "The incident must be reclassified as low severity"
        ],
        correctAnswer: 1,
        explanation: "An unbroken, documented custody trail is a legal requirement; gaps allow challenges that the evidence could have been altered."
      },
      {
        id: "sap-q6-7",
        difficulty: "hard",
        tags: ["Order of Volatility"],
        scenario: "You must collect: CPU cache/registers, RAM, network state, disk, and archival backups.",
        question: "What is the RFC 3227 order?",
        options: [
          "Registers/cache → RAM → network state → disk → backups",
          "Backups → disk → RAM → network state → registers",
          "Disk → RAM → registers → network state → backups",
          "RAM → disk → registers → backups → network state"
        ],
        correctAnswer: 0,
        explanation: "Collect most-volatile first: processor state, memory, then transient network data, then persistent disk, then archival media."
      },
      {
        id: "sap-q6-8",
        difficulty: "medium",
        tags: ["Reporting"],
        scenario: "You are writing the executive summary of a major incident report.",
        question: "What should it contain?",
        options: [
          "Raw log excerpts and tool output",
          "Business impact, scope, current status, key decisions and recommendations — in non-technical language",
          "A list of every command executed",
          "The full MITRE ATT&CK matrix"
        ],
        correctAnswer: 1,
        explanation: "Executive summaries answer what happened, what it cost, whether it is contained and what must change. Technical detail belongs in later sections."
      },
      {
        id: "sap-q6-9",
        difficulty: "medium",
        tags: ["Reporting", "Timeline"],
        scenario: "Your incident timeline mixes UTC, local time and log-source-native timestamps.",
        question: "What is the correct practice?",
        options: [
          "Normalise all timestamps to UTC with the source zone noted",
          "Use the analyst's local time throughout",
          "Omit timestamps to avoid confusion",
          "Use relative times only ('two hours later')"
        ],
        correctAnswer: 0,
        explanation: "A single normalised time base (UTC) is essential for correlating multi-source evidence and for external parties reading the report."
      },
      {
        id: "sap-q6-10",
        difficulty: "medium",
        tags: ["Post-Incident"],
        scenario: "The retrospective focuses on which analyst missed the first alert.",
        question: "What is wrong with this approach?",
        options: [
          "Nothing — accountability improves performance",
          "Blame suppresses information sharing; reviews should be blameless and target systemic gaps in process, tooling and coverage",
          "Retrospectives should be skipped entirely",
          "Only managers should attend"
        ],
        correctAnswer: 1,
        explanation: "Blameless review surfaces the real causes — alert quality, staffing, runbook gaps — that individual blame hides."
      },
      {
        id: "sap-q6-11",
        difficulty: "hard",
        tags: ["Root Cause"],
        scenario: "Initial access came via a valid VPN credential with no MFA, obtained through phishing three weeks earlier.",
        question: "What is the root cause, versus the contributing factors?",
        options: [
          "Root cause: absence of MFA on remote access; contributing: successful phishing and delayed credential-exposure detection",
          "Root cause: the user clicked a link; no contributing factors",
          "Root cause: the VPN vendor",
          "Root cause: insufficient antivirus licences"
        ],
        correctAnswer: 0,
        explanation: "The systemic control failure that made compromise possible is the missing MFA; user action and detection latency are contributing factors addressed separately."
      },
      {
        id: "sap-q6-12",
        difficulty: "medium",
        tags: ["Tabletop"],
        scenario: "You are planning a tabletop for a ransomware scenario.",
        question: "What makes it effective?",
        options: [
          "A realistic injected scenario with defined objectives, cross-functional participants (legal, comms, IT, execs), and captured action items with owners",
          "A quiz on security definitions",
          "Technical staff only, with no scenario script",
          "An unannounced live encryption test on production"
        ],
        correctAnswer: 0,
        explanation: "Tabletops test decision-making and coordination. Objectives, injects, cross-functional participation and tracked follow-ups are what turn the exercise into improvement."
      },
      {
        id: "sap-q6-13",
        difficulty: "medium",
        tags: ["Runbooks"],
        scenario: "Two analysts handle identical alerts in completely different ways with different outcomes.",
        question: "What is the systemic fix?",
        options: [
          "A documented runbook with decision criteria, required evidence and escalation thresholds",
          "Assign all alerts to the senior analyst",
          "Increase alert severity",
          "Rotate shifts more frequently"
        ],
        correctAnswer: 0,
        explanation: "Consistency comes from documented decision logic, not individual judgement; runbooks also make automation and QA possible."
      },
      {
        id: "sap-q6-14",
        difficulty: "medium",
        tags: ["SOAR"],
        scenario: "You want to automate a response step. Which is the safest first candidate?",
        question: "Select the best automation candidate.",
        options: [
          "Automatic enrichment of alerts with reputation, asset and identity context",
          "Automatic domain-controller shutdown",
          "Automatic mass password reset for all users",
          "Automatic deletion of suspicious files across the estate"
        ],
        correctAnswer: 0,
        explanation: "Start with read-only enrichment: high value, no blast radius. Destructive or wide-scope actions need human approval gates."
      },
      {
        id: "sap-q6-15",
        difficulty: "hard",
        tags: ["Legal", "Notification"],
        scenario: "During an intrusion you discover the attacker exfiltrated a database containing EU and Californian customer records.",
        question: "What must the SOC do?",
        options: [
          "Handle it purely technically; notification is not a SOC concern",
          "Immediately engage legal/privacy stakeholders, preserve evidence, and support regulatory notification timelines (GDPR 72 hours, CCPA obligations)",
          "Notify the public before informing legal",
          "Delete the exposed records to reduce exposure"
        ],
        correctAnswer: 1,
        explanation: "Confirmed exfiltration of regulated data triggers legal obligations. The SOC's job is early escalation, evidence preservation and factual scoping support."
      },
      {
        id: "sap-q6-16",
        difficulty: "medium",
        tags: ["Communication"],
        scenario: "Mid-incident, a journalist emails an analyst asking for comment.",
        question: "What is the correct action?",
        options: [
          "Provide the technical facts to be transparent",
          "Refer the request to the designated communications/PR contact without commenting",
          "Deny that any incident occurred",
          "Share the incident report"
        ],
        correctAnswer: 1,
        explanation: "External communications flow through a single authorised channel; ad-hoc analyst statements create legal and reputational risk."
      },
      {
        id: "sap-q6-17",
        difficulty: "medium",
        tags: ["Eradication"],
        scenario: "You removed the malware binary and the Run key, and declared eradication complete. Two days later the host beacons again.",
        question: "What most likely went wrong?",
        options: [
          "Antivirus was out of date",
          "Incomplete scoping — additional persistence (scheduled task, WMI, service, or a second implant) was never identified",
          "The host needed a reboot",
          "The C2 domain was re-registered"
        ],
        correctAnswer: 1,
        explanation: "Eradication must follow full scoping across all persistence mechanisms and affected hosts; single-artefact cleanup is a common re-compromise cause."
      },
      {
        id: "sap-q6-18",
        difficulty: "medium",
        tags: ["Recovery"],
        scenario: "A rebuilt server is ready to return to production after a compromise.",
        question: "What must occur before restoration?",
        options: [
          "Rebuild from known-good media, patch, rotate all credentials/keys used on the host, and validate with enhanced monitoring",
          "Restore the latest backup without validating its date relative to compromise",
          "Return it immediately to minimise downtime",
          "Reuse the original service account passwords"
        ],
        correctAnswer: 0,
        explanation: "Recovery requires trusted rebuild, patching, credential rotation and a heightened-monitoring period; restoring a post-compromise backup reintroduces the threat."
      },
      {
        id: "sap-q6-19",
        difficulty: "hard",
        tags: ["Metrics"],
        scenario: "Post-incident metrics: dwell time 34 days, MTTD 34 days, MTTR 9 hours, re-compromise within 30 days: yes.",
        question: "Which two findings deserve the most attention?",
        options: [
          "Detection coverage gaps (34-day dwell) and incomplete eradication (re-compromise)",
          "MTTR of 9 hours and the number of tickets",
          "Analyst overtime and shift patterns",
          "Report length and formatting"
        ],
        correctAnswer: 0,
        explanation: "A month of undetected dwell points to missing telemetry/detections; re-compromise points to eradication and scoping failures. Response speed was not the weakness."
      },
      {
        id: "sap-q6-20",
        difficulty: "medium",
        tags: ["Escalation"],
        scenario: "Your incident classification matrix says a confirmed compromise of a Tier-0 asset requires immediate executive notification, but the CISO is unavailable.",
        question: "What should happen?",
        options: [
          "Wait for the CISO to return",
          "Follow the documented deputy/escalation chain and record the notification attempt and outcome",
          "Skip notification and note it in the report",
          "Post the details in a company-wide chat channel"
        ],
        correctAnswer: 1,
        explanation: "Escalation paths must define deputies; documenting attempts and successful contact is part of the incident record."
      },
      {
        id: "sap-q6-21",
        difficulty: "medium",
        tags: ["Documentation"],
        scenario: "An analyst records: 'Looked at host, seemed fine, closed.'",
        question: "Why is this insufficient?",
        options: [
          "It lacks the evidence examined, the queries run, the reasoning and the verdict criteria needed for review and reproducibility",
          "It is too long",
          "It should have included a screenshot only",
          "It should have been sent by email"
        ],
        correctAnswer: 0,
        explanation: "Case notes must let another analyst reconstruct the investigation: sources examined, artefacts checked, reasoning and the basis of the verdict."
      },
      {
        id: "sap-q6-22",
        difficulty: "medium",
        tags: ["Playbook Design"],
        scenario: "Your organisation has a policy stating incidents must be contained within four hours, and a playbook describing exact EDR isolation steps.",
        question: "Which statement is correct?",
        options: [
          "The policy sets the requirement and authority; the playbook provides the executable procedure",
          "They are the same document with different names",
          "Playbooks override policies",
          "Policies contain tool-specific commands"
        ],
        correctAnswer: 0,
        explanation: "Policy = what must happen and who is authorised; playbook/runbook = the concrete, tool-specific how."
      },
      {
        id: "sap-q6-23",
        difficulty: "hard",
        tags: ["Insider Threat"],
        scenario: "DLP flags an employee uploading 12 GB of design files to personal cloud storage two days before their resignation takes effect.",
        question: "How does handling differ from a malware incident?",
        options: [
          "It does not differ at all",
          "HR and Legal must be engaged early, the subject must not be tipped off, and evidence handling must anticipate employment/legal proceedings",
          "The employee should be confronted immediately by the SOC",
          "The account should be deleted to stop the upload"
        ],
        correctAnswer: 1,
        explanation: "Insider cases are people-and-legal processes; premature confrontation or account deletion destroys evidence and creates liability."
      },
      {
        id: "sap-q6-24",
        difficulty: "medium",
        tags: ["Third Party"],
        scenario: "The intrusion originated through a managed service provider's remote access tooling.",
        question: "What additional step is required?",
        options: [
          "Nothing beyond internal containment",
          "Contractual/third-party incident notification, joint scoping with the provider, and review of their access privileges",
          "Publicly blame the provider",
          "Immediately terminate the contract before scoping"
        ],
        correctAnswer: 1,
        explanation: "Supply-chain intrusions require coordinated scoping with the third party plus contractual notification and privilege review of their access."
      },
      {
        id: "sap-q6-25",
        difficulty: "medium",
        tags: ["Closure"],
        scenario: "You are about to close a major incident.",
        question: "Which criteria must be met?",
        options: [
          "Threat eradicated and validated, systems recovered, evidence archived, report issued, and lessons-learned actions assigned with owners and dates",
          "The alert queue is empty",
          "The affected user says everything works",
          "Seven days have passed"
        ],
        correctAnswer: 0,
        explanation: "Closure is criteria-based, ending with validated eradication, recovery, documentation and tracked improvement actions."
      }
    ]
  },
  {
    quizId: "sap-q7",
    courseId: "soc-analyst-path",
    title: "Cloud Security Monitoring Quiz",
    description: "Shared responsibility, CloudTrail/GuardDuty, Azure AD and M365, container security, GCP logging and multi-cloud SIEM.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q7-1",
        difficulty: "easy",
        tags: ["Shared Responsibility"],
        scenario: "An S3 bucket containing customer PII was publicly readable and scraped.",
        question: "Under the shared responsibility model, who is responsible?",
        options: [
          "The customer — configuration of data and access controls is always the customer's responsibility",
          "The cloud provider, because it hosts the storage",
          "Shared 50/50",
          "The end users whose data leaked"
        ],
        correctAnswer: 0,
        explanation: "Providers secure the cloud (infrastructure); customers secure what they put in it — IAM, bucket policies, encryption and data classification."
      },
      {
        id: "sap-q7-2",
        difficulty: "medium",
        tags: ["AWS", "CloudTrail"],
        scenario: "CloudTrail: `eventName=GetObject`, 14,000 events in 6 minutes, `userIdentity.type=IAMUser` (backup-svc), `sourceIPAddress=45.146.x.x`, bucket `customer-exports`.",
        question: "What is the most likely activity?",
        options: [
          "Routine backup job",
          "Credential compromise with bulk data exfiltration from an external IP",
          "AWS internal maintenance",
          "A CloudFront cache warm-up"
        ],
        correctAnswer: 1,
        explanation: "A service account performing mass object reads from an unfamiliar external IP outside normal patterns indicates stolen access keys used for exfiltration."
      },
      {
        id: "sap-q7-3",
        difficulty: "hard",
        tags: ["AWS", "IAM", "T1078.004"],
        scenario: "CloudTrail shows: `CreateUser` → `AttachUserPolicy (AdministratorAccess)` → `CreateAccessKey`, all by a compromised developer role within 90 seconds.",
        question: "What is the adversary doing?",
        options: [
          "Persistence and privilege escalation by creating a backdoor admin identity",
          "Normal onboarding automation",
          "Rotating credentials for security",
          "Reducing privileges"
        ],
        correctAnswer: 0,
        explanation: "Creating a new IAM user with AdministratorAccess and fresh keys establishes durable, independent access that survives remediation of the original identity."
      },
      {
        id: "sap-q7-4",
        difficulty: "medium",
        tags: ["AWS", "Anti-Forensics"],
        scenario: "You observe `StopLogging` and `DeleteTrail` API calls shortly after a suspicious login.",
        question: "How should you interpret and respond?",
        options: [
          "Defense evasion targeting audit logs — treat as a high-severity incident, restore logging, and pivot to CloudWatch/Config/VPC flow logs and any log-archive account",
          "Routine cost optimisation",
          "A developer testing configuration",
          "Ignore — CloudTrail restarts automatically"
        ],
        correctAnswer: 0,
        explanation: "Disabling CloudTrail (T1562.008) is a deliberate evasion step. Investigation continues via independent telemetry and immutable log-archive accounts."
      },
      {
        id: "sap-q7-5",
        difficulty: "medium",
        tags: ["AWS", "GuardDuty"],
        scenario: "GuardDuty raises `UnauthorizedAccess:EC2/MetadataDNSRebind` and `Discovery:S3/MaliciousIPCaller`.",
        question: "What underlying attack should you suspect?",
        options: [
          "SSRF against the instance metadata service to steal role credentials, then S3 reconnaissance with them",
          "A DDoS attack",
          "A billing anomaly",
          "A patching failure"
        ],
        correctAnswer: 0,
        explanation: "Metadata-service abuse is the standard cloud credential-theft path (IMDSv1 SSRF); subsequent S3 calls from a suspicious IP show the stolen role in use."
      },
      {
        id: "sap-q7-6",
        difficulty: "medium",
        tags: ["Azure AD", "MFA Fatigue"],
        scenario: "Azure AD sign-in logs: 38 MFA push requests to one user in 12 minutes, 37 denied, 1 approved at 02:41, from an IP in another country.",
        question: "What technique is this?",
        options: [
          "MFA fatigue / push bombing leading to a successful account takeover",
          "A password spray",
          "Kerberoasting",
          "A token expiry loop"
        ],
        correctAnswer: 0,
        explanation: "Repeated push prompts until the user approves is MFA fatigue (T1621). Number matching and prompt throttling are the mitigations."
      },
      {
        id: "sap-q7-7",
        difficulty: "hard",
        tags: ["M365", "OAuth"],
        scenario: "A user consented to an app named 'Doc Reader' requesting `Mail.ReadWrite`, `Files.Read.All` and `offline_access`.",
        question: "Why is this significant?",
        options: [
          "Illicit consent grant — the app holds persistent, password-reset-resistant access to mail and files via refresh tokens",
          "It is harmless because the user approved it",
          "It only affects the app's own data",
          "Consent expires after one hour"
        ],
        correctAnswer: 0,
        explanation: "OAuth consent phishing (T1528) grants long-lived delegated access; remediation requires revoking the grant and refresh tokens, not just a password reset."
      },
      {
        id: "sap-q7-8",
        difficulty: "medium",
        tags: ["M365", "Audit"],
        scenario: "You must determine whether a compromised mailbox had messages exfiltrated.",
        question: "Which M365 sources answer this?",
        options: [
          "Unified Audit Log (MailItemsAccessed, New-InboxRule, Set-Mailbox forwarding) and message trace",
          "The user's Sent Items folder only",
          "Windows Security event logs",
          "Azure billing reports"
        ],
        correctAnswer: 0,
        explanation: "MailItemsAccessed records mailbox access at scale; rule/forwarding changes and message trace reveal automated exfiltration paths."
      },
      {
        id: "sap-q7-9",
        difficulty: "medium",
        tags: ["Containers"],
        scenario: "A Kubernetes pod runs with `privileged: true` and mounts `/var/run/docker.sock`.",
        question: "What is the risk?",
        options: [
          "Container escape to the node — the workload can control the container runtime and effectively own the host",
          "Slower performance only",
          "No risk if the image is from a trusted registry",
          "It improves isolation"
        ],
        correctAnswer: 0,
        explanation: "Privileged pods with runtime socket access can spawn host-level containers and access host namespaces, giving straightforward node compromise."
      },
      {
        id: "sap-q7-10",
        difficulty: "medium",
        tags: ["Containers", "Runtime"],
        scenario: "A production container that should only run a Java service spawns `/bin/sh` and then `curl` to an unknown IP.",
        question: "Why is this high fidelity?",
        options: [
          "Containers are immutable by design, so unexpected shell/network processes deviate sharply from the known-good process profile",
          "Shells always run in containers",
          "curl is blocked by default in Kubernetes",
          "It indicates a normal health check"
        ],
        correctAnswer: 0,
        explanation: "Immutable, single-purpose workloads make behavioural baselining extremely effective — unexpected process execution is a strong compromise signal."
      },
      {
        id: "sap-q7-11",
        difficulty: "medium",
        tags: ["GCP"],
        scenario: "In GCP you need to see who called which API, when and from where.",
        question: "Which log type provides this?",
        options: [
          "Cloud Audit Logs (Admin Activity and Data Access)",
          "VPC Flow Logs only",
          "Cloud Billing export",
          "Stackdriver uptime checks"
        ],
        correctAnswer: 0,
        explanation: "Admin Activity logs record configuration changes; Data Access logs record reads/writes of data. Together they give the API-level audit trail."
      },
      {
        id: "sap-q7-12",
        difficulty: "hard",
        tags: ["GCP", "IAM"],
        scenario: "A service account is granted `iam.serviceAccountTokenCreator` on a highly privileged service account.",
        question: "Why is this dangerous?",
        options: [
          "It enables privilege escalation via impersonation — the lower-privileged identity can mint tokens for the privileged one",
          "It only allows reading metadata",
          "It has no effect without a console login",
          "It restricts access further"
        ],
        correctAnswer: 0,
        explanation: "Token-creator rights allow impersonation, a well-known GCP escalation path that bypasses direct role assignment reviews."
      },
      {
        id: "sap-q7-13",
        difficulty: "medium",
        tags: ["Multi-Cloud", "SIEM"],
        scenario: "You must build one detection for 'privileged role assigned outside change window' across AWS, Azure and GCP.",
        question: "What is the prerequisite?",
        options: [
          "Normalising each provider's audit events into a common schema with a shared identity and privilege model",
          "Using only the native console of each cloud",
          "Turning off two of the three clouds' logs",
          "Writing the rule in the provider with the most logs"
        ],
        correctAnswer: 0,
        explanation: "Cross-cloud detection depends on normalised identity, action and resource fields; without it, each cloud needs bespoke, divergent rules."
      },
      {
        id: "sap-q7-14",
        difficulty: "medium",
        tags: ["Cloud Response"],
        scenario: "An EC2 instance is confirmed compromised and you must preserve evidence.",
        question: "What is the correct sequence?",
        options: [
          "Snapshot the EBS volumes and capture memory if possible, isolate with a restrictive security group, then revoke the instance role's credentials",
          "Terminate the instance immediately",
          "Reboot the instance to clear the malware",
          "Detach the volumes and delete the snapshots"
        ],
        correctAnswer: 0,
        explanation: "Cloud containment preserves volatile and disk evidence first (snapshots/memory), isolates via network policy rather than termination, and revokes the instance profile credentials which may already be stolen."
      },
      {
        id: "sap-q7-15",
        difficulty: "medium",
        tags: ["Cloud Posture"],
        scenario: "Leadership asks how to prevent recurrence of misconfigured public storage.",
        question: "Which control is most effective?",
        options: [
          "Preventive guardrails (organisation policies / SCPs / block-public-access) enforced at account level, with CSPM detection as a backstop",
          "Weekly manual bucket reviews",
          "A staff awareness email",
          "Increasing log retention"
        ],
        correctAnswer: 0,
        explanation: "Preventive policy enforcement stops the misconfiguration from being possible; posture management catches drift, but detection alone does not prevent exposure."
      }
    ]
  },
  {
    quizId: "sap-q8",
    courseId: "soc-analyst-path",
    title: "Threat Intelligence & Hunting Quiz",
    description: "Intel lifecycle, IOC feeds and STIX/TAXII, hypothesis-driven hunting, analytics, ATT&CK mapping and actor profiling.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "sap-q8-1",
        difficulty: "easy",
        tags: ["Intel Lifecycle"],
        scenario: "Your CTI programme buys three feeds but no one has defined what questions they should answer.",
        question: "Which lifecycle phase was skipped?",
        options: [
          "Direction/planning — defining intelligence requirements",
          "Dissemination",
          "Processing",
          "Feedback"
        ],
        correctAnswer: 0,
        explanation: "Without prioritised intelligence requirements, collection is unfocused and output is rarely actionable. Direction drives every later phase."
      },
      {
        id: "sap-q8-2",
        difficulty: "medium",
        tags: ["Pyramid of Pain"],
        scenario: "You can block either a set of C2 IP addresses or a detection for the adversary's distinctive TTP chain.",
        question: "Which imposes more cost on the adversary, and why?",
        options: [
          "The TTP detection — behaviours are expensive to change, while IPs are trivially rotated",
          "The IP block — infrastructure is irreplaceable",
          "Both are equal",
          "Neither affects the adversary"
        ],
        correctAnswer: 0,
        explanation: "The Pyramid of Pain ranks TTPs highest: changing tradecraft costs the adversary far more than swapping hashes, IPs or domains."
      },
      {
        id: "sap-q8-3",
        difficulty: "medium",
        tags: ["Intel Types"],
        scenario: "A report describes an actor's long-term targeting of your sector and likely motivations, aimed at board-level planning.",
        question: "What type of intelligence is this?",
        options: [
          "Strategic",
          "Tactical",
          "Operational",
          "Technical"
        ],
        correctAnswer: 0,
        explanation: "Strategic intel informs long-term risk and investment decisions; tactical covers TTPs for defenders and technical covers atomic indicators."
      },
      {
        id: "sap-q8-4",
        difficulty: "medium",
        tags: ["STIX/TAXII"],
        scenario: "You must automate ingestion of a partner's indicators into your SIEM.",
        question: "What roles do STIX and TAXII play?",
        options: [
          "STIX is the data format for representing intel objects; TAXII is the transport protocol for exchanging them",
          "STIX transports data; TAXII formats it",
          "Both are file compression formats",
          "Both are SIEM query languages"
        ],
        correctAnswer: 0,
        explanation: "STIX 2.x defines objects and relationships; TAXII defines the API/collections used to publish and consume them."
      },
      {
        id: "sap-q8-5",
        difficulty: "hard",
        tags: ["IOC Management"],
        scenario: "A feed provides 2 million IPs with no context, confidence or expiry. Blocking them all causes outages.",
        question: "What is the correct handling?",
        options: [
          "Score and age indicators by confidence, source and relevance; use low-confidence data for enrichment/hunting rather than automated blocking",
          "Block everything immediately",
          "Discard all external intel",
          "Add all of them as SIEM alerts"
        ],
        correctAnswer: 0,
        explanation: "Indicators need confidence, context and expiry. High-confidence, relevant IOCs can gate blocking; the rest support investigation and hunting."
      },
      {
        id: "sap-q8-6",
        difficulty: "medium",
        tags: ["Hunting"],
        scenario: "An analyst says 'I'm going to hunt today' and starts scrolling raw logs at random.",
        question: "What is missing?",
        options: [
          "A testable hypothesis with defined data sources, scope, and success criteria",
          "A faster workstation",
          "More alerts",
          "A longer retention period"
        ],
        correctAnswer: 0,
        explanation: "Hunting is structured: hypothesis → data → analysis → outcome (detection, tuning, or documented negative result). Random browsing is not repeatable."
      },
      {
        id: "sap-q8-7",
        difficulty: "medium",
        tags: ["Hunting", "HMM"],
        scenario: "Your team runs ad-hoc hunts with no data-collection routine and no analytics automation.",
        question: "Where do you sit on the Hunting Maturity Model?",
        options: [
          "HMM1 — Minimal: relies on routine alerting with some data collection",
          "HMM3 — Innovative",
          "HMM4 — Leading, with automated analytics",
          "HMM2 — Procedural"
        ],
        correctAnswer: 0,
        explanation: "HMM levels progress from Initial (0) through Minimal (1), Procedural (2), Innovative (3) to Leading (4), where successful hunts are automated into detections."
      },
      {
        id: "sap-q8-8",
        difficulty: "hard",
        tags: ["Hunt Outcome"],
        scenario: "A hunt for malicious WMI persistence finds nothing across 4,000 hosts.",
        question: "What is the correct conclusion?",
        options: [
          "The hunt has value: document the negative result, confirm telemetry coverage was adequate, and convert the logic into a standing detection",
          "The hunt failed and should not be recorded",
          "WMI persistence is impossible in the environment",
          "The analyst wasted the day"
        ],
        correctAnswer: 0,
        explanation: "Negative results validate coverage and reduce uncertainty — provided visibility was verified. Successful hunt logic should always be operationalised."
      },
      {
        id: "sap-q8-9",
        difficulty: "hard",
        tags: ["Analytics", "Beaconing"],
        scenario: "You want to find low-and-slow C2 in six months of proxy logs.",
        question: "Which analytic technique is most suitable?",
        options: [
          "Time-delta/interval regularity analysis per source-destination pair, combined with rare-destination frequency analysis",
          "Sorting by total bytes descending",
          "Filtering for known malicious domains only",
          "Counting total requests per day"
        ],
        correctAnswer: 0,
        explanation: "Beacon hunting relies on periodicity statistics (delta variance, jitter) and stack-counting rare destinations — signature lists cannot find unknown infrastructure."
      },
      {
        id: "sap-q8-10",
        difficulty: "medium",
        tags: ["Analytics", "Stacking"],
        scenario: "You collect all scheduled task names across the estate and count occurrences.",
        question: "What is this technique and what does it reveal?",
        options: [
          "Frequency analysis / long-tail stacking — rare, one-off entries stand out as candidates for malicious persistence",
          "Regression testing",
          "Hash matching",
          "Signature-based detection"
        ],
        correctAnswer: 0,
        explanation: "Stack counting exploits the fact that legitimate enterprise artefacts repeat widely; uniqueness is suspicious in a homogeneous estate."
      },
      {
        id: "sap-q8-11",
        difficulty: "medium",
        tags: ["Bias"],
        scenario: "A hunter believes a specific APT is present and only queries data supporting that view, dismissing contradictory evidence.",
        question: "Which analytic pitfall is this, and what mitigates it?",
        options: [
          "Confirmation bias — mitigate with structured analytic techniques such as Analysis of Competing Hypotheses and peer review",
          "Anchoring, mitigated by faster queries",
          "Survivorship bias, mitigated by more data",
          "No pitfall; conviction speeds hunting"
        ],
        correctAnswer: 0,
        explanation: "Seeking only confirming evidence is confirmation bias; ACH forces evaluation of alternative explanations against all evidence."
      },
      {
        id: "sap-q8-12",
        difficulty: "medium",
        tags: ["ATT&CK"],
        scenario: "Your coverage matrix shows strong Execution and Persistence detections but nothing for Credential Access or Lateral Movement.",
        question: "What does this tell you?",
        options: [
          "A mid-kill-chain blind spot: attackers who survive initial execution can move and escalate undetected — prioritise telemetry and detections there",
          "Coverage is sufficient because early stages are detected",
          "Credential Access is not a real tactic",
          "The matrix should be ignored"
        ],
        correctAnswer: 0,
        explanation: "ATT&CK heatmaps expose sequence gaps. Missing mid-chain coverage means any missed initial access converts directly into undetected domain-wide movement."
      },
      {
        id: "sap-q8-13",
        difficulty: "medium",
        tags: ["Diamond Model"],
        scenario: "You link two intrusions by shared TLS certificate reuse and identical loader code.",
        question: "Which Diamond Model vertices are you pivoting across?",
        options: [
          "Infrastructure and Capability",
          "Victim and Adversary",
          "Adversary and Infrastructure only",
          "Victim and Capability"
        ],
        correctAnswer: 0,
        explanation: "Certificate reuse is Infrastructure; shared loader code is Capability. Pivoting across these vertices is the basis of campaign clustering."
      },
      {
        id: "sap-q8-14",
        difficulty: "hard",
        tags: ["Attribution"],
        scenario: "A sample contains Cyrillic strings, compiles in UTC+3 working hours, and reuses a public GitHub loader.",
        question: "How confident can attribution be?",
        options: [
          "Low — these are weak, easily falsified indicators; attribution requires multi-source corroboration and should carry explicit confidence language",
          "High — language artefacts prove origin",
          "Certain, because build timestamps cannot be altered",
          "Attribution is irrelevant to defenders"
        ],
        correctAnswer: 0,
        explanation: "Language, timestamps and public code are trivially spoofed or shared. Responsible attribution uses corroborated evidence and stated confidence levels."
      },
      {
        id: "sap-q8-15",
        difficulty: "medium",
        tags: ["Operationalising Intel"],
        scenario: "A trusted report details an actor's use of a specific LOLBin chain against your sector.",
        question: "What is the highest-value SOC action?",
        options: [
          "Build and validate detection content for that behaviour, then hunt historically for it in retained data",
          "Add the report's IPs to a watchlist and close the task",
          "Forward the PDF to all staff",
          "Wait until the actor targets you"
        ],
        correctAnswer: 0,
        explanation: "Turning behavioural intel into validated detections plus a retrospective hunt delivers both future coverage and evidence of past compromise."
      }
    ]
  }
];
