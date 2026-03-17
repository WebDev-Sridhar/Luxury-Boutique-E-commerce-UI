import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const clothingSizes = [
  { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", bust: "31-32", waist: "23-24", hips: "33-34" },
  { size: "S", us: "4-6", uk: "8-10", eu: "36-38", bust: "33-34", waist: "25-26", hips: "35-36" },
  { size: "M", us: "8-10", uk: "12-14", eu: "40-42", bust: "35-36", waist: "27-28", hips: "37-38" },
  { size: "L", us: "12-14", uk: "16-18", eu: "44-46", bust: "37-39", waist: "29-31", hips: "39-41" },
  { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", bust: "40-42", waist: "32-34", hips: "42-44" },
];

const shoeSizes = [
  { size: "36", us: "5.5", uk: "3", cm: "22.5" },
  { size: "37", us: "6.5", uk: "4", cm: "23.5" },
  { size: "38", us: "7.5", uk: "5", cm: "24.5" },
  { size: "39", us: "8.5", uk: "6", cm: "25" },
  { size: "40", us: "9", uk: "6.5", cm: "25.5" },
  { size: "41", us: "10", uk: "7.5", cm: "26.5" },
  { size: "42", us: "11", uk: "8.5", cm: "27.5" },
];

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const isShoes = category?.toLowerCase().includes("shoe") || category?.toLowerCase().includes("footwear");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <h2
                className="text-2xl"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              >
                Size Guide
              </h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isShoes ? (
                <>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Shoe Sizes</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="py-3 pr-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">EU</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">US</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">UK</th>
                          <th className="py-3 pl-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">CM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shoeSizes.map((row) => (
                          <tr key={row.size} className="border-b border-border/10">
                            <td className="py-3 pr-4 font-medium">{row.size}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.us}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                            <td className="py-3 pl-4 text-muted-foreground">{row.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Clothing Sizes</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="py-3 pr-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Size</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">US</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">UK</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">EU</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Bust</th>
                          <th className="py-3 px-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Waist</th>
                          <th className="py-3 pl-4 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clothingSizes.map((row) => (
                          <tr key={row.size} className="border-b border-border/10">
                            <td className="py-3 pr-4 font-medium">{row.size}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.us}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.eu}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.bust}"</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.waist}"</td>
                            <td className="py-3 pl-4 text-muted-foreground">{row.hips}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* How to measure */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">How to Measure</p>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                  <p><span className="text-foreground font-medium">Bust:</span> Measure around the fullest part of your chest.</p>
                  <p><span className="text-foreground font-medium">Waist:</span> Measure around the narrowest part of your natural waistline.</p>
                  <p><span className="text-foreground font-medium">Hips:</span> Measure around the fullest part of your hips.</p>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-muted-foreground italic">
                If you're between sizes, we recommend sizing up for a more comfortable fit.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
