// Dès le 01/10/2026, on considère la disponibilité comme immédiate.
const AVAILABILITY_DATE = new Date('2026-10-01');

export function isAvailableNow(): boolean {
    return new Date() >= AVAILABILITY_DATE;
}
