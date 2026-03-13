"use client"

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Mic, 
  MicOff,
  Upload, 
  Camera, 
  Image as ImageIcon,
  Package, 
  ShoppingBag, 
  Wallet, 
  HelpCircle,
  ArrowLeft,
  X,
  Scan,
  CheckCircle2,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Language = 'en' | 'hi'

const translations = {
  en: {
    artisanDashboard: 'Artisan Dashboard',
    voiceRecord: 'Voice Record',
    tapToSpeak: 'Tap to describe your product',
    listening: 'Listening...',
    uploadImages: 'Upload Images',
    dragDrop: 'Drag & drop images or click to browse',
    supportedFormats: 'Supports JPG, PNG, WebP up to 10MB',
    scanProduct: 'Scan Product',
    scanning: 'Analyzing your product...',
    recentUploads: 'Recent Uploads',
    quickActions: 'Quick Actions',
    viewOrders: 'View Orders',
    myProducts: 'My Products',
    earnings: 'Earnings',
    support: 'Support',
    stopRecording: 'Stop Recording',
    startScan: 'Start Scan',
    cancelScan: 'Cancel Scan',
  },
  hi: {
    artisanDashboard: 'कारीगर डैशबोर्ड',
    voiceRecord: 'आवाज़ रिकॉर्ड',
    tapToSpeak: 'अपने उत्पाद का वर्णन करने के लिए टैप करें',
    listening: 'सुन रहा है...',
    uploadImages: 'चित्र अपलोड करें',
    dragDrop: 'चित्र खींचें और छोड़ें या ब्राउज़ करें',
    supportedFormats: 'JPG, PNG, WebP 10MB तक समर्थित',
    scanProduct: 'उत्पाद स्कैन करें',
    scanning: 'आपके उत्पाद का विश्लेषण कर रहा है...',
    recentUploads: 'हाल के अपलोड',
    quickActions: 'त्वरित कार्रवाई',
    viewOrders: 'ऑर्डर देखें',
    myProducts: 'मेरे उत्पाद',
    earnings: 'कमाई',
    support: 'सहायता',
    stopRecording: 'रिकॉर्डिंग बंद करें',
    startScan: 'स्कैन शुरू करें',
    cancelScan: 'स्कैन रद्द करें',
  }
}

interface AiResult {
  title: string
  quality: string
  analysis: string
  price: string
}

export default function ArtisanDashboard() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('en')
  const [isRecording, setIsRecording] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const t = translations[language]
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])
  
  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }
  
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }
  
  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }
  
  const startAiProcess = () => {
    setIsScanning(true)
    setScanProgress(0)
    setAiResult(null)
    
    // Animate progress bar over 3.5 seconds
    const duration = 3500
    const interval = 50
    const steps = duration / interval
    let currentStep = 0
    
    const progressInterval = setInterval(() => {
      currentStep++
      setScanProgress(Math.min((currentStep / steps) * 100, 100))
      
      if (currentStep >= steps) {
        clearInterval(progressInterval)
        setIsScanning(false)
        setScanProgress(100)
        setAiResult({
          title: 'Hand-Woven Silk Craft',
          quality: 'Premium Grade (98/100)',
          analysis: 'Intricate weave pattern detected. Traditional motif consistency is high.',
          price: '₹5,400 - ₹12,800'
        })
      }
    }, interval)
  }
  
  const cancelScan = () => {
    setIsScanning(false)
    setScanProgress(0)
  }
  
  const quickActions = [
    { icon: ShoppingBag, label: t.viewOrders, color: 'from-[#00f0ff] to-[#00c8ff]' },
    { icon: Package, label: t.myProducts, color: 'from-[#3b82f6] to-[#60a5fa]' },
    { icon: Wallet, label: t.earnings, color: 'from-[#8b5cf6] to-[#a78bfa]' },
    { icon: HelpCircle, label: t.support, color: 'from-[#10b981] to-[#34d399]' },
  ]
  
  return (
    <main className="min-h-screen bg-[#09090b] bg-grid-pattern">
      {/* Ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f0ff]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3b82f6]/8 rounded-full blur-[150px]" />
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t.artisanDashboard}</h1>
              <p className="text-xs text-muted-foreground">RuralBazaar</p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground/80 hover:text-foreground transition-all"
          >
            <Globe className="w-4 h-4 text-[#00f0ff]" />
            <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
          </button>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Voice Recording Section */}
        <section className="glass rounded-2xl p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#00f0ff]" />
            {t.voiceRecord}
          </h2>
          
          <div className="flex flex-col items-center py-8">
            {/* Pulsing Microphone */}
            <div className="relative">
              {/* Outer rings */}
              {isRecording && (
                <>
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#00f0ff]/20 animate-pulse-ring" style={{ animationDelay: '0s' }} />
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#00f0ff]/15 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#00f0ff]/10 animate-pulse-ring" style={{ animationDelay: '1s' }} />
                </>
              )}
              
              {/* Mic button */}
              <button
                onClick={toggleRecording}
                className={cn(
                  "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300",
                  isRecording
                    ? "bg-gradient-to-br from-[#00f0ff] to-[#00c8ff] glow-cyan-intense"
                    : "bg-gradient-to-br from-[#00f0ff]/20 to-[#3b82f6]/20 border-2 border-[#00f0ff]/30 hover:border-[#00f0ff]/60 hover:glow-cyan"
                )}
              >
                {isRecording ? (
                  <MicOff className="w-12 h-12 text-[#09090b]" />
                ) : (
                  <Mic className="w-12 h-12 text-[#00f0ff]" />
                )}
              </button>
            </div>
            
            <p className={cn(
              "mt-6 text-sm transition-colors",
              isRecording ? "text-[#00f0ff] font-medium text-glow-cyan" : "text-muted-foreground"
            )}>
              {isRecording ? t.listening : t.tapToSpeak}
            </p>
            
            {isRecording && (
              <button
                onClick={toggleRecording}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
              >
                {t.stopRecording}
              </button>
            )}
          </div>
        </section>
        
        {/* Image Upload Section */}
        <section className="glass rounded-2xl p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#3b82f6]" />
            {t.uploadImages}
          </h2>
          
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
              isDragging
                ? "border-[#00f0ff] bg-[#00f0ff]/5 glow-cyan"
                : "border-border hover:border-[#00f0ff]/50 hover:bg-secondary/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                isDragging ? "bg-[#00f0ff]/20" : "bg-secondary"
              )}>
                <Upload className={cn(
                  "w-8 h-8 transition-colors",
                  isDragging ? "text-[#00f0ff]" : "text-muted-foreground"
                )} />
              </div>
              <p className="text-foreground font-medium mb-1">{t.dragDrop}</p>
              <p className="text-xs text-muted-foreground">{t.supportedFormats}</p>
            </div>
          </div>
          
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">{t.recentUploads}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                    <img 
                      src={image} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage(index)
                      }}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-1 right-1 p-1 rounded-full bg-green-500/80">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        
        {/* Scanning Section */}
        <section className="glass rounded-2xl p-6 relative overflow-hidden">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Scan className="w-4 h-4 text-[#8b5cf6]" />
            {t.scanProduct}
          </h2>
          
          <div className="relative">
            {/* Scanner Preview Area */}
            <div className={cn(
              "aspect-video rounded-xl border-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden",
              isScanning
                ? "border-[#00f0ff] bg-black"
                : "border-border bg-secondary/50"
            )}>
              {isScanning ? (
                <>
                  {/* Camera feed simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#0f0f14] to-[#09090b]" />
                  
                  {/* Scanning line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-scan shadow-[0_0_20px_rgba(0,240,255,0.8)]" />
                  
                  {/* Corner markers */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00f0ff]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00f0ff]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#00f0ff]" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00f0ff]" />
                  
                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                    <div className="absolute top-0 left-1/2 w-px h-4 bg-[#00f0ff]/50" />
                    <div className="absolute bottom-0 left-1/2 w-px h-4 bg-[#00f0ff]/50" />
                    <div className="absolute left-0 top-1/2 w-4 h-px bg-[#00f0ff]/50" />
                    <div className="absolute right-0 top-1/2 w-4 h-px bg-[#00f0ff]/50" />
                  </div>
                  
                  <div className="z-10 flex flex-col items-center gap-3">
                    <p className="text-[#00f0ff] text-sm font-medium animate-pulse">{t.scanning}</p>
                    {/* Progress Bar */}
                    <div className="w-48 h-2 bg-[#09090b]/60 rounded-full overflow-hidden border border-[#00f0ff]/30">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00f0ff] to-[#3b82f6] transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(0,240,255,0.6)]"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <p className="text-[#00f0ff]/70 text-xs font-mono">{Math.round(scanProgress)}%</p>
                  </div>
                </>
              ) : (
                <Camera className="w-12 h-12 text-muted-foreground/50" />
              )}
            </div>
            
            {/* Scan Button */}
            <button
              onClick={isScanning ? cancelScan : startAiProcess}
              className={cn(
                "w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300",
                isScanning
                  ? "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                  : "bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              )}
            >
              {isScanning ? t.cancelScan : t.startScan}
            </button>
          </div>
          
          {/* AI Result Cyber-Card */}
          {aiResult && !isScanning && (
            <div className="mt-6 p-5 rounded-xl bg-[#0a0a0f]/80 border border-[#00f0ff]/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#00f0ff]/10 rounded-full blur-3xl" />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative">
                <div>
                  <p className="text-xs text-[#00f0ff] font-mono tracking-wider mb-1">AI ANALYSIS COMPLETE</p>
                  <h3 className="text-xl font-bold text-foreground">{aiResult.title}</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/30">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs font-medium text-[#10b981]">Verified</span>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                {/* Quality Score */}
                <div className="p-4 rounded-lg bg-[#09090b]/60 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Quality Assessment</p>
                  <p className="text-lg font-semibold text-[#10b981]">{aiResult.quality}</p>
                  <div className="mt-2 h-1.5 bg-[#09090b] rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full" />
                  </div>
                </div>
                
                {/* Price Estimate */}
                <div className="p-4 rounded-lg bg-[#09090b]/60 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Estimated Market Price</p>
                  <p className="text-lg font-semibold text-[#00f0ff]">{aiResult.price}</p>
                  <p className="text-xs text-muted-foreground mt-2">Based on market analysis</p>
                </div>
              </div>
              
              {/* Analysis */}
              <div className="mt-4 p-4 rounded-lg bg-[#09090b]/60 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Pattern Analysis</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{aiResult.analysis}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 flex gap-3">
                <button className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#3b82f6] text-[#09090b] font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                  List Product
                </button>
                <button 
                  onClick={() => setAiResult(null)}
                  className="px-4 py-2.5 rounded-lg border border-border text-foreground/70 text-sm hover:bg-secondary transition-colors"
                >
                  Scan Again
                </button>
              </div>
            </div>
          )}
        </section>
        
        {/* Quick Actions */}
        <section className="glass rounded-2xl p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            {t.quickActions}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="group p-4 rounded-xl bg-secondary/50 border border-border hover:border-[#00f0ff]/30 transition-all duration-300 hover-glow"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3 transition-transform group-hover:scale-110",
                  action.color
                )}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
