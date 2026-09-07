import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  ExternalLink, 
  Download, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Video, 
  Play, 
  Eye, 
  Heart, 
  Check, 
  Layers, 
  Smile, 
  Sun, 
  Star,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { MediaLinkModal } from './MediaLinkModal';

interface ColouringVideo {
  id: string;
  title: string;
  teluguTitle: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Kids Special';
  views: string;
  gradient: string;
  videoUrl: string;
  description: string;
  tips: string[];
}

interface ColouringBook {
  id: string;
  title: string;
  teluguTitle: string;
  pages: number;
  ageGroup: string;
  coverGradient: string;
  description: string;
  tags: string[];
  pdfUrl: string;
  sheets: { name: string; icon: string; theme: string }[];
}

export const KidsColouringStudio: React.FC = () => {
  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#EF4444');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'blank' | 'peacock' | 'elephant' | 'butterfly' | 'dinosaur' | 'lotus'>('peacock');
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  // Active Video Modal
  const [activeMediaModal, setActiveMediaModal] = useState<{
    isOpen: boolean;
    title: string;
    videoUrl?: string;
    webUrl?: string;
    description?: string;
    keyPoints?: string[];
  }>({
    isOpen: false,
    title: ''
  });

  // Selected Book for Sheet Preview
  const [previewBook, setPreviewBook] = useState<ColouringBook | null>(null);

  const colors = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Amber', hex: '#F59E0B' },
    { name: 'Yellow', hex: '#EAB308' },
    { name: 'Lime', hex: '#84CC16' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Cyan', hex: '#06B6D4' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'Black', hex: '#0F172A' },
  ];

  // Draw template outlines onto canvas
  const drawTemplateOutline = (ctx: CanvasRenderingContext2D, template: string) => {
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, 500);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (template === 'peacock') {
      // Draw Peacock outline
      ctx.beginPath();
      // Body
      ctx.arc(400, 300, 45, 0, Math.PI * 2);
      // Neck and head
      ctx.moveTo(380, 260);
      ctx.quadraticCurveTo(360, 200, 390, 180);
      ctx.arc(400, 175, 20, 0, Math.PI * 2);
      // Beak
      ctx.moveTo(420, 175);
      ctx.lineTo(440, 180);
      ctx.lineTo(420, 185);
      // Crown feathers
      ctx.moveTo(400, 155);
      ctx.lineTo(395, 135);
      ctx.moveTo(405, 155);
      ctx.lineTo(410, 132);
      ctx.moveTo(410, 157);
      ctx.lineTo(425, 137);
      // Fan feathers
      for (let angle = Math.PI; angle <= Math.PI * 2; angle += Math.PI / 8) {
        const x1 = 400 + Math.cos(angle) * 70;
        const y1 = 300 + Math.sin(angle) * 70;
        const x2 = 400 + Math.cos(angle) * 160;
        const y2 = 300 + Math.sin(angle) * 160;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.arc(x2, y2, 14, 0, Math.PI * 2);
      }
      ctx.stroke();
    } else if (template === 'butterfly') {
      // Butterfly outline
      ctx.beginPath();
      // Body
      ctx.ellipse(400, 250, 12, 60, 0, 0, Math.PI * 2);
      // Head
      ctx.arc(400, 180, 14, 0, Math.PI * 2);
      // Antennae
      ctx.moveTo(395, 170);
      ctx.quadraticCurveTo(370, 140, 360, 145);
      ctx.moveTo(405, 170);
      ctx.quadraticCurveTo(430, 140, 440, 145);
      // Left Top Wing
      ctx.moveTo(390, 210);
      ctx.bezierCurveTo(220, 120, 210, 260, 390, 260);
      // Right Top Wing
      ctx.moveTo(410, 210);
      ctx.bezierCurveTo(580, 120, 590, 260, 410, 260);
      // Left Bottom Wing
      ctx.moveTo(390, 260);
      ctx.bezierCurveTo(240, 280, 280, 380, 390, 300);
      // Right Bottom Wing
      ctx.moveTo(410, 260);
      ctx.bezierCurveTo(560, 280, 520, 380, 410, 300);
      ctx.stroke();
    } else if (template === 'lotus') {
      // Sacred Lotus
      ctx.beginPath();
      // Center petal
      ctx.moveTo(400, 320);
      ctx.quadraticCurveTo(370, 220, 400, 160);
      ctx.quadraticCurveTo(430, 220, 400, 320);
      // Left inner petal
      ctx.moveTo(390, 320);
      ctx.quadraticCurveTo(320, 240, 350, 190);
      ctx.quadraticCurveTo(380, 250, 390, 320);
      // Right inner petal
      ctx.moveTo(410, 320);
      ctx.quadraticCurveTo(480, 240, 450, 190);
      ctx.quadraticCurveTo(420, 250, 410, 320);
      // Left outer petal
      ctx.moveTo(380, 325);
      ctx.quadraticCurveTo(280, 290, 310, 240);
      ctx.quadraticCurveTo(360, 300, 380, 325);
      // Right outer petal
      ctx.moveTo(420, 325);
      ctx.quadraticCurveTo(520, 290, 490, 240);
      ctx.quadraticCurveTo(440, 300, 420, 325);
      // Water ripples
      ctx.moveTo(260, 345);
      ctx.quadraticCurveTo(400, 365, 540, 345);
      ctx.stroke();
    } else if (template === 'elephant') {
      // Friendly Elephant
      ctx.beginPath();
      // Head & Trunk
      ctx.arc(360, 230, 45, 0, Math.PI * 2);
      ctx.moveTo(330, 250);
      ctx.quadraticCurveTo(280, 270, 270, 330);
      ctx.quadraticCurveTo(285, 330, 295, 290);
      // Big Ear
      ctx.moveTo(380, 200);
      ctx.quadraticCurveTo(440, 210, 430, 280);
      ctx.quadraticCurveTo(390, 290, 380, 250);
      // Body
      ctx.moveTo(390, 250);
      ctx.quadraticCurveTo(520, 220, 520, 330);
      // Legs
      ctx.lineTo(490, 380);
      ctx.lineTo(465, 380);
      ctx.lineTo(465, 330);
      ctx.lineTo(430, 330);
      ctx.lineTo(430, 380);
      ctx.lineTo(405, 380);
      ctx.lineTo(405, 300);
      ctx.stroke();
    } else if (template === 'dinosaur') {
      // Cute Dino
      ctx.beginPath();
      // Body
      ctx.ellipse(400, 280, 80, 55, 0, 0, Math.PI * 2);
      // Long Neck and Head
      ctx.moveTo(330, 260);
      ctx.quadraticCurveTo(280, 200, 290, 150);
      ctx.arc(310, 140, 22, 0, Math.PI * 2);
      // Tail
      ctx.moveTo(470, 270);
      ctx.quadraticCurveTo(560, 240, 580, 190);
      ctx.quadraticCurveTo(540, 280, 460, 310);
      // Legs
      ctx.moveTo(360, 330);
      ctx.lineTo(360, 380);
      ctx.lineTo(385, 380);
      ctx.lineTo(385, 330);
      ctx.moveTo(430, 330);
      ctx.lineTo(430, 380);
      ctx.lineTo(455, 380);
      ctx.lineTo(455, 330);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTemplateOutline(ctx, selectedTemplate);
      }
    }
  }, [selectedTemplate]);

  // Coordinates helper
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e);
    setIsDrawing(true);
    setLastPosition(coords);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setLastPosition(coords);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTemplateOutline(ctx, selectedTemplate);
      }
    }
  };

  const handleDownloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `my-superparent-coloring-${selectedTemplate}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrintCanvas = () => {
    window.print();
  };

  // Curated Educational Colouring Videos
  const colouringVideos: ColouringVideo[] = [
    {
      id: 'vid-1',
      title: 'How to Color Cartoon Animals with Crayons & Oil Pastels',
      teluguTitle: 'పిల్లల కోసం జంతువులకు రంగులు వేయడం',
      duration: '12:45 min',
      level: 'Beginner',
      views: '42.6k views',
      gradient: 'from-amber-500 to-rose-600',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Learn step-by-step shading with crayons, blending primary colors to create fur, wings, and radiant animal eyes.',
      tips: ['Start with lighter colors first before applying darker shades', 'Use circular strokes with crayons for smooth blending', 'Leave small white highlights for eyes to make animals look alive']
    },
    {
      id: 'vid-2',
      title: 'Watercolour Skies, Rainbows & Magical Landscapes',
      teluguTitle: 'వాటర్ కలర్స్ - ఇంద్రధనస్సు & ప్రకృతి చిత్రాలు',
      duration: '15:20 min',
      level: 'Kids Special',
      views: '68.1k views',
      gradient: 'from-cyan-500 to-blue-700',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Master wet-on-wet watercolor blending to paint glowing sunrises, gentle clouds, and green valleys effortlessly.',
      tips: ['Dampen paper with clean water first for gradient wash', 'Blend yellow into blue to create natural meadow greens', 'Use a dry tissue paper to dab soft fluffy cloud shapes']
    },
    {
      id: 'vid-3',
      title: 'Indian Mandala & Rangoli Geometrical Art for Focus & IQ',
      teluguTitle: 'మండల కళ & రంగవల్లుల డిజైనింగ్',
      duration: '18:10 min',
      level: 'Intermediate',
      views: '35.4k views',
      gradient: 'from-purple-600 to-pink-700',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Geometrical symmetry patterns, floral petals, and concentric circles fostering bilateral brain focus in young learners.',
      tips: ['Use a compass or small circular cap to trace base circles', 'Alternate complementary colors: purple with yellow, orange with cyan', 'Draw breathing deeply to turn art into meditation']
    },
    {
      id: 'vid-4',
      title: 'Color Pencil 3D Shading & Shimmering Highlights',
      teluguTitle: 'కలర్ పెన్సిల్ షేడింగ్ & 3D డ్రాయింగ్',
      duration: '14:35 min',
      level: 'Intermediate',
      views: '29.8k views',
      gradient: 'from-emerald-500 to-teal-700',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Techniques to make simple 2D shapes pop into 3D spheres, shining crystals, and realistic fruits with light source awareness.',
      tips: ['Identify the direction of light before choosing dark edges', 'Layer three tones: highlight, midtone, and deep shadow', 'Blend with white color pencil for glossy enamel shine']
    },
    {
      id: 'vid-5',
      title: 'Panchatantra Jungle Kingdom Characters Colouring',
      teluguTitle: 'పంచతంత్ర కథల పాత్రల రంగుల ప్రయాణం',
      duration: '11:15 min',
      level: 'Beginner',
      views: '54.2k views',
      gradient: 'from-orange-500 to-amber-700',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Bring the clever rabbit, noble lion, honest monkey, and kind elephant from Indian moral stories to vibrant life.',
      tips: ['Match character moral moods with warm cheerful tones', 'Add forest green background details to create depth', 'Trace outlines with a black marker once colors are complete']
    },
    {
      id: 'vid-6',
      title: 'Festive Indian Art: Diwali Diyas, Peacocks & Sweets',
      teluguTitle: 'భారతీయ పండుగల చిత్రాలు & దీపావళి దీపాలు',
      duration: '16:50 min',
      level: 'Kids Special',
      views: '88.9k views',
      gradient: 'from-rose-600 to-purple-800',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Celebrate Indian festivities with radiant earthen clay lamps, golden sparks, peacock feathers, and colorful sweets.',
      tips: ['Use metallic gold or bright yellow near Diya flames', 'Layer peacock feathers with cyan, deep cobalt, and emerald ring', 'Sprinkle glitter or gold pen accents on festival borders']
    }
  ];

  // Curated Kids Colouring & Activity Books
  const colouringBooks: ColouringBook[] = [
    {
      id: 'book-1',
      title: 'Panchatantra Animal Tales Colouring Book',
      teluguTitle: 'పంచతంత్ర నీతి కథల కలరింగ్ పుస్తకం',
      pages: 48,
      ageGroup: 'Ages 4 - 10',
      coverGradient: 'from-amber-600 to-orange-800',
      description: '48 printable sheets featuring moral animal adventures: The Lion and the Rabbit, The Monkey and the Crocodile, and The Loyal Mongoose with Telugu & English captions.',
      tags: ['Panchatantra', 'Moral Stories', 'Printable PDF', 'Animal Friends'],
      pdfUrl: '#',
      sheets: [
        { name: 'The Wise Lion & Little Rabbit', icon: '🦁', theme: 'Wisdom over Brute Force' },
        { name: 'The Kind Monkey & Ocean Crocodile', icon: '🐒', theme: 'True Friendship' },
        { name: 'The Golden Egg Goose & Farmer', icon: '🪿', theme: 'Greed is Poison' },
        { name: 'The Singing Donkey & Clever Fox', icon: '🦊', theme: 'Right Time & Place' }
      ]
    },
    {
      id: 'book-2',
      title: 'Vedic Heritage, Shlokas & Gods Activity Book',
      teluguTitle: 'వేద సంస్కృతి, దేవతలు & శ్లోకాల పుస్తకం',
      pages: 36,
      ageGroup: 'Ages 5 - 12',
      coverGradient: 'from-purple-700 to-indigo-900',
      description: 'Sacred illustrations of Bala Ganesha, Saraswathi Devi, Sri Rama, Hanuman flying over ocean, paired with simple Sanskrit verses and English phonetic lyrics.',
      tags: ['Bala Ganesha', 'Saraswathi', 'Vedic Art', 'Sanskrit Shlokas'],
      pdfUrl: '#',
      sheets: [
        { name: 'Bala Ganesha Eating Modakas', icon: '🐘', theme: 'Remover of Obstacles' },
        { name: 'Goddess Saraswathi on White Lotus', icon: '🪷', theme: 'Wisdom & Learning' },
        { name: 'Veera Hanuman Carrying Sanjeevani', icon: '🏔️', theme: 'Strength & Devotion' },
        { name: 'Sri Krishna Playing Divine Flute', icon: '🦚', theme: 'Joy & Compassion' }
      ]
    },
    {
      id: 'book-3',
      title: 'World Wildlife & Ocean Creatures Activity Book',
      teluguTitle: 'వన్యప్రాణులు & సముద్ర జీవుల కలరింగ్',
      pages: 52,
      ageGroup: 'Ages 3 - 9',
      coverGradient: 'from-cyan-600 to-blue-900',
      description: 'Explore Bengal tigers, Indian peacocks, sea turtles, playful dolphins, coral reefs, and arctic polar bears with animal trivia facts.',
      tags: ['Wildlife', 'Ocean Animals', 'Nature', 'Biodiversity'],
      pdfUrl: '#',
      sheets: [
        { name: 'Royal Bengal Tiger in Bamboo Forest', icon: '🐅', theme: 'India National Animal' },
        { name: 'Blue Whale & Sea Turtle Coral Reef', icon: '🐋', theme: 'Ocean Giants' },
        { name: 'Spotted Deer in Morning Mist', icon: '🦌', theme: 'Gentle Herbivores' },
        { name: 'Kangaroo with Joey in Pouch', icon: '🦘', theme: 'Australian Marsupials' }
      ]
    },
    {
      id: 'book-4',
      title: 'Alphabet, Numbers & STEM Fun Colouring Book',
      teluguTitle: 'అక్షరాలు, అంకెలు & సరదా సైన్స్ కలరింగ్',
      pages: 40,
      ageGroup: 'LKG to Class 2',
      coverGradient: 'from-emerald-600 to-teal-800',
      description: 'Early childhood tracing lines, A to Z phonics pictures, 1 to 20 counting objects, space rockets, and chemistry test tube cartoons.',
      tags: ['Alphabet A-Z', 'Numbers 1-20', 'Tracing', 'Preschool'],
      pdfUrl: '#',
      sheets: [
        { name: 'Letter A for Apple & Astronaut', icon: '🚀', theme: 'Phonics & Space' },
        { name: 'Count 5 Colorful Balloons', icon: '🎈', theme: 'Number Sense' },
        { name: 'Cute Robot Building Clock', icon: '🤖', theme: 'STEM & Coding' },
        { name: 'Rainbow Weather Cloud', icon: '🌈', theme: 'Meteorology Basics' }
      ]
    },
    {
      id: 'book-5',
      title: 'Prehistoric Dinosaurs & Volcanoes Colouring Album',
      teluguTitle: 'డైనోసార్లు & పురాతన ప్రపంచం',
      pages: 32,
      ageGroup: 'Ages 4 - 11',
      coverGradient: 'from-rose-600 to-amber-800',
      description: 'Tyrannosaurus Rex, Brachiosaurus, Triceratops, flying Pterodactyls, fossil digging sites, and smoking volcanoes with scientific period names.',
      tags: ['Dinosaurs', 'T-Rex', 'Fossils', 'Prehistoric'],
      pdfUrl: '#',
      sheets: [
        { name: 'Mighty T-Rex Roaring', icon: '🦖', theme: 'Cretaceous Apex' },
        { name: 'Three-Horned Triceratops Family', icon: '🦕', theme: 'Gentle Giant' },
        { name: 'Flying Pterodactyl over Volcano', icon: '🌋', theme: 'Sky Reptile' },
        { name: 'Archaeologist Excavating Dinosaur Bones', icon: '🦴', theme: 'Paleontology' }
      ]
    },
    {
      id: 'book-6',
      title: 'Indian Festivals, Rangoli & Sweets Coloring Workbook',
      teluguTitle: 'భారతీయ పండుగలు & సాంప్రదాయ కళలు',
      pages: 44,
      ageGroup: 'Ages 5 - 12',
      coverGradient: 'from-violet-600 to-rose-700',
      description: 'Diwali lamps, Sankranti kites, Holi water colors, Pongal clay pots, Christmas trees, and Eid crescent lanterns fostering cultural celebration.',
      tags: ['Diwali', 'Sankranti Kites', 'Rangoli', 'Holi'],
      pdfUrl: '#',
      sheets: [
        { name: 'Flying Kites on Sankranti Rooftop', icon: '🪁', theme: 'Harvest Festival' },
        { name: 'Diwali Clay Diya with Rangoli', icon: '🪔', theme: 'Festival of Lights' },
        { name: 'Traditional Pongal Pot Boiling Milk', icon: '🌾', theme: 'Thanksgiving to Nature' },
        { name: 'Peacock Rangoli with Flowers', icon: '🌸', theme: 'Geometric Art' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. Official powcoloring.com Launch Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-amber-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL KIDS COLOURING PARTNER</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                100% Free • Safe for Kids &amp; Family
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              POW Coloring (<span className="underline decoration-amber-300">powcoloring.com</span>)
            </h2>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
              Discover thousands of free printable and interactive coloring pages for kids, cartoons, animals, mandalas, anime heroes, and seasonal art on <strong>powcoloring.com</strong>. Enjoy digital coloring directly in your browser or download high-resolution PDF sheets to color with real crayons!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://powcoloring.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-rose-600" />
                <span>Open powcoloring.com Official Site</span>
              </a>

              <button
                onClick={() => {
                  const element = document.getElementById('digital-canvas-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-2xl bg-black/40 hover:bg-black/60 text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Palette className="w-4 h-4 text-amber-300" />
                <span>Use In-App Drawing Canvas</span>
              </button>
            </div>
          </div>

          {/* Quick Categories Badge Grid */}
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2.5 shrink-0 max-w-sm w-full">
            <div className="text-xs font-black uppercase text-amber-200 flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              <span>powcoloring.com Popular Categories:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: '🐾 Animals & Pets', desc: 'Lions, Puppies, Birds' },
                { label: '🧚 Anime & Cartoons', desc: 'Heroes & Chibi' },
                { label: '🌸 Mandalas & Rangoli', desc: 'Mindfulness & Focus' },
                { label: '🚀 Space & Dinosaurs', desc: 'Rockets & T-Rex' },
                { label: '🎄 Festivals & Nature', desc: 'Flowers & Holidays' },
                { label: '🚗 Cars & Vehicles', desc: 'Race cars & Planes' }
              ].map((c, i) => (
                <div key={i} className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <div className="font-bold text-white text-[11px]">{c.label}</div>
                  <div className="text-[10px] text-white/70">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive In-App Digital Colouring & Drawing Canvas */}
      <div id="digital-canvas-section" className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-rose-500" />
              <span>Interactive Digital Colouring &amp; Drawing Canvas</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Choose a coloring template outline or blank canvas, pick brush colors, and draw smoothly on desktop or touchscreens!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearCanvas}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset and clear canvas to outline"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Canvas</span>
            </button>

            <button
              onClick={handleDownloadArtwork}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Save drawing as PNG picture"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PNG</span>
            </button>

            <button
              onClick={handlePrintCanvas}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print canvas on physical paper"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Templates Picker Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Templates:</span>
          {[
            { id: 'peacock', label: '🦚 Royal Peacock' },
            { id: 'butterfly', label: '🦋 Garden Butterfly' },
            { id: 'lotus', label: '🪷 Sacred Lotus' },
            { id: 'elephant', label: '🐘 Friendly Elephant' },
            { id: 'dinosaur', label: '🦖 Cute Dino' },
            { id: 'blank', label: '📄 Blank White Canvas' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTemplate === t.id
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Toolbar: Color Palette & Brush Sizing */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Colors Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black text-slate-500 mr-1">Colors:</span>
            {colors.map(c => (
              <button
                key={c.hex}
                onClick={() => {
                  setCurrentColor(c.hex);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 rounded-full transition-transform cursor-pointer border-2 ${
                  !isEraser && currentColor === c.hex
                    ? 'scale-125 border-slate-900 dark:border-white shadow-md'
                    : 'border-white/50 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}

            {/* Eraser Tool */}
            <button
              onClick={() => setIsEraser(true)}
              className={`ml-2 px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isEraser
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200'
              }`}
            >
              <span>🧹</span>
              <span>Eraser</span>
            </button>
          </div>

          {/* Brush Size Slider */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Brush Size:</span>
            {[3, 6, 12, 22].map(size => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                  brushSize === size
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border border-slate-200'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>

        {/* HTML Canvas Board */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-inner bg-white flex justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full max-w-[800px] h-[340px] sm:h-[460px] cursor-crosshair touch-none bg-white"
          />
        </div>
      </div>

      {/* 3. Kids Colouring & Art Video Masterclasses Rail */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500" />
              <span>Kids Colouring &amp; Drawing Video Masterclasses</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Step-by-step video tutorials on crayon shading, watercolors, rangoli patterns, and character art.
            </p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-xl border border-rose-200">
            6 Full Video Lessons
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colouringVideos.map(video => (
            <div
              key={video.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className={`h-32 bg-gradient-to-br ${video.gradient} p-4 flex flex-col justify-between text-white relative`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs">
                    {video.level}
                  </span>
                  <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>
                </div>

                <button
                  onClick={() => setActiveMediaModal({
                    isOpen: true,
                    title: video.title,
                    videoUrl: video.videoUrl,
                    description: video.description,
                    keyPoints: video.tips
                  })}
                  className="self-center w-12 h-12 rounded-full bg-white/30 hover:bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>

                <div className="text-[10px] text-white/80 font-bold">
                  {video.views}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="text-[11px] font-bold text-rose-500 line-clamp-1 mt-0.5">
                    {video.teluguTitle}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveMediaModal({
                      isOpen: true,
                      title: video.title,
                      videoUrl: video.videoUrl,
                      description: video.description,
                      keyPoints: video.tips
                    })}
                    className="w-full py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 text-xs font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Tutorial</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Free Kids Printable Colouring & Activity Books Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Printable Kids Colouring &amp; Activity Books</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Free printable PDF coloring workbooks with Panchatantra stories, Vedic heroes, wildlife animals, and STEM cartoons.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200">
            6 Full Books (250+ Sheets)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colouringBooks.map(book => (
            <div
              key={book.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${book.coverGradient} text-white shadow-md flex items-center justify-between`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/40">
                      {book.ageGroup}
                    </span>
                    <h4 className="text-sm sm:text-base font-black leading-snug">
                      {book.title}
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-center font-black shrink-0">
                    <span className="text-sm leading-none">{book.pages}</span>
                    <span className="text-[9px] uppercase font-bold text-amber-200">Pages</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {book.teluguTitle}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {book.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setPreviewBook(book)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview Sheets</span>
                </button>

                <button
                  onClick={() => {
                    handlePrintCanvas();
                  }}
                  className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  title="Print coloring sheets"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Sheet Preview Dialog */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fade-in text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <span>{previewBook.title}</span>
                </h3>
                <p className="text-xs text-slate-500">{previewBook.teluguTitle} • {previewBook.pages} Printable Sheets</p>
              </div>
              <button
                onClick={() => setPreviewBook(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-black uppercase text-slate-400">Featured Sheets in this Edition:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {previewBook.sheets.map((sheet, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <span className="text-2xl">{sheet.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{sheet.name}</div>
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 truncate">{sheet.theme}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Free for student personal &amp; classroom learning</span>
              <button
                onClick={() => {
                  setPreviewBook(null);
                  handlePrintCanvas();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-md cursor-pointer"
              >
                Print All Sheets
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Media Modal */}
      {activeMediaModal.isOpen && (
        <MediaLinkModal
          isOpen={activeMediaModal.isOpen}
          onClose={() => setActiveMediaModal(prev => ({ ...prev, isOpen: false }))}
          title={activeMediaModal.title}
          videoUrl={activeMediaModal.videoUrl}
          webUrl={activeMediaModal.webUrl}
          description={activeMediaModal.description}
          keyPoints={activeMediaModal.keyPoints}
        />
      )}
    </div>
  );
};
