import { TransferRowProps } from "../types";

export class TransferImportRow {
  // [01] Typ komunikatu
  //      110 – polecenie przelewu
  type = "110";

  // [02] Data płatności w formacie RRRRMMDD
  paymentDate: string;

  // [03] Kwota przelewu w groszach, bez przecinków i separatorów
  amount: string;

  // [04] Bank zleceniodawcy (numer wg NBP)
  //      1020 – PKO BP
  //      Specyfikacja chce 8 cyfr
  senderBankCode? = "1020";

  // [05] Podtyp komunikatu
  //      0 – zwykły przelew
  //      2 - pilny
  //      7 - Express Elixir
  subtype = "0";

  // [06] Numer rachunku zleceniodawcy
  //      W formacie NRB
  senderAccountNumber: string;

  // [07] Numer rachunku odbiorcy
  //      W formacie NRB
  receiverAccountNumber: string;

  // [08] Nazwa i adres nadawcy
  //      Wiersze rozdzielane "|"
  //      Wiersze 1 i 2 nazwa, 3 i 4 adres
  senderData: string;

  // [09] Nazwa i adres odbiorcy
  //      Wiersze rozdzielane "|"
  //      Wiersze 1 i 2 nazwa, 3 i 4 adres
  receiverData: string;

  // [10] Kto pokrywa koszty przelewu
  //      Nieużywane
  transferCostsCoveredBy = "0";

  // [11] Kod banku odbiorcy
  receiverBankCode?: string;

  // [12] Szegóły płatności
  //      Max. 4 wiersze
  details?: string;

  // [13] Pole puste
  // [14] Pole puste

  // [15] Typ dokumentu
  //      "51" polecenia przelewu zwykłe, płatność ZUS
  //      "71" płatność podatkowa
  //      "01" polecenie zapłaty
  //      "53" przelew Split / Polecenie zapłaty Split
  documentType = "51";

  constructor(params: TransferRowProps) {
    this.type = "110";
    this.paymentDate = params.paymentDate;
    this.amount = params.amount;

    this.senderAccountNumber = this.formatBankCode(params.senderAccountNumber);
    this.senderBankCode = this.extractBankCode(this.senderAccountNumber);

    this.subtype = "0";

    this.receiverAccountNumber = this.formatBankCode(params.receiverAccountNumber);
    this.receiverBankCode = this.extractBankCode(this.receiverAccountNumber);

    this.senderData = [
      params.senderNameLine1 || "",
      params.senderNameLine2 || "",
      params.senderAddressLine1 || "",
      params.senderAddressLine2 || "",
    ].join("|");

    this.receiverData = [
      params.receiverNameLine1 || "",
      params.receiverNameLine2 || "",
      params.receiverAddressLine1 || "",
      params.receiverAddressLine2 || "",
    ].join("|");
    this.details = (params.details || "").split("\n").join("|");

    this.transferCostsCoveredBy = "0";

    this.documentType = "51";
  }

  toString(): string {
    const cols = [
      this.type, // [01] Typ komunikatu
      this.paymentDate, // [02] Data płatności w formacie RRRRMMDD
      this.amount, // [03] Kwota przelewu w groszach, bez przecinków i separatorów
      this.senderBankCode, // [04] Bank zleceniodawcy (numer wg NBP)
      this.subtype, // [05] Podtyp komunikatu
      this.senderAccountNumber, // [06] Numer rachunku zleceniodawcy
      this.receiverAccountNumber, // [07] Numer rachunku odbiorcy
      `"${this.senderData}"`, // [08] Nazwa i adres nadawcy
      `"${this.receiverData}"`, // [09] Nazwa i adres odbiorcy
      this.transferCostsCoveredBy, // [10] Kto pokrywa koszty przelewu
      this.receiverBankCode, // [11] Kod banku odbiorcy
      `"${this.details}"`, // [12] Szegóły płatności
      "", // [13] Pole puste
      "", // [14] Pole puste
      this.documentType, // [15] Typ dokumentu
    ];

    return cols.join(",");
  }

  private formatBankCode(bankCode?: string): string {
    if (!bankCode) {
      return "";
    }

    return bankCode.split(" ").join("");
  }

  private extractBankCode(accountNumber?: string): string {
    if (!accountNumber) {
      return "";
    }

    return accountNumber.slice(2, 10);
  }
}
