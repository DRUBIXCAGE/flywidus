'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plane, MapPin, Search, X } from 'lucide-react';
import { Airport, AIRPORTS } from '@/data/mockData';

interface DebouncedAutocompleteProps {
  label: string;
  value: Airport;
  onChange: (airport: Airport) => void;
  placeholder?: string;
  className?: string;
}

export function DebouncedAutocomplete({
  label,
  value,
  onChange,
  placeholder = 'Search city or airport...',
  className = '',
}: DebouncedAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>(AIRPORTS);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredAirports(AIRPORTS.slice(0, 8));
      } else {
        const query = searchTerm.toLowerCase();
        const results = AIRPORTS.filter(
          (item) =>
            item.code.toLowerCase().includes(query) ||
            item.city.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.country.toLowerCase().includes(query)
        );
        setFilteredAirports(results);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      {/* Main Trigger Button */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm('');
        }}
        className="w-full flex items-center justify-between p-3.5 bg-white/80 hover:bg-white rounded-xl border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer group hover:border-indigo-400 hover:shadow-md"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <Plane className="w-5 h-5 rotate-45" />
          </div>
          <div className="truncate text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">{value.city}</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 tracking-wide">
                {value.code}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5 max-w-[190px]">
              {value.name}
            </p>
          </div>
        </div>
      </div>

      {/* Dropdown Floating Modal */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input with Debounce */}
          <div className="relative mb-2.5">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            {searchTerm ? 'Search Results' : 'Popular Indian & Global Hubs'}
          </div>

          {/* Results list */}
          <div className="max-h-64 overflow-y-auto space-y-1 mt-1 pr-1">
            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport) => {
                const isSelected = airport.code === value.code;
                return (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSelect(airport)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors duration-150 ${
                      isSelected
                        ? 'bg-indigo-50/90 text-indigo-900 border border-indigo-200/60'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-sm text-slate-900">
                          {airport.city}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[210px]">
                          {airport.name}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                        isSelected
                          ? 'bg-indigo-200/60 text-indigo-900'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {airport.code}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                No matching destinations found for &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
