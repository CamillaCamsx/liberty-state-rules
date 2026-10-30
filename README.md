# Liberty State RP — The Ten Commandments

A responsive Victorian proclamation built with plain HTML, CSS, and JavaScript. All fonts, ornaments, and textures are local. There are no package dependencies, external requests, accounts, or services to configure.

## Run locally

From this directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

The page also opens directly from `index.html`. As you read down, JavaScript progressively unrolls the parchment: its lower roller follows the bottom of the reading area, revealing more paper in proportion to your scrolling. Previously revealed paper stays open when scrolling back up. The full document retains its natural layout height, so scrolling and direct links work normally. JavaScript also adds reading progress and return-to-top visibility. The entire document is open without JavaScript, with reduced motion, and when printing.

## Community logo

The original repository logo, `ls-logo.png.png`, is preserved unchanged in the repository root. The header, proclamation, decorative wax seal, and favicon all use this logo.

## Free static hosting

- **GitHub Pages:** push these files, then select **Settings → Pages → Deploy from a branch → main → / (root)**. No build command is needed.
- **Cloudflare Pages:** connect the repository, choose **None** as the framework, leave the build command empty, and set the output directory to `.`. Direct Upload also works with the whole directory.

Paths are relative, so the site supports a GitHub Pages repository subpath. No deployment has been performed by this task.

## Typography

Unmodified P052 Roman and Italic fonts are bundled from the URW Base35 collection. Their copyright and AGPL-3 license with font exception are included in `assets/FONT-LICENSE.txt`. Site decorations are inline SVG and CSS; no stock images are required.
