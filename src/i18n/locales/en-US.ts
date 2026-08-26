export const enUS = {
  translation: {
    common: {
      language: {
        switchToEnglish: 'Switch to English',
        switchToChinese: 'Switch to Chinese',
        switchToJapanese: 'Switch to Japanese',
      },
    },
    errors: {
      projectPathAlreadyRegistered: 'This location is already used by a project: {{projectPath}}',
      projectDirectoryCreationFailed: 'Unable to create the project directory: {{projectPath}}',
      databaseOperationFailed: 'The local database operation failed. Please try again',
      fileSystemOperationFailed: 'The local file operation failed. Check the file permissions',
      systemTimeUnavailable: 'Unable to read the system time. Check your system settings',
      unknown: 'The operation failed. Please try again',
    },
    navigation: {
      home: 'Home',
      characters: 'Characters',
      resources: 'Resources',
    },
    pages: {
      character: 'Characters',
      resource: 'Resources',
    },
    home: {
      header: {
        title: 'Project Home',
        noRecent: 'No recent projects · Create one or use a template',
        recent: 'Recent projects · {{projectName}}',
      },
      overview: {
        title: 'Create your first story',
        subtitle: 'Build worlds, characters, and branching stories',
        create: 'New Project',
        browseTemplates: 'Templates',
      },
      process: {
        title: 'Creation Flow',
        subtitle: 'Your first story in four steps',
        world: { title: 'World', subtitle: 'Set the scene' },
        characters: { title: 'Characters & Art', subtitle: 'Add cast and sprites' },
        story: { title: 'Story Flow', subtitle: 'Link dialogue and choices' },
        publish: { title: 'Preview & Export', subtitle: 'Review and export' },
      },
      templates: {
        title: 'Templates',
        subtitle: 'Start with a theme',
        viewAll: 'View All',
        use: 'Use',
        campus: {
          title: 'Campus Romance',
          category: 'Romance',
          imageAlt: 'A campus covered in cherry blossoms',
        },
        mystery: {
          title: 'Rainy Mystery',
          category: 'Mystery',
          imageAlt: 'A street on a rainy night',
        },
        fantasy: {
          title: 'Fantasy Journey',
          category: 'Fantasy',
          imageAlt: 'A field leading to a fantasy castle',
        },
      },
      support: {
        title: 'Support',
        repository: 'GitHub',
        docs: 'Docs',
        docsDescription: 'Features and guides',
        feedback: 'Feedback',
        feedbackDescription: 'Report bugs or suggest features',
        openSource: 'Open source · Contributions welcome',
      },
    },
    createProject: {
      header: {
        title: 'New Project',
        subtitle: 'Template, details, and confirmation',
      },
      form: {
        title: 'Create a project',
        subtitle: 'Choose where to save your project',
        projectName: 'Project Name',
        projectNameRequired: 'Please enter a project name',
        projectNamePlaceholder: 'e.g. Moonlit Echoes',
        saveLocation: 'Save Location',
        subdirectoryHint: 'Creates a "{{projectName}}" subfolder',
        restoreDefault: 'Restore Default',
        selectFolder: 'Choose Folder',
        selectFolderDialog: 'Choose where to save the project',
        projectType: 'Project Type',
      },
      types: {
        empty: {
          title: 'Blank Project',
          description: 'Start from a blank Story',
        },
        visualNovel: {
          title: 'Basic Visual Novel',
          description: 'Includes chapters, dialogue, and a player UI',
        },
        branching: {
          title: 'Branching Story',
          description: 'Includes variables, choices, and two endings',
        },
      },
      overview: {
        projectName: 'Project Name',
        projectType: 'Project Type',
        imageAlt: 'Project overview background',
      },
      loadingPath: 'Loading save location…',
      create: 'Create Project',
      notifications: {
        successTitle: 'Project created',
        successDescription: 'Project "{{projectName}}" was created successfully',
        errorTitle: 'Failed to create project',
      },
    },
  },
} as const;
