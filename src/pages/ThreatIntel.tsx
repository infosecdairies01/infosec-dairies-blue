import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import { Bell, User, Search, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  description: string;
  url: string;
  /** Official brand logo (favicon/logo endpoint of the vendor's own domain) */
  logo: string;
  /** Text fallback shown if the official logo cannot be loaded */
  fallback: string;
}

interface ToolCategory {
  title: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "1. URL / IP / Domain Investigation",
    tools: [
      {
        name: "VirusTotal",
        description: "Analyze files, URLs, domains and IPs for threats.",
        url: "https://www.virustotal.com/",
        logo: "https://www.google.com/s2/favicons?domain=virustotal.com&sz=128",
        fallback: "VT",
      },
      {
        name: "AbuseIPDB",
        description: "Check IP address reputation and abuse reports.",
        url: "https://www.abuseipdb.com/",
        logo: "https://www.google.com/s2/favicons?domain=abuseipdb.com&sz=128",
        fallback: "AI",
      },
      {
        name: "URLhaus",
        description: "Search malicious URLs associated with malware campaigns.",
        url: "https://urlhaus.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=urlhaus.abuse.ch&sz=128",
        fallback: "UH",
      },
      {
        name: "URLScan.io",
        description: "Scan and analyze suspicious URLs and web pages.",
        url: "https://urlscan.io/",
        logo: "https://www.google.com/s2/favicons?domain=urlscan.io&sz=128",
        fallback: "US",
      },
      {
        name: "URLVoid",
        description: "Check website reputation across multiple blocklists.",
        url: "https://www.urlvoid.com/",
        logo: "https://www.google.com/s2/favicons?domain=urlvoid.com&sz=128",
        fallback: "UV",
      },
      {
        name: "PhishTank",
        description: "Verify and investigate suspected phishing URLs.",
        url: "https://phishtank.org/",
        logo: "https://www.google.com/s2/favicons?domain=phishtank.org&sz=128",
        fallback: "PT",
      },
      {
        name: "ThreatFox",
        description: "Search IOCs and malware infrastructure.",
        url: "https://threatfox.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=threatfox.abuse.ch&sz=128",
        fallback: "TF",
      },
    ],
  },
  {
    title: "2. Malware / Hash Investigation",
    tools: [
      {
        name: "MalwareBazaar",
        description: "Search malware samples and file hashes.",
        url: "https://bazaar.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=bazaar.abuse.ch&sz=128",
        fallback: "MB",
      },
      {
        name: "CrackStation",
        description: "Look up supported password hashes and investigate exposed hashes.",
        url: "https://crackstation.net/",
        logo: "https://www.google.com/s2/favicons?domain=crackstation.net&sz=128",
        fallback: "CS",
      },
    ],
  },
  {
    title: "3. Threat Intelligence Platforms",
    tools: [
      {
        name: "AlienVault OTX",
        description: "Explore IOCs, pulses and threat intelligence.",
        url: "https://otx.alienvault.com/",
        logo: "https://www.google.com/s2/favicons?domain=otx.alienvault.com&sz=128",
        fallback: "OTX",
      },
      {
        name: "MISP",
        description: "Open-source threat intelligence sharing platform.",
        url: "https://www.misp-project.org/",
        logo: "https://www.google.com/s2/favicons?domain=misp-project.org&sz=128",
        fallback: "MISP",
      },
      {
        name: "OpenCTI",
        description: "Open-source threat intelligence management platform.",
        url: "https://filigran.io/solutions/opencti/",
        logo: "https://www.google.com/s2/favicons?domain=filigran.io&sz=128",
        fallback: "CTI",
      },
      {
        name: "MITRE ATT&CK",
        description: "Research adversary tactics, techniques and procedures.",
        url: "https://attack.mitre.org/",
        logo: "https://www.google.com/s2/favicons?domain=attack.mitre.org&sz=128",
        fallback: "ATT",
      },
    ],
  },
];

const ToolLogo = ({ tool }: { tool: Tool }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="shrink-0 w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center overflow-hidden">
      {failed ? (
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
          {tool.fallback}
        </span>
      ) : (
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          loading="lazy"
          className="w-7 h-7 object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col min-h-[168px] rounded-xl border border-white/[0.08] bg-card/25 p-5",
        "transition-all duration-200 hover:border-primary/30 hover:bg-card/40"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <ToolLogo tool={tool} />
        <h3 className="text-[15px] font-semibold text-foreground leading-tight">
          {tool.name}
        </h3>
      </div>

      <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      <div className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:text-primary/80 transition-colors">
        <span>Open Tool</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </a>
  );
};

const ThreatIntel = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Threat Intel" />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-card/25 backdrop-blur-lg border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Threat Intelligence</h1>
              <p className="text-sm text-muted-foreground">
                Free & Open-Source Threat Intelligence Tools for SOC Analysts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="bg-background/50 border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 w-64 transition-colors backdrop-blur-sm"
                />
              </div>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button className="w-8 h-8 bg-primary/10 border border-primary/25 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 px-6 py-6 lg:px-10 overflow-auto">
            <div className="w-[92%] max-w-[1800px] mx-auto space-y-12">
              {toolCategories.map((category) => (
                <section key={category.title}>
                  <h2 className="text-[16px] font-semibold text-foreground mb-5">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {category.tools.map((tool) => (
                      <ToolCard key={tool.name} tool={tool} />
                    ))}
                  </div>
                </section>
              ))}

              <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                <span className="text-primary">ⓘ</span>
                <p>
                  These tools are free to use and open to the public. Use them responsibly for security research and investigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThreatIntel;
