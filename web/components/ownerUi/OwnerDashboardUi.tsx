export default function DashboardUi() {
  return (
    <main className="max-w-[1600] mx-auto p-6 flex flex-col gap-6">
      <section className="flex flex-col md:flex-row h-fit min-h-[300] w-full p-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex-1 flex flex-col justify-center items-start space-y-3">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Shop Operations Center</h1>
            <p className="text-lg text-muted-foreground max-w-md">Manage your store profile, operational status, and platform configuration.</p>
          </div>
          <button className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all">Edit Store Profile</button>
        </div>

        <figure className="flex-1 hidden md:flex justify-center items-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <span className="text-slate-400 font-medium">Store Illustration / Analytics Graphic</span>
        </figure>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 flex flex-col h-[450] border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Monthly Profit</h3>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">YTD +12%</span>
          </div>
          <div className="flex-1 flex justify-center items-center bg-slate-50 border border-dashed rounded-lg">
            <h1 className="text-slate-400">Profit Chart (Recharts)</h1>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col h-[450] border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">What We Sell</h3>
            <p className="text-sm text-slate-500">Quick product & variant overview</p>
          </div>
          <div className="flex-1 flex justify-center items-center bg-slate-50 border border-dashed rounded-lg">
            <h1 className="text-slate-400">Product List Placeholder</h1>
          </div>
        </div>
      </div>

      <footer className="w-full py-6 px-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-400">
        <div>© 2026 Admin Panel • POS System</div>
        <div className="flex gap-4">
          <span>
            System Status: <span className="text-green-500 font-medium">Online</span>
          </span>
        </div>
      </footer>
    </main>
  );
}
