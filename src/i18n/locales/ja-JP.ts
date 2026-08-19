export const jaJP = {
  translation: {
    common: {
      language: {
        switchToEnglish: '英語に切り替える',
        switchToChinese: '中国語に切り替える',
        switchToJapanese: '日本語に切り替える',
      },
    },
    navigation: {
      home: 'プロジェクトホーム',
      characters: 'キャラクター',
      resources: 'リソース',
    },
    pages: {
      character: 'キャラクター',
      resource: 'リソース',
    },
    home: {
      header: {
        title: 'プロジェクトホーム',
        noRecent: '最近のプロジェクトなし · 新規作成またはテンプレートを選択',
        recent: '最近のプロジェクト · {{projectName}}',
      },
      overview: {
        title: '最初の物語を作ろう',
        subtitle: '世界観・キャラクター・分岐を作成',
        create: '新規作成',
        browseTemplates: 'テンプレート',
      },
      process: {
        title: '制作フロー',
        subtitle: '4ステップで作品を完成',
        world: { title: '世界観', subtitle: '舞台を設定' },
        characters: { title: 'キャラと素材', subtitle: '人物と立ち絵を追加' },
        story: { title: 'シナリオ', subtitle: '会話と分岐をつなぐ' },
        publish: { title: '確認と出力', subtitle: '作品を確認・出力' },
      },
      templates: {
        title: 'テンプレート',
        subtitle: 'テーマから始める',
        viewAll: 'すべて',
        use: '使う',
        campus: {
          title: '学園ロマンス',
          category: '恋愛',
          imageAlt: '桜が咲き誇る学園',
        },
        mystery: {
          title: '雨夜の謎',
          category: 'ミステリー',
          imageAlt: '雨の夜の街',
        },
        fantasy: {
          title: '異世界の旅',
          category: 'ファンタジー',
          imageAlt: '幻想の城へ続く草原',
        },
      },
      support: {
        title: 'サポート',
        repository: 'GitHub',
        docs: '使い方',
        docsDescription: '機能と操作ガイド',
        feedback: 'フィードバック',
        feedbackDescription: 'バグ報告・機能提案',
        openSource: 'オープンソース · 貢献歓迎',
      },
    },
    createProject: {
      header: {
        title: '新規プロジェクト',
        subtitle: 'テンプレート・情報・確認',
      },
      form: {
        title: 'プロジェクトを作成',
        subtitle: '保存先フォルダーを選択',
        projectName: 'プロジェクト名',
        projectNameRequired: 'プロジェクト名を入力してください',
        projectNamePlaceholder: '例：月夜のこだま',
        saveLocation: '保存先',
        subdirectoryHint: '「{{projectName}}」フォルダーを自動作成',
        restoreDefault: '既定に戻す',
        selectFolder: 'フォルダー選択',
        selectFolderDialog: '保存先を選択',
        projectType: '種類',
      },
      types: {
        empty: {
          title: '空のプロジェクト',
          description: '空の Story から始める',
        },
        visualNovel: {
          title: '基本ビジュアルノベル',
          description: 'チャプター、会話、プレイヤー画面付き',
        },
        branching: {
          title: '分岐ストーリー',
          description: '変数、選択肢、2つの結末付き',
        },
      },
      overview: {
        projectName: 'プロジェクト名',
        projectType: '種類',
        imageAlt: 'プロジェクト概要の背景',
      },
      loadingPath: '保存先を取得中…',
      create: '作成',
      createFailed: 'プロジェクトの作成に失敗しました：{{message}}',
    },
  },
} as const;
