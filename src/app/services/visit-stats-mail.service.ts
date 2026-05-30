import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

interface CountApiResponse {
  value: number;
}

@Injectable({ providedIn: 'root' })
export class VisitStatsMailService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Configuracion basica para servicio gratuito.
  // Reemplaza con tu email real para activar el envio.
  private readonly recipientEmail = 'alexvicentejose@gmail.com';
  private readonly countApiNamespace = 'alex-vicente-dev';
  private readonly throttleHours = 6;

  async trackVisitAndSendStats(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.isThrottled()) {
      return;
    }

    try {
      const now = new Date();
      const dateKey = now.toISOString().slice(0, 10);
      const [total, today] = await Promise.all([
        this.hitCounter('visits-total'),
        this.hitCounter(`visits-${dateKey}`),
      ]);

      const path = window.location.pathname;
      const language = document.documentElement.lang || 'es';
      const timestamp = now.toISOString();

      await this.sendEmail({
        totalVisits: total,
        todayVisits: today,
        path,
        language,
        timestamp,
      });

      localStorage.setItem('visit-stats-last-mail-ts', Date.now().toString());
    } catch {
      // Silencioso: nunca bloquea la carga de la web por un error de telemetria.
    }
  }

  private async hitCounter(key: string): Promise<number> {
    const url = `https://api.countapi.xyz/hit/${this.countApiNamespace}/${key}`;
    const response = await firstValueFrom(this.http.get<CountApiResponse>(url));
    return response.value;
  }

  private async sendEmail(data: {
    totalVisits: number;
    todayVisits: number;
    path: string;
    language: string;
    timestamp: string;
  }): Promise<void> {
    const url = `https://formsubmit.co/ajax/${encodeURIComponent(this.recipientEmail)}`;

    const body = {
      _subject: 'Estadisticas sencillas de visitas - alex-vicente.dev',
      _template: 'table',
      _captcha: 'false',
      pagina: data.path,
      idioma: data.language,
      visitas_hoy: data.todayVisits,
      visitas_totales: data.totalVisits,
      fecha_iso: data.timestamp,
    };

    await firstValueFrom(this.http.post(url, body));
  }

  private isThrottled(): boolean {
    const last = localStorage.getItem('visit-stats-last-mail-ts');
    if (!last) {
      return false;
    }

    const elapsed = Date.now() - Number(last);
    return elapsed < this.throttleHours * 60 * 60 * 1000;
  }
}
