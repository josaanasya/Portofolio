/**
 * Portofolio Frasinka Josa Anassya
 * Master Script: Navigation, Theme Toggle, Modals, Filtering, Form & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initNavbarScroll();
  initProjectFiltering();
  initGalleryFiltering();
  initModal();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted or system preference
  const savedTheme = localStorage.getItem('frasinka_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('frasinka_theme', isDark ? 'dark' : 'light');
      
      if (themeIcon) {
        if (isDark) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          showToast('Mode gelap diaktifkan');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          showToast('Mode terang diaktifkan');
        }
      }
    });
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIcon) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        }
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE SCROLLSPY
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 20) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }

    // Scrollspy active state
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. UNIVERSAL MODAL SYSTEM
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('universal-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  window.closeModal = closeModal;
}

function openUniversalModal(title, bodyHtml, badgeText = 'Detail Informasi') {
  const modal = document.getElementById('universal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalBody = document.getElementById('modal-body');

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  if (modalBadge) {
    modalBadge.textContent = badgeText;
  }
  modalBody.innerHTML = bodyHtml;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   5. PROJECT DETAILS DATABASE & MODAL TRIGGER
   ========================================================================== */
const projectDatabase = {
  'restoran-cafe': {
    title: 'Sistem Manajemen Restoran & Cafe',
    category: 'Database & System Design',
    badge: 'Proyek Basis Data (2025)',
    lead: 'Perancangan dan normalisasi struktur basis data relasional untuk sistem transaksi, kasir, pemesanan menu, dan inventaris restoran.',
    image: 'assets/images/placeholders/project-placeholder-01.svg',
    objective: 'Mengatasi permasalahan pencatatan manual pada transaksi restoran dengan merancang basis data yang terstruktur, meminimalisir redundansi data hingga 3NF, serta mempercepat pembuatan laporan penjualan harian.',
    tech: ['MySQL', 'Relational Database Design', 'ERD Modeling', 'Data Normalization (1NF-3NF)', 'SQL Query Optimization'],
    role: 'Database Designer & Data Modeler (Kelompok: Putra, Frasinka Josa Anassya, Wildan Primantara Putra)',
    contributions: [
      'Merancang Entity Relationship Diagram (ERD) konseptual dan fisikal untuk entitas meja, pesanan, detail menu, kasir, dan pembayaran.',
      'Melakukan normalisasi tabel hingga Third Normal Form (3NF) guna menjamin integritas data transaksi.',
      'Mengembangkan query SQL untuk transaksi kasir, perhitungan total harga otomatis, dan pelaporan omset harian.',
      'Menyusun dokumentasi teknis sistem manajemen restoran sesuai standar rekayasa perangkat lunak.'
    ],
    docLink: ''
  },
  'mie-ayam-halim': {
    title: 'Integrasi Bisnis & Transaksi UMKM Mie Ayam Halim',
    category: 'Web & Financial Technology',
    badge: 'Proyek Fintech (2025)',
    lead: 'Integrasi proses bisnis berbasis website dalam mempermudah proses transaksi pembayaran dan pencatatan kasir pada UMKM kuliner.',
    image: 'assets/images/projects/project-mieayam-ui-1.png',
    objective: 'Mentransformasikan sistem kasir konvensional UMKM Mie Ayam Halim menjadi website transaksi terintegrasi guna mengurangi antrean, mencegah selisih uang tunai, dan menyediakan rekap kas masuk secara real-time.',
    tech: ['Financial Technology Analysis', 'Website Transaction UI', 'Flowchart & Algoritma', 'Payment Integration Concept', 'UI Mockup'],
    role: 'System Analyst & Flowchart Designer (Tim FinTech)',
    contributions: [
      'Menganalisis alur transaksi eksisting serta mengidentifikasi titik rawan kesalahan hitung kasir.',
      'Merancang flowchart alur pemesanan dan skema integrasi pembayaran digital bagi pelanggan UMKM.',
      'Menyusun mock-up antarmuka pemesanan menu dan modul kasir berbasis web yang ramah pengguna.',
      'Menyusun laporan kelayakan sistem dan integrasi metode pembayaran modern untuk UMKM.'
    ],
    docLink: 'assets/documents/projects/Fintech-Mie-Ayam-Halim.pdf'
  },
  'togaf-millennials': {
    title: 'Enterprise Architecture Cafe Millennials – TOGAF ADM',
    category: 'Enterprise Architecture & Governance',
    badge: 'Arsitektur SI (2025)',
    lead: 'Perancangan arsitektur enterprise menyeluruh untuk website kasir dan operasional Cafe Millennials mengadopsi kerangka kerja TOGAF ADM.',
    image: 'assets/images/projects/project-togaf-architecture-1.png',
    objective: 'Menyelaraskan strategi bisnis Cafe Millennials dengan kapabilitas teknologi informasi untuk mengatasi fragmentasi data transaksi, inventaris bahan baku, serta pelaporan keuangan.',
    tech: ['TOGAF ADM Framework', 'Business Architecture', 'Data & Application Architecture', 'Technology Architecture', 'Use Case Modeling'],
    role: 'Enterprise Architecture Analyst (Penulis Mandiri: Frasinka Josa Anassya)',
    contributions: [
      'Menyusun Fase Preliminary & Architecture Vision (Fase A) untuk mendefinisikan ruang lingkup dan target bisnis.',
      'Merancang Business Architecture (Fase B) yang memetakan aktivitas kasir, pemesanan, dan manajemen stok kafe.',
      'Mengembangkan Information Systems Architectures (Fase C): Arsitektur Data (ERD) dan Arsitektur Aplikasi (Use Case Diagram, Activity Diagram).',
      'Menyusun Technology Architecture (Fase D) yang mendefinisikan infrastruktur web server, client POS, dan basis data aman.'
    ],
    docLink: 'assets/documents/projects/TOGAF-ADM-Kasir-Millennials.pdf'
  },
  'skripsi-workflow': {
    title: 'Sistem Informasi Pengajuan Tugas Akhir / Skripsi',
    category: 'Business Process & Workflow',
    badge: 'Analisis & Perancangan SI (2025)',
    lead: 'Perancangan alur proses bisnis digital (Education Workflow) pengajuan judul, pembimbingan, dan evaluasi tugas akhir mahasiswa.',
    image: 'assets/images/projects/project-skripsi-workflow-1.png',
    objective: 'Mengotomatisasi birokrasi pengajuan skripsi yang sebelumnya dilakukan manual melalui form kertas dan email, menjadi satu portal workflow transparan dengan tracking status real-time.',
    tech: ['Business Process Modeling', 'Education Workflow Design', 'UML Modeling', 'System Requirements Analysis', 'Prototyping'],
    role: 'Process Analyst & Requirement Engineer (Tim Analisis SI)',
    contributions: [
      'Memetakan business workflow mulai dari pengajuan judul, verifikasi koordinator prodi, approval dosen pembimbing, hingga pendaftaran sidang.',
      'Merancang diagram use case, activity diagram, dan state machine diagram untuk alur persetujuan dokumen tugas akhir.',
      'Menyusun matriks kebutuhan fungsional dan non-fungsional bagi mahasiswa, dosen, serta admin program studi.',
      'Merancang rancangan antarmuka portal pengajuan skripsi berbasis web yang intuitif.'
    ],
    docLink: 'assets/documents/projects/Analisis-Proses-Bisnis-Skripsi.pdf'
  },
  'netflix-powerbi': {
    title: 'Netflix Global Content Analytics – Power BI Dashboard',
    category: 'Data Analytics & Business Intelligence',
    badge: 'Proyek Bisnis Cerdas (2026)',
    lead: 'Analisis mendalam dataset global Netflix dan perancangan dashboard interaktif Power BI untuk pengambilan keputusan bisnis hiburan digital.',
    image: 'assets/images/projects/project-netflix-dashboard-1.png',
    objective: 'Mengolah dataset masif Netflix yang meliputi ribuan judul, tipe konten, sutradara, negara asal, rating usia, dan durasi menjadi visualisasi data yang memberikan insight strategis bagi produser konten.',
    tech: ['Power BI', 'Data Cleaning & Preprocessing', 'DAX Formulas', 'Interactive Dashboarding', 'Data Storytelling'],
    role: 'Data Analyst & Power BI Developer (Tim Bisnis Cerdas)',
    contributions: [
      'Melakukan pembersihan data (data cleansing), menangani missing values pada rilis tahun dan negara.',
      'Merancang KPI metrics: Total Judul, Rasio Film vs TV Show, Distribusi Rating Usia, dan Top 10 Negara Produsen.',
      'Membangun dashboard interaktif berbasis Power BI dengan slicer dinamis berdasarkan tahun rilis, genre, dan rating penonton.',
      'Menyusun interpretasi temuan tren produksi film original Netflix dan preferensi durasi konten penonton global.'
    ],
    docLink: 'assets/documents/projects/Netflix-Data-Analytics-PowerBI.pdf'
  },
  'ahp-marketplace': {
    title: 'SPK Pemilihan Marketplace Mahasiswa – Metode AHP',
    category: 'Decision Support System',
    badge: 'Sistem Pendukung Keputusan (2026)',
    lead: 'Implementasi metode Analytical Hierarchy Process (AHP) untuk menentukan platform e-commerce terbaik bagi mahasiswa.',
    image: 'assets/images/placeholders/project-placeholder-02.svg',
    objective: 'Membantu mahasiswa mengambil keputusan objektif dalam memilih marketplace terbaik dengan mempertimbangkan trade-off antara harga, gratis ongkir, keamanan transaksi, dan kemudahan retur barang.',
    tech: ['Analytical Hierarchy Process (AHP)', 'Microsoft Excel Advanced', 'Pairwise Comparison Matrix', 'Consistency Ratio (CR) Calculation', 'Decision Modeling'],
    role: 'Decision Support Analyst & AHP Calculator',
    contributions: [
      'Menetapkan 10 kriteria evaluasi komprehensif: Harga Produk, Biaya Pengiriman, Waktu Kirim, Promo/Diskon, Variasi Produk, Keamanan, Kemudahan Retur, UI/UX, CS, dan Rating.',
      'Membandingkan 3 alternatif platform marketplace terkemuka: Shopee, Tokopedia, dan Lazada.',
      'Menyusun matriks perbandingan berpasangan (pairwise comparisons) dan menghitung Eigen Vector bobot prioritas.',
      'Melakukan verifikasi rasio konsistensi (CR < 0.1) untuk menjamin validitas hasil pemeringkatan akhir alternatif terpilih.'
    ],
    docLink: ''
  },
  'teh-kota-waterfall': {
    title: 'Sistem Informasi Penjualan & Kasir UMKM Teh Kota – Metode Waterfall',
    category: 'Software Engineering & PM',
    badge: 'Manajemen Proyek SI (2026)',
    lead: 'Pengembangan sistem informasi kasir berbasis web pada UMKM Teh Kota Kamal Bangkalan menggunakan metodologi Waterfall.',
    image: 'assets/images/projects/project-tehkota-ui-1.png',
    objective: 'Membangun aplikasi point-of-sale (POS) web yang andal dan terstruktur untuk mempercepat pencatatan transaksi kasir, mengelola stok varian rasa teh, serta menyediakan laporan keuangan periodik.',
    tech: ['Waterfall Methodology', 'Project Management', 'Gantt Chart & WBS', 'Web POS UI/UX Design', 'System Testing'],
    role: 'Project Analyst & UI Designer (Tim Manajemen Proyek)',
    contributions: [
      'Menjalankan tahapan Waterfall secara disiplin: Analisis Kebutuhan, Desain Sistem, Implementasi, dan Pengujian.',
      'Menyusun Work Breakdown Structure (WBS) dan jadwal proyek terperinci menggunakan Gantt Chart.',
      'Merancang antarmuka kasir cepat (Quick POS) untuk pemesanan varian minuman dan topping dengan antarmuka responsif.',
      'Menyusun skenario pengujian fungsionalitas kasir dan dokumentasi serah terima sistem informasi.'
    ],
    docLink: 'assets/documents/projects/Manajemen-Proyek-Teh-Kota-Waterfall.pdf'
  },
  'software-testing-medis': {
    title: 'Pengujian Perangkat Lunak Portal Layanan Medis/Dokter',
    category: 'Software Quality Assurance',
    badge: 'Pengujian Perangkat Lunak (2026)',
    lead: 'Implementasi manual testing, unit testing, dan integration testing pada portal fungsionalitas dokter dan antrian klinik.',
    image: 'assets/images/placeholders/project-placeholder-03.svg',
    objective: 'Memastikan seluruh alur fungsional sistem informasi rekam medis dan antrian klinik bebas dari bug, validasi input berjalan sempurna, serta navigasi antarmuka sesuai dengan ekspektasi dokter dan staf medis.',
    tech: ['Manual Testing', 'Unit Testing', 'Integration Testing', 'Test Case Design', 'Input Validation Testing', 'Chrome DevTools'],
    role: 'QA Tester & Test Case Designer',
    contributions: [
      'Menyusun dokumen test case komprehensif untuk modul Login, Dashboard Dokter, Kelola Jadwal Praktik, dan Konfirmasi Antrian.',
      'Melakukan verifikasi validasi input kredensial (email & password format) serta penanganan error response.',
      'Menguji alur integrasi data antara antrian pasien di kasir depan dengan layar pemeriksaan rekam medis dokter.',
      'Mendokumentasikan hasil temuan defect dan menyusun rekomendasi perbaikan sebelum sistem diluncurkan.'
    ],
    docLink: ''
  },
  'artikel-sinta-5': {
    title: 'Publikasi Artikel Ilmiah Terakreditasi Sinta 5 (Riset Mandiri)',
    category: 'Academic Research & Publication',
    badge: 'LoA Jurnal Ilmiah Nasional (2026)',
    lead: 'Penulisan artikel ilmiah mandiri yang telah berhasil melewati proses peer-review dan mendapatkan Letter of Acceptance (LoA) terbit di jurnal nasional terakreditasi Sinta 5.',
    image: 'assets/images/projects/jurnal-bukti-loa.jpg',
    objective: 'Mengembangkan kontribusi akademis nyata dalam literatur sistem informasi dan transformasi teknologi digital melalui metodologi penelitian yang ketat dan analisis data empiris.',
    tech: ['Metodologi Penelitian', 'Analisis Data Ilmiah', 'Academic Writing', 'Peer-Review Process', 'Sinta 5 Journal Accreditation'],
    role: 'Penulis Mandiri / First Author',
    contributions: [
      'Merumuskan masalah penelitian, kerangka konseptual, dan hipotesis studi secara mandiri.',
      'Mengumpulkan data primer/sekunder dan melakukan pengolahan data menggunakan teknik analisis yang valid.',
      'Menulis naskah lengkap sesuai kaidah standar penulisan artikel ilmiah dan etika publikasi.',
      'Menyelesaikan tahapan revisi peer-review hingga memperoleh Letter of Acceptance (LoA) resmi untuk terbit.'
    ],
    docLink: ''
  }
};

window.viewProjectDetail = function(key) {
  const p = projectDatabase[key];
  if (!p) {
    showToast('Detail proyek tidak ditemukan');
    return;
  }

  const techBadges = p.tech.map(t => `<span class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#533783] dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">${t}</span>`).join('');

  const contributionsList = p.contributions.map(c => `
    <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      <i class="fa-solid fa-circle-check text-[#533783] dark:text-[#ffc371] text-xs mt-1 shrink-0"></i>
      <span>${c}</span>
    </li>
  `).join('');

  const docButton = p.docLink ? `
    <a href="${p.docLink}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#533783] hover:bg-[#432a6d] text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5">
      <i class="fa-solid fa-file-pdf"></i>
      <span>Baca Laporan Dokumen Lengkap (PDF)</span>
    </a>
  ` : '';

  const bodyHtml = `
    <div class="space-y-6">
      <!-- Media Preview -->
      <div class="rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/40 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center max-h-80">
        <img src="${p.image}" alt="${p.title}" class="w-full h-auto max-h-80 object-contain mx-auto" />
      </div>

      <!-- Lead Summary -->
      <div>
        <p class="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
          ${p.lead}
        </p>
      </div>

      <!-- Problem & Objective -->
      <div class="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#533783] dark:text-[#ffc371] flex items-center gap-2">
          <i class="fa-solid fa-bullseye"></i> Tujuan & Latar Belakang Proyek
        </h4>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          ${p.objective}
        </p>
      </div>

      <!-- Role in Project -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Peran & Kontribusi :
        </h4>
        <p class="text-xs sm:text-sm font-semibold text-[#533783] dark:text-[#ffc371] mb-3">
          ${p.role}
        </p>
        <ul class="space-y-2.5">
          ${contributionsList}
        </ul>
      </div>

      <!-- Technologies / Methodologies -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          Teknologi, Framework & Metodologi :
        </h4>
        <div class="flex flex-wrap gap-1.5">
          ${techBadges}
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        ${docButton}
        <button onclick="closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          Tutup
        </button>
      </div>
    </div>
  `;

  openUniversalModal(p.title, bodyHtml, p.badge);
};

/* ==========================================================================
   6. CERTIFICATE PREVIEW MODAL
   ========================================================================== */
window.viewCertificate = function(title, issuer, year, imageSrc, desc) {
  const isPlaceholder = imageSrc.includes('placeholder');
  
  const bodyHtml = `
    <div class="space-y-5">
      <!-- Certificate Image Preview -->
      <div class="rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/40 bg-slate-100 dark:bg-slate-900/60 p-2 text-center">
        <img src="${imageSrc}" alt="${title}" class="w-full max-h-[60vh] object-contain rounded-xl mx-auto shadow-sm" />
      </div>

      <!-- Meta info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
        <div>
          <span class="block text-[11px] uppercase font-bold text-slate-400 dark:text-slate-500">Penyelenggara / Institusi</span>
          <span class="font-semibold text-slate-800 dark:text-slate-200">${issuer}</span>
        </div>
        <div>
          <span class="block text-[11px] uppercase font-bold text-slate-400 dark:text-slate-500">Tahun / Periode</span>
          <span class="font-semibold text-[#533783] dark:text-[#ffc371]">${year}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        ${desc || 'Sertifikat resmi tanda partisipasi, pencapaian, dan pengakuan kompetensi Frasinka Josa Anassya.'}
      </p>

      <!-- Action buttons -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        ${!isPlaceholder ? `
          <a href="${imageSrc}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#533783] hover:bg-[#432a6d] text-white text-xs sm:text-sm font-semibold shadow-md transition">
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
            <span>Buka Gambar Ukuran Penuh</span>
          </a>
        ` : `
          <span class="text-xs italic text-slate-500">Slot sertifikasi disiapkan untuk pelatihan mendatang</span>
        `}
        <button onclick="closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          Tutup
        </button>
      </div>
    </div>
  `;

  openUniversalModal(title, bodyHtml, 'Sertifikat Resmi');
};

/* ==========================================================================
   7. GALLERY LIGHTBOX MODAL
   ========================================================================== */
window.viewGallery = function(title, category, imageSrc, desc) {
  const isPlaceholder = imageSrc.includes('placeholder');

  const bodyHtml = `
    <div class="space-y-5">
      <!-- Full Image Display -->
      <div class="rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/40 bg-slate-900 text-center">
        <img src="${imageSrc}" alt="${title}" class="w-full max-h-[65vh] object-contain rounded-xl mx-auto" />
      </div>

      <!-- Caption & Metadata -->
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-900/50 text-[#533783] dark:text-purple-300">
            ${category}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
          ${desc}
        </p>
      </div>

      <!-- Action -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        ${!isPlaceholder ? `
          <a href="${imageSrc}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#533783] hover:bg-[#432a6d] text-white text-xs sm:text-sm font-semibold shadow-md transition">
            <i class="fa-solid fa-expand"></i>
            <span>Buka Resolusi Asli</span>
          </a>
        ` : `
          <span class="text-xs italic text-slate-500">Slot galeri siap diperbarui</span>
        `}
        <button onclick="closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          Tutup
        </button>
      </div>
    </div>
  `;

  openUniversalModal(title, bodyHtml, category);
};

/* ==========================================================================
   8. PROJECT FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#533783]', 'text-white', 'shadow-md');
        b.classList.add('bg-purple-50', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-[#533783]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-purple-50', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. GALLERY FILTERING
   ========================================================================== */
function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#8c448f]', 'text-white', 'shadow-md');
        b.classList.add('bg-purple-50', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-[#8c448f]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-purple-50', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. CONTACT FORM & ACTIONS (WHATSAPP & EMAIL)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const sendWaBtn = document.getElementById('btn-send-wa');
  const sendEmailBtn = document.getElementById('btn-send-email');

  function validateAndGetMessage() {
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name) {
      showToast('Mohon masukkan nama atau perusahaan Anda');
      document.getElementById('contact-name')?.focus();
      return null;
    }
    if (!message) {
      showToast('Mohon tuliskan pesan atau penawaran Anda');
      document.getElementById('contact-message')?.focus();
      return null;
    }

    return { name, email, subject, message };
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = validateAndGetMessage();
      if (!data) return;

      // Default submit opens WhatsApp
      const waText = encodeURIComponent(
        `Halo Frasinka Josa Anassya,\n\nSaya: ${data.name}\nEmail: ${data.email || '-'}\nKeperluan: ${data.subject}\n\nPesan:\n${data.message}`
      );
      window.open(`https://wa.me/6285871668132?text=${waText}`, '_blank');
      showToast('Membuka WhatsApp untuk mengirim pesan...');
    });
  }

  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', () => {
      const data = validateAndGetMessage();
      if (!data) return;
      const waText = encodeURIComponent(
        `Halo Frasinka Josa Anassya,\n\nSaya: ${data.name}\nEmail: ${data.email || '-'}\nKeperluan: ${data.subject}\n\nPesan:\n${data.message}`
      );
      window.open(`https://wa.me/6285871668132?text=${waText}`, '_blank');
      showToast('Menghubungkan ke WhatsApp Frasinka...');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const data = validateAndGetMessage();
      if (!data) return;
      const mailSubject = encodeURIComponent(`[Portofolio] ${data.subject} - ${data.name}`);
      const mailBody = encodeURIComponent(
        `Halo Frasinka,\n\nNama: ${data.name}\nEmail Pengirim: ${data.email || '-'}\n\nPesan:\n${data.message}\n\nSalam,\n${data.name}`
      );
      window.location.href = `mailto:josaanassya@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      showToast('Membuka aplikasi email...');
    });
  }
}

/* ==========================================================================
   11. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btt = document.getElementById('back-to-top');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btt.classList.add('opacity-100', 'translate-y-0');
    } else {
      btt.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btt.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. TOAST NOTIFICATION
   ========================================================================== */
let toastTimeout;
window.showToast = function(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-info text-[#ffc371]"></i><span>${message}</span>`;
  toast.classList.add('toast-visible');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-visible');
  }, 3200);
};

/* ==========================================================================
   13. CLIPBOARD COPY UTILITIES
   ========================================================================== */
window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin ke clipboard!`);
  }).catch(() => {
    showToast(`Gagal menyalin ${label}`);
  });
};
