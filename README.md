# b-kunwar.github.io

Personal website: https://b-kunwar.github.io/

## Editing content

Edit the Markdown source below, then commit and push. GitHub Pages uses Jekyll to turn it into complete HTML during deployment. Visitors do not download descriptions separately, so a content request cannot leave an empty card.

| Website content | Markdown source |
| --- | --- |
| Home biography | `aboutme.md` |
| Journey | `_includes/project_description/journey.md` |
| Gauthali | `_includes/project_description/gauthali.md` |
| Fisto | `_includes/project_description/fisto.md` |
| Bhangera | `_includes/project_description/bhangera.md` |
| Munal M 72 | `_includes/project_description/munal-m72.md` |
| BAT | `_includes/project_description/bat.md` |
| TheFireFighter | `_includes/project_description/thefirefighter.md` |
| Swachalit Yantra | `_includes/project_description/swachalit-yantra.md` |
| Drone guide | `_includes/writing_description/drone-guide.md` |
| Fixed-wing blueprint | `_includes/writing_description/fixed-wing-blueprint.md` |
| Ramayan | `_includes/writing_description/ramayan.md` |
| Publications and Scholar link | `_includes/sections/publications.md` |
| Contact address | `_includes/sections/contact.md` |
| CV introductory note | `_includes/sections/cv.md` |
| CV document | `CV.pdf` |

The `_includes` prefix is Jekyll's standard content/template directory. The cards in `_includes/project-cards.html`, `_includes/writing-cards.html`, and the other HTML templates place each Markdown file in its matching field. Titles, images, video URLs, social icons, and layout remain in those templates.

## Markdown formatting

Separate paragraphs with a blank line. Use `**bold**`, `*italics*`, `- Bullet`, and `[link text](https://example.com)` as needed. Two spaces at the end of a line produce a deliberate line break. Existing links include `{:target="_blank" rel="noopener noreferrer"}` so they open safely in new tabs; retain that suffix when changing the URL.

Publications use year headings and list items. Keep each record's continuation lines indented by two spaces. No changes to HTML are needed for content edits.

## Preview and deployment

Push changes through GitHub Desktop, then wait for the Pages build to finish. The existing branch-based GitHub Pages deployment builds Jekyll automatically; keep Pages configured for the root of `main`.

For a local preview with Ruby and Bundler installed, run `bundle install`, then `bundle exec jekyll serve`. Open the address it reports. Opening the source HTML directly is not a preview: it contains Jekyll template instructions that are resolved during the build.

`main.js` still controls tabs, and Project remains the landing page. The older `about.js` and `content.js` are no longer loaded by the website.
