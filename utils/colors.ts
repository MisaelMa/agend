export function calculateColor(email: any) {
    var colors = [
        "#FFB900",
        "#D83B01",
        "#B50E0E",
        "#E81123",
        "#B4009E",
        "#5C2D91",
        "#0078D7",
        "#00B4FF",
        "#008272",
        "#107C10"
    ];
    var sum = 0;
    for (let index in email) {
        sum += email.charCodeAt(index);
    }

    let style = {
        backgroundColor: colors[sum % colors.length]
    };
    return style
}
