import { TestBed } from '@angular/core/testing';
import { beforeAll } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeAll(() => {
    globalThis.ResizeObserver = class ResizeObserverMock {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    } as typeof ResizeObserver;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('mounts the published Angular calendar adapter with sample events', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.status-line')?.textContent).toContain(
      '7 events loaded',
    );
    const calendar = fixture.nativeElement.querySelector('.wts-calender');
    expect(calendar).toBeTruthy();
    expect(calendar.textContent).toContain('Roadmap review');
    expect(fixture.nativeElement.querySelector('.event-summary')?.textContent).toContain('7');
  });

  it('switches to the package week view through the Angular controller', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const weekButton = [...fixture.nativeElement.querySelectorAll('.view-switcher button')].find(
      (button: Element) => button.textContent?.trim() === 'Week',
    ) as HTMLButtonElement;
    weekButton.click();
    fixture.detectChanges();

    expect(weekButton.classList.contains('active')).toBe(true);
    expect(fixture.nativeElement.querySelector('.status-line')?.textContent).toContain(
      'Week view opened',
    );
  });

  it('updates the calendar when an Angular event collection changes', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const addButton = fixture.nativeElement.querySelector('.primary-action') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.event-summary')?.textContent).toContain('8');
    expect(fixture.nativeElement.querySelector('.wts-calender')?.textContent).toContain(
      'Focus block',
    );
  });
});
