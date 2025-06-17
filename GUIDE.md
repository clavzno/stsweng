## GUIDE: Commit Message
`<type>/<scope> - <brief description>`
- `feat` - introduces a new feature (if includes docs put it under feat)
- `fix` - patches a bug
- `docs` - documentation only changes
- `style` - does not affect meaning of the code (formatting, white-space, etc.)
- `refactor` - code change that doesn't fix a bug nor add a feature
- `perf` - improves performance, optimization
- `test` - adds missing tests or corrects existing tests
- `chore` - changes to the build process or auxiliary tools and libraries such as documentation generation.

`scope`: indicates the specific component or functionality affected by the commits.
This provides context and helps the team identify what area the branch is targeting, examples like login, ui, api, etc. 

## GUIDE: Naming Conventions
Follows [NextJS Documentation](https://nextjs.org/docs/app/getting-started/project-structure)
- `lowercase`: for commit messages
- `lowercase + kebab-case`: for file and folder names
- `UPPERCASE_UPPERCASE2`: strictly for global variables and environment variables
- `PascalCase`: for components (js/jsx), function names
- `camelCase`: for variables, consts, let vars
- `_camelCase`: private folders (means it should not be considered by the hierarchical routing system of NextJS)
- `(camelCase)`: for route groups (means the folder is for organizational purposes and should not be included in the router's URL path)

## GUIDE: Folder Conventions
Follows [NextJS Documentation](https://nextjs.org/docs/app/getting-started/project-structure)
```
/stsweng
|-- .next/ (generated)
|-- node_modules/ (generated)
|-- public/ (generated, static assets to be served)
|-- src/ (generated, application source folder)
|   |-- sample-student-page/ (domain/sample-student-page)
|   |   |-- page.js or .jsx (would serve as the page for domain/sample-student-page)
|   |   |-- layout.js or .jsx (would serve as the individual layout for)
|   |   |-- /my-settings (domain/sample-student-page/my-settings)
|   |   |   |-- page.js
|   |-- sample-courses-page/ 
|   |   |-- /[courseId] (dynamic page) (domain/courses/54321 or domain/courses/12345)
|   |   |-- page.js
|   |   |-- layout.js
|   |-- page.js or .jsx (generated, this would serve as the index)
|   |-- layout.js or .jsx (generated, layout page that would apply to all children routes or pages)
|-- .gitgnore (generated)
|-- jsconfig.json (generated, config for javascript, will be tsconfig.json if using typescript)
|-- package.json (generated)
|-- package-lock.json (generated)
|-- eslint.config.mjs (generated)
|-- next.config.mjs (generated)
|-- postcss.config.mjs (generated)
|-- .env (environment vars)
|-- .env.local (manual, local environment vars)
|-- .env.production (manual, production environment vars)
|-- .env.development (manual, development environment vars)
|-- middleware.ts or middleware.js (manual)
```
