export interface FreeWebLinkItem {
  label: string;
  url: string;
  badge: string;
  type: 'simulator' | 'code' | 'blueprint' | 'weblink' | 'guide';
}

export interface DIYMakingStep {
  step: number;
  title: string;
  detail: string;
}

export interface DIYGuideDetails {
  timeNeeded: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stepByStep: DIYMakingStep[];
  safetyTips: string[];
  schematicUrl?: string;
  codeSnippet?: string;
}

export interface EnrichedTalentMarketItem {
  id: string;
  type: 'kid_handmade' | 'parent_skill' | 'knowledge_pack';
  category: string;
  craftSubCategory: 'robotics_diy' | 'craft_making' | 'electronics' | 'eco_art' | 'game_coding' | 'creative_writing' | 'parent_skill';
  title: string;
  teluguTitle: string;
  creatorName: string;
  creatorRole: string;
  creatorAge?: number;
  creatorCity: string;
  description: string;
  priceINR: number;
  starTokens: number;
  rating: number;
  reviewsCount: number;
  parentApproved: boolean;
  badge: string;
  imageUrl: string;
  materialsOrSkills: string[];
  videoUrl: string;
  videoTitle: string;
  videoDuration: string;
  freeWebLinks: FreeWebLinkItem[];
  diyMakingGuide: DIYGuideDetails;
}

export const KIDS_HANDMADE_ITEMS: EnrichedTalentMarketItem[] = [
  // ==========================================
  // 1. DIY ROBOTICS & ELECTRONICS CREATIONS
  // ==========================================
  {
    id: 'kid-diy-1',
    type: 'kid_handmade',
    category: 'DIY Robotics',
    craftSubCategory: 'robotics_diy',
    title: 'Smart Ultrasonic Obstacle Avoiding Robot Car',
    teluguTitle: 'స్మార్ట్ అల్ట్రాసోనిక్ రోబోట్ కారు (అర్నవ్ చేతితో చేసిన రోబోట్)',
    creatorName: 'Arnav Sharma',
    creatorRole: 'Kid Innovator (Class 7)',
    creatorAge: 12,
    creatorCity: 'Visakhapatnam',
    description: 'Fully functional Arduino Uno obstacle-sensing robot car assembled by Arnav with custom 3D printed chassis and HC-SR04 ultrasonic sonar.',
    priceINR: 450,
    starTokens: 90,
    rating: 4.9,
    reviewsCount: 38,
    parentApproved: true,
    badge: 'Kids Handmade Robotics',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Arduino Uno', 'HC-SR04 Sensor', 'L298N Motor Driver', 'Dual DC Gear Motors', 'Chassis Kit'],
    videoUrl: 'https://www.youtube.com/embed/SmdPsmz1VwA',
    videoTitle: 'DIY Arduino Obstacle Avoidance Robot Complete Step-by-Step Build',
    videoDuration: '14 mins',
    freeWebLinks: [
      { label: 'Tinkercad 3D Circuit Simulator', url: 'https://www.tinkercad.com/circuits', badge: 'Interactive 3D Sim', type: 'simulator' },
      { label: 'Arduino Web Editor & C++ Code', url: 'https://create.arduino.cc/editor', badge: 'Free Open Code', type: 'code' },
      { label: 'Instructables DIY Robot Blueprints', url: 'https://www.instructables.com/circuits/', badge: 'Free Schematics', type: 'blueprint' }
    ],
    diyMakingGuide: {
      timeNeeded: '2 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Mount Motors to Chassis', detail: 'Fasten the dual DC gear motors onto the acrylic base and press fit the rubber wheels.' },
        { step: 2, title: 'Wire the L298N Motor Driver', detail: 'Connect motor outputs to OUT1-OUT4 and digital trigger pins 4, 5, 6, 7 to Arduino Uno.' },
        { step: 3, title: 'Mount Ultrasonic Sensor', detail: 'Mount HC-SR04 on the front bumper. Connect VCC (5V), GND, Trig (Pin 9), and Echo (Pin 8).' },
        { step: 4, title: 'Upload Navigation Sketch', detail: 'Flash the obstacle avoidance logic that scans distance and triggers reverse/turn if distance < 20cm.' }
      ],
      safetyTips: [
        'Always remove 9V battery while rewiring pins on the breadboard.',
        'Use tape or cable ties to keep motor wires away from spinning wheels.'
      ],
      schematicUrl: 'https://www.falstad.com/circuit/',
      codeSnippet: `#define TRIG_PIN 9
#define ECHO_PIN 8
#define ENA 5
#define ENB 6
#define IN1 4
#define IN2 7
#define IN3 2
#define IN4 3

long readDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long dur = pulseIn(ECHO_PIN, HIGH);
  return dur * 0.034 / 2;
}

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
}

void loop() {
  long distance = readDistance();
  if (distance < 20 && distance > 0) {
    // Stop & Turn Right
    digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
    delay(400);
  } else {
    // Forward
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  }
}`
    }
  },

  {
    id: 'kid-diy-2',
    type: 'kid_handmade',
    category: 'DIY Robotics',
    craftSubCategory: 'robotics_diy',
    title: 'Bluetooth Remote Control RC Car via Smartphone App',
    teluguTitle: 'బ్లూటూత్ స్మార్ట్‌ఫోన్ నియంత్రిత RC రోబోట్ కారు',
    creatorName: 'Sneha Patel',
    creatorRole: 'Junior Maker (Class 8)',
    creatorAge: 13,
    creatorCity: 'Hyderabad',
    description: 'Custom smartphone-controlled robot car with HC-05 Bluetooth transceiver and MIT App Inventor customized Android control interface.',
    priceINR: 490,
    starTokens: 95,
    rating: 5.0,
    reviewsCount: 44,
    parentApproved: true,
    badge: 'Bluetooth App Connected',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Arduino Uno', 'HC-05 Bluetooth Module', 'L298N Driver', 'MIT App Inventor', '2x DC Motors'],
    videoUrl: 'https://www.youtube.com/embed/n3W4Y4W1Z4k',
    videoTitle: 'How to Build Bluetooth Controlled Arduino Robot with Phone App',
    videoDuration: '16 mins',
    freeWebLinks: [
      { label: 'MIT App Inventor Free Designer', url: 'https://appinventor.mit.edu/', badge: 'Free App Builder', type: 'weblink' },
      { label: 'Tinkercad Bluetooth Circuit Sim', url: 'https://www.tinkercad.com/', badge: 'Circuit Blueprint', type: 'simulator' },
      { label: 'GitHub Arduino RC Bluetooth Code', url: 'https://github.com/', badge: 'Open Source Repo', type: 'code' }
    ],
    diyMakingGuide: {
      timeNeeded: '2.5 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Configure HC-05 Module', detail: 'Set HC-05 baud rate to 9600 bps. Connect TXD to Arduino RX and RXD to Arduino TX via voltage divider.' },
        { step: 2, title: 'Assemble 4-Wheel Base', detail: 'Mount 4 DC motors onto double-decker acrylic chassis with onboard battery pack.' },
        { step: 3, title: 'Build Android App on MIT App Inventor', detail: 'Drag Forward, Backward, Left, Right buttons and map them to send ASCII characters "F", "B", "L", "R".' },
        { step: 4, title: 'Pair & Drive Wirelessly', detail: 'Pair smartphone with HC-05 Bluetooth and command the car from up to 10 meters distance.' }
      ],
      safetyTips: [
        'Disconnect RX/TX pins when uploading sketch from computer to prevent serial port conflict.'
      ],
      codeSnippet: `char command;
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available() > 0){
    command = Serial.read();
    if(command == 'F') moveForward();
    else if(command == 'B') moveBackward();
    else if(command == 'L') turnLeft();
    else if(command == 'R') turnRight();
    else if(command == 'S') stopMotors();
  }
}`
    }
  },

  {
    id: 'kid-diy-3',
    type: 'kid_handmade',
    category: 'Electronics & Circuit',
    craftSubCategory: 'electronics',
    title: 'Sun-Tracking Solar Sunflower Robot (Dual LDR Sensors)',
    teluguTitle: 'సూర్యుని వెలుగుని అనుసరించే సోలార్ సన్‌ఫ్లవర్ రోబోట్',
    creatorName: 'Pranav Murthy',
    creatorRole: 'Solar Innovator (Class 6)',
    creatorAge: 11,
    creatorCity: 'Bengaluru',
    description: 'Automatic dual-axis solar tracking flower that tilts its mini photovoltaic panel toward maximum light intensity using servo motors and light dependent resistors.',
    priceINR: 380,
    starTokens: 75,
    rating: 4.8,
    reviewsCount: 31,
    parentApproved: true,
    badge: 'Green Energy DIY',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['SG90 Micro Servo', '2x LDR Resistors', '10k Resistors', 'Solar Panel Model', 'Arduino Nano'],
    videoUrl: 'https://www.youtube.com/embed/bXvB4tN9eWk',
    videoTitle: 'Dual LDR Solar Tracker DIY Robot with Arduino & Servo',
    videoDuration: '11 mins',
    freeWebLinks: [
      { label: 'Falstad Solar Sensor Circuit Sim', url: 'https://www.falstad.com/circuit/', badge: 'Live Voltage Graph', type: 'simulator' },
      { label: 'PhET Solar Energy Simulation', url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes', badge: 'University Lab', type: 'simulator' },
      { label: 'Free Instructables Solar Blueprint', url: 'https://www.instructables.com/', badge: 'Project Guide', type: 'blueprint' }
    ],
    diyMakingGuide: {
      timeNeeded: '1.5 Hours',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Create LDR Divider', detail: 'Position two LDR sensors on the left and right sides of a divider flap on the solar panel.' },
        { step: 2, title: 'Mount SG90 Servo', detail: 'Glue the mini servo horn to the solar panel rotating axis.' },
        { step: 3, title: 'Program Differential Logic', detail: 'Calculate the difference between left LDR and right LDR readings to rotate the servo left or right until balanced.' }
      ],
      safetyTips: ['Do not look directly into high-intensity flashlights while calibrating optical sensors.'],
      codeSnippet: `#include <Servo.h>
Servo tracker;
int ldrLeft = A0;
int ldrRight = A1;
int pos = 90;

void setup() {
  tracker.attach(9);
  tracker.write(pos);
}
void loop() {
  int valL = analogRead(ldrLeft);
  int valR = analogRead(ldrRight);
  int diff = valL - valR;
  if (diff > 50 && pos < 160) pos += 2;
  else if (diff < -50 && pos > 20) pos -= 2;
  tracker.write(pos);
  delay(50);
}`
    }
  },

  {
    id: 'kid-diy-4',
    type: 'kid_handmade',
    category: 'DIY Robotics',
    craftSubCategory: 'robotics_diy',
    title: 'Cardboard Robotic Claw & Arm with Potentiometer Gripper',
    teluguTitle: 'కార్డ్‌బోర్డ్ రోబోటిక్ చేయి & సర్వో గ్రిప్పర్ (హ్యాండ్‌మేడ్)',
    creatorName: 'Tanvi Joshi',
    creatorRole: 'Maker & Sculptor (Class 7)',
    creatorAge: 12,
    creatorCity: 'Pune',
    description: 'Kinematic 3-axis robotic arm built entirely from laser-cut corrugated cardboard sheets, operated by 3 rotary potentiometers and SG90 servos.',
    priceINR: 420,
    starTokens: 85,
    rating: 4.9,
    reviewsCount: 36,
    parentApproved: true,
    badge: 'Eco-Cardboard Robotics',
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Corrugated Cardboard', '3x SG90 Servos', '3x 10k Potentiometers', 'Arduino Uno', 'Hot Glue'],
    videoUrl: 'https://www.youtube.com/embed/jZ5Cq6d8xN0',
    videoTitle: 'DIY Cardboard Robotic Arm Complete Making Tutorial',
    videoDuration: '18 mins',
    freeWebLinks: [
      { label: 'Download Printable Cardboard Templates', url: 'https://www.instructables.com/', badge: 'Free PDF Cutting Sheet', type: 'blueprint' },
      { label: 'Tinkercad Multi-Servo Workspace', url: 'https://www.tinkercad.com/', badge: '3D Simulation', type: 'simulator' },
      { label: 'Replit Robot Controller Code', url: 'https://replit.com/', badge: 'Interactive IDE', type: 'code' }
    ],
    diyMakingGuide: {
      timeNeeded: '3 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Cut Cardboard Links', detail: 'Trace the link templates onto cardboard and cut cleanly with craft safety scissors.' },
        { step: 2, title: 'Assemble Pivot Joints', detail: 'Insert wooden dowels or servo horns into the elbow, shoulder, and gripper wrist.' },
        { step: 3, title: 'Wire Potentiometer Controls', detail: 'Connect 3 potentiometers to analog pins A0, A1, A2 to directly map angular positions to the 3 servos.' }
      ],
      safetyTips: ['Adult assistance required when using hot melt glue guns and cutting thick cardboard.'],
      codeSnippet: `#include <Servo.h>
Servo base, shoulder, claw;
void setup() {
  base.attach(3); shoulder.attach(5); claw.attach(6);
}
void loop() {
  int pot0 = map(analogRead(A0), 0, 1023, 0, 180);
  int pot1 = map(analogRead(A1), 0, 1023, 0, 180);
  int pot2 = map(analogRead(A2), 0, 1023, 10, 80);
  base.write(pot0); shoulder.write(pot1); claw.write(pot2);
  delay(15);
}`
    }
  },

  {
    id: 'kid-diy-5',
    type: 'kid_handmade',
    category: 'DIY Robotics',
    craftSubCategory: 'robotics_diy',
    title: 'Touchless Smart Dustbin & Automatic Sanitizer Dispenser',
    teluguTitle: 'చేతితో తాకకుండా తెరుచుకునే స్మార్ట్ డస్ట్‌బిన్',
    creatorName: 'Kavya Sree',
    creatorRole: 'Health Tech Kid (Class 5)',
    creatorAge: 10,
    creatorCity: 'Vijayawada',
    description: 'Automatic waste bin that senses approaching hands via ultrasonic radar and opens the lid automatically for 4 seconds before gently closing.',
    priceINR: 299,
    starTokens: 60,
    rating: 4.8,
    reviewsCount: 27,
    parentApproved: true,
    badge: 'Smart Hygiene Maker',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Ultrasonic HC-SR04', 'SG90 Micro Servo', 'Recycled Plastic Bin', 'Arduino Nano', '5V Battery'],
    videoUrl: 'https://www.youtube.com/embed/5aLz7k0v9YQ',
    videoTitle: 'Make Smart Touchless Dustbin at Home with Arduino & Servo',
    videoDuration: '10 mins',
    freeWebLinks: [
      { label: 'Tinkercad Smart Dustbin 3D Sim', url: 'https://www.tinkercad.com/', badge: '3D Simulation', type: 'simulator' },
      { label: 'Free Circuit & Wiring Diagram', url: 'https://www.falstad.com/circuit/', badge: 'Circuit Schematic', type: 'blueprint' }
    ],
    diyMakingGuide: {
      timeNeeded: '1 Hour',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Mount Sensor to Bin Lid', detail: 'Cut two circular eye holes on the dustbin lid and secure the ultrasonic sensor.' },
        { step: 2, title: 'Attach Servo Arm', detail: 'Glue the servo motor body to the inside wall and link the arm to the flap using fishing line or thread.' },
        { step: 3, title: 'Program Automatic Timeout', detail: 'When distance < 15cm, rotate servo to 90 degrees (open), wait 3 seconds, then return to 0 degrees.' }
      ],
      safetyTips: ['Keep electronic modules insulated from damp waste materials inside the bin.'],
      codeSnippet: `#include <Servo.h>
Servo lid;
int trig = 7, echo = 8;
void setup() {
  lid.attach(9);
  lid.write(0);
  pinMode(trig, OUTPUT); pinMode(echo, INPUT);
}
void loop() {
  digitalWrite(trig, LOW); delayMicroseconds(2);
  digitalWrite(trig, HIGH); delayMicroseconds(10);
  digitalWrite(trig, LOW);
  long dist = pulseIn(echo, HIGH) * 0.034 / 2;
  if(dist < 15 && dist > 0) {
    lid.write(100);
    delay(3000);
    lid.write(0);
  }
  delay(100);
}`
    }
  },

  // ==========================================
  // 2. CRAFTING, MAKING & PAPER/WOOD DIY
  // ==========================================
  {
    id: 'kid-craft-1',
    type: 'kid_handmade',
    category: 'Handmade Crafts',
    craftSubCategory: 'craft_making',
    title: 'Hydraulic Cardboard Excavator & Crane (Pascal Principle)',
    teluguTitle: 'హైడ్రాలిక్ కార్డ్‌బోర్డ్ క్రేన్ & జేసీబీ (సిరంజి ప్రయోగం)',
    creatorName: 'Rohan Deshmukh',
    creatorRole: 'Physics Artisan (Class 6)',
    creatorAge: 11,
    creatorCity: 'Nagpur',
    description: 'Fully working hydraulic excavator driven by 4 pairs of water-filled medical syringes illustrating Pascal\'s law of fluid pressure transmission.',
    priceINR: 340,
    starTokens: 70,
    rating: 5.0,
    reviewsCount: 51,
    parentApproved: true,
    badge: 'Physics Mechanical DIY',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['8x 10ml Syringes', 'Flexible IV Infusion Tubing', 'Cardboard', 'Food Coloring Water', 'Wooden Skewers'],
    videoUrl: 'https://www.youtube.com/embed/T0F_vX5K9i8',
    videoTitle: 'How to Make Hydraulic Cardboard Excavator at Home DIY Tutorial',
    videoDuration: '15 mins',
    freeWebLinks: [
      { label: 'PhET Fluid Pressure Simulation', url: 'https://phet.colorado.edu/en/simulations/under-pressure', badge: 'Physics Lab', type: 'simulator' },
      { label: 'Free Hydraulic Printable Stencil', url: 'https://www.instructables.com/', badge: 'Scale Blueprint', type: 'blueprint' },
      { label: 'Scientific American Hydraulics Guide', url: 'https://www.scientificamerican.com/', badge: 'Science Notes', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '2.5 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Cut the 3-Stage Boom', detail: 'Cut the base arm, forearm, and bucket claw out of dense corrugated cardboard.' },
        { step: 2, title: 'Fill & Bleed Syringe Pairs', detail: 'Fill each syringe with color-coded water (red, blue, green, yellow) and purge all air bubbles for stiff hydraulic response.' },
        { step: 3, title: 'Connect Control Station', detail: 'Mount 4 input syringes on a wooden control console for lifting, extending, scooping, and 360-degree rotation.' }
      ],
      safetyTips: ['Use blunt plastic syringes without needles. Wipe any water spills immediately.'],
      codeSnippet: `// Physics Principle: Pascal's Law
// P = F1 / A1 = F2 / A2
// Incompressible fluids transmit pressure equally in all directions.`
    }
  },

  {
    id: 'kid-craft-2',
    type: 'kid_handmade',
    category: 'Handmade Crafts',
    craftSubCategory: 'craft_making',
    title: 'Handmade Eco-Friendly Paper Mache Solar System & Planets',
    teluguTitle: 'పేపర్ మాచే సౌర కుటుంబం & గ్రహాల మోడల్ (సాహితి కళ)',
    creatorName: 'Sahithi Reddy',
    creatorRole: 'Kid Artisan (Class 5)',
    creatorAge: 10,
    creatorCity: 'Bengaluru',
    description: 'Recycled paper pulp and non-toxic plant dye educational solar system desktop model with planetary distance facts and orbital scale rings.',
    priceINR: 280,
    starTokens: 55,
    rating: 4.8,
    reviewsCount: 29,
    parentApproved: true,
    badge: 'Eco-Artisan Champion',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Recycled Newsprint Pulp', 'Natural Non-Toxic Dyes', 'Wooden Base', 'Wire Armatures', 'Flour Paste'],
    videoUrl: 'https://www.youtube.com/embed/Zz_K9p1B0vA',
    videoTitle: 'Easy Paper Mache Solar System Planets DIY Making Guide',
    videoDuration: '12 mins',
    freeWebLinks: [
      { label: 'NASA Solar System Interactive 3D', url: 'https://solarsystem.nasa.gov/planets/overview/', badge: 'NASA 3D Space', type: 'weblink' },
      { label: 'Planetary Scale Math Calculator', url: 'https://www.geogebra.org/3d', badge: '3D Geometry', type: 'simulator' },
      { label: 'Eco-Craft Paper Pulp Guide', url: 'https://www.instructables.com/', badge: 'Craft Blueprints', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '2 Days (including drying)',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Prepare Paper Pulp', detail: 'Shred old newspapers, soak in warm water overnight, and blend with natural flour paste to create smooth clay-like pulp.' },
        { step: 2, title: 'Sculpt Planet Spheres', detail: 'Shape Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune in proportional relative sizes.' },
        { step: 3, title: 'Sun & Air Dry', detail: 'Allow spheres to cure under sunlight for 24 hours until rock-hard.' },
        { step: 4, title: 'Paint & Mount Orbits', detail: 'Paint atmospheric details (Jupiter Great Red Spot, Saturn rings) with organic tempera colors and mount onto orbital wire loops.' }
      ],
      safetyTips: ['Work on washable newspaper mats to keep table surfaces clean.']
    }
  },

  {
    id: 'kid-craft-3',
    type: 'kid_handmade',
    category: 'Handmade Crafts',
    craftSubCategory: 'craft_making',
    title: 'Origami Geometric Polyhedrons & 3D Modular Kusudama Star',
    teluguTitle: 'ఒరిగామి 3D జియోమెట్రిక్ నక్షత్రాలు & పాలిహెడ్రన్ కళ',
    creatorName: 'Ananya Sharma',
    creatorRole: 'Origami Mathematician (Class 8)',
    creatorAge: 13,
    creatorCity: 'Visakhapatnam',
    description: 'Mathematical 30-unit Sonobe modular origami icosahedron and interlocking stellated octahedron folded without glue or tape.',
    priceINR: 220,
    starTokens: 45,
    rating: 4.9,
    reviewsCount: 33,
    parentApproved: true,
    badge: 'Mathematical Origami',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Square Duplex Origami Sheets', 'Crease Bone Folder', 'Vedic Geometric Symmetry', 'Zero Glue Interlock'],
    videoUrl: 'https://www.youtube.com/embed/8vB8o2zZ1_0',
    videoTitle: 'How to Make 30-Unit Sonobe Modular Origami Ball Kusudama',
    videoDuration: '13 mins',
    freeWebLinks: [
      { label: 'GeoGebra 3D Polyhedron Visualizer', url: 'https://www.geogebra.org/3d', badge: '3D Geometry Tool', type: 'simulator' },
      { label: 'Origami Crease Pattern Diagrams', url: 'https://origami.me/diagrams/', badge: 'Free Diagram Vault', type: 'blueprint' },
      { label: 'Mathigon Modular Mathematics', url: 'https://mathigon.org/origami', badge: 'Maths Lab', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '1 Hour',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Fold 30 Sonobe Units', detail: 'Fold each square paper into parallelogram modules with two triangular pockets and two insertion tabs.' },
        { step: 2, title: 'Form 3-Unit Triangular Pyramids', detail: 'Insert tabs into adjacent unit pockets to build tetrahedral vertices.' },
        { step: 3, title: 'Close the 30-Unit Sphere', detail: 'Connect the 20 triangular faces into a self-supporting Archimedean solid without adhesives.' }
      ],
      safetyTips: ['Ensure crisp, sharp folds for rock-solid geometric interlocking friction.']
    }
  },

  {
    id: 'kid-craft-4',
    type: 'kid_handmade',
    category: 'Handmade Crafts',
    craftSubCategory: 'craft_making',
    title: 'Pizza Box Solar Thermal Cooker & S\'mores Oven',
    teluguTitle: 'పిజ్జా బాక్స్ సోలార్ ఓవెన్ (సౌరశక్తి కుక్కర్ ప్రయోగం)',
    creatorName: 'Vikram Chary',
    creatorRole: 'Clean Tech Maker (Class 6)',
    creatorAge: 11,
    creatorCity: 'Tirupati',
    description: 'Parabolic solar reflector oven made from a recycled pizza box, aluminum foil, black construction paper, and plastic wrap that reaches 85°C to bake cheese toasts and solar s\'mores.',
    priceINR: 199,
    starTokens: 40,
    rating: 4.8,
    reviewsCount: 22,
    parentApproved: true,
    badge: 'Solar Energy Kitchen DIY',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Pizza Box', 'Aluminum Reflective Foil', 'Black Matte Sheet', 'Cling Wrap', 'Thermometer Probe'],
    videoUrl: 'https://www.youtube.com/embed/7M_w0W4k8yQ',
    videoTitle: 'DIY Pizza Box Solar Oven Science Experiment Video',
    videoDuration: '9 mins',
    freeWebLinks: [
      { label: 'PhET Solar Heat & Thermodynamics', url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes', badge: 'Interactive Sim', type: 'simulator' },
      { label: 'Instructables Solar Cooker Guide', url: 'https://www.instructables.com/', badge: 'Free Blueprint', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '45 Mins',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Cut the Reflector Flap', detail: 'Cut a 3-sided flap on the top lid of the pizza box and fold upward.' },
        { step: 2, title: 'Laminate with Foil & Black Bed', detail: 'Line the underside of the flap with smooth aluminum foil. Line the bottom tray with black heat-absorbing cardstock.' },
        { step: 3, title: 'Seal the Air Chamber', detail: 'Tightly tape plastic wrap across the opening to create a greenhouse heat trap.' },
        { step: 4, title: 'Cook in Direct Sun', detail: 'Angle the reflector flap to beam sunlight into the black box. Watch cheese melt in 20 minutes!' }
      ],
      safetyTips: ['The interior surfaces can reach over 80°C. Use oven mitts when removing baked items.']
    }
  },

  {
    id: 'kid-craft-5',
    type: 'kid_handmade',
    category: 'Handmade Crafts',
    craftSubCategory: 'craft_making',
    title: 'Handmade String Art & Vedic Sri Yantra Geometric Board',
    teluguTitle: 'స్ట్రింగ్ ఆర్ట్ & వేద శ్రీ యంత్రం పలక (గణిత కళారూపం)',
    creatorName: 'Meenakshi Iyer',
    creatorRole: 'Vedic Geometric Artisan (Class 8)',
    creatorAge: 13,
    creatorCity: 'Chennai',
    description: 'Precision pine wood mandala board woven with multi-colored silk threads around brass pins illustrating harmonic curves and concentric geometry.',
    priceINR: 390,
    starTokens: 80,
    rating: 5.0,
    reviewsCount: 41,
    parentApproved: true,
    badge: 'Vedic Sacred Art',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Pine Wood Plank', 'Brass Linoleum Nails', 'Multi-color Silk Thread', 'Compass Geometry Guide'],
    videoUrl: 'https://www.youtube.com/embed/5aLz7k0v9YQ',
    videoTitle: 'Handmade String Art Mandala Step by Step Tutorial',
    videoDuration: '17 mins',
    freeWebLinks: [
      { label: 'GeoGebra Sacred Geometry Sandbox', url: 'https://www.geogebra.org/3d', badge: 'Symmetry Tool', type: 'simulator' },
      { label: 'Printable Nail Pattern Stencils', url: 'https://www.instructables.com/', badge: 'Pattern PDF', type: 'blueprint' }
    ],
    diyMakingGuide: {
      timeNeeded: '3 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Map the Geometric Matrix', detail: 'Tape the circular grid stencil onto sand-finished pine wood board.' },
        { step: 2, title: 'Hammer Brass Pins', detail: 'Evenly hammer 64 brass nails at identical 1cm depth.' },
        { step: 3, title: 'Weave Parabolic Curves', detail: 'Loop silk thread between pin [N] and pin [N+21] to weave hyperbolic curves that generate the central mandala.' }
      ],
      safetyTips: ['Wear safety glasses and hammer gently to ensure straight nail alignment.']
    }
  },

  // ==========================================
  // 3. JUNIOR CODING & GAME CREATIONS
  // ==========================================
  {
    id: 'kid-coding-1',
    type: 'kid_handmade',
    category: 'Coding & Games',
    craftSubCategory: 'game_coding',
    title: 'Python Pygame Retro Space Invaders & Math Boss Fight',
    teluguTitle: 'పైథాన్ స్పేస్ ఇన్వేడర్స్ & మ్యాథ్స్ గేమ్ (కిడ్ ప్రోగ్రామర్ కార్తీక్)',
    creatorName: 'Karthik Nambiar',
    creatorRole: 'Junior Game Dev (Class 8)',
    creatorAge: 13,
    creatorCity: 'Bengaluru',
    description: 'Complete Python Pygame 2D arcade shooter where defeating alien bosses requires solving quick arithmetic equations with live particle effects.',
    priceINR: 150,
    starTokens: 30,
    rating: 4.9,
    reviewsCount: 41,
    parentApproved: true,
    badge: 'Young Game Creator',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Python 3', 'Pygame Library', 'Object Oriented Programming', 'Chiptune Sound FX'],
    videoUrl: 'https://www.youtube.com/embed/FfWpgLFMI7w',
    videoTitle: 'Make Space Invaders in Python Pygame Tutorial for Beginners',
    videoDuration: '22 mins',
    freeWebLinks: [
      { label: 'Run Python Code Live on Replit', url: 'https://replit.com/', badge: 'Free Web IDE', type: 'code' },
      { label: 'Download Open Source Pygame Code', url: 'https://github.com/', badge: 'GitHub Repository', type: 'code' },
      { label: 'Pygame Official Documentation & Assets', url: 'https://www.pygame.org/docs/', badge: 'Developer Docs', type: 'weblink' }
    ],
    diyMakingGuide: {
      timeNeeded: '4 Hours',
      difficulty: 'Intermediate',
      stepByStep: [
        { step: 1, title: 'Initialize Screen & Clock', detail: 'Set up pygame.display.set_mode((800, 600)) and initialize 60 FPS clock cycle.' },
        { step: 2, title: 'Player Spaceship Sprite', detail: 'Implement keyboard arrow listeners (pygame.K_LEFT, pygame.K_RIGHT) with boundary clamps.' },
        { step: 3, title: 'Alien Enemy Grid', detail: 'Spawn 2D array of alien ships that bounce horizontally and descend upon wall collision.' },
        { step: 4, title: 'Math Equation Popup Trigger', detail: 'When boss spaceship arrives, pause physics and present a rapid mental math question for 2x laser power.' }
      ],
      safetyTips: ['Keep regular code git commits to save your milestone progress.'],
      codeSnippet: `import pygame, random
pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Math Space Invaders")
clock = pygame.time.Clock()

player_x, player_y = 370, 480
bullets, enemies = [], []

for i in range(6):
    enemies.append([random.randint(50, 750), random.randint(50, 150), 3])

running = True
while running:
    screen.fill((10, 15, 30))
    for event in pygame.event.get():
        if event.type == pygame.QUIT: running = False
    
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player_x > 0: player_x -= 5
    if keys[pygame.K_RIGHT] and player_x < 740: player_x += 5
    if keys[pygame.K_SPACE]: bullets.append([player_x + 25, player_y])
    
    pygame.draw.rect(screen, (0, 255, 180), (player_x, player_y, 50, 30))
    pygame.display.flip()
    clock.tick(60)`
    }
  },

  {
    id: 'kid-coding-2',
    type: 'kid_handmade',
    category: 'Coding & Games',
    craftSubCategory: 'game_coding',
    title: 'Scratch 3.0 Multiplayer Tenali Rama Wit & Maze Adventure',
    teluguTitle: 'స్క్రాచ్ 3.0 తెనాలి రామ మెదడు ఆట (కిడ్స్ మేడ్)',
    creatorName: 'Rohan & Tanvi Gupta',
    creatorRole: 'Scratch Animators (Class 6 & 8)',
    creatorAge: 13,
    creatorCity: 'Pune',
    description: 'Rich story-driven Scratch 3.0 animated puzzle platformer featuring customizable avatar costumes, sound effects, and moral riddle locks.',
    priceINR: 120,
    starTokens: 25,
    rating: 4.9,
    reviewsCount: 39,
    parentApproved: true,
    badge: 'Scratch Block Coding',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['MIT Scratch 3.0', 'Sprite Animation', 'Broadcast Messaging', 'Custom Sound FX'],
    videoUrl: 'https://www.youtube.com/embed/e_kZqP_GZUk',
    videoTitle: 'Create a Complete Adventure Maze Game in Scratch 3.0',
    videoDuration: '16 mins',
    freeWebLinks: [
      { label: 'Play Live on MIT Scratch', url: 'https://scratch.mit.edu/', badge: 'Free Online Player', type: 'simulator' },
      { label: 'Download Scratch Sprite Pack', url: 'https://scratch.mit.edu/ideas', badge: 'Sprite Graphics', type: 'blueprint' }
    ],
    diyMakingGuide: {
      timeNeeded: '2 Hours',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Draw Custom Sprites', detail: 'Design Tenali Rama, King Krishnadevaraya, and the Royal Guard sprites in Scratch Vector Paint.' },
        { step: 2, title: 'Program Grid Movement', detail: 'Use [When Green Flag Clicked] -> [Forever If Key Pressed] blocks with color touch detection for maze walls.' },
        { step: 3, title: 'Add Dialogue & Riddle Logic', detail: 'Create variable [GemsCollected] and broadcast message [OpenGates] when correct riddle answers are typed.' }
      ],
      safetyTips: ['Share projects safely on Scratch with parent-approved community accounts.']
    }
  },

  // ==========================================
  // 4. PARENT SKILLS & KNOWLEDGE PACKS
  // ==========================================
  {
    id: 'parent-skill-1',
    type: 'parent_skill',
    category: 'Parent Skill Exchange',
    craftSubCategory: 'parent_skill',
    title: '1-on-1 Speed Vedic Maths & Mental Arithmetic Mentorship',
    teluguTitle: 'స్పీడ్ వేద గణితం వ్యక్తిగత శిక్షణ (తల్లిదండ్రుల నైపుణ్యం)',
    creatorName: 'Suresh Varma (Software Architect & Parent)',
    creatorRole: 'Super Parent Mentor',
    creatorCity: 'Hyderabad',
    description: 'Offering weekend 45-minute live mentorship on Ekadhikena Purvena, Nikhilam multiplication, and squareroot mental calculations for Class 4-10 students.',
    priceINR: 0,
    starTokens: 40,
    rating: 5.0,
    reviewsCount: 64,
    parentApproved: true,
    badge: 'Parent Knowledge Swap',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Vedic Sutras', 'Speed Calculation Drills', 'Interactive Mental Tests'],
    videoUrl: 'https://www.youtube.com/embed/grnP3mduZ4U',
    videoTitle: 'Vedic Maths Fast Calculation Tricks Masterclass',
    videoDuration: '20 mins',
    freeWebLinks: [
      { label: 'GeoGebra Vedic Arithmetic Visualizer', url: 'https://www.geogebra.org/', badge: 'Maths Lab', type: 'simulator' },
      { label: 'Download Free Vedic Maths Practice Sheet', url: 'https://www.vedicmathsindia.org/', badge: 'PDF Worksheets', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '45 Mins / Session',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Nikhilam Base Method', detail: 'Multiply two numbers near base 100 (e.g. 97 x 94) in 3 seconds mentally without paper.' },
        { step: 2, title: 'Urdhva Tiryagbhyam', detail: 'Cross-multiplication algorithm for any 2-digit by 2-digit and 3-digit by 3-digit numbers.' },
        { step: 3, title: 'Instant Square Roots', detail: 'Identify square root of 4-digit perfect squares in 2 seconds.' }
      ],
      safetyTips: ['Patience and daily 10-minute mental warmups guarantee 5x calculation speed!']
    }
  },

  {
    id: 'parent-skill-2',
    type: 'parent_skill',
    category: 'Cultural Talent',
    craftSubCategory: 'parent_skill',
    title: 'Classical Carnatic Vocal & Bhagavad Gita Shloka Chanting for Kids',
    teluguTitle: 'కర్ణాటక సంగీత గానం & భగవద్గీత శ్లోకాల ఉచ్చారణ శిక్షణ',
    creatorName: 'Smt. Gayatri Devi (Music Teacher & Parent)',
    creatorRole: 'Gurukul Parent Guru',
    creatorCity: 'Chennai / Online',
    description: 'Gentle foundational vocal training, sarali swaras, and Bhagavad Gita shloka prosody and correct Sanskrit phonetics for young learners.',
    priceINR: 0,
    starTokens: 50,
    rating: 4.9,
    reviewsCount: 47,
    parentApproved: true,
    badge: 'Traditional Art Mentor',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Voice Culture', 'Shruti Alignment', 'Gita Chanting Prosody', 'Bilingual Meaning Notes'],
    videoUrl: 'https://www.youtube.com/embed/2_X0m3-bI3o',
    videoTitle: 'Learn Bhagavad Gita Chapter 2 Shlokas with Proper Tune and Meaning',
    videoDuration: '25 mins',
    freeWebLinks: [
      { label: 'Dasubhashitham Audio Archives', url: 'https://www.dasubhashitham.com/', badge: 'Telugu Audiobooks', type: 'weblink' },
      { label: 'Bhagavad Gita Shloka Text & Audio', url: 'https://www.holy-bhagavad-gita.org/', badge: 'Audio & Lyrics', type: 'guide' }
    ],
    diyMakingGuide: {
      timeNeeded: '30 Mins / Class',
      difficulty: 'Beginner',
      stepByStep: [
        { step: 1, title: 'Shruti Tanpura Alignment', detail: 'Match vocal pitch with electronic Tanpura on Pa-Sa notes.' },
        { step: 2, title: 'Sarali Swaras in Mayamalavagowla', detail: 'Sing first 7 speed exercises with clear rhythm and hand talam.' },
        { step: 3, title: 'Chapter 2 Gita Shlokas', detail: 'Recite Karmanye Vadhikaraste with clear Sanskrit pronunciation and life application.' }
      ],
      safetyTips: ['Practice in the morning for best vocal resonance.']
    }
  }
];
