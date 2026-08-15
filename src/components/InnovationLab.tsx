import React, { useState } from 'react';
import { INNOVATION_PROJECTS } from '../data/mockData';
import { InnovationProject } from '../types';
import { 
  Cpu, 
  Zap, 
  ShieldAlert, 
  Sparkles, 
  Code, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Wrench, 
  Layers,
  Box,
  Activity,
  Globe,
  ExternalLink,
  Video,
  FileCode,
  FlaskConical,
  Compass,
  Atom
} from 'lucide-react';

interface InnovationLabProps {
  onAskAIRobotics: (projectTitle?: string) => void;
}

export const InnovationLab: React.FC<InnovationLabProps> = ({ onAskAIRobotics }) => {
  const [activeProject, setActiveProject] = useState<InnovationProject>(INNOVATION_PROJECTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<'te' | 'hi' | 'en'>('te');
  const [labSubTab, setLabSubTab] = useState<'workbench' | 'real_lab' | '3d_prototype'>('workbench');

  // Interactive Circuit Simulator State
  const [batteryConnected, setBatteryConnected] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [sensorTriggered, setSensorTriggered] = useState(false);

  const categories = ['All', 'Robotics', 'Drone', 'Electronics & Circuit', 'Coding', 'Physics Lab', 'Chemistry Lab', 'Maths Visualizer'];

  const realLabResources = [
    {
      title: 'Virtual Physics & Electronics Tinkercad Lab',
      teluguTitle: '3D ఫిజిక్స్ & ఎలక్ట్రానిక్స్ వర్చువల్ ల్యాబ్',
      category: 'Electronics & 3D Wiring',
      desc: 'Free 3D circuit builder, Arduino simulation, and 3D design workspace for school students.',
      url: 'https://www.tinkercad.com/',
      badge: '3D & Circuit Simulator'
    },
    {
      title: 'PhET Interactive Science & Math Simulations',
      teluguTitle: 'ఫిజిక్స్, కెమిస్ట్రీ & మ్యాథ్స్ యానిమేషన్స్',
      desc: 'University of Colorado free interactive physics, chemistry, biology, and maths labs.',
      url: 'https://phet.colorado.edu/',
      category: 'Physics & Chemistry',
      badge: 'Interactive Real Lab'
    },
    {
      title: 'Falstad Circuit Simulator',
      teluguTitle: 'ఎలక్ట్రానిక్ సర్క్యూట్ లైవ్ కరెంట్ సిమ్యులేటర్',
      desc: 'Real-time animated current flow circuit simulator for diodes, transistors, and logic gates.',
      url: 'https://www.falstad.com/circuit/',
      category: 'Circuit Connections',
      badge: 'Live Current Flow'
    },
    {
      title: 'GeoGebra 3D Math & Physics Visualizer',
      teluguTitle: '3D మ్యాథ్స్ & మోషన్ గ్రాఫిక్స్ వేదిక',
      desc: 'Explore 3D geometry, calculus curves, vector mechanics, and physics pendulums.',
      url: 'https://www.geogebra.org/3d',
      category: 'Maths Visualizer',
      badge: '3D Geometry'
    },
    {
      title: 'Replit Online AI Development & Coding Lab',
      teluguTitle: 'ఆన్‌లైన్ కోడింగ్ & ఐఐ డెవలప్‌మెంట్ ల్యాబ్',
      desc: 'Write Python, C++, HTML, and AI programs directly in the browser without setup.',
      url: 'https://replit.com/',
      category: 'Online AI Tools',
      badge: 'Free Dev IDE'
    },
    {
      title: 'MIT App Inventor - Drone & Robo App Builder',
      teluguTitle: 'డ్రోన్ & రోబోట్ ఆండ్రాయిడ్ యాప్ బిల్డర్',
      desc: 'Build custom mobile apps to control Arduino Bluetooth robots and Wi-Fi drones.',
      url: 'https://appinventor.mit.edu/',
      category: 'Robotics & Apps',
      badge: 'Block Coding'
    }
  ];

  const filteredProjects = INNOVATION_PROJECTS.filter(p =>
    selectedCategory === 'All' || p.category === selectedCategory
  );

  const isCircuitActive = batteryConnected && switchOn;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30">
              <Cpu className="w-4 h-4 text-amber-200" />
              <span>3D Models • Wiring • Physics • Chemistry • Maths • Robotics • Drones</span>
            </div>

            {/* Language Switcher */}
            <div className="bg-black/20 backdrop-blur-sm p-0.5 rounded-full border border-white/20 flex items-center text-[10px] font-bold">
              <button
                onClick={() => setSelectedLanguage('te')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  selectedLanguage === 'te' ? 'bg-white text-orange-700 font-black shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setSelectedLanguage('hi')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  selectedLanguage === 'hi' ? 'bg-white text-orange-700 font-black shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  selectedLanguage === 'en' ? 'bg-white text-orange-700 font-black shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🚁 Student’s Corner & Real Innovation Lab
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            {selectedLanguage === 'te' && '3D నమూనాలు, వర్చువల్ సర్క్యూట్లు, ఫిజిక్స్-కెమిస్ట్రీ-మ్యాథ్స్ ప్రయోగాలు, రోబోటిక్స్ మరియు డ్రోన్స్ తయారీ మార్గదర్శి.'}
            {selectedLanguage === 'hi' && '3D मॉडल, वर्चुअल सर्किट, भौतिकी-रसायन-गणित प्रयोग, रोबोटिक्स और ड्रोन निर्माण गाइड।'}
            {selectedLanguage === 'en' && 'Hands-on 3D prototypes, circuit wiring, subject-wise real lab simulators, robotics, and drone engineering.'}
          </p>
        </div>
        <div className="absolute right-6 top-4 opacity-10 pointer-events-none hidden md:block">
          <Zap className="w-56 h-56 text-white" />
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setLabSubTab('workbench')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              labSubTab === 'workbench'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Workbench & Simulator</span>
          </button>

          <button
            onClick={() => setLabSubTab('real_lab')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              labSubTab === 'real_lab'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Subject-wise Real Labs (Physics/Maths/Chem)</span>
          </button>

          <button
            onClick={() => setLabSubTab('3d_prototype')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              labSubTab === '3d_prototype'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Diagrams & Drone Machines</span>
          </button>
        </div>

        <button
          onClick={() => onAskAIRobotics(activeProject.title)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-xs transition-all ml-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>Ask AI Lab Mentor</span>
        </button>
      </div>

      {/* VIEW 1: WORKBENCH & CIRCUIT SIMULATOR */}
      {labSubTab === 'workbench' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Interactive Project Lab Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="bg-orange-100 text-orange-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-orange-200">
                    {activeProject.category}
                  </span>
                  <h3 className="font-black text-slate-900 text-xl mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    Difficulty: {activeProject.difficulty}
                  </span>
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                    Time: {activeProject.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Components Needed & Safety */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-orange-500" />
                    <span>Required Components List:</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {activeProject.componentsNeeded.map((comp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/80 p-4 rounded-2xl border border-red-200 space-y-2 text-red-950">
                  <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-red-800">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>Safety Instructions:</span>
                  </h4>
                  <ul className="text-xs space-y-1 text-red-900">
                    {activeProject.safetyInstructions.map((safe, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold shrink-0">⚠️</span>
                        <span>{safe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Assembly Guide */}
              <div className="space-y-3 pt-2">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Step-by-Step Assembly Guide:</span>
                </h4>

                <div className="space-y-2.5">
                  {activeProject.stepByStepGuide.map((step) => (
                    <div key={step.stepNumber} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{step.title}</h5>
                        <p className="text-xs text-slate-600 mt-0.5">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeProject.codeSnippet && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                    <Code className="w-4 h-4 text-slate-700" />
                    <span>Arduino / Logic Code Snippet:</span>
                  </h4>
                  <pre className="bg-slate-900 text-amber-300 p-4 rounded-2xl text-xs font-mono overflow-x-auto">
                    {activeProject.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Virtual Breadboard Simulator */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="font-black text-sm text-amber-200">
                    Virtual Circuit Simulator
                  </h3>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isCircuitActive ? 'bg-green-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isCircuitActive ? '⚡ CIRCUIT LIVE' : 'OFFLINE'}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setBatteryConnected(!batteryConnected)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    batteryConnected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>1. Connect 9V Battery Power</span>
                  <span>{batteryConnected ? 'CONNECTED' : 'DISCONNECTED'}</span>
                </button>

                <button
                  onClick={() => setSwitchOn(!switchOn)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    switchOn
                      ? 'bg-orange-500/20 border-orange-500 text-orange-200'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>2. Toggle Main Circuit Switch</span>
                  <span>{switchOn ? 'ON (CLOSED)' : 'OFF (OPEN)'}</span>
                </button>

                <button
                  onClick={() => setSensorTriggered(!sensorTriggered)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    sensorTriggered
                      ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>3. Trigger Sensor Distance</span>
                  <span>{sensorTriggered ? 'OBSTACLE DETECTED' : 'CLEAR'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  Circuit Output Result:
                </span>

                {isCircuitActive ? (
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-2 rounded-xl text-xs font-black border border-amber-400/40 animate-pulse">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>LED LIT + DC MOTOR SPINNING! ⚙️</span>
                    </div>
                    {sensorTriggered && (
                      <p className="text-xs text-blue-300 font-bold">
                        🚨 Ultrasonic sensor triggered: Motor steering left to avoid obstacle!
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    Connect 9V battery and turn switch ON to complete electrical path.
                  </p>
                )}
              </div>
            </div>

            {/* Project Selection List */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Select Innovation Lab Project:
              </h4>

              <div className="space-y-2">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all ${
                      activeProject.id === proj.id
                        ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{proj.title}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                        {proj.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SUBJECT-WISE REAL LABS (PHYSICS / MATHS / CHEM / ONLINE TOOLS) */}
      {labSubTab === 'real_lab' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-amber-600" />
                <span>Subject-wise Online Real Labs & Simulators</span>
              </h3>
              <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-full">
                Interactive Experiments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {realLabResources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 flex flex-col justify-between hover:bg-orange-50/40 hover:border-orange-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-orange-100 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {res.category}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {res.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                        {res.title}
                      </h4>
                      <p className="text-xs text-orange-600 font-bold mt-0.5">
                        {res.teluguTitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {res.desc}
                      </p>
                    </div>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    <span>Open Interactive Lab</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: 3D PROTOTYPES, DIAGRAMS & ROBOTICS */}
      {labSubTab === '3d_prototype' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <Box className="w-5 h-5 text-amber-600" />
                <span>3D Diagrams, Robotics, Machines & Drones Blueprint</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Visualizing gear mechanisms, circuit pinouts, drone propellers, and motor connections.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                DRONE ASSEMBLY
              </span>
              <h4 className="font-extrabold text-base text-amber-200">
                Quadcopter Drone Architecture
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn 4x brushless DC motors wiring, Flight Controller Board (FCB), Electronic Speed Control (ESC), and LiPo battery safety.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                • 4x Brushless 2200KV Motors<br/>
                • 30A ESC + 3S 2200mAh LiPo<br/>
                • KK2.1.5 or Flight Controller
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="bg-orange-500/20 text-orange-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-orange-500/30">
                ROBOTICS MECHANICS
              </span>
              <h4 className="font-extrabold text-base text-amber-200">
                Robotic Arm Servo Connections
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                4-DOF Servo controlled arm mechanics using Arduino Uno, PCA9685 Servo driver, and joystick module.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                • 4x MG996R Metal Gear Servos<br/>
                • 5V 3A DC External Supply<br/>
                • Arduino PWM Signals (Pins 3,5,6,9)
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">
                ELECTRONIC CIRCUIT
              </span>
              <h4 className="font-extrabold text-base text-amber-200">
                Automated Smart Home Relay
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Control high-voltage AC appliances safely using low-voltage 5V relay module with optocoupler isolation.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                • 1-Channel 5V Relay Module<br/>
                • LDR Light Sensor / PIR Motion<br/>
                • Optocoupler Surge Isolation
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
