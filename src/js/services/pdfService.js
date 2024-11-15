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
    const currentUser = JSON.parse(localStorage.getItem("atm_current_user"));
    doc.text(
      `Cuenta Proveniente ID: ${currentUser.bankAccount}`,
      pageWidth / 2,
      65,
      {
        align: "center",
      }
    );
    doc.text(`Transferencia ID: ${transactionID}`, pageWidth / 2, 75, {
      align: "center",
    });
    doc.text(`Monto de la transferencia: ${amount}`, pageWidth / 2, 85, {
      align: "center",
    });
    doc.text(`Cuenta Destino ID: ${destinyAccountID}`, pageWidth / 2, 95, {
      align: "center",
    });
    const dateComprobante = new Date();
    doc.text(
      `Fecha de la transacción: ${dateComprobante.toLocaleString()}`,
      pageWidth / 2,
      105,
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

  generateWithdrawPdf(transactionID, amount, newBalance) {
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
    doc.text("Retiro en Cajero", 10, 20);
    doc.text("Datos del Retiro", pageWidth / 2, 35, {
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
    doc.text(`Monto del retiro: $${amount}`, pageWidth / 2, 65, {
      align: "center",
    });
    doc.text(`Nuevo balance: $${newBalance}`, pageWidth / 2, 75, {
      align: "center",
    });
    doc.text(
      `Fecha de la transacción: ${dateComprobante.toLocaleString()}`,
      pageWidth / 2,
      85,
      {
        align: "center",
      }
    );

    const dateComprobante = new Date();
    doc.save(
      `comprobante-${dateComprobante
        .toLocaleDateString()
        .replace("/", "-")}.pdf`
    );
  }
  npeTransaction(npe, amount, id, date, type) {
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
    doc.text("Pago de Servicios", 10, 20);
    doc.text("Datos de la Transacción", pageWidth / 2, 35, {
      align: "center",
    });
    // Configurar el estilo de la línea (ancho y color)
    doc.setLineWidth(0.7);
    doc.setDrawColor(0, 0, 0); // Color negro (RGB)

    // Establecer el estilo de la línea en continua
    doc.setLineDash([0], 0);

    doc.line(10, 40, pageWidth - 10, 40); // Ajusta la posición vertical (25) según prefieras
    doc.text(`Transacción ID: ${id}`, pageWidth / 2, 55, {
      align: "center",
    });

    doc.text(`NPE: ${npe}`, pageWidth / 2, 65, {
      align: "center",
    });
    doc.text(`Monto del pago: ${amount}`, pageWidth / 2, 75, {
      align: "center",
    });

    doc.text(`Tipo de Servicio: ${type}`, pageWidth / 2, 85, {
      align: "center",
    });

    doc.text(`Fecha de la transacción: ${date}`, pageWidth / 2, 95, {
      align: "center",
    });

    const dateComprobante = new Date();
    doc.save(
      `comprobante-${dateComprobante
        .toLocaleDateString()
        .replace("/", "-")}.pdf`
    );
  }
}
