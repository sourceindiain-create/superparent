import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/mockData';
import { Award, CheckCircle2, Download, Printer, X } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  courseTitle?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Chaitanya Reddy',
  courseTitle = 'Gurukul Future Skills, Robotics & Sanskar Course'
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore confetti failure if canvas not ready
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const certificateCode = `SP-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2D2D20]/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-3xl rounded-[32px] shadow-natural-lg overflow-hidden border-4 border-[#5A5A40] p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#73735C] hover:text-[#333322] bg-[#EFEFE6] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Frame */}
        <div className="border-2 border-dashed border-[#5A5A40] p-6 rounded-2xl bg-[#FAF9F6] text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#5A5A40] text-[#FAF9F6] font-black text-2xl flex items-center justify-center shadow-sm">
              <Award className="w-10 h-10 text-[#C29B38]" />
            </div>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#5A5A40] block">
              SUPER PARENT — All-in-One Gurukul
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#333322] font-serif-title tracking-tight mt-1">
              Certificate of Excellence & Achievement
            </h2>
            <p className="text-xs text-[#73735C] font-medium">
              Smart Parent • Happy Child • Bright Future
            </p>
          </div>

          <div className="py-3 space-y-2">
            <p className="text-xs text-[#73735C] font-serif-title italic">This is proudly presented to</p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#5A5A40] font-serif-title underline decoration-[#C29B38] decoration-2">
              {studentName}
            </h3>
            <p className="text-xs text-[#333322] font-medium max-w-lg mx-auto pt-2 leading-relaxed">
              For successfully completing the comprehensive learning modules in <strong className="text-[#2D2D20]">{courseTitle}</strong>, demonstrating excellence in Academic Knowledge, Hands-On Robotics & Circuit Skills, and Indian Culture & Sanskar Values.
            </p>
          </div>

          {/* Certificate Footer Metadata */}
          <div className="pt-4 border-t border-[#DCDCCE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-left font-mono text-[#73735C]">
              <div>Cert Code: <strong className="text-[#333322]">{certificateCode}</strong></div>
              <div>Issue Date: <strong className="text-[#333322]">{issueDate}</strong></div>
            </div>

            <div className="text-center font-serif-title text-[#333322]">
              <div className="font-bold text-[#5A5A40]">SUPER PARENT GURUKUL</div>
              <div className="text-[10px] text-[#73735C]">Bengaluru HO & Visakhapatnam Branch</div>
            </div>

            <div className="text-right text-[10px] text-[#73735C]">
              Verified Digital Record • 100% Authentic
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#DCDCCE]">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#EFEFE6] hover:bg-[#DCDCCE] text-[#333322] font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>

          <button
            onClick={() => alert(`Certificate downloaded for ${studentName}!`)}
            className="flex items-center gap-2 bg-[#5A5A40] hover:bg-[#484832] text-[#FAF9F6] font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
