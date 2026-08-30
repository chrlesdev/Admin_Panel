import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginAs() {
  const roles = [
    {
      title: "Admin",
      description: "Access system settings, manage users, and handle operational tasks.",
      href: "/form/adminLogin",
      icon: ShieldCheck,
      badge: "Operational Access",
    },
    {
      title: "Owner",
      description: "Full oversight, financial analytics, inventory, and business reports.",
      href: "/form/ownerLogin",
      icon: Crown,
      badge: "Full System Control",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-slate-100">
      {/* Background Accent Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0,transparent_100%)] pointer-events-none" />

      {/* Main Header */}
      <div className="text-center mb-10 z-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-50">Login As</h1>
        <p className="mt-2 text-sm text-slate-400">Select your portal to proceed to your dedicated dashboard</p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Link key={role.title} href={role.href} className="group outline-none">
              <Card className="h-full border-slate-800 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-slate-600 hover:bg-slate-900 hover:shadow-xl hover:shadow-slate-950/50 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between p-2">
                <CardHeader>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 text-slate-200 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">{role.badge}</span>
                  </div>

                  <CardTitle className="text-xl font-semibold text-slate-100 group-hover:text-white">{role.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm mt-1.5 leading-relaxed">{role.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center text-xs font-medium text-slate-400 group-hover:text-amber-400 transition-colors pt-2">
                    <span>Continue as {role.title}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
