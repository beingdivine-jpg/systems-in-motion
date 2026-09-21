# Hero portrait rendering

The homepage portrait comes from the owner's grey-shirt recording. The source
video is private and is not stored in the repository. The second clip and supplied
photo were appearance references; their footage is not spliced into the loop.

The offline macOS renderer uses AVFoundation, Vision person segmentation and
Core Graphics. It removes the room, preserves the hair silhouette, maps tonal
detail to a fixed irregular field of ink dots, and fades the shoulders.
Neutral hair tones receive additional density within the head area so backlighting
does not make the temples disappear. This correction follows the actual recorded
hair; it does not generate a face.

The hair-only finishing treatment takes inspiration from the reference photo's
balanced temple coverage. It gently extends the existing ink texture into the
recessed corners of the hairline, using soft regions tracked through the loop.
Only the connected crown supplies hair density; eyebrows and eyes are excluded.
It retains the recorded curls, face, expression, clothing, framing and motion.
No generated portrait or reference-photo pixels are inserted into the video.

The sequence uses the outward-looking portion of the recording, from 7.1 to 17.25
seconds: looking right, left, upward, and right again. It plays forward at a calmer
pace over sixteen seconds. A brief join between matching outward-looking poses closes the loop, with a
small framing correction to align the head position and avoid a long double exposure. There is no reversed blink or return to the opening camera-facing stare.
Audio is omitted entirely.

Run on macOS with the Command Line Tools installed. The desktop renderer applies
the approved hair treatment directly to the original recording before a single
H.264 encode, with a finer, denser dot field at 1620 × 1800:

```sh
swift -O scripts/render-desktop-portrait.swift /absolute/path/to/source.mov /absolute/path/to/desktop-output
```

Its final files are named `divin-portrait-desktop.mp4` and
`divin-portrait-desktop-poster.png`. Copy the video to the website's
`divin-portrait.mp4` path. Do not run the separate hair pass on this output.

The compact rendition retains its previously approved render. To reproduce it:

```sh
swift -O scripts/render-hero-portrait.swift /absolute/path/to/source.mov /absolute/path/to/output
swift -O scripts/refine-hero-hair.swift /absolute/path/to/output/divin-portrait.mp4 /absolute/path/to/finished
```

Add `--preview` to either renderer to export five stills and the isolated source
crop, or to the finishing command for nine hair-review frames. The finishing pass
is specific to this 16-second sequence and should run only once on the base render.
Render into separate working directories, inspect the results, then copy
only the named final assets into `public/media/portrait/`. The renderer overwrites
its named output files. Keep previous versions outside `public/` for comparison.

Final website assets:

- `public/media/portrait/divin-portrait.mp4` — H.264, 1620 × 1800, 30 fps, 16 seconds, silent.
- `public/media/portrait/divin-portrait-small.mp4` — H.264, 720 × 800, 30 fps, 16 seconds, silent.
- `public/media/portrait/divin-portrait-alpha.mov` — HEVC with native alpha, 1620 × 1800, 30 fps, 16 seconds, silent.
- `public/media/portrait/divin-portrait-small-alpha.mov` — HEVC with native alpha, 720 × 800, 30 fps, 16 seconds, silent.
- `public/media/portrait/divin-portrait-alpha-poster.png` — transparent 1620 × 1800 desktop first frame.
- `public/media/portrait/divin-portrait-small-alpha-poster.png` — transparent 1080 × 1200 compact first frame.

The original white-matted poster PNGs are retained as inputs to the alpha encoder.
To make Safari's native alpha assets from the approved renders:

```sh
swift -O scripts/encode-portrait-alpha.swift public/media/portrait/divin-portrait.mp4 public/media/portrait/divin-portrait-desktop-poster.png /absolute/path/to/alpha-output divin-portrait-alpha
swift -O scripts/encode-portrait-alpha.swift public/media/portrait/divin-portrait-small.mp4 public/media/portrait/divin-portrait-poster.png /absolute/path/to/alpha-output divin-portrait-small-alpha
```

The encoder verifies that the finished video track contains an alpha channel.
It refuses to overwrite existing output videos. Copy only the named `.mov` and
poster `.png` outputs; AVFoundation may also leave temporary `.sb-*` files.

`HeroMotion` displays the poster immediately and loads motion only when the hero
has entered view. Desktop screens use the high-resolution video; smaller screens
use the compact version. A viewport change across 1024px selects the other rendition.
Playback pauses offscreen or in a hidden tab. There is no visible playback button.
Reduced motion, autoplay restrictions and video failure retain the transparent poster.

Desktop typography and artwork scale together with the available viewport height.
The introductory phrase and three disciplines occupy separate desktop lines.
All sizes retain the full 9:10 portrait framing; compact-screen dimensions are
preserved. The entrance animation releases its transform and blur after finishing,
avoiding a persistent compositing layer around the fine grain.

Safari receives the QuickTime HEVC version with alpha encoded into the video,
with no CSS/SVG filter on its video or container. This avoids WebKit's accelerated
video sometimes bypassing SVG filters. QuickTime HEVC support is checked with
`canPlayType`; Chromium in the verified setup does not advertise that format.
Browsers without it retain the H.264 rendition and recover alpha using the SVG
ink filter on the video alone. All browsers use actual RGBA PNG posters; the
poster is hidden after the first video frame is playing to avoid double exposure.

Both paths use the same ink-coverage conversion. Whites at or above 250/255
become alpha zero, including the compression matte, and intermediate tones retain
soft grain coverage. The resulting transparent pixels reveal the page background
and ghost lettering without background matching or multiply blending.

References: [Apple HEVC with Alpha](https://developer.apple.com/videos/play/wwdc2019/506/)
and [WebKit SVG/video filter issue](https://bugs.webkit.org/show_bug.cgi?id=322588).
