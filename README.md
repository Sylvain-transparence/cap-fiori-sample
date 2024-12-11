# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for UI frontends goes here   |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `readme.md`    | this getting started guide           |

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Best practices notes

put the annotation @title for each column at schema level (can be redefined at application level)
create an annotation file per entity ?
use Capital Camel case for i18n

https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf

to import external services :
run cds import .\srv\external\Plant.edmx for example
and use following settings in .cdsrc.json :
{
"import": {
"as": "cds",
"force": true,
"include_namespaces": "sap,c4c"
}
}

## How to add SAP shell menu bar ?

1. add FioriSandboxConfig.json in your app/appconfig folder
