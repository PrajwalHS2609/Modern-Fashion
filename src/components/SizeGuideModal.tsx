import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');

  if (!isSizeGuideOpen) return null;

  const womenSizes = [
    { fr: '34 FR', it: '38 IT', us: '2 US', uk: '6 UK', bustCm: '82-85', bustIn: '32-33.5', waistCm: '62-65', waistIn: '24.5-25.5', hipCm: '88-91', hipIn: '34.5-36' },
    { fr: '36 FR', it: '40 IT', us: '4 US', uk: '8 UK', bustCm: '86-89', bustIn: '34-35', waistCm: '66-69', waistIn: '26-27', hipCm: '92-95', hipIn: '36.5-37.5' },
    { fr: '38 FR', it: '42 IT', us: '6 US', uk: '10 UK', bustCm: '90-93', bustIn: '35.5-36.5', waistCm: '70-73', waistIn: '27.5-28.5', hipCm: '96-99', hipIn: '38-39' },
    { fr: '40 FR', it: '44 IT', us: '8 US', uk: '12 UK', bustCm: '94-97', bustIn: '37-38', waistCm: '74-77', waistIn: '29-30.5', hipCm: '100-103', hipIn: '39.5-40.5' },
    { fr: '42 FR', it: '46 IT', us: '10 US', uk: '14 UK', bustCm: '98-102', bustIn: '38.5-40', waistCm: '78-82', waistIn: '31-32.5', hipCm: '104-108', hipIn: '41-42.5' }
  ];

  const menSizes = [
    { it: '46 IT', fr: '42 FR', us: '36 US', uk: '36 UK', chestCm: '92-95', chestIn: '36-37.5', waistCm: '78-81', waistIn: '30.5-32', collarCm: '38', collarIn: '15' },
    { it: '48 IT', fr: '44 FR', us: '38 US', uk: '38 UK', chestCm: '96-99', chestIn: '38-39', waistCm: '82-85', waistIn: '32.5-33.5', collarCm: '39', collarIn: '15.5' },
    { it: '50 IT', fr: '46 FR', us: '40 US', uk: '40 UK', chestCm: '100-103', chestIn: '39.5-40.5', waistCm: '86-89', waistIn: '34-35', collarCm: '40', collarIn: '16' },
    { it: '52 IT', fr: '48 FR', us: '42 US', uk: '42 UK', chestCm: '104-107', chestIn: '41-42', waistCm: '90-93', waistIn: '35.5-36.5', collarCm: '41', collarIn: '16.5' },
    { it: '54 IT', fr: '50 FR', us: '44 US', uk: '44 UK', chestCm: '108-112', chestIn: '42.5-44', waistCm: '94-98', waistIn: '37-38.5', collarCm: '42', collarIn: '17' }
  ];

  return (
    <div
      onClick={() => setIsSizeGuideOpen(false)}
      className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DFD2] shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
      >
        <div className="p-6 bg-white border-b border-[#E8DFD2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#B89B65]" />
            <h3 className="font-editorial text-xl text-[#171717]">Atelier Size & Measurements</h3>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-[#454545] hover:text-[#171717] rounded-full transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Controls: Gender & Units */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD2] pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveGender('women')}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeGender === 'women' ? 'bg-[#171717] text-white' : 'bg-white text-[#454545] border border-[#E8DFD2]'
                }`}
              >
                Women&apos;s Sizing
              </button>
              <button
                onClick={() => setActiveGender('men')}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeGender === 'men' ? 'bg-[#171717] text-white' : 'bg-white text-[#454545] border border-[#E8DFD2]'
                }`}
              >
                Men&apos;s Sartorial
              </button>
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#E8DFD2] p-1 text-xs">
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-0.5 font-medium transition-colors ${unit === 'cm' ? 'bg-[#171717] text-white' : 'text-[#888888]'}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-0.5 font-medium transition-colors ${unit === 'in' ? 'bg-[#171717] text-white' : 'text-[#888888]'}`}
              >
                INCHES
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto bg-white border border-[#E8DFD2]">
            {activeGender === 'women' ? (
              <table className="w-full text-xs text-left font-sans-body">
                <thead className="bg-[#F7F5F0] border-b border-[#E8DFD2] text-[#171717] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">France</th>
                    <th className="p-3">Italy</th>
                    <th className="p-3">US</th>
                    <th className="p-3">UK</th>
                    <th className="p-3">Bust ({unit})</th>
                    <th className="p-3">Waist ({unit})</th>
                    <th className="p-3">Hips ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD2]">
                  {womenSizes.map((row) => (
                    <tr key={row.fr} className="hover:bg-[#FAF9F5] transition-colors">
                      <td className="p-3 font-semibold text-[#171717]">{row.fr}</td>
                      <td className="p-3 text-[#454545]">{row.it}</td>
                      <td className="p-3 text-[#454545]">{row.us}</td>
                      <td className="p-3 text-[#454545]">{row.uk}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs text-left font-sans-body">
                <thead className="bg-[#F7F5F0] border-b border-[#E8DFD2] text-[#171717] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Italy</th>
                    <th className="p-3">France</th>
                    <th className="p-3">US / UK</th>
                    <th className="p-3">Chest ({unit})</th>
                    <th className="p-3">Waist ({unit})</th>
                    <th className="p-3">Collar ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD2]">
                  {menSizes.map((row) => (
                    <tr key={row.it} className="hover:bg-[#FAF9F5] transition-colors">
                      <td className="p-3 font-semibold text-[#171717]">{row.it}</td>
                      <td className="p-3 text-[#454545]">{row.fr}</td>
                      <td className="p-3 text-[#454545]">{row.us}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.chestCm : row.chestIn}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                      <td className="p-3 tabular-nums text-[#171717]">{unit === 'cm' ? row.collarCm : row.collarIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Measuring Advice */}
          <div className="p-5 bg-white border border-[#E8DFD2] space-y-2 text-xs text-[#454545] font-sans-body">
            <h4 className="font-semibold text-[#171717]">How to Take Measurements:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li><span className="font-semibold text-[#171717]">Bust/Chest:</span> Measure horizontally around the fullest part of your chest with a relaxed posture.</li>
              <li><span className="font-semibold text-[#171717]">Natural Waist:</span> Measure around the narrowest contour above your hip bones.</li>
              <li><span className="font-semibold text-[#171717]">Fit Advisory:</span> Our blazers and coats are cut with an architectural, slightly relaxed drape. If you prefer a glove-like fitted look, order one size down.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
