// كود جافاسكريبت أساسي للموقع
document.addEventListener('DOMContentLoaded', function() {
  // تبديل اللغة
  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('rtl');
      document.documentElement.classList.toggle('ltr');
      
      // تبديل اللغة المحددة في localStorage
      const currentLang = localStorage.getItem('language') || 'en';
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      
      // تحديث واجهة المستخدم
      updateLanguage(newLang);
    });
  }
  
  // تحديد اللغة عند التحميل
  function initLanguage() {
    // التحقق من اللغة المخزنة
    const savedLanguage = localStorage.getItem('language');
    const browserLang = navigator.language || '';
    const initialLang = savedLanguage || (browserLang.startsWith('ar') ? 'ar' : 'en');
    
    if (initialLang === 'ar') {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
    
    localStorage.setItem('language', initialLang);
    updateLanguage(initialLang);
  }
  
  function updateLanguage(lang) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    const ltrElements = document.querySelectorAll('.ltr-only');
    const rtlElements = document.querySelectorAll('.rtl-only');
    
    if (lang === 'ar') {
      ltrElements.forEach(el => el.style.display = 'none');
      rtlElements.forEach(el => el.style.display = 'block');
    } else {
      ltrElements.forEach(el => el.style.display = 'block');
      rtlElements.forEach(el => el.style.display = 'none');
    }
  }
  
  // تطبيق اللغة عند التحميل
  initLanguage();
  
  // تفعيل السكرول السلس لروابط التنقل
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // تظهر زر العودة لأعلى الصفحة عند التمرير لأسفل
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // نموذج الاتصال
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // يمكن إضافة التحقق من صحة المدخلات هنا
      
      // إظهار رسالة تأكيد
      const messageEl = document.getElementById('form-message');
      if (messageEl) {
        const currentLang = localStorage.getItem('language') || 'en';
        messageEl.textContent = currentLang === 'en' 
          ? 'Thank you! Your message has been sent successfully.'
          : 'شكراً لك! تم إرسال رسالتك بنجاح.';
        messageEl.classList.add('success');
        messageEl.style.display = 'block';
      }
      
      // إعادة تعيين النموذج
      contactForm.reset();
    });
  }
  
  // تفعيل القائمة المتنقلة على الأجهزة المحمولة
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }
});