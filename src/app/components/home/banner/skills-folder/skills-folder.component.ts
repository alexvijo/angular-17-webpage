import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills-folder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
  templateUrl: './skills-folder.component.html',
  styleUrl: './skills-folder.component.scss',
})
export class SkillsFolderComponent {
  readonly fileName = 'skill.md';

  // Descripciones en i18n: "Skills.<nombre>"
  readonly skills = [
    'AI Engineering', 'Agentes IA', 'MCP', 'RAG',
    'LLM Security', 'Claude Code', 'System Design', 'Angular / TypeScript',
    'Node.js / NestJS', 'Spring Boot', 'Testing', 'Cloud / CI/CD',
  ];
}
