export interface Lecture {
  id: string;
  title: string;
  duration?: string;
  type: "reading" | "lab" | "video";
  description: string;
  subtopics?: string[];
  content?: string;
  completed?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  description: string;
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
  mkdocsUrl: string;
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

// Full lecture content lives at the MkDocs school: https://jumptotechschooldevops.github.io/jumptptech-school/
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/01-git/",
    lectures: [
      { id: "git-1", title: "Introduction to Version Control", duration: "22 min", type: "reading", description: "Why version control matters, history of Git, and core concepts." },
      { id: "git-2", title: "Git Internals: Objects & Refs", duration: "35 min", type: "reading", description: "Blobs, trees, commits, and how Git stores data under the hood." },
      { id: "git-3", title: "Branching Strategies", duration: "28 min", type: "reading", description: "GitFlow, trunk-based development, and feature branching workflows." },
      { id: "git-4", title: "Rebasing vs Merging", duration: "20 min", type: "reading", description: "When to rebase, when to merge, and how to keep a clean history." },
      { id: "git-5", title: "Advanced Git Commands", duration: "30 min", type: "reading", description: "Cherry-pick, bisect, stash, reflog, and other power-user tools." },
      { id: "git-6", title: "GitHub Pull Request Workflow", duration: "25 min", type: "reading", description: "Code reviews, PR templates, and CI/CD integration with GitHub." },
      { id: "git-7", title: "Git Hooks & Automation", duration: "18 min", type: "reading", description: "Pre-commit, post-commit, and server-side hooks for automation." },
      { id: "git-8", title: "Monorepos with Git", duration: "22 min", type: "reading", description: "Managing large codebases, sparse checkout, and partial clones." },
    ],
    labs: [
      { id: "git-lab-1", title: "Setting Up a Team Repository", difficulty: "beginner", duration: "45 min", description: "Create a repo with branch protection, PR templates, and CODEOWNERS." },
      { id: "git-lab-2", title: "Resolving Complex Merge Conflicts", difficulty: "intermediate", duration: "60 min", description: "Practice resolving conflicts in a simulated team environment." },
      { id: "git-lab-3", title: "Interactive Rebase & History Cleanup", difficulty: "intermediate", duration: "45 min", description: "Squash commits, reorder history, and recover from mistakes." },
      { id: "git-lab-4", title: "Git Bisect Bug Hunt", difficulty: "advanced", duration: "30 min", description: "Use git bisect to find the commit that introduced a regression." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/02-linux/",
    lectures: [
      { id: "linux-1", title: "Linux Filesystem Hierarchy", duration: "25 min", type: "reading", description: "Understanding /etc, /var, /usr, /opt and the FHS standard." },
      { id: "linux-2", title: "Process Management", duration: "30 min", type: "reading", description: "ps, top, htop, kill, nice, and process priorities." },
      { id: "linux-3", title: "User & Permission Management", duration: "28 min", type: "reading", description: "Users, groups, chmod, chown, ACLs, and sudo configuration." },
      { id: "linux-4", title: "Networking Fundamentals", duration: "35 min", type: "reading", description: "ip, ss, netstat, firewalld, iptables, and network troubleshooting." },
      { id: "linux-5", title: "Package Management", duration: "20 min", type: "reading", description: "apt, yum/dnf, rpm, snap, and managing software repositories." },
      { id: "linux-6", title: "Systemd & Services", duration: "32 min", type: "reading", description: "systemctl, journald, service units, and boot process." },
      { id: "linux-7", title: "Bash Scripting Essentials", duration: "40 min", type: "reading", description: "Variables, loops, functions, error handling, and best practices." },
      { id: "linux-8", title: "Log Management", duration: "22 min", type: "reading", description: "syslog, logrotate, journalctl, and centralized logging." },
      { id: "linux-9", title: "Performance Tuning", duration: "28 min", type: "reading", description: "vmstat, iostat, sar, and system performance analysis." },
      { id: "linux-10", title: "Security Hardening", duration: "35 min", type: "reading", description: "SSH hardening, SELinux/AppArmor, CIS benchmarks." },
    ],
    labs: [
      { id: "linux-lab-1", title: "Linux Environment Setup", difficulty: "beginner", duration: "30 min", description: "Configure a fresh Ubuntu server with users, SSH keys, and firewall." },
      { id: "linux-lab-2", title: "Shell Scripting: Backup System", difficulty: "intermediate", duration: "90 min", description: "Write a full backup script with logging, rotation, and error handling." },
      { id: "linux-lab-3", title: "Service Monitoring with Systemd", difficulty: "intermediate", duration: "60 min", description: "Create custom systemd services and timers for automated tasks." },
      { id: "linux-lab-4", title: "Network Troubleshooting Scenario", difficulty: "intermediate", duration: "45 min", description: "Diagnose and fix networking issues in a broken server environment." },
      { id: "linux-lab-5", title: "Security Hardening Audit", difficulty: "advanced", duration: "120 min", description: "Apply CIS Level 1 benchmarks and run Lynis security audit." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/03-networking/",
    lectures: [
      { id: "net-1", title: "OSI & TCP/IP Models", duration: "30 min", type: "reading", description: "Layers, encapsulation, and how data travels across networks." },
      { id: "net-2", title: "IP Addressing & Subnetting", duration: "35 min", type: "reading", description: "IPv4, IPv6, CIDR notation, and subnet calculations." },
      { id: "net-3", title: "DNS Deep Dive", duration: "28 min", type: "reading", description: "Resolution process, record types, DNS security, and troubleshooting." },
      { id: "net-4", title: "HTTP/HTTPS & TLS", duration: "32 min", type: "reading", description: "HTTP methods, headers, status codes, TLS handshake, and certificates." },
      { id: "net-5", title: "Load Balancing Strategies", duration: "25 min", type: "reading", description: "Round robin, least connections, health checks, and sticky sessions." },
      { id: "net-6", title: "Firewalls & Network Security", duration: "30 min", type: "reading", description: "Stateful firewalls, WAF, DDoS protection, and network segmentation." },
      { id: "net-7", title: "VPNs & Tunneling", duration: "22 min", type: "reading", description: "IPSec, WireGuard, OpenVPN, and site-to-site connectivity." },
      { id: "net-8", title: "Service Mesh & mTLS", duration: "28 min", type: "reading", description: "Istio, Envoy, mutual TLS, and East-West traffic in Kubernetes." },
      { id: "net-9", title: "CDN & Edge Computing", duration: "20 min", type: "reading", description: "Content delivery, caching strategies, and edge functions." },
    ],
    labs: [
      { id: "net-lab-1", title: "Subnet Design Workshop", difficulty: "beginner", duration: "45 min", description: "Design an IP addressing scheme for a multi-tier application." },
      { id: "net-lab-2", title: "DNS Server Setup", difficulty: "intermediate", duration: "60 min", description: "Configure BIND DNS with zones, records, and DNSSEC." },
      { id: "net-lab-3", title: "nginx Load Balancer", difficulty: "intermediate", duration: "75 min", description: "Set up nginx as a reverse proxy with health checks and SSL termination." },
      { id: "net-lab-4", title: "WireGuard VPN Setup", difficulty: "advanced", duration: "90 min", description: "Deploy a peer-to-peer WireGuard VPN between cloud servers." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/04-docker/",
    lectures: [
      { id: "docker-1", title: "Container Fundamentals", duration: "25 min", type: "reading", description: "Namespaces, cgroups, and how containers differ from VMs." },
      { id: "docker-2", title: "Dockerfile Best Practices", duration: "35 min", type: "reading", description: "Layer caching, multi-stage builds, and minimal base images." },
      { id: "docker-3", title: "Docker Networking", duration: "28 min", type: "reading", description: "Bridge, host, overlay networks, and service discovery." },
      { id: "docker-4", title: "Volumes & Persistent Storage", duration: "22 min", type: "reading", description: "Named volumes, bind mounts, and storage drivers." },
      { id: "docker-5", title: "Docker Compose", duration: "30 min", type: "reading", description: "Multi-container applications, dependencies, and profiles." },
      { id: "docker-6", title: "Container Security", duration: "35 min", type: "reading", description: "Non-root users, read-only filesystems, secrets, and image scanning." },
      { id: "docker-7", title: "Registry & Image Management", duration: "20 min", type: "reading", description: "Docker Hub, private registries, image tagging, and versioning." },
      { id: "docker-8", title: "Logging & Monitoring Containers", duration: "25 min", type: "reading", description: "Log drivers, fluentd integration, and container metrics." },
      { id: "docker-9", title: "Docker Swarm Basics", duration: "28 min", type: "reading", description: "Services, stacks, replicas, and rolling updates." },
      { id: "docker-10", title: "BuildKit & Advanced Builds", duration: "22 min", type: "reading", description: "BuildKit cache mounts, secret mounts, and build contexts." },
    ],
    labs: [
      { id: "docker-lab-1", title: "Containerize a Node.js App", difficulty: "beginner", duration: "45 min", description: "Write an optimized Dockerfile and run the app in a container." },
      { id: "docker-lab-2", title: "Multi-Container App with Compose", difficulty: "intermediate", duration: "75 min", description: "Deploy a full-stack app (app + DB + cache) with Docker Compose." },
      { id: "docker-lab-3", title: "Docker Networking Lab", difficulty: "intermediate", duration: "60 min", description: "Create custom networks and connect containers with service discovery." },
      { id: "docker-lab-4", title: "Container Security Hardening", difficulty: "advanced", duration: "90 min", description: "Scan images with Trivy, apply seccomp profiles, and non-root users." },
      { id: "docker-lab-5", title: "Private Docker Registry", difficulty: "advanced", duration: "60 min", description: "Deploy Harbor registry with authentication and image scanning." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/05-kubernetes/",
    lectures: [
      { id: "k8s-1", title: "Kubernetes Architecture", duration: "35 min", type: "reading", description: "Control plane, nodes, etcd, API server, scheduler, and kubelet." },
      { id: "k8s-2", title: "Pods & Workloads", duration: "30 min", type: "reading", description: "Pods, Deployments, StatefulSets, DaemonSets, and Jobs." },
      { id: "k8s-3", title: "Services & Networking", duration: "32 min", type: "reading", description: "ClusterIP, NodePort, LoadBalancer, Ingress, and NetworkPolicies." },
      { id: "k8s-4", title: "Configuration & Secrets", duration: "25 min", type: "reading", description: "ConfigMaps, Secrets, environment variables, and volume mounts." },
      { id: "k8s-5", title: "Persistent Storage", duration: "28 min", type: "reading", description: "PV, PVC, StorageClasses, and CSI drivers." },
      { id: "k8s-6", title: "RBAC & Security", duration: "35 min", type: "reading", description: "Roles, ClusterRoles, ServiceAccounts, PodSecurityStandards." },
      { id: "k8s-7", title: "Resource Management", duration: "22 min", type: "reading", description: "Requests, limits, LimitRanges, ResourceQuotas, and VPA/HPA." },
      { id: "k8s-8", title: "Helm Package Manager", duration: "30 min", type: "reading", description: "Charts, values, templating, and managing releases." },
      { id: "k8s-9", title: "Ingress Controllers", duration: "28 min", type: "reading", description: "nginx Ingress, TLS termination, path routing, and annotations." },
      { id: "k8s-10", title: "Rolling Updates & Rollbacks", duration: "20 min", type: "reading", description: "Deployment strategies, canary, blue/green, and rollbacks." },
      { id: "k8s-11", title: "Cluster Autoscaling", duration: "25 min", type: "reading", description: "HPA, VPA, KEDA, and Cluster Autoscaler." },
      { id: "k8s-12", title: "Operators & CRDs", duration: "32 min", type: "reading", description: "Custom resources, controller pattern, and popular operators." },
      { id: "k8s-13", title: "GitOps with ArgoCD", duration: "35 min", type: "reading", description: "ArgoCD setup, application sync, and GitOps workflows." },
      { id: "k8s-14", title: "Cluster Hardening", duration: "30 min", type: "reading", description: "CIS benchmarks, OPA Gatekeeper, and admission controllers." },
    ],
    labs: [
      { id: "k8s-lab-1", title: "Deploy Your First App", difficulty: "beginner", duration: "45 min", description: "Deploy a containerized app with a Deployment and expose it via Service." },
      { id: "k8s-lab-2", title: "Helm Chart Development", difficulty: "intermediate", duration: "90 min", description: "Create a Helm chart for a multi-tier application." },
      { id: "k8s-lab-3", title: "Ingress & TLS Setup", difficulty: "intermediate", duration: "75 min", description: "Configure nginx Ingress with cert-manager for automated TLS." },
      { id: "k8s-lab-4", title: "RBAC Configuration", difficulty: "intermediate", duration: "60 min", description: "Set up fine-grained RBAC for a dev/ops team separation." },
      { id: "k8s-lab-5", title: "Horizontal Pod Autoscaling", difficulty: "intermediate", duration: "60 min", description: "Configure HPA with custom metrics and load test it." },
      { id: "k8s-lab-6", title: "Stateful Application: PostgreSQL", difficulty: "advanced", duration: "120 min", description: "Deploy PostgreSQL with StatefulSets, PVCs, and backup strategy." },
      { id: "k8s-lab-7", title: "GitOps with ArgoCD", difficulty: "advanced", duration: "120 min", description: "Set up a full GitOps pipeline with ArgoCD and automated sync." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/06-cicd/",
    lectures: [
      { id: "cicd-1", title: "CI/CD Principles & Pipelines", duration: "25 min", type: "reading", description: "Continuous integration, delivery, deployment — and why they matter." },
      { id: "cicd-2", title: "GitHub Actions Deep Dive", duration: "40 min", type: "reading", description: "Workflows, jobs, steps, runners, secrets, and reusable workflows." },
      { id: "cicd-3", title: "GitLab CI/CD", duration: "35 min", type: "reading", description: "Stages, jobs, artifacts, caches, and GitLab-specific features." },
      { id: "cicd-4", title: "Jenkins Pipelines", duration: "32 min", type: "reading", description: "Declarative vs scripted pipelines, shared libraries, and plugins." },
      { id: "cicd-5", title: "Testing in CI", duration: "28 min", type: "reading", description: "Unit, integration, E2E testing, coverage gates, and parallelization." },
      { id: "cicd-6", title: "Docker Build in CI", duration: "22 min", type: "reading", description: "Building, scanning, and pushing images in CI pipelines." },
      { id: "cicd-7", title: "Deployment Strategies", duration: "30 min", type: "reading", description: "Blue/green, canary, rolling, and feature flags in CD." },
      { id: "cicd-8", title: "Security in CI/CD (DevSecOps)", duration: "28 min", type: "reading", description: "SAST, DAST, SCA, secret scanning, and shift-left security." },
      { id: "cicd-9", title: "Pipeline Observability", duration: "20 min", type: "reading", description: "Metrics, notifications, DORA metrics, and pipeline analytics." },
    ],
    labs: [
      { id: "cicd-lab-1", title: "GitHub Actions: Build & Test", difficulty: "beginner", duration: "60 min", description: "Create a workflow that tests, builds, and pushes a Docker image." },
      { id: "cicd-lab-2", title: "Full CD Pipeline to Kubernetes", difficulty: "intermediate", duration: "120 min", description: "Complete pipeline from commit to Kubernetes deployment with rollback." },
      { id: "cicd-lab-3", title: "DevSecOps Pipeline", difficulty: "intermediate", duration: "90 min", description: "Add Trivy, Snyk, and OWASP ZAP to a GitHub Actions pipeline." },
      { id: "cicd-lab-4", title: "Self-Hosted Runners Setup", difficulty: "advanced", duration: "75 min", description: "Deploy GitHub Actions self-hosted runners on Kubernetes with KEDA." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/07-terraform/",
    lectures: [
      { id: "tf-1", title: "IaC Concepts & Terraform Basics", duration: "28 min", type: "reading", description: "Why IaC, Terraform vs alternatives, HCL syntax, and init/plan/apply." },
      { id: "tf-2", title: "Providers & Resources", duration: "32 min", type: "reading", description: "AWS/Azure/GCP providers, resource lifecycle, and meta-arguments." },
      { id: "tf-3", title: "Variables & Outputs", duration: "22 min", type: "reading", description: "Input variables, local values, output values, and tfvars files." },
      { id: "tf-4", title: "State Management", duration: "30 min", type: "reading", description: "Local vs remote state, S3 backends, state locking, and import." },
      { id: "tf-5", title: "Modules", duration: "35 min", type: "reading", description: "Writing reusable modules, module registry, and versioning." },
      { id: "tf-6", title: "Workspaces & Environments", duration: "22 min", type: "reading", description: "Multi-environment strategy, workspaces, and directory structure." },
      { id: "tf-7", title: "Terraform with CI/CD", duration: "28 min", type: "reading", description: "Atlantis, Terraform Cloud, and pipeline integration." },
      { id: "tf-8", title: "Testing Terraform", duration: "25 min", type: "reading", description: "Terratest, terraform validate, and policy as code with Sentinel." },
      { id: "tf-9", title: "Security Best Practices", duration: "22 min", type: "reading", description: "Least privilege, secret management, and tfsec scanning." },
      { id: "tf-10", title: "Drift Detection & Refactoring", duration: "20 min", type: "reading", description: "Detecting configuration drift and safely refactoring state." },
    ],
    labs: [
      { id: "tf-lab-1", title: "Provision AWS VPC & EC2", difficulty: "beginner", duration: "60 min", description: "Create a VPC, subnets, security groups, and EC2 instances." },
      { id: "tf-lab-2", title: "Terraform Module Library", difficulty: "intermediate", duration: "90 min", description: "Build reusable modules for VPC, EKS, and RDS." },
      { id: "tf-lab-3", title: "Remote State with S3 & DynamoDB", difficulty: "intermediate", duration: "45 min", description: "Configure remote state backend with locking and encryption." },
      { id: "tf-lab-4", title: "Kubernetes Cluster with EKS", difficulty: "advanced", duration: "120 min", description: "Provision a production-grade EKS cluster with node groups." },
      { id: "tf-lab-5", title: "Atlantis for Pull Request Automation", difficulty: "advanced", duration: "90 min", description: "Deploy Atlantis for automated plan/apply on PRs." },
    ],
  },
  {
    id: "monitoring",
    slug: "monitoring",
    title: "Monitoring & Observability",
    icon: "BarChart2",
    description: "Build full observability stacks: metrics, logs, traces with Prometheus, Grafana, ELK, Jaeger, and OpenTelemetry.",
    color: "#e6522c",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    lectureCount: 11,
    labCount: 7,
    totalHours: 14,
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/08-monitoring/",
    lectures: [
      {
        id: "mon-1", title: "Observability Principles", duration: "20 min", type: "reading",
        description: "Monitoring vs observability. The three pillars: metrics, logs, and traces.",
        subtopics: ["Monitoring vs observability", "Three pillars: Metrics, Logs, Traces"],
      },
      {
        id: "mon-2", title: "SLO, SLA, SLI — Measuring Reliability", duration: "30 min", type: "reading",
        description: "Service Level Indicators, Objectives, and Agreements — the foundation of SRE reliability.",
        subtopics: ["SLI — Service Level Indicator", "SLO — Service Level Objective", "Error budget", "SLA — Service Level Agreement"],
      },
      {
        id: "mon-3", title: "Introduction to Prometheus", duration: "25 min", type: "reading",
        description: "Prometheus architecture, data model, scraping, and Push Gateway.",
        subtopics: ["Architecture and data model", "Scraping and Push Gateway", "Node Exporter"],
      },
      {
        id: "mon-4", title: "PromQL — Query Language", duration: "40 min", type: "reading",
        description: "Functions, aggregations, alert rules, and recording rules.",
        subtopics: ["Functions and aggregations", "Alert rules", "Recording rules"],
      },
      {
        id: "mon-5", title: "Alertmanager", duration: "20 min", type: "reading",
        description: "Routes, receivers, Slack and PagerDuty integration.",
        subtopics: ["Routes and receivers", "Slack integration", "PagerDuty integration"],
      },
      {
        id: "mon-6", title: "What is Grafana?", duration: "30 min", type: "reading",
        description: "Installation, dashboard best practices, variables and dynamic dashboards.",
        subtopics: ["Installation", "Dashboard best practices", "Variables and dynamic dashboards"],
      },
      {
        id: "mon-7", title: "Grafana Loki — Log Collection", duration: "40 min", type: "reading",
        description: "Installing Loki, Promtail configuration, log labels and queries.",
        subtopics: ["Installing Loki", "Promtail configuration", "Log labels and queries"],
      },
      {
        id: "mon-8", title: "Grafana Alloy & OpenTelemetry", duration: "30 min", type: "reading",
        description: "OTel architecture and Alloy configuration for metrics and traces.",
        subtopics: ["OTel architecture", "Alloy configuration"],
      },
      {
        id: "mon-9", title: "Grafana Mimir — Long Term Storage", duration: "35 min", type: "reading",
        description: "Monolithic vs microservices mode and AWS S3 backend configuration.",
        subtopics: ["Monolithic vs microservices mode", "AWS S3 backend"],
      },
      {
        id: "mon-10", title: "Securing Prometheus & Grafana", duration: "30 min", type: "reading",
        description: "HTTPS, authentication, OAuth, and Active Directory integration.",
        subtopics: ["HTTPS and authentication", "OAuth and Active Directory"],
      },
      {
        id: "mon-11", title: "Service Discovery", duration: "20 min", type: "reading",
        description: "AWS EC2 discovery and file-based service discovery in Prometheus.",
        subtopics: ["AWS EC2 discovery", "File-based discovery"],
      },
    ],
    labs: [
      { id: "mon-lab-1", title: "Full Monitoring Stack", difficulty: "beginner", duration: "90 min", description: "Deploy Prometheus + Grafana + Node Exporter with Docker Compose." },
      { id: "mon-lab-2", title: "Your First Grafana Dashboard", difficulty: "beginner", duration: "60 min", description: "Connect Grafana to Prometheus, build real dashboard, write PromQL queries." },
      { id: "mon-lab-3", title: "Setting Up Alerts", difficulty: "intermediate", duration: "45 min", description: "Write alert rules, configure Alertmanager, send Slack notifications." },
      { id: "mon-lab-4", title: "Grafana Loki Log Collection", difficulty: "intermediate", duration: "60 min", description: "Install Loki, ship Nginx logs, create log dashboard." },
      { id: "mon-lab-5", title: "SRE Monitoring Lab", difficulty: "intermediate", duration: "75 min", description: "Production-level monitoring with SLOs, error budgets, incident simulation." },
      { id: "mon-lab-6", title: "Advanced SRE Lab (Senior Level)", difficulty: "advanced", duration: "120 min", description: "Prometheus + Grafana + Node Exporter on EC2, full production setup." },
      { id: "mon-lab-7", title: "Prometheus on Two EC2 Instances", difficulty: "advanced", duration: "90 min", description: "Multi-server monitoring setup on AWS." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/09-aws/",
    lectures: [
      { id: "aws-1", title: "AWS Global Infrastructure", duration: "20 min", type: "reading", description: "Regions, AZs, edge locations, and the shared responsibility model." },
      { id: "aws-2", title: "IAM: Identity & Access Management", duration: "35 min", type: "reading", description: "Users, roles, policies, STS, and least privilege design." },
      { id: "aws-3", title: "VPC & Networking", duration: "38 min", type: "reading", description: "VPCs, subnets, routing, NAT, VPN, and VPC peering." },
      { id: "aws-4", title: "EC2 & Auto Scaling", duration: "32 min", type: "reading", description: "Instance types, AMIs, user data, ASG, and launch templates." },
      { id: "aws-5", title: "S3 & Storage Services", duration: "28 min", type: "reading", description: "S3 storage classes, lifecycle, versioning, and CloudFront CDN." },
      { id: "aws-6", title: "RDS & Database Services", duration: "30 min", type: "reading", description: "RDS, Aurora, DynamoDB, ElastiCache, and read replicas." },
      { id: "aws-7", title: "Lambda & Serverless", duration: "32 min", type: "reading", description: "Functions, triggers, API Gateway, SAM, and cold starts." },
      { id: "aws-8", title: "EKS: Kubernetes on AWS", duration: "35 min", type: "reading", description: "EKS clusters, node groups, Fargate, and AWS load balancers." },
      { id: "aws-9", title: "CloudWatch & Observability", duration: "25 min", type: "reading", description: "Metrics, logs, alarms, X-Ray tracing, and dashboards." },
      { id: "aws-10", title: "Security Services", duration: "28 min", type: "reading", description: "GuardDuty, Security Hub, WAF, Shield, and KMS encryption." },
      { id: "aws-11", title: "Cost Optimization", duration: "22 min", type: "reading", description: "Reserved instances, Savings Plans, Cost Explorer, and Trusted Advisor." },
      { id: "aws-12", title: "High Availability Architecture", duration: "30 min", type: "reading", description: "Multi-AZ, Route 53 failover, and disaster recovery patterns." },
    ],
    labs: [
      { id: "aws-lab-1", title: "3-Tier VPC Architecture", difficulty: "beginner", duration: "75 min", description: "Build a production VPC with public, private, and database tiers." },
      { id: "aws-lab-2", title: "Serverless API with Lambda", difficulty: "intermediate", duration: "90 min", description: "Build a REST API with Lambda, API Gateway, and DynamoDB." },
      { id: "aws-lab-3", title: "EKS Cluster Deployment", difficulty: "intermediate", duration: "120 min", description: "Launch an EKS cluster with managed node groups and ALB Ingress." },
      { id: "aws-lab-4", title: "S3 Static Website + CloudFront", difficulty: "beginner", duration: "45 min", description: "Deploy a static site with S3, CloudFront, and Route 53." },
      { id: "aws-lab-5", title: "RDS Multi-AZ with Read Replica", difficulty: "intermediate", duration: "90 min", description: "Set up PostgreSQL RDS with failover and read replica." },
      { id: "aws-lab-6", title: "Cost Optimization Challenge", difficulty: "advanced", duration: "90 min", description: "Analyze a sample AWS account and implement cost savings." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/10-ansible/",
    lectures: [
      { id: "ans-1", title: "Ansible Fundamentals", duration: "25 min", type: "reading", description: "Agentless architecture, SSH, inventory, and ad-hoc commands." },
      { id: "ans-2", title: "Playbooks & Tasks", duration: "32 min", type: "reading", description: "YAML structure, modules, handlers, and task ordering." },
      { id: "ans-3", title: "Variables & Templates", duration: "28 min", type: "reading", description: "Variables precedence, Jinja2 templates, and lookup plugins." },
      { id: "ans-4", title: "Roles & Galaxy", duration: "30 min", type: "reading", description: "Role structure, Ansible Galaxy, and community collections." },
      { id: "ans-5", title: "Dynamic Inventory", duration: "22 min", type: "reading", description: "Cloud dynamic inventory, AWS EC2 plugin, and custom scripts." },
      { id: "ans-6", title: "Ansible Vault", duration: "18 min", type: "reading", description: "Encrypting sensitive data, vault IDs, and CI/CD integration." },
      { id: "ans-7", title: "AWX & Automation Controller", duration: "30 min", type: "reading", description: "Web UI, job templates, credentials, and scheduled jobs." },
      { id: "ans-8", title: "Testing Ansible", duration: "22 min", type: "reading", description: "Molecule, testinfra, and automated role testing." },
    ],
    labs: [
      { id: "ans-lab-1", title: "Server Provisioning Playbook", difficulty: "beginner", duration: "60 min", description: "Write a playbook to provision and configure Ubuntu servers." },
      { id: "ans-lab-2", title: "Multi-Tier App Deployment", difficulty: "intermediate", duration: "90 min", description: "Deploy a LAMP stack across multiple hosts with roles." },
      { id: "ans-lab-3", title: "Dynamic AWS Inventory", difficulty: "intermediate", duration: "60 min", description: "Configure dynamic EC2 inventory and target instances by tags." },
      { id: "ans-lab-4", title: "Ansible + AWX Setup", difficulty: "advanced", duration: "120 min", description: "Deploy AWX on Kubernetes and set up automated deployments." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/11-kafka/",
    lectures: [
      { id: "kafka-1", title: "Kafka Architecture", duration: "30 min", type: "reading", description: "Brokers, topics, partitions, offsets, and Zookeeper/KRaft." },
      { id: "kafka-2", title: "Producers & Consumers", duration: "32 min", type: "reading", description: "Producer configs, consumer groups, rebalancing, and committing." },
      { id: "kafka-3", title: "Kafka Internals", duration: "28 min", type: "reading", description: "Log compaction, retention, replication factor, and ISR." },
      { id: "kafka-4", title: "Kafka Streams", duration: "35 min", type: "reading", description: "Stream processing, stateful operations, windowing, and KTable." },
      { id: "kafka-5", title: "Schema Registry & Avro", duration: "25 min", type: "reading", description: "Schema evolution, Avro serialization, and Confluent Schema Registry." },
      { id: "kafka-6", title: "Kafka Connect", duration: "28 min", type: "reading", description: "Source & sink connectors, transformations, and dead letter queues." },
      { id: "kafka-7", title: "Kafka Security", duration: "25 min", type: "reading", description: "TLS, SASL authentication, authorization, and encryption at rest." },
      { id: "kafka-8", title: "Kafka on Kubernetes", duration: "30 min", type: "reading", description: "Strimzi operator, StatefulSets, and persistent storage." },
      { id: "kafka-9", title: "Performance Tuning", duration: "22 min", type: "reading", description: "Throughput optimization, batch sizing, and monitoring Kafka." },
    ],
    labs: [
      { id: "kafka-lab-1", title: "Local Kafka Setup", difficulty: "beginner", duration: "45 min", description: "Run Kafka with Docker Compose and produce/consume messages." },
      { id: "kafka-lab-2", title: "Build a Streaming Pipeline", difficulty: "intermediate", duration: "120 min", description: "Build an event-driven pipeline with Kafka Streams and MongoDB." },
      { id: "kafka-lab-3", title: "Kafka Connect Lab", difficulty: "intermediate", duration: "90 min", description: "Set up JDBC source and Elasticsearch sink connectors." },
      { id: "kafka-lab-4", title: "Strimzi on Kubernetes", difficulty: "advanced", duration: "120 min", description: "Deploy production Kafka cluster on K8s with Strimzi." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/12-azure/",
    lectures: [
      { id: "az-1", title: "Azure Architecture Fundamentals", duration: "25 min", type: "reading", description: "Regions, resource groups, subscriptions, and management groups." },
      { id: "az-2", title: "Azure Active Directory", duration: "32 min", type: "reading", description: "Users, groups, RBAC, service principals, and managed identities." },
      { id: "az-3", title: "Virtual Machines & VMSS", duration: "28 min", type: "reading", description: "VM sizes, images, availability sets, and scale sets." },
      { id: "az-4", title: "Azure Networking", duration: "35 min", type: "reading", description: "VNets, subnets, NSGs, Azure Firewall, and VPN Gateway." },
      { id: "az-5", title: "Azure Kubernetes Service", duration: "38 min", type: "reading", description: "AKS clusters, node pools, Azure CNI, and ACR integration." },
      { id: "az-6", title: "Azure DevOps Pipelines", duration: "35 min", type: "reading", description: "Repos, Pipelines, Artifacts, and Boards for DevOps workflows." },
      { id: "az-7", title: "Storage & Databases", duration: "28 min", type: "reading", description: "Blob Storage, Azure SQL, Cosmos DB, and Redis Cache." },
      { id: "az-8", title: "Azure Functions & Serverless", duration: "25 min", type: "reading", description: "Functions, Logic Apps, Event Grid, and Service Bus." },
      { id: "az-9", title: "Azure Monitor & Security Center", duration: "22 min", type: "reading", description: "Metrics, Log Analytics, Sentinel, and Defender for Cloud." },
      { id: "az-10", title: "Cost Management", duration: "20 min", type: "reading", description: "Cost analysis, budgets, reservations, and Azure Advisor." },
    ],
    labs: [
      { id: "az-lab-1", title: "Azure VNet Architecture", difficulty: "beginner", duration: "60 min", description: "Build a hub-spoke VNet with NSGs and peering." },
      { id: "az-lab-2", title: "AKS Deployment", difficulty: "intermediate", duration: "120 min", description: "Deploy AKS with AAD integration and Azure Load Balancer." },
      { id: "az-lab-3", title: "Azure DevOps Pipeline", difficulty: "intermediate", duration: "90 min", description: "Build a complete CI/CD pipeline with Azure DevOps and ACR." },
      { id: "az-lab-4", title: "Terraform on Azure", difficulty: "intermediate", duration: "90 min", description: "Provision Azure infrastructure using Terraform with remote state." },
      { id: "az-lab-5", title: "Azure Security Hardening", difficulty: "advanced", duration: "120 min", description: "Implement Defender for Cloud recommendations and Sentinel." },
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
    mkdocsUrl: "https://jumptotechschooldevops.github.io/jumptptech-school/modules/08-monitoring/",
    lectures: [
      { id: "pg-1", title: "Prometheus Architecture & Setup", duration: "28 min", type: "reading", description: "Components, service discovery, relabeling, and HA setup." },
      { id: "pg-2", title: "PromQL Mastery", duration: "40 min", type: "reading", description: "Rate, irate, histogram_quantile, and advanced queries." },
      { id: "pg-3", title: "Recording & Alerting Rules", duration: "30 min", type: "reading", description: "Precomputing metrics, alert syntax, and severity levels." },
      { id: "pg-4", title: "Alertmanager Configuration", duration: "28 min", type: "reading", description: "Routes, receivers, silences, inhibition, and grouping." },
      { id: "pg-5", title: "Grafana Data Sources", duration: "22 min", type: "reading", description: "Prometheus, Loki, Tempo, Elasticsearch, and MySQL." },
      { id: "pg-6", title: "Dashboard Design Principles", duration: "30 min", type: "reading", description: "USE, RED, and GOLDEN signal methods for useful dashboards." },
      { id: "pg-7", title: "Grafana Loki", duration: "28 min", type: "reading", description: "LogQL, log streams, labels, and Promtail configuration." },
      { id: "pg-8", title: "Grafana Tempo & Traces", duration: "25 min", type: "reading", description: "Trace exploration, trace-to-logs correlation, and exemplars." },
      { id: "pg-9", title: "Exporters Ecosystem", duration: "22 min", type: "reading", description: "Node Exporter, Blackbox, MySQL, Redis, and custom exporters." },
      { id: "pg-10", title: "Grafana as Code", duration: "20 min", type: "reading", description: "Grafonnet, dashboard provisioning, and version control." },
    ],
    labs: [
      { id: "pg-lab-1", title: "kube-prometheus-stack Setup", difficulty: "beginner", duration: "60 min", description: "Deploy the full Prometheus + Grafana stack on Kubernetes via Helm." },
      { id: "pg-lab-2", title: "Custom Dashboard: Kubernetes", difficulty: "intermediate", duration: "90 min", description: "Build a production Kubernetes cluster dashboard from scratch." },
      { id: "pg-lab-3", title: "SLO Alerting with Pyrra", difficulty: "intermediate", duration: "90 min", description: "Define SLOs and generate burn rate alerts with Pyrra." },
      { id: "pg-lab-4", title: "Loki + Grafana Log Pipeline", difficulty: "intermediate", duration: "75 min", description: "Ship application logs to Loki and create log dashboards." },
      { id: "pg-lab-5", title: "Full Observability Stack", difficulty: "advanced", duration: "150 min", description: "Connect metrics, logs, and traces for an end-to-end observable app." },
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
