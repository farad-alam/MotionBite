import Link from 'next/link'
import Image from 'next/image'

interface WhatsAppCTAProps {
  // Pass the full phone number with country code, e.g., '1234567890'
  phoneNumber?: string
}

export default function WhatsAppCTA({ phoneNumber = '1234567890' }: WhatsAppCTAProps) {
  const waLink = `https://wa.me/${phoneNumber}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waLink)}&bgcolor=111111&color=00C896`

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-4xl mx-auto bg-dark-card border border-purple-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/2 h-full bg-purple-primary/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-body px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            Fastest way to reach us
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
            Impressed by our work?
          </h2>
          <p className="font-body text-text-muted text-lg mb-8 max-w-md mx-auto md:mx-0">
            Skip the forms and emails. Send us a quick message on WhatsApp to discuss your project instantly.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-dark-base font-heading text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_-10px_rgba(37,211,102,0.5)]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="relative z-10 shrink-0 bg-dark-base p-6 rounded-2xl border border-dark-border flex flex-col items-center">
          <p className="font-heading text-sm text-text-muted mb-4 uppercase tracking-widest text-center">Or scan to chat</p>
          <div className="w-[180px] h-[180px] bg-white rounded-xl p-2 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeUrl}
              alt="WhatsApp QR Code"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        
      </div>
    </section>
  )
}
