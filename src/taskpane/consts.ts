import { TransferPropsLineConfig } from "./types";

export enum Pages {
  SPLASH = "SPLASH",
  MAPPING = "MAPPING",
  SUMMARY = "SUMMARY",
}

export const CONFIG_LINE_PROPS: TransferPropsLineConfig[] = [
  {
    id: "paymentDate",
    name: "Data płatności",
    tooltip: "W formacie RRRRMMDD.",
  },
  {
    id: "amount",
    name: "Kwota",
    tooltip: "Kwota przelewu w groszach, bez miejsc po przecinku.",
  },
  {
    id: "senderAccountNumber",
    name: "Numer konta nadawcy",
  },
  {
    id: "receiverAccountNumber",
    name: "Numer konta odbiorcy",
  },
  {
    id: "senderNameLine1",
    name: "Nazwa nadawcy - linia 1",
  },
  {
    id: "senderNameLine2",
    name: "Nazwa nadawcy - linia 2",
  },
  {
    id: "senderAddressLine1",
    name: "Adres nadawcy - linia 1",
  },
  {
    id: "senderAddressLine2",
    name: "Adres nadawcy - linia 2",
  },
  {
    id: "receiverNameLine1",
    name: "Nazwa odbiorcy - linia 1",
  },
  {
    id: "receiverNameLine2",
    name: "Nazwa odbiorcy - linia 2",
  },
  {
    id: "receiverAddressLine1",
    name: "Adres odbiorcy - linia 1",
  },
  {
    id: "receiverAddressLine2",
    name: "Adres odbiorcy - linia 2",
  },
  {
    id: "details",
    name: "Szczegóły",
  },
];
