# Upgrade Nine Log Analysis Lessons

## Overview
Expand the missing lesson material for **Log Analysis for Beginners** while keeping the existing module order and lesson viewer unchanged.

## Lessons
- 4.2 Proxy & Web Gateway Logs
- 4.3 DNS Query Logs
- 4.4 VPN & Remote Access Logs
- 5.1 Pattern Recognition & Baseline
- 5.2 Timeline Reconstruction
- 5.3 Correlation Across Sources
- 6.1 Detecting Brute Force Attacks
- 6.2 Detecting Lateral Movement
- 6.3 Detecting Data Exfiltration

## Content Standard
Each lesson will include:
- Beginner-friendly concepts, field references, and realistic log examples
- Practical detection patterns and a repeatable analyst workflow
- Useful commands or query examples where appropriate
- Four concise key takeaways
- A realistic practical exercise with investigation steps, one scenario, and four graded questions with hints

## Technical Details
- Add nine `log-analysis` lesson entries to `src/data/lessonContent.ts`.
- Preserve existing lesson IDs, titles, navigation, and course metadata.
- Use unique exercise and question IDs to avoid conflicts.
- Verify all nine lessons resolve in the viewer and the project checks pass.
