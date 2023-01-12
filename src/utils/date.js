export function dateToRelative(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    if (diff < 1000 * 60) {
        const seconds = Math.floor(diff / 1000);
        return `${seconds}秒前`;
    }
    if (diff < 1000 * 60 * 60) {
        const minutes = Math.floor(diff / 1000 / 60);
        return `${minutes}分钟前`;
    }
    if (diff < 1000 * 60 * 60 * 24) {
        const hours = Math.floor(diff / 1000 / 60 / 60);
        return `${hours}小时前`;
    }

    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
        "0" + date.getDate()
    ).slice(-2)}`;
}
