import { jsPDF } from "jspdf";

export class PdfService {
  generateTransactionPDF(transactionID, amount, destinyAccountID) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text("Pokémon Bank - ATM 01", 10, 10);
    // Configurar el estilo de la línea (ancho y color)
    doc.setLineWidth(0.7);
    doc.setDrawColor(0, 0, 0); // Color negro (RGB)

    // Establecer el estilo de la línea en continua
    doc.setLineDash([0], 0);

    // Obtener el ancho del PDF (en unidades predeterminadas, normalmente en mm o puntos)
    const pageWidth = doc.internal.pageSize.width;

    // Dibujar la línea en todo el ancho de la página
    doc.line(10, 25, pageWidth - 10, 25); // Ajusta la posición vertical (25) según prefieras
    doc.text("Transferencia a Terceros", 10, 20);
    doc.text("Datos de la Transferencia", pageWidth / 2, 35, {
      align: "center",
    });
    // Configurar el estilo de la línea (ancho y color)
    doc.setLineWidth(0.7);
    doc.setDrawColor(0, 0, 0); // Color negro (RGB)

    // Establecer el estilo de la línea en continua
    doc.setLineDash([0], 0);

    doc.line(10, 40, pageWidth - 10, 40); // Ajusta la posición vertical (25) según prefieras
    doc.text(`Transferencia ID: ${transactionID}`, pageWidth / 2, 55, {
      align: "center",
    });
    doc.text(`Monto de la transferencia: ${amount}`, pageWidth / 2, 65, {
      align: "center",
    });
    doc.text(`Cuenta Destino ID: ${destinyAccountID}`, pageWidth / 2, 75, {
      align: "center",
    });
    const dateComprobante = new Date();
    doc.text(
      `Fecha de la transacción: ${dateComprobante.toLocaleDateString()}`,
      pageWidth / 2,
      85,
      {
        align: "center",
      }
    );

    doc.save(
      `comprobante-${dateComprobante
        .toLocaleDateString()
        .replace("/", "-")}.pdf`
    );
  }
}
