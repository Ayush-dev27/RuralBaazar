"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login page
    'welcome': 'Welcome to',
    'subtitle': 'Connecting Rural Artisans with Global Markets',
    'selectRole': 'Select Your Role',
    'artisan': 'Artisan',
    'manager': 'Digital Manager',
    'artisanDesc': 'Showcase your craft to the world',
    'managerDesc': 'Discover and manage rural ventures',
    'name': 'Full Name',
    'email': 'Email Address',
    'phone': 'Phone Number',
    'enterPortal': 'Enter Portal',
    'namePlaceholder': 'Enter your name',
    'emailPlaceholder': 'Enter your email',
    'phonePlaceholder': 'Enter your phone',
    
    // Artisan Dashboard
    'artisanDashboard': 'Artisan Dashboard',
    'voiceRecord': 'Voice Record',
    'tapToSpeak': 'Tap to describe your product',
    'listening': 'Listening...',
    'uploadImages': 'Upload Images',
    'dragDrop': 'Drag & drop images or click to browse',
    'supportedFormats': 'Supports JPG, PNG, WebP up to 10MB',
    'scanProduct': 'Scan Product',
    'scanning': 'Analyzing your product...',
    'recentUploads': 'Recent Uploads',
    'quickActions': 'Quick Actions',
    'viewOrders': 'View Orders',
    'myProducts': 'My Products',
    'earnings': 'Earnings',
    'support': 'Support',
    
    // Manager Dashboard
    'ventureHub': 'Venture Hub',
    'discoverArtisans': 'Discover talented rural artisans',
    'searchArtisans': 'Search artisans, products, regions...',
    'totalArtisans': 'Total Artisans',
    'activeVentures': 'Active Ventures',
    'successRate': 'Success Rate',
    'revenue': 'Revenue',
    'featuredArtisans': 'Featured Artisans',
    'successScore': 'Success Score',
    'products': 'Products',
    'region': 'Region',
    'viewProfile': 'View Profile',
    'connect': 'Connect',
    'allArtisans': 'All',
    'textiles': 'Textiles',
    'pottery': 'Pottery',
    'handicrafts': 'Handicrafts',
    'jewelry': 'Jewelry',
  },
  hi: {
    // Login page
    'welcome': 'स्वागत है',
    'subtitle': 'ग्रामीण कारीगरों को वैश्विक बाजारों से जोड़ना',
    'selectRole': 'अपनी भूमिका चुनें',
    'artisan': 'कारीगर',
    'manager': 'डिजिटल मैनेजर',
    'artisanDesc': 'अपनी कला को दुनिया को दिखाएं',
    'managerDesc': 'ग्रामीण उद्यमों की खोज और प्रबंधन करें',
    'name': 'पूरा नाम',
    'email': 'ईमेल पता',
    'phone': 'फ़ोन नंबर',
    'enterPortal': 'पोर्टल में प्रवेश करें',
    'namePlaceholder': 'अपना नाम दर्ज करें',
    'emailPlaceholder': 'अपना ईमेल दर्ज करें',
    'phonePlaceholder': 'अपना फ़ोन दर्ज करें',
    
    // Artisan Dashboard
    'artisanDashboard': 'कारीगर डैशबोर्ड',
    'voiceRecord': 'आवाज़ रिकॉर्ड',
    'tapToSpeak': 'अपने उत्पाद का वर्णन करने के लिए टैप करें',
    'listening': 'सुन रहा है...',
    'uploadImages': 'चित्र अपलोड करें',
    'dragDrop': 'चित्र खींचें और छोड़ें या ब्राउज़ करें',
    'supportedFormats': 'JPG, PNG, WebP 10MB तक समर्थित',
    'scanProduct': 'उत्पाद स्कैन करें',
    'scanning': 'आपके उत्पाद का विश्लेषण कर रहा है...',
    'recentUploads': 'हाल के अपलोड',
    'quickActions': 'त्वरित कार्रवाई',
    'viewOrders': 'ऑर्डर देखें',
    'myProducts': 'मेरे उत्पाद',
    'earnings': 'कमाई',
    'support': 'सहायता',
    
    // Manager Dashboard
    'ventureHub': 'वेंचर हब',
    'discoverArtisans': 'प्रतिभाशाली ग्रामीण कारीगरों की खोज करें',
    'searchArtisans': 'कारीगर, उत्पाद, क्षेत्र खोजें...',
    'totalArtisans': 'कुल कारीगर',
    'activeVentures': 'सक्रिय उद्यम',
    'successRate': 'सफलता दर',
    'revenue': 'राजस्व',
    'featuredArtisans': 'प्रमुख कारीगर',
    'successScore': 'सफलता स्कोर',
    'products': 'उत्पाद',
    'region': 'क्षेत्र',
    'viewProfile': 'प्रोफ़ाइल देखें',
    'connect': 'जुड़ें',
    'allArtisans': 'सभी',
    'textiles': 'वस्त्र',
    'pottery': 'मिट्टी के बर्तन',
    'handicrafts': 'हस्तशिल्प',
    'jewelry': 'आभूषण',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  const t = (key: string): string => {
    return translations[language][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
