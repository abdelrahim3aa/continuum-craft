import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, X, Search, ArrowUpDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSectionProps {
  onFilterChange?: (filters: FilterState) => void;
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: SortOption) => void;
}

export type SortOption = 'date-desc' | 'date-asc' | 'alpha-asc' | 'alpha-desc' | 'priority';

export interface FilterState {
  type: string[];
  technology: string[];
}

const typeFilters = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "API",
  "Server Rendered",
];

const technologyFilters = [
  "Node.js",
  "Express",
  "PHP",
  "Laravel",
  "Blade",
  "React",
  "MySQL",
  "MongoDB",
];

export const FilterSection = ({ onFilterChange, onSearchChange, onSortChange }: FilterSectionProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All"]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'alpha-asc', label: 'A-Z' },
    { value: 'alpha-desc', label: 'Z-A' },
    { value: 'priority', label: 'Priority' },
  ];

  const handleTypeToggle = (type: string) => {
    let newTypes: string[];
    
    if (type === "All") {
      newTypes = ["All"];
      setSelectedTechnologies([]);
    } else {
      newTypes = selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes.filter((t) => t !== "All"), type];
      
      if (newTypes.length === 0) {
        newTypes = ["All"];
      }
    }
    
    setSelectedTypes(newTypes);
    onFilterChange?.({
      type: newTypes,
      technology: selectedTechnologies,
    });
  };

  const handleTechnologyToggle = (tech: string) => {
    const newTechs = selectedTechnologies.includes(tech)
      ? selectedTechnologies.filter((t) => t !== tech)
      : [...selectedTechnologies, tech];
    
    setSelectedTechnologies(newTechs);
    onFilterChange?.({
      type: selectedTypes,
      technology: newTechs,
    });
  };

  const handleSearchChangeLocal = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    onSortChange?.(value);
  };

  const clearAllFilters = () => {
    setSelectedTypes(["All"]);
    setSelectedTechnologies([]);
    setSearchQuery("");
    setSortOption('date-desc');
    onFilterChange?.({
      type: ["All"],
      technology: [],
    });
    onSearchChange?.("");
    onSortChange?.('date-desc');
  };

  const hasActiveFilters = 
    !selectedTypes.includes("All") || selectedTechnologies.length > 0 || searchQuery.length > 0;

  const activeFilterCount = 
    (selectedTypes.includes("All") ? 0 : selectedTypes.length) + 
    selectedTechnologies.length + 
    (searchQuery.length > 0 ? 1 : 0);

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-card via-card/95 to-accent/5 backdrop-blur-sm border-2 border-accent/30 rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />
      
      {/* Floating particles effect */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Content wrapper with z-index to stay above background */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Filter className="w-6 h-6 text-accent" />
            </motion.div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Filter & Search Projects
                </h2>
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 rounded-full"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-sm font-semibold text-accent">
                      {activeFilterCount} active
                    </span>
                  </motion.div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Refine your search by type, technology, and keywords
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 transition-all"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-8"
            >
              {/* Search Bar */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Search Projects</h3>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by title, description, or technology..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChangeLocal(e.target.value)}
                    className="pl-10 pr-10 h-12 text-base border-2 border-accent/20 focus:border-accent transition-all rounded-xl bg-background/50"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleSearchChangeLocal("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-accent/10 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Sort By</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option, index) => {
                    const isSelected = sortOption === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`
                          px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                          ${
                            isSelected
                              ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                              : "bg-background/50 border-border hover:bg-secondary hover:border-accent/50"
                          }
                        `}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Type Filters */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Filter by Type
                  </h3>
                  <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                    Primary
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((type, index) => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                      <motion.button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`
                          px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                          ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-background/50 border-border hover:bg-secondary hover:border-primary/50"
                          }
                        `}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {type}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Technology Filters */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Filter by Technology
                  </h3>
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                    Secondary
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologyFilters.map((tech, index) => {
                    const isSelected = selectedTechnologies.includes(tech);
                    return (
                      <motion.button
                        key={tech}
                        onClick={() => handleTechnologyToggle(tech)}
                        className={`
                          px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                          ${
                            isSelected
                              ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                              : "bg-background/50 border-border hover:bg-secondary hover:border-accent/50"
                          }
                        `}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {tech}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <motion.div 
                  className="pt-6 border-t-2 border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      Active Filters:
                    </span>
                    {searchQuery && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent border border-accent/30 px-3 py-1">
                        🔍 "{searchQuery}"
                      </Badge>
                    )}
                    {!selectedTypes.includes("All") &&
                      selectedTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="bg-primary/20 text-primary border border-primary/30 px-3 py-1"
                        >
                          📁 {type}
                        </Badge>
                      ))}
                    {selectedTechnologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-accent/20 text-accent border border-accent/30 px-3 py-1"
                      >
                        ⚡ {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};