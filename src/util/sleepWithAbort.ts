export function sleepWithAbort(signal: AbortSignal, ms: number) {
    return new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject('aborted'));
        setTimeout(resolve, ms);
    });
}