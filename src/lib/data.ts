export interface Lecture {
  id: string;
  title: string;
  type: "reading" | "lab" | "video";
  description: string;
  subtopics?: string[];
  content?: string;
  completed?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  description: string;
  type?: "lab";
  completed?: boolean;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  coverImage: string;
  lectureCount: number;
  labCount: number;
  totalHours: number;
  lectures: Lecture[];
  labs: Lab[];
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  tag: "new" | "update" | "event" | "deadline";
}

export interface Discussion {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
  module: string;
}

export const modules: Module[] = [
  {
    id: "git",
    slug: "git",
    title: "Git & Version Control",
    icon: "GitBranch",
    description: "Master version control with Git: branching strategies, workflows, rebasing, and collaboration best practices used in real DevOps teams.",
    color: "#f05032",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80",
    lectureCount: 8,
    labCount: 4,
    totalHours: 6,
    lectures: [
      { id: "git-1", title: "Introduction to Version Control", type: "reading", description: "Why version control matters, history of Git, and core concepts." },
      { id: "git-2", title: "Git Internals: Objects & Refs", type: "reading", description: "Blobs, trees, commits, and how Git stores data under the hood." },
      { id: "git-3", title: "Branching Strategies", type: "reading", description: "GitFlow, trunk-based development, and feature branching workflows." },
      { id: "git-4", title: "Rebasing vs Merging", type: "reading", description: "When to rebase, when to merge, and how to keep a clean history." },
      { id: "git-5", title: "Advanced Git Commands", type: "reading", description: "Cherry-pick, bisect, stash, reflog, and other power-user tools." },
      { id: "git-6", title: "GitHub Pull Request Workflow", type: "reading", description: "Code reviews, PR templates, and CI/CD integration with GitHub." },
      { id: "git-7", title: "Git Hooks & Automation", type: "reading", description: "Pre-commit, post-commit, and server-side hooks for automation." },
      { id: "git-8", title: "Monorepos with Git", type: "reading", description: "Managing large codebases, sparse checkout, and partial clones." },
    ],
    labs: [
      { id: "git-lab-1", title: "Setting Up a Team Repository", difficulty: "beginner", description: "Create a repo with branch protection, PR templates, and CODEOWNERS." },
      { id: "git-lab-2", title: "Resolving Complex Merge Conflicts", difficulty: "intermediate", description: "Practice resolving conflicts in a simulated team environment." },
      { id: "git-lab-3", title: "Interactive Rebase & History Cleanup", difficulty: "intermediate", description: "Squash commits, reorder history, and recover from mistakes." },
      { id: "git-lab-4", title: "Git Bisect Bug Hunt", difficulty: "advanced", description: "Use git bisect to find the commit that introduced a regression." },
    ],
  },
  {
    id: "linux",
    slug: "linux",
    title: "Linux Fundamentals",
    icon: "Terminal",
    description: "Deep dive into Linux administration: filesystem hierarchy, process management, networking, shell scripting, and system security hardening.",
    color: "#e95420",
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80",
    lectureCount: 10,
    labCount: 5,
    totalHours: 9,
    lectures: [
      { id: "linux-1", title: "Linux Filesystem Hierarchy", type: "reading", description: "Understanding /etc, /var, /usr, /opt and the FHS standard." },
      { id: "linux-2", title: "Process Management", type: "reading", description: "ps, top, htop, kill, nice, and process priorities." },
      { id: "linux-3", title: "User & Permission Management", type: "reading", description: "Users, groups, chmod, chown, ACLs, and sudo configuration." },
      { id: "linux-4", title: "Networking Fundamentals", type: "reading", description: "ip, ss, netstat, firewalld, iptables, and network troubleshooting." },
      { id: "linux-5", title: "Package Management", type: "reading", description: "apt, yum/dnf, rpm, snap, and managing software repositories." },
      { id: "linux-6", title: "Systemd & Services", type: "reading", description: "systemctl, journald, service units, and boot process." },
      { id: "linux-7", title: "Bash Scripting Essentials", type: "reading", description: "Variables, loops, functions, error handling, and best practices." },
      { id: "linux-8", title: "Log Management", type: "reading", description: "syslog, logrotate, journalctl, and centralized logging." },
      { id: "linux-9", title: "Performance Tuning", type: "reading", description: "vmstat, iostat, sar, and system performance analysis." },
      { id: "linux-10", title: "Security Hardening", type: "reading", description: "SSH hardening, SELinux/AppArmor, CIS benchmarks." },
    ],
    labs: [
      { id: "linux-lab-1", title: "Linux Environment Setup", difficulty: "beginner", description: "Configure a fresh Ubuntu server with users, SSH keys, and firewall." },
      { id: "linux-lab-2", title: "Shell Scripting: Backup System", difficulty: "intermediate", description: "Write a full backup script with logging, rotation, and error handling." },
      { id: "linux-lab-3", title: "Service Monitoring with Systemd", difficulty: "intermediate", description: "Create custom systemd services and timers for automated tasks." },
      { id: "linux-lab-4", title: "Network Troubleshooting Scenario", difficulty: "intermediate", description: "Diagnose and fix networking issues in a broken server environment." },
      { id: "linux-lab-5", title: "Security Hardening Audit", difficulty: "advanced", description: "Apply CIS Level 1 benchmarks and run Lynis security audit." },
    ],
  },
  {
    id: "networking",
    slug: "networking",
    title: "Networking",
    icon: "Network",
    description: "Understand networking from the ground up: OSI model, TCP/IP, DNS, HTTP/S, load balancing, VPNs, and cloud networking concepts.",
    color: "#0078d4",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    lectureCount: 9,
    labCount: 4,
    totalHours: 8,
    lectures: [
      { id: "net-1", title: "OSI & TCP/IP Models", type: "reading", description: "Layers, encapsulation, and how data travels across networks." },
      { id: "net-2", title: "IP Addressing & Subnetting", type: "reading", description: "IPv4, IPv6, CIDR notation, and subnet calculations." },
      { id: "net-3", title: "DNS Deep Dive", type: "reading", description: "Resolution process, record types, DNS security, and troubleshooting." },
      { id: "net-4", title: "HTTP/HTTPS & TLS", type: "reading", description: "HTTP methods, headers, status codes, TLS handshake, and certificates." },
      { id: "net-5", title: "Load Balancing Strategies", type: "reading", description: "Round robin, least connections, health checks, and sticky sessions." },
      { id: "net-6", title: "Firewalls & Network Security", type: "reading", description: "Stateful firewalls, WAF, DDoS protection, and network segmentation." },
      { id: "net-7", title: "VPNs & Tunneling", type: "reading", description: "IPSec, WireGuard, OpenVPN, and site-to-site connectivity." },
      { id: "net-8", title: "Service Mesh & mTLS", type: "reading", description: "Istio, Envoy, mutual TLS, and East-West traffic in Kubernetes." },
      { id: "net-9", title: "CDN & Edge Computing", type: "reading", description: "Content delivery, caching strategies, and edge functions." },
    ],
    labs: [
      { id: "net-lab-1", title: "Subnet Design Workshop", difficulty: "beginner", description: "Design an IP addressing scheme for a multi-tier application." },
      { id: "net-lab-2", title: "DNS Server Setup", difficulty: "intermediate", description: "Configure BIND DNS with zones, records, and DNSSEC." },
      { id: "net-lab-3", title: "nginx Load Balancer", difficulty: "intermediate", description: "Set up nginx as a reverse proxy with health checks and SSL termination." },
      { id: "net-lab-4", title: "WireGuard VPN Setup", difficulty: "advanced", description: "Deploy a peer-to-peer WireGuard VPN between cloud servers." },
    ],
  },
  {
    id: "docker",
    slug: "docker",
    title: "Docker & Containers",
    icon: "Box",
    description: "Containerize applications with Docker: image building, multi-stage builds, Docker Compose, networking, volumes, and container security.",
    color: "#2496ed",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80",
    lectureCount: 10,
    labCount: 5,
    totalHours: 10,
    lectures: [
      { id: "docker-1", title: "Container Fundamentals", type: "reading", description: "Namespaces, cgroups, and how containers differ from VMs." },
      { id: "docker-2", title: "Dockerfile Best Practices", type: "reading", description: "Layer caching, multi-stage builds, and minimal base images." },
      { id: "docker-3", title: "Docker Networking", type: "reading", description: "Bridge, host, overlay networks, and service discovery." },
      { id: "docker-4", title: "Volumes & Persistent Storage", type: "reading", description: "Named volumes, bind mounts, and storage drivers." },
      { id: "docker-5", title: "Docker Compose", type: "reading", description: "Multi-container applications, dependencies, and profiles." },
      { id: "docker-6", title: "Container Security", type: "reading", description: "Non-root users, read-only filesystems, secrets, and image scanning." },
      { id: "docker-7", title: "Registry & Image Management", type: "reading", description: "Docker Hub, private registries, image tagging, and versioning." },
      { id: "docker-8", title: "Logging & Monitoring Containers", type: "reading", description: "Log drivers, fluentd integration, and container metrics." },
      { id: "docker-9", title: "Docker Swarm Basics", type: "reading", description: "Services, stacks, replicas, and rolling updates." },
      { id: "docker-10", title: "BuildKit & Advanced Builds", type: "reading", description: "BuildKit cache mounts, secret mounts, and build contexts." },
    ],
    labs: [
      { id: "docker-lab-1", title: "Containerize a Node.js App", difficulty: "beginner", description: "Write an optimized Dockerfile and run the app in a container." },
      { id: "docker-lab-2", title: "Multi-Container App with Compose", difficulty: "intermediate", description: "Deploy a full-stack app (app + DB + cache) with Docker Compose." },
      { id: "docker-lab-3", title: "Docker Networking Lab", difficulty: "intermediate", description: "Create custom networks and connect containers with service discovery." },
      { id: "docker-lab-4", title: "Container Security Hardening", difficulty: "advanced", description: "Scan images with Trivy, apply seccomp profiles, and non-root users." },
      { id: "docker-lab-5", title: "Private Docker Registry", difficulty: "advanced", description: "Deploy Harbor registry with authentication and image scanning." },
    ],
  },
  {
    id: "kubernetes",
    slug: "kubernetes",
    title: "Kubernetes",
    icon: "Layers",
    description: "Orchestrate containers at scale: deployments, services, ingress, RBAC, Helm charts, operators, and production-grade cluster management.",
    color: "#326ce5",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    lectureCount: 14,
    labCount: 7,
    totalHours: 16,
    lectures: [
      { id: "k8s-1", title: "Kubernetes Architecture", type: "reading", description: "Control plane, nodes, etcd, API server, scheduler, and kubelet." },
      { id: "k8s-2", title: "Pods & Workloads", type: "reading", description: "Pods, Deployments, StatefulSets, DaemonSets, and Jobs." },
      { id: "k8s-3", title: "Services & Networking", type: "reading", description: "ClusterIP, NodePort, LoadBalancer, Ingress, and NetworkPolicies." },
      { id: "k8s-4", title: "Configuration & Secrets", type: "reading", description: "ConfigMaps, Secrets, environment variables, and volume mounts." },
      { id: "k8s-5", title: "Persistent Storage", type: "reading", description: "PV, PVC, StorageClasses, and CSI drivers." },
      { id: "k8s-6", title: "RBAC & Security", type: "reading", description: "Roles, ClusterRoles, ServiceAccounts, PodSecurityStandards." },
      { id: "k8s-7", title: "Resource Management", type: "reading", description: "Requests, limits, LimitRanges, ResourceQuotas, and VPA/HPA." },
      { id: "k8s-8", title: "Helm Package Manager", type: "reading", description: "Charts, values, templating, and managing releases." },
      { id: "k8s-9", title: "Ingress Controllers", type: "reading", description: "nginx Ingress, TLS termination, path routing, and annotations." },
      { id: "k8s-10", title: "Rolling Updates & Rollbacks", type: "reading", description: "Deployment strategies, canary, blue/green, and rollbacks." },
      { id: "k8s-11", title: "Cluster Autoscaling", type: "reading", description: "HPA, VPA, KEDA, and Cluster Autoscaler." },
      { id: "k8s-12", title: "Operators & CRDs", type: "reading", description: "Custom resources, controller pattern, and popular operators." },
      { id: "k8s-13", title: "GitOps with ArgoCD", type: "reading", description: "ArgoCD setup, application sync, and GitOps workflows." },
      { id: "k8s-14", title: "Cluster Hardening", type: "reading", description: "CIS benchmarks, OPA Gatekeeper, and admission controllers." },
    ],
    labs: [
      { id: "k8s-lab-1", title: "Deploy Your First App", difficulty: "beginner", description: "Deploy a containerized app with a Deployment and expose it via Service." },
      { id: "k8s-lab-2", title: "Helm Chart Development", difficulty: "intermediate", description: "Create a Helm chart for a multi-tier application." },
      { id: "k8s-lab-3", title: "Ingress & TLS Setup", difficulty: "intermediate", description: "Configure nginx Ingress with cert-manager for automated TLS." },
      { id: "k8s-lab-4", title: "RBAC Configuration", difficulty: "intermediate", description: "Set up fine-grained RBAC for a dev/ops team separation." },
      { id: "k8s-lab-5", title: "Horizontal Pod Autoscaling", difficulty: "intermediate", description: "Configure HPA with custom metrics and load test it." },
      { id: "k8s-lab-6", title: "Stateful Application: PostgreSQL", difficulty: "advanced", description: "Deploy PostgreSQL with StatefulSets, PVCs, and backup strategy." },
      { id: "k8s-lab-7", title: "GitOps with ArgoCD", difficulty: "advanced", description: "Set up a full GitOps pipeline with ArgoCD and automated sync." },
    ],
  },
  {
    id: "cicd",
    slug: "cicd",
    title: "CI/CD Pipelines",
    icon: "GitMerge",
    description: "Build robust CI/CD pipelines with GitHub Actions, GitLab CI, and Jenkins. From code commit to production deployment with zero downtime.",
    color: "#24292e",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80",
    lectureCount: 9,
    labCount: 4,
    totalHours: 9,
    lectures: [
      { id: "cicd-1", title: "CI/CD Principles & Pipelines", type: "reading", description: "Continuous integration, delivery, deployment — and why they matter." },
      { id: "cicd-2", title: "GitHub Actions Deep Dive", type: "reading", description: "Workflows, jobs, steps, runners, secrets, and reusable workflows." },
      { id: "cicd-3", title: "GitLab CI/CD", type: "reading", description: "Stages, jobs, artifacts, caches, and GitLab-specific features." },
      { id: "cicd-4", title: "Jenkins Pipelines", type: "reading", description: "Declarative vs scripted pipelines, shared libraries, and plugins." },
      { id: "cicd-5", title: "Testing in CI", type: "reading", description: "Unit, integration, E2E testing, coverage gates, and parallelization." },
      { id: "cicd-6", title: "Docker Build in CI", type: "reading", description: "Building, scanning, and pushing images in CI pipelines." },
      { id: "cicd-7", title: "Deployment Strategies", type: "reading", description: "Blue/green, canary, rolling, and feature flags in CD." },
      { id: "cicd-8", title: "Security in CI/CD (DevSecOps)", type: "reading", description: "SAST, DAST, SCA, secret scanning, and shift-left security." },
      { id: "cicd-9", title: "Pipeline Observability", type: "reading", description: "Metrics, notifications, DORA metrics, and pipeline analytics." },
    ],
    labs: [
      { id: "cicd-lab-1", title: "GitHub Actions: Build & Test", difficulty: "beginner", description: "Create a workflow that tests, builds, and pushes a Docker image." },
      { id: "cicd-lab-2", title: "Full CD Pipeline to Kubernetes", difficulty: "intermediate", description: "Complete pipeline from commit to Kubernetes deployment with rollback." },
      { id: "cicd-lab-3", title: "DevSecOps Pipeline", difficulty: "intermediate", description: "Add Trivy, Snyk, and OWASP ZAP to a GitHub Actions pipeline." },
      { id: "cicd-lab-4", title: "Self-Hosted Runners Setup", difficulty: "advanced", description: "Deploy GitHub Actions self-hosted runners on Kubernetes with KEDA." },
    ],
  },
  {
    id: "terraform",
    slug: "terraform",
    title: "Terraform & IaC",
    icon: "Code",
    description: "Infrastructure as Code with Terraform: providers, state management, modules, workspaces, and best practices for cloud infrastructure at scale.",
    color: "#7b42bc",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    lectureCount: 10,
    labCount: 5,
    totalHours: 10,
    lectures: [
      { id: "tf-1", title: "IaC Concepts & Terraform Basics", type: "reading", description: "Why IaC, Terraform vs alternatives, HCL syntax, and init/plan/apply." },
      { id: "tf-2", title: "Providers & Resources", type: "reading", description: "AWS/Azure/GCP providers, resource lifecycle, and meta-arguments." },
      { id: "tf-3", title: "Variables & Outputs", type: "reading", description: "Input variables, local values, output values, and tfvars files." },
      { id: "tf-4", title: "State Management", type: "reading", description: "Local vs remote state, S3 backends, state locking, and import." },
      { id: "tf-5", title: "Modules", type: "reading", description: "Writing reusable modules, module registry, and versioning." },
      { id: "tf-6", title: "Workspaces & Environments", type: "reading", description: "Multi-environment strategy, workspaces, and directory structure." },
      { id: "tf-7", title: "Terraform with CI/CD", type: "reading", description: "Atlantis, Terraform Cloud, and pipeline integration." },
      { id: "tf-8", title: "Testing Terraform", type: "reading", description: "Terratest, terraform validate, and policy as code with Sentinel." },
      { id: "tf-9", title: "Security Best Practices", type: "reading", description: "Least privilege, secret management, and tfsec scanning." },
      { id: "tf-10", title: "Drift Detection & Refactoring", type: "reading", description: "Detecting configuration drift and safely refactoring state." },
    ],
    labs: [
      { id: "tf-lab-1", title: "Provision AWS VPC & EC2", difficulty: "beginner", description: "Create a VPC, subnets, security groups, and EC2 instances." },
      { id: "tf-lab-2", title: "Terraform Module Library", difficulty: "intermediate", description: "Build reusable modules for VPC, EKS, and RDS." },
      { id: "tf-lab-3", title: "Remote State with S3 & DynamoDB", difficulty: "intermediate", description: "Configure remote state backend with locking and encryption." },
      { id: "tf-lab-4", title: "Kubernetes Cluster with EKS", difficulty: "advanced", description: "Provision a production-grade EKS cluster with node groups." },
      { id: "tf-lab-5", title: "Atlantis for Pull Request Automation", difficulty: "advanced", description: "Deploy Atlantis for automated plan/apply on PRs." },
    ],
  },
  {
    id: "monitoring",
    slug: "monitoring",
    title: "Monitoring & Observability",
    icon: "BarChart2",
    description: "Build full observability stacks with Prometheus, Grafana, Loki, Alloy and Mimir",
    color: "#e6522c",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    lectureCount: 16,
    labCount: 7,
    totalHours: 14,
    lectures: [
      {
        id: 'm1',
        title: 'Observability Principles',
        description: 'Monitoring vs observability · Three pillars: Metrics, Logs, Traces · SLIs and SLOs · Designing useful alerts',
        type: 'reading',
        content: `# Observability, Reliability, and Incident Management (Production-Level)

## 1. What SRE Actually Does (Real World)

After networking infrastructure is established, Site Reliability Engineering (SRE) responsibilities begin. The core focus involves ensuring systems function properly, perform efficiently, maintain reliability, detect problems early, and enable quick recovery—a practice called reliability engineering.

The distinction is straightforward: DevOps builds the system; SRE keeps it alive under stress.

## 2. Observability — Deep Explanation

Observability differs fundamentally from monitoring. While monitoring alerts you to problems, observability explains why those problems occur. The AWS and Google SRE frameworks define observability as "ability to understand system state using external outputs," which consist of three pillars:

- **Metrics**: numerical time-series data
- **Logs**: detailed event records
- **Traces**: request path tracking across services

### 2.1 Metrics (Deep)

Metrics represent numerical time-series measurements like CPU usage (70%), request rates (200/sec), and error percentages (5%). They serve critical functions: detecting anomalies, triggering alerts, tracking performance trends, and informing capacity planning decisions.

**Amazon CloudWatch** automatically collects metrics from AWS services (EC2, ALB, RDS), stores time-series data, and creates alarms. You can set conditions such as "IF CPU > 80% for 5 minutes → trigger alert." While CloudWatch offers quick setup for AWS-native monitoring, it has limitations for custom application metrics compared to specialized tools.

### 2.2 Metrics Tool (Advanced): Prometheus

Prometheus pulls metrics from applications, stores time-series data, and supports powerful queries through PromQL. SREs prefer Prometheus because it handles microservices better, supports custom metrics, and integrates seamlessly with Kubernetes.

Applications expose a \`/metrics\` endpoint that Prometheus scrapes, allowing you to query latency, error rates, and database connections. This granularity enables crucial distinctions—high latency with normal CPU indicates an application issue rather than infrastructure problems.

### 2.3 Logs (Deep)

Logs capture detailed events: user login failures, database connection errors, and API errors. The **ELK Stack** (Elasticsearch, Logstash, Kibana) provides storage, processing, and visualization capabilities.

Metrics reveal "error rate increased," while logs explain "database connection timeout." Effective logs include timestamps, service names, log levels (INFO, ERROR), and request IDs. AWS offers **CloudWatch Logs** for collecting logs from EC2 and Lambda instances.

Troubleshooting uses logs to identify root causes—"connection refused" signals database issues while "timeout" indicates network problems.

### 2.4 Tracing (Deep)

Tracing tracks requests across service boundaries in microservices architectures. A user request path might flow: User → ALB → API → Service → DB.

**AWS X-Ray** provides this tracing capability. In microservices, tracing reveals which service causes latency and where failures occur. If a request takes 3 seconds with tracing showing API (50ms), Service (100ms), DB (2.8s), the database becomes the obvious bottleneck.

## 3. SLI, SLO, SLA (Deep Understanding)

- **SLI (Service Level Indicator)**: What you measure—uptime, latency, error rate
- **SLO (Service Level Objective)**: Target measurement—99.9% uptime
- **SLA (Service Level Agreement)**: Legal commitment with compensation if breached

These frameworks ensure systems have reliability targets and measurement mechanisms.

## 4. Alerting (Real SRE Thinking)

Most teams fail at alerting by triggering noise—alerts on CPU (80%) or disk usage (70%) generate excessive false positives. Good alerts measure user impact: inability to login, API error rates exceeding 5%, or latency surpassing thresholds.

**Prometheus Alertmanager** evaluates conditions, fires alerts, and sends notifications (Slack, email). The core principle: alert on **user impact**, not infrastructure.

## 5. Incident Management (Production Flow)

Incidents represent service disruptions. The structured response follows these steps:

1. Detection through monitoring
2. Alert triggering
3. Engineer response
4. Mitigation (temporary fix)
5. Resolution (root cause fix)
6. Postmortem analysis

## 6. Postmortem (Critical SRE Practice)

After incidents, teams must determine what happened, why it happened, and prevention strategies. The fundamental rule: no blame. Focus on system failure, not people.

## 7. Error Budget (Advanced Concept)

An SLO of 99.9% allows approximately 43 minutes of downtime monthly—the error budget. This balances innovation (deploying frequently) against stability (preventing downtime).

## 8. High Availability (HA)

Systems must survive failures. AWS tools like Elastic Load Balancers and Multi-AZ deployments redirect traffic when infrastructure fails.

## 9. Auto Scaling (Reliability + Cost)

Auto Scaling Groups automatically adjust capacity responding to demand. Traffic spikes trigger instance additions; decreases remove instances.

## 10. Health Checks

Health checks determine system status. Kubernetes implements readiness probes (ready to serve) and liveness probes (alive). Without health checks, load balancers send traffic to broken applications.

## 11. Caching (Performance)

**Redis** stores frequently accessed data, reducing database load and improving response times.

## 12. Disaster Recovery

Recovery strategies include backup restoration, multi-region deployments, and active-active configurations.

## 13. Troubleshooting Mindset (MOST IMPORTANT)

When problems occur, avoid guessing. Follow systematic layers:

1. DNS resolution
2. Network connectivity
3. Load balancer health
4. Application status
5. Database accessibility

Verify each layer sequentially before moving to the next.

## Final SRE Interview Answer

As an SRE, I focus on system reliability by implementing observability using metrics, logs, and traces, defining SLOs, setting up meaningful alerts, ensuring high availability with load balancing and auto scaling, and handling incidents with structured troubleshooting and postmortems.
`,
      },
      {
        id: 'm2',
        title: 'SLO, SLA, SLI — Measuring Reliability',
        description: 'SLI indicators · SLO objectives · Error budget · SLA agreements',
        type: 'reading',
        content: `# THE MOST IMPORTANT CONCEPT: MEASURING RELIABILITY — SLO, SLA, SLI

Site Reliability Engineering applies software engineering principles to operations, focusing on automation, measurement, and designing for failure rather than manual fixes and guessing.

## Core Mindset

While traditional engineers ask "Is the system working?", SREs ask "How well is it working, how often does it fail, and how much failure is acceptable?" This shift emphasizes that reliability must be measurable.

## SLI (Service Level Indicator)

An SLI represents a real measurement of user experience through user-facing metrics like request success rate, latency, and error rate—not infrastructure metrics like CPU usage.

**Example:** If 990 out of 1000 requests succeed, the success rate SLI equals 99%.

**Key principle:** SLI must reflect USER experience. If user is unhappy, your SLI is wrong.

## SLO (Service Level Objective)

An SLO is a target you set for system performance. Instead of demanding perfection, SREs define acceptable failure limits.

**Example:** "99.9% of requests must succeed" or "95% of requests < 200ms."

## SLA (Service Level Agreement)

An SLA is a business contract based on SLOs with financial consequences. For instance: "If uptime < 99.9% → customer gets refund."

| Concept | Purpose |
|---------|---------|
| SLI | Measurement |
| SLO | Internal goal |
| SLA | External contract |

## Error Budget (Senior-Level Concept)

If your SLO is 99.9% uptime, then 0.1% failure represents your error budget—approximately 43 minutes downtime monthly.

Error budget decides:
- If budget remains → deploy
- If exhausted → stop releases

**Critical rule:** No error budget = no deployments.

## Measuring Availability

**Formula:** Availability = (Total time - downtime) / total time

**SRE levels:**
- 99% = basic
- 99.9% = production
- 99.99% = critical
- 99.999% = extreme

## Latency Measurement

Averages mislead. Use percentiles instead:
- P50 = normal performance
- P95 = slow users
- P99 = worst users

**Real SLO:** 95% of requests < 200ms

## Golden Signals (Google SRE)

Monitor these four metrics:
1. Latency
2. Traffic
3. Errors
4. Saturation

## Alerting

Bad alert: CPU > 80%

Good alert: Error rate > 5% for 5 minutes

**Rule:** Alert only when users are impacted.

## Incident Management

SRE process: Detect → Respond → Fix → Learn

Postmortems must be blameless and document: timeline, root cause, impact, fix, and prevention.

## Reliability Engineering

Design systems expecting failure with no single points of vulnerability.

Example: Instead of 1 server — ALB → multiple EC2 → DB replicas

Goal: No single point of failure.

## Scaling

- **Vertical:** bigger machine
- **Horizontal:** more machines (SREs prefer this)

## Automation

Rule: If you repeat it → automate it.

Tools: Terraform, Bash, Python

## Final Understanding

SRE is: Measure → Define → Monitor → Improve → Automate

**Interview answer:** SRE maintains system reliability through measurable objectives like SLOs, monitoring system health, managing incidents, and automating infrastructure while balancing stability with development velocity.
`,
      },
      { id: 'm3', title: 'Introduction to Prometheus', description: 'Architecture · Data model · Scraping · Push Gateway · Node Exporter', type: 'reading', content: 'Full content coming soon. Check back after Batch 4 starts June 1.' },
      { id: 'm4', title: 'PromQL — Query Language', description: 'Functions · Aggregations · Operators · Alert rules · Recording rules', type: 'reading', content: `# Prometheus & Grafana: Complete Senior DevOps/SRE Curriculum

## Chapter 1: Foundations & Philosophy

### The Observability Triad

Observability is the ability to understand the internal state of a system from its external outputs. The three pillars:

- **Metrics** — Numeric time-series data. Cheapest to store, best for dashboards and alerting. Prometheus specializes here.
- **Logs** — Timestamped records of events. High cardinality, expensive but rich in detail. (ELK, Loki)
- **Traces** — Request-level journey across distributed systems. (Jaeger, Tempo, Zipkin)

> **Senior Engineer Rule:** Metrics catch *WHAT* is broken. Logs tell you *WHY*. Traces show *WHERE*.

### Monitoring vs Observability

- **Monitoring** = watching predefined things you already know to watch.
- **Observability** = being able to ask questions you didn't know you'd need to ask.
- **Legacy monitoring** (Nagios, Zabbix): push-based, check-based, host-centric.
- **Prometheus**: pull-based, metrics-centric, service discovery-native, cloud-native first.

**Why Prometheus won:**
- Born inside SoundCloud (2012), donated to CNCF (2016)
- Second CNCF graduated project after Kubernetes
- Native integration with the cloud-native ecosystem
- PromQL is expressive and composable
- Federation and remote write enable scale-out

### The Four Golden Signals (SRE Bible)

From Google's SRE Book — the minimum you must monitor for any service:

| Signal | Description | Example PromQL |
|--------|-------------|----------------|
| **Latency** | How long requests take | \`histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\` |
| **Traffic** | How much demand (RPS) | \`rate(http_requests_total[5m])\` |
| **Errors** | Rate of failed requests | \`rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])\` |
| **Saturation** | How "full" your service is | \`1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))\` |

### RED Method & USE Method

**RED Method** (for microservices — Tom Wilkie, Grafana Labs):
- **R**ate — requests per second
- **E**rrors — error rate
- **D**uration — latency distribution

**USE Method** (for infrastructure — Brendan Gregg):
- **U**tilization — % time resource is busy
- **S**aturation — extra work queued
- **E**rrors — error events count

> Rule of thumb: Use RED for services, USE for hosts/infrastructure.

---

## Chapter 2: Prometheus Architecture

### Core Components

**Prometheus Server** — The brain. Scrapes, stores, evaluates rules.
- Scrape engine: HTTP GET /metrics on targets
- TSDB: time-series database (local disk, not distributed)
- Rule evaluator: recording & alerting rules

**Pushgateway** — For short-lived jobs (batch, crons) that can't be scraped. Push metrics here; Prometheus scrapes the gateway. *Do not use as a general intermediary.*

**Alertmanager** — Receives alerts, deduplicates, groups, routes, and silences. Routes to PagerDuty, Slack, OpsGenie, email, etc.

**Critical Exporters:**
- \`node_exporter\` → OS metrics (CPU, memory, disk, network)
- \`kube-state-metrics\` → Kubernetes object states
- \`blackbox_exporter\` → probe HTTP/DNS/ICMP externally
- \`mysqld_exporter\` / \`postgres_exporter\` → database metrics
- \`kafka_exporter\` → consumer group lag
- \`redis_exporter\` → Redis memory, hit rate, replication

### Pull vs Push Model

Prometheus **pulls** (scrapes) metrics from targets.

**Advantages of pull:**
- Prometheus controls scrape interval — prevents metric floods
- Easy to detect if a target is down (scrape fails)
- Simpler firewall rules (Prometheus initiates)

**When pull doesn't work:**
- Short-lived batch jobs → use Pushgateway
- Network segmented environments → use Grafana Agent / Agent Mode
- Massive scale (100k+ targets) → use federation or Thanos

### TSDB Internals

- **Chunks**: 2-hour blocks on disk
- **Head block**: last 2h in memory (mmap'd)
- **Compaction**: blocks merged into larger chunks over time
- **Retention config**: \`--storage.tsdb.retention.time=30d\`

> **CRITICAL — Cardinality:** High cardinality labels (user_id, request_id, email) WILL kill Prometheus. Labels must have bounded, predictable value sets. This is the #1 production issue.

### Service Discovery

Static configs are for demos. Production uses service discovery:

- \`kubernetes_sd_configs\` — pods, services, endpoints, nodes, ingresses
- \`ec2_sd_configs\` — AWS EC2 instances
- \`consul_sd_configs\` — HashiCorp Consul
- \`file_sd_configs\` — custom SD via JSON/YAML files

**relabel_configs** — Transform discovered metadata into labels BEFORE scraping.
**metric_relabel_configs** — Transform metrics AFTER scraping (drop, rename, filter).

\`\`\`yaml
# Drop high-cardinality label after scraping
metric_relabel_configs:
  - source_labels: [request_id]
    action: labeldrop
\`\`\`

---

## Chapter 3: PromQL — The Query Language

### Data Types

| Type | Description | Example |
|------|-------------|---------|
| Instant vector | Single sample per series at evaluation time | \`http_requests_total{job="api"}\` |
| Range vector | Range of samples over a time window | \`http_requests_total[5m]\` |
| Scalar | Single float | \`1.5\` |

**Label matchers:**
- \`=\` exact match, \`!=\` not equal
- \`=~\` regex match: \`{status=~"5.."}\`
- \`!~\` regex not match: \`{env!~"dev|staging"}\`

### Functions You Must Know

\`\`\`promql
# Per-second rate of a counter (use this, not instant value)
rate(http_requests_total[5m])

# p99 latency from histograms
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Total increase over a window
increase(http_requests_total[1h])

# Aggregation
sum by (job) (rate(http_requests_total[5m]))
topk(5, rate(http_requests_total[5m]))

# Will disk fill in 4 hours?
predict_linear(node_filesystem_free_bytes[1h], 4*3600) < 0

# Alert when metric is missing
absent(up{job="critical-service"})
\`\`\`

### Binary Operators & Vector Matching

\`\`\`promql
# Error ratio by method
sum by (method) (rate(http_requests_total{status=~"5.."}[5m]))
/
sum by (method) (rate(http_requests_total[5m]))

# Many-to-one matching
method_code:http_errors:rate5m / on(method) group_left method:http_requests:rate5m
\`\`\`

### Recording Rules

Pre-compute expensive queries and save as new metrics. Makes dashboards fast.

\`\`\`yaml
groups:
  - name: http_metrics
    interval: 1m
    rules:
      - record: job:http_requests:rate5m
        expr: sum by (job) (rate(http_requests_total[5m]))

      - record: job:http_error_rate:ratio5m
        expr: |
          sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum by (job) (rate(http_requests_total[5m]))
\`\`\`

**Naming convention:** \`level:metric:operation\` (e.g., \`job:http_requests:rate5m\`)

---

## Chapter 4: Alerting & Alertmanager

### Writing Effective Alerting Rules

\`\`\`yaml
groups:
  - name: api_alerts
    rules:
      - alert: HighErrorRate
        expr: job:http_error_rate:ratio5m > 0.05
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "High error rate on {{ $labels.job }}"
          description: "Error rate is {{ $value | humanizePercentage }} for 5 minutes."
          runbook_url: "https://wiki.company.com/runbooks/high-error-rate"
          dashboard_url: "https://grafana.company.com/d/api-overview"
\`\`\`

- \`for:\` — Must be pending for this duration before firing (reduces flapping)
- \`labels\` — Used for routing in Alertmanager
- \`annotations\` — Human-readable context; NOT used for routing
- **Alert states:** inactive → pending → firing

### Alertmanager Configuration

\`\`\`yaml
route:
  receiver: 'slack-general'
  group_by: ['alertname', 'job']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h
  routes:
    - match:
        severity: critical
      receiver: pagerduty-oncall

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['job', 'instance']
\`\`\`

### SLO-Based Alerting — Multi-Window Multi-Burn-Rate

This is **senior-level alerting**. Forget simple threshold alerts.

- **SLO** — Service Level Objective. E.g., 99.9% of requests succeed over 30 days.
- **Error budget** — 0.1% of 30 days = 43.8 minutes allowed.
- **Burn rate** — How fast you're consuming error budget. Rate 1 = exactly on budget.

| Window | Burn Rate | Alert Type |
|--------|-----------|------------|
| 1h + 5m | 14x | Critical — page immediately |
| 6h + 30m | 6x | Critical — page |
| 1d + 2h | 3x | Warning — ticket |
| 3d + 6h | 1x | Info — FYI |

\`\`\`promql
# 14x burn rate on a 0.1% error budget
(
  rate(http_requests_total{status=~"5.."}[1h])
  /
  rate(http_requests_total[1h])
) > 14 * 0.001
\`\`\`

> Tools: **Sloth**, **Pyrra**, **OpenSLO**. Every serious SRE team uses SLO-based alerting.

### Deadman's Switch Pattern

Alert when a metric STOPS being reported:

\`\`\`promql
absent(batch_job_last_success_timestamp)
or
time() - batch_job_last_success_timestamp > 3600
\`\`\`

---

## Chapter 5: Scaling Prometheus

### Federation

Single Prometheus handles ~1M samples/sec, ~10M active series. Beyond that:

\`\`\`yaml
scrape_configs:
  - job_name: 'federate'
    honor_labels: true
    metrics_path: '/federate'
    params:
      match[]:
        - 'job:http_requests:rate5m'
    static_configs:
      - targets:
          - 'prometheus-cluster1:9090'
          - 'prometheus-cluster2:9090'
\`\`\`

> Only federate aggregated **recording rules**, not raw metrics.

### Thanos Architecture

| Component | Purpose |
|-----------|---------|
| **Sidecar** | Runs next to Prometheus; uploads 2h blocks to S3/GCS/Azure |
| **Store Gateway** | Serves data from object storage |
| **Querier** | Merges + deduplicates results from all sources |
| **Compactor** | Compacts, downsamples, enforces retention |
| **Ruler** | Evaluates rules against Thanos data |
| **Receive** | Remote write ingestion endpoint |

**Alternatives:** Grafana Mimir (recommended), Cortex, VictoriaMetrics

### Prometheus Agent Mode

Lightweight scraper — no local storage, no PromQL. Perfect for edge environments.

\`\`\`bash
prometheus --enable-feature=agent
\`\`\`

\`\`\`yaml
remote_write:
  - url: "https://mimir.company.com/api/v1/push"
    queue_config:
      max_shards: 30
      max_samples_per_send: 2000
    write_relabel_configs:
      - source_labels: [__name__]
        regex: "unnecessary_metric_.*"
        action: drop
\`\`\`

### kube-prometheus-stack (Kubernetes)

\`\`\`bash
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack
\`\`\`

Includes: Prometheus Operator, Prometheus HA pair, Alertmanager HA, Grafana, node_exporter, kube-state-metrics, pre-built alerting rules.

**Prometheus Operator CRDs:**
- \`ServiceMonitor\` — Auto-discover services via label selectors
- \`PodMonitor\` — Scrape pods directly
- \`PrometheusRule\` — Rules as Kubernetes objects
- \`AlertmanagerConfig\` — Routing as Kubernetes objects

---

## Chapter 6: Exporters & Instrumentation

### The 4 Metric Types

\`\`\`python
from prometheus_client import Counter, Gauge, Histogram, Summary

# Counter — only goes up (requests, errors, bytes)
requests_total = Counter('http_requests_total', 'Total requests', ['method', 'status'])
requests_total.labels(method='GET', status='200').inc()

# Gauge — can go up or down (queue size, active connections)
queue_size = Gauge('queue_size', 'Queue depth', ['queue_name'])
queue_size.labels(queue_name='jobs').set(42)

# Histogram — latency, request size (enables percentiles)
request_latency = Histogram('request_duration_seconds', 'Latency',
                            ['endpoint'],
                            buckets=[.005, .01, .025, .05, .1, .25, .5, 1])
with request_latency.labels(endpoint='/api').time():
    do_work()
\`\`\`

> **Histogram vs Summary:** Prefer Histogram in distributed systems. Histograms can be aggregated across instances; Summaries cannot.

### TLS Certificate Expiry Alert

\`\`\`promql
# Alert 14 days before cert expires
probe_ssl_earliest_cert_expiry - time() < 86400 * 14
\`\`\`

---

## Chapter 7 & 8: Grafana — Foundations to Advanced

### Panel Types Reference

| Panel | Best For |
|-------|----------|
| Time series | Any metric over time (default choice) |
| Stat | Single current value — KPIs, NOC screens |
| Gauge | Utilization % (CPU, memory, disk) |
| Heatmap | Latency distribution over time |
| Table | Top-N, alert states, comparison tables |
| Logs | Log lines alongside metrics (Loki) |
| Node Graph | Service topology / service map |

### 3-Tier Dashboard Hierarchy

| Tier | Audience | Content |
|------|----------|---------|
| **Tier 1: Fleet Overview** | Managers, NOC | All services status, global golden signals |
| **Tier 2: Service Detail** | Engineers | Full 4 golden signals, resources, queues |
| **Tier 3: Debugging** | Incident response | Detailed metrics, logs, traces, ad-hoc |

### Dashboard as Code

\`\`\`hcl
resource "grafana_dashboard" "api_overview" {
  config_json = file("dashboards/api-overview.json")
  folder      = grafana_folder.production.id
}
\`\`\`

\`\`\`yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
    editable: false
\`\`\`

### The LGTM Stack

| Letter | Component | Purpose |
|--------|-----------|---------|
| **L** | Loki | Log aggregation. LogQL. Promtail agent. |
| **G** | Grafana | Visualization for the entire stack |
| **T** | Tempo | Distributed tracing. OpenTelemetry compatible. |
| **M** | Mimir | Horizontally scalable Prometheus. Multi-tenant. |

> **OpenTelemetry (OTel)** is the vendor-neutral standard for instrumentation — one SDK for traces, metrics, and logs. Senior engineers must know OTel.

---

## Chapter 9: Production Operations

### Capacity Planning

| Samples/sec | RAM (head block) | Notes |
|-------------|-----------------|-------|
| 100k | ~1 GB | Small deployment |
| 500k | ~5 GB | Medium deployment |
| 1M | ~10 GB | Large — consider sharding |
| 10M+ | 100+ GB | Use Thanos/Mimir sharding |

\`\`\`promql
# Detect cardinality explosion — top 10 metrics by series count
topk(10, count by (__name__) ({__name__=~".+"}))
\`\`\`

### Incident Response — 10-Step Flow

1. Alert triggers → Alertmanager routes to PagerDuty/Slack
2. Acknowledge → stops repeat notifications
3. Open Grafana → navigate to alert's dashboard link
4. Identify timeframe → when did it start? Correlate with deployments?
5. Check golden signals → which of the 4 is affected?
6. Drill down → use Explore for ad-hoc PromQL queries
7. Correlate → check logs in Loki, traces in Tempo
8. Mitigate → rollback, scale, circuit break, redirect traffic
9. Resolve → silence alert if still noisy after fix
10. Post-mortem → timeline, root cause, action items

---

## Chapter 10: Career Prep — Interview Topics

### PromQL Questions You Will Be Asked

- Explain the difference between \`rate()\` and \`irate()\`
- How does \`histogram_quantile()\` work? What are bucket boundaries?
- Write PromQL for p99 latency across all instances of a service
- What is vector matching? When would you use \`group_left\`?
- How do recording rules improve dashboard performance?

### Architecture Questions

- Why does Prometheus use a pull model? What are the tradeoffs?
- How would you handle 10M active time series?
- Explain Thanos architecture. How does deduplication work?
- What is cardinality and why does it matter?
- How do you do HA for Prometheus? For Alertmanager?

### Real-World War Stories

**The Cardinality Bomb:** Developer adds \`user_id\` as a label. 1M users = 1M new series. Prometheus OOMs. Solution: cardinality limits, label governance, pre-deploy PromQL review.

**The Counter Reset Problem:** Pod restarts → counter resets. \`rate()\` handles resets automatically — always use \`rate()\` on counters, never raw instant values.

**The Pushgateway Anti-Pattern:** Stale metrics persist forever in Pushgateway. Solution: add last-push timestamp metric, set up deletion via admin API.

**The Alert Deduplication Failure:** Two HA Prometheus fire the same alert, both page. Solution: Alertmanager cluster with gossip deduplication.

### 90-Day Learning Roadmap

**Days 1–15:** Core Prometheus — install locally, query node metrics, write alerting rules, set up Slack integration.

**Days 16–30:** PromQL mastery — complete PromLabs PromQL Quiz, write histogram queries, instrument a Python/Go app with all 4 metric types.

**Days 31–50:** Kubernetes integration — deploy kube-prometheus-stack, write ServiceMonitors and PrometheusRules, explore kube-state-metrics.

**Days 51–70:** Grafana deep dive — build 3-tier dashboard hierarchy, dashboard-as-code with Terraform, set up SSO, explore Loki.

**Days 71–90:** Scale & production — deploy Thanos, implement SLO-based alerting with Sloth, practice incident response, build a public GitHub portfolio.
` },
      { id: 'm5', title: 'Alertmanager', description: 'Routes · Receivers · Slack integration · PagerDuty · Silencing', type: 'reading', content: `# SRE Monitoring Lab 1

## Install Node Exporter + Connect Prometheus + Build Grafana Dashboard on AWS EC2

This is your FIRST real observability/SRE production-style lab.

You already have:

- Prometheus
- Grafana

installed on one Ubuntu EC2 machine.

Now you will:

1. Install Node Exporter
2. Configure Prometheus scraping
3. Connect Grafana
4. Import production dashboard
5. Generate load
6. Analyze metrics
7. Troubleshoot failures like real SRE engineers

---

## WHAT SRE ENGINEERS MUST UNDERSTAND FIRST

### What Is Monitoring?

Monitoring means watching infrastructure and applications continuously.

Example:

- Is CPU high?
- Is memory full?
- Is disk almost full?
- Is network overloaded?
- Is server healthy?
- Is service down?

### What Is Observability?

Observability means understanding WHY something failed.

SRE engineers use:

| Tool | Purpose |
|------|---------|
| Metrics | Numbers over time |
| Logs | Events/messages |
| Traces | Request flow |
| Dashboards | Visualization |
| Alerts | Notifications |

---

## HOW THIS LAB WORKS

\`\`\`
Node Exporter
↓
Prometheus scrapes metrics
↓
Prometheus stores metrics
↓
Grafana visualizes metrics
\`\`\`

---

## WHAT IS NODE EXPORTER?

Node Exporter is a Linux metrics collector.

It exposes metrics on PORT 9100.

Example metrics:

- CPU usage
- Memory usage
- Disk usage
- Filesystem
- Processes
- Load average
- Network traffic

---

## WHAT SRE ENGINEERS MUST KNOW

### Prometheus is PULL based

Meaning: "Prometheus goes and asks for metrics."

NOT: Server pushes metrics.

Prometheus periodically scrapes:

\`\`\`
http://target:9100/metrics
\`\`\`

---

## LAB ARCHITECTURE

\`\`\`
EC2 Ubuntu Instance
│
├── Prometheus :9090
├── Grafana :3000
└── Node Exporter :9100
\`\`\`

---

## STEP 1 — LOGIN TO AWS

Go to: AWS Console (https://console.aws.amazon.com)

---

## STEP 2 — OPEN EC2

Click: Services → EC2

---

## STEP 3 — FIND YOUR INSTANCE

Click: Instances. Find your Ubuntu server.

| Column | Example |
|--------|---------|
| Instance State | Running |
| Public IPv4 | 3.xx.xx.xx |
| Name | monitoring-server |

---

## STEP 4 — CONNECT TO EC2

Select instance → Click: Connect → Choose: EC2 Instance Connect → Click: Connect

Terminal opens.

---

## STEP 5 — VERIFY PROMETHEUS

\`\`\`bash
sudo systemctl status prometheus
\`\`\`

You should see: \`active (running)\`

---

## STEP 6 — VERIFY GRAFANA

\`\`\`bash
sudo systemctl status grafana-server
\`\`\`

You should see: \`active (running)\`

---

## STEP 7 — INSTALL NODE EXPORTER

\`\`\`bash
cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.9.1/node_exporter-1.9.1.linux-amd64.tar.gz
\`\`\`

| Part | Meaning |
|------|---------|
| wget | download file |
| tar.gz | compressed archive |
| linux-amd64 | Linux 64-bit version |

---

## STEP 8 — EXTRACT FILE

\`\`\`bash
tar -xvf node_exporter-1.9.1.linux-amd64.tar.gz
\`\`\`

---

## STEP 9 — MOVE BINARY

\`\`\`bash
sudo mv node_exporter-1.9.1.linux-amd64/node_exporter /usr/local/bin/
\`\`\`

---

## STEP 10 — CREATE SERVICE USER

\`\`\`bash
sudo useradd -rs /bin/false node_exporter
\`\`\`

SRE engineers NEVER run services as root unless required. Security best practice: "Least privilege."

---

## STEP 11 — CREATE SYSTEMD SERVICE

\`\`\`bash
sudo nano /etc/systemd/system/node_exporter.service
\`\`\`

Paste:

\`\`\`ini
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
\`\`\`

Press CTRL+X → Y → ENTER

---

## STEP 12 — START NODE EXPORTER

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
\`\`\`

---

## STEP 13 — VERIFY SERVICE

\`\`\`bash
sudo systemctl status node_exporter
\`\`\`

You should see: \`active (running)\`

---

## STEP 14 — CHECK PORT

\`\`\`bash
ss -tulnp | grep 9100
\`\`\`

You should see: \`LISTEN\`

| Command | Purpose |
|---------|---------|
| ss | socket statistics |
| -t | TCP |
| -u | UDP |
| -l | listening |
| -n | numeric |
| -p | process |

---

## STEP 15 — OPEN SECURITY GROUP IN AWS

EC2 → Instances → Select instance → Security → Edit inbound rules

Add:

| Type | Port | Source |
|------|------|--------|
| Custom TCP | 3000 | 0.0.0.0/0 |
| Custom TCP | 9090 | 0.0.0.0/0 |
| Custom TCP | 9100 | 0.0.0.0/0 |

Click: Save rules

| Port | Service |
|------|---------|
| 3000 | Grafana |
| 9090 | Prometheus |
| 9100 | Node Exporter |

---

## STEP 16 — TEST NODE EXPORTER

Browser: \`http://YOUR_PUBLIC_IP:9100/metrics\`

You should see THOUSANDS of metrics. Format:

\`\`\`
metric_name value
\`\`\`

Example: \`node_cpu_seconds_total\`, \`node_memory_MemAvailable_bytes\`

---

## STEP 17 — CONFIGURE PROMETHEUS

\`\`\`bash
sudo nano /etc/prometheus/prometheus.yml
\`\`\`

Find \`scrape_configs:\` and add:

\`\`\`yaml
- job_name: "node_exporter"
  static_configs:
  - targets: ["localhost:9100"]
\`\`\`

\`\`\`bash
sudo systemctl restart prometheus
sudo systemctl status prometheus
\`\`\`

---

## STEP 18 — CHECK TARGETS

Browser: \`http://YOUR_PUBLIC_IP:9090/targets\`

You should see: \`node_exporter UP\`

If DOWN — possible reasons:

| Problem | Meaning |
|---------|---------|
| Wrong IP | Incorrect target |
| Firewall | Port blocked |
| SG | AWS blocked |
| Service stopped | Exporter down |
| Wrong port | Misconfiguration |

---

## STEP 19 — OPEN GRAFANA AND ADD DATASOURCE

Browser: \`http://YOUR_PUBLIC_IP:3000\` (login: admin / admin)

Connections → Data Sources → Add data source → Prometheus

URL: \`http://localhost:9090\`

Click: Save & Test → You should see: \`Data source is working\`

---

## STEP 20 — IMPORT DASHBOARD

Dashboards → Import → Dashboard ID: \`1860\` → Load → Choose datasource → Import

You will now see real-time: CPU · Memory · Disk · Filesystem · Network · Load Average · Processes

---

## STEP 21 — GENERATE CPU LOAD

\`\`\`bash
sudo apt install stress -y
stress --cpu 2 --timeout 60
\`\`\`

Go to Grafana dashboard. Watch graphs move LIVE. THIS is real observability.

---

## STEP 22 — BREAK THINGS (SRE TROUBLESHOOTING)

\`\`\`bash
sudo systemctl stop node_exporter
\`\`\`

Go to \`http://YOUR_PUBLIC_IP:9090/targets\` — you should see: \`DOWN\`

### Troubleshooting Flow

\`\`\`bash
sudo systemctl status node_exporter   # Check service
ss -tulnp | grep 9100                 # Check listening port
curl localhost:9100/metrics           # Check metrics endpoint
journalctl -u prometheus -f           # Check Prometheus logs
\`\`\`

---

## WHAT SRE ENGINEERS MUST MEMORIZE

| Tool | Purpose |
|------|---------|
| systemctl | Service management |
| ss | Check ports |
| curl | Test endpoint |
| journalctl | Logs |
| top | CPU |
| free -m | Memory |
| df -h | Disk |

---

## KEY INTERVIEW QUESTIONS

**What is Node Exporter?** Exports Linux system metrics for Prometheus.

**Why use exporters?** Prometheus cannot directly understand Linux metrics.

**Why is Prometheus pull based?** Prometheus periodically scrapes targets. Advantages: centralized, easier troubleshooting, better reliability, service discovery support.

**Difference Between Grafana and Prometheus?**

| Tool | Purpose |
|------|---------|
| Prometheus | stores metrics |
| Grafana | visualizes metrics |

**What is a target?** A monitored endpoint. Example: \`localhost:9100\`
` },
      { id: 'm6', title: 'What is Grafana?', description: 'Installation · Dashboard best practices · Variables · Dynamic dashboards', type: 'reading', content: `Prometheus and Grafana are the backbone of modern observability stacks. Whether you're targeting a Senior DevOps or SRE role, this guide covers everything from fundamentals to production-grade operations — written for engineers aiming at 6+ years of experience level.

---

## Chapter 1: Foundations & Philosophy

### The Observability Triad

Observability is the ability to understand the internal state of a system from its external outputs. The three pillars:

- **Metrics** — Numeric time-series data. Cheapest to store, best for dashboards and alerting. Prometheus specializes here.
- **Logs** — Timestamped records of events. High cardinality, expensive but rich in detail. (ELK, Loki)
- **Traces** — Request-level journey across distributed systems. (Jaeger, Tempo, Zipkin)

> **Senior Engineer Rule:** Metrics catch *WHAT* is broken. Logs tell you *WHY*. Traces show *WHERE*.

### Monitoring vs Observability

- **Monitoring** = watching predefined things you already know to watch.
- **Observability** = being able to ask questions you didn't know you'd need to ask.
- **Legacy monitoring** (Nagios, Zabbix): push-based, check-based, host-centric.
- **Prometheus**: pull-based, metrics-centric, service discovery-native, cloud-native first.

**Why Prometheus won:**
- Born inside SoundCloud (2012), donated to CNCF (2016)
- Second CNCF graduated project after Kubernetes
- Native integration with the cloud-native ecosystem
- PromQL is expressive and composable
- Federation and remote write enable scale-out

### The Four Golden Signals (SRE Bible)

From Google's SRE Book — the minimum you must monitor for any service:

| Signal | Description | Example PromQL |
|--------|-------------|----------------|
| **Latency** | How long requests take | \`histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\` |
| **Traffic** | How much demand (RPS) | \`rate(http_requests_total[5m])\` |
| **Errors** | Rate of failed requests | \`rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])\` |
| **Saturation** | How "full" your service is | \`1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))\` |

### RED Method & USE Method

**RED Method** (for microservices — Tom Wilkie, Grafana Labs):
- **R**ate — requests per second
- **E**rrors — error rate
- **D**uration — latency distribution

**USE Method** (for infrastructure — Brendan Gregg):
- **U**tilization — % time resource is busy
- **S**aturation — extra work queued
- **E**rrors — error events count

> Rule of thumb: Use RED for services, USE for hosts/infrastructure.

---

## Chapter 2: Prometheus Architecture

### Core Components

**Prometheus Server** — The brain. Scrapes, stores, evaluates rules.
- Scrape engine: HTTP GET /metrics on targets
- TSDB: time-series database (local disk, not distributed)
- Rule evaluator: recording & alerting rules

**Pushgateway** — For short-lived jobs (batch, crons) that can't be scraped. Push metrics here; Prometheus scrapes the gateway. *Do not use as a general intermediary.*

**Alertmanager** — Receives alerts, deduplicates, groups, routes, and silences. Routes to PagerDuty, Slack, OpsGenie, email, etc.

**Critical Exporters:**
- \`node_exporter\` → OS metrics (CPU, memory, disk, network)
- \`kube-state-metrics\` → Kubernetes object states
- \`blackbox_exporter\` → probe HTTP/DNS/ICMP externally
- \`mysqld_exporter\` / \`postgres_exporter\` → database metrics
- \`kafka_exporter\` → consumer group lag
- \`redis_exporter\` → Redis memory, hit rate, replication

### Pull vs Push Model

Prometheus **pulls** (scrapes) metrics from targets.

**Advantages of pull:**
- Prometheus controls scrape interval — prevents metric floods
- Easy to detect if a target is down (scrape fails)
- Simpler firewall rules (Prometheus initiates)

**When pull doesn't work:**
- Short-lived batch jobs → use Pushgateway
- Network segmented environments → use Grafana Agent / Agent Mode
- Massive scale (100k+ targets) → use federation or Thanos

### TSDB Internals

- **Chunks**: 2-hour blocks on disk
- **Head block**: last 2h in memory (mmap'd)
- **Compaction**: blocks merged into larger chunks over time
- **Retention config**: \`--storage.tsdb.retention.time=30d\`

> **CRITICAL — Cardinality:** "High cardinality labels (user_id, request_id, email) WILL kill Prometheus. Labels must have bounded, predictable value sets. This is the #1 production issue."

### Service Discovery

Static configs are for demos. Production uses service discovery:

- \`kubernetes_sd_configs\` — pods, services, endpoints, nodes, ingresses
- \`ec2_sd_configs\` — AWS EC2 instances
- \`consul_sd_configs\` — HashiCorp Consul
- \`file_sd_configs\` — custom SD via JSON/YAML files

**relabel_configs** — Transform discovered metadata into labels BEFORE scraping.
**metric_relabel_configs** — Transform metrics AFTER scraping (drop, rename, filter).

\`\`\`yaml
# Drop high-cardinality label after scraping
metric_relabel_configs:
  - source_labels: [request_id]
    action: labeldrop
\`\`\`

---

## Chapter 3: PromQL — The Query Language

### Data Types

| Type | Description | Example |
|------|-------------|---------|
| Instant vector | Single sample per series at evaluation time | \`http_requests_total{job="api"}\` |
| Range vector | Range of samples over a time window | \`http_requests_total[5m]\` |
| Scalar | Single float | \`1.5\` |

**Label matchers:**
- \`=\` exact match, \`!=\` not equal
- \`=~\` regex match: \`{status=~"5.."}\`
- \`!~\` regex not match: \`{env!~"dev|staging"}\`

### Functions You Must Know

\`\`\`promql
# Per-second rate of a counter (use this, not instant value)
rate(http_requests_total[5m])

# p99 latency from histograms
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Total increase over a window
increase(http_requests_total[1h])

# Aggregation
sum by (job) (rate(http_requests_total[5m]))
topk(5, rate(http_requests_total[5m]))

# Will disk fill in 4 hours?
predict_linear(node_filesystem_free_bytes[1h], 4*3600) < 0

# Alert when metric is missing
absent(up{job="critical-service"})
\`\`\`

### Binary Operators & Vector Matching

\`\`\`promql
# Error ratio by method
sum by (method) (rate(http_requests_total{status=~"5.."} [5m]))
/
sum by (method) (rate(http_requests_total[5m]))

# Many-to-one matching
method_code:http_errors:rate5m / on(method) group_left method:http_requests:rate5m
\`\`\`

### Recording Rules

Pre-compute expensive queries and save as new metrics. Makes dashboards fast.

\`\`\`yaml
groups:
  - name: http_metrics
    interval: 1m
    rules:
      - record: job:http_requests:rate5m
        expr: sum by (job) (rate(http_requests_total[5m]))

      - record: job:http_error_rate:ratio5m
        expr: |
          sum by (job) (rate(http_requests_total{status=~"5.."} [5m]))
          /
          sum by (job) (rate(http_requests_total[5m]))
\`\`\`

**Naming convention:** \`level:metric:operation\` (e.g., \`job:http_requests:rate5m\`)

---

## Chapter 4: Alerting & Alertmanager

### Writing Effective Alerting Rules

\`\`\`yaml
groups:
  - name: api_alerts
    rules:
      - alert: HighErrorRate
        expr: job:http_error_rate:ratio5m > 0.05
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "High error rate on {{ $labels.job }}"
          description: "Error rate is {{ $value | humanizePercentage }} for 5 minutes."
          runbook_url: "https://wiki.company.com/runbooks/high-error-rate"
          dashboard_url: "https://grafana.company.com/d/api-overview"
\`\`\`

- \`for:\` — Must be pending for this duration before firing (reduces flapping)
- \`labels\` — Used for routing in Alertmanager
- \`annotations\` — Human-readable context; NOT used for routing
- **Alert states:** inactive → pending → firing

### Alertmanager Configuration

\`\`\`yaml
route:
  receiver: 'slack-general'
  group_by: ['alertname', 'job']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h
  routes:
    - match:
        severity: critical
      receiver: pagerduty-oncall

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['job', 'instance']
\`\`\`

### SLO-Based Alerting — Multi-Window Multi-Burn-Rate

This is **senior-level alerting**. Forget simple threshold alerts.

- **SLO** — Service Level Objective. E.g., 99.9% of requests succeed over 30 days.
- **Error budget** — 0.1% of 30 days = 43.8 minutes allowed.
- **Burn rate** — How fast you're consuming error budget. Rate 1 = exactly on budget.

| Window | Burn Rate | Alert Type |
|--------|-----------|------------|
| 1h + 5m | 14x | Critical — page immediately |
| 6h + 30m | 6x | Critical — page |
| 1d + 2h | 3x | Warning — ticket |
| 3d + 6h | 1x | Info — FYI |

\`\`\`promql
# 14x burn rate on a 0.1% error budget
(
  rate(http_requests_total{status=~"5.."} [1h])
  /
  rate(http_requests_total[1h])
) > 14 * 0.001
\`\`\`

> Tools: **Sloth**, **Pyrra**, **OpenSLO**. Every serious SRE team uses SLO-based alerting. Know this cold.

### Deadman's Switch Pattern

Alert when a metric STOPS being reported:

\`\`\`promql
absent(batch_job_last_success_timestamp)
or
time() - batch_job_last_success_timestamp > 3600
\`\`\`

---

## Chapter 5: Scaling Prometheus

### Federation

Single Prometheus handles ~1M samples/sec, ~10M active series. Beyond that:

\`\`\`yaml
scrape_configs:
  - job_name: 'federate'
    honor_labels: true
    metrics_path: '/federate'
    params:
      match[]:
        - 'job:http_requests:rate5m'
    static_configs:
      - targets:
          - 'prometheus-cluster1:9090'
          - 'prometheus-cluster2:9090'
\`\`\`

> Only federate aggregated **recording rules**, not raw metrics.

### Thanos Architecture

Thanos extends Prometheus with global query view and long-term storage.

| Component | Purpose |
|-----------|---------|
| **Sidecar** | Runs next to Prometheus; uploads 2h blocks to S3/GCS/Azure |
| **Store Gateway** | Serves data from object storage |
| **Querier** | Merges + deduplicates results from all sources |
| **Compactor** | Compacts, downsamples, enforces retention |
| **Ruler** | Evaluates rules against Thanos data |
| **Receive** | Remote write ingestion endpoint |

**Alternatives:** Grafana Mimir (recommended), Cortex, VictoriaMetrics

### Prometheus Agent Mode

Lightweight scraper — no local storage, no PromQL. Perfect for edge environments.

\`\`\`bash
prometheus --enable-feature=agent
\`\`\`

\`\`\`yaml
remote_write:
  - url: "https://mimir.company.com/api/v1/push"
    queue_config:
      max_shards: 30
      max_samples_per_send: 2000
    write_relabel_configs:
      - source_labels: [__name__]
        regex: "unnecessary_metric_.*"
        action: drop
\`\`\`

### kube-prometheus-stack (Kubernetes)

\`\`\`bash
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack
\`\`\`

Includes: Prometheus Operator, Prometheus HA pair, Alertmanager HA, Grafana, node_exporter, kube-state-metrics, pre-built alerting rules.

**Prometheus Operator CRDs:**
- \`ServiceMonitor\` — Auto-discover services via label selectors
- \`PodMonitor\` — Scrape pods directly
- \`PrometheusRule\` — Rules as Kubernetes objects
- \`AlertmanagerConfig\` — Routing as Kubernetes objects

---

## Chapter 6: Exporters & Instrumentation

### The 4 Metric Types

\`\`\`python
from prometheus_client import Counter, Gauge, Histogram, Summary

# Counter — only goes up (requests, errors, bytes)
requests_total = Counter('http_requests_total', 'Total requests',
                         ['method', 'status'])
requests_total.labels(method='GET', status='200').inc()

# Gauge — can go up or down (queue size, active connections)
queue_size = Gauge('queue_size', 'Queue depth', ['queue_name'])
queue_size.labels(queue_name='jobs').set(42)

# Histogram — latency, request size (enables percentiles)
request_latency = Histogram('request_duration_seconds', 'Latency',
                            ['endpoint'],
                            buckets=[.005, .01, .025, .05, .1, .25, .5, 1])
with request_latency.labels(endpoint='/api').time():
    do_work()
\`\`\`

> **Histogram vs Summary:** Prefer Histogram in distributed systems. Histograms can be aggregated across instances; Summaries cannot.

### TLS Certificate Expiry Alert

\`\`\`promql
# Alert 14 days before cert expires
probe_ssl_earliest_cert_expiry - time() < 86400 * 14
\`\`\`

Never let a cert expire in production. Add this to every HTTPS endpoint.

---

## Chapter 7 & 8: Grafana — Foundations to Advanced

### Panel Types Reference

| Panel | Best For |
|-------|----------|
| Time series | Any metric over time (default choice) |
| Stat | Single current value — KPIs, NOC screens |
| Gauge | Utilization % (CPU, memory, disk) |
| Heatmap | Latency distribution over time |
| Table | Top-N, alert states, comparison tables |
| Logs | Log lines alongside metrics (Loki) |
| Node Graph | Service topology / service map |

### 3-Tier Dashboard Hierarchy

| Tier | Audience | Content |
|------|----------|---------|
| **Tier 1: Fleet Overview** | Managers, NOC | All services status, global golden signals |
| **Tier 2: Service Detail** | Engineers | Full 4 golden signals, resources, queues |
| **Tier 3: Debugging** | Incident response | Detailed metrics, logs, traces, ad-hoc |

### Dashboard as Code

\`\`\`hcl
# Terraform
resource "grafana_dashboard" "api_overview" {
  config_json = file("dashboards/api-overview.json")
  folder      = grafana_folder.production.id
}
\`\`\`

\`\`\`yaml
# Grafana Provisioning
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
    editable: false
\`\`\`

### The LGTM Stack

| Letter | Component | Purpose |
|--------|-----------|---------|
| **L** | Loki | Log aggregation. LogQL. Promtail agent. |
| **G** | Grafana | Visualization for the entire stack |
| **T** | Tempo | Distributed tracing. OpenTelemetry compatible. |
| **M** | Mimir | Horizontally scalable Prometheus. Multi-tenant. |

> **OpenTelemetry (OTel)** is the vendor-neutral standard for instrumentation — one SDK for traces, metrics, and logs. Senior engineers must know OTel. It's replacing vendor-specific SDKs.

---

## Chapter 9: Production Operations

### Security Hardening

\`\`\`yaml
# Prometheus web.yml — TLS + Basic Auth
tls_server_config:
  cert_file: /etc/prometheus/certs/tls.crt
  key_file: /etc/prometheus/certs/tls.key
basic_auth_users:
  prometheus: $2b$12$hashed_password_bcrypt
\`\`\`

**Grafana security checklist:**
- SSO via OIDC/SAML (Google, Okta, Azure AD)
- RBAC: Viewer, Editor, Admin roles per folder
- Service accounts for API automation
- Audit log for compliance
- Network policies to restrict access

### Capacity Planning

| Samples/sec | RAM (head block) | Notes |
|-------------|-----------------|-------|
| 100k | ~1 GB | Small deployment |
| 500k | ~5 GB | Medium deployment |
| 1M | ~10 GB | Large — consider sharding |
| 10M+ | 100+ GB | Use Thanos/Mimir sharding |

\`\`\`promql
# Detect cardinality explosion — top 10 metrics by series count
topk(10, count by (__name__) ({__name__=~".+"}))
\`\`\`

### HA & Disaster Recovery

Run 2 identical Prometheus instances + Thanos Sidecar. Querier deduplicates. No data loss if one goes down.

\`\`\`yaml
# Alertmanager 3-node gossip cluster
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager-0:9093
          - alertmanager-1:9093
          - alertmanager-2:9093
\`\`\`

### Incident Response — 10-Step Flow

1. Alert triggers → Alertmanager routes to PagerDuty/Slack
2. Acknowledge → stops repeat notifications
3. Open Grafana → navigate to alert's dashboard link
4. Identify timeframe → when did it start? Correlate with deployments?
5. Check golden signals → which of the 4 is affected?
6. Drill down → use Explore for ad-hoc PromQL queries
7. Correlate → check logs in Loki, traces in Tempo
8. Mitigate → rollback, scale, circuit break, redirect traffic
9. Resolve → silence alert if still noisy after fix
10. Post-mortem → timeline, root cause, action items

\`\`\`promql
# What changed recently?
changes(kube_deployment_spec_replicas[30m]) > 0

# Memory leak detection
predict_linear(container_memory_working_set_bytes[1h], 3600)
  > container_spec_memory_limit_bytes
\`\`\`

---

## Chapter 10: Career Prep — Interview Topics

### PromQL Questions You Will Be Asked

- Explain the difference between \`rate()\` and \`irate()\`
- How does \`histogram_quantile()\` work? What are bucket boundaries?
- Write PromQL for p99 latency across all instances of a service
- What is vector matching? When would you use \`group_left\`?
- How do recording rules improve dashboard performance?

### Architecture Questions

- Why does Prometheus use a pull model? What are the tradeoffs?
- How would you handle 10M active time series?
- Explain Thanos architecture. How does deduplication work?
- What is cardinality and why does it matter?
- How do you do HA for Prometheus? For Alertmanager?

### Real-World War Stories

**The Cardinality Bomb:** Developer adds \`user_id\` as a label. 1M users = 1M new series. Prometheus OOMs. Solution: cardinality limits, label governance, pre-deploy PromQL review.

**The Counter Reset Problem:** Pod restarts → counter resets. \`rate()\` handles resets automatically — always use \`rate()\` on counters, never raw instant values.

**The Pushgateway Anti-Pattern:** Stale metrics persist forever in Pushgateway. Solution: add last-push timestamp metric, set up deletion via admin API.

**The Alert Deduplication Failure:** Two HA Prometheus fire the same alert, both page. Solution: Alertmanager cluster with gossip deduplication.

### The Full Observability Ecosystem

| Category | Tools |
|----------|-------|
| Metrics Collection | Prometheus, Grafana Agent, OpenTelemetry Collector |
| Long-term Storage | Thanos, Grafana Mimir, Cortex, VictoriaMetrics, AWS AMP |
| Logs | Grafana Loki, ELK Stack, Splunk |
| Traces | Jaeger, Grafana Tempo, Zipkin, AWS X-Ray |
| Alerting | Alertmanager, Grafana Unified Alerting, PagerDuty, OpsGenie |
| SLO Management | Sloth, Pyrra, OpenSLO, Grafana SLO |
| Visualization | Grafana (dominant), Kibana, Honeycomb |

### 90-Day Learning Roadmap

**Days 1–15:** Core Prometheus — install locally, query node metrics, write alerting rules, set up Slack integration.

**Days 16–30:** PromQL mastery — complete PromLabs PromQL Quiz, write histogram queries, instrument a Python/Go app with all 4 metric types.

**Days 31–50:** Kubernetes integration — deploy kube-prometheus-stack, write ServiceMonitors and PrometheusRules, explore kube-state-metrics.

**Days 51–70:** Grafana deep dive — build 3-tier dashboard hierarchy, dashboard-as-code with Terraform, set up SSO, explore Loki.

**Days 71–90:** Scale & production — deploy Thanos, implement SLO-based alerting with Sloth, practice incident response, build a public GitHub portfolio.

---

*This curriculum covers everything expected of a Senior DevOps/SRE engineer with 6+ years of experience. Go build. Go break things. Go learn.*` },
      { id: 'm7', title: 'Grafana Loki — Log Collection', description: 'Installing Loki · Promtail · Static and dynamic labels · Log queries', type: 'reading', content: `# Lab 2 — Your First Grafana Dashboard (Built from Scratch)

## What You Will Build

| Panel | Type | What it measures |
|-------|------|-----------------|
| CPU usage % | Time series | How hard your cores are working |
| System load (1m/5m/15m) | Time series | Load average trend |
| Memory used vs available | Time series | RAM consumption |
| Disk usage % | Gauge | How full your root partition is |
| Network traffic (in/out) | Time series | Bytes per second on eth0 |
| Key metrics snapshot | Table | Current values side by side |

---

## Part 1 — Connect Grafana to Prometheus

1. Open Grafana: \`http://<EC2-PUBLIC-IP>:3000\` (default login: \`admin / admin\`)
2. Go to **Connections → Data sources → Add data source**
3. Select **Prometheus**
4. Set URL to \`http://localhost:9090\`
5. Click **Save & test** — you should see a green success message

> Why \`localhost\`? Grafana and Prometheus live on the same machine. Using localhost avoids exposing Prometheus to the internet.

---

## Part 2 — Panel 1: CPU Usage %

**Visualization:** Time series

\`\`\`promql
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
\`\`\`

**Settings:** Unit → \`Percent (0-100)\` · Min \`0\` · Max \`100\` · Threshold warning at \`70\`, critical at \`90\`

**Verify:** Run \`stress-ng --cpu 2 --timeout 60s\` and watch the panel spike.

---

## Part 3 — Panel 2: System Load Average

**Visualization:** Time series — add 3 queries:

\`\`\`promql
node_load1    # legend: 1m load
node_load5    # legend: 5m load
node_load15   # legend: 15m load
\`\`\`

**Settings:** Unit → \`Short\` · Add a threshold line at your core count (e.g. 2 for t2.micro)

> Load above core count = system is struggling to keep up.

---

## Part 4 — Panel 3: Memory Usage

**Visualization:** Time series — add 2 queries:

\`\`\`promql
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes   # legend: Used
node_memory_MemAvailable_bytes                                 # legend: Available
\`\`\`

**Settings:** Unit → \`bytes(IEC)\` · Enable **Stack series**

**Verify:** \`stress-ng --vm 1 --vm-bytes 400M --timeout 60s\`

---

## Part 5 — Panel 4: Disk Usage (Gauge)

**Visualization:** Gauge

\`\`\`promql
100 - ((node_filesystem_avail_bytes{mountpoint="/",fstype!="tmpfs"}
      / node_filesystem_size_bytes{mountpoint="/",fstype!="tmpfs"}) * 100)
\`\`\`

**Settings:** Unit → \`Percent (0-100)\` · Thresholds: \`0\` green → \`70\` yellow → \`85\` red

---

## Part 6 — Panel 5: Network Traffic

**Visualization:** Time series — add 2 queries:

\`\`\`promql
rate(node_network_receive_bytes_total{device="eth0"}[5m])    # legend: In
rate(node_network_transmit_bytes_total{device="eth0"}[5m])   # legend: Out
\`\`\`

**Settings:** Unit → \`bytes/sec(IEC)\`

> If your instance uses \`ens5\` instead of \`eth0\`, check with \`node_network_receive_bytes_total\` in the Prometheus UI and look at the \`device\` label.

---

## Part 7 — Panel 6: Key Metrics Table

**Visualization:** Table — set each query to **Instant**, add Reduce transformation → Last

\`\`\`promql
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)          # CPU %
node_load1                                                                   # Load 1m
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
  / node_memory_MemTotal_bytes * 100                                        # Memory %
100 - ((node_filesystem_avail_bytes{mountpoint="/"}
      / node_filesystem_size_bytes{mountpoint="/"}) * 100)                 # Disk %
\`\`\`

---

## Part 8 — Save and Stress Test

Save the dashboard as **EC2 System Health**. Set auto-refresh to \`30s\`.

Run all three stressors simultaneously:

\`\`\`bash
stress-ng --cpu 2 --timeout 120s &
stress-ng --vm 1 --vm-bytes 500M --timeout 120s &
stress-ng --io 2 --timeout 120s
\`\`\`

Watch all panels respond in real time. After stress ends, verify metrics return to baseline.

---

## Checkpoint Questions

Answer before moving to Lab 3:

1. Why use \`rate()\` on \`node_cpu_seconds_total\` instead of the raw value?
2. What does load average \`4.0\` mean on a 2-core machine?
3. Why does the disk query use \`avail_bytes\` not \`free_bytes\`?
4. What changes if you switch \`[5m]\` to \`[1m]\` in the CPU query?
5. Why is \`avg by(instance)\` important in a multi-host setup?
` },
      { id: 'm8', title: 'Grafana Alloy & OpenTelemetry', description: 'OTel architecture · Alloy configuration · Sending metrics and logs', type: 'reading', content: `# Advanced SRE Lab — Prometheus + Grafana + Node Exporter (6+ Years Experience Level)

## Overview

This lab teaches production-level monitoring and observability through hands-on incident simulation, targeting engineers with approximately 6 years of experience seeking to master Site Reliability Engineering (SRE) practices.

## Core Architecture

The monitoring stack follows this flow:

\`\`\`
Linux EC2 instance
→ Node Exporter  (metrics collection)
→ Prometheus     (time-series database)
→ Grafana        (visualization layer)
→ Alertmanager   (alerting & routing)
\`\`\`

---

## Phase 1: Stack Verification

Verify each component of the monitoring infrastructure. Confirm Node Exporter exposes metrics via a plaintext endpoint and Prometheus successfully scrapes data using a pull-based model.

\`\`\`bash
sudo systemctl status prometheus
sudo systemctl status grafana-server
sudo systemctl status node_exporter
curl localhost:9100/metrics | head -20
\`\`\`

---

## Phase 2: Production Incident Simulation

Three realistic scenarios:

### Scenario A — CPU Saturation

\`\`\`bash
stress-ng --cpu $(nproc) --timeout 120s
\`\`\`

Watch: CPU usage, load average, system pressure in Grafana.

### Scenario B — Memory Pressure and OOM Killer

\`\`\`bash
stress-ng --vm 1 --vm-bytes 90% --timeout 60s
\`\`\`

Watch: \`node_memory_MemAvailable_bytes\`, OOM killer events in \`journalctl -k\`.

### Scenario C — Disk Space Exhaustion

\`\`\`bash
dd if=/dev/zero of=/tmp/bigfile bs=1M count=2000
df -h
\`\`\`

Watch: \`node_filesystem_avail_bytes\` drop in real time.

---

## Phase 3: Exporter Failure Handling

\`\`\`bash
sudo systemctl stop node_exporter
\`\`\`

Observe in Prometheus targets: target goes \`DOWN\`. This is distinct from a server failure — the server is alive but the exporter is not running. Practice distinguishing these cases.

\`\`\`bash
sudo systemctl start node_exporter   # restore
\`\`\`

---

## Phase 4: Prometheus Storage Internals

Prometheus uses a Write-Ahead Log (WAL) for crash safety and stores data in 2-hour chunks.

\`\`\`bash
du -sh /var/lib/prometheus/
ls /var/lib/prometheus/
\`\`\`

Key concepts:
- **WAL**: protects against data loss on crash
- **Chunks**: 2-hour blocks compacted over time
- **Retention**: set with \`--storage.tsdb.retention.time=30d\`

---

## Phase 5: Alerting Configuration

Write an alert rule and observe the lifecycle: \`inactive → pending → firing\`.

\`\`\`yaml
# /etc/prometheus/rules/lab.yml
groups:
  - name: lab_alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High CPU on {{ $labels.instance }}"
          description: "CPU is {{ $value | humanize }}% for 2+ minutes."
\`\`\`

\`\`\`bash
sudo systemctl reload prometheus
\`\`\`

Go to Prometheus UI → Alerts. Trigger with \`stress-ng --cpu 2 --timeout 180s\` and watch the state transition.

---

## Phase 6: Advanced Troubleshooting

**Scenario: High load average but normal CPU**

This indicates I/O wait, not CPU saturation. Diagnose:

\`\`\`promql
rate(node_disk_io_time_seconds_total[5m])   # disk I/O pressure
node_load1 / count(node_cpu_seconds_total{mode="idle"}) without(cpu, mode)  # load per core
\`\`\`

\`\`\`bash
iostat -x 2 5   # Linux I/O stats
\`\`\`

---

## Phase 7: Capacity Planning

\`\`\`promql
# Will disk fill up in 4 hours?
predict_linear(node_filesystem_free_bytes{mountpoint="/"}[1h], 4 * 3600) < 0

# Memory trend
predict_linear(node_memory_MemAvailable_bytes[30m], 3600) < 0
\`\`\`

---

## Ten Essential SRE Competencies from This Lab

1. **Pull-based monitoring** — Prometheus scrapes; targets don't push
2. **Time-series databases** — data indexed by metric name + labels + timestamp
3. **Pressure metrics** — distinguish CPU busy vs I/O wait vs memory pressure
4. **Load averages** — interpret 1m/5m/15m relative to core count
5. **OOM killer** — Linux kills processes when memory is exhausted
6. **Crash-safe storage** — WAL ensures data survives unexpected shutdowns
7. **Alert quality** — avoid alert fatigue; alert on user impact, not raw numbers
8. **Metric cardinality** — high-cardinality labels (user_id, request_id) kill Prometheus
9. **Retention policies** — balance storage cost vs query history depth
10. **Observability pipeline** — kernel → exporter → Prometheus → Grafana → alert → SRE response
` },
      { id: 'm9', title: 'Grafana Mimir — Long Term Storage', description: 'Monolithic vs microservices mode · AWS S3 backend · Helm on Kubernetes', type: 'reading', content: 'Full content coming soon. Check back after Batch 4 starts June 1.' },
      { id: 'm10', title: 'Securing Prometheus & Grafana', description: 'HTTPS · Basic auth · OAuth · Active Directory · High availability', type: 'reading', content: 'Full content coming soon. Check back after Batch 4 starts June 1.' },
      { id: 'm11', title: 'Service Discovery', description: 'AWS EC2 discovery · File-based discovery · PushGateway', type: 'reading', content: 'Full content coming soon. Check back after Batch 4 starts June 1.' },
    ],
    labs: [
      { id: 'ml1', title: 'Lab 1 — Full Monitoring Stack', description: 'Deploy Prometheus + Grafana + Node Exporter with Docker Compose. Write PromQL queries. Build a dashboard. Set up an alert.', type: 'lab' },
      { id: 'ml2', title: 'Lab 2 — Your First Grafana Dashboard', description: 'Connect Grafana to Prometheus. Build real panels. Write PromQL queries from scratch.', type: 'lab' },
      { id: 'ml3', title: 'Lab 3 — Setting Up Alerts', description: 'Write alert rules. Configure Alertmanager. Send Slack notifications.', type: 'lab' },
      { id: 'ml4', title: 'Lab 4 — Grafana Loki Log Collection', description: 'Install Loki. Ship Nginx logs with Promtail. Create log dashboard.', type: 'lab' },
      { id: 'ml5', title: 'Lab 5 — SRE Monitoring Lab', description: 'Production-level monitoring with SLOs, error budgets and incident simulation.', type: 'lab' },
      { id: 'ml6', title: 'Lab 6 — Advanced SRE Lab', description: 'Prometheus + Grafana + Node Exporter on EC2. Full production setup.', type: 'lab' },
      { id: 'ml7', title: 'Lab 7 — Prometheus on Two EC2 Instances', description: 'Multi-server monitoring setup on AWS. Remote scraping between instances.', type: 'lab' },
    ],
  },
  {
    id: "aws",
    slug: "aws",
    title: "AWS Cloud",
    icon: "Cloud",
    description: "Master AWS services: EC2, S3, RDS, Lambda, EKS, VPC, IAM, and building scalable, secure cloud architectures for production workloads.",
    color: "#ff9900",
    coverImage: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&q=80",
    lectureCount: 12,
    labCount: 6,
    totalHours: 14,
    lectures: [
      { id: "aws-1", title: "AWS Global Infrastructure", type: "reading", description: "Regions, AZs, edge locations, and the shared responsibility model." },
      { id: "aws-2", title: "IAM: Identity & Access Management", type: "reading", description: "Users, roles, policies, STS, and least privilege design." },
      { id: "aws-3", title: "VPC & Networking", type: "reading", description: "VPCs, subnets, routing, NAT, VPN, and VPC peering." },
      { id: "aws-4", title: "EC2 & Auto Scaling", type: "reading", description: "Instance types, AMIs, user data, ASG, and launch templates." },
      { id: "aws-5", title: "S3 & Storage Services", type: "reading", description: "S3 storage classes, lifecycle, versioning, and CloudFront CDN." },
      { id: "aws-6", title: "RDS & Database Services", type: "reading", description: "RDS, Aurora, DynamoDB, ElastiCache, and read replicas." },
      { id: "aws-7", title: "Lambda & Serverless", type: "reading", description: "Functions, triggers, API Gateway, SAM, and cold starts." },
      { id: "aws-8", title: "EKS: Kubernetes on AWS", type: "reading", description: "EKS clusters, node groups, Fargate, and AWS load balancers." },
      { id: "aws-9", title: "CloudWatch & Observability", type: "reading", description: "Metrics, logs, alarms, X-Ray tracing, and dashboards." },
      { id: "aws-10", title: "Security Services", type: "reading", description: "GuardDuty, Security Hub, WAF, Shield, and KMS encryption." },
      { id: "aws-11", title: "Cost Optimization", type: "reading", description: "Reserved instances, Savings Plans, Cost Explorer, and Trusted Advisor." },
      { id: "aws-12", title: "High Availability Architecture", type: "reading", description: "Multi-AZ, Route 53 failover, and disaster recovery patterns." },
    ],
    labs: [
      { id: "aws-lab-1", title: "3-Tier VPC Architecture", difficulty: "beginner", description: "Build a production VPC with public, private, and database tiers." },
      { id: "aws-lab-2", title: "Serverless API with Lambda", difficulty: "intermediate", description: "Build a REST API with Lambda, API Gateway, and DynamoDB." },
      { id: "aws-lab-3", title: "EKS Cluster Deployment", difficulty: "intermediate", description: "Launch an EKS cluster with managed node groups and ALB Ingress." },
      { id: "aws-lab-4", title: "S3 Static Website + CloudFront", difficulty: "beginner", description: "Deploy a static site with S3, CloudFront, and Route 53." },
      { id: "aws-lab-5", title: "RDS Multi-AZ with Read Replica", difficulty: "intermediate", description: "Set up PostgreSQL RDS with failover and read replica." },
      { id: "aws-lab-6", title: "Cost Optimization Challenge", difficulty: "advanced", description: "Analyze a sample AWS account and implement cost savings." },
    ],
  },
  {
    id: "ansible",
    slug: "ansible",
    title: "Ansible Automation",
    icon: "Settings",
    description: "Automate infrastructure with Ansible: playbooks, roles, inventory management, Ansible Galaxy, AWX, and idempotent configuration management.",
    color: "#e00",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
    lectureCount: 8,
    labCount: 4,
    totalHours: 8,
    lectures: [
      { id: "ans-1", title: "Ansible Fundamentals", type: "reading", description: "Agentless architecture, SSH, inventory, and ad-hoc commands." },
      { id: "ans-2", title: "Playbooks & Tasks", type: "reading", description: "YAML structure, modules, handlers, and task ordering." },
      { id: "ans-3", title: "Variables & Templates", type: "reading", description: "Variables precedence, Jinja2 templates, and lookup plugins." },
      { id: "ans-4", title: "Roles & Galaxy", type: "reading", description: "Role structure, Ansible Galaxy, and community collections." },
      { id: "ans-5", title: "Dynamic Inventory", type: "reading", description: "Cloud dynamic inventory, AWS EC2 plugin, and custom scripts." },
      { id: "ans-6", title: "Ansible Vault", type: "reading", description: "Encrypting sensitive data, vault IDs, and CI/CD integration." },
      { id: "ans-7", title: "AWX & Automation Controller", type: "reading", description: "Web UI, job templates, credentials, and scheduled jobs." },
      { id: "ans-8", title: "Testing Ansible", type: "reading", description: "Molecule, testinfra, and automated role testing." },
    ],
    labs: [
      { id: "ans-lab-1", title: "Server Provisioning Playbook", difficulty: "beginner", description: "Write a playbook to provision and configure Ubuntu servers." },
      { id: "ans-lab-2", title: "Multi-Tier App Deployment", difficulty: "intermediate", description: "Deploy a LAMP stack across multiple hosts with roles." },
      { id: "ans-lab-3", title: "Dynamic AWS Inventory", difficulty: "intermediate", description: "Configure dynamic EC2 inventory and target instances by tags." },
      { id: "ans-lab-4", title: "Ansible + AWX Setup", difficulty: "advanced", description: "Deploy AWX on Kubernetes and set up automated deployments." },
    ],
  },
  {
    id: "kafka",
    slug: "kafka",
    title: "Apache Kafka",
    icon: "Zap",
    description: "Event streaming with Apache Kafka: topics, partitions, consumer groups, Kafka Streams, Schema Registry, and production deployment patterns.",
    color: "#231f20",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    lectureCount: 9,
    labCount: 4,
    totalHours: 9,
    lectures: [
      { id: "kafka-1", title: "Kafka Architecture", type: "reading", description: "Brokers, topics, partitions, offsets, and Zookeeper/KRaft." },
      { id: "kafka-2", title: "Producers & Consumers", type: "reading", description: "Producer configs, consumer groups, rebalancing, and committing." },
      { id: "kafka-3", title: "Kafka Internals", type: "reading", description: "Log compaction, retention, replication factor, and ISR." },
      { id: "kafka-4", title: "Kafka Streams", type: "reading", description: "Stream processing, stateful operations, windowing, and KTable." },
      { id: "kafka-5", title: "Schema Registry & Avro", type: "reading", description: "Schema evolution, Avro serialization, and Confluent Schema Registry." },
      { id: "kafka-6", title: "Kafka Connect", type: "reading", description: "Source & sink connectors, transformations, and dead letter queues." },
      { id: "kafka-7", title: "Kafka Security", type: "reading", description: "TLS, SASL authentication, authorization, and encryption at rest." },
      { id: "kafka-8", title: "Kafka on Kubernetes", type: "reading", description: "Strimzi operator, StatefulSets, and persistent storage." },
      { id: "kafka-9", title: "Performance Tuning", type: "reading", description: "Throughput optimization, batch sizing, and monitoring Kafka." },
    ],
    labs: [
      { id: "kafka-lab-1", title: "Local Kafka Setup", difficulty: "beginner", description: "Run Kafka with Docker Compose and produce/consume messages." },
      { id: "kafka-lab-2", title: "Build a Streaming Pipeline", difficulty: "intermediate", description: "Build an event-driven pipeline with Kafka Streams and MongoDB." },
      { id: "kafka-lab-3", title: "Kafka Connect Lab", difficulty: "intermediate", description: "Set up JDBC source and Elasticsearch sink connectors." },
      { id: "kafka-lab-4", title: "Strimzi on Kubernetes", difficulty: "advanced", description: "Deploy production Kafka cluster on K8s with Strimzi." },
    ],
  },
  {
    id: "azure",
    slug: "azure",
    title: "Microsoft Azure",
    icon: "Cloud",
    description: "Azure cloud platform: Virtual Machines, AKS, Azure DevOps, Active Directory, networking, and enterprise cloud architecture patterns.",
    color: "#0072c6",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    lectureCount: 10,
    labCount: 5,
    totalHours: 11,
    lectures: [
      { id: "az-1", title: "Azure Architecture Fundamentals", type: "reading", description: "Regions, resource groups, subscriptions, and management groups." },
      { id: "az-2", title: "Azure Active Directory", type: "reading", description: "Users, groups, RBAC, service principals, and managed identities." },
      { id: "az-3", title: "Virtual Machines & VMSS", type: "reading", description: "VM sizes, images, availability sets, and scale sets." },
      { id: "az-4", title: "Azure Networking", type: "reading", description: "VNets, subnets, NSGs, Azure Firewall, and VPN Gateway." },
      { id: "az-5", title: "Azure Kubernetes Service", type: "reading", description: "AKS clusters, node pools, Azure CNI, and ACR integration." },
      { id: "az-6", title: "Azure DevOps Pipelines", type: "reading", description: "Repos, Pipelines, Artifacts, and Boards for DevOps workflows." },
      { id: "az-7", title: "Storage & Databases", type: "reading", description: "Blob Storage, Azure SQL, Cosmos DB, and Redis Cache." },
      { id: "az-8", title: "Azure Functions & Serverless", type: "reading", description: "Functions, Logic Apps, Event Grid, and Service Bus." },
      { id: "az-9", title: "Azure Monitor & Security Center", type: "reading", description: "Metrics, Log Analytics, Sentinel, and Defender for Cloud." },
      { id: "az-10", title: "Cost Management", type: "reading", description: "Cost analysis, budgets, reservations, and Azure Advisor." },
    ],
    labs: [
      { id: "az-lab-1", title: "Azure VNet Architecture", difficulty: "beginner", description: "Build a hub-spoke VNet with NSGs and peering." },
      { id: "az-lab-2", title: "AKS Deployment", difficulty: "intermediate", description: "Deploy AKS with AAD integration and Azure Load Balancer." },
      { id: "az-lab-3", title: "Azure DevOps Pipeline", difficulty: "intermediate", description: "Build a complete CI/CD pipeline with Azure DevOps and ACR." },
      { id: "az-lab-4", title: "Terraform on Azure", difficulty: "intermediate", description: "Provision Azure infrastructure using Terraform with remote state." },
      { id: "az-lab-5", title: "Azure Security Hardening", difficulty: "advanced", description: "Implement Defender for Cloud recommendations and Sentinel." },
    ],
  },
  {
    id: "prometheus-grafana",
    slug: "prometheus-grafana",
    title: "Prometheus & Grafana",
    icon: "Activity",
    description: "Master the Prometheus + Grafana stack: PromQL, alerting, recording rules, Grafana dashboards, Loki for logs, and Tempo for traces.",
    color: "#e6522c",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    lectureCount: 10,
    labCount: 5,
    totalHours: 10,
    lectures: [
      { id: "pg-1", title: "Prometheus Architecture & Setup", type: "reading", description: "Components, service discovery, relabeling, and HA setup." },
      { id: "pg-2", title: "PromQL Mastery", type: "reading", description: "Rate, irate, histogram_quantile, and advanced queries." },
      { id: "pg-3", title: "Recording & Alerting Rules", type: "reading", description: "Precomputing metrics, alert syntax, and severity levels." },
      { id: "pg-4", title: "Alertmanager Configuration", type: "reading", description: "Routes, receivers, silences, inhibition, and grouping." },
      { id: "pg-5", title: "Grafana Data Sources", type: "reading", description: "Prometheus, Loki, Tempo, Elasticsearch, and MySQL." },
      { id: "pg-6", title: "Dashboard Design Principles", type: "reading", description: "USE, RED, and GOLDEN signal methods for useful dashboards." },
      { id: "pg-7", title: "Grafana Loki", type: "reading", description: "LogQL, log streams, labels, and Promtail configuration." },
      { id: "pg-8", title: "Grafana Tempo & Traces", type: "reading", description: "Trace exploration, trace-to-logs correlation, and exemplars." },
      { id: "pg-9", title: "Exporters Ecosystem", type: "reading", description: "Node Exporter, Blackbox, MySQL, Redis, and custom exporters." },
      { id: "pg-10", title: "Grafana as Code", type: "reading", description: "Grafonnet, dashboard provisioning, and version control." },
    ],
    labs: [
      { id: "pg-lab-1", title: "kube-prometheus-stack Setup", difficulty: "beginner", description: "Deploy the full Prometheus + Grafana stack on Kubernetes via Helm." },
      { id: "pg-lab-2", title: "Custom Dashboard: Kubernetes", difficulty: "intermediate", description: "Build a production Kubernetes cluster dashboard from scratch." },
      { id: "pg-lab-3", title: "SLO Alerting with Pyrra", difficulty: "intermediate", description: "Define SLOs and generate burn rate alerts with Pyrra." },
      { id: "pg-lab-4", title: "Loki + Grafana Log Pipeline", difficulty: "intermediate", description: "Ship application logs to Loki and create log dashboards." },
      { id: "pg-lab-5", title: "Full Observability Stack", difficulty: "advanced", description: "Connect metrics, logs, and traces for an end-to-end observable app." },
    ],
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "New Module: Prometheus & Grafana",
    body: "We've just launched our brand new Prometheus & Grafana module with 10 lectures, 5 hands-on labs, and a full observability capstone project. Enroll now!",
    date: "2026-05-18",
    tag: "new",
  },
  {
    id: "ann-2",
    title: "Live Q&A: Kubernetes Deep Dive — May 28",
    body: "Join our instructor for a live session covering Kubernetes networking, RBAC troubleshooting, and your questions from the forums. Register by May 25.",
    date: "2026-05-15",
    tag: "event",
  },
  {
    id: "ann-3",
    title: "Updated: Docker Module v2.0",
    body: "The Docker module has been fully rewritten with new content on BuildKit, container security hardening, and Docker Scout image analysis.",
    date: "2026-05-10",
    tag: "update",
  },
  {
    id: "ann-4",
    title: "AWS Capstone Project Deadline",
    body: "Reminder: The AWS capstone project submission deadline is June 1, 2026. Upload your Terraform code and architecture diagram to the student portal.",
    date: "2026-05-08",
    tag: "deadline",
  },
];

export const discussions: Discussion[] = [
  {
    id: "disc-1",
    author: "Amir Seitkali",
    avatar: "AS",
    text: "Just finished the Kubernetes RBAC lab — it's the clearest explanation of service accounts and roles I've ever seen. The hands-on approach makes it stick.",
    date: "2026-05-20",
    likes: 24,
    module: "Kubernetes",
  },
  {
    id: "disc-2",
    author: "Dana Bekova",
    avatar: "DB",
    text: "The Terraform modules lab took me longer than expected but I finally understand how state works. Pro tip: use 'terraform state list' to debug before plan.",
    date: "2026-05-19",
    likes: 18,
    module: "Terraform & IaC",
  },
  {
    id: "disc-3",
    author: "Nursultan Abenov",
    avatar: "NA",
    text: "Docker networking was clicking until overlay networks — can someone explain when to use overlay vs macvlan? The lecture touches on it but I need more depth.",
    date: "2026-05-18",
    likes: 11,
    module: "Docker & Containers",
  },
  {
    id: "disc-4",
    author: "Zarina Ospanova",
    avatar: "ZO",
    text: "The GitHub Actions lab is excellent. I set up a full pipeline for my personal project in under 2 hours using what I learned. This course is 10/10.",
    date: "2026-05-17",
    likes: 31,
    module: "CI/CD Pipelines",
  },
];

export const stats = {
  students: 1847,
  modules: 13,
  lectures: 128,
  labs: 62,
  completionRate: 87,
  satisfaction: 4.9,
};
