// كود جافاسكريبت محسن للموقع مع تأثيرات إضافية
document.addEventListener('DOMContentLoaded', function() {
  // تطبيق تأثيرات التمرير والتحسينات مثل devin.ai
  let lastScrollTop = 0;
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;
    
    // تغيير مظهر الهيدر عند التمرير
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // إخفاء/إظهار الهيدر عند التمرير للأعلى/للأسفل
    if (scrollTop > lastScrollTop && scrollTop > 150) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // تبديل اللغة
  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      // تحريك الزر عند النقر عليه
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
      
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
        // إغلاق القائمة المتنقلة إذا كانت مفتوحة
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          menuToggle.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // تأثير ظهور العناصر عند التمرير
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, observerOptions);
  
  // تطبيق تأثيرات الظهور على العناصر المهمة
  document.querySelectorAll('.service-card, .project-card, .floating-icon, .feature-item').forEach(el => {
    el.classList.add('fade-in-element');
    appearOnScroll.observe(el);
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
  
  // نموذج الاتصال مع تأثيرات تحميل
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // إظهار حالة التحميل
      this.classList.add('submitting');
      
      // محاكاة تأخير الإرسال
      setTimeout(() => {
        this.classList.remove('submitting');
        
        // إظهار رسالة تأكيد
        const messageEl = document.getElementById('form-message');
        if (messageEl) {
          const currentLang = localStorage.getItem('language') || 'en';
          messageEl.textContent = currentLang === 'en' 
            ? 'Thank you! Your message has been sent successfully.'
            : 'شكراً لك! تم إرسال رسالتك بنجاح.';
          messageEl.classList.add('success');
          messageEl.style.display = 'block';
          
          // إخفاء الرسالة بعد 5 ثواني
          setTimeout(() => {
            messageEl.style.display = 'none';
          }, 5000);
        }
        
        // إعادة تعيين النموذج
        contactForm.reset();
      }, 1500);
    });
  }
  
  // تفعيل القائمة المتنقلة على الأجهزة المحمولة - محسنة مثل devin.ai
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      
      // منع التمرير عندما تكون القائمة مفتوحة
      if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // إغلاق القائمة عند النقر على رابط
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('open') && 
          !mobileMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // تطبيق التأثيرات عند الظهور أول مرة
  document.body.classList.add('loaded');
  
  // إضافة تأثيرات hover للبطاقات
  const cards = document.querySelectorAll('.service-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
});