export interface Notification {
    id: number;
    body: string;
    timestamp: string;
    read: boolean;
}

export function processNotificationMessage(input: string): string {
    // A regular expression that matches the pattern: "board name"<board path>
    const regex = /"([^"]+)"<([^>]+)>/g;

    // Replace the matched pattern with the HTML anchor tag format
    return input.replace(regex, (match, boardName, boardPath) => {
        return `<a class="text-blue-500 hover:text-blue-700 underline"
        href="${boardPath}">${boardName}</a>`;
    });
}