export interface Table {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  name: string;
}

export interface TransferRowProps {
  paymentDate?: string;
  amount?: string;
  senderAccountNumber?: string;
  receiverAccountNumber?: string;
  senderNameLine1?: string;
  senderNameLine2?: string;
  senderAddressLine1?: string;
  senderAddressLine2?: string;
  receiverNameLine1?: string;
  receiverNameLine2?: string;
  receiverAddressLine1?: string;
  receiverAddressLine2?: string;
  details?: string;
}

export interface TransferPropsLineConfig {
  id: keyof TransferRowProps;
  name: string;
}
