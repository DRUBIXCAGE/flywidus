import { create } from 'zustand';
import {
  HolidayPackage,
  Booking,
  Customer,
  INITIAL_PACKAGES,
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
} from '@/data/mockData';

interface AdminState {
  // Sidebar state
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;

  // CMS: Holiday Packages
  packages: HolidayPackage[];
  addPackage: (pkg: Omit<HolidayPackage, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<HolidayPackage>) => void;
  deletePackage: (id: string) => void;
  togglePackageStatus: (id: string) => void;

  // CRM: Bookings
  bookings: Booking[];
  updateBookingStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Cancelled') => void;
  updatePaymentStatus: (id: string, status: 'Paid' | 'Pending' | 'Refunded') => void;

  // CRM: Customers
  customers: Customer[];
  addCustomerNote: (id: string, note: string) => void;

  // Metrics
  getMetrics: () => {
    totalRevenue: number;
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    activeUsers: number;
    conversionRate: number;
  };
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  isMobileSidebarOpen: false,
  setIsMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

  packages: INITIAL_PACKAGES,
  addPackage: (newPkg) => {
    const pkg: HolidayPackage = {
      ...newPkg,
      id: `pkg-${Date.now()}`,
    };
    set((state) => ({ packages: [pkg, ...state.packages] }));
  },
  updatePackage: (id, updatedFields) => {
    set((state) => ({
      packages: state.packages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updatedFields } : pkg
      ),
    }));
  },
  deletePackage: (id) => {
    set((state) => ({
      packages: state.packages.filter((pkg) => pkg.id !== id),
    }));
  },
  togglePackageStatus: (id) => {
    set((state) => ({
      packages: state.packages.map((pkg) => {
        if (pkg.id === id) {
          const nextStatus = pkg.status === 'Active' ? 'Draft' : 'Active';
          return { ...pkg, status: nextStatus };
        }
        return pkg;
      }),
    }));
  },

  bookings: INITIAL_BOOKINGS,
  updateBookingStatus: (id, status) => {
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    }));
  },
  updatePaymentStatus: (id, paymentStatus) => {
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, paymentStatus } : b)),
    }));
  },

  customers: INITIAL_CUSTOMERS,
  addCustomerNote: (id, note) => {
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id
          ? {
              ...c,
              notes: `${note} — (Added ${new Date().toLocaleDateString('en-IN')}) | ${c.notes}`,
              lastInteraction: new Date().toISOString().split('T')[0],
            }
          : c
      ),
    }));
  },

  getMetrics: () => {
    const { bookings } = get();
    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === 'Paid')
      .reduce((sum, b) => sum + b.amount, 0);
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed').length;
    const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
    const activeUsers = 12480;
    const conversionRate = 4.3;

    return {
      totalRevenue,
      totalBookings,
      confirmedBookings,
      pendingBookings,
      activeUsers,
      conversionRate,
    };
  },
}));
