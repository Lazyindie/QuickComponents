# Quick Angular Components

Create Angular components, using the Angular CLI, by right clicking in the VS Code Explorer.

![alt text](https://github.com/Lazyindie/QuickComponents/blob/main/right-click-add.gif?raw=true)

## Features

Add components with or without a folder in a few easy clicks. \
This extension uses the Angular CLI, so should be consistant through versions (untested).

### Styling files

Please check you are have updated your `Angular.json` schematics

```json
# SCSS Example:
"app-name": {
    "projectType": "application",
    "schematics": {
        "@schematics/angular:component": {
            "style": "scss"
        }
    },
    "root": "projects/app",
    # <Other config settings here>
}
```

## Requirements

Must be used within a Angular workspace ([link](https://angular.dev)).

## Known Issues
- n/a

## Release Notes

- Update extension search information