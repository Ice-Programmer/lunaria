export const zhCN = {
  translation: {
    common: {
      language: {
        switchToEnglish: '切换到英文',
        switchToChinese: '切换到中文',
        switchToJapanese: '切换到日文',
      },
    },
    errors: {
      projectPathAlreadyRegistered: '该位置已经被一个项目使用：{{projectPath}}',
      projectDirectoryCreationFailed: '无法创建项目目录：{{projectPath}}',
      databaseOperationFailed: '本地数据库操作失败，请稍后重试',
      fileSystemOperationFailed: '本地文件操作失败，请检查文件权限',
      systemTimeUnavailable: '无法读取系统时间，请检查系统时间设置',
      unknown: '操作失败，请稍后重试',
    },
    navigation: {
      home: '项目首页',
      characters: '角色',
      resources: '资源',
    },
    pages: {
      character: '角色页面',
      resource: '资源页面',
    },
    home: {
      header: {
        title: '项目首页',
        noRecent: '暂无最近项目 · 新建项目，或从模板开始创作',
        recent: '最近项目、模板和示例项目 · {{projectName}}',
      },
      overview: {
        title: '开始创作你的第一个故事',
        subtitle: '创建一个项目，搭建世界、角色与剧情分支',
        create: '新建项目',
        browseTemplates: '浏览模板',
      },
      process: {
        title: '创作流程',
        subtitle: '四步完成你的第一部作品',
        world: { title: '世界设定', subtitle: '建立故事背景' },
        characters: { title: '角色与资源', subtitle: '添加人物和立绘' },
        story: { title: '剧情编排', subtitle: '连接对话与分支' },
        publish: { title: '预览发布', subtitle: '检查并导出作品' },
      },
      templates: {
        title: '灵感模板',
        subtitle: '从一个主题开始你的故事',
        viewAll: '查看全部',
        use: '使用模板',
        campus: { title: '校园心动', category: '恋爱', imageAlt: '樱花盛开的校园' },
        mystery: { title: '雨夜谜案', category: '悬疑', imageAlt: '雨夜中的街道' },
        fantasy: { title: '异世界旅途', category: '奇幻', imageAlt: '通往幻想城堡的原野' },
      },
      support: {
        title: '项目与支持',
        repository: 'GitHub 仓库',
        docs: '使用文档',
        docsDescription: '查看功能与操作说明',
        feedback: '问题反馈',
        feedbackDescription: '提交 Bug 或功能建议',
        openSource: '开源项目 · 欢迎参与贡献和反馈',
      },
    },
    createProject: {
      header: {
        title: '新建项目向导',
        subtitle: '模板、信息、主题和确认',
      },
      form: {
        title: '创建一个新项目',
        subtitle: '项目会创建在你选择的本地文件夹中',
        projectName: '项目名称',
        projectNameRequired: '请输入项目名称',
        projectNamePlaceholder: '请输入项目名称，例如：月下回声',
        saveLocation: '保存位置',
        subdirectoryHint: '将自动创建名为「{{projectName}}」的子目录',
        restoreDefault: '恢复默认位置',
        selectFolder: '选择文件夹',
        selectFolderDialog: '选择项目保存位置',
        projectType: '项目类型',
      },
      types: {
        empty: { title: '空白项目', description: '只创建项目文件和空白 Story，适合从零开始' },
        visualNovel: { title: '基础视觉小说', description: '预置章节、Dialogue 与基础玩家界面' },
        branching: {
          title: '多结局分支故事',
          description: '预置变量、Condition、Choice 与两个 Ending',
        },
      },
      overview: {
        projectName: '项目名称',
        projectType: '项目类型',
        imageAlt: '项目概览背景',
      },
      loadingPath: '正在获取默认保存位置…',
      create: '创建项目',
    },
  },
} as const;
