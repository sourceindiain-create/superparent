import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ExternalLink, 
  Zap, 
  BookOpen, 
  DollarSign, 
  Play, 
  Sliders, 
  Compass, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  Globe, 
  FileText, 
  ShieldCheck, 
  Award, 
  Flame, 
  Radio, 
  RotateCcw,
  Maximize2,
  Share2,
  Navigation,
  Bot
} from 'lucide-react';
import { AppThemeId } from '../types';
import { APP_THEMES } from '../data/themes';

interface ResearchWorldProps {
  onAskAI?: (query: string) => void;
  currentTheme?: AppThemeId;
}

// Sub-tabs inside Research World
type ResearchSubTab = 'pcb-circuits' | 'drones' | 'robots' | 'books' | 'future-fundings' | 'simulators';

interface ToolLinkItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'pcb' | 'circuits' | 'drone-tool' | 'robot-tool' | 'funding' | 'research-book';
  badge: string;
  badgeColor: string;
  url: string;
  description: string;
  teluguDescription: string;
  keyFeatures: string[];
  suggestedPrompt: string;
}

export const ResearchWorld: React.FC<ResearchWorldProps> = ({ onAskAI, currentTheme = 'gurukul-amber' }) => {
  const [activeTab, setActiveTab] = useState<ResearchSubTab>('pcb-circuits');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Drone Simulator States
  const [droneThrottle, setDroneThrottle] = useState<number>(45);
  const [dronePitch, setDronePitch] = useState<number>(0);
  const [droneRoll, setDroneRoll] = useState<number>(0);
  const [droneArmed, setDroneArmed] = useState<boolean>(false);
  const [selectedDroneType, setSelectedDroneType] = useState<string>('fpv-quad');

  // Interactive Robot Simulator States
  const [robotBaseAngle, setRobotBaseAngle] = useState<number>(90);
  const [robotArmShoulder, setRobotArmShoulder] = useState<number>(45);
  const [robotArmElbow, setRobotArmElbow] = useState<number>(60);
  const [robotGripperClosed, setRobotGripperClosed] = useState<boolean>(false);
  const [selectedRobotType, setSelectedRobotType] = useState<string>('rover-4wd');

  // Interactive Circuit Simulator States
  const [simCircuitVoltage, setSimCircuitVoltage] = useState<number>(5.0);
  const [simLedResistance, setSimLedResistance] = useState<number>(220);
  const [circuitPowerOn, setCircuitPowerOn] = useState<boolean>(true);

  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Curated Research & Engineering Tools
  const TOOLS_LIST: ToolLinkItem[] = [
    {
      id: 'blueprint-io',
      title: 'Blueprint.io Hardware & Schematics Platform',
      teluguTitle: 'బ్లూప్రింట్.io హార్డ్‌వేర్ & సర్క్యూట్ డిజైన్ ప్లాట్‌ఫారమ్',
      category: 'pcb',
      badge: 'REQUESTED LINK',
      badgeColor: 'bg-indigo-600 text-white',
      url: 'https://blueprint.io',
      description: 'Interactive hardware blueprint, system schematics architecture, and rapid electronic product prototyping canvas.',
      teluguDescription: 'ఎలక్ట్రానిక్ బ్లూప్రింట్లు, సిస్టమ్ ఆర్కిటెక్చర్ మరియు హార్డ్‌వేర్ ప్రోటోటైపింగ్ డిజిటల్ కాన్వాస్.',
      keyFeatures: ['Interactive Hardware Blueprint Canvas', 'Schematic Flowcharts', 'Rapid System Architecture', 'BOM Generator'],
      suggestedPrompt: 'Explain how to design an IoT sensor schematic using Blueprint.io step by step.'
    },
    {
      id: 'easyeda',
      title: 'EasyEDA Online Web PCB & Schematic Editor',
      teluguTitle: 'ఈజీఈడీఏ ఆన్‌లైన్ వెబ్ PCB డిజైనర్',
      category: 'pcb',
      badge: 'WEB PCB EDA',
      badgeColor: 'bg-blue-600 text-white',
      url: 'https://easyeda.com',
      description: 'Zero-install online web schematic capture, SPICE circuit simulation, PCB layout, and direct JLCPCB 1-click manufacturing integration.',
      teluguDescription: 'బ్రౌజర్‌లోనే ఉచితంగా సర్క్యూట్ డిజైన్ చేసి నేరుగా PCB ఆర్డర్ చేయగల ఆన్‌లైన్ టూల్.',
      keyFeatures: ['Multi-layer PCB Routing', '200,000+ Component Library', 'Direct 3D PCB Preview', 'Gerber File Export'],
      suggestedPrompt: 'How do I draw a schematic for an ESP32 drone flight controller on EasyEDA?'
    },
    {
      id: 'kicad',
      title: 'KiCad EDA Professional Open Source PCB Suite',
      teluguTitle: 'కీకాడ్ ప్రొఫెషనల్ ఓపెన్ సోర్స్ PCB సూట్',
      category: 'pcb',
      badge: 'CERN BACKED',
      badgeColor: 'bg-emerald-700 text-white',
      url: 'https://www.kicad.org',
      description: 'Industry-standard open-source electronics design automation suite with schematic capture, 32-layer PCB layout, and 3D raytracing viewer.',
      teluguDescription: 'ప్రపంచ ప్రసిద్ధ ఓపెన్ సోర్స్ PCB సాఫ్ట్‌వేర్ — ప్రపంచ స్థాయి రోబోటిక్స్ కంపెనీలు వాడే టూల్.',
      keyFeatures: ['Schematic Capture & Hierarchical Sheets', 'Ultra-fast PCB Router', 'Built-in SPICE Simulation', 'Differential Pair Tuning'],
      suggestedPrompt: 'Show best practices for routing 4-layer motor driver PCBs in KiCad.'
    },
    {
      id: 'wokwi',
      title: 'Wokwi Online Real-time Circuit & MCU Simulator',
      teluguTitle: 'వోక్వీ ఆన్‌లైన్ రియల్-టైమ్ సర్క్యూట్ సిమ్యులేటర్',
      category: 'circuits',
      badge: 'RUN & PLAY IN BROWSER',
      badgeColor: 'bg-amber-600 text-white font-bold',
      url: 'https://wokwi.com',
      description: 'Simulate Arduino, ESP32, Raspberry Pi Pico, sensors, LCDs, and servo motors in real time right in the browser with live C++/MicroPython code.',
      teluguDescription: 'హార్డ్‌వేర్ లేకుండానే నేరుగా బ్రౌజర్‌లో ఆర్డునో, ఈఎస్పీ32 కోడ్ రన్ చేసి మోటార్లు తిప్పే సిమ్యులేటర్.',
      keyFeatures: ['ESP32 WiFi Simulation', 'Servo & Stepper Motors', 'Live Breadboard Wiring', 'MicroPython & Arduino IDE'],
      suggestedPrompt: 'Create a Wokwi circuit simulation code for an obstacle avoiding ultrasonic robot.'
    },
    {
      id: 'falstad',
      title: 'Falstad Interactive Electronics Circuit Simulator',
      teluguTitle: 'ఫాల్‌స్టాడ్ ఇంటరాక్టివ్ ఎలక్ట్రానిక్స్ సర్క్యూట్ సిమ్యులేటర్',
      category: 'circuits',
      badge: 'VOLTAGE & CURRENT FLOW',
      badgeColor: 'bg-purple-600 text-white',
      url: 'https://www.falstad.com/circuit/',
      description: 'Watch green moving dots represent electric current flow through resistors, capacitors, inductors, transistors, op-amps, and 555 timers in real time.',
      teluguDescription: 'విద్యుత్ ప్రవాహం (ఎలక్ట్రాన్లు) ఎలా ప్రవహిస్తుందో లైవ్‌గా చూపించే అద్భుతమైన ఉచిత వెబ్ సిమ్యులేటర్.',
      keyFeatures: ['Moving Current Visualizer', 'Oscilloscope Displays', '500+ Preset Circuits', 'AC/DC Frequency Analysis'],
      suggestedPrompt: 'Explain how an H-bridge motor driver circuit works using Falstad simulator.'
    },
    {
      id: 'tinkercad-circuits',
      title: 'Autodesk Tinkercad Circuits & 3D Robotics',
      teluguTitle: 'ఆటోడెస్క్ టింకర్‌క్యాడ్ సర్క్యూట్స్ & 3D రోబోటిక్స్',
      category: 'circuits',
      badge: 'BEGINNER FRIENDLY',
      badgeColor: 'bg-rose-600 text-white',
      url: 'https://www.tinkercad.com/circuits',
      description: 'Visual drag-and-drop breadboard wiring with virtual multimeter, power supplies, motors, and block-based/text coding for young roboticists.',
      teluguDescription: 'పిల్లలు సులభంగా డ్రాగ్ & డ్రాప్ ద్వారా సర్క్యూట్లు మరియు రోబోట్లు డిజైన్ చేసే విద్యా పోర్టల్.',
      keyFeatures: ['Visual Breadboarding', 'Virtual Multimeter & Scope', 'Block & C++ Code Editor', '3D Chassis Integration'],
      suggestedPrompt: 'Guide me on wiring an ultrasonic distance sensor with an Arduino in Tinkercad.'
    },
    {
      id: 'betaflight',
      title: 'Betaflight Web Configurator (Flight Controller Firmware)',
      teluguTitle: 'బీటాఫ్లైట్ డ్రోన్ ఫ్లైట్ కంట్రోలర్ కాన్ఫిగరేటర్',
      category: 'drone-tool',
      badge: 'RUN & TUNE DRONES',
      badgeColor: 'bg-cyan-600 text-white font-bold',
      url: 'https://app.betaflight.com',
      description: 'Official open-source flight controller software for multirotors. Calibrate gyroscopes, tune PIDs, configure OSD, and test motors via WebSerial.',
      teluguDescription: 'డ్రోన్ మోటార్లు, గైరోస్కోప్, రిసీవర్ మరియు PID ట్యూనింగ్ చేసే అధికారిక వెబ్ టూల్.',
      keyFeatures: ['3D Attitude Real-time Preview', 'Motor Test & RPM Filtering', 'OSD Video Setup', 'PID & Rate Profiles'],
      suggestedPrompt: 'How do I tune PID loops for a 5-inch freestyle FPV drone in Betaflight?'
    },
    {
      id: 'ardupilot',
      title: 'ArduPilot & Mission Planner (Autonomous Drones & Rovers)',
      teluguTitle: 'ఆర్డుపైలట్ & మిషన్ ప్లానర్ అటానమస్ డ్రోన్స్',
      category: 'drone-tool',
      badge: 'AUTONOMOUS GPS',
      badgeColor: 'bg-teal-700 text-white',
      url: 'https://ardupilot.org',
      description: 'The world’s most advanced and reliable open-source autopilot system for airplanes, multicopters, helicopters, rovers, and underwater submersibles.',
      teluguDescription: 'జీపీఎస్ వేపాయింట్ నేవిగేషన్, ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అటానమస్ డ్రోన్ల కోసం ప్రపంచ స్థాయి సాఫ్ట్‌వేర్.',
      keyFeatures: ['GPS Waypoint Autonomous Missions', 'Geofencing & Return-To-Home', 'Obstacle Avoidance', 'Payload Control'],
      suggestedPrompt: 'How to setup ArduPilot on a Pixhawk flight controller for autonomous delivery drones?'
    },
    {
      id: 'webots',
      title: 'Webots Open-Source 3D Robot Simulator (Cyberbotics)',
      teluguTitle: 'వెబాట్స్ ఓపెన్ సోర్స్ 3D రోబోట్ సిమ్యులేటర్',
      category: 'robot-tool',
      badge: 'ROS2 & PHYSICS SIM',
      badgeColor: 'bg-indigo-700 text-white',
      url: 'https://cyberbotics.com',
      description: 'Complete development environment to model, program, and simulate biped humanoids, quadruped robot dogs, robotic arms, and wheeled rovers in realistic physics.',
      teluguDescription: 'రోబోటిక్ డాగ్స్, హ్యూమనాయిడ్స్ మరియు రోబోటిక్ ఆర్మ్స్ కోసం రియలిస్టిక్ ఫిజిక్స్ సిమ్యులేటర్.',
      keyFeatures: ['Ode Physics Engine', 'ROS & ROS2 Native Support', 'LiDAR & Depth Cameras', 'Python, C++, Java API'],
      suggestedPrompt: 'How to simulate a 4-legged quadruped walking robot in Webots using Python?'
    },
    {
      id: 'ros-org',
      title: 'ROS 2 (Robot Operating System) Global Framework',
      teluguTitle: 'రోస్ 2 (రోబోట్ ఆపరేటింగ్ సిస్టమ్)',
      category: 'robot-tool',
      badge: 'INDUSTRIAL ROBOTICS',
      badgeColor: 'bg-slate-900 text-white',
      url: 'https://www.ros.org',
      description: 'Set of software libraries and tools that help you build robot applications: drivers, state-of-the-art algorithms, and powerful developer tools.',
      teluguDescription: 'ప్రపంచవ్యాప్తంగా టెస్లా, నాసా మరియు ఇస్రో ఇంజనీర్లు రోబోట్లను ప్రోగ్రామ్ చేయడానికి ఉపయోగించే ఫ్రేమ్‌వర్క్.',
      keyFeatures: ['DDS Real-time Middleware', 'Nav2 Autonomous Navigation', 'MoveIt Motion Planning', 'Gazebo Multi-robot Sim'],
      suggestedPrompt: 'Explain how ROS2 Nodes, Topics, and Services communicate in autonomous mobile robots.'
    }
  ];

  // Research Books Library
  const RESEARCH_BOOKS = [
    {
      id: 'book-autonomous-robots',
      title: 'Introduction to Autonomous Mobile Robots (MIT Press)',
      authors: 'Roland Siegwart, Illah Reza Nourbakhsh & Davide Scaramuzza',
      badge: 'MIT PRESS CLASSIC',
      badgeColor: 'bg-red-700 text-white',
      description: 'Comprehensive mathematical foundation for robot locomotion, kinematics, perception, localization (SLAM), and path planning.',
      topics: ['Differential Drive Kinematics', 'Kalman Filter Localization', 'Stereo Vision & LiDAR SLAM', 'A* & RRT Path Planning'],
      readUrl: 'https://mitpress.mit.edu/9780262015356/introduction-to-autonomous-mobile-robots/'
    },
    {
      id: 'book-modern-robotics',
      title: 'Modern Robotics: Mechanics, Planning, and Control (Cambridge)',
      authors: 'Kevin M. Lynch & Frank C. Park',
      badge: 'FREE OPEN ACCESS',
      badgeColor: 'bg-emerald-700 text-white',
      description: 'Modern geometric approach to kinematics and dynamics of open-chain robot arms, grasping, trajectory generation, and feedback control.',
      topics: ['Screw Theory & Lie Algebras', 'Forward & Inverse Kinematics', 'Dynamics of Manipulators', 'Robot Feedback Control'],
      readUrl: 'http://modernrobotics.org'
    },
    {
      id: 'book-drone-theory',
      title: 'Small Unmanned Aircraft: Theory and Practice (Princeton)',
      authors: 'Randal W. Beard & Timothy W. McLain',
      badge: 'DRONE BIBLE',
      badgeColor: 'bg-blue-700 text-white',
      description: 'Complete engineering guide to fixed-wing and multirotor unmanned aircraft aerodynamics, state estimation, autopilot design, and guidance.',
      topics: ['6-DOF Aerodynamic Equations', 'State Estimation via EKF', 'Longitudinal & Lateral Autopilots', 'Waypoint Following'],
      readUrl: 'https://press.princeton.edu/books/hardcover/9780691149219/small-unmanned-aircraft'
    },
    {
      id: 'book-pcb-design',
      title: 'Printed Circuit Board Design: Layout, EMI, and High-Speed Signal Integrity',
      authors: 'Mark I. Montrose & Eric Bogatin (IEEE Press)',
      badge: 'HARDWARE MASTERY',
      badgeColor: 'bg-purple-700 text-white',
      description: 'Techniques for routing multi-layer PCBs, minimizing electromagnetic interference (EMI), impedance matching, ground planes, and thermal dissipation.',
      topics: ['Return Current Pathing', 'Ground Plane Partitioning', 'High-speed Differential Traces', 'Bypass Capacitor Placement'],
      readUrl: 'https://ieeexplore.ieee.org/book/5237751'
    },
    {
      id: 'book-ai-robotics',
      title: 'Probabilistic Robotics (Intelligent Robotics and Autonomous Agents)',
      authors: 'Sebastian Thrun, Wolfram Burgard & Dieter Fox',
      badge: 'STANFORD / CARNEGIE',
      badgeColor: 'bg-amber-700 text-white',
      description: 'The definitive text on statistical techniques in robotics: occupancy grid mapping, particle filters, fastSLAM, and Markov decision processes.',
      topics: ['Bayesian Filters', 'Particle Filter Localization', 'FastSLAM 1.0 & 2.0', 'Reinforcement Learning in Robotics'],
      readUrl: 'https://www.probabilistic-robotics.org'
    }
  ];

  // Research Grants & Fundings
  const RESEARCH_FUNDINGS = [
    {
      id: 'funding-startup-india',
      agency: 'Government of India - DPIIT',
      title: 'Startup India Seed Fund Scheme (SISFS)',
      grantAmount: 'Up to ₹50 Lakhs (Grants + Debt)',
      badge: 'GOVT OF INDIA',
      badgeColor: 'bg-emerald-600 text-white',
      eligibility: 'Early-stage Indian startups with DPIIT recognition in hardware, robotics, drones, or clean tech.',
      url: 'https://seedfund.startupindia.gov.in',
      description: 'Financial assistance for proof of concept, prototype development, product trials, market entry, and commercialization.',
      focusAreas: ['Robotics & Automation', 'Drone Tech & Sensors', 'Agri-tech', 'Deep-Tech AI']
    },
    {
      id: 'funding-serb-dst',
      agency: 'Science and Engineering Research Board (SERB - DST India)',
      title: 'SERB Core Research Grant (CRG) & TARE Scheme',
      grantAmount: '₹30 Lakhs to ₹1.5 Crores',
      badge: 'SERB / DST',
      badgeColor: 'bg-blue-600 text-white',
      eligibility: 'Researchers, faculty, and collaborative deep-tech labs affiliated with recognized research institutes in India.',
      url: 'https://serbonline.in',
      description: 'Promotes investigator-centric research in science and engineering including advanced robotics, quantum circuits, and nano-materials.',
      focusAreas: ['Frontier Quantum Engineering', 'Advanced Drone Aerodynamics', 'Neuromorphic Circuits', 'Biomimetic Robots']
    },
    {
      id: 'funding-drdo-diaco',
      agency: 'DRDO - Directorate of Extramural Research & Intellectual Property',
      title: 'DRDO Dare to Dream 4.0 & Research Grants',
      grantAmount: 'Up to ₹1 Crore + DRDO Lab Incubation',
      badge: 'DEFENSE INNOVATION',
      badgeColor: 'bg-orange-700 text-white',
      eligibility: 'Individual innovators, startups, and academic institutions working on defense and dual-use aerospace technologies.',
      url: 'https://drdo.gov.in/dare-to-dream',
      description: 'Fosters indigenous innovation in swarm drones, anti-drone radar counter-measures, autonomous underwater systems, and micro-UAVs.',
      focusAreas: ['Swarm Drones & AI Flight', 'High-altitude VTOL', 'Ruggedized Mobile Robots', 'RF Jamming & Counter-UAS']
    },
    {
      id: 'funding-birac-big',
      agency: 'BIRAC (Biotechnology Industry Research Assistance Council)',
      title: 'Biotechnology Ignition Grant (BIG - Scheme)',
      grantAmount: 'Up to ₹50 Lakhs (100% Non-Dilutive Grant)',
      badge: '100% NON-DILUTIVE',
      badgeColor: 'bg-rose-700 text-white font-bold',
      eligibility: 'Researchers, entrepreneurs, and early-stage ventures in bio-robotics, assistive exoskeleton hardware, and med-tech.',
      url: 'https://birac.nic.in/big.php',
      description: 'Enables discovery and translation of innovative ideas into commercializable technologies with mentor networks.',
      focusAreas: ['Surgical Robotics', 'Brain-Machine Interfaces', 'Bio-inspired Drones', 'Prosthetic Robotic Arms']
    },
    {
      id: 'funding-nsf-sbir',
      agency: 'National Science Foundation (NSF - USA Global Program)',
      title: 'NSF America’s Seed Fund (SBIR / STTR Phase I & II)',
      grantAmount: '$275,000 to $2,000,000 USD',
      badge: 'GLOBAL PREMIER',
      badgeColor: 'bg-indigo-800 text-white',
      eligibility: 'Deep technology ventures tackling high-risk, high-reward technological discoveries.',
      url: 'https://seedfund.nsf.gov',
      description: 'Transforms scientific discovery into products and services with high societal and commercial impact without giving up equity.',
      focusAreas: ['Autonomous Systems', 'Advanced Semiconductor Hardware', 'Robotics & AI', 'Quantum Information']
    }
  ];

  // Calculate circuit simulator values
  const simCurrentMa = simLedResistance > 0 ? ((simCircuitVoltage - 2.0) / simLedResistance * 1000).toFixed(1) : '0';
  const isLedLit = circuitPowerOn && simCircuitVoltage >= 2.0 && parseFloat(simCurrentMa) > 0;
  const isLedBurned = parseFloat(simCurrentMa) > 30;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
                <span>RESEARCH WORLD • పరిశోధన ప్రపంచం • BLUEPRINT.IO CONNECTED</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                Research World: PCB, Robots, Drones & Global Fundings
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Complete engineering portal for Young Innovators & Super Researchers: Design printed circuit boards (PCBs), assemble and fly all drone types, build and program autonomous robots with live simulators, open-access research books, and apply for ₹50L+ national and global research grants.
              </p>
            </div>

            {/* Direct Quick Launch Button for Blueprint.io */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href="https://blueprint.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Open Blueprint.io Website</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => onAskAI?.('Guide me on how to design my first drone and PCB circuit board.')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Ask AI Research Mentor</span>
              </button>
            </div>
          </div>

          {/* Quick Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none border-t border-slate-800/80 mt-6">
            {[
              { id: 'pcb-circuits', label: '🔌 PCB & Circuits', count: '8 Tools', icon: Layers },
              { id: 'drones', label: '🚁 Drones Assembly & Sim', count: '6 Types', icon: Navigation },
              { id: 'robots', label: '🤖 Robots Assembly & Sim', count: '6 Types', icon: Bot },
              { id: 'simulators', label: '🎮 Live Run & Play Lab', count: 'Interactive', icon: Play },
              { id: 'books', label: '📚 Research Books & Papers', count: 'MIT & IEEE', icon: BookOpen },
              { id: 'future-fundings', label: '💰 World Researches & Fundings', count: '₹50L+ Grants', icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ResearchSubTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-md font-black'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: PCB CREATION, CIRCUITS, WIRINGS & SCHEMATICS                       */}
        {/* ========================================================================= */}
        {activeTab === 'pcb-circuits' && (
          <div className="space-y-8">
            {/* Blueprint.io Spotlight Card */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-indigo-700/40">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/40">
                    <Layers className="w-3.5 h-3.5" />
                    <span>FEATURED BLUEPRINT WEBLINK</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">Blueprint.io & Hardware Architecture Engine</h2>
                  <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                    Access Blueprint.io for visual hardware architecture planning, circuit block flowcharts, component bill-of-materials (BOM), and modular electronics schematics.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href="https://blueprint.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Launch Blueprint.io</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy('https://blueprint.io', 'blueprint-link')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-bold transition-all cursor-pointer"
                  >
                    {copiedId === 'blueprint-link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === 'blueprint-link' ? 'Copied Link!' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-800/50">
                <div className="bg-indigo-950/60 p-3.5 rounded-xl border border-indigo-800/40">
                  <h4 className="font-bold text-sm text-indigo-200">1. System Block Diagrams</h4>
                  <p className="text-xs text-slate-300 mt-1">Connect MCUs, power rails, I2C/SPI sensors, and motor drivers visually.</p>
                </div>
                <div className="bg-indigo-950/60 p-3.5 rounded-xl border border-indigo-800/40">
                  <h4 className="font-bold text-sm text-indigo-200">2. Real-time BOM Calculation</h4>
                  <p className="text-xs text-slate-300 mt-1">Track unit component costs, package sizes (0805, 0603, QFN), and supplier lead times.</p>
                </div>
                <div className="bg-indigo-950/60 p-3.5 rounded-xl border border-indigo-800/40">
                  <h4 className="font-bold text-sm text-indigo-200">3. Rapid Hardware Prototyping</h4>
                  <p className="text-xs text-slate-300 mt-1">From initial napkin sketch to production-ready design requirements in hours.</p>
                </div>
                <div className="bg-indigo-950/60 p-3.5 rounded-xl border border-indigo-800/40">
                  <h4 className="font-bold text-sm text-indigo-200">4. Team Collaboration</h4>
                  <p className="text-xs text-slate-300 mt-1">Share live project blueprints with engineers, teachers, and manufacturing partners.</p>
                </div>
              </div>
            </div>

            {/* Step-by-Step: How to Prepare, Design & Fabricate a Custom PCB */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Step-by-Step: How to Design & Fabricate a PCB</h3>
                  <p className="text-xs sm:text-sm text-slate-500">From breadboard wiring to manufactured multi-layer fiberglass board</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    step: 'Step 1',
                    title: 'Schematic Capture',
                    desc: 'Select components (microcontroller, resistors, voltage regulator). Connect pins using net labels to define electrical connectivity.',
                    tip: 'Always add 0.1μF decoupling capacitors near every VCC pin!'
                  },
                  {
                    step: 'Step 2',
                    title: 'Footprint Assignment',
                    desc: 'Assign physical dimensions (SMD vs Through-Hole). Match package sizes like SOP-8, QFP-32, or standard 2.54mm pin headers.',
                    tip: 'Use standard 0805 SMD resistors for easy hand soldering.'
                  },
                  {
                    step: 'Step 3',
                    title: 'Board Layout & Routing',
                    desc: 'Arrange parts logically. Keep high-current motor traces thick (30-50 mil). Run a continuous bottom ground plane for noise immunity.',
                    tip: 'Avoid 90-degree right angles; use 45-degree mitered bends.'
                  },
                  {
                    step: 'Step 4',
                    title: 'DRC & Gerber Export',
                    desc: 'Run Design Rule Check (DRC) for clearance violations. Generate Gerber RS-274X zip and send to JLCPCB or PCBWay for $2 prototyping.',
                    tip: 'Verify drill files and silkscreen text readability!'
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {s.step}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-2">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-amber-800 font-medium">
                      💡 <strong>Pro Tip:</strong> {s.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PCB & Circuit Design Web Tools Directory */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900">
                  PCB Creation & Circuit Simulation Web Platforms
                </h3>
                <span className="text-xs text-slate-500 font-semibold">Direct launch web links</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TOOLS_LIST.filter(t => t.category === 'pcb' || t.category === 'circuits').map(tool => (
                  <div key={tool.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                        <button
                          onClick={() => handleCopy(tool.url, tool.id)}
                          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                          title="Copy Link"
                        >
                          {copiedId === tool.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <h4 className="font-black text-slate-900 text-base">{tool.title}</h4>
                      <p className="text-[11px] text-emerald-700 font-medium">{tool.teluguTitle}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{tool.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tool.keyFeatures.map((f, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>Open Tool</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onAskAI?.(tool.suggestedPrompt)}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                        title="Ask AI about this tool"
                      >
                        Ask AI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DRONES ENGINEERING, ASSEMBLY & PLAY                                */}
        {/* ========================================================================= */}
        {activeTab === 'drones' && (
          <div className="space-y-8">
            {/* Header intro */}
            <div className="bg-gradient-to-r from-cyan-900 via-sky-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 mb-3">
                <Navigation className="w-3.5 h-3.5" />
                <span>DRONE AERODYNAMICS & AUTOPILOT SUITE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">All Types of Drones: Assembly, Wiring & Run</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Learn end-to-end drone engineering: from carbon fiber frame assembly, brushless motor soldering, electronic speed controllers (ESC), to Betaflight & ArduPilot tuning, FPV video transmission, and GPS waypoint autonomous flight.
              </p>
            </div>

            {/* 6 Drone Types Showcase */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4">6 Major Drone Architectures & Assembly Configurations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    id: 'fpv-racing',
                    title: '5-Inch FPV Freestyle / Racing Quadcopter',
                    badge: 'SPEED: 140+ KM/H',
                    badgeColor: 'bg-rose-600 text-white',
                    frame: '215mm 3K Carbon Fiber Unibody',
                    motors: '4x 2207 1950KV Brushless Motors',
                    esc: '45A-55A 4-in-1 BLHeli_32 ESC',
                    fc: 'STM32 F722 Flight Controller with ICM-42688P Gyro',
                    battery: '6S 1300mAh 120C LiPo Battery',
                    video: 'HD Digital VTX (Walksnail / DJI O3) or 5.8GHz Analog',
                    wiringGuide: 'Connect 4 motor wires to ESC pads in correct sequence. Power FC via 9V/12V filtered BEC. Wire SBUS/CRSF receiver to UART2 RX.',
                    runLink: 'https://app.betaflight.com',
                    runLinkLabel: 'Betaflight Web Config'
                  },
                  {
                    id: 'gps-autonomous',
                    title: 'Autonomous GPS Mapping & Surveillance Drone',
                    badge: 'AUTONOMOUS MISSIONS',
                    badgeColor: 'bg-teal-600 text-white',
                    frame: '450mm Folding Quad Frame',
                    motors: '4x 2212 920KV Motors with 1045 Propellers',
                    esc: '30A SimonK / BLHeli Opto ESCs',
                    fc: 'Pixhawk 4 / Cube Orange with ArduPilot',
                    battery: '4S 5200mAh LiPo for 25-minute flight time',
                    video: '4K Gimbal Camera with 2.4GHz Telemetry Radio',
                    wiringGuide: 'GPS/Compass module on mast wired to I2C and UART1. Telemetry radio module on Telem1. Power module measures voltage & current directly.',
                    runLink: 'https://ardupilot.org/planner/',
                    runLinkLabel: 'Mission Planner Software'
                  },
                  {
                    id: 'heavy-hexacopter',
                    title: 'Heavy-Lift Industrial Hexacopter (6-Rotor)',
                    badge: 'PAYLOAD: 5-10 KG',
                    badgeColor: 'bg-indigo-600 text-white',
                    frame: '680mm - 960mm Hexacopter Carbon Chassis',
                    motors: '6x 4114 400KV High-Torque Brushless Motors',
                    esc: '6x 60A High Voltage (HV) ESCs',
                    fc: 'Dual Redundant IMU Flight Controller (PX4 / ArduPilot)',
                    battery: '12S (2x 6S in series) 16000mAh Solid-State / LiPo',
                    video: 'Dual FPV Pilot Cam + Thermal Radiometric Sensor',
                    wiringGuide: 'Heavy-duty Power Distribution Board with anti-spark XT90-S connectors. Dedicated dual BEC for flight computers and RTK GPS.',
                    runLink: 'https://px4.io',
                    runLinkLabel: 'PX4 Autopilot Portal'
                  },
                  {
                    id: 'vtol-hybrid',
                    title: 'Fixed-Wing VTOL (Vertical Takeoff & Landing) Drone',
                    badge: 'LONG RANGE: 80+ KM',
                    badgeColor: 'bg-amber-600 text-white font-bold',
                    frame: 'EPO Foam Aerodynamic Fuselage with Carbon Spars',
                    motors: '4x VTOL Hover Motors + 1x Pusher Forward Cruise Motor',
                    esc: 'Custom 5-channel ESC array',
                    fc: 'Matek F405-VTOL / Pixhawk with ArduPlane',
                    battery: '6S 21700 Li-Ion 4S4P Long Endurance Pack',
                    video: 'Long-range 915MHz ExpressLRS & 4G/LTE Cloud Link',
                    wiringGuide: 'Separate VTOL hover motors from forward flight motor. Wing servos connect to PWM channels 1-4 for Aileron, Elevator, Rudder, Flaps.',
                    runLink: 'https://ardupilot.org/plane/',
                    runLinkLabel: 'ArduPlane Firmware'
                  },
                  {
                    id: 'micro-whoop',
                    title: 'Indoor Micro Tiny Whoop (CineWhoop Safe Propeller)',
                    badge: 'SAFE FOR KIDS INDOORS',
                    badgeColor: 'bg-emerald-600 text-white',
                    frame: '65mm-75mm Ducted Polycarbonate Protective Frame',
                    motors: '4x 0802 19000KV Micro Brushless Motors',
                    esc: '5A All-In-One (AIO) integrated on FC board',
                    fc: 'AIO F4 1S Flight Controller with Built-in ExpressLRS Rx',
                    battery: '1S 300mAh - 450mAh High-Voltage LiHV (4.35V)',
                    video: 'Nano 800TVL Camera with 25mW-400mW 5.8GHz VTX',
                    wiringGuide: 'Single-board AIO: No separate ESC wiring needed! Motor plugs connect directly into board sockets. Solder LiHV battery pigtail.',
                    runLink: 'https://fpv-freerider.itch.io/fpv-freerider',
                    runLinkLabel: 'Play Free Flight Sim'
                  },
                  {
                    id: 'delivery-agri',
                    title: 'Agricultural Crop Spraying & Emergency Delivery Drone',
                    badge: 'AGRI SPRAY TANK',
                    badgeColor: 'bg-green-700 text-white',
                    frame: 'Waterproof Dustproof Octocopter Frame (IP67)',
                    motors: '8x 8318 100KV Industrial Water-resistant Motors',
                    esc: '80A FOC (Field Oriented Control) Sine-Wave ESCs',
                    fc: 'Agricultural Smart Controller with Obstacle Radar',
                    battery: '14S 22000mAh Smart Battery with BMS display',
                    video: 'Front & Rear Starlight FPV Cameras with Searchlight',
                    wiringGuide: 'Centrifugal spray nozzles wired through 12V relay controlled by FC aux channel. Terrain-following millimeter-wave radar wired via CAN bus.',
                    runLink: 'https://www.agriflight.in',
                    runLinkLabel: 'Agri Drone Guidelines'
                  }
                ].map(drone => (
                  <div key={drone.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${drone.badgeColor}`}>
                          {drone.badge}
                        </span>
                      </div>

                      <h4 className="font-black text-slate-900 text-base">{drone.title}</h4>

                      {/* Specs */}
                      <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                        <p><strong className="text-slate-800">Frame:</strong> {drone.frame}</p>
                        <p><strong className="text-slate-800">Motors:</strong> {drone.motors}</p>
                        <p><strong className="text-slate-800">ESC:</strong> {drone.esc}</p>
                        <p><strong className="text-slate-800">Flight Controller:</strong> {drone.fc}</p>
                        <p><strong className="text-slate-800">Battery:</strong> {drone.battery}</p>
                      </div>

                      {/* Wiring Preparation */}
                      <div className="mt-3 text-xs bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200">
                        <span className="font-bold">⚡ Wiring & Preparation:</span> {drone.wiringGuide}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={drone.runLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-sky-600" />
                        <span>{drone.runLinkLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedDroneType(drone.id);
                          setActiveTab('simulators');
                        }}
                        className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Test Run
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ROBOTS ASSEMBLY & SIMULATION                                       */}
        {/* ========================================================================= */}
        {activeTab === 'robots' && (
          <div className="space-y-8">
            {/* Header intro */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 mb-3">
                <Bot className="w-3.5 h-3.5" />
                <span>ROBOTICS ENGINEERING & KINEMATICS LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">All Types of Robots: Assembly, Wiring & Run</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                From autonomous 4WD rovers, 2-wheel inverted-pendulum balancing robots, to 6-DOF robotic arms and 12-servo quadruped robo-dogs. Complete with motor driver schematics, Arduino/ESP32 pin connections, and physics simulators.
              </p>
            </div>

            {/* 6 Robot Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  id: 'rover-4wd',
                  title: '4-Wheel Drive Autonomous Obstacle Avoider Rover',
                  badge: 'BEGINNER TO ADVANCED',
                  badgeColor: 'bg-emerald-600 text-white',
                  chassis: 'Dual-plate Acrylic / Aluminum 4WD Chassis',
                  mcu: 'Arduino Uno / ESP32 with WiFi & Bluetooth',
                  motors: '4x TT Geared DC Motors with Rubber Wheels',
                  driver: 'L298N Dual H-Bridge or TB6612FNG High Efficiency',
                  sensors: 'HC-SR04 Ultrasonic Sensor on SG90 Servo Scanner + 2x IR Sensors',
                  power: '2x 18650 Li-ion cells (7.4V) with BMS protection',
                  wiring: 'L298N IN1-IN4 to Arduino Digital Pins 5,6,9,10 (PWM). HC-SR04 Trig to Pin 11, Echo to Pin 12. Servo signal to Pin 3.',
                  codeLink: 'https://wokwi.com',
                  codeLinkLabel: 'Wokwi Simulator'
                },
                {
                  id: 'robotic-arm-6dof',
                  title: '6-DOF Articulated Robotic Arm with Gripper',
                  badge: 'INVERSE KINEMATICS',
                  badgeColor: 'bg-indigo-600 text-white',
                  chassis: 'Anodized Aluminum Alloy Bracket Assembly',
                  mcu: 'ESP32 / Raspberry Pi with PCA9685 16-Channel PWM Driver',
                  motors: '6x MG996R Metal Gear High-Torque Servos (13 kg-cm)',
                  driver: 'PCA9685 I2C 12-bit PWM Controller',
                  sensors: 'End-Effector Force Sensor + Micro USB Camera for Vision',
                  power: '5V 10A Dedicated Switching Power Supply for Servos',
                  wiring: 'PCA9685 SDA/SCL to ESP32 GPIO 21/22. Connect shared ground between ESP32 and external 5V servo supply. Servos plug into channels 0 to 5.',
                  codeLink: 'https://moveit.ros.org',
                  codeLinkLabel: 'MoveIt Motion Planner'
                },
                {
                  id: 'self-balancing',
                  title: '2-Wheel Self-Balancing Inverted Pendulum Robot',
                  badge: 'PID CONTROL LOOP',
                  badgeColor: 'bg-purple-600 text-white',
                  chassis: 'Vertical Multi-Tier Carbon Fiber Frame',
                  mcu: 'STM32 Blue Pill / ESP32 @ 240MHz',
                  motors: '2x JGA25-371 Geared Motors with Optical Quadrature Encoders',
                  driver: 'DRV8833 or A4988 Stepper Driver Modules',
                  sensors: 'MPU-6050 6-Axis Gyroscope & Accelerometer (I2C 400kHz)',
                  power: '3S 11.1V 1000mAh LiPo Battery with LM2596 5V Buck',
                  wiring: 'MPU6050 INT pin to Arduino INT0 (Pin 2) for 100Hz DMP interrupt. Encoder A/B channels to hardware timer pins for precise velocity tracking.',
                  codeLink: 'https://www.falstad.com/circuit/',
                  codeLinkLabel: 'Falstad PID Circuit'
                },
                {
                  id: 'quadruped-dog',
                  title: 'SpotMicro 12-Servo Quadruped Robot Dog',
                  badge: 'BIOMIMETIC GAITS',
                  badgeColor: 'bg-amber-600 text-white font-bold',
                  chassis: '3D Printed PLA/PETG Biomimetic Skeleton',
                  mcu: 'Raspberry Pi 4 (High-Level Gait) + Teensy 4.0 (Servo Control)',
                  motors: '12x High-Speed Coreless Servos (3 per leg: Coeur, Femur, Tibia)',
                  driver: 'Dual PCA9685 I2C Boards or Custom CAN-Bus Bus Servos',
                  sensors: 'Intel RealSense D435i Depth Camera + 9-Axis IMU BNO055',
                  power: '7.4V 2S 4000mAh 40C High-Discharge LiPo',
                  wiring: '12 Servos wired to PWM outputs 0-11. RPi talks to Teensy over 1Mbps UART serial for inverse kinematics gait coordinate streaming.',
                  codeLink: 'https://cyberbotics.com',
                  codeLinkLabel: 'Webots Robot Dog Sim'
                },
                {
                  id: 'biped-humanoid',
                  title: 'Biped Walking Humanoid Robot with Voice Interaction',
                  badge: 'HUMANOID AI',
                  badgeColor: 'bg-rose-600 text-white',
                  chassis: '17-DOF Full Body Humanoid Joint Structure',
                  mcu: 'Jetson Nano / Raspberry Pi 5 + ESP32 Sub-controller',
                  motors: '17x High-Precision Serial Bus Servos (Half-Duplex UART)',
                  driver: 'Bus Servo Distribution Hub with Current Feedback',
                  sensors: 'Microphone Array for Speech + Wide-Angle Vision Camera',
                  power: '11.1V 3S 3000mAh LiPo with Dual Step-Down Regulators',
                  wiring: 'Daisy-chained serial bus servos communicate via single TX/RX wire. Jetson runs computer vision (OpenCV) and sends gait commands.',
                  codeLink: 'https://www.ros.org',
                  codeLinkLabel: 'ROS2 Humanoid Stack'
                },
                {
                  id: 'esp32-cam-rover',
                  title: 'WiFi Telepresence Surveillance & Inspection Rover',
                  badge: 'LIVE VIDEO STREAM',
                  badgeColor: 'bg-teal-600 text-white',
                  chassis: 'Tank Treads / Continuous Rubber Belt Drive Chassis',
                  mcu: 'ESP32-CAM (AI-Thinker) with OV2640 2MP Camera',
                  motors: '2x High-Torque N20 Micro Metal Gearmotors',
                  driver: 'DRV8833 Dual H-Bridge Low-Voltage Driver',
                  sensors: 'Ultra-bright White LED Flashlight + DHT11 Temp/Humidity',
                  power: 'Single 18650 Li-ion 3.7V with MT3608 Step-Up Boost to 5V',
                  wiring: 'DRV8833 inputs to ESP32 GPIO 12, 13, 14, 15. Flash LED on GPIO 4. Access stream via web browser at http://192.168.x.x:81/stream.',
                  codeLink: 'https://wokwi.com',
                  codeLinkLabel: 'Wokwi ESP32-CAM Sim'
                }
              ].map(robot => (
                <div key={robot.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${robot.badgeColor}`}>
                      {robot.badge}
                    </span>
                    <h4 className="font-black text-slate-900 text-base mt-2">{robot.title}</h4>

                    <div className="mt-3 space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                      <p><strong className="text-slate-800">Chassis:</strong> {robot.chassis}</p>
                      <p><strong className="text-slate-800">Controller:</strong> {robot.mcu}</p>
                      <p><strong className="text-slate-800">Motors:</strong> {robot.motors}</p>
                      <p><strong className="text-slate-800">Driver:</strong> {robot.driver}</p>
                      <p><strong className="text-slate-800">Sensors:</strong> {robot.sensors}</p>
                    </div>

                    <div className="mt-3 text-xs bg-emerald-50 text-emerald-950 p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold">⚡ Wiring & Schematics:</span> {robot.wiring}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={robot.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{robot.codeLinkLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => {
                        setSelectedRobotType(robot.id);
                        setActiveTab('simulators');
                      }}
                      className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Simulate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: INTERACTIVE "RUN & PLAY" SIMULATORS (DRONE, ROBOT, CIRCUIT)       */}
        {/* ========================================================================= */}
        {activeTab === 'simulators' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-400/40 mb-3">
                <Play className="w-3.5 h-3.5 text-purple-400" />
                <span>VIRTUAL HARDWARE LAB • RUN, TEST & PLAY DIRECTLY IN BROWSER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Interactive Virtual Engineering Simulators</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Test drone throttles, adjust 3-joint robotic arm inverse kinematics, and simulate live Ohm’s law LED circuit wirings in real time right in this portal!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulator 1: Drone Flight & Motor RPM Simulator */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800">
                      🚁 DRONE MOTOR & FLIGHT SIM
                    </span>
                    <button
                      onClick={() => setDroneArmed(!droneArmed)}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        droneArmed ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {droneArmed ? 'ARMED (MOTORS LIVE)' : 'DISARMED'}
                    </button>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg">Quadcopter Flight & RPM Controller</h3>
                  <p className="text-xs text-slate-500 mt-1">Adjust throttle, pitch, and roll to observe motor RPM distribution.</p>

                  {/* 4 Motors Graphic */}
                  <div className="my-6 bg-slate-900 rounded-xl p-5 relative h-48 flex items-center justify-center text-white">
                    {/* Drone Frame X */}
                    <div className="absolute w-36 h-36 border-2 border-dashed border-slate-700 rotate-45 pointer-events-none" />
                    
                    {/* Motor 1: Front-Right (CCW) */}
                    <div className="absolute top-3 right-3 text-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        droneArmed ? 'border-cyan-400 bg-cyan-950 text-cyan-300 animate-spin' : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}>
                        M1
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {droneArmed ? `${Math.round(droneThrottle * 220 + dronePitch * 10 - droneRoll * 10)} RPM` : '0 RPM'}
                      </span>
                    </div>

                    {/* Motor 2: Rear-Right (CW) */}
                    <div className="absolute bottom-3 right-3 text-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        droneArmed ? 'border-cyan-400 bg-cyan-950 text-cyan-300 animate-spin' : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}>
                        M2
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {droneArmed ? `${Math.round(droneThrottle * 220 - dronePitch * 10 - droneRoll * 10)} RPM` : '0 RPM'}
                      </span>
                    </div>

                    {/* Motor 3: Rear-Left (CCW) */}
                    <div className="absolute bottom-3 left-3 text-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        droneArmed ? 'border-cyan-400 bg-cyan-950 text-cyan-300 animate-spin' : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}>
                        M3
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {droneArmed ? `${Math.round(droneThrottle * 220 - dronePitch * 10 + droneRoll * 10)} RPM` : '0 RPM'}
                      </span>
                    </div>

                    {/* Motor 4: Front-Left (CW) */}
                    <div className="absolute top-3 left-3 text-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        droneArmed ? 'border-cyan-400 bg-cyan-950 text-cyan-300 animate-spin' : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}>
                        M4
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {droneArmed ? `${Math.round(droneThrottle * 220 + dronePitch * 10 + droneRoll * 10)} RPM` : '0 RPM'}
                      </span>
                    </div>

                    {/* Center Flight Controller */}
                    <div className="bg-indigo-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
                      <Navigation className="w-5 h-5 text-white transform -rotate-45" />
                      <span className="text-[8px] font-black">FC STM32</span>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Throttle (Power)</span>
                        <span className="font-mono">{droneThrottle}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={droneThrottle}
                        onChange={e => setDroneThrottle(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Pitch (Forward / Back)</span>
                        <span className="font-mono">{dronePitch > 0 ? `+${dronePitch}°` : `${dronePitch}°`}</span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        value={dronePitch}
                        onChange={e => setDronePitch(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Roll (Left / Right)</span>
                        <span className="font-mono">{droneRoll > 0 ? `+${droneRoll}°` : `${droneRoll}°`}</span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        value={droneRoll}
                        onChange={e => setDroneRoll(Number(e.target.value))}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Live Status: {droneArmed ? (droneThrottle > 50 ? '🛫 Climbing Altitude' : 'Hovering') : '🛑 Ready on Pad'}</span>
                  <button
                    onClick={() => {
                      setDroneThrottle(45);
                      setDronePitch(0);
                      setDroneRoll(0);
                    }}
                    className="text-cyan-700 font-bold hover:underline cursor-pointer"
                  >
                    Reset Trim
                  </button>
                </div>
              </div>

              {/* Simulator 2: 3-Joint Robot Arm Controller */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      🤖 ROBOTIC ARM INVERSE KINEMATICS
                    </span>
                    <button
                      onClick={() => setRobotGripperClosed(!robotGripperClosed)}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        robotGripperClosed ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {robotGripperClosed ? 'GRIPPER CLOSED' : 'GRIPPER OPEN'}
                    </button>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg">3-DOF Articulated Arm Simulation</h3>
                  <p className="text-xs text-slate-500 mt-1">Control base rotation, shoulder pitch, and elbow angle.</p>

                  {/* Robot Arm Visual Canvas */}
                  <div className="my-6 bg-slate-950 rounded-xl p-5 h-48 flex items-center justify-center relative overflow-hidden text-white">
                    {/* Coordinate Grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

                    {/* Robot Visual Representation */}
                    <div className="relative flex flex-col items-center">
                      {/* End-Effector Gripper */}
                      <div 
                        style={{
                          transform: `translate(${Math.sin((robotArmElbow * Math.PI) / 180) * 30}px, -${Math.cos((robotArmShoulder * Math.PI) / 180) * 30}px)`
                        }}
                        className="transition-transform duration-200"
                      >
                        <div className={`px-2.5 py-1 rounded text-[10px] font-black border flex items-center gap-1 ${
                          robotGripperClosed ? 'bg-amber-500 text-slate-950 border-amber-300' : 'bg-emerald-600 text-white border-emerald-400'
                        }`}>
                          <span>{robotGripperClosed ? '✊ Gripping Object' : '🖐️ Open Claw'}</span>
                        </div>
                      </div>

                      {/* Forearm Link */}
                      <div 
                        style={{ transform: `rotate(${robotArmElbow - 45}deg)` }}
                        className="w-2.5 h-14 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-full shadow-lg transition-transform duration-200"
                      />

                      {/* Elbow Joint Servo */}
                      <div className="w-5 h-5 rounded-full bg-indigo-300 border-2 border-indigo-700 -my-1 z-10" />

                      {/* Upper Arm Link */}
                      <div 
                        style={{ transform: `rotate(${robotArmShoulder - 45}deg)` }}
                        className="w-3 h-14 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full shadow-lg transition-transform duration-200"
                      />

                      {/* Base Turntable */}
                      <div className="w-24 h-4 bg-slate-700 rounded-full border border-slate-500 shadow-md mt-1 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-slate-300">BASE: {robotBaseAngle}°</span>
                      </div>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Base Turntable Servo</span>
                        <span className="font-mono">{robotBaseAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        value={robotBaseAngle}
                        onChange={e => setRobotBaseAngle(Number(e.target.value))}
                        className="w-full accent-slate-800 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Shoulder Angle (MG996R)</span>
                        <span className="font-mono">{robotArmShoulder}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        value={robotArmShoulder}
                        onChange={e => setRobotArmShoulder(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Elbow Angle (MG996R)</span>
                        <span className="font-mono">{robotArmElbow}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        value={robotArmElbow}
                        onChange={e => setRobotArmElbow(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">PCA9685 I2C Pulse: {Math.round(150 + (robotBaseAngle / 180) * 450)}μs</span>
                  <button
                    onClick={() => {
                      setRobotBaseAngle(90);
                      setRobotArmShoulder(45);
                      setRobotArmElbow(60);
                      setRobotGripperClosed(false);
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Reset Arm Home
                  </button>
                </div>
              </div>

              {/* Simulator 3: Ohm's Law Circuit & LED Current Flow */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      ⚡ OHM'S LAW CIRCUIT SIM
                    </span>
                    <button
                      onClick={() => setCircuitPowerOn(!circuitPowerOn)}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        circuitPowerOn ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {circuitPowerOn ? 'POWER: ON' : 'POWER: OFF'}
                    </button>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg">Virtual Breadboard LED Circuit</h3>
                  <p className="text-xs text-slate-500 mt-1">Calculate live current: I = (V_source - V_led) / R</p>

                  {/* Circuit Visual */}
                  <div className="my-6 bg-slate-900 rounded-xl p-5 h-48 flex items-center justify-around text-white relative">
                    {/* Battery */}
                    <div className="text-center">
                      <div className="w-12 h-20 bg-slate-800 border-2 border-amber-400 rounded-lg flex flex-col items-center justify-center p-1">
                        <span className="text-xs font-black text-amber-400">{simCircuitVoltage}V</span>
                        <span className="text-[9px] text-slate-400">DC SUPPLY</span>
                      </div>
                    </div>

                    {/* Resistor */}
                    <div className="text-center">
                      <div className="px-3 py-2 bg-amber-950 border border-amber-600 rounded text-xs font-mono font-bold text-amber-200">
                        {simLedResistance} Ω
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 block">Current Limiter</span>
                    </div>

                    {/* LED Bulb */}
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        isLedBurned 
                          ? 'bg-rose-900 border-rose-500 text-white shadow-lg shadow-rose-500/50' 
                          : isLedLit 
                            ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-lg shadow-emerald-400/50 animate-pulse' 
                            : 'bg-slate-800 border-slate-600 text-slate-500'
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] mt-1 block font-bold">
                        {isLedBurned ? '💥 BURNED OUT (>30mA)' : isLedLit ? '✨ GLOWING BRIGHT' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* Voltage & Resistance Sliders */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>DC Source Voltage</span>
                        <span className="font-mono">{simCircuitVoltage.toFixed(1)} Volts</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="0.5"
                        value={simCircuitVoltage}
                        onChange={e => setSimCircuitVoltage(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Resistor Value</span>
                        <span className="font-mono">{simLedResistance} Ohms (Ω)</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="10"
                        value={simLedResistance}
                        onChange={e => setSimLedResistance(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-700">
                    Current: <strong>{circuitPowerOn ? simCurrentMa : '0'} mA</strong> (Ideal: 15-20mA)
                  </span>
                  <button
                    onClick={() => {
                      setSimCircuitVoltage(5.0);
                      setSimLedResistance(220);
                      setCircuitPowerOn(true);
                    }}
                    className="text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    Reset (5V / 220Ω)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RESEARCH BOOKS & SCHOLARLY PAPERS                                 */}
        {/* ========================================================================= */}
        {activeTab === 'books' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-400/40 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SCHOLARLY RESEARCH REPOSITORIES & CLASSIC TEXTBOOKS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Open-Access Research Books & Papers</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Curated foundational texts across autonomous mobile robotics, aerospace aerodynamic theory, high-speed PCB electromagnetic compliance, and IEEE open repositories.
              </p>
            </div>

            {/* Direct Open Research Portals Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'arXiv Robotics', url: 'https://arxiv.org/list/cs.RO/recent', label: 'Latest Preprints' },
                { name: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org', label: 'Peer-Reviewed' },
                { name: 'Google Scholar', url: 'https://scholar.google.com', label: 'Citations & Papers' },
                { name: 'NASA Technical Reports', url: 'https://ntrs.nasa.gov', label: 'Aerospace & Avionics' },
                { name: 'ISRO Research', url: 'https://www.isro.gov.in', label: 'Space Tech Missions' },
                { name: 'Springer Open', url: 'https://link.springer.com', label: 'Open Journals' }
              ].map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all text-center group cursor-pointer"
                >
                  <p className="font-black text-xs text-slate-800 group-hover:text-indigo-600 transition-colors">{portal.name}</p>
                  <span className="text-[10px] text-slate-500">{portal.label}</span>
                </a>
              ))}
            </div>

            {/* Book Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {RESEARCH_BOOKS.map(book => (
                <div key={book.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${book.badgeColor}`}>
                      {book.badge}
                    </span>
                    <h4 className="font-black text-slate-900 text-lg mt-2">{book.title}</h4>
                    <p className="text-xs text-indigo-700 font-semibold mt-0.5">Author(s): {book.authors}</p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">{book.description}</p>

                    <div className="mt-4">
                      <span className="text-[11px] font-bold text-slate-700">Core Topics Covered:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {book.topics.map((t, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                            • {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>Access Book / Publisher Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onAskAI?.(`Summarize the core concepts in ${book.title}`)}
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Summarize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: FUTURE & TODAY WORLD RESEARCHES & FUNDINGS                         */}
        {/* ========================================================================= */}
        {activeTab === 'future-fundings' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 mb-3">
                <DollarSign className="w-3.5 h-3.5" />
                <span>RESEARCH FUNDING & FUTURE HORIZONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Future World Researches & Non-Dilutive Grants</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Explore where the next frontier of human knowledge is expanding, from solid-state battery chemistry to humanoid general robotics, along with verified government grants from ₹50 Lakhs to $2M USD to fund your technological prototypes.
              </p>
            </div>

            {/* 4 Future Tech Frontier Spotlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Neuromorphic Silicon Chips',
                  time: '2025 - 2030',
                  desc: 'Brain-inspired spiking neural network microprocessors that consume 1/1000th the power of GPUs for edge drone vision.',
                  color: 'border-indigo-300 bg-indigo-50/50 text-indigo-900'
                },
                {
                  title: 'Solid-State Drone Batteries',
                  time: 'Commercialization Stage',
                  desc: 'Energy densities exceeding 450 Wh/kg providing 2x to 3x longer flight times for delivery and emergency medical UAVs.',
                  color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900'
                },
                {
                  title: 'Swarm Autonomous Robotics',
                  time: 'Active Deployment',
                  desc: 'Decentralized peer-to-peer mesh networking enabling 50+ micro-drones to cooperate without central server commands.',
                  color: 'border-amber-300 bg-amber-50/50 text-amber-900'
                },
                {
                  title: 'Biomimetic Exoskeletons',
                  time: 'Clinical Trials',
                  desc: 'Pneumatic artificial muscle actuators and surface EMG sensors helping patients walk and industrial workers lift safely.',
                  color: 'border-rose-300 bg-rose-50/50 text-rose-900'
                }
              ].map((frontier, i) => (
                <div key={i} className={`p-4 rounded-xl border ${frontier.color}`}>
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-1">
                    <span>{frontier.time}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{frontier.title}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{frontier.desc}</p>
                </div>
              ))}
            </div>

            {/* Grants & Funding Opportunities List */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4">
                Verified Research Fundings & Government Grants (India & Global)
              </h3>

              <div className="space-y-4">
                {RESEARCH_FUNDINGS.map(grant => (
                  <div key={grant.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${grant.badgeColor}`}>
                            {grant.badge}
                          </span>
                          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            💰 {grant.grantAmount}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">• {grant.agency}</span>
                        </div>

                        <h4 className="font-black text-slate-900 text-lg">{grant.title}</h4>
                        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">{grant.description}</p>
                        
                        <div className="text-xs text-slate-700 pt-1">
                          <strong>Eligibility:</strong> {grant.eligibility}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {grant.focusAreas.map((f, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              🎯 {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <a
                          href={grant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer"
                        >
                          <span>Apply / Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => onAskAI?.(`Help me draft a grant proposal for ${grant.title} focusing on robotics and drone development.`)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                        >
                          Proposal Guidance
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
