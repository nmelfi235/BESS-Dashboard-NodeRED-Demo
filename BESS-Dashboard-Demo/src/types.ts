export interface cardProp {
  Name: string;
  Icon: string;
  children: React.ReactNode;
}

export interface inverterDataType {
  inverterStatus?: string;
  chargerStatus?: string;
  backupPower?: number;
  throughput?: number;
  temperature?: number;
}

export interface bmsDataType {
  soc?: number;
  temperature?: number;
}
