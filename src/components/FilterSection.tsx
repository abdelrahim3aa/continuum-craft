import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, X, Search, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

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

  const handleSearchChange = (value: string) => {
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

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Filter Projects
            </h2>
            <p className="text-sm text-muted-foreground">
              Refine your search by type and technology
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground">Search Projects</h3>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground">Sort By</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => {
                const isSelected = sortOption === option.value;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isSelected
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "bg-filter-bg border border-border hover:bg-secondary hover:border-accent/50"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
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
              <h3 className="text-sm font-medium text-foreground">
                Filter by Type
              </h3>
              <Badge variant="secondary" className="text-xs">
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
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground hover:bg-filter-hover shadow-sm"
                          : "bg-filter-bg border border-border hover:bg-secondary hover:border-primary/50"
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
              <h3 className="text-sm font-medium text-foreground">
                Filter by Technology
              </h3>
              <Badge variant="outline" className="text-xs">
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
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isSelected
                          ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
                          : "bg-filter-bg border border-border hover:bg-secondary hover:border-accent/50"
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
            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {!selectedTypes.includes("All") &&
                  selectedTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {type}
                    </Badge>
                  ))}
                {selectedTechnologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-accent/10 text-accent"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
