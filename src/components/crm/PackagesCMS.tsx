'use client';

import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Compass,
  ListPlus,
  Check,
  X,
  ChevronRight,
  Utensils,
  Hotel as HotelIcon,
  Car,
  Layers,
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { HolidayPackage, ItineraryDay } from '@/data/mockData';
import { formatINR } from '@/lib/utils';

export function PackagesCMS() {
  const { packages, addPackage, updatePackage, deletePackage, togglePackageStatus } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basics' | 'itinerary' | 'inclusions'>('basics');
  const [previewPackage, setPreviewPackage] = useState<HolidayPackage | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    durationDays: 5,
    durationNights: 4,
    price: 24999,
    originalPrice: 32999,
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    season: 'Autumn / Winter',
    hotelCategory: '4-Star Resorts & Boutique Stays',
    transportType: 'Private AC Chauffeur Vehicle',
    status: 'Active' as 'Active' | 'Draft',
    itinerarySummary: 'Scenic tour with luxury 4-star stays, daily breakfast, and private vehicle sightseeing.',
    highlights: ['Private SUV transfers', '4-Star accommodation', 'Daily breakfast & dinner'],
    inclusions: [
      'Deluxe accommodation for all nights',
      'Daily Buffet Breakfast and Chef Dinners',
      'Private AC Cab for transfers and sightseeing',
      'Toll taxes, parking, and driver allowances'
    ],
    exclusions: [
      'Domestic flights or train tickets',
      'Monument entry fees and camera tickets',
      'Personal expenses, tips, and laundry'
    ],
    itineraryDaysList: [
      {
        day: 1,
        title: 'Arrival & Welcome Reception',
        description: 'Arrive at destination airport/station, meet private chauffeur, and transfer to luxury hotel. Evening at leisure.',
        stay: 'Deluxe Heritage Resort',
        meals: 'Dinner Included',
        activities: ['Airport Pick-up', 'Hotel Check-in', 'Evening Stroll']
      },
      {
        day: 2,
        title: 'City Exploration & Key Highlights',
        description: 'Full day sightseeing of famous local landmarks, heritage monuments, and bustling vibrant markets.',
        stay: 'Deluxe Heritage Resort',
        meals: 'Breakfast & Dinner',
        activities: ['Monument visits', 'Local market walk', 'Sunset viewpoint']
      }
    ] as ItineraryDay[]
  });

  // Inputs for adding inclusions / exclusions
  const [newInclusionInput, setNewInclusionInput] = useState('');
  const [newExclusionInput, setNewExclusionInput] = useState('');

  const handleOpenAdd = () => {
    setEditingPackageId(null);
    setActiveTab('basics');
    setFormData({
      title: '',
      destination: '',
      durationDays: 5,
      durationNights: 4,
      price: 24999,
      originalPrice: 32999,
      imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80',
      badge: 'Trending',
      season: 'Winter',
      hotelCategory: '4-Star Luxury Resorts',
      transportType: 'Private Chauffeur Sedan / SUV',
      status: 'Active',
      itinerarySummary: 'Scenic tour with luxury 4-star stays, daily breakfast, and private vehicle sightseeing.',
      highlights: ['Private SUV transfers', '4-Star accommodation', 'Daily breakfast & dinner'],
      inclusions: [
        'Deluxe accommodation for all nights',
        'Daily Buffet Breakfast and Chef Dinners',
        'Private AC Cab for transfers and sightseeing',
        'Toll taxes, parking, and driver allowances'
      ],
      exclusions: [
        'Domestic flights or train tickets',
        'Monument entry fees and camera tickets',
        'Personal expenses and tips'
      ],
      itineraryDaysList: [
        {
          day: 1,
          title: 'Arrival & Scenic Welcome',
          description: 'Arrive at the airport. Private vehicle transfer to your resort. Check-in and relax.',
          stay: 'Grand Mountain View Resort',
          meals: 'Dinner Included',
          activities: ['Airport Pick-up', 'Welcome Refreshments', 'Resort Check-in']
        },
        {
          day: 2,
          title: 'Signature Valley & Heritage Sightseeing',
          description: 'Visit iconic regional valleys, heritage temples, and picturesque viewpoints with private guide.',
          stay: 'Grand Mountain View Resort',
          meals: 'Breakfast & Dinner',
          activities: ['Valley Tour', 'Heritage Temple', 'Local Handicrafts']
        }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: HolidayPackage) => {
    setEditingPackageId(pkg.id);
    setActiveTab('basics');
    setFormData({
      title: pkg.title,
      destination: pkg.destination,
      durationDays: pkg.durationDays,
      durationNights: pkg.durationNights,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      imageUrl: pkg.imageUrl,
      badge: pkg.badge || '',
      season: pkg.season,
      hotelCategory: pkg.hotelCategory || '4-Star Resorts',
      transportType: pkg.transportType || 'Private AC Vehicle',
      status: pkg.status as 'Active' | 'Draft',
      itinerarySummary: pkg.itinerarySummary,
      highlights: pkg.highlights || [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      itineraryDaysList: pkg.itineraryDaysList && pkg.itineraryDaysList.length > 0 ? [...pkg.itineraryDaysList] : [
        {
          day: 1,
          title: 'Arrival & Welcome',
          description: 'Private chauffeur transfer from airport/railway station to accommodation.',
          stay: 'Luxury 4-Star Resort',
          meals: 'Dinner Included',
          activities: ['Airport Pickup', 'Check-in']
        }
      ]
    });
    setIsModalOpen(true);
  };

  // Day builder handlers
  const handleAddItineraryDay = () => {
    const nextDayNum = formData.itineraryDaysList.length + 1;
    const newDay: ItineraryDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum}: Sightseeing & Excursion`,
      description: 'Explore scenic landscapes and key attractions with your private chauffeur.',
      stay: 'Deluxe Resort / Hotel',
      meals: 'Breakfast & Dinner',
      activities: ['Guided Sightseeing', 'Photo-ops']
    };
    setFormData({
      ...formData,
      durationDays: Math.max(formData.durationDays, nextDayNum),
      itineraryDaysList: [...formData.itineraryDaysList, newDay],
    });
  };

  const handleRemoveItineraryDay = (index: number) => {
    if (formData.itineraryDaysList.length <= 1) {
      alert('Itinerary must have at least one day.');
      return;
    }
    const updated = formData.itineraryDaysList.filter((_, i) => i !== index).map((d, i) => ({
      ...d,
      day: i + 1,
    }));
    setFormData({
      ...formData,
      durationDays: updated.length,
      itineraryDaysList: updated,
    });
  };

  const handleUpdateItineraryDay = (index: number, field: keyof ItineraryDay, val: any) => {
    const updated = [...formData.itineraryDaysList];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, itineraryDaysList: updated });
  };

  // Inclusions & Exclusions add/remove
  const handleAddInclusion = () => {
    if (!newInclusionInput.trim()) return;
    setFormData({
      ...formData,
      inclusions: [...formData.inclusions, newInclusionInput.trim()],
    });
    setNewInclusionInput('');
  };

  const handleRemoveInclusion = (index: number) => {
    setFormData({
      ...formData,
      inclusions: formData.inclusions.filter((_, i) => i !== index),
    });
  };

  const handleAddExclusion = () => {
    if (!newExclusionInput.trim()) return;
    setFormData({
      ...formData,
      exclusions: [...formData.exclusions, newExclusionInput.trim()],
    });
    setNewExclusionInput('');
  };

  const handleRemoveExclusion = (index: number) => {
    setFormData({
      ...formData,
      exclusions: formData.exclusions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      alert('Please fill in Package Title and Destination.');
      return;
    }

    if (editingPackageId) {
      updatePackage(editingPackageId, {
        title: formData.title,
        destination: formData.destination,
        durationDays: Number(formData.durationDays),
        durationNights: Number(formData.durationNights),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        imageUrl: formData.imageUrl,
        badge: formData.badge,
        season: formData.season,
        hotelCategory: formData.hotelCategory,
        transportType: formData.transportType,
        status: formData.status,
        itinerarySummary: formData.itinerarySummary,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        itineraryDaysList: formData.itineraryDaysList,
      });
    } else {
      addPackage({
        title: formData.title,
        destination: formData.destination,
        durationDays: Number(formData.durationDays),
        durationNights: Number(formData.durationNights),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        imageUrl: formData.imageUrl,
        badge: formData.badge,
        season: formData.season,
        hotelCategory: formData.hotelCategory,
        transportType: formData.transportType,
        status: formData.status,
        itinerarySummary: formData.itinerarySummary,
        highlights: formData.highlights,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        itineraryDaysList: formData.itineraryDaysList,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header bar - Full Width */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Holiday Packages & Itineraries Catalog
            </h2>
            <span className="text-xs font-bold bg-indigo-50 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {packages.length} Active Packages
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Full control over day-by-day itineraries, pricing, inclusions, and public portal publishing
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
        >
          <Plus className="w-4 h-4 text-saffron-400" />
          <span>Create New Package & Itinerary</span>
        </button>
      </div>

      {/* Packages Table - Full Width */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-4 px-5">Package & Imagery</th>
                <th className="py-4 px-5">Destination</th>
                <th className="py-4 px-5">Duration & Schedule</th>
                <th className="py-4 px-5">Offer Price (₹)</th>
                <th className="py-4 px-5">Hotel & Transport</th>
                <th className="py-4 px-5">Visibility</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-xs sm:max-w-md">
                        <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                          {pkg.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          {pkg.badge && (
                            <span className="text-[10px] font-bold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                              {pkg.badge}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400">Season: {pkg.season}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="py-4 px-5 font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate max-w-[150px]">{pkg.destination}</span>
                    </div>
                  </td>

                  {/* Duration & Itinerary Button */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900">
                      {pkg.durationDays} Days / {pkg.durationNights} Nights
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewPackage(pkg)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 mt-1 cursor-pointer underline"
                    >
                      <Compass className="w-3 h-3" />
                      <span>{pkg.itineraryDaysList?.length || pkg.durationDays} Days Itinerary Plan</span>
                    </button>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-5">
                    <div className="font-black text-slate-900 text-sm">{formatINR(pkg.price)}</div>
                    <div className="text-[10px] text-slate-400 line-through">
                      {formatINR(pkg.originalPrice)}
                    </div>
                  </td>

                  {/* Hotel & Transport */}
                  <td className="py-4 px-5 text-slate-600 text-[11px] space-y-0.5">
                    <div className="flex items-center gap-1 truncate max-w-[180px]">
                      <HotelIcon className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{pkg.hotelCategory || '4-Star'}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate max-w-[180px]">
                      <Car className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{pkg.transportType || 'Private Sedan'}</span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-4 px-5">
                    <button
                      type="button"
                      onClick={() => togglePackageStatus(pkg.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                        pkg.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {pkg.status === 'Active' ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Active on Portal</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>Draft (Hidden)</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(pkg)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 transition cursor-pointer"
                        title="Edit Full Itinerary & Pricing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete package "${pkg.title}" permanently?`)) {
                            deletePackage(pkg.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL CMS ITINERARY EDIT MODAL WITH TABS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest">
                  CMS Operations Engine
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {editingPackageId ? 'Edit Package & Full Itinerary' : 'Create New Holiday Package & Itinerary'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs: Basics | Day-by-Day Builder | Inclusions */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
              {[
                { id: 'basics', label: '1. Basic Details & Pricing', icon: Layers },
                { id: 'itinerary', label: `2. Day-by-Day Itinerary (${formData.itineraryDaysList.length} Days)`, icon: Compass },
                { id: 'inclusions', label: '3. Inclusions & Exclusions', icon: ListPlus },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-white text-indigo-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* TAB 1: BASICS */}
              {activeTab === 'basics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Package Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Enchanting Kashmir & Gulmarg Snow Wonderland"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Kashmir (Srinagar, Gulmarg, Pahalgam)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Season Tag
                      </label>
                      <input
                        type="text"
                        value={formData.season}
                        onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                        placeholder="e.g. Autumn / Winter"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Itinerary Days
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.durationDays}
                        onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Itinerary Nights
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.durationNights}
                        onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Selling Offer Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Rack Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Hotel Accommodation Category
                      </label>
                      <input
                        type="text"
                        value={formData.hotelCategory}
                        onChange={(e) => setFormData({ ...formData, hotelCategory: e.target.value })}
                        placeholder="e.g. 4-Star Resorts & Luxury Houseboat"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Transportation Type
                      </label>
                      <input
                        type="text"
                        value={formData.transportType}
                        onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                        placeholder="e.g. Private AC Chauffeur SUV"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hero Banner Image URL (Unsplash or CDN)
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Badge Tag
                      </label>
                      <select
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                      >
                        <option value="">No Badge</option>
                        <option value="Bestseller">Bestseller</option>
                        <option value="Trending">Trending</option>
                        <option value="Heritage Classic">Heritage Classic</option>
                        <option value="Adventure">Adventure</option>
                        <option value="International">International</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Publish Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold"
                      >
                        <option value="Active">Active (Live on B2C Portal)</option>
                        <option value="Draft">Draft (Internal Only)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Itinerary Quick Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.itinerarySummary}
                      onChange={(e) => setFormData({ ...formData, itinerarySummary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: FULL DAY-BY-DAY ITINERARY BUILDER */}
              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        Day-by-Day Schedule ({formData.itineraryDaysList.length} Days)
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Add detailed titles, daily schedule narratives, meal plans, and hotel stays for every single day
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItineraryDay}
                      className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-saffron-400" />
                      <span>Add Next Day</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.itineraryDaysList.map((dayItem, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs bg-indigo-950 text-white px-2.5 py-1 rounded-lg">
                              Day {dayItem.day}
                            </span>
                            <span className="font-bold text-slate-700 text-xs">
                              Itinerary Stage
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(index)}
                            className="text-red-500 hover:text-red-700 text-[11px] font-bold p-1"
                            title="Remove this day"
                          >
                            Delete Day ✕
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Day Title
                            </label>
                            <input
                              type="text"
                              value={dayItem.title}
                              onChange={(e) => handleUpdateItineraryDay(index, 'title', e.target.value)}
                              placeholder="e.g. Arrival in Srinagar & Sunset Shikara"
                              className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Meals Provided
                              </label>
                              <input
                                type="text"
                                value={dayItem.meals}
                                onChange={(e) => handleUpdateItineraryDay(index, 'meals', e.target.value)}
                                placeholder="e.g. Breakfast & Dinner"
                                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Overnight Stay Hotel
                              </label>
                              <input
                                type="text"
                                value={dayItem.stay}
                                onChange={(e) => handleUpdateItineraryDay(index, 'stay', e.target.value)}
                                placeholder="e.g. Dal Lake Houseboat"
                                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Detailed Day Schedule Narrative
                          </label>
                          <textarea
                            rows={3}
                            value={dayItem.description}
                            onChange={(e) => handleUpdateItineraryDay(index, 'description', e.target.value)}
                            placeholder="Describe the activities, sightseeing spots, and timings for this day..."
                            className="w-full px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-slate-800 text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="w-full py-3 border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 rounded-2xl text-xs font-bold text-indigo-950 flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Plus className="w-4 h-4 text-indigo-600" />
                    <span>Append Another Itinerary Day (+ Day {formData.itineraryDaysList.length + 1})</span>
                  </button>
                </div>
              )}

              {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
              {activeTab === 'inclusions' && (
                <div className="space-y-6">
                  {/* Inclusions */}
                  <div className="space-y-3">
                    <label className="block font-bold text-slate-900 text-xs">
                      Tour Inclusions (What&apos;s Included):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInclusionInput}
                        onChange={(e) => setNewInclusionInput(e.target.value)}
                        placeholder="Add new inclusion (e.g. All Fort Entry Permits)..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddInclusion}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Add Inclusion
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {formData.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{inc}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveInclusion(i)}
                            className="text-slate-400 hover:text-red-600 p-1 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="block font-bold text-slate-900 text-xs">
                      Tour Exclusions (What&apos;s Not Included):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newExclusionInput}
                        onChange={(e) => setNewExclusionInput(e.target.value)}
                        placeholder="Add new exclusion (e.g. Camera or Gondola passes)..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddExclusion}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Add Exclusion
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {formData.exclusions.map((exc, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{exc}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExclusion(i)}
                            className="text-slate-400 hover:text-red-600 p-1 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Submit Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('basics')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'basics' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    1. Basics
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('itinerary')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'itinerary' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    2. Itinerary
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('inclusions')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'inclusions' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    3. Inclusions
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    {editingPackageId ? 'Update Package & Itinerary' : 'Publish Package & Itinerary'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ITINERARY PREVIEW DRAWER (FOR ADMIN INSPECTION) */}
      {previewPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white h-full w-full max-w-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest">
                  Itinerary Inspector
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {previewPackage.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {previewPackage.durationDays} Days / {previewPackage.durationNights} Nights • {previewPackage.destination}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPackage(null)}
                className="p-2 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {previewPackage.itineraryDaysList?.map((day) => (
                <div key={day.day} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-950 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Day {day.day}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                      {day.meals}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{day.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex justify-between">
                    <span>Stay: <strong>{day.stay}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const pkg = previewPackage;
                  setPreviewPackage(null);
                  handleOpenEdit(pkg);
                }}
                className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-xs font-bold"
              >
                Edit This Itinerary
              </button>
              <button
                type="button"
                onClick={() => setPreviewPackage(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
