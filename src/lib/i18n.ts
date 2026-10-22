// Semua teks website ada di file ini, dalam dua bahasa.
// Mau ganti tulisan? Edit di sini, bukan di halamannya.

export type Lang = "en" | "ja";

export const dictionary = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },
    home: {
      greeting: "Hi, I'm",
      name: "Adam Lormaz", // <- GANTI dengan namamu
      role: "Software Engineer",
      tagline:
        "I enjoy building things end to end: from computer vision models to the web apps people actually use.",
      ctaProjects: "See my projects",
      ctaAbout: "About me",
      skillsTitle: "What I work with",
      featuredTitle: "Featured projects",
      viewAll: "View all projects →",
      photoAlt: "Profile photo",
    },
    about: {
      title: "About me",
      body: [
        "I'm a software engineer who is just starting my career. My final-year project was a computer vision system, and during my internship I built the frontend of a web application.",
        "I like connecting those two worlds: taking an AI model from an experiment to something people can open in a browser.",
      ],
      chatTitle: "Ask my AI assistant about me",
      chatHint: "Try asking about my experience, projects, or skills.",
      chatPlaceholder: "Type your question...",
      chatSend: "Send",
      chatThinking: "Thinking...",
      chatError: "Something went wrong. Please try again.",
    },
    projects: {
      title: "Projects",
      intro: "A few things I've built. Each one has a live demo you can try.",
      tryDemo: "View project",
      github: "GitHub",
      back: "← All projects",
      problem: "Problem",
      tech: "Tech",
      demoTitle: "Live demo",
      demoPlaceholder: "The demo will appear here soon.",
      comingSoon: "Coming soon",
      notFound: "Project not found.",
    },
    contact: {
      title: "Contact",
      intro: "Want to work together or just say hi? Reach out.",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    theme: { toggle: "Switch light / dark mode" },
    footer: "Built with Next.js + TypeScript",
  },
  ja: {
    nav: { home: "ホーム", about: "自己紹介", projects: "プロジェクト", contact: "連絡先" },
    home: {
      greeting: "こんにちは、",
      name: "アダム・ローマズ", // <- GANTI dengan namamu
      role: "ソフトウェアエンジニア",
      tagline:
        "コンピュータビジョンのモデルから、実際に使われるWebアプリまで、一貫して作ることが好きです。",
      ctaProjects: "プロジェクトを見る",
      ctaAbout: "自己紹介",
      skillsTitle: "扱える技術",
      featuredTitle: "注目のプロジェクト",
      viewAll: "すべてのプロジェクトを見る →",
      photoAlt: "プロフィール写真",
    },
    about: {
      title: "自己紹介",
      body: [
        "キャリアをスタートしたばかりのソフトウェアエンジニアです。卒業研究ではコンピュータビジョンのシステムを開発し、インターンではWebアプリケーションのフロントエンドを担当しました。",
        "この2つをつなげること、つまりAIモデルを実験段階からブラウザで使える形にすることに関心があります。",
      ],
      chatTitle: "AIアシスタントに私のことを聞いてみる",
      chatHint: "経験、プロジェクト、スキルなどについて質問してみてください。",
      chatPlaceholder: "質問を入力...",
      chatSend: "送信",
      chatThinking: "考え中...",
      chatError: "エラーが発生しました。もう一度お試しください。",
    },
    projects: {
      title: "プロジェクト",
      intro: "これまでに作ったものです。それぞれ実際に試せるデモがあります。",
      tryDemo: "詳細を見る",
      github: "GitHub",
      back: "← プロジェクト一覧",
      problem: "課題",
      tech: "使用技術",
      demoTitle: "ライブデモ",
      demoPlaceholder: "デモはまもなくここに表示されます。",
      comingSoon: "準備中",
      notFound: "プロジェクトが見つかりません。",
    },
    contact: {
      title: "連絡先",
      intro: "お仕事のご相談でも、ちょっとした挨拶でも、お気軽にどうぞ。",
      email: "メール",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    theme: { toggle: "ライト / ダークモードを切り替え" },
    footer: "Next.js + TypeScript で作成",
  },
};

// Tipe ini dipakai supaya TypeScript memastikan kedua bahasa punya struktur yang sama.
// Kalau kamu menambah teks di "en" tapi lupa di "ja", baris di bawah akan error.
export type Dictionary = (typeof dictionary)["en"];
export const _sameShape: Dictionary = dictionary.ja;
