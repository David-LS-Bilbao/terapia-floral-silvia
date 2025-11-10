import { describe, it, expect } from 'vitest';

describe('Smoke tests básicos', () => {
  it('suma básica funciona', () => {
    expect(1 + 1).toBe(2);
  });

  it('strings se concatenan correctamente', () => {
    const base = '/terapia-floral-silvia/';
    const path = 'contacto/';
    expect(base + path).toBe('/terapia-floral-silvia/contacto/');
  });

  it('arrays funcionan correctamente', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
  });
});