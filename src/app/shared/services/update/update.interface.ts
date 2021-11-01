export interface IUpdate {
  enabled: boolean;
  message: UpdateMessage;
  version?: string;
}

export interface UpdateMessage {
  message: string;
  title: string;
  btn?: string;
}
