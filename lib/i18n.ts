// UI strings for the English and Arabic site sections (WP3 5.2).
//
// ARABIC STRINGS ARE PROPOSALS, PENDING NATIVE REVIEW before 6 Nov 2026.
// The first block (home ... contactUs) is the list given in the WP3 spec.
// Everything marked "extra proposal" was added by engineering because the
// Arabic templates need it; it also needs the native reviewer's approval.

export type Locale = 'en' | 'ar'

export const dict = {
  en: {
    home: 'Home',
    services: 'Services',
    pricing: 'Pricing',
    blog: 'Blog',
    faq: 'Frequently Asked Questions',
    relatedPages: 'Related',
    contents: 'Contents',
    onThisPage: 'On this page',
    tableOfContents: 'Table of contents',
    updated: 'Updated',
    freeConsultation: 'Get a free consultation',
    contactUs: 'Contact us',
    // extra
    languageSwitch: 'English',
    readInOtherLanguage: 'Read in English',
    backToBlog: 'Back to Blog',
    chatOnWhatsapp: 'Chat on WhatsApp',
    proofHeading: 'Work we have delivered',
    closingCta: 'Ready to grow your business online?',
    relatedArticles: 'Related Articles',
    readArticle: 'Read article',
    noPosts: 'No posts yet.',
    breadcrumb: 'Breadcrumb',
    menu: 'Toggle menu',
    closeMenu: 'Close menu',
    writtenBy: 'Written by',
    allRightsReserved: 'All Rights Reserved.',
    blogTitle: 'Blog',
    blogDescription: 'Practical guides on web design and SEO for business owners.',
  },
  ar: {
    home: 'الرئيسية',
    services: 'خدماتنا',
    pricing: 'الأسعار',
    blog: 'المدونة',
    faq: 'الأسئلة الشائعة',
    relatedPages: 'صفحات ذات صلة',
    contents: 'المحتويات',
    onThisPage: 'المحتويات', // extra proposal: reuses "Contents"
    tableOfContents: 'المحتويات', // extra proposal
    updated: 'آخر تحديث',
    freeConsultation: 'احصل على استشارة مجانية',
    contactUs: 'تواصل معنا',
    // extra proposals (pending native review)
    languageSwitch: 'العربية',
    readInOtherLanguage: 'اقرأ بالعربية',
    backToBlog: 'العودة إلى المدونة',
    chatOnWhatsapp: 'تواصل عبر واتساب',
    proofHeading: 'أعمال أنجزناها',
    closingCta: 'هل أنت مستعد لتنمية أعمالك على الإنترنت؟',
    relatedArticles: 'مقالات ذات صلة',
    readArticle: 'اقرأ المقال',
    noPosts: 'لا توجد مقالات بعد.',
    breadcrumb: 'مسار التنقل',
    menu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    writtenBy: 'بقلم',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    blogTitle: 'المدونة',
    blogDescription: 'أدلة عملية حول تصميم المواقع وتحسين الظهور في محركات البحث لأصحاب الأعمال.',
  },
} as const

export type Dict = { [K in keyof (typeof dict)['en']]: string }

export function t(locale: Locale): Dict {
  return dict[locale]
}

/**
 * Link label pointing at the OTHER language version of a page.
 * On an English page: "اقرأ بالعربية" (in Arabic, so Arabic readers recognise it).
 * On an Arabic page: "Read in English".
 */
export function otherLanguageLabel(current: Locale): string {
  return current === 'en' ? dict.ar.readInOtherLanguage : dict.en.readInOtherLanguage
}

// Gregorian calendar with Western digits, so Saudi readers do not get Hijri dates.
export function formatDate(date: string, locale: Locale, month: 'long' | 'short' = 'long'): string {
  const d = new Date(date)
  if (locale === 'ar') {
    return new Intl.DateTimeFormat('ar', {
      calendar: 'gregory',
      numberingSystem: 'latn',
      day: 'numeric',
      month,
      year: 'numeric',
    }).format(d)
  }
  return d.toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' })
}

// Reading time from the numeric readMinutes field (extra proposal for Arabic wording).
export function formatReadTime(minutes: number | undefined | null, locale: Locale): string | null {
  if (minutes == null || Number.isNaN(minutes)) return null
  const n = Math.max(1, Math.round(minutes))
  if (locale === 'en') return `${n} min read`
  const rule = new Intl.PluralRules('ar').select(n)
  const unit = rule === 'two' ? 'دقيقتان' : rule === 'few' ? 'دقائق' : 'دقيقة'
  return rule === 'two' ? `${unit} للقراءة` : `${n} ${unit} للقراءة`
}
