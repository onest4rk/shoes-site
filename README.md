# ShoeSpot — local shoe storefront demo

This is a static shoe website with:

- a 3D-style hero showcase
- locally generated vector shoe renders
- featured product cards
- a filterable catalog
- journal and FAQ pages
- no build step and no external image assets

## Run locally

From the project folder:

```bash
cd /home/st4rk/shoes-site
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

If you want a different port, change `4173` to any free port.

## Files

- `index.html` — homepage and 3D shoe hero
- `catalog.html` — searchable/filterable product catalog
- `blog.html` — editorial content page
- `faq.html` — support and sizing page
- `styles.css` — shared styling
- `script.js` — local rendering and interactions
