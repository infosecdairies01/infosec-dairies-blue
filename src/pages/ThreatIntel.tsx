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
  /** Secondary official-favicon source tried if the first fails */
  logoFallback: string;
  /** Text fallback shown if the official logo cannot be loaded */
  fallback: string;
}

interface ToolCategory {
  title: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "1. IOC / Reputation Investigation",
    tools: [
      {
        name: "VirusTotal",
        description: "Analyze files, URLs, domains and IPs for threats.",
        url: "https://www.virustotal.com/",
        logo: "https://www.google.com/s2/favicons?domain=virustotal.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/virustotal.com.ico",
        fallback: "VirusTotal",
      },
      {
        name: "AbuseIPDB",
        description: "Check IP address reputation and abuse reports.",
        url: "https://www.abuseipdb.com/",
        logo: "https://www.google.com/s2/favicons?domain=abuseipdb.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/abuseipdb.com.ico",
        fallback: "AbuseIPDB",
      },
      {
        name: "URLhaus",
        description: "Search malicious URLs associated with malware campaigns.",
        url: "https://urlhaus.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=urlhaus.abuse.ch&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/urlhaus.abuse.ch.ico",
        fallback: "URLhaus",
      },
      {
        name: "URLScan.io",
        description: "Scan and analyze suspicious URLs and web pages.",
        url: "https://urlscan.io/",
        logo: "https://www.google.com/s2/favicons?domain=urlscan.io&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/urlscan.io.ico",
        fallback: "URLScan",
      },
      {
        name: "URLVoid",
        description: "Check website reputation across multiple blocklists.",
        url: "https://www.urlvoid.com/",
        logo: "https://www.google.com/s2/favicons?domain=urlvoid.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/urlvoid.com.ico",
        fallback: "URLVoid",
      },
      {
        name: "PhishTank",
        description: "Verify and investigate suspected phishing URLs.",
        url: "https://phishtank.org/",
        logo: "https://www.google.com/s2/favicons?domain=phishtank.org&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/phishtank.org.ico",
        fallback: "PhishTank",
      },
      {
        name: "ThreatFox",
        description: "Search IOCs and malware infrastructure.",
        url: "https://threatfox.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=threatfox.abuse.ch&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/threatfox.abuse.ch.ico",
        fallback: "ThreatFox",
      },
      {
        name: "GreyNoise",
        description: "Identify internet scanners, background noise, and potentially malicious activity.",
        url: "https://viz.greynoise.io/",
        logo: "https://www.google.com/s2/favicons?domain=greynoise.io&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/greynoise.io.ico",
        fallback: "GreyNoise",
      },
      {
        name: "Cisco Talos Intelligence",
        description: "Investigate IP, domain, and threat reputation using Talos intelligence.",
        url: "https://talosintelligence.com/",
        logo: "https://www.google.com/s2/favicons?domain=talosintelligence.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/talosintelligence.com.ico",
        fallback: "Talos",
      },
    ],
  },
  {
    title: "2. Malware / File Analysis",
    tools: [
      {
        name: "MalwareBazaar",
        description: "Search malware samples and file hashes.",
        url: "https://bazaar.abuse.ch/",
        logo: "https://www.google.com/s2/favicons?domain=bazaar.abuse.ch&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/bazaar.abuse.ch.ico",
        fallback: "MalwareBazaar",
      },
      {
        name: "CrackStation",
        description: "Look up supported password hashes and investigate exposed hashes.",
        url: "https://crackstation.net/",
        logo: "https://www.google.com/s2/favicons?domain=crackstation.net&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/crackstation.net.ico",
        fallback: "CrackStation",
      },
      {
        name: "Hatching Triage",
        description: "Analyze suspicious files and URLs in a malware sandbox.",
        url: "https://tria.ge/",
        logo: "https://www.google.com/s2/favicons?domain=tria.ge&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/tria.ge.ico",
        fallback: "Triage",
      },
      {
        name: "Hybrid Analysis",
        description: "Analyze suspicious files and malware using sandbox intelligence.",
        url: "https://www.hybrid-analysis.com/",
        logo: "https://www.google.com/s2/favicons?domain=hybrid-analysis.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/hybrid-analysis.com.ico",
        fallback: "Hybrid Analysis",
      },
    ],
  },
  {
    title: "3. Network / Infrastructure Investigation",
    tools: [
      {
        name: "Censys",
        description: "Search internet-facing hosts, services, certificates, and infrastructure.",
        url: "https://search.censys.io/",
        logo: "https://www.google.com/s2/favicons?domain=censys.io&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/censys.io.ico",
        fallback: "Censys",
      },
      {
        name: "crt.sh",
        description: "Search certificate transparency records to discover domains and subdomains.",
        url: "https://crt.sh/",
        logo: "https://www.google.com/s2/favicons?domain=crt.sh&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/crt.sh.ico",
        fallback: "crt.sh",
      },
      {
        name: "DNSDumpster",
        description: "Perform DNS reconnaissance and discover domain infrastructure.",
        url: "https://dnsdumpster.com/",
        logo: "https://www.google.com/s2/favicons?domain=dnsdumpster.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/dnsdumpster.com.ico",
        fallback: "DNSDumpster",
      },
    ],
  },
  {
    title: "4. Threat Intelligence Platforms",
    tools: [
      {
        name: "AlienVault OTX",
        description: "Explore IOCs, pulses and threat intelligence.",
        url: "https://otx.alienvault.com/",
        logo: "https://www.google.com/s2/favicons?domain=otx.alienvault.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/otx.alienvault.com.ico",
        fallback: "OTX",
      },
      {
        name: "MISP",
        description: "Open-source threat intelligence sharing platform.",
        url: "https://www.misp-project.org/",
        logo: "https://www.google.com/s2/favicons?domain=misp-project.org&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/misp-project.org.ico",
        fallback: "MISP",
      },
      {
        name: "OpenCTI",
        description: "Open-source threat intelligence management platform.",
        url: "https://filigran.io/solutions/opencti/",
        logo: "https://www.google.com/s2/favicons?domain=filigran.io&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/filigran.io.ico",
        fallback: "OpenCTI",
      },
      {
        name: "MITRE ATT&CK",
        description: "Research adversary tactics, techniques and procedures.",
        url: "https://attack.mitre.org/",
        logo: "https://www.google.com/s2/favicons?domain=attack.mitre.org&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/attack.mitre.org.ico",
        fallback: "ATT&CK",
      },
    ],
  },
  {
    title: "5. OSINT / SOC Analyst Utilities",
    tools: [
      {
        name: "CyberChef",
        description: "Decode, encode, transform, and analyze suspicious data and strings.",
        url: "https://gchq.github.io/CyberChef/",
        logo: "https://www.google.com/s2/favicons?domain=gchq.github.io&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/gchq.github.io.ico",
        fallback: "CyberChef",
      },
      {
        name: "Have I Been Pwned",
        description: "Check whether an email address or domain appears in known breach data.",
        url: "https://haveibeenpwned.com/",
        logo: "https://www.google.com/s2/favicons?domain=haveibeenpwned.com&sz=128",
        logoFallback: "https://icons.duckduckgo.com/ip3/haveibeenpwned.com.ico",
        fallback: "HIBP",
      },
    ],
  },
];

const ToolLogo = ({ tool }: { tool: Tool }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [tool.logo, tool.logoFallback];

  return (
    <div className="shrink-0 w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center overflow-hidden">
      {srcIndex >= sources.length ? (
        <span className="text-[10px] font-semibold tracking-tight text-muted-foreground text-center leading-tight px-1">
          {tool.fallback}
        </span>
      ) : (
        <img
          src={sources[srcIndex]}
          alt={`${tool.name} official logo`}
          loading="lazy"
          className="w-6 h-6 object-contain"
          onError={() => setSrcIndex((i) => i + 1)}
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
