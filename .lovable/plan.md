

# Add Practical Exercises & Scenario Labs to SOC Analyst Learning Path

## Overview
The SOC Analyst Learning Path has 12 modules with 72 lessons total. Currently, none have practical exercises or scenario labs. We will add scenario-based labs to **one key lesson per module** (12 total), each with a single realistic scenario and 3-4 questions.

## Target Lessons (one per module)

| Module | Lesson | Scenario Theme |
|--------|--------|---------------|
| 1. SOC Analyst Role | 1.1 - Day in the Life | Alert triage and shift handover decisions |
| 2. Network Traffic | 2.2 - DNS Analysis | DNS tunneling detection from network logs |
| 3. SIEM Mastery | 3.1 - Advanced SIEM Queries | Brute force + lateral movement SIEM investigation |
| 4. Endpoint Investigation | 4.1 - Process Forensics | Suspicious process chain on a Windows workstation |
| 5. Phishing & Email | 5.1 - Email Header Analysis | Spoofed email with malicious attachment |
| 6. Incident Handling | 6.1 - Incident Severity Classification | Multi-vector incident requiring severity triage |
| 7. Cloud Security | 7.1 - Cloud Security (first lesson) | Unauthorized S3 bucket access and IAM anomaly |
| 8. Threat Intel & Hunting | 8.1 - Threat Intel (first lesson) | APT group IOC correlation and attribution |
| 9. Digital Forensics | 9.1 - Digital Forensics (first lesson) | Disk image evidence from compromised server |
| 10. Automation & SOAR | 10.1 - SOAR (first lesson) | Automating a phishing response playbook |
| 11. Vulnerability Mgmt | 11.1 - VM Lifecycle | Critical vulnerability prioritization scenario |
| 12. Advanced Attacks | 12.1 - AD Attacks & Defense | Kerberoasting attack detection in AD logs |

## Data Structure
Each lesson gets a `practicalExercise` block with:
- `title` and `description`
- `steps` array (3-5 investigation steps)
- `labScenario` — one concise 4-6 line scenario
- `labQuestions` — 3-4 questions with `id`, `question`, `answer`, `hint`

Answers will be kept concise (1-3 words or short phrases) for keyword matching.

## Technical Changes
**File modified**: `src/data/lessonContent.ts`
- Add `practicalExercise` objects to 12 existing lesson entries
- No UI changes needed — the `LessonViewer.tsx` already renders `labScenario` and `labQuestions` when present

## Design Principles
- One scenario per lesson, 3-4 questions per scenario
- Realistic SOC analyst tasks (triage, classification, tool usage, decision-making)
- Beginner-friendly difficulty with professional tone
- Concise answers suitable for keyword-based validation

