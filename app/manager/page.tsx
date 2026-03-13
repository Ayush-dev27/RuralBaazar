"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowLeft,
  Star,
  MapPin,
  Package,
  ExternalLink,
  MessageSquare,
  Filter,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Language = 'en' | 'hi'
type Category = 'all' | 'textiles' | 'pottery' | 'handicrafts' | 'jewelry'

const translations = {
  en: {
    ventureHub: 'Venture Hub',
    discoverArtisans: 'Discover talented rural artisans',
    searchArtisans: 'Search artisans, products, regions...',
    totalArtisans: 'Total Artisans',
    activeVentures: 'Active Ventures',
    successRate: 'Success Rate',
    revenue: 'Revenue',
    featuredArtisans: 'Featured Artisans',
    successScore: 'Success Score',
    products: 'Products',
    region: 'Region',
    viewProfile: 'View Profile',
    connect: 'Connect',
    allArtisans: 'All',
    textiles: 'Textiles',
    pottery: 'Pottery',
    handicrafts: 'Handicrafts',
    jewelry: 'Jewelry',
    rating: 'Rating',
    verified: 'Verified',
  },
  hi: {
    ventureHub: 'वेंचर हब',
    discoverArtisans: 'प्रतिभाशाली ग्रामीण कारीगरों की खोज करें',
    searchArtisans: 'कारीगर, उत्पाद, क्षेत्र खोजें...',
    totalArtisans: 'कुल कारीगर',
    activeVentures: 'सक्रिय उद्यम',
    successRate: 'सफलता दर',
    revenue: 'राजस्व',
    featuredArtisans: 'प्रमुख कारीगर',
    successScore: 'सफलता स्कोर',
    products: 'उत्पाद',
    region: 'क्षेत्र',
    viewProfile: 'प्रोफ़ाइल देखें',
    connect: 'जुड़ें',
    allArtisans: 'सभी',
    textiles: 'वस्त्र',
    pottery: 'मिट्टी के बर्तन',
    handicrafts: 'हस्तशिल्प',
    jewelry: 'आभूषण',
    rating: 'रेटिंग',
    verified: 'सत्यापित',
  }
}

const artisans = [
  {
    id: 1,
    name: 'Priya Sharma',
    craft: 'Handloom Weaving',
    category: 'textiles',
    region: 'Varanasi, UP',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    products: 47,
    successScore: 94,
    rating: 4.9,
    verified: true,
    revenue: '₹2.4L',
  },
  {
    id: 2,
    name: 'Ramesh Kumar',
    craft: 'Blue Pottery',
    category: 'pottery',
    region: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    products: 32,
    successScore: 88,
    rating: 4.7,
    verified: true,
    revenue: '₹1.8L',
  },
  {
    id: 3,
    name: 'Lakshmi Devi',
    craft: 'Brass Metalwork',
    category: 'handicrafts',
    region: 'Moradabad, UP',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    products: 28,
    successScore: 91,
    rating: 4.8,
    verified: true,
    revenue: '₹1.5L',
  },
  {
    id: 4,
    name: 'Arun Thakur',
    craft: 'Silver Jewelry',
    category: 'jewelry',
    region: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    products: 65,
    successScore: 96,
    rating: 4.9,
    verified: true,
    revenue: '₹3.2L',
  },
  {
    id: 5,
    name: 'Meera Patel',
    craft: 'Bandhani Textiles',
    category: 'textiles',
    region: 'Bhuj, Gujarat',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    products: 41,
    successScore: 85,
    rating: 4.6,
    verified: true,
    revenue: '₹1.9L',
  },
  {
    id: 6,
    name: 'Suresh Yadav',
    craft: 'Terracotta Art',
    category: 'pottery',
    region: 'Gorakhpur, UP',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    products: 23,
    successScore: 79,
    rating: 4.5,
    verified: false,
    revenue: '₹85K',
  },
]

const stats = [
  { label: 'totalArtisans', value: '2,847', icon: Users, change: '+12%', color: 'from-[#00f0ff] to-[#00c8ff]' },
  { label: 'activeVentures', value: '486', icon: Activity, change: '+8%', color: 'from-[#3b82f6] to-[#60a5fa]' },
  { label: 'successRate', value: '94.2%', icon: TrendingUp, change: '+2.4%', color: 'from-[#10b981] to-[#34d399]' },
  { label: 'revenue', value: '₹4.2Cr', icon: DollarSign, change: '+18%', color: 'from-[#8b5cf6] to-[#a78bfa]' },
]

export default function ManagerDashboard() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const t = translations[language]
  
  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.allArtisans },
    { key: 'textiles', label: t.textiles },
    { key: 'pottery', label: t.pottery },
    { key: 'handicrafts', label: t.handicrafts },
    { key: 'jewelry', label: t.jewelry },
  ]
  
  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.region.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || artisan.category === activeCategory
    return matchesSearch && matchesCategory
  })
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#00f0ff]'
    if (score >= 80) return 'text-[#3b82f6]'
    if (score >= 70) return 'text-[#f59e0b]'
    return 'text-muted-foreground'
  }
  
  return (
    <main className="min-h-screen bg-[#09090b] bg-grid-pattern">
      {/* Ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3b82f6]/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/8 rounded-full blur-[180px]" />
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/')}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t.ventureHub}</h1>
                <p className="text-sm text-muted-foreground">{t.discoverArtisans}</p>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground/80 hover:text-foreground transition-all"
            >
              <Globe className="w-4 h-4 text-[#3b82f6]" />
              <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchArtisans}
              className="w-full bg-secondary/80 border border-border rounded-xl py-3 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/30 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="glass rounded-xl p-4 hover:border-[#00f0ff]/20 transition-all duration-300 hover-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                  stat.color
                )}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{t[stat.label as keyof typeof t]}</p>
            </div>
          ))}
        </div>
        
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeCategory === category.key
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Featured Artisans Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t.featuredArtisans}</h2>
          <span className="text-sm text-muted-foreground">{filteredArtisans.length} artisans</span>
        </div>
        
        {/* Artisan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              onMouseEnter={() => setHoveredCard(artisan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={cn(
                "glass-card rounded-2xl p-5 transition-all duration-500 cursor-pointer border border-transparent",
                hoveredCard === artisan.id && "border-[#00f0ff]/40"
              )}
              style={hoveredCard === artisan.id ? {
                boxShadow: `
                  0 0 30px rgba(0, 240, 255, 0.15),
                  0 0 60px rgba(0, 240, 255, 0.1),
                  0 0 90px rgba(0, 240, 255, 0.05),
                  inset 0 0 60px rgba(0, 240, 255, 0.03)
                `,
                transform: 'translateY(-4px)'
              } : {}}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-border"
                  />
                  {artisan.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00f0ff] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#09090b]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{artisan.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{artisan.craft}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{artisan.region}</span>
                  </div>
                </div>
              </div>
              
              {/* Success Score */}
              <div className="glass rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{t.successScore}</span>
                  <span className={cn(
                    "text-xl font-bold",
                    getScoreColor(artisan.successScore)
                  )}>
                    {artisan.successScore}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      artisan.successScore >= 90 
                        ? "bg-gradient-to-r from-[#00f0ff] to-[#00c8ff]" 
                        : artisan.successScore >= 80 
                          ? "bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
                          : "bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
                    )}
                    style={{ width: `${artisan.successScore}%` }}
                  />
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <Package className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span className="font-semibold">{artisan.products}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.products}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="font-semibold">{artisan.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.rating}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-green-400" />
                    <span className="font-semibold">{artisan.revenue}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.revenue}</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-lg bg-secondary border border-border text-sm font-medium text-foreground hover:bg-secondary/80 hover:border-[#00f0ff]/30 transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t.viewProfile}
                </button>
                <button className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {t.connect}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
