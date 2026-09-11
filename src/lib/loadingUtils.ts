/**
 * ECG Heartbeat Pulse animation loop duration in milliseconds.
 * Matches the CSS animation duration in UnifiedLoader.css (2.5s).
 */
export const ECG_LOOP_DURATION_MS = 2500;

/**
 * Calculates remaining time so that loading always completes at least 1 full loop.
 * If loading took longer than 1 loop, it waits until the current loop finishes cleanly.
 *
 * @param startTime - timestamp from Date.now() when loading started
 * @param loopDuration - loop duration in ms (defaults to ECG_LOOP_DURATION_MS = 2500)
 * @returns Promise that resolves when the current loop completes cleanly
 */
export const waitCompleteLoop = async (
    startTime: number, 
    loopDuration: number = ECG_LOOP_DURATION_MS
): Promise<void> => {
    const elapsed = Date.now() - startTime;
    // Guarantee at least 1 full loop. If elapsed exceeds 1 loop, wait until current loop finishes.
    const target = Math.max(loopDuration, Math.ceil(elapsed / loopDuration) * loopDuration);
    const delay = Math.max(0, target - elapsed);
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};
