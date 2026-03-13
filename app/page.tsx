"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Palette, Briefcase, ChevronRight, Globe, User, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

type Language = 'en' | 'hi'
type Role = 'artisan' | 'manager'

const translations = {
  en: {
    welcome: 'Welcome to',
    subtitle: 'Connecting Rural Artisans with Global Markets',
    selectRole: 'Select Your Role',
    artisan: 'Artisan',
    manager: 'Digital Manager',
    artisanDesc: 'Showcase your craft to the world',
    managerDesc: 'Discover and manage rural ventures',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    enterPortal: 'Enter Portal',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter your email',
    phonePlaceholder: 'Enter your phone',
  },
  hi: {
    welcome: 'स्वागत है',
    subtitle: 'ग्रामीण कारीगरों को वैश्विक बाजारों से जोड़ना',
    selectRole: 'अपनी भूमिका चुनें',
    artisan: 'कारीगर',
    manager: 'डिजिटल मैनेजर',
    artisanDesc: 'अपनी कला को दुनिया को दिखाएं',
    managerDesc: 'ग्रामीण उद्यमों की खोज और प्रबंधन करें',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    phone: 'फ़ोन नंबर',
    enterPortal: 'पोर्टल में प्रवेश करें',
    namePlaceholder: 'अपना नाम दर्ज करें',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    phonePlaceholder: 'अपना फ़ोन दर्ज करें',
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('en')
  const [selectedRole, setSelectedRole] = useState<Role>('artisan')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  
  const t = translations[language]
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRole === 'artisan') {
      router.push('/artisan')
    } else {
      router.push('/manager')
    }
  }
  
  return (
    <main className="min-h-screen bg-[#09090b] bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground transition-all hover:border-[#00f0ff]/30"
          >
            <Globe className="w-4 h-4 text-[#00f0ff]" />
            <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
          </button>
        </div>
        
        {/* Main Card */}
        <div className="glass rounded-2xl p-8 glow-cyan">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#3b82f6]" />
            </div>
            <p className="text-muted-foreground text-sm mb-1">{t.welcome}</p>
            <h1 className="text-3xl font-bold text-foreground text-glow-cyan">
              RuralBazaar
            </h1>
            <p className="text-muted-foreground text-sm mt-2 text-balance">
              {t.subtitle}
            </p>
          </div>
          
          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-3 block">
              {t.selectRole}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('artisan')}
                className={cn(
                  "group relative p-4 rounded-xl border transition-all duration-300",
                  selectedRole === 'artisan'
                    ? "bg-[#00f0ff]/10 border-[#00f0ff]/50 glow-cyan"
                    : "glass-card border-border hover:border-[#00f0ff]/30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                  selectedRole === 'artisan'
                    ? "bg-[#00f0ff]/20"
                    : "bg-secondary"
                )}>
                  <Palette className={cn(
                    "w-5 h-5 transition-colors",
                    selectedRole === 'artisan' ? "text-[#00f0ff]" : "text-muted-foreground"
                  )} />
                </div>
                <p className={cn(
                  "font-semibold text-sm transition-colors",
                  selectedRole === 'artisan' ? "text-[#00f0ff]" : "text-foreground"
                )}>
                  {t.artisan}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.artisanDesc}
                </p>
                {selectedRole === 'artisan' && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedRole('manager')}
                className={cn(
                  "group relative p-4 rounded-xl border transition-all duration-300",
                  selectedRole === 'manager'
                    ? "bg-[#3b82f6]/10 border-[#3b82f6]/50"
                    : "glass-card border-border hover:border-[#3b82f6]/30"
                )}
                style={selectedRole === 'manager' ? {
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)'
                } : {}}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                  selectedRole === 'manager'
                    ? "bg-[#3b82f6]/20"
                    : "bg-secondary"
                )}>
                  <Briefcase className={cn(
                    "w-5 h-5 transition-colors",
                    selectedRole === 'manager' ? "text-[#3b82f6]" : "text-muted-foreground"
                  )} />
                </div>
                <p className={cn(
                  "font-semibold text-sm transition-colors",
                  selectedRole === 'manager' ? "text-[#3b82f6]" : "text-foreground"
                )}>
                  {t.manager}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.managerDesc}
                </p>
                {selectedRole === 'manager' && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                )}
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t.name}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full bg-input border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/30 transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Email Input - Only for Manager */}
            {selectedRole === 'manager' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-input border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/30 transition-all"
                    required
                  />
                </div>
              </div>
            )}
            
            {/* Phone Input */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t.phone}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-input border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/30 transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className={cn(
                "w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 mt-6",
                selectedRole === 'artisan'
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#00c8ff] text-[#09090b] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                  : "bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              )}
            >
              {t.enterPortal}
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          {'© 2026 RuralBazaar. Empowering rural communities.'}
        </p>
      </div>
    </main>
  )
}
