export function remove(node, selector) {
    let $ = cheerio
    $(selector, node).each(function () {
        $(this).replaceWith('');
    });
}

export function normDate(input) {
    if (input.match(/\d{8}/) && input.length == 8) {
        return input.slice(0, 4) + "-" + input.slice(4, 6) + "-" + input.slice(6)
    }
}

export function normDateTime(input) {
    if (input.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/)) {
        let buffer = input.replace(/\s+/, ' ')
        let parts = buffer.split(' ')
        let datepart = parts[0], timepart = parts[1].slice(0, 5)
        return datepart + "T" + timepart + ":00"
    }
}