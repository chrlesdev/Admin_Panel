export default function MainLandingUi() {
  return (
    <main className="w-full flex flex-col">
      <section className="w-full min-h-[600] flex flex-col md:flex-row items-center justify-center px-10 py-20 bg-linear-to-b from-white to-slate-50">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Elevate Your <span className="text-red-500">Small Business</span> Operations
          </h1>
          <p className="text-xl text-slate-600 max-w-lg">A specialized POS ecosystem designed for owners to track every product, monitor monthly profit, and grow with data-driven insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform">Get Started for Free</button>
            <button className="px-8 py-4 border border-slate-200 rounded-full font-bold hover:bg-white shadow-sm transition-all">Watch Demo</button>
          </div>
        </div>

        <div className="flex-1 mt-12 md:mt-0 w-full max-w-2xl aspect-video bg-white rounded-2xl shadow-2xl border border-slate-200 flex justify-center items-center overflow-hidden">
          <div className="text-slate-400 font-medium italic flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 mb-2 flex items-center justify-center">▶</div>
            Visual Dashboard Preview
          </div>
        </div>
      </section>

      <section className="py-24 px-10 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Everything you need to succeed</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-3">Product CRUD</h3>
            <p className="text-slate-500 text-sm">Easily manage your inventory, variants, and pricing strategies in real-time.</p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-3">Profit Analytics</h3>
            <p className="text-slate-500 text-sm">Visualize your growth with detailed monthly charts and revenue insights.</p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-3">Multi-Tenant</h3>
            <p className="text-slate-500 text-sm">Scalable architecture built for individual owners and growing teams.</p>
          </div>
        </div>
      </section>

      <footer className="py-20 px-10 bg-slate-900 text-white flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your business?</h2>
        <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all">Join the Beta Now</button>
        <div className="mt-16 pt-8 border-t border-slate-800 w-full text-slate-500 text-sm flex justify-between">
          <p>© 2026 Admin Panel POS Ecosystem</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
