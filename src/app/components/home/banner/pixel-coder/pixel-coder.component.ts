import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pixel-coder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas width="288" height="352"></canvas>`,
  styles: [`
    canvas {
      display: block;
      width: 278px;
      height: 342px;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }
  `],
})
export class PixelCoderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private raf!: number;
  private frame = 0;
  private readonly P = 8;

  private readonly HAIR   = '#5C3317';
  private readonly SKIN   = '#FFBC8B';
  private readonly EYES   = '#2A1A0A';

  private readonly MOUTH  = '#CC8866';
  private readonly SHIRT  = '#1A1A2A';
  private readonly SLEEVE = '#111118';
  private readonly DESK   = '#1E2D4A';
  private readonly DESK_E = '#112240';
  private readonly DESK_L = '#0d1b35';
  private readonly LAP    = '#a8b2d1';
  private readonly KEY    = '#8892b0';
  private readonly KEY_D  = '#303C55';
  private readonly SCR_BG = '#090B1A';
  private readonly CODE_H = '#F41EA2';
  private readonly CODE_D = '#7d7cff';

  private readonly codeLengths = [10, 6, 14, 3, 12, 8, 16, 5, 11, 4, 13, 7, 9, 15, 6, 11, 10, 8, 14, 3];

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.loop();
  }

  ngOnDestroy() { cancelAnimationFrame(this.raf); }

  private loop() {
    this.frame++;
    this.render();
    this.raf = requestAnimationFrame(() => this.loop());
  }

  private r(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.P, y * this.P, w * this.P, h * this.P);
  }

  private render() {
    const { frame, ctx, P } = this;
    const r = this.r.bind(this);

    const typing    = Math.floor(frame / 10) % 2 === 0;
    const blink     = Math.floor(frame / 28) % 2 === 0;
    const scroll    = Math.floor(frame / 7);
    const glow      = 0.35 + 0.15 * Math.sin(frame * 0.04);
    const armOff = typing ? 0 : 1;
    // ── BACKGROUND (transparente) ────────────────────
    ctx.clearRect(0, 0, 288, 352);

    // ── DESK ─────────────────────────────────────────
    r(0, 33, 36, 2, this.DESK);
    r(0, 35, 36, 1, this.DESK_E);
    r(1, 36, 3, 8, this.DESK_L);
    r(32, 36, 3, 8, this.DESK_L);

    // ── MONITOR STAND + BASE (touching desk at row 33) ─
    r(5, 28, 4, 5, this.LAP);     // stand
    r(3, 32, 8, 1, '#ccd6f6');    // base highlight
    r(3, 33, 8, 1, this.LAP);     // base sits on desk

    // ── MONITOR BEZEL (rows 14-28) ───────────────────
    r(0, 14, 15, 14, this.LAP);
    // Screen background
    r(1, 15, 13, 12, this.SCR_BG);

    // ── SCREEN GLOW ──────────────────────────────────
    ctx.save();
    ctx.shadowColor = `rgba(244,30,162,${glow})`;
    ctx.shadowBlur = 24;
    ctx.fillStyle = `rgba(180,20,120,0.04)`;
    ctx.fillRect(0, 14 * P, 15 * P, 14 * P);
    ctx.restore();

    // ── CODE LINES ───────────────────────────────────
    for (let line = 0; line < 11; line++) {
      const idx   = (scroll + line) % this.codeLengths.length;
      const len   = Math.min(this.codeLengths[idx], 11);
      const color = line % 4 === 3 ? this.CODE_D : this.CODE_H;
      r(2, 16 + line, len, 1, color);
    }
    if (blink) {
      const curLen = Math.min(this.codeLengths[scroll % this.codeLengths.length], 11);
      r(2 + curLen, 16 + (scroll % 11), 1, 1, this.CODE_H);
    }

    // ── CHAIR ────────────────────────────────────────
    r(22, 20, 3, 14, this.DESK_L);   // chair back
    r(21, 32, 7, 1, this.DESK_L);    // chair seat

    // ── BODY / SHIRT ─────────────────────────────────
    r(20, 20, 10, 13, this.SHIRT);
    r(19, 21, 1, 11, this.SLEEVE);   // left shoulder
    r(30, 21, 1, 11, this.SLEEVE);   // right shoulder

    // ── ARMS ─────────────────────────────────────────
    // Left arm toward keyboard
    r(15, 25 + armOff, 5, 3, this.SLEEVE);
    r(14, 28 + armOff, 5, 2, this.SKIN);
    r(14, 30 + armOff, 4, 1, this.SKIN);
    // Right arm toward keyboard
    r(30, 25 + armOff, 5, 3, this.SLEEVE);
    r(31, 28 + armOff, 4, 2, this.SKIN);
    r(32, 30 + armOff, 3, 1, this.SKIN);

    // ── KEYBOARD ─────────────────────────────────────
    r(14, 31, 22, 2, this.KEY);
    r(14, 31, 22, 1, '#ccd6f6');
    r(14, 32, 22, 1, this.KEY_D);
    for (let kx = 0; kx < 10; kx++) {
      r(15 + kx * 2, 31, 1, 1, this.KEY_D);
    }

    // ── NECK ─────────────────────────────────────────
    r(23, 16, 4, 5, this.SKIN);

    // ── HEAD ─────────────────────────────────────────
    // Hair top (castaño, volumen natural)
    r(20, 3, 10, 4, this.HAIR);
    r(19, 4, 1, 7, this.HAIR);   // left side
    r(30, 4, 1, 7, this.HAIR);   // right side
    r(19, 3, 2, 3, this.HAIR);   // left temple
    r(29, 3, 2, 3, this.HAIR);   // right temple
    // Slight hair texture on top
    r(21, 3, 1, 1, '#7A4A22');
    r(25, 3, 2, 1, '#7A4A22');

    // Face
    r(20, 5, 10, 10, this.SKIN);
    r(19, 6, 1, 8, this.SKIN);
    r(30, 6, 1, 8, this.SKIN);

    // Ears
    r(18, 9, 1, 2, this.SKIN);
    r(31, 9, 1, 2, this.SKIN);

    // Eyebrows
    r(20, 7, 3, 1, this.HAIR);
    r(26, 7, 3, 1, this.HAIR);

    // Eyes
    r(21, 9, 2, 1, this.EYES);
    r(27, 9, 2, 1, this.EYES);

    // Glasses – left lens
    r(20, 8, 4, 1, '#8892b0');
    r(20, 11, 4, 1, '#8892b0');
    r(20, 8, 1, 3, '#8892b0');
    r(23, 8, 1, 3, '#8892b0');
    ctx.fillStyle = 'rgba(125,124,255,0.12)';
    ctx.fillRect(21 * P, 9 * P, 2 * P, 2 * P);

    // Glasses – right lens
    r(26, 8, 4, 1, '#8892b0');
    r(26, 11, 4, 1, '#8892b0');
    r(26, 8, 1, 3, '#8892b0');
    r(29, 8, 1, 3, '#8892b0');
    ctx.fillStyle = 'rgba(125,124,255,0.12)';
    ctx.fillRect(27 * P, 9 * P, 2 * P, 2 * P);

    // Glasses bridge
    r(24, 9, 2, 1, '#8892b0');

    // Screen glow reflection on glasses
    ctx.fillStyle = `rgba(244,30,162,${glow * 0.25})`;
    ctx.fillRect(21 * P, 9 * P, 2 * P, 2 * P);
    ctx.fillRect(27 * P, 9 * P, 2 * P, 2 * P);

    // Nose
    r(24, 11, 2, 1, '#EEA07A');
    r(23, 12, 1, 1, '#EEA07A');
    r(25, 12, 1, 1, '#EEA07A');

    // Mouth (slight smile)
    r(22, 13, 6, 1, this.MOUTH);
    r(22, 14, 1, 1, '#AA6644');   // left corner
    r(27, 14, 1, 1, '#AA6644');   // right corner

    // Light stubble (foto muestra algo de barba ligera)
    r(21, 13, 1, 1, '#DDA080');
    r(28, 13, 1, 1, '#DDA080');
    r(22, 14, 5, 1, '#DDA080');

    // ── SCANLINES ────────────────────────────────────
    ctx.fillStyle = 'rgba(0,0,0,0.09)';
    for (let sy = 0; sy < 44; sy += 3) {
      ctx.fillRect(0, sy * P, 288, P);
    }
  }
}
