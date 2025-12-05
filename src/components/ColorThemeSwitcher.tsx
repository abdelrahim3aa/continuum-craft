import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const COLOR_THEMES = [
  { name: 'Green', accent: '84 100% 50%', ring: '84 100% 50%' },
  { name: 'Purple', accent: '270 70% 55%', ring: '270 70% 55%' },
  { name: 'Orange', accent: '30 100% 55%', ring: '30 100% 55%' },
  { name: 'Cyan', accent: '180 80% 50%', ring: '180 80% 50%' },
  { name: 'Pink', accent: '330 80% 60%', ring: '330 80% 60%' },
  { name: 'Gold', accent: '45 100% 50%', ring: '45 100% 50%' },
];

interface ColorThemeSwitcherProps {
  variant?: 'fixed' | 'inline';
}

const ColorThemeSwitcher = ({ variant = 'fixed' }: ColorThemeSwitcherProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme-index');
    if (savedTheme) {
      const index = parseInt(savedTheme);
      setCurrentIndex(index);
      applyTheme(index);
    }
  }, []);

  const applyTheme = (index: number) => {
    const theme = COLOR_THEMES[index];
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--ring', theme.ring);
  };

  const selectTheme = (index: number) => {
    setCurrentIndex(index);
    applyTheme(index);
    localStorage.setItem('color-theme-index', index.toString());
    setIsOpen(false);
  };

  const randomizeTheme = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * COLOR_THEMES.length);
    } while (newIndex === currentIndex);
    selectTheme(newIndex);
  };

  if (variant === 'inline') {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          onDoubleClick={randomizeTheme}
          className="p-2 rounded-full border border-divider hover:bg-accent/10 transition-colors"
          aria-label="Change accent color"
          title="Click to choose, double-click to randomize"
        >
          <Palette size={18} className="text-accent" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-12 right-0 p-2 rounded-xl bg-card border border-border shadow-xl flex flex-col gap-1 min-w-[120px]"
            >
              {COLOR_THEMES.map((theme, index) => (
                <motion.button
                  key={theme.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectTheme(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentIndex === index ? 'bg-secondary' : 'hover:bg-secondary/50'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.accent})` }}
                  />
                  <span className="text-sm text-foreground">{theme.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-20 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        onDoubleClick={randomizeTheme}
        className="p-3 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-shadow border border-border"
        aria-label="Change accent color"
        title="Click to choose, double-click to randomize"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-14 right-0 p-2 rounded-xl bg-card border border-border shadow-xl flex flex-col gap-2"
          >
            {COLOR_THEMES.map((theme, index) => (
              <motion.button
                key={theme.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectTheme(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentIndex === index ? 'bg-secondary' : 'hover:bg-secondary/50'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.accent})` }}
                />
                <span className="text-sm text-foreground">{theme.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorThemeSwitcher;
