# Lessons

The engine follows 35 rules. **Every one of them came from something that
shipped broken.** None were invented in the abstract, because a rule with no
scar behind it gets ignored.

Each rule also lives in code as a check, because **a rule that only lives in a
document is a wish.** The very first rule proved it: it was written on day one,
then broken in eight of thirteen shots, because nothing checked.

Here are twelve of them. The rest, and how each one is enforced in code, stay
with the engine.

---

## Trust nothing you haven't checked

### 1. Break every check once, on purpose
An assertion that has never fired is not an assertion.

**What happened:** a check that was meant to verify every asset scanned for a
pattern the code never contained. It matched nothing, and passed everything,
for three videos.

### 2. Verify that a change landed. Never just announce it.
**What happened:** a script printed *"sequence path wired"*. The edit hadn't
matched, and a placeholder shipped inside a finished video.

### 3. A sound effect is measured, never assumed
**What happened:** the whoosh was generated from a noise source that came out at
−57 dBFS, which is practically silent. It passed the "file exists and is over
4 KB" check. Every cut in a finished video was silent, while the README promised
a sound on every cut. Now every effect is measured, and a quiet one fails the
build.

### 4. Trust the disk, not the manifest
**What happened:** a manifest claimed 150 frames, but only 121 existed. The
render failed on every missing one.

### 5. Read the whole log, not the loudest line
**What happened:** errors "from frame 122" produced a confident, detailed and
wrong theory about video seeking. In fact every frame was failing, because
ffmpeg had never been installed.

---

## The voice leads, the edit follows

### 6. The edit follows the voice, never the reverse
**What happened:** a 54-second script took 82.6 seconds to say. The delivery
wasn't wrong; the script's timings were guesses. Now every scene's length is
measured from the recording.

### 7. Cut the dead air
**What happened:** the first take was 31% silence. The pace was fine, but the
gaps were long. Trimming every pause to a fixed hold took it from 82.6 s to
65.9 s.

### 8. The last complete attempt wins, and a small slip is not a retake
**What happened:** *"mostly, yes"* said in place of *"mostly real"* was treated
as a retake and cut, so the line lost its last word.

### 9. The script supplies the words; speech-to-text only supplies the timing
**What happened:** Whisper spelled Telugu wrong, and looped. A transcript's
spelling on screen is a stranger's spelling.

---

## What reaches the screen

### 10. No number on screen without its source
An unsourced number is a claim. Once putting a figure on screen took one line
of script, that also became the easiest way to ship one without a source. So a
figure with no source now fails the build.

### 11. If it's on screen, it's on the storyboard
**What happened:** a 3.5-second title inside an 8-second scene was missed by
the one-still-per-scene sheet. It could have shipped broken without anyone
seeing it.

### 12. The shuffle test
Before building anything, put the scenes in a different order. If nothing is
lost, it's a list, not a story.

**What happened:** a video that covered eight subjects was technically
excellent and emotionally inert.
