# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| almotasim-portfolio | Chaptered editorial | Folio: running head, live chapter readout, controls as running text, top-edge progress hairline | Title plate: dark ground, two-line bar-wipe headline, masked portrait, five marks, tile dissolve out | 7 acts / 12.0vh: kinetic > reveal (plate wipes) > flow+draw > parallax rail > authored silence > count (peak) > type close | Colophon: rule, ask set as running text, what the page is set in, rights | Evidence band: verified figures stamp into a band at the foot of the window as the reader passes them, and the band hands the record to the evidence plate | Cream canvas + warm off-black plate, acid-yellow accent, Poppins / IBM Plex Sans Arabic, bilingual EN/AR | Astro 5 + GSAP ScrollTrigger + Lenis |

*(First row. It had nothing to clear; from here on this table is the
constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Chaptered editorial** as a grammar, with numbered chapters and hard ground
  cuts rather than drift.
- **The folio** as a nav treatment: a running head carrying a live chapter
  readout and its controls as running text, with a progress hairline on the top
  edge. A later build wanting an editorial page needs a different chrome.
- **The colophon close**: rule, ask as running text, setting note, rights. Any
  ending that is a quiet typeset plate rather than a CTA island now collides
  with this one.
- **The evidence band** as a signature move: anything that accumulates a record
  of verified figures in fixed chrome and hands it to a final plate is this move
  with a new name.
- **7 acts at 12.0 viewport-heights**, opening on a title plate and peaking on a
  count act two thirds of the way down.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
