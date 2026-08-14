import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import {
  Bell,
  User,
  Search,
  ExternalLink,
  Shield,
  Globe,
  Link as LinkIcon,
  Scan,
  CheckCircle,
  Fish,
  Target,
  Bug,
  Key,
  Satellite,
  Network,
  Database,
  Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
  iconColor: string;
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
        icon: Shield,
        iconColor: "text-blue-400",
      },
      {
        name: "AbuseIPDB",
        description: "Check IP address reputation and abuse reports.",
        url: "https://www.abuseipdb.com/",
        icon: Globe,
        iconColor: "text-red-400",
      },
      {
        name: "URLhaus",
        description: "Search malicious URLs associated with malware campaigns.",
        url: "https://urlhaus.abuse.ch/",
        icon: LinkIcon,
        iconColor: "text-green-400",
      },
      {
        name: "URLScan.io",
        description: "Scan and analyze suspicious URLs and web pages.",
        url: "https://urlscan.io/",
        icon: Scan,
        iconColor: "text-cyan-400",
      },
      {
        name: "URLVoid",
        description: "Check website reputation across multiple blocklists.",
        url: "https://www.urlvoid.com/",
        icon: CheckCircle,
        iconColor: "text-emerald-400",
      },
      {
        name: "PhishTank",
        description: "Verify and investigate suspected phishing URLs.",
        url: "https://phishtank.org/",
        icon: Fish,
        iconColor: "text-orange-400",
      },
      {
        name: "ThreatFox",
        description: "Search IOCs and malware infrastructure.",
        url: "https://threatfox.abuse.ch/",
        icon: Target,
        iconColor: "text-rose-400",
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
        icon: Bug,
        iconColor: "text-yellow-400",
      },
      {
        name: "CrackStation",
        description: "Look up supported password hashes and investigate exposed hashes.",
        url: "https://crackstation.net/",
        icon: Key,
        iconColor: "text-slate-400",
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
        icon: Satellite,
        iconColor: "text-lime-400",
      },
      {
        name: "MISP",
        description: "Open-source threat intelligence sharing platform.",
        url: "https://www.misp-project.org/",
        icon: Network,
        iconColor: "text-pink-400",
      },
      {
        name: "OpenCTI",
        description: "Open-source threat intelligence management platform.",
        url: "https://filigran.io/solutions/opencti/",
        icon: Database,
        iconColor: "text-indigo-400",
      },
      {
        name: "MITRE ATT&CK",
        description: "Research adversary tactics, techniques and procedures.",
        url: "https://attack.mitre.org/",
        icon: Grid3X3,
        iconColor: "text-primary",
      },
    ],
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col rounded-xl border border-white/[0.08] bg-card/25 p-5",
        "transition-all duration-200 hover:border-primary/30 hover:bg-card/40"
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("shrink-0 p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]", tool.iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-[15px] font-semibold text-foreground leading-tight pt-1.5">
          {tool.name}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
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

          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-10">
              {toolCategories.map((category) => (
                <section key={category.title}>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
