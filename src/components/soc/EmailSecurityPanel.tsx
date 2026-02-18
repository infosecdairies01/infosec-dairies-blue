import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeSimulation, useAnimatedValue, randomVariation } from "@/hooks/use-realtime-simulation";
import { Mail, ShieldAlert, ShieldCheck, AlertTriangle, Link2, Paperclip, Ban } from "lucide-react";
import { useState, useEffect } from "react";

const EmailSecurityPanel = () => {
  const tick = useRealtimeSimulation(7000);

  const [stats, setStats] = useState({
    totalScanned: 12847,
    blocked: 1432,
    phishing: 287,
    malwareAttachments: 64,
    suspiciousLinks: 193,
    quarantined: 412,
  });

  useEffect(() => {
    if (tick === 0) return;
    setStats({
      totalScanned: randomVariation(12847, 3),
      blocked: randomVariation(1432, 5),
      phishing: randomVariation(287, 8),
      malwareAttachments: randomVariation(64, 12),
      suspiciousLinks: randomVariation(193, 7),
      quarantined: randomVariation(412, 6),
    });
  }, [tick]);

  const totalScanned = useAnimatedValue(stats.totalScanned);
  const blocked = useAnimatedValue(stats.blocked);
  const phishing = useAnimatedValue(stats.phishing);
  const malwareAttachments = useAnimatedValue(stats.malwareAttachments);
  const suspiciousLinks = useAnimatedValue(stats.suspiciousLinks);
  const quarantined = useAnimatedValue(stats.quarantined);

  const recentThreats = [
    { sender: "support@l0gin-secure.net", subject: "Urgent: Verify your account", type: "Phishing", severity: "Critical", time: "2m ago" },
    { sender: "invoice@vendor-pay.xyz", subject: "Invoice #INV-9281 attached", type: "Malware", severity: "High", time: "8m ago" },
    { sender: "hr@company-update.io", subject: "Policy update - action required", type: "Phishing", severity: "High", time: "15m ago" },
    { sender: "noreply@shipp1ng-track.com", subject: "Your package is waiting", type: "Spam", severity: "Medium", time: "22m ago" },
    { sender: "admin@micros0ft-alert.net", subject: "Password expiration notice", type: "Phishing", severity: "Critical", time: "31m ago" },
  ];

  const metrics = [
    { label: "Emails Scanned", value: totalScanned, icon: Mail, color: "text-primary" },
    { label: "Blocked", value: blocked, icon: Ban, color: "text-destructive" },
    { label: "Phishing Detected", value: phishing, icon: ShieldAlert, color: "text-orange-400" },
    { label: "Malicious Attachments", value: malwareAttachments, icon: Paperclip, color: "text-red-400" },
    { label: "Suspicious Links", value: suspiciousLinks, icon: Link2, color: "text-yellow-400" },
    { label: "Quarantined", value: quarantined, icon: ShieldCheck, color: "text-secondary" },
  ];

  return (
    <Card className="bg-card/30 backdrop-blur-lg border-white/[0.08]">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Email Security Gateway
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-normal text-secondary">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            Scanning
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-background/40 border border-white/[0.06] rounded-lg p-3 text-center"
            >
              <m.icon className={`w-4 h-4 mx-auto mb-1.5 ${m.color}`} />
              <p className="text-lg font-bold text-foreground tabular-nums">{m.value.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Recent email threats table */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Recent Email Threats
          </h4>
          <div className="rounded-lg border border-white/[0.06] overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background/30 text-muted-foreground">
                  <th className="text-left px-3 py-2 font-medium">Sender</th>
                  <th className="text-left px-3 py-2 font-medium hidden md:table-cell">Subject</th>
                  <th className="text-left px-3 py-2 font-medium">Type</th>
                  <th className="text-left px-3 py-2 font-medium">Severity</th>
                  <th className="text-right px-3 py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentThreats.map((t, i) => (
                  <tr
                    key={i}
                    className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-3 py-2 text-foreground font-mono truncate max-w-[160px]">{t.sender}</td>
                    <td className="px-3 py-2 text-muted-foreground truncate max-w-[200px] hidden md:table-cell">{t.subject}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          t.type === "Phishing"
                            ? "bg-orange-500/10 text-orange-400"
                            : t.type === "Malware"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {t.type === "Phishing" ? <AlertTriangle className="w-3 h-3" /> : t.type === "Malware" ? <Paperclip className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        {t.type}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`text-[10px] font-semibold ${
                          t.severity === "Critical"
                            ? "text-destructive"
                            : t.severity === "High"
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {t.severity}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSecurityPanel;
