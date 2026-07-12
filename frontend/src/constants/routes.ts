import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Flag,
  Goal,
  HelpCircle,
  Home,
  RotateCcw,
  Settings,
} from 'lucide-react';

export const routes = [
  {
    path: '/',
    label: 'Hoje',
    title: 'Hoje',
    actionLabel: 'Comecar agora',
    icon: Home,
  },
  {
    path: '/evolucao',
    label: 'Evolucao',
    title: 'Evolucao',
    actionLabel: 'Registrar estudo',
    icon: BarChart3,
  },
  {
    path: '/cronograma',
    label: 'Cronograma',
    title: 'Cronograma',
    actionLabel: 'Nova atividade',
    icon: CalendarDays,
  },
  {
    path: '/estudos',
    label: 'Estudos',
    title: 'Estudos',
    actionLabel: 'Nova sessão',
    icon: BookOpen,
  },
  {
    path: '/questoes',
    label: 'Questões',
    title: 'Questões',
    actionLabel: 'Registrar questões',
    icon: HelpCircle,
  },
  {
    path: '/banco-de-erros',
    label: 'Banco de Erros',
    title: 'Banco de Erros',
    actionLabel: 'Adicionar erro',
    icon: ClipboardList,
  },
  {
    path: '/revisoes',
    label: 'Revisões',
    title: 'Revisões',
    actionLabel: 'Nova revisão',
    icon: RotateCcw,
  },
  {
    path: '/simulados',
    label: 'Simulados',
    title: 'Simulados',
    actionLabel: 'Novo simulado',
    icon: Flag,
  },
  {
    path: '/metas',
    label: 'Metas',
    title: 'Metas',
    actionLabel: 'Nova meta',
    icon: Goal,
  },
  {
    path: '/configuracoes',
    label: 'Configurações',
    title: 'Configurações',
    actionLabel: 'Salvar ajustes',
    icon: Settings,
  },
] as const;

export type AppRoute = (typeof routes)[number];
