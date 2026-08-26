import { Component, signal } from '@angular/core';
import {
  WtsCalendarAngularComponent,
  WtsCalendarAngularController,
  type WtsCalendarAngularInitialOptions,
} from '@wts-calendar/angular';
import {
  type CalendarDateClickInfo,
  type CalendarDatesSetDetail,
  type CalendarEventClickInfo,
  type CalendarEventInput,
  type CalendarOptionChanges,
  type CalendarThemeName,
  type CalendarView,
  type WtsCalendar,
} from '@wts-calendar/core';

type DemoView = 'month' | 'day-grid-week' | 'day-grid-day';

const ORIGINAL_EVENTS: readonly CalendarEventInput[] = [
  {
    id: 'roadmap',
    title: 'Roadmap review',
    start: '2026-08-03T10:00:00',
    end: '2026-08-03T11:15:00',
    color: '#d76447',
    textColor: '#fffaf5',
  },
  {
    id: 'design-critique',
    title: 'Design critique',
    start: '2026-08-06T14:00:00',
    end: '2026-08-06T15:30:00',
    color: '#6d5bd0',
    textColor: '#ffffff',
  },
  {
    id: 'offsite',
    title: 'Team offsite',
    start: '2026-08-10',
    end: '2026-08-13',
    isAllDay: true,
    color: '#167d75',
    textColor: '#ffffff',
  },
  {
    id: 'research',
    title: 'Research synthesis',
    start: '2026-08-18T09:30:00',
    end: '2026-08-18T11:00:00',
    color: '#246b9e',
    textColor: '#ffffff',
  },
  {
    id: 'customer-call',
    title: 'Customer call',
    start: '2026-08-21T16:00:00',
    end: '2026-08-21T17:00:00',
    color: '#c18118',
    textColor: '#ffffff',
  },
  {
    id: 'launch',
    title: 'V1 launch',
    start: '2026-08-26T09:00:00',
    end: '2026-08-26T10:00:00',
    color: '#b13d63',
    textColor: '#ffffff',
  },
  {
    id: 'retro',
    title: 'Launch retrospective',
    start: '2026-08-28T15:00:00',
    end: '2026-08-28T16:00:00',
    color: '#354f52',
    textColor: '#ffffff',
  },
];

@Component({
  selector: 'app-root',
  imports: [WtsCalendarAngularComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly controller = new WtsCalendarAngularController();
  protected readonly events = signal<readonly CalendarEventInput[]>([...ORIGINAL_EVENTS]);
  protected readonly liveOptions = signal<CalendarOptionChanges>({});
  protected readonly activeView = signal<DemoView>('month');
  protected readonly activeTitle = signal('August 2026');
  protected readonly theme = signal<CalendarThemeName>('forma');
  protected readonly weekends = signal(true);
  protected readonly selectedDate = signal(new Date(2026, 7, 6));
  protected readonly selectedEvent = signal('No event selected');
  protected readonly status = signal('Starting calendar…');

  protected readonly viewOptions: readonly { value: DemoView; label: string }[] = [
    { value: 'month', label: 'Month' },
    { value: 'day-grid-week', label: 'Week' },
    { value: 'day-grid-day', label: 'Day' },
  ];

  protected readonly themes: readonly CalendarThemeName[] = ['forma', 'breezy', 'monarch', 'pulse'];

  protected readonly initialOptions: WtsCalendarAngularInitialOptions = {
    view: 'month',
    viewDate: '2026-08-01',
    headerToolbar: false,
    locale: 'en-US',
    startOfWeek: 1,
    theme: 'forma',
    colorScheme: 'light',
    height: 660,
    expandRows: true,
    dayMaxEvents: 3,
    navLinks: true,
    displayEventTime: true,
    eventTimeFormat: 'hh:mm a',
    dateClick: (info) => this.handleDateClick(info),
    eventClick: (info) => this.handleEventClick(info),
    datesSet: (detail) => this.handleDatesSet(detail),
  };

  protected calendarReady(calendar: WtsCalendar): void {
    this.activeTitle.set(calendar.getView().title);
    this.status.set(`${calendar.getEvents().length} events loaded`);
  }

  protected calendarError(error: unknown): void {
    this.status.set(error instanceof Error ? error.message : 'Calendar failed to start');
  }

  protected changeView(view: DemoView): void {
    this.controller.getApi()?.changeView(view);
    this.activeView.set(view);
    this.status.set(`${this.viewLabel(view)} view opened`);
  }

  protected navigate(direction: 'previous' | 'next' | 'today'): void {
    const calendar = this.controller.getApi();
    if (!calendar) return;

    if (direction === 'previous') calendar.previous();
    if (direction === 'next') calendar.next();
    if (direction === 'today') calendar.gotoDate('2026-08-26');
  }

  protected changeTheme(event: Event): void {
    const theme = (event.target as HTMLSelectElement).value as CalendarThemeName;
    this.theme.set(theme);
    this.liveOptions.update((options) => ({ ...options, theme }));
    this.status.set(`${this.titleCase(theme)} theme applied`);
  }

  protected toggleWeekends(): void {
    const weekends = !this.weekends();
    this.weekends.set(weekends);
    this.liveOptions.update((options) => ({ ...options, weekends }));
    this.status.set(weekends ? 'Weekends are visible' : 'Weekends are hidden');
  }

  protected addFocusBlock(): void {
    const index = this.events().length + 1;
    const start = new Date(this.selectedDate());
    start.setHours(13, 0, 0, 0);
    const end = new Date(start);
    end.setHours(14, 30, 0, 0);

    this.events.update((events) => [
      ...events,
      {
        id: `focus-${index}`,
        title: 'Focus block',
        start,
        end,
        color: '#293241',
        textColor: '#ffffff',
      },
    ]);
    this.status.set(`Focus block added on ${this.formatDate(start)}`);
  }

  protected resetDemo(): void {
    this.events.set([...ORIGINAL_EVENTS]);
    this.theme.set('forma');
    this.weekends.set(true);
    this.liveOptions.set({ theme: 'forma', weekends: true });
    this.controller.getApi()?.changeView('month', '2026-08-01');
    this.activeView.set('month');
    this.selectedEvent.set('No event selected');
    this.status.set('Demo reset');
  }

  protected formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  private handleDateClick(info: CalendarDateClickInfo): void {
    this.selectedDate.set(info.date);
    this.status.set(`${this.formatDate(info.date)} selected`);
  }

  private handleEventClick(info: CalendarEventClickInfo): void {
    this.selectedEvent.set(info.event.title);
    this.status.set(`${info.event.title} selected`);
  }

  private handleDatesSet(detail: CalendarDatesSetDetail): void {
    this.activeTitle.set(detail.view.title);
    if (this.isDemoView(detail.view.type)) this.activeView.set(detail.view.type);
  }

  private isDemoView(view: CalendarView): view is DemoView {
    return view === 'month' || view === 'day-grid-week' || view === 'day-grid-day';
  }

  private viewLabel(view: DemoView): string {
    return this.viewOptions.find((option) => option.value === view)?.label ?? view;
  }

  private titleCase(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }
}
