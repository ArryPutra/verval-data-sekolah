export function maskText(text: string) {
    if (!text) return text;

    const showCharactersLength = 4;

    if (text.length <= showCharactersLength) return text;

    return text.slice(0, showCharactersLength) + "*".repeat(text.length - showCharactersLength);
}
