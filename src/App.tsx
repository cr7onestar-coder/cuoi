import { useState } from 'react';
import { 
  PlusCircle, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart as PieChartIcon, 
  History,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar / Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-6 py-3 md:top-0 md:bottom-auto md:h-screen md:w-64 md:flex-col md:border-t-0 md:border-r">
        <div className="hidden items-center gap-2 pb-8 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Wallet size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">FinTrack Pro</span>
        </div>

        <div className="flex justify-around md:flex-col md:gap-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Tổng quan" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<History size={20} />} 
            label="Lịch sử" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
          <NavItem 
            icon={<PieChartIcon size={20} />} 
            label="Báo cáo" 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Cài đặt" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-24 md:pl-64 md:pb-0">
        <header className="sticky top-0 z-40 border-b bg-white/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              {activeTab === 'dashboard' && 'Tổng quan tài chính'}
              {activeTab === 'history' && 'Lịch sử giao dịch'}
              {activeTab === 'reports' && 'Báo cáo chi tiết'}
              {activeTab === 'settings' && 'Cài đặt tài khoản'}
            </h1>
            <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm giao dịch
            </Button>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'history' && <HistoryView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      <Toaster />
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors md:flex-row md:gap-3 md:px-4 ${
        active 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium md:text-sm">{label}</span>
    </button>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard 
          title="Số dư hiện tại" 
          amount="25,000,000" 
          icon={<Wallet className="text-indigo-600" />} 
          trend="+5.2% so với tháng trước"
        />
        <SummaryCard 
          title="Tổng thu nhập" 
          amount="42,000,000" 
          icon={<TrendingUp className="text-emerald-600" />} 
          trend="Tháng này"
          color="emerald"
        />
        <SummaryCard 
          title="Tổng chi tiêu" 
          amount="17,000,000" 
          icon={<TrendingDown className="text-rose-600" />} 
          trend="Tháng này"
          color="rose"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Biểu đồ thu chi</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-slate-400">
            Biểu đồ sẽ hiển thị ở đây
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Giao dịch gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Wallet size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium">Ăn trưa văn phòng</p>
                      <p className="text-xs text-slate-500">10/04/2026 • Ăn uống</p>
                    </div>
                  </div>
                  <p className="font-semibold text-rose-600">-50,000đ</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({ title, amount, icon, trend, color = 'indigo' }: { title: string, amount: string, icon: React.ReactNode, trend: string, color?: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className={`rounded-full bg-${color}-50 p-2`}>
            {icon}
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-2xl font-bold tracking-tight">{amount}đ</h3>
          <p className="text-xs text-slate-500 mt-1">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function HistoryView() {
  return <div className="text-center py-20 text-slate-500">Chức năng lịch sử đang được xây dựng...</div>;
}

function ReportsView() {
  return <div className="text-center py-20 text-slate-500">Chức năng báo cáo đang được xây dựng...</div>;
}

function SettingsView() {
  return <div className="text-center py-20 text-slate-500">Chức năng cài đặt đang được xây dựng...</div>;
}
