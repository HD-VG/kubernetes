export const parseDateFromFormattedString = (dateString: string): Date | null => {
    if (!dateString) {
      return null;
    }

    const partes = dateString.split(' ');
    if (partes.length !== 3) {
      return null;
    }

    const dia = parseInt(partes[0], 10);
    const mesAbreviado = partes[1].toLowerCase();
    const anio = parseInt(partes[2], 10);

    const nombresMeses = {
      'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
    };

    const mes = nombresMeses[mesAbreviado];

    if (isNaN(dia) || isNaN(mes) || isNaN(anio) || mes === undefined) {
      return null;
    }

    const fecha = new Date(anio, mes, dia);
    return fecha;
  };
