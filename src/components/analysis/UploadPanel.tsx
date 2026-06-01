import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImageIcon, Zap, CheckCircle, X } from 'lucide-react';

interface UploadPanelProps {
  onUpload: (file: File, previewUrl: string) => void;
}

export default function UploadPanel({ onUpload }: UploadPanelProps) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(1) + ' KB');
      onUpload(file, url);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setPreview(null);
    setFileName(null);
    setFileSize(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="pitch-upload"
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`
                relative flex flex-col items-center justify-center gap-5 p-12 rounded-2xl cursor-pointer
                border-2 border-dashed transition-all duration-300
                ${dragging
                  ? 'border-[#00BFFF] bg-[#00BFFF]/8 scale-[1.01]'
                  : 'border-white/10 bg-white/2 hover:border-[#00BFFF]/40 hover:bg-[#00BFFF]/4'
                }
              `}
            >
              {/* Animated corner brackets */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4`}>
                  <div className={`absolute w-full h-px bg-[#00BFFF]/40 ${i < 2 ? 'top-0' : 'bottom-0'}`} />
                  <div className={`absolute h-full w-px bg-[#00BFFF]/40 ${i % 2 === 0 ? 'left-0' : 'right-0'}`} />
                </div>
              ))}

              {/* Icon */}
              <motion.div
                animate={dragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00BFFF]/15 to-[#8B5CF6]/15 border border-[#00BFFF]/20 flex items-center justify-center"
              >
                {dragging ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[#00BFFF]"
                  >
                    <ImageIcon size={36} />
                  </motion.div>
                ) : (
                  <Upload size={32} className="text-[#00BFFF]/70" />
                )}
              </motion.div>

              {/* Text */}
              <div className="text-center">
                <p className="text-white font-semibold text-lg mb-1">
                  {dragging ? 'Drop your pitch image here' : 'Upload Cricket Pitch Image'}
                </p>
                <p className="text-white/40 text-sm">
                  Drag & drop or click to browse
                </p>
                <p className="text-white/25 text-xs mt-2 font-mono">
                  Supports JPG · PNG · JPEG
                </p>
              </div>

              {/* Supported formats */}
              <div className="flex gap-2">
                {['JPG', 'PNG', 'JPEG'].map((fmt) => (
                  <span
                    key={fmt}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#00BFFF]/8 text-[#00BFFF]/70 border border-[#00BFFF]/15"
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              {/* Scanning animation overlay when dragging */}
              {dragging && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              )}
            </label>
            <input
              id="pitch-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={onInputChange}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="glass rounded-2xl overflow-hidden border border-[#00BFFF]/20"
          >
            {/* Image preview */}
            <div className="relative aspect-video bg-black/40">
              <img
                src={preview}
                alt="Pitch preview"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent opacity-60"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,191,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
              {/* Clear button */}
              <button
                onClick={clearFile}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-all"
              >
                <X size={14} />
              </button>
              {/* Ready badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-xs">
                <CheckCircle size={12} className="text-[#39FF14]" />
                <span className="text-white/70">Image loaded</span>
              </div>
            </div>

            {/* File info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center">
                  <ImageIcon size={16} className="text-[#00BFFF]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{fileName}</p>
                  <p className="text-xs text-white/40">{fileSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#39FF14]">
                <Zap size={12} />
                Ready to analyze
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
