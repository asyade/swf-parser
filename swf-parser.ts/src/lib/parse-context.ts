import { Uint16, Uint8, UintSize } from "semantic-types";

/**
 * Return the major SWF version or undefined if the version is unknown.
 */
export type VersionProvider = () => Uint8 | undefined;

/**
 * Type representing a function returning the number of glyphs in the font with ID `fontId`.
 * If the font is not known, returns undefined.
 */
export type GlyphCountProvider = (fontId: Uint16) => UintSize | undefined;

export interface ParseContext {
  readonly getVersion: VersionProvider;
  readonly getGlyphCount: GlyphCountProvider;

  setGlyphCount(fontId: Uint16, glyphCount: UintSize): void;
}

export class DefaultParseContext implements ParseContext {
  private readonly version: number | undefined;
  private readonly glyphCounts: Map<Uint16, UintSize>;

  constructor(version?: UintSize) {
    this.version = version;
    this.glyphCounts = new Map();
  }

  getVersion(): Uint8 | undefined {
    return this.version;
  }

  setGlyphCount(fontId: Uint16, glyphCount: UintSize): void {
    this.glyphCounts.set(fontId, glyphCount);
  }

  getGlyphCount(fontId: Uint16): UintSize | undefined {
    return this.glyphCounts.get(fontId);
  }
}
