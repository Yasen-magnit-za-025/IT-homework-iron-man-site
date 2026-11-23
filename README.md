# Iron Man site for IT homework

A cinematic, scroll-driven fan site about Iron Man (2008), built with plain HTML, CSS and JavaScript (no libraries, no build step). It is made for desktop screens with a mouse; there is no phone layout.

## Run it

Open `sait.html` in a browser. For the 3D armor viewer, serve the folder over HTTP instead of opening the file directly, for example:

```
python -m http.server 5510
```

then visit http://localhost:5510/sait.html.

| File | Lines | What it does |
|---|---|---|
| `sait.html` | 633 | Page structure and content |
| `sait.css` | 1,202 | Look, layout and animation |
| `sait.js` | 1,019 | Interactions and scroll scenes |
| `fonts/` | | The Stark typeface |

## Presentation

A 44-slide walkthrough that explains every line of the three files. It describes the earlier, fully commented version of the site from the first commit (including the repulsor-blast scene, the Stark Tech section and the giant footer word, which have since been removed), so its line numbers match that version.

- `presentation/bulgarian.html`: Bulgarian version
- `presentation/english.html`: English version

Open either file in a browser. Click the number under a slide to show its speaker notes. The slide sources are in `presentation/bulgarian/` and `presentation/english/`. After editing them, rebuild a page with `python presentation/build-viewer.py bulgarian` (or `english`).

## Credits

This is an unofficial, non-commercial fan project. Iron Man, its characters and images belong to Marvel. Images load from the Marvel Cinematic Universe wiki, 3D armor models are embedded from Sketchfab and credited to their authors inside the site, and the Stark font is by Pixel Sagas (see `fonts/stark-font-license.txt`: free for personal, non-commercial use).
