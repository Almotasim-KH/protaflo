# BRIEF — almotasim-kh.com re-choreography

Interview status: **questions 1, 2, 3, 6, 7 answered by the human. Questions 4, 5, 8
self-authored** from the existing repo content after the human said "continue" without
answering them. Marked so nobody later reads the self-authored parts as the human's words.

## The eight answers

**1. Vibe, three to five words + references** — *self-authored.*
Quiet, exact, evidenced, bilingual. References, none named by the human; taken from the
repo's own voice: a printed technical report, a museum object label, a page of an
audited ledger.

**2. The scroll journey, section by section** — *human, via the scope answer.*
"Re-choreograph, keep sections." So the human's sequence is the one already shipped:
title, then the work, then who I am and how I work, then the record, then contact.
Nothing is reordered. Each one gets a different device.

**3. The energy curve** — *human, via range.* Premium-minimal, sharpened. Quiet the whole
way, with one loud act that is loud only because everything around it is not.

**4. How should someone feel, stage by stage, and the ONE moment** — *self-authored.*
See the feeling curve and the peak below.

**5. One thing this site does that no site they have seen does** — *self-authored.*
The evidence stamps itself into the margin as you read, and at the end the margin
empties itself into the middle of the screen as a signed plate.

**6. Distance from premium-minimal** — *human.* "Premium-minimal, sharper. Stay quiet and
confident. Creative energy goes into motion, not decoration."

**7. One unbroken world, or distinct scenes** — *human.* "Distinct scenes. Each act
behaves differently: pin, rail, scrub, wipe."

**8. Assets already owned** — *self-authored from the repo.* Four screen recordings in
`public/videos`, project screenshots in `src/assets`, the portrait at `public/me.svg`,
the deco SVG set in `public/deco`. No generation, no API spend. `ffmpeg` is absent on this
machine, so nothing can be re-encoded for scrubbing; that removed one device from the score.

**Trust engine** — *human.* Real numbers from projects, and process shown rather than
claimed. Both, nothing else.

## Grammar

**Chaptered editorial.** The page is a printed feature: numbered chapters, hard ground
cuts, a folio in the margin instead of a marketing bar, media in its own column with a
caption, a colophon at the end instead of a CTA island.

## The feeling curve

```
0  Title      Composure    dark plate, two lines wiping in, nothing hurrying
1  Ch I Work  Curiosity    each project arrives as a plate that wipes open beside its label
2  Ch II How  Trust        the method draws itself, rule by rule, as an audit trail
3  Ch III Rec Weight       the record travels against a fixed year rail, dense and slow
4  Interlude  Silence      one line on an empty dark ground (AUTHORED, not dead scroll)
5  Evidence   Conviction   the margin ledger empties into the centre and totals itself
6  Colophon   Resolve      smallest type on the site, the ask set as running text
```

No two adjacent feelings repeat. Act 4 is deliberate emptiness and the verification pass
must read it as authored silence, not as a failure.

## The peak

> "the numbers had been stacking up in the margin the whole way down, and then the page
> went dark and they all flew into the middle and signed themselves."

Lives in act 5, Evidence. It gets the largest scroll span on the page by a visible margin,
the only full ground inversion after the title, and the silence of act 4 in front of it.

## The tell-someone sentence

It's the site where **the proof piles up in the margin as you read, and at the end it hands
you the receipt.**

## The signature move

**The evidence band.** A fixed band along the foot of the window. Every verified figure
the page passes stamps itself into it, with the project it came from, and the band
counts what the reader has walked past. At the peak it hands the whole record to the
evidence plate and drops back out of the bottom edge. Only real numbers ever enter it,
which is also the constraint that keeps it honest: no figure in the repo, no line in
the band.

It was built as a margin rail first and that was wrong. This page runs a 1240px measure
inside clamp(24px, 7vw, 120px) gutters, so there is no outer margin at any width a
reader actually has, and a rail placed in one sat on top of the About column. Three
rounds of patching it (a translucent tint, then an opaque panel) each traded one defect
for another before the placement itself turned out to be the fault.

## Authored silence

Act 4, the interlude before Evidence. One line, dark ground, no media, roughly one
viewport-height of nothing else. Intentional.

## Real numbers available (all sourced from repo content, none invented)

| Figure | Source |
|---|---|
| 12 Excel sources merged | Revenue Analysis 2024 |
| over 60 min to under 1 min | Revenue Analysis 2024 |
| 4 quarters covered | Revenue Analysis 2024, Camp Operations |
| 12 sheets into one screen | Camp Operations Dashboard |
| about 9 hours saved weekly | Camp Operations Dashboard |
| 30 people using one shipped platform | About, proof line |
| around 300 participants | Sales Analytics Challenge |
| 4th place out of 44 teams | YCATThon 2024 |
| in tech since 2022 | About paragraph |

## The feel check, run cold against the contact sheets

| Act | Intended | Felt | Verdict |
|---|---|---|---|
| Title plate | Composure | composure | holds |
| I, the work | Curiosity | curiosity | holds |
| II, how I work | Trust | explanation | close, see below |
| III, the record | Weight | weight | holds |
| Interlude | Silence | silence | holds, and reads as authored |
| IV, the evidence | Conviction | conviction | holds, largest change on the sheet |
| Colophon | Resolve | resolve | holds, last screen keeps content on it |

Chapter two lands nearer explanation than trust: the marks that draw themselves are
84px wide and easy to miss at reading pace, so what carries the act is the proof line
and the three working rules, which read as being told rather than being shown. Left as
built. It is the quietest act on the page by design and the record after it needs
something to be denser than.

## What the verification pass changed

1. The ledger's release points were keyed on file names, and the content loader
   slugifies them, so the two work-chapter figures never stamped. Keyed on the
   built slug.
2. The page ended on the old footer, which overwrote the colophon. Footer dropped
   from the home page and its rights line folded into the colophon. The project
   pages keep it.
3. One ground probe served both fixed elements, so on any frame straddling a
   chapter cut the ledger was painted in the folio's ink and rendered dark on the
   dark plate. Two probes now, each at its own element's height, plus a tint block
   behind the rail for the frames where the cut runs through the rail itself.
4. Evidence cells that had not landed yet showed as grey holes, because the grid
   painted a hairline field behind them. The list carries the plate colour and each
   cell carries its own rule.
5. Past ledger lines sat at 0.42 opacity, under 3:1 on the plate. Raised to 0.68.
6. The peak was not visibly the longest hold. Its cell height and the space under
   the plate were both increased.

## What was NOT verified

- A real phone. Headless Chrome at 390x844 is not an iPhone: it cannot reproduce
  the video decoder, autoplay policy, Low Power Mode or touch scrolling, and the
  work plates carry four autoplaying screen recordings.
- Safari and Firefox. `color-mix`, `backdrop-filter` and `@property` all have
  fallbacks in this stylesheet, but none of them were checked on those engines.
- Any scrub device, because there is no ffmpeg on this machine to re-encode the
  screen recordings for seeking. They stay looping clips, as before.


## Second round, after the owner read the page

The owner's report was "I don't understand how it works, and it feels like it is not
working properly." Both halves were correct and they had different causes.

1. **Arrival order was wrong (a defect).** Lines rendered in the order the figures are
   written in the dictionary, not the order the reader meets them. Camp Operations sits
   above Revenue Analysis on the page, so its figure stamps first and then two lines
   appeared *above* it, and the newest-line highlight marked the last line in list order
   rather than the one that had just landed. Now tracked as an arrival sequence.
2. **Nothing said what it was.** A corner block reading EVIDENCE 3 OF 6 with numbers
   appearing in it. Added four words, in both languages: "collected as you read".
3. **The placement was impossible.** See above. Moved to a foot band, which is legible
   over any content, covers no column at any width, and reads as page furniture.
4. **The handoff was two animations, not one.** The rail faded while the plate's cells
   slid in separately, so "the record hands itself over" never read. The band now drops
   through the bottom edge as the cells land.
5. **The crossfade showed two figures at once.** Both lines share one row; the outgoing
   one now leaves in 0.14s against the incoming 0.3s.
