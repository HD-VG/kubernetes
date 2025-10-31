export function format_date(date: Date): string {
    // Array de nombres de meses en español
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    // Array de nombres de días en español (opcional si quieres usarlo)
    const days = [
        "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
    ];

    const day = date.getDate(); // Día
    const month = months[date.getMonth()]; // Mes en texto
    const year = date.getFullYear(); // Año
    const hours = date.getHours().toString().padStart(2, "0"); // Hora con 2 dígitos
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Minutos con 2 dígitos
    const seconds = date.getSeconds().toString().padStart(2, "0"); // Segundos con 2 dígitos

    // Construye el formato final
    return `Sucre, ${day} de ${month} del ${year}, ${hours}:${minutes}:${seconds}`;
}
