# MOODORA AI

> **"Your Emotions. Your Creative Universe."**  
> *Feel it. Transform it. Create it.*

Moodora AI is an affective neural engine that transforms real human sentiment into synchronized **Visual**, **Narrative**, and **Sonic DNA**.

---

## 🎨 Design System Specifications

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| **Background** | `#11101D` | Deep cosmic obsidian backdrop |
| **Primary Violet** | `#8B5CF6` | Primary accents, interactive glows, core branding |
| **Lavender** | `#C4B5FD` | Secondary text, highlighted badges, harmonic notes |
| **Coral** | `#FF8066` | Story DNA accents, passion resonance, contrast highlights |
| **Cyan** | `#5EDCF5` | Visual DNA accents, euphoria resonance, cybernetic details |
| **Text** | `#F8F7FF` | High-contrast readable typography |
| **Headings Font** | `Space Grotesk` | Futuristic, modern display headings |
| **Body Font** | `Inter` | Clean, highly legible body copy |

---

## 🚀 Modules Overview

### Module 1: Landing Page
- **Hero**: Title *"Your Emotions. Your Creative Universe."*, Tagline *"Feel it. Transform it. Create it."*, animated Abstract Orb.
- **How It Works**: 3 steps from sentiment capture to universe materialization.
- **Creative DNA Feature Cards**: *Emotion Intelligence*, *Visual DNA*, *Story DNA*, and *Sound DNA*.
- **Resonance Engine**: Real-time affective triad demonstration (*Cosmic Wonder*, *Lucid Euphoria*, *Solar Passion*, *Zenith Serenity*).
- **Navigation & Footer**: Responsive glassmorphic navbar with mobile drawer and sitemap footer.

### Module 2: Mood Studio (`/studio`)
- **Heading**: *"What does your soul feel like today?"*
- **Natural Language Input**: Large textarea with inspiration sparks and character counter.
- **Multi-Select Emotion Chips**: *Happiness*, *Sadness*, *Nostalgia*, *Peace*, *Anger*, *Hope*, *Loneliness*, *Excitement*.
- **Emotion Intensity Slider**: Granular 1 to 10 scale with interactive tick buttons and dynamic valence descriptors.
- **Artistic Style Selector**: *Cinematic*, *Dreamy*, *Minimalist*, *Surreal*, *Abstract*.
- **Shared State Management**: `MoodoraContext` with localStorage persistence across route navigation.
- **Validation**: Requires either at least 1 emotion chip or a natural language description.

### Module 3: Emotion Intelligence Engine
- **Backend Architecture**: Node.js and Express server (`server/index.js`, `server/routes/generate.js`).
- **Official SDK**: Built with `@google/genai` using structured response schemas (`gemini-2.5-flash`).
- **Secure Key Management**: Server-side `GEMINI_API_KEY` reading, never leaked to the client.
- **Validation & Fallback**: Guaranteed 5-color palette, `#RRGGBB` hex validation, and seamless fallback data (`src/utils/fallbackData.js`).
- **Development Proxy**: Vite forwards `/api` directly to Express on port 3001.

### Module 4: Visual DNA (`/visual-dna`)
- **Dynamic 5-Color Palette Board**: Renders 5 dynamically generated colors from the shared AI blueprint in `MoodoraContext`.
- **Complete Color Metadata**: Swatches, color names, hex codes, affective meanings, per-color copy buttons, and copy-all palette.
- **Architectural Visual Direction**: Style, lighting direction, composition, and atmosphere cards.
- **Zero Duplicate Gemini Calls**: Directly reads the existing blueprint.

### Module 5: Story DNA & Sound DNA (`/story-sound-dna`)
- **Story DNA**: Title, reading metrics, original emotional narrative in editorial typography, and central message callout.
- **Sound DNA**: Music genre, sound mood, tempo cadence, instruments matrix, and binaural soundscapes.
- **Compositional Guidance**: Transparent acoustic direction (no fake audio players).

### Module 6: Creative Canvas Dashboard (`/canvas` & `/creations`)
- **Unified Master Dashboard**: Integrates all 6 dimensions on a single polished screen:
  1. *Creative Identity Title*: Display typography, source attribution, and emotional interpretation.
  2. *Emotional DNA*: Primary and secondary vectors, intensity meter, and psychological reading.
  3. *Visual DNA*: 5 dynamic color swatches with hex codes, names, meanings, and individual copy buttons.
  4. *Story DNA*: Original narrative prose, central message callout, and copy-story button.
  5. *Sound DNA*: Acoustic direction, genre, mood, tempo, instruments, and copy-sound button.
  6. *Art Prompt*: Complete generative image prompt with one-click copy button.
- **LocalStorage Creation Persistence**:
  - **Save Creation**: Stores complete creation with timestamp to browser `localStorage` (`moodora_saved_creations`).
  - **My Creations Page (`/creations`)**: Visual gallery of all saved universes.
  - **Open & View**: One-click opening of any saved creation into the live Canvas.
  - **Delete**: Remove creations from the archive.
- **Export & Action Tools**:
  - **Export as TXT**: Generates and downloads a complete formatted `.txt` document.
  - **Copy Everything**: Copies the full formatted blueprint to clipboard.
  - **Create Another**: Resets mood state and redirects back to Mood Studio.
  - **Save Toast**: Instant visual confirmation banner on save.

---

## 🛠️ Development & Build Commands

```bash
# Start backend Express server (Port 3001)
npm run server

# Start frontend Vite dev server (Port 5173)
npm run dev

# Run TypeScript checking & production build
npm run build

# Preview production build locally
npm run preview
```
