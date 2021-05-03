import { IonDatetime } from "@ionic/angular";

export interface Task {
    deadline: IonDatetime;
    title: string;
    description: string;
    category: string;
    priority: string;
}